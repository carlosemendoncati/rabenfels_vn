/* ==========================================================================
   ARQUIVO RABENFELS - js/data/chapter6.js
   CAPITULO 6: "Uma Amizade"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.

   QUANDO: Ano 2 (primavera) ate Ano 3 (julho). Dezoito meses.
   Klara e Liara passam de nove para dez anos.

   O PENSAMENTO UNICO DESTE CAPITULO (Zinsser, unidade):
   "Foram felizes, e e isso que torna o resto insuportavel."

   A TROCA (docs/estrutura_v1.md):
   Ela ganha a confianca das duas meninas.
   Entrega O RELOGIO. A amizade e o que a faz devagar.
   "Fui metodica. Fui devagar. Foi o devagar que custou."

   =========================================================================
   ESTE E O UNICO CAPITULO QUE RAMIFICA DE VERDADE.
   Decisao do autor em 26/07/2026, registrada em docs/estrutura_v1.md.

   Nao ramifica enredo - ramifica QUEM KLARA VIRA. Os mesmos dezoito
   meses, tres substancias diferentes, cada uma semeando um traco da
   tabela de "Onde Klara chega" (docs/biblia_rabenfels.md).

   NAO RECONVERGE. A flag 'taught' carrega ate o Epilogo, e a ultima
   entrada do Arquivo passa a ter tres versoes.

   | Ramo | Antoniette ensina | Klara adulta fica |
   |------|-------------------|-------------------|
   | A    | o metodo          | precisa e sozinha |
   | B    | a forma           | separa amigos de suditos |
   | C    | o mundo           | promete protecao a quem acolhe |

   Cada ramo leva o "e se" a uma conclusao logica e RUIM diferente:
   A - ela faz uma colega de uma crianca de dez anos, e a crianca vira o
       metodo contra a propria familia.
   B - Serafina aprova. Antoniette deixou a menina mais util para a coisa
       que vai consuma-la.
   C - Klara descobre que existe um fora, e comeca a planejar. Antoniette
       deu a ela uma esperanca que nao pode entregar.

   Os tres ramos tem extensao equivalente e somam 4 pontos de rota cada.
   Nenhum e o "certo". (Finley, sobre favoritismo de ramo.)
   =========================================================================

   O FIO DE KLARA:
   E o unico capitulo em que ela nao quer nada alem do que tem. Por isso
   ele existe. (mono no aware - Cavallaro)

   NAO PODE VAZAR AQUI: Khar'Vel em Klara (Cap. 7), Serafina saber quem
   ela e (Cap. 8), a antecessora (Cap. 8). A investigacao PARA, e o
   jogador precisa sentir que parou.

   Le 'told_klara' do Capitulo 5.
   Contrato: a flag 'taught' nao muda de nome. Capitulos 7 a 11 e o
   Epilogo dependem dela.

   Modo de escrita: narrativa dramatica (Finley) - atravessa dezoito
   meses sem resumo e sem corte seco.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

/* ==========================================================================
   RAMO A - O METODO
   Ela ensina a catalogar, conferir e desconfiar de fonte unica.
   Fim ruim: a crianca vira o metodo contra a propria casa.
   ========================================================================== */

var C6_METODO = [
  { t:'scene', id:'c6a_fichas', chapter:'capitulo6', title:'As fichas',
    bg:'bg_library', bgm:'bgm_nidhaus' },

  { t:'nar', tx:'Ela cortou papel do tamanho da palma e ensinou a ordem: autor, assunto, data, estado.' },
  { t:'spr', ch:'klara', ex:'neutral', pos:'center' },
  { t:'dial', ch:'klara', tx:'Por que nessa ordem?' },
  { t:'dial', ch:'antoniette', tx:'Porque a pr\u00f3xima pessoa vai procurar por autor.' },
  { t:'dial', ch:'klara', tx:'E se n\u00e3o for?' },
  { t:'pause' },
  { t:'dial', ch:'antoniette', tx:'A\u00ed ela reclama, e a gente muda a ordem.' },
  { t:'nar', tx:'A menina achou isso engra\u00e7ado, o que Antoniette n\u00e3o esperava.' },

  { t:'nar', tx:'Em tr\u00eas semanas ela fazia quarenta fichas por manh\u00e3, com letra melhor que a de Ren.' },
  { t:'nar', tx:'Em dois meses parou de perguntar a ordem e come\u00e7ou a perguntar as exce\u00e7\u00f5es.' },
  { t:'pause' },
  { t:'inn', tx:'Ningu\u00e9m nesta casa nunca pediu a ela para pensar em voz alta.' },
  { t:'inn', tx:'Ela estava com fome disso.' },
{ t:'nar', tx:'Antoniette cortou mais papel do que precisava para aquela tarde, e guardou o resto na gaveta.' },

  { t:'scene', id:'c6a_fonte', chapter:'capitulo6', title:'Fonte \u00fanica' },
  { t:'nar', tx:'No ver\u00e3o do segundo ano, Antoniette ensinou a \u00fanica regra que importa.' },
{ t:'nar', tx:'Fazia calor de rachar e as duas trabalhavam com as mangas dobradas. O papel colava na palma da m\u00e3o.' },
  { t:'dial', ch:'antoniette', tx:'Uma pessoa disse. Isso n\u00e3o \u00e9 um fato. \u00c9 uma pessoa.' },
  { t:'spr', ch:'klara', ex:'neutral', pos:'center' },
  { t:'dial', ch:'klara', tx:'E se duas dizem?' },
  { t:'dial', ch:'antoniette', tx:'A\u00ed voc\u00ea pergunta se as duas ouviram da mesma.' },
  { t:'pause' },
  { t:'nar', tx:'Klara pensou nisso por um tempo desconfort\u00e1vel.' },
  { t:'dial', ch:'klara', tx:'Quase tudo \u00e9 uma pessoa, ent\u00e3o.' },
  { t:'dial', ch:'antoniette', tx:'Quase tudo.' },

  { t:'nar', tx:'A partir dali a menina passou a perguntar de onde as coisas vinham.' },
  { t:'nar', tx:'Perguntou a Dara de onde vinha a regra das oito horas.' },
  { t:'nar', tx:'Perguntou a Ren quem tinha mandado desviar das borboletas.' },
  { t:'pause' },
  { t:'nar', tx:'Perguntou \u00e0 m\u00e3e por que a feira de maio n\u00e3o servia para ela.' },
  { t:'inn', tx:'Eu n\u00e3o previ isso.' },
  { t:'inn', tx:'E n\u00e3o sei como n\u00e3o previ.' },

  { t:'scene', id:'c6a_caderno', chapter:'capitulo6', title:'O caderno dela',
    bg:'bg_corridor', bgm:null },
  { t:'nar', tx:'Em fevereiro do terceiro ano, Antoniette achou um caderno debaixo do colch\u00e3o da menina.' },
{ t:'nar', tx:'O quarto delas era o mais frio da casa e cheirava a l\u00e3 guardada.' },
  { t:'nar', tx:'N\u00e3o estava escondido de verdade. Estava guardado do jeito que crian\u00e7a guarda.' },
  { t:'pause' },

  { t:'arc', key:'caderno_klara', label:'\u2014 caderno de K. \u2014', lns:[
      'Feira de maio: mam\u00e3e diz sol. Elke diz sol. Elke ouviu da mam\u00e3e.',
      'Outubro: quatro dias. Ano passado quatro dias. Antes disso n\u00e3o sei.',
      'Perguntar ao Fenn quantos outubros. Fenn conta certo.',
      'A senhorita V. n\u00e3o pergunta de outubro. Por qu\u00ea?'
  ]},

  { t:'nar', tx:'Antoniette recolocou o caderno exatamente onde estava e alisou a colcha.' },
  { t:'pause' },
  { t:'inn', tx:'\u00daltima linha.' },
  { t:'inn', tx:'Ela aplicou em mim.' },
  { t:'pause' },
  { t:'inn', tx:'Eu ensinei a uma crian\u00e7a de dez anos a reparar em quem n\u00e3o pergunta.' },
  { t:'inn', tx:'E eu sou a pessoa desta casa que menos pergunta.' },

  { t:'nar', tx:'Naquela noite ela escreveu no caderno sem identifica\u00e7\u00e3o uma linha s\u00f3.' },
  { t:'arc', key:'sem_identificacao', label:'\u2014 caderno sem identifica\u00e7\u00e3o \u2014', lns:[
      'Fiz uma colega de uma crian\u00e7a de dez anos.'
  ]}
];

/* ==========================================================================
   RAMO B - A FORMA
   Ela ensina etiqueta, protocolo, como se portar numa sala hostil.
   Fim ruim: Serafina aprova. A menina ficou mais util para a casa.
   ========================================================================== */

var C6_FORMA = [
  { t:'scene', id:'c6b_visita', chapter:'capitulo6', title:'A visita',
    bg:'bg_main_hall', bgm:'bgm_nidhaus' },

  { t:'nar', tx:'Em junho a casa recebeu gente de fora pela primeira vez em dez meses. Um administrador de terras e a mulher.' },
  { t:'nar', tx:'Serafina mandou que as meninas descessem, o que significava que as meninas seriam olhadas.' },
  { t:'pause' },

  { t:'spr', ch:'klara', ex:'neutral', pos:'center' },
  { t:'dial', ch:'klara', tx:'O que eu falo?' },
  { t:'dial', ch:'antoniette', tx:'Nada, se puder. Quem fala primeiro entrega o assunto.' },
  { t:'dial', ch:'klara', tx:'E se perguntarem?' },
  { t:'dial', ch:'antoniette', tx:'Responde a pergunta feita. S\u00f3 ela. E devolve o olhar pelo tempo exato.' },
  { t:'pause' },
  { t:'dial', ch:'klara', tx:'Quanto \u00e9 o tempo exato?' },
  { t:'nar', tx:'Antoniette pensou em como se ensina isso e n\u00e3o achou jeito melhor.' },
  { t:'dial', ch:'antoniette', tx:'At\u00e9 voc\u00ea querer desviar. A\u00ed \u00e9 uma respira\u00e7\u00e3o a mais.' },

  { t:'scene', id:'c6b_jantar', chapter:'capitulo6', title:'O jantar' },
  { t:'nar', tx:'A mulher do administrador perguntou \u00e0s meninas se elas gostavam de estudar.' },
  { t:'spr', ch:'liara', ex:'neutral', pos:'right' },
  { t:'dial', ch:'liara', tx:'Eu gosto de montaria! E de mapa. E de contar hist\u00f3ria.' },
  { t:'pause' },
  { t:'spr', ch:'klara', ex:'neutral', pos:'center' },
  { t:'dial', ch:'klara', tx:'Gosto, senhora.' },
  { t:'nar', tx:'E devolveu o olhar por uma respira\u00e7\u00e3o a mais, e a mulher mudou de assunto.' },
  { t:'pause' },
  { t:'inn', tx:'Ela fez na primeira tentativa.' },

  { t:'nar', tx:'Nos dezoito meses seguintes a menina aprendeu a entrar numa sala e medir quem manda.' },
  { t:'nar', tx:'Aprendeu que a pessoa que serve o ch\u00e1 \u00e9 a que ouve tudo.' },
  { t:'nar', tx:'Aprendeu a agradecer antes de recusar, que \u00e9 o que faz a recusa passar.' },
  { t:'pause' },
  { t:'inn', tx:'Eu estou ensinando a ela o que a Ordem me ensinou.' },
  { t:'inn', tx:'A diferen\u00e7a \u00e9 que eu uso isso para trabalhar numa casa que n\u00e3o \u00e9 minha.' },

  { t:'scene', id:'c6b_aprovacao', chapter:'capitulo6', title:'A aprova\u00e7\u00e3o',
    bg:'bg_main_hall' },
  { t:'nar', tx:'Em mar\u00e7o do terceiro ano, Serafina a parou no corredor da galeria.' },
  { t:'spr', ch:'serafina', ex:'direct', pos:'right' },
  { t:'dial', ch:'serafina', tx:'A menina melhorou muito \u00e0 mesa.' },
  { t:'dial', ch:'antoniette', tx:'Ela aprende r\u00e1pido.' },
  { t:'pause' },
  { t:'spr', ch:'serafina', ex:'smirk', pos:'right' },
  { t:'dial', ch:'serafina', tx:'Ela aprendeu com algu\u00e9m.' },

  { t:'nar', tx:'Antoniette n\u00e3o respondeu, porque n\u00e3o havia resposta que servisse.' },
  { t:'dial', ch:'serafina', tx:'Isso vai ser \u00fatil para ela.' },
  { t:'pause' },
  { t:'dial', ch:'serafina', tx:'Obrigada.' },
  { t:'spr_hide', ch:'serafina' },
  { t:'nar', tx:'E subiu, do jeito que subia.' },

  { t:'pause' },
  { t:'inn', tx:'Ela me agradeceu.' },
  { t:'inn', tx:'"Isso vai ser \u00fatil para ela."' },
  { t:'pause' },
  { t:'inn', tx:'\u00datil para qu\u00ea.' },
  { t:'nar', tx:'Ela ficou no corredor da galeria por um tempo, na frente da moldura vazia.' },

  { t:'arc', key:'sem_identificacao', label:'\u2014 caderno sem identifica\u00e7\u00e3o \u2014', lns:[
      'A senhora da casa agradeceu o que eu estou ensinando \u00e0 menina.',
      'Ela n\u00e3o agradeceria se aquilo atrapalhasse o cronograma.'
  ]}
];

/* ==========================================================================
   RAMO C - O MUNDO
   A biblioteca inteira, os dragoes, o que existe fora de Nidhaus.
   Fim ruim: Klara descobre que existe um fora, e comeca a planejar.
   ========================================================================== */

var C6_MUNDO = [
  { t:'scene', id:'c6c_volume', chapter:'capitulo6', title:'O volume',
    bg:'bg_library', bgm:'bgm_nidhaus' },

  { t:'nar', tx:'Ela tirou da estante nordeste um volume de couro cansado e o pousou na mesa sem dizer nada.' },
  { t:'spr', ch:'klara', ex:'neutral', pos:'center' },
  { t:'dial', ch:'klara', tx:'\u00c9 sobre o qu\u00ea?' },
  { t:'dial', ch:'antoniette', tx:'Abre.' },
  { t:'pause' },

  { t:'nar', tx:'Gravuras de drag\u00e3o, em prancha dobrada, com escala humana ao lado para compara\u00e7\u00e3o.' },
  { t:'nar', tx:'O texto era em tr\u00eas l\u00ednguas e nenhuma delas era a da casa.' },
  { t:'dial', ch:'klara', tx:'Por que este?' },
  { t:'pause' },
  { t:'nar', tx:'Antoniette voltou para a pr\u00f3pria pilha e n\u00e3o respondeu.' },
  { t:'inn', tx:'Porque tem gravura grande e eu n\u00e3o sei explicar melhor do que isso.' },

  { t:'nar', tx:'A menina levou quatro meses para atravessar o volume, com dicion\u00e1rio.' },
  { t:'nar', tx:'Terminou e voltou ao come\u00e7o.' },
  { t:'pause' },
  { t:'dial', ch:'klara', tx:'Eles n\u00e3o atacam quem n\u00e3o os desafia.' },
  { t:'dial', ch:'antoniette', tx:'\u00c9 o que o livro diz.' },
  { t:'dial', ch:'klara', tx:'E eles cumprem a palavra. Est\u00e1 aqui. Duas vezes.' },
  { t:'pause' },
  { t:'nar', tx:'Ela apontou a linha com o dedo, e o dedo ficou ali um tempo.' },

  { t:'scene', id:'c6c_fora', chapter:'capitulo6', title:'O que existe fora',
    bg:'bg_library', bgm:null },
  { t:'nar', tx:'Depois do volume vieram os outros. Rotas de com\u00e9rcio, pra\u00e7as de cidade, a planta de uma universidade.' },
  { t:'nar', tx:'Antoniette catalogava e ia empurrando os que servissem para o lado da mesa onde a menina sentava.' },
  { t:'pause' },
  { t:'nar', tx:'Nunca disse por que aqueles. A menina nunca perguntou de novo.' },

  { t:'spr', ch:'klara', ex:'neutral', pos:'center' },
  { t:'dial', ch:'klara', tx:'Lervel \u00e9 longe?' },
  { t:'dial', ch:'antoniette', tx:'Tr\u00eas dias de carruagem, se o tempo ajudar.' },
  { t:'pause' },
  { t:'dial', ch:'klara', tx:'Tr\u00eas dias \u00e9 pouco.' },
  { t:'nar', tx:'Antoniette parou de escrever.' },
  { t:'pause' },
  { t:'dial', ch:'klara', tx:'A senhorita veio em tr\u00eas dias.' },
  { t:'dial', ch:'antoniette', tx:'Vim.' },
  { t:'dial', ch:'klara', tx:'Ent\u00e3o d\u00e1.' },

  { t:'scene', id:'c6c_conta', chapter:'capitulo6', title:'A conta dela',
    bg:'bg_corridor' },
  { t:'nar', tx:'Em abril do terceiro ano, Liara contou de gra\u00e7a, no meio de outra conversa.' },
  { t:'spr', ch:'liara', ex:'neutral', pos:'right' },
  { t:'dial', ch:'liara', tx:'A Klara est\u00e1 guardando p\u00e3o.' },
  { t:'dial', ch:'antoniette', tx:'Guardando por qu\u00ea?' },
  { t:'dial', ch:'liara', tx:'Ela n\u00e3o fala. Guarda no arm\u00e1rio, embrulhado.' },
  { t:'pause' },
  { t:'dial', ch:'liara', tx:'Fica duro e ela joga fora e guarda outro.' },
  { t:'spr_hide', ch:'liara' },

  { t:'pause' },
  { t:'inn', tx:'Ela est\u00e1 treinando o que se leva.' },
  { t:'inn', tx:'Dez anos.' },
  { t:'pause' },
  { t:'inn', tx:'E n\u00e3o pediu ajuda a ningu\u00e9m, porque n\u00e3o sabe que se pode pedir.' },

  { t:'nar', tx:'Antoniette n\u00e3o falou nada sobre o p\u00e3o, naquela semana nem nas seguintes.' },

  { t:'arc', key:'sem_identificacao', label:'\u2014 caderno sem identifica\u00e7\u00e3o \u2014', lns:[
      'Ela sabe que existe um fora, e sabe a dist\u00e2ncia em dias.',
      'Aprendeu as duas coisas comigo.',
      'Guardar p\u00e3o \u00e9 o come\u00e7o de um plano feito por quem nunca viu um plano.'
  ]}
];

RBF.CHAPTER6 = [

{ t:'chap', num:'CAP\u00cdTULO 6', name:'UMA AMIZADE', chapter:'capitulo6' },
{ t:'fade_out' },

/* ======================================================================
   C1 - A INVESTIGACAO PARA
   O jogador precisa SENTIR que parou. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c6_parada', chapter:'capitulo6', title:'O que ela deixou de fazer',
  bg:'bg_antoniette_room', bgm:'bgm_nidhaus' },
{ t:'fade_in' },

{ t:'nar', tx:'Em mar\u00e7o do segundo ano, o caderno operacional passou nove dias sem entrada nova.' },
{ t:'nar', tx:'Foi o intervalo mais longo desde a chegada. O anterior tinha sido de dois.' },
{ t:'pause' },

{ t:'nar', tx:'Ela reparou no nono dia, ao abrir para anotar outra coisa.' },
{ t:'inn', tx:'Nove.' },
{ t:'nar', tx:'Escreveu o n\u00famero na margem e olhou para ele.' },
{ t:'pause' },

{ t:'inn', tx:'A ala norte tem uma pessoa na frente da chave.' },
{ t:'inn', tx:'For\u00e7ar de novo em menos de um ano me tira daqui.' },
{ t:'pause' },
{ t:'inn', tx:'Isso \u00e9 verdade e \u00e9 o que eu vou escrever no relat\u00f3rio.' },
{ t:'nar', tx:'Ela escreveu exatamente isso e fechou o caderno.' },

/* Le a escolha do Capitulo 5. */
{ t:'nar', tx:'Klara aparecia na biblioteca de manh\u00e3 e ficava at\u00e9 o almo\u00e7o, sem pedir licen\u00e7a.',
  if:{ told_klara:'C' } },
{ t:'nar', tx:'Klara voltou a aparecer na biblioteca depois dos nove dias, e nenhuma das duas comentou os nove dias.',
  if:{ told_klara:'A' } },
{ t:'nar', tx:'Klara aparecia na biblioteca de manh\u00e3 e nunca mais mencionou a ala norte.',
  if:{ told_klara:'B' } },

{ t:'nar', tx:'Sentava do outro lado da mesa, com um livro dela, e passava horas sem falar.' },
{ t:'pause' },
{ t:'inn', tx:'Ela n\u00e3o pede nada. S\u00f3 ocupa a cadeira.' },
{ t:'inn', tx:'E eu trabalho melhor com ela ali, o que \u00e9 um dado que eu n\u00e3o vou registrar.' },

/* ======================================================================
   C2 - O PADRAO
   Dezoito meses comecam a se formar. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c6_padrao', chapter:'capitulo6', title:'O padr\u00e3o',
  bg:'bg_library', bgm:'bgm_amizade' },

{ t:'nar', tx:'Em maio j\u00e1 era rotina. As duas de manh\u00e3, na biblioteca, cada uma no seu lado da mesa.' },
{ t:'nar', tx:'Klara respirava pela boca quando lia r\u00e1pido. Era o \u00fanico barulho da sala durante horas.' },
{ t:'nar', tx:'Liara aparecia por volta das onze, falava dezessete minutos e ia embora.' },
{ t:'pause' },
{ t:'nar', tx:'Antoniette come\u00e7ou a contar os dezessete minutos e depois parou de contar.' },

{ t:'nar', tx:'Em julho a menina trouxe a pr\u00f3pria cadeira do quarto, porque a da biblioteca era alta.' },
{ t:'nar', tx:'Ningu\u00e9m na casa comentou a cadeira. A cadeira ficou.' },
{ t:'pause' },

{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'dial', ch:'klara', tx:'A senhorita fica quanto tempo ainda?' },
{ t:'dial', ch:'antoniette', tx:'O contrato era de nove meses. J\u00e1 passou de um ano.' },
{ t:'dial', ch:'klara', tx:'N\u00e3o foi isso que eu perguntei.' },
{ t:'pause' },
{ t:'nar', tx:'Antoniette olhou para a pilha de volumes por catalogar, que era grande e ia continuar grande.' },
{ t:'dial', ch:'antoniette', tx:'Enquanto tiver trabalho.' },
{ t:'spr_hide', ch:'klara' },
{ t:'nar', tx:'A menina aceitou a resposta e voltou para o livro.' },
{ t:'pause' },
{ t:'inn', tx:'Eu acabei de prometer uma coisa que eu n\u00e3o controlo.' },
{ t:'inn', tx:'E ela ouviu como promessa.' },
{ t:'nar', tx:'No dia seguinte havia duas canecas na mesa antes de Klara chegar, e nenhuma das duas comentou.' },

/* ======================================================================
   C3 - A ESCOLHA
   Cedo de proposito: o ramo carrega o capitulo, e nao o contrario.
   Ordem de exibicao B C A. Os tres somam 4 pontos de rota e nenhum e
   o "certo". (Finley, favoritismo de ramo)
   ====================================================================== */
{ t:'scene', id:'c6_escolha', chapter:'capitulo6', title:'O que ensinar',
  bg:'bg_library', bgm:null },

{ t:'nar', tx:'No fim de maio a menina perguntou uma coisa que Antoniette levou tr\u00eas dias para responder.' },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'dial', ch:'klara', tx:'A senhorita pode me ensinar alguma coisa?' },
{ t:'dial', ch:'antoniette', tx:'A senhora Elke ensina.' },
{ t:'dial', ch:'klara', tx:'A senhora Elke ensina o que eu preciso saber.' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'N\u00e3o \u00e9 a mesma coisa.' },
{ t:'spr_hide', ch:'klara' },

{ t:'nar', tx:'Ela levou tr\u00eas dias porque tr\u00eas dias foi o tempo de admitir que ia dizer sim.' },
{ t:'pause' },
{ t:'inn', tx:'Uma preceptora n\u00e3o faz isso. Uma catalogadora contratada muito menos.' },
{ t:'inn', tx:'E o que eu escolher ensinar vai ficar.' },

{ t:'cho', id:'cap6_ensino', code:'C-VI', prompt:'O QUE ENSINAR', opts:[
  { id:'B',
    tx:'A forma. Etiqueta, protocolo, como atravessar uma sala que est\u00e1 medindo voc\u00ea.',
    flags:{ taught:'B' },
    routes:{ hope: 2, loss: 2 },
    then: C6_FORMA },
  { id:'C',
    tx:'O mundo. A biblioteca inteira, e o que existe fora desta casa.',
    flags:{ taught:'C' },
    routes:{ hope: 3, loss: 1 },
    then: C6_MUNDO },
  { id:'A',
    tx:'O m\u00e9todo. Catalogar, conferir, e nunca acreditar em fonte \u00fanica.',
    flags:{ taught:'A' },
    routes:{ hope: 2, answer: 2 },
    then: C6_METODO }
]},

/* ======================================================================
   C-FIM - JULHO DO ANO 3
   Cena unica lida de tres jeitos. Ponte para o Capitulo 7, que e a pivo.
   ====================================================================== */
{ t:'scene', id:'c6_julho', chapter:'capitulo6', title:'Julho',
  bg:'bg_corridor', bgm:'bgm_amizade' },

{ t:'nar', tx:'Em julho do terceiro ano Antoniette completou vinte e sete meses em Velha Nidhaus.' },
{ t:'nar', tx:'O contrato era de nove. Ningu\u00e9m tinha mencionado o contrato havia mais de um ano.' },
{ t:'pause' },

{ t:'nar', tx:'A biblioteca estava catalogada at\u00e9 a terceira estante do lado norte. Faltava um quinto do total.' },
{ t:'inn', tx:'Trabalhando neste ritmo, sobra um ano.' },
{ t:'pause' },
{ t:'inn', tx:'Eu podia ter feito em dezoito meses.' },
{ t:'nar', tx:'Ela sabia disso havia algum tempo e nunca tinha escrito a frase.' },

{ t:'nar', tx:'\u00c0 tarde, as duas meninas estavam sentadas no degrau do corredor leste, uma encostada na outra.' },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'spr', ch:'liara', ex:'neutral', pos:'right' },

{ t:'dial', ch:'liara', tx:'Faz de novo.' },
{ t:'dial', ch:'klara', tx:'Voc\u00ea j\u00e1 sabe o final.' },
{ t:'dial', ch:'liara', tx:'Faz assim mesmo.' },
{ t:'pause' },

{ t:'nar', tx:'E ela fez de novo \u2014 a lista de confer\u00eancia, item por item, do jeito que Antoniette ensinou.', if:{ taught:'A' } },
{ t:'nar', tx:'Liara errava de prop\u00f3sito s\u00f3 para a irm\u00e3 corrigir.', if:{ taught:'A' } },

{ t:'nar', tx:'E ela fez de novo \u2014 a mesura, o cumprimento, a frase de recusa que passa.', if:{ taught:'B' } },
{ t:'nar', tx:'Liara ria alto no meio e estragava, e as duas recome\u00e7avam.', if:{ taught:'B' } },

{ t:'nar', tx:'E ela fez de novo \u2014 o drag\u00e3o de asa curta do norte, a envergadura, o que ele come.', if:{ taught:'C' } },
{ t:'nar', tx:'Liara perguntava se ele era maior que a casa, todas as vezes.', if:{ taught:'C' } },

{ t:'spr_hide', ch:'klara' },
{ t:'spr_hide', ch:'liara' },
{ t:'pause' },

{ t:'nar', tx:'Antoniette ficou no fim do corredor at\u00e9 elas se cansarem, e n\u00e3o anotou nada.' },
{ t:'pause' },
{ t:'inn', tx:'Vinte e sete meses.' },
{ t:'inn', tx:'Em agosto faz tr\u00eas anos que eu cheguei.' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Dezoito meses em Velha Nidhaus.', line2:'Foi o \u00fanico tempo bom, e ela gastou inteiro.',
  chapter:'capitulo6' },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.CHAPTER6; }
