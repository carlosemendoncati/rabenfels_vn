/* ==========================================================================
   ARQUIVO RABENFELS - js/data/chapter9.js
   CAPITULO 9: "A Decisao"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.

   QUANDO: Ano 5, fevereiro. Klara e Liara tem doze anos.

   O PENSAMENTO UNICO (Zinsser, unidade):
   "Ela vai tentar, e sabe a probabilidade."

   A TROCA (docs/biblia_narrativa_rabenfels.md):
   Ela ganha o plano.
   Entrega A ORDEM. Deixa de ser agente.

   ESTE E O CAPITULO ONDE O FINAL E DECIDIDO.
   O beat { t:'ending' } avalia RBF.ROTAS pelo acumulado e grava
   RBF.STATE.flags.rota. Os capitulos de rota e o Epilogo leem com 'if'.

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
  { t:'nar', tx:'Klara não perguntou como. Não perguntou por que agosto.' },
  { t:'pause' },
  { t:'dial', ch:'klara', tx:'Está bem.' },
  { t:'nar', tx:'E foi guardar a data em algum lugar de onde ela não ia sair.' },
  { t:'spr_hide', ch:'klara' },
  { t:'pause' },
  { t:'inn', tx:'Eu dei a ela um número.' },
  { t:'inn', tx:'Ela não repetiu a data. Não precisava.' },
  { t:'pause' },
  { t:'inn', tx:'De hoje até agosto são cento e setenta e dois dias.' },
  { t:'nar', tx:'Ela contou os dias antes de contar o que ia precisar.' }
];

var C9_PROMESSA_B = [
  { t:'dial', ch:'antoniette', tx:'Eu vou tirar você daqui.' },
  { t:'nar', tx:'Disse assim, inteiro, olhando no olho, sem qualificar nada.' },
  { t:'pause' },
  { t:'nar', tx:'Klara recebeu a frase de pé, com a postura que tinha aprendido, e demorou a responder.' },
  { t:'dial', ch:'klara', tx:'Obrigada.' },
  { t:'spr_hide', ch:'klara' },
  { t:'pause' },
  { t:'inn', tx:'Ela agradeceu antes de perguntar qualquer coisa. Não perguntou.' },
  { t:'pause' },
  { t:'inn', tx:'Eu não sei se consigo. Sei que era a única coisa que dava para dizer.' },
  { t:'inn', tx:'Se eu dissesse "talvez", ela apagaria a palavra e guardaria o resto.' }
];

var C9_PROMESSA_A = [
  { t:'nar', tx:'Antoniette abriu o caderno operacional numa página em branco e virou para o lado da menina.' },
  { t:'dial', ch:'antoniette', tx:'Senta. Vamos escrever o que falta.' },
  { t:'pause' },
  { t:'nar', tx:'Levaram quarenta minutos. Klara conferiu três itens e achou um erro no horário da guarda.' },
  { t:'dial', ch:'klara', tx:'A troca é às onze e meia. A senhorita pôs onze.' },
  { t:'dial', ch:'antoniette', tx:'Onze e meia. Corrigido.' },
  { t:'spr_hide', ch:'klara' },
  { t:'pause' },
  { t:'inn', tx:'Eu não prometi nada. Eu mostrei o trabalho.' },
  { t:'pause' },
  { t:'inn', tx:'E ela achou um erro meu na segunda leitura, o que significa que confere.' },
  { t:'inn', tx:'Confere porque não confia. Eu ensinei a não confiar.' }
];

RBF.CHAPTER9 = [

{ t:'chap', num:'CAPÍTULO 9', name:'A DECISÃO', chapter:'capitulo9' },
{ t:'fade_out' },

/* ======================================================================
   C1 - A BIBLIOTECA FECHADA
   O prazo administrativo acaba. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c9_fechada', chapter:'capitulo9', title:'Quatro mil e duzentos',
  bg:'bg_library', bgm:'bgm_nidhaus' },
{ t:'fade_in' },

{ t:'nar', tx:'Ela catalogou o último volume numa terça de fevereiro, às três da tarde.' },
{ t:'nar', tx:'A biblioteca em fevereiro é fria de um jeito que entra pelos pés. Os dedos dela estavam duros de segurar pena.' },
{ t:'nar', tx:'Era um tratado de drenagem agrícola, em mau estado, sem valor nenhum.' },
{ t:'pause' },

{ t:'nar', tx:'Escreveu a ficha, alinhou com a borda da mesa e ficou olhando a pilha vazia.' },
{ t:'inn', tx:'Quatro mil e duzentos.' },
{ t:'pause' },
{ t:'inn', tx:'Contrato de nove meses. Quarenta e seis meses.' },

{ t:'nar', tx:'Ela levou a última ficha ao fichário. Os dedos ficaram na aba até a junta perder cor.' },
{ t:'pause' },
{ t:'inn', tx:'A partir de agora eu sou uma mulher que mora nesta casa sem motivo.' },
{ t:'inn', tx:'Toda casa acaba perguntando por quê.' },

/* ======================================================================
   C2 - ALDRIC
   Ele avisa sem avisar. A ferida aparece de passagem, sem confissao.
   Nao diz o nome de Klara. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c9_aldric', chapter:'capitulo9', title:'A biblioteca vazia',
  bg:'bg_library', bgm:null },

{ t:'sfx', id:'sfx_footsteps' },
{ t:'nar', tx:'Aldric apareceu na porta no fim daquela mesma tarde, o que não acontecia desde o primeiro ano.' },
{ t:'spr', ch:'aldric', ex:'cold', pos:'left' },
{ t:'dial', ch:'aldric', tx:'Terminou.' },
{ t:'dial', ch:'antoniette', tx:'Terminei.' },
{ t:'pause' },

{ t:'nar', tx:'Ele subiu ao segundo andar, tirou um volume da estante e leu de pé, apoiado, como sempre.' },
{ t:'dial', ch:'aldric', tx:'Minha mulher vai oferecer à senhorita a catalogação do arquivo de contas.' },
{ t:'dial', ch:'antoniette', tx:'Eu não sabia disso.' },
{ t:'dial', ch:'aldric', tx:'Vai ser amanhã ou depois. Ela leva dois dias para propor uma coisa que já decidiu.' },
{ t:'pause' },

{ t:'inn', tx:'Ele está me contando o que a mulher dele vai fazer.' },
{ t:'inn', tx:'Isso não é fofoca. É prazo.' },

{ t:'spr', ch:'aldric', ex:'side', pos:'left' },
{ t:'nar', tx:'Ele virou uma página sem levantar os olhos.' },
{ t:'dial', ch:'aldric', tx:'Se a senhorita aceitar, fica mais três anos.' },
{ t:'pause' },
{ t:'dial', ch:'aldric', tx:'Trabalho de arquivo não acaba. É o que ele tem de bom e de ruim.' },

{ t:'nar', tx:'Antoniette esperou, porque ele estava indo a algum lugar e ela sabia disso havia cinco anos.' },
{ t:'pause' },

{ t:'spr', ch:'aldric', ex:'stare', pos:'left' },
{ t:'dial', ch:'aldric', tx:'Eu tinha vinte e seis anos quando entendi como esta casa funciona.' },
{ t:'dial', ch:'aldric', tx:'Levei uma tarde.' },
{ t:'pause' },
{ t:'dial', ch:'aldric', tx:'Depois disso eu tive trinta anos para fazer alguma coisa a respeito, e não fiz.' },

{ t:'nar', tx:'Ele fechou o volume, encaixou-o entre os vizinhos e alinhou a lombada com o polegar.' },
{ t:'dial', ch:'aldric', tx:'Não é remorso. Remorso é para quem hesitou.' },
{ t:'pause' },
{ t:'dial', ch:'aldric', tx:'Eu não hesitei. Eu fiz a conta uma vez e nunca mais refiz.' },

{ t:'nar', tx:'Desceu a escada e parou no meio, de costas, como já tinha parado uma vez em abril do primeiro ano.' },
{ t:'dial', ch:'aldric', tx:'A senhorita ainda está na parte em que refazer a conta é possível.' },
{ t:'spr_hide', ch:'aldric' },
{ t:'sfx', id:'sfx_door' },
{ t:'pause' },

{ t:'inn', tx:'Ele não me disse para ir embora.' },
{ t:'inn', tx:'Disse que a janela existe. Disse que sabe a que horas ela fecha.' },
{ t:'pause' },
{ t:'inn', tx:'E não disse o nome dela uma vez sequer.' },

/* ======================================================================
   C3 - O QUE LIARA GANHOU
   As duas decidem juntas sem saber. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c9_liara', chapter:'capitulo9', title:'O que Liara ganhou',
  bg:'bg_corridor', bgm:null },

{ t:'nar', tx:'Liara ganhou a discussão em março, depois de quatro meses pedindo todo dia.' },
{ t:'spr', ch:'liara', ex:'bright', pos:'right' },
{ t:'dial', ch:'liara', tx:'Papai disse sim!' },
{ t:'dial', ch:'liara', tx:'Quando eu fizer dezoito. As duas juntas, na mesma turma.' },
{ t:'pause' },

{ t:'dial', ch:'antoniette', tx:'As duas?' },
{ t:'dial', ch:'liara', tx:'Eu falei que não ia sem ela. Aí ele deixou.' },

{ t:'nar', tx:'Contou sorrindo, com o papel da Academia apertado contra o peito.' },
{ t:'spr_hide', ch:'liara' },
{ t:'nar', tx:'E saiu correndo contar para mais alguém.' },
{ t:'pause' },

{ t:'inn', tx:'Aldric e Serafina passaram doze anos sem deixar aquela menina sair do vale.' },
{ t:'inn', tx:'E cederam para uma criança de doze anos que pediu todo dia durante quatro meses.' },
{ t:'inn', tx:'Cederam uma coisa que só acontece daqui a seis anos. Dizer sim para isso hoje não custa nada.' },
{ t:'pause' },
{ t:'inn', tx:'Gente que administra um pacto de trezentos anos não cede por cansaço.' },
{ t:'nar', tx:'Ela anotou a data no caderno operacional e pôs um ponto de interrogação ao lado.' },
{ t:'nar', tx:'Foi a única vez em cinco anos que ela usou um ponto de interrogação num registro.' },

/* ======================================================================
   C4 - O PEDIDO
   LE 'taught'. O que Klara pede muda de natureza. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c9_pedido', chapter:'capitulo9', title:'O que ela pede',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'Klara bateu na porta do quarto leste às nove. Três toques iguais. Em cinco anos, nunca fora ali àquela hora.' },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'nar', tx:'Entrou, fechou a porta e ficou de costas para ela.' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'A Liara contou.' },
{ t:'dial', ch:'antoniette', tx:'Contou.' },
{ t:'pause' },
{ t:'dial', ch:'klara', tx:'A senhorita disse fevereiro.' },
{ t:'nar', tx:'E fevereiro tinha acabado onze dias antes.' },

/* --- ramo A: o metodo ------------------------------------------------ */
{ t:'nar', tx:'Ela pôs sobre a mesa duas folhas dobradas e as abriu com as duas mãos.', if:{ taught:'A' } },
{ t:'dial', ch:'klara', tx:'Guarda do portão, por dia da semana. Hora da carroça do sal. Quando o Fenn dorme.', if:{ taught:'A' } },
{ t:'nar', tx:'A letra era pequena e reta, e as colunas estavam alinhadas com régua.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'dial', ch:'klara', tx:'Eu não quero ser levada. Quero ver o plano.', if:{ taught:'A' } },
{ t:'dial', ch:'klara', tx:'Se tiver erro eu acho.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'inn', tx:'Ela não veio pedir socorro. Veio pedir para conferir.', if:{ taught:'A' } },

/* --- ramo B: a forma ------------------------------------------------- */
{ t:'nar', tx:'Ela se virou, e tinha se arrumado para aquela conversa.', if:{ taught:'B' } },
{ t:'dial', ch:'klara', tx:'Eu queria pedir do jeito certo, e não tem jeito certo. A senhorita disse.', if:{ taught:'B' } },
{ t:'pause', if:{ taught:'B' } },
{ t:'dial', ch:'klara', tx:'Então eu peço assim: eu queria ouvir a senhorita dizer.', if:{ taught:'B' } },
{ t:'dial', ch:'antoniette', tx:'Dizer o quê?', if:{ taught:'B' } },
{ t:'dial', ch:'klara', tx:'Em voz alta. Inteiro. Sem "se der".', if:{ taught:'B' } },
{ t:'pause', if:{ taught:'B' } },
{ t:'inn', tx:'Ela sabe que promessa dita em voz alta prende quem diz.', if:{ taught:'B' } },
{ t:'inn', tx:'Eu ensinei isso a ela numa sala de jantar, sobre uma visita.', if:{ taught:'B' } },

/* --- ramo C: o mundo ------------------------------------------------- */
{ t:'nar', tx:'Ela pôs sobre a mesa um saco de pano, e dentro havia pão duro, meia vela e o anel da avó.', if:{ taught:'C' } },
{ t:'dial', ch:'klara', tx:'Está pronto desde outubro.', if:{ taught:'C' } },
{ t:'pause', if:{ taught:'C' } },
{ t:'dial', ch:'klara', tx:'Eu só preciso do dia.', if:{ taught:'C' } },
{ t:'nar', tx:'Antoniette olhou o pão duro e reconheceu o mês pela cor.', if:{ taught:'C' } },
{ t:'pause', if:{ taught:'C' } },
{ t:'inn', tx:'Cinco meses com um saco pronto debaixo da cama.', if:{ taught:'C' } },
{ t:'inn', tx:'Esperando eu.', if:{ taught:'C' } },

/* ======================================================================
   C5 - A PROMESSA
   ESCOLHA. Ordem de exibicao C B A - a de 'hope' na posicao 1.
   ====================================================================== */
{ t:'pause' },
{ t:'nar', tx:'Antoniette ficou de pé junto da janela e não olhou para a menina enquanto pensava.' },
{ t:'inn', tx:'A marca da parede está a menos de um palmo.' },
{ t:'inn', tx:'O ciclo mede altura. Está tudo na folha que ela mesma me trouxe.' },
{ t:'inn', tx:'Se eu errar, ela não tem uma segunda vez.' },

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
    tx:'Não prometer. Abrir o caderno e mostrar o trabalho.',
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

{ t:'nar', tx:'Ela escreveu a Matheo em abril. Foi a carta mais curta de toda a correspondência.' },

{ t:'arc', key:'matheo', label:'— correspondência de campo —', lns:[
    'M. — solicito ponto morto em noventa dias, a contar desta data,',
    'renovável a cada relatório.',
    'Sem notícia em noventa dias, o pacote sai por conta própria.',
    'Não peça explicação por carta. Eu não daria uma boa.',
    'A.'
]},

{ t:'nar', tx:'A resposta veio em doze dias e tinha uma linha.' },

{ t:'arc', key:'matheo', label:'— correspondência de campo —', lns:[
    'Concedido. Noventa dias. — M.'
]},

{ t:'pause' },
{ t:'inn', tx:'Ele não perguntou.' },
{ t:'inn', tx:'Dois anos antes, uma pergunta dessas teria recebido três páginas.' },
{ t:'pause' },
{ t:'inn', tx:'Ou ele confia, ou já entendeu, ou não quer ter escrito a pergunta.' },
{ t:'nar', tx:'Ela guardou as duas cartas juntas, dobradas na mesma dobra.' },

/* ======================================================================
   C7 - O PLANO
   Le 'third_paid' do Capitulo 8. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c9_plano', chapter:'capitulo9', title:'O que ela tem',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'De abril a julho ela montou a coisa em papel, e o papel ficou embaixo do forro do baú.' },
{ t:'nar', tx:'Escreveu tanto naqueles três meses que a dobra do dedo médio ficou com um calo que não saiu mais.' },

{ t:'nar', tx:'Fenn continuava com a chave e com o filho na cocheira. Ela não pediu nada a ele.', if:{ third_paid:'A' } },
{ t:'inn', tx:'Pedir seria cobrar o obrigado, e o obrigado dele já foi caro demais.', if:{ third_paid:'A' } },

{ t:'nar', tx:'Fenn estava na cocheira em tempo integral e não entrava mais na casa. Não havia o que pedir.', if:{ third_paid:'B' } },
{ t:'inn', tx:'Eu gastei a única pessoa que sabia os horários de dentro.', if:{ third_paid:'B' } },

{ t:'nar', tx:'Fenn apareceu sozinho numa noite de junho e disse o horário da guarda sem que ela perguntasse.', if:{ third_paid:'C' } },
{ t:'nar', tx:'Disse, virou as costas e não voltou ao assunto em julho inteiro.', if:{ third_paid:'C' } },
{ t:'inn', tx:'Ele não me deve nada. Foi ele que decidiu que devia.', if:{ third_paid:'C' } },

{ t:'pause' },

{ t:'arc', key:'sem_identificacao', label:'— caderno sem identificação —', lns:[
    'Três dias de carruagem até Lervel. A Ordem não pode receber. Descartado.',
    'Marca Cinzenta: quatro aldeias, todas contratadas pela casa. Descartado.',
    'Rio: quatro dias a pé até barco navegável, com uma criança. Possível.',
    'Melhor janela: agosto, madrugada, enquanto a casa espera o fenômeno.',
    'Probabilidade honesta: baixa.'
]},

{ t:'nar', tx:'Ela releu a última linha e a manteve.' },
{ t:'pause' },
{ t:'inn', tx:'Eu escrevi baixa porque é baixa.' },
{ t:'inn', tx:'Se eu escrever outra coisa, eu estou preparando a desculpa em vez do plano.' },

/* ======================================================================
   C8 - A ROTA E DECIDIDA
   O beat { t:'ending' } avalia RBF.ROTAS pelo acumulado.
   Saida: ponte para o Capitulo 10.
   ====================================================================== */
{ t:'scene', id:'c9_julho', chapter:'capitulo9', title:'Fim de julho',
  bg:'bg_corridor', bgm:null },

/* ----------------------------------------------------------------------
   A COBERTURA QUEIMADA - o gatilho.

   A rota existia em RBF.ROTAS desde o inicio e NUNCA disparava: a
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

{ t:'nar', tx:'No fim de julho começaram os preparativos de agosto.' },
{ t:'nar', tx:'Ninguém disse a palavra. Trocaram o horário da copa e fecharam duas janelas do lado leste.' },
{ t:'pause' },

{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'spr', ch:'liara', ex:'neutral', pos:'right' },
{ t:'nar', tx:'As duas meninas estavam no degrau do corredor, contando quantos dias faltavam para a maioridade de Liara.' },
{ t:'dial', ch:'liara', tx:'Mil novecentos e quarenta e oito.' },
{ t:'dial', ch:'klara', tx:'Mil novecentos e quarenta e nove. Você contou hoje duas vezes.' },
{ t:'dial', ch:'liara', tx:'Contei não.' },
{ t:'dial', ch:'klara', tx:'Contou.' },
{ t:'pause' },
{ t:'nar', tx:'Liara refez a conta nos dedos, aceitou o mil novecentos e quarenta e nove e recomeçou a falar de outra coisa.' },
{ t:'spr_hide', ch:'liara' },
{ t:'spr_hide', ch:'klara' },

{ t:'pause' },
{ t:'inn', tx:'Uma está contando os dias até a Academia.' },
{ t:'inn', tx:'A outra está contando os dias até agosto.' },
{ t:'pause' },
{ t:'inn', tx:'E as duas acham que estão contando a mesma coisa.' },

{ t:'nar', tx:'Antoniette voltou ao quarto e tirou o papel de baixo do forro pela última vez para conferir.' },
{ t:'nar', tx:'Estava tudo lá. Datas, horários, o que funciona e o que não funciona.' },
{ t:'pause' },
{ t:'nar', tx:'Ela dobrou o papel e o guardou no bolso interno, onde ele ia ficar até o dia.' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Cinco anos em Velha Nidhaus.', line2:'Faltam dez dias.',
  chapter:'capitulo9' },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.CHAPTER9; }
