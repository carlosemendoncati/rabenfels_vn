/* ==========================================================================
   ARQUIVO RABENFELS - js/data/epilogue.js
   EPILOGO: "O Que Ficou"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.
   Tipos de beat documentados em js/engine.js.

   QUANDO: seis anos depois do pacote chegar. Lervel.
   As gemeas fazem dezoito. Matheo esta velho de um jeito que ele nao
   registra.

   O PENSAMENTO UNICO DESTE CAPITULO (Zinsser, unidade):
   "Ele conseguiu o documento e o documento nao serviu."

   ------------------------------------------------------------------
   O SALTO
   ------------------------------------------------------------------
   E o unico salto longo da obra, e precisa ser longo por regra de
   canon: a Academia de Eldoria e ensino superior e so aceita depois
   da maioridade. Nao existe matricula Rabenfels noventa e tres dias
   depois; existe seis anos depois. O Epilogo espera o tempo que a
   tragedia leva para virar papel.

   ------------------------------------------------------------------
   O QUE ELE FEZ COM O ARQUIVO, E POR QUE NAO BASTOU
   ------------------------------------------------------------------
   Ele fez tudo certo. Protocolou, sustentou, levou a tribunal.
   O tribunal pediu as quatro paginas que faltavam.

   >>> AS QUATRO PAGINAS QUE ELA ARRANCOU ERAM O CASO. <<<

   Sem elas o Arquivo e o relato de uma morta sobre a propria patroa:
   nao ha terceiro lesado, nao ha crime, ha uma familia e os costumes
   dela. Antoniette tirou aquelas paginas para que o documento nao
   pudesse ser usado para achar Klara. Foi o ultimo ato de protecao
   dela, e foi ele que matou o processo.

   Matheo nunca descobre isso. Ela escreveu, em P10: "Se voce chegar
   ate elas, vai entender por que. Se nao chegar, melhor."
   Ele nao chegou. Melhor, entao.

   ------------------------------------------------------------------
   A ARMADILHA DE PAPEL
   ------------------------------------------------------------------
   A familia nao registra nada - tres seculos quase sem rastro fora de
   Velha Nidhaus (biblia, "A bolha e a anomalia"). Matheo, que e
   arquivista antes de qualquer outra coisa, deixou o sobrenome em
   alerta permanente na Ordem no ano em que recebeu o pacote.

   A armadilha demorou seis anos para disparar, e quando disparou
   trouxe a coisa mais inofensiva que existe: duas meninas entrando
   na faculdade.

   >>> O CADASTRO E A COLHEITA. <<<
   A Academia e o melhor lugar do mundo para levar alguem ao apice da
   mana, e a entidade so colhe no apice. O documento que finalmente
   vem a tona e a confirmacao de que o cronograma esta funcionando, e
   Matheo le como boa noticia.

   ------------------------------------------------------------------
   O QUE RAMIFICA
   ------------------------------------------------------------------
   Uma divergencia real e duas texturas, e nada mais. (Compor, nao
   multiplicar.)

   1. QUANTOS NOMES. Na rota 'early' Klara foi levada em agosto do ano
      cinco: o cadastro tem UM nome. Nas outras tres tem dois.
   2. O CURSO DE KLARA, lido de 'taught'. Seis anos depois, numa ficha
      administrativa, aparece o que Antoniette ensinou. Em 'taught:A'
      Matheo reconhece a disciplina, porque e a dele - foi ele que
      ensinou aquilo a Antoniette. O circulo se fecha num formulario.
   3. O QUE ELE ANOTA no fim, lido de 'promised'.

   ------------------------------------------------------------------
   REGRAS QUE VALEM ATE A ULTIMA LINHA
   ------------------------------------------------------------------
   - Matheo NAO entende o que esta lendo. Nenhum beat pode deixa-lo
     concluir certo. Ele fecha o registro achando que nao era nada.
   - As palavras mae, filha e amor continuam proibidas.
   - Carmine nao aparece, nao e citada, nao e sugerida. A obra fecha
     sem ela em cena, que e como ela funciona.
   - A asa prensada do Prologo (P3) volta e continua sem explicacao.
     Matheo nao sabe o que ela significa e o texto nao conta.

   ------------------------------------------------------------------
   A BALADA - terceiro e ultimo momento (biblia, Parte VII)
   ------------------------------------------------------------------
   Completa, sobre preto, sem imagem e sem sprite. As duas primeiras
   aparicoes (Cap. 1, tres versos; Cap. 7, quatro) foram fragmentos.
   Aqui ela fecha, e o verso que faltava e o unico que nomeia o
   destino das duas.

   Cinco quadros: E1 seis anos, E2 o alerta, E3 o cadastro,
   E4 a asa, E5 a cantiga.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {

RBF.EPILOGUE = [

{ t:'chap', num:'EP\u00cdLOGO', name:'O QUE FICOU', chapter:'epilogo' },
{ t:'fade_out' },

/* ======================================================================
   E1 - SEIS ANOS
   O que ele fez, em ordem, sem lamento. O tribunal pediu as quatro
   paginas. Ele nao tinha as quatro paginas.
   ====================================================================== */
{ t:'scene', id:'ep_seis_anos', chapter:'epilogo', title:'Seis anos',
  bg:'bg_prologue_room', bgm:'bgm_epilogo' },
{ t:'fade_in' },
{ t:'spr', ch:'matheo', ex:'neutral', pos:'center' },

{ t:'nar', tx:'Ele protocolou o Arquivo em janeiro, dois meses depois de receb\u00ea-lo.' },
{ t:'nar', tx:'Levou duzentas e oitenta e sete p\u00e1ginas numeradas e uma declara\u00e7\u00e3o de proced\u00eancia assinada por ele.' },
{ t:'pause' },

{ t:'nar', tx:'A Ordem abriu inqu\u00e9rito em abril. O tribunal da Marca aceitou a mat\u00e9ria em outubro.' },
{ t:'nar', tx:'Em mar\u00e7o do ano seguinte pediram as quatro p\u00e1ginas que faltavam.' },
{ t:'pause' },
{ t:'nar', tx:'Ele explicou que n\u00e3o as tinha. Explicou por escrito, tr\u00eas vezes, em tr\u00eas formatos diferentes.' },
{ t:'pause' },

{ t:'nar', tx:'O parecer veio em duas linhas e ele decorou as duas sem querer.' },
{ t:'arc', key:'lervel', label:'\u2014 tribunal da Marca \u2014', lns:[
    '"Relato singular, de autoria falecida, sem terceiro lesado identific\u00e1vel."',
    '"Sem elemento externo, a mat\u00e9ria pertence ao foro dom\u00e9stico da casa."'
]},
{ t:'pause' },

{ t:'inn', tx:'Sem terceiro lesado.' },
{ t:'pause' },
{ t:'nar', tx:'Ele leu aquilo como f\u00f3rmula de cart\u00f3rio, que era o que era.' },
{ t:'nar', tx:'N\u00e3o tinha como saber que as quatro p\u00e1ginas eram exatamente os terceiros, um por p\u00e1gina, contados por ela em voz alta enquanto arrancava.' },
{ t:'pause' },

{ t:'inn', tx:'Ela escreveu que se eu chegasse at\u00e9 elas eu ia entender por qu\u00ea.' },
{ t:'inn', tx:'Eu n\u00e3o cheguei.' },
{ t:'pause' },
{ t:'nar', tx:'Ele recorreu duas vezes. A segunda foi indeferida no ano quatro.' },
{ t:'spr', ch:'matheo', ex:'hollow', pos:'center' },
{ t:'nar', tx:'Depois disso ele parou de recorrer e continuou trabalhando, porque era o que havia para fazer com o dia.' },

/* ======================================================================
   E2 - O ALERTA
   A armadilha de papel. Ele montou uma e esqueceu que tinha montado.
   ====================================================================== */
{ t:'scene', id:'ep_alerta', chapter:'epilogo', title:'O alerta',
  bg:'bg_prologue_room' },
{ t:'spr', ch:'matheo', ex:'read', pos:'center' },

{ t:'nar', tx:'No m\u00eas em que recebeu o pacote ele fez uma coisa pequena e administrativa.' },
{ t:'nar', tx:'Deixou o sobrenome em alerta permanente no cadastro geral da Ordem.' },
{ t:'pause' },
{ t:'inn', tx:'Uma fam\u00edlia que n\u00e3o registra nada em tr\u00eas s\u00e9culos.' },
{ t:'inn', tx:'Se aparecer em papel algum dia, eu quero saber no mesmo dia.' },
{ t:'pause' },

{ t:'nar', tx:'Depois esqueceu, do jeito que se esquece um prego numa parede.' },
{ t:'pause' },
{ t:'sfx', id:'sfx_package' },
{ t:'nar', tx:'O alerta disparou numa ter\u00e7a de maio, seis anos depois, \u00e0s quatro e vinte da tarde.' },
{ t:'nar', tx:'Veio numa folha de aviso comum, do mesmo ma\u00e7o que a Ordem usa para mudan\u00e7a de endere\u00e7o.' },
{ t:'pause' },
{ t:'nar', tx:'Ele leu o sobrenome de p\u00e9, ainda com o casaco.' },

/* ======================================================================
   E3 - O CADASTRO
   A divergencia unica: quantos nomes. E o curso de Klara, que e a
   digital de Antoniette num formulario, seis anos depois da morte dela.
   ====================================================================== */
{ t:'scene', id:'ep_cadastro', chapter:'epilogo', title:'O cadastro',
  bg:'bg_archive_closeup' },

{ t:'nar', tx:'Era uma c\u00f3pia de registro de matr\u00edcula da Academia de Eldoria, ano letivo corrente.' },
{ t:'sfx', id:'sfx_page_turn' },
{ t:'pause' },

/* --- tres rotas: as duas irmas --- */
{ t:'nar', tx:'Duas linhas, mesmo sobrenome, mesma casa de origem, mesma turma.', if:{ ending:'archive' } },
{ t:'nar', tx:'Duas linhas, mesmo sobrenome, mesma casa de origem, mesma turma.', if:{ ending:'distance' } },
{ t:'nar', tx:'Duas linhas, mesmo sobrenome, mesma casa de origem, mesma turma.', if:{ ending:'cover_burned' } },

/* --- rota early: Klara foi levada no ano cinco --- */
{ t:'nar', tx:'Uma linha.', if:{ ending:'early' } },
{ t:'pause', if:{ ending:'early' } },
{ t:'nar', tx:'Ele conferiu a folha inteira, virou, conferiu o verso e voltou \u00e0 frente.', if:{ ending:'early' } },
{ t:'nar', tx:'Uma linha.', if:{ ending:'early' } },
{ t:'pause' },

{ t:'arc', key:'cadastro', label:'\u2014 Academia de Eldoria \u00b7 matr\u00edcula \u2014', lns:[
    'RABENFELS, Liara. Dezoito anos. Velha Nidhaus, Marca Cinzenta.',
    'Curso: mana aplicada. Ingresso por exame, primeira coloca\u00e7\u00e3o.'
]},
{ t:'pause' },

{ t:'nar', tx:'Ele parou na express\u00e3o "primeira coloca\u00e7\u00e3o" e n\u00e3o soube por que aquilo apertou.' },
{ t:'pause' },

/* --- a segunda linha, e nela a digital de Antoniette --- */
{ t:'arc', key:'cadastro', label:'\u2014 Academia de Eldoria \u00b7 matr\u00edcula \u2014', lns:[
    'RABENFELS, Klara. Dezoito anos. Velha Nidhaus, Marca Cinzenta.',
    'Curso: registro e verifica\u00e7\u00e3o de fontes.'
], if:{ taught:'A' } },
{ t:'arc', key:'cadastro', label:'\u2014 Academia de Eldoria \u00b7 matr\u00edcula \u2014', lns:[
    'RABENFELS, Klara. Dezoito anos. Velha Nidhaus, Marca Cinzenta.',
    'Curso: protocolo e direito das casas maiores.'
], if:{ taught:'B' } },
{ t:'arc', key:'cadastro', label:'\u2014 Academia de Eldoria \u00b7 matr\u00edcula \u2014', lns:[
    'RABENFELS, Klara. Dezoito anos. Velha Nidhaus, Marca Cinzenta.',
    'Curso: geografia e l\u00ednguas do norte.'
], if:{ taught:'C' } },

{ t:'pause', if:{ taught:'A' } },
{ t:'nar', tx:'Ele leu o curso duas vezes.', if:{ taught:'A' } },
{ t:'inn', tx:'\u00c9 o meu.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'nar', tx:'Ele tinha ensinado aquela disciplina uma vez na vida, a uma escritur\u00e1ria de vinte e dois anos, em Lervel, num inverno.', if:{ taught:'A' } },
{ t:'nar', tx:'Achou coincid\u00eancia bonita e passou adiante.', if:{ taught:'A' } },

{ t:'pause', if:{ taught:'B' } },
{ t:'nar', tx:'Curso de gente que vai administrar casa grande. Ele anotou como escolha de fam\u00edlia e passou adiante.', if:{ taught:'B' } },

{ t:'pause', if:{ taught:'C' } },
{ t:'nar', tx:'Curso de gente que pretende sair. Ele reparou nisso e n\u00e3o soube o que fazer com o reparo.', if:{ taught:'C' } },

{ t:'pause' },
{ t:'nar', tx:'No rodap\u00e9, a folha trazia a observa\u00e7\u00e3o de praxe sobre o regime interno.' },
{ t:'arc', key:'cadastro', label:'\u2014 Academia de Eldoria \u00b7 matr\u00edcula \u2014', lns:[
    'Resid\u00eancia obrigat\u00f3ria em recinto da Academia durante o ciclo integral.',
    'A Academia responde pelo desenvolvimento do aluno at\u00e9 a titula\u00e7\u00e3o.'
]},
{ t:'pause' },
{ t:'nar', tx:'Ele leu a linha inteira sem entender que estava lendo um cronograma.' },

/* ======================================================================
   E4 - A ASA
   O vestigio fisico plantado em P3 volta, e continua sem explicacao.
   ====================================================================== */
{ t:'scene', id:'ep_asa', chapter:'epilogo', title:'A asa',
  bg:'bg_prologue_room' },
{ t:'spr', ch:'matheo', ex:'read', pos:'center' },

{ t:'nar', tx:'Ele tirou o Arquivo da terceira gaveta, onde ficava desde o indeferimento.' },
{ t:'nar', tx:'O couro tinha perdido o cheiro de cavalo. Continuava pesando mais do que devia.' },
{ t:'pause' },

{ t:'nar', tx:'Procurou a entrada das borboletas para conferir uma data e abriu direto na dobra certa, sem contar p\u00e1ginas.' },
{ t:'pause' },
{ t:'nar', tx:'A asa continuava l\u00e1. Clara, com uma veia vermelha atravessando.' },
{ t:'nar', tx:'Sete anos colada ao papel e a veia n\u00e3o tinha desbotado.' },
{ t:'pause' },

{ t:'nar', tx:'Ele p\u00f4s o dedo ao lado dela, sem tocar.' },
{ t:'pause' },
{ t:'inn', tx:'Ela prensou isto de prop\u00f3sito.' },
{ t:'pause' },
{ t:'inn', tx:'Ela n\u00e3o prensava nada de prop\u00f3sito. Ela transcrevia.' },
{ t:'pause' },
{ t:'nar', tx:'Ficou um tempo com a p\u00e1gina aberta e n\u00e3o chegou a lugar nenhum, porque n\u00e3o havia lugar nenhum para chegar com uma asa.' },

{ t:'pause' },
{ t:'nar', tx:'Depois voltou \u00e0 folha de aviso e escreveu a resposta que a Ordem esperava.' },

/* --- o que ele anota, lido de 'promised' --- */
{ t:'arc', key:'lervel', label:'\u2014 M. Drell \u00b7 resposta ao alerta \u2014', lns:[
    'Nada a apurar. Ingresso regular em institui\u00e7\u00e3o de ensino.',
    'Manter o alerta ativo.'
], if:{ promised:'A' } },
{ t:'arc', key:'lervel', label:'\u2014 M. Drell \u00b7 resposta ao alerta \u2014', lns:[
    'Nada a apurar. Ingresso regular em institui\u00e7\u00e3o de ensino.',
    'Solicito visita de rotina \u00e0 Academia dentro do prazo ordin\u00e1rio.'
], if:{ promised:'B' } },
{ t:'arc', key:'lervel', label:'\u2014 M. Drell \u00b7 resposta ao alerta \u2014', lns:[
    'Nada a apurar. Ingresso regular em institui\u00e7\u00e3o de ensino.',
    'Solicito informa\u00e7\u00e3o sobre o calend\u00e1rio de agosto da institui\u00e7\u00e3o.'
], if:{ promised:'C' } },

{ t:'pause' },
{ t:'nar', tx:'Assinou, datou e p\u00f4s na bandeja de sa\u00edda.' },
{ t:'pause' },

{ t:'nar', tx:'Fechou o Arquivo. Amarrou o cordel em quatro voltas, do jeito que ele tinha vindo.' },
{ t:'nar', tx:'Guardou na terceira gaveta.' },
{ t:'pause' },
{ t:'nar', tx:'Levantou.' },
{ t:'pause' },

{ t:'spr', ch:'matheo', ex:'hollow', pos:'center' },
{ t:'nar', tx:'Na janela ainda havia luz de maio, e ele reparou que era uma boa tarde.' },
{ t:'pause' },
{ t:'nar', tx:'Era.' },
{ t:'spr_hide', ch:'matheo' },

/* ======================================================================
   E5 - A CANTIGA
   Terceiro e ultimo momento da balada. Sobre preto, sem imagem, sem
   sprite. O verso que faltava fecha as duas irmas na mesma linha.
   ====================================================================== */
/* ======================================================================
   E4b - O QUE FICOU DE CADA UMA
   Quatro fechamentos, um por leitura. Em duas ela esta morta e a ficha
   diz tres palavras. Em duas ela esta viva, e o tribunal declarou
   "autoria falecida" sobre alguem que respira.
   ====================================================================== */
{ t:'fade_out' },
{ t:'scene', id:'ep_oque_ficou', chapter:'epilogo', title:'O que ficou',
  bg:'bg_prologue_room', bgm:null },

/* --- ARCHIVE --------------------------------------------------------- */
{ t:'nar', tx:'A ficha de pessoal dela chegou de Velha Nidhaus em nove dias, certificada.', if:{ ending:'archive' } },
{ t:'arc', key:'ficha', label:'\u2014 Velha Nidhaus \u00b7 livro de pessoal \u2014', lns:[
    'VAEL, Antoniette. Baixa: agosto, ano cinco.',
    '',
    'Motivo de sa\u00fade.'
], if:{ ending:'archive' } },
{ t:'inn', tx:'Eu j\u00e1 li esta linha.', if:{ ending:'archive' } },
{ t:'inn', tx:'Numa outra ficha, com outro nome, uma semana antes de assinar a dela.', if:{ ending:'archive' } },
{ t:'nar', tx:'Ele p\u00f4s as duas folhas lado a lado. A caligrafia era a mesma, com trinta e sete anos de diferen\u00e7a.', if:{ ending:'archive' } },
{ t:'nar', tx:'Depois virou as duas para baixo, uma em cima da outra.', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },
{ t:'nar', tx:'Ela chegou at\u00e9 a floresta. \u00c9 mais longe do que qualquer outra pessoa chegou em cinco s\u00e9culos, e ningu\u00e9m nunca vai saber disso.', if:{ ending:'archive' } },

/* --- EARLY ----------------------------------------------------------- */
{ t:'nar', tx:'A ficha de pessoal dela chegou de Velha Nidhaus em nove dias, com a baixa em agosto.', if:{ ending:'early' } },
{ t:'arc', key:'ficha', label:'\u2014 Velha Nidhaus \u00b7 livro de pessoal \u2014', lns:[
    'VAEL, Antoniette. Baixa: agosto, ano cinco.',
    '',
    'Motivo de sa\u00fade.'
], if:{ ending:'early' } },
{ t:'inn', tx:'Eu j\u00e1 li esta linha.', if:{ ending:'early' } },
{ t:'pause', if:{ ending:'early' } },
{ t:'nar', tx:'Na mesma remessa veio a baixa de uma das filhas da casa, com a mesma data e a mesma f\u00f3rmula.', if:{ ending:'early' } },
{ t:'nar', tx:'Ele leu as duas e n\u00e3o juntou as duas. Ningu\u00e9m junta duas fichas de pessoal e uma crian\u00e7a.', if:{ ending:'early' } },
{ t:'pause', if:{ ending:'early' } },
{ t:'nar', tx:'O cadastro da Academia, seis anos depois, viria com uma linha s\u00f3.', if:{ ending:'early' } },

/* --- DISTANCE: ela esta viva ---------------------------------------- */
{ t:'nar', tx:'Ele nunca pediu a ficha de pessoal dela, porque n\u00e3o havia baixa nenhuma para pedir.', if:{ ending:'distance' } },
{ t:'pause', if:{ ending:'distance' } },
{ t:'nar', tx:'Antoniette Vael foi recolhida do campo em setembro do ano cinco e reconduzida ao servi\u00e7o interno em Lervel.', if:{ ending:'distance' } },
{ t:'nar', tx:'Correspond\u00eancia particular suspensa por prazo indeterminado, conforme o protocolo de agente recolhido.', if:{ ending:'distance' } },
{ t:'pause', if:{ ending:'distance' } },
{ t:'nar', tx:'O tribunal declarou a mat\u00e9ria de autoria falecida porque foi o que o pacote parecia, e ningu\u00e9m conferiu.', if:{ ending:'distance' } },
{ t:'pause', if:{ ending:'distance' } },
{ t:'nar', tx:'Ela trabalhava a tr\u00eas ruas do gabinete dele, e os dois passaram seis anos assim.', if:{ ending:'distance' } },
{ t:'inn', tx:'Ele achou que ela tinha morrido.', if:{ ending:'distance' } },
{ t:'inn', tx:'Ela deixou ele achar, porque a alternativa era explicar por que voltou sem a menina.', if:{ ending:'distance' } },

/* --- COVER_BURNED: ela esta viva ------------------------------------ */
{ t:'nar', tx:'Duzentas e quarenta e uma p\u00e1ginas. Ele contou, como conta tudo, e a numera\u00e7\u00e3o fechava.', if:{ ending:'cover_burned' } },
{ t:'nar', tx:'Faltava metade das plantas e todos os hor\u00e1rios de guarda depois de julho, e nada disso estava marcado como falta.', if:{ ending:'cover_burned' } },
{ t:'pause', if:{ ending:'cover_burned' } },
{ t:'nar', tx:'O tribunal indeferiu em quatro meses, e n\u00e3o precisou nem das quatro p\u00e1ginas.', if:{ ending:'cover_burned' } },
{ t:'pause', if:{ ending:'cover_burned' } },
{ t:'nar', tx:'Antoniette Vael deixou Velha Nidhaus em setembro do ano cinco com carta de refer\u00eancia correta e dois meses de aviso pagos.', if:{ ending:'cover_burned' } },
{ t:'nar', tx:'Nunca voltou a Lervel e nunca escreveu a ele.', if:{ ending:'cover_burned' } },
{ t:'pause', if:{ ending:'cover_burned' } },
{ t:'inn', tx:'Se ela estivesse viva ela teria escrito.', if:{ ending:'cover_burned' } },
{ t:'nar', tx:'Foi a \u00fanica conclus\u00e3o que ele tirou em seis anos, e estava errada.', if:{ ending:'cover_burned' } },

{ t:'fade_out' },
{ t:'scene', id:'ep_cantiga', chapter:'epilogo', title:'A cantiga',
  bg:'bg_black', bgm:null },

{ t:'pause' },
{ t:'arc', key:'balada', label:'\u2014 cantiga da Marca \u2014', lns:[
    'Cantai, cantai, as filhas do pacto,',
    'uma nasce casulo, uma nasce intacta,',
    'cantai, cantai, o ciclo que n\u00e3o para,',
    'a que dorme na casca, a que sai pela clara,',
    '',
    'cantai, cantai, e n\u00e3o perguntai nada,',
    'que as duas v\u00e3o juntas pela mesma estrada,',
    'uma leva a outra e nenhuma repara,',
    'cantai, cantai, o ciclo que n\u00e3o para.'
]},
{ t:'pause' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Seis anos depois de Velha Nidhaus.', line2:'Duas matr\u00edculas, mesma turma.',
  chapter:'epilogo', completes:true },

{ t:'title', main:'ARQUIVO RABENFELS',
  sub:'"V\u00e1 mais r\u00e1pido do que eu fui."',
  time:'Fim.', if:{ ending:'archive' } },
{ t:'title', main:'ARQUIVO RABENFELS',
  sub:'"O devagar n\u00e3o foi o que custou."',
  time:'Fim.', if:{ ending:'early' } },
{ t:'title', main:'ARQUIVO RABENFELS',
  sub:'"Ela deixou ele achar."',
  time:'Fim.', if:{ ending:'distance' } },
{ t:'title', main:'ARQUIVO RABENFELS',
  sub:'"Ele precisa abrir."',
  time:'Fim.', if:{ ending:'cover_burned' } },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.EPILOGUE; }
