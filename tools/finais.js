#!/usr/bin/env node
/* ==========================================================================
   ARQUIVO RABENFELS - tools/finais.js

   Percorre AS QUATRO ROTAS e escreve o transcript de cada uma.

   Existe porque nenhum outro validador le a cauda: validate.js joga tres
   ramos de escolha e alcanca no maximo tres rotas das quatro. Antes de
   este arquivo existir, cinco desfechos ficaram sem uma linha de
   Capitulo 11 e de Epilogo por uma producao inteira, e nada acusou.

   O que ele confere:

     - cada rota alcanca todos os capitulos declarados em RBF.ROTAS
     - nenhum capitulo de rota vaza para outra rota
     - rota em que ela VIVE nao passa pela ficha de baixa
     - cada rota tem um cartao de fim, e um so
     - cada desfecho tem laudo preenchido em quatro_paginas.js
     - toda flag lida por um 'if' e escrita em algum lugar

   Uso:
     node tools/finais.js                  resumo e checagens
     node tools/finais.js --dump           transcript das quatro
     node tools/finais.js --dump perda     transcript de uma so
   ========================================================================== */
'use strict';

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const raiz = path.join(__dirname, '..');
const ctx  = vm.createContext({ module: { exports: {} }, console });
const carrega = rel =>
  vm.runInContext(fs.readFileSync(path.join(raiz, rel), 'utf8'), ctx, { filename: rel });

carrega('js/config.js');

const RBF0 = ctx.RBF;
const ARQS = (RBF0.CHAPTERS || []).map(c => {
  const nome = { PROLOGUE: 'prologue', EPILOGUE: 'epilogue' }[c.data] ||
               (c.data.startsWith('CHAPTER') ? 'chapter' + c.data.slice(7) : c.data.toLowerCase());
  return { cap: c, arq: 'js/data/' + nome + '.js' };
});
ARQS.forEach(a => carrega(a.arq));
carrega('js/data/quatro_paginas.js');

const RBF = ctx.RBF;

function morre(fim) { return /\bMORRE\b/.test(fim.note || ''); }

/* ---- caminhada --------------------------------------------------------- */

function anda(beats, flags) {
  const vistos = [];
  for (const b of beats || []) {
    if (b.if) {
      let ok = true;
      for (const k in b.if) { if (flags[k] !== b.if[k]) { ok = false; break; } }
      if (!ok) { continue; }
    }
    if (b.t === 'flag' && b.set) { Object.assign(flags, b.set); }
    vistos.push(b);
  }
  return vistos;
}

function texto(b) {
  if (b.t === 'nar' || b.t === 'inn') { return b.tx; }
  if (b.t === 'dial') { return b.ch + ': ' + b.tx; }
  /* O rotulo do cartao E texto na tela, e o extrator ignorava. Uma
     checagem que procurava "livro de pessoal" passava por engano numa
     rota e falhava por engano na outra. */
  if (b.t === 'arc' || b.t === 'last') {
    return (b.label ? b.label + ' | ' : '') + (b.lns || []).join(' / ');
  }
  if (b.t === 'title') { return '[' + b.main + ' - ' + b.sub + ']'; }
  if (b.t === 'end_chap') { return '[' + b.line1 + ' ' + b.line2 + ']'; }
  if (b.t === 'chap') { return '\n### ' + b.num + ' - ' + b.name; }
  return null;
}

const BASE = {
  aldric_reply: 'B', report_style: 'C', ledger_report: 'C',
  klara_asked: 'B', ritual_report: 'C', told_klara: 'C',
  taught: 'A', lied_to_order: 'C', third_paid: 'C', promised: 'C',
  hid_from_order: true, saw_ritual: true, klara_covered: true,
  entered_chamber: true, saw_surfacing: true, knows_predecessor: false,
  fenn_debt: 'pago', plan_shape: 'data', archive_seed: true,
  klara_focus: true, distance_kept: false, aldric_pressed: true,
  ledger_crossref: false, ledger_copied: true, kept_apart: false
};

/* Capitulos da cauda: tudo depois do Capitulo 9. */
const CAUDA = ARQS.filter(a => a.cap.rota || a.cap.id === 'epilogo');

function corrida(rota) {
  const flags = Object.assign({}, BASE, { rota: rota.id, ending: rota.ending });
  const out = [];
  for (const a of CAUDA) {
    const beats = RBF[a.cap.data] || [];
    const vistos = anda(beats, flags);
    out.push({ cap: a.cap, vistos });
  }
  return { flags, out };
}

/* ---- checagens --------------------------------------------------------- */

let falhas = 0;
function checa(ok, msg, det) {
  console.log((ok ? '  PASS  ' : '  FAIL  ') + msg + (ok || !det ? '' : ' :: ' + det));
  if (!ok) { falhas += 1; }
}

const idx = process.argv.indexOf('--dump');
const alvo = idx === -1 ? undefined : (process.argv[idx + 1] || null);

console.log('== AS QUATRO ROTAS ==\n');

for (const rota of RBF.ROTAS || []) {
  const { flags, out } = corrida(rota);

  const meus  = out.filter(o => o.cap.rota === rota.id);
  const alheios = out.filter(o => o.cap.rota && o.cap.rota !== rota.id);
  const total = out.reduce((a, c) => a + c.vistos.length, 0);

  console.log(rota.id + '  ' + rota.label + '  -> ' + rota.nome +
              '   capitulos=' + rota.chapters.length + '  beats=' + total);

  /* cada capitulo declarado precisa aparecer */
  for (const cid of rota.chapters) {
    const o = meus.find(m => m.cap.id === cid);
    checa(!!o && o.vistos.length > 20, rota.id + ': ' + cid + ' tem corpo',
          o ? o.vistos.length + ' beats' : 'ausente');
  }

  /* nenhum capitulo de outra rota pode vazar */
  const vazou = alheios.filter(o => o.vistos.length > 0);
  checa(vazou.length === 0, rota.id + ': nenhum capitulo de outra rota vaza',
        vazou.map(v => v.cap.id + '(' + v.vistos.length + ')').join(' '));

  /* Epilogo tem corpo proprio */
  const ep = out.find(o => o.cap.id === 'epilogo');
  const epProprios = ep ? ep.vistos.filter(b => b.if && b.if.rota === rota.id).length : 0;
  checa(epProprios > 0, rota.id + ': o Epilogo tem beat proprio', 'tem ' + epProprios);

  /* viver e morrer combinam com a ficha de baixa */
  const linhas = out.flatMap(o => o.vistos.map(texto).filter(Boolean)).join('\n');
  const fim = (RBF.ENDINGS || []).find(e => e.id === rota.ending) || {};
  const temBaixa = /livro de pessoal/.test(linhas);
  checa(morre(fim) === temBaixa,
        rota.id + ': ficha de baixa combina com ' + (morre(fim) ? 'morte' : 'sobrevivencia'));

  /* um cartao de fim, e um so */
  const cartao = ep ? ep.vistos.filter(b => b.t === 'title') : [];
  checa(cartao.length === 1, rota.id + ': um cartao de fim, e um so', 'tem ' + cartao.length);

  /* laudo */
  const lau = (RBF.QUATRO_PAGINAS.finais || {})[rota.ending];
  checa(!!lau, rota.id + ': o desfecho ' + rota.ending + ' tem laudo');
  if (lau) {
    for (const campo of ['o_que', 'custou', 'ela_sentiu', 'klara', 'nao_soube']) {
      checa(!!lau[campo] && lau[campo].length > 40, rota.id + ': laudo.' + campo + ' preenchido');
    }
  }
  console.log('');

  if (alvo !== undefined && (alvo === null || alvo === rota.id)) {
    const dst = path.join(__dirname, '_finais');
    if (!fs.existsSync(dst)) { fs.mkdirSync(dst); }
    const corpo = out.map(o =>
      '\n===== ' + o.cap.label + ' · ' + o.cap.title + ' =====\n' +
      o.vistos.map(texto).filter(Boolean).join('\n')
    ).join('\n');
    fs.writeFileSync(path.join(dst, rota.id + '.txt'), corpo, 'utf8');
  }
}

/* ---- flags orfas ------------------------------------------------------- */
const lidas = new Set();
const escritas = new Set(Object.keys(BASE));
const varre = beats => {
  for (const b of beats || []) {
    if (b.if) { Object.keys(b.if).forEach(k => lidas.add(k)); }
    if (b.t === 'flag' && b.set) { Object.keys(b.set).forEach(k => escritas.add(k)); }
    if (b.t === 'cho') {
      for (const o of b.opts || []) {
        if (o.flags) { Object.keys(o.flags).forEach(k => escritas.add(k)); }
        if (o.then) { varre(o.then); }
      }
    }
  }
};
(RBF.CHAPTERS || []).forEach(c => varre(RBF[c.data]));
['rota', 'ending', 'relendo', 'lastChoice'].forEach(k => escritas.add(k));

console.log('== FLAGS ==');
const orfas = [...lidas].filter(k => !escritas.has(k)).sort();
checa(orfas.length === 0, 'toda flag lida e escrita em algum lugar',
      orfas.join(', '));

console.log('\n' + (falhas ? falhas + ' FALHA(S)' : 'TUDO OK'));
process.exit(falhas ? 1 : 0);
