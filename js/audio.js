/* ==========================================================================
   ARQUIVO RABENFELS - js/audio.js
   Hooks de audio que funcionam sem os arquivos finais existirem.

   - nada toca antes da primeira interacao do usuario (politica de browser)
   - available:false no manifesto = nenhuma requisicao de rede
   - arquivo ausente = silencio, sem excecao e sem log repetido
   - crossfade simples entre faixas de BGM
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.Audio = (function () {
  'use strict';

  var unlocked = false;
  var pending  = null;   /* bgm pedido antes do desbloqueio */
  var current  = null;   /* { id, el, target }              */
  var failed   = {};     /* id -> true                      */
  var sfxCache = {};     /* id -> HTMLAudioElement pronto   */

  function cfg()   { return RBF.CONFIG.audio; }
  function paths() { return RBF.CONFIG.paths; }
  function clamp(v) { return Math.max(0, Math.min(1, v)); }

  function hasAudioElement() {
    return (typeof Audio !== 'undefined');
  }

  /* Testa os candidatos em ordem. Chama cb(elemento) ou cb(null), uma
     unica vez.

     Dois cuidados que a versao anterior nao tinha:

     1. 'canplaythrough' nem sempre chega. Sob file://, e em aba sem foco,
        o navegador pode parar em 'canplay' e nunca prometer o arquivo
        inteiro. Aceitar os dois eventos e a diferenca entre trilha e
        silencio; o guarda 'settled' impede que os dois disparem cb.

     2. Um candidato que falha depois de ja ter respondido nao pode
        reentrar em tryNext e devolver um segundo elemento. */
  function pick(def, folder, id, cb) {
    if (!def || def.available === false || !def.files || !def.files.length) { cb(null); return; }
    if (!hasAudioElement()) { cb(null); return; }

    var settled = false;
    function done(el) {
      if (settled) { return; }
      settled = true;
      if (!el) { failed[id] = true; }
      cb(el);
    }

    var i = 0;
    function tryNext() {
      if (settled) { return; }
      if (i >= def.files.length) { done(null); return; }

      var url = folder + def.files[i];
      i += 1;

      var el = new Audio();
      el.preload = 'auto';

      function ready() {
        el.removeEventListener('canplaythrough', ready);
        el.removeEventListener('canplay', ready);
        el.removeEventListener('error', onErr);
        done(el);
      }
      function onErr() {
        el.removeEventListener('canplaythrough', ready);
        el.removeEventListener('canplay', ready);
        el.removeEventListener('error', onErr);
        tryNext();
      }

      el.addEventListener('canplaythrough', ready);
      el.addEventListener('canplay', ready);
      el.addEventListener('error', onErr);

      el.src = url;
      el.load();
    }
    tryNext();
  }

  /* Cancela o fade que ja estava correndo NESTE elemento.

     Sem isto, duas rampas escrevem em `el.volume` no mesmo intervalo de
     50ms e o nivel pula entre os dois destinos. E o que se ouve como
     "audio bugado" quando a troca de sala pede duas faixas seguidas. */
  function cancelaFade(el) {
    if (el && el._rbfFade) {
      clearInterval(el._rbfFade);
      el._rbfFade = null;
    }
  }

  function fade(el, from, to, ms, done) {
    if (!el) { if (done) { done(); } return; }
    cancelaFade(el);

    var steps = Math.max(1, Math.round(ms / 50));
    var step  = 0;
    try { el.volume = clamp(from); } catch (e) { /* ignora */ }

    el._rbfFade = setInterval(function () {
      step += 1;
      try { el.volume = clamp(from + (to - from) * (step / steps)); } catch (e) { /* ignora */ }
      if (step >= steps) {
        cancelaFade(el);
        if (done) { done(); }
      }
    }, 50);
  }

  function startBgm(id, minha) {
    var def = RBF.BGM[id];
    if (!def || failed[id]) { return; }
    if (minha === undefined) { geracao += 1; minha = geracao; }

    pick(def, paths().bgm, id, function (el) {
      if (!el) { return; }

      /* O pedido foi atropelado enquanto o arquivo carregava. O elemento
         ja existe e pode ate ter comecado a tocar; ele morre aqui, e nao
         vira `current`. */
      if (minha !== geracao) {
        cancelaFade(el);
        try { el.pause(); el.currentTime = 0; } catch (e) { /* ignora */ }
        descarta(el);
        return;
      }
      if (pending && pending !== id) { return; }  /* outra faixa foi pedida */
      registra(el);
      el.loop = (def.loop !== false);
      var target = (def.volume != null ? def.volume : 1) * cfg().bgmVolume;
      el.volume = 0;
      var p = el.play();
      if (p && p.catch) { p.catch(function () { /* bloqueado pelo browser */ }); }
      fade(el, 0, target, cfg().fadeMs);
      current = { id: id, el: el, target: target };
      pending = null;
    });
  }

  /* id null ou vazio = parar a trilha atual */
  /* Numero do pedido de trilha.

     `pick()` e assincrono - espera `canplaythrough` - e nao garante
     ordem de chegada. Sem um numero por pedido, o callback de uma troca
     atropelada ainda virava `current`, e a faixa da troca mais nova
     ficava tocando sem dono. Comparar por id nao basta: duas trocas
     podem pedir a MESMA faixa. */
  var geracao = 0;

  function playBgm(id) {
    if (!cfg().enabled) { return; }

    geracao += 1;
    var minha = geracao;

    if (!id) { pending = null; calaPendentes(); stopBgm(); return; }
    if (current && current.id === id) { return; }

    /* Uma troca nova chegou antes de a anterior terminar de sair: o que
       ainda estava esmaecendo cala agora, e nao daqui a 900ms. */
    calaPendentes();

    pending = id;
    stopBgm(function () {
      if (minha !== geracao) { return; }  /* atropelado no caminho */
      if (!unlocked) { return; }          /* dispara no unlock */
      startBgm(id, minha);
    });
  }

  /* Elementos que ja receberam ordem de sair e ainda estao esmaecendo.
     Existem porque `stopBgm` desanexa `current` na primeira linha: a
     partir dali, ninguem mais aponta para a faixa que esta saindo, e uma
     segunda troca no meio do caminho a deixava tocando ate o fim sem
     dono. */
  var saindo = [];

  /* Todo elemento de trilha que este modulo criou.

     `new Audio()` nao entra no documento, entao `querySelectorAll('audio')`
     nao ve nada: de fora, a trilha era invisivel. Sem este registro nao ha
     como conferir o defeito que motivou tudo isto - faixa tocando sem
     ninguem apontando para ela.

     Cresce so quando uma faixa comeca, e o que morre e removido. */
  var criados = [];

  function registra(el) {
    if (el && criados.indexOf(el) === -1) { criados.push(el); }
  }

  function descarta(el) {
    var i = criados.indexOf(el);
    if (i !== -1) { criados.splice(i, 1); }
  }

  function esquece(el) {
    for (var i = saindo.length - 1; i >= 0; i--) {
      if (saindo[i] === el) { saindo.splice(i, 1); }
    }
  }

  /* Corta na hora tudo o que ainda estiver soando. Usado quando uma
     troca nova chega antes de a anterior terminar de sair. */
  function calaPendentes() {
    for (var i = 0; i < saindo.length; i++) {
      var el = saindo[i];
      cancelaFade(el);
      try { el.pause(); el.currentTime = 0; } catch (e) { /* ignora */ }
      descarta(el);
    }
    saindo.length = 0;
  }

  function stopBgm(done) {
    if (!current) { if (done) { done(); } return; }
    var el = current.el;
    current = null;
    saindo.push(el);

    fade(el, el.volume, 0, cfg().fadeMs, function () {
      try { el.pause(); el.currentTime = 0; } catch (e) { /* ignora */ }
      esquece(el);
      descarta(el);
      if (done) { done(); }
    });
  }

  function playSfx(id) {
    if (!cfg().enabled || !unlocked) { return; }
    var def = RBF.SFX[id];
    if (!def || failed[id]) { return; }
    if (sfxCache[id]) {
      var clone = sfxCache[id].cloneNode();
      clone.volume = sfxCache[id].volume;
      var p1 = clone.play();
      if (p1 && p1.catch) { p1.catch(function () {}); }
      return;
    }
    pick(def, paths().sfx, id, function (el) {
      if (!el) { return; }
      el.volume = (def.volume != null ? def.volume : 1) * cfg().sfxVolume;
      sfxCache[id] = el;
      var p2 = el.play();
      if (p2 && p2.catch) { p2.catch(function () {}); }
    });
  }

  /* Reaplica os volumes atuais na faixa que ja esta tocando.
     Chamado por RBF.Settings quando o jogador mexe no controle. */
  function refreshVolume() {
    if (menuEl && menuActive) { menuFadeTo(menuTarget(), 220); }
    if (!current) { return; }
    var def = RBF.BGM[current.id];
    var target = (def && def.volume != null ? def.volume : 1) * cfg().bgmVolume;
    current.target = target;
    try { current.el.volume = clamp(target); } catch (e) { /* ignora */ }
  }

  /* =====================================================================
     SONS DE INTERFACE

     Vivem em RBF.UI_SFX e usam a pasta propria. Falham em silencio: a
     interface funciona por inteiro sem nenhum arquivo de audio.
     ===================================================================== */

  var uiCache = {};

  function playUi(id) {
    if (!cfg().enabled || !unlocked) { return; }

    var def = RBF.UI_SFX && RBF.UI_SFX[id];
    if (!def || failed['ui:' + id]) { return; }

    if (uiCache[id]) {
      try {
        var clone = uiCache[id].cloneNode();
        clone.volume = clamp((def.volume != null ? def.volume : 1) * cfg().sfxVolume);
        var pc = clone.play();
        if (pc && pc.catch) { pc.catch(function () {}); }
      } catch (e) { /* som de interface nunca derruba a interface */ }
      return;
    }

    pick(def, paths().uiSfx, 'ui:' + id, function (el) {
      if (!el) { return; }
      el.volume = clamp((def.volume != null ? def.volume : 1) * cfg().sfxVolume);
      uiCache[id] = el;
      var p = el.play();
      if (p && p.catch) { p.catch(function () {}); }
    });
  }

  /* =====================================================================
     TRILHA DO MENU

     Adaptador sobre o mesmo mecanismo de BGM, com duas diferencas: ela
     nao reinicia ao trocar de painel, e desce de volume em vez de parar
     quando a aba perde o foco.
     ===================================================================== */

  var menuEl     = null;
  var menuFade   = null;   /* id do intervalo de fade em andamento */
  var menuActive = false;

  function menuCfg() { return RBF.MENU_AUDIO; }

  function menuTarget() {
    var def = RBF.MUSIC[menuCfg().track];
    var base = (def && def.volume != null) ? def.volume : 1;
    var factor = documentHidden() ? menuCfg().hiddenFactor : 1;
    return clamp(base * cfg().bgmVolume * factor);
  }

  function documentHidden() {
    return (typeof document !== 'undefined' && document.hidden === true);
  }

  function cancelMenuFade() {
    if (menuFade) { clearInterval(menuFade); menuFade = null; }
  }

  /* Fade cancelavel. Nunca acumula dois ao mesmo tempo. */
  function menuFadeTo(target, ms, done) {
    cancelMenuFade();
    if (!menuEl) { if (done) { done(); } return; }

    var from  = menuEl.volume;
    var to    = clamp(target);
    var steps = Math.max(1, Math.round(ms / 50));
    var step  = 0;

    menuFade = setInterval(function () {
      step += 1;
      try {
        menuEl.volume = clamp(from + (to - from) * (step / steps));
      } catch (e) { /* ignora */ }
      if (step >= steps) {
        cancelMenuFade();
        if (done) { done(); }
      }
    }, 50);
  }

  /* Entra no ambiente de menu. Chamar de novo enquanto ja esta tocando
     nao reinicia a faixa: apenas garante o volume correto. */
  function enterMenu() {
    if (!cfg().enabled) { return; }
    menuActive = true;

    if (!unlocked) { return; }        /* dispara no unlock */

    if (menuEl) {
      try {
        if (menuEl.paused) { var pr = menuEl.play(); if (pr && pr.catch) { pr.catch(function () {}); } }
      } catch (e) { /* ignora */ }
      menuFadeTo(menuTarget(), menuCfg().fadeInMs);
      return;
    }

    var id  = menuCfg().track;
    var def = RBF.MUSIC[id];
    if (!def || failed['music:' + id]) { return; }

    pick(def, paths().music, 'music:' + id, function (el) {
      if (!el) { return; }
      if (!menuActive) { return; }     /* saiu do menu enquanto carregava */
      if (menuEl) { return; }          /* outra chamada ja resolveu       */

      el.loop = (def.loop !== false);
      el.volume = 0;
      menuEl = el;

      var p = el.play();
      if (p && p.catch) { p.catch(function () { /* bloqueado: segue mudo */ }); }
      menuFadeTo(menuTarget(), menuCfg().fadeInMs);
    });
  }

  /* Sai do ambiente de menu: desce e pausa. Nao destroi o elemento, para
     que voltar ao titulo nao recarregue o arquivo. */
  function leaveMenu(done) {
    menuActive = false;
    if (!menuEl) { if (done) { done(); } return; }

    menuFadeTo(0, menuCfg().fadeOutMs, function () {
      try { menuEl.pause(); } catch (e) { /* ignora */ }
      if (done) { done(); }
    });
  }

  function menuPlaying() {
    return !!(menuEl && !menuEl.paused);
  }

  /* Aba escondida: a trilha do menu recua, a de cena para. */
  function bindVisibility() {
    if (typeof document === 'undefined' || !document.addEventListener) { return; }
    document.addEventListener('visibilitychange', function () {
      if (menuActive && menuEl) { menuFadeTo(menuTarget(), 400); }
      if (current) {
        var t = documentHidden() ? current.target * menuCfg().hiddenFactor : current.target;
        fade(current.el, current.el.volume, t, 400);
      }
    });
  }

  /* Chamado no primeiro clique/tecla. Idempotente. */
  function unlock() {
    if (unlocked) { return; }
    unlocked = true;
    bindVisibility();
    if (pending) { startBgm(pending); }
    if (menuActive) { enterMenu(); }
  }

  function setEnabled(v) {
    RBF.CONFIG.audio.enabled = !!v;
    if (!RBF.CONFIG.audio.enabled) { stopBgm(); }
  }

  return {
    playBgm:       playBgm,
    stopBgm:       stopBgm,
    playSfx:       playSfx,
    unlock:        unlock,
    setEnabled:    setEnabled,
    refreshVolume: refreshVolume,
    playUi:        playUi,
    enterMenu:     enterMenu,
    leaveMenu:     leaveMenu,
    menuPlaying:   menuPlaying,
    isUnlocked: function () { return unlocked; },
    currentId:  function () { return current ? current.id : null; },

    /* Exposto para conferencia, como RBF.Engine._debug.

       `vivos` e a unica janela para o defeito que motivou isto: faixa
       que continua soando sem ninguem apontando para ela. Contar
       elementos do documento nao serve, porque `new Audio()` nao entra
       nele. */
    _debug: {
      vivos: function () {
        var out = [];
        for (var i = 0; i < criados.length; i++) {
          var el = criados[i];
          out.push({
            src:    (el.currentSrc || el.src || '').split('/').pop(),
            tocando: !el.paused && !el.ended,
            volume: Math.round(el.volume * 100) / 100,
            dono:   !!(current && current.el === el),
            saindo: saindo.indexOf(el) !== -1
          });
        }
        return out;
      },
      tocando: function () {
        var n = 0;
        for (var i = 0; i < criados.length; i++) {
          if (!criados[i].paused && !criados[i].ended) { n += 1; }
        }
        return n;
      },
      orfas: function () {
        var n = 0;
        for (var i = 0; i < criados.length; i++) {
          var el = criados[i];
          if (el.paused || el.ended) { continue; }
          if (current && current.el === el) { continue; }
          if (saindo.indexOf(el) !== -1) { continue; }
          n += 1;
        }
        return n;
      }
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.Audio; }
