/* ==========================================================================
   ARQUIVO RABENFELS - js/data/chapter10.js
   CAPITULO 10: "A Fuga"

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.

   QUANDO: Ano 5, agosto. Klara e Liara tem doze anos.
   TERCEIRAS BORBOLETAS - as ultimas da obra.

   O PENSAMENTO UNICO (Zinsser, unidade):
   "Faltavam quatro horas."

   A TROCA (docs/estrutura_v1.md):
   Ela entrega tudo o que sobrou. Nao ha o que ganhar neste capitulo.

   NAO TEM ESCOLHA, DE PROPOSITO.
   A essa altura nao ha mais o que escolher, e a ausencia de escolha e o
   ponto. O jogador ja decidiu tudo o que podia decidir no Capitulo 9.

   ESTE E O PSEUDOCLIMAX (Frey).
   "Se for bem feito, o leitor vai acreditar que o assassino foi pego.
   Ah, mas nao!" E o aviso de execucao que faltava: nao deixar o jogador
   escorregar para uma zona de conforto achando que a historia acabou.
   POR ISSO O CAPITULO TERMINA EM FARPA, E NAO EM FIM.
   Uma linha que nao fecha, e corte.

   LE 'ending' (decidido no Cap. 9 pelo beat { t:'ending' }).
   O tronco e um; a cena da noite diverge em quatro:
     archive      - a tentativa inteira
     early        - ela ja tentou em fevereiro e falhou. Agosto e a espera
     distance     - ela nao vai. Fica na cama e escuta
     cover_burned - Serafina a remove antes do dia dez
   Compoe, nao multiplica: o resto do capitulo e compartilhado.

   LE 'taught' e 'promised' para textura.

   LIARA FICA. Nao sabe que esta sendo deixada, e nao sabe que e por isso
   que ela vive.

   NAO PODE VAZAR: que Klara agiu. Isso e o Capitulo 11, e ninguem
   explica em cena. O jogador conclui.

   Cinco cenas: C1 agosto chega, C2 o ultimo dia, C3 a noite (diverge),
   C4 o que sobrou, C5 a farpa.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

RBF.CHAPTER10 = [

{ t:'chap', num:'CAP\u00cdTULO 10', name:'A FUGA', chapter:'capitulo10' },
{ t:'fade_out' },

/* ======================================================================
   C1 - AGOSTO CHEGA
   Terceiras borboletas. O jogador ja aprendeu a ler. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c10_agosto', chapter:'capitulo10', title:'Terceiro dia',
  bg:'bg_kitchen', bgm:'bgm_nidhaus' },
{ t:'fade_in' },

{ t:'nar', tx:'Vieram no dia tr\u00eas, dois dias antes do padr\u00e3o dos quatro anos anteriores.' },
{ t:'nar', tx:'Antoniette anotou a antecipa\u00e7\u00e3o e olhou o n\u00famero por mais tempo do que precisava.' },
{ t:'pause' },

{ t:'inn', tx:'Dois dias antes.' },
{ t:'inn', tx:'Em cinco anos isso nunca variou mais que um.' },

{ t:'spr', ch:'dara', ex:'guarded', pos:'center' },
{ t:'nar', tx:'Dara encheu a caneca e n\u00e3o sentou do outro lado da mesa, o que ela fazia havia cinco anos.' },
{ t:'dial', ch:'dara', tx:'A copa fecha \u00e0s seis esta semana.' },
{ t:'dial', ch:'antoniette', tx:'\u00c0s seis?' },
{ t:'dial', ch:'dara', tx:'Ordem da senhora.' },
{ t:'spr_hide', ch:'dara' },
{ t:'pause' },

{ t:'inn', tx:'Oito, sempre. Cinco anos de oito.' },
{ t:'inn', tx:'Ningu\u00e9m muda o hor\u00e1rio da copa por causa de bicho.' },
{ t:'pause' },
{ t:'inn', tx:'A casa est\u00e1 fechando mais cedo do que fecha.' },

/* ======================================================================
   C2 - O ULTIMO DIA
   Liara fica, e nao sabe. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'c10_ultimo_dia', chapter:'capitulo10', title:'O \u00faltimo dia',
  bg:'bg_corridor', bgm:null },

{ t:'nar', tx:'No dia nove, \u00e0 tarde, as duas estavam no degrau do corredor leste.' },
{ t:'spr', ch:'klara', ex:'neutral', pos:'center' },
{ t:'spr', ch:'liara', ex:'bright', pos:'right' },

{ t:'dial', ch:'liara', tx:'Mil novecentos e trinta e dois.' },
{ t:'dial', ch:'klara', tx:'Mil novecentos e trinta e dois.' },
{ t:'nar', tx:'Liara olhou para a irm\u00e3, porque a irm\u00e3 nunca concordava com a conta de primeira.' },
{ t:'pause' },
{ t:'dial', ch:'liara', tx:'Voc\u00ea conferiu?' },
{ t:'dial', ch:'klara', tx:'Confirmei.' },

{ t:'nar', tx:'Liara aceitou aquilo e passou a falar do que ia levar para Eldoria.' },
{ t:'nar', tx:'Falou por onze minutos, incluindo dois pares de botas que ela n\u00e3o tinha.' },
{ t:'pause' },

{ t:'nar', tx:'Klara ouviu inteiro. N\u00e3o corrigiu nenhuma das botas.' },
{ t:'pause' },
{ t:'nar', tx:'Depois pediu para Liara tran\u00e7ar o cabelo dela, o que ela nunca pedia.' },
{ t:'nar', tx:'Liara tran\u00e7ou mal, desmanchou e recome\u00e7ou tr\u00eas vezes, e a irm\u00e3 deixou.' },

{ t:'spr_hide', ch:'liara' },
{ t:'spr_hide', ch:'klara' },
{ t:'pause' },
{ t:'nar', tx:'Antoniette passou no fim do corredor com dois volumes que n\u00e3o precisava carregar.' },
{ t:'inn', tx:'Ela est\u00e1 se despedindo.' },
{ t:'pause' },
{ t:'inn', tx:'E fez isso do \u00fanico jeito que n\u00e3o levanta pergunta nenhuma.' },

/* ======================================================================
   C3 - A NOITE
   Diverge pelo final decidido no Capitulo 9.
   ====================================================================== */
{ t:'scene', id:'c10_noite', chapter:'capitulo10', title:'Onze e meia',
  bg:'bg_antoniette_room', bgm:'bgm_archive' },

{ t:'nar', tx:'A troca da guarda do port\u00e3o era \u00e0s onze e meia. Ela sabia disso havia quatro meses.' },
{ t:'pause' },

/* --- A COBERTURA QUEIMADA ------------------------------------------- */
{ t:'nar', tx:'Serafina mandou cham\u00e1-la \u00e0s nove da noite do dia oito.', if:{ ending:'cover_burned' } },
{ t:'spr', ch:'serafina', ex:'grave', pos:'right', if:{ ending:'cover_burned' } },
{ t:'dial', ch:'serafina', tx:'A carruagem sai amanh\u00e3 \u00e0s seis. J\u00e1 est\u00e1 arranjada.', if:{ ending:'cover_burned' } },
{ t:'dial', ch:'antoniette', tx:'Eu n\u00e3o pedi carruagem.', if:{ ending:'cover_burned' } },
{ t:'dial', ch:'serafina', tx:'N\u00e3o pediu.', if:{ ending:'cover_burned' } },
{ t:'pause', if:{ ending:'cover_burned' } },
{ t:'dial', ch:'serafina', tx:'A senhorita trabalhou bem aqui. Vou escrever isso a quem pedir.', if:{ ending:'cover_burned' } },
{ t:'spr_hide', ch:'serafina', if:{ ending:'cover_burned' } },
{ t:'nar', tx:'N\u00e3o houve acusa\u00e7\u00e3o. N\u00e3o houve a palavra Ordem. N\u00e3o houve nada que ela pudesse contestar.', if:{ ending:'cover_burned' } },
{ t:'pause', if:{ ending:'cover_burned' } },
{ t:'nar', tx:'Ela arrumou as duas malas e o ba\u00fa de ferramentas na ordem de sempre.', if:{ ending:'cover_burned' } },
{ t:'nar', tx:'O caderno sem identifica\u00e7\u00e3o foi no forro, onde tinha ficado quatro anos.', if:{ ending:'cover_burned' } },
{ t:'inn', tx:'Faltavam trinta e uma horas.', if:{ ending:'cover_burned' } },

/* --- O DISTANCIAMENTO ------------------------------------------------ */
{ t:'nar', tx:'Ela ficou vestida em cima da cama, com o papel no bolso interno, at\u00e9 as onze e vinte.', if:{ ending:'distance' } },
{ t:'pause', if:{ ending:'distance' } },
{ t:'nar', tx:'\u00c0s onze e vinte e cinco levantou e foi at\u00e9 a porta do quarto.', if:{ ending:'distance' } },
{ t:'nar', tx:'P\u00f4s a m\u00e3o na ma\u00e7aneta e ficou ali.', if:{ ending:'distance' } },
{ t:'pause', if:{ ending:'distance' } },
{ t:'inn', tx:'Probabilidade honesta: baixa.', if:{ ending:'distance' } },
{ t:'inn', tx:'Eu escrevi isso em junho com a minha letra.', if:{ ending:'distance' } },
{ t:'pause', if:{ ending:'distance' } },
{ t:'nar', tx:'A guarda trocou \u00e0s onze e meia. Ela ouviu, do quarto, os dois pares de botas no cal\u00e7amento.', if:{ ending:'distance' } },
{ t:'nar', tx:'Ouviu tamb\u00e9m a segunda troca, \u00e0s tr\u00eas e meia.', if:{ ending:'distance' } },
{ t:'pause', if:{ ending:'distance' } },
{ t:'nar', tx:'N\u00e3o tirou a m\u00e3o da ma\u00e7aneta em nenhuma das duas.', if:{ ending:'distance' } },
{ t:'inn', tx:'Faltavam quatro horas, e depois n\u00e3o faltava mais nada.', if:{ ending:'distance' } },

/* --- AGOSTO ANTECIPADO ----------------------------------------------- */
{ t:'nar', tx:'A tentativa tinha sido em fevereiro, seis meses antes, e durou quarenta minutos.', if:{ ending:'early' } },
{ t:'nar', tx:'Chegaram ao segundo port\u00e3o. O cocheiro contratado n\u00e3o estava onde tinha dito que estaria.', if:{ ending:'early' } },
{ t:'pause', if:{ ending:'early' } },
{ t:'nar', tx:'Ningu\u00e9m gritou com ela. Levaram a menina para dentro e a deixaram no p\u00e1tio.', if:{ ending:'early' } },
{ t:'inn', tx:'Eu fui r\u00e1pida porque tinha medo de ficar lenta.', if:{ ending:'early' } },
{ t:'inn', tx:'E fui r\u00e1pida sem o cocheiro conferido.', if:{ ending:'early' } },
{ t:'pause', if:{ ending:'early' } },
{ t:'nar', tx:'De fevereiro a agosto n\u00e3o houve segunda janela. A menina passou a ser acompanhada at\u00e9 no corredor.', if:{ ending:'early' } },
{ t:'nar', tx:'E agosto veio assim mesmo, no dia tr\u00eas, dois dias antes do padr\u00e3o.', if:{ ending:'early' } },
{ t:'inn', tx:'Faltavam quatro horas, e eu j\u00e1 tinha gastado as minhas em fevereiro.', if:{ ending:'early' } },

/* --- O ARQUIVO: a tentativa ------------------------------------------ */
{ t:'nar', tx:'\u00c0s onze e vinte e cinco ela desceu pela escada de servi\u00e7o com o papel no bolso interno.', if:{ ending:'archive' } },
{ t:'nar', tx:'A porta da cozinha estava destrancada, como Fenn tinha dito que estaria.', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },

{ t:'spr', ch:'klara', ex:'neutral', pos:'center', if:{ ending:'archive' } },
{ t:'nar', tx:'Klara j\u00e1 estava no p\u00e9 da escada, vestida, com o saco de pano na m\u00e3o.', if:{ ending:'archive' } },
{ t:'nar', tx:'N\u00e3o perguntou nada. N\u00e3o disse nada. Foi atr\u00e1s.', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },

{ t:'sfx', id:'sfx_door', if:{ ending:'archive' } },
{ t:'nar', tx:'A guarda trocou \u00e0s onze e meia e as duas atravessaram o p\u00e1tio em quarenta segundos.', if:{ ending:'archive' } },
{ t:'nar', tx:'A corrente da porta nordeste estava no lugar de sempre, com os dois elos pendurados.', if:{ ending:'archive' } },
{ t:'nar', tx:'Elas passaram longe dela.', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },

{ t:'scene', id:'c10_estrada', chapter:'capitulo10', title:'A estrada',
  bg:'bg_grey_march_road', keepSprites:true, if:{ ending:'archive' } },
{ t:'nar', tx:'A estrada do vale \u00e0 meia-noite \u00e9 mais clara do que se espera. A lua bate na pedra molhada.', if:{ ending:'archive' } },
{ t:'nar', tx:'Andaram quarenta minutos sem falar, no ritmo que Antoniette tinha calculado para uma crian\u00e7a.', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },

{ t:'dial', ch:'klara', tx:'A senhorita conferiu o hor\u00e1rio da carro\u00e7a?', if:{ ending:'archive', taught:'A' } },
{ t:'dial', ch:'antoniette', tx:'Tr\u00eas vezes.', if:{ ending:'archive', taught:'A' } },
{ t:'dial', ch:'klara', tx:'Ent\u00e3o est\u00e1 certo.', if:{ ending:'archive', taught:'A' } },

{ t:'dial', ch:'klara', tx:'Eu devia ter agradecido antes de sair.', if:{ ending:'archive', taught:'B' } },
{ t:'dial', ch:'antoniette', tx:'Agradece depois.', if:{ ending:'archive', taught:'B' } },
{ t:'dial', ch:'klara', tx:'Depois \u00e9 tarde para a forma.', if:{ ending:'archive', taught:'B' } },

{ t:'dial', ch:'klara', tx:'O rio fica de que lado do sol?', if:{ ending:'archive', taught:'C' } },
{ t:'dial', ch:'antoniette', tx:'Esquerda, de manh\u00e3.', if:{ ending:'archive', taught:'C' } },
{ t:'dial', ch:'klara', tx:'Est\u00e1 no livro. Eu queria conferir com a senhorita.', if:{ ending:'archive', taught:'C' } },

{ t:'pause', if:{ ending:'archive' } },
{ t:'nar', tx:'Passaram a aldeia \u00e0s quarenta minutos. Quinze casas caiadas, um po\u00e7o, roupa no varal.', if:{ ending:'archive' } },
{ t:'nar', tx:'N\u00e3o havia ningu\u00e9m acordado, e as janelas estavam fechadas apesar do calor de agosto.', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },
{ t:'inn', tx:'Quatro horas at\u00e9 o barco.', if:{ ending:'archive' } },
{ t:'inn', tx:'Est\u00e1 dando certo.', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },
{ t:'inn', tx:'Eu n\u00e3o escrevi essa frase no plano porque n\u00e3o se escreve isso num plano.', if:{ ending:'archive' } },

/* ======================================================================
   C4 - O QUE SOBROU
   Reconverge. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'c10_sobrou', chapter:'capitulo10', title:'O que sobrou',
  bg:'bg_grey_march_road', bgm:null },

{ t:'nar', tx:'Depois da aldeia a estrada entra na floresta e fica escura de repente, do jeito que fica quando as copas se tocam.',
  if:{ ending:'archive' } },
{ t:'nar', tx:'Antoniette conhecia aquele trecho. Tinha atravessado ele em abril, cinco anos antes, com a janela aberta.',
  if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },

{ t:'nar', tx:'No quarto, ela tirou o papel do bolso e o leu inteiro mais uma vez, \u00e0 vela.',
  if:{ ending:'distance' } },
{ t:'nar', tx:'Estava tudo certo. Datas, hor\u00e1rios, o que funciona e o que n\u00e3o funciona.',
  if:{ ending:'distance' } },
{ t:'pause', if:{ ending:'distance' } },

{ t:'nar', tx:'Ela passou a primeira semana de agosto catalogando o arquivo de contas que Serafina tinha oferecido.',
  if:{ ending:'early' } },
{ t:'nar', tx:'Aceitar tinha sido a \u00fanica forma de continuar na casa depois de fevereiro.',
  if:{ ending:'early' } },
{ t:'pause', if:{ ending:'early' } },

{ t:'nar', tx:'A carruagem estava no p\u00e1tio \u00e0s cinco e meia, com o cocheiro j\u00e1 sentado.',
  if:{ ending:'cover_burned' } },
{ t:'nar', tx:'Ningu\u00e9m desceu para se despedir. Fenn levou as malas e n\u00e3o disse nada al\u00e9m de bom dia.',
  if:{ ending:'cover_burned' } },
{ t:'pause', if:{ ending:'cover_burned' } },

{ t:'nar', tx:'Em algum ponto daquela noite, Antoniette escreveu a \u00faltima entrada do Arquivo.' },
{ t:'nar', tx:'N\u00e3o h\u00e1 registro da hora. A caligrafia continuava firme. O espa\u00e7amento n\u00e3o.' },
{ t:'pause' },
{ t:'inn', tx:'Est\u00e1 tudo nas p\u00e1ginas anteriores.' },
{ t:'inn', tx:'Cinco anos de trabalho. Use.' },

/* ======================================================================
   C5 - A FARPA
   Frey: nao deixar o jogador escorregar para a zona de conforto.
   Uma linha que nao fecha, e corte. NAO EXPLICAR.
   ====================================================================== */
{ t:'scene', id:'c10_farpa', chapter:'capitulo10', title:'Quatro horas',
  bg:'bg_black', bgm:null },

{ t:'nar', tx:'Faltavam quatro horas para o barco.', if:{ ending:'archive' } },
{ t:'nar', tx:'Faltavam quatro horas para o amanhecer.', if:{ ending:'distance' } },
{ t:'nar', tx:'Faltavam quatro horas para o amanhecer.', if:{ ending:'early' } },
{ t:'nar', tx:'Faltavam quatro horas para a carruagem.', if:{ ending:'cover_burned' } },
{ t:'pause' },

{ t:'spr', ch:'klara', ex:'blank', pos:'center', if:{ ending:'archive' } },
{ t:'nar', tx:'No meio da floresta, Klara parou de andar.', if:{ ending:'archive' } },
{ t:'nar', tx:'N\u00e3o trope\u00e7ou. N\u00e3o olhou para tr\u00e1s. Parou como quem chegou onde ia.', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },
{ t:'dial', ch:'antoniette', tx:'Klara.', if:{ ending:'archive' } },
{ t:'pause', if:{ ending:'archive' } },
{ t:'nar', tx:'O ar da floresta esquentou.', if:{ ending:'archive' } },

{ t:'nar', tx:'Do outro lado do corredor, a porta do quarto das g\u00eameas abriu e fechou.', if:{ ending:'distance' } },
{ t:'nar', tx:'Passos curtos no assoalho, indo at\u00e9 o alto da escada. E parando l\u00e1.', if:{ ending:'distance' } },
{ t:'pause', if:{ ending:'distance' } },
{ t:'nar', tx:'Ficaram parados por um tempo que Antoniette n\u00e3o conseguiu medir.', if:{ ending:'distance' } },
{ t:'nar', tx:'O ar do corredor esquentou.', if:{ ending:'distance' } },

{ t:'nar', tx:'No p\u00e1tio, algu\u00e9m atravessou em dire\u00e7\u00e3o \u00e0 porta nordeste. Passos curtos. Peso de crian\u00e7a.', if:{ ending:'early' } },
{ t:'nar', tx:'Ningu\u00e9m acompanhando.', if:{ ending:'early' } },
{ t:'pause', if:{ ending:'early' } },
{ t:'nar', tx:'O ar do p\u00e1tio esquentou.', if:{ ending:'early' } },

{ t:'nar', tx:'Ela ouviu a porta do quarto das g\u00eameas \u00e0s duas e dez, e depois passos descendo.', if:{ ending:'cover_burned' } },
{ t:'nar', tx:'Ficou de p\u00e9 no escuro, com a mala fechada ao lado da cama, esperando uma batida que n\u00e3o veio.', if:{ ending:'cover_burned' } },
{ t:'pause', if:{ ending:'cover_burned' } },
{ t:'nar', tx:'O ar do quarto esquentou.', if:{ ending:'cover_burned' } },

{ t:'pause' },
{ t:'nar', tx:'E Antoniette, que tinha cinco anos de registro e uma mem\u00f3ria treinada para dura\u00e7\u00f5es, n\u00e3o conseguiu dizer quanto tempo aquilo levou.' },

{ t:'fade_out' },
{ t:'bgm', id:null },
{ t:'end_chap', line1:'Agosto do quinto ano.', line2:'Faltavam quatro horas.',
  chapter:'capitulo10' },
{ t:'fade_out' }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.CHAPTER10; }
