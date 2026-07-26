# -*- coding: utf-8 -*-
"""
Gera docs/roteiro_completo.md - a obra inteira em texto legivel - e roda a
auditoria contra as regras VERIFICAVEIS de .claude/skills/rabenfels-vn/.
"""
import io, os, re, sys, glob

sys.stdout.reconfigure(encoding='utf-8')
ESC = re.compile(r'\\u([0-9a-fA-F]{4})')
dec = lambda t: ESC.sub(lambda m: chr(int(m.group(1), 16)), t)

ORDEM = ['prologue'] + ['chapter%d' % i for i in range(1, 12)] + ['epilogue']
NOMES = {'prologue': 'PRÓLOGO', 'epilogue': 'EPÍLOGO'}

BEAT = re.compile(r"^\s*\{\s*t:'(\w+)'(.*)$")
GET  = lambda k, s: (re.search(k + r":\s*'([^']*)'", s) or [None, None])[1]


def carrega(nome):
    return dec(io.open('js/data/%s.js' % nome, encoding='utf-8').read())


# ---------------------------------------------------------------- roteiro
out = ['# Roteiro completo — Arquivo Rabenfels', '',
       '*Gerado de `js/data/*.js`. Não editar à mão: editar os dados.*', '']

stats = {}
for nome in ORDEM:
    txt = carrega(nome)
    titulo = NOMES.get(nome, 'CAPÍTULO ' + nome.replace('chapter', ''))
    quando = (re.search(r'QUANDO:\s*(.+)', txt) or [None, '—'])[1]
    pens   = (re.search(r'O PENSAMENTO UNICO[^\n]*\n\s*"([^"]+)"', txt) or [None, '—'])[1]
    out += ['', '---', '', '## %s' % titulo, '',
            '- **Quando:** %s' % quando.strip(),
            '- **Pensamento único:** %s' % pens.strip(), '']

    cena = None
    n_cena = n_esc = 0
    for linha in txt.split('\n'):
        m = BEAT.match(linha)
        if not m:
            continue
        t, resto = m.group(1), m.group(2)
        cond = re.search(r"if:\{([^}]*)\}", resto)
        marca = '  `[%s]`' % cond.group(1).strip() if cond else ''

        if t == 'scene':
            cena = GET('title', resto) or GET('id', resto)
            n_cena += 1
            out += ['', '### %s' % cena,
                    '*cenário: `%s`*' % (GET('bg', resto) or '—'), '']
        elif t == 'nar':
            out.append('%s%s' % (GET('tx', resto), marca))
        elif t == 'inn':
            out.append('*%s*%s' % (GET('tx', resto), marca))
        elif t == 'dial':
            out.append('**%s** — %s%s' % ((GET('ch', resto) or '?').upper(),
                                          GET('tx', resto), marca))
        elif t in ('arc', 'last'):
            lns = re.findall(r"'((?:[^'\\]|\\.)*)'", resto.split('lns:')[-1])
            out += ['', '> **%s**' % (GET('label', resto) or 'documento'), '>']
            out += ['> ' + l for l in lns if l.strip()]
            out += ['']
        elif t == 'cho':
            n_esc += 1
            out += ['', '#### ESCOLHA — %s' % (GET('prompt', resto) or '?'), '']
        elif t == 'ending':
            out += ['', '> **[ o final é decidido aqui ]**', '']
        elif t == 'end_chap':
            out += ['', '— *%s / %s*' % (GET('line1', resto) or '',
                                         GET('line2', resto) or ''), '']

    # as opcoes de escolha, extraidas a parte
    for blk in re.finditer(r"prompt:'([^']*)'.*?opts:\s*\[(.*?)\n\]\}", txt, re.S):
        opts = re.findall(r"id:'(\w+)',\s*\n?\s*tx:'([^']*)'", blk.group(2))
        if opts:
            out += ['', '**Opções de "%s"** (ordem de exibição):' % blk.group(1), '']
            out += ['%d. `%s` — %s' % (i + 1, o[0], o[1]) for i, o in enumerate(opts)]
    stats[nome] = (n_cena, n_esc)

io.open('docs/roteiro_completo.md', 'w', encoding='utf-8', newline='\n').write('\n'.join(out))
print('docs/roteiro_completo.md  %d linhas' % len(out))
print()

# ---------------------------------------------------------------- auditoria
TUDO = {n: carrega(n) for n in ORDEM}
CORPO = {}
for n, t in TUDO.items():
    CORPO[n] = ' '.join(re.findall(r"tx:'((?:[^'\\]|\\.)*)'", t) +
                        [x for x in re.findall(r"^\s*'((?:[^'\\]|\\.)*)',?\s*$", t, re.M)])
GERAL = ' '.join(CORPO.values())

achados = []
def chk(ok, regra, detalhe=''):
    achados.append((ok, regra, detalhe))

# canon.md
chk('nobreza' not in GERAL.lower(),
    'canon: a palavra "nobreza" nao aparece na obra',
    'ocorrencias: %d' % GERAL.lower().count('nobreza'))

fala_aldric = re.findall(r"ch:'aldric', tx:'([^']*)'", ' '.join(TUDO.values()))
chk(not any('klara' in f.lower() for f in fala_aldric),
    'canon: Aldric nunca diz o nome de Klara em voz alta',
    [f for f in fala_aldric if 'klara' in f.lower()])

excl = {}
for n, t in TUDO.items():
    for ch, tx in re.findall(r"ch:'(\w+)', tx:'([^']*)'", t):
        if '!' in tx:
            excl.setdefault(ch, 0)
            excl[ch] += 1
chk(set(excl) <= {'liara'},
    'estilo: ponto de exclamacao so na fala de Liara', excl)

proib = [p for p in ('mãe', 'filha', 'amor') if
         re.search(r"ch:'(klara|antoniette)', tx:'[^']*\b%s\b" % p, ' '.join(TUDO.values()), re.I)]
chk(not proib, 'canon: mae, filha e amor nunca entre Antoniette e Klara', proib)

chk('Quatro ainda virão' in TUDO['chapter1'],
    'canon: linha fixa do fim do Cap. 1')
chk('Faltam dois' in TUDO['chapter3'],
    'canon: linha fixa do fim do Cap. 3')

bal = [n for n in ORDEM if "key:'balada'" in TUDO[n]]
chk(bal == ['chapter1', 'chapter7', 'epilogue'],
    'canon: a balada em exatamente tres momentos', bal)

# estilo.md - a frase longa
longas = {}
for n in ORDEM:
    fr = [f for tx in re.findall(r"tx:'((?:[^'\\]|\\.)*)'", TUDO[n])
          for f in re.split(r'(?<=[.!?])\s+', tx)]
    m = max((len(f) for f in fr), default=0)
    if m > 250:
        longas[n] = m
chk(set(longas) == {'prologue', 'chapter1', 'chapter11'},
    'estilo: a frase longa existe so no Prologo, Cap. 1 e Cap. 11', longas)
chk(longas.get('chapter11', 0) == max(longas.values()) if longas else False,
    'estilo: a do Cap. 11 e a maior das tres', longas)

# posicao da opcao de hope
pos = {}
for n in ORDEM:
    for blk in re.finditer(r"id:'(\w+)',\s*(?:code:'[^']*',\s*)?prompt:'([^']*)'.*?opts:\s*\[(.*?)\n\]\}",
                           TUDO[n], re.S):
        ids = re.findall(r"\{\s*id:'(\w+)'", blk.group(3))
        if 'C' in ids:
            pos.setdefault(ids.index('C') + 1, []).append(blk.group(1))
chk(len(pos) >= 2, 'canon: a posicao da opcao C varia entre capitulos',
    {k: len(v) for k, v in pos.items()})

# cronologia declarada x canon.md
canon = io.open('.claude/skills/rabenfels-vn/reference/canon.md', encoding='utf-8').read()
chk('+93 dias' not in canon, 'canon.md: Epilogo ja atualizado para +6 anos',
    'canon.md ainda diz "+93 dias"')
chk('treze no 11' not in canon, 'canon.md: idade das gemeas atualizada',
    'canon.md ainda diz "treze no 11"; o codigo diz doze')
chk('*(renomear)*' not in canon, 'canon.md: Cap. 11 ja nomeado',
    'canon.md ainda diz "(renomear)"; o codigo diz "Noventa Dias"')
chk('Antoniette morre, Klara é consumida' not in canon,
    'canon.md: "nenhuma rota altera o destino" atualizado',
    'o codigo agora tem duas rotas em que ela VIVE')

print('=' * 72)
print('AUDITORIA — roteiro x .claude/skills/rabenfels-vn/reference/')
print('=' * 72)
for ok, regra, det in achados:
    print('  %s  %s' % ('OK  ' if ok else 'FALHA', regra))
    if not ok and det:
        print('        -> %s' % det)
print()
print('  %d de %d conferem' % (sum(1 for a in achados if a[0]), len(achados)))
