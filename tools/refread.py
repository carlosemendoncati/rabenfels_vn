#!/usr/bin/env python3
# =========================================================================
# ARQUIVO RABENFELS - tools/refread.py
#
# Leitor dos PDFs de referencia em REF/. Existe para o estudo de
# docs/estudo_referencias.md: extrai texto sem renderizar pagina, o que
# e mais barato e mais util para ler do que imagem.
#
#   python tools/refread.py --list
#   python tools/refread.py <indice|trecho-do-nome> --info
#   python tools/refread.py <indice> --pages 10-24
#   python tools/refread.py <indice> --find "clue" --window 400
#
# Requer pypdf:  python -m pip install pypdf
# =========================================================================
import argparse
import glob
import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = os.path.join(ROOT, 'REF')


def livros():
    return sorted(glob.glob(os.path.join(REF, '*.pdf')))


def limpo(nome):
    """Tira o lixo de z-library do nome do arquivo."""
    base = os.path.basename(nome)
    base = re.sub(r'\s*\(z-library[^)]*\)', '', base)
    base = re.sub(r'[-_]?z-library[^.]*', '', base)
    return base.replace('.pdf', '').strip(' -_')


def escolher(chave):
    lista = livros()
    if chave.isdigit():
        return lista[int(chave)]
    baixo = chave.lower()
    for caminho in lista:
        if baixo in os.path.basename(caminho).lower():
            return caminho
    sys.stderr.write('nao achei livro para: %s\n' % chave)
    sys.exit(1)


def normalizar(texto):
    """PDF quebra linha no meio de frase e enche de hifen de translineacao."""
    texto = texto.replace('­', '')
    texto = re.sub(r'-\n(?=[a-zà-ÿ])', '', texto)
    texto = re.sub(r'[ \t]+', ' ', texto)
    texto = re.sub(r'\n{3,}', '\n\n', texto)
    return texto.strip()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('livro', nargs='?')
    ap.add_argument('--list', action='store_true')
    ap.add_argument('--info', action='store_true')
    ap.add_argument('--pages')
    ap.add_argument('--find')
    ap.add_argument('--window', type=int, default=300)
    ap.add_argument('--max', type=int, default=25)
    args = ap.parse_args()

    if args.list or not args.livro:
        for i, caminho in enumerate(livros()):
            print('%2d  %s' % (i, limpo(caminho)))
        return 0

    from pypdf import PdfReader
    caminho = escolher(args.livro)
    leitor = PdfReader(caminho)
    total = len(leitor.pages)

    if args.info:
        print('%s\n%d paginas' % (limpo(caminho), total))
        for n in range(min(12, total)):
            t = normalizar(leitor.pages[n].extract_text() or '')
            marca = 'VAZIA' if len(t) < 40 else t[:150].replace('\n', ' / ')
            print('  p%-4d %s' % (n + 1, marca))
        return 0

    if args.find:
        alvo = args.find.lower()
        achados = 0
        for n in range(total):
            t = normalizar(leitor.pages[n].extract_text() or '')
            for m in re.finditer(re.escape(alvo), t.lower()):
                ini = max(0, m.start() - args.window // 2)
                print('--- p%d ---' % (n + 1))
                print(t[ini:ini + args.window])
                print()
                achados += 1
                if achados >= args.max:
                    return 0
                break
        return 0

    ini, _, fim = (args.pages or '1-10').partition('-')
    ini = max(1, int(ini))
    fim = min(total, int(fim or ini))
    for n in range(ini - 1, fim):
        print('\n===== p%d =====' % (n + 1))
        print(normalizar(leitor.pages[n].extract_text() or '(sem texto)'))
    return 0


if __name__ == '__main__':
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.exit(main())
