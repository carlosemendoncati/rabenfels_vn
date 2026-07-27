/* ==========================================================================
   ARQUIVO RABENFELS - js/data/chapter11.js
   CAPITULO 11: "Noventa Dias"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.
   Tipos de beat documentados em js/engine.js.

   QUANDO: Ano 5, agosto. As quatro horas do Capitulo 10 acabaram.

   O PENSAMENTO UNICO DESTE CAPITULO (Zinsser, unidade):
   "O pacote foi despachado."
   Tudo o que este capitulo faz e levar uma mulher ate o gesto de
   entregar um embrulho a um mensageiro. Nenhuma outra ideia entra.

   A TROCA (docs/estrutura_v1.md):
   Ela ganha o despacho.
   Entrega TUDO. Nao resta nada para trocar depois.

   QUEM AGE: Carmine. Nao para colher, e NAO pelo cronograma.
   Por ciume.

   ------------------------------------------------------------------
   O MOTIVO, E A REGRA QUE O ESCONDE
   ------------------------------------------------------------------
   Carmine e obcecada e nao aceita divisao. Todo pacto, para ela, e
   casamento - uniao de sangue. Quem pactua com ela pertence a ela.
   Por isso ela abomina casamento, amizade profunda, familiar muito
   proximo, outro patrono e divindade: qualquer vinculo importante e
   lido como traicao.

   Klara, sem querer, oferece exatamente o que Carmine quer - a
   capacidade de se entregar inteira a alguem. E aponta isso para
   Antoniette.

   Antoniette morre porque Klara a escolheu.

   >>> RESTRICAO DURA: ANTONIETTE NUNCA DESCOBRIU ISSO. <<<

   Nao esta no Arquivo. Nao pode estar - o Prologo inteiro e Matheo
   lendo o que ela escreveu, e o que ela escreveu esta errado.
   Logo, nesta cena:

   - Carmine NAO explica, NAO ameaca e NAO nomeia o ciume. Ela
     pergunta. As quatro perguntas dela sao sobre o vinculo, nunca
     sobre o plano de fuga, e Antoniette responde todas sem perceber
     por que estao sendo feitas.
   - A teoria do calendario - dezesseis geracoes sem atraso, ela e a
     unica que chegou perto de mover uma data - passa a ser dita por
     ANTONIETTE, em pensamento, e Carmine deixa passar sem confirmar
     nem desmentir. E a conclusao que vai para o Arquivo. E errada.
   - O jogador enxerga porque acompanhou cinco anos de Klara
     escolhendo Antoniette. Horror por acumulacao, nunca por
     afirmacao. Ninguem em cena diz a palavra.
   - O unico vestigio que Antoniette registra e uma ausencia: "Ela nao
     perguntou nada sobre o plano. Nem uma vez." Ela anota na margem
     com um ponto de interrogacao e segue.

   NAO CONSERTAR ISSO EM CAPITULO NENHUM. A obra so funciona se o
   documento que o jogador leu primeiro estiver errado no motivo.

   O FIM: o relogio comeca a contar. A ultima cena deste capitulo E o
   comeco do Prologo. Quem jogou o Prologo ja viu o outro lado deste
   gesto: o mensageiro entregando com as duas maos, sem esperar recibo,
   noventa e tres dias depois.

   ------------------------------------------------------------------
   SEM ESCOLHA, DE PROPOSITO
   ------------------------------------------------------------------
   Terceiro capitulo seguido sem escolha, e e a forma pretendida de um
   final. A agencia do jogador foi gasta no Capitulo 9, onde o beat
   { t:'ending' } fechou a conta. Dar escolha aqui seria oferecer um
   volante depois que o carro ja parou. O que muda no Capitulo 11 nao
   e o que o jogador decide agora - e o que ele decidiu antes, lido de
   volta em voz alta.

   ------------------------------------------------------------------
   NOTA SOBRE A FRASE LONGA
   ------------------------------------------------------------------
   docs/estrutura_v1.md diz "a unica frase longa e desnorteada da obra
   inteira". Existem duas, e o par e deliberado: a do Prologo (P10) e
   de Matheo lendo, a deste capitulo (C11-2) e de Antoniette sendo
   lida. Uma de cada lado do mesmo relogio. As duas tem a mesma forma -
   oracoes emendadas por "e", aritmetica de prazo no meio, e a ultima
   clausula desmontando as anteriores. DIVERGENCIA REGISTRADA: a
   estrutura precisa ser corrigida de "unica" para "as duas".

   ------------------------------------------------------------------
   O NOME
   ------------------------------------------------------------------
   Antoniette passou cinco anos escrevendo "Khar'Vel", codinome que ela
   mesma inventou para uma correspondencia interceptavel.

   >>> KLARA NAO SABE O NOME. KLARA NAO SABE QUE EXISTE ALGUEM. <<<

   Ela so descobre adulta, na Academia, depois de acontecimentos que
   estao fora desta obra. Ate la, para ela, e fome e vazio: um estado,
   nao uma pessoa. Ninguem do outro lado. Nenhuma conversa, nenhum
   pacto sentido como pacto.

   Isso e o que torna o ciume de Carmine insuportavel de ler: e um
   casamento de um lado so, com alguem que nao sabe que casou.

   Consequencia direta no motor da cena: as falas da entidade saem sob
   o rotulo 'voz' - "A voz" - e quem entrega o nome, nas quatro rotas,
   e ela mesma. Cortesia para quem nao vai poder usar. So nesse beat o
   rotulo vira 'carmine'; a caixa de fala e a revelacao, nenhum texto
   anuncia. Trocar 'voz' por 'carmine' antes disso entrega o capitulo
   na primeira linha.

   E por isso que Klara, ao entrar, segue o olhar de Antoniette ate o
   lado vazio da mesa e nao encontra nada. Nao ha nada para ela
   encontrar. NUNCA escrever essa cena com Klara percebendo alguem.

   ------------------------------------------------------------------
   AS QUATRO PAGINAS
   ------------------------------------------------------------------
   O Prologo planta em P2 - "Faltam quatro" - e cobra em P10 - "Tirei
   quatro paginas. Se voce chegar ate elas, vai entender por que. Se
   nao chegar, melhor."
   C11-3 paga. As quatro paginas sao as quatro vezes em que um terceiro
   pagou pelo metodo dela, e sao montadas a partir das flags do proprio
   jogador: hid_from_order (cap. 4), told_klara (cap. 5), lied_to_order
   (cap. 7) e third_paid (cap. 8).
   Cuidado ao mexer: entered_chamber, klara_covered e fenn_debt tem
   valor unico em todas as opcoes que os gravam, entao condicional
   sobre eles e ou sempre verdadeira ou codigo morto. As quatro flags
   usadas aqui sao as que realmente divergem por escolha.
   O jogador ve Antoniette arrancar o registro das escolhas que ele
   fez. Ela conta as paginas para baixo enquanto arranca; Matheo conta
   para cima em P2 e encontra o buraco.
   Elas nao sao queimadas - "se voce chegar ate elas" precisa continuar
   verdadeiro. Vao para dentro do livro-caixa da casa, no lugar de
   quatro folhas em branco. So se chega ate elas entrando em Nidhaus, e
   entrar em Nidhaus e como ela morreu.

   ------------------------------------------------------------------
   CANON APLICADO (docs/biblia_rabenfels.md)
   ------------------------------------------------------------------
   - Carmine e o nome verdadeiro, e ela e uma mulher. Klara so vem a
     saber disso adulta, na Academia - depois desta obra.
   - A entidade nao ameaca e nao se explica. Ela pergunta.
   - Khar'Vel e ausencia: nenhum sprite, nenhuma descricao de rosto.
     O corpo dela na cena e a temperatura do ar, ja plantada no fim
     do Capitulo 10.
   - Klara vai para a Academia depois, por protecao. Antoniette morre
     sem saber disso. O Epilogo e quem conta ao jogador.
   - As palavras mae, filha e amor nao aparecem. Continuam proibidas
     ate o fim, inclusive aqui, inclusive na ultima entrada.

   ------------------------------------------------------------------
   OFICIO APLICADO (docs/estudo/00_indice.md)
   ------------------------------------------------------------------
   - Kenworthy: calma durante o panico. Carmine e cortes o capitulo
     inteiro, e e isso que faz a cena funcionar.
   - Kristoff: o beat de uma palavra, para comprar tempo com quase
     nenhum texto. Aqui e a contagem das paginas.
   - Corbett: o antagonista precisa de uma logica que se sustente
     sozinha. A de Carmine e conjugal. Ela nao esta com fome nem
     atrasada: esta sendo traida, pela regra dela.
   - Frey: a promessa feita no Capitulo 9 e cobrada aqui, com o texto
     que o jogador escolheu.
   - Zinsser: cortar o que a cena anterior ja disse. Este capitulo nao
     recapitula a fuga; comeca depois dela.
   - Lee Child (critica registrada no indice): o risco de o personagem
     virar peca no tabuleiro. A defesa e C11-4 - a ultima entrada e
     dela, escrita por ela, sem ninguem por perto conduzindo.

   Cinco cenas: C11-1 o que restou da noite, C11-2 Carmine,
   C11-3 quatro paginas, C11-4 a ultima entrada, C11-5 noventa dias.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {

RBF.CHAPTER11 = [

{ t:'chap', num:'CAP\u00cdTULO 11', name:'NOVENTA DIAS', chapter:'capitulo11' },
{ t:'fade_out' },

/* ======================================================================
   C11-1 - O QUE RESTOU DA NOITE
   Nao recapitula a fuga. Comeca depois dela, no unico dado que
   interessa: onde ela esta e o que ainda funciona.
   ====================================================================== */
{ t:'scene', id:'c11_restou', chapter:'capitulo11', title:'O que restou da noite',
  bg:'bg_black', bgm:null },
{ t:'fade_in' },

{ t:'nar', tx:'O ar voltou ao normal antes de ela conseguir contar at\u00e9 dez.' },
{ t:'nar', tx:'Foi o \u00fanico aviso que teve de que aquilo tinha acabado.' },
{ t:'pause' },

/* --- rota archive: floresta --- */
{ t:'nar', tx:'Klara estava tr\u00eas passos \u00e0 frente, de costas, com a mala ainda na m\u00e3o.', if:{ ending:'archive' } },
{ t:'nar', tx:'N\u00e3o tinha se movido.', if:{ ending:'archive' } },
{ t:'nar', tx:'A trilha continuava adiante e n\u00e3o havia nada nela.', if:{ ending:'archive' } },

/* --- rota distance: corredor --- */
{ t:'nar', tx:'O corredor estava vazio. A porta do quarto das g\u00eameas, fechada.', if:{ ending:'distance' } },
{ t:'nar', tx:'A mala continuava debaixo da cama dela, feita havia onze dias.', if:{ ending:'distance' } },

/* --- rota early: patio --- */
{ t:'nar', tx:'A porta nordeste estava aberta e o p\u00e1tio, vazio.', if:{ ending:'early' } },
{ t:'nar', tx:'Ningu\u00e9m tinha gritado. Numa casa daquele tamanho, isso significava que ningu\u00e9m precisou.', if:{ ending:'early' } },

/* --- rota cover_burned: o quarto dela --- */
{ t:'nar', tx:'A batida n\u00e3o veio. Ela ficou de p\u00e9 at\u00e9 os p\u00e9s doerem e depois sentou na beira da cama.', if:{ ending:'cover_burned' } },
{ t:'nar', tx:'A mala continuava fechada ao lado. Ela n\u00e3o abriu.', if:{ ending:'cover_burned' } },

{ t:'pause' },

/* ======================================================================
   C11-1b - A VOLTA
   SO NA ROTA DA FUGA.

   Sem esta cena o jogo teleportava: a fuga terminava na floresta e o
   beat seguinte acendia uma vela na biblioteca da casa.

   Nao ha captura e nao ha perseguicao. Klara vira e anda de volta, e
   nao sabe dizer por que - para ela e a fome e o vazio, que vieram na
   hora errada. Antoniette segue porque nao ha versao dela que deixe a
   menina sozinha ali.

   REGRA DO CANON (revelacao 12): ninguem em cena diz o que aconteceu.
   Se alguem enunciar, o horror vira informacao.
   ====================================================================== */
{ t:'scene', id:'c11_volta', chapter:'capitulo11', title:'A volta',
  bg:'bg_grey_march_road', bgm:null, if:{ ending:'archive' } },
{ t:'spr', ch:'klara', ex:'blank', pos:'center', if:{ ending:'archive' } },

{ t:'dial', ch:'antoniette', tx:'Klara. O barco \u00e9 \u00e0s seis.', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },
{ t:'nar', tx:'A menina virou o corpo inteiro, n\u00e3o s\u00f3 a cabe\u00e7a, e olhou para o lado de onde tinham vindo.', if:{ ending:'archive' } },
{ t:'dial', ch:'klara', tx:'Eu preciso voltar.', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },
{ t:'dial', ch:'antoniette', tx:'Por qu\u00ea?', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },
{ t:'nar', tx:'Klara abriu a boca e n\u00e3o veio nada. Ficou assim por um tempo, procurando, e desistiu de procurar.', if:{ ending:'archive' } },
{ t:'dial', ch:'klara', tx:'N\u00e3o sei.', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },
{ t:'dial', ch:'klara', tx:'Est\u00e1 com fome de novo. E aquela outra coisa junto.', if:{ ending:'archive' } },
{ t:'nar', tx:'Foi a explica\u00e7\u00e3o inteira. Ela n\u00e3o tinha outra.', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },

{ t:'nar', tx:'E come\u00e7ou a andar de volta, com a mala ainda na m\u00e3o, no mesmo passo de quem foi.', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },

{ t:'spr', ch:'antoniette', ex:'shaken', pos:'left', if:{ ending:'archive' } },
{ t:'inn', tx:'Segura o bra\u00e7o dela.', if:{ ending:'archive' } },
{ t:'inn', tx:'Levanta e carrega. Ela tem doze anos e trinta e oito quilos.', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },
{ t:'nar', tx:'Antoniette ficou parada na trilha calculando o peso de uma crian\u00e7a e a dist\u00e2ncia at\u00e9 o rio.', if:{ ending:'archive' } },
{ t:'nar', tx:'A conta fechava. Ela fez a conta duas vezes e fechou nas duas.', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },
{ t:'nar', tx:'Depois foi atr\u00e1s dela.', if:{ ending:'archive' } },

{ t:'pause', if:{ ending:'archive' } },
{ t:'nar', tx:'Dois quil\u00f4metros de volta, e nenhuma das duas falou.', if:{ ending:'archive' } },
{ t:'nar', tx:'Passaram a aldeia outra vez. As janelas continuavam fechadas.', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },
{ t:'nar', tx:'Na altura do port\u00e3o Klara devolveu a mala \u00e0 m\u00e3o dela, do jeito que se devolve uma coisa emprestada.', if:{ ending:'archive' } },
{ t:'dial', ch:'klara', tx:'Desculpa.', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o foi voc\u00ea.', if:{ ending:'archive' } },
{ t:'nar', tx:'Ela disse aquilo sem saber o que estava dizendo, e foi a coisa mais verdadeira da noite.', if:{ ending:'archive' } },
{ t:'spr_hide', ch:'klara', if:{ ending:'archive' } },
{ t:'spr_hide', ch:'antoniette', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },

{ t:'nar', tx:'A guarda do port\u00e3o trocava \u00e0s onze e meia e n\u00e3o trocava mais nada at\u00e9 as seis.', if:{ ending:'archive' } },
{ t:'nar', tx:'As duas entraram pelo mesmo caminho por onde tinham sa\u00eddo, e ningu\u00e9m na casa soube que elas tinham sa\u00eddo.', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },
{ t:'inn', tx:'Ningu\u00e9m vai me punir por isto. N\u00e3o houve isto.', if:{ ending:'archive' } },
{ t:'inn', tx:'\u00c9 pior.', if:{ ending:'archive' } },

/* ---- reconverge: as quatro rotas voltam a casa aqui ---- */
{ t:'pause' },
{ t:'nar', tx:'Ela fez o invent\u00e1rio, porque era o que sabia fazer com as m\u00e3os tremendo.' },
{ t:'inn', tx:'Caderno. Chave da biblioteca. Duas velas. Papel para umas quarenta p\u00e1ginas.' },
{ t:'inn', tx:'O bar\u00e3o n\u00e3o vai mandar ningu\u00e9m antes do amanhecer. Ele nunca resolve nada de noite.' },
{ t:'pause' },
{ t:'inn', tx:'Ent\u00e3o tenho at\u00e9 o amanhecer.' },

{ t:'nar', tx:'Foi a \u00faltima previs\u00e3o correta que ela fez.' },

/* ======================================================================
   C11-2 - CARMINE
   A cena central da obra. Nenhum sprite do outro lado: so temperatura,
   cortesia e cronograma. As linhas dela correm como narracao ate o
   nome ser dito.
   ====================================================================== */
{ t:'scene', id:'c11_carmine', chapter:'capitulo11', title:'Carmine',
  bg:'bg_library_night', bgm:'bgm_camara' },
{ t:'spr', ch:'antoniette', ex:'guarded', pos:'center' },

{ t:'nar', tx:'Ela acendeu a segunda vela e a primeira apagou.' },
{ t:'nar', tx:'N\u00e3o havia corrente de ar na biblioteca. Ela conferiu as janelas em mar\u00e7o e anotou.' },
{ t:'pause' },
{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'A segunda vela continuou acesa.' },
{ t:'pause' },

{ t:'dial', ch:'voz', tx:'Voc\u00ea escreve muito depressa para quem escreve \u00e0 m\u00e3o.' },
{ t:'pause' },
{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center' },
{ t:'nar', tx:'A voz vinha da altura errada. Vinha da altura de algu\u00e9m sentado, e n\u00e3o havia cadeira daquele lado.' },
{ t:'pause' },

{ t:'dial', ch:'antoniette', tx:'Khar\u2019Vel.' },
{ t:'pause' },
{ t:'dial', ch:'voz', tx:'Esse n\u00e3o \u00e9 o meu nome. Mas voc\u00ea inventou bem. Serve.' },
{ t:'pause' },
{ t:'dial', ch:'voz', tx:'Sente, por favor. Isto leva alguns minutos e voc\u00ea est\u00e1 de p\u00e9 desde ontem.' },
{ t:'pause' },
{ t:'nar', tx:'Antoniette n\u00e3o sentou.' },
{ t:'dial', ch:'voz', tx:'Como quiser.' },

{ t:'pause' },
{ t:'dial', ch:'voz', tx:'Vim agradecer.' },
{ t:'pause' },
{ t:'spr', ch:'antoniette', ex:'neutral', pos:'center' },
{ t:'dial', ch:'antoniette', tx:'Agradecer.' },
{ t:'dial', ch:'voz', tx:'Cinco anos. Ela l\u00ea mais r\u00e1pido. Corrige adulto sem constranger ningu\u00e9m. Sabe atravessar uma sala que est\u00e1 medindo ela.' },
{ t:'pause' },

/* Cobra o Capitulo 6 com o texto do proprio jogador. */
{ t:'dial', ch:'voz', tx:'E confere fonte. Nunca acredita em uma s\u00f3. Isso foi voc\u00ea.', if:{ taught:'A' } },
{ t:'dial', ch:'voz', tx:'E a forma toda. Postura, protocolo, a etiqueta inteira. Isso foi voc\u00ea.', if:{ taught:'B' } },
{ t:'dial', ch:'voz', tx:'E o mundo inteiro pela biblioteca. Ela sabe o nome de portos onde nunca esteve. Isso foi voc\u00ea.', if:{ taught:'C' } },
{ t:'pause' },

{ t:'dial', ch:'voz', tx:'Eu conhe\u00e7o cada coisa que ela sabe. Sei o dia em que aprendeu cada uma.' },
{ t:'pause' },
{ t:'dial', ch:'voz', tx:'Essas tr\u00eas eu n\u00e3o sei. Essas chegaram por fora.' },
{ t:'pause' },
{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center' },
{ t:'inn', tx:'N\u00e3o.' },
{ t:'pause' },
{ t:'dial', ch:'voz', tx:'Eu n\u00e3o preciso que voc\u00ea concorde. Estou conferindo.' },

{ t:'pause' },
{ t:'dial', ch:'antoniette', tx:'Ent\u00e3o \u00e9 isso. Eu melhorei o que voc\u00ea vai levar.' },
{ t:'pause' },
{ t:'dial', ch:'voz', tx:'\u00c9 isso que voc\u00ea vai escrever.' },
{ t:'pause' },
{ t:'dial', ch:'voz', tx:'E voc\u00ea teria feito de novo.' },
{ t:'pause' },
{ t:'nar', tx:'Antoniette abriu a boca para responder e n\u00e3o achou a frase.' },

/* A frase longa. Uma so. Espelha a de Matheo em P10. */
{ t:'pause' },
{ t:'inn', tx:'Ela pensou no primeiro dia, no invent\u00e1rio da despensa, e em como tinha decidido ser met\u00f3dica porque met\u00f3dico era o \u00fanico jeito de n\u00e3o ser expulsa na primeira semana, e pensou que cinco anos de m\u00e9todo eram mil oitocentos e vinte e sete dias, e que ela tinha usado mil oitocentos e vinte e sete dias para deixar uma crian\u00e7a mais interessante para a coisa que ia com\u00ea-la, e que se tivesse sido desleixada, se tivesse sido burra, se tivesse chegado ali e feito barulho no primeiro m\u00eas e sido posta na estrada em outubro do primeiro ano, Klara estaria hoje assustada, calada e \u00fatil, e viva do mesmo jeito, e o m\u00e9todo dela n\u00e3o teria custado nada a ningu\u00e9m.' },
{ t:'pause' },

{ t:'dial', ch:'voz', tx:'N\u00e3o.' },
{ t:'pause' },
{ t:'dial', ch:'voz', tx:'Estaria viva do mesmo jeito. Voc\u00ea acertou essa parte.' },
{ t:'pause' },

/* As perguntas. Nenhuma delas e sobre o plano. Antoniette responde as
   quatro sem perceber que esta sendo medida por outra regua. */
{ t:'spr', ch:'antoniette', ex:'neutral', pos:'center' },
{ t:'dial', ch:'voz', tx:'Ela te chama de qu\u00ea?' },
{ t:'pause' },
{ t:'nar', tx:'Antoniette levou um tempo para entender que aquilo era pergunta.' },
{ t:'dial', ch:'antoniette', tx:'Senhorita.' },
{ t:'dial', ch:'voz', tx:'Na frente dos outros. E quando n\u00e3o tem ningu\u00e9m.' },
{ t:'pause' },
{ t:'dial', ch:'antoniette', tx:'Senhorita. Nos dois.' },
{ t:'pause' },
{ t:'nar', tx:'A irm\u00e3 dizia Toni desde o primeiro m\u00eas. Klara nunca disse, uma vez sequer, em cinco anos.' },
{ t:'pause' },
{ t:'nar', tx:'A vela n\u00e3o oscilou.' },

{ t:'pause' },
{ t:'dial', ch:'voz', tx:'Quantas vezes ela procurou voc\u00ea sem precisar de nada?' },
{ t:'dial', ch:'antoniette', tx:'Eu n\u00e3o contei.' },
{ t:'pause' },
{ t:'dial', ch:'voz', tx:'Eu contei.' },
{ t:'pause' },

{ t:'spr', ch:'antoniette', ex:'guarded', pos:'center' },
{ t:'dial', ch:'antoniette', tx:'O que isso tem a ver com o cronograma?' },
{ t:'pause' },
{ t:'nar', tx:'A pergunta ficou no ar tempo suficiente para Antoniette achar que tinha acertado.' },
{ t:'pause' },

{ t:'inn', tx:'\u00c9 o calend\u00e1rio.' },
{ t:'inn', tx:'Dezesseis gera\u00e7\u00f5es sem atraso, e eu tenho num caderno as datas e a planta inteira.' },
{ t:'inn', tx:'Sou a \u00fanica coisa nesta casa que chegou perto de mover uma data.' },
{ t:'pause' },
{ t:'nar', tx:'Ela conferiu o racioc\u00ednio duas vezes, do jeito que conferia tudo, e ele fechou nas duas.' },

{ t:'pause' },
{ t:'dial', ch:'voz', tx:'Ela j\u00e1 falou de mim com voc\u00ea?' },
{ t:'pause' },
{ t:'nar', tx:'Antoniette procurou na mem\u00f3ria e n\u00e3o achou uma vez.' },
{ t:'dial', ch:'antoniette', tx:'Ela nunca falou de voc\u00ea. Nenhuma vez em cinco anos.' },
{ t:'pause' },
{ t:'dial', ch:'antoniette', tx:'Ela fala de fome. Fala de um vazio que vem e passa.' },
{ t:'dial', ch:'antoniette', tx:'Nunca falou de ningu\u00e9m do outro lado.' },
{ t:'pause' },
{ t:'dial', ch:'voz', tx:'Eu sei.' },
{ t:'pause' },
{ t:'nar', tx:'Foi a \u00fanica resposta da noite inteira que veio depressa demais.' },

/* ----------------------------------------------------------------------
   Klara entra, e NAO ve ninguem. Ela nao sabe que Carmine existe: so
   descobre adulta, na Academia. Ate la e fome e vazio, sem sujeito.
   Ela vem pela fome e vem procurar Antoniette - que e, pela regra de
   Carmine, a traicao acontecendo na frente dela.
   'klara_na_casa' existe so para nao triplicar cada beat. Na rota
   'early' Klara ja foi levada, e a cena nao acontece.
   ---------------------------------------------------------------------- */
{ t:'flag', set:{ klara_na_casa:true }, if:{ ending:'archive' } },
{ t:'flag', set:{ klara_na_casa:true }, if:{ ending:'distance' } },
{ t:'flag', set:{ klara_na_casa:true }, if:{ ending:'cover_burned' } },

{ t:'pause', if:{ klara_na_casa:true } },
{ t:'sfx', id:'sfx_door', if:{ klara_na_casa:true } },
{ t:'nar', tx:'A porta da biblioteca abriu.', if:{ klara_na_casa:true } },
{ t:'spr', ch:'klara', ex:'blank', pos:'left', if:{ klara_na_casa:true } },
{ t:'nar', tx:'Klara estava de camisola e descal\u00e7a.', if:{ klara_na_casa:true } },
{ t:'pause', if:{ klara_na_casa:true } },
{ t:'dial', ch:'klara', tx:'Est\u00e1 com fome de novo.', if:{ klara_na_casa:true } },
{ t:'pause', if:{ klara_na_casa:true } },
{ t:'nar', tx:'Ela n\u00e3o disse quem. Nunca dizia quem.', if:{ klara_na_casa:true } },
{ t:'nar', tx:'Para ela era uma fome e um vazio, e vinham quando vinham.', if:{ klara_na_casa:true } },
{ t:'pause', if:{ klara_na_casa:true } },
{ t:'dial', ch:'klara', tx:'Posso ficar aqui at\u00e9 passar?', if:{ klara_na_casa:true } },
{ t:'pause', if:{ klara_na_casa:true } },

{ t:'nar', tx:'Antoniette olhou para o lado da mesa onde n\u00e3o havia cadeira.', if:{ klara_na_casa:true } },
{ t:'nar', tx:'Klara seguiu o olhar dela at\u00e9 l\u00e1, e n\u00e3o encontrou nada.', if:{ klara_na_casa:true } },
{ t:'nar', tx:'Voltou os olhos para Antoniette, esperando resposta.', if:{ klara_na_casa:true } },
{ t:'pause', if:{ klara_na_casa:true } },

{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center', if:{ klara_na_casa:true } },
{ t:'dial', ch:'antoniette', tx:'Volta para a cama, Klara.', if:{ klara_na_casa:true } },
{ t:'nar', tx:'Klara voltou.', if:{ klara_na_casa:true } },
{ t:'spr_hide', ch:'klara', if:{ klara_na_casa:true } },
{ t:'pause', if:{ klara_na_casa:true } },
{ t:'nar', tx:'A porta fechou.', if:{ klara_na_casa:true } },
{ t:'pause', if:{ klara_na_casa:true } },
{ t:'nar', tx:'O ar da biblioteca esfriou dois graus e levou um tempo para voltar.', if:{ klara_na_casa:true } },
{ t:'pause', if:{ klara_na_casa:true } },
{ t:'dial', ch:'voz', tx:'Com fome, no meio da noite, ela levantou e veio aqui.', if:{ klara_na_casa:true } },
{ t:'pause', if:{ klara_na_casa:true } },

/* Rota 'early': Klara ja foi. Sobra o quarto vazio do outro lado. */
{ t:'pause', if:{ ending:'early' } },
{ t:'dial', ch:'voz', tx:'O quarto delas est\u00e1 com uma cama a menos desde as duas e dez.', if:{ ending:'early' } },
{ t:'pause', if:{ ending:'early' } },
{ t:'dial', ch:'voz', tx:'A outra continua dormindo. N\u00e3o vai acordar por causa disso.', if:{ ending:'early' } },
{ t:'pause', if:{ ending:'early' } },

/* O nome vem dela mesma, nas quatro rotas. E cortesia para quem nao
   vai poder usar. So aqui o rotulo da caixa de fala muda. */
{ t:'dial', ch:'voz', tx:'Voc\u00ea vai escrever isto. Ent\u00e3o escreva certo.' },
{ t:'pause' },
{ t:'dial', ch:'carmine', tx:'Carmine.' },
{ t:'pause' },
{ t:'nar', tx:'Antoniette tinha passado cinco anos batizando aquilo por conta pr\u00f3pria.' },
{ t:'pause' },
{ t:'inn', tx:'Ela nunca ouviu esse nome. Nem uma vez em doze anos de vida.' },
{ t:'pause' },
{ t:'inn', tx:'E eu ouvi hoje.' },

/* A promessa do Capitulo 9, cobrada. */
{ t:'pause' },
{ t:'dial', ch:'carmine', tx:'Voc\u00ea prometeu alguma coisa a ela em fevereiro.' },
{ t:'pause' },
{ t:'spr', ch:'antoniette', ex:'guarded', pos:'center' },
{ t:'dial', ch:'antoniette', tx:'Eu mostrei o caderno. N\u00e3o prometi nada.', if:{ promised:'A' } },
{ t:'dial', ch:'antoniette', tx:'Eu prometi.', if:{ promised:'B' } },
{ t:'dial', ch:'antoniette', tx:'Eu dei uma data.', if:{ promised:'C' } },
{ t:'pause' },
{ t:'dial', ch:'carmine', tx:'Ela entendeu como promessa.', if:{ promised:'A' } },
{ t:'dial', ch:'carmine', tx:'Inteiro, sem qualificar. Ela repetiu para a irm\u00e3 na mesma noite.', if:{ promised:'B' } },
{ t:'dial', ch:'carmine', tx:'Agosto, antes do dia dez. Ela contou os dias no calend\u00e1rio da cozinha. Riscando.', if:{ promised:'C' } },
{ t:'pause' },
{ t:'dial', ch:'carmine', tx:'Hoje \u00e9 dia dez.' },
{ t:'pause' },
{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center' },
{ t:'pause' },
{ t:'dial', ch:'carmine', tx:'Ela acreditou em voc\u00ea.' },
{ t:'pause' },
{ t:'nar', tx:'N\u00e3o houve reprova\u00e7\u00e3o nenhuma na frase. Foi dita como quem confere um n\u00famero que j\u00e1 sabia.' },

{ t:'pause' },
{ t:'dial', ch:'antoniette', tx:'O que voc\u00ea quer.' },
{ t:'dial', ch:'carmine', tx:'Que voc\u00ea pare.' },
{ t:'pause' },
{ t:'dial', ch:'carmine', tx:'N\u00e3o \u00e9 pedido. Estou avisando com anteced\u00eancia porque \u00e9 mais limpo assim.' },
{ t:'nar', tx:'A vela n\u00e3o oscilou uma vez durante a conversa inteira.' },
{ t:'pause' },
{ t:'dial', ch:'carmine', tx:'Voc\u00ea tem at\u00e9 o amanhecer.' },
{ t:'pause' },
{ t:'nar', tx:'Ela tinha chegado sozinha \u00e0quela mesma conta, tr\u00eas horas antes.' },

{ t:'pause' },
{ t:'dial', ch:'antoniette', tx:'Por que me avisar?' },
{ t:'pause' },
{ t:'dial', ch:'carmine', tx:'Porque quem \u00e9 avisado arruma as coisas. Quem n\u00e3o \u00e9 deixa papel espalhado pela casa.' },
{ t:'pause' },
{ t:'dial', ch:'carmine', tx:'Boa noite, escriba.' },
{ t:'pause' },

{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'A vela apagou e acendeu de novo.' },
{ t:'nar', tx:'Antoniette ficou olhando para a cadeira que n\u00e3o existia daquele lado da mesa.' },
{ t:'pause' },
{ t:'inn', tx:'Ela n\u00e3o perguntou nada sobre o plano.' },
{ t:'pause' },
{ t:'inn', tx:'Nem uma vez.' },
{ t:'pause' },
{ t:'nar', tx:'Ela anotou aquilo na margem, com um ponto de interroga\u00e7\u00e3o, e passou para o assunto seguinte.' },
{ t:'pause' },
{ t:'inn', tx:'Ela quer que eu arrume.' },
{ t:'pause' },
{ t:'spr', ch:'antoniette', ex:'neutral', pos:'center' },
{ t:'inn', tx:'Ent\u00e3o eu arrumo.' },

/* ======================================================================
   C11-3 - QUATRO PAGINAS
   Paga o "Faltam quatro" do Prologo. Contagem regressiva enquanto ela
   arranca; Matheo conta para cima em P2 e encontra o buraco.
   ====================================================================== */
{ t:'scene', id:'c11_paginas', chapter:'capitulo11', title:'Quatro p\u00e1ginas',
  bg:'bg_archive_closeup', bgm:'bgm_archive' },
{ t:'spr', ch:'antoniette', ex:'away', pos:'center' },

{ t:'nar', tx:'Ela escreveu at\u00e9 as tr\u00eas e meia sem parar para reler.' },
{ t:'nar', tx:'Duzentas e noventa e uma p\u00e1ginas numeradas, cinco anos, tudo o que servia.' },
{ t:'pause' },
{ t:'nar', tx:'\u00c0s tr\u00eas e meia ela parou e voltou ao come\u00e7o.' },
{ t:'inn', tx:'Se algu\u00e9m usar isto, vai usar contra a casa.' },
{ t:'inn', tx:'E vai ler tudo. Inclusive o que eu fiz.' },
{ t:'pause' },

{ t:'nar', tx:'Ela abriu na primeira e passou o polegar pela dobra interna.' },
{ t:'sfx', id:'sfx_page_turn' },

{ t:'nar', tx:'A p\u00e1gina de outubro do primeiro ano. O que ela viu no p\u00e1tio e n\u00e3o mandou para a Ordem.', if:{ hid_from_order:true } },
{ t:'nar', tx:'A p\u00e1gina de outubro do primeiro ano. O que ela mandou para a Ordem, e o que a Ordem arquivou sem responder.', if:{ hid_from_order:false } },
{ t:'inn', tx:'Tr\u00eas.' },
{ t:'pause' },

{ t:'nar', tx:'A p\u00e1gina da c\u00e2mara. Ela desceu, viu, e subiu com uma crian\u00e7a de nove anos cobrindo a aus\u00eancia dela no andar de cima.' },
{ t:'nar', tx:'Na margem, o que ela respondeu a Klara depois: nada. Deixou fechar sozinho.', if:{ told_klara:'A' } },
{ t:'nar', tx:'Na margem, o que ela respondeu a Klara depois: uma vers\u00e3o limpa, feita para a menina n\u00e3o ter de carregar aquilo.', if:{ told_klara:'B' } },
{ t:'nar', tx:'Na margem, o que ela respondeu a Klara depois: a verdade, e um pedido para n\u00e3o repetir.', if:{ told_klara:'C' } },
{ t:'inn', tx:'Duas.' },
{ t:'pause' },

{ t:'nar', tx:'A p\u00e1gina de agosto do terceiro ano.' },
{ t:'nar', tx:'O relat\u00f3rio inteiro, com o que ela viu subir. Lervel recebeu tudo e respondeu em nove semanas mandando continuar observando.', if:{ lied_to_order:'A' } },
{ t:'nar', tx:'O relat\u00f3rio com o epis\u00f3dio dado como de natureza indeterminada, sem testemunha direta. Ela foi a testemunha direta.', if:{ lied_to_order:'B' } },
{ t:'nar', tx:'A p\u00e1gina em que agosto n\u00e3o existe. Lervel recebeu o m\u00eas sem o m\u00eas dentro.', if:{ lied_to_order:'C' } },
{ t:'inn', tx:'Uma.' },
{ t:'pause' },

{ t:'nar', tx:'A p\u00e1gina de Fenn.' },
{ t:'nar', tx:'Ela leu duas vezes antes de arrancar.' },
{ t:'nar', tx:'Estava tudo certo ali. Datas conferidas, valores conferidos, a d\u00edvida quitada num s\u00e1bado. Nada errado na p\u00e1gina.' },
{ t:'nar', tx:'Um homem foi \u00fatil a ela e ela negaria a fonte se perguntassem. Isso n\u00e3o cabia em coluna nenhuma.', if:{ third_paid:'A' } },
{ t:'nar', tx:'Ela comprou o nome para levar a Lervel, e o nome era de um homem vivo. Isso n\u00e3o cabia em coluna nenhuma.', if:{ third_paid:'B' } },
{ t:'nar', tx:'Ela recusou o nome e mandou o rapaz embora no mesmo dia. Ficou sem a prova e nunca soube se o menino chegou.', if:{ third_paid:'C' } },
{ t:'pause' },
{ t:'inn', tx:'Nenhuma.' },
{ t:'pause' },

{ t:'nar', tx:'Quatro folhas na m\u00e3o esquerda. Duzentas e oitenta e sete no ma\u00e7o.' },
{ t:'inn', tx:'A numera\u00e7\u00e3o vai continuar terminando em duzentos e noventa e um.' },
{ t:'inn', tx:'Quem contar vai ver.' },
{ t:'pause' },
{ t:'spr', ch:'antoniette', ex:'guarded', pos:'center' },
{ t:'inn', tx:'Bom. Que veja.' },

{ t:'pause' },
{ t:'nar', tx:'Ela desceu ao escrit\u00f3rio do bar\u00e3o com as quatro p\u00e1ginas e a chave que copiou no segundo ano.' },
{ t:'nar', tx:'O livro-caixa da casa tinha quatro folhas em branco no fim, como todo livro-caixa tem.' },
{ t:'nar', tx:'Ela p\u00f4s as quatro p\u00e1ginas no lugar delas e fechou a fivela.' },
{ t:'pause' },
{ t:'inn', tx:'Se algu\u00e9m entrar nesta casa, entra por aqui. Sempre entra por aqui.' },
{ t:'pause' },
{ t:'nar', tx:'Subiu. Faltava uma hora e quarenta para o amanhecer.' },

/* ======================================================================
   C11-4 - A ULTIMA ENTRADA
   O texto que o Prologo citou em P10. Aqui ele esta sendo escrito, e o
   jogador ja sabe onde ele vai parar.
   ====================================================================== */
{ t:'scene', id:'c11_ultima', chapter:'capitulo11', title:'A \u00faltima entrada',
  bg:'bg_antoniette_room', bgm:null },
{ t:'spr', ch:'antoniette', ex:'away', pos:'center' },

{ t:'nar', tx:'Ela molhou a pena e n\u00e3o escreveu.' },
{ t:'nar', tx:'A caligrafia continuou firme quando finalmente saiu. O espa\u00e7amento n\u00e3o.' },
{ t:'pause' },

{ t:'arc', key:'arquivo', lns:[
    '\u201cPara quem encontrar isto.\u201d',
    '\u201cN\u00e3o sei seu nome. Tanto faz.\u201d'
]},
{ t:'pause' },

{ t:'inn', tx:'Escreve o que serve. Ningu\u00e9m l\u00ea lamento.' },
{ t:'nar', tx:'Ela escreveu a idade, a velocidade de leitura e o jeito de corrigir os outros em voz baixa.' },
{ t:'pause' },
{ t:'nar', tx:'Parou.' },
{ t:'pause' },
{ t:'inn', tx:'Isso n\u00e3o \u00e9 informa\u00e7\u00e3o operacional.' },
{ t:'pause' },
{ t:'spr', ch:'antoniette', ex:'soft', pos:'center' },
{ t:'inn', tx:'Deixa.' },
{ t:'pause' },
{ t:'nar', tx:'Escreveu tamb\u00e9m que ela ri depois, quando j\u00e1 passou, quando acha que n\u00e3o tem ningu\u00e9m olhando.' },
{ t:'nar', tx:'Isso tamb\u00e9m n\u00e3o servia para nada. Ficou.' },

{ t:'pause' },
{ t:'nar', tx:'Depois escreveu as tr\u00eas linhas que custaram mais do que as duzentas e oitenta e sete p\u00e1ginas juntas.' },
{ t:'arc', key:'arquivo', lns:[
    '\u201cTentei tir\u00e1-la daqui.\u201d',
    '\u201cFui met\u00f3dica. Fui devagar.\u201d',
    '\u201cFoi o devagar que custou.\u201d'
]},
{ t:'pause' },

{ t:'nar', tx:'E a linha das quatro p\u00e1ginas, para quem contasse.' },
{ t:'arc', key:'arquivo', lns:[
    '\u201cTirei quatro p\u00e1ginas. Se voc\u00ea chegar at\u00e9 elas, vai entender por qu\u00ea.\u201d',
    '\u201cSe n\u00e3o chegar, melhor.\u201d'
]},
{ t:'pause' },

{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center' },
{ t:'nar', tx:'Assinou com as iniciais, porque o nome inteiro num documento daqueles \u00e9 um risco para quem recebe.' },
{ t:'nar', tx:'P\u00f4s o lugar e o m\u00eas. N\u00e3o p\u00f4s o dia.' },
{ t:'pause' },
{ t:'inn', tx:'O dia n\u00e3o interessa a ningu\u00e9m.' },

/* A pergunta a Matheo. O Prologo mostrou a pagina; aqui e o gesto. */
{ t:'pause' },
{ t:'nar', tx:'Ent\u00e3o ela virou duas folhas em branco e come\u00e7ou outra vez, no alto de uma p\u00e1gina limpa.' },
{ t:'pause' },
{ t:'nar', tx:'Escreveu o nome dele. Depois parou por tempo suficiente para a tinta secar na pena.' },
{ t:'pause' },
{ t:'inn', tx:'Ele leu a ficha da escriba anterior antes de assinar a autoriza\u00e7\u00e3o. Eu sei que leu. Eu vi o protocolo.' },
{ t:'inn', tx:'Faz oito anos que eu n\u00e3o pergunto.' },
{ t:'pause' },

{ t:'arc', key:'arquivo', lns:[
    '\u201cMatheo \u2014 se voc\u00ea estiver lendo isto, preciso de uma resposta que n\u00e3o posso pedir de outro jeito.\u201d',
    '\u201cVoc\u00ea sabia?\u201d'
]},
{ t:'pause' },

{ t:'nar', tx:'Deixou o resto da p\u00e1gina em branco.' },
{ t:'nar', tx:'Foi a \u00fanica coisa que ela escreveu naquela noite sem calcular se serviria para alguma coisa.' },
{ t:'pause' },
{ t:'spr_hide', ch:'antoniette' },

/* ======================================================================
   C11-5 - NOVENTA DIAS
   O comeco do Prologo, visto do outro lado. Nada aqui pode contradizer
   P1: couro encerado, cordel escuro em quatro voltas, no cego, sem
   selo, mais pesado do que devia, e a letra miuda e controlada.
   ====================================================================== */
{ t:'scene', id:'c11_noventa', chapter:'capitulo11', title:'Noventa dias',
  bg:'bg_nidhaus_gate', bgm:'bgm_prologue' },
{ t:'fade_in' },
{ t:'spr', ch:'antoniette', ex:'neutral', pos:'center' },

{ t:'nar', tx:'O c\u00e9u estava clareando na dire\u00e7\u00e3o do port\u00e3o quando ela desceu com o embrulho.' },
{ t:'pause' },
{ t:'nar', tx:'Couro encerado, porque chuva na estrada arruina papel.' },
{ t:'nar', tx:'Sem selo, porque selo diz de onde veio.' },
{ t:'nar', tx:'Cordel em quatro voltas e um n\u00f3 cego, do jeito que se amarra o que n\u00e3o deve abrir sozinho na estrada.' },
{ t:'pause' },
{ t:'nar', tx:'Pesava mais do que devia para o tamanho. Ela reparou nisso e achou bom.' },

{ t:'pause' },
{ t:'nar', tx:'O mensageiro da rota de Alsbeck parava no port\u00e3o toda quarta antes do sol.' },
{ t:'nar', tx:'Era um homem que n\u00e3o fazia pergunta. Ela conferiu isso no segundo ano e anotou.' },
{ t:'pause' },

{ t:'nar', tx:'Ela entregou o pacote com as duas m\u00e3os.' },
{ t:'pause' },
{ t:'dial', ch:'antoniette', tx:'Isto n\u00e3o vai agora.' },
{ t:'dial', ch:'mensageiro', tx:'Ent\u00e3o vai quando, senhora?' },
{ t:'pause' },
{ t:'dial', ch:'antoniette', tx:'Guarda a\u00ed. Eu mando not\u00edcia toda quarta. Se passar noventa dias sem not\u00edcia minha, voc\u00ea leva.' },
{ t:'pause' },
{ t:'dial', ch:'mensageiro', tx:'E se a senhora mandar not\u00edcia?' },
{ t:'dial', ch:'antoniette', tx:'A\u00ed o prazo recome\u00e7a.' },
{ t:'pause' },
{ t:'dial', ch:'mensageiro', tx:'Noventa \u00e9 muito tempo.' },
{ t:'pause' },
{ t:'spr', ch:'antoniette', ex:'away', pos:'center' },
{ t:'dial', ch:'antoniette', tx:'\u00c9 o que d\u00e1 para eu garantir.' },

{ t:'pause' },
{ t:'nar', tx:'Ela contou as moedas do adiantamento na palma dele, uma a uma, e conferiu duas vezes.' },
{ t:'nar', tx:'Depois disse o endere\u00e7o em voz alta e pediu que ele repetisse. Ele repetiu certo na segunda.' },
{ t:'pause' },
{ t:'sfx', id:'sfx_footsteps' },
{ t:'nar', tx:'O cavalo saiu andando e ela n\u00e3o esperou recibo.' },
{ t:'pause' },

{ t:'inn', tx:'Pronto.' },
{ t:'pause' },
{ t:'nar', tx:'O relat\u00f3rio estava despachado. O trabalho estava fechado. N\u00e3o restava nada em cima da mesa.' },
{ t:'pause' },
{ t:'nar', tx:'Ela ficou no port\u00e3o at\u00e9 o sol subir de todo, e n\u00e3o pensou em nada em particular.' },
{ t:'pause' },
{ t:'nar', tx:'Depois voltou para dentro, porque \u00e0s sete ela abria a biblioteca.' },
{ t:'spr_hide', ch:'antoniette' },
{ t:'pause' },

{ t:'nar', tx:'A partir daquela quarta-feira, o mensageiro esperou.' },
{ t:'pause' },
{ t:'nar', tx:'Noventa dias.' },
{ t:'pause' },
{ t:'nar', tx:'Ele entregou no nonag\u00e9simo terceiro. Levou tr\u00eas dias a mais porque a estrada de Alsbeck alaga em novembro, e ele n\u00e3o achou que tr\u00eas dias fizessem diferen\u00e7a.' },
{ t:'pause' },

/* ======================================================================
   C11-6 - O QUE ACONTECEU COM ELA
   Quatro destinos. Em duas rotas ela morre; em duas ela vive, e o ponto
   morto dispara por silencio, nao por morte.
   Nenhuma morte acontece em cena. O que a obra mostra e o formulario.
   ====================================================================== */
{ t:'fade_out' },
{ t:'scene', id:'c11_depois', chapter:'capitulo11', title:'Depois',
  bg:'bg_black', bgm:null },

/* --- ARCHIVE: morre no prazo que Carmine deu ------------------------- */
{ t:'nar', tx:'O sol subiu de todo \u00e0s cinco e dez. \u00c0s sete ela abriu a biblioteca, porque \u00e0s sete ela abria a biblioteca.', if:{ ending:'archive' } },
{ t:'nar', tx:'Ren chegou \u00e0s sete e vinte e encontrou a porta aberta e a sala vazia.', if:{ ending:'archive' } },
{ t:'nar', tx:'Esperou uma hora antes de perguntar a algu\u00e9m, porque n\u00e3o era da conta dele perguntar.', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },
{ t:'nar', tx:'A casa registrou a baixa no livro de pessoal no dia seguinte, na letra do escritur\u00e1rio.', if:{ ending:'archive' } },

/* --- EARLY: morre sem as quatro horas -------------------------------- */
{ t:'nar', tx:'O quarto das g\u00eameas ficou com uma cama a menos, e a casa n\u00e3o mudou o hor\u00e1rio da copa.', if:{ ending:'early' } },
{ t:'nar', tx:'Ela escreveu o Arquivo em quatro noites, documentando uma coisa que j\u00e1 tinha acontecido.', if:{ ending:'early' } },
{ t:'pause', if:{ ending:'early' } },
{ t:'nar', tx:'Na quinta noite n\u00e3o escreveu.', if:{ ending:'early' } },
{ t:'nar', tx:'A casa registrou a baixa no livro de pessoal na mesma semana, na letra do escritur\u00e1rio.', if:{ ending:'early' } },

/* --- as tres palavras, so nas rotas em que ela morre ---------------- */
{ t:'pause', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'early' } },
{ t:'arc', key:'ficha', label:'\u2014 Velha Nidhaus \u00b7 livro de pessoal \u2014', lns:[
    'VAEL, Antoniette. Catalogadora contratada.',
    'Admiss\u00e3o: abril, ano um. Baixa: agosto, ano cinco.',
    '',
    'Motivo de sa\u00fade.'
], if:{ ending:'archive' } },
{ t:'arc', key:'ficha', label:'\u2014 Velha Nidhaus \u00b7 livro de pessoal \u2014', lns:[
    'VAEL, Antoniette. Catalogadora contratada.',
    'Admiss\u00e3o: abril, ano um. Baixa: agosto, ano cinco.',
    '',
    'Motivo de sa\u00fade.'
], if:{ ending:'early' } },
{ t:'nar', tx:'Tr\u00eas palavras, na mesma letra de trinta e sete anos antes.', if:{ ending:'archive' } },
{ t:'nar', tx:'Tr\u00eas palavras, na mesma letra de trinta e sete anos antes.', if:{ ending:'early' } },
{ t:'nar', tx:'Matheo tinha lido aquela linha uma semana antes de assinar a autoriza\u00e7\u00e3o dela.', if:{ ending:'archive' } },
{ t:'nar', tx:'Matheo tinha lido aquela linha uma semana antes de assinar a autoriza\u00e7\u00e3o dela.', if:{ ending:'early' } },

/* --- DISTANCE: ela vive, e e o pior ---------------------------------- */
{ t:'nar', tx:'O contrato terminou em setembro. Ela desceu com as mesmas duas malas e o mesmo ba\u00fa de ferramentas.', if:{ ending:'distance' } },
{ t:'nar', tx:'Fenn levou a bagagem at\u00e9 o port\u00e3o e disse nove palavras.', if:{ ending:'distance' } },
{ t:'pause', if:{ ending:'distance' } },
{ t:'nar', tx:'A Ordem leu o relat\u00f3rio dela, achou completo, e recolheu o agente do campo.', if:{ ending:'distance' } },
{ t:'nar', tx:'Recolher um agente inclui suspender a correspond\u00eancia particular dele por prazo indeterminado.', if:{ ending:'distance' } },
{ t:'pause', if:{ ending:'distance' } },
{ t:'inn', tx:'Noventa dias sem not\u00edcia minha, e o pacote sai.', if:{ ending:'distance' } },
{ t:'inn', tx:'Eu montei esse mecanismo. Eu sei exatamente como ele funciona.', if:{ ending:'distance' } },
{ t:'pause', if:{ ending:'distance' } },
{ t:'nar', tx:'Ela contou os noventa dias de dentro de Lervel, num alojamento a tr\u00eas ruas do gabinete dele.', if:{ ending:'distance' } },
{ t:'nar', tx:'No nonag\u00e9simo terceiro sentou na cama e ficou olhando a parede, porque sabia o que estava acontecendo naquela hora.', if:{ ending:'distance' } },

/* --- COVER_BURNED: ela vive, demitida ------------------------------- */
{ t:'nar', tx:'O contrato foi encerrado com dois meses de aviso pagos e uma carta de refer\u00eancia correta.', if:{ ending:'cover_burned' } },
{ t:'nar', tx:'Serafina desejou boa viagem, e desejou de verdade.', if:{ ending:'cover_burned' } },
{ t:'pause', if:{ ending:'cover_burned' } },
{ t:'nar', tx:'Ela escreveu o Arquivo em nove noites, num quarto alugado em Marca Cinzenta, com o que tinha na mem\u00f3ria e no caderno de baixo do forro.', if:{ ending:'cover_burned' } },
{ t:'nar', tx:'Duzentas e quarenta e uma p\u00e1ginas. Faltava metade das plantas e todos os hor\u00e1rios de guarda depois de julho.', if:{ ending:'cover_burned' } },
{ t:'pause', if:{ ending:'cover_burned' } },
{ t:'nar', tx:'Despachou assim mesmo, com o mesmo prazo de noventa dias, e n\u00e3o escreveu a ningu\u00e9m nesse per\u00edodo.', if:{ ending:'cover_burned' } },
{ t:'inn', tx:'Se eu escrever, ele vai achar que est\u00e1 tudo bem e n\u00e3o vai abrir.', if:{ ending:'cover_burned' } },
{ t:'inn', tx:'Ele precisa abrir.', if:{ ending:'cover_burned' } },

{ t:'pause' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Agosto do quinto ano.', line2:'O pacote foi despachado.',
  chapter:'capitulo11' },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.CHAPTER11; }
