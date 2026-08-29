/* ==========================================================================
   ARQUIVO RABENFELS - js/data/esp10.js
   ROTA ESPERANCA - CAPITULO 10: "A Fuga"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.

   TODO BEAT DESTE ARQUIVO CARREGA if:{ rota:'esperanca' }.
   O roteiro em execucao e a concatenacao de todos os capitulos do
   manifesto, inclusive os das outras tres rotas. O que separa uma rota
   da outra e essa condicional, e nada mais. Beat sem ela vaza para as
   quatro leituras.

   QUANDO: Ano 5, agosto. Klara e Liara tem doze anos.
   TERCEIRAS BORBOLETAS - as ultimas da obra.

   O PENSAMENTO UNICO (Zinsser, unidade):
   "Faltavam quatro horas."

   A TROCA (docs/biblia_narrativa_rabenfels.md):
   Ela entrega tudo o que sobrou. Nao ha o que ganhar neste capitulo.

   NAO TEM ESCOLHA, DE PROPOSITO.
   A essa altura nao ha mais o que escolher, e a ausencia de escolha e o
   ponto. O jogador ja decidiu tudo o que podia decidir no Capitulo 9 -
   inclusive em qual das quatro rotas ele esta lendo isto.

   ESTE E O PSEUDOCLIMAX (Frey).
   "Se for bem feito, o leitor vai acreditar que o assassino foi pego.
   Ah, mas nao!" Nao deixar o jogador escorregar para uma zona de
   conforto achando que a historia acabou.
   POR ISSO O CAPITULO TERMINA EM FARPA, E NAO EM FIM.

   LE 'taught' e 'promised' para textura.

   LIARA FICA. Nao sabe que esta sendo deixada, e nao sabe que e por
   isso que ela vive.

   NAO PODE VAZAR: que Klara agiu. Isso e o Capitulo 11, e ninguem
   explica em cena. O jogador conclui.

   Seis cenas: C1 agosto chega, C2 o ultimo dia, C3 a descida,
   C4 a estrada, C5 a floresta, C6 a farpa.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

var R = { rota: 'esperanca' };

RBF.ESP10 = [

{ t:'chap', num:'CAPÍTULO 10', name:'A FUGA', chapter:'esp10', if:R },
{ t:'fade_out', if:R },

/* ======================================================================
   C1 - AGOSTO CHEGA
   Terceiras borboletas. O jogador ja aprendeu a ler. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'esp10_agosto', chapter:'esp10', title:'Terceiro dia',
  bg:'bg_kitchen', bgm:'bgm_nidhaus', if:R },
{ t:'fade_in', if:R },

{ t:'nar', tx:'Vieram no dia três. Nos quatro anos anteriores, o começo nunca tinha caído tão cedo.', if:R },
{ t:'nar', tx:'Antoniette cercou o três. A ponta da pena atravessou o papel.', if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'Dois dias antes.', if:R },
{ t:'inn', tx:'Em cinco anos isso nunca variou mais que um.', if:R },

{ t:'spr', ch:'dara', ex:'guarded', pos:'center', if:R },
{ t:'nar', tx:'Dara encheu a caneca e não sentou do outro lado da mesa, o que ela fazia havia cinco anos.', if:R },
{ t:'dial', ch:'dara', tx:'A copa fecha às seis esta semana.', if:R },
{ t:'dial', ch:'antoniette', tx:'Às seis?', if:R },
{ t:'dial', ch:'dara', tx:'Ordem da senhora.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'A senhora deu motivo?', if:R },
{ t:'nar', tx:'Dara contou a prataria antes de responder, e ela já tinha contado a prataria naquela manhã.', if:R },
{ t:'dial', ch:'dara', tx:'A senhora não dá motivo. A senhora dá horário.', if:R },
{ t:'spr_hide', ch:'dara', if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'Oito, sempre. Cinco anos de oito.', if:R },
{ t:'inn', tx:'Ninguém muda o horário da copa por causa de bicho.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Duas horas a menos. O plano perdeu duas horas antes de começar.', if:R },

/* ======================================================================
   C2 - O ULTIMO DIA
   Liara fica, e nao sabe. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'esp10_ultimo_dia', chapter:'esp10', title:'O último dia',
  bg:'bg_corridor', bgm:null, if:R },

{ t:'nar', tx:'No dia nove, à tarde, as duas estavam no degrau do corredor leste.', if:R },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center', if:R },
{ t:'spr', ch:'liara', ex:'bright', pos:'right', if:R },

{ t:'dial', ch:'liara', tx:'Mil novecentos e trinta e dois.', if:R },
{ t:'dial', ch:'klara', tx:'Mil novecentos e trinta e dois.', if:R },
{ t:'nar', tx:'Liara olhou para a irmã, porque a irmã nunca concordava com a conta de primeira.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'liara', tx:'Você conferiu?', if:R },
{ t:'dial', ch:'klara', tx:'Confirmei.', if:R },

{ t:'nar', tx:'Liara aceitou aquilo e passou a falar do que ia levar para Eldoria.', if:R },
{ t:'nar', tx:'Falou por onze minutos, incluindo dois pares de botas que ela não tinha.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Klara ouviu inteiro. Não corrigiu nenhuma das botas.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois pediu para Liara trançar o cabelo dela, o que ela nunca pedia.', if:R },
{ t:'nar', tx:'Liara trançou mal, desmanchou e recomeçou três vezes, e a irmã deixou.', if:R },

{ t:'spr_hide', ch:'liara', if:R },
{ t:'spr_hide', ch:'klara', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette passou no fim do corredor com dois volumes que não precisava carregar.', if:R },
{ t:'inn', tx:'Ela está se despedindo.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'E fez isso do único jeito que não levanta pergunta nenhuma.', if:R },

/* ======================================================================
   C3 - A DESCIDA
   Onze e vinte e cinco. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'esp10_descida', chapter:'esp10', title:'Onze e meia',
  bg:'bg_antoniette_room', bgm:'bgm_archive', if:R },

{ t:'nar', tx:'A troca da guarda do portão era às onze e meia. Ela sabia disso havia quatro meses.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Às onze e vinte e cinco ela desceu pela escada de serviço com o papel no bolso interno.', if:R },
{ t:'nar', tx:'A porta da cozinha estava destrancada, como Fenn tinha dito que estaria.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'klara', ex:'neutral', pos:'center', if:R },
{ t:'nar', tx:'Klara já estava no pé da escada, vestida, com o saco de pano na mão.', if:R },
{ t:'nar', tx:'Não perguntou nada. Não disse nada. Foi atrás.', if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'Ela desceu antes de mim.', if:R },
{ t:'inn', tx:'Eu não disse a hora a ninguém.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette anotou aquilo na margem, no dia seguinte, com um ponto de interrogação.', if:R },

{ t:'pause', if:R },
{ t:'sfx', id:'sfx_door', if:R },
{ t:'nar', tx:'A guarda trocou às onze e meia e as duas atravessaram o pátio em quarenta segundos.', if:R },
{ t:'nar', tx:'A corrente da porta nordeste estava no lugar de sempre, com os dois elos pendurados.', if:R },
{ t:'nar', tx:'Elas passaram longe dela.', if:R },
{ t:'pause', if:R },

/* ======================================================================
   C4 - A ESTRADA
   Le 'taught'. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'esp10_estrada', chapter:'esp10', title:'A estrada',
  bg:'bg_grey_march_road', keepSprites:true, if:R },

{ t:'nar', tx:'A estrada do vale à meia-noite é mais clara do que se espera. A lua bate na pedra molhada.', if:R },
{ t:'nar', tx:'Andaram quarenta minutos sem falar, no ritmo que Antoniette tinha calculado para uma criança.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita conferiu o horário da carroça?', if:{ rota:'esperanca', taught:'A' } },
{ t:'dial', ch:'antoniette', tx:'Três vezes.', if:{ rota:'esperanca', taught:'A' } },
{ t:'dial', ch:'klara', tx:'Então está certo.', if:{ rota:'esperanca', taught:'A' } },

{ t:'dial', ch:'klara', tx:'Eu devia ter agradecido antes de sair.', if:{ rota:'esperanca', taught:'B' } },
{ t:'dial', ch:'antoniette', tx:'Agradece depois.', if:{ rota:'esperanca', taught:'B' } },
{ t:'dial', ch:'klara', tx:'Depois não vale. Eu tinha de dizer antes.', if:{ rota:'esperanca', taught:'B' } },

{ t:'dial', ch:'klara', tx:'O rio fica de que lado do sol?', if:{ rota:'esperanca', taught:'C' } },
{ t:'dial', ch:'antoniette', tx:'Esquerda, de manhã.', if:{ rota:'esperanca', taught:'C' } },
{ t:'dial', ch:'klara', tx:'Está no livro. Eu queria conferir com a senhorita.', if:{ rota:'esperanca', taught:'C' } },

{ t:'pause', if:R },
{ t:'nar', tx:'Passaram a aldeia aos quarenta minutos. Quinze casas caiadas, um poço, roupa no varal.', if:R },
{ t:'nar', tx:'Não havia ninguém acordado, e as janelas estavam fechadas apesar do calor de agosto.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'No fim da aldeia havia um cão amarrado, e ele levantou a cabeça quando as duas passaram.', if:R },
{ t:'nar', tx:'Não latiu. Acompanhou com os olhos até o fim da corda e deitou de novo.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Cão de aldeia late para forasteiro. É o que ele faz.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Anota depois.', if:R },

{ t:'pause', if:R },
{ t:'inn', tx:'Quatro horas até o barco.', if:R },
{ t:'inn', tx:'Está dando certo.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Eu não escrevi essa frase no plano porque não se escreve isso num plano.', if:R },

/* ======================================================================
   C5 - A FLORESTA
   Reconverge com o pensamento unico. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'esp10_floresta', chapter:'esp10', title:'O que sobrou',
  bg:'bg_grey_march_road', bgm:null, if:R },

{ t:'nar', tx:'Depois da aldeia, as copas fecharam a lua e a pedra clara desapareceu sob os pés.', if:R },
{ t:'nar', tx:'Antoniette conhecia aquele trecho. Tinha atravessado ele em abril, cinco anos antes, com a janela aberta.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Naquela vez ela ia contando os quilômetros para não pensar no contrato.', if:R },
{ t:'nar', tx:'Desta vez contou os passos, porque passo é a única medida que serve quando não há roda.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Em algum ponto daquela noite, Antoniette escreveu a última entrada do Arquivo.', if:R },
{ t:'nar', tx:'Não há registro da hora. A caligrafia continuava firme. O espaçamento não.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Está tudo nas páginas anteriores.', if:R },
{ t:'inn', tx:'Cinco anos de trabalho. Use.', if:R },

/* ======================================================================
   C6 - A FARPA
   Frey: nao deixar o jogador escorregar para a zona de conforto.
   Uma linha que nao fecha, e corte. NAO EXPLICAR.
   ====================================================================== */
{ t:'scene', id:'esp10_farpa', chapter:'esp10', title:'Quatro horas',
  bg:'bg_black', bgm:null, if:R },

{ t:'nar', tx:'Faltavam quatro horas para o barco.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'klara', ex:'blank', pos:'center', if:R },
{ t:'nar', tx:'No meio da floresta, Klara parou de andar.', if:R },
{ t:'nar', tx:'Não tropeçou. Os dois pés ficaram alinhados sobre a mesma pedra. Ela não tornou a levantá-los.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Klara.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'O ar da floresta esquentou.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette começou a contar. Depois não conseguiu fixar qual tinha sido o primeiro número.', if:R },

{ t:'fade_out', if:R },
{ t:'bgm', id:null, if:R },
{ t:'end_chap', line1:'Agosto do quinto ano.', line2:'Faltavam quatro horas.',
  chapter:'esp10', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.ESP10; }
