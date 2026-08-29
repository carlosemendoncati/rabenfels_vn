/* ==========================================================================
   ARQUIVO RABENFELS - js/data/per11.js
   ROTA PERDA - CAPITULO 11: "As Três Moedas"

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

{ t:'chap', num:'CAPÍTULO 11', name:'AS TRÊS MOEDAS', chapter:'per11', if:R },
{ t:'fade_out', if:R },

/* ======================================================================
   C1 - A ESTRADA
   Le 'taught'. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'per11_estrada', chapter:'per11', title:'A estrada',
  bg:'bg_grey_march_road', bgm:null, if:R },
{ t:'fade_in', if:R },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center', if:R },

{ t:'nar', tx:'A estrada do vale à meia-noite é mais clara do que se espera. A lua bate na pedra molhada.', if:R },
{ t:'nar', tx:'Antoniette andou mais rápido do que tinha calculado para uma criança, e Klara acompanhou sem reclamar.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita conferiu o horário da carroça?', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'antoniette', tx:'Três vezes.', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'klara', tx:'Então está certo.', if:{ rota:'perda', taught:'A' } },

{ t:'dial', ch:'klara', tx:'Eu devia ter agradecido antes de sair.', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'antoniette', tx:'Agradece depois.', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'klara', tx:'Depois não vale. Eu tinha de dizer antes.', if:{ rota:'perda', taught:'B' } },

{ t:'dial', ch:'klara', tx:'O rio fica de que lado do sol?', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'antoniette', tx:'Esquerda, de manhã.', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'klara', tx:'Está no livro. Eu queria conferir com a senhorita.', if:{ rota:'perda', taught:'C' } },

{ t:'pause', if:R },
{ t:'nar', tx:'Passaram a aldeia com onze minutos de atraso sobre o papel.', if:R },
{ t:'nar', tx:'Quinze casas caiadas, um poço, roupa no varal, e as janelas fechadas apesar do calor de agosto.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'O cocheiro é de Alsbeck e cobra por espera.', if:R },
{ t:'inn', tx:'Ele vai esperar.', if:R },

/* ======================================================================
   C2 - O PONTO DE ENCONTRO
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'per11_ponto', chapter:'per11', title:'O cruzamento',
  bg:'bg_grey_march_road', keepSprites:true, if:R },

{ t:'nar', tx:'O ponto de encontro era o cruzamento da estrada do vale com a de Alsbeck, marcado por um mourão de pedra.', if:R },
{ t:'nar', tx:'Alcançaram o mourão onze minutos atrasadas.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Não havia carroça.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette andou até o mourão e passou a mão na pedra, o que não servia para nada.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Havia esterco fresco na terra do lado leste e o sulco de uma roda que virou ali e voltou.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ele veio.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ele veio e esperou.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela ajoelhou e mediu o esterco com dois dedos, porque esterco esfria numa taxa que dá para estimar.', if:R },
{ t:'nar', tx:'Estimou dez minutos e conferiu a estimativa contra o próprio relógio, que é o que se faz com estimativa.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Ele foi embora?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Foi.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Há quanto tempo?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette abriu a boca para dar o número e fechou.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Pouco.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Foi a primeira vez em cinco anos que ela deu a uma criança um número redondo em vez do número.', if:R },

/* ======================================================================
   C3 - A PE
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'per11_ape', chapter:'per11', title:'A pé',
  bg:'bg_grey_march_road', keepSprites:true, if:R },

{ t:'nar', tx:'Do mourão até a ponte de Alsbeck são três quilômetros. Da ponte até o rio, mais dois.', if:R },
{ t:'nar', tx:'O barco era às seis e faltavam cinco horas e vinte.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'A pé, com uma criança, cinco quilômetros dão uma hora e quarenta.', if:R },
{ t:'inn', tx:'Dá.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela refez a divisão no verso do papel. O resultado continuou o mesmo.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Vamos andando. Dá tempo.', if:R },
{ t:'dial', ch:'klara', tx:'Eu sei.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A menina disse aquilo sem levantar a cabeça e sem parar de andar, e Antoniette não perguntou como ela sabia.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Klara trocou o saco de pano de mão duas vezes, e da segunda vez pegou com a mão que já estava carregando.', if:R },
{ t:'nar', tx:'Antoniette reparou e não disse nada, porque dizer teria parado a caminhada.', if:R },

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
{ t:'dial', ch:'antoniette', tx:'Se cansar, você diz.', if:R },
{ t:'dial', ch:'klara', tx:'Eu digo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Andaram um tempo sem dizer nada, e não foi um silêncio pesado. Foi o silêncio de duas pessoas andando.', if:R },

{ t:'dial', ch:'klara', tx:'Eu peguei pão.', if:R },
{ t:'dial', ch:'antoniette', tx:'Pegou quanto?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Seis.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Seis pães.', if:R },
{ t:'dial', ch:'klara', tx:'Foi muito, né.', if:R },
{ t:'dial', ch:'antoniette', tx:'Foi.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Klara ajeitou o saco no ombro com as duas mãos, do jeito de quem carrega mais peso do que devia e não vai dizer.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Eu não sabia quantos dias.', if:R },
{ t:'dial', ch:'antoniette', tx:'Dois.', if:R },
{ t:'dial', ch:'klara', tx:'Então seis tá bom.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Seis não estava bom para dois dias, e nenhuma das duas fez essa conta em voz alta.', if:R },

{ t:'dial', ch:'klara', tx:'Quanto é um quilômetro?', if:R },
{ t:'dial', ch:'antoniette', tx:'Mil metros.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Isso eu sei. Quanto é andando?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Uns doze minutos.', if:R },
{ t:'dial', ch:'klara', tx:'Doze certos?', if:R },
{ t:'dial', ch:'antoniette', tx:'Doze mais ou menos.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Então não é doze.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette abriu a boca para explicar o que é uma média e desistiu no meio.', if:R },
{ t:'dial', ch:'antoniette', tx:'Não é doze.', if:R },
{ t:'dial', ch:'klara', tx:'Tá.', if:R },

{ t:'nar', tx:'Passou um cheiro de água parada e Klara achou que era o rio. Não era. Faltavam cinco quilômetros para o rio.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Cavalo sabe nadar.', if:R },
{ t:'dial', ch:'antoniette', tx:'Sabe.', if:R },
{ t:'dial', ch:'klara', tx:'Viu.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Mas não muito longe.', if:R },
{ t:'dial', ch:'klara', tx:'Quanto é muito longe?', if:R },
{ t:'dial', ch:'antoniette', tx:'Não sei.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Então a senhorita não sabe se não é longe.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Não sei.', if:R },
{ t:'dial', ch:'klara', tx:'Tá.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela ficou satisfeita com aquilo por uns bons cem metros.', if:R },

{ t:'nar', tx:'No terceiro quilômetro Klara começou a andar diferente, apoiando de lado.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'A bota.', if:R },
{ t:'dial', ch:'klara', tx:'Não é nada.', if:R },
{ t:'dial', ch:'antoniette', tx:'Senta.', if:R },
{ t:'dial', ch:'klara', tx:'Não é nada.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Sentaram.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A bota era um número menor do que devia ser, e era um número menor desde abril.', if:R },
{ t:'nar', tx:'Ninguém tinha medido o pé dela desde abril, e naquela casa mediam tudo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette dobrou a meia por cima do calcanhar e refez o laço mais frouxo.', if:R },
{ t:'nar', tx:'A menina não reclamou e não agradeceu, e ficou olhando o próprio pé como quem confere serviço.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Melhorou.', if:R },
{ t:'dial', ch:'antoniette', tx:'Melhorou o suficiente?', if:R },
{ t:'dial', ch:'klara', tx:'Melhorou.', if:R },

{ t:'nar', tx:'Andaram mais um tempo.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita já fugiu?', if:R },
{ t:'dial', ch:'antoniette', tx:'Não.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Já.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Já ou não?', if:R },
{ t:'dial', ch:'antoniette', tx:'Uma vez. Eu tinha nove anos.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'E foi longe?', if:R },
{ t:'dial', ch:'antoniette', tx:'Até a cerca.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A cerca de quê?', if:R },
{ t:'dial', ch:'antoniette', tx:'Do quintal.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Klara riu com a boca fechada primeiro. Depois desistiu e riu direito, alto, na estrada vazia.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Foi a primeira vez em cinco anos que Antoniette ouviu aquilo.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Até a cerca do quintal.', if:R },
{ t:'dial', ch:'antoniette', tx:'Até a cerca do quintal.', if:R },
{ t:'dial', ch:'klara', tx:'E depois?', if:R },
{ t:'dial', ch:'antoniette', tx:'Depois eu voltei porque deu fome.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Klara riu de novo, e dessa vez foi só o barulho, sem graça nenhuma junto.', if:R },

{ t:'nar', tx:'Ela correu vinte passos à frente e voltou, sem motivo nenhum.', if:R },
{ t:'dial', ch:'antoniette', tx:'Guarda o fôlego.', if:R },
{ t:'dial', ch:'klara', tx:'Eu tenho muito.', if:R },
{ t:'nar', tx:'Correu de novo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette riu uma vez, curto, e depois olhou em volta para ver se alguém tinha ouvido.', if:R },
{ t:'nar', tx:'Não havia ninguém em cinco quilômetros. Ela olhou assim mesmo.', if:R },

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
{ t:'dial', ch:'antoniette', tx:'Eu morava em Alsbeck. Meu pai trabalhava no cartório da praça.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Isso não é o que eu perguntei.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Não era.', if:R },

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
{ t:'dial', ch:'klara', tx:'E cadê ela?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Não sei. Casou, acho.', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita não escreve?', if:R },
{ t:'dial', ch:'antoniette', tx:'Faz nove anos que não.', if:R },
{ t:'dial', ch:'klara', tx:'Por quê?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Porque não dá para escrever para as pessoas neste trabalho.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Klara fez cara de quem está resolvendo aquilo e não resolveu.', if:R },

{ t:'dial', ch:'klara', tx:'E a senhorita virou isso como?', if:R },
{ t:'dial', ch:'antoniette', tx:'Isso o quê?', if:R },
{ t:'dial', ch:'klara', tx:'Isso. O que a senhorita é.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Um homem me perguntou uma coisa numa fila.', if:R },
{ t:'dial', ch:'klara', tx:'Que coisa?', if:R },
{ t:'dial', ch:'antoniette', tx:'Se eu sabia por que a fila estava parada.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'E a senhorita sabia?', if:R },
{ t:'dial', ch:'antoniette', tx:'Sabia. O escriturário da frente estava com o carimbo errado e ninguém tinha reparado.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'E aí?', if:R },
{ t:'dial', ch:'antoniette', tx:'E aí ele me ofereceu emprego.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Só por causa do carimbo?', if:R },
{ t:'dial', ch:'antoniette', tx:'Só por causa do carimbo.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Isso é pouco.', if:R },
{ t:'dial', ch:'antoniette', tx:'É.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela tinha dezessete anos e achou que era muito.', if:R },

/* Ela nao diz o nome dele. O jogador tambem nao precisa saber ainda:
   quem conta e o proprio Matheo no Epilogo, seis anos depois, e a
   cena la nao anuncia que esta respondendo a esta. */
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Como ele chamava?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette continuou andando.', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita não lembra o nome dele?', if:R },
{ t:'dial', ch:'antoniette', tx:'Lembro.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Então?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Ele é da Ordem. Eu não falo de gente da Ordem com quem não é.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita falou da sua mãe.', if:R },
{ t:'dial', ch:'antoniette', tx:'Minha mãe não era da Ordem.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Klara andou dois passos e mudou de assunto, que é como criança desiste: troca o assunto e não a opinião.', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita tinha quem em casa?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette andou um pouco antes de responder.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Minha mãe. Até os seis.', if:R },
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
{ t:'dial', ch:'antoniette', tx:'Ela não riscava. Quando eu errava a lição ela escrevia o certo do lado, na mesma tinta.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'E reparava se eu tinha comido. Não perguntava. Olhava o prato.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'E sabia de que lado eu dormia. Eu nunca contei. Ela sabia.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Andaram uns vinte passos.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita faz essas três.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Faço não.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Faz.', if:R },
{ t:'pause', if:R },
/* Aqui havia uma narracao listando as tres explicacoes do caderno,
   para o leitor fechar a conta. Fechar a conta e trabalho do leitor.
   "E metodo" e a frase exata com que o canon diz que ela classifica
   esses gestos, e ela sozinha basta. */
{ t:'dial', ch:'antoniette', tx:'É método.', if:R },
{ t:'dial', ch:'klara', tx:'Tá.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Klara não insistiu.', if:R },

{ t:'dial', ch:'klara', tx:'Como ela chamava?', if:R },
{ t:'dial', ch:'antoniette', tx:'Maren.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Maren.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A menina repetiu o nome uma vez, baixo, do jeito de quem está guardando.', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita gosta da casa?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette tinha uma resposta pronta para essa pergunta havia cinco anos, e ela servia para qualquer pessoa daquela casa que perguntasse.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Não.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Eu também não.', if:R },

{ t:'nar', tx:'Voltaram ao passo normal.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita já dormiu numa cama que não é sua?', if:R },
{ t:'dial', ch:'antoniette', tx:'Já.', if:R },
{ t:'dial', ch:'klara', tx:'E dá?', if:R },
{ t:'dial', ch:'antoniette', tx:'Dá.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Eu não sei se dá.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Lá em casa eu durmo e às vezes eu acordo e tem gente no quarto. Não é gente ruim. É gente do trabalho.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Eles medem.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu sei.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Uma vez eu acordei no meio e fiquei quieta, porque se eu mexer eles começam de novo e demora mais.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita quer pão?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette ficou com aquilo na mão e sem lugar nenhum onde pôr.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Eu peguei seis.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu sei.', if:R },
{ t:'dial', ch:'klara', tx:'Foi muito.', if:R },

{ t:'nar', tx:'Um pouco depois Antoniette tirou o lápis do bolso do casaco.', if:R },
{ t:'nar', tx:'Levou o lápis até a altura do papel e parou ali.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Alteração de padrão de sono. Relato direto de procedimento.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Guardou o lápis sem escrever.', if:R },
{ t:'nar', tx:'Foi a primeira vez em cinco anos, e ela não soube dizer a si mesma por quê.', if:R },

{ t:'nar', tx:'Andaram mais uns quinhentos metros.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Klara.', if:R },
{ t:'dial', ch:'klara', tx:'Oi.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Aquilo de acordar no meio.', if:R },
{ t:'dial', ch:'klara', tx:'Aham.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette tinha passado cinco anos escrevendo, e não tinha o resto da frase.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita quer que eu carregue o saco?', if:R },
{ t:'dial', ch:'antoniette', tx:'Não.', if:R },
{ t:'dial', ch:'klara', tx:'Eu carrego.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Carregou.', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita vai fazer o quê depois?', if:R },
{ t:'dial', ch:'antoniette', tx:'Não sei.', if:R },
{ t:'dial', ch:'klara', tx:'Como não sabe?', if:R },
{ t:'dial', ch:'antoniette', tx:'Não sei mesmo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Era verdade, e era a primeira resposta inteiramente verdadeira que ela deu naquela noite.', if:R },
{ t:'pause', if:R },
/* ---- a profissão que talvez ainda pudesse existir --------------------

   Cena escrita pelo autor em 25/08/2026. Substitui a versão curta que
   eu tinha posto aqui — quatro falas e um "Antoniette não corrigiu essa
   parte" — e é o que o resto da rota estava pedindo.

   REGRAS DELA, do próprio autor:
   - Antoniette NÃO faz discurso sobre o sentido de ser escriba.
   - Klara NÃO entende totalmente o Método Matheo.
   - A Academia aparece primeiro como um lugar comum da vida de
     Antoniette, não como um símbolo.
   - Pela primeira vez Antoniette considera um futuro que exige mais
     de amanhã.
   - Nenhuma fala deve soar como despedida.
   - Liara continua incluída nos planos de Klara. Antoniette não corrige.
   - Antoniette foi a última pessoa a cursar a matéria de Matheo com
     desempenho realmente alto. Isso é um fato administrativo para ela,
     não motivo de orgulho.
   - O "método" da mãe e o Método Matheo NÃO são a mesma coisa.
     Antoniette usa a mesma palavra para ambos porque é assim que ela
     organiza o mundo.

   Depende do bloco da infância, acima: "O do carimbo veio antes" e "Era
   a segunda vez naquela noite" só funcionam depois dele.
   -------------------------------------------------------------------- */

{ t:'dial', ch:'klara', tx:'A senhorita pode ser professora.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Posso?', if:R },
{ t:'dial', ch:'klara', tx:'Pode.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'De quê?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'De escrever.', if:R },
{ t:'dial', ch:'antoniette', tx:'Isso é uma matéria muito ruim.', if:R },
{ t:'dial', ch:'klara', tx:'Por quê?', if:R },
{ t:'dial', ch:'antoniette', tx:'Porque primeiro eu teria que ensinar você a segurar o lápis direito.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Eu seguro direito.', if:R },
{ t:'dial', ch:'antoniette', tx:'Você aperta.', if:R },
{ t:'dial', ch:'klara', tx:'É para não cair.', if:R },
{ t:'dial', ch:'antoniette', tx:'O lápis não tenta fugir.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Klara olhou para a própria mão como se Antoniette tivesse acabado de acusar o lápis de alguma coisa.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita me ensinaria?', if:R },
{ t:'dial', ch:'antoniette', tx:'A segurar o lápis?', if:R },
{ t:'dial', ch:'klara', tx:'Não. A fazer o que a senhorita faz.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Ser escriba?', if:R },
{ t:'dial', ch:'klara', tx:'É.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette levou alguns passos para responder.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Posso ensinar uma parte.', if:R },
{ t:'dial', ch:'klara', tx:'Qual parte?', if:R },
{ t:'dial', ch:'antoniette', tx:'A parte que se ensina.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'E tem parte que não se ensina?', if:R },
{ t:'dial', ch:'antoniette', tx:'Tem parte que ninguém conseguiu organizar ainda.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita organizou?', if:R },
{ t:'dial', ch:'antoniette', tx:'Não.', if:R },
{ t:'dial', ch:'klara', tx:'Mas a senhorita organiza tudo.', if:R },
{ t:'dial', ch:'antoniette', tx:'Não tudo.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Klara aceitou a correção com mais facilidade do que Antoniette.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Então começa pela parte que se ensina.', if:R },
{ t:'dial', ch:'antoniette', tx:'Agora?', if:R },
{ t:'dial', ch:'klara', tx:'A gente está andando.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu reparei.', if:R },
{ t:'dial', ch:'klara', tx:'Então dá.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette olhou a estrada. Não havia quadro, mesa, pena, tinta ou qualquer outra coisa que justificasse uma aula.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Tá.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Primeira coisa: você não escreve o que acha que aconteceu.', if:R },
{ t:'dial', ch:'klara', tx:'Escreve o que aconteceu.', if:R },
{ t:'dial', ch:'antoniette', tx:'Não.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Não?', if:R },
{ t:'dial', ch:'antoniette', tx:'Você escreve o que consegue sustentar que aconteceu.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'É diferente?', if:R },
{ t:'dial', ch:'antoniette', tx:'Muito.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'O cocheiro veio.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Veio.', if:R },
{ t:'dial', ch:'klara', tx:'Como eu sustento?', if:R },
{ t:'dial', ch:'antoniette', tx:'Sulco da roda. Esterco fresco. Marca de ferradura na borda leste.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Três coisas.', if:R },
{ t:'dial', ch:'antoniette', tx:'Três coisas.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E ele esperou.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Esperou.', if:R },
{ t:'dial', ch:'klara', tx:'Como sustenta?', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette olhou para a estrada por tempo demais para uma pergunta tão simples.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'A roda parou no cruzamento antes de voltar.', if:R },
{ t:'dial', ch:'klara', tx:'Então ele esperou.', if:R },
{ t:'dial', ch:'antoniette', tx:'Sim.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela não disse dez.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'É isso que o Matheo ensinava?', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette virou a cabeça.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Onde você ouviu esse nome?', if:R },
{ t:'dial', ch:'klara', tx:'No seu livro.', if:R },
{ t:'dial', ch:'antoniette', tx:'Qual livro?', if:R },
{ t:'dial', ch:'klara', tx:'O pequeno. De capa marrom.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette tinha três livros pequenos de capa marrom.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Tem escrito Método Matheo no começo.', if:R },
{ t:'dial', ch:'antoniette', tx:'Você abriu meu manual.', if:R },
{ t:'dial', ch:'klara', tx:'Abri.', if:R },
{ t:'dial', ch:'antoniette', tx:'Sem pedir.', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita estava dormindo.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Isso não melhora.', if:R },
{ t:'dial', ch:'klara', tx:'Eu não sujei.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette conseguiu ficar séria por três passos.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'É. É parte do Método Matheo.', if:R },
{ t:'dial', ch:'klara', tx:'Ele era escriba?', if:R },
{ t:'dial', ch:'antoniette', tx:'Era professor.', if:R },
{ t:'dial', ch:'klara', tx:'Igual a senhorita vai ser.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu ainda não concordei com essa parte.', if:R },
{ t:'dial', ch:'klara', tx:'Mas não disse não.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette não respondeu porque Klara estava tecnicamente certa.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E o Matheo fazia o quê?', if:R },
{ t:'dial', ch:'antoniette', tx:'Tentava impedir escribas de estragarem documentos.', if:R },
{ t:'dial', ch:'klara', tx:'Só?', if:R },
{ t:'dial', ch:'antoniette', tx:'Já era bastante.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Como estraga?', if:R },
{ t:'dial', ch:'antoniette', tx:'Escrevendo cedo demais.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Cedo de manhã?', if:R },
{ t:'dial', ch:'antoniette', tx:'Não.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Antes de conferir.', if:R },
{ t:'dial', ch:'klara', tx:'Ah.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Ele separava observação, inferência e conclusão.', if:R },
{ t:'dial', ch:'klara', tx:'Três.', if:R },
{ t:'dial', ch:'antoniette', tx:'Três.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Faz comigo.', if:R },
{ t:'dial', ch:'antoniette', tx:'O quê?', if:R },
{ t:'dial', ch:'klara', tx:'Essas três.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Tá. Você está mancando.', if:R },
{ t:'dial', ch:'klara', tx:'Não estou.', if:R },
{ t:'dial', ch:'antoniette', tx:'Está.', if:R },
{ t:'dial', ch:'klara', tx:'Pouco.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Observação: você encurta o passo direito.', if:R },
{ t:'dial', ch:'klara', tx:'Tá.', if:R },
{ t:'dial', ch:'antoniette', tx:'Inferência: seu pé ainda dói.', if:R },
{ t:'dial', ch:'klara', tx:'Não dói.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Então a inferência estava errada.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Mas dói um pouquinho.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Então estava certa por acidente.', if:R },
{ t:'dial', ch:'klara', tx:'Isso conta?', if:R },
{ t:'dial', ch:'antoniette', tx:'Não.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Chato.', if:R },
{ t:'dial', ch:'antoniette', tx:'Muito.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E conclusão?', if:R },
{ t:'dial', ch:'antoniette', tx:'A bota precisa ser trocada.', if:R },
{ t:'dial', ch:'klara', tx:'Essa eu já sabia.', if:R },
{ t:'dial', ch:'antoniette', tx:'Então você pode passar na primeira aula.', if:R },
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
{ t:'dial', ch:'antoniette', tx:'Quantas Academias de mentira você conhece?', if:R },
{ t:'dial', ch:'klara', tx:'Nenhuma.', if:R },
{ t:'dial', ch:'antoniette', tx:'Então essa.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita estudou lá?', if:R },
{ t:'dial', ch:'antoniette', tx:'Um tempo.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Quanto?', if:R },
{ t:'dial', ch:'antoniette', tx:'Dois anos e sete meses.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita sabe até os meses.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu sei.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Por que saiu?', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette passou o polegar pela borda do relógio.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Porque me ofereceram trabalho.', if:R },
{ t:'dial', ch:'klara', tx:'O do carimbo?', if:R },
{ t:'dial', ch:'antoniette', tx:'O do carimbo veio antes.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Então conta direito.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette não estava acostumada a ter a própria biografia devolvida por falta de informação.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Eu trabalhava no cartório durante o dia.', if:R },
{ t:'dial', ch:'klara', tx:'E estudava quando?', if:R },
{ t:'dial', ch:'antoniette', tx:'No fim da tarde.', if:R },
{ t:'dial', ch:'klara', tx:'Todo dia?', if:R },
{ t:'dial', ch:'antoniette', tx:'Quatro dias.', if:R },
{ t:'dial', ch:'klara', tx:'E sobrava?', if:R },
{ t:'dial', ch:'antoniette', tx:'Sobrava o quinto.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Não. Sobrava tempo.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Ah.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Não muito.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E seu pai deixava?', if:R },
{ t:'dial', ch:'antoniette', tx:'Meu pai achava estranho.', if:R },
{ t:'dial', ch:'klara', tx:'Por quê?', if:R },
{ t:'dial', ch:'antoniette', tx:'Porque ele já tinha conseguido um emprego para mim.', if:R },
{ t:'dial', ch:'klara', tx:'Mas estudar é melhor.', if:R },
{ t:'dial', ch:'antoniette', tx:'Para você.', if:R },
{ t:'dial', ch:'klara', tx:'Para a senhorita também.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Na época eu não sabia.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita gostava?', if:R },
{ t:'dial', ch:'antoniette', tx:'Da Academia?', if:R },
{ t:'dial', ch:'klara', tx:'É.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Gostava de algumas salas.', if:R },
{ t:'dial', ch:'klara', tx:'Isso não é gostar da Academia.', if:R },
{ t:'dial', ch:'antoniette', tx:'Então não sei.', if:R },
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
{ t:'dial', ch:'klara', tx:'Então por que gostava?', if:R },
{ t:'dial', ch:'antoniette', tx:'Porque pegava sol depois das quatro.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Klara pensou um pouco e aceitou aquilo como motivo suficiente.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E o Matheo dava aula lá?', if:R },
{ t:'dial', ch:'antoniette', tx:'Não quando eu estudei.', if:R },
{ t:'dial', ch:'klara', tx:'Então como a senhorita aprendeu o método dele?', if:R },
{ t:'dial', ch:'antoniette', tx:'A matéria ficou.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Como chama?', if:R },
{ t:'dial', ch:'antoniette', tx:'Registro Comparado e Reconstrução Documental.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Que nome ruim.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu falei que era uma matéria ruim.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E a senhorita era boa?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Era.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela respondeu sem falsa modéstia porque falsa modéstia exigia uma energia que Antoniette nunca viu utilidade em gastar.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Quanto boa?', if:R },
{ t:'dial', ch:'antoniette', tx:'Klara.', if:R },
{ t:'dial', ch:'klara', tx:'Quanto?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Fui a melhor da turma nos dois anos.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Eu sabia.', if:R },
{ t:'dial', ch:'antoniette', tx:'Você não sabia.', if:R },
{ t:'dial', ch:'klara', tx:'Sabia sim.', if:R },
{ t:'dial', ch:'antoniette', tx:'Você acabou de perguntar.', if:R },
{ t:'dial', ch:'klara', tx:'Eu queria ouvir.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E depois teve alguém melhor?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Não sei.', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita sabe.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Recebi uma carta da Academia há dois anos.', if:R },
{ t:'dial', ch:'klara', tx:'De quem?', if:R },
{ t:'dial', ch:'antoniette', tx:'Do professor Halvern.', if:R },
{ t:'dial', ch:'klara', tx:'Ele escreveu o quê?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Que a cadeira estava com seis alunos.', if:R },
{ t:'dial', ch:'klara', tx:'Isso é pouco?', if:R },
{ t:'dial', ch:'antoniette', tx:'É.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'E perguntou se eu tinha interesse em mandar algumas notas.', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita mandou?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Não.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Por quê?', if:R },
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

{ t:'nar', tx:'Nenhuma das duas encontrou coisa melhor para fazer com aquela distinção.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Então a última pessoa boa foi a senhorita.', if:R },
{ t:'dial', ch:'antoniette', tx:'Não foi isso que eu disse.', if:R },
{ t:'dial', ch:'klara', tx:'Foi quase.', if:R },
{ t:'dial', ch:'antoniette', tx:'Quase não serve para arquivo.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Mas serve para conversar.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Às vezes.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A gente pode ir lá.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Onde?', if:R },
{ t:'dial', ch:'klara', tx:'Na Academia.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Klara, a Academia fica para o norte.', if:R },
{ t:'dial', ch:'klara', tx:'Eu sei.', if:R },
{ t:'dial', ch:'antoniette', tx:'Nós estamos indo para o rio.', if:R },
{ t:'dial', ch:'klara', tx:'Não agora.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Depois.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A palavra ficou andando com elas por alguns passos.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Depois do barco.', if:R },
{ t:'dial', ch:'antoniette', tx:'O barco não vai para o norte.', if:R },
{ t:'dial', ch:'klara', tx:'Então depois do lugar que o barco vai.', if:R },
{ t:'dial', ch:'antoniette', tx:'Isso pode levar bastante tempo.', if:R },
{ t:'dial', ch:'klara', tx:'A gente tem.', if:R },

{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette verificou mentalmente dinheiro, distância, documentos e três rotas possíveis antes de perceber que tinha começado a planejar.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Talvez.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Talvez é sim?', if:R },
{ t:'dial', ch:'antoniette', tx:'Talvez é talvez.', if:R },
{ t:'dial', ch:'klara', tx:'É mais sim que não?', if:R },
{ t:'dial', ch:'antoniette', tx:'Não funciona assim.', if:R },
{ t:'dial', ch:'klara', tx:'Funciona um pouco.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Um pouco.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Eu posso estudar lá?', if:R },
{ t:'dial', ch:'antoniette', tx:'Quando tiver idade.', if:R },
{ t:'dial', ch:'klara', tx:'Quanto falta?', if:R },
{ t:'dial', ch:'antoniette', tx:'Alguns anos.', if:R },
{ t:'dial', ch:'klara', tx:'Quantos?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Depende da admissão.', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita entrou com quantos?', if:R },
{ t:'dial', ch:'antoniette', tx:'Dezessete.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'É muito.', if:R },
{ t:'dial', ch:'antoniette', tx:'Para você, agora, é.', if:R },
{ t:'dial', ch:'klara', tx:'Até lá a senhorita me ensina.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Até lá?', if:R },
{ t:'dial', ch:'klara', tx:'É.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette fez a conta sem querer. Nove anos. Talvez oito, dependendo do calendário da Academia.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Dá para ensinar bastante coisa em oito anos.', if:R },
{ t:'dial', ch:'klara', tx:'Então pronto.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E quando eu entrar a senhorita vai comigo.', if:R },
{ t:'dial', ch:'antoniette', tx:'Para quê?', if:R },
{ t:'dial', ch:'klara', tx:'Para falar que eu sei.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eles têm prova para isso.', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita fala também.', if:R },
{ t:'dial', ch:'antoniette', tx:'Isso seria interferência.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Então interfere pouco.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette quase explicou que interferência pouca continuava sendo interferência.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Eu posso esperar do lado de fora.', if:R },
{ t:'dial', ch:'klara', tx:'Tá.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A Liara vai também.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette olhou para Klara.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Ela não vai querer ser escriba.', if:R },
{ t:'dial', ch:'antoniette', tx:'Provavelmente não.', if:R },
{ t:'dial', ch:'klara', tx:'Ela ia odiar.', if:R },
{ t:'dial', ch:'antoniette', tx:'Provavelmente.', if:R },
{ t:'dial', ch:'klara', tx:'Ela ia ficar perguntando quando termina.', if:R },
{ t:'dial', ch:'antoniette', tx:'Isso eu consigo imaginar.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Mas ela pode ir comigo.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Pode.', if:R },

{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette não corrigiu essa parte.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'O que mais um escriba aprende?', if:R },
{ t:'dial', ch:'antoniette', tx:'Caligrafia. Arquivo. Protocolo. Cópia. Línguas, se você tiver paciência.', if:R },
{ t:'dial', ch:'klara', tx:'Tenho.', if:R },
{ t:'dial', ch:'antoniette', tx:'Você acabou de correr quarenta passos porque estava entediada.', if:R },
{ t:'dial', ch:'klara', tx:'Mas voltei.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Isso não é a mesma coisa.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E o Matheo?', if:R },
{ t:'dial', ch:'antoniette', tx:'O método?', if:R },
{ t:'dial', ch:'klara', tx:'É.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Você aprende a não confiar na primeira versão.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Mesmo se for sua?', if:R },
{ t:'dial', ch:'antoniette', tx:'Principalmente se for sua.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Então quando eu escrever uma coisa eu tenho que achar outra pessoa?', if:R },
{ t:'dial', ch:'antoniette', tx:'Não sempre.', if:R },
{ t:'dial', ch:'klara', tx:'Outra fonte.', if:R },
{ t:'dial', ch:'antoniette', tx:'Isso.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E se só tiver eu?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Você escreve que só tinha você.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'E pronto?', if:R },
{ t:'dial', ch:'antoniette', tx:'E pronto.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Isso é fácil.', if:R },
{ t:'dial', ch:'antoniette', tx:'É fácil quando você não quer que a resposta seja outra.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Como assim?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Nada.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette deixou a explicação para uma aula que ainda não existia.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita queria ser escriba quando era criança?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Não.', if:R },
{ t:'dial', ch:'klara', tx:'O que queria ser?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Eu não sei.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Nunca pensou?', if:R },
{ t:'dial', ch:'antoniette', tx:'Pensei.', if:R },
{ t:'dial', ch:'klara', tx:'Então sabe.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Mudava.', if:R },
{ t:'dial', ch:'klara', tx:'Para quê?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Quando eu tinha oito anos eu queria trabalhar na estação.', if:R },
{ t:'dial', ch:'klara', tx:'Por quê?', if:R },
{ t:'dial', ch:'antoniette', tx:'Porque as pessoas chegavam.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Só?', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu tinha oito anos.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Depois quis copiar mapas.', if:R },
{ t:'dial', ch:'klara', tx:'Isso parece mais a senhorita.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu era ruim em desenhar rio.', if:R },
{ t:'dial', ch:'klara', tx:'Rio é só uma linha.', if:R },
{ t:'dial', ch:'antoniette', tx:'Não fala isso perto de um cartógrafo.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E depois?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Depois minha mãe morreu.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Klara não falou por alguns passos.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Depois meu pai passou a trabalhar mais.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Depois eu comecei a ajudar no cartório.', if:R },
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

{ t:'dial', ch:'klara', tx:'Isso foi rápido.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Não foi.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Foram onze anos. Contado daquele jeito, cabia em menos de um minuto.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E a senhorita queria ir para a casa?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Eu queria o trabalho.', if:R },
{ t:'dial', ch:'klara', tx:'Não foi o que eu perguntei.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Era a segunda vez naquela noite.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Não.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Então por que foi?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Pagava mais.', if:R },
{ t:'dial', ch:'klara', tx:'Só?', if:R },
{ t:'dial', ch:'antoniette', tx:'Dava alojamento.', if:R },
{ t:'dial', ch:'klara', tx:'Só?', if:R },
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
{ t:'dial', ch:'klara', tx:'Isso também.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Se eu virar escriba, eu posso ter aqueles livros grandes?', if:R },
{ t:'dial', ch:'antoniette', tx:'Pode comprar livros sem virar escriba.', if:R },
{ t:'dial', ch:'klara', tx:'Mas escriba ganha?', if:R },
{ t:'dial', ch:'antoniette', tx:'Alguns.', if:R },
{ t:'dial', ch:'klara', tx:'Então eu viro.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'A profissão está decidida pelo livro grátis?', if:R },
{ t:'dial', ch:'klara', tx:'Não é grátis. Eu vou trabalhar.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Justo.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E eu posso escrever sobre o que eu quiser?', if:R },
{ t:'dial', ch:'antoniette', tx:'Se for seu caderno.', if:R },
{ t:'dial', ch:'klara', tx:'Então eu vou ter dois.', if:R },
{ t:'dial', ch:'antoniette', tx:'Dois?', if:R },
{ t:'dial', ch:'klara', tx:'Um do trabalho e um meu.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'É uma boa divisão.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita tem um seu?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Não.', if:R },
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
{ t:'dial', ch:'antoniette', tx:'Em quê?', if:R },
{ t:'dial', ch:'klara', tx:'Na matéria do Matheo.', if:R },
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

{ t:'dial', ch:'antoniette', tx:'Reconstruí uma data sem marcar que era reconstrução.', if:R },
{ t:'dial', ch:'klara', tx:'Mas estava certa?', if:R },
{ t:'dial', ch:'antoniette', tx:'Estava.', if:R },
{ t:'dial', ch:'klara', tx:'Então por que tirou ponto?', if:R },
{ t:'dial', ch:'antoniette', tx:'Porque eu não podia provar.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Mas estava certa.', if:R },
{ t:'dial', ch:'antoniette', tx:'Isso não muda a nota.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Klara pensou nisso com muito mais seriedade do que dedicara ao emprego escolhido por causa de livros.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Então o erro não era a data.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Não.', if:R },
{ t:'dial', ch:'klara', tx:'Era dizer que sabia como sabia.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Era.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Eu acho isso difícil.', if:R },
{ t:'dial', ch:'antoniette', tx:'É.', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita me ensina.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Ensino.', if:R },

{ t:'pause', if:R },

{ t:'nar', tx:'A resposta saiu antes que Antoniette calculasse quanto tempo aquela promessa continha.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Amanhã?', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Depois de dormir.', if:R },
{ t:'dial', ch:'klara', tx:'Isso é amanhã.', if:R },
{ t:'dial', ch:'antoniette', tx:'Depende da hora que a gente dormir.', if:R },
{ t:'dial', ch:'klara', tx:'Então depois que eu acordar.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Depois que você acordar.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Primeira aula de escriba.', if:R },
{ t:'dial', ch:'antoniette', tx:'Primeira aula de segurar o lápis sem tentar quebrar ele.', if:R },
{ t:'dial', ch:'klara', tx:'Isso já passou.', if:R },
{ t:'dial', ch:'antoniette', tx:'Não passou.', if:R },
{ t:'dial', ch:'klara', tx:'Passei na outra.', if:R },
{ t:'dial', ch:'antoniette', tx:'Você passou em uma pergunta.', if:R },
{ t:'dial', ch:'klara', tx:'Passei.', if:R },

{ t:'pause', if:R },

{ t:'nar', tx:'Klara começou a andar de costas por três passos para continuar a discussão olhando para Antoniette.', if:R },

{ t:'dial', ch:'antoniette', tx:'Olha a estrada.', if:R },
{ t:'dial', ch:'klara', tx:'Estou olhando.', if:R },
{ t:'dial', ch:'antoniette', tx:'Para a estrada.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Klara virou.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'Professora chata.', if:R },
{ t:'dial', ch:'antoniette', tx:'Você que escolheu.', if:R },
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

{ t:'nar', tx:'Klara ficou satisfeita e voltou a prestar atenção onde pisava.', if:R },

{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'E a Liara vai reclamar do sol.', if:R },
{ t:'dial', ch:'antoniette', tx:'Provavelmente.', if:R },
{ t:'dial', ch:'klara', tx:'Ela reclama de calor.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu sei.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette não corrigiu essa parte também.', if:R },

/* ---- o que ela faz com o que aprendeu -------------------------------
   Mesma menina, tres ferramentas. Nenhuma delas e melhor, e nenhuma
   vira discurso: ela usa do jeito que uma crianca usa, no meio de
   outra coisa.
   -------------------------------------------------------------------- */
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'klara', tx:'A senhorita anota tudo?', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'antoniette', tx:'Quase tudo.', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'klara', tx:'Eu também anoto.', if:{ rota:'perda', taught:'A' } },
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'klara', tx:'Eu contei os ladrilhos da câmara duas vezes, em noite diferente, porque uma noite só é fonte única.', if:{ rota:'perda', taught:'A' } },
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'nar', tx:'Antoniette tinha dito aquela expressão na biblioteca uma vez, sem saber que estava dando uma regra a alguém.', if:{ rota:'perda', taught:'A' } },
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'klara', tx:'Deu quarenta e um do lado comprido nas duas.', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'antoniette', tx:'Então são quarenta e um.', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'klara', tx:'São.', if:{ rota:'perda', taught:'A' } },
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'klara', tx:'Se a senhorita achar errado, corrige do lado. Não risca.', if:{ rota:'perda', taught:'A' } },
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'nar', tx:'Ela devolveu a regra inteira, com a emenda e tudo, e não reparou.', if:{ rota:'perda', taught:'A' } },
{ t:'pause', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'klara', tx:'Eu não agradeci ao Fenn.', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'antoniette', tx:'Ele foi pago.', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'klara', tx:'Pago não é a mesma coisa.', if:{ rota:'perda', taught:'B' } },
{ t:'pause', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'antoniette', tx:'Não é.', if:{ rota:'perda', taught:'B' } },
{ t:'pause', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'klara', tx:'Quando eu puder eu pago.', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'antoniette', tx:'Você não deve nada a ninguém.', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'klara', tx:'Devo sim.', if:{ rota:'perda', taught:'B' } },
{ t:'pause', if:{ rota:'perda', taught:'B' } },
{ t:'nar', tx:'Ela estava certa.', if:{ rota:'perda', taught:'B' } },
{ t:'pause', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'klara', tx:'No livro do norte tem uma cidade em cima da água.', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'antoniette', tx:'Tem.', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'klara', tx:'As casas ficam em estaca. A senhorita já viu?', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'antoniette', tx:'Não.', if:{ rota:'perda', taught:'C' } },
{ t:'pause', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'klara', tx:'Então a gente vai ver as duas primeiro.', if:{ rota:'perda', taught:'C' } },
{ t:'pause', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'antoniette', tx:'Pode ser.', if:{ rota:'perda', taught:'C' } },
{ t:'pause', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'klara', tx:'Como é o cheiro do mar?', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'antoniette', tx:'Não sei.', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'klara', tx:'A senhorita não sabe nada hoje.', if:{ rota:'perda', taught:'C' } },
{ t:'pause', if:{ rota:'perda', taught:'C' } },
{ t:'nar', tx:'Antoniette concordou, e concordar era mais fácil do que a alternativa.', if:{ rota:'perda', taught:'C' } },

{ t:'dial', ch:'klara', tx:'A senhorita é a única pessoa que pergunta antes de fazer.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Como assim?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Ah. Sei lá.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Andaram uns quarenta passos.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A Liara não pergunta. Ela conta depois.', if:R },
{ t:'dial', ch:'antoniette', tx:'Conta para quem?', if:R },
{ t:'dial', ch:'klara', tx:'Para a mãe.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'E eu conto tudo para a Liara, então no fim é a mesma coisa.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Para a senhorita eu conto e acaba na senhorita.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Acaba.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Klara achou que aquilo tinha sido uma conversa boa e mudou de assunto.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Falta muito?', if:R },
{ t:'dial', ch:'antoniette', tx:'Falta.', if:R },
{ t:'dial', ch:'klara', tx:'Tá.', if:R },

{ t:'nar', tx:'Ela passou o saco de pano para a outra mão e andou meio passo mais perto.', if:R },
{ t:'nar', tx:'Ficou naquela distância pelo resto do caminho, e nenhuma das duas ajustou.', if:R },
{ t:'spr_hide', ch:'klara', if:R },
{ t:'spr_hide', ch:'antoniette', if:R },

/* ======================================================================
   C4 - A FLORESTA
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'per11_floresta', chapter:'per11', title:'A floresta',
  bg:'bg_grey_march_road', bgm:null, if:R },

{ t:'nar', tx:'Depois da aldeia, as copas cobriram a lua. Antoniette perdeu a borda da estrada por três passos.', if:R },
{ t:'nar', tx:'Antoniette conhecia aquele trecho. Tinha atravessado ele em abril, cinco anos antes, com a janela aberta.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela contou os passos, porque passo é a única medida que serve quando não há roda.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Trezentos e quarenta até a curva. Depois a ponte.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Onze minutos de ponte.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Foi a terceira vez naquela noite que ela usou aquele número para medir uma coisa que não tinha nada a ver com ele.', if:R },

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
{ t:'nar', tx:'O pé direito parou adiante do esquerdo. Klara não concluiu o passo.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Klara.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'O ar da estrada esquentou.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'O relógio continuou no pulso dela. Depois, a duração ficou em branco.', if:R },

{ t:'fade_out', if:R },
{ t:'bgm', id:null, if:R },
{ t:'end_chap', line1:'Onze minutos antes da ponte.', line2:'O cocheiro esperou dez.',
  chapter:'per11', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.PER11; }
