/* ==========================================================================
   ARQUIVO RABENFELS - js/data/chapter9.js
   CAPITULO 9: "A Decisao"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.

   QUANDO: Ano 5, fevereiro. Klara e Liara tem doze anos.

   O PENSAMENTO UNICO (Zinsser, unidade):
   "Ela vai tentar, e sabe a probabilidade."

   A TROCA (docs/estrutura_v1.md):
   Ela ganha o plano.
   Entrega A ORDEM. Deixa de ser agente.

   ESTE E O CAPITULO ONDE O FINAL E DECIDIDO.
   O beat { t:'ending' } avalia RBF.ENDINGS pelo acumulado e grava
   RBF.STATE.flags.ending. Capitulos 10, 11 e Epilogo leem com 'if'.

   ALDRIC AVISA SEM AVISAR.
   A ferida dele - a vez em que entrou na camara - aparece aqui de
   passagem, sem confissao. Frey: nada de ataque de consciencia, arruina
   o misterio. Ele nunca desaba. A tell dele e a conta que ele nao refaz,
   e ela permanece nao refeita.
   E ele NAO DIZ O NOME DE KLARA. Nem aqui, nem em lugar nenhum.

   LE 'taught' (Cap. 6): a promessa muda de FORMA conforme quem Klara
   virou. Aqui as tres versoes precisam ser boas de verdade, e nao
   variacao de adjetivo - foi o ponto que eu avisei que podia apertar.
   A - o metodo:  ela pede o PLANO. Quer conferir, nao ser levada.
   B - a forma:   ela pede a PALAVRA. Uma promessa dita em voz alta.
   C - o mundo:   ela pede a DATA. Ja tem o resto pronto.

   LE 'third_paid' (Cap. 8): o que Fenn pode ou nao fazer pela fuga.

   NAO PODE VAZAR: a traicao do Cap. 11, a Academia como engorda.
   Liara avanca o plano dela e ninguem liga uma coisa a outra.

   OFICIO APLICADO:
   - O ponto morto de noventa dias e combinado EM CENA. O Prologo abre
     com ele; aqui o jogador ve de onde veio.
   - A casa nunca e burra: Aldric sabe, e o que ele faz e avisar.
   - Ultima escolha que move rota.
   - A opcao de 'hope' cai na posicao 1. Posicoes usadas: 2,1,3,2,1,-,2,3.
     Ordem de exibicao: C B A.

   Contrato: 'promised', 'plan_shape' e 'ending' nao mudam de nome.

   Oito cenas: C1 a biblioteca fechada, C2 Aldric, C3 o que Liara ganhou,
   C4 o pedido de Klara (le taught), C5 a promessa (escolha), C6 o ponto
   morto, C7 o plano, C8 o final e decidido.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

/* --------------------------------------------------------------------------
   ESCOLHA - A PROMESSA
   Nao ha opcao em que ela consiga cumprir. Ha o que ela escolhe dever.
   -------------------------------------------------------------------------- */

var C9_PROMESSA_C = [
  { t:'dial', ch:'antoniette', tx:'Agosto. Antes do dia dez.' },
  { t:'nar', tx:'Klara n\u00e3o perguntou como. N\u00e3o perguntou por que agosto.' },
  { t:'pause' },
  { t:'dial', ch:'klara', tx:'Est\u00e1 bem.' },
  { t:'nar', tx:'E foi guardar a data em algum lugar de onde ela n\u00e3o ia sair.' },
  { t:'spr_hide', ch:'klara' },
  { t:'pause' },
  { t:'inn', tx:'Eu dei a ela um n\u00famero.' },
  { t:'inn', tx:'N\u00famero \u00e9 a \u00fanica coisa que crian\u00e7a nenhuma esquece.' },
  { t:'pause' },
  { t:'inn', tx:'De hoje at\u00e9 agosto s\u00e3o cento e setenta e dois dias.' },
  { t:'nar', tx:'Ela contou os dias antes de contar o que ia precisar.' }
];

var C9_PROMESSA_B = [
  { t:'dial', ch:'antoniette', tx:'Eu vou tirar voc\u00ea daqui.' },
  { t:'nar', tx:'Disse assim, inteiro, olhando no olho, sem qualificar nada.' },
  { t:'pause' },
  { t:'nar', tx:'Klara recebeu a frase de p\u00e9, com a postura que tinha aprendido, e demorou a responder.' },
  { t:'dial', ch:'klara', tx:'Obrigada.' },
  { t:'spr_hide', ch:'klara' },
  { t:'pause' },
  { t:'inn', tx:'Ela agradeceu a promessa como se agradece um presente j\u00e1 entregue.' },
  { t:'pause' },
  { t:'inn', tx:'Eu n\u00e3o sei se consigo. Sei que era a \u00fanica coisa que dava para dizer.' },
  { t:'inn', tx:'E disse com todas as letras, porque meia promessa \u00e9 pior que nenhuma.' }
];

var C9_PROMESSA_A = [
  { t:'nar', tx:'Antoniette abriu o caderno operacional numa p\u00e1gina em branco e virou para o lado da menina.' },
  { t:'dial', ch:'antoniette', tx:'Senta. Vamos escrever o que falta.' },
  { t:'pause' },
  { t:'nar', tx:'Levaram quarenta minutos. Klara conferiu tr\u00eas itens e achou um erro no hor\u00e1rio da guarda.' },
  { t:'dial', ch:'klara', tx:'A troca \u00e9 \u00e0s onze e meia. A senhorita p\u00f4s onze.' },
  { t:'dial', ch:'antoniette', tx:'Onze e meia. Corrigido.' },
  { t:'spr_hide', ch:'klara' },
  { t:'pause' },
  { t:'inn', tx:'Eu n\u00e3o prometi nada. Eu mostrei o trabalho.' },
  { t:'pause' },
  { t:'inn', tx:'E ela achou um erro meu na segunda leitura, o que significa que confere.' },
  { t:'inn', tx:'Confere porque n\u00e3o confia. Eu ensinei a n\u00e3o confiar.' }
];

RBF.CHAPTER9 = [

{ t:'chap', num:'CAP\u00cdTULO 9', name:'A DECIS\u00c3O', chapter:'capitulo9' },
{ t:'fade_out' },

/* ======================================================================
   C1 - A BIBLIOTECA FECHADA
   O prazo administrativo acaba. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c9_fechada', chapter:'capitulo9', title:'Quatro mil e duzentos',
  bg:'bg_library', bgm:'bgm_nidhaus' },
{ t:'fade_in' },

{ t:'nar', tx:'Ela catalogou o \u00faltimo volume numa ter\u00e7a de fevereiro, \u00e0s tr\u00eas da tarde.' },
{ t:'nar', tx:'Era um tratado de drenagem agr\u00edcola, em mau estado, sem valor nenhum.' },
{ t:'pause' },

{ t:'nar', tx:'Escreveu a ficha, alinhou com a borda da mesa e ficou olhando a pilha vazia.' },
{ t:'inn', tx:'Quatro mil e duzentos.' },
{ t:'pause' },
{ t:'inn', tx:'Contrato de nove meses. Cinquenta e oito meses.' },

{ t:'nar', tx:'Ela levou a \u00faltima ficha ao fich\u00e1rio e n\u00e3o conseguiu soltar a m\u00e3o dela por um tempo.' },
{ t:'pause' },
{ t:'inn', tx:'A partir de agora eu sou uma mulher que mora nesta casa sem motivo.' },
{ t:'inn', tx:'Toda casa acaba perguntando por qu\u00ea.' },

/* ======================================================================
   C2 - ALDRIC
   Ele avisa sem avisar. A ferida aparece de passagem, sem confissao.
   Nao diz o nome de Klara. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c9_aldric', chapter:'capitulo9', title:'A biblioteca vazia',
  bg:'bg_library', bgm:null },

{ t:'sfx', id:'sfx_footsteps' },
{ t:'nar', tx:'Aldric apareceu na porta no fim daquela mesma tarde, o que n\u00e3o acontecia desde o primeiro ano.' },
{ t:'spr', ch:'aldric', ex:'cold', pos:'left' },
{ t:'dial', ch:'aldric', tx:'Terminou.' },
{ t:'dial', ch:'antoniette', tx:'Terminei.' },
{ t:'pause' },

{ t:'nar', tx:'Ele subiu ao segundo andar, tirou um volume da estante e leu de p\u00e9, apoiado, como sempre.' },
{ t:'dial', ch:'aldric', tx:'Minha mulher vai oferecer \u00e0 senhorita a cataloga\u00e7\u00e3o do arquivo de contas.' },
{ t:'dial', ch:'antoniette', tx:'Eu n\u00e3o sabia disso.' },
{ t:'dial', ch:'aldric', tx:'Vai ser amanh\u00e3 ou depois. Ela leva dois dias para propor uma coisa que j\u00e1 decidiu.' },
{ t:'pause' },

{ t:'inn', tx:'Ele est\u00e1 me contando o que a mulher dele vai fazer.' },
{ t:'inn', tx:'Isso n\u00e3o \u00e9 fofoca. \u00c9 prazo.' },

{ t:'spr', ch:'aldric', ex:'side', pos:'left' },
{ t:'nar', tx:'Ele virou uma p\u00e1gina sem levantar os olhos.' },
{ t:'dial', ch:'aldric', tx:'Se a senhorita aceitar, fica mais tr\u00eas anos.' },
{ t:'pause' },
{ t:'dial', ch:'aldric', tx:'Trabalho de arquivo n\u00e3o acaba. \u00c9 o que ele tem de bom e de ruim.' },

{ t:'nar', tx:'Antoniette esperou, porque ele estava indo a algum lugar e ela sabia disso havia cinco anos.' },
{ t:'pause' },

{ t:'spr', ch:'aldric', ex:'stare', pos:'left' },
{ t:'dial', ch:'aldric', tx:'Eu tinha vinte e seis anos quando entendi como esta casa funciona.' },
{ t:'dial', ch:'aldric', tx:'Levei uma tarde.' },
{ t:'pause' },
{ t:'dial', ch:'aldric', tx:'Depois disso eu tive trinta anos para fazer alguma coisa a respeito, e n\u00e3o fiz.' },

{ t:'nar', tx:'Ele fechou o volume e o recolocou exatamente no lugar de onde tinha tirado.' },
{ t:'dial', ch:'aldric', tx:'N\u00e3o \u00e9 remorso. Remorso \u00e9 para quem hesitou.' },
{ t:'pause' },
{ t:'dial', ch:'aldric', tx:'Eu n\u00e3o hesitei. Eu fiz a conta uma vez e nunca mais refiz.' },

{ t:'nar', tx:'Desceu a escada e parou no meio, de costas, como j\u00e1 tinha parado uma vez em abril do primeiro ano.' },
{ t:'dial', ch:'aldric', tx:'A senhorita ainda est\u00e1 na parte em que refazer a conta \u00e9 poss\u00edvel.' },
{ t:'spr_hide', ch:'aldric' },
{ t:'sfx', id:'sfx_door' },
{ t:'pause' },

{ t:'inn', tx:'Ele n\u00e3o me disse para ir embora.' },
{ t:'inn', tx:'Disse que a janela existe, e que ele sabe a que horas ela fecha.' },
{ t:'pause' },
{ t:'inn', tx:'E n\u00e3o disse o nome dela uma vez sequer.' },

/* ======================================================================
   C3 - O QUE LIARA GANHOU
   As duas decidem juntas sem saber. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c9_liara', chapter:'capitulo9', title:'O que Liara ganhou',
  bg:'bg_corridor', bgm:null },

{ t:'nar', tx:'Liara ganhou a discuss\u00e3o em mar\u00e7o, depois de quatro meses pedindo todo dia.' },
{ t:'spr', ch:'liara', ex:'bright', pos:'right' },
{ t:'dial', ch:'liara', tx:'Papai disse sim!' },
{ t:'dial', ch:'liara', tx:'Quando eu fizer dezoito. As duas juntas, na mesma turma.' },
{ t:'pause' },

{ t:'dial', ch:'antoniette', tx:'As duas?' },
{ t:'dial', ch:'liara', tx:'Eu falei que n\u00e3o ia sem ela. A\u00ed ele deixou.' },

{ t:'nar', tx:'Ela disse aquilo como quem conta uma vit\u00f3ria de teimosia, porque era exatamente isso.' },
{ t:'spr_hide', ch:'liara' },
{ t:'nar', tx:'E saiu correndo contar para mais algu\u00e9m.' },
{ t:'pause' },

{ t:'inn', tx:'Aldric e Serafina passaram doze anos sem deixar aquela menina sair do vale.' },
{ t:'inn', tx:'E cederam para uma crian\u00e7a de doze anos que pediu todo dia durante quatro meses.' },
{ t:'inn', tx:'Cederam uma coisa que s\u00f3 acontece daqui a seis anos. Dizer sim para isso hoje n\u00e3o custa nada.' },
{ t:'pause' },
{ t:'inn', tx:'Gente que administra um pacto de trezentos anos n\u00e3o cede por cansa\u00e7o.' },
{ t:'nar', tx:'Ela anotou a data no caderno operacional e p\u00f4s um ponto de interroga\u00e7\u00e3o ao lado.' },
{ t:'nar', tx:'Foi a \u00fanica vez em cinco anos que ela usou um ponto de interroga\u00e7\u00e3o num registro.' },

/* ======================================================================
   C4 - O PEDIDO
   LE 'taught'. O que Klara pede muda de natureza. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c9_pedido', chapter:'capitulo9', title:'O que ela pede',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'Klara bateu na porta do quarto leste \u00e0s nove da noite, o que ela nunca tinha feito em cinco anos.' },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'nar', tx:'Entrou, fechou a porta e ficou de costas para ela.' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'A Liara contou.' },
{ t:'dial', ch:'antoniette', tx:'Contou.' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'A senhorita disse fevereiro.' },
{ t:'nar', tx:'E fevereiro tinha acabado onze dias antes.' },

/* --- ramo A: o metodo ------------------------------------------------ */
{ t:'nar', tx:'Ela p\u00f4s sobre a mesa duas folhas dobradas e as abriu com as duas m\u00e3os.', if:{ taught:'A' } },
{ t:'dial', ch:'klara', tx:'Guarda do port\u00e3o, por dia da semana. Hora da carro\u00e7a do sal. Quando o Fenn dorme.', if:{ taught:'A' } },
{ t:'nar', tx:'A letra era pequena e reta, e as colunas estavam alinhadas com r\u00e9gua.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'dial', ch:'klara', tx:'Eu n\u00e3o quero ser levada. Quero ver o plano.', if:{ taught:'A' } },
{ t:'dial', ch:'klara', tx:'Se tiver erro eu acho.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'inn', tx:'Ela n\u00e3o veio pedir socorro. Veio pedir para conferir.', if:{ taught:'A' } },

/* --- ramo B: a forma ------------------------------------------------- */
{ t:'nar', tx:'Ela se virou, e tinha se arrumado para aquela conversa.', if:{ taught:'B' } },
{ t:'dial', ch:'klara', tx:'Eu queria pedir do jeito certo, e n\u00e3o tem jeito certo. A senhorita disse.', if:{ taught:'B' } },
{ t:'pause', if:{ taught:'B' } },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o eu pe\u00e7o assim: eu queria ouvir a senhorita dizer.', if:{ taught:'B' } },
{ t:'dial', ch:'antoniette', tx:'Dizer o qu\u00ea?', if:{ taught:'B' } },
{ t:'dial', ch:'klara', tx:'Em voz alta. Inteiro. Sem "se der".', if:{ taught:'B' } },
{ t:'pause', if:{ taught:'B' } },
{ t:'inn', tx:'Ela sabe que promessa dita em voz alta prende quem diz.', if:{ taught:'B' } },
{ t:'inn', tx:'Eu ensinei isso a ela numa sala de jantar, sobre uma visita.', if:{ taught:'B' } },

/* --- ramo C: o mundo ------------------------------------------------- */
{ t:'nar', tx:'Ela p\u00f4s sobre a mesa um saco de pano, e dentro havia p\u00e3o duro, meia vela e o anel da av\u00f3.', if:{ taught:'C' } },
{ t:'dial', ch:'klara', tx:'Est\u00e1 pronto desde outubro.', if:{ taught:'C' } },
{ t:'pause', if:{ taught:'C' } },
{ t:'dial', ch:'klara', tx:'Eu s\u00f3 preciso do dia.', if:{ taught:'C' } },
{ t:'nar', tx:'Antoniette olhou o p\u00e3o duro e reconheceu o m\u00eas pela cor.', if:{ taught:'C' } },
{ t:'pause', if:{ taught:'C' } },
{ t:'inn', tx:'Cinco meses com um saco pronto debaixo da cama.', if:{ taught:'C' } },
{ t:'inn', tx:'Esperando eu.', if:{ taught:'C' } },

/* ======================================================================
   C5 - A PROMESSA
   ESCOLHA. Ordem de exibicao C B A - a de 'hope' na posicao 1.
   ====================================================================== */
{ t:'pause' },
{ t:'nar', tx:'Antoniette ficou de p\u00e9 junto da janela e n\u00e3o olhou para a menina enquanto pensava.' },
{ t:'inn', tx:'A marca da parede est\u00e1 a menos de um palmo. N\u00e3o \u00e9 idade, \u00e9 altura.' },
{ t:'inn', tx:'Se eu errar, ela n\u00e3o tem uma segunda vez.' },

{ t:'cho', id:'cap9_promessa', code:'C-IX', prompt:'A PROMESSA', opts:[
  { id:'C',
    tx:'Dar a data. Agosto, antes do dia dez.',
    flags:{ promised:'C', plan_shape:'data' },
    routes:{ hope: 3, answer: 1 },
    then: C9_PROMESSA_C },
  { id:'B',
    tx:'Dizer em voz alta, inteiro, sem qualificar.',
    flags:{ promised:'B', plan_shape:'palavra' },
    routes:{ hope: 2, loss: 2 },
    then: C9_PROMESSA_B },
  { id:'A',
    tx:'N\u00e3o prometer. Abrir o caderno e mostrar o trabalho.',
    flags:{ promised:'A', plan_shape:'plano' },
    routes:{ answer: 3, hope: 1 },
    then: C9_PROMESSA_A }
]},

/* ======================================================================
   C6 - O PONTO MORTO
   O Prologo abre com isto. Aqui o jogador ve de onde veio.
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c9_ponto_morto', chapter:'capitulo9', title:'Noventa dias',
  bg:'bg_antoniette_room', bgm:'bgm_archive' },

{ t:'nar', tx:'Ela escreveu a Matheo em abril, e foi a carta mais curta em nove anos de correspond\u00eancia.' },

{ t:'arc', key:'matheo', label:'\u2014 correspond\u00eancia de campo \u2014', lns:[
    'M. \u2014 solicito ponto morto em noventa dias, a contar desta data,',
    'renov\u00e1vel a cada relat\u00f3rio.',
    'Sem not\u00edcia em noventa dias, o pacote sai por conta pr\u00f3pria.',
    'N\u00e3o pe\u00e7a explica\u00e7\u00e3o por carta. Eu n\u00e3o daria uma boa.',
    'A.'
]},

{ t:'nar', tx:'A resposta veio em doze dias e tinha uma linha.' },

{ t:'arc', key:'matheo', label:'\u2014 correspond\u00eancia de campo \u2014', lns:[
    'Concedido. Noventa dias. \u2014 M.'
]},

{ t:'pause' },
{ t:'inn', tx:'Ele n\u00e3o perguntou.' },
{ t:'inn', tx:'Em nove anos ele nunca deixou de perguntar uma coisa dessas.' },
{ t:'pause' },
{ t:'inn', tx:'Ou ele confia, ou j\u00e1 entendeu, ou n\u00e3o quer ter escrito a pergunta.' },
{ t:'nar', tx:'Ela guardou as duas cartas juntas, dobradas na mesma dobra.' },

/* ======================================================================
   C7 - O PLANO
   Le 'third_paid' do Capitulo 8. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c9_plano', chapter:'capitulo9', title:'O que ela tem',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'De abril a julho ela montou a coisa em papel, e o papel ficou embaixo do forro do ba\u00fa.' },

{ t:'nar', tx:'Fenn continuava com a chave e com o filho na cocheira. Ela n\u00e3o pediu nada a ele.', if:{ third_paid:'A' } },
{ t:'inn', tx:'Pedir seria cobrar o obrigado, e o obrigado dele j\u00e1 foi caro demais.', if:{ third_paid:'A' } },

{ t:'nar', tx:'Fenn estava na cocheira em tempo integral e n\u00e3o entrava mais na casa. N\u00e3o havia o que pedir.', if:{ third_paid:'B' } },
{ t:'inn', tx:'Eu gastei a \u00fanica pessoa que sabia os hor\u00e1rios de dentro.', if:{ third_paid:'B' } },

{ t:'nar', tx:'Fenn apareceu sozinho numa noite de junho e disse o hor\u00e1rio da guarda sem que ela perguntasse.', if:{ third_paid:'C' } },
{ t:'nar', tx:'Disse, virou as costas e n\u00e3o voltou ao assunto em julho inteiro.', if:{ third_paid:'C' } },
{ t:'inn', tx:'Ele n\u00e3o me deve nada. Foi ele que decidiu que devia.', if:{ third_paid:'C' } },

{ t:'pause' },

{ t:'arc', key:'sem_identificacao', label:'\u2014 caderno sem identifica\u00e7\u00e3o \u2014', lns:[
    'Tr\u00eas dias de carruagem at\u00e9 Lervel. A Ordem n\u00e3o pode receber. Descartado.',
    'Marca Cinzenta: quatro aldeias, todas contratadas pela casa. Descartado.',
    'Rio: quatro dias a p\u00e9 at\u00e9 barco naveg\u00e1vel, com uma crian\u00e7a. Poss\u00edvel.',
    'Melhor janela: agosto, madrugada, enquanto a casa espera o fen\u00f4meno.',
    'Probabilidade honesta: baixa.'
]},

{ t:'nar', tx:'Ela releu a \u00faltima linha e a manteve.' },
{ t:'pause' },
{ t:'inn', tx:'Eu escrevi baixa porque \u00e9 baixa.' },
{ t:'inn', tx:'Se eu escrever outra coisa, eu estou preparando a desculpa em vez do plano.' },

/* ======================================================================
   C8 - O FINAL E DECIDIDO
   O beat { t:'ending' } avalia RBF.ENDINGS pelo acumulado.
   Saida: ponte para o Capitulo 10.
   ====================================================================== */
{ t:'scene', id:'c9_julho', chapter:'capitulo9', title:'Fim de julho',
  bg:'bg_corridor', bgm:null },

/* ----------------------------------------------------------------------
   A COBERTURA QUEIMADA - o gatilho.

   O final existia em RBF.ENDINGS desde o inicio e NUNCA disparava: a
   flag nao era gravada em lugar nenhum, e a ramificacao escrita nos
   Capitulos 10 e 11 era conteudo morto. O teste de alcance tinha uma
   excecao que deixava passar em silencio.

   O gatilho sao duas escolhas que o jogador ja fez, e as duas sao o
   jogador sendo CORRETO pelas regras da Ordem:

     lied_to_order:'A'  relatou agosto do ano tres na integra, com hora,
                        local e testemunha direta, por correspondencia.
     third_paid:'B'     comprou o nome da antecessora e remeteu a Lervel
                        COM identificacao da fonte, porque prova sem
                        proveniencia nao vale em materia de foro.

   Nidhaus le tudo o que entra e sai - e canon desde o Capitulo 1, e o
   Capitulo 11 volta a dizer. Ela pos o nome de um empregado vivo dentro
   de um envelope que atravessa esta casa.

   Serafina ja tinha avisado, no Capitulo 8, que escreveu a Lervel para
   conferir as referencias dela. Aqui a conta fecha.

   >>> Ser honesta com a Ordem e o que queima a cobertura dela. <<<
   ---------------------------------------------------------------------- */
{ t:'flag', set:{ cover_burned:true }, if:{ lied_to_order:'A', third_paid:'B' } },

{ t:'ending' },

{ t:'nar', tx:'No fim de julho a casa come\u00e7ou a se preparar para agosto do jeito que se prepara todo ano.' },
{ t:'nar', tx:'Ningu\u00e9m disse a palavra. Trocaram o hor\u00e1rio da copa e fecharam duas janelas do lado leste.' },
{ t:'pause' },

{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'spr', ch:'liara', ex:'neutral', pos:'right' },
{ t:'nar', tx:'As duas meninas estavam no degrau do corredor, contando quantos dias faltavam para a maioridade de Liara.' },
{ t:'dial', ch:'liara', tx:'Mil novecentos e quarenta e oito.' },
{ t:'dial', ch:'klara', tx:'Mil novecentos e quarenta e nove. Voc\u00ea contou hoje duas vezes.' },
{ t:'dial', ch:'liara', tx:'Contei n\u00e3o.' },
{ t:'dial', ch:'klara', tx:'Contou.' },
{ t:'pause' },
{ t:'nar', tx:'Liara refez a conta nos dedos, aceitou o mil novecentos e quarenta e nove e recome\u00e7ou a falar de outra coisa.' },
{ t:'spr_hide', ch:'liara' },
{ t:'spr_hide', ch:'klara' },

{ t:'pause' },
{ t:'inn', tx:'Uma est\u00e1 contando os dias at\u00e9 a Academia.' },
{ t:'inn', tx:'A outra est\u00e1 contando os dias at\u00e9 agosto.' },
{ t:'pause' },
{ t:'inn', tx:'E as duas acham que est\u00e3o contando a mesma coisa.' },

{ t:'nar', tx:'Antoniette voltou ao quarto e tirou o papel de baixo do forro pela \u00faltima vez para conferir.' },
{ t:'nar', tx:'Estava tudo l\u00e1. Datas, hor\u00e1rios, o que funciona e o que n\u00e3o funciona.' },
{ t:'pause' },
{ t:'nar', tx:'Ela dobrou o papel e o guardou no bolso interno, onde ele ia ficar at\u00e9 o dia.' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Cinco anos em Velha Nidhaus.', line2:'Faltam trinta e um dias.',
  chapter:'capitulo9' },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.CHAPTER9; }
