/* ==========================================================================
   ARQUIVO RABENFELS - js/gallery.js

   Galeria e extras.

   Nada aqui e liberado para demonstracao. Cada entrada tem uma condicao
   verificada contra o progresso real gravado em RBF.STORAGE.keys.progress
   e contra o estado da partida em andamento:

     bg:<id>       o jogador esteve em uma cena com aquele background
     arc:<chave>   o jogador leu aquele cartao do Arquivo
     chapter:<id>  o capitulo foi alcancado
     done:<id>     o capitulo foi concluido
     route:<id>    a rota chegou ao valor pedido

   O registro de itens vistos e gravado pelo engine durante a partida, o
   que significa que a galeria reflete o que foi realmente lido, e nao o
   que existe no roteiro.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.Gallery = (function () {
  'use strict';

  /* ---- catalogo ---------------------------------------------------------
     Declarativo. Adicionar item novo e acrescentar uma linha; a condicao
     de liberacao acompanha o item.                                       */

  var CATALOG = [
    /* --- cenarios --- */
    { id: 'bg_prologue_room',   cat: 'cg',  name: 'O escrit\u00f3rio de Matheo',    need: 'bg:bg_prologue_room' },
    { id: 'bg_archive_closeup', cat: 'cg',  name: 'O Arquivo sobre a mesa',        need: 'bg:bg_archive_closeup' },
    { id: 'bg_grey_march_road', cat: 'cg',  name: 'A estrada da Marca Cinzenta',   need: 'bg:bg_grey_march_road' },
    { id: 'bg_nidhaus_gate',    cat: 'cg',  name: 'O port\u00e3o de Velha Nidhaus', need: 'bg:bg_nidhaus_gate' },
    { id: 'bg_main_hall',       cat: 'cg',  name: 'O sal\u00e3o principal',         need: 'bg:bg_main_hall' },
    { id: 'bg_antoniette_room', cat: 'cg',  name: 'O quarto de Antoniette',        need: 'bg:bg_antoniette_room' },
    { id: 'bg_library',         cat: 'cg',  name: 'A biblioteca',                  need: 'bg:bg_library' },
    { id: 'bg_library_night',   cat: 'cg',  name: 'A biblioteca \u00e0 noite',      need: 'bg:bg_library_night' },
    { id: 'bg_corridor',        cat: 'cg',  name: 'O corredor leste',              need: 'bg:bg_corridor' },
    { id: 'bg_portrait_hall',   cat: 'cg',  name: 'A galeria de retratos',         need: 'bg:bg_portrait_hall' },
    { id: 'bg_kitchen',         cat: 'cg',  name: 'A copa',                        need: 'bg:bg_kitchen' },

    /* --- fichas de personagem --- */
    { id: 'ch_antoniette', cat: 'char', name: 'Antoniette Vael', need: 'chapter:capitulo1',
      text: 'Arquivista da Ordem dos Olhos Cinzentos.\nRecrutada aos dezessete anos.\nChegou a Velha Nidhaus aos vinte, sob cobertura de catalogadora contratada.\n\nM\u00e9todo: registra tudo, inclusive o que classifica como sem valor operacional.' },
    { id: 'ch_matheo', cat: 'char', name: 'Matheo Drell', need: 'chapter:prologo',
      text: 'Superior direto de Antoniette. Oito anos de rela\u00e7\u00e3o profissional.\n\nAssinou a autoriza\u00e7\u00e3o de campo em quarenta minutos e n\u00e3o releu o dossi\u00ea.' },
    { id: 'ch_serafina', cat: 'char', name: 'Serafina Rabenfels', need: 'bg:bg_main_hall',
      text: 'Senhora de Velha Nidhaus. Controle social excepcional.\n\nL\u00ea um documento at\u00e9 parar de encontrar coisa nova nele.' },
    { id: 'ch_aldric', cat: 'char', name: 'Aldric Rabenfels', need: 'bg:bg_library',
      text: 'Senhor de Velha Nidhaus. Amea\u00e7a por conten\u00e7\u00e3o.\n\nD\u00e1 permiss\u00f5es que funcionam como armadilhas.' },
    { id: 'ch_twins', cat: 'char', name: 'Klara e Liara', need: 'bg:bg_corridor',
      text: 'Oito anos. G\u00eameas id\u00eanticas, assim\u00e9tricas em tudo o que importa.\n\nLiara nota o fato. Klara tira a conclus\u00e3o e n\u00e3o a diz.' },
    { id: 'ch_fenn', cat: 'char', name: 'Fenn', need: 'bg:bg_nidhaus_gate',
      text: 'Responde pela casa.\n\nResponde \u00e0 pergunta feita e para exatamente onde a verdade acaba.' },
    { id: 'ch_dara', cat: 'char', name: 'Dara', need: 'bg:bg_kitchen',
      text: 'Cozinheira. Dezenove anos de casa.\n\nEnuncia regras como se fossem fatos triviais. Depois das oito, ningu\u00e9m tem fome.' },
    { id: 'ch_ren', cat: 'char', name: 'Ren', need: 'bg:bg_kitchen',
      text: 'Dezessete anos. Cinco semanas de casa. Sem raiz local.\n\nN\u00e3o faz a segunda pergunta.' },

    /* --- documentos: cartoes do Arquivo lidos --- */
    { id: 'doc_arquivo',    cat: 'doc', name: 'Fragmentos do Arquivo',        need: 'arc:arquivo' },
    { id: 'doc_compilador', cat: 'doc', name: 'Nota do Compilador',           need: 'arc:compilador' },
    { id: 'doc_ultima',     cat: 'doc', name: '\u00daltima entrada',           need: 'arc:ultima' },
    { id: 'doc_caderno',    cat: 'doc', name: 'Caderno operacional',          need: 'arc:caderno' },
    { id: 'doc_sem_ident',  cat: 'doc', name: 'Caderno sem identifica\u00e7\u00e3o', need: 'arc:sem_identificacao' },
    { id: 'doc_balada',     cat: 'doc', name: 'Cantiga da Marca',          need: 'arc:balada' },

    /* --- registros de volume --- */
    { id: 'end_prologo',  cat: 'rec', name: 'Pr\u00f3logo conclu\u00eddo',      need: 'done:prologo' },
    { id: 'end_cap1',     cat: 'rec', name: 'Cap\u00edtulo 1 conclu\u00eddo',   need: 'done:capitulo1' },
    { id: 'end_cap2',     cat: 'rec', name: 'Cap\u00edtulo 2 conclu\u00eddo',   need: 'done:capitulo2' },
    { id: 'route_hope',   cat: 'rec', name: 'Registro: Esperan\u00e7a',        need: 'route:hope:2' },
    { id: 'route_loss',   cat: 'rec', name: 'Registro: Perda',                need: 'route:loss:2' },
    { id: 'route_answer', cat: 'rec', name: 'Registro: Resposta',             need: 'route:answer:2' }
  ];

  var CATEGORIES = [
    { id: 'cg',   label: 'Cen\u00e1rios' },
    { id: 'char', label: 'Fichas' },
    { id: 'doc',  label: 'Documentos' },
    { id: 'rec',  label: 'Registros' }
  ];

  /* ---- registro do que foi visto ---------------------------------------- */

  function progress() {
    return RBF.Saves.readProgress();
  }

  function persist(p) {
    RBF.Storage.write(RBF.STORAGE.keys.progress, p);
  }

  /* Chamado pelo engine ao entrar em uma cena. */
  function markSeen(kind, value) {
    if (!kind || !value) { return; }
    var p = progress();
    if (!p.seen) { p.seen = []; }
    var token = kind + ':' + value;
    if (p.seen.indexOf(token) !== -1) { return; }
    p.seen.push(token);
    persist(p);
  }

  function hasSeen(token) {
    var p = progress();
    return !!(p.seen && p.seen.indexOf(token) !== -1);
  }

  /* ---- avaliacao de condicao -------------------------------------------- */

  function unlocked(item) {
    var need = item.need;
    if (!need) { return true; }

    var parts = need.split(':');
    var kind  = parts[0];

    if (kind === 'bg' || kind === 'arc') {
      return hasSeen(need);
    }
    if (kind === 'chapter') {
      return RBF.Saves.chapterReached(parts[1]);
    }
    if (kind === 'done') {
      var p = progress();
      return p.finishedChapters.indexOf(parts[1]) !== -1;
    }
    if (kind === 'route') {
      var target = parseInt(parts[2], 10) || 1;
      /* Vale o maior entre a partida atual e o melhor ja registrado. */
      var live = RBF.Routes.get(parts[1]);
      var best = (progress().bestRoutes || {})[parts[1]] || 0;
      return Math.max(live, best) >= target;
    }
    return false;
  }

  /* Guarda o melhor valor de rota ja alcancado, para que a galeria nao
     "esqueca" um registro depois de um novo jogo. */
  function recordRoutes(routeValues) {
    if (!routeValues) { return; }
    var p = progress();
    if (!p.bestRoutes) { p.bestRoutes = {}; }
    var changed = false;
    for (var id in routeValues) {
      if (!Object.prototype.hasOwnProperty.call(routeValues, id)) { continue; }
      var v = routeValues[id];
      if (typeof v !== 'number') { continue; }
      if (!p.bestRoutes[id] || v > p.bestRoutes[id]) {
        p.bestRoutes[id] = v;
        changed = true;
      }
    }
    if (changed) { persist(p); }
  }

  /* ---- consulta --------------------------------------------------------- */

  function categories() {
    return CATEGORIES.slice();
  }

  function items(categoryId) {
    var out = [];
    for (var i = 0; i < CATALOG.length; i++) {
      var it = CATALOG[i];
      if (categoryId && it.cat !== categoryId) { continue; }
      out.push({
        id:       it.id,
        cat:      it.cat,
        name:     it.name,
        text:     it.text || null,
        /* Item de cenario mostra o proprio background. */
        bg:       (it.need.indexOf('bg:') === 0) ? it.need.slice(3) : null,
        unlocked: unlocked(it)
      });
    }
    return out;
  }

  function counts() {
    var total = CATALOG.length;
    var open  = 0;
    for (var i = 0; i < CATALOG.length; i++) {
      if (unlocked(CATALOG[i])) { open += 1; }
    }
    return { total: total, unlocked: open };
  }

  function hasAny() {
    return counts().unlocked > 0;
  }

  return {
    categories:   categories,
    items:        items,
    counts:       counts,
    hasAny:       hasAny,
    markSeen:     markSeen,
    recordRoutes: recordRoutes
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RBF.Gallery;
}
