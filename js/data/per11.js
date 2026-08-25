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

   Ela fala a lingua da casa porque e a unica que deram a ela: contagem,
   procedimento, inventario. Nenhuma frase dela e bonita. Todas sao
   exatas, e e por isso que doem.

   Confianca, para a Klara, e ENTREGA DE INFORMACAO. Ela nao diz que
   confia: ela conta o que sabe, porque numa casa assim informacao e a
   unica moeda que uma crianca tem.

   NAO EXPLICAR NADA DISTO DEPOIS.
   ====================================================================== */
{ t:'spr', ch:'klara', ex:'neutral', pos:'right', if:R },
{ t:'spr', ch:'antoniette', ex:'neutral', pos:'left', if:R },

{ t:'dial', ch:'antoniette', tx:'Se cansar, voc\u00ea diz.', if:R },
{ t:'dial', ch:'klara', tx:'Eu digo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela n\u00e3o disse.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Vinte minutos sem ningu\u00e9m falar. Foi a menina que falou primeiro, e ela nunca falava primeiro.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'klara', tx:'A senhorita quer saber uma coisa que serve?', if:R },
{ t:'dial', ch:'antoniette', tx:'Quero.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A porta da c\u00e2mara n\u00e3o tranca por dentro. Tranca por fora e por baixo.', if:R },
{ t:'dial', ch:'klara', tx:'Se algu\u00e9m prender a de baixo com pano, ela n\u00e3o fecha.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette perdeu meio passo e voltou ao ritmo.', if:R },
{ t:'dial', ch:'antoniette', tx:'Como voc\u00ea sabe disso?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Eu conto as coisas enquanto espero.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela n\u00e3o disse esperando o qu\u00ea, e Antoniette n\u00e3o perguntou.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'S\u00e3o quarenta e um ladrilhos do lado comprido e vinte e sete do curto. Um est\u00e1 rachado.', if:R },
{ t:'dial', ch:'klara', tx:'O rachado fica embaixo da mesa. D\u00e1 para achar com o p\u00e9 sem olhar.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ela decorou o ch\u00e3o daquela sala com o p\u00e9.', if:R },

/* ---- o que ela faz com o que aprendeu -------------------------------
   Mesma menina, tres ferramentas. Nenhuma delas e melhor.
   -------------------------------------------------------------------- */

/* A - O METODO. Ela confere a propria memoria antes de entregar, e pede
   correcao. Confiar, para ela, virou submeter um dado a verificacao. */
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'klara', tx:'Eu conferi isso duas vezes, em noites diferentes.', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'antoniette', tx:'Por qu\u00ea?', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'klara', tx:'Uma noite s\u00f3 \u00e9 fonte \u00fanica.', if:{ rota:'perda', taught:'A' } },
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'nar', tx:'Antoniette tinha dito aquela frase na biblioteca, uma vez, sem saber que estava dando uma regra a algu\u00e9m.', if:{ rota:'perda', taught:'A' } },
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'klara', tx:'Se estiver errado, a senhorita corrige do lado. N\u00e3o risca.', if:{ rota:'perda', taught:'A' } },
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'inn', tx:'Ela devolveu a regra inteira, com a emenda e tudo.', if:{ rota:'perda', taught:'A' } },

/* B - A FORMA. Ela trata a fuga como divida, porque foi o que deram a
   ela para pensar com. */
{ t:'pause', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'klara', tx:'Eu n\u00e3o agradeci ao Fenn pela porta.', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'antoniette', tx:'Ele foi pago.', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'klara', tx:'Pago n\u00e3o \u00e9 a mesma coisa.', if:{ rota:'perda', taught:'B' } },
{ t:'pause', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'klara', tx:'Quem abre porta de noite fica devendo, e quem fica devendo tem nome.', if:{ rota:'perda', taught:'B' } },
{ t:'pause', if:{ rota:'perda', taught:'B' } },
/* A narracao dizia "e estava certa da forma que ia custar a alguem
   mais tarde" - o narrador piscando para o leitor sobre uma cena que
   ainda nao aconteceu. O fato basta. */
{ t:'nar', tx:'Ela estava certa.', if:{ rota:'perda', taught:'B' } },
{ t:'pause', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'klara', tx:'Quando eu puder, eu pago.', if:{ rota:'perda', taught:'B' } },

/* C - O MUNDO. Ela pergunta pelo lado de fora. E a coisa mais parecida
   com esperanca que ela ja disse em cinco anos. */
{ t:'pause', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'klara', tx:'No livro do norte tem uma cidade em cima da \u00e1gua.', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'antoniette', tx:'Tem.', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'klara', tx:'As casas ficam em estaca. A senhorita j\u00e1 viu?', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o.', if:{ rota:'perda', taught:'C' } },
{ t:'pause', if:{ rota:'perda', taught:'C' } },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o a gente vai ver as duas primeiro.', if:{ rota:'perda', taught:'C' } },
{ t:'pause', if:{ rota:'perda', taught:'C' } },
{ t:'nar', tx:'Foi a \u00fanica frase daquela noite em que ela usou a palavra gente.', if:{ rota:'perda', taught:'C' } },

{ t:'pause', if:R },
{ t:'spr', ch:'klara', ex:'lowered', pos:'right', if:R },
{ t:'dial', ch:'klara', tx:'Eles medem antes e medem depois.', if:R },
{ t:'dial', ch:'antoniette', tx:'Medem o qu\u00ea?', if:R },
{ t:'dial', ch:'klara', tx:'Tudo. Bra\u00e7o, pulso, quanto eu durmo, quanto eu como.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita tamb\u00e9m mede.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette n\u00e3o respondeu.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'N\u00e3o \u00e9 igual. A senhorita mede e n\u00e3o escreve num livro que outra pessoa l\u00ea.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela escrevia. Num caderno sem identifica\u00e7\u00e3o, no forro do ba\u00fa, e o caderno tinha destinat\u00e1rio em Lervel.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette andou onze passos antes de dizer qualquer coisa, e o que disse foi que faltavam tr\u00eas quil\u00f4metros.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Eu n\u00e3o tenho medo da c\u00e2mara.', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Tenho medo de acordar no meio.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Uma vez eu acordei. Eles n\u00e3o perceberam.', if:R },
{ t:'dial', ch:'klara', tx:'Eu fiquei quieta at\u00e9 acabar, porque se eu me mexesse eles iam recome\u00e7ar do come\u00e7o.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela disse aquilo com a mesma voz com que tinha dito o n\u00famero de ladrilhos.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette tirou o l\u00e1pis do bolso do casaco.', if:R },
{ t:'nar', tx:'Levou o l\u00e1pis at\u00e9 a altura do papel e parou ali.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Altera\u00e7\u00e3o de padr\u00e3o de sono. Relato direto de procedimento. Fonte prim\u00e1ria.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela guardou o l\u00e1pis sem escrever.', if:R },
{ t:'nar', tx:'Foi a primeira vez em cinco anos, e ela n\u00e3o soube dizer a si mesma por qu\u00ea.', if:R },

{ t:'pause', if:R },
{ t:'spr', ch:'klara', ex:'neutral', pos:'right', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita \u00e9 a \u00fanica pessoa que pergunta antes de fazer.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Liara n\u00e3o pergunta. Liara conta depois.', if:R },
{ t:'dial', ch:'antoniette', tx:'Liara \u00e9 sua irm\u00e3.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'\u00c9. E eu conto tudo para a Liara.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'E a Liara conta para a m\u00e3e.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Para a senhorita eu conto e acaba na senhorita.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette olhou a estrada adiante por mais tempo do que a estrada exigia.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita disse em fevereiro que ia me tirar de l\u00e1.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu disse.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Eu contei os dias. Cento e oitenta e tr\u00eas.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'N\u00e3o risquei nenhum errado.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu sei.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'A senhorita n\u00e3o sabia. Eu estou dizendo agora.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Klara passou o saco de pano para a outra m\u00e3o e andou meio passo mais perto.', if:R },
{ t:'nar', tx:'Ficou naquela dist\u00e2ncia pelos vinte minutos que faltavam, e nenhuma das duas ajustou.', if:R },
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
