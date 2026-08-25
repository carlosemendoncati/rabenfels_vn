# -*- coding: utf-8 -*-
"""
tools/cobertura_restaura.py

Recupera, sem sobrescrever a origem, o alfa apagado pelo antigo modo
``cobertura_fundo.py --pasta`` em 25/08/2026.

O backgroundremover preservou o RGB dos pixels que tornou transparentes.
Isso permite devolver os pixels coloridos. Cinco folhas da Carmine ainda
possuem uma copia intacta no diretorio pai; nelas o alfa e restaurado de
forma exata. Nas demais imagens, pixels quase pretos continuam ambiguos e
nao sao inventados.

Uso:

    python tools/cobertura_restaura.py \
        --pasta "assets/A Cobertura/entrega_25ago"

Por padrao, a saida fica ao lado da origem, com o sufixo ``_restaurada``.
Use ``--saida`` para escolher outro diretorio e ``--seco`` para apenas
medir. O programa recusa gravar dentro da pasta de origem.
"""

import hashlib
import json
import os
import shutil
import sys

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:                                    # pragma: no cover
    sys.stderr.write("Pillow ausente. pip install pillow\n")
    raise SystemExit(2)


RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECO = "--seco" in sys.argv
PISO = 18

# Arquivos cujo mtime mudou na execucao acidental de 25/08. A lista torna a
# recuperacao repetivel sem depender de relogio, tamanho ou heuristica.
DANIFICADOS_25AGO = {
    "4c9a58a1-f2ea-45c8-bb2b-19eb383f14f9.png",
    "antoniette_retrato_pixel.png",
    "antoniette_vela_spritesheet.png",
    "cama_servico.png",
    "carmine_ataque_3_frames_348x172.png",
    "carmine_ataque_direita_3_frames_348x172.png",
    "carmine_ataques_3x3_348x516.png",
    "carmine_chars_dropped.png",
    "carmine_novo_design_348x688.png",
    "carmine_spritesheet_completo_348x1204.png",
    "ChatGPT Image Aug 25, 2026, 02_57_40 AM (1).png",
    "ChatGPT Image Aug 25, 2026, 02_57_41 AM (10).png",
    "ChatGPT Image Aug 25, 2026, 02_57_41 AM (5).png",
    "ChatGPT Image Aug 25, 2026, 02_57_41 AM (6).png",
    "ChatGPT Image Aug 25, 2026, 02_57_41 AM (7).png",
    "ChatGPT Image Aug 25, 2026, 02_57_41 AM (8).png",
    "ChatGPT Image Aug 25, 2026, 02_57_42 AM (11).png",
    "ChatGPT Image Aug 25, 2026, 02_57_43 AM (17).png",
    "ChatGPT Image Aug 25, 2026, 02_57_43 AM (22).png",
    "ChatGPT Image Aug 25, 2026, 02_57_45 AM (25).png",
    "ChatGPT Image Aug 25, 2026, 02_57_59 AM (1).png",
    "ChatGPT Image Aug 25, 2026, 02_57_59 AM (2).png",
    "ChatGPT Image Aug 25, 2026, 02_57_59 AM (3).png",
    "ChatGPT Image Aug 25, 2026, 03_07_09 AM.png",
    "dara_spritesheet_3x4.png",
    "fenn_spritesheet_3x4.png",
    "gancho_chaves.png",
    "malas_bau_ferramentas.png",
    "porta_2_estados.png",
    "porta_aberta.png",
    "prataria_empilhada.png",
    "rastro_01.png",
    "rastro_02.png",
    "rastro_03.png",
    "rastro_04.png",
}


def opcao(nome):
    if nome in sys.argv:
        i = sys.argv.index(nome)
        if i + 1 < len(sys.argv):
            return sys.argv[i + 1]
    return None


def absoluto(caminho):
    if os.path.isabs(caminho):
        return os.path.normpath(caminho)
    return os.path.normpath(os.path.join(RAIZ, caminho))


def sha_rgb(im):
    return hashlib.sha256(im.convert("RGB").tobytes()).hexdigest()


def original_exato(caminho, im):
    """Procura uma copia intacta de mesmo nome no diretorio pai."""
    candidato = os.path.join(os.path.dirname(os.path.dirname(caminho)),
                             os.path.basename(caminho))
    if not os.path.isfile(candidato):
        return None
    outra = Image.open(candidato).convert("RGBA")
    if outra.size != im.size or sha_rgb(outra) != sha_rgb(im):
        return None
    return outra


def recupera_rgb(im):
    """Devolve opacidade aos pixels coloridos preservados sob alfa baixo.

    Preto puro permanece transparente: sem uma copia intacta, nao ha como
    distinguir fundo preto de cabelo ou roupa preta. O relatorio registra
    esse teto de incerteza em vez de fingir uma recuperacao exata.
    """
    im = im.convert("RGBA")
    px = im.load()
    alfa = im.getchannel("A")
    ap = alfa.load()
    w, h = im.size
    devolvidos = 0
    ambiguos = 0

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a >= 250:
                continue
            if r + g + b > PISO:
                ap[x, y] = 255
                devolvidos += 1
            else:
                ambiguos += 1

    out = im.copy()
    out.putalpha(alfa)
    return out, devolvidos, ambiguos


def compoe(im, tamanho=(180, 180)):
    """Miniatura em fundo verde-azulado: buracos pretos ficam visiveis."""
    im = im.convert("RGBA")
    k = min(tamanho[0] / float(im.width), tamanho[1] / float(im.height))
    mini = im.resize((max(1, int(im.width * k)),
                      max(1, int(im.height * k))), Image.NEAREST)
    fundo = Image.new("RGBA", tamanho, (32, 104, 96, 255))
    x = (tamanho[0] - mini.width) // 2
    y = (tamanho[1] - mini.height) // 2
    fundo.alpha_composite(mini, (x, y))
    return fundo.convert("RGB")


def contato(itens, destino, titulo):
    if not itens:
        return
    colunas = 5
    cel_w, cel_h = 200, 224
    linhas = (len(itens) + colunas - 1) // colunas
    folha = Image.new("RGB", (colunas * cel_w, 42 + linhas * cel_h),
                      (20, 18, 19))
    draw = ImageDraw.Draw(folha)
    fonte = ImageFont.load_default()
    draw.text((10, 12), titulo, fill=(229, 218, 194), font=fonte)
    for i, (nome, im) in enumerate(itens):
        c = i % colunas
        l = i // colunas
        x = c * cel_w + 10
        y = 42 + l * cel_h
        folha.paste(compoe(im), (x, y))
        rotulo = nome if len(nome) <= 28 else nome[:25] + "..."
        draw.text((x, y + 186), rotulo, fill=(229, 218, 194), font=fonte)
    folha.save(destino)


def main():
    pasta = opcao("--pasta")
    if not pasta:
        sys.stderr.write("uso: --pasta <origem> [--saida <destino>] [--seco]\n")
        return 2

    origem = absoluto(pasta)
    if not os.path.isdir(origem):
        sys.stderr.write("pasta ausente: " + origem + "\n")
        return 2

    saida_arg = opcao("--saida")
    saida = absoluto(saida_arg) if saida_arg else origem.rstrip("\\/") + "_restaurada"
    origem_real = os.path.normcase(os.path.realpath(origem))
    saida_real = os.path.normcase(os.path.realpath(saida))
    if saida_real == origem_real or saida_real.startswith(origem_real + os.sep):
        sys.stderr.write("a saida deve ficar fora da pasta de origem\n")
        return 2
    if os.path.exists(saida) and not SECO:
        sys.stderr.write("saida ja existe; remova-a ou escolha outro --saida: " + saida + "\n")
        return 2

    nomes = sorted(os.listdir(origem))
    pngs = [n for n in nomes if n.lower().endswith(".png")]
    relatorio = []
    antes_contato = []
    depois_contato = []

    print("\nrestauro seguro de alfa%s" % (" (seco)" if SECO else ""))
    print("origem: " + origem)
    print("saida:  " + saida + "\n")
    print("  %-46s %-12s %10s %10s" %
          ("arquivo", "metodo", "devolvido", "ambiguo"))

    if not SECO:
        os.makedirs(saida)

    for nome in nomes:
        caminho = os.path.join(origem, nome)
        destino = os.path.join(saida, nome)
        if not os.path.isfile(caminho):
            continue
        if not nome.lower().endswith(".png"):
            if not SECO:
                shutil.copy2(caminho, destino)
            continue

        im = Image.open(caminho).convert("RGBA")
        total = im.width * im.height
        metodo = "inalterado"
        devolvidos = 0
        ambiguos = 0
        out = im.copy()

        if nome in DANIFICADOS_25AGO:
            exato = original_exato(caminho, im)
            if exato is not None:
                out = exato
                metodo = "original exato"
                a0 = im.getchannel("A")
                a1 = out.getchannel("A")
                devolvidos = sum(1 for x, y in zip(a0.getdata(), a1.getdata())
                                  if x < 250 and y >= 250)
            else:
                out, devolvidos, ambiguos = recupera_rgb(im)
                metodo = "RGB preservado"

        if not SECO:
            out.save(destino)

        if nome in DANIFICADOS_25AGO:
            antes_contato.append((nome, im))
            depois_contato.append((nome, out))

        relatorio.append({
            "arquivo": nome,
            "tamanho": [im.width, im.height],
            "metodo": metodo,
            "pixels_devolvidos": devolvidos,
            "percentual_devolvido": round(devolvidos / float(total) * 100.0, 4),
            "pixels_pretos_ambiguos": ambiguos,
            "percentual_ambiguo": round(ambiguos / float(total) * 100.0, 4),
        })
        print("  %-46s %-12s %9.2f%% %9.2f%%" %
              (nome[:46], metodo[:12],
               devolvidos / float(total) * 100.0,
               ambiguos / float(total) * 100.0))

    if not SECO:
        with open(os.path.join(saida, "RELATORIO_RESTAURO.json"), "w",
                  encoding="utf-8") as f:
            json.dump({
                "origem": origem,
                "saida": saida,
                "arquivos_png": len(pngs),
                "incidente": "backgroundremover --pasta em 25/08/2026",
                "resultados": relatorio,
            }, f, ensure_ascii=False, indent=2)
            f.write("\n")
        contato(antes_contato, os.path.join(saida, "AUDITORIA_ANTES.png"),
                "Antes: alfa apos a passada acidental")
        contato(depois_contato, os.path.join(saida, "AUDITORIA_RESTAURADA.png"),
                "Depois: alfa recuperado (fundo verde mostra os vazios)")

    exatos = sum(1 for r in relatorio if r["metodo"] == "original exato")
    rgb = sum(1 for r in relatorio if r["metodo"] == "RGB preservado")
    print("\n%d PNGs copiados; %d restaurados exatamente; %d recuperados pelo RGB."
          % (len(pngs), exatos, rgb))
    if rgb:
        print("Pixels pretos ambiguos foram mantidos transparentes e constam no relatorio.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
