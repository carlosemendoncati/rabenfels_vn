/* ==========================================================================
   ARQUIVO RABENFELS - js/data/res10.js
   ROTA RESPOSTA - CAPITULO 10: "O Registro"

   Somente dados. TODO BEAT CARREGA if:{ rota:'resposta' }.

   QUANDO: Ano 5, agosto. Klara e Liara tem doze anos.

   O PENSAMENTO UNICO (Zinsser, unidade):
   "Ela nao desce."

   ------------------------------------------------------------------
   A ROTA DE QUEM ENTENDEU TUDO
   ------------------------------------------------------------------
   Resposta alta e Perda baixa. Ela sabe o cronograma inteiro, tem a
   planta, tem as datas das dezesseis geracoes, e nao paga por nada
   disso. Nao desce nenhuma noite.

   ISSO NAO E COVARDIA E NAO PODE SER ESCRITO COMO COVARDIA. E metodo.
   Ela conferiu a probabilidade em junho, com a propria letra, e a
   probabilidade era baixa. Uma arquivista de campo que age contra a
   propria avaliacao de risco esta sendo ma arquivista de campo.

   O horror desta rota e que ela esta CERTA.

   ------------------------------------------------------------------
   R12 DO CORPUS - O ORGULHO E SINCERO
   ------------------------------------------------------------------
   Ishiguro: a narradora nao suprime a emocao, redireciona para o
   oficio, e se gaba do proprio desempenho dentro do sistema que vai
   consumi-la. Antoniette nao se contem nesta rota: ela fica satisfeita
   com a qualidade do registro, e a satisfacao e verdadeira.

   A entrada 214 e a primeira das quatro escrita AO VIVO, e nao de
   memoria. Ela sabe o que isso vale.

   >>> A IDADE NA ENTRADA 214 ESTA ERRADA DE PROPOSITO. <<<
   Klara fez doze em marco e a entrada diz onze. Nada em cena marca o
   erro. Carmine corrige no capitulo seguinte e Antoniette classifica a
   correcao como dentro da margem. NAO CONSERTAR.

   Cinco cenas: C1 agosto chega, C2 o ultimo dia, C3 a decisao de nao
   descer, C4 a entrada 214, C5 a farpa.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

var R = { rota: 'resposta' };

RBF.RES10 = [

{ t:'chap', num:'CAP\u00cdTULO 10', name:'O REGISTRO', chapter:'res10', if:R },
{ t:'fade_out', if:R },

/* ======================================================================
   C1 - AGOSTO CHEGA
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'res10_agosto', chapter:'res10', title:'Terceiro dia',
  bg:'bg_kitchen', bgm:'bgm_nidhaus', if:R },
{ t:'fade_in', if:R },

{ t:'nar', tx:'Vieram no dia tr\u00eas, dois dias antes do padr\u00e3o dos quatro anos anteriores.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette abriu o caderno na tabela de agosto e acrescentou uma coluna.', if:R },
{ t:'nar', tx:'A tabela tinha quatro linhas e passou a ter cinco, e a quinta era a primeira que n\u00e3o batia.', if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'Dois dias antes.', if:R },
{ t:'inn', tx:'Em cinco anos isso nunca variou mais que um.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ou a casa antecipou, ou eu estava medindo a coisa errada.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela escreveu as duas hip\u00f3teses e n\u00e3o escolheu entre elas, porque fonte \u00fanica n\u00e3o decide nada.', if:R },

{ t:'spr', ch:'dara', ex:'guarded', pos:'center', if:R },
{ t:'dial', ch:'dara', tx:'A copa fecha \u00e0s seis esta semana.', if:R },
{ t:'dial', ch:'antoniette', tx:'Desde quando?', if:R },
{ t:'dial', ch:'dara', tx:'Desde esta semana.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'E nos outros agostos?', if:R },
{ t:'nar', tx:'Dara parou com a caneca no meio do caminho.', if:R },
{ t:'dial', ch:'dara', tx:'Nos outros agostos ningu\u00e9m perguntou.', if:R },
{ t:'spr_hide', ch:'dara', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette anotou a resposta inteira, com a pausa, porque a pausa era o dado.', if:R },

/* ======================================================================
   C2 - O ULTIMO DIA
   Ela ve a despedida e a registra. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'res10_ultimo_dia', chapter:'res10', title:'O \u00faltimo dia',
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
{ t:'pause', if:R },

{ t:'nar', tx:'Depois Klara pediu para Liara tran\u00e7ar o cabelo dela, o que ela nunca pedia.', if:R },
{ t:'nar', tx:'Liara tran\u00e7ou mal, desmanchou e recome\u00e7ou tr\u00eas vezes, e a irm\u00e3 deixou.', if:R },
{ t:'spr_hide', ch:'liara', if:R },
{ t:'spr_hide', ch:'klara', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette anotou a hora, a dura\u00e7\u00e3o e o pedido.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Comportamento de despedida. Consistente com as entradas 38, 91 e 160.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Escreveu essa frase e leu de novo, e a frase estava correta.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Consistente com as entradas.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Sublinhou a palavra consistente e n\u00e3o soube dizer por qu\u00ea, e n\u00e3o anotou isso.', if:R },

/* ======================================================================
   C3 - A DECISAO DE NAO DESCER
   O recuo E mostrado como decisao, com o preco a vista. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'res10_decisao', chapter:'res10', title:'Onze e meia',
  bg:'bg_antoniette_room', bgm:'bgm_archive', if:R },
{ t:'spr', ch:'antoniette', ex:'guarded', pos:'center', if:R },

{ t:'nar', tx:'A troca da guarda do port\u00e3o era \u00e0s onze e meia. Ela sabia disso havia quatro meses.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'\u00c0s onze e vinte ela tirou o papel do bolso interno e leu inteiro mais uma vez, \u00e0 vela.', if:R },
{ t:'nar', tx:'Estava tudo certo. Datas, hor\u00e1rios, o que funciona e o que n\u00e3o funciona.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'No rodap\u00e9, com a letra dela, de junho: probabilidade honesta, baixa.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Baixa n\u00e3o \u00e9 nula.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Baixa \u00e9 o que eu escrevi quando n\u00e3o tinha nada em jogo.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela p\u00f4s a m\u00e3o na ma\u00e7aneta \u00e0s onze e vinte e cinco.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ficou ali o tempo de a guarda trocar. Ouviu os dois pares de botas no cal\u00e7amento.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois voltou para a escrivaninha, acendeu a vela nova e abriu o caderno.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'antoniette', ex:'away', pos:'center', if:R },
{ t:'inn', tx:'Se eu descer e falhar, n\u00e3o sobra registro e n\u00e3o sobra ningu\u00e9m para escrever o registro.', if:R },
{ t:'inn', tx:'Se eu ficar, sobra o documento.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'O documento serve a algu\u00e9m depois.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela conferiu o racioc\u00ednio duas vezes, do jeito que conferia tudo, e ele fechou nas duas.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Foi o \u00fanico racioc\u00ednio correto da obra inteira que custou uma pessoa.', if:R },

/* ======================================================================
   C4 - A ENTRADA 214
   O orgulho e sincero. A idade esta errada e ninguem marca.
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'res10_entrada', chapter:'res10', title:'Entrada 214',
  bg:'bg_archive_closeup', bgm:'bgm_archive', if:R },

{ t:'nar', tx:'Ela abriu a entrada daquela noite antes de a noite acabar, coisa que nunca tinha feito.', if:R },
{ t:'pause', if:R },

/* A idade esta ERRADA de proposito. Klara fez doze em marco.
   Carmine corrige no capitulo seguinte. NAO CONSERTAR. */
{ t:'arc', key:'caderno', label:'\u2014 caderno sem identifica\u00e7\u00e3o \u2014', lns:[
    'Entrada 214. Sujeito feminino, onze anos, segunda linha.',
    'In\u00edcio do processo \u00e0s tr\u00eas e dez.',
    'Dura\u00e7\u00e3o estimada quatro horas, conforme as entradas 38, 91 e 160.'
], if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'As tr\u00eas anteriores foram escritas depois, de mem\u00f3ria.', if:R },
{ t:'inn', tx:'Esta n\u00e3o.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela trocou a vela \u00e0s duas e meia e continuou.', if:R },
{ t:'nar', tx:'A entrada 214 ocupou tr\u00eas p\u00e1ginas, que \u00e9 a m\u00e9dia das entradas longas.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Est\u00e1 saindo melhor que a 160.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A satisfa\u00e7\u00e3o era verdadeira e ela n\u00e3o a escondeu de si mesma. Escondeu do papel, que \u00e9 outra coisa.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Em nenhuma das duzentas e catorze entradas aparece a palavra Klara.', if:R },
{ t:'nar', tx:'O documento usa sujeito, e usa segunda linha, e usa a escolhida quando cita a casa.', if:R },
{ t:'nar', tx:'\u00c9 a nomenclatura correta para material de foro. Est\u00e1 no manual, p\u00e1gina quatro.', if:R },

/* ======================================================================
   C5 - A FARPA
   Ela anota o ar esquentando. NAO EXPLICAR.
   ====================================================================== */
{ t:'scene', id:'res10_farpa', chapter:'res10', title:'Tr\u00eas e dez',
  bg:'bg_black', bgm:null, if:R },

{ t:'nar', tx:'Faltavam quatro horas para o fim do processo.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela ouviu a porta do quarto das g\u00eameas \u00e0s tr\u00eas e dez e anotou a hora.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Passos curtos no assoalho, indo at\u00e9 o alto da escada. E parando l\u00e1.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette n\u00e3o levantou. A pena continuou onde estava.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'O ar do escrit\u00f3rio esquentou. Ela anotou isso tamb\u00e9m.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'E Antoniette, que tinha cinco anos de registro e uma mem\u00f3ria treinada para dura\u00e7\u00f5es, n\u00e3o conseguiu dizer quanto tempo aquilo levou.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela deixou o campo da dura\u00e7\u00e3o em branco e voltou a ele de manh\u00e3.', if:R },

{ t:'fade_out', if:R },
{ t:'bgm', id:null, if:R },
{ t:'end_chap', line1:'Agosto do quinto ano.', line2:'Ela n\u00e3o desceu.',
  chapter:'res10', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.RES10; }
