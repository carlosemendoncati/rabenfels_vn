/* ==========================================================================
   ARQUIVO RABENFELS - js/data/chapter8.js
   CAPITULO 8: "O Que Ela Nao Deveria Saber"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.

   QUANDO: Ano 4, outubro. Klara e Liara tem onze anos.

   O PENSAMENTO UNICO (Zinsser, unidade):
   "Ela descobriu o cronograma, e outra pessoa pagou por isso no lugar
   dela."

   A TROCA (docs/estrutura_v1.md):
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
   embora daqui"). Agora ele tem quinze e Fenn precisa de dinheiro.

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
  { t:'nar', tx:'N\u00e3o foi demitido. N\u00e3o houve conversa. O uniforme dele passou a ser outro.' },
  { t:'pause' },
  { t:'nar', tx:'Ele deixou de entrar na casa. Deixou de ter chave. Deixou de responder pela casa.' },
  { t:'inn', tx:'Nove anos de servi\u00e7o e a palavra dele valia mais que a de qualquer criado daqui.' },
  { t:'inn', tx:'Ningu\u00e9m precisou dizer por qu\u00ea.' },
  { t:'pause' },
  { t:'nar', tx:'Ela cruzou com ele no p\u00e1tio tr\u00eas vezes naquele m\u00eas, e nas tr\u00eas ele cumprimentou.' },
  { t:'inn', tx:'A melhor fonte que eu tinha nesta casa, e eu gastei ela em quatro noites.' }
];

var C8_PROTEGE_A = [
  { t:'dial', ch:'antoniette', tx:'Fenn n\u00e3o me disse nada. Eu achei no livro de pessoal, sozinha.' },
  { t:'nar', tx:'Serafina recebeu a frase sem mover o rosto.' },
  { t:'pause' },
  { t:'dial', ch:'serafina', tx:'O livro de pessoal est\u00e1 no meu escrit\u00f3rio h\u00e1 quatro anos.' },
  { t:'dial', ch:'antoniette', tx:'Est\u00e1.' },
  { t:'pause' },
  { t:'dial', ch:'serafina', tx:'Ent\u00e3o a senhorita esteve no meu escrit\u00f3rio.' },
  { t:'nar', tx:'E deixou a frase no ar, como quem oferece a sa\u00edda e observa se a outra aceita.' },
  { t:'dial', ch:'antoniette', tx:'Estive.' },
  { t:'spr_hide', ch:'serafina' },

  { t:'pause' },
  { t:'nar', tx:'Fenn manteve a chave e o uniforme. Ningu\u00e9m falou nada com ele.' },
  { t:'nar', tx:'Na semana seguinte o filho dele foi contratado para a cocheira.' },
  { t:'pause' },
  { t:'inn', tx:'Quinze anos.' },
  { t:'inn', tx:'Entrou de vez.' },
  { t:'pause' },
  { t:'nar', tx:'Fenn a agradeceu numa manh\u00e3 de novembro, no p\u00e1tio, de cabe\u00e7a baixa e em cinco palavras.' },
  { t:'inn', tx:'Foi o pior obrigado que eu j\u00e1 recebi.' }
];

var C8_PROTEGE_C = [
  { t:'dial', ch:'antoniette', tx:'Manda ele hoje. Antes que algu\u00e9m decida.' },
  { t:'nar', tx:'Fenn olhou para ela por um tempo e n\u00e3o perguntou por qu\u00ea.' },
  { t:'dial', ch:'fenn', tx:'Hoje \u00e9 quarta. A carro\u00e7a do sal passa \u00e0s onze.' },
  { t:'dial', ch:'antoniette', tx:'Ent\u00e3o \u00e0s onze.' },
  { t:'pause' },
  { t:'nar', tx:'Ela deu a ele o pagamento de dois trimestres em moeda, embrulhado em pano.' },
  { t:'nar', tx:'N\u00e3o perguntou o nome da escriba. N\u00e3o perguntou mais nada.' },

  { t:'pause' },
  { t:'nar', tx:'O rapaz saiu \u00e0s onze e dez, na carro\u00e7a do sal, com um saco e o casaco do pai.' },
  { t:'nar', tx:'Fenn ficou.' },
  { t:'pause' },
  { t:'nar', tx:'Continuou respondendo pela casa. Continuou econ\u00f4mico com gente.' },
  { t:'nar', tx:'Parou de falar com os cavalos.' },
  { t:'pause' },
  { t:'inn', tx:'Eu n\u00e3o tenho o nome da escriba e n\u00e3o vou ter.' },
  { t:'inn', tx:'E o rapaz est\u00e1 em algum lugar que n\u00e3o \u00e9 aqui.' }
];

RBF.CHAPTER8 = [

{ t:'chap', num:'CAP\u00cdTULO 8', name:'O QUE ELA N\u00c3O DEVERIA SABER', chapter:'capitulo8' },
{ t:'fade_out' },

/* ======================================================================
   C1 - A COCHEIRA
   Fenn cobra. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c8_cocheira', chapter:'capitulo8', title:'A cocheira',
  bg:'bg_nidhaus_gate', bgm:'bgm_nidhaus' },
{ t:'fade_in' },

{ t:'nar', tx:'Outubro do quarto ano veio com chuva atravessada e a casa fechou o p\u00e1tio \u00e0s cinco.' },
{ t:'nar', tx:'Fenn a esperou na porta da cocheira, o que ele nunca tinha feito.' },
{ t:'pause' },

{ t:'spr', ch:'fenn', ex:'neutral', pos:'left' },
{ t:'dial', ch:'fenn', tx:'A senhorita recebe da Ordem por trimestre ou por ano?' },
{ t:'pause' },
{ t:'nar', tx:'Antoniette parou de tirar a capa.' },
{ t:'inn', tx:'Ele n\u00e3o perguntou se eu recebo da Ordem.' },
{ t:'inn', tx:'Perguntou como.' },

{ t:'dial', ch:'antoniette', tx:'H\u00e1 quanto tempo o senhor sabe?' },
{ t:'dial', ch:'fenn', tx:'Desde que a senhorita mediu o corredor com os p\u00e9s, no primeiro dia.' },
{ t:'pause' },
{ t:'dial', ch:'fenn', tx:'Empregada n\u00e3o mede casa. Empregada trabalha na casa que tem.' },

{ t:'nar', tx:'Ele disse aquilo sem amea\u00e7a, do mesmo jeito com que dizia o hor\u00e1rio do jantar.' },
{ t:'inn', tx:'Quatro anos e meio.' },
{ t:'inn', tx:'Ele sabe h\u00e1 quatro anos e meio e n\u00e3o disse a ningu\u00e9m.' },
{ t:'pause' },

{ t:'dial', ch:'antoniette', tx:'O que o senhor quer?' },
{ t:'dial', ch:'fenn', tx:'Dois trimestres. Em moeda.' },
{ t:'dial', ch:'antoniette', tx:'Para qu\u00ea?' },
{ t:'pause' },
{ t:'dial', ch:'fenn', tx:'Meu filho fez quinze em agosto.' },
{ t:'spr_hide', ch:'fenn' },
{ t:'nar', tx:'E entrou na cocheira, porque tinha o que fazer.' },

/* ======================================================================
   C2 - O QUE FENN VENDE
   REVELACAO 9: a antecessora. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c8_escriba', chapter:'capitulo8', title:'O que ele vende',
  bg:'bg_nidhaus_gate', bgm:null },

{ t:'nar', tx:'Voltou na noite seguinte, com a mesma capa molhada, e ele come\u00e7ou sem cumprimentar.' },
{ t:'spr', ch:'fenn', ex:'neutral', pos:'left' },
{ t:'dial', ch:'fenn', tx:'Trinta e sete anos atr\u00e1s veio uma mulher de Lervel. Ficou seis meses.' },
{ t:'pause' },
{ t:'inn', tx:'Eu conhe\u00e7o essa linha. Est\u00e1 no dossi\u00ea. Partiu por motivo de sa\u00fade.' },

{ t:'dial', ch:'fenn', tx:'Meu pai trabalhava aqui. Eu tinha nove anos.' },
{ t:'dial', ch:'fenn', tx:'Ela media as coisas com os p\u00e9s.' },

{ t:'pause' },
{ t:'nar', tx:'Antoniette ficou parada com a capa na m\u00e3o.' },
{ t:'pause' },

{ t:'dial', ch:'antoniette', tx:'O que aconteceu com ela?' },
{ t:'dial', ch:'fenn', tx:'Isso eu n\u00e3o sei e n\u00e3o vou inventar.' },
{ t:'pause' },
{ t:'dial', ch:'fenn', tx:'Sei o nome dela. Sei onde est\u00e1 escrito, e n\u00e3o \u00e9 no livro de pessoal.' },
{ t:'dial', ch:'antoniette', tx:'Onde?' },
{ t:'spr', ch:'fenn', ex:'neutral', pos:'left' },
{ t:'dial', ch:'fenn', tx:'Dois trimestres.' },
{ t:'spr_hide', ch:'fenn' },

{ t:'pause' },
{ t:'inn', tx:'Ele guardou isso a vida inteira e escolheu vender agora.' },
{ t:'inn', tx:'N\u00e3o porque o pre\u00e7o subiu. Porque o filho fez quinze.' },

/* ======================================================================
   C3 - O CRONOGRAMA
   REVELACAO 11: depende do apice, nao da idade. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c8_cronograma', chapter:'capitulo8', title:'O cronograma',
  bg:'bg_library_night', bgm:'bgm_archive' },

{ t:'nar', tx:'Ela subiu com a lista das nove datas que tinha copiado da parede da c\u00e2mara dois anos antes.' },
{ t:'nar', tx:'Cruzou com os registros de fam\u00edlia da estante nordeste, que ela j\u00e1 conhecia de cor.' },
{ t:'pause' },

{ t:'inn', tx:'Eu vinha lendo isto como idade. Sempre li como idade.' },
{ t:'nar', tx:'Ela alinhou as nove colunas interrompidas pela data de nascimento de cada par.' },
{ t:'pause' },

{ t:'nar', tx:'Doze anos.' },
{ t:'nar', tx:'Quinze.' },
{ t:'nar', tx:'Onze.' },
{ t:'nar', tx:'Dezesseis.' },
{ t:'pause' },

{ t:'inn', tx:'N\u00e3o bate. N\u00e3o tem idade nenhuma em comum.' },
{ t:'nar', tx:'Ela olhou a folha por um tempo longo e ent\u00e3o virou a r\u00e9gua de lado.' },
{ t:'pause' },

{ t:'nar', tx:'Alinhou pela altura em vez da idade.' },
{ t:'nar', tx:'As nove colunas interrompiam na mesma marca, com dois dedos de diferen\u00e7a entre a mais alta e a mais baixa.' },
{ t:'pause' },

{ t:'inn', tx:'N\u00e3o \u00e9 quando ela faz uma idade.' },
{ t:'inn', tx:'\u00c9 quando ela chega a um ponto.' },
{ t:'pause' },
{ t:'nar', tx:'Ela pousou a r\u00e9gua e ficou com as duas m\u00e3os na mesa.' },
{ t:'inn', tx:'E se \u00e9 um ponto, ele pode ser adiantado.' },
{ t:'pause' },
{ t:'inn', tx:'E se pode ser adiantado, algu\u00e9m j\u00e1 pensou nisso antes de mim.' },

{ t:'arc', key:'sem_identificacao', label:'\u2014 caderno sem identifica\u00e7\u00e3o \u2014', lns:[
    'Nove interrup\u00e7\u00f5es. Idades diferentes, alturas iguais.',
    'O ciclo n\u00e3o conta anos. Conta desenvolvimento.',
    'K. tem onze anos e est\u00e1 a um palmo da marca.',
    'N\u00e3o tenho cinco anos. Tenho o tempo que ela levar para crescer.'
]},

/* ======================================================================
   C4 - A ACADEMIA
   Liara diz a coisa que mata, e diz "Toni" na mesma fala.
   Ninguem em cena percebe nenhuma das duas. NAO COMENTAR.
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c8_academia', chapter:'capitulo8', title:'O que Liara quer',
  bg:'bg_corridor', bgm:null },

{ t:'nar', tx:'No corredor leste, Liara estava deitada de bru\u00e7os no ch\u00e3o com tr\u00eas folhas espalhadas.' },
{ t:'spr', ch:'liara', ex:'bright', pos:'right' },
{ t:'dial', ch:'liara', tx:'Toni, tem uma escola que aceita menina.' },
{ t:'pause' },
{ t:'dial', ch:'antoniette', tx:'Tem v\u00e1rias.' },
{ t:'dial', ch:'liara', tx:'N\u00e3o, uma de verdade. De mana. Em Eldoria.' },

{ t:'nar', tx:'Ela empurrou a folha pelo ch\u00e3o com dois dedos.' },
{ t:'dial', ch:'liara', tx:'A senhora Elke tem uma prima que foi. Aceita aos treze.' },
{ t:'dial', ch:'liara', tx:'Eu fa\u00e7o treze daqui a dois anos.' },
{ t:'pause' },

{ t:'spr', ch:'klara', ex:'side', pos:'center' },
{ t:'nar', tx:'Klara estava sentada na soleira com um livro fechado no colo e n\u00e3o disse nada.' },
{ t:'dial', ch:'liara', tx:'Papai vai dizer que n\u00e3o.' },
{ t:'dial', ch:'liara', tx:'Mas eu vou pedir todo dia at\u00e9 ele cansar. Eu ganho do papai. Sempre ganho.' },

{ t:'nar', tx:'E voltou para as folhas, satisfeita com o pr\u00f3prio plano.' },
{ t:'spr_hide', ch:'liara' },
{ t:'spr_hide', ch:'klara' },
{ t:'pause' },

{ t:'nar', tx:'Antoniette catalogou dois volumes naquela tarde e n\u00e3o escreveu nada sobre a conversa.' },

/* ======================================================================
   C5 - O PEDIDO
   Klara pede a coisa impossivel. LE 'taught'. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c8_pedido', chapter:'capitulo8', title:'O pedido',
  bg:'bg_library', bgm:null },

{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'nar', tx:'Klara apareceu na biblioteca \u00e0 noite, o que ela n\u00e3o fazia havia quatro anos.' },
{ t:'nar', tx:'Ficou de p\u00e9 do outro lado da mesa em vez de sentar.' },
{ t:'pause' },

/* --- ramo A: o metodo ------------------------------------------------ */
{ t:'dial', ch:'klara', tx:'Eu queria conferir uma coisa com a senhorita.', if:{ taught:'A' } },
{ t:'nar', tx:'Ela p\u00f4s sobre a mesa uma folha com tr\u00eas colunas e uma data em cada linha.', if:{ taught:'A' } },
{ t:'dial', ch:'klara', tx:'Outubro, todo ano. Fevereiro, alguns anos. Agosto, todo ano, e o de agosto \u00e9 diferente.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'dial', ch:'klara', tx:'Est\u00e1 certo?', if:{ taught:'A' } },
{ t:'nar', tx:'Antoniette olhou a folha e reconheceu o pr\u00f3prio m\u00e9todo na letra de uma crian\u00e7a de onze anos.', if:{ taught:'A' } },
{ t:'dial', ch:'antoniette', tx:'Est\u00e1 certo.', if:{ taught:'A' } },
{ t:'pause', if:{ taught:'A' } },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o me ensina o que falta.', if:{ taught:'A' } },

/* --- ramo B: a forma ------------------------------------------------- */
{ t:'dial', ch:'klara', tx:'Eu preciso pedir uma coisa e n\u00e3o sei o jeito certo.', if:{ taught:'B' } },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o tem jeito certo. Tem o pedido.', if:{ taught:'B' } },
{ t:'nar', tx:'A menina endireitou os ombros, do jeito que tinha aprendido, e esperou at\u00e9 estar pronta.', if:{ taught:'B' } },
{ t:'pause', if:{ taught:'B' } },
{ t:'dial', ch:'klara', tx:'Quando a senhorita for embora daqui, eu queria ir junto.', if:{ taught:'B' } },
{ t:'nar', tx:'Disse aquilo com a postura inteira, sem tremer a voz, olhando no olho pelo tempo exato.', if:{ taught:'B' } },
{ t:'pause', if:{ taught:'B' } },
{ t:'inn', tx:'Ela ensaiou.', if:{ taught:'B' } },

/* --- ramo C: o mundo ------------------------------------------------- */
{ t:'nar', tx:'Ela p\u00f4s sobre a mesa um pano dobrado, e dentro havia moeda mi\u00fada, bot\u00e3o e um anel de prata.', if:{ taught:'C' } },
{ t:'dial', ch:'klara', tx:'Isso d\u00e1 para tr\u00eas dias de carruagem?', if:{ taught:'C' } },
{ t:'pause', if:{ taught:'C' } },
{ t:'nar', tx:'Antoniette contou sem tocar. Dava para meio dia, e n\u00e3o em carruagem.', if:{ taught:'C' } },
{ t:'dial', ch:'antoniette', tx:'De onde veio o anel?', if:{ taught:'C' } },
{ t:'dial', ch:'klara', tx:'Era da minha av\u00f3. Ningu\u00e9m procura.', if:{ taught:'C' } },
{ t:'pause', if:{ taught:'C' } },
{ t:'dial', ch:'klara', tx:'Se n\u00e3o der, eu junto mais. S\u00f3 me diz quanto falta.', if:{ taught:'C' } },

/* --- reconverge ------------------------------------------------------- */
{ t:'pause' },
{ t:'nar', tx:'Antoniette abriu a boca para dizer que n\u00e3o era poss\u00edvel.' },
{ t:'nar', tx:'E ficou com a frase pronta na boca por quatro ou cinco segundos.' },
{ t:'pause' },
{ t:'dial', ch:'antoniette', tx:'Me d\u00e1 at\u00e9 fevereiro.' },
{ t:'nar', tx:'A menina assentiu uma vez, recolheu o que tinha trazido e subiu.' },
{ t:'spr_hide', ch:'klara' },
{ t:'pause' },
{ t:'inn', tx:'Eu acabei de dar uma data a ela.' },
{ t:'inn', tx:'Uma data \u00e9 uma promessa com n\u00famero.' },

/* ======================================================================
   C6 - SERAFINA
   REVELACAO 8: ela sabe, e sabe ha tempo.
   E Dara quase nomeia a outra coisa. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c8_serafina', chapter:'capitulo8', title:'O ch\u00e1 das quatro',
  bg:'bg_main_hall', bgm:'bgm_nidhaus' },

{ t:'spr', ch:'serafina', ex:'direct', pos:'right' },
{ t:'nar', tx:'Serafina a chamou para o ch\u00e1 das quatro pela primeira vez em quatro anos.' },
{ t:'nar', tx:'Serviu ela mesma, o que significava que n\u00e3o haveria criado na sala.' },
{ t:'pause' },

{ t:'dial', ch:'serafina', tx:'A biblioteca fecha quando?' },
{ t:'dial', ch:'antoniette', tx:'Fevereiro.' },
{ t:'dial', ch:'serafina', tx:'Fevereiro.' },
{ t:'nar', tx:'Ela repetiu a palavra como quem confere contra uma anota\u00e7\u00e3o pr\u00f3pria.' },
{ t:'pause' },

{ t:'spr', ch:'serafina', ex:'smirk', pos:'right' },
{ t:'dial', ch:'serafina', tx:'A senhorita chegou com um contrato de nove meses e ficou quatro anos e meio.' },
{ t:'dial', ch:'antoniette', tx:'A cole\u00e7\u00e3o era maior do que o contrato previa.' },
{ t:'pause' },
{ t:'dial', ch:'serafina', tx:'Era.' },

{ t:'nar', tx:'Ela pousou a x\u00edcara sem fazer barulho na lou\u00e7a.' },
{ t:'spr', ch:'serafina', ex:'grave', pos:'right' },
{ t:'dial', ch:'serafina', tx:'Eu escrevi a Lervel no seu segundo m\u00eas aqui, para confirmar as refer\u00eancias.' },
{ t:'pause' },
{ t:'dial', ch:'serafina', tx:'Responderam em nove dias, com timbre e selo.' },
{ t:'dial', ch:'serafina', tx:'Nove dias \u00e9 r\u00e1pido demais para uma casa que n\u00e3o esperava a pergunta.' },

{ t:'pause' },
{ t:'inn', tx:'Ela sabe desde o segundo m\u00eas.' },
{ t:'inn', tx:'Quatro anos e quatro meses.' },
{ t:'pause' },

{ t:'dial', ch:'antoniette', tx:'Por que a senhora n\u00e3o me removeu?' },
{ t:'nar', tx:'Serafina considerou a pergunta com a aten\u00e7\u00e3o que dava a tudo.' },
{ t:'spr', ch:'serafina', ex:'neutral', pos:'right' },
{ t:'dial', ch:'serafina', tx:'A senhorita \u00e9 boa com a menina.' },
{ t:'spr_hide', ch:'serafina' },
{ t:'nar', tx:'E levantou, porque o ch\u00e1 das quatro terminava \u00e0s cinco.' },

{ t:'pause' },
{ t:'inn', tx:'Ela me deixou ficar porque eu sou \u00fatil para a menina.' },
{ t:'inn', tx:'\u00datil para a menina chegar inteira onde precisa chegar.' },

{ t:'scene', id:'c8_copa', chapter:'capitulo8', title:'A copa',
  bg:'bg_kitchen', bgm:null },
{ t:'spr', ch:'dara', ex:'neutral', pos:'center' },
{ t:'nar', tx:'Na copa, naquela noite, Dara p\u00f4s a caneca na frente dela sem que ela pedisse.' },
{ t:'dial', ch:'dara', tx:'A senhorita devia comer.' },
{ t:'dial', ch:'antoniette', tx:'Eu como.' },
{ t:'pause' },
{ t:'dial', ch:'dara', tx:'A menina come melhor quando a senhorita come.' },

{ t:'nar', tx:'Antoniette levantou os olhos da caneca.' },
{ t:'pause' },
{ t:'dial', ch:'antoniette', tx:'Altera\u00e7\u00e3o de apetite em crian\u00e7a dessa idade costuma acompanhar crescimento. \u00c9 esperado.' },
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
{ t:'nar', tx:'Ela ficou olhando o embrulho por um tempo antes de decidir o que fazer com ele.' },
{ t:'pause' },

{ t:'inn', tx:'Se eu comprar o nome, eu tenho a antecessora e um caso que Lervel n\u00e3o pode ignorar.' },
{ t:'inn', tx:'E Fenn fica com um segredo vendido dentro de uma casa que conta tudo.' },
{ t:'pause' },
{ t:'inn', tx:'N\u00e3o d\u00e1 para ficar com as duas coisas.' },

{ t:'cho', id:'cap8_protecao', code:'C-VIII', prompt:'QUEM ELA PROTEGE', opts:[
  { id:'B',
    tx:'A informa\u00e7\u00e3o. Comprar o nome e usar. \u00c9 a \u00fanica prova que ela pode levar a Lervel.',
    flags:{ third_paid:'B', knows_predecessor:true, fenn_debt:'pago' },
    routes:{ answer: 3, loss: 1 },
    then: C8_PROTEGE_B },
  { id:'A',
    tx:'Fenn. Comprar o nome e negar a fonte se algu\u00e9m perguntar.',
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

{ t:'nar', tx:'A carta de Matheo chegou no fim de novembro, fora do ciclo dos relat\u00f3rios.' },

{ t:'arc', key:'matheo', label:'\u2014 correspond\u00eancia de campo \u2014', lns:[
    'A. \u2014 os seus relat\u00f3rios encolheram pela metade em quinze meses.',
    'N\u00e3o pe\u00e7o explica\u00e7\u00e3o. Pe\u00e7o que voc\u00ea confira se ainda est\u00e1 fazendo o',
    'trabalho, ou se passou a fazer outro.',
    'Se for o outro, escreva isso e eu arranjo a substitui\u00e7\u00e3o sem registro.',
    'M.'
], if:{ lied_to_order:'C' } },

{ t:'arc', key:'matheo', label:'\u2014 correspond\u00eancia de campo \u2014', lns:[
    'A. \u2014 "sem testemunha direta" foi a primeira frase sua que eu li duas',
    'vezes em oito anos.',
    'N\u00e3o vou perguntar de novo. Estou anotando a data desta carta.',
    'M.'
], if:{ lied_to_order:'B' } },

{ t:'arc', key:'matheo', label:'\u2014 correspond\u00eancia de campo \u2014', lns:[
    'A. \u2014 o relat\u00f3rio de agosto foi o melhor documento que este arquivo',
    'recebeu em vinte anos.',
    'Reduza o contato pessoal. Isto n\u00e3o \u00e9 conselho.',
    'M.'
], if:{ lied_to_order:'A' } },

{ t:'nar', tx:'Ela leu a carta duas vezes e n\u00e3o respondeu naquela semana.' },
{ t:'pause' },

{ t:'nar', tx:'No fim de dezembro escreveu quatro linhas sobre encaderna\u00e7\u00e3o e a previs\u00e3o de fechamento da biblioteca.' },
{ t:'nar', tx:'E acrescentou, no rodap\u00e9, uma frase que n\u00e3o tinha campo no formul\u00e1rio.' },

{ t:'arc', key:'caderno', label:'\u2014 rodap\u00e9 do relat\u00f3rio trimestral \u2014', lns:[
    'Solicito manuten\u00e7\u00e3o do ponto morto em noventa dias.'
]},

{ t:'pause' },
{ t:'inn', tx:'Ponto morto \u00e9 o que se pede quando se pensa em n\u00e3o voltar.' },
{ t:'inn', tx:'Eu escrevi isso sem decidir nada.' },
{ t:'pause' },
{ t:'inn', tx:'Ou decidi em outubro e levei dois meses para p\u00f4r no papel.' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Quarto outubro em Velha Nidhaus.', line2:'A conta caiu em outra pessoa.',
  chapter:'capitulo8' },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.CHAPTER8; }
