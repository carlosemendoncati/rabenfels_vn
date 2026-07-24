/* ==========================================================================
   ARQUIVO RABENFELS - js/history.js

   Historico de dialogo.

   O engine registra aqui todo beat de texto exibido. O painel de
   historico le esta lista. O save grava um recorte dela para que o
   historico sobreviva a um load.

   Nao guarda beats de controle, so o que o jogador leu.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.History = (function () {
  'use strict';

  /* Limite alto o bastante para um capitulo inteiro e baixo o bastante
     para nao inchar o save. Entradas antigas caem pela frente. */
  var LIMIT       = 400;
  var SAVE_LIMIT  = 120;

  var entries = [];

  /* kind: 'nar' | 'inn' | 'dial' | 'arc' | 'last'
     speaker: id do personagem, ou null
     text: texto ja pronto para exibicao */
  function push(kind, speaker, text, chapterId, sceneId) {
    if (!text) { return; }

    var last = entries[entries.length - 1];
    if (last && last.kind === kind && last.text === text && last.speaker === speaker) {
      return;   /* repeticao imediata: nao duplica */
    }

    entries.push({
      kind:    kind,
      speaker: speaker || null,
      text:    text,
      chapter: chapterId || null,
      scene:   sceneId || null
    });

    if (entries.length > LIMIT) {
      entries.splice(0, entries.length - LIMIT);
    }
  }

  function all() {
    return entries.slice();
  }

  function last(n) {
    return entries.slice(Math.max(0, entries.length - n));
  }

  function isEmpty() {
    return entries.length === 0;
  }

  function clear() {
    entries.length = 0;
  }

  /* Recorte gravado no save. */
  function serialize() {
    return last(SAVE_LIMIT);
  }

  function restore(list) {
    entries.length = 0;
    if (!list || !list.length) { return; }
    for (var i = 0; i < list.length; i++) {
      var e = list[i];
      if (!e || typeof e.text !== 'string') { continue; }
      entries.push({
        kind:    e.kind || 'nar',
        speaker: e.speaker || null,
        text:    e.text,
        chapter: e.chapter || null,
        scene:   e.scene || null
      });
    }
  }

  /* Ultima fala util para a previa do save. */
  function excerpt(maxChars) {
    var limit = maxChars || 90;
    for (var i = entries.length - 1; i >= 0; i--) {
      var e = entries[i];
      if (!e.text) { continue; }
      var t = e.text.replace(/\s+/g, ' ').trim();
      if (!t) { continue; }
      if (t.length > limit) { t = t.slice(0, limit - 1) + '\u2026'; }
      return e.speaker && RBF.CHARACTERS[e.speaker]
        ? RBF.CHARACTERS[e.speaker].name + ': ' + t
        : t;
    }
    return '';
  }

  return {
    push:      push,
    all:       all,
    last:      last,
    isEmpty:   isEmpty,
    clear:     clear,
    serialize: serialize,
    restore:   restore,
    excerpt:   excerpt,
    limit:     LIMIT
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RBF.History;
}
