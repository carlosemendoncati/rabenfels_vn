/* ==========================================================================
   ARQUIVO RABENFELS - js/data/chapter7.js
   CAPITULO 7: "Agosto"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.

   QUANDO: Ano 3, agosto. Klara e Liara tem dez anos.
   SEGUNDAS BORBOLETAS. As primeiras foram no Cap. 3, as terceiras no 10.

   =========================================================================
   >>> ESTA E A CENA PIVO DA OBRA. <<<
   Frey: no Ato III o protagonista tem mudanca de psicologia. A obra nao
   tinha esse ponto marcado, e a biblia v2 chutava o Capitulo 5.

   Estava errado, e o motivo importa: a camara e INFORMACAO. Ver Khar'Vel
   aflorar dentro de Klara - na menina com quem ela ja convive ha dois
   anos - e a coisa ficando REAL numa pessoa. So a segunda e morte e
   renascimento.

   ANTES deste capitulo: Antoniette e uma arquivista que tem um sujeito.
   DEPOIS: e uma pessoa que tem uma crianca e um prazo.

   OBRIGACOES DOS CAPITULOS 8 A 11 A PARTIR DAQUI:
   - menos metodo, mais pressa
   - o habito de comer em pe vira comer nada. Ninguem comenta.
   - o relatorio mente por omissao, e ela sabe
   =========================================================================

   O PENSAMENTO UNICO (Zinsser, unidade):
   "A coisa esta dentro dela, e esta crescendo no ritmo certo."

   A TROCA (docs/estrutura_v1.md):
   Ela ganha a certeza.
   Entrega A MISSAO. Daqui em diante todo relatorio mente.

   REVELACAO 10 da arquitetura da informacao: Khar'Vel ja aflorou em Klara.
   NAO PODE VAZAR AQUI: Serafina saber quem ela e (Cap. 8), a antecessora
   (Cap. 8), o cronograma do apice (Cap. 8), o nome Carmine (nunca na obra).
   Ela VE. Nao entende o mecanismo e nao recebe explicacao de ninguem.

   PRIMEIRA LEITURA DE 'taught' (Cap. 6, ramificacao estrutural):
   o que Klara FAZ quando aflora muda conforme o que ela aprendeu.
   A - o metodo:  ela REGISTRA o proprio episodio. Anota a duracao.
   B - a forma:   ela PEDE DESCULPA. Recompoe a postura antes de tudo.
   C - o mundo:   ela pergunta SE AQUILO IMPEDE de ir embora.
   Os tres sao a mesma crianca, e nenhum e melhor que o outro.

   A BALADA, segundo dos tres momentos (biblia, Parte VII):
   Liara canta enquanto tranca o cabelo da irma. A cancao sobre a irma
   que vira casulo, na boca da irma que vai ser a borboleta, com as maos
   no cabelo dela. Ela nao sabe o que canta.

   OFICIO APLICADO:
   - Horror pela posicao: Antoniette esta a tres metros e nao alcanca.
   - O detalhe errado, sem reacao declarada.
   - Beat de uma palavra.
   - A opcao de 'hope' cai na posicao 2. Posicoes usadas: 2,1,3,2,1,-.
     Ordem de exibicao: A C B.

   Contrato: 'lied_to_order' e 'saw_surfacing' nao mudam de nome.

   Oito cenas: C1 agosto de novo, C2 a balada, C3 o pateo, C4 o afloramento,
   C5 o que Klara faz (le taught), C6 o que a casa faz, C7 o relatorio
   (escolha), C8 depois.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

/* --------------------------------------------------------------------------
   ESCOLHA - O RELATORIO DE AGOSTO
   A troca do capitulo. Nao ha opcao boa: as tres sao formas de mentir,
   inclusive a que diz a verdade.
   -------------------------------------------------------------------------- */

var C7_RELATORIO_A = [
  { t:'nar', tx:'Ela escreveu o epis\u00f3dio inteiro. Dura\u00e7\u00e3o, apar\u00eancia, o que a menina fez depois.' },
  { t:'nar', tx:'Escreveu como escreveria a queda de uma parede.' },
  { t:'pause' },
  { t:'nar', tx:'Depois releu, e a frase que mais a incomodou foi a mais precisa.' },
  { t:'inn', tx:'"O sujeito K. permaneceu consciente durante todo o intervalo."' },
  { t:'pause' },
  { t:'nar', tx:'Ela lacrou o envelope.' },
  { t:'nar', tx:'A resposta de Lervel chegou em onze dias.' },

  { t:'arc', key:'lervel', label:'\u2014 Ordem dos Olhos Cinzentos \u2014 resposta \u2014', lns:[
      'Confirma\u00e7\u00e3o de valor excepcional. Prazo revisto: dois anos.',
      'Instru\u00e7\u00e3o mantida: observar, registrar, n\u00e3o intervir.',
      'Recomenda-se reduzir contato pessoal com o sujeito.'
  ]},

  { t:'inn', tx:'Reduzir contato pessoal com o sujeito.' },
  { t:'pause' },
  { t:'inn', tx:'Eles nunca souberam que havia contato pessoal.' },
  { t:'inn', tx:'Souberam agora, pela precis\u00e3o do que eu escrevi.' }
];

var C7_RELATORIO_C = [
  { t:'nar', tx:'Ela escreveu quatro linhas sobre encaderna\u00e7\u00e3o e duas sobre a umidade do lado norte.' },
  { t:'nar', tx:'Nada de agosto.' },
  { t:'pause' },
  { t:'nar', tx:'Depois abriu o caderno sem identifica\u00e7\u00e3o e escreveu por uma hora e vinte.' },

  { t:'arc', key:'sem_identificacao', label:'\u2014 caderno sem identifica\u00e7\u00e3o \u2014', lns:[
      'Vi. Dez de agosto, entre as sete e vinte e as sete e vinte e seis.',
      'N\u00e3o sei o nome do que eu vi e n\u00e3o vou dar um nome provis\u00f3rio.',
      'A menina esteve consciente o tempo inteiro.',
      'Se isto for tudo o que eu conseguir provar, n\u00e3o serve para nada.'
  ]},

  { t:'nar', tx:'Guardou o caderno debaixo do forro e ficou sentada com as m\u00e3os na mesa.' },
  { t:'pause' },
  { t:'inn', tx:'Eu vim aqui para relatar isto. \u00c9 a \u00fanica coisa que a Ordem queria.' },
  { t:'inn', tx:'E eu acabei de decidir que eles n\u00e3o v\u00e3o ter.' },
  { t:'pause' },
  { t:'inn', tx:'N\u00e3o sei o que eu sou a partir de hoje.' }
];

var C7_RELATORIO_B = [
  { t:'nar', tx:'Ela escreveu que houve um epis\u00f3dio de natureza indeterminada, sem testemunha direta.' },
  { t:'pause' },
  { t:'inn', tx:'Sem testemunha direta.' },
  { t:'nar', tx:'Releu as tr\u00eas palavras e n\u00e3o trocou nenhuma.' },
  { t:'pause' },
  { t:'nar', tx:'A resposta de Lervel chegou em quinze dias e pedia detalhamento.' },
  { t:'nar', tx:'Ela respondeu que n\u00e3o havia detalhamento a fornecer.' },
  { t:'pause' },
  { t:'inn', tx:'Foi a primeira coisa inteiramente falsa que eu mandei para Lervel em onze anos de servi\u00e7o.' },
  { t:'inn', tx:'E n\u00e3o custou nada. Levou dois minutos.' },
  { t:'pause' },
  { t:'inn', tx:'\u00c9 isso que assusta.' }
];

RBF.CHAPTER7 = [

{ t:'chap', num:'CAP\u00cdTULO 7', name:'AGOSTO', chapter:'capitulo7' },
{ t:'fade_out' },

/* ======================================================================
   C1 - AGOSTO DE NOVO
   O calendario cobra. Terceira aparicao do padrao, primeira em que o
   jogador ja sabe ler. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c7_agosto', chapter:'capitulo7', title:'Agosto de novo',
  bg:'bg_kitchen', bgm:'bgm_nidhaus' },
{ t:'fade_in' },

{ t:'nar', tx:'Na primeira manh\u00e3 de agosto havia duas no vidro da copa antes das cinco e meia.' },
{ t:'nar', tx:'Dara n\u00e3o comentou. Antoniette tamb\u00e9m n\u00e3o.' },
{ t:'pause' },

{ t:'inn', tx:'Terceiro agosto.' },
{ t:'nar', tx:'Ela abriu o caderno operacional na entrada do ano anterior e conferiu a data de in\u00edcio.' },
{ t:'nar', tx:'Batia com dois dias de diferen\u00e7a.' },
{ t:'pause' },

{ t:'inn', tx:'Dezenove dias no primeiro ano. Vinte no segundo.' },
{ t:'inn', tx:'Se este seguir o padr\u00e3o, terminam no dia vinte.' },

{ t:'nar', tx:'Do outro lado do p\u00e1tio, Liara atravessou correndo com as m\u00e3os em concha e nada dentro delas.' },
{ t:'nar', tx:'Parou no meio, abriu as m\u00e3os para o nada e recome\u00e7ou.' },
{ t:'pause' },
{ t:'inn', tx:'Ela tenta pegar uma todo agosto e nunca pega.' },
{ t:'inn', tx:'E fica estranha em setembro, todo setembro, e passa em outubro.' },
{ t:'pause' },
{ t:'nar', tx:'Antoniette escreveu isso pela terceira vez, na terceira p\u00e1gina, com a mesma letra.' },

/* ======================================================================
   C2 - A BALADA
   Segundo dos tres momentos. Liara canta o que nao entende, com as maos
   no cabelo da irma. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c7_balada', chapter:'capitulo7', title:'A cantiga',
  bg:'bg_corridor', bgm:null },

{ t:'nar', tx:'No degrau do corredor leste, Liara tran\u00e7ava o cabelo da irm\u00e3, sentada atr\u00e1s dela.' },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'spr', ch:'liara', ex:'neutral', pos:'right' },
{ t:'nar', tx:'Tran\u00e7ava mal e desmanchava, e recome\u00e7ava, do jeito que se faz quando o ponto \u00e9 ficar ali.' },
{ t:'pause' },

{ t:'nar', tx:'E cantava baixo, no ritmo das m\u00e3os.' },

{ t:'arc', key:'balada', label:'\u2014 cantiga da Marca \u2014', lns:[
    'Cantai, cantai, as filhas do pacto,',
    'uma nasce casulo, uma nasce intacta,',
    'cantai, cantai, o ciclo que n\u00e3o para,',
    'a que dorme na casca, a que sai pela clara...'
]},

{ t:'pause' },
{ t:'dial', ch:'klara', tx:'Onde voc\u00ea aprendeu isso?' },
{ t:'dial', ch:'liara', tx:'Com a Elke. Ela canta lavando.' },
{ t:'dial', ch:'klara', tx:'Voc\u00ea sabe o que quer dizer?' },
{ t:'pause' },
{ t:'dial', ch:'liara', tx:'\u00c9 cantiga. N\u00e3o quer dizer.' },
{ t:'nar', tx:'E continuou tran\u00e7ando.' },

{ t:'spr_hide', ch:'liara' },
{ t:'spr_hide', ch:'klara' },
{ t:'nar', tx:'Antoniette estava no fim do corredor com dois volumes e n\u00e3o passou.' },
{ t:'pause' },
{ t:'inn', tx:'Eu anotei essa letra em abril do primeiro ano, na estrada, de uma crian\u00e7a sentada num po\u00e7o.' },
{ t:'inn', tx:'Anotei como curiosidade local.' },

/* ======================================================================
   C3 - O PATIO, SETE E VINTE
   Prepara sem anunciar. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c7_patio', chapter:'capitulo7', title:'Sete e vinte',
  bg:'bg_nidhaus_gate', bgm:'bgm_grey_march' },

{ t:'nar', tx:'No dia dez, o p\u00e1tio \u00e0s sete e vinte estava do jeito que fica em agosto: laranja por baixo e ainda claro por cima.' },
{ t:'nar', tx:'As duas desceram sem pedir licen\u00e7a, porque havia dois anos que ningu\u00e9m pedia.' },
{ t:'pause' },

{ t:'spr', ch:'liara', ex:'neutral', pos:'right' },
{ t:'dial', ch:'liara', tx:'Se eu ficar bem quieta uma pousa. A Elke disse.' },
{ t:'dial', ch:'antoniette', tx:'Voc\u00ea j\u00e1 ficou quieta alguma vez?' },
{ t:'nar', tx:'A menina achou aquilo o auge do humor e riu por tempo demais.' },
{ t:'pause' },

{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'nar', tx:'Klara estava perto da fonte, parada, com as m\u00e3os ao lado do corpo, do jeito dela.' },
{ t:'nar', tx:'Duas pousaram no ombro dela quase ao mesmo tempo.' },
{ t:'pause' },
{ t:'nar', tx:'Depois quatro.' },
{ t:'pause' },
{ t:'nar', tx:'Depois mais.' },

{ t:'inn', tx:'Elas n\u00e3o fazem isso com Liara.' },
{ t:'nar', tx:'Antoniette pousou o caderno na borda da fonte e n\u00e3o escreveu nada.' },

/* ======================================================================
   C4 - O AFLORAMENTO
   Horror pela posicao: ela esta a tres metros e nao alcanca.
   Beat de uma palavra. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c7_afloramento', chapter:'capitulo7', title:'Seis minutos',
  bg:'bg_nidhaus_gate', keepSprites:true, bgm:null },

{ t:'nar', tx:'Klara disse alguma coisa que ningu\u00e9m ouviu e sentou no ch\u00e3o do p\u00e1tio, devagar, com as duas m\u00e3os no cal\u00e7amento.' },
{ t:'pause' },

{ t:'nar', tx:'As borboletas n\u00e3o levantaram voo.' },
{ t:'nar', tx:'Ficaram onde estavam, e vieram mais.' },
{ t:'pause' },

{ t:'nar', tx:'O ar do p\u00e1tio esquentou. Antoniette sentiu na pele do bra\u00e7o e olhou para cima antes de entender que n\u00e3o vinha de cima.' },
{ t:'pause' },
{ t:'inn', tx:'Vem dela.' },

{ t:'nar', tx:'Antoniette deu tr\u00eas passos e parou, porque Liara estava entre ela e a irm\u00e3 e Liara n\u00e3o tinha se mexido.' },
{ t:'spr_hide', ch:'liara' },
{ t:'nar', tx:'A menina do mapa olhava a irm\u00e3 com a cara de quem espera alguma coisa acabar.' },
{ t:'pause' },
{ t:'inn', tx:'Ela n\u00e3o est\u00e1 assustada.' },
{ t:'inn', tx:'Ela j\u00e1 viu.' },

{ t:'nar', tx:'O que aconteceu com o rosto de Klara Antoniette n\u00e3o conseguiu escrever depois, e tentou quatro vezes.' },
{ t:'nar', tx:'O que ela conseguiu escrever foi a dura\u00e7\u00e3o.' },
{ t:'pause' },

{ t:'nar', tx:'Sete e vinte.' },
{ t:'pause' },
{ t:'nar', tx:'Sete e vinte e tr\u00eas.' },
{ t:'pause' },
{ t:'nar', tx:'Sete e vinte e seis.' },
{ t:'pause' },

{ t:'nar', tx:'O calor caiu de uma vez, como janela fechando.' },
{ t:'nar', tx:'As borboletas levantaram todas juntas e subiram, e o p\u00e1tio ficou vazio delas em menos de dez segundos.' },
{ t:'pause' },

{ t:'nar', tx:'Klara continuava sentada, com as m\u00e3os no cal\u00e7amento, respirando pela boca.' },
{ t:'nar', tx:'Consciente o tempo inteiro. Antoniette teve certeza disso e desejou n\u00e3o ter.' },

/* ======================================================================
   C5 - O QUE KLARA FAZ
   PRIMEIRA LEITURA DE 'taught'. Os tres sao a mesma crianca.
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c7_depois', chapter:'capitulo7', title:'O que ela faz',
  bg:'bg_nidhaus_gate', keepSprites:true },

{ t:'nar', tx:'Antoniette chegou perto e ajoelhou na altura dela, e n\u00e3o tocou.' },
{ t:'pause' },

/* --- ramo A: o metodo ------------------------------------------------ */
{ t:'dial', ch:'klara', tx:'Quanto tempo?', if:{ taught:'A' } },
{ t:'dial', ch:'antoniette', tx:'Seis minutos.', if:{ taught:'A' } },
{ t:'nar', tx:'A menina assentiu uma vez, como quem confere um n\u00famero contra outro que j\u00e1 tinha.', if:{ taught:'A' } },
{ t:'dial', ch:'klara', tx:'Da \u00faltima vez foi menos.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'inn', tx:'Da \u00faltima vez.', if:{ taught:'A' } },
{ t:'inn', tx:'Ela est\u00e1 medindo. Est\u00e1 medindo h\u00e1 quanto tempo?', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'inn', tx:'Eu ensinei a ela a medir.', if:{ taught:'A' } },

/* --- ramo B: a forma ------------------------------------------------- */
{ t:'nar', tx:'Klara levou as duas m\u00e3os ao cabelo, achou a tran\u00e7a desfeita e refez o que dava para refazer.', if:{ taught:'B' } },
{ t:'nar', tx:'Depois puxou a manga, alisou a frente do vestido e s\u00f3 ent\u00e3o levantou o rosto.', if:{ taught:'B' } },
{ t:'dial', ch:'klara', tx:'Desculpa.', if:{ taught:'B' } },
{ t:'pause', if:{ taught:'B' } },
{ t:'dial', ch:'antoniette', tx:'Pelo qu\u00ea?', if:{ taught:'B' } },
{ t:'dial', ch:'klara', tx:'Pela senhorita ter visto.', if:{ taught:'B' } },
{ t:'pause', if:{ taught:'B' } },
{ t:'inn', tx:'Ela pediu desculpa por eu ter presenciado.', if:{ taught:'B' } },
{ t:'inn', tx:'Eu ensinei isso a ela.', if:{ taught:'B' } },

/* --- ramo C: o mundo ------------------------------------------------- */
{ t:'nar', tx:'Klara ficou olhando o pr\u00f3prio joelho por um tempo antes de falar.', if:{ taught:'C' } },
{ t:'dial', ch:'klara', tx:'Isso impede?', if:{ taught:'C' } },
{ t:'dial', ch:'antoniette', tx:'Impede o qu\u00ea?', if:{ taught:'C' } },
{ t:'pause', if:{ taught:'C' } },
{ t:'dial', ch:'klara', tx:'De ir.', if:{ taught:'C' } },
{ t:'pause', if:{ taught:'C' } },
{ t:'nar', tx:'Antoniette abriu a boca e n\u00e3o tinha resposta, o que n\u00e3o acontecia com ela desde os dezessete anos.', if:{ taught:'C' } },
{ t:'inn', tx:'Ela n\u00e3o perguntou o que era.', if:{ taught:'C' } },
{ t:'inn', tx:'Perguntou se atrapalha o plano.', if:{ taught:'C' } },

/* --- reconverge ------------------------------------------------------- */
{ t:'pause' },
{ t:'nar', tx:'Klara levantou sozinha, recusou o bra\u00e7o e subiu pela escada de servi\u00e7o.' },
{ t:'spr_hide', ch:'klara' },
{ t:'nar', tx:'Andando.' },

/* ======================================================================
   C6 - O QUE A CASA FAZ
   Nada. E o nada e o dado. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c7_casa', chapter:'capitulo7', title:'O que a casa faz',
  bg:'bg_main_hall', bgm:'bgm_nidhaus' },

{ t:'nar', tx:'No jantar daquela noite Serafina serviu como servia e perguntou pela cataloga\u00e7\u00e3o do lado norte.' },
{ t:'spr', ch:'serafina', ex:'neutral', pos:'right' },
{ t:'dial', ch:'antoniette', tx:'Terceira estante. Devo fechar o lado at\u00e9 novembro.' },
{ t:'dial', ch:'serafina', tx:'Bom.' },
{ t:'pause' },

{ t:'nar', tx:'Aldric n\u00e3o estava \u00e0 mesa, o que tamb\u00e9m era normal.' },
{ t:'nar', tx:'Ningu\u00e9m perguntou \u00e0s meninas como tinha sido o dia.' },
{ t:'spr_hide', ch:'serafina' },
{ t:'pause' },

{ t:'inn', tx:'Aconteceu no p\u00e1tio, \u00e0s sete e vinte, com a casa inteira acordada.' },
{ t:'inn', tx:'Nenhuma pergunta, nenhum m\u00e9dico, nenhuma mudan\u00e7a de hor\u00e1rio.' },
{ t:'pause' },
{ t:'inn', tx:'Se fosse a primeira vez algu\u00e9m teria feito alguma coisa.' },
{ t:'inn', tx:'Ningu\u00e9m fez nada porque isto est\u00e1 no prazo.' },

{ t:'nar', tx:'Ela terminou o prato inteiro e n\u00e3o sentiu gosto de nada.' },
{ t:'pause' },
{ t:'nar', tx:'Subiu, e no quarto ficou de p\u00e9 junto da janela por um tempo, com o p\u00e3o da noite na m\u00e3o.' },
{ t:'nar', tx:'Depois pousou o p\u00e3o na mesa de canto e n\u00e3o comeu.' },

/* ======================================================================
   C7 - O RELATORIO
   A TROCA DO CAPITULO. ESCOLHA.
   Ordem de exibicao A C B - a de 'hope' na posicao 2.
   ====================================================================== */
{ t:'scene', id:'c7_relatorio', chapter:'capitulo7', title:'O relat\u00f3rio de agosto',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'O relat\u00f3rio de agosto vencia no dia vinte e dois.' },
{ t:'nar', tx:'Ela sentou \u00e0s nove e ficou at\u00e9 depois da meia-noite com a folha em branco.' },
{ t:'pause' },

{ t:'inn', tx:'Eu vim aqui para isto.' },
{ t:'inn', tx:'Cinco anos de estimativa, quarenta p\u00e1ginas de dossi\u00ea, uma cobertura constru\u00edda em tr\u00eas meses.' },
{ t:'inn', tx:'Tudo para poder escrever a frase que eu tenho agora.' },
{ t:'pause' },
{ t:'nar', tx:'Ela molhou a pena tr\u00eas vezes e deixou secar as tr\u00eas.' },

{ t:'cho', id:'cap7_relatorio', code:'C-VII', prompt:'O RELAT\u00d3RIO DE AGOSTO', opts:[
  { id:'A',
    tx:'Escrever o epis\u00f3dio inteiro. Foi para isso que ela veio.',
    flags:{ lied_to_order:'A', saw_surfacing:true },
    routes:{ answer: 3 },
    then: C7_RELATORIO_A },
  { id:'C',
    tx:'N\u00e3o relatar. Agosto inteiro fica fora do que Lervel vai receber.',
    flags:{ lied_to_order:'C', saw_surfacing:true },
    routes:{ hope: 3, loss: 1 },
    then: C7_RELATORIO_C },
  { id:'B',
    tx:'Epis\u00f3dio de natureza indeterminada, sem testemunha direta.',
    flags:{ lied_to_order:'B', saw_surfacing:true },
    routes:{ loss: 2, answer: 1 },
    then: C7_RELATORIO_B }
]},

/* ======================================================================
   C8 - DEPOIS
   A mudanca de psicologia fica VISIVEL. Saida: ponte para o Cap. 8.
   ====================================================================== */
{ t:'scene', id:'c7_depois_de_agosto', chapter:'capitulo7', title:'Depois de agosto',
  bg:'bg_library', bgm:null },

{ t:'nar', tx:'Terminaram no dia vinte, como ela tinha calculado.' },
{ t:'nar', tx:'Ela conferiu o c\u00e1lculo e acertou, e a coisa n\u00e3o lhe deu satisfa\u00e7\u00e3o nenhuma.' },
{ t:'pause' },

{ t:'nar', tx:'Em setembro ela catalogou seiscentos e dez volumes.' },
{ t:'nar', tx:'A m\u00e9dia dos vinte e nove meses anteriores era de cento e oitenta por m\u00eas.' },
{ t:'pause' },
{ t:'inn', tx:'Terminando a biblioteca, eu n\u00e3o tenho mais motivo para estar nesta casa.' },
{ t:'inn', tx:'Eu passei dois anos e meio evitando esse dia.' },
{ t:'pause' },
{ t:'inn', tx:'E agora estou correndo para ele.' },

{ t:'nar', tx:'Ela parou de descer \u00e0 copa \u00e0s seis. Passou a descer \u00e0s cinco e meia, antes de Dara sentar.' },
{ t:'nar', tx:'Levava a caneca para cima e esquecia metade nela.' },
{ t:'pause' },

{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'nar', tx:'A menina reparou antes de qualquer adulto da casa.' },
{ t:'dial', ch:'klara', tx:'A senhorita n\u00e3o est\u00e1 comendo.' },
{ t:'dial', ch:'antoniette', tx:'Estou.' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'Est\u00e1 bem.' },
{ t:'spr_hide', ch:'klara' },
{ t:'nar', tx:'E n\u00e3o insistiu, porque ela nunca insistia.' },

{ t:'pause' },
{ t:'inn', tx:'Ela usou comigo a frase que eu uso nas fichas dela.' },

{ t:'nar', tx:'\u00c0 noite Antoniette abriu o caderno operacional e escreveu a \u00fanica entrada do m\u00eas.' },

{ t:'arc', key:'caderno', label:'\u2014 Caderno Operacional \u2014 Entrada 71 \u2014', lns:[
    'Prazo pr\u00f3prio revisto. A biblioteca fecha em fevereiro do ano 5.',
    'Depois de fevereiro n\u00e3o h\u00e1 motivo administrativo para minha perman\u00eancia.',
    'Portanto tenho at\u00e9 fevereiro do ano 5.',
    'N\u00e3o sei ainda para qu\u00ea.'
]},

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Terceiro agosto em Velha Nidhaus.', line2:'Ela parou de ser quem chegou.',
  chapter:'capitulo7' },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.CHAPTER7; }
