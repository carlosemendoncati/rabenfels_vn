/* ==========================================================================
   ARQUIVO RABENFELS - js/data/res11.js
   ROTA RESPOSTA - CAPITULO 11: "A Entrada 214"

   Somente dados. TODO BEAT CARREGA if:{ rota:'resposta' }.

   QUANDO: madrugada e manha do dia dez. A entrada fecha as sete e dez.

   O PENSAMENTO UNICO (Zinsser, unidade):
   "Esta dentro da margem."

   ------------------------------------------------------------------
   CARMINE VEM, E NAO E PARA MATAR
   ------------------------------------------------------------------
   Nas outras rotas a visita e um aviso com prazo. Aqui e uma
   conferencia, e o resultado da conferencia e que Antoniette nao e
   nada. Klara nao a escolheu. Nao ha vinculo, entao nao ha traicao,
   entao nao ha o que cobrar.

   >>> ELA VIVE PORQUE NAO VALEU A PENA MATAR. <<<
   Ninguem em cena diz isso. Carmine diz "Eu vim conferir, e conferi",
   e vai embora, e a porta da biblioteca nao abre a noite inteira.

   ------------------------------------------------------------------
   O ERRO DE IDADE
   ------------------------------------------------------------------
   Carmine corrige a entrada 214: Klara ja tem doze, e o caderno diz
   onze. Antoniette confere, acha o erro, corrige com a mesma pena
   e classifica: "Um erro em duzentas e catorze entradas. Esta dentro
   da margem."

   E o beat mais duro da rota, e ele nao pode ser sublinhado. Ela nao
   percebe o que acabou de dizer, e o texto tambem nao percebe.

   Cinco cenas: C1 a vela, C2 a conferencia, C3 a idade, C4 a porta que
   nao abre, C5 o fecho da entrada.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

var R = { rota: 'resposta' };

RBF.RES11 = [

{ t:'chap', num:'CAP\u00cdTULO 11', name:'A ENTRADA 214', chapter:'res11', if:R },
{ t:'fade_out', if:R },

/* ======================================================================
   C1 - A VELA
   ====================================================================== */
{ t:'scene', id:'res11_vela', chapter:'res11', title:'Quatro da manh\u00e3',
  bg:'bg_library_night', bgm:'bgm_camara', if:R },
{ t:'fade_in', if:R },
{ t:'spr', ch:'antoniette', ex:'guarded', pos:'center', if:R },

{ t:'nar', tx:'Ela levou a entrada 214 para a biblioteca \u00e0s quatro, para conferir contra as entradas 38, 91 e 160.', if:R },
{ t:'nar', tx:'As quatro descrevem o mesmo procedimento, com dezesseis anos entre a primeira e a \u00faltima.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'A dura\u00e7\u00e3o estimada da 160 errou por vinte e seis minutos.', if:R },
{ t:'inn', tx:'Esta n\u00e3o vai errar por vinte e seis.', if:R },
{ t:'pause', if:R },

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
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Esse n\u00e3o \u00e9 o meu nome. Mas voc\u00ea inventou bem. Serve.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette puxou o caderno para perto e virou para uma folha limpa.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Voc\u00ea vai anotar.', if:R },
{ t:'dial', ch:'antoniette', tx:'Vou.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Ent\u00e3o sente. Fica melhor sentada.', if:R },
{ t:'nar', tx:'Ela sentou e puxou o caderno para o centro da mesa.', if:R },

/* ======================================================================
   C2 - A CONFERENCIA
   Le 'taught'. Carmine confere e nao acha nada. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'res11_conferencia', chapter:'res11', title:'A confer\u00eancia',
  bg:'bg_library_night', keepSprites:true, if:R },

{ t:'dial', ch:'voz', tx:'Cinco anos. Ela l\u00ea mais r\u00e1pido. Corrige adulto sem constranger ningu\u00e9m.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'E confere fonte. Nunca acredita em uma s\u00f3. Isso foi voc\u00ea.', if:{ rota:'resposta', taught:'A' } },
{ t:'dial', ch:'voz', tx:'E a forma toda. Postura, protocolo, a etiqueta inteira. Isso foi voc\u00ea.', if:{ rota:'resposta', taught:'B' } },
{ t:'dial', ch:'voz', tx:'E o mundo inteiro pela biblioteca. Ela sabe o nome de portos onde nunca esteve. Isso foi voc\u00ea.', if:{ rota:'resposta', taught:'C' } },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette anotou a frase inteira, com aspas, e a hora na margem.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Ela te chama de qu\u00ea?', if:R },
{ t:'dial', ch:'antoniette', tx:'Senhorita.', if:R },
{ t:'dial', ch:'voz', tx:'Na frente dos outros. E quando n\u00e3o tem ningu\u00e9m.', if:R },
{ t:'dial', ch:'antoniette', tx:'Senhorita. Nos dois.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A irm\u00e3 dizia Toni desde o primeiro m\u00eas. Klara nunca disse, uma vez sequer, em cinco anos.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'voz', tx:'Quantas vezes ela procurou voc\u00ea sem precisar de nada?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette abriu o \u00edndice do caderno, porque ela tinha \u00edndice, e procurou a entrada.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Quatro. Est\u00e1 registrado. Tr\u00eas em ano dois e uma em ano tr\u00eas.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Quatro.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A vela n\u00e3o oscilou.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Em cinco anos.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette esperou o resto da frase e anotou a aus\u00eancia do resto da frase.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Ela j\u00e1 falou de mim com voc\u00ea?', if:R },
{ t:'nar', tx:'Antoniette procurou na mem\u00f3ria e depois no \u00edndice, e n\u00e3o achou nas duas.', if:R },
{ t:'dial', ch:'antoniette', tx:'Nenhuma vez em cinco anos.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Eu sei.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A resposta veio depois de uma pausa. Todo o resto tinha vindo sem pausa.', if:R },

/* ======================================================================
   C3 - A IDADE
   O beat mais duro da rota. NAO SUBLINHAR. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'res11_idade', chapter:'res11', title:'Dentro da margem',
  bg:'bg_library_night', keepSprites:true, if:R },

{ t:'dial', ch:'voz', tx:'Voc\u00ea escreveu duzentas e catorze entradas sobre ela.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Eu li todas. Levou uma hora.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette anotou "leu o caderno" e depois riscou, porque o caderno estava na m\u00e3o dela.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'voz', tx:'A idade est\u00e1 errada na 214. Ela j\u00e1 tinha doze.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette abriu na 214 ali mesmo, com a vela em cima do papel, e conferiu.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Estava errada.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'antoniette', ex:'neutral', pos:'center', if:R },
{ t:'inn', tx:'Um erro em duzentas e catorze entradas.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Est\u00e1 dentro da margem.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela corrigiu o n\u00famero com a mesma pena, p\u00f4s a rubrica ao lado da emenda como manda o manual, e seguiu para o assunto seguinte.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Voc\u00ea n\u00e3o perguntou como eu sei o m\u00eas.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o interessa ao registro.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A resposta estava correta.', if:R },

/* ======================================================================
   C4 - A PORTA QUE NAO ABRE
   Carmine confere e vai embora. A ausencia e o beat. NAO EXPLICAR.
   ====================================================================== */
{ t:'scene', id:'res11_porta', chapter:'res11', title:'A porta',
  bg:'bg_library_night', keepSprites:true, if:R },

{ t:'dial', ch:'antoniette', tx:'O que voc\u00ea quer.', if:R },
{ t:'dial', ch:'voz', tx:'Que voc\u00ea pare.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Parar o qu\u00ea?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A pergunta foi sincera. Ela passou o caderno em revista procurando o que havia para parar.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Nada. Eu vim conferir, e conferi.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A porta da biblioteca ficou fechada a noite inteira.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Ela dorme mal em agosto. Nunca procurou voc\u00ea por causa disso.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette anotou aquilo e p\u00f4s um ponto de interroga\u00e7\u00e3o na margem, porque n\u00e3o sabia em que coluna aquilo entrava.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'carmine', tx:'Carmine.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette tinha passado cinco anos batizando aquilo por conta pr\u00f3pria.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela escreveu o nome no alto da folha, em letra de forma, e sublinhou duas vezes.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Boa noite, escriba.', if:R },
{ t:'pause', if:R },

{ t:'sfx', id:'sfx_candle', if:R },
{ t:'nar', tx:'A vela apagou e acendeu de novo.', if:R },
{ t:'nar', tx:'Antoniette ficou olhando para a cadeira que n\u00e3o existia daquele lado da mesa.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ela n\u00e3o me deu prazo.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Nas outras casas h\u00e1 prazo. Est\u00e1 nos registros da Ordem, em tr\u00eas casos.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela anotou a aus\u00eancia do prazo e n\u00e3o conseguiu escrever o que ela significava.', if:R },
{ t:'spr_hide', ch:'antoniette', if:R },

/* ======================================================================
   C5 - O FECHO DA ENTRADA
   Saida: farpa.
   ====================================================================== */
{ t:'scene', id:'res11_fecho', chapter:'res11', title:'Sete e dez',
  bg:'bg_antoniette_room', bgm:null, if:R },

{ t:'nar', tx:'A entrada 214 foi fechada \u00e0s sete e dez.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A dura\u00e7\u00e3o estimada errou por nove minutos, contra vinte e seis da entrada 160.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'\u00c9 a melhor margem das quatro.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela p\u00f4s a data, a hora e a rubrica, e fechou o caderno com as duas m\u00e3os.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois desceu para o caf\u00e9, porque \u00e0s sete e meia ela descia para o caf\u00e9.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'liara', ex:'bright', pos:'right', if:R },
{ t:'nar', tx:'Liara j\u00e1 estava na copa e falou de Eldoria por onze minutos.', if:R },
{ t:'nar', tx:'A cadeira do outro lado dela estava vazia, e Liara n\u00e3o olhou para a cadeira uma vez sequer.', if:R },
{ t:'spr_hide', ch:'liara', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Klara desceu \u00e0s oito e vinte, com os l\u00e1bios sem cor e as m\u00e3os firmes na mesa, e comeu.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette anotou a hora da descida e o estado, e a anota\u00e7\u00e3o est\u00e1 na entrada 215.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'E Antoniette, que tinha cinco anos de registro e uma mem\u00f3ria treinada para dura\u00e7\u00f5es, n\u00e3o conseguiu dizer, depois, se a menina tinha olhado para ela ao entrar.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela deixou o campo em branco. \u00c9 o \u00fanico campo em branco das duzentas e quinze entradas.', if:R },

{ t:'fade_out', if:R },
{ t:'bgm', id:null, if:R },
{ t:'end_chap', line1:'Dez de agosto, sete e dez.', line2:'Nove minutos de margem.',
  chapter:'res11', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.RES11; }
