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

{ t:'chap', num:'CAPÍTULO 13', name:'O QUE ELA ANOTOU', chapter:'per13', if:R },
{ t:'fade_out', if:R },

/* ======================================================================
   C1 - AS QUATRO PAGINAS
   Le hid_from_order, told_klara, lied_to_order, third_paid.
   ====================================================================== */
{ t:'scene', id:'per13_paginas', chapter:'per13', title:'Quatro páginas',
  bg:'bg_archive_closeup', bgm:'bgm_archive', if:R },
{ t:'fade_in', if:R },
{ t:'spr', ch:'antoniette', ex:'away', pos:'center', if:R },

{ t:'nar', tx:'Ela escreveu até as três e meia sem parar para reler.', if:R },
{ t:'nar', tx:'Duzentas e noventa e uma páginas numeradas, cinco anos, tudo o que servia.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Se alguém usar isto, vai usar contra a casa.', if:R },
{ t:'inn', tx:'E vai ler tudo. Inclusive o que eu fiz.', if:R },
{ t:'pause', if:R },

{ t:'sfx', id:'sfx_page_turn', if:R },
{ t:'nar', tx:'A página de outubro do primeiro ano. O que ela viu no pátio e não mandou para a Ordem.', if:{ rota:'perda', hid_from_order:true } },
{ t:'nar', tx:'A página de outubro do primeiro ano. O que ela mandou para a Ordem, e o que a Ordem arquivou sem responder.', if:{ rota:'perda', hid_from_order:false } },
{ t:'inn', tx:'Três.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A página da câmara. Ela desceu, viu, e subiu com uma criança de nove anos cobrindo a ausência dela no andar de cima.', if:R },
{ t:'nar', tx:'Na margem, o que ela respondeu a Klara depois: nada. Deixou fechar sozinho.', if:{ rota:'perda', told_klara:'A' } },
{ t:'nar', tx:'Na margem, o que ela respondeu a Klara depois: uma versão limpa, feita para a menina não ter de carregar aquilo.', if:{ rota:'perda', told_klara:'B' } },
{ t:'nar', tx:'Na margem, o que ela respondeu a Klara depois: a verdade, e um pedido para não repetir.', if:{ rota:'perda', told_klara:'C' } },
{ t:'inn', tx:'Duas.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A página de agosto do terceiro ano.', if:R },
{ t:'nar', tx:'O relatório inteiro, com o que ela viu subir. Lervel recebeu tudo e respondeu em nove semanas mandando continuar observando.', if:{ rota:'perda', lied_to_order:'A' } },
{ t:'nar', tx:'O relatório com o episódio dado como de natureza indeterminada, sem testemunha direta. Ela foi a testemunha direta.', if:{ rota:'perda', lied_to_order:'B' } },
{ t:'nar', tx:'A página em que agosto não existe. Lervel recebeu o mês sem o mês dentro.', if:{ rota:'perda', lied_to_order:'C' } },
{ t:'inn', tx:'Uma.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A página de Fenn.', if:R },
{ t:'nar', tx:'Ela leu três vezes antes de arrancar. Na terceira, dobrou o canto.', if:R },
{ t:'nar', tx:'Um homem foi útil a ela e ela negaria a fonte se perguntassem. Isso não cabia em coluna nenhuma.', if:{ rota:'perda', third_paid:'A' } },
{ t:'nar', tx:'Ela comprou o nome para levar a Lervel, e o nome era de um homem vivo. Isso não cabia em coluna nenhuma.', if:{ rota:'perda', third_paid:'B' } },
{ t:'nar', tx:'Ela recusou o nome e mandou o rapaz embora no mesmo dia. Ficou sem a prova e nunca soube se o menino chegou.', if:{ rota:'perda', third_paid:'C' } },
{ t:'pause', if:R },
{ t:'inn', tx:'Nenhuma.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Quatro folhas na mão esquerda. Duzentas e oitenta e sete no maço.', if:R },
{ t:'inn', tx:'A numeração vai continuar terminando em duzentos e noventa e um.', if:R },
{ t:'inn', tx:'Quem contar vai ver.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'guarded', pos:'center', if:R },
{ t:'inn', tx:'Bom. Que veja.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela desceu ao escritório do barão com as quatro páginas e a chave que copiou no segundo ano.', if:R },
{ t:'nar', tx:'O livro-caixa da casa tinha quatro folhas em branco no fim, como todo livro-caixa tem.', if:R },
{ t:'nar', tx:'Ela pôs as quatro páginas no lugar delas e fechou a fivela.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A janela do quarto de Aldric dava para aquele corredor. Estava fechada, e a noite continuava quente.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Subiu. Faltava uma hora e quarenta para o amanhecer.', if:R },

/* ======================================================================
   C2 - A ULTIMA ENTRADA
   ====================================================================== */
/* ======================================================================
   C1b - A PORTA

   A ultima conversa das duas, e ela e sobre nada.

   Carmine acabou de dizer, na biblioteca, que a menina vai saber quem e
   Antoniette e nunca mais vai poder falar com ela. Entao esta e a
   ultima vez - e nenhuma das duas sabe, e e por isso que a conversa e
   sobre hora, sobre um livro e sobre boa noite.

   KLARA NAO EXPLICA POR QUE PAROU NA ESTRADA. Ela nao sabe. Ninguem em
   cena pode enunciar o que aconteceu ali.

   ANTONIETTE MENTE. Primeira vez em cinco anos, e sobre a propria data.
   ====================================================================== */
{ t:'scene', id:'per13_porta', chapter:'per13', title:'Quatro e dez',
  bg:'bg_antoniette_room', bgm:null, if:R },

{ t:'nar', tx:'Klara bateu na porta do quarto do fundo às quatro e dez.', if:R },
{ t:'nar', tx:'Ninguém tinha impedido a menina de andar pela casa naquela noite.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'klara', ex:'blank', pos:'right', if:R },
{ t:'spr', ch:'antoniette', ex:'guarded', pos:'left', if:R },

{ t:'dial', ch:'klara', tx:'Eu não sei por que eu parei.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu sei.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela não sabia.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita vai embora?', if:R },
{ t:'dial', ch:'antoniette', tx:'Vou.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Quando?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette tinha a resposta, e a resposta era hoje.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Ainda não está marcado.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Foi a primeira mentira que ela contou àquela menina em cinco anos.', if:R },
{ t:'nar', tx:'Contou porque a verdade não servia para nada, e era a única coisa que ainda dava para dar a ela.', if:R },

/* A - o metodo volta contra ela. A menina confere. */
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'klara', tx:'A senhorita conferiu?', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'antoniette', tx:'Conferi.', if:{ rota:'perda', taught:'A' } },
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'klara', tx:'Em dois lugares?', if:{ rota:'perda', taught:'A' } },
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'antoniette', tx:'Em dois lugares.', if:{ rota:'perda', taught:'A' } },
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'nar', tx:'Duas.', if:{ rota:'perda', taught:'A' } },

/* B - a forma. Ela cobra a si mesma o agradecimento que nao deu. */
{ t:'pause', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'klara', tx:'Então eu não agradeço agora.', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'antoniette', tx:'Não precisa agradecer.', if:{ rota:'perda', taught:'B' } },
{ t:'pause', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'klara', tx:'Precisa. Depois não vale.', if:{ rota:'perda', taught:'B' } },
{ t:'pause', if:{ rota:'perda', taught:'B' } },
{ t:'nar', tx:'Ela tinha dito a mesma coisa na carroça, seis horas antes, sobre outra pessoa.', if:{ rota:'perda', taught:'B' } },

/* C - o mundo. Ela pede que a pagina fique marcada. */
{ t:'pause', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'klara', tx:'A senhorita leva o livro do norte?', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'antoniette', tx:'Levo.', if:{ rota:'perda', taught:'C' } },
{ t:'pause', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'klara', tx:'Marca a página da cidade em cima da água.', if:{ rota:'perda', taught:'C' } },
{ t:'pause', if:{ rota:'perda', taught:'C' } },
{ t:'nar', tx:'O livro estava na estante da biblioteca e ia continuar lá.', if:{ rota:'perda', taught:'C' } },

{ t:'pause', if:R },
{ t:'nar', tx:'Klara ficou na porta mais tempo do que uma resposta exige.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Boa noite, senhorita.', if:R },
{ t:'dial', ch:'antoniette', tx:'Boa noite, Klara.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Foi a última coisa que as duas disseram uma à outra.', if:R },
{ t:'nar', tx:'As duas disseram do jeito que se diz todo dia.', if:R },
{ t:'spr_hide', ch:'klara', if:R },
{ t:'spr_hide', ch:'antoniette', if:R },
{ t:'pause', if:R },
{ t:'fade_out', if:R },

{ t:'scene', id:'per13_ultima', chapter:'per13', title:'A última entrada',
  bg:'bg_antoniette_room', bgm:null, if:R },
{ t:'spr', ch:'antoniette', ex:'away', pos:'center', if:R },

{ t:'nar', tx:'Ela molhou a pena e não escreveu.', if:R },
{ t:'nar', tx:'A caligrafia continuou firme quando finalmente saiu. O espaçamento não.', if:R },
{ t:'pause', if:R },

{ t:'arc', key:'arquivo', lns:[
    '“Para quem encontrar isto.”',
    '“Não sei seu nome. Tanto faz.”'
], if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'Se eu deixar uma frase que só me alivia, Matheo vai ter de atravessar ela.', if:R },
{ t:'nar', tx:'Ela escreveu a idade, a velocidade de leitura e o jeito de corrigir os outros em voz baixa.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Parou.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Isso não é informação operacional.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'soft', pos:'center', if:R },
{ t:'inn', tx:'Deixa.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Escreveu também que ela troca o saco de mão com a mão que já está carregando, para poupar a outra.', if:R },
{ t:'nar', tx:'Isso também não servia para nada. Ficou.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Depois escreveu as três linhas que custaram mais do que as duzentas e oitenta e sete páginas juntas.', if:R },
{ t:'arc', key:'arquivo', lns:[
    '“Tentei tirá-la daqui.”',
    '“Fui metódica. Fui devagar.”',
    '“Foi o devagar que custou.”'
], if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'E a linha das quatro páginas, para quem contasse.', if:R },
{ t:'arc', key:'arquivo', lns:[
    '“Tirei quatro páginas. Se você chegar até elas, vai entender por quê.”',
    '“Se não chegar, melhor.”'
], if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center', if:R },
{ t:'nar', tx:'Assinou com as iniciais, pôs o lugar e o mês, e não pôs o dia.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Então virou duas folhas em branco e escreveu o nome dele no alto de uma página limpa.', if:R },
{ t:'pause', if:R },
{ t:'arc', key:'arquivo', lns:[
    '“Matheo — se você estiver lendo isto, preciso de uma resposta que não posso pedir de outro jeito.”',
    '“Você sabia?”'
], if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Deixou o resto da página em branco.', if:R },

/* ======================================================================
   C3 - A COLUNA
   A ultima coisa que ela escreve na vida e um total. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'per13_coluna', chapter:'per13', title:'A última página',
  bg:'bg_archive_closeup', bgm:null, if:R },

{ t:'nar', tx:'Faltavam cinquenta minutos e ela já tinha fechado o documento.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela abriu outra vez, no fim, e escreveu mais uma página.', if:R },
{ t:'pause', if:R },

{ t:'arc', key:'arquivo', label:'— página duzentos e oitenta e sete —', lns:[
    'Maio, ano cinco. Solicitação de F., cocheiro-chefe: 3 moedas.',
    'Recusada. Avaliação: desnecessário.',
    '',
    'Nove de agosto, 23h25. Porta da copa trancada.',
    'Desvio pelo pátio: 11 minutos.',
    '',
    'Nove de agosto, 23h52. Ponto de encontro vazio.',
    'Espera do contratado, estimada: 10 minutos.',
    '',
    'Diferença: 1 minuto.'
], if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'Um minuto.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela conferiu a subtração e a subtração estava certa.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois escreveu a última linha. Não havia outra passagem do Arquivo com a palavra erro.', if:R },
{ t:'pause', if:R },

{ t:'arc', key:'arquivo', lns:[
    '“O erro é do Compilador e a data dele é maio.”'
], if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'antoniette', ex:'away', pos:'center', if:R },
{ t:'nar', tx:'Ela limpou a pena, tampou o tinteiro e alinhou o mata-borrão com a beira da mesa.', if:R },
{ t:'nar', tx:'Fazia isso todas as noites havia cinco anos.', if:R },
{ t:'spr_hide', ch:'antoniette', if:R },

/* ======================================================================
   C4 - NOVENTA DIAS
   ====================================================================== */
{ t:'scene', id:'per13_noventa', chapter:'per13', title:'Noventa dias',
  bg:'bg_nidhaus_gate', bgm:'bgm_prologue', if:R },
{ t:'spr', ch:'antoniette', ex:'neutral', pos:'center', if:R },

{ t:'nar', tx:'O céu estava clareando na direção do portão quando ela desceu com o embrulho.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Couro encerado, sem selo, cordel em quatro voltas e um nó cego.', if:R },
{ t:'nar', tx:'Pesava mais do que devia para o tamanho. Ela reparou nisso e achou bom.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela entregou o pacote com as duas mãos.', if:R },
{ t:'dial', ch:'antoniette', tx:'Isto não vai agora. Guarda aí.', if:R },
{ t:'dial', ch:'antoniette', tx:'Se passar noventa dias sem notícia minha, você leva.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'mensageiro', tx:'Noventa é muito tempo.', if:R },
{ t:'dial', ch:'antoniette', tx:'É o que dá para eu garantir.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela contou as moedas do adiantamento na palma dele, uma a uma, e conferiu duas vezes.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Eram três.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela pagou as três sem hesitar, e não reparou.', if:R },
{ t:'pause', if:R },

{ t:'sfx', id:'sfx_footsteps', if:R },
{ t:'nar', tx:'O cavalo saiu andando e ela não esperou recibo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela ficou no portão até a luz alcançar o ferrolho de cima.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois voltou para dentro, porque às sete ela abria a biblioteca.', if:R },
{ t:'spr_hide', ch:'antoniette', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ren chegou às sete e vinte e encontrou a porta aberta e a sala vazia.', if:R },
{ t:'nar', tx:'Esperou uma hora antes de perguntar a alguém, porque não era da conta dele perguntar.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A casa registrou a baixa no livro de pessoal no dia seguinte, na letra do escriturário.', if:R },

{ t:'arc', key:'ficha', label:'— Velha Nidhaus · livro de pessoal —', lns:[
    'VAEL, Antoniette. Catalogadora contratada.',
    'Admissão: abril, ano um. Baixa: agosto, ano cinco.',
    '',
    'Motivo de saúde.'
], if:R },
{ t:'nar', tx:'Três palavras, na mesma letra de trinta e sete anos antes.', if:R },
{ t:'nar', tx:'Matheo tinha lido aquela linha uma semana antes de assinar a autorização dela.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'A partir daquela quarta-feira, o mensageiro esperou.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Noventa dias.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ele entregou no nonagésimo terceiro. Levou três dias a mais porque a estrada de Alsbeck alaga em novembro, e ele não achou que três dias fizessem diferença.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Três dias, e ele não achou que fizessem diferença.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ele estava certo, e é a mesma conta.', if:R },

{ t:'fade_out', if:R },
{ t:'bgm', id:null, if:R },
{ t:'end_chap', line1:'Noventa e três dias depois.', line2:'A última página é uma coluna.',
  chapter:'per13', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.PER13; }
