/* ==========================================================================
   ARQUIVO RABENFELS - js/data/epilogue.js
   EPILOGO: "O Que Ficou"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.
   Tipos de beat documentados em js/engine.js.

   QUANDO: seis anos depois de Velha Nidhaus. Lervel.
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
   O QUE O TRIBUNAL FEZ COM O ARQUIVO
   ------------------------------------------------------------------
   Em Esperanca e Perda, Matheo fez tudo certo. Protocolou, sustentou,
   levou a tribunal. O tribunal pediu as quatro paginas que faltavam.

   >>> AS QUATRO PAGINAS QUE ELA ARRANCOU ERAM O CASO. <<<

   Sem elas o Arquivo e o relato de uma morta sobre a propria patroa:
   nao ha terceiro lesado, nao ha crime, ha uma familia e os costumes
   dela. Antoniette tirou aquelas paginas para que o documento nao
   pudesse ser usado para achar Klara. Foi o ultimo ato de protecao
   dela, e foi ele que matou o processo.

   Matheo nunca descobre isso. Ela escreveu, em P10: "Se voce chegar
   ate elas, vai entender por que. Se nao chegar, melhor."
   Ele nao chegou. Melhor, entao.

   Cobertura chega truncada antes desse problema: faltam plantas,
   horarios e o fim do trabalho. Resposta chega com as 291 paginas.
   Ali nao falta prova nem folha. Faltam nomes. O tribunal chama a
   autoria de falecida enquanto Antoniette trabalha dois andares abaixo.

   ------------------------------------------------------------------
   A ARMADILHA DE PAPEL
   ------------------------------------------------------------------
   A familia nao registra nada - tres seculos quase sem rastro fora de
   Velha Nidhaus (biblia, "A bolha e a anomalia"). Matheo, que e
   arquivista antes de qualquer outra coisa, deixou o sobrenome em
   alerta permanente na Ordem no ano em que o material entrou no arquivo.

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
   Quatro fechos sobre a mesma matricula. (Compor, nao multiplicar.)

   1. O PARECER. Cada rota entrega ao tribunal um documento diferente.
   2. O CURSO DE KLARA, lido de 'taught'. Seis anos depois, numa ficha
      administrativa, aparece o que Antoniette ensinou. Em 'taught:A'
      Matheo reconhece a disciplina, porque e a dele - foi ele que
      ensinou aquilo a Antoniette. O circulo se fecha num formulario.
   3. O QUE ELE ANOTA no fim, lido de 'promised'.
   4. O QUE FICOU DE ANTONIETTE, lido de 'rota'.

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
   E1 - O PARECER
   O documento que cada rota produziu encontra a mesma formula por um
   motivo diferente.
   ====================================================================== */
{ t:'scene', id:'ep_seis_anos', chapter:'epilogo', title:'O parecer',
  bg:'bg_prologue_room', bgm:'bgm_epilogo' },
{ t:'fade_in' },
{ t:'spr', ch:'matheo', ex:'neutral', pos:'center' },

/* Esperanca: 287 paginas. */
{ t:'nar', tx:'Em mar\u00e7o do segundo ano o tribunal da Marca pediu as quatro p\u00e1ginas que faltavam.', if:{ rota:'esperanca' } },
{ t:'nar', tx:'Ele explicou que n\u00e3o as tinha. Explicou por escrito, tr\u00eas vezes, em tr\u00eas formatos diferentes.', if:{ rota:'esperanca' } },
{ t:'pause', if:{ rota:'esperanca' } },
{ t:'nar', tx:'O parecer veio em duas linhas. Ele decorou as duas sem querer.', if:{ rota:'esperanca' } },
{ t:'arc', key:'lervel', label:'\u2014 tribunal da Marca \u2014', lns:[
    '"Relato singular, de autoria falecida, sem terceiro lesado identific\u00e1vel."',
    '"Sem elemento externo, a mat\u00e9ria pertence ao foro dom\u00e9stico da casa."'
], if:{ rota:'esperanca' } },
{ t:'pause', if:{ rota:'esperanca' } },
{ t:'inn', tx:'Sem terceiro lesado.', if:{ rota:'esperanca' } },
{ t:'nar', tx:'As quatro p\u00e1ginas davam nome aos terceiros. Ele n\u00e3o sabia o que havia nelas.', if:{ rota:'esperanca' } },
{ t:'inn', tx:'Ela escreveu que, se eu chegasse at\u00e9 elas, entenderia.', if:{ rota:'esperanca' } },
{ t:'inn', tx:'Eu n\u00e3o cheguei.', if:{ rota:'esperanca' } },
{ t:'nar', tx:'Ele recorreu duas vezes. A segunda foi indeferida no ano quatro.', if:{ rota:'esperanca' } },

/* Perda: as mesmas quatro folhas, e uma ultima pagina que fecha a conta. */
{ t:'nar', tx:'Em mar\u00e7o do segundo ano o tribunal da Marca pediu as quatro p\u00e1ginas que faltavam.', if:{ rota:'perda' } },
{ t:'nar', tx:'Ele explicou que n\u00e3o as tinha. Explicou por escrito, tr\u00eas vezes, em tr\u00eas formatos diferentes.', if:{ rota:'perda' } },
{ t:'pause', if:{ rota:'perda' } },
{ t:'nar', tx:'O parecer veio em duas linhas. Ele decorou as duas sem querer.', if:{ rota:'perda' } },
{ t:'arc', key:'lervel', label:'\u2014 tribunal da Marca \u2014', lns:[
    '"Relato singular, de autoria falecida, sem terceiro lesado identific\u00e1vel."',
    '"Sem elemento externo, a mat\u00e9ria pertence ao foro dom\u00e9stico da casa."'
], if:{ rota:'perda' } },
{ t:'pause', if:{ rota:'perda' } },
{ t:'inn', tx:'Sem terceiro lesado.', if:{ rota:'perda' } },
{ t:'nar', tx:'As quatro p\u00e1ginas davam nome aos terceiros. Ele n\u00e3o sabia o que havia nelas.', if:{ rota:'perda' } },
{ t:'inn', tx:'Ela escreveu que, se eu chegasse at\u00e9 elas, entenderia.', if:{ rota:'perda' } },
{ t:'inn', tx:'Eu n\u00e3o cheguei.', if:{ rota:'perda' } },
{ t:'nar', tx:'Ele recorreu duas vezes. A segunda foi indeferida no ano quatro.', if:{ rota:'perda' } },

/* Resposta: 291 paginas. A ausencia esta dentro do texto. */
{ t:'nar', tx:'O material entrou no tribunal em quatro meses e saiu em nove.', if:{ rota:'resposta' } },
{ t:'nar', tx:'Tinha duzentas e noventa e uma p\u00e1ginas. A numera\u00e7\u00e3o fechava.', if:{ rota:'resposta' } },
{ t:'pause', if:{ rota:'resposta' } },
{ t:'arc', key:'lervel', label:'\u2014 tribunal da Marca \u00b7 decis\u00e3o \u2014', lns:[
    '"Relato singular, de autoria falecida, completo e de proced\u00eancia verificada."',
    '"Julga-se improcedente por aus\u00eancia de terceiro lesado."'
], if:{ rota:'resposta' } },
{ t:'pause', if:{ rota:'resposta' } },
{ t:'inn', tx:'Autoria falecida.', if:{ rota:'resposta' } },
{ t:'nar', tx:'A autora trabalhava dois andares abaixo. O parecer ficou como veio.', if:{ rota:'resposta' } },
{ t:'inn', tx:'Sem terceiro lesado.', if:{ rota:'resposta' } },
{ t:'nar', tx:'Todos estavam nas p\u00e1ginas. Sujeito. Fonte. Empregado. Nenhum nome.', if:{ rota:'resposta' } },
{ t:'nar', tx:'Matheo n\u00e3o recorreu. O enquadramento estava correto.', if:{ rota:'resposta' } },

/* Cobertura: o trabalho termina antes de fechar. */
{ t:'nar', tx:'O material chegou com duzentas e quarenta e uma p\u00e1ginas.', if:{ rota:'cobertura' } },
{ t:'nar', tx:'Faltavam plantas, hor\u00e1rios e tudo o que viria depois de julho. A numera\u00e7\u00e3o fechava mesmo assim.', if:{ rota:'cobertura' } },
{ t:'pause', if:{ rota:'cobertura' } },
{ t:'arc', key:'lervel', label:'\u2014 tribunal da Marca \u2014', lns:[
    '"Relato singular, de autoria falecida, sem terceiro lesado identific\u00e1vel."',
    '"Material insuficiente para instru\u00e7\u00e3o."'
], if:{ rota:'cobertura' } },
{ t:'pause', if:{ rota:'cobertura' } },
{ t:'inn', tx:'Sem terceiro lesado.', if:{ rota:'cobertura' } },
{ t:'nar', tx:'O tribunal n\u00e3o pediu as quatro p\u00e1ginas. N\u00e3o chegou a precisar delas.', if:{ rota:'cobertura' } },

{ t:'spr', ch:'matheo', ex:'hollow', pos:'center' },
{ t:'nar', tx:'Depois do parecer ele continuou trabalhando. Era o que havia para fazer com o dia.' },

/* ======================================================================
   E2 - O ALERTA
   A armadilha de papel. Ele montou uma e esqueceu que tinha montado.
   ====================================================================== */
{ t:'scene', id:'ep_alerta', chapter:'epilogo', title:'O alerta',
  bg:'bg_prologue_room' },
{ t:'spr', ch:'matheo', ex:'read', pos:'center' },

{ t:'nar', tx:'No m\u00eas em que o material de Nidhaus entrou no arquivo central, ele fez uma coisa pequena e administrativa.' },
{ t:'nar', tx:'Deixou o sobrenome em alerta permanente no cadastro geral da Ordem.' },
{ t:'pause' },
{ t:'inn', tx:'Uma fam\u00edlia que n\u00e3o registra nada em tr\u00eas s\u00e9culos.' },
{ t:'inn', tx:'Se aparecer em papel algum dia, eu quero saber no mesmo dia.' },
{ t:'pause' },

{ t:'nar', tx:'Depois esqueceu. O alerta ficou no cadastro, sem prazo de expira\u00e7\u00e3o.' },
{ t:'pause' },
{ t:'sfx', id:'sfx_package' },
{ t:'nar', tx:'O alerta disparou numa ter\u00e7a de maio, seis anos depois, \u00e0s quatro e vinte da tarde.' },
{ t:'nar', tx:'Veio numa folha de aviso comum, do mesmo ma\u00e7o que a Ordem usa para mudan\u00e7a de endere\u00e7o.' },
{ t:'pause' },
{ t:'nar', tx:'Ele leu o sobrenome de p\u00e9, ainda com o casaco.' },

/* ======================================================================
   E3 - O CADASTRO
   A divergencia unica: quantos nomes. E o curso de Klara, que e a
   digital de Antoniette num formulario, seis anos depois da passagem por
   Nidhaus. Em Resposta, Antoniette continua viva.
   ====================================================================== */
{ t:'scene', id:'ep_cadastro', chapter:'epilogo', title:'O cadastro',
  bg:'bg_archive_closeup' },

{ t:'nar', tx:'Era uma c\u00f3pia de registro de matr\u00edcula da Academia de Eldoria, ano letivo corrente.' },
{ t:'sfx', id:'sfx_page_turn' },
{ t:'pause' },

/* Klara sobrevive nas quatro rotas. O cadastro traz duas linhas em
   todas elas. A diferenca esta em quem continua viva para receber a
   mesma folha. */
{ t:'nar', tx:'Duas linhas, mesmo sobrenome, mesma casa de origem, mesma turma.' },
{ t:'pause' },

{ t:'arc', key:'cadastro', label:'\u2014 Academia de Eldoria \u00b7 matr\u00edcula \u2014', lns:[
    'RABENFELS, Liara. Dezoito anos. Velha Nidhaus, Marca Cinzenta.',
    'Curso: mana aplicada. Ingresso por exame, primeira coloca\u00e7\u00e3o.'
]},
{ t:'pause' },

{ t:'nar', tx:'Ele parou na express\u00e3o "primeira coloca\u00e7\u00e3o". A unha do polegar marcou a margem.' },
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

{ t:'nar', tx:'Ele tirou o Arquivo da terceira gaveta, onde ficava desde o indeferimento.', if:{ rota:'esperanca' } },
{ t:'nar', tx:'Ele tirou o Arquivo da terceira gaveta, onde ficava desde o indeferimento.', if:{ rota:'perda' } },
{ t:'nar', tx:'Ele tirou o Arquivo da terceira gaveta, onde ficava desde o indeferimento.', if:{ rota:'cobertura' } },
{ t:'nar', tx:'Ele pediu ao arquivo central a c\u00f3pia de consulta do Livro-Raz\u00e3o. A ficha de empr\u00e9stimo veio presa \u00e0 contracapa.', if:{ rota:'resposta' } },
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
{ t:'nar', tx:'A luz atravessou a p\u00e1gina at\u00e9 tocar a asa. Ele continuava com o dedo ao lado dela.' },

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
{ t:'nar', tx:'Assinou, datou, p\u00f4s na bandeja de sa\u00edda.' },
{ t:'pause' },

{ t:'nar', tx:'Fechou o Arquivo. Conferiu as quatro voltas do cordel e refez o n\u00f3.', if:{ rota:'esperanca' } },
{ t:'nar', tx:'Guardou na terceira gaveta.', if:{ rota:'esperanca' } },
{ t:'nar', tx:'Fechou o Arquivo. Conferiu as quatro voltas do cordel e refez o n\u00f3.', if:{ rota:'perda' } },
{ t:'nar', tx:'Guardou na terceira gaveta.', if:{ rota:'perda' } },
{ t:'nar', tx:'Fechou o Arquivo. Conferiu as quatro voltas do cordel e refez o n\u00f3.', if:{ rota:'cobertura' } },
{ t:'nar', tx:'Guardou na terceira gaveta.', if:{ rota:'cobertura' } },
{ t:'nar', tx:'Fechou o Livro-Raz\u00e3o, assinou a devolu\u00e7\u00e3o e deixou o volume na bandeja do arquivo central.', if:{ rota:'resposta' } },
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
   Quatro fechamentos, um por leitura. Em tres ela esta morta e a ficha
   diz tres palavras. Em uma ela esta viva, e o tribunal declarou
   "autoria falecida" sobre alguem que respira.
   ====================================================================== */
{ t:'fade_out' },
{ t:'scene', id:'ep_oque_ficou', chapter:'epilogo', title:'O que ficou',
  bg:'bg_prologue_room', bgm:null },

/* --- ESPERANCA: ela morre, e chegou mais longe que qualquer uma ------ */
{ t:'nar', tx:'A ficha de pessoal dela chegou de Velha Nidhaus em nove dias, certificada.', if:{ rota:'esperanca' } },
{ t:'arc', key:'ficha', label:'\u2014 Velha Nidhaus \u00b7 livro de pessoal \u2014', lns:[
    'VAEL, Antoniette. Baixa: agosto, ano cinco.',
    '',
    'Motivo de sa\u00fade.'
], if:{ rota:'esperanca' } },
{ t:'inn', tx:'Eu j\u00e1 li esta linha.', if:{ rota:'esperanca' } },
{ t:'inn', tx:'Numa outra ficha, com outro nome, uma semana antes de assinar a dela.', if:{ rota:'esperanca' } },
{ t:'nar', tx:'Ele p\u00f4s as duas folhas lado a lado. A caligrafia era a mesma, com trinta e sete anos de diferen\u00e7a.', if:{ rota:'esperanca' } },
{ t:'nar', tx:'Depois virou as duas para baixo, uma em cima da outra.', if:{ rota:'esperanca' } },
{ t:'pause', if:{ rota:'esperanca' } },
{ t:'nar', tx:'Ela chegou at\u00e9 a floresta. \u00c9 mais longe do que qualquer outra pessoa chegou em cinco s\u00e9culos, e ningu\u00e9m nunca vai saber disso.', if:{ rota:'esperanca' } },

/* --- RESPOSTA: ela vive, e o documento serviu para arquivar ---------- */
{ t:'nar', tx:'Ele nunca pediu a ficha de pessoal dela, porque n\u00e3o havia baixa nenhuma para pedir.', if:{ rota:'resposta' } },
{ t:'pause', if:{ rota:'resposta' } },
{ t:'nar', tx:'O material dela entrou no tribunal em quatro meses e saiu em nove, julgado improcedente por aus\u00eancia de terceiro lesado.', if:{ rota:'resposta' } },
{ t:'nar', tx:'N\u00e3o faltou prova. Faltou parte.', if:{ rota:'resposta' } },
{ t:'pause', if:{ rota:'resposta' } },
{ t:'nar', tx:'Matheo leu a decis\u00e3o no ano seis e concordou com o enquadramento, porque o enquadramento estava correto.', if:{ rota:'resposta' } },
{ t:'pause', if:{ rota:'resposta' } },
{ t:'nar', tx:'A folha de aviso da Academia chegou seis anos depois disso, e ele a leu como boa not\u00edcia.', if:{ rota:'resposta' } },
{ t:'inn', tx:'Duas linhas. As duas entraram.', if:{ rota:'resposta' } },
{ t:'pause', if:{ rota:'resposta' } },
{ t:'nar', tx:'A sala de Antoniette ficava dois andares abaixo daquele gabinete, e ela leu a mesma folha na segunda-feira seguinte, por dever de of\u00edcio.', if:{ rota:'resposta' } },
{ t:'nar', tx:'Anotou a data de ingresso na entrada 251 e fechou o caderno.', if:{ rota:'resposta' } },

/* --- PERDA: ela morre, e a soma fecha ------------------------------- */
{ t:'nar', tx:'A ficha de pessoal dela chegou de Velha Nidhaus em nove dias, certificada.', if:{ rota:'perda' } },
{ t:'arc', key:'ficha', label:'\u2014 Velha Nidhaus \u00b7 livro de pessoal \u2014', lns:[
    'VAEL, Antoniette. Baixa: agosto, ano cinco.',
    '',
    'Motivo de sa\u00fade.'
], if:{ rota:'perda' } },
{ t:'pause', if:{ rota:'perda' } },
{ t:'nar', tx:'A \u00faltima p\u00e1gina do Arquivo \u00e9 uma coluna de tr\u00eas valores, com data ao lado de cada um.', if:{ rota:'perda' } },
{ t:'nar', tx:'Matheo conferiu a subtra\u00e7\u00e3o, porque ele confere toda subtra\u00e7\u00e3o. Fechava.', if:{ rota:'perda' } },
{ t:'pause', if:{ rota:'perda' } },
{ t:'nar', tx:'Embaixo do total havia uma linha em que ela julgava a si mesma, e era a \u00fanica do documento inteiro.', if:{ rota:'perda' } },
{ t:'pause', if:{ rota:'perda' } },
{ t:'nar', tx:'Ele ficou com a folha na m\u00e3o sem saber o que se faz com uma conta que fecha.', if:{ rota:'perda' } },
{ t:'pause', if:{ rota:'perda' } },
{ t:'nar', tx:'Seis anos depois, o cadastro trouxe duas linhas, e ele n\u00e3o voltou \u00e0 p\u00e1gina duzentos e oitenta e sete para conferir de novo.', if:{ rota:'perda' } },

/* --- COBERTURA: Carmine a mata antes da porta ------------------------ */
{ t:'nar', tx:'Duzentas e quarenta e uma p\u00e1ginas. Ele contou, como conta tudo, e a numera\u00e7\u00e3o fechava.', if:{ rota:'cobertura' } },
{ t:'nar', tx:'Faltava metade das plantas e todos os hor\u00e1rios de guarda depois de julho, e nada disso estava marcado como falta.', if:{ rota:'cobertura' } },
{ t:'pause', if:{ rota:'cobertura' } },
{ t:'nar', tx:'O tribunal indeferiu em quatro meses, e n\u00e3o precisou nem das quatro p\u00e1ginas.', if:{ rota:'cobertura' } },
{ t:'pause', if:{ rota:'cobertura' } },
{ t:'nar', tx:'A p\u00e1gina duzentos e quarenta e um terminava com a data escrita na margem do livro de sa\u00edda.', if:{ rota:'cobertura' } },
{ t:'inn', tx:'Ela achou a linha antes de morrer.', if:{ rota:'cobertura' } },
{ t:'pause', if:{ rota:'cobertura' } },
{ t:'nar', tx:'A ficha de pessoal e o caderno davam a mesma data.', if:{ rota:'cobertura' } },
{ t:'nar', tx:'Nenhum dos dois dizia que Carmine estava diante da porta.', if:{ rota:'cobertura' } },

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
  time:'Fim.', if:{ rota:'esperanca' } },
{ t:'title', main:'ARQUIVO RABENFELS',
  sub:'"As duas foram sobre m\u00e9todo."',
  time:'Fim.', if:{ rota:'resposta' } },
{ t:'title', main:'ARQUIVO RABENFELS',
  sub:'"O erro \u00e9 do Compilador e a data dele \u00e9 maio."',
  time:'Fim.', if:{ rota:'perda' } },
{ t:'title', main:'ARQUIVO RABENFELS',
  sub:'"A linha estava correta."',
  time:'Fim.', if:{ rota:'cobertura' } },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.EPILOGUE; }
