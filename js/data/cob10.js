/* ==========================================================================
   ARQUIVO RABENFELS - js/data/cob10.js
   ROTA COBERTURA - CAPITULO 10: "A Porta"

   Somente dados. TODO BEAT CARREGA if:{ rota:'cobertura' }.

   QUANDO: Ano 5, agosto, dias oito e nove. Carmine a mata antes da fuga.

   O PENSAMENTO UNICO (Zinsser, unidade):
   "Ninguem acusou nada."

   ------------------------------------------------------------------
   O QUE QUEIMA A COBERTURA
   ------------------------------------------------------------------
   Duas escolhas, e nas duas ela esta CERTA pelas regras da Ordem:
   relatou agosto do ano tres na integra, com hora, local e testemunha
   direta, e remeteu o nome da antecessora COM identificacao da fonte,
   porque prova sem proveniencia nao vale em materia de foro.

   Nidhaus le tudo o que entra e sai. E canon desde o Capitulo 1.
   Ela pos o nome de um empregado vivo dentro de um envelope que
   atravessa esta casa.

   >>> SER HONESTA COM A ORDEM E O QUE A ENTREGA. <<<

   E O SENTIMENTO DE CIMA E VERGONHA PROFISSIONAL, e nao medo. Ela nao
   foi descoberta por descuido nem por azar: foi descoberta por
   competencia. O que doi nao e a expulsao. E saber exatamente qual
   linha do proprio relatorio a entregou.

   ------------------------------------------------------------------
   A REGRA DA CENA COM SERAFINA
   ------------------------------------------------------------------
   Serafina NAO acusa, NAO diz a palavra Ordem e NAO da motivo. Ela da
   horario. Toda fala dela tem segunda camada legivel so na releitura,
   e a cortesia e integral: a carta de referencia seria correta e o aviso
   e pago. A casa nao briga. A casa encerra. Carmine encerra o resto.

   Tres cenas e o percurso: agosto chega, Serafina da o horario, ela acha
   a linha e Carmine a mata diante da porta do patio. Nao ha combate.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

var R = { rota: 'cobertura' };

RBF.COB10 = [

{ t:'chap', num:'CAP\u00cdTULO 10', name:'A PORTA', chapter:'cob10', if:R },
{ t:'fade_out', if:R },

/* ======================================================================
   C1 - AGOSTO CHEGA
   Terceiras borboletas. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'cob10_agosto', chapter:'cob10', title:'Terceiro dia',
  bg:'bg_kitchen', bgm:'bgm_nidhaus', if:R },
{ t:'fade_in', if:R },

{ t:'nar', tx:'Vieram no dia tr\u00eas. A margem do caderno guardava quatro datas anteriores; nenhuma era t\u00e3o cedo.', if:R },
{ t:'nar', tx:'A tinta do n\u00famero tr\u00eas secou com a pena ainda suspensa.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'dara', ex:'guarded', pos:'center', if:R },
{ t:'nar', tx:'Dara encheu a caneca e n\u00e3o sentou do outro lado da mesa, o que ela fazia havia cinco anos.', if:R },
{ t:'dial', ch:'dara', tx:'A copa fecha \u00e0s seis esta semana.', if:R },
{ t:'dial', ch:'antoniette', tx:'\u00c0s seis?', if:R },
{ t:'dial', ch:'dara', tx:'Ordem da senhora.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Dara levou a caneca para a pia sem beber, e a pia ficava atr\u00e1s de Antoniette.', if:R },
{ t:'nar', tx:'Ela deu a volta pelo lado comprido da mesa para chegar l\u00e1.', if:R },
{ t:'spr_hide', ch:'dara', if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'Ela conta a prataria toda noite e nunca deu a volta na mesa em cinco anos.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'A cozinha fecha primeiro. Depois fecham o resto.', if:R },

/* ======================================================================
   C2 - AS NOVE DA NOITE
   Serafina encerra. Nao ha acusacao, e e isso que nao da para
   contestar. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'cob10_serafina', chapter:'cob10', title:'Nove da noite',
  bg:'bg_main_hall', bgm:null, if:R },

{ t:'nar', tx:'Serafina mandou cham\u00e1-la \u00e0s nove da noite do dia oito.', if:R },
{ t:'nar', tx:'Em cinco anos, Serafina nunca tinha mandado cham\u00e1-la depois do jantar.', if:R },
{ t:'spr', ch:'serafina', ex:'grave', pos:'right', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'serafina', tx:'A carruagem sai amanh\u00e3 \u00e0s seis. J\u00e1 est\u00e1 arranjada.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu n\u00e3o pedi carruagem.', if:R },
{ t:'dial', ch:'serafina', tx:'N\u00e3o pediu.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Antoniette esperou a acusa\u00e7\u00e3o. Contou at\u00e9 dez esperando a acusa\u00e7\u00e3o.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'serafina', tx:'A senhorita trabalhou bem aqui. Vou escrever isso a quem pedir.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'O contrato vai at\u00e9 dezembro.', if:R },
{ t:'dial', ch:'serafina', tx:'Vai. Os dois meses de aviso est\u00e3o pagos, e o resto tamb\u00e9m.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela disse o valor exato. Estava certo, e inclu\u00eda o m\u00eas que ainda n\u00e3o tinha sido trabalhado.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'A senhora quer me dizer alguma coisa?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Serafina deixou passar uma respira\u00e7\u00e3o antes de responder.', if:R },
{ t:'dial', ch:'serafina', tx:'Quero desejar boa viagem.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A voz n\u00e3o tinha ironia. Antoniette procurou e n\u00e3o encontrou.', if:R },
{ t:'spr_hide', ch:'serafina', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'N\u00e3o houve acusa\u00e7\u00e3o. N\u00e3o houve a palavra Ordem. N\u00e3o houve nada que ela pudesse contestar.', if:R },

/* ======================================================================
   C3 - AS MALAS
   Ela sabe qual linha a entregou, e a linha e uma linha correta.
   Saida: soco.
   ====================================================================== */
{ t:'scene', id:'cob10_malas', chapter:'cob10', title:'O forro do ba\u00fa',
  bg:'bg_antoniette_room', bgm:'bgm_archive', if:R },
{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center', if:R },

{ t:'nar', tx:'Ela arrumou as duas malas e o ba\u00fa de ferramentas na ordem de sempre.', if:R },
{ t:'nar', tx:'O caderno sem identifica\u00e7\u00e3o foi no forro, onde tinha ficado quatro anos.', if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'Faltavam nove horas.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Depois sentou na beira da cama e refez o caminho de tr\u00e1s para a frente, item por item.', if:R },
{ t:'pause', if:R },

/*
  O PERCURSO.

  Aqui a obra troca de registro e o jogador refaz o caminho com ela.
  A frase de cima e o briefing inteiro: "refez o caminho de tras para
  a frente, item por item". O percurso e essa
  frase jogada, e nao um acontecimento novo.

  O que ele apura entra como flag e volta nos beats abaixo. O que ele
  NAO apura nao vira lacuna: ela chega a conclusao de qualquer jeito,
  porque o canon ja diz que ela chegou. O jogador decide quanto do
  trabalho dela ele viu, e nao SE ela trabalhou.

  Sem canvas - validador, navegador sem 2d - o beat resolve na hora
  com `sets`, e o capitulo corre inteiro pelo caminho de baixo.
*/
{ t:'percurso', id:'cob10_inventario', chapter:'cob10',
  campo:'cob_saida', conta:'cob_apurou',
  sets:{ cob_conferiu:true }, naoConta:['cob_vista'],
  padrao:'carmine', if:R },

/* O canvas fecha em preto depois dos tres quadros de Carmine. A VN volta
   apenas para registrar o que aconteceu; Antoniette nao volta a narrar. */
{ t:'scene', id:'cob10_terceira', chapter:'cob10', title:'A terceira contagem',
  bg:'bg_black', bgm:null, if:R },
{ t:'fade_in', if:R },

{ t:'nar', tx:'A vela bateu no piso primeiro. O vidro n\u00e3o quebrou.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'O caderno caiu aberto na p\u00e1gina duzentos e quarenta e um.', if:R },
{ t:'nar', tx:'Carmine p\u00f4s o p\u00e9 sobre a m\u00e3o que ainda segurava a capa.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'O primeiro estalo veio do indicador. Os dedos soltaram no segundo.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A porta do p\u00e1tio estava a quatro passos.', if:R },
{ t:'nar', tx:'Antoniette alcan\u00e7ou a primeira t\u00e1bua. Carmine puxou pelo tornozelo antes da segunda. O joelho bateu na soleira. Depois o rosto. Na segunda tentativa de puxar ar, n\u00e3o saiu som.', if:R },

{ t:'fade_out', if:R },
{ t:'end_chap', line1:'A carruagem saiu \u00e0s seis.', line2:'Antoniette n\u00e3o chegou ao p\u00e1tio.',
  chapter:'cob10', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.COB10; }
