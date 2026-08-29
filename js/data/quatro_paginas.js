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

   Em Esperanca e Perda, o ultimo capitulo mostra ela arrancando as
   quatro, contando para baixo, e guardando dentro do livro-caixa.

   Em Resposta, as quatro permanecem no corpo do Livro-Razao. Em
   Cobertura, o Arquivo termina na pagina 241 e elas nunca chegam a ser
   compiladas. O extra precisa dizer qual destes tres objetos o jogador
   esta lendo; nao pode fingir que todas as rotas produziram o mesmo.

   O Epilogo cobra "sem terceiro lesado" nas quatro leituras. O motivo
   muda: paginas retiradas, nomes suprimidos ou trabalho interrompido.

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

    arquivo: {
      titulo: 'O Arquivo',
      o_que: 'Cinco anos inteiros, no ritmo que o método pedia. Tentou na noite de nove de agosto e chegou até a floresta — mais longe do que qualquer pessoa chegou em cinco séculos.',
      custou: 'Klara parou no meio da trilha e voltou a pé, e não soube dizer por quê. Antoniette foi atrás. Ninguém na casa soube que as duas tinham saído.',
      ela_sentiu: 'Alívio, e não é engano de leitura. As quatro horas depois da floresta foram as únicas em cinco anos em que ela não teve de decidir mais nada. O trabalho estava fechado e a parte dela tinha acabado. Ficou no portão até o sol subir de todo e não pensou em nada em particular.',
      klara: 'Sobreviveu. Seis anos depois entrou na Academia de Eldoria com a irmã, mesma turma, levando junto tudo o que Antoniette ensinou — inclusive o que a fez valer mais.',
      nao_soube: 'Que a menina viveu. E por que ela mesma morreu.'
    },

    registro: {
      titulo: 'O Livro-Razão',
      o_que: 'Entendeu o cronograma inteiro e não desceu nenhuma noite. Pôs a mão na maçaneta às onze e vinte e cinco, ouviu a guarda trocar, e voltou para a escrivaninha.',
      custou: 'Nada que apareça em coluna, e é isso que a leitura é. A porta da biblioteca ficou fechada a noite inteira e ninguém veio bater nela.',
      ela_sentiu: 'Satisfação com a margem. A duração estimada da entrada 214 errou por nove minutos, contra vinte e seis da entrada 160, e ela registrou a melhora. É o sentimento de cima e é sincero, e é por isso que esta é a leitura mais difícil de ler duas vezes.',
      klara: 'Sobreviveu. Em nenhuma das duzentas e catorze entradas aparece a palavra Klara, e Carmine precisou corrigir a idade da menina no caderno de quem passou cinco anos ao lado dela.',
      nao_soube: 'Que o documento serviria. O tribunal julgou improcedente por ausência de terceiro lesado, a Ordem arquivou o material como exemplar, e a apostila de formação de escribas leva o nome dela no índice, entre duas circulares.'
    },

    divida: {
      titulo: 'A Dívida',
      o_que: 'Cinco anos economizando o que dava para economizar. Tentou na noite de nove de agosto e chegou a onze minutos da ponte.',
      custou: 'A porta da copa estava trancada porque três moedas pedidas em maio pareceram caras, e a avaliação estava correta: três moedas é caro por uma tranca. A volta pelo pátio custou onze minutos. O cocheiro tinha esperado dez.',
      ela_sentiu: 'A conta. Ela armou os três valores em coluna antes do amanhecer, com data ao lado de cada um, somou de trás para frente para conferir, e escreveu a única linha do documento inteiro em que ela julga alguma coisa.',
      klara: 'Parou onze minutos antes da ponte e não soube dizer por quê. Voltou a pé, devolveu a mala e pediu desculpa. Sobreviveu, e seis anos depois entrou na Academia com a irmã.',
      nao_soube: 'Que os onze minutos não eram o motivo. Carmine disse isso na biblioteca, em voz alta, e a frase foi para a margem com um ponto de interrogação. A conta continua fechando na página duzentos e oitenta e sete, e continua errada.'
    },

    cover_burned: {
      titulo: 'A Cobertura Queimada',
      o_que: 'Fez tudo o que a Ordem manda: relatou agosto na íntegra, com testemunha direta, e remeteu a Lervel o nome da antecessora com identificação da fonte, porque prova sem procedência não vale em matéria de foro.',
      custou: 'A casa lê tudo o que entra e sai, e sempre leu. Serafina encerrou o contrato com os dois meses de aviso pagos. Carmine esperou entre Antoniette e a porta do pátio e a matou antes da carruagem.',
      ela_sentiu: 'Vergonha profissional, e é o único final em que esse é o sentimento de cima. Não foi descoberta por descuido nem por azar: foi descoberta por competência. Levou quarenta minutos procurando a linha que a entregou, achou, e a linha estava correta.',
      klara: 'Ficou. O Arquivo saiu incompleto no nonagésimo terceiro dia. Antoniette não saiu da casa.',
      nao_soube: 'Que o caderno cairia aberto na página duzentos e quarenta e um. Que chegaria a Matheo depois dela.'
    }

  },

  /* Esperanca e Perda: as folhas foram retiradas. */
  cabecalho: [
    'Retiradas do corpo do Arquivo em 10 de agosto, entre as três e trinta e as quatro e dez.',
    'Repostas no livro-caixa da casa, no lugar das quatro folhas em branco do fim.',
    'Numeração original mantida.'
  ],

  /* Resposta: o Livro-Razao chega inteiro a Lervel. */
  cabecalho_registro: [
    'Páginas 288 a 291 do Arquivo entregue em Lervel em dezembro do ano cinco.',
    'Nenhuma folha retirada. Numeração original fechada em 291.',
    'Transcrição do exemplar de consulta do arquivo central.'
  ],

  /* Cobertura: o trabalho para na pagina 241. */
  cabecalho_cobertura: [
    'Reconstrução das entradas previstas para as páginas 288 a 291.',
    'O Arquivo remetido a Lervel termina na página 241.',
    'Estas quatro entradas nunca chegaram ao corpo principal.'
  ],

  /* A Vigilia nao tem corpo de Arquivo de onde retirar: o documento
     nunca foi montado. O que ela arranca e caderno de trabalho, e as
     quatro folhas sao justamente as quatro coisas que nunca passaram
     por correspondencia - e portanto as quatro que a reconstrucao da
     Ordem nao teria como conter. */
  cabecalho_vigil: [
    'Retiradas do caderno de trabalho em 10 de agosto, entre as quatro e vinte e as quatro e cinquenta.',
    'Repostas no livro-caixa da casa, no lugar das quatro folhas em branco do fim.',
    'Nenhuma das quatro chegou a passar por correspondência.'
  ],

  paginas: [

  /* --------------------------------------------------------------------
     288 - OUTUBRO DO PRIMEIRO ANO
     Le hid_from_order (cap. 4).
     -------------------------------------------------------------------- */
  {
    num: '288',
    titulo: 'Outubro, ano um — o pátio',
    flag: 'hid_from_order',
    vars: {
      'true': {
        lns: [
          'Em 19 de outubro o Compilador presenciou, da porta nordeste, procedimento',
          'que a casa denomina treinamento. Duração aproximada de quarenta minutos.',
          'Três adultos presentes além dos guardiões. Uma criança.',
          '',
          'O relatório remetido a Lervel no fecho daquele mês registrou inventário',
          'de volumes e estado de encadernação. Não registrou o pátio.',
          '',
          'A omissão foi deliberada e é de responsabilidade exclusiva do Compilador.'
        ],
        margem: 'Nota: a decisão foi tomada para preservar a cobertura por mais um ciclo. ' +
                'A cobertura durou quatro anos depois disso, o que confirma o cálculo e ' +
                'não confirma mais nada.',
        mao: 'Ninguém em Lervel soube de outubro porque eu decidi que não soubessem.'
      },
      'false': {
        lns: [
          'Em 19 de outubro o Compilador presenciou, da porta nordeste, procedimento',
          'que a casa denomina treinamento. O relatório do mês foi remetido íntegro,',
          'com termo, calendário e descrição do que foi ouvido através da porta.',
          '',
          'Lervel acusou recebimento em nove dias. A resposta instruía o Compilador',
          'a manter a posição e continuar observando.',
          '',
          'A instrução foi cumprida por quatro anos.'
        ],
        margem: 'Nota: o procedimento correto foi executado na primeira oportunidade e ' +
                'produziu a instrução de não fazer nada. Isto também é um dado.',
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
    titulo: 'Fevereiro, ano dois — a ala norte',
    flag: 'told_klara',
    vars: {
      'A': {
        lns: [
          'O Compilador desceu à câmara em 11 de fevereiro e permaneceu quatro minutos.',
          'A ausência no andar de cima foi coberta por um menor de nove anos, que',
          'declarou aos adultos da casa uma localização falsa do Compilador.',
          '',
          'O menor não foi instruído a fazer isso e agiu por conta própria.',
          '',
          'O assunto não foi retomado com o menor em nenhum momento posterior.'
        ],
        margem: 'Nota: não retomar foi avaliado como a opção de menor exposição para ' +
                'as duas partes.',
        mao: 'Ela esperou quatro anos que eu tocasse no assunto e eu deixei fechar sozinho.'
      },
      'B': {
        lns: [
          'O Compilador desceu à câmara em 11 de fevereiro e permaneceu quatro minutos.',
          'A ausência no andar de cima foi coberta por um menor de nove anos, que',
          'declarou aos adultos da casa uma localização falsa do Compilador.',
          '',
          'Questionado depois pelo próprio menor, o Compilador forneceu versão',
          'incompleta dos fatos, calibrada para reduzir o que o menor teria de',
          'sustentar caso fosse interrogado pela casa.'
        ],
        margem: 'Nota: a versão fornecida era falsa em dois pontos e verificável em ' +
                'nenhum. O menor aceitou sem contestar, o que indica que percebeu.',
        mao: 'Menti para ela achando que estava carregando o peso, e ela deixou eu achar.'
      },
      'C': {
        lns: [
          'O Compilador desceu à câmara em 11 de fevereiro e permaneceu quatro minutos.',
          'A ausência no andar de cima foi coberta por um menor de nove anos, que',
          'declarou aos adultos da casa uma localização falsa do Compilador.',
          '',
          'O Compilador confirmou os fatos ao menor e solicitou que a conduta',
          'não se repetisse. A solicitação foi recebida sem resposta verbal.',
          '',
          'A conduta não se repetiu. A frequência dos encontros aumentou.'
        ],
        margem: 'Nota: pedir que não se repetisse foi entendido pelo menor como reconhecimento ' +
                'de vínculo. Não era a intenção declarada.',
        mao: 'Eu pedi para ela não fazer de novo e ela ouviu outra coisa, e a outra coisa era verdade.'
      }
    }
  },

  /* --------------------------------------------------------------------
     290 - AGOSTO DO TERCEIRO ANO
     Le lied_to_order (cap. 7).
     -------------------------------------------------------------------- */
  {
    num: '290',
    titulo: 'Agosto, ano três — o relatório',
    flag: 'lied_to_order',
    vars: {
      'A': {
        lns: [
          'O episódio de 7 de agosto foi relatado a Lervel na íntegra, com hora,',
          'local, testemunhas e descrição do que o Compilador viu aflorar no pátio.',
          '',
          'A resposta chegou em nove semanas e instruía a manter a observação.',
          '',
          'A partir desta data o Compilador passou a considerar que a Ordem',
          'recebeu informação suficiente para agir e optou por não agir.'
        ],
        margem: 'Nota: a hipótese de incompetência foi descartada. Lervel é competente. ' +
                'Resta a hipótese que o Compilador não está em posição de investigar.',
        mao: 'Eu contei tudo e eles arquivaram, e eu continuei mandando relatório por dois anos.'
      },
      'B': {
        lns: [
          'O episódio de 7 de agosto foi relatado a Lervel como ocorrência de',
          'natureza indeterminada, sem testemunha direta.',
          '',
          'Havia testemunha direta. Era o Compilador.',
          '',
          'Lervel pediu detalhamento em quinze dias. O detalhamento remetido',
          'manteve a caracterização original.'
        ],
        margem: 'Nota: a caracterização foi escolhida para evitar remoção do Compilador do ' +
                'posto antes da conclusão do trabalho. O trabalho não foi concluído.',
        mao: 'Foi a primeira coisa inteiramente falsa que eu mandei para Lervel, e não foi a última.'
      },
      'C': {
        lns: [
          'O episódio de 7 de agosto não consta do relatório remetido a Lervel',
          'naquele mês nem em nenhum dos meses seguintes.',
          '',
          'Agosto do ano três foi remetido sem agosto dentro.',
          '',
          'A supressão é de responsabilidade exclusiva do Compilador e não foi',
          'comunicada a nenhuma outra parte.'
        ],
        margem: 'Nota: o Compilador registra a supressão aqui porque não a registrou em ' +
                'lugar nenhum à época, e um relato que esconde o próprio buraco não serve.',
        mao: 'Eu apaguei um mês inteiro e continuei assinando os relatórios do mesmo jeito.'
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
    titulo: 'Outubro, ano quatro — F.',
    flag: 'third_paid',
    vars: {
      'A': {
        lns: [
          'Em 22 de outubro o Compilador adquiriu de F., empregado da casa,',
          'o nome da escriba que ocupou este posto trinta e sete anos antes.',
          '',
          'Pagamento em moeda, sem recibo, quitando dívida particular de F.',
          'com terceiro da aldeia.',
          '',
          'O Compilador declarou a F. que negaria a fonte caso interrogado.',
          'F. concordou com a condição e não pediu garantia.'
        ],
        margem: 'Nota: F. tem um filho de dezessete anos e a dívida era do filho. ' +
                'Isto não altera a natureza da transação. Consta porque é verdade.',
        mao: 'Ele não pediu garantia nenhuma. Vinte e nove anos nesta casa e ele acreditou em mim ' +
             'porque eu perguntei do jeito certo, e o jeito certo foi ele que me ensinou.'
      },
      'B': {
        lns: [
          'Em 22 de outubro o Compilador adquiriu de F., empregado da casa,',
          'o nome da escriba que ocupou este posto trinta e sete anos antes.',
          '',
          'Pagamento em moeda, sem recibo, quitando dívida particular de F.',
          '',
          'O nome foi remetido a Lervel como elemento de prova, com identificação',
          'da fonte, porque prova sem proveniência não é aceita em matéria de foro.'
        ],
        margem: 'Nota: identificar a fonte era o único modo de a prova valer. ' +
                'F. permanece empregado da casa e a casa lê tudo o que entra e sai.',
        mao: 'Eu escrevi o nome dele num papel que ia atravessar esta casa, e escolhi ' +
             'isso sabendo, e chamei de decisão técnica no caderno da mesma noite.'
      },
      'C': {
        lns: [
          'Em 22 de outubro F., empregado da casa, ofereceu ao Compilador o nome',
          'da escriba que ocupou este posto trinta e sete anos antes.',
          '',
          'O Compilador recusou o nome. Pagou a moeda mesmo assim, quitando',
          'dívida particular de F., e instruiu que o filho de F. deixasse a',
          'propriedade no mesmo dia.',
          '',
          'O rapaz partiu na carroça do sal às onze e dez. Não houve confirmação',
          'posterior de chegada.'
        ],
        margem: 'Nota: sem o nome, a antecessora permanece não identificada e o caso ' +
                'permanece sem elemento externo. A recusa foi consciente disso.',
        mao: 'Eu abri mão da única prova que eu tinha para tirar um rapaz daqui e nunca ' +
             'soube se ele chegou em lugar nenhum.'
      }
    }
  }

  ],

  /* Esperanca e Perda: fecho escrito antes de esconder as folhas. */
  fecho: [
    'Estas quatro entradas foram retiradas do corpo principal porque, lidas em conjunto,',
    'estabelecem terceiro lesado e tornam a matéria acionável fora do foro doméstico',
    'da casa.',
    '',
    'Acionável significa busca. Busca significa entrar aqui.',
    '',
    'Quem entrar aqui vai perguntar qual das duas meninas é, e a casa vai responder,',
    'porque a casa responde a autoridade. E então o cronograma se antecipa.',
    '',
    'O Compilador optou por um documento que não serve a um documento que serve',
    'contra ela.',
    '',
    '— A.V.'
  ],

  /* Resposta: o texto inteiro chega ao tribunal, mas nao leva nomes. */
  fecho_registro: [
    'Estas quatro entradas permaneceram no corpo principal.',
    'Registram data, ato e terceiro. Os terceiros aparecem como sujeito, fonte',
    'ou função. Nenhuma identificação nominal foi mantida onde não era',
    'necessária à conferência técnica.',
    '',
    'O documento está completo.',
    '',
    '— A.V.'
  ],

  /* Cobertura: nao houve pagina final nem decisao de retirar. */
  fecho_cobertura: [
    'O contrato foi encerrado antes da compilação destas entradas.',
    'Não houve retirada. Não houve fecho.',
    '',
    'A numeração entregue termina em 241.'
  ]

};

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.QUATRO_PAGINAS; }
