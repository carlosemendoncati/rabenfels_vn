/* ==========================================================================
   ARQUIVO RABENFELS - js/paginas.js

   AS QUATRO PAGINAS - montagem.

   O texto vive em js/data/quatro_paginas.js. Este arquivo so escolhe a
   variante de cada pagina a partir das flags da partida concluida e
   devolve uma estrutura pronta para o menu desenhar.

   ------------------------------------------------------------------
   REGRA DE LIBERACAO
   ------------------------------------------------------------------
   Abre com a obra terminada, e so. Nada aqui e liberado para
   demonstracao: RBF.Saves.lastRun() so existe depois de um beat
   'end_chap' com completes:true, que hoje so o Epilogo tem.

   O jogador que nao terminou nao ve o item no menu. O jogador que
   terminou ve as quatro paginas DELE - as escolhas que ele fez,
   escritas na voz do Compilador, que e o documento que teria sustentado
   o processo e que Antoniette arrancou de proposito.

   ------------------------------------------------------------------
   POR QUE LER DO PROGRESSO E NAO DO ESTADO VIVO
   ------------------------------------------------------------------
   RBF.STATE some quando o jogador volta ao menu e comeca outra partida.
   O extra tem de sobreviver a isso, entao le a fotografia gravada em
   localStorage no fim da partida - nunca o run em andamento.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.Paginas = (function () {
  'use strict';

  function dados() { return RBF.QUATRO_PAGINAS || null; }

  /* Terminou a obra pelo menos uma vez? */
  function available() {
    return !!(dados() && RBF.Saves && RBF.Saves.hasCompleted && RBF.Saves.hasCompleted());
  }

  /* Escolhe a variante de uma pagina pelo valor da flag no run gravado.
     Devolve null quando a flag nao existe no run - o que so acontece com
     save de versao anterior ao extra. Nesse caso a pagina aparece como
     lacuna, e nao como texto errado. */
  function variante(pag, flags) {
    if (!pag || !pag.vars) { return null; }
    var v = flags ? flags[pag.flag] : undefined;
    if (v === undefined || v === null) { return null; }
    return pag.vars[String(v)] || null;
  }

  /* Monta o documento inteiro a partir da ultima partida concluida.

     Retorno:
       { cabecalho:[...], fecho:[...], ending:'...', paginas:[
           { num, titulo, lns:[...], margem, mao, lacuna:false }
       ]}
     ou null se a obra nao foi terminada.                              */
  function build() {
    if (!available()) { return null; }

    var d   = dados();
    var run = RBF.Saves.lastRun();
    var fl  = (run && run.flags) || {};

    var out = [];
    for (var i = 0; i < d.paginas.length; i++) {
      var pag = d.paginas[i];
      var vr  = variante(pag, fl);

      if (!vr) {
        out.push({
          num:    pag.num,
          titulo: pag.titulo,
          lns:    [],
          margem: '',
          mao:    '',
          lacuna: true
        });
        continue;
      }

      out.push({
        num:    pag.num,
        titulo: pag.titulo,
        lns:    vr.lns.slice(),
        margem: vr.margem || '',
        mao:    vr.mao || '',
        lacuna: false
      });
    }

    return {
      cabecalho: d.cabecalho.slice(),
      fecho:     d.fecho.slice(),
      ending:    (run && run.ending) || null,
      paginas:   out
    };
  }

  /* Rotulo do final alcancado, para o subtitulo do painel. Le a tabela
     declarada em RBF.ENDINGS para nao duplicar nome de final aqui. */
  function endingLabel(id) {
    if (!id || !RBF.ENDINGS) { return ''; }
    for (var i = 0; i < RBF.ENDINGS.length; i++) {
      if (RBF.ENDINGS[i].id === id) { return RBF.ENDINGS[i].label || ''; }
    }
    return '';
  }

  /* Quantos dos finais declarados o jogador ja viu. Usado pelo menu. */
  function endingProgress() {
    var total = (RBF.ENDINGS && RBF.ENDINGS.length) || 0;
    var vistos = (RBF.Saves && RBF.Saves.endingsSeen) ? RBF.Saves.endingsSeen() : [];
    return { seen: vistos.length, total: total, ids: vistos };
  }

  return {
    available:       available,
    build:           build,
    endingLabel:     endingLabel,
    endingProgress:  endingProgress
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RBF.Paginas;
}
