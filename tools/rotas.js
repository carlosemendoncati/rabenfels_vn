#!/usr/bin/env node
/* ==========================================================================
   ARQUIVO RABENFELS - tools/rotas.js

   Conta a distribuicao das ROTAS nas 59.049 combinacoes de escolha.

   Existe porque este projeto ja perdeu uma producao inteira com limiar
   estimado: 'witness' pedia Esperanca >= 14 E Resposta >= 14 num teto
   cruzado de 13, e nasceu inalcancavel. 'cover_burned' ficou morto pelo
   mesmo motivo. Numero de limiar nao se estima aqui - se conta.

   Uso:
     node tools/rotas.js              distribuicao das rotas declaradas
     node tools/rotas.js --tetos      so os tetos por eixo e cruzados
     node tools/rotas.js --tabela     varre limiares e sugere corte
   ========================================================================== */
'use strict';

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const raiz = path.join(__dirname, '..');
const ctx  = vm.createContext({ module: { exports: {} }, console });
const carrega = rel =>
  vm.runInContext(fs.readFileSync(path.join(raiz, rel), 'utf8'), ctx, { filename: rel });

const CAPS = ['prologue', 'chapter1', 'chapter2', 'chapter3', 'chapter4', 'chapter5',
              'chapter6', 'chapter7', 'chapter8', 'chapter9'];

carrega('js/config.js');
CAPS.forEach(n => carrega('js/data/' + n + '.js'));
const RBF = ctx.RBF;

/* ---- as dez escolhas, na ordem do roteiro ------------------------------ */

const escolhas = [];
for (const n of CAPS) {
  for (const b of RBF[n.toUpperCase()] || []) {
    if (b.t === 'cho') { escolhas.push(b); }
  }
}

const EIXOS = (RBF.ROUTES || []).map(r => r.id);
const TETO  = {};
(RBF.ROUTES || []).forEach(r => { TETO[r.id] = r.max; });

/* Percorre TODAS as combinacoes. 3^10 = 59.049, roda num piscar. */
function todas() {
  const out = [];
  const n = escolhas.length;
  const total = Math.pow(3, n);

  for (let k = 0; k < total; k++) {
    const acc = {};
    EIXOS.forEach(e => { acc[e] = 0; });
    const flags = {};
    const combo = [];
    let x = k;

    for (let i = 0; i < n; i++) {
      const opt = escolhas[i].opts[x % 3];
      x = Math.floor(x / 3);
      combo.push(escolhas[i].id + ':' + opt.id);

      for (const e in (opt.routes || {})) {
        if (acc[e] === undefined) { continue; }
        acc[e] = Math.max(0, Math.min(TETO[e] || 20, acc[e] + opt.routes[e]));
      }
      for (const f in (opt.flags || {})) { flags[f] = opt.flags[f]; }
    }

    /* O gatilho da Cobertura, declarado no fim do Capitulo 9. */
    flags.cover_burned = (flags.lied_to_order === 'A' && flags.third_paid === 'B');

    out.push({ acc, flags, combo });
  }
  return out;
}

const universo = todas();
console.log('combinacoes: ' + universo.length.toLocaleString('pt-BR'));

/* ---- tetos ------------------------------------------------------------- */

function tetos() {
  const min = {}, max = {};
  EIXOS.forEach(e => { min[e] = Infinity; max[e] = -Infinity; });
  const cruz = {};

  for (const u of universo) {
    for (const e of EIXOS) {
      if (u.acc[e] < min[e]) { min[e] = u.acc[e]; }
      if (u.acc[e] > max[e]) { max[e] = u.acc[e]; }
    }
    for (let a = 0; a < EIXOS.length; a++) {
      for (let b = a + 1; b < EIXOS.length; b++) {
        const ch = EIXOS[a] + '+' + EIXOS[b];
        const v  = Math.min(u.acc[EIXOS[a]], u.acc[EIXOS[b]]);
        if (cruz[ch] === undefined || v > cruz[ch]) { cruz[ch] = v; }
      }
    }
  }

  console.log('\n== TETOS POR EIXO ==');
  EIXOS.forEach(e => console.log('  ' + e.padEnd(8) + min[e] + '..' + max[e]));
  console.log('\n== TETO CRUZADO (max do menor dos dois) ==');
  for (const k in cruz) { console.log('  ' + k.padEnd(18) + cruz[k]); }
  return { min, max, cruz };
}

/* ---- distribuicao das rotas declaradas --------------------------------- */

function bate(u, when) {
  if (!when) { return true; }
  if (when.flag && !u.flags[when.flag]) { return false; }
  for (const e in (when.min || {})) { if (u.acc[e] < when.min[e]) { return false; } }
  for (const e in (when.max || {})) { if (u.acc[e] > when.max[e]) { return false; } }
  return true;
}

function resolve(u, lista) {
  for (const r of lista) { if (bate(u, r.when)) { return r.id; } }
  return null;
}

function distribuicao() {
  const lista = RBF.ROTAS;
  if (!lista) {
    console.log('\nRBF.ROTAS ainda nao existe no manifesto.');
    return null;
  }

  const conta = {};
  lista.forEach(r => { conta[r.id] = 0; });
  let orfas = 0;

  for (const u of universo) {
    const id = resolve(u, lista);
    if (id) { conta[id] += 1; } else { orfas += 1; }
  }

  console.log('\n== DISTRIBUICAO DAS ROTAS ==');
  let falhas = 0;
  for (const r of lista) {
    const n = conta[r.id];
    const pc = (100 * n / universo.length).toFixed(2);
    const marca = n === 0 ? '  <<< INALCANCAVEL' : '';
    console.log('  ' + r.id.padEnd(12) + String(n).padStart(6) + '  ' + pc.padStart(6) + '%' + marca);
    if (n === 0) { falhas += 1; }
  }
  if (orfas) {
    console.log('  ' + 'SEM ROTA'.padEnd(12) + String(orfas).padStart(6) + '  <<< a ultima rota precisa ser sem condicao');
    falhas += 1;
  }
  return falhas;
}

/* ---- varredura de limiar ----------------------------------------------- */

function tabela() {
  console.log('\n== QUANTAS COMBINACOES ATINGEM CADA VALOR ==');
  for (const e of EIXOS) {
    const linha = [];
    for (let v = 0; v <= (TETO[e] || 20); v++) {
      const n = universo.filter(u => u.acc[e] >= v).length;
      if (n === 0) { break; }
      linha.push(v + ':' + (100 * n / universo.length).toFixed(1) + '%');
    }
    console.log('  ' + e + '\n    ' + linha.join('  '));
  }
  const cob = universo.filter(u => u.flags.cover_burned).length;
  console.log('\n  cover_burned (lied_to_order:A + third_paid:B): ' +
              cob + '  ' + (100 * cob / universo.length).toFixed(2) + '%');
}

tetos();
if (process.argv.includes('--tabela')) { tabela(); }
if (!process.argv.includes('--tetos')) {
  const f = distribuicao();
  if (f) { console.log('\n' + f + ' PROBLEMA(S) DE ALCANCE'); process.exit(1); }
  if (f === 0) { console.log('\nTUDO OK'); }
}
