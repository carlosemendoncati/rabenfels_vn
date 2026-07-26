/* ==========================================================================
   ARQUIVO RABENFELS - js/data/chapter1.js
   CAPITULO 1: "A Chegada"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.

   QUANDO: Ano 1, abril. Klara e Liara tem oito anos.

   NOTA DE DIRECAO (documento mestre, obedecida aqui):
   "Onde o Prologo foi escuridao, silencio e peso, o Capitulo 1 deve
   comecar com algo que quase parece normal. A ameaca esta presente desde
   o primeiro frame, mas ainda vestida com as roupas da beleza."
   Por isso a estrada de abril e bonita. O que esta errado chega depois,
   pequeno, e nunca e apontado.

   CANON APLICADO (biblia_revisao_v2.md):
   - Klara nasceu vampira. Liara nasceu humana e SABE que a irma e
     vampira; acha que as duas vivem a mesma vida.
   - So Klara passa por procedimentos. So Klara tem curativo.
   - Klara fala pouco e nao fala bonito. Nada de enigma nem aforismo.
   - Liara e mimada, criada em outro regime, e fala mais.
   - Aldric administra. E cortes, nao mente, e nao diz o nome de Klara.
   - Serafina e mais calorosa com Antoniette do que com as filhas.
   - Antoniette nao e doce. Esta trabalhando.
   - A balada aparece uma vez, na boca da crianca da aldeia.

   Contrato com o Capitulo 2: a escolha 'cap1_relatorio' e a flag
   'archive_seed' nao mudam de nome.

   Nove cenas: C1 estrada, C2 portao, C3 salao, C4 quarto,
   C5 biblioteca (escolha), C6 retratos, C7 corredor, C8 relatorio
   (escolha), C9 meia-noite.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

/* --------------------------------------------------------------------------
   ESCOLHA 1 - A PERMISSAO
   -------------------------------------------------------------------------- */

var C1_ALDRIC_A = [
  { t:'dial', ch:'antoniette', tx:'Como quiser, senhor Rabenfels.' },
  { t:'spr', ch:'aldric', ex:'side', pos:'left' },
  { t:'nar', tx:'Ele esperou mais um instante do que a resposta pedia.' },
  { t:'dial', ch:'aldric', tx:'A senhorita \u00e9 f\u00e1cil de empregar.' },
  { t:'spr_hide', ch:'aldric' },
  { t:'pause' },
  { t:'inn', tx:'Ele me classificou em quatro palavras e desceu a escada.' },
  { t:'inn', tx:'Vou precisar de mais tempo do que planejei.' }
];

var C1_ALDRIC_B = [
  { t:'dial', ch:'antoniette', tx:'O que eu deveria estar procurando?' },
  { t:'spr', ch:'aldric', ex:'stare', pos:'left' },
  { t:'nar', tx:'A m\u00e3o dele parou no corrim\u00e3o por meio segundo.' },
  { t:'dial', ch:'aldric', tx:'Nada. A senhorita n\u00e3o deveria estar procurando.' },
  { t:'dial', ch:'aldric', tx:'Eu disse: se encontrar.' },
  { t:'spr_hide', ch:'aldric' },
  { t:'pause' },
  { t:'inn', tx:'Ele corrigiu o verbo duas vezes na mesma frase.' },
  { t:'inn', tx:'Homem nenhum corrige verbo por acaso.' },
  { t:'nar', tx:'Ela anotou a hora junto com a frase.' }
];

var C1_ALDRIC_C = [
  { t:'nar', tx:'Antoniette n\u00e3o respondeu.' },
  { t:'spr', ch:'aldric', ex:'stare', pos:'left' },
  { t:'nar', tx:'A pausa durou o suficiente para virar uma pergunta.' },
  { t:'dial', ch:'aldric', tx:'Minha mulher acha que a senhorita vai gostar desta casa.' },
  { t:'pause' },
  { t:'dial', ch:'aldric', tx:'Eu acho que a casa vai gostar da senhorita.' },
  { t:'spr_hide', ch:'aldric' },
  { t:'nar', tx:'Desceu sem esperar resposta desta vez.' },
  { t:'pause' },
  { t:'inn', tx:'Ele preencheu o sil\u00eancio. Eu n\u00e3o precisei.' },
  { t:'inn', tx:'Quem preenche sil\u00eancio est\u00e1 administrando alguma coisa.' }
];

/* --------------------------------------------------------------------------
   ESCOLHA 2 - O PRIMEIRO RELATORIO
   A opcao C grava archive_seed. Nao renomear.
   -------------------------------------------------------------------------- */

var C1_RELATORIO_A = [
  { t:'nar', tx:'Ela escreveu as g\u00eameas em um par\u00e1grafo s\u00f3.' },
  { t:'inn', tx:'Duas crian\u00e7as de oito anos. Comportamento consistente com a linhagem. Sem distin\u00e7\u00e3o operacional relevante.' },
  { t:'nar', tx:'Releu. Estava correto.' },
  { t:'pause' },
  { t:'nar', tx:'A frase do corredor ficou de fora.' },
  { t:'nar', tx:'Ela lacrou o envelope.' },
  { t:'inn', tx:'E continuou com a pergunta.' }
];

var C1_RELATORIO_B = [
  { t:'nar', tx:'Ela abriu uma se\u00e7\u00e3o nova e escreveu um cabe\u00e7alho: sujeito K.' },
  { t:'inn', tx:'Registra o ambiente inteiro enquanto l\u00ea.' },
  { t:'inn', tx:'Responde a est\u00edmulo indireto antes de responder ao direto.' },
  { t:'nar', tx:'Encheu tr\u00eas p\u00e1ginas antes de olhar a hora.' },
  { t:'pause' },
  { t:'nar', tx:'Sobre a irm\u00e3, meia linha.' },
  { t:'inn', tx:'Uma delas virou dado. A outra virou contexto.' },
  { t:'nar', tx:'Ela lacrou o envelope sem reler a meia linha.' }
];

var C1_RELATORIO_C = [
  { t:'nar', tx:'O relat\u00f3rio para a Ordem levou vinte minutos. Fatos, medidas, nada al\u00e9m disso.' },
  { t:'nar', tx:'Ela lacrou o envelope e o deixou na beira da mesa.' },
  { t:'pause' },
  { t:'nar', tx:'Depois tirou do ba\u00fa de ferramentas um caderno em branco.' },
  { t:'nar', tx:'Sem data. Sem cabe\u00e7alho.' },

  { t:'arc', key:'sem_identificacao', label:'\u2014 caderno sem identifica\u00e7\u00e3o \u2014', lns:[
      'Por que ela n\u00e3o disse nada?'
  ]},

  { t:'inn', tx:'Isto n\u00e3o vai para Lervel.' },
  { t:'nar', tx:'Guardou o caderno debaixo do forro do ba\u00fa.' },
  { t:'pause' },
  { t:'inn', tx:'Um segundo caderno \u00e9 o come\u00e7o de uma segunda pessoa.' }
];

RBF.CHAPTER1 = [

{ t:'chap', num:'CAP\u00cdTULO 1', name:'A CHEGADA', chapter:'capitulo1' },
{ t:'fade_out' },

/* ======================================================================
   C1 - A ESTRADA DA MARCA CINZENTA - ABRIL, FIM DE TARDE
   Comeca bonito. A ameaca chega vestida de beleza.
   Saida: a crianca que canta e nao acena.
   ====================================================================== */
{ t:'scene', id:'c1_estrada', chapter:'capitulo1', title:'A estrada',
  bg:'bg_grey_march_road', bgm:'bgm_grey_march' },
{ t:'fade_in' },

{ t:'nar', tx:'Abril na Marca Cinzenta \u00e9 bonito de um jeito que ningu\u00e9m em Lervel acredita.' },
{ t:'nar', tx:'A n\u00e9voa fica baixa e o sol atravessa por cima dela. A luz chega deitada.' },
{ t:'nar', tx:'Antoniette Vael abriu a janela da carruagem e deixou aberta por dois quil\u00f4metros.' },
{ t:'pause' },

{ t:'nar', tx:'O vale se abriu na curva. Velha Nidhaus apareceu l\u00e1 embaixo, com o telhado molhado pegando o sol.' },
{ t:'inn', tx:'\u00c9 bonito.' },
{ t:'nar', tx:'Ela anotou a impress\u00e3o e a data, do jeito que anotava tudo.' },
{ t:'inn', tx:'Anotar que \u00e9 bonito serve para depois. Impress\u00e3o de chegada muda em tr\u00eas semanas e ningu\u00e9m lembra qual era.' },

{ t:'nar', tx:'Releu o dossi\u00ea de quarenta p\u00e1ginas que tinha decorado em Lervel.' },
{ t:'inn', tx:'Reler n\u00e3o \u00e9 inseguran\u00e7a. \u00c9 confer\u00eancia.' },
{ t:'nar', tx:'Dobrou o dossi\u00ea e guardou na mala menor.' },

{ t:'sfx', id:'sfx_wind' },
{ t:'nar', tx:'A estrada entrou na floresta e ficou escura de repente, do jeito que fica quando as copas se tocam.' },
{ t:'nar', tx:'Correu assim por tr\u00eas quil\u00f4metros sem abrir uma clareira.' },
{ t:'inn', tx:'O dossi\u00ea dizia densa.' },
{ t:'pause' },
{ t:'inn', tx:'As \u00e1rvores crescem umas em dire\u00e7\u00e3o \u00e0s outras.' },

{ t:'nar', tx:'A aldeia veio depois da floresta. Quinze casas caiadas, um po\u00e7o, roupa no varal.' },
{ t:'nar', tx:'Uma menina de uns seis anos estava sentada na mureta do po\u00e7o, cantando.' },
{ t:'pause' },

{ t:'arc', key:'balada', label:'\u2014 cantiga da Marca \u2014', lns:[
    'Cantai, cantai, as filhas do pacto,',
    'uma nasce casulo, uma nasce intacta,',
    'cantai, cantai, o ciclo que n\u00e3o para...'
]},

{ t:'inn', tx:'Cantiga de roda. Anotar a letra antes de esquecer.' },
{ t:'nar', tx:'A carruagem passou a tr\u00eas metros dela.' },
{ t:'nar', tx:'A menina parou de cantar e ficou olhando at\u00e9 a carruagem sumir.' },
{ t:'pause' },
{ t:'nar', tx:'N\u00e3o acenou.' },

{ t:'arc', key:'caderno', label:'\u2014 Caderno Operacional \u2014', lns:[
    'Aldeia a quatro quil\u00f4metros de Nidhaus. Quinze casas.',
    'Cantiga local recolhida na chegada. Letra transcrita em anexo.',
    'A crian\u00e7a n\u00e3o acenou.'
]},
{ t:'inn', tx:'Sem valor operacional. Anotado mesmo assim.' },

/* ======================================================================
   C2 - O PORTAO - ENTARDECER
   Fenn. Saida: ele responde uma pergunta que ela nao fez.
   ====================================================================== */
{ t:'scene', id:'c2_portao', chapter:'capitulo1', title:'O port\u00e3o',
  bg:'bg_nidhaus_gate', bgm:'bgm_nidhaus' },

{ t:'nar', tx:'A carruagem parou a duzentos metros do port\u00e3o.' },
{ t:'nar', tx:'O cocheiro desceu as duas malas e o ba\u00fa ali mesmo, na estrada.' },
{ t:'dial', ch:'antoniette', tx:'O port\u00e3o \u00e9 logo ali.' },
{ t:'nar', tx:'Ele concordou com a cabe\u00e7a e continuou descarregando.' },
{ t:'pause' },
{ t:'inn', tx:'Concordou comigo e n\u00e3o se mexeu. As duas coisas ao mesmo tempo.' },

{ t:'sfx', id:'sfx_door' },
{ t:'nar', tx:'O port\u00e3o abriu sem ranger.' },
{ t:'inn', tx:'Ferro desse peso deveria ranger. Algu\u00e9m engraxa este port\u00e3o toda semana.' },

{ t:'spr', ch:'fenn', ex:'neutral', pos:'center' },
{ t:'nar', tx:'Um homem de meia-idade veio buscar a bagagem. Uniforme cinzento, sem bordado.' },
{ t:'dial', ch:'fenn', tx:'Senhorita Vael. A fam\u00edlia esperava a senhorita amanh\u00e3.' },
{ t:'dial', ch:'antoniette', tx:'Sa\u00ed de Lervel um dia antes. Espero n\u00e3o desarrumar a casa.' },
{ t:'dial', ch:'fenn', tx:'A casa n\u00e3o desarruma.' },

{ t:'nar', tx:'Ele pegou o ba\u00fa de ferramentas primeiro, sem perguntar qual das malas era qual.' },
{ t:'dial', ch:'fenn', tx:'Fenn. Respondo pela casa. O que precisar, pede a mim.' },
{ t:'inn', tx:'Contato visual pelo tempo exato. Nem um segundo al\u00e9m.' },
{ t:'inn', tx:'Isso \u00e9 treino.' },

{ t:'sfx', id:'sfx_footsteps' },
{ t:'nar', tx:'Atravessaram o p\u00e1tio. As janelas do andar de baixo estavam fechadas apesar do calor de abril.' },
{ t:'nar', tx:'No canto nordeste havia uma porta sem janela, com uma corrente leve no puxador.' },
{ t:'pause' },
{ t:'nar', tx:'A corrente n\u00e3o tinha cadeado.' },
{ t:'inn', tx:'Aquilo ali serve para saber que algu\u00e9m entrou.' },

{ t:'nar', tx:'Fenn parou at\u00e9 ela terminar de olhar.' },
{ t:'dial', ch:'fenn', tx:'O p\u00e1tio \u00e9 atalho para a cozinha. A casa inteira usa.' },
{ t:'spr_hide', ch:'fenn' },
{ t:'inn', tx:'Ele acabou de responder uma pergunta que eu n\u00e3o fiz.' },

/* ======================================================================
   C3 - O SALAO PRINCIPAL - NOITE
   Serafina. Mais calorosa com Antoniette do que com as filhas.
   Saida: a ausencia de Aldric registrada como informacao.
   ====================================================================== */
{ t:'scene', id:'c3_salao', chapter:'capitulo1', title:'O sal\u00e3o',
  bg:'bg_main_hall', bgm:'bgm_nidhaus' },

{ t:'nar', tx:'O teto do sal\u00e3o era alto demais para a largura da sala.' },
{ t:'nar', tx:'Retratos nas paredes. Rostos diferentes, olhos iguais.' },

{ t:'spr', ch:'serafina', ex:'neutral', pos:'right' },
{ t:'nar', tx:'Serafina Rabenfels desceu a escada com o passo de quem j\u00e1 sabia a que horas a carruagem tinha chegado.' },
{ t:'inn', tx:'O retrato do dossi\u00ea mostra uma mulher que escolheu esta vida.' },
{ t:'inn', tx:'Esta aqui construiu a vida dela com material que n\u00e3o era dela.' },

{ t:'dial', ch:'serafina', tx:'Senhorita Vael. Bem-vinda a Velha Nidhaus.' },
{ t:'dial', ch:'antoniette', tx:'Senhora Rabenfels. A cole\u00e7\u00e3o da fam\u00edlia tem reputa\u00e7\u00e3o at\u00e9 em Lervel.' },
{ t:'spr', ch:'serafina', ex:'smirk', pos:'right' },
{ t:'nar', tx:'O sorriso chegou aos olhos no tempo certo e saiu no tempo certo.' },
{ t:'inn', tx:'Sem nenhuma falha t\u00e9cnica.' },

{ t:'spr', ch:'serafina', ex:'direct', pos:'right' },
{ t:'dial', ch:'serafina', tx:'Li sua carta de recomenda\u00e7\u00e3o tr\u00eas vezes.' },
{ t:'dial', ch:'antoniette', tx:'Tr\u00eas?' },
{ t:'dial', ch:'serafina', tx:'Leio um documento at\u00e9 parar de encontrar coisa nova nele.' },
{ t:'pause' },
{ t:'inn', tx:'Eu li o dossi\u00ea quatro vezes pelo mesmo motivo.' },

{ t:'dial', ch:'serafina', tx:'Nove meses de contrato para quatro mil volumes.' },
{ t:'dial', ch:'antoniette', tx:'\u00c9 o que foi combinado.' },
{ t:'dial', ch:'serafina', tx:'Combinado \u00e9 o que se escreve antes de conhecer o trabalho.' },

{ t:'nar', tx:'Uma das filhas apareceu no alto da escada, de camisola, e desceu dois degraus.' },
{ t:'spr', ch:'serafina', ex:'side', pos:'right' },
{ t:'dial', ch:'serafina', tx:'Liara. Cama.' },
{ t:'nar', tx:'A menina subiu de volta sem reclamar.' },
{ t:'pause' },
{ t:'inn', tx:'Duas palavras para a filha. Vinte para mim.' },

{ t:'spr', ch:'serafina', ex:'neutral', pos:'right' },
{ t:'dial', ch:'serafina', tx:'Mandei preparar o quarto do lado leste para a senhorita. \u00c9 o de melhor vista para o p\u00e1tio.' },
{ t:'dial', ch:'antoniette', tx:'Obrigada.' },
{ t:'dial', ch:'serafina', tx:'Fenn a leva. A copa fica aberta at\u00e9 meia-noite.' },
{ t:'nar', tx:'Ela se afastou tendo dito exatamente o que planejou dizer.' },
{ t:'spr_hide', ch:'serafina' },

{ t:'pause' },
{ t:'inn', tx:'Nenhuma men\u00e7\u00e3o ao senhor da casa.' },
{ t:'inn', tx:'Aus\u00eancia sem explica\u00e7\u00e3o tamb\u00e9m \u00e9 informa\u00e7\u00e3o.' },

/* ======================================================================
   C4 - QUARTO DE ANTONIETTE - NOITE
   Metodo, primeira entrada, o item cinco.
   ====================================================================== */
{ t:'scene', id:'c4_quarto', chapter:'capitulo1', title:'O quarto',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'Quarto confort\u00e1vel sem ser caloroso. Mesa de trabalho, vela, papel de sobra.' },
{ t:'nar', tx:'Ela desfez as malas na ordem de sempre: ferramentas primeiro, nada da Ordem \u00e0 vista.' },

{ t:'nar', tx:'Depois mediu o quarto a passo, como media qualquer sala nova.' },
{ t:'nar', tx:'Quatorze passos de parede a parede. O corredor l\u00e1 fora tinha dezessete at\u00e9 a mesma esquina.' },
{ t:'pause' },
{ t:'inn', tx:'Tr\u00eas passos de parede. Nenhuma casa gasta tr\u00eas passos de parede.' },
{ t:'nar', tx:'Anotou o n\u00famero e deixou sem explica\u00e7\u00e3o.' },

{ t:'nar', tx:'A janela dava para o p\u00e1tio traseiro. Dali via-se a porta nordeste inteira.' },
{ t:'inn', tx:'Serafina escolheu este quarto. Disse que ele tem a melhor vista do p\u00e1tio.' },
{ t:'pause' },
{ t:'inn', tx:'Cortesia e permiss\u00e3o custam o mesmo na entrada. S\u00f3 uma cobra depois.' },

{ t:'nar', tx:'Sentou. Abriu o caderno operacional. Escreveu a data.' },

{ t:'arc', key:'caderno', label:'\u2014 Caderno Operacional \u2014 Entrada 1 \u2014', lns:[
    'Chegada em Velha Nidhaus. Cobertura est\u00e1vel. Recep\u00e7\u00e3o sem incidente.',
    '1. Discrep\u00e2ncia de tr\u00eas passos entre o quarto leste e o corredor. Verificar planta.',
    '2. Serafina Rabenfels: controle excepcional. Monitorar.',
    '3. Aldric Rabenfels: ausente na recep\u00e7\u00e3o. Deliberado ou protocolo da casa.',
    '4. Porta nordeste do p\u00e1tio: corrente sem cadeado. Registro de passagem.',
    '5. A floresta ao norte n\u00e3o cresce em dire\u00e7\u00e3o ao sol.'
]},

{ t:'nar', tx:'Ela olhou o item cinco.' },
{ t:'inn', tx:'Observa\u00e7\u00e3o subjetiva. Sem valor operacional document\u00e1vel.' },
{ t:'nar', tx:'Riscou.' },
{ t:'pause' },
{ t:'nar', tx:'Desriscou.' },
{ t:'inn', tx:'Detalhe subjetivo que sobrevive ao descarte costuma ser relevante. Protocolo da Ordem, p\u00e1gina quarenta e dois.' },

{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'Apagou a vela. No p\u00e1tio, a corrente continuou parada.' },

/* ======================================================================
   C5 - A BIBLIOTECA - MANHA SEGUINTE
   Aldric. Escolha 1.
   ====================================================================== */
{ t:'scene', id:'c5_biblioteca', chapter:'capitulo1', title:'A biblioteca',
  bg:'bg_library', bgm:'bgm_nidhaus' },
{ t:'fade_in' },

{ t:'nar', tx:'De manh\u00e3 Fenn a deixou na porta da biblioteca e n\u00e3o entrou.' },
{ t:'inn', tx:'Nem olhou para dentro.' },
{ t:'nar', tx:'Dois andares de estantes. As lombadas mostravam quais se\u00e7\u00f5es a fam\u00edlia usava.' },
{ t:'nar', tx:'No canto nordeste do segundo andar as estantes estavam viradas para dentro, sem luz direta.' },
{ t:'nar', tx:'Antoniette subiu a escada.' },
{ t:'nar', tx:'Latim. Uma l\u00edngua que ela n\u00e3o reconheceu. Datas de dois s\u00e9culos atr\u00e1s.' },
{ t:'pause' },

{ t:'sfx', id:'sfx_footsteps' },
{ t:'nar', tx:'Passos no andar de baixo. Lentos, regulares, com o peso de quem sabe que o ch\u00e3o \u00e9 dele.' },
{ t:'spr', ch:'aldric', ex:'cold', pos:'left' },
{ t:'nar', tx:'Ele viu Antoniette no segundo andar sem demonstrar surpresa.' },
{ t:'dial', ch:'aldric', tx:'Senhorita Vael.' },
{ t:'nar', tx:'Disse o nome dela como quem confere uma lista.' },
{ t:'dial', ch:'antoniette', tx:'Senhor Rabenfels. N\u00e3o sabia que era esperada aqui.' },
{ t:'dial', ch:'aldric', tx:'N\u00e3o era. Vim buscar um documento.' },

{ t:'spr', ch:'aldric', ex:'side', pos:'left' },
{ t:'nar', tx:'Subiu, passou por ela no corredor estreito e tirou um rolo de uma caixa sem procurar.' },

{ t:'dial', ch:'aldric', tx:'A senhorita cataloga por estante ou por assunto?' },
{ t:'dial', ch:'antoniette', tx:'Por estante. Assunto \u00e9 o que se descobre depois.' },
{ t:'pause' },
{ t:'spr', ch:'aldric', ex:'cold', pos:'left' },
{ t:'dial', ch:'aldric', tx:'Correto.' },
{ t:'inn', tx:'Ele acabou de corrigir uma prova.' },

{ t:'dial', ch:'antoniette', tx:'A cole\u00e7\u00e3o \u00e9 maior do que o contrato previa. Vou precisar de mais tempo.' },
{ t:'dial', ch:'aldric', tx:'Leve o tempo que precisar.' },

{ t:'nar', tx:'Desceu. Parou no meio da escada, de costas.' },
{ t:'spr', ch:'aldric', ex:'stare', pos:'left' },
{ t:'dial', ch:'aldric', tx:'A se\u00e7\u00e3o nordeste do segundo andar est\u00e1 fora do escopo contratado.' },
{ t:'dial', ch:'aldric', tx:'Se encontrar algo l\u00e1, traga a mim antes de catalogar.' },
{ t:'pause' },

{ t:'inn', tx:'Ele n\u00e3o disse para eu n\u00e3o subir.' },
{ t:'inn', tx:'Disse para levar a ele antes de catalogar.' },

{ t:'cho', id:'cap1_aldric', code:'C-I', prompt:'A PERMISS\u00c3O', opts:[
  { id:'A',
    tx:'Aceitar a permiss\u00e3o como ela foi dada. N\u00e3o dar a ele nada para medir.',
    flags:{ aldric_reply:'A', aldric_pressed:false },
    routes:{ loss: 1 },
    then: C1_ALDRIC_A },
  { id:'B',
    tx:'Perguntar o que ela deveria estar procurando.',
    flags:{ aldric_reply:'B', aldric_pressed:true },
    routes:{ answer: 2 },
    then: C1_ALDRIC_B },
  { id:'C',
    tx:'N\u00e3o responder. Deixar o sil\u00eancio trabalhar por ela.',
    flags:{ aldric_reply:'C', aldric_pressed:false },
    routes:{ answer: 1 },
    then: C1_ALDRIC_C }
]},

{ t:'sfx', id:'sfx_door' },
{ t:'nar', tx:'A porta da biblioteca fechou no andar de baixo.' },
{ t:'pause' },
{ t:'inn', tx:'A segunda frase dele confirma que h\u00e1 alguma coisa naquela se\u00e7\u00e3o.' },
{ t:'inn', tx:'E que ele conta com o fato de que eu vou encontrar.' },
{ t:'pause' },
{ t:'inn', tx:'Por qu\u00ea?' },
{ t:'nar', tx:'Ela anotou a hip\u00f3tese, releu e riscou. Faltava evid\u00eancia.' },
{ t:'inn', tx:'Continuava sendo a mais prov\u00e1vel.' },

/* ======================================================================
   C6 - A GALERIA DE RETRATOS - MEIO DA TARDE
   O ciclo, visto por quem ainda nao sabe que existe um ciclo.
   ====================================================================== */
{ t:'scene', id:'c6_retratos', chapter:'capitulo1', title:'A galeria',
  bg:'bg_portrait_hall', bgm:null },

{ t:'nar', tx:'O caminho mais curto entre a biblioteca e a ala leste passa por um corredor de retratos.' },
{ t:'nar', tx:'Nove gera\u00e7\u00f5es, da mais antiga \u00e0 mais recente, na ordem.' },
{ t:'inn', tx:'Casa que pendura retrato em ordem cronol\u00f3gica quer que algu\u00e9m leia a ordem.' },

{ t:'nar', tx:'Ela leu.' },
{ t:'pause' },
{ t:'nar', tx:'Cada gera\u00e7\u00e3o tinha duas filhas. Todas as nove.' },
{ t:'inn', tx:'Nove gera\u00e7\u00f5es sem um filho. Estatisticamente improv\u00e1vel.' },
{ t:'inn', tx:'Improv\u00e1vel n\u00e3o chega a ser imposs\u00edvel. Anotar e seguir.' },

{ t:'nar', tx:'Nos nove quadros as duas meninas posavam do mesmo jeito.' },
{ t:'nar', tx:'Uma de frente. A outra meio passo atr\u00e1s, sempre \u00e0 direita.' },
{ t:'pause' },
{ t:'inn', tx:'Conven\u00e7\u00e3o de composi\u00e7\u00e3o. O pintor copia o quadro anterior.' },
{ t:'inn', tx:'Nove pintores diferentes ao longo de duzentos anos copiando a mesma conven\u00e7\u00e3o.' },

{ t:'nar', tx:'No fim da fila havia uma moldura vazia.' },
{ t:'nar', tx:'Ela passou o dedo na borda de baixo. Saiu limpo.' },
{ t:'pause' },
{ t:'nar', tx:'O p\u00f3 da parede parava exatamente ali.' },
{ t:'inn', tx:'Algu\u00e9m limpa uma moldura que n\u00e3o tem quadro.' },
{ t:'nar', tx:'Antoniette seguiu pelo corredor sem escrever nada.' },

/* ======================================================================
   C7 - O CORREDOR LESTE - FIM DE TARDE
   As gemeas, ouvidas e nunca encontradas.
   Liara sabe que a irma e vampira e acha que vivem a mesma vida.
   Klara fala pouco e nao fala bonito.
   ====================================================================== */
{ t:'scene', id:'c7_corredor', chapter:'capitulo1', title:'O corredor leste',
  bg:'bg_corridor', bgm:null },

{ t:'nar', tx:'Voltando com dois volumes, ela ouviu vozes no corredor leste.' },
{ t:'nar', tx:'A \u00faltima porta estava entreaberta.' },
{ t:'pause' },

{ t:'spr', ch:'liara', ex:'neutral', pos:'right' },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'nar', tx:'Duas meninas id\u00eanticas. Uma deitada sobre um mapa, batendo o p\u00e9 no ar. A outra lendo, com o dedo no texto.' },

{ t:'dial', ch:'liara', tx:'A senhora Elke falou que em Lervel tem uma casa s\u00f3 de livro. Do tamanho da capela.' },
{ t:'dial', ch:'klara', tx:'Biblioteca.' },
{ t:'dial', ch:'liara', tx:'\u00c9. Eu quero ir.' },
{ t:'dial', ch:'klara', tx:'Voc\u00ea quer ir em tudo.' },
{ t:'dial', ch:'liara', tx:'Voc\u00ea n\u00e3o quer?' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'Quero.' },

{ t:'nar', tx:'Liara rolou de barriga para cima e ficou olhando o teto.' },
{ t:'dial', ch:'liara', tx:'Mam\u00e3e disse que voc\u00ea n\u00e3o vai na feira de maio por causa do sol.' },
{ t:'dial', ch:'klara', tx:'Eu posso ir.' },
{ t:'dial', ch:'liara', tx:'Ela disse que n\u00e3o.' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o n\u00e3o posso.' },

{ t:'inn', tx:'A menina do mapa vai \u00e0 feira. A outra n\u00e3o.' },
{ t:'inn', tx:'E as duas tratam isso como se fosse o tempo.' },

{ t:'dial', ch:'liara', tx:'Co\u00e7a?' },
{ t:'dial', ch:'klara', tx:'N\u00e3o.' },
{ t:'dial', ch:'liara', tx:'Ontem co\u00e7ava.' },
{ t:'dial', ch:'klara', tx:'Hoje n\u00e3o.' },

{ t:'nar', tx:'Pela fresta, curativo no bra\u00e7o esquerdo da que lia. Dobra do cotovelo, atadura limpa.' },
{ t:'nar', tx:'A outra menina n\u00e3o tinha nenhum.' },
{ t:'inn', tx:'Anotado. Sem conclus\u00e3o.' },

{ t:'dial', ch:'liara', tx:'Amanh\u00e3 \u00e9 dia de treino.' },
{ t:'dial', ch:'klara', tx:'Eu sei.' },
{ t:'dial', ch:'liara', tx:'Voc\u00ea nem perguntou de qu\u00ea.' },
{ t:'dial', ch:'klara', tx:'\u00c9 sempre o mesmo.' },
{ t:'dial', ch:'liara', tx:'N\u00e3o \u00e9. Semana passada foi diferente.' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'Foi.' },

{ t:'nar', tx:'Klara virou a p\u00e1gina sem levantar os olhos.' },
{ t:'dial', ch:'klara', tx:'Voc\u00ea perdeu o marcador de novo.' },
{ t:'dial', ch:'liara', tx:'Como voc\u00ea\u2014' },
{ t:'dial', ch:'klara', tx:'Voc\u00ea apertou o l\u00e1pis quando eu disse mapa. Voc\u00ea faz isso quando perde alguma coisa.' },
{ t:'dial', ch:'liara', tx:'Isso \u00e9 chato.' },
{ t:'dial', ch:'klara', tx:'Est\u00e1 embaixo de voc\u00ea.' },

{ t:'nar', tx:'Liara levantou o quadril, achou o marcador e riu alto por uns cinco segundos.' },
{ t:'nar', tx:'A outra continuou lendo.' },

{ t:'nar', tx:'Antoniette ficou parada no corredor.' },
{ t:'inn', tx:'Ela achou o marcador sem tirar os olhos da p\u00e1gina.' },
{ t:'inn', tx:'Est\u00e1 registrando a sala inteira enquanto l\u00ea.' },
{ t:'pause' },
{ t:'inn', tx:'\u00c9 o que eu fa\u00e7o.' },

{ t:'nar', tx:'Klara virou a cabe\u00e7a um grau na dire\u00e7\u00e3o da porta. Voltou para o livro.' },
{ t:'spr_hide', ch:'klara' },
{ t:'spr_hide', ch:'liara' },
{ t:'inn', tx:'Ela sabe que tem algu\u00e9m aqui.' },
{ t:'pause' },
{ t:'inn', tx:'E n\u00e3o disse nada.' },
{ t:'nar', tx:'Antoniette andou at\u00e9 o fim do corredor antes de anotar. Anotar ali seria barulho.' },

/* ======================================================================
   C8 - QUARTO DE ANTONIETTE - NOITE
   Escolha 2.
   ====================================================================== */
{ t:'scene', id:'c8_relatorio', chapter:'capitulo1', title:'O primeiro relat\u00f3rio',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'\u00c0 noite, o relat\u00f3rio operacional para Matheo.' },
{ t:'nar', tx:'Ela molhou a pena e parou antes da primeira linha.' },
{ t:'inn', tx:'A pergunta do corredor n\u00e3o tem campo no formul\u00e1rio.' },

{ t:'cho', id:'cap1_relatorio', code:'C-I', prompt:'O PRIMEIRO RELAT\u00d3RIO', opts:[
  { id:'A',
    tx:'As duas juntas. Sujeitos de observa\u00e7\u00e3o, comportamento consistente com a linhagem.',
    flags:{ report_style:'A', distance_kept:true, klara_focus:false, archive_seed:false },
    routes:{ loss: 1 },
    then: C1_RELATORIO_A },
  { id:'B',
    tx:'Klara em se\u00e7\u00e3o pr\u00f3pria. Abrir monitoramento individual.',
    flags:{ report_style:'B', distance_kept:false, klara_focus:true, archive_seed:false },
    routes:{ answer: 1, loss: 1 },
    then: C1_RELATORIO_B },
  { id:'C',
    tx:'O relat\u00f3rio para a Ordem. E um caderno separado, para a pergunta que sobrou.',
    flags:{ report_style:'C', distance_kept:false, klara_focus:true, archive_seed:true },
    routes:{ answer: 1, hope: 1 },
    then: C1_RELATORIO_C }
]},

/* ======================================================================
   C9 - MEIA-NOITE
   ====================================================================== */
{ t:'scene', id:'c9_meia_noite', chapter:'capitulo1', title:'Meia-noite',
  bg:'bg_antoniette_room' },

{ t:'nar', tx:'Meia-noite. A vela estava pela metade.' },
{ t:'nar', tx:'O sil\u00eancio de Nidhaus tinha uma qualidade que ela ainda n\u00e3o sabia nomear.' },
{ t:'nar', tx:'Era o sil\u00eancio de antes de uma frase, n\u00e3o o de depois.' },
{ t:'pause' },

{ t:'nar', tx:'Da janela das g\u00eameas ainda vinha luz.' },
{ t:'inn', tx:'Quatro anos. Talvez cinco. Foi o que a Ordem estimou para um relat\u00f3rio completo do pacto.' },
{ t:'pause' },
{ t:'inn', tx:'Em quatro anos as duas ter\u00e3o doze.' },
{ t:'nar', tx:'Ela escreveu o n\u00famero na margem e n\u00e3o soube dizer por qu\u00ea.' },

{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'Apagou a vela e deitou no escuro.' },
{ t:'pause' },
{ t:'nar', tx:'No quarto das g\u00eameas, a luz ficou acesa mais uma hora.' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Primeiro ano em Velha Nidhaus.', line2:'Quatro ainda vir\u00e3o.',
  chapter:'capitulo1' },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.CHAPTER1; }
