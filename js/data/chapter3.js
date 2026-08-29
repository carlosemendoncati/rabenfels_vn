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
  { t:'dial', ch:'antoniette', tx:'Não é uma coisa que eu possa resolver.' },
  { t:'nar', tx:'Klara considerou a frase pelo tempo de uma respiração.' },
  { t:'dial', ch:'klara', tx:'Tudo bem.' },
  { t:'nar', tx:'Voltou para o livro e virou a página no ritmo de antes.' },
  { t:'pause' },
  { t:'inn', tx:'Ela não insistiu. Não fez cara feia. Não pediu de outro jeito.' },
  { t:'inn', tx:'Aceitou sem protestar. Nem perguntou quando aquilo mudaria.' },
  { t:'spr_hide', ch:'klara' },
  { t:'pause' },
  { t:'nar', tx:'Antoniette esperou no corredor mais um pouco, sem motivo declarado.' },
  { t:'inn', tx:'Ela não vai pedir de novo.' },
  { t:'nar', tx:'E não pediu.' }
];

var C3_BORBOLETA_B = [
  { t:'dial', ch:'antoniette', tx:'Asa clara. Do tamanho da sua mão aberta.' },
  { t:'nar', tx:'Klara fechou o livro no dedo e olhou para cima.' },
  { t:'dial', ch:'antoniette', tx:'A asa tem veias vermelhas, de um vermelho que não desbota com a luz. Voam baixo até as nove e depois sobem.' },
  { t:'dial', ch:'antoniette', tx:'Não fazem barulho. Perto do poço dá para ouvir, mas é preciso estar perto.' },
  { t:'pause' },
  { t:'dial', ch:'klara', tx:'Que barulho?' },
  { t:'dial', ch:'antoniette', tx:'Papel fino. Bem devagar.' },
  { t:'nar', tx:'Klara repetiu a última parte em voz baixa e contou nos dedos.' },
  { t:'pause' },
  { t:'spr_hide', ch:'klara' },
  { t:'inn', tx:'Eu dei a ela um registro no lugar da coisa.' },
  { t:'inn', tx:'Guardou o registro porque era o único pedaço que podia levar.' }
];

var C3_BORBOLETA_C = [
  { t:'dial', ch:'antoniette', tx:'Elas ficam até o sol baixar. Depois das sete a luz não incomoda ninguém.' },
  { t:'pause' },
  { t:'nar', tx:'Klara não respondeu na hora. Marcou a página com o dedo, fechou o livro e só então olhou.' },
  { t:'dial', ch:'klara', tx:'Sete e meia é melhor.' },
  { t:'dial', ch:'antoniette', tx:'Sete e meia, então.' },
  { t:'spr_hide', ch:'klara' },
  { t:'pause' },
  { t:'inn', tx:'Ela já tinha pensado no horário.' },
  { t:'inn', tx:'Sabia a que horas o sol baixa, e nunca precisou saber disso para nada.' },
  { t:'pause' },
  { t:'nar', tx:'Antoniette desceu para o pátio. O ponteiro avançou duas marcas antes de ela sair.' }
];

RBF.CHAPTER3 = [

{ t:'chap', num:'CAPÍTULO 3', name:'AS DUAS KLARA', chapter:'capitulo3' },
{ t:'fade_out' },

/* ======================================================================
   C1 - A COPA - CINCO E MEIA DA MANHA
   Dara da duas versoes e nao escolhe. Atribuicao vaga (Peters).
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c3_copa', chapter:'capitulo3', title:'Antes do sol',
  bg:'bg_kitchen', bgm:'bgm_nidhaus' },
{ t:'fade_in' },

{ t:'nar', tx:'Em agosto a copa acorda mais cedo. Às cinco e meia o fogo já estava alto e o ar cheirava a fumaça e a pão da véspera.' },
{ t:'nar', tx:'Antoniette desceu de avental, com o inventário debaixo do braço, como descia havia quatro meses.' },

{ t:'spr', ch:'dara', ex:'neutral', pos:'center' },
{ t:'nar', tx:'Dara encheu a caneca antes de ela sentar.' },
{ t:'dial', ch:'dara', tx:'Hoje elas vêm.' },
{ t:'dial', ch:'antoniette', tx:'Quem?' },
{ t:'nar', tx:'A cozinheira apontou o queixo para a janela e continuou mexendo a panela.' },
{ t:'pause' },

{ t:'nar', tx:'Do lado de fora ainda estava escuro. Contra o vidro havia uma coisa parada, de asa clara, do tamanho de uma mão aberta.' },
{ t:'nar', tx:'A asa tinha veias vermelhas, e o vermelho não era de sangue nem de tinta. Era mais limpo que os dois.' },
{ t:'pause' },

{ t:'dial', ch:'antoniette', tx:'Elas têm nome?' },
{ t:'spr', ch:'dara', ex:'guarded', pos:'center' },
{ t:'dial', ch:'dara', tx:'A gente da aldeia chama de as de agosto.' },
{ t:'dial', ch:'antoniette', tx:'E aqui dentro?' },
{ t:'pause' },
{ t:'dial', ch:'dara', tx:'Aqui dentro não se chama de nada.' },

{ t:'nar', tx:'Dara raspou a panela até não haver mais nada preso. Passou a colher outras três vezes.' },
{ t:'dial', ch:'dara', tx:'Uns dizem que é do rio. Que sobe do brejo quando a água baixa.' },
{ t:'dial', ch:'dara', tx:'Outros dizem que vem da floresta ao norte, e que sempre veio.' },
{ t:'dial', ch:'antoniette', tx:'E a senhora, qual acha?' },
{ t:'pause' },
{ t:'dial', ch:'dara', tx:'Eu acho que dura três semanas e passa.' },

{ t:'inn', tx:'Ela me deu duas versões e não escolheu nenhuma.' },
{ t:'inn', tx:'Quem não escolhe já ouviu as duas serem desmentidas.' },

{ t:'dial', ch:'antoniette', tx:'Alguém mata?' },
{ t:'nar', tx:'Dara parou o braço.' },
{ t:'spr_hide', ch:'dara' },
{ t:'pause' },
{ t:'dial', ch:'dara', tx:'Ninguém mata.' },

/* ======================================================================
   C2 - O PATIO AO AMANHECER
   Fenn. Bonito primeiro. A agenda dele espia sem se declarar.
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c3_patio', chapter:'capitulo3', title:'O pátio',
  bg:'bg_nidhaus_gate', bgm:'bgm_grey_march' },

{ t:'nar', tx:'O sol subiu por trás do morro às seis e vinte e o pátio inteiro mudou de cor.' },
{ t:'sfx', id:'sfx_wind' },
{ t:'nar', tx:'Elas estavam em todo lugar. Nas pedras, na corrente da porta nordeste, no varal, na crina dos cavalos.' },
{ t:'pause' },

{ t:'nar', tx:'A luz passava pela asa e saía do outro lado. As veias vermelhas ficavam acesas por dentro.' },
{ t:'nar', tx:'Antoniette parou no meio do pátio. O café esfriou na caneca antes de ela voltar a andar.' },
{ t:'inn', tx:'É bonito.' },
{ t:'pause' },
{ t:'inn', tx:'Anotar que é bonito serve para depois.' },

{ t:'spr', ch:'fenn', ex:'neutral', pos:'left' },
{ t:'nar', tx:'Fenn atravessou o pátio com dois baldes e não desviou de nenhuma.' },
{ t:'nar', tx:'Duas subiram do chão quando ele passou e voltaram a pousar no mesmo lugar.' },

{ t:'dial', ch:'antoniette', tx:'Elas não fogem.' },
{ t:'dial', ch:'fenn', tx:'Não.' },
{ t:'dial', ch:'antoniette', tx:'Fogem de gente na aldeia?' },
{ t:'pause' },
{ t:'dial', ch:'fenn', tx:'Nunca reparei.' },

{ t:'nar', tx:'Ele pousou os baldes e passou o polegar pelas juntas, uma a uma.' },
{ t:'dial', ch:'fenn', tx:'Meu filho gostava. Quando era pequeno, corria atrás.' },
{ t:'dial', ch:'antoniette', tx:'E agora?' },
{ t:'dial', ch:'fenn', tx:'Agora tem catorze anos e quer ir embora daqui.' },
{ t:'pause' },
{ t:'dial', ch:'fenn', tx:'É o que dá tempo de conversa.' },
{ t:'spr_hide', ch:'fenn' },

{ t:'nar', tx:'Levantou os baldes e seguiu para a cocheira, onde falou com o cavalo durante um bom tempo.' },
{ t:'inn', tx:'Ele me deu um dado sobre a família dele sem que eu pedisse.' },
{ t:'pause' },
{ t:'inn', tx:'Homem treinado não faz isso por acaso. Ou ele quer alguma coisa, ou está cansado.' },
{ t:'inn', tx:'As duas dão no mesmo, com tempo.' },

/* ======================================================================
   C3 - OS REGISTROS - MEIO DA MANHA
   Ela tenta datar o fenomeno e falha. A ausencia e a resposta.
   Beat de uma palavra na contagem.
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c3_registros', chapter:'capitulo3', title:'Os registros',
  bg:'bg_library', bgm:'bgm_archive' },

{ t:'nar', tx:'Ela subiu ao segundo andar antes das nove e puxou os volumes de registro por década.' },
{ t:'inn', tx:'Um fenômeno anual que dura três semanas aparece em algum lugar. Conta de pano, queixa de lavradeira, nota de despesa.' },
{ t:'inn', tx:'Basta achar a primeira menção e eu tenho a data.' },

{ t:'sfx', id:'sfx_page_turn' },
{ t:'nar', tx:'Trabalhou por agosto de cada ano, um por um, do mais recente para trás.' },
{ t:'pause' },
{ t:'nar', tx:'Cinquenta.' },
{ t:'nar', tx:'Cento e vinte.' },
{ t:'nar', tx:'Trezentos.' },
{ t:'pause' },

{ t:'nar', tx:'Agostos de trezentos anos. Nascimentos, mortes, colheita, telhado, imposto, o preço do sal.' },
{ t:'nar', tx:'Nenhuma linha sobre uma borboleta.' },
{ t:'pause' },

{ t:'inn', tx:'Uma casa que registra o preço do sal não esqueceu de registrar isso.' },
{ t:'nar', tx:'Ela voltou aos volumes e procurou o contrário: não a menção, a lacuna.' },
{ t:'nar', tx:'Levou quarenta minutos para achar o padrão, e o padrão era simples.' },
{ t:'pause' },

{ t:'nar', tx:'Nas três semanas de agosto os registros ficavam mais curtos. Todo ano. Em todos os punhos, ao longo de nove gerações.' },
{ t:'inn', tx:'Eles não param de escrever. Escrevem menos.' },
{ t:'pause' },

{ t:'arc', key:'caderno', label:'— Caderno Operacional — Entrada 23 —', lns:[
    'Fenômeno anual, três semanas, agosto. Reconhecido pela população local.',
    'Denominação da aldeia: "as de agosto". Denominação da casa: nenhuma.',
    'Trezentos anos de registro doméstico sem uma única menção.',
    'Nas semanas do fenômeno, o volume de escrita cai. Consistente em nove gerações.'
]},

{ t:'inn', tx:'A ausência é o dado.' },
{ t:'nar', tx:'Ela devolveu os volumes pela numeração. Conferiu a sequência duas vezes.' },

/* ======================================================================
   C3b - A RONDA DAS QUATRO E VINTE  (trecho jogado)

   O ANTES. Nove chaves no gancho, dois relogios certos, luz por
   baixo da porta das gemeas, Fenn recolhendo no horario dele e Dara
   descendo para a copa. Nada errado, e nada apontando para a frente.

   O DEPOIS e o mesmo corredor no Capitulo 10, com os mesmos
   objetos. Nenhum dos dois trechos comenta o outro.
   ====================================================================== */
{ t:'nar', tx:'A ronda das quatro e vinte era dela desde o segundo mês.' },
{ t:'nar', tx:'Atravessar o corredor de serviço e conferir o que a lista mandava conferir.' },
{ t:'pause' },
{ t:'percurso', id:'c3_ronda', chapter:'capitulo3',
  campo:'c3_saida', conta:'c3_conferiu', padrao:'ronda' },
{ t:'nar', tx:'Ela assinou a quarta entrada do dia e devolveu a pena ao tinteiro da bancada.' },
{ t:'pause' },

/* ======================================================================
   C4 - A JANELA - FIM DA MANHA
   Klara quer e tenta - primeiro pela irma, como no Capitulo 1.
   Antoniette ouve de fora. (Peters)
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c3_janela', chapter:'capitulo3', title:'A janela',
  bg:'bg_corridor', bgm:null },

{ t:'nar', tx:'No corredor leste a última porta estava entreaberta, como estava quase sempre.' },
{ t:'nar', tx:'Vinha cheiro de pão e uma corrente de ar mais fria que a do resto da casa.' },
{ t:'pause' },

{ t:'spr', ch:'liara', ex:'neutral', pos:'right' },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'nar', tx:'Liara estava de joelhos no peitoril, com o rosto quase no vidro.' },
{ t:'nar', tx:'A outra estava sentada de costas para a janela, lendo.' },

{ t:'dial', ch:'liara', tx:'Tem uma bem aqui! Tem três! Tem uma no vaso!' },
{ t:'dial', ch:'klara', tx:'Eu ouvi.' },
{ t:'dial', ch:'liara', tx:'Você nem olhou.' },
{ t:'dial', ch:'klara', tx:'Você falou o número.' },

{ t:'nar', tx:'Liara desceu do peitoril e voltou com as mãos em concha, vazias.' },
{ t:'dial', ch:'liara', tx:'Eu ia pegar uma pra você.' },
{ t:'dial', ch:'klara', tx:'E aí?' },
{ t:'pause' },
{ t:'dial', ch:'liara', tx:'A senhora Elke disse que não pode.' },
{ t:'dial', ch:'klara', tx:'Por quê?' },
{ t:'dial', ch:'liara', tx:'Ela não falou. Ela só disse que não pode.' },

{ t:'nar', tx:'Klara ficou um tempo com o dedo parado na linha.' },
{ t:'dial', ch:'klara', tx:'Então descreve.' },
{ t:'dial', ch:'liara', tx:'É bonita.' },
{ t:'dial', ch:'klara', tx:'Isso não é descrever.' },
{ t:'dial', ch:'liara', tx:'É branca. Com vermelho.' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'Vermelho onde?' },
{ t:'dial', ch:'liara', tx:'Sei lá. No meio.' },

{ t:'nar', tx:'Liara voltou para a janela e o assunto acabou para ela ali.' },
{ t:'nar', tx:'Klara olhou para a página e não virou.' },
{ t:'spr_hide', ch:'liara' },
{ t:'pause' },

{ t:'inn', tx:'Ela pediu de dois jeitos diferentes e não conseguiu nenhum dos dois.' },
{ t:'inn', tx:'E não reclamou de nenhum dos dois.' },
{ t:'pause' },
{ t:'nar', tx:'Antoniette começou a andar e o assoalho entregou onde ela estava.' },

/* ======================================================================
   C5 - A CONVERSA
   Primeira conversa direta entre Antoniette e Klara.
   Aqui a distancia profissional e entregue - independente da opcao.
   ESCOLHA.
   ====================================================================== */
{ t:'scene', id:'c3_conversa', chapter:'capitulo3', title:'A conversa',
  bg:'bg_corridor' },

{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'nar', tx:'Klara virou a cabeça na direção da porta e desta vez não voltou para o livro.' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'A senhorita já viu?' },

{ t:'nar', tx:'Antoniette parou na soleira. Não entrou.' },
{ t:'inn', tx:'Preceptora entra. Catalogadora contratada não entra no quarto das filhas da casa.' },
{ t:'inn', tx:'E ela perguntou primeiro.' },
{ t:'pause' },

{ t:'dial', ch:'antoniette', tx:'Vi. De manhã, no pátio.' },
{ t:'dial', ch:'klara', tx:'Quantas?' },
{ t:'dial', ch:'antoniette', tx:'Não contei.' },
{ t:'pause' },
{ t:'nar', tx:'Klara baixou os olhos para o livro. O dedo permaneceu na mesma linha.' },

{ t:'dial', ch:'klara', tx:'Eu não posso sair de dia.' },
{ t:'dial', ch:'antoniette', tx:'Eu sei.' },
{ t:'dial', ch:'klara', tx:'A senhorita sabe por quê?' },
{ t:'pause' },
{ t:'inn', tx:'Ela não está perguntando se eu sei o motivo.' },
{ t:'inn', tx:'Está perguntando se alguém já me contou.' },
{ t:'pause' },

{ t:'dial', ch:'antoniette', tx:'Me disseram que é o sol.' },
{ t:'dial', ch:'klara', tx:'É o sol.' },
{ t:'nar', tx:'A resposta saiu pronta, sem alteração de voz.' },
{ t:'pause' },

{ t:'nar', tx:'Depois fechou o livro no dedo, o que não tinha feito nenhuma vez até ali.' },
{ t:'dial', ch:'klara', tx:'A senhorita pode olhar por mim?' },

{ t:'cho', id:'cap3_borboleta', code:'C-III', prompt:'O PEDIDO', opts:[
  { id:'B',
    tx:'Descrever com precisão. Dar a ela o registro exato do que existe lá fora.',
    flags:{ klara_asked:'B', kept_apart:false },
    routes:{ answer: 2, hope: 1 },
    then: C3_BORBOLETA_B },
  { id:'A',
    tx:'Recusar. Ela não é preceptora, e uma catalogadora contratada não tem esse assunto.',
    flags:{ klara_asked:'A', kept_apart:true },
    routes:{ loss: 2 },
    then: C3_BORBOLETA_A },
  { id:'C',
    tx:'Levá-la ao pátio depois das sete, quando o sol já tiver baixado.',
    flags:{ klara_asked:'C', kept_apart:false },
    routes:{ hope: 2, loss: 1 },
    then: C3_BORBOLETA_C }
]},

{ t:'nar', tx:'Ela desceu a escada de serviço, que era mais curta e menos usada.' },
{ t:'pause' },
{ t:'inn', tx:'Em quatro meses, nenhuma das duas tinha dirigido uma pergunta a mim.' },
{ t:'inn', tx:'E fui eu que respondi. Não a preceptora, não a governanta.' },
{ t:'pause' },
{ t:'inn', tx:'Isso vai ter de entrar no relatório de alguma forma.' },

/* ======================================================================
   C6 - O QUE ACONTECEU DEPOIS - FIM DE TARDE
   Os tres ramos reconvergem aqui.
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c3_entardecer', chapter:'capitulo3', title:'Sete e meia',
  bg:'bg_nidhaus_gate', bgm:'bgm_nidhaus' },

{ t:'nar', tx:'Às sete e meia o pátio ficou de um laranja que não durou dez minutos.' },
{ t:'nar', tx:'As borboletas subiram das pedras todas ao mesmo tempo, sem que nada as espantasse.' },

/* Quem levou Klara ve o que as outras duas opcoes nao veem. */
{ t:'nar', tx:'Klara desceu com um xale que não precisava e parou na altura da fonte.', if:{ klara_asked:'C' } },
{ t:'nar', tx:'Não correu atrás de nenhuma. Ficou de pé, no mesmo lugar, com as mãos ao lado do corpo.', if:{ klara_asked:'C' } },
{ t:'pause', if:{ klara_asked:'C' } },
{ t:'nar', tx:'Uma pousou no ombro dela e ficou ali o tempo inteiro.', if:{ klara_asked:'C' } },
{ t:'nar', tx:'Klara não mexeu o ombro.', if:{ klara_asked:'C' } },
{ t:'pause', if:{ klara_asked:'C' } },
{ t:'dial', ch:'klara', tx:'Obrigada.', if:{ klara_asked:'C' } },
{ t:'nar', tx:'Subiu antes das oito, porque às oito a cozinha fecha e a casa repara em quem está fora.', if:{ klara_asked:'C' } },

{ t:'nar', tx:'Da janela do quarto leste dava para ver o pátio inteiro.', if:{ klara_asked:'B' } },
{ t:'nar', tx:'Na janela do lado oposto havia uma sombra parada, no escuro, sem vela acesa.', if:{ klara_asked:'B' } },
{ t:'pause', if:{ klara_asked:'B' } },
{ t:'inn', tx:'Ela está olhando o pátio de um lugar onde não bate sol.', if:{ klara_asked:'B' } },
{ t:'inn', tx:'Com a descrição que eu dei.', if:{ klara_asked:'B' } },

{ t:'nar', tx:'A janela do quarto das gêmeas ficou fechada até o sol sumir.', if:{ klara_asked:'A' } },
{ t:'nar', tx:'Depois abriu, e não havia mais nada para ver.', if:{ klara_asked:'A' } },
{ t:'pause', if:{ klara_asked:'A' } },
{ t:'inn', tx:'Ela esperou terminar para abrir.', if:{ klara_asked:'A' } },

{ t:'sfx', id:'sfx_footsteps' },
{ t:'nar', tx:'No pátio, Ren varria as pedras com uma vassoura de palha, devagar, desviando de cada uma.' },
{ t:'dial', ch:'antoniette', tx:'Ren. Por que desviar?' },
{ t:'spr', ch:'ren', ex:'neutral', pos:'right' },
{ t:'dial', ch:'ren', tx:'Foi o que me mandaram.' },
{ t:'dial', ch:'antoniette', tx:'Quem mandou?' },
{ t:'pause' },
{ t:'dial', ch:'ren', tx:'Ninguém, senhorita. É o jeito que se faz.' },
{ t:'spr_hide', ch:'ren' },

{ t:'inn', tx:'Ele tem cinco meses de casa e já sabe o jeito que se faz.' },
{ t:'pause' },
{ t:'inn', tx:'Alguém ensinou, e ensinou sem dizer por quê.' },

/* ======================================================================
   C7 - SERAFINA - NOITE
   A casa responde. Ela sabe quais volumes sairam da estante e diz isso
   sem dizer. A casa nunca e burra. (Frey)
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c3_serafina', chapter:'capitulo3', title:'A conta dos volumes',
  bg:'bg_main_hall', bgm:'bgm_nidhaus' },

{ t:'spr', ch:'serafina', ex:'neutral', pos:'right' },
{ t:'nar', tx:'Serafina a encontrou no salão, o que em quatro meses tinha acontecido duas vezes, as duas por escolha dela.' },

{ t:'dial', ch:'serafina', tx:'A senhorita avançou bem esta semana.' },
{ t:'dial', ch:'antoniette', tx:'O lado oeste está fechado. Começo o segundo andar na segunda.' },
{ t:'spr', ch:'serafina', ex:'direct', pos:'right' },
{ t:'dial', ch:'serafina', tx:'O segundo andar já foi mexido.' },
{ t:'pause' },

{ t:'nar', tx:'Ela disse isso sem ênfase nenhuma, no meio de uma frase sobre outra coisa.' },
{ t:'dial', ch:'serafina', tx:'Trinta e um volumes de registro fora da ordem e recolocados na ordem certa. Bom trabalho.' },
{ t:'dial', ch:'antoniette', tx:'Trinta e um.' },
{ t:'dial', ch:'serafina', tx:'Trinta e um.' },

{ t:'inn', tx:'Eu tirei trinta e um.' },
{ t:'inn', tx:'Contei porque conto tudo. Ela contou porque me contou.' },
{ t:'pause' },

{ t:'spr', ch:'serafina', ex:'smirk', pos:'right' },
{ t:'dial', ch:'serafina', tx:'A senhorita procurava alguma coisa em agosto.' },
{ t:'dial', ch:'antoniette', tx:'Procurava uma referência a uma praga sazonal. Para a nota de conservação das encadernações.' },
{ t:'pause' },
{ t:'nar', tx:'A resposta estava pronta havia três horas. Saiu no tempo certo, com o peso certo.' },
{ t:'dial', ch:'serafina', tx:'E encontrou?' },
{ t:'dial', ch:'antoniette', tx:'Nada. Vou registrar como ausência de ocorrência.' },

{ t:'spr', ch:'serafina', ex:'neutral', pos:'right' },
{ t:'dial', ch:'serafina', tx:'Registre.' },
{ t:'nar', tx:'Ela subiu a escada sem se despedir, o que era o costume da casa.' },
{ t:'spr_hide', ch:'serafina' },
{ t:'pause' },

{ t:'inn', tx:'Ela não perguntou por que eu procurava. Perguntou se eu encontrei.' },
{ t:'pause' },
{ t:'inn', tx:'Quem pergunta isso já sabe que não há o que encontrar.' },

/* ======================================================================
   C8 - FIM DE AGOSTO
   Tres semanas passam em quatro beats. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c3_fim', chapter:'capitulo3', title:'Fim de agosto',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'Duraram dezenove dias.' },
{ t:'nar', tx:'No vigésimo havia menos. No vigésimo primeiro, nenhuma.' },
{ t:'pause' },
{ t:'nar', tx:'Não havia asa no chão, nem no peitoril, nem na corrente da porta nordeste.' },
{ t:'inn', tx:'Bicho que morre deixa corpo.' },
{ t:'nar', tx:'Ela procurou no pátio por vinte minutos e anotou o resultado.' },

{ t:'arc', key:'caderno', label:'— Caderno Operacional — Entrada 31 —', lns:[
    'Fenômeno encerrado no 21º dia. Duração: dezenove dias de ocorrência plena.',
    'Nenhum espécime morto localizado em pátio, peitoril, corrente ou cocheira.',
    'A criadagem retomou a limpeza normal do pátio na manhã seguinte.',
    'Sem instrução verbal registrada em nenhum momento do período.'
]},

{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'Apagou a vela e permaneceu junto à janela até os olhos se ajustarem.' },
{ t:'pause' },

{ t:'inn', tx:'Setembro. Depois outubro.' },
{ t:'nar', tx:'Ela abriu o calendário de campo e contou os meses até o próximo agosto.' },
{ t:'pause' },
{ t:'inn', tx:'Onze.' },
{ t:'nar', tx:'Fechou o calendário sem escrever o número.' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Primeiro agosto em Velha Nidhaus.', line2:'Faltam dois.',
  chapter:'capitulo3' },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.CHAPTER3; }
