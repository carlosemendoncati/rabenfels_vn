#!/usr/bin/env node
/* ==========================================================================
   ARQUIVO RABENFELS - tools/shots.js

   Abre o jogo em um navegador de verdade, em varios tamanhos de tela,
   mede a geometria e grava uma imagem de cada tela.

   Existe porque tools/validate.js nao ve layout. Ele confere estrutura,
   estado e roteiro, e chegou a passar 442 de 442 com a interface
   visivelmente quebrada: navegacao 300px fora do palco, rotulo cortado,
   titulo invadindo a lista. Nada disso aparece sem medir o que o
   navegador desenhou.

   O que e reprovado:
     transbordo   elemento com qualquer borda fora do palco
     corte        texto mais largo do que a caixa que o contem
     sobreposicao lockup por cima da navegacao

   Uso:
     node tools/shots.js              mede e grava as imagens
     node tools/shots.js --no-shots   so mede
     node tools/shots.js --open       tambem grava a cena de jogo

   Requer Chrome ou Chromium e o pacote playwright. Sem eles o script
   avisa e sai com codigo 0: e uma ferramenta de conferencia, nao um
   requisito para o jogo rodar.
   ========================================================================== */
'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT     = path.resolve(__dirname, '..');
const OUT      = path.join(__dirname, '_shots');
const PAGE_URL = 'file://' + path.join(ROOT, 'index.html');

const NO_SHOTS = process.argv.indexOf('--no-shots') !== -1;
const IN_GAME  = process.argv.indexOf('--open') !== -1;

/* Caminhos comuns de instalacao. O primeiro que existir vence. */
const BROWSERS = [
  '/opt/google/chrome/chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
];

const VIEWS = [
  { id: 'phone',     w: 390,  h: 780,  label: 'Telefone retrato' },
  { id: 'phone_sm',  w: 320,  h: 640,  label: 'Telefone estreito' },
  { id: 'phone_land',w: 780,  h: 390,  label: 'Telefone paisagem' },
  { id: 'tablet',    w: 768,  h: 1024, label: 'Tablet retrato' },
  { id: 'tablet_l',  w: 1024, h: 768,  label: 'Tablet paisagem' },
  { id: 'laptop_sm', w: 1366, h: 640,  label: 'Notebook baixo' },
  { id: 'laptop',    w: 1366, h: 768,  label: 'Notebook' },
  { id: 'desktop',   w: 1920, h: 1080, label: 'Monitor' }
];

/* Camadas decorativas de tela cheia: animadas de proposito, contidas
   por overflow do pai. Medir a caixa delas nao diz nada util. */
const DECOR = ['rf-menu-candle', 'rf-menu-bg', 'rf-transition', 'rf-gate-dust'];

let failures = [];
let checks   = 0;

function check(ok, label, detail) {
  checks += 1;
  if (!ok) { failures.push(label + (detail ? ' -> ' + detail : '')); }
  console.log((ok ? '  PASS  ' : '  FAIL  ') + label +
              (ok || !detail ? '' : ' :: ' + detail));
}

function findBrowser() {
  for (const p of BROWSERS) {
    try { if (fs.existsSync(p)) { return p; } } catch (e) { /* segue */ }
  }
  return null;
}

/* Roda dentro da pagina. Devolve a lista de problemas de geometria. */
function measure() {
  const vn  = document.getElementById('vn').getBoundingClientRect();
  const out = { overflow: [], clipped: [], overlap: [] };

  const decor = ['rf-menu-candle', 'rf-menu-bg', 'rf-transition', 'rf-gate-dust'];

  function name(el) {
    return el.id || (typeof el.className === 'string' ? el.className : el.tagName);
  }

  document.querySelectorAll('#vn *').forEach(function (el) {
    if (decor.indexOf(el.id) !== -1) { return; }
    if (el.closest && el.closest('.rf-gate__dust')) { return; }

    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') { return; }
    /* Painel fechado ainda ocupa caixa; nao interessa medir. */
    if (parseFloat(cs.opacity) === 0) { return; }

    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) { return; }

    /* Container que rola de proposito: sair da area visivel dele nao e
       defeito, e o proprio conteudo abaixo da dobra. So interessa o que
       vaza de um container que corta. */
    let scrollable = false;
    let p = el.parentElement;
    while (p && p !== document.body) {
      const pc = getComputedStyle(p);
      if (/(auto|scroll)/.test(pc.overflowY + pc.overflowX)) { scrollable = true; break; }
      p = p.parentElement;
    }
    if (scrollable) { return; }

    if (r.right  > vn.right  + 1 || r.left   < vn.left - 1 ||
        r.bottom > vn.bottom + 1 || r.top    < vn.top  - 1) {
      out.overflow.push(name(el) + ' ' + JSON.stringify({
        l: Math.round(r.left),  t: Math.round(r.top),
        r: Math.round(r.right), b: Math.round(r.bottom)
      }));
    }

    if (el.children.length === 0 && el.textContent.trim() &&
        el.scrollWidth > el.clientWidth + 1) {
      out.clipped.push(name(el) + ' "' + el.textContent.trim().slice(0, 28) + '" ' +
        el.scrollWidth + '>' + el.clientWidth);
    }
  });

  const lock = document.querySelector('.rf-lockup');
  const nav  = document.querySelector('.rf-nav');
  if (lock && nav) {
    const a = lock.getBoundingClientRect();
    const b = nav.getBoundingClientRect();
    if (a.bottom > b.top + 2 && a.left < b.right && b.left < a.right) {
      out.overlap.push('lockup sobre nav: ' + Math.round(a.bottom) + ' > ' + Math.round(b.top));
    }
  }

  return out;
}

async function run() {
  const exe = findBrowser();
  if (!exe) {
    console.log('\nSem Chrome ou Chromium neste ambiente.');
    console.log('Abra tools/preview.html no navegador para conferir na mao.');
    return 0;
  }

  let chromium;
  try {
    chromium = require('playwright').chromium;
  } catch (e) {
    console.log('\nSem o pacote playwright. Instale com:  npm i -D playwright');
    console.log('Ou abra tools/preview.html no navegador para conferir na mao.');
    return 0;
  }

  if (!NO_SHOTS) { fs.mkdirSync(OUT, { recursive: true }); }

  const browser = await chromium.launch({
    executablePath: exe,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files']
  });

  console.log('\n== GEOMETRIA EM NAVEGADOR ==');
  console.log('   ' + exe);

  for (const v of VIEWS) {
    const page = await browser.newPage({ viewport: { width: v.w, height: v.h } });

    const runtime = [];
    page.on('pageerror', e => runtime.push(e.message));
    page.on('console', m => { if (m.type() === 'error') { runtime.push(m.text()); } });

    await page.goto(PAGE_URL);
    await page.waitForTimeout(500);

    /* Abre o arquivo e espera a revelacao assentar. */
    await page.click('#rf-gate-btn');
    await page.waitForTimeout(2300);

    if (!NO_SHOTS) {
      await page.screenshot({ path: path.join(OUT, 'menu_' + v.id + '.png') });
    }

    const menu = await page.evaluate(measure);

    check(runtime.length === 0, v.label + ': sem erro de runtime', runtime.join(' | '));
    check(menu.overflow.length === 0, v.label + ': nada fora do palco', menu.overflow.join(' ;; '));
    check(menu.clipped.length === 0,  v.label + ': nenhum texto cortado', menu.clipped.join(' ;; '));
    check(menu.overlap.length === 0,  v.label + ': sem sobreposicao', menu.overlap.join(' ;; '));

    if (IN_GAME) {
      await page.evaluate(() => {
        RBF.Settings.set('contentWarning', false);
        RBF.Settings.set('typewriter', false);
        RBF.CONFIG.timing.sweepMs = 1;
        RBF.Menu.startNewGame();
      });
      await page.waitForTimeout(1200);

      for (let i = 0; i < 14; i++) {
        await page.click('#vn', { position: { x: v.w / 2, y: v.h * 0.3 } });
        await page.waitForTimeout(90);
      }

      if (!NO_SHOTS) {
        await page.screenshot({ path: path.join(OUT, 'jogo_' + v.id + '.png') });
      }

      const game = await page.evaluate(measure);
      check(game.overflow.length === 0, v.label + ' em cena: nada fora do palco',
            game.overflow.join(' ;; '));
      check(game.clipped.length === 0, v.label + ' em cena: nenhum texto cortado',
            game.clipped.join(' ;; '));
    }

    await page.close();
  }

  await browser.close();

  console.log('\n== TOTAL ==');
  console.log('  checagens: ' + checks + ' | falhas: ' + failures.length);

  if (!NO_SHOTS) {
    console.log('  imagens em ' + path.relative(ROOT, OUT));
  }

  if (failures.length) {
    console.log('\nFALHAS:');
    failures.forEach(f => console.log('  - ' + f));
    return 1;
  }

  console.log('  TUDO OK');
  return 0;
}

run().then(code => process.exit(code)).catch(err => {
  console.error('\nfalha ao rodar a conferencia:', err.message);
  process.exit(1);
});
