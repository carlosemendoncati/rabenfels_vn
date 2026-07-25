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

  /* Testa os candidatos em ordem. Chama cb(elemento) ou cb(null). */
  function pick(def, folder, id, cb) {
    if (!def || def.available === false || !def.files || !def.files.length) { cb(null); return; }
    if (!hasAudioElement()) { cb(null); return; }
    var i = 0;
    function tryNext() {
      if (i >= def.files.length) { failed[id] = true; cb(null); return; }
      var url = folder + def.files[i];
      i += 1;
      var el = new Audio();
      el.preload = 'auto';
      el.addEventListener('canplaythrough', function onReady() {
        el.removeEventListener('canplaythrough', onReady);
        cb(el);
      });
      el.addEventListener('error', function onErr() {
        el.removeEventListener('error', onErr);
        tryNext();
      });
      el.src = url;
      el.load();
    }
    tryNext();
  }

  function fade(el, from, to, ms, done) {
    if (!el) { if (done) { done(); } return; }
    var steps = Math.max(1, Math.round(ms / 50));
    var step  = 0;
    try { el.volume = clamp(from); } catch (e) { /* ignora */ }
    var timer = setInterval(function () {
      step += 1;
      try { el.volume = clamp(from + (to - from) * (step / steps)); } catch (e) { /* ignora */ }
      if (step >= steps) {
        clearInterval(timer);
        if (done) { done(); }
      }
    }, 50);
  }

  function startBgm(id) {
    var def = RBF.BGM[id];
    if (!def || failed[id]) { return; }
    pick(def, paths().bgm, id, function (el) {
      if (!el) { return; }
      if (pending && pending !== id) { return; }  /* outra faixa foi pedida */
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
  function playBgm(id) {
    if (!cfg().enabled) { return; }
    if (!id) { pending = null; stopBgm(); return; }
    if (current && current.id === id) { return; }
    pending = id;
    stopBgm(function () {
      if (!unlocked) { return; }   /* dispara no unlock */
      startBgm(id);
    });
  }

  function stopBgm(done) {
    if (!current) { if (done) { done(); } return; }
    var el = current.el;
    current = null;
    fade(el, el.volume, 0, cfg().fadeMs, function () {
      try { el.pause(); el.currentTime = 0; } catch (e) { /* ignora */ }
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
    currentId:  function () { return current ? current.id : null; }
  };
})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.Audio; }
