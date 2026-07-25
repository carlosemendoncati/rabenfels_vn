#!/usr/bin/env python3
# ==========================================================================
# ARQUIVO RABENFELS - tools/fix_sprites.py
#
# Remove o fundo branco solido dos sprites herdados da versao monolitica.
#
# Aqueles arquivos foram extraidos de base64 e vieram em RGB, sem canal
# alfa: o fundo branco estava embutido na imagem. No jogo isso aparecia
# como uma caixa branca atras do personagem.
#
# O metodo e preenchimento a partir das bordas, nao substituicao global
# de cor: assim o branco que faz parte do personagem (gola, olho, papel)
# permanece. Depois a imagem e recortada no conteudo, para o sprite
# ficar ancorado pela figura e nao pela moldura vazia.
#
# Uso:
#   python3 tools/fix_sprites.py            processa e grava
#   python3 tools/fix_sprites.py --dry      so relata
#
# Idempotente: arquivo que ja tem alfa util e ignorado.
# ==========================================================================

import os
import sys
from collections import deque

from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..')
CHARS = os.path.join(ROOT, 'assets', 'characters')

# Distancia maxima ao branco para considerar fundo.
TOLERANCE = 30
# Margem transparente mantida em volta do conteudo, em pixels.
PAD = 2


def near_white(px):
    return px[0] >= 255 - TOLERANCE and px[1] >= 255 - TOLERANCE and px[2] >= 255 - TOLERANCE


def key_out(im):
    """Preenchimento a partir das bordas. Retorna imagem RGBA."""
    im = im.convert('RGBA')
    w, h = im.size
    px = im.load()

    seen = bytearray(w * h)
    queue = deque()

    def push(x, y):
        i = y * w + x
        if seen[i]:
            return
        seen[i] = 1
        if near_white(px[x, y]):
            queue.append((x, y))

    for x in range(w):
        push(x, 0)
        push(x, h - 1)
    for y in range(h):
        push(0, y)
        push(w - 1, y)

    while queue:
        x, y = queue.popleft()
        px[x, y] = (px[x, y][0], px[x, y][1], px[x, y][2], 0)
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h:
                push(nx, ny)

    return im


def soften_edge(im):
    """Suaviza a borda dura deixada pelo recorte binario.

    Pixel opaco vizinho de transparente perde um pouco de alfa, o que
    tira a serrilha branca sem borrar a figura inteira."""
    w, h = im.size
    px = im.load()
    edge = []

    for y in range(h):
        for x in range(w):
            if px[x, y][3] == 0:
                continue
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 0 <= ny < h and px[nx, ny][3] == 0:
                    edge.append((x, y))
                    break

    for x, y in edge:
        r, g, b, a = px[x, y]
        px[x, y] = (r, g, b, int(a * 0.55))
    return im


def has_useful_alpha(im):
    if im.mode != 'RGBA':
        return False
    lo, hi = im.getchannel('A').getextrema()
    return lo == 0 and hi > 0


def process(path, dry=False):
    im = Image.open(path)
    original = im.size

    if has_useful_alpha(im):
        print('  pula (ja tem alfa)  %-46s %s' % (rel(path), original))
        return False

    im = key_out(im)
    im = soften_edge(im)

    box = im.getchannel('A').getbbox()
    if box:
        x0, y0, x1, y1 = box
        x0 = max(0, x0 - PAD)
        y0 = max(0, y0 - PAD)
        x1 = min(im.size[0], x1 + PAD)
        y1 = min(im.size[1], y1 + PAD)
        im = im.crop((x0, y0, x1, y1))

    if dry:
        print('  seria  %-46s %s -> %s' % (rel(path), original, im.size))
        return True

    im.save(path)
    print('  ok     %-46s %s -> %s' % (rel(path), original, im.size))
    return True


def rel(path):
    return os.path.relpath(path, ROOT)


def main():
    dry = '--dry' in sys.argv
    changed = 0

    for folder in sorted(os.listdir(CHARS)):
        d = os.path.join(CHARS, folder)
        if not os.path.isdir(d):
            continue
        for name in sorted(os.listdir(d)):
            if not name.lower().endswith('.png'):
                continue
            if process(os.path.join(d, name), dry):
                changed += 1

    print('\n%d arquivo(s) %s' % (changed, 'a processar' if dry else 'processado(s)'))


if __name__ == '__main__':
    main()
