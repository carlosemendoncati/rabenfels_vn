#!/usr/bin/env node
/* ==========================================================================
   ARQUIVO RABENFELS - tools/validate.js
   Uso: node tools/validate.js

   Roda o projeto real em jsdom e percorre o roteiro inteiro uma vez por
   ramo de escolha. Verifica manifesto, integridade do roteiro, ausencia
   de erro de runtime, terminacao e divergencia de estado entre ramos.
   Sai com codigo 1 se houver falha.
   ========================================================================== */
'use strict';

const fs   = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');

let failures = [];
let checks   = 0;

function check(ok, label, detail) {
  checks += 1;
  if (!ok) { failures.push(label + (detail ? ' -> ' + detail : '')); }
  console.log((ok ? '  PASS  ' : '  FAIL  ') + label +
              (ok || !detail ? '' : ' :: ' + detail));
}

/* ---------- 1. checagens estaticas -------------------------------------- */
function staticChecks() {
  console.log('\n== ESTATICO ==');

  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]);
  const links   = [...html.matchAll(/<link[^>]+href="([^"]+)"/g)].map(m => m[1]);

  for (const rel of scripts.concat(links)) {
    check(fs.existsSync(path.join(ROOT, rel)), 'arquivo referenciado existe: ' + rel);
  }

  const engine = fs.readFileSync(path.join(ROOT, 'js/engine.js'), 'utf8');
  const ids = new Set([...engine.matchAll(/getElementById\('([^']+)'\)/g)].map(m => m[1]));
  for (const id of ids) {
    check(html.includes('id="' + id + '"'), 'id presente no HTML: ' + id);
  }

  for (const f of ['js/config.js', 'js/assets.js', 'js/audio.js', 'js/engine.js',
                   'js/main.js', 'js/data/prologue.js', 'js/data/chapter1.js']) {
    const buf = fs.readFileSync(path.join(ROOT, f));
    const bad = buf.findIndex(b => b > 127);
    check(bad === -1, 'ASCII puro: ' + f, bad === -1 ? '' : 'byte offset ' + bad);
  }
}

/* ---------- 2. manifesto x roteiro -------------------------------------- */
function manifestChecks(win) {
  console.log('\n== MANIFESTO x ROTEIRO ==');
  const RBF = win.RBF;
  const script = (RBF.PROLOGUE || []).concat(RBF.CHAPTER1 || []);

  const KNOWN = new Set(['scene','bg','bgm','sfx','spr','spr_hide','spr_clear','flag',
                         'pause','fade_in','fade_out','nar','inn','dial','arc','last',
                         'title','chap','end_chap','cho']);

  const seenScenes = new Set();
  const usedBg = new Set(), usedBgm = new Set(), usedSfx = new Set();
  const usedChar = new Map();
  let dupScene = null, badBeat = null, emptyText = null;

  function walk(beats) {
    for (const b of beats) {
      if (!KNOWN.has(b.t)) { badBeat = b.t; }
      if (b.t === 'scene') {
        if (seenScenes.has(b.id)) { dupScene = b.id; }
        seenScenes.add(b.id);
      }
      if (b.bg) { usedBg.add(b.bg); }
      if (b.t === 'bg' && b.id) { usedBg.add(b.id); }
      if (b.bgm) { usedBgm.add(b.bgm); }
      if (b.t === 'bgm' && b.id) { usedBgm.add(b.id); }
      if (b.sfx) { usedSfx.add(b.sfx); }
      if (b.t === 'sfx' && b.id) { usedSfx.add(b.id); }
      if (b.ch) {
        if (!usedChar.has(b.ch)) { usedChar.set(b.ch, new Set()); }
        if (b.ex) { usedChar.get(b.ch).add(b.ex); }
      }
      if ((b.t === 'nar' || b.t === 'inn' || b.t === 'dial') && (!b.tx || !b.tx.trim())) {
        emptyText = b.t;
      }
      if (b.t === 'cho') { for (const o of b.opts) { if (o.then) { walk(o.then); } } }
    }
  }
  walk(script);

  check(badBeat === null,   'nenhum tipo de beat desconhecido', badBeat);
  check(dupScene === null,  'nenhum id de cena duplicado', dupScene);
  check(emptyText === null, 'nenhum beat de texto vazio', emptyText);

  for (const id of usedBg)  { check(!!RBF.BACKGROUNDS[id], 'background no manifesto: ' + id); }
  for (const id of usedBgm) { check(!!RBF.BGM[id],         'bgm no manifesto: ' + id); }
  for (const id of usedSfx) { check(!!RBF.SFX[id],         'sfx no manifesto: ' + id); }

  for (const [ch, exprs] of usedChar) {
    const def = RBF.CHARACTERS[ch];
    check(!!def, 'personagem no manifesto: ' + ch);
    if (!def) { continue; }
    for (const ex of exprs) {
      check(!!def.sprites[ex], 'expressao existe: ' + ch + '.' + ex);
    }
    check(!!def.sprites[def.fallbackExpression],
          'fallbackExpression valida: ' + ch + '.' + def.fallbackExpression);
  }

  for (const [ch, def] of Object.entries(RBF.CHARACTERS)) {
    if (!def.available) { continue; }
    for (const [ex, file] of Object.entries(def.sprites)) {
      const p = path.join(ROOT, RBF.CONFIG.paths.characters, def.dir, file);
      check(fs.existsSync(p), 'arquivo de sprite existe: ' + ch + '.' + ex);
    }
  }
  for (const [id, def] of Object.entries(RBF.BACKGROUNDS)) {
    if (!def.available || !def.file) { continue; }
    check(fs.existsSync(path.join(ROOT, RBF.CONFIG.paths.backgrounds, def.file)),
          'arquivo de background existe: ' + id);
  }

  const cho = script.find(b => b.t === 'cho');
  check(!!cho, 'existe uma escolha no Capitulo 1');
  if (cho) {
    check(cho.opts.length === 3, 'a escolha tem tres opcoes', String(cho.opts.length));
    check(new Set(cho.opts.map(o => o.tx)).size === 3, 'textos das opcoes sao distintos');
    check(new Set(cho.opts.map(o => JSON.stringify(o.then))).size === 3,
          'consequencias imediatas sao distintas');
    for (const o of cho.opts) {
      check(!!o.then && o.then.length > 0, 'opcao ' + o.id + ' tem consequencia imediata');
      check(!!o.flags && Object.keys(o.flags).length > 0, 'opcao ' + o.id + ' grava flags');
    }
    const c = cho.opts.find(o => o.id === 'C');
    check(!!c && c.flags.archive_seed === true, 'opcao C semeia o Arquivo (archive_seed)');
  }

  const end = script[script.length - 2];
  check(end && end.t === 'end_chap' &&
        end.line1 === 'Primeiro ano em Velha Nidhaus.' &&
        end.line2 === 'Quatro ainda vir\u00e3o.',
        'linha final canonica preservada');

  console.log('        beats: ' + script.length + ' | cenas: ' + seenScenes.size);
  return script;
}

/* ---------- 3. playthrough ---------------------------------------------- */
async function playthrough(choiceIndex, useKeyboard) {
  const vc = new VirtualConsole();
  const runtimeErrors = [];
  vc.on('jsdomError', e => runtimeErrors.push('jsdomError: ' + e.message));
  vc.on('error', (...a) => runtimeErrors.push('console.error: ' + a.join(' ')));

  const dom = await JSDOM.fromFile(path.join(ROOT, 'index.html'), {
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
    virtualConsole: vc
  });
  const win = dom.window;
  await new Promise(r => win.addEventListener('load', r));

  win.RBF.CONFIG.text.typeSpeedMs = 0;
  win.RBF.CONFIG.text.pauseMs     = 1;
  win.RBF.CONFIG.timing = { fadeMs: 1, cardMs: 1, arcMs: 1, lastMs: 1 };

  const dbg   = win.RBF.Engine._debug;
  const stage = win.document.getElementById('vn');

  function key(k) {
    const ev = new win.KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true });
    win.document.dispatchEvent(ev);
  }

  let steps = 0;
  const MAX = 5000;
  let textBeats = 0;

  while (!dbg.isFinished() && steps < MAX) {
    steps += 1;
    if (dbg.isChoice()) {
      if (useKeyboard) {
        key(String(choiceIndex + 1));
      } else {
        const btns = dbg.buttons();
        if (!btns.length) { break; }
        btns[Math.min(choiceIndex, btns.length - 1)].click();
      }
    } else {
      if (win.document.getElementById('textcontent').textContent) { textBeats += 1; }
      if (useKeyboard) { key(' '); } else { stage.click(); }
    }
    await new Promise(r => setTimeout(r, 0));
  }

  const result = {
    finished:  dbg.isFinished(),
    steps,
    errors:    runtimeErrors,
    flags:     JSON.parse(JSON.stringify(win.RBF.STATE.flags)),
    scenes:    win.RBF.STATE.history.slice(),
    missing:   win.RBF.Assets.report(),
    endText:   win.document.getElementById('endchap-1').textContent + ' / ' +
               win.document.getElementById('endchap-2').textContent,
    textBeats
  };
  win.close();
  return result;
}

/* ---------- 4. skip do typewriter --------------------------------------- */
async function typewriterCheck() {
  console.log('\n== TYPEWRITER / SKIP ==');
  const dom = await JSDOM.fromFile(path.join(ROOT, 'index.html'), {
    runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true,
    virtualConsole: new VirtualConsole()
  });
  const win = dom.window;
  await new Promise(r => win.addEventListener('load', r));

  win.RBF.CONFIG.text.typeSpeedMs = 40;   /* lento de proposito */
  win.RBF.CONFIG.text.pauseMs     = 1;
  win.RBF.CONFIG.timing = { fadeMs: 1, cardMs: 1, arcMs: 1, lastMs: 1 };

  const dbg   = win.RBF.Engine._debug;
  const stage = win.document.getElementById('vn');
  const txt   = win.document.getElementById('textcontent');

  /* o fade inicial usa o timing original; espera ele terminar */
  await new Promise(r => setTimeout(r, 1000));

  /* avanca ate aparecer texto sendo digitado */
  for (let i = 0; i < 200 && !dbg.isTyping(); i++) {
    stage.click();
    await new Promise(r => setTimeout(r, 10));
  }
  check(dbg.isTyping(), 'typewriter esta digitando');

  const partial = txt.textContent;
  stage.click();                       /* skip */
  await new Promise(r => setTimeout(r, 5));
  const full = txt.textContent;

  check(!dbg.isTyping(), 'skip encerra a digitacao');
  check(full.length > partial.length, 'skip completa o texto em vez de truncar',
        'parcial=' + partial.length + ' final=' + full.length);
  check(full.startsWith(partial), 'texto final contem o parcial');
  check(txt.classList.contains('waiting'), 'cursor de avanco aparece apos o skip');

  win.close();
}

/* ---------- main --------------------------------------------------------- */
(async function main() {
  staticChecks();

  const dom0 = await JSDOM.fromFile(path.join(ROOT, 'index.html'), {
    runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true,
    virtualConsole: new VirtualConsole()
  });
  await new Promise(r => dom0.window.addEventListener('load', r));
  manifestChecks(dom0.window);
  dom0.window.close();

  await typewriterCheck();

  console.log('\n== PLAYTHROUGH (clique) ==');
  const labels = ['A', 'B', 'C'];
  const results = [];
  for (let i = 0; i < 3; i++) {
    const r = await playthrough(i, false);
    results.push(r);
    console.log('  -- ramo ' + labels[i] + ' --');
    check(r.finished, 'ramo ' + labels[i] + ': roteiro alcanca o fim');
    check(r.errors.length === 0, 'ramo ' + labels[i] + ': sem erro de runtime',
          r.errors.join(' | '));
    check(r.flags.report_style === labels[i],
          'ramo ' + labels[i] + ': flag report_style correta', String(r.flags.report_style));
    check(r.steps < 5000, 'ramo ' + labels[i] + ': sem loop infinito', 'passos=' + r.steps);
    check(r.endText.indexOf('Quatro ainda vir') !== -1,
          'ramo ' + labels[i] + ': cartao de fim renderizado');
    console.log('        cenas=' + r.scenes.length + ' passos=' + r.steps +
                ' beats de texto=' + r.textBeats);
  }

  check(new Set(results.map(r => JSON.stringify(r.flags))).size === 3,
        'os tres ramos produzem estados diferentes');
  check(new Set(results.map(r => r.steps)).size > 1,
        'os tres ramos tem duracoes diferentes',
        results.map(r => r.steps).join('/'));

  console.log('\n== PLAYTHROUGH (teclado) ==');
  const kb = await playthrough(2, true);
  check(kb.finished, 'teclado: roteiro alcanca o fim');
  check(kb.flags.report_style === 'C', 'teclado: escolha por tecla numerica funciona',
        String(kb.flags.report_style));
  check(kb.errors.length === 0, 'teclado: sem erro de runtime', kb.errors.join(' | '));

  console.log('\n== ASSETS AUSENTES (fallback ativo) ==');
  console.log('  ' + (results[2].missing.length ? results[2].missing.join('\n  ') : '(nenhum)'));

  console.log('\n== TOTAL ==');
  console.log('  checagens: ' + checks + ' | falhas: ' + failures.length);
  if (failures.length) {
    console.log('\nFALHAS:');
    failures.forEach(f => console.log('  - ' + f));
    process.exit(1);
  }
  console.log('  TUDO OK');
})();
