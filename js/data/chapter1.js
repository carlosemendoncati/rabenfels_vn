/* ==========================================================================
   ARQUIVO RABENFELS - js/data/chapter1.js
   CAPITULO 1: "A Chegada"
   Somente dados. Nenhum caminho de asset, nenhuma logica de render.
   Tipos de beat documentados em js/engine.js.

   Seis cenas:
     C1 estrada da Marca Cinzenta
     C2 portao / Fenn
     C3 salao principal / Serafina
     C4 quarto / primeiras notas operacionais
     C5 biblioteca / Aldric
     C6 corredor leste / Klara e Liara
   Depois: escolha "O Primeiro Relatorio", consequencia imediata por
   opcao, reconvergencia e cena de fechamento.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

/* --------------------------------------------------------------------------
   Consequencias imediatas da escolha. Definidas fora do array principal
   para o roteiro continuar legivel. Cada bloco reconverge na cena final.
   -------------------------------------------------------------------------- */
var C1_ESCOLHA_A = [
  { t:'nar', tx:'Ela escreveu as g\u00eameas em um par\u00e1grafo s\u00f3.' },
  { t:'inn', tx:'Duas crian\u00e7as de oito anos. Comportamento consistente com linhagem sobrenatural. Sem distin\u00e7\u00e3o operacional relevante.' },
  { t:'nar', tx:'Releu. Estava correto.' },
  { t:'pause' },
  { t:'inn', tx:'A pergunta do corredor n\u00e3o entrou em lugar nenhum.' },
  { t:'nar', tx:'Ela lacrou o envelope.' },
  { t:'inn', tx:'E continuou com a pergunta.' }
];

var C1_ESCOLHA_B = [
  { t:'nar', tx:'Ela abriu uma se\u00e7\u00e3o nova no relat\u00f3rio e escreveu um cabe\u00e7alho: sujeito K.' },
  { t:'inn', tx:'Aten\u00e7\u00e3o multifocal. Registra o ambiente inteiro enquanto l\u00ea.' },
  { t:'inn', tx:'Responde a est\u00edmulo indireto antes de responder ao direto.' },
  { t:'nar', tx:'Encheu tr\u00eas p\u00e1ginas antes de olhar a hora.' },
  { t:'pause' },
  { t:'nar', tx:'Sobre a irm\u00e3, meia linha.' },
  { t:'inn', tx:'Uma delas virou dado. A outra virou contexto.' },
  { t:'nar', tx:'Ela lacrou o envelope.' }
];

var C1_ESCOLHA_C = [
  { t:'nar', tx:'O relat\u00f3rio para a Ordem levou vinte minutos. Fatos, medidas, nada al\u00e9m disso.' },
  { t:'nar', tx:'Ela lacrou o envelope e o deixou na beira da mesa.' },
  { t:'pause' },
  { t:'nar', tx:'Depois tirou do ba\u00fa de ferramentas um caderno em branco.' },
  { t:'nar', tx:'N\u00e3o escreveu data. N\u00e3o escreveu cabe\u00e7alho.' },
  { t:'arc', key:'sem_identificacao', label:'\u2014 caderno sem identifica\u00e7\u00e3o \u2014', lns:[
      'Por que ela n\u00e3o disse nada?'
  ]},
  { t:'inn', tx:'Isto n\u00e3o vai para Lervel.' },
  { t:'nar', tx:'Guardou o caderno debaixo do forro do ba\u00fa.' }
];

RBF.CHAPTER1 = [

/* --- cartao de capitulo ---------------------------------------------- */
{ t:'chap', num:'CAP\u00cdTULO 1', name:'A CHEGADA' },
{ t:'fade_out' },

/* ======================================================================
   CENA 1 - A ESTRADA DA MARCA CINZENTA - FIM DE TARDE
   Proposito: estabelecer metodo de Antoniette e a textura da regiao.
   Saida: a crianca que nao acena.
   ====================================================================== */
{ t:'scene', id:'c1_estrada', chapter:'capitulo1', bg:'bg_grey_march_road', bgm:'bgm_grey_march' },
{ t:'fade_in' },

{ t:'nar', tx:'Duas horas de carruagem desde a \u00faltima troca de cavalos.' },
{ t:'nar', tx:'Antoniette Vael lia um dossi\u00ea de quarenta p\u00e1ginas que tinha decorado tr\u00eas semanas antes.' },
{ t:'inn', tx:'Reler n\u00e3o \u00e9 inseguran\u00e7a. \u00c9 confer\u00eancia.' },
{ t:'nar', tx:'Dobrou o dossi\u00ea. Guardou na mala menor. Olhou pela janela pela primeira vez em uma hora.' },
{ t:'pause' },

{ t:'nar', tx:'Velha Nidhaus apareceu no fim do vale.' },
{ t:'inn', tx:'As torres n\u00e3o s\u00e3o altas. O terreno \u00e9 que est\u00e1 baixo demais.' },
{ t:'inn', tx:'Impress\u00e3o subjetiva. Sem valor operacional.' },

{ t:'sfx', id:'sfx_wind' },
{ t:'nar', tx:'A floresta acompanhou a estrada por tr\u00eas quil\u00f4metros sem abrir uma clareira.' },
{ t:'inn', tx:'A Ordem escreveu densa.' },
{ t:'inn', tx:'As \u00e1rvores n\u00e3o crescem em dire\u00e7\u00e3o ao sol. Crescem umas em dire\u00e7\u00e3o \u00e0s outras.' },

{ t:'nar', tx:'A carruagem passou por uma aldeia. Quinze casas, um po\u00e7o, uma fonte com o cano virado para baixo.' },
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
   CENA 2 - O PORTAO DE VELHA NIDHAUS - ENTARDECER
   Proposito: introduzir Fenn e a porta nordeste do patio.
   Saida: ele responde uma pergunta que ela nao fez.
   ====================================================================== */
{ t:'scene', id:'c2_portao', chapter:'capitulo1', bg:'bg_nidhaus_gate', bgm:'bgm_nidhaus' },
{ t:'sfx', id:'sfx_door' },
{ t:'nar', tx:'O port\u00e3o abriu sem ranger.' },
{ t:'inn', tx:'Ferro desse peso deveria ranger. Algu\u00e9m engraxa esse port\u00e3o toda semana.' },

{ t:'spr', ch:'fenn', ex:'neutral', pos:'center' },
{ t:'nar', tx:'Um homem de meia-idade esperava no p\u00e1tio. Uniforme cinzento, sem bordado.' },
{ t:'dial', ch:'fenn', tx:'Senhorita Vael. A fam\u00edlia esperava a senhorita amanh\u00e3.' },
{ t:'dial', ch:'antoniette', tx:'Sa\u00ed de Lervel um dia antes. Espero n\u00e3o desarrumar a casa.' },
{ t:'nar', tx:'Ele pegou o ba\u00fa de ferramentas sem perguntar qual das malas era qual.' },
{ t:'dial', ch:'fenn', tx:'Fenn. Respondo pela casa. O que precisar, pede a mim.' },
{ t:'inn', tx:'Contato visual pelo tempo exato. Nem um segundo al\u00e9m.' },
{ t:'inn', tx:'Isso n\u00e3o \u00e9 timidez. \u00c9 treino.' },

{ t:'sfx', id:'sfx_footsteps' },
{ t:'nar', tx:'Atravessaram o p\u00e1tio. As janelas do andar de baixo estavam fechadas apesar do calor.' },
{ t:'nar', tx:'No canto nordeste havia uma porta sem janela. Uma corrente leve no puxador.' },
{ t:'nar', tx:'A corrente n\u00e3o tinha cadeado.' },
{ t:'inn', tx:'N\u00e3o serve para impedir entrada. Serve para saber que algu\u00e9m entrou.' },
{ t:'pause' },

{ t:'nar', tx:'Fenn parou at\u00e9 ela terminar de olhar.' },
{ t:'spr', ch:'fenn', ex:'neutral', pos:'center' },
{ t:'dial', ch:'fenn', tx:'O p\u00e1tio \u00e9 atalho para a cozinha. A casa inteira usa.' },
{ t:'spr_hide', ch:'fenn' },
{ t:'inn', tx:'Ele acabou de responder uma pergunta que eu n\u00e3o fiz.' },

/* ======================================================================
   CENA 3 - O SALAO PRINCIPAL - NOITE
   Proposito: Serafina. Dominio social, segunda camada em cada frase.
   Saida: ausencia de Aldric registrada como informacao.
   ====================================================================== */
{ t:'scene', id:'c3_salao', chapter:'capitulo1', bg:'bg_main_hall' },
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

{ t:'spr', ch:'serafina', ex:'neutral', pos:'right' },
{ t:'dial', ch:'serafina', tx:'A biblioteca espera at\u00e9 amanh\u00e3. A noite aqui \u00e9 longa; a senhorita vai aprender o ritmo da casa.' },
{ t:'spr', ch:'serafina', ex:'side', pos:'right' },
{ t:'dial', ch:'serafina', tx:'Fenn leva a senhorita ao quarto. A copa fica aberta at\u00e9 meia-noite.' },
{ t:'nar', tx:'Ela se afastou tendo dito exatamente o que planejou dizer.' },
{ t:'spr_hide', ch:'serafina' },
{ t:'pause' },
{ t:'inn', tx:'Nenhuma men\u00e7\u00e3o ao senhor da casa.' },
{ t:'inn', tx:'Aus\u00eancia sem explica\u00e7\u00e3o tamb\u00e9m \u00e9 informa\u00e7\u00e3o.' },

/* ======================================================================
   CENA 4 - QUARTO DE ANTONIETTE - NOITE
   Proposito: metodo, primeira entrada operacional, o item cinco.
   Saida: a corrente continua parada.
   ====================================================================== */
{ t:'scene', id:'c4_quarto', chapter:'capitulo1', bg:'bg_antoniette_room', bgm:null },
{ t:'nar', tx:'Quarto confort\u00e1vel sem ser caloroso. Mesa de trabalho, vela, papel.' },
{ t:'nar', tx:'A janela dava para o p\u00e1tio traseiro. Daqui via-se a porta nordeste.' },
{ t:'nar', tx:'Ela desfez as malas na ordem de sempre: ferramentas primeiro, nada da Ordem \u00e0 vista.' },
{ t:'nar', tx:'Sentou. Abriu o caderno operacional. Escreveu a data.' },
{ t:'nar', tx:'Parou.' },
{ t:'pause' },
{ t:'nar', tx:'Olhou para o p\u00e1tio. A corrente estava im\u00f3vel.' },

{ t:'arc', key:'caderno', label:'\u2014 Caderno Operacional \u2014 Entrada 1 \u2014', lns:[
    'Chegada em Velha Nidhaus. Cobertura est\u00e1vel. Recep\u00e7\u00e3o sem incidente.',
    '1. A casa \u00e9 maior por dentro do que a fachada sustenta. Propor\u00e7\u00e3o dif\u00edcil de quantificar.',
    '2. Serafina Rabenfels: controle excepcional. Monitorar.',
    '3. Aldric Rabenfels: ausente na recep\u00e7\u00e3o. Deliberado ou protocolo da casa. A verificar.',
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
   CENA 5 - A BIBLIOTECA - MANHA SEGUINTE
   Proposito: Aldric. Hostilidade controlada, permissao que e armadilha.
   Saida: a hipotese riscada que continua sendo a mais provavel.
   ====================================================================== */
{ t:'scene', id:'c5_biblioteca', chapter:'capitulo1', bg:'bg_library', bgm:'bgm_nidhaus' },
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
{ t:'dial', ch:'aldric', tx:'Como est\u00e1 se acomodando?' },
{ t:'nar', tx:'A pergunta era comum. O tom era de avalia\u00e7\u00e3o.' },
{ t:'dial', ch:'antoniette', tx:'Bem. A cole\u00e7\u00e3o \u00e9 maior do que o contrato previa. Vou precisar de mais tempo.' },
{ t:'spr', ch:'aldric', ex:'cold', pos:'left' },
{ t:'dial', ch:'aldric', tx:'Leve o tempo que precisar.' },

{ t:'nar', tx:'Desceu. Parou na porta, de costas.' },
{ t:'spr', ch:'aldric', ex:'stare', pos:'left' },
{ t:'dial', ch:'aldric', tx:'A se\u00e7\u00e3o nordeste do segundo andar est\u00e1 fora do escopo contratado. Se encontrar algo l\u00e1, traga a mim antes de catalogar.' },
{ t:'spr_hide', ch:'aldric' },
{ t:'sfx', id:'sfx_door' },
{ t:'nar', tx:'Saiu.' },
{ t:'pause' },

{ t:'inn', tx:'Ele n\u00e3o disse para eu n\u00e3o subir.' },
{ t:'inn', tx:'Disse para levar a ele antes de catalogar.' },
{ t:'inn', tx:'A segunda frase confirma que h\u00e1 alguma coisa l\u00e1.' },
{ t:'inn', tx:'E que ele conta com o fato de que eu vou encontrar.' },
{ t:'pause' },
{ t:'inn', tx:'Por qu\u00ea?' },
{ t:'nar', tx:'Ela anotou a hip\u00f3tese, releu e riscou. Faltava evid\u00eancia.' },
{ t:'inn', tx:'Continuava sendo a mais prov\u00e1vel.' },

/* ======================================================================
   CENA 6 - O CORREDOR LESTE - TARDE
   Proposito: as gemeas. Assimetria, normalizacao do horror,
   reconhecimento de Antoniette em Klara.
   Saida: Klara sabe que tem alguem na porta e nao diz nada.
   ====================================================================== */
{ t:'scene', id:'c6_corredor', chapter:'capitulo1', bg:'bg_corridor', bgm:null },
{ t:'nar', tx:'\u00c0 tarde, voltando para a biblioteca com dois volumes, ela ouviu uma voz no corredor leste.' },
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
{ t:'dial', ch:'klara', tx:'\u00c9 uma teoria.' },
{ t:'dial', ch:'liara', tx:'M\u00e9todo \u00e9 teoria que funciona.' },
{ t:'pause' },

{ t:'dial', ch:'liara', tx:'Amanh\u00e3 \u00e9 dia de treino.' },
{ t:'dial', ch:'klara', tx:'Eu sei.' },
{ t:'dial', ch:'liara', tx:'Voc\u00ea nem perguntou de que.' },
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
{ t:'nar', tx:'Antoniette seguiu pelo corredor sem fazer barulho suficiente para ser ouvida.' },

/* ======================================================================
   ESCOLHA - O PRIMEIRO RELATORIO
   A: distancia operacional mantida
   B: foco investigativo em Klara
   C: caderno separado - embriao do Arquivo (rota do True End)
   ====================================================================== */
{ t:'scene', id:'c7_relatorio', chapter:'capitulo1', bg:'bg_antoniette_room', bgm:null },
{ t:'nar', tx:'\u00c0 noite, o relat\u00f3rio operacional para Matheo.' },
{ t:'nar', tx:'Ela molhou a pena e parou antes da primeira linha.' },

{ t:'cho', id:'cap1_relatorio', prompt:'O PRIMEIRO RELAT\u00d3RIO', opts:[
  { id:'A',
    tx:'As duas juntas. Sujeitos de observa\u00e7\u00e3o, comportamento consistente com a linhagem.',
    flags:{ report_style:'A', distance_kept:true, klara_focus:false, archive_seed:false },
    routes:{ loss: 1 },
    then: C1_ESCOLHA_A },
  { id:'B',
    tx:'Klara em se\u00e7\u00e3o pr\u00f3pria. Abrir monitoramento individual.',
    flags:{ report_style:'B', distance_kept:false, klara_focus:true, archive_seed:false },
    routes:{ answer: 1, loss: 1 },
    then: C1_ESCOLHA_B },
  { id:'C',
    tx:'O relat\u00f3rio para a Ordem. E um caderno separado, para a pergunta que sobrou.',
    flags:{ report_style:'C', distance_kept:false, klara_focus:true, archive_seed:true },
    routes:{ answer: 1, hope: 1 },
    then: C1_ESCOLHA_C }
]},

/* ======================================================================
   CENA FINAL - QUARTO DE ANTONIETTE - MEIA-NOITE
   ====================================================================== */
{ t:'scene', id:'c8_meia_noite', chapter:'capitulo1', bg:'bg_antoniette_room' },
{ t:'nar', tx:'Meia-noite. A vela estava pela metade.' },
{ t:'nar', tx:'O sil\u00eancio de Nidhaus tinha uma qualidade que ela ainda n\u00e3o sabia nomear.' },
{ t:'nar', tx:'Era o sil\u00eancio de antes de uma frase, n\u00e3o o de depois.' },
{ t:'pause' },

{ t:'nar', tx:'Da janela das g\u00eameas ainda vinha luz.' },
{ t:'inn', tx:'Quatro anos. Talvez cinco. Foi o que a Ordem estimou para um relat\u00f3rio completo do pacto.' },
{ t:'inn', tx:'Quatro anos dentro desta casa.' },
{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'Ela apagou a vela e deitou no escuro.' },
{ t:'pause' },
{ t:'nar', tx:'No quarto das g\u00eameas, a luz ficou acesa mais uma hora.' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Primeiro ano em Velha Nidhaus.', line2:'Quatro ainda vir\u00e3o.' },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.CHAPTER1; }
