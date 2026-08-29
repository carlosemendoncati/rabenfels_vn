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
    'Dez decisões, três ramos cada. No fim do Capítulo 9 a obra se parte em quatro caminhos.',
    'O que você percorreu aparece inteiro. O que faltou aparece como lacuna.'
  ],

  /* ---- as dez escolhas, na ordem em que o roteiro as apresenta ------- */

  escolhas: {

    cap1_aldric: {
      decide: 'Quanto da biblioteca Aldric abre, e o que ele fica sabendo sobre quem está perguntando.',
      opts: {
        B: { curto: 'Perguntar', efeito: 'Ele manda pôr um banquinho na estante do meio antes de ela precisar pedir. Treze beats do Capítulo 2 mudam por causa disso, e os treze dizem a mesma coisa: nada do que ela achar ali vai ser descoberta dela.' },
        A: { curto: 'Aceitar', efeito: 'Ninguém sobe atrás dela. No Capítulo 2 a poeira do chão está intacta até a marca do próprio sapato, e as duas explicações possíveis para isso são ruins de jeitos diferentes.' },
        C: { curto: 'Calar', efeito: 'Ele também não vem conferir, e o Capítulo 2 é o mesmo de A. A diferença inteira está no eixo: calar rende Resposta onde aceitar rende Perda.' }
      }
    },

    cap1_relatorio: {
      decide: 'Se existe um segundo caderno, e em que página ele começa.',
      opts: {
        C: { curto: 'Caderno à parte', efeito: 'O caderno sem identificação começa aqui. No Capítulo 2 e no Capítulo 4 ela tira de baixo do forro do baú um caderno que já tem coisa escrita, em vez de abrir um em branco.' },
        B: { curto: 'Seção própria', efeito: 'Klara ganha seção própria no relatório para Lervel. O caderno sem identificação não começa aqui: começa vazio, no Capítulo 2.' },
        A: { curto: 'As duas juntas', efeito: 'As duas irmãs entram juntas como sujeitos de observação. O caderno sem identificação vai existir assim mesmo, só que em branco até o Capítulo 2.' }
      }
    },

    cap2_lacuna: {
      decide: 'O que a Ordem recebe sobre o intervalo de dois anos que falta nos livros de conta.',
      opts: {
        C: { curto: 'Copiar à mão', efeito: 'Quarenta minutos copiando, contra dois anotando. É a segunda porta de entrada do caderno sem identificação: quem não abriu no Capítulo 1 abre aqui.' },
        B: { curto: 'Cruzar e datar', efeito: 'O intervalo fica datado com precisão e vai inteiro para Lervel. É o maior ganho isolado de Resposta do primeiro ato.' },
        A: { curto: 'Irregularidade', efeito: 'A lacuna vira uma linha de relatório e sai do caminho. É a única das três que não deixa registro particular nenhum.' }
      }
    },

    cap3_borboleta: {
      decide: 'O que Klara recebe do lado de fora, e pela boca de quem. Ela nunca pede a coisa: pede o relato da coisa.',
      opts: {
        B: { curto: 'Descrever', efeito: 'Dezessete beats do entardecer mudam. Klara recebe as borboletas pelo relato, que é o jeito dela de pedir, e não sai da casa.' },
        C: { curto: 'Levar ao pátio', efeito: 'Dezessete beats do entardecer mudam. Klara desce com um xale que não precisava, uma pousa no ombro dela e ela não mexe o ombro.' },
        A: { curto: 'Recusar', efeito: 'Dezessete beats do entardecer mudam. Klara não desce, e o pátio acontece sem ela.' }
      }
    },

    cap4_ritual: {
      decide: 'O que Lervel fica sabendo de outubro do primeiro ano.',
      opts: {
        C: { curto: 'Nada', efeito: 'A omissão é integral e é dela. Vira a página 288. Em Esperança e Perda ela arranca a folha; em Resposta ela a mantém; na Cobertura não chega a compilá-la.' },
        B: { curto: 'Termo e data', efeito: 'Vai o termo e o calendário, e a Ordem arquiva sem responder. Conta como omissão do mesmo jeito, e a página 288 registra isso.' },
        A: { curto: 'Tudo', efeito: 'Lervel recebe outubro inteiro e arquiva sem responder. A página 288 existe assim mesmo, com o outro texto: o que ela mandou, e o que ninguém fez com o que ela mandou.' }
      }
    },

    cap5_camara: {
      decide: 'O que ela responde a uma criança de nove anos que cobriu a ausência dela no andar de cima.',
      opts: {
        C: { curto: 'Dizer', efeito: 'Klara passa a aparecer na biblioteca de manhã e a ficar até o almoço, sem pedir licença. A margem da página 289 registra a verdade e um pedido para não repetir.' },
        B: { curto: 'Negar', efeito: 'Klara volta à biblioteca e nunca mais menciona a ala norte. A margem da página 289 registra uma versão limpa, feita para a menina não ter de carregar aquilo.' },
        A: { curto: 'Deixar fechar', efeito: 'Klara some por nove dias e volta, e nenhuma das duas comenta os nove dias. A margem da página 289 registra: nada.' }
      }
    },

    cap6_ensino: {
      decide: 'O que Klara leva desta casa. É a escolha mais lida da obra — cento e vinte e três beats, do Capítulo 6 ao Epílogo — e Carmine cobra as três versões em voz alta nas quatro rotas.',
      opts: {
        A: { curto: 'O método', efeito: 'Cento e vinte e três beats leem esta escolha, nas quatro rotas. Na Academia, seis anos depois, o curso dela é registro e verificação de fontes. Matheo ensinou aquela disciplina uma vez na vida, a uma escriturária de vinte e dois anos, e acha a coincidência bonita.' },
        B: { curto: 'A forma', efeito: 'Na Academia o curso é protocolo e direito das casas maiores. Matheo anota como escolha de família e passa adiante.' },
        C: { curto: 'O mundo', efeito: 'Na Academia o curso é geografia e línguas do norte. Matheo repara que é curso de gente que pretende sair, e não sabe o que fazer com o reparo.' }
      }
    },

    cap7_relatorio: {
      decide: 'O que Matheo lê, e o que ele conclui de quem escreveu. Ele responde por carta nas três versões.',
      opts: {
        A: { curto: 'Relatar inteiro', efeito: 'A carta chama o relatório de melhor documento que o arquivo recebeu em vinte anos, e manda reduzir o contato pessoal. Junto com a fonte identificada no Capítulo 8, é o par que queima a cobertura dela.' },
        B: { curto: 'Indeterminado', efeito: 'A carta diz que "sem testemunha direta" foi a primeira frase dela que ele leu duas vezes em oito anos, e que ele está anotando a data daquela carta.' },
        C: { curto: 'Não relatar', efeito: 'A carta diz que os relatórios dela encolheram pela metade em quinze meses, e oferece substituição sem registro. Ela lê duas vezes e não responde naquela semana.' }
      }
    },

    cap8_protecao: {
      decide: 'Quem paga a conta de Fenn: ele, a prova, ou o rapaz.',
      opts: {
        B: { curto: 'A informação', efeito: 'Fenn passa a ficar na cocheira em tempo integral e não entra mais na casa. Ela gastou a única pessoa que sabia os horários de dentro. Com agosto relatado na íntegra, é o par que queima a cobertura dela.' },
        A: { curto: 'Fenn', efeito: 'Fenn fica com a chave e com o filho na cocheira, e ela não pede mais nada a ele, porque pedir seria cobrar o obrigado.' },
        C: { curto: 'O rapaz', efeito: 'Fenn aparece sozinho numa noite de junho, diz o horário da guarda sem que ela pergunte, vira as costas e não volta ao assunto em julho inteiro.' }
      }
    },

    cap9_promessa: {
      decide: 'O que Klara entende que foi prometido. Carmine cobra as três versões no Capítulo 11, e Matheo responde ao alerta da Ordem de três jeitos diferentes no Epílogo.',
      opts: {
        C: { curto: 'Dar a data', efeito: 'Klara risca os dias no calendário da cozinha. No Epílogo, Matheo pede informação sobre o calendário de agosto da Academia, e não sabe por que pediu.' },
        B: { curto: 'Prometer', efeito: 'Klara repete a promessa para a irmã na mesma noite. No Epílogo, Matheo solicita visita de rotina à Academia dentro do prazo ordinário.' },
        A: { curto: 'Mostrar o plano', efeito: 'Ela mostra o caderno em vez de prometer. Klara entende como promessa assim mesmo. No Epílogo, Matheo escreve apenas que o alerta seja mantido ativo.' }
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
      condicao: 'Não depende de rota. Depende de duas escolhas, e nas duas ela está CERTA pelas regras da Ordem: relatar agosto do ano três na íntegra e remeter o nome da antecessora com identificação da fonte.',
      porta:    'Nidhaus lê tudo o que entra e sai. Ela pôs o nome de um empregado vivo num envelope que atravessa esta casa.'
    },

    divida: {
      eixos:    [{ r:'loss', d:'alta' }],
      condicao: 'Perda alta, qualquer que seja o resto.',
      porta:    'A soma do que ela decidiu não fazer. É a rota mais longa da obra — quatro capítulos — e a única em que a conta fecha.'
    },

    registro: {
      eixos:    [{ r:'answer', d:'alta' }],
      condicao: 'Resposta alta, e a Perda não chegou ao corte.',
      porta:    'Ela entende tudo e não desce nenhuma noite. O documento sai completo, e sair completo é o preço.'
    },

    arquivo: {
      eixos:    [],
      condicao: 'Sem condição. É o que acontece quando nenhum desvio ocorre, e é a leitura mais comum de longe.',
      porta:    'Ela tenta. Chega mais longe do que qualquer pessoa em cinco séculos, e volta a pé.'
    }

  }

};

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.ARVORE; }
