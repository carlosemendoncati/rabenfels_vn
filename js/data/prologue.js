/* ==========================================================================
   ARQUIVO RABENFELS - data/prologue.js
   PROLOGO: "O Arquivo"
   Somente dados. Nenhum caminho de arquivo, nenhuma logica de render.
   Tipos de beat documentados em js/engine.js.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.PROLOGUE = [

/* --- P1 -- O pacote -------------------------------------------------- */
{ t:'scene', id:'p1_pacote', chapter:'prologo', bg:'bg_prologue_room', bgm:'bgm_prologue' },
{ t:'fade_in' },
{ t:'spr', ch:'matheo', ex:'neutral', pos:'center' },

{ t:'nar', tx:'A tarde morria quando o mensageiro bateu.' },
{ t:'nar', tx:'Matheo Drell n\u00e3o esperava visitas. Por princ\u00edpio, n\u00e3o por isolamento.' },
{ t:'inn', tx:'Quem trabalha com informa\u00e7\u00e3o aprende cedo. Visita n\u00e3o marcada traz alguma coisa que estraga o resto do dia.' },

{ t:'sfx', id:'sfx_package' },
{ t:'nar', tx:'O pacote era pequeno. Couro encerado, cordel escuro.' },
{ t:'nar', tx:'O endere\u00e7o estava escrito em letra mi\u00fada e controlada.' },
{ t:'nar', tx:'Ele reconheceu a letra antes de ler o nome.' },
{ t:'pause' },

{ t:'inn', tx:'Noventa e tr\u00eas dias.' },
{ t:'nar', tx:'Ela tinha estabelecido noventa. Sem not\u00edcias em noventa dias, o ponto morto dispara.' },
{ t:'nar', tx:'Ele passou os \u00faltimos tr\u00eas tentando fazer com que tr\u00eas dias significassem alguma coisa.' },
{ t:'pause' },
{ t:'inn', tx:'N\u00e3o significavam.' },

{ t:'sfx', id:'sfx_page_turn' },
{ t:'nar', tx:'Dentro, algumas centenas de p\u00e1ginas. Letra densa. T\u00edtulos formais. Notas de rodap\u00e9.' },
{ t:'nar', tx:'No canto da capa, em tinta mais nova que o resto:' },
{ t:'arc', lns:[
    '\u2014 ARQUIVO RABENFELS \u2014',
    'Fragmentos da Linhagem, da Marca e do Pacto',
    '[ \u00e0 m\u00e3o ] \u201cPara Matheo. Leia tudo. \u2014 A.V.\u201d'
]},

/* --- P2 -- A leitura comeca ------------------------------------------ */
{ t:'scene', id:'p2_leitura', chapter:'prologo', bg:'bg_archive_closeup', bgm:'bgm_archive' },
{ t:'spr', ch:'matheo', ex:'read', pos:'center' },
{ t:'nar', tx:'Ele acendeu a segunda vela e sentou.' },
{ t:'inn', tx:'Relat\u00f3rio de campo. Leia como relat\u00f3rio de campo.' },
{ t:'nar', tx:'Durou duas p\u00e1ginas.' },

{ t:'arc', lns:[
    '\u201cKhar\u2019Vel n\u00e3o \u00e9 um deus. Deuses recebem ora\u00e7\u00f5es e as ignoram. Ela recebe oferendas e as consome.\u201d',
    '\u201cKhar\u2019Vel n\u00e3o \u00e9 um dem\u00f4nio. Dem\u00f4nios corrompem de fora. Ela cresce de dentro.\u201d',
    '\u201cEla morre e renasce sem parar. Nunca no pr\u00f3prio corpo. Em outros.\u201d'
]},
{ t:'inn', tx:'Khar\u2019Vel.' },
{ t:'inn', tx:'Vinte anos procurando uma refer\u00eancia verific\u00e1vel para essa palavra.' },
{ t:'inn', tx:'Ela achou em quatro.' },

{ t:'sfx', id:'sfx_page_turn' },
{ t:'nar', tx:'Virou a p\u00e1gina.' },
{ t:'arc', lns:[
    '\u201cOs registros mais antigos da propriedade chamam o lugar de a c\u00e2mara do casulo.\u201d',
    '\u201c\u00c9 a \u00fanica denomina\u00e7\u00e3o honesta que a fam\u00edlia j\u00e1 produziu para o espa\u00e7o.\u201d'
]},
{ t:'nar', tx:'Ele leu a frase de novo.' },
{ t:'inn', tx:'A c\u00e2mara do casulo.' },
{ t:'nar', tx:'A vela da esquerda apagou. Ele n\u00e3o percebeu.' },
{ t:'pause' },

/* --- P3 -- As gemeas -------------------------------------------------- */
{ t:'scene', id:'p3_gemeas', chapter:'prologo', bg:'bg_archive_closeup' },
{ t:'arc', lns:[
    '\u201cKlara nasceu segundo.\u201d',
    '\u201cO exame dela demorou mais. Os guardi\u00f5es n\u00e3o procuravam anomalia vis\u00edvel.\u201d',
    '\u201cProcuravam um calor espec\u00edfico no sangue. Um ritmo de batimento que n\u00e3o \u00e9 humano nem vamp\u00edrico.\u201d',
    '\u201cEncontraram.\u201d',
    '\u201cRegistro da casa: a escolhida foi identificada. O ciclo continua.\u201d'
]},
{ t:'bgm', id:null },
{ t:'pause' },
{ t:'inn', tx:'Ela tinha oito anos quando Antoniette chegou.' },
{ t:'inn', tx:'Oito.' },
{ t:'pause' },
{ t:'inn', tx:'E Antoniette ficou cinco.' },
{ t:'nar', tx:'Ele n\u00e3o terminou a conta.' },

/* --- P4 -- Os experimentos e o reconhecimento ------------------------- */
{ t:'scene', id:'p4_experimentos', chapter:'prologo', bg:'bg_archive_closeup' },
{ t:'sfx', id:'sfx_page_turn' },
{ t:'arc', lns:[
    '\u201cDisseram que era treinamento. Rotina de fam\u00edlia.\u201d',
    '\u201cAs marcas nas dobras dos bra\u00e7os contam outra coisa a quem l\u00ea o tra\u00e7o.\u201d',
    '\u201cAbriram Klara para medir. Quanto de entidade, quanto de menina.\u201d',
    '\u201cA m\u00e3e anotava. O pai entrou uma vez e nunca mais.\u201d'
]},
{ t:'nar', tx:'Ele baixou a folha e olhou para a parede.' },
{ t:'inn', tx:'Uma vez. O suficiente.' },
{ t:'inn', tx:'Saber o bastante para n\u00e3o precisar saber o fim.' },
{ t:'pause' },
{ t:'inn', tx:'Ele assinou a autoriza\u00e7\u00e3o de campo em quarenta minutos.' },
{ t:'inn', tx:'N\u00e3o releu o dossier de Nidhaus antes de assinar.' },
{ t:'nar', tx:'Recolocou a folha sobre a mesa. Continuou lendo.' },

/* --- P5 -- O predecessor ---------------------------------------------- */
{ t:'scene', id:'p5_predecessor', chapter:'prologo', bg:'bg_archive_closeup', bgm:'bgm_archive' },
{ t:'arc', lns:[
    '\u201cNos registros da fam\u00edlia encontrei algu\u00e9m que passou por Nidhaus antes de mim.\u201d',
    '\u201cTrinta e sete anos atr\u00e1s. Nos registros de pessoal: a escriba de Lervel.\u201d',
    '\u201cSeis meses depois: partiu por motivo de sa\u00fade.\u201d',
    '\u201cN\u00e3o existe registro do destino dela.\u201d'
]},
{ t:'spr', ch:'matheo', ex:'neutral', pos:'center' },
{ t:'nar', tx:'A pr\u00f3xima linha estava separada do resto por dois dedos de papel em branco.' },
{ t:'arc', lns:[
    '\u201cMatheo \u2014 se voc\u00ea estiver lendo isto \u2014 preciso de uma resposta que n\u00e3o posso pedir de outro jeito.\u201d',
    '\u201cVoc\u00ea sabia?\u201d'
]},
{ t:'bgm', id:null },
{ t:'pause' },
{ t:'nar', tx:'A pergunta ficou sobre a mesa com o peso de oito anos de coisas n\u00e3o ditas.' },

/* --- P6 -- A ultima entrada ------------------------------------------- */
{ t:'scene', id:'p6_ultima_entrada', chapter:'prologo', bg:'bg_prologue_room' },
{ t:'spr', ch:'matheo', ex:'hollow', pos:'center' },
{ t:'nar', tx:'As \u00faltimas p\u00e1ginas eram diferentes.' },
{ t:'nar', tx:'A caligrafia continuava firme. O espa\u00e7amento n\u00e3o.' },
{ t:'nar', tx:'Ele conhecia aquela escrita havia oito anos.' },
{ t:'pause' },

{ t:'last', lns:[
    'Para quem encontrar isto.',
    '',
    'N\u00e3o sei seu nome. N\u00e3o sei se voc\u00ea \u00e9 da Ordem ou se chegou aqui por outro caminho.',
    'N\u00e3o importa.',
    '',
    'O que importa \u00e9 o que est\u00e1 escrito aqui.',
    '',
    'Existe uma menina em Velha Nidhaus chamada Klara Rabenfels.',
    '',
    'Treze anos. L\u00ea mais r\u00e1pido do que qualquer pessoa que eu conheci.',
    'Tem um humor que s\u00f3 aparece quando ela acha que ningu\u00e9m est\u00e1 olhando.',
    'Protege a irm\u00e3 com uma calma que custa caro.',
    '',
    'Foi escolhida antes de nascer para morrer de um jeito que a fam\u00edlia dela chama de tradi\u00e7\u00e3o.',
    '',
    'Tentei tir\u00e1-la de l\u00e1.',
    'N\u00e3o fui r\u00e1pida o bastante.',
    'N\u00e3o fui inteligente o bastante.',
    '',
    'Se voc\u00ea for, v\u00e1 com mais informa\u00e7\u00e3o do que eu tinha. Est\u00e1 tudo aqui.',
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

/* colapso sensorial: o mundo e retirado uma camada por vez */
{ t:'nar', tx:'O vento contra o vidro parou.' },
{ t:'nar', tx:'A cera parou de estalar.' },
{ t:'nar', tx:'Sobrou a pr\u00f3pria respira\u00e7\u00e3o.' },
{ t:'pause' },
{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'A vela apagou.' },
{ t:'pause' },
{ t:'nar', tx:'Ele n\u00e3o se moveu.' },
{ t:'spr_hide', ch:'matheo' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'title',
  main:'ARQUIVO RABENFELS',
  sub:'\u201cO conhecimento n\u00e3o foi suficiente. Mas \u00e9 o que fica.\u201d',
  time:'Cinco anos antes.' },
{ t:'fade_out' }

];

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.PROLOGUE; }
