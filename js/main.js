/* ==========================================================================
   ARQUIVO RABENFELS - js/main.js

   Boot. Ordem de inicializacao:

     1. ajustes persistidos, para que volume e velocidade de texto ja
        valham na primeira tela
     2. engine preparado, mas sem comecar o roteiro
     3. menu de titulo

   O jogo nao comeca sozinho. Quem inicia e o jogador, pela tela de
   titulo. Isso tambem resolve a politica de autoplay: quando o roteiro
   comeca, ja houve um clique.

   Para adicionar um capitulo: criar js/data/chapterN.js, incluir a tag
   <script> em index.html e registrar o capitulo em RBF.CHAPTERS
   (js/config.js). Nada aqui precisa mudar.
   ========================================================================== */

(function () {
  'use strict';

  function missing() {
    var required = [
      'CONFIG', 'CHARACTERS', 'BACKGROUNDS', 'BGM', 'SFX', 'MUSIC', 'UI_SFX',
      'CHAPTERS', 'STORAGE', 'SETTINGS_DEFAULT', 'UI_TEXT', 'CREDITS',
      'ARCHIVE', 'INTRO', 'MENU_AUDIO', 'MENU_RECORDS', 'WARNING', 'ROUTES',
      'Assets', 'Audio', 'Storage', 'Settings', 'History', 'Routes',
      'State', 'Script', 'Saves', 'Gallery', 'UI', 'Engine', 'Menu'
    ];
    var out = [];
    for (var i = 0; i < required.length; i++) {
      if (!RBF[required[i]]) { out.push(required[i]); }
    }
    return out;
  }

  function boot() {
    var gaps = missing();
    if (gaps.length) {
      if (typeof console !== 'undefined') {
        console.error('[rabenfels] m\u00f3dulos ausentes: ' + gaps.join(', '));
      }
      var hint = document.getElementById('hint');
      if (hint) {
        hint.textContent = 'erro de carregamento: ' + gaps.join(', ');
      }
      return;
    }

    if (!RBF.Script.base().length) {
      if (typeof console !== 'undefined') {
        console.error('[rabenfels] roteiro vazio');
      }
      return;
    }

    RBF.Settings.init();
    RBF.Engine.prepare();
    RBF.Menu.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
