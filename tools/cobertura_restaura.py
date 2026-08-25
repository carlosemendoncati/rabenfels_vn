# -*- coding: utf-8 -*-
"""
tools/cobertura_restaura.py

Desfaz o estrago que tools/cobertura_fundo.py --pasta fez em 25/08/2026.

------------------------------------------------------------------
O QUE ACONTECEU
------------------------------------------------------------------
O modo --pasta foi rodado sobre a entrega original do autor, em cima dos
arquivos, sem copia. Duas coisas deram errado ao mesmo tempo:

1. Ele trata cada arquivo como UMA peca. Metade da entrega e folha 3x4 -
   doze figuras por imagem - e U2Net e deteccao de objeto saliente. O
   mesmo defeito que ja estava documentado no cabecalho do proprio
   arquivo, e que eu evitei no modo normal fatiando antes. No modo de
   pasta eu nao fatiei.

2. A trava de cor, que deveria impedir a rede de apagar arte, se
   sustenta em `cores_de_fundo` - as cores dos pixels que ja estavam
   transparentes. Num PNG com alfa de verdade esses pixels sao pretos.
   Entao a trava aprendeu "preto e fundo", e a arte desta obra e quase
   toda preta. A trava autorizou exatamente o que deveria barrar.

------------------------------------------------------------------
POR QUE DA PARA RESTAURAR
------------------------------------------------------------------
A operacao so zerou ALFA. O RGB continua no arquivo, debaixo do alfa
zero, porque o PNG guarda os quatro canais e o Pillow nao descarta cor
de pixel transparente ao salvar.

Entao: pixel transparente com RGB que nao e preto era arte, e volta.

O que NAO volta e o pixel de arte que era preto puro, porque ali a cor
nao distingue mais figura de fundo. Sobra pontilhado nas sombras mais
fechadas do cabelo e da saia. Esta medido por arquivo na saida.

    python tools/cobertura_restaura.py --pasta "assets/A Cobertura/entrega_25ago"
    python tools/cobertura_restaura.py --pasta ... --seco    so mede
"""

import os
import sys

try:
    from PIL import Image
except ImportError:                                    # pragma: no cover
    sys.stderr.write("Pillow ausente. pip install pillow\n")
    raise SystemExit(2)

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECO = "--seco" in sys.argv

# Soma de R+G+B acima da qual o pixel e considerado arte. Dezoito e
# baixo de proposito: qualquer coisa que nao seja preto quase puro volta.
# Subir isto perde sombra; baixar traz ruido de compressao.
PISO = 18


def opcao(nome):
    if nome in sys.argv:
        i = sys.argv.index(nome)
        if i + 1 < len(sys.argv):
            return sys.argv[i + 1]
    return None


def restaura(im):
    """Devolve alfa a todo pixel transparente cujo RGB sobreviveu."""
    im = im.convert("RGBA")
    a = im.getchannel("A")
    ap = a.load()
    px = im.load()
    w, h = im.size
    n = 0

    for y in range(h):
        for x in range(w):
            r, g, b, al = px[x, y]
            if al >= 250:
                continue
            if r + g + b > PISO:
                ap[x, y] = 255
                n += 1

    out = im.copy()
    out.putalpha(a)
    return out, n


def resto_preto(im):
    """Quanto de pixel preto continua transparente: o que nao volta.

    Nao da para saber quanto disso era arte e quanto era fundo. E o
    numero honesto a se dar ao autor: e o teto do prejuizo, nao o
    prejuizo.
    """
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    n = 0
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            r, g, b, a = px[x, y]
            if a < 250 and r + g + b <= PISO:
                n += 1
    return n * 4


def main():
    pasta = opcao("--pasta")
    if not pasta:
        sys.stderr.write("uso: --pasta <caminho>\n")
        return 2

    d = pasta if os.path.isabs(pasta) else os.path.join(RAIZ, pasta)
    if not os.path.isdir(d):
        sys.stderr.write("pasta ausente: " + d + "\n")
        return 2

    nomes = sorted(f for f in os.listdir(d) if f.lower().endswith(".png"))
    print("\nrestauro de alfa%s\n" % (" (seco)" if SECO else ""))
    print("  %-46s %10s  %s" % ("arquivo", "devolvido", "preto que fica"))

    mexidos = 0
    for f in nomes:
        caminho = os.path.join(d, f)
        im = Image.open(caminho).convert("RGBA")
        out, n = restaura(im)
        if not n:
            continue
        mexidos += 1
        total = im.size[0] * im.size[1]
        if not SECO:
            out.save(caminho)
        print("  %-46s %9.2f%%  %.2f%%"
              % (f[:46], n / float(total) * 100.0,
                 resto_preto(out) / float(total) * 100.0))

    print("\n%d de %d arquivos restaurados" % (mexidos, len(nomes)))
    print("\nA coluna da direita e o TETO do prejuizo, e nao o prejuizo:")
    print("e todo pixel preto que continua transparente, sem distinguir")
    print("sombra fechada de fundo legitimo.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
