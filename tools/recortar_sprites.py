# -*- coding: utf-8 -*-
"""Recorta folha de expressoes 3x2 em sprites individuais com alpha.

As folhas vem como grade de seis retratos sobre fundo claro. Este script:

  1. acha a grade projetando a mascara de "nao e fundo" nos dois eixos
  2. recorta cada celula
  3. remove o fundo por PREENCHIMENTO A PARTIR DA BORDA, e nao por limiar
     global de cor - Klara e Serafina tem cabelo branco, e limiar global
     comeria o cabelo junto com o fundo
  4. suaviza a borda do alpha para nao ficar serrilhado
  5. corta a moldura vazia e grava PNG RGBA

Sem numpy: PIL puro, com fila propria. Roda em segundos por folha.

Uso:
    python tools/recortar_sprites.py
"""
import io
import os
import sys
from collections import deque

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

from PIL import Image

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHARS = os.path.join(BASE, "assets", "characters")

# folha -> pasta, e o nome de cada uma das seis celulas em ordem de
# leitura (esquerda para direita, cima para baixo).
FOLHAS = [
    {
        "dir": "antoniette",
        "arquivo": "ChatGPT Image Jul 26, 2026, 11_26_45 AM.png",
        "nomes": ["neutral", "warm", "away", "soft", "shaken", "guarded"],
    },
    {
        "dir": "klara",
        "arquivo": "1000413565(3).png",
        "nomes": ["neutral", "side", "away", "lowered", "blank", "averted"],
    },
    {
        "dir": "liara",
        "arquivo": "Referência de personagem estilo vitoriano.png",
        "nomes": ["neutral", "bright", "away", "sulk", "flat", "worried"],
    },
    {
        "dir": "serafina",
        "arquivo": "ChatGPT Image Jul 26, 2026, 11_29_49 AM.png",
        "nomes": ["neutral", "direct", "side", "intense", "smirk", "grave"],
    },
]

TOL_GRADE = 26    # tolerancia para separar celula de pagina
TOL_FUNDO = 38    # tolerancia do preenchimento de fundo dentro da celula


def dist(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1]) + abs(a[2] - b[2])


def faixas(marcas, minimo):
    """Converte lista de bool em faixas contiguas de True."""
    out, ini = [], None
    for i, v in enumerate(marcas):
        if v and ini is None:
            ini = i
        elif not v and ini is not None:
            if i - ini >= minimo:
                out.append((ini, i))
            ini = None
    if ini is not None and len(marcas) - ini >= minimo:
        out.append((ini, len(marcas)))
    return out


def perfil(im, eixo):
    """Quanto conteudo (nao-pagina) existe por coluna, ou por linha."""
    w, h = im.size
    px = im.load()
    pagina = px[2, 2]
    if eixo == "x":
        conta = [0] * w
        for y in range(0, h, 3):
            for x in range(w):
                if dist(px[x, y], pagina) > TOL_GRADE:
                    conta[x] += 1
    else:
        conta = [0] * h
        for y in range(h):
            for x in range(0, w, 3):
                if dist(px[x, y], pagina) > TOL_GRADE:
                    conta[y] += 1
    return conta


def corte_vale(conta, alvo, janela):
    """Acha, perto de 'alvo', a posicao de menor conteudo.

    Detectar as celulas por faixa contigua nao funciona aqui: em algumas
    folhas os quadros se encostam e a projecao vira um bloco so. Como a
    grade e sempre 3x2, o caminho robusto e partir da divisao nominal e
    escorregar ate o vale mais proximo.
    """
    ini = max(0, alvo - janela)
    fim = min(len(conta), alvo + janela)
    melhor, pos = None, alvo
    for i in range(ini, fim):
        if melhor is None or conta[i] < melhor:
            melhor, pos = conta[i], i
    return pos


def achar_grade(im):
    """Devolve seis caixas (l, t, r, b) na ordem de leitura."""
    w, h = im.size
    cx = perfil(im, "x")
    cy = perfil(im, "y")

    x1 = corte_vale(cx, w // 3, w // 12)
    x2 = corte_vale(cx, 2 * w // 3, w // 12)
    y1 = corte_vale(cy, h // 2, h // 10)

    colunas = [(0, x1), (x1, x2), (x2, w)]
    linhas  = [(0, y1), (y1, h)]

    caixas = []
    for (t, b) in linhas:
        for (l, r) in colunas:
            caixas.append((l, t, r, b))
    return caixas


def tirar_fundo(cel):
    """Alpha zero no fundo, alcancado a partir da borda da celula."""
    cel = cel.convert("RGBA")
    w, h = cel.size
    px = cel.load()
    fundo = px[0, 0]

    visto = bytearray(w * h)
    fila = deque()

    def semear(x, y):
        i = y * w + x
        if visto[i]:
            return
        if dist(px[x, y][:3], fundo) <= TOL_FUNDO:
            visto[i] = 1
            fila.append((x, y))

    for x in range(w):
        semear(x, 0)
        semear(x, h - 1)
    for y in range(h):
        semear(0, y)
        semear(w - 1, y)

    while fila:
        x, y = fila.popleft()
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h:
                semear(nx, ny)

    # aplica, e deixa meio-tom em quem toca o fundo, para nao serrilhar
    for y in range(h):
        for x in range(w):
            i = y * w + x
            if visto[i]:
                px[x, y] = (0, 0, 0, 0)

    for y in range(1, h - 1):
        for x in range(1, w - 1):
            if visto[y * w + x]:
                continue
            vizinho_fundo = (visto[(y - 1) * w + x] or visto[(y + 1) * w + x] or
                             visto[y * w + x - 1] or visto[y * w + x + 1])
            if vizinho_fundo:
                r, g, b, a = px[x, y]
                prox = max(0, TOL_FUNDO - dist((r, g, b), fundo))
                px[x, y] = (r, g, b, max(0, 255 - int(prox * 255 / TOL_FUNDO)))

    return cel


def main():
    total = 0
    for folha in FOLHAS:
        pasta = os.path.join(CHARS, folha["dir"])
        origem = os.path.join(pasta, folha["arquivo"])
        if not os.path.exists(origem):
            print("FALTA  %s" % origem)
            continue

        im = Image.open(origem).convert("RGB")
        caixas = achar_grade(im)
        print("%s  %s  ->  %d celulas" % (folha["dir"].ljust(11), im.size, len(caixas)))

        for nome, caixa in zip(folha["nomes"], caixas):
            cel = tirar_fundo(im.crop(caixa))
            corte = cel.getbbox()
            if corte:
                cel = cel.crop(corte)
            destino = os.path.join(pasta, "%s_%s.png" % (folha["dir"], nome))
            cel.save(destino)
            print("   %s  %s" % (os.path.basename(destino).ljust(28), cel.size))
            total += 1

    print("\n%d sprites gravados." % total)


if __name__ == "__main__":
    main()
