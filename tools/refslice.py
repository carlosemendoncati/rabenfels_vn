# -*- coding: utf-8 -*-
"""Fatiador de corpus para o estudo das referencias.

Uso:
    python tools/refslice.py <arquivo.txt> --toc "regex"
    python tools/refslice.py <arquivo.txt> --range INICIO FIM
    python tools/refslice.py <arquivo.txt> --find "termo" [--window 800]

Escreve sempre em UTF-8, independente do codepage do console.
"""
import io
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def carregar(nome):
    caminho = nome
    if not os.path.exists(caminho):
        caminho = os.path.join(BASE, "REF", "_txt", nome)
    if not os.path.exists(caminho) and not caminho.endswith(".txt"):
        caminho += ".txt"
    return io.open(caminho, encoding="utf-8", errors="replace").read()


def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 1
    texto = carregar(argv[1])
    resto = argv[2:]

    if "--toc" in resto:
        i = resto.index("--toc")
        padrao = resto[i + 1] if len(resto) > i + 1 else r"(?mi)^\s*chapter\s+\w+"
        for m in re.finditer(padrao, texto):
            trecho = m.group(0).strip().replace("\n", " ")
            print("%8d  %s" % (m.start(), trecho[:90]))
        return 0

    if "--range" in resto:
        i = resto.index("--range")
        ini = int(resto[i + 1])
        fim = int(resto[i + 2])
        print(texto[ini:fim])
        return 0

    if "--find" in resto:
        i = resto.index("--find")
        termo = resto[i + 1]
        janela = 800
        if "--window" in resto:
            janela = int(resto[resto.index("--window") + 1])
        achou = 0
        for m in re.finditer(re.escape(termo), texto, re.IGNORECASE):
            ini = max(0, m.start() - janela // 4)
            print("\n===== offset %d =====" % m.start())
            print(texto[ini:m.start() + janela])
            achou += 1
            if achou >= 6:
                break
        if not achou:
            print("nada encontrado para %r" % termo)
        return 0

    print("tamanho: %d caracteres" % len(texto))
    print(texto[:2000])
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
