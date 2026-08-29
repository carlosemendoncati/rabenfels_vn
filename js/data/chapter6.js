/* ==========================================================================
   ARQUIVO RABENFELS - js/data/chapter6.js
   CAPITULO 6: "Uma Amizade"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.

   QUANDO: Ano 2 (primavera) ate Ano 3 (julho). Dezoito meses.
   Klara e Liara passam de nove para dez anos.

   O PENSAMENTO UNICO DESTE CAPITULO (Zinsser, unidade):
   "Foram felizes, e e isso que torna o resto insuportavel."

   A TROCA (docs/biblia_narrativa_rabenfels.md):
   Ela ganha a confianca das duas meninas.
   Entrega O RELOGIO. A amizade e o que a faz devagar.
   "Fui metodica. Fui devagar. Foi o devagar que custou."

   =========================================================================
   ESTE E O UNICO CAPITULO QUE RAMIFICA DE VERDADE.
   Decisao do autor em 26/07/2026, preservada nesta implementacao.

   Nao ramifica enredo - ramifica QUEM KLARA VIRA. Os mesmos dezoito
   meses, tres substancias diferentes, cada uma semeando um traco da
   tabela de "Onde Klara chega" (docs/biblia_narrativa_rabenfels.md).

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
  { t:'dial', ch:'antoniette', tx:'Porque a próxima pessoa vai procurar por autor.' },
  { t:'dial', ch:'klara', tx:'E se não for?' },
  { t:'pause' },
  { t:'dial', ch:'antoniette', tx:'Aí ela reclama, e a gente muda a ordem.' },
  { t:'nar', tx:'A menina achou isso engraçado, o que Antoniette não esperava.' },

  { t:'nar', tx:'Em três semanas ela fazia quarenta fichas por manhã, com letra melhor que a de Ren.' },
  { t:'nar', tx:'Em dois meses parou de perguntar a ordem e começou a perguntar as exceções.' },
  { t:'pause' },
  { t:'inn', tx:'Ninguém nesta casa nunca pediu a ela para pensar em voz alta.' },
  { t:'inn', tx:'Ela estava com fome disso.' },
{ t:'nar', tx:'Antoniette cortou mais papel do que precisava para aquela tarde, e guardou o resto na gaveta.' },

  { t:'scene', id:'c6a_fonte', chapter:'capitulo6', title:'Fonte única' },
  { t:'nar', tx:'No verão do segundo ano, Antoniette ensinou a única regra que importa.' },
{ t:'nar', tx:'Fazia calor de rachar e as duas trabalhavam com as mangas dobradas. O papel colava na palma da mão.' },
  { t:'dial', ch:'antoniette', tx:'Uma pessoa disse. Isso não é um fato. É uma pessoa.' },
  { t:'spr', ch:'klara', ex:'neutral', pos:'center' },
  { t:'dial', ch:'klara', tx:'E se duas dizem?' },
  { t:'dial', ch:'antoniette', tx:'Aí você pergunta se as duas ouviram da mesma.' },
  { t:'pause' },
  { t:'nar', tx:'Klara levou cinco respirações. Na quarta, franziu a testa.' },
  { t:'dial', ch:'klara', tx:'Quase tudo é uma pessoa, então.' },
  { t:'dial', ch:'antoniette', tx:'Quase tudo.' },

  { t:'nar', tx:'A partir dali a menina passou a perguntar de onde as coisas vinham.' },
  { t:'nar', tx:'Perguntou a Dara de onde vinha a regra das oito horas.' },
  { t:'nar', tx:'Perguntou a Ren quem tinha mandado desviar das borboletas.' },
  { t:'pause' },
  { t:'nar', tx:'Perguntou à mãe por que a feira de maio não servia para ela.' },
  { t:'inn', tx:'Eu não previ isso.' },
  { t:'inn', tx:'E não sei como não previ.' },

  { t:'scene', id:'c6a_caderno', chapter:'capitulo6', title:'O caderno dela',
    bg:'bg_corridor', bgm:null },
  { t:'nar', tx:'Em fevereiro do terceiro ano, Antoniette achou um caderno debaixo do colchão da menina.' },
{ t:'nar', tx:'O quarto delas era o mais frio da casa e cheirava a lã guardada.' },
  { t:'nar', tx:'Uma quina aparecia quando a colcha era puxada. Era o esconderijo de uma criança.' },
  { t:'pause' },

  { t:'arc', key:'caderno_klara', label:'— caderno de K. —', lns:[
      'Feira de maio: mamãe diz sol. Elke diz sol. Elke ouviu da mamãe.',
      'Outubro: quatro dias. Ano passado quatro dias. Antes disso não sei.',
      'Perguntar ao Fenn quantos outubros. Fenn conta certo.',
      'A senhorita V. não pergunta de outubro. Por quê?'
  ]},

  { t:'nar', tx:'Antoniette recolocou o caderno na marca rasa do colchão e alisou a colcha.' },
  { t:'pause' },
  { t:'inn', tx:'Última linha.' },
  { t:'inn', tx:'Ela aplicou em mim.' },
  { t:'pause' },
  { t:'inn', tx:'Eu ensinei a uma criança de dez anos a reparar em quem não pergunta.' },
  { t:'inn', tx:'E eu sou a pessoa desta casa que menos pergunta.' },

  { t:'nar', tx:'Naquela noite ela escreveu no caderno sem identificação uma linha só.' },
  { t:'arc', key:'sem_identificacao', label:'— caderno sem identificação —', lns:[
      'Fiz uma colega de uma criança de dez anos.'
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

  { t:'nar', tx:'Em junho a casa recebeu a primeira visita em dez meses: um administrador de terras e a mulher.' },
  { t:'nar', tx:'Serafina mandou que as meninas descessem, o que significava que as meninas seriam olhadas.' },
  { t:'pause' },

  { t:'spr', ch:'klara', ex:'neutral', pos:'center' },
  { t:'dial', ch:'klara', tx:'O que eu falo?' },
  { t:'dial', ch:'antoniette', tx:'Nada, se puder. Quem fala primeiro entrega o assunto.' },
  { t:'dial', ch:'klara', tx:'E se perguntarem?' },
  { t:'dial', ch:'antoniette', tx:'Responde a pergunta feita. Só ela. E devolve o olhar pelo tempo exato.' },
  { t:'pause' },
  { t:'dial', ch:'klara', tx:'Quanto é o tempo exato?' },
  { t:'nar', tx:'Antoniette procurou uma medida que coubesse em número.' },
  { t:'dial', ch:'antoniette', tx:'Até você querer desviar. Aí é uma respiração a mais.' },

  { t:'scene', id:'c6b_jantar', chapter:'capitulo6', title:'O jantar' },
  { t:'nar', tx:'A mulher do administrador perguntou às meninas se elas gostavam de estudar.' },
  { t:'spr', ch:'liara', ex:'neutral', pos:'right' },
  { t:'dial', ch:'liara', tx:'Eu gosto de montaria! E de mapa. E de contar história.' },
  { t:'pause' },
  { t:'spr', ch:'klara', ex:'neutral', pos:'center' },
  { t:'dial', ch:'klara', tx:'Gosto, senhora.' },
  { t:'nar', tx:'E devolveu o olhar por uma respiração a mais, e a mulher mudou de assunto.' },
  { t:'pause' },
  { t:'inn', tx:'Ela fez na primeira tentativa.' },

  { t:'nar', tx:'Nos dezoito meses seguintes a menina aprendeu a entrar numa sala e medir quem manda.' },
  { t:'nar', tx:'Aprendeu que a pessoa que serve o chá é a que ouve tudo.' },
  { t:'nar', tx:'Aprendeu a agradecer antes de recusar, que é o que faz a recusa passar.' },
  { t:'pause' },
  { t:'inn', tx:'Eu estou ensinando a ela o que a Ordem me ensinou.' },
  { t:'inn', tx:'A diferença é que eu uso isso para trabalhar numa casa que não é minha.' },

  { t:'scene', id:'c6b_aprovacao', chapter:'capitulo6', title:'A aprovação',
    bg:'bg_main_hall' },
  { t:'nar', tx:'Em março do terceiro ano, Serafina a parou no corredor da galeria.' },
  { t:'spr', ch:'serafina', ex:'direct', pos:'right' },
  { t:'dial', ch:'serafina', tx:'A menina melhorou muito à mesa.' },
  { t:'dial', ch:'antoniette', tx:'Ela aprende rápido.' },
  { t:'pause' },
  { t:'spr', ch:'serafina', ex:'smirk', pos:'right' },
  { t:'dial', ch:'serafina', tx:'Ela aprendeu com alguém.' },

  { t:'nar', tx:'Antoniette não respondeu, porque não havia resposta que servisse.' },
  { t:'dial', ch:'serafina', tx:'Isso vai ser útil para ela.' },
  { t:'pause' },
  { t:'dial', ch:'serafina', tx:'Obrigada.' },
  { t:'spr_hide', ch:'serafina' },
  { t:'nar', tx:'Serafina recolheu a saia e subiu sem olhar para trás.' },

  { t:'pause' },
  { t:'inn', tx:'Ela me agradeceu.' },
  { t:'inn', tx:'"Isso vai ser útil para ela."' },
  { t:'pause' },
  { t:'inn', tx:'Útil para quê.' },
  { t:'nar', tx:'Ela ficou diante da moldura vazia até ouvir a porta de Serafina fechar no andar de cima.' },

  { t:'arc', key:'sem_identificacao', label:'— caderno sem identificação —', lns:[
      'A senhora da casa agradeceu o que eu estou ensinando à menina.',
      'Ela não agradeceria se aquilo atrapalhasse o cronograma.'
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
  { t:'dial', ch:'klara', tx:'É sobre o quê?' },
  { t:'dial', ch:'antoniette', tx:'Abre.' },
  { t:'pause' },

  { t:'nar', tx:'Gravuras de dragão, em prancha dobrada, com escala humana ao lado para comparação.' },
  { t:'nar', tx:'O texto era em três línguas e nenhuma delas era a da casa.' },
  { t:'dial', ch:'klara', tx:'Por que este?' },
  { t:'pause' },
  { t:'nar', tx:'Antoniette voltou para a própria pilha e não respondeu.' },
  { t:'inn', tx:'Porque tem gravura grande e eu não sei explicar melhor do que isso.' },

  { t:'nar', tx:'A menina levou quatro meses para atravessar o volume, com dicionário.' },
  { t:'nar', tx:'Terminou e voltou ao começo.' },
  { t:'pause' },
  { t:'dial', ch:'klara', tx:'Eles não atacam quem não os desafia.' },
  { t:'dial', ch:'antoniette', tx:'É o que o livro diz.' },
  { t:'dial', ch:'klara', tx:'E eles cumprem a palavra. Está aqui. Duas vezes.' },
  { t:'pause' },
  { t:'nar', tx:'Ela apontou a linha com o dedo, e o dedo ficou ali um tempo.' },

  { t:'scene', id:'c6c_fora', chapter:'capitulo6', title:'O que existe fora',
    bg:'bg_library', bgm:null },
  { t:'nar', tx:'Depois do volume vieram os outros. Rotas de comércio, praças de cidade, a planta de uma universidade.' },
  { t:'nar', tx:'Antoniette catalogava e ia empurrando os que servissem para o lado da mesa onde a menina sentava.' },
  { t:'pause' },
  { t:'nar', tx:'Nunca disse por que aqueles. A menina nunca perguntou de novo.' },

  { t:'spr', ch:'klara', ex:'neutral', pos:'center' },
  { t:'dial', ch:'klara', tx:'Lervel é longe?' },
  { t:'dial', ch:'antoniette', tx:'Três dias de carruagem, se o tempo ajudar.' },
  { t:'pause' },
  { t:'dial', ch:'klara', tx:'Três dias é pouco.' },
  { t:'nar', tx:'Antoniette parou de escrever.' },
  { t:'pause' },
  { t:'dial', ch:'klara', tx:'A senhorita veio em três dias.' },
  { t:'dial', ch:'antoniette', tx:'Vim.' },
  { t:'dial', ch:'klara', tx:'Então dá.' },

  { t:'scene', id:'c6c_conta', chapter:'capitulo6', title:'A conta dela',
    bg:'bg_corridor' },
  { t:'nar', tx:'Em abril do terceiro ano, Liara contou de graça, no meio de outra conversa.' },
  { t:'spr', ch:'liara', ex:'neutral', pos:'right' },
  { t:'dial', ch:'liara', tx:'A Klara está guardando pão.' },
  { t:'dial', ch:'antoniette', tx:'Guardando por quê?' },
  { t:'dial', ch:'liara', tx:'Ela não fala. Guarda no armário, embrulhado.' },
  { t:'pause' },
  { t:'dial', ch:'liara', tx:'Fica duro e ela joga fora e guarda outro.' },
  { t:'spr_hide', ch:'liara' },

  { t:'pause' },
  { t:'inn', tx:'Ela está treinando o que se leva.' },
  { t:'inn', tx:'Dez anos.' },
  { t:'pause' },
  { t:'inn', tx:'E não pediu ajuda a ninguém, porque não sabe que se pode pedir.' },

  { t:'nar', tx:'Antoniette não falou nada sobre o pão, naquela semana nem nas seguintes.' },

  { t:'arc', key:'sem_identificacao', label:'— caderno sem identificação —', lns:[
      'Ela sabe que existe um fora, e sabe a distância em dias.',
      'Aprendeu as duas coisas comigo.',
      'Guardar pão é o começo de um plano feito por quem nunca viu um plano.'
  ]}
];

RBF.CHAPTER6 = [

{ t:'chap', num:'CAPÍTULO 6', name:'UMA AMIZADE', chapter:'capitulo6' },
{ t:'fade_out' },

/* ======================================================================
   C1 - A INVESTIGACAO PARA
   O jogador precisa SENTIR que parou. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c6_parada', chapter:'capitulo6', title:'O que ela deixou de fazer',
  bg:'bg_antoniette_room', bgm:'bgm_nidhaus' },
{ t:'fade_in' },

{ t:'nar', tx:'Em março do segundo ano, o caderno operacional passou nove dias sem entrada nova.' },
{ t:'nar', tx:'Foi o intervalo mais longo desde a chegada. O anterior tinha sido de dois.' },
{ t:'pause' },

{ t:'nar', tx:'Ela reparou no nono dia, ao abrir para anotar outra coisa.' },
{ t:'inn', tx:'Nove.' },
{ t:'nar', tx:'Escreveu o número na margem e olhou para ele.' },
{ t:'pause' },

{ t:'inn', tx:'A ala norte tem uma pessoa na frente da chave.' },
{ t:'inn', tx:'Forçar de novo em menos de um ano me tira daqui.' },
{ t:'pause' },
{ t:'inn', tx:'Isso é verdade e é o que eu vou escrever no relatório.' },
{ t:'nar', tx:'Copiou as duas frases sem tirar uma palavra e fechou o caderno.' },

/* Le a escolha do Capitulo 5. */
{ t:'nar', tx:'Klara aparecia na biblioteca de manhã e ficava até o almoço, sem pedir licença.',
  if:{ told_klara:'C' } },
{ t:'nar', tx:'Klara voltou a aparecer na biblioteca depois dos nove dias, e nenhuma das duas comentou os nove dias.',
  if:{ told_klara:'A' } },
{ t:'nar', tx:'Klara aparecia na biblioteca de manhã e nunca mais mencionou a ala norte.',
  if:{ told_klara:'B' } },

{ t:'nar', tx:'Sentava do outro lado da mesa, com um livro dela, e passava horas sem falar.' },
{ t:'pause' },
{ t:'inn', tx:'Ela não pede nada. Só ocupa a cadeira.' },
{ t:'inn', tx:'E eu trabalho melhor com ela ali, o que é um dado que eu não vou registrar.' },

/* ======================================================================
   C2 - O PADRAO
   Dezoito meses comecam a se formar. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c6_padrao', chapter:'capitulo6', title:'O padrão',
  bg:'bg_library', bgm:'bgm_amizade' },

{ t:'nar', tx:'Em maio já era rotina. As duas de manhã, na biblioteca, cada uma no seu lado da mesa.' },
{ t:'nar', tx:'Klara respirava pela boca quando lia rápido. Era o único barulho da sala durante horas.' },
{ t:'nar', tx:'Liara aparecia por volta das onze, falava dezessete minutos e ia embora.' },
{ t:'pause' },
{ t:'nar', tx:'Antoniette começou a contar os dezessete minutos e depois parou de contar.' },

{ t:'nar', tx:'Em julho a menina trouxe a própria cadeira do quarto, porque a da biblioteca era alta.' },
{ t:'nar', tx:'Ninguém na casa comentou a cadeira. A cadeira ficou.' },
{ t:'pause' },

{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'dial', ch:'klara', tx:'A senhorita fica quanto tempo ainda?' },
{ t:'dial', ch:'antoniette', tx:'O contrato era de nove meses. Já passou de um ano.' },
{ t:'dial', ch:'klara', tx:'Não foi isso que eu perguntei.' },
{ t:'pause' },
{ t:'nar', tx:'Antoniette olhou para a pilha de volumes por catalogar, que era grande e ia continuar grande.' },
{ t:'dial', ch:'antoniette', tx:'Enquanto tiver trabalho.' },
{ t:'spr_hide', ch:'klara' },
{ t:'nar', tx:'A menina aceitou a resposta e voltou para o livro.' },
{ t:'pause' },
{ t:'inn', tx:'Eu acabei de prometer uma coisa que eu não controlo.' },
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

{ t:'nar', tx:'No fim de maio a menina perguntou uma coisa que Antoniette levou três dias para responder.' },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'dial', ch:'klara', tx:'A senhorita pode me ensinar alguma coisa?' },
{ t:'dial', ch:'antoniette', tx:'A senhora Elke ensina.' },
{ t:'dial', ch:'klara', tx:'A senhora Elke ensina o que eu preciso saber.' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'Não é a mesma coisa.' },
{ t:'spr_hide', ch:'klara' },

{ t:'nar', tx:'Ela levou três dias porque três dias foi o tempo de admitir que ia dizer sim.' },
{ t:'pause' },
{ t:'inn', tx:'Uma preceptora não faz isso. Uma catalogadora contratada muito menos.' },
{ t:'inn', tx:'E o que eu escolher ensinar vai ficar.' },

{ t:'cho', id:'cap6_ensino', code:'C-VI', prompt:'O QUE ENSINAR', opts:[
  { id:'B',
    tx:'A forma. Etiqueta, protocolo, como atravessar uma sala que está medindo você.',
    flags:{ taught:'B' },
    routes:{ hope: 2, loss: 2 },
    then: C6_FORMA },
  { id:'C',
    tx:'O mundo. A biblioteca inteira, e o que existe fora desta casa.',
    flags:{ taught:'C' },
    routes:{ hope: 3, loss: 1 },
    then: C6_MUNDO },
  { id:'A',
    tx:'O método. Catalogar, conferir, e nunca acreditar em fonte única.',
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
{ t:'nar', tx:'O contrato era de nove. Ninguém tinha mencionado o contrato havia mais de um ano.' },
{ t:'pause' },

{ t:'nar', tx:'A biblioteca estava catalogada até a terceira estante do lado norte. Faltava um quinto do total.' },
{ t:'inn', tx:'Trabalhando neste ritmo, sobra um ano.' },
{ t:'pause' },
{ t:'inn', tx:'Eu podia ter feito em dezoito meses.' },
{ t:'nar', tx:'A frase a acompanhava havia semanas. Era a primeira vez no papel.' },

{ t:'nar', tx:'À tarde, as duas meninas estavam sentadas no degrau do corredor leste, uma encostada na outra.' },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'spr', ch:'liara', ex:'neutral', pos:'right' },

{ t:'dial', ch:'liara', tx:'Faz de novo.' },
{ t:'dial', ch:'klara', tx:'Você já sabe o final.' },
{ t:'dial', ch:'liara', tx:'Faz assim mesmo.' },
{ t:'pause' },

{ t:'nar', tx:'E ela fez de novo — a lista de conferência, item por item, na ordem que Antoniette ensinou.', if:{ taught:'A' } },
{ t:'nar', tx:'Liara errava de propósito só para a irmã corrigir.', if:{ taught:'A' } },

{ t:'nar', tx:'E ela fez de novo — a mesura, o cumprimento, a frase de recusa que passa.', if:{ taught:'B' } },
{ t:'nar', tx:'Liara ria alto no meio e estragava, e as duas recomeçavam.', if:{ taught:'B' } },

{ t:'nar', tx:'E ela fez de novo — o dragão de asa curta do norte, a envergadura, o que ele come.', if:{ taught:'C' } },
{ t:'nar', tx:'Liara perguntava se ele era maior que a casa, todas as vezes.', if:{ taught:'C' } },

{ t:'spr_hide', ch:'klara' },
{ t:'spr_hide', ch:'liara' },
{ t:'pause' },

{ t:'nar', tx:'Antoniette ficou no fim do corredor até elas se cansarem, e não anotou nada.' },
{ t:'pause' },
{ t:'inn', tx:'Vinte e sete meses.' },
{ t:'inn', tx:'Em agosto começa o terceiro ciclo que eu registro.' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Dezoito meses em Velha Nidhaus.', line2:'Foi o único tempo bom, e ela gastou inteiro.',
  chapter:'capitulo6' },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.CHAPTER6; }
