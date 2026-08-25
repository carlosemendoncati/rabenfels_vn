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
    var mv = daFase(s.moveis), gt = daFase(s.gente), sd = daFase(s.saidas);
    for (i = 0; i < mv.length; i++) { imgProp(mv[i].tipo); }
    for (i = 0; i < gt.length; i++) { imgChar(gt[i].ch); }
    for (i = 0; i < sd.length; i++) {
      var d = sala(sd[i].para);
      if (d) { imgMapa(d.mapa); }
    }
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
  function caixaMovel(m) {
    var def = propDef(m.tipo);
    var im  = imgProp(m.tipo);
    var w = (im && im.naturalWidth)  ? im.naturalWidth  : (m.w || 96);
    var h = (im && im.naturalHeight) ? im.naturalHeight : (m.h || 96);
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

    if (teclas.esquerda) { dx -= 1; }
    if (teclas.direita)  { dx += 1; }
    if (teclas.cima)     { dy -= 1; }
    if (teclas.baixo)    { dy += 1; }

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
      move(jogo.p, dx * vel * dt, dy * vel * dt, charDef(jogo.p.ch));
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

      /* Ouve. O alcance cresce com o ruido acumulado, e nao com a
         distancia sozinha: ficar parado no escuro funciona. */
      var d = dist(v, jogo.p);
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

         Nao ha luta e nao ha morte. O padrao e RECUAR: ela volta ao
         refugio do segmento e leva a marca de ter sido vista. Morrer
         num percurso desta obra seria pedir para repetir vinte minutos
         de leitura, e o preco certo aqui e de informacao, nao de
         tempo. Uma peca que queira encerrar mesmo declara `aoTocar`. */
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
    jogo.marcas.cob_vista = true;
    RBF.Audio.playSfx('sfx_cob_notada');

    var r = (segmento && segmento.refugio) || null;
    diz(g.aoRecuar || ['Ela nao viu o que era. Viu que estava perto.'], g, function () {
      if (r) { vaiPara(r.sala, r.x, r.y, r.dir); }
      for (var k in jogo.atores) {
        if (Object.prototype.hasOwnProperty.call(jogo.atores, k)) {
          jogo.atores[k].atento = 0;
          jogo.atores[k].avisou = false;
        }
      }
      jogo.ruido = 0;
      jogo.recuando = false;
    });
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
        ronda: 0, atento: 0, avisou: false, alvoX: g.x, alvoY: g.y
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

    var lista = daFase(s.saidas);
    for (var i = 0; i < lista.length; i++) {
      var sa = lista[i];
      if (!cruza(c, { x: sa.x - folga, y: sa.y - folga,
                      w: sa.w + folga * 2, h: sa.h + folga * 2 })) { continue; }
      if (sa.exige && !jogo.itens[sa.exige]) {
        aviso(sa.recusa || 'Trancada.');
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
    if (s.bgm) { RBF.Audio.playBgm(s.bgm); }
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
    var lista = daFase(s.pontos);

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

    if (pt.item) {
      jogo.itens[pt.item] = true;
      RBF.Audio.playSfx('sfx_cob_achado');
      pintaHud();
    }
    if (pt.abre) {
      jogo.abertas[chaveDeSala(pt.abreSala || jogo.sala, pt.abre)] = true;
      RBF.Audio.playSfx('sfx_cob_destranca');
    }
    if (pt.marca) {
      jogo.marcas[pt.marca] = true;
      RBF.Audio.playSfx('sfx_cob_marca');
    }
    if (pt.sfx) { RBF.Audio.playSfx(pt.sfx); }

    /* Vira o ato DEPOIS da fala, e nao antes: o texto que descreve a
       virada tem de ser lido com a casa ainda como era. */
    if (pt.viraFase) {
      diz(pt.tx, pt, function () { viraFase(pt.viraFase, pt.viraBgm); });
      return;
    }
    if (pt.encerra) { diz(pt.tx, pt, function () { encerra(pt.encerra); }); return; }

    diz(pt.tx, pt);
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
    if (!cenaCtx || !maskCtx) { desenhaEscuro(cam); desenhaMarca(s); return; }

    compoe(cam, s);
    desenhaMarca(s);
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
      fila.push({ y: mv[i].y, tipo: 'movel', dado: mv[i] });
    }
    var gt = daFase(s.gente);
    for (i = 0; i < gt.length; i++) {
      var v = estadoGente(s.id, indiceDe(s.gente, gt[i]), gt[i]);
      fila.push({ y: v.y, tipo: 'ator', dado: { ch: gt[i].ch, st: v, def: gt[i] } });
    }
    fila.push({ y: jogo.p.y, tipo: 'ator', dado: { ch: jogo.p.ch, st: jogo.p, def: null } });

    fila.sort(function (a, b) { return a.y - b.y; });

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
    var im = imgProp(m.tipo);
    if (im) {
      c.drawImage(im,
        Math.round(m.x - im.naturalWidth / 2 - cam.x),
        Math.round(m.y - im.naturalHeight - cam.y));
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
    var col = st.andando ? ordem[Math.floor(st.anim) % 4] : 1;
    var lin = LADOS[st.dir] === undefined ? 0 : LADOS[st.dir];

    c.drawImage(im, col * fw, lin * fh, fw, fh, px, py, fw, fh);
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
    if (palco) { palco.classList.toggle('tem-fala', !!f); }
    if (!f) { fala.classList.remove('is-on'); return; }

    var nome = fala.querySelector('.rf-perc__nome');
    var txt  = fala.querySelector('.rf-perc__txt');
    var cara = fala.querySelector('.rf-perc__face');

    var quem = f.nome || (f.ch && RBF.CHARACTERS[f.ch] ? RBF.CHARACTERS[f.ch].name : '');
    nome.textContent = quem || '';
    nome.style.display = quem ? '' : 'none';
    txt.textContent = f.escrito;

    var fim = imgFace(f.ch);
    if (fim) {
      cara.style.backgroundImage = 'url("' + fim.src + '")';
      cara.classList.add('is-on');
    } else {
      cara.classList.remove('is-on');
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

    var t = MAPA_TECLA[e.key];
    if (t) { teclas[t] = true; e.preventDefault(); return; }

    if (e.key === ' ' || e.key === 'Enter' || e.key === 'e' || e.key === 'E') {
      e.preventDefault();
      RBF.Audio.unlock();
      usa();
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      if (RBF.Menu && RBF.Menu.openPause) { RBF.Menu.openPause(); }
    }
  }

  function aoSoltar(e) {
    var t = MAPA_TECLA[e.key];
    if (t) { teclas[t] = false; }
  }

  /* Toque e clique: anda para onde tocou, e usa quando toca no que esta
     a frente. Um alvo por toque, sem manche na tela - o palco e pequeno
     em telefone e um manche cobriria a sala. */
  function aoTocar(e) {
    if (!rodando) { return; }
    RBF.Audio.unlock();
    if (jogo.fala) { avancaFala(); return; }

    var r = cv.getBoundingClientRect();
    var ponto = (e.touches && e.touches[0]) || e;
    var x = (ponto.clientX - r.left) / r.width * largura();
    var y = (ponto.clientY - r.top) / r.height * altura();
    var cam = camera();

    jogo.toque = { x: x + cam.x, y: y + cam.y, t: jogo.tempo };

    /* Tocar no que ja esta a frente age em vez de andar. */
    var pt = alvo();
    if (pt) {
      var d = Math.sqrt((pt.x - jogo.toque.x) * (pt.x - jogo.toque.x) +
                        (pt.y - jogo.toque.y) * (pt.y - jogo.toque.y));
      if (d < (pt.raio || 72)) { usa(); return; }
    }
    andaPara(jogo.toque);
  }

  /* Passo unico na direcao do toque. Sem busca de caminho: a sala e uma
     caixa com moveis, e um passo por toque ja permite atravessar. */
  function andaPara(p) {
    var dx = p.x - jogo.p.x;
    var dy = p.y - jogo.p.y;
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) { return; }
    if (Math.abs(dx) > Math.abs(dy)) {
      teclas.esquerda = dx < 0; teclas.direita = dx > 0;
      teclas.cima = false; teclas.baixo = false;
    } else {
      teclas.cima = dy < 0; teclas.baixo = dy > 0;
      teclas.esquerda = false; teclas.direita = false;
    }
    setTimeout(soltaTudo, 220);
  }

  function soltaTudo() {
    teclas.esquerda = teclas.direita = teclas.cima = teclas.baixo = false;
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
  function naFase(p) {
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

  /* Vira a chave do segundo ato. A troca e so de numero: quem redesenha
     a sala e o proprio laco, no quadro seguinte. */
  function viraFase(n, bgm) {
    if (jogo.fase >= n) { return; }
    jogo.fase = n;
    jogo.ruido = 0;
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
      fase:      0,
      ruido:     0,
      tempo:     0,
      perto:     false,
      bgm:       null,
      fala:      null,
      saindo:    false,
      recuando:  false,
      toque:     null
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
    cv.addEventListener('mousedown', aoTocar);
    cv.addEventListener('touchstart', aoTocar, { passive: true });

    pintaHud();
    capa.classList.add('is-on');
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
      cv.removeEventListener('mousedown', aoTocar);
      cv.removeEventListener('touchstart', aoTocar);
    }
    if (capa) { capa.classList.remove('is-on'); }
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
      visitadas: copia(jogo.visitadas)
    };
  }

  function copia(o) {
    var out = {};
    for (var k in o) {
      if (Object.prototype.hasOwnProperty.call(o, k)) { out[k] = o[k]; }
    }
    return out;
  }

  /* Salvar so fora de fala: um save no meio de uma linha voltaria com a
     linha pela metade e sem quem a estava dizendo. */
  function podeSalvar() { return rodando && jogo && !jogo.fala && !jogo.saindo; }

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

  function pausa() { rodando = false; }

  function volta() {
    if (!jogo || jogo.saindo) { return; }
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
      usa:        usa,
      vaiPara:    vaiPara,
      podeDesenhar: podeDesenhar
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.Rpg; }
