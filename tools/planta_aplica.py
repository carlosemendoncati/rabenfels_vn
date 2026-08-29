# -*- coding: utf-8 -*-
"""Aplica ao jogo o que foi ajustado em tools/planta.html.

    python tools/planta_aplica.py                     # le planta_alteracoes.json
    python tools/planta_aplica.py meu.json
    python tools/planta_aplica.py --seco              # mostra e nao grava

O editor nao escreve no jogo de proposito: ele roda num navegador, sobre
uma copia em memoria, e cospe um JSON. Quem toca no repositorio e este
arquivo, que faz uma coisa so e da para ler inteiro.

Formato de entrada:

    {
      "props": { "porta_fechada": { "escala": 1.7 } },
      "salas": {
        "corredor": {
          "moveis": { "2": { "x": 1540, "y": 240, "escala": 1.7 } },
          "pontos": { "0": { "x": 780, "y": 214 } }
        }
      }
    }

`props` mexe no manifesto (js/config.js) e vale para toda ocorrencia
daquele movel. `salas` mexe na instancia (js/data/cob_mapas.js) e vale
so ali.

Ha mais dois ramos, que mexem no TAMANHO da lista:

    "removidos": { "corredor": { "moveis": [3, 7] } },
    "novos":     { "corredor": { "saidas": [ { "x": 30, ... } ] } }

Eles rodam nesta ordem, e a ordem nao e negociavel: trocar campo
enquanto os indices ainda valem, remover de tras para a frente, e so
entao inserir - insercao no fim nao desloca ninguem.

O indice e o do array NO ARQUIVO, e nao o da lista filtrada por fase ou
cena - e o editor ja manda o indice certo. Ainda assim, cada alteracao e
conferida contra o objeto que esta naquela posicao antes de gravar: se
alguem inserir um movel no meio do array entre a edicao e a aplicacao, o
programa para em vez de mover a coisa errada.

Backup antes de gravar, como manda o projeto.
"""
import io
import json
import os
import re
import shutil
import sys
import time

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONFIG = os.path.join(RAIZ, "js", "config.js")
MAPAS = os.path.join(RAIZ, "js", "data", "cob_mapas.js")
PADRAO = os.path.join(RAIZ, "tools", "planta_alteracoes.json")

# Medida e geometria. Nome, texto e id nao passam por aqui: quem
# escreve fala e o roteiro, e nao um editor de planta.
CAMPOS_NUM = ("x", "y", "escala", "giro", "camada", "w", "h", "raio",
              "alto", "base", "px", "py")
# Campos de texto curto que a planta pode mudar: destino de saida e
# virada ao chegar. Nao entra fala nem id: quem escreve texto e o
# roteiro.
CAMPOS_TXT = ("para", "dir")


# --------------------------------------------------------------------------
# leitura do .js sem executar javascript
#
# Nao ha parser de JS aqui e nao deve haver: o que se precisa saber e onde
# comeca e onde acaba cada objeto de cada lista, e isso um contador de
# chaves resolve, desde que ele saiba pular texto entre aspas.
# --------------------------------------------------------------------------

def objetos(src, ini):
    """Os pares (comeco, fim) de cada objeto do array que comeca em `ini`.

    `ini` aponta para o '[' do array. Devolve as fatias de primeiro nivel,
    ignorando chaves dentro de string.
    """
    i = ini
    assert src[i] == "[", "esperava '[' em %d" % i
    i += 1
    fora = []
    prof = 0
    comeco = None
    aspas = None
    while i < len(src):
        c = src[i]
        if aspas:
            if c == "\\":
                i += 2
                continue
            if c == aspas:
                aspas = None
            i += 1
            continue
        if c in "'\"":
            aspas = c
            i += 1
            continue
        if c == "{":
            if prof == 0:
                comeco = i
            prof += 1
        elif c == "}":
            prof -= 1
            if prof == 0:
                fora.append((comeco, i + 1))
        elif c == "]" and prof == 0:
            break
        i += 1
    return fora


def acha_lista(src, sala, grupo):
    """Posicao do '[' da lista `grupo` dentro do bloco da sala."""
    m = re.search(r"^%s: \{" % re.escape(sala), src, re.M)
    if not m:
        return None
    # o fim do bloco da sala: a proxima linha que comeca com '},'
    fim = src.find("\n},", m.end())
    if fim < 0:
        fim = len(src)
    m2 = re.search(r"^  %s: \[" % re.escape(grupo), src[m.end():fim], re.M)
    if not m2:
        return None
    return m.end() + m2.end() - 1


def campo_do_objeto(txt, nome):
    """Valor cru de um campo simples do objeto, ou None."""
    m = re.search(r"(?<![\w$])%s\s*:\s*('[^']*'|[-\d.]+|true|false)"
                  % re.escape(nome), txt)
    return m.group(1) if m else None


def poe_campo(txt, nome, valor, texto=False):
    """Troca o campo se existir; acrescenta logo depois de '{' se nao."""
    if texto:
        novo = "null" if valor is None else "'%s'" % str(valor).replace("'", "\'")
    else:
        novo = fmt(valor)
    padrao = re.compile(r"((?<![\w$])%s\s*:\s*)('[^']*'|[-\d.]+|true|false)"
                        % re.escape(nome))
    if padrao.search(txt):
        return padrao.sub(lambda m: m.group(1) + novo, txt, count=1)
    return txt[:1] + " %s: %s," % (nome, novo) + txt[1:]


def fmt(v):
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, float):
        if abs(v - round(v)) < 1e-9:
            return str(int(round(v)))
        return ("%.4f" % v).rstrip("0").rstrip(".")
    return str(v)


# Campos com valor neutro: escrever o neutro num objeto que nao declara
# o campo nao muda nada e suja o arquivo.
NEUTROS = {"giro": 0.0, "camada": 0.0, "escala": 1.0}


def props_do_manifesto():
    """{ tipo: { campo: valor } } lido de RBF.COBERTURA.props.

    Texto, e nao JavaScript: so interessam os numeros de `escala`,
    `giro` e `camada`, e um regex por linha da conta.
    """
    src = io.open(CONFIG, encoding="utf-8").read()
    fora = {}
    for m in re.finditer(r"(?m)^\s*([a-z_0-9]+):\s*\{([^}]*file:[^}]*)\}", src):
        campos = {}
        for nome in NEUTROS:
            v = re.search(r"(?<![\w$])%s\s*:\s*([-\d.]+)" % nome, m.group(2))
            if v:
                campos[nome] = float(v.group(1))
        if campos:
            fora[m.group(1)] = campos
    return fora


_PROPS = None


def sem_efeito(txt, nome, valor):
    """O valor pedido ja e o que vale para este objeto hoje?"""
    global _PROPS
    if nome not in NEUTROS:
        return False
    try:
        pedido = float(valor)
    except (TypeError, ValueError):
        return False

    # Declarado no proprio objeto: quem manda e ele.
    crua = campo_do_objeto(txt, nome)
    if crua is not None:
        try:
            return float(crua.strip("'")) == pedido
        except ValueError:
            return False

    # Senao, o manifesto do tipo; senao, o neutro.
    if _PROPS is None:
        _PROPS = props_do_manifesto()
    tipo = campo_do_objeto(txt, "tipo")
    efetivo = NEUTROS[nome]
    if tipo:
        efetivo = _PROPS.get(tipo.strip("'"), {}).get(nome, NEUTROS[nome])
    return efetivo == pedido


# --------------------------------------------------------------------------
# aplicacao
# --------------------------------------------------------------------------

def confere(txt, esperado, onde):
    """Guarda-corpo: o objeto naquela posicao ainda e o mesmo?

    O indice vem de uma edicao que aconteceu antes, possivelmente em outra
    sessao. Se alguem inseriu um movel no meio do array desde entao, o
    indice aponta para outra coisa - e mover a coisa errada em silencio e
    exatamente o tipo de estrago que este projeto ja levou uma vez.
    """
    if not esperado:
        return
    for chave, valor in esperado.items():
        crua = campo_do_objeto(txt, chave)
        if crua is None:
            continue
        if crua.strip("'") != str(valor):
            raise SystemExit(
                "PAROU em %s: esperava %s=%s e achei %s.\n"
                "  O array mudou desde a edicao. Reabra tools/planta.html "
                "e refaca este ajuste." % (onde, chave, valor, crua))


def aplica_salas(alt, seco):
    src = io.open(MAPAS, encoding="utf-8").read()
    tocados = 0

    # De tras para a frente: cada substituicao muda o comprimento do texto
    # e invalidaria as posicoes seguintes.
    trabalho = []
    for sala, grupos in alt.items():
        for grupo, itens in grupos.items():
            pos = acha_lista(src, sala, grupo)
            if pos is None:
                raise SystemExit("nao achei %s.%s em cob_mapas.js" % (sala, grupo))
            fatias = objetos(src, pos)
            for idx, campos in itens.items():
                i = int(idx)
                if i >= len(fatias):
                    raise SystemExit(
                        "%s.%s[%d] nao existe (a lista tem %d)"
                        % (sala, grupo, i, len(fatias)))
                trabalho.append((fatias[i], sala, grupo, i, campos))

    trabalho.sort(key=lambda t: t[0][0], reverse=True)

    for (a, b), sala, grupo, i, campos in trabalho:
        txt = src[a:b]
        onde = "%s.%s[%d]" % (sala, grupo, i)
        confere(txt, campos.pop("_confere", None), onde)
        novo = txt
        pulados = []
        for nome, valor in campos.items():
            if nome in CAMPOS_TXT:
                novo = poe_campo(novo, nome, valor, texto=True)
                continue
            if nome not in CAMPOS_NUM:
                raise SystemExit("campo nao permitido em %s: %s" % (onde, nome))
            if sem_efeito(novo, nome, valor):
                pulados.append("%s=%s" % (nome, fmt(valor)))
                continue
            novo = poe_campo(novo, nome, valor)
        if pulados:
            print("  %-28s (ja vale: %s)" % (onde, " ".join(pulados)))
        if novo != txt:
            # So o que foi mesmo escrito. Listar o pulado aqui faria o
            # relatorio dizer que gravou o que decidiu nao gravar.
            escritos = [k for k in campos
                        if not any(p.startswith(k + "=") for p in pulados)]
            antes = " ".join(
                "%s=%s" % (k, campo_do_objeto(txt, k)) for k in escritos)
            depois = " ".join("%s=%s" % (k, fmt(campos[k])) for k in escritos)
            print("  %-28s %s  ->  %s" % (onde, antes, depois))
            src = src[:a] + novo + src[b:]
            tocados += 1

    if tocados and not seco:
        grava(MAPAS, src)
    return tocados


def aplica_props(alt, seco):
    src = io.open(CONFIG, encoding="utf-8").read()
    tocados = 0
    for tipo, campos in alt.items():
        m = re.search(r"^(\s*%s:\s*)(\{[^}]*\})(,?)$" % re.escape(tipo),
                      src, re.M)
        if not m:
            raise SystemExit("nao achei o movel '%s' em RBF.COBERTURA.props" % tipo)
        txt = m.group(2)
        novo = txt
        for nome, valor in campos.items():
            if nome not in CAMPOS_NUM:
                raise SystemExit("campo nao permitido em props.%s: %s" % (tipo, nome))
            novo = poe_campo(novo, nome, valor)
        if novo != txt:
            print("  props.%-22s %s  ->  %s" % (tipo, txt.strip(), novo.strip()))
            src = src[:m.start(2)] + novo + src[m.end(2):]
            tocados += 1
    if tocados and not seco:
        grava(CONFIG, src)
    return tocados


def js(v, ind=0):
    """Um valor JSON no dialeto do arquivo: aspas simples, sem aspas em
    chave, acento em escape \\uXXXX como o resto de js/data."""
    if v is None:
        return "null"
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, (int, float)):
        return fmt(v)
    if isinstance(v, str):
        out = []
        for c in v:
            if c == "'":
                out.append("\\'")
            elif c == "\\":
                out.append("\\\\")
            elif ord(c) > 126:
                out.append("\\u%04x" % ord(c))
            else:
                out.append(c)
        return "'" + "".join(out) + "'"
    if isinstance(v, list):
        return "[" + ", ".join(js(x) for x in v) + "]"
    if isinstance(v, dict):
        partes = ["%s: %s" % (k, js(v[k])) for k in v]
        return "{ " + ", ".join(partes) + " }"
    raise SystemExit("nao sei escrever: %r" % (v,))


def insere(src, sala, grupo, itens):
    """Acrescenta objetos no fim da lista, um por linha."""
    pos = acha_lista(src, sala, grupo)
    if pos is None:
        raise SystemExit("nao achei %s.%s em cob_mapas.js" % (sala, grupo))
    fatias = objetos(src, pos)
    if not fatias:
        raise SystemExit("%s.%s esta vazia; acrescente o primeiro a mao"
                         % (sala, grupo))
    fim = fatias[-1][1]
    # A virgula do ultimo objeto: ele nao tem, e passa a ter.
    novo = ",\n\n" + ",\n".join("    " + js(o) for o in itens)
    return src[:fim] + novo + src[fim:]


def remove(src, sala, grupo, indices):
    """Tira objetos da lista. De tras para a frente, sempre."""
    pos = acha_lista(src, sala, grupo)
    if pos is None:
        raise SystemExit("nao achei %s.%s em cob_mapas.js" % (sala, grupo))
    fatias = objetos(src, pos)
    for i in sorted(indices, reverse=True):
        if i >= len(fatias):
            raise SystemExit("%s.%s[%d] nao existe (a lista tem %d)"
                             % (sala, grupo, i, len(fatias)))
        a, b = fatias[i]
        # Come a virgula e o espaco que separavam este objeto do proximo,
        # senao sobra ", ," no array.
        fim = b
        while fim < len(src) and src[fim] in " \t":
            fim += 1
        if fim < len(src) and src[fim] == ",":
            fim += 1
        while fim < len(src) and src[fim] in " \t":
            fim += 1
        if fim < len(src) and src[fim] == "\n":
            fim += 1
        ini = a
        while ini > 0 and src[ini - 1] in " \t":
            ini -= 1
        src = src[:ini] + src[fim:]
    return src


# Uma pasta por execucao, e uma copia por arquivo.
#
# Sem o registro, `grava()` chamada duas vezes para o mesmo arquivo - o
# que acontece quando o JSON traz `salas` e tambem `novos`/`removidos` -
# guardava a versao ja modificada por cima do original, e o backup
# deixava de servir justamente no momento em que se precisa dele.
#
# A pasta tambem passa a ser calculada uma vez: antes cada chamada
# montava um nome por time.strftime, e uma execucao que cruzasse o
# segundo espalharia metades do estado em duas pastas.
_PASTA = None
_GUARDADOS = set()


def grava(caminho, texto):
    global _PASTA
    if _PASTA is None:
        _PASTA = os.path.join(RAIZ, "_backup",
                              "pre_planta_%s" % time.strftime("%Y%m%d_%H%M%S"))
    if not os.path.isdir(_PASTA):
        os.makedirs(_PASTA)
    if caminho not in _GUARDADOS:
        shutil.copy2(caminho, os.path.join(_PASTA, os.path.basename(caminho)))
        _GUARDADOS.add(caminho)
    io.open(caminho, "w", encoding="utf-8", newline="\n").write(texto)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    seco = "--seco" in sys.argv
    origem = args[0] if args else PADRAO
    if not os.path.exists(origem):
        sys.stderr.write(
            "nao achei %s\n\n"
            "Abra tools/planta.html num servidor local, ajuste, clique em\n"
            "\"Copiar JSON\" e salve como tools/planta_alteracoes.json.\n"
            % os.path.relpath(origem, RAIZ))
        return 2

    dados = json.loads(io.open(origem, encoding="utf-8").read())
    n = 0
    props = dados.get("props") or {}
    salas = dados.get("salas") or {}

    if props:
        print("MANIFESTO (js/config.js) - vale para toda ocorrencia:")
        n += aplica_props(props, seco)
    if salas:
        print("INSTANCIAS (js/data/cob_mapas.js) - valem so onde estao:")
        n += aplica_salas(salas, seco)

    # A ordem importa e nao e negociavel: trocar campo enquanto os
    # indices ainda valem, depois remover de tras para a frente, e so
    # entao inserir - insercao no fim nao desloca ninguem.
    remocoes = dados.get("removidos") or {}
    criacoes = dados.get("novos") or {}
    if remocoes or criacoes:
        src = io.open(MAPAS, encoding="utf-8").read()
        if remocoes:
            print("REMOVER:")
            for sala, grupos in remocoes.items():
                for grupo, idx in grupos.items():
                    print("  %s.%s  %s" % (sala, grupo, sorted(idx)))
                    src = remove(src, sala, grupo, idx)
                    n += len(idx)
        if criacoes:
            print("ACRESCENTAR:")
            for sala, grupos in criacoes.items():
                for grupo, itens in grupos.items():
                    for o in itens:
                        print("  %s.%s  %s" % (sala, grupo, js(o)[:70]))
                    src = insere(src, sala, grupo, itens)
                    n += len(itens)
        if not seco:
            grava(MAPAS, src)

    if not n:
        print("nada a mudar.")
    elif seco:
        print("\n--seco: %d alteracao(oes) NAO gravadas." % n)
    else:
        print("\n%d alteracao(oes) gravadas. Backup em %s"
              % (n, os.path.relpath(_PASTA, RAIZ) if _PASTA else "_backup/"))
        print("Agora rode:  node tools/validate.js && node tools/cobertura_shots.js")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
