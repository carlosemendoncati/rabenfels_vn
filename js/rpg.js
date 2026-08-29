/* ==========================================================================
   ARQUIVO RABENFELS - js/rpg.js

   O PERCURSO - o trecho jogado de cima da rota "A Cobertura".

   Nao e outro jogo. E um beat do roteiro:

     { t:'percurso', id:'...', entrada:'...', sets:{ ... } }

   O engine para em cima dele, entrega a tela a este modulo, e volta a
   correr quando o modulo devolve. O que o jogador apurou volta como
   flag, e o roteiro le com o mesmo `if:{}` de sempre. Nada aqui sabe o
   que a rota significa, e nada no roteiro sabe que existe um canvas.

   ------------------------------------------------------------------
   DECISOES QUE NAO SAO ARBITRARIAS
   ------------------------------------------------------------------

   NAO HA COMBATE. A obra inteira e horror por ausencia; a coisa nunca e
   mostrada, mostra-se o buraco que ela deixa. Um botao de atacar
   transformaria Khar'Vel em inimigo com barra de vida, que e a unica
   coisa que ela nao pode ser. O verbo do percurso e "conferir".

   O ESCURO E O ASSUNTO. A sala inteira existe no canvas o tempo todo; o
   que muda e quanto dela chega ao jogador. A vela e uma mascara de
   composicao, e nao um filtro sobre a imagem - o custo e o mesmo e o
   resultado e um circulo com borda de verdade.

   ANDAR RAPIDO FAZ BARULHO. O unico recurso do jogador e a pressa que
   ele nao gasta. O medidor de ruido nao aparece em numero na tela: a
   trilha troca por crossfade quando alguma coisa passa a ouvir, e essa
   e a unica notificacao.

   SEM CANVAS, O BEAT PASSA. tools/minidom.js nao implementa
   getContext, e o validador roda o jogo inteiro dentro dele. Um beat de
   percurso que travasse ali tornaria a rota inteira inauditavel, entao
   a ausencia de canvas resolve o beat na hora com as flags declaradas
   em `sets`. Ver `podeDesenhar()`.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.Rpg = (function () {
  'use strict';

  /* ---- estado do modulo -------------------------------------------------- */

  var cv    = null;     /* <canvas>            */
  var ctx   = null;     /* contexto 2d         */

  /* Duas telas fora do quadro. `cena` recebe o desenho inteiro sem luz
     nenhuma; `luz` recebe uma copia dela recortada pelo degrade da vela.
     Existem porque a luz precisa SOMAR sobre a cena pronta, e nao sobre
     o piso: um movel dentro do circulo tem de acender junto com o chao
     em que ele esta. */
  var cena  = null, cenaCtx = null;
  var luz   = null, luzCtx  = null;

  /* A mascara e uma tela a parte, e nao um gradiente direto sobre `luz`.
     Com um gradiente so, acrescentar a luz do cilindro SUBSTITUIRIA a da
     vela: 'destination-in' recorta pelo que foi desenhado por ultimo. Na
     mascara as fontes se somam por 'lighter' antes de recortar, e e por
     isso que ela existe. */
  var mask  = null, maskCtx = null;
  var capa  = null;     /* camada que embrulha o canvas e a interface */
  var palco = null;     /* quadro com a medida exata do canvas          */
  var hud   = null;
  var fala  = null;
  var menuBtn = null;

  var rodando = false;
  var quadro  = null;   /* id do requestAnimationFrame */
  var ultimo  = 0;

  var terminou = null;  /* callback do engine */
  var segmento = null;  /* definicao vinda de RBF.COB_MAPAS */

  /* Mundo vivo. Tudo o que entra no save mora aqui dentro. */
  var jogo = null;

  /* Imagens resolvidas. url -> HTMLImageElement | 'fail' */
  var imgs = {};

  /* Teclas seguradas. */
  var teclas = {};

  var LADOS = { baixo: 0, esquerda: 1, direita: 2, cima: 3 };

  /* ---- atalhos de manifesto ---------------------------------------------- */

  function C()  { return RBF.CONFIG.cobertura || RBF.COBERTURA; }
  function P()  { return RBF.CONFIG.paths; }

  function mapaDef(id)  { return (C().maps  || {})[id]  || null; }
  function charDef(id)  { return (C().chars || {})[id]  || null; }
  function propDef(id)  { return (C().props || {})[id]  || null; }
  function faceDef(id)  { return (C().faces || {})[id]  || null; }

  /* Um objeto pode trocar de arte quando o ponto correspondente foi
     conferido. Serve para estados concretos (retrato virado/revelado), sem
     criar uma segunda maquina de flags fora das marcas do percurso. */
  function tipoMovel(m) {
    if (m && m.tipoDepois && m.marca && jogo && jogo.marcas && jogo.marcas[m.marca]) {
      return m.tipoDepois;
    }
    return m ? m.tipo : null;
  }

  function sala(id) {
    var lista = RBF.COB_MAPAS || {};
    return lista[id] || null;
  }

  /* ---- carga de imagem ---------------------------------------------------- */

  /* Devolve a imagem quando pronta, ou null enquanto nao estiver.
     Nunca lanca, nunca repete requisicao, e respeita available:false do
     manifesto - mesma regra de js/assets.js. */
  function img(pasta, def) {
    if (!def || !def.available || !def.file) { return null; }
    var url = pasta + def.file;
    var v = imgs[url];
    if (v === 'fail') { return null; }
    if (v) { return v.completo ? v.el : null; }

    if (typeof Image !== 'function') { imgs[url] = 'fail'; return null; }

    var reg = { el: new Image(), completo: false };
    imgs[url] = reg;
    reg.el.onload  = function () { reg.completo = true; };
    reg.el.onerror = function () { imgs[url] = 'fail'; };
    reg.el.src = url;
    return null;
  }

  function imgMapa(id)  { return img(P().cobMaps,  mapaDef(id)); }
  function imgChar(id)  { return img(P().cobChars, charDef(id)); }
  function imgProp(id)  { return img(P().cobProps, propDef(id)); }
  function imgFace(id)  { return img(P().cobFaces, faceDef(id)); }
  function imgIcons()   { return img(P().cobIcons, C().icons); }

  /* Pede tudo o que a sala vai precisar antes de o jogador entrar nela.
     Sem isto o primeiro quadro de cada sala sai como piso e a imagem
     aparece depois, o que le como falha. */
  function preCarrega(idSala) {
    var s = sala(idSala);
    if (!s) { return; }
    imgMapa(s.mapa);
    var i;
    var mv = daFase(s.moveis), gt = daFase(s.gente), sd = saidasDe(s);
    var pt = pontosDe(s);
    for (i = 0; i < mv.length; i++) {
      imgProp(mv[i].tipo);
      if (mv[i].tipoDepois) { imgProp(mv[i].tipoDepois); }
    }
    for (i = 0; i < gt.length; i++) { imgChar(gt[i].ch); }
    for (i = 0; i < pt.length; i++) {
      if (pt[i].ataque) { imgChar(pt[i].ataque); }
    }
    for (i = 0; i < sd.length; i++) {
      var d = sala(sd[i].para);
      if (d) { imgMapa(d.mapa); }
    }

    /* Os retratos da faixa de fala. `pintaFala()` so repinta enquanto a
       maquina de escrever digita; se a face nao estiver pronta ate o
       texto fechar, a caixa fica sem retrato pelo resto daquela fala.
       Sao cinco arquivos pequenos e o pedido acontece uma vez. */
    var faces = C().faces || {};
    for (var k in faces) { imgFace(k); }
  }

  /* ---- medidas ------------------------------------------------------------ */

  /* Medida logica do percurso. Vem do canvas, e nao de RBF.CONFIG.stage:
     o palco da VN tem proporcao fixa por causa da arte de cenario, e
     este nao tem por causa da camera. Enquanto o canvas nao existe -
     validador, DOM sem layout - vale o palco da VN como piso. */
  var lw = 0, lh = 0;

  function largura() { return lw || RBF.CONFIG.stage.width; }
  function altura()  { return lh || RBF.CONFIG.stage.height; }

  /* Redimensiona o canvas e as duas telas auxiliares para a caixa real.
     Teto de 1920x1200: acima disso o ganho visual e nulo e a composicao
     passa a custar tres desenhos de tela cheia por quadro em area que
     ninguem olha. */
  function mede() {
    if (!cv || !palco) { return false; }

    var r = palco.getBoundingClientRect();
    var w = Math.max(320, Math.min(1920, Math.round(r.width  || 0)));
    var h = Math.max(240, Math.min(1200, Math.round(r.height || 0)));

    if (w === lw && h === lh) { return false; }

    lw = w; lh = h;
    cv.width = w; cv.height = h;
    if (ctx) { ctx.imageSmoothingEnabled = false; }

    if (cena && luz && mask) {
      cena.width = luz.width = mask.width  = w;
      cena.height = luz.height = mask.height = h;
      if (cenaCtx) { cenaCtx.imageSmoothingEnabled = false; }
      if (luzCtx)  { luzCtx.imageSmoothingEnabled  = false; }
      if (maskCtx) { maskCtx.imageSmoothingEnabled = false; }
    }
    return true;
  }

  /* Tamanho da sala. Vem da imagem quando ela chegou, e do que o mapa
     declarou enquanto nao chegou - a colisao nao pode esperar arte. */
  function tamanhoSala(s) {
    var im = imgMapa(s.mapa);
    if (im && im.naturalWidth) {
      return { w: im.naturalWidth, h: im.naturalHeight };
    }
    return { w: s.w || 1280, h: s.h || 720 };
  }

  /* ---- colisao ------------------------------------------------------------ */

  /* O personagem colide por um retangulo baixo, na altura dos pes. Bater
     com a cabeca numa parede que os pes ainda nao alcancaram e o erro
     classico de jogo de cima, e ele aparece na primeira porta estreita. */
  function caixaPes(x, y, def) {
    var larg = Math.max(12, (def ? def.fw : 48) * 0.42);
    var alt  = def ? def.pes : 20;
    return { x: x - larg / 2, y: y - alt, w: larg, h: alt };
  }

  function cruza(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x &&
           a.y < b.y + b.h && a.y + a.h > b.y;
  }

  /* Retangulos que barram passagem nesta sala, no momento.

     A parede nao e declarada: ela e o lado de fora do `piso`. Declarar
     quatro retangulos de parede por sala e o mesmo dado escrito duas
     vezes, e o segundo envelhece - foi assim que a primeira versao
     deixou a personagem passar por dentro do batente do corredor. */
  function barreiras(s) {
    var out = [];
    var i;

    /* Obstaculo interno declarado. Existe para a sala que nao e uma
       caixa - a escada sao dois andares no mesmo mapa, com uma parede
       no meio que so o vao da escada atravessa. */
    var paredes = daFase(s.paredes);
    for (i = 0; i < paredes.length; i++) {
      var p = paredes[i];
      out.push({ x: p.x, y: p.y, w: p.w, h: p.h });
    }

    var moveis = daFase(s.moveis);
    for (i = 0; i < moveis.length; i++) {
      var m = moveis[i];
      if (m.atravessa) { continue; }
      out.push(caixaMovel(m));
    }

    /* Personagem de cena so bloqueia quando declara isso. Vultos em ronda
       continuam usando a propria regra de alcance; Carmine, parada diante
       da porta, ocupa o espaco que o sprite mostra. */
    var gente = daFase(s.gente);
    for (i = 0; i < gente.length; i++) {
      var g = gente[i];
      if (!g.bloqueia) { continue; }
      var v = estadoGente(s.id, indiceDe(s.gente, g), g);
      if (typeof g.bloqueia === 'object') {
        var bw = g.bloqueia.w || 80;
        var bh = g.bloqueia.h || 28;
        out.push({ x: v.x - bw / 2 + (g.bloqueia.dx || 0),
                   y: v.y - bh + (g.bloqueia.dy || 0), w: bw, h: bh });
      } else {
        out.push(caixaPes(v.x, v.y, charDef(g.ch)));
      }
    }

    for (i = 0; i < (s.portas || []).length; i++) {
      var d = s.portas[i];
      if (jogo.abertas[chaveDeSala(s.id, d.id)]) { continue; }
      out.push({ x: d.x, y: d.y, w: d.w, h: d.h });
    }
    return out;
  }

  /* O movel bloqueia so a faixa de baixo, na proporcao declarada no
     manifesto: uma estante barra inteira, uma escrivaninha nao barra a
     tampa. Sem imagem, o motor usa a medida declarada no mapa. */
  /* O fator de escala do movel: do manifesto, e a instancia do mapa pode
     sobrescrever. Ausente vale 1. Usado no desenho, na colisao e na
     ordem de profundidade - os tres tem de ler o mesmo numero, senao a
     caixa que barra passagem descola da imagem. */
  function escalaMovel(m) {
    var def = propDef(tipoMovel(m));
    var e = (m && m.escala !== undefined) ? m.escala
          : (def && def.escala !== undefined) ? def.escala : 1;
    e = Number(e);
    return (isFinite(e) && e > 0) ? e : 1;
  }

  /* Camada de desenho. Inteiro, padrao zero, ordena ANTES do `y`.

     Existe porque a ordem por `y` nao resolve objeto sobre objeto: um
     prato na mesa tem o pe no mesmo lugar da mesa e sairia por baixo
     dela. Empurrar o `y` do prato para baixo resolveria o desenho e
     estragaria a posicao.

     Vale para movel e para gente. Dentro da mesma camada o `y` continua
     mandando, entao nada do que ja esta ajustado muda. */
  function camadaDe(o) {
    var c = o && o.camada;
    if (c === undefined && o && o.tipo) {
      var def = propDef(o.tipo);
      if (def && def.camada !== undefined) { c = def.camada; }
    }
    c = Number(c);
    return isFinite(c) ? c : 0;
  }

  /* Giro do movel, em graus. Do manifesto, sobrescrito pela instancia. */
  function giroMovel(m) {
    var def = propDef(tipoMovel(m));
    var g = (m && m.giro !== undefined) ? m.giro
          : (def && def.giro !== undefined) ? def.giro : 0;
    g = Number(g);
    return isFinite(g) ? g : 0;
  }

  function caixaMovel(m) {
    var tipo = tipoMovel(m);
    var def = propDef(tipo);
    var im  = imgProp(tipo);
    var esc = escalaMovel(m);
    var w = ((im && im.naturalWidth)  ? im.naturalWidth  : (m.w || 96)) * esc;
    var h = ((im && im.naturalHeight) ? im.naturalHeight : (m.h || 96)) * esc;

    /* Com giro, a caixa e a envolvente alinhada aos eixos do retangulo
       girado. Exata em 0, 90, 180 e 270; folgada em angulo quebrado. A
       alternativa seria colisao por poligono, que mudaria o
       comportamento de tudo o que ja esta ajustado. */
    var g = giroMovel(m);
    if (g % 360 !== 0) {
      var rad = g * Math.PI / 180;
      var cs = Math.abs(Math.cos(rad)), sn = Math.abs(Math.sin(rad));
      var lw = w * cs + h * sn;
      var lh = w * sn + h * cs;
      w = lw; h = lh;
    }

    var base = def ? def.base : 1;
    if (m.base !== undefined) { base = m.base; }
    var hb = Math.max(8, h * base);
    return { x: m.x - w / 2, y: m.y - hb, w: w, h: hb };
  }

  function piso(s) {
    if (s.piso) {
      return { x: s.piso[0], y: s.piso[1],
               w: s.piso[2] - s.piso[0], h: s.piso[3] - s.piso[1] };
    }
    var lim = tamanhoSala(s);
    return { x: 0, y: 0, w: lim.w, h: lim.h };
  }

  function livre(s, cx, cy, def) {
    var caixa = caixaPes(cx, cy, def);
    var ch = piso(s);

    if (caixa.x < ch.x || caixa.y < ch.y) { return false; }
    if (caixa.x + caixa.w > ch.x + ch.w) { return false; }
    if (caixa.y + caixa.h > ch.y + ch.h) { return false; }

    var b = barreiras(s);
    for (var i = 0; i < b.length; i++) {
      if (cruza(caixa, b[i])) { return false; }
    }
    return true;
  }

  /* Anda em um eixo por vez. E o que faz a personagem deslizar pela
     parede em vez de grudar nela quando anda na diagonal contra um
     canto - com o teste feito nos dois eixos de uma vez, encostar num
     batente cancela o movimento inteiro. */
  function move(ator, dx, dy, def) {
    var s = sala(jogo.sala);
    if (!s) { return; }
    if (dx && livre(s, ator.x + dx, ator.y, def)) { ator.x += dx; }
    if (dy && livre(s, ator.x, ator.y + dy, def)) { ator.y += dy; }
  }

  /* ---- camera ------------------------------------------------------------- */

  function camera() {
    var s = sala(jogo.sala);
    var lim = tamanhoSala(s);
    var lw = largura(), lh = altura();

    var cx = jogo.p.x - lw / 2;
    var cy = jogo.p.y - lh / 2;

    /* Sala menor que a tela: centraliza em vez de grudar no canto. */
    cx = (lim.w <= lw) ? (lim.w - lw) / 2 : Math.max(0, Math.min(lim.w - lw, cx));
    cy = (lim.h <= lh) ? (lim.h - lh) / 2 : Math.max(0, Math.min(lim.h - lh, cy));

    return { x: Math.round(cx), y: Math.round(cy) };
  }

  /* ==========================================================================
     CICLO
     ========================================================================== */

  function laco(t) {
    if (!rodando) { return; }
    quadro = requestAnimationFrame(laco);

    /* Medir a cada quadro em vez de ouvir 'resize': o palco tambem muda
       de tamanho quando o navegador troca de barra de endereco em
       telefone, e esse evento nao chega como resize em todo lugar. A
       conta e um getBoundingClientRect e so refaz canvas quando o
       numero muda de verdade. */
    mede();

    var dt = ultimo ? Math.min(0.05, (t - ultimo) / 1000) : 0;
    ultimo = t;

    passo(dt);
    desenha();
  }

  function passo(dt) {
    if (!dt) { return; }

    jogo.tempo += dt;

    if (jogo.fala) { passoFala(dt); return; }
    if (jogo.desfecho) { passoDesfecho(dt); return; }
    if (jogo.saindo) { return; }

    passoJogador(dt);
    passoRuido(dt);
    passoGente(dt);
    passoSaidas();
    passoTrilha();
  }

  /* ---- jogador ------------------------------------------------------------ */

  function passoJogador(dt) {
    var dx = 0, dy = 0;
    var porToque = false;

    if (teclas.esquerda) { dx -= 1; }
    if (teclas.direita)  { dx += 1; }
    if (teclas.cima)     { dy -= 1; }
    if (teclas.baixo)    { dy += 1; }

    /* No telefone, um toque e um destino, nao um passo de 220 ms. O
       teclado sempre tem precedencia e cancela o destino em aoBaixar(). */
    if (!dx && !dy && jogo.toque) {
      var tx = jogo.toque.x - jogo.p.x;
      var ty = jogo.toque.y - jogo.p.y;
      var td = Math.sqrt(tx * tx + ty * ty);
      if (td <= 10) {
        jogo.toque = null;
      } else {
        dx = tx / td;
        dy = ty / td;
        porToque = true;
      }
    }

    var quieto = !!teclas.silencio;
    var vel = quieto ? C().passoSilencioso : C().passo;

    if (dx && dy) {
      /* Diagonal com a mesma velocidade dos eixos. */
      var k = Math.SQRT1_2;
      dx *= k; dy *= k;
    }

    var andando = !!(dx || dy);
    jogo.p.andando = andando;
    jogo.p.quieto  = quieto;

    if (andando) {
      /* A direcao do sprite segue o eixo dominante. Trocar de folha a
         cada quadro numa diagonal produz tremor; o eixo dominante nao. */
      if (Math.abs(dx) > Math.abs(dy)) {
        jogo.p.dir = dx < 0 ? 'esquerda' : 'direita';
      } else {
        jogo.p.dir = dy < 0 ? 'cima' : 'baixo';
      }
      var antesX = jogo.p.x, antesY = jogo.p.y;
      move(jogo.p, dx * vel * dt, dy * vel * dt, charDef(jogo.p.ch));

      /* Destino dentro de parede ou movel: para depois de alguns quadros,
         em vez de fazer a personagem caminhar no lugar indefinidamente. */
      if (porToque) {
        if (jogo.p.x === antesX && jogo.p.y === antesY) {
          jogo.toque.bloqueado = (jogo.toque.bloqueado || 0) + dt;
          if (jogo.toque.bloqueado > 0.18) { jogo.toque = null; }
        } else {
          jogo.toque.bloqueado = 0;
        }
      }
      jogo.p.anim += dt * (quieto ? 3.4 : 6.2);
    } else {
      jogo.p.anim = 0;
    }
  }

  /* ---- ruido -------------------------------------------------------------- */

  /* Um numero so, que sobe com o passo e cai sozinho. O jogador nunca ve
     o valor: ve a trilha trocar e o vulto virar a cabeca. */
  function passoRuido(dt) {
    var r = C().ruido;
    var ganho = 0;
    if (jogo.p.andando) { ganho = jogo.p.quieto ? r.silencioso : r.andando; }

    jogo.ruido += ganho * dt;
    jogo.ruido -= r.decaimento * dt * (ganho ? 0.25 : 1);
    if (jogo.ruido < 0) { jogo.ruido = 0; }
    if (jogo.ruido > 6) { jogo.ruido = 6; }
  }

  /* ---- quem mais anda pela sala ------------------------------------------- */

  function passoGente(dt) {
    var s = sala(jogo.sala);
    if (!s || !s.gente) { return; }

    var perto = false;
    var lista = daFase(s.gente);

    for (var i = 0; i < lista.length; i++) {
      var g = lista[i];
      var v = estadoGente(s.id, indiceDe(s.gente, g), g);

      if (g.parado) { continue; }

      var d = dist(v, jogo.p);

      /*
        PASSIVO: anda, e so.

        A casa do primeiro ato fechou mais cedo; ela nao esta a espreita.
        Um empregado em ronda ali nao ouve, nao persegue e nao alcanca -
        ele cumpre o horario dele e passa. Sem esta faixa, a unica forma
        de por o Fenn em cena seria planta-lo parado, e empregado
        plantado num corredor as onze e quarenta le como manequim.

        E a existencia dele no primeiro ato que faz o corredor vazio do
        segundo custar alguma coisa.
      */
      if (g.passivo) {
        var alvoP = proximaRonda(g, v);
        if (alvoP) {
          var angP = Math.atan2(alvoP.y - v.y, alvoP.x - v.x);
          var vP = (g.passo || 52) * dt;
          var dxP = Math.cos(angP) * vP;
          var dyP = Math.sin(angP) * vP;
          if (Math.abs(dxP) > Math.abs(dyP)) {
            v.dir = dxP < 0 ? 'esquerda' : 'direita';
          } else {
            v.dir = dyP < 0 ? 'cima' : 'baixo';
          }
          move(v, dxP, dyP, charDef(g.ch));
          v.anim += dt * 3.6;
          v.andando = true;
          if (dist(v, alvoP) < 16) {
            v.ronda = ((v.ronda || 0) + 1) % Math.max(1, (g.ronda || []).length);
            /* Parada declarada no fim do trecho: `espera` em segundos. */
            if (g.espera) { v.pausa = g.espera; }
          }
        }
        if (v.pausa > 0) { v.pausa -= dt; v.andando = false; }
        continue;
      }

      /* Ouve. O alcance cresce com o ruido acumulado, e nao com a
         distancia sozinha: ficar parado no escuro funciona. */
      var alcance = (g.ouvido || 210) + jogo.ruido * 70;

      if (jogo.p.andando && d < alcance) {
        v.alvoX = jogo.p.x;
        v.alvoY = jogo.p.y;
        v.atento = Math.min(3.2, v.atento + dt * 1.6);
      } else {
        v.atento = Math.max(0, v.atento - dt * 0.7);
      }

      if (v.atento > 0.9) {
        perto = true;
        if (!v.avisou) {
          v.avisou = true;
          RBF.Audio.playSfx('sfx_cob_notada');
        }
      } else if (v.atento === 0) {
        v.avisou = false;
      }

      /* Anda para o alvo, ou volta a ronda declarada no mapa. */
      var destino = (v.atento > 0.9)
        ? { x: v.alvoX, y: v.alvoY }
        : proximaRonda(g, v);

      if (destino) {
        var ang = Math.atan2(destino.y - v.y, destino.x - v.x);
        var vel = (g.passo || 64) * (v.atento > 0.9 ? 1.35 : 1);
        var ndx = Math.cos(ang) * vel * dt;
        var ndy = Math.sin(ang) * vel * dt;

        if (Math.abs(ndx) > Math.abs(ndy)) {
          v.dir = ndx < 0 ? 'esquerda' : 'direita';
        } else {
          v.dir = ndy < 0 ? 'cima' : 'baixo';
        }
        move(v, ndx, ndy, charDef(g.ch));
        v.anim += dt * 4.4;

        if (dist(v, destino) < 14 && v.atento <= 0.9) {
          v.ronda = ((v.ronda || 0) + 1) % Math.max(1, (g.ronda || []).length);
        }
      }

      /* Encostou.

         Nao ha luta. O padrao dos perseguidores em ronda e RECUAR: ela
         volta ao refugio do segmento e leva a marca de ter sido vista.
         O desfecho de Carmine nao passa por esta regra: ela esta parada,
         declarada como ponto narrativo no salao. */
      if (d < (g.toque || 30) && !jogo.saindo && !jogo.recuando) {
        if (g.aoTocar) { encerra(g.aoTocar); return; }
        recua(g);
        return;
      }
    }

    jogo.perto = perto;
  }

  /* Foi alcancada. Volta ao refugio, perde o silencio e ganha a marca.
     A tela nao pisca em vermelho e nao ha contagem de vidas: o que ela
     perde e o proveito da noite. */
  function recua(g) {
    jogo.recuando = true;
    RBF.Audio.playSfx('sfx_cob_notada');

    var r = (segmento && segmento.refugio) || null;
    diz(g.aoRecuar || ['Ela nao viu o que era. Viu que estava perto.'], g, function () {
      /* Tudo que foi apurado depois da virada volta ao estado em que a
         linha foi encontrada. O caderno e a linha ficam; as descobertas
         feitas durante a caca precisam ser refeitas. */
      restauraCheckpoint();
      jogo.marcas.cob_vista = true;
      if (r) { vaiPara(r.sala, r.x, r.y, r.dir); }
      for (var k in jogo.atores) {
        if (Object.prototype.hasOwnProperty.call(jogo.atores, k)) {
          jogo.atores[k].atento = 0;
          jogo.atores[k].avisou = false;
        }
      }
      jogo.ruido = 0;
      jogo.toque = null;
      jogo.recuando = false;
      pintaHud();
    });
  }

  function criaCheckpoint() {
    jogo.checkpoint = {
      itens:   copia(jogo.itens),
      marcas:  copia(jogo.marcas),
      usados:  copia(jogo.usados),
      abertas: copia(jogo.abertas)
    };
  }

  function restauraCheckpoint() {
    var c = jogo && jogo.checkpoint;
    if (!c) { return; }
    jogo.itens   = copia(c.itens   || {});
    jogo.marcas  = copia(c.marcas  || {});
    jogo.usados  = copia(c.usados  || {});
    jogo.abertas = copia(c.abertas || {});
  }

  function proximaRonda(g, v) {
    if (!g.ronda || !g.ronda.length) { return null; }
    var p = g.ronda[(v.ronda || 0) % g.ronda.length];
    return { x: p[0], y: p[1] };
  }

  /* Indice na lista ORIGINAL, e nao na filtrada. A chave de estado do
     ator sai daqui: com o indice da lista filtrada, entrar na fase 1
     renumeraria todo mundo e o vulto herdaria a posicao de outro. */
  function indiceDe(lista, alvo) {
    for (var i = 0; i < (lista || []).length; i++) {
      if (lista[i] === alvo) { return i; }
    }
    return 0;
  }

  function estadoGente(idSala, i, g) {
    var k = chaveDeSala(idSala, 'g' + i);
    if (!jogo.atores[k]) {
      jogo.atores[k] = {
        x: g.x, y: g.y, dir: g.dir || 'baixo', anim: 0,
        ronda: 0, atento: 0, avisou: false, alvoX: g.x, alvoY: g.y,
        pausa: 0, andando: false
      };
    }
    return jogo.atores[k];
  }

  function dist(a, b) {
    var dx = a.x - b.x, dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /* ---- saidas ------------------------------------------------------------- */

  function passoSaidas() {
    var s = sala(jogo.sala);
    if (!s || !s.saidas) { return; }

    var c = caixaPes(jogo.p.x, jogo.p.y, charDef(jogo.p.ch));

    /* O vao e pintado do lado de fora do piso, e os pes param na borda
       do piso: testado justo, nenhuma saida chegava a disparar. A folga
       de 12 fecha o encosto sem alcancar a saida vizinha - a mais
       proxima, no corredor, esta a mais de quinhentos pixels. */
    var folga = 12;

    var lista = saidasDe(s);
    for (var i = 0; i < lista.length; i++) {
      var sa = lista[i];
      if (!cruza(c, { x: sa.x - folga, y: sa.y - folga,
                      w: sa.w + folga * 2, h: sa.h + folga * 2 })) { continue; }
      if (sa.exige && !jogo.itens[sa.exige]) {
        aviso(sa.recusa || 'Trancada.');
        return;
      }
      if (sa.exigeMarca && !jogo.marcas[sa.exigeMarca]) {
        aviso(sa.recusaMarca || sa.recusa || 'Nao passa.');
        return;
      }
      if (sa.encerra) { encerra(sa.encerra); return; }
      vaiPara(sa.para, sa.px, sa.py, sa.dir);
      return;
    }
  }

  function vaiPara(idSala, px, py, dir) {
    var s = sala(idSala);
    if (!s) { return; }
    /* Fala aberta nao atravessa porta: a legenda do bau ficaria na tela
       do corredor, falando de um movel que nao esta mais na sala. */
    if (jogo.fala) { jogo.fala = null; pintaFala(); }
    jogo.sala = idSala;
    jogo.p.x = px;
    jogo.p.y = py;
    if (dir) { jogo.p.dir = dir; }
    jogo.visitadas[idSala] = true;
    jogo.ruido = 0;
    preCarrega(idSala);
    RBF.Audio.playSfx('sfx_door');

    /* A trilha NAO se troca aqui.

       `passoTrilha()` e o dono unico dela: ele ja decide entre a faixa da
       sala e a de perseguicao, no quadro seguinte. Quando esta linha
       tambem tocava, saiam duas chamadas de `playBgm` em dois quadros -
       porque `vaiPara` nunca atualizava `jogo.bgm` - e a faixa anterior
       ficava tocando sem dono. Dois donos para o mesmo som e o defeito;
       sincronizar os dois seria remendo. */
  }

  /* ---- trilha ------------------------------------------------------------- */

  /* A unica notificacao de "tem alguma coisa aqui" e esta. Sem icone,
     sem barra, sem texto. */
  function passoTrilha() {
    var s = sala(jogo.sala);
    var querida = jogo.perto ? 'cob_perto' : ((s && s.bgm) || 'cob_percurso');
    if (jogo.bgm === querida) { return; }
    jogo.bgm = querida;
    RBF.Audio.playBgm(querida);
  }

  /* ==========================================================================
     INTERACAO
     ========================================================================== */

  /* O que esta ao alcance da mao, a frente. */
  function alvo() {
    var s = sala(jogo.sala);
    if (!s || !s.pontos) { return null; }

    var f = frente(jogo.p, 34);
    var melhor = null, md = 1e9;
    var lista = pontosDe(s);

    for (var i = 0; i < lista.length; i++) {
      var pt = lista[i];
      var d = Math.sqrt((pt.x - f.x) * (pt.x - f.x) + (pt.y - f.y) * (pt.y - f.y));
      /* 72, e nao 56: a mao fica 34 pixels a frente dos pes e o movel
         empurra a personagem para tras pela propria base. Com 56 sobrava
         uma faixa morta em qualquer peca funda, e o cilindro da camara
         caia inteiro dentro dela. */
      if (d > (pt.raio || 72)) { continue; }
      if (d < md) { md = d; melhor = pt; }
    }
    return melhor;
  }

  function frente(a, r) {
    if (a.dir === 'esquerda') { return { x: a.x - r, y: a.y - 8 }; }
    if (a.dir === 'direita')  { return { x: a.x + r, y: a.y - 8 }; }
    if (a.dir === 'cima')     { return { x: a.x, y: a.y - r }; }
    return { x: a.x, y: a.y + r * 0.6 };
  }

  function usa() {
    if (jogo.fala) { avancaFala(); return; }

    var pt = alvo();
    if (!pt) { return; }

    if (pt.exige && !jogo.itens[pt.exige]) {
      diz(pt.recusa || ['Nao abre.'], pt);
      return;
    }

    var chave = chaveDeSala(jogo.sala, pt.id);

    if (pt.uma && jogo.usados[chave]) {
      diz(pt.depois || pt.tx, pt);
      return;
    }
    jogo.usados[chave] = true;

    var marcaPendente = !!(pt.marca && pt.marcaAoFim);

    function aplicaMarca() {
      if (!pt.marca) { return; }
      jogo.marcas[pt.marca] = true;
      RBF.Audio.playSfx('sfx_cob_marca');
    }

    function conclui(depois) {
      return function () {
        if (marcaPendente) { aplicaMarca(); }
        if (depois) { depois(); }
      };
    }

    if (pt.item) {
      jogo.itens[pt.item] = true;
      RBF.Audio.playSfx('sfx_cob_achado');
      pintaHud();
    }
    if (pt.abre) {
      jogo.abertas[chaveDeSala(pt.abreSala || jogo.sala, pt.abre)] = true;
      RBF.Audio.playSfx('sfx_cob_destranca');
    }
    if (pt.marca && !marcaPendente) { aplicaMarca(); }
    if (pt.sfx) { RBF.Audio.playSfx(pt.sfx); }

    /* Vira o ato DEPOIS da fala, e nao antes: o texto que descreve a
       virada tem de ser lido com a casa ainda como era. */
    if (pt.viraFase) {
      diz(pt.tx, pt, conclui(function () { viraFase(pt.viraFase, pt.viraBgm); }));
      return;
    }
    if (pt.desfecho) {
      diz(pt.tx, pt, conclui(function () { iniciaDesfecho(pt); }));
      return;
    }
    if (pt.encerra) { diz(pt.tx, pt, conclui(function () { encerra(pt.encerra); })); return; }

    diz(pt.tx, pt, marcaPendente ? conclui(null) : null);
  }

  /* Carmine nao abre uma luta. A interacao tira o controle, toca os tres
     quadros entregues e encerra a leitura antes da porta do patio. */
  function iniciaDesfecho(pt) {
    if (!jogo || jogo.desfecho || jogo.saindo) { return; }
    soltaTudo();
    jogo.toque = null;
    jogo.p.andando = false;
    jogo.desfecho = {
      id: pt.desfecho,
      ataque: pt.ataque || null,
      oculta: 'carmine',
      x: pt.ataqueX === undefined ? pt.x : pt.ataqueX,
      y: pt.ataqueY === undefined ? pt.y : pt.ataqueY,
      tempo: 0,
      fechou: false
    };
    if (capa) { capa.classList.add('is-desfecho'); }
    RBF.Audio.playSfx('sfx_cob_notada');
    RBF.Audio.playBgm('cob_ultima');
  }

  function passoDesfecho(dt) {
    var d = jogo && jogo.desfecho;
    if (!d || d.fechou) { return; }
    d.tempo += dt;
    if (d.tempo >= 1.35) {
      d.fechou = true;
      encerra(d.id || 'carmine');
    }
  }

  /* ---- fala --------------------------------------------------------------- */

  /* Painel proprio, e nao a caixa da VN. A caixa da VN e conduzida pelo
     laco de beats do engine, que esta parado agora: reaproveita-la
     exigiria injetar beats num roteiro suspenso, e uma injecao dessas
     desalinha o beatIndex de todo save gravado depois. O texto entra no
     backlog assim mesmo - e o registro que importa, nao o elemento. */
  function diz(linhas, pt, aoFim) {
    if (!linhas) { linhas = []; }
    if (typeof linhas === 'string') { linhas = [linhas]; }
    if (!linhas.length) { if (aoFim) { aoFim(); } return; }

    jogo.fala = {
      linhas: linhas.slice(),
      i: 0,
      ch: (pt && pt.ch) || null,
      nome: (pt && pt.nome) || null,
      aoFim: aoFim || null,
      pronto: false,
      escrito: '',
      t: 0
    };
    registraFala(jogo.fala);
    pintaFala();
  }

  function registraFala(f) {
    var txt = f.linhas[f.i];
    if (!txt) { return; }
    var quem = f.ch || null;
    RBF.History.push(quem ? 'dial' : 'nar', quem, txt,
                     RBF.STATE.chapter, RBF.STATE.scene);
  }

  function passoFala(dt) {
    var f = jogo.fala;
    if (f.pronto) { return; }
    var alvoTxt = f.linhas[f.i] || '';
    var vel = RBF.CONFIG.text.typeSpeedMs;

    if (!vel) { f.escrito = alvoTxt; f.pronto = true; pintaFala(); return; }

    f.t += dt * 1000;
    var n = Math.floor(f.t / vel);
    if (n >= alvoTxt.length) {
      f.escrito = alvoTxt;
      f.pronto = true;
    } else {
      f.escrito = alvoTxt.slice(0, n);
    }
    pintaFala();
  }

  function avancaFala() {
    var f = jogo.fala;
    if (!f) { return; }
    if (!f.pronto) {
      f.escrito = f.linhas[f.i] || '';
      f.pronto = true;
      pintaFala();
      return;
    }
    f.i += 1;
    if (f.i >= f.linhas.length) {
      var fim = f.aoFim;
      jogo.fala = null;
      pintaFala();
      if (fim) { fim(); }
      return;
    }
    f.t = 0;
    f.escrito = '';
    f.pronto = false;
    registraFala(f);
    pintaFala();
  }

  /* ---- aviso curto -------------------------------------------------------- */

  var avisoTimer = null;

  function aviso(txt) {
    if (!hud) { return; }
    var el = hud.querySelector('.rf-perc__aviso');
    if (!el) { return; }
    el.textContent = txt;
    el.classList.add('is-on');
    if (avisoTimer) { clearTimeout(avisoTimer); }
    avisoTimer = setTimeout(function () { el.classList.remove('is-on'); }, 1600);
  }

  /* ==========================================================================
     DESENHO
     ========================================================================== */

  function desenha() {
    if (!ctx) { return; }

    var lw = largura(), lh = altura();
    var s = sala(jogo.sala);
    var cam = camera();

    if (!s) {
      ctx.fillStyle = '#05060a';
      ctx.fillRect(0, 0, lw, lh);
      return;
    }

    var c = cenaCtx || ctx;

    c.clearRect(0, 0, lw, lh);
    c.fillStyle = '#05060a';
    c.fillRect(0, 0, lw, lh);

    pintaCena(c, s, cam);

    /* Sem tela auxiliar - navegador que nao criou o segundo contexto -
       a cena ja esta no quadro e o que resta e escurecer as bordas. */
    if (!cenaCtx || !maskCtx) {
      desenhaEscuro(cam);
      desenhaMarca(s);
      desenhaDesfecho(cam);
      return;
    }

    compoe(cam, s);
    desenhaMarca(s);
    desenhaDesfecho(cam);
  }

  /* Desenha a cena inteira, sem luz, no contexto informado. */
  function pintaCena(c, s, cam) {
    desenhaChao(c, s, cam);

    /* Ordem por profundidade: quem esta mais abaixo na sala e desenhado
       depois e cobre quem esta acima. E o que faz o personagem sumir
       atras de uma estante sem precisar de camada declarada. */
    var fila = [];
    var i;

    var mv = daFase(s.moveis);
    for (i = 0; i < mv.length; i++) {
      fila.push({ y: mv[i].y, c: camadaDe(mv[i]), tipo: 'movel', dado: mv[i] });
    }
    var gt = daFase(s.gente);
    for (i = 0; i < gt.length; i++) {
      if (jogo.desfecho && gt[i].ch === jogo.desfecho.oculta) { continue; }
      var v = estadoGente(s.id, indiceDe(s.gente, gt[i]), gt[i]);
      fila.push({ y: v.y, c: camadaDe(gt[i]), tipo: 'ator',
                  dado: { ch: gt[i].ch, st: v, def: gt[i] } });
    }
    fila.push({ y: jogo.p.y, c: 0, tipo: 'ator',
                dado: { ch: jogo.p.ch, st: jogo.p, def: null } });

    /* Camada primeiro, `y` depois. Camada zero e o padrao, entao esta
       ordenacao e identica a anterior enquanto ninguem declarar camada. */
    fila.sort(function (a, b) {
      if (a.c !== b.c) { return a.c - b.c; }
      return a.y - b.y;
    });

    for (i = 0; i < fila.length; i++) {
      if (fila[i].tipo === 'movel') { desenhaMovel(c, fila[i].dado, cam); }
      else { desenhaAtor(c, fila[i].dado.ch, fila[i].dado.st, cam, fila[i].dado.def); }
    }

    desenhaPontos(c, s, cam);
  }

  /* ---- composicao ---------------------------------------------------------

     Tres passagens sobre a cena pronta:

       1. preto por baixo, para o que a vela nao alcanca ficar preto de
          verdade e nao cinza;
       2. a cena inteira em opacidade baixa - e o quanto o olho se
          acostuma no escuro, e o que impede que uma parede a dois metros
          seja indistinguivel do vazio;
       3. a cena recortada pelo degrade da vela, somada duas vezes.

     A soma e o ponto. Furar uma mascara nao acrescenta luz nenhuma: so
     deixa de tirar. Com arte de luminancia media 28 em 255 - que e a
     destas salas - deixar de tirar nao chega a lugar nenhum.          */

  function compoe(cam, s) {
    var lw = largura(), lh = altura();
    var v = C().vela;

    var x = Math.round(jogo.p.x - cam.x);
    var y = Math.round(jogo.p.y - cam.y) - 24;

    /* Tremor da chama. Amplitude pequena de proposito: a intencao e o
       desconforto, e nao o efeito. */
    var t = jogo.tempo;
    var tremor = Math.sin(t * 7.3) * 0.4 + Math.sin(t * 3.1) * 0.6;

    /* A vela encolhe com a tela. Sem isto, em telefone em retrato o
       raio de 150 pixels de mundo cobre a largura inteira do palco e o
       escuro deixa de existir - a mesma vela que ilumina um canto no
       monitor iluminava a sala toda no telefone. Raiz quadrada, e nao
       proporcao direta: proporcao direta deixa a poca de luz pequena
       demais para achar a porta. */
    var esc = Math.sqrt(Math.max(0.35, Math.min(1.6,
                Math.min(lw, lh) / 720)));

    var raio  = v.raio  * esc + tremor * v.tremor;
    var queda = v.queda * esc + tremor * v.tremor * 2;

    /* 1. mascara: a vela, mais o que a sala tiver de luz propria */
    maskCtx.globalCompositeOperation = 'source-over';
    maskCtx.clearRect(0, 0, lw, lh);
    pintaFoco(maskCtx, x, y, raio, queda, 1);

    maskCtx.globalCompositeOperation = 'lighter';
    var fontes = daFase(s.luzes);
    for (var n = 0; n < fontes.length; n++) {
      var f = fontes[n];
      /* Luz de sala nao treme: e maquina, e maquina que pisca e efeito. */
      pintaFoco(maskCtx,
                Math.round(f.x - cam.x), Math.round(f.y - cam.y),
                (f.raio || 120), (f.queda || (f.raio || 120) * 2.1),
                f.forca === undefined ? 0.8 : f.forca);
    }
    maskCtx.globalCompositeOperation = 'source-over';

    /* 2. recorte da cena pela mascara */
    luzCtx.globalCompositeOperation = 'source-over';
    luzCtx.clearRect(0, 0, lw, lh);
    luzCtx.drawImage(cena, 0, 0);
    luzCtx.globalCompositeOperation = 'destination-in';
    luzCtx.drawImage(mask, 0, 0);
    luzCtx.globalCompositeOperation = 'source-over';

    /* quadro */
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#04050a';
    ctx.fillRect(0, 0, lw, lh);

    ctx.globalAlpha = v.ambiente;
    ctx.drawImage(cena, 0, 0);

    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 1;
    for (var i = 0; i < v.ganho; i++) { ctx.drawImage(luz, 0, 0); }

    /* calor da chama, por ultimo e fraco */
    pintaCor(ctx, x, y, raio, '122,74,28', 0.20);

    /* e a cor de cada fonte de sala, se ela declarar uma */
    for (n = 0; n < fontes.length; n++) {
      if (!fontes[n].cor) { continue; }
      pintaCor(ctx,
               Math.round(fontes[n].x - cam.x), Math.round(fontes[n].y - cam.y),
               fontes[n].raio || 120, fontes[n].cor,
               fontes[n].tinta === undefined ? 0.16 : fontes[n].tinta);
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  }

  function desenhaChao(c, s, cam) {
    var im = imgMapa(s.mapa);
    var lim = tamanhoSala(s);

    if (im) {
      c.drawImage(im, -cam.x, -cam.y);
      return;
    }

    /* Piso: pedra chapada com junta, no lugar da imagem. A sala continua
       jogavel, e a colisao nao muda. */
    c.fillStyle = '#2a2630';
    c.fillRect(-cam.x, -cam.y, lim.w, lim.h);
    c.strokeStyle = 'rgba(150,140,150,.12)';
    c.lineWidth = 1;
    var g = C().grade * 2;
    for (var x = 0; x <= lim.w; x += g) {
      c.beginPath();
      c.moveTo(Math.round(x - cam.x) + 0.5, -cam.y);
      c.lineTo(Math.round(x - cam.x) + 0.5, lim.h - cam.y);
      c.stroke();
    }
    for (var y = 0; y <= lim.h; y += g) {
      c.beginPath();
      c.moveTo(-cam.x, Math.round(y - cam.y) + 0.5);
      c.lineTo(lim.w - cam.x, Math.round(y - cam.y) + 0.5);
      c.stroke();
    }
  }

  function desenhaMovel(c, m, cam) {
    var im = imgProp(tipoMovel(m));
    if (im) {
      var esc = escalaMovel(m);
      var lw = im.naturalWidth * esc, lh = im.naturalHeight * esc;
      var gir = giroMovel(m);
      if (gir % 360 !== 0) {
        /* Gira em torno da ancora: rodape, meio da largura. E o mesmo
           ponto que ordena profundidade e que a caixa usa, senao a arte
           sai de cima do proprio pe. */
        c.save();
        c.translate(Math.round(m.x - cam.x), Math.round(m.y - cam.y));
        c.rotate(gir * Math.PI / 180);
        c.drawImage(im, Math.round(-lw / 2), Math.round(-lh),
                    Math.round(lw), Math.round(lh));
        c.restore();
        return;
      }
      c.drawImage(im,
        Math.round(m.x - lw / 2 - cam.x),
        Math.round(m.y - lh - cam.y),
        Math.round(lw), Math.round(lh));
      return;
    }
    var w = m.w || 96, h = m.h || 96;
    c.fillStyle = 'rgba(58,46,42,.95)';
    c.fillRect(Math.round(m.x - w / 2 - cam.x), Math.round(m.y - h - cam.y), w, h);
    c.strokeStyle = 'rgba(170,140,90,.35)';
    c.strokeRect(Math.round(m.x - w / 2 - cam.x) + 0.5,
                 Math.round(m.y - h - cam.y) + 0.5, w - 1, h - 1);
  }

  function desenhaAtor(c, ch, st, cam, peca) {
    var def = charDef(ch);
    var im  = imgChar(ch);
    var fw = def ? def.fw : 48;
    var fh = def ? def.fh : 72;

    /* `desloca` sobe o desenho sem mexer no `y` que ordena a
       profundidade. Existe para quem nao esta no chao: a menina dentro
       do cilindro precisa ser desenhada DEPOIS do vidro - senao o vidro,
       que e chapado na arte, a esconde - e ao mesmo tempo dois metros
       acima do proprio pe. Sao duas coisas diferentes e ate aqui o
       motor tratava as duas pelo mesmo numero. */
    var desloca = (peca && peca.desloca) || 0;

    var px = Math.round(st.x - fw / 2 - cam.x);
    var py = Math.round(st.y - fh - cam.y) + desloca;

    /* Sombra. Segura a personagem no chao; sem ela ela flutua. */
    /* Quem nao pisa no chao nao faz sombra no chao. */
    if (peca && peca.semSombra) { c.save(); c.restore(); }
    else {
    c.save();
    c.globalAlpha = 0.34;
    c.fillStyle = '#000';
    c.beginPath();
    c.ellipse(Math.round(st.x - cam.x), Math.round(st.y - cam.y) - 3,
              fw * 0.26, fw * 0.10, 0, 0, Math.PI * 2);
    c.fill();
    c.restore();
    }

    if (!im) {
      c.fillStyle = (def && def.cor) || '#4a3038';
      c.fillRect(px + fw * 0.25, py + fh * 0.12, fw * 0.5, fh * 0.88);
      c.beginPath();
      c.arc(px + fw / 2, py + fh * 0.14, fw * 0.2, 0, Math.PI * 2);
      c.fill();
      return;
    }

    /* Tres quadros por direcao, na ida e na volta: 1 2 1 3. Um ciclo de
       0 1 2 sem o retorno da perna produz manqueira. */
    var ordem = [1, 0, 1, 2];
    var anda = st.andando === undefined ? false : st.andando;
    var col = anda ? ordem[Math.floor(st.anim) % 4] : 1;
    var lin = LADOS[st.dir] === undefined ? 0 : LADOS[st.dir];

    c.drawImage(im, col * fw, lin * fh, fw, fh, px, py, fw, fh);
  }

  /* Tres quadros, uma vez. A tela fecha antes que a falta de uma folha
     de queda obrigue o motor a improvisar um corpo com outra pose. */
  function desenhaDesfecho(cam) {
    if (!ctx || !jogo || !jogo.desfecho) { return; }
    var d = jogo.desfecho;
    var t = d.tempo;
    var def = charDef(d.ataque);
    var im = imgChar(d.ataque);

    if (t < 0.72) {
      if (im && def) {
        var quadroAtaque = t < 0.16 ? 0 : (t < 0.32 ? 1 : 2);
        ctx.drawImage(im,
          quadroAtaque * def.fw, 0, def.fw, def.fh,
          Math.round(d.x - def.fw / 2 - cam.x),
          Math.round(d.y - def.fh - cam.y), def.fw, def.fh);
      } else {
        desenhaAtor(ctx, 'carmine',
          { x:d.x, y:d.y, dir:'cima', anim:0, andando:false }, cam, null);
      }
    }

    if (t >= 0.28 && t < 0.48) {
      ctx.fillStyle = 'rgba(105,0,15,' + (0.44 - Math.abs(0.38 - t) * 2.2) + ')';
      ctx.fillRect(0, 0, largura(), altura());
    }
    if (t >= 0.42) {
      var preto = Math.min(1, (t - 0.42) / 0.58);
      ctx.fillStyle = 'rgba(0,0,0,' + preto + ')';
      ctx.fillRect(0, 0, largura(), altura());
    }
  }

  /* Marca do ponto de interacao: um losango pequeno, so quando esta ao
     alcance. Nada de contorno pulsante em tudo o que pode ser tocado -
     achar o que olhar e parte do percurso. */
  function desenhaPontos(c, s, cam) {
    var pt = alvo();
    if (!pt) { return; }
    var x = Math.round(pt.x - cam.x);
    var y = Math.round(pt.y - cam.y - (pt.alto || 40));
    var r = 6 + Math.sin(jogo.tempo * 3.2) * 1.2;

    c.save();
    c.translate(x, y);
    c.rotate(Math.PI / 4);
    c.strokeStyle = 'rgba(220,186,132,.95)';
    c.lineWidth = 1.8;
    c.strokeRect(-r, -r, r * 2, r * 2);
    c.restore();
  }

  /* A vela. Uma mascara escura por cima da sala inteira, com um buraco
     em degrade na posicao da personagem. `destination-out` faz o buraco
     de verdade, com borda, e nao um circulo mais claro pintado por
     cima. */
  function desenhaEscuro(cam) {
    var lw = largura(), lh = altura();
    var v = C().vela;

    var x = Math.round(jogo.p.x - cam.x);
    var y = Math.round(jogo.p.y - cam.y) - 24;

    /* Tremor da chama. Amplitude pequena de proposito: a intencao e o
       desconforto, nao o efeito. */
    var t = jogo.tempo;
    var tremor = Math.sin(t * 7.3) * 0.4 + Math.sin(t * 3.1) * 0.6;
    var raio  = v.raio  + tremor * v.tremor;
    var queda = v.queda + tremor * v.tremor * 2;

    ctx.save();
    ctx.fillStyle = 'rgba(3,4,7,.96)';
    ctx.fillRect(0, 0, lw, lh);

    ctx.globalCompositeOperation = 'destination-out';
    var g = ctx.createRadialGradient(x, y, 0, x, y, queda);
    g.addColorStop(0, 'rgba(0,0,0,1)');
    g.addColorStop(raio / queda, 'rgba(0,0,0,.82)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, queda, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    /* Calor da chama por cima, bem fraco. */
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    var q = ctx.createRadialGradient(x, y, 0, x, y, raio);
    q.addColorStop(0, 'rgba(120,74,30,.16)');
    q.addColorStop(1, 'rgba(120,74,30,0)');
    ctx.fillStyle = q;
    ctx.beginPath();
    ctx.arc(x, y, raio, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  /* Um foco na mascara. `forca` e quanto do centro fica opaco: 1 na
     vela, menos nas fontes de sala, que iluminam sem lavar. */
  function pintaFoco(c, x, y, raio, queda, forca) {
    var g = c.createRadialGradient(x, y, 0, x, y, queda);
    g.addColorStop(0, 'rgba(0,0,0,' + forca + ')');
    g.addColorStop(Math.max(0.02, Math.min(0.98, raio / queda)),
                   'rgba(0,0,0,' + (forca * 0.55) + ')');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g;
    c.beginPath();
    c.arc(x, y, queda, 0, Math.PI * 2);
    c.fill();
  }

  /* Cor por cima, em 'lighter'. E o que da temperatura a fonte sem
     mexer no que ela ilumina. */
  function pintaCor(c, x, y, raio, rgb, alfa) {
    var g = c.createRadialGradient(x, y, 0, x, y, raio);
    g.addColorStop(0, 'rgba(' + rgb + ',' + alfa + ')');
    g.addColorStop(1, 'rgba(' + rgb + ',0)');
    c.fillStyle = g;
    c.beginPath();
    c.arc(x, y, raio, 0, Math.PI * 2);
    c.fill();
  }

  /* Nome da sala no canto. Some depois de alguns segundos parada. */
  function desenhaMarca(s) {
    if (!hud) { return; }
    var el = hud.querySelector('.rf-perc__sala');
    if (!el) { return; }
    if (el.getAttribute('data-sala') !== s.id) {
      el.setAttribute('data-sala', s.id);
      el.textContent = s.nome || '';
      el.classList.add('is-on');
      setTimeout(function () {
        if (el.getAttribute('data-sala') === s.id) { el.classList.remove('is-on'); }
      }, 3200);
    }
  }

  /* ==========================================================================
     INTERFACE
     ========================================================================== */

  function pintaFala() {
    if (!fala) { return; }
    var f = jogo.fala;
    if (palco) {
      palco.classList.toggle('tem-fala', !!f);
      /* A caixa acompanha o ato: a arte da VN na fase 0, e a moldura
         crua depois da virada. */
      palco.classList.toggle('fase-1', jogo.fase >= 1);
    }
    if (!f) { fala.classList.remove('is-on'); return; }

    var nome = fala.querySelector('.rf-perc__nome');
    var txt  = fala.querySelector('.rf-perc__txt');
    var cara = fala.querySelector('.rf-perc__face');

    var quem = f.nome || (f.ch && RBF.CHARACTERS[f.ch] ? RBF.CHARACTERS[f.ch].name : '');
    nome.textContent = quem || '';
    nome.style.display = quem ? '' : 'none';
    txt.textContent = f.escrito;

    /* Sem `ch` declarado, quem observa e ela. O retrato padrao e o dela,
       do mesmo jeito que na VN a narracao em primeira pessoa continua
       sendo a voz da Antoniette. */
    var fim = imgFace(f.ch || 'antoniette');
    if (fim) {
      cara.style.backgroundImage = 'url("' + fim.src + '")';
      cara.classList.add('is-on');
    } else {
      cara.classList.remove('is-on');
      /* A face pode nao ter chegado ainda. `pintaFala()` so roda enquanto
         a maquina de escrever digita, entao sem esta volta a caixa
         ficaria sem retrato ate o fim da fala mesmo depois de a imagem
         carregar.

         So quando o retrato existe no manifesto. Fenn e Dara nao tem
         retrato declarado, e para eles `imgFace` devolve null sempre:
         sem esta condicao a fala inteira repintava a cada 120ms sem
         chance de mudar de estado. */
      if (typeof setTimeout === 'function' && faceDef(f.ch || 'antoniette')) {
        setTimeout(function () { if (jogo && jogo.fala === f) { pintaFala(); } }, 120);
      }
    }

    fala.classList.add('is-on');
  }

  function pintaHud() {
    if (!hud) { return; }
    var bolsa = hud.querySelector('.rf-perc__bolsa');
    if (!bolsa) { return; }

    bolsa.textContent = '';
    var icons = C().icons;
    var im = imgIcons();

    for (var k in jogo.itens) {
      if (!Object.prototype.hasOwnProperty.call(jogo.itens, k)) { continue; }
      if (!jogo.itens[k]) { continue; }

      var item = (segmento && segmento.itens && segmento.itens[k]) || {};
      var cel = document.createElement('span');
      cel.className = 'rf-perc__item';
      cel.title = item.nome || k;

      var n = icons ? icons.ordem.indexOf(item.icone) : -1;
      if (im && n >= 0) {
        var cx = (n % icons.cols) * icons.lado;
        var cy = Math.floor(n / icons.cols) * icons.lado;
        cel.style.backgroundImage = 'url("' + im.src + '")';
        cel.style.backgroundPosition = (-cx) + 'px ' + (-cy) + 'px';
        cel.style.backgroundSize = (icons.cols * icons.lado) + 'px ' +
                                   (icons.rows * icons.lado) + 'px';
      } else {
        cel.classList.add('is-texto');
        cel.textContent = (item.nome || k).charAt(0).toUpperCase();
      }
      bolsa.appendChild(cel);
    }
  }

  /* ==========================================================================
     ENTRADA
     ========================================================================== */

  var MAPA_TECLA = {
    ArrowLeft: 'esquerda', a: 'esquerda', A: 'esquerda',
    ArrowRight: 'direita',  d: 'direita',  D: 'direita',
    ArrowUp: 'cima',        w: 'cima',     W: 'cima',
    ArrowDown: 'baixo',     s: 'baixo',    S: 'baixo',
    Shift: 'silencio'
  };

  function aoBaixar(e) {
    if (!rodando) { return; }
    if (jogo && jogo.desfecho) { e.preventDefault(); return; }

    var t = MAPA_TECLA[e.key];
    if (t) {
      teclas[t] = true;
      if (jogo) { jogo.toque = null; }
      e.preventDefault();
      return;
    }

    if (e.key === ' ' || e.key === 'Enter' || e.key === 'e' || e.key === 'E') {
      e.preventDefault();
      RBF.Audio.unlock();
      usa();
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      if (RBF.Menu && RBF.Menu.openGameMenu) { RBF.Menu.openGameMenu(); }
    }
  }

  function aoSoltar(e) {
    var t = MAPA_TECLA[e.key];
    if (t) { teclas[t] = false; }
  }

  /* Toque e clique: anda ate onde tocou, e usa quando toca no que ja esta
     a frente. O destino continua ativo depois que o dedo sobe; no telefone
     um toque nao pode exigir uma sequencia de pequenos passos. */
  function aoTocar(e) {
    if (!rodando) { return; }
    if (jogo && jogo.desfecho) { if (e.cancelable) { e.preventDefault(); } return; }
    if (e.cancelable) { e.preventDefault(); }
    RBF.Audio.unlock();
    if (jogo.fala) { avancaFala(); return; }

    var r = cv.getBoundingClientRect();
    var ponto = (e.touches && e.touches[0]) || e;
    var x = (ponto.clientX - r.left) / r.width * largura();
    var y = (ponto.clientY - r.top) / r.height * altura();
    var cam = camera();

    var toque = { x: x + cam.x, y: y + cam.y, t: jogo.tempo, bloqueado: 0 };

    /* Tocar no que ja esta a frente age em vez de andar. */
    var pt = alvo();
    if (pt) {
      var d = Math.sqrt((pt.x - toque.x) * (pt.x - toque.x) +
                        (pt.y - toque.y) * (pt.y - toque.y));
      if (d < (pt.raio || 72)) { jogo.toque = null; usa(); return; }
    }
    andaPara(toque);
  }

  /* Destino continuo. Sem busca de caminho: ao encontrar obstaculo o laco
     para, e outro toque escolhe por onde contornar. */
  function andaPara(p) {
    if (!jogo || !p) { return; }
    jogo.toque = { x: p.x, y: p.y, t: jogo.tempo, bloqueado: 0 };
  }

  function soltaTudo() {
    teclas.esquerda = teclas.direita = teclas.cima = teclas.baixo = false;
  }

  function abreMenu(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (!rodando || (jogo && jogo.desfecho)) { return; }
    if (RBF.Menu && RBF.Menu.openGameMenu) { RBF.Menu.openGameMenu(); }
  }

  /* ==========================================================================
     CICLO DE VIDA
     ========================================================================== */

  function podeDesenhar() {
    if (typeof document === 'undefined') { return false; }
    var teste = document.createElement('canvas');
    return typeof teste.getContext === 'function' && !!teste.getContext('2d');
  }

  function chaveDeSala(idSala, id) { return idSala + ':' + id; }

  /* Uma peca de mapa vale nesta fase?

     Sem `fase` declarada, vale sempre. Com numero, vale a partir dele.
     Com 0, vale so enquanto a fase for 0 - e o jeito de fazer uma porta
     ABRIR no primeiro ato e TRANCAR no segundo sem escrever a sala duas
     vezes. */
  /* Um mesmo mapa serve a mais de um trecho jogado. Ponto sem `cenas`
     declaradas pertence a Cobertura, que foi o primeiro e por isso e o
     padrao - assim nenhum ponto ja escrito precisou ser marcado. */
  function naCena(p) {
    if (!p || !p.cenas) { return cenaAtual() === 'cob'; }
    for (var i = 0; i < p.cenas.length; i++) {
      if (p.cenas[i] === cenaAtual()) { return true; }
    }
    return false;
  }

  function cenaAtual() {
    return (jogo && jogo.cena) || (segmento && segmento.cena) || 'cob';
  }

  function naFase(p) {
    if (p && p.someComMarca && jogo && jogo.marcas[p.someComMarca]) {
      return false;
    }
    if (!p || p.fase === undefined || p.fase === null) { return true; }
    if (p.fase === 0) { return jogo.fase === 0; }
    return jogo.fase >= p.fase;
  }

  /* Filtra uma lista de pecas pela fase corrente. */
  function daFase(lista) {
    if (!lista) { return []; }
    var out = [];
    for (var i = 0; i < lista.length; i++) {
      if (naFase(lista[i])) { out.push(lista[i]); }
    }
    return out;
  }

  /* Os pontos de conferir, filtrados tambem por cena. Mobilia, gente e
     saidas nao passam por aqui: a casa e a mesma nos dois trechos, e o
     que muda e o que ela pensa ao conferir cada coisa. */
  function pontosDe(s) {
    var lista = daFase(s.pontos);
    var out = [];
    for (var i = 0; i < lista.length; i++) {
      if (naCena(lista[i])) { out.push(lista[i]); }
    }
    return out;
  }

  /* As saidas do trecho, filtradas por cena pelo mesmo criterio dos
     pontos. Para onde uma porta leva e decisao do trecho, e nao da
     casa: as sete saidas do corredor foram escritas para a Cobertura
     percorrer a casa inteira, e o trecho do Capitulo 3 acontece no
     corredor e so. */
  function saidasDe(s) {
    var lista = daFase(s.saidas);
    var out = [];
    for (var i = 0; i < lista.length; i++) {
      if (naCena(lista[i])) { out.push(lista[i]); }
    }
    return out;
  }

  /* Vira a chave do segundo ato. A troca e so de numero: quem redesenha
     a sala e o proprio laco, no quadro seguinte. */
  function viraFase(n, bgm) {
    if (jogo.fase >= n) { return; }
    jogo.fase = n;
    jogo.ruido = 0;
    criaCheckpoint();
    if (bgm) { jogo.bgm = bgm; RBF.Audio.playBgm(bgm); }
    else { jogo.bgm = null; }
    preCarrega(jogo.sala);
    pintaHud();
  }

  function estadoNovo(seg) {
    return {
      sala:      seg.entrada,
      p: {
        ch: seg.jogador || 'antoniette',
        x: seg.x, y: seg.y, dir: seg.dir || 'baixo',
        anim: 0, andando: false, quieto: false
      },
      itens:     {},
      marcas:    {},
      usados:    {},
      abertas:   {},
      visitadas: {},
      atores:    {},
      cena:      seg.cena || 'cob',
      fase:      0,
      ruido:     0,
      tempo:     0,
      perto:     false,
      bgm:       null,
      fala:      null,
      desfecho:  null,
      saindo:    false,
      recuando:  false,
      toque:     null,
      checkpoint:null
    };
  }

  /* Entra. `beat` e o beat do roteiro; `pronto` e chamado com o id da
     saida quando o percurso termina. */
  function entra(beat, pronto) {
    segmento = (RBF.COB_SEGMENTOS || {})[beat.id] || null;

    if (!segmento || !podeDesenhar()) {
      /* Sem segmento declarado ou sem canvas: resolve na hora com o que
         o beat prometeu. O roteiro segue igual. */
      if (pronto) { pronto(beat.padrao || 'passou', null); }
      return false;
    }

    terminou = pronto;
    jogo = estadoNovo(segmento);

    monta();
    preCarrega(jogo.sala);
    jogo.visitadas[jogo.sala] = true;

    RBF.State.set('percurso');
    liga();
    return true;
  }

  /* Volta de um save gravado dentro do percurso. */
  function retoma(beat, dados, pronto) {
    segmento = (RBF.COB_SEGMENTOS || {})[beat.id] || null;
    if (!segmento || !podeDesenhar() || !dados) { return entra(beat, pronto); }

    terminou = pronto;
    jogo = estadoNovo(segmento);

    jogo.fase      = dados.fase || 0;
    jogo.sala      = dados.sala || jogo.sala;
    jogo.p.x       = dados.x !== undefined ? dados.x : jogo.p.x;
    jogo.p.y       = dados.y !== undefined ? dados.y : jogo.p.y;
    jogo.p.dir     = dados.dir || jogo.p.dir;
    jogo.itens     = dados.itens     || {};
    jogo.marcas    = dados.marcas    || {};
    jogo.usados    = dados.usados    || {};
    jogo.abertas   = dados.abertas   || {};
    jogo.visitadas = dados.visitadas || {};
    jogo.checkpoint = copiaCheckpoint(dados.checkpoint);
    /* Save antigo, anterior ao custo da caca: o proprio estado carregado
       vira a base segura. Nao apaga descoberta feita antes da atualizacao. */
    if (jogo.fase >= 1 && !jogo.checkpoint) { criaCheckpoint(); }

    monta();
    preCarrega(jogo.sala);
    RBF.State.set('percurso');
    liga();
    return true;
  }

  function liga() {
    rodando = true;
    ultimo  = 0;
    teclas  = {};

    document.addEventListener('keydown', aoBaixar);
    document.addEventListener('keyup',   aoSoltar);
    cv.addEventListener('pointerdown', aoTocar);

    pintaHud();
    capa.classList.add('is-on');
    marcaPalco(true);
    /* Medir depois de acender: com a camada em visibility:hidden o
       palco devolve caixa zerada e o canvas nasceria no minimo. */
    mede();
    RBF.Audio.playBgm((sala(jogo.sala) || {}).bgm || 'cob_percurso');
    jogo.bgm = (sala(jogo.sala) || {}).bgm || 'cob_percurso';

    quadro = requestAnimationFrame(laco);
  }

  function desliga() {
    rodando = false;
    if (quadro) { cancelAnimationFrame(quadro); quadro = null; }
    document.removeEventListener('keydown', aoBaixar);
    document.removeEventListener('keyup',   aoSoltar);
    if (cv) {
      cv.removeEventListener('pointerdown', aoTocar);
    }
    if (capa) { capa.classList.remove('is-on', 'is-desfecho'); }
    marcaPalco(false);
  }

  /* A classe vive no palco, e nao no <html>: o percurso e uma camada de
     dentro do jogo, e um sinalizador no documento sobreviveria a uma
     partida encerrada no meio. */
  function marcaPalco(ligado) {
    var vn = document.getElementById('vn');
    if (vn && vn.classList) { vn.classList.toggle('tem-percurso', !!ligado); }
  }

  /* Sai. `saida` e o id que o roteiro vai ler. */
  function encerra(saida) {
    if (!jogo || jogo.saindo) { return; }
    jogo.saindo = true;

    var estado = serializa();
    var fim = terminou;
    terminou = null;

    setTimeout(function () {
      desliga();
      if (fim) { fim(saida, estado); }
    }, RBF.CONFIG.timing.percursoOutMs || 900);
  }

  function monta() {
    capa = document.getElementById('rf-percurso');
    if (!capa) { return; }
    cv    = document.getElementById('rf-perc-canvas');
    palco = capa.querySelector('.rf-perc__palco');
    hud   = capa.querySelector('.rf-perc__hud');
    fala  = capa.querySelector('.rf-perc__fala');
    menuBtn = capa.querySelector('.rf-perc__menu');
    if (menuBtn) { menuBtn.onclick = abreMenu; }

    if (!cv) { return; }

    ctx = cv.getContext ? cv.getContext('2d') : null;
    if (!ctx) { return; }

    cena = document.createElement('canvas');
    luz  = document.createElement('canvas');
    mask = document.createElement('canvas');
    cenaCtx = cena.getContext ? cena.getContext('2d') : null;
    luzCtx  = luz.getContext  ? luz.getContext('2d')  : null;
    maskCtx = mask.getContext ? mask.getContext('2d') : null;

    /* As tres andam juntas: sem uma delas a composicao nao fecha e o
       desenho volta ao caminho de mascara simples. */
    if (!cenaCtx || !luzCtx || !maskCtx) {
      cena = luz = mask = null;
      cenaCtx = luzCtx = maskCtx = null;
    }

    lw = lh = 0;
    mede();
  }

  /* ---- save --------------------------------------------------------------- */

  function serializa() {
    if (!jogo) { return null; }
    return {
      fase:      jogo.fase,
      sala:      jogo.sala,
      x:         Math.round(jogo.p.x),
      y:         Math.round(jogo.p.y),
      dir:       jogo.p.dir,
      itens:     copia(jogo.itens),
      marcas:    copia(jogo.marcas),
      usados:    copia(jogo.usados),
      abertas:   copia(jogo.abertas),
      visitadas: copia(jogo.visitadas),
      checkpoint:copiaCheckpoint(jogo.checkpoint)
    };
  }

  function copia(o) {
    var out = {};
    for (var k in o) {
      if (Object.prototype.hasOwnProperty.call(o, k)) { out[k] = o[k]; }
    }
    return out;
  }

  function copiaCheckpoint(c) {
    if (!c) { return null; }
    return {
      itens:   copia(c.itens   || {}),
      marcas:  copia(c.marcas  || {}),
      usados:  copia(c.usados  || {}),
      abertas: copia(c.abertas || {})
    };
  }

  /* Salvar so fora de fala: um save no meio de uma linha voltaria com a
     linha pela metade e sem quem a estava dizendo. */
  function podeSalvar() {
    return !!(jogo && !jogo.fala && !jogo.desfecho && !jogo.saindo);
  }

  function ativo() { return rodando; }

  /* O que o percurso apurou, para o roteiro ler.

     Devolve TODA marca declarada nos mapas, inclusive as que o jogador
     nao fez - essas com false. A diferenca importa: o engine grava o
     valor em RBF.STATE.flags, e `passes()` compara por igualdade
     estrita. Uma marca ausente ficaria `undefined`, e um beat escrito
     com `if:{ cob_livro:false }` - o resumo de quem passou depressa -
     nunca rodaria, porque undefined nao e false.

     Este modulo nao inventa nome nenhum: le os que estao em
     js/data/cob_mapas.js. */
  function marcas() {
    var out = {};
    var lista = RBF.COB_MAPAS || {};

    for (var id in lista) {
      if (!Object.prototype.hasOwnProperty.call(lista, id)) { continue; }
      var pontos = lista[id].pontos || [];
      for (var i = 0; i < pontos.length; i++) {
        if (pontos[i].marca) { out[pontos[i].marca] = false; }
      }
    }
    if (jogo) {
      for (var k in jogo.marcas) {
        if (Object.prototype.hasOwnProperty.call(jogo.marcas, k)) {
          out[k] = !!jogo.marcas[k];
        }
      }
    }
    return out;
  }
  function itens()  { return jogo ? copia(jogo.itens)  : {}; }

  function pausa() {
    if (!rodando) { return; }
    rodando = false;
    if (quadro) { cancelAnimationFrame(quadro); quadro = null; }
    soltaTudo();
    if (jogo) { jogo.toque = null; }
  }

  function volta() {
    if (rodando || !jogo || jogo.saindo) { return; }
    rodando = true;
    ultimo  = 0;
    quadro  = requestAnimationFrame(laco);
  }

  return {
    entra:      entra,
    retoma:     retoma,
    encerra:    encerra,
    serializa:  serializa,
    podeSalvar: podeSalvar,
    ativo:      ativo,
    marcas:     marcas,
    itens:      itens,
    pausa:      pausa,
    volta:      volta,

    /* expostos para o harness */
    _debug: {
      estado:     function () { return jogo; },
      segmento:   function () { return segmento; },
      tipoMovel:  tipoMovel,
      usa:        usa,
      andaPara:   andaPara,
      passoJogador: passoJogador,
      vaiPara:    vaiPara,
      /* O que o motor mostra na sala atual, depois de fase e cena.
         O harness precisa do resultado do filtro, e nao do mapa cru. */
      pontosVisiveis: function () {
        var s = jogo && sala(jogo.sala);
        return s ? pontosDe(s) : [];
      },
      saidasVisiveis: function () {
        var s = jogo && sala(jogo.sala);
        return s ? saidasDe(s) : [];
      },
      /* `gente` nao passa pelo filtro de cena de proposito: a casa e a
         mesma nos dois trechos. Isto existe para o teste poder conferir
         isso pelo motor, e nao repetindo a regra. */
      genteVisivel: function () {
        var s = jogo && sala(jogo.sala);
        return s ? daFase(s.gente) : [];
      },
      livre:      function (id, x, y) {
        var s = sala(id);
        return !!(s && jogo && livre(s, x, y, charDef(jogo.p.ch)));
      },
      podeDesenhar: podeDesenhar
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.Rpg; }
