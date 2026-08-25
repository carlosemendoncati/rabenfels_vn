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
  { t:'dial', ch:'antoniette', tx:'Eu estava l\u00e1.' },
  { t:'nar', tx:'Klara n\u00e3o perguntou por qu\u00ea. N\u00e3o perguntou o que ela viu.' },
  { t:'pause' },
  { t:'dial', ch:'klara', tx:'Eu sei.' },
  { t:'dial', ch:'antoniette', tx:'Voc\u00ea mentiu para a senhora Rabenfels por minha causa.' },
  { t:'dial', ch:'klara', tx:'Menti.' },
  { t:'pause' },
  { t:'dial', ch:'antoniette', tx:'N\u00e3o fa\u00e7a isso de novo.' },
  { t:'nar', tx:'Klara olhou para o corrim\u00e3o, depois para Antoniette. Levou duas respira\u00e7\u00f5es.' },
  { t:'dial', ch:'klara', tx:'Tudo bem.' },
  { t:'spr_hide', ch:'klara' },
  { t:'pause' },
  { t:'inn', tx:'Ela disse "tudo bem" e n\u00e3o disse "n\u00e3o fa\u00e7o".' },
  { t:'inn', tx:'Nove anos, e j\u00e1 sabe a diferen\u00e7a.' }
];

var C5_KLARA_A = [
  { t:'nar', tx:'Antoniette agradeceu o recado sobre o hor\u00e1rio do jantar e subiu.' },
  { t:'pause' },
  { t:'nar', tx:'Klara ficou no p\u00e9 da escada um pouco depois de a conversa acabar.' },
  { t:'spr_hide', ch:'klara' },
  { t:'inn', tx:'Ela esperou eu dizer alguma coisa.' },
  { t:'inn', tx:'E eu deixei o assunto fechar sozinho, que \u00e9 o que se faz com um assunto que n\u00e3o conv\u00e9m.' },
  { t:'pause' },
  { t:'nar', tx:'Na semana seguinte a menina parou de aparecer na biblioteca de manh\u00e3.' },
  { t:'nar', tx:'Voltou depois de nove dias, e nenhuma das duas mencionou os nove dias.' },
  { t:'inn', tx:'Eu economizei uma conversa e paguei nove.' }
];

var C5_KLARA_B = [
  { t:'dial', ch:'antoniette', tx:'Eu n\u00e3o estava na ala norte.' },
  { t:'nar', tx:'Klara olhou para ela pelo tempo de uma respira\u00e7\u00e3o inteira.' },
  { t:'pause' },
  { t:'dial', ch:'klara', tx:'Est\u00e1 bem.' },
  { t:'nar', tx:'E foi embora sem discutir, porque ela nunca discutia.' },
  { t:'spr_hide', ch:'klara' },
  { t:'pause' },
  { t:'inn', tx:'Ela sabe que eu estava. Ela me viu descer.' },
  { t:'inn', tx:'E aceitou a vers\u00e3o.' },
  { t:'pause' },
  { t:'inn', tx:'Foi a primeira coisa que eu ensinei a ela nesta casa.' }
];

RBF.CHAPTER5 = [

{ t:'chap', num:'CAP\u00cdTULO 5', name:'A C\u00c2MARA', chapter:'capitulo5' },
{ t:'fade_out' },

/* ======================================================================
   C1 - FEVEREIRO
   O inverno abre a janela de oportunidade por motivo domestico e chato.
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c5_fevereiro', chapter:'capitulo5', title:'Fevereiro',
  bg:'bg_kitchen', bgm:'bgm_nidhaus' },
{ t:'fade_in' },

{ t:'nar', tx:'Em fevereiro a casa encolhe. Fecham tr\u00eas quartos do lado oeste e a criadagem inteira dorme mais perto da cozinha.' },
{ t:'nar', tx:'O corredor da biblioteca fica com a temperatura do p\u00e1tio. Antoniette catalogava de luva cortada nos dedos.' },
{ t:'pause' },

{ t:'nar', tx:'Na terceira semana o gelo rachou a canaliza\u00e7\u00e3o do telhado leste, e a \u00e1gua desceu por dentro da parede.' },
{ t:'spr', ch:'dara', ex:'neutral', pos:'center' },
{ t:'dial', ch:'dara', tx:'A senhorita n\u00e3o vai ter luz na biblioteca hoje. Fenn levou o rapaz e as duas escadas.' },
{ t:'dial', ch:'antoniette', tx:'Por quantos dias?' },
{ t:'dial', ch:'dara', tx:'Tr\u00eas, se tiver sorte.' },
{ t:'spr_hide', ch:'dara' },

{ t:'inn', tx:'Tr\u00eas dias com Fenn no telhado e Ren segurando escada.' },
{ t:'pause' },
{ t:'inn', tx:'A casa inteira olhando para cima.' },

/* ======================================================================
   C2 - A CORRENTE
   O que ela mediu no Capitulo 1 volta e mudou. A casa conta.
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c5_corrente', chapter:'capitulo5', title:'A corrente',
  bg:'bg_nidhaus_gate', bgm:null },

{ t:'nar', tx:'Ela atravessou o p\u00e1tio \u00e0s seis, de prop\u00f3sito, para olhar a porta nordeste com a luz de fim de tarde.' },
{ t:'nar', tx:'A corrente estava l\u00e1, no puxador, sem cadeado, como estava em abril do ano anterior.' },
{ t:'pause' },

{ t:'nar', tx:'Em abril havia quatro elos pendurados abaixo do puxador. Ela tinha anotado quatro.' },
{ t:'nar', tx:'Agora havia dois.' },
{ t:'pause' },
{ t:'inn', tx:'Algu\u00e9m encurtou a corrente.' },
{ t:'inn', tx:'Encurtar n\u00e3o tranca nada. S\u00f3 faz o barulho ficar diferente.' },

{ t:'nar', tx:'Ela passou o dedo pelo elo mais baixo. Saiu graxa fresca.' },
{ t:'pause' },
{ t:'inn', tx:'Engraxam o port\u00e3o toda semana. Engraxam isto tamb\u00e9m.' },
{ t:'inn', tx:'Ningu\u00e9m engraxa o que n\u00e3o usa.' },

{ t:'nar', tx:'A pedra esfriou pelas solas antes de ela voltar para dentro. Ningu\u00e9m apareceu no p\u00e1tio.' },
{ t:'inn', tx:'Aquilo ali serve para saber que algu\u00e9m entrou.' },
{ t:'pause' },
{ t:'inn', tx:'Foi o que eu escrevi no primeiro dia. Est\u00e1 certo e est\u00e1 incompleto.' },
{ t:'inn', tx:'Serve para saber quem, e serve para o quem saber que sabem.' },

/* ======================================================================
   C3 - A CONTA
   Ela decide, e o preco fica visivel. (Frey: nao pode parecer idiota,
   e nao pode parecer que a casa e burra.)
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c5_conta', chapter:'capitulo5', title:'A conta',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'\u00c0 noite ela abriu o caderno operacional numa p\u00e1gina em branco e escreveu duas colunas.' },

{ t:'arc', key:'caderno', label:'\u2014 Caderno Operacional \u2014 sem n\u00famero \u2014', lns:[
    'CONTRA: a corrente registra passagem. Entrar = constar.',
    'CONTRA: dez meses de cobertura. Substitui\u00e7\u00e3o leva um ano.',
    'CONTRA: nenhuma instru\u00e7\u00e3o da Ordem autoriza isto.',
    'A FAVOR: tr\u00eas dias de telhado. N\u00e3o haver\u00e1 outra janela em fevereiro.',
    'A FAVOR: o dossi\u00ea tem quarenta p\u00e1ginas e nenhuma planta do lado norte.'
]},

{ t:'nar', tx:'O ponto de tinta no fim da terceira linha secou enquanto ela comparava as colunas.' },
{ t:'inn', tx:'Tr\u00eas contra e dois a favor.' },
{ t:'pause' },
{ t:'nar', tx:'Riscou a p\u00e1gina inteira e arrancou a folha.' },
{ t:'inn', tx:'Eu n\u00e3o estava pesando. Estava procurando permiss\u00e3o.' },
{ t:'pause' },

{ t:'nar', tx:'Queimou a folha na vela e esperou a cinza esfriar antes de largar no prato.' },
{ t:'inn', tx:'Quem escreve os contras primeiro j\u00e1 decidiu.' },

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
{ t:'nar', tx:'A corrente saiu do puxador sem ru\u00eddo nenhum, o que ela j\u00e1 esperava.' },
{ t:'nar', tx:'A porta abriu para dentro e o ar que veio de l\u00e1 era morno.' },
{ t:'pause' },

{ t:'inn', tx:'Morno.' },
{ t:'inn', tx:'Est\u00e1 fazendo dois graus no p\u00e1tio e este corredor est\u00e1 morno.' },
{ t:'nar', tx:'Ela fechou a porta atr\u00e1s de si porque deixar aberta era pior.' },

{ t:'nar', tx:'A vela iluminou dois metros. Depois disso, a luz morria na parede sem voltar para o ch\u00e3o.' },
{ t:'nar', tx:'Os passos dela n\u00e3o voltaram. Nenhum eco, em pedra, num corredor estreito.' },
{ t:'pause' },
{ t:'inn', tx:'Algu\u00e9m forrou estas paredes.' },

{ t:'nar', tx:'Cheirava a sab\u00e3o de soda e a metal limpo. Cheirava como a copa depois que Dara termina.' },
{ t:'inn', tx:'Eu esperava mofo.' },

{ t:'sfx', id:'sfx_footsteps' },
{ t:'nar', tx:'A sala do fim era retangular e n\u00e3o tinha janela.' },
{ t:'nar', tx:'Uma mesa de a\u00e7o no centro, escovada, com o dreno da borda voltado para um balde vazio.' },
{ t:'nar', tx:'Duas cadeiras. Uma de altura normal, e outra baixa, de crian\u00e7a, encostadas uma de frente para a outra.' },
{ t:'pause' },

{ t:'nar', tx:'Sobre a mesa, um pano de bordado dobrado em quatro. Ponto mi\u00fado, feito \u00e0 m\u00e3o, com um canto por terminar.' },
{ t:'inn', tx:'Algu\u00e9m borda enquanto espera.' },

{ t:'nar', tx:'Prateleira com frascos etiquetados em letra de escrit\u00f3rio, alinhados pelo r\u00f3tulo.' },
{ t:'nar', tx:'Um livro de registro aberto, com a caneta atravessada na dobra.' },
{ t:'pause' },
{ t:'nar', tx:'Ela leu a p\u00e1gina aberta e n\u00e3o entendeu uma palavra. Eram colunas de n\u00famero e uma abrevia\u00e7\u00e3o repetida.' },
{ t:'inn', tx:'Isto \u00e9 uma planilha.' },
{ t:'inn', tx:'N\u00e3o \u00e9 grim\u00f3rio, n\u00e3o \u00e9 altar. \u00c9 planilha.' },

/* ======================================================================
   C5 - A PAREDE
   O detalhe errado, nunca apontado. Beat de uma palavra na contagem.
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c5_parede', chapter:'capitulo5', title:'A parede',
  bg:'bg_black', keepSprites:true },

{ t:'nar', tx:'A parede do fundo tinha marcas a l\u00e1pis, do ch\u00e3o at\u00e9 a altura do ombro dela.' },
{ t:'nar', tx:'Tra\u00e7o curto, data ao lado, letra diferente a cada punhado de anos.' },
{ t:'pause' },

{ t:'inn', tx:'Marcam a altura das crian\u00e7as.' },
{ t:'nar', tx:'Ela chegou mais perto com a vela.' },

{ t:'nar', tx:'As marcas vinham em pares. Sempre duas na mesma data, uma ao lado da outra, a poucos dedos de dist\u00e2ncia.' },
{ t:'pause' },
{ t:'nar', tx:'Ela seguiu um par com o dedo, subindo.' },
{ t:'nar', tx:'As duas colunas subiam juntas, ano a ano, com a diferen\u00e7a de sempre.' },
{ t:'pause' },

{ t:'nar', tx:'Uma delas parava.' },
{ t:'nar', tx:'A outra continuava por mais seis anos.' },
{ t:'pause' },

{ t:'nar', tx:'Ela procurou o par seguinte, \u00e0 esquerda.' },
{ t:'nar', tx:'Uma parava.' },
{ t:'pause' },
{ t:'nar', tx:'O par seguinte.' },
{ t:'nar', tx:'Uma parava.' },
{ t:'pause' },

{ t:'nar', tx:'Ela contou os pares de tr\u00e1s para a frente, com a vela na altura do rosto.' },
{ t:'nar', tx:'Nove.' },
{ t:'pause' },

{ t:'nar', tx:'O \u00faltimo par era recente. A tinta do l\u00e1pis ainda n\u00e3o tinha escurecido.' },
{ t:'nar', tx:'As duas colunas subiam juntas, e as duas continuavam.' },
{ t:'pause' },

{ t:'nar', tx:'Antoniette copiou as datas para o punho da pr\u00f3pria manga, com a ponta da unha, porque n\u00e3o tinha trazido l\u00e1pis.' },
{ t:'nar', tx:'Saiu sem tocar em mais nada.' },

/* ======================================================================
   C6 - QUEM SAI
   Ela sai e alguem esta no patio. Ela le quem esta la. (Peters)
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c6_patio_noite', chapter:'capitulo5', title:'O p\u00e1tio',
  bg:'bg_nidhaus_gate', bgm:null },

{ t:'sfx', id:'sfx_door' },
{ t:'nar', tx:'Ela recolocou a corrente no puxador com os mesmos dois elos pendurados.' },
{ t:'pause' },

{ t:'nar', tx:'No outro canto do p\u00e1tio havia luz numa janela do primeiro andar.' },
{ t:'nar', tx:'O quarto das g\u00eameas.' },
{ t:'pause' },

{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'nar', tx:'Na janela, uma silhueta de crian\u00e7a, parada, com a testa encostada no vidro.' },
{ t:'nar', tx:'Ficou ali enquanto Antoniette atravessava o p\u00e1tio, e n\u00e3o se moveu quando ela olhou para cima.' },
{ t:'spr_hide', ch:'klara' },
{ t:'pause' },
{ t:'nar', tx:'A luz apagou antes de ela chegar \u00e0 porta da cozinha.' },

{ t:'inn', tx:'Ela estava acordada \u00e0 uma e vinte da manh\u00e3, de p\u00e9, na janela que d\u00e1 para aquela porta.' },
{ t:'pause' },
{ t:'inn', tx:'Isso n\u00e3o foi hoje.' },
{ t:'inn', tx:'Isso \u00e9 o que ela faz.' },

/* ======================================================================
   C7 - KLARA MENTE
   Uma menina de nove anos cobre um adulto, e o adulto assiste sem poder
   impedir. ESCOLHA.
   Ordem de exibicao C A B - a de 'hope' na posicao 1. Posicoes usadas
   nos capitulos anteriores: 2, 1, 3, 2.
   ====================================================================== */
{ t:'scene', id:'c5_mentira', chapter:'capitulo5', title:'O recado',
  bg:'bg_main_hall', bgm:'bgm_nidhaus' },

{ t:'nar', tx:'Na manh\u00e3 seguinte Serafina desceu antes das oito, o que n\u00e3o fazia.' },
{ t:'spr', ch:'serafina', ex:'direct', pos:'right' },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },

{ t:'dial', ch:'serafina', tx:'Voc\u00ea levantou de noite.' },
{ t:'dial', ch:'klara', tx:'Levantei.' },
{ t:'dial', ch:'serafina', tx:'Por qu\u00ea?' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'Liara estava roncando.' },

{ t:'nar', tx:'Antoniette estava no meio da escada com dois volumes, e parou onde estava.' },
{ t:'inn', tx:'Liara n\u00e3o ronca. Eu durmo do outro lado do mesmo corredor h\u00e1 dez meses.' },
{ t:'pause' },

{ t:'dial', ch:'serafina', tx:'Voc\u00ea viu algu\u00e9m no p\u00e1tio?' },
{ t:'nar', tx:'A menina n\u00e3o olhou para a escada. Nem um grau.' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'N\u00e3o.' },

{ t:'spr', ch:'serafina', ex:'neutral', pos:'right' },
{ t:'dial', ch:'serafina', tx:'Est\u00e1 bem. Come.' },
{ t:'nar', tx:'Serafina puxou a cadeira e come\u00e7ou o caf\u00e9. N\u00e3o repetiu a pergunta.' },
{ t:'spr_hide', ch:'serafina' },
{ t:'pause' },

{ t:'inn', tx:'Ela n\u00e3o insistiu porque n\u00e3o precisava.' },
{ t:'inn', tx:'A corrente j\u00e1 contou.' },
{ t:'pause' },
{ t:'inn', tx:'A pergunta n\u00e3o era sobre o p\u00e1tio. Era sobre a menina.' },
{ t:'inn', tx:'E a menina mentiu.' },

{ t:'cho', id:'cap5_camara', code:'C-V', prompt:'O RECADO', opts:[
  { id:'C',
    tx:'Dizer a ela que estava l\u00e1. E que n\u00e3o fa\u00e7a isso de novo.',
    flags:{ told_klara:'C', klara_covered:true, entered_chamber:true },
    routes:{ hope: 2, loss: 1 },
    then: C5_KLARA_C },
  { id:'A',
    tx:'N\u00e3o tocar no assunto. Deixar fechar sozinho.',
    flags:{ told_klara:'A', klara_covered:true, entered_chamber:true },
    routes:{ loss: 2 },
    then: C5_KLARA_A },
  { id:'B',
    tx:'Negar. Dar a ela uma vers\u00e3o que a proteja de saber.',
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

{ t:'nar', tx:'Nos onze dias seguintes ningu\u00e9m disse uma palavra sobre a ala norte.' },
{ t:'nar', tx:'O contrato dela n\u00e3o foi mencionado. O trabalho seguiu. Serafina cumprimentou como cumprimentava.' },
{ t:'pause' },

{ t:'nar', tx:'No d\u00e9cimo segundo dia, a chave da biblioteca passou a ficar com Ren.' },
{ t:'nar', tx:'Ningu\u00e9m avisou. Ela descobriu ao pedir a chave a Dara e Dara apontar o rapaz com o queixo.' },
{ t:'pause' },
{ t:'inn', tx:'N\u00e3o me tiraram nada. S\u00f3 puseram uma pessoa entre mim e a porta.' },
{ t:'inn', tx:'Um rapaz de dezoito anos que n\u00e3o faz a segunda pergunta.' },

{ t:'nar', tx:'\u00c0 noite ela copiou do punho da manga para o caderno as nove datas da parede, antes que suassem.' },

{ t:'arc', key:'sem_identificacao', label:'\u2014 caderno sem identifica\u00e7\u00e3o \u2014', lns:[
    'Ala norte, sala do fim: mesa com dreno, duas cadeiras, prateleira etiquetada.',
    'Parede do fundo: marcas de altura em pares, nove pares, com data.',
    'Em cada par, uma coluna interrompe. A outra segue por seis anos ou mais.',
    'O \u00faltimo par \u00e9 recente e as duas colunas seguem.'
]},

{ t:'nar', tx:'Ela leu a \u00faltima linha tr\u00eas vezes e n\u00e3o escreveu nada abaixo dela.' },
{ t:'pause' },
{ t:'inn', tx:'Nove pares. Nove gera\u00e7\u00f5es. Os retratos do corredor.' },
{ t:'inn', tx:'Uma para de crescer e a outra continua.' },
{ t:'pause' },
{ t:'inn', tx:'Isso \u00e9 a \u00fanica coisa que eu sei, e n\u00e3o sei o que ela significa.' },

{ t:'nar', tx:'Antes de deitar, foi at\u00e9 a porta do quarto das g\u00eameas e ficou um momento no corredor.' },
{ t:'nar', tx:'A menina dorme do lado da parede. A irm\u00e3, do lado da janela.' },
{ t:'inn', tx:'Posi\u00e7\u00e3o habitual. Serve para notar mudan\u00e7a.' },
{ t:'pause' },

{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'Apagou a vela. \u00c0s tr\u00eas, ainda sabia de que lado da parede a menina dormia.' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Segundo inverno em Velha Nidhaus.', line2:'A casa n\u00e3o a puniu. Anotou.',
  chapter:'capitulo5' },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.CHAPTER5; }
