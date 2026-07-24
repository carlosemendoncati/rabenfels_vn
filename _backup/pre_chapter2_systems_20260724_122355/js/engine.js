/* ==========================================================================
   ARQUIVO RABENFELS - js/engine.js
   Renderer. Nao contem texto de roteiro nem caminho de asset.

   ---------------------------------------------------------------------------
   TIPOS DE BEAT (usados em js/data/*.js)
   ---------------------------------------------------------------------------
   { t:'scene', id, chapter, bg, bgm, sfx }   marca cena, troca bg/bgm
   { t:'fade_in' } / { t:'fade_out' }         transicao de tela
   { t:'pause', ms }                          espera (padrao CONFIG.text.pauseMs)
   { t:'bg',  id }                            troca so o background
   { t:'bgm', id }                            troca a trilha (id null = parar)
   { t:'sfx', id }                            efeito pontual
   { t:'spr', ch, ex, pos }                   mostra sprite (pos: left|center|right)
   { t:'spr_hide', ch }                       esconde um sprite
   { t:'spr_clear' }                          esconde todos
   { t:'nar', tx }                            narracao
   { t:'inn', tx }                            pensamento (italico)
   { t:'dial', ch, tx }                       fala; nome e cor vem do manifesto
   { t:'arc', lns, label }                    cartao do Arquivo
   { t:'last', lns }                          ultima entrada (bloco longo)
   { t:'title', main, sub, time }             cartao de titulo
   { t:'chap', num, name }                    cartao de capitulo
   { t:'end_chap', line1, line2 }             cartao de fim de capitulo
   { t:'flag', set:{...} }                    grava estado
   { t:'cho', prompt, opts:[ { id, tx, flags, then:[beats] } ] }

   Regra de escolha: 'then' e injetado no fluxo logo apos a escolha e o
   roteiro reconverge no beat seguinte. Nenhum beat fica inalcancavel.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.Engine = (function () {
  'use strict';

  /* ---- estado ---------------------------------------------------------- */
  var script       = [];
  var index        = 0;
  var busy         = false;   /* rodando uma sequencia                      */
  var awaitingClick= false;   /* beat de texto concluido, esperando avanco  */
  var choiceActive = false;
  var typing       = false;
  var typeTimer    = null;
  var fullText     = '';      /* texto completo do beat atual (fix do skip) */
  var typeTarget   = null;
  var finished     = false;

  RBF.STATE = {
    flags:   {},
    scene:   null,
    chapter: null,
    history: []
  };

  /* ---- elementos ------------------------------------------------------- */
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

  /* ---- sprites --------------------------------------------------------- */
  var spriteNodes = {};   /* charId -> div */

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

  function showSprite(charId, expression, pos) {
    var div = spriteNode(charId);
    var img = div.querySelector('img');
    RBF.Assets.applyCharacter(img, charId, expression, function (visible, size) {
      div.className = 'sprite pos-' + (pos || 'center') + ' size-' + (size || 'bust');
      if (!visible) { div.classList.remove('show'); return; }
      /* dois frames para a transicao CSS pegar o estado inicial */
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { div.classList.add('show'); });
      });
    });
  }

  function hideSprite(charId) {
    var div = spriteNodes[charId];
    if (div) { div.classList.remove('show'); }
  }

  function clearSprites() {
    for (var k in spriteNodes) {
      if (Object.prototype.hasOwnProperty.call(spriteNodes, k)) {
        spriteNodes[k].classList.remove('show');
      }
    }
  }

  /* ---- overlays -------------------------------------------------------- */
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

  /* ---- typewriter ------------------------------------------------------ */
  function typeOut(target, text) {
    stopTyping();
    typing     = true;
    fullText   = text;
    typeTarget = target;
    target.textContent = '';
    var i = 0;
    var speed = RBF.CONFIG.text.typeSpeedMs;
    function step() {
      if (i < text.length) {
        target.textContent += text.charAt(i);
        i += 1;
        typeTimer = setTimeout(step, speed);
      } else {
        typing = false;
        typeTimer = null;
        showCursor(true);
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
  }

  function stopTyping() {
    if (typeTimer) { clearTimeout(typeTimer); typeTimer = null; }
    typing = false;
    showCursor(false);
  }

  function showCursor(on) {
    if (!el.text) { return; }
    el.text.classList.toggle('waiting', !!on);
  }

  /* ---- beat de texto --------------------------------------------------- */
  function textBeat(cssClass, speakerId, text) {
    hideOverlays();
    resetText();
    el.textbox.classList.add('show');
    if (speakerId) {
      var def = RBF.CHARACTERS[speakerId];
      var name = def ? def.name : speakerId;
      el.namebox.textContent = name;
      el.namebox.style.color = def ? def.color : '#c8a878';
      el.namebox.classList.add('show');
    }
    el.text.className = 'textcontent ' + cssClass;
    typeOut(el.text, text);
  }

  /* ---- executor -------------------------------------------------------- */
  /* retorna: 'wait' (espera input) | 'go' (segue) | 'choice' */
  async function exec(beat) {
    switch (beat.t) {

      case 'scene':
        RBF.STATE.scene   = beat.id || RBF.STATE.scene;
        RBF.STATE.chapter = beat.chapter || RBF.STATE.chapter;
        RBF.STATE.history.push(beat.id);
        if (beat.bg)  { RBF.Assets.applyBackground(el.bg, beat.bg); }
        if (beat.bgm !== undefined) { RBF.Audio.playBgm(beat.bgm); }
        if (beat.sfx) { RBF.Audio.playSfx(beat.sfx); }
        if (beat.clearSprites) { clearSprites(); }
        return 'go';

      case 'bg':
        RBF.Assets.applyBackground(el.bg, beat.id);
        return 'go';

      case 'bgm':
        RBF.Audio.playBgm(beat.id || null);
        return 'go';

      case 'sfx':
        RBF.Audio.playSfx(beat.id);
        return 'go';

      case 'spr':
        showSprite(beat.ch, beat.ex, beat.pos);
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
        await delay(beat.ms || RBF.CONFIG.text.pauseMs);
        return 'go';

      case 'fade_out':
        stopTyping();
        el.fader.classList.add('out');
        await delay(RBF.CONFIG.timing.fadeMs);
        hideOverlays();
        resetText();
        clearSprites();
        return 'go';

      case 'fade_in':
        el.fader.classList.remove('out');
        await delay(RBF.CONFIG.timing.fadeMs);
        return 'go';

      case 'nar':
        textBeat('narration', null, beat.tx);
        return 'wait';

      case 'inn':
        textBeat('inner', null, beat.tx);
        return 'wait';

      case 'dial':
        textBeat('speech', beat.ch, '\u201c' + beat.tx + '\u201d');
        return 'wait';

      case 'arc':
        stopTyping();
        hideOverlays();
        resetText();
        el.arcLabel.textContent = beat.label || RBF.UI_TEXT.archiveLabel;
        el.arcLines.textContent = '';
        for (var i = 0; i < beat.lns.length; i++) {
          var p = document.createElement('p');
          p.textContent = beat.lns[i];
          el.arcLines.appendChild(p);
        }
        el.arcBox.classList.add('show');
        await delay(RBF.CONFIG.timing.arcMs);
        return 'wait';

      case 'last':
        stopTyping();
        hideOverlays();
        resetText();
        el.lastLabel.textContent = beat.label || RBF.UI_TEXT.lastLabel;
        el.lastLines.textContent = beat.lns.join('\n');
        el.lastBox.classList.add('show');
        el.lastBox.scrollTop = 0;
        await delay(RBF.CONFIG.timing.lastMs);
        return 'wait';

      case 'title':
        stopTyping();
        hideOverlays();
        resetText();
        document.getElementById('title-main').textContent  = beat.main || '';
        document.getElementById('title-quote').textContent = beat.sub || '';
        document.getElementById('title-time').textContent  = beat.time || '';
        el.fader.classList.remove('out');
        el.title.classList.add('show');
        await delay(RBF.CONFIG.timing.cardMs);
        return 'wait';

      case 'chap':
        stopTyping();
        hideOverlays();
        resetText();
        document.getElementById('chap-num').textContent  = beat.num || '';
        document.getElementById('chap-name').textContent = beat.name || '';
        el.fader.classList.remove('out');
        el.chap.classList.add('show');
        await delay(RBF.CONFIG.timing.cardMs);
        return 'wait';

      case 'end_chap':
        stopTyping();
        hideOverlays();
        resetText();
        document.getElementById('endchap-1').textContent = beat.line1 || '';
        document.getElementById('endchap-2').textContent = beat.line2 || '';
        el.fader.classList.remove('out');
        el.endChap.classList.add('show');
        await delay(RBF.CONFIG.timing.cardMs);
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

  function applyFlags(set) {
    if (!set) { return; }
    for (var k in set) {
      if (Object.prototype.hasOwnProperty.call(set, k)) { RBF.STATE.flags[k] = set[k]; }
    }
  }

  /* ---- escolhas -------------------------------------------------------- */
  var choiceButtons = [];

  function renderChoices(beat) {
    choiceActive = true;
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
    choiceActive = false;
    el.choices.classList.remove('show');
    el.choices.textContent = '';
    el.hint.textContent = RBF.UI_TEXT.hintClick;
    applyFlags(opt.flags);
    RBF.STATE.flags.lastChoice = opt.id;
    if (opt.then && opt.then.length) {
      /* injeta a ramificacao e reconverge no beat seguinte */
      var args = [index, 0].concat(opt.then);
      Array.prototype.splice.apply(script, args);
    }
    advance();
  }

  /* ---- loop principal -------------------------------------------------- */
  async function advance() {
    if (busy || choiceActive || finished) { return; }
    busy = true;
    awaitingClick = false;
    while (true) {
      if (index >= script.length) { endOfScript(); busy = false; return; }
      var beat = script[index];
      index += 1;
      var result = await exec(beat);
      if (result === 'wait')   { awaitingClick = true; busy = false; return; }
      if (result === 'choice') { busy = false; return; }
    }
  }

  function endOfScript() {
    finished = true;
    el.hint.textContent = RBF.UI_TEXT.hintEnd;
  }

  /* ---- input ----------------------------------------------------------- */
  function onAdvanceInput() {
    RBF.Audio.unlock();
    if (choiceActive || busy || finished) { return; }
    if (typing) { completeTyping(); return; }
    if (awaitingClick) { advance(); return; }
    advance();
  }

  function bindInput() {
    el.stage.addEventListener('click', function () { onAdvanceInput(); });

    document.addEventListener('keydown', function (e) {
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

  /* ---- boot ------------------------------------------------------------ */
  function start(beats) {
    grab();
    script   = beats.slice();
    index    = 0;
    finished = false;
    el.hint.textContent = RBF.UI_TEXT.hintClick;
    RBF.Assets.applyBackground(el.bg, 'bg_black');
    el.fader.classList.add('out');
    bindInput();
    advance();
  }

  return {
    start:   start,
    state:   RBF.STATE,
    advance: advance,
    /* expostos para o harness de validacao */
    _debug: {
      isTyping:      function () { return typing; },
      isChoice:      function () { return choiceActive; },
      isBusy:        function () { return busy; },
      isFinished:    function () { return finished; },
      index:         function () { return index; },
      scriptLength:  function () { return script.length; },
      input:         onAdvanceInput,
      buttons:       function () { return choiceButtons; },
      complete:      completeTyping
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.Engine; }
