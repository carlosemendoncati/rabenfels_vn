#!/usr/bin/env node
/* ==========================================================================
   ARQUIVO RABENFELS - tools/pngtrim.js

   Prepara arte de interface que chegou com fundo branco em vez de
   transparencia.

   Existe porque isso ja aconteceu duas vezes com o mesmo tipo de peca:
   a arte vem de um gerador que grava PNG sem canal alfa, e o "fundo"
   e um retangulo branco. Colada assim na cena escura, a peca aparece
   dentro de uma caixa branca - ou, quando o branco e removido no olho,
   com uma franja clara em volta.

   Dois modos, porque sao dois problemas diferentes:

     --matte       tira o fundo quase branco e mantem a cor do resto.
                   Para moldura, painel, placa: o miolo continua com a
                   cor que o artista pintou.

     --silhueta    transforma luminancia em opacidade e pinta tudo de
                   uma cor so. Para silhueta preta sobre branco: o
                   preto vira opaco, o branco vira transparente, e o
                   cinza da borda vira meio-tom - que e o que da o
                   contorno suave em vez de escada de pixel.

   Depois de qualquer um dos dois, corta a margem totalmente
   transparente que sobrou.

   Uso:
     node tools/pngtrim.js entrada.png saida.png --matte
     node tools/pngtrim.js entrada.png saida.png --matte --limite 232
     node tools/pngtrim.js entrada.png saida.png --silhueta
     node tools/pngtrim.js entrada.png saida.png --matte --sem-corte

   Sem dependencia: usa o zlib que vem com o Node.
   ========================================================================== */
'use strict';

const fs   = require('fs');
const zlib = require('zlib');

/* ---- decodificacao -------------------------------------------------------
   Aceita 8 bits, sem entrelacamento, RGB ou RGBA. E o que os geradores
   de imagem produzem; qualquer outra coisa e recusada com aviso claro
   em vez de gravar lixo.                                                  */

function decode(file) {
  const buf = fs.readFileSync(file);
  if (buf.readUInt32BE(0) !== 0x89504e47) { throw new Error('nao e PNG: ' + file); }

  let off = 8;
  let width = 0, height = 0, depth = 0, color = 0, interlace = 0;
  const idat = [];

  while (off < buf.length) {
    const len  = buf.readUInt32BE(off);
    const type = buf.toString('ascii', off + 4, off + 8);
    const at   = off + 8;

    if (type === 'IHDR') {
      width     = buf.readUInt32BE(at);
      height    = buf.readUInt32BE(at + 4);
      depth     = buf[at + 8];
      color     = buf[at + 9];
      interlace = buf[at + 12];
    } else if (type === 'IDAT') {
      idat.push(buf.slice(at, at + len));
    } else if (type === 'IEND') {
      break;
    }
    off = at + len + 4;
  }

  if (depth !== 8)      { throw new Error('so 8 bits por canal (veio ' + depth + ')'); }
  if (interlace !== 0)  { throw new Error('PNG entrelacado nao e aceito'); }
  if (color !== 2 && color !== 6) { throw new Error('so RGB ou RGBA (colorType ' + color + ')'); }

  const ch     = (color === 6) ? 4 : 3;
  const stride = width * ch;
  const raw    = zlib.inflateSync(Buffer.concat(idat));
  const out    = Buffer.alloc(height * stride);

  let p = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[p++];
    const row    = y * stride;
    for (let x = 0; x < stride; x++) {
      const cur = raw[p + x];
      const a = x >= ch ? out[row + x - ch] : 0;
      const b = y > 0   ? out[row - stride + x] : 0;
      const c = (x >= ch && y > 0) ? out[row - stride + x - ch] : 0;
      let v;
      switch (filter) {
        case 0: v = cur; break;
        case 1: v = cur + a; break;
        case 2: v = cur + b; break;
        case 3: v = cur + ((a + b) >> 1); break;
        case 4: {
          const pp = a + b - c;
          const pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c);
          v = cur + ((pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c));
          break;
        }
        default: throw new Error('filtro PNG desconhecido: ' + filter);
      }
      out[row + x] = v & 0xff;
    }
    p += stride;
  }

  /* Normaliza tudo para RGBA, para o resto do arquivo so ter um caso. */
  if (ch === 4) { return { width: width, height: height, data: out }; }

  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    rgba[i * 4]     = out[i * 3];
    rgba[i * 4 + 1] = out[i * 3 + 1];
    rgba[i * 4 + 2] = out[i * 3 + 2];
    rgba[i * 4 + 3] = 255;
  }
  return { width: width, height: height, data: rgba };
}

/* ---- codificacao --------------------------------------------------------- */

const CRC = (function () {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) { c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1); }
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) { c = CRC[(c ^ buf[i]) & 0xff] ^ (c >>> 8); }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, body) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(body.length, 0);
  const head = Buffer.concat([Buffer.from(type, 'ascii'), body]);
  const crc  = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(head), 0);
  return Buffer.concat([len, head, crc]);
}

function encode(width, height, data) {
  const stride = width * 4;
  const raw = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;                       /* filtro 0: sem filtro */
    data.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8]  = 8;   /* 8 bits  */
  ihdr[9]  = 6;   /* RGBA    */
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

/* ---- operacoes ----------------------------------------------------------- */

/* Fundo quase branco vira transparente. O limite e por canal E por
   saturacao: um dourado claro tem canal alto mas diferenca grande entre
   R e B, entao nao e confundido com o fundo. A faixa entre 'limite' e
   255 vira meio-tom, o que preserva a borda suave da arte. */
function matte(img, limite) {
  const d = img.data;
  const faixa = 255 - limite;
  for (let i = 0; i < img.width * img.height; i++) {
    const r = d[i * 4], g = d[i * 4 + 1], b = d[i * 4 + 2];
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    if (min >= limite && (max - min) <= 12) {
      const t = (min - limite) / faixa;             /* 0 no limite, 1 no branco */
      d[i * 4 + 3] = Math.round(255 * (1 - t));
    }
  }
}

/* Luminancia vira opacidade; a cor passa a ser uma so. Para silhueta
   preta sobre branco: preto -> opaco, branco -> transparente. */
function silhueta(img, tinta) {
  const d = img.data;
  for (let i = 0; i < img.width * img.height; i++) {
    const lum = (d[i * 4] * 0.299 + d[i * 4 + 1] * 0.587 + d[i * 4 + 2] * 0.114);
    d[i * 4]     = tinta[0];
    d[i * 4 + 1] = tinta[1];
    d[i * 4 + 2] = tinta[2];
    d[i * 4 + 3] = Math.max(0, Math.min(255, Math.round(255 - lum)));
  }
}

/* Zera opacidade residual e reescala o que sobrou.

   Alguns geradores desenham um XADREZ de "falsa transparencia" no fundo
   em vez de gravar canal alfa. Convertido por luminancia, esse xadrez
   nao vira zero: vira uma opacidade baixa e alternada, que na cena
   aparece como um quadriculado fantasma em volta da figura. O piso
   corta essa faixa e estica o resto de volta para 0-255, preservando a
   borda suave do desenho. */
function piso(img, corte) {
  const d = img.data;
  const faixa = 255 - corte;
  for (let i = 0; i < img.width * img.height; i++) {
    const a = d[i * 4 + 3];
    d[i * 4 + 3] = (a <= corte) ? 0 : Math.round(255 * (a - corte) / faixa);
  }
}

/* Corta a moldura transparente que sobrou.

   'alvo' e o alpha minimo que conta como conteudo. O padrao 3 apara so
   o que e realmente vazio. Um valor alto serve para peca que veio com
   sombra difusa em volta: a sombra nao e a peca, e mantida no recorte
   ela vira uma faixa morta que estraga o calculo de border-image. */
function corta(img, alvo) {
  const { width, height, data } = img;
  const lim = alvo || 3;
  let top = -1, bot = -1, left = -1, right = -1;

  for (let y = 0; y < height && top < 0; y++) {
    for (let x = 0; x < width; x++) { if (data[(y * width + x) * 4 + 3] > lim) { top = y; break; } }
  }
  for (let y = height - 1; y >= 0 && bot < 0; y--) {
    for (let x = 0; x < width; x++) { if (data[(y * width + x) * 4 + 3] > lim) { bot = y; break; } }
  }
  for (let x = 0; x < width && left < 0; x++) {
    for (let y = 0; y < height; y++) { if (data[(y * width + x) * 4 + 3] > lim) { left = x; break; } }
  }
  for (let x = width - 1; x >= 0 && right < 0; x--) {
    for (let y = 0; y < height; y++) { if (data[(y * width + x) * 4 + 3] > lim) { right = x; break; } }
  }

  if (top < 0) { return img; }                        /* imagem toda vazia */

  const w = right - left + 1;
  const h = bot - top + 1;
  if (w === width && h === height) { return img; }

  const out = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    data.copy(out, y * w * 4,
              ((top + y) * width + left) * 4,
              ((top + y) * width + left + w) * 4);
  }
  return { width: w, height: h, data: out };
}

/* ---- linha de comando ---------------------------------------------------- */

const args   = process.argv.slice(2);
const files  = args.filter(a => !a.startsWith('--'));
const modoM  = args.indexOf('--matte') !== -1;
const modoS  = args.indexOf('--silhueta') !== -1;
const semCut = args.indexOf('--sem-corte') !== -1;

const limIdx = args.indexOf('--limite');
const limite = limIdx !== -1 ? parseInt(args[limIdx + 1], 10) : 228;

const pisoIdx = args.indexOf('--piso');
const pisoVal = pisoIdx !== -1 ? parseInt(args[pisoIdx + 1], 10) : 0;

const cortIdx    = args.indexOf('--corte-alpha');
const corteAlpha = cortIdx !== -1 ? parseInt(args[cortIdx + 1], 10) : 3;

if (files.length < 2 || (!modoM && !modoS)) {
  console.error('uso: node tools/pngtrim.js entrada.png saida.png (--matte | --silhueta)');
  console.error('     --limite N     corte do fundo claro no modo matte (padrao 228)');
  console.error('     --piso N       zera opacidade abaixo de N e reescala o resto');
  console.error('     --corte-alpha N  alpha minimo que conta como conteudo ao aparar');
  console.error('     --sem-corte    nao apara a margem transparente');
  process.exit(1);
}

try {
  let img = decode(files[0]);
  const antes = img.width + 'x' + img.height;

  if (modoS) { silhueta(img, [8, 6, 8]); }
  else       { matte(img, limite); }

  if (pisoVal > 0) { piso(img, pisoVal); }

  if (!semCut) { img = corta(img, corteAlpha); }

  fs.writeFileSync(files[1], encode(img.width, img.height, img.data));
  console.log(files[0] + '  ' + antes + '  ->  ' + files[1] + '  ' + img.width + 'x' + img.height + '  RGBA');
} catch (e) {
  console.error('falhou: ' + e.message);
  process.exit(1);
}
