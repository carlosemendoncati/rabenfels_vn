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
  gameVersion:       '0.6.0',

  /*
    Subiu para 2 na revisao 0.5.0. O formato do save nao mudou, mas o
    Prologo e o Capitulo 1 foram reescritos: um save antigo aponta para
    um beatIndex que agora cai em outra frase. Recusar com aviso e
    honesto; carregar no lugar errado nao seria.
  */
  saveSchemaVersion: 2,

  paths: {
    backgrounds:  'assets/backgrounds/',
    characters:   'assets/characters/',
    bgm:          'assets/audio/bgm/',
    sfx:          'assets/audio/sfx/',
    music:        'assets/audio/music/',
    uiSfx:        'assets/audio/ui/',
    ui:           'assets/ui/',
    placeholders: 'assets/placeholders/'
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
    /* Pagina escura atravessando entre telas.   */
    sweepMs: 380,
    /* Tempo de ler a marca na escolha antes de
       a cena seguir. Maior quando uma rota muda. */
    choiceHoldMs:      380,
    choiceHoldRouteMs: 620
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

    available: false,
    onMissing: 'hide',
    fallbackExpression: 'neutral',

    sprites: {
      neutral: 'antoniette_neutral.png',
      observe: 'antoniette_observe.png',
      guarded: 'antoniette_guarded.png'
    }
  },

  fenn: {
    name: 'Fenn',
    color: '#7e756a',
    dir: 'fenn',
    size: 'bust',

    available: false,
    onMissing: 'placeholder',
    fallbackExpression: 'neutral',

    sprites: {
      neutral: 'fenn_neutral.png'
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
      neutral: 'serafina_neutral.png',
      direct:  'serafina_direct.png',
      side:    'serafina_side.png',
      smirk:   'serafina_smirk.png',
      intense: 'serafina_intense.png'
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

  klara: {
    name: 'Klara',
    color: '#9ec4cc',
    dir: 'klara',
    size: 'full',

    available: true,
    onMissing: 'placeholder',
    fallbackExpression: 'neutral',

    sprites: {
      neutral: 'klara_neutral.png'
    }
  },

  liara: {
    name: 'Liara',
    color: '#7aa7d8',
    dir: 'liara',
    size: 'full',

    available: true,
    onMissing: 'placeholder',
    fallbackExpression: 'neutral',

    sprites: {
      neutral: 'liara_neutral.png'
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
  }
};

RBF.MUSIC = {
  menu_theme: {
    files: [
      'menu_theme.ogg',
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
  }
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

  /* Fundo do menu. Usa um background do manifesto, entao segue a mesma
     regra de todos: enquanto 'available' for false, so o gradiente. */
  background: 'bg_archive_closeup',

  /* Numerais romanos dos registros do menu. */
  numerals: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
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
  {
    id:      'options',
    label:   'Ajustes',
    chapter: 'CONTROLE DE LEITURA',
    code:    'REG-06',
    action:  'options',
    note:    'Texto, \u00e1udio, movimento e conte\u00fado sens\u00edvel.'
  },
  {
    id:      'credits',
    label:   'Cr\u00e9ditos',
    chapter: 'REGISTRO DE AUTORIA',
    code:    'REG-07',
    action:  'credits',
    note:    'Quem construiu este arquivo.'
  },
  {
    id:      'close',
    label:   'Fechar o Arquivo',
    chapter: 'ENCERRAR SESS\u00c3O',
    code:    'REG-08',
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
   16. COMPATIBILIDADE COM NODE
   ------------------------------------------------------------------------- */

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RBF;
}
