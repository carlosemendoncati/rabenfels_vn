/* ==========================================================================
   ARQUIVO RABENFELS - js/data/res12.js
   ROTA RESPOSTA - CAPITULO 12: "O Corredor"

   Somente dados. TODO BEAT CARREGA if:{ rota:'resposta' }.

   QUANDO: dezembro do ano cinco a agosto do ano onze. Lervel.

   O PENSAMENTO UNICO (Zinsser, unidade):
   "As duas foram sobre metodo."

   ------------------------------------------------------------------
   A CORRECAO DO STEINER, ENCENADA
   ------------------------------------------------------------------
   O Livro-Razao corria risco de virar premio: ela vive E o documento
   sai completo. Duas recompensas no mesmo desfecho.

   A correcao e que o documento completo E A PUNICAO.

   O tribunal nao indefere - julga improcedente por ausencia de terceiro
   lesado, que e outra coisa e e pior: nao falta prova, falta parte
   reclamante. A casa e dona da casa, e as filhas sao filhas da casa.
   O documento esta perfeito e nao havia processo para ele sustentar.

   A Ordem entao arquiva o material como exemplar e o usa na formacao de
   escribas de campo. Ela e promovida por ele. A apostila leva o nome
   dela no indice, entre duas circulares.

   >>> NENHUM COMPENSO. Steiner: um so aceno a uma teologia que ofereca
       o Paraiso como premio e fatal ao heroi tragico. O elogio
       institucional aqui NAO e premio - e a forma final da frieza. <<<

   ------------------------------------------------------------------
   O CORREDOR
   ------------------------------------------------------------------
   Ela e Matheo trabalham no mesmo corredor por seis anos e falam do
   assunto duas vezes. As duas sao sobre metodo.

   NAO ESCREVER RECONCILIACAO. Nao ha cena de acerto de contas, nao ha
   pergunta "voce sabia", nao ha resposta. A pergunta que ela escreveu
   para ele nas outras rotas nao existe nesta, porque ela esta viva e
   pergunta ao vivo nao se faz.

   Quatro cenas: C1 o despacho em mao, C2 o tribunal, C3 a apostila,
   C4 o corredor.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

var R = { rota: 'resposta' };

RBF.RES12 = [

{ t:'chap', num:'CAP\u00cdTULO 12', name:'O CORREDOR', chapter:'res12', if:R },
{ t:'fade_out', if:R },

/* ======================================================================
   C1 - O DESPACHO EM MAO
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'res12_despacho', chapter:'res12', title:'Dezembro',
  bg:'bg_nidhaus_gate', bgm:'bgm_prologue', if:R },
{ t:'fade_in', if:R },

{ t:'nar', tx:'O contrato correu at\u00e9 dezembro. Ela ficou os quatro meses e fechou o invent\u00e1rio da biblioteca inteira.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Duzentas e noventa e uma p\u00e1ginas, \u00edndice, plantas, tr\u00eas anexos, numera\u00e7\u00e3o fechando.', if:R },
{ t:'nar', tx:'Nenhuma folha arrancada, porque n\u00e3o havia nada ali que ela precisasse esconder de quem fosse ler.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'serafina', ex:'grave', pos:'right', if:R },
{ t:'nar', tx:'Serafina desceu ao p\u00e1tio no \u00faltimo dia, o que n\u00e3o tinha feito por nenhuma outra sa\u00edda da casa.', if:R },
{ t:'dial', ch:'serafina', tx:'A senhorita foi a melhor catalogadora que esta casa contratou.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'A senhora contratou quantas?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'serafina', tx:'Sete.', if:R },
{ t:'nar', tx:'Foi o n\u00famero mais \u00fatil que algu\u00e9m daquela casa deu a ela em cinco anos, e foi dado de gra\u00e7a.', if:R },
{ t:'spr_hide', ch:'serafina', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette anotou o sete na carruagem, com a letra tremida que a estrada faz.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Ela entregou o material em Lervel, em m\u00e3o, com recibo, num ter\u00e7a-feira de manh\u00e3.', if:R },
{ t:'nar', tx:'N\u00e3o houve pacote, n\u00e3o houve cordel em quatro voltas e n\u00e3o houve prazo de noventa dias.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Foi o material de campo mais completo que a Ordem recebeu em quarenta anos.', if:R },

/* ======================================================================
   C2 - O TRIBUNAL
   Nao indefere. Julga improcedente, que e outra coisa. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'res12_tribunal', chapter:'res12', title:'O tribunal',
  bg:'bg_prologue_room', bgm:null, if:R },

{ t:'nar', tx:'O processo entrou em quatro meses e saiu em nove.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'O tribunal n\u00e3o indeferiu.', if:R },
{ t:'pause', if:R },

{ t:'arc', key:'lervel', label:'\u2014 tribunal da Marca \u00b7 decis\u00e3o \u2014', lns:[
    'Relato singular, de autoria falecida, completo e de proced\u00eancia verificada.',
    'Julga-se improcedente por aus\u00eancia de terceiro lesado.',
    '',
    'A administra\u00e7\u00e3o dom\u00e9stica de casa maior sobre pessoa de sua',
    'pr\u00f3pria linhagem n\u00e3o constitui mat\u00e9ria de foro.'
], if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette leu a decis\u00e3o de p\u00e9, no corredor, e depois sentou para ler de novo.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Autoria falecida.', if:R },
{ t:'nar', tx:'N\u00e3o pediu emenda.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'N\u00e3o falta prova.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Falta parte.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A casa \u00e9 dona da casa. As filhas s\u00e3o filhas da casa.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela passou cinco anos montando o documento que dava \u00e0 casa a pr\u00f3pria defesa. O tribunal aceitou cada p\u00e1gina.', if:R },

/* ======================================================================
   C3 - A APOSTILA
   O elogio institucional como forma final da frieza. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'res12_apostila', chapter:'res12', title:'A apostila',
  bg:'bg_archive_closeup', bgm:'bgm_archive', if:R },

{ t:'nar', tx:'A Ordem arquivou o material como exemplar.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Em mar\u00e7o do ano seis, a escola de campo de Lervel passou a usar as entradas 38, 91, 160 e 214 na forma\u00e7\u00e3o de escribas.', if:R },
{ t:'pause', if:R },

{ t:'arc', key:'lervel', label:'\u2014 Ordem dos Olhos Cinzentos \u00b7 forma\u00e7\u00e3o de campo \u2014', lns:[
    'Unidade 4 \u2014 Registro de procedimento observado.',
    '',
    'Leitura obrigat\u00f3ria: VAEL, A. \u2014 entradas 38, 91, 160 e 214.',
    'Exemplo de s\u00e9rie longa com margem de dura\u00e7\u00e3o decrescente.'
], if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'O nome dela est\u00e1 no \u00edndice da apostila, entre duas circulares sobre conserva\u00e7\u00e3o de papel.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela foi chamada duas vezes para falar com a turma nova.', if:R },
{ t:'nar', tx:'Na primeira falou quarenta minutos sobre datar a margem antes de escrever o corpo.', if:R },
{ t:'nar', tx:'Na segunda, uma aluna de dezenove anos perguntou o que devia fazer para n\u00e3o se envolver.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'antoniette', ex:'neutral', pos:'center', if:R },
{ t:'dial', ch:'antoniette', tx:'Voc\u00ea data a margem antes de escrever o corpo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A aluna anotou. Foi a resposta certa e foi a \u00fanica que ela tinha.', if:R },
{ t:'spr_hide', ch:'antoniette', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Ela foi efetivada no arquivo central em janeiro do ano seis, com aumento e uma sala com janela.', if:R },
{ t:'nar', tx:'A janela dava para o p\u00e1tio de cargas.', if:R },

/* ======================================================================
   C4 - O CORREDOR
   Duas conversas em seis anos, as duas sobre metodo. Saida: farpa.
   ====================================================================== */
{ t:'scene', id:'res12_corredor', chapter:'res12', title:'Seis anos',
  bg:'bg_corridor', bgm:null, if:R },

{ t:'nar', tx:'O gabinete de Matheo ficava dois andares acima da sala dela.', if:R },
{ t:'nar', tx:'Eles trabalharam no mesmo corredor por seis anos e falaram do assunto duas vezes.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'matheo', ex:'read', pos:'center', if:R },
{ t:'nar', tx:'A primeira foi em fevereiro do ano seis, na escada.', if:R },
{ t:'dial', ch:'matheo', tx:'A numera\u00e7\u00e3o do seu material fecha em duzentos e noventa e um.', if:R },
{ t:'dial', ch:'antoniette', tx:'Fecha.', if:R },
{ t:'dial', ch:'matheo', tx:'Sem buraco.', if:R },
{ t:'dial', ch:'antoniette', tx:'Sem buraco.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ele fez que sim com a cabe\u00e7a e subiu. Era um elogio, e os dois entenderam como elogio.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'A segunda foi quatro anos depois, num corredor, sobre encaderna\u00e7\u00e3o.', if:R },
{ t:'nar', tx:'Ele achava que couro encerado era exagero para material interno. Ela discordou.', if:R },
{ t:'nar', tx:'A conversa durou seis minutos e nenhum dos dois cedeu.', if:R },
{ t:'spr_hide', ch:'matheo', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Em nenhuma das duas apareceu o nome da casa, o nome da menina, ou a palavra agosto.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'N\u00e3o houve motivo. As duas conversas eram sobre m\u00e9todo, e m\u00e9todo \u00e9 um assunto inteiro.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Em agosto do ano seguinte uma borboleta de asa clara entrou pela janela da sala dela.', if:R },
{ t:'nar', tx:'A janela dava para o p\u00e1tio de cargas, e n\u00e3o h\u00e1 registro de borboleta daquele tipo em Lervel.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela parou com a caixa na m\u00e3o e ficou ali o tempo de a borboleta sair outra vez.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois levou a caixa at\u00e9 a mesa, porque era o que ela estava fazendo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'N\u00e3o anotou.', if:R },

{ t:'fade_out', if:R },
{ t:'bgm', id:null, if:R },
{ t:'end_chap', line1:'Seis anos em Lervel.', line2:'As duas foram sobre m\u00e9todo.',
  chapter:'res12', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.RES12; }
