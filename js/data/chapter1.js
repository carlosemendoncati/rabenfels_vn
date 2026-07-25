/* ==========================================================================
   ARQUIVO RABENFELS - js/data/chapter1.js
   CAPITULO 1: "A Chegada"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.
   Tipos de beat documentados em js/engine.js.

   Posicao no arco: primeiro dia e primeira manha de Antoniette em Velha
   Nidhaus. Ela chega com cobertura de catalogadora contratada e sai da
   cena final com uma pergunta que nao cabe em relatorio.

   Nao acontece aqui:
   - contato real com as gemeas (isso e o Capitulo 3)
   - qualquer explicacao sobre a natureza dos experimentos
   - qualquer mencao a antecessora alem do que o Prologo ja deu

   Nove cenas:
     C1 a estrada da Marca Cinzenta
     C2 o portao / Fenn
     C3 o salao / Serafina
     C4 o quarto / a primeira entrada operacional
     C5 a biblioteca / Aldric      -> escolha "A PERMISSAO"
     C6 a galeria de retratos
     C7 o corredor leste / as gemeas ouvidas, nunca encontradas
     C8 o primeiro relatorio       -> escolha "O PRIMEIRO RELATORIO"
     C9 meia-noite

   Contrato com o Capitulo 2: a escolha 'cap1_relatorio' e a flag
   'archive_seed' nao mudam de nome. O Capitulo 2 le essa flag em beats
   condicionais. Renomear qualquer uma das duas quebra aquele capitulo.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

/* --------------------------------------------------------------------------
   ESCOLHA 1 - A PERMISSAO (cena da biblioteca)

   Aldric proibe sem proibir. As tres respostas reconvergem no fim da
   mesma cena.
   -------------------------------------------------------------------------- */

var C1_ALDRIC_A = [
  { t:'dial', ch:'antoniette', tx:'Como quiser, senhor Rabenfels.' },
  { t:'spr', ch:'aldric', ex:'side', pos:'left' },
  { t:'nar', tx:'Ele esperou mais um instante do que a resposta merecia.' },
  { t:'dial', ch:'aldric', tx:'A senhorita \u00e9 f\u00e1cil de empregar.' },
  { t:'spr_hide', ch:'aldric' },
  { t:'pause' },
  { t:'inn', tx:'N\u00e3o foi elogio. Foi arquivamento.' },
  { t:'inn', tx:'Ele me classificou em quatro palavras e desceu a escada.' }
];

var C1_ALDRIC_B = [
  { t:'dial', ch:'antoniette', tx:'O que eu deveria estar procurando?' },
  { t:'spr', ch:'aldric', ex:'stare', pos:'left' },
  { t:'nar', tx:'A pergunta prendeu a m\u00e3o dele no corrim\u00e3o por meio segundo.' },
  { t:'dial', ch:'aldric', tx:'Nada. A senhorita n\u00e3o deveria estar procurando.' },
  { t:'dial', ch:'aldric', tx:'Eu disse: se encontrar.' },
  { t:'spr_hide', ch:'aldric' },
  { t:'pause' },
  { t:'inn', tx:'Ele corrigiu o verbo. Duas vezes na mesma frase.' },
  { t:'inn', tx:'Homem nenhum corrige verbo por acaso.' },
  { t:'nar', tx:'Ela anotou o hor\u00e1rio junto com a frase.' }
];

var C1_ALDRIC_C = [
  { t:'nar', tx:'Antoniette n\u00e3o respondeu.' },
  { t:'spr', ch:'aldric', ex:'stare', pos:'left' },
  { t:'nar', tx:'A pausa durou o suficiente para virar uma pergunta.' },
  { t:'dial', ch:'aldric', tx:'A minha mulher acha que a senhorita vai gostar desta casa.' },
  { t:'pause' },
  { t:'dial', ch:'aldric', tx:'Eu acho que a casa vai gostar da senhorita.' },
  { t:'spr_hide', ch:'aldric' },
  { t:'nar', tx:'Desceu sem esperar resposta desta vez.' },
  { t:'pause' },
  { t:'inn', tx:'Ele preencheu o sil\u00eancio. Eu n\u00e3o precisei.' },
  { t:'inn', tx:'Quem precisa preencher sil\u00eancio est\u00e1 administrando alguma coisa.' }
];

/* --------------------------------------------------------------------------
   ESCOLHA 2 - O PRIMEIRO RELATORIO (cena da noite)

   A opcao C grava archive_seed e e o embriao do Arquivo. Nao renomear.
   -------------------------------------------------------------------------- */

var C1_RELATORIO_A = [
  { t:'nar', tx:'Ela escreveu as g\u00eameas em um par\u00e1grafo s\u00f3.' },
  { t:'inn', tx:'Duas crian\u00e7as de oito anos. Comportamento consistente com linhagem sobrenatural. Sem distin\u00e7\u00e3o operacional relevante.' },
  { t:'nar', tx:'Releu. Estava correto.' },
  { t:'pause' },
  { t:'nar', tx:'A frase do corredor n\u00e3o entrou em lugar nenhum.' },
  { t:'nar', tx:'Ela lacrou o envelope.' },
  { t:'inn', tx:'E continuou com a pergunta.' }
];

var C1_RELATORIO_B = [
  { t:'nar', tx:'Ela abriu uma se\u00e7\u00e3o nova e escreveu um cabe\u00e7alho: sujeito K.' },
  { t:'inn', tx:'Aten\u00e7\u00e3o multifocal. Registra o ambiente inteiro enquanto l\u00ea.' },
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
  { t:'nar', tx:'N\u00e3o escreveu data. N\u00e3o escreveu cabe\u00e7alho.' },

  { t:'arc', key:'sem_identificacao', label:'\u2014 caderno sem identifica\u00e7\u00e3o \u2014', lns:[
      'Por que ela n\u00e3o disse nada?'
  ]},

  { t:'inn', tx:'Isto n\u00e3o vai para Lervel.' },
  { t:'nar', tx:'Guardou o caderno debaixo do forro do ba\u00fa.' },
  { t:'pause' },
  { t:'inn', tx:'Um segundo caderno \u00e9 o come\u00e7o de uma segunda pessoa.' }
];

RBF.CHAPTER1 = [

/* --- cartao de capitulo ---------------------------------------------- */
{ t:'chap', num:'CAP\u00cdTULO 1', name:'A CHEGADA', chapter:'capitulo1' },
{ t:'fade_out' },

/* ======================================================================
   C1 - A ESTRADA DA MARCA CINZENTA - FIM DE TARDE
   Proposito: o metodo de Antoniette e a textura da regiao.
   Saida: a crianca que nao acena.
   ====================================================================== */
{ t:'scene', id:'c1_estrada', chapter:'capitulo1', title:'A estrada',
  bg:'bg_grey_march_road', bgm:'bgm_grey_march' },
{ t:'fade_in' },

{ t:'nar', tx:'Duas horas de carruagem desde a \u00faltima troca de cavalos.' },
{ t:'nar', tx:'Antoniette Vael relia um dossi\u00ea de quarenta p\u00e1ginas que tinha decorado tr\u00eas semanas antes.' },
{ t:'inn', tx:'Reler n\u00e3o \u00e9 inseguran\u00e7a. \u00c9 confer\u00eancia.' },
{ t:'nar', tx:'Dobrou o dossi\u00ea. Guardou na mala menor. Olhou pela janela pela primeira vez em uma hora.' },
{ t:'pause' },

{ t:'nar', tx:'O cocheiro tinha cobrado o dobro a partir da bifurca\u00e7\u00e3o.' },
{ t:'nar', tx:'N\u00e3o explicou o pre\u00e7o e ela n\u00e3o perguntou.' },
{ t:'inn', tx:'O pre\u00e7o j\u00e1 \u00e9 a informa\u00e7\u00e3o. Perguntar s\u00f3 daria a ele tempo de inventar um motivo.' },

{ t:'sfx', id:'sfx_wind' },
{ t:'nar', tx:'A floresta acompanhou a estrada por tr\u00eas quil\u00f4metros sem abrir uma clareira.' },
{ t:'inn', tx:'O dossi\u00ea dizia densa.' },
{ t:'inn', tx:'As \u00e1rvores n\u00e3o crescem em dire\u00e7\u00e3o ao sol. Crescem umas em dire\u00e7\u00e3o \u00e0s outras.' },

{ t:'nar', tx:'A carruagem passou por uma aldeia. Quinze casas, um po\u00e7o, uma fonte com o cano virado para baixo.' },
{ t:'inn', tx:'Cano virado para baixo \u00e9 fonte fechada. Algu\u00e9m fechou e ningu\u00e9m tirou a fonte da pra\u00e7a.' },

{ t:'nar', tx:'Uma crian\u00e7a parou de brincar para ver a carruagem passar.' },
{ t:'pause' },
{ t:'nar', tx:'N\u00e3o acenou.' },

{ t:'arc', key:'caderno', label:'\u2014 Caderno Operacional \u2014', lns:[
    'Aldeia a quatro quil\u00f4metros de Nidhaus.',
    'Rela\u00e7\u00e3o com a fam\u00edlia: a verificar. Comportamento: circunspecto.',
    'A crian\u00e7a n\u00e3o acenou.'
]},
{ t:'inn', tx:'Sem valor operacional. Anotado mesmo assim.' },

/* ======================================================================
   C2 - O PORTAO DE VELHA NIDHAUS - ENTARDECER
   Proposito: Fenn, o portao e a porta nordeste.
   Saida: ele responde uma pergunta que ela nao fez.
   ====================================================================== */
{ t:'scene', id:'c2_portao', chapter:'capitulo1', title:'O port\u00e3o',
  bg:'bg_nidhaus_gate', bgm:'bgm_nidhaus' },

{ t:'nar', tx:'A carruagem parou a duzentos metros do port\u00e3o.' },
{ t:'nar', tx:'O cocheiro desceu as duas malas e o ba\u00fa na estrada, ali mesmo.' },
{ t:'dial', ch:'antoniette', tx:'O port\u00e3o \u00e9 logo ali.' },
{ t:'nar', tx:'Ele fez que sim com a cabe\u00e7a e continuou descarregando.' },
{ t:'pause' },
{ t:'inn', tx:'Ele concordou comigo e n\u00e3o se mexeu. As duas coisas ao mesmo tempo.' },

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
{ t:'inn', tx:'Isso n\u00e3o \u00e9 timidez. \u00c9 treino.' },

{ t:'sfx', id:'sfx_footsteps' },
{ t:'nar', tx:'Atravessaram o p\u00e1tio. As janelas do andar de baixo estavam fechadas apesar do calor.' },
{ t:'nar', tx:'No canto nordeste havia uma porta sem janela. Uma corrente leve no puxador.' },
{ t:'pause' },
{ t:'nar', tx:'A corrente n\u00e3o tinha cadeado.' },
{ t:'inn', tx:'N\u00e3o serve para impedir entrada. Serve para saber que algu\u00e9m entrou.' },

{ t:'nar', tx:'Fenn parou at\u00e9 ela terminar de olhar.' },
{ t:'dial', ch:'fenn', tx:'O p\u00e1tio \u00e9 atalho para a cozinha. A casa inteira usa.' },
{ t:'spr_hide', ch:'fenn' },
{ t:'inn', tx:'Ele acabou de responder uma pergunta que eu n\u00e3o fiz.' },

/* ======================================================================
   C3 - O SALAO PRINCIPAL - NOITE
   Proposito: Serafina. Dominio social e segunda camada em cada frase.
   Saida: a ausencia de Aldric registrada como informacao.
   ====================================================================== */
{ t:'scene', id:'c3_salao', chapter:'capitulo1', title:'O sal\u00e3o',
  bg:'bg_main_hall', bgm:'bgm_nidhaus' },

{ t:'nar', tx:'O teto do sal\u00e3o era alto demais para a largura da sala.' },
{ t:'nar', tx:'Retratos nas paredes. Rostos diferentes, olhos iguais.' },

{ t:'spr', ch:'serafina', ex:'neutral', pos:'right' },
{ t:'nar', tx:'Antoniette tinha lido a descri\u00e7\u00e3o no dossi\u00ea tr\u00eas vezes e visto o \u00fanico retrato dispon\u00edvel.' },
{ t:'inn', tx:'O retrato mostra uma mulher que escolheu esta vida.' },
{ t:'inn', tx:'Esta mulher construiu a vida dela com material que n\u00e3o era dela.' },

{ t:'dial', ch:'serafina', tx:'Senhorita Vael. Bem-vinda a Velha Nidhaus.' },
{ t:'dial', ch:'antoniette', tx:'Senhora Rabenfels. A cole\u00e7\u00e3o da fam\u00edlia tem reputa\u00e7\u00e3o at\u00e9 em Lervel.' },
{ t:'spr', ch:'serafina', ex:'smirk', pos:'right' },
{ t:'nar', tx:'O sorriso chegou aos olhos no tempo certo e saiu no tempo certo.' },
{ t:'inn', tx:'Nenhuma falha t\u00e9cnica. \u00c9 isso que est\u00e1 errado nele.' },

{ t:'spr', ch:'serafina', ex:'direct', pos:'right' },
{ t:'dial', ch:'serafina', tx:'Li sua carta de recomenda\u00e7\u00e3o tr\u00eas vezes.' },
{ t:'dial', ch:'antoniette', tx:'Tr\u00eas?' },
{ t:'dial', ch:'serafina', tx:'Leio um documento at\u00e9 parar de encontrar coisa nova nele.' },
{ t:'pause' },
{ t:'inn', tx:'Eu li o dossi\u00ea quatro vezes pelo mesmo motivo.' },

{ t:'dial', ch:'serafina', tx:'Nove meses de contrato. \u00c9 pouco para quatro mil volumes.' },
{ t:'dial', ch:'antoniette', tx:'\u00c9 o que foi combinado.' },
{ t:'spr', ch:'serafina', ex:'neutral', pos:'right' },
{ t:'dial', ch:'serafina', tx:'Combinado \u00e9 o que se escreve antes de conhecer o trabalho.' },
{ t:'pause' },

{ t:'dial', ch:'serafina', tx:'Mandei preparar o quarto do lado leste para a senhorita. \u00c9 o de melhor vista para o p\u00e1tio.' },
{ t:'dial', ch:'antoniette', tx:'Obrigada.' },
{ t:'spr', ch:'serafina', ex:'side', pos:'right' },
{ t:'dial', ch:'serafina', tx:'Fenn leva a senhorita. A copa fica aberta at\u00e9 meia-noite.' },
{ t:'nar', tx:'Ela se afastou tendo dito exatamente o que planejou dizer.' },
{ t:'spr_hide', ch:'serafina' },

{ t:'pause' },
{ t:'inn', tx:'Nenhuma men\u00e7\u00e3o ao senhor da casa.' },
{ t:'inn', tx:'Aus\u00eancia sem explica\u00e7\u00e3o tamb\u00e9m \u00e9 informa\u00e7\u00e3o.' },

/* ======================================================================
   C4 - QUARTO DE ANTONIETTE - NOITE
   Proposito: metodo, primeira entrada operacional, o item cinco.
   Saida: a corrente continua parada.
   ====================================================================== */
{ t:'scene', id:'c4_quarto', chapter:'capitulo1', title:'O quarto',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'Quarto confort\u00e1vel sem ser caloroso. Mesa de trabalho, vela, papel.' },
{ t:'nar', tx:'Ela desfez as malas na ordem de sempre: ferramentas primeiro, nada da Ordem \u00e0 vista.' },

{ t:'nar', tx:'Depois mediu o quarto a passo, como media qualquer sala nova.' },
{ t:'nar', tx:'Quatorze passos de parede a parede. O corredor l\u00e1 fora tinha dezessete at\u00e9 a mesma esquina.' },
{ t:'pause' },
{ t:'inn', tx:'Tr\u00eas passos de parede. Nenhuma casa gasta tr\u00eas passos de parede.' },
{ t:'nar', tx:'Ela anotou o n\u00famero sem tentar explic\u00e1-lo.' },

{ t:'nar', tx:'A janela dava para o p\u00e1tio traseiro. Daqui via-se a porta nordeste inteira.' },
{ t:'inn', tx:'Serafina escolheu este quarto. Disse que ele tem a melhor vista do p\u00e1tio.' },
{ t:'pause' },
{ t:'inn', tx:'Ou \u00e9 cortesia, ou \u00e9 permiss\u00e3o.' },
{ t:'inn', tx:'As duas custam o mesmo e s\u00f3 uma cobra depois.' },

{ t:'nar', tx:'Sentou. Abriu o caderno operacional. Escreveu a data.' },

{ t:'arc', key:'caderno', label:'\u2014 Caderno Operacional \u2014 Entrada 1 \u2014', lns:[
    'Chegada em Velha Nidhaus. Cobertura est\u00e1vel. Recep\u00e7\u00e3o sem incidente.',
    '1. Discrep\u00e2ncia de tr\u00eas passos entre o quarto leste e o corredor. Verificar planta.',
    '2. Serafina Rabenfels: controle excepcional. Monitorar.',
    '3. Aldric Rabenfels: ausente na recep\u00e7\u00e3o. Deliberado ou protocolo da casa.',
    '4. Porta nordeste do p\u00e1tio: corrente sem cadeado. Registro de passagem, n\u00e3o bloqueio.',
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
   Proposito: Aldric. Hostilidade controlada e a permissao que e
   armadilha. Escolha 1.
   Saida: a hipotese riscada que continua sendo a mais provavel.
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
{ t:'nar', tx:'N\u00e3o era pergunta. Era o aviso de que ele sabia o nome.' },
{ t:'dial', ch:'antoniette', tx:'Senhor Rabenfels. N\u00e3o sabia que era esperada aqui.' },
{ t:'dial', ch:'aldric', tx:'N\u00e3o era. Vim buscar um documento.' },

{ t:'spr', ch:'aldric', ex:'side', pos:'left' },
{ t:'nar', tx:'Subiu, passou por ela no corredor estreito e tirou um rolo de uma caixa sem procurar.' },

{ t:'dial', ch:'aldric', tx:'A senhorita cataloga por estante ou por assunto?' },
{ t:'dial', ch:'antoniette', tx:'Por estante. Assunto \u00e9 o que se descobre depois.' },
{ t:'pause' },
{ t:'spr', ch:'aldric', ex:'cold', pos:'left' },
{ t:'dial', ch:'aldric', tx:'Correto.' },
{ t:'inn', tx:'Ele n\u00e3o perguntou. Ele corrigiu uma prova.' },

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
   Proposito: o ciclo, visto por quem ainda nao sabe que existe um ciclo.
   Saida: uma moldura vazia sem po.
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
{ t:'inn', tx:'Improv\u00e1vel n\u00e3o \u00e9 imposs\u00edvel. Anotar e seguir.' },

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
   Proposito: as gemeas ouvidas, nunca encontradas. Assimetria e o
   reconhecimento de Antoniette em Klara.
   Saida: Klara sabe que tem alguem na porta e nao diz nada.
   ====================================================================== */
{ t:'scene', id:'c7_corredor', chapter:'capitulo1', title:'O corredor leste',
  bg:'bg_corridor', bgm:null },

{ t:'nar', tx:'Voltando com dois volumes, ela ouviu uma voz no corredor leste.' },
{ t:'nar', tx:'Algu\u00e9m cantarolava sem melodia, do jeito que se faz sem perceber.' },
{ t:'nar', tx:'A \u00faltima porta estava entreaberta.' },
{ t:'pause' },

{ t:'spr', ch:'liara', ex:'neutral', pos:'right' },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'nar', tx:'Duas meninas id\u00eanticas. Uma deitada sobre um mapa. A outra lendo, com o dedo no texto para n\u00e3o perder a linha.' },

{ t:'dial', ch:'liara', tx:'Se voc\u00ea n\u00e3o piscar eu vou come\u00e7ar a me preocupar.' },
{ t:'dial', ch:'klara', tx:'Estou piscando.' },
{ t:'dial', ch:'liara', tx:'Uma vez em cinco minutos. Eu contei.' },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o voc\u00ea n\u00e3o estava estudando o mapa.' },
{ t:'dial', ch:'liara', tx:'Eu decoro mais r\u00e1pido com outra coisa para fazer. \u00c9 um m\u00e9todo.' },
{ t:'dial', ch:'klara', tx:'Ainda n\u00e3o.' },
{ t:'pause' },

{ t:'dial', ch:'liara', tx:'Co\u00e7a.' },
{ t:'dial', ch:'klara', tx:'N\u00e3o coce.' },
{ t:'dial', ch:'liara', tx:'Eu falei que co\u00e7a, n\u00e3o falei que ia co\u00e7ar.' },
{ t:'dial', ch:'klara', tx:'Voc\u00ea j\u00e1 estava co\u00e7ando.' },
{ t:'nar', tx:'Pela fresta, curativo no bra\u00e7o esquerdo das duas. Mesma dobra, mesmo tamanho.' },
{ t:'inn', tx:'Duas crian\u00e7as com o mesmo machucado no mesmo lugar.' },
{ t:'inn', tx:'Anotado. Sem conclus\u00e3o.' },

{ t:'dial', ch:'liara', tx:'Amanh\u00e3 \u00e9 dia de treino.' },
{ t:'dial', ch:'klara', tx:'Eu sei.' },
{ t:'dial', ch:'liara', tx:'Voc\u00ea nem perguntou de qu\u00ea.' },
{ t:'dial', ch:'klara', tx:'\u00c9 sempre o mesmo.' },
{ t:'dial', ch:'liara', tx:'N\u00e3o \u00e9. Semana passada foi diferente.' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'Foi.' },
{ t:'inn', tx:'Oito anos. Ela encerrou a conversa e a irm\u00e3 n\u00e3o percebeu.' },

{ t:'nar', tx:'Klara virou a p\u00e1gina sem levantar os olhos.' },
{ t:'dial', ch:'klara', tx:'Voc\u00ea perdeu o marcador de novo.' },
{ t:'dial', ch:'liara', tx:'Como voc\u00ea\u2014' },
{ t:'dial', ch:'klara', tx:'Voc\u00ea apertou o l\u00e1pis quando eu disse mapa. Voc\u00ea faz isso quando perde alguma coisa.' },

{ t:'nar', tx:'Antoniette ficou parada no corredor.' },
{ t:'inn', tx:'Ela n\u00e3o est\u00e1 concentrada na leitura. Est\u00e1 registrando a sala inteira enquanto l\u00ea.' },
{ t:'pause' },
{ t:'inn', tx:'\u00c9 o que eu fa\u00e7o.' },

{ t:'nar', tx:'Klara virou a cabe\u00e7a um grau na dire\u00e7\u00e3o da porta. Voltou para o livro.' },
{ t:'spr_hide', ch:'klara' },
{ t:'spr_hide', ch:'liara' },
{ t:'inn', tx:'Ela sabe que tem algu\u00e9m aqui.' },
{ t:'pause' },
{ t:'inn', tx:'N\u00e3o disse nada.' },
{ t:'nar', tx:'Antoniette andou at\u00e9 o fim do corredor antes de anotar. Anotar ali seria barulho.' },

/* ======================================================================
   C8 - QUARTO DE ANTONIETTE - NOITE
   Proposito: escolha 2. O que entra no relatorio define quem ela vira.
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
   C9 - QUARTO DE ANTONIETTE - MEIA-NOITE
   Proposito: fechamento. A conta que o Prologo mostrou Matheo recusando,
   feita aqui de frente para a frente, sem que ela saiba o que ela vale.
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
