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
   Klara ja tem doze e a entrada diz onze. Nada em cena marca o erro.
   Carmine corrige no capitulo seguinte e Antoniette classifica a
   correcao como dentro da margem. NAO CONSERTAR.

   Cinco cenas: C1 agosto chega, C2 o ultimo dia, C3 a decisao de nao
   descer, C4 a entrada 214, C5 a farpa.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

var R = { rota: 'resposta' };

RBF.RES10 = [

{ t:'chap', num:'CAPÍTULO 10', name:'O REGISTRO', chapter:'res10', if:R },
{ t:'fade_out', if:R },

/* ======================================================================
   C1 - AGOSTO CHEGA
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'res10_agosto', chapter:'res10', title:'Terceiro dia',
  bg:'bg_kitchen', bgm:'bgm_nidhaus', if:R },
{ t:'fade_in', if:R },

{ t:'nar', tx:'A primeira linha da tabela do quinto agosto recebeu a data três. Era dois dias antes da faixa anterior.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette abriu o caderno na tabela de agosto e acrescentou uma coluna.', if:R },
{ t:'nar', tx:'A tabela tinha quatro linhas e passou a ter cinco, e a quinta era a primeira que não batia.', if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'Dois dias antes.', if:R },
{ t:'inn', tx:'Em cinco anos isso nunca variou mais que um.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ou a casa antecipou, ou eu estava medindo a coisa errada.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela escreveu as duas hipóteses e não escolheu entre elas, porque fonte única não decide nada.', if:R },

{ t:'spr', ch:'dara', ex:'guarded', pos:'center', if:R },
{ t:'dial', ch:'dara', tx:'A copa fecha às seis esta semana.', if:R },
{ t:'dial', ch:'antoniette', tx:'Desde quando?', if:R },
{ t:'dial', ch:'dara', tx:'Desde esta semana.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'E nos outros agostos?', if:R },
{ t:'nar', tx:'Dara parou com a caneca no meio do caminho.', if:R },
{ t:'dial', ch:'dara', tx:'Nos outros agostos ninguém perguntou.', if:R },
{ t:'spr_hide', ch:'dara', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette anotou a resposta inteira, com a pausa, porque a pausa era o dado.', if:R },

/* ======================================================================
   C2 - O ULTIMO DIA
   Ela ve a despedida e a registra. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'res10_ultimo_dia', chapter:'res10', title:'O último dia',
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
{ t:'pause', if:R },

{ t:'nar', tx:'Depois Klara pediu para Liara trançar o cabelo dela, o que ela nunca pedia.', if:R },
{ t:'nar', tx:'Liara trançou mal, desmanchou e recomeçou três vezes, e a irmã deixou.', if:R },
{ t:'spr_hide', ch:'liara', if:R },
{ t:'spr_hide', ch:'klara', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette anotou a hora, a duração e o pedido.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Comportamento de despedida. Consistente com as entradas 38, 91 e 160.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Escreveu essa frase e leu de novo, e a frase estava correta.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Consistente com as entradas.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Sublinhou a palavra consistente e não soube dizer por quê, e não anotou isso.', if:R },

/* ======================================================================
   C3 - A DECISAO DE NAO DESCER
   O recuo E mostrado como decisao, com o preco a vista. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'res10_decisao', chapter:'res10', title:'Onze e meia',
  bg:'bg_antoniette_room', bgm:'bgm_archive', if:R },
{ t:'spr', ch:'antoniette', ex:'guarded', pos:'center', if:R },

{ t:'nar', tx:'A troca da guarda do portão era às onze e meia. Ela sabia disso havia quatro meses.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Às onze e vinte ela tirou o papel do bolso interno e leu inteiro mais uma vez, à vela.', if:R },
{ t:'nar', tx:'Estava tudo certo. Datas, horários, o que funciona e o que não funciona.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'No rodapé, com a letra dela, de junho: probabilidade honesta, baixa.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Baixa não é nula.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Baixa é o que eu escrevi quando não tinha nada em jogo.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela pôs a mão na maçaneta às onze e vinte e cinco.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ficou ali o tempo de a guarda trocar. Ouviu os dois pares de botas no calçamento.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois voltou para a escrivaninha, acendeu a vela nova e abriu o caderno.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'antoniette', ex:'away', pos:'center', if:R },
{ t:'inn', tx:'Se eu descer e falhar, não sobra registro e não sobra ninguém para escrever o registro.', if:R },
{ t:'inn', tx:'Se eu ficar, sobra o documento.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'O documento serve a alguém depois.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Escreveu a conclusão duas vezes, uma embaixo da outra. As duas ficaram iguais.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'O raciocínio estava correto. O custo tinha nome e ficou fora da folha.', if:R },

/* ======================================================================
   C4 - A ENTRADA 214
   O orgulho e sincero. A idade esta errada e ninguem marca.
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'res10_entrada', chapter:'res10', title:'Entrada 214',
  bg:'bg_archive_closeup', bgm:'bgm_archive', if:R },

{ t:'nar', tx:'Ela abriu a entrada daquela noite antes de a noite acabar, coisa que nunca tinha feito.', if:R },
{ t:'pause', if:R },

/* A idade esta ERRADA de proposito. Klara ja tem doze.
   Carmine corrige no capitulo seguinte. NAO CONSERTAR. */
{ t:'arc', key:'caderno', label:'— caderno sem identificação —', lns:[
    'Entrada 214. Sujeito feminino, onze anos, segunda linha.',
    'Início do processo às três e dez.',
    'Duração estimada quatro horas, conforme as entradas 38, 91 e 160.'
], if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'As três anteriores foram escritas depois, de memória.', if:R },
{ t:'inn', tx:'Esta não.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela trocou a vela às duas e meia e continuou.', if:R },
{ t:'nar', tx:'A entrada 214 ocupou três páginas, que é a média das entradas longas.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Está saindo melhor que a 160.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A satisfação era verdadeira e ela não a escondeu de si mesma. Escondeu do papel, que é outra coisa.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Em nenhuma das duzentas e catorze entradas aparece a palavra Klara.', if:R },
{ t:'nar', tx:'O documento usa sujeito, e usa segunda linha, e usa a escolhida quando cita a casa.', if:R },
{ t:'nar', tx:'É a nomenclatura correta para material de foro. Está no manual, página quatro.', if:R },

/* ======================================================================
   C5 - A FARPA
   Ela anota o ar esquentando. NAO EXPLICAR.
   ====================================================================== */
{ t:'scene', id:'res10_farpa', chapter:'res10', title:'Três e dez',
  bg:'bg_black', bgm:null, if:R },

{ t:'nar', tx:'Faltavam quatro horas para o fim do processo.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela ouviu a porta do quarto das gêmeas às três e dez e anotou a hora.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Passos curtos no assoalho, indo até o alto da escada. E parando lá.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette não levantou. A pena continuou onde estava.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'O ar do escritório esquentou. Ela anotou isso também.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'O relógio continuou sobre a mesa. Ela não olhou para ele enquanto o ar ficava quente.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela deixou o campo da duração em branco e voltou a ele de manhã.', if:R },

{ t:'fade_out', if:R },
{ t:'bgm', id:null, if:R },
{ t:'end_chap', line1:'Agosto do quinto ano.', line2:'Ela não desceu.',
  chapter:'res10', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.RES10; }
