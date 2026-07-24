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

  /* Chamado no primeiro clique/tecla. Idempotente. */
  function unlock() {
    if (unlocked) { return; }
    unlocked = true;
    if (pending) { startBgm(pending); }
  }

  function setEnabled(v) {
    RBF.CONFIG.audio.enabled = !!v;
    if (!RBF.CONFIG.audio.enabled) { stopBgm(); }
  }

  return {
    playBgm:    playBgm,
    stopBgm:    stopBgm,
    playSfx:    playSfx,
    unlock:     unlock,
    setEnabled: setEnabled,
    isUnlocked: function () { return unlocked; },
    currentId:  function () { return current ? current.id : null; }
  };
})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.Audio; }
