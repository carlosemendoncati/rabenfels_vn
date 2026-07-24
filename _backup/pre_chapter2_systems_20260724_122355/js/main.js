/* ==========================================================================
   ARQUIVO RABENFELS - js/main.js
   Boot. Monta o roteiro completo e entrega ao engine.
   Para adicionar o Capitulo 2: criar js/data/chapter2.js, incluir o
   <script> em index.html e acrescentar RBF.CHAPTER2 na lista abaixo.
   ========================================================================== */

(function () {
  'use strict';

  function boot() {
    var script = [];
    var parts  = [RBF.PROLOGUE, RBF.CHAPTER1];

    for (var i = 0; i < parts.length; i++) {
      if (parts[i] && parts[i].length) { script = script.concat(parts[i]); }
    }

    if (!script.length) {
      if (typeof console !== 'undefined') { console.error('[rabenfels] roteiro vazio'); }
      return;
    }
    RBF.Engine.start(script);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
