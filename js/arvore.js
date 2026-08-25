/* ==========================================================================
   ARQUIVO RABENFELS - js/arvore.js

   A ARVORE - montagem.

   Junta tres fontes e nao inventa nenhuma quarta:

     1. o roteiro    js/data/chapter*.js  - enunciado, opcoes e o campo
                                            'routes' de cada opcao
     2. a anotacao   js/data/arvore.js    - o que a escolha decide e o
                                            que cada ramo muda depois
     3. o progresso  localStorage         - o que este jogador de fato
                                            alcancou e percorreu

   ------------------------------------------------------------------
   POR QUE O DELTA DE ROTA VEM DO ROTEIRO
   ------------------------------------------------------------------
   O projeto tem uma regra dura: rota so se move pelo campo 'routes'
   declarado na opcao, nunca por inferencia. A tela de arvore e o
   primeiro lugar da obra que MOSTRA esse numero ao jogador, e mostrar
   um numero transcrito a mao seria criar a segunda fonte que a regra
   existe para impedir. Entao ele e lido da mesma opcao que o engine le.

   ------------------------------------------------------------------
   O QUE CONTA COMO PERCORRIDO
   ------------------------------------------------------------------
   Um ramo esta aberto quando o jogador escolheu aquela opcao em alguma
   partida - nao quando ele leu sobre ela. O engine grava no momento do
   clique, pelo mesmo canal do resto da galeria:

     RBF.Gallery.markSeen('cho', '<idDaEscolha>:<idDaOpcao>')

   Grava no clique, e nao no fim da partida, porque o jogador que
   abandona a partida no Capitulo 7 percorreu aqueles ramos do mesmo
   jeito. O painel continua fechado ate a obra ser terminada uma vez -
   isso e outra coisa, e vale para o painel inteiro.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.Arvore = (function () {
  'use strict';

  function dados() { return RBF.ARVORE || null; }

  /* Mesma porta de "A Conta": a obra precisa ter sido terminada uma
     vez. Antes disso o item nem aparece no menu. */
  function available() {
    return !!(dados() && RBF.Saves && RBF.Saves.hasCompleted && RBF.Saves.hasCompleted());
  }

  /* ---- registro do ramo percorrido -------------------------------------- */

  function token(choiceId, optId) { return choiceId + ':' + optId; }

  /* Chamado pelo engine quando o jogador confirma uma escolha. */
  function mark(choiceId, optId) {
    if (!choiceId || !optId) { return; }
    RBF.Gallery.markSeen('cho', token(choiceId, optId));
  }

  function tomado(choiceId, optId) {
    var p = (RBF.Saves && RBF.Saves.readProgress) ? RBF.Saves.readProgress() : null;
    var seen = (p && p.seen) || [];
    return seen.indexOf('cho:' + token(choiceId, optId)) !== -1;
  }

  /* ---- varredura do roteiro --------------------------------------------- */

  /* Todas as escolhas do roteiro base, na ordem, com o capitulo em que
     cada uma acontece. O capitulo vem do ultimo beat de cena ou de
     cartao de capitulo antes dela - a mesma leitura que o engine faz. */
  function varrer() {
    var out = [];
    var s = RBF.Script.base();
    var cap = null;

    for (var i = 0; i < s.length; i++) {
      var b = s[i];
      if (!b) { continue; }
      if (b.chapter && (b.t === 'scene' || b.t === 'chap')) { cap = b.chapter; }
      if (b.t === 'cho' && b.id) { out.push({ beat: b, chapter: cap }); }
    }
    return out;
  }

  /* ---- consulta --------------------------------------------------------- */

  /* Escolhas da ultima partida concluida, para a tela poder marcar o
     caminho daquela leitura. Save anterior a esta versao nao traz o
     registro; nesse caso ninguem fica marcado, e nada e adivinhado. */
  /* Flags da ultima partida concluida. A rota vive ali desde que o
     beat { t:'ending' } passou a gravar 'rota' junto com 'ending'. */
  function flags() {
    var run = (RBF.Saves && RBF.Saves.lastRun) ? RBF.Saves.lastRun() : null;
    return (run && run.flags) || {};
  }

  function caminhoDaUltima() {
    var run = (RBF.Saves && RBF.Saves.lastRun) ? RBF.Saves.lastRun() : null;
    return (run && run.choiceLog) || {};
  }

  /* Uma linha por escolha, na ordem do roteiro.

     { id, chapter, chapterLabel, code, alcancada, prompt, decide,
       abertos, total,
       opts: [ { id, tx, routes, tomada, naUltima, efeito } ] }

     'alcancada' decide se o enunciado e as tres opcoes aparecem: o
     jogador ja leu aquele texto na tela do jogo. O delta de rota e o
     efeito continuam presos ao ramo percorrido. */
  function build() {
    if (!available()) { return null; }

    var anot  = dados().escolhas || {};
    var ultima = caminhoDaUltima();
    var lista = varrer();
    var out   = [];

    for (var i = 0; i < lista.length; i++) {
      var beat = lista[i].beat;
      var cap  = lista[i].chapter;
      var a    = anot[beat.id] || {};
      var alcancada = !!(RBF.Saves.chapterReached && RBF.Saves.chapterReached(cap));

      var opts = [];
      var abertos = 0;

      for (var j = 0; j < beat.opts.length; j++) {
        var o  = beat.opts[j];
        var ok = tomado(beat.id, o.id);
        if (ok) { abertos += 1; }

        opts.push({
          id:       o.id,
          tx:       alcancada ? o.tx : '',
          /* lido da propria opcao, nunca transcrito */
          routes:   ok ? (o.routes || {}) : null,
          tomada:   ok,
          naUltima: ultima[beat.id] === o.id,
          efeito:   ok ? ((a.opts && a.opts[o.id] && a.opts[o.id].efeito) || '') : ''
        });
      }

      out.push({
        id:           beat.id,
        chapter:      cap,
        chapterLabel: RBF.Script.chapterLabel(cap),
        code:         beat.code || '',
        alcancada:    alcancada,
        prompt:       alcancada ? (beat.prompt || '') : '',
        decide:       alcancada ? (a.decide || '') : '',
        abertos:      abertos,
        total:        beat.opts.length,
        opts:         opts
      });
    }
    return out;
  }

  /* Os nove finais, na ordem em que RBF.ENDINGS os avalia - que e a
     ordem em que o jogo os decide, e por isso a unica ordem honesta de
     mostrar. Antes de a leitura ser alcancada aparecem os eixos e mais
     nada. */
  function finais() {
    if (!available()) { return null; }

    var anot   = dados().finais || {};
    var vistos = (RBF.Saves.endingsSeen && RBF.Saves.endingsSeen()) || [];
    var run    = (RBF.Saves.lastRun && RBF.Saves.lastRun()) || {};
    var lista  = RBF.ENDINGS || [];
    var out    = [];

    for (var i = 0; i < lista.length; i++) {
      var e     = lista[i];
      var a     = anot[e.id] || {};
      var visto = vistos.indexOf(e.id) !== -1;

      /* Eixo com direcao: "Esperanca alta", "Resposta baixa". O rotulo
         vem de RBF.ROUTES, e a direcao da anotacao. E o unico dado que
         aparece antes de a leitura ser alcancada, e o motivo e
         navegacao: sem ele oito dos nove cartoes ficam identicos. */
      var eixos = [];
      for (var k = 0; k < (a.eixos || []).length; k++) {
        var ex = a.eixos[k];
        var d  = RBF.Routes.defById(ex && ex.r);
        if (d) { eixos.push(d.label + ' ' + (ex.d || '')); }
      }

      out.push({
        id:       e.id,
        label:    e.label || e.id,
        /* Ordem de avaliacao. Aparece sempre: e posicao na tabela, nao
           conteudo, e da ao jogador como se referir a uma leitura que
           ele ainda nao viu. */
        ordem:    i + 1,
        eixos:    eixos,
        visto:    visto,
        atual:    run.ending === e.id,
        padrao:   !e.when,
        condicao: visto ? (a.condicao || '') : '',
        porta:    visto ? (a.porta || '') : '',
        nota:     visto ? (e.note || '') : ''
      });
    }
    return out;
  }


  /* ======================================================================
     O GRAFO

     Devolve a arvore inteira com coordenadas, pronta para virar SVG.
     O layout e calculado aqui e nao medido no DOM: um viewBox escala
     sozinho, e nada precisa ser remedido quando a janela muda.

     A FORMA E A DA OBRA, e nao a de um fluxograma generico.
     Rabenfels usa "interatividade superposta" (Szilas, via Cavallaro):
     percurso global linear com escolhas locais que reconvergem. Desenhar
     um emaranhado de rotas paralelas seria bonito e seria mentira. O que
     esta aqui e uma espinha reta com dez leques de tres, e um unico
     ponto onde o leque nao fecha.

     ESSE PONTO E O ASSUNTO DO DESENHO. O final e decidido no fim do
     Capitulo 9, e so aparece tres capitulos depois. A aresta tracejada
     do marco ate o bloco de finais e a unica coisa que o fluxograma diz
     que o texto nao diz em lugar nenhum.

     Sistema de coordenadas: 640 unidades de largura, tres colunas.
     Altura sai da conta. Fonte em unidades, para escalar junto.
     ====================================================================== */

  var G = {
    W:        640,      /* largura do viewBox                        */
    COL:      190,      /* largura da caixa de opcao e de final      */
    GAP:      35,       /* espaco entre colunas                      */
    CAP_W:    300,      /* largura da caixa de capitulo              */
    CAP_H:    46,
    OPT_H:    52,
    FIM_H:    58,
    PASSO:    108,      /* distancia entre uma fileira e a seguinte  */
    JUNTA:    28,       /* queda ate o ponto onde as tres reconvergem */
    TOPO:     28,
    RAIL:     18,       /* trilho da esquerda, herdado                */
    RCOL:     148,      /* largura da caixa na secao de rota          */
    RGAP:     12        /* espaco entre as quatro colunas de rota     */
  };

  function colX(i) { return G.COL / 2 + i * (G.COL + G.GAP); }   /* 95, 320, 545 */

  /* Quatro colunas, uma por rota. 4*148 + 3*12 = 628, dentro dos 640. */
  function rotaX(i) { return G.RCOL / 2 + i * (G.RCOL + G.RGAP); }

  var EIXO = G.W / 2;   /* 320 */

  /* Cotovelo: desce, anda de lado, desce. Diagonal solta fica ilegivel
     quando tres saem do mesmo ponto. */
  function cotovelo(x1, y1, x2, y2) {
    if (x1 === x2) { return 'M' + x1 + ' ' + y1 + 'V' + y2; }
    var meio = y1 + (y2 - y1) / 2;
    return 'M' + x1 + ' ' + y1 + 'V' + meio + 'H' + x2 + 'V' + y2;
  }

  /* Rota dominante de uma opcao, para a cor do no. Vem do campo
     'routes' da propria opcao - a mesma fonte que o engine soma. Empate
     fica com a primeira declarada em RBF.ROUTES, que e a ordem do
     manifesto e nao a ordem em que o objeto foi escrito. */
  function rotaDominante(routes) {
    if (!routes) { return null; }
    var defs = RBF.ROUTES || [];
    var melhor = null;
    for (var i = 0; i < defs.length; i++) {
      var v = routes[defs[i].id];
      if (typeof v !== 'number' || v <= 0) { continue; }
      if (!melhor || v > melhor.valor) { melhor = { id: defs[i].id, valor: v }; }
    }
    return melhor ? melhor.id : null;
  }

  /* Escolhas de um capitulo, na ordem do roteiro. */
  function escolhasDe(lista, capId) {
    var out = [];
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].chapter === capId) { out.push(lista[i].beat); }
    }
    return out;
  }

  function grafo() {
    if (!available()) { return null; }

    var anot   = dados().escolhas || {};
    var ultima = caminhoDaUltima();
    var lista  = varrer();

    var nos     = [];
    var arestas = [];
    var y       = G.TOPO;

    /* Ancora: de onde a proxima aresta sai. Comeca no topo da espinha. */
    var ancora  = { x: EIXO, y: y };
    var ativoAncora = true;      /* a ancora esta no caminho da ultima leitura */
    var marcoY  = null;          /* onde o final foi decidido */

    /* A espinha compartilhada vai do Prologo ao Capitulo 9. Dali em
       diante a obra se parte, e o desenho tambem: os capitulos de rota
       tem campo 'rota' e sao tratados na secao seguinte. O Epilogo
       volta a ser compartilhado e fecha as quatro colunas. */
    var caps = [];
    var todos = RBF.CHAPTERS || [];
    for (var t = 0; t < todos.length; t++) {
      if (!todos[t].rota && todos[t].id !== 'epilogo') { caps.push(todos[t]); }
    }

    for (var c = 0; c < caps.length; c++) {
      var cap = caps[c];
      var alcancado = !!(RBF.Saves.chapterReached && RBF.Saves.chapterReached(cap.id));

      /* ---- caixa do capitulo, na espinha ---- */
      var capY = y;
      nos.push({
        tipo:   'cap',
        id:     cap.id,
        x:      EIXO - G.CAP_W / 2,
        y:      capY,
        w:      G.CAP_W,
        h:      G.CAP_H,
        cx:     EIXO,
        rotulo: alcancado ? cap.label : 'n\u00e3o alcan\u00e7ado',
        sub:    alcancado ? cap.title : '',
        estado: alcancado ? 'aberto' : 'lacrado'
      });

      if (c > 0) {
        arestas.push({
          d:     cotovelo(ancora.x, ancora.y, EIXO, capY),
          tipo:  'espinha',
          ativo: ativoAncora
        });
      }

      ancora = { x: EIXO, y: capY + G.CAP_H };
      ativoAncora = true;
      y = capY + G.CAP_H + G.PASSO - G.OPT_H;

      /* ---- leques de escolha deste capitulo ---- */
      var esc = escolhasDe(lista, cap.id);

      for (var e = 0; e < esc.length; e++) {
        var beat = esc[e];
        var a    = anot[beat.id] || {};
        var optY = y;

        for (var o = 0; o < beat.opts.length && o < 3; o++) {
          var opt = beat.opts[o];
          var tom = tomado(beat.id, opt.id);
          var naU = ultima[beat.id] === opt.id;
          var cxo = colX(o);

          nos.push({
            tipo:    'opt',
            id:      beat.id + ':' + opt.id,
            escolha: beat.id,
            opcao:   opt.id,
            x:       cxo - G.COL / 2,
            y:       optY,
            w:       G.COL,
            h:       G.OPT_H,
            cx:      cxo,
            rotulo:  alcancado ? ((a.opts && a.opts[opt.id] && a.opts[opt.id].curto) || opt.id) : '',
            sub:     alcancado ? opt.id : '',
            rota:    tom ? rotaDominante(opt.routes) : null,
            estado:  !alcancado ? 'lacrado' : (naU ? 'atual' : (tom ? 'aberto' : 'fechado'))
          });

          arestas.push({
            d:     cotovelo(ancora.x, ancora.y, cxo, optY),
            tipo:  'ramo',
            ativo: ativoAncora && naU
          });
        }

        /* As tres reconvergem num PONTO SO, logo abaixo da fileira.

           Sem esse ponto, o fecho de um leque e a abertura do leque
           seguinte desenhavam duas barras horizontais quase coladas e a
           figura virava ruido - foi o primeiro defeito visivel do mapa.
           Com ele, fecho e abertura formam um losango em volta da
           juncao, que e a forma que se le de longe. */
        var junta = optY + G.OPT_H + G.JUNTA;

        for (var r = 0; r < beat.opts.length && r < 3; r++) {
          arestas.push({
            d:     cotovelo(colX(r), optY + G.OPT_H, EIXO, junta),
            tipo:  'ramo',
            ativo: ultima[beat.id] === beat.opts[r].id
          });
        }

        ancora = { x: EIXO, y: junta };
        ativoAncora = true;
        y = optY + G.PASSO;
      }

      /* ---- o marco: o final e decidido no fim do Capitulo 9 ---- */
      if (cap.id === 'capitulo9') {
        marcoY = y;
        nos.push({
          tipo:   'marco',
          id:     'marco_final',
          x:      EIXO - G.CAP_W / 2,
          y:      marcoY,
          w:      G.CAP_W,
          h:      G.CAP_H,
          cx:     EIXO,
          rotulo: 'a leitura \u00e9 decidida aqui',
          sub:    'fim do Cap\u00edtulo 9',
          estado: 'marco'
        });
        arestas.push({
          d:     cotovelo(ancora.x, ancora.y, EIXO, marcoY),
          tipo:  'espinha',
          ativo: true
        });
        ancora = { x: EIXO, y: marcoY + G.CAP_H };
        y = marcoY + G.CAP_H + G.PASSO - G.CAP_H;
      }
    }

    /* ==================================================================
       AS QUATRO COLUNAS DE ROTA

       Aqui a obra se parte. Cada coluna e uma rota com capitulos
       proprios, e o numero do capitulo se repete de coluna para coluna
       de proposito: existe um Capitulo 10 em cada uma, e eles nao tem
       nada em comum.

       As colunas tem alturas diferentes porque as rotas tem. E a coisa
       que o desenho diz melhor do que qualquer texto: Perda desce mais
       do que as outras tres.

       Todas terminam no Epilogo, que volta a ser compartilhado, e o
       desfecho de cada rota fica embaixo da propria coluna.
       ================================================================== */

    var rotas = RBF.ROTAS || [];
    var caminho = flags().rota || null;   /* a rota da ultima leitura */

    var topoRota = y + 10;
    var passoR   = 76;
    var fundo    = topoRota;

    for (var i = 0; i < rotas.length; i++) {
      var rt   = rotas[i];
      var rx   = rotaX(i);
      var viva = caminho === rt.id;

      /* Do marco ate a cabeca de cada coluna. */
      arestas.push({
        d:     cotovelo(ancora.x, ancora.y, rx, topoRota),
        tipo:  'ramo',
        ativo: viva
      });

      /* Rotulo da rota, acima da primeira caixa. */
      nos.push({
        tipo:   'rot',
        id:     'rota:' + rt.id,
        rota_id: rt.id,
        x:      rx - G.RCOL / 2,
        y:      topoRota,
        w:      G.RCOL,
        h:      30,
        cx:     rx,
        rotulo: rt.label,
        sub:    '',
        estado: viva ? 'atual' : 'aberto'
      });

      var yy = topoRota + 30 + 20;

      for (var k = 0; k < (rt.chapters || []).length; k++) {
        var cid = rt.chapters[k];
        var def = null;
        for (var d2 = 0; d2 < todos.length; d2++) {
          if (todos[d2].id === cid) { def = todos[d2]; break; }
        }
        if (!def) { continue; }

        var vis = !!(RBF.Saves.chapterReached && RBF.Saves.chapterReached(cid));

        arestas.push({
          d:     'M' + rx + ' ' + (yy - 20) + 'V' + yy,
          tipo:  'espinha',
          ativo: viva
        });

        nos.push({
          tipo:    'rcap',
          id:      cid,
          x:       rx - G.RCOL / 2,
          y:       yy,
          w:       G.RCOL,
          h:       40,
          cx:      rx,
          rotulo:  vis ? def.label : 'n\u00e3o alcan\u00e7ado',
          sub:     vis ? def.title : '',
          estado:  vis ? (viva ? 'atual' : 'aberto') : 'fechado'
        });

        yy += 40 + 20;
        if (yy > fundo) { fundo = yy; }
      }

      /* Guarda onde a coluna terminou, para ligar ao Epilogo depois. */
      rotas[i]._fim = yy - 20;
      rotas[i]._x   = rx;
      rotas[i]._viva = viva;
    }

    /* ---- o Epilogo, compartilhado outra vez ---- */
    var epY = fundo + 26;
    var epDef = null;
    for (var e2 = 0; e2 < todos.length; e2++) {
      if (todos[e2].id === 'epilogo') { epDef = todos[e2]; break; }
    }
    var epVis = !!(RBF.Saves.chapterReached && RBF.Saves.chapterReached('epilogo'));

    for (var q = 0; q < rotas.length; q++) {
      arestas.push({
        d:     cotovelo(rotas[q]._x, rotas[q]._fim, EIXO, epY),
        tipo:  'ramo',
        ativo: rotas[q]._viva
      });
    }

    nos.push({
      tipo:   'cap',
      id:     'epilogo',
      x:      EIXO - G.CAP_W / 2,
      y:      epY,
      w:      G.CAP_W,
      h:      G.CAP_H,
      cx:     EIXO,
      rotulo: epVis ? (epDef ? epDef.label : 'Epilogo') : 'n\u00e3o alcan\u00e7ado',
      sub:    epVis && epDef ? epDef.title : '',
      estado: epVis ? 'aberto' : 'lacrado'
    });

    /* ---- os quatro desfechos, um sob a propria coluna ---- */
    var fins  = finais() || [];
    var fimY0 = epY + G.CAP_H + 34;
    var fundoFim = fimY0;

    for (var f = 0; f < fins.length; f++) {
      var alvo = null;
      for (var g2 = 0; g2 < rotas.length; g2++) {
        if (rotas[g2].ending === fins[f].id) { alvo = rotas[g2]; break; }
      }
      var fx = alvo ? alvo._x : rotaX(f);

      arestas.push({
        d:     cotovelo(EIXO, epY + G.CAP_H, fx, fimY0),
        tipo:  'ramo',
        ativo: fins[f].atual
      });

      nos.push({
        tipo:   'fim',
        id:     'fim:' + fins[f].id,
        final:  fins[f].id,
        x:      fx - G.RCOL / 2,
        y:      fimY0,
        w:      G.RCOL,
        h:      G.FIM_H,
        cx:     fx,
        rotulo: fins[f].visto ? fins[f].label : 'n\u00e3o alcan\u00e7ada',
        sub:    String(fins[f].ordem),
        estado: fins[f].atual ? 'atual' : (fins[f].visto ? 'aberto' : 'fechado')
      });
      fundoFim = fimY0 + G.FIM_H;
    }

    /* A aresta que e o assunto do desenho: do marco ate os desfechos,
       por fora e tracejada. A rota e decidida no fim do Capitulo 9 e o
       desfecho so aparece dois, tres ou quatro capitulos depois. */
    if (marcoY !== null) {
      arestas.push({
        d:     'M' + (EIXO + G.CAP_W / 2) + ' ' + (marcoY + G.CAP_H / 2) +
               'H' + (G.W - 6) + 'V' + (fimY0 + G.FIM_H / 2) + 'H' + (rotaX(3) + G.RCOL / 2),
        tipo:  'decisao',
        ativo: false
      });
    }

    var ultimaLinhaY = fundoFim;

    return {
      largura: G.W,
      altura:  ultimaLinhaY + G.TOPO,
      nos:     nos,
      arestas: arestas
    };
  }

  /* Quantos ramos dos trinta o jogador percorreu. Sem porcentagem e sem
     trofeu: e a mesma contagem que a galeria mostra. */
  function counts() {
    var lista = varrer();
    var total = 0;
    var open  = 0;
    for (var i = 0; i < lista.length; i++) {
      var beat = lista[i].beat;
      for (var j = 0; j < beat.opts.length; j++) {
        total += 1;
        if (tomado(beat.id, beat.opts[j].id)) { open += 1; }
      }
    }
    return { total: total, taken: open };
  }

  return {
    available: available,
    mark:      mark,
    build:     build,
    finais:    finais,
    grafo:     grafo,
    counts:    counts
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RBF.Arvore;
}
