/* ==========================================================================
   ARQUIVO RABENFELS - js/data/prologue.js
   PROLOGO: "O Arquivo"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.
   Tipos de beat documentados em js/engine.js.

   Posicao no arco: Matheo Drell recebe o Arquivo tres dias depois do
   ponto morto combinado e le a noite inteira. O jogador conhece o fim
   antes de viver o comeco; tudo o que vier depois e leitura de um
   documento que ja existe.

   O Prologo nao tem escolha, e isso e proposital. Nada aqui pode ser
   mudado por quem le. E o unico capitulo em que o jogador so assiste.

   Onze cenas:
     P1  o pacote
     P2  as paginas contadas
     P3  Khar'Vel
     P4  o Compilador
     P5  a camara do casulo
     P6  Klara
     P7  os experimentos
     P8  a escriba de Lervel
     P9  a pergunta
     P10 a ultima entrada
     P11 corte para cinco anos antes
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.PROLOGUE = [

/* ======================================================================
   P1 - O ESCRITORIO DE MATHEO - FIM DE TARDE
   Proposito: estabelecer o metodo dele e a conta dos noventa dias.
   Saida: ele reconhece a letra antes de ler o nome.
   ====================================================================== */
{ t:'scene', id:'p1_pacote', chapter:'prologo', title:'O pacote',
  bg:'bg_prologue_room', bgm:'bgm_prologue' },
{ t:'fade_in' },
{ t:'spr', ch:'matheo', ex:'neutral', pos:'center' },

{ t:'nar', tx:'A tarde morria quando o mensageiro bateu.' },
{ t:'nar', tx:'Matheo Drell n\u00e3o esperava visitas. Por princ\u00edpio, n\u00e3o por isolamento.' },
{ t:'inn', tx:'Quem trabalha com informa\u00e7\u00e3o aprende cedo. Visita n\u00e3o marcada traz alguma coisa que estraga o resto do dia.' },

{ t:'sfx', id:'sfx_package' },
{ t:'nar', tx:'O pacote era pequeno. Couro encerado, cordel escuro, sem selo.' },
{ t:'nar', tx:'O endere\u00e7o estava escrito em letra mi\u00fada e controlada.' },
{ t:'pause' },
{ t:'nar', tx:'Ele reconheceu a letra antes de ler o nome.' },

{ t:'inn', tx:'Noventa e tr\u00eas dias.' },
{ t:'nar', tx:'Ela tinha estabelecido noventa. Sem not\u00edcia em noventa dias, o ponto morto dispara.' },
{ t:'nar', tx:'Ele passou os \u00faltimos tr\u00eas tentando fazer com que tr\u00eas dias significassem alguma coisa.' },
{ t:'pause' },
{ t:'inn', tx:'N\u00e3o significavam.' },

{ t:'nar', tx:'Ele levou o pacote para a mesa e acendeu a segunda vela.' },
{ t:'inn', tx:'Relat\u00f3rio de campo. Leia como relat\u00f3rio de campo.' },

/* ======================================================================
   P2 - AS PAGINAS CONTADAS
   Proposito: o metodo dele, mostrado uma vez, para que a perda tenha
   medida depois.
   Saida: a dedicatoria.
   ====================================================================== */
{ t:'scene', id:'p2_paginas', chapter:'prologo', title:'As p\u00e1ginas contadas',
  bg:'bg_archive_closeup', bgm:'bgm_archive' },
{ t:'spr', ch:'matheo', ex:'read', pos:'center' },

{ t:'sfx', id:'sfx_page_turn' },
{ t:'nar', tx:'Ele contou as p\u00e1ginas antes de ler a primeira. Duzentas e oitenta e sete.' },
{ t:'nar', tx:'Era o que ele fazia com qualquer documento novo.' },
{ t:'pause' },
{ t:'nar', tx:'Foi a \u00faltima coisa profissional que ele fez naquela noite.' },

{ t:'nar', tx:'Letra densa. T\u00edtulos formais. Notas de rodap\u00e9 numeradas.' },
{ t:'inn', tx:'Ela numerou tudo. Numerou at\u00e9 o que n\u00e3o precisava.' },
{ t:'nar', tx:'No canto da capa, em tinta mais nova que o resto:' },

{ t:'arc', key:'arquivo', lns:[
    '\u2014 ARQUIVO RABENFELS \u2014',
    'Fragmentos da Linhagem, da Marca e do Pacto',
    '[ \u00e0 m\u00e3o ] "Para Matheo. Leia tudo. \u2014 A.V."'
]},

{ t:'inn', tx:'Leia tudo.' },
{ t:'inn', tx:'Em oito anos ela nunca me escreveu uma ordem.' },

/* ======================================================================
   P3 - KHAR'VEL
   Proposito: a definicao por negacao, que e a unica honesta.
   Saida: ele confere a fonte e a fonte existe.
   ====================================================================== */
{ t:'scene', id:'p3_kharvel', chapter:'prologo', title:'Khar\u2019Vel',
  bg:'bg_archive_closeup' },

{ t:'arc', key:'arquivo', lns:[
    '"Khar\u2019Vel n\u00e3o \u00e9 um deus. Deuses recebem ora\u00e7\u00f5es e as ignoram. Ela recebe oferendas e as consome."',
    '"Khar\u2019Vel n\u00e3o \u00e9 um dem\u00f4nio. Dem\u00f4nios corrompem de fora. Ela cresce de dentro."',
    '"Ela morre e renasce sem parar. Nunca no pr\u00f3prio corpo. Em outros."'
]},

{ t:'inn', tx:'Khar\u2019Vel.' },
{ t:'inn', tx:'Vinte anos procurando uma refer\u00eancia verific\u00e1vel para essa palavra.' },
{ t:'inn', tx:'Ela achou em quatro.' },

{ t:'sfx', id:'sfx_page_turn' },
{ t:'nar', tx:'Ele desceu ao rodap\u00e9. Ela citava a origem de cada linha.' },
{ t:'nar', tx:'Ele conhecia duas das fontes. Tinha catalogado uma delas.' },
{ t:'pause' },
{ t:'inn', tx:'Est\u00e1 tudo confer\u00edvel. Ela sabia que eu ia conferir.' },

/* ======================================================================
   P4 - O COMPILADOR
   Proposito: apresentar a voz das notas de rodape e a mascara.
   Saida: a mascara escorrega uma vez e ela nao corrige.
   ====================================================================== */
{ t:'scene', id:'p4_compilador', chapter:'prologo', title:'O Compilador',
  bg:'bg_archive_closeup' },

{ t:'nar', tx:'As notas de rodap\u00e9 eram assinadas por um Compilador.' },
{ t:'nar', tx:'Terceira pessoa do come\u00e7o ao fim. Nunca "eu". Nunca o nome dela.' },
{ t:'inn', tx:'Duzentas e oitenta e sete p\u00e1ginas escrevendo sobre si mesma como se fosse outra pessoa.' },
{ t:'pause' },
{ t:'inn', tx:'\u00c9 o que a Ordem ensina. Ela aprendeu comigo.' },

{ t:'nar', tx:'A voz n\u00e3o falhou uma \u00fanica vez.' },
{ t:'sfx', id:'sfx_page_turn' },
{ t:'nar', tx:'Falhou na p\u00e1gina cento e quarenta e um.' },

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
   Proposito: o primeiro nome proprio do horror, dado sem explicacao.
   Saida: a vela apaga e ele nao percebe.
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
{ t:'inn', tx:'Casulo n\u00e3o \u00e9 onde se guarda. \u00c9 onde se transforma.' },

{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'A vela da esquerda apagou. Ele continuou com a que restou.' },

/* ======================================================================
   P6 - KLARA
   Proposito: o nome e a idade. A conta que o jogador faz sozinho.
   Saida: ele nao termina a conta.
   ====================================================================== */
{ t:'scene', id:'p6_klara', chapter:'prologo', title:'A escolhida',
  bg:'bg_archive_closeup', bgm:'bgm_archive' },

{ t:'arc', key:'arquivo', lns:[
    '"Klara nasceu segundo. Sete minutos depois da irm\u00e3."',
    '"O exame dela demorou mais. Os guardi\u00f5es n\u00e3o procuravam anomalia vis\u00edvel."',
    '"Procuravam um calor espec\u00edfico no sangue. Um ritmo de batimento que n\u00e3o \u00e9 humano nem vamp\u00edrico."',
    '"Encontraram."',
    '"Registro da casa, mesma data: a escolhida foi identificada. O ciclo continua."'
]},

{ t:'bgm', id:null },
{ t:'pause' },
{ t:'inn', tx:'Ela tinha oito anos quando Antoniette chegou.' },
{ t:'inn', tx:'Oito.' },
{ t:'pause' },
{ t:'inn', tx:'E Antoniette ficou cinco.' },
{ t:'nar', tx:'Ele n\u00e3o terminou a conta.' },

/* ======================================================================
   P7 - OS EXPERIMENTOS
   Proposito: o reconhecimento. Ele assinou a autorizacao de campo.
   Saida: ele lembra o que almocou naquele dia.
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
{ t:'inn', tx:'Eu lembro daquela tarde. Lembro do que almocei.' },
{ t:'nar', tx:'Recolocou a folha sobre a mesa. Continuou lendo.' },

/* ======================================================================
   P8 - A ESCRIBA DE LERVEL
   Proposito: nao foi a primeira, e o registro foi fechado em casa.
   Saida: a porta que a propria Ordem fechou.
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
{ t:'inn', tx:'Algu\u00e9m em Lervel abriu aquela ficha, escreveu motivo de sa\u00fade e fechou.' },
{ t:'inn', tx:'Trinta e sete anos atr\u00e1s eu tinha nove.' },
{ t:'nar', tx:'A conclus\u00e3o chegou inteira. Ele a manteve fora das palavras por mais um par\u00e1grafo.' },

/* ======================================================================
   P9 - A PERGUNTA
   Proposito: o unico momento em que ela fala com ele diretamente.
   Saida: nao existe linha seguinte.
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
{ t:'sfx', id:'sfx_page_turn' },
{ t:'nar', tx:'Ele virou a p\u00e1gina procurando a linha seguinte.' },
{ t:'nar', tx:'N\u00e3o havia linha seguinte. A pergunta ocupava a p\u00e1gina inteira.' },
{ t:'pause' },
{ t:'nar', tx:'Ela deixou o espa\u00e7o da resposta e foi embora antes de poder receb\u00ea-la.' },

/* ======================================================================
   P10 - A ULTIMA ENTRADA
   Proposito: a mascara cai. Depois o colapso, que e de silencio.
   Saida: a mao chega ate a pena e para ali.
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
    'aqui por outro caminho. N\u00e3o importa.',
    '',
    'Existe uma menina em Velha Nidhaus chamada Klara Rabenfels.',
    '',
    'Treze anos. L\u00ea mais r\u00e1pido do que qualquer pessoa que eu conheci.',
    'Corrige os outros em voz baixa, para n\u00e3o constranger ningu\u00e9m.',
    'Protege a irm\u00e3 com uma calma que custa caro.',
    '',
    'Foi escolhida antes de nascer para morrer de um jeito que a',
    'fam\u00edlia dela chama de tradi\u00e7\u00e3o.',
    '',
    'Tentei tir\u00e1-la daqui.',
    'Fui cuidadosa. Fui met\u00f3dica. Fui devagar.',
    'Foi o devagar que custou.',
    '',
    'Est\u00e1 tudo nas p\u00e1ginas anteriores. Datas, nomes, plantas,',
    'hor\u00e1rios de guarda, o que funciona e o que n\u00e3o funciona.',
    'Cinco anos de trabalho. Use.',
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

/* O mundo e retirado uma camada por vez. Nada e afirmado. */
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
