/* ==========================================================================
   ARQUIVO RABENFELS - js/data/per12.js
   ROTA PERDA - CAPITULO 12: "A Volta"

   Somente dados. TODO BEAT CARREGA if:{ rota:'perda' }.

   QUANDO: madrugada do dia dez, da estrada de volta ate a biblioteca.

   O PENSAMENTO UNICO (Zinsser, unidade):
   "Ela armou a coluna."

   ------------------------------------------------------------------
   ONDE A CORRECAO DO STEINER ACONTECE
   ------------------------------------------------------------------
   Antoniette monta a conta na trilha e a escreve antes do amanhecer:
   tres moedas em maio, onze minutos em agosto, e a soma. E a unica
   pagina do documento em que ela usa a palavra erro.

   Depois Carmine desmonta a conta em quatro palavras, sem explicar:

     "Voce chegou onze minutos atrasada."
     "Cheguei."
     "Eu nao estava contando o tempo."

   E NAO HA RESTO DE FRASE. Antoniette espera o resto, o resto nao vem,
   e ela anota a ausencia na margem com um ponto de interrogacao e
   segue - do mesmo jeito que anota a ausencia de pergunta sobre o
   plano.

   >>> O JOGADOR ENTENDE. ELA NAO. E o documento sai com a conta
       errada dentro, e a conta errada sobrevive a ela. <<<

   NAO DEIXAR NINGUEM EM CENA EXPLICAR. Se alguem enunciar, a rota
   inteira vira licao de moral, que e exatamente o que Steiner reprova.

   Cinco cenas: C1 a volta, C2 a coluna, C3 Carmine, C4 as quatro
   perguntas, C5 os onze minutos.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

var R = { rota: 'perda' };

RBF.PER12 = [

{ t:'chap', num:'CAP\u00cdTULO 12', name:'A VOLTA', chapter:'per12', if:R },
{ t:'fade_out', if:R },

/* ======================================================================
   C1 - A VOLTA
   Sem captura, sem perseguicao. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'per12_volta', chapter:'per12', title:'A volta',
  bg:'bg_grey_march_road', bgm:null, if:R },
{ t:'fade_in', if:R },

{ t:'nar', tx:'O ar voltou ao normal antes das quatro.', if:R },
{ t:'nar', tx:'Foi o \u00fanico aviso que a estrada deu de que aquilo tinha acabado.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'klara', ex:'blank', pos:'center', if:R },
{ t:'nar', tx:'Klara estava de costas com a mala na m\u00e3o, a onze minutos da ponte.', if:R },
{ t:'nar', tx:'Antoniette olhou o rel\u00f3gio antes de olhar a menina.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Klara. O barco \u00e9 \u00e0s seis.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A menina virou o corpo inteiro, n\u00e3o s\u00f3 a cabe\u00e7a, e olhou para o lado de onde tinham vindo.', if:R },
{ t:'dial', ch:'klara', tx:'Eu preciso voltar.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Por qu\u00ea?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Klara abriu a boca e n\u00e3o veio nada. Ficou assim por um tempo, procurando, e desistiu de procurar.', if:R },
{ t:'dial', ch:'klara', tx:'N\u00e3o sei.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Est\u00e1 com fome de novo. E aquela outra coisa junto.', if:R },
{ t:'nar', tx:'Foi a explica\u00e7\u00e3o inteira. Ela n\u00e3o tinha outra.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'E come\u00e7ou a andar de volta, com a mala ainda na m\u00e3o, no mesmo passo de quem foi.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'antoniette', ex:'shaken', pos:'left', if:R },
{ t:'inn', tx:'Segura o bra\u00e7o dela.', if:R },
{ t:'inn', tx:'Levanta e carrega. Ela tem doze anos e trinta e oito quilos.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette ficou parada na trilha calculando o peso de uma crian\u00e7a e a dist\u00e2ncia at\u00e9 o rio.', if:R },
{ t:'nar', tx:'A conta fechava. Ela fez a conta duas vezes e fechou nas duas.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois foi atr\u00e1s dela.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Tr\u00eas quil\u00f4metros de volta, e nenhuma das duas falou.', if:R },
{ t:'nar', tx:'Passaram o mour\u00e3o de pedra. O sulco da roda continuava l\u00e1, e tinha secado.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Na altura do port\u00e3o Klara devolveu a mala \u00e0 m\u00e3o dela, do jeito que se devolve uma coisa emprestada.', if:R },
{ t:'dial', ch:'klara', tx:'Desculpa.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o foi voc\u00ea.', if:R },
{ t:'nar', tx:'Ela disse aquilo sem saber o que estava dizendo, e foi a coisa mais verdadeira da noite.', if:R },
{ t:'spr_hide', ch:'klara', if:R },
{ t:'spr_hide', ch:'antoniette', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'As duas entraram pelo mesmo caminho por onde tinham sa\u00eddo, e ningu\u00e9m na casa soube que elas tinham sa\u00eddo.', if:R },

/* ======================================================================
   C2 - A COLUNA
   A pagina em que ela usa a palavra erro. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'per12_coluna', chapter:'per12', title:'A coluna',
  bg:'bg_archive_closeup', bgm:'bgm_archive', if:R },
{ t:'spr', ch:'antoniette', ex:'away', pos:'center', if:R },

{ t:'nar', tx:'Ela fez o invent\u00e1rio, porque era o que sabia fazer com as m\u00e3os tremendo.', if:R },
{ t:'inn', tx:'Caderno. Chave da biblioteca. Duas velas. Papel para umas quarenta p\u00e1ginas.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Depois abriu o caderno de despesas na p\u00e1gina de maio e leu a pr\u00f3pria letra.', if:R },
{ t:'pause', if:R },
{ t:'arc', key:'caderno', label:'\u2014 caderno de despesas \u00b7 maio \u2014', lns:[
    'Fenn, cocheiro-chefe. Solicita\u00e7\u00e3o: 3 moedas.',
    'Objeto: destranca da porta da copa, noite a combinar.',
    '',
    'Desnecess\u00e1rio.'
], if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'Onze minutos.', if:R },
{ t:'inn', tx:'O cocheiro esperou dez.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela armou os tr\u00eas valores em coluna, com data ao lado de cada um, do jeito que se arma uma conta que vai ser conferida por outra pessoa.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Somou. Conferiu a soma. Somou de tr\u00e1s para frente e conferiu de novo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois escreveu quatro letras ao lado do total, e \u00e9 a \u00fanica vez que a palavra aparece nas duzentas e noventa e uma p\u00e1ginas.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Erro.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A conta fecha. Ela fechou nas duas vezes, e vai continuar fechando.', if:R },
{ t:'spr_hide', ch:'antoniette', if:R },

/* ======================================================================
   C3 - CARMINE
   ====================================================================== */
{ t:'scene', id:'per12_carmine', chapter:'per12', title:'Carmine',
  bg:'bg_library_night', bgm:'bgm_camara', if:R },
{ t:'spr', ch:'antoniette', ex:'guarded', pos:'center', if:R },

{ t:'nar', tx:'Ela acendeu a segunda vela e a primeira apagou.', if:R },
{ t:'nar', tx:'N\u00e3o havia corrente de ar na biblioteca. Ela conferiu as janelas em mar\u00e7o e anotou.', if:R },
{ t:'pause', if:R },
{ t:'sfx', id:'sfx_candle', if:R },
{ t:'nar', tx:'A segunda vela continuou acesa.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'voz', tx:'Voc\u00ea escreve muito depressa para quem escreve \u00e0 m\u00e3o.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center', if:R },
{ t:'nar', tx:'A voz vinha da altura errada. Vinha da altura de algu\u00e9m sentado, e n\u00e3o havia cadeira daquele lado.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Khar\u2019Vel.', if:R },
{ t:'dial', ch:'voz', tx:'Esse n\u00e3o \u00e9 o meu nome. Mas voc\u00ea inventou bem. Serve.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Vim agradecer.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Cinco anos. Ela l\u00ea mais r\u00e1pido. Corrige adulto sem constranger ningu\u00e9m.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'E confere fonte. Nunca acredita em uma s\u00f3. Isso foi voc\u00ea.', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'voz', tx:'E a forma toda. Postura, protocolo, a etiqueta inteira. Isso foi voc\u00ea.', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'voz', tx:'E o mundo inteiro pela biblioteca. Ela sabe o nome de portos onde nunca esteve. Isso foi voc\u00ea.', if:{ rota:'perda', taught:'C' } },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Essas tr\u00eas eu n\u00e3o sei. Essas chegaram por fora.', if:R },
{ t:'pause', if:R },

/* A frase longa. Uma so na rota. */
{ t:'inn', tx:'Ela pensou no primeiro dia, no invent\u00e1rio da despensa, e em como tinha decidido ser met\u00f3dica porque met\u00f3dico era o \u00fanico jeito de n\u00e3o ser expulsa na primeira semana, e pensou que cinco anos de m\u00e9todo eram mil oitocentos e vinte e sete dias, e que ela tinha usado mil oitocentos e vinte e sete dias para deixar uma crian\u00e7a mais interessante para a coisa que ia com\u00ea-la, e que se tivesse sido desleixada, se tivesse sido burra, se tivesse chegado ali e feito barulho no primeiro m\u00eas e sido posta na estrada em outubro do primeiro ano, Klara estaria hoje assustada, calada e \u00fatil, e viva do mesmo jeito, e o m\u00e9todo dela n\u00e3o teria custado nada a ningu\u00e9m.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'N\u00e3o.', if:R },
{ t:'dial', ch:'voz', tx:'Estaria viva do mesmo jeito. Voc\u00ea acertou essa parte.', if:R },

/* ======================================================================
   C4 - AS PERGUNTAS
   Nenhuma sobre o plano. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'per12_perguntas', chapter:'per12', title:'As perguntas',
  bg:'bg_library_night', keepSprites:true, if:R },

{ t:'spr', ch:'antoniette', ex:'neutral', pos:'center', if:R },
{ t:'dial', ch:'voz', tx:'Ela te chama de qu\u00ea?', if:R },
{ t:'dial', ch:'antoniette', tx:'Senhorita.', if:R },
{ t:'dial', ch:'voz', tx:'Na frente dos outros. E quando n\u00e3o tem ningu\u00e9m.', if:R },
{ t:'dial', ch:'antoniette', tx:'Senhorita. Nos dois.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A irm\u00e3 dizia Toni desde o primeiro m\u00eas. Klara nunca disse, uma vez sequer, em cinco anos.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'voz', tx:'Quantas vezes ela procurou voc\u00ea sem precisar de nada?', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu n\u00e3o contei.', if:R },
{ t:'dial', ch:'voz', tx:'Eu contei.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'antoniette', ex:'guarded', pos:'center', if:R },
{ t:'dial', ch:'antoniette', tx:'O que isso tem a ver com o cronograma?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A pergunta ficou no ar tempo suficiente para Antoniette achar que tinha acertado.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'\u00c9 o calend\u00e1rio.', if:R },
{ t:'inn', tx:'Sou a \u00fanica coisa nesta casa que chegou perto de mover uma data.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela conferiu o racioc\u00ednio duas vezes, do jeito que conferia tudo, e ele fechou nas duas.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Voc\u00ea vai escrever isto. Ent\u00e3o escreva certo.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Carmine.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette tinha passado cinco anos batizando aquilo por conta pr\u00f3pria.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ela nunca ouviu esse nome. Nem uma vez em doze anos de vida.', if:R },
{ t:'inn', tx:'E eu ouvi hoje.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Voc\u00ea prometeu alguma coisa a ela em fevereiro.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu mostrei o caderno. N\u00e3o prometi nada.', if:{ rota:'perda', promised:'A' } },
{ t:'dial', ch:'antoniette', tx:'Eu prometi.', if:{ rota:'perda', promised:'B' } },
{ t:'dial', ch:'antoniette', tx:'Eu dei uma data.', if:{ rota:'perda', promised:'C' } },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Ela entendeu como promessa.', if:{ rota:'perda', promised:'A' } },
{ t:'dial', ch:'carmine', tx:'Inteiro, sem qualificar. Ela repetiu para a irm\u00e3 na mesma noite.', if:{ rota:'perda', promised:'B' } },
{ t:'dial', ch:'carmine', tx:'Agosto, antes do dia dez. Ela contou os dias no calend\u00e1rio da cozinha. Riscando.', if:{ rota:'perda', promised:'C' } },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Hoje \u00e9 dia dez.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Ela acreditou em voc\u00ea.', if:R },
{ t:'nar', tx:'N\u00e3o houve reprova\u00e7\u00e3o nenhuma na frase. Foi dita como quem confere um n\u00famero que j\u00e1 sabia.', if:R },

/* ======================================================================
   C5 - OS ONZE MINUTOS
   A correcao do Steiner. NAO EXPLICAR. Saida: farpa.
   ====================================================================== */
{ t:'scene', id:'per12_onze', chapter:'per12', title:'Onze minutos',
  bg:'bg_library_night', keepSprites:true, if:R },

{ t:'dial', ch:'carmine', tx:'Voc\u00ea chegou onze minutos atrasada na estrada.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center', if:R },
{ t:'dial', ch:'antoniette', tx:'Cheguei.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Eu n\u00e3o estava contando o tempo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette esperou o resto da frase.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'N\u00e3o veio resto.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Se eu tivesse chegado \u00e0s onze e trinta.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Boa noite, escriba.', if:R },
{ t:'pause', if:R },

{ t:'sfx', id:'sfx_candle', if:R },
{ t:'nar', tx:'A vela apagou e acendeu de novo.', if:R },
{ t:'nar', tx:'Antoniette ficou olhando para a cadeira que n\u00e3o existia daquele lado da mesa.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ela n\u00e3o perguntou nada sobre o plano.', if:R },
{ t:'inn', tx:'Nem uma vez.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela anotou aquilo na margem, com um ponto de interroga\u00e7\u00e3o, e passou para o assunto seguinte.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Na margem de baixo, com a mesma pena, ela anotou a outra frase e o mesmo ponto de interroga\u00e7\u00e3o.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois voltou \u00e0 p\u00e1gina da coluna e conferiu a soma pela terceira vez.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Fechava.', if:R },

{ t:'fade_out', if:R },
{ t:'bgm', id:null, if:R },
{ t:'end_chap', line1:'Dez de agosto, quatro da manh\u00e3.', line2:'A soma continua fechando.',
  chapter:'per12', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.PER12; }
