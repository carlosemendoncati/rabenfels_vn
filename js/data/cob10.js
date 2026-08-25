/* ==========================================================================
   ARQUIVO RABENFELS - js/data/cob10.js
   ROTA COBERTURA - CAPITULO 10: "A Carruagem"

   Somente dados. TODO BEAT CARREGA if:{ rota:'cobertura' }.

   QUANDO: Ano 5, agosto, dias oito e nove. Ela sai antes do dia dez.

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
   e a cortesia e integral: a carta de referencia e correta e o aviso e
   pago. A casa nao briga. A casa encerra.

   NAO PODE VAZAR: o que acontece na noite do dia nove. Ela esta na
   estrada e nao ve. O jogador tambem nao.

   Cinco cenas: C1 agosto chega, C2 as nove da noite, C3 as malas,
   C4 o patio as cinco e meia, C5 a farpa.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

var R = { rota: 'cobertura' };

RBF.COB10 = [

{ t:'chap', num:'CAP\u00cdTULO 10', name:'A CARRUAGEM', chapter:'cob10', if:R },
{ t:'fade_out', if:R },

/* ======================================================================
   C1 - AGOSTO CHEGA
   Terceiras borboletas. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'cob10_agosto', chapter:'cob10', title:'Terceiro dia',
  bg:'bg_kitchen', bgm:'bgm_nidhaus', if:R },
{ t:'fade_in', if:R },

{ t:'nar', tx:'Vieram no dia tr\u00eas, dois dias antes do padr\u00e3o dos quatro anos anteriores.', if:R },
{ t:'nar', tx:'Antoniette anotou a antecipa\u00e7\u00e3o e olhou o n\u00famero por mais tempo do que precisava.', if:R },
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
{ t:'inn', tx:'A casa est\u00e1 fechando mais cedo do que fecha.', if:R },

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
{ t:'nar', tx:'Serafina levou tempo, e o tempo foi a resposta.', if:R },
{ t:'dial', ch:'serafina', tx:'Quero desejar boa viagem.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Desejou de verdade. Foi o pior da conversa inteira.', if:R },
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

{ t:'inn', tx:'Faltavam trinta e uma horas.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Depois ela sentou na beira da cama e refez o caminho de tr\u00e1s para frente, do jeito que se confere um invent\u00e1rio.', if:R },
{ t:'pause', if:R },

/*
  O PERCURSO.

  Aqui a obra troca de registro e o jogador refaz o caminho com ela.
  A frase de cima e o briefing inteiro: "refez o caminho de tras para
  frente, do jeito que se confere um inventario". O percurso e essa
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
  sets:{ cob_conferiu:true }, padrao:'linha', if:R },

{ t:'scene', id:'cob10_malas_fim', chapter:'cob10', title:'De volta ao quarto',
  bg:'bg_antoniette_room', bgm:'bgm_archive', if:R },
{ t:'fade_in', if:R },
{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center', if:R },

{ t:'inn', tx:'Serafina escreveu a Lervel em maio para conferir as minhas refer\u00eancias. Ela me disse isso na cara.', if:{ rota:'cobertura', cob_maio:true } },
{ t:'inn', tx:'Eu anotei e segui.', if:{ rota:'cobertura', cob_maio:true } },
{ t:'pause', if:{ rota:'cobertura', cob_maio:true } },

{ t:'inn', tx:'O relat\u00f3rio de agosto do ano tr\u00eas saiu daqui num envelope que atravessa esta casa.', if:{ rota:'cobertura', cob_agosto:true } },
{ t:'inn', tx:'O nome da antecessora saiu daqui no mesmo caminho, com a fonte identificada.', if:{ rota:'cobertura', cob_fonte:true } },
{ t:'pause', if:{ rota:'cobertura', cob_agosto:true } },

{ t:'inn', tx:'Prova sem proced\u00eancia n\u00e3o vale em mat\u00e9ria de foro. Est\u00e1 no manual, p\u00e1gina onze.', if:{ rota:'cobertura', cob_manual:true } },
{ t:'pause', if:{ rota:'cobertura', cob_manual:true } },

/* Quem atravessou o percurso sem abrir gaveta nenhuma nao le a lista
   acima. Le esta, que diz a mesma coisa sem nomear as pecas. Nao e
   punicao - e o mesmo fato com menos detalhe, que e exatamente o que
   sobra de quem conferiu depressa. */
{ t:'inn', tx:'Tudo o que saiu daqui saiu por dentro desta casa. E tudo o que sai daqui e lido antes de sair.', if:{ rota:'cobertura', cob_livro:false } },
{ t:'pause', if:{ rota:'cobertura', cob_livro:false } },

{ t:'nar', tx:'Ela achou a linha. Levou quarenta minutos e achou a linha, e a linha estava correta.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'away', pos:'center', if:R },
{ t:'inn', tx:'Eu fiz o procedimento certo.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Foi o procedimento certo que me tirou daqui.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'N\u00e3o escreveu nada naquela noite. Foi a \u00fanica noite em cinco anos em que ela n\u00e3o escreveu nada.', if:R },
{ t:'spr_hide', ch:'antoniette', if:R },

/* ======================================================================
   C4 - O PATIO AS CINCO E MEIA
   Ninguem desce. Liara desce. Klara nao. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'cob10_patio', chapter:'cob10', title:'Cinco e meia',
  bg:'bg_nidhaus_gate', bgm:null, if:R },

{ t:'nar', tx:'A carruagem estava no p\u00e1tio \u00e0s cinco e meia, com o cocheiro j\u00e1 sentado.', if:R },
{ t:'nar', tx:'Fenn levou as malas e n\u00e3o disse nada al\u00e9m de bom dia.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'P\u00f4s o ba\u00fa de ferramentas por \u00faltimo, de p\u00e9, do jeito que ela sempre pedia, e ela nunca tinha pedido a ele.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'liara', ex:'bright', pos:'right', if:R },
{ t:'nar', tx:'Liara desceu de camisola, com o cabelo por tran\u00e7ar, e ningu\u00e9m tinha avisado Liara.', if:R },
{ t:'dial', ch:'liara', tx:'A senhorita volta em setembro?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'N\u00e3o.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Liara ficou parada processando aquilo, e foi a \u00fanica vez em cinco anos em que ela n\u00e3o achou o que dizer.', if:R },
{ t:'dial', ch:'liara', tx:'Ent\u00e3o t\u00e1.', if:R },
{ t:'nar', tx:'Depois abra\u00e7ou, do jeito que ela abra\u00e7ava, sem perguntar se podia.', if:R },
{ t:'spr_hide', ch:'liara', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'A janela do quarto das g\u00eameas dava para o p\u00e1tio. A cortina estava aberta.', if:R },
{ t:'nar', tx:'Antoniette olhou uma vez e n\u00e3o olhou de novo.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Se ela estiver ali, eu vou ter de acenar.', if:R },
{ t:'inn', tx:'E acenar \u00e9 uma despedida, e despedida \u00e9 uma informa\u00e7\u00e3o.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela subiu na carruagem de costas para a casa e sentou do lado que n\u00e3o tinha janela.', if:R },

/* ======================================================================
   C5 - A FARPA
   Ela nao ve. O jogador tambem nao. NAO EXPLICAR.
   ====================================================================== */
{ t:'scene', id:'cob10_farpa', chapter:'cob10', title:'Quatro horas',
  bg:'bg_grey_march_road', bgm:null, if:R },

{ t:'nar', tx:'A estrada de Velha Nidhaus at\u00e9 a Marca Cinzenta leva onze horas de carruagem.', if:R },
{ t:'nar', tx:'Ela dormiu duas, o que era mais do que dormia em casa.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Na segunda parada, num p\u00e1tio de posta a quatro horas dali, ela pediu papel e n\u00e3o escreveu.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Faltavam quatro horas para a Marca Cinzenta.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'No mesmo intervalo, a duzentos e trinta quil\u00f4metros dali, o ar de um quarto esquentou.', if:R },
{ t:'nar', tx:'N\u00e3o h\u00e1 registro disso em documento nenhum, porque a \u00fanica pessoa daquela casa que registrava estava numa estrada.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'E Antoniette, que tinha cinco anos de registro e uma mem\u00f3ria treinada para dura\u00e7\u00f5es, n\u00e3o soube dizer, depois, o que estava fazendo naquela hora.', if:R },

{ t:'fade_out', if:R },
{ t:'bgm', id:null, if:R },
{ t:'end_chap', line1:'Agosto do quinto ano.', line2:'Ela saiu no dia nove, \u00e0s seis.',
  chapter:'cob10', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.COB10; }
