/* ==========================================================================
   ARQUIVO RABENFELS - js/data/chapter1.js
   CAPITULO 1: "A Chegada"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.

   QUANDO: Ano 1, abril. Klara e Liara tem oito anos.

   O PENSAMENTO UNICO DESTE CAPITULO (Zinsser, unidade):
   "Duas meninas iguais, tratadas de modo diferente, e ninguem nesta
   casa acha isso estranho."
   Nenhum outro capitulo pode deixar este pensamento.

   NOTA DE DIRECAO (documento mestre, obedecida aqui):
   "Onde o Prologo foi escuridao, silencio e peso, o Capitulo 1 deve
   comecar com algo que quase parece normal. A ameaca esta presente desde
   o primeiro frame, mas ainda vestida com as roupas da beleza."
   Cavallaro mostra que isso e tecnica consolidada do genero: em
   Higurashi, "o visual oscila entre encanto idilico e horror conotativo,
   e ha algo sinistro na tensao entre a alegria das cores e o rigor
   glacial dos arranjos formais".

   CANON APLICADO (docs/biblia_narrativa_rabenfels.md):
   - Klara nasceu vampira. Liara nasceu humana e SABE que a irma e
     vampira; acha que as duas vivem a mesma vida.
   - So Klara passa por procedimentos. So Klara tem curativo.
   - Klara fala pouco e nao fala bonito. Nada de enigma nem aforismo.
   - Klara QUER coisas e TENTA consegui-las - por Liara, que e o unico
     acesso dela ao mundo. E o mecanismo que termina na Academia.
   - Liara e mimada, criada em outro regime, e fala mais. E o unico
     registro alto da obra e o unico lugar onde ponto de exclamacao
     e permitido.
   - Aldric administra. Cortes, nao mente, nao diz o nome de Klara.
     Papel tecnico: vilao simpatico.
   - Serafina e mais calorosa com Antoniette do que com as filhas.
   - Antoniette nao e doce. Esta trabalhando.
   - A balada aparece uma vez, na boca da crianca da aldeia.

   OFICIO APLICADO NESTA REVISAO (docs/estudo/00_indice.md):
   - Topo cortado. A cena abre no gesto. Abril e descrito pelo que faz
     em quem viajou tres dias, nao pelo ceu. (Zinsser, Kenworthy)
   - Auditoria sensorial: cheiro, tato, temperatura e som entram em
     todas as cenas. A versao anterior era quase toda visual.
   - Contradicao disposicional de Antoniette: metodica ao extremo, e
     come em pe. Plantada aqui, sem comentario. (Corbett cap. 9)
   - Fenn ganha detalhe contraditorio (economico com gente, falastrao
     com os cavalos) e agenda propria. (Faye, Peters, Corbett cap. 21)
   - Registro por interlocutor: ela fala curto com Fenn, formal com
     Serafina, precisa com Aldric. (Kristoff, por exemplo)
   - A decisao de NAO insistir aparece em cena, com o preco a vista.
     (Frey: o leitor nao pode achar que a detetive e idiota)
   - Ramos das duas escolhas equilibrados em extensao. (Finley)
   - Fim de cena: dois socos convertidos em ponte (C6, C7). (Frey)
   - Beat de uma palavra em C6. (Kristoff)
   - Uma frase longa em C9, depois do capitulo inteiro em frase curta.
   - Ela ouve de fora e le quem sai da sala. (Peters)

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
   Tres ramos de extensao equivalente. Cada um leva um "e se" ate o fim.
   -------------------------------------------------------------------------- */

var C1_ALDRIC_A = [
  { t:'dial', ch:'antoniette', tx:'Como quiser, senhor Rabenfels.' },
  { t:'spr', ch:'aldric', ex:'side', pos:'left' },
  { t:'nar', tx:'Ele esperou mais um instante do que a resposta pedia.' },
  { t:'dial', ch:'aldric', tx:'A senhorita é fácil de empregar.' },
  { t:'spr_hide', ch:'aldric' },
  { t:'pause' },
  { t:'inn', tx:'Ele me classificou em quatro palavras e desceu a escada.' },
  { t:'nar', tx:'Ela esperou a porta fechar antes de voltar à estante.' },
  { t:'inn', tx:'Comprei três meses de sossego pelo preço de virar mobília.' },
  { t:'inn', tx:'Nove meses não vão bastar.' }
];

var C1_ALDRIC_B = [
  { t:'dial', ch:'antoniette', tx:'O que eu deveria estar procurando?' },
  { t:'spr', ch:'aldric', ex:'stare', pos:'left' },
  { t:'nar', tx:'A mão dele parou no corrimão por meio segundo.' },
  { t:'dial', ch:'aldric', tx:'Nada. A senhorita não deveria estar procurando.' },
  { t:'dial', ch:'aldric', tx:'Eu disse: se encontrar.' },
  { t:'spr_hide', ch:'aldric' },
  { t:'pause' },
  { t:'inn', tx:'Ele corrigiu o verbo duas vezes na mesma frase.' },
  { t:'inn', tx:'Ele queria que eu guardasse o "se".' },
  { t:'nar', tx:'Ela anotou a hora junto com a frase.' }
];

var C1_ALDRIC_C = [
  { t:'nar', tx:'Antoniette não respondeu.' },
  { t:'spr', ch:'aldric', ex:'stare', pos:'left' },
  { t:'nar', tx:'No terceiro segundo, Aldric ergueu o queixo.' },
  { t:'dial', ch:'aldric', tx:'Minha mulher acha que a senhorita vai gostar desta casa.' },
  { t:'pause' },
  { t:'dial', ch:'aldric', tx:'Eu acho que a casa vai gostar da senhorita.' },
  { t:'spr_hide', ch:'aldric' },
  { t:'nar', tx:'Desceu sem esperar resposta desta vez.' },
  { t:'pause' },
  { t:'inn', tx:'Ele preencheu o silêncio. Eu não precisei.' },
  { t:'inn', tx:'Ele precisava saber o que eu faria com a frase.' }
];

/* --------------------------------------------------------------------------
   ESCOLHA 2 - O PRIMEIRO RELATORIO
   A opcao C grava archive_seed. Nao renomear.
   -------------------------------------------------------------------------- */

var C1_RELATORIO_A = [
  { t:'nar', tx:'Ela escreveu as gêmeas em um parágrafo só.' },
  { t:'inn', tx:'Duas crianças de oito anos. Comportamento consistente com a linhagem. Sem distinção operacional relevante.' },
  { t:'nar', tx:'Releu. Estava correto.' },
  { t:'pause' },
  { t:'nar', tx:'A frase do corredor ficou de fora. O curativo também.' },
  { t:'nar', tx:'Ela lacrou o envelope e comeu o pão que tinha subido, em pé, junto da janela.' },
  { t:'pause' },
  { t:'inn', tx:'Relatório limpo. Ninguém em Lervel vai fazer nenhuma pergunta.' },
  { t:'inn', tx:'E eu continuo com a pergunta.' }
];

var C1_RELATORIO_B = [
  { t:'nar', tx:'Ela abriu uma seção nova e escreveu um cabeçalho: sujeito K.' },
  { t:'inn', tx:'Registra o ambiente inteiro enquanto lê.' },
  { t:'inn', tx:'Responde a estímulo indireto antes de responder ao direto.' },
  { t:'nar', tx:'Encheu três páginas antes de olhar a hora.' },
  { t:'pause' },
  { t:'nar', tx:'Sobre a irmã, meia linha.' },
  { t:'inn', tx:'Uma delas virou dado. A outra virou contexto.' },
  { t:'nar', tx:'Ela lacrou o envelope sem reler a meia linha.' },
  { t:'pause' },
  { t:'inn', tx:'A partir de amanhã, Lervel vai querer mais sobre a menina.' },
  { t:'inn', tx:'E eu vou ter de conseguir.' }
];

var C1_RELATORIO_C = [
  { t:'nar', tx:'O relatório para a Ordem levou vinte minutos. Fatos, medidas, nada além disso.' },
  { t:'nar', tx:'Ela lacrou o envelope e o deixou na beira da mesa.' },
  { t:'pause' },
  { t:'nar', tx:'Depois tirou do baú de ferramentas um caderno em branco.' },
  { t:'nar', tx:'Sem data. Sem cabeçalho.' },

  { t:'arc', key:'sem_identificacao', label:'— caderno sem identificação —', lns:[
      'Por que ela não disse nada?'
  ]},

  { t:'inn', tx:'Isto não vai para Lervel.' },
  { t:'nar', tx:'Guardou o caderno debaixo do forro do baú.' },
  { t:'pause' },
  { t:'inn', tx:'Agora tenho um caderno para Lervel e outro que Lervel não pode ver.' }
];

RBF.CHAPTER1 = [

{ t:'chap', num:'CAPÍTULO 1', name:'A CHEGADA', chapter:'capitulo1' },
{ t:'fade_out' },

/* ======================================================================
   C1 - A ESTRADA DA MARCA CINZENTA - ABRIL, FIM DE TARDE
   Topo cortado: abre no gesto. Abril e descrito pelo que faz nela.
   Saida: a crianca que canta e nao acena. (soco)
   ====================================================================== */
{ t:'scene', id:'c1_estrada', chapter:'capitulo1', title:'A estrada',
  bg:'bg_grey_march_road', bgm:'bgm_grey_march' },
{ t:'fade_in' },

{ t:'nar', tx:'Antoniette Vael abriu a janela da carruagem no terceiro dia de viagem e deixou aberta.' },
{ t:'nar', tx:'O ar de abril entrou morno e com cheiro de terra molhada. O calor devolveu movimento às mãos rachadas pela rédea.' },
{ t:'pause' },
{ t:'inn', tx:'É bonito.' },
{ t:'nar', tx:'Ela anotou a impressão abaixo da data.' },
{ t:'inn', tx:'Anotar que é bonito serve para depois. Impressão de chegada muda em três semanas e ninguém lembra qual era.' },

{ t:'nar', tx:'O vale se abriu na curva. Velha Nidhaus apareceu lá embaixo, com o telhado molhado pegando o sol deitado.' },
{ t:'nar', tx:'Releu o dossiê de quarenta páginas que tinha decorado em Lervel.' },
{ t:'inn', tx:'Reler não é insegurança. É conferência.' },
{ t:'nar', tx:'Dobrou o dossiê e guardou na mala menor.' },

{ t:'sfx', id:'sfx_wind' },
{ t:'nar', tx:'A estrada entrou na floresta. Quando as copas se tocaram, o interior da carruagem escureceu.' },
{ t:'nar', tx:'A temperatura caiu junto. Ela fechou a janela sem pensar e só percebeu que tinha fechado meio quilômetro depois.' },
{ t:'nar', tx:'Correu assim por três quilômetros sem abrir uma clareira.' },
{ t:'inn', tx:'O dossiê dizia densa.' },
{ t:'pause' },
{ t:'inn', tx:'As árvores crescem umas em direção às outras.' },

{ t:'nar', tx:'A aldeia veio depois da floresta. Quinze casas caiadas, um poço, roupa no varal e cheiro de fumaça de lenha úmida.' },
{ t:'nar', tx:'Uma menina de uns seis anos estava sentada na mureta do poço, cantando.' },
{ t:'pause' },

{ t:'arc', key:'balada', label:'— cantiga da Marca —', lns:[
    'Cantai, cantai, as filhas do pacto,',
    'uma nasce casulo, uma nasce intacta,',
    'cantai, cantai, o ciclo que não para...'
]},

{ t:'inn', tx:'Cantiga de roda. Anotar a letra antes de esquecer.' },
{ t:'nar', tx:'A carruagem passou a três metros dela.' },
{ t:'nar', tx:'A menina parou de cantar e ficou olhando até a carruagem sumir.' },
{ t:'pause' },
{ t:'nar', tx:'Não acenou.' },

{ t:'arc', key:'caderno', label:'— Caderno Operacional —', lns:[
    'Aldeia a quatro quilômetros de Nidhaus. Quinze casas.',
    'Cantiga local recolhida na chegada. Letra transcrita em anexo.',
    'A criança não acenou.'
]},
{ t:'inn', tx:'Sem valor operacional. Anotado mesmo assim.' },

/* ======================================================================
   C2 - O PORTAO - ENTARDECER
   Fenn ganha detalhe contraditorio e agenda.
   Aqui aparece, pela primeira vez, a decisao de NAO insistir.
   Saida: ele responde uma pergunta que ela nao fez. (soco)
   ====================================================================== */
{ t:'scene', id:'c2_portao', chapter:'capitulo1', title:'O portão',
  bg:'bg_nidhaus_gate', bgm:'bgm_nidhaus' },

{ t:'nar', tx:'A carruagem parou a duzentos metros do portão.' },
{ t:'nar', tx:'O cocheiro desceu as duas malas e o baú ali mesmo, na estrada.' },
{ t:'dial', ch:'antoniette', tx:'O portão é logo ali.' },
{ t:'nar', tx:'Ele concordou com a cabeça e continuou descarregando.' },
{ t:'pause' },
{ t:'inn', tx:'Concordou comigo e não se mexeu. As duas coisas ao mesmo tempo.' },

{ t:'nar', tx:'Ela abriu a boca para perguntar por quê.' },
{ t:'nar', tx:'Fechou.' },
{ t:'inn', tx:'Primeira hora. Não gasto uma pergunta com um homem que vai embora hoje.' },
{ t:'pause' },
{ t:'inn', tx:'Fica anotado que eu não perguntei.' },

{ t:'sfx', id:'sfx_door' },
{ t:'nar', tx:'O portão abriu sem ranger.' },
{ t:'inn', tx:'Ferro desse peso deveria ranger. Alguém engraxa este portão toda semana.' },

{ t:'spr', ch:'fenn', ex:'neutral', pos:'center' },
{ t:'nar', tx:'Um homem de meia-idade veio buscar a bagagem. Uniforme cinzento, sem bordado.' },
{ t:'dial', ch:'fenn', tx:'Senhorita Vael. A família esperava a senhorita amanhã.' },
{ t:'dial', ch:'antoniette', tx:'Saí um dia antes.' },
{ t:'dial', ch:'fenn', tx:'A casa não desarruma.' },

{ t:'nar', tx:'Ele pegou o baú de ferramentas primeiro, sem perguntar qual das malas era qual.' },
{ t:'dial', ch:'fenn', tx:'Fenn. Respondo pela casa. O que precisar, pede a mim.' },
{ t:'inn', tx:'Contato visual pelo tempo exato. Nem um segundo além.' },
{ t:'inn', tx:'Isso é treino.' },

{ t:'sfx', id:'sfx_footsteps' },
{ t:'nar', tx:'No caminho ele passou pela cocheira e disse alguma coisa para dentro, sem parar.' },
{ t:'dial', ch:'fenn', tx:'Já vou, já vou. Você comeu às quatro, seu mentiroso.' },
{ t:'pause' },
{ t:'nar', tx:'Voltou ao silêncio no passo seguinte.' },
{ t:'inn', tx:'Vinte palavras para um cavalo. Nove para mim.' },

{ t:'nar', tx:'Na porta da cocheira havia um risco a faca na madeira, e outro dois dedos acima, e mais um acima daquele.' },
{ t:'dial', ch:'antoniette', tx:'Filho?' },
{ t:'dial', ch:'fenn', tx:'Cresceu quatro dedos este ano e come como três.' },
{ t:'nar', tx:'Foi a primeira frase que ele disse sem ser perguntado.' },
{ t:'pause' },
{ t:'inn', tx:'Anotado. Um homem que responde curto tem um assunto que abre.' },

{ t:'nar', tx:'Atravessaram o pátio. As janelas do andar de baixo estavam fechadas apesar do calor de abril.' },
{ t:'nar', tx:'Cheirava a pedra molhada e a cera. Nenhum cheiro de comida, e já passava da hora do jantar.' },
{ t:'nar', tx:'No canto nordeste havia uma porta sem janela, com uma corrente leve no puxador.' },
{ t:'pause' },
{ t:'nar', tx:'A corrente não tinha cadeado.' },
{ t:'inn', tx:'Aquilo ali serve para saber que alguém entrou.' },

{ t:'nar', tx:'Fenn parou até ela terminar de olhar.' },
{ t:'dial', ch:'fenn', tx:'O pátio é atalho para a cozinha. A casa inteira usa.' },
{ t:'spr_hide', ch:'fenn' },
{ t:'inn', tx:'Ele acabou de responder uma pergunta que eu não fiz.' },

/* ======================================================================
   C3 - O SALAO PRINCIPAL - NOITE
   Serafina. Mais calorosa com Antoniette do que com as filhas.
   Antoniette em registro formal - o mais longo que ela usa na obra.
   Saida: a ausencia de Aldric registrada como informacao. (soco)
   ====================================================================== */
{ t:'scene', id:'c3_salao', chapter:'capitulo1', title:'O salão',
  bg:'bg_main_hall', bgm:'bgm_nidhaus' },

{ t:'nar', tx:'O teto do salão era alto demais para a largura da sala.' },
{ t:'nar', tx:'Fazia dois graus a menos ali do que no pátio, e não havia lareira acesa em abril.' },
{ t:'nar', tx:'Retratos nas paredes. Rostos diferentes, olhos iguais.' },

{ t:'spr', ch:'serafina', ex:'neutral', pos:'right' },
{ t:'nar', tx:'Serafina Rabenfels desceu a escada com o passo de quem já sabia a que horas a carruagem tinha chegado.' },
{ t:'inn', tx:'O retrato do dossiê mostra uma mulher que escolheu esta vida.' },
{ t:'inn', tx:'Esta aqui construiu a vida dela com material que não era dela.' },

{ t:'dial', ch:'serafina', tx:'Senhorita Vael. Bem-vinda a Velha Nidhaus.' },
{ t:'dial', ch:'antoniette', tx:'Senhora Rabenfels. A coleção da família tem reputação até em Lervel, e eu vim disposta a descobrir se ela é merecida.' },
{ t:'spr', ch:'serafina', ex:'smirk', pos:'right' },
{ t:'nar', tx:'O sorriso chegou aos olhos no tempo certo e saiu no tempo certo.' },
{ t:'inn', tx:'Sem nenhuma falha técnica.' },

{ t:'spr', ch:'serafina', ex:'direct', pos:'right' },
{ t:'dial', ch:'serafina', tx:'Li sua carta de recomendação três vezes.' },
{ t:'dial', ch:'antoniette', tx:'Três?' },
{ t:'dial', ch:'serafina', tx:'Leio um documento até parar de encontrar coisa nova nele.' },
{ t:'pause' },
{ t:'inn', tx:'Eu li o dossiê quatro vezes pelo mesmo motivo.' },

{ t:'dial', ch:'serafina', tx:'Nove meses de contrato para quatro mil volumes.' },
{ t:'dial', ch:'antoniette', tx:'É o que foi combinado.' },
{ t:'dial', ch:'serafina', tx:'Combinado é o que se escreve antes de conhecer o trabalho.' },

{ t:'nar', tx:'Uma das filhas apareceu no alto da escada, de camisola, e desceu dois degraus.' },
{ t:'spr', ch:'serafina', ex:'side', pos:'right' },
{ t:'dial', ch:'serafina', tx:'Liara. Cama.' },
{ t:'nar', tx:'A menina subiu de volta sem reclamar.' },
{ t:'pause' },
{ t:'inn', tx:'Duas palavras para a filha. Vinte para mim.' },

{ t:'spr', ch:'serafina', ex:'neutral', pos:'right' },
{ t:'dial', ch:'serafina', tx:'Mandei preparar o quarto do lado leste para a senhorita. É o de melhor vista para o pátio.' },
{ t:'dial', ch:'antoniette', tx:'Obrigada.' },
{ t:'dial', ch:'serafina', tx:'Fenn a leva. A copa fica aberta até meia-noite.' },
{ t:'nar', tx:'Serafina se afastou. Não corrigiu uma palavra nem acrescentou outra.' },
{ t:'spr_hide', ch:'serafina' },

{ t:'pause' },
{ t:'inn', tx:'Nenhuma menção ao senhor da casa.' },
{ t:'inn', tx:'Ausência sem explicação também é informação.' },

/* ======================================================================
   C4 - QUARTO DE ANTONIETTE - NOITE
   Metodo, primeira entrada, o item cinco.
   Aqui entra a contradicao disposicional: ela come em pe.
   ====================================================================== */
{ t:'scene', id:'c4_quarto', chapter:'capitulo1', title:'O quarto',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'Quarto confortável sem ser caloroso. Mesa de trabalho, vela, papel de sobra.' },
{ t:'nar', tx:'Alguém tinha deixado pão e uma jarra na mesa de canto.' },
{ t:'nar', tx:'Ela desfez as malas na ordem de sempre: ferramentas primeiro, nada da Ordem à vista.' },

{ t:'nar', tx:'Depois mediu o quarto a passo, como media qualquer sala nova.' },
{ t:'nar', tx:'Quatorze passos de parede a parede. O corredor lá fora tinha dezessete até a mesma esquina.' },
{ t:'pause' },
{ t:'inn', tx:'Três passos de parede. Nenhuma casa gasta três passos de parede.' },
{ t:'nar', tx:'Anotou o número e deixou sem explicação.' },

{ t:'nar', tx:'A janela dava para o pátio traseiro. Dali via-se a porta nordeste inteira.' },
{ t:'inn', tx:'Serafina escolheu este quarto. Disse que ele tem a melhor vista do pátio.' },
{ t:'pause' },
{ t:'inn', tx:'Cortesia e permissão custam o mesmo na entrada. Só uma cobra depois.' },
{ t:'nar', tx:'Ela puxou a cadeira da mesa de trabalho para o lado da janela, e trabalhou de costas para a parede pelos cinco anos seguintes.' },

{ t:'nar', tx:'Comeu o pão ali mesmo, de pé, olhando o pátio. Não sentou para isso.' },
{ t:'nar', tx:'Depois sentou. Abriu o caderno operacional. Escreveu a data.' },

{ t:'arc', key:'caderno', label:'— Caderno Operacional — Entrada 1 —', lns:[
    'Chegada em Velha Nidhaus. Cobertura estável. Recepção sem incidente.',
    '1. Discrepância de três passos entre o quarto leste e o corredor. Verificar planta.',
    '2. Serafina Rabenfels: controle excepcional. Monitorar.',
    '3. Aldric Rabenfels: ausente na recepção. Deliberado ou protocolo da casa.',
    '4. Porta nordeste do pátio: corrente sem cadeado. Registro de passagem.',
    '5. A floresta ao norte não cresce em direção ao sol.'
]},

{ t:'nar', tx:'Ela olhou o item cinco.' },
{ t:'inn', tx:'Observação subjetiva. Sem valor operacional documentável.' },
{ t:'nar', tx:'Riscou.' },
{ t:'pause' },
{ t:'nar', tx:'Desriscou.' },
{ t:'inn', tx:'Detalhe subjetivo que sobrevive ao descarte costuma ser relevante. Protocolo da Ordem, página quarenta e dois.' },

{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'Apagou a vela. No pátio, a corrente continuou parada.' },

/* ======================================================================
   C5 - A BIBLIOTECA - MANHA SEGUINTE
   Aldric, o vilao simpatico. Escolha 1.
   Antoniette em registro preciso: frases curtas, nada oferecido.
   ====================================================================== */
{ t:'scene', id:'c5_biblioteca', chapter:'capitulo1', title:'A biblioteca',
  bg:'bg_library', bgm:'bgm_nidhaus' },
{ t:'fade_in' },

{ t:'nar', tx:'De manhã Fenn a deixou na porta da biblioteca e não entrou.' },
{ t:'inn', tx:'Nem olhou para dentro.' },
{ t:'nar', tx:'Dois andares de estantes. Cheiro de couro, cola velha e poeira parada.' },
{ t:'nar', tx:'As lombadas mostravam quais seções a família usava.' },
{ t:'nar', tx:'No canto nordeste do segundo andar as estantes estavam viradas para dentro, sem luz direta.' },
{ t:'nar', tx:'Antoniette subiu a escada.' },
{ t:'nar', tx:'Latim. Uma língua que ela não reconheceu. Datas de dois séculos atrás.' },
{ t:'pause' },

{ t:'sfx', id:'sfx_footsteps' },
{ t:'nar', tx:'Passos no andar de baixo. Lentos, regulares, com o peso de quem sabe que o chão é dele.' },
{ t:'spr', ch:'aldric', ex:'cold', pos:'left' },
{ t:'nar', tx:'Ele viu Antoniette no segundo andar sem demonstrar surpresa.' },
{ t:'dial', ch:'aldric', tx:'Senhorita Vael.' },
{ t:'nar', tx:'Pronunciou "Vael" sem mudar o ritmo da passada.' },
{ t:'dial', ch:'antoniette', tx:'Senhor Rabenfels. Não sabia que era esperada aqui.' },
{ t:'dial', ch:'aldric', tx:'Não era. Vim buscar um documento.' },

{ t:'spr', ch:'aldric', ex:'side', pos:'left' },
{ t:'nar', tx:'Subiu, passou por ela no corredor estreito e tirou um rolo de uma caixa sem procurar.' },
{ t:'nar', tx:'Leu de pé, com o rolo apoiado na estante. Não usou a mesa que estava a dois passos.' },

{ t:'dial', ch:'aldric', tx:'A senhorita cataloga por estante ou por assunto?' },
{ t:'dial', ch:'antoniette', tx:'Por estante. Assunto é o que se descobre depois.' },
{ t:'pause' },
{ t:'spr', ch:'aldric', ex:'cold', pos:'left' },
{ t:'dial', ch:'aldric', tx:'Correto.' },
{ t:'inn', tx:'Ele acabou de corrigir uma prova.' },

{ t:'dial', ch:'antoniette', tx:'A coleção é maior do que o contrato previa.' },
{ t:'dial', ch:'aldric', tx:'Leve o tempo que precisar.' },

{ t:'nar', tx:'Desceu. Parou no meio da escada, de costas.' },
{ t:'spr', ch:'aldric', ex:'stare', pos:'left' },
{ t:'dial', ch:'aldric', tx:'A seção nordeste do segundo andar está fora do escopo contratado.' },
{ t:'dial', ch:'aldric', tx:'Se encontrar algo lá, traga a mim antes de catalogar.' },
{ t:'pause' },

{ t:'inn', tx:'Ele não disse para eu não subir.' },
{ t:'inn', tx:'Disse para levar a ele antes de catalogar.' },

{ t:'cho', id:'cap1_aldric', code:'C-I', prompt:'A PERMISSÃO', opts:[
  { id:'B',
    tx:'Perguntar o que ela deveria estar procurando.',
    flags:{ aldric_reply:'B', aldric_pressed:true },
    routes:{ answer: 2 },
    then: C1_ALDRIC_B },
  { id:'A',
    tx:'Aceitar a permissão como ela foi dada. Não dar a ele nada para medir.',
    flags:{ aldric_reply:'A', aldric_pressed:false },
    routes:{ loss: 1 },
    then: C1_ALDRIC_A },
  { id:'C',
    tx:'Não responder. Deixar o silêncio trabalhar por ela.',
    flags:{ aldric_reply:'C', aldric_pressed:false },
    routes:{ answer: 1 },
    then: C1_ALDRIC_C }
]},

{ t:'sfx', id:'sfx_door' },
{ t:'nar', tx:'A porta da biblioteca fechou no andar de baixo.' },
{ t:'pause' },
{ t:'inn', tx:'A segunda frase dele confirma que há alguma coisa naquela seção.' },
{ t:'inn', tx:'E que ele conta com o fato de que eu vou encontrar.' },
{ t:'pause' },
{ t:'inn', tx:'Por quê?' },
{ t:'nar', tx:'Ela anotou a hipótese, releu e riscou. Faltava evidência.' },
{ t:'inn', tx:'Continuava sendo a mais provável.' },

/* ======================================================================
   C6 - A GALERIA DE RETRATOS - MEIO DA TARDE
   O ciclo, visto por quem ainda nao sabe que existe um ciclo.
   Beat de uma palavra na contagem das geracoes.
   Saida convertida em PONTE: a moldura puxa para a frente.
   ====================================================================== */
{ t:'scene', id:'c6_retratos', chapter:'capitulo1', title:'A galeria',
  bg:'bg_portrait_hall', bgm:null },

{ t:'nar', tx:'O caminho mais curto entre a biblioteca e a ala leste passa por um corredor de retratos.' },
{ t:'nar', tx:'Nove gerações, da mais antiga à mais recente, na ordem.' },
{ t:'inn', tx:'Casa que pendura retrato em ordem cronológica quer que alguém leia a ordem.' },

{ t:'nar', tx:'Ela leu.' },
{ t:'pause' },
{ t:'nar', tx:'Duas.' },
{ t:'nar', tx:'Duas.' },
{ t:'nar', tx:'Duas.' },
{ t:'pause' },
{ t:'nar', tx:'Cada geração tinha duas filhas. Todas as nove.' },
{ t:'inn', tx:'Nove gerações sem um filho. Estatisticamente improvável.' },
{ t:'inn', tx:'Improvável não chega a ser impossível. Anotar e seguir.' },

{ t:'nar', tx:'Nos nove quadros as duas meninas posavam do mesmo jeito.' },
{ t:'nar', tx:'Uma de frente. A outra meio passo atrás, sempre à direita.' },
{ t:'pause' },
{ t:'inn', tx:'Convenção de composição. O pintor copia o quadro anterior.' },
{ t:'inn', tx:'Nove pintores diferentes ao longo de duzentos anos copiando a mesma convenção.' },

{ t:'nar', tx:'No fim da fila havia uma moldura vazia.' },
{ t:'nar', tx:'Ela passou o dedo na borda de baixo. Saiu limpo.' },
{ t:'pause' },
{ t:'nar', tx:'A parede tinha pó até a borda externa. Dentro do contorno, não.' },
{ t:'inn', tx:'Alguém limpa uma moldura que não tem quadro.' },
{ t:'pause' },
{ t:'nar', tx:'A moldura tinha o tamanho dos outros nove.' },
{ t:'inn', tx:'Está esperando duas meninas.' },
{ t:'pause' },
{ t:'nar', tx:'Ela mediu a moldura com a mão aberta, duas vezes, e anotou a medida.' },
{ t:'nar', tx:'Depois seguiu pelo corredor contando os passos até a ala leste, para ter o que fazer com a cabeça.' },

/* ======================================================================
   C7 - O CORREDOR LESTE - FIM DE TARDE
   As gemeas, ouvidas e nunca encontradas. Ela ouve de fora (Peters).
   Klara QUER e TENTA - por Liara. E o mecanismo que termina na Academia.
   Saida convertida em PONTE.
   ====================================================================== */
{ t:'scene', id:'c7_corredor', chapter:'capitulo1', title:'O corredor leste',
  bg:'bg_corridor', bgm:null },

{ t:'nar', tx:'Voltando com dois volumes, ela ouviu vozes no corredor leste.' },
{ t:'nar', tx:'A última porta estava entreaberta. Vinha cheiro de leite morno e de papel.' },
{ t:'pause' },

{ t:'spr', ch:'liara', ex:'neutral', pos:'right' },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'nar', tx:'Duas meninas idênticas. Uma deitada sobre um mapa, batendo o pé no ar. A outra lendo, com o dedo no texto.' },

{ t:'dial', ch:'liara', tx:'A senhora Elke falou que em Lervel tem uma casa só de livro! Do tamanho da capela.' },
{ t:'dial', ch:'klara', tx:'Biblioteca.' },
{ t:'dial', ch:'liara', tx:'É. Eu quero ir.' },
{ t:'dial', ch:'klara', tx:'Você quer ir em tudo.' },
{ t:'dial', ch:'liara', tx:'Você não quer?' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'Quero.' },

{ t:'nar', tx:'Liara rolou de barriga para cima e ficou olhando o teto.' },
{ t:'dial', ch:'liara', tx:'Mamãe disse que você não vai na feira de maio por causa do sol.' },
{ t:'dial', ch:'klara', tx:'Eu posso ir.' },
{ t:'dial', ch:'liara', tx:'Ela disse que não.' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'Então não posso.' },

{ t:'inn', tx:'A menina do mapa vai à feira. A outra não.' },
{ t:'inn', tx:'Para as duas, a diferença não exige explicação.' },

/* Klara nao aceita e nao reclama: contorna. Por Liara. */
{ t:'nar', tx:'A que lia virou a página.' },
{ t:'dial', ch:'klara', tx:'Conta depois.' },
{ t:'dial', ch:'liara', tx:'Contar o quê?' },
{ t:'dial', ch:'klara', tx:'A feira. Tudo. Quantas barracas, o que vendem, o cheiro.' },
{ t:'dial', ch:'liara', tx:'Isso é muita coisa.' },
{ t:'dial', ch:'klara', tx:'Você fala muito. Vai dar.' },
{ t:'nar', tx:'Liara riu e disse que ia contar até o que ninguém perguntou.' },
{ t:'pause' },
{ t:'inn', tx:'Ela não pediu para ir. Pediu a feira inteira pela boca da irmã.' },

{ t:'dial', ch:'liara', tx:'Coça?' },
{ t:'dial', ch:'klara', tx:'Não.' },
{ t:'dial', ch:'liara', tx:'Ontem coçava.' },
{ t:'dial', ch:'klara', tx:'Hoje não.' },
{ t:'pause' },
{ t:'dial', ch:'liara', tx:'Você comeu?' },
{ t:'dial', ch:'klara', tx:'Comi.' },
{ t:'dial', ch:'liara', tx:'Está com fome de novo?' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'Um pouco.' },
{ t:'nar', tx:'Liara apenas mudou de assunto. Aquilo já pertencia à rotina.' },

{ t:'nar', tx:'Pela fresta, curativo no braço esquerdo da que lia. Dobra do cotovelo, atadura limpa.' },
{ t:'nar', tx:'A outra menina não tinha nenhum.' },
{ t:'inn', tx:'Anotado. Sem conclusão.' },

{ t:'dial', ch:'liara', tx:'Amanhã é dia de treino.' },
{ t:'dial', ch:'klara', tx:'Eu sei.' },
{ t:'dial', ch:'liara', tx:'Você nem perguntou de quê.' },
{ t:'dial', ch:'klara', tx:'É sempre o mesmo.' },
{ t:'dial', ch:'liara', tx:'Não é. Semana passada foi diferente.' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'Foi.' },

{ t:'nar', tx:'Klara virou a página sem levantar os olhos.' },
{ t:'dial', ch:'klara', tx:'Você perdeu o marcador de novo.' },
{ t:'dial', ch:'liara', tx:'Como você—' },
{ t:'dial', ch:'klara', tx:'Você apertou o lápis quando eu disse mapa. Você faz isso quando perde alguma coisa.' },
{ t:'dial', ch:'liara', tx:'Isso é chato.' },
{ t:'dial', ch:'klara', tx:'Está embaixo de você.' },

{ t:'nar', tx:'Liara levantou o quadril, achou o marcador e riu alto por uns cinco segundos.' },
{ t:'nar', tx:'A outra continuou lendo.' },

{ t:'nar', tx:'Antoniette ficou parada no corredor.' },
{ t:'inn', tx:'Ela achou o marcador sem tirar os olhos da página.' },
{ t:'inn', tx:'Está registrando a sala inteira enquanto lê.' },
{ t:'pause' },
{ t:'inn', tx:'É o que eu faço.' },

{ t:'nar', tx:'Klara virou a cabeça um grau na direção da porta. Voltou para o livro.' },
{ t:'spr_hide', ch:'klara' },
{ t:'spr_hide', ch:'liara' },
{ t:'inn', tx:'Ela sabe que tem alguém aqui.' },
{ t:'pause' },
{ t:'inn', tx:'E não disse nada.' },
{ t:'nar', tx:'Antoniette andou até o fim do corredor antes de anotar. Anotar ali seria barulho.' },
{ t:'pause' },
{ t:'inn', tx:'Uma criança de oito anos que sabe quando não vale a pena avisar.' },
{ t:'inn', tx:'Aprendeu isso com alguém.' },

/* ======================================================================
   C8 - QUARTO DE ANTONIETTE - NOITE
   Escolha 2.
   ====================================================================== */
{ t:'scene', id:'c8_relatorio', chapter:'capitulo1', title:'O primeiro relatório',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'À noite, o relatório operacional para Matheo.' },
{ t:'nar', tx:'Ela molhou a pena e parou antes da primeira linha.' },
{ t:'inn', tx:'A pergunta do corredor não tem campo no formulário.' },

{ t:'cho', id:'cap1_relatorio', code:'C-I', prompt:'O PRIMEIRO RELATÓRIO', opts:[
  { id:'A',
    tx:'As duas juntas. Sujeitos de observação, comportamento consistente com a linhagem.',
    flags:{ report_style:'A', distance_kept:true, klara_focus:false, archive_seed:false },
    routes:{ loss: 1 },
    then: C1_RELATORIO_A },
  { id:'C',
    tx:'O relatório para a Ordem. E um caderno separado, para a pergunta que sobrou.',
    flags:{ report_style:'C', distance_kept:false, klara_focus:true, archive_seed:true },
    routes:{ answer: 1, hope: 1 },
    then: C1_RELATORIO_C },
  { id:'B',
    tx:'Klara em seção própria. Abrir monitoramento individual.',
    flags:{ report_style:'B', distance_kept:false, klara_focus:true, archive_seed:false },
    routes:{ answer: 1, loss: 1 },
    then: C1_RELATORIO_B }
]},

/* ======================================================================
   C9 - MEIA-NOITE
   A unica frase longa do capitulo. Depois, corte.
   ====================================================================== */
{ t:'scene', id:'c9_meia_noite', chapter:'capitulo1', title:'Meia-noite',
  bg:'bg_antoniette_room' },

{ t:'nar', tx:'Meia-noite. A vela estava pela metade.' },
{ t:'nar', tx:'O silêncio de Nidhaus tinha uma qualidade que ela ainda não sabia nomear.' },
{ t:'nar', tx:'Era o silêncio de antes de uma frase, não o de depois.' },
{ t:'pause' },

{ t:'nar', tx:'Da janela das gêmeas ainda vinha luz.' },
{ t:'inn', tx:'Quatro anos. Talvez cinco. Foi o que a Ordem estimou para um relatório completo do pacto.' },
{ t:'pause' },

{ t:'inn', tx:'Ela ficou olhando aquela luz e pensou no contrato de nove meses, e nos quatro mil volumes que nenhuma pessoa cataloga em nove meses, e na frase da senhora da casa sobre combinado ser o que se escreve antes de conhecer o trabalho, e só então entendeu que ninguém naquela casa tinha esperado que ela fosse embora em nove meses, e que a única pessoa surpresa com a duração do próprio contrato era ela.' },
{ t:'pause' },

{ t:'inn', tx:'Em quatro anos as duas terão doze.' },
{ t:'nar', tx:'Ela escreveu o número na margem e não soube dizer por quê.' },

{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'Apagou a vela e deitou no escuro.' },
{ t:'pause' },
{ t:'nar', tx:'No quarto das gêmeas, a luz ficou acesa mais uma hora.' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Primeiro ano em Velha Nidhaus.', line2:'Quatro ainda virão.',
  chapter:'capitulo1' },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.CHAPTER1; }
