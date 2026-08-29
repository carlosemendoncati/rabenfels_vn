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

{ t:'chap', num:'CAPÍTULO 11', name:'NOVENTA DIAS', chapter:'esp11', if:R },
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
{ t:'nar', tx:'Foi o único aviso que a casa deu de que aquilo tinha acabado.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Klara estava três passos à frente, de costas, com a mala ainda na mão.', if:R },
{ t:'nar', tx:'Não tinha se movido.', if:R },
{ t:'nar', tx:'A trilha continuava adiante e não havia nada nela.', if:R },
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

{ t:'dial', ch:'antoniette', tx:'Klara. O barco é às seis.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A menina virou o corpo inteiro, não só a cabeça, e olhou para o lado de onde tinham vindo.', if:R },
{ t:'dial', ch:'klara', tx:'Eu preciso voltar.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Por quê?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Klara puxou ar para responder. Soltou sem palavra.', if:R },
{ t:'dial', ch:'klara', tx:'Não sei.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Está com fome de novo. E aquela outra coisa junto.', if:R },
{ t:'nar', tx:'Não soube dar mais que isso.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Klara virou e começou a desfazer o caminho. A mala batia no joelho a cada passo.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'antoniette', ex:'shaken', pos:'left', if:R },
{ t:'inn', tx:'Segura o braço dela.', if:R },
{ t:'inn', tx:'Levanta e carrega. Ela tem doze anos e trinta e oito quilos.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette ergueu a mão até a altura do braço da menina. Klara já estava dois passos adiante.', if:R },
{ t:'nar', tx:'A mão desceu sem tocar em nada.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois foi atrás dela.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Dois quilômetros de volta, e nenhuma das duas falou.', if:R },
{ t:'nar', tx:'Passaram a aldeia outra vez. As janelas continuavam fechadas.', if:R },
{ t:'nar', tx:'O cão amarrado no fim da aldeia estava de pé, virado para o lado da casa, e não olhou para elas.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'No portão, Klara segurou a mala pela alça até Antoniette pegá-la.', if:R },
{ t:'dial', ch:'klara', tx:'Desculpa.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Não foi você.', if:R },
{ t:'nar', tx:'Antoniette respondeu antes de escolher a resposta. Não corrigiu.', if:R },
{ t:'spr_hide', ch:'klara', if:R },
{ t:'spr_hide', ch:'antoniette', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A guarda do portão trocava às onze e meia e não trocava mais nada até as seis.', if:R },
{ t:'nar', tx:'As duas entraram pelo mesmo caminho por onde tinham saído, e ninguém na casa soube que elas tinham saído.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ninguém vai me punir por isto. Não houve isto.', if:R },
{ t:'inn', tx:'É pior.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Ela fez o inventário, porque era o que sabia fazer com as mãos tremendo.', if:R },
{ t:'inn', tx:'Caderno. Chave da biblioteca. Duas velas. Papel para umas quarenta páginas.', if:R },
{ t:'inn', tx:'O barão não vai mandar ninguém antes do amanhecer. Ele nunca resolve nada de noite.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Então tenho até o amanhecer.', if:R },

{ t:'nar', tx:'Foi a última previsão correta que ela fez.', if:R },

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
{ t:'nar', tx:'Não havia corrente de ar na biblioteca. Ela conferiu as janelas em março e anotou.', if:R },
{ t:'pause', if:R },
{ t:'sfx', id:'sfx_candle', if:R },
{ t:'nar', tx:'A segunda vela continuou acesa.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'voz', tx:'Você escreve muito depressa para quem escreve à mão.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center', if:R },
{ t:'nar', tx:'A voz vinha da altura errada. Vinha da altura de alguém sentado, e não havia cadeira daquele lado.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Khar’Vel.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Esse não é o meu nome. Mas você inventou bem. Serve.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Sente, por favor. Isto leva alguns minutos e você está de pé desde ontem.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette não sentou.', if:R },
{ t:'dial', ch:'voz', tx:'Como quiser.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Vim agradecer.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'neutral', pos:'center', if:R },
{ t:'dial', ch:'antoniette', tx:'Agradecer.', if:R },
{ t:'dial', ch:'voz', tx:'Cinco anos. Ela lê mais rápido. Corrige adulto sem constranger ninguém. Sabe atravessar uma sala que está medindo ela.', if:R },
{ t:'pause', if:R },

/* Cobra o Capitulo 6 com o texto do proprio jogador. */
{ t:'dial', ch:'voz', tx:'E confere fonte. Nunca acredita em uma só. Isso foi você.', if:{ rota:'esperanca', taught:'A' } },
{ t:'dial', ch:'voz', tx:'E a forma toda. Postura, protocolo, a etiqueta inteira. Isso foi você.', if:{ rota:'esperanca', taught:'B' } },
{ t:'dial', ch:'voz', tx:'E o mundo inteiro pela biblioteca. Ela sabe o nome de portos onde nunca esteve. Isso foi você.', if:{ rota:'esperanca', taught:'C' } },
{ t:'pause', if:R },

{ t:'dial', ch:'voz', tx:'Eu conheço cada coisa que ela sabe. Sei o dia em que aprendeu cada uma.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Essas três eu não sei. Essas chegaram por fora.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center', if:R },
{ t:'inn', tx:'Não.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Eu não preciso que você concorde. Estou conferindo.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Então é isso. Eu melhorei o que você vai levar.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'É isso que você vai escrever.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'E você teria feito de novo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette abriu a boca para responder e não achou a frase.', if:R },

/* A frase longa. Uma so. Espelha a de Matheo em P10. */
{ t:'pause', if:R },
{ t:'inn', tx:'Ela pensou no primeiro dia, no inventário da despensa, e em como tinha decidido ser metódica porque método era o único jeito de não ser expulsa na primeira semana, e pensou que quatro anos e quatro meses de método tinham deixado uma criança mais interessante para a coisa que ia comê-la, e que se tivesse sido desleixada, se tivesse sido burra, se tivesse chegado ali e feito barulho no primeiro mês e sido posta na estrada em outubro do primeiro ano, Klara estaria hoje assustada, calada e útil, e viva do mesmo jeito, e o método dela não teria custado nada a ninguém.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'voz', tx:'Não.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Estaria viva do mesmo jeito. Você acertou essa parte.', if:R },
{ t:'pause', if:R },

/* As perguntas. Nenhuma delas e sobre o plano. */
{ t:'spr', ch:'antoniette', ex:'neutral', pos:'center', if:R },
{ t:'dial', ch:'voz', tx:'Ela te chama de quê?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Por um instante, Antoniette pensou em Liara. Então entendeu.', if:R },
{ t:'dial', ch:'antoniette', tx:'Senhorita.', if:R },
{ t:'dial', ch:'voz', tx:'Na frente dos outros. E quando não tem ninguém.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Senhorita. Nos dois.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A irmã dizia Toni desde o primeiro mês. Klara nunca disse, uma vez sequer, em cinco anos.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A vela não oscilou.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Quantas vezes ela procurou você sem precisar de nada?', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu não contei.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Eu contei.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'antoniette', ex:'guarded', pos:'center', if:R },
{ t:'dial', ch:'antoniette', tx:'O que isso tem a ver com o cronograma?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Carmine não respondeu. Antoniette tomou o silêncio por confirmação.', if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'É o calendário.', if:R },
{ t:'inn', tx:'Dezesseis gerações sem atraso, e eu tenho num caderno as datas e a planta inteira.', if:R },
{ t:'inn', tx:'Sou a única coisa nesta casa que chegou perto de mover uma data.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Escreveu "data" na margem e cercou a palavra duas vezes.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Ela já falou de mim com você?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette procurou na memória e não achou uma vez.', if:R },
{ t:'dial', ch:'antoniette', tx:'Ela nunca falou de você. Nenhuma vez em cinco anos.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Ela fala de fome. Fala de um vazio que vem e passa.', if:R },
{ t:'dial', ch:'antoniette', tx:'Nunca falou de ninguém do outro lado.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Eu sei.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Foi a única resposta da noite inteira que veio depressa demais.', if:R },

/* Klara entra, e NAO ve ninguem. Ela nao sabe que Carmine existe. */
{ t:'pause', if:R },
{ t:'sfx', id:'sfx_door', if:R },
{ t:'nar', tx:'A porta da biblioteca abriu.', if:R },
{ t:'spr', ch:'klara', ex:'blank', pos:'left', if:R },
{ t:'nar', tx:'Klara estava de camisola e descalça.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Está com fome de novo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela não disse quem. Nunca dizia quem.', if:R },
{ t:'nar', tx:'Para ela era uma fome e um vazio, e vinham quando vinham.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Posso ficar aqui até passar?', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette olhou para o lado da mesa onde não havia cadeira.', if:R },
{ t:'nar', tx:'Klara seguiu o olhar dela até lá, e não encontrou nada.', if:R },
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
{ t:'dial', ch:'voz', tx:'Você vai escrever isto. Então escreva certo.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Carmine.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette tinha passado cinco anos batizando aquilo por conta própria.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ela nunca ouviu esse nome. Nem uma vez em doze anos de vida.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'E eu ouvi hoje.', if:R },

/* A promessa do Capitulo 9, cobrada. */
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Você prometeu alguma coisa a ela em fevereiro.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'guarded', pos:'center', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu mostrei o caderno. Não prometi nada.', if:{ rota:'esperanca', promised:'A' } },
{ t:'dial', ch:'antoniette', tx:'Eu prometi.', if:{ rota:'esperanca', promised:'B' } },
{ t:'dial', ch:'antoniette', tx:'Eu dei uma data.', if:{ rota:'esperanca', promised:'C' } },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Ela entendeu como promessa.', if:{ rota:'esperanca', promised:'A' } },
{ t:'dial', ch:'carmine', tx:'Inteiro, sem qualificar. Ela repetiu para a irmã na mesma noite.', if:{ rota:'esperanca', promised:'B' } },
{ t:'dial', ch:'carmine', tx:'Agosto, antes do dia dez. Ela contou os dias no calendário da cozinha. Riscando.', if:{ rota:'esperanca', promised:'C' } },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Hoje é dia dez.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Ela acreditou em você.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Carmine não aumentou a voz nem esperou defesa.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'O que você quer.', if:R },
{ t:'dial', ch:'carmine', tx:'Que você pare.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Não é pedido. Estou avisando com antecedência porque é mais limpo assim.', if:R },
{ t:'nar', tx:'A vela não oscilou uma vez durante a conversa inteira.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Você tem até o amanhecer.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela tinha chegado sozinha àquela mesma conta, três horas antes.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Por que me avisar?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Porque quem é avisado arruma as coisas. Quem não é deixa papel espalhado pela casa.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Boa noite, escriba.', if:R },
{ t:'pause', if:R },

{ t:'sfx', id:'sfx_candle', if:R },
{ t:'nar', tx:'A vela apagou e acendeu de novo.', if:R },
{ t:'nar', tx:'Antoniette ficou olhando para a cadeira que não existia daquele lado da mesa.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ela não perguntou nada sobre o plano.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Nem uma vez.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela anotou aquilo na margem, com um ponto de interrogação, e passou para o assunto seguinte.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ela quer que eu arrume.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'neutral', pos:'center', if:R },
{ t:'inn', tx:'Então eu arrumo.', if:R },

/* ======================================================================
   C4 - QUATRO PAGINAS
   Paga o "Faltam quatro" do Prologo. Contagem regressiva enquanto ela
   arranca; Matheo conta para cima em P2 e encontra o buraco.
   ====================================================================== */
{ t:'scene', id:'esp11_paginas', chapter:'esp11', title:'Quatro páginas',
  bg:'bg_archive_closeup', bgm:'bgm_archive', if:R },
{ t:'spr', ch:'antoniette', ex:'away', pos:'center', if:R },

{ t:'nar', tx:'Ela escreveu até as três e meia sem parar para reler.', if:R },
{ t:'nar', tx:'Duzentas e noventa e uma páginas numeradas, cinco anos, tudo o que servia.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Às três e meia ela parou e voltou ao começo.', if:R },
{ t:'inn', tx:'Se alguém usar isto, vai usar contra a casa.', if:R },
{ t:'inn', tx:'E vai ler tudo. Inclusive o que eu fiz.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela abriu na primeira e passou o polegar pela dobra interna.', if:R },
{ t:'sfx', id:'sfx_page_turn', if:R },

{ t:'nar', tx:'A página de outubro do primeiro ano. O que ela viu no pátio e não mandou para a Ordem.', if:{ rota:'esperanca', hid_from_order:true } },
{ t:'nar', tx:'A página de outubro do primeiro ano. O que ela mandou para a Ordem, e o que a Ordem arquivou sem responder.', if:{ rota:'esperanca', hid_from_order:false } },
{ t:'inn', tx:'Três.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A página da câmara. Ela desceu, viu, e subiu com uma criança de nove anos cobrindo a ausência dela no andar de cima.', if:R },
{ t:'nar', tx:'Na margem, o que ela respondeu a Klara depois: nada. Deixou fechar sozinho.', if:{ rota:'esperanca', told_klara:'A' } },
{ t:'nar', tx:'Na margem, o que ela respondeu a Klara depois: uma versão limpa, feita para a menina não ter de carregar aquilo.', if:{ rota:'esperanca', told_klara:'B' } },
{ t:'nar', tx:'Na margem, o que ela respondeu a Klara depois: a verdade, e um pedido para não repetir.', if:{ rota:'esperanca', told_klara:'C' } },
{ t:'inn', tx:'Duas.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A página de agosto do terceiro ano.', if:R },
{ t:'nar', tx:'O relatório inteiro, com o que ela viu subir. Lervel recebeu tudo e respondeu em nove semanas mandando continuar observando.', if:{ rota:'esperanca', lied_to_order:'A' } },
{ t:'nar', tx:'O relatório com o episódio dado como de natureza indeterminada, sem testemunha direta. Ela foi a testemunha direta.', if:{ rota:'esperanca', lied_to_order:'B' } },
{ t:'nar', tx:'A página em que agosto não existe. Lervel recebeu o mês sem o mês dentro.', if:{ rota:'esperanca', lied_to_order:'C' } },
{ t:'inn', tx:'Uma.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A página de Fenn.', if:R },
{ t:'nar', tx:'Ela leu duas vezes antes de arrancar.', if:R },
{ t:'nar', tx:'Estava tudo certo ali. Datas conferidas, valores conferidos, a dívida quitada num sábado. Nada errado na página.', if:R },
{ t:'nar', tx:'Um homem foi útil a ela e ela negaria a fonte se perguntassem. Isso não cabia em coluna nenhuma.', if:{ rota:'esperanca', third_paid:'A' } },
{ t:'nar', tx:'Ela comprou o nome para levar a Lervel, e o nome era de um homem vivo. Isso não cabia em coluna nenhuma.', if:{ rota:'esperanca', third_paid:'B' } },
{ t:'nar', tx:'Ela recusou o nome e mandou o rapaz embora no mesmo dia. Ficou sem a prova e nunca soube se o menino chegou.', if:{ rota:'esperanca', third_paid:'C' } },
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
{ t:'inn', tx:'Se alguém entrar nesta casa, entra por aqui. Sempre entra por aqui.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Subiu. Faltava uma hora e quarenta para o amanhecer.', if:R },

/* ======================================================================
   C5 - A ULTIMA ENTRADA
   O texto que o Prologo citou em P10. Aqui ele esta sendo escrito, e o
   jogador ja sabe onde ele vai parar.
   ====================================================================== */
{ t:'scene', id:'esp11_ultima', chapter:'esp11', title:'A última entrada',
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

{ t:'inn', tx:'Escreve o que serve. Ninguém lê lamento.', if:R },
{ t:'nar', tx:'Ela escreveu a idade, a velocidade de leitura e o jeito de corrigir os outros em voz baixa.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Parou.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Isso não é informação operacional.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'soft', pos:'center', if:R },
{ t:'inn', tx:'Deixa.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Escreveu também que ela ri depois, quando já passou, quando acha que não tem ninguém olhando.', if:R },
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
{ t:'nar', tx:'Assinou com as iniciais, porque o nome inteiro num documento daqueles é um risco para quem recebe.', if:R },
{ t:'nar', tx:'Pôs o lugar e o mês. Não pôs o dia.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'O dia não interessa a ninguém.', if:R },

/* A pergunta a Matheo. O Prologo mostrou a pagina; aqui e o gesto. */
{ t:'pause', if:R },
{ t:'nar', tx:'Então ela virou duas folhas em branco e começou outra vez, no alto de uma página limpa.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Escreveu o nome dele. Quando ergueu a pena, a tinta na ponta já tinha secado.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ele leu a ficha da escriba anterior antes de assinar a autorização. Eu sei que leu. Eu vi o protocolo.', if:R },
{ t:'inn', tx:'Faz oito anos que eu não pergunto.', if:R },
{ t:'pause', if:R },

{ t:'arc', key:'arquivo', lns:[
    '“Matheo — se você estiver lendo isto, preciso de uma resposta que não posso pedir de outro jeito.”',
    '“Você sabia?”'
], if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Deixou o resto da página em branco.', if:R },
{ t:'nar', tx:'Foi a única coisa que ela escreveu naquela noite sem calcular se serviria para alguma coisa.', if:R },
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

{ t:'nar', tx:'O céu estava clareando na direção do portão quando ela desceu com o embrulho.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Couro encerado, porque chuva na estrada arruina papel.', if:R },
{ t:'nar', tx:'Sem selo, porque selo diz de onde veio.', if:R },
{ t:'nar', tx:'Cordel escuro, quatro voltas, nó cego. O nó ficou sob o pacote, fora de vista.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Pesava mais do que devia para o tamanho. Ela reparou nisso e achou bom.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'O mensageiro da rota de Alsbeck parava no portão toda quarta antes do sol.', if:R },
{ t:'nar', tx:'Era um homem que não fazia pergunta. Ela conferiu isso no segundo ano e anotou.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela entregou o pacote com as duas mãos.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Isto não vai agora.', if:R },
{ t:'dial', ch:'mensageiro', tx:'Então vai quando, senhora?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Guarda aí. Eu mando notícia toda quarta. Se passar noventa dias sem notícia minha, você leva.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'mensageiro', tx:'E se a senhora mandar notícia?', if:R },
{ t:'dial', ch:'antoniette', tx:'Aí o prazo recomeça.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'mensageiro', tx:'Noventa é muito tempo.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'away', pos:'center', if:R },
{ t:'dial', ch:'antoniette', tx:'É o que dá para eu garantir.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Ela contou as moedas do adiantamento na palma dele, uma a uma, e conferiu duas vezes.', if:R },
{ t:'nar', tx:'Depois disse o endereço em voz alta e pediu que ele repetisse. Ele repetiu certo na segunda.', if:R },
{ t:'pause', if:R },
{ t:'sfx', id:'sfx_footsteps', if:R },
{ t:'nar', tx:'O cavalo saiu andando e ela não esperou recibo.', if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'Pronto.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'O relatório estava despachado. O trabalho estava fechado. Não restava nada em cima da mesa.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela ficou no portão até o sol subir de todo, e não pensou em nada em particular.', if:R },
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

{ t:'fade_out', if:R },
{ t:'bgm', id:null, if:R },
{ t:'end_chap', line1:'Noventa e três dias depois.', line2:'O pacote foi entregue.',
  chapter:'esp11', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.ESP11; }
