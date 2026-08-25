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
{ t:'dial', ch:'klara', tx:'Depois \u00e9 tarde para a forma.', if:{ rota:'perda', taught:'B' } },

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
{ t:'nar', tx:'A conta estava certa. Ela conferiu duas vezes, do jeito que conferia tudo, e fechou nas duas.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Vamos andando. D\u00e1 tempo.', if:R },
{ t:'dial', ch:'klara', tx:'Eu sei.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A menina disse aquilo sem levantar a cabe\u00e7a e sem parar de andar, e Antoniette n\u00e3o perguntou como ela sabia.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Andaram quarenta minutos. Klara n\u00e3o pediu para descansar uma vez.', if:R },
{ t:'nar', tx:'Trocou o saco de pano de m\u00e3o duas vezes, e da segunda vez pegou com a m\u00e3o que j\u00e1 estava carregando.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette reparou e n\u00e3o disse nada, porque dizer teria parado a caminhada.', if:R },

/* ======================================================================
   C4 - A FLORESTA
   Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'per11_floresta', chapter:'per11', title:'A floresta',
  bg:'bg_grey_march_road', bgm:null, if:R },

{ t:'nar', tx:'Depois da aldeia a estrada entra na floresta e fica escura de repente, do jeito que fica quando as copas se tocam.', if:R },
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
{ t:'nar', tx:'N\u00e3o trope\u00e7ou. N\u00e3o olhou para tr\u00e1s. Parou como quem chegou onde ia.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Klara.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'O ar da estrada esquentou.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'E Antoniette, que tinha cinco anos de registro e uma mem\u00f3ria treinada para dura\u00e7\u00f5es, n\u00e3o conseguiu dizer quanto tempo aquilo levou.', if:R },

{ t:'fade_out', if:R },
{ t:'bgm', id:null, if:R },
{ t:'end_chap', line1:'Onze minutos antes da ponte.', line2:'O cocheiro esperou dez.',
  chapter:'per11', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.PER11; }
