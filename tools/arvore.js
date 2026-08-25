#!/usr/bin/env node
/* ==========================================================================
   ARQUIVO RABENFELS - tools/arvore.js

   Confere a tela de arvore contra o roteiro.

   A tela mostra ao jogador o que cada escolha muda depois. Texto desse
   tipo envelhece calado: alguem mexe num capitulo, a consequencia
   anotada deixa de ser verdade, e nada acusa. Este arquivo acusa.

   O que ele confere:

     - toda escolha do roteiro tem anotacao, e toda anotacao tem escolha
     - toda opcao de toda escolha tem 'efeito' escrito
     - todo final de RBF.ENDINGS tem anotacao, e os eixos declarados
       existem em RBF.ROUTES
     - os numeros citados nos textos de js/data/arvore.js batem com a
       contagem real de beats que leem cada flag
     - nenhum 'efeito' transcreve delta de rota - esse numero e lido do
       roteiro em tempo de execucao, e escreve-lo aqui criaria a segunda
       fonte que a regra do projeto existe para impedir

   Uso:  node tools/arvore.js
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

/* A lista de arquivos vem do proprio manifesto. Fixa-la aqui foi o que
   quebrou este validador quando chapter10 e chapter11 sairam do jogo e
   viraram onze capitulos de rota. */
const CAPS = (ctx.RBF.CHAPTERS || []).map(c =>
  ({ PROLOGUE: 'prologue', EPILOGUE: 'epilogue' }[c.data] ||
   (c.data.startsWith('CHAPTER') ? 'chapter' + c.data.slice(7) : c.data.toLowerCase())));

CAPS.forEach(n => carrega('js/data/' + n + '.js'));
carrega('js/data/arvore.js');

const RBF = ctx.RBF;

let falhas = 0;
function checa(ok, msg) {
  console.log((ok ? '  PASS  ' : '  FAIL  ') + msg);
  if (!ok) { falhas += 1; }
}

/* ---- contagem real de leituras por flag ------------------------------- */

const leituras = {};                       /* flag -> { capitulo: n } */

function varre(beats, cap) {
  for (const b of beats) {
    if (b.if) {
      for (const k in b.if) {
        leituras[k] = leituras[k] || {};
        leituras[k][cap] = (leituras[k][cap] || 0) + 1;
      }
    }
    if (b.t === 'cho') {
      for (const o of b.opts || []) { if (o.then) { varre(o.then, cap); } }
    }
  }
}
(RBF.CHAPTERS || []).forEach(c => varre(RBF[c.data] || [], c.id));

function total(flag) {
  const m = leituras[flag] || {};
  return Object.keys(m).reduce((a, c) => a + m[c], 0);
}
function em(flag, cap) { return (leituras[flag] || {})[cap] || 0; }

/* ---- escolhas do roteiro ---------------------------------------------- */

const escolhas = [];
for (const c of RBF.CHAPTERS || []) {
  for (const b of RBF[c.data] || []) {
    if (b.t === 'cho') { escolhas.push({ beat: b, cap: c.id }); }
  }
}

const A = RBF.ARVORE || {};
const anot = A.escolhas || {};

console.log('== ESCOLHAS ==\n');

checa(escolhas.length > 0, 'o roteiro tem escolhas');

for (const { beat, cap } of escolhas) {
  const a = anot[beat.id];
  checa(!!a, beat.id + ' (' + cap + '): tem anotacao');
  if (!a) { continue; }

  checa(!!a.decide && a.decide.length > 30, beat.id + ': o campo decide esta escrito');

  for (const o of beat.opts || []) {
    const e = (a.opts || {})[o.id];
    checa(!!e && !!e.efeito && e.efeito.length > 40,
          beat.id + '/' + o.id + ': tem efeito escrito');

    /* delta de rota nao pode estar transcrito no texto */
    if (e && e.efeito) {
      const transcreve = /\b(Esperan|Perda|Resposta)\w*\s*\+\s*\d/i.test(e.efeito);
      checa(!transcreve, beat.id + '/' + o.id + ': nao transcreve delta de rota');
    }
  }

  /* toda escolha precisa de id estavel, senao o save reconstroi errado */
  checa(!!beat.id, 'escolha em ' + cap + ' tem id');
}

/* anotacao orfa */
for (const id in anot) {
  checa(escolhas.some(e => e.beat.id === id), 'anotacao ' + id + ' aponta para escolha real');
}

/* ---- os numeros citados no texto -------------------------------------- */

console.log('\n== NUMEROS CITADOS ==\n');

/* Cada linha: [onde esta escrito, numero afirmado, numero real]. Ao
   mexer no roteiro e este bloco que reprova primeiro. */
const AFIRMADO = [
  ['cap1_aldric/B  "treze beats do Capitulo 2"',        13, em('aldric_pressed', 'capitulo2')],
  ['cap3_borboleta "dezessete beats do entardecer"',    17, em('klara_asked',    'capitulo3')],
  ['cap6_ensino    "cento e vinte e tres beats"',      123, total('taught')]
];

for (const [onde, diz, real] of AFIRMADO) {
  checa(diz === real, onde + ': diz ' + diz + ', roteiro tem ' + real);
}

/* ---- os nove finais ---------------------------------------------------- */

console.log('\n== FINAIS ==\n');

const af = A.finais || {};
for (const e of RBF.ENDINGS || []) {
  const a = af[e.id];
  checa(!!a, e.id + ': tem anotacao');
  if (!a) { continue; }
  checa(!!a.condicao && a.condicao.length > 20, e.id + ': condicao escrita');
  checa(!!a.porta && a.porta.length > 20, e.id + ': porta escrita');
  for (const eixo of a.eixos || []) {
    checa(!!eixo && typeof eixo === 'object',
          e.id + ': eixo declarado como objeto com rota e direcao');
    checa((RBF.ROUTES || []).some(r => r.id === (eixo || {}).r),
          e.id + ': eixo ' + (eixo || {}).r + ' existe em RBF.ROUTES');
    checa(['alta', 'baixa'].indexOf((eixo || {}).d) !== -1,
          e.id + ': direcao do eixo e alta ou baixa');
  }
}
for (const id in af) {
  checa((RBF.ENDINGS || []).some(e => e.id === id), 'anotacao de final ' + id + ' existe em RBF.ENDINGS');
}


/* ==========================================================================
   A TELA

   O bloco acima confere o texto. Este confere o que a tela FAZ com ele,
   num DOM proprio, porque a regra que mais importa aqui e negativa:
   ramo nao percorrido nao pode vazar a consequencia.

   Foi por isso que ele existe. Conferir por leitura que uma coisa NAO
   aparece e o tipo de checagem que passa por engano.
   ========================================================================== */

const MD  = require('./minidom.js');
const htm = fs.readFileSync(path.join(raiz, 'index.html'), 'utf8');

function boot() {
  const win = MD.createWindow(MD.idsFromHtml(htm));
  const c   = vm.createContext(win);
  for (const rel of MD.scriptsFromHtml(htm)) {
    vm.runInContext(fs.readFileSync(path.join(raiz, rel), 'utf8'), c, { filename: rel });
  }
  return win;
}

console.log('\n== A TELA ==\n');

const win = boot();
const W   = win.RBF;

/* Partida fingida: terminou uma vez pela rota Esperanca, e percorreu APENAS o
   ramo B de cap1_aldric. Tudo o mais fica fechado, e e sobre o que fica
   fechado que as checagens seguintes sao. */
const chaves = W.STORAGE.keys;
win.localStorage.setItem(chaves.progress, JSON.stringify({
  chaptersReached:  (W.CHAPTERS || []).map(c => c.id),
  finishedChapters: (W.CHAPTERS || []).map(c => c.id),
  totalPlaytime:    0,
  seen:             ['cho:cap1_aldric:B'],
  runs:             [{ ending: 'arquivo', flags: { rota: 'esperanca' }, routes: {}, choiceLog: { cap1_aldric: 'B' } }],
  lastRun:          { ending: 'arquivo', flags: { rota: 'esperanca' }, routes: {}, choiceLog: { cap1_aldric: 'B' } }
}));

checa(W.Arvore.available(), 'a arvore abre com a obra terminada');

const nos = W.Arvore.build();
checa(Array.isArray(nos) && nos.length === escolhas.length,
      'build devolve uma linha por escolha do roteiro');

const no = nos.find(n => n.id === 'cap1_aldric');
checa(!!no, 'cap1_aldric esta na arvore');
checa(no.abertos === 1, 'cap1_aldric conta um ramo percorrido de tres');

const tomado = no.opts.find(o => o.id === 'B');
const fechado = no.opts.find(o => o.id === 'A');

checa(tomado.tomada === true, 'o ramo percorrido vem marcado');
checa(!!tomado.efeito, 'o ramo percorrido traz a consequencia');
checa(tomado.routes && tomado.routes.answer === 2,
      'o delta vem do roteiro, e nao de transcricao');
checa(tomado.naUltima === true, 'o ramo desta leitura vem marcado');

checa(fechado.tomada === false, 'o ramo nao percorrido vem fechado');
checa(fechado.efeito === '', 'o ramo nao percorrido NAO traz a consequencia');
checa(fechado.routes === null, 'o ramo nao percorrido NAO traz o delta');
checa(!!fechado.tx, 'o ramo nao percorrido mostra o texto que o jogador ja leu na tela');

/* Os finais: so o alcancado abre. */
const fins = W.Arvore.finais();
checa(fins.length === (W.ENDINGS || []).length, 'os nove finais entram na lista');

const vis = fins.find(f => f.id === 'arquivo');
const oco = fins.find(f => f.id === 'divida');
checa(vis.visto && !!vis.condicao, 'o final alcancado abre a condicao');
checa(!oco.visto && oco.condicao === '', 'o final nao alcancado NAO abre a condicao');
checa(oco.eixos.length >= 1, 'o final nao alcancado mostra os eixos, e so');
checa(/alta|baixa/.test(oco.eixos.join(' ')),
      'o eixo do final nao alcancado traz a direcao');
checa(typeof oco.ordem === 'number', 'o final nao alcancado tem numero de ordem');

/* Render: o texto de um ramo fechado nao pode estar no DOM. */
W.Menu.init();
W.Menu.openConta();
/* getElementById, e nao querySelector: o seletor por id nao esta no
   subconjunto que tools/minidom.js implementa, e um querySelector que
   devolve null passaria como "nao montou" sem ser verdade. */
const painel = win.document.getElementById('rf-conta-body');
checa(!!painel, 'a pagina A Conta monta');

const abas = win.document.querySelectorAll('.rf-conta__aba');
const aba  = Array.prototype.filter.call(abas, b => /rvore/.test(b.textContent))[0];
checa(!!aba, 'a aba A Arvore existe');
if (aba) { aba.dispatchEvent(MD.makeEvent('click')); }

const corpo = win.document.querySelector('.rbf-arv');
checa(!!corpo, 'o corpo da arvore monta');

if (corpo) {
  const txt = corpo.textContent;
  const efeitoFechado = ((A.escolhas.cap1_aldric.opts.A || {}).efeito || '').slice(0, 40);
  checa(txt.indexOf(efeitoFechado) === -1,
        'a consequencia do ramo fechado NAO aparece no DOM');
  const efeitoAberto = ((A.escolhas.cap1_aldric.opts.B || {}).efeito || '').slice(0, 40);
  checa(txt.indexOf(efeitoAberto) !== -1,
        'a consequencia do ramo percorrido aparece no DOM');
  checa(txt.indexOf('ramo n') !== -1, 'o ramo fechado aparece como lacuna, e nao some');

  const condOculta = (A.finais.divida.condicao || '').slice(0, 30);
  checa(txt.indexOf(condOculta) === -1,
        'a condicao do final nao alcancado NAO aparece no DOM');
}

console.log('\n' + (falhas ? falhas + ' FALHA(S)' : 'TUDO OK'));
process.exit(falhas ? 1 : 0);
