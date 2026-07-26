#!/usr/bin/env python3
# =========================================================================
# ARQUIVO RABENFELS - tools/refextract.py
#
# Extrai os PDFs de REF/ para texto limpo em REF/_txt/, uma vez so.
#
# Motivo: ler pagina de PDF direto custa caro e devolve muito lixo
# (rodape, URL de citacao, cabecalho repetido). Com o corpus em texto o
# estudo fica pesquisavel e a releitura sai de graca.
#
#   python tools/refextract.py           extrai o que falta
#   python tools/refextract.py --force   refaz tudo
#
# REF/_txt/ nao entra no git.
# =========================================================================
import glob
import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = os.path.join(ROOT, 'REF')
OUT = os.path.join(REF, '_txt')

# Lixo tipico de PDF academico e de e-book pirata.
RUIDO = [
    re.compile(r'^\s*DOI:\s*10\.\S+\s*$', re.M),
    re.compile(r'^\s*https?://\S+\s*$', re.M),
    re.compile(r'^\s*www\.\S+\s*$', re.M),
    re.compile(r'^\s*\d+\s*$', re.M),                      # numero de pagina solto
    re.compile(r'^\s*z-lib\S*\s*$', re.M | re.I),
]


def nome_curto(caminho):
    base = os.path.basename(caminho)
    base = re.sub(r'\s*\(z-library[^)]*\)', '', base)
    base = re.sub(r'[-_]?z-library[^.]*', '', base)
    base = base.replace('.pdf', '').strip(' -_')
    base = re.sub(r'[^A-Za-z0-9]+', '_', base).strip('_')
    return base[:60].lower()


def limpar(texto):
    texto = texto.replace('\xad', '')
    # translineacao: "confe-\nrir" -> "conferir"
    texto = re.sub(r'-\n(?=[a-zà-ÿ])', '', texto)
    # quebra no meio de palavra que o extrator inventa: "confe \nrir"
    texto = re.sub(r'(?<=[a-zà-ÿ])\n(?=[a-zà-ÿ]{2,})', '', texto)
    for padrao in RUIDO:
        texto = padrao.sub('', texto)
    texto = re.sub(r'[ \t]+', ' ', texto)
    texto = re.sub(r'\n{3,}', '\n\n', texto)
    return texto.strip()


def main():
    from pypdf import PdfReader
    forcar = '--force' in sys.argv
    if not os.path.isdir(OUT):
        os.makedirs(OUT)

    for caminho in sorted(glob.glob(os.path.join(REF, '*.pdf'))):
        destino = os.path.join(OUT, nome_curto(caminho) + '.txt')
        if os.path.exists(destino) and not forcar:
            print('ja existe: %s' % os.path.basename(destino))
            continue

        leitor = PdfReader(caminho)
        total = len(leitor.pages)
        partes = []
        for n in range(total):
            try:
                bruto = leitor.pages[n].extract_text() or ''
            except Exception:
                bruto = ''
            texto = limpar(bruto)
            if texto:
                partes.append('[[p%d]]\n%s' % (n + 1, texto))
            if (n + 1) % 250 == 0:
                sys.stderr.write('  %s: %d/%d\n' % (os.path.basename(destino), n + 1, total))

        corpo = '\n\n'.join(partes)
        io.open(destino, 'w', encoding='utf-8', newline='\n').write(corpo)
        print('%-46s %5d paginas  %7d palavras' %
              (os.path.basename(destino), total, len(corpo.split())))
    return 0


if __name__ == '__main__':
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.exit(main())
