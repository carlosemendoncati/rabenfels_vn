**ARQUIVO RABENFELS**

*Estudo das Referências — o que aprender de cada livro de `REF/`*

*Revisão 1 — 25/07/2026*

> **Este é o estudo de primeira passada, feito por amostragem.**
> Depois dele o autor pediu leitura integral, um livro por vez. O
> resultado está em `docs/estudo/`, um arquivo por livro, e o
> índice consolidado em **`docs/estudo/00_indice.md`** — comece por lá.
>
> Este documento continua valendo pelo que os outros não repetem: a
> análise de prosa do Kristoff e do Peters, e o desenho de escolha do
> Finley aplicado beat a beat. Onde houver divergência, **prevalece o
> arquivo numerado em `docs/estudo/`**, que foi escrito com o livro
> inteiro à frente.

— ✦ —

# **Como este documento funciona**

Oito livros em `REF/`. Nenhuma lição entra aqui como resumo de livro. Cada
uma entra como **decisão que muda o Arquivo Rabenfels**, com o lugar exato
onde ela se aplica.

A regra que o autor deu: *não é para copiar, é para aprender a criar.* Por
isso não existe nesta pasta nenhuma frase para transplantar. Existe
técnica, e a técnica é aplicada a este projeto e a mais nenhum.

**Honestidade sobre a profundidade da leitura.** São 6.700 páginas somadas.
Li por alvo, não por inteiro:

| Livro | O que li |
|---|---|
| Finley, *Branching Story, Unlocked Dialogue* | sumário completo, cap. 6 (prosa) e cap. 8 (escolha e consequência) na íntegra |
| Frey, *How to Write a Damn Good Mystery* | sumário, os quatro pilares, criação do assassino, endlines, cena |
| MWA, *How to Write a Mystery* | sumário, seções de reviravolta, pistas e red herrings, método de outline |
| Kenworthy, *Writing SF, Fantasy & Horror* | sumário e a seção de horror |
| Murphy, *The Plot Dot* | os oito pontos, leitura quase completa (33 páginas) |
| Cavallaro, *Anime and the Visual Novel* | sumário e prefácio |
| Ellis Peters, *Brother Cadfael* | amostragem de prosa, análise de técnica |
| Kristoff, *Império do Vampiro* | amostragem de prosa em português, análise de técnica |

Ferramenta usada: `python tools/refread.py` — lista, busca e extrai texto
dos PDFs sem renderizar página.

— ✦ —

# **Parte I — Finley: escrever para Visual Novel**

## ***O livro que mais muda este projeto.***

### **1. Superfície x subtexto — o diagnóstico exato do nosso problema**

Finley descreve o que a incomodava ao editar VNs: prosa boa, nunca ótima.
Ela isolou a causa. **Escrita de superfície** tem estas marcas:

- falta descrição
- falta detalhe sensorial
- conta tudo ao leitor
- não convida a imaginação
- é menos envolvente do que poderia ser

E o remédio dela é um só: **detalhe sensorial**, porque detalhe sensorial
carrega subtexto sem precisar enunciá-lo.

O exemplo que ela dá vale transcrever pela precisão:

> *"Os sinos fizeram um som horrível"* diz ao jogador que o som é horrível.
> *"Os sinos estridularam"* faz o som acontecer.

**Onde aplica em Rabenfels:** o projeto já proíbe adjetivo genérico
(regra 5 do estilo). Finley explica *por que* aquilo funciona e dá o passo
seguinte, que a nossa regra não tinha: quando cortar o adjetivo, o que
entra no lugar é **verbo sensorial**, não outro adjetivo melhor.

Auditoria que isto obriga: o Capítulo 1 tem detalhe visual em quase todo
beat e quase nada de som, cheiro, tato ou temperatura. Nidhaus é uma casa
fria, úmida, de pedra, com cozinha acesa às cinco e meia. **Nada disso
chega pelo corpo da Antoniette.** É a correção mais barata e de maior
retorno disponível agora.

### **2. Os cinco sentidos, com exemplos de parte do discurso**

Finley insiste que verbo e advérbio descrevem tanto quanto adjetivo:

| Sentido | Construção dela |
|---|---|
| visão | "esgueirou-se pela porta" |
| tato | "o coração dele apertou como um punho" |
| olfato | "o sal do ar do mar ardeu nas narinas" |
| audição | "trovejou pelo corredor" |
| paladar | "muffin encharcado de óleo de manteiga artificial" |

Nenhuma diz ao leitor como se sentir.

**Aplicação:** Serafina não deve ser descrita como controlada. Ela deve
fazer uma coisa que o corpo da Antoniette registra — e Antoniette é uma
personagem que mede. Temperatura de mão. Tempo de sorriso. Volume de voz
em sala de teto alto.

### **3. Exposição: o risco de abrir com infodump**

Finley reconhece que abrir com exposição é convenção do gênero, e avisa:
passagem narrativa longa no início cansa. As perguntas dela para o autor:
a exposição vai no começo, ou você abre numa cena e recua depois? Dá para
distribuir em pedaços? Alguma parte funciona melhor em diálogo?

**Aplicação — e é um elogio ao que já existe:** o Prólogo resolve isso
bem. A exposição chega em cartões do Arquivo, alternada com reação de
Matheo, nunca em bloco. Manter o padrão nos capítulos futuros.

### **4. Escolhas a evitar — quatro tipos**

Finley nomeia os quatro defeitos de design de escolha:

1. **Escolha sem sentido.** O mundo não responde. O jogador se pergunta
   por que escolheu.
2. **Escolha desinformada.** O jogador não faz ideia do que cada opção
   provoca. Alguma surpresa é boa; **cegueira total, não.** Ele precisa
   conseguir prever a consequência *imediata*.
3. **Opção única.** A escolha é um botão de "continuar" fantasiado.
4. **Escolhas sinônimas.** Duas opções que dizem a mesma coisa com
   palavras diferentes.

E o pior de todos, que ela ilustra com o elevador quebrado: **a escolha
ilusória**, em que todas as opções voltam para o mesmo lugar. *"Isso irrita
o jogador, que vai pensar: então por que isso é uma escolha?"*

**Auditoria do Capítulo 1.** A escolha `cap1_aldric` passa: as três
respostas produzem um Aldric diferente e informação diferente. A
`cap1_relatorio` passa e é modelo, porque a opção C grava `archive_seed` e
o Capítulo 2 lê a flag onze cenas depois.

**Risco real que isto expõe:** o projeto tem três Bad Ends definidos no
papel e nenhum implementado. Se as escolhas somam rota e a rota não
desemboca em nada, elas se tornam **escolhas sem sentido no sentido
técnico de Finley** — o mundo não responde. Isso reforça a decisão
pendente nº 9 da bíblia: o sistema de finais precisa existir.

### **5. Escolhas fortes — cinco tipos**

1. **Difíceis.** O jogador agoniza. Sabe que qualquer opção traz problema.
2. **De consequência longa.** Efeito imediato *mais* efeito que só aparece
   muito depois. Ela é explícita: sabendo que existe consequência longa, o
   jogador passa a pesar cada opção.
3. **Sem julgamento.** Nada de opção "certa" e "errada", nada de o autor
   punir quem escolheu diferente. Consequência negativa pode existir;
   punição, não.
4. **Que revelam faceta do protagonista.** Uma opção sarcástica, outra
   condescendente — as duas cabem na mesma pessoa.
5. **Destraváveis.** Dependem de variável ou de escolha anterior.

**Aplicação direta:** o tipo 4 é o que falta em Rabenfels. Antoniette não
é doce, e o jogador nunca teve a chance de escolher **o grau de frieza
dela**. Uma escolha que ofereça "responder com precisão" contra "responder
com corte" daria ao jogador o papel de calibrar a protagonista sem mudar
uma vírgula do enredo. É de graça, e é exatamente o que o autor pediu ao
dizer que Klara termina sarcástica por herança da Antoniette.

### **6. Consequência: a etimologia que organiza tudo**

Finley abre a palavra: *con* (junto) + *sequi* (seguir). "Aquilo que segue
de qualquer ato ou curso." Consequência é neutra, não é castigo.

E dá o alerta que mais interessa a nós: **quando não há efeito imediato, o
jogador conclui que a escolha não valeu nada.** Consequência longa é ótima,
desde que exista também uma curta.

**Auditoria:** as três opções de `cap1_relatorio` têm consequência
imediata (o bloco `then`) e uma longa (`archive_seed` no Cap. 2). Correto
pelo livro. A `cap1_aldric` tem a imediata e **nenhuma longa**. Precisa
ganhar uma: `aldric_pressed` deveria mudar alguma coisa no Capítulo 2 ou 5.
Hoje a flag é gravada e nunca lida.

### **7. Como o jogador experimenta a consequência**

Quatro formas, segundo ela: sinal físico no mundo; um NPC comenta
diretamente; o jogador **ouve** outros comentando; o jogador encontra
vestígio em outro lugar — registro, log, diário.

**A quarta é a nossa.** Uma VN cujo objeto central é um arquivo tem o
melhor veículo possível de consequência: *o próprio caderno operacional
muda de conteúdo conforme o que o jogador escolheu registrar.* Isso já
acontece no cartão `sem_identificacao`. Deve virar sistema.

— ✦ —

# **Parte II — Frey: o motor de investigação**

## ***Antoniette é uma detetive. O livro trata disso com rigor.***

### **8. Os quatro pilares**

Frey: ao plotar, mantenha quatro coisas na cabeça — **mistério, suspense,
conflito e surpresa.**

E a definição de mistério dele é a mais útil:

> Um homem assassinado num bar, diante de testemunhas, é um assassinato
> sem mistério. Mistério é evento inexplicado. E num bom mistério deve
> haver **mais mistério do que apenas quem fez**. Por que foi feito
> daquele jeito estranho?

**Aplicação:** Rabenfels tem a estrutura invertida — o jogador sabe o
"quem" e o "o quê" desde o Prólogo. O que sobra, e que Frey autoriza a
tratar como o mistério verdadeiro, é o **por que deste jeito**. Por que um
casulo? Por que gêmeas? Por que agosto? Por que a família apaga os
próprios livros de conta?

Isso reposiciona os capítulos de investigação. Antoniette não procura
culpado. Procura **método**. É uma pergunta mais rica e sustenta onze
capítulos sem cansar.

### **9. Endlines — a lição mais transferível de todas para uma VN**

Frey dedica seção inteira à última linha de cena. Duas espécies:

- **Endline-ponte:** levanta uma pergunta de enredo que puxa a cena
  seguinte.
- **Endline de soco:** não levanta pergunta, encerra com afirmação
  dramática forte.

O exemplo negativo dele é um detetive que revisa as notas, não acha nada e
decide ir dormir. *"Vai para o plano. Nenhuma pergunta de história nasce
dali."*

**Por que isto importa mais em VN do que em romance:** numa VN, **todo
beat termina numa caixa de texto que o jogador precisa decidir avançar.**
Cada beat é uma micro-cena com micro-endline. Frey escreveu sobre cena e
nos deu, sem saber, a regra da caixa de diálogo.

**Auditoria concreta.** Os fins de cena do Capítulo 1 reescrito:

| Cena | Última linha | Espécie |
|---|---|---|
| C1 estrada | "Sem valor operacional. Anotado mesmo assim." | soco |
| C2 portão | "Ele acabou de responder uma pergunta que eu não fiz." | ponte |
| C3 salão | "Ausência sem explicação também é informação." | ponte |
| C4 quarto | "Apagou a vela. No pátio, a corrente continuou parada." | soco |
| C5 biblioteca | "Continuava sendo a mais provável." | ponte |
| C6 retratos | "Antoniette seguiu pelo corredor sem escrever nada." | soco |
| C7 corredor | "Anotar ali seria barulho." | soco |
| C9 meia-noite | "a luz ficou acesa mais uma hora." | soco |

Cinco socos contra três pontes. Frey diria que está pesado demais para um
lado: soco atrás de soco vira maneirismo e o capítulo perde tração para
frente. **A correção é converter C6 e C7 em ponte.**

### **10. Pistas e red herrings**

Frey: anote as pistas quando ocorrerem, porque *"são diabinhos maliciosos
que se escondem de você"*. E defende o red herring com força: seguir uma
pista falsa pode prender tanto quanto seguir uma verdadeira, e há prazer
em descobrir no fim que o único resultado foi riscar suspeitos da lista.

**Aplicação:** Rabenfels não tem nenhum red herring. Todas as pistas
apontam na direção certa, o que torna a investigação uma esteira. Um
candidato natural: **o quarto que Serafina escolheu.** Antoniette conclui
que é vigilância. Poderia ser cortesia genuína — e Serafina ser perigosa
por outro motivo inteiramente. Deixar isso ambíguo por seis capítulos é
red herring honesto, porque a evidência é real e a leitura é que está
errada.

### **11. O assassino como personagem de "curva sino"**

Frey testa o vilão com seis perguntas: é movido a agir? é redondo? é
esperto e cheio de recursos? é ferido? age por medo? a maldade dele está
escondida?

**Aplicação — Aldric passa em cinco e falha numa.** Ele é movido, redondo,
esperto, age por medo (perder o que tem) e esconde bem. **Não é ferido.**
A bíblia revisada dá a ele uma conta feita uma vez e nunca refeita; falta
a ferida que produziu aquela conta. Fica como pergunta aberta ao autor.

— ✦ —

# **Parte III — MWA: reviravolta e método**

### **12. A reviravolta precisa ser merecida**

O manual da Mystery Writers of America: você pode reter informação,
enganar com informação ambígua ou falsa, usar narrador não confiável,
criar desvio de atenção. *"Faça o leitor achar que a explosão no alto da
montanha é o importante. Faça-o desviar o olhar do que ferve no porto."*

Mas: **por mais que a reviravolta seja bem plantada, ela precisa ser
merecida, ou o leitor se sente enganado.**

**Aplicação direta e delicada:** Khar'Vel ser o nome que Antoniette
inventou é exatamente uma reviravolta de narrador não confiável. Pelo
critério da MWA, ela **só é merecida se o jogador puder, relendo, ver o
plantio.** Hoje o Prólogo não planta nada.

O plantio mínimo, sem entregar o jogo: no cartão que fala da palavra, o
Arquivo diz que ela é intraduzível e que ninguém sabe o que significa. Se
o texto disser em algum ponto que a palavra **não aparece atribuída à
entidade em fonte nenhuma** — só no mesmo maço de papéis —, o leitor
atento tem tudo. E não percebe.

### **13. Escrever o último capítulo antes do meio**

Rae Franklin James, no manual: ela faz outline até o meio, depois **escreve
o último capítulo**, e só então volta ao começo. Sabendo quem fez, por que
e como, ela sabe quais pistas e quais red herrings plantar. *"Nunca tenho
bloqueio criativo."*

**Recomendação forte para este projeto, e é a resposta técnica ao bloqueio
que o autor relatou:** escrever agora o Epílogo — Matheo diante do cadastro
das duas na Academia. São duas páginas. Depois disso, cada capítulo do meio
passa a ter destino conhecido, e o que plantar em cada um deixa de ser
adivinhação.

— ✦ —

# **Parte IV — Kenworthy: a mecânica do horror**

### **14. Horror é o que está debaixo da pele, não em cima**

> *"O jeito fácil é rasgar a pele e soltar um jorro de sangue. Isso é raso
> e breve. O melhor caminho é chegar debaixo da superfície de uma
> personalidade."*

E: **horror funciona melhor quando é contido. Sugerir vence ser direto.**

O exemplo dele resolve uma dúvida prática:

> Se alguma coisa está mordendo seu pescoço, o que assusta mais — o
> sangue, que você não consegue ver, ou a dor aguda e a respiração úmida
> perto do seu rosto?

**Aplicação:** confirma o que o projeto já pratica ("horror por
acumulação, nunca por afirmação") e acrescenta a mecânica. O que assusta é
**o que o corpo da personagem sente enquanto a mente ainda não concluiu.**

Nidhaus tem uma cena inteira esperando por isso: os procedimentos em
Klara, no Capítulo 5. Kenworthy diz para não mostrar o sangue. Mostrar o
que Klara ouve, o cheiro da sala, a temperatura do metal. E a menina
mantendo compostura, que o documento mestre já define como escolha dela.

### **15. Horror é a ficção da honestidade total**

Kenworthy: horror mostra nossa mortalidade e nossa falta de controle,
obriga a admitir fraqueza e emoções secretas.

**Aplicação:** é a definição do arco de Matheo. E é o critério para o
último beat do Epílogo — ele levanta, e o jogo corta antes de sabermos o
que ele faz. Falta de controle, admitida sem enunciado.

— ✦ —

# **Parte V — Murphy: estrutura de cena**

### **16. Toda cena termina em virada, revelação ou mudança**

Murphy, sobre por que ele escreve duas cenas por capítulo:

> Cada cena vai terminar na virada, na revelação ou na mudança, porque os
> mini-cliffhangers — "loops abertos" — mantêm o leitor virando a página.

Bate exatamente com os endlines de Frey, por outro caminho. Duas fontes
independentes chegando à mesma regra é forte o bastante para virar regra
do projeto.

### **17. O lampejo de cor**

A técnica mais concreta do livro. Ao planejar uma cena, imagine-a como
fotografia: onde cada um está, como é o fundo — e **onde está o lampejo de
cor**. Um detalhe descrito com precisão, que ancora a cena na memória.

**Aplicação, e Rabenfels usa isto sem ter nome para a técnica:** o cano da
fonte virado para baixo. A moldura vazia que alguém limpa. A corrente sem
cadeado. O curativo no braço esquerdo. **Todo lampejo de cor deste projeto
é uma coisa errada.** Vale transformar em regra explícita: cada cena tem um
objeto, o objeto está errado, e ninguém aponta.

### **18. Não abrir com flashback**

Murphy desaconselha abrir com flashback, sonho ou história de fundo que
recua anos e depois salta.

**Vale registrar a exceção, porque Rabenfels faz exatamente isso.** Ele
mesmo abre a porta: aceita o prefácio quando é preciso mostrar que os
riscos são altos, para o leitor aguentar os capítulos lentos do começo. O
Prólogo de Rabenfels é esse caso — ele existe para que o Capítulo 1, que é
um dia comum de chegada, seja lido com pavor.

— ✦ —

# **Parte VI — Kristoff: a moldura, em português**

## ***O achado mais importante da pasta REF.***

### **19. Império do Vampiro tem a mesma moldura que Arquivo Rabenfels**

Gabriel de León, o último Santo de Prata, conta a própria história a
**Jean-François, um vampiro historiador que a registra**. O leitor recebe
a vida de Gabriel filtrada por um interrogador com agenda própria.

É a nossa estrutura: **a vida de Antoniette chega ao jogador filtrada pelo
Arquivo, lido por Matheo.**

**O que Kristoff faz com isso e nós ainda não fazemos:** o ouvinte
**interrompe**. Jean-François pergunta, provoca, pede para ver, muda de
assunto, elogia. A moldura não é abertura e fecho — ela **atravessa o
livro inteiro** e a tensão entre quem conta e quem registra é metade do
prazer.

Em Rabenfels, Matheo aparece no Prólogo, some por onze capítulos e volta
no Epílogo. **Kristoff mostra o que estamos deixando na mesa.**

Uma possibilidade que registro sem recomendar ainda, porque muda a
arquitetura: notas de rodapé do Compilador aparecendo *durante* os
capítulos, comentando o que o jogador acabou de viver. A voz que o Prólogo
apresenta na página cento e quarenta e um, reaparecendo. Antoniette
comentando Antoniette.

### **20. Dois registros de língua na mesma página**

Kristoff separa violentamente:

- **Narração descritiva** — longa, catalogadora, quase litúrgica. O
  parágrafo das tatuagens lista anjo por anjo, nome por nome.
- **Fala de Gabriel** — curta, suja, profana. *"Ele me contou um quinto de
  três oitavos de porra nenhuma."*

O contraste é a voz do livro.

**Aplicação, com cuidado.** Rabenfels tem registro único: notarial em tudo.
Isso é identidade e não se troca. Mas o princípio serve para as **crianças**.
Klara e Liara não devem falar em registro notarial. Liara fala errado,
repete, se empolga. Klara fala curto porque fala pouco. No Capítulo 1
reescrito isso já acontece — e Kristoff confirma que a distância entre os
registros pode ser maior do que o medo costuma permitir.

### **21. O catálogo como técnica de horror**

O parágrafo das tatuagens funciona por acumulação de item específico. Nada
é dito sobre o que significam. O leitor monta.

**Aplicação:** é o que o cartão do Arquivo já faz, e é o que a galeria de
retratos faz. Nove gerações, duas filhas, uma meio passo atrás. Vale
reconhecer a técnica pelo nome para poder usá-la de propósito no
Capítulo 5, com os instrumentos da câmara.

— ✦ —

# **Parte VII — Ellis Peters: a comunidade fechada**

### **22. Cadfael investiga pela rede social, não pela evidência física**

A prosa de Peters é longa, ramificada, cheia de subordinadas — o oposto
da nossa. Não há nada a copiar na frase.

**O que há a aprender é a mecânica social.** Numa comunidade fechada,
Cadfael resolve porque sabe quem deve favor a quem, quem tem medo de quem,
e por onde a informação corre. A passagem que expõe o método:

> "Falarei uma palavra no ouvido de Peredur, Peredur falará no ouvido do
> intendente, o intendente falará no ouvido de Owain Gwynedd — deixemos o
> padre Huw de fora, não há por que pesar a consciência dele."

Ele mapeia a cadeia de sussurro antes de agir.

**Aplicação, e é uma lacuna real:** Velha Nidhaus tem Fenn, Dara e Ren, e
os três existem como fontes de informação isoladas. **Não existe cadeia
entre eles.** Quem fala com quem? Dara tem dezenove anos de casa e sabe
mais do que diz; Fenn responde pela casa; Ren tem cinco semanas e nenhuma
raiz. Peters diria que a informação corre de Ren para Dara e morre ali, e
que Fenn é quem decide o que sobe para a família.

Desenhar essa cadeia dá a Antoniette alguma coisa para **fazer** nos
capítulos de investigação, em vez de só observar.

### **23. O detetive que aceita o custo moral**

Cadfael mente, esconde corpo, joga uma adaga no fundo do açude, e comenta:
*"Sou um grande pecador, mas não sinto peso. Será que o fim justifica os
meios?"* — e não responde.

**Aplicação:** é o eixo Perda. Toda vez que Antoniette decide não fazer
alguma coisa, o custo é registrado e não é julgado. Peters mostra que o
leitor aguenta um detetive que faz escolha suja, desde que a escolha seja
**consciente e enunciada uma vez, sem autoflagelo.**

— ✦ —

# **Parte VIII — O que muda no projeto**

Resumo executivo. Cada item tem origem rastreável.

### **Aplicar agora**

1. **Auditoria sensorial do Capítulo 1.** Som, cheiro, tato e temperatura
   estão quase ausentes. *(Finley, cap. 6.)*
2. **Converter dois fins de cena de soco para ponte** — C6 retratos e C7
   corredor. Cinco socos contra três pontes desequilibra. *(Frey.)*
3. **`aldric_pressed` precisa ser lida em algum capítulo.** Hoje é gravada
   e ignorada, o que a torna consequência sem efeito. *(Finley, cap. 8.)*
4. **Plantar a pista de Khar'Vel no Prólogo** — uma linha dizendo que a
   palavra não aparece atribuída à entidade em fonte nenhuma. Sem isso, a
   reviravolta não é merecida. *(MWA.)*

### **Aplicar no próximo capítulo escrito**

5. **Escrever o Epílogo antes do meio da obra.** É a resposta técnica ao
   bloqueio criativo. *(MWA, método de Rae Franklin James.)*
6. **Uma escolha que calibre a frieza da Antoniette**, sem mexer no
   enredo. *(Finley, escolhas que revelam faceta.)*
7. **Um red herring honesto** — o quarto escolhido por Serafina. *(Frey.)*
8. **Desenhar a cadeia de sussurro** entre Fenn, Dara e Ren. *(Peters.)*
9. **Um lampejo de cor por cena, e ele é sempre a coisa errada.** Virar
   regra escrita. *(Murphy.)*

### **Decisões de arquitetura, pendentes do autor**

10. **O sistema de finais precisa existir**, ou as rotas viram escolha sem
    sentido no sentido técnico. *(Finley.)*
11. **A moldura pode atravessar a obra** — notas do Compilador durante os
    capítulos, como Jean-François interrompe Gabriel. Muda a arquitetura;
    não recomendo sem sua decisão. *(Kristoff.)*
12. **Aldric precisa de ferida.** Passa em cinco dos seis testes de Frey e
    falha nesse. *(Frey.)*

— ✦ —

*Fim do Estudo das Referências — revisão 1.*
