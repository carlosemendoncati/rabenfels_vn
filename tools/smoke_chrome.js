#!/usr/bin/env node
/* ==========================================================================
   ARQUIVO RABENFELS - tools/smoke_chrome.js

   Roda tools/smoke.html num Chrome de verdade e imprime o relatorio.

   O caminho documentado do smoke e o Edge headless com --dump-dom. Ele
   parou de devolver saida nesta maquina em 25/08/2026 - zero byte,
   codigo de saida 0, inclusive para o index.html. Nao vale gastar tempo
   depurando o navegador: o harness e o mesmo, e o que muda e quem o
   carrega.

   Serve por http em vez de file:// porque o harness cria elementos e
   pede assets, e file:// impoe restricoes que nao existem no jogo
   servido.

     node tools/smoke_chrome.js
     node tools/smoke_chrome.js --ver       imprime o relatorio inteiro

   Procure SMOKE-OK no fim. Requer playwright e Chrome ou Edge.
   ========================================================================== */
'use strict';

const fs   = require('fs');
const path = require('path');
const http = require('http');

const ROOT = path.resolve(__dirname, '..');
const VER  = process.argv.indexOf('--ver') !== -1;

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.png':  'image/png',
  '.mp3':  'audio/mpeg',
  '.ogg':  'audio/ogg',
  '.wav':  'audio/wav'
};

const BROWSERS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/opt/google/chrome/chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium'
];

function servidor() {
  const srv = http.createServer((req, res) => {
    let rel = decodeURIComponent(req.url.split('?')[0]);
    if (rel === '/') { rel = '/index.html'; }
    const alvo = path.join(ROOT, rel);
    if (!alvo.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
    fs.readFile(alvo, (err, buf) => {
      if (err) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { 'Content-Type':
        TIPOS[path.extname(alvo).toLowerCase()] || 'application/octet-stream' });
      res.end(buf);
    });
  });
  return new Promise(ok => srv.listen(0, '127.0.0.1', () => ok(srv)));
}

async function main() {
  let chromium;
  try { ({ chromium } = require('playwright')); }
  catch (e) { console.log('playwright ausente - nada a fazer.'); return 0; }

  const exe = BROWSERS.find(p => fs.existsSync(p));
  if (!exe) { console.log('nenhum Chrome ou Edge encontrado.'); return 0; }

  const srv = await servidor();
  const url = 'http://127.0.0.1:' + srv.address().port + '/tools/smoke.html';

  const browser = await chromium.launch({ executablePath: exe });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  const erros = [];
  page.on('pageerror', e => erros.push(String(e)));

  await page.goto(url);

  /* O harness roda tres partidas completas. Espera pelo marcador em vez
     de por um relogio: o tempo varia com a maquina. */
  let texto = '';
  try {
    await page.waitForFunction(
      () => /SMOKE-(OK|FALHA)/.test(document.body.innerText),
      null, { timeout: 300000 });
    texto = await page.evaluate(() => document.body.innerText);
  } catch (e) {
    texto = await page.evaluate(() => document.body.innerText);
    console.log('\nSMOKE-FALHA :: o harness nao chegou ao fim em 300s\n');
  }

  await browser.close();
  srv.close();

  const linhas = texto.split('\n').map(l => l.trim()).filter(Boolean);
  if (VER) {
    console.log(linhas.join('\n'));
  } else {
    const falhas = linhas.filter(l => l.indexOf('FALHA') === 0);
    if (falhas.length) { console.log(falhas.join('\n')); }
    console.log(linhas.slice(-3).join('\n'));
  }

  const reais = erros.filter(e => !/favicon/i.test(e));
  if (reais.length) {
    console.log('\nerros de runtime:');
    reais.slice(0, 5).forEach(e => console.log('  ' + e));
  }

  return /SMOKE-OK/.test(texto) && !reais.length ? 0 : 1;
}

main().then(c => process.exit(c)).catch(e => { console.error(e); process.exit(1); });
