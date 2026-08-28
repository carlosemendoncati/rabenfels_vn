# -*- coding: utf-8 -*-
"""
tools/roteiro_texto.py

Tira o roteiro de dentro do JavaScript e devolve depois de editado.

------------------------------------------------------------------
POR QUE ISTO EXISTE
------------------------------------------------------------------
O roteiro mora em js/data/*.js como objeto de JavaScript, com o acento
em `\\u00e3o` e a condicao de cena em `if:{ rota:'perda', taught:'A' }`.
Isso e otimo para o motor e e impossivel para quem escreve.

    { t:'dial', ch:'klara', tx:'A senhorita conferiu o hor\\u00e1rio?',
      if:{ rota:'perda', taught:'A' } },

Ninguem reescreve uma cena assim. Este arquivo exporta para texto legivel,
com acento de verdade, e importa de volta preservando tudo o que o motor
precisa.

------------------------------------------------------------------
COMO USAR
------------------------------------------------------------------
    python tools/roteiro_texto.py --exportar per11
    python tools/roteiro_texto.py --exportar todos

        grava em roteiro/<capitulo>.txt

    (edite o .txt a vontade)

    python tools/roteiro_texto.py --importar per11
    python tools/roteiro_texto.py --importar per11 --seco   so mostra

Depois do import, SEMPRE:

    node tools/escape.js js/data/per11.js
    node tools/validate.js

------------------------------------------------------------------
O FORMATO
------------------------------------------------------------------
    ### CENA per11_ape "A pe"  bg=bg_grey_march_road bgm=-

        Cabeca de cena. Nao mexa no id, que entra em save gravado.

    KLARA · A senhorita quer pao?           uma fala
    ANTONIETTE · Pegou quanto?              outra fala
    nar · Andaram um tempo sem dizer nada.  narracao
    inn · Faltavam trinta e uma horas.      pensamento dela
    ---                                     pausa

    KLARA {A} · Eu tambem anoto.            so em taught:'A'
    nar {B} · Ela estava certa.             so em taught:'B'

        {A} {B} {C} sao a escolha do Capitulo 6 - o que ela ensinou.
        {rota} e o padrao e nao precisa escrever.

    ### CARTAO arquivo "- titulo opcional -"    cartao do Arquivo
      | primeira linha do cartao
      | segunda linha

    @ spr klara neutral right               peca tecnica: sprite, som,
    @ fade_out                              corte. Deixe como esta se
    @ sfx sfx_candle                        nao souber o que faz.

Linha em branco e ignorada. Linha comecando com `#` e comentario seu e
nao entra no jogo.

------------------------------------------------------------------
A GARANTIA
------------------------------------------------------------------
Exportar e importar sem editar nada tem de devolver o arquivo igual. O
proprio programa confere isso com --provar, e recusa gravar se o
ida-e-volta perder alguma coisa.
"""

import io
import os
import re
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DADOS = os.path.join(RAIZ, "js", "data")
TEXTO = os.path.join(RAIZ, "roteiro")

SECO = "--seco" in sys.argv

ESC = re.compile(r"\\u([0-9a-fA-F]{4})")


def dec(t):
    return ESC.sub(lambda m: chr(int(m.group(1), 16)), t)


def enc(t):
    out = []
    for ch in t:
        if ord(ch) < 128:
            out.append(ch)
        else:
            out.append("\\u%04x" % ord(ch))
    return "".join(out)


# ---------------------------------------------------------------------------
# leitura do .js
#
# Cada beat ocupa uma ou mais linhas e termina em "},". A leitura e por
# blocos e nao por linha, porque beat de escolha e de cartao do Arquivo
# se espalham por varias linhas.
# ---------------------------------------------------------------------------

def blocos(src):
    """Corta o arquivo em (antes, beat, depois) preservando tudo."""
    saida = []
    i = 0
    n = len(src)
    while i < n:
        j = src.find("{ t:'", i)
        if j == -1:
            saida.append(("bruto", src[i:]))
            break
        if j > i:
            saida.append(("bruto", src[i:j]))
        # acha o fim do beat: fecha chaves contando profundidade
        prof = 0
        k = j
        dentro = None
        while k < n:
            c = src[k]
            if dentro:
                if c == "\\":
                    k += 2
                    continue
                if c == dentro:
                    dentro = None
            elif c in "'\"":
                dentro = c
            elif c == "{":
                prof += 1
            elif c == "}":
                prof -= 1
                if prof == 0:
                    k += 1
                    break
            k += 1
        saida.append(("beat", src[j:k]))
        i = k
    return saida


CAMPO = {
    "t":  re.compile(r"\bt:'([a-z_]+)'"),
    "ch": re.compile(r"\bch:'([a-z_0-9]+)'"),
    "tx": re.compile(r"\btx:'((?:[^'\\]|\\.)*)'"),
    "id": re.compile(r"\bid:'([a-z_0-9]+)'"),
    "title": re.compile(r"\btitle:'((?:[^'\\]|\\.)*)'"),
    "bg": re.compile(r"\bbg:'([a-z_0-9]+)'"),
    "bgm": re.compile(r"\bbgm:'([a-z_0-9]+)'"),
    "ex": re.compile(r"\bex:'([a-z_0-9]+)'"),
    "pos": re.compile(r"\bpos:'([a-z_0-9]+)'"),
}

TAUGHT = re.compile(r"taught:'([ABC])'")


def campo(beat, nome):
    m = CAMPO[nome].search(beat)
    return m.group(1) if m else None


def marca(beat):
    """Devolve {A} / {B} / {C} quando o beat e condicional ao ensino."""
    m = TAUGHT.search(beat)
    return "{%s}" % m.group(1) if m else ""


# ---------------------------------------------------------------------------
# exportar
# ---------------------------------------------------------------------------

SIMPLES = {"pause": "---", "fade_out": "@ fade_out", "fade_in": "@ fade_in",
           "spr_clear": "@ spr_clear"}

LNS = re.compile(r"lns:\s*\[(.*?)\]", re.S)
UMA = re.compile(r"'((?:[^'\\]|\\.)*)'")
KEY = re.compile(r"\bkey:'([a-z_0-9]+)'")
LABEL = re.compile(r"\blabel:'((?:[^'\\]|\\.)*)'")


def exporta_arc(b, sufixo):
    """Cartao do Arquivo: o documento diegetico citado em cena.

    Sai legivel porque e texto da obra, e nao peca tecnica. Cada linha do
    cartao vira uma linha comecada por barra.
    """
    key = KEY.search(b)
    lab = LABEL.search(b)
    cab = "### CARTAO %s%s" % (key.group(1) if key else "arquivo", sufixo)
    if lab:
        cab += ' "%s"' % dec(lab.group(1))

    corpo = LNS.search(b)
    linhas = [cab]
    if corpo:
        for m in UMA.finditer(corpo.group(1)):
            linhas.append("  | " + dec(m.group(1)))
    return "\n".join(linhas)


def exporta_beat(b):
    t = campo(b, "t")
    mk = marca(b)
    sufixo = (" " + mk) if mk else ""

    if t == "pause":
        return "---" + sufixo
    if t in ("fade_out", "fade_in", "spr_clear"):
        return "@ " + t + sufixo
    if t == "scene":
        return ('### CENA %s%s "%s"  bg=%s bgm=%s'
                % (campo(b, "id") or "-", sufixo,
                   dec(campo(b, "title") or ""),
                   campo(b, "bg") or "-", campo(b, "bgm") or "-"))
    if t == "spr":
        return ("@ spr %s %s %s%s" % (campo(b, "ch"), campo(b, "ex") or "-",
                                      campo(b, "pos") or "-", sufixo))
    if t == "spr_hide":
        return "@ spr_hide %s%s" % (campo(b, "ch"), sufixo)
    if t in ("nar", "inn"):
        return "%s%s . %s" % (t, sufixo, dec(campo(b, "tx") or ""))
    if t == "dial":
        return "%s%s . %s" % ((campo(b, "ch") or "?").upper(), sufixo,
                              dec(campo(b, "tx") or ""))

    if t == "arc":
        return exporta_arc(b, sufixo)

    # Tudo o mais - escolha, fim de capitulo, som - sai como bloco opaco,
    # em UMA linha. Em varias linhas, dois beats opacos seguidos se
    # fundiam num so na volta: era assim que per11 perdia cinco beats.
    # A virgula fica FORA do bloco - `blocos()` corta no `}` e a `,` que
    # separa um beat do proximo nao entra. Recolocada aqui, senao o array
    # sai com dois objetos colados e o arquivo nao carrega.
    return "@@@ " + " ".join(b.split()) + ","


def exporta(nome):
    origem = os.path.join(DADOS, nome + ".js")
    if not os.path.isfile(origem):
        sys.stderr.write("nao achei: " + origem + "\n")
        return None

    src = io.open(origem, encoding="utf-8").read()
    linhas = []
    linhas.append("# " + nome + " - roteiro em texto")
    linhas.append("#")
    linhas.append("# Edite as falas a vontade. Nao mexa nas linhas que comecam")
    linhas.append("# com @@@ nem no id das cenas.")
    linhas.append("#")
    linhas.append("# Depois: python tools/roteiro_texto.py --importar " + nome)
    linhas.append("")

    for tipo, corpo in blocos(src):
        if tipo != "beat":
            continue
        linhas.append(exporta_beat(corpo))

    destino = os.path.join(TEXTO, nome + ".txt")
    if not os.path.isdir(TEXTO):
        os.makedirs(TEXTO)
    io.open(destino, "w", encoding="utf-8", newline="\n").write(
        "\n".join(linhas) + "\n")
    return destino, sum(1 for t, _ in blocos(src) if t == "beat")


# ---------------------------------------------------------------------------
# importar
# ---------------------------------------------------------------------------

CENA = re.compile(r'^### CENA (\S+?)(?:\s*\{([ABC])\})?\s+"([^"]*)"'
                  r'\s+bg=(\S+) bgm=(\S+)')
FALA = re.compile(r"^([A-Z][A-Z_0-9]*|nar|inn)(?:\s*\{([ABC])\})?\s*\.\s?(.*)$")
TECNICA = re.compile(r"^@ (\w+)(?:\s+(.*))?$")
CARTAO = re.compile(r'^### CARTAO (\S+?)(?:\s*\{([ABC])\})?(?:\s+"([^"]*)")?\s*$')
CARTAO_LN = re.compile(r"^\s*\|\s?(.*)$")
PAUSA = re.compile(r"^---(?:\s*\{([ABC])\})?\s*$")


def cond(letra, rota):
    """A condicao do beat, no dialeto do arquivo.

    `rota` vem None quando o .js nao declara `var R` - e o caso do
    Epilogo, que e compartilhado pelas quatro rotas e cujos beats em
    maioria nao tem `if:` nenhum. Emitir `if:R` ali quebraria o arquivo
    na primeira gravacao.
    """
    if letra and rota:
        return "{ rota:'%s', taught:'%s' }" % (rota, letra)
    if letra:
        return "{ taught:'%s' }" % letra
    return "R" if rota else None


def importa(nome):
    origem = os.path.join(TEXTO, nome + ".txt")
    alvo = os.path.join(DADOS, nome + ".js")
    if not os.path.isfile(origem):
        sys.stderr.write("nao achei: " + origem + "\n")
        return 2

    src = io.open(alvo, encoding="utf-8").read()
    m = re.search(r"var R = \{ rota: '(\w+)' \}", src)
    rota = m.group(1) if m else None

    # cabeca e rodape do .js ficam intactos
    partes = blocos(src)
    ini = next(i for i, (t, _) in enumerate(partes) if t == "beat")
    fim = len(partes) - 1 - next(i for i, (t, _) in enumerate(reversed(partes))
                                 if t == "beat")
    cabeca = "".join(c for t, c in partes[:ini])
    rodape = "".join(c for t, c in partes[fim + 1:])

    novos = []
    opaco = []
    cartao = None
    cartao_cab = None

    def sufixo_if(letra):
        c = cond(letra, rota)
        return (", if:%s" % c) if c else ""

    def fecha_cartao(cab, linhas_cartao):
        key, letra, label = cab
        b = "{ t:'arc', key:'%s'" % key
        if label:
            b += ", label:'%s'" % enc(label.replace("'", "\\'"))
        corpo = ",\n    ".join(
            "'%s'" % enc(x.replace("\\", "\\\\").replace("'", "\\'"))
            for x in linhas_cartao)
        b += ", lns:[\n    " + corpo + "\n]"
        b += "%s }," % sufixo_if(letra)
        return b

    for linha in io.open(origem, encoding="utf-8").read().split("\n"):
        if linha.startswith("@@@"):
            # Fecha o cartao ANTES de enfileirar o opaco. Sem isto o
            # opaco entra primeiro e o cartao so e fechado no proximo
            # texto normal: os dois saem trocados de lugar, com o
            # total de beats intacto. Era o que acontecia no Capitulo
            # 3, com o cartao da Entrada 31 e a vela logo depois.
            if cartao is not None:
                novos.append(fecha_cartao(cartao_cab, cartao))
                cartao = None
            corpo_op = linha[4:] if len(linha) > 4 else ""
            if corpo_op and not corpo_op.rstrip().endswith(","):
                corpo_op = corpo_op.rstrip() + ","
            opaco.append(corpo_op)
            continue
        if opaco:
            novos.append("\n".join(opaco))
            opaco = []

        s = linha.strip()
        # `###` abre cena e cartao, e tambem comeca com `#`: sem esta
        # excecao as cinco cenas de per11 caiam no filtro de comentario e
        # sumiam na volta. Foi o provador que pegou.
        if not s or (s.startswith("#") and not s.startswith("###")):
            continue

        # linha de cartao: pertence ao cartao aberto logo acima
        m = CARTAO_LN.match(linha)
        if m and cartao is not None:
            cartao.append(m.group(1))
            continue
        if cartao is not None:
            novos.append(fecha_cartao(cartao_cab, cartao))
            cartao = None

        m = CARTAO.match(s)
        if m:
            cartao_cab = (m.group(1), m.group(2), m.group(3))
            cartao = []
            continue

        m = PAUSA.match(s)
        if m:
            novos.append("{ t:'pause'%s }," % sufixo_if(m.group(1)))
            continue

        m = CENA.match(s)
        if m:
            sid, letra_cena, tit, bg, bgm = m.groups()
            b = "{ t:'scene', id:'%s', chapter:'%s'" % (sid, nome)
            if tit:
                b += ", title:'%s'" % enc(tit.replace("'", "\\'"))
            if bg != "-":
                b += ", bg:'%s'" % bg
            b += ", bgm:%s" % ("null" if bgm == "-" else "'%s'" % bgm)
            novos.append(b + "%s }," % sufixo_if(letra_cena))
            continue

        m = TECNICA.match(s)
        if m:
            tipo, resto = m.group(1), (m.group(2) or "").strip()
            mk = re.search(r"\{([ABC])\}", resto)
            letra = mk.group(1) if mk else None
            resto = re.sub(r"\s*\{[ABC]\}", "", resto).strip()
            arg = resto.split()
            if tipo == "spr" and len(arg) >= 3:
                novos.append("{ t:'spr', ch:'%s', ex:'%s', pos:'%s'%s },"
                             % (arg[0], arg[1], arg[2], sufixo_if(letra)))
            elif tipo == "spr_hide" and arg:
                novos.append("{ t:'spr_hide', ch:'%s'%s },"
                             % (arg[0], sufixo_if(letra)))
            else:
                novos.append("{ t:'%s'%s }," % (tipo, sufixo_if(letra)))
            continue

        m = FALA.match(s)
        if m:
            quem, letra, texto = m.groups()
            texto = enc(texto.replace("\\", "\\\\").replace("'", "\\'"))
            if quem in ("nar", "inn"):
                novos.append("{ t:'%s', tx:'%s'%s },"
                             % (quem, texto, sufixo_if(letra)))
            else:
                novos.append("{ t:'dial', ch:'%s', tx:'%s'%s },"
                             % (quem.lower(), texto, sufixo_if(letra)))
            continue

        sys.stderr.write("linha que nao entendi, e que sai do resultado:\n  "
                         + s + "\n")

    if cartao is not None:
        novos.append(fecha_cartao(cartao_cab, cartao))
    if opaco:
        novos.append("\n".join(opaco))

    # A ultima virgula precisa sair, senao o array fica com buraco.
    corpo = "\n".join(novos)
    corpo = re.sub(r",\s*$", "", corpo.rstrip())

    saida = cabeca + corpo + "\n" + rodape.lstrip("\n")

    if SECO:
        print(saida[:1200])
        print("...")
        print("(--seco: nada foi gravado)")
        return 0

    io.open(alvo, "w", encoding="utf-8", newline="\n").write(saida)
    # Blocos, nao beats: bloco opaco e escolha saem inteiros num
    # item so. Quem prova paridade de beat e --provar, que carrega
    # os dois arquivos e compara beat a beat.
    print("gravado: js/data/%s.js  (%d blocos)" % (nome, len(novos)))
    print("agora rode:  node tools/escape.js js/data/%s.js" % nome)
    print("             node tools/validate.js")
    return 0


# ---------------------------------------------------------------------------
# prova de ida e volta
# ---------------------------------------------------------------------------

def prova(nome):
    """Exporta e importa sem editar. O .js tem de sobreviver igual.

    Nao compara byte a byte - o import normaliza espaco e ordem de campo.
    Compara o que importa: a lista de beats que o motor vai executar.
    """
    alvo = os.path.join(DADOS, nome + ".js")
    antes = io.open(alvo, encoding="utf-8").read()

    def resumo(src):
        out = []
        for t, c in blocos(src):
            if t != "beat":
                continue
            extra = ""
            if campo(c, "t") == "arc":
                corpo = LNS.search(c)
                if corpo:
                    extra = "|".join(dec(m.group(1))
                                     for m in UMA.finditer(corpo.group(1)))
            out.append((campo(c, "t"), campo(c, "ch"),
                        dec(campo(c, "tx") or "") + extra, marca(c)))
        return out

    r0 = resumo(antes)
    exporta(nome)
    global SECO
    guardado, SECO = SECO, False
    importa(nome)
    SECO = guardado
    r1 = resumo(io.open(alvo, encoding="utf-8").read())

    # Restaura SEMPRE, inclusive quando passa. A versao anterior so
    # restaurava na falha, e um ida-e-volta bem-sucedido deixava o .js
    # reescrito - outra formatacao, e sem a virgula do bloco opaco.
    # Cinco capitulos quebraram assim, sem aviso nenhum, porque a prova
    # dizia "sem perda" e mesmo assim mexia no arquivo.
    io.open(alvo, "w", encoding="utf-8", newline="\n").write(antes)

    if r0 == r1:
        print("  ida e volta sem perda: %d beats iguais" % len(r0))
        return 0

    print("  PERDA no ida e volta: %d -> %d beats" % (len(r0), len(r1)))
    for i in range(min(len(r0), len(r1))):
        if r0[i] != r1[i]:
            print("  primeiro diferente, beat %d:" % i)
            print("    antes:  %s" % (r0[i],))
            print("    depois: %s" % (r1[i],))
            break
    print("  o .js foi restaurado ao estado anterior")
    return 1


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]

    def alvos_de(args):
        """Os capitulos pedidos. "todos" vale nos tres modos."""
        alvos = args or ["per11"]
        if alvos == ["todos"]:
            alvos = sorted(f[:-3] for f in os.listdir(DADOS)
                           if f.endswith(".js") and f not in
                           ("arvore.js", "quatro_paginas.js", "cob_mapas.js"))
        return alvos

    if "--exportar" in sys.argv:
        for nome in alvos_de(args):
            r = exporta(nome)
            if r:
                print("%-12s -> %s  (%d beats)"
                      % (nome, os.path.relpath(r[0], RAIZ), r[1]))
        return 0

    if "--importar" in sys.argv:
        for nome in alvos_de(args):
            c = importa(nome)
            if c:
                return c
        return 0

    if "--provar" in sys.argv:
        ruim = 0
        for nome in alvos_de(args):
            print(nome)
            ruim += prova(nome)
        return 1 if ruim else 0

    sys.stderr.write(__doc__)
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
