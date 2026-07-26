/* ==========================================================================
   ARQUIVO RABENFELS - js/data/prologue.js
   PROLOGO: "O Arquivo"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.
   Tipos de beat documentados em js/engine.js.

   O PENSAMENTO UNICO DESTE CAPITULO (Zinsser, unidade):
   "Ele leu a ficha da escriba e assinou mesmo assim."
   Nenhum outro capitulo pode deixar este pensamento.

   Posicao no arco: Matheo Drell recebe o Arquivo tres dias depois do
   ponto morto combinado e le a noite inteira. O jogador conhece o fim
   antes de viver o comeco.

   Sem escolha nenhuma, de proposito. E o unico capitulo em que o jogador
   so assiste.

   CANON APLICADO (docs/biblia_rabenfels.md):
   - Khar'Vel e o nome que Antoniette deu. Os registros que ela cita sao
     reais e conferiveis; a convencao e o nome. O jogador nao descobre
     isso aqui.
   - As borboletas de agosto aparecem uma vez sem explicacao, e deixam
     um vestigio fisico que o Epilogo retoma.
   - O casulo nao transforma: o que sai, sai de outro corpo.
   - Klara nasce vampira, Liara nasce humana. O exame confirma que a
     entidade pegou; nao procura qual das duas.
   - Matheo leu a ficha da escriba antes de assinar. Sem alibi.

   OFICIO APLICADO NESTA REVISAO (docs/estudo/00_indice.md):
   - O Arquivo e objeto fisico: peso, cordel, cheiro, ordem de paginas,
     e uma numeracao que nao fecha. (Kristoff)
   - Auditoria sensorial: cheiro, tato e temperatura entram. A versao
     anterior era quase toda visual. (Kenworthy)
   - Beat de uma palavra, para comprar tempo com quase nenhum texto.
     (Kristoff: "Ping. / Ping. / Ping.")
   - As notas do Compilador viram sistema: cada uma se defende de uma
     acusacao que ninguem fez. (Kristoff/Corbett)
   - Atribuicao vaga - "diziam alguns" - como forma honesta de o Arquivo
     registrar o que ela nao pode confirmar. (Peters)
   - As camadas se contaminam UMA VEZ, em P9. (Kristoff)
   - Uma frase longa e desnorteada no climax, depois de todo o capitulo
     em frase curta. (Kenworthy, Faye)
   - Olhar para o lado: nao o objeto, o que o objeto faz em quem o
     recebe. (Kenworthy)

   NOTA SOBRE AS LINHAS DE KHAR'VEL EM P3
   As tres construcoes "Khar'Vel nao e X" sao texto canonico do
   documento mestre e nao se alteram. Elas sao anafora deliberada: uma
   definicao por exclusao, porque a coisa nao tem categoria positiva.
   Matheo, arquivista, repara nisso - o que converte a figura de
   linguagem em caracterizacao. Isso e diferente da formula proibida
   "nao e X: e Y" usada como muleta de ritmo na narracao.

   Dez cenas: P1 pacote, P2 paginas, P3 Khar'Vel, P4 Compilador,
   P5 casulo, P6 gemeas, P7 treinamento, P8 escriba, P9 pergunta,
   P10 ultima entrada. P11 e o corte.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.PROLOGUE = [

/* ======================================================================
   P1 - O ESCRITORIO DE MATHEO - FIM DE TARDE
   Topo cortado. A cena comeca no gesto, nao na paisagem.
   ====================================================================== */
{ t:'scene', id:'p1_pacote', chapter:'prologo', title:'O pacote',
  bg:'bg_prologue_room', bgm:'bgm_prologue' },
{ t:'fade_in' },
{ t:'spr', ch:'matheo', ex:'neutral', pos:'center' },

{ t:'sfx', id:'sfx_package' },
{ t:'nar', tx:'O mensageiro entregou o pacote com as duas m\u00e3os e n\u00e3o esperou recibo.' },
{ t:'nar', tx:'Matheo Drell n\u00e3o esperava visita. Por princ\u00edpio, nunca esperava.' },
{ t:'inn', tx:'Quem trabalha com informa\u00e7\u00e3o aprende cedo. Visita n\u00e3o marcada estraga o resto do dia.' },

{ t:'nar', tx:'Couro encerado, cordel escuro, sem selo.' },
{ t:'nar', tx:'Pesava mais do que devia para o tamanho.' },
{ t:'nar', tx:'O cordel estava dado em quatro voltas e um n\u00f3 cego, do jeito que se amarra o que n\u00e3o deve abrir sozinho na estrada.' },
{ t:'pause' },

{ t:'nar', tx:'O endere\u00e7o estava escrito em letra mi\u00fada e controlada.' },
{ t:'nar', tx:'Ele reconheceu a letra antes de ler o nome.' },

{ t:'inn', tx:'Noventa e tr\u00eas dias.' },
{ t:'nar', tx:'Ela tinha estabelecido noventa. Sem not\u00edcia em noventa dias, o ponto morto dispara.' },
{ t:'nar', tx:'Ele passou os \u00faltimos tr\u00eas tentando fazer com que tr\u00eas dias significassem alguma coisa.' },
{ t:'pause' },
{ t:'inn', tx:'N\u00e3o significavam.' },

{ t:'nar', tx:'Levou o pacote para a mesa e acendeu a segunda vela.' },
{ t:'nar', tx:'O couro tinha cheiro de cavalo e de cera velha. Estava frio de estrada e demorou a esquentar sob a m\u00e3o dele.' },
{ t:'inn', tx:'Relat\u00f3rio de campo. Leia como relat\u00f3rio de campo.' },

/* ======================================================================
   P2 - AS PAGINAS CONTADAS
   O metodo dele, mostrado uma vez, para que a perda tenha medida.
   Aqui entra o beat de uma palavra e a numeracao que nao fecha.
   ====================================================================== */
{ t:'scene', id:'p2_paginas', chapter:'prologo', title:'As p\u00e1ginas contadas',
  bg:'bg_archive_closeup', bgm:'bgm_archive' },
{ t:'spr', ch:'matheo', ex:'read', pos:'center' },

{ t:'sfx', id:'sfx_page_turn' },
{ t:'nar', tx:'Ele contou as p\u00e1ginas antes de ler a primeira. Fazia isso com qualquer documento novo.' },
{ t:'pause' },
{ t:'nar', tx:'Duzentas.' },
{ t:'nar', tx:'Duzentas e cinquenta.' },
{ t:'nar', tx:'Duzentas e oitenta e sete.' },
{ t:'pause' },

{ t:'nar', tx:'A numera\u00e7\u00e3o dela terminava em duzentos e noventa e um.' },
{ t:'inn', tx:'Faltam quatro.' },
{ t:'pause' },
{ t:'nar', tx:'Ele passou o polegar pela dobra interna. O corte era reto e antigo, feito com l\u00e2mina e com tempo.' },
{ t:'inn', tx:'Ou ela tirou, ou tiraram dela.' },
{ t:'nar', tx:'Ele anotou o n\u00famero num canto do mata-borr\u00e3o e n\u00e3o voltou ao assunto naquela noite.' },
{ t:'pause' },
{ t:'nar', tx:'Foi a \u00faltima coisa profissional que ele fez.' },

{ t:'nar', tx:'Letra densa. T\u00edtulos formais. Rodap\u00e9s numerados at\u00e9 o fim.' },
{ t:'inn', tx:'Ela numerou at\u00e9 o que n\u00e3o precisava.' },
{ t:'nar', tx:'No canto da capa, em tinta mais nova que o resto:' },

{ t:'arc', key:'arquivo', lns:[
    '\u2014 ARQUIVO RABENFELS \u2014',
    'Fragmentos da Linhagem, da Marca e do Pacto',
    '[ \u00e0 m\u00e3o ] "Para Matheo. Leia tudo. \u2014 A.V."'
]},

{ t:'inn', tx:'Leia tudo.' },
{ t:'inn', tx:'Em oito anos ela nunca me mandou fazer nada.' },
{ t:'pause' },
{ t:'inn', tx:'E mandou isso sabendo que faltavam quatro.' },

/* ======================================================================
   P3 - KHAR'VEL
   As linhas do cartao sao canonicas e nao se alteram.
   O que Matheo repara e a FORMA delas.
   ====================================================================== */
{ t:'scene', id:'p3_kharvel', chapter:'prologo', title:'Khar\u2019Vel',
  bg:'bg_archive_closeup' },

{ t:'arc', key:'arquivo', lns:[
    '"Khar\u2019Vel n\u00e3o \u00e9 um deus. Deuses recebem ora\u00e7\u00f5es e as ignoram. Ela recebe oferendas e as consome."',
    '"Khar\u2019Vel n\u00e3o \u00e9 um dem\u00f4nio. Dem\u00f4nios corrompem de fora. Ela cresce de dentro."',
    '"Morre e renasce sem parar. Nunca no pr\u00f3prio corpo. Em outros."'
]},

{ t:'inn', tx:'Khar\u2019Vel.' },
{ t:'inn', tx:'Vinte anos procurando uma refer\u00eancia verific\u00e1vel para essa palavra.' },
{ t:'inn', tx:'Ela achou em quatro.' },
{ t:'pause' },

{ t:'nar', tx:'Ele leu as tr\u00eas linhas outra vez, agora prestando aten\u00e7\u00e3o no formato.' },
{ t:'inn', tx:'Ela definiu a coisa tr\u00eas vezes dizendo o que a coisa n\u00e3o \u00e9.' },
{ t:'inn', tx:'Arquivista faz isso quando o cat\u00e1logo n\u00e3o tem a categoria.' },
{ t:'pause' },
{ t:'inn', tx:'Ela n\u00e3o achou onde guardar aquilo.' },

{ t:'sfx', id:'sfx_page_turn' },
{ t:'nar', tx:'Ele desceu ao rodap\u00e9. Ela citava a origem de cada linha, com data e arquivo.' },
{ t:'nar', tx:'Ele conhecia duas das fontes. Tinha catalogado uma delas com as pr\u00f3prias m\u00e3os, quinze anos antes.' },
{ t:'pause' },
{ t:'inn', tx:'Est\u00e1 tudo confer\u00edvel. Ela sabia que eu ia conferir.' },

/* As borboletas entram aqui, uma vez, e deixam vestigio fisico.
   O Epilogo retoma. */
{ t:'arc', key:'arquivo', lns:[
    '"Todo agosto, nas terras pr\u00f3ximas \u00e0 Marca, aparecem borboletas de asa clara com veias vermelhas."',
    '"Duram tr\u00eas semanas. As aldeias n\u00e3o as matam e n\u00e3o falam delas."',
    '"Em trezentos anos de registros, a fam\u00edlia nunca escreveu uma linha sobre o fen\u00f4meno."'
]},

{ t:'inn', tx:'Ela anotou o sil\u00eancio deles como se fosse um dado.' },
{ t:'pause' },
{ t:'nar', tx:'Na dobra da folha seguinte havia uma asa seca, prensada pelo peso das p\u00e1ginas.' },
{ t:'nar', tx:'Clara, com uma veia vermelha atravessando.' },
{ t:'nar', tx:'Ele soprou de leve. A asa n\u00e3o se moveu. Estava colada ao papel havia meses.' },
{ t:'pause' },
{ t:'nar', tx:'Ele passou adiante sem escrever nada a respeito.' },

/* ======================================================================
   P4 - O COMPILADOR
   As notas viram sistema: cada uma se defende de uma acusacao
   que ninguem fez.
   ====================================================================== */
{ t:'scene', id:'p4_compilador', chapter:'prologo', title:'O Compilador',
  bg:'bg_archive_closeup' },

{ t:'nar', tx:'As notas de rodap\u00e9 eram assinadas por um Compilador.' },
{ t:'nar', tx:'Terceira pessoa do come\u00e7o ao fim. Nunca "eu". Nunca o nome dela.' },
{ t:'inn', tx:'Duzentas e oitenta e sete p\u00e1ginas escrevendo sobre si mesma como se fosse outra pessoa.' },
{ t:'pause' },
{ t:'inn', tx:'\u00c9 o que a Ordem ensina. Ela aprendeu comigo.' },

{ t:'nar', tx:'A maior parte das notas era m\u00e9todo puro. De onde veio o dado, quem contou, o que n\u00e3o foi poss\u00edvel confirmar.' },

{ t:'arc', key:'compilador', label:'\u2014 nota do Compilador \u2014', lns:[
    '17. Sobre o andar fechado, duas vers\u00f5es circulam entre a criadagem.',
    'Uma fala em umidade. A outra em obras que nunca come\u00e7aram.',
    'Fonte \u00fanica em ambos os casos. O Compilador registra as duas e n\u00e3o escolhe.'
]},

{ t:'inn', tx:'Ela registrava at\u00e9 o que sabia que era mentira.' },
{ t:'inn', tx:'Boa t\u00e9cnica. Eu ensinei essa.' },
{ t:'pause' },

{ t:'nar', tx:'A voz se manteve por cento e quarenta p\u00e1ginas.' },
{ t:'sfx', id:'sfx_page_turn' },
{ t:'nar', tx:'Escorregou na cento e quarenta e um.' },

{ t:'arc', key:'compilador', label:'\u2014 nota do Compilador \u2014', lns:[
    '41. O sujeito K. tem oito anos na data desta entrada.',
    'O Compilador registra a idade porque a idade entra no c\u00e1lculo do ciclo.',
    'N\u00e3o por outro motivo.'
]},

{ t:'nar', tx:'Ele leu a \u00faltima linha duas vezes.' },
{ t:'inn', tx:'Ningu\u00e9m escreve "n\u00e3o por outro motivo" quando n\u00e3o h\u00e1 outro motivo.' },
{ t:'pause' },
{ t:'nar', tx:'A numera\u00e7\u00e3o seguia adiante. Ela n\u00e3o voltou para corrigir.' },

/* ======================================================================
   P5 - A CAMARA DO CASULO
   Substituicao, nao transformacao. Sensorial: temperatura.
   ====================================================================== */
{ t:'scene', id:'p5_casulo', chapter:'prologo', title:'A c\u00e2mara do casulo',
  bg:'bg_archive_closeup' },

{ t:'arc', key:'arquivo', lns:[
    '"Os registros mais antigos da propriedade chamam o lugar de a c\u00e2mara do casulo."',
    '"A fam\u00edlia adotou outros nomes depois. Ala de estudos. Ala norte. O andar fechado."',
    '"A c\u00e2mara do casulo \u00e9 a \u00fanica denomina\u00e7\u00e3o honesta que esta casa j\u00e1 produziu."'
]},

{ t:'nar', tx:'Ele leu a frase de novo.' },
{ t:'inn', tx:'A c\u00e2mara do casulo.' },
{ t:'pause' },

{ t:'inn', tx:'Ele sabia como funciona um casulo. A lagarta se desfaz por dentro e o que sai da casca \u00e9 feito do que ela era.' },
{ t:'pause' },
{ t:'inn', tx:'Aqui a casca fica com a menina dentro.' },
{ t:'inn', tx:'O que sai, sai de outro corpo. Inteiro. Sem ter pago nada.' },

{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'A vela da esquerda apagou. Ele continuou com a que restou.' },
{ t:'nar', tx:'A cera esfriou depressa. Ele s\u00f3 percebeu porque a m\u00e3o que segurava a folha come\u00e7ou a doer no n\u00f3.' },

/* ======================================================================
   P6 - AS GEMEAS
   Klara vampira, Liara humana. O exame confirma.
   ====================================================================== */
{ t:'scene', id:'p6_gemeas', chapter:'prologo', title:'As g\u00eameas',
  bg:'bg_archive_closeup', bgm:'bgm_archive' },

{ t:'arc', key:'arquivo', lns:[
    '"Nasceram g\u00eameas, como nasce toda gera\u00e7\u00e3o desta casa. O ritual garante o par."',
    '"Liara nasceu humana. Klara nasceu vampira. A diferen\u00e7a era vis\u00edvel na primeira hora."',
    '"Os guardi\u00f5es examinaram Klara mesmo assim. Procuravam um calor espec\u00edfico no sangue."',
    '"O exame n\u00e3o servia para descobrir qual das duas. Isso j\u00e1 se sabia."',
    '"Servia para confirmar que a entidade tinha pegado."',
    '"Registro da casa, mesma data: a escolhida foi identificada. O ciclo continua."'
]},

{ t:'bgm', id:null },
{ t:'pause' },
{ t:'inn', tx:'Um laudo.' },
{ t:'inn', tx:'Eles conferiram uma crian\u00e7a de horas como quem confere uma remessa.' },
{ t:'pause' },

{ t:'inn', tx:'Ela tinha oito anos quando Antoniette chegou.' },
{ t:'inn', tx:'Oito.' },
{ t:'pause' },
{ t:'inn', tx:'E Antoniette ficou cinco.' },
{ t:'nar', tx:'Ele n\u00e3o terminou a conta.' },

/* ======================================================================
   P7 - O TREINAMENTO
   O reconhecimento vem pelo eco da frase, sem que ninguem o enuncie.
   ====================================================================== */
{ t:'scene', id:'p7_experimentos', chapter:'prologo', title:'O treinamento',
  bg:'bg_archive_closeup' },
{ t:'sfx', id:'sfx_page_turn' },

{ t:'arc', key:'arquivo', lns:[
    '"A casa chama de treinamento. Rotina de fam\u00edlia."',
    '"As marcas nas dobras dos bra\u00e7os contam outra coisa a quem l\u00ea o tra\u00e7o."',
    '"Abriram Klara para medir. Quanto de entidade, quanto de menina."',
    '"A m\u00e3e anotava os n\u00fameros. O pai entrou uma vez e nunca mais."'
]},

{ t:'nar', tx:'Ele baixou a folha e olhou para a parede.' },
{ t:'inn', tx:'Uma vez. O suficiente.' },
{ t:'inn', tx:'Saber o bastante para n\u00e3o precisar saber o resto.' },
{ t:'pause' },

{ t:'spr', ch:'matheo', ex:'neutral', pos:'center' },
{ t:'nar', tx:'A autoriza\u00e7\u00e3o de campo tinha levado quarenta minutos.' },
{ t:'nar', tx:'Ele n\u00e3o releu o dossi\u00ea de Nidhaus antes de assinar. J\u00e1 tinha lido uma vez.' },
{ t:'pause' },
{ t:'inn', tx:'Uma vez. O suficiente.' },
{ t:'nar', tx:'Recolocou a folha sobre a mesa e continuou lendo.' },

/* ======================================================================
   P8 - A ESCRIBA DE LERVEL
   Sem alibi. Ele leu a ficha antes de assinar.
   O pensamento unico do capitulo mora aqui.
   ====================================================================== */
{ t:'scene', id:'p8_escriba', chapter:'prologo', title:'A escriba de Lervel',
  bg:'bg_archive_closeup', bgm:'bgm_archive' },

{ t:'arc', key:'arquivo', lns:[
    '"Nos registros de pessoal da casa encontrei algu\u00e9m que passou por Nidhaus antes de mim."',
    '"Trinta e sete anos atr\u00e1s. Consta como a escriba de Lervel."',
    '"Seis meses depois: partiu por motivo de sa\u00fade."',
    '"N\u00e3o existe registro do destino dela. Nem aqui, nem l\u00e1."'
]},

{ t:'nar', tx:'Nem l\u00e1.' },
{ t:'inn', tx:'L\u00e1 \u00e9 o meu arquivo.' },
{ t:'pause' },

{ t:'nar', tx:'Ele tinha aberto aquela ficha uma semana antes de assinar a autoriza\u00e7\u00e3o.' },
{ t:'nar', tx:'Lembrava do papel. Lembrava da letra do escritur\u00e1rio que escreveu a \u00faltima linha.' },
{ t:'inn', tx:'Motivo de sa\u00fade.' },
{ t:'pause' },
{ t:'inn', tx:'Eu li aquilo e assinei mesmo assim.' },
{ t:'nar', tx:'Virou a p\u00e1gina com a m\u00e3o firme.' },

/* ======================================================================
   P9 - A PERGUNTA
   Aqui, e so aqui, as duas camadas de tempo se contaminam.
   ====================================================================== */
{ t:'scene', id:'p9_pergunta', chapter:'prologo', title:'A pergunta',
  bg:'bg_archive_closeup' },

{ t:'nar', tx:'A entrada seguinte estava separada do resto por dois dedos de papel em branco.' },

{ t:'arc', key:'arquivo', lns:[
    '"Matheo \u2014 se voc\u00ea estiver lendo isto, preciso de uma resposta que n\u00e3o posso pedir de outro jeito."',
    '"Voc\u00ea sabia?"'
]},

{ t:'bgm', id:null },
{ t:'pause' },

{ t:'dial', ch:'antoniette', tx:'Voc\u00ea sabia?' },
{ t:'pause' },
{ t:'dial', ch:'matheo', tx:'Sabia.' },
{ t:'pause' },
{ t:'nar', tx:'Ele ouviu a pr\u00f3pria voz na sala vazia e n\u00e3o achou estranho.' },

{ t:'sfx', id:'sfx_page_turn' },
{ t:'nar', tx:'Virou a p\u00e1gina procurando a linha seguinte.' },
{ t:'nar', tx:'A pergunta ocupava a p\u00e1gina inteira e o resto era papel limpo.' },
{ t:'pause' },
{ t:'nar', tx:'Ela deixou o espa\u00e7o da resposta e foi embora antes de poder receb\u00ea-la.' },

/* ======================================================================
   P10 - A ULTIMA ENTRADA
   A mascara cai. O colapso e de silencio.
   Aqui entra a unica frase longa e desnorteada do capitulo.
   ====================================================================== */
{ t:'scene', id:'p10_ultima', chapter:'prologo', title:'A \u00faltima entrada',
  bg:'bg_prologue_room' },
{ t:'spr', ch:'matheo', ex:'hollow', pos:'center' },

{ t:'nar', tx:'As \u00faltimas p\u00e1ginas eram diferentes.' },
{ t:'nar', tx:'A caligrafia continuava firme. O espa\u00e7amento n\u00e3o.' },
{ t:'nar', tx:'Ele conhecia aquela escrita havia oito anos.' },
{ t:'pause' },

{ t:'last', key:'ultima', lns:[
    'Para quem encontrar isto.',
    '',
    'N\u00e3o sei seu nome. N\u00e3o sei se voc\u00ea \u00e9 da Ordem ou se chegou',
    'aqui por outro caminho. Tanto faz.',
    '',
    'Existe uma menina em Velha Nidhaus chamada Klara Rabenfels.',
    '',
    'Treze anos. L\u00ea mais r\u00e1pido do que qualquer pessoa que eu conheci.',
    'Corrige os outros em voz baixa, para n\u00e3o constranger ningu\u00e9m.',
    'Ri de coisas que ningu\u00e9m mais achou gra\u00e7a, e ri depois, quando',
    'j\u00e1 passou, quando acha que n\u00e3o tem ningu\u00e9m olhando.',
    '',
    'Foi escolhida antes de nascer para morrer de um jeito que a',
    'fam\u00edlia dela chama de tradi\u00e7\u00e3o.',
    '',
    'Tentei tir\u00e1-la daqui.',
    'Fui met\u00f3dica. Fui devagar.',
    'Foi o devagar que custou.',
    '',
    'Est\u00e1 tudo nas p\u00e1ginas anteriores. Datas, plantas, hor\u00e1rios de',
    'guarda, o que funciona e o que n\u00e3o funciona. Cinco anos de',
    'trabalho. Use.',
    '',
    'Tirei quatro p\u00e1ginas. Se voc\u00ea chegar at\u00e9 elas, vai entender',
    'por qu\u00ea. Se n\u00e3o chegar, melhor.',
    '',
    'V\u00e1 mais r\u00e1pido do que eu fui.',
    '',
    'O conhecimento n\u00e3o foi suficiente.',
    'Mas \u00e9 o que fica.',
    '',
    '\u2014 A.V.',
    'Velha Nidhaus, agosto.'
]},

{ t:'nar', tx:'Ele ficou com a \u00faltima p\u00e1gina na m\u00e3o.' },
{ t:'pause' },

{ t:'nar', tx:'Estendeu a m\u00e3o para a pena.' },
{ t:'nar', tx:'A m\u00e3o chegou at\u00e9 a pena e parou ali.' },
{ t:'pause' },

/* A frase longa, uma so, depois de todo o capitulo em frase curta. */
{ t:'inn', tx:'Ele pensou em escrever para Vantrell, e em escrever para o tribunal da Marca, e em escrever para a irm\u00e3 dela em Alsbeck que n\u00e3o sabia de nada e ia ter de saber por algu\u00e9m, e pensou que qualquer uma dessas cartas levaria doze dias para chegar e que doze dias eram quatro vezes o tempo que ele tinha desperdi\u00e7ado tentando fazer tr\u00eas dias significarem alguma coisa, e ainda estava com a pena na m\u00e3o quando percebeu que n\u00e3o havia mais ningu\u00e9m para quem escrever.' },
{ t:'pause' },

{ t:'sfx', id:'sfx_wind' },
{ t:'nar', tx:'O vento contra o vidro parou.' },
{ t:'nar', tx:'A cera parou de estalar.' },
{ t:'nar', tx:'Sobrou a pr\u00f3pria respira\u00e7\u00e3o.' },
{ t:'pause' },
{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'A segunda vela apagou.' },
{ t:'pause' },
{ t:'nar', tx:'Ele n\u00e3o se moveu.' },
{ t:'spr_hide', ch:'matheo' },

/* ======================================================================
   P11 - CORTE
   ====================================================================== */
{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'title',
  main:'ARQUIVO RABENFELS',
  sub:'"O conhecimento n\u00e3o foi suficiente. Mas \u00e9 o que fica."',
  time:'Cinco anos antes.' },
{ t:'fade_out' }

];

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.PROLOGUE; }
