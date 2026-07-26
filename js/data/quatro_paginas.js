/* ==========================================================================
   ARQUIVO RABENFELS - js/data/quatro_paginas.js

   AS QUATRO PAGINAS.

   Somente dados. Nenhum caminho de asset, nenhuma logica de render.
   Quem monta e desenha e js/paginas.js.

   ------------------------------------------------------------------
   O QUE E ISTO
   ------------------------------------------------------------------
   O Prologo planta em P2: Matheo conta o maco e para em duzentas e
   oitenta e sete, com a numeracao dela terminando em duzentos e
   noventa e um. "Faltam quatro."

   O Capitulo 11 mostra ela arrancando as quatro, contando para baixo,
   e guardando dentro do livro-caixa da casa.

   O Epilogo cobra: o tribunal indefere por "sem terceiro lesado
   identificavel". As quatro paginas eram exatamente os terceiros - um
   por pagina. O ultimo ato de protecao dela foi o que matou o
   processo, e Matheo morre sem saber disso.

   >>> ESTE EXTRA E O QUE MATHEO NUNCA RECEBEU. <<<

   So abre depois do Epilogo, e o texto de cada pagina e montado com as
   flags da partida que o jogador terminou. Nao ha versao "canonica":
   as quatro paginas sao o registro do que ELE fez com o metodo dela.

   ------------------------------------------------------------------
   REGRAS DE ESCRITA DESTAS PAGINAS
   ------------------------------------------------------------------
   - Voz do Compilador: terceira pessoa, notarial, nunca "eu". E o que
     a Ordem ensina e o que Matheo ensinou a ela.
   - A mascara escorrega uma vez por pagina, na ultima linha, e volta.
     E o unico lugar da obra onde ela escreve sabendo que arrancou.
   - Nada de lore nova. Cada pagina so registra o que o jogador viveu.
   - As palavras mae, filha e amor continuam proibidas.
   - Carmine nao aparece. Antoniette nunca soube.

   ------------------------------------------------------------------
   ESTRUTURA
   ------------------------------------------------------------------
   Cada pagina tem:
     num    numeracao original dela, do maco de 291
     titulo cabecalho da entrada
     flag   qual escolha decide a variante
     vars   texto por valor da flag; 'lns' e o corpo, 'margem' e a nota
            de rodape do Compilador, e 'mao' e a linha em que a mascara
            escorrega
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.QUATRO_PAGINAS = {

  /* Cabecalho do documento, comum as quatro. */
  cabecalho: [
    'Retiradas do corpo do Arquivo em 10 de agosto, entre as tr\u00eas e trinta e as quatro e dez.',
    'Repostas no livro-caixa da casa, no lugar das quatro folhas em branco do fim.',
    'Numera\u00e7\u00e3o original mantida.'
  ],

  paginas: [

  /* --------------------------------------------------------------------
     288 - OUTUBRO DO PRIMEIRO ANO
     Le hid_from_order (cap. 4).
     -------------------------------------------------------------------- */
  {
    num: '288',
    titulo: 'Outubro, ano um \u2014 o p\u00e1tio',
    flag: 'hid_from_order',
    vars: {
      'true': {
        lns: [
          'Em 19 de outubro o Compilador presenciou, da porta nordeste, procedimento',
          'que a casa denomina treinamento. Dura\u00e7\u00e3o aproximada de quarenta minutos.',
          'Tr\u00eas adultos presentes al\u00e9m dos guardi\u00f5es. Uma crian\u00e7a.',
          '',
          'O relat\u00f3rio remetido a Lervel no fecho daquele m\u00eas registrou invent\u00e1rio',
          'de volumes e estado de encaderna\u00e7\u00e3o. N\u00e3o registrou o p\u00e1tio.',
          '',
          'A omiss\u00e3o foi deliberada e \u00e9 de responsabilidade exclusiva do Compilador.'
        ],
        margem: 'Nota: a decis\u00e3o foi tomada para preservar a cobertura por mais um ciclo. ' +
                'A cobertura durou quatro anos depois disso, o que confirma o c\u00e1lculo e ' +
                'n\u00e3o confirma mais nada.',
        mao: 'Ningu\u00e9m em Lervel soube de outubro porque eu decidi que n\u00e3o soubessem.'
      },
      'false': {
        lns: [
          'Em 19 de outubro o Compilador presenciou, da porta nordeste, procedimento',
          'que a casa denomina treinamento. O relat\u00f3rio do m\u00eas foi remetido \u00edntegro,',
          'com termo, calend\u00e1rio e descri\u00e7\u00e3o do que foi ouvido atrav\u00e9s da porta.',
          '',
          'Lervel acusou recebimento em nove dias. A resposta instru\u00eda o Compilador',
          'a manter a posi\u00e7\u00e3o e continuar observando.',
          '',
          'A instru\u00e7\u00e3o foi cumprida por quatro anos.'
        ],
        margem: 'Nota: o procedimento correto foi executado na primeira oportunidade e ' +
                'produziu a instru\u00e7\u00e3o de n\u00e3o fazer nada. Isto tamb\u00e9m \u00e9 um dado.',
        mao: 'Eu fiz tudo certo em outubro do primeiro ano e me mandaram continuar olhando.'
      }
    }
  },

  /* --------------------------------------------------------------------
     289 - FEVEREIRO DO SEGUNDO ANO
     Le told_klara (cap. 5). A camara.
     -------------------------------------------------------------------- */
  {
    num: '289',
    titulo: 'Fevereiro, ano dois \u2014 a ala norte',
    flag: 'told_klara',
    vars: {
      'A': {
        lns: [
          'O Compilador desceu \u00e0 c\u00e2mara em 11 de fevereiro e permaneceu quatro minutos.',
          'A aus\u00eancia no andar de cima foi coberta por um menor de nove anos, que',
          'declarou aos adultos da casa uma localiza\u00e7\u00e3o falsa do Compilador.',
          '',
          'O menor n\u00e3o foi instru\u00eddo a fazer isso e agiu por conta pr\u00f3pria.',
          '',
          'O assunto n\u00e3o foi retomado com o menor em nenhum momento posterior.'
        ],
        margem: 'Nota: n\u00e3o retomar foi avaliado como a op\u00e7\u00e3o de menor exposi\u00e7\u00e3o para ' +
                'as duas partes.',
        mao: 'Ela esperou quatro anos que eu tocasse no assunto e eu deixei fechar sozinho.'
      },
      'B': {
        lns: [
          'O Compilador desceu \u00e0 c\u00e2mara em 11 de fevereiro e permaneceu quatro minutos.',
          'A aus\u00eancia no andar de cima foi coberta por um menor de nove anos, que',
          'declarou aos adultos da casa uma localiza\u00e7\u00e3o falsa do Compilador.',
          '',
          'Questionado depois pelo pr\u00f3prio menor, o Compilador forneceu vers\u00e3o',
          'incompleta dos fatos, calibrada para reduzir o que o menor teria de',
          'sustentar caso fosse interrogado pela casa.'
        ],
        margem: 'Nota: a vers\u00e3o fornecida era falsa em dois pontos e verific\u00e1vel em ' +
                'nenhum. O menor aceitou sem contestar, o que indica que percebeu.',
        mao: 'Menti para ela achando que estava carregando o peso, e ela deixou eu achar.'
      },
      'C': {
        lns: [
          'O Compilador desceu \u00e0 c\u00e2mara em 11 de fevereiro e permaneceu quatro minutos.',
          'A aus\u00eancia no andar de cima foi coberta por um menor de nove anos, que',
          'declarou aos adultos da casa uma localiza\u00e7\u00e3o falsa do Compilador.',
          '',
          'O Compilador confirmou os fatos ao menor e solicitou que a conduta',
          'n\u00e3o se repetisse. A solicita\u00e7\u00e3o foi recebida sem resposta verbal.',
          '',
          'A conduta n\u00e3o se repetiu. A frequ\u00eancia dos encontros aumentou.'
        ],
        margem: 'Nota: pedir que n\u00e3o se repetisse foi entendido pelo menor como reconhecimento ' +
                'de v\u00ednculo. N\u00e3o era a inten\u00e7\u00e3o declarada.',
        mao: 'Eu pedi para ela n\u00e3o fazer de novo e ela ouviu outra coisa, e a outra coisa era verdade.'
      }
    }
  },

  /* --------------------------------------------------------------------
     290 - AGOSTO DO TERCEIRO ANO
     Le lied_to_order (cap. 7).
     -------------------------------------------------------------------- */
  {
    num: '290',
    titulo: 'Agosto, ano tr\u00eas \u2014 o relat\u00f3rio',
    flag: 'lied_to_order',
    vars: {
      'A': {
        lns: [
          'O epis\u00f3dio de 7 de agosto foi relatado a Lervel na \u00edntegra, com hora,',
          'local, testemunhas e descri\u00e7\u00e3o do que o Compilador viu aflorar no p\u00e1tio.',
          '',
          'A resposta chegou em nove semanas e instru\u00eda a manter a observa\u00e7\u00e3o.',
          '',
          'A partir desta data o Compilador passou a considerar que a Ordem',
          'recebeu informa\u00e7\u00e3o suficiente para agir e optou por n\u00e3o agir.'
        ],
        margem: 'Nota: a hip\u00f3tese de incompet\u00eancia foi descartada. Lervel \u00e9 competente. ' +
                'Resta a hip\u00f3tese que o Compilador n\u00e3o est\u00e1 em posi\u00e7\u00e3o de investigar.',
        mao: 'Eu contei tudo e eles arquivaram, e eu continuei mandando relat\u00f3rio por dois anos.'
      },
      'B': {
        lns: [
          'O epis\u00f3dio de 7 de agosto foi relatado a Lervel como ocorr\u00eancia de',
          'natureza indeterminada, sem testemunha direta.',
          '',
          'Havia testemunha direta. Era o Compilador.',
          '',
          'Lervel pediu detalhamento em quinze dias. O detalhamento remetido',
          'manteve a caracteriza\u00e7\u00e3o original.'
        ],
        margem: 'Nota: a caracteriza\u00e7\u00e3o foi escolhida para evitar remo\u00e7\u00e3o do Compilador do ' +
                'posto antes da conclus\u00e3o do trabalho. O trabalho n\u00e3o foi conclu\u00eddo.',
        mao: 'Foi a primeira coisa inteiramente falsa que eu mandei para Lervel, e n\u00e3o foi a \u00faltima.'
      },
      'C': {
        lns: [
          'O epis\u00f3dio de 7 de agosto n\u00e3o consta do relat\u00f3rio remetido a Lervel',
          'naquele m\u00eas nem em nenhum dos meses seguintes.',
          '',
          'Agosto do ano tr\u00eas foi remetido sem agosto dentro.',
          '',
          'A supress\u00e3o \u00e9 de responsabilidade exclusiva do Compilador e n\u00e3o foi',
          'comunicada a nenhuma outra parte.'
        ],
        margem: 'Nota: o Compilador registra a supress\u00e3o aqui porque n\u00e3o a registrou em ' +
                'lugar nenhum \u00e0 \u00e9poca, e um relato que esconde o pr\u00f3prio buraco n\u00e3o serve.',
        mao: 'Eu apaguei um m\u00eas inteiro e continuei assinando os relat\u00f3rios do mesmo jeito.'
      }
    }
  },

  /* --------------------------------------------------------------------
     291 - OUTUBRO DO QUARTO ANO
     Le third_paid (cap. 8). A pagina de Fenn. A ultima do maco, e a
     unica em que a mascara nao volta a subir.
     -------------------------------------------------------------------- */
  {
    num: '291',
    titulo: 'Outubro, ano quatro \u2014 F.',
    flag: 'third_paid',
    vars: {
      'A': {
        lns: [
          'Em 22 de outubro o Compilador adquiriu de F., empregado da casa,',
          'o nome da escriba que ocupou este posto trinta e sete anos antes.',
          '',
          'Pagamento em moeda, sem recibo, quitando d\u00edvida particular de F.',
          'com terceiro da aldeia.',
          '',
          'O Compilador declarou a F. que negaria a fonte caso interrogado.',
          'F. concordou com a condi\u00e7\u00e3o e n\u00e3o pediu garantia.'
        ],
        margem: 'Nota: F. tem um filho de quinze anos e a d\u00edvida era do filho. ' +
                'Isto n\u00e3o altera a natureza da transa\u00e7\u00e3o. Consta porque \u00e9 verdade.',
        mao: 'Ele n\u00e3o pediu garantia nenhuma. Vinte e nove anos nesta casa e ele acreditou em mim ' +
             'porque eu perguntei do jeito certo, e o jeito certo foi ele que me ensinou.'
      },
      'B': {
        lns: [
          'Em 22 de outubro o Compilador adquiriu de F., empregado da casa,',
          'o nome da escriba que ocupou este posto trinta e sete anos antes.',
          '',
          'Pagamento em moeda, sem recibo, quitando d\u00edvida particular de F.',
          '',
          'O nome foi remetido a Lervel como elemento de prova, com identifica\u00e7\u00e3o',
          'da fonte, porque prova sem proveni\u00eancia n\u00e3o \u00e9 aceita em mat\u00e9ria de foro.'
        ],
        margem: 'Nota: identificar a fonte era o \u00fanico modo de a prova valer. ' +
                'F. permanece empregado da casa e a casa l\u00ea tudo o que entra e sai.',
        mao: 'Eu escrevi o nome dele num papel que ia atravessar esta casa, e escolhi ' +
             'isso sabendo, e chamei de decis\u00e3o t\u00e9cnica no caderno da mesma noite.'
      },
      'C': {
        lns: [
          'Em 22 de outubro F., empregado da casa, ofereceu ao Compilador o nome',
          'da escriba que ocupou este posto trinta e sete anos antes.',
          '',
          'O Compilador recusou o nome. Pagou a moeda mesmo assim, quitando',
          'd\u00edvida particular de F., e instruiu que o filho de F. deixasse a',
          'propriedade no mesmo dia.',
          '',
          'O rapaz partiu na carro\u00e7a do sal \u00e0s onze e dez. N\u00e3o houve confirma\u00e7\u00e3o',
          'posterior de chegada.'
        ],
        margem: 'Nota: sem o nome, a antecessora permanece n\u00e3o identificada e o caso ' +
                'permanece sem elemento externo. A recusa foi consciente disso.',
        mao: 'Eu abri m\u00e3o da \u00fanica prova que eu tinha para tirar um rapaz daqui e nunca ' +
             'soube se ele chegou em lugar nenhum.'
      }
    }
  }

  ],

  /* Fecho do documento. Comum as quatro combinacoes. */
  fecho: [
    'Estas quatro entradas foram retiradas do corpo principal porque, lidas em conjunto,',
    'estabelecem terceiro lesado e tornam a mat\u00e9ria acion\u00e1vel fora do foro dom\u00e9stico',
    'da casa.',
    '',
    'Acion\u00e1vel significa busca. Busca significa entrar aqui.',
    '',
    'Quem entrar aqui vai perguntar qual das duas meninas \u00e9, e a casa vai responder,',
    'porque a casa responde a autoridade. E ent\u00e3o o cronograma se antecipa.',
    '',
    'O Compilador optou por um documento que n\u00e3o serve a um documento que serve',
    'contra ela.',
    '',
    '\u2014 A.V.'
  ]

};

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.QUATRO_PAGINAS; }
