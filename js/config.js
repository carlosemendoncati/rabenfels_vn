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
  gameVersion:       '0.3.0',
  saveSchemaVersion: 1,

  paths: {
    backgrounds:  'assets/backgrounds/',
    characters:   'assets/characters/',
    bgm:          'assets/audio/bgm/',
    sfx:          'assets/audio/sfx/',
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
    lastMs: 500
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
    available: false,
    css: 'linear-gradient(175deg, #0d1520 0%, #1a2535 30%, #0f1825 60%, #060c12 100%)'
  },

  bg_nidhaus_gate: {
    file: 'bg_nidhaus_gate.png',
    available: false,
    css: 'radial-gradient(ellipse at 50% 108%, #12100e 0%, #0a0806 40%, #030202 100%)'
  },

  bg_main_hall: {
    file: 'bg_main_hall.png',
    available: false,
    css: 'radial-gradient(ellipse at 30% 78%, #1a1108 0%, #0d0a06 50%, #030202 100%)'
  },

  bg_antoniette_room: {
    file: 'bg_antoniette_room.png',
    available: false,
    css: 'radial-gradient(ellipse at 50% 100%, #0a0d15 0%, #060810 50%, #020203 100%)'
  },

  bg_library: {
    file: 'bg_library.png',
    available: false,
    css: 'radial-gradient(ellipse at 60% 58%, #1c1408 0%, #0e0b05 45%, #030202 100%)'
  },

  bg_corridor: {
    file: 'bg_corridor.png',
    available: false,
    css: 'linear-gradient(180deg, #030202 0%, #0c0806 50%, #050303 100%)'
  },

  bg_kitchen: {
    file: 'bg_kitchen.png',
    available: false,
    css: 'radial-gradient(ellipse at 40% 85%, #241a0e 0%, #120c06 45%, #050302 100%)'
  },

  bg_library_night: {
    file: 'bg_library_night.png',
    available: false,
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
    files: [
      'bgm_prologue.ogg',
      'bgm_prologue.mp3'
    ],
    available: true,
    loop: true,
    volume: 0.32
  },

  bgm_archive: {
    files: [
      'bgm_archive.ogg',
      'bgm_archive.mp3'
    ],
    available: true,
    loop: true,
    volume: 0.38
  },

  bgm_grey_march: {
    files: [
      'bgm_grey_march.ogg',
      'bgm_grey_march.mp3'
    ],
    available: true,
    loop: true,
    volume: 0.40
  },

  bgm_nidhaus: {
    files: [
      'bgm_nidhaus.ogg',
      'bgm_nidhaus.mp3'
    ],
    available: true,
    loop: true,
    volume: 0.36
  }
};

RBF.SFX = {
  sfx_package: {
    files: [
      'sfx_package.wav',
      'sfx_package.ogg',
      'sfx_package.mp3'
    ],
    available: true,
    volume: 0.55
  },

  sfx_page_turn: {
    files: [
      'sfx_page_turn.wav',
      'sfx_page_turn.ogg',
      'sfx_page_turn.mp3'
    ],
    available: true,
    volume: 0.45
  },

  sfx_candle: {
    files: [
      'sfx_candle.wav',
      'sfx_candle.ogg',
      'sfx_candle.mp3'
    ],
    available: true,
    volume: 0.60
  },

  sfx_door: {
    files: [
      'sfx_door.wav',
      'sfx_door.ogg',
      'sfx_door.mp3'
    ],
    available: true,
    volume: 0.55
  },

  sfx_footsteps: {
    files: [
      'sfx_footsteps.wav',
      'sfx_footsteps.ogg',
      'sfx_footsteps.mp3'
    ],
    available: true,
    volume: 0.45
  },

  sfx_wind: {
    files: [
      'sfx_wind.wav',
      'sfx_wind.ogg',
      'sfx_wind.mp3'
    ],
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
    data:  'PROLOGUE',
    label: 'Pr\u00f3logo',
    title: 'O Arquivo',
    selectable: true
  },

  {
    id:    'capitulo1',
    data:  'CHAPTER1',
    label: 'Cap\u00edtulo 1',
    title: 'A Chegada',
    selectable: true
  },

  {
    id:    'capitulo2',
    data:  'CHAPTER2',
    label: 'Cap\u00edtulo 2',
    title: 'O Invent\u00e1rio',
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
  /* 0 = texto instantaneo. Acima disso, ms por caractere. */
  typeSpeedMs: 18,

  /* false = desliga o efeito de maquina de escrever por completo. */
  typewriter: true,

  bgmVolume: 0.42,
  sfxVolume: 0.55,

  /* Avanco automatico depois que o texto termina de ser exibido. */
  autoAdvance:      false,
  autoAdvanceMs:    2200,

  autosaveEnabled:  true,

  /* Confirmar antes de sobrescrever save e antes de sair para o titulo. */
  confirmDestructive: true,

  /* Tamanho do texto da caixa de dialogo, em px. */
  textSize: 18
};

/* -------------------------------------------------------------------------
   8. TEXTOS DE INTERFACE
   ------------------------------------------------------------------------- */

RBF.UI_TEXT = {
  archiveLabel: '\u2014 Arquivo Rabenfels \u2014',
  lastLabel:    '\u2014 \u00daltima Entrada \u2014',
  hintClick:    'clique ou espa\u00e7o para continuar',
  hintChoice:   'escolha: clique ou 1 / 2 / 3',
  hintEnd:      'Fim do Cap\u00edtulo 2 \u2014 Cap\u00edtulo 3 em breve',

  emptySlot:    'espa\u00e7o vazio',
  autosaveName: 'Autosave',
  quicksaveName:'Save r\u00e1pido'
};

/* -------------------------------------------------------------------------
   9. CREDITOS
   ------------------------------------------------------------------------- */

RBF.CREDITS = [
  {
    title: 'Arquivo Rabenfels',
    lines: [
      'Visual Novel de horror psicol\u00f3gico e trag\u00e9dia',
      'Vers\u00e3o ' + '0.3.0'
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
      'Efeitos sonoros sintetizados especificamente para o projeto',
      'em tools/make_sfx.py. Sem material de terceiros.',
      'Trilha instrumental: arquivos locais em assets/audio/bgm/.'
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
   10. COMPATIBILIDADE COM NODE
   ------------------------------------------------------------------------- */

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RBF;
}
