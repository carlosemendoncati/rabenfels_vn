/* ==========================================================================
   ARQUIVO RABENFELS - js/menu.js

   Tela de titulo, menu de jogo e todos os paineis.

   Cada painel e montado na abertura e destruido no fechamento, entao
   nenhum listener sobrevive para ser registrado duas vezes. Os unicos
   listeners permanentes sao os da tela de titulo e os da barra de jogo,
   registrados uma unica vez em init().
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.Menu = (function () {
  'use strict';

  var UI = null;
  var el = {};
  var initialized = false;

  function grab() {
    UI = RBF.UI;
    el.title       = document.getElementById('main-menu');
    el.titleBtns   = document.getElementById('main-menu-actions');
    el.version     = document.getElementById('main-menu-version');
    el.gameBar     = document.getElementById('game-bar');
    el.menuButton  = document.getElementById('btn-menu');
    el.overlayRoot = document.getElementById('ui-root');
    el.stage       = document.getElementById('vn');
  }

  /* ======================================================================
     TELA DE TITULO
     ====================================================================== */

  function showTitle() {
    RBF.State.clearStack();
    RBF.State.set('title');

    UI.closePanel();
    el.title.classList.add('show');
    el.gameBar.classList.remove('show');

    renderTitleButtons();
  }

  function hideTitle() {
    el.title.classList.remove('show');
    el.gameBar.classList.add('show');
  }

  function renderTitleButtons() {
    UI.clear(el.titleBtns);

    var latest   = RBF.Saves.latest();
    var hasSave  = latest !== null;
    var progress = RBF.Saves.readProgress();

    el.titleBtns.appendChild(titleButton('Novo Jogo', function () {
      if (RBF.Engine.hasStarted() || hasSave) {
        UI.confirm({
          title:   'Come\u00e7ar de novo?',
          message: 'Um novo jogo come\u00e7a do Pr\u00f3logo. Seus saves manuais ' +
                   'continuam guardados; s\u00f3 o progresso desta sess\u00e3o \u00e9 descartado.',
          confirmLabel: 'Come\u00e7ar',
          onConfirm: startNewGame
        });
        return;
      }
      startNewGame();
    }));

    var cont = titleButton('Continuar', function () {
      var save = RBF.Saves.latest();
      if (!save) { return; }
      doLoad(save.data);
    });
    if (!hasSave) {
      cont.classList.add('disabled');
      cont.setAttribute('aria-disabled', 'true');
      cont.title = 'nenhum save dispon\u00edvel';
    } else {
      cont.appendChild(UI.el('span', 'rbf-title-btn-note',
        latest.chapter + (latest.scene ? ' \u00b7 ' + latest.scene : '')));
    }
    el.titleBtns.appendChild(cont);

    el.titleBtns.appendChild(titleButton('Carregar Jogo', function () {
      openSaveLoad('load');
    }));

    /* Selecao de capitulo aparece apenas depois que ha mais de um
       capitulo alcancado. Antes disso a opcao seria vazia. */
    if (progress.chaptersReached.length > 1) {
      el.titleBtns.appendChild(titleButton('Cap\u00edtulos', openChapterSelect));
    }

    el.titleBtns.appendChild(titleButton('Ajustes', openSettings));
    el.titleBtns.appendChild(titleButton('Cr\u00e9ditos', openCredits));

    el.version.textContent = 'vers\u00e3o ' + RBF.CONFIG.gameVersion +
      (RBF.Storage.isPersistent() ? '' : ' \u00b7 saves apenas nesta sess\u00e3o');
  }

  function titleButton(label, onClick) {
    var b = UI.el('button', 'rbf-title-btn');
    b.type = 'button';
    b.appendChild(UI.el('span', 'rbf-title-btn-label', label));
    b.addEventListener('click', function (ev) {
      ev.stopPropagation();
      if (b.classList.contains('disabled')) { return; }
      RBF.Audio.unlock();
      onClick();
    });
    return b;
  }

  function startNewGame() {
    UI.closePanel();
    hideTitle();
    RBF.Engine.newGame();
  }

  function doLoad(data) {
    var problem = RBF.Saves.validate(data);
    if (problem) {
      UI.notice('Save inv\u00e1lido', problem);
      return;
    }
    UI.closePanel();
    hideTitle();
    RBF.Engine.loadFrom(data);
    UI.toast('Jogo carregado.');
  }

  /* ======================================================================
     MENU DE JOGO
     ====================================================================== */

  function openGameMenu() {
    if (!RBF.Engine.hasStarted()) { return; }
    if (RBF.State.is('paused')) { closeGameMenu(); return; }
    if (RBF.State.hasOverlay()) { return; }

    RBF.Engine.pause();
    RBF.State.push('paused');

    var body = UI.el('div', 'rbf-menu-grid');

    body.appendChild(menuItem('Continuar', 'volta para onde parou', closeGameMenu));

    body.appendChild(menuItem('Salvar', 'escolher um espa\u00e7o', function () {
      if (!RBF.Engine.canSave()) {
        UI.notice('Ainda n\u00e3o', 'Espere a fala terminar de aparecer para salvar.');
        return;
      }
      openSaveLoad('save');
    }));

    body.appendChild(menuItem('Carregar', 'voltar a um save', function () {
      openSaveLoad('load');
    }));

    body.appendChild(menuItem('Save r\u00e1pido', 'tecla F5', quickSave));
    body.appendChild(menuItem('Load r\u00e1pido', 'tecla F9', quickLoad));

    body.appendChild(menuItem('Hist\u00f3rico', 'reler o que passou', openHistory));
    body.appendChild(menuItem('Ajustes', 'texto, \u00e1udio e autosave', openSettings));

    body.appendChild(menuItem('Voltar ao t\u00edtulo', 'sai da partida atual', confirmReturnToTitle));

    UI.panel({
      name:  'gamemenu',
      title: 'Menu',
      subtitle: RBF.Script.chapterLabel(RBF.STATE.chapter) +
                (RBF.STATE.sceneTitle ? ' \u00b7 ' + RBF.STATE.sceneTitle : ''),
      body:  body,
      onClose: onGameMenuClosed
    });
  }

  function menuItem(label, hint, onClick) {
    var b = UI.el('button', 'rbf-menu-item');
    b.type = 'button';
    b.appendChild(UI.el('span', 'rbf-menu-item-label', label));
    if (hint) { b.appendChild(UI.el('span', 'rbf-menu-item-hint', hint)); }
    b.addEventListener('click', function (ev) {
      ev.stopPropagation();
      onClick();
    });
    return b;
  }

  function closeGameMenu() {
    UI.closePanel();
  }

  /* Chamado sempre que um painel fecha estando o jogo pausado. */
  function onGameMenuClosed() {
    if (RBF.State.is('paused')) {
      RBF.State.pop('playing');
      if (RBF.State.is('playing')) { RBF.Engine.resume(); }
    }
  }

  function confirmReturnToTitle() {
    UI.confirm({
      title:   'Voltar ao t\u00edtulo?',
      message: 'O progresso n\u00e3o salvo desta partida ser\u00e1 perdido. ' +
               'O autosave mais recente continua dispon\u00edvel.',
      confirmLabel: 'Voltar ao t\u00edtulo',
      danger: true,
      onConfirm: function () {
        UI.closePanel();
        RBF.State.clearStack();
        RBF.Engine.stop();
        showTitle();
      }
    });
  }

  /* ======================================================================
     SAVE E LOAD
     ====================================================================== */

  function openSaveLoad(mode) {
    var fromTitle = RBF.State.is('title');
    RBF.State.push(mode === 'save' ? 'save' : 'load');

    var body = UI.el('div', 'rbf-savepanel');

    var list = UI.slotList(
      mode,
      function (slot) { onSlotPicked(mode, slot); },
      function (slot) { onSlotDelete(mode, slot); },
      function (slot) { RBF.Saves.exportSlot(slot.id); }
    );
    body.appendChild(list);

    var actions = [
      {
        label: 'Importar arquivo',
        className: 'rbf-btn-ghost',
        onClick: function () { importFlow(mode); }
      },
      {
        label: 'Fechar',
        className: 'rbf-btn-primary',
        onClick: function () { UI.closePanel(); }
      }
    ];

    UI.panel({
      name:  'saveload',
      title: mode === 'save' ? 'Salvar jogo' : 'Carregar jogo',
      subtitle: mode === 'save'
        ? 'Escolha um espa\u00e7o. Espa\u00e7o ocupado pede confirma\u00e7\u00e3o.'
        : 'Escolha um save v\u00e1lido.',
      body:  body,
      wide:  true,
      actions: actions,
      onClose: function () {
        RBF.State.pop(fromTitle ? 'title' : 'paused');
        if (RBF.State.is('paused')) { openGameMenu(); }
      }
    });
  }

  function onSlotPicked(mode, slot) {
    if (mode === 'save') {
      if (slot.id === RBF.Saves.AUTOSAVE) {
        UI.notice('Espa\u00e7o autom\u00e1tico',
                  'O autosave \u00e9 gravado pelo jogo. Escolha outro espa\u00e7o.');
        return;
      }
      if (!slot.empty && RBF.Settings.get('confirmDestructive')) {
        UI.confirm({
          title:   'Sobrescrever?',
          message: slot.label + ' j\u00e1 tem um save de ' +
                   RBF.Saves.formatDate(slot.updatedAt) + '.',
          confirmLabel: 'Sobrescrever',
          danger: true,
          onConfirm: function () { writeSlot(slot); }
        });
        return;
      }
      writeSlot(slot);
      return;
    }

    /* modo load */
    if (slot.empty || slot.broken) { return; }

    if (RBF.Engine.hasStarted() && RBF.Settings.get('confirmDestructive')) {
      UI.confirm({
        title:   'Carregar este save?',
        message: 'O progresso n\u00e3o salvo da partida atual ser\u00e1 perdido.',
        confirmLabel: 'Carregar',
        danger: true,
        onConfirm: function () { doLoad(slot.data); }
      });
      return;
    }
    doLoad(slot.data);
  }

  function writeSlot(slot) {
    if (!RBF.Engine.canSave()) {
      UI.notice('Ainda n\u00e3o', 'Espere a fala terminar de aparecer para salvar.');
      return;
    }
    var written = RBF.Saves.saveToSlot(slot.id, RBF.Engine.snapshot());
    if (!written) {
      UI.notice('Falha ao salvar',
                'O navegador recusou a grava\u00e7\u00e3o. Pode ser falta de espa\u00e7o ' +
                'ou modo an\u00f4nimo. Tente exportar o save como arquivo.');
      return;
    }
    UI.toast('Salvo em ' + slot.label + '.');
    refreshSaveLoad('save');
  }

  function onSlotDelete(mode, slot) {
    UI.confirm({
      title:   'Apagar save?',
      message: slot.label + ' ser\u00e1 apagado. N\u00e3o d\u00e1 para desfazer.',
      confirmLabel: 'Apagar',
      danger: true,
      onConfirm: function () {
        RBF.Saves.deleteSlot(slot.id);
        UI.toast('Save apagado.');
        refreshSaveLoad(mode);
      }
    });
  }

  /* Reabre o painel para refletir a lista atualizada. */
  function refreshSaveLoad(mode) {
    var reopenTo = RBF.State.depth() ? null : null;
    UI.closePanel();
    openSaveLoad(mode);
  }

  function importFlow(mode) {
    var free = firstFreeSlot();
    if (!free) {
      UI.notice('Sem espa\u00e7o livre',
                'Todos os espa\u00e7os manuais est\u00e3o ocupados. Apague um antes de importar.');
      return;
    }
    RBF.Saves.importToSlot(free, function (ok, message) {
      if (!ok) {
        UI.notice('N\u00e3o foi poss\u00edvel importar', message);
        return;
      }
      UI.toast('Save importado no espa\u00e7o ' + free + '.');
      refreshSaveLoad(mode);
    });
  }

  function firstFreeSlot() {
    for (var i = 1; i <= RBF.STORAGE.slotCount; i++) {
      if (!RBF.Saves.hasSlot(String(i))) { return String(i); }
    }
    return null;
  }

  /* ---- save e load rapidos ---------------------------------------------- */

  function quickSave() {
    if (!RBF.Engine.hasStarted()) { return; }
    if (!RBF.Engine.canSave()) {
      UI.toast('Espere a fala terminar para salvar.');
      return;
    }
    var ok = RBF.Saves.quicksave(RBF.Engine.snapshot());
    UI.toast(ok ? 'Save r\u00e1pido gravado.' : 'Falha no save r\u00e1pido.');
  }

  function quickLoad() {
    var data = RBF.Saves.loadSlot(RBF.Saves.QUICKSAVE);
    if (!data) {
      UI.toast('Nenhum save r\u00e1pido.');
      return;
    }
    if (RBF.Engine.hasStarted() && RBF.Settings.get('confirmDestructive')) {
      UI.confirm({
        title:   'Carregar save r\u00e1pido?',
        message: 'O progresso n\u00e3o salvo ser\u00e1 perdido.',
        confirmLabel: 'Carregar',
        danger: true,
        onConfirm: function () { finishQuickLoad(data); }
      });
      return;
    }
    finishQuickLoad(data);
  }

  function finishQuickLoad(data) {
    RBF.State.clearStack();
    doLoad(data);
  }

  /* ======================================================================
     AJUSTES
     ====================================================================== */

  function openSettings() {
    var fromTitle = RBF.State.is('title');
    RBF.State.push('settings');

    var body = UI.el('div', 'rbf-settings');
    var s = RBF.Settings;

    body.appendChild(UI.el('h3', 'rbf-group', 'Texto'));

    body.appendChild(UI.row('Efeito de m\u00e1quina de escrever',
      UI.toggle(s.get('typewriter'), function (v) { s.set('typewriter', v); }),
      'desligado exibe a frase inteira de uma vez'));

    body.appendChild(UI.row('Velocidade do texto',
      UI.slider(s.get('typeSpeedMs'), 0, 60, 1,
        function (v) { return v === 0 ? 'instant\u00e2neo' : v + ' ms'; },
        function (v) { s.set('typeSpeedMs', v); }),
      'menor = mais r\u00e1pido'));

    body.appendChild(UI.row('Tamanho do texto',
      UI.slider(s.get('textSize'), 14, 28, 1,
        function (v) { return v + ' px'; },
        function (v) { s.set('textSize', v); })));

    body.appendChild(UI.el('h3', 'rbf-group', '\u00c1udio'));

    body.appendChild(UI.row('Volume da trilha',
      UI.slider(s.get('bgmVolume'), 0, 1, 0.02,
        function (v) { return Math.round(v * 100) + '%'; },
        function (v) { s.set('bgmVolume', v); })));

    body.appendChild(UI.row('Volume dos efeitos',
      UI.slider(s.get('sfxVolume'), 0, 1, 0.02,
        function (v) { return Math.round(v * 100) + '%'; },
        function (v) { s.set('sfxVolume', v); })));

    body.appendChild(UI.el('h3', 'rbf-group', 'Leitura'));

    body.appendChild(UI.row('Avan\u00e7o autom\u00e1tico',
      UI.toggle(s.get('autoAdvance'), function (v) { s.set('autoAdvance', v); })));

    body.appendChild(UI.row('Espera do avan\u00e7o',
      UI.slider(s.get('autoAdvanceMs'), 800, 6000, 100,
        function (v) { return (v / 1000).toFixed(1) + ' s'; },
        function (v) { s.set('autoAdvanceMs', v); })));

    body.appendChild(UI.el('h3', 'rbf-group', 'Jogo'));

    body.appendChild(UI.row('Autosave a cada cena',
      UI.toggle(s.get('autosaveEnabled'), function (v) { s.set('autosaveEnabled', v); })));

    body.appendChild(UI.row('Confirmar a\u00e7\u00f5es destrutivas',
      UI.toggle(s.get('confirmDestructive'), function (v) { s.set('confirmDestructive', v); }),
      'sobrescrever save, apagar, voltar ao t\u00edtulo'));

    var note = UI.el('p', 'rbf-note',
      RBF.Storage.isPersistent()
        ? 'Ajustes e saves ficam guardados neste navegador.'
        : 'Este navegador bloqueou o armazenamento local. Ajustes e saves ' +
          'valem apenas nesta sess\u00e3o. Use exportar save para n\u00e3o perder progresso.');
    body.appendChild(note);

    UI.panel({
      name:  'settings',
      title: 'Ajustes',
      body:  body,
      actions: [
        {
          label: 'Restaurar padr\u00f5es',
          className: 'rbf-btn-ghost',
          onClick: function () {
            UI.confirm({
              title: 'Restaurar padr\u00f5es?',
              message: 'Todos os ajustes voltam ao valor original.',
              confirmLabel: 'Restaurar',
              onConfirm: function () {
                RBF.Settings.reset();
                UI.closePanel();
                openSettings();
                UI.toast('Ajustes restaurados.');
              }
            });
          }
        },
        { label: 'Fechar', className: 'rbf-btn-primary', onClick: function () { UI.closePanel(); } }
      ],
      onClose: function () {
        RBF.State.pop(fromTitle ? 'title' : 'paused');
        if (RBF.State.is('paused')) { openGameMenu(); }
      }
    });
  }

  /* ======================================================================
     HISTORICO
     ====================================================================== */

  function openHistory() {
    var fromTitle = RBF.State.is('title');
    RBF.State.push('history');

    var body = UI.el('div', 'rbf-history');
    var entries = RBF.History.all();

    if (!entries.length) {
      body.appendChild(UI.el('p', 'rbf-note', 'Nada lido ainda.'));
    }

    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      var line = UI.el('div', 'rbf-hist-line rbf-hist-' + e.kind);

      if (e.speaker && RBF.CHARACTERS[e.speaker]) {
        var who = UI.el('span', 'rbf-hist-who', RBF.CHARACTERS[e.speaker].name);
        who.style.color = RBF.CHARACTERS[e.speaker].color;
        line.appendChild(who);
      }
      line.appendChild(UI.el('span', 'rbf-hist-text', e.text));
      body.appendChild(line);
    }

    var built = UI.panel({
      name:  'history',
      title: 'Hist\u00f3rico',
      subtitle: entries.length + ' entrada' + (entries.length === 1 ? '' : 's'),
      body:  body,
      wide:  true,
      actions: [
        { label: 'Fechar', className: 'rbf-btn-primary', onClick: function () { UI.closePanel(); } }
      ],
      onClose: function () {
        RBF.State.pop(fromTitle ? 'title' : 'paused');
        if (RBF.State.is('paused')) { openGameMenu(); }
      }
    });

    /* Abre no fim, que e onde o jogador parou. */
    built.body.scrollTop = built.body.scrollHeight;
  }

  /* ======================================================================
     SELECAO DE CAPITULO
     ====================================================================== */

  function openChapterSelect() {
    var fromTitle = RBF.State.is('title');
    RBF.State.push('load');

    var body = UI.el('div', 'rbf-chapters');
    var progress = RBF.Saves.readProgress();

    for (var i = 0; i < RBF.CHAPTERS.length; i++) {
      (function (ch) {
        var reached = progress.chaptersReached.indexOf(ch.id) !== -1;

        var card = UI.el('button', 'rbf-chapter' + (reached ? '' : ' locked'));
        card.type = 'button';
        card.appendChild(UI.el('span', 'rbf-chapter-label', ch.label));
        card.appendChild(UI.el('span', 'rbf-chapter-title', reached ? ch.title : 'ainda n\u00e3o alcan\u00e7ado'));

        if (reached) {
          card.addEventListener('click', function (ev) {
            ev.stopPropagation();
            UI.confirm({
              title: 'Come\u00e7ar em ' + ch.label + '?',
              message: 'A partida come\u00e7a do in\u00edcio do cap\u00edtulo, sem as escolhas ' +
                       'anteriores. Seus saves continuam guardados.',
              confirmLabel: 'Come\u00e7ar',
              onConfirm: function () {
                UI.closePanel();
                hideTitle();
                RBF.Engine.startChapter(ch.id);
              }
            });
          });
        }
        body.appendChild(card);
      })(RBF.CHAPTERS[i]);
    }

    UI.panel({
      name:  'chapters',
      title: 'Cap\u00edtulos',
      subtitle: 'Dispon\u00edveis conforme o progresso.',
      body:  body,
      actions: [
        { label: 'Fechar', className: 'rbf-btn-primary', onClick: function () { UI.closePanel(); } }
      ],
      onClose: function () {
        RBF.State.pop(fromTitle ? 'title' : 'paused');
        if (RBF.State.is('paused')) { openGameMenu(); }
      }
    });
  }

  /* ======================================================================
     CREDITOS
     ====================================================================== */

  function openCredits() {
    var fromTitle = RBF.State.is('title');
    RBF.State.push('credits');

    var body = UI.el('div', 'rbf-credits');

    for (var i = 0; i < RBF.CREDITS.length; i++) {
      var block = RBF.CREDITS[i];
      body.appendChild(UI.el('h3', 'rbf-group', block.title));
      for (var j = 0; j < block.lines.length; j++) {
        body.appendChild(UI.el('p', 'rbf-credit-line', block.lines[j]));
      }
    }

    UI.panel({
      name:  'credits',
      title: 'Cr\u00e9ditos',
      body:  body,
      actions: [
        { label: 'Fechar', className: 'rbf-btn-primary', onClick: function () { UI.closePanel(); } }
      ],
      onClose: function () {
        RBF.State.pop(fromTitle ? 'title' : 'paused');
        if (RBF.State.is('paused')) { openGameMenu(); }
      }
    });
  }

  /* ======================================================================
     ATALHOS
     ====================================================================== */

  function bindShortcuts() {
    document.addEventListener('keydown', function (ev) {
      /* Escape com painel aberto e tratado em RBF.UI.bind, que roda na
         fase de captura e interrompe o evento antes de chegar aqui. */
      if (ev.key === 'Escape') {
        if (RBF.State.is('title')) { return; }
        if (RBF.State.hasOverlay()) { return; }
        ev.preventDefault();
        openGameMenu();
        return;
      }

      if (ev.key === 'F5') {
        ev.preventDefault();
        if (RBF.State.is('playing')) { quickSave(); }
        return;
      }

      if (ev.key === 'F9') {
        ev.preventDefault();
        if (!RBF.State.is('title') && !RBF.State.hasOverlay()) { quickLoad(); }
        return;
      }

      if ((ev.key === 'h' || ev.key === 'H') &&
          RBF.State.is('playing') && RBF.Engine.hasStarted()) {
        ev.preventDefault();
        RBF.Engine.pause();
        RBF.State.push('paused');
        openHistory();
      }
    });

    /* Botao direito abre o menu, mas apenas durante o jogo. */
    el.stage.addEventListener('contextmenu', function (ev) {
      if (!RBF.Engine.hasStarted()) { return; }
      if (RBF.State.hasOverlay()) { return; }
      ev.preventDefault();
      openGameMenu();
    });

    el.menuButton.addEventListener('click', function (ev) {
      ev.stopPropagation();
      openGameMenu();
    });

    document.getElementById('btn-history').addEventListener('click', function (ev) {
      ev.stopPropagation();
      if (RBF.State.hasOverlay()) { return; }
      RBF.Engine.pause();
      RBF.State.push('paused');
      openHistory();
    });

    document.getElementById('btn-quicksave').addEventListener('click', function (ev) {
      ev.stopPropagation();
      quickSave();
    });
  }

  /* ======================================================================
     INICIO
     ====================================================================== */

  function init() {
    if (initialized) { return; }
    initialized = true;

    grab();
    RBF.UI.bind(el.overlayRoot);
    bindShortcuts();
    showTitle();
  }

  return {
    init:            init,
    showTitle:       showTitle,
    openGameMenu:    openGameMenu,
    openSaveLoad:    openSaveLoad,
    openSettings:    openSettings,
    openHistory:     openHistory,
    openCredits:     openCredits,
    quickSave:       quickSave,
    quickLoad:       quickLoad,
    startNewGame:    startNewGame,
    refreshTitle:    renderTitleButtons
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RBF.Menu;
}
