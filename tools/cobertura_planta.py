# -*- coding: utf-8 -*-
"""
tools/cobertura_planta.py

Mede a planta de cada sala de "A Cobertura" e imprime o `piso` e os
`vaos` prontos para colar em js/data/cob_mapas.js.

Os mapas do kit sao imagens inteiras, e nao tileset montado: parede,
piso e vao de porta ja vem pintados, e nao ha camada de colisao. Chutar
retangulo no olho produz parede invisivel um pouco fora do lugar, que e
o defeito que mais irrita em jogo de cima.

Como distingue piso de parede sem nenhuma marcacao: textura. O piso e
um ladrilho com periodo parecido nos dois eixos, entao a energia de
gradiente horizontal e vertical se equivalem. A parede e fiada de
tijolo - linha longa deitada - e a energia horizontal domina. A margem
fora da sala e preto chapado e nao tem energia nenhuma.

    python tools/cobertura_planta.py             todas as salas
    python tools/cobertura_planta.py sala_a      uma sala

O numero sai em pixel da imagem, que e a mesma unidade que js/rpg.js
usa. Conferir sempre contra a arte antes de aceitar: a medida e um
ponto de partida boa, e nao uma verdade.
"""

import os
import sys

try:
    from PIL import Image
except ImportError:                                    # pragma: no cover
    sys.stderr.write("Pillow ausente. pip install pillow\n")
    raise SystemExit(2)

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAPAS = os.path.join(RAIZ, "assets", "cobertura", "maps")

B = 16          # lado do bloco de analise, em pixels
VAZIO = 12      # abaixo disto o bloco e margem preta

DESENHA = "--overlay" in sys.argv
SAIDA = os.path.join(RAIZ, "tools", "_planta")


def classifica(caminho):
    """Devolve uma grade de blocos: 'o' piso, '#' parede, '.' fora."""
    im = Image.open(caminho).convert("L")
    w, h = im.size
    px = im.load()
    bw, bh = w // B, h // B

    grade = []
    for by in range(bh):
        linha = []
        for bx in range(bw):
            gx = gy = soma = n = 0
            for y in range(by * B, by * B + B, 2):
                for x in range(bx * B, bx * B + B, 2):
                    v = px[x, y]
                    soma += v
                    n += 1
                    if x + 2 < w:
                        gx += abs(px[x + 2, y] - v)
                    if y + 2 < h:
                        gy += abs(px[x, y + 2] - v)
            if soma / n < VAZIO or gx == 0:
                linha.append(".")
            else:
                r = gy / float(gx)
                linha.append("o" if 0.72 <= r < 1.30 else "#")
        grade.append("".join(linha))
    return grade, (w, h)


def faixa_de_piso(grade, fracao=0.38):
    """Retangulo do piso por projecao, e nao por mancha ligada.

    O ladrilho tem quebra e mancha de sangue pintadas, e cada uma dessas
    vira um bloco fora do padrao no meio do chao. Exigir que os blocos
    de piso formem uma regiao ligada faz a maior mancha ser um pedaco do
    canto. Contar quantos blocos de piso ha em cada linha e em cada
    coluna atravessa o defeito sem alisar nada.
    """
    bh = len(grade)
    bw = len(grade[0])

    linhas = [sum(1 for c in linha if c == "o") for linha in grade]
    ys = [y for y in range(bh) if linhas[y] >= bw * fracao]
    if not ys:
        return None

    y0, y1 = min(ys), max(ys)

    colunas = []
    for x in range(bw):
        colunas.append(sum(1 for y in range(y0, y1 + 1) if grade[y][x] == "o"))
    alt = (y1 - y0 + 1)
    xs = [x for x in range(bw) if colunas[x] >= alt * fracao]
    if not xs:
        return None

    return min(xs), y0, max(xs), y1


def vaos(grade, caixa, fundo=1):
    """Buracos na parede em volta do piso: e por onde a sala se liga.

    O vao e pintado como preto chapado - o corredor do outro lado nao
    esta na imagem - entao a porta e onde a faixa de parede deixa de ter
    textura, e nao onde ela volta a ter piso. Procurar piso ali foi o
    primeiro erro desta funcao e devolvia o rodape da parede de cima
    como se fosse porta.

    `fundo` e quantos blocos de parede atravessar para fora antes de
    desistir: o batente tem espessura e o preto so comeca depois dele.
    """
    x0, y0, x1, y1 = caixa
    bh = len(grade)
    bw = len(grade[0])
    achados = []

    def corridas(pontos, eixo):
        saida = []
        atual = None
        for valor, aberto in pontos:
            if aberto and atual is None:
                atual = [valor, valor]
            elif aberto:
                atual[1] = valor
            elif atual is not None:
                saida.append(tuple(atual))
                atual = None
        if atual is not None:
            saida.append(tuple(atual))
        return [(a, b) for a, b in saida if (b - a + 1) * B >= 48]

    def olha(x, y):
        if 0 <= x < bw and 0 <= y < bh:
            return grade[y][x]
        return "."

    def aberto_h(bx, passo, y):
        for k in range(fundo):
            if olha(bx + passo * k, y) == ".":
                return True
        return False

    def aberto_v(by, passo, x):
        for k in range(fundo):
            if olha(x, by + passo * k) == ".":
                return True
        return False

    for lado, bx, passo in (("esquerda", x0 - 1, -1), ("direita", x1 + 1, 1)):
        pts = [(y, aberto_h(bx, passo, y)) for y in range(y0, y1 + 1)]
        for a, b in corridas(pts, "y"):
            achados.append((lado, a * B, (b + 1) * B))

    for lado, by, passo in (("cima", y0 - 1, -1), ("baixo", y1 + 1, 1)):
        pts = [(x, aberto_v(by, passo, x)) for x in range(x0, x1 + 1)]
        for a, b in corridas(pts, "x"):
            achados.append((lado, a * B, (b + 1) * B))

    return achados


def mede(nome):
    caminho = os.path.join(MAPAS, nome + ".png")
    if not os.path.isfile(caminho):
        print("  ausente: " + caminho)
        return

    grade, (w, h) = classifica(caminho)
    caixa = faixa_de_piso(grade)
    if not caixa:
        print("  %-10s sem piso reconhecivel" % nome)
        return

    bx0, by0, bx1, by1 = caixa
    piso = (bx0 * B, by0 * B, (bx1 + 1) * B, (by1 + 1) * B)

    print("  %-10s imagem %dx%d" % (nome, w, h))
    print("      piso:  [%d, %d, %d, %d]"
          % (piso[0], piso[1], piso[2], piso[3]))

    lista = vaos(grade, (bx0, by0, bx1, by1))
    if not lista:
        print("      vaos:  nenhum - sala fechada")
    else:
        print("      vaos:  [")
        for lado, a, b in lista:
            print("        { lado: '%s', de: %d, ate: %d }," % (lado, a, b))
        print("      ]")

    if DESENHA:
        saida = os.path.join(SAIDA, "planta_" + nome + ".png")
        overlay(nome, piso, lista, saida)
        print("      overlay: " + os.path.relpath(saida, RAIZ))


def overlay(nome, piso, portas, destino):
    """Grava a planta desenhada por cima da arte, para conferir no olho.

    O numero medido e um ponto de partida. A conferencia visual e o que
    pega o batente que ficou meio bloco para dentro.
    """
    from PIL import ImageDraw, ImageEnhance
    caminho = os.path.join(MAPAS, nome + ".png")
    im = Image.open(caminho).convert("RGB")
    im = ImageEnhance.Brightness(im).enhance(2.6)
    d = ImageDraw.Draw(im)
    d.rectangle([piso[0], piso[1], piso[2], piso[3]], outline=(90, 220, 130), width=4)
    for lado, a, b in portas:
        if lado == "esquerda":
            d.rectangle([piso[0] - 26, a, piso[0] + 10, b], outline=(255, 190, 60), width=4)
        elif lado == "direita":
            d.rectangle([piso[2] - 10, a, piso[2] + 26, b], outline=(255, 190, 60), width=4)
        elif lado == "cima":
            d.rectangle([a, piso[1] - 26, b, piso[1] + 10], outline=(255, 190, 60), width=4)
        else:
            d.rectangle([a, piso[3] - 10, b, piso[3] + 26], outline=(255, 190, 60), width=4)
    for x in range(0, im.size[0], 200):
        d.line([(x, 0), (x, im.size[1])], fill=(70, 100, 150), width=1)
        d.text((x + 4, 4), str(x), fill=(255, 240, 120))
    for y in range(0, im.size[1], 200):
        d.line([(0, y), (im.size[0], y)], fill=(70, 100, 150), width=1)
        d.text((4, y + 4), str(y), fill=(255, 240, 120))
    im.save(destino)


def main():
    if DESENHA and not os.path.isdir(SAIDA):
        os.makedirs(SAIDA)
    alvos = [a for a in sys.argv[1:] if not a.startswith("-")]
    if not alvos:
        alvos = sorted(f[:-4] for f in os.listdir(MAPAS) if f.endswith(".png"))
    print("\nplanta das salas (pixel da imagem)\n")
    for nome in alvos:
        mede(nome)
        print("")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
