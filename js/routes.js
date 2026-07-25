/* ==========================================================================
   ARQUIVO RABENFELS - js/routes.js

   Estado das tres rotas.

   O documento mestre define tres eixos de escolha: investiga\u00e7\u00e3o,
   relacionamento e moral. Esperanca, Perda e Resposta sao a leitura
   desses eixos.

   Regra que sustenta o modulo: o valor de uma rota nunca e inventado
   nem estimado a partir do texto da opcao. Ele vem do campo `routes`
   declarado em cada opcao de escolha, nos arquivos de js/data/. Se uma
   opcao nao declara delta, ela nao move rota nenhuma.

   O valor entra no save, volta no load e e reconstruido do zero a partir
   de RBF.STATE.choiceLog quando necessario, o que mantem o numero
   coerente mesmo em save antigo.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.Routes = (function () {
  'use strict';

  var values    = {};
  var listeners = [];

  function defs() { return RBF.ROUTES || []; }

  function defById(id) {
    var list = defs();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) { return list[i]; }
    }
    return null;
  }

  function zero() {
    var out = {};
    var list = defs();
    for (var i = 0; i < list.length; i++) { out[list[i].id] = 0; }
    return out;
  }

  function reset() {
    values = zero();
    notify(null, 0, 0);
  }

  function all() {
    var out = {};
    for (var k in values) {
      if (Object.prototype.hasOwnProperty.call(values, k)) { out[k] = values[k]; }
    }
    return out;
  }

  function get(id) {
    return Object.prototype.hasOwnProperty.call(values, id) ? values[id] : 0;
  }

  function max(id) {
    var d = defById(id);
    return d ? d.max : 5;
  }

  /* Aplica o delta declarado em uma opcao de escolha.
     Retorna a lista de rotas que realmente mudaram, para que o aviso
     visual so dispare quando houve mudanca. */
  function apply(delta, silent) {
    if (!delta) { return []; }

    var changed = [];

    for (var id in delta) {
      if (!Object.prototype.hasOwnProperty.call(delta, id)) { continue; }
      if (!defById(id)) { continue; }          /* rota desconhecida: ignora */

      var amount = delta[id];
      if (typeof amount !== 'number' || !amount) { continue; }

      var before = get(id);
      var after  = Math.max(0, Math.min(max(id), before + amount));

      if (after === before) { continue; }

      values[id] = after;
      changed.push({ id: id, from: before, to: after, delta: after - before });
    }

    if (!silent) {
      for (var i = 0; i < changed.length; i++) {
        notify(changed[i].id, changed[i].from, changed[i].to);
      }
    }
    return changed;
  }

  /* Reconstroi os valores percorrendo o roteiro com o registro de
     escolhas. Usado no load e sempre que o save nao trouxer rotas. */
  function rebuild(choiceLog) {
    values = zero();
    if (!choiceLog) { return all(); }

    var script = RBF.Script.base();

    function walk(beats) {
      for (var i = 0; i < beats.length; i++) {
        var b = beats[i];
        if (b.t !== 'cho') { continue; }
        if (!b.id || !Object.prototype.hasOwnProperty.call(choiceLog, b.id)) { continue; }

        for (var j = 0; j < b.opts.length; j++) {
          var opt = b.opts[j];
          if (opt.id !== choiceLog[b.id]) { continue; }
          apply(opt.routes, true);
          if (opt.then) { walk(opt.then); }
        }
      }
    }
    walk(script);
    return all();
  }

  function restore(saved, choiceLog) {
    if (saved && typeof saved === 'object') {
      values = zero();
      for (var id in saved) {
        if (!Object.prototype.hasOwnProperty.call(saved, id)) { continue; }
        if (!defById(id)) { continue; }
        var v = saved[id];
        if (typeof v !== 'number' || !isFinite(v)) { continue; }
        values[id] = Math.max(0, Math.min(max(id), Math.floor(v)));
      }
      return all();
    }
    /* Save sem rotas: recalcula a partir das escolhas gravadas. */
    return rebuild(choiceLog);
  }

  function serialize() { return all(); }

  /* Rotulo neutro para a lista de saves. Mostra a rota dominante e nada
     mais: nao revela numero nem antecipa consequencia. */
  function dominantLabel() {
    var best = null;
    var list = defs();
    for (var i = 0; i < list.length; i++) {
      var v = get(list[i].id);
      if (v <= 0) { continue; }
      if (!best || v > best.value) { best = { def: list[i], value: v }; }
    }
    return best ? best.def.label : '';
  }

  function notify(id, from, to) {
    for (var i = 0; i < listeners.length; i++) {
      try {
        listeners[i](id, from, to);
      } catch (e) { /* um ouvinte com defeito nao derruba os outros */ }
    }
  }

  function onChange(fn) {
    if (typeof fn === 'function') { listeners.push(fn); }
  }

  return {
    defs:          defs,
    defById:       defById,
    reset:         reset,
    all:           all,
    get:           get,
    max:           max,
    apply:         apply,
    rebuild:       rebuild,
    restore:       restore,
    serialize:     serialize,
    dominantLabel: dominantLabel,
    onChange:      onChange
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RBF.Routes;
}
