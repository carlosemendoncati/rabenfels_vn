/* ==========================================================================
   ARQUIVO RABENFELS - js/data/prologue.js
   PROLOGO: "O Arquivo"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.
   Tipos de beat documentados em js/engine.js.

   O PENSAMENTO UNICO DESTE CAPITULO (Zinsser, unidade):
   "Ele leu a ficha da escriba e assinou mesmo assim."
   Nenhum outro capitulo pode deixar este pensamento.

   Posicao no arco: Matheo Drell recebe o Arquivo tres dias depois do
   ponto morto combinado e le a noite inteira. O jogador conhece primeiro
   a leitura O Arquivo; as decisoes podem produzir outro documento.

   Sem escolha nenhuma, de proposito. E o unico capitulo em que o jogador
   so assiste.

   CANON APLICADO (docs/biblia_narrativa_rabenfels.md):
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
{ t:'nar', tx:'O mensageiro entregou o pacote com as duas mãos e não esperou recibo.' },
{ t:'nar', tx:'Matheo Drell não esperava visita. Por princípio, nunca esperava.' },
{ t:'inn', tx:'Quem trabalha com informação aprende cedo. Visita não marcada estraga o resto do dia.' },

{ t:'nar', tx:'Couro encerado, cordel escuro, sem selo.' },
{ t:'nar', tx:'Pesava mais do que devia para o tamanho.' },
{ t:'inn', tx:'Couro encerado. Chuva na estrada arruina papel.', if:{ relendo:true } },
{ t:'inn', tx:'Ela pensou na chuva.', if:{ relendo:true } },
{ t:'nar', tx:'O cordel estava dado em quatro voltas e um nó cego, do jeito que se amarra o que não deve abrir sozinho na estrada.' },
{ t:'pause' },

{ t:'nar', tx:'O endereço estava escrito em letra miúda e controlada.' },
{ t:'nar', tx:'Ele reconheceu a letra antes de ler o nome.' },

{ t:'inn', tx:'Noventa e três dias.' },
{ t:'nar', tx:'Ela tinha estabelecido noventa. Sem notícia em noventa dias, o ponto morto dispara.' },
{ t:'nar', tx:'Ele passou os últimos três tentando fazer com que três dias significassem alguma coisa.' },
{ t:'pause' },
{ t:'inn', tx:'Não significavam.' },

{ t:'nar', tx:'Levou o pacote para a mesa e acendeu a segunda vela.' },
{ t:'nar', tx:'O couro tinha cheiro de cavalo e de cera velha. Estava frio de estrada e demorou a esquentar sob a mão dele.' },
{ t:'inn', tx:'Relatório de campo. Leia como relatório de campo.' },

/* ======================================================================
   P2 - AS PAGINAS CONTADAS
   O metodo dele, mostrado uma vez, para que a perda tenha medida.
   Aqui entra o beat de uma palavra e a numeracao que nao fecha.
   ====================================================================== */
{ t:'scene', id:'p2_paginas', chapter:'prologo', title:'As páginas contadas',
  bg:'bg_archive_closeup', bgm:'bgm_archive' },
{ t:'spr', ch:'matheo', ex:'read', pos:'center' },

{ t:'sfx', id:'sfx_page_turn' },
{ t:'nar', tx:'Ele contou as páginas antes de ler a primeira. Fazia isso com qualquer documento novo.' },
{ t:'pause' },
{ t:'nar', tx:'Duzentas.' },
{ t:'nar', tx:'Duzentas e cinquenta.' },
{ t:'nar', tx:'Duzentas e oitenta e sete.' },
{ t:'pause' },

{ t:'nar', tx:'A numeração dela terminava em duzentos e noventa e um.' },
{ t:'inn', tx:'Faltam quatro.' },
{ t:'pause', if:{ relendo:true } },
{ t:'inn', tx:'Duzentos e oitenta e oito. Duzentos e oitenta e nove. Duzentos e noventa. Duzentos e noventa e um.', if:{ relendo:true } },
{ t:'inn', tx:'Quatro números. Ele os diria em voz alta a vida inteira sem saber o que estava dizendo.', if:{ relendo:true } },
{ t:'pause' },
{ t:'nar', tx:'Ele passou o polegar pela dobra interna. O corte era reto e antigo, feito com lâmina e com tempo.' },
{ t:'inn', tx:'Ou ela tirou, ou tiraram dela.' },
{ t:'nar', tx:'Ele anotou o número num canto do mata-borrão e não voltou ao assunto naquela noite.' },
{ t:'pause' },
{ t:'nar', tx:'Foi a última coisa profissional que ele fez.' },

{ t:'nar', tx:'Letra densa. Títulos formais. Rodapés numerados até o fim.' },
{ t:'inn', tx:'Ela numerou até o que não precisava.' },
{ t:'nar', tx:'No canto da capa, em tinta mais nova que o resto:' },

{ t:'arc', key:'arquivo', lns:[
    '— ARQUIVO RABENFELS —',
    'Fragmentos da Linhagem, da Marca e do Pacto',
    '[ à mão ] "Para Matheo. Leia tudo. — A.V."'
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
{ t:'scene', id:'p3_kharvel', keepSprites:true, chapter:'prologo', title:'Khar’Vel',
  bg:'bg_archive_closeup' },

{ t:'arc', key:'arquivo', lns:[
    '"Khar’Vel não é um deus. Deuses recebem orações e as ignoram. Ela recebe oferendas e as consome."',
    '"Khar’Vel não é um demônio. Demônios corrompem de fora. Ela cresce de dentro."',
    '"Morre e renasce sem parar. Nunca no próprio corpo. Em outros."'
]},

{ t:'inn', tx:'Khar’Vel.' },
{ t:'inn', tx:'Vinte anos procurando uma referência verificável para essa palavra.' },
{ t:'inn', tx:'Ela achou em quatro.' },
{ t:'pause' },

{ t:'nar', tx:'Ele leu as três linhas outra vez, agora prestando atenção no formato.' },
{ t:'inn', tx:'Ela definiu a coisa três vezes dizendo o que a coisa não é.' },
{ t:'inn', tx:'Arquivista faz isso quando o catálogo não tem a categoria.' },
{ t:'pause' },
{ t:'inn', tx:'Ela não achou onde guardar aquilo.' },

{ t:'sfx', id:'sfx_page_turn' },
{ t:'nar', tx:'Ele desceu ao rodapé. Ela citava a origem de cada linha, com data e arquivo.' },
{ t:'nar', tx:'Ele conhecia duas das fontes. Tinha catalogado uma delas com as próprias mãos, quinze anos antes.' },
{ t:'pause' },
{ t:'inn', tx:'Está tudo conferível. Ela sabia que eu ia conferir.' },

/* As borboletas entram aqui, uma vez, e deixam vestigio fisico.
   O Epilogo retoma. */
{ t:'arc', key:'arquivo', lns:[
    '"Todo agosto, nas terras próximas à Marca, aparecem borboletas de asa clara com veias vermelhas."',
    '"Duram três semanas. As aldeias não as matam e não falam delas."',
    '"Em trezentos anos de registros, a família nunca escreveu uma linha sobre o fenômeno."'
]},

{ t:'inn', tx:'Ela anotou o silêncio deles como se fosse um dado.' },
{ t:'pause' },

/* A fome e o vazio. Antoniette registrou o sintoma sem nunca entender
   que estava registrando alguem do outro lado. O jogador so entende
   no Capitulo 11, e o Compilador nunca entendeu. NAO EXPLICAR AQUI. */
{ t:'arc', key:'arquivo', lns:[
    '"O sujeito K. relata, desde os seis anos, dois estados recorrentes:"',
    '"fome fora de hora e o que ela chama de um vazio."',
    '"Vêm juntos, duram de uma a três horas, e passam sozinhos."',
    '"Ela descreve como se descreve dor de cabeça. Não atribui a nada."'
]},
{ t:'nar', tx:'Matheo leu duas vezes e não encontrou a linha seguinte.' },
{ t:'inn', tx:'Ela larga o assunto aqui.' },
{ t:'pause' },
{ t:'inn', tx:'Ela nunca larga assunto nenhum.' },
{ t:'pause', if:{ relendo:true } },
{ t:'nar', tx:'Ela largou porque não havia mais nada. A menina não atribuía a nada porque não havia nada a que atribuir, do lado dela.', if:{ relendo:true } },
{ t:'nar', tx:'Do outro lado havia, e contava.', if:{ relendo:true } },
{ t:'pause' },
{ t:'nar', tx:'Na dobra da folha seguinte havia uma asa seca, prensada pelo peso das páginas.' },
{ t:'nar', tx:'Clara, com uma veia vermelha atravessando.' },
{ t:'nar', tx:'Ele soprou de leve. A asa não se moveu. Estava colada ao papel havia meses.' },
{ t:'pause' },
{ t:'nar', tx:'Ele passou adiante sem escrever nada a respeito.' },
{ t:'pause', if:{ relendo:true } },
{ t:'nar', tx:'A asa ficaria ali por mais sete anos, e a veia vermelha não desbotaria.', if:{ relendo:true } },
{ t:'nar', tx:'Ele voltaria a abrir nessa dobra sem contar as páginas, uma vez, numa tarde de maio.', if:{ relendo:true } },

/* ======================================================================
   P4 - O COMPILADOR
   As notas viram sistema: cada uma se defende de uma acusacao
   que ninguem fez.
   ====================================================================== */
{ t:'scene', id:'p4_compilador', keepSprites:true, chapter:'prologo', title:'O Compilador',
  bg:'bg_archive_closeup' },

{ t:'nar', tx:'As notas de rodapé eram assinadas por um Compilador.' },
{ t:'nar', tx:'Terceira pessoa do começo ao fim. Nunca "eu". Nunca o nome dela.' },
{ t:'inn', tx:'Duzentas e oitenta e sete páginas escrevendo sobre si mesma como se fosse outra pessoa.' },
{ t:'pause' },
{ t:'inn', tx:'É o que a Ordem ensina. Ela aprendeu comigo.' },

{ t:'nar', tx:'A maior parte das notas era método puro. De onde veio o dado, quem contou, o que não foi possível confirmar.' },

{ t:'arc', key:'compilador', label:'— nota do Compilador —', lns:[
    '17. Sobre o andar fechado, duas versões circulam entre a criadagem.',
    'Uma fala em umidade. A outra em obras que nunca começaram.',
    'Fonte única em ambos os casos. O Compilador registra as duas e não escolhe.'
]},

{ t:'inn', tx:'Ela registrava até o que sabia que era mentira.' },
{ t:'inn', tx:'Boa técnica. Eu ensinei essa.' },
{ t:'pause' },

{ t:'nar', tx:'A voz se manteve por cento e quarenta páginas.' },
{ t:'sfx', id:'sfx_page_turn' },
{ t:'nar', tx:'Escorregou na cento e quarenta e um.' },

{ t:'arc', key:'compilador', label:'— nota do Compilador —', lns:[
    '41. O sujeito K. tem oito anos na data desta entrada.',
    'O Compilador registra a idade porque a idade entra no cálculo do ciclo.',
    'Não por outro motivo.'
]},

{ t:'nar', tx:'Ele leu a última linha duas vezes.' },
{ t:'inn', tx:'Ninguém escreve "não por outro motivo" quando não há outro motivo.' },
{ t:'pause' },
{ t:'nar', tx:'A numeração seguia adiante. Ela não voltou para corrigir.' },

/* ======================================================================
   P5 - A CAMARA DO CASULO
   Substituicao, nao transformacao. Sensorial: temperatura.
   ====================================================================== */
{ t:'scene', id:'p5_casulo', keepSprites:true, chapter:'prologo', title:'A câmara do casulo',
  bg:'bg_archive_closeup' },

{ t:'arc', key:'arquivo', lns:[
    '"Os registros mais antigos da propriedade chamam o lugar de a câmara do casulo."',
    '"A família adotou outros nomes depois. Ala de estudos. Ala norte. O andar fechado."',
    '"A câmara do casulo é a única denominação honesta que esta casa já produziu."'
]},

{ t:'nar', tx:'Ele leu a frase de novo.' },
{ t:'inn', tx:'A câmara do casulo.' },
{ t:'pause' },

{ t:'inn', tx:'Ele sabia como funciona um casulo. A lagarta se desfaz por dentro e o que sai da casca é feito do que ela era.' },
{ t:'pause' },
{ t:'inn', tx:'Aqui a casca fica com a menina dentro.' },
{ t:'inn', tx:'O que sai, sai de outro corpo. Inteiro. Sem ter pago nada.' },

{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'A vela da esquerda apagou. Ele continuou com a que restou.' },
{ t:'nar', tx:'A cera esfriou depressa. Ele só percebeu porque a mão que segurava a folha começou a doer no nó.' },

/* ======================================================================
   P6 - AS GEMEAS
   Klara vampira, Liara humana. O exame confirma.
   ====================================================================== */
{ t:'scene', id:'p6_gemeas', keepSprites:true, chapter:'prologo', title:'As gêmeas',
  bg:'bg_archive_closeup', bgm:'bgm_archive' },

{ t:'arc', key:'arquivo', lns:[
    '"Nasceram gêmeas, como nasce toda geração desta casa. O ritual garante o par."',
    '"Liara nasceu humana. Klara nasceu vampira. A diferença era visível na primeira hora."',
    '"Os guardiões examinaram Klara mesmo assim. Procuravam um calor específico no sangue."',
    '"O exame não servia para descobrir qual das duas. Isso já se sabia."',
    '"Servia para confirmar que a entidade tinha pegado."',
    '"Registro da casa, mesma data: a escolhida foi identificada. O ciclo continua."'
]},

{ t:'bgm', id:null },
{ t:'pause' },
{ t:'inn', tx:'Um laudo.' },
{ t:'inn', tx:'Eles conferiram uma criança de horas como quem confere uma remessa.' },
{ t:'pause' },

{ t:'inn', tx:'Ela tinha oito anos quando Antoniette chegou.' },
{ t:'inn', tx:'Oito.' },
{ t:'pause' },
{ t:'inn', tx:'E Antoniette ficou cinco.' },
{ t:'nar', tx:'Ele não terminou a conta.' },

/* ======================================================================
   P7 - O TREINAMENTO
   O reconhecimento vem pelo eco da frase, sem que ninguem o enuncie.
   ====================================================================== */
{ t:'scene', id:'p7_experimentos', keepSprites:true, chapter:'prologo', title:'O treinamento',
  bg:'bg_archive_closeup' },
{ t:'sfx', id:'sfx_page_turn' },

{ t:'arc', key:'arquivo', lns:[
    '"A casa chama de treinamento. Rotina de família."',
    '"As marcas nas dobras dos braços contam outra coisa a quem lê o traço."',
    '"Abriram Klara para medir. Quanto de entidade, quanto de menina."',
    '"A mãe anotava os números. O pai entrou uma vez e nunca mais."'
]},

{ t:'nar', tx:'Ele baixou a folha e olhou para a parede.' },
{ t:'inn', tx:'Uma vez. O suficiente.' },
{ t:'inn', tx:'Saber o bastante para não precisar saber o resto.' },
{ t:'pause' },

{ t:'spr', ch:'matheo', ex:'neutral', pos:'center' },
{ t:'nar', tx:'A autorização de campo tinha levado quarenta minutos.' },
{ t:'nar', tx:'Ele não releu o dossiê de Nidhaus antes de assinar. Já tinha lido uma vez.' },
{ t:'pause' },
{ t:'inn', tx:'Uma vez. O suficiente.' },
{ t:'nar', tx:'Recolocou a folha sobre a mesa e continuou lendo.' },

/* ======================================================================
   P8 - A ESCRIBA DE LERVEL
   Sem alibi. Ele leu a ficha antes de assinar.
   O pensamento unico do capitulo mora aqui.
   ====================================================================== */
{ t:'scene', id:'p8_escriba', keepSprites:true, chapter:'prologo', title:'A escriba de Lervel',
  bg:'bg_archive_closeup', bgm:'bgm_archive' },

{ t:'arc', key:'arquivo', lns:[
    '"Nos registros de pessoal da casa encontrei alguém que passou por Nidhaus antes de mim."',
    '"Trinta e sete anos atrás. Consta como a escriba de Lervel."',
    '"Seis meses depois: partiu por motivo de saúde."',
    '"Não existe registro do destino dela. Nem aqui, nem lá."'
]},

{ t:'nar', tx:'Nem lá.' },
{ t:'inn', tx:'Lá é o meu arquivo.' },
{ t:'pause' },

{ t:'nar', tx:'Ele tinha aberto aquela ficha uma semana antes de assinar a autorização.' },
{ t:'nar', tx:'Lembrava do papel. Lembrava da letra do escriturário que escreveu a última linha.' },
{ t:'inn', tx:'Motivo de saúde.' },
{ t:'pause' },
{ t:'inn', tx:'Eu li aquilo e assinei mesmo assim.' },
{ t:'nar', tx:'Virou a página com a mão firme.' },

/* ======================================================================
   P9 - A PERGUNTA
   Aqui, e so aqui, as duas camadas de tempo se contaminam.
   ====================================================================== */
{ t:'scene', id:'p9_pergunta', keepSprites:true, chapter:'prologo', title:'A pergunta',
  bg:'bg_archive_closeup' },

{ t:'nar', tx:'A entrada seguinte estava separada do resto por dois dedos de papel em branco.' },

{ t:'arc', key:'arquivo', lns:[
    '"Matheo — se você estiver lendo isto, preciso de uma resposta que não posso pedir de outro jeito."',
    '"Você sabia?"'
]},

{ t:'bgm', id:null },
{ t:'pause' },

{ t:'dial', ch:'antoniette', tx:'Você sabia?' },
{ t:'pause' },
{ t:'dial', ch:'matheo', tx:'Sabia.' },
{ t:'pause' },
{ t:'nar', tx:'Ele ouviu a própria voz na sala vazia e não achou estranho.' },

{ t:'sfx', id:'sfx_page_turn' },
{ t:'nar', tx:'Virou a página procurando a linha seguinte.' },
{ t:'nar', tx:'A pergunta ocupava a página inteira e o resto era papel limpo.' },
{ t:'pause' },
{ t:'nar', tx:'Ela deixou o espaço da resposta e foi embora antes de poder recebê-la.' },
/* ======================================================================
   P10 - A ULTIMA ENTRADA
   A mascara cai. O colapso e de silencio.
   Aqui entra a unica frase longa e desnorteada do capitulo.
   ====================================================================== */
{ t:'scene', id:'p10_ultima', chapter:'prologo', title:'A última entrada',
  bg:'bg_prologue_room' },
{ t:'spr', ch:'matheo', ex:'hollow', pos:'center' },

{ t:'nar', tx:'As últimas páginas eram diferentes.' },
{ t:'nar', tx:'A caligrafia continuava firme. O espaçamento não.' },
{ t:'nar', tx:'Ele conhecia aquela escrita havia oito anos.' },
{ t:'pause' },

{ t:'last', key:'ultima', lns:[
    'Para quem encontrar isto.',
    '',
    'Não sei seu nome. Não sei se você é da Ordem ou se chegou',
    'aqui por outro caminho. Tanto faz.',
    '',
    'Existe uma menina em Velha Nidhaus chamada Klara Rabenfels.',
    '',
    'Doze anos. Lê mais rápido do que qualquer pessoa que eu conheci.',
    'Corrige os outros em voz baixa, para não constranger ninguém.',
    'Ri de coisas que ninguém mais achou graça, e ri depois, quando',
    'já passou, quando acha que não tem ninguém olhando.',
    '',
    'Foi escolhida antes de nascer para morrer de um jeito que a',
    'família dela chama de tradição.',
    '',
    'Tentei tirá-la daqui.',
    'Fui metódica. Fui devagar.',
    'Foi o devagar que custou.',
    '',
    'Está tudo nas páginas anteriores. Datas, plantas, horários de',
    'guarda, o que funciona e o que não funciona. Cinco anos de',
    'trabalho. Use.',
    '',
    'Tirei quatro páginas. Se você chegar até elas, vai entender',
    'por quê. Se não chegar, melhor.',
    '',
    'Vá mais rápido do que eu fui.',
    '',
    'O conhecimento não foi suficiente.',
    'Mas é o que fica.',
    '',
    '— A.V.',
    'Velha Nidhaus, agosto.'
]},

{ t:'nar', tx:'Ele ficou com a última página na mão.' },
{ t:'pause' },

{ t:'nar', tx:'Estendeu a mão para a pena.' },
{ t:'nar', tx:'A mão chegou até a pena e parou ali.' },
{ t:'pause' },

/* A frase longa, uma so, depois de todo o capitulo em frase curta. */
{ t:'inn', tx:'Ele pensou em escrever para Vantrell, e em escrever para o tribunal da Marca, e em escrever para a irmã dela em Alsbeck que não sabia de nada e ia ter de saber por alguém, e pensou que qualquer uma dessas cartas levaria doze dias para chegar e que doze dias eram quatro vezes o tempo que ele tinha desperdiçado tentando fazer três dias significarem alguma coisa, e ainda estava com a pena na mão quando percebeu que não havia mais ninguém para quem escrever.' },
{ t:'pause' },

{ t:'sfx', id:'sfx_wind' },
{ t:'nar', tx:'O vento contra o vidro parou.' },
{ t:'nar', tx:'A cera parou de estalar.' },
{ t:'nar', tx:'Sobrou a própria respiração.' },
{ t:'pause' },
{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'A segunda vela apagou.' },
{ t:'pause' },
{ t:'nar', tx:'Ele não se moveu.' },
{ t:'spr_hide', ch:'matheo' },

/* ======================================================================
   P11 - CORTE
   ====================================================================== */
{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'nar', tx:'Cinco anos antes daquela noite, uma mulher de vinte anos abriu a janela de uma carruagem e deixou aberta.', if:{ relendo:true } },
{ t:'nar', tx:'Ela achou bonito e anotou que tinha achado, porque impressão de chegada muda em três semanas e ninguém lembra qual era.', if:{ relendo:true } },
{ t:'pause', if:{ relendo:true } },
{ t:'title',
  main:'ARQUIVO RABENFELS',
  sub:'"O conhecimento não foi suficiente. Mas é o que fica."',
  time:'Cinco anos antes.' },
{ t:'fade_out' }

];

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.PROLOGUE; }
