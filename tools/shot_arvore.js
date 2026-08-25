#!/usr/bin/env node
/* ==========================================================================
   ARQUIVO RABENFELS - tools/shot_arvore.js

   Abre "A Conta > A Arvore" num navegador de verdade, mede a geometria e
   grava a imagem em quatro tamanhos.

   tools/shots.js nao chega aqui: o painel exige a obra terminada, e a
   partida do shots comeca do zero. Este script semeia o progresso e
   entra direto no painel.

   O que ele mede e a lista mais longa da obra - dez decisoes, trinta
   ramos, quatro finais - e o que quebra nela e sempre a mesma coisa:
   texto que nao cabe na largura de telefone.

   Uso:  node tools/shot_arvore.js
   ========================================================================== */
'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT  = path.join(__dirname, '_shots');
const URL  = 'file://' + path.join(ROOT, 'index.html');

const BROWSERS = [
  '/opt/google/chrome/chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
];

const VIEWS = [
  { id: 'phone_sm', w: 320,  h: 640,  label: 'Telefone estreito' },
  { id: 'phone',    w: 390,  h: 780,  label: 'Telefone retrato' },
  { id: 'tablet',   w: 768,  h: 1024, label: 'Tablet retrato' },
  { id: 'desktop',  w: 1920, h: 1080, label: 'Monitor' }
];

let falhas = 0;
function checa(ok, label, detalhe) {
  console.log((ok ? '  PASS  ' : '  FAIL  ') + label +
              (ok || !detalhe ? '' : ' :: ' + detalhe));
  if (!ok) { falhas += 1; }
}

/* Roda dentro da pagina: so o que o navegador desenhou. */
function medir() {
  const alvo = document.querySelector('.rbf-arv');
  const out  = { existe: !!alvo, cortado: [], transbordo: [], linhas: 0, ramos: 0, finais: 0 };
  if (!alvo) { return out; }

  const caixa = alvo.getBoundingClientRect();
  out.mapa   = alvo.querySelectorAll('.rbf-arv__svg').length;
  out.nos    = alvo.querySelectorAll('.rbf-n').length;
  out.linhas = alvo.querySelectorAll('.rbf-arv__no').length;
  out.ramos  = alvo.querySelectorAll('.rbf-arv__ramo').length;
  out.finais = alvo.querySelectorAll('.rbf-arv__final').length;

  /* className de elemento SVG e um SVGAnimatedString, e nao string. */
  function nome(el) {
    return el.id || el.getAttribute('class') || el.tagName;
  }

  /* Dentro de um container que rola de proposito, sair da area visivel
     nao e defeito: e o proprio conteudo alem da dobra. O mapa vive num
     quadro com overflow-x:auto, e em telefone ele rola de lado. */
  function emQuadroQueRola(el) {
    let p = el.parentElement;
    while (p && p !== document.body) {
      const cs = getComputedStyle(p);
      if (/(auto|scroll)/.test(cs.overflowX + cs.overflowY)) { return true; }
      p = p.parentElement;
    }
    return false;
  }

  alvo.querySelectorAll('*').forEach(function (el) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) { return; }
    if (emQuadroQueRola(el)) { return; }

    /* Texto mais largo do que a caixa que o contem. */
    if (el.children.length === 0 && el.textContent.trim() &&
        el.scrollWidth > el.clientWidth + 1) {
      out.cortado.push(nome(el) + ' "' +
        el.textContent.trim().slice(0, 24) + '" ' + el.scrollWidth + '>' + el.clientWidth);
    }
    /* Qualquer coisa saindo pela lateral do proprio painel. */
    if (r.right > caixa.right + 1 || r.left < caixa.left - 1) {
      out.transbordo.push(nome(el) +
        ' ' + Math.round(r.left) + '..' + Math.round(r.right));
    }
  });
  return out;
}

/* Progresso semeado: obra terminada em 'archive', e dois ramos
   percorridos. O resto fica fechado de proposito - a imagem precisa
   mostrar as duas metades, a aberta e a lacuna. */
function semear() {
  const k = RBF.STORAGE.keys;
  const log = { cap1_aldric: 'B', cap6_ensino: 'A' };
  const run = { ending: 'archive', flags: { taught: 'A' }, routes: { hope: 9, loss: 4, answer: 11 }, choiceLog: log };
  localStorage.setItem(k.progress, JSON.stringify({
    chaptersReached:  RBF.CHAPTERS.map(c => c.id),
    finishedChapters: RBF.CHAPTERS.map(c => c.id),
    totalPlaytime:    7200,
    seen:             ['cho:cap1_aldric:B', 'cho:cap6_ensino:A', 'cho:cap3_borboleta:C'],
    runs:             [run],
    lastRun:          run
  }));
}

async function run() {
  const exe = BROWSERS.find(p => { try { return fs.existsSync(p); } catch (e) { return false; } });
  if (!exe) { console.log('\nSem Chrome neste ambiente.'); return 0; }

  let chromium;
  try { chromium = require('playwright').chromium; }
  catch (e) { console.log('\nSem o pacote playwright.'); return 0; }

  fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch({
    executablePath: exe,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files']
  });

  console.log('\n== A ARVORE EM NAVEGADOR ==');
  console.log('   ' + exe);

  for (const v of VIEWS) {
    const page = await browser.newPage({ viewport: { width: v.w, height: v.h } });
    const erros = [];
    page.on('pageerror', e => erros.push(e.message));
    page.on('console', m => { if (m.type() === 'error') { erros.push(m.text()); } });

    await page.goto(URL);
    await page.waitForTimeout(400);
    await page.evaluate(semear);
    await page.reload();
    await page.waitForTimeout(400);

    await page.click('#rf-gate-btn');
    await page.waitForTimeout(2300);

    await page.evaluate(() => { RBF.Menu.openConta(); });
    await page.waitForTimeout(500);

    /* A terceira aba. Clicar pelo texto, e nao por indice, para o teste
       nao passar em silencio se a ordem das abas mudar. */
    const clicou = await page.evaluate(() => {
      const abas = Array.from(document.querySelectorAll('.rf-conta__aba'));
      const alvo = abas.find(b => /rvore/.test(b.textContent));
      if (!alvo) { return false; }
      alvo.click();
      return true;
    });
    checa(clicou, v.label + ': a aba A Arvore existe e responde ao clique');
    await page.waitForTimeout(400);

    await page.screenshot({ path: path.join(OUT, 'arvore_' + v.id + '.png') });

    const m = await page.evaluate(medir);
    checa(erros.length === 0,        v.label + ': sem erro de runtime', erros.join(' | '));
    checa(m.existe,                  v.label + ': o corpo da arvore montou');
    checa(m.mapa === 1,              v.label + ': o mapa montou', 'tem ' + m.mapa);
    /* 10 do tronco + 30 ramos + o marco + 4 rotulos de rota
       + 11 capitulos de rota + Epilogo + 4 desfechos = 61. */
    checa(m.nos === 61,              v.label + ': tronco, ramos, marco, quatro rotas e quatro desfechos', 'tem ' + m.nos);
    checa(m.linhas === 10,           v.label + ': dez decisoes na tela', 'tem ' + m.linhas);
    checa(m.ramos  === 30,           v.label + ': trinta ramos na tela', 'tem ' + m.ramos);
    checa(m.finais === 4,            v.label + ': quatro desfechos na tela, um por rota', 'tem ' + m.finais);
    checa(m.cortado.length === 0,    v.label + ': nenhum texto cortado', m.cortado.slice(0, 3).join(' ;; '));
    checa(m.transbordo.length === 0, v.label + ': nada fora do painel', m.transbordo.slice(0, 3).join(' ;; '));

    await page.close();
  }

  await browser.close();
  console.log('\nimagens em tools/_shots/arvore_*.png');
  console.log(falhas ? '\n' + falhas + ' FALHA(S)' : '\nTUDO OK');
  return falhas ? 1 : 0;
}

run().then(c => process.exit(c)).catch(e => { console.error(e); process.exit(1); });
