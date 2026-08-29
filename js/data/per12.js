/* ==========================================================================
   ARQUIVO RABENFELS - js/data/per12.js
   ROTA PERDA - CAPITULO 12: "A Volta"

   Somente dados. TODO BEAT CARREGA if:{ rota:'perda' }.

   QUANDO: madrugada do dia dez, da estrada de volta ate a biblioteca.

   O PENSAMENTO UNICO (Zinsser, unidade):
   "Ela armou a coluna."

   ------------------------------------------------------------------
   ONDE A CORRECAO DO STEINER ACONTECE
   ------------------------------------------------------------------
   Antoniette monta a conta na trilha e a escreve antes do amanhecer:
   tres moedas em maio, onze minutos em agosto, e a soma. E a unica
   pagina do documento em que ela usa a palavra erro.

   Depois Carmine desmonta a conta em quatro palavras, sem explicar:

     "Voce chegou onze minutos atrasada."
     "Cheguei."
     "Eu nao estava contando o tempo."

   E NAO HA RESTO DE FRASE. Antoniette espera o resto, o resto nao vem,
   e ela anota a ausencia na margem com um ponto de interrogacao e
   segue - do mesmo jeito que anota a ausencia de pergunta sobre o
   plano.

   >>> O JOGADOR ENTENDE. ELA NAO. E o documento sai com a conta
       errada dentro, e a conta errada sobrevive a ela. <<<

   NAO DEIXAR NINGUEM EM CENA EXPLICAR. Se alguem enunciar, a rota
   inteira vira licao de moral, que e exatamente o que Steiner reprova.

   Cinco cenas: C1 a volta, C2 a coluna, C3 Carmine, C4 as quatro
   perguntas, C5 os onze minutos.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

var R = { rota: 'perda' };

RBF.PER12 = [

{ t:'chap', num:'CAPÍTULO 12', name:'A VOLTA', chapter:'per12', if:R },
{ t:'fade_out', if:R },

/* ======================================================================
   C1 - A VOLTA
   Sem captura, sem perseguicao. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'per12_volta', chapter:'per12', title:'A volta',
  bg:'bg_grey_march_road', bgm:null, if:R },
{ t:'fade_in', if:R },

{ t:'nar', tx:'O ar voltou ao normal antes das quatro.', if:R },
{ t:'nar', tx:'Foi o único aviso que a estrada deu de que aquilo tinha acabado.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'klara', ex:'blank', pos:'center', if:R },
{ t:'nar', tx:'Klara estava de costas com a mala na mão, a onze minutos da ponte.', if:R },
{ t:'nar', tx:'Antoniette olhou o relógio antes de olhar a menina.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Klara. O barco é às seis.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A menina virou o corpo inteiro, não só a cabeça, e olhou para o lado de onde tinham vindo.', if:R },
{ t:'dial', ch:'klara', tx:'Eu preciso voltar.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Por quê?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Klara puxou ar para responder. Soltou sem palavra.', if:R },
{ t:'dial', ch:'klara', tx:'Não sei.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'klara', tx:'Está com fome de novo. E aquela outra coisa junto.', if:R },
{ t:'nar', tx:'Não soube dar mais que isso.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Klara virou e começou a desfazer o caminho. A mala batia no joelho a cada passo.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'antoniette', ex:'shaken', pos:'left', if:R },
{ t:'inn', tx:'Segura o braço dela.', if:R },
{ t:'inn', tx:'Levanta e carrega. Ela tem doze anos e trinta e oito quilos.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Trinta e oito quilos. Dois braços livres. O rio ainda ao alcance.', if:R },
{ t:'nar', tx:'Nenhum dos três valores explicou por que ela não estendeu a mão.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois foi atrás dela.', if:R },

{ t:'pause', if:R },
{ t:'nar', tx:'Três quilômetros de volta, e nenhuma das duas falou.', if:R },
{ t:'nar', tx:'Passaram o mourão de pedra. O sulco da roda continuava lá, e tinha secado.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'No portão, Klara estendeu a mala. Antoniette levou um segundo para perceber que precisava pegá-la.', if:R },
{ t:'dial', ch:'klara', tx:'Desculpa.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Não foi você.', if:R },
{ t:'nar', tx:'A frase saiu antes da conta e ficou sem correção.', if:R },
{ t:'spr_hide', ch:'klara', if:R },
{ t:'spr_hide', ch:'antoniette', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'As duas entraram pelo mesmo caminho por onde tinham saído, e ninguém na casa soube que elas tinham saído.', if:R },

/* ======================================================================
   C2 - A COLUNA
   A pagina em que ela usa a palavra erro. Saida: soco.
   ====================================================================== */
{ t:'scene', id:'per12_coluna', chapter:'per12', title:'A coluna',
  bg:'bg_archive_closeup', bgm:'bgm_archive', if:R },
{ t:'spr', ch:'antoniette', ex:'away', pos:'center', if:R },

{ t:'nar', tx:'Ela fez o inventário, porque era o que sabia fazer com as mãos tremendo.', if:R },
{ t:'inn', tx:'Caderno. Chave da biblioteca. Duas velas. Papel para umas quarenta páginas.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Depois abriu o caderno de despesas na página de maio e leu a própria letra.', if:R },
{ t:'pause', if:R },
{ t:'arc', key:'caderno', label:'— caderno de despesas · maio —', lns:[
    'Fenn, cocheiro-chefe. Solicitação: 3 moedas.',
    'Objeto: destranca da porta da copa, noite a combinar.',
    '',
    'Desnecessário.'
], if:R },
{ t:'pause', if:R },

{ t:'inn', tx:'Onze minutos.', if:R },
{ t:'inn', tx:'O cocheiro esperou dez.', if:R },
{ t:'pause', if:R },

{ t:'nar', tx:'Ela armou os três valores em coluna, alinhados pela vírgula, com a data ao lado de cada um.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Somou. Conferiu a soma. Somou de trás para frente e conferiu de novo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois escreveu quatro letras ao lado do total, e é a única vez que a palavra aparece nas duzentas e noventa e uma páginas.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Erro.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A conta fecha. Ela fechou nas duas vezes, e vai continuar fechando.', if:R },
{ t:'spr_hide', ch:'antoniette', if:R },

/* ======================================================================
   C3 - CARMINE
   ====================================================================== */
{ t:'scene', id:'per12_carmine', chapter:'per12', title:'Carmine',
  bg:'bg_library_night', bgm:'bgm_camara', if:R },
{ t:'spr', ch:'antoniette', ex:'guarded', pos:'center', if:R },

{ t:'nar', tx:'Ela acendeu a segunda vela e a primeira apagou.', if:R },
{ t:'nar', tx:'Não havia corrente de ar na biblioteca. Ela conferiu as janelas em março e anotou.', if:R },
{ t:'pause', if:R },
{ t:'sfx', id:'sfx_candle', if:R },
{ t:'nar', tx:'A segunda vela continuou acesa.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'voz', tx:'Você ainda está somando.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center', if:R },
{ t:'nar', tx:'A voz chegou do lado esquerdo da mesa, na altura do tampo. Não havia cadeira ali.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Khar’Vel.', if:R },
{ t:'dial', ch:'voz', tx:'Esse não é o meu nome. Mas você inventou bem. Serve.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Vim agradecer.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Cinco anos. Ela lê mais rápido. Corrige adulto sem constranger ninguém.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Ela confere fonte até quando está com fome. Você ensinou isso.', if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'voz', tx:'Ela pede desculpa antes de desobedecer. Você ensinou isso.', if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'voz', tx:'Ela sabe quantos dias há entre esta casa e o rio. Você ensinou isso.', if:{ rota:'perda', taught:'C' } },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Isso eu não dei. Chegou por fora.', if:R },
{ t:'pause', if:R },

/* A rota da Perda quebra o pensamento em valores; a frase longa fica
   reservada a Esperanca. */
{ t:'inn', tx:'Onze minutos. Três moedas. Cinquenta e dois meses. Ela somou sem unidade até concluir que perdera Klara para economizar três moedas.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Não.', if:R },
{ t:'dial', ch:'voz', tx:'Estaria viva do mesmo jeito. Você acertou essa parte.', if:R },

/* ======================================================================
   C4 - AS PERGUNTAS
   Nenhuma sobre o plano. Saida: ponte.
   ====================================================================== */
{ t:'scene', id:'per12_perguntas', chapter:'per12', title:'As perguntas',
  bg:'bg_library_night', keepSprites:true, if:R },

{ t:'spr', ch:'antoniette', ex:'neutral', pos:'center', if:R },
{ t:'dial', ch:'voz', tx:'Ela te chama de quê?', if:R },
{ t:'dial', ch:'antoniette', tx:'Senhorita.', if:R },
{ t:'dial', ch:'voz', tx:'Na frente dos outros. E quando não tem ninguém.', if:R },
{ t:'dial', ch:'antoniette', tx:'Senhorita. Nos dois.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Liara dizia Toni desde o primeiro mês. Em cinco anos, Klara não tinha usado o nome uma vez.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'voz', tx:'Quantas vezes ela procurou você sem precisar de nada?', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu não contei.', if:R },
{ t:'dial', ch:'voz', tx:'Eu contei.', if:R },
{ t:'pause', if:R },

{ t:'spr', ch:'antoniette', ex:'guarded', pos:'center', if:R },
{ t:'dial', ch:'antoniette', tx:'O que isso tem a ver com o cronograma?', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Carmine não respondeu. Antoniette preencheu a pausa sozinha.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'É o calendário.', if:R },
{ t:'inn', tx:'Sou a única coisa nesta casa que chegou perto de mover uma data.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Escreveu data, altura e atraso em três linhas. As três apontavam para ela.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'voz', tx:'Você vai escrever isto. Então escreva certo.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Carmine.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette tinha passado cinco anos batizando aquilo por conta própria.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ela nunca ouviu esse nome. Nem uma vez em doze anos de vida.', if:R },
{ t:'inn', tx:'E eu ouvi hoje.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Você prometeu alguma coisa a ela em fevereiro.', if:R },
{ t:'dial', ch:'antoniette', tx:'Eu mostrei o caderno. Não prometi nada.', if:{ rota:'perda', promised:'A' } },
{ t:'dial', ch:'antoniette', tx:'Eu disse que tiraria ela daqui.', if:{ rota:'perda', promised:'B' } },
{ t:'dial', ch:'antoniette', tx:'Eu dei uma data.', if:{ rota:'perda', promised:'C' } },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Ela entendeu como promessa.', if:{ rota:'perda', promised:'A' } },
{ t:'dial', ch:'carmine', tx:'Sem condição. Ela repetiu para a irmã na mesma noite.', if:{ rota:'perda', promised:'B' } },
{ t:'dial', ch:'carmine', tx:'Agosto, antes do dia dez. Ela contou os dias no calendário da cozinha. Riscando.', if:{ rota:'perda', promised:'C' } },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Hoje é dia dez.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Ela acreditou em você.', if:R },
{ t:'nar', tx:'Carmine não alterou o volume nem esperou defesa.', if:R },

/* ======================================================================
   C4b - O QUE ELA OUVIU NA ESTRADA

   Aqui a cena deixa de ser auditoria.

   Carmine nao veio cobrar cronograma. Ela veio porque o corpo que
   preparou por doze anos quer outra pessoa, e ela vai herdar isso.

   Ela nunca nomeia. Corrige uma palavra, e a correcao e a confissao.
   Ninguem comenta.
   ====================================================================== */
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Ela falou com você na estrada.', if:R },
{ t:'dial', ch:'antoniette', tx:'Falou.', if:R },
{ t:'pause', if:R },
/* O numero nao esta escrito aqui, e de proposito.

   Ele ja ficou para tras tres vezes - \"trinta e uma\" quando a
   caminhada era uma linha de narracao, 65/62/64 quando virou cena,
   96/93/95 quando a infancia entrou. Toda vez ficou errado em
   silencio, na boca da unica personagem da obra que nunca erra um
   registro.

   Agora o beat declara o que contar e `resolveNumeros()`, em
   js/script.js, conta no proprio roteiro na hora da montagem. Sao
   as falas da Klara ate a cena `per11_floresta`, com o ramo de
   `taught` fixado, porque cada partida ve um ramo so.

   Nao ha nada a manter. Se a caminhada crescer, o numero cresce. */
{ t:'dial', ch:'carmine', frases:{ de:'PER11', ch:'klara', ate:'per11_floresta', ramo:'A' }, if:{ rota:'perda', taught:'A' } },
{ t:'dial', ch:'carmine', frases:{ de:'PER11', ch:'klara', ate:'per11_floresta', ramo:'B' }, if:{ rota:'perda', taught:'B' } },
{ t:'dial', ch:'carmine', frases:{ de:'PER11', ch:'klara', ate:'per11_floresta', ramo:'C' }, if:{ rota:'perda', taught:'C' } },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette não tinha contado.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Eu contei.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'“Para a senhorita eu conto e acaba na senhorita.”', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'A frase saiu na entonação da menina. Não parecida com ela. A dela.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center', if:R },
{ t:'dial', ch:'antoniette', tx:'A senhora estava lá.', if:R },
{ t:'dial', ch:'carmine', tx:'Eu estou sempre lá.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Doze anos, escriba.', if:R },
{ t:'dial', ch:'carmine', tx:'Eu aprendi o passo dela antes de ela andar. Aprendi de que lado ela dorme.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette tinha aprendido a segunda coisa em novembro do ano dois, e anotado como posição habitual.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Quando eu ocupar, o corpo não esquece. Nada do que ela sente sai junto.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Fica aqui dentro. Comigo. Todo dia.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Então a senhora perde também.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Carmine não respondeu por tempo demais.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Eu não perco. Eu recebo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Foi a única vez naquela noite em que ela corrigiu a própria palavra.', if:R },

/* Quem ensinou o metodo reconhece o gesto: a correcao e uma emenda de
   escriba, e Antoniette repara nisso antes de reparar no resto. */
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'inn', tx:'Ela emendou ao lado, na mesma linha. Não riscou.', if:{ rota:'perda', taught:'A' } },
{ t:'pause', if:{ rota:'perda', taught:'A' } },
{ t:'inn', tx:'Eu ensinei isso à Klara.', if:{ rota:'perda', taught:'A' } },

{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'A senhora não vai salvar essa menina.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Não hoje, não em setembro, não com barco nenhum.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'E ela vai continuar esperando. É isso que eu vou ter de ouvir.', if:R },

{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Ela vai saber que sou eu?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Vai.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'antoniette', tx:'Ela vai poder falar comigo?', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Não.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette pôs as duas mãos na mesa, uma de cada lado do caderno, e não escreveu nada.', if:R },

/* ======================================================================
   C5 - OS ONZE MINUTOS
   A correcao do Steiner. NAO EXPLICAR. Saida: farpa.
   ====================================================================== */
{ t:'scene', id:'per12_onze', chapter:'per12', title:'Onze minutos',
  bg:'bg_library_night', keepSprites:true, if:R },

{ t:'dial', ch:'carmine', tx:'Você chegou onze minutos atrasada na estrada.', if:R },
{ t:'pause', if:R },
{ t:'spr', ch:'antoniette', ex:'shaken', pos:'center', if:R },
{ t:'dial', ch:'antoniette', tx:'Cheguei.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Eu não estava contando o tempo.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Antoniette esperou o resto da frase.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Não veio resto.', if:R },
{ t:'pause', if:R },

{ t:'dial', ch:'antoniette', tx:'Se eu tivesse chegado às onze e trinta.', if:R },
{ t:'pause', if:R },
{ t:'dial', ch:'carmine', tx:'Boa noite, escriba.', if:R },
{ t:'pause', if:R },

{ t:'sfx', id:'sfx_candle', if:R },
{ t:'nar', tx:'A vela apagou e acendeu de novo.', if:R },
{ t:'nar', tx:'A luz voltou. O lado oposto da mesa continuava vazio.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ela não perguntou nada sobre o plano.', if:R },
{ t:'inn', tx:'Nem uma vez.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Ela anotou aquilo na margem, com um ponto de interrogação, e passou para o assunto seguinte.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Na margem de baixo, com a mesma pena, ela anotou a outra frase e o mesmo ponto de interrogação.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Depois voltou à página da coluna e conferiu a soma pela terceira vez.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Fechava.', if:R },

{ t:'fade_out', if:R },
{ t:'bgm', id:null, if:R },
{ t:'end_chap', line1:'Dez de agosto, quatro da manhã.', line2:'A soma continua fechando.',
  chapter:'per12', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.PER12; }
