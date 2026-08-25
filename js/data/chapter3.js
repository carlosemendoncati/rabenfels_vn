/* ==========================================================================
   ARQUIVO RABENFELS - js/data/chapter3.js
   CAPITULO 3: "As Duas Klara"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.

   QUANDO: Ano 1, agosto. Klara e Liara tem oito anos.
   PRIMEIRAS BORBOLETAS. Elas voltam no Cap. 7 e no Cap. 10.

   O PENSAMENTO UNICO DESTE CAPITULO (Zinsser, unidade):
   "A aldeia inteira sabe o nome de uma coisa que esta familia nunca
   escreveu."

   A TROCA (docs/biblia_narrativa_rabenfels.md):
   Ela ganha o nome local do fenomeno.
   Entrega a distancia profissional - primeira conversa direta com Klara.

   O FIO DE KLARA:
   Klara quer ver as borboletas e nao pode, porque elas vem de dia.
   Tenta por Liara primeiro, como no Capitulo 1. Quando falha, pede a
   Antoniette. E a primeira vez que ela pede alguma coisa a um adulto.

   O TESTE ANTI-TABULEIRO (Lee Child):
   Antoniette tenta datar o fenomeno nos registros da casa e falha. Nao
   por falta de acesso - por nao existir uma linha em trezentos anos.
   A ausencia e a resposta, e ela leva quarenta minutos para entender.

   OFICIO APLICADO:
   - Atribuicao vaga: Dara da duas versoes e nao escolhe. (Peters)
   - Antoniette ouve de fora e le quem sai da sala. (Peters)
   - A casa nunca e burra: Serafina sabe quais volumes sairam da estante,
     e diz isso sem dizer. (Frey, lapso de capacidade maxima)
   - Beat de uma palavra na contagem dos anos. (Kristoff)
   - Registro por interlocutor: seca com Dara, tecnica com Fenn, e com
     Klara ela nao sabe qual registro usar - o que e o ponto da cena.
   - Cada ramo da escolha leva o "e se" a uma conclusao logica e ruim.
     (Cavallaro, sobre Higurashi)

   Contrato com capitulos futuros: a flag 'klara_asked' e a escolha
   'cap3_borboleta' nao mudam de nome.

   Oito cenas: C1 copa, C2 patio, C3 registros, C4 janela,
   C5 conversa (escolha), C6 o que aconteceu depois, C7 Serafina,
   C8 fim de agosto.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

/* --------------------------------------------------------------------------
   ESCOLHA - O QUE FAZER COM O PEDIDO DE KLARA

   A: distancia mantida. Klara aceita e para de pedir. Para sempre.
   B: a resposta do arquivista. Ela recebe dado no lugar da coisa, e
      guarda o dado com um cuidado que doi.
   C: o patio no fim da tarde. Funciona. E alguem viu.
   -------------------------------------------------------------------------- */

var C3_BORBOLETA_A = [
  { t:'dial', ch:'antoniette', tx:'N\u00e3o \u00e9 uma coisa que eu possa resolver.' },
  { t:'nar', tx:'Klara considerou a frase pelo tempo de uma respira\u00e7\u00e3o.' },
  { t:'dial', ch:'klara', tx:'Tudo bem.' },
  { t:'nar', tx:'Voltou para o livro e virou a p\u00e1gina no ritmo de antes.' },
  { t:'pause' },
  { t:'inn', tx:'Ela n\u00e3o insistiu. N\u00e3o fez cara feia. N\u00e3o pediu de outro jeito.' },
  { t:'inn', tx:'Aceitou sem protestar. Nem perguntou quando aquilo mudaria.' },
  { t:'spr_hide', ch:'klara' },
  { t:'pause' },
  { t:'nar', tx:'Antoniette esperou no corredor mais um pouco, sem motivo declarado.' },
  { t:'inn', tx:'Ela n\u00e3o vai pedir de novo.' },
  { t:'nar', tx:'E n\u00e3o pediu.' }
];

var C3_BORBOLETA_B = [
  { t:'dial', ch:'antoniette', tx:'Asa clara. Do tamanho da sua m\u00e3o aberta.' },
  { t:'nar', tx:'Klara fechou o livro no dedo e olhou para cima.' },
  { t:'dial', ch:'antoniette', tx:'A asa tem veias vermelhas, de um vermelho que n\u00e3o desbota com a luz. Voam baixo at\u00e9 as nove e depois sobem.' },
  { t:'dial', ch:'antoniette', tx:'N\u00e3o fazem barulho. Perto do po\u00e7o d\u00e1 para ouvir, mas \u00e9 preciso estar perto.' },
  { t:'pause' },
  { t:'dial', ch:'klara', tx:'Que barulho?' },
  { t:'dial', ch:'antoniette', tx:'Papel fino. Bem devagar.' },
  { t:'nar', tx:'Klara repetiu a \u00faltima parte em voz baixa e contou nos dedos.' },
  { t:'pause' },
  { t:'spr_hide', ch:'klara' },
  { t:'inn', tx:'Eu dei a ela um registro no lugar da coisa.' },
  { t:'inn', tx:'Guardou o registro porque era o \u00fanico peda\u00e7o que podia levar.' }
];

var C3_BORBOLETA_C = [
  { t:'dial', ch:'antoniette', tx:'Elas ficam at\u00e9 o sol baixar. Depois das sete a luz n\u00e3o incomoda ningu\u00e9m.' },
  { t:'pause' },
  { t:'nar', tx:'Klara n\u00e3o respondeu na hora. Marcou a p\u00e1gina com o dedo, fechou o livro e s\u00f3 ent\u00e3o olhou.' },
  { t:'dial', ch:'klara', tx:'Sete e meia \u00e9 melhor.' },
  { t:'dial', ch:'antoniette', tx:'Sete e meia, ent\u00e3o.' },
  { t:'spr_hide', ch:'klara' },
  { t:'pause' },
  { t:'inn', tx:'Ela j\u00e1 tinha pensado no hor\u00e1rio.' },
  { t:'inn', tx:'Sabia a que horas o sol baixa, e nunca precisou saber disso para nada.' },
  { t:'pause' },
  { t:'nar', tx:'Antoniette desceu para o p\u00e1tio. O ponteiro avan\u00e7ou duas marcas antes de ela sair.' }
];

RBF.CHAPTER3 = [

{ t:'chap', num:'CAP\u00cdTULO 3', name:'AS DUAS KLARA', chapter:'capitulo3' },
{ t:'fade_out' },

/* ======================================================================
   C1 - A COPA - CINCO E MEIA DA MANHA
   Dara da duas versoes e nao escolhe. Atribuicao vaga (Peters).
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c3_copa', chapter:'capitulo3', title:'Antes do sol',
  bg:'bg_kitchen', bgm:'bgm_nidhaus' },
{ t:'fade_in' },

{ t:'nar', tx:'Em agosto a copa acorda mais cedo. \u00c0s cinco e meia o fogo j\u00e1 estava alto e o ar cheirava a fuma\u00e7a e a p\u00e3o da v\u00e9spera.' },
{ t:'nar', tx:'Antoniette desceu de avental, com o invent\u00e1rio debaixo do bra\u00e7o, como descia havia quatro meses.' },

{ t:'spr', ch:'dara', ex:'neutral', pos:'center' },
{ t:'nar', tx:'Dara encheu a caneca antes de ela sentar.' },
{ t:'dial', ch:'dara', tx:'Hoje elas v\u00eam.' },
{ t:'dial', ch:'antoniette', tx:'Quem?' },
{ t:'nar', tx:'A cozinheira apontou o queixo para a janela e continuou mexendo a panela.' },
{ t:'pause' },

{ t:'nar', tx:'Do lado de fora ainda estava escuro. Contra o vidro havia uma coisa parada, de asa clara, do tamanho de uma m\u00e3o aberta.' },
{ t:'nar', tx:'A asa tinha veias vermelhas, e o vermelho n\u00e3o era de sangue nem de tinta. Era mais limpo que os dois.' },
{ t:'pause' },

{ t:'dial', ch:'antoniette', tx:'Elas t\u00eam nome?' },
{ t:'spr', ch:'dara', ex:'guarded', pos:'center' },
{ t:'dial', ch:'dara', tx:'A gente da aldeia chama de as de agosto.' },
{ t:'dial', ch:'antoniette', tx:'E aqui dentro?' },
{ t:'pause' },
{ t:'dial', ch:'dara', tx:'Aqui dentro n\u00e3o se chama de nada.' },

{ t:'nar', tx:'Dara raspou a panela at\u00e9 n\u00e3o haver mais nada preso. Passou a colher outras tr\u00eas vezes.' },
{ t:'dial', ch:'dara', tx:'Uns dizem que \u00e9 do rio. Que sobe do brejo quando a \u00e1gua baixa.' },
{ t:'dial', ch:'dara', tx:'Outros dizem que vem da floresta ao norte, e que sempre veio.' },
{ t:'dial', ch:'antoniette', tx:'E a senhora, qual acha?' },
{ t:'pause' },
{ t:'dial', ch:'dara', tx:'Eu acho que dura tr\u00eas semanas e passa.' },

{ t:'inn', tx:'Ela me deu duas vers\u00f5es e n\u00e3o escolheu nenhuma.' },
{ t:'inn', tx:'Quem n\u00e3o escolhe j\u00e1 ouviu as duas serem desmentidas.' },

{ t:'dial', ch:'antoniette', tx:'Algu\u00e9m mata?' },
{ t:'nar', tx:'Dara parou o bra\u00e7o.' },
{ t:'spr_hide', ch:'dara' },
{ t:'pause' },
{ t:'dial', ch:'dara', tx:'Ningu\u00e9m mata.' },

/* ======================================================================
   C2 - O PATIO AO AMANHECER
   Fenn. Bonito primeiro. A agenda dele espia sem se declarar.
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c3_patio', chapter:'capitulo3', title:'O p\u00e1tio',
  bg:'bg_nidhaus_gate', bgm:'bgm_grey_march' },

{ t:'nar', tx:'O sol subiu por tr\u00e1s do morro \u00e0s seis e vinte e o p\u00e1tio inteiro mudou de cor.' },
{ t:'sfx', id:'sfx_wind' },
{ t:'nar', tx:'Elas estavam em todo lugar. Nas pedras, na corrente da porta nordeste, no varal, na crina dos cavalos.' },
{ t:'pause' },

{ t:'nar', tx:'A luz passava pela asa e sa\u00eda do outro lado. As veias vermelhas ficavam acesas por dentro.' },
{ t:'nar', tx:'Antoniette parou no meio do p\u00e1tio. O caf\u00e9 esfriou na caneca antes de ela voltar a andar.' },
{ t:'inn', tx:'\u00c9 bonito.' },
{ t:'pause' },
{ t:'inn', tx:'Anotar que \u00e9 bonito serve para depois.' },

{ t:'spr', ch:'fenn', ex:'neutral', pos:'left' },
{ t:'nar', tx:'Fenn atravessou o p\u00e1tio com dois baldes e n\u00e3o desviou de nenhuma.' },
{ t:'nar', tx:'Duas subiram do ch\u00e3o quando ele passou e voltaram a pousar no mesmo lugar.' },

{ t:'dial', ch:'antoniette', tx:'Elas n\u00e3o fogem.' },
{ t:'dial', ch:'fenn', tx:'N\u00e3o.' },
{ t:'dial', ch:'antoniette', tx:'Fogem de gente na aldeia?' },
{ t:'pause' },
{ t:'dial', ch:'fenn', tx:'Nunca reparei.' },

{ t:'nar', tx:'Ele pousou os baldes e passou o polegar pelas juntas, uma a uma.' },
{ t:'dial', ch:'fenn', tx:'Meu filho gostava. Quando era pequeno, corria atr\u00e1s.' },
{ t:'dial', ch:'antoniette', tx:'E agora?' },
{ t:'dial', ch:'fenn', tx:'Agora tem catorze anos e quer ir embora daqui.' },
{ t:'pause' },
{ t:'dial', ch:'fenn', tx:'\u00c9 o que d\u00e1 tempo de conversa.' },
{ t:'spr_hide', ch:'fenn' },

{ t:'nar', tx:'Levantou os baldes e seguiu para a cocheira, onde falou com o cavalo durante um bom tempo.' },
{ t:'inn', tx:'Ele me deu um dado sobre a fam\u00edlia dele sem que eu pedisse.' },
{ t:'pause' },
{ t:'inn', tx:'Homem treinado n\u00e3o faz isso por acaso. Ou ele quer alguma coisa, ou est\u00e1 cansado.' },
{ t:'inn', tx:'As duas d\u00e3o no mesmo, com tempo.' },

/* ======================================================================
   C3 - OS REGISTROS - MEIO DA MANHA
   Ela tenta datar o fenomeno e falha. A ausencia e a resposta.
   Beat de uma palavra na contagem.
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c3_registros', chapter:'capitulo3', title:'Os registros',
  bg:'bg_library', bgm:'bgm_archive' },

{ t:'nar', tx:'Ela subiu ao segundo andar antes das nove e puxou os volumes de registro por d\u00e9cada.' },
{ t:'inn', tx:'Um fen\u00f4meno anual que dura tr\u00eas semanas aparece em algum lugar. Conta de pano, queixa de lavradeira, nota de despesa.' },
{ t:'inn', tx:'Basta achar a primeira men\u00e7\u00e3o e eu tenho a data.' },

{ t:'sfx', id:'sfx_page_turn' },
{ t:'nar', tx:'Trabalhou por agosto de cada ano, um por um, do mais recente para tr\u00e1s.' },
{ t:'pause' },
{ t:'nar', tx:'Cinquenta.' },
{ t:'nar', tx:'Cento e vinte.' },
{ t:'nar', tx:'Trezentos.' },
{ t:'pause' },

{ t:'nar', tx:'Agostos de trezentos anos. Nascimentos, mortes, colheita, telhado, imposto, o pre\u00e7o do sal.' },
{ t:'nar', tx:'Nenhuma linha sobre uma borboleta.' },
{ t:'pause' },

{ t:'inn', tx:'Uma casa que registra o pre\u00e7o do sal n\u00e3o esqueceu de registrar isso.' },
{ t:'nar', tx:'Ela voltou aos volumes e procurou o contr\u00e1rio: n\u00e3o a men\u00e7\u00e3o, a lacuna.' },
{ t:'nar', tx:'Levou quarenta minutos para achar o padr\u00e3o, e o padr\u00e3o era simples.' },
{ t:'pause' },

{ t:'nar', tx:'Nas tr\u00eas semanas de agosto os registros ficavam mais curtos. Todo ano. Em todos os punhos, ao longo de nove gera\u00e7\u00f5es.' },
{ t:'inn', tx:'Eles n\u00e3o param de escrever. Escrevem menos.' },
{ t:'pause' },

{ t:'arc', key:'caderno', label:'\u2014 Caderno Operacional \u2014 Entrada 23 \u2014', lns:[
    'Fen\u00f4meno anual, tr\u00eas semanas, agosto. Reconhecido pela popula\u00e7\u00e3o local.',
    'Denomina\u00e7\u00e3o da aldeia: "as de agosto". Denomina\u00e7\u00e3o da casa: nenhuma.',
    'Trezentos anos de registro dom\u00e9stico sem uma \u00fanica men\u00e7\u00e3o.',
    'Nas semanas do fen\u00f4meno, o volume de escrita cai. Consistente em nove gera\u00e7\u00f5es.'
]},

{ t:'inn', tx:'A aus\u00eancia \u00e9 o dado.' },
{ t:'nar', tx:'Ela devolveu os volumes pela numera\u00e7\u00e3o. Conferiu a sequ\u00eancia duas vezes.' },

/* ======================================================================
   C4 - A JANELA - FIM DA MANHA
   Klara quer e tenta - primeiro pela irma, como no Capitulo 1.
   Antoniette ouve de fora. (Peters)
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c3_janela', chapter:'capitulo3', title:'A janela',
  bg:'bg_corridor', bgm:null },

{ t:'nar', tx:'No corredor leste a \u00faltima porta estava entreaberta, como estava quase sempre.' },
{ t:'nar', tx:'Vinha cheiro de p\u00e3o e uma corrente de ar mais fria que a do resto da casa.' },
{ t:'pause' },

{ t:'spr', ch:'liara', ex:'neutral', pos:'right' },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'nar', tx:'Liara estava de joelhos no peitoril, com o rosto quase no vidro.' },
{ t:'nar', tx:'A outra estava sentada de costas para a janela, lendo.' },

{ t:'dial', ch:'liara', tx:'Tem uma bem aqui! Tem tr\u00eas! Tem uma no vaso!' },
{ t:'dial', ch:'klara', tx:'Eu ouvi.' },
{ t:'dial', ch:'liara', tx:'Voc\u00ea nem olhou.' },
{ t:'dial', ch:'klara', tx:'Voc\u00ea falou o n\u00famero.' },

{ t:'nar', tx:'Liara desceu do peitoril e voltou com as m\u00e3os em concha, vazias.' },
{ t:'dial', ch:'liara', tx:'Eu ia pegar uma pra voc\u00ea.' },
{ t:'dial', ch:'klara', tx:'E a\u00ed?' },
{ t:'pause' },
{ t:'dial', ch:'liara', tx:'A senhora Elke disse que n\u00e3o pode.' },
{ t:'dial', ch:'klara', tx:'Por qu\u00ea?' },
{ t:'dial', ch:'liara', tx:'Ela n\u00e3o falou. Ela s\u00f3 disse que n\u00e3o pode.' },

{ t:'nar', tx:'Klara ficou um tempo com o dedo parado na linha.' },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o descreve.' },
{ t:'dial', ch:'liara', tx:'\u00c9 bonita.' },
{ t:'dial', ch:'klara', tx:'Isso n\u00e3o \u00e9 descrever.' },
{ t:'dial', ch:'liara', tx:'\u00c9 branca. Com vermelho.' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'Vermelho onde?' },
{ t:'dial', ch:'liara', tx:'Sei l\u00e1. No meio.' },

{ t:'nar', tx:'Liara voltou para a janela e o assunto acabou para ela ali.' },
{ t:'nar', tx:'Klara olhou para a p\u00e1gina e n\u00e3o virou.' },
{ t:'spr_hide', ch:'liara' },
{ t:'pause' },

{ t:'inn', tx:'Ela pediu de dois jeitos diferentes e n\u00e3o conseguiu nenhum dos dois.' },
{ t:'inn', tx:'E n\u00e3o reclamou de nenhum dos dois.' },
{ t:'pause' },
{ t:'nar', tx:'Antoniette come\u00e7ou a andar e o assoalho entregou onde ela estava.' },

/* ======================================================================
   C5 - A CONVERSA
   Primeira conversa direta entre Antoniette e Klara.
   Aqui a distancia profissional e entregue - independente da opcao.
   ESCOLHA.
   ====================================================================== */
{ t:'scene', id:'c3_conversa', chapter:'capitulo3', title:'A conversa',
  bg:'bg_corridor' },

{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'nar', tx:'Klara virou a cabe\u00e7a na dire\u00e7\u00e3o da porta e desta vez n\u00e3o voltou para o livro.' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'A senhorita j\u00e1 viu?' },

{ t:'nar', tx:'Antoniette parou na soleira. N\u00e3o entrou.' },
{ t:'inn', tx:'Preceptora entra. Catalogadora contratada n\u00e3o entra no quarto das filhas da casa.' },
{ t:'inn', tx:'E ela perguntou primeiro.' },
{ t:'pause' },

{ t:'dial', ch:'antoniette', tx:'Vi. De manh\u00e3, no p\u00e1tio.' },
{ t:'dial', ch:'klara', tx:'Quantas?' },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o contei.' },
{ t:'pause' },
{ t:'nar', tx:'Klara baixou os olhos para o livro. O dedo permaneceu na mesma linha.' },

{ t:'dial', ch:'klara', tx:'Eu n\u00e3o posso sair de dia.' },
{ t:'dial', ch:'antoniette', tx:'Eu sei.' },
{ t:'dial', ch:'klara', tx:'A senhorita sabe por qu\u00ea?' },
{ t:'pause' },
{ t:'inn', tx:'Ela n\u00e3o est\u00e1 perguntando se eu sei o motivo.' },
{ t:'inn', tx:'Est\u00e1 perguntando se algu\u00e9m j\u00e1 me contou.' },
{ t:'pause' },

{ t:'dial', ch:'antoniette', tx:'Me disseram que \u00e9 o sol.' },
{ t:'dial', ch:'klara', tx:'\u00c9 o sol.' },
{ t:'nar', tx:'A resposta saiu pronta, sem altera\u00e7\u00e3o de voz.' },
{ t:'pause' },

{ t:'nar', tx:'Depois fechou o livro no dedo, o que n\u00e3o tinha feito nenhuma vez at\u00e9 ali.' },
{ t:'dial', ch:'klara', tx:'A senhorita pode olhar por mim?' },

{ t:'cho', id:'cap3_borboleta', code:'C-III', prompt:'O PEDIDO', opts:[
  { id:'B',
    tx:'Descrever com precis\u00e3o. Dar a ela o registro exato do que existe l\u00e1 fora.',
    flags:{ klara_asked:'B', kept_apart:false },
    routes:{ answer: 2, hope: 1 },
    then: C3_BORBOLETA_B },
  { id:'A',
    tx:'Recusar. Ela n\u00e3o \u00e9 preceptora, e uma catalogadora contratada n\u00e3o tem esse assunto.',
    flags:{ klara_asked:'A', kept_apart:true },
    routes:{ loss: 2 },
    then: C3_BORBOLETA_A },
  { id:'C',
    tx:'Lev\u00e1-la ao p\u00e1tio depois das sete, quando o sol j\u00e1 tiver baixado.',
    flags:{ klara_asked:'C', kept_apart:false },
    routes:{ hope: 2, loss: 1 },
    then: C3_BORBOLETA_C }
]},

{ t:'nar', tx:'Ela desceu a escada de servi\u00e7o, que era mais curta e menos usada.' },
{ t:'pause' },
{ t:'inn', tx:'Em quatro meses, nenhuma das duas tinha dirigido uma pergunta a mim.' },
{ t:'inn', tx:'E fui eu que respondi. N\u00e3o a preceptora, n\u00e3o a governanta.' },
{ t:'pause' },
{ t:'inn', tx:'Isso vai ter de entrar no relat\u00f3rio de alguma forma.' },

/* ======================================================================
   C6 - O QUE ACONTECEU DEPOIS - FIM DE TARDE
   Os tres ramos reconvergem aqui.
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c3_entardecer', chapter:'capitulo3', title:'Sete e meia',
  bg:'bg_nidhaus_gate', bgm:'bgm_nidhaus' },

{ t:'nar', tx:'\u00c0s sete e meia o p\u00e1tio ficou de um laranja que n\u00e3o durou dez minutos.' },
{ t:'nar', tx:'As borboletas subiram das pedras todas ao mesmo tempo, sem que nada as espantasse.' },

/* Quem levou Klara ve o que as outras duas opcoes nao veem. */
{ t:'nar', tx:'Klara desceu com um xale que n\u00e3o precisava e parou na altura da fonte.', if:{ klara_asked:'C' } },
{ t:'nar', tx:'N\u00e3o correu atr\u00e1s de nenhuma. Ficou de p\u00e9, no mesmo lugar, com as m\u00e3os ao lado do corpo.', if:{ klara_asked:'C' } },
{ t:'pause', if:{ klara_asked:'C' } },
{ t:'nar', tx:'Uma pousou no ombro dela e ficou ali o tempo inteiro.', if:{ klara_asked:'C' } },
{ t:'nar', tx:'Klara n\u00e3o mexeu o ombro.', if:{ klara_asked:'C' } },
{ t:'pause', if:{ klara_asked:'C' } },
{ t:'dial', ch:'klara', tx:'Obrigada.', if:{ klara_asked:'C' } },
{ t:'nar', tx:'Subiu antes das oito, porque \u00e0s oito a cozinha fecha e a casa repara em quem est\u00e1 fora.', if:{ klara_asked:'C' } },

{ t:'nar', tx:'Da janela do quarto leste dava para ver o p\u00e1tio inteiro.', if:{ klara_asked:'B' } },
{ t:'nar', tx:'Na janela do lado oposto havia uma sombra parada, no escuro, sem vela acesa.', if:{ klara_asked:'B' } },
{ t:'pause', if:{ klara_asked:'B' } },
{ t:'inn', tx:'Ela est\u00e1 olhando o p\u00e1tio de um lugar onde n\u00e3o bate sol.', if:{ klara_asked:'B' } },
{ t:'inn', tx:'Com a descri\u00e7\u00e3o que eu dei.', if:{ klara_asked:'B' } },

{ t:'nar', tx:'A janela do quarto das g\u00eameas ficou fechada at\u00e9 o sol sumir.', if:{ klara_asked:'A' } },
{ t:'nar', tx:'Depois abriu, e n\u00e3o havia mais nada para ver.', if:{ klara_asked:'A' } },
{ t:'pause', if:{ klara_asked:'A' } },
{ t:'inn', tx:'Ela esperou terminar para abrir.', if:{ klara_asked:'A' } },

{ t:'sfx', id:'sfx_footsteps' },
{ t:'nar', tx:'No p\u00e1tio, Ren varria as pedras com uma vassoura de palha, devagar, desviando de cada uma.' },
{ t:'dial', ch:'antoniette', tx:'Ren. Por que desviar?' },
{ t:'spr', ch:'ren', ex:'neutral', pos:'right' },
{ t:'dial', ch:'ren', tx:'Foi o que me mandaram.' },
{ t:'dial', ch:'antoniette', tx:'Quem mandou?' },
{ t:'pause' },
{ t:'dial', ch:'ren', tx:'Ningu\u00e9m, senhorita. \u00c9 o jeito que se faz.' },
{ t:'spr_hide', ch:'ren' },

{ t:'inn', tx:'Ele tem cinco meses de casa e j\u00e1 sabe o jeito que se faz.' },
{ t:'pause' },
{ t:'inn', tx:'Algu\u00e9m ensinou, e ensinou sem dizer por qu\u00ea.' },

/* ======================================================================
   C7 - SERAFINA - NOITE
   A casa responde. Ela sabe quais volumes sairam da estante e diz isso
   sem dizer. A casa nunca e burra. (Frey)
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c3_serafina', chapter:'capitulo3', title:'A conta dos volumes',
  bg:'bg_main_hall', bgm:'bgm_nidhaus' },

{ t:'spr', ch:'serafina', ex:'neutral', pos:'right' },
{ t:'nar', tx:'Serafina a encontrou no sal\u00e3o, o que em quatro meses tinha acontecido duas vezes, as duas por escolha dela.' },

{ t:'dial', ch:'serafina', tx:'A senhorita avan\u00e7ou bem esta semana.' },
{ t:'dial', ch:'antoniette', tx:'O lado oeste est\u00e1 fechado. Come\u00e7o o segundo andar na segunda.' },
{ t:'spr', ch:'serafina', ex:'direct', pos:'right' },
{ t:'dial', ch:'serafina', tx:'O segundo andar j\u00e1 foi mexido.' },
{ t:'pause' },

{ t:'nar', tx:'Ela disse isso sem \u00eanfase nenhuma, no meio de uma frase sobre outra coisa.' },
{ t:'dial', ch:'serafina', tx:'Trinta e um volumes de registro fora da ordem e recolocados na ordem certa. Bom trabalho.' },
{ t:'dial', ch:'antoniette', tx:'Trinta e um.' },
{ t:'dial', ch:'serafina', tx:'Trinta e um.' },

{ t:'inn', tx:'Eu tirei trinta e um.' },
{ t:'inn', tx:'Contei porque conto tudo. Ela contou porque me contou.' },
{ t:'pause' },

{ t:'spr', ch:'serafina', ex:'smirk', pos:'right' },
{ t:'dial', ch:'serafina', tx:'A senhorita procurava alguma coisa em agosto.' },
{ t:'dial', ch:'antoniette', tx:'Procurava uma refer\u00eancia a uma praga sazonal. Para a nota de conserva\u00e7\u00e3o das encaderna\u00e7\u00f5es.' },
{ t:'pause' },
{ t:'nar', tx:'A resposta estava pronta havia tr\u00eas horas. Saiu no tempo certo, com o peso certo.' },
{ t:'dial', ch:'serafina', tx:'E encontrou?' },
{ t:'dial', ch:'antoniette', tx:'Nada. Vou registrar como aus\u00eancia de ocorr\u00eancia.' },

{ t:'spr', ch:'serafina', ex:'neutral', pos:'right' },
{ t:'dial', ch:'serafina', tx:'Registre.' },
{ t:'nar', tx:'Ela subiu a escada sem se despedir, o que era o costume da casa.' },
{ t:'spr_hide', ch:'serafina' },
{ t:'pause' },

{ t:'inn', tx:'Ela n\u00e3o perguntou por que eu procurava. Perguntou se eu encontrei.' },
{ t:'pause' },
{ t:'inn', tx:'Quem pergunta isso j\u00e1 sabe que n\u00e3o h\u00e1 o que encontrar.' },

/* ======================================================================
   C8 - FIM DE AGOSTO
   Tres semanas passam em quatro beats. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c3_fim', chapter:'capitulo3', title:'Fim de agosto',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'Duraram dezenove dias.' },
{ t:'nar', tx:'No vig\u00e9simo havia menos. No vig\u00e9simo primeiro, nenhuma.' },
{ t:'pause' },
{ t:'nar', tx:'N\u00e3o havia asa no ch\u00e3o, nem no peitoril, nem na corrente da porta nordeste.' },
{ t:'inn', tx:'Bicho que morre deixa corpo.' },
{ t:'nar', tx:'Ela procurou no p\u00e1tio por vinte minutos e anotou o resultado.' },

{ t:'arc', key:'caderno', label:'\u2014 Caderno Operacional \u2014 Entrada 31 \u2014', lns:[
    'Fen\u00f4meno encerrado no 21\u00ba dia. Dura\u00e7\u00e3o: dezenove dias de ocorr\u00eancia plena.',
    'Nenhum esp\u00e9cime morto localizado em p\u00e1tio, peitoril, corrente ou cocheira.',
    'A criadagem retomou a limpeza normal do p\u00e1tio na manh\u00e3 seguinte.',
    'Sem instru\u00e7\u00e3o verbal registrada em nenhum momento do per\u00edodo.'
]},

{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'Apagou a vela e permaneceu junto \u00e0 janela at\u00e9 os olhos se ajustarem.' },
{ t:'pause' },

{ t:'inn', tx:'Setembro. Depois outubro.' },
{ t:'nar', tx:'Ela abriu o calend\u00e1rio de campo e contou os meses at\u00e9 o pr\u00f3ximo agosto.' },
{ t:'pause' },
{ t:'inn', tx:'Onze.' },
{ t:'nar', tx:'Fechou o calend\u00e1rio sem escrever o n\u00famero.' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Primeiro agosto em Velha Nidhaus.', line2:'Faltam dois.',
  chapter:'capitulo3' },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.CHAPTER3; }
