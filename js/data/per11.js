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
{ t:'dial', ch:'klara', tx:'A senhorita pode ser professora.', if:R },
{ t:'dial', ch:'antoniette', tx:'Pode ser.', if:R },
{ t:'dial', ch:'klara', tx:'Eu seria a aluna.', if:R },
{ t:'dial', ch:'antoniette', tx:'Voc\u00ea seria a aluna.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'E a Liara tamb\u00e9m.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette n\u00e3o corrigiu essa parte.', if:R },

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
