/* ==========================================================================
   ARQUIVO RABENFELS - js/data/cob_mapas.js
   "A COBERTURA" - PLANTA E CONTEUDO DO PERCURSO

   Somente dados. Nenhum nome de arquivo mora aqui: cenario, movel e
   personagem entram por id declarado em RBF.COBERTURA (js/config.js).

   ------------------------------------------------------------------
   O QUE E ESTA ROTA - decisao do autor, 25/08/2026
   ------------------------------------------------------------------
   A rota em que Antoniette investiga demais e a casa passa a caca-la.
   Ela pode mostrar o que as outras rotas escondem, mas continua presa a
   propria cronologia: Carmine ocupa a porta do patio e mata Antoniette
   antes da fuga. O percurso encerra ali.

   O percurso tem dois atos e a virada e o meio dele.

   FASE 0 - O INVENTARIO. Noite do dia oito para o nove. Serafina
   encerrou as nove, com cortesia integral, e a carruagem sai as seis.
   Ela senta com o caderno e refaz o caminho de tras para frente, do
   jeito que se confere um inventario. O Capitulo 10 ja escrevia isso;
   o percurso e essa frase jogada.

   FASE 1 - A CACA. Ela acha a linha. E, achando, le uma coisa a mais na
   margem do livro. A casa deixa de ser administrativa.

   ------------------------------------------------------------------
   O QUE ESTA ROTA QUEBRA, REGISTRADO PARA NAO SE PERDER
   ------------------------------------------------------------------
   Quatro pontos, todos autorizados pelo autor e nenhum por descuido:

   1. Khar'Vel APARECE. O resto da obra e horror por ausencia e a coisa
      nunca e mostrada. Aqui ela e vista - uma vez, parada, e nao ha o
      que fazer com ela.
   2. Klara e vista como casulo antes do Epilogo.
   3. A casa age abertamente, em vez de encerrar por horario.
   4. Antoniette corre perigo fisico dentro da casa.

   O QUE NAO MUDA: ela acha a linha que a entregou. O que muda nesta
   leitura e que a cortesia de Serafina nao e salvo-conduto. Carmine
   espera no ultimo vao e Antoniette nao chega a carruagem.

   ------------------------------------------------------------------
   TRES REGRAS QUE NAO SE QUEBRAM
   ------------------------------------------------------------------

   1. ELA ACHA A LINHA. Sempre. O que varia e quanto mais ela apura.

   2. NAO HA LUTA. Ser alcancada pelos vultos apaga o que ela apurou
      desde que encontrou a linha. Carmine e diferente: nao persegue,
      nao tem barra de vida e nao pode ser enfrentada. Ela executa o
      desfecho inevitavel diante da porta.

   3. NINGUEM EXPLICA. Nem a virada, nem o que esta no cilindro, nem por
      que a porta do quarto dela passou a dar em outro lugar.

   ------------------------------------------------------------------
   MEDIDA
   ------------------------------------------------------------------
   `piso` e o retangulo pisavel, em pixel da imagem do mapa. Medido por
   tools/cobertura_planta.py e conferido no olho contra o overlay que
   ele grava em tools/_planta/ - o numero cru do medidor punha a borda
   de cima dentro do nicho da parede em toda sala com janela.

       python tools/cobertura_planta.py --overlay sala_a

   As quatro paredes de fora saem do `piso`. `paredes` sao obstaculos
   INTERNOS, para a sala que nao e uma caixa - a escada sao dois andares
   no mesmo mapa. `saidas` sao os vaos pintados na arte.

   `fase` em qualquer peca: ausente vale sempre, 0 vale so no primeiro
   ato, 1 vale a partir do segundo.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

/* ==========================================================================
   SALAS
   ========================================================================== */

RBF.COB_MAPAS = {

/* --------------------------------------------------------------------------
   O QUARTO DELA
   Comeca aqui. Quatro anos de caderno no forro do bau. Tambem e o
   refugio: e para ca que ela volta quando e alcancada.
   -------------------------------------------------------------------------- */
quarto: {
  id:   'quarto',
  nome: 'O quarto do fundo',
  mapa: 'sala_a',
  bgm:  'cob_forro',
  piso: [52, 192, 1248, 1000],

  moveis: [
    { tipo: 'cama_servico', x: 210,  y: 362 },
    { tipo: 'bau',          x: 152,  y: 586 },
    { tipo: 'escrivaninha', x: 668,  y: 270 },
    { tipo: 'cadeira',      x: 701,  y: 315 },
    { tipo: 'estante_a',    x: 985, y: 283 },
    { tipo: 'poltrona',     x: 1072, y: 455 },
    { tipo: 'malas_bau',    x: 495,  y: 291 }
  ],

  saidas: [
    { x: 1239, y: 476, w: 60, h: 134, para: 'corredor',
      px: 190, py: 250, dir: 'baixo' },
    { x: 560, y: 1002, w: 112, h: 60, para: 'corredor',
      px: 690, py: 410, dir: 'cima' }
  ],

  pontos: [
    { id: 'bau', x: 152, y: 576, alto: 76, raio: 84, uma: true,
      item: 'caderno', marca: 'cob_caderno',
      tx: ['O forro do baú de ferramentas cede com a unha, do lado da dobradiça.',
           'O caderno estava onde esteve por quatro anos.',
           'Duzentas e quarenta e uma páginas, sem identificação na capa.'],
      depois: ['O forro fecha melhor do que abre.'] },

    { id: 'manual', x: 669, y: 191, alto: 110, raio: 84, uma: true,
      marca: 'cob_manual',
      tx: ['O manual da Ordem, encadernado como tratado de contabilidade.',
           'Página onze: prova sem procedência não vale em matéria de foro.',
           'Ela leu a linha duas vezes e não precisou da segunda.'],
      depois: ['Página onze.'] },

    { id: 'estante', x: 988, y: 260, alto: 264, raio: 84, uma: true,
      tx: ['Sete volumes. Seis são da casa e um é dela.',
           'O que é dela não cabe na mala e vai ficar.'],
      depois: ['Vai ficar.'] },

    { id: 'poltrona', x: 1062, y: 414, alto: 172, raio: 84, uma: true,
      tx: ['A cadeira que Fenn subiu no terceiro ano, sem ela pedir.'],
      depois: ['A cadeira.'] },

    { id: 'janela', x: 797, y: 143, alto: 20, uma: true, fase: 0,
      tx: ['A janela dá para o pátio dos fundos, e não para o de entrada.',
           'Em cinco anos ela nunca precisou do outro.'],
      depois: ['O pátio dos fundos.'] },

    /* A mesma janela, depois da virada. */
    { id: 'janela_2', x: 802, y: 123, alto: 20, fase: 1,
      tx: ['A janela dá para o pátio dos fundos.',
           'Há luz no pátio dos fundos, e o pátio dos fundos não tem lampião.'] },

    { id: 'malas', x: 499, y: 272, alto: 40, uma: true,
      tx: ['Duas malas fechadas e o baú de ferramentas.',
           'Nove horas.'],
      depois: ['Nove horas.'] }
  ]
},

/* --------------------------------------------------------------------------
   O CORREDOR DO ANDAR DE SERVICO
   Quatro portas. No primeiro ato, duas abrem. No segundo, as outras
   duas tambem - e uma delas deixa de dar onde dava.
   -------------------------------------------------------------------------- */
corredor: {
  id:   'corredor',
  nome: 'Corredor de serviço',
  mapa: 'corredor',
  bgm:  'cob_percurso',
  piso: [82, 125, 1880, 450],

  moveis: [
    { tipo: 'relogio_servico', x: 1249, y: 161, atravessa: true },
    { tipo: 'porta_fechada', x: 1487, y: 130, atravessa: true },
    { tipo: 'gancho_chaves', x: 732, y: 76, fase: 0, atravessa: true },
    { tipo: 'gancho_vazio',  x: 734, y: 79, fase: 1, atravessa: true },
    { tipo: 'moldura_vazia', x: 296, y: 139, fase: 0, atravessa: true },
    { tipo: 'moldura_ocupada', x: 283, y: 153, fase: 1, atravessa: true },
    { tipo: 'rastro_01', x: 1790, y: 138, fase: 1, atravessa: true },
    { tipo: 'rastro_02', x: 160, y: 124, fase: 1, atravessa: true },
    { giro: 150, tipo: 'rastro_03', x: 1136, y: 139, fase: 1, atravessa: true }
  ],

  saidas: [
    /* Primeiro ato: as duas portas do quarto dela. */
    { x: 13,  y: 220, w: 60, h: 88, fase: 0, para: 'quarto',
      px: 1190, py: 528, dir: 'esquerda' },
    { x: 635, y: 459, w: 78, h: 60, fase: 0, para: 'quarto',
      px: 638, py: 950, dir: 'baixo' },

    /* Segundo ato: a mesma porta da esquerda passa a dar na escada.
       Ninguem comenta. */
    { x: 30,  y: 220, w: 60, h: 88, fase: 1, para: 'escada',
      px: 260, py: 300, dir: 'baixo' },
    { x: 648, y: 446, w: 78, h: 60, fase: 1, para: 'quarto',
      px: 638, py: 950, dir: 'baixo' },

    { x: 1225, y: 457, w: 78, h: 60, para: 'escritorio',
      px: 672, py: 790, dir: 'cima' },

    /* A copa. Trancada enquanto a casa e administrativa. */
    { x: 1878, y: 220, w: 60, h: 88, fase: 0, exige: 'nunca',
      recusa: 'A copa fecha às seis esta semana.',
      para: 'corredor', px: 1800, py: 254 },
    { x: 1878, y: 220, w: 60, h: 88, fase: 1, para: 'copa',
      px: 200, py: 460, dir: 'direita' },

    /* Capitulo 3. A ronda acaba na porta da esquerda, e ela entra
       pela direita: atravessar o corredor E o trecho. As saidas
       acima nao existem nesta cena, pelo mesmo criterio dos pontos. */
    { x: 30, y: 220, w: 60, h: 88, fase: 0, cenas: ['c3'], encerra: 'ronda' }
  ],

  gente: [
    /*
      PRIMEIRO ATO - a casa ainda tem gente dentro.

      Os dois sao `passivo`: andam, e so. Nao ouvem, nao perseguem e nao
      alcancam. A casa deste ato fechou mais cedo; ela nao esta a
      espreita, e transforma-los em ameaca destruiria a virada.

      Eles existem para que o corredor do segundo ato possa esvaziar.
      Corredor que ja estava vazio nao esvazia - so continua igual.
    */

    /* Fenn, parado diante da porta das gemeas. Recolhe as chaves as dez;
       sao onze e quarenta e ele continua aqui, sem chave na mao. */
    { ch: 'fenn', x: 1496, y: 234, dir: 'cima', fase: 0, parado: true },

    /* Dara atravessando para a escada, com a caneca. A copa fechou as
       seis. A caneca reaparece cheia e fria na copa do segundo ato, e
       nenhuma das duas cenas comenta a outra. */
    { ch: 'dara', x: 702, y: 335, dir: 'esquerda', fase: 0,
      passivo: true, passo: 46, espera: 2.6,
      ronda: [[300, 330], [1180, 330]] },

    { ch: 'vulto', x: 1700, y: 300, dir: 'esquerda', fase: 1,
      passo: 68, ouvido: 190, toque: 34,
      ronda: [[1700, 300], [400, 240], [1700, 380]],
      aoRecuar: ['Ela não viu o que era.',
                 'Viu que a parede do corredor estava molhada onde aquilo passou.'] }
  ],

  pontos: [
    /* Fenn. Ele nao explica nada, porque foi treinado para nao explicar
       nada. O que ele diz esta correto e nao responde a pergunta. */
    { id: 'fenn', x: 1498, y: 212, alto: 160, raio: 96, uma: true, fase: 0,
      ch: 'fenn', marca: 'cob_fenn',
      tx: ['Fenn está de pé diante da porta das gêmeas, e não está fazendo nada.',
           'As chaves são recolhidas às dez. São onze e quarenta e ele não tem chave nenhuma na mão.',
           'Boa noite, senhorita.',
           'Ele disse boa noite e continuou onde estava.'],
      depois: ['Ele continua onde estava.'] },

    /* Dara. Ela responde uma coisa que ninguem perguntou. */
    { id: 'dara', x: 700, y: 330, alto: 150, raio: 110, uma: true, fase: 0,
      ch: 'dara', marca: 'cob_dara',
      tx: ['Dara atravessa o corredor com a caneca dela na mão.',
           'A copa fechou às seis e a caneca está cheia.',
           'Eu subo hoje.',
           'Dara dorme na copa há dezenove anos.'],
      depois: ['Ela subiu.'] },

    { id: 'gancho', x: 736, y: 63, alto: 112, raio: 84, uma: true, fase: 0,
      item: 'chave_servico',
      tx: ['O gancho das chaves de serviço, na bancada do corredor.',
           'Falta a da copa e falta a da adega. Sobra a do escritório.',
           'Fenn recolhe as chaves às dez e nunca recolheu a do escritório.'],
      depois: ['O gancho, com uma chave a menos do que devia ter.'] },

    { id: 'gancho_2', x: 733, y: 86, alto: 112, raio: 84, fase: 1,
      tx: ['O gancho está vazio.',
           'Nenhuma chave foi recolhida. Elas foram tiradas.'] },

    { id: 'porta_gemeas', x: 1492, y: 80, alto: 120, uma: true, fase: 0,
      tx: ['A porta do quarto das gêmeas fica no fim do corredor, do lado da escada.',
           'Debaixo dela não passa luz nenhuma, e passava até a semana passada.'],
      depois: ['Não passa luz.'] },

    /* Nao abre no primeiro ato e nao abre no segundo. */
    { id: 'porta_gemeas_2', x: 1486, y: 102, alto: 120, fase: 1,
      tx: ['A porta do quarto das gêmeas continua fechada.',
           'De todas as portas desta casa, é a única que não mudou nada.'] },

    { id: 'quadro', x: 306, y: 78, alto: 120, uma: true, fase: 0,
      marca: 'cob_moldura',
      tx: ['A moldura vazia continua no mesmo prego.',
           'Alguém limpou a moldura esta semana. O prego está limpo também.'],
      depois: ['A moldura vazia.'] },

    { id: 'quadro_2', x: 285, y: 30, alto: 120, fase: 1,
      tx: ['A moldura vazia não está mais vazia.',
           'Ela não chegou perto o bastante para ver o que tem dentro.'] },

    { id: 'relogio', x: 1249, y: 81, alto: 134, raio: 84, uma: true, fase: 0,
      tx: ['O relógio de serviço marca onze e quarenta.',
           'Ela conferiu no dela e os dois estavam certos.'],
      depois: ['Onze e quarenta.'] },

    { id: 'relogio_2', x: 1251, y: 100, alto: 134, raio: 84, fase: 1, uma: true,
      marca: 'cob_relogio',
      tx: ['O relógio de serviço marca onze e quarenta.',
           'O dela marca duas e dez.'],
      depois: ['Onze e quarenta.'] },

    /* ======================================================================
       O CAPITULO 3 - o mesmo corredor, quatro meses antes

       Os mesmos objetos que a Cobertura confere no Capitulo 10. Aqui
       nao ha um errado. E a unica funcao deste trecho: o jogador anda
       por este corredor uma vez com tudo em ordem, para que a segunda
       vez tenha com o que ser comparada.

       Nenhuma linha aponta para a frente. Nada aqui e presagio.
       ====================================================================== */
    { id: 'c3_gancho', x: 731, y: 88, alto: 112, raio: 84, uma: true,
      fase: 0, cenas: ['c3'], marca: 'c3_gancho',
      tx: ['O gancho das chaves de serviço, na bancada do corredor.',
           'Nove chaves. Ela conferiu contra a lista da semana passada e batia.'],
      depois: ['Nove.'] },

    { id: 'c3_relogio', x: 1250, y: 113, alto: 134, raio: 84, uma: true,
      fase: 0, cenas: ['c3'], marca: 'c3_relogio',
      tx: ['O relógio de serviço marca quatro e vinte.',
           'Ela conferiu no dela. Os dois estavam certos.'],
      depois: ['Quatro e vinte.'] },

    { id: 'c3_quadro', x: 300, y: 150, alto: 120, uma: true,
      fase: 0, cenas: ['c3'], marca: 'c3_quadro',
      tx: ['Uma moldura vazia, pendurada num prego.',
           'Tem pó no aro e pó no prego. Está assim desde que ela chegou.'],
      depois: ['A moldura vazia.'] },

    { id: 'c3_porta_gemeas', x: 1496, y: 78, alto: 120, uma: true,
      fase: 0, cenas: ['c3'], marca: 'c3_porta',
      tx: ['A porta do quarto das gêmeas, no fim do corredor.',
           'Passa luz por baixo dela. Passa desde que ela chegou.'],
      depois: ['Passa luz.'] },

    /* Fenn no horario dele, fazendo a coisa dele. O Capitulo 10 usa a
       mesma cortesia, no mesmo lugar do corredor, com ele parado e sem
       chave nenhuma na mao. */
    { id: 'c3_fenn', x: 1491, y: 226, alto: 160, raio: 96, uma: true,
      fase: 0, cenas: ['c3'], ch: 'fenn', marca: 'c3_fenn',
      tx: ['Fenn está recolhendo as chaves da tarde.',
           'Boa tarde, senhorita.',
           'Ele disse boa tarde e continuou recolhendo.'],
      depois: ['Ele terminou o gancho e desceu.'] },

    { id: 'c3_dara', x: 692, y: 302, alto: 150, raio: 110, uma: true,
      fase: 0, cenas: ['c3'], ch: 'dara', marca: 'c3_dara',
      tx: ['Dara vai para a copa com a caneca vazia.',
           'A copa abre até as seis.',
           'A senhorita quer?',
           'Antoniette disse que não e Dara não insistiu.'],
      depois: ['Ela desceu para a copa.'] },

    /* A bancada nao e conferida no Capitulo 10. E conferida aqui porque
       o inventario que ela veio fazer e este, e nao o outro. */
  ]
},

/* --------------------------------------------------------------------------
   O ESCRITORIO DE SERVICO
   O livro de entrada e saida. E a letra na margem, que e onde o
   primeiro ato acaba.
   -------------------------------------------------------------------------- */
escritorio: {
  id:   'escritorio',
  nome: 'Escritório de serviço',
  mapa: 'sala_d',
  bgm:  'cob_conferencia',
  piso: [45, 190, 1298, 850],

  moveis: [
    { tipo: 'arquivo_gavetas', x: 1054,  y: 256 },
    { tipo: 'escrivaninha',    x: 670,  y: 349 },
    { tipo: 'cadeira',         x: 724,  y: 427 },
    { tipo: 'armario_selado',  x: 1127, y: 764, fase: 0 },
    { tipo: 'armario_aberto',  x: 1170, y: 450, fase: 1 },
    { tipo: 'estante_b',       x: 288,  y: 262 }
  ],

  saidas: [
    { x: 620, y: 855, w: 94, h: 60, para: 'corredor',
      px: 1290, py: 420, dir: 'cima' },
    { x: 1294, y: 430, w: 60, h: 120, fase: 0, exige: 'nunca',
      recusa: 'Do outro lado é a ala da família.',
      para: 'escritorio', px: 1200, py: 480 },
    { x: 1294, y: 430, w: 60, h: 120, fase: 1, exige: 'nunca',
      recusa: 'Do outro lado daquela porta, alguma coisa está encostada nela.',
      para: 'escritorio', px: 1200, py: 480 }
  ],

  pontos: [
    { id: 'livro_saida', x: 668, y: 292, alto: 110, raio: 84, uma: true,
      marca: 'cob_livro', sfx: 'sfx_cob_anota',
      tx: ['O livro de entrada e saída de correspondência, aberto em julho.',
           'Toda linha tem data, destinatário e um visto na margem.',
           'O visto é sempre da mesma letra, e a letra não é de nenhum escriturário.'],
      depois: ['Toda linha tem visto na margem.'] },

    { id: 'gaveta_maio', x: 1051, y: 210, alto: 146, raio: 46, uma: true,
      marca: 'cob_maio',
      tx: ['Maio. Uma carta da casa para Lervel, com pedido de conferência de referências.',
           'Serafina disse isso na cara dela em maio, e ela anotou e seguiu.',
           'A resposta de Lervel entrou em junho e está lançada. O envelope não está.'],
      depois: ['Maio, para Lervel.'] },

    { id: 'gaveta_agosto', x: 1108, y: 203, alto: 146, raio: 46, uma: true,
      marca: 'cob_agosto',
      tx: ['Agosto do ano três. O relatório saiu daqui num envelope selado por ela mesma.',
           'Hora, local e testemunha direta, na íntegra, porque relato incompleto não serve.',
           'Está lançado no livro com visto na margem.'],
      depois: ['Agosto do ano três.'] },

    { id: 'gaveta_fonte', x: 990, y: 211, alto: 146, raio: 46, uma: true,
      marca: 'cob_fonte', sfx: 'sfx_cob_achado',
      tx: ['Outubro do ano quatro. O nome da antecessora, remetido com identificação da fonte.',
           'A fonte é um empregado vivo desta casa.',
           'Visto na margem, mesma letra.'],
      depois: ['Com a fonte identificada.'] },

    { id: 'armario', x: 1122, y: 722, alto: 284, raio: 84, fase: 0,
      tx: ['O armário da casa. Lacre de cera inteiro, e o lacre é de hoje.'] },

    { id: 'armario_2', x: 1170, y: 450, alto: 284, raio: 84, fase: 1, uma: true,
      marca: 'cob_armario',
      tx: ['O lacre do armário está rompido e as duas portas estão abertas.',
           'Dentro há espaço para quatro pastas e há quatro marcas de poeira.',
           'Três pastas estão no chão. A quarta não está em lugar nenhum.'],
      depois: ['Três no chão.'] },

    { id: 'estante_b', x: 287, y: 213, alto: 264, raio: 84, uma: true,
      tx: ['Livros-caixa dos cinco anos, de pé, por ano.',
           'O do primeiro ano tem uma lacuna de três meses que ninguém nunca explicou.'],
      depois: ['Cinco anos, de pé.'] },

    /*
      A VIRADA.

      Ela senta, confere as duas colunas e acha a linha - que e o que o
      Capitulo 10 diz que ela faz. E, achando, le a margem.

      Fica na CADEIRA, e nao na escrivaninha. Estava na escrivaninha, a
      trinta e seis pixels do livro de saida, e alvo() escolhe o ponto
      mais proximo da mao: o livro ganhava sempre e o percurso nao tinha
      saida por interacao nenhuma.

      Nao dizer de quem e a letra. Quem leu o Capitulo 1 sabe quem le
      tudo o que entra e sai desta casa.
    */
    { id: 'fechar', x: 730, y: 396, alto: 134, raio: 84, exige: 'caderno',
      recusa: 'Sem o caderno não dá para conferir nada contra nada.',
      viraFase: 1, viraBgm: 'cob_perto', marca: 'cob_linha',
      tx: ['Ela sentou, pôs o caderno ao lado do livro e conferiu as duas colunas, linha a linha.',
           'Levou quarenta minutos.',
           'A linha estava correta.',
           'Na margem daquela linha, a mesma letra de sempre tinha escrito uma data.',
           'A data era a de amanhã.',
           'Depois disso a casa parou de fazer barulho de casa.'] }
  ]
},

/* --------------------------------------------------------------------------
   A ESCADA
   Dois andares no mesmo mapa. A parede do meio e obstaculo interno e o
   vao da escada e o unico lugar por onde ela passa.
   -------------------------------------------------------------------------- */
escada: {
  id:   'escada',
  nome: 'A escada de serviço',
  mapa: 'escada',
  bgm:  'cob_perto',
  piso: [40, 150, 870, 1360],

  paredes: [
    { x: 40,  y: 640, w: 280, h: 370 },
    { x: 580, y: 640, w: 290, h: 370 }
  ],

  moveis: [
    { tipo: 'rastro_04', x: 687, y: 833, atravessa: true }
  ],

  saidas: [
    { x: 330, y: 120, w: 250, h: 70, para: 'corredor',
      px: 200, py: 300, dir: 'direita' },
    { x: 320, y: 1352, w: 250, h: 60, para: 'salao',
      px: 160, py: 470, dir: 'direita' }
  ],

  gente: [
    { ch: 'vulto', x: 700, y: 1100, dir: 'cima',
      passo: 74, ouvido: 210, toque: 34,
      ronda: [[700, 1100], [200, 900], [700, 1250]],
      aoRecuar: ['Ela desceu os degraus de dois em dois e não olhou para trás.',
                 'Quando parou, estava de volta no quarto, e a porta do quarto estava fechada.'] }
  ],

  pontos: [
    { id: 'degrau', x: 460, y: 720, alto: 40, uma: true,
      marca: 'cob_degrau',
      tx: ['O sétimo degrau range. Ela sabe disso há cinco anos e nunca precisou saber.'],
      depois: ['O sétimo degrau.'] },

    { id: 'corrimao', x: 327, y: 495, alto: 30, uma: true,
      tx: ['O corrimão está molhado da altura da mão para baixo, e só do lado de descer.'],
      depois: ['Só do lado de descer.'] }
  ]
},

/* --------------------------------------------------------------------------
   A COPA
   Fechava as seis esta semana. Agora esta aberta e nao ha ninguem.
   -------------------------------------------------------------------------- */
copa: {
  id:   'copa',
  nome: 'A copa',
  mapa: 'sala_b',
  bgm:  'cob_respiro',
  piso: [40, 210, 1375, 835],

  moveis: [
    { tipo: 'mesa_longa', x: 704,  y: 500 },
    { camada: 1, escala: 1, tipo: 'prataria_empilhada', x: 711, y: 439, atravessa: true },
    { tipo: 'cadeira',    x: 621,  y: 450 },
    { tipo: 'cadeira',    x: 808,  y: 445 },
    { tipo: 'pia',        x: 1189, y: 381 },
    { tipo: 'carrinho',   x: 1175,  y: 820 }
  ],

  saidas: [
    { x: 20,  y: 410, w: 60, h: 100, para: 'corredor',
      px: 1800, py: 254, dir: 'esquerda' },
    { x: 663, y: 853, w: 78, h: 60, para: 'camara',
      px: 620, py: 230, dir: 'baixo' }
  ],

  pontos: [
    { id: 'mesa', x: 704, y: 454, alto: 122, raio: 84, uma: true,
      marca: 'cob_copa',
      tx: ['A prataria está contada e empilhada na ordem em que Dara conta.',
           'Está contada até o fim. Dara conta até o fim toda noite há dezenove anos.',
           'A caneca dela está na mesa, cheia, e a mesa está fria.'],
      depois: ['Cheia, e fria.'] },

    { id: 'pia', x: 1183, y: 292, alto: 142, raio: 84, uma: true,
      tx: ['A torneira está aberta no fio mais fino que uma torneira consegue.',
           'Ela fechou. Meia volta e fechou.'],
      depois: ['Fechada.'] },

    { id: 'carrinho', x: 1173, y: 756, alto: 126, raio: 84, uma: true,
      marca: 'cob_carrinho',
      tx: ['Um carrinho de serviço que não é da copa.',
           'A copa tem três carrinhos de madeira, e este é de metal.',
           'A bandeja de cima está limpa. A de baixo foi limpa.'],
      depois: ['A de baixo foi limpa.'] },

    { id: 'porta_baixo', x: 710, y: 808, alto: 40,
      tx: ['A porta do fundo da copa dá na despensa.',
           'Dava.'] }
  ]
},

/* --------------------------------------------------------------------------
   A CAMARA
   Beco sem saida, e e por isso que ela existe: quem entra escolheu.
   NAO EXPLICAR NADA DO QUE ESTA AQUI.
   -------------------------------------------------------------------------- */
camara: {
  id:   'camara',
  nome: '—',
  mapa: 'sala_c',
  bgm:  'cob_forro_ruim',
  piso: [40, 180, 1210, 900],

  moveis: [
    { tipo: 'cilindro',       x: 626,  y: 408 },
    { tipo: 'mesa_contencao', x: 307,  y: 555 },
    { tipo: 'bancada',        x: 982, y: 285 },
    { tipo: 'carrinho',       x: 860, y: 439 },
    { tipo: 'pia',            x: 1104, y: 790 }
  ],

  /* A unica sala com luz propria. Nao treme, porque nao e chama.

     Existe por necessidade de composicao antes de ser efeito: a menina
     esta a dois metros do chao, dentro do vidro, e a vela nao chega la.
     Puxa-la para baixo iluminaria e destruiria o unico enquadramento
     que a cena tem. */
  luzes: [
    /* Forca baixa de proposito. O ganho da composicao soma a copia
       iluminada duas vezes, e o vidro do cilindro ja e claro na arte:
       com forca alta ele estoura em branco e a menina desaparece
       dentro do proprio brilho. O trabalho desta luz e so tirar ela
       do preto. */
    { x: 620, y: 390, raio: 110, queda: 260, forca: 0.20,
      cor: '150,40,44', tinta: 0.07 }
  ],

  gente: [
    /* `y` maior que o do cilindro para ser desenhada DEPOIS dele - o
       vidro da arte e chapado e esconderia quem estivesse atras. O
       `desloca` sobe o desenho para dentro do tubo sem mexer nessa
       ordem, e sem sombra, porque ela nao esta no chao. */
    { ch: 'klara_casulo', x: 625, y: 311, dir: 'baixo', parado: true,
      desloca: -96, semSombra: true }
  ],

  saidas: [
    { x: 565, y: 896, w: 120, h: 60, para: 'copa',
      px: 700, py: 790, dir: 'cima' },
    { x: 1174, y: 418, w: 60, h: 160, exige: 'nunca',
      recusa: 'Aquela porta dá para dentro.',
      para: 'camara', px: 1160, py: 490 }
  ],

  pontos: [
    { id: 'cilindro', x: 626, y: 287, alto: 190, raio: 96, uma: true,
      marca: 'cob_camara', sfx: 'sfx_cob_notada',
      tx: ['O cilindro tem dois metros e quarenta e está cheio até a marca de cima.',
           'Dentro dele há uma menina de doze anos.',
           'É Klara.',
           'A menina abriu os olhos e não olhou para Antoniette.',
           'Olhou para a porta por onde Antoniette tinha entrado, e Antoniette não virou.'],
      depois: ['Ela não virou.'] },

    { id: 'mesa_contencao', x: 313, y: 499, alto: 116, raio: 84, uma: true,
      marca: 'cob_mesa',
      tx: ['Uma mesa com correias em quatro pontos e uma manivela.',
           'As correias do tornozelo estão na quarta casa e as do pulso na primeira.',
           'Quem ajustou isso ajustou para alguém que ainda ia crescer.'],
      depois: ['Quarta casa e primeira.'] },

    { id: 'bancada', x: 980, y: 218, alto: 112, raio: 84, uma: true,
      marca: 'cob_laudo',
      tx: ['Formulários em branco, empilhados, com o cabeçalho já impresso.',
           'O campo do motivo tem três opções marcadas com quadradinho.',
           'A terceira é "motivo de saúde".'],
      depois: ['A terceira.'] },

    { id: 'pia_camara', x: 1098, y: 692, alto: 142, raio: 84, uma: true,
      tx: ['A pia tem ralo largo e o ralo está limpo.',
           'Nada nesta sala está sujo. É a sala mais limpa da casa.'],
      depois: ['A mais limpa da casa.'] }
  ]
},

/* --------------------------------------------------------------------------
   O SALAO
   O ultimo trecho. A porta existe, mas Carmine ocupa o unico acesso.
   Nao ha combate nem desvio: o jogador confere quem esta ali e o
   percurso termina.
   -------------------------------------------------------------------------- */
salao: {
  id:   'salao',
  nome: 'O salão',
  mapa: 'salao',
  bgm:  'cob_ultima',
  piso: [40, 180, 1360, 825],

  moveis: [
    { escala: 0.8, tipo: 'poltrona',   x: 280,  y: 650 },
    { tipo: 'mesa_longa', x: 1090, y: 470 },
    { camada: 1, escala: 0.65, tipo: 'retrato_governanta_virado',
      tipoDepois: 'retrato_governanta_revelado', marca: 'cob_retrato',
      x: 1086, y: 404, atravessa: true },
    { escala: 0.85, tipo: 'cadeira',    x: 1140, y: 517 }
  ],

  gente: [
    /* Parada. Nao persegue e nao e inimiga de combate. Ocupa o vao ate
       o desfecho automatico. */
    { ch: 'carmine', x: 710, y: 781, dir: 'cima', parado: true,
      bloqueia: { w: 116, h: 34 } }
  ],

  saidas: [
    { x: 20,  y: 408, w: 60, h: 130, para: 'escada',
      px: 440, py: 1280, dir: 'cima' },

    /* Nao existe saida para o patio nesta leitura. Carmine bloqueia o
       vao e o ponto abaixo encerra o percurso antes da fuga. */
  ],

  pontos: [
    { id: 'carmine', x: 713, y: 720, alto: 200, raio: 110, uma: true,
      marca: 'cob_carmine', marcaAoFim: true,
      desfecho: 'carmine', ataque: 'carmine_ataque',
      ataqueX: 700, ataqueY: 790,
      tx: ['Há uma mulher entre ela e a porta do pátio.',
           'A mulher está de costas para a porta e de frente para Antoniette, e não se mexe.',
           'Antoniette contou até dez, do jeito que contou na sala de Serafina.',
           'Na segunda vez que olhou, a mulher estava três passos mais perto e continuava sem se mexer.',
           'Antoniette começou a terceira contagem.'] },

    { id: 'retrato', x: 1093, y: 396, alto: 122, raio: 84, uma: true,
      marca: 'cob_retrato',
      tx: ['Na mesa comprida do salão há um retrato virado para baixo.',
           'Ela virou. É uma mulher de uniforme de governanta, e a grafia embaixo não é um nome.',
           'É uma data de entrada e uma data de saída.'],
      depois: ['Entrada e saída.'] }
  ]
}

};

/* ==========================================================================
   SEGMENTOS
   Um segmento e uma entrada no percurso: onde comeca, com quem, para
   onde recua quando e alcancada, e o que cada item quer dizer.
   ========================================================================== */

/* ==========================================================================
   O QUE FICOU DE FORA, E POR QUE

   `chars.klara` - a folha de caminhada da Klara nao-corrompida - esta
   recortada, limpa e no manifesto, e nao entra em sala nenhuma.

   Nao e esquecimento. As salas jogaveis do primeiro ato sao tres, e a
   porta do quarto das gemeas nao abre em nenhum dos dois atos: e a unica
   porta desta casa que nao muda. Por baixo dela nao passa luz, e nao
   passava desde a semana anterior. Por Klara aparecer andando pelo
   corredor as onze e quarenta seria contradizer a propria linha que da
   peso aquela porta.

   No segundo ato ela ja esta no cilindro, e ali quem entra e
   `klara_casulo`.

   A folha fica registrada para o dia em que houver cena para ela. Uma
   peca sem cena e melhor do que uma cena forcada para justificar a peca.
   ========================================================================== */

RBF.COB_SEGMENTOS = {

cob10_inventario: {
  entrada: 'quarto',
  jogador: 'antoniette',
  x: 560, y: 760, dir: 'baixo',

  /* Para onde ela volta quando e alcancada. Nao ha morte no percurso: o
     preco de ser vista e o proveito da noite, e nao a leitura. */
  refugio: { sala: 'quarto', x: 560, y: 760, dir: 'baixo' },

  /* Nome e icone de cada item na bolsa. O icone e um id da grade
     declarada em RBF.COBERTURA.icons - a ordem de leitura da folha. */
  itens: {
    caderno:       { nome: 'O caderno sem identificação', icone: 'livro_lacrado' },
    chave_servico: { nome: 'Chave do escritório',          icone: 'chave' }
  }
},

/* --------------------------------------------------------------------------
   A RONDA DAS QUATRO E VINTE - Capitulo 3

   O mesmo corredor da Cobertura, quatro meses antes, com tudo em ordem.
   Nao ha item, nao ha refugio e nao ha o que fugir: e uma tarde de
   trabalho comum, e a casa ainda tem gente dentro.

   `cena: 'c3'` troca os pontos e as saidas sem tocar na planta, na
   mobilia nem em Fenn e Dara, que a fase 0 ja poe la.

   Nenhuma marca daqui e lida pelo roteiro. O trecho existe para que o
   jogador tenha andado por este corredor uma vez, com tudo certo, antes
   de andar por ele de novo no Capitulo 10.
   -------------------------------------------------------------------------- */
c3_ronda: {
  cena: 'c3',
  entrada: 'corredor',
  jogador: 'antoniette',
  x: 1800, y: 300, dir: 'esquerda',
  itens: {}
}

};

})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mapas: RBF.COB_MAPAS, segmentos: RBF.COB_SEGMENTOS };
}
