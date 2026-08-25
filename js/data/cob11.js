/* ==========================================================================
   ARQUIVO RABENFELS - js/data/cob11.js
   ROTA COBERTURA - CAPITULO 11: "Marca Cinzenta"

   Somente dados. TODO BEAT CARREGA if:{ rota:'cobertura' }.

   QUANDO: agosto a novembro do ano cinco. Um quarto alugado.

   O PENSAMENTO UNICO (Zinsser, unidade):
   "Ele precisa abrir."

   ------------------------------------------------------------------
   A UNICA ROTA EM QUE ELA ESCREVE O ARQUIVO DE MEMORIA
   ------------------------------------------------------------------
   Nas outras tres o documento e montado dentro da casa, com as plantas
   na mao e o livro-caixa a dois corredores. Aqui ela tem o caderno do
   forro e mais nada. Duzentas e quarenta e uma paginas, e o que falta
   nao esta marcado como falta - porque marcar a falta seria dizer ao
   tribunal onde nao olhar.

   ELA ESTA VIVA E NAO ESCREVE A ELE DE PROPOSITO. O ponto morto de
   noventa dias dispara por silencio, e ela sabe disso porque montou o
   mecanismo. Escrever seria dizer "estou bem", e "estou bem" faz o
   pacote nao sair.

   >>> E O UNICO ATO DA OBRA EM QUE ELA USA A PROPRIA MORTE PRESUMIDA
       COMO FERRAMENTA. <<<

   CARMINE NAO VEM. Nao ha cena de Carmine nesta rota, e a ausencia e o
   assunto: Klara nao a escolheu o bastante para que ela fosse um
   problema, ou a distancia da estrada resolveu por si. Ninguem em cena
   comenta isso. NAO EXPLICAR.

   As quatro paginas: ela arranca do caderno de trabalho, aqui, num
   quarto alugado, e as manda pelo correio de volta a Velha Nidhaus,
   endere\u00e7adas ao livro-caixa da casa - o unico endereco que ela sabe
   que ninguem abre. Ver reference/canon.md.

   Quatro cenas: C1 o quarto, C2 as nove noites, C3 as quatro folhas,
   C4 o despacho e o silencio.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

var R = { rota: 'cobertura' };

RBF.COB11 = [

{ t:'chap', num:'CAP\u00cdTULO 11', name:'MARCA CINZENTA', chapter:'cob11', if:R },
{ t:'fade_out', if:R },

/* ======================================================================
   C1 - O QUARTO
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'cob11_quarto', chapter:'cob11', title:'O quarto alugado',
  bg:'bg_antoniette_room', bgm:'bgm_archive', if:R },
{ t:'fade_in', if:R },

{ t:'nar', tx:'O quarto ficava acima de uma selaria e tinha uma janela que dava para o telhado da selaria.', if:R },
{ t:'nar', tx:'Custava quatro moedas por semana e ela pagou seis semanas adiantadas, porque adiantado n\u00e3o levanta pergunta.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela p\u00f4s a mesa contra a parede sem janela e o ba\u00fa de ferramentas debaixo dela.', if:R },
{ t:'nar', tx:'Depois arrumou a pena, o tinteiro e o mata-borr\u00e3o na ordem em que usava havia oito anos.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'antoniette', ex:'neutral', pos:'center', if:R },
{ t:'inn', tx:'Papel para trezentas p\u00e1ginas. Tinta para quatrocentas.', if:R },
{ t:'inn', tx:'Nove noites, se eu n\u00e3o reler.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Eu vou reler.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Nove noites.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Ela comeu de p\u00e9, encostada na mesa, e n\u00e3o reparou que tinha comido.', if:R },

/* ======================================================================
   C2 - AS NOVE NOITES
   O que ela tem, e o que ela nao tem. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'cob11_noites', chapter:'cob11', title:'Nove noites',
  bg:'bg_archive_closeup', bgm:'bgm_archive', if:R },

{ t:'nar', tx:'Ela tinha o caderno do forro, cinco anos de mem\u00f3ria treinada e nenhuma planta.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'As plantas do t\u00e9rreo sa\u00edram inteiras, porque ela atravessou aquele t\u00e9rreo duas vezes por dia durante cinco anos.', if:R },
{ t:'nar', tx:'As do andar fechado sa\u00edram pela metade. Ela esteve l\u00e1 uma vez e estava escuro.', if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'Marca o que falta.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela p\u00f4s a pena no papel para escrever a palavra lacuna e n\u00e3o escreveu.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Quem l\u00ea uma lacuna marcada sabe onde n\u00e3o olhar.', if:R },
{ t:'inn', tx:'Deixa liso.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Foi a primeira vez em oito anos de of\u00edcio que ela entregou um documento com buraco n\u00e3o declarado.', if:R },
{ t:'nar', tx:'Ela sabia o nome disso. Est\u00e1 no manual, e o nome n\u00e3o \u00e9 bom.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Os hor\u00e1rios de guarda depois de julho ela n\u00e3o tinha, porque em julho a casa mudou a escala e ela saiu antes de aprender a nova.', if:R },
{ t:'nar', tx:'Escreveu os de junho e n\u00e3o datou a tabela.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Isso \u00e9 mentira por omiss\u00e3o de data.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'away', pos:'center', if:R },
{ t:'inn', tx:'Anotado.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Na sexta noite ela chegou \u00e0 parte da menina e ficou uma hora com a pena seca na m\u00e3o.', if:R },
{ t:'pause', if:R },
{ t:'arc', key:'arquivo', lns:[
    '\u201cExiste uma menina em Velha Nidhaus chamada Klara Rabenfels.\u201d',
    '\u201cDoze anos. L\u00ea mais r\u00e1pido do que qualquer pessoa que eu conheci.\u201d'
], if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois escreveu o resto de uma vez, sem parar, e a caligrafia continuou firme.', if:R },
{ t:'nar', tx:'O espa\u00e7amento n\u00e3o.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Duzentas e quarenta e uma p\u00e1ginas em nove noites.', if:R },
{ t:'inn', tx:'Cinquenta a menos do que teria sa\u00eddo l\u00e1 dentro.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'As cinquenta s\u00e3o o andar fechado e agosto.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'S\u00e3o as cinquenta que importam.', if:R },

/* ======================================================================
   C3 - AS QUATRO FOLHAS
   Le hid_from_order, told_klara, lied_to_order, third_paid.
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'cob11_folhas', chapter:'cob11', title:'Quatro folhas',
  bg:'bg_archive_closeup', bgm:null, if:R },

{ t:'nar', tx:'Na d\u00e9cima noite ela abriu o caderno de trabalho, e n\u00e3o o documento, e procurou quatro p\u00e1ginas.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Se algu\u00e9m usar o Arquivo, vai usar contra a casa.', if:R },
{ t:'inn', tx:'E vai ler tudo. Inclusive o que eu fiz.', if:R },
{ t:'pause', if:R },

{ t:'sfx', id:'sfx_page_turn', if:R },
{ t:'nar', tx:'A p\u00e1gina de outubro do primeiro ano. O que ela viu no p\u00e1tio e n\u00e3o mandou para a Ordem.', if:{ rota:'cobertura', hid_from_order:true } },
{ t:'nar', tx:'A p\u00e1gina de outubro do primeiro ano. O que ela mandou para a Ordem, e o que a Ordem arquivou sem responder.', if:{ rota:'cobertura', hid_from_order:false } },
{ t:'inn', tx:'Tr\u00eas.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A p\u00e1gina da c\u00e2mara. Ela desceu, viu, e subiu com uma crian\u00e7a de nove anos cobrindo a aus\u00eancia dela no andar de cima.', if:R },
{ t:'nar', tx:'Na margem, o que ela respondeu a Klara depois: nada. Deixou fechar sozinho.', if:{ rota:'cobertura', told_klara:'A' } },
{ t:'nar', tx:'Na margem, o que ela respondeu a Klara depois: uma vers\u00e3o limpa, feita para a menina n\u00e3o ter de carregar aquilo.', if:{ rota:'cobertura', told_klara:'B' } },
{ t:'nar', tx:'Na margem, o que ela respondeu a Klara depois: a verdade, e um pedido para n\u00e3o repetir.', if:{ rota:'cobertura', told_klara:'C' } },
{ t:'inn', tx:'Duas.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A p\u00e1gina de agosto do terceiro ano.', if:R },
{ t:'nar', tx:'O relat\u00f3rio inteiro, com o que ela viu subir. Foi ele que atravessou a casa dentro de um envelope.', if:{ rota:'cobertura', lied_to_order:'A' } },
{ t:'nar', tx:'O relat\u00f3rio com o epis\u00f3dio dado como de natureza indeterminada, sem testemunha direta. Ela foi a testemunha direta.', if:{ rota:'cobertura', lied_to_order:'B' } },
{ t:'nar', tx:'A p\u00e1gina em que agosto n\u00e3o existe. Lervel recebeu o m\u00eas sem o m\u00eas dentro.', if:{ rota:'cobertura', lied_to_order:'C' } },
{ t:'inn', tx:'Uma.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A p\u00e1gina de Fenn.', if:R },
{ t:'nar', tx:'Ela leu duas vezes antes de arrancar.', if:R },
{ t:'nar', tx:'Um homem foi \u00fatil a ela e ela negaria a fonte se perguntassem. Isso n\u00e3o cabia em coluna nenhuma.', if:{ rota:'cobertura', third_paid:'A' } },
{ t:'nar', tx:'Ela comprou o nome para levar a Lervel, e o nome era de um homem vivo que continua naquela casa.', if:{ rota:'cobertura', third_paid:'B' } },
{ t:'nar', tx:'Ela recusou o nome e mandou o rapaz embora no mesmo dia. Ficou sem a prova e nunca soube se o menino chegou.', if:{ rota:'cobertura', third_paid:'C' } },
{ t:'pause', if:R },
{ t:'inn', tx:'Nenhuma.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Quatro folhas em cima da mesa, num quarto alugado a duzentos e trinta quil\u00f4metros da casa de onde sa\u00edram.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Queima.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela olhou a vela e n\u00e3o chegou perto dela.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Se voc\u00ea chegar at\u00e9 elas, vai entender por qu\u00ea.', if:R },
{ t:'inn', tx:'Se n\u00e3o chegar, melhor.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela embrulhou as quatro folhas em papel pardo e endere\u00e7ou ao escrit\u00f3rio do bar\u00e3o, em Velha Nidhaus.', if:R },
{ t:'nar', tx:'Sem remetente, e com a letra deitada que ela usava para invent\u00e1rio de despensa.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Vai parar no livro-caixa. Tudo que chega sem remetente para naquele livro.', if:R },
{ t:'inn', tx:'\u00c9 o \u00fanico lugar daquela casa que ningu\u00e9m abre por curiosidade.', if:R },

/* ======================================================================
   C4 - O DESPACHO E O SILENCIO
   Ela usa a propria morte presumida como ferramenta. Saida: farpa.
   ====================================================================== */
{ t:'scene', id:'cob11_despacho', chapter:'cob11', title:'Noventa dias',
  bg:'bg_nidhaus_gate', bgm:'bgm_prologue', if:R },
{ t:'spr', ch:'antoniette', ex:'neutral', pos:'center', if:R },

{ t:'nar', tx:'O posto de correio da Marca Cinzenta abria \u00e0s sete e o mensageiro da rota de Alsbeck parava l\u00e1 toda quarta.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Couro encerado, porque chuva na estrada arruina papel.', if:R },
{ t:'nar', tx:'Sem selo, porque selo diz de onde veio.', if:R },
{ t:'nar', tx:'Cordel em quatro voltas e um n\u00f3 cego.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela entregou o pacote com as duas m\u00e3os.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Isto n\u00e3o vai agora.', if:R },
{ t:'dial', ch:'mensageiro', tx:'Ent\u00e3o vai quando, senhora?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Guarda a\u00ed. Eu mando not\u00edcia toda quarta. Se passar noventa dias sem not\u00edcia minha, voc\u00ea leva.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'mensageiro', tx:'Noventa \u00e9 muito tempo.', if:R },
{ t:'dial', ch:'antoniette', tx:'\u00c9 o que d\u00e1 para eu garantir.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela contou as moedas do adiantamento na palma dele, uma a uma, e conferiu duas vezes.', if:R },
{ t:'spr_hide', ch:'antoniette', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Na quarta seguinte ela passou em frente ao posto e n\u00e3o entrou.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'guarded', pos:'center', if:R },
{ t:'inn', tx:'Se eu escrever, ele vai achar que est\u00e1 tudo bem e n\u00e3o vai abrir.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ele precisa abrir.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Ela arranjou trabalho de copista num cart\u00f3rio da pra\u00e7a e ficou boa nisso em duas semanas.', if:R },
{ t:'nar', tx:'Ningu\u00e9m ali perguntou de onde ela vinha. Cart\u00f3rio de pra\u00e7a n\u00e3o pergunta.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Toda quarta ela passava em frente ao posto.', if:R },
{ t:'nar', tx:'Na d\u00e9cima segunda quarta ela parou na porta, e o homem do balc\u00e3o levantou a cabe\u00e7a achando que ela ia entrar.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela seguiu.', if:R },
{ t:'spr_hide', ch:'antoniette', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Noventa dias.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'O mensageiro entregou no nonag\u00e9simo terceiro. Levou tr\u00eas dias a mais porque a estrada de Alsbeck alaga em novembro, e ele n\u00e3o achou que tr\u00eas dias fizessem diferen\u00e7a.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Naquela quarta-feira, em Lervel, um arquivista contou as p\u00e1ginas de um documento antes de ler a primeira, porque era o que ele fazia com documento novo.', if:R },
{ t:'nar', tx:'E em Marca Cinzenta, a duzentos e trinta quil\u00f4metros, uma copista atravessou a pra\u00e7a na hora do almo\u00e7o sem saber que tinha acabado de ser dada como morta.', if:R },

{ t:'fade_out', if:R },
{ t:'bgm', id:null, if:R },
{ t:'end_chap', line1:'Noventa e tr\u00eas dias depois.', line2:'Ela n\u00e3o escreveu nenhuma quarta.',
  chapter:'cob11', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.COB11; }
