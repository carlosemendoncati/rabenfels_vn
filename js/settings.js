/* ==========================================================================
   ARQUIVO RABENFELS - js/settings.js

   Ajustes do jogador, persistidos em localStorage.

   Quem le uma configuracao de execucao chama RBF.Settings.get(chave).
   Nada le RBF.SETTINGS_DEFAULT direto, porque isso ignoraria a escolha
   do jogador.

   Ao gravar, o modulo aplica imediatamente o que tem efeito visivel:
   volume de audio, velocidade do texto e tamanho da fonte.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.Settings = (function () {
  'use strict';

  var values    = null;
  var listeners = [];

  function defaults() {
    var out = {};
    for (var k in RBF.SETTINGS_DEFAULT) {
      if (Object.prototype.hasOwnProperty.call(RBF.SETTINGS_DEFAULT, k)) {
        out[k] = RBF.SETTINGS_DEFAULT[k];
      }
    }
    return out;
  }

  /* Descarta chave desconhecida e valor de tipo errado. Um arquivo de
     ajustes adulterado nao pode quebrar o jogo. */
  function sanitize(raw) {
    var base = defaults();
    if (!raw || typeof raw !== 'object') { return base; }

    for (var k in base) {
      if (!Object.prototype.hasOwnProperty.call(base, k)) { continue; }
      if (!Object.prototype.hasOwnProperty.call(raw, k)) { continue; }

      var want = typeof base[k];
      var got  = raw[k];

      if (typeof got !== want) { continue; }

      if (want === 'number') {
        if (!isFinite(got)) { continue; }
        if (k === 'bgmVolume' || k === 'sfxVolume' || k === 'masterVolume') {
          got = Math.max(0, Math.min(1, got));
        }
        if (k === 'typeSpeedMs')   { got = Math.max(0, Math.min(120, got)); }
        if (k === 'autoAdvanceMs') { got = Math.max(400, Math.min(9000, got)); }
        if (k === 'textSize')      { got = Math.max(14, Math.min(28, got)); }
      }
      base[k] = got;
    }
    return base;
  }

  function load() {
    var raw = RBF.Storage.read(RBF.STORAGE.keys.settings, null);
    values = sanitize(raw);
    return values;
  }

  function ensure() {
    if (!values) { load(); }
    return values;
  }

  function get(key) {
    var v = ensure();
    return Object.prototype.hasOwnProperty.call(v, key) ? v[key] : undefined;
  }

  function all() {
    var v = ensure();
    var out = {};
    for (var k in v) {
      if (Object.prototype.hasOwnProperty.call(v, k)) { out[k] = v[k]; }
    }
    return out;
  }

  function persist() {
    RBF.Storage.write(RBF.STORAGE.keys.settings, values);
  }

  function set(key, value) {
    ensure();
    if (!Object.prototype.hasOwnProperty.call(values, key)) { return false; }

    var patch = {};
    patch[key] = value;
    values = sanitize(mergeInto(all(), patch));

    persist();
    apply();
    notify(key);
    return true;
  }

  function mergeInto(base, patch) {
    for (var k in patch) {
      if (Object.prototype.hasOwnProperty.call(patch, k)) { base[k] = patch[k]; }
    }
    return base;
  }

  function reset() {
    values = defaults();
    persist();
    apply();
    notify(null);
  }

  /* Espelha os ajustes nos modulos que os consomem em tempo real. */
  function apply() {
    var v = ensure();

    /* O volume mestre multiplica os dois canais. Silenciar zera ambos
       sem perder o valor que o jogador tinha escolhido. */
    var master = v.muted ? 0 : v.masterVolume;

    RBF.CONFIG.audio.bgmVolume  = v.bgmVolume * master;
    RBF.CONFIG.audio.sfxVolume  = v.sfxVolume * master;
    RBF.CONFIG.text.typeSpeedMs = v.typewriter ? v.typeSpeedMs : 0;

    if (RBF.Audio && RBF.Audio.refreshVolume) { RBF.Audio.refreshVolume(); }

    if (typeof document === 'undefined' || !document.documentElement) { return; }

    var root = document.documentElement;
    root.style.setProperty('--rbf-text-size', v.textSize + 'px');

    /* Movimento reduzido pedido pelo jogador. A media query do sistema
       continua valendo por conta propria, em css/tokens.css. */
    root.classList.toggle('rbf-reduced-motion', !!v.reducedMotion);
  }

  function notify(key) {
    for (var i = 0; i < listeners.length; i++) {
      try {
        listeners[i](key, values);
      } catch (e) { /* um ouvinte com defeito nao derruba os outros */ }
    }
  }

  function onChange(fn) {
    if (typeof fn === 'function') { listeners.push(fn); }
  }

  function init() {
    load();
    apply();
    return values;
  }

  return {
    init:     init,
    get:      get,
    set:      set,
    all:      all,
    reset:    reset,
    apply:    apply,
    onChange: onChange
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RBF.Settings;
}
