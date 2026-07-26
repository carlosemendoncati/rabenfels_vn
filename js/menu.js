/* ==========================================================================
   ARQUIVO RABENFELS - js/menu.js

   Portao de abertura, menu principal e todos os paineis.

   Cada painel e montado ao abrir e destruido ao fechar, entao nenhum
   ouvinte sobrevive para ser registrado duas vezes. Os unicos ouvintes
   permanentes sao os do portao, os da navegacao do menu e os da barra de
   jogo, registrados uma unica vez em init().
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.Menu = (function () {
  'use strict';

  var UI = null;
  var el = {};

  var initialized = false;
  var gateOpen    = false;   /* trava reentrada durante a abertura */
  var archiveOpen = false;   /* o portao ja foi aberto nesta sessao */

  function grab() {
    UI = RBF.UI;

    el.gate       = document.getElementById('rf-gate');
    el.gateBtn    = document.getElementById('rf-gate-btn');
    el.gateLabel  = document.getElementById('rf-gate-label');
    el.gateHint   = document.getElementById('rf-gate-hint');

    el.menu       = document.getElementById('main-menu');
    el.nav        = document.getElementById('rf-nav');
    el.note       = document.getElementById('rf-note');
    el.version    = document.getElementById('rf-version');

    el.gameBar    = document.getElementById('game-bar');
    el.overlayRoot= document.getElementById('ui-root');
    el.stage      = document.getElementById('vn');
    el.transition = document.getElementById('rf-transition');
  }

  /* ======================================================================
     PORTAO DE ABERTURA
     ====================================================================== */

  function sessionOpened() {
    try {
      return sessionStorage.getItem(RBF.INTRO.sessionKey) === 'true';
    } catch (e) {
      return false;   /* sessionStorage bloqueado: o portao aparece */
    }
  }

  function markSessionOpened() {
    try {
      sessionStorage.setItem(RBF.INTRO.sessionKey, 'true');
    } catch (e) { /* sem persistencia de sessao: sem problema */ }
  }

  function showGate() {
    var terminou = !!(RBF.Saves.hasCompleted && RBF.Saves.hasCompleted());

    el.gateLabel.textContent = RBF.INTRO.label;
    el.gateHint.textContent  = (terminou && RBF.INTRO.sealedHint)
      ? RBF.INTRO.sealedHint
      : RBF.INTRO.hint;

    el.gate.classList.add('is-open');
    el.gate.classList.remove('is-leaving');
    el.menu.classList.remove('show', 'is-revealing', 'is-returning');
    el.gameBar.classList.remove('show');

    RBF.State.clearStack();
    RBF.State.set('title');

    /* O foco vai para o botao, entao Enter e Espaco funcionam sem clique. */
    try { el.gateBtn.focus(); } catch (e) { /* ignora */ }
  }

  /* Abre o arquivo. Protegida contra clique repetido. */
  function openArchive() {
    if (gateOpen) { return; }
    gateOpen = true;

    /* 1. o audio so pode ser destravado a partir daqui */
    RBF.Audio.unlock();
    RBF.Audio.playUi('ui_archive_open');

    /* 2. a trilha comeca em zero e sobe; nao espera o fade terminar */
    RBF.Audio.enterMenu();

    markSessionOpened();
    archiveOpen = true;

    /* 3. o selo se completa antes do portao sair */
    el.gate.classList.add('is-leaving');

    setTimeout(function () {
      el.gate.classList.remove('is-open');
      revealMenu(false);
      gateOpen = false;
    }, RBF.CONFIG.timing.gateMs);
  }

  /* ======================================================================
     MENU PRINCIPAL
     ====================================================================== */

  function fillArchiveChrome() {
    var A = RBF.ARCHIVE;

    /* Obra terminada: o cabecalho passa a saber o que o jogador sabe.
       Copia rasa para nao mutar o manifesto - sem isto, terminar uma vez
       deixaria o menu selado ate recarregar a pagina, inclusive depois
       de apagar o progresso. */
    var terminou = !!(RBF.Saves.hasCompleted && RBF.Saves.hasCompleted());
    if (terminou && A.sealed) {
      var base = A;
      A = {};
      for (var k in base) {
        if (Object.prototype.hasOwnProperty.call(base, k)) { A[k] = base[k]; }
      }
      for (var s in base.sealed) {
        if (Object.prototype.hasOwnProperty.call(base.sealed, s)) { A[s] = base.sealed[s]; }
      }
    }

    /* O fundo passa pelo mesmo resolvedor dos cenarios: se o arquivo
       nao existir, fica o gradiente e nao ha requisicao perdida. */
    if (A.background) {
      var bgEl = document.getElementById('rf-menu-bg');
      if (bgEl) { RBF.Assets.applyBackground(bgEl, A.background); }
    }

    document.getElementById('rf-access').textContent   = A.access;
    document.getElementById('rf-dossier').textContent  = A.dossier;
    document.getElementById('rf-volume').textContent   = A.volume;
    document.getElementById('rf-eyebrow').textContent  = A.eyebrow;
    document.getElementById('rf-latin').textContent    = A.latin;
    document.getElementById('rf-subtitle').textContent = A.subtitle;

    var title = document.getElementById('rf-title');
    title.textContent = '';
    for (var i = 0; i < A.title.length; i++) {
      var mask = document.createElement('span');
      mask.className = 'rf-title__mask';
      mask.textContent = A.title[i];
      title.appendChild(mask);
    }

    var done = RBF.Saves.readProgress().finishedChapters.length;

    /* Depois de terminar, a contagem de capitulos da lugar a contagem de
       leituras: quantos dos finais declarados em RBF.ENDINGS o jogador
       ja alcancou. E o unico numero do menu que so cresce relendo. */
    var trecho = ' \u00b7 ' + RBF.CHAPTERS.length + ' CAP\u00cdTULOS REGISTRADOS' +
                 (done ? ' \u00b7 ' + done + ' CONCLU\u00cdDO' + (done > 1 ? 'S' : '') : '');
    if (terminou && RBF.Paginas && RBF.Paginas.endingProgress) {
      var ep = RBF.Paginas.endingProgress();
      trecho = ' \u00b7 ' + ep.seen + ' DE ' + ep.total + ' LEITURAS REGISTRADAS';
    }

    el.version.textContent =
      'VERS\u00c3O ' + RBF.CONFIG.gameVersion + trecho +
      (RBF.Storage.isPersistent() ? '' : ' \u00b7 SAVES S\u00d3 NESTA SESS\u00c3O');
  }

  /* returning = volta de dentro do jogo, usa a versao curta da sequencia */
  function revealMenu(returning) {
    RBF.State.clearStack();
    RBF.State.set('title');

    UI.closePanel();
    fillArchiveChrome();
    renderNav();

    el.menu.classList.remove('is-revealing', 'is-returning');
    el.menu.classList.add('show');

    /* Reinicia a animacao: sem isso o navegador ignora a classe que
       acabou de ser removida no mesmo quadro. */
    void el.menu.offsetWidth;
    el.menu.classList.add(returning ? 'is-returning' : 'is-revealing');

    el.gameBar.classList.remove('show');

    /* O primeiro registro fica marcado como ativo, o que acende a barra
       viva e a nota de margem. O foco real so se move quando o jogador
       usa o teclado: focar por codigo acenderia o anel de foco e
       desenharia uma moldura em volta do item. */
    var wait = returning ? RBF.INTRO.returnRevealMs : RBF.INTRO.revealMs;
    setTimeout(function () {
      if (!RBF.State.is('title') || UI.isPanelOpen()) { return; }
      var first = el.nav.querySelector('.rf-nav__item:not(.is-locked)');
      if (!first) { return; }
      markActive(first);
      setNote(recordOf(first).note);
    }, wait);
  }

  function hideMenu() {
    el.menu.classList.remove('show', 'is-revealing', 'is-returning');
    el.gameBar.classList.add('show');
  }

  /* ---- navegacao em codice ---------------------------------------------- */

  function recordAvailable(rec) {
    if (rec.needs === 'save')     { return RBF.Saves.hasAnyValid(); }
    if (rec.needs === 'chapters') { return RBF.Saves.readProgress().chaptersReached.length > 1; }
    if (rec.needs === 'gallery')  { return RBF.Gallery.hasAny(); }
    if (rec.needs === 'completed') {
      return !!(RBF.Paginas && RBF.Paginas.available());
    }
    return true;
  }

  function renderNav() {
    UI.clear(el.nav);
    setNote('');

    var records = RBF.MENU_RECORDS;

    for (var i = 0; i < records.length; i++) {
      (function (rec, n) {
        var open = recordAvailable(rec);

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'rf-nav__item' + (open ? '' : ' is-locked');
        btn.setAttribute('data-record', rec.id);
        if (!open) { btn.setAttribute('aria-disabled', 'true'); }

        var num = document.createElement('span');
        num.className = 'rbf-num';
        num.setAttribute('aria-hidden', 'true');
        num.textContent = RBF.ARCHIVE.numerals[n] || String(n + 1);
        btn.appendChild(num);

        var body = document.createElement('span');
        body.className = 'rf-nav__body';

        var chapter = document.createElement('span');
        chapter.className = 'rf-nav__chapter';
        chapter.textContent = rec.chapter;
        body.appendChild(chapter);

        var label = document.createElement('span');
        label.className = 'rf-nav__label';
        label.textContent = rec.label;
        body.appendChild(label);

        btn.appendChild(body);

        var meta = document.createElement('span');
        meta.className = 'rf-nav__meta';

        var lead = document.createElement('span');
        lead.className = 'rf-nav__lead';
        lead.setAttribute('aria-hidden', 'true');
        meta.appendChild(lead);

        var seal = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        seal.setAttribute('class', 'rf-nav__seal');
        seal.setAttribute('aria-hidden', 'true');
        seal.style.color = 'var(--rbf-red)';
        var use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttribute('href', '#rf-mark');
        seal.appendChild(use);
        meta.appendChild(seal);

        var code = document.createElement('span');
        code.className = 'rbf-code';
        code.textContent = rec.code;
        meta.appendChild(code);

        btn.appendChild(meta);

        /* A nota de margem acompanha ponteiro e teclado. */
        function focusIn() {
          setNote(open ? rec.note : 'Este registro ainda n\u00e3o est\u00e1 dispon\u00edvel.');
          markActive(btn);
          if (open) { RBF.Audio.playUi('ui_hover'); }
        }

        btn.addEventListener('mouseenter', focusIn);
        btn.addEventListener('focus', focusIn);

        btn.addEventListener('click', function (ev) {
          ev.stopPropagation();
          if (!open) { RBF.Audio.playUi('ui_back'); return; }
          RBF.Audio.unlock();
          runRecord(rec);
        });

        el.nav.appendChild(btn);
      })(records[i], i);
    }
  }

  /* Registro correspondente a um botao da navegacao. */
  function recordOf(btn) {
    var id = btn.getAttribute('data-record');
    for (var i = 0; i < RBF.MENU_RECORDS.length; i++) {
      if (RBF.MENU_RECORDS[i].id === id) { return RBF.MENU_RECORDS[i]; }
    }
    return { note: '' };
  }

  /* Setas percorrem a lista, Enter abre. O foco real so entra em cena
     aqui, quando o jogador escolheu usar o teclado. */
  function moveNav(delta) {
    var items = el.nav.querySelectorAll('.rf-nav__item:not(.is-locked)');
    if (!items.length) { return; }

    var at = -1;
    for (var i = 0; i < items.length; i++) {
      if (items[i].classList.contains('is-active')) { at = i; break; }
    }

    var next = (at === -1)
      ? 0
      : (at + delta + items.length) % items.length;

    var btn = items[next];
    markActive(btn);
    setNote(recordOf(btn).note);
    RBF.Audio.playUi('ui_hover');
    try { btn.focus({ preventScroll: true }); } catch (e) { btn.focus(); }
  }

  function activateNav() {
    var btn = el.nav.querySelector('.rf-nav__item.is-active:not(.is-locked)');
    if (btn) { btn.click(); }
  }

  function markActive(btn) {
    var all = el.nav.querySelectorAll('.rf-nav__item');
    for (var i = 0; i < all.length; i++) { all[i].classList.remove('is-active'); }
    btn.classList.add('is-active');
  }

  var noteTimer = null;

  function setNote(text) {
    if (!el.note) { return; }
    if (el.note.textContent === text) { return; }

    el.note.textContent = text;
    el.note.classList.remove('is-changing');
    void el.note.offsetWidth;
    el.note.classList.add('is-changing');

    if (noteTimer) { clearTimeout(noteTimer); }
    noteTimer = setTimeout(function () {
      el.note.classList.remove('is-changing');
      noteTimer = null;
    }, 500);
  }

  /* ---- acoes dos registros ---------------------------------------------- */

  function runRecord(rec) {
    RBF.Audio.playUi('ui_confirm');

    switch (rec.action) {
      case 'newGame':  requestNewGame();     break;
      case 'continue': continueLatest();     break;
      case 'load':     openSaveLoad('load'); break;
      case 'chapters': openChapterSelect();  break;
      case 'gallery':  openGallery();        break;
      case 'pages':    openQuatroPaginas();  break;
      case 'options':  openSettings();       break;
      case 'credits':  openCredits();        break;
      case 'close':    confirmCloseArchive(); break;
      default: break;
    }
  }

  function requestNewGame() {
    if (RBF.Saves.hasAnyValid() || RBF.Engine.hasStarted()) {
      UI.confirm({
        title:   'Come\u00e7ar de novo?',
        message: 'Um jogo novo come\u00e7a do Pr\u00f3logo. Seus saves manuais ' +
                 'continuam guardados; s\u00f3 o progresso desta sess\u00e3o \u00e9 descartado.',
        confirmLabel: 'Come\u00e7ar',
        onConfirm: warningGate
      });
      return;
    }
    warningGate();
  }

  /* ---- aviso de conteudo -------------------------------------------------
     Aparece antes de um jogo novo, a menos que o jogador tenha desligado
     em Ajustes. Nao pode ser dispensado por engano: nao fecha por clique
     no fundo nem por Escape sem escolher.                              */

  function warningGate() {
    if (!RBF.Settings.get('contentWarning')) { startNewGame(); return; }

    var W = RBF.WARNING;
    var body = UI.el('div', 'rbf-warning');

    body.appendChild(UI.el('p', 'rbf-warning__body', W.body));

    var tags = UI.el('div', 'rbf-warning__tags');
    for (var i = 0; i < W.tags.length; i++) {
      tags.appendChild(UI.el('span', 'rbf-warning__tag', W.tags[i]));
    }
    body.appendChild(tags);
    body.appendChild(UI.el('p', 'rbf-note', W.footer));

    UI.panel({
      name:  'warning',
      title: W.title,
      subtitle: W.label,
      body:  body,
      dismissOnBackdrop: false,
      lockEscape: true,
      actions: [
        { label: W.back, className: 'rbf-btn-ghost', onClick: function () {
            UI.closePanel();
        } },
        { label: W.accept, className: 'rbf-btn-primary', onClick: function () {
            UI.closePanel();
            startNewGame();
        } }
      ],
      onClose: function () {
        RBF.State.pop('title');
      }
    });

    RBF.State.push('modal');
    RBF.Audio.playUi('ui_seal');
  }

  /* ---- transicao de menu para jogo --------------------------------------- */

  function sweep(then) {
    el.transition.classList.remove('is-sweeping');
    void el.transition.offsetWidth;
    el.transition.classList.add('is-sweeping');

    RBF.Audio.playUi('ui_page');
    RBF.Audio.leaveMenu();

    setTimeout(function () {
      then();
      setTimeout(function () {
        el.transition.classList.remove('is-sweeping');
      }, 500);
    }, RBF.CONFIG.timing.sweepMs);
  }

  function startNewGame() {
    UI.closePanel();
    sweep(function () {
      hideMenu();
      RBF.Engine.newGame();
    });
  }

  function continueLatest() {
    var save = RBF.Saves.latest();
    if (!save) { UI.toast('Nenhum save dispon\u00edvel.'); return; }
    doLoad(save.data);
  }

  function doLoad(data) {
    var problem = RBF.Saves.validate(data);
    if (problem) {
      UI.notice('Save inv\u00e1lido', problem);
      return;
    }
    UI.closePanel();
    RBF.State.clearStack();

    sweep(function () {
      hideMenu();
      RBF.Engine.loadFrom(data);
      UI.toast('Registro reaberto.');
    });
  }

  function confirmCloseArchive() {
    UI.confirm({
      title:   'Fechar o registro?',
      message: 'Algumas coisas podem permanecer com voc\u00ea.\n\n' +
               'O arquivo volta \u00e0 tela de abertura. Nada \u00e9 apagado.',
      confirmLabel: 'Fechar',
      danger:  true,
      onConfirm: function () {
        RBF.Audio.leaveMenu();
        el.menu.classList.remove('show');
        archiveOpen = false;
        try { sessionStorage.removeItem(RBF.INTRO.sessionKey); } catch (e) { /* ignora */ }
        showGate();
      }
    });
  }

  /* ======================================================================
     MENU DE JOGO
     ====================================================================== */

  /* Reabre o menu de jogo depois de fechar um painel filho. O estado ja
     e 'paused' nesse caminho: empilhar de novo deixaria a pilha torta e,
     antes, o guarda de alternancia fechava o menu que acabava de ser
     pedido, prendendo o jogador em uma partida pausada sem interface. */
  function openGameMenu() {
    if (!RBF.Engine.hasStarted()) { return; }

    /* Alternancia: so fecha quando o proprio menu esta na tela. */
    if (UI.isPanelOpen('gamemenu')) { closeGameMenu(); return; }

    /* Qualquer outro painel por cima tem precedencia. */
    if (RBF.State.hasOverlay() && !RBF.State.is('paused')) { return; }

    if (!RBF.State.is('paused')) {
      RBF.Engine.pause();
      RBF.State.push('paused');
    }
    RBF.Audio.playUi('ui_page');

    var body = UI.el('div', 'rbf-menu-grid');

    body.appendChild(menuItem('Continuar',    'volta para onde parou',  closeGameMenu));
    body.appendChild(menuItem('Salvar',       'escolher um espa\u00e7o', function () {
      if (!RBF.Engine.canSave()) {
        UI.notice('Ainda n\u00e3o', 'Espere a fala terminar de aparecer para salvar.');
        return;
      }
      openSaveLoad('save');
    }));
    body.appendChild(menuItem('Carregar',     'voltar a um save',       function () { openSaveLoad('load'); }));
    body.appendChild(menuItem('Save r\u00e1pido', 'F5',                 quickSave));
    body.appendChild(menuItem('Load r\u00e1pido', 'F9',                 quickLoad));
    body.appendChild(menuItem('Hist\u00f3rico',   'H',                  openHistory));
    body.appendChild(menuItem('Galeria',      'material recuperado',    openGallery));
    body.appendChild(menuItem('Ajustes',      'texto, \u00e1udio, movimento', openSettings));
    body.appendChild(menuItem('Voltar ao t\u00edtulo', 'sai da partida', confirmReturnToTitle));

    UI.panel({
      name:  'gamemenu',
      title: 'Menu',
      subtitle: RBF.Script.chapterLabel(RBF.STATE.chapter) +
                (RBF.STATE.sceneTitle ? ' \u00b7 ' + RBF.STATE.sceneTitle : ''),
      body:  body,
      onClose: onGameMenuClosed
    });
  }

  /* Fechamento padrao de painel filho.

     Painel aberto pelo menu de jogo volta para o menu de jogo. Painel
     aberto pela barra de leitura volta direto para a leitura, e o
     relogio de partida volta a correr. Antes, todo painel caia no menu
     de jogo: quem so queria consultar o historico durante a leitura era
     obrigado a fechar duas telas. */
  function panelReturn(fromTitle) {
    return function () {
      RBF.State.pop(fromTitle ? 'title' : 'playing');
      if (RBF.State.is('paused'))  { openGameMenu(); return; }
      if (RBF.State.is('playing')) { RBF.Engine.resume(); }
    };
  }

  function menuItem(label, hint, onClick) {
    var b = UI.el('button', 'rbf-menu-item');
    b.type = 'button';
    b.appendChild(UI.el('span', 'rbf-menu-item-label', label));
    if (hint) { b.appendChild(UI.el('span', 'rbf-menu-item-hint', hint)); }
    b.addEventListener('click', function (ev) {
      ev.stopPropagation();
      RBF.Audio.playUi('ui_confirm');
      onClick();
    });
    return b;
  }

  function closeGameMenu() { UI.closePanel(); }

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
        RBF.Audio.enterMenu();
        revealMenu(true);
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
    body.appendChild(UI.slotList(
      mode,
      function (slot) { onSlotPicked(mode, slot); },
      function (slot) { onSlotDelete(mode, slot); },
      function (slot) {
        var ok = RBF.Saves.exportSlot(slot.id);
        UI.toast(ok ? 'Arquivo de save gerado.' : 'N\u00e3o foi poss\u00edvel exportar.');
      }
    ));

    UI.panel({
      name:  'saveload',
      title: mode === 'save' ? 'Salvar registro' : 'Abrir registro',
      subtitle: mode === 'save'
        ? 'Escolha um espa\u00e7o. Espa\u00e7o ocupado pede confirma\u00e7\u00e3o.'
        : 'Escolha um registro v\u00e1lido.',
      body:  body,
      wide:  true,
      actions: [
        { label: 'Importar arquivo', className: 'rbf-btn-ghost',
          onClick: function () { importFlow(mode); } },
        { label: 'Fechar', className: 'rbf-btn-primary',
          onClick: function () { UI.closePanel(); } }
      ],
      onClose: panelReturn(fromTitle)
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
          message: slot.label + ' j\u00e1 tem um registro de ' +
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

    if (slot.empty || slot.broken) { return; }

    if (RBF.Engine.hasStarted() && RBF.Settings.get('confirmDestructive')) {
      UI.confirm({
        title:   'Abrir este registro?',
        message: 'O progresso n\u00e3o salvo da partida atual ser\u00e1 perdido.',
        confirmLabel: 'Abrir',
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
    RBF.Audio.playUi('ui_seal');
    UI.toast('Registro gravado em ' + slot.label + '.');
    refreshSaveLoad('save');
  }

  function onSlotDelete(mode, slot) {
    UI.confirm({
      title:   'Apagar registro?',
      message: slot.label + ' ser\u00e1 apagado. N\u00e3o d\u00e1 para desfazer.',
      confirmLabel: 'Apagar',
      danger: true,
      onConfirm: function () {
        RBF.Saves.deleteSlot(slot.id);
        UI.toast('Registro apagado.');
        refreshSaveLoad(mode);
      }
    });
  }

  function refreshSaveLoad(mode) {
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
      if (!ok) { UI.notice('N\u00e3o foi poss\u00edvel importar', message); return; }
      UI.toast('Registro importado no espa\u00e7o ' + free + '.');
      refreshSaveLoad(mode);
    });
  }

  function firstFreeSlot() {
    for (var i = 1; i <= RBF.STORAGE.slotCount; i++) {
      if (!RBF.Saves.hasSlot(String(i))) { return String(i); }
    }
    return null;
  }

  function quickSave() {
    if (!RBF.Engine.hasStarted()) { return; }
    if (!RBF.Engine.canSave()) {
      UI.toast('Espere a fala terminar para salvar.');
      return;
    }
    var ok = RBF.Saves.quicksave(RBF.Engine.snapshot());
    if (ok) { RBF.Audio.playUi('ui_seal'); }
    UI.toast(ok ? 'Save r\u00e1pido gravado.' : 'Falha no save r\u00e1pido.');
  }

  function quickLoad() {
    var data = RBF.Saves.loadSlot(RBF.Saves.QUICKSAVE);
    if (!data) { UI.toast('Nenhum save r\u00e1pido.'); return; }

    if (RBF.Engine.hasStarted() && RBF.Settings.get('confirmDestructive')) {
      UI.confirm({
        title:   'Abrir o save r\u00e1pido?',
        message: 'O progresso n\u00e3o salvo ser\u00e1 perdido.',
        confirmLabel: 'Abrir',
        danger: true,
        onConfirm: function () { finishQuickLoad(data); }
      });
      return;
    }
    finishQuickLoad(data);
  }

  function finishQuickLoad(data) {
    RBF.State.clearStack();
    var problem = RBF.Saves.validate(data);
    if (problem) { UI.notice('Save inv\u00e1lido', problem); return; }
    UI.closePanel();
    RBF.Engine.loadFrom(data);
    UI.toast('Registro reaberto.');
  }

  /* ======================================================================
     AJUSTES
     ====================================================================== */

  function openSettings() {
    var fromTitle = RBF.State.is('title');
    RBF.State.push('settings');

    var body = UI.el('div', 'rbf-settings');
    var s = RBF.Settings;

    /* --- audio --- */
    body.appendChild(UI.el('h3', 'rbf-group', '\u00c1udio'));

    body.appendChild(UI.row('Volume geral',
      UI.slider(s.get('masterVolume'), 0, 1, 0.02, pct,
        function (v) { s.set('masterVolume', v); })));

    body.appendChild(UI.row('Trilha',
      UI.slider(s.get('bgmVolume'), 0, 1, 0.02, pct,
        function (v) { s.set('bgmVolume', v); })));

    body.appendChild(UI.row('Efeitos',
      UI.slider(s.get('sfxVolume'), 0, 1, 0.02, pct,
        function (v) { s.set('sfxVolume', v); })));

    body.appendChild(UI.row('Silenciar tudo',
      UI.toggle(s.get('muted'), function (v) { s.set('muted', v); })));

    /* --- texto --- */
    body.appendChild(UI.el('h3', 'rbf-group', 'Texto'));

    body.appendChild(UI.row('M\u00e1quina de escrever',
      UI.toggle(s.get('typewriter'), function (v) { s.set('typewriter', v); }),
      'desligado exibe a frase inteira de uma vez'));

    body.appendChild(UI.row('Velocidade',
      UI.slider(s.get('typeSpeedMs'), 0, 60, 1,
        function (v) { return v === 0 ? 'instant\u00e2neo' : v + ' ms'; },
        function (v) { s.set('typeSpeedMs', v); }),
      'menor = mais r\u00e1pido'));

    body.appendChild(UI.row('Tamanho do texto',
      UI.slider(s.get('textScale'), 0.8, 1.5, 0.05,
        function (v) { return Math.round(v * 100) + '%'; },
        function (v) { s.set('textScale', v); }),
      'sobre o tamanho desta tela'));

    body.appendChild(UI.row('Avan\u00e7o autom\u00e1tico',
      UI.toggle(s.get('autoAdvance'), function (v) { s.set('autoAdvance', v); })));

    body.appendChild(UI.row('Espera do avan\u00e7o',
      UI.slider(s.get('autoAdvanceMs'), 800, 6000, 100,
        function (v) { return (v / 1000).toFixed(1) + ' s'; },
        function (v) { s.set('autoAdvanceMs', v); })));

    /* --- apresentacao --- */
    body.appendChild(UI.el('h3', 'rbf-group', 'Apresenta\u00e7\u00e3o'));

    body.appendChild(UI.row('Movimento reduzido',
      UI.toggle(s.get('reducedMotion'), function (v) { s.set('reducedMotion', v); }),
      'encurta transi\u00e7\u00f5es e desliga movimento amplo'));

    body.appendChild(UI.row('HUD de rotas',
      UI.toggle(s.get('showRoutes'), function (v) {
        s.set('showRoutes', v);
        RBF.Engine.renderRoutes();
      }),
      'Esperan\u00e7a, Perda e Resposta durante a leitura'));

    body.appendChild(UI.row('Tela cheia',
      UI.toggle(isFullscreen(), function (v) { toggleFullscreen(v); }),
      supportsFullscreen() ? '' : 'n\u00e3o dispon\u00edvel neste navegador'));

    /* --- conteudo --- */
    body.appendChild(UI.el('h3', 'rbf-group', 'Conte\u00fado'));

    body.appendChild(UI.row('Aviso antes de come\u00e7ar',
      UI.toggle(s.get('contentWarning'), function (v) { s.set('contentWarning', v); }),
      'tela de aviso ao iniciar um jogo novo'));

    body.appendChild(UI.row('Autosave a cada cena',
      UI.toggle(s.get('autosaveEnabled'), function (v) { s.set('autosaveEnabled', v); })));

    body.appendChild(UI.row('Confirmar a\u00e7\u00f5es destrutivas',
      UI.toggle(s.get('confirmDestructive'), function (v) { s.set('confirmDestructive', v); }),
      'sobrescrever, apagar, voltar ao t\u00edtulo'));

    /* --- teclas --- */
    body.appendChild(UI.el('h3', 'rbf-group', 'Teclas'));
    var keys = [
      ['Avan\u00e7ar',            'Espa\u00e7o \u00b7 Enter \u00b7 \u2192'],
      ['Escolher',                '1 \u00b7 2 \u00b7 3'],
      ['Menu',                    'Esc \u00b7 bot\u00e3o direito'],
      ['Hist\u00f3rico',          'H'],
      ['Avan\u00e7o autom\u00e1tico', 'A'],
      ['Avan\u00e7ar r\u00e1pido', 'Ctrl'],
      ['Esconder interface',      'V'],
      ['Save r\u00e1pido',        'F5'],
      ['Load r\u00e1pido',        'F9'],
      ['Tela cheia',              'F11']
    ];
    for (var i = 0; i < keys.length; i++) {
      var kb = UI.el('div', 'rbf-keybind');
      kb.appendChild(UI.el('span', 'rbf-key', keys[i][1]));
      body.appendChild(UI.row(keys[i][0], kb));
    }

    body.appendChild(UI.el('p', 'rbf-note',
      RBF.Storage.isPersistent()
        ? 'Ajustes e registros ficam guardados neste navegador. Mudar de ' +
          'endere\u00e7o ou de navegador come\u00e7a um arquivo novo; use ' +
          'exportar para levar um registro junto.'
        : 'Este navegador bloqueou o armazenamento local. Ajustes e ' +
          'registros valem apenas nesta sess\u00e3o. Use exportar para n\u00e3o ' +
          'perder progresso.'));

    UI.panel({
      name:  'settings',
      title: 'Ajustes',
      subtitle: 'CONTROLE DE LEITURA',
      body:  body,
      actions: [
        { label: 'Restaurar padr\u00f5es', className: 'rbf-btn-ghost', onClick: function () {
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
        } },
        { label: 'Fechar', className: 'rbf-btn-primary', onClick: function () { UI.closePanel(); } }
      ],
      onClose: panelReturn(fromTitle)
    });
  }

  function pct(v) { return Math.round(v * 100) + '%'; }

  /* ---- tela cheia --------------------------------------------------------
     Nem todo navegador expoe a API; em iOS ela nao existe no Safari.
     O controle so age quando existe suporte e nunca lanca erro.        */

  function supportsFullscreen() {
    return !!(document.documentElement &&
              document.documentElement.requestFullscreen);
  }

  function isFullscreen() {
    return !!document.fullscreenElement;
  }

  function toggleFullscreen(want) {
    if (!supportsFullscreen()) { UI.toast('Tela cheia indispon\u00edvel aqui.'); return; }
    try {
      if (want && !isFullscreen()) {
        var p = document.documentElement.requestFullscreen();
        if (p && p.catch) { p.catch(function () {}); }
      } else if (!want && isFullscreen()) {
        var q = document.exitFullscreen();
        if (q && q.catch) { q.catch(function () {}); }
      }
    } catch (e) { /* nao derruba a interface */ }
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
      onClose: panelReturn(fromTitle)
    });

    built.body.scrollTop = built.body.scrollHeight;
  }

  /* ======================================================================
     CAPITULOS
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
        card.appendChild(UI.el('span', 'rbf-chapter-title',
          reached ? ch.title : 'ainda n\u00e3o alcan\u00e7ado'));

        if (reached) {
          card.addEventListener('click', function (ev) {
            ev.stopPropagation();
            UI.confirm({
              title: 'Come\u00e7ar em ' + ch.label + '?',
              message: 'A partida come\u00e7a do in\u00edcio do cap\u00edtulo, sem as escolhas ' +
                       'anteriores. Seus registros continuam guardados.',
              confirmLabel: 'Come\u00e7ar',
              onConfirm: function () {
                UI.closePanel();
                sweep(function () {
                  hideMenu();
                  RBF.Engine.startChapter(ch.id);
                });
              }
            });
          });
        } else {
          card.setAttribute('aria-disabled', 'true');
        }
        body.appendChild(card);
      })(RBF.CHAPTERS[i]);
    }

    UI.panel({
      name:  'chapters',
      title: 'Cap\u00edtulos',
      subtitle: 'VOLUMES LIBERADOS',
      body:  body,
      actions: [
        { label: 'Fechar', className: 'rbf-btn-primary', onClick: function () { UI.closePanel(); } }
      ],
      onClose: panelReturn(fromTitle)
    });
  }

  /* ======================================================================
     GALERIA

     Le RBF.Gallery, que verifica progresso real. Item bloqueado continua
     bloqueado: nao existe atalho de demonstracao.
     ====================================================================== */

  var galleryTab = 'cg';

  function openGallery() {
    var fromTitle = RBF.State.is('title');
    RBF.State.push('load');

    var body = UI.el('div', 'rbf-gallery');
    var tabs = UI.el('div', 'rbf-gal-tabs');
    var grid = UI.el('div', 'rbf-gal-grid');

    var cats = RBF.Gallery.categories();

    function paint() {
      UI.clear(grid);
      var items = RBF.Gallery.items(galleryTab);

      for (var i = 0; i < items.length; i++) {
        (function (item) {
          var card = UI.el('button', 'rbf-gal-item' + (item.unlocked ? '' : ' locked'));
          card.type = 'button';

          var thumb = UI.el('div', 'rbf-gal-thumb');
          if (item.unlocked && item.bg) {
            var def = RBF.BACKGROUNDS[item.bg];
            if (def) {
              thumb.style.background = def.css;
              thumb.style.backgroundSize = 'cover';
              thumb.style.backgroundPosition = 'center';
              if (def.available && def.file) {
                var url = RBF.CONFIG.paths.backgrounds + def.file;
                var probe = new Image();
                probe.onload = function () { thumb.style.backgroundImage = 'url("' + url + '")'; };
                probe.onerror = function () { /* fica no gradiente */ };
                probe.src = url;
              }
            }
          } else if (item.unlocked && item.portrait) {
            /* Ficha de personagem: o retrato, enquadrado pelo topo para o
               rosto nao ser cortado na miniatura. Sem arquivo, fica a
               moldura escura. */
            thumb.classList.add('is-portrait');
            var purl = RBF.CONFIG.paths.characters + 'portraits/' + item.portrait;
            var pprobe = new Image();
            pprobe.onload = function () {
              thumb.style.backgroundImage = 'url("' + purl + '")';
              thumb.classList.add('is-loaded');
            };
            pprobe.onerror = function () { /* fica a moldura */ };
            pprobe.src = purl;
          }
          card.appendChild(thumb);
          card.appendChild(UI.el('span', 'rbf-gal-name',
            item.unlocked ? item.name : '\u2014'));

          if (item.unlocked) {
            card.addEventListener('click', function (ev) {
              ev.stopPropagation();
              RBF.Audio.playUi('ui_confirm');
              viewGalleryItem(item);
            });
          } else {
            card.setAttribute('aria-disabled', 'true');
          }
          grid.appendChild(card);
        })(items[i]);
      }
    }

    for (var i = 0; i < cats.length; i++) {
      (function (cat) {
        var t = UI.el('button', 'rbf-gal-tab' + (cat.id === galleryTab ? ' on' : ''), cat.label);
        t.type = 'button';
        t.addEventListener('click', function (ev) {
          ev.stopPropagation();
          galleryTab = cat.id;
          var all = tabs.querySelectorAll('.rbf-gal-tab');
          for (var k = 0; k < all.length; k++) { all[k].classList.remove('on'); }
          t.classList.add('on');
          RBF.Audio.playUi('ui_hover');
          paint();
        });
        tabs.appendChild(t);
      })(cats[i]);
    }

    body.appendChild(tabs);
    body.appendChild(grid);
    paint();

    var counts = RBF.Gallery.counts();

    UI.panel({
      name:  'gallery',
      title: 'Material recuperado',
      subtitle: counts.unlocked + ' de ' + counts.total + ' itens liberados',
      body:  body,
      wide:  true,
      actions: [
        { label: 'Fechar', className: 'rbf-btn-primary', onClick: function () { UI.closePanel(); } }
      ],
      onClose: panelReturn(fromTitle)
    });
  }

  function viewGalleryItem(item) {
    var body = UI.el('div', 'rbf-gal-view');

    if (item.bg) {
      var frame = UI.el('div', 'rbf-gal-view__frame');
      var def = RBF.BACKGROUNDS[item.bg];
      if (def) {
        frame.style.background = def.css;
        frame.style.backgroundSize = 'contain';
        frame.style.backgroundRepeat = 'no-repeat';
        frame.style.backgroundPosition = 'center';
        if (def.available && def.file) {
          var url = RBF.CONFIG.paths.backgrounds + def.file;
          var probe = new Image();
          probe.onload = function () { frame.style.backgroundImage = 'url("' + url + '")'; };
          probe.onerror = function () { /* fica no gradiente */ };
          probe.src = url;
        }
      }
      body.appendChild(frame);
    }

    /* Retrato da ficha. Enquanto o arquivo nao existir, fica a moldura
       vazia - que e coerente com a obra e nao pede desculpa por isso. */
    if (item.portrait) {
      var pf = UI.el('div', 'rbf-gal-view__portrait');
      var purl = RBF.CONFIG.paths.characters + 'portraits/' + item.portrait;
      var pimg = new Image();
      pimg.onload = function () {
        pf.style.backgroundImage = 'url("' + purl + '")';
        pf.classList.add('is-loaded');
      };
      pimg.onerror = function () { /* fica a moldura */ };
      pimg.src = purl;
      body.appendChild(pf);
    }

    if (item.text) {
      body.appendChild(UI.el('p', 'rbf-gal-view__text', item.text));
    }

    /* Ficha de personagem: entradas em ordem de descoberta. As que ainda
       nao foram abertas aparecem como lacuna, para o jogador saber que
       ha mais a encontrar. */
    if (item.entries && item.entries.length) {
      var list = UI.el('div', 'rbf-gal-entries');
      for (var e = 0; e < item.entries.length; e++) {
        var en = item.entries[e];
        if (en.unlocked) {
          list.appendChild(UI.el('p', 'rbf-gal-entry', en.tx));
        } else {
          list.appendChild(UI.el('p', 'rbf-gal-entry is-locked',
            '[ sem entrada at\u00e9 esta data ]'));
        }
      }
      body.appendChild(list);

      var meta = UI.el('p', 'rbf-gal-view__meta',
        item.entriesOpen + ' de ' + item.entriesTotal + ' entradas');
      body.appendChild(meta);
    }

    var prev = RBF.State.get();
    RBF.State.push('modal');

    UI.panel({
      name:  'galleryitem',
      title: item.name,
      body:  body,
      wide:  true,
      actions: [
        { label: 'Voltar', className: 'rbf-btn-primary', onClick: function () {
            UI.closePanel();
            openGallery();
        } }
      ],
      onClose: function () { RBF.State.pop(prev); }
    });
  }

  /* ======================================================================
     AS QUATRO PAGINAS

     Extra pos-jogo. O Prologo planta "Faltam quatro", o Capitulo 11
     mostra ela arrancando, o Epilogo mostra o tribunal indeferindo por
     falta exatamente delas. Aqui o jogador le o que Matheo nunca leu.

     O conteudo depende das escolhas da partida concluida, entao dois
     jogadores nunca leem o mesmo documento. Quem carregou save antigo,
     sem as flags gravadas, ve a pagina como lacuna em vez de ver texto
     que nao corresponde ao que jogou.
     ====================================================================== */

  function openQuatroPaginas() {
    var doc = RBF.Paginas && RBF.Paginas.build();
    if (!doc) { return; }

    var fromTitle = RBF.State.is('title');
    RBF.State.push('pages');

    var body = UI.el('div', 'rbf-quatro');

    var cab = UI.el('div', 'rbf-quatro__cab');
    for (var c = 0; c < doc.cabecalho.length; c++) {
      cab.appendChild(UI.el('p', 'rbf-quatro__cabline', doc.cabecalho[c]));
    }
    body.appendChild(cab);

    for (var i = 0; i < doc.paginas.length; i++) {
      var pag = doc.paginas[i];
      var art = UI.el('article', 'rbf-quatro__pag' + (pag.lacuna ? ' is-lacuna' : ''));

      var head = UI.el('div', 'rbf-quatro__head');
      head.appendChild(UI.el('span', 'rbf-quatro__num', pag.num));
      head.appendChild(UI.el('h3', 'rbf-quatro__tit', pag.titulo));
      art.appendChild(head);

      if (pag.lacuna) {
        art.appendChild(UI.el('p', 'rbf-quatro__vazio',
          '[ esta p\u00e1gina n\u00e3o consta do registro desta leitura ]'));
      } else {
        var corpo = UI.el('div', 'rbf-quatro__corpo');
        for (var l = 0; l < pag.lns.length; l++) {
          corpo.appendChild(UI.el('p', 'rbf-quatro__linha', pag.lns[l] || '\u00a0'));
        }
        art.appendChild(corpo);

        if (pag.margem) {
          art.appendChild(UI.el('p', 'rbf-quatro__margem', pag.margem));
        }
        if (pag.mao) {
          art.appendChild(UI.el('p', 'rbf-quatro__mao', pag.mao));
        }
      }

      body.appendChild(art);
    }

    var fecho = UI.el('div', 'rbf-quatro__fecho');
    for (var f = 0; f < doc.fecho.length; f++) {
      fecho.appendChild(UI.el('p', 'rbf-quatro__linha', doc.fecho[f] || '\u00a0'));
    }
    body.appendChild(fecho);

    var sub = 'Retiradas do Arquivo antes do despacho';
    var lab = RBF.Paginas.endingLabel(doc.ending);
    if (lab) { sub += ' \u2014 leitura: ' + lab; }

    UI.panel({
      name:     'pages',
      title:    'As Quatro P\u00e1ginas',
      subtitle: sub,
      body:     body,
      wide:     true,
      actions: [
        { label: 'Fechar', className: 'rbf-btn-primary', onClick: function () { UI.closePanel(); } }
      ],
      onClose: panelReturn(fromTitle)
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
      title: 'Registro de autoria',
      body:  body,
      actions: [
        { label: 'Fechar', className: 'rbf-btn-primary', onClick: function () { UI.closePanel(); } }
      ],
      onClose: panelReturn(fromTitle)
    });
  }

  /* ======================================================================
     ENTRADA
     ====================================================================== */

  function bindGate() {
    el.gateBtn.addEventListener('click', function (ev) {
      ev.stopPropagation();
      openArchive();
    });

    /* Enter e Espaco no botao ja disparam click por padrao no HTML;
       aqui cobrimos a tecla quando o foco esta em outro lugar. */
    document.addEventListener('keydown', function (ev) {
      if (!el.gate.classList.contains('is-open')) { return; }
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        openArchive();
      }
    });
  }

  function bindShortcuts() {
    document.addEventListener('keydown', function (ev) {
      if (el.gate.classList.contains('is-open')) { return; }

      /* Navegacao do menu principal por teclado. */
      if (RBF.State.is('title') && !UI.isPanelOpen() && !UI.isModalOpen()) {
        if (ev.key === 'ArrowDown' || ev.key === 'ArrowRight') {
          ev.preventDefault(); moveNav(1); return;
        }
        if (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') {
          ev.preventDefault(); moveNav(-1); return;
        }
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault(); activateNav(); return;
        }
      }

      /* Escape com painel aberto e tratado em RBF.UI.bind, na fase de
         captura, e nao chega ate aqui. */
      if (ev.key === 'Escape') {
        if (RBF.State.is('title'))  { return; }
        if (RBF.State.hasOverlay()) { return; }
        ev.preventDefault();
        openGameMenu();
        return;
      }

      if (ev.key === 'F5') {
        if (RBF.State.is('playing')) { ev.preventDefault(); quickSave(); }
        return;
      }

      if (ev.key === 'F9') {
        if (!RBF.State.is('title') && !RBF.State.hasOverlay()) {
          ev.preventDefault();
          quickLoad();
        }
        return;
      }

      if ((ev.key === 'h' || ev.key === 'H') &&
          RBF.State.is('playing') && RBF.Engine.hasStarted()) {
        ev.preventDefault();
        RBF.Engine.pause();
        openHistory();
        return;
      }

      /* Tecla mantida pressionada repete o keydown. Sem este guarda,
         segurar Ctrl ligava e desligava o avanco rapido dezenas de
         vezes por segundo. */
      if (ev.repeat) { return; }

      if (ev.key === 'Control' && RBF.State.is('playing')) {
        ev.preventDefault();
        RBF.Engine.toggleSkip();
        return;
      }

      if ((ev.key === 'a' || ev.key === 'A') && RBF.State.is('playing')) {
        ev.preventDefault();
        RBF.Engine.toggleAuto();
        return;
      }

      /* Esconder a interface tinha botao na barra e nenhuma tecla. */
      if ((ev.key === 'v' || ev.key === 'V') && RBF.State.is('playing')) {
        ev.preventDefault();
        RBF.Engine.toggleUI();
      }
    });

    /* Botao direito abre o menu, mas so durante o jogo. */
    el.stage.addEventListener('contextmenu', function (ev) {
      if (!RBF.Engine.hasStarted()) { return; }
      if (RBF.State.hasOverlay()) { return; }
      if (el.gate.classList.contains('is-open')) { return; }
      ev.preventDefault();
      openGameMenu();
    });

    el.gameBar.addEventListener('click', function (ev) { ev.stopPropagation(); });

    document.getElementById('btn-menu').addEventListener('click', function (ev) {
      ev.stopPropagation();
      openGameMenu();
    });

    document.getElementById('rf-show-ui').addEventListener('click', function (ev) {
      ev.stopPropagation();
      RBF.Engine.toggleUI(false);
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
    bindGate();
    bindShortcuts();

    fillArchiveChrome();

    /* O portao aparece na primeira carga e depois de um recarregamento
       completo. Nao aparece ao voltar de um painel. */
    if (RBF.INTRO.enabled && !sessionOpened()) {
      showGate();
    } else {
      archiveOpen = true;
      el.gate.classList.remove('is-open');
      RBF.Audio.enterMenu();
      revealMenu(true);
    }
  }

  return {
    init:          init,
    showGate:      showGate,
    openArchive:   openArchive,
    revealMenu:    revealMenu,
    showTitle:     function () { revealMenu(true); },
    openGameMenu:  openGameMenu,
    openSaveLoad:  openSaveLoad,
    openSettings:  openSettings,
    openHistory:   openHistory,
    openGallery:   openGallery,
    openCredits:   openCredits,
    openChapters:  openChapterSelect,
    quickSave:     quickSave,
    quickLoad:     quickLoad,
    startNewGame:  startNewGame,
    warningGate:   warningGate,
    refreshTitle:  renderNav
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RBF.Menu;
}
