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
   { t:'ending' }                                   decide o final e grava
                                                    em flags.ending
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
  var sceneStart      = 0;    /* indice do beat de cena atual */
  var pendingAutosave = false;
  var lastTextBeat    = null;
  var started         = false;

  /*
    Geracao do roteiro em execucao.

    advance() e assincrono: ele espera de verdade em 'pause', em fade e
    em cartao de capitulo. Enquanto espera, o jogador pode abrir o menu e
    carregar um save. Sem este contador, o laco antigo acordava depois do
    load e continuava avancando sobre o roteiro novo: o jogo abria o save
    e pulava alguns beats sozinho.

    resetRuntime() incrementa a geracao. Todo laco confere a sua propria
    geracao antes e depois de cada espera, e desiste quando ela mudou.
  */
  var epoch = 0;

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
    el.lineCode = document.getElementById('line-code');
    el.diamond  = document.getElementById('rf-diamond');
    el.dlgBar   = document.getElementById('rf-dlg-bar');
    /* A aba de nome tem duas partes: a marca colorida e o texto. O HTML
       ja as traz; o engine garante que existam, para nao depender da
       marcacao continuar identica. */
    el.nameCap  = el.namebox.querySelector('.namebox__cap');
    if (!el.nameCap) {
      el.nameCap = document.createElement('span');
      el.nameCap.className = 'namebox__cap';
      el.nameCap.setAttribute('aria-hidden', 'true');
      el.namebox.appendChild(el.nameCap);
    }

    el.nameText = el.namebox.querySelector('.namebox__name');
    if (!el.nameText) {
      el.nameText = document.createElement('span');
      el.nameText.className = 'namebox__name';
      el.namebox.appendChild(el.nameText);
    }
    el.routes   = document.getElementById('rf-routes');
    el.routeNote= document.getElementById('rf-route-note');
  }

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  /* ---- final ------------------------------------------------------------ */

  function endingMatches(when) {
    if (!when) { return true; }          /* sem condicao: e o padrao */
    if (when.flag && !RBF.STATE.flags[when.flag]) { return false; }
    var id;
    if (when.min) {
      for (id in when.min) {
        if (!Object.prototype.hasOwnProperty.call(when.min, id)) { continue; }
        if (RBF.Routes.get(id) < when.min[id]) { return false; }
      }
    }
    if (when.max) {
      for (id in when.max) {
        if (!Object.prototype.hasOwnProperty.call(when.max, id)) { continue; }
        if (RBF.Routes.get(id) > when.max[id]) { return false; }
      }
    }
    return true;
  }

  function resolveEnding() {
    var list = RBF.ENDINGS || [];
    for (var i = 0; i < list.length; i++) {
      if (endingMatches(list[i].when)) { return list[i].id; }
    }
    return null;
  }

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

    var cdef = RBF.CHARACTERS[charId];
    var res  = (cdef && cdef.res === 'high') ? ' res-high' : '';

    RBF.Assets.applyCharacter(img, charId, expression, function (visible, size) {
      div.className = 'sprite pos-' + (pos || 'center') + ' size-' + (size || 'bust') + res;
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
    if (el.nameText) { el.nameText.textContent = ''; }
    el.text.className = 'textcontent';
    el.text.textContent = '';
    el.textbox.classList.remove('show');
    showCursor(false);
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
    if (el.diamond) { el.diamond.classList.toggle('is-on', !!on); }
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

    /* A aba sempre aparece: com o nome de quem fala, ou com o rotulo do
       modo quando e narracao ou pensamento. */
    if (speakerId) {
      var def = RBF.CHARACTERS[speakerId];
      el.nameText.textContent = def ? def.name : speakerId;
      el.namebox.style.color  = def ? def.color : '#c8a878';
    } else if (mode === 'inner') {
      el.nameText.textContent = RBF.UI_TEXT.inner;
      el.namebox.style.color  = '#8c2733';
      el.namebox.classList.add('is-inner');
    } else {
      el.nameText.textContent = RBF.UI_TEXT.narrator;
      el.namebox.style.color  = '#8c2733';
      el.namebox.classList.add('is-narration');
    }
    el.namebox.classList.add('show');

    /* Quem fala fica em destaque; os demais recuam. */
    highlightSpeaker(speakerId);

    pres.textMode = mode;
    el.text.className = 'textcontent ' + mode;
    updateLineCode();
    typeOut(el.text, text);

    if (record) {
      RBF.History.push(recordKind(mode), speakerId, text, RBF.STATE.chapter, RBF.STATE.scene);
    }
  }

  /* Codigo de transcricao: posicao da fala dentro da cena atual.
     Recalculado a cada beat, porque uma escolha pode injetar linhas e
     mudar o total no meio da cena. */
  function updateLineCode() {
    if (!el.lineCode) { return; }

    var ch = RBF.Script.chapterById(RBF.STATE.chapter);
    var prefix = ch ? ch.code : 'RBF';

    var total = 0;
    var at    = 0;
    var cur   = index - 1;   /* index ja apontou para o beat seguinte */

    for (var i = sceneStart; i < script.length; i++) {
      var b = script[i];
      if (!b) { continue; }
      if (b.t === 'scene' && i > sceneStart) { break; }
      if (!isTextBeat(b)) { continue; }
      if (!passes(b)) { continue; }
      total += 1;
      if (i <= cur) { at = total; }
    }

    el.lineCode.textContent =
      'TRANSCRI\u00c7\u00c3O ' + prefix + ' ' +
      String(Math.max(1, at)).padStart(2, '0') + '/' + String(Math.max(1, total));
  }

  function isTextBeat(b) {
    return b.t === 'nar' || b.t === 'inn' || b.t === 'dial' ||
           b.t === 'arc' || b.t === 'last';
  }

  function highlightSpeaker(speakerId) {
    for (var k in spriteNodes) {
      if (!Object.prototype.hasOwnProperty.call(spriteNodes, k)) { continue; }
      spriteNodes[k].classList.toggle('is-idle', !!speakerId && k !== speakerId);
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
        sceneStart           = Math.max(0, index - 1);
        RBF.STATE.scene      = beat.id || RBF.STATE.scene;
        RBF.STATE.sceneTitle = beat.title || RBF.STATE.sceneTitle;
        if (beat.chapter && beat.chapter !== RBF.STATE.chapter) {
          enterChapter(beat.chapter, silent);
        }
        if (beat.bg) {
          applyBackground(beat.bg);
          if (!silent) { RBF.Gallery.markSeen('bg', beat.bg); }
        }
        if (beat.bgm !== undefined) { applyBgm(beat.bgm); }
        if (beat.sfx && !silent) { RBF.Audio.playSfx(beat.sfx); }
        /*
          Troca de cena limpa os sprites.

          Era o contrario: so limpava se o beat pedisse 'clearSprites', e
          nenhum beat pedia. O resultado era uma classe inteira de bug -
          qualquer ramo de escolha que terminasse sem 'spr_hide' deixava
          o personagem colado na tela pela cena seguinte. Aconteceu de
          verdade no Capitulo 3: recusar o pedido de Klara deixava ela
          plantada em cima do patio ao entardecer.

          Cena nova e lugar novo. Quem precisa carregar um sprite de uma
          cena para a outra declara 'keepSprites: true' e assume.
        */
        if (!beat.keepSprites) { clearSprites(); }
        if (!silent) { pendingAutosave = true; }
        return 'go';

      /*
        Avalia RBF.ENDINGS na ordem e grava o primeiro que bater em
        RBF.STATE.flags.ending. As regras vivem no manifesto; aqui so
        se executa. Depois disto, capitulos e Epilogo leem o final com
        um 'if' comum, sem saber como ele foi decidido.
      */
      case 'ending':
        RBF.STATE.flags.ending = resolveEnding();
        return 'go';

      case 'bg':
        applyBackground(beat.id);
        if (!silent) { RBF.Gallery.markSeen('bg', beat.id); }
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
          if (beat.key) { RBF.Gallery.markSeen('arc', beat.key); }
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
          if (beat.key) { RBF.Gallery.markSeen('arc', beat.key); }
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
        if (beat.chapter && beat.chapter !== RBF.STATE.chapter) {
          enterChapter(beat.chapter, silent);
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
          /* 'completes' marca o fim da obra, nao o fim de um capitulo.
             Guarda as flags do run porque o extra "As Quatro Paginas"
             e montado a partir delas. Declarado no roteiro, para o
             engine nao precisar saber o id do ultimo capitulo. */
          if (beat.completes) {
            RBF.Saves.recordCompletion({
              ending: RBF.STATE.flags.ending || null,
              flags:  RBF.STATE.flags,
              routes: RBF.STATE.routes
            });
          }
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

  /* Troca de capitulo em um unico lugar.

     O capitulo que fica para tras e marcado como concluido aqui. Antes,
     isso dependia de um beat 'end_chap' com o campo 'chapter' preenchido;
     o Prologo nao tem esse beat e o Capitulo 1 tinha esquecido o campo,
     entao 'Prologo concluido' e 'Capitulo 1 concluido' nunca abriam na
     galeria por mais que o jogador terminasse os dois. */
  function enterChapter(chapterId, silent) {
    var previous = RBF.STATE.chapter;
    RBF.STATE.chapter = chapterId;
    if (silent) { return; }
    if (previous && previous !== chapterId) {
      RBF.Saves.markChapterFinished(previous);
    }
    RBF.Saves.markChapterReached(chapterId);
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
    el.choices.classList.remove('is-resolved');

    var prompt = document.createElement('div');
    prompt.id = 'choice-prompt';
    prompt.textContent = beat.prompt || '';
    el.choices.appendChild(prompt);

    for (var i = 0; i < beat.opts.length; i++) {
      (function (opt, n) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'choice-btn';
        /* O id da opcao fica no proprio botao. A ordem de exibicao das
           opcoes e embaralhada de propria vontade entre capitulos, para
           o jogador nao aprender a clicar sempre na ultima. Quem precisa
           saber QUAL opcao e - o harness de teste, e qualquer ferramenta
           futura - le daqui, e nao da posicao. */
        if (opt.id) { btn.setAttribute('data-option', opt.id); }

        var code = document.createElement('span');
        code.className = 'choice-btn__code';
        code.textContent = (beat.code || 'DEP') + '-' + String(n + 1).padStart(2, '0');
        btn.appendChild(code);

        var txt = document.createElement('span');
        txt.className = 'choice-btn__text';
        txt.textContent = opt.tx;
        btn.appendChild(txt);

        btn.addEventListener('click', function (ev) {
          ev.stopPropagation();
          pickChoice(opt, btn);
        });

        el.choices.appendChild(btn);
        choiceButtons.push(btn);
      })(beat.opts[i], i);
    }

    el.choices.classList.add('show');
    setHint(RBF.UI_TEXT.hintChoice);
  }

  function pickChoice(opt, btn) {
    if (!choiceActive) { return; }
    if (!RBF.State.canAdvanceScript()) { return; }

    choiceActive = false;
    RBF.Audio.playUi('ui_confirm');

    /* A opcao escolhida recebe a marca; as outras recuam. */
    if (btn) { btn.classList.add('is-chosen'); }
    el.choices.classList.add('is-resolved');

    applyFlags(opt.flags);
    RBF.STATE.flags.lastChoice = opt.id;

    if (currentChoice && currentChoice.id) {
      RBF.STATE.choiceLog[currentChoice.id] = opt.id;
    }

    /* Rotas: o delta vem do roteiro, nunca do texto da opcao. */
    var moved = RBF.Routes.apply(opt.routes);
    RBF.Gallery.recordRoutes(RBF.Routes.all());
    renderRoutes();

    RBF.History.push('nar', null, '\u25b8 ' + opt.tx, RBF.STATE.chapter, RBF.STATE.scene);

    if (opt.then && opt.then.length) {
      var args = [index, 0].concat(opt.then);
      Array.prototype.splice.apply(script, args);
    }
    currentChoice = null;

    /* Tempo de ler a marca antes da cena seguir. */
    var mine = epoch;
    var wait = moved.length
      ? RBF.CONFIG.timing.choiceHoldRouteMs
      : RBF.CONFIG.timing.choiceHoldMs;
    setTimeout(function () {
      if (mine !== epoch) { return; }   /* carregou um save durante a espera */
      el.choices.classList.remove('show');
      el.choices.textContent = '';
      el.choices.classList.remove('is-resolved');
      setHint(RBF.UI_TEXT.hintClick);
      announceRoutes(moved);
      advance();
    }, wait);
  }

  /* ---- HUD de rotas ------------------------------------------------------
     Le RBF.Routes, que por sua vez soma apenas deltas declarados nas
     escolhas. Nao existe valor visual independente do estado.            */

  function renderRoutes() {
    if (!el.routes) { return; }

    var defs = RBF.Routes.defs();
    el.routes.textContent = '';

    var any = false;

    for (var i = 0; i < defs.length; i++) {
      var def = defs[i];
      var val = RBF.Routes.get(def.id);
      if (val > 0) { any = true; }

      var wrap = document.createElement('div');
      wrap.className = 'rf-route rf-route--' + def.id;
      wrap.title = def.label + ' ' + val + '/' + def.max + ' \u2014 ' + def.hint;
      wrap.setAttribute('role', 'img');
      wrap.setAttribute('aria-label',
        def.label + ': ' + val + ' de ' + def.max + '. ' + def.hint);

      /* Mostrador radial. Um anel de trilha e um arco que preenche em
         proporcao ao valor. Substituiu a fileira de tracinhos: com onze
         capitulos e ate duas escolhas por capitulo, cinco tracinhos
         saturavam no terceiro capitulo e paravam de informar. */
      var NS = 'http://www.w3.org/2000/svg';
      var R  = 13;
      var C  = 2 * Math.PI * R;
      var frac = def.max > 0 ? Math.max(0, Math.min(1, val / def.max)) : 0;

      var dial = document.createElementNS(NS, 'svg');
      dial.setAttribute('class', 'rf-route__dial');
      dial.setAttribute('viewBox', '0 0 34 34');
      dial.setAttribute('aria-hidden', 'true');

      var track = document.createElementNS(NS, 'circle');
      track.setAttribute('class', 'rf-route__track');
      track.setAttribute('cx', '17');
      track.setAttribute('cy', '17');
      track.setAttribute('r', String(R));
      dial.appendChild(track);

      var arc = document.createElementNS(NS, 'circle');
      arc.setAttribute('class', 'rf-route__arc');
      arc.setAttribute('cx', '17');
      arc.setAttribute('cy', '17');
      arc.setAttribute('r', String(R));
      arc.setAttribute('stroke-dasharray', String(C));
      arc.setAttribute('stroke-dashoffset', String(C * (1 - frac)));
      dial.appendChild(arc);

      wrap.appendChild(dial);

      var svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('class', 'rf-route__icon');
      svg.setAttribute('aria-hidden', 'true');
      var use = document.createElementNS(NS, 'use');
      use.setAttribute('href', '#' + def.icon);
      svg.appendChild(use);
      wrap.appendChild(svg);

      el.routes.appendChild(wrap);
    }

    var wanted = any && RBF.Settings.get('showRoutes') !== false;
    el.routes.classList.toggle('show', wanted);
  }

  /* Fila de avisos: duas rotas mudando na mesma escolha nao se
     sobrepoem, aparecem uma depois da outra. */
  var noteQueue = [];
  var noteBusy  = false;

  function announceRoutes(moved) {
    if (!moved || !moved.length || !el.routeNote) { return; }
    for (var i = 0; i < moved.length; i++) { noteQueue.push(moved[i]); }
    drainNotes();
  }

  function drainNotes() {
    if (noteBusy || !noteQueue.length || !el.routeNote) { return; }

    var item = noteQueue.shift();
    var def  = RBF.Routes.defById(item.id);
    if (!def) { drainNotes(); return; }

    noteBusy = true;
    RBF.Audio.playUi('ui_route');

    el.routeNote.textContent = def.note;
    el.routeNote.className = 'is-on is-' + def.id;

    setTimeout(function () {
      el.routeNote.className = '';
      noteBusy = false;
      drainNotes();
    }, 2700);
  }

  /* ---- loop principal --------------------------------------------------- */

  async function advance() {
    if (busy || choiceActive || finished) { return; }
    if (!RBF.State.canAdvanceScript()) { return; }

    var mine = epoch;

    busy = true;
    awaitingClick = false;
    cancelAuto();

    while (true) {
      /* O roteiro trocou sob os pes deste laco: sair sem tocar em nada.
         Quem trocou ja deixou o estado como queria. */
      if (mine !== epoch) { return; }

      if (index >= script.length) { endOfScript(); busy = false; return; }

      var beat = script[index];
      index += 1;

      if (!passes(beat)) { continue; }

      var result = await exec(beat, false);

      if (mine !== epoch) { return; }

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

  /* Fim do material escrito. A dica sai do manifesto: o texto nomeia o
     ultimo capitulo registrado em vez de trazer um numero fixo que
     envelhece a cada capitulo novo. */
  function endOfScript() {
    finished = true;
    stopSkip();

    var last = RBF.CHAPTERS[RBF.CHAPTERS.length - 1];
    setHint(last
      ? RBF.UI_TEXT.hintEnd.replace('{ultimo}', last.label)
      : RBF.UI_TEXT.hintEnd);

    if (RBF.STATE.chapter) { RBF.Saves.markChapterFinished(RBF.STATE.chapter); }
  }

  /* ---- entrada ---------------------------------------------------------- */

  function onAdvanceInput() {
    RBF.Audio.unlock();
    if (!RBF.State.canAdvanceScript()) { return; }
    if (uiHidden) { toggleUI(false); return; }
    if (skipping()) { stopSkip(); return; }
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

  /* ---- barra de leitura ---------------------------------------------------
     Montada uma unica vez a partir de RBF.DIALOGUE_CONTROLS. As acoes
     chamam RBF.Menu, que ja e o dono desses paineis: nao existe um
     segundo caminho para salvar ou abrir ajustes.                      */

  var barBuilt = false;
  var ctlNodes = {};

  function buildBar() {
    if (barBuilt || !el.dlgBar) { return; }
    barBuilt = true;

    var list = RBF.DIALOGUE_CONTROLS;

    for (var i = 0; i < list.length; i++) {
      (function (ctl) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'rf-ctl';
        btn.title = ctl.title;
        btn.setAttribute('aria-label', ctl.title);

        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'rf-ctl__icon');
        svg.setAttribute('aria-hidden', 'true');
        var use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttribute('href', '#' + ctl.icon);
        svg.appendChild(use);
        btn.appendChild(svg);

        var label = document.createElement('span');
        label.className = 'rf-ctl__label';
        label.textContent = ctl.label;
        btn.appendChild(label);

        btn.addEventListener('click', function (ev) {
          ev.stopPropagation();
          runControl(ctl.id);
        });

        el.dlgBar.appendChild(btn);
        ctlNodes[ctl.id] = btn;
      })(list[i]);
    }

    var hint = document.createElement('span');
    hint.className = 'rf-dlg__hint';
    hint.appendChild(document.createTextNode(RBF.UI_TEXT.hintClick));

    var quill = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    quill.setAttribute('aria-hidden', 'true');
    var quse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    quse.setAttribute('href', '#rf-ic-quill');
    quill.appendChild(quse);
    hint.appendChild(quill);

    el.dlgBar.appendChild(hint);
    el.hintNode = hint;
    el.hintText = hint.firstChild;
  }

  /* A dica vive dentro do painel; #hint continua existindo apenas para
     nao quebrar quem ainda leia aquele elemento. */
  function setHint(text) {
    if (el.hint) { el.hint.textContent = text; }
    if (el.hintText) { el.hintText.textContent = text; }
  }

  /* A barra vive dentro do dialogo: o painel que ela abre volta para a
     leitura, nao para o menu de jogo. Por isso aqui so pausa o relogio;
     quem empilha o estado e o proprio painel, e RBF.Menu devolve a
     'playing' ao fechar. */
  function runControl(id) {
    RBF.Audio.playUi('ui_confirm');

    switch (id) {
      case 'history':
        pause();
        RBF.Menu.openHistory();
        break;

      case 'auto':
        toggleAuto();
        break;

      case 'skip':
        toggleSkip();
        break;

      case 'save':
        pause();
        RBF.Menu.openSaveLoad('save');
        break;

      case 'load':
        pause();
        RBF.Menu.openSaveLoad('load');
        break;

      case 'settings':
        pause();
        RBF.Menu.openSettings();
        break;

      case 'hide':
        toggleUI(true);
        break;

      default: break;
    }
  }

  function markControl(id, on) {
    if (ctlNodes[id]) { ctlNodes[id].classList.toggle('is-on', !!on); }
  }

  /* ---- avanco automatico e avanco rapido ---------------------------------
     Auto respeita a espera configurada. Skip atravessa depressa e para
     sozinho em escolha, fim de capitulo ou fim de roteiro.             */

  function toggleAuto() {
    var on = !RBF.Settings.get('autoAdvance');
    RBF.Settings.set('autoAdvance', on);
    markControl('auto', on);

    if (on) {
      stopSkip();
      if (awaitingClick) { scheduleAuto(); }
    } else {
      cancelAuto();
    }
  }

  var skipTimer = null;

  function skipping() { return skipTimer !== null; }

  function toggleSkip() { if (skipping()) { stopSkip(); } else { startSkip(); } }

  function startSkip() {
    if (skipping()) { return; }
    if (!RBF.State.canAdvanceScript()) { return; }

    RBF.Settings.set('autoAdvance', false);
    markControl('auto', false);
    cancelAuto();

    markControl('skip', true);

    skipTimer = setInterval(function () {
      if (!RBF.State.canAdvanceScript() || finished) { stopSkip(); return; }
      if (choiceActive) { stopSkip(); return; }   /* escolha interrompe */
      if (typing) { completeTyping(); return; }
      if (awaitingClick) { advance(); }
    }, RBF.Settings.get('skipMs') || 38);
  }

  function stopSkip() {
    if (skipTimer) { clearInterval(skipTimer); skipTimer = null; }
    markControl('skip', false);
  }

  /* ---- esconder interface ------------------------------------------------
     O jogador ve a cena sem cromo. Qualquer clique ou tecla devolve a
     interface, entao nao existe estado do qual nao se saia.            */

  var uiHidden = false;

  function toggleUI(force) {
    uiHidden = (force === undefined) ? !uiHidden : !!force;
    el.stage.classList.toggle('is-ui-hidden', uiHidden);
    return uiHidden;
  }

  function isUIHidden() { return uiHidden; }

  /* ---- pausa e retomada ------------------------------------------------- */

  function pause() {
    stopClock();
    cancelAuto();
    stopSkip();
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
      routes:          RBF.Routes.serialize(),
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
    buildBar();
    bindInput();
    markControl('auto', RBF.Settings.get('autoAdvance'));
    RBF.Assets.applyBackground(el.bg, 'bg_black');
  }

  function resetRuntime() {
    /* Aposenta qualquer laco de advance() que ainda esteja esperando. */
    epoch += 1;

    stopTyping();
    cancelAuto();
    stopSkip();
    sceneStart = 0;
    clearSprites();
    hideOverlays();
    resetText();

    toggleUI(false);

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
    RBF.Routes.reset();
    renderRoutes();
    RBF.Audio.playBgm(null);
  }

  function newGame() {
    prepare();
    resetRuntime();

    script  = RBF.Script.build({});
    index   = 0;
    started = true;

    el.fader.classList.add('out');
    setHint(RBF.UI_TEXT.hintClick);

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
    setHint(RBF.UI_TEXT.hintClick);

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
    RBF.Routes.restore(data.routes, data.choiceLog);
    RBF.Gallery.recordRoutes(RBF.Routes.all());
    renderRoutes();

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
    setHint(RBF.UI_TEXT.hintClick);

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

  /* Volta ao titulo sem apagar save nenhum.
     O tempo desta partida entra no total acumulado antes de zerar. */
  function stop() {
    pause();
    if (started) { RBF.Saves.addPlaytime(playtimeSeconds()); }
    playtimeBase = 0;
    playtimeMark = null;
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

    toggleUI:     toggleUI,
    isUIHidden:   isUIHidden,
    toggleAuto:   toggleAuto,
    toggleSkip:   toggleSkip,
    stopSkip:     stopSkip,
    isSkipping:   skipping,
    renderRoutes: renderRoutes,

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
      presentation: function () { return pres; },
      /* Executa um beat isolado, para teste de comportamento. Sempre em
         modo silencioso: sem audio, sem galeria, sem autosave. */
      exec:         function (beat) { return exec(beat, true); },
      resolveEnding: resolveEnding,
      controls:     function () { return ctlNodes; },
      sceneStart:   function () { return sceneStart; }
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RBF.Engine;
}
