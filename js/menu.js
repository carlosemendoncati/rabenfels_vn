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
    el.conta    = document.getElementById('rf-conta');
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

  /* ---- cartao de estado do arquivo ---------------------------------------

     Le o save mais recente (rotas) e o progresso persistido (tempo). Se
     nao houver nem um nem outro, o cartao nao entra na composicao: zero
     em tres barras nao informa nada e ainda ocupa um quarto da tela.

     As rotas aparecem em barra e NUNCA em numero. E a mesma regra que
     js/routes.js ja aplica na lista de saves ("nao revela numero nem
     antecipa consequencia") e que o HUD em cena ja segue, com o
     mostrador radial. Proporcao o jogador pode ver; contagem, nao. */

  function renderDossier() {
    var card = document.getElementById('rf-dossier-card');
    if (!card) { return; }

    var save    = RBF.Saves.latest();
    var prog    = RBF.Saves.readProgress();
    var seconds = prog.totalPlaytime || 0;

    if (!save && !seconds) { card.hidden = true; return; }

    var A = RBF.ARCHIVE;
    document.getElementById('rf-dossier-title').textContent     = A.cardTitle;
    document.getElementById('rf-dossier-footlabel').textContent = A.cardFootLabel;
    document.getElementById('rf-dossier-time').textContent      =
      RBF.Saves.formatPlaytime(seconds);

    var rows  = document.getElementById('rf-dossier-rows');
    UI.clear(rows);

    var saved = (save && save.data && save.data.routes) || {};
    var defs  = RBF.Routes.defs();

    for (var i = 0; i < defs.length; i++) {
      (function (d, n) {
        var value = (typeof saved[d.id] === 'number') ? saved[d.id] : 0;
        var top   = d.max || 1;
        var frac  = Math.max(0, Math.min(1, value / top));

        var row = UI.el('div', 'rf-dossier__row rf-dossier__row--' + d.id);

        row.appendChild(UI.el('span', 'rf-dossier__sigil'));

        var meta = UI.el('div', 'rf-dossier__meta');
        meta.appendChild(UI.el('span', 'rf-dossier__name', d.label));
        row.appendChild(meta);

        var track = UI.el('span', 'rf-dossier__track');
        var fill  = UI.el('i', 'rf-dossier__fill');
        fill.style.setProperty('--rbf-fill', String(frac));
        fill.style.setProperty('--rbf-order', String(n));
        track.appendChild(fill);
        row.appendChild(track);

        rows.appendChild(row);
      })(defs[i], i);
    }

    card.hidden = false;
  }

  /* returning = volta de dentro do jogo, usa a versao curta da sequencia */
  function revealMenu(returning) {
    RBF.State.clearStack();
    RBF.State.set('title');

    UI.closePanel();
    fillArchiveChrome();
    renderNav();
    renderDossier();

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

    /* Numera os registros para o escalonamento da entrada. Antes os
       atrasos estavam escritos um a um em :nth-child ate o setimo, e o
       oitavo registro entrava na frente de todos, sem atraso. */
    RBF.Motion.stagger(el.nav.querySelectorAll('.rf-nav__item'));
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

  /* Home vai pro primeiro registro disponivel, End pro ultimo. */
  function moveNavEdge(toEnd) {
    var items = el.nav.querySelectorAll('.rf-nav__item:not(.is-locked)');
    if (!items.length) { return; }

    var btn = items[toEnd ? items.length - 1 : 0];
    markActive(btn);
    setNote(recordOf(btn).note);
    RBF.Audio.playUi('ui_hover');
    try { btn.focus({ preventScroll: true }); } catch (e) { btn.focus(); }
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
    /* Clique duplo, Enter repetido, ou clique junto com tecla abriam a
       mesma acao duas vezes: dois paineis empilhados, ou dois 'novo
       jogo' seguidos com o corte de tela pela metade. O portao reabre
       sozinho por tempo, entao nada trava se a acao morrer no meio. */
    if (!RBF.Motion.gate('record:' + rec.id, 500)) { return; }

    RBF.Audio.playUi('ui_confirm');

    switch (rec.action) {
      case 'newGame':  requestNewGame();     break;
      case 'continue': continueLatest();     break;
      case 'load':     openSaveLoad('load'); break;
      case 'chapters': openChapterSelect();  break;
      case 'gallery':  openGallery();        break;
      case 'pages':    openConta();          break;
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
    RBF.Audio.playUi('ui_page');
    RBF.Audio.leaveMenu();

    /* O ciclo da classe passou a ser de RBF.Motion: ele espera o fim da
       animacao de verdade e tem temporizador de seguranca se o evento
       nao vier. Antes o prazo era 'sweepMs + 500' escrito aqui, que ja
       nao batia com a animacao e cortava o ultimo trecho do corte.

       A troca de cena continua no meio do trajeto - o veu fica parado
       cobrindo a tela entre 38% e 64% da animacao, e sweepMs cai
       dentro dessa janela. */
    RBF.Motion.run(el.transition, 'is-sweeping',
                   RBF.CONFIG.timing.sweepAnimMs || 900);

    setTimeout(then, RBF.CONFIG.timing.sweepMs);
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
      /* O menu tambem abre por cima do percurso. Nesse caso a pilha
         devolve `percurso`, nao `playing`; limitar a retomada ao segundo
         deixava o canvas pausado para sempre depois de fechar o menu. */
      if (RBF.State.is('playing') || RBF.State.is('percurso')) {
        RBF.Engine.resume();
      }
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

  /* Aba visivel dos Ajustes. Sobrevive a fechar e reabrir o painel. */
  var settingsAba = 'audio';

  /* Os Ajustes eram uma coluna unica com cinco titulos de secao e vinte
     e poucos controles: para chegar em 'Teclas' o jogador rolava a
     tela inteira. As cinco secoes viraram cinco abas, com os MESMOS
     nomes e os MESMOS controles na mesma ordem - o titulo de secao
     virou o rotulo da aba, entao nenhum texto se perdeu.

     Cada aba e montada na primeira vez que aparece (ver tabLayout em
     js/ui.js), e nao todas de uma vez na abertura. */

  function openSettings() {
    var fromTitle = RBF.State.is('title');
    RBF.State.push('settings');

    var s = RBF.Settings;

    function grupo() { return UI.el('div', 'rbf-settings'); }

    function abaAudio() {
      var b = grupo();
      b.appendChild(UI.row('Volume geral',
        UI.slider(s.get('masterVolume'), 0, 1, 0.02, pct,
          function (v) { s.set('masterVolume', v); })));
      b.appendChild(UI.row('Trilha',
        UI.slider(s.get('bgmVolume'), 0, 1, 0.02, pct,
          function (v) { s.set('bgmVolume', v); })));
      b.appendChild(UI.row('Efeitos',
        UI.slider(s.get('sfxVolume'), 0, 1, 0.02, pct,
          function (v) { s.set('sfxVolume', v); })));
      b.appendChild(UI.row('Silenciar tudo',
        UI.toggle(s.get('muted'), function (v) { s.set('muted', v); })));
      return b;
    }

    function abaTexto() {
      var b = grupo();
      b.appendChild(UI.row('M\u00e1quina de escrever',
        UI.toggle(s.get('typewriter'), function (v) { s.set('typewriter', v); }),
        'desligado exibe a frase inteira de uma vez'));
      b.appendChild(UI.row('Velocidade',
        UI.slider(s.get('typeSpeedMs'), 0, 60, 1,
          function (v) { return v === 0 ? 'instant\u00e2neo' : v + ' ms'; },
          function (v) { s.set('typeSpeedMs', v); }),
        'menor = mais r\u00e1pido'));
      b.appendChild(UI.row('Tamanho do texto',
        UI.slider(s.get('textScale'), 0.8, 1.5, 0.05,
          function (v) { return Math.round(v * 100) + '%'; },
          function (v) { s.set('textScale', v); }),
        'sobre o tamanho desta tela'));
      b.appendChild(UI.row('Avan\u00e7o autom\u00e1tico',
        UI.toggle(s.get('autoAdvance'), function (v) { s.set('autoAdvance', v); })));
      b.appendChild(UI.row('Espera do avan\u00e7o',
        UI.slider(s.get('autoAdvanceMs'), 800, 6000, 100,
          function (v) { return (v / 1000).toFixed(1) + ' s'; },
          function (v) { s.set('autoAdvanceMs', v); })));
      return b;
    }

    function abaApresentacao() {
      var b = grupo();
      b.appendChild(UI.row('Movimento reduzido',
        UI.toggle(s.get('reducedMotion'), function (v) { s.set('reducedMotion', v); }),
        'encurta transi\u00e7\u00f5es e desliga movimento amplo'));
      b.appendChild(UI.row('HUD de rotas',
        UI.toggle(s.get('showRoutes'), function (v) {
          s.set('showRoutes', v);
          RBF.Engine.renderRoutes();
        }),
        'Esperan\u00e7a, Perda e Resposta durante a leitura'));
      b.appendChild(UI.row('Tela cheia',
        UI.toggle(isFullscreen(), function (v) { toggleFullscreen(v); }),
        supportsFullscreen() ? '' : 'n\u00e3o dispon\u00edvel neste navegador'));
      return b;
    }

    function abaConteudo() {
      var b = grupo();
      b.appendChild(UI.row('Aviso antes de come\u00e7ar',
        UI.toggle(s.get('contentWarning'), function (v) { s.set('contentWarning', v); }),
        'tela de aviso ao iniciar um jogo novo'));
      b.appendChild(UI.row('Autosave a cada cena',
        UI.toggle(s.get('autosaveEnabled'), function (v) { s.set('autosaveEnabled', v); })));
      b.appendChild(UI.row('Confirmar a\u00e7\u00f5es destrutivas',
        UI.toggle(s.get('confirmDestructive'), function (v) { s.set('confirmDestructive', v); }),
        'sobrescrever, apagar, voltar ao t\u00edtulo'));

      b.appendChild(UI.el('p', 'rbf-note',
        RBF.Storage.isPersistent()
          ? 'Ajustes e registros ficam guardados neste navegador. Mudar de ' +
            'endere\u00e7o ou de navegador come\u00e7a um arquivo novo; use ' +
            'exportar para levar um registro junto.'
          : 'Este navegador bloqueou o armazenamento local. Ajustes e ' +
            'registros valem apenas nesta sess\u00e3o. Use exportar para n\u00e3o ' +
            'perder progresso.'));
      return b;
    }

    function abaTeclas() {
      var b = grupo();
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
        b.appendChild(UI.row(keys[i][0], kb));
      }
      return b;
    }

    UI.panel({
      name:  'settings',
      title: 'Ajustes',
      subtitle: 'CONTROLE DE LEITURA',
      wide:  true,
      tabs: [
        { id: 'audio',        label: '\u00c1udio',           build: abaAudio },
        { id: 'texto',        label: 'Texto',                build: abaTexto },
        { id: 'apresentacao', label: 'Apresenta\u00e7\u00e3o', build: abaApresentacao },
        { id: 'conteudo',     label: 'Conte\u00fado',        build: abaConteudo },
        { id: 'teclas',       label: 'Teclas',               build: abaTeclas }
      ],
      tabStart: settingsAba,
      onTab: function (id) { settingsAba = id; },
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

  /* ======================================================================
     CAPITULOS

     Agrupado por rota desde que a obra passou a se partir no fim do
     Capitulo 9. Antes era uma lista corrida, e uma lista corrida com
     quatro Capitulos 10 diferentes nao diz nada a ninguem.

     O trecho compartilhado vem primeiro, sem cabecalho. Depois vem uma
     faixa por rota, com o nome, a condicao em linguagem de eixo e a
     contagem de quantos capitulos daquele caminho o jogador alcancou.

     REGRA DE LIBERACAO INALTERADA: capitulo nao alcancado continua
     travado e continua visivel. A faixa da rota aparece sempre - saber
     que existe um caminho que voce nao percorreu e o ponto.
     ====================================================================== */

  function cartaoCapitulo(ch, progress) {
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
    return card;
  }

  /* A condicao de uma rota em linguagem de eixo, lida de RBF.ROTAS.
     Nunca transcrita: se o limiar mudar no manifesto, muda aqui. */
  function condicaoDaRota(rt) {
    if (!rt.when) { return 'quando nenhum desvio ocorre'; }
    if (rt.when.flag) { return 'por escolha declarada, n\u00e3o por rota'; }
    var partes = [];
    var eixo;
    for (eixo in (rt.when.min || {})) {
      var dmin = RBF.Routes.defById(eixo);
      if (dmin) { partes.push(dmin.label + ' alta'); }
    }
    for (eixo in (rt.when.max || {})) {
      var dmax = RBF.Routes.defById(eixo);
      if (dmax) { partes.push(dmax.label + ' baixa'); }
    }
    return partes.length ? partes.join(' e ') : 'sem condi\u00e7\u00e3o';
  }

  function openChapterSelect() {
    var fromTitle = RBF.State.is('title');
    RBF.State.push('load');

    var body = UI.el('div', 'rbf-chapters-wrap');
    var progress = RBF.Saves.readProgress();
    var caps = RBF.CHAPTERS || [];
    var i;

    /* ---- o tronco: tudo o que nao tem rota, menos o Epilogo ---- */
    var tronco = UI.el('div', 'rbf-chapters');
    for (i = 0; i < caps.length; i++) {
      if (caps[i].rota || caps[i].id === 'epilogo') { continue; }
      tronco.appendChild(cartaoCapitulo(caps[i], progress));
    }
    body.appendChild(tronco);

    /* ---- uma faixa por rota ---- */
    var rotas = RBF.ROTAS || [];
    if (rotas.length) {
      var aviso = UI.el('div', 'rbf-rotas__aviso');
      aviso.appendChild(UI.el('p', 'rbf-rotas__avisoTx',
        'A partir daqui a obra se parte. O n\u00famero do cap\u00edtulo se repete: ' +
        'existe um Cap\u00edtulo 10 em cada caminho, e eles n\u00e3o t\u00eam nada em comum.'));
      body.appendChild(aviso);
    }

    for (i = 0; i < rotas.length; i++) {
      (function (rt) {
        var abertos = 0;
        for (var k = 0; k < rt.chapters.length; k++) {
          if (progress.chaptersReached.indexOf(rt.chapters[k]) !== -1) { abertos += 1; }
        }

        var faixa = UI.el('section', 'rbf-rota' + (abertos ? '' : ' is-intocada'));

        var cab = UI.el('div', 'rbf-rota__cab');
        cab.appendChild(UI.el('h3', 'rbf-rota__nome', rt.label));
        cab.appendChild(UI.el('span', 'rbf-rota__cond', condicaoDaRota(rt)));
        cab.appendChild(UI.el('span', 'rbf-rota__conta',
          abertos + '/' + rt.chapters.length));
        faixa.appendChild(cab);

        /* A nota da rota so aparece depois de ela ter sido percorrida
           ate o fim: antes disso ela entrega o desfecho. */
        var vistos = (RBF.Saves.endingsSeen && RBF.Saves.endingsSeen()) || [];
        if (vistos.indexOf(rt.ending) !== -1 && rt.nota) {
          faixa.appendChild(UI.el('p', 'rbf-rota__nota', rt.nota));
        } else {
          faixa.appendChild(UI.el('p', 'rbf-rota__nota rbf-rota__nota--lacre',
            '[ caminho n\u00e3o percorrido at\u00e9 o fim ]'));
        }

        var lista = UI.el('div', 'rbf-chapters');
        for (var j = 0; j < rt.chapters.length; j++) {
          for (var c = 0; c < caps.length; c++) {
            if (caps[c].id === rt.chapters[j]) {
              lista.appendChild(cartaoCapitulo(caps[c], progress));
              break;
            }
          }
        }
        faixa.appendChild(lista);
        body.appendChild(faixa);
      })(rotas[i]);
    }

    /* ---- o Epilogo volta a ser compartilhado ---- */
    for (i = 0; i < caps.length; i++) {
      if (caps[i].id !== 'epilogo') { continue; }
      var fecho = UI.el('div', 'rbf-chapters rbf-chapters--fecho');
      fecho.appendChild(cartaoCapitulo(caps[i], progress));
      body.appendChild(fecho);
    }

    var totalCaps = caps.length;
    var abertosTotal = 0;
    for (i = 0; i < caps.length; i++) {
      if (progress.chaptersReached.indexOf(caps[i].id) !== -1) { abertosTotal += 1; }
    }

    UI.panel({
      name:  'chapters',
      title: 'Cap\u00edtulos',
      subtitle: abertosTotal + ' de ' + totalCaps + ' alcan\u00e7ados \u00b7 ' +
                rotas.length + ' caminhos',
      body:  body,
      wide:  true,
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

     Extra pos-jogo. O Prologo planta "Faltam quatro". Esperanca e Perda
     mostram as folhas retiradas; Resposta conserva as 291; Cobertura
     para na 241. Aqui o jogador le o destino das mesmas quatro entradas.

     O conteudo depende das escolhas da partida concluida, entao dois
     jogadores nunca leem o mesmo documento. Quem carregou save antigo,
     sem as flags gravadas, ve a pagina como lacuna em vez de ver texto
     que nao corresponde ao que jogou.
     ====================================================================== */

  /* Corpo da aba das quatro paginas. Devolve o no; nao abre painel. */
  function corpoQuatroPaginas() {
    var doc = RBF.Paginas && RBF.Paginas.build();
    if (!doc) { return UI.el('p', 'rbf-quatro__vazio', '[ sem registro ]'); }

    var body = UI.el('div', 'rbf-quatro');

    /* O laudo do final alcancado vem antes do documento. E a unica parte
       da obra que diz o sentimento dela com todas as letras - pode,
       porque nao e cena, e quem le ja terminou. */
    var lau = RBF.Paginas.laudo();
    if (lau) {
      var box = UI.el('div', 'rbf-laudo');
      box.appendChild(UI.el('h3', 'rbf-laudo__tit', 'Leitura alcancada: ' + lau.titulo));
      var campos = [
        ['O que aconteceu',        lau.o_que],
        ['O que custou',           lau.custou],
        ['O que ela sentiu',       lau.ela_sentiu],
        ['O que foi da menina',    lau.klara],
        ['O que ela nao soube',    lau.nao_soube]
      ];
      for (var q = 0; q < campos.length; q++) {
        if (!campos[q][1]) { continue; }
        var sec = UI.el('div', 'rbf-laudo__sec');
        sec.appendChild(UI.el('span', 'rbf-laudo__rot', campos[q][0]));
        sec.appendChild(UI.el('p', 'rbf-laudo__tx', campos[q][1]));
        box.appendChild(sec);
      }
      body.appendChild(box);
    }

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

    return body;
  }

  /* ======================================================================
     REGISTRO DE LEITURAS

     O jogador terminava a obra sem nunca saber qual dos quatro finais
     tinha alcancado: o nome do final aparecia em um unico lugar do jogo,
     o subtitulo do painel das Quatro Paginas.

     Aqui as quatro leituras aparecem em forma de indice de arquivo. As
     alcancadas com o laudo; as que faltam como linha lacrada, do mesmo
     jeito que as fichas mostram lacuna em vez de esconder que ha mais.
     Sem porcentagem e sem trofeu.
     ====================================================================== */

  /* Corpo da aba das leituras. Devolve o no; nao abre painel. */
  function corpoLeituras() {
    var lista = (RBF.Paginas && RBF.Paginas.leituras()) || [];
    var body = UI.el('div', 'rbf-leituras');
    var vistas = 0;

    for (var i = 0; i < lista.length; i++) {
      var L = lista[i];
      if (L.vista) { vistas += 1; }

      var art = UI.el('article', 'rbf-leitura' + (L.vista ? '' : ' is-lacrada'));
      var head = UI.el('div', 'rbf-leitura__head');
      head.appendChild(UI.el('span', 'rbf-leitura__num',
        L.vista ? String(i + 1) : '\u2014'));
      head.appendChild(UI.el('h3', 'rbf-leitura__tit',
        L.vista ? L.label : 'leitura nao alcancada'));
      art.appendChild(head);

      if (L.vista) {
        if (L.nota) { art.appendChild(UI.el('p', 'rbf-leitura__nota', L.nota)); }
        if (L.laudo) {
          art.appendChild(UI.el('p', 'rbf-leitura__tx', L.laudo.o_que));
          art.appendChild(UI.el('p', 'rbf-leitura__tx', L.laudo.custou));
        }
      } else {
        art.appendChild(UI.el('p', 'rbf-leitura__vazio',
          '[ nenhum registro desta leitura neste arquivo ]'));
      }
      body.appendChild(art);
    }

    return body;
  }


  /* ======================================================================
     A ARVORE

     O jogador terminava a obra sem ter como comparar o que escolheu com
     o que existia para escolher. As rotas apareciam como tres mostradores
     no HUD, sem numero e sem causa, e o efeito de uma escolha so aparecia
     na cena - onde, de proposito, nada e explicado.

     Aqui as dez decisoes aparecem inteiras, com os tres ramos de cada uma
     e o delta de rota LIDO DA PROPRIA OPCAO, e as quatro leituras aparecem na
     ordem em que o jogo os avalia.

     A regra de liberacao e a mesma do resto do extra e nao afrouxa aqui:
     o enunciado e as opcoes aparecem quando o capitulo foi alcancado - o
     jogador ja leu aquele texto na tela. O delta e a consequencia so
     aparecem no ramo que ele percorreu de fato. O que falta aparece como
     lacuna, e nao some.
     ====================================================================== */


  /* ----------------------------------------------------------------------
     O MAPA

     Desenha o grafo que RBF.Arvore.grafo() calculou. Coordenada nenhuma
     e decidida aqui: este bloco so vira no em <rect> e aresta em <path>.

     O SVG tem viewBox e largura minima. Em monitor cabe inteiro; em
     telefone o quadro rola de lado, que e como se le um fluxograma
     grande em tela pequena. A lista detalhada continua embaixo, e e ela
     que serve para LER - o mapa serve para ver a forma.

     Clicar num no leva a linha correspondente da lista.
     ---------------------------------------------------------------------- */

  var NS_SVG = 'http://www.w3.org/2000/svg';

  function svgEl(tag, attrs) {
    var n = document.createElementNS(NS_SVG, tag);
    for (var k in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, k)) {
        n.setAttribute(k, String(attrs[k]));
      }
    }
    return n;
  }

  function svgTexto(x, y, classe, txt) {
    var t = svgEl('text', { x: x, y: y, class: classe });
    t.textContent = txt || '';
    return t;
  }

  function desenharMapa(g, aoClicar) {
    var quadro = UI.el('div', 'rbf-arv__mapa');

    var svg = svgEl('svg', {
      viewBox: '0 0 ' + g.largura + ' ' + g.altura,
      class:   'rbf-arv__svg',
      role:    'img',
      'aria-label':
        'Mapa das dez decisoes e das quatro leituras. A lista completa vem logo abaixo.'
    });

    /* Arestas antes dos nos, para a caixa cobrir a ponta da linha. */
    var camadaE = svgEl('g', { class: 'rbf-arv__arestas' });
    for (var i = 0; i < g.arestas.length; i++) {
      var a = g.arestas[i];
      camadaE.appendChild(svgEl('path', {
        d: a.d,
        class: 'rbf-e rbf-e--' + a.tipo + (a.ativo ? ' is-ativo' : '')
      }));
    }
    svg.appendChild(camadaE);

    var camadaN = svgEl('g', { class: 'rbf-arv__nos' });

    for (var n = 0; n < g.nos.length; n++) {
      (function (no) {
        var cls = 'rbf-n rbf-n--' + no.tipo + ' is-' + no.estado;
        if (no.rota) { cls += ' rbf-n--rota-' + no.rota; }

        var grupo = svgEl('g', { class: cls });

        grupo.appendChild(svgEl('rect', {
          x: no.x, y: no.y, width: no.w, height: no.h, rx: 2, class: 'rbf-n__caixa'
        }));

        if (no.tipo === 'cap') {
          grupo.appendChild(svgTexto(no.cx, no.y + 20, 'rbf-n__tit', no.rotulo));
          if (no.sub) { grupo.appendChild(svgTexto(no.cx, no.y + 37, 'rbf-n__sub', no.sub)); }

        } else if (no.tipo === 'marco') {
          grupo.appendChild(svgTexto(no.cx, no.y + 21, 'rbf-n__marco', no.rotulo));
          grupo.appendChild(svgTexto(no.cx, no.y + 37, 'rbf-n__sub', no.sub));

        } else if (no.tipo === 'rot') {
          grupo.appendChild(svgTexto(no.cx, no.y + 20, 'rbf-n__rot', no.rotulo));

        } else if (no.tipo === 'rcap') {
          grupo.appendChild(svgTexto(no.cx, no.y + 17, 'rbf-n__rcapNum', no.rotulo));
          if (no.sub) { grupo.appendChild(svgTexto(no.cx, no.y + 32, 'rbf-n__rcapTit', no.sub)); }

        } else if (no.tipo === 'opt') {
          if (no.sub) {
            grupo.appendChild(svgTexto(no.x + 9, no.y + 17, 'rbf-n__marca', no.sub));
          }
          grupo.appendChild(svgTexto(no.cx, no.y + 36, 'rbf-n__opt', no.rotulo));

        } else {
          grupo.appendChild(svgTexto(no.x + 9, no.y + 17, 'rbf-n__marca', no.sub));
          grupo.appendChild(svgTexto(no.cx, no.y + 40, 'rbf-n__fim', no.rotulo));
        }

        /* So no que tem para onde levar. Marco e caixa lacrada nao
           viram alvo de clique: nao ha o que abrir do outro lado. */
        var clicavel = (no.tipo === 'opt' || no.tipo === 'fim') && no.estado !== 'lacrado';
        if (clicavel) {
          grupo.setAttribute('tabindex', '0');
          grupo.setAttribute('role', 'button');
          grupo.classList.add('is-clicavel');
          grupo.addEventListener('click', function (ev) {
            ev.stopPropagation();
            aoClicar(no);
          });
          grupo.addEventListener('keydown', function (ev) {
            if (ev.key === 'Enter' || ev.key === ' ') {
              ev.preventDefault();
              aoClicar(no);
            }
          });
        }

        var titulo = svgEl('title', {});
        titulo.textContent = no.rotulo + (no.sub ? ' \u00b7 ' + no.sub : '');
        grupo.appendChild(titulo);

        camadaN.appendChild(grupo);
      })(g.nos[n]);
    }

    svg.appendChild(camadaN);
    quadro.appendChild(svg);
    return quadro;
  }

  /* Leva a linha da lista e acende por um instante. Sem rolagem
     instantanea: o painel ja rola, e o salto seco desorienta. */
  function irPara(chave) {
    var alvo = document.querySelector('[data-no="' + chave + '"]');
    if (!alvo) { return; }
    if (alvo.scrollIntoView) { alvo.scrollIntoView({ block: 'center' }); }
    alvo.classList.remove('is-apontado');
    /* reinicia a animacao */
    if (alvo.offsetWidth !== undefined) { void alvo.offsetWidth; }
    alvo.classList.add('is-apontado');
  }

  /* Selo de rota: rotulo e delta, com a cor que a rota ja tem no HUD.
     Le RBF.Routes para o nome, e o numero vem do roteiro. */
  function seloRota(id, valor) {
    var def = RBF.Routes.defById(id);
    if (!def) { return null; }
    var sel = UI.el('span', 'rbf-arv__rota rbf-arv__rota--' + id);
    sel.appendChild(UI.el('span', 'rbf-arv__rotaNome', def.label));
    sel.appendChild(UI.el('span', 'rbf-arv__rotaVal', '+' + valor));
    sel.title = def.label + ' ' + '\u2014 ' + def.hint;
    return sel;
  }

  function corpoArvore() {
    var nos = RBF.Arvore && RBF.Arvore.build();
    if (!nos) { return UI.el('p', 'rbf-quatro__vazio', '[ sem registro ]'); }

    var body = UI.el('div', 'rbf-arv');

    var d = RBF.ARVORE || {};
    if (d.nota && d.nota.length) {
      var cab = UI.el('div', 'rbf-arv__cab');
      for (var c = 0; c < d.nota.length; c++) {
        cab.appendChild(UI.el('p', 'rbf-arv__cabline', d.nota[c]));
      }
      body.appendChild(cab);
    }

    /* ---- as dez decisoes ---- */
    /* O mapa. Vem antes da lista porque e ele que responde a pergunta
       "qual e a forma disto"; a lista responde "o que cada coisa fez". */
    var g = RBF.Arvore.grafo();
    if (g) {
      body.appendChild(desenharMapa(g, function (no) {
        irPara(no.tipo === 'fim' ? 'fim:' + no.final : no.escolha + ':' + no.opcao);
      }));
      body.appendChild(UI.el('p', 'rbf-arv__legenda',
        'Clique num ramo ou numa leitura para ir ao registro dela. ' +
        'A linha tracejada e a unica coisa que o texto nao diz: a leitura ' +
        'e decidida no fim do Cap\u00edtulo 9 e s\u00f3 aparece depois que a rota termina.'));
    }

    var lista = UI.el('ol', 'rbf-arv__lista');

    for (var i = 0; i < nos.length; i++) {
      var n  = nos[i];
      var li = UI.el('li', 'rbf-arv__no' + (n.alcancada ? '' : ' is-lacrado'));

      var head = UI.el('div', 'rbf-arv__head');
      head.appendChild(UI.el('span', 'rbf-arv__cap', n.chapterLabel || ''));
      head.appendChild(UI.el('h3', 'rbf-arv__tit',
        n.alcancada ? n.prompt : 'decis\u00e3o n\u00e3o alcan\u00e7ada'));
      head.appendChild(UI.el('span', 'rbf-arv__conta',
        n.abertos + '/' + n.total));
      li.appendChild(head);

      if (!n.alcancada) {
        li.appendChild(UI.el('p', 'rbf-arv__vazio',
          '[ nenhum registro desta decis\u00e3o neste arquivo ]'));
        lista.appendChild(li);
        continue;
      }

      if (n.decide) {
        li.appendChild(UI.el('p', 'rbf-arv__decide', n.decide));
      }

      var ramos = UI.el('ul', 'rbf-arv__ramos');
      for (var j = 0; j < n.opts.length; j++) {
        var o  = n.opts[j];
        var cl = 'rbf-arv__ramo';
        if (!o.tomada)  { cl += ' is-fechado'; }
        if (o.naUltima) { cl += ' is-atual'; }

        var ram = UI.el('li', cl);
        ram.setAttribute('data-no', n.id + ':' + o.id);
        var lin = UI.el('div', 'rbf-arv__linha');
        lin.appendChild(UI.el('span', 'rbf-arv__marca', o.id));
        lin.appendChild(UI.el('span', 'rbf-arv__tx', o.tx));
        ram.appendChild(lin);

        if (o.tomada) {
          var rot = UI.el('div', 'rbf-arv__rotas');
          var algum = false;
          for (var r in o.routes) {
            if (!Object.prototype.hasOwnProperty.call(o.routes, r)) { continue; }
            var sel = seloRota(r, o.routes[r]);
            if (sel) { rot.appendChild(sel); algum = true; }
          }
          if (!algum) {
            rot.appendChild(UI.el('span', 'rbf-arv__rota is-nula', 'n\u00e3o move rota'));
          }
          ram.appendChild(rot);

          if (o.efeito) {
            ram.appendChild(UI.el('p', 'rbf-arv__efeito', o.efeito));
          }
        } else {
          ram.appendChild(UI.el('p', 'rbf-arv__efeito rbf-arv__efeito--lacuna',
            '[ ramo n\u00e3o percorrido ]'));
        }

        ramos.appendChild(ram);
      }
      li.appendChild(ramos);
      lista.appendChild(li);
    }
    body.appendChild(lista);

    /* ---- as quatro leituras ---- */
    var fins = RBF.Arvore.finais() || [];
    if (fins.length) {
      body.appendChild(UI.el('h3', 'rbf-arv__sec', 'Para onde as dez decis\u00f5es levam'));

      var grade = UI.el('ul', 'rbf-arv__finais');
      for (var f = 0; f < fins.length; f++) {
        var F  = fins[f];
        var cf = 'rbf-arv__final';
        if (!F.visto) { cf += ' is-lacrado'; }
        if (F.atual)  { cf += ' is-atual'; }

        var fl = UI.el('li', cf);
        fl.setAttribute('data-no', 'fim:' + F.id);
        var fh = UI.el('div', 'rbf-arv__finalHead');
        fh.appendChild(UI.el('span', 'rbf-arv__finalNum', String(F.ordem)));
        fh.appendChild(UI.el('h4', 'rbf-arv__finalTit',
          F.visto ? F.label : 'leitura n\u00e3o alcan\u00e7ada'));
        if (F.padrao) {
          fh.appendChild(UI.el('span', 'rbf-arv__finalTag', 'padr\u00e3o'));
        }
        fl.appendChild(fh);

        /* Os eixos, com direcao, aparecem mesmo na leitura que falta:
           e o bastante para o jogador saber para onde empurrar, e nao
           entrega nada do que acontece la. Sem isso, os cartoes fechados
           ficavam identicos e a grade virava uma parede. */
        var ex = UI.el('p', 'rbf-arv__finalEixos',
          F.eixos.length
            ? 'responde a ' + F.eixos.join(' e ')
            : 'n\u00e3o depende de rota');
        fl.appendChild(ex);

        if (F.visto) {
          if (F.condicao) { fl.appendChild(UI.el('p', 'rbf-arv__finalTx', F.condicao)); }
          if (F.porta)    { fl.appendChild(UI.el('p', 'rbf-arv__finalTx', F.porta)); }
        } else {
          fl.appendChild(UI.el('p', 'rbf-arv__finalVazio',
            '[ nenhum registro desta leitura neste arquivo ]'));
        }
        grade.appendChild(fl);
      }
      body.appendChild(grade);
    }

    return body;
  }

  /* ======================================================================
     A CONTA - pagina inteira, tres secoes.

     Era um painel modal. Deixou de caber: as quatro paginas, as
     leituras e o mapa da arvore disputavam uma caixa de 940px com
     moldura ornamentada por fora e rolagem por dentro, e o mapa - que
     tem 640 por 2700 unidades - ficava espremido num quadro que ja
     rolava dentro de outro que tambem rolava.

     Agora e uma tela irma do menu principal, com trilho de secoes a
     esquerda e o corpo rolando na altura toda da janela.

     DOIS DEFEITOS REAIS QUE VIERAM JUNTO:

     1. RBF.State.push('pages') nunca funcionou. 'pages' nao consta de
        RBF.State.STATES, entao push() recusava em silencio, nada era
        empilhado, e o pop() do fechamento tirava da pilha o estado de
        OUTRO painel. O estado novo se chama 'conta' e esta declarado.

     2. Rolagem aninhada. O quadro do mapa rola de lado dentro do corpo
        do painel, que rolava para baixo dentro do overlay. Em telefone
        o gesto ia para o container errado. Com a pagina, so o corpo
        rola na vertical.
     ====================================================================== */

  /* Secao visivel. Sobrevive a fechar e reabrir. */
  var contaAba = 'paginas';

  var CONTA_SECOES = [
    { id: 'paginas',  rot: 'As Quatro P\u00e1ginas',
      nota: 'Quatro entradas. O destino delas muda com a leitura.' },
    { id: 'leituras', rot: 'As Leituras',
      nota: 'Os quatro desfechos, e qual deles voc\u00ea alcan\u00e7ou.' },
    { id: 'arvore',   rot: 'A \u00c1rvore',
      nota: 'Dez decis\u00f5es, quatro caminhos, e o que cada ramo mudou.' }
  ];

  function contaSubtitulo() {
    var run = (RBF.Saves.lastRun && RBF.Saves.lastRun()) || {};
    var lab = RBF.Paginas.endingLabel(run.ending) || '';
    var ep  = RBF.Paginas.endingProgress();
    var rc  = (RBF.Arvore && RBF.Arvore.counts()) || { taken: 0, total: 0 };
    return (lab ? 'Leitura alcan\u00e7ada: ' + lab + ' \u00b7 ' : '') +
           ep.seen + ' de ' + ep.total + ' registradas \u00b7 ' +
           rc.taken + ' de ' + rc.total + ' ramos percorridos';
  }

  function corpoDaSecao(id) {
    if (id === 'paginas') { return corpoQuatroPaginas(); }
    if (id === 'arvore')  { return corpoArvore(); }
    return corpoLeituras();
  }

  function pintarConta() {
    var rail = document.getElementById('rf-conta-rail');
    var body = document.getElementById('rf-conta-body');
    var sub  = document.getElementById('rf-conta-sub');
    if (!rail || !body) { return; }

    if (sub) { sub.textContent = contaSubtitulo(); }

    UI.clear(rail);
    for (var i = 0; i < CONTA_SECOES.length; i++) {
      (function (d, n) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'rf-conta__aba' + (contaAba === d.id ? ' on' : '');
        b.setAttribute('aria-pressed', contaAba === d.id ? 'true' : 'false');

        var num = (RBF.ARCHIVE && RBF.ARCHIVE.numerals) || [];
        b.appendChild(UI.el('span', 'rf-conta__abaNum', num[n] || String(n + 1)));
        b.appendChild(UI.el('span', 'rf-conta__abaRot', d.rot));
        b.appendChild(UI.el('span', 'rf-conta__abaNota', d.nota));

        b.addEventListener('click', function (ev) {
          ev.stopPropagation();
          if (contaAba === d.id) { return; }
          contaAba = d.id;
          RBF.Audio.playUi('ui_page');
          pintarConta();
          body.scrollTop = 0;
        });
        rail.appendChild(b);
      })(CONTA_SECOES[i], i);
    }

    UI.clear(body);
    body.appendChild(corpoDaSecao(contaAba));
  }

  /* De onde a pagina foi aberta, para o Fechar devolver a mesma tela. */
  var contaVeioDoTitulo = true;

  function openConta() {
    if (!RBF.Paginas || !RBF.Paginas.available()) { return; }
    if (!el.conta) { return; }

    contaVeioDoTitulo = RBF.State.is('title');
    UI.closePanel();
    RBF.State.push('conta');

    el.conta.hidden = false;
    void el.conta.offsetWidth;          /* reinicia a animacao de entrada */
    el.conta.classList.add('show');

    pintarConta();
    RBF.Audio.playUi('ui_page');

    var body = document.getElementById('rf-conta-body');
    if (body) { body.scrollTop = 0; }
  }

  function closeConta() {
    if (!el.conta || !contaAberta()) { return; }
    el.conta.classList.remove('show');
    RBF.Audio.playUi('ui_back');

    var alvo = el.conta;
    setTimeout(function () {
      alvo.hidden = true;
      UI.clear(document.getElementById('rf-conta-body'));
    }, RBF.CONFIG.timing.contaMs);

    RBF.State.pop(contaVeioDoTitulo ? 'title' : 'paused');
    if (contaVeioDoTitulo) { renderNav(); }
  }

  /* Quem sabe se a pagina esta aberta e a maquina de estados, e nao o
     atributo hidden do elemento: 'hidden' e atributo em HTML e
     propriedade em JS, e contar com o reflexo entre os dois amarra o
     codigo a um detalhe de DOM que nem todo ambiente honra. */
  function contaAberta() { return RBF.State.is('conta'); }

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

  /* A pagina "A Conta" nao passa por RBF.UI.bind: ela nao e overlay, e
     um irmao do menu principal. O botao e o clique no fundo fecham; o
     clique dentro do corpo nao. */
  function bindConta() {
    if (!el.conta) { return; }

    var fechar = document.getElementById('rf-conta-close');
    if (fechar) {
      fechar.addEventListener('click', function (ev) {
        ev.stopPropagation();
        closeConta();
      });
    }
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
        if (ev.key === 'Home') {
          ev.preventDefault(); moveNavEdge(false); return;
        }
        if (ev.key === 'End') {
          ev.preventDefault(); moveNavEdge(true); return;
        }
      }

      /* Escape com painel aberto e tratado em RBF.UI.bind, na fase de
         captura, e nao chega ate aqui. */
      if (ev.key === 'Escape' && contaAberta()) {
        ev.preventDefault();
        closeConta();
        return;
      }

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
    bindConta();

    RBF.Assets.applyUiArtVars();
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
    openConta:     openConta,
    closeConta:    closeConta,
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
