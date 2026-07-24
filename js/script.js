/* ==========================================================================
   ARQUIVO RABENFELS - js/script.js

   Montagem do roteiro em execucao.

   O roteiro base e a concatenacao dos capitulos declarados em
   RBF.CHAPTERS. Escolhas injetam os beats da opcao escolhida logo apos
   o beat de escolha, o que muda os indices do array.

   Para que um save por indice continue valido, a montagem precisa ser
   deterministica: dado o mesmo registro de escolhas, o array resultante
   e sempre identico. E o que build() garante.

   Cada beat de escolha tem um id estavel. O registro de escolhas e um
   objeto { idDaEscolha: idDaOpcao } gravado no save.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.Script = (function () {
  'use strict';

  /* ---- roteiro base ----------------------------------------------------- */

  function base() {
    var out = [];
    for (var i = 0; i < RBF.CHAPTERS.length; i++) {
      var part = RBF[RBF.CHAPTERS[i].data];
      if (part && part.length) { out = out.concat(part); }
    }
    return out;
  }

  /* ---- montagem com escolhas ja tomadas --------------------------------- */

  /* choiceLog: { choiceId: optionId }
     A ordem de aplicacao segue a ordem em que os beats de escolha
     aparecem no roteiro, nao a ordem de insercao no objeto. Isso mantem
     o resultado estavel entre sessoes. */
  function build(choiceLog) {
    var script = base();
    if (!choiceLog) { return script; }

    var i = 0;
    while (i < script.length) {
      var beat = script[i];
      if (beat && beat.t === 'cho' && beat.id &&
          Object.prototype.hasOwnProperty.call(choiceLog, beat.id)) {

        var opt = findOption(beat, choiceLog[beat.id]);
        if (opt && opt.then && opt.then.length) {
          var args = [i + 1, 0].concat(opt.then);
          Array.prototype.splice.apply(script, args);
          i += opt.then.length;
        }
      }
      i += 1;
    }
    return script;
  }

  function findOption(choiceBeat, optionId) {
    for (var i = 0; i < choiceBeat.opts.length; i++) {
      if (choiceBeat.opts[i].id === optionId) { return choiceBeat.opts[i]; }
    }
    return null;
  }

  /* ---- consultas -------------------------------------------------------- */

  function chapterById(id) {
    for (var i = 0; i < RBF.CHAPTERS.length; i++) {
      if (RBF.CHAPTERS[i].id === id) { return RBF.CHAPTERS[i]; }
    }
    return null;
  }

  function chapterLabel(id) {
    var c = chapterById(id);
    return c ? c.label : (id || '');
  }

  function chapterTitle(id) {
    var c = chapterById(id);
    return c ? c.title : '';
  }

  /* Indice do primeiro beat de um capitulo dentro de um roteiro montado. */
  function chapterStart(script, chapterId) {
    for (var i = 0; i < script.length; i++) {
      var b = script[i];
      if (b && b.t === 'scene' && b.chapter === chapterId) { return i; }
      if (b && b.t === 'chap' && b.chapter === chapterId) { return i; }
    }
    return -1;
  }

  /* Todos os beats de escolha do roteiro base, para validacao. */
  function choices() {
    var out = [];
    var s = base();
    for (var i = 0; i < s.length; i++) {
      if (s[i].t === 'cho') { out.push(s[i]); }
    }
    return out;
  }

  /* Titulo legivel de uma cena, para a previa do save. */
  function sceneLabel(script, index) {
    for (var i = Math.min(index, script.length - 1); i >= 0; i--) {
      var b = script[i];
      if (b && b.t === 'scene') { return b.title || b.id || ''; }
    }
    return '';
  }

  return {
    base:         base,
    build:        build,
    chapterById:  chapterById,
    chapterLabel: chapterLabel,
    chapterTitle: chapterTitle,
    chapterStart: chapterStart,
    choices:      choices,
    sceneLabel:   sceneLabel
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RBF.Script;
}
