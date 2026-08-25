#!/usr/bin/env node
/* ==========================================================================
   ARQUIVO RABENFELS - tools/cobertura_confere.js

   Desenha a planta DECLARADA por cima da arte que esta em disco.

   Existe por um motivo especifico: em 25/08/2026 os sete mapas do
   percurso foram substituidos por plantas novas, com a mesma dimensao em
   pixel e paredes em outro lugar. Coordenada de colisao, posicao de
   movel e retangulo de saida continuaram valendo os numeros medidos na
   arte antiga.

   Nenhum validador ve isso. `validate.js` confere que o mapa existe no
   manifesto; `cobertura_shots.js` confere que a parede segura - e ela
   segura, no lugar errado. So olhando.

   O que ele desenha, sobre cada mapa:

     verde    o retangulo `piso`
     vermelho `paredes` - obstaculo interno
     ambar    `saidas`, com o destino escrito
     azul     `moveis`, na base de cada um
     branco   `pontos` de interacao, com o raio de alcance
     ciano    `luzes`

   Uso:
     node tools/cobertura_confere.js
     node tools/cobertura_confere.js quarto salao

   Grava em tools/_planta/confere_<sala>.png. Requer o pacote pngjs
   ausente? Nao: escreve PNG por conta propria, so com zlib do Node.
   ========================================================================== */
'use strict';

const fs   = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.resolve(__dirname, '..');
const OUT  = path.join(__dirname, '_planta');

/* ---- leitura do projeto ------------------------------------------------- */

function carrega() {
  const RBF = {};
  global.RBF = RBF;
  const vm = require('vm');
  for (const rel of ['js/config.js', 'js/data/cob_mapas.js']) {
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    vm.runInThisContext(src, { filename: rel });
  }
  return global.RBF;
}

/* ---- PNG minimo ---------------------------------------------------------
   Le e escreve PNG de 8 bits sem interlace. O projeto ja depende de zlib
   pelo Node e de mais nada; puxar uma biblioteca de imagem para desenhar
   seis retangulos seria desproporcional.                                  */

function leNumero(buf, i) { return buf.readUInt32BE(i); }

function lePNG(arquivo) {
  const buf = fs.readFileSync(arquivo);
  let i = 8;
  let w = 0, h = 0, cor = 0, bits = 0;
  const dados = [];
  let paleta = null, trns = null;

  while (i < buf.length) {
    const tam = leNumero(buf, i);
    const tipo = buf.toString('ascii', i + 4, i + 8);
    const corpo = buf.slice(i + 8, i + 8 + tam);
    if (tipo === 'IHDR') {
      w = leNumero(corpo, 0); h = leNumero(corpo, 4);
      bits = corpo[8]; cor = corpo[9];
      if (corpo[12] !== 0) { throw new Error('PNG entrelacado nao suportado'); }
      if (bits !== 8) { throw new Error('PNG de ' + bits + ' bits nao suportado'); }
    } else if (tipo === 'PLTE') { paleta = corpo; }
    else if (tipo === 'tRNS')  { trns = corpo; }
    else if (tipo === 'IDAT')  { dados.push(corpo); }
    else if (tipo === 'IEND')  { break; }
    i += 12 + tam;
  }

  const canais = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[cor];
  const cru = zlib.inflateSync(Buffer.concat(dados));
  const linha = w * canais;
  const px = Buffer.alloc(w * h * 4);
  const anterior = Buffer.alloc(linha);
  const atual = Buffer.alloc(linha);

  let p = 0;
  for (let y = 0; y < h; y++) {
    const filtro = cru[p++];
    cru.copy(atual, 0, p, p + linha);
    p += linha;
    desfiltra(filtro, atual, anterior, canais, linha);
    for (let x = 0; x < w; x++) {
      const s = x * canais;
      const d = (y * w + x) * 4;
      if (cor === 3) {
        const idx = atual[s];
        px[d] = paleta[idx * 3]; px[d + 1] = paleta[idx * 3 + 1];
        px[d + 2] = paleta[idx * 3 + 2];
        px[d + 3] = trns && idx < trns.length ? trns[idx] : 255;
      } else if (cor === 0) {
        px[d] = px[d + 1] = px[d + 2] = atual[s]; px[d + 3] = 255;
      } else if (cor === 4) {
        px[d] = px[d + 1] = px[d + 2] = atual[s]; px[d + 3] = atual[s + 1];
      } else {
        px[d] = atual[s]; px[d + 1] = atual[s + 1]; px[d + 2] = atual[s + 2];
        px[d + 3] = canais === 4 ? atual[s + 3] : 255;
      }
    }
    atual.copy(anterior);
  }
  return { w, h, px };
}

function desfiltra(f, cur, prev, canais, linha) {
  for (let i = 0; i < linha; i++) {
    const a = i >= canais ? cur[i - canais] : 0;
    const b = prev[i];
    const c = i >= canais ? prev[i - canais] : 0;
    let v = cur[i];
    if (f === 1) { v += a; }
    else if (f === 2) { v += b; }
    else if (f === 3) { v += (a + b) >> 1; }
    else if (f === 4) {
      const pa = Math.abs(b - c), pb = Math.abs(a - c);
      const pc = Math.abs(a + b - 2 * c);
      v += (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
    }
    cur[i] = v & 255;
  }
}

function gravaPNG(arquivo, img) {
  const { w, h, px } = img;
  const cru = Buffer.alloc(h * (w * 3 + 1));
  let p = 0;
  for (let y = 0; y < h; y++) {
    cru[p++] = 0;
    for (let x = 0; x < w; x++) {
      const s = (y * w + x) * 4;
      cru[p++] = px[s]; cru[p++] = px[s + 1]; cru[p++] = px[s + 2];
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 2;
  const partes = [
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    bloco('IHDR', ihdr),
    bloco('IDAT', zlib.deflateSync(cru, { level: 6 })),
    bloco('IEND', Buffer.alloc(0))
  ];
  fs.writeFileSync(arquivo, Buffer.concat(partes));
}

function bloco(tipo, corpo) {
  const t = Buffer.from(tipo, 'ascii');
  const tam = Buffer.alloc(4); tam.writeUInt32BE(corpo.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, corpo])) >>> 0, 0);
  return Buffer.concat([tam, t, corpo, crc]);
}

let TAB = null;
function crc32(buf) {
  if (!TAB) {
    TAB = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) { c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; }
      TAB[n] = c;
    }
  }
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) { c = TAB[(c ^ buf[i]) & 255] ^ (c >>> 8); }
  return c ^ 0xffffffff;
}

/* ---- desenho ------------------------------------------------------------ */

function clareia(img, k) {
  for (let i = 0; i < img.px.length; i += 4) {
    for (let c = 0; c < 3; c++) {
      img.px[i + c] = Math.min(255, Math.round(img.px[i + c] * k));
    }
  }
}

function ponto(img, x, y, cor) {
  if (x < 0 || y < 0 || x >= img.w || y >= img.h) { return; }
  const d = (y * img.w + x) * 4;
  img.px[d] = cor[0]; img.px[d + 1] = cor[1]; img.px[d + 2] = cor[2];
}

function moldura(img, x0, y0, x1, y1, cor, esp) {
  esp = esp || 2;
  for (let e = 0; e < esp; e++) {
    for (let x = x0; x <= x1; x++) { ponto(img, x, y0 + e, cor); ponto(img, x, y1 - e, cor); }
    for (let y = y0; y <= y1; y++) { ponto(img, x0 + e, y, cor); ponto(img, x1 - e, y, cor); }
  }
}

function cruz(img, x, y, r, cor) {
  for (let i = -r; i <= r; i++) { ponto(img, x + i, y, cor); ponto(img, x, y + i, cor); }
}

function circulo(img, cx, cy, r, cor) {
  for (let a = 0; a < 360; a += 2) {
    const t = a * Math.PI / 180;
    ponto(img, Math.round(cx + Math.cos(t) * r), Math.round(cy + Math.sin(t) * r), cor);
  }
}

/* Numeros em 3x5, so o suficiente para marcar coordenada. */
const DIG = {
  '0': '111101101101111', '1': '010010010010010', '2': '111001111100111',
  '3': '111001111001111', '4': '101101111001001', '5': '111100111001111',
  '6': '111100111101111', '7': '111001001001001', '8': '111101111101111',
  '9': '111101111001111', ',': '000000000010100', ' ': '000000000000000',
  '-': '000000111000000'
};

function texto(img, s, x, y, cor, esc) {
  esc = esc || 2;
  let ox = x;
  for (const ch of String(s)) {
    const m = DIG[ch];
    if (m) {
      for (let i = 0; i < 15; i++) {
        if (m[i] !== '1') { continue; }
        const px = i % 3, py = Math.floor(i / 3);
        for (let a = 0; a < esc; a++) {
          for (let b = 0; b < esc; b++) {
            ponto(img, ox + px * esc + a, y + py * esc + b, cor);
          }
        }
      }
    }
    ox += 4 * esc;
  }
}

const VERDE   = [90, 240, 130];
const VERMELHO= [255, 80, 80];
const AMBAR   = [255, 190, 60];
const AZUL    = [110, 170, 255];
const BRANCO  = [245, 245, 245];
const CIANO   = [90, 240, 240];

function confere(RBF, id) {
  const sala = RBF.COB_MAPAS[id];
  if (!sala) { console.log('  sala desconhecida: ' + id); return null; }

  const def = RBF.COBERTURA.maps[sala.mapa];
  const arq = path.join(ROOT, RBF.CONFIG.paths.cobMaps, def.file);
  if (!fs.existsSync(arq)) { console.log('  arte ausente: ' + arq); return null; }

  const img = lePNG(arq);
  clareia(img, 2.4);

  const avisos = [];
  const p = sala.piso;

  if (p[2] > img.w || p[3] > img.h) {
    avisos.push('piso passa da arte: ' + p.join(',') + ' contra ' + img.w + 'x' + img.h);
  }
  moldura(img, p[0], p[1], p[2], p[3], VERDE, 3);
  texto(img, p[0] + ',' + p[1], p[0] + 6, p[1] + 6, VERDE);

  for (const w of (sala.paredes || [])) {
    moldura(img, w.x, w.y, w.x + w.w, w.y + w.h, VERMELHO, 2);
  }

  for (const s of (sala.saidas || [])) {
    moldura(img, s.x, s.y, s.x + s.w, s.y + s.h, AMBAR, 3);
    /* Saida fora do piso nunca dispara: passoSaidas() so testa a caixa
       dos pes, e os pes nao saem do piso. */
    const encosta = !(s.x + s.w < p[0] - 14 || s.x > p[2] + 14 ||
                      s.y + s.h < p[1] - 14 || s.y > p[3] + 14);
    if (!encosta) {
      avisos.push('saida solta, longe do piso: ' + [s.x, s.y, s.w, s.h].join(','));
    }
  }

  for (const m of (sala.moveis || [])) {
    cruz(img, m.x, m.y, 12, AZUL);
    if (m.x < p[0] || m.x > p[2] || m.y < p[1] || m.y > p[3]) {
      avisos.push('movel fora do piso: ' + m.tipo + ' em ' + m.x + ',' + m.y);
    }
  }

  for (const pt of (sala.pontos || [])) {
    circulo(img, pt.x, pt.y, pt.raio || 72, BRANCO);
    cruz(img, pt.x, pt.y, 6, BRANCO);
    if (pt.x < p[0] || pt.x > p[2] || pt.y < p[1] || pt.y > p[3]) {
      avisos.push('ponto fora do piso: ' + pt.id + ' em ' + pt.x + ',' + pt.y);
    }
  }

  for (const l of (sala.luzes || [])) { circulo(img, l.x, l.y, l.raio || 120, CIANO); }

  /* Regua de 200 em 200, para ler coordenada na imagem. */
  for (let x = 0; x < img.w; x += 200) {
    for (let y = 0; y < img.h; y += 4) { ponto(img, x, y, [70, 90, 130]); }
    texto(img, String(x), x + 4, 4, [255, 240, 120], 2);
  }
  for (let y = 0; y < img.h; y += 200) {
    for (let x = 0; x < img.w; x += 4) { ponto(img, x, y, [70, 90, 130]); }
    texto(img, String(y), 4, y + 4, [255, 240, 120], 2);
  }

  if (!fs.existsSync(OUT)) { fs.mkdirSync(OUT, { recursive: true }); }
  const saida = path.join(OUT, 'confere_' + id + '.png');
  gravaPNG(saida, img);
  return { saida, avisos, sala };
}

function main() {
  const RBF = carrega();
  const alvos = process.argv.slice(2).filter(a => !a.startsWith('-'));
  const ids = alvos.length ? alvos : Object.keys(RBF.COB_MAPAS);

  console.log('\nplanta declarada sobre a arte em disco\n');
  let total = 0;

  for (const id of ids) {
    const r = confere(RBF, id);
    if (!r) { continue; }
    const s = r.sala;
    console.log('  %s', id);
    console.log('    piso %s  moveis %d  pontos %d  saidas %d',
                s.piso.join(','), (s.moveis || []).length,
                (s.pontos || []).length, (s.saidas || []).length);
    for (const a of r.avisos) { console.log('    AVISO  ' + a); total += 1; }
    console.log('    -> ' + path.relative(ROOT, r.saida));
  }

  console.log('\n%d aviso(s). O resto so olhando as imagens.\n', total);
  return 0;
}

main();
