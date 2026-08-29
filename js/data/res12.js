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

{ t:'chap', num:'CAPÍTULO 12', name:'O CORREDOR', chapter:'res12', if:R },
{ t:'fade_out', if:R },

/* ======================================================================
   C1 - O DESPACHO EM MAO
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'res12_despacho', chapter:'res12', title:'Dezembro',
  bg:'bg_nidhaus_gate', bgm:'bgm_prologue', if:R },
{ t:'fade_in', if:R },

{ t:'nar', tx:'O contrato correu até dezembro. Ela ficou os quatro meses e fechou o inventário da biblioteca inteira.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Duzentas e noventa e uma páginas, índice, plantas, três anexos, numeração fechando.', if:R },
{ t:'nar', tx:'Nenhuma folha arrancada, porque não havia nada ali que ela precisasse esconder de quem fosse ler.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'serafina', ex:'grave', pos:'right', if:R },
{ t:'nar', tx:'Serafina desceu ao pátio no último dia, o que não tinha feito por nenhuma outra saída da casa.', if:R },
{ t:'dial', ch:'serafina', tx:'A senhorita foi a melhor catalogadora que esta casa contratou.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'A senhora contratou quantas?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'serafina', tx:'Sete.', if:R },
{ t:'nar', tx:'Foi o número mais útil que alguém daquela casa deu a ela em cinco anos, e foi dado de graça.', if:R },
{ t:'spr_hide', ch:'serafina', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette anotou o sete na carruagem, com a letra tremida que a estrada faz.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Ela entregou o material em Lervel, em mão, com recibo, num terça-feira de manhã.', if:R },
{ t:'nar', tx:'Não houve pacote, não houve cordel em quatro voltas e não houve prazo de noventa dias.', if:R },
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
{ t:'nar', tx:'O tribunal não indeferiu.', if:R },
{ t:'pause', if:R },

{ t:'arc', key:'lervel', label:'— tribunal da Marca · decisão —', lns:[
    'Relato singular, de autoria falecida, completo e de procedência verificada.',
    'Julga-se improcedente por ausência de terceiro lesado.',
    '',
    'A administração doméstica de casa maior sobre pessoa de sua',
    'própria linhagem não constitui matéria de foro.'
], if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette leu a decisão de pé, no corredor, e depois sentou para ler de novo.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Autoria falecida.', if:R },
{ t:'nar', tx:'Não pediu emenda.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Não falta prova.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Falta parte.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A casa é dona da casa. As filhas são filhas da casa.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela passou cinco anos montando o documento que dava à casa a própria defesa. O tribunal aceitou cada página.', if:R },

/* ======================================================================
   C3 - A APOSTILA
   O elogio institucional como forma final da frieza. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'res12_apostila', chapter:'res12', title:'A apostila',
  bg:'bg_archive_closeup', bgm:'bgm_archive', if:R },

{ t:'nar', tx:'A Ordem arquivou o material como exemplar.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Em março do ano seis, a escola de campo de Lervel passou a usar as entradas 38, 91, 160 e 214 na formação de escribas.', if:R },
{ t:'pause', if:R },

{ t:'arc', key:'lervel', label:'— Ordem dos Olhos Cinzentos · formação de campo —', lns:[
    'Unidade 4 — Registro de procedimento observado.',
    '',
    'Leitura obrigatória: VAEL, A. — entradas 38, 91, 160 e 214.',
    'Exemplo de série longa com margem de duração decrescente.'
], if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'O nome dela está no índice da apostila, entre duas circulares sobre conservação de papel.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela foi chamada duas vezes para falar com a turma nova.', if:R },
{ t:'nar', tx:'Na primeira falou quarenta minutos sobre datar a margem antes de escrever o corpo.', if:R },
{ t:'nar', tx:'Na segunda, uma aluna de dezenove anos perguntou o que devia fazer para não se envolver.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'antoniette', ex:'neutral', pos:'center', if:R },
{ t:'dial', ch:'antoniette', tx:'Você data a margem antes de escrever o corpo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A aluna anotou. Foi a resposta certa e foi a única que ela tinha.', if:R },
{ t:'spr_hide', ch:'antoniette', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Ela foi efetivada no arquivo central em janeiro do ano seis, com aumento e uma sala com janela.', if:R },
{ t:'nar', tx:'A janela dava para o pátio de cargas.', if:R },

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
{ t:'dial', ch:'matheo', tx:'A numeração do seu material fecha em duzentos e noventa e um.', if:R },
{ t:'dial', ch:'antoniette', tx:'Fecha.', if:R },
{ t:'dial', ch:'matheo', tx:'Sem buraco.', if:R },
{ t:'dial', ch:'antoniette', tx:'Sem buraco.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ele fez que sim com a cabeça e subiu. Era um elogio, e os dois entenderam como elogio.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'A segunda foi quatro anos depois, num corredor, sobre encadernação.', if:R },
{ t:'nar', tx:'Ele achava que couro encerado era exagero para material interno. Ela discordou.', if:R },
{ t:'nar', tx:'A conversa durou seis minutos e nenhum dos dois cedeu.', if:R },
{ t:'spr_hide', ch:'matheo', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Em nenhuma das duas apareceu o nome da casa, o nome da menina, ou a palavra agosto.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Não houve motivo. As duas conversas eram sobre método, e método é um assunto inteiro.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Em agosto do ano seguinte uma borboleta de asa clara entrou pela janela da sala dela.', if:R },
{ t:'nar', tx:'A janela dava para o pátio de cargas, e não há registro de borboleta daquele tipo em Lervel.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela parou com a caixa na mão e ficou ali o tempo de a borboleta sair outra vez.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois levou a caixa até a mesa, porque era o que ela estava fazendo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Não anotou.', if:R },

{ t:'fade_out', if:R },
{ t:'bgm', id:null, if:R },
{ t:'end_chap', line1:'Seis anos em Lervel.', line2:'As duas foram sobre método.',
  chapter:'res12', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.RES12; }
