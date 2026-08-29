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
  { t:'nar', tx:'Ela anotou a lacuna no relatório operacional, entre a contagem de volumes e o estado das encadernações.' },
  { t:'inn', tx:'Item nove. Irregularidade administrativa. Sem prioridade.' },
  { t:'nar', tx:'Releu o item nove três vezes e não mudou uma palavra.' },
  { t:'pause' },
  { t:'inn', tx:'Um arquivista competente registra o que falta e segue catalogando o que existe.' },
  { t:'nar', tx:'Ela seguiu catalogando o que existia.' }
];

var C2_ESCOLHA_B = [
  { t:'nar', tx:'Ela abriu o inventário de pessoal e procurou o mesmo intervalo.' },
  { t:'nar', tx:'Os contratos de serviço estavam completos. Nenhuma lacuna.' },
  { t:'inn', tx:'Então não foi enchente, nem incêndio, nem mudança de administração.' },
  { t:'inn', tx:'Faltam os livros de conta de dois anos e não falta mais nada.' },
  { t:'pause' },
  { t:'nar', tx:'Escreveu os dois anos em um papel avulso e guardou no bolso do avental.' },
  { t:'inn', tx:'Preciso saber o que a casa comprava nesses dois anos.' }
];

var C2_ESCOLHA_C = [
  { t:'nar', tx:'Ela copiou a página inteira à mão. Colunas, datas, o intervalo em branco.' },
  { t:'nar', tx:'Copiar leva quarenta minutos. Anotar leva dois.' },
  { t:'inn', tx:'Uma anotação é a minha leitura da página. A cópia é a página.' },

  { t:'nar', tx:'Tirou o caderno sem identificação de baixo do forro do baú.',
    if:{ archive_seed:true } },
  { t:'nar', tx:'Tirou do baú de ferramentas um caderno em branco. Não escreveu data nem cabeçalho.',
    if:{ archive_seed:false } },

  { t:'arc', key:'sem_identificacao', label:'— caderno sem identificação —', lns:[
      'Livros de conta: intervalo de dois anos ausente.',
      'Numeração dos volumes: contínua.',
      'Quem retirou os livros não quis que a falta aparecesse.'
  ]},
  { t:'inn', tx:'Isto também não vai para Lervel.' },
  { t:'nar', tx:'Guardou o caderno e a cópia no mesmo lugar.' }
];

RBF.CHAPTER2 = [

/* --- cartao de capitulo ---------------------------------------------- */
{ t:'chap', num:'CAPÍTULO 2', name:'O INVENTÁRIO', chapter:'capitulo2' },
{ t:'fade_out' },

/* ======================================================================
   CENA 1 - A COPA - MANHA CEDO
   Proposito: Dara e a cultura de servico da casa.
   Saida: a regra que ninguem enuncia.
   ====================================================================== */
{ t:'scene', id:'c2_copa', chapter:'capitulo2', title:'A copa',
  bg:'bg_kitchen', bgm:'bgm_nidhaus' },
{ t:'fade_in' },

{ t:'nar', tx:'A copa acordava antes da casa. Às cinco e meia já havia fogo e pão.' },
{ t:'nar', tx:'Era o único cômodo quente de Velha Nidhaus, e cheirava a fermento, a cinza e a gordura de porco fria.' },
{ t:'nar', tx:'Antoniette desceu às seis, na terceira manhã, com o inventário parcial debaixo do braço.' },
{ t:'inn', tx:'Comer com os servos economiza duas semanas de observação.' },

{ t:'spr', ch:'dara', ex:'neutral', pos:'center' },
{ t:'nar', tx:'A cozinheira encheu uma caneca sem perguntar se ela queria. O barro estava quente demais para segurar pela lateral.' },
{ t:'dial', ch:'dara', tx:'Senhorita Vael. A copa é dos empregados.' },
{ t:'dial', ch:'antoniette', tx:'Eu sou empregada. Contrato de nove meses, pago por volume catalogado.' },
{ t:'pause' },
{ t:'nar', tx:'Dara olhou para ela por três segundos inteiros.' },
{ t:'spr', ch:'dara', ex:'guarded', pos:'center' },
{ t:'dial', ch:'dara', tx:'Dara. Cozinho aqui há dezenove anos.' },

{ t:'nar', tx:'Sentou do outro lado da mesa, o que não era obrigada a fazer.' },
{ t:'dial', ch:'dara', tx:'A senhorita vai querer saber os horários. Café às seis, almoço ao meio-dia, ceia às oito.' },
{ t:'dial', ch:'dara', tx:'Depois das oito a cozinha fecha e eu vou para o meu quarto.' },
{ t:'dial', ch:'antoniette', tx:'E se alguém tiver fome às dez?' },
{ t:'dial', ch:'dara', tx:'Ninguém tem.' },

{ t:'inn', tx:'Ela respondeu rápido demais para ser uma observação.' },
{ t:'inn', tx:'Foi uma regra.' },
{ t:'pause' },
{ t:'dial', ch:'antoniette', tx:'Ninguém tem fome, ou ninguém pede?' },
{ t:'pause' },
{ t:'nar', tx:'Dara pôs a caneca dela na mesa e demorou a soltar a alça.' },
{ t:'dial', ch:'dara', tx:'A senhorita pergunta bonito.' },
{ t:'nar', tx:'E não respondeu nem uma coisa nem outra.' },
{ t:'pause' },
{ t:'inn', tx:'Eu não entendi essa resposta.' },
{ t:'inn', tx:'Anotar assim mesmo. Sem interpretar.' },
{ t:'pause' },

{ t:'nar', tx:'Antoniette abriu o inventário parcial e pousou ao lado da caneca.' },
{ t:'dial', ch:'antoniette', tx:'A biblioteca tem quatro mil e duzentos volumes. Vou levar mais tempo do que o contrato previa.' },
{ t:'dial', ch:'dara', tx:'A biblioteca fica no lado sul.' },
{ t:'dial', ch:'antoniette', tx:'Fica.' },
{ t:'dial', ch:'dara', tx:'Bom.' },

{ t:'nar', tx:'Dara puxou de baixo do banco uma lata e conferiu o que tinha dentro sem tirar a tampa toda.' },
{ t:'dial', ch:'dara', tx:'Se a senhorita for a Marca Cinzenta antes de mim, traz cravo. Aqui não vendem.' },
{ t:'dial', ch:'antoniette', tx:'Cravo.' },
{ t:'dial', ch:'dara', tx:'Dezenove anos pedindo. Já virou passatempo.' },
{ t:'spr_hide', ch:'dara' },
{ t:'nar', tx:'Levantou e voltou para o fogo antes que a conversa pudesse continuar.' },
{ t:'inn', tx:'Eu não perguntei nada sobre o lado norte.' },

/* ======================================================================
   CENA 2 - A BIBLIOTECA - MANHA
   Proposito: Ren, o metodo de catalogacao, o contraponto normal.
   Saida: ele nao sabe de nada e isso e informacao.
   ====================================================================== */
{ t:'scene', id:'c2_biblioteca', chapter:'capitulo2', title:'A catalogação',
  bg:'bg_library', bgm:'bgm_nidhaus' },

{ t:'nar', tx:'O rapaz já estava lá quando ela chegou, empilhando volumes por altura.' },
{ t:'nar', tx:'A biblioteca cheirava a couro e a cola velha, e não cheirava a poeira. Alguém limpava aquilo.' },
{ t:'spr', ch:'ren', ex:'neutral', pos:'right' },
{ t:'dial', ch:'ren', tx:'A senhora Rabenfels disse que eu ajudo a senhorita. Sou Ren.' },
{ t:'dial', ch:'antoniette', tx:'Há quanto tempo você trabalha aqui?' },
{ t:'dial', ch:'ren', tx:'Cinco semanas.' },

{ t:'inn', tx:'Cinco semanas. Contratado pouco antes de mim.' },
{ t:'inn', tx:'Guardar isso. Não perguntar por quê.' },

{ t:'dial', ch:'antoniette', tx:'Empilhar por altura é bom para a estante. Não serve para catálogo.' },
{ t:'dial', ch:'ren', tx:'Serve para quê, então?' },
{ t:'dial', ch:'antoniette', tx:'Autor, assunto, data, estado da encadernação. Nessa ordem. Um volume por ficha.' },
{ t:'nar', tx:'Ele repetiu a ordem em voz baixa duas vezes e não errou mais.' },
{ t:'pause' },

{ t:'nar', tx:'Trabalharam três horas. Ren falava enquanto trabalhava, do jeito de quem nunca precisou aprender a ficar quieto.' },
{ t:'dial', ch:'ren', tx:'Minha mãe queria que eu fosse para a cidade. Aqui paga melhor.' },
{ t:'dial', ch:'ren', tx:'Junto três anos e compro uma parelha. Aí eu faço frete e não dependo de casa nenhuma.' },
{ t:'nar', tx:'Disse aquilo do jeito de quem já disse muitas vezes e ainda acredita.' },
{ t:'dial', ch:'ren', tx:'A senhora Rabenfels pagou seis meses adiantado. Isso é normal?' },
{ t:'dial', ch:'antoniette', tx:'Não.' },
{ t:'dial', ch:'ren', tx:'Ah.' },
{ t:'nar', tx:'Ele riu e voltou para a pilha.' },

{ t:'inn', tx:'Ele não fez a segunda pergunta.' },
{ t:'inn', tx:'Dezessete anos. A casa contratou dois estranhos em seis semanas e ele acha que o incomum é o adiantamento.' },
{ t:'spr_hide', ch:'ren' },

{ t:'arc', key:'caderno', label:'— Caderno Operacional — Entrada 4 —', lns:[
    'Assistente designado: Ren, 17 anos, contratado 5 semanas antes da minha chegada.',
    'Sem vínculo com a região. Sem parentes na casa. Sem curiosidade.',
    'A escolha de um assistente sem raiz local não é acidente.'
]},

/* ======================================================================
   CENA 3 - OS LIVROS DE CONTA - TARDE
   Proposito: o primeiro erro concreto no inventario.
   Saida: a numeracao continua e mesmo assim faltam dois anos.
   ====================================================================== */
{ t:'scene', id:'c2_livros_conta', chapter:'capitulo2', title:'Os livros de conta',
  bg:'bg_library', bgm:'bgm_archive' },

{ t:'nar', tx:'A quarta prateleira do lado leste guardava a administração da casa. Compras, salários, reparos.' },
{ t:'nar', tx:'Setenta e um volumes idênticos, encadernados no mesmo couro, numerados na lombada.' },
{ t:'sfx', id:'sfx_page_turn' },
{ t:'nar', tx:'Antoniette abriu o primeiro e reconheceu o formato. A Ordem usava um parecido.' },
{ t:'inn', tx:'Colunas de gasto, coluna de origem, assinatura mensal do administrador.' },

{ t:'nar', tx:'Catalogou dezenove volumes antes de parar.' },
{ t:'pause' },
{ t:'nar', tx:'Voltou ao volume onze e abriu no fim.' },
{ t:'nar', tx:'O volume onze fechava em março. O volume doze abria dois anos depois, em abril.' },

{ t:'inn', tx:'Dois anos sem registro de compra, salário ou reparo.' },
{ t:'inn', tx:'A casa não parou de comer nesses dois anos.' },

{ t:'nar', tx:'Conferiu as lombadas. Onze, doze, treze. A numeração não pulava.' },
{ t:'pause' },
{ t:'inn', tx:'Se dois volumes tivessem sido perdidos, a numeração pularia.' },
{ t:'inn', tx:'A numeração é contínua porque foi refeita depois.' },

{ t:'nar', tx:'Ela passou o polegar na lombada do doze. O couro estava um tom mais claro que o dos vizinhos, e liso onde os outros tinham grão.' },
{ t:'inn', tx:'Reencadernado.' },
{ t:'pause' },
{ t:'inn', tx:'Reencadernar dois volumes custa mais do que perder dois volumes.' },
{ t:'inn', tx:'Não consigo pensar em nenhum motivo para gastar dinheiro assim.' },
{ t:'nar', tx:'O polegar dela continuou sobre o couro claro até Ren falar.' },

{ t:'spr', ch:'ren', ex:'neutral', pos:'right' },
{ t:'dial', ch:'ren', tx:'Achou alguma coisa?' },
{ t:'nar', tx:'Antoniette fechou o volume antes de responder.' },
{ t:'dial', ch:'antoniette', tx:'Encadernação irregular. Acontece em coleção antiga.' },
{ t:'dial', ch:'ren', tx:'Anoto na ficha?' },
{ t:'dial', ch:'antoniette', tx:'Anota.' },
{ t:'spr_hide', ch:'ren' },

{ t:'inn', tx:'A primeira mentira em três dias. Anotada mentalmente, com a data.' },

/* ======================================================================
   CENA 4 - O PATIO - ENTARDECER
   Proposito: a regra da casa, dita sem ser dita. Fenn de novo.
   Saida: ninguem olha para a ala de estudos, e ninguem sabe que nao olha.
   ====================================================================== */
{ t:'scene', id:'c2_patio', chapter:'capitulo2', title:'O pátio',
  bg:'bg_nidhaus_gate', bgm:null },

{ t:'sfx', id:'sfx_wind' },
{ t:'nar', tx:'Ela cruzou o pátio às seis, quando os empregados atravessam para a cozinha.' },
{ t:'nar', tx:'A pedra devolvia o frio pelas solas. Cheirava a cavalo do lado da cocheira e a mais nada do outro lado.' },
{ t:'nar', tx:'Contou onze passagens em vinte minutos.' },
{ t:'pause' },
{ t:'nar', tx:'Onze pessoas passaram diante da porta nordeste. Nenhuma virou a cabeça.' },

{ t:'inn', tx:'Não é evitar. Evitar exige saber que se está evitando.' },
{ t:'inn', tx:'Eles simplesmente não olham. É como respirar.' },

{ t:'spr', ch:'fenn', ex:'neutral', pos:'left' },
{ t:'nar', tx:'Fenn apareceu com uma lanterna apagada na mão, cedo demais para acender.' },
{ t:'dial', ch:'fenn', tx:'Senhorita Vael. O pátio esfria rápido depois das seis.' },
{ t:'dial', ch:'antoniette', tx:'Estou vendo a fachada. A ala nordeste tem argamassa nova em cima de pedra velha.' },
{ t:'pause' },
{ t:'dial', ch:'fenn', tx:'Tem.' },
{ t:'dial', ch:'antoniette', tx:'Reforma recente?' },
{ t:'dial', ch:'fenn', tx:'Não que eu tenha visto.' },

{ t:'inn', tx:'Ele respondeu à pergunta que eu fiz e só a ela.' },
{ t:'inn', tx:'Fenn respondeu até "não que eu tenha visto". O resto ficou com ele.' },

{ t:'nar', tx:'Fenn acendeu a lanterna. Ainda havia luz suficiente para não precisar.' },
{ t:'dial', ch:'fenn', tx:'A ceia é às oito. Depois disso a copa fecha.' },
{ t:'dial', ch:'antoniette', tx:'A senhora Dara já me disse.' },
{ t:'dial', ch:'fenn', tx:'Então já sabe.' },
{ t:'pause' },
{ t:'dial', ch:'antoniette', tx:'Todo mundo aqui me diz a mesma coisa.' },
{ t:'dial', ch:'fenn', tx:'Casa grande. Sobra parede e falta assunto.' },
{ t:'nar', tx:'Foi a coisa mais parecida com uma piada que ela ouviu em três dias, e ele não sorriu ao dizer.' },
{ t:'spr_hide', ch:'fenn' },

{ t:'nar', tx:'Ele atravessou o pátio pelo lado sul, que é o caminho mais longo.' },

/* ======================================================================
   CENA 5 - A SECAO NORDESTE - NOITE
   Proposito: ela sobe. Encontra a lacuna documentada, nao explicada.
   Saida: a permissao de Aldric era um convite e ela sabe disso.
   ====================================================================== */
{ t:'scene', id:'c2_nordeste', chapter:'capitulo2', title:'A seção nordeste',
  bg:'bg_library_night', bgm:'bgm_archive' },

{ t:'nar', tx:'Às onze a casa fica quieta de um jeito que não é silêncio. É ausência de gente.' },
{ t:'sfx', id:'sfx_footsteps' },
{ t:'nar', tx:'Antoniette subiu ao segundo andar com uma vela e o caderno operacional.' },
{ t:'inn', tx:'Ele disse para trazer a ele antes de catalogar. Não disse para não subir.' },

{ t:'nar', tx:'As estantes do canto nordeste estavam viradas para dentro. Entre elas cabia uma pessoa de lado.' },

/* ----------------------------------------------------------------------
   PAGAMENTO DE aldric_pressed, gravada no Capitulo 1.
   Ela perguntou a ele o que deveria estar procurando. Ele reparou.
   Os dois ramos levam o "e se" ate um fim desagradavel diferente.
   ---------------------------------------------------------------------- */
{ t:'nar', tx:'Havia um banquinho encostado na estante do meio.', if:{ aldric_pressed:true } },
{ t:'nar', tx:'Na véspera não havia banquinho nenhum naquele canto.', if:{ aldric_pressed:true } },
{ t:'pause', if:{ aldric_pressed:true } },
{ t:'inn', tx:'Eu perguntei a ele o que eu deveria estar procurando.', if:{ aldric_pressed:true } },
{ t:'inn', tx:'Ele mandou trazer o banquinho.', if:{ aldric_pressed:true } },
{ t:'pause', if:{ aldric_pressed:true } },
{ t:'inn', tx:'Nada do que eu achar aqui vai ser descoberta minha.', if:{ aldric_pressed:true } },

{ t:'nar', tx:'A poeira do chão estava intacta até a marca do próprio sapato dela.', if:{ aldric_pressed:false } },
{ t:'inn', tx:'Ninguém subiu aqui desde que eu subi na semana passada.', if:{ aldric_pressed:false } },
{ t:'pause', if:{ aldric_pressed:false } },
{ t:'inn', tx:'Ele deu a permissão e não veio conferir se eu usei.', if:{ aldric_pressed:false } },
{ t:'inn', tx:'Ou confia demais, ou o que está aqui não preocupa ninguém.', if:{ aldric_pressed:false } },
{ t:'inn', tx:'As duas hipóteses são ruins de jeitos diferentes.', if:{ aldric_pressed:false } },

{ t:'nar', tx:'Livros de registro. O mesmo couro dos livros de conta do andar de baixo.' },
{ t:'sfx', id:'sfx_page_turn' },
{ t:'pause' },

{ t:'nar', tx:'Os volumes daquela estante guardavam os registros da própria família.' },
{ t:'nar', tx:'Nascimentos, mortes, casamentos, transferências de propriedade. Duzentos anos.' },
{ t:'inn', tx:'Isto deveria estar no cartório de Marca Cinzenta. Não em uma estante virada para a parede.' },

{ t:'nar', tx:'Ela procurou o intervalo dos dois anos que faltavam lá embaixo.' },
{ t:'pause' },
{ t:'nar', tx:'Estava lá. Completo. Duas páginas por mês, letra firme.' },
{ t:'pause' },
{ t:'nar', tx:'Ela leu o intervalo duas vezes procurando a razão de alguém guardar isto e queimar aquilo.' },
{ t:'nar', tx:'Não achou razão nenhuma.' },
{ t:'pause' },
{ t:'nar', tx:'No fim da segunda leitura já estava só lendo os nomes de gente que nasceu e morreu ali antes de ela existir.' },
{ t:'pause' },
{ t:'inn', tx:'Isso não é trabalho. Voltar ao trabalho.' },

{ t:'inn', tx:'Os registros de família dos dois anos existem.' },
{ t:'inn', tx:'Os livros de conta dos mesmos dois anos foram retirados e a numeração foi refeita.' },
{ t:'pause' },
{ t:'inn', tx:'Alguém escolheu o que apagar. Escolheu o dinheiro.' },

{ t:'nar', tx:'Ela leu os dois anos de registro de família inteiros. Levou quarenta minutos.' },
{ t:'nar', tx:'Nada fora do comum. Três nascimentos, duas mortes, um casamento.' },
{ t:'inn', tx:'Nada fora do comum é uma informação.' },
{ t:'inn', tx:'Um documento que não explica a ausência do outro está fazendo isso de propósito.' },

{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'A vela chegou ao fim e o cheiro de pavio apagado ficou no corredor atrás dela.' },
{ t:'nar', tx:'Desceu no escuro, que já conhecia.' },

{ t:'inn', tx:'Ele me deu permissão para subir aqui.' },
{ t:'pause' },
{ t:'inn', tx:'Ou ele não sabe o que tem aqui, ou ele quer que eu saiba.' },
{ t:'inn', tx:'Aldric Rabenfels sabe o que tem em cada estante desta casa.' },

/* ======================================================================
   CENA 6 - A BIBLIOTECA - MANHA SEGUINTE
   Proposito: presenca das gemeas por objeto, nao por pessoa.
   Saida: alguem le aqui de madrugada e devolve o livro no lugar certo.
   ====================================================================== */
{ t:'scene', id:'c2_devolucao', chapter:'capitulo2', title:'O livro devolvido',
  bg:'bg_library', bgm:'bgm_nidhaus' },

{ t:'nar', tx:'Ela catalogava a terceira prateleira do lado oeste quando percebeu.' },
{ t:'nar', tx:'Um volume de anatomia comparada, catalogado por ela na véspera, estava fora da ordem.' },
{ t:'inn', tx:'Fora da ordem por uma posição. Trocado com o vizinho.' },
{ t:'pause' },

{ t:'sfx', id:'sfx_page_turn' },
{ t:'nar', tx:'Abriu. Havia um marcador de papel dobrado entre as páginas cento e doze e cento e treze.' },
{ t:'nar', tx:'Sistema circulatório. Diagrama de irrigação de órgão.' },

{ t:'spr', ch:'ren', ex:'neutral', pos:'right' },
{ t:'dial', ch:'ren', tx:'Fui eu que arrumei essa prateleira. Devo ter trocado.' },
{ t:'dial', ch:'antoniette', tx:'Você leu este volume?' },
{ t:'dial', ch:'ren', tx:'Não sei ler direito, senhorita. Sei as letras.' },
{ t:'pause' },
{ t:'dial', ch:'antoniette', tx:'Obrigada, Ren.' },
{ t:'spr_hide', ch:'ren' },

{ t:'nar', tx:'O marcador era um pedaço de papel de carta cortado com régua.' },
{ t:'inn', tx:'Quem cortou tinha pressa e mesmo assim usou régua.' },

{ t:'nar', tx:'Ela devolveu o volume à posição correta e continuou catalogando.' },
{ t:'pause' },
{ t:'nar', tx:'Na manhã seguinte o volume estava de novo trocado com o vizinho, e o marcador na mesma página.' },

{ t:'inn', tx:'Quem arruma erra uma vez. Isto tem hora marcada.' },
{ t:'inn', tx:'Alguém lê nesta biblioteca de madrugada e devolve o livro quase no lugar certo.' },
{ t:'pause' },
{ t:'inn', tx:'Quase.' },

/* ======================================================================
   ESCOLHA - A LACUNA
   A: distancia operacional mantida
   B: investigacao cruzada
   C: copia integral para o arquivo pessoal
   ====================================================================== */
{ t:'scene', id:'c2_relatorio', chapter:'capitulo2', title:'O segundo relatório',
  bg:'bg_antoniette_room', bgm:null },

{ t:'nar', tx:'O segundo relatório para Matheo vencia naquela noite.' },
{ t:'nar', tx:'Ela tinha o inventário parcial, a lacuna dos dois anos e um marcador de papel na mesa.' },

{ t:'cho', id:'cap2_lacuna', prompt:'A LACUNA', opts:[
  { id:'C',
    tx:'Copiar a página inteira à mão. O que a Ordem receber é outro assunto.',
    flags:{ ledger_report:'C', ledger_crossref:false, ledger_copied:true, archive_seed:true },
    routes:{ answer: 1, hope: 1 },
    then: C2_ESCOLHA_C },
  { id:'B',
    tx:'Cruzar com o inventário de pessoal e datar o intervalo.',
    flags:{ ledger_report:'B', ledger_crossref:true, ledger_copied:false },
    routes:{ answer: 2 },
    then: C2_ESCOLHA_B },
  { id:'A',
    tx:'Registrar como irregularidade administrativa e seguir o contrato.',
    flags:{ ledger_report:'A', ledger_crossref:false, ledger_copied:false },
    routes:{ loss: 1 },
    then: C2_ESCOLHA_A }
]},

/* ======================================================================
   CENA FINAL - QUARTO DE ANTONIETTE - MADRUGADA
   ====================================================================== */
{ t:'scene', id:'c2_madrugada', chapter:'capitulo2', title:'Madrugada',
  bg:'bg_antoniette_room' },

{ t:'nar', tx:'Uma e meia. O relatório lacrado na beira da mesa.' },
{ t:'nar', tx:'Da janela via-se o pátio, a porta nordeste e a corrente sem cadeado.' },
{ t:'pause' },

{ t:'nar', tx:'Havia luz na ala de estudos.' },
{ t:'inn', tx:'Terceira noite seguida. Sempre a mesma janela, sempre depois da uma.' },

{ t:'nar', tx:'A luz se apagou às duas e dez.' },
{ t:'nar', tx:'Onze minutos depois, alguém atravessou o pátio até a porta da biblioteca.' },
{ t:'inn', tx:'Passos curtos. Peso de criança.' },
{ t:'pause' },
{ t:'inn', tx:'Ninguém acompanhando.' },
{ t:'pause' },
{ t:'inn', tx:'A copa fecha às oito.' },
{ t:'pause' },
{ t:'inn', tx:'Então ela não está descendo para comer.' },
{ t:'nar', tx:'Foi a única conclusão que ela tirou naquela noite, e estava errada.' },

{ t:'nar', tx:'Antoniette ficou na janela até o pátio esvaziar.' },
{ t:'nar', tx:'Depois abriu o caderno operacional e escreveu uma linha.' },

{ t:'arc', key:'caderno', label:'— Caderno Operacional — Entrada 9 —', lns:[
    'Duas crianças de oito anos nesta casa.',
    'Uma delas sai sozinha às duas e vinte da manhã e ninguém vai atrás.',
    'Isso significa que é permitido.'
]},

/* ----------------------------------------------------------------------
   A TROCA DO CAPITULO 2 (docs/biblia_narrativa_rabenfels.md).
   Ela ganha a lacuna dos dois anos. Entrega a honestidade operacional.
   O preco tem de ficar visivel no fim do capitulo, e nao inferido.
   ---------------------------------------------------------------------- */
{ t:'pause' },
{ t:'nar', tx:'Depois releu o relatório lacrado na beira da mesa.' },
{ t:'nar', tx:'Não tinha uma linha falsa dentro dele.' },
{ t:'pause' },
{ t:'inn', tx:'E não tem a entrada nove.' },
{ t:'inn', tx:'Em oito anos de serviço eu nunca mandei um relatório sabendo o que tinha ficado de fora.' },
{ t:'pause' },
{ t:'nar', tx:'Deixou os dois na mesa, alinhou as lombadas e não abriu nenhum.' },
{ t:'inn', tx:'Dois meses.' },

{ t:'sfx', id:'sfx_candle' },
{ t:'nar', tx:'Apagou a vela.' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Segundo mês em Velha Nidhaus.', line2:'A casa começou a responder.',
  chapter:'capitulo2' },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.CHAPTER2; }
