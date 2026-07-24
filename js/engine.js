/* ==========================================================================
   ARQUIVO RABENFELS - js/engine.js
   Renderer. Nao contem texto de roteiro nem caminho de asset.

   ---------------------------------------------------------------------------
   TIPOS DE BEAT (usados em js/data/*.js)
   ---------------------------------------------------------------------------
   { t:'scene', id, chapter, title, bg, bgm, sfx }  marca cena, troca bg/bgm
   { t:'fade_in' } / { t:'fade_out' }               transicao de tela
   { t:'pause', ms }                                espera
   { t:'bg',  id }                                  troca so o background
   { t:'bgm', id }                                  troca a trilha (null = parar)
   { t:'sfx', id }                                  efeito pontual
   { t:'spr', ch, ex, pos }                         mostra sprite
   { t:'spr_hide', ch } / { t:'spr_clear' }         esconde sprites
   { t:'nar', tx }                                  narracao
   { t:'inn', tx }                                  pensamento
   { t:'dial', ch, tx }                             fala
   { t:'arc', lns, label }                          cartao do Arquivo
   { t:'last', lns }                                ultima entrada
   { t:'title', main, sub, time }                   cartao de titulo
   { t:'chap', num, name, chapter }                 cartao de capitulo
   { t:'end_chap', line1, line2, chapter }          fim de capitulo
   { t:'flag', set:{...} }                          grava estado
   { t:'cho', id, prompt, opts:[ { id, tx, flags, then } ] }

   Campo opcional em qualquer beat:
     if: { flag: valor }   o beat so executa quando todas as flags baterem

   Regra de escolha: 'then' e injetado no fluxo logo apos a escolha e o
   roteiro reconverge no beat seguinte. A escolha fica registrada em
   RBF.STATE.choiceLog, o que permite reconstruir o mesmo array no load.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.Engine = (function () {
  'use strict';

  /* ---- estado do roteiro ------------------------------------------------ */

  var script        = [];
  var index         = 0;
  var busy          = false;
  var awaitingClick = false;
  var choiceActive  = false;
  var finished      = false;

  var typing     = false;
  var typeTimer  = null;
  var fullText   = '';
  var typeTarget = null;

  var autoTimer       = null;
  var pendingAutosave = false;
  var lastTextBeat    = null;
  var started         = false;

  /* ---- tempo de jogo ---------------------------------------------------- */

  var playtimeBase = 0;      /* segundos acumulados                   */
  var playtimeMark = null;   /* instante de entrada em 'playing'      */

  /* ---- apresentacao ----------------------------------------------------- */

  var pres = {
    backgroundId: 'bg_black',
    bgmId:        null,
    textMode:     'narration',
    sprites:      {}          /* charId -> { ex, pos } */
  };

  RBF.STATE = {
    flags:           {},
    variables:       {},
    unlockedContent: [],
    choiceLog:       {},
    chapter:         null,
    scene:           null,
    sceneTitle:      ''
  };

  /* ---- elementos -------------------------------------------------------- */

  var el = {};

  function grab() {
    el.stage    = document.getElementById('vn');
    el.bg       = document.getElementById('bg');
    el.fader    = document.getElementById('fader');
    el.sprites  = document.getElementById('sprites');
    el.namebox  = document.getElementById('namebox');
    el.text     = document.getElementById('textcontent');
    el.textbox  = document.getElementById('textbox');
    el.arcBox   = document.getElementById('archive-box');
    el.arcLabel = document.getElementById('archive-label');
    el.arcLines = document.getElementById('archive-lines');
    el.lastBox  = document.getElementById('last-box');
    el.lastLabel= document.getElementById('last-label');
    el.lastLines= document.getElementById('last-lines');
    el.choices  = document.getElementById('choices');
    el.title    = document.getElementById('title-screen');
    el.chap     = document.getElementById('chapter-screen');
    el.endChap  = document.getElementById('endchap-screen');
    el.hint     = document.getElementById('hint');
  }

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  /* ---- sprites ---------------------------------------------------------- */

  var spriteNodes = {};

  function spriteNode(charId) {
    if (spriteNodes[charId]) { return spriteNodes[charId]; }
    var div = document.createElement('div');
    div.className = 'sprite';
    div.setAttribute('data-char', charId);
    var img = document.createElement('img');
    img.alt = '';
    div.appendChild(img);
    el.sprites.appendChild(div);
    spriteNodes[charId] = div;
    return div;
  }

  function showSprite(charId, expression, pos, silent) {
    var div = spriteNode(charId);
    var img = div.querySelector('img');

    RBF.Assets.applyCharacter(img, charId, expression, function (visible, size) {
      div.className = 'sprite pos-' + (pos || 'center') + ' size-' + (size || 'bust');
      if (!visible) { div.classList.remove('show'); return; }
      if (silent) { div.classList.add('show'); return; }
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { div.classList.add('show'); });
      });
    });

    pres.sprites[charId] = { ex: expression || null, pos: pos || 'center' };
  }

  function hideSprite(charId) {
    var div = spriteNodes[charId];
    if (div) { div.classList.remove('show'); }
    delete pres.sprites[charId];
  }

  function clearSprites() {
    for (var k in spriteNodes) {
      if (Object.prototype.hasOwnProperty.call(spriteNodes, k)) {
        spriteNodes[k].classList.remove('show');
      }
    }
    pres.sprites = {};
  }

  /* ---- overlays --------------------------------------------------------- */

  function hideOverlays() {
    el.arcBox.classList.remove('show');
    el.lastBox.classList.remove('show');
    el.choices.classList.remove('show');
    el.title.classList.remove('show');
    el.chap.classList.remove('show');
    el.endChap.classList.remove('show');
  }

  function resetText() {
    el.namebox.className = 'namebox';
    el.namebox.style.color = '';
    el.namebox.textContent = '';
    el.text.className = 'textcontent';
    el.text.textContent = '';
    el.textbox.classList.remove('show');
  }

  /* ---- maquina de escrever ---------------------------------------------- */

  function typeOut(target, text) {
    stopTyping();
    fullText   = text;
    typeTarget = target;

    var speed = RBF.CONFIG.text.typeSpeedMs;

    if (!speed) {
      target.textContent = text;
      typing = false;
      showCursor(true);
      scheduleAuto();
      return;
    }

    typing = true;
    target.textContent = '';
    var i = 0;

    function step() {
      if (i < text.length) {
        target.textContent += text.charAt(i);
        i += 1;
        typeTimer = setTimeout(step, RBF.CONFIG.text.typeSpeedMs);
      } else {
        typing = false;
        typeTimer = null;
        showCursor(true);
        scheduleAuto();
      }
    }
    step();
  }

  function completeTyping() {
    if (!typing) { return; }
    clearTimeout(typeTimer);
    typeTimer = null;
    typing = false;
    if (typeTarget) { typeTarget.textContent = fullText; }
    showCursor(true);
    scheduleAuto();
  }

  function stopTyping() {
    if (typeTimer) { clearTimeout(typeTimer); typeTimer = null; }
    typing = false;
    cancelAuto();
    showCursor(false);
  }

  function showCursor(on) {
    if (el.text) { el.text.classList.toggle('waiting', !!on); }
  }

  /* ---- avanco automatico ------------------------------------------------ */

  function scheduleAuto() {
    cancelAuto();
    if (!RBF.Settings.get('autoAdvance')) { return; }
    if (!RBF.State.canAdvanceScript()) { return; }

    autoTimer = setTimeout(function () {
      autoTimer = null;
      if (RBF.State.canAdvanceScript() && awaitingClick) { advance(); }
    }, RBF.Settings.get('autoAdvanceMs'));
  }

  function cancelAuto() {
    if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; }
  }

  /* ---- beat de texto ---------------------------------------------------- */

  function textBeat(mode, speakerId, text, record) {
    hideOverlays();
    resetText();
    el.textbox.classList.add('show');

    if (speakerId) {
      var def = RBF.CHARACTERS[speakerId];
      el.namebox.textContent = def ? def.name : speakerId;
      el.namebox.style.color = def ? def.color : '#c8a878';
      el.namebox.classList.add('show');
    }

    pres.textMode = mode;
    el.text.className = 'textcontent ' + mode;
    typeOut(el.text, text);

    if (record) {
      RBF.History.push(recordKind(mode), speakerId, text, RBF.STATE.chapter, RBF.STATE.scene);
    }
  }

  function recordKind(mode) {
    if (mode === 'inner')  { return 'inn'; }
    if (mode === 'speech') { return 'dial'; }
    return 'nar';
  }

  /* ---- condicionais ----------------------------------------------------- */

  /* Um beat com 'if' so roda quando todas as flags pedidas conferem. */
  function passes(beat) {
    if (!beat || !beat.if) { return true; }
    for (var k in beat.if) {
      if (!Object.prototype.hasOwnProperty.call(beat.if, k)) { continue; }
      if (RBF.STATE.flags[k] !== beat.if[k]) { return false; }
    }
    return true;
  }

  /* ---- executor --------------------------------------------------------- */

  /* silent = reconstruindo a tela num load: sem audio, sem espera,
     sem registro no historico.
     retorna: 'go' | 'wait' | 'choice' */
  async function exec(beat, silent) {
    switch (beat.t) {

      case 'scene':
        RBF.STATE.scene      = beat.id || RBF.STATE.scene;
        RBF.STATE.sceneTitle = beat.title || RBF.STATE.sceneTitle;
        if (beat.chapter && beat.chapter !== RBF.STATE.chapter) {
          RBF.STATE.chapter = beat.chapter;
          RBF.Saves.markChapterReached(beat.chapter);
        }
        if (beat.bg) { applyBackground(beat.bg); }
        if (beat.bgm !== undefined) { applyBgm(beat.bgm); }
        if (beat.sfx && !silent) { RBF.Audio.playSfx(beat.sfx); }
        if (beat.clearSprites) { clearSprites(); }
        if (!silent) { pendingAutosave = true; }
        return 'go';

      case 'bg':
        applyBackground(beat.id);
        return 'go';

      case 'bgm':
        applyBgm(beat.id || null);
        return 'go';

      case 'sfx':
        if (!silent) { RBF.Audio.playSfx(beat.id); }
        return 'go';

      case 'spr':
        showSprite(beat.ch, beat.ex, beat.pos, silent);
        return 'go';

      case 'spr_hide':
        hideSprite(beat.ch);
        return 'go';

      case 'spr_clear':
        clearSprites();
        return 'go';

      case 'flag':
        applyFlags(beat.set);
        return 'go';

      case 'pause':
        if (!silent) { await delay(beat.ms || RBF.CONFIG.text.pauseMs); }
        return 'go';

      case 'fade_out':
        stopTyping();
        if (!silent) {
          el.fader.classList.add('out');
          await delay(RBF.CONFIG.timing.fadeMs);
        }
        hideOverlays();
        resetText();
        clearSprites();
        return 'go';

      case 'fade_in':
        el.fader.classList.remove('out');
        if (!silent) { await delay(RBF.CONFIG.timing.fadeMs); }
        return 'go';

      case 'nar':
        lastTextBeat = beat;
        textBeat('narration', null, beat.tx, !silent);
        return 'wait';

      case 'inn':
        lastTextBeat = beat;
        textBeat('inner', null, beat.tx, !silent);
        return 'wait';

      case 'dial':
        lastTextBeat = beat;
        textBeat('speech', beat.ch, '\u201c' + beat.tx + '\u201d', !silent);
        return 'wait';

      case 'arc':
        lastTextBeat = beat;
        stopTyping();
        hideOverlays();
        resetText();
        pres.textMode = 'archive';
        el.arcLabel.textContent = beat.label || RBF.UI_TEXT.archiveLabel;
        el.arcLines.textContent = '';
        for (var i = 0; i < beat.lns.length; i++) {
          var p = document.createElement('p');
          p.textContent = beat.lns[i];
          el.arcLines.appendChild(p);
        }
        el.arcBox.classList.add('show');
        if (!silent) {
          RBF.History.push('arc', null, beat.lns.join('\n'), RBF.STATE.chapter, RBF.STATE.scene);
          await delay(RBF.CONFIG.timing.arcMs);
        }
        return 'wait';

      case 'last':
        lastTextBeat = beat;
        stopTyping();
        hideOverlays();
        resetText();
        pres.textMode = 'last';
        el.lastLabel.textContent = beat.label || RBF.UI_TEXT.lastLabel;
        el.lastLines.textContent = beat.lns.join('\n');
        el.lastBox.classList.add('show');
        el.lastBox.scrollTop = 0;
        if (!silent) {
          RBF.History.push('last', null, beat.lns.join('\n'), RBF.STATE.chapter, RBF.STATE.scene);
          await delay(RBF.CONFIG.timing.lastMs);
        }
        return 'wait';

      case 'title':
        lastTextBeat = beat;
        stopTyping();
        hideOverlays();
        resetText();
        document.getElementById('title-main').textContent  = beat.main || '';
        document.getElementById('title-quote').textContent = beat.sub || '';
        document.getElementById('title-time').textContent  = beat.time || '';
        el.fader.classList.remove('out');
        el.title.classList.add('show');
        if (!silent) { await delay(RBF.CONFIG.timing.cardMs); }
        return 'wait';

      case 'chap':
        lastTextBeat = beat;
        stopTyping();
        hideOverlays();
        resetText();
        if (beat.chapter) {
          RBF.STATE.chapter = beat.chapter;
          if (!silent) { RBF.Saves.markChapterReached(beat.chapter); }
        }
        document.getElementById('chap-num').textContent  = beat.num || '';
        document.getElementById('chap-name').textContent = beat.name || '';
        el.fader.classList.remove('out');
        el.chap.classList.add('show');
        if (!silent) { await delay(RBF.CONFIG.timing.cardMs); }
        return 'wait';

      case 'end_chap':
        lastTextBeat = beat;
        stopTyping();
        hideOverlays();
        resetText();
        document.getElementById('endchap-1').textContent = beat.line1 || '';
        document.getElementById('endchap-2').textContent = beat.line2 || '';
        el.fader.classList.remove('out');
        el.endChap.classList.add('show');
        if (!silent) {
          if (beat.chapter) { RBF.Saves.markChapterFinished(beat.chapter); }
          await delay(RBF.CONFIG.timing.cardMs);
        }
        return 'wait';

      case 'cho':
        stopTyping();
        hideOverlays();
        resetText();
        renderChoices(beat);
        return 'choice';

      default:
        if (RBF.CONFIG.debug && typeof console !== 'undefined') {
          console.warn('[rabenfels] beat desconhecido: ' + beat.t);
        }
        return 'go';
    }
  }

  function applyBackground(id) {
    pres.backgroundId = id;
    RBF.Assets.applyBackground(el.bg, id);
  }

  function applyBgm(id) {
    pres.bgmId = id || null;
    RBF.Audio.playBgm(id || null);
  }

  function applyFlags(set) {
    if (!set) { return; }
    for (var k in set) {
      if (Object.prototype.hasOwnProperty.call(set, k)) { RBF.STATE.flags[k] = set[k]; }
    }
  }

  /* ---- escolhas --------------------------------------------------------- */

  var choiceButtons = [];
  var currentChoice = null;

  function renderChoices(beat) {
    choiceActive  = true;
    currentChoice = beat;
    choiceButtons = [];
    el.choices.textContent = '';

    var prompt = document.createElement('div');
    prompt.id = 'choice-prompt';
    prompt.textContent = beat.prompt || '';
    el.choices.appendChild(prompt);

    for (var i = 0; i < beat.opts.length; i++) {
      (function (opt, n) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'choice-btn';
        btn.textContent = '[ ' + (n + 1) + ' ]  ' + opt.tx;
        btn.addEventListener('click', function (ev) {
          ev.stopPropagation();
          pickChoice(opt);
        });
        el.choices.appendChild(btn);
        choiceButtons.push(btn);
      })(beat.opts[i], i);
    }

    el.choices.classList.add('show');
    el.hint.textContent = RBF.UI_TEXT.hintChoice;
  }

  function pickChoice(opt) {
    if (!choiceActive) { return; }
    if (!RBF.State.canAdvanceScript()) { return; }

    choiceActive = false;
    el.choices.classList.remove('show');
    el.choices.textContent = '';
    el.hint.textContent = RBF.UI_TEXT.hintClick;

    applyFlags(opt.flags);
    RBF.STATE.flags.lastChoice = opt.id;

    if (currentChoice && currentChoice.id) {
      RBF.STATE.choiceLog[currentChoice.id] = opt.id;
    }

    RBF.History.push('nar', null, '\u25b8 ' + opt.tx, RBF.STATE.chapter, RBF.STATE.scene);

    if (opt.then && opt.then.length) {
      var args = [index, 0].concat(opt.then);
      Array.prototype.splice.apply(script, args);
    }

    currentChoice = null;
    advance();
  }

  /* ---- loop principal --------------------------------------------------- */

  async function advance() {
    if (busy || choiceActive || finished) { return; }
    if (!RBF.State.canAdvanceScript()) { return; }

    busy = true;
    awaitingClick = false;
    cancelAuto();

    while (true) {
      if (index >= script.length) { endOfScript(); busy = false; return; }

      var beat = script[index];
      index += 1;

      if (!passes(beat)) { continue; }

      var result = await exec(beat, false);

      if (result === 'wait') {
        awaitingClick = true;
        busy = false;
        doPendingAutosave();
        return;
      }
      if (result === 'choice') {
        busy = false;
        doPendingAutosave();
        return;
      }
    }
  }

  function doPendingAutosave() {
    if (!pendingAutosave) { return; }
    pendingAutosave = false;
    if (!started) { return; }
    if (!RBF.STORAGE.autosaveOnScene) { return; }
    RBF.Saves.autosave(snapshot());
  }

  function endOfScript() {
    finished = true;
    el.hint.textContent = RBF.UI_TEXT.hintEnd;
    if (RBF.STATE.chapter) { RBF.Saves.markChapterFinished(RBF.STATE.chapter); }
  }

  /* ---- entrada ---------------------------------------------------------- */

  function onAdvanceInput() {
    RBF.Audio.unlock();
    if (!RBF.State.canAdvanceScript()) { return; }
    if (choiceActive || busy || finished) { return; }
    if (typing) { completeTyping(); return; }
    advance();
  }

  var inputBound = false;

  function bindInput() {
    if (inputBound) { return; }
    inputBound = true;

    el.stage.addEventListener('click', function () { onAdvanceInput(); });

    document.addEventListener('keydown', function (e) {
      if (RBF.State.inputGoesToUI()) { return; }
      if (!RBF.State.canAdvanceScript()) { return; }

      var k = e.key;

      if (choiceActive) {
        var n = parseInt(k, 10);
        if (n >= 1 && n <= choiceButtons.length) {
          e.preventDefault();
          RBF.Audio.unlock();
          choiceButtons[n - 1].click();
        }
        return;
      }

      if (k === ' ' || k === 'Enter' || k === 'ArrowRight' || k === 'PageDown') {
        e.preventDefault();
        onAdvanceInput();
      }
    });
  }

  /* ---- tempo de jogo ---------------------------------------------------- */

  function startClock() {
    if (playtimeMark === null) { playtimeMark = Date.now(); }
  }

  function stopClock() {
    if (playtimeMark === null) { return; }
    playtimeBase += (Date.now() - playtimeMark) / 1000;
    playtimeMark = null;
  }

  function playtimeSeconds() {
    var extra = (playtimeMark === null) ? 0 : (Date.now() - playtimeMark) / 1000;
    return Math.floor(playtimeBase + extra);
  }

  /* ---- pausa e retomada ------------------------------------------------- */

  function pause() {
    stopClock();
    cancelAuto();
    if (typing) { completeTyping(); }
  }

  function resume() {
    startClock();
    if (awaitingClick) { scheduleAuto(); }
  }

  /* ---- snapshot e restauracao ------------------------------------------- */

  function snapshot() {
    var chars = [];
    var first = null;

    for (var ch in pres.sprites) {
      if (!Object.prototype.hasOwnProperty.call(pres.sprites, ch)) { continue; }
      var s = pres.sprites[ch];
      chars.push({ id: ch, expression: s.ex, position: s.pos });
      if (!first) { first = { id: ch, expression: s.ex, position: s.pos }; }
    }

    return {
      playtimeSeconds: playtimeSeconds(),

      chapterId: RBF.STATE.chapter,
      sceneId:   RBF.STATE.scene,
      beatIndex: index,

      flags:           copy(RBF.STATE.flags),
      variables:       copy(RBF.STATE.variables),
      unlockedContent: RBF.STATE.unlockedContent.slice(),
      choiceLog:       copy(RBF.STATE.choiceLog),
      history:         RBF.History.serialize(),

      presentation: {
        backgroundId:      pres.backgroundId,
        characterId:       first ? first.id : null,
        expressionId:      first ? first.expression : null,
        characterPosition: first ? first.position : null,
        characters:        chars,
        textMode:          pres.textMode,
        currentBgmId:      pres.bgmId
      },

      sceneLabel:      RBF.STATE.sceneTitle || RBF.STATE.scene || '',
      dialogueExcerpt: RBF.History.excerpt(90)
    };
  }

  function copy(obj) {
    var out = {};
    for (var k in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, k)) { out[k] = obj[k]; }
    }
    return out;
  }

  /* Salvar em transicao ou no meio de uma escolha produziria um save
     que nao restaura direito. */
  function canSave() {
    return started && !finished && !busy && !choiceActive && awaitingClick;
  }

  /* ---- inicio ----------------------------------------------------------- */

  function prepare() {
    grab();
    bindInput();
    RBF.Assets.applyBackground(el.bg, 'bg_black');
  }

  function resetRuntime() {
    stopTyping();
    cancelAuto();
    clearSprites();
    hideOverlays();
    resetText();

    script          = [];
    index           = 0;
    busy            = false;
    awaitingClick   = false;
    choiceActive    = false;
    finished        = false;
    lastTextBeat    = null;
    currentChoice   = null;
    pendingAutosave = false;

    playtimeBase = 0;
    playtimeMark = null;

    pres.backgroundId = 'bg_black';
    pres.bgmId        = null;
    pres.textMode     = 'narration';
    pres.sprites      = {};

    RBF.STATE.flags           = {};
    RBF.STATE.variables       = {};
    RBF.STATE.unlockedContent = [];
    RBF.STATE.choiceLog       = {};
    RBF.STATE.chapter         = null;
    RBF.STATE.scene           = null;
    RBF.STATE.sceneTitle      = '';

    RBF.History.clear();
    RBF.Audio.playBgm(null);
  }

  function newGame() {
    prepare();
    resetRuntime();

    script  = RBF.Script.build({});
    index   = 0;
    started = true;

    el.fader.classList.add('out');
    el.hint.textContent = RBF.UI_TEXT.hintClick;

    RBF.State.set('playing');
    startClock();
    advance();
  }

  /* Comeca em um capitulo especifico, sem escolhas anteriores. */
  function startChapter(chapterId) {
    prepare();
    resetRuntime();

    script = RBF.Script.build({});
    var at = RBF.Script.chapterStart(script, chapterId);
    if (at < 0) { at = 0; }

    index   = at;
    started = true;

    el.fader.classList.add('out');
    el.hint.textContent = RBF.UI_TEXT.hintClick;

    RBF.State.set('playing');
    startClock();
    advance();
  }

  /* Recoloca a cena no estado gravado e volta a esperar clique. */
  function loadFrom(data) {
    prepare();
    resetRuntime();

    script = RBF.Script.build(data.choiceLog || {});
    index  = Math.max(0, Math.min(data.beatIndex || 0, script.length));

    RBF.STATE.flags           = copy(data.flags || {});
    RBF.STATE.variables       = copy(data.variables || {});
    RBF.STATE.unlockedContent = (data.unlockedContent || []).slice();
    RBF.STATE.choiceLog       = copy(data.choiceLog || {});
    RBF.STATE.chapter         = data.chapterId || null;
    RBF.STATE.scene           = data.sceneId || null;
    RBF.STATE.sceneTitle      = (data.preview && data.preview.sceneLabel) || '';

    RBF.History.restore(data.history || []);

    playtimeBase = data.playtimeSeconds || 0;
    playtimeMark = null;

    var p = data.presentation || {};

    applyBackground(p.backgroundId || 'bg_black');

    if (p.characters && p.characters.length) {
      for (var i = 0; i < p.characters.length; i++) {
        var c = p.characters[i];
        showSprite(c.id, c.expression, c.position, true);
      }
    } else if (p.characterId) {
      showSprite(p.characterId, p.expressionId, p.characterPosition, true);
    }

    started  = true;
    finished = false;

    el.fader.classList.remove('out');
    el.hint.textContent = RBF.UI_TEXT.hintClick;

    RBF.State.set('playing');
    startClock();

    /* O load parte sempre de um clique do jogador, entao o audio ja pode
       tocar sem esbarrar na politica de autoplay. */
    RBF.Audio.unlock();
    applyBgm(p.currentBgmId || null);

    /* Redesenha o beat que estava na tela, sem audio e sem duplicar
       o registro no historico. */
    if (redrawLastVisible()) {
      awaitingClick = true;
    } else {
      advance();
    }
  }

  function redrawLastVisible() {
    for (var i = index - 1; i >= 0; i--) {
      var b = script[i];
      if (!b || !passes(b)) { continue; }
      if (b.t === 'nar' || b.t === 'inn' || b.t === 'dial' ||
          b.t === 'arc' || b.t === 'last' ||
          b.t === 'title' || b.t === 'chap' || b.t === 'end_chap') {
        exec(b, true);
        return true;
      }
      if (b.t === 'cho') { return false; }
    }
    return false;
  }

  /* Volta ao titulo sem apagar save nenhum. */
  function stop() {
    pause();
    stopTyping();
    hideOverlays();
    resetText();
    clearSprites();
    RBF.Audio.playBgm(null);
    if (el.fader) { el.fader.classList.add('out'); }
    started = false;
  }

  return {
    prepare:      prepare,
    newGame:      newGame,
    startChapter: startChapter,
    loadFrom:     loadFrom,
    stop:         stop,

    pause:  pause,
    resume: resume,

    snapshot: snapshot,
    canSave:  canSave,

    advance:  advance,
    playtime: playtimeSeconds,

    hasStarted: function () { return started; },
    isFinished: function () { return finished; },

    /* expostos para o harness de validacao */
    _debug: {
      isTyping:     function () { return typing; },
      isChoice:     function () { return choiceActive; },
      isBusy:       function () { return busy; },
      isFinished:   function () { return finished; },
      isWaiting:    function () { return awaitingClick; },
      index:        function () { return index; },
      scriptLength: function () { return script.length; },
      input:        onAdvanceInput,
      buttons:      function () { return choiceButtons; },
      complete:     completeTyping,
      presentation: function () { return pres; }
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RBF.Engine;
}
