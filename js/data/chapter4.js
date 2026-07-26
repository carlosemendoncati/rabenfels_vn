/* ==========================================================================
   ARQUIVO RABENFELS - js/data/chapter4.js
   CAPITULO 4: "Os Rituais de Outubro"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.

   QUANDO: Ano 1, outubro. Klara e Liara tem oito anos.

   O PENSAMENTO UNICO DESTE CAPITULO (Zinsser, unidade):
   "Eles chamam de treinamento, e chamam assim entre si, quando ninguem
   esta ouvindo."

   A TROCA (docs/estrutura_v1.md):
   Ela ganha o vocabulario do ritual.
   Entrega uma TESTEMUNHA - ve e nao relata inteiro. Primeira mentira por
   omissao a Lervel, e ela sabe que e mentira quando lacra o envelope.

   REVELACAO 6 da arquitetura da informacao: "treinamento" e procedimento.
   NAO PODE VAZAR AQUI: a camara (Cap. 5), Serafina saber quem ela e
   (Cap. 8), a antecessora (Cap. 8), Khar'Vel em Klara (Cap. 7).
   O jogador aprende o VOCABULARIO, nunca o mecanismo.

   OS GUARDIOES entram aqui - Elsbeth, Cort e Ines. Ines e a jovem com
   duvidas que nunca expressa: o contraponto de Ren do outro lado da casa.
   (Confirmacao do autor ainda pendente; escritos como presenca, sem lore
   nova alem do que o documento mestre ja dava.)

   O FIO DE KLARA:
   Ela quer faltar. Tenta ficar doente de proposito. Nao funciona.
   E a primeira vez que ela tenta contra a casa em vez de contornar.

   O SENTIDO CONTRARIO (canon de 26/07/2026):
   Antoniette repete com Klara gestos da propria mae e os classifica como
   metodo. Aqui entra o primeiro: ela repara se a menina comeu, e chama
   isso de "alteracao de apetite e dado".
   PROIBIDO: as palavras mae, filha e amor. Ela nao percebe o que faz.

   OFICIO APLICADO:
   - O rotineiro recebe pouco detalhe. Para a familia o ritual e
     procedimento; descrito com detalhe vira espetaculo. (Kenworthy)
   - Antoniette ouve de fora e le quem sai da sala. (Peters)
   - A casa nunca e burra: deixam ela ver de proposito, e ha motivo.
   - Fenn tem agenda propria e ela cobra pela primeira vez.
   - A opcao de 'hope' cai na posicao 2, porque nos capitulos 1 a 3 ela
     caiu em 2, 1 e 3. Ordem de exibicao: C B A.

   Contrato: as flags 'ritual_report' e 'saw_ritual' nao mudam de nome.

   Oito cenas: C1 o vocabulario, C2 a vespera, C3 a tentativa de Klara,
   C4 o corredor de outubro, C5 o que ela viu, C6 o relatorio (escolha),
   C7 o braco sem curativo, C8 fim de outubro.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

/* --------------------------------------------------------------------------
   ESCOLHA - O QUE ENTRA NO RELATORIO

   A: relatar inteiro. Lervel recebe a verdade e faz o que Lervel faz.
   B: relatar pela metade. O termo tecnico sem o que ela viu.
   C: nao relatar. O caderno sem identificacao engorda.

   Cada ramo leva o "e se" a uma conclusao logica e ruim diferente.
   -------------------------------------------------------------------------- */

var C4_RITUAL_A = [
  { t:'nar', tx:'Ela escreveu tudo. A hora, os nomes, o que ouviu pela porta, o estado da menina depois.' },
  { t:'nar', tx:'Quatro p\u00e1ginas. Levou at\u00e9 o amanhecer.' },
  { t:'pause' },
  { t:'inn', tx:'Isto \u00e9 o que a Ordem me mandou fazer.' },
  { t:'nar', tx:'Lacrou o envelope e o deixou na sa\u00edda da manh\u00e3.' },
  { t:'pause' },
  { t:'nar', tx:'A resposta de Lervel chegou em nove dias, e tinha tr\u00eas linhas.' },

  { t:'arc', key:'lervel', label:'\u2014 Ordem dos Olhos Cinzentos \u2014 resposta \u2014', lns:[
      'Recebido. Excelente detalhamento.',
      'Manter observa\u00e7\u00e3o. N\u00e3o intervir sob nenhuma circunst\u00e2ncia.',
      'Prazo estimado revisto para quatro anos.'
  ]},

  { t:'inn', tx:'N\u00e3o intervir sob nenhuma circunst\u00e2ncia.' },
  { t:'pause' },
  { t:'inn', tx:'Eu contei tudo e eles anotaram tudo, e a \u00fanica coisa que mudou foi o prazo.' }
];

var C4_RITUAL_B = [
  { t:'nar', tx:'Ela escreveu o termo e o calend\u00e1rio. Outubro, quatro dias, tr\u00eas oficiantes, sujeito K.' },
  { t:'nar', tx:'N\u00e3o escreveu o que ouviu pela porta.' },
  { t:'pause' },
  { t:'inn', tx:'O que eu ouvi n\u00e3o \u00e9 dado. \u00c9 impress\u00e3o.' },
  { t:'nar', tx:'Releu a frase e a manteve, sabendo o que ela era.' },
  { t:'pause' },
  { t:'nar', tx:'Lacrou o envelope e ficou com a m\u00e3o em cima dele por um tempo.' },
  { t:'inn', tx:'Um relat\u00f3rio com termo t\u00e9cnico e sem testemunha \u00e9 um relat\u00f3rio que n\u00e3o pede nada.' },
  { t:'inn', tx:'Foi o que eu quis.' }
];

var C4_RITUAL_C = [
  { t:'nar', tx:'O relat\u00f3rio para Lervel saiu em vinte minutos. Volumes catalogados, estado das encaderna\u00e7\u00f5es, previs\u00e3o de conclus\u00e3o.' },
  { t:'nar', tx:'Nada de outubro.' },
  { t:'pause' },
  { t:'nar', tx:'Depois tirou o caderno sem identifica\u00e7\u00e3o de baixo do forro do ba\u00fa.',
    if:{ archive_seed:true } },
  { t:'nar', tx:'Depois tirou do ba\u00fa um caderno em branco e n\u00e3o escreveu data nem cabe\u00e7alho.',
    if:{ archive_seed:false } },

  { t:'arc', key:'sem_identificacao', label:'\u2014 caderno sem identifica\u00e7\u00e3o \u2014', lns:[
      'Outubro. Quatro dias. Tr\u00eas oficiantes.',
      'Chamam de treinamento entre si, sem baixar a voz.',
      'A menina entrou andando e saiu andando.',
      'N\u00e3o sei o que aconteceu no meio e n\u00e3o vou fingir que sei.'
  ]},

  { t:'inn', tx:'A \u00faltima linha \u00e9 a \u00fanica honesta que eu escrevi hoje.' },
  { t:'nar', tx:'Guardou o caderno debaixo do forro e deixou o envelope de Lervel na beira da mesa.' },
  { t:'pause' },
  { t:'inn', tx:'Dois documentos sobre o mesmo m\u00eas. Um deles vai viajar.' }
];

RBF.CHAPTER4 = [

{ t:'chap', num:'CAP\u00cdTULO 4', name:'OS RITUAIS DE OUTUBRO', chapter:'capitulo4' },
{ t:'fade_out' },

/* ======================================================================
   C1 - A COPA - INICIO DE OUTUBRO
   O vocabulario chega por acidente, no meio de um assunto domestico.
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c4_vocabulario', chapter:'capitulo4', title:'A palavra',
  bg:'bg_kitchen', bgm:'bgm_nidhaus' },
{ t:'fade_in' },

{ t:'nar', tx:'Em outubro a copa cheira a repolho e a gordura fria. A janela fica fechada o dia inteiro.' },
{ t:'nar', tx:'Antoniette catalogava a lista de conserva na ponta da mesa porque a biblioteca estava fria demais de manh\u00e3.' },

{ t:'spr', ch:'dara', ex:'neutral', pos:'center' },
{ t:'dial', ch:'dara', tx:'Semana que vem eu preciso da senhorita fora da ala leste depois das quatro.' },
{ t:'dial', ch:'antoniette', tx:'Por quantos dias?' },
{ t:'dial', ch:'dara', tx:'Quatro.' },
{ t:'pause' },
{ t:'dial', ch:'antoniette', tx:'Obra?' },
{ t:'dial', ch:'dara', tx:'Treinamento.' },

{ t:'nar', tx:'Ela disse a palavra e continuou descascando, sem pausa e sem baixar a voz.' },
{ t:'pause' },
{ t:'inn', tx:'Ela n\u00e3o explicou o termo.' },
{ t:'inn', tx:'Quem explica um termo acha que o outro n\u00e3o conhece. Ela achou que eu conhecia.' },

{ t:'dial', ch:'antoniette', tx:'Treinamento de qu\u00ea?' },
{ t:'spr', ch:'dara', ex:'guarded', pos:'center' },
{ t:'nar', tx:'A faca parou.' },
{ t:'dial', ch:'dara', tx:'Da casa.' },
{ t:'nar', tx:'E voltou a andar, mais devagar do que antes.' },
{ t:'spr_hide', ch:'dara' },

{ t:'inn', tx:'Ela respondeu duas palavras e errou uma.' },
{ t:'pause' },
{ t:'inn', tx:'"Da casa" n\u00e3o \u00e9 resposta para "de qu\u00ea". \u00c9 resposta para "de quem".' },

/* ======================================================================
   C2 - O PATIO - VESPERA
   Os guardioes chegam. O rotineiro recebe pouco detalhe. (Kenworthy)
   Fenn cobra pela primeira vez. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c4_vespera', chapter:'capitulo4', title:'A v\u00e9spera',
  bg:'bg_nidhaus_gate', bgm:'bgm_grey_march' },

{ t:'sfx', id:'sfx_door' },
{ t:'nar', tx:'A carruagem chegou \u00e0s tr\u00eas e ningu\u00e9m saiu para receber.' },
{ t:'nar', tx:'Desceram tr\u00eas pessoas com casaco de viagem e uma caixa de couro comprida, do tamanho de uma prancheta.' },
{ t:'pause' },

{ t:'nar', tx:'Uma mulher de sessenta anos e m\u00e3o firme. Um homem de barba curta, que conferiu a caixa antes de solt\u00e1-la.' },
{ t:'nar', tx:'E uma terceira, mais nova que Antoniette, que ficou perto da carruagem tempo demais.' },

{ t:'spr', ch:'fenn', ex:'neutral', pos:'left' },
{ t:'dial', ch:'antoniette', tx:'H\u00f3spedes?' },
{ t:'dial', ch:'fenn', tx:'Elsbeth, Cort e Ines.' },
{ t:'dial', ch:'antoniette', tx:'De onde?' },
{ t:'pause' },
{ t:'dial', ch:'fenn', tx:'V\u00eam em outubro.' },

{ t:'inn', tx:'Ele me deu tr\u00eas nomes e nenhum sobrenome, e respondeu "de onde" com "quando".' },

{ t:'nar', tx:'Fenn pegou a caixa comprida e a levou sozinho, com as duas m\u00e3os, sem apoiar no ombro.' },
{ t:'nar', tx:'Levou pelo p\u00e1tio, e n\u00e3o pela porta da frente.' },
{ t:'pause' },

{ t:'dial', ch:'antoniette', tx:'Fenn.' },
{ t:'nar', tx:'Ele parou sem virar.' },
{ t:'dial', ch:'antoniette', tx:'Quantos outubros o senhor j\u00e1 viu?' },
{ t:'pause' },
{ t:'dial', ch:'fenn', tx:'Nove.' },
{ t:'dial', ch:'antoniette', tx:'E o seu filho?' },
{ t:'nar', tx:'A\u00ed ele virou.' },
{ t:'spr', ch:'fenn', ex:'neutral', pos:'left' },
{ t:'dial', ch:'fenn', tx:'O meu filho n\u00e3o trabalha aqui.' },
{ t:'pause' },
{ t:'dial', ch:'fenn', tx:'E n\u00e3o vai.' },
{ t:'spr_hide', ch:'fenn' },

{ t:'inn', tx:'Eu perguntei por curiosidade e recebi uma decis\u00e3o.' },
{ t:'inn', tx:'Ele j\u00e1 tinha essa frase pronta antes de eu chegar nesta casa.' },

/* ======================================================================
   C3 - O CORREDOR LESTE
   Klara tenta contra a casa pela primeira vez. E falha.
   Aqui entra o primeiro gesto materno classificado como metodo.
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c4_tentativa', chapter:'capitulo4', title:'A tentativa',
  bg:'bg_corridor', bgm:null },

{ t:'nar', tx:'Na manh\u00e3 do primeiro dia a porta do quarto das g\u00eameas estava fechada, o que n\u00e3o acontecia.' },
{ t:'nar', tx:'Do outro lado, Liara falava alto e sozinha.' },
{ t:'pause' },

{ t:'spr', ch:'liara', ex:'neutral', pos:'right' },
{ t:'dial', ch:'liara', tx:'Voc\u00ea n\u00e3o est\u00e1 quente!' },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'dial', ch:'klara', tx:'Estou.' },
{ t:'dial', ch:'liara', tx:'Eu pus a m\u00e3o. Voc\u00ea n\u00e3o est\u00e1.' },
{ t:'dial', ch:'klara', tx:'P\u00f5e de novo.' },
{ t:'pause' },
{ t:'dial', ch:'liara', tx:'Voc\u00ea molhou a testa.' },
{ t:'dial', ch:'klara', tx:'N\u00e3o molhei.' },
{ t:'dial', ch:'liara', tx:'Tem \u00e1gua no travesseiro.' },

{ t:'nar', tx:'Sil\u00eancio do outro lado por uns quatro segundos.' },
{ t:'dial', ch:'klara', tx:'N\u00e3o conta.' },
{ t:'dial', ch:'liara', tx:'Por qu\u00ea?' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'S\u00f3 n\u00e3o conta.' },

{ t:'inn', tx:'Ela molhou a testa para parecer febre.' },
{ t:'inn', tx:'Uma crian\u00e7a de oito anos planejou isso ontem \u00e0 noite.' },
{ t:'pause' },

{ t:'nar', tx:'A senhora Elke subiu \u00e0s nove, entrou sem bater e desceu com Klara tr\u00eas minutos depois.' },
{ t:'spr_hide', ch:'klara' },
{ t:'spr_hide', ch:'liara' },
{ t:'nar', tx:'Ningu\u00e9m levantou a voz. Ningu\u00e9m explicou nada a ningu\u00e9m.' },
{ t:'pause' },

{ t:'nar', tx:'No almo\u00e7o, o prato da menina voltou para a copa como saiu.' },
{ t:'inn', tx:'Ela n\u00e3o comeu.' },
{ t:'nar', tx:'Antoniette anotou no caderno operacional, entre a contagem de volumes e o estado das encaderna\u00e7\u00f5es.' },
{ t:'inn', tx:'Altera\u00e7\u00e3o de apetite \u00e9 dado. Registrar.' },
{ t:'pause' },
{ t:'nar', tx:'Depois voltou \u00e0 p\u00e1gina anterior e conferiu se tinha anotado a mesma coisa na ter\u00e7a.' },
{ t:'nar', tx:'Tinha.' },

/* ======================================================================
   C4 - O CORREDOR DE OUTUBRO - FIM DE TARDE
   Ela ouve de fora. O horror pela posicao de quem esta preso na cena.
   O ritual e procedimento e recebe pouco detalhe.
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c4_porta', chapter:'capitulo4', title:'Quatro e dez',
  bg:'bg_corridor', bgm:'bgm_archive' },

{ t:'nar', tx:'Dara pediu a ala leste vazia depois das quatro. Antoniette estava no corredor \u00e0s quatro e dez.' },
{ t:'inn', tx:'Se algu\u00e9m perguntar, eu vim buscar dois volumes que ficaram no quarto.' },
{ t:'nar', tx:'Os dois volumes estavam debaixo do bra\u00e7o dela, pelo mesmo motivo.' },
{ t:'pause' },

{ t:'nar', tx:'A porta do fim do corredor estava fechada e havia luz por baixo.' },
{ t:'nar', tx:'O corredor cheirava a \u00e1lcool e a alguma coisa met\u00e1lica que ela conhecia do ferimento dos outros, n\u00e3o dos pr\u00f3prios.' },
{ t:'pause' },

{ t:'nar', tx:'N\u00e3o havia grito.' },
{ t:'nar', tx:'Havia conversa, no volume de quem confere uma lista.' },

{ t:'dial', ch:'elsbeth', tx:'Segundo bra\u00e7o.' },
{ t:'pause' },
{ t:'dial', ch:'cort', tx:'Anotado.' },
{ t:'dial', ch:'elsbeth', tx:'Doze.' },
{ t:'dial', ch:'cort', tx:'Doze. Est\u00e1 subindo.' },
{ t:'pause' },
{ t:'dial', ch:'elsbeth', tx:'Est\u00e1 no prazo.' },

{ t:'inn', tx:'Doze o qu\u00ea.' },
{ t:'pause' },
{ t:'nar', tx:'Uma voz mais nova disse alguma coisa que Antoniette n\u00e3o pegou.' },
{ t:'dial', ch:'elsbeth', tx:'Ela sabe respirar. Faz isso desde os quatro.' },

{ t:'nar', tx:'Depois disso ficou s\u00f3 o som de instrumento pousado em pano.' },
{ t:'pause' },
{ t:'nar', tx:'Antoniette ficou no corredor por dezenove minutos e n\u00e3o ouviu a menina uma \u00fanica vez.' },
{ t:'inn', tx:'Nem para responder.' },

/* ======================================================================
   C5 - A PORTA ABRE
   Ela le quem sai da sala. (Peters)
   Ines e o contraponto de Ren: nova, obediente, e com duvida.
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c4_saida', chapter:'capitulo4', title:'Quem sai',
  bg:'bg_corridor', keepSprites:true },

{ t:'sfx', id:'sfx_door' },
{ t:'nar', tx:'A porta abriu \u00e0s cinco e quarenta.' },
{ t:'nar', tx:'Antoniette estava na curva do corredor, catalogando uma estante que n\u00e3o precisava ser catalogada.' },
{ t:'pause' },

{ t:'nar', tx:'Cort saiu primeiro, com a caixa fechada, e passou por ela dizendo boa tarde.' },
{ t:'nar', tx:'Elsbeth saiu depois, secando as m\u00e3os numa toalha, e n\u00e3o disse nada.' },
{ t:'pause' },

{ t:'spr', ch:'ines', ex:'neutral', pos:'right' },
{ t:'nar', tx:'A terceira saiu por \u00faltimo e parou no corredor, como quem esqueceu para onde ia.' },
{ t:'nar', tx:'Ficou ali uns cinco segundos, com a m\u00e3o ainda no puxador.' },
{ t:'pause' },

{ t:'dial', ch:'ines', tx:'Boa tarde.' },
{ t:'dial', ch:'antoniette', tx:'Boa tarde.' },
{ t:'nar', tx:'Ela olhou os volumes debaixo do bra\u00e7o de Antoniette e pareceu ir dizer alguma coisa.' },
{ t:'pause' },
{ t:'dial', ch:'ines', tx:'A senhorita \u00e9 a que cataloga.' },
{ t:'dial', ch:'antoniette', tx:'Sou.' },
{ t:'pause' },
{ t:'dial', ch:'ines', tx:'Deve ser bom.' },

{ t:'nar', tx:'E desceu antes que a frase pedisse resposta.' },
{ t:'spr_hide', ch:'ines' },
{ t:'pause' },

{ t:'inn', tx:'"Deve ser bom."' },
{ t:'inn', tx:'Ningu\u00e9m diz isso de um trabalho. Diz de uma vida.' },
{ t:'pause' },
{ t:'inn', tx:'Ela tem a minha idade e faz isto h\u00e1 tempo suficiente para achar que a alternativa \u00e9 boa.' },

{ t:'nar', tx:'A porta do fim do corredor ficou aberta por mais um tempo, e n\u00e3o saiu mais ningu\u00e9m.' },
{ t:'nar', tx:'Klara desceu sozinha, \u00e0s seis, pela escada de servi\u00e7o.' },
{ t:'inn', tx:'Andando.' },

/* ======================================================================
   C6 - O RELATORIO - NOITE
   ESCOLHA. Ordem de exibicao C B A - a de 'hope' na posicao 2, porque
   nos capitulos 1 a 3 ela caiu em 2, 1 e 3.
   ====================================================================== */
{ t:'scene', id:'c4_relatorio', chapter:'capitulo4', title:'O que entra no relat\u00f3rio',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'\u00c0 noite, o relat\u00f3rio mensal para Lervel.' },
{ t:'nar', tx:'Ela molhou a pena e ficou olhando a folha at\u00e9 a tinta secar na ponta.' },
{ t:'pause' },
{ t:'inn', tx:'Eu tenho a palavra. Tenho a data, os tr\u00eas nomes e a dura\u00e7\u00e3o.' },
{ t:'inn', tx:'E tenho dezenove minutos de corredor que n\u00e3o s\u00e3o dado nenhum.' },

{ t:'cho', id:'cap4_ritual', code:'C-IV', prompt:'O QUE ENTRA NO RELAT\u00d3RIO', opts:[
  { id:'C',
    tx:'Nada. Lervel recebe o invent\u00e1rio do m\u00eas, e o resto vai para o caderno sem identifica\u00e7\u00e3o.',
    flags:{ ritual_report:'C', saw_ritual:true, hid_from_order:true },
    routes:{ hope: 2, loss: 1 },
    then: C4_RITUAL_C },
  { id:'B',
    tx:'O termo e o calend\u00e1rio. Sem o que ela ouviu pela porta.',
    flags:{ ritual_report:'B', saw_ritual:true, hid_from_order:true },
    routes:{ answer: 1, loss: 1 },
    then: C4_RITUAL_B },
  { id:'A',
    tx:'Tudo. \u00c9 o que a Ordem mandou fazer, e \u00e9 o que ela veio fazer.',
    flags:{ ritual_report:'A', saw_ritual:true, hid_from_order:false },
    routes:{ answer: 2 },
    then: C4_RITUAL_A }
]},

/* ======================================================================
   C7 - O BRACO SEM CURATIVO
   O detalhe errado, sem reacao declarada. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c4_braco', chapter:'capitulo4', title:'O bra\u00e7o',
  bg:'bg_corridor', bgm:null },

{ t:'nar', tx:'Tr\u00eas dias depois de terminado, Liara arrastou a irm\u00e3 pelo corredor para mostrar um ninho no beiral.' },
{ t:'spr', ch:'liara', ex:'neutral', pos:'right' },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'dial', ch:'liara', tx:'Tem quatro! Ontem tinha tr\u00eas.' },
{ t:'dial', ch:'klara', tx:'Tinha quatro ontem. Voc\u00ea contou errado.' },
{ t:'dial', ch:'liara', tx:'N\u00e3o contei.' },
{ t:'dial', ch:'klara', tx:'Contou.' },

{ t:'nar', tx:'Para apontar, Klara levantou o bra\u00e7o, e a manga desceu at\u00e9 o cotovelo.' },
{ t:'pause' },
{ t:'nar', tx:'N\u00e3o havia curativo.' },
{ t:'nar', tx:'N\u00e3o havia marca, nem casca, nem a mancha amarela que uma dobra de cotovelo leva duas semanas para perder.' },
{ t:'pause' },

{ t:'nar', tx:'A pele estava limpa.' },
{ t:'spr_hide', ch:'klara' },
{ t:'spr_hide', ch:'liara' },
{ t:'inn', tx:'Em abril ela tinha um curativo e a irm\u00e3 n\u00e3o tinha nenhum.' },
{ t:'inn', tx:'Faz quatro dias que abriram os dois bra\u00e7os dela.' },
{ t:'pause' },
{ t:'nar', tx:'Antoniette anotou a data, a hora e a palavra limpa.' },
{ t:'inn', tx:'Sem conclus\u00e3o.' },

/* ======================================================================
   C8 - FIM DE OUTUBRO
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c4_fim', chapter:'capitulo4', title:'Fim de outubro',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'A carruagem dos tr\u00eas saiu no quinto dia, de manh\u00e3, sem que ningu\u00e9m fosse ao p\u00e1tio.' },
{ t:'nar', tx:'A casa voltou ao hor\u00e1rio de sempre no mesmo dia.' },
{ t:'pause' },

{ t:'nar', tx:'\u00c0 noite Antoniette abriu o caderno operacional e escreveu uma entrada curta.' },

{ t:'arc', key:'caderno', label:'\u2014 Caderno Operacional \u2014 Entrada 44 \u2014', lns:[
    'Outubro: quatro dias, tr\u00eas oficiantes externos, ala leste interditada.',
    'Denomina\u00e7\u00e3o usada pela casa, sem baixar a voz: treinamento.',
    'O sujeito K. entrou andando nos quatro dias e saiu andando nos quatro.',
    'N\u00e3o h\u00e1 registro de instru\u00e7\u00e3o verbal para a criadagem. Todos j\u00e1 sabiam.'
]},

{ t:'nar', tx:'Releu a \u00faltima linha e acrescentou uma nota abaixo dela.' },

{ t:'arc', key:'compilador', label:'\u2014 nota do Compilador \u2014', lns:[
    '44a. O Compilador esteve no corredor por dezenove minutos naquela tarde.',
    'O relat\u00f3rio da mesma data n\u00e3o menciona isso porque dezenove minutos de',
    'porta fechada n\u00e3o constituem observa\u00e7\u00e3o.',
    'N\u00e3o por outro motivo.'
]},

{ t:'pause' },
{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'Apagou a vela.' },
{ t:'pause' },

{ t:'inn', tx:'Eles chamam de treinamento.' },
{ t:'inn', tx:'E chamam assim entre eles, quando acham que n\u00e3o tem ningu\u00e9m ouvindo.' },
{ t:'pause' },
{ t:'inn', tx:'Uma palavra que a pessoa usa em particular \u00e9 a palavra em que ela acredita.' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Primeiro outubro em Velha Nidhaus.', line2:'Ela guardou dezenove minutos para si.',
  chapter:'capitulo4' },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.CHAPTER4; }
