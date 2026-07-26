# -*- coding: utf-8 -*-
"""Separa palavras coladas em texto extraido de PDF sem caractere de espaco.

O PDF do Kenworthy foi gerado sem codificar espaco, entao a extracao sai
como "Ifyouwanttobeasciencefictionwriter". Este script reconstroi os
espacos por programacao dinamica, usando como dicionario a frequencia de
palavras dos outros livros em ingles do proprio corpus.

Uso:
    python tools/desgruda.py REF/_txt/arquivo.txt REF/_txt/saida.txt
"""
import io
import math
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TXT = os.path.join(BASE, "REF", "_txt")

# livros em ingles com espacamento correto, usados como dicionario
FONTES = [
    "the_art_of_character_david_corbett.txt",
    "how_to_write_a_damn_good_mystery_a_practical_step_by_step_gu.txt",
    "branching_story_unlocked_dialogue_designing_and_writing_visu.txt",
    "anime_and_the_visual_novel_narrative_structure_design_and_pl.txt",
    "how_to_write_a_mystery_a_handbook_from_mystery_writers_of_am.txt",
    "brother_cadfael_the_complete_chronicles_ellis_peters_sk_1lib.txt",
]

# palavras que o corpus pode nao cobrir mas o livro usa o tempo todo
EXTRAS = """sf scifi fantasy horror wordcount manuscript submissions
publisher publishers editor editors freelance paperback royalties
worldbuilding subplot subplots protagonist antagonist viewpoint
checklist rewriting proofread synopsis anthology anthologies
paranormal supernatural alien aliens spaceship spaceships"""


def carregar_dicionario():
    contagem = {}
    for nome in FONTES:
        caminho = os.path.join(TXT, nome)
        if not os.path.exists(caminho):
            continue
        texto = io.open(caminho, encoding="utf-8", errors="replace").read().lower()
        for palavra in re.findall(r"[a-z']+", texto):
            if len(palavra) <= 24:
                contagem[palavra] = contagem.get(palavra, 0) + 1
    for palavra in EXTRAS.split():
        contagem[palavra] = max(contagem.get(palavra, 0), 40)
    return contagem


def montar_custo(contagem):
    total = float(sum(contagem.values()))
    custo = {}
    for palavra, n in contagem.items():
        # palavra de uma letra so vale a pena para 'a' e 'i'
        if len(palavra) == 1 and palavra not in ("a", "i"):
            continue
        # ruido: aparece uma vez so e e longa
        if n < 2 and len(palavra) > 12:
            continue
        custo[palavra] = -math.log(n / total)
    return custo


def segmentar(bloco, custo, maxlen=24):
    """Viterbi: menor custo total de segmentacao."""
    n = len(bloco)
    baixo = bloco.lower()
    # custo de tratar um caractere como palavra desconhecida
    penalidade = 30.0
    melhor = [0.0] + [float("inf")] * n
    corte = [0] * (n + 1)
    for i in range(1, n + 1):
        ini = max(0, i - maxlen)
        for j in range(ini, i):
            pedaco = baixo[j:i]
            c = custo.get(pedaco)
            if c is None:
                # palavra desconhecida: so aceita pedaco curto, caro
                if i - j > 3:
                    continue
                c = penalidade + (i - j) * 4.0
            total = melhor[j] + c
            if total < melhor[i]:
                melhor[i] = total
                corte[i] = j
    partes = []
    i = n
    while i > 0:
        j = corte[i]
        partes.append(bloco[j:i])
        i = j
    partes.reverse()
    return " ".join(partes)


COLADO = re.compile(r"[A-Za-z']{14,}")


def processar(texto, custo):
    def troca(m):
        return segmentar(m.group(0), custo)
    saida = []
    for linha in texto.split("\n"):
        saida.append(COLADO.sub(troca, linha))
    return "\n".join(saida)


def main(argv):
    if len(argv) < 3:
        print(__doc__)
        return 1
    entrada, saida = argv[1], argv[2]
    print("montando dicionario a partir do corpus...")
    contagem = carregar_dicionario()
    custo = montar_custo(contagem)
    print("  %d palavras distintas" % len(custo))
    texto = io.open(entrada, encoding="utf-8", errors="replace").read()
    print("separando %d caracteres..." % len(texto))
    novo = processar(texto, custo)
    io.open(saida, "w", encoding="utf-8", newline="\n").write(novo)
    print("gravado em %s" % saida)
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
