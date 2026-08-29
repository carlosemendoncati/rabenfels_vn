/* ==========================================================================
   ARQUIVO RABENFELS - js/data/chapter5.js
   CAPITULO 5: "A Camara"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.

   QUANDO: Ano 2, fevereiro. Klara e Liara tem nove anos.

   O PENSAMENTO UNICO DESTE CAPITULO (Zinsser, unidade):
   "O nome mais antigo daquele lugar e o unico honesto que esta casa ja
   produziu."

   A TROCA (docs/biblia_narrativa_rabenfels.md):
   Ela ganha a camara.
   Entrega a seguranca da cobertura. A partir daqui a casa sabe, e o que
   ela paga nao e ser pega - e ser REGISTRADA.

   REVELACAO 7 da arquitetura da informacao: a camara existe e tem porta.
   NAO PODE VAZAR AQUI: o mecanismo do pacto, Serafina saber quem ela e
   (Cap. 8), a antecessora (Cap. 8), Khar'Vel em Klara (Cap. 7).
   Ela ENTRA e nao entende. Entender e o Capitulo 7.

   POR QUE A CASA DEIXA (Frey, tabu do lapso de capacidade maxima):
   A corrente sem cadeado esta plantada desde o Capitulo 1 - "aquilo ali
   serve para saber que alguem entrou". Nao e fechadura, e livro de
   ponto. A casa nunca quis impedir a entrada. Quis saber quem entrou.
   O preco de Antoniette nao e ser flagrada. E constar.

   O FIO DE KLARA:
   Ela MENTE para proteger Antoniette. Uma menina de nove anos cobrindo
   um adulto - e o adulto assistindo isso acontecer sem poder impedir.
   Semeia dois tracos: "separa amigos de suditos" e "promete protecao".

   O SENTIDO CONTRARIO:
   Segundo gesto materno classificado como metodo - ela aprende de que
   lado da cama a menina dorme, e chama de "posicao habitual, para notar
   mudanca". PROIBIDO: as palavras mae, filha e amor.

   OFICIO APLICADO:
   - Horror pela posicao de quem esta preso na cena: ela nao ve a coisa.
     Sente a temperatura, ouve o que a sala faz com o som, e sai.
     (Kenworthy)
   - O rotineiro recebe pouco detalhe: a camara e limpa e organizada.
   - Beat de uma palavra na contagem da parede.
   - A opcao de 'hope' cai na posicao 1. Posicoes usadas ate aqui: 2, 1,
     3, 2. Ordem de exibicao: C A B.

   Contrato: as flags 'entered_chamber' e 'klara_covered' nao mudam de
   nome. 'told_klara' e lida no Capitulo 6.

   Oito cenas: C1 fevereiro, C2 a corrente, C3 a conta, C4 dentro,
   C5 a parede, C6 quem sai, C7 Klara mente (escolha), C8 o que a casa fez.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

/* --------------------------------------------------------------------------
   ESCOLHA - O QUE DIZER A KLARA

   Ela acabou de mentir por Antoniette. Antoniette pode agradecer, negar
   ou nao dizer nada. Cada ramo leva o "e se" a um fim ruim diferente.
   -------------------------------------------------------------------------- */

var C5_KLARA_C = [
  { t:'dial', ch:'antoniette', tx:'Eu estava lá.' },
  { t:'nar', tx:'Klara não perguntou por quê. Não perguntou o que ela viu.' },
  { t:'pause' },
  { t:'dial', ch:'klara', tx:'Eu sei.' },
  { t:'dial', ch:'antoniette', tx:'Você mentiu para a senhora Rabenfels por minha causa.' },
  { t:'dial', ch:'klara', tx:'Menti.' },
  { t:'pause' },
  { t:'dial', ch:'antoniette', tx:'Não faça isso de novo.' },
  { t:'nar', tx:'Klara olhou para o corrimão, depois para Antoniette. Levou duas respirações.' },
  { t:'dial', ch:'klara', tx:'Tudo bem.' },
  { t:'spr_hide', ch:'klara' },
  { t:'pause' },
  { t:'inn', tx:'Ela disse "tudo bem" e não disse "não faço".' },
  { t:'inn', tx:'Nove anos, e já sabe a diferença.' }
];

var C5_KLARA_A = [
  { t:'nar', tx:'Antoniette agradeceu o recado sobre o horário do jantar e subiu.' },
  { t:'pause' },
  { t:'nar', tx:'Klara ficou no pé da escada um pouco depois de a conversa acabar.' },
  { t:'spr_hide', ch:'klara' },
  { t:'inn', tx:'Ela esperou eu dizer alguma coisa.' },
  { t:'inn', tx:'E eu deixei o assunto fechar sozinho, que é o que se faz com um assunto que não convém.' },
  { t:'pause' },
  { t:'nar', tx:'Na semana seguinte a menina parou de aparecer na biblioteca de manhã.' },
  { t:'nar', tx:'Voltou depois de nove dias, e nenhuma das duas mencionou os nove dias.' },
  { t:'inn', tx:'Eu economizei uma conversa e paguei nove.' }
];

var C5_KLARA_B = [
  { t:'dial', ch:'antoniette', tx:'Eu não estava na ala norte.' },
  { t:'nar', tx:'Klara olhou para ela pelo tempo de uma respiração inteira.' },
  { t:'pause' },
  { t:'dial', ch:'klara', tx:'Está bem.' },
  { t:'nar', tx:'E foi embora sem discutir, porque ela nunca discutia.' },
  { t:'spr_hide', ch:'klara' },
  { t:'pause' },
  { t:'inn', tx:'Ela sabe que eu estava. Ela me viu descer.' },
  { t:'inn', tx:'E aceitou a versão.' },
  { t:'pause' },
  { t:'inn', tx:'Foi a primeira coisa que eu ensinei a ela nesta casa.' }
];

RBF.CHAPTER5 = [

{ t:'chap', num:'CAPÍTULO 5', name:'A CÂMARA', chapter:'capitulo5' },
{ t:'fade_out' },

/* ======================================================================
   C1 - FEVEREIRO
   O inverno abre a janela de oportunidade por motivo domestico e chato.
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c5_fevereiro', chapter:'capitulo5', title:'Fevereiro',
  bg:'bg_kitchen', bgm:'bgm_nidhaus' },
{ t:'fade_in' },

{ t:'nar', tx:'Em fevereiro a casa encolhe. Fecham três quartos do lado oeste e a criadagem inteira dorme mais perto da cozinha.' },
{ t:'nar', tx:'O corredor da biblioteca fica com a temperatura do pátio. Antoniette catalogava de luva cortada nos dedos.' },
{ t:'pause' },

{ t:'nar', tx:'Na terceira semana o gelo rachou a canalização do telhado leste, e a água desceu por dentro da parede.' },
{ t:'spr', ch:'dara', ex:'neutral', pos:'center' },
{ t:'dial', ch:'dara', tx:'A senhorita não vai ter luz na biblioteca hoje. Fenn levou o rapaz e as duas escadas.' },
{ t:'dial', ch:'antoniette', tx:'Por quantos dias?' },
{ t:'dial', ch:'dara', tx:'Três, se tiver sorte.' },
{ t:'spr_hide', ch:'dara' },

{ t:'inn', tx:'Três dias com Fenn no telhado e Ren segurando escada.' },
{ t:'pause' },
{ t:'inn', tx:'A casa inteira olhando para cima.' },

/* ======================================================================
   C2 - A CORRENTE
   O que ela mediu no Capitulo 1 volta e mudou. A casa conta.
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c5_corrente', chapter:'capitulo5', title:'A corrente',
  bg:'bg_nidhaus_gate', bgm:null },

{ t:'nar', tx:'Ela atravessou o pátio às seis, de propósito, para olhar a porta nordeste com a luz de fim de tarde.' },
{ t:'nar', tx:'A corrente estava lá, no puxador, sem cadeado, como estava em abril do ano anterior.' },
{ t:'pause' },

{ t:'nar', tx:'Em abril havia quatro elos pendurados abaixo do puxador. Ela tinha anotado quatro.' },
{ t:'nar', tx:'Agora havia dois.' },
{ t:'pause' },
{ t:'inn', tx:'Alguém encurtou a corrente.' },
{ t:'inn', tx:'Encurtar não tranca nada. Só faz o barulho ficar diferente.' },

{ t:'nar', tx:'Ela passou o dedo pelo elo mais baixo. Saiu graxa fresca.' },
{ t:'pause' },
{ t:'inn', tx:'Engraxam o portão toda semana. Engraxam isto também.' },
{ t:'inn', tx:'Ninguém engraxa o que não usa.' },

{ t:'nar', tx:'A pedra esfriou pelas solas antes de ela voltar para dentro. Ninguém apareceu no pátio.' },
{ t:'inn', tx:'Aquilo ali serve para saber que alguém entrou.' },
{ t:'pause' },
{ t:'inn', tx:'Foi o que eu escrevi no primeiro dia. Está certo e está incompleto.' },
{ t:'inn', tx:'Serve para saber quem, e serve para o quem saber que sabem.' },

/* ======================================================================
   C3 - A CONTA
   Ela decide, e o preco fica visivel. (Frey: nao pode parecer idiota,
   e nao pode parecer que a casa e burra.)
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c5_conta', chapter:'capitulo5', title:'A conta',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'À noite ela abriu o caderno operacional numa página em branco e escreveu duas colunas.' },

{ t:'arc', key:'caderno', label:'— Caderno Operacional — sem número —', lns:[
    'CONTRA: a corrente registra passagem. Entrar = constar.',
    'CONTRA: dez meses de cobertura. Substituição leva um ano.',
    'CONTRA: nenhuma instrução da Ordem autoriza isto.',
    'A FAVOR: três dias de telhado. Não haverá outra janela em fevereiro.',
    'A FAVOR: o dossiê tem quarenta páginas e nenhuma planta do lado norte.'
]},

{ t:'nar', tx:'O ponto de tinta no fim da terceira linha secou enquanto ela comparava as colunas.' },
{ t:'inn', tx:'Três contra e dois a favor.' },
{ t:'pause' },
{ t:'nar', tx:'Riscou a página inteira e arrancou a folha.' },
{ t:'inn', tx:'Eu não estava pesando. Estava procurando permissão.' },
{ t:'pause' },

{ t:'nar', tx:'Queimou a folha na vela e esperou a cinza esfriar antes de largar no prato.' },
{ t:'inn', tx:'Quem escreve os contras primeiro já decidiu.' },

/* ======================================================================
   C4 - DENTRO
   Horror pela posicao. Ela nao ve a coisa: sente temperatura, ouve o
   que a sala faz com o som, e sai. (Kenworthy)
   O rotineiro recebe pouco detalhe: a camara e limpa.
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c5_dentro', chapter:'capitulo5', title:'Dentro',
  bg:'bg_black', bgm:'bgm_camara' },

{ t:'sfx', id:'sfx_door' },
{ t:'nar', tx:'A corrente saiu do puxador sem ruído nenhum, o que ela já esperava.' },
{ t:'nar', tx:'A porta abriu para dentro e o ar que veio de lá era morno.' },
{ t:'pause' },

{ t:'inn', tx:'Morno.' },
{ t:'inn', tx:'Está fazendo dois graus no pátio e este corredor está morno.' },
{ t:'nar', tx:'Ela fechou a porta atrás de si porque deixar aberta era pior.' },

{ t:'nar', tx:'A vela iluminou dois metros. Depois disso, a luz morria na parede sem voltar para o chão.' },
{ t:'nar', tx:'Os passos dela não voltaram. Nenhum eco, em pedra, num corredor estreito.' },
{ t:'pause' },
{ t:'inn', tx:'Alguém forrou estas paredes.' },

{ t:'nar', tx:'Cheirava a sabão de soda e a metal limpo. Cheirava como a copa depois que Dara termina.' },
{ t:'inn', tx:'Eu esperava mofo.' },

{ t:'sfx', id:'sfx_footsteps' },
{ t:'nar', tx:'A sala do fim era retangular e não tinha janela.' },
{ t:'nar', tx:'Uma mesa de aço no centro, escovada, com o dreno da borda voltado para um balde vazio.' },
{ t:'nar', tx:'Duas cadeiras. Uma de altura normal, e outra baixa, de criança, encostadas uma de frente para a outra.' },
{ t:'pause' },

{ t:'nar', tx:'Sobre a mesa, um pano de bordado dobrado em quatro. Ponto miúdo, feito à mão, com um canto por terminar.' },
{ t:'inn', tx:'Alguém borda enquanto espera.' },

{ t:'nar', tx:'Prateleira com frascos etiquetados em letra de escritório, alinhados pelo rótulo.' },
{ t:'nar', tx:'Um livro de registro aberto, com a caneta atravessada na dobra.' },
{ t:'pause' },
{ t:'nar', tx:'Ela leu a página aberta e não entendeu uma palavra. Eram colunas de número e uma abreviação repetida.' },
{ t:'inn', tx:'Isto é uma planilha.' },
{ t:'inn', tx:'Não é grimório, não é altar. É planilha.' },

/* ======================================================================
   C5 - A PAREDE
   O detalhe errado, nunca apontado. Beat de uma palavra na contagem.
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c5_parede', chapter:'capitulo5', title:'A parede',
  bg:'bg_black', keepSprites:true },

{ t:'nar', tx:'A parede do fundo tinha marcas a lápis, do chão até a altura do ombro dela.' },
{ t:'nar', tx:'Traço curto, data ao lado, letra diferente a cada punhado de anos.' },
{ t:'pause' },

{ t:'inn', tx:'Marcam a altura das crianças.' },
{ t:'nar', tx:'Ela chegou mais perto com a vela.' },

{ t:'nar', tx:'As marcas vinham em pares. Sempre duas na mesma data, uma ao lado da outra, a poucos dedos de distância.' },
{ t:'pause' },
{ t:'nar', tx:'Ela seguiu um par com o dedo, subindo.' },
{ t:'nar', tx:'As duas colunas subiam juntas, ano a ano, com a diferença de sempre.' },
{ t:'pause' },

{ t:'nar', tx:'Uma delas parava.' },
{ t:'nar', tx:'A outra continuava por mais seis anos.' },
{ t:'pause' },

{ t:'nar', tx:'Ela procurou o par seguinte, à esquerda.' },
{ t:'nar', tx:'Uma parava.' },
{ t:'pause' },
{ t:'nar', tx:'O par seguinte.' },
{ t:'nar', tx:'Uma parava.' },
{ t:'pause' },

{ t:'nar', tx:'Ela contou os pares de trás para a frente, com a vela na altura do rosto.' },
{ t:'nar', tx:'Nove.' },
{ t:'pause' },

{ t:'nar', tx:'O último par era recente. A tinta do lápis ainda não tinha escurecido.' },
{ t:'nar', tx:'As duas colunas subiam juntas, e as duas continuavam.' },
{ t:'pause' },

{ t:'nar', tx:'Antoniette copiou as datas para o punho da própria manga, com a ponta da unha, porque não tinha trazido lápis.' },
{ t:'nar', tx:'Saiu sem tocar em mais nada.' },

/* ======================================================================
   C6 - QUEM SAI
   Ela sai e alguem esta no patio. Ela le quem esta la. (Peters)
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c6_patio_noite', chapter:'capitulo5', title:'O pátio',
  bg:'bg_nidhaus_gate', bgm:null },

{ t:'sfx', id:'sfx_door' },
{ t:'nar', tx:'Ela recolocou a corrente no puxador com os mesmos dois elos pendurados.' },
{ t:'pause' },

{ t:'nar', tx:'No outro canto do pátio havia luz numa janela do primeiro andar.' },
{ t:'nar', tx:'O quarto das gêmeas.' },
{ t:'pause' },

{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'nar', tx:'Na janela, uma silhueta de criança, parada, com a testa encostada no vidro.' },
{ t:'nar', tx:'Ficou ali enquanto Antoniette atravessava o pátio, e não se moveu quando ela olhou para cima.' },
{ t:'spr_hide', ch:'klara' },
{ t:'pause' },
{ t:'nar', tx:'A luz apagou antes de ela chegar à porta da cozinha.' },

{ t:'inn', tx:'Ela estava acordada à uma e vinte da manhã, de pé, na janela que dá para aquela porta.' },
{ t:'pause' },
{ t:'inn', tx:'Isso não foi hoje.' },
{ t:'inn', tx:'Isso é o que ela faz.' },

/* ======================================================================
   C7 - KLARA MENTE
   Uma menina de nove anos cobre um adulto, e o adulto assiste sem poder
   impedir. ESCOLHA.
   Ordem de exibicao C A B - a de 'hope' na posicao 1. Posicoes usadas
   nos capitulos anteriores: 2, 1, 3, 2.
   ====================================================================== */
{ t:'scene', id:'c5_mentira', chapter:'capitulo5', title:'O recado',
  bg:'bg_main_hall', bgm:'bgm_nidhaus' },

{ t:'nar', tx:'Na manhã seguinte Serafina desceu antes das oito, o que não fazia.' },
{ t:'spr', ch:'serafina', ex:'direct', pos:'right' },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },

{ t:'dial', ch:'serafina', tx:'Você levantou de noite.' },
{ t:'dial', ch:'klara', tx:'Levantei.' },
{ t:'dial', ch:'serafina', tx:'Por quê?' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'Liara estava roncando.' },

{ t:'nar', tx:'Antoniette estava no meio da escada com dois volumes, e parou onde estava.' },
{ t:'inn', tx:'Liara não ronca. Eu durmo do outro lado do mesmo corredor há dez meses.' },
{ t:'pause' },

{ t:'dial', ch:'serafina', tx:'Você viu alguém no pátio?' },
{ t:'nar', tx:'A menina não olhou para a escada. Nem um grau.' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'Não.' },

{ t:'spr', ch:'serafina', ex:'neutral', pos:'right' },
{ t:'dial', ch:'serafina', tx:'Está bem. Come.' },
{ t:'nar', tx:'Serafina puxou a cadeira e começou o café. Não repetiu a pergunta.' },
{ t:'spr_hide', ch:'serafina' },
{ t:'pause' },

{ t:'inn', tx:'Ela não insistiu porque não precisava.' },
{ t:'inn', tx:'A corrente já contou.' },
{ t:'pause' },
{ t:'inn', tx:'A pergunta não era sobre o pátio. Era sobre a menina.' },
{ t:'inn', tx:'E a menina mentiu.' },

{ t:'cho', id:'cap5_camara', code:'C-V', prompt:'O RECADO', opts:[
  { id:'C',
    tx:'Dizer a ela que estava lá. E que não faça isso de novo.',
    flags:{ told_klara:'C', klara_covered:true, entered_chamber:true },
    routes:{ hope: 2, loss: 1 },
    then: C5_KLARA_C },
  { id:'A',
    tx:'Não tocar no assunto. Deixar fechar sozinho.',
    flags:{ told_klara:'A', klara_covered:true, entered_chamber:true },
    routes:{ loss: 2 },
    then: C5_KLARA_A },
  { id:'B',
    tx:'Negar. Dar a ela uma versão que a proteja de saber.',
    flags:{ told_klara:'B', klara_covered:true, entered_chamber:true },
    routes:{ answer: 1, loss: 1 },
    then: C5_KLARA_B }
]},

/* ======================================================================
   C8 - O QUE A CASA FEZ
   A casa nunca e burra. Nao houve punicao: houve registro.
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c5_registro', chapter:'capitulo5', title:'O que a casa fez',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'Nos onze dias seguintes ninguém disse uma palavra sobre a ala norte.' },
{ t:'nar', tx:'O contrato dela não foi mencionado. O trabalho seguiu. Serafina cumprimentou como cumprimentava.' },
{ t:'pause' },

{ t:'nar', tx:'No décimo segundo dia, a chave da biblioteca passou a ficar com Ren.' },
{ t:'nar', tx:'Ninguém avisou. Ela descobriu ao pedir a chave a Dara e Dara apontar o rapaz com o queixo.' },
{ t:'pause' },
{ t:'inn', tx:'Não me tiraram nada. Só puseram uma pessoa entre mim e a porta.' },
{ t:'inn', tx:'Um rapaz de dezoito anos que não faz a segunda pergunta.' },

{ t:'nar', tx:'À noite ela copiou do punho da manga para o caderno as nove datas da parede, antes que suassem.' },

{ t:'arc', key:'sem_identificacao', label:'— caderno sem identificação —', lns:[
    'Ala norte, sala do fim: mesa com dreno, duas cadeiras, prateleira etiquetada.',
    'Parede do fundo: marcas de altura em pares, nove pares, com data.',
    'Em cada par, uma coluna interrompe. A outra segue por seis anos ou mais.',
    'O último par é recente e as duas colunas seguem.'
]},

{ t:'nar', tx:'Ela leu a última linha três vezes e não escreveu nada abaixo dela.' },
{ t:'pause' },
{ t:'inn', tx:'Nove pares. Nove gerações. Os retratos do corredor.' },
{ t:'inn', tx:'Uma para de crescer e a outra continua.' },
{ t:'pause' },
{ t:'inn', tx:'Isso é a única coisa que eu sei, e não sei o que ela significa.' },

{ t:'nar', tx:'Antes de deitar, foi até a porta do quarto das gêmeas e ficou um momento no corredor.' },
{ t:'nar', tx:'A menina dorme do lado da parede. A irmã, do lado da janela.' },
{ t:'inn', tx:'Posição habitual. Serve para notar mudança.' },
{ t:'pause' },

{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'Apagou a vela. Às três, ainda sabia de que lado da parede a menina dormia.' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Segundo inverno em Velha Nidhaus.', line2:'A casa não a puniu. Anotou.',
  chapter:'capitulo5' },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.CHAPTER5; }
