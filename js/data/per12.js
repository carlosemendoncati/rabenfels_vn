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
{ t:'nar', tx:'Klara puxou ar para responder. Soltou sem palavra.', if:R },
{ t:'dial', ch:'klara', tx:'N\u00e3o sei.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Est\u00e1 com fome de novo. E aquela outra coisa junto.', if:R },
{ t:'nar', tx:'N\u00e3o soube dar mais que isso.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Klara virou e come\u00e7ou a desfazer o caminho. A mala batia no joelho a cada passo.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'antoniette', ex:'shaken', pos:'left', if:R },
{ t:'inn', tx:'Segura o bra\u00e7o dela.', if:R },
{ t:'inn', tx:'Levanta e carrega. Ela tem doze anos e trinta e oito quilos.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Trinta e oito quilos. Dois bra\u00e7os livres. O rio ainda ao alcance.', if:R },
{ t:'nar', tx:'Nenhum dos tr\u00eas valores explicou por que ela n\u00e3o estendeu a m\u00e3o.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois foi atr\u00e1s dela.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Tr\u00eas quil\u00f4metros de volta, e nenhuma das duas falou.', if:R },
{ t:'nar', tx:'Passaram o mour\u00e3o de pedra. O sulco da roda continuava l\u00e1, e tinha secado.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'No port\u00e3o, Klara estendeu a mala. Antoniette levou um segundo para perceber que precisava peg\u00e1-la.', if:R },
{ t:'dial', ch:'klara', tx:'Desculpa.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o foi voc\u00ea.', if:R },
{ t:'nar', tx:'A frase saiu antes da conta e ficou sem corre\u00e7\u00e3o.', if:R },
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

{ t:'nar', tx:'Ela armou os tr\u00eas valores em coluna, alinhados pela v\u00edrgula, com a data ao lado de cada um.', if:R },
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

{ t:'dial', ch:'voz', tx:'Voc\u00ea ainda est\u00e1 somando.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center', if:R },
{ t:'nar', tx:'A voz chegou do lado esquerdo da mesa, na altura do tampo. N\u00e3o havia cadeira ali.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Khar\u2019Vel.', if:R },
{ t:'dial', ch:'voz', tx:'Esse n\u00e3o \u00e9 o meu nome. Mas voc\u00ea inventou bem. Serve.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Vim agradecer.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Cinco anos. Ela l\u00ea mais r\u00e1pido. Corrige adulto sem constranger ningu\u00e9m.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Ela confere fonte at\u00e9 quando est\u00e1 com fome. Voc\u00ea ensinou isso.', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'voz', tx:'Ela pede desculpa antes de desobedecer. Voc\u00ea ensinou isso.', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'voz', tx:'Ela sabe quantos dias h\u00e1 entre esta casa e o rio. Voc\u00ea ensinou isso.', if:{ rota:'perda', taught:'C' } },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Isso eu n\u00e3o dei. Chegou por fora.', if:R },
{ t:'pause', if:R },

/* A rota da Perda quebra o pensamento em valores; a frase longa fica
   reservada a Esperanca. */
{ t:'inn', tx:'Onze minutos. Tr\u00eas moedas. Cinquenta e dois meses. Ela somou sem unidade at\u00e9 concluir que perdera Klara para economizar tr\u00eas moedas.', if:R },
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
{ t:'nar', tx:'Liara dizia Toni desde o primeiro m\u00eas. Em cinco anos, Klara n\u00e3o tinha usado o nome uma vez.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'voz', tx:'Quantas vezes ela procurou voc\u00ea sem precisar de nada?', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu n\u00e3o contei.', if:R },
{ t:'dial', ch:'voz', tx:'Eu contei.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'antoniette', ex:'guarded', pos:'center', if:R },
{ t:'dial', ch:'antoniette', tx:'O que isso tem a ver com o cronograma?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Carmine n\u00e3o respondeu. Antoniette preencheu a pausa sozinha.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'\u00c9 o calend\u00e1rio.', if:R },
{ t:'inn', tx:'Sou a \u00fanica coisa nesta casa que chegou perto de mover uma data.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Escreveu data, altura e atraso em tr\u00eas linhas. As tr\u00eas apontavam para ela.', if:R },

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
{ t:'dial', ch:'antoniette', tx:'Eu disse que tiraria ela daqui.', if:{ rota:'perda', promised:'B' } },
{ t:'dial', ch:'antoniette', tx:'Eu dei uma data.', if:{ rota:'perda', promised:'C' } },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Ela entendeu como promessa.', if:{ rota:'perda', promised:'A' } },
{ t:'dial', ch:'carmine', tx:'Sem condi\u00e7\u00e3o. Ela repetiu para a irm\u00e3 na mesma noite.', if:{ rota:'perda', promised:'B' } },
{ t:'dial', ch:'carmine', tx:'Agosto, antes do dia dez. Ela contou os dias no calend\u00e1rio da cozinha. Riscando.', if:{ rota:'perda', promised:'C' } },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Hoje \u00e9 dia dez.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Ela acreditou em voc\u00ea.', if:R },
{ t:'nar', tx:'Carmine n\u00e3o alterou o volume nem esperou defesa.', if:R },

/* ======================================================================
   C4b - O QUE ELA OUVIU NA ESTRADA

   Aqui a cena deixa de ser auditoria.

   Carmine nao veio cobrar cronograma. Ela veio porque o corpo que
   preparou por doze anos quer outra pessoa, e ela vai herdar isso.

   Ela nunca nomeia. Corrige uma palavra, e a correcao e a confissao.
   Ninguem comenta.
   ====================================================================== */
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Ela falou com voc\u00ea na estrada.', if:R },
{ t:'dial', ch:'antoniette', tx:'Falou.', if:R },
{ t:'pause', if:R },
/* O numero e contado, e nao estimado: sao as frases da Klara na
   caminhada de per11, por ramo de `taught`, porque cada partida ve um
   ramo so. Recontado em 25/08 depois de a cena da infancia entrar:
   comum 89, A 96, B 93, C 95. Recontar se a caminhada mudar. */
{ t:'dial', ch:'carmine', tx:'Noventa e seis frases.', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'carmine', tx:'Noventa e tr\u00eas frases.', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'carmine', tx:'Noventa e cinco frases.', if:{ rota:'perda', taught:'C' } },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette n\u00e3o tinha contado.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Eu contei.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'\u201cPara a senhorita eu conto e acaba na senhorita.\u201d', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A frase saiu na entona\u00e7\u00e3o da menina. N\u00e3o parecida com ela. A dela.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center', if:R },
{ t:'dial', ch:'antoniette', tx:'A senhora estava l\u00e1.', if:R },
{ t:'dial', ch:'carmine', tx:'Eu estou sempre l\u00e1.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Doze anos, escriba.', if:R },
{ t:'dial', ch:'carmine', tx:'Eu aprendi o passo dela antes de ela andar. Aprendi de que lado ela dorme.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette tinha aprendido a segunda coisa em novembro do ano dois, e anotado como posi\u00e7\u00e3o habitual.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Quando eu ocupar, o corpo n\u00e3o esquece. Nada do que ela sente sai junto.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Fica aqui dentro. Comigo. Todo dia.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Ent\u00e3o a senhora perde tamb\u00e9m.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Carmine n\u00e3o respondeu por tempo demais.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Eu n\u00e3o perco. Eu recebo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Foi a \u00fanica vez naquela noite em que ela corrigiu a pr\u00f3pria palavra.', if:R },

/* Quem ensinou o metodo reconhece o gesto: a correcao e uma emenda de
   escriba, e Antoniette repara nisso antes de reparar no resto. */
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'inn', tx:'Ela emendou ao lado, na mesma linha. N\u00e3o riscou.', if:{ rota:'perda', taught:'A' } },
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'inn', tx:'Eu ensinei isso \u00e0 Klara.', if:{ rota:'perda', taught:'A' } },

{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'A senhora n\u00e3o vai salvar essa menina.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'N\u00e3o hoje, n\u00e3o em setembro, n\u00e3o com barco nenhum.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'E ela vai continuar esperando. \u00c9 isso que eu vou ter de ouvir.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Ela vai saber que sou eu?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Vai.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Ela vai poder falar comigo?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'N\u00e3o.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette p\u00f4s as duas m\u00e3os na mesa, uma de cada lado do caderno, e n\u00e3o escreveu nada.', if:R },

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
{ t:'nar', tx:'A luz voltou. O lado oposto da mesa continuava vazio.', if:R },
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
