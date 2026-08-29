# -*- coding: utf-8 -*-
"""Aplica ao CSS do jogo o que foi ajustado em tools/hud.html.

    python tools/hud_aplica.py               # le tools/hud_alteracoes.css
    python tools/hud_aplica.py meu.css
    python tools/hud_aplica.py --seco        # mostra e nao grava

Entrada: o bloco que o editor produz, uma declaracao por seletor,
precedido do arquivo em que ela mora.

    /* css/rpg.css */
    .rf-perc__fala { bottom: calc(var(--rbf-ui) * 18px); }

O programa acha a regra daquele seletor no arquivo indicado e troca so a
propriedade citada. Nao move regra de lugar, nao cria seletor novo e nao
mexe em nada que a entrada nao nomeie.

O que ele NAO faz, de proposito: cor, duracao e easing. Esses vivem em
css/tokens.css por regra do projeto, e um editor de medidas nao tem o
que dizer sobre eles. Se aparecer uma dessas propriedades na entrada, o
programa para.

Backup antes de gravar.
"""
import io
import os
import re
import shutil
import sys
import time

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PADRAO = os.path.join(RAIZ, "tools", "hud_alteracoes.css")

# Medida, e nao identidade. A lista e curta de proposito: o que nao esta
# aqui nao entra por este caminho.
PERMITIDAS = {
    "padding", "margin", "width", "height", "min-height", "max-height",
    "min-width", "max-width", "gap", "bottom", "top", "left", "right",
    "font-size", "line-height", "letter-spacing", "border-radius",
    "border-image-width", "border-image-outset",
    # Tokens de MEDIDA. Cor, duracao e easing continuam de fora.
    "--rbf-text-base", "--rbf-ui"
}
PROIBIDAS = {"color", "background", "background-color", "border-color",
             "transition", "animation", "opacity", "box-shadow"}

CABECA = re.compile(r"/\*\s*(css/[\w./-]+)\s*\*/")
# `--` no comeco: as propriedades tambem podem ser tokens.
REGRA = re.compile(r"^(?P<sel>[^{}]+?)\s*\{\s*(?P<prop>-{0,2}[a-z][a-z-]*)\s*:\s*(?P<val>.+?)\s*;?\s*\}\s*$")


def entradas(texto):
    """Le o bloco do editor: (arquivo, seletor, propriedade, valor)."""
    arq = None
    out = []
    for bruto in texto.split("\n"):
        linha = bruto.strip()
        if not linha:
            continue
        m = CABECA.match(linha)
        if m:
            arq = m.group(1)
            continue
        if linha.startswith("/*"):
            continue
        m = REGRA.match(linha)
        if not m:
            raise SystemExit("nao entendi a linha:\n  " + bruto)
        if arq is None:
            raise SystemExit("linha sem arquivo antes dela:\n  " + bruto)
        out.append((arq, m.group("sel").strip(),
                    m.group("prop"), m.group("val")))
    return out


def bloco(src, seletor):
    """(inicio, fim) do corpo da regra daquele seletor, ou None.

    Duas exigencias, e as duas nasceram de erro:

    - Casa o seletor INTEIRO, e nao por substring: `.rf-perc__fala` nao
      pode achar `.rf-perc__fala.is-on`.
    - So regra de PRIMEIRO NIVEL. `.rf-perc__fala` existe na base e
      tambem dentro de `@media (max-height: 460px)`; a versao anterior
      pegava a primeira que achasse e foi mexer na do telefone deitado,
      deixando a base intacta. Media query e excecao escrita de
      proposito e nao se edita por engano.
    """
    alvo = re.sub(r"\s+", " ", seletor).strip()
    prof = 0
    i = 0
    inicio_sel = 0
    while i < len(src):
        c = src[i]
        if c == "/" and src[i:i + 2] == "/*":
            fim = src.find("*/", i)
            i = (fim + 2) if fim >= 0 else len(src)
            inicio_sel = i
            continue
        if c == "{":
            cabeca = src[inicio_sel:i].strip()
            prof += 1
            if prof == 1 and not cabeca.startswith("@"):
                sels = [re.sub(r"\s+", " ", x).strip()
                        for x in cabeca.split(",") if x.strip()]
                if alvo in sels:
                    j, d = i + 1, 1
                    while j < len(src) and d:
                        if src[j] == "{":
                            d += 1
                        elif src[j] == "}":
                            d -= 1
                        j += 1
                    return i + 1, j - 1
            i += 1
            inicio_sel = i
            continue
        if c == "}":
            prof -= 1
            i += 1
            inicio_sel = i
            continue
        i += 1
    return None


def troca(corpo, prop, valor):
    """Troca a propriedade no corpo da regra; acrescenta se faltar."""
    p = re.compile(r"(?m)^(\s*)%s\s*:\s*[^;]*;" % re.escape(prop))
    if p.search(corpo):
        return p.sub(lambda m: "%s%s: %s;" % (m.group(1), prop, valor),
                     corpo, count=1), True
    ind = "  "
    m = re.search(r"(?m)^(\s+)\S", corpo)
    if m:
        ind = m.group(1)
    return corpo.rstrip() + "\n%s%s: %s;\n" % (ind, prop, valor), False


def grava(caminho, texto, pasta):
    if not os.path.isdir(pasta):
        os.makedirs(pasta)
    shutil.copy2(caminho, os.path.join(pasta, os.path.basename(caminho)))
    io.open(caminho, "w", encoding="utf-8", newline="\n").write(texto)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    seco = "--seco" in sys.argv
    origem = args[0] if args else PADRAO
    if not os.path.exists(origem):
        sys.stderr.write(
            "nao achei %s\n\n"
            "Abra tools/hud.html num servidor local, ajuste, clique em\n"
            "\"Copiar CSS\" e salve como tools/hud_alteracoes.css.\n"
            % os.path.relpath(origem, RAIZ))
        return 2

    itens = entradas(io.open(origem, encoding="utf-8").read())
    if not itens:
        print("nada a mudar.")
        return 0

    porArquivo = {}
    for arq, sel, prop, val in itens:
        if prop in PROIBIDAS:
            raise SystemExit(
                "PAROU: '%s' nao entra por aqui.\n"
                "  Cor, duracao e easing vivem em css/tokens.css por regra\n"
                "  do projeto, e um editor de medida nao decide sobre eles."
                % prop)
        if prop not in PERMITIDAS:
            raise SystemExit("PAROU: propriedade fora da lista: " + prop)
        porArquivo.setdefault(arq, []).append((sel, prop, val))

    pasta = os.path.join(RAIZ, "_backup",
                         "pre_hud_%s" % time.strftime("%Y%m%d_%H%M%S"))
    n = 0
    for arq, mudancas in porArquivo.items():
        caminho = os.path.join(RAIZ, arq.replace("/", os.sep))
        if not os.path.exists(caminho):
            raise SystemExit("nao achei " + arq)
        src = io.open(caminho, encoding="utf-8").read()
        print(arq + ":")
        for sel, prop, val in mudancas:
            pos = bloco(src, sel)
            if pos is None:
                raise SystemExit(
                    "PAROU: nao achei a regra `%s` em %s.\n"
                    "  O seletor mudou desde a edicao. Reabra tools/hud.html."
                    % (sel, arq))
            a, b = pos
            antes = src[a:b]
            depois, existia = troca(antes, prop, val)
            if depois == antes:
                continue
            velho = re.search(r"(?m)^\s*%s\s*:\s*([^;]*);" % re.escape(prop), antes)
            print("  %-58s %s" % (sel, prop))
            print("      %s  ->  %s"
                  % (velho.group(1).strip() if velho else "(nao existia)", val))
            src = src[:a] + depois + src[b:]
            n += 1
        if not seco:
            grava(caminho, src, pasta)

    if seco:
        print("\n--seco: %d alteracao(oes) NAO gravadas." % n)
    else:
        print("\n%d alteracao(oes) gravadas. Backup em %s"
              % (n, os.path.relpath(pasta, RAIZ)))
        print("Agora rode:  node tools/validate.js && node tools/cobertura_shots.js")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
