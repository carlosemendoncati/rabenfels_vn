/* ==========================================================================
   ARQUIVO RABENFELS - js/gallery.js

   Galeria e extras.

   Nada aqui e liberado para demonstracao. Cada entrada tem uma condicao
   verificada contra o progresso real gravado em RBF.STORAGE.keys.progress
   e contra o estado da partida em andamento:

     bg:<id>       o jogador esteve em uma cena com aquele background
     arc:<chave>   o jogador leu aquele cartao do Arquivo
     chapter:<id>  o capitulo foi alcancado
     done:<id>     o capitulo foi concluido
     route:<id>    a rota chegou ao valor pedido

   O registro de itens vistos e gravado pelo engine durante a partida, o
   que significa que a galeria reflete o que foi realmente lido, e nao o
   que existe no roteiro.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.Gallery = (function () {
  'use strict';

  /* ---- catalogo ---------------------------------------------------------
     Declarativo. Adicionar item novo e acrescentar uma linha; a condicao
     de liberacao acompanha o item.                                       */

  var CATALOG = [
    /* --- cenarios --- */
    { id: 'bg_prologue_room',   cat: 'cg',  name: 'O escrit\u00f3rio de Matheo',    need: 'bg:bg_prologue_room' },
    { id: 'bg_archive_closeup', cat: 'cg',  name: 'O Arquivo sobre a mesa',        need: 'bg:bg_archive_closeup' },
    { id: 'bg_grey_march_road', cat: 'cg',  name: 'A estrada da Marca Cinzenta',   need: 'bg:bg_grey_march_road' },
    { id: 'bg_nidhaus_gate',    cat: 'cg',  name: 'O port\u00e3o de Velha Nidhaus', need: 'bg:bg_nidhaus_gate' },
    { id: 'bg_main_hall',       cat: 'cg',  name: 'O sal\u00e3o principal',         need: 'bg:bg_main_hall' },
    { id: 'bg_antoniette_room', cat: 'cg',  name: 'O quarto de Antoniette',        need: 'bg:bg_antoniette_room' },
    { id: 'bg_library',         cat: 'cg',  name: 'A biblioteca',                  need: 'bg:bg_library' },
    { id: 'bg_library_night',   cat: 'cg',  name: 'A biblioteca \u00e0 noite',      need: 'bg:bg_library_night' },
    { id: 'bg_corridor',        cat: 'cg',  name: 'O corredor leste',              need: 'bg:bg_corridor' },
    { id: 'bg_portrait_hall',   cat: 'cg',  name: 'A galeria de retratos',         need: 'bg:bg_portrait_hall' },
    { id: 'bg_kitchen',         cat: 'cg',  name: 'A copa',                        need: 'bg:bg_kitchen' },

    /* --- fichas de personagem ---------------------------------------------
       As fichas sao o dossie do Compilador, e por isso crescem.
       'need' decide se a ficha aparece na galeria.
       'entries' sao as entradas dela: cada uma tem condicao propria e so
       aparece quando o jogador tiver de fato lido ou vivido aquilo. As
       que faltam ficam visiveis como lacuna, para o jogador saber que ha
       mais a encontrar.
       Ordem = ordem de descoberta, nunca ordem de importancia.        */

    { id: 'ch_antoniette', cat: 'char', name: 'Antoniette Vael',
      need: 'chapter:capitulo1', portrait: 'antoniette.png',
      text: 'Arquivista de campo. O dossi\u00ea dela cabe em quatro linhas e nenhuma delas explica o resto.',
      entries: [
      { need: 'chapter:capitulo1', tx: 'Arquivista da Ordem dos Olhos Cinzentos. Recrutada aos dezessete anos. Chegou a Velha Nidhaus aos vinte, sob cobertura de catalogadora contratada.' },
      { need: 'arc:caderno',       tx: 'M\u00e9todo: registra tudo, inclusive o que ela pr\u00f3pria classifica como sem valor operacional.' },
      { need: 'bg:bg_corridor',    tx: 'Come em p\u00e9. N\u00e3o senta para isso. Nada no dossi\u00ea explica.' },
      { need: 'arc:sem_identificacao', tx: 'Mant\u00e9m um segundo caderno, sem data e sem cabe\u00e7alho, debaixo do forro do ba\u00fa.' },
      { need: 'done:capitulo6',    tx: 'Trabalha de costas para a parede. Puxou a cadeira para o lado da janela na primeira noite e nunca mais mudou.' },
      { need: 'arc:ultima',        tx: 'Velha Nidhaus, agosto.' },
      { need: 'done:epilogo',      tx: 'O tique: come em p\u00e9 porque na Ordem se come em p\u00e9, e na Ordem se come em p\u00e9 porque quem senta demora. Ela levou o h\u00e1bito para uma casa onde ningu\u00e9m tinha pressa e nunca reparou que era o \u00fanico gesto dela que n\u00e3o servia para nada ali.' },
      { need: 'done:epilogo',      tx: 'O medo: n\u00e3o \u00e9 morrer. \u00c9 que o registro dela seja lido e n\u00e3o sirva. Ela morreu sem saber que ia acontecer exatamente isso, e que a causa seria uma decis\u00e3o dela.' },
      { need: 'done:epilogo',      tx: 'A contradi\u00e7\u00e3o: m\u00e9todo extremo e a \u00fanica coisa que ela n\u00e3o conseguiu classificar foi o que sentia por uma crian\u00e7a. Registrou como "sem valor operacional" e deixou na p\u00e1gina.' },
      { need: 'done:epilogo',      tx: 'O que sobra dela: duzentas e oitenta e sete p\u00e1ginas numeradas, uma asa prensada na dobra e uma pergunta de duas palavras com o resto da p\u00e1gina em branco.' }
    ]},

    { id: 'ch_matheo', cat: 'char', name: 'Matheo Drell',
      need: 'chapter:prologo', portrait: 'matheo.png',
      text: 'Arquivista. Assinou a autoriza\u00e7\u00e3o de campo dela e passou os oito anos seguintes achando que isso tinha sido uma decis\u00e3o administrativa.',
      entries: [
      { need: 'chapter:prologo',   tx: 'Superior direto de Antoniette. Oito anos de rela\u00e7\u00e3o profissional.' },
      { need: 'arc:compilador',    tx: 'Ensinou a ela a voz do Compilador. Terceira pessoa do come\u00e7o ao fim, nunca "eu". \u00c9 o que a Ordem ensina.' },
      { need: 'arc:ultima',        tx: 'Assinou a autoriza\u00e7\u00e3o de campo em quarenta minutos e n\u00e3o releu o dossi\u00ea.' },
      { need: 'done:prologo',      tx: 'Tinha aberto a ficha da escriba de Lervel uma semana antes de assinar.' },
      { need: 'done:epilogo',      tx: 'O tique: conta as p\u00e1ginas de qualquer documento novo antes de ler a primeira. Faz isso desde os vinte anos e n\u00e3o sabe explicar por qu\u00ea.' },
      { need: 'done:epilogo',      tx: 'O medo: ser o tipo de homem que assina. Ele leu a ficha da escriba anterior, entendeu o que ela significava, e assinou mesmo assim \u2014 e a \u00fanica pessoa que podia perguntar isso a ele morreu deixando o espa\u00e7o da resposta em branco.' },
      { need: 'done:epilogo',      tx: 'O que ele fez depois: protocolou, sustentou, recorreu duas vezes. Fez tudo certo. Foi indeferido por falta das quatro p\u00e1ginas que ela arrancou para proteger a menina.' },
      { need: 'done:epilogo',      tx: 'O que sobra dele: um alerta permanente num cadastro, que levou seis anos para disparar e trouxe duas matr\u00edculas de faculdade.' }
    ]},

    { id: 'ch_serafina', cat: 'char', name: 'Serafina Rabenfels',
      need: 'bg:bg_main_hall', portrait: 'serafina.png',
      text: 'Senhora de Velha Nidhaus. Casou-se com a casa, n\u00e3o com o homem, e administra o que herdou com o cuidado de quem escolheu.',
      entries: [
      { need: 'bg:bg_main_hall',   tx: 'Senhora de Velha Nidhaus. Controle social excepcional.' },
      { need: 'bg:bg_main_hall',   tx: 'L\u00ea um documento at\u00e9 parar de encontrar coisa nova nele.' },
      { need: 'chapter:capitulo2', tx: 'Duas palavras para a filha. Vinte para a preceptora.' },
      { need: 'done:capitulo2',    tx: 'Escolheu para a h\u00f3spede o quarto de onde se v\u00ea a porta nordeste inteira.' },
      { need: 'done:capitulo8',    tx: 'Escreveu a Lervel no segundo m\u00eas de Antoniette na casa, para conferir as refer\u00eancias. A resposta veio em nove dias.' },
      { need: 'done:epilogo',      tx: 'O tique: agradece. Agradece o trabalho, agradece a companhia, agradece o que est\u00e1 sendo feito com a filha dela. \u00c9 sincera nas tr\u00eas coisas.' },
      { need: 'done:epilogo',      tx: 'O medo: que a filha morra sabendo. N\u00e3o que morra \u2014 isso ela aceitou antes de a menina nascer. Que morra sabendo o que os pais s\u00e3o.' },
      { need: 'done:epilogo',      tx: 'A contradi\u00e7\u00e3o: \u00e9 a pessoa mais calorosa da casa e a \u00fanica que nunca teve d\u00favida. Ela n\u00e3o obedece ao pacto por medo nem por h\u00e1bito. Ela concorda com ele.' },
      { need: 'done:epilogo',      tx: 'O que sobra dela: uma casa sem uma linha fora do lugar, e a assinatura no formul\u00e1rio que manda as duas filhas para o melhor lugar do mundo para amadurecer mana.' }
    ]},

    { id: 'ch_aldric', cat: 'char', name: 'Aldric Rabenfels',
      need: 'bg:bg_library', portrait: 'aldric.png',
      text: 'Senhor de Velha Nidhaus. Portador do pacto por heran\u00e7a, sem nunca ter tido voto, e sem nunca ter reaberto a conta.',
      entries: [
      { need: 'bg:bg_library',     tx: 'Senhor de Velha Nidhaus. Amea\u00e7a por conten\u00e7\u00e3o.' },
      { need: 'bg:bg_library',     tx: 'D\u00e1 permiss\u00f5es que funcionam como armadilhas.' },
      { need: 'chapter:capitulo2', tx: 'L\u00ea de p\u00e9, com o volume apoiado na estante. Nunca senta na pr\u00f3pria biblioteca.' },
      { need: 'route:answer:12',   tx: 'Entrou na c\u00e2mara uma vez e nunca mais. A mulher anotava os n\u00fameros.' },
      { need: 'done:epilogo',      tx: 'O tique: corrige verbo. Diz uma coisa, ouve a si mesmo, e troca a palavra no meio da frase. Faz isso s\u00f3 quando est\u00e1 mentindo por omiss\u00e3o, e n\u00e3o sabe que faz.' },
      { need: 'done:epilogo',      tx: 'O medo: a c\u00e2mara. Ele desceu uma vez, aos vinte e seis anos, e organizou os trinta anos seguintes da vida em torno de nunca mais precisar descer.' },
      { need: 'done:epilogo',      tx: 'A contradi\u00e7\u00e3o: ningu\u00e9m escolheu. O Primeiro aceitou uma vez, e o pacto \u00e9 imposto a cada descendente desde ent\u00e3o. Aldric n\u00e3o teve voto. Isso n\u00e3o o absolve: ele escolheu obedecer sem nunca reabrir a conta.' },
      { need: 'done:epilogo',      tx: 'O que sobra dele: a permiss\u00e3o que ele deu no primeiro m\u00eas, que era um convite, e que ela aceitou sabendo que era.' }
    ]},

    { id: 'ch_twins', cat: 'char', name: 'Klara e Liara',
      need: 'bg:bg_corridor', portrait: 'gemeas.png',
      text: 'G\u00eameas id\u00eanticas. Uma nasceu casulo, uma nasceu intacta, e a \u00fanica pessoa da casa que trata as duas igual \u00e9 a que n\u00e3o sabe de nada.',
      entries: [
      { need: 'bg:bg_corridor',    tx: 'Oito anos. G\u00eameas id\u00eanticas, assim\u00e9tricas em tudo o que importa.' },
      { need: 'bg:bg_corridor',    tx: 'Liara nota o fato. Klara tira a conclus\u00e3o e n\u00e3o a diz.' },
      { need: 'done:capitulo1',    tx: 'Curativo no bra\u00e7o esquerdo de uma delas. A outra n\u00e3o tem nenhum. Anotado sem conclus\u00e3o.' },
      { need: 'route:hope:8',      tx: 'Klara n\u00e3o pede para ir. Pede o mundo inteiro pela boca da irm\u00e3.' },
      { need: 'done:capitulo6',    tx: 'Klara chama Antoniette de "a senhorita". Liara chama de "Toni" desde o primeiro m\u00eas.' },
      { need: 'done:epilogo',      tx: 'O tique de Klara: corrige os outros em voz baixa, para n\u00e3o constranger ningu\u00e9m. E ri depois, quando j\u00e1 passou, quando acha que n\u00e3o tem ningu\u00e9m olhando.' },
      { need: 'done:epilogo',      tx: 'O medo de Klara: n\u00e3o \u00e9 a c\u00e2mara nem agosto. \u00c9 que a irm\u00e3 descubra. Ela passou doze anos administrando a ignor\u00e2ncia da Liara como quem administra um doente.' },
      { need: 'done:epilogo',      tx: 'O que Klara sente, e nunca soube nomear: fome fora de hora e um vazio, juntos, de uma a tr\u00eas horas, passando sozinhos. Ela descreve como se descreve dor de cabe\u00e7a. N\u00e3o atribui a nada, porque n\u00e3o h\u00e1 nada a que atribuir \u2014 para ela.' },
      { need: 'done:epilogo',      tx: 'Em cinco anos, Klara nunca disse "Toni" uma vez sequer. A formalidade mantida por uma crian\u00e7a que corrige adultos em voz baixa n\u00e3o \u00e9 dist\u00e2ncia.' },
      { need: 'done:epilogo',      tx: 'O tique de Liara: aperta o l\u00e1pis quando perde alguma coisa. A irm\u00e3 sabe disso e ela n\u00e3o sabe que a irm\u00e3 sabe.' },
      { need: 'done:epilogo',      tx: 'O medo de Liara: nenhum. \u00c9 o que a torna perigosa, e \u00e9 o que a mata por procura\u00e7\u00e3o. Ela est\u00e1 convencida de que n\u00e3o h\u00e1 nada a esconder.' },
      { need: 'done:epilogo',      tx: 'As duas queriam a mesma coisa desde o primeiro cap\u00edtulo: sair. As duas conseguem. Toda a trag\u00e9dia cabe num formul\u00e1rio de matr\u00edcula.' }
    ]},

    { id: 'ch_carmine', cat: 'char', name: 'Carmine',
      need: 'done:epilogo', portrait: 'carmine.png',
      text: 'N\u00e3o tem entrada na galeria antes do fim da obra, porque antes do fim da obra n\u00e3o h\u00e1 motivo para o jogador saber que existe algu\u00e9m para ter ficha.',
      entries: [
      { need: 'done:epilogo',      tx: 'A Ancestral, para a fam\u00edlia. A Benfeitora, para os mais velhos \u2014 ironia que ningu\u00e9m percebe cometer. Khar\u2019Vel, para Antoniette e para a Ordem: um codinome que ela mesma inventou, porque nenhum agente escreve o nome verdadeiro num documento intercept\u00e1vel.' },
      { need: 'done:epilogo',      tx: 'O nome verdadeiro \u00e9 Carmine, e ela \u00e9 uma mulher. Klara s\u00f3 vem a saber disso adulta, na Academia, depois desta obra.' },
      { need: 'done:epilogo',      tx: 'Para ela todo pacto \u00e9 casamento \u2014 uni\u00e3o de sangue. Quem pactua com ela pertence a ela, e qualquer v\u00ednculo importante de fora \u00e9 lido como trai\u00e7\u00e3o. N\u00e3o como concorr\u00eancia. Como adult\u00e9rio.' },
      { need: 'done:epilogo',      tx: 'Abomina casamentos, amizades profundas, familiares muito pr\u00f3ximos, outros patronos e divindades. Todas contam igual.' },
      { need: 'done:epilogo',      tx: 'O que ela quer \u00e9 a entrega inteira, e Klara \u00e9 capaz disso \u2014 a nobreza, a lealdade, a promessa de prote\u00e7\u00e3o mesmo quando \u00e9 imposs\u00edvel cumprir. \u00c9 a esposa perfeita. E Klara aponta tudo isso para outra pessoa.' },
      { need: 'done:epilogo',      tx: '\u00c9 por isso que Antoniette morre. N\u00e3o pelo cronograma, n\u00e3o porque sabia demais, n\u00e3o porque quase moveu uma data. Porque a menina a escolheu.' },
      { need: 'done:epilogo',      tx: 'Antoniette nunca descobriu. Concluiu "calend\u00e1rio", escreveu isso, e \u00e9 isso que est\u00e1 no Arquivo que Matheo leu. O documento que o jogador leu primeiro est\u00e1 errado no motivo.' },
      { need: 'done:epilogo',      tx: 'O tique: ela conta. Contou quantas vezes Klara procurou Antoniette sem precisar de nada. Klara n\u00e3o sabe que est\u00e1 sendo contada, e nunca soube que existe algu\u00e9m do outro lado.' },
      { need: 'done:epilogo',      tx: 'Nenhuma cena da obra \u00e9 do ponto de vista dela. Nunca ganha sprite, nunca \u00e9 descrita, nunca explica. O corpo dela em cena \u00e9 a temperatura do ar e uma vela que n\u00e3o oscila.' }
    ]},

    { id: 'ch_fenn', cat: 'char', name: 'Fenn',
      need: 'bg:bg_nidhaus_gate', portrait: 'fenn.png',
      text: 'Responde pela casa. Vinte e nove anos de servi\u00e7o, e a \u00fanica pessoa de Velha Nidhaus que trata Antoniette como gente antes de ela dar motivo.',
      entries: [
      { need: 'bg:bg_nidhaus_gate', tx: 'Responde pela casa.' },
      { need: 'bg:bg_nidhaus_gate', tx: 'Responde \u00e0 pergunta feita e para exatamente onde a verdade acaba.' },
      { need: 'done:capitulo1',     tx: 'Vinte palavras para um cavalo. Nove para uma pessoa.' },
      { need: 'done:capitulo1',     tx: 'Riscos a faca na porta da cocheira, um acima do outro. O filho cresceu quatro dedos naquele ano.' },
      { need: 'done:capitulo8',     tx: 'O pai dele trabalhou nesta casa. Ele tinha nove anos quando entrou.' },
      { need: 'done:epilogo',       tx: 'O tique: fala com os animais em frase inteira e com as pessoas em frase cortada. N\u00e3o \u00e9 timidez. \u00c9 que com o cavalo n\u00e3o h\u00e1 nada que ele precise deixar de dizer.' },
      { need: 'done:epilogo',       tx: 'O medo: que o filho fique. Ele passou a vida numa casa que n\u00e3o se pode deixar e a \u00fanica coisa que quis foi que o menino sa\u00edsse antes de aprender a n\u00e3o olhar para a porta nordeste.' },
      { need: 'done:epilogo',       tx: '\u00c9 o terceiro que paga. A p\u00e1gina 291 do Arquivo \u00e9 sobre ele, e \u00e9 uma das quatro que Antoniette arrancou. Sem ela, o tribunal n\u00e3o encontrou terceiro lesado e o caso morreu.' },
      { need: 'done:epilogo',       tx: 'Ele nunca pediu garantia nenhuma. Vinte e nove anos naquela casa e acreditou nela porque ela perguntou do jeito certo \u2014 e o jeito certo foi ele que ensinou, no primeiro dia, no port\u00e3o.' }
    ]},

    { id: 'ch_dara', cat: 'char', name: 'Dara',
      need: 'bg:bg_kitchen', portrait: 'dara.png',
      text: 'Cozinheira. Dezenove anos de casa, e a copa \u00e9 o \u00fanico c\u00f4modo quente de Velha Nidhaus.',
      entries: [
      { need: 'bg:bg_kitchen',     tx: 'Cozinheira. Dezenove anos de casa.' },
      { need: 'bg:bg_kitchen',     tx: 'Enuncia regras como se fossem fatos triviais. Depois das oito, ningu\u00e9m tem fome.' },
      { need: 'done:capitulo2',    tx: 'Conta a prataria toda noite, e conta h\u00e1 dezenove anos.' },
      { need: 'done:capitulo2',    tx: 'Pede cravo a quem for a Marca Cinzenta. Dezenove anos pedindo. J\u00e1 virou passatempo.' },
      { need: 'done:epilogo',      tx: 'O tique: enche a caneca antes de perguntar se a pessoa quer. \u00c9 a \u00fanica forma de afeto que a casa permite sem que ningu\u00e9m tenha de dizer nada.' },
      { need: 'done:epilogo',      tx: 'O medo: ser mandada embora perto do fim. Dezenove anos n\u00e3o d\u00e3o direito a nada nesta casa, e ela sabe disso melhor do que ningu\u00e9m.' },
      { need: 'done:epilogo',      tx: '"Ningu\u00e9m tem fome depois das oito" n\u00e3o \u00e9 hor\u00e1rio de cozinha. \u00c9 o que sobrou de uma pergunta que algu\u00e9m fez uma vez, h\u00e1 muitos anos, e que ningu\u00e9m repetiu.' },
      { need: 'done:epilogo',      tx: 'Quando Antoniette perguntou se ningu\u00e9m tem fome ou ningu\u00e9m pede, Dara respondeu que ela perguntava bonito. E n\u00e3o respondeu nem uma coisa nem outra.' }
    ]},

    { id: 'ch_ren', cat: 'char', name: 'Ren',
      need: 'bg:bg_kitchen', portrait: 'ren.png',
      text: 'Dezessete anos, cinco semanas de casa, sem raiz na regi\u00e3o. A escolha de um assistente sem v\u00ednculo local n\u00e3o foi acidente.',
      entries: [
      { need: 'bg:bg_kitchen',     tx: 'Dezessete anos. Cinco semanas de casa. Sem raiz local.' },
      { need: 'chapter:capitulo2', tx: 'N\u00e3o faz a segunda pergunta.' },
      { need: 'done:capitulo2',    tx: 'Guarda comida no bolso.' },
      { need: 'done:capitulo2',    tx: 'Junta para comprar uma parelha e fazer frete, e n\u00e3o depender de casa nenhuma.' },
      { need: 'done:epilogo',      tx: 'O tique: repete uma instru\u00e7\u00e3o em voz baixa duas vezes e depois nunca mais erra. Aprendeu isso sozinho, e \u00e9 a coisa mais parecida com m\u00e9todo que existe na casa fora de Antoniette.' },
      { need: 'done:epilogo',      tx: 'O medo: nenhum, ainda. \u00c9 a defini\u00e7\u00e3o de ter dezessete anos. \u00c9 tamb\u00e9m por isso que ele foi contratado.' },
      { need: 'done:epilogo',      tx: 'N\u00e3o sabe ler direito. Sabe as letras. Passou cinco anos empilhando os volumes de uma biblioteca que documenta o que vai acontecer com a menina da casa.' }
    ]},

    { id: 'ch_guardioes', cat: 'char', name: 'Os Guardi\u00f5es',
      need: 'done:capitulo4', portrait: 'guardioes.png',
      text: 'Elsbeth, Cort e Ines. Entram uma vez por ano, em outubro, e a casa chama o que eles fazem de treinamento.',
      entries: [
      { need: 'done:capitulo4',    tx: 'Tr\u00eas adultos que n\u00e3o moram na casa e chegam com uma caixa de couro comprida, do tamanho de uma prancheta.' },
      { need: 'done:capitulo4',    tx: 'Elsbeth e Cort s\u00e3o voz atr\u00e1s de uma porta fechada. Antoniette nunca viu o rosto dos dois.' },
      { need: 'done:epilogo',      tx: 'Contam em voz alta e conferem entre si. "Doze." "Doze. Est\u00e1 subindo." N\u00e3o \u00e9 idade. \u00c9 medida.' },
      { need: 'done:epilogo',      tx: 'O medo deles: errar a conta. \u00c9 um trabalho t\u00e9cnico com um cronograma de trezentos anos, e ningu\u00e9m que atrasou uma vez foi chamado de volta.' },
      { need: 'done:epilogo',      tx: 'Nenhum dos tr\u00eas \u00e9 cruel, e \u00e9 isso que os torna insuport\u00e1veis. Eles medem uma crian\u00e7a do jeito que se afere um instrumento.' }
    ]},

    { id: 'ch_primeiro', cat: 'char', name: 'O Primeiro',
      need: 'route:answer:12', portrait: 'primeiro.png',
      text: 'O antepassado que aceitou. Est\u00e1 no primeiro quadro do corredor de retratos e n\u00e3o h\u00e1 mais nada dele em lugar nenhum.',
      entries: [
      { need: 'route:answer:12',   tx: 'Nove gera\u00e7\u00f5es penduradas em ordem cronol\u00f3gica. A primeira \u00e9 a \u00fanica em que o pintor n\u00e3o p\u00f4s duas meninas.' },
      { need: 'done:epilogo',      tx: 'Ningu\u00e9m escolheu, exceto ele. Aceitou uma vez, e o pacto \u00e9 imposto a cada descendente desde ent\u00e3o.' },
      { need: 'done:epilogo',      tx: 'A fam\u00edlia apaga a si mesma dos pr\u00f3prios pap\u00e9is para poder continuar existindo. Tr\u00eas s\u00e9culos e quase nenhum rastro documental fora de Velha Nidhaus.' },
      { need: 'done:epilogo',      tx: 'A moldura vazia no fim do corredor tem o tamanho das outras nove, e algu\u00e9m limpa a borda de baixo de uma moldura que n\u00e3o tem quadro.' }
    ]},

    /* --- documentos: cartoes do Arquivo lidos ---------------------------
       'text' e a legenda: o que o documento e, sem entregar o misterio.
       As entradas com need 'done:epilogo' so abrem com a obra terminada.
       -------------------------------------------------------------------- */

    { id: 'doc_arquivo', cat: 'doc', name: 'Fragmentos do Arquivo',
      need: 'arc:arquivo',
      text: 'Trechos citados diretamente do documento que Antoniette deixou. Duzentas e oitenta e sete paginas, com a numeracao dela terminando em duzentos e noventa e uma.',
      entries: [
      { need: 'arc:arquivo',  tx: 'Voz do Compilador: terceira pessoa do comeco ao fim, nunca "eu". E o que a Ordem ensina, e foi Matheo quem ensinou a ela.' },
      { need: 'arc:arquivo',  tx: 'Tudo o que ele afirma e conferivel. Ela sabia que alguem ia conferir.' },
      { need: 'done:epilogo', tx: 'O Arquivo erra por omissao e por enfase, nunca por invencao. Um documento com uma afirmacao falsa contamina tudo o que vem depois, e ela sabia disso melhor do que qualquer pessoa.' },
      { need: 'done:epilogo', tx: 'E erra numa coisa, uma so, e e a que importa: o motivo. Ela morreu convencida de que a mataram pelo cronograma. Esta escrito assim, e Matheo leu assim.' }
    ]},

    { id: 'doc_compilador', cat: 'doc', name: 'Nota do Compilador',
      need: 'arc:compilador',
      text: 'Notas de rodape assinadas pelo "Compilador". E Antoniette comentando o proprio documento, na terceira pessoa, como manda o protocolo.',
      entries: [
      { need: 'arc:compilador', tx: 'A convencao existe para separar o registro de quem registra. Serve para o leitor confiar no que esta lendo.' },
      { need: 'done:epilogo',   tx: 'Cada nota se defende de uma acusacao que ninguem fez. Lidas em sequencia, sao o retrato de alguem antecipando um julgamento que nunca chegou a acontecer.' },
      { need: 'done:epilogo',   tx: 'A mascara escorrega uma vez, na ultima entrada, quando ela para de escrever "o Compilador" e passa a escrever "eu". Depois volta, e assina com as iniciais.' }
    ]},

    { id: 'doc_ultima', cat: 'doc', name: 'Ultima entrada',
      need: 'arc:ultima',
      text: 'A ultima coisa que ela escreveu, na madrugada de dez de agosto, com uma hora e quarenta de prazo. Caligrafia firme, espacamento nao.',
      entries: [
      { need: 'arc:ultima',   tx: 'Enderecada a quem encontrar. Ela nao sabia quem ia receber e escreveu para servir a qualquer um.' },
      { need: 'arc:ultima',   tx: 'Metade e informacao operacional: datas, plantas, horarios de guarda. A outra metade nao serve para nada e ela deixou assim mesmo.' },
      { need: 'done:epilogo', tx: 'A idade, a velocidade de leitura, o jeito de corrigir os outros em voz baixa. Ela parou, pensou que aquilo nao era informacao operacional, e escreveu "deixa".' },
      { need: 'done:epilogo', tx: 'Assinou com as iniciais porque nome inteiro num documento daqueles e risco para quem recebe. Pos o lugar e o mes. Nao pos o dia.' }
    ]},

    { id: 'doc_caderno', cat: 'doc', name: 'Caderno operacional',
      need: 'arc:caderno',
      text: 'O caderno oficial. Numerado, datado, com cabecalho, do jeito que a Ordem exige. E o que ela mostraria se pedissem.',
      entries: [
      { need: 'arc:caderno',  tx: 'Registra tudo, inclusive o que ela propria classifica como sem valor operacional.' },
      { need: 'arc:caderno',  tx: 'Protocolo da Ordem, pagina quarenta e dois: detalhe subjetivo que sobrevive ao descarte costuma ser relevante.' },
      { need: 'done:epilogo', tx: 'Cinco anos de entradas e a palavra medo nao aparece uma vez.' }
    ]},

    { id: 'doc_sem_ident', cat: 'doc', name: 'Caderno sem identificacao',
      need: 'arc:sem_identificacao',
      text: 'Segundo caderno. Sem data, sem cabecalho, guardado debaixo do forro do bau. Nada dele foi remetido a Lervel.',
      entries: [
      { need: 'arc:sem_identificacao', tx: 'Comeca com uma pergunta que nao cabia em formulario nenhum.' },
      { need: 'done:epilogo', tx: 'Um segundo caderno e o comeco de uma segunda pessoa. Ela escreveu isso na primeira noite em que abriu um, e estava certa.' },
      { need: 'done:epilogo', tx: 'E deste caderno que saem as quatro paginas. Nao do oficial.' }
    ]},

    { id: 'doc_lervel', cat: 'doc', name: 'Resposta da Ordem',
      need: 'arc:lervel',
      text: 'Correspondencia recebida de Lervel. Chega entre nove dias e nove semanas, dependendo do que foi perguntado.',
      entries: [
      { need: 'arc:lervel',   tx: 'A Ordem dos Olhos Cinzentos arquiva. E o que ela faz, e faz bem.' },
      { need: 'done:epilogo', tx: 'Ela mandou tudo o que viu em agosto do ano tres e a instrucao foi manter a posicao e continuar observando. Cumpriu por dois anos.' },
      { need: 'done:epilogo', tx: 'O parecer final do tribunal da Marca tem duas linhas: relato singular, de autoria falecida, sem terceiro lesado identificavel.' }
    ]},

    { id: 'doc_cadastro', cat: 'doc', name: 'Registro de matricula',
      need: 'arc:cadastro',
      text: 'Copia de registro da Academia de Eldoria. Chega a Lervel por um alerta permanente deixado num sobrenome seis anos antes.',
      entries: [
      { need: 'arc:cadastro', tx: 'Uma familia que nao registra nada em tres seculos acabou de registrar as filhas.' },
      { need: 'done:epilogo', tx: 'O curso de Klara e o que Antoniette ensinou a ela. Esta numa ficha administrativa, seis anos depois da morte dela, e ninguem que le aquela linha sabe o que esta lendo.' },
      { need: 'done:epilogo', tx: 'Residencia obrigatoria durante o ciclo integral. A Academia responde pelo desenvolvimento do aluno ate a titulacao. Matheo leu a clausula inteira sem entender que estava lendo um cronograma.' }
    ]},

    { id: 'doc_caderno_klara', cat: 'doc', name: 'O caderno de K.',
      need: 'arc:caderno_klara',
      text: 'Folha com tres colunas e uma data em cada linha, na letra de uma crianca. Outubro todo ano, fevereiro alguns anos, agosto todo ano.',
      entries: [
      { need: 'arc:caderno_klara', tx: 'Ninguem pediu a ela para fazer isto.' },
      { need: 'done:epilogo', tx: 'E o metodo de Antoniette na letra de outra pessoa. Catalogar, conferir, nunca acreditar em fonte unica.' },
      { need: 'done:epilogo', tx: 'Foi por causa desta folha, e de outras duas coisas como ela, que Carmine veio agradecer.' }
    ]},

    { id: 'doc_matheo', cat: 'doc', name: 'Correspondencia de campo',
      need: 'arc:matheo',
      text: 'As cartas entre Antoniette e Matheo. Passam pelas maos da casa na ida e na volta, e as duas partes sabem disso.',
      entries: [
      { need: 'arc:matheo',   tx: 'Nenhum agente escreve o nome verdadeiro de um alvo num documento que terceiros podem ler. Dai Khar\u2019Vel.' },
      { need: 'done:epilogo', tx: 'Em nove anos ele nunca deixou de perguntar. A carta mais curta que ela escreveu foi a de abril do ultimo ano, e ele nao perguntou nada sobre ela.' },
      { need: 'done:epilogo', tx: 'A casa le tudo o que entra e sai. Foi assim que a cobertura dela pode queimar, no fim, por ela ter feito exatamente o que a Ordem manda.' }
    ]},

    { id: 'doc_ficha', cat: 'doc', name: 'Livro de pessoal',
      need: 'arc:ficha',
      text: 'A ficha de admissao e baixa dela, na letra do escriturario da casa. Tres palavras na ultima linha.',
      entries: [
      { need: 'arc:ficha',    tx: 'Motivo de saude. E a formula da casa, e a casa usa a mesma desde sempre.' },
      { need: 'done:epilogo', tx: 'Matheo leu esta linha uma vez antes, numa ficha de trinta e sete anos atras, uma semana antes de assinar a autorizacao de campo dela. E assinou.' },
      { need: 'done:epilogo', tx: 'Este cartao so existe em duas das quatro leituras. Nas outras duas nao ha baixa nenhuma para pedir, e o tribunal declarou autoria falecida sobre alguem que respira.' }
    ]},

    { id: 'doc_balada', cat: 'doc', name: 'Cantiga da Marca',
      need: 'arc:balada',
      text: 'Cantiga de roda recolhida na aldeia, a quatro quilometros de Nidhaus. Antoniette transcreveu a letra na primeira hora, como curiosidade local.',
      entries: [
      { need: 'arc:balada',   tx: 'Aparece tres vezes na obra e nunca inteira, ate o fim.' },
      { need: 'done:epilogo', tx: 'A cancao sobre a irma que vira casulo, cantada pela irma que vai ser a borboleta, com as maos no cabelo dela.' },
      { need: 'done:epilogo', tx: 'O verso que fecha a obra e o unico que diz o que acontece, e esta numa cantiga que as criancas da regiao cantam lavando roupa.' }
    ]},

    /* --- registros de volume -------------------------------------------
       Um por capitulo, com A TROCA daquele capitulo declarada: o que ela
       ganhou e o que entregou. Lidos em sequencia, sao a espinha da obra.
       -------------------------------------------------------------------- */

    { id: 'end_prologo', cat: 'rec', name: 'Prologo \u00b7 O Arquivo', need: 'done:prologo',
      text: 'Matheo recebe o pacote no nonagesimo terceiro dia e le a noite inteira. O jogador conhece o fim antes de viver o comeco.' },
    { id: 'end_cap1', cat: 'rec', name: 'I \u00b7 A Chegada', need: 'done:capitulo1',
      text: 'Ganha a cobertura. Entrega a pergunta que engoliu no portao, e passa a contar as que nao faz.' },
    { id: 'end_cap2', cat: 'rec', name: 'II \u00b7 O Inventario', need: 'done:capitulo2',
      text: 'Ganha a lacuna de dois anos nos livros de conta. Entrega a honestidade operacional: o primeiro relatorio que ela manda sabendo o que ficou de fora.' },
    { id: 'end_cap3', cat: 'rec', name: 'III \u00b7 As Duas Klara', need: 'done:capitulo3',
      text: 'Ganha a primeira conversa. Entrega a distancia profissional, e nao recupera mais.' },
    { id: 'end_cap4', cat: 'rec', name: 'IV \u00b7 Os Rituais de Outubro', need: 'done:capitulo4',
      text: 'Ganha o termo que a casa usa: treinamento. Entrega a confianca na propria Ordem.' },
    { id: 'end_cap5', cat: 'rec', name: 'V \u00b7 A Camara', need: 'done:capitulo5',
      text: 'Ganha quatro minutos la embaixo. Entrega a seguranca da cobertura, e fica devendo a uma crianca de nove anos.' },
    { id: 'end_cap6', cat: 'rec', name: 'VI \u00b7 Uma Amizade', need: 'done:capitulo6',
      text: 'Dezoito meses. O unico tempo bom, e ela gastou inteiro. O que ela ensinou aqui volta em todos os capitulos seguintes.' },
    { id: 'end_cap7', cat: 'rec', name: 'VII \u00b7 Agosto', need: 'done:capitulo7',
      text: 'Ganha ver o fenomeno com os proprios olhos. Entrega a missao: a partir daqui ela nao esta mais trabalhando para Lervel.' },
    { id: 'end_cap8', cat: 'rec', name: 'VIII \u00b7 O Que Ela Nao Deveria Saber', need: 'done:capitulo8',
      text: 'Ganha o cronograma da casa. Entrega um terceiro: alguem paga no lugar dela, e a pagina que registra isso e uma das quatro arrancadas.' },
    { id: 'end_cap9', cat: 'rec', name: 'IX \u00b7 A Decisao', need: 'done:capitulo9',
      text: 'Ganha o plano e a promessa. Entrega a Ordem, e deixa de ser agente. E aqui que o final da obra fica decidido.' },
    { id: 'end_cap10', cat: 'rec', name: 'X \u00b7 A Fuga', need: 'done:capitulo10',
      text: 'Agosto do quinto ano. Sem escolha, de proposito. Termina com quatro horas no relogio e o ar esquentando.' },
    { id: 'end_cap11', cat: 'rec', name: 'XI \u00b7 Noventa Dias', need: 'done:capitulo11',
      text: 'Ganha o despacho. Nao resta nada para trocar depois. A ultima cena e o comeco do Prologo, visto do outro lado.' },
    { id: 'end_epilogo', cat: 'rec', name: 'Epilogo \u00b7 O Que Ficou', need: 'done:epilogo',
      text: 'Seis anos depois. Ele conseguiu o documento e o documento nao serviu, pelas quatro paginas que ela arrancou para proteger a menina.' },

    { id: 'route_hope', cat: 'rec', name: 'Registro: Esperanca', need: 'route:hope:6',
      text: 'Proximidade com quem esta nesta casa. O documento mestre e claro sobre o preco disto: momentos de ternura tornam o final mais devastador para quem os viveu.' },
    { id: 'route_loss', cat: 'rec', name: 'Registro: Perda', need: 'route:loss:6',
      text: 'O custo do que ela decide nao fazer. Cada ponto e uma omissao que pareceu razoavel na hora.' },
    { id: 'route_answer', cat: 'rec', name: 'Registro: Resposta', need: 'route:answer:6',
      text: 'O que ela descobre e em que ordem. E o unico medidor que pode mata-la mais depressa.' }
  ];

  var CATEGORIES = [
    { id: 'cg',   label: 'Cen\u00e1rios' },
    { id: 'char', label: 'Fichas' },
    { id: 'doc',  label: 'Documentos' },
    { id: 'rec',  label: 'Registros' }
  ];

  /* ---- registro do que foi visto ---------------------------------------- */

  function progress() {
    return RBF.Saves.readProgress();
  }

  function persist(p) {
    RBF.Storage.write(RBF.STORAGE.keys.progress, p);
  }

  /* Chamado pelo engine ao entrar em uma cena. */
  function markSeen(kind, value) {
    if (!kind || !value) { return; }
    var p = progress();
    if (!p.seen) { p.seen = []; }
    var token = kind + ':' + value;
    if (p.seen.indexOf(token) !== -1) { return; }
    p.seen.push(token);
    persist(p);
  }

  function hasSeen(token) {
    var p = progress();
    return !!(p.seen && p.seen.indexOf(token) !== -1);
  }

  /* ---- avaliacao de condicao -------------------------------------------- */

  function unlocked(item) {
    var need = item.need;
    if (!need) { return true; }

    var parts = need.split(':');
    var kind  = parts[0];

    if (kind === 'bg' || kind === 'arc') {
      return hasSeen(need);
    }
    if (kind === 'chapter') {
      return RBF.Saves.chapterReached(parts[1]);
    }
    if (kind === 'done') {
      var p = progress();
      return p.finishedChapters.indexOf(parts[1]) !== -1;
    }
    if (kind === 'route') {
      var target = parseInt(parts[2], 10) || 1;
      /* Vale o maior entre a partida atual e o melhor ja registrado. */
      var live = RBF.Routes.get(parts[1]);
      var best = (progress().bestRoutes || {})[parts[1]] || 0;
      return Math.max(live, best) >= target;
    }
    return false;
  }

  /* Guarda o melhor valor de rota ja alcancado, para que a galeria nao
     "esqueca" um registro depois de um novo jogo. */
  function recordRoutes(routeValues) {
    if (!routeValues) { return; }
    var p = progress();
    if (!p.bestRoutes) { p.bestRoutes = {}; }
    var changed = false;
    for (var id in routeValues) {
      if (!Object.prototype.hasOwnProperty.call(routeValues, id)) { continue; }
      var v = routeValues[id];
      if (typeof v !== 'number') { continue; }
      if (!p.bestRoutes[id] || v > p.bestRoutes[id]) {
        p.bestRoutes[id] = v;
        changed = true;
      }
    }
    if (changed) { persist(p); }
  }

  /* ---- consulta --------------------------------------------------------- */

  function categories() {
    return CATEGORIES.slice();
  }

  /* Entradas de uma ficha, na ordem de descoberta.
     Devolve sempre TODAS, marcando quais ja foram abertas, para que a
     ficha possa mostrar a lacuna em vez de esconder que ela existe. */
  function entriesOf(it) {
    if (!it.entries) { return null; }
    var out = [];
    for (var i = 0; i < it.entries.length; i++) {
      var e = it.entries[i];
      out.push({ tx: e.tx, unlocked: unlocked(e) });
    }
    return out;
  }

  function items(categoryId) {
    var out = [];
    for (var i = 0; i < CATALOG.length; i++) {
      var it = CATALOG[i];
      if (categoryId && it.cat !== categoryId) { continue; }
      var ent = entriesOf(it);
      var open = 0;
      if (ent) {
        for (var k = 0; k < ent.length; k++) { if (ent[k].unlocked) { open += 1; } }
      }
      out.push({
        id:       it.id,
        cat:      it.cat,
        name:     it.name,
        text:     it.text || null,
        entries:  ent,
        entriesOpen:  ent ? open : 0,
        entriesTotal: ent ? ent.length : 0,
        portrait: it.portrait || null,
        /* Item de cenario mostra o proprio background.
           A condicao 'cat' e necessaria: varias fichas de personagem
           destravam por 'bg:<cenario>', e sem ela a ficha herdava a
           miniatura do cenario que a destravou - Serafina aparecia como
           o salao, Aldric como a biblioteca. */
        bg:       (it.cat === 'cg' && it.need.indexOf('bg:') === 0)
                    ? it.need.slice(3) : null,
        unlocked: unlocked(it)
      });
    }
    return out;
  }

  /* Condicao de liberacao de um item, pelo id. O harness usa para
     casar cartao lido com entrada de galeria. */
  function needOf(id) {
    for (var i = 0; i < CATALOG.length; i++) {
      if (CATALOG[i].id === id) { return CATALOG[i].need || null; }
    }
    return null;
  }

  function counts() {
    var total = CATALOG.length;
    var open  = 0;
    for (var i = 0; i < CATALOG.length; i++) {
      if (unlocked(CATALOG[i])) { open += 1; }
    }
    return { total: total, unlocked: open };
  }

  function hasAny() {
    return counts().unlocked > 0;
  }

  return {
    categories:   categories,
    needOf:       needOf,
    items:        items,
    counts:       counts,
    hasAny:       hasAny,
    markSeen:     markSeen,
    recordRoutes: recordRoutes
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RBF.Gallery;
}
