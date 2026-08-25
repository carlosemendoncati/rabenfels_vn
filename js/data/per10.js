/* ==========================================================================
   ARQUIVO RABENFELS - js/data/per10.js
   ROTA PERDA - CAPITULO 10: "A Conta"

   Somente dados. TODO BEAT CARREGA if:{ rota:'perda' }.

   QUANDO: Ano 5, agosto. A rota mais longa da obra: quatro capitulos.

   O PENSAMENTO UNICO (Zinsser, unidade):
   "Ela economizou."

   ------------------------------------------------------------------
   A ROTA DA SOMA
   ------------------------------------------------------------------
   Perda alta e a soma do que ela decidiu NAO fazer: nao perguntou, nao
   copiou, nao levou a menina ao patio, nao contou a verdade, nao pagou
   o que pediram. Cada recusa isolada foi defensavel. A soma nao e.

   Este capitulo mostra a ultima delas em acao, e mostra o preco no
   mesmo capitulo, coisa que a obra nao fez nenhuma outra vez.

   ------------------------------------------------------------------
   AS TRES MOEDAS - E A ARMADILHA QUE ELAS SAO
   ------------------------------------------------------------------
   Fenn pediu tres moedas em maio para deixar a porta da cozinha
   destrancada na noite que ela pedisse. Ela achou caro, e a avaliacao
   dela estava correta: tres moedas e caro por uma tranca.

   Na noite de nove de agosto a porta esta trancada e a volta pelo patio
   custa onze minutos.

   >>> STEINER, R11: A CADEIA CAUSAL FICA E O MERITO SAI. <<<
   Os onze minutos sao reais, sao contados, e NAO SAO O MOTIVO. Carmine
   desmonta a aritmetica no Capitulo 12, sem explicar, e Antoniette nao
   entende e anota assim mesmo. Um final em que ela morre PORQUE errou
   seria parabola. Ela morre, e o erro dela custou caro sem ter sido a
   causa. As duas coisas sao verdade ao mesmo tempo.

   NAO DEIXAR NENHUM BEAT DESTE CAPITULO SUGERIR QUE PAGAR TERIA
   SALVADO ALGUEM.

   Cinco cenas: C1 agosto chega, C2 maio, C3 o ultimo dia, C4 a porta
   trancada, C5 a farpa.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

var R = { rota: 'perda' };

RBF.PER10 = [

{ t:'chap', num:'CAP\u00cdTULO 10', name:'A CONTA', chapter:'per10', if:R },
{ t:'fade_out', if:R },

/* ======================================================================
   C1 - AGOSTO CHEGA
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'per10_agosto', chapter:'per10', title:'Terceiro dia',
  bg:'bg_kitchen', bgm:'bgm_nidhaus', if:R },
{ t:'fade_in', if:R },

{ t:'nar', tx:'Vieram no dia tr\u00eas, dois dias antes do padr\u00e3o dos quatro anos anteriores.', if:R },
{ t:'nar', tx:'Antoniette anotou a antecipa\u00e7\u00e3o e olhou o n\u00famero por mais tempo do que precisava.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'dara', ex:'guarded', pos:'center', if:R },
{ t:'dial', ch:'dara', tx:'A copa fecha \u00e0s seis esta semana.', if:R },
{ t:'dial', ch:'antoniette', tx:'\u00c0s seis?', if:R },
{ t:'dial', ch:'dara', tx:'Ordem da senhora.', if:R },
{ t:'spr_hide', ch:'dara', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'A casa est\u00e1 fechando mais cedo do que fecha.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Ela abriu o caderno de despesas e conferiu o que sobrava do trimestre.', if:R },
{ t:'nar', tx:'Sobrava o bastante para uma passagem de barco e tr\u00eas semanas de estalagem, e mais nada.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'A conta fecha. Fecha justa, mas fecha.', if:R },

/* ======================================================================
   C2 - MAIO
   O retrospecto. A recusa foi correta, e sera cobrada assim mesmo.
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'per10_maio', chapter:'per10', title:'Maio',
  bg:'bg_corridor', bgm:null, if:R },

{ t:'nar', tx:'Em maio, na cocheira, Fenn tinha dito o pre\u00e7o olhando para o cavalo.', if:R },
{ t:'spr', ch:'fenn', ex:'neutral', pos:'right', if:R },
{ t:'dial', ch:'fenn', tx:'Tr\u00eas moedas e a porta da cozinha fica destrancada na noite que a senhora disser.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Tr\u00eas \u00e9 caro por uma tranca.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'fenn', tx:'N\u00e3o \u00e9 pela tranca.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ele n\u00e3o explicou pelo que era, e ela n\u00e3o perguntou, e ele parou exatamente onde a verdade dele acabava.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu penso.', if:R },
{ t:'dial', ch:'fenn', tx:'Pensa.', if:R },
{ t:'spr_hide', ch:'fenn', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela anotou o valor no caderno de despesas naquela mesma tarde e escreveu desnecess\u00e1rio ao lado.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'A porta de servi\u00e7o fica destrancada at\u00e9 as onze de qualquer jeito. Est\u00e1 no registro de junho do ano dois.', if:R },
{ t:'inn', tx:'E se n\u00e3o estiver, d\u00e1 a volta pelo p\u00e1tio. S\u00e3o onze minutos.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela mediu os onze minutos numa quinta-feira de junho, com rel\u00f3gio, para n\u00e3o estar chutando.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A avalia\u00e7\u00e3o estava correta. Tr\u00eas moedas \u00e9 caro por uma tranca.', if:R },

/* ======================================================================
   C3 - O ULTIMO DIA
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'per10_ultimo_dia', chapter:'per10', title:'O \u00faltimo dia',
  bg:'bg_corridor', bgm:null, if:R },

{ t:'nar', tx:'No dia nove, \u00e0 tarde, as duas estavam no degrau do corredor leste.', if:R },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center', if:R },
{ t:'spr', ch:'liara', ex:'bright', pos:'right', if:R },

{ t:'dial', ch:'liara', tx:'Mil novecentos e trinta e dois.', if:R },
{ t:'dial', ch:'klara', tx:'Confirmei.', if:R },
{ t:'nar', tx:'Liara olhou para a irm\u00e3, porque a irm\u00e3 nunca concordava com a conta de primeira.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois Klara pediu para Liara tran\u00e7ar o cabelo dela, o que ela nunca pedia.', if:R },
{ t:'nar', tx:'Liara tran\u00e7ou mal, desmanchou e recome\u00e7ou tr\u00eas vezes, e a irm\u00e3 deixou.', if:R },
{ t:'spr_hide', ch:'liara', if:R },
{ t:'spr_hide', ch:'klara', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette passou no fim do corredor com dois volumes que n\u00e3o precisava carregar.', if:R },
{ t:'inn', tx:'Ela est\u00e1 se despedindo.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'E fez isso do \u00fanico jeito que n\u00e3o levanta pergunta nenhuma.', if:R },

/* ======================================================================
   C4 - A PORTA TRANCADA
   O preco, no mesmo capitulo da recusa. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'per10_porta', chapter:'per10', title:'Onze e vinte e cinco',
  bg:'bg_antoniette_room', bgm:'bgm_archive', if:R },

{ t:'nar', tx:'A troca da guarda do port\u00e3o era \u00e0s onze e meia. Ela sabia disso havia quatro meses.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'\u00c0s onze e vinte e cinco ela desceu pela escada de servi\u00e7o com o papel no bolso interno.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'klara', ex:'neutral', pos:'center', if:R },
{ t:'nar', tx:'Klara j\u00e1 estava no p\u00e9 da escada, vestida, com o saco de pano na m\u00e3o.', if:R },
{ t:'nar', tx:'N\u00e3o perguntou nada. Foi atr\u00e1s.', if:R },
{ t:'pause', if:R },

{ t:'sfx', id:'sfx_door', if:R },
{ t:'nar', tx:'A porta da cozinha estava trancada.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette experimentou duas vezes, porque duas vezes \u00e9 o protocolo antes de concluir que uma porta est\u00e1 trancada.', if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'Onze minutos pelo p\u00e1tio.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela olhou o rel\u00f3gio, fez a conta e a conta ainda dava.', if:R },
{ t:'nar', tx:'O barco era \u00e0s seis e faltavam seis horas e trinta e cinco.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Por aqui.', if:R },
{ t:'nar', tx:'Klara foi atr\u00e1s sem perguntar por que o caminho tinha mudado.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Deram a volta pelo p\u00e1tio. Custou onze minutos e passou debaixo da janela de Aldric.', if:R },
{ t:'nar', tx:'A janela estava aberta por causa do calor.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'N\u00e3o havia luz no quarto. Havia som de p\u00e1gina virando, que \u00e9 um som que n\u00e3o precisa de luz para quem j\u00e1 sabe o livro.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette parou Klara com a m\u00e3o no ombro dela e as duas esperaram quarenta segundos.', if:R },
{ t:'nar', tx:'O som n\u00e3o parou e n\u00e3o mudou de ritmo.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ele l\u00ea de p\u00e9. Nunca senta na pr\u00f3pria biblioteca.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Aquilo ali \u00e9 uma cadeira.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela n\u00e3o anotou. Foi a \u00fanica observa\u00e7\u00e3o de cinco anos que ela n\u00e3o anotou, e n\u00e3o houve tempo.', if:R },

/* ======================================================================
   C5 - A FARPA
   O numero, e nada em volta dele. NAO EXPLICAR.
   ====================================================================== */
{ t:'scene', id:'per10_farpa', chapter:'per10', title:'Onze minutos',
  bg:'bg_black', bgm:null, if:R },

{ t:'nar', tx:'Elas sa\u00edram pela porta nordeste \u00e0s onze e quarenta e um.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Onze minutos.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Est\u00e1 dentro da folga.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Estava.', if:R },

{ t:'fade_out', if:R },
{ t:'bgm', id:null, if:R },
{ t:'end_chap', line1:'Nove de agosto, onze e quarenta e um.', line2:'Onze minutos de atraso.',
  chapter:'per10', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.PER10; }
