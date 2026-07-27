# -*- coding: utf-8 -*-
"""Medicao completa da obra, para o conselho criticar com numero na mao."""
import io, re, sys, glob, os, statistics, collections

sys.stdout.reconfigure(encoding='utf-8')
ESC = re.compile(r'\\u([0-9a-fA-F]{4})')
dec = lambda t: ESC.sub(lambda m: chr(int(m.group(1), 16)), t)
ORDEM = ['prologue'] + ['chapter%d' % i for i in range(1, 12)] + ['epilogue']

TXT = {n: dec(io.open('js/data/%s.js' % n, encoding='utf-8').read()) for n in ORDEM}
FALA = {n: re.findall(r"t:'(nar|inn|dial)'[^\n]*?tx:'((?:[^'\\]|\\.)*)'", t) for n, t in TXT.items()}
CORPO = {n: ' '.join(x[1] for x in f) for n, f in FALA.items()}
GERAL = ' '.join(CORPO.values())

def frases(s):
    return [f.strip() for f in re.split(r'(?<=[.!?])\s+', s) if f.strip()]

print('== VOLUME ==')
tot_b = tot_f = 0
for n in ORDEM:
    b = len(re.findall(r"\{ ?t:'\w+'", TXT[n]))
    f = len(FALA[n])
    tot_b += b; tot_f += f
    fr = [len(x) for x in frases(CORPO[n])]
    print('%-11s beats=%-5d fala=%-4d frases=%-4d media=%-5.1f desvio=%-5.1f max=%d' %
          (n, b, f, len(fr), statistics.mean(fr) if fr else 0,
           statistics.pstdev(fr) if len(fr) > 1 else 0, max(fr) if fr else 0))
print('TOTAL beats=%d fala=%d' % (tot_b, tot_f))

print()
print('== ANTIPADROES (antipadroes-ia.md) ==')
PAD = {
 '1 negacao-contraste': r'[Nn][ãa]o (?:é|era|foi) [^.,;]{2,40}[.,:] (?:é|era|foi|foram) ',
 '1b nao apenas/mas':   r'[Nn][ãa]o apenas [^.]{2,60}, mas ',
 '2 triade adjetival':  r'\b\w+a?[,] \w+a? e \w+a?\b',
 '3 profundidade':      r'[Aa]lguma coisa mudou|E foi a[íi] que|[Nn]ada mais seria|[Nn]o fim das contas',
 '5 gerundismo':        r'vou estar \w+ndo|vai estar \w+ndo',
 'e-que quebrado':      r'\be que\b',
 'a medida em que':     r'à medida em que',
}
for rot, pat in PAD.items():
    hits = collections.Counter()
    for n in ORDEM:
        c = len(re.findall(pat, CORPO[n]))
        if c: hits[n] = c
    print('%-22s total=%-3d  %s' % (rot, sum(hits.values()), dict(hits) or '—'))

print()
print('== R3 · COMO AS CENAS FECHAM (soco=nar, ponte=inn) ==')
for n in ORDEM:
    cenas, atual = [], None
    for l in TXT[n].split('\n'):
        m = re.match(r"\s*\{\s*t:'(\w+)'", l)
        if not m: continue
        if m.group(1) == 'scene':
            if atual: cenas.append(atual)
            atual = []
        elif atual is not None and m.group(1) in ('nar', 'inn', 'dial'):
            atual.append(m.group(1))
    if atual: cenas.append(atual)
    c = collections.Counter(x[-1] for x in cenas if x)
    print('%-11s %s' % (n, dict(c)))

print()
print('== R4 · SENSORIAL por 100 beats de fala ==')
S = {'som': r'ouv[iu]|som\b|sil[eê]ncio|barulho|estal|rang|passos|voz|grit|bat(?:i|e)d|ru[ií]do',
     'cheiro': r'cheir|fedor|odor|perfum|fuma[cç]|mofo|cera\b',
     'tato': r'toc|dedo|palma|m[aã]o na|[aá]spero|liso|pele|arranh|polegar',
     'temp': r'\bfrio\b|gelad|\bquente\b|esquent|esfri|morn|calor'}
for n in ORDEM:
    tot = sum(len(re.findall(v, CORPO[n], re.I)) for v in S.values())
    print('%-11s %5.1f' % (n, 100.0 * tot / max(1, len(FALA[n]))))

print()
print('== VOZES: falas por personagem ==')
v = collections.Counter()
for n in ORDEM:
    for ch in re.findall(r"ch:'(\w+)', tx:'", TXT[n]):
        v[ch] += 1
for k, c in v.most_common():
    print('  %-12s %d' % (k, c))

print()
print('== R6 · o PDV nao entende, por capitulo ==')
for n in ORDEM:
    c = len(re.findall(r'n[ãa]o entend|n[ãa]o soub|n[ãa]o sab|n[ãa]o consig|n[ãa]o consegu|n[ãa]o sei|n[ãa]o achou|'
                       r'n[ãa]o tinha resposta|estava errad|e estava errada', CORPO[n], re.I))
    print('%-11s %d' % (n, c))

print()
print('== DIALOGO em %% dos beats de fala ==')
for n in ORDEM:
    d = sum(1 for k, _ in FALA[n] if k == 'dial')
    print('%-11s %4.0f%%' % (n, 100.0 * d / max(1, len(FALA[n]))))
