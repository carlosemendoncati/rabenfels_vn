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

{ t:'chap', num:'EPÍLOGO', name:'O QUE FICOU', chapter:'epilogo' },
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
{ t:'nar', tx:'Em março do segundo ano o tribunal da Marca pediu as quatro páginas que faltavam.', if:{ rota:'esperanca' } },
{ t:'nar', tx:'Ele explicou que não as tinha. Explicou por escrito, três vezes, em três formatos diferentes.', if:{ rota:'esperanca' } },
{ t:'pause', if:{ rota:'esperanca' } },
{ t:'nar', tx:'O parecer veio em duas linhas. Ele decorou as duas sem querer.', if:{ rota:'esperanca' } },
{ t:'arc', key:'lervel', label:'— tribunal da Marca —', lns:[
    '"Relato singular, de autoria falecida, sem terceiro lesado identificável."',
    '"Sem elemento externo, a matéria pertence ao foro doméstico da casa."'
], if:{ rota:'esperanca' } },
{ t:'pause', if:{ rota:'esperanca' } },
{ t:'inn', tx:'Sem terceiro lesado.', if:{ rota:'esperanca' } },
{ t:'nar', tx:'As quatro páginas davam nome aos terceiros. Ele não sabia o que havia nelas.', if:{ rota:'esperanca' } },
{ t:'inn', tx:'Ela escreveu que, se eu chegasse até elas, entenderia.', if:{ rota:'esperanca' } },
{ t:'inn', tx:'Eu não cheguei.', if:{ rota:'esperanca' } },
{ t:'nar', tx:'Ele recorreu duas vezes. A segunda foi indeferida no ano quatro.', if:{ rota:'esperanca' } },

/* Perda: as mesmas quatro folhas, e uma ultima pagina que fecha a conta. */
{ t:'nar', tx:'Em março do segundo ano o tribunal da Marca pediu as quatro páginas que faltavam.', if:{ rota:'perda' } },
{ t:'nar', tx:'Ele explicou que não as tinha. Explicou por escrito, três vezes, em três formatos diferentes.', if:{ rota:'perda' } },
{ t:'pause', if:{ rota:'perda' } },
{ t:'nar', tx:'O parecer veio em duas linhas. Ele decorou as duas sem querer.', if:{ rota:'perda' } },
{ t:'arc', key:'lervel', label:'— tribunal da Marca —', lns:[
    '"Relato singular, de autoria falecida, sem terceiro lesado identificável."',
    '"Sem elemento externo, a matéria pertence ao foro doméstico da casa."'
], if:{ rota:'perda' } },
{ t:'pause', if:{ rota:'perda' } },
{ t:'inn', tx:'Sem terceiro lesado.', if:{ rota:'perda' } },
{ t:'nar', tx:'As quatro páginas davam nome aos terceiros. Ele não sabia o que havia nelas.', if:{ rota:'perda' } },
{ t:'inn', tx:'Ela escreveu que, se eu chegasse até elas, entenderia.', if:{ rota:'perda' } },
{ t:'inn', tx:'Eu não cheguei.', if:{ rota:'perda' } },
{ t:'nar', tx:'Ele recorreu duas vezes. A segunda foi indeferida no ano quatro.', if:{ rota:'perda' } },

/* Resposta: 291 paginas. A ausencia esta dentro do texto. */
{ t:'nar', tx:'O material entrou no tribunal em quatro meses e saiu em nove.', if:{ rota:'resposta' } },
{ t:'nar', tx:'Tinha duzentas e noventa e uma páginas. A numeração fechava.', if:{ rota:'resposta' } },
{ t:'pause', if:{ rota:'resposta' } },
{ t:'arc', key:'lervel', label:'— tribunal da Marca · decisão —', lns:[
    '"Relato singular, de autoria falecida, completo e de procedência verificada."',
    '"Julga-se improcedente por ausência de terceiro lesado."'
], if:{ rota:'resposta' } },
{ t:'pause', if:{ rota:'resposta' } },
{ t:'inn', tx:'Autoria falecida.', if:{ rota:'resposta' } },
{ t:'nar', tx:'A autora trabalhava dois andares abaixo. O parecer ficou como veio.', if:{ rota:'resposta' } },
{ t:'inn', tx:'Sem terceiro lesado.', if:{ rota:'resposta' } },
{ t:'nar', tx:'Todos estavam nas páginas. Sujeito. Fonte. Empregado. Nenhum nome.', if:{ rota:'resposta' } },
{ t:'nar', tx:'Matheo não recorreu. O enquadramento estava correto.', if:{ rota:'resposta' } },

/* Cobertura: o trabalho termina antes de fechar. */
{ t:'nar', tx:'O material chegou com duzentas e quarenta e uma páginas.', if:{ rota:'cobertura' } },
{ t:'nar', tx:'Faltavam plantas, horários e tudo o que viria depois de julho. A numeração fechava mesmo assim.', if:{ rota:'cobertura' } },
{ t:'pause', if:{ rota:'cobertura' } },
{ t:'arc', key:'lervel', label:'— tribunal da Marca —', lns:[
    '"Relato singular, de autoria falecida, sem terceiro lesado identificável."',
    '"Material insuficiente para instrução."'
], if:{ rota:'cobertura' } },
{ t:'pause', if:{ rota:'cobertura' } },
{ t:'inn', tx:'Sem terceiro lesado.', if:{ rota:'cobertura' } },
{ t:'nar', tx:'O tribunal não pediu as quatro páginas. Não chegou a precisar delas.', if:{ rota:'cobertura' } },

{ t:'spr', ch:'matheo', ex:'hollow', pos:'center' },

/* ----------------------------------------------------------------
   A FILA

   Sem condicao: as quatro leituras passam por aqui. Matheo nao e um
   escriba qualquer que recebeu um pacote - foi ele que colocou
   Antoniette dentro do oficio, catorze anos antes, por causa de um
   carimbo que so ela viu.

   Ela conta esta mesma cena na estrada, no Capitulo 11, e nao diz o
   nome dele: \"Ele e da Ordem. Eu nao falo de gente da Ordem com
   quem nao e.\" Quem fecha a conta e ele, aqui, com ela morta.

   O texto nao comenta. Enumera, que e como este homem pensa.
   ---------------------------------------------------------------- */
{ t:'pause' },
{ t:'nar', tx:'Ele tinha conhecido a autora do relato numa fila de cartório, em Alsbeck, quando ela tinha dezessete anos.' },
{ t:'nar', tx:'Ela reparou que o escriturário da frente estava com o carimbo errado. Ninguém mais na fila reparou, e ele estava na fila havia meia hora.' },
{ t:'pause' },
{ t:'nar', tx:'Perguntou o nome dela e não disse o dele.' },
{ t:'nar', tx:'Escreveu o endereço da Academia num papel de balcão e pagou a inscrição do exame, que a Ordem manda pagar e ninguém paga.' },
{ t:'pause' },
{ t:'nar', tx:'Não a ensinou. Apontou uma porta e voltou para Lervel, e não acompanhou o resultado.' },
{ t:'pause' },
{ t:'inn', tx:'Ela entrou por mim.' },
{ t:'pause' },
{ t:'nar', tx:'Oito anos entre o papel de balcão e o parecer.' },
{ t:'nar', tx:'Ele escreveu os dois.' },
{ t:'pause' },

{ t:'nar', tx:'Depois do parecer ele continuou trabalhando. Era o que havia para fazer com o dia.' },

/* ======================================================================
   E2 - O ALERTA
   A armadilha de papel. Ele montou uma e esqueceu que tinha montado.
   ====================================================================== */
{ t:'scene', id:'ep_alerta', chapter:'epilogo', title:'O alerta',
  bg:'bg_prologue_room' },
{ t:'spr', ch:'matheo', ex:'read', pos:'center' },

{ t:'nar', tx:'No mês em que o material de Nidhaus entrou no arquivo central, ele fez uma coisa pequena e administrativa.' },
{ t:'nar', tx:'Deixou o sobrenome em alerta permanente no cadastro geral da Ordem.' },
{ t:'pause' },
{ t:'inn', tx:'Uma família que não registra nada em três séculos.' },
{ t:'inn', tx:'Se aparecer em papel algum dia, eu quero saber no mesmo dia.' },
{ t:'pause' },

{ t:'nar', tx:'Depois esqueceu. O alerta ficou no cadastro, sem prazo de expiração.' },
{ t:'pause' },
{ t:'sfx', id:'sfx_package' },
{ t:'nar', tx:'O alerta disparou numa terça de maio, seis anos depois, às quatro e vinte da tarde.' },
{ t:'nar', tx:'Veio numa folha de aviso comum, do mesmo maço que a Ordem usa para mudança de endereço.' },
{ t:'pause' },
{ t:'nar', tx:'Ele leu o sobrenome de pé, ainda com o casaco.' },

/* ======================================================================
   E3 - O CADASTRO
   A divergencia unica: quantos nomes. E o curso de Klara, que e a
   digital de Antoniette num formulario, seis anos depois da passagem por
   Nidhaus. Em Resposta, Antoniette continua viva.
   ====================================================================== */
{ t:'scene', id:'ep_cadastro', chapter:'epilogo', title:'O cadastro',
  bg:'bg_archive_closeup' },

{ t:'nar', tx:'Era uma cópia de registro de matrícula da Academia de Eldoria, ano letivo corrente.' },
{ t:'sfx', id:'sfx_page_turn' },
{ t:'pause' },

/* Klara sobrevive nas quatro rotas. O cadastro traz duas linhas em
   todas elas. A diferenca esta em quem continua viva para receber a
   mesma folha. */
{ t:'nar', tx:'Duas linhas, mesmo sobrenome, mesma casa de origem, mesma turma.' },
{ t:'pause' },

{ t:'arc', key:'cadastro', label:'— Academia de Eldoria · matrícula —', lns:[
    'RABENFELS, Liara. Dezoito anos. Velha Nidhaus, Marca Cinzenta.',
    'Curso: mana aplicada. Ingresso por exame, primeira colocação.'
]},
{ t:'pause' },

{ t:'nar', tx:'Ele parou na expressão "primeira colocação". A unha do polegar marcou a margem.' },
{ t:'pause' },

/* --- a segunda linha, e nela a digital de Antoniette --- */
{ t:'arc', key:'cadastro', label:'— Academia de Eldoria · matrícula —', lns:[
    'RABENFELS, Klara. Dezoito anos. Velha Nidhaus, Marca Cinzenta.',
    'Curso: Registro Comparado e Reconstrução Documental.'
], if:{ taught:'A' } },
{ t:'arc', key:'cadastro', label:'— Academia de Eldoria · matrícula —', lns:[
    'RABENFELS, Klara. Dezoito anos. Velha Nidhaus, Marca Cinzenta.',
    'Curso: protocolo e direito das casas maiores.'
], if:{ taught:'B' } },
{ t:'arc', key:'cadastro', label:'— Academia de Eldoria · matrícula —', lns:[
    'RABENFELS, Klara. Dezoito anos. Velha Nidhaus, Marca Cinzenta.',
    'Curso: geografia e línguas do norte.'
], if:{ taught:'C' } },

{ t:'pause', if:{ taught:'A' } },
{ t:'nar', tx:'Ele leu o curso duas vezes.', if:{ taught:'A' } },
{ t:'inn', tx:'É o meu.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'nar', tx:'Ele deu aquela cadeira por nove anos. Largou quando entrou para a Ordem.', if:{ taught:'A' } },
{ t:'nar', tx:'A matéria ficou. Ele nunca soube quem passou por ela.', if:{ taught:'A' } },

/* ======================================================================
   O QUE ELE FAZ EM VEZ DE PASSAR ADIANTE

   Estava escrito "achou coincidencia bonita e passou adiante". Escriba
   nao passa adiante: confere. E conferir e a unica coisa que este homem
   sabe fazer bem.
   ====================================================================== */
{ t:'pause', if:{ taught:'A' } },
{ t:'nar', tx:'Ele não passou adiante. Pediu o histórico da disciplina, que é público e ninguém pede.', if:{ taught:'A' } },
{ t:'nar', tx:'Quem respondeu foi o professor Halvern, que ocupa a cadeira agora.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'arc', key:'cadastro', label:'— Academia de Eldoria · histórico da disciplina —', lns:[
    'Registro Comparado e Reconstrução Documental. Trinta e um anos.',
    'Aprovações com menção: duas.'
], if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'nar', tx:'Uma das duas estava morta havia seis anos, por parecer que ele mesmo assinara sem ler até o fim.', if:{ taught:'A' } },
{ t:'nar', tx:'A outra tinha dezoito anos e morava em Velha Nidhaus.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'inn', tx:'Duas em trinta e um anos, e as duas saem da mesma casa.', if:{ taught:'A' } },

{ t:'pause', if:{ taught:'A' } },
{ t:'nar', tx:'Junto do histórico veio uma folha que ele não tinha pedido.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'arc', key:'cadastro', label:'— anexo, de próprio punho —', lns:[
    'Escrevi à senhorita Rabenfels há oito anos e nunca tive resposta.',
    'Se o senhor tiver o endereço dela, eu agradeço. H. Halvern.'
], if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'inn', tx:'Ele tem o endereço.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'nar', tx:'Respondeu no mesmo dia, em quatro linhas. Uma delas era a data da morte.', if:{ taught:'A' } },

{ t:'pause', if:{ taught:'A' } },
{ t:'nar', tx:'Da estrada de Lervel até Eldoria são quatro dias de carruagem. Ele levou onze para decidir e quatro para ir.', if:{ taught:'A' } },

/* ======================================================================
   A AULA

   Os dois falam de metodo porque e a unica lingua que os dois tem, e
   nenhum dos dois sabe o que o outro e.
   ====================================================================== */
{ t:'scene', id:'ep_academia', chapter:'epilogo', title:'Eldoria',
  bg:'bg_library', bgm:'bgm_archive', if:{ taught:'A' } },
{ t:'fade_in', if:{ taught:'A' } },

{ t:'nar', tx:'A sala tinha dezenove lugares e catorze ocupados. Ele ficou de pé no fundo, como visitante da Ordem tem direito de ficar.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center', if:{ taught:'A' } },
{ t:'nar', tx:'Reconheceu a aluna pela postura antes de reconhecer pelo cabelo: sentada reta, as duas mãos na mesa, uma de cada lado do caderno.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'nar', tx:'O exercício do dia era um inventário de casa grande com três erros plantados. Ela achou os três e marcou um quarto.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'nar', tx:'O quarto não era erro. O professor disse isso, e ela não apagou a marca.', if:{ taught:'A' } },

{ t:'pause', if:{ taught:'A' } },
{ t:'nar', tx:'No fim da aula ele perguntou uma coisa, do jeito que examinador pergunta, e sem se apresentar.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'spr', ch:'matheo', ex:'neutral', pos:'left', if:{ taught:'A' } },
{ t:'dial', ch:'matheo', tx:'Por que a senhorita não apagou?', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'dial', ch:'klara', tx:'Porque eu marquei.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'dial', ch:'matheo', tx:'O professor disse que está certo.', if:{ taught:'A' } },
{ t:'dial', ch:'klara', tx:'Disse. Ele é fonte única.', if:{ taught:'A' } },

{ t:'pause', if:{ taught:'A' } },
{ t:'nar', tx:'“Fonte única” está na página nove do manual da cadeira. Foi ele que escreveu o manual.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'dial', ch:'matheo', tx:'E o que a senhorita faz com a marca?', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'dial', ch:'klara', tx:'Deixo. Escrevo o acerto do lado, na mesma tinta.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'dial', ch:'klara', tx:'Riscar ensina a esconder o erro.', if:{ taught:'A' } },

{ t:'pause', if:{ taught:'A' } },
{ t:'nar', tx:'Essa não era dele.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'inn', tx:'Ela não aprendeu isso aqui.', if:{ taught:'A' } },
{ t:'nar', tx:'Ele conferiu o manual naquela noite, na estalagem, página por página. Não estava.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },

{ t:'dial', ch:'matheo', tx:'Quem ensinou isso à senhorita?', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'nar', tx:'Klara levou tempo. Não o tempo de quem não lembra.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'dial', ch:'klara', tx:'Uma pessoa da casa.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'dial', ch:'matheo', tx:'Ela ainda está lá?', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'dial', ch:'klara', tx:'Não.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'nar', tx:'Ela fechou o caderno com as duas mãos e não perguntou quem ele era.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },

/* A moca da fila tambem nao perguntou. Ele reparou nas duas pela
   mesma coisa, com catorze anos de intervalo, e as duas vezes
   confundiu reparar com nao ter consequencia.

   A fila esta contada na cena de abertura, sem condicao. Aqui e
   eco, e eco e o que faz a segunda linha doer. */
{ t:'inn', tx:'A outra também não perguntou.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'inn', tx:'As duas entraram por mim.', if:{ taught:'A' } },
{ t:'nar', tx:'Perguntar seria informação, e ela tinha sido criada numa casa que lê tudo o que entra e sai.', if:{ taught:'A' } },

{ t:'pause', if:{ taught:'A' } },
{ t:'nar', tx:'Matheo tinha o nome dela na pasta e o parecer no bolso. Levou a mão ao bolso e parou ali.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'inn', tx:'Se eu disser o nome, eu digo a esta casa que o nome importa.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'dial', ch:'matheo', tx:'Bom exercício, senhorita.', if:{ taught:'A' } },
{ t:'spr_hide', ch:'matheo', if:{ taught:'A' } },

{ t:'pause', if:{ taught:'A' } },
{ t:'nar', tx:'Na porta ele olhou para trás uma vez.', if:{ taught:'A' } },
{ t:'nar', tx:'Klara tinha reaberto o caderno e estava escrevendo alguma coisa ao lado da marca que não apagou.', if:{ taught:'A' } },
{ t:'spr_hide', ch:'klara', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'fade_out', if:{ taught:'A' } },

{ t:'scene', id:'ep_cadastro_2', chapter:'epilogo', title:'O cadastro',
  bg:'bg_prologue_room', bgm:'bgm_epilogo', if:{ taught:'A' } },
{ t:'fade_in', if:{ taught:'A' } },
{ t:'nar', tx:'Voltou a Lervel em quatro dias e não escreveu relatório da viagem.', if:{ taught:'A' } },
{ t:'nar', tx:'Foi a única vez em dezenove anos de serviço que ele deixou de escrever um.', if:{ taught:'A' } },

{ t:'pause', if:{ taught:'B' } },
{ t:'nar', tx:'Curso de gente que vai administrar casa grande. Ele anotou como escolha de família e passou adiante.', if:{ taught:'B' } },

{ t:'pause', if:{ taught:'C' } },
{ t:'nar', tx:'Curso de gente que pretende sair. Ele reparou nisso e não soube o que fazer com o reparo.', if:{ taught:'C' } },

{ t:'pause' },
{ t:'nar', tx:'No rodapé, a folha trazia a observação de praxe sobre o regime interno.' },
{ t:'arc', key:'cadastro', label:'— Academia de Eldoria · matrícula —', lns:[
    'Residência obrigatória em recinto da Academia durante o ciclo integral.',
    'A Academia responde pelo desenvolvimento do aluno até a titulação.'
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
{ t:'nar', tx:'Ele pediu ao arquivo central a cópia de consulta do Livro-Razão. A ficha de empréstimo veio presa à contracapa.', if:{ rota:'resposta' } },
{ t:'nar', tx:'O couro tinha perdido o cheiro de cavalo. Continuava pesando mais do que devia.' },
{ t:'pause' },

{ t:'nar', tx:'Procurou a entrada das borboletas para conferir uma data e abriu direto na dobra certa, sem contar páginas.' },
{ t:'pause' },
{ t:'nar', tx:'A asa continuava lá. Clara, com uma veia vermelha atravessando.' },
{ t:'nar', tx:'Sete anos colada ao papel e a veia não tinha desbotado.' },
{ t:'pause' },

{ t:'nar', tx:'Ele pôs o dedo ao lado dela, sem tocar.' },
{ t:'pause' },
{ t:'inn', tx:'Ela prensou isto de propósito.' },
{ t:'pause' },
{ t:'inn', tx:'Ela não prensava nada de propósito. Ela transcrevia.' },
{ t:'pause' },
{ t:'nar', tx:'A luz atravessou a página até tocar a asa. Ele continuava com o dedo ao lado dela.' },

{ t:'pause' },
{ t:'nar', tx:'Depois voltou à folha de aviso e escreveu a resposta que a Ordem esperava.' },

/* --- o que ele anota, lido de 'promised' --- */
{ t:'arc', key:'lervel', label:'— M. Drell · resposta ao alerta —', lns:[
    'Nada a apurar. Ingresso regular em instituição de ensino.',
    'Manter o alerta ativo.'
], if:{ promised:'A' } },
{ t:'arc', key:'lervel', label:'— M. Drell · resposta ao alerta —', lns:[
    'Nada a apurar. Ingresso regular em instituição de ensino.',
    'Solicito visita de rotina à Academia dentro do prazo ordinário.'
], if:{ promised:'B' } },
{ t:'arc', key:'lervel', label:'— M. Drell · resposta ao alerta —', lns:[
    'Nada a apurar. Ingresso regular em instituição de ensino.',
    'Solicito informação sobre o calendário de agosto da instituição.'
], if:{ promised:'C' } },

{ t:'pause' },
{ t:'nar', tx:'Assinou, datou, pôs na bandeja de saída.' },
{ t:'pause' },

{ t:'nar', tx:'Fechou o Arquivo. Conferiu as quatro voltas do cordel e refez o nó.', if:{ rota:'esperanca' } },
{ t:'nar', tx:'Guardou na terceira gaveta.', if:{ rota:'esperanca' } },
{ t:'nar', tx:'Fechou o Arquivo. Conferiu as quatro voltas do cordel e refez o nó.', if:{ rota:'perda' } },
{ t:'nar', tx:'Guardou na terceira gaveta.', if:{ rota:'perda' } },
{ t:'nar', tx:'Fechou o Arquivo. Conferiu as quatro voltas do cordel e refez o nó.', if:{ rota:'cobertura' } },
{ t:'nar', tx:'Guardou na terceira gaveta.', if:{ rota:'cobertura' } },
{ t:'nar', tx:'Fechou o Livro-Razão, assinou a devolução e deixou o volume na bandeja do arquivo central.', if:{ rota:'resposta' } },
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
{ t:'arc', key:'ficha', label:'— Velha Nidhaus · livro de pessoal —', lns:[
    'VAEL, Antoniette. Baixa: agosto, ano cinco.',
    '',
    'Motivo de saúde.'
], if:{ rota:'esperanca' } },
{ t:'inn', tx:'Eu já li esta linha.', if:{ rota:'esperanca' } },
{ t:'inn', tx:'Numa outra ficha, com outro nome, uma semana antes de assinar a dela.', if:{ rota:'esperanca' } },
{ t:'nar', tx:'Ele pôs as duas folhas lado a lado. A caligrafia era a mesma, com trinta e sete anos de diferença.', if:{ rota:'esperanca' } },
{ t:'nar', tx:'Depois virou as duas para baixo, uma em cima da outra.', if:{ rota:'esperanca' } },
{ t:'pause', if:{ rota:'esperanca' } },
{ t:'nar', tx:'Ela chegou até a floresta. É mais longe do que qualquer outra pessoa chegou em cinco séculos, e ninguém nunca vai saber disso.', if:{ rota:'esperanca' } },

/* --- RESPOSTA: ela vive, e o documento serviu para arquivar ---------- */
{ t:'nar', tx:'Ele nunca pediu a ficha de pessoal dela, porque não havia baixa nenhuma para pedir.', if:{ rota:'resposta' } },
{ t:'pause', if:{ rota:'resposta' } },
{ t:'nar', tx:'O material dela entrou no tribunal em quatro meses e saiu em nove, julgado improcedente por ausência de terceiro lesado.', if:{ rota:'resposta' } },
{ t:'nar', tx:'Não faltou prova. Faltou parte.', if:{ rota:'resposta' } },
{ t:'pause', if:{ rota:'resposta' } },
{ t:'nar', tx:'Matheo leu a decisão no ano seis e concordou com o enquadramento, porque o enquadramento estava correto.', if:{ rota:'resposta' } },
{ t:'pause', if:{ rota:'resposta' } },
{ t:'nar', tx:'A folha de aviso da Academia chegou seis anos depois disso, e ele a leu como boa notícia.', if:{ rota:'resposta' } },
{ t:'inn', tx:'Duas linhas. As duas entraram.', if:{ rota:'resposta' } },
{ t:'pause', if:{ rota:'resposta' } },
{ t:'nar', tx:'A sala de Antoniette ficava dois andares abaixo daquele gabinete, e ela leu a mesma folha na segunda-feira seguinte, por dever de ofício.', if:{ rota:'resposta' } },
{ t:'nar', tx:'Anotou a data de ingresso na entrada 251 e fechou o caderno.', if:{ rota:'resposta' } },

/* --- PERDA: ela morre, e a soma fecha ------------------------------- */
{ t:'nar', tx:'A ficha de pessoal dela chegou de Velha Nidhaus em nove dias, certificada.', if:{ rota:'perda' } },
{ t:'arc', key:'ficha', label:'— Velha Nidhaus · livro de pessoal —', lns:[
    'VAEL, Antoniette. Baixa: agosto, ano cinco.',
    '',
    'Motivo de saúde.'
], if:{ rota:'perda' } },
{ t:'pause', if:{ rota:'perda' } },
{ t:'nar', tx:'A última página do Arquivo é uma coluna de três valores, com data ao lado de cada um.', if:{ rota:'perda' } },
{ t:'nar', tx:'Matheo conferiu a subtração, porque ele confere toda subtração. Fechava.', if:{ rota:'perda' } },
{ t:'pause', if:{ rota:'perda' } },
{ t:'nar', tx:'Embaixo do total havia uma linha em que ela julgava a si mesma, e era a única do documento inteiro.', if:{ rota:'perda' } },
{ t:'pause', if:{ rota:'perda' } },
{ t:'nar', tx:'Ele ficou com a folha na mão sem saber o que se faz com uma conta que fecha.', if:{ rota:'perda' } },
{ t:'pause', if:{ rota:'perda' } },
{ t:'nar', tx:'Seis anos depois, o cadastro trouxe duas linhas, e ele não voltou à página duzentos e oitenta e sete para conferir de novo.', if:{ rota:'perda' } },

/* --- COBERTURA: Carmine a mata antes da porta ------------------------ */
{ t:'nar', tx:'Duzentas e quarenta e uma páginas. Ele contou, como conta tudo, e a numeração fechava.', if:{ rota:'cobertura' } },
{ t:'nar', tx:'Faltava metade das plantas e todos os horários de guarda depois de julho, e nada disso estava marcado como falta.', if:{ rota:'cobertura' } },
{ t:'pause', if:{ rota:'cobertura' } },
{ t:'nar', tx:'O tribunal indeferiu em quatro meses, e não precisou nem das quatro páginas.', if:{ rota:'cobertura' } },
{ t:'pause', if:{ rota:'cobertura' } },
{ t:'nar', tx:'A página duzentos e quarenta e um terminava com a data escrita na margem do livro de saída.', if:{ rota:'cobertura' } },
{ t:'inn', tx:'Ela achou a linha antes de morrer.', if:{ rota:'cobertura' } },
{ t:'pause', if:{ rota:'cobertura' } },
{ t:'nar', tx:'A ficha de pessoal e o caderno davam a mesma data.', if:{ rota:'cobertura' } },
{ t:'nar', tx:'Nenhum dos dois dizia que Carmine estava diante da porta.', if:{ rota:'cobertura' } },

{ t:'fade_out' },
{ t:'scene', id:'ep_cantiga', chapter:'epilogo', title:'A cantiga',
  bg:'bg_black', bgm:null },

{ t:'pause' },
{ t:'arc', key:'balada', label:'— cantiga da Marca —', lns:[
    'Cantai, cantai, as filhas do pacto,',
    'uma nasce casulo, uma nasce intacta,',
    'cantai, cantai, o ciclo que não para,',
    'a que dorme na casca, a que sai pela clara,',
    '',
    'cantai, cantai, e não perguntai nada,',
    'que as duas vão juntas pela mesma estrada,',
    'uma leva a outra e nenhuma repara,',
    'cantai, cantai, o ciclo que não para.'
]},
{ t:'pause' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Seis anos depois de Velha Nidhaus.', line2:'Duas matrículas, mesma turma.',
  chapter:'epilogo', completes:true },

{ t:'title', main:'ARQUIVO RABENFELS',
  sub:'"Vá mais rápido do que eu fui."',
  time:'Fim.', if:{ rota:'esperanca' } },
{ t:'title', main:'ARQUIVO RABENFELS',
  sub:'"As duas foram sobre método."',
  time:'Fim.', if:{ rota:'resposta' } },
{ t:'title', main:'ARQUIVO RABENFELS',
  sub:'"O erro é do Compilador e a data dele é maio."',
  time:'Fim.', if:{ rota:'perda' } },
{ t:'title', main:'ARQUIVO RABENFELS',
  sub:'"A linha estava correta."',
  time:'Fim.', if:{ rota:'cobertura' } },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.EPILOGUE; }
