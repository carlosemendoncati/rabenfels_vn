/* ==========================================================================
   ARQUIVO RABENFELS - js/data/chapter4.js
   CAPITULO 4: "Os Rituais de Outubro"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.

   QUANDO: Ano 1, outubro. Klara e Liara tem oito anos.

   O PENSAMENTO UNICO DESTE CAPITULO (Zinsser, unidade):
   "Eles chamam de treinamento, e chamam assim entre si, quando ninguem
   esta ouvindo."

   A TROCA (docs/biblia_narrativa_rabenfels.md):
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
  { t:'nar', tx:'Quatro páginas. Levou até o amanhecer.' },
  { t:'pause' },
  { t:'inn', tx:'Isto é o que a Ordem me mandou fazer.' },
  { t:'nar', tx:'Lacrou o envelope e o deixou na saída da manhã.' },
  { t:'pause' },
  { t:'nar', tx:'A resposta de Lervel chegou em nove dias, e tinha três linhas.' },

  { t:'arc', key:'lervel', label:'— Ordem dos Olhos Cinzentos — resposta —', lns:[
      'Recebido. Excelente detalhamento.',
      'Manter observação. Não intervir sob nenhuma circunstância.',
      'Prazo estimado revisto para quatro anos.'
  ]},

  { t:'inn', tx:'Não intervir sob nenhuma circunstância.' },
  { t:'pause' },
  { t:'inn', tx:'Eu contei tudo e eles anotaram tudo, e a única coisa que mudou foi o prazo.' }
];

var C4_RITUAL_B = [
  { t:'nar', tx:'Ela escreveu o termo e o calendário. Outubro, quatro dias, três oficiantes, sujeito K.' },
  { t:'nar', tx:'Não escreveu o que ouviu pela porta.' },
  { t:'pause' },
  { t:'inn', tx:'O que eu ouvi não é dado. É impressão.' },
  { t:'nar', tx:'Releu a frase e a manteve, sabendo o que ela era.' },
  { t:'pause' },
  { t:'nar', tx:'Lacrou o envelope. A cera endureceu sob a palma antes que ela recolhesse a mão.' },
  { t:'inn', tx:'Um relatório com termo técnico e sem testemunha é um relatório que não pede nada.' },
  { t:'inn', tx:'Foi o que eu quis.' }
];

var C4_RITUAL_C = [
  { t:'nar', tx:'O relatório para Lervel saiu em vinte minutos. Volumes catalogados, estado das encadernações, previsão de conclusão.' },
  { t:'nar', tx:'Nada de outubro.' },
  { t:'pause' },
  { t:'nar', tx:'Depois tirou o caderno sem identificação de baixo do forro do baú.',
    if:{ archive_seed:true } },
  { t:'nar', tx:'Depois tirou do baú um caderno em branco e não escreveu data nem cabeçalho.',
    if:{ archive_seed:false } },

  { t:'arc', key:'sem_identificacao', label:'— caderno sem identificação —', lns:[
      'Outubro. Quatro dias. Três oficiantes.',
      'Chamam de treinamento entre si, sem baixar a voz.',
      'A menina entrou andando e saiu andando.',
      'Não sei o que aconteceu no meio e não vou fingir que sei.'
  ]},

  { t:'inn', tx:'A última linha é a única honesta que eu escrevi hoje.' },
  { t:'nar', tx:'Guardou o caderno debaixo do forro e deixou o envelope de Lervel na beira da mesa.' },
  { t:'pause' },
  { t:'inn', tx:'Dois documentos sobre o mesmo mês. Um deles vai viajar.' }
];

RBF.CHAPTER4 = [

{ t:'chap', num:'CAPÍTULO 4', name:'OS RITUAIS DE OUTUBRO', chapter:'capitulo4' },
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
{ t:'nar', tx:'Antoniette catalogava a lista de conserva na ponta da mesa porque a biblioteca estava fria demais de manhã.' },

{ t:'spr', ch:'dara', ex:'neutral', pos:'center' },
{ t:'dial', ch:'dara', tx:'Semana que vem eu preciso da senhorita fora da ala leste depois das quatro.' },
{ t:'dial', ch:'antoniette', tx:'Por quantos dias?' },
{ t:'dial', ch:'dara', tx:'Quatro.' },
{ t:'pause' },
{ t:'dial', ch:'antoniette', tx:'Obra?' },
{ t:'dial', ch:'dara', tx:'Treinamento.' },

{ t:'nar', tx:'Ela disse a palavra e continuou descascando, sem pausa e sem baixar a voz.' },
{ t:'pause' },
{ t:'inn', tx:'Ela não explicou o termo.' },
{ t:'inn', tx:'Quem explica um termo acha que o outro não conhece. Ela achou que eu conhecia.' },

{ t:'dial', ch:'antoniette', tx:'Treinamento de quê?' },
{ t:'spr', ch:'dara', ex:'guarded', pos:'center' },
{ t:'nar', tx:'A faca parou.' },
{ t:'dial', ch:'dara', tx:'Da casa.' },
{ t:'nar', tx:'E voltou a andar, mais devagar do que antes.' },
{ t:'spr_hide', ch:'dara' },

{ t:'inn', tx:'Ela respondeu duas palavras e errou uma.' },
{ t:'pause' },
{ t:'inn', tx:'"Da casa" responde "de quem". Eu perguntei "de quê".' },
{ t:'pause' },
{ t:'inn', tx:'E não sei se ela ouviu errado ou se respondeu a outra pergunta de propósito.' },
{ t:'nar', tx:'Antoniette anotou as duas hipóteses e não riscou nenhuma.' },

/* ======================================================================
   C2 - O PATIO - VESPERA
   Os guardioes chegam. O rotineiro recebe pouco detalhe. (Kenworthy)
   Fenn cobra pela primeira vez. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c4_vespera', chapter:'capitulo4', title:'A véspera',
  bg:'bg_nidhaus_gate', bgm:'bgm_grey_march' },

{ t:'sfx', id:'sfx_door' },
{ t:'nar', tx:'A carruagem chegou às três e ninguém saiu para receber.' },
{ t:'nar', tx:'Desceram três pessoas com casaco de viagem e uma caixa de couro comprida, do tamanho de uma prancheta.' },
{ t:'pause' },

{ t:'nar', tx:'Uma mulher de sessenta anos e mão firme. Um homem de barba curta, que conferiu a caixa antes de soltá-la.' },
{ t:'nar', tx:'E uma terceira, mais nova que Antoniette, que ficou perto da carruagem tempo demais.' },

{ t:'spr', ch:'fenn', ex:'neutral', pos:'left' },
{ t:'dial', ch:'antoniette', tx:'Hóspedes?' },
{ t:'dial', ch:'fenn', tx:'Elsbeth, Cort e Ines.' },
{ t:'dial', ch:'antoniette', tx:'De onde?' },
{ t:'pause' },
{ t:'dial', ch:'fenn', tx:'Vêm em outubro.' },

{ t:'inn', tx:'Ele me deu três nomes e nenhum sobrenome, e respondeu "de onde" com "quando".' },

{ t:'nar', tx:'Fenn pegou a caixa comprida e a levou sozinho, com as duas mãos, sem apoiar no ombro.' },
{ t:'nar', tx:'Levou pelo pátio, e não pela porta da frente.' },
{ t:'pause' },

{ t:'dial', ch:'antoniette', tx:'Fenn.' },
{ t:'nar', tx:'Ele parou sem virar.' },
{ t:'dial', ch:'antoniette', tx:'Quantos outubros o senhor já viu?' },
{ t:'pause' },
{ t:'dial', ch:'fenn', tx:'Nove.' },
{ t:'dial', ch:'antoniette', tx:'E o seu filho?' },
{ t:'nar', tx:'Aí ele virou.' },
{ t:'spr', ch:'fenn', ex:'neutral', pos:'left' },
{ t:'dial', ch:'fenn', tx:'O meu filho não trabalha aqui.' },
{ t:'pause' },
{ t:'dial', ch:'fenn', tx:'E não vai.' },
{ t:'spr_hide', ch:'fenn' },

{ t:'inn', tx:'Eu perguntei por curiosidade e recebi uma decisão.' },
{ t:'inn', tx:'Ele já tinha essa frase pronta antes de eu chegar nesta casa.' },
{ t:'nar', tx:'Ela voltou pelo caminho mais longo, contando as janelas acesas do lado norte. Eram sempre as mesmas quatro.' },

/* ======================================================================
   C3 - O CORREDOR LESTE
   Klara tenta contra a casa pela primeira vez. E falha.
   Aqui entra o primeiro gesto materno classificado como metodo.
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c4_tentativa', chapter:'capitulo4', title:'A tentativa',
  bg:'bg_corridor', bgm:null },

{ t:'nar', tx:'Na manhã do primeiro dia a porta do quarto das gêmeas estava fechada, o que não acontecia.' },
{ t:'nar', tx:'Do outro lado, Liara falava alto e sozinha.' },
{ t:'pause' },

{ t:'spr', ch:'liara', ex:'neutral', pos:'right' },
{ t:'dial', ch:'liara', tx:'Você não está quente!' },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'dial', ch:'klara', tx:'Estou.' },
{ t:'dial', ch:'liara', tx:'Eu pus a mão. Você não está.' },
{ t:'dial', ch:'klara', tx:'Põe de novo.' },
{ t:'pause' },
{ t:'dial', ch:'liara', tx:'Você molhou a testa.' },
{ t:'dial', ch:'klara', tx:'Não molhei.' },
{ t:'dial', ch:'liara', tx:'Tem água no travesseiro.' },

{ t:'nar', tx:'Silêncio do outro lado por uns quatro segundos.' },
{ t:'dial', ch:'klara', tx:'Não conta.' },
{ t:'dial', ch:'liara', tx:'Por quê?' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'Só não conta.' },

{ t:'inn', tx:'Ela molhou a testa para parecer febre.' },
{ t:'inn', tx:'Uma criança de oito anos planejou isso ontem à noite.' },
{ t:'pause' },

{ t:'nar', tx:'A senhora Elke subiu às nove, entrou sem bater e desceu com Klara três minutos depois.' },
{ t:'spr_hide', ch:'klara' },
{ t:'spr_hide', ch:'liara' },
{ t:'nar', tx:'Ninguém levantou a voz. Ninguém explicou nada a ninguém.' },
{ t:'pause' },

{ t:'nar', tx:'No almoço, o prato da menina voltou para a copa como saiu.' },
{ t:'inn', tx:'Ela não comeu.' },
{ t:'nar', tx:'Antoniette anotou no caderno operacional, entre a contagem de volumes e o estado das encadernações.' },
{ t:'inn', tx:'Alteração de apetite é dado. Registrar.' },
{ t:'pause' },
{ t:'nar', tx:'Depois voltou à página anterior e conferiu se tinha anotado a mesma coisa na terça.' },
{ t:'nar', tx:'Tinha.' },

/* ======================================================================
   C4 - O CORREDOR DE OUTUBRO - FIM DE TARDE
   Ela ouve de fora. O horror pela posicao de quem esta preso na cena.
   O ritual e procedimento e recebe pouco detalhe.
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c4_porta', chapter:'capitulo4', title:'Quatro e dez',
  bg:'bg_corridor', bgm:'bgm_archive' },

{ t:'nar', tx:'Dara pediu a ala leste vazia depois das quatro. Antoniette estava no corredor às quatro e dez.' },
{ t:'inn', tx:'Se alguém perguntar, eu vim buscar dois volumes que ficaram no quarto.' },
{ t:'nar', tx:'Os dois volumes estavam debaixo do braço dela, pelo mesmo motivo.' },
{ t:'pause' },

{ t:'nar', tx:'A porta do fim do corredor estava fechada e havia luz por baixo.' },
{ t:'nar', tx:'O corredor cheirava a álcool e a alguma coisa metálica que ela conhecia do ferimento dos outros, não dos próprios.' },
{ t:'pause' },

{ t:'nar', tx:'Não havia grito.' },
{ t:'nar', tx:'Havia conversa, no volume de quem confere uma lista.' },

{ t:'dial', ch:'elsbeth', tx:'Segundo braço.' },
{ t:'pause' },
{ t:'dial', ch:'cort', tx:'Anotado.' },
{ t:'dial', ch:'elsbeth', tx:'Doze.' },
{ t:'dial', ch:'cort', tx:'Doze. Está subindo.' },
{ t:'pause' },
{ t:'dial', ch:'elsbeth', tx:'Está no prazo.' },

{ t:'inn', tx:'Doze o quê.' },
{ t:'pause' },
{ t:'nar', tx:'Uma voz mais nova disse alguma coisa que Antoniette não pegou.' },
{ t:'dial', ch:'elsbeth', tx:'Ela sabe respirar. Faz isso desde os quatro.' },

{ t:'nar', tx:'Depois disso ficou só o som de instrumento pousado em pano.' },
{ t:'pause' },
{ t:'nar', tx:'Antoniette ficou no corredor por dezenove minutos e não ouviu a menina uma única vez.' },
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
{ t:'nar', tx:'A porta abriu às cinco e quarenta.' },
{ t:'nar', tx:'Antoniette estava na curva do corredor, catalogando uma estante que não precisava ser catalogada.' },
{ t:'pause' },

{ t:'nar', tx:'Cort saiu primeiro, com a caixa fechada, e passou por ela dizendo boa tarde.' },
{ t:'nar', tx:'Elsbeth saiu depois, secando as mãos numa toalha, e não disse nada.' },
{ t:'pause' },

{ t:'spr', ch:'ines', ex:'neutral', pos:'right' },
{ t:'nar', tx:'A terceira saiu por último e parou no corredor. Ficou com a mão no puxador e os olhos no piso.' },
{ t:'nar', tx:'Ficou ali uns cinco segundos, com a mão ainda no puxador.' },
{ t:'pause' },

{ t:'dial', ch:'ines', tx:'Boa tarde.' },
{ t:'dial', ch:'antoniette', tx:'Boa tarde.' },
{ t:'nar', tx:'Ela olhou os volumes debaixo do braço de Antoniette e pareceu ir dizer alguma coisa.' },
{ t:'pause' },
{ t:'dial', ch:'ines', tx:'A senhorita é a que cataloga.' },
{ t:'dial', ch:'antoniette', tx:'Sou.' },
{ t:'pause' },
{ t:'dial', ch:'ines', tx:'Deve ser bom.' },

{ t:'nar', tx:'E desceu antes que a frase pedisse resposta.' },
{ t:'spr_hide', ch:'ines' },
{ t:'pause' },

{ t:'inn', tx:'"Deve ser bom."' },
{ t:'inn', tx:'Ninguém diz isso de um trabalho. Diz de uma vida.' },
{ t:'pause' },
{ t:'inn', tx:'Ela tem a minha idade. Quando disse "deve ser bom", olhou para a porta que acabara de fechar.' },

{ t:'nar', tx:'A porta do fim do corredor ficou aberta por mais um tempo, e não saiu mais ninguém.' },
{ t:'nar', tx:'Klara desceu sozinha, às seis, pela escada de serviço.' },
{ t:'inn', tx:'Andando.' },

/* ======================================================================
   C6 - O RELATORIO - NOITE
   ESCOLHA. Ordem de exibicao C B A - a de 'hope' na posicao 2, porque
   nos capitulos 1 a 3 ela caiu em 2, 1 e 3.
   ====================================================================== */
{ t:'scene', id:'c4_relatorio', chapter:'capitulo4', title:'O que entra no relatório',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'À noite, o relatório mensal para Lervel.' },
{ t:'nar', tx:'Ela molhou a pena e ficou olhando a folha até a tinta secar na ponta.' },
{ t:'pause' },
{ t:'inn', tx:'Eu tenho a palavra. Tenho a data, os três nomes e a duração.' },
{ t:'inn', tx:'E tenho dezenove minutos de corredor que não são dado nenhum.' },

{ t:'cho', id:'cap4_ritual', code:'C-IV', prompt:'O QUE ENTRA NO RELATÓRIO', opts:[
  { id:'C',
    tx:'Nada. Lervel recebe o inventário do mês, e o resto vai para o caderno sem identificação.',
    flags:{ ritual_report:'C', saw_ritual:true, hid_from_order:true },
    routes:{ hope: 2, loss: 1 },
    then: C4_RITUAL_C },
  { id:'B',
    tx:'O termo e o calendário. Sem o que ela ouviu pela porta.',
    flags:{ ritual_report:'B', saw_ritual:true, hid_from_order:true },
    routes:{ answer: 1, loss: 1 },
    then: C4_RITUAL_B },
  { id:'A',
    tx:'Tudo. É o que a Ordem mandou fazer, e é o que ela veio fazer.',
    flags:{ ritual_report:'A', saw_ritual:true, hid_from_order:false },
    routes:{ answer: 2 },
    then: C4_RITUAL_A }
]},

/* ======================================================================
   C7 - O BRACO SEM CURATIVO
   O detalhe errado, sem reacao declarada. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c4_braco', chapter:'capitulo4', title:'O braço',
  bg:'bg_corridor', bgm:null },

{ t:'nar', tx:'Três dias depois de terminado, Liara arrastou a irmã pelo corredor para mostrar um ninho no beiral.' },
{ t:'spr', ch:'liara', ex:'neutral', pos:'right' },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'dial', ch:'liara', tx:'Tem quatro! Ontem tinha três.' },
{ t:'dial', ch:'klara', tx:'Tinha quatro ontem. Você contou errado.' },
{ t:'dial', ch:'liara', tx:'Não contei.' },
{ t:'dial', ch:'klara', tx:'Contou.' },

{ t:'nar', tx:'Para apontar, Klara levantou o braço, e a manga desceu até o cotovelo.' },
{ t:'pause' },
{ t:'nar', tx:'Não havia curativo.' },
{ t:'nar', tx:'Não havia marca, nem casca, nem a mancha amarela que uma dobra de cotovelo leva duas semanas para perder.' },
{ t:'pause' },

{ t:'nar', tx:'A pele estava limpa.' },
{ t:'spr_hide', ch:'klara' },
{ t:'spr_hide', ch:'liara' },
{ t:'inn', tx:'Em abril ela tinha um curativo e a irmã não tinha nenhum.' },
{ t:'inn', tx:'Faz quatro dias que abriram os dois braços dela.' },
{ t:'pause' },
{ t:'nar', tx:'Antoniette anotou a data, a hora e a palavra limpa.' },
{ t:'inn', tx:'Sem conclusão.' },

/* ======================================================================
   C8 - FIM DE OUTUBRO
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c4_fim', chapter:'capitulo4', title:'Fim de outubro',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'A carruagem dos três saiu no quinto dia, de manhã, sem que ninguém fosse ao pátio.' },
{ t:'nar', tx:'A casa voltou ao horário de sempre no mesmo dia.' },
{ t:'pause' },

{ t:'nar', tx:'À noite Antoniette abriu o caderno operacional e escreveu uma entrada curta.' },

{ t:'arc', key:'caderno', label:'— Caderno Operacional — Entrada 44 —', lns:[
    'Outubro: quatro dias, três oficiantes externos, ala leste interditada.',
    'Denominação usada pela casa, sem baixar a voz: treinamento.',
    'O sujeito K. entrou andando nos quatro dias e saiu andando nos quatro.',
    'Não há registro de instrução verbal para a criadagem. Todos já sabiam.'
]},

{ t:'nar', tx:'Releu a última linha e acrescentou uma nota abaixo dela.' },

{ t:'arc', key:'compilador', label:'— nota do Compilador —', lns:[
    '44a. O Compilador esteve no corredor por dezenove minutos naquela tarde.',
    'O relatório da mesma data não menciona isso porque dezenove minutos de',
    'porta fechada não constituem observação.',
    'Não por outro motivo.'
]},

{ t:'pause' },
{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'Apagou a vela.' },
{ t:'pause' },

{ t:'inn', tx:'Eles chamam de treinamento.' },
{ t:'inn', tx:'E chamam assim entre eles, quando acham que não tem ninguém ouvindo.' },
{ t:'pause' },
{ t:'inn', tx:'Uma palavra que a pessoa usa em particular é a palavra em que ela acredita.' },
{ t:'nar', tx:'Ela escreveu a palavra da casa no caderno, sozinha no meio da folha, e deixou o resto da página em branco.' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Primeiro outubro em Velha Nidhaus.', line2:'Ela guardou dezenove minutos para si.',
  chapter:'capitulo4' },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.CHAPTER4; }
