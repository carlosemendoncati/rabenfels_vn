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

    /* --- fichas de personagem ---------------------------------------------
       As fichas sao o dossie do Compilador, e por isso crescem.
       'need' decide se a ficha aparece na galeria.
       'entries' sao as entradas dela: cada uma tem condicao propria e so
       aparece quando o jogador tiver de fato lido ou vivido aquilo. As
       que faltam ficam visiveis como lacuna, para o jogador saber que ha
       mais a encontrar.
       Ordem = ordem de descoberta, nunca ordem de importancia.        */

    { id: 'ch_antoniette', cat: 'char', name: 'Antoniette Vael',
      need: 'chapter:capitulo1', portrait: 'antoniette.png', entries: [
      { need: 'chapter:capitulo1', tx: 'Arquivista da Ordem dos Olhos Cinzentos. Recrutada aos dezessete anos. Chegou a Velha Nidhaus aos vinte, sob cobertura de catalogadora contratada.' },
      { need: 'arc:caderno',       tx: 'M\u00e9todo: registra tudo, inclusive o que ela pr\u00f3pria classifica como sem valor operacional.' },
      { need: 'bg:bg_corridor',    tx: 'Come em p\u00e9. N\u00e3o senta para isso. Nada no dossi\u00ea explica.' },
      { need: 'arc:sem_identificacao', tx: 'Mant\u00e9m um segundo caderno, sem data e sem cabe\u00e7alho, debaixo do forro do ba\u00fa.' },
      { need: 'arc:ultima',        tx: 'Velha Nidhaus, agosto.' }
    ]},

    { id: 'ch_matheo', cat: 'char', name: 'Matheo Drell',
      need: 'chapter:prologo', portrait: 'matheo.png', entries: [
      { need: 'chapter:prologo',   tx: 'Superior direto de Antoniette. Oito anos de rela\u00e7\u00e3o profissional.' },
      { need: 'arc:compilador',    tx: 'Ensinou a ela a voz do Compilador. Terceira pessoa do come\u00e7o ao fim, nunca "eu". \u00c9 o que a Ordem ensina.' },
      { need: 'arc:ultima',        tx: 'Assinou a autoriza\u00e7\u00e3o de campo em quarenta minutos e n\u00e3o releu o dossi\u00ea.' },
      { need: 'done:prologo',      tx: 'Tinha aberto a ficha da escriba de Lervel uma semana antes de assinar.' }
    ]},

    { id: 'ch_serafina', cat: 'char', name: 'Serafina Rabenfels',
      need: 'bg:bg_main_hall', portrait: 'serafina.png', entries: [
      { need: 'bg:bg_main_hall',   tx: 'Senhora de Velha Nidhaus. Controle social excepcional.' },
      { need: 'bg:bg_main_hall',   tx: 'L\u00ea um documento at\u00e9 parar de encontrar coisa nova nele.' },
      { need: 'chapter:capitulo2', tx: 'Duas palavras para a filha. Vinte para a preceptora.' },
      { need: 'done:capitulo2',    tx: 'Escolheu para a h\u00f3spede o quarto de onde se v\u00ea a porta nordeste inteira.' }
    ]},

    { id: 'ch_aldric', cat: 'char', name: 'Aldric Rabenfels',
      need: 'bg:bg_library', portrait: 'aldric.png', entries: [
      { need: 'bg:bg_library',     tx: 'Senhor de Velha Nidhaus. Amea\u00e7a por conten\u00e7\u00e3o.' },
      { need: 'bg:bg_library',     tx: 'D\u00e1 permiss\u00f5es que funcionam como armadilhas.' },
      { need: 'chapter:capitulo2', tx: 'L\u00ea de p\u00e9, com o volume apoiado na estante. Nunca senta na pr\u00f3pria biblioteca.' },
      { need: 'route:answer:12',    tx: 'Entrou na c\u00e2mara uma vez e nunca mais. A mulher anotava os n\u00fameros.' }
    ]},

    { id: 'ch_twins', cat: 'char', name: 'Klara e Liara',
      need: 'bg:bg_corridor', portrait: 'gemeas.png', entries: [
      { need: 'bg:bg_corridor',    tx: 'Oito anos. G\u00eameas id\u00eanticas, assim\u00e9tricas em tudo o que importa.' },
      { need: 'bg:bg_corridor',    tx: 'Liara nota o fato. Klara tira a conclus\u00e3o e n\u00e3o a diz.' },
      { need: 'done:capitulo1',    tx: 'Curativo no bra\u00e7o esquerdo de uma delas. A outra n\u00e3o tem nenhum. Anotado sem conclus\u00e3o.' },
      { need: 'route:hope:8',      tx: 'Klara n\u00e3o pede para ir. Pede o mundo inteiro pela boca da irm\u00e3.' }
    ]},

    { id: 'ch_fenn', cat: 'char', name: 'Fenn',
      need: 'bg:bg_nidhaus_gate', portrait: 'fenn.png', entries: [
      { need: 'bg:bg_nidhaus_gate', tx: 'Responde pela casa.' },
      { need: 'bg:bg_nidhaus_gate', tx: 'Responde \u00e0 pergunta feita e para exatamente onde a verdade acaba.' },
      { need: 'done:capitulo1',     tx: 'Vinte palavras para um cavalo. Nove para uma pessoa.' }
    ]},

    { id: 'ch_dara', cat: 'char', name: 'Dara',
      need: 'bg:bg_kitchen', portrait: 'dara.png', entries: [
      { need: 'bg:bg_kitchen',     tx: 'Cozinheira. Dezenove anos de casa.' },
      { need: 'bg:bg_kitchen',     tx: 'Enuncia regras como se fossem fatos triviais. Depois das oito, ningu\u00e9m tem fome.' },
      { need: 'done:capitulo2',    tx: 'Conta a prataria toda noite, e conta h\u00e1 dezenove anos.' }
    ]},

    { id: 'ch_ren', cat: 'char', name: 'Ren',
      need: 'bg:bg_kitchen', portrait: 'ren.png', entries: [
      { need: 'bg:bg_kitchen',     tx: 'Dezessete anos. Cinco semanas de casa. Sem raiz local.' },
      { need: 'chapter:capitulo2', tx: 'N\u00e3o faz a segunda pergunta.' },
      { need: 'done:capitulo2',    tx: 'Guarda comida no bolso.' }
    ]},

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
    { id: 'route_hope',   cat: 'rec', name: 'Registro: Esperan\u00e7a',        need: 'route:hope:6' },
    { id: 'route_loss',   cat: 'rec', name: 'Registro: Perda',                need: 'route:loss:6' },
    { id: 'route_answer', cat: 'rec', name: 'Registro: Resposta',             need: 'route:answer:6' }
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

  /* Entradas de uma ficha, na ordem de descoberta.
     Devolve sempre TODAS, marcando quais ja foram abertas, para que a
     ficha possa mostrar a lacuna em vez de esconder que ela existe. */
  function entriesOf(it) {
    if (!it.entries) { return null; }
    var out = [];
    for (var i = 0; i < it.entries.length; i++) {
      var e = it.entries[i];
      out.push({ tx: e.tx, unlocked: unlocked(e) });
    }
    return out;
  }

  function items(categoryId) {
    var out = [];
    for (var i = 0; i < CATALOG.length; i++) {
      var it = CATALOG[i];
      if (categoryId && it.cat !== categoryId) { continue; }
      var ent = entriesOf(it);
      var open = 0;
      if (ent) {
        for (var k = 0; k < ent.length; k++) { if (ent[k].unlocked) { open += 1; } }
      }
      out.push({
        id:       it.id,
        cat:      it.cat,
        name:     it.name,
        text:     it.text || null,
        entries:  ent,
        entriesOpen:  ent ? open : 0,
        entriesTotal: ent ? ent.length : 0,
        portrait: it.portrait || null,
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
