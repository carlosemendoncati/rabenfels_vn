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


  /* ------------------------------------------------------------------
     LAUDO DO FINAL ALCANCADO.

     Renderizado no topo do painel das Quatro Paginas, antes do cabecalho
     do documento. E a unica parte da obra que fala do sentimento dela
     com todas as letras - e pode, porque nao e cena: e laudo, e quem le
     ja terminou.

     As palavras mae, filha e amor continuam proibidas, inclusive aqui.
     ------------------------------------------------------------------ */
  finais: {

    archive: {
      titulo: 'O Arquivo',
      o_que: 'Cinco anos inteiros, no ritmo que o m\u00e9todo pedia. Tentou na noite de nove de agosto e chegou at\u00e9 a floresta \u2014 mais longe do que qualquer pessoa chegou em cinco s\u00e9culos.',
      custou: 'Klara parou de andar no meio da trilha e voltou a p\u00e9, e n\u00e3o soube dizer por qu\u00ea. Antoniette foi atr\u00e1s. Ningu\u00e9m na casa soube que as duas tinham sa\u00eddo.',
      ela_sentiu: 'Al\u00edvio, e n\u00e3o \u00e9 engano de leitura. As quatro horas depois da floresta foram as \u00fanicas em cinco anos em que ela n\u00e3o teve de decidir mais nada. O trabalho estava fechado e a parte dela tinha acabado. Ficou no port\u00e3o at\u00e9 o sol subir de todo e n\u00e3o pensou em nada em particular.',
      klara: 'Sobreviveu. Seis anos depois entrou na Academia de Eldoria com a irm\u00e3, mesma turma, levando junto tudo o que Antoniette ensinou \u2014 inclusive o que a fez valer mais.',
      nao_soube: 'Que a menina viveu. E por que ela mesma morreu.'
    },

    distance: {
      titulo: 'O Distanciamento',
      o_que: 'Dist\u00e2ncia profissional do primeiro ao \u00faltimo dia. N\u00e3o prometeu, n\u00e3o se aproximou, n\u00e3o tentou. A mala ficou feita debaixo da cama por onze dias e nunca saiu de l\u00e1.',
      custou: 'Nada, no papel. A miss\u00e3o foi cumprida e a Ordem recebeu exatamente o que pediu. Recolheram-na do campo em setembro, com a correspond\u00eancia particular suspensa por prazo indeterminado.',
      ela_sentiu: 'Nada que ela deixasse subir. \u00c9 o \u00fanico final em que a disciplina n\u00e3o rachou uma vez, e por isso o mais frio de ler. A porta do quarto das g\u00eameas abriu e fechou naquela madrugada, algu\u00e9m parou no alto da escada, e ela ficou onde estava. Ficaram as duas paradas por um tempo que ela n\u00e3o conseguiu medir \u2014 e ela tinha cinco anos de registro e uma mem\u00f3ria treinada para dura\u00e7\u00f5es.',
      klara: 'Sobreviveu do mesmo jeito, e entrou na Academia do mesmo jeito. Atravessou cinco anos sem ningu\u00e9m, e ningu\u00e9m reparou que faltava alguma coisa, porque nunca teve.',
      nao_soube: 'Que a dist\u00e2ncia n\u00e3o a protegeu de nada. A conta era sobre a menina ter escolhido algu\u00e9m, e a menina escolheu assim mesmo.'
    },

    early: {
      titulo: 'Agosto Antecipado',
      o_que: 'Entendeu o cronograma antes da hora e agiu com o que tinha. A casa percebeu o movimento e antecipou o pr\u00f3prio calend\u00e1rio.',
      custou: 'A porta nordeste ficou aberta e o p\u00e1tio, vazio. Ningu\u00e9m gritou. Numa casa daquele tamanho, isso significa que ningu\u00e9m precisou.',
      ela_sentiu: 'Pressa, e depois o que vem quando j\u00e1 n\u00e3o h\u00e1 o que apressar. Escreveu o Arquivo em quatro noites, documentando uma coisa que j\u00e1 tinha acontecido, e a m\u00e3o continuou firme porque a m\u00e3o dela era assim. Escreveu a \u00faltima entrada para uma menina que j\u00e1 n\u00e3o estava naquela casa, e n\u00e3o mudou uma palavra por causa disso.',
      klara: 'Levada em agosto do quinto ano, sem preparo e sem cerim\u00f4nia, com uma cama a menos no quarto desde as duas e dez. A irm\u00e3 continuou dormindo.',
      nao_soube: 'Que a pr\u00f3pria pressa moveu a data. Cinco anos sendo a \u00fanica pessoa em cinco s\u00e9culos capaz de mover uma data, e moveu \u2014 para o lado errado.'
    },

    cover_burned: {
      titulo: 'A Cobertura Queimada',
      o_que: 'Fez tudo o que a Ordem manda: relatou agosto na \u00edntegra, com testemunha direta, e remeteu a Lervel o nome da antecessora com identifica\u00e7\u00e3o da fonte, porque prova sem proveni\u00eancia n\u00e3o vale em mat\u00e9ria de foro.',
      custou: 'A casa l\u00ea tudo o que entra e sai, e sempre leu. N\u00e3o houve acusa\u00e7\u00e3o nem gritaria: houve encerramento de contrato, com dois meses de aviso pagos e uma carta de refer\u00eancia correta.',
      ela_sentiu: 'Vergonha profissional, e \u00e9 o \u00fanico final em que esse \u00e9 o sentimento de cima. N\u00e3o foi descoberta por descuido nem por azar: foi descoberta por compet\u00eancia, por ter feito o procedimento certo dentro de uma casa que ela sabia que lia a correspond\u00eancia. Ficou de p\u00e9 no escuro esperando uma batida que n\u00e3o veio, e o que doeu n\u00e3o foi o medo. Foi saber exatamente qual linha do pr\u00f3prio relat\u00f3rio a entregou.',
      klara: 'Ficou. O Arquivo saiu incompleto e saiu mesmo assim, escrito em nove noites num quarto alugado. Seis anos depois, a Academia.',
      nao_soube: 'Que o nome remetido era de um homem vivo que trabalhava naquela casa, e que ele n\u00e3o pediu garantia nenhuma antes de d\u00e1-lo a ela.'
    }

  },

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
