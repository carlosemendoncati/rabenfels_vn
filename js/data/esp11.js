/* ==========================================================================
   ARQUIVO RABENFELS - js/data/esp11.js
   ROTA ESPERANCA - CAPITULO 11: "Noventa Dias"

   Somente dados. TODO BEAT CARREGA if:{ rota:'esperanca' }.

   QUANDO: Ano 5, agosto. As quatro horas do Capitulo 10 acabaram.

   O PENSAMENTO UNICO (Zinsser, unidade):
   "O pacote foi despachado."
   Tudo o que este capitulo faz e levar uma mulher ate o gesto de
   entregar um embrulho a um mensageiro. Nenhuma outra ideia entra.

   QUEM AGE: Carmine. Nao para colher, e NAO pelo cronograma.
   Por ciume.

   ------------------------------------------------------------------
   O MOTIVO, E A REGRA QUE O ESCONDE
   ------------------------------------------------------------------
   Carmine e obcecada e nao aceita divisao. Todo pacto, para ela, e
   casamento. Quem pactua com ela pertence a ela. Por isso ela abomina
   casamento, amizade profunda, familiar muito proximo, outro patrono e
   divindade: qualquer vinculo importante e lido como traicao.

   Klara, sem querer, oferece exatamente o que Carmine quer - a
   capacidade de se entregar inteira a alguem. E aponta isso para
   Antoniette.

   Antoniette morre porque Klara a escolheu.

   >>> RESTRICAO DURA: ANTONIETTE NUNCA DESCOBRIU ISSO. <<<

   Nao esta no Arquivo. Nao pode estar - o Prologo inteiro e Matheo
   lendo o que ela escreveu, e o que ela escreveu esta errado no motivo.

   - Carmine NAO explica, NAO ameaca e NAO nomeia o ciume. Ela
     pergunta. As perguntas dela sao sobre o vinculo, nunca sobre o
     plano de fuga, e Antoniette responde todas sem perceber por que
     estao sendo feitas.
   - A teoria do calendario passa a ser dita por ANTONIETTE, em
     pensamento, e Carmine deixa passar sem confirmar nem desmentir. E
     a conclusao que vai para o Arquivo. E errada.
   - O unico vestigio que Antoniette registra e uma ausencia: "Ela nao
     perguntou nada sobre o plano." Ela anota na margem com um ponto de
     interrogacao e segue.

   NAO CONSERTAR ISSO EM CAPITULO NENHUM. A obra so funciona se o
   documento que o jogador leu primeiro estiver errado no motivo.

   ------------------------------------------------------------------
   O NOME
   ------------------------------------------------------------------
   >>> KLARA NAO SABE O NOME. KLARA NAO SABE QUE EXISTE ALGUEM. <<<
   Para ela e fome e vazio: um estado, nao uma pessoa. As falas da
   entidade saem sob o rotulo 'voz'. So no beat da revelacao o rotulo
   vira 'carmine'; a caixa de fala E a revelacao, e nenhum texto
   anuncia. Trocar antes disso entrega o capitulo na primeira linha.

   ------------------------------------------------------------------
   AS QUATRO PAGINAS
   ------------------------------------------------------------------
   O Prologo planta em P2 - "Faltam quatro" - e cobra em P10. Aqui
   paga. As quatro paginas sao as quatro vezes em que um terceiro pagou
   pelo metodo dela, montadas a partir das flags do proprio jogador:
   hid_from_order, told_klara, lied_to_order e third_paid.

   Elas nao sao queimadas. Vao para dentro do livro-caixa da casa, no
   lugar de quatro folhas em branco.

   Seis cenas: C1 o que restou, C2 a volta, C3 Carmine,
   C4 quatro paginas, C5 a ultima entrada, C6 noventa dias.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

var R = { rota: 'esperanca' };

RBF.ESP11 = [

{ t:'chap', num:'CAP\u00cdTULO 11', name:'NOVENTA DIAS', chapter:'esp11', if:R },
{ t:'fade_out', if:R },

/* ======================================================================
   C1 - O QUE RESTOU DA NOITE
   Nao recapitula a fuga. Comeca depois dela, no unico dado que
   interessa: onde ela esta e o que ainda funciona.
   ====================================================================== */
{ t:'scene', id:'esp11_restou', chapter:'esp11', title:'O que restou da noite',
  bg:'bg_black', bgm:null, if:R },
{ t:'fade_in', if:R },

{ t:'nar', tx:'O ar voltou ao normal antes das quatro.', if:R },
{ t:'nar', tx:'Foi o \u00fanico aviso que a casa deu de que aquilo tinha acabado.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Klara estava tr\u00eas passos \u00e0 frente, de costas, com a mala ainda na m\u00e3o.', if:R },
{ t:'nar', tx:'N\u00e3o tinha se movido.', if:R },
{ t:'nar', tx:'A trilha continuava adiante e n\u00e3o havia nada nela.', if:R },
{ t:'pause', if:R },

/* ======================================================================
   C2 - A VOLTA

   Sem esta cena o jogo teleporta: a fuga termina na floresta e o beat
   seguinte acende uma vela na biblioteca da casa.

   Nao ha captura e nao ha perseguicao. Klara vira e anda de volta, e
   nao sabe dizer por que - para ela e a fome e o vazio, que vieram na
   hora errada. Antoniette segue porque nao ha versao dela que deixe a
   menina sozinha ali.

   REGRA DO CANON: ninguem em cena diz o que aconteceu. Se alguem
   enunciar, o horror vira informacao.
   ====================================================================== */
{ t:'scene', id:'esp11_volta', chapter:'esp11', title:'A volta',
  bg:'bg_grey_march_road', bgm:null, if:R },
{ t:'spr', ch:'klara', ex:'blank', pos:'center', if:R },

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
{ t:'nar', tx:'Antoniette ergueu a m\u00e3o at\u00e9 a altura do bra\u00e7o da menina. Klara j\u00e1 estava dois passos adiante.', if:R },
{ t:'nar', tx:'A m\u00e3o desceu sem tocar em nada.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois foi atr\u00e1s dela.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Dois quil\u00f4metros de volta, e nenhuma das duas falou.', if:R },
{ t:'nar', tx:'Passaram a aldeia outra vez. As janelas continuavam fechadas.', if:R },
{ t:'nar', tx:'O c\u00e3o amarrado no fim da aldeia estava de p\u00e9, virado para o lado da casa, e n\u00e3o olhou para elas.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'No port\u00e3o, Klara segurou a mala pela al\u00e7a at\u00e9 Antoniette peg\u00e1-la.', if:R },
{ t:'dial', ch:'klara', tx:'Desculpa.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o foi voc\u00ea.', if:R },
{ t:'nar', tx:'Antoniette respondeu antes de escolher a resposta. N\u00e3o corrigiu.', if:R },
{ t:'spr_hide', ch:'klara', if:R },
{ t:'spr_hide', ch:'antoniette', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A guarda do port\u00e3o trocava \u00e0s onze e meia e n\u00e3o trocava mais nada at\u00e9 as seis.', if:R },
{ t:'nar', tx:'As duas entraram pelo mesmo caminho por onde tinham sa\u00eddo, e ningu\u00e9m na casa soube que elas tinham sa\u00eddo.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ningu\u00e9m vai me punir por isto. N\u00e3o houve isto.', if:R },
{ t:'inn', tx:'\u00c9 pior.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Ela fez o invent\u00e1rio, porque era o que sabia fazer com as m\u00e3os tremendo.', if:R },
{ t:'inn', tx:'Caderno. Chave da biblioteca. Duas velas. Papel para umas quarenta p\u00e1ginas.', if:R },
{ t:'inn', tx:'O bar\u00e3o n\u00e3o vai mandar ningu\u00e9m antes do amanhecer. Ele nunca resolve nada de noite.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ent\u00e3o tenho at\u00e9 o amanhecer.', if:R },

{ t:'nar', tx:'Foi a \u00faltima previs\u00e3o correta que ela fez.', if:R },

/* ======================================================================
   C3 - CARMINE
   A cena central da obra. Nenhum sprite do outro lado: so temperatura,
   cortesia e cronograma. As linhas dela correm como narracao ate o
   nome ser dito.
   ====================================================================== */
{ t:'scene', id:'esp11_carmine', chapter:'esp11', title:'Carmine',
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
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Esse n\u00e3o \u00e9 o meu nome. Mas voc\u00ea inventou bem. Serve.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Sente, por favor. Isto leva alguns minutos e voc\u00ea est\u00e1 de p\u00e9 desde ontem.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette n\u00e3o sentou.', if:R },
{ t:'dial', ch:'voz', tx:'Como quiser.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Vim agradecer.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'neutral', pos:'center', if:R },
{ t:'dial', ch:'antoniette', tx:'Agradecer.', if:R },
{ t:'dial', ch:'voz', tx:'Cinco anos. Ela l\u00ea mais r\u00e1pido. Corrige adulto sem constranger ningu\u00e9m. Sabe atravessar uma sala que est\u00e1 medindo ela.', if:R },
{ t:'pause', if:R },

/* Cobra o Capitulo 6 com o texto do proprio jogador. */
{ t:'dial', ch:'voz', tx:'E confere fonte. Nunca acredita em uma s\u00f3. Isso foi voc\u00ea.', if:{ rota:'esperanca', taught:'A' } },
{ t:'dial', ch:'voz', tx:'E a forma toda. Postura, protocolo, a etiqueta inteira. Isso foi voc\u00ea.', if:{ rota:'esperanca', taught:'B' } },
{ t:'dial', ch:'voz', tx:'E o mundo inteiro pela biblioteca. Ela sabe o nome de portos onde nunca esteve. Isso foi voc\u00ea.', if:{ rota:'esperanca', taught:'C' } },
{ t:'pause', if:R },

{ t:'dial', ch:'voz', tx:'Eu conhe\u00e7o cada coisa que ela sabe. Sei o dia em que aprendeu cada uma.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Essas tr\u00eas eu n\u00e3o sei. Essas chegaram por fora.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center', if:R },
{ t:'inn', tx:'N\u00e3o.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Eu n\u00e3o preciso que voc\u00ea concorde. Estou conferindo.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Ent\u00e3o \u00e9 isso. Eu melhorei o que voc\u00ea vai levar.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'\u00c9 isso que voc\u00ea vai escrever.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'E voc\u00ea teria feito de novo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette abriu a boca para responder e n\u00e3o achou a frase.', if:R },

/* A frase longa. Uma so. Espelha a de Matheo em P10. */
{ t:'pause', if:R },
{ t:'inn', tx:'Ela pensou no primeiro dia, no invent\u00e1rio da despensa, e em como tinha decidido ser met\u00f3dica porque m\u00e9todo era o \u00fanico jeito de n\u00e3o ser expulsa na primeira semana, e pensou que quatro anos e quatro meses de m\u00e9todo tinham deixado uma crian\u00e7a mais interessante para a coisa que ia com\u00ea-la, e que se tivesse sido desleixada, se tivesse sido burra, se tivesse chegado ali e feito barulho no primeiro m\u00eas e sido posta na estrada em outubro do primeiro ano, Klara estaria hoje assustada, calada e \u00fatil, e viva do mesmo jeito, e o m\u00e9todo dela n\u00e3o teria custado nada a ningu\u00e9m.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'voz', tx:'N\u00e3o.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Estaria viva do mesmo jeito. Voc\u00ea acertou essa parte.', if:R },
{ t:'pause', if:R },

/* As perguntas. Nenhuma delas e sobre o plano. */
{ t:'spr', ch:'antoniette', ex:'neutral', pos:'center', if:R },
{ t:'dial', ch:'voz', tx:'Ela te chama de qu\u00ea?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Por um instante, Antoniette pensou em Liara. Ent\u00e3o entendeu.', if:R },
{ t:'dial', ch:'antoniette', tx:'Senhorita.', if:R },
{ t:'dial', ch:'voz', tx:'Na frente dos outros. E quando n\u00e3o tem ningu\u00e9m.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Senhorita. Nos dois.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A irm\u00e3 dizia Toni desde o primeiro m\u00eas. Klara nunca disse, uma vez sequer, em cinco anos.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A vela n\u00e3o oscilou.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Quantas vezes ela procurou voc\u00ea sem precisar de nada?', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu n\u00e3o contei.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Eu contei.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'antoniette', ex:'guarded', pos:'center', if:R },
{ t:'dial', ch:'antoniette', tx:'O que isso tem a ver com o cronograma?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Carmine n\u00e3o respondeu. Antoniette tomou o sil\u00eancio por confirma\u00e7\u00e3o.', if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'\u00c9 o calend\u00e1rio.', if:R },
{ t:'inn', tx:'Dezesseis gera\u00e7\u00f5es sem atraso, e eu tenho num caderno as datas e a planta inteira.', if:R },
{ t:'inn', tx:'Sou a \u00fanica coisa nesta casa que chegou perto de mover uma data.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Escreveu "data" na margem e cercou a palavra duas vezes.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Ela j\u00e1 falou de mim com voc\u00ea?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette procurou na mem\u00f3ria e n\u00e3o achou uma vez.', if:R },
{ t:'dial', ch:'antoniette', tx:'Ela nunca falou de voc\u00ea. Nenhuma vez em cinco anos.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Ela fala de fome. Fala de um vazio que vem e passa.', if:R },
{ t:'dial', ch:'antoniette', tx:'Nunca falou de ningu\u00e9m do outro lado.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Eu sei.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Foi a \u00fanica resposta da noite inteira que veio depressa demais.', if:R },

/* Klara entra, e NAO ve ninguem. Ela nao sabe que Carmine existe. */
{ t:'pause', if:R },
{ t:'sfx', id:'sfx_door', if:R },
{ t:'nar', tx:'A porta da biblioteca abriu.', if:R },
{ t:'spr', ch:'klara', ex:'blank', pos:'left', if:R },
{ t:'nar', tx:'Klara estava de camisola e descal\u00e7a.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Est\u00e1 com fome de novo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela n\u00e3o disse quem. Nunca dizia quem.', if:R },
{ t:'nar', tx:'Para ela era uma fome e um vazio, e vinham quando vinham.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Posso ficar aqui at\u00e9 passar?', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette olhou para o lado da mesa onde n\u00e3o havia cadeira.', if:R },
{ t:'nar', tx:'Klara seguiu o olhar dela at\u00e9 l\u00e1, e n\u00e3o encontrou nada.', if:R },
{ t:'nar', tx:'Voltou os olhos para Antoniette, esperando resposta.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center', if:R },
{ t:'dial', ch:'antoniette', tx:'Volta para a cama, Klara.', if:R },
{ t:'nar', tx:'Klara voltou.', if:R },
{ t:'spr_hide', ch:'klara', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A porta fechou.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'O ar da biblioteca esfriou dois graus e levou um tempo para voltar.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Com fome, no meio da noite, ela levantou e veio aqui.', if:R },
{ t:'pause', if:R },

/* O nome vem dela mesma. Cortesia para quem nao vai poder usar. */
{ t:'dial', ch:'voz', tx:'Voc\u00ea vai escrever isto. Ent\u00e3o escreva certo.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Carmine.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette tinha passado cinco anos batizando aquilo por conta pr\u00f3pria.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ela nunca ouviu esse nome. Nem uma vez em doze anos de vida.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'E eu ouvi hoje.', if:R },

/* A promessa do Capitulo 9, cobrada. */
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Voc\u00ea prometeu alguma coisa a ela em fevereiro.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'guarded', pos:'center', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu mostrei o caderno. N\u00e3o prometi nada.', if:{ rota:'esperanca', promised:'A' } },
{ t:'dial', ch:'antoniette', tx:'Eu prometi.', if:{ rota:'esperanca', promised:'B' } },
{ t:'dial', ch:'antoniette', tx:'Eu dei uma data.', if:{ rota:'esperanca', promised:'C' } },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Ela entendeu como promessa.', if:{ rota:'esperanca', promised:'A' } },
{ t:'dial', ch:'carmine', tx:'Inteiro, sem qualificar. Ela repetiu para a irm\u00e3 na mesma noite.', if:{ rota:'esperanca', promised:'B' } },
{ t:'dial', ch:'carmine', tx:'Agosto, antes do dia dez. Ela contou os dias no calend\u00e1rio da cozinha. Riscando.', if:{ rota:'esperanca', promised:'C' } },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Hoje \u00e9 dia dez.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Ela acreditou em voc\u00ea.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Carmine n\u00e3o aumentou a voz nem esperou defesa.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'O que voc\u00ea quer.', if:R },
{ t:'dial', ch:'carmine', tx:'Que voc\u00ea pare.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'N\u00e3o \u00e9 pedido. Estou avisando com anteced\u00eancia porque \u00e9 mais limpo assim.', if:R },
{ t:'nar', tx:'A vela n\u00e3o oscilou uma vez durante a conversa inteira.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Voc\u00ea tem at\u00e9 o amanhecer.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela tinha chegado sozinha \u00e0quela mesma conta, tr\u00eas horas antes.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Por que me avisar?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Porque quem \u00e9 avisado arruma as coisas. Quem n\u00e3o \u00e9 deixa papel espalhado pela casa.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Boa noite, escriba.', if:R },
{ t:'pause', if:R },

{ t:'sfx', id:'sfx_candle', if:R },
{ t:'nar', tx:'A vela apagou e acendeu de novo.', if:R },
{ t:'nar', tx:'Antoniette ficou olhando para a cadeira que n\u00e3o existia daquele lado da mesa.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ela n\u00e3o perguntou nada sobre o plano.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Nem uma vez.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela anotou aquilo na margem, com um ponto de interroga\u00e7\u00e3o, e passou para o assunto seguinte.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ela quer que eu arrume.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'neutral', pos:'center', if:R },
{ t:'inn', tx:'Ent\u00e3o eu arrumo.', if:R },

/* ======================================================================
   C4 - QUATRO PAGINAS
   Paga o "Faltam quatro" do Prologo. Contagem regressiva enquanto ela
   arranca; Matheo conta para cima em P2 e encontra o buraco.
   ====================================================================== */
{ t:'scene', id:'esp11_paginas', chapter:'esp11', title:'Quatro p\u00e1ginas',
  bg:'bg_archive_closeup', bgm:'bgm_archive', if:R },
{ t:'spr', ch:'antoniette', ex:'away', pos:'center', if:R },

{ t:'nar', tx:'Ela escreveu at\u00e9 as tr\u00eas e meia sem parar para reler.', if:R },
{ t:'nar', tx:'Duzentas e noventa e uma p\u00e1ginas numeradas, cinco anos, tudo o que servia.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'\u00c0s tr\u00eas e meia ela parou e voltou ao come\u00e7o.', if:R },
{ t:'inn', tx:'Se algu\u00e9m usar isto, vai usar contra a casa.', if:R },
{ t:'inn', tx:'E vai ler tudo. Inclusive o que eu fiz.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela abriu na primeira e passou o polegar pela dobra interna.', if:R },
{ t:'sfx', id:'sfx_page_turn', if:R },

{ t:'nar', tx:'A p\u00e1gina de outubro do primeiro ano. O que ela viu no p\u00e1tio e n\u00e3o mandou para a Ordem.', if:{ rota:'esperanca', hid_from_order:true } },
{ t:'nar', tx:'A p\u00e1gina de outubro do primeiro ano. O que ela mandou para a Ordem, e o que a Ordem arquivou sem responder.', if:{ rota:'esperanca', hid_from_order:false } },
{ t:'inn', tx:'Tr\u00eas.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A p\u00e1gina da c\u00e2mara. Ela desceu, viu, e subiu com uma crian\u00e7a de nove anos cobrindo a aus\u00eancia dela no andar de cima.', if:R },
{ t:'nar', tx:'Na margem, o que ela respondeu a Klara depois: nada. Deixou fechar sozinho.', if:{ rota:'esperanca', told_klara:'A' } },
{ t:'nar', tx:'Na margem, o que ela respondeu a Klara depois: uma vers\u00e3o limpa, feita para a menina n\u00e3o ter de carregar aquilo.', if:{ rota:'esperanca', told_klara:'B' } },
{ t:'nar', tx:'Na margem, o que ela respondeu a Klara depois: a verdade, e um pedido para n\u00e3o repetir.', if:{ rota:'esperanca', told_klara:'C' } },
{ t:'inn', tx:'Duas.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A p\u00e1gina de agosto do terceiro ano.', if:R },
{ t:'nar', tx:'O relat\u00f3rio inteiro, com o que ela viu subir. Lervel recebeu tudo e respondeu em nove semanas mandando continuar observando.', if:{ rota:'esperanca', lied_to_order:'A' } },
{ t:'nar', tx:'O relat\u00f3rio com o epis\u00f3dio dado como de natureza indeterminada, sem testemunha direta. Ela foi a testemunha direta.', if:{ rota:'esperanca', lied_to_order:'B' } },
{ t:'nar', tx:'A p\u00e1gina em que agosto n\u00e3o existe. Lervel recebeu o m\u00eas sem o m\u00eas dentro.', if:{ rota:'esperanca', lied_to_order:'C' } },
{ t:'inn', tx:'Uma.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A p\u00e1gina de Fenn.', if:R },
{ t:'nar', tx:'Ela leu duas vezes antes de arrancar.', if:R },
{ t:'nar', tx:'Estava tudo certo ali. Datas conferidas, valores conferidos, a d\u00edvida quitada num s\u00e1bado. Nada errado na p\u00e1gina.', if:R },
{ t:'nar', tx:'Um homem foi \u00fatil a ela e ela negaria a fonte se perguntassem. Isso n\u00e3o cabia em coluna nenhuma.', if:{ rota:'esperanca', third_paid:'A' } },
{ t:'nar', tx:'Ela comprou o nome para levar a Lervel, e o nome era de um homem vivo. Isso n\u00e3o cabia em coluna nenhuma.', if:{ rota:'esperanca', third_paid:'B' } },
{ t:'nar', tx:'Ela recusou o nome e mandou o rapaz embora no mesmo dia. Ficou sem a prova e nunca soube se o menino chegou.', if:{ rota:'esperanca', third_paid:'C' } },
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
{ t:'inn', tx:'Se algu\u00e9m entrar nesta casa, entra por aqui. Sempre entra por aqui.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Subiu. Faltava uma hora e quarenta para o amanhecer.', if:R },

/* ======================================================================
   C5 - A ULTIMA ENTRADA
   O texto que o Prologo citou em P10. Aqui ele esta sendo escrito, e o
   jogador ja sabe onde ele vai parar.
   ====================================================================== */
{ t:'scene', id:'esp11_ultima', chapter:'esp11', title:'A \u00faltima entrada',
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
{ t:'nar', tx:'Escreveu tamb\u00e9m que ela ri depois, quando j\u00e1 passou, quando acha que n\u00e3o tem ningu\u00e9m olhando.', if:R },
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
{ t:'nar', tx:'Assinou com as iniciais, porque o nome inteiro num documento daqueles \u00e9 um risco para quem recebe.', if:R },
{ t:'nar', tx:'P\u00f4s o lugar e o m\u00eas. N\u00e3o p\u00f4s o dia.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'O dia n\u00e3o interessa a ningu\u00e9m.', if:R },

/* A pergunta a Matheo. O Prologo mostrou a pagina; aqui e o gesto. */
{ t:'pause', if:R },
{ t:'nar', tx:'Ent\u00e3o ela virou duas folhas em branco e come\u00e7ou outra vez, no alto de uma p\u00e1gina limpa.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Escreveu o nome dele. Quando ergueu a pena, a tinta na ponta j\u00e1 tinha secado.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ele leu a ficha da escriba anterior antes de assinar a autoriza\u00e7\u00e3o. Eu sei que leu. Eu vi o protocolo.', if:R },
{ t:'inn', tx:'Faz oito anos que eu n\u00e3o pergunto.', if:R },
{ t:'pause', if:R },

{ t:'arc', key:'arquivo', lns:[
    '\u201cMatheo \u2014 se voc\u00ea estiver lendo isto, preciso de uma resposta que n\u00e3o posso pedir de outro jeito.\u201d',
    '\u201cVoc\u00ea sabia?\u201d'
], if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Deixou o resto da p\u00e1gina em branco.', if:R },
{ t:'nar', tx:'Foi a \u00fanica coisa que ela escreveu naquela noite sem calcular se serviria para alguma coisa.', if:R },
{ t:'pause', if:R },
{ t:'spr_hide', ch:'antoniette', if:R },

/* ======================================================================
   C6 - NOVENTA DIAS
   O comeco do Prologo, visto do outro lado. Nada aqui pode contradizer
   P1: couro encerado, cordel escuro em quatro voltas, no cego, sem
   selo, mais pesado do que devia, e a letra miuda e controlada.
   ====================================================================== */
{ t:'scene', id:'esp11_noventa', chapter:'esp11', title:'Noventa dias',
  bg:'bg_nidhaus_gate', bgm:'bgm_prologue', if:R },
{ t:'fade_in', if:R },
{ t:'spr', ch:'antoniette', ex:'neutral', pos:'center', if:R },

{ t:'nar', tx:'O c\u00e9u estava clareando na dire\u00e7\u00e3o do port\u00e3o quando ela desceu com o embrulho.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Couro encerado, porque chuva na estrada arruina papel.', if:R },
{ t:'nar', tx:'Sem selo, porque selo diz de onde veio.', if:R },
{ t:'nar', tx:'Cordel escuro, quatro voltas, n\u00f3 cego. O n\u00f3 ficou sob o pacote, fora de vista.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Pesava mais do que devia para o tamanho. Ela reparou nisso e achou bom.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'O mensageiro da rota de Alsbeck parava no port\u00e3o toda quarta antes do sol.', if:R },
{ t:'nar', tx:'Era um homem que n\u00e3o fazia pergunta. Ela conferiu isso no segundo ano e anotou.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela entregou o pacote com as duas m\u00e3os.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Isto n\u00e3o vai agora.', if:R },
{ t:'dial', ch:'mensageiro', tx:'Ent\u00e3o vai quando, senhora?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Guarda a\u00ed. Eu mando not\u00edcia toda quarta. Se passar noventa dias sem not\u00edcia minha, voc\u00ea leva.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'mensageiro', tx:'E se a senhora mandar not\u00edcia?', if:R },
{ t:'dial', ch:'antoniette', tx:'A\u00ed o prazo recome\u00e7a.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'mensageiro', tx:'Noventa \u00e9 muito tempo.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'away', pos:'center', if:R },
{ t:'dial', ch:'antoniette', tx:'\u00c9 o que d\u00e1 para eu garantir.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Ela contou as moedas do adiantamento na palma dele, uma a uma, e conferiu duas vezes.', if:R },
{ t:'nar', tx:'Depois disse o endere\u00e7o em voz alta e pediu que ele repetisse. Ele repetiu certo na segunda.', if:R },
{ t:'pause', if:R },
{ t:'sfx', id:'sfx_footsteps', if:R },
{ t:'nar', tx:'O cavalo saiu andando e ela n\u00e3o esperou recibo.', if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'Pronto.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'O relat\u00f3rio estava despachado. O trabalho estava fechado. N\u00e3o restava nada em cima da mesa.', if:R },
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

{ t:'fade_out', if:R },
{ t:'bgm', id:null, if:R },
{ t:'end_chap', line1:'Noventa e tr\u00eas dias depois.', line2:'O pacote foi entregue.',
  chapter:'esp11', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.ESP11; }
