#!/usr/bin/env python3
# =========================================================================
# ARQUIVO RABENFELS - tools/validate.py
#
#   python tools/validate.py
#
# Validador estatico. NAO substitui tools/validate.js: aquele executa o
# jogo inteiro em um DOM minimo e cobre estado, save, entrada e maquina de
# escrever. Este aqui nao executa nada. Ele le os arquivos e confere a
# camada de dados, que e onde um capitulo novo quebra as coisas:
#
#   - arquivos referenciados pelo index.html existem
#   - nenhuma dependencia externa em HTML ou CSS
#   - ids do HTML exigidos pelos scripts
#   - js/data/*.js em ASCII puro
#   - manifesto x roteiro: background, bgm, sfx, personagem, expressao, pos
#   - asset com available:true existe em disco
#   - integridade do roteiro: tipo de beat, cena duplicada, beat vazio
#   - escolhas: id estavel e unico, opcoes distintas, rotas declaradas
#   - flags lidas em 'if' sao gravadas em algum lugar
#   - galeria: toda condicao e alcancavel pelo roteiro
#
# Existe porque a maquina de trabalho deste projeto nem sempre tem Node.
# Sai com codigo 1 se houver falha.
# =========================================================================
import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

failures = []
warnings = []
checks = 0
QUIET = '--quiet' in sys.argv[1:]


def check(ok, label, detail=''):
    global checks
    checks += 1
    if not ok:
        failures.append(label + (' -> ' + detail if detail else ''))
    if not QUIET or not ok:
        print(('  PASS  ' if ok else '  FAIL  ') + label +
              ('' if ok or not detail else ' :: ' + detail))


def warn(label, detail=''):
    warnings.append(label + (' -> ' + detail if detail else ''))


def section(name):
    if not QUIET:
        print('\n== ' + name + ' ==')


def read(rel):
    with io.open(os.path.join(ROOT, rel), 'r', encoding='utf-8') as fh:
        return fh.read()


# =========================================================================
# 1. LEITOR DE LITERAL JAVASCRIPT
#
# Os arquivos de dados e o manifesto sao literais: objeto, array, string,
# numero, booleano, null, concatenacao de string e referencia a uma
# variavel declarada no mesmo arquivo. E o bastante para conferir tudo o
# que importa sem executar codigo.
# =========================================================================

TOKEN_RE = re.compile(r"""
    (?P<ws>\s+)
  | (?P<block>/\*.*?\*/)
  | (?P<line>//[^\n]*)
  | (?P<str>'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")
  | (?P<num>-?\d+\.?\d*(?:[eE][-+]?\d+)?)
  | (?P<ident>[A-Za-z_$][A-Za-z0-9_$]*)
  | (?P<punct>[{}\[\]:,+.;=()])
""", re.VERBOSE | re.DOTALL)

ESC_RE = re.compile(r'\\u([0-9a-fA-F]{4})|\\(.)')
SIMPLE_ESC = {'n': '\n', 't': '\t', 'r': '\r', "'": "'", '"': '"',
              '\\': '\\', '/': '/', 'b': '\b', 'f': '\f', '0': '\0'}


def unquote(raw):
    body = raw[1:-1]

    def sub(m):
        if m.group(1):
            return chr(int(m.group(1), 16))
        return SIMPLE_ESC.get(m.group(2), m.group(2))

    return ESC_RE.sub(sub, body)


class Ref(object):
    """Identificador (ou caminho a.b.c) resolvido depois contra as
    variaveis do arquivo. Cobre 'RBF.CONFIG.gameVersion' e afins."""

    def __init__(self, path):
        self.path = path if isinstance(path, list) else [path]

    @property
    def name(self):
        return '.'.join(self.path)


def tokenize(src):
    out = []
    pos = 0
    n = len(src)
    while pos < n:
        m = TOKEN_RE.match(src, pos)
        if not m:
            raise ValueError('token invalido em %d: %r' % (pos, src[pos:pos + 30]))
        pos = m.end()
        kind = m.lastgroup
        if kind in ('ws', 'block', 'line'):
            continue
        out.append((kind, m.group()))
    return out


class Parser(object):
    def __init__(self, tokens):
        self.t = tokens
        self.i = 0

    def peek(self):
        return self.t[self.i] if self.i < len(self.t) else (None, None)

    def next(self):
        tok = self.peek()
        self.i += 1
        return tok

    def expect(self, text):
        kind, val = self.next()
        if val != text:
            raise ValueError('esperava %r, veio %r' % (text, val))

    def value(self):
        left = self.atom()
        while self.peek()[1] == '+':
            self.next()
            right = self.atom()
            if isinstance(left, str) and isinstance(right, str):
                left = left + right
            elif isinstance(left, (int, float)) and isinstance(right, (int, float)):
                left = left + right
            else:
                left = str(left) + str(right)
        return left

    def atom(self):
        kind, val = self.next()
        if kind == 'str':
            return unquote(val)
        if kind == 'num':
            return float(val) if ('.' in val or 'e' in val or 'E' in val) else int(val)
        if val == '{':
            return self.obj()
        if val == '[':
            return self.arr()
        if kind == 'ident':
            if val == 'true':
                return True
            if val == 'false':
                return False
            if val == 'null':
                return None
            if val == 'undefined':
                return None
            path = [val]
            while self.peek()[1] == '.':
                self.next()
                kind2, part = self.next()
                if kind2 != 'ident':
                    raise ValueError('membro invalido apos ponto: %r' % part)
                path.append(part)
            return Ref(path)
        raise ValueError('valor inesperado: %r' % val)

    def obj(self):
        out = {}
        while True:
            kind, val = self.peek()
            if val == '}':
                self.next()
                return out
            if val == ',':
                self.next()
                continue
            kind, key = self.next()
            if kind == 'str':
                key = unquote(key)
            self.expect(':')
            out[key] = self.value()

    def arr(self):
        out = []
        while True:
            kind, val = self.peek()
            if val == ']':
                self.next()
                return out
            if val == ',':
                self.next()
                continue
            out.append(self.value())


def resolve(node, table, seen=None):
    """Troca cada Ref pelo valor da variavel correspondente."""
    if isinstance(node, Ref):
        path = node.path[1:] if node.path[0] == 'RBF' else node.path
        if not path or path[0] not in table:
            return node
        found = table[path[0]]
        for part in path[1:]:
            if not isinstance(found, dict) or part not in found:
                return node
            found = found[part]
        return resolve(found, table)
    if isinstance(node, list):
        return [resolve(x, table) for x in node]
    if isinstance(node, dict):
        return dict((k, resolve(v, table)) for k, v in node.items())
    return node


ASSIGN_RE = re.compile(
    r'(?m)^\s*(?:var\s+([A-Za-z_$][A-Za-z0-9_$]*)|RBF\.([A-Za-z_$][A-Za-z0-9_$]*))\s*=\s*(?=[\[{])')

PAIR = {'{': '}', '[': ']'}


def slice_literal(src, start):
    """Recorta o literal balanceado que comeca em src[start], ignorando
    chave e colchete dentro de string ou comentario. Segue por operador +
    para apanhar concatenacao de literais."""
    i = start
    n = len(src)
    depth = 0
    while i < n:
        c = src[i]
        if c in ('"', "'"):
            quote = c
            i += 1
            while i < n:
                if src[i] == '\\':
                    i += 2
                    continue
                if src[i] == quote:
                    break
                i += 1
            i += 1
            continue
        if c == '/' and i + 1 < n and src[i + 1] == '*':
            end = src.find('*/', i + 2)
            i = (n if end < 0 else end + 2)
            continue
        if c == '/' and i + 1 < n and src[i + 1] == '/':
            end = src.find('\n', i)
            i = (n if end < 0 else end + 1)
            continue
        if c in PAIR:
            depth += 1
        elif c in ('}', ']'):
            depth -= 1
            if depth == 0:
                return src[start:i + 1]
        i += 1
    return None


def load_literals(rel):
    """Devolve { nome: valor } para cada 'var X = ...' e 'RBF.X = ...'."""
    src = read(rel)
    out = {}
    for m in ASSIGN_RE.finditer(src):
        name = m.group(1) or m.group(2)
        body = slice_literal(src, m.end())
        if body is None:
            continue
        try:
            out[name] = Parser(tokenize(body)).value()
        except ValueError as err:
            warn('literal ilegivel em %s: RBF.%s' % (rel, name), str(err))
            continue
    return dict((k, resolve(v, out)) for k, v in out.items())


# =========================================================================
# 2. ESTATICO
# =========================================================================

HTML = read('index.html')

REQUIRED_IDS = [
    'vn', 'bg', 'sprites', 'archive-box', 'archive-label', 'archive-lines',
    'last-box', 'last-label', 'last-lines', 'choices', 'title-screen',
    'title-main', 'title-quote', 'title-time', 'chapter-screen', 'chap-num',
    'chap-name', 'endchap-screen', 'endchap-1', 'endchap-2', 'fader',
    'textbox', 'namebox', 'line-code', 'textcontent', 'rf-diamond',
    'rf-dlg-bar', 'hint', 'rf-routes', 'rf-route-note', 'game-bar',
    'btn-menu', 'rf-show-ui', 'rf-transition', 'main-menu', 'rf-menu-bg',
    'rf-access', 'rf-dossier', 'rf-volume', 'rf-eyebrow', 'rf-latin',
    'rf-title', 'rf-subtitle', 'rf-nav', 'rf-note', 'rf-version',
    'rf-gate', 'rf-gate-btn', 'rf-gate-label', 'rf-gate-hint', 'ui-root'
]

REQUIRED_SYMBOLS = [
    'rf-sigil', 'rf-seal', 'rf-mark', 'rf-ic-history', 'rf-ic-auto',
    'rf-ic-skip', 'rf-ic-save', 'rf-ic-load', 'rf-ic-settings',
    'rf-ic-hide', 'rf-ic-quill', 'rf-icon-hope', 'rf-icon-loss',
    'rf-icon-answer'
]


def static_checks():
    section('ESTATICO')

    refs = re.findall(r'(?:src|href)="([^"#][^"]*)"', HTML)
    for rel in refs:
        check(os.path.isfile(os.path.join(ROOT, rel)),
              'arquivo referenciado existe: ' + rel)

    for css in ('css/tokens.css', 'css/style.css', 'css/ui.css'):
        body = read(css)
        check('http://' not in body and 'https://' not in body,
              'sem dependencia externa: ' + css)
    check('http://' not in HTML and 'https://' not in HTML.replace(
        'http://www.w3.org/2000/svg', ''),
        'sem dependencia externa: index.html')

    for ident in REQUIRED_IDS:
        check('id="%s"' % ident in HTML, 'id presente no HTML: ' + ident)

    for sym in REQUIRED_SYMBOLS:
        check('id="%s"' % sym in HTML, 'simbolo SVG presente: ' + sym)

    for name in sorted(os.listdir(os.path.join(ROOT, 'js', 'data'))):
        if not name.endswith('.js'):
            continue
        rel = 'js/data/' + name
        body = read(rel)
        bad = [(i + 1, ln) for i, ln in enumerate(body.split('\n'))
               if any(ord(c) > 127 for c in ln)]
        check(not bad, 'roteiro em ASCII puro: ' + rel,
              '' if not bad else 'linha %d' % bad[0][0])


# =========================================================================
# 3. MANIFESTO
# =========================================================================

CONFIG = load_literals('js/config.js')


def manifest_checks():
    section('MANIFESTO')

    for key in ('CONFIG', 'CHARACTERS', 'BACKGROUNDS', 'BGM', 'MUSIC',
                'UI_SFX', 'SFX', 'CHAPTERS', 'STORAGE', 'SETTINGS_DEFAULT',
                'UI_TEXT', 'ARCHIVE', 'INTRO', 'MENU_AUDIO', 'MENU_RECORDS',
                'WARNING', 'ROUTES', 'CREDITS', 'DIALOGUE_CONTROLS'):
        check(key in CONFIG, 'manifesto declara RBF.' + key)

    paths = CONFIG['CONFIG']['paths']

    for cid, cdef in sorted(CONFIG['CHARACTERS'].items()):
        check(bool(cdef.get('name')), 'personagem tem nome: ' + cid)
        check(cdef.get('fallbackExpression') in (cdef.get('sprites') or {}),
              'fallbackExpression existe: ' + cid,
              str(cdef.get('fallbackExpression')))
        check(cdef.get('size') in ('bust', 'full'),
              'size valido: ' + cid, str(cdef.get('size')))
        check(cdef.get('onMissing') in ('placeholder', 'hide'),
              'onMissing valido: ' + cid, str(cdef.get('onMissing')))
        if not cdef.get('available'):
            continue
        for ex, fname in sorted((cdef.get('sprites') or {}).items()):
            rel = paths['characters'] + cdef['dir'] + '/' + fname
            check(os.path.isfile(os.path.join(ROOT, rel)),
                  'sprite available:true existe: %s.%s' % (cid, ex), rel)

    for bid, bdef in sorted(CONFIG['BACKGROUNDS'].items()):
        check(bool(bdef.get('css')), 'background tem gradiente: ' + bid)
        if bdef.get('available') and bdef.get('file'):
            rel = paths['backgrounds'] + bdef['file']
            check(os.path.isfile(os.path.join(ROOT, rel)),
                  'background available:true existe: ' + bid, rel)
        elif bdef.get('available'):
            check(False, 'background available:true sem file: ' + bid)

    audio_groups = [('BGM', paths['bgm']), ('SFX', paths['sfx']),
                    ('MUSIC', paths['music']), ('UI_SFX', paths['uiSfx'])]
    for group, folder in audio_groups:
        for aid, adef in sorted(CONFIG[group].items()):
            files = adef.get('files') or []
            check(bool(files), 'audio tem lista de arquivos: %s.%s' % (group, aid))
            if not adef.get('available'):
                continue
            found = [f for f in files
                     if os.path.isfile(os.path.join(ROOT, folder + f))]
            check(bool(found),
                  'audio available:true existe: %s.%s' % (group, aid),
                  ', '.join(files))
            missing = [f for f in files if f not in found]
            if missing:
                warn('%s.%s lista arquivo ausente' % (group, aid),
                     ', '.join(missing))

    ids = [c['id'] for c in CONFIG['CHAPTERS']]
    check(len(ids) == len(set(ids)), 'ids de capitulo unicos', ', '.join(ids))
    for ch in CONFIG['CHAPTERS']:
        for field in ('id', 'code', 'data', 'label', 'title'):
            check(bool(ch.get(field)),
                  'capitulo %s tem %s' % (ch.get('id'), field))
        check('<script src="js/data/' in HTML,
              'index.html carrega os dados de roteiro')

    route_ids = [r['id'] for r in CONFIG['ROUTES']]
    check(len(route_ids) == len(set(route_ids)), 'ids de rota unicos')
    for r in CONFIG['ROUTES']:
        check(isinstance(r.get('max'), int) and r['max'] > 0,
              'rota tem max valido: ' + r['id'])


# =========================================================================
# 4. ROTEIRO
# =========================================================================

def marcas_do_percurso():
    """Nomes de marca declarados em js/data/cob_mapas.js.

    Le por expressao regular de proposito: este validador nao executa
    JavaScript, e o arquivo e so dados. Se ele deixar de ser so dados, a
    leitura falha em silencio e as flags voltam a aparecer como orfas -
    que e um jeito barulhento o bastante de avisar.
    """
    caminho = os.path.join(ROOT, 'js', 'data', 'cob_mapas.js')
    if not os.path.isfile(caminho):
        return set()
    texto = io.open(caminho, encoding='utf-8').read()
    return set(re.findall(r"marca:\s*'([A-Za-z0-9_]+)'", texto))


BEAT_TYPES = set([
    'scene', 'fade_in', 'fade_out', 'pause', 'bg', 'bgm', 'sfx', 'spr',
    'spr_hide', 'spr_clear', 'nar', 'inn', 'dial', 'arc', 'last', 'title',
    'chap', 'end_chap', 'flag', 'cho', 'ending', 'percurso'
])
TEXT_BEATS = set(['nar', 'inn', 'dial'])
POSITIONS = set(['left', 'center', 'right'])

SCRIPTS = {}
for _ch in CONFIG['CHAPTERS']:
    _file = {'PROLOGUE': 'prologue', 'CHAPTER1': 'chapter1',
             'CHAPTER2': 'chapter2'}.get(_ch['data'])
    if _file is None:
        _file = _ch['data'].lower()
    SCRIPTS[_ch['id']] = ('js/data/%s.js' % _file, _ch['data'])


def walk(beats):
    for beat in beats:
        if not isinstance(beat, dict):
            continue
        yield beat
        if beat.get('t') == 'cho':
            for opt in beat.get('opts') or []:
                for sub in walk(opt.get('then') or []):
                    yield sub


def script_checks():
    section('ROTEIRO')

    all_beats = []
    scene_ids = {}
    choice_ids = {}
    arc_keys = set()
    flags_written = set()
    # Semeadas pelo motor, nao por escolha:
    #   rota    -> resolucao do beat { t:'route' }
    #   ending  -> beat { t:'ending' }
    #   relendo -> startNewGame, quando a obra ja foi terminada
    flags_written.update(('rota', 'relendo'))
    flags_read = {}
    chapters_seen = set()

    for cid, (rel, prop) in sorted(SCRIPTS.items()):
        check(os.path.isfile(os.path.join(ROOT, rel)),
              'arquivo de roteiro existe: ' + rel)
        check('<script src="%s"></script>' % rel in HTML,
              'index.html carrega ' + rel)
        data = load_literals(rel)
        check(prop in data, 'arquivo define RBF.' + prop)
        beats = data.get(prop) or []
        check(len(beats) > 0, 'roteiro nao vazio: ' + cid)
        for beat in walk(beats):
            all_beats.append((cid, beat))

    for cid, beat in all_beats:
        t = beat.get('t')
        check(t in BEAT_TYPES, 'tipo de beat conhecido em %s' % cid, str(t))

        if t in TEXT_BEATS:
            # Beat que declara contagem automatica nasce sem `tx`: o
            # numero vem do proprio roteiro, em js/script.js, na hora da
            # montagem. Aqui confere-se a declaracao; o texto resolvido
            # e conferido por tools/validate.js, que monta o jogo.
            spec = beat.get('frases')
            if spec:
                check(isinstance(spec, dict) and bool(spec.get('de'))
                      and bool(spec.get('ch')),
                      'contagem automatica declara origem em ' + cid,
                      str(spec))
            else:
                check(bool((beat.get('tx') or '').strip()),
                      'beat de texto nao vazio em ' + cid, t)
        if t == 'dial':
            check(beat.get('ch') in CONFIG['CHARACTERS'],
                  'falante existe no manifesto', str(beat.get('ch')))
        if t in ('arc', 'last'):
            lns = beat.get('lns') or []
            check(len(lns) > 0, 'cartao do Arquivo tem linhas em ' + cid)
            check(bool(beat.get('key')),
                  'cartao do Arquivo tem key para a galeria em ' + cid,
                  (lns[0][:40] if lns else ''))
            if beat.get('key'):
                arc_keys.add(beat['key'])

        if t == 'scene':
            sid = beat.get('id')
            check(bool(sid), 'cena tem id em ' + cid)
            check(sid not in scene_ids, 'id de cena unico', str(sid))
            scene_ids[sid] = cid
            check(beat.get('chapter') in SCRIPTS,
                  'cena declara capitulo registrado', str(beat.get('chapter')))
            check(bool(beat.get('title')),
                  'cena tem title para a previa do save', str(sid))
            if beat.get('chapter'):
                chapters_seen.add(beat['chapter'])

        if t in ('chap', 'end_chap'):
            check(beat.get('chapter') in SCRIPTS,
                  'cartao %s declara capitulo' % t, str(beat.get('chapter')))

        for field in ('bg',):
            if t == 'scene' and beat.get(field):
                check(beat[field] in CONFIG['BACKGROUNDS'],
                      'background existe no manifesto', beat[field])
        if t == 'bg':
            check(beat.get('id') in CONFIG['BACKGROUNDS'],
                  'background existe no manifesto', str(beat.get('id')))
        if t == 'bgm' or (t == 'scene' and beat.get('bgm')):
            bid = beat.get('id') if t == 'bgm' else beat.get('bgm')
            if bid is not None:
                check(bid in CONFIG['BGM'],
                      'bgm existe no manifesto', str(bid))
        if t == 'sfx' or (t == 'scene' and beat.get('sfx')):
            sid = beat.get('id') if t == 'sfx' else beat.get('sfx')
            check(sid in CONFIG['SFX'], 'sfx existe no manifesto', str(sid))

        if t in ('spr', 'spr_hide'):
            cdef = CONFIG['CHARACTERS'].get(beat.get('ch'))
            check(cdef is not None,
                  'personagem existe no manifesto', str(beat.get('ch')))
            if cdef and t == 'spr':
                check(beat.get('ex') in (cdef.get('sprites') or {}),
                      'expressao existe: %s.%s' % (beat.get('ch'), beat.get('ex')))
                check(beat.get('pos') in POSITIONS,
                      'posicao valida', str(beat.get('pos')))

        if t == 'flag':
            for k in (beat.get('set') or {}):
                flags_written.add(k)

        # O beat { t:'ending' } grava flags.ending a partir de RBF.ENDINGS.
        # Nao passa por 'flag' nem por escolha, entao precisa constar aqui
        # ou todo 'if:{ ending:... }' apareceria como flag orfa.
        if t == 'ending':
            flags_written.add('ending')

        # O beat { t:'percurso' } grava o que promete em `sets`, a saida
        # em `campo`, a contagem em `conta` e uma flag por marca
        # declarada nos mapas do percurso. As marcas valem true OU false
        # - nunca undefined - e por isso um beat pode se condicionar as
        # duas faces.
        if t == 'percurso':
            for k in (beat.get('sets') or {}):
                flags_written.add(k)
            if beat.get('campo'):
                flags_written.add(beat['campo'])
            flags_written.add(beat.get('conta') or 'percurso_marcas')
            for k in marcas_do_percurso():
                flags_written.add(k)

        if beat.get('if'):
            for k in beat['if']:
                flags_read.setdefault(k, cid)

        if t == 'cho':
            check(bool(beat.get('id')),
                  'escolha tem id estavel em ' + cid,
                  str(beat.get('prompt')))
            check(beat.get('id') not in choice_ids,
                  'id de escolha unico', str(beat.get('id')))
            choice_ids[beat.get('id')] = cid
            check(bool(beat.get('prompt')), 'escolha tem prompt em ' + cid)

            opts = beat.get('opts') or []
            check(len(opts) >= 2,
                  'escolha tem ao menos duas opcoes', str(beat.get('id')))
            oids = [o.get('id') for o in opts]
            check(len(oids) == len(set(oids)),
                  'ids de opcao unicos em ' + str(beat.get('id')))
            texts = [o.get('tx') for o in opts]
            check(len(texts) == len(set(texts)),
                  'textos de opcao distintos em ' + str(beat.get('id')))

            thens = []
            for opt in opts:
                check(bool(opt.get('id')),
                      'opcao tem id em ' + str(beat.get('id')))
                check(bool((opt.get('tx') or '').strip()),
                      'opcao tem texto em ' + str(beat.get('id')))
                for k in (opt.get('flags') or {}):
                    flags_written.add(k)
                for rid, delta in (opt.get('routes') or {}).items():
                    check(rid in [r['id'] for r in CONFIG['ROUTES']],
                          'rota declarada existe', str(rid))
                    check(isinstance(delta, (int, float)) and delta != 0,
                          'delta de rota e numero nao nulo',
                          '%s=%s' % (rid, delta))
                thens.append(len(opt.get('then') or []))
            check(all(n > 0 for n in thens),
                  'toda opcao tem consequencia propria em ' + str(beat.get('id')))

    for flag, cid in sorted(flags_read.items()):
        check(flag in flags_written,
              'flag lida em if e gravada em algum lugar',
              '%s (lida em %s)' % (flag, cid))

    for cid in sorted(SCRIPTS):
        check(cid in chapters_seen,
              'capitulo registrado aparece em alguma cena: ' + cid)

    return arc_keys, scene_ids


# =========================================================================
# 5. GALERIA
# =========================================================================

def gallery_checks(arc_keys):
    section('GALERIA')

    src = read('js/gallery.js')
    m = re.search(r'var CATALOG\s*=\s*(?=\[)', src)
    check(m is not None, 'gallery.js declara CATALOG')
    if not m:
        return
    catalog = Parser(tokenize(slice_literal(src, m.end()))).value()

    ids = [it['id'] for it in catalog]
    check(len(ids) == len(set(ids)), 'ids de galeria unicos')

    m2 = re.search(r'var CATEGORIES\s*=\s*(?=\[)', src)
    cats = ([c['id'] for c in
             Parser(tokenize(slice_literal(src, m2.end()))).value()]
            if m2 else [])

    chapter_ids = [c['id'] for c in CONFIG['CHAPTERS']]
    route_ids = [r['id'] for r in CONFIG['ROUTES']]

    for item in catalog:
        check(item.get('cat') in cats,
              'item de galeria em categoria conhecida: ' + item['id'],
              str(item.get('cat')))
        need = item.get('need') or ''
        check(bool(need), 'item de galeria tem condicao: ' + item['id'])
        parts = need.split(':')
        kind = parts[0]
        if kind == 'bg':
            check(parts[1] in CONFIG['BACKGROUNDS'],
                  'condicao bg existe no manifesto: ' + item['id'], need)
        elif kind == 'arc':
            check(parts[1] in arc_keys,
                  'condicao arc e alcancavel pelo roteiro: ' + item['id'], need)
        elif kind in ('chapter', 'done'):
            check(parts[1] in chapter_ids,
                  'condicao de capitulo existe: ' + item['id'], need)
        elif kind == 'route':
            check(parts[1] in route_ids,
                  'condicao de rota existe: ' + item['id'], need)
            check(len(parts) == 3 and parts[2].isdigit(),
                  'condicao de rota tem alvo numerico: ' + item['id'], need)
        else:
            check(False, 'tipo de condicao conhecido: ' + item['id'], need)

    used_bg = set(p['need'].split(':')[1] for p in catalog
                  if p['need'].startswith('bg:'))
    gallery_needs = set()
    for item in catalog:
        gallery_needs.add(item.get('need') or '')
        for entry in item.get('entries') or []:
            gallery_needs.add(entry.get('need') or '')
    for key in sorted(arc_keys):
        check('arc:' + key in gallery_needs,
              'cartao do Arquivo tem item de galeria', 'arc:' + key)
    for bg in sorted(CONFIG['BACKGROUNDS']):
        # Superficies tecnicas, nao cenarios narrativos da galeria.
        if bg in ('bg_black', 'bg_menu_archive'):
            continue
        if bg not in used_bg:
            warn('background sem item de galeria', bg)


# =========================================================================

# =========================================================================
# 6. ANTIPADROES DE TEXTO GERADO
#
# Tiques que denunciam texto de maquina. A lista completa e o raciocinio
# estao em .claude/skills/rabenfels-vn/reference/antipadroes-ia.md
#
# O campeao e a negacao-contraste ("Nao e X, e Y"). Uma ocorrencia num
# capitulo passa; tres na mesma cena viram assinatura. Por isso o criterio
# aqui e por densidade, nao por ocorrencia isolada.
# =========================================================================

NEGACAO_RE = re.compile(
    r'N[aã]o (?:é|era|foi|são|eram) [^.!?]{2,60}?[.,;] (?:É|Era|Foi|São|Eram) '
    r'|N[aã]o (?:apenas|só|somente) [^.!?]{2,60}?, mas '
    r'|[Mm]enos [^.!?]{2,40}? e mais ',
    re.UNICODE)

TRIADE_RE = re.compile(
    r'(?:^|[.:;] )(\w+), (\w+) e (\w+)[.,]', re.UNICODE)

PROFUNDIDADE = [
    'alguma coisa mudou', 'e foi aí que', 'nada mais seria',
    'no fim das contas', 'mas aqui está', 'tudo mudou',
]

HEDGING = [
    'se pegou pensando', 'se pegou olhando', 'alguma coisa nel',
    'havia algo de', 'por algum motivo',
]

SENSORIAL = [
    'o ar estava pesado', 'o silêncio era denso',
    'cheiro de poeira', 'um arrepio',
]


def texto_dos_beats(beats):
    """Narracao, pensamento, fala e texto de escolha.

    Cartao do Arquivo ('arc') e ultima entrada ('last') ficam de fora de
    proposito: sao a voz da Antoniette dentro da ficcao e trazem linhas
    canonicas do documento mestre, escritas pelo autor. A definicao de
    Khar'Vel por negacao ("nao e um deus... nao e um demonio") e dele e
    fica. O detector existe para policiar o que o assistente escreve."""
    out = []
    for beat in walk(beats):
        t = beat.get('t')
        if t in ('nar', 'inn', 'dial'):
            out.append(beat.get('tx') or '')
        elif t == 'cho':
            for opt in beat.get('opts') or []:
                out.append(opt.get('tx') or '')
    return out


def antipadrao_checks():
    section('ANTIPADROES DE TEXTO GERADO')

    for cid, (rel, prop) in sorted(SCRIPTS.items()):
        data = load_literals(rel)
        linhas = texto_dos_beats(data.get(prop) or [])
        corpo = '\n'.join(linhas)

        negacoes = NEGACAO_RE.findall(corpo)
        n = len(negacoes)
        check(n <= 1, 'negacao-contraste sob controle em ' + cid,
              '%d ocorrencias; o teto e 1 por capitulo' % n)

        triades = TRIADE_RE.findall(corpo)
        if len(triades) > 2:
            warn('triade automatica em ' + cid,
                 '%d listas de tres; conferir se o terceiro item conta'
                 % len(triades))

        baixo = corpo.lower()
        for frase in PROFUNDIDADE:
            check(frase not in baixo,
                  'sem profundidade nao merecida em ' + cid, frase)
        for frase in HEDGING:
            check(frase not in baixo,
                  'sem hedging de interioridade em ' + cid, frase)
        for frase in SENSORIAL:
            check(frase not in baixo,
                  'sem sensorial de catalogo em ' + cid, frase)

        travessoes = corpo.count('—')
        cenas = sum(1 for b in walk(data.get(prop) or [])
                    if b.get('t') == 'scene')
        teto = max(3, cenas * 2)
        if travessoes > teto:
            warn('travessao em excesso em ' + cid,
                 '%d travessoes para %d cenas' % (travessoes, cenas))


def main():
    static_checks()
    manifest_checks()
    arc_keys, _scenes = script_checks()
    gallery_checks(arc_keys)
    antipadrao_checks()

    print('\n' + '-' * 62)
    print('%d checagens, %d falha(s), %d aviso(s)' %
          (checks, len(failures), len(warnings)))
    for w in warnings:
        print('  AVISO  ' + w)
    for f in failures:
        print('  FALHA  ' + f)
    print('-' * 62)
    return 1 if failures else 0


if __name__ == '__main__':
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    sys.exit(main())
