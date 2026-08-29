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

{ t:'chap', num:'CAPÍTULO 10', name:'A CONTA', chapter:'per10', if:R },
{ t:'fade_out', if:R },

/* ======================================================================
   C1 - AGOSTO CHEGA
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'per10_agosto', chapter:'per10', title:'Terceiro dia',
  bg:'bg_kitchen', bgm:'bgm_nidhaus', if:R },
{ t:'fade_in', if:R },

{ t:'nar', tx:'A tabela de agosto abriu no dia três. O padrão dos quatro anos anteriores começava dois dias depois.', if:R },
{ t:'nar', tx:'Antoniette escreveu a diferença na margem: menos dois.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'dara', ex:'guarded', pos:'center', if:R },
{ t:'dial', ch:'dara', tx:'A copa fecha às seis esta semana.', if:R },
{ t:'dial', ch:'antoniette', tx:'Às seis?', if:R },
{ t:'dial', ch:'dara', tx:'Ordem da senhora.', if:R },
{ t:'spr_hide', ch:'dara', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Seis em vez de oito. Menos duas.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Ela abriu o caderno de despesas e conferiu o que sobrava do trimestre.', if:R },
{ t:'nar', tx:'Sobrava o bastante para uma passagem de barco e três semanas de estalagem, e mais nada.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'A conta fecha. Fecha justa, mas fecha.', if:R },

/* ======================================================================
   C2 - MAIO
   O retrospecto. A recusa foi correta, e sera cobrada assim mesmo.
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'per10_maio', chapter:'per10', title:'Maio',
  bg:'bg_corridor', bgm:null, if:R },

{ t:'nar', tx:'Em maio, na cocheira, Fenn tinha dito o preço olhando para o cavalo.', if:R },
{ t:'spr', ch:'fenn', ex:'neutral', pos:'right', if:R },
{ t:'dial', ch:'fenn', tx:'Três moedas e a porta da cozinha fica destrancada na noite que a senhora disser.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Três é caro por uma tranca.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'fenn', tx:'Não é pela tranca.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Fenn voltou a escovar o cavalo. Antoniette não perguntou o que as três moedas compravam além da tranca.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu penso.', if:R },
{ t:'dial', ch:'fenn', tx:'Pensa.', if:R },
{ t:'spr_hide', ch:'fenn', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela anotou o valor no caderno de despesas naquela mesma tarde e escreveu desnecessário ao lado.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'A porta de serviço fica destrancada até as onze de qualquer jeito. Está no registro de junho do ano dois.', if:R },
{ t:'inn', tx:'E se não estiver, dá a volta pelo pátio. São onze minutos.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela mediu os onze minutos numa quinta-feira de junho, com relógio, para não estar chutando.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A avaliação estava correta. Três moedas é caro por uma tranca.', if:R },

/* ======================================================================
   C3 - O ULTIMO DIA
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'per10_ultimo_dia', chapter:'per10', title:'O último dia',
  bg:'bg_corridor', bgm:null, if:R },

{ t:'nar', tx:'Na tarde do dia nove, Liara e Klara dividiam o degrau do corredor leste.', if:R },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center', if:R },
{ t:'spr', ch:'liara', ex:'bright', pos:'right', if:R },

{ t:'dial', ch:'liara', tx:'Mil novecentos e trinta e dois.', if:R },
{ t:'nar', tx:'Liara olhou para a irmã, porque a irmã nunca concordava com a conta de primeira.', if:R },
{ t:'dial', ch:'klara', tx:'Confirmei.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois Klara pediu para Liara trançar o cabelo dela, o que ela nunca pedia.', if:R },
{ t:'nar', tx:'Liara trançou mal, desmanchou e recomeçou três vezes, e a irmã deixou.', if:R },
{ t:'spr_hide', ch:'liara', if:R },
{ t:'spr_hide', ch:'klara', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette passou no fim do corredor com dois volumes que não precisava carregar.', if:R },
{ t:'inn', tx:'Ela está se despedindo.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'E fez isso do único jeito que não levanta pergunta nenhuma.', if:R },

/* ======================================================================
   C4 - A PORTA TRANCADA
   O preco, no mesmo capitulo da recusa. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'per10_porta', chapter:'per10', title:'Onze e vinte e cinco',
  bg:'bg_antoniette_room', bgm:'bgm_archive', if:R },

{ t:'nar', tx:'A troca da guarda do portão era às onze e meia. Ela sabia disso havia quatro meses.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Às onze e vinte e cinco ela desceu pela escada de serviço com o papel no bolso interno.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'klara', ex:'neutral', pos:'center', if:R },
{ t:'nar', tx:'Klara já estava no pé da escada, vestida, com o saco de pano na mão.', if:R },
{ t:'nar', tx:'Não perguntou nada. Foi atrás.', if:R },
{ t:'pause', if:R },

{ t:'sfx', id:'sfx_door', if:R },
{ t:'nar', tx:'A porta da cozinha estava trancada.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette experimentou duas vezes, porque duas vezes é o protocolo antes de concluir que uma porta está trancada.', if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'Onze minutos pelo pátio.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela olhou o relógio, fez a conta e a conta ainda dava.', if:R },
{ t:'nar', tx:'O barco era às seis e faltavam seis horas e trinta e cinco.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Por aqui.', if:R },
{ t:'nar', tx:'Klara foi atrás sem perguntar por que o caminho tinha mudado.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Deram a volta pelo pátio. Custou onze minutos e passou debaixo da janela de Aldric.', if:R },
{ t:'nar', tx:'A janela estava aberta por causa do calor.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Não havia luz no quarto. Havia som de página virando, que é um som que não precisa de luz para quem já sabe o livro.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette parou Klara com a mão no ombro dela e as duas esperaram quarenta segundos.', if:R },
{ t:'nar', tx:'O som não parou e não mudou de ritmo.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ele lê de pé. Nunca senta na própria biblioteca.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Aquilo ali é uma cadeira.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela não anotou. Foi a única observação de cinco anos que ela não anotou, e não houve tempo.', if:R },

/* ======================================================================
   C5 - A FARPA
   O numero, e nada em volta dele. NAO EXPLICAR.
   ====================================================================== */
{ t:'scene', id:'per10_farpa', chapter:'per10', title:'Onze minutos',
  bg:'bg_black', bgm:null, if:R },

{ t:'nar', tx:'Elas saíram pela porta nordeste às onze e quarenta e um.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Onze minutos.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Está dentro da folga.', if:R },
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
