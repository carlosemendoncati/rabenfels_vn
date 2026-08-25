/* ==========================================================================
   ARQUIVO RABENFELS - js/data/per13.js
   ROTA PERDA - CAPITULO 13: "O Que Ela Anotou"

   Somente dados. TODO BEAT CARREGA if:{ rota:'perda' }.

   O CAPITULO MAIS LONGO DA OBRA EM NUMERO, e o ultimo de todos.

   QUANDO: a hora e quarenta que sobrou, e os noventa e tres dias.

   O PENSAMENTO UNICO (Zinsser, unidade):
   "A ultima pagina e uma coluna."

   ------------------------------------------------------------------
   O QUE ESTA ROTA TEM QUE AS OUTRAS NAO TEM
   ------------------------------------------------------------------
   Nas outras tres a ultima entrada e sobre a menina. Aqui ela e sobre
   a menina E sobre a conta, e a conta vem depois - e a ultima coisa
   que Antoniette escreve na vida e um total.

   Matheo vai conferir esse total, porque ele confere todo total, e vai
   descobrir que fecha. E vai ficar com a folha na mao sem saber o que
   se faz com uma conta que fecha.

   >>> A CONTA ESTA CERTA E O RACIOCINIO ESTA ERRADO, e nenhum dos dois
       jamais vai saber disso. O jogador sabe. E o unico que sabe. <<<

   Quatro cenas: C1 as quatro paginas, C2 a ultima entrada,
   C3 a coluna, C4 noventa dias.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

var R = { rota: 'perda' };

RBF.PER13 = [

{ t:'chap', num:'CAP\u00cdTULO 13', name:'O QUE ELA ANOTOU', chapter:'per13', if:R },
{ t:'fade_out', if:R },

/* ======================================================================
   C1 - AS QUATRO PAGINAS
   Le hid_from_order, told_klara, lied_to_order, third_paid.
   ====================================================================== */
{ t:'scene', id:'per13_paginas', chapter:'per13', title:'Quatro p\u00e1ginas',
  bg:'bg_archive_closeup', bgm:'bgm_archive', if:R },
{ t:'fade_in', if:R },
{ t:'spr', ch:'antoniette', ex:'away', pos:'center', if:R },

{ t:'nar', tx:'Ela escreveu at\u00e9 as tr\u00eas e meia sem parar para reler.', if:R },
{ t:'nar', tx:'Duzentas e noventa e uma p\u00e1ginas numeradas, cinco anos, tudo o que servia.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Se algu\u00e9m usar isto, vai usar contra a casa.', if:R },
{ t:'inn', tx:'E vai ler tudo. Inclusive o que eu fiz.', if:R },
{ t:'pause', if:R },

{ t:'sfx', id:'sfx_page_turn', if:R },
{ t:'nar', tx:'A p\u00e1gina de outubro do primeiro ano. O que ela viu no p\u00e1tio e n\u00e3o mandou para a Ordem.', if:{ rota:'perda', hid_from_order:true } },
{ t:'nar', tx:'A p\u00e1gina de outubro do primeiro ano. O que ela mandou para a Ordem, e o que a Ordem arquivou sem responder.', if:{ rota:'perda', hid_from_order:false } },
{ t:'inn', tx:'Tr\u00eas.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A p\u00e1gina da c\u00e2mara. Ela desceu, viu, e subiu com uma crian\u00e7a de nove anos cobrindo a aus\u00eancia dela no andar de cima.', if:R },
{ t:'nar', tx:'Na margem, o que ela respondeu a Klara depois: nada. Deixou fechar sozinho.', if:{ rota:'perda', told_klara:'A' } },
{ t:'nar', tx:'Na margem, o que ela respondeu a Klara depois: uma vers\u00e3o limpa, feita para a menina n\u00e3o ter de carregar aquilo.', if:{ rota:'perda', told_klara:'B' } },
{ t:'nar', tx:'Na margem, o que ela respondeu a Klara depois: a verdade, e um pedido para n\u00e3o repetir.', if:{ rota:'perda', told_klara:'C' } },
{ t:'inn', tx:'Duas.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A p\u00e1gina de agosto do terceiro ano.', if:R },
{ t:'nar', tx:'O relat\u00f3rio inteiro, com o que ela viu subir. Lervel recebeu tudo e respondeu em nove semanas mandando continuar observando.', if:{ rota:'perda', lied_to_order:'A' } },
{ t:'nar', tx:'O relat\u00f3rio com o epis\u00f3dio dado como de natureza indeterminada, sem testemunha direta. Ela foi a testemunha direta.', if:{ rota:'perda', lied_to_order:'B' } },
{ t:'nar', tx:'A p\u00e1gina em que agosto n\u00e3o existe. Lervel recebeu o m\u00eas sem o m\u00eas dentro.', if:{ rota:'perda', lied_to_order:'C' } },
{ t:'inn', tx:'Uma.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A p\u00e1gina de Fenn.', if:R },
{ t:'nar', tx:'Ela leu tr\u00eas vezes antes de arrancar, e nas outras leituras ela l\u00ea duas.', if:R },
{ t:'nar', tx:'Um homem foi \u00fatil a ela e ela negaria a fonte se perguntassem. Isso n\u00e3o cabia em coluna nenhuma.', if:{ rota:'perda', third_paid:'A' } },
{ t:'nar', tx:'Ela comprou o nome para levar a Lervel, e o nome era de um homem vivo. Isso n\u00e3o cabia em coluna nenhuma.', if:{ rota:'perda', third_paid:'B' } },
{ t:'nar', tx:'Ela recusou o nome e mandou o rapaz embora no mesmo dia. Ficou sem a prova e nunca soube se o menino chegou.', if:{ rota:'perda', third_paid:'C' } },
{ t:'pause', if:R },
{ t:'inn', tx:'Nenhuma.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Quatro folhas na m\u00e3o esquerda. Duzentas e oitenta e sete no ma\u00e7o.', if:R },
{ t:'inn', tx:'A numera\u00e7\u00e3o vai continuar terminando em duzentos e noventa e um.', if:R },
{ t:'inn', tx:'Quem contar vai ver.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'guarded', pos:'center', if:R },
{ t:'inn', tx:'Bom. Que veja.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela desceu ao escrit\u00f3rio do bar\u00e3o com as quatro p\u00e1ginas e a chave que copiou no segundo ano.', if:R },
{ t:'nar', tx:'O livro-caixa da casa tinha quatro folhas em branco no fim, como todo livro-caixa tem.', if:R },
{ t:'nar', tx:'Ela p\u00f4s as quatro p\u00e1ginas no lugar delas e fechou a fivela.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A janela do quarto de Aldric dava para aquele corredor. Estava fechada, e a noite continuava quente.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Subiu. Faltava uma hora e quarenta para o amanhecer.', if:R },

/* ======================================================================
   C2 - A ULTIMA ENTRADA
   ====================================================================== */
{ t:'scene', id:'per13_ultima', chapter:'per13', title:'A \u00faltima entrada',
  bg:'bg_antoniette_room', bgm:null, if:R },
{ t:'spr', ch:'antoniette', ex:'away', pos:'center', if:R },

{ t:'nar', tx:'Ela molhou a pena e n\u00e3o escreveu.', if:R },
{ t:'nar', tx:'A caligrafia continuou firme quando finalmente saiu. O espa\u00e7amento n\u00e3o.', if:R },
{ t:'pause', if:R },

{ t:'arc', key:'arquivo', lns:[
    '\u201cPara quem encontrar isto.\u201d',
    '\u201cN\u00e3o sei seu nome. Tanto faz.\u201d'
], if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'Escreve o que serve. Ningu\u00e9m l\u00ea lamento.', if:R },
{ t:'nar', tx:'Ela escreveu a idade, a velocidade de leitura e o jeito de corrigir os outros em voz baixa.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Parou.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Isso n\u00e3o \u00e9 informa\u00e7\u00e3o operacional.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'soft', pos:'center', if:R },
{ t:'inn', tx:'Deixa.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Escreveu tamb\u00e9m que ela troca o saco de m\u00e3o com a m\u00e3o que j\u00e1 est\u00e1 carregando, para poupar a outra.', if:R },
{ t:'nar', tx:'Isso tamb\u00e9m n\u00e3o servia para nada. Ficou.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Depois escreveu as tr\u00eas linhas que custaram mais do que as duzentas e oitenta e sete p\u00e1ginas juntas.', if:R },
{ t:'arc', key:'arquivo', lns:[
    '\u201cTentei tir\u00e1-la daqui.\u201d',
    '\u201cFui met\u00f3dica. Fui devagar.\u201d',
    '\u201cFoi o devagar que custou.\u201d'
], if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'E a linha das quatro p\u00e1ginas, para quem contasse.', if:R },
{ t:'arc', key:'arquivo', lns:[
    '\u201cTirei quatro p\u00e1ginas. Se voc\u00ea chegar at\u00e9 elas, vai entender por qu\u00ea.\u201d',
    '\u201cSe n\u00e3o chegar, melhor.\u201d'
], if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center', if:R },
{ t:'nar', tx:'Assinou com as iniciais, p\u00f4s o lugar e o m\u00eas, e n\u00e3o p\u00f4s o dia.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ent\u00e3o virou duas folhas em branco e escreveu o nome dele no alto de uma p\u00e1gina limpa.', if:R },
{ t:'pause', if:R },
{ t:'arc', key:'arquivo', lns:[
    '\u201cMatheo \u2014 se voc\u00ea estiver lendo isto, preciso de uma resposta que n\u00e3o posso pedir de outro jeito.\u201d',
    '\u201cVoc\u00ea sabia?\u201d'
], if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Deixou o resto da p\u00e1gina em branco.', if:R },

/* ======================================================================
   C3 - A COLUNA
   A ultima coisa que ela escreve na vida e um total. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'per13_coluna', chapter:'per13', title:'A \u00faltima p\u00e1gina',
  bg:'bg_archive_closeup', bgm:null, if:R },

{ t:'nar', tx:'Faltavam cinquenta minutos e ela j\u00e1 tinha fechado o documento.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela abriu outra vez, no fim, e escreveu mais uma p\u00e1gina.', if:R },
{ t:'pause', if:R },

{ t:'arc', key:'arquivo', label:'\u2014 p\u00e1gina duzentos e oitenta e sete \u2014', lns:[
    'Maio, ano cinco. Solicita\u00e7\u00e3o de F., cocheiro-chefe: 3 moedas.',
    'Recusada. Avalia\u00e7\u00e3o: desnecess\u00e1rio.',
    '',
    'Nove de agosto, 23h25. Porta da copa trancada.',
    'Desvio pelo p\u00e1tio: 11 minutos.',
    '',
    'Nove de agosto, 23h52. Ponto de encontro vazio.',
    'Espera do contratado, estimada: 10 minutos.',
    '',
    'Diferen\u00e7a: 1 minuto.'
], if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'Um minuto.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela conferiu a subtra\u00e7\u00e3o e a subtra\u00e7\u00e3o estava certa.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois escreveu a \u00faltima linha do Arquivo Rabenfels, e \u00e9 a \u00fanica linha do documento inteiro em que ela julga alguma coisa.', if:R },
{ t:'pause', if:R },

{ t:'arc', key:'arquivo', lns:[
    '\u201cO erro \u00e9 do Compilador e a data dele \u00e9 maio.\u201d'
], if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'antoniette', ex:'away', pos:'center', if:R },
{ t:'nar', tx:'Ela limpou a pena, tampou o tinteiro e alinhou o mata-borr\u00e3o com a beira da mesa.', if:R },
{ t:'nar', tx:'Fazia isso todas as noites havia cinco anos.', if:R },
{ t:'spr_hide', ch:'antoniette', if:R },

/* ======================================================================
   C4 - NOVENTA DIAS
   ====================================================================== */
{ t:'scene', id:'per13_noventa', chapter:'per13', title:'Noventa dias',
  bg:'bg_nidhaus_gate', bgm:'bgm_prologue', if:R },
{ t:'spr', ch:'antoniette', ex:'neutral', pos:'center', if:R },

{ t:'nar', tx:'O c\u00e9u estava clareando na dire\u00e7\u00e3o do port\u00e3o quando ela desceu com o embrulho.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Couro encerado, sem selo, cordel em quatro voltas e um n\u00f3 cego.', if:R },
{ t:'nar', tx:'Pesava mais do que devia para o tamanho. Ela reparou nisso e achou bom.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela entregou o pacote com as duas m\u00e3os.', if:R },
{ t:'dial', ch:'antoniette', tx:'Isto n\u00e3o vai agora. Guarda a\u00ed.', if:R },
{ t:'dial', ch:'antoniette', tx:'Se passar noventa dias sem not\u00edcia minha, voc\u00ea leva.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'mensageiro', tx:'Noventa \u00e9 muito tempo.', if:R },
{ t:'dial', ch:'antoniette', tx:'\u00c9 o que d\u00e1 para eu garantir.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela contou as moedas do adiantamento na palma dele, uma a uma, e conferiu duas vezes.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Eram tr\u00eas.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela pagou as tr\u00eas sem hesitar, e n\u00e3o reparou.', if:R },
{ t:'pause', if:R },

{ t:'sfx', id:'sfx_footsteps', if:R },
{ t:'nar', tx:'O cavalo saiu andando e ela n\u00e3o esperou recibo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela ficou no port\u00e3o at\u00e9 o sol subir de todo, e n\u00e3o pensou em nada em particular.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois voltou para dentro, porque \u00e0s sete ela abria a biblioteca.', if:R },
{ t:'spr_hide', ch:'antoniette', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ren chegou \u00e0s sete e vinte e encontrou a porta aberta e a sala vazia.', if:R },
{ t:'nar', tx:'Esperou uma hora antes de perguntar a algu\u00e9m, porque n\u00e3o era da conta dele perguntar.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A casa registrou a baixa no livro de pessoal no dia seguinte, na letra do escritur\u00e1rio.', if:R },

{ t:'arc', key:'ficha', label:'\u2014 Velha Nidhaus \u00b7 livro de pessoal \u2014', lns:[
    'VAEL, Antoniette. Catalogadora contratada.',
    'Admiss\u00e3o: abril, ano um. Baixa: agosto, ano cinco.',
    '',
    'Motivo de sa\u00fade.'
], if:R },
{ t:'nar', tx:'Tr\u00eas palavras, na mesma letra de trinta e sete anos antes.', if:R },
{ t:'nar', tx:'Matheo tinha lido aquela linha uma semana antes de assinar a autoriza\u00e7\u00e3o dela.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'A partir daquela quarta-feira, o mensageiro esperou.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Noventa dias.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ele entregou no nonag\u00e9simo terceiro. Levou tr\u00eas dias a mais porque a estrada de Alsbeck alaga em novembro, e ele n\u00e3o achou que tr\u00eas dias fizessem diferen\u00e7a.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Tr\u00eas dias, e ele n\u00e3o achou que fizessem diferen\u00e7a.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ele estava certo, e \u00e9 a mesma conta.', if:R },

{ t:'fade_out', if:R },
{ t:'bgm', id:null, if:R },
{ t:'end_chap', line1:'Noventa e tr\u00eas dias depois.', line2:'A \u00faltima p\u00e1gina \u00e9 uma coluna.',
  chapter:'per13', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.PER13; }
