/* ==========================================================================
   ARQUIVO RABENFELS - js/storage.js

   Camada de persistencia. Unico ponto do projeto que fala com
   localStorage. As chaves vivem em RBF.STORAGE.keys (js/config.js).

   Regras:
   - localStorage indisponivel nunca derruba o jogo. O modulo cai para
     um armazenamento em memoria e avisa via isPersistent().
   - JSON corrompido nunca derruba o jogo. Retorna null e registra o erro.
   - Cota estourada retorna false em vez de lancar excecao.

   Sob file:// o localStorage funciona no Chrome e no Firefox, mas o
   escopo e por origem de arquivo. Se o jogador mover a pasta, os saves
   antigos deixam de aparecer. Exportar save resolve esse caso.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.Storage = (function () {
  'use strict';

  var memory     = {};
  var persistent = false;
  var lastError  = null;

  /* Testa localStorage de verdade: alguns navegadores expoem o objeto
     mas lancam excecao na primeira escrita. */
  function probe() {
    try {
      if (typeof localStorage === 'undefined' || !localStorage) { return false; }
      var k = '__rbf_probe__';
      localStorage.setItem(k, '1');
      localStorage.removeItem(k);
      return true;
    } catch (e) {
      lastError = e;
      return false;
    }
  }

  persistent = probe();

  function rawGet(key) {
    if (persistent) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        lastError = e;
        return null;
      }
    }
    return Object.prototype.hasOwnProperty.call(memory, key) ? memory[key] : null;
  }

  function rawSet(key, value) {
    if (persistent) {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (e) {
        lastError = e;
        /* cota estourada ou modo privado: mantem em memoria */
        memory[key] = value;
        return false;
      }
    }
    memory[key] = value;
    return true;
  }

  function rawRemove(key) {
    if (persistent) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        lastError = e;
      }
    }
    delete memory[key];
  }

  /* ---- API em JSON ------------------------------------------------------ */

  function read(key, fallback) {
    var raw = rawGet(key);
    if (raw === null || raw === undefined || raw === '') {
      return (fallback === undefined) ? null : fallback;
    }
    try {
      var parsed = JSON.parse(raw);
      return (parsed === null && fallback !== undefined) ? fallback : parsed;
    } catch (e) {
      lastError = e;
      if (RBF.CONFIG && RBF.CONFIG.debug && typeof console !== 'undefined') {
        console.warn('[rabenfels] JSON invalido em ' + key + ', descartado');
      }
      return (fallback === undefined) ? null : fallback;
    }
  }

  function write(key, value) {
    var raw;
    try {
      raw = JSON.stringify(value);
    } catch (e) {
      lastError = e;
      return false;
    }
    return rawSet(key, raw);
  }

  function remove(key) {
    rawRemove(key);
  }

  /* Apaga apenas as chaves do projeto. Nunca toca em chaves de terceiros. */
  function clearAll() {
    var keys = RBF.STORAGE.keys;
    for (var k in keys) {
      if (Object.prototype.hasOwnProperty.call(keys, k)) { rawRemove(keys[k]); }
    }
  }

  /* Tamanho aproximado ocupado pelo projeto, em bytes. */
  function usage() {
    var total = 0;
    var keys  = RBF.STORAGE.keys;
    for (var k in keys) {
      if (!Object.prototype.hasOwnProperty.call(keys, k)) { continue; }
      var raw = rawGet(keys[k]);
      if (raw) { total += raw.length; }
    }
    return total;
  }

  /* ---- download e upload de arquivo ------------------------------------ */

  /* Gera um download do objeto informado. Funciona sob file://. */
  function download(filename, data) {
    try {
      var text = JSON.stringify(data, null, 2);
      var blob = new Blob([text], { type: 'application/json' });
      var url  = URL.createObjectURL(blob);
      var a    = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      return true;
    } catch (e) {
      lastError = e;
      return false;
    }
  }

  /* Abre o seletor de arquivo e devolve o objeto lido.
     onDone(objeto, erro). */
  function upload(onDone) {
    try {
      var input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/json,.json';
      input.style.display = 'none';

      input.addEventListener('change', function () {
        var file = input.files && input.files[0];
        if (!file) { onDone(null, 'nenhum arquivo escolhido'); cleanup(); return; }

        var reader = new FileReader();
        reader.onload = function () {
          var parsed = null;
          try {
            parsed = JSON.parse(String(reader.result));
          } catch (e) {
            onDone(null, 'arquivo n\u00e3o \u00e9 JSON v\u00e1lido');
            cleanup();
            return;
          }
          onDone(parsed, null);
          cleanup();
        };
        reader.onerror = function () {
          onDone(null, 'falha ao ler o arquivo');
          cleanup();
        };
        reader.readAsText(file);
      });

      function cleanup() {
        if (input.parentNode) { input.parentNode.removeChild(input); }
      }

      document.body.appendChild(input);
      input.click();
      return true;
    } catch (e) {
      lastError = e;
      onDone(null, 'seletor de arquivo indispon\u00edvel');
      return false;
    }
  }

  return {
    read:         read,
    write:        write,
    remove:       remove,
    clearAll:     clearAll,
    usage:        usage,
    download:     download,
    upload:       upload,
    isPersistent: function () { return persistent; },
    lastError:    function () { return lastError; }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RBF.Storage;
}
