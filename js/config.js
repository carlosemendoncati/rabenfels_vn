/* ==========================================================================
   ARQUIVO RABENFELS - js/config.js
   Manifesto central do projeto.

   Todo caminho de asset, nome de personagem, cor de nameplate e id de
   audio vive AQUI e em nenhum outro lugar. O roteiro (js/data/*.js) usa
   apenas ids logicos. Trocar um placeholder por arte final = editar este
   arquivo, nada mais.

   Campo "available":
     false -> o engine NAO faz requisicao de rede para esse asset.
              Usa fallback (gradiente CSS / silhueta SVG / silencio).
     true  -> o engine carrega o arquivo real.

   Coloque o asset na pasta indicada e mude available para true.
   Comentarios em ASCII puro por seguranca de encoding.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

/* -------------------------------------------------------------------------
   1. CONFIGURACAO GERAL
   ------------------------------------------------------------------------- */

RBF.CONFIG = {
  /*
    Versao do jogo e versao do formato de save.

    gameVersion:
      Exibido nos creditos e gravado em cada save.

    saveSchemaVersion:
      Incrementar apenas quando o formato de save mudar de forma
      incompativel. Saves de versao diferente sao recusados com aviso.
  */
  gameVersion:       '0.14.0',

  /*
    Subiu para 2 na revisao 0.5.0. O formato do save nao mudou, mas o
    Prologo e o Capitulo 1 foram reescritos: um save antigo aponta para
    um beatIndex que agora cai em outra frase. Recusar com aviso e
    honesto; carregar no lugar errado nao seria.

    Subiu para 3 em 0.12.0, pelo mesmo motivo e nao por outro. O campo
    `percurso` que o save ganhou e compativel para tras - save antigo
    simplesmente nao tem, e o load segue pelo caminho de sempre. O que
    quebra e o Capitulo 10 da rota Cobertura, que ganhou beats no meio:
    quem tinha save ali reabriria em outra frase.

    Subiu para 4 em 0.13.0. O desfecho da Cobertura foi reescrito e os
    indices dos Capitulos 10 e 11 mudaram. Um save antigo dentro deles
    voltaria para uma cena de continuidade que deixou de existir.

    Subiu para 5 em 0.14.0. A revisao narrativa tornou o Epilogo
    especifico por rota e acrescentou a leitura falsa de "autoria
    falecida" em Resposta. Como o roteiro e um vetor unico, esses beats
    deslocam saves das rotas seguintes mesmo quando sao condicionais.
  */
  saveSchemaVersion: 5,

  paths: {
    backgrounds:  'assets/backgrounds/',
    characters:   'assets/characters/',
    bgm:          'assets/audio/bgm/',
    sfx:          'assets/audio/sfx/',
    music:        'assets/audio/music/',
    uiSfx:        'assets/audio/ui/',
    ui:           'assets/ui/',
    placeholders: 'assets/placeholders/',

    /* "A Cobertura". Pasta propria porque o kit inteiro veio de uma vez
       e tem formato proprio - mapa de sala inteiro, folha de caminhada,
       grade de icone. Recortado de assets/A Cobertura/ por
       tools/cobertura_assets.py, que e o unico jeito de refazer. */
    cobMaps:   'assets/cobertura/maps/',
    cobProps:  'assets/cobertura/props/',
    cobChars:  'assets/cobertura/chars/',
    cobFaces:  'assets/cobertura/faces/',
    cobIcons:  'assets/cobertura/icons/'
  },

  audio: {
    enabled:   true,
    bgmVolume: 0.42,
    sfxVolume: 0.55,
    fadeMs:    900
  },

  text: {
    typeSpeedMs: 18,
    pauseMs:     600
  },

  /*
    Duracao das transicoes, em milissegundos.

    fadeMs <-> transicao de #fader
    cardMs <-> title-screen, chapter-screen e endchap-screen
    arcMs  <-> archive-box
    lastMs <-> last-box
  */
  timing: {
    fadeMs: 900,
    cardMs: 1000,
    arcMs:  350,
    lastMs: 500,

    /* Portao de abertura saindo de cena.        */
    gateMs: 520,
    /* Pagina escura atravessando entre telas. A cena troca aqui, no
       meio do trajeto, com o veu parado cobrindo a tela.   */
    sweepMs: 380,

    /* Saida da pagina "A Conta". Acompanha --rbf-panel-ms em
       css/tokens.css: o elemento so pode ser escondido depois de a
       transicao de opacidade terminar. */
    contaMs: 320,
    /* Duracao total do corte de tela, ponta a ponta. Acompanha o token
       --rbf-sweep de css/tokens.css; e o prazo que RBF.Motion usa para
       tirar a classe .is-sweeping.                          */
    sweepAnimMs: 900,
    /* Pausa no preto depois do ultimo beat, antes de o arquivo se
       fechar sozinho e voltar ao menu. Um clique encurta.  */
    endReturnMs: 2800,
    /* Tempo de ler a marca na escolha antes de
       a cena seguir. Maior quando uma rota muda. */
    choiceHoldMs:      380,
    choiceHoldRouteMs: 620,

    /* Percurso. A entrada e a saida sao mais longas que um fade de cena
       de proposito: e a troca de registro da obra, e o jogador precisa
       sentir que saiu de onde estava. */
    percursoInMs:  1400,
    percursoOutMs: 1100
  },

  stage: {
    width:  1280,
    height: 720
  },

  /*
    true:
      registra assets ausentes no console uma unica vez.

    false:
      funcionamento normal sem mensagens de depuracao.
  */
  debug: false
};

/* -------------------------------------------------------------------------
   2. PERSONAGENS

   name:
     Nome exibido na caixa de dialogo.

   color:
     Cor da nameplate.

   dir:
     Subpasta em assets/characters/.

   size:
     bust = personagem menor.
     full = personagem maior.

   available:
     false = nao tenta carregar os arquivos.
     true  = tenta carregar os sprites configurados.

   onMissing:
     placeholder = usa silhueta de seguranca.
     hide        = oculta o personagem.

   fallbackExpression:
     Expressao usada quando a expressao solicitada nao existe.

   sprites:
     id logico da expressao -> nome do arquivo.
   ------------------------------------------------------------------------- */

RBF.CHARACTERS = {
  matheo: {
    name: 'Matheo',
    color: '#9a8672',
    dir: 'matheo',

    /*
      Matheo usa full para ocupar mais espaco vertical e mostrar
      os ombros e o torso com maior destaque.
    */
    size: 'full',

    available: true,
    onMissing: 'placeholder',
    fallbackExpression: 'neutral',

    sprites: {
      neutral: 'matheo_neutral.png',
      read:    'matheo_read.png',
      hollow:  'matheo_hollow.png'
    }
  },

  antoniette: {
    name: 'Antoniette',
    color: '#c8a878',
    dir: 'antoniette',
    size: 'bust',

    available: true,
    onMissing: 'hide',
    fallbackExpression: 'neutral',

    sprites: {
      neutral:  'antoniette_neutral.png',
      warm:     'antoniette_warm.png',
      away:     'antoniette_away.png',
      soft:     'antoniette_soft.png',
      shaken:   'antoniette_shaken.png',
      guarded:  'antoniette_guarded.png'
    }
  },

  /* Folha de seis expressoes cortada em 27/07/2026. 'warm' e para o
     cavalo e para o filho, os dois unicos assuntos que abrem nele. */
  fenn: {
    name: 'Fenn',
    color: '#7e756a',
    dir: 'fenn',
    size: 'bust',

    available: true,
    onMissing: 'placeholder',
    fallbackExpression: 'neutral',

    sprites: {
      neutral: 'fenn_neutral.png',
      guarded: 'fenn_guarded.png',
      side:    'fenn_side.png',
      grave:   'fenn_grave.png',
      warm:    'fenn_warm.png',
      lowered: 'fenn_lowered.png'
    }
  },

  serafina: {
    name: 'Serafina',
    color: '#a85a5a',
    dir: 'serafina',
    size: 'bust',

    available: true,
    onMissing: 'placeholder',
    fallbackExpression: 'neutral',

    sprites: {
      neutral:  'serafina_neutral.png',
      direct:   'serafina_direct.png',
      side:     'serafina_side.png',
      intense:  'serafina_intense.png',
      smirk:    'serafina_smirk.png',
      grave:    'serafina_grave.png'
    }
  },

  aldric: {
    name: 'Aldric',
    color: '#8f5d4a',
    dir: 'aldric',
    size: 'bust',

    available: true,
    onMissing: 'placeholder',
    fallbackExpression: 'cold',

    sprites: {
      cold:    'aldric_cold.png',
      side:    'aldric_side.png',
      back:    'aldric_back.png',
      intense: 'aldric_intense.png',
      fangs:   'aldric_fangs.png',
      stare:   'aldric_stare.png'
    }
  },

  dara: {
    name: 'Dara',
    color: '#a8896a',
    dir: 'dara',
    size: 'bust',

    available: false,
    onMissing: 'placeholder',
    fallbackExpression: 'neutral',

    sprites: {
      neutral: 'dara_neutral.png',
      guarded: 'dara_guarded.png'
    }
  },

  ren: {
    name: 'Ren',
    color: '#8fa88f',
    dir: 'ren',
    size: 'bust',

    available: false,
    onMissing: 'placeholder',
    fallbackExpression: 'neutral',

    sprites: {
      neutral: 'ren_neutral.png'
    }
  },

  /* Guardioes do pacto. Entram no Capitulo 4 e sempre em cena de ritual,
     onde o que importa e a voz do outro lado de uma porta fechada.
     Elsbeth e Cort ficam ocultos sem arquivo: dar silhueta a eles seria
     dar corpo a quem a obra so quer como som. Ines aparece em cena e
     usa placeholder. */
  elsbeth: {
    name: 'Elsbeth',
    color: '#8a8fa0',
    dir: 'elsbeth',
    size: 'bust',

    available: false,
    onMissing: 'hide',
    fallbackExpression: 'neutral',

    sprites: {
      neutral: 'elsbeth_neutral.png'
    }
  },

  cort: {
    name: 'Cort',
    color: '#7d7466',
    dir: 'cort',
    size: 'bust',

    available: false,
    onMissing: 'hide',
    fallbackExpression: 'neutral',

    sprites: {
      neutral: 'cort_neutral.png'
    }
  },

  ines: {
    name: 'Ines',
    color: '#9aa88f',
    dir: 'ines',
    size: 'bust',

    available: false,
    onMissing: 'placeholder',
    fallbackExpression: 'neutral',

    sprites: {
      neutral: 'ines_neutral.png'
    }
  },

  /* Carmine. E a entidade, e o nome verdadeiro dela. Nunca ganha sprite:
     Khar'Vel funciona por ausencia, e dar corpo a ela no Capitulo 11
     desfaria onze capitulos de ausencia calculada. Fica so o nome na
     caixa de fala - e o nome so aparece depois que Klara o pronuncia.
     Antes disso as linhas dela correm como narracao. */
  /* O rotulo que a entidade usa antes de ter nome. Existe para que a
     revelacao do Capitulo 11 aconteca na propria caixa de fala: as
     mesmas linhas passam de 'A voz' para 'Carmine' no instante em que
     Klara pronuncia o nome. Nunca ganha sprite. */
  /* O homem da rota de Alsbeck. Tres falas no Capitulo 11 e o gesto que
     abre o Prologo. Sem nome porque Antoniette nunca perguntou o dele. */
  mensageiro: {
    name: 'Mensageiro',
    color: '#8f8a7e',
    dir: 'mensageiro',
    size: 'bust',

    available: false,
    onMissing: 'hide',
    fallbackExpression: 'neutral',

    sprites: {
      neutral: 'mensageiro_neutral.png'
    }
  },

  voz: {
    name: 'A voz',
    color: '#8a8079',
    dir: 'voz',
    size: 'bust',

    available: false,
    onMissing: 'hide',
    fallbackExpression: 'neutral',

    sprites: {
      neutral: 'voz_neutral.png'
    }
  },

  carmine: {
    name: 'Carmine',
    color: '#b06a6a',
    dir: 'carmine',
    size: 'bust',

    available: false,
    onMissing: 'hide',
    fallbackExpression: 'neutral',

    sprites: {
      neutral: 'carmine_neutral.png'
    }
  },

  klara: {
    name: 'Klara',
    color: '#9ec4cc',
    dir: 'klara',
    size: 'full',

    /* As gemeas sao criancas: o proprio jogo diz, nas fichas de
       galeria ("a menina da casa", "uma crianca que corrige adultos").
       size:'full' pede o corpo inteiro no enquadramento; 'stature'
       diz o PORTE. Sem separar os dois, elas apareciam da altura de
       um adulto de pe ao lado de bustos. */
    stature: 'crianca',

    available: true,
    onMissing: 'placeholder',
    fallbackExpression: 'neutral',

    sprites: {
      neutral:  'klara_neutral.png',
      side:     'klara_side.png',
      away:     'klara_away.png',
      lowered:  'klara_lowered.png',
      blank:    'klara_blank.png',
      averted:  'klara_averted.png'
    }
  },

  liara: {
    name: 'Liara',
    color: '#7aa7d8',
    dir: 'liara',
    size: 'full',

    /* As gemeas sao criancas: o proprio jogo diz, nas fichas de
       galeria ("a menina da casa", "uma crianca que corrige adultos").
       size:'full' pede o corpo inteiro no enquadramento; 'stature'
       diz o PORTE. Sem separar os dois, elas apareciam da altura de
       um adulto de pe ao lado de bustos. */
    stature: 'crianca',

    available: true,
    onMissing: 'placeholder',
    fallbackExpression: 'neutral',

    sprites: {
      neutral:  'liara_neutral.png',
      bright:   'liara_bright.png',
      away:     'liara_away.png',
      sulk:     'liara_sulk.png',
      flat:     'liara_flat.png',
      worried:  'liara_worried.png'
    }
  }
};

/* -------------------------------------------------------------------------
   3. BACKGROUNDS

   css:
     Gradiente utilizado como fallback.

   file:
     Nome do arquivo de imagem.

   available:
     false = usa somente o gradiente.
     true  = tenta carregar a imagem real.
   ------------------------------------------------------------------------- */

RBF.BACKGROUNDS = {
  bg_prologue_room: {
    file: 'bg_prologue_room.png',
    available: true,
    css: 'radial-gradient(ellipse at 78% 88%, #2a1a08 0%, #110d06 40%, #050302 100%)'
  },

  bg_archive_closeup: {
    file: 'bg_archive_closeup.png',
    available: true,
    css: 'radial-gradient(ellipse at 50% 72%, #3a2712 0%, #180f07 45%, #060403 100%)'
  },

  bg_grey_march_road: {
    file: 'bg_grey_march_road.png',
    available: true,
    css: 'linear-gradient(175deg, #0d1520 0%, #1a2535 30%, #0f1825 60%, #060c12 100%)'
  },

  bg_nidhaus_gate: {
    file: 'bg_nidhaus_gate.png',
    available: true,
    css: 'radial-gradient(ellipse at 50% 108%, #12100e 0%, #0a0806 40%, #030202 100%)'
  },

  bg_main_hall: {
    file: 'bg_main_hall.png',
    available: true,
    css: 'radial-gradient(ellipse at 30% 78%, #1a1108 0%, #0d0a06 50%, #030202 100%)'
  },

  bg_antoniette_room: {
    file: 'bg_antoniette_room.png',
    available: true,
    css: 'radial-gradient(ellipse at 50% 100%, #0a0d15 0%, #060810 50%, #020203 100%)'
  },

  bg_library: {
    file: 'bg_library.png',
    available: true,
    css: 'radial-gradient(ellipse at 60% 58%, #1c1408 0%, #0e0b05 45%, #030202 100%)'
  },

  bg_corridor: {
    file: 'bg_corridor.png',
    available: true,
    css: 'linear-gradient(180deg, #030202 0%, #0c0806 50%, #050303 100%)'
  },

  /* Corredor de retratos entre a biblioteca e a ala leste. Nove
     geracoes penduradas em ordem. Capitulo 1, cena C6. */
  bg_portrait_hall: {
    file: 'bg_portrait_hall.png',
    available: true,
    css: 'linear-gradient(100deg, #050403 0%, #17110a 42%, #0b0806 72%, #030202 100%)'
  },

  bg_kitchen: {
    file: 'bg_kitchen.png',
    available: true,
    css: 'radial-gradient(ellipse at 40% 85%, #241a0e 0%, #120c06 45%, #050302 100%)'
  },

  bg_library_night: {
    file: 'bg_library_night.png',
    available: true,
    css: 'radial-gradient(ellipse at 62% 62%, #14100a 0%, #0a0805 45%, #020202 100%)'
  },

  /* Fundo do menu principal, entregue em 15/08/2026. O gradiente abaixo
     e o mesmo que #rf-menu-bg usava sozinho antes da foto existir -
     continua valendo como fallback enquanto a imagem carrega ou se
     available virar false. */
  /* DESLIGADO em 25/08/2026 porque o arquivo saiu do disco.

     Nada no runtime o usa como cena - o menu ficou com
     bg_archive_closeup, por decisao anterior registrada mais abaixo -
     e a entrada continua aqui de proposito, para a galeria e para nao
     perder a intencao. Mas com available:true o motor pediria um PNG que
     nao existe, e `validate.js` reprovava por isso.

     Repondo o arquivo em assets/backgrounds/, e so virar para true. */
  bg_menu_archive: {
    file: 'bg_menu_archive.png',
    available: false,
    css: 'radial-gradient(ellipse at 68% 52%, #241a10 0%, #100c09 42%, #07080c 100%)'
  },

  bg_black: {
    file: null,
    available: false,
    css: '#000000'
  }
};

/* -------------------------------------------------------------------------
   4. AUDIO

   files:
     Arquivos testados em ordem de preferencia.

   available:
     false = nenhuma requisicao.
     true  = tenta carregar os arquivos.

   loop:
     true para repeticao continua de BGM.
   ------------------------------------------------------------------------- */

RBF.BGM = {
  bgm_prologue: {
    files: ['bgm_prologue.mp3'],
    available: true,
    loop: true,
    volume: 0.32
  },

  bgm_archive: {
    files: ['bgm_archive.mp3'],
    available: true,
    loop: true,
    volume: 0.38
  },

  bgm_grey_march: {
    files: ['bgm_grey_march.mp3'],
    available: true,
    loop: true,
    volume: 0.40
  },

  bgm_nidhaus: {
    files: ['bgm_nidhaus.mp3'],
    available: true,
    loop: true,
    volume: 0.36
  },

  /* --- trilhas de 26/07/2026 -----------------------------------------
     Compostas para os capitulos 5 a 11 e para o Epilogo. Volume mais
     baixo que as quatro primeiras: sao faixas gravadas, nao sintetizadas
     por script, e chegam mais quentes. Ajustar aqui, nunca no roteiro. */

  /* A camara. Quase sem melodia, por pedido. O horror da sala e ela ser
     organizada, entao a trilha nao pode dramatizar. */
  bgm_camara: {
    files: ['bgm_camara.mp3'],
    available: true,
    loop: true,
    volume: 0.30
  },

  /* A unica faixa quente da obra. Nao pode ter press\u00e1gio nenhum: quem
     escuta nao pode ser avisado. O peso vem de o jogador saber o que
     vem depois. */
  bgm_amizade: {
    files: ['bgm_amizade.mp3'],
    available: true,
    loop: true,
    volume: 0.34
  },

  /* A cena pivo. Longa de proposito - atravessa o afloramento inteiro
     sem repetir. Nao entra em loop: se acabar antes, o silencio serve. */
  bgm_agosto: {
    files: ['bgm_agosto.mp3'],
    available: true,
    loop: false,
    volume: 0.34
  },

  /* Epilogo. Termina sem resolver, e por isso nao repete. */
  bgm_epilogo: {
    files: ['bgm_epilogo.mp3'],
    available: true,
    loop: false,
    volume: 0.32
  },

  /* --- "A COBERTURA": trilha do percurso -----------------------------
     Pack "Uneasy Melodies v1", de Serotone (Sebastian Petrei), licenca
     de uso livre inclusive comercial. Convertido de wav por
     tools/cobertura_assets.py. Creditos em assets/cobertura/CREDITOS.md.

     Volume mais baixo que o das faixas da VN: no percurso o som que
     importa e o passo e a porta, e a trilha nao pode cobrir os dois. */

  /* Andar pela casa. Sem ninguem por perto. */
  cob_percurso: {
    files: ['cob_percurso.mp3'],
    available: true,
    loop: true,
    volume: 0.26
  },

  /* Sala vazia, so ar. Entra onde nao ha nada a fazer alem de olhar. */
  cob_respiro: {
    files: ['cob_respiro.mp3'],
    available: true,
    loop: true,
    volume: 0.22
  },

  /* Ha alguma coisa no mesmo comodo. Troca por crossfade, sem aviso na
     tela: o jogador descobre pela trilha antes de descobrir pelo olho. */
  cob_perto: {
    files: ['cob_perto.mp3'],
    available: true,
    loop: true,
    volume: 0.30
  },

  /* Conferir papel. A unica coisa que ela sabe fazer bem. */
  cob_conferencia: {
    files: ['cob_conferencia.mp3'],
    available: true,
    loop: true,
    volume: 0.24
  },

  /* O forro. Onde o caderno fica e onde nada entra. */
  cob_forro: {
    files: ['cob_forro.mp3'],
    available: true,
    loop: true,
    volume: 0.24
  },

  /* O mesmo forro, depois. Mesma duracao, mesma melodia, afinacao
     errada - e por isso que a peca existe em duas versoes no pack. */
  cob_forro_ruim: {
    files: ['cob_forro_ruim.mp3'],
    available: true,
    loop: true,
    volume: 0.24
  },

  /* Ultimo trecho do percurso. Nao repete. */
  cob_ultima: {
    files: ['cob_ultima.mp3'],
    available: true,
    loop: false,
    volume: 0.28
  }
};

RBF.MUSIC = {
  /* "O Arquivo Me Chamou" - trilha final do menu, entregue pelo autor em
     27/07/2026. Substitui o tema sintetizado por tools/make_menu_theme.py,
     que ficou guardado em _backup/pre_menu_theme_20260727/.

     O .ogg gerado foi removido de proposito: ele vinha PRIMEIRO na lista
     e teria vencido a musica de verdade em todo navegador que le ogg. */
  menu_theme: {
    files: [
      'menu_theme.mp3'
    ],
    available: true,
    loop: true,
    volume: 0.70
  }
};

/* Sons de interface. Curtos, discretos. Falha silenciosa: a interface
   funciona por inteiro sem nenhum deles. */
RBF.UI_SFX = {
  ui_hover:        { files: ['ui_hover.ogg'],        available: true, volume: 0.30 },
  ui_confirm:      { files: ['ui_confirm.ogg'],      available: true, volume: 0.45 },
  ui_back:         { files: ['ui_back.ogg'],         available: true, volume: 0.40 },
  ui_page:         { files: ['ui_page.ogg'],         available: true, volume: 0.40 },
  ui_seal:         { files: ['ui_seal.ogg'],         available: true, volume: 0.50 },
  ui_archive_open: { files: ['ui_archive_open.ogg'], available: true, volume: 0.60 },
  ui_route:        { files: ['ui_route.ogg'],        available: true, volume: 0.35 }
};

RBF.SFX = {
  sfx_package: {
    files: ['sfx_package.ogg', 'sfx_package.wav'],
    available: true,
    volume: 0.55
  },

  sfx_page_turn: {
    files: ['sfx_page_turn.ogg', 'sfx_page_turn.wav'],
    available: true,
    volume: 0.45
  },

  sfx_candle: {
    files: ['sfx_candle.ogg', 'sfx_candle.wav'],
    available: true,
    volume: 0.60
  },

  sfx_door: {
    files: ['sfx_door.ogg', 'sfx_door.wav'],
    available: true,
    volume: 0.55
  },

  sfx_footsteps: {
    files: ['sfx_footsteps.ogg', 'sfx_footsteps.wav'],
    available: true,
    volume: 0.45
  },

  sfx_wind: {
    files: ['sfx_wind.ogg', 'sfx_wind.wav'],
    available: true,
    volume: 0.40
  },

  /* --- "A COBERTURA" -------------------------------------------------
     Os tres primeiros sao do pack Uneasy Melodies; os dois ultimos, do
     Fantasy UI SFX de Atelier Magicae. Trocar o som e trocar o numero
     de origem em tools/cobertura_assets.py e rodar de novo. */

  /* Achou papel que serve. */
  sfx_cob_achado:   { files: ['cob_achado.ogg'],   available: true, volume: 0.42 },

  /* Fechadura cedendo. */
  sfx_cob_destranca:{ files: ['cob_destranca.ogg'],available: true, volume: 0.46 },

  /* Foi notada. Toca uma vez por deteccao e nao se repete enquanto o
     vulto estiver no encalco - alarme em loop vira ruido e o jogador
     para de ouvir. */
  sfx_cob_notada:   { files: ['cob_notada.ogg'],   available: true, volume: 0.40 },

  /* Marcou uma sala como conferida. */
  sfx_cob_marca:    { files: ['cob_marca.ogg'],    available: true, volume: 0.34 },

  /* Escreveu no caderno. */
  sfx_cob_anota:    { files: ['cob_anota.ogg'],    available: true, volume: 0.38 }
};

/* -------------------------------------------------------------------------
   5. CAPITULOS

   Registro dos capitulos jogaveis, na ordem de execucao.

   id:
     Identificador estavel. Gravado em cada save. Nunca renomear.

   data:
     Nome da propriedade em RBF que contem o array de beats.

   label / title:
     Exibidos no cartao de capitulo, nos saves e na selecao de capitulo.

   selectable:
     true = aparece na selecao de capitulo depois de alcancado.
   ------------------------------------------------------------------------- */

RBF.CHAPTERS = [
  {
    id:    'prologo',
    code:  'PRL',
    data:  'PROLOGUE',
    label: 'Pr\u00f3logo',
    title: 'O Arquivo',
    selectable: true
  },

  {
    id:    'capitulo1',
    code:  'C-I',
    data:  'CHAPTER1',
    label: 'Cap\u00edtulo 1',
    title: 'A Chegada',
    selectable: true
  },

  {
    id:    'capitulo2',
    code:  'C-II',
    data:  'CHAPTER2',
    label: 'Cap\u00edtulo 2',
    title: 'O Invent\u00e1rio',
    selectable: true
  },

  {
    id:    'capitulo3',
    code:  'C-III',
    data:  'CHAPTER3',
    label: 'Cap\u00edtulo 3',
    title: 'As Duas Klara',
    selectable: true
  },

  {
    id:    'capitulo4',
    code:  'C-IV',
    data:  'CHAPTER4',
    label: 'Cap\u00edtulo 4',
    title: 'Os Rituais de Outubro',
    selectable: true
  },

  {
    id:    'capitulo5',
    code:  'C-V',
    data:  'CHAPTER5',
    label: 'Cap\u00edtulo 5',
    title: 'A C\u00e2mara',
    selectable: true
  },

  {
    id:    'capitulo6',
    code:  'C-VI',
    data:  'CHAPTER6',
    label: 'Cap\u00edtulo 6',
    title: 'Uma Amizade',
    selectable: true
  },

  {
    id:    'capitulo7',
    code:  'C-VII',
    data:  'CHAPTER7',
    label: 'Cap\u00edtulo 7',
    title: 'Agosto',
    selectable: true
  },

  {
    id:    'capitulo8',
    code:  'C-VIII',
    data:  'CHAPTER8',
    label: 'Cap\u00edtulo 8',
    title: 'O Que Ela N\u00e3o Deveria Saber',
    selectable: true
  },

  {
    id:    'capitulo9',
    code:  'C-IX',
    data:  'CHAPTER9',
    label: 'Cap\u00edtulo 9',
    title: 'A Decis\u00e3o',
    selectable: true
  },

  /* -----------------------------------------------------------------
     A PARTIR DAQUI A OBRA SE PARTE EM QUATRO.

     Ate o Capitulo 9 todo mundo le o mesmo texto e as escolhas mexem
     em graus. No fim do Capitulo 9 o beat { t:'rota' } fecha a conta e
     manda o jogador para UM dos quatro caminhos, e os quatro sao
     capitulos diferentes, e nao variantes do mesmo capitulo.

     O numero do capitulo se repete de proposito: existe um Capitulo 10
     em cada rota, e eles nao tem nada em comum. Quem joga de novo por
     outro caminho le um Capitulo 10 que nunca viu.

     'rota' amarra o capitulo ao caminho. O engine nao entra num
     capitulo cuja rota nao e a da partida, e a selecao de capitulos
     agrupa por esse campo.
     ----------------------------------------------------------------- */

  /* --- ESPERANCA: ela tenta. A rota mais curta, e a mais comum. --- */
  {
    id:    'esp10',
    code:  'C-X',
    data:  'ESP10',
    rota:  'esperanca',
    label: 'Cap\u00edtulo 10',
    title: 'A Fuga',
    selectable: true
  },
  {
    id:    'esp11',
    code:  'C-XI',
    data:  'ESP11',
    rota:  'esperanca',
    label: 'Cap\u00edtulo 11',
    title: 'Noventa Dias',
    selectable: true
  },

  /* --- RESPOSTA: ela documenta. Nao desce nenhuma noite. --- */
  {
    id:    'res10',
    code:  'C-X',
    data:  'RES10',
    rota:  'resposta',
    label: 'Cap\u00edtulo 10',
    title: 'O Registro',
    selectable: true
  },
  {
    id:    'res11',
    code:  'C-XI',
    data:  'RES11',
    rota:  'resposta',
    label: 'Cap\u00edtulo 11',
    title: 'A Entrada 214',
    selectable: true
  },
  {
    id:    'res12',
    code:  'C-XII',
    data:  'RES12',
    rota:  'resposta',
    label: 'Cap\u00edtulo 12',
    title: 'O Corredor',
    selectable: true
  },

  /* --- PERDA: a soma do que ela decidiu nao fazer. A mais longa. --- */
  {
    id:    'per10',
    code:  'C-X',
    data:  'PER10',
    rota:  'perda',
    label: 'Cap\u00edtulo 10',
    title: 'A Conta',
    selectable: true
  },
  {
    id:    'per11',
    code:  'C-XI',
    data:  'PER11',
    rota:  'perda',
    label: 'Cap\u00edtulo 11',
    title: 'As Tr\u00eas Moedas',
    selectable: true
  },
  {
    id:    'per12',
    code:  'C-XII',
    data:  'PER12',
    rota:  'perda',
    label: 'Cap\u00edtulo 12',
    title: 'A Volta',
    selectable: true
  },
  {
    id:    'per13',
    code:  'C-XIII',
    data:  'PER13',
    rota:  'perda',
    label: 'Cap\u00edtulo 13',
    title: 'O Que Ela Anotou',
    selectable: true
  },

  /* --- COBERTURA: Serafina encerra; Carmine impede a fuga. --- */
  {
    id:    'cob10',
    code:  'C-X',
    data:  'COB10',
    rota:  'cobertura',
    label: 'Cap\u00edtulo 10',
    title: 'A Porta',
    selectable: true
  },
  {
    id:    'cob11',
    code:  'C-XI',
    data:  'COB11',
    rota:  'cobertura',
    label: 'Cap\u00edtulo 11',
    title: 'A Baixa',
    selectable: true
  },

  {
    id:    'epilogo',
    code:  'EPL',
    data:  'EPILOGUE',
    label: 'Ep\u00edlogo',
    title: 'O Que Ficou',
    selectable: true
  }
];

/* -------------------------------------------------------------------------
   6. PERSISTENCIA

   Todas as chaves de localStorage do projeto vivem aqui. Nenhum outro
   arquivo pode inventar chave propria.

   slotCount:
     Numero de espacos manuais de save.

   autosaveOnScene:
     true = grava autosave a cada troca de cena.
   ------------------------------------------------------------------------- */

RBF.STORAGE = {
  keys: {
    saves:     'rbf_vn_saves_v1',
    autosave:  'rbf_vn_autosave_v1',
    quicksave: 'rbf_vn_quicksave_v1',
    settings:  'rbf_vn_settings_v1',
    progress:  'rbf_vn_progress_v1'
  },

  slotCount:       12,
  autosaveOnScene: true,

  /* Prefixo dos arquivos gerados por exportar save. */
  exportPrefix: 'rabenfels_save_'
};

/* -------------------------------------------------------------------------
   7. AJUSTES PADRAO

   Valores iniciais das configuracoes. O que o jogador alterar e gravado
   em RBF.STORAGE.keys.settings e sobrepoe estes valores.
   ------------------------------------------------------------------------- */

RBF.SETTINGS_DEFAULT = {
  /* Volume mestre. Multiplica trilha e efeitos. */
  masterVolume: 1,
  muted:        false,

  /* Movimento reduzido pelo jogador. O sistema operacional tambem pode
     pedir isso; qualquer um dos dois vale. */
  reducedMotion: false,

  /* HUD de Esperanca, Perda e Resposta durante a leitura. */
  showRoutes: true,

  /* Tela de aviso antes de um jogo novo. */
  contentWarning: true,

  /* 0 = texto instantaneo. Acima disso, ms por caractere. */
  typeSpeedMs: 18,

  /* false = desliga o efeito de maquina de escrever por completo. */
  typewriter: true,

  bgmVolume: 0.42,
  sfxVolume: 0.55,

  /* Avanco automatico depois que o texto termina de ser exibido. */
  autoAdvance:      false,
  autoAdvanceMs:    2200,

  /* Avanco rapido. 'unread' controla se o skip atravessa texto que o
     jogador ainda nao leu nesta partida. */
  skipMs:           38,
  skipUnread:       false,

  autosaveEnabled:  true,

  /* Confirmar antes de sobrescrever save e antes de sair para o titulo. */
  confirmDestructive: true,

  /* Escala do texto da caixa de dialogo. Multiplica o tamanho da faixa
     de tela atual, definido em css/tokens.css. 1 = tamanho de projeto.
     Era um px absoluto ate 0.5.0, e o px anulava a escala responsiva. */
  textScale: 1
};

/* -------------------------------------------------------------------------
   8. TEXTOS DE INTERFACE
   ------------------------------------------------------------------------- */

/* Barra de controle dentro da caixa de dialogo.
   'id' e resolvido em js/engine.js. */
RBF.DIALOGUE_CONTROLS = [
  { id: 'history',  label: 'Hist\u00f3rico', icon: 'rf-ic-history',  title: 'Hist\u00f3rico (H)' },
  { id: 'auto',     label: 'Auto',            icon: 'rf-ic-auto',     title: 'Avan\u00e7o autom\u00e1tico (A)' },
  { id: 'skip',     label: 'Skip',            icon: 'rf-ic-skip',     title: 'Avan\u00e7ar r\u00e1pido (Ctrl)' },
  { id: 'save',     label: 'Save',            icon: 'rf-ic-save',     title: 'Salvar (F5 grava r\u00e1pido)' },
  { id: 'load',     label: 'Load',            icon: 'rf-ic-load',     title: 'Carregar (F9 abre o r\u00e1pido)' },
  { id: 'settings', label: 'Ajustes',         icon: 'rf-ic-settings', title: 'Ajustes' },
  { id: 'hide',     label: 'Ocultar',         icon: 'rf-ic-hide',     title: 'Esconder interface' }
];

RBF.UI_TEXT = {
  archiveLabel: '\u2014 Arquivo Rabenfels \u2014',
  lastLabel:    '\u2014 \u00daltima Entrada \u2014',
  hintClick:    'CLIQUE OU ESPA\u00c7O',
  hintChoice:   'escolha: clique ou 1 / 2 / 3',
  /* {ultimo} e trocado pelo rotulo do ultimo capitulo registrado. */
  hintEnd:      'Fim do {ultimo} \u2014 o Arquivo continua',

  narrator:     'narra\u00e7\u00e3o',
  inner:        'pensamento',
  emptySlot:    'espa\u00e7o vazio',
  autosaveName: 'Autosave',
  quicksaveName:'Save r\u00e1pido'
};

/* -------------------------------------------------------------------------
   9. IDENTIDADE DO ARQUIVO

   Textos de cromo do menu principal. Ficam aqui para poderem ser
   traduzidos ou reescritos sem tocar em codigo.
   ------------------------------------------------------------------------- */

RBF.ARCHIVE = {
  access:   'ACESSO RESTRITO',
  dossier:  'RBF-001 / 46 FICHAS',
  volume:   'VOLUME XVII \u00b7 TESTEMUNHOS SELADOS',
  eyebrow:  'CODEX INTERDICTUS',
  latin:    'ARCHIVUM STIRPIS RABENFELS',
  title:    ['ARQUIVO', 'RABENFELS'],
  subtitle: 'os que abriram n\u00e3o voltaram a fechar',
  noteLabel:'NOTA DE MARGEM',

  /* ---- cartao de estado do arquivo ------------------------------------
     Rotulos do componente novo do menu principal. Ele le o save mais
     recente e o progresso persistido; quando nao ha nenhum dos dois, o
     cartao nao aparece em vez de mostrar zero em tudo. */
  cardTitle:     'ESTADO DO ARQUIVO',
  cardFootLabel: 'TEMPO EM LEITURA',

  /* Fundo do menu. Usa um background do manifesto, entao segue a mesma
     regra de todos: enquanto 'available' for false, so o gradiente.

     E o fundo original da obra, e continua sendo. A troca por
     bg_menu_archive (o fundo que veio no pacote de UI animada) foi
     revertida a pedido: a reestruturacao e da interface, nao da cena.
     bg_menu_archive segue registrado no manifesto e usavel na galeria,
     mas nao e o menu. */
  background: 'bg_archive_closeup',

  /* Numerais romanos dos registros do menu. */
  numerals: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'],

  /* ---- o menu depois que a obra foi terminada --------------------------
     Trocas pequenas, nenhuma comemoracao. O jogador que terminou nao
     ganha uma faixa de parabens: ganha um cabecalho que agora sabe de
     mais coisa do que sabia na primeira vez.

     'volume' e a mudanca que mais importa. Na primeira leitura diz
     TESTEMUNHOS SELADOS, porque nada foi aberto ainda. Depois diz o
     numero que o Prologo passou o capitulo inteiro fazendo o jogador
     contar: duzentas e noventa e uma, e nao duzentas e oitenta e sete.
     So faz sentido para quem chegou nas quatro paginas.               */
  sealed: {
    access:   'ARQUIVO ENCERRADO',
    volume:   'VOLUME XVII \u00b7 291 P\u00c1GINAS',
    subtitle: 'o conhecimento n\u00e3o foi suficiente'
  }
};

/* -------------------------------------------------------------------------
   10. PORTAO DE ABERTURA

   Primeira tela. Existe por dois motivos: o navegador so libera audio
   depois de uma interacao, e a entrada no arquivo deve ser um ato do
   jogador em vez de um carregamento automatico.
   ------------------------------------------------------------------------- */

RBF.INTRO = {
  enabled:        true,
  label:          'CLIQUE PARA ABRIR O ARQUIVO',
  hint:           'clique, toque, Enter ou Espa\u00e7o',

  /* Substitui 'hint' depois que a obra foi terminada. O prazo de noventa
     dias e o mecanismo que abre o Prologo e fecha o Capitulo 11; aqui ele
     vira a regra do proprio portao. Quem nao terminou nunca ve. */
  sealedHint:     'noventa dias \u00b7 o prazo recome\u00e7a a cada leitura',
  revealMs:       1800,   /* duracao da sequencia completa      */
  returnRevealMs: 260,    /* volta ao menu na mesma sessao      */

  /* Chave de sessao. Volta a aparecer em nova sessao do navegador. */
  sessionKey: 'rbf_archive_opened'
};

/* -------------------------------------------------------------------------
   11. AUDIO DO MENU
   ------------------------------------------------------------------------- */

RBF.MENU_AUDIO = {
  track:         'menu_theme',
  fadeInMs:      3000,
  fadeOutMs:     900,
  /* Reduz o volume quando a aba perde o foco, em vez de cortar. */
  hiddenFactor:  0.25
};

/* -------------------------------------------------------------------------
   12. REGISTROS DO MENU PRINCIPAL

   Cada entrada e uma ficha do codice. 'action' e resolvido em js/menu.js.
   'note' e a nota de margem exibida ao passar o foco.
   'needs' controla quando a entrada fica dispon\u00edvel:
     'save'     exige pelo menos um save valido
     'chapters' exige mais de um capitulo alcancado
     'gallery'  exige pelo menos um item de galeria liberado
   ------------------------------------------------------------------------- */

RBF.MENU_RECORDS = [
  {
    id:      'new',
    label:   'Novo Jogo',
    chapter: 'O PRIMEIRO TESTEMUNHO',
    code:    'REG-01',
    action:  'newGame',
    note:    'Abra um registro que nunca deveria ter existido.'
  },
  {
    id:      'continue',
    label:   'Continuar',
    chapter: 'RETOMAR LEITURA',
    code:    'REG-02',
    action:  'continue',
    needs:   'save',
    note:    'A p\u00e1gina onde a leitura parou continua marcada.'
  },
  {
    id:      'load',
    label:   'Carregar',
    chapter: 'FICHAS ARQUIVADAS',
    code:    'REG-03',
    action:  'load',
    note:    'Todo registro guardado pode ser aberto de novo.'
  },
  {
    id:      'chapters',
    label:   'Cap\u00edtulos',
    chapter: 'VOLUMES LIBERADOS',
    code:    'REG-04',
    action:  'chapters',
    needs:   'chapters',
    note:    'Apenas os volumes que voc\u00ea j\u00e1 alcan\u00e7ou.'
  },
  {
    id:      'gallery',
    label:   'Galeria / Extras',
    chapter: 'MATERIAL RECUPERADO',
    code:    'REG-05',
    action:  'gallery',
    note:    'O que foi recuperado do arquivo at\u00e9 agora.'
  },
  /* UM registro para os dois extras pos-jogo, com abas por dentro.

     Eram dois itens separados. Com eles o menu passou de oito registros
     para dez e deixou de caber na tela em telefone e em janela baixa -
     o jogador tinha de rolar um menu que sempre coube inteiro.

     'A Conta' e o nome certo: a obra inteira e alguem contando. Noventa
     e tres dias, duzentas e oitenta e sete paginas, faltam quatro, mil
     novecentos e quarenta e nove dias. */
  {
    id:      'pages',
    label:   'A Conta',
    chapter: 'O QUE FICOU DA LEITURA',
    code:    'REG-06',
    action:  'pages',
    needs:   'completed',
    note:    'O que as suas escolhas custaram, e a quem.'
  },
  {
    id:      'options',
    label:   'Ajustes',
    chapter: 'CONTROLE DE LEITURA',
    code:    'REG-07',
    action:  'options',
    note:    'Texto, \u00e1udio, movimento e conte\u00fado sens\u00edvel.'
  },
  {
    id:      'credits',
    label:   'Cr\u00e9ditos',
    chapter: 'REGISTRO DE AUTORIA',
    code:    'REG-08',
    action:  'credits',
    note:    'Quem construiu este arquivo.'
  },
  {
    id:      'close',
    label:   'Fechar o Arquivo',
    chapter: 'ENCERRAR SESS\u00c3O',
    code:    'REG-09',
    action:  'close',
    note:    'Algumas coisas podem permanecer com voc\u00ea.'
  }
];

/* -------------------------------------------------------------------------
   13. AVISO DE CONTEUDO

   Exibido antes de um jogo novo, a menos que o jogador tenha desligado
   nos ajustes.
   ------------------------------------------------------------------------- */

RBF.WARNING = {
  label: 'AVISO',
  title: 'LEIA ANTES DE ABRIR O ARQUIVO',
  body:  'Este registro cont\u00e9m viol\u00eancia, morte e experimenta\u00e7\u00e3o com ' +
         'menores, al\u00e9m de horror psicol\u00f3gico prolongado. Nada disso \u00e9 ' +
         'apresentado como espet\u00e1culo, mas tamb\u00e9m n\u00e3o \u00e9 suavizado.',
  tags:  [
    'Morte',
    'Horror psicol\u00f3gico',
    'Abuso institucional',
    'Experimenta\u00e7\u00e3o m\u00e9dica',
    'Dano envolvendo menor'
  ],
  footer: 'O aviso pode ser desligado em Ajustes \u00b7 Conte\u00fado.',
  accept: 'Compreendo',
  back:   'Voltar'
};

/* -------------------------------------------------------------------------
   14. ROTAS

   O documento mestre define tres eixos de escolha: investiga\u00e7\u00e3o,
   relacionamento e moral. As rotas abaixo sao a leitura desses eixos, e
   os valores vem exclusivamente das escolhas reais que o jogador fez.
   Nenhuma rota tem valor decorativo: o delta esta declarado em cada
   opcao de escolha nos arquivos de js/data/.

   max: quantidade de marcas exibidas no HUD.
   ------------------------------------------------------------------------- */

RBF.ROUTES = [
  {
    id:    'hope',
    label: 'Esperan\u00e7a',
    icon:  'rf-icon-hope',
    max:   20,
    note:  'Uma possibilidade foi preservada.',
    /* Proximidade. O documento mestre: momentos de ternura tornam o
       final mais devastador para quem os viveu. */
    hint:  'proximidade com quem est\u00e1 nesta casa'
  },
  {
    id:    'loss',
    label: 'Perda',
    icon:  'rf-icon-loss',
    max:   20,
    note:  'O arquivo registrou mais uma perda.',
    /* Custo moral: o que ela escolhe nao dizer, nao fazer, nao salvar. */
    hint:  'o custo do que ela decide n\u00e3o fazer'
  },
  {
    id:    'answer',
    label: 'Resposta',
    icon:  'rf-icon-answer',
    max:   20,
    note:  'Voc\u00ea chegou mais perto de uma resposta.',
    /* Investigacao: o que ela descobre e em que ordem. */
    hint:  'o que ela descobre e em que ordem'
  }
];

/* -------------------------------------------------------------------------
   15. CREDITOS
   ------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
   AS QUATRO ROTAS

   Ate o fim do Capitulo 9 a obra e uma so. Ali o beat { t:'rota' }
   fecha a conta e manda o jogador para UM dos quatro caminhos, cada um
   com capitulos proprios que nao existem nos outros.

   Isto substituiu nove finais que dividiam os mesmos tres capitulos por
   condicional. O motivo e simples: nove desfechos empilhados dentro de
   um Capitulo 10 unico produziam um capitulo que nao era de ninguem, e
   o jogador que repetia a obra relia 90% do mesmo texto. Quatro rotas
   com capitulos proprios dao a quem repete um capitulo que ele nunca
   viu, que e a promessa que uma segunda partida faz.

   COMO SE LE ESTA TABELA
   Avaliada NA ORDEM. A primeira que bate vence, e a ultima nao tem
   condicao: e o que acontece quando nenhum desvio ocorreu.

   Campos de 'when', todos opcionais e combinados por E:
     flag : nome de flag que precisa ser verdadeira
     min  : { eixo: valor minimo }
     max  : { eixo: valor maximo }

   DISTRIBUICAO MEDIDA nas 59.049 combinacoes de escolha - contada por
   `node tools/rotas.js`, nunca estimada. Este projeto ja perdeu uma
   producao inteira com limiar chutado: um final pedia Esperanca >= 14 E
   Resposta >= 14 num teto cruzado de 13, e nasceu inalcancavel.

     cobertura  11,1%     perda  ~13%     resposta  ~17%     esperanca  resto

   'ending' e o id do desfecho daquela rota. E um por rota, e a tabela
   de RBF.ENDINGS logo abaixo so acrescenta rotulo e nota - a decisao
   mora aqui, e em nenhum outro lugar.
   ------------------------------------------------------------------------- */

RBF.ROTAS = [
  {
    id:     'cobertura',
    label:  'A Cobertura',
    nome:   'A Cobertura Queimada',
    ending: 'cover_burned',
    /* Duas escolhas, e nas duas ela esta CERTA pelas regras da Ordem:
       relatou agosto na integra e remeteu o nome da antecessora com
       identificacao da fonte. Nidhaus le tudo o que entra e sai. */
    when:   { flag: 'cover_burned' },
    chapters: ['cob10', 'cob11'],
    nota:   'Ela acha a linha que a entregou. Carmine espera diante da porta e a mata antes da carruagem.'
  },

  {
    id:     'perda',
    label:  'A Perda',
    nome:   'A D\u00edvida',
    ending: 'divida',
    when:   { min: { loss: 11 } },
    chapters: ['per10', 'per11', 'per12', 'per13'],
    nota:   'A soma do que ela decidiu n\u00e3o fazer. \u00c9 a rota mais longa, e a \u00fanica em que a conta fecha.'
  },

  {
    id:     'resposta',
    label:  'A Resposta',
    nome:   'O Livro-Raz\u00e3o',
    ending: 'registro',
    when:   { min: { answer: 12 } },
    chapters: ['res10', 'res11', 'res12'],
    nota:   'Ela entende tudo e n\u00e3o desce nenhuma noite. O documento sai completo, e sair completo \u00e9 o pre\u00e7o.'
  },

  {
    id:     'esperanca',
    label:  'A Esperan\u00e7a',
    nome:   'O Arquivo',
    ending: 'arquivo',
    /* sem 'when': e o caminho padrao */
    chapters: ['esp10', 'esp11'],
    nota:   'Ela tenta. Chega mais longe do que qualquer pessoa em cinco s\u00e9culos, e volta a p\u00e9.'
  }
];

/* -------------------------------------------------------------------------
   OS QUATRO FINAIS

   Um por rota. O beat { t:'rota' } grava RBF.STATE.flags.rota e, junto,
   RBF.STATE.flags.ending com o campo 'ending' da rota escolhida.

   Nenhum final altera o destino da menina. Antoniette morre em tres das
   quatro leituras e vive em uma, e o que muda nao e isso: e
   QUANTO o jogador entendeu, e quanto custou entender.

   Steiner, no corpus: a tragedia nao admite compensos. Nenhum destes
   quatro pode pagar o jogador - nem com salvacao, nem com licao, nem
   com a satisfacao de ter jogado certo. Sobreviver, aqui, nao e premio.
   ------------------------------------------------------------------------- */

RBF.ENDINGS = [
  {
    id:    'cover_burned',
    rota:  'cobertura',
    label: 'A Cobertura Queimada',
    morre: true,
    note:  'Serafina encerra o contrato. Carmine mata Antoniette antes da fuga; o Arquivo sai incompleto, e Klara fica.'
  },
  {
    id:    'divida',
    rota:  'perda',
    label: 'A D\u00edvida',
    morre: true,
    note:  'A soma do que ela decidiu n\u00e3o fazer. Ela MORRE, e a \u00faltima p\u00e1gina \u00e9 uma coluna de valores que fecha.'
  },
  {
    id:    'registro',
    rota:  'resposta',
    label: 'O Livro-Raz\u00e3o',
    morre: false,
    note:  'Entendeu tudo e n\u00e3o pagou nada. Ela VIVE, o Arquivo sai completo e frio, e ningu\u00e9m nele tem nome.'
  },
  {
    id:    'arquivo',
    rota:  'esperanca',
    label: 'O Arquivo',
    morre: true,
    note:  'Chega mais longe do que qualquer outra rota, e volta a p\u00e9. Ela MORRE no prazo que Carmine deu.'
  }
];

RBF.CREDITS = [
  {
    title: 'Arquivo Rabenfels',
    lines: [
      'Visual Novel de horror psicol\u00f3gico e trag\u00e9dia',
      'Vers\u00e3o ' + RBF.CONFIG.gameVersion
    ]
  },

  {
    title: 'Universo, roteiro e dire\u00e7\u00e3o',
    lines: [
      'Constru\u00e7\u00e3o do universo Rabenfels, lore, personagens,',
      'mec\u00e2nica sobrenatural e a Balada das Filhas Rabenfels.'
    ]
  },

  {
    title: '\u00c1udio',
    lines: [
      'Tema do menu: "The Archive Pulls Me Near".',
      'Efeitos sonoros e sons de interface sintetizados para o projeto',
      'em tools/make_sfx.py. Sem material de terceiros.',
      'Trilha de cena: arquivos locais em assets/audio/bgm/.'
    ]
  },

  {
    title: 'Interface',
    lines: [
      'Identidade visual, cursor e composi\u00e7\u00e3o do arquivo',
      'a partir do prot\u00f3tipo aprovado do projeto.'
    ]
  },

  {
    title: 'Tecnologia',
    lines: [
      'JavaScript sem framework, sem build, sem depend\u00eancia externa.',
      'Executa direto do arquivo, sem servidor.'
    ]
  },

  {
    title: 'Refer\u00eancias de estilo',
    lines: [
      'The House in Fata Morgana, Umineko no Naku Koro ni,',
      'Saya no Uta, Higurashi no Naku Koro ni.'
    ]
  }
];

/* -------------------------------------------------------------------------
   16. ARTE DE INTERFACE (UI_ART)

   Cromo decorativo por cima de componentes que ja tem visual completo em
   CSS (gradiente, borda). Diferente de RBF.BACKGROUNDS, nao tem campo
   'css' de fallback por item: enquanto 'available' for false ou o
   arquivo falhar ao carregar, a camada de arte simplesmente nao aparece
   e o CSS do componente continua sozinho, sem gradiente vazio nem erro.

   Resolvido uma unica vez no boot por RBF.Assets.applyUiArtVars(), que
   escreve cada entrada como 'url(...)' numa custom property --rbf-art-*
   em css/tokens.css. E cromo estatico compartilhado por varios
   elementos e estados (:hover, painel aberto), por isso nao passa pelo
   mesmo caminho de RBF.Assets.applyBackground/applyCharacter, que
   resolvem por elemento a cada troca de cena.
   ------------------------------------------------------------------------- */

RBF.UI_ART = {
  /* Substituida por ui_panel_frame_gothic, que tem canto ornamentado de
     verdade e miolo usavel. A regra de CSS dela continua escrita como
     piso, mas com available:false a classe nunca entra e a regra nunca
     se aplica - o que evita baixar 1,7 MB para nada. Arquivo no disco. */
  ui_menu_panel:          { file: 'ui_menu_panel.png',          available: false },

  /* ---- caixa de dialogo: duas pecas, uma em uso ------------------------
     ui_dialogue_frame (entregue em 15/08/2026) e a moldura nova: fio de
     ouro fino, canto discreto, miolo liso. Substitui ui_dialogue_box na
     cena porque a peca antiga tem damasco e rosa-dos-ventos pintados no
     miolo, e miolo com desenho briga com o texto que corre por cima.

     ui_dialogue_box sai de cena e fica inativa - nada mais a consome,
     e mante-la ativa custaria 1,1 MB de download por nada. O arquivo
     continua no disco; voltar e trocar uma palavra. */
  /* Ambas substituidas por ui_dialogue_plate_leather, pelo mesmo motivo
     de ui_menu_panel: sao pisos que nunca chegam a aparecer. */
  ui_dialogue_frame:      { file: 'ui_dialogue_frame.png',      available: false },
  ui_dialogue_box:        { file: 'ui_dialogue_box.png',        available: false },

  /* Selo de cera: placa de nome de quem fala, na cena. Substitui a
     faixa carmesim SO no dialogo - a faixa continua no titulo dos
     paineis, onde o formato comprido serve melhor. */
  ui_name_seal_wax:       { file: 'ui_name_seal_wax.png',       available: true },

  /* Placa de pergaminho com fio de ouro. Vai nos cartoes que citam o
     Arquivo em cena (#archive-box e #last-box), que ate agora eram um
     retangulo preto com filete vermelho - o unico componente que ficou
     no visual antigo depois da reestruturacao.

     E a peca certa para eles pelo motivo mais simples: o que aparece
     ali e trecho de documento. Documento e papel. */
  ui_parchment_plate:     { file: 'ui_parchment_plate.png',     available: true },

  /* ---- entregues em 15/08/2026, terceira leva --------------------------
     ui_panel_frame_gothic (1199x1181) substitui ui_menu_panel nos
     paineis: tem canto ornamentado de verdade, em vez de borda rasgada,
     e o miolo e escuro TRANSLUCIDO - com 'fill' ele vira a superficie
     do painel sem precisar de cor por baixo.

     ui_dialogue_plate_leather (2172x403) substitui ui_dialogue_frame na
     cena: couro com latao e fio rubro. A proporcao de 5,4:1 e quase a
     da caixa de dialogo em monitor, entao a peca entra quase sem
     esticar - foi por isso que ela pode ser mais ornamentada que a
     anterior sem virar borrao.

     ui_ornament_quill_seal (865x1374) e a pena com o selo de cera. Nao
     e moldura: e assinatura. Vai no canto dos paineis e devolve a marca
     que se perdeu quando ui_menu_panel passou a entrar por border-image
     sem 'fill' - eu tinha registrado essa perda como limitacao, e esta
     peca resolve melhor do que a marca original resolvia. */
  ui_panel_frame_gothic:     { file: 'ui_panel_frame_gothic.png',     available: true },
  ui_dialogue_plate_leather: { file: 'ui_dialogue_plate_leather.png', available: true },
  ui_ornament_quill_seal:    { file: 'ui_ornament_quill_seal.png',    available: true },

  /* Janela de leitura de documento (1630x896).

     E a unica peca do pacote que NAO pode ser fatiada em nove: ela e
     assimetrica de proposito - aba de titulo no topo a esquerda, selo
     de cera com pena no topo a direita, canto chanfrado embaixo a
     direita, fitas so do lado esquerdo. Esticar qualquer borda destroi
     um ornamento diferente.

     Entra inteira, em proporcao nativa, e o conteudo rola por dentro. */
  ui_document_frame:         { file: 'ui_document_frame.png',         available: true },
  ui_divider_gold:        { file: 'ui_divider_gold.png',        available: true },
  ui_name_banner_crimson: { file: 'ui_name_banner_crimson.png', available: true },
  ui_menu_item_selected:  { file: 'ui_menu_item_selected.png',  available: true },
  fx_ink_slash:           { file: 'fx_ink_slash.png',           available: true },

  /* ui_route_progress_panel (720x1066, retrato) foi dado como sem lugar
     na primeira integracao, porque nao cabia na faixa de 30px do HUD de
     rotas em cena. O lugar dele nao era esse: a arte tem exatamente TRES
     linhas com losango a esquerda, fio no meio e losango a direita, mais
     uma tarja de rodape. E o desenho de um cartao de tres rotas com um
     numero embaixo - o cartao de dossie do menu principal, nao o HUD.

     Os tres sigilos (256x256, pintura) ficam nesse cartao a 34px, onde a
     pintura ainda le. O HUD em cena continua com o <symbol> SVG a 13px:
     ali a pintura perderia nitidez, e essa decisao nao mudou. */
  ui_route_progress_panel: { file: 'ui_route_progress_panel.png', available: true },
  route_hope:               { file: 'route_hope.png',   available: true },
  /* O id da rota e 'loss' (Perda) e esta gravado em save - nunca muda.
     O arquivo se chama 'death' porque veio assim nomeado no pacote. */
  route_loss:                { file: 'route_death.png',  available: true },
  route_answer:              { file: 'route_answer.png', available: true },

  /* Silhueta feminina de perfil, ja recortada com alfa por
     tools/pngtrim.js. Chegou sem nome de arquivo e sem destino.

     Fica INATIVA de proposito. A peca e uma personagem especifica - a
     Antoniette - e nao um enfeite generico: usar como "quem escuta" em
     qualquer cena poria o rosto dela em cena onde ela nao esta. Onde
     ela entra e decisao de roteiro, nao de interface, e nao vou
     escolher isso sozinho. O arquivo esta no lugar e o dia que a
     decisao vier e so virar para true. */
  ui_listener_silhouette:    { file: 'ui_listener_silhouette.png', available: false }
};

/* -------------------------------------------------------------------------
   17. "A COBERTURA" - MANIFESTO DO PERCURSO

   O percurso e o trecho jogado de cima, em canvas, dentro da rota
   Cobertura. Ele nao substitui a VN: entra por um beat do roteiro, roda,
   grava o que apurou em flags e devolve a leitura no beat seguinte.

   Tudo aqui e caminho de arquivo e medida. Nenhum nome de arquivo mora
   em js/rpg.js nem em js/data/cob_mapas.js - a mesma regra que ja vale
   para cenario e sprite da VN.

   Os arquivos sao recortados de assets/A Cobertura/ por
   tools/cobertura_assets.py. Rodar de novo depois de mexer no kit.

   available:false = o motor nao pede o arquivo e desenha o piso: retangulo
   de pedra para mapa, silhueta chapada para personagem, caixa para movel.
   O percurso e jogavel inteiro sem nenhuma imagem.
   ------------------------------------------------------------------------- */

RBF.COBERTURA = {
  /* Grade de colisao. O mapa e uma imagem inteira, e nao um tileset
     montado: a grade existe so para o roteiro descrever parede e movel
     em numero redondo em vez de pixel solto. */
  grade: 32,

  /* Passo em pixels por segundo. O valor baixo e proposital - a rota nao
     tem corrida, e a lentidao e o que faz a casa ficar grande. */
  passo:       152,
  passoSilencioso: 82,

  /* A vela.

       raio     onde a luz ainda e luz cheia, em pixels
       queda    onde ela acaba de vez
       tremor   amplitude da chama, em pixels
       ambiente quanto da cena aparece FORA do alcance da vela. Nao e
                zero de proposito: com zero, uma parede a dois metros
                fica identica ao vazio e o jogador anda as cegas em vez
                de andar no escuro. Sao coisas diferentes.
       ganho    quantas vezes a copia iluminada e somada. Dois porque a
                arte das salas veio com luminancia media de 28 em 255 -
                uma passagem so nao chega a nada legivel, tres estoura
                o ladrilho claro. */
  vela:  { raio: 190, queda: 430, tremor: 8, ambiente: 0.10, ganho: 2 },

  /* Quanto barulho cada modo de andar faz, por segundo. O vulto ouve a
     soma; ver js/rpg.js. */
  ruido: { andando: 1.0, silencioso: 0.18, parada: 0, decaimento: 1.4 },

  /* Personagens do percurso. `fw`/`fh` sao o quadro da folha de
     caminhada, 3 colunas por 4 linhas, na ordem herdada do formato de
     RPG: frente, esquerda, direita, costas.

     `pes` e a altura do retangulo de colisao medido do rodape para
     cima: o personagem colide pelos pes, nao pelo corpo inteiro, senao
     a cabeca bate na parede antes de o corpo chegar nela. */
  chars: {
    /* Com a vela na mao. O percurso inteiro e iluminado por ela e a
       folha anterior tinha as duas maos vazias. */
    antoniette: {
      file: 'antoniette.png', available: true,
      fw: 98, fh: 150, pes: 28, cor: '#6b1f28'
    },
    fenn: {
      file: 'fenn.png', available: true,
      fw: 90, fh: 150, pes: 28, cor: '#4f4540'
    },
    dara: {
      file: 'dara.png', available: true,
      fw: 90, fh: 150, pes: 28, cor: '#59483e'
    },
    klara: {
      file: 'klara.png', available: true,
      fw: 76, fh: 116, pes: 22, cor: '#8f8a84'
    },
    klara_casulo: {
      file: 'klara_casulo.png', available: true,
      fw: 76, fh: 116, pes: 22, cor: '#6d2026'
    },
    vulto: {
      file: 'vulto.png', available: true,
      fw: 108, fh: 162, pes: 26, cor: '#59151a'
    },
    carmine: {
      file: 'carmine.png', available: true,
      fw: 116, fh: 172, pes: 28, cor: '#7a1420'
    },
    /* Tres quadros para cima. E uma execucao narrativa, nunca um estado
       de combate nem uma acao disponivel ao jogador. */
    carmine_ataque: {
      file: 'carmine_ataque.png', available: true,
      fw: 116, fh: 172, pes: 28, cor: '#7a1420', cols: 3, rows: 1
    }
  },

  /* Retratos. Entram na faixa de fala do percurso, do lado do nome. */
  faces: {
    klara:        { file: 'klara.png',        available: true },
    klara_casulo: { file: 'klara_casulo.png', available: true },
    vulto:        { file: 'vulto.png',        available: true },
    carmine:      { file: 'carmine.png',      available: true }
  },

  /* Moveis. `base` e a fracao da altura, contada do rodape, que o
     personagem NAO atravessa: uma estante bloqueia inteira (1), uma
     escrivaninha so bloqueia a parte de baixo. `frente` decide se o
     movel e desenhado por cima do personagem quando ele passa atras. */
  props: {
    arquivo_gavetas: { file: 'arquivo_gavetas.png', available: true, base: 0.62 },
    armario_selado:  { file: 'armario_selado.png',  available: true, base: 0.34, frente: true },
    armario_aberto:  { file: 'armario_aberto.png',  available: true, base: 0.34, frente: true },
    bancada:         { file: 'bancada.png',         available: true, base: 0.70 },
    bau:             { file: 'bau.png',             available: true, base: 1.00 },
    cama_servico:    { file: 'cama_servico.png',    available: true, base: 0.44, frente: true },
    cadeira:         { file: 'cadeira.png',         available: true, base: 0.40 },
    carrinho:        { file: 'carrinho.png',        available: true, base: 0.55 },
    cilindro:        { file: 'cilindro.png',        available: true, base: 0.26, frente: true },
    escrivaninha:    { file: 'escrivaninha.png',    available: true, base: 0.66 },
    estante_a:       { file: 'estante_a.png',       available: true, base: 0.28, frente: true },
    estante_b:       { file: 'estante_b.png',       available: true, base: 0.28, frente: true },
    mesa_contencao:  { file: 'mesa_contencao.png',  available: true, base: 0.60 },
    mesa_longa:      { file: 'mesa_longa.png',      available: true, base: 0.72 },
    malas_bau:       { file: 'malas_bau.png',       available: true, base: 0.42 },
    gancho_chaves:   { file: 'gancho_chaves.png',   available: true, base: 0.00 },
    gancho_vazio:    { file: 'gancho_vazio.png',    available: true, base: 0.00 },
    moldura_vazia:   { file: 'moldura_vazia.png',   available: true, base: 0.00 },
    moldura_ocupada: { file: 'moldura_ocupada.png', available: true, base: 0.00 },
    porta_fechada:   { file: 'porta_fechada.png',   available: true, base: 0.00 },
    relogio_servico: { file: 'relogio_servico.png', available: true, base: 0.00 },
    rastro_01:       { file: 'rastro_01.png',       available: true, base: 0.00 },
    rastro_02:       { file: 'rastro_02.png',       available: true, base: 0.00 },
    rastro_03:       { file: 'rastro_03.png',       available: true, base: 0.00 },
    rastro_04:       { file: 'rastro_04.png',       available: true, base: 0.00 },
    prataria_empilhada: { file: 'prataria_empilhada.png', available: true, base: 0.00 },
    retrato_governanta_virado: {
      file: 'retrato_governanta_virado.png', available: true, base: 0.00
    },
    retrato_governanta_revelado: {
      file: 'retrato_governanta_revelado.png', available: true, base: 0.00
    },
    pia:             { file: 'pia.png',             available: true, base: 0.46 },
    poltrona:        { file: 'poltrona.png',        available: true, base: 0.42 }
  },

  /* Salas. Sao imagens inteiras, e nao tileset: cada uma ja vem com
     parede, piso e vao de porta pintados. A planta - o que e chao e o
     que e parede - vive em js/data/cob_mapas.js. */
  maps: {
    salao:    { file: 'salao.png',    available: true },
    sala_a:   { file: 'sala_a.png',   available: true },
    sala_b:   { file: 'sala_b.png',   available: true },
    sala_c:   { file: 'sala_c.png',   available: true },
    sala_d:   { file: 'sala_d.png',   available: true },
    corredor: { file: 'corredor.png', available: true },
    escada:   { file: 'escada.png',   available: true }
  },

  /* Grade de icones. Os nomes seguem a ordem de leitura da folha, da
     esquerda para a direita e de cima para baixo. Sao os nomes do
     desenho, e nao do item: quem decide o que cada icone representa e
     js/data/cob_mapas.js. */
  icons: {
    file: 'itens.png', available: true, lado: 64, cols: 4, rows: 4,
    ordem: [
      'livro_lacrado', 'livro_aberto', 'tinteiro',   'chave',
      'vela',          'sino',         'pena',       'mariposa',
      'espelho',       'frasco',       'fechadura',  'gaveta',
      'corvo',         'rosa_ventos',  'selo',       'bau'
    ]
  }
};

/* -------------------------------------------------------------------------
   17. COMPATIBILIDADE COM NODE
   ------------------------------------------------------------------------- */

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RBF;
}
