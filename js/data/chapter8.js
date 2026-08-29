/* ==========================================================================
   ARQUIVO RABENFELS - js/data/chapter8.js
   CAPITULO 8: "O Que Ela Nao Deveria Saber"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.

   QUANDO: Ano 4, outubro. Klara e Liara tem onze anos.

   O PENSAMENTO UNICO (Zinsser, unidade):
   "Ela descobriu o cronograma, e outra pessoa pagou por isso no lugar
   dela."

   A TROCA (docs/biblia_narrativa_rabenfels.md):
   Ela ganha o cronograma da casa.
   Entrega OUTRA PESSOA. Primeira vez que o custo cai sobre terceiro.

   TRES REVELACOES CAEM AQUI. E a maior carga de informacao da obra.
   - 9  a antecessora: a escriba de Lervel, 37 anos antes
   - 11 o cronograma depende do APICE, nao da idade
   - 8  Serafina sabe quem Antoniette e, e sabe ha tempo
   NAO PODE VAZAR: o nome Carmine (nunca), a Academia como engorda
   (o jogador monta sozinho no Epilogo), a traicao do Cap. 11.

   A AGENDA DE FENN COBRA AQUI.
   Plantada no Capitulo 1 ("vinte palavras para um cavalo, nove para mim")
   e declarada no Capitulo 4 ("meu filho tem catorze anos e quer ir
   embora daqui"). Agora ele tem dezessete e Fenn precisa de dinheiro.

   "TONI" - o apelido aparece UMA VEZ na obra inteira, e e aqui.
   Liara diz de passagem, dentro da fala em que menciona a Academia pela
   primeira vez. Ninguem em cena percebe nenhuma das duas coisas.
   NAO COMENTAR NENHUMA DAS DUAS.

   O SENTIDO CONTRARIO (canon 26/07/2026):
   Alguem de fora quase nomeia o que Antoniette virou para a menina.
   E Dara, em meia linha. Antoniette responde com um dado tecnico e
   encerra. ELA NAO NEGA: CATALOGA.
   PROIBIDO: as palavras mae, filha e amor.

   LE 'taught' (Cap. 6): o que Klara pede muda conforme o que aprendeu.
   LE 'lied_to_order' (Cap. 7): Matheo desconfia, ou nao.

   OFICIO APLICADO:
   - A casa nao pune: absorve. Mesmo registro do Capitulo 5.
   - O detalhe errado, sem reacao declarada.
   - A opcao de 'hope' cai na posicao 3. Posicoes usadas: 2,1,3,2,1,-,2.
     Ordem de exibicao: B A C.

   Contrato: 'third_paid', 'knows_predecessor' e 'fenn_debt' nao mudam
   de nome.

   Oito cenas: C1 a cocheira, C2 o que Fenn vende, C3 o cronograma,
   C4 a Academia, C5 o pedido de Klara, C6 Serafina, C7 escolha,
   C8 quem pagou.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

/* --------------------------------------------------------------------------
   ESCOLHA - QUEM ELA PROTEGE
   Nenhuma opcao salva as tres coisas. Escolher e escolher o que perder.
   -------------------------------------------------------------------------- */

var C8_PROTEGE_B = [
  { t:'nar', tx:'Ela usou. Levou o nome da escriba ao livro de pessoal e cruzou com as datas da parede.' },
  { t:'nar', tx:'Levou quatro noites e fechou.' },
  { t:'pause' },
  { t:'inn', tx:'Agora eu tenho um caso.' },

  { t:'nar', tx:'Onze dias depois, Fenn foi transferido para a cocheira em tempo integral.' },
  { t:'nar', tx:'Não foi demitido. Não houve conversa. O uniforme dele passou a ser outro.' },
  { t:'pause' },
  { t:'nar', tx:'Ele deixou de entrar na casa. Deixou de ter chave. Deixou de responder pela casa.' },
  { t:'inn', tx:'Vinte e nove anos de serviço e a palavra dele valia mais que a de qualquer criado daqui.' },
  { t:'inn', tx:'Ninguém precisou dizer por quê.' },
  { t:'pause' },
  { t:'nar', tx:'Ela cruzou com ele no pátio três vezes naquele mês, e nas três ele cumprimentou.' },
  { t:'inn', tx:'A melhor fonte que eu tinha nesta casa, e eu gastei ela em quatro noites.' }
];

var C8_PROTEGE_A = [
  { t:'dial', ch:'antoniette', tx:'Fenn não me disse nada. Eu achei no livro de pessoal, sozinha.' },
  { t:'nar', tx:'Serafina recebeu a frase sem mover o rosto.' },
  { t:'pause' },
  { t:'dial', ch:'serafina', tx:'O livro de pessoal está no meu escritório há quatro anos.' },
  { t:'dial', ch:'antoniette', tx:'Está.' },
  { t:'pause' },
  { t:'dial', ch:'serafina', tx:'Então a senhorita esteve no meu escritório.' },
  { t:'nar', tx:'Serafina deixou a frase entre as duas. Antoniette não pediu uma saída.' },
  { t:'dial', ch:'antoniette', tx:'Estive.' },
  { t:'spr_hide', ch:'serafina' },

  { t:'pause' },
  { t:'nar', tx:'Fenn manteve a chave e o uniforme. Ninguém falou nada com ele.' },
  { t:'nar', tx:'Na semana seguinte o filho dele foi contratado para a cocheira.' },
  { t:'pause' },
  { t:'inn', tx:'Dezessete anos.' },
  { t:'inn', tx:'Entrou de vez.' },
  { t:'pause' },
  { t:'nar', tx:'Fenn a agradeceu numa manhã de novembro, no pátio, de cabeça baixa e em cinco palavras.' },
  { t:'inn', tx:'Foi o pior obrigado que eu já recebi.' }
];

var C8_PROTEGE_C = [
  { t:'dial', ch:'antoniette', tx:'Manda ele hoje. Antes que alguém decida.' },
  { t:'nar', tx:'Fenn fechou a mão no pano e não perguntou por quê.' },
  { t:'dial', ch:'fenn', tx:'Hoje é quarta. A carroça do sal passa às onze.' },
  { t:'dial', ch:'antoniette', tx:'Então às onze.' },
  { t:'pause' },
  { t:'nar', tx:'Ela deu a ele o pagamento de dois trimestres em moeda, embrulhado em pano.' },
  { t:'nar', tx:'Não perguntou o nome da escriba. Não perguntou mais nada.' },

  { t:'pause' },
  { t:'nar', tx:'O rapaz saiu às onze e dez, na carroça do sal, com um saco e o casaco do pai.' },
  { t:'nar', tx:'Fenn ficou.' },
  { t:'pause' },
  { t:'nar', tx:'Continuou respondendo pela casa. Continuou econômico com gente.' },
  { t:'nar', tx:'Parou de falar com os cavalos.' },
  { t:'pause' },
  { t:'inn', tx:'Eu não tenho o nome da escriba e não vou ter.' },
  { t:'inn', tx:'E o rapaz está em algum lugar que não é aqui.' }
];

RBF.CHAPTER8 = [

{ t:'chap', num:'CAPÍTULO 8', name:'O QUE ELA NÃO DEVERIA SABER', chapter:'capitulo8' },
{ t:'fade_out' },

/* ======================================================================
   C1 - A COCHEIRA
   Fenn cobra. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c8_cocheira', chapter:'capitulo8', title:'A cocheira',
  bg:'bg_nidhaus_gate', bgm:'bgm_nidhaus' },
{ t:'fade_in' },

{ t:'nar', tx:'Outubro do quarto ano veio com chuva atravessada e a casa fechou o pátio às cinco.' },
{ t:'nar', tx:'A cocheira cheirava a palha molhada e a couro. Era o único lugar da propriedade onde o cheiro não era de cera.' },
{ t:'nar', tx:'Fenn a esperou na porta da cocheira, o que ele nunca tinha feito.' },
{ t:'pause' },

{ t:'spr', ch:'fenn', ex:'neutral', pos:'left' },
{ t:'dial', ch:'fenn', tx:'A senhorita recebe da Ordem por trimestre ou por ano?' },
{ t:'pause' },
{ t:'nar', tx:'Antoniette parou de tirar a capa.' },
{ t:'inn', tx:'Ele não perguntou se eu recebo da Ordem.' },
{ t:'inn', tx:'Perguntou como.' },

{ t:'dial', ch:'antoniette', tx:'Há quanto tempo o senhor sabe?' },
{ t:'dial', ch:'fenn', tx:'Desde que a senhorita mediu o corredor com os pés, no primeiro dia.' },
{ t:'pause' },
{ t:'dial', ch:'fenn', tx:'Empregada não mede casa. Empregada trabalha na casa que tem.' },

{ t:'nar', tx:'Usou o mesmo tom com que anunciava o jantar. Não havia ameaça nele.' },
{ t:'inn', tx:'Três anos e meio.' },
{ t:'inn', tx:'Ele sabe há três anos e meio e não disse a ninguém.' },
{ t:'pause' },

{ t:'dial', ch:'antoniette', tx:'O que o senhor quer?' },
{ t:'dial', ch:'fenn', tx:'Dois trimestres. Em moeda.' },
{ t:'dial', ch:'antoniette', tx:'Para quê?' },
{ t:'pause' },
{ t:'dial', ch:'fenn', tx:'Meu filho fez dezessete em agosto.' },
{ t:'spr_hide', ch:'fenn' },
{ t:'nar', tx:'E entrou na cocheira, porque tinha o que fazer.' },

/* ======================================================================
   C2 - O QUE FENN VENDE
   REVELACAO 9: a antecessora. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c8_escriba', chapter:'capitulo8', title:'O que ele vende',
  bg:'bg_nidhaus_gate', bgm:null },

{ t:'nar', tx:'Voltou na noite seguinte, com a mesma capa molhada, e ele começou sem cumprimentar.' },
{ t:'spr', ch:'fenn', ex:'neutral', pos:'left' },
{ t:'dial', ch:'fenn', tx:'Trinta e sete anos atrás veio uma mulher de Lervel. Ficou seis meses.' },
{ t:'pause' },
{ t:'inn', tx:'Eu conheço essa linha. Está no dossiê. Partiu por motivo de saúde.' },

{ t:'dial', ch:'fenn', tx:'Meu pai trabalhava aqui. Eu tinha nove anos.' },
{ t:'dial', ch:'fenn', tx:'Ela media as coisas com os pés.' },

{ t:'pause' },
{ t:'nar', tx:'Antoniette ficou parada com a capa na mão.' },
{ t:'pause' },

{ t:'dial', ch:'antoniette', tx:'O que aconteceu com ela?' },
{ t:'dial', ch:'fenn', tx:'Isso eu não sei e não vou inventar.' },
{ t:'pause' },
{ t:'dial', ch:'fenn', tx:'Sei o nome dela. Sei onde está escrito, e não é no livro de pessoal.' },
{ t:'dial', ch:'antoniette', tx:'Onde?' },
{ t:'spr', ch:'fenn', ex:'neutral', pos:'left' },
{ t:'dial', ch:'fenn', tx:'Dois trimestres.' },
{ t:'spr_hide', ch:'fenn' },

{ t:'pause' },
{ t:'inn', tx:'Ele guardou isso a vida inteira e escolheu vender agora.' },
{ t:'inn', tx:'Não porque o preço subiu. Porque o filho fez dezessete.' },

/* ======================================================================
   C3 - O CRONOGRAMA
   REVELACAO 11: depende do apice, nao da idade. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c8_cronograma', chapter:'capitulo8', title:'O cronograma',
  bg:'bg_library_night', bgm:'bgm_archive' },

{ t:'nar', tx:'Ela subiu com a lista das nove datas que tinha copiado da parede da câmara dois anos antes.' },
{ t:'nar', tx:'Cruzou com os registros de família da estante nordeste, que ela já conhecia de cor.' },
{ t:'pause' },

{ t:'inn', tx:'Eu vinha lendo isto como idade. Sempre li como idade.' },
{ t:'nar', tx:'Ela alinhou as nove colunas interrompidas pela data de nascimento de cada par.' },
{ t:'pause' },

{ t:'nar', tx:'Doze anos.' },
{ t:'nar', tx:'Quinze.' },
{ t:'nar', tx:'Onze.' },
{ t:'nar', tx:'Dezesseis.' },
{ t:'pause' },

{ t:'inn', tx:'Não bate. Não tem idade nenhuma em comum.' },
{ t:'nar', tx:'A tinta dos quatro números secou antes de ela virar a régua de lado.' },
{ t:'pause' },

{ t:'nar', tx:'Alinhou pela altura em vez da idade.' },
{ t:'nar', tx:'As nove colunas interrompiam na mesma marca, com dois dedos de diferença entre a mais alta e a mais baixa.' },
{ t:'pause' },

{ t:'inn', tx:'Não é quando ela faz uma idade.' },
{ t:'inn', tx:'É quando ela chega a um ponto.' },
{ t:'pause' },
{ t:'nar', tx:'Ela pousou a régua e ficou com as duas mãos na mesa.' },
{ t:'inn', tx:'E se é um ponto, ele pode ser adiantado.' },
{ t:'pause' },
{ t:'inn', tx:'E se pode ser adiantado, alguém já pensou nisso antes de mim.' },

{ t:'arc', key:'sem_identificacao', label:'— caderno sem identificação —', lns:[
    'Nove interrupções. Idades diferentes, alturas iguais.',
    'O ciclo não conta anos. Conta desenvolvimento.',
    'K. tem onze anos e está a um palmo da marca.',
    'Não tenho cinco anos. Tenho o tempo que ela levar para crescer.'
]},

/* ======================================================================
   C4 - A ACADEMIA
   Liara diz a coisa que mata, e diz "Toni" na mesma fala.
   Ninguem em cena percebe nenhuma das duas. NAO COMENTAR.
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c8_academia', chapter:'capitulo8', title:'O que Liara quer',
  bg:'bg_corridor', bgm:null },

{ t:'nar', tx:'No corredor leste, Liara estava deitada de bruços no chão com três folhas espalhadas.' },
{ t:'spr', ch:'liara', ex:'bright', pos:'right' },
{ t:'dial', ch:'liara', tx:'Toni, tem uma academia que aceita menina.' },
{ t:'pause' },
{ t:'dial', ch:'antoniette', tx:'Escola tem várias.' },
{ t:'dial', ch:'liara', tx:'Não é escola. É academia. De mana, em Eldoria.' },

{ t:'nar', tx:'Ela empurrou a folha pelo chão com dois dedos.' },
{ t:'dial', ch:'liara', tx:'A senhora Elke tem uma prima que foi. Só entra depois da maioridade.' },
{ t:'dial', ch:'liara', tx:'Faltam sete anos para mim. Eu já contei.' },
{ t:'pause' },

{ t:'spr', ch:'klara', ex:'side', pos:'center' },
{ t:'nar', tx:'Klara estava sentada na soleira com um livro fechado no colo e não disse nada.' },
{ t:'dial', ch:'liara', tx:'Papai vai dizer que não.' },
{ t:'dial', ch:'liara', tx:'Mas eu tenho sete anos para ele cansar. Eu ganho do papai. Sempre ganho.' },

{ t:'nar', tx:'E voltou para as folhas, satisfeita com o próprio plano.' },
{ t:'spr_hide', ch:'liara' },
{ t:'spr_hide', ch:'klara' },
{ t:'pause' },

{ t:'nar', tx:'Antoniette catalogou dois volumes naquela tarde e não escreveu nada sobre a conversa.' },

/* ======================================================================
   C5 - O PEDIDO
   Klara pede a coisa impossivel. LE 'taught'. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c8_pedido', chapter:'capitulo8', title:'O pedido',
  bg:'bg_library', bgm:null },

{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'nar', tx:'Klara apareceu na biblioteca à noite, o que ela não fazia havia quatro anos.' },
{ t:'nar', tx:'Ficou de pé do outro lado da mesa em vez de sentar.' },
{ t:'pause' },

/* --- ramo A: o metodo ------------------------------------------------ */
{ t:'dial', ch:'klara', tx:'Eu queria conferir uma coisa com a senhorita.', if:{ taught:'A' } },
{ t:'nar', tx:'Ela pôs sobre a mesa uma folha com três colunas e uma data em cada linha.', if:{ taught:'A' } },
{ t:'dial', ch:'klara', tx:'Outubro, todo ano. Fevereiro, alguns anos. Agosto, todo ano, e o de agosto é diferente.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'dial', ch:'klara', tx:'Está certo?', if:{ taught:'A' } },
{ t:'nar', tx:'Antoniette olhou a folha e reconheceu o próprio método na letra de uma criança de onze anos.', if:{ taught:'A' } },
{ t:'dial', ch:'antoniette', tx:'Está certo.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'dial', ch:'klara', tx:'Então me ensina o que falta.', if:{ taught:'A' } },

/* --- ramo B: a forma ------------------------------------------------- */
{ t:'dial', ch:'klara', tx:'Eu preciso pedir uma coisa e não sei o jeito certo.', if:{ taught:'B' } },
{ t:'dial', ch:'antoniette', tx:'Não tem jeito certo. Tem o pedido.', if:{ taught:'B' } },
{ t:'nar', tx:'A menina endireitou os ombros, contou uma respiração e levantou os olhos.', if:{ taught:'B' } },
{ t:'pause', if:{ taught:'B' } },
{ t:'dial', ch:'klara', tx:'Quando a senhorita for embora daqui, eu queria ir junto.', if:{ taught:'B' } },
{ t:'nar', tx:'Disse aquilo com a postura inteira, sem tremer a voz, olhando no olho pelo tempo exato.', if:{ taught:'B' } },
{ t:'pause', if:{ taught:'B' } },
{ t:'inn', tx:'Ela ensaiou.', if:{ taught:'B' } },

/* --- ramo C: o mundo ------------------------------------------------- */
{ t:'nar', tx:'Ela pôs sobre a mesa um pano dobrado, e dentro havia moeda miúda e um anel de prata.', if:{ taught:'C' } },
{ t:'dial', ch:'klara', tx:'Isso dá para três dias de carruagem?', if:{ taught:'C' } },
{ t:'pause', if:{ taught:'C' } },
{ t:'nar', tx:'Antoniette contou sem tocar. Dava para meio dia, e não em carruagem.', if:{ taught:'C' } },
{ t:'dial', ch:'antoniette', tx:'De onde veio o anel?', if:{ taught:'C' } },
{ t:'dial', ch:'klara', tx:'Era da minha avó. Ninguém procura.', if:{ taught:'C' } },
{ t:'pause', if:{ taught:'C' } },
{ t:'dial', ch:'klara', tx:'Se não der, eu junto mais. Só me diz quanto falta.', if:{ taught:'C' } },

/* --- reconverge ------------------------------------------------------- */
{ t:'pause' },
{ t:'nar', tx:'Antoniette abriu a boca para dizer que não era possível.' },
{ t:'nar', tx:'E ficou com a frase pronta na boca por quatro ou cinco segundos.' },
{ t:'pause' },
{ t:'dial', ch:'antoniette', tx:'Me dá até fevereiro.' },
{ t:'nar', tx:'A menina assentiu uma vez, recolheu o que tinha trazido e subiu.' },
{ t:'spr_hide', ch:'klara' },
{ t:'pause' },
{ t:'inn', tx:'Eu acabei de dar uma data a ela.' },
{ t:'inn', tx:'Uma data é uma promessa com número.' },

/* ======================================================================
   C6 - SERAFINA
   REVELACAO 8: ela sabe, e sabe ha tempo.
   E Dara quase nomeia a outra coisa. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c8_serafina', chapter:'capitulo8', title:'O chá das quatro',
  bg:'bg_main_hall', bgm:'bgm_nidhaus' },

{ t:'spr', ch:'serafina', ex:'direct', pos:'right' },
{ t:'nar', tx:'Serafina a chamou para o chá das quatro pela primeira vez em quatro anos.' },
{ t:'nar', tx:'A sala do lado sul era a única aquecida em outubro, e o chá veio quente demais para beber.' },
{ t:'nar', tx:'Serviu ela mesma, o que significava que não haveria criado na sala.' },
{ t:'pause' },

{ t:'dial', ch:'serafina', tx:'A biblioteca fecha quando?' },
{ t:'dial', ch:'antoniette', tx:'Fevereiro.' },
{ t:'dial', ch:'serafina', tx:'Fevereiro.' },
{ t:'nar', tx:'Serafina repetiu a palavra sem interrogá-la e pousou a colher.' },
{ t:'pause' },

{ t:'spr', ch:'serafina', ex:'smirk', pos:'right' },
{ t:'dial', ch:'serafina', tx:'A senhorita chegou com um contrato de nove meses e ficou três anos e meio.' },
{ t:'dial', ch:'antoniette', tx:'A coleção era maior do que o contrato previa.' },
{ t:'pause' },
{ t:'dial', ch:'serafina', tx:'Era.' },

{ t:'nar', tx:'Ela pousou a xícara sem fazer barulho na louça.' },
{ t:'spr', ch:'serafina', ex:'grave', pos:'right' },
{ t:'dial', ch:'serafina', tx:'Eu escrevi a Lervel no seu segundo mês aqui, para confirmar as referências.' },
{ t:'pause' },
{ t:'dial', ch:'serafina', tx:'Responderam em nove dias, com timbre e selo.' },
{ t:'dial', ch:'serafina', tx:'Nove dias é rápido demais para uma casa que não esperava a pergunta.' },
{ t:'pause' },
{ t:'inn', tx:'Ela sabe desde o segundo mês.' },
{ t:'inn', tx:'E nunca apertou a corrente.' },
{ t:'pause' },
{ t:'inn', tx:'Deixou-me entrar na câmara.' },
{ t:'pause' },
{ t:'inn', tx:'Deixou a menina ocupar a cadeira diante da minha.' },
{ t:'inn', tx:'E agora serve o chá.' },
{ t:'pause' },
{ t:'inn', tx:'Nada disso foi tolerância.' },

{ t:'pause' },
{ t:'inn', tx:'Foi uso.' },
{ t:'inn', tx:'Três anos e quatro meses de uso.' },
{ t:'pause' },

{ t:'dial', ch:'antoniette', tx:'Por que a senhora não me removeu?' },
{ t:'nar', tx:'Serafina girou a xícara até a asa ficar à direita. Só então respondeu.' },
{ t:'spr', ch:'serafina', ex:'neutral', pos:'right' },
{ t:'dial', ch:'serafina', tx:'A senhorita é boa com a menina.' },
{ t:'spr_hide', ch:'serafina' },
{ t:'nar', tx:'E levantou, porque o chá das quatro terminava às cinco.' },

{ t:'pause' },
{ t:'inn', tx:'Ela me deixou ficar porque eu sou útil para a menina.' },
{ t:'inn', tx:'Útil para a menina chegar inteira onde precisa chegar.' },

{ t:'scene', id:'c8_copa', chapter:'capitulo8', title:'A copa',
  bg:'bg_kitchen', bgm:null },
{ t:'spr', ch:'dara', ex:'neutral', pos:'center' },
{ t:'nar', tx:'Na copa, naquela noite, Dara pôs a caneca na frente dela sem que ela pedisse.' },
{ t:'nar', tx:'A copa continuava sendo o único cômodo quente, e continuava cheirando a fermento e a cinza.' },
{ t:'pause' },
{ t:'inn', tx:'Dara nunca pôs uma caneca aqui antes das oito.' },
{ t:'inn', tx:'Agora não tira os olhos do fogo.' },
{ t:'pause' },
{ t:'inn', tx:'A alça está virada para a minha mão direita.' },
{ t:'inn', tx:'Ela lembra com qual mão eu escrevo.' },
{ t:'dial', ch:'dara', tx:'A senhorita devia comer.' },
{ t:'dial', ch:'antoniette', tx:'Eu como.' },
{ t:'pause' },
{ t:'dial', ch:'dara', tx:'A menina come melhor quando a senhorita come.' },

{ t:'nar', tx:'Antoniette levantou os olhos da caneca.' },
{ t:'pause' },
{ t:'dial', ch:'antoniette', tx:'Alteração de apetite em criança dessa idade costuma acompanhar crescimento. É esperado.' },
{ t:'nar', tx:'Dara olhou para ela por dois segundos e voltou para o fogo.' },
{ t:'spr_hide', ch:'dara' },
{ t:'pause' },
{ t:'nar', tx:'Antoniette terminou a caneca e subiu.' },

/* ======================================================================
   C7 - A ESCOLHA
   Ordem de exibicao B A C - a de 'hope' na posicao 3.
   ====================================================================== */
{ t:'scene', id:'c8_escolha', chapter:'capitulo8', title:'Quem ela protege',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'A moeda de dois trimestres estava na gaveta, contada, embrulhada em pano.' },
{ t:'nar', tx:'Manteve o embrulho na palma até a marca do cordel ficar na pele.' },
{ t:'pause' },

{ t:'inn', tx:'Se eu comprar o nome, eu tenho a antecessora e um caso que Lervel não pode ignorar.' },
{ t:'inn', tx:'E Fenn fica com um segredo vendido dentro de uma casa que conta tudo.' },
{ t:'pause' },
{ t:'inn', tx:'Não dá para ficar com as duas coisas.' },

{ t:'cho', id:'cap8_protecao', code:'C-VIII', prompt:'QUEM ELA PROTEGE', opts:[
  { id:'B',
    tx:'A informação. Comprar o nome e usar. É a única prova que ela pode levar a Lervel.',
    flags:{ third_paid:'B', knows_predecessor:true, fenn_debt:'pago' },
    routes:{ answer: 3, loss: 1 },
    then: C8_PROTEGE_B },
  { id:'A',
    tx:'Fenn. Comprar o nome e negar a fonte se alguém perguntar.',
    flags:{ third_paid:'A', knows_predecessor:true, fenn_debt:'pago' },
    routes:{ answer: 1, loss: 2 },
    then: C8_PROTEGE_A },
  { id:'C',
    tx:'O rapaz. Dar a moeda, recusar o nome e mandar o menino embora hoje.',
    flags:{ third_paid:'C', knows_predecessor:false, fenn_debt:'pago' },
    routes:{ hope: 3, loss: 1 },
    then: C8_PROTEGE_C }
]},

/* ======================================================================
   C8 - QUEM PAGOU
   Le 'lied_to_order' do Capitulo 7. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c8_conta', chapter:'capitulo8', title:'Quem pagou',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'A carta de Matheo chegou no fim de novembro, fora do ciclo dos relatórios.' },

{ t:'arc', key:'matheo', label:'— correspondência de campo —', lns:[
    'A. — os seus relatórios encolheram pela metade em quinze meses.',
    'Não peço explicação. Peço que você confira se ainda está fazendo o',
    'trabalho, ou se passou a fazer outro.',
    'Se for o outro, escreva isso e eu arranjo a substituição sem registro.',
    'M.'
], if:{ lied_to_order:'C' } },

{ t:'arc', key:'matheo', label:'— correspondência de campo —', lns:[
    'A. — "sem testemunha direta" foi a primeira frase sua que eu li duas',
    'vezes em oito anos.',
    'Não vou perguntar de novo. Estou anotando a data desta carta.',
    'M.'
], if:{ lied_to_order:'B' } },

{ t:'arc', key:'matheo', label:'— correspondência de campo —', lns:[
    'A. — o relatório de agosto foi o melhor documento que este arquivo',
    'recebeu em vinte anos.',
    'Reduza o contato pessoal. Isto não é conselho.',
    'M.'
], if:{ lied_to_order:'A' } },

{ t:'nar', tx:'Ela leu a carta duas vezes e não respondeu naquela semana.' },
{ t:'pause' },

{ t:'nar', tx:'No fim de dezembro escreveu quatro linhas sobre encadernação e a previsão de fechamento da biblioteca.' },
{ t:'nar', tx:'E acrescentou, no rodapé, uma frase que não tinha campo no formulário.' },

{ t:'arc', key:'caderno', label:'— rodapé do relatório trimestral —', lns:[
    'Solicito manutenção do ponto morto em noventa dias.'
]},

{ t:'pause' },
{ t:'inn', tx:'Ponto morto é o que se pede quando se pensa em não voltar.' },
{ t:'inn', tx:'Eu escrevi isso sem decidir nada.' },
{ t:'pause' },
{ t:'inn', tx:'Ou decidi em outubro e levei dois meses para pôr no papel.' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Quarto outubro em Velha Nidhaus.', line2:'A conta caiu em outra pessoa.',
  chapter:'capitulo8' },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.CHAPTER8; }
