#!/usr/bin/env python3
# ==========================================================================
# ARQUIVO RABENFELS - tools/check_sprites.py
#
# Relata, em JSON, o estado de cada sprite: modo de cor e extremos do
# canal alfa. tools/validate.js consome esta saida para reprovar sprite
# com fundo opaco, que no jogo aparece como um bloco solido atras do
# personagem.
#
# Uso:
#   python3 tools/check_sprites.py
#
# Saida: [ ["caminho", "RGBA", alfaMin, alfaMax], ... ]
# alfaMin/alfaMax valem -1 quando nao ha canal alfa.
# ==========================================================================

import glob
import json
import os
import sys

try:
    from PIL import Image
except ImportError:
    print(json.dumps({'error': 'PIL indisponivel'}))
    sys.exit(0)

ROOT = os.path.join(os.path.dirname(__file__), '..')

out = []
pattern = os.path.join(ROOT, 'assets', 'characters', '*', '*.png')

# assets/characters/portraits/ nao sao sprites: sao os retratos das fichas
# da galeria, enquadrados como quadro a oleo. Fundo opaco ali e correto,
# entao a pasta fica fora desta checagem.
IGNORAR = ('portraits',)

for path in sorted(glob.glob(pattern)):
    if os.path.basename(os.path.dirname(path)) in IGNORAR:
        continue
    im = Image.open(path)
    if im.mode == 'RGBA':
        lo, hi = im.getchannel('A').getextrema()
    else:
        lo, hi = -1, -1
    out.append([os.path.relpath(path, ROOT).replace('\\', '/'), im.mode, lo, hi])

print(json.dumps(out))
