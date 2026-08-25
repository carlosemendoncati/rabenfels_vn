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

   A TROCA (docs/estrutura_v1.md):
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

{ t:'chap', num:'CAP\u00cdTULO 10', name:'A FUGA', chapter:'esp10', if:R },
{ t:'fade_out', if:R },

/* ======================================================================
   C1 - AGOSTO CHEGA
   Terceiras borboletas. O jogador ja aprendeu a ler. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'esp10_agosto', chapter:'esp10', title:'Terceiro dia',
  bg:'bg_kitchen', bgm:'bgm_nidhaus', if:R },
{ t:'fade_in', if:R },

{ t:'nar', tx:'Vieram no dia tr\u00eas, dois dias antes do padr\u00e3o dos quatro anos anteriores.', if:R },
{ t:'nar', tx:'Antoniette anotou a antecipa\u00e7\u00e3o e olhou o n\u00famero por mais tempo do que precisava.', if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'Dois dias antes.', if:R },
{ t:'inn', tx:'Em cinco anos isso nunca variou mais que um.', if:R },

{ t:'spr', ch:'dara', ex:'guarded', pos:'center', if:R },
{ t:'nar', tx:'Dara encheu a caneca e n\u00e3o sentou do outro lado da mesa, o que ela fazia havia cinco anos.', if:R },
{ t:'dial', ch:'dara', tx:'A copa fecha \u00e0s seis esta semana.', if:R },
{ t:'dial', ch:'antoniette', tx:'\u00c0s seis?', if:R },
{ t:'dial', ch:'dara', tx:'Ordem da senhora.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'A senhora deu motivo?', if:R },
{ t:'nar', tx:'Dara contou a prataria antes de responder, e ela j\u00e1 tinha contado a prataria naquela manh\u00e3.', if:R },
{ t:'dial', ch:'dara', tx:'A senhora n\u00e3o d\u00e1 motivo. A senhora d\u00e1 hor\u00e1rio.', if:R },
{ t:'spr_hide', ch:'dara', if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'Oito, sempre. Cinco anos de oito.', if:R },
{ t:'inn', tx:'Ningu\u00e9m muda o hor\u00e1rio da copa por causa de bicho.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'A casa est\u00e1 fechando mais cedo do que fecha.', if:R },

/* ======================================================================
   C2 - O ULTIMO DIA
   Liara fica, e nao sabe. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'esp10_ultimo_dia', chapter:'esp10', title:'O \u00faltimo dia',
  bg:'bg_corridor', bgm:null, if:R },

{ t:'nar', tx:'No dia nove, \u00e0 tarde, as duas estavam no degrau do corredor leste.', if:R },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center', if:R },
{ t:'spr', ch:'liara', ex:'bright', pos:'right', if:R },

{ t:'dial', ch:'liara', tx:'Mil novecentos e trinta e dois.', if:R },
{ t:'dial', ch:'klara', tx:'Mil novecentos e trinta e dois.', if:R },
{ t:'nar', tx:'Liara olhou para a irm\u00e3, porque a irm\u00e3 nunca concordava com a conta de primeira.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'liara', tx:'Voc\u00ea conferiu?', if:R },
{ t:'dial', ch:'klara', tx:'Confirmei.', if:R },

{ t:'nar', tx:'Liara aceitou aquilo e passou a falar do que ia levar para Eldoria.', if:R },
{ t:'nar', tx:'Falou por onze minutos, incluindo dois pares de botas que ela n\u00e3o tinha.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Klara ouviu inteiro. N\u00e3o corrigiu nenhuma das botas.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois pediu para Liara tran\u00e7ar o cabelo dela, o que ela nunca pedia.', if:R },
{ t:'nar', tx:'Liara tran\u00e7ou mal, desmanchou e recome\u00e7ou tr\u00eas vezes, e a irm\u00e3 deixou.', if:R },

{ t:'spr_hide', ch:'liara', if:R },
{ t:'spr_hide', ch:'klara', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette passou no fim do corredor com dois volumes que n\u00e3o precisava carregar.', if:R },
{ t:'inn', tx:'Ela est\u00e1 se despedindo.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'E fez isso do \u00fanico jeito que n\u00e3o levanta pergunta nenhuma.', if:R },

/* ======================================================================
   C3 - A DESCIDA
   Onze e vinte e cinco. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'esp10_descida', chapter:'esp10', title:'Onze e meia',
  bg:'bg_antoniette_room', bgm:'bgm_archive', if:R },

{ t:'nar', tx:'A troca da guarda do port\u00e3o era \u00e0s onze e meia. Ela sabia disso havia quatro meses.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'\u00c0s onze e vinte e cinco ela desceu pela escada de servi\u00e7o com o papel no bolso interno.', if:R },
{ t:'nar', tx:'A porta da cozinha estava destrancada, como Fenn tinha dito que estaria.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'klara', ex:'neutral', pos:'center', if:R },
{ t:'nar', tx:'Klara j\u00e1 estava no p\u00e9 da escada, vestida, com o saco de pano na m\u00e3o.', if:R },
{ t:'nar', tx:'N\u00e3o perguntou nada. N\u00e3o disse nada. Foi atr\u00e1s.', if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'Ela desceu antes de mim.', if:R },
{ t:'inn', tx:'Eu n\u00e3o disse a hora a ningu\u00e9m.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette anotou aquilo na margem, no dia seguinte, com um ponto de interroga\u00e7\u00e3o.', if:R },

{ t:'pause', if:R },
{ t:'sfx', id:'sfx_door', if:R },
{ t:'nar', tx:'A guarda trocou \u00e0s onze e meia e as duas atravessaram o p\u00e1tio em quarenta segundos.', if:R },
{ t:'nar', tx:'A corrente da porta nordeste estava no lugar de sempre, com os dois elos pendurados.', if:R },
{ t:'nar', tx:'Elas passaram longe dela.', if:R },
{ t:'pause', if:R },

/* ======================================================================
   C4 - A ESTRADA
   Le 'taught'. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'esp10_estrada', chapter:'esp10', title:'A estrada',
  bg:'bg_grey_march_road', keepSprites:true, if:R },

{ t:'nar', tx:'A estrada do vale \u00e0 meia-noite \u00e9 mais clara do que se espera. A lua bate na pedra molhada.', if:R },
{ t:'nar', tx:'Andaram quarenta minutos sem falar, no ritmo que Antoniette tinha calculado para uma crian\u00e7a.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita conferiu o hor\u00e1rio da carro\u00e7a?', if:{ rota:'esperanca', taught:'A' } },
{ t:'dial', ch:'antoniette', tx:'Tr\u00eas vezes.', if:{ rota:'esperanca', taught:'A' } },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o est\u00e1 certo.', if:{ rota:'esperanca', taught:'A' } },

{ t:'dial', ch:'klara', tx:'Eu devia ter agradecido antes de sair.', if:{ rota:'esperanca', taught:'B' } },
{ t:'dial', ch:'antoniette', tx:'Agradece depois.', if:{ rota:'esperanca', taught:'B' } },
{ t:'dial', ch:'klara', tx:'Depois \u00e9 tarde para a forma.', if:{ rota:'esperanca', taught:'B' } },

{ t:'dial', ch:'klara', tx:'O rio fica de que lado do sol?', if:{ rota:'esperanca', taught:'C' } },
{ t:'dial', ch:'antoniette', tx:'Esquerda, de manh\u00e3.', if:{ rota:'esperanca', taught:'C' } },
{ t:'dial', ch:'klara', tx:'Est\u00e1 no livro. Eu queria conferir com a senhorita.', if:{ rota:'esperanca', taught:'C' } },

{ t:'pause', if:R },
{ t:'nar', tx:'Passaram a aldeia aos quarenta minutos. Quinze casas caiadas, um po\u00e7o, roupa no varal.', if:R },
{ t:'nar', tx:'N\u00e3o havia ningu\u00e9m acordado, e as janelas estavam fechadas apesar do calor de agosto.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'No fim da aldeia havia um c\u00e3o amarrado, e ele levantou a cabe\u00e7a quando as duas passaram.', if:R },
{ t:'nar', tx:'N\u00e3o latiu. Acompanhou com os olhos at\u00e9 o fim da corda e deitou de novo.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'C\u00e3o de aldeia late para forasteiro. \u00c9 o que ele faz.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Anota depois.', if:R },

{ t:'pause', if:R },
{ t:'inn', tx:'Quatro horas at\u00e9 o barco.', if:R },
{ t:'inn', tx:'Est\u00e1 dando certo.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Eu n\u00e3o escrevi essa frase no plano porque n\u00e3o se escreve isso num plano.', if:R },

/* ======================================================================
   C5 - A FLORESTA
   Reconverge com o pensamento unico. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'esp10_floresta', chapter:'esp10', title:'O que sobrou',
  bg:'bg_grey_march_road', bgm:null, if:R },

{ t:'nar', tx:'Depois da aldeia a estrada entra na floresta e fica escura de repente, do jeito que fica quando as copas se tocam.', if:R },
{ t:'nar', tx:'Antoniette conhecia aquele trecho. Tinha atravessado ele em abril, cinco anos antes, com a janela aberta.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Naquela vez ela ia contando os quil\u00f4metros para n\u00e3o pensar no contrato.', if:R },
{ t:'nar', tx:'Desta vez contou os passos, porque passo \u00e9 a \u00fanica medida que serve quando n\u00e3o h\u00e1 roda.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Em algum ponto daquela noite, Antoniette escreveu a \u00faltima entrada do Arquivo.', if:R },
{ t:'nar', tx:'N\u00e3o h\u00e1 registro da hora. A caligrafia continuava firme. O espa\u00e7amento n\u00e3o.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Est\u00e1 tudo nas p\u00e1ginas anteriores.', if:R },
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
{ t:'nar', tx:'N\u00e3o trope\u00e7ou. N\u00e3o olhou para tr\u00e1s. Parou como quem chegou onde ia.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Klara.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'O ar da floresta esquentou.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'E Antoniette, que tinha cinco anos de registro e uma mem\u00f3ria treinada para dura\u00e7\u00f5es, n\u00e3o conseguiu dizer quanto tempo aquilo levou.', if:R },

{ t:'fade_out', if:R },
{ t:'bgm', id:null, if:R },
{ t:'end_chap', line1:'Agosto do quinto ano.', line2:'Faltavam quatro horas.',
  chapter:'esp10', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.ESP10; }
