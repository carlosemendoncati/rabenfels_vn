/* ==========================================================================
   ARQUIVO RABENFELS - js/data/arvore.js

   A ARVORE - texto anotado das dez escolhas e das quatro leituras.

   Somente dados. Quem monta e js/arvore.js; quem desenha e js/menu.js.

   ------------------------------------------------------------------
   O QUE VIVE AQUI E O QUE NAO VIVE
   ------------------------------------------------------------------
   Aqui vive so o que NAO da para derivar do roteiro: o que a escolha
   decide, e o que cada opcao muda depois.

   O delta de rota NAO esta escrito neste arquivo, de proposito. Ele e
   lido do campo 'routes' da propria opcao, em js/data/chapter*.js, pelo
   mesmo motivo que o engine faz isso: numero repetido em dois lugares
   fica errado no dia em que um dos dois muda. A tela mostra o valor que
   o jogo aplica, nao um valor transcrito.

   ------------------------------------------------------------------
   REGRA DE VERACIDADE
   ------------------------------------------------------------------
   Cada 'efeito' abaixo foi conferido contra o roteiro, beat a beat, e
   nao contra memoria. As contagens sao contagens de verdade:

     aldric_pressed   13 beats no Cap. 2
     archive_seed      2 no Cap. 2, 2 no Cap. 4
     klara_asked      17 no Cap. 3
     told_klara        3 no Cap. 6, 3 no Cap. 11
     taught          123 do Cap. 6 ao Epilogo (subiu de 108 quando as
                     quatro rotas passaram a ler a mesma escolha)
     lied_to_order     3 no Cap. 8, 1 no Cap. 9, 3 no Cap. 11
     third_paid        8 no Cap. 9, 3 no Cap. 11
     promised          6 no Cap. 11, 3 no Epilogo

   Ao mexer no roteiro, rodar `node tools/arvore.js` - ele reconta e
   falha se um numero citado aqui deixar de bater.

   ------------------------------------------------------------------
   'curto' E O ROTULO DO NO NO FLUXOGRAMA
   ------------------------------------------------------------------
   Duas a tres palavras. Cabe dentro da caixa em telefone, e e a unica
   coisa que o jogador le sem clicar. Nao e resumo do efeito: e o nome
   da acao, do jeito que ela apareceria num indice.

   O validador reprova rotulo com mais de 18 caracteres, que e onde a
   caixa comeca a cortar na coluna estreita.

   ------------------------------------------------------------------
   O QUE APARECE E QUANDO
   ------------------------------------------------------------------
   Nada aqui e liberado para demonstrar. Quem decide o que a tela
   mostra e js/arvore.js, contra progresso real:

     - o painel so abre com a obra terminada uma vez
     - o enunciado e as tres opcoes aparecem quando o capitulo daquela
       escolha foi alcancado - o jogador ja leu aquele texto na tela
     - o delta de rota e o 'efeito' so aparecem no ramo que ele
       PERCORREU de fato, em qualquer partida
     - o ramo nao percorrido aparece como lacuna, e nao some

   O mesmo vale para os finais: a condicao inteira so aparece no que ja
   foi alcancado. No que falta aparecem os eixos, e nada mais - o
   bastante para o jogador saber para onde empurrar, longe do bastante
   para nao entregar o final.

   ------------------------------------------------------------------
   ESCRITA
   ------------------------------------------------------------------
   Escrever com acento e rodar `node tools/escape.js js/data/arvore.js`.
   O arquivo e ASCII puro com escapes \uXXXX, como todo js/data.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

RBF.ARVORE = {

  /* Cabecalho do painel. Registro do Compilador, como o resto do extra. */
  nota: [
    'Dez decis\u00f5es, tr\u00eas ramos cada. No fim do Cap\u00edtulo 9 a obra se parte em quatro caminhos.',
    'O que voc\u00ea percorreu aparece inteiro. O que faltou aparece como lacuna.'
  ],

  /* ---- as dez escolhas, na ordem em que o roteiro as apresenta ------- */

  escolhas: {

    cap1_aldric: {
      decide: 'Quanto da biblioteca Aldric abre, e o que ele fica sabendo sobre quem est\u00e1 perguntando.',
      opts: {
        B: { curto: 'Perguntar', efeito: 'Ele manda p\u00f4r um banquinho na estante do meio antes de ela precisar pedir. Treze beats do Cap\u00edtulo 2 mudam por causa disso, e os treze dizem a mesma coisa: nada do que ela achar ali vai ser descoberta dela.' },
        A: { curto: 'Aceitar', efeito: 'Ningu\u00e9m sobe atr\u00e1s dela. No Cap\u00edtulo 2 a poeira do ch\u00e3o est\u00e1 intacta at\u00e9 a marca do pr\u00f3prio sapato, e as duas explica\u00e7\u00f5es poss\u00edveis para isso s\u00e3o ruins de jeitos diferentes.' },
        C: { curto: 'Calar', efeito: 'Ele tamb\u00e9m n\u00e3o vem conferir, e o Cap\u00edtulo 2 \u00e9 o mesmo de A. A diferen\u00e7a inteira est\u00e1 no eixo: calar rende Resposta onde aceitar rende Perda.' }
      }
    },

    cap1_relatorio: {
      decide: 'Se existe um segundo caderno, e em que p\u00e1gina ele come\u00e7a.',
      opts: {
        C: { curto: 'Caderno \u00e0 parte', efeito: 'O caderno sem identifica\u00e7\u00e3o come\u00e7a aqui. No Cap\u00edtulo 2 e no Cap\u00edtulo 4 ela tira de baixo do forro do ba\u00fa um caderno que j\u00e1 tem coisa escrita, em vez de abrir um em branco.' },
        B: { curto: 'Se\u00e7\u00e3o pr\u00f3pria', efeito: 'Klara ganha se\u00e7\u00e3o pr\u00f3pria no relat\u00f3rio para Lervel. O caderno sem identifica\u00e7\u00e3o n\u00e3o come\u00e7a aqui: come\u00e7a vazio, no Cap\u00edtulo 2.' },
        A: { curto: 'As duas juntas', efeito: 'As duas irm\u00e3s entram juntas como sujeitos de observa\u00e7\u00e3o. O caderno sem identifica\u00e7\u00e3o vai existir assim mesmo, s\u00f3 que em branco at\u00e9 o Cap\u00edtulo 2.' }
      }
    },

    cap2_lacuna: {
      decide: 'O que a Ordem recebe sobre o intervalo de dois anos que falta nos livros de conta.',
      opts: {
        C: { curto: 'Copiar \u00e0 m\u00e3o', efeito: 'Quarenta minutos copiando, contra dois anotando. \u00c9 a segunda porta de entrada do caderno sem identifica\u00e7\u00e3o: quem n\u00e3o abriu no Cap\u00edtulo 1 abre aqui.' },
        B: { curto: 'Cruzar e datar', efeito: 'O intervalo fica datado com precis\u00e3o e vai inteiro para Lervel. \u00c9 o maior ganho isolado de Resposta do primeiro ato.' },
        A: { curto: 'Irregularidade', efeito: 'A lacuna vira uma linha de relat\u00f3rio e sai do caminho. \u00c9 a \u00fanica das tr\u00eas que n\u00e3o deixa registro particular nenhum.' }
      }
    },

    cap3_borboleta: {
      decide: 'O que Klara recebe do lado de fora, e pela boca de quem. Ela nunca pede a coisa: pede o relato da coisa.',
      opts: {
        B: { curto: 'Descrever', efeito: 'Dezessete beats do entardecer mudam. Klara recebe as borboletas pelo relato, que \u00e9 o jeito dela de pedir, e n\u00e3o sai da casa.' },
        C: { curto: 'Levar ao p\u00e1tio', efeito: 'Dezessete beats do entardecer mudam. Klara desce com um xale que n\u00e3o precisava, uma pousa no ombro dela e ela n\u00e3o mexe o ombro.' },
        A: { curto: 'Recusar', efeito: 'Dezessete beats do entardecer mudam. Klara n\u00e3o desce, e o p\u00e1tio acontece sem ela.' }
      }
    },

    cap4_ritual: {
      decide: 'O que Lervel fica sabendo de outubro do primeiro ano.',
      opts: {
        C: { curto: 'Nada', efeito: 'A omiss\u00e3o \u00e9 integral e \u00e9 dela. Vira a p\u00e1gina 288. Em Esperan\u00e7a e Perda ela arranca a folha; em Resposta ela a mant\u00e9m; na Cobertura n\u00e3o chega a compil\u00e1-la.' },
        B: { curto: 'Termo e data', efeito: 'Vai o termo e o calend\u00e1rio, e a Ordem arquiva sem responder. Conta como omiss\u00e3o do mesmo jeito, e a p\u00e1gina 288 registra isso.' },
        A: { curto: 'Tudo', efeito: 'Lervel recebe outubro inteiro e arquiva sem responder. A p\u00e1gina 288 existe assim mesmo, com o outro texto: o que ela mandou, e o que ningu\u00e9m fez com o que ela mandou.' }
      }
    },

    cap5_camara: {
      decide: 'O que ela responde a uma crian\u00e7a de nove anos que cobriu a aus\u00eancia dela no andar de cima.',
      opts: {
        C: { curto: 'Dizer', efeito: 'Klara passa a aparecer na biblioteca de manh\u00e3 e a ficar at\u00e9 o almo\u00e7o, sem pedir licen\u00e7a. A margem da p\u00e1gina 289 registra a verdade e um pedido para n\u00e3o repetir.' },
        B: { curto: 'Negar', efeito: 'Klara volta \u00e0 biblioteca e nunca mais menciona a ala norte. A margem da p\u00e1gina 289 registra uma vers\u00e3o limpa, feita para a menina n\u00e3o ter de carregar aquilo.' },
        A: { curto: 'Deixar fechar', efeito: 'Klara some por nove dias e volta, e nenhuma das duas comenta os nove dias. A margem da p\u00e1gina 289 registra: nada.' }
      }
    },

    cap6_ensino: {
      decide: 'O que Klara leva desta casa. \u00c9 a escolha mais lida da obra \u2014 cento e vinte e tr\u00eas beats, do Cap\u00edtulo 6 ao Ep\u00edlogo \u2014 e Carmine cobra as tr\u00eas vers\u00f5es em voz alta nas quatro rotas.',
      opts: {
        A: { curto: 'O m\u00e9todo', efeito: 'Cento e vinte e tr\u00eas beats leem esta escolha, nas quatro rotas. Na Academia, seis anos depois, o curso dela \u00e9 registro e verifica\u00e7\u00e3o de fontes. Matheo ensinou aquela disciplina uma vez na vida, a uma escritur\u00e1ria de vinte e dois anos, e acha a coincid\u00eancia bonita.' },
        B: { curto: 'A forma', efeito: 'Na Academia o curso \u00e9 protocolo e direito das casas maiores. Matheo anota como escolha de fam\u00edlia e passa adiante.' },
        C: { curto: 'O mundo', efeito: 'Na Academia o curso \u00e9 geografia e l\u00ednguas do norte. Matheo repara que \u00e9 curso de gente que pretende sair, e n\u00e3o sabe o que fazer com o reparo.' }
      }
    },

    cap7_relatorio: {
      decide: 'O que Matheo l\u00ea, e o que ele conclui de quem escreveu. Ele responde por carta nas tr\u00eas vers\u00f5es.',
      opts: {
        A: { curto: 'Relatar inteiro', efeito: 'A carta chama o relat\u00f3rio de melhor documento que o arquivo recebeu em vinte anos, e manda reduzir o contato pessoal. Junto com a fonte identificada no Cap\u00edtulo 8, \u00e9 o par que queima a cobertura dela.' },
        B: { curto: 'Indeterminado', efeito: 'A carta diz que "sem testemunha direta" foi a primeira frase dela que ele leu duas vezes em oito anos, e que ele est\u00e1 anotando a data daquela carta.' },
        C: { curto: 'N\u00e3o relatar', efeito: 'A carta diz que os relat\u00f3rios dela encolheram pela metade em quinze meses, e oferece substitui\u00e7\u00e3o sem registro. Ela l\u00ea duas vezes e n\u00e3o responde naquela semana.' }
      }
    },

    cap8_protecao: {
      decide: 'Quem paga a conta de Fenn: ele, a prova, ou o rapaz.',
      opts: {
        B: { curto: 'A informa\u00e7\u00e3o', efeito: 'Fenn passa a ficar na cocheira em tempo integral e n\u00e3o entra mais na casa. Ela gastou a \u00fanica pessoa que sabia os hor\u00e1rios de dentro. Com agosto relatado na \u00edntegra, \u00e9 o par que queima a cobertura dela.' },
        A: { curto: 'Fenn', efeito: 'Fenn fica com a chave e com o filho na cocheira, e ela n\u00e3o pede mais nada a ele, porque pedir seria cobrar o obrigado.' },
        C: { curto: 'O rapaz', efeito: 'Fenn aparece sozinho numa noite de junho, diz o hor\u00e1rio da guarda sem que ela pergunte, vira as costas e n\u00e3o volta ao assunto em julho inteiro.' }
      }
    },

    cap9_promessa: {
      decide: 'O que Klara entende que foi prometido. Carmine cobra as tr\u00eas vers\u00f5es no Cap\u00edtulo 11, e Matheo responde ao alerta da Ordem de tr\u00eas jeitos diferentes no Ep\u00edlogo.',
      opts: {
        C: { curto: 'Dar a data', efeito: 'Klara risca os dias no calend\u00e1rio da cozinha. No Ep\u00edlogo, Matheo pede informa\u00e7\u00e3o sobre o calend\u00e1rio de agosto da Academia, e n\u00e3o sabe por que pediu.' },
        B: { curto: 'Prometer', efeito: 'Klara repete a promessa para a irm\u00e3 na mesma noite. No Ep\u00edlogo, Matheo solicita visita de rotina \u00e0 Academia dentro do prazo ordin\u00e1rio.' },
        A: { curto: 'Mostrar o plano', efeito: 'Ela mostra o caderno em vez de prometer. Klara entende como promessa assim mesmo. No Ep\u00edlogo, Matheo escreve apenas que o alerta seja mantido ativo.' }
      }
    }

  },

  /* ---- as quatro leituras ---------------------------------------------
     'eixos' aparece sempre, inclusive na leitura que ainda nao foi
     alcancada, e traz a DIRECAO de cada eixo - alta ou baixa.

     A direcao entrou depois da primeira montagem da tela. Sem ela, os
     cartoes fechados diziam "leitura nao alcancada" e mais nada, e a
     grade virava uma parede: o jogador nao tinha como distinguir um do
     outro nem como saber para onde empurrar. Com ela, A Perda e A
     Resposta se tornam destinos legiveis sem entregar o que acontece.

     E o limite: DIRECAO de rota, nunca conteudo. 'condicao' e 'porta'
     continuam presos a leitura ja alcancada.                          */

  finais: {

    cover_burned: {
      eixos:    [],
      condicao: 'N\u00e3o depende de rota. Depende de duas escolhas, e nas duas ela est\u00e1 CERTA pelas regras da Ordem: relatar agosto do ano tr\u00eas na \u00edntegra e remeter o nome da antecessora com identifica\u00e7\u00e3o da fonte.',
      porta:    'Nidhaus l\u00ea tudo o que entra e sai. Ela p\u00f4s o nome de um empregado vivo num envelope que atravessa esta casa.'
    },

    divida: {
      eixos:    [{ r:'loss', d:'alta' }],
      condicao: 'Perda alta, qualquer que seja o resto.',
      porta:    'A soma do que ela decidiu n\u00e3o fazer. \u00c9 a rota mais longa da obra \u2014 quatro cap\u00edtulos \u2014 e a \u00fanica em que a conta fecha.'
    },

    registro: {
      eixos:    [{ r:'answer', d:'alta' }],
      condicao: 'Resposta alta, e a Perda n\u00e3o chegou ao corte.',
      porta:    'Ela entende tudo e n\u00e3o desce nenhuma noite. O documento sai completo, e sair completo \u00e9 o pre\u00e7o.'
    },

    arquivo: {
      eixos:    [],
      condicao: 'Sem condi\u00e7\u00e3o. \u00c9 o que acontece quando nenhum desvio ocorre, e \u00e9 a leitura mais comum de longe.',
      porta:    'Ela tenta. Chega mais longe do que qualquer pessoa em cinco s\u00e9culos, e volta a p\u00e9.'
    }

  }

};

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.ARVORE; }
