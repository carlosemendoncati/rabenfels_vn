#!/usr/bin/env python3
# =========================================================================
# ARQUIVO RABENFELS - tools/escape.py
#
# Porte fiel de tools/escape.js. Existe porque nem toda maquina do projeto
# tem Node instalado; o Python ja e exigido por make_sfx.py.
#
# Normaliza um arquivo de roteiro para ASCII puro, convertendo qualquer
# caractere acentuado em escape \uXXXX. Idempotente.
#
#   python tools/escape.py js/data/chapter1.js
#   python tools/escape.py js/data/chapter1.js --decode --stdout
#
# Opcoes:
#   --decode   converte escapes de volta para caractere
#   --stdout   imprime em vez de gravar
# =========================================================================
import io
import os
import re
import sys

ESCAPE_RE = re.compile(r'\\u([0-9a-fA-F]{4})')


def encode(src):
    out = []
    for ch in src:
        code = ord(ch)
        if code < 128:
            out.append(ch)
        elif code > 0xFFFF:
            # Fora do plano basico: dois escapes de par substituto, como o JS.
            code -= 0x10000
            out.append('\\u%04x' % (0xD800 + (code >> 10)))
            out.append('\\u%04x' % (0xDC00 + (code & 0x3FF)))
        else:
            out.append('\\u%04x' % code)
    return ''.join(out)


def decode(src):
    return ESCAPE_RE.sub(lambda m: chr(int(m.group(1), 16)), src)


def main(argv):
    args = argv[1:]
    files = [a for a in args if not a.startswith('--')]
    want_decode = '--decode' in args
    to_stdout = '--stdout' in args

    if not files:
        sys.stderr.write(
            'uso: python tools/escape.py <arquivo> [--decode] [--stdout]\n')
        return 1

    for path in files:
        if not os.path.isfile(path):
            sys.stderr.write('arquivo nao encontrado: %s\n' % path)
            return 1

        with io.open(path, 'r', encoding='utf-8') as fh:
            src = fh.read()

        out = decode(src) if want_decode else encode(src)

        if to_stdout:
            sys.stdout.write(out)
            continue

        if out == src:
            print('sem mudanca: %s' % path)
            continue

        with io.open(path, 'w', encoding='utf-8', newline='') as fh:
            fh.write(out)
        print(('decodificado: ' if want_decode else
               'normalizado para ASCII: ') + path)

    return 0


if __name__ == '__main__':
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    sys.exit(main(sys.argv))
