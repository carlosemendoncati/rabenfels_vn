#!/usr/bin/env node
/* ==========================================================================
   ARQUIVO RABENFELS - tools/validate.js

   Uso:  node tools/validate.js

   Roda o projeto de verdade em um DOM minimo proprio (tools/minidom.js).
   Nao exige npm install nem pacote externo: so modulos nativos do Node.

   Verifica:
   - arquivos referenciados pelo index.html
   - ids do HTML exigidos pelos scripts
   - codificacao ASCII pura dos arquivos de roteiro
   - manifesto x roteiro: background, bgm, sfx, personagem, expressao
   - integridade do roteiro: cena duplicada, beat vazio, tipo desconhecido
   - escolhas: id estavel, opcoes distintas, flags, consequencias distintas
   - maquina de escrever e o pulo para o texto completo
   - partida completa por cada ramo de escolha, com clique e com teclado
   - save, load, quicksave, autosave e reconstrucao do roteiro por choiceLog
   - ajustes persistidos
   - roteamento de entrada com painel aberto

   Sai com codigo 1 se houver falha.
   ========================================================================== */
'use strict';

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const MD   = require('./minidom.js');
const ROOT = path.resolve(__dirname, '..');

let failures = [];
let checks   = 0;

function check(ok, label, detail) {
  checks += 1;
  if (!ok) { failures.push(label + (detail ? ' -> ' + detail : '')); }
  console.log((ok ? '  PASS  ' : '  FAIL  ') + label +
              (ok || !detail ? '' : ' :: ' + detail));
}

function section(name) {
  console.log('\n== ' + name + ' ==');
}

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

/* ==========================================================================
   1. ESTATICO
   ========================================================================== */

function staticChecks() {
  section('ESTATICO');

  const scripts = MD.scriptsFromHtml(html);
  const styles  = MD.stylesFromHtml(html);

  for (const rel of scripts.concat(styles)) {
    check(fs.existsSync(path.join(ROOT, rel)), 'arquivo referenciado existe: ' + rel);
  }

  /* Todo getElementById do projeto precisa achar um id no HTML. */
  const ids = MD.idsFromHtml(html);
  const sources = scripts.filter(s => s.endsWith('.js'));
  const wanted = new Set();

  for (const rel of sources) {
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    for (const m of src.matchAll(/getElementById\('([^']+)'\)/g)) { wanted.add(m[1]); }
  }
  for (const id of wanted) {
    check(ids.indexOf(id) !== -1, 'id presente no HTML: ' + id);
  }

  /* Sintaxe de todos os scripts. */
  for (const rel of sources) {
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    let ok = true, err = '';
    try { new vm.Script(src, { filename: rel }); }
    catch (e) { ok = false; err = e.message; }
    check(ok, 'sintaxe v\u00e1lida: ' + rel, err);
  }

  /* Roteiro e modulos em ASCII puro. */
  for (const rel of sources) {
    const buf = fs.readFileSync(path.join(ROOT, rel));
    const bad = buf.findIndex(b => b > 127);
    check(bad === -1, 'ASCII puro: ' + rel, bad === -1 ? '' : 'byte offset ' + bad);
  }

  /* CSS sem valor de cor obviamente quebrado. */
  for (const rel of styles) {
    const css = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const bad = css.match(/color:\s*#[0-9a-fA-F]*[^0-9a-fA-F;\s][^;]*;/g);
    check(!bad, 'CSS sem cor malformada: ' + rel, bad ? bad[0] : '');
    const opens = (css.match(/{/g) || []).length;
    const closes = (css.match(/}/g) || []).length;
    check(opens === closes, 'CSS com chaves balanceadas: ' + rel, opens + ' abre / ' + closes + ' fecha');
  }
}

/* ==========================================================================
   2. CARGA DO PROJETO
   ========================================================================== */

function boot() {
  const ids = MD.idsFromHtml(html);
  const win = MD.createWindow(ids);
  const ctx = vm.createContext(win);

  for (const rel of MD.scriptsFromHtml(html)) {
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    vm.runInContext(src, ctx, { filename: rel });
  }
  return win;
}

function tick(ms) {
  return new Promise(r => setTimeout(r, ms || 0));
}

/* ==========================================================================
   3. MANIFESTO x ROTEIRO
   ========================================================================== */

function manifestChecks(win) {
  section('MANIFESTO x ROTEIRO');

  const RBF = win.RBF;
  const script = RBF.Script.base();

  const KNOWN = new Set(['scene','bg','bgm','sfx','spr','spr_hide','spr_clear','flag',
                         'pause','fade_in','fade_out','nar','inn','dial','arc','last',
                         'title','chap','end_chap','cho']);

  const seenScenes = new Set();
  const usedBg = new Set(), usedBgm = new Set(), usedSfx = new Set();
  const usedChar = new Map();
  const choiceIds = new Set();

  let dupScene = null, badBeat = null, emptyText = null, dupChoiceId = null;

  function collect(beats) {
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
      if (b.t === 'cho') {
        if (choiceIds.has(b.id)) { dupChoiceId = b.id; }
        choiceIds.add(b.id);
        for (const o of b.opts) { if (o.then) { collect(o.then); } }
      }
    }
  }
  collect(script);

  check(badBeat === null,     'nenhum tipo de beat desconhecido', badBeat);
  check(dupScene === null,    'nenhum id de cena duplicado', dupScene);
  check(emptyText === null,   'nenhum beat de texto vazio', emptyText);
  check(dupChoiceId === null, 'nenhum id de escolha duplicado', dupChoiceId);

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

  /* Arquivo em disco para tudo marcado como available. */
  for (const [ch, def] of Object.entries(RBF.CHARACTERS)) {
    if (!def.available) { continue; }
    for (const [ex, file] of Object.entries(def.sprites)) {
      check(fs.existsSync(path.join(ROOT, RBF.CONFIG.paths.characters, def.dir, file)),
            'sprite existe em disco: ' + ch + '.' + ex);
    }
  }
  for (const [id, def] of Object.entries(RBF.BACKGROUNDS)) {
    if (!def.available || !def.file) { continue; }
    check(fs.existsSync(path.join(ROOT, RBF.CONFIG.paths.backgrounds, def.file)),
          'background existe em disco: ' + id);
  }
  for (const [id, def] of Object.entries(RBF.BGM)) {
    if (!def.available) { continue; }
    const found = def.files.some(f => fs.existsSync(path.join(ROOT, RBF.CONFIG.paths.bgm, f)));
    check(found, 'bgm existe em disco: ' + id, def.files.join(' / '));
  }
  for (const [id, def] of Object.entries(RBF.SFX)) {
    if (!def.available) { continue; }
    const found = def.files.some(f => fs.existsSync(path.join(ROOT, RBF.CONFIG.paths.sfx, f)));
    check(found, 'sfx existe em disco: ' + id, def.files.join(' / '));
  }

  /* Capitulos registrados x dados presentes. */
  for (const ch of RBF.CHAPTERS) {
    check(Array.isArray(RBF[ch.data]) && RBF[ch.data].length,
          'capitulo com dados: ' + ch.id + ' (' + ch.data + ')');
    check(RBF.Script.chapterStart(script, ch.id) >= 0,
          'capitulo alcancavel no roteiro: ' + ch.id);
  }

  /* Escolhas. */
  const choices = RBF.Script.choices();
  check(choices.length >= 2, 'ha escolhas no roteiro', String(choices.length));

  for (const cho of choices) {
    check(!!cho.id, 'escolha tem id estavel', cho.prompt);
    check(cho.opts.length === 3, 'escolha ' + cho.id + ' tem tres opcoes', String(cho.opts.length));
    check(new Set(cho.opts.map(o => o.tx)).size === cho.opts.length,
          'escolha ' + cho.id + ': textos distintos');
    check(new Set(cho.opts.map(o => JSON.stringify(o.then))).size === cho.opts.length,
          'escolha ' + cho.id + ': consequencias distintas');
    for (const o of cho.opts) {
      check(!!o.then && o.then.length > 0, 'escolha ' + cho.id + '/' + o.id + ': tem consequencia');
      check(!!o.flags && Object.keys(o.flags).length > 0, 'escolha ' + cho.id + '/' + o.id + ': grava flags');
    }
  }

  /* A opcao C do capitulo 1 semeia o Arquivo. */
  const c1 = choices.find(c => c.id === 'cap1_relatorio' || c.prompt.indexOf('PRIMEIRO') !== -1);
  if (c1) {
    const optC = c1.opts.find(o => o.id === 'C');
    check(!!optC && optC.flags.archive_seed === true, 'capitulo 1: opcao C semeia o Arquivo');
  }

  /* Beats condicionais referenciam flags que alguma escolha realmente grava. */
  const settable = new Set();
  for (const cho of choices) {
    for (const o of cho.opts) {
      for (const k of Object.keys(o.flags || {})) { settable.add(k); }
    }
  }
  let badCond = null;
  function scanCond(beats) {
    for (const b of beats) {
      if (b.if) {
        for (const k of Object.keys(b.if)) {
          if (!settable.has(k)) { badCond = k; }
        }
      }
      if (b.t === 'cho') { for (const o of b.opts) { if (o.then) { scanCond(o.then); } } }
    }
  }
  scanCond(script);
  check(badCond === null, 'beats condicionais usam flags existentes', badCond);

  /* Linha final canonica do capitulo 1. */
  const c1data = RBF.CHAPTER1;
  const endC1 = c1data[c1data.length - 2];
  check(endC1 && endC1.t === 'end_chap' &&
        endC1.line1 === 'Primeiro ano em Velha Nidhaus.' &&
        endC1.line2 === 'Quatro ainda vir\u00e3o.',
        'linha final canonica do capitulo 1 preservada');

  console.log('        beats: ' + script.length + ' | cenas: ' + seenScenes.size +
              ' | escolhas: ' + choices.length);
}

/* ==========================================================================
   4. MAQUINA DE ESCREVER
   ========================================================================== */

async function typewriterCheck() {
  section('TYPEWRITER / SKIP');

  const win = boot();
  const RBF = win.RBF;
  const doc = win.document;

  RBF.Settings.set('typewriter', true);
  RBF.Settings.set('typeSpeedMs', 40);
  RBF.CONFIG.timing = { fadeMs: 1, cardMs: 1, arcMs: 1, lastMs: 1 };
  RBF.CONFIG.text.pauseMs = 1;

  RBF.Menu.startNewGame();
  await tick(5);

  const dbg   = RBF.Engine._debug;
  const stage = doc.getElementById('vn');
  const txt   = doc.getElementById('textcontent');

  for (let i = 0; i < 200 && !dbg.isTyping(); i++) {
    stage.click();
    await tick(5);
  }
  check(dbg.isTyping(), 'typewriter esta digitando');

  const partial = txt.textContent;
  stage.click();
  await tick(5);
  const full = txt.textContent;

  check(!dbg.isTyping(), 'skip encerra a digitacao');
  check(full.length > partial.length, 'skip completa o texto em vez de truncar',
        'parcial=' + partial.length + ' final=' + full.length);
  check(full.startsWith(partial), 'texto final contem o parcial');
  check(txt.classList.contains('waiting'), 'cursor de avanco aparece apos o skip');

  /* Texto instantaneo quando o efeito e desligado. */
  RBF.Settings.set('typewriter', false);
  stage.click();
  await tick(5);
  check(!dbg.isTyping(), 'efeito desligado exibe o texto de uma vez');
}

/* ==========================================================================
   5. PARTIDA COMPLETA
   ========================================================================== */

async function playthrough(optionIndex, useKeyboard) {
  const win = boot();
  const RBF = win.RBF;
  const doc = win.document;

  const errors = [];
  const realError = console.error;
  console.error = function () { errors.push(Array.prototype.join.call(arguments, ' ')); };

  RBF.Settings.set('typewriter', false);
  RBF.CONFIG.timing = { fadeMs: 1, cardMs: 1, arcMs: 1, lastMs: 1 };
  RBF.CONFIG.text.pauseMs = 1;

  RBF.Menu.startNewGame();
  await tick(5);

  const dbg   = RBF.Engine._debug;
  const stage = doc.getElementById('vn');

  let steps = 0;
  const MAX = 6000;
  const chosen = [];

  while (!dbg.isFinished() && steps < MAX) {
    steps += 1;
    if (dbg.isChoice()) {
      const btns = dbg.buttons();
      if (!btns.length) { break; }
      const at = Math.min(optionIndex, btns.length - 1);
      chosen.push(at + 1);
      if (useKeyboard) { win.pressKey(String(at + 1)); }
      else { btns[at].click(); }
    } else {
      if (useKeyboard) { win.pressKey(' '); }
      else { stage.click(); }
    }
    await tick(0);
  }

  console.error = realError;

  const out = {
    finished:  dbg.isFinished(),
    steps,
    errors,
    chosen,
    flags:     JSON.parse(JSON.stringify(RBF.STATE.flags)),
    choiceLog: JSON.parse(JSON.stringify(RBF.STATE.choiceLog)),
    chapter:   RBF.STATE.chapter,
    history:   RBF.History.all().length,
    endText:   doc.getElementById('endchap-1').textContent + ' / ' +
               doc.getElementById('endchap-2').textContent,
    missing:   RBF.Assets.report().length,
    progress:  RBF.Saves.readProgress()
  };
  return out;
}

async function playthroughChecks() {
  section('PARTIDA COMPLETA (clique)');

  const labels = ['A', 'B', 'C'];
  const results = [];

  for (let i = 0; i < 3; i++) {
    const r = await playthrough(i, false);
    results.push(r);
    console.log('  -- ramo ' + labels[i] + ' --');
    check(r.finished, 'ramo ' + labels[i] + ': alcanca o fim do roteiro');
    check(r.errors.length === 0, 'ramo ' + labels[i] + ': sem erro de runtime', r.errors.join(' | '));
    check(r.steps < 6000, 'ramo ' + labels[i] + ': sem loop infinito', 'passos=' + r.steps);
    check(r.chapter === 'capitulo2', 'ramo ' + labels[i] + ': termina no capitulo 2', String(r.chapter));
    check(r.endText.indexOf('A casa come') !== -1,
          'ramo ' + labels[i] + ': cartao final do capitulo 2 renderizado');
    check(Object.keys(r.choiceLog).length === 2,
          'ramo ' + labels[i] + ': duas escolhas registradas', JSON.stringify(r.choiceLog));
    check(r.progress.chaptersReached.length === 3,
          'ramo ' + labels[i] + ': tres capitulos marcados como alcancados');
    console.log('        passos=' + r.steps + ' historico=' + r.history +
                ' escolhas=' + r.chosen.join(','));
  }

  check(new Set(results.map(r => JSON.stringify(r.flags))).size === 3,
        'os tres ramos produzem estados diferentes');

  section('PARTIDA COMPLETA (teclado)');
  const kb = await playthrough(2, true);
  check(kb.finished, 'teclado: alcanca o fim');
  check(kb.errors.length === 0, 'teclado: sem erro de runtime', kb.errors.join(' | '));
  check(kb.flags.report_style === 'C' && kb.flags.ledger_report === 'C',
        'teclado: escolha por tecla numerica funciona',
        kb.flags.report_style + '/' + kb.flags.ledger_report);
}

/* ==========================================================================
   6. SAVE E LOAD
   ========================================================================== */

async function saveLoadChecks() {
  section('SAVE / LOAD');

  const win = boot();
  const RBF = win.RBF;
  const doc = win.document;

  RBF.Settings.set('typewriter', false);
  RBF.CONFIG.timing = { fadeMs: 1, cardMs: 1, arcMs: 1, lastMs: 1 };
  RBF.CONFIG.text.pauseMs = 1;

  RBF.Menu.startNewGame();
  await tick(5);

  const dbg   = RBF.Engine._debug;
  const stage = doc.getElementById('vn');

  /* Avanca ate passar da primeira escolha, escolhendo a opcao C. */
  let steps = 0;
  let passedChoice = false;
  while (steps < 4000) {
    steps += 1;
    if (dbg.isChoice()) {
      dbg.buttons()[2].click();
      passedChoice = true;
    } else {
      stage.click();
    }
    await tick(0);
    if (passedChoice && steps > 40) { break; }
  }
  check(passedChoice, 'chegou a primeira escolha');
  check(RBF.STATE.flags.archive_seed === true, 'flag da opcao C gravada');

  /* Autosave deve ter acontecido em alguma troca de cena. */
  check(RBF.Saves.hasSlot(RBF.Saves.AUTOSAVE), 'autosave gravado automaticamente');

  /* Salva em espaco manual. */
  check(RBF.Engine.canSave(), 'engine permite salvar no ponto atual');

  const snap = RBF.Engine.snapshot();
  const written = RBF.Saves.saveToSlot('1', snap);
  check(!!written, 'gravou no espaco manual 1');

  check(RBF.Saves.validate(written) === null, 'save gravado passa na validacao',
        String(RBF.Saves.validate(written)));

  /* Campos minimos do esquema. */
  const required = ['schemaVersion','gameVersion','createdAt','updatedAt','playtimeSeconds',
                    'chapterId','sceneId','beatIndex','flags','variables','unlockedContent',
                    'presentation','preview'];
  let missingField = null;
  for (const f of required) {
    if (!Object.prototype.hasOwnProperty.call(written, f)) { missingField = f; }
  }
  check(missingField === null, 'save contem todos os campos do esquema', missingField);

  const presFields = ['backgroundId','characterId','expressionId','characterPosition',
                      'textMode','currentBgmId'];
  let missingPres = null;
  for (const f of presFields) {
    if (!Object.prototype.hasOwnProperty.call(written.presentation, f)) { missingPres = f; }
  }
  check(missingPres === null, 'presentation contem todos os campos', missingPres);

  check(typeof written.preview.chapterLabel === 'string' && written.preview.chapterLabel.length > 0,
        'previa tem rotulo de capitulo', written.preview.chapterLabel);

  /* Continua jogando para divergir do save. */
  const beforeIndex = written.beatIndex;
  for (let i = 0; i < 30; i++) {
    if (dbg.isChoice()) { break; }
    stage.click();
    await tick(0);
  }
  check(dbg.index() !== beforeIndex, 'o jogo avancou depois de salvar');

  /* Carrega e confere que voltou ao ponto exato. */
  RBF.Engine.loadFrom(written);
  await tick(5);

  check(dbg.index() === beforeIndex, 'load volta ao beat exato',
        dbg.index() + ' != ' + beforeIndex);
  check(RBF.STATE.flags.archive_seed === true, 'load restaura as flags');
  check(RBF.STATE.chapter === written.chapterId, 'load restaura o capitulo');
  check(dbg.presentation().backgroundId === written.presentation.backgroundId,
        'load restaura o background');
  check(doc.getElementById('textcontent').textContent.length > 0 ||
        doc.getElementById('archive-box').classList.contains('show') ||
        doc.getElementById('last-box').classList.contains('show'),
        'load redesenha o texto que estava na tela');
  check(RBF.History.all().length > 0, 'load restaura o historico');

  /* O roteiro reconstruido tem o mesmo tamanho de quando foi salvo. */
  const rebuilt = RBF.Script.build(written.choiceLog);
  check(rebuilt.length === dbg.scriptLength(),
        'roteiro reconstruido bate com o roteiro em execucao',
        rebuilt.length + ' != ' + dbg.scriptLength());

  /* Quicksave e quickload. */
  RBF.Menu.quickSave();
  check(RBF.Saves.hasSlot(RBF.Saves.QUICKSAVE), 'quicksave gravado');

  /* Save de versao errada e recusado. */
  const bad = JSON.parse(JSON.stringify(written));
  bad.schemaVersion = 999;
  check(RBF.Saves.validate(bad) !== null, 'save de versao incompativel e recusado');

  const bad2 = JSON.parse(JSON.stringify(written));
  bad2.chapterId = 'capitulo_inexistente';
  check(RBF.Saves.validate(bad2) !== null, 'save com capitulo desconhecido e recusado');

  const bad3 = JSON.parse(JSON.stringify(written));
  bad3.beatIndex = 999999;
  check(RBF.Saves.validate(bad3) !== null, 'save com posicao fora do roteiro e recusado');

  check(RBF.Saves.validate(null) !== null, 'save nulo e recusado');

  /* Lista de espacos: 12 manuais + autosave + quicksave. */
  const slots = RBF.Saves.listSlots();
  check(slots.length === RBF.STORAGE.slotCount + 2,
        'lista tem 12 espacos manuais mais autosave e quicksave', String(slots.length));

  const filled = slots.filter(s => !s.empty);
  check(filled.length >= 3, 'autosave, quicksave e espaco 1 preenchidos', String(filled.length));

  for (const s of filled) {
    check(!s.broken, 'espaco ' + s.id + ' integro', s.problem);
    check(typeof s.excerpt === 'string', 'espaco ' + s.id + ' tem previa de dialogo');
  }

  /* Formatacao pt-BR. */
  const dateText = RBF.Saves.formatDate(written.updatedAt);
  check(/\d{2}\/\d{2}\/\d{4}/.test(dateText), 'data formatada em pt-BR', dateText);
  check(RBF.Saves.formatPlaytime(3725).indexOf('h') !== -1, 'tempo de jogo formatado',
        RBF.Saves.formatPlaytime(3725));

  /* Apagar. */
  RBF.Saves.deleteSlot('1');
  check(!RBF.Saves.hasSlot('1'), 'apagar espaco funciona');
}

/* ==========================================================================
   7. ESTADO, MENUS E ROTEAMENTO DE ENTRADA
   ========================================================================== */

async function uiChecks() {
  section('ESTADO E INTERFACE');

  const win = boot();
  const RBF = win.RBF;
  const doc = win.document;

  check(RBF.State.get() === 'title', 'o jogo comeca na tela de titulo', RBF.State.get());
  check(doc.getElementById('main-menu').classList.contains('show'), 'tela de titulo visivel');

  const actions = doc.getElementById('main-menu-actions');
  check(actions.childNodes.length >= 4, 'tela de titulo tem as opcoes principais',
        String(actions.childNodes.length));

  /* Continuar comeca desabilitado sem save. */
  const cont = actions.childNodes[1];
  check(cont.classList.contains('disabled'), 'Continuar desabilitado sem save');

  /* Creditos abrem e fecham. */
  RBF.Menu.openCredits();
  await tick(2);
  check(RBF.State.get() === 'credits', 'creditos abrem o estado correto', RBF.State.get());
  check(RBF.UI.isPanelOpen('credits'), 'painel de creditos montado');
  RBF.UI.closePanel();
  await tick(2);
  check(RBF.State.get() === 'title', 'fechar creditos volta ao titulo', RBF.State.get());

  /* Ajustes persistem. */
  RBF.Settings.set('bgmVolume', 0.11);
  check(RBF.CONFIG.audio.bgmVolume === 0.11, 'ajuste aplicado em tempo real');
  const raw = RBF.Storage.read(RBF.STORAGE.keys.settings, null);
  check(raw && raw.bgmVolume === 0.11, 'ajuste gravado no armazenamento');

  RBF.Settings.set('typeSpeedMs', 999);
  check(RBF.Settings.get('typeSpeedMs') <= 120, 'ajuste fora da faixa e limitado',
        String(RBF.Settings.get('typeSpeedMs')));

  /* Comeca o jogo. */
  RBF.Settings.set('typewriter', false);
  RBF.CONFIG.timing = { fadeMs: 1, cardMs: 1, arcMs: 1, lastMs: 1 };
  RBF.CONFIG.text.pauseMs = 1;

  RBF.Menu.startNewGame();
  await tick(5);
  check(RBF.State.get() === 'playing', 'Novo Jogo entra em playing', RBF.State.get());
  check(!doc.getElementById('main-menu').classList.contains('show'), 'titulo escondido no jogo');
  check(doc.getElementById('game-bar').classList.contains('show'), 'barra de jogo visivel');

  const dbg   = RBF.Engine._debug;
  const stage = doc.getElementById('vn');

  for (let i = 0; i < 20; i++) { stage.click(); await tick(0); }
  const beforeMenu = dbg.index();

  /* Menu de jogo pausa a progressao. */
  RBF.Menu.openGameMenu();
  await tick(2);
  check(RBF.State.get() === 'paused', 'menu de jogo pausa', RBF.State.get());
  check(RBF.UI.isPanelOpen('gamemenu'), 'painel do menu montado');

  for (let i = 0; i < 10; i++) { stage.click(); await tick(0); }
  check(dbg.index() === beforeMenu, 'clique no palco nao avanca com menu aberto',
        dbg.index() + ' != ' + beforeMenu);

  win.pressKey(' ');
  await tick(2);
  check(dbg.index() === beforeMenu, 'espaco nao avanca com menu aberto');

  /* Escape fecha o painel. */
  win.pressKey('Escape');
  await tick(2);
  check(!RBF.UI.isPanelOpen(), 'Escape fecha o painel');
  check(RBF.State.get() === 'playing', 'fechar o menu volta a playing', RBF.State.get());

  stage.click();
  await tick(2);
  check(dbg.index() > beforeMenu, 'progressao volta ao normal apos fechar o menu');

  /* Historico registra o que foi lido. */
  check(!RBF.History.isEmpty(), 'historico registrou os beats lidos');
  check(RBF.History.excerpt(90).length > 0, 'historico produz previa de dialogo');

  RBF.Menu.openHistory();
  await tick(2);
  check(RBF.State.get() === 'history', 'historico abre o estado correto', RBF.State.get());
  RBF.UI.closePanel();
  await tick(2);

  /* Confirmacao entra e sai do estado modal. */
  const stateBefore = RBF.State.get();
  RBF.UI.confirm({ title: 't', message: 'm', onConfirm: function () {} });
  await tick(2);
  check(RBF.State.get() === 'modal', 'confirmacao entra em modal', RBF.State.get());
  win.pressKey('Escape');
  await tick(2);
  check(RBF.State.get() === stateBefore, 'cancelar confirmacao devolve o estado anterior',
        RBF.State.get());

  /* Voltar ao titulo nao apaga save. */
  RBF.Menu.quickSave();
  const hadQuick = RBF.Saves.hasSlot(RBF.Saves.QUICKSAVE);
  RBF.Engine.stop();
  RBF.Menu.showTitle();
  await tick(2);
  check(RBF.State.get() === 'title', 'voltar ao titulo muda o estado', RBF.State.get());
  check(RBF.Saves.hasSlot(RBF.Saves.QUICKSAVE) === hadQuick, 'voltar ao titulo preserva saves');

  /* Continuar agora esta habilitado. */
  const actions2 = doc.getElementById('main-menu-actions');
  check(!actions2.childNodes[1].classList.contains('disabled'),
        'Continuar habilitado quando ha save');
}

/* ==========================================================================
   8. ARMAZENAMENTO INDISPONIVEL
   ========================================================================== */

async function storageFailureCheck() {
  section('ARMAZENAMENTO INDISPONIVEL');

  const ids = MD.idsFromHtml(html);
  const win = MD.createWindow(ids);

  /* localStorage que lanca excecao em toda escrita. */
  win.localStorage = {
    getItem: function () { throw new Error('bloqueado'); },
    setItem: function () { throw new Error('bloqueado'); },
    removeItem: function () { throw new Error('bloqueado'); }
  };

  const ctx = vm.createContext(win);
  let crashed = false, msg = '';
  try {
    for (const rel of MD.scriptsFromHtml(html)) {
      const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
      vm.runInContext(src, ctx, { filename: rel });
    }
  } catch (e) {
    crashed = true;
    msg = e.message;
  }

  check(!crashed, 'projeto carrega com localStorage bloqueado', msg);
  if (crashed) { return; }

  const RBF = win.RBF;
  check(RBF.Storage.isPersistent() === false, 'detecta que o armazenamento nao persiste');

  RBF.Settings.set('bgmVolume', 0.3);
  check(RBF.Settings.get('bgmVolume') === 0.3, 'ajustes continuam funcionando em memoria');

  RBF.Settings.set('typewriter', false);
  RBF.CONFIG.timing = { fadeMs: 1, cardMs: 1, arcMs: 1, lastMs: 1 };
  RBF.CONFIG.text.pauseMs = 1;

  RBF.Menu.startNewGame();
  await tick(5);
  check(RBF.State.get() === 'playing', 'o jogo comeca mesmo sem armazenamento');

  const stage = win.document.getElementById('vn');
  for (let i = 0; i < 30; i++) { stage.click(); await tick(0); }
  check(RBF.Engine._debug.index() > 0, 'o roteiro avanca sem armazenamento');
}

/* ==========================================================================
   MAIN
   ========================================================================== */

(async function main() {
  staticChecks();

  const win = boot();
  manifestChecks(win);

  await typewriterCheck();
  await playthroughChecks();
  await saveLoadChecks();
  await uiChecks();
  await storageFailureCheck();

  section('TOTAL');
  console.log('  checagens: ' + checks + ' | falhas: ' + failures.length);

  if (failures.length) {
    console.log('\nFALHAS:');
    failures.forEach(f => console.log('  - ' + f));
    process.exit(1);
  }
  console.log('  TUDO OK');
})();
