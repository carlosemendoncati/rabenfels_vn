/* ==========================================================================
   ARQUIVO RABENFELS - js/data/per11.js
   ROTA PERDA - CAPITULO 11: "As Tr\u00eas Moedas"

   Somente dados. TODO BEAT CARREGA if:{ rota:'perda' }.

   QUANDO: a noite de nove para dez de agosto, na estrada.

   O PENSAMENTO UNICO (Zinsser, unidade):
   "O cocheiro esperou dez."

   ------------------------------------------------------------------
   O NUMERO QUE ELA VAI CARREGAR
   ------------------------------------------------------------------
   Onze minutos de atraso. O cocheiro contratado esperou dez e foi
   embora. E aritmetica limpa, e ela vai fazer essa aritmetica pelo
   resto da vida - que sao doze semanas.

   >>> E A ARITMETICA ESTA ERRADA, E ELA NUNCA VAI SABER. <<<
   Klara para onze minutos antes da ponte. Nas outras rotas Klara para
   tambem, sem atraso nenhum, com o cocheiro no lugar e o horario
   batendo. A causa nunca foi o relogio.

   O jogador que percorreu a rota Esperanca ja sabe disso. O que
   comecou por aqui vai descobrir no Capitulo 12, pela boca de Carmine,
   em uma linha que Antoniette nao entende.

   NENHUM BEAT DESTE CAPITULO PODE CORRIGIR A CONTA. O capitulo inteiro
   e ela montando um erro com precisao.

   Le 'taught' para a textura da caminhada.

   Cinco cenas: C1 a estrada, C2 o ponto de encontro vazio, C3 a pe,
   C4 a floresta, C5 a farpa.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

var R = { rota: 'perda' };

RBF.PER11 = [

{ t:'chap', num:'CAP\u00cdTULO 11', name:'AS TR\u00caS MOEDAS', chapter:'per11', if:R },
{ t:'fade_out', if:R },

/* ======================================================================
   C1 - A ESTRADA
   Le 'taught'. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'per11_estrada', chapter:'per11', title:'A estrada',
  bg:'bg_grey_march_road', bgm:null, if:R },
{ t:'fade_in', if:R },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center', if:R },

{ t:'nar', tx:'A estrada do vale \u00e0 meia-noite \u00e9 mais clara do que se espera. A lua bate na pedra molhada.', if:R },
{ t:'nar', tx:'Antoniette andou mais r\u00e1pido do que tinha calculado para uma crian\u00e7a, e Klara acompanhou sem reclamar.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita conferiu o hor\u00e1rio da carro\u00e7a?', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'antoniette', tx:'Tr\u00eas vezes.', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o est\u00e1 certo.', if:{ rota:'perda', taught:'A' } },

{ t:'dial', ch:'klara', tx:'Eu devia ter agradecido antes de sair.', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'antoniette', tx:'Agradece depois.', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'klara', tx:'Depois n\u00e3o vale. Eu tinha de dizer antes.', if:{ rota:'perda', taught:'B' } },

{ t:'dial', ch:'klara', tx:'O rio fica de que lado do sol?', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'antoniette', tx:'Esquerda, de manh\u00e3.', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'klara', tx:'Est\u00e1 no livro. Eu queria conferir com a senhorita.', if:{ rota:'perda', taught:'C' } },

{ t:'pause', if:R },
{ t:'nar', tx:'Passaram a aldeia com onze minutos de atraso sobre o papel.', if:R },
{ t:'nar', tx:'Quinze casas caiadas, um po\u00e7o, roupa no varal, e as janelas fechadas apesar do calor de agosto.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'O cocheiro \u00e9 de Alsbeck e cobra por espera.', if:R },
{ t:'inn', tx:'Ele vai esperar.', if:R },

/* ======================================================================
   C2 - O PONTO DE ENCONTRO
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'per11_ponto', chapter:'per11', title:'O cruzamento',
  bg:'bg_grey_march_road', keepSprites:true, if:R },

{ t:'nar', tx:'O ponto de encontro era o cruzamento da estrada do vale com a de Alsbeck, marcado por um mour\u00e3o de pedra.', if:R },
{ t:'nar', tx:'Alcan\u00e7aram o mour\u00e3o onze minutos atrasadas.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'N\u00e3o havia carro\u00e7a.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette andou at\u00e9 o mour\u00e3o e passou a m\u00e3o na pedra, o que n\u00e3o servia para nada.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Havia esterco fresco na terra do lado leste e o sulco de uma roda que virou ali e voltou.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ele veio.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ele veio e esperou.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela ajoelhou e mediu o esterco com dois dedos, porque esterco esfria numa taxa que d\u00e1 para estimar.', if:R },
{ t:'nar', tx:'Estimou dez minutos e conferiu a estimativa contra o pr\u00f3prio rel\u00f3gio, que \u00e9 o que se faz com estimativa.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Ele foi embora?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Foi.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'H\u00e1 quanto tempo?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette abriu a boca para dar o n\u00famero e fechou.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Pouco.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Foi a primeira vez em cinco anos que ela deu a uma crian\u00e7a um n\u00famero redondo em vez do n\u00famero.', if:R },

/* ======================================================================
   C3 - A PE
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'per11_ape', chapter:'per11', title:'A p\u00e9',
  bg:'bg_grey_march_road', keepSprites:true, if:R },

{ t:'nar', tx:'Do mour\u00e3o at\u00e9 a ponte de Alsbeck s\u00e3o tr\u00eas quil\u00f4metros. Da ponte at\u00e9 o rio, mais dois.', if:R },
{ t:'nar', tx:'O barco era \u00e0s seis e faltavam cinco horas e vinte.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'A p\u00e9, com uma crian\u00e7a, cinco quil\u00f4metros d\u00e3o uma hora e quarenta.', if:R },
{ t:'inn', tx:'D\u00e1.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela refez a divis\u00e3o no verso do papel. O resultado continuou o mesmo.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Vamos andando. D\u00e1 tempo.', if:R },
{ t:'dial', ch:'klara', tx:'Eu sei.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A menina disse aquilo sem levantar a cabe\u00e7a e sem parar de andar, e Antoniette n\u00e3o perguntou como ela sabia.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Klara trocou o saco de pano de m\u00e3o duas vezes, e da segunda vez pegou com a m\u00e3o que j\u00e1 estava carregando.', if:R },
{ t:'nar', tx:'Antoniette reparou e n\u00e3o disse nada, porque dizer teria parado a caminhada.', if:R },

/* ======================================================================
   C3b - OS QUARENTA MINUTOS

   Aqui estava escrito "Andaram quarenta minutos. Klara nao pediu para
   descansar uma vez." - uma linha de narracao no lugar da unica hora da
   vida daquela menina em que ninguem esta medindo ela.

   A primeira reescrita errou de outro jeito: virou epigrama. Tres falas
   com remate perfeito, do tipo que ninguem diz andando no escuro.

   A REGRA DESTA CENA: nenhuma fala pode ser citavel. Se der para tirar
   do contexto e colar num cartaz, esta errada.

   Elas ganharam. Por quarenta minutos, elas ganharam - e a conversa e a
   de duas pessoas que escaparam e ainda nao sabem o que fazer com isso.

   O MEDO NAO E CLIMAX. Sai no meio de outra coisa, mal, e a propria
   menina muda de assunto oferecendo pao.

   NENHUMA LINHA AQUI PODE AVISAR O QUE VEM DEPOIS.
   ====================================================================== */
{ t:'spr', ch:'klara', ex:'neutral', pos:'right', if:R },
{ t:'spr', ch:'antoniette', ex:'neutral', pos:'left', if:R },

{ t:'nar', tx:'A estrada de terra ia reta por um tempo e depois deixava de ir.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Se cansar, voc\u00ea diz.', if:R },
{ t:'dial', ch:'klara', tx:'Eu digo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Andaram um tempo sem dizer nada, e n\u00e3o foi um sil\u00eancio pesado. Foi o sil\u00eancio de duas pessoas andando.', if:R },

{ t:'dial', ch:'klara', tx:'Eu peguei p\u00e3o.', if:R },
{ t:'dial', ch:'antoniette', tx:'Pegou quanto?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Seis.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Seis p\u00e3es.', if:R },
{ t:'dial', ch:'klara', tx:'Foi muito, n\u00e9.', if:R },
{ t:'dial', ch:'antoniette', tx:'Foi.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Klara ajeitou o saco no ombro com as duas m\u00e3os, do jeito de quem carrega mais peso do que devia e n\u00e3o vai dizer.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Eu n\u00e3o sabia quantos dias.', if:R },
{ t:'dial', ch:'antoniette', tx:'Dois.', if:R },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o seis t\u00e1 bom.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Seis n\u00e3o estava bom para dois dias, e nenhuma das duas fez essa conta em voz alta.', if:R },

{ t:'dial', ch:'klara', tx:'Quanto \u00e9 um quil\u00f4metro?', if:R },
{ t:'dial', ch:'antoniette', tx:'Mil metros.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Isso eu sei. Quanto \u00e9 andando?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Uns doze minutos.', if:R },
{ t:'dial', ch:'klara', tx:'Doze certos?', if:R },
{ t:'dial', ch:'antoniette', tx:'Doze mais ou menos.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o n\u00e3o \u00e9 doze.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette abriu a boca para explicar o que \u00e9 uma m\u00e9dia e desistiu no meio.', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o \u00e9 doze.', if:R },
{ t:'dial', ch:'klara', tx:'T\u00e1.', if:R },

{ t:'nar', tx:'Passou um cheiro de \u00e1gua parada e Klara achou que era o rio. N\u00e3o era. Faltavam cinco quil\u00f4metros para o rio.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Cavalo sabe nadar.', if:R },
{ t:'dial', ch:'antoniette', tx:'Sabe.', if:R },
{ t:'dial', ch:'klara', tx:'Viu.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Mas n\u00e3o muito longe.', if:R },
{ t:'dial', ch:'klara', tx:'Quanto \u00e9 muito longe?', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o sei.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o a senhorita n\u00e3o sabe se n\u00e3o \u00e9 longe.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o sei.', if:R },
{ t:'dial', ch:'klara', tx:'T\u00e1.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela ficou satisfeita com aquilo por uns bons cem metros.', if:R },

{ t:'nar', tx:'No terceiro quil\u00f4metro Klara come\u00e7ou a andar diferente, apoiando de lado.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'A bota.', if:R },
{ t:'dial', ch:'klara', tx:'N\u00e3o \u00e9 nada.', if:R },
{ t:'dial', ch:'antoniette', tx:'Senta.', if:R },
{ t:'dial', ch:'klara', tx:'N\u00e3o \u00e9 nada.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Sentaram.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A bota era um n\u00famero menor do que devia ser, e era um n\u00famero menor desde abril.', if:R },
{ t:'nar', tx:'Ningu\u00e9m tinha medido o p\u00e9 dela desde abril, e naquela casa mediam tudo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette dobrou a meia por cima do calcanhar e refez o la\u00e7o mais frouxo.', if:R },
{ t:'nar', tx:'A menina n\u00e3o reclamou e n\u00e3o agradeceu, e ficou olhando o pr\u00f3prio p\u00e9 como quem confere servi\u00e7o.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Melhorou.', if:R },
{ t:'dial', ch:'antoniette', tx:'Melhorou o suficiente?', if:R },
{ t:'dial', ch:'klara', tx:'Melhorou.', if:R },

{ t:'nar', tx:'Andaram mais um tempo.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita j\u00e1 fugiu?', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'J\u00e1.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'J\u00e1 ou n\u00e3o?', if:R },
{ t:'dial', ch:'antoniette', tx:'Uma vez. Eu tinha nove anos.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'E foi longe?', if:R },
{ t:'dial', ch:'antoniette', tx:'At\u00e9 a cerca.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A cerca de qu\u00ea?', if:R },
{ t:'dial', ch:'antoniette', tx:'Do quintal.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Klara riu com a boca fechada primeiro. Depois desistiu e riu direito, alto, na estrada vazia.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Foi a primeira vez em cinco anos que Antoniette ouviu aquilo.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'At\u00e9 a cerca do quintal.', if:R },
{ t:'dial', ch:'antoniette', tx:'At\u00e9 a cerca do quintal.', if:R },
{ t:'dial', ch:'klara', tx:'E depois?', if:R },
{ t:'dial', ch:'antoniette', tx:'Depois eu voltei porque deu fome.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Klara riu de novo, e dessa vez foi s\u00f3 o barulho, sem gra\u00e7a nenhuma junto.', if:R },

{ t:'nar', tx:'Ela correu vinte passos \u00e0 frente e voltou, sem motivo nenhum.', if:R },
{ t:'dial', ch:'antoniette', tx:'Guarda o f\u00f4lego.', if:R },
{ t:'dial', ch:'klara', tx:'Eu tenho muito.', if:R },
{ t:'nar', tx:'Correu de novo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette riu uma vez, curto, e depois olhou em volta para ver se algu\u00e9m tinha ouvido.', if:R },
{ t:'nar', tx:'N\u00e3o havia ningu\u00e9m em cinco quil\u00f4metros. Ela olhou assim mesmo.', if:R },

/* ---- quem ela foi ---------------------------------------------------

   Em quatro mil e quinhentos beats, Antoniette nao diz uma frase sobre a
   propria vida. Ela narra a obra inteira e e a unica pessoa sobre quem a
   obra nao conta nada, porque fora daqui ela esta sempre de servico.

   E aqui o dispositivo do canon dispara, uma vez so: ela lista tres
   gestos da mae, e sao os TRES QUE ELA FAZ COM A KLARA. A menina
   reconhece. Ela nega, e nega com as palavras exatas do proprio caderno.

   ELA NAO PODE PERCEBER. Se perceber, o dispositivo morre.
   -------------------------------------------------------------------- */
{ t:'dial', ch:'klara', tx:'A senhorita era como?', if:R },
{ t:'dial', ch:'antoniette', tx:'Como assim, como?', if:R },
{ t:'dial', ch:'klara', tx:'Antes. Quando era do meu tamanho.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu morava em Alsbeck. Meu pai trabalhava no cart\u00f3rio da pra\u00e7a.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Isso n\u00e3o \u00e9 o que eu perguntei.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'N\u00e3o era.', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita tinha amiga?', if:R },
{ t:'dial', ch:'antoniette', tx:'Tinha uma.', if:R },
{ t:'dial', ch:'klara', tx:'Como chamava?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Bettine.', if:R },
{ t:'dial', ch:'klara', tx:'E ela era como?', if:R },
{ t:'dial', ch:'antoniette', tx:'Falava demais.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Igual eu.', if:R },
{ t:'dial', ch:'antoniette', tx:'Um pouco.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'E cad\u00ea ela?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o sei. Casou, acho.', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita n\u00e3o escreve?', if:R },
{ t:'dial', ch:'antoniette', tx:'Faz nove anos que n\u00e3o.', if:R },
{ t:'dial', ch:'klara', tx:'Por qu\u00ea?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Porque n\u00e3o d\u00e1 para escrever para as pessoas neste trabalho.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Klara fez cara de quem est\u00e1 resolvendo aquilo e n\u00e3o resolveu.', if:R },

{ t:'dial', ch:'klara', tx:'E a senhorita virou isso como?', if:R },
{ t:'dial', ch:'antoniette', tx:'Isso o qu\u00ea?', if:R },
{ t:'dial', ch:'klara', tx:'Isso. O que a senhorita \u00e9.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Um homem me perguntou uma coisa numa fila.', if:R },
{ t:'dial', ch:'klara', tx:'Que coisa?', if:R },
{ t:'dial', ch:'antoniette', tx:'Se eu sabia por que a fila estava parada.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'E a senhorita sabia?', if:R },
{ t:'dial', ch:'antoniette', tx:'Sabia. O escritur\u00e1rio da frente estava com o carimbo errado e ningu\u00e9m tinha reparado.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'E a\u00ed?', if:R },
{ t:'dial', ch:'antoniette', tx:'E a\u00ed ele me ofereceu emprego.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'S\u00f3 por causa do carimbo?', if:R },
{ t:'dial', ch:'antoniette', tx:'S\u00f3 por causa do carimbo.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Isso \u00e9 pouco.', if:R },
{ t:'dial', ch:'antoniette', tx:'\u00c9.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela tinha dezessete anos e achou que era muito.', if:R },

/* Ela nao diz o nome dele. O jogador tambem nao precisa saber ainda:
   quem conta e o proprio Matheo no Epilogo, seis anos depois, e a
   cena la nao anuncia que esta respondendo a esta. */
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Como ele chamava?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette continuou andando.', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita n\u00e3o lembra o nome dele?', if:R },
{ t:'dial', ch:'antoniette', tx:'Lembro.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Ele \u00e9 da Ordem. Eu n\u00e3o falo de gente da Ordem com quem n\u00e3o \u00e9.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita falou da sua m\u00e3e.', if:R },
{ t:'dial', ch:'antoniette', tx:'Minha m\u00e3e n\u00e3o era da Ordem.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Klara andou dois passos e mudou de assunto, que \u00e9 como crian\u00e7a desiste: troca o assunto e n\u00e3o a opini\u00e3o.', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita tinha quem em casa?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette andou um pouco antes de responder.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Minha m\u00e3e. At\u00e9 os seis.', if:R },
{ t:'dial', ch:'klara', tx:'Ah.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Desculpa.', if:R },
{ t:'dial', ch:'antoniette', tx:'Faz tempo.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita lembra dela?', if:R },
{ t:'dial', ch:'antoniette', tx:'De umas coisas.', if:R },
{ t:'dial', ch:'klara', tx:'Que coisas?', if:R },
{ t:'pause', if:R },
/* Era "levou tempo, e nao foi o tempo de quem nao lembra" - a mesma
   construcao que o Epilogo usa para a Klara, seis anos depois. La ela
   trabalha; aqui era eu reusando uma frase de que gostei. */
{ t:'nar', tx:'Antoniette demorou para responder.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Ela n\u00e3o riscava. Quando eu errava a li\u00e7\u00e3o ela escrevia o certo do lado, na mesma tinta.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'E reparava se eu tinha comido. N\u00e3o perguntava. Olhava o prato.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'E sabia de que lado eu dormia. Eu nunca contei. Ela sabia.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Andaram uns vinte passos.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita faz essas tr\u00eas.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Fa\u00e7o n\u00e3o.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Faz.', if:R },
{ t:'pause', if:R },
/* Aqui havia uma narracao listando as tres explicacoes do caderno,
   para o leitor fechar a conta. Fechar a conta e trabalho do leitor.
   "E metodo" e a frase exata com que o canon diz que ela classifica
   esses gestos, e ela sozinha basta. */
{ t:'dial', ch:'antoniette', tx:'\u00c9 m\u00e9todo.', if:R },
{ t:'dial', ch:'klara', tx:'T\u00e1.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Klara n\u00e3o insistiu.', if:R },

{ t:'dial', ch:'klara', tx:'Como ela chamava?', if:R },
{ t:'dial', ch:'antoniette', tx:'Maren.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Maren.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A menina repetiu o nome uma vez, baixo, do jeito de quem est\u00e1 guardando.', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita gosta da casa?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette tinha uma resposta pronta para essa pergunta havia cinco anos, e ela servia para qualquer pessoa daquela casa que perguntasse.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Eu tamb\u00e9m n\u00e3o.', if:R },

{ t:'nar', tx:'Voltaram ao passo normal.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita j\u00e1 dormiu numa cama que n\u00e3o \u00e9 sua?', if:R },
{ t:'dial', ch:'antoniette', tx:'J\u00e1.', if:R },
{ t:'dial', ch:'klara', tx:'E d\u00e1?', if:R },
{ t:'dial', ch:'antoniette', tx:'D\u00e1.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Eu n\u00e3o sei se d\u00e1.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'L\u00e1 em casa eu durmo e \u00e0s vezes eu acordo e tem gente no quarto. N\u00e3o \u00e9 gente ruim. \u00c9 gente do trabalho.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Eles medem.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu sei.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Uma vez eu acordei no meio e fiquei quieta, porque se eu mexer eles come\u00e7am de novo e demora mais.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita quer p\u00e3o?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette ficou com aquilo na m\u00e3o e sem lugar nenhum onde p\u00f4r.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Eu peguei seis.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu sei.', if:R },
{ t:'dial', ch:'klara', tx:'Foi muito.', if:R },

{ t:'nar', tx:'Um pouco depois Antoniette tirou o l\u00e1pis do bolso do casaco.', if:R },
{ t:'nar', tx:'Levou o l\u00e1pis at\u00e9 a altura do papel e parou ali.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Altera\u00e7\u00e3o de padr\u00e3o de sono. Relato direto de procedimento.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Guardou o l\u00e1pis sem escrever.', if:R },
{ t:'nar', tx:'Foi a primeira vez em cinco anos, e ela n\u00e3o soube dizer a si mesma por qu\u00ea.', if:R },

{ t:'nar', tx:'Andaram mais uns quinhentos metros.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Klara.', if:R },
{ t:'dial', ch:'klara', tx:'Oi.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Aquilo de acordar no meio.', if:R },
{ t:'dial', ch:'klara', tx:'Aham.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette tinha passado cinco anos escrevendo, e n\u00e3o tinha o resto da frase.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita quer que eu carregue o saco?', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o.', if:R },
{ t:'dial', ch:'klara', tx:'Eu carrego.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Carregou.', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita vai fazer o qu\u00ea depois?', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o sei.', if:R },
{ t:'dial', ch:'klara', tx:'Como n\u00e3o sabe?', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o sei mesmo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Era verdade, e era a primeira resposta inteiramente verdadeira que ela deu naquela noite.', if:R },
{ t:'pause', if:R },
/* ---- a profiss\u00e3o que talvez ainda pudesse existir --------------------

   Cena escrita pelo autor em 25/08/2026. Substitui a vers\u00e3o curta que
   eu tinha posto aqui \u2014 quatro falas e um "Antoniette n\u00e3o corrigiu essa
   parte" \u2014 e \u00e9 o que o resto da rota estava pedindo.

   REGRAS DELA, do pr\u00f3prio autor:
   - Antoniette N\u00c3O faz discurso sobre o sentido de ser escriba.
   - Klara N\u00c3O entende totalmente o M\u00e9todo Matheo.
   - A Academia aparece primeiro como um lugar comum da vida de
     Antoniette, n\u00e3o como um s\u00edmbolo.
   - Pela primeira vez Antoniette considera um futuro que exige mais
     de amanh\u00e3.
   - Nenhuma fala deve soar como despedida.
   - Liara continua inclu\u00edda nos planos de Klara. Antoniette n\u00e3o corrige.
   - Antoniette foi a \u00faltima pessoa a cursar a mat\u00e9ria de Matheo com
     desempenho realmente alto. Isso \u00e9 um fato administrativo para ela,
     n\u00e3o motivo de orgulho.
   - O "m\u00e9todo" da m\u00e3e e o M\u00e9todo Matheo N\u00c3O s\u00e3o a mesma coisa.
     Antoniette usa a mesma palavra para ambos porque \u00e9 assim que ela
     organiza o mundo.

   Depende do bloco da inf\u00e2ncia, acima: "O do carimbo veio antes" e "Era
   a segunda vez naquela noite" s\u00f3 funcionam depois dele.
   -------------------------------------------------------------------- */

{ t:'dial', ch:'klara', tx:'A senhorita pode ser professora.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Posso?', if:R },
{ t:'dial', ch:'klara', tx:'Pode.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'De qu\u00ea?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'De escrever.', if:R },
{ t:'dial', ch:'antoniette', tx:'Isso \u00e9 uma mat\u00e9ria muito ruim.', if:R },
{ t:'dial', ch:'klara', tx:'Por qu\u00ea?', if:R },
{ t:'dial', ch:'antoniette', tx:'Porque primeiro eu teria que ensinar voc\u00ea a segurar o l\u00e1pis direito.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Eu seguro direito.', if:R },
{ t:'dial', ch:'antoniette', tx:'Voc\u00ea aperta.', if:R },
{ t:'dial', ch:'klara', tx:'\u00c9 para n\u00e3o cair.', if:R },
{ t:'dial', ch:'antoniette', tx:'O l\u00e1pis n\u00e3o tenta fugir.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Klara olhou para a pr\u00f3pria m\u00e3o como se Antoniette tivesse acabado de acusar o l\u00e1pis de alguma coisa.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita me ensinaria?', if:R },
{ t:'dial', ch:'antoniette', tx:'A segurar o l\u00e1pis?', if:R },
{ t:'dial', ch:'klara', tx:'N\u00e3o. A fazer o que a senhorita faz.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Ser escriba?', if:R },
{ t:'dial', ch:'klara', tx:'\u00c9.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette levou alguns passos para responder.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Posso ensinar uma parte.', if:R },
{ t:'dial', ch:'klara', tx:'Qual parte?', if:R },
{ t:'dial', ch:'antoniette', tx:'A parte que se ensina.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'E tem parte que n\u00e3o se ensina?', if:R },
{ t:'dial', ch:'antoniette', tx:'Tem parte que ningu\u00e9m conseguiu organizar ainda.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita organizou?', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o.', if:R },
{ t:'dial', ch:'klara', tx:'Mas a senhorita organiza tudo.', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o tudo.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Klara aceitou a corre\u00e7\u00e3o com mais facilidade do que Antoniette.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Ent\u00e3o come\u00e7a pela parte que se ensina.', if:R },
{ t:'dial', ch:'antoniette', tx:'Agora?', if:R },
{ t:'dial', ch:'klara', tx:'A gente est\u00e1 andando.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu reparei.', if:R },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o d\u00e1.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette olhou a estrada. N\u00e3o havia quadro, mesa, pena, tinta ou qualquer outra coisa que justificasse uma aula.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'T\u00e1.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Primeira coisa: voc\u00ea n\u00e3o escreve o que acha que aconteceu.', if:R },
{ t:'dial', ch:'klara', tx:'Escreve o que aconteceu.', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'N\u00e3o?', if:R },
{ t:'dial', ch:'antoniette', tx:'Voc\u00ea escreve o que consegue sustentar que aconteceu.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'\u00c9 diferente?', if:R },
{ t:'dial', ch:'antoniette', tx:'Muito.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'O cocheiro veio.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Veio.', if:R },
{ t:'dial', ch:'klara', tx:'Como eu sustento?', if:R },
{ t:'dial', ch:'antoniette', tx:'Sulco da roda. Esterco fresco. Marca de ferradura na borda leste.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Tr\u00eas coisas.', if:R },
{ t:'dial', ch:'antoniette', tx:'Tr\u00eas coisas.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E ele esperou.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Esperou.', if:R },
{ t:'dial', ch:'klara', tx:'Como sustenta?', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette olhou para a estrada por tempo demais para uma pergunta t\u00e3o simples.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'A roda parou no cruzamento antes de voltar.', if:R },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o ele esperou.', if:R },
{ t:'dial', ch:'antoniette', tx:'Sim.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela n\u00e3o disse dez.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'\u00c9 isso que o Matheo ensinava?', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette virou a cabe\u00e7a.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Onde voc\u00ea ouviu esse nome?', if:R },
{ t:'dial', ch:'klara', tx:'No seu livro.', if:R },
{ t:'dial', ch:'antoniette', tx:'Qual livro?', if:R },
{ t:'dial', ch:'klara', tx:'O pequeno. De capa marrom.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette tinha tr\u00eas livros pequenos de capa marrom.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Tem escrito M\u00e9todo Matheo no come\u00e7o.', if:R },
{ t:'dial', ch:'antoniette', tx:'Voc\u00ea abriu meu manual.', if:R },
{ t:'dial', ch:'klara', tx:'Abri.', if:R },
{ t:'dial', ch:'antoniette', tx:'Sem pedir.', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita estava dormindo.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Isso n\u00e3o melhora.', if:R },
{ t:'dial', ch:'klara', tx:'Eu n\u00e3o sujei.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette conseguiu ficar s\u00e9ria por tr\u00eas passos.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'\u00c9. \u00c9 parte do M\u00e9todo Matheo.', if:R },
{ t:'dial', ch:'klara', tx:'Ele era escriba?', if:R },
{ t:'dial', ch:'antoniette', tx:'Era professor.', if:R },
{ t:'dial', ch:'klara', tx:'Igual a senhorita vai ser.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu ainda n\u00e3o concordei com essa parte.', if:R },
{ t:'dial', ch:'klara', tx:'Mas n\u00e3o disse n\u00e3o.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette n\u00e3o respondeu porque Klara estava tecnicamente certa.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E o Matheo fazia o qu\u00ea?', if:R },
{ t:'dial', ch:'antoniette', tx:'Tentava impedir escribas de estragarem documentos.', if:R },
{ t:'dial', ch:'klara', tx:'S\u00f3?', if:R },
{ t:'dial', ch:'antoniette', tx:'J\u00e1 era bastante.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Como estraga?', if:R },
{ t:'dial', ch:'antoniette', tx:'Escrevendo cedo demais.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Cedo de manh\u00e3?', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Antes de conferir.', if:R },
{ t:'dial', ch:'klara', tx:'Ah.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Ele separava observa\u00e7\u00e3o, infer\u00eancia e conclus\u00e3o.', if:R },
{ t:'dial', ch:'klara', tx:'Tr\u00eas.', if:R },
{ t:'dial', ch:'antoniette', tx:'Tr\u00eas.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Faz comigo.', if:R },
{ t:'dial', ch:'antoniette', tx:'O qu\u00ea?', if:R },
{ t:'dial', ch:'klara', tx:'Essas tr\u00eas.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'T\u00e1. Voc\u00ea est\u00e1 mancando.', if:R },
{ t:'dial', ch:'klara', tx:'N\u00e3o estou.', if:R },
{ t:'dial', ch:'antoniette', tx:'Est\u00e1.', if:R },
{ t:'dial', ch:'klara', tx:'Pouco.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Observa\u00e7\u00e3o: voc\u00ea encurta o passo direito.', if:R },
{ t:'dial', ch:'klara', tx:'T\u00e1.', if:R },
{ t:'dial', ch:'antoniette', tx:'Infer\u00eancia: seu p\u00e9 ainda d\u00f3i.', if:R },
{ t:'dial', ch:'klara', tx:'N\u00e3o d\u00f3i.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Ent\u00e3o a infer\u00eancia estava errada.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Mas d\u00f3i um pouquinho.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Ent\u00e3o estava certa por acidente.', if:R },
{ t:'dial', ch:'klara', tx:'Isso conta?', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Chato.', if:R },
{ t:'dial', ch:'antoniette', tx:'Muito.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E conclus\u00e3o?', if:R },
{ t:'dial', ch:'antoniette', tx:'A bota precisa ser trocada.', if:R },
{ t:'dial', ch:'klara', tx:'Essa eu j\u00e1 sabia.', if:R },
{ t:'dial', ch:'antoniette', tx:'Ent\u00e3o voc\u00ea pode passar na primeira aula.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Klara sorriu para a estrada.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Eu passei.', if:R },
{ t:'dial', ch:'antoniette', tx:'Na primeira parte.', if:R },
{ t:'dial', ch:'klara', tx:'Passei.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita aprendeu isso onde?', if:R },
{ t:'dial', ch:'antoniette', tx:'Na Academia.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A Academia de verdade?', if:R },
{ t:'dial', ch:'antoniette', tx:'Quantas Academias de mentira voc\u00ea conhece?', if:R },
{ t:'dial', ch:'klara', tx:'Nenhuma.', if:R },
{ t:'dial', ch:'antoniette', tx:'Ent\u00e3o essa.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita estudou l\u00e1?', if:R },
{ t:'dial', ch:'antoniette', tx:'Um tempo.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Quanto?', if:R },
{ t:'dial', ch:'antoniette', tx:'Dois anos e sete meses.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita sabe at\u00e9 os meses.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu sei.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Por que saiu?', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette passou o polegar pela borda do rel\u00f3gio.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Porque me ofereceram trabalho.', if:R },
{ t:'dial', ch:'klara', tx:'O do carimbo?', if:R },
{ t:'dial', ch:'antoniette', tx:'O do carimbo veio antes.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Ent\u00e3o conta direito.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette n\u00e3o estava acostumada a ter a pr\u00f3pria biografia devolvida por falta de informa\u00e7\u00e3o.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Eu trabalhava no cart\u00f3rio durante o dia.', if:R },
{ t:'dial', ch:'klara', tx:'E estudava quando?', if:R },
{ t:'dial', ch:'antoniette', tx:'No fim da tarde.', if:R },
{ t:'dial', ch:'klara', tx:'Todo dia?', if:R },
{ t:'dial', ch:'antoniette', tx:'Quatro dias.', if:R },
{ t:'dial', ch:'klara', tx:'E sobrava?', if:R },
{ t:'dial', ch:'antoniette', tx:'Sobrava o quinto.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'N\u00e3o. Sobrava tempo.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Ah.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o muito.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E seu pai deixava?', if:R },
{ t:'dial', ch:'antoniette', tx:'Meu pai achava estranho.', if:R },
{ t:'dial', ch:'klara', tx:'Por qu\u00ea?', if:R },
{ t:'dial', ch:'antoniette', tx:'Porque ele j\u00e1 tinha conseguido um emprego para mim.', if:R },
{ t:'dial', ch:'klara', tx:'Mas estudar \u00e9 melhor.', if:R },
{ t:'dial', ch:'antoniette', tx:'Para voc\u00ea.', if:R },
{ t:'dial', ch:'klara', tx:'Para a senhorita tamb\u00e9m.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Na \u00e9poca eu n\u00e3o sabia.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita gostava?', if:R },
{ t:'dial', ch:'antoniette', tx:'Da Academia?', if:R },
{ t:'dial', ch:'klara', tx:'\u00c9.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Gostava de algumas salas.', if:R },
{ t:'dial', ch:'klara', tx:'Isso n\u00e3o \u00e9 gostar da Academia.', if:R },
{ t:'dial', ch:'antoniette', tx:'Ent\u00e3o n\u00e3o sei.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Qual sala?', if:R },
{ t:'dial', ch:'antoniette', tx:'A sala de arquivo.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Claro.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette quase perguntou o que aquilo queria dizer e decidiu que sabia.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'E uma sala no segundo andar que pegava sol depois das quatro.', if:R },
{ t:'dial', ch:'klara', tx:'O que tinha nela?', if:R },
{ t:'dial', ch:'antoniette', tx:'Nada de especial.', if:R },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o por que gostava?', if:R },
{ t:'dial', ch:'antoniette', tx:'Porque pegava sol depois das quatro.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Klara pensou um pouco e aceitou aquilo como motivo suficiente.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E o Matheo dava aula l\u00e1?', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o quando eu estudei.', if:R },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o como a senhorita aprendeu o m\u00e9todo dele?', if:R },
{ t:'dial', ch:'antoniette', tx:'A mat\u00e9ria ficou.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Como chama?', if:R },
{ t:'dial', ch:'antoniette', tx:'Registro Comparado e Reconstru\u00e7\u00e3o Documental.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Que nome ruim.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu falei que era uma mat\u00e9ria ruim.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E a senhorita era boa?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Era.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela respondeu sem falsa mod\u00e9stia porque falsa mod\u00e9stia exigia uma energia que Antoniette nunca viu utilidade em gastar.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Quanto boa?', if:R },
{ t:'dial', ch:'antoniette', tx:'Klara.', if:R },
{ t:'dial', ch:'klara', tx:'Quanto?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Fui a melhor da turma nos dois anos.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Eu sabia.', if:R },
{ t:'dial', ch:'antoniette', tx:'Voc\u00ea n\u00e3o sabia.', if:R },
{ t:'dial', ch:'klara', tx:'Sabia sim.', if:R },
{ t:'dial', ch:'antoniette', tx:'Voc\u00ea acabou de perguntar.', if:R },
{ t:'dial', ch:'klara', tx:'Eu queria ouvir.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E depois teve algu\u00e9m melhor?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'N\u00e3o sei.', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita sabe.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Recebi uma carta da Academia h\u00e1 dois anos.', if:R },
{ t:'dial', ch:'klara', tx:'De quem?', if:R },
{ t:'dial', ch:'antoniette', tx:'Do professor Halvern.', if:R },
{ t:'dial', ch:'klara', tx:'Ele escreveu o qu\u00ea?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Que a cadeira estava com seis alunos.', if:R },
{ t:'dial', ch:'klara', tx:'Isso \u00e9 pouco?', if:R },
{ t:'dial', ch:'antoniette', tx:'\u00c9.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'E perguntou se eu tinha interesse em mandar algumas notas.', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita mandou?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Por qu\u00ea?', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A resposta era simples. Por cinco anos, quase todas as respostas de Antoniette tinham sido simples porque o trabalho gostava delas assim.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Eu estava ocupada.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Comigo.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Com a casa.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Eu estava na casa.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Estava.', if:R },

{ t:'pause', if:R },

{ t:'nar', tx:'Nenhuma das duas encontrou coisa melhor para fazer com aquela distin\u00e7\u00e3o.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Ent\u00e3o a \u00faltima pessoa boa foi a senhorita.', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o foi isso que eu disse.', if:R },
{ t:'dial', ch:'klara', tx:'Foi quase.', if:R },
{ t:'dial', ch:'antoniette', tx:'Quase n\u00e3o serve para arquivo.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Mas serve para conversar.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'\u00c0s vezes.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A gente pode ir l\u00e1.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Onde?', if:R },
{ t:'dial', ch:'klara', tx:'Na Academia.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Klara, a Academia fica para o norte.', if:R },
{ t:'dial', ch:'klara', tx:'Eu sei.', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00f3s estamos indo para o rio.', if:R },
{ t:'dial', ch:'klara', tx:'N\u00e3o agora.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Depois.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A palavra ficou andando com elas por alguns passos.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Depois do barco.', if:R },
{ t:'dial', ch:'antoniette', tx:'O barco n\u00e3o vai para o norte.', if:R },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o depois do lugar que o barco vai.', if:R },
{ t:'dial', ch:'antoniette', tx:'Isso pode levar bastante tempo.', if:R },
{ t:'dial', ch:'klara', tx:'A gente tem.', if:R },

{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette verificou mentalmente dinheiro, dist\u00e2ncia, documentos e tr\u00eas rotas poss\u00edveis antes de perceber que tinha come\u00e7ado a planejar.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Talvez.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Talvez \u00e9 sim?', if:R },
{ t:'dial', ch:'antoniette', tx:'Talvez \u00e9 talvez.', if:R },
{ t:'dial', ch:'klara', tx:'\u00c9 mais sim que n\u00e3o?', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o funciona assim.', if:R },
{ t:'dial', ch:'klara', tx:'Funciona um pouco.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Um pouco.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Eu posso estudar l\u00e1?', if:R },
{ t:'dial', ch:'antoniette', tx:'Quando tiver idade.', if:R },
{ t:'dial', ch:'klara', tx:'Quanto falta?', if:R },
{ t:'dial', ch:'antoniette', tx:'Alguns anos.', if:R },
{ t:'dial', ch:'klara', tx:'Quantos?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Depende da admiss\u00e3o.', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita entrou com quantos?', if:R },
{ t:'dial', ch:'antoniette', tx:'Dezessete.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'\u00c9 muito.', if:R },
{ t:'dial', ch:'antoniette', tx:'Para voc\u00ea, agora, \u00e9.', if:R },
{ t:'dial', ch:'klara', tx:'At\u00e9 l\u00e1 a senhorita me ensina.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'At\u00e9 l\u00e1?', if:R },
{ t:'dial', ch:'klara', tx:'\u00c9.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette fez a conta sem querer. Nove anos. Talvez oito, dependendo do calend\u00e1rio da Academia.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'D\u00e1 para ensinar bastante coisa em oito anos.', if:R },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o pronto.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E quando eu entrar a senhorita vai comigo.', if:R },
{ t:'dial', ch:'antoniette', tx:'Para qu\u00ea?', if:R },
{ t:'dial', ch:'klara', tx:'Para falar que eu sei.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eles t\u00eam prova para isso.', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita fala tamb\u00e9m.', if:R },
{ t:'dial', ch:'antoniette', tx:'Isso seria interfer\u00eancia.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Ent\u00e3o interfere pouco.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette quase explicou que interfer\u00eancia pouca continuava sendo interfer\u00eancia.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Eu posso esperar do lado de fora.', if:R },
{ t:'dial', ch:'klara', tx:'T\u00e1.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A Liara vai tamb\u00e9m.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette olhou para Klara.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Ela n\u00e3o vai querer ser escriba.', if:R },
{ t:'dial', ch:'antoniette', tx:'Provavelmente n\u00e3o.', if:R },
{ t:'dial', ch:'klara', tx:'Ela ia odiar.', if:R },
{ t:'dial', ch:'antoniette', tx:'Provavelmente.', if:R },
{ t:'dial', ch:'klara', tx:'Ela ia ficar perguntando quando termina.', if:R },
{ t:'dial', ch:'antoniette', tx:'Isso eu consigo imaginar.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Mas ela pode ir comigo.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Pode.', if:R },

{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette n\u00e3o corrigiu essa parte.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'O que mais um escriba aprende?', if:R },
{ t:'dial', ch:'antoniette', tx:'Caligrafia. Arquivo. Protocolo. C\u00f3pia. L\u00ednguas, se voc\u00ea tiver paci\u00eancia.', if:R },
{ t:'dial', ch:'klara', tx:'Tenho.', if:R },
{ t:'dial', ch:'antoniette', tx:'Voc\u00ea acabou de correr quarenta passos porque estava entediada.', if:R },
{ t:'dial', ch:'klara', tx:'Mas voltei.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Isso n\u00e3o \u00e9 a mesma coisa.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E o Matheo?', if:R },
{ t:'dial', ch:'antoniette', tx:'O m\u00e9todo?', if:R },
{ t:'dial', ch:'klara', tx:'\u00c9.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Voc\u00ea aprende a n\u00e3o confiar na primeira vers\u00e3o.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Mesmo se for sua?', if:R },
{ t:'dial', ch:'antoniette', tx:'Principalmente se for sua.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Ent\u00e3o quando eu escrever uma coisa eu tenho que achar outra pessoa?', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o sempre.', if:R },
{ t:'dial', ch:'klara', tx:'Outra fonte.', if:R },
{ t:'dial', ch:'antoniette', tx:'Isso.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E se s\u00f3 tiver eu?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Voc\u00ea escreve que s\u00f3 tinha voc\u00ea.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'E pronto?', if:R },
{ t:'dial', ch:'antoniette', tx:'E pronto.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Isso \u00e9 f\u00e1cil.', if:R },
{ t:'dial', ch:'antoniette', tx:'\u00c9 f\u00e1cil quando voc\u00ea n\u00e3o quer que a resposta seja outra.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Como assim?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Nada.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette deixou a explica\u00e7\u00e3o para uma aula que ainda n\u00e3o existia.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita queria ser escriba quando era crian\u00e7a?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'N\u00e3o.', if:R },
{ t:'dial', ch:'klara', tx:'O que queria ser?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Eu n\u00e3o sei.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Nunca pensou?', if:R },
{ t:'dial', ch:'antoniette', tx:'Pensei.', if:R },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o sabe.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Mudava.', if:R },
{ t:'dial', ch:'klara', tx:'Para qu\u00ea?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Quando eu tinha oito anos eu queria trabalhar na esta\u00e7\u00e3o.', if:R },
{ t:'dial', ch:'klara', tx:'Por qu\u00ea?', if:R },
{ t:'dial', ch:'antoniette', tx:'Porque as pessoas chegavam.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'S\u00f3?', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu tinha oito anos.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Depois quis copiar mapas.', if:R },
{ t:'dial', ch:'klara', tx:'Isso parece mais a senhorita.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu era ruim em desenhar rio.', if:R },
{ t:'dial', ch:'klara', tx:'Rio \u00e9 s\u00f3 uma linha.', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o fala isso perto de um cart\u00f3grafo.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E depois?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Depois minha m\u00e3e morreu.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Klara n\u00e3o falou por alguns passos.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Depois meu pai passou a trabalhar mais.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Depois eu comecei a ajudar no cart\u00f3rio.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Depois eu percebi o carimbo errado.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Depois me deram uma mesa.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Depois apareceu a Academia.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Depois apareceu outro trabalho.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'E depois eu estava na casa.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Isso foi r\u00e1pido.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'N\u00e3o foi.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Foram onze anos. Contado daquele jeito, cabia em menos de um minuto.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E a senhorita queria ir para a casa?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Eu queria o trabalho.', if:R },
{ t:'dial', ch:'klara', tx:'N\u00e3o foi o que eu perguntei.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Era a segunda vez naquela noite.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'N\u00e3o.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Ent\u00e3o por que foi?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Pagava mais.', if:R },
{ t:'dial', ch:'klara', tx:'S\u00f3?', if:R },
{ t:'dial', ch:'antoniette', tx:'Dava alojamento.', if:R },
{ t:'dial', ch:'klara', tx:'S\u00f3?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Eu achei que ia aprender alguma coisa.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Aprendeu?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Aprendi.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Coisa boa?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Alguma.', if:R },

{ t:'pause', if:R },

{ t:'nar', tx:'Klara chutou uma pedra pequena para fora da estrada.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Eu aprendi coisa boa com a senhorita.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Aprendeu a contar ladrilho.', if:R },
{ t:'dial', ch:'klara', tx:'Isso tamb\u00e9m.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Se eu virar escriba, eu posso ter aqueles livros grandes?', if:R },
{ t:'dial', ch:'antoniette', tx:'Pode comprar livros sem virar escriba.', if:R },
{ t:'dial', ch:'klara', tx:'Mas escriba ganha?', if:R },
{ t:'dial', ch:'antoniette', tx:'Alguns.', if:R },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o eu viro.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'A profiss\u00e3o est\u00e1 decidida pelo livro gr\u00e1tis?', if:R },
{ t:'dial', ch:'klara', tx:'N\u00e3o \u00e9 gr\u00e1tis. Eu vou trabalhar.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Justo.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E eu posso escrever sobre o que eu quiser?', if:R },
{ t:'dial', ch:'antoniette', tx:'Se for seu caderno.', if:R },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o eu vou ter dois.', if:R },
{ t:'dial', ch:'antoniette', tx:'Dois?', if:R },
{ t:'dial', ch:'klara', tx:'Um do trabalho e um meu.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'\u00c9 uma boa divis\u00e3o.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita tem um seu?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'N\u00e3o.', if:R },
{ t:'dial', ch:'klara', tx:'Devia.', if:R },
{ t:'dial', ch:'antoniette', tx:'Talvez.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Quando chegar a gente compra.', if:R },
{ t:'dial', ch:'antoniette', tx:'Onde?', if:R },
{ t:'dial', ch:'klara', tx:'No lugar que vende caderno.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Bom planejamento.', if:R },
{ t:'dial', ch:'klara', tx:'Obrigada.', if:R },

{ t:'pause', if:R },

{ t:'nar', tx:'Andaram mais um pouco.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Qual era sua nota?', if:R },
{ t:'dial', ch:'antoniette', tx:'Em qu\u00ea?', if:R },
{ t:'dial', ch:'klara', tx:'Na mat\u00e9ria do Matheo.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Noventa e quatro.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'De quanto?', if:R },
{ t:'dial', ch:'antoniette', tx:'Cem.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Onde perdeu seis?', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette lembrava.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Reconstru\u00ed uma data sem marcar que era reconstru\u00e7\u00e3o.', if:R },
{ t:'dial', ch:'klara', tx:'Mas estava certa?', if:R },
{ t:'dial', ch:'antoniette', tx:'Estava.', if:R },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o por que tirou ponto?', if:R },
{ t:'dial', ch:'antoniette', tx:'Porque eu n\u00e3o podia provar.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Mas estava certa.', if:R },
{ t:'dial', ch:'antoniette', tx:'Isso n\u00e3o muda a nota.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Klara pensou nisso com muito mais seriedade do que dedicara ao emprego escolhido por causa de livros.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Ent\u00e3o o erro n\u00e3o era a data.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'N\u00e3o.', if:R },
{ t:'dial', ch:'klara', tx:'Era dizer que sabia como sabia.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Era.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Eu acho isso dif\u00edcil.', if:R },
{ t:'dial', ch:'antoniette', tx:'\u00c9.', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita me ensina.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Ensino.', if:R },

{ t:'pause', if:R },

{ t:'nar', tx:'A resposta saiu antes que Antoniette calculasse quanto tempo aquela promessa continha.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Amanh\u00e3?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Depois de dormir.', if:R },
{ t:'dial', ch:'klara', tx:'Isso \u00e9 amanh\u00e3.', if:R },
{ t:'dial', ch:'antoniette', tx:'Depende da hora que a gente dormir.', if:R },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o depois que eu acordar.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Depois que voc\u00ea acordar.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Primeira aula de escriba.', if:R },
{ t:'dial', ch:'antoniette', tx:'Primeira aula de segurar o l\u00e1pis sem tentar quebrar ele.', if:R },
{ t:'dial', ch:'klara', tx:'Isso j\u00e1 passou.', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o passou.', if:R },
{ t:'dial', ch:'klara', tx:'Passei na outra.', if:R },
{ t:'dial', ch:'antoniette', tx:'Voc\u00ea passou em uma pergunta.', if:R },
{ t:'dial', ch:'klara', tx:'Passei.', if:R },

{ t:'pause', if:R },

{ t:'nar', tx:'Klara come\u00e7ou a andar de costas por tr\u00eas passos para continuar a discuss\u00e3o olhando para Antoniette.', if:R },

{ t:'dial', ch:'antoniette', tx:'Olha a estrada.', if:R },
{ t:'dial', ch:'klara', tx:'Estou olhando.', if:R },
{ t:'dial', ch:'antoniette', tx:'Para a estrada.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Klara virou.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Professora chata.', if:R },
{ t:'dial', ch:'antoniette', tx:'Voc\u00ea que escolheu.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Escolhi.', if:R },

{ t:'pause', if:R },

{ t:'nar', tx:'Andaram uns vinte passos.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Senhorita.', if:R },
{ t:'dial', ch:'antoniette', tx:'Hm?', if:R },
{ t:'dial', ch:'klara', tx:'Quando a gente for na Academia, eu quero ver a sala que pega sol.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Se ainda for a mesma sala.', if:R },
{ t:'dial', ch:'klara', tx:'A gente confere.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Confere.', if:R },

{ t:'pause', if:R },

{ t:'nar', tx:'Klara ficou satisfeita e voltou a prestar aten\u00e7\u00e3o onde pisava.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E a Liara vai reclamar do sol.', if:R },
{ t:'dial', ch:'antoniette', tx:'Provavelmente.', if:R },
{ t:'dial', ch:'klara', tx:'Ela reclama de calor.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu sei.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette n\u00e3o corrigiu essa parte tamb\u00e9m.', if:R },

/* ---- o que ela faz com o que aprendeu -------------------------------
   Mesma menina, tres ferramentas. Nenhuma delas e melhor, e nenhuma
   vira discurso: ela usa do jeito que uma crianca usa, no meio de
   outra coisa.
   -------------------------------------------------------------------- */
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'klara', tx:'A senhorita anota tudo?', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'antoniette', tx:'Quase tudo.', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'klara', tx:'Eu tamb\u00e9m anoto.', if:{ rota:'perda', taught:'A' } },
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'klara', tx:'Eu contei os ladrilhos da c\u00e2mara duas vezes, em noite diferente, porque uma noite s\u00f3 \u00e9 fonte \u00fanica.', if:{ rota:'perda', taught:'A' } },
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'nar', tx:'Antoniette tinha dito aquela express\u00e3o na biblioteca uma vez, sem saber que estava dando uma regra a algu\u00e9m.', if:{ rota:'perda', taught:'A' } },
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'klara', tx:'Deu quarenta e um do lado comprido nas duas.', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'antoniette', tx:'Ent\u00e3o s\u00e3o quarenta e um.', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'klara', tx:'S\u00e3o.', if:{ rota:'perda', taught:'A' } },
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'klara', tx:'Se a senhorita achar errado, corrige do lado. N\u00e3o risca.', if:{ rota:'perda', taught:'A' } },
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'nar', tx:'Ela devolveu a regra inteira, com a emenda e tudo, e n\u00e3o reparou.', if:{ rota:'perda', taught:'A' } },
{ t:'pause', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'klara', tx:'Eu n\u00e3o agradeci ao Fenn.', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'antoniette', tx:'Ele foi pago.', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'klara', tx:'Pago n\u00e3o \u00e9 a mesma coisa.', if:{ rota:'perda', taught:'B' } },
{ t:'pause', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o \u00e9.', if:{ rota:'perda', taught:'B' } },
{ t:'pause', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'klara', tx:'Quando eu puder eu pago.', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'antoniette', tx:'Voc\u00ea n\u00e3o deve nada a ningu\u00e9m.', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'klara', tx:'Devo sim.', if:{ rota:'perda', taught:'B' } },
{ t:'pause', if:{ rota:'perda', taught:'B' } },
{ t:'nar', tx:'Ela estava certa.', if:{ rota:'perda', taught:'B' } },
{ t:'pause', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'klara', tx:'No livro do norte tem uma cidade em cima da \u00e1gua.', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'antoniette', tx:'Tem.', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'klara', tx:'As casas ficam em estaca. A senhorita j\u00e1 viu?', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o.', if:{ rota:'perda', taught:'C' } },
{ t:'pause', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o a gente vai ver as duas primeiro.', if:{ rota:'perda', taught:'C' } },
{ t:'pause', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'antoniette', tx:'Pode ser.', if:{ rota:'perda', taught:'C' } },
{ t:'pause', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'klara', tx:'Como \u00e9 o cheiro do mar?', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o sei.', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'klara', tx:'A senhorita n\u00e3o sabe nada hoje.', if:{ rota:'perda', taught:'C' } },
{ t:'pause', if:{ rota:'perda', taught:'C' } },
{ t:'nar', tx:'Antoniette concordou, e concordar era mais f\u00e1cil do que a alternativa.', if:{ rota:'perda', taught:'C' } },

{ t:'dial', ch:'klara', tx:'A senhorita \u00e9 a \u00fanica pessoa que pergunta antes de fazer.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Como assim?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Ah. Sei l\u00e1.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Andaram uns quarenta passos.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A Liara n\u00e3o pergunta. Ela conta depois.', if:R },
{ t:'dial', ch:'antoniette', tx:'Conta para quem?', if:R },
{ t:'dial', ch:'klara', tx:'Para a m\u00e3e.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'E eu conto tudo para a Liara, ent\u00e3o no fim \u00e9 a mesma coisa.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Para a senhorita eu conto e acaba na senhorita.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Acaba.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Klara achou que aquilo tinha sido uma conversa boa e mudou de assunto.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Falta muito?', if:R },
{ t:'dial', ch:'antoniette', tx:'Falta.', if:R },
{ t:'dial', ch:'klara', tx:'T\u00e1.', if:R },

{ t:'nar', tx:'Ela passou o saco de pano para a outra m\u00e3o e andou meio passo mais perto.', if:R },
{ t:'nar', tx:'Ficou naquela dist\u00e2ncia pelo resto do caminho, e nenhuma das duas ajustou.', if:R },
{ t:'spr_hide', ch:'klara', if:R },
{ t:'spr_hide', ch:'antoniette', if:R },

/* ======================================================================
   C4 - A FLORESTA
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'per11_floresta', chapter:'per11', title:'A floresta',
  bg:'bg_grey_march_road', bgm:null, if:R },

{ t:'nar', tx:'Depois da aldeia, as copas cobriram a lua. Antoniette perdeu a borda da estrada por tr\u00eas passos.', if:R },
{ t:'nar', tx:'Antoniette conhecia aquele trecho. Tinha atravessado ele em abril, cinco anos antes, com a janela aberta.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela contou os passos, porque passo \u00e9 a \u00fanica medida que serve quando n\u00e3o h\u00e1 roda.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Trezentos e quarenta at\u00e9 a curva. Depois a ponte.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Onze minutos de ponte.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Foi a terceira vez naquela noite que ela usou aquele n\u00famero para medir uma coisa que n\u00e3o tinha nada a ver com ele.', if:R },

/* ======================================================================
   C5 - A FARPA
   Klara para. NAO EXPLICAR.
   ====================================================================== */
{ t:'scene', id:'per11_farpa', chapter:'per11', title:'Onze minutos da ponte',
  bg:'bg_black', bgm:null, if:R },

{ t:'nar', tx:'Faltavam quatro horas para o barco.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'klara', ex:'blank', pos:'center', if:R },
{ t:'nar', tx:'Klara parou onze minutos antes da ponte.', if:R },
{ t:'nar', tx:'O p\u00e9 direito parou adiante do esquerdo. Klara n\u00e3o concluiu o passo.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Klara.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'O ar da estrada esquentou.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'O rel\u00f3gio continuou no pulso dela. Depois, a dura\u00e7\u00e3o ficou em branco.', if:R },

{ t:'fade_out', if:R },
{ t:'bgm', id:null, if:R },
{ t:'end_chap', line1:'Onze minutos antes da ponte.', line2:'O cocheiro esperou dez.',
  chapter:'per11', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.PER11; }
