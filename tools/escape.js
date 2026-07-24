#!/usr/bin/env node
/* ==========================================================================
   ARQUIVO RABENFELS - tools/escape.js

   Normaliza um arquivo de roteiro para ASCII puro, convertendo qualquer
   caractere acentuado em escape \uXXXX. Idempotente: rodar duas vezes no
   mesmo arquivo nao muda nada.

   Fluxo de trabalho:
     1. escreva o texto normalmente, com acento, dentro de js/data/*.js
     2. rode:  node tools/escape.js js/data/chapter1.js
     3. o arquivo passa a ser ASCII puro e continua valido

   Para ler o arquivo com acento de volta (apenas visualizacao):
     node tools/escape.js js/data/chapter1.js --decode --stdout

   Opcoes:
     --decode   converte escapes de volta para caractere
     --stdout   imprime em vez de gravar
   ========================================================================== */
'use strict';

const fs = require('fs');

const args   = process.argv.slice(2);
const file   = args.find(a => !a.startsWith('--'));
const decode = args.includes('--decode');
const toOut  = args.includes('--stdout');

if (!file) {
  console.error('uso: node tools/escape.js <arquivo> [--decode] [--stdout]');
  process.exit(1);
}
if (!fs.existsSync(file)) {
  console.error('arquivo nao encontrado: ' + file);
  process.exit(1);
}

const src = fs.readFileSync(file, 'utf8');
let out;

if (decode) {
  out = src.replace(/\\u([0-9a-fA-F]{4})/g, (m, hex) =>
    String.fromCharCode(parseInt(hex, 16)));
} else {
  out = Array.from(src).map(ch => {
    const c = ch.codePointAt(0);
    return c < 128 ? ch : '\\u' + c.toString(16).padStart(4, '0');
  }).join('');
}

if (toOut) {
  process.stdout.write(out);
} else {
  if (out === src) {
    console.log('sem mudanca: ' + file);
  } else {
    fs.writeFileSync(file, out, decode ? 'utf8' : 'ascii');
    console.log((decode ? 'decodificado: ' : 'normalizado para ASCII: ') + file);
  }
}
