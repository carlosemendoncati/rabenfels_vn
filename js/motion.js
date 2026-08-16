/* ==========================================================================
   ARQUIVO RABENFELS - js/motion.js

   Controlador central de movimento.

   Antes deste modulo, cada transicao era uma classe somada a mao mais um
   setTimeout com o numero copiado do CSS. Isso quebra de tres jeitos, e
   os tres ja aconteceram neste projeto:

     1. o numero do JS e o do CSS saem de sincronia e a classe some antes
        (ou muito depois) da animacao terminar;
     2. navegacao rapida empilha timers, e o ultimo a disparar limpa a
        classe de uma animacao que ainda esta rodando - o elemento fica
        preso no meio;
     3. clique repetido dispara a mesma acao duas vezes.

   Aqui a regra e uma so: quem pede movimento entrega o elemento e a
   classe. O modulo garante que a classe entra, sai e nunca fica presa.

   Como o fim e detectado:
     - 'animationend' quando o navegador dispara (caminho normal);
     - um temporizador de seguranca com folga, para o caso de o evento
       nao vir. Ele SEMPRE existe. Sem navegador de verdade - o DOM
       proprio de tools/minidom.js, que roda o jogo inteiro em
       tools/validate.js - nenhuma animacao dispara evento, e o
       temporizador e o unico caminho. O jogo tem que continuar
       funcionando ali, entao ele nao pode depender do evento.

   Movimento reduzido: respeita a preferencia do sistema
   (prefers-reduced-motion) e o ajuste do jogo (RBF.Settings). Nesse
   modo nada e cancelado nem pulado - a mudanca de estado continua
   acontecendo, so nao viaja pela tela. O CSS ja encurta as duracoes;
   aqui encurtamos a espera junto, para a classe nao ficar sobrando.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.Motion = (function () {
  'use strict';

  /* Margem sobre a duracao declarada. O temporizador de seguranca precisa
     perder para o evento no caso normal; se empatasse, cortaria o ultimo
     quadro da animacao em maquina lenta. */
  var SAFETY = 90;

  /* Portoes de acao por chave, para clique repetido. */
  var gates = {};

  /* ----------------------------------------------------------------------
     PREFERENCIA DE MOVIMENTO
     ---------------------------------------------------------------------- */

  function systemReduced() {
    /* matchMedia nao existe no DOM proprio do validador. */
    if (typeof window === 'undefined' || !window.matchMedia) { return false; }
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches === true;
    } catch (e) {
      return false;
    }
  }

  function settingReduced() {
    if (!RBF.Settings || !RBF.Settings.get) { return false; }
    return RBF.Settings.get('reducedMotion') === true;
  }

  function reduced() {
    return systemReduced() || settingReduced();
  }

  /* Duracao efetiva de uma espera. Em movimento reduzido o CSS ja force
     1ms de animacao; a espera acompanha para a classe sair junto. */
  function dur(ms) {
    if (reduced()) { return 20; }
    return ms;
  }

  /* ----------------------------------------------------------------------
     ESTADO POR ELEMENTO

     Guardado como propriedade do proprio no, e nao em WeakMap: o no
     morre, o estado morre junto, e funciona igual no DOM do validador.
     ---------------------------------------------------------------------- */

  function stateOf(el) {
    if (!el.__rbfMotion) {
      el.__rbfMotion = { timer: null, cls: '', onEnd: null, done: null };
    }
    return el.__rbfMotion;
  }

  /* Encerra o que estiver rodando no elemento. 'settle' decide se a
     classe fica (animacao chegou ao fim) ou sai (foi cancelada). */
  function finish(el, settle) {
    var st = stateOf(el);
    if (!st.cls) { return; }

    var cls  = st.cls;
    var done = st.done;

    if (st.timer) { clearTimeout(st.timer); st.timer = null; }
    if (st.onEnd && el.removeEventListener) {
      try { el.removeEventListener('animationend', st.onEnd); } catch (e) { /* ignora */ }
    }

    st.cls   = '';
    st.onEnd = null;
    st.done  = null;

    el.classList.remove(cls);

    /* O callback so corre quando a animacao terminou de verdade. Uma
       animacao cancelada por outra nao dispara o 'done' da anterior:
       era assim que o painel antigo fechava o painel novo. */
    if (settle && done) { done(); }
  }

  /* ----------------------------------------------------------------------
     RODAR UMA ANIMACAO

     el    elemento
     cls   classe que dispara a animacao no CSS
     ms    duracao declarada no CSS para essa classe
     done  opcional, chamado quando termina (nao quando e cancelado)
     ---------------------------------------------------------------------- */

  function run(el, cls, ms, done) {
    if (!el || !el.classList) { return; }

    /* Cancela o que estava rodando neste no, sem disparar o 'done' dele. */
    finish(el, false);

    var st = stateOf(el);
    st.cls  = cls;
    st.done = done || null;

    /* Reinicia a animacao. Sem ler offsetWidth entre remover e somar, o
       navegador junta as duas mudancas no mesmo quadro e nao ha
       animacao nenhuma - o classico "so anima na primeira vez". */
    el.classList.remove(cls);
    if (typeof el.offsetWidth === 'number') { void el.offsetWidth; }
    el.classList.add(cls);

    /* Caminho normal. Precisa ignorar animacao de elemento filho que
       sobe por bolha, ou uma peca interna encerra a do pai. */
    if (el.addEventListener) {
      st.onEnd = function (ev) {
        if (ev && ev.target && ev.target !== el) { return; }
        finish(el, true);
      };
      el.addEventListener('animationend', st.onEnd);
    }

    /* Rede de seguranca. Sempre armada. */
    st.timer = setTimeout(function () {
      finish(el, true);
    }, dur(ms) + SAFETY);
  }

  /* Cancela sem completar. Usado ao destruir um painel. */
  function cancel(el) {
    if (!el || !el.classList) { return; }
    finish(el, false);
  }

  /* ----------------------------------------------------------------------
     ENTRADA E SAIDA

     Duas funcoes em vez de um 'toggle' porque entrada e saida tem
     desenhos diferentes de proposito. Quem sai nao roda a entrada ao
     contrario.
     ---------------------------------------------------------------------- */

  function enter(el, cls, ms, done) { run(el, cls, ms, done); }

  /* Saida remove o no ao fim, se ele ainda tiver pai. O 'done' corre
     antes da remocao, para quem chamou poder ler o elemento. */
  function exit(el, cls, ms, done) {
    if (!el) { return; }
    run(el, cls, ms, function () {
      if (done) { done(); }
      if (el.parentNode) { el.parentNode.removeChild(el); }
    });
  }

  /* ----------------------------------------------------------------------
     ESCALONAMENTO

     Grava --rbf-order em cada no. O CSS multiplica por --rbf-step e
     chega no atraso. Assim a lista pode ter qualquer tamanho: antes os
     atrasos estavam escritos um a um em :nth-child, e o oitavo registro
     do menu entrava sem atraso nenhum porque a regra parava no setimo.
     ---------------------------------------------------------------------- */

  function stagger(nodes, from) {
    if (!nodes) { return; }
    var base = from || 0;
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i] && nodes[i].style && nodes[i].style.setProperty) {
        nodes[i].style.setProperty('--rbf-order', String(base + i));
      }
    }
  }

  /* ----------------------------------------------------------------------
     PORTAO DE ACAO

     Impede que o mesmo comando dispare duas vezes enquanto a primeira
     ainda esta em curso - clique duplo, Enter repetido, clique junto
     com tecla. Devolve true quando a acao PODE correr.

     A trava e por tempo e nao por promessa: se a acao morrer no meio
     por qualquer motivo, o portao reabre sozinho e o jogo nao fica
     travado para sempre.
     ---------------------------------------------------------------------- */

  function gate(key, ms) {
    var now = (typeof Date.now === 'function') ? Date.now() : new Date().getTime();
    var until = gates[key] || 0;
    if (now < until) { return false; }
    gates[key] = now + (ms || 400);
    return true;
  }

  function clearGate(key) {
    if (key) { delete gates[key]; return; }
    gates = {};
  }

  return {
    run:        run,
    enter:      enter,
    exit:       exit,
    cancel:     cancel,
    stagger:    stagger,
    gate:       gate,
    clearGate:  clearGate,
    reduced:    reduced,
    duration:   dur
  };
})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.Motion; }
