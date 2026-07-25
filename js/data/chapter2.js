/* ==========================================================================
   ARQUIVO RABENFELS - js/data/chapter2.js
   CAPITULO 2: "O Inventario"
   Somente dados. Nenhum caminho de asset, nenhuma logica de render.
   Tipos de beat documentados em js/engine.js.

   Posicao no arco: Antoniette firma a cobertura, conhece os servos e
   comeca a catalogar. O horror entra por acumulacao de detalhe pequeno,
   nunca por afirmacao.

   Nao acontece aqui:
   - contato real com as gemeas (isso e o Capitulo 3)
   - qualquer revelacao sobre a natureza dos experimentos
   - qualquer mencao a antecessora alem do que o Prologo ja deu

   Seis cenas:
     C1 copa, manha cedo - Dara
     C2 biblioteca - Ren e o metodo
     C3 os livros de conta - o primeiro erro
     C4 patio ao entardecer - Fenn e a regra que ninguem enuncia
     C5 secao nordeste, noite - a lacuna
     C6 manha seguinte - o livro devolvido
   Depois: escolha "A Lacuna", consequencia por opcao e fechamento.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

/* --------------------------------------------------------------------------
   Consequencias imediatas da escolha do Capitulo 2.

   As tres reconvergem na cena de fechamento. A opcao C muda de texto
   conforme o jogador tenha ou nao aberto o caderno sem identificacao no
   Capitulo 1: o beat com 'if' so roda quando a flag confere.
   -------------------------------------------------------------------------- */

var C2_ESCOLHA_A = [
  { t:'nar', tx:'Ela anotou a lacuna no relat\u00f3rio operacional, entre a contagem de volumes e o estado das encaderna\u00e7\u00f5es.' },
  { t:'inn', tx:'Item nove. Irregularidade administrativa. Sem prioridade.' },
  { t:'nar', tx:'Releu o item nove tr\u00eas vezes e n\u00e3o mudou uma palavra.' },
  { t:'pause' },
  { t:'inn', tx:'Um arquivista competente registra o que falta e segue catalogando o que existe.' },
  { t:'nar', tx:'Ela seguiu catalogando o que existia.' }
];

var C2_ESCOLHA_B = [
  { t:'nar', tx:'Ela abriu o invent\u00e1rio de pessoal e procurou o mesmo intervalo.' },
  { t:'nar', tx:'Os contratos de servi\u00e7o estavam completos. Nenhuma lacuna.' },
  { t:'inn', tx:'Ent\u00e3o n\u00e3o foi enchente, nem inc\u00eandio, nem mudan\u00e7a de administra\u00e7\u00e3o.' },
  { t:'inn', tx:'Faltam os livros de conta de dois anos e n\u00e3o falta mais nada.' },
  { t:'pause' },
  { t:'nar', tx:'Escreveu os dois anos em um papel avulso e guardou no bolso do avental.' },
  { t:'inn', tx:'Preciso saber o que a casa comprava nesses dois anos.' }
];

var C2_ESCOLHA_C = [
  { t:'nar', tx:'Ela copiou a p\u00e1gina inteira \u00e0 m\u00e3o. Colunas, datas, o intervalo em branco.' },
  { t:'nar', tx:'Copiar leva quarenta minutos. Anotar leva dois.' },
  { t:'inn', tx:'Uma anota\u00e7\u00e3o \u00e9 a minha leitura da p\u00e1gina. A c\u00f3pia \u00e9 a p\u00e1gina.' },

  { t:'nar', tx:'Tirou o caderno sem identifica\u00e7\u00e3o de baixo do forro do ba\u00fa.',
    if:{ archive_seed:true } },
  { t:'nar', tx:'Tirou do ba\u00fa de ferramentas um caderno em branco. N\u00e3o escreveu data nem cabe\u00e7alho.',
    if:{ archive_seed:false } },

  { t:'arc', key:'sem_identificacao', label:'\u2014 caderno sem identifica\u00e7\u00e3o \u2014', lns:[
      'Livros de conta: intervalo de dois anos ausente.',
      'Numera\u00e7\u00e3o dos volumes: cont\u00ednua.',
      'Quem retirou os livros n\u00e3o quis que a falta aparecesse.'
  ]},
  { t:'inn', tx:'Isto tamb\u00e9m n\u00e3o vai para Lervel.' },
  { t:'nar', tx:'Guardou o caderno e a c\u00f3pia no mesmo lugar.' }
];

RBF.CHAPTER2 = [

/* --- cartao de capitulo ---------------------------------------------- */
{ t:'chap', num:'CAP\u00cdTULO 2', name:'O INVENT\u00c1RIO', chapter:'capitulo2' },
{ t:'fade_out' },

/* ======================================================================
   CENA 1 - A COPA - MANHA CEDO
   Proposito: Dara e a cultura de servico da casa.
   Saida: a regra que ninguem enuncia.
   ====================================================================== */
{ t:'scene', id:'c2_copa', chapter:'capitulo2', title:'A copa',
  bg:'bg_kitchen', bgm:'bgm_nidhaus' },
{ t:'fade_in' },

{ t:'nar', tx:'A copa acordava antes da casa. \u00c0s cinco e meia j\u00e1 havia fogo e p\u00e3o.' },
{ t:'nar', tx:'Antoniette desceu \u00e0s seis, na terceira manh\u00e3, com o invent\u00e1rio parcial debaixo do bra\u00e7o.' },
{ t:'inn', tx:'Comer com os servos economiza duas semanas de observa\u00e7\u00e3o.' },

{ t:'spr', ch:'dara', ex:'neutral', pos:'center' },
{ t:'nar', tx:'A cozinheira encheu uma caneca sem perguntar se ela queria.' },
{ t:'dial', ch:'dara', tx:'Senhorita Vael. A copa \u00e9 dos empregados.' },
{ t:'dial', ch:'antoniette', tx:'Eu sou empregada. Contrato de nove meses, pago por volume catalogado.' },
{ t:'pause' },
{ t:'nar', tx:'Dara olhou para ela por tr\u00eas segundos inteiros.' },
{ t:'spr', ch:'dara', ex:'guarded', pos:'center' },
{ t:'dial', ch:'dara', tx:'Dara. Cozinho aqui h\u00e1 dezenove anos.' },

{ t:'nar', tx:'Sentou do outro lado da mesa, o que n\u00e3o era obrigada a fazer.' },
{ t:'dial', ch:'dara', tx:'A senhorita vai querer saber os hor\u00e1rios. Caf\u00e9 \u00e0s seis, almo\u00e7o ao meio-dia, ceia \u00e0s oito.' },
{ t:'dial', ch:'dara', tx:'Depois das oito a cozinha fecha e eu vou para o meu quarto.' },
{ t:'dial', ch:'antoniette', tx:'E se algu\u00e9m tiver fome \u00e0s dez?' },
{ t:'dial', ch:'dara', tx:'Ningu\u00e9m tem.' },

{ t:'inn', tx:'Ela respondeu r\u00e1pido demais para ser uma observa\u00e7\u00e3o.' },
{ t:'inn', tx:'Foi uma regra.' },
{ t:'pause' },

{ t:'nar', tx:'Antoniette abriu o invent\u00e1rio parcial e pousou ao lado da caneca.' },
{ t:'dial', ch:'antoniette', tx:'A biblioteca tem quatro mil e duzentos volumes. Vou levar mais tempo do que o contrato previa.' },
{ t:'dial', ch:'dara', tx:'A biblioteca fica no lado sul.' },
{ t:'dial', ch:'antoniette', tx:'Fica.' },
{ t:'dial', ch:'dara', tx:'Bom.' },

{ t:'spr_hide', ch:'dara' },
{ t:'nar', tx:'Levantou e voltou para o fogo antes que a conversa pudesse continuar.' },
{ t:'inn', tx:'Eu n\u00e3o perguntei nada sobre o lado norte.' },

/* ======================================================================
   CENA 2 - A BIBLIOTECA - MANHA
   Proposito: Ren, o metodo de catalogacao, o contraponto normal.
   Saida: ele nao sabe de nada e isso e informacao.
   ====================================================================== */
{ t:'scene', id:'c2_biblioteca', chapter:'capitulo2', title:'A cataloga\u00e7\u00e3o',
  bg:'bg_library', bgm:'bgm_nidhaus' },

{ t:'nar', tx:'O rapaz j\u00e1 estava l\u00e1 quando ela chegou, empilhando volumes por altura.' },
{ t:'spr', ch:'ren', ex:'neutral', pos:'right' },
{ t:'dial', ch:'ren', tx:'A senhora Rabenfels disse que eu ajudo a senhorita. Sou Ren.' },
{ t:'dial', ch:'antoniette', tx:'H\u00e1 quanto tempo voc\u00ea trabalha aqui?' },
{ t:'dial', ch:'ren', tx:'Cinco semanas.' },

{ t:'inn', tx:'Cinco semanas. Contratado pouco antes de mim.' },
{ t:'inn', tx:'Guardar isso. N\u00e3o perguntar por qu\u00ea.' },

{ t:'dial', ch:'antoniette', tx:'Empilhar por altura \u00e9 bom para a estante. N\u00e3o serve para cat\u00e1logo.' },
{ t:'dial', ch:'ren', tx:'Serve para qu\u00ea, ent\u00e3o?' },
{ t:'dial', ch:'antoniette', tx:'Autor, assunto, data, estado da encaderna\u00e7\u00e3o. Nessa ordem. Um volume por ficha.' },
{ t:'nar', tx:'Ele repetiu a ordem em voz baixa duas vezes e n\u00e3o errou mais.' },
{ t:'pause' },

{ t:'nar', tx:'Trabalharam tr\u00eas horas. Ren falava enquanto trabalhava, do jeito de quem nunca precisou aprender a ficar quieto.' },
{ t:'dial', ch:'ren', tx:'Minha m\u00e3e queria que eu fosse para a cidade. Aqui paga melhor.' },
{ t:'dial', ch:'ren', tx:'A senhora Rabenfels pagou seis meses adiantado. Isso \u00e9 normal?' },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o.' },
{ t:'dial', ch:'ren', tx:'Ah.' },
{ t:'nar', tx:'Ele riu e voltou para a pilha.' },

{ t:'inn', tx:'Ele n\u00e3o fez a segunda pergunta.' },
{ t:'inn', tx:'Dezessete anos. A casa contratou dois estranhos em seis semanas e ele acha que o incomum \u00e9 o adiantamento.' },
{ t:'spr_hide', ch:'ren' },

{ t:'arc', key:'caderno', label:'\u2014 Caderno Operacional \u2014 Entrada 4 \u2014', lns:[
    'Assistente designado: Ren, 17 anos, contratado 5 semanas antes da minha chegada.',
    'Sem v\u00ednculo com a regi\u00e3o. Sem parentes na casa. Sem curiosidade.',
    'A escolha de um assistente sem raiz local n\u00e3o \u00e9 acidente.'
]},

/* ======================================================================
   CENA 3 - OS LIVROS DE CONTA - TARDE
   Proposito: o primeiro erro concreto no inventario.
   Saida: a numeracao continua e mesmo assim faltam dois anos.
   ====================================================================== */
{ t:'scene', id:'c2_livros_conta', chapter:'capitulo2', title:'Os livros de conta',
  bg:'bg_library', bgm:'bgm_archive' },

{ t:'nar', tx:'A quarta prateleira do lado leste guardava a administra\u00e7\u00e3o da casa. Compras, sal\u00e1rios, reparos.' },
{ t:'nar', tx:'Setenta e um volumes id\u00eanticos, encadernados no mesmo couro, numerados na lombada.' },
{ t:'sfx', id:'sfx_page_turn' },
{ t:'nar', tx:'Antoniette abriu o primeiro e reconheceu o formato. A Ordem usava um parecido.' },
{ t:'inn', tx:'Colunas de gasto, coluna de origem, assinatura mensal do administrador.' },

{ t:'nar', tx:'Catalogou dezenove volumes antes de parar.' },
{ t:'pause' },
{ t:'nar', tx:'Voltou ao volume onze e abriu no fim.' },
{ t:'nar', tx:'O volume onze fechava em mar\u00e7o. O volume doze abria dois anos depois, em abril.' },

{ t:'inn', tx:'Dois anos sem registro de compra, sal\u00e1rio ou reparo.' },
{ t:'inn', tx:'A casa n\u00e3o parou de comer nesses dois anos.' },

{ t:'nar', tx:'Conferiu as lombadas. Onze, doze, treze. A numera\u00e7\u00e3o n\u00e3o pulava.' },
{ t:'pause' },
{ t:'inn', tx:'Se dois volumes tivessem sido perdidos, a numera\u00e7\u00e3o pularia.' },
{ t:'inn', tx:'A numera\u00e7\u00e3o \u00e9 cont\u00ednua porque foi refeita depois.' },

{ t:'nar', tx:'Ela passou o polegar na lombada do doze. O couro estava um tom mais claro que o dos vizinhos.' },
{ t:'inn', tx:'Reencadernado.' },

{ t:'spr', ch:'ren', ex:'neutral', pos:'right' },
{ t:'dial', ch:'ren', tx:'Achou alguma coisa?' },
{ t:'nar', tx:'Antoniette fechou o volume antes de responder.' },
{ t:'dial', ch:'antoniette', tx:'Encaderna\u00e7\u00e3o irregular. Acontece em cole\u00e7\u00e3o antiga.' },
{ t:'dial', ch:'ren', tx:'Anoto na ficha?' },
{ t:'dial', ch:'antoniette', tx:'Anota.' },
{ t:'spr_hide', ch:'ren' },

{ t:'inn', tx:'A primeira mentira em tr\u00eas dias. Anotada mentalmente, com a data.' },

/* ======================================================================
   CENA 4 - O PATIO - ENTARDECER
   Proposito: a regra da casa, dita sem ser dita. Fenn de novo.
   Saida: ninguem olha para a ala de estudos, e ninguem sabe que nao olha.
   ====================================================================== */
{ t:'scene', id:'c2_patio', chapter:'capitulo2', title:'O p\u00e1tio',
  bg:'bg_nidhaus_gate', bgm:null },

{ t:'sfx', id:'sfx_wind' },
{ t:'nar', tx:'Ela cruzou o p\u00e1tio \u00e0s seis, quando os empregados atravessam para a cozinha.' },
{ t:'nar', tx:'Contou onze passagens em vinte minutos.' },
{ t:'pause' },
{ t:'nar', tx:'Onze pessoas passaram diante da porta nordeste. Nenhuma virou a cabe\u00e7a.' },

{ t:'inn', tx:'N\u00e3o \u00e9 evitar. Evitar exige saber que se est\u00e1 evitando.' },
{ t:'inn', tx:'Eles simplesmente n\u00e3o olham. \u00c9 como respirar.' },

{ t:'spr', ch:'fenn', ex:'neutral', pos:'left' },
{ t:'nar', tx:'Fenn apareceu com uma lanterna apagada na m\u00e3o, cedo demais para acender.' },
{ t:'dial', ch:'fenn', tx:'Senhorita Vael. O p\u00e1tio esfria r\u00e1pido depois das seis.' },
{ t:'dial', ch:'antoniette', tx:'Estou vendo a fachada. A ala nordeste tem argamassa nova em cima de pedra velha.' },
{ t:'pause' },
{ t:'dial', ch:'fenn', tx:'Tem.' },
{ t:'dial', ch:'antoniette', tx:'Reforma recente?' },
{ t:'dial', ch:'fenn', tx:'N\u00e3o que eu tenha visto.' },

{ t:'inn', tx:'Ele respondeu \u00e0 pergunta que eu fiz e s\u00f3 a ela.' },
{ t:'inn', tx:'Ningu\u00e9m nesta casa mente. Eles apenas param exatamente onde a verdade acaba.' },

{ t:'nar', tx:'Fenn acendeu a lanterna. Ainda havia luz suficiente para n\u00e3o precisar.' },
{ t:'dial', ch:'fenn', tx:'A ceia \u00e9 \u00e0s oito. Depois disso a copa fecha.' },
{ t:'dial', ch:'antoniette', tx:'A senhora Dara j\u00e1 me disse.' },
{ t:'dial', ch:'fenn', tx:'Ent\u00e3o j\u00e1 sabe.' },
{ t:'spr_hide', ch:'fenn' },

{ t:'nar', tx:'Ele atravessou o p\u00e1tio pelo lado sul, que \u00e9 o caminho mais longo.' },

/* ======================================================================
   CENA 5 - A SECAO NORDESTE - NOITE
   Proposito: ela sobe. Encontra a lacuna documentada, nao explicada.
   Saida: a permissao de Aldric era um convite e ela sabe disso.
   ====================================================================== */
{ t:'scene', id:'c2_nordeste', chapter:'capitulo2', title:'A se\u00e7\u00e3o nordeste',
  bg:'bg_library_night', bgm:'bgm_archive' },

{ t:'nar', tx:'\u00c0s onze a casa fica quieta de um jeito que n\u00e3o \u00e9 sil\u00eancio. \u00c9 aus\u00eancia de gente.' },
{ t:'sfx', id:'sfx_footsteps' },
{ t:'nar', tx:'Antoniette subiu ao segundo andar com uma vela e o caderno operacional.' },
{ t:'inn', tx:'Ele disse para trazer a ele antes de catalogar. N\u00e3o disse para n\u00e3o subir.' },

{ t:'nar', tx:'As estantes do canto nordeste estavam viradas para dentro. Entre elas cabia uma pessoa de lado.' },
{ t:'nar', tx:'Livros de registro. O mesmo couro dos livros de conta do andar de baixo.' },
{ t:'sfx', id:'sfx_page_turn' },
{ t:'pause' },

{ t:'nar', tx:'N\u00e3o eram contas. Eram registros da pr\u00f3pria fam\u00edlia.' },
{ t:'nar', tx:'Nascimentos, mortes, casamentos, transfer\u00eancias de propriedade. Duzentos anos.' },
{ t:'inn', tx:'Isto deveria estar no cart\u00f3rio de Marca Cinzenta. N\u00e3o em uma estante virada para a parede.' },

{ t:'nar', tx:'Ela procurou o intervalo dos dois anos que faltavam l\u00e1 embaixo.' },
{ t:'pause' },
{ t:'nar', tx:'Estava l\u00e1. Completo. Duas p\u00e1ginas por m\u00eas, letra firme.' },

{ t:'inn', tx:'Os registros de fam\u00edlia dos dois anos existem.' },
{ t:'inn', tx:'Os livros de conta dos mesmos dois anos foram retirados e a numera\u00e7\u00e3o foi refeita.' },
{ t:'pause' },
{ t:'inn', tx:'Algu\u00e9m escolheu o que apagar. Escolheu o dinheiro.' },

{ t:'nar', tx:'Ela leu os dois anos de registro de fam\u00edlia inteiros. Levou quarenta minutos.' },
{ t:'nar', tx:'Nada fora do comum. Tr\u00eas nascimentos, duas mortes, um casamento.' },
{ t:'inn', tx:'Nada fora do comum \u00e9 uma informa\u00e7\u00e3o.' },
{ t:'inn', tx:'Um documento que n\u00e3o explica a aus\u00eancia do outro est\u00e1 fazendo isso de prop\u00f3sito.' },

{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'A vela chegou ao fim. Ela desceu no escuro, que j\u00e1 conhecia.' },

{ t:'inn', tx:'Ele me deu permiss\u00e3o para subir aqui.' },
{ t:'pause' },
{ t:'inn', tx:'Ou ele n\u00e3o sabe o que tem aqui, ou ele quer que eu saiba.' },
{ t:'inn', tx:'Aldric Rabenfels sabe o que tem em cada estante desta casa.' },

/* ======================================================================
   CENA 6 - A BIBLIOTECA - MANHA SEGUINTE
   Proposito: presenca das gemeas por objeto, nao por pessoa.
   Saida: alguem le aqui de madrugada e devolve o livro no lugar certo.
   ====================================================================== */
{ t:'scene', id:'c2_devolucao', chapter:'capitulo2', title:'O livro devolvido',
  bg:'bg_library', bgm:'bgm_nidhaus' },

{ t:'nar', tx:'Ela catalogava a terceira prateleira do lado oeste quando percebeu.' },
{ t:'nar', tx:'Um volume de anatomia comparada, catalogado por ela na v\u00e9spera, estava fora da ordem.' },
{ t:'inn', tx:'Fora da ordem por uma posi\u00e7\u00e3o. Trocado com o vizinho.' },
{ t:'pause' },

{ t:'sfx', id:'sfx_page_turn' },
{ t:'nar', tx:'Abriu. Havia um marcador de papel dobrado entre as p\u00e1ginas cento e doze e cento e treze.' },
{ t:'nar', tx:'Sistema circulat\u00f3rio. Diagrama de irriga\u00e7\u00e3o de \u00f3rg\u00e3o.' },

{ t:'spr', ch:'ren', ex:'neutral', pos:'right' },
{ t:'dial', ch:'ren', tx:'Fui eu que arrumei essa prateleira. Devo ter trocado.' },
{ t:'dial', ch:'antoniette', tx:'Voc\u00ea leu este volume?' },
{ t:'dial', ch:'ren', tx:'N\u00e3o sei ler direito, senhorita. Sei as letras.' },
{ t:'pause' },
{ t:'dial', ch:'antoniette', tx:'Obrigada, Ren.' },
{ t:'spr_hide', ch:'ren' },

{ t:'nar', tx:'O marcador era um peda\u00e7o de papel de carta cortado com r\u00e9gua.' },
{ t:'inn', tx:'Quem cortou tinha pressa e mesmo assim usou r\u00e9gua.' },

{ t:'nar', tx:'Ela devolveu o volume \u00e0 posi\u00e7\u00e3o correta e continuou catalogando.' },
{ t:'pause' },
{ t:'nar', tx:'Na manh\u00e3 seguinte o volume estava de novo trocado com o vizinho, e o marcador na mesma p\u00e1gina.' },

{ t:'inn', tx:'N\u00e3o \u00e9 engano de arruma\u00e7\u00e3o. \u00c9 rotina.' },
{ t:'inn', tx:'Algu\u00e9m l\u00ea nesta biblioteca de madrugada e devolve o livro quase no lugar certo.' },
{ t:'pause' },
{ t:'inn', tx:'Quase.' },

/* ======================================================================
   ESCOLHA - A LACUNA
   A: distancia operacional mantida
   B: investigacao cruzada
   C: copia integral para o arquivo pessoal
   ====================================================================== */
{ t:'scene', id:'c2_relatorio', chapter:'capitulo2', title:'O segundo relat\u00f3rio',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'O segundo relat\u00f3rio para Matheo vencia naquela noite.' },
{ t:'nar', tx:'Ela tinha o invent\u00e1rio parcial, a lacuna dos dois anos e um marcador de papel na mesa.' },

{ t:'cho', id:'cap2_lacuna', prompt:'A LACUNA', opts:[
  { id:'A',
    tx:'Registrar como irregularidade administrativa e seguir o contrato.',
    flags:{ ledger_report:'A', ledger_crossref:false, ledger_copied:false },
    routes:{ loss: 1 },
    then: C2_ESCOLHA_A },
  { id:'B',
    tx:'Cruzar com o invent\u00e1rio de pessoal e datar exatamente o intervalo.',
    flags:{ ledger_report:'B', ledger_crossref:true, ledger_copied:false },
    routes:{ answer: 2 },
    then: C2_ESCOLHA_B },
  { id:'C',
    tx:'Copiar a p\u00e1gina inteira \u00e0 m\u00e3o. O que a Ordem receber \u00e9 outro assunto.',
    flags:{ ledger_report:'C', ledger_crossref:false, ledger_copied:true, archive_seed:true },
    routes:{ answer: 1, hope: 1 },
    then: C2_ESCOLHA_C }
]},

/* ======================================================================
   CENA FINAL - QUARTO DE ANTONIETTE - MADRUGADA
   ====================================================================== */
{ t:'scene', id:'c2_madrugada', chapter:'capitulo2', title:'Madrugada',
  bg:'bg_antoniette_room' },

{ t:'nar', tx:'Uma e meia. O relat\u00f3rio lacrado na beira da mesa.' },
{ t:'nar', tx:'Da janela via-se o p\u00e1tio, a porta nordeste e a corrente sem cadeado.' },
{ t:'pause' },

{ t:'nar', tx:'Havia luz na ala de estudos.' },
{ t:'inn', tx:'Terceira noite seguida. Sempre a mesma janela, sempre depois da uma.' },

{ t:'nar', tx:'A luz se apagou \u00e0s duas e dez.' },
{ t:'nar', tx:'Onze minutos depois, algu\u00e9m atravessou o p\u00e1tio at\u00e9 a porta da biblioteca.' },
{ t:'inn', tx:'Passos curtos. Peso de crian\u00e7a.' },
{ t:'pause' },
{ t:'inn', tx:'Ningu\u00e9m acompanhando.' },

{ t:'nar', tx:'Antoniette ficou na janela at\u00e9 o p\u00e1tio esvaziar.' },
{ t:'nar', tx:'Depois abriu o caderno operacional e escreveu uma linha.' },

{ t:'arc', key:'caderno', label:'\u2014 Caderno Operacional \u2014 Entrada 9 \u2014', lns:[
    'Duas crian\u00e7as de oito anos nesta casa.',
    'Uma delas sai sozinha \u00e0s duas e vinte da manh\u00e3 e ningu\u00e9m vai atr\u00e1s.',
    'Isso significa que \u00e9 permitido.'
]},

{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'Apagou a vela.' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Segundo m\u00eas em Velha Nidhaus.', line2:'A casa come\u00e7ou a responder.',
  chapter:'capitulo2' },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.CHAPTER2; }
