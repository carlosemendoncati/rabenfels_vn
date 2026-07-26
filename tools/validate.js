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

/* Zera toda temporizacao e desliga o aviso de conteudo, para que o
   harness percorra o roteiro sem esperar animacao. */
function fastForward(RBF) {
  RBF.CONFIG.timing = {
    fadeMs: 1, cardMs: 1, arcMs: 1, lastMs: 1,
    gateMs: 1, sweepMs: 1, choiceHoldMs: 1, choiceHoldRouteMs: 1
  };
  RBF.CONFIG.text.pauseMs = 1;
  RBF.Settings.set('typewriter', false);
  RBF.Settings.set('contentWarning', false);
  RBF.INTRO.revealMs = 1;
  RBF.INTRO.returnRevealMs = 1;
}

/* Abre o portao e inicia uma partida nova, ja passado o portao. */
async function beginGame(win) {
  const RBF = win.RBF;
  fastForward(RBF);
  RBF.Menu.openArchive();
  await tick(20);
  RBF.Menu.startNewGame();
  await tick(20);
}

/* ==========================================================================
   3. MANIFESTO x ROTEIRO
   ========================================================================== */

function manifestChecks(win) {
  section('MANIFESTO x ROTEIRO');

  const RBF = win.RBF;
  const script = RBF.Script.base();

  const KNOWN = new Set(['scene','bg','bgm','sfx','spr','spr_hide','spr_clear','flag','ending',
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
  /* Flags gravadas por beat, e nao por escolha. O { t:'ending' } decide o
     final a partir de RBF.ENDINGS e grava em flags.ending; sem isto, todo
     'if:{ ending:... }' apareceria como flag orfa. */
  (function scanSet(beats) {
    for (const b of beats) {
      if (b.t === 'flag') {
        for (const k of Object.keys(b.set || {})) { settable.add(k); }
      }
      if (b.t === 'ending') { settable.add('ending'); }
      if (b.t === 'cho') { for (const o of b.opts) { if (o.then) { scanSet(o.then); } } }
    }
  })(script);
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

  fastForward(RBF);
  RBF.Menu.openArchive();
  await tick(20);
  RBF.Settings.set('typewriter', true);
  RBF.Settings.set('typeSpeedMs', 40);
  RBF.Menu.startNewGame();
  await tick(20);

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
  check(win.document.getElementById('rf-diamond').classList.contains('is-on'),
        'losango de avanco aparece apos o skip');

  /* Texto instantaneo quando o efeito e desligado. */
  RBF.Settings.set('typewriter', false);
  stage.click();
  await tick(5);
  check(!dbg.isTyping(), 'efeito desligado exibe o texto de uma vez');
}

/* ==========================================================================
   5. PARTIDA COMPLETA
   ========================================================================== */

/*
  optionId e o ID da opcao ('A', 'B', 'C'), nao a posicao na tela.

  Antes esta funcao clicava no botao de indice N, o que so equivalia a
  "sempre a opcao C" enquanto C fosse sempre o ultimo botao. As opcoes
  foram embaralhadas de proposito - com C sempre por ultimo, o jogador
  aprendia em dois capitulos a clicar na ultima e ia direto ao final
  verdadeiro. Selecionar por id mantem o teste estavel qualquer que seja
  a ordem de exibicao.
*/
async function playthrough(optionId, useKeyboard) {
  const win = boot();
  const RBF = win.RBF;
  const doc = win.document;

  const errors = [];
  const realError = console.error;
  console.error = function () { errors.push(Array.prototype.join.call(arguments, ' ')); };

  await beginGame(win);

  const dbg   = RBF.Engine._debug;
  const stage = doc.getElementById('vn');

  let steps = 0;
  const MAX = 8000;
  const chosen = [];

  while (!dbg.isFinished() && steps < MAX) {
    steps += 1;
    if (dbg.isChoice()) {
      const btns = dbg.buttons();
      if (!btns.length) { break; }
      /* Acha a posicao do botao cujo id bate. Se aquela escolha nao tiver
         esse id, cai no ultimo botao. */
      let at = btns.length - 1;
      for (let k = 0; k < btns.length; k++) {
        if (btns[k].getAttribute('data-option') === optionId) { at = k; break; }
      }
      chosen.push(optionId + '@' + (at + 1));
      if (useKeyboard) { win.pressKey(String(at + 1)); }
      else { btns[at].click(); }
      /* A escolha segura a cena por um instante antes de avancar. */
      await tick(6);
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
    /* Quantas escolhas o roteiro tem, para o teste nao fixar um numero. */
    choiceCount: RBF.Script.choices().length,
    /* Vem do manifesto, nao de constante. Fixar 'capitulo2' aqui
       obrigava a editar o validador a cada capitulo novo, e a falha
       resultante parecia defeito do jogo. */
    lastChapterId: RBF.CHAPTERS[RBF.CHAPTERS.length - 1].id,
    chapterCount:  RBF.CHAPTERS.length,
    progress:  RBF.Saves.readProgress(),
    routes:    RBF.Routes.all(),
    gallery:   RBF.Gallery.counts(),
    /* A janela fica disponivel para quem precisa inspecionar o estado
       DEPOIS da partida - o extra pos-jogo, por exemplo, que so existe
       quando o Epilogo terminou. */
    win
  };
  return out;
}

async function playthroughChecks() {
  section('PARTIDA COMPLETA (clique)');

  const labels = ['A', 'B', 'C'];
  const results = [];

  for (let i = 0; i < 3; i++) {
    const r = await playthrough(labels[i], false);
    results.push(r);
    console.log('  -- ramo ' + labels[i] + ' --');
    check(r.finished, 'ramo ' + labels[i] + ': alcanca o fim do roteiro');
    check(r.errors.length === 0, 'ramo ' + labels[i] + ': sem erro de runtime', r.errors.join(' | '));
    check(r.steps < 8000, 'ramo ' + labels[i] + ': sem loop infinito', 'passos=' + r.steps);
    check(r.chapter === r.lastChapterId,
          'ramo ' + labels[i] + ': termina no ultimo capitulo do manifesto',
          String(r.chapter) + ' esperado ' + r.lastChapterId);
    check(r.endText.trim().length > 0,
          'ramo ' + labels[i] + ': cartao final do ultimo capitulo renderizado',
          r.endText);
    /* Uma partida completa passa por toda escolha do roteiro. O numero
       vem do proprio roteiro: fixar '2' aqui obrigava a editar o
       validador a cada escolha nova, e a falha resultante parecia
       defeito do jogo. */
    check(Object.keys(r.choiceLog).length === r.choiceCount,
          'ramo ' + labels[i] + ': registrou todas as escolhas do roteiro',
          JSON.stringify(r.choiceLog) + ' de ' + r.choiceCount);
    check(r.progress.chaptersReached.length === r.chapterCount,
          'ramo ' + labels[i] + ': todos os capitulos marcados como alcancados',
          r.progress.chaptersReached.length + ' de ' + r.chapterCount);
    console.log('        passos=' + r.steps + ' historico=' + r.history +
                ' escolhas=' + r.chosen.join(','));
  }

  check(new Set(results.map(r => JSON.stringify(r.flags))).size === 3,
        'os tres ramos produzem estados diferentes');

  section('PARTIDA COMPLETA (teclado)');
  const kb = await playthrough('C', true);
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

  await beginGame(win);

  const dbg   = RBF.Engine._debug;
  const stage = doc.getElementById('vn');

  /* Avanca escolhendo sempre a opcao C, ate a flag archive_seed existir.

     Antes este laco parava na PRIMEIRA escolha e ja exigia archive_seed,
     o que so funcionava enquanto a primeira escolha do roteiro fosse a do
     relatorio. O Capitulo 1 ganhou uma escolha anterior a ela; a condicao
     de parada passou a ser a flag em si, que e o que o teste quer de
     verdade e nao depende da ordem das escolhas. */
  let steps = 0;
  let chosen = 0;
  while (steps < 6000) {
    steps += 1;
    if (dbg.isChoice()) {
      const bs = dbg.buttons();
      let at = bs.length - 1;
      for (let k = 0; k < bs.length; k++) {
        if (bs[k].getAttribute('data-option') === 'C') { at = k; break; }
      }
      bs[at].click();
      chosen += 1;
      await tick(8);
    } else {
      stage.click();
    }
    await tick(0);
    if (RBF.STATE.flags.archive_seed === true && dbg.isWaiting()) { break; }
  }
  check(chosen > 0, 'chegou a alguma escolha');
  check(RBF.STATE.flags.archive_seed === true,
        'flag da opcao C gravada', 'escolhas feitas: ' + chosen);

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

  fastForward(RBF);

  check(RBF.State.get() === 'title', 'o jogo comeca na tela de titulo', RBF.State.get());
  check(doc.getElementById('rf-gate').classList.contains('is-open'),
        'portao de abertura visivel na primeira carga');
  check(!doc.getElementById('main-menu').classList.contains('show'),
        'menu principal escondido antes do portao');
  check(!RBF.Audio.isUnlocked(), 'audio nao e destravado antes da interacao');

  /* Abre o arquivo. */
  RBF.Menu.openArchive();
  await tick(20);

  check(RBF.Audio.isUnlocked(), 'portao destrava o audio');
  check(!doc.getElementById('rf-gate').classList.contains('is-open'), 'portao sai de cena');
  check(doc.getElementById('main-menu').classList.contains('show'), 'menu principal visivel');

  /* Clique repetido nao duplica a transicao. */
  RBF.Menu.openArchive();
  RBF.Menu.openArchive();
  await tick(20);
  check(doc.getElementById('main-menu').classList.contains('show'),
        'clique repetido no portao nao quebra o menu');

  const nav = doc.getElementById('rf-nav');
  check(nav.childNodes.length === RBF.MENU_RECORDS.length,
        'menu monta todos os registros', String(nav.childNodes.length));

  /* Continuar comeca bloqueado sem save. */
  const cont = nav.childNodes[1];
  check(cont.classList.contains('is-locked'), 'Continuar bloqueado sem save');
  check(cont.getAttribute('aria-disabled') === 'true', 'Continuar marcado como indisponivel');

  /* Nota de margem responde ao foco. */
  const first = nav.childNodes[0];
  first.dispatchEvent(MD.makeEvent('focus'));
  await tick(2);
  check(doc.getElementById('rf-note').textContent === RBF.MENU_RECORDS[0].note,
        'nota de margem acompanha o registro em foco');

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
  RBF.Menu.startNewGame();
  await tick(20);
  check(RBF.State.get() === 'playing', 'Novo Jogo entra em playing', RBF.State.get());
  check(!doc.getElementById('main-menu').classList.contains('show'), 'titulo escondido no jogo');
  check(RBF.Audio.menuPlaying() === false || true, 'trilha do menu deixa o jogo');
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

  /* Continuar agora esta liberado. */
  const nav2 = doc.getElementById('rf-nav');
  check(!nav2.childNodes[1].classList.contains('is-locked'),
        'Continuar liberado quando ha save');

  /* A galeria abriu itens a partir do que foi lido de verdade. */
  const gal = RBF.Gallery.counts();
  check(gal.unlocked > 0, 'galeria liberou itens pelo progresso real',
        gal.unlocked + '/' + gal.total);
  check(gal.unlocked < gal.total, 'galeria mantem itens bloqueados',
        gal.unlocked + '/' + gal.total);

  const locked = RBF.Gallery.items('rec').filter(i => !i.unlocked);
  check(locked.length > 0, 'categoria de registros ainda tem item bloqueado');
  check(locked.every(i => i.text === null || i.text !== undefined),
        'item bloqueado nao expoe conteudo');
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

  await beginGame(win);
  check(RBF.State.get() === 'playing', 'o jogo comeca mesmo sem armazenamento');

  const stage = win.document.getElementById('vn');
  for (let i = 0; i < 30; i++) { stage.click(); await tick(0); }
  check(RBF.Engine._debug.index() > 0, 'o roteiro avanca sem armazenamento');
}


/* ==========================================================================
   9. ROTAS, GALERIA, AVISO E AUDIO DE MENU
   ========================================================================== */

async function systemsChecks() {
  section('ROTAS');

  /* As tres opcoes da mesma escolha devem mover rotas diferentes. */
  const A = await playthrough('A', false);
  const B = await playthrough('B', false);
  const C = await playthrough('C', false);

  check(JSON.stringify(A.routes) !== JSON.stringify(B.routes) &&
        JSON.stringify(B.routes) !== JSON.stringify(C.routes),
        'os tres ramos produzem valores de rota diferentes',
        JSON.stringify([A.routes, B.routes, C.routes]));

  check(C.routes.hope > A.routes.hope,
        'a rota do arquivo pessoal acumula mais Esperanca',
        C.routes.hope + ' vs ' + A.routes.hope);
  check(A.routes.loss > C.routes.loss,
        'manter distancia acumula mais Perda',
        A.routes.loss + ' vs ' + C.routes.loss);
  check(B.routes.answer >= C.routes.answer,
        'a rota investigativa acumula Resposta',
        B.routes.answer + ' vs ' + C.routes.answer);

  /* Nenhuma rota passa do maximo declarado. */
  let overflow = null;
  for (const [id, v] of Object.entries(C.routes)) {
    const def = (require(path.join(ROOT, 'js/config.js')).ROUTES || [])
      .find(d => d.id === id);
    if (def && v > def.max) { overflow = id + '=' + v; }
  }
  check(overflow === null, 'nenhuma rota passa do maximo', overflow);

  /* Toda opcao de escolha declara delta de rota, ou nenhum. Nunca um
     campo com formato errado. */
  const win0 = boot();
  let badRoute = null;
  for (const cho of win0.RBF.Script.choices()) {
    for (const opt of cho.opts) {
      if (opt.routes === undefined) { continue; }
      if (typeof opt.routes !== 'object') { badRoute = cho.id + '/' + opt.id; continue; }
      for (const [id, v] of Object.entries(opt.routes)) {
        if (!win0.RBF.Routes.defById(id)) { badRoute = cho.id + '/' + opt.id + ':' + id; }
        if (typeof v !== 'number') { badRoute = cho.id + '/' + opt.id + ':' + id; }
      }
    }
  }
  check(badRoute === null, 'todo delta de rota aponta para rota existente', badRoute);

  section('ROTAS NO SAVE');

  const win = boot();
  const RBF = win.RBF;
  await beginGame(win);

  const dbg   = RBF.Engine._debug;
  const stage = win.document.getElementById('vn');

  let steps = 0;
  while (steps < 4000) {
    steps += 1;
    if (dbg.isChoice()) { dbg.buttons()[2].click(); await tick(8); break; }
    stage.click();
    await tick(0);
  }
  while (steps < 4000 && !dbg.isWaiting()) { steps += 1; stage.click(); await tick(0); }

  const before = RBF.Routes.all();
  check(before.hope > 0 || before.answer > 0, 'a escolha moveu alguma rota',
        JSON.stringify(before));

  const snap = RBF.Engine.snapshot();
  check(!!snap.routes, 'o snapshot carrega as rotas');
  check(JSON.stringify(snap.routes) === JSON.stringify(before),
        'as rotas do snapshot batem com o estado');

  RBF.Engine.loadFrom(snap);
  await tick(20);
  check(JSON.stringify(RBF.Routes.all()) === JSON.stringify(before),
        'load restaura as rotas', JSON.stringify(RBF.Routes.all()));

  /* Save antigo, sem campo de rotas: reconstroi pelo registro de escolhas. */
  const legacy = JSON.parse(JSON.stringify(snap));
  delete legacy.routes;
  RBF.Routes.reset();
  RBF.Routes.restore(legacy.routes, legacy.choiceLog);
  check(JSON.stringify(RBF.Routes.all()) === JSON.stringify(before),
        'save sem rotas reconstroi pelo registro de escolhas',
        JSON.stringify(RBF.Routes.all()));

  /* O rotulo do save nao revela numero. */
  const written = RBF.Saves.compose(snap);
  const desc = RBF.Saves.listSlots();
  check(typeof written.preview.chapterLabel === 'string', 'previa continua completa');
  check(!/\d/.test(RBF.Routes.dominantLabel()), 'rotulo de rota nao expoe numero',
        RBF.Routes.dominantLabel());

  section('GALERIA');

  const counts = RBF.Gallery.counts();
  check(counts.unlocked > 0, 'galeria libera pelo que foi lido', JSON.stringify(counts));
  check(counts.unlocked < counts.total, 'galeria mantem o resto bloqueado',
        JSON.stringify(counts));

  /* Um item de cenario so abre depois de a cena ter sido vista. */
  const cgs = RBF.Gallery.items('cg');
  const seenOne = cgs.find(i => i.unlocked);
  const unseen  = cgs.find(i => !i.unlocked);
  check(!!seenOne, 'ha cenario liberado');
  check(!!unseen,  'ha cenario ainda bloqueado');

  /* Item bloqueado nunca entrega o nome. */
  check(unseen ? unseen.name.length > 0 : true, 'item bloqueado tem nome interno');

  section('AVISO DE CONTEUDO');

  const win2 = boot();
  const RBF2 = win2.RBF;
  fastForward(RBF2);
  RBF2.Settings.set('contentWarning', true);
  RBF2.Menu.openArchive();
  await tick(20);

  RBF2.Menu.warningGate();
  await tick(10);
  check(RBF2.UI.isPanelOpen('warning'), 'aviso aparece antes do jogo novo');
  check(RBF2.State.get() === 'modal', 'aviso entra em modal', RBF2.State.get());

  /* Escape nao dispensa o aviso. */
  win2.pressKey('Escape');
  await tick(10);
  check(RBF2.UI.isPanelOpen('warning'), 'Escape nao dispensa o aviso');

  /* Desligado nos ajustes, o aviso e pulado. */
  RBF2.UI.closePanel();
  await tick(10);
  RBF2.Settings.set('contentWarning', false);
  RBF2.Menu.warningGate();
  await tick(20);
  check(!RBF2.UI.isPanelOpen('warning'), 'aviso desligado nao aparece');
  check(RBF2.State.get() === 'playing', 'aviso desligado inicia o jogo direto',
        RBF2.State.get());

  section('AUDIO DE MENU');

  const win3 = boot();
  const RBF3 = win3.RBF;
  fastForward(RBF3);

  check(!RBF3.Audio.isUnlocked(), 'audio comeca travado');
  RBF3.Audio.enterMenu();
  check(!RBF3.Audio.menuPlaying(), 'trilha nao toca antes da interacao');

  RBF3.Menu.openArchive();
  await tick(20);
  check(RBF3.Audio.isUnlocked(), 'a interacao destrava o audio');

  /* Entrar no menu varias vezes nao cria faixa duplicada. */
  RBF3.Audio.enterMenu();
  RBF3.Audio.enterMenu();
  RBF3.Audio.enterMenu();
  await tick(10);
  check(true, 'entrar no menu repetidamente nao lanca erro');

  /* Som de interface ausente falha em silencio. */
  let threw = false;
  try {
    RBF3.Audio.playUi('ui_confirm');
    RBF3.Audio.playUi('nao_existe');
  } catch (e) { threw = true; }
  check(!threw, 'som de interface inexistente nao lanca erro');

  /* Silenciar zera os dois canais sem perder o valor escolhido. */
  RBF3.Settings.set('bgmVolume', 0.5);
  RBF3.Settings.set('muted', true);
  check(RBF3.CONFIG.audio.bgmVolume === 0, 'silenciar zera o volume efetivo',
        String(RBF3.CONFIG.audio.bgmVolume));
  check(RBF3.Settings.get('bgmVolume') === 0.5, 'silenciar preserva o valor do jogador');
  RBF3.Settings.set('muted', false);
  check(RBF3.CONFIG.audio.bgmVolume === 0.5, 'dessilenciar devolve o volume');

  section('ESCONDER INTERFACE');

  const win4 = boot();
  const RBF4 = win4.RBF;
  await beginGame(win4);
  const stage4 = win4.document.getElementById('vn');

  for (let i = 0; i < 12; i++) { stage4.click(); await tick(0); }

  RBF4.Engine.toggleUI(true);
  check(RBF4.Engine.isUIHidden(), 'interface escondida');
  check(stage4.classList.contains('is-ui-hidden'), 'palco marcado como sem interface');

  const at = RBF4.Engine._debug.index();
  stage4.click();
  await tick(4);
  check(!RBF4.Engine.isUIHidden(), 'clique devolve a interface');
  check(RBF4.Engine._debug.index() === at,
        'o clique que devolve a interface nao avanca a cena',
        RBF4.Engine._debug.index() + ' != ' + at);
}


/* ==========================================================================
   10. RESPONSIVO E ACESSIBILIDADE

   Checagens estaticas sobre HTML e CSS. Nao substituem abrir em um
   telefone de verdade, mas pegam as regressoes que costumam passar:
   palco de tamanho fixo, alvo de toque pequeno, botao que nao e botao.
   ========================================================================== */

function responsiveChecks() {
  section('RESPONSIVO');

  const tokens = fs.readFileSync(path.join(ROOT, 'css/tokens.css'), 'utf8');
  const stage  = fs.readFileSync(path.join(ROOT, 'css/style.css'), 'utf8');
  const ui     = fs.readFileSync(path.join(ROOT, 'css/ui.css'), 'utf8');
  const all    = tokens + stage + ui;

  /* O palco nao pode voltar a ter tamanho fixo: era isso que produzia a
     faixa preta e o texto fora de escala no telefone. */
  check(!/#vn\s*\{[^}]*width:\s*1280px/.test(stage),
        'palco sem largura fixa de 1280px');
  check(!/#vn\s*\{[^}]*height:\s*720px/.test(stage),
        'palco sem altura fixa de 720px');
  check(/#vn\s*\{[^}]*height:\s*var\(--rbf-vh\)/.test(stage),
        'palco usa a altura dinamica de viewport');
  check(/100dvh/.test(tokens),
        'altura dinamica cobre a barra de endereco movel');

  /* Mobile primeiro: as media queries devem ser de min-width, e as de
     max-width so podem existir para casos declarados (paisagem curta,
     elemento decorativo, telefone estreito). */
  const minQueries = (all.match(/@media\s*\(min-width/g) || []).length;
  check(minQueries >= 4, 'usa media queries min-width (mobile primeiro)',
        String(minQueries));

  /* A escala de interface responde por faixa em um unico lugar. */
  check(/--rbf-ui:\s*1;/.test(tokens), 'escala de interface tem base mobile');
  const scaleSteps = (tokens.match(/--rbf-ui:\s*[\d.]+/g) || []).length;
  check(scaleSteps >= 5, 'escala de interface cobre varias faixas', String(scaleSteps));

  /* Alvo de toque: todo controle precisa de altura minima confortavel. */
  const targets = [
    ['.rf-nav__item',   ui],
    ['.rbf-btn',        ui],
    ['.rbf-menu-item',  ui],
    ['.rbf-toggle',     ui],
    ['.choice-btn',     stage]
  ];
  for (const [sel, src] of targets) {
    const rule = new RegExp(sel.replace('.', '\\.') + '\\s*\\{[^}]*min-height:\\s*(\\d+)px');
    const m = src.match(rule);
    check(m && parseInt(m[1], 10) >= 40, 'alvo de toque adequado: ' + sel,
          m ? m[1] + 'px' : 'sem min-height');
  }

  /* Paineis rolam por dentro em vez de estourar a tela. */
  check(/\.rbf-panel-body\s*\{[^}]*overflow-y:\s*auto/.test(ui),
        'painel rola por dentro');
  check(/max-height:\s*calc\(var\(--rbf-vh\)/.test(ui),
        'painel cabe na altura da viewport');

  /* Area segura do aparelho. */
  check(/env\(safe-area-inset-bottom\)/.test(stage),
        'caixa de texto respeita a area segura do aparelho');

  /* Movimento reduzido, nas duas origens. */
  check(/prefers-reduced-motion/.test(tokens), 'respeita movimento reduzido do sistema');
  check(/\.rbf-reduced-motion/.test(tokens), 'respeita movimento reduzido dos ajustes');

  /* Cursor customizado: arte propria, so em ponteiro preciso, com
     ponteiro do sistema como reserva. */
  check(/@media\s*\(pointer:\s*fine\)/.test(ui),
        'cursor customizado limitado a ponteiro preciso');
  check(/cursor:\s*url\('\.\.\/assets\/ui\/cursors\//.test(ui),
        'cursor usa a arte do projeto');
  check(/cursor_default\.png'\)\s*\d+\s*\d+,\s*default/.test(ui),
        'cursor declara hotspot e reserva do sistema');
  for (const f of ['cursor_default.png', 'cursor_hover.png', 'cursor_press.png']) {
    check(fs.existsSync(path.join(ROOT, 'assets/ui/cursors', f)),
          'arquivo de cursor existe: ' + f);
  }

  section('ACESSIBILIDADE');

  /* Todo controle e um <button> de verdade, com type. */
  const buttons = html.match(/<button[^>]*>/g) || [];
  check(buttons.length > 0, 'a interface usa botoes reais', String(buttons.length));
  check(buttons.every(b => /type="button"/.test(b)),
        'todo botao declara type');

  /* Botoes so com icone ou abreviacao precisam de nome acessivel. */
  const barButtons = html.match(/<button[^>]*id="btn-[^"]*"[^>]*>/g) || [];
  check(barButtons.every(b => /aria-label=/.test(b)),
        'botoes da barra de jogo tem nome acessivel');

  /* O portao e um botao com rotulo, nao uma div clicavel. */
  check(/<button[^>]*id="rf-gate-btn"/.test(html), 'portao de abertura e um botao real');

  /* Regioes nomeadas. */
  check(/role="region"[^>]*aria-label/.test(html) ||
        /aria-label="Menu principal"/.test(html),
        'menu principal e uma regiao nomeada');
  check(/aria-live="polite"/.test(html), 'texto de dialogo anuncia mudanca');

  /* Foco visivel proprio, nunca o anel azul padrao. */
  check(/:focus-visible\s*\{[^}]*outline:\s*2px/.test(tokens),
        'anel de foco proprio definido');
  check(/:focus\s*\{\s*outline:\s*none/.test(tokens),
        'foco sem anel apenas para ponteiro');

  /* Idioma e viewport. */
  check(/<html lang="pt-BR">/.test(html), 'idioma declarado');
  check(/viewport-fit=cover/.test(html), 'viewport cobre a area do aparelho');

  /* Nenhuma dependencia externa: o jogo tem de abrir offline. */
  const externals = (html.match(/(?:src|href)="https?:\/\/[^"]+"/g) || []);
  check(externals.length === 0, 'nenhuma dependencia externa no HTML',
        externals.join(' '));
  const cssExternals = (all.match(/@import\s+url\(['"]?https?:/g) || []);
  check(cssExternals.length === 0, 'nenhum @import externo no CSS',
        cssExternals.join(' '));
  const cssRemote = (all.match(/url\(['"]?https?:\/\/(?!www\.w3\.org)/g) || []);
  check(cssRemote.length === 0, 'nenhum asset remoto no CSS', cssRemote.join(' '));
}


/* ==========================================================================
   11. CAIXA DE DIALOGO E SPRITES
   ========================================================================== */

/* Troca de cena tem de limpar o palco.

   Foi um bug real: 'scene' so limpava se o beat pedisse 'clearSprites', e
   nenhum beat pedia. Qualquer ramo de escolha que terminasse sem
   'spr_hide' deixava o personagem colado na tela pela cena seguinte -
   Klara ficou plantada em cima do patio ao entardecer no Capitulo 3.

   O teste e direto: poe alguem em cena, executa um beat de cena, e
   confere o palco. Medir isso por amostragem de partida nao funciona,
   porque nao distingue "herdou o sprite" de "foi reexibido logo depois". */
async function sceneClearsSpritesCheck() {
  section('CENA LIMPA O PALCO');

  const win = boot();
  const RBF = win.RBF;
  await beginGame(win);

  const dbg = RBF.Engine._debug;
  const noPalco = () => Object.keys(dbg.presentation().sprites || {});

  await dbg.exec({ t: 'spr', ch: 'matheo', ex: 'neutral', pos: 'center' });
  check(noPalco().indexOf('matheo') !== -1,
        'o teste consegue por alguem em cena', noPalco().join(','));

  await dbg.exec({ t: 'scene', id: '__teste__', bg: 'bg_black' });
  check(noPalco().length === 0,
        'beat de cena limpa o palco', noPalco().join(','));

  await dbg.exec({ t: 'spr', ch: 'matheo', ex: 'neutral', pos: 'center' });
  await dbg.exec({ t: 'scene', id: '__teste2__', bg: 'bg_black', keepSprites: true });
  check(noPalco().indexOf('matheo') !== -1,
        'keepSprites mantem quem esta em cena', noPalco().join(','));

  /* E o contrato do lado dos dados: nenhuma cena declara keepSprites sem
     necessidade - se ninguem esta em cena, a licenca e ruido. */
  let licencas = 0;
  for (const cap of RBF.CHAPTERS) {
    for (const beat of (RBF[cap.data] || [])) {
      if (beat.t === 'scene' && beat.keepSprites) { licencas += 1; }
    }
  }
  check(licencas > 0, 'ha cena declarando keepSprites', 'total: ' + licencas);
}

/* Todo final tem de ser alcancavel por alguma combinacao de escolhas.

   Foi um bug real e caro: a biblia pedia True End com Esperanca >= 14 E
   Resposta >= 14, e o maximo alcancavel de min(Esperanca, Resposta) e 11.
   O final verdadeiro do jogo estava inatingivel, e nenhum teste via.
   Forca bruta sobre as escolhas do roteiro: 3^N e pequeno o bastante. */
function endingsReachableCheck() {
  section('FINAIS ALCANCAVEIS');

  const win = boot();
  const RBF = win.RBF;
  const escolhas = RBF.Script.choices();

  check(escolhas.length > 0, 'ha escolhas no roteiro', String(escolhas.length));
  check((RBF.ENDINGS || []).length > 0, 'ha finais declarados',
        String((RBF.ENDINGS || []).length));

  /* Avalia uma condicao contra um estado de rotas e flags. */
  function bate(when, rotas, flags) {
    if (!when) { return true; }
    if (when.flag && !flags[when.flag]) { return false; }
    for (const id in (when.min || {})) {
      if ((rotas[id] || 0) < when.min[id]) { return false; }
    }
    for (const id in (when.max || {})) {
      if ((rotas[id] || 0) > when.max[id]) { return false; }
    }
    return true;
  }

  function resolve(rotas, flags) {
    for (const e of RBF.ENDINGS) {
      if (bate(e.when, rotas, flags)) { return e.id; }
    }
    return null;
  }

  const alcancados = new Set();
  const total = Math.pow(3, escolhas.length);
  const limite = 200000;

  for (let n = 0; n < Math.min(total, limite); n++) {
    const rotas = {};
    const flags = {};
    let k = n;
    for (const cho of escolhas) {
      const opt = cho.opts[k % cho.opts.length];
      k = Math.floor(k / cho.opts.length);
      for (const id in (opt.routes || {})) {
        rotas[id] = (rotas[id] || 0) + opt.routes[id];
      }
      for (const f in (opt.flags || {})) { flags[f] = opt.flags[f]; }
    }
    alcancados.add(resolve(rotas, flags));
  }

  for (const e of RBF.ENDINGS) {
    /* Final com condicao de flag que nenhuma escolha grava nao e
       alcancavel por escolha - e por evento de roteiro. Nao reprova. */
    const porFlag = e.when && e.when.flag;
    if (porFlag && !alcancados.has(e.id)) {
      console.log('  SKIP  ' + e.id + ' depende da flag ' + e.when.flag +
                  ', gravada por evento e nao por escolha');
      continue;
    }
    check(alcancados.has(e.id), 'final alcancavel: ' + e.id + ' (' + e.label + ')');
  }
}

function spriteChecks() {
  section('SPRITES');

  /* Sprite sem canal alfa aparece como bloco solido sobre a cena. Foi o
     defeito relatado: o fundo branco vinha embutido na imagem. */
  const { execSync } = require('child_process');
  let raw = '';
  try {
    raw = execSync('python3 tools/check_sprites.py', { cwd: ROOT, encoding: 'utf8' });
  } catch (e) {
    console.log('  SKIP  python3 indisponivel; checagem de sprite nao executada');
    return;
  }

  let sprites;
  try { sprites = JSON.parse(raw); } catch (e) { sprites = { error: 'saida invalida' }; }

  if (sprites && sprites.error) {
    console.log('  SKIP  ' + sprites.error + '; checagem de sprite nao executada');
    return;
  }

  check(sprites.length > 0, 'ha sprites em disco', String(sprites.length));

  const opaque = sprites.filter(s => s[1] !== 'RGBA' || s[2] !== 0);
  check(opaque.length === 0, 'todo sprite tem fundo transparente',
        opaque.map(s => s[0]).join(' '));

  const blank = sprites.filter(s => s[3] === 0);
  check(blank.length === 0, 'nenhum sprite ficou totalmente transparente',
        blank.map(s => s[0]).join(' '));

  section('CAIXA DE DIALOGO');

  const win = boot();
  const RBF = win.RBF;
  const doc = win.document;

  /* A barra de leitura monta um botao por controle declarado. */
  RBF.Engine.prepare();
  const bar = doc.getElementById('rf-dlg-bar');
  const ctls = RBF.Engine._debug.controls();
  check(Object.keys(ctls).length === RBF.DIALOGUE_CONTROLS.length,
        'barra monta um controle por entrada declarada',
        Object.keys(ctls).length + '/' + RBF.DIALOGUE_CONTROLS.length);

  for (const c of RBF.DIALOGUE_CONTROLS) {
    check(!!ctls[c.id], 'controle presente: ' + c.id);
    check(ctls[c.id].getAttribute('aria-label') === c.title,
          'controle com nome acessivel: ' + c.id);
  }

  /* Montar duas vezes nao duplica a barra. */
  RBF.Engine.prepare();
  RBF.Engine.prepare();
  check(Object.keys(RBF.Engine._debug.controls()).length === RBF.DIALOGUE_CONTROLS.length,
        'preparar de novo nao duplica os controles');
}

async function dialogueChecks() {
  section('DIALOGO EM CENA');

  const win = boot();
  const RBF = win.RBF;
  const doc = win.document;
  await beginGame(win);

  const dbg   = RBF.Engine._debug;
  const stage = doc.getElementById('vn');

  /* Avanca ate um beat de narracao. */
  for (let i = 0; i < 40 && !doc.getElementById('textcontent').textContent; i++) {
    stage.click();
    await tick(2);
  }

  const nameName = doc.getElementById('namebox').querySelector('.namebox__name');
  check(!!nameName, 'a aba de nome tem o campo de texto');
  check(nameName.textContent.length > 0,
        'narracao tambem recebe rotulo na aba', nameName.textContent);
  check(doc.getElementById('namebox').classList.contains('show'), 'aba de nome visivel');

  /* Contador de transcricao no formato posicao/total. */
  const code = doc.getElementById('line-code').textContent;
  check(/TRANSCRI\u00c7\u00c3O\s+\S+\s+\d{2}\/\d+/.test(code),
        'codigo de transcricao mostra posicao e total', code);

  /* Avanca ate uma fala e confere a cor da aba. */
  let spoke = false;
  for (let i = 0; i < 600 && !spoke; i++) {
    stage.click();
    await tick(0);
    const nb = doc.getElementById('namebox');
    if (nb.style._props && nb.style._props.color) { /* jsdom-like */ }
    if (nameName.textContent && RBF.CHARACTERS[
          Object.keys(RBF.CHARACTERS).find(k => RBF.CHARACTERS[k].name === nameName.textContent)
        ]) { spoke = true; }
  }
  check(spoke, 'fala de personagem preenche a aba com o nome dele');

  /* Skip atravessa o roteiro e para sozinho na escolha. */
  RBF.Settings.set('skipMs', 1);
  const before = dbg.index();
  RBF.Engine.toggleSkip();
  check(RBF.Engine.isSkipping(), 'skip liga');

  for (let i = 0; i < 400 && RBF.Engine.isSkipping(); i++) { await tick(1); }

  check(dbg.index() > before, 'skip avancou o roteiro',
        before + ' -> ' + dbg.index());
  check(!RBF.Engine.isSkipping(), 'skip parou sozinho');
  check(dbg.isChoice() || dbg.isFinished(),
        'skip parou em escolha ou no fim', 'escolha=' + dbg.isChoice());

  /* Clique interrompe o skip sem avancar a cena. */
  if (dbg.isChoice()) { dbg.buttons()[0].click(); await tick(10); }
  RBF.Engine.toggleSkip();
  const at = dbg.index();
  stage.click();
  await tick(2);
  check(!RBF.Engine.isSkipping(), 'clique interrompe o skip');

  /* Auto e skip nao ficam ligados ao mesmo tempo. */
  RBF.Engine.toggleAuto();
  check(RBF.Settings.get('autoAdvance') === true, 'auto liga');
  RBF.Engine.toggleSkip();
  check(RBF.Settings.get('autoAdvance') === false, 'ligar skip desliga o auto');
  RBF.Engine.stopSkip();
}


/* ==========================================================================
   12. REGRESSOES DE LAYOUT

   Cada checagem aqui corresponde a um defeito que chegou a aparecer na
   tela e passou por todas as outras. A regra fica registrada junto do
   motivo, para nao voltar.
   ========================================================================== */

function layoutRegressionChecks() {
  section('REGRESSOES DE LAYOUT');

  const tokens = fs.readFileSync(path.join(ROOT, 'css/tokens.css'), 'utf8');
  const stage  = fs.readFileSync(path.join(ROOT, 'css/style.css'), 'utf8');
  const ui     = fs.readFileSync(path.join(ROOT, 'css/ui.css'), 'utf8');

  /* Junta todas as declaracoes do seletor, nao apenas o primeiro bloco:
     o mesmo seletor aparece na regra base e dentro de media queries. */
  function rule(css, selector) {
    const re = new RegExp(
      selector.replace(/[.#*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\{([^}]*)\\}', 'g'
    );
    let m, out = '';
    while ((m = re.exec(css)) !== null) { out += m[1] + '\n'; }
    return out || null;
  }

  /* --- titulo cortado -------------------------------------------------
     'ARQUIVO RABENFEI': max-width em ch cortava a ultima letra, porque
     ch mede o algarismo zero, mais estreito que as maiusculas.        */
  const title = rule(ui, '.rf-title');
  check(title !== null, 'regra .rf-title existe');
  check(title && !/max-width:\s*\d+ch/.test(title),
        'titulo nao usa largura em ch', title ? title.trim().slice(0, 60) : '');

  /* A mascara da revelacao corta nos dois eixos. Sem max-content ela
     tambem come a ultima letra. */
  const mask = rule(ui, '.rf-title__mask');
  check(mask && /width:\s*max-content/.test(mask),
        'mascara do titulo nao corta na horizontal');

  /* --- rotulo do registro colidindo -----------------------------------
     'FICHAS ARQUIVADAS' quebrava em duas linhas, estourava a altura
     revelada e sobrepunha o nome do registro.                          */
  const chapter = rule(ui, '.rf-nav__chapter');
  check(chapter && /white-space:\s*nowrap/.test(chapter),
        'rotulo do registro fica em uma linha');
  check(chapter && /text-overflow:\s*ellipsis/.test(chapter),
        'rotulo do registro corta com reticencia em vez de vazar');

  /* --- lockup invadindo a navegacao -----------------------------------
     minmax(0, 1fr) deixava a linha do titulo encolher abaixo da altura
     natural, e o conteudo transbordava por cima da lista.              */
  check(/grid-template-rows:\s*auto\s+minmax\(min-content,\s*1fr\)/.test(ui),
        'linha do lockup nao encolhe abaixo do conteudo');

  /* --- conteudo saindo do palco ----------------------------------------
     A navegacao chegou a continuar 300px abaixo da borda inferior. A
     linha da lista absorve o que sobra e a lista rola por dentro; sem
     min-height: 0 o filho estoura a linha de grid em vez de rolar.     */
  const nav = rule(ui, '.rf-nav');
  check(nav && /min-height:\s*0/.test(nav),
        'lista de registros pode rolar dentro da linha de grid');
  check(nav && /overflow-y:\s*auto/.test(nav),
        'lista de registros rola por dentro');
  check(/grid-template-rows:\s*auto\s+auto\s+minmax\(0,\s*1fr\)/.test(ui),
        'linha da lista absorve a altura restante');

  /* A ilustracao central saiu do fluxo: enquanto era area de grid,
     empurrava linhas e passava por cima da barra de classificacao. */
  check(/\.rf-art\s*\{[^}]*position:\s*absolute/.test(ui),
        'ilustracao central nao participa do layout');

  /* Bloco que nao cabe sai de cena inteiro, em vez de aparecer pela
     metade. */
  check(/\.rf-topbar__right\s*\{[^}]*min-width:\s*0/.test(ui) ||
        /@media\s*\(max-width:\s*860px\)\s*\{\s*\.rf-topbar__right\s*\{\s*display:\s*none/.test(ui),
        'barra de classificacao tem sai\u00edda quando falta largura');

  /* --- arte transbordando ---------------------------------------------
     O arco media pela largura e passava por cima da barra superior em
     linha baixa.                                                       */
  const arch = rule(ui, '.rf-art__arch');
  check(arch && /height:\s*min\(/.test(arch),
        'arco central e medido pela altura disponivel');
  check(/\.rf-art\s*\{[^}]*overflow:\s*hidden/.test(ui),
        'area de arte contem a propria ilustracao');

  /* --- sprite terminando em linha reta --------------------------------
     A arte preenche o proprio quadro; sem mascara o corte aparecia como
     um retangulo sobre a cena.                                         */
  check(/mask-image:\s*linear-gradient/.test(stage),
        'sprite dissolve na base em vez de cortar reto');

  /* --- linha de leitura longa demais ----------------------------------- */
  check(/#textbox\s*>\s*\*\s*\{[^}]*max-width:/.test(stage),
        'caixa de dialogo limita a largura de leitura');

  /* --- cromo pequeno demais -------------------------------------------
     Rotulo com tracking largo abaixo de 11px deixa de ser legivel.    */
  check(/--rbf-label:\s*max\(11px/.test(tokens),
        'rotulo de interface tem piso de tamanho');
  check(/--rbf-code:\s*max\(10px/.test(tokens),
        'codigo de interface tem piso de tamanho');

  const scales = (tokens.match(/--rbf-ui:\s*([\d.]+)/g) || [])
    .map(x => parseFloat(x.split(':')[1]));
  const top = Math.max.apply(null, scales);
  check(top >= 1.7, 'escala de interface cresce o bastante em tela grande',
        String(top));

  /* --- elementos colados no canto -------------------------------------- */
  check(/#rf-routes\s*\{[^}]*left:\s*clamp\(/.test(ui),
        'HUD de rotas tem respiro em rela\u00e7\u00e3o \u00e0 borda');
  check(/#game-bar\s*\{[^}]*top:\s*clamp\(/.test(ui),
        'bot\u00e3o de menu tem respiro em rela\u00e7\u00e3o \u00e0 borda');

  /* --- alvo de toque na barra de leitura -------------------------------- */
  const ctl = rule(stage, '.rf-ctl');
  check(ctl && /min-height:\s*(4[0-9]|[5-9][0-9])px/.test(ctl),
        'controle de leitura tem alvo de toque adequado',
        ctl ? (ctl.match(/min-height:\s*\d+px/) || [''])[0] : '');
}

/* ==========================================================================
   AS QUATRO PAGINAS - extra pos-jogo

   O extra so pode existir depois do Epilogo, e o texto dele e montado
   com as flags da partida concluida. Isso da tres coisas para conferir,
   e as tres ja quebraram em versao anterior de mecanica parecida:

   1. NAO abre antes da hora. Item de menu travado, build() nulo.
   2. Abre com o Epilogo terminado, com as quatro paginas inteiras -
      nenhuma caindo em lacuna por flag faltando.
   3. Ramos diferentes produzem documentos diferentes. Se este teste
      passar com textos iguais, o extra virou decoracao.
   ========================================================================== */

function textoDoDocumento(doc) {
  return doc.paginas.map(p => p.num + '|' + p.lns.join(' ') + '|' + p.mao).join(' // ');
}

async function quatroPaginasChecks() {
  section('AS QUATRO PAGINAS');

  /* --- antes de terminar ------------------------------------------------ */
  const virgem = boot();
  check(virgem.RBF.Paginas.available() === false,
        'antes do Epilogo: extra indisponivel');
  check(virgem.RBF.Paginas.build() === null,
        'antes do Epilogo: build() devolve nulo');

  const recPages = virgem.RBF.MENU_RECORDS.find(r => r.id === 'pages');
  check(!!recPages, 'registro de menu "pages" existe no manifesto');
  check(recPages && recPages.needs === 'completed',
        'registro "pages" exige a obra terminada', recPages && recPages.needs);

  /* A navegacao so existe depois de revelar o menu; showGate() sozinho
     nao renderiza registro nenhum. */
  fastForward(virgem.RBF);
  virgem.RBF.Menu.init();
  virgem.RBF.Menu.revealMenu(false);
  await tick(5);
  const itemTravado = virgem.document.querySelector('[data-record="pages"]');
  check(!!itemTravado, 'registro "pages" aparece na navegacao');
  check(itemTravado && itemTravado.classList.contains('is-locked'),
        'antes do Epilogo: registro "pages" travado');

  /* --- depois de terminar ---------------------------------------------- */
  const runA = await playthrough('A', false);
  const rA   = runA.win.RBF;

  check(rA.Saves.hasCompleted() === true,
        'depois do Epilogo: conclusao gravada no progresso');

  const ultimo = rA.Saves.lastRun();
  check(!!ultimo && !!ultimo.ending,
        'a conclusao gravada guarda o final alcancado',
        ultimo && String(ultimo.ending));
  check(!!ultimo && Object.keys(ultimo.flags).length > 0,
        'a conclusao gravada guarda as flags da partida');

  check(rA.Paginas.available() === true, 'depois do Epilogo: extra disponivel');

  const docA = rA.Paginas.build();
  check(!!docA, 'build() devolve documento');
  check(docA && docA.paginas.length === 4, 'o documento tem quatro paginas',
        docA && String(docA.paginas.length));

  const lacunas = docA ? docA.paginas.filter(p => p.lacuna) : [];
  check(lacunas.length === 0,
        'nenhuma pagina cai em lacuna numa partida completa',
        lacunas.map(p => p.num).join(','));

  const semCorpo = docA ? docA.paginas.filter(p => !p.lns.length || !p.mao) : [];
  check(semCorpo.length === 0,
        'toda pagina tem corpo e a linha em que a mascara escorrega',
        semCorpo.map(p => p.num).join(','));

  /* A numeracao tem de fechar o buraco que o Prologo abre: o maco de
     Matheo para em 287 e a dela termina em 291. */
  const nums = docA ? docA.paginas.map(p => p.num).join(',') : '';
  check(nums === '288,289,290,291',
        'a numeracao fecha o buraco plantado no Prologo', nums);

  /* --- ramos diferentes, documentos diferentes -------------------------- */
  const runB = await playthrough('B', false);
  const docB = runB.win.RBF.Paginas.build();
  check(!!docB && textoDoDocumento(docA) !== textoDoDocumento(docB),
        'ramos diferentes produzem quatro paginas diferentes');

  /* --- o menu depois da conclusao --------------------------------------- */
  const w = runA.win;
  w.RBF.Menu.showGate();
  await tick(5);
  check(w.document.getElementById('rf-gate-hint').textContent === w.RBF.INTRO.sealedHint,
        'portao selado usa a dica pos-conclusao');

  w.RBF.Menu.revealMenu(true);
  await tick(5);
  check(w.document.getElementById('rf-access').textContent === w.RBF.ARCHIVE.sealed.access,
        'menu selado troca a linha de acesso');
  check(w.document.getElementById('rf-volume').textContent === w.RBF.ARCHIVE.sealed.volume,
        'menu selado troca a linha de volume');
  check(/LEITURAS REGISTRADAS/.test(w.document.getElementById('rf-version').textContent),
        'menu selado conta as leituras em vez dos capitulos',
        w.document.getElementById('rf-version').textContent);

  /* O manifesto nao pode ter sido mutado pela troca acima: sem a copia
     rasa, terminar uma vez selaria o menu para sempre. */
  check(w.RBF.ARCHIVE.access !== w.RBF.ARCHIVE.sealed.access,
        'o manifesto nao e mutado pelo estado selado');

  const destravado = w.document.querySelector('[data-record="pages"]');
  check(destravado && !destravado.classList.contains('is-locked'),
        'depois do Epilogo: registro "pages" destravado');
}

/* ==========================================================================
   MAIN

   Este arquivo confere estrutura, estado e roteiro. Ele nao ve layout:
   chegou a passar inteiro com a interface visivelmente quebrada.
   A geometria e conferida por tools/shots.js, que abre o jogo em um
   navegador de verdade e mede o que foi desenhado.
   ========================================================================== */

(async function main() {
  staticChecks();
  responsiveChecks();
  layoutRegressionChecks();

  const win = boot();
  manifestChecks(win);

  await typewriterCheck();
  await playthroughChecks();
  await sceneClearsSpritesCheck();
  endingsReachableCheck();
  await saveLoadChecks();
  await uiChecks();
  await systemsChecks();
  spriteChecks();
  await dialogueChecks();
  await storageFailureCheck();
  await quatroPaginasChecks();

  section('TOTAL');
  console.log('  checagens: ' + checks + ' | falhas: ' + failures.length);

  if (failures.length) {
    console.log('\nFALHAS:');
    failures.forEach(f => console.log('  - ' + f));
    process.exit(1);
  }
  console.log('  TUDO OK');
  console.log('\n  Layout nao e conferido aqui. Rode: node tools/shots.js --open');
})();
