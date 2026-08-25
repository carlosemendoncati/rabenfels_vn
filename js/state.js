/* ==========================================================================
   ARQUIVO RABENFELS - js/state.js

   Maquina de estados da aplicacao.

   Existe um unico estado ativo por vez. Quem quiser saber se pode
   processar clique, tecla ou avanco de roteiro pergunta aqui, nunca
   deduz por conta propria.

   Estados:
     title       tela de titulo
     playing     roteiro correndo
     paused      menu de jogo aberto
     save        painel de save
     load        painel de load
     settings    painel de ajustes
     history     historico de dialogo
     credits     creditos
     conta       a pagina de "A Conta" - extra pos-jogo em tela cheia
     percurso    o trecho jogado de cima da rota Cobertura
     modal       confirmacao ou aviso por cima de outro estado
     transition  transicao em andamento, nenhuma entrada aceita

   O estado anterior fica empilhado, para que fechar um painel devolva
   exatamente a tela de onde ele foi aberto.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.State = (function () {
  'use strict';

  var STATES = [
    'title',
    'playing',
    'paused',
    'save',
    'load',
    'settings',
    'history',
    'credits',
    'conta',
    'percurso',
    'modal',
    'transition'
  ];

  var current   = 'title';
  var stack     = [];
  var listeners = [];

  /* Estados em que o roteiro pode avancar. */
  var GAMEPLAY = { playing: true };

  /* 'percurso' nao entra em GAMEPLAY nem em OVERLAY, e a ausencia nos
     dois e o ponto. Fora de GAMEPLAY o clique no palco nao adianta beat
     - o roteiro esta parado esperando o percurso terminar. Fora de
     OVERLAY a entrada de teclado nao e desviada para a interface, que e
     o que permite ao percurso ler as setas. */

  /* Estados que representam uma interface por cima do jogo. */
  var OVERLAY = {
    paused:   true,
    save:     true,
    load:     true,
    settings: true,
    history:  true,
    credits:  true,
    conta:    true,
    modal:    true
  };

  function isValid(name) {
    for (var i = 0; i < STATES.length; i++) {
      if (STATES[i] === name) { return true; }
    }
    return false;
  }

  function notify(from, to) {
    for (var i = 0; i < listeners.length; i++) {
      try {
        listeners[i](to, from);
      } catch (e) {
        if (RBF.CONFIG && RBF.CONFIG.debug && typeof console !== 'undefined') {
          console.warn('[rabenfels] listener de estado falhou', e);
        }
      }
    }
  }

  /* Troca o estado descartando o anterior. */
  function set(name) {
    if (!isValid(name)) {
      if (RBF.CONFIG && RBF.CONFIG.debug && typeof console !== 'undefined') {
        console.warn('[rabenfels] estado invalido: ' + name);
      }
      return current;
    }
    if (name === current) { return current; }
    var from = current;
    current = name;
    notify(from, name);
    return current;
  }

  /* Abre um estado guardando o atual para voltar depois. */
  function push(name) {
    if (!isValid(name)) { return current; }
    stack.push(current);
    var from = current;
    current = name;
    notify(from, name);
    return current;
  }

  /* Volta ao estado guardado. Sem pilha, cai no destino informado. */
  function pop(fallback) {
    var target = stack.length ? stack.pop() : (fallback || 'title');
    var from = current;
    current = target;
    notify(from, target);
    return current;
  }

  function clearStack() {
    stack.length = 0;
  }

  function get() { return current; }

  function is(name) { return current === name; }

  /* O roteiro so avanca em 'playing'. */
  function canAdvanceScript() { return GAMEPLAY[current] === true; }

  /* Existe interface aberta por cima do palco? */
  function hasOverlay() { return OVERLAY[current] === true; }

  /* Entrada de teclado vai para a interface, nao para o roteiro. */
  function inputGoesToUI() { return hasOverlay(); }

  function onChange(fn) {
    if (typeof fn === 'function') { listeners.push(fn); }
  }

  function depth() { return stack.length; }

  return {
    STATES:           STATES,
    set:              set,
    push:             push,
    pop:              pop,
    clearStack:       clearStack,
    get:              get,
    is:               is,
    canAdvanceScript: canAdvanceScript,
    hasOverlay:       hasOverlay,
    inputGoesToUI:    inputGoesToUI,
    onChange:         onChange,
    depth:            depth
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RBF.State;
}
