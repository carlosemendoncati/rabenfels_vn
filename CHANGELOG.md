# Changelog

## 0.11.1 — "A Conta" vira página

O extra pós-jogo era um painel modal de 940px com moldura ornamentada por
fora e rolagem por dentro. Com o mapa da árvore — 640 por 2.700 unidades —
ele passou a rolar de lado dentro de um quadro que já rolava para baixo
dentro de outro. Em telefone o gesto ia para o container errado.

Agora é uma tela irmã do menu principal: trilho de seções à esquerda a
partir de 900px, corpo rolando na altura toda da janela, e o mapa com
largura de verdade.

### Dois defeitos reais que vieram junto

**`RBF.State.push('pages')` nunca funcionou.** `'pages'` não constava de
`RBF.State.STATES`, então `push()` recusava em silêncio, nada era empilhado,
e o `pop()` do fechamento tirava da pilha o estado de **outro** painel. O
estado novo se chama `conta` e está declarado.

**Camada errada.** A página nasceu em `z-index: 60`, que é o do fader de
cena, e ficava atrás do menu. Foi para 92 — acima do menu (90) e abaixo dos
overlays de interface (100), para que confirmação e aviso continuem abrindo
por cima dela. A tabela de camadas no topo de `css/ui.css` foi atualizada.

**`position: fixed` virou `absolute`**, como o menu e o portão: a página vive
dentro de `#vn`, e `fixed` dentro de um ancestral com `transform` passa a se
referir a ele.

### Detalhe de implementação

`contaAberta()` pergunta à máquina de estados, e não ao atributo `hidden` do
elemento. `hidden` é atributo em HTML e propriedade em JS, e contar com o
reflexo entre os dois amarra o código a um detalhe de DOM que nem todo
ambiente honra — inclusive o `tools/minidom.js` deste projeto.

---

## 0.11.0 — A obra se parte em quatro

Até o fim do Capítulo 9 a obra é uma só. Ali o beat `{ t:'ending' }` fecha a
conta e manda o jogador para **um de quatro caminhos, com capítulos
próprios que não existem nos outros**.

```
CAP. 9 ──┬── A COBERTURA ──→ 10 A Carruagem · 11 Marca Cinzenta
         ├── A PERDA ──────→ 10 A Conta · 11 As Três Moedas
         │                   12 A Volta · 13 O Que Ela Anotou
         ├── A RESPOSTA ───→ 10 O Registro · 11 A Entrada 214
         │                   12 O Corredor
         └── A ESPERANÇA ──→ 10 A Fuga · 11 Noventa Dias
                                    ↓
                             EPÍLOGO (compartilhado)
```

O número do capítulo se repete de propósito: existe um Capítulo 10 em cada
caminho, e eles não têm nada em comum. Quem repete a obra por outro caminho
lê um Capítulo 10 que nunca viu — que é a promessa que uma segunda partida
faz e que a versão anterior não cumpria.

**Onze capítulos novos**, 2.400 beats. A rota mais longa chega ao Capítulo 13.

### Nove desfechos viraram quatro, um por rota

A versão anterior tinha nove finais dividindo os mesmos três capítulos por
condicional. O resultado era um Capítulo 10 que não era de ninguém, e quem
repetia relia noventa por cento do mesmo texto.

| rota | condição | desfecho | Antoniette |
|---|---|---|---|
| A Cobertura | `lied_to_order:'A'` **e** `third_paid:'B'` | A Cobertura Queimada | vive |
| A Perda | Perda ≥ 11 | A Dívida | morre |
| A Resposta | Resposta ≥ 12 | O Livro-Razão | vive |
| A Esperança | sem condição — é o padrão | O Arquivo | morre |

**Distribuição medida nas 59.049 combinações**, contada por
`node tools/rotas.js` e nunca estimada:

```
cobertura  11,11%   perda  14,51%   resposta  15,93%   esperanca  58,45%
```

O material dos cinco desfechos aposentados não se perdeu: virou cena dentro
dos capítulos novos. A Vigília está no braço dormente de `esp10`; A
Testemunha, na grafia de lápide; A Casa Vazia, no corredor de `res12`.

### O que cada rota carrega

**A Esperança** é o caminho padrão e o mais curto. Ela tenta, chega à
floresta, e Klara para de andar sem saber dizer por quê.

**A Resposta** é a rota de quem entendeu tudo e não desceu nenhuma noite —
e ela está **certa**: conferiu a probabilidade em junho com a própria letra,
e a probabilidade era baixa. Carmine vem, confere, e vai embora dizendo
*"Nada. Eu vim conferir, e conferi."* Ela vive porque não valeu a pena
matá-la, e ninguém em cena diz isso.

**A Perda** é a mais longa, e é a única em que a conta fecha. Três moedas
recusadas em maio, uma porta trancada, onze minutos de desvio, um cocheiro
que esperou dez. Ela arma a coluna antes do amanhecer e escreve a única
linha do documento inteiro em que julga a si mesma.
**E a aritmética está errada, e ela nunca vai saber.** Carmine desmonta em
quatro palavras — *"Eu não estava contando o tempo."* — e não há resto de
frase. Steiner, R11: a cadeia causal fica e o mérito sai.

**A Cobertura** é a única em que ela sai viva e antes de agosto, e é a única
em que ela usa a própria morte presumida como ferramenta: não escreve
nenhuma quarta-feira, porque o pacote só sai com noventa dias de silêncio.

### O Prólogo não mudou uma linha

A moldura sobrevive às quatro. O pacote chega, Matheo conta as páginas antes
de ler a primeira, e o que muda é o que está dentro.

---

## O MAPA — fluxograma no painel "A Conta"

A aba **A Árvore** ganhou um fluxograma em SVG antes da lista: espinha
compartilhada com dez leques de três, o marco onde a conta fecha, e as
quatro colunas de rota com alturas diferentes.

**A diferença de altura entre as colunas é a coisa que o desenho diz melhor
do que qualquer texto.** A Perda desce mais.

- coordenadas calculadas em `RBF.Arvore.grafo()`, nunca medidas no DOM: um
  `viewBox` escala sozinho e nada precisa ser remedido quando a janela muda
- o quadro rola de lado abaixo de 660px, com largura mínima — fluxograma que
  encolhe até caber vira borrão
- clicar num nó leva à linha correspondente da lista
- a aresta tracejada é o assunto do desenho: a rota é decidida no fim do
  Capítulo 9 e o desfecho só aparece dois a quatro capítulos depois

Cor com significado, e as mesmas três do jogo: ouro para Esperança, carmim
para Perda e para o caminho desta leitura, frio para Resposta. Ramo não
percorrido não ganha cor.

### Dois defeitos pegos olhando a imagem, que nenhum validador via

**O fecho de um leque e a abertura do seguinte desenhavam duas barras quase
coladas** e a figura virava ruído. Agora as três reconvergem num ponto só e
o par forma um losango em volta da junção.

**O trilho da esquerda estava pintado de carmim**, dando a entender que o
jogador tinha passado por todas as leituras — o oposto do que a tela diz.

---

## SELEÇÃO DE CAPÍTULOS por rota

Era uma lista corrida, e lista corrida com quatro Capítulos 10 diferentes
não diz nada a ninguém. Agora o tronco vem primeiro, sem cabeçalho, e depois
vem uma faixa por caminho com nome, condição em linguagem de eixo lida de
`RBF.ROTAS`, e a contagem de quantos capítulos daquele caminho foram
alcançados.

A faixa aparece **sempre**, inclusive intocada: saber que existe um caminho
que você não percorreu é o ponto. A nota da rota só abre depois de ela ter
sido percorrida até o fim.

**Um furo real, corrigido:** entrar por seleção de capítulo num capítulo de
rota deixava `flags.rota` vazia, e como todo beat daqueles capítulos é
condicional a ela, o capítulo tocaria em branco — tela preta e cartão de
fim. `startChapter()` passou a declarar a rota e o desfecho.

---

## Ferramentas

```bash
node tools/rotas.js            # distribuicao nas 59.049 combinacoes
node tools/rotas.js --tabela   # varredura de limiar por eixo
node tools/finais.js           # as quatro rotas, com checagens
node tools/finais.js --dump    # transcript de cada uma
node tools/arvore.js           # a arvore: anotacao vs roteiro, e a tela
node tools/shot_arvore.js      # o mapa em Chrome, em quatro tamanhos
```

`tools/rotas.js` existe porque este projeto já perdeu uma produção inteira
com limiar estimado. Ele conta, e falha se alguma rota nascer inalcançável.

### Expectativas atualizadas em vez de afrouxadas

`validate.js` e `smoke.html` exigiam que **toda** partida alcançasse todos os
capítulos do manifesto. Com quatro rotas isso é falso por construção. As duas
passaram a exigir o que é verdade e é mais estrito: tronco completo,
**exatamente uma** rota, e ela inteira. Voltar a exigir o manifesto inteiro
esconderia vazamento de rota em vez de acusar.

`validate.js` ganhou também: toda rota alcançável, todo desfecho alcançável,
todo capítulo declarado existe, pertence à rota que o declara e tem corpo.

---

## 0.10.0 — A Árvore, e os cinco finais que não tinham fim

### Cinco dos nove finais paravam no Capítulo 10

A obra foi de quatro para nove finais e o Capítulo 11 e o Epílogo
continuaram cobrindo quatro. `witness`, `vigil`, `ledger`, `debt` e
`hollow` divergiam em `chapter10.js` e depois caíam no tronco de
`archive`: quem chegasse a `ledger` — em que ela **vive** — atravessava a
cena de Carmine, arrancava quatro páginas, escrevia a última entrada,
despachava o pacote e não recebia destino nenhum. O Epílogo não tinha uma
linha para eles.

Nenhum validador via isso. `validate.js` joga três ramos de escolha e
alcança no máximo três finais dos nove; os outros seis nunca tinham sido
lidos por ninguém. **`tools/finais.js`** existe por causa disso: escreve o
transcript dos três últimos capítulos para cada um dos nove e confere o
que dá para conferir por máquina — beat próprio em cada capítulo, ficha de
baixa batendo com quem morre, cartão de fim único, laudo preenchido, e
nenhuma flag lida sem ser escrita em algum lugar.

### As correções do Steiner e do Ishiguro

O estudo de *A Morte da Tragédia* reprovou dois dos nove por escrito, e a
reprovação foi acatada.

**A Dívida** era o mais frágil: ela morria **porque errou**, e o jogador
saía com lição de moral em vez de catástrofe — `colpa morale specifica`, o
modelo que Steiner opõe ao trágico. A cadeia causal ficou inteira e o
mérito saiu: as três moedas custam caro sem que pagá-las tivesse salvado
alguém. Carmine desmonta a aritmética em voz alta, sem explicar —
*"Você chegou onze minutos atrasada." / "Cheguei." / "Eu não estava
contando o tempo."* — e Antoniette anota na margem com um ponto de
interrogação e segue. A conta continua fechando na página duzentos e
oitenta e sete, e continua errada.

**O Livro-Razão** corria risco de virar prêmio: ela vivia **e** o documento
saía completo, duas recompensas no mesmo final. Agora o documento completo
é a punição. Carmine aponta que a idade da entrada 214 está errada — Klara
fez doze em março — e Antoniette confere, corrige com a mesma pena e
classifica: *"Um erro em duzentas e catorze entradas. Está dentro da
margem."* No Epílogo o tribunal não indefere: julga improcedente por
ausência de terceiro lesado, a Ordem arquiva o material como exemplar, e a
apostila de formação de escribas leva o nome dela no índice. Ela e Matheo
trabalham no mesmo corredor por seis anos e falam do assunto duas vezes.
As duas foram sobre método.

**A Vigília** e **A Casa Vazia** ganharam o modelo de fecho do Ishiguro —
permitir uma lembrança, cortar no meio, voltar ao trabalho. Na Casa Vazia
uma borboleta de asa clara entra pela janela do corredor do arquivo em
agosto do ano seguinte; ela para com a caixa na mão o tempo de a borboleta
sair, e depois leva a caixa até a mesa, porque era o que estava fazendo.

### A Vigília e o Prólogo, resolvidos sem tocar no Prólogo

`vigil` diz que o Arquivo **nunca é compilado**, e o Prólogo mostra Matheo
lendo o Arquivo. A contradição estava registrada em `canon.md` como não
implementada.

`compilou` separa as oito leituras em que o documento sai pela mão dela da
Vigília, em que não sai. C11-4 e C11-5 ficam atrás dessa flag, e a Vigília
ganha cauda própria: ela senta com uma hora e quarenta para uma tarefa de
três noites, escreve a palavra *Índice* no alto de uma folha limpa e mais
nada, desce às seis e meia e abre a biblioteca às sete porque às sete ela
abre a biblioteca. Na quarta seguinte o mensageiro para no portão e
ninguém desce com nada para ele.

O Epílogo conta de onde veio o pacote: montado em Lervel, em nove noites,
de correspondência interceptada e relatório de campo, por um escriturário
do terceiro andar que assina o rodapé das notas como Compilador **porque o
formulário pede nome de função e não nome de pessoa**. Ninguém em cena diz
o que isso faz com o que o jogador leu no Prólogo.

### A última entrada parou de mentir

*"Tentei tirá-la daqui. Fui metódica. Fui devagar."* saía em todas as
leituras, inclusive nas três em que **não houve tentativa nenhuma** — e
saía em `distance` desde antes desta versão. `tentou` e `nao_tentou`
dividem a cena. Quem não tentou fecha o documento com as três linhas de
formulário: *"Não houve tentativa de extração. A avaliação de risco está
nas páginas 44 a 51 e não mudou em cinco anos. O Compilador subscreve a
avaliação."*

Nada no beat repreende a personagem. Ela relê o parágrafo duas vezes, do
jeito que conferia tudo, e ele está completo nas duas.

---

## A ÁRVORE — `A Conta`, terceira aba

O jogador terminava a obra sem ter como comparar o que escolheu com o que
existia para escolher. As rotas apareciam como três mostradores no HUD,
sem número e sem causa, e o efeito de uma escolha só aparecia na cena —
onde, de propósito, nada é explicado.

As dez decisões aparecem inteiras, com os três ramos de cada uma, e os
nove finais aparecem na ordem em que o jogo os avalia.

**O delta de rota é lido do campo `routes` da própria opção**, e não
transcrito na anotação. É a mesma regra que o engine segue: número
repetido em dois lugares fica errado no dia em que um dos dois muda. O
validador da árvore reprova se algum texto de anotação transcrever um
delta.

### O que aparece, e quando

Nada é liberado para demonstrar.

| camada | condição |
|---|---|
| o painel | a obra terminada uma vez |
| enunciado e as três opções | o capítulo daquela escolha alcançado |
| delta de rota e consequência | **o ramo percorrido de fato**, em qualquer partida |
| condição do final | a leitura alcançada |
| eixos do final, com direção | sempre |

O ramo não percorrido aparece como `[ ramo não percorrido ]` e não some,
do mesmo jeito que a ficha de personagem mostra lacuna em vez de esconder
que há mais.

**A direção do eixo entrou depois da primeira montagem.** Sem ela, oito
dos nove cartões diziam "leitura não alcançada" e mais nada, e a grade
virava uma parede. Com ela, A Testemunha (Esperança alta, Resposta alta) e
A Vigília (Esperança alta, Resposta baixa) passam a ser dois destinos
legíveis, e nenhum dos dois entrega o que acontece lá. É o limite:
**direção de rota, nunca conteúdo.**

### Consequências conferidas contra o roteiro, não contra memória

Cada linha de `js/data/arvore.js` foi escrita depois de ler o beat que ela
descreve. Os números citados são contagens de verdade, e
`node tools/arvore.js` reconta a cada execução:

```
aldric_pressed   13 beats no Cap. 2
klara_asked      17 no Cap. 3
taught          108 do Cap. 6 ao Epílogo
```

Se alguém mexer no Capítulo 6 e o `taught` deixar de ser lido 108 vezes, o
validador reprova a frase "cento e oito beats" antes de ela chegar ao
jogador.

---

## Dois defeitos de save, corrigidos de passagem

**`recordCompletion` gravava `routes: undefined`.** Lia
`RBF.STATE.routes`, que nunca existiu — as rotas vivem em `RBF.Routes`.
Toda partida concluída, desde sempre, guardou a fotografia sem os valores
de rota. Passou a ler `RBF.Routes.serialize()`.

**O run concluído não guardava `choiceLog`.** Sem ele a árvore não tem como
marcar o caminho *daquela* leitura. Passou a guardar. Run gravado por
versão anterior não traz o campo, e nesse caso a árvore não marca ninguém
em vez de adivinhar.

---

## Ferramentas novas

```bash
node tools/finais.js            # os nove finais, com checagens
node tools/finais.js --dump     # transcript de cada um em tools/_finais/
node tools/arvore.js            # anotação vs roteiro, e a tela num DOM
node tools/shot_arvore.js       # a árvore em Chrome, em quatro tamanhos
```

`tools/arvore.js` monta o painel num DOM próprio e confere a regra que
mais importa, que é negativa: **a consequência de um ramo fechado não pode
aparecer no HTML.** Conferir por leitura que uma coisa *não* aparece é o
tipo de checagem que passa por engano.

`tools/shot_arvore.js` existe porque `tools/shots.js` não chega ao painel —
ele exige a obra terminada, e a partida do shots começa do zero. Este
semeia o progresso e entra direto, mede a geometria e grava a imagem.

---

## 0.9.0 — A fuga deixa de teleportar, e a morte pode ser falsa

### O defeito mais grave da obra

Na rota `archive` as duas saíam pelo pátio, passavam a aldeia aos quarenta
minutos, entravam na floresta — e o beat seguinte acendia uma vela **na
biblioteca da casa**, sem uma linha de transição. Os beats compartilhados
(o inventário, "chave da biblioteca", "o barão não vai mandar ninguém antes
do amanhecer") pressupunham a casa nas quatro rotas, inclusive na fuga.

**Cena nova: C11-1b · A volta.** Sem captura, sem perseguição, sem sonho.
Klara para, vira e anda de volta, e não sabe explicar por quê — para ela é
a fome e o vazio, na hora errada. Antoniette fica parada na trilha
calculando o peso de uma criança e a distância até o rio; a conta fecha nas
duas vezes; depois vai atrás dela. Dois quilômetros em silêncio. No portão
Klara devolve a mala *como se devolve uma coisa emprestada* e pede
desculpa, e ouve *"Não foi você"* de alguém que não sabe o que está dizendo.

É a revelação 12 do canon sem ninguém em cena enunciá-la.

### A morte pode ser falsa — dois dos quatro finais ela vive

`RBF.ENDINGS` sempre disse "ela vive" em duas rotas; era a implementação que
forçava a morte nas quatro. As notas estavam certas.

| leitura | destino |
|---|---|
| **O Arquivo** | morre, no prazo que Carmine deu |
| **Agosto Antecipado** | morre, sem as quatro horas |
| **O Distanciamento** | **vive** — recolhida do campo, correspondência suspensa |
| **A Cobertura Queimada** | **vive** — demitida com carta de referência correta |

O Prólogo continua funcionando nas quatro, porque **o ponto morto dispara
por silêncio, não por morte.** E o tribunal declara "autoria falecida" sobre
alguém que, em duas leituras, respira a três ruas do gabinete de Matheo.

### Como ela morre, quando morre

Plantado em P8 desde sempre: a ficha da escriba de trinta e sete anos antes,
na letra do escriturário, última linha **"Motivo de saúde."** Matheo leu
aquilo uma semana antes de assinar a autorização dela.

Ela morre da mesma causa, na mesma letra, no mesmo formulário. Não há corpo,
não há luta, não há sangue — a casa nunca precisou disso.

### Quatro fechamentos de Capítulo 11 e quatro epílogos

`C11-6 · Depois` e `E4b · O que ficou` divergem por rota, com cartão final
próprio: *"Vá mais rápido do que eu fui"* · *"O devagar não foi o que
custou"* · *"Ela deixou ele achar"* · *"Ele precisa abrir"*.

### Menu

Códigos fora de sequência (`REG-05, REG-00, REG-0X, REG-06`) renumerados
para `REG-01` a `REG-10`.

**Validado:** 8.042 estáticas, 689 no Node, 120 no smoke. Zero falhas.


## 0.8.0 — A Cobertura Queimada, o material recuperado e a segunda leitura

### O defeito, consertado

**"A Cobertura Queimada" era inalcançável.** A flag não era gravada em
lugar nenhum, e a ramificação escrita nos Capítulos 10 e 11 nunca rodou. O
teste de alcance tinha uma exceção que deixava passar em silêncio.

O gatilho são duas escolhas, e as duas são o jogador sendo **correto** pelas
regras da Ordem: relatar agosto do ano três na íntegra (`lied_to_order:'A'`)
e remeter o nome da antecessora com identificação da fonte
(`third_paid:'B'`), porque prova sem proveniência não vale em matéria de
foro. Nidhaus lê tudo o que entra e sai. Ela pôs o nome de um empregado
vivo num envelope que atravessa aquela casa.

**Ser honesta com a Ordem é o que queima a cobertura dela.**

A exceção do validador foi removida: agora todo final declarado tem de ser
atingido por alguma combinação de escolhas, sem escapatória. Os quatro
passam.

### O material recuperado

A queixa procedia: 26 itens tinham nome e mais nada. Agora **48 itens e 121
entradas**.

- **Todo documento e registro ganhou descrição** — o que aquilo é, sem
  entregar o mistério — e entradas que só abrem com a obra terminada.
- **Os registros de volume declaram a troca de cada capítulo**: o que ela
  ganhou e o que entregou. Lidos em sequência, são a espinha da obra.
- **As fichas ganharam camada pós-jogo**: o tique, o medo, a contradição e
  o que sobra da pessoa. A Antoniette come em pé porque na Ordem se come em
  pé, e ela levou o hábito para uma casa onde ninguém tinha pressa.
- **Fichas novas:** Carmine — que não existe na galeria antes do fim,
  porque antes do fim não há motivo para o jogador saber que há alguém para
  ter ficha —, Os Guardiões e O Primeiro.

### O laudo do final

O painel das Quatro Páginas passa a abrir com o laudo da leitura
alcançada: **o que aconteceu, o que custou, o que ela sentiu, o que foi da
menina e o que ela não soube.** É a única parte da obra que diz o
sentimento dela com todas as letras — pode, porque não é cena, é laudo, e
quem lê já terminou. As palavras mãe, filha e amor continuam proibidas
inclusive aqui.

### Registro de Leituras

O jogador terminava sem nunca saber qual dos quatro finais tinha pegado: o
nome aparecia num único lugar do jogo inteiro. Painel novo, em forma de
índice de arquivo — as alcançadas com o laudo, as que faltam como linha
lacrada. Sem porcentagem e sem troféu.

### A segunda leitura do Prólogo

Quem terminou recomeça com a flag `relendo` ligada, semeada pelo motor a
partir do progresso gravado. O Prólogo passa a ter o que não estava lá na
primeira vez.

**A voz continua sendo a dele.** O Compilador não ganha linha nova —
Antoniette está morta e o documento é o mesmo objeto físico. O que muda é o
que Matheo repara, e ele continua sem entender. Ele diz os quatro números
que faltam em voz alta. Vê a asa e não sabe que vai voltar a essa dobra
numa tarde de maio, sete anos depois. E o jogador fica sabendo onde as
quatro páginas estão — no livro-caixa da casa, e ninguém foi buscá-las.

**Validado:** 7.799 checagens estáticas, 689 no Node, 120 no smoke. Zero
falhas. 3.117 beats.


## 0.7.1 — Revisão medida do Prólogo, Cap. 1 e Cap. 2

Passe editorial nos três primeiros capítulos, agora que o fim existe. Um
analisador aplica as regras de `docs/estudo/00_indice.md` ao roteiro e
devolve número, não opinião.

### O que a medição achou

| | Prólogo | Cap. 1 | **Cap. 2** |
|---|---|---|---|
| sensorial por 100 beats (R4) | 13,5 | 13,7 | **4,3** |
| o PDV não entende (R6) | 3 | 4 | **0** |
| desvio no tamanho de frase (R8) | 41,7 | 28,6 | **21,8** |

O Capítulo 2 era o problema, e por três motivos ao mesmo tempo: **zero
menções a cheiro** num capítulo que abre numa cozinha com fogo e pão às
cinco e meia; **Antoniette acerta em todos os beats**, o que quebra a
função dela de "introdução do inocente" (Johnson, MWA — o ponto de acesso
do jogador precisa não entender coisas em voz alta); e o ritmo mais
metronômico da obra, sem uma única frase longa.

### Depois

| | Prólogo | Cap. 1 | Cap. 2 |
|---|---|---|---|
| sensorial | 13,1 | **14,2** | **9,5** |
| não entende | 3 | 4 | **3** |
| desvio | 41,3 | 29,0 | **28,0** |

### Plantios que só agora eram possíveis

Os três primeiros foram escritos antes do fim existir. O que ganharam:

- **A fome e o vazio.** O Capítulo 11 abre com Klara dizendo *"Está com
  fome de novo"* e a narração explicando que ela nunca diz quem, porque
  para ela não há quem. Agora o Arquivo registra o sintoma no Prólogo, em
  linguagem clínica, e larga o assunto — *"Ela nunca larga assunto
  nenhum."* No Capítulo 1 a Liara pergunta, e a Klara responde "um pouco".
- **A dedução errada.** No fim do Cap. 2, Antoniette vê a criança
  atravessar o pátio às duas e vinte, lembra que a copa fecha às oito e
  conclui que ela não está descendo para comer. *"Foi a única conclusão
  que ela tirou naquela noite, e estava errada."*
- **O filho de Fenn**, pela marca a faca na porta da cocheira — cinco anos
  antes de o Capítulo 8 cobrar a dívida e de a página 291 registrar quem
  pagou.

### Outras correções

- **R10, agenda própria:** Dara quer cravo que não vendem na região há
  dezenove anos; Ren junta para comprar uma parelha e não depender de casa
  nenhuma. Falas de secundários no Cap. 2: 22 → 27.
- **Faye, a crítica do humor:** entrou uma linha de crueldade esperta na
  língua da casa — *"Casa grande. Sobra parede e falta assunto."* — e ele
  não sorri ao dizer.
- **R3, endline:** duas cenas do Cap. 1 deixam de fechar em pensamento e
  passam a fechar em gesto. A do quarto agora fecha num gesto que dura
  cinco anos.

### Não mexido, de propósito

O corredor leste do Capítulo 1 continua intacto. É a melhor cena da obra e
não se mexe no que está certo.

**Validado:** 7.752 checagens estáticas, 688 no Node, 120 no smoke. Zero
falhas.

**Pendente e registrado:** a idade do filho de Fenn não fecha entre o
Cap. 3 (14 anos, ano 1) e o Cap. 8 (15 anos, ano 4). A fala nova do Cap. 1
não cita idade, para não aprofundar a divergência.


## 0.7.0 — A obra fechada: Capítulo 11, Epílogo e As Quatro Páginas

O roteiro está inteiro. Prólogo, onze capítulos e Epílogo, com o extra
pós-jogo que fecha o único fio que o Prólogo deixa em aberto na primeira
página.

### Capítulo 11 · Noventa Dias

A última cena é o começo do Prólogo, visto do outro lado: o cordel em
quatro voltas, o nó cego, o mensageiro da rota de Alsbeck e a instrução do
prazo. Ele entrega no nonagésimo terceiro dia porque a estrada de Alsbeck
alaga em novembro.

Carmine entra em cena pela primeira e única vez, e entra **sem corpo** —
nenhum sprite, nenhuma descrição de rosto. O que a marca no palco é a
temperatura do ar e uma vela que não oscila. As falas dela saem sob o
rótulo "A voz" até ela mesma entregar o nome; a caixa de fala é a
revelação, e nenhum texto anuncia.

**O motivo é ciúme, e a obra nunca diz isso.** Para Carmine todo pacto é
casamento, e qualquer vínculo importante de fora é traição. Antoniette
morre porque Klara a escolheu. Antoniette nunca descobre: ela conclui
"calendário", em pensamento, e Carmine deixa passar sem confirmar nem
desmentir. É essa conclusão errada que vai para o Arquivo e que Matheo lê
no Prólogo. O único vestígio que ela registra é uma ausência — *"Ela não
perguntou nada sobre o plano. Nem uma vez."*

### Epílogo · O Que Ficou

Salto de seis anos, exigido pelo canon: a Academia de Eldoria é ensino
superior e só aceita depois da maioridade.

Matheo fez tudo certo — protocolou, sustentou, recorreu duas vezes. O
tribunal indeferiu por *"sem terceiro lesado identificável"*. **As quatro
páginas que Antoniette arrancou eram exatamente os terceiros.** O último
ato de proteção dela foi o que matou o processo, e ele morre sem saber.

O alerta que ele deixou no sobrenome dispara seis anos depois e traz a
coisa mais inofensiva que existe: duas meninas entrando na faculdade. Ele
lê o regime de residência integral sem entender que está lendo um
cronograma.

A balada fecha completa, sobre preto.

### Extra · As Quatro Páginas

Desbloqueia com a obra terminada. É **o documento que Matheo nunca
recebeu**, e o texto é montado a partir das escolhas da partida concluída:
cada página registra uma vez em que um terceiro pagou pelo método dela.
Dois jogadores nunca leem o mesmo documento.

A numeração fecha o buraco que o Prólogo abre em P2 — Matheo conta até 287,
a dela termina em 291.

### Menu selado

Depois de terminar, o cabeçalho passa a saber o que o jogador sabe. Sem
comemoração: a linha de volume deixa de dizer TESTEMUNHOS SELADOS e passa a
dizer **291 PÁGINAS**, que só faz sentido para quem chegou lá. O contador
de capítulos vira contador de leituras, e o portão troca a dica pela regra
do prazo.

### Correções de canon

- **A Academia é faculdade de magos, não escola.** A fala da Liara no
  Capítulo 8 tratava como colégio com entrada aos treze. Corrigido, e as
  duas contagens de dias que dependiam disso foram refeitas.
- **Klara não sabe que Carmine existe.** Só descobre adulta, na Academia.
  Até lá é fome e vazio, sem sujeito. A revelação do nome no Capítulo 11
  foi remontada por causa disso.
- **Três linhas afirmavam aniversário em agosto** contra oito capítulos que
  sustentam inverno. Corrigidas, inclusive a idade na última entrada do
  Prólogo.

### Motor e ferramentas

- `{ t:'end_chap', completes:true }` grava a partida concluída — final,
  flags e rotas — para o extra sobreviver ao fim da sessão.
- `RBF.Saves`: `recordCompletion`, `lastRun`, `hasCompleted`, `endingsSeen`.
- `js/paginas.js` monta o documento; `js/data/quatro_paginas.js` guarda o
  texto.
- Os validadores aprenderam que `{ t:'ending' }` grava a flag `ending` —
  antes acusavam flag órfã no Capítulo 10.
- `tools/minidom.js` ganhou seletor de atributo, para o teste do menu poder
  procurar por `data-record` em vez de varrer por classe.
- 22 checagens novas no `validate.js` cobrindo o extra: trava antes da hora,
  abre depois, nenhuma página em lacuna, ramos diferentes produzindo
  documentos diferentes, e o manifesto não sendo mutado pelo estado selado.

**Validado:** 7.636 checagens estáticas, 688 no validador Node, 120 no
smoke com três partidas completas. Zero falhas nas três camadas.

**Não testado:** nada foi jogado clicando. A verificação é toda por código.


## 0.6.0 — Corpus de referência lido por inteiro, bíblia v3, roteiro revisado

Onze livros em `REF/` lidos e destilados, um por vez, em
`docs/estudo/` — um arquivo por livro mais um índice consolidado. A partir
daí, uma bíblia nova e cirurgia no roteiro.

### O estudo

`docs/estudo/00_indice.md` é o ponto de entrada: **dez regras de confiança
alta** (onde duas ou mais fontes independentes convergem), as duas críticas
sérias que o corpus faz ao projeto, onde a obra discorda dos livros e por
quê, e a fila de ação numerada.

Notas por livro: Murphy, Finley, Frey, Squarisi & Salvador, Zinsser,
Corbett, Cavallaro, MWA, Kenworthy, Kristoff, Peters.

**Descobertas que mudaram categoria:**

- **A obra é thriller no eixo causa→efeito, não whodunnit.** Todorov, via
  Cavallaro: curiosidade vai de efeito a causa; suspense vai de causa a
  efeito. O Prólogo entrega a causa.
- **A arquitetura tem nome: "interatividade superposta"** — percurso linear
  com cenas interativas localizadas. Encerra a dúvida sobre ramificar
  pouco.
- **O Arquivo erra por omissão e por ênfase, nunca por invenção.** Corbett
  pelo lado do narrador não confiável, Zinsser pelo lado do custo, Peters
  dá o mecanismo: *"diziam alguns"*.
- **Contra o metrônomo, cinco fontes independentes.** A média medida do
  roteiro é 35 caracteres por frase, com zero variação.

### `tools/desgruda.py`

O PDF do Kenworthy foi gerado sem codificar o caractere de espaço:
`Ifyouwanttobeasciencefictionwriter`. Nenhuma ferramenta de extração
resolveria. A saída foi montar um dicionário de frequência a partir dos
outros livros em inglês do próprio corpus — 83.603 palavras distintas — e
resegmentar por programação dinâmica. Ficou legível.

Também novo: `tools/refslice.py`, para fatiar o corpus sem depender do
codepage do console.

### `docs/biblia_v3.md`

Substitui a bíblia original e a revisão v2. O canon é o mesmo — foi
fechado pelo autor. **O que mudou foi a forma.**

- **Elenco por cena, não por ficha.** Corbett: uma lista estática de fatos
  ajuda a *descrever* e serve de pouco para *dramatizar*. Cada personagem
  principal ganhou papel dramático com o termo técnico, contradição,
  detalhe específico e três cenas de esboço — vergonha, conflito fora do
  enredo, trabalho.
- **O gráfico de fios da Crombie**, com sete colunas. Substitui o
  stepsheet como ferramenta principal, porque acomoda cinco anos e várias
  linhas em paralelo.
- **Aldric registrado como "vilão simpático"**, com o termo, para que
  ninguém o transforme em aliado limpo nem em vilão raso.
- **Carmine construída pelo método Talese** — que escreveu o perfil que
  fundou um gênero sem nunca entrevistar Sinatra. Regra fechada: nenhuma
  cena a partir do ponto de vista dela.
- **Os criados ganharam agenda própria e detalhe contraditório.** Três
  fontes concordam que não se planta pista falsa: ela nasce de gente com
  suposições próprias.
- Saíram duas frases da v2 que usavam a fórmula proibida "não é X — é Y".
  Estavam justamente no trecho que explicava por que ela é proibida.

### Prólogo

- **O Arquivo virou objeto físico:** peso, cordel em quatro voltas e nó
  cego, cheiro de cavalo e cera, frio de estrada. E uma **numeração que
  não fecha** — 287 páginas, numeração até 291. Corte reto e antigo. Nunca
  explicado.
- **Auditoria sensorial.** A versão anterior era quase toda visual.
- **Beat de uma palavra** na contagem das páginas.
- **As notas do Compilador viraram sistema.** Cada uma se defende de uma
  acusação que ninguém fez. A nota 17 usa a atribuição vaga de Peters.
- **As camadas de tempo se contaminam uma vez**, em P9: Antoniette
  pergunta "Você sabia?" e Matheo responde em voz alta, na sala vazia.
- **Uma frase longa e desnorteada no clímax**, depois do capítulo inteiro
  em frase curta.
- **As borboletas deixaram vestígio físico** — uma asa prensada na dobra
  da folha — para o Epílogo poder fechar em cima delas.
- **As três linhas de Khar'Vel não foram alteradas.** São texto canônico
  do autor e são anáfora deliberada: definição por exclusão, porque a
  coisa não tem categoria positiva. Matheo repara na forma, o que converte
  a figura de linguagem em caracterização.

### Capítulo 1

- **Topo cortado.** Abria com quatro beats de paisagem. Agora abre no
  gesto, e abril é descrito pelo que faz nas mãos de quem viajou três
  dias.
- **Antoniette ganhou contradição disposicional:** metódica ao extremo, e
  **come em pé**. Plantado sem comentário.
- **Fenn ganhou detalhe contraditório e agenda** — econômico com gente,
  falastrão com os cavalos.
- **Registro por interlocutor.** Ela fala curto com Fenn, formal com
  Serafina, precisa com Aldric.
- **A decisão de não insistir aparece em cena**, com o preço à vista. Frey:
  o leitor não pode achar que a detetive é idiota.
- **Klara quer e tenta.** Não pode ir à feira, então pede a feira inteira
  pela boca da irmã. É o mecanismo que termina na Academia.
- Ramos das escolhas equilibrados; dois fins de cena convertidos de soco
  para ponte; beat de uma palavra em C6; uma frase longa em C9.

### Capítulo 2

- **`aldric_pressed` passou a ser lida.** A flag era gravada no Capítulo 1
  e nunca consultada em lugar nenhum. Agora paga na seção nordeste, e os
  dois ramos levam o "e se" a um fim desagradável diferente: ou ele
  preparou o lugar para ela, ou ninguém subiu ali e as duas explicações
  possíveis são ruins.

### `antipadroes-ia.md`

Quatro itens novos, todos do corpus:

- **o substituto físico do medo** — coração disparado, arrepio na nuca. É
  a saída óbvia da regra "não afirme a emoção", e por isso é a saída de
  todo mundo
- **chavões em português** — a lista dos "mesmeiros" de Squarisi
- **a distinção** entre o par gramatical `não…mas` (legítimo) e a fórmula
  retórica "não é X: é Y" (proibida)
- **erros de português automatizáveis** — paralelismo com `e que`,
  `à medida em que`, pares partidos, gerundismo, plural de parte única do
  corpo

### Verificação

`python tools/validate.py` — 2150 checagens, zero falhas.
`node tools/validate.js` — 474 checagens, zero falhas.
`tools/smoke.html` no Edge headless — 56 checagens, zero falhas.

**Não testado:** áudio real, toque em telefone, e o Capítulo 1 jogado do
começo ao fim clicando beat a beat no motor. Os três validadores conferem
por código; nenhum deles é o olho de quem joga.

---

## 0.5.0 — Revisão geral: Prólogo e Capítulo 1 reescritos, seis defeitos fechados

Duas frentes nesta versão. A primeira é o roteiro: o Prólogo e o Capítulo 1
foram reescritos do zero, com estrutura nova. A segunda é o motor, onde a
execução real encontrou coisas que a leitura de código não tinha achado.

Esta máquina não tem Node, então `tools/validate.js` não roda aqui. Em vez
de entregar sem verificar, o projeto ganhou duas ferramentas que rodam com
o que existe: `tools/validate.py` (estático, 1847 checagens) e
`tools/smoke.html` (o jogo jogando sozinho no navegador, 55 checagens).
Os dois fecharam em zero falhas. `tools/validate.js` continua no lugar e
continua sendo o validador mais completo para quem tiver Node.

### Defeitos corrigidos

**Soft-lock ao fechar um painel aberto pelo menu de jogo.** Menu → Ajustes
→ Fechar deixava o jogador preso: partida pausada, nenhum painel na tela,
Escape sem efeito e clique sem efeito. O `onClose` do painel filho voltava
ao estado `paused` e chamava `openGameMenu()`, mas a primeira linha daquela
função era um guarda de alternância — "se já está pausado, feche" — que
fechava o menu recém-pedido. Sem painel aberto para fechar, a função saía
em silêncio. Valia para Ajustes, Save, Load, Galeria, Capítulos, Histórico
e Créditos. O guarda passou a olhar se o menu está de fato na tela, e a
reabertura não empilha estado de novo.

**Carregar um save durante uma espera pulava beats.** `advance()` é
assíncrono e espera de verdade em `pause`, em fade e em cartão de capítulo.
Abrir o menu nesse intervalo e carregar um save trocava o roteiro sob os
pés do laço antigo, que acordava depois e continuava avançando sobre o
array novo. O harness pegou isso na primeira execução: o save gravado no
beat 271 reabria no 274. Agora o motor tem uma geração de roteiro; todo
laço confere a sua antes e depois de cada espera e desiste quando ela mudou.

**"Prólogo concluído" e "Capítulo 1 concluído" nunca abriam na galeria.**
O motor só marcava capítulo concluído em um beat `end_chap` com o campo
`chapter` preenchido. O Prólogo não tem esse beat e o Capítulo 1 tinha
esquecido o campo. Terminar o jogo inteiro não abria nenhum dos dois. A
marcação passou a acontecer na troca de capítulo, em um lugar só.

**O ajuste de tamanho de texto anulava a escala responsiva.** Os Ajustes
gravavam um px direto em `--rbf-text-size`, em estilo inline no `:root`.
Estilo inline vence media query: bastava o jogo carregar para o tamanho por
faixa de tela morrer, e uma tela de 1900 px passava a ler no mesmo corpo do
telefone. Agora são dois tokens — `--rbf-text-base` muda por faixa,
`--rbf-text-scale` é o único número que os Ajustes tocam — e o controle
virou porcentagem.

**Segurar Ctrl ligava e desligava o avanço rápido dezenas de vezes por
segundo.** Tecla mantida pressionada repete o `keydown`. Faltava o guarda
de `ev.repeat`.

**A tabela de teclas dos Ajustes estava errada.** Listava Ctrl como
"esconder interface" quando Ctrl é o avanço rápido, e esconder a interface
não tinha tecla nenhuma — só o botão da barra. Corrigida, e a tecla `V`
passou a esconder e mostrar a interface.

### Ajustes menores

- Painel aberto pela barra de leitura volta para a leitura, e o relógio da
  partida volta a correr. Antes todo painel caía no menu de jogo: quem só
  queria consultar o histórico durante a leitura fechava duas telas.
- `pick()` no áudio aceitava só `canplaythrough`, que nem sempre chega sob
  `file://`; agora aceita `canplay` também, com guarda para não chamar o
  callback duas vezes.
- O manifesto listava `bgm_*.ogg` e `sfx_*.mp3` que nunca existiram em
  disco — uma requisição falha por faixa em toda troca de cena. A lista
  passou a descrever o que está na pasta.
- `{ t:'bg' }` não marcava cenário visto na galeria. Só `scene` marcava.
- `RBF.Saves.addPlaytime` existia e nunca era chamado; o total acumulado
  ficava em zero para sempre. Agora entra ao voltar para o título.
- A dica de fim de roteiro trazia "Capítulo 2" escrito à mão no manifesto.
  Passou a nomear o último capítulo registrado.
- `main.js` não conferia `RBF.DIALOGUE_CONTROLS` na lista de módulos.
- Os créditos repetiam o número de versão como texto solto.

### Roteiro

**Prólogo — de seis para onze cenas.** Duas adições mudam o peso do
capítulo. A primeira é o Compilador: o Prólogo não apresentava a voz das
notas de rodapé, que é o arco meta-narrativo inteiro. Agora apresenta, e a
máscara escorrega uma vez, na página cento e quarenta e um, em uma nota que
nega ter motivo para registrar a idade de uma criança de oito anos. A
segunda é a escriba de Lervel: o registro dela não foi só perdido, foi
fechado pela própria Ordem de Matheo, trinta e sete anos atrás. É o que dá
peso à pergunta que ela deixa para ele.

O Prólogo continua sem escolha nenhuma, de propósito. É o único capítulo em
que o jogador só assiste, porque tudo ali já aconteceu.

**Capítulo 1 — de seis cenas e uma escolha para nove cenas e duas.** A
escolha nova, "A Permissão", fica na biblioteca: Aldric proíbe sem proibir,
e o jogador decide se Antoniette aceita, pressiona ou fica calada. As três
respostas mostram um Aldric diferente e reconvergem na mesma cena.

Cenas novas: a galeria de retratos, com nove gerações de duas filhas cada e
uma moldura vazia que alguém limpa; e a medição do quarto, onde três passos
de parede não têm explicação e não recebem nenhuma. O quarto de Antoniette
passou a ser escolha declarada de Serafina — "é o de melhor vista para o
pátio" —, o que transforma a janela que dá para a porta nordeste em
cortesia ou permissão, sem dizer qual.

O contrato com o Capítulo 2 está intacto: a escolha `cap1_relatorio` e a
flag `archive_seed` não mudaram de nome, e o harness confirma que a opção C
ainda grava a flag que aquele capítulo lê.

**Saves antigos são recusados.** O `saveSchemaVersion` subiu para 2. O
formato não mudou, mas um save antigo aponta para um `beatIndex` que agora
cai em outra frase. Recusar com aviso é honesto; carregar no lugar errado
não seria.

## 0.4.3 — Layout conferido em navegador de verdade

Até aqui eu vinha corrigindo layout às cegas: lendo CSS, raciocinando e
entregando. Este ambiente tem Chrome e Playwright — passei a abrir o jogo,
medir o que o navegador desenhou e olhar o resultado. As correções abaixo
saíram dessa medição, não de suposição.

### O que a medição encontrou

**A navegação continuava 300 px abaixo da borda inferior.** No notebook a
lista ia até y=1065 numa tela de 768. Os quatro últimos registros estavam
fora da tela. Causa: a linha do grid usava `min-content`, que é a altura
cheia da lista — a linha crescia e o menu inteiro passava a rolar.
Agora a barra e o lockup ocupam altura natural, a lista recebe o que sobra
(`minmax(0, 1fr)`) e rola por dentro. Com `min-height: 0`, sem o qual o
filho estoura a linha em vez de rolar.

**Nomes de registro truncados.** "Novo Jogo" cortado a 118 px, "Fechar o
Arquivo" a 182. O cromo da direita — linha condutora, selo e código REG —
consumia a largura antes do nome. A coluna passou a 35 vw, a linha
condutora cede primeiro, e o código REG sai de cena abaixo de 1520 px.

**"VOLUME XVII · TESTEMUNHOS SELADOS" cortado no telefone.** A regra que
esconde esse bloco abaixo de 860 px existia, mas vinha **antes** da regra
que declara `display: flex`. Mesma especificidade: a última vence, e a
barra continuava aparecendo cortada. Ordem invertida.

**A fotografia de fundo e o arco estavam carregados e invisíveis.** Brilho
médio de 25 em 255 na área da imagem. Não era asset faltando — era a
cortina escura por cima. Refeita com mais faixas e menos opacidade no lado
direito; os traços do arco passaram de `--rbf-ink-mute` para tom de papel.

**Camada de luz vazando.** `rbfCandle` anima opacidade **e** escala, e
escalar uma camada de tela cheia a faz ultrapassar o palco, criando
rolagem lateral no telefone. Passou a animar só opacidade.

**"O PRIMEIRO TESTEMU…" no telefone estreito.** Reticência não informa
nada: abaixo de 400 px o rótulo do capítulo sai inteiro.

**Numeral "VIII" cortado.** Coluna de largura fixa. Passou a `max-content`.

### Ferramenta nova

`tools/shots.js` abre o jogo em Chrome, em oito tamanhos de tela, mede a
geometria e grava uma imagem de cada tela em `tools/_shots/`.

```bash
node tools/shots.js --open
```

Reprova três coisas: elemento com qualquer borda fora do palco, texto mais
largo do que a caixa que o contém, e lockup sobre a navegação. Distingue
transbordo real de rolagem legítima — conteúdo abaixo da dobra em um
container que rola de propósito não é defeito.

Sem Chrome ou sem Playwright, avisa e sai com código 0: é ferramenta de
conferência, não requisito para o jogo rodar.

**48 checagens de geometria, 0 falhas**, menu e cena, nos oito tamanhos.

### Sobre o conjunto de testes

`tools/validate.js` passou 442 de 442 com a interface visivelmente
quebrada. Ele confere estrutura, estado e roteiro — e não vê layout. Agora
diz isso no cabeçalho e termina apontando para `shots.js`. As checagens
estáticas de regressão foram corrigidas: uma delas lia só o primeiro bloco
de um seletor que aparece em várias media queries, e outra ainda descrevia
a estrutura anterior.

**463 checagens estáticas + 48 de geometria, 0 falhas.**

---

## 0.4.2 — Escala, recorte e sobreposição

Tudo nesta versão é correção do que apareceu na tela. A validação anterior
passava 442 de 442 com a interface visivelmente quebrada — isso era falha
do conjunto de testes, e a seção final trata disso.

### Texto cortado

**Título "ARQUIVO RABENFEI".** A causa não era só o `max-width` em `ch`,
já removido antes: `.rf-title__mask` tem `overflow: hidden` para a
revelação de baixo para cima, e `overflow` corta nos **dois** eixos. Com
a largura vindo do bloco, a última letra sumia. Agora a máscara usa
`width: max-content`.

**"TESTEMUNHOS SELADO…" e "NOTA DE MARG…".** O menu tinha
`overflow: hidden`, então conteúdo que não cabia era cortado em vez de
rolar. Passou a `overflow-y: auto` — nas duas faixas, tela larga e
paisagem curta. O bloco da direita da barra de classificação sai de cena
inteiro abaixo de 860 px, em vez de aparecer pela metade.

### Sobreposição

**Título invadindo a lista de registros.** A linha do lockup usava
`minmax(0, 1fr)`, que pode encolher até zero: quando a altura apertava, o
conteúdo transbordava por cima da navegação. Agora é
`minmax(min-content, 1fr)`.

**"FICHAS ARQUIVADAS" colidindo com "Carregar".** O rótulo do capítulo
quebrava em duas linhas e estourava a altura revelada na transição. Agora
fica em uma linha, com reticência quando falta espaço.

**Arco central por cima da barra superior.** A ilustração era medida pela
largura; em linha baixa ela transbordava. Passou a ser medida pela altura
disponível, e a área de arte contém a própria ilustração.

### Escala

A escala de interface subiu em todas as faixas — de 1,0–1,45 para
1,05–1,9 — e o texto de diálogo de 18 para 19 px na base, chegando a 24 px
em monitor. Rótulo e código de interface ganharam piso próprio (11 px e
10 px): abaixo disso o tracking largo do cromo deixa de ser legível.

Alvo de toque dos controles de leitura subiu de 34 para 40 px. HUD de
rotas e botão de menu ganharam respiro em relação à borda, em vez de
ficarem colados no canto.

### Personagem

**Retângulo visível em volta do sprite.** Não era fundo opaco — o alfa
está limpo. É a arte preenchendo o próprio quadro até a borda, o que na
cena aparece como um corte reto. Resolvido com máscara: os últimos 12 %
da figura dissolvem na escuridão em vez de terminar em linha.

### Leitura

Em monitor largo a caixa de diálogo para de crescer aos 1360 px e fica
centrada — uma linha de texto de ponta a ponta da tela é desconfortável.
A aba de identificação recuou da borda e o painel ganhou respiro interno.

### Testes

Seção nova, **Regressões de layout**: cada defeito que chegou à tela virou
uma regra, com o motivo registrado junto. Título sem largura em `ch`,
máscara que não corta na horizontal, rótulo em uma linha, linha do lockup
que não encolhe, menu que rola em vez de cortar, arco medido pela altura,
sprite com máscara, largura de leitura limitada, piso de tamanho no cromo,
respiro nas bordas, alvo de toque.

**461 checagens, 0 falhas.**

`tools/preview.html` carrega o `index.html` de verdade em oito tamanhos de
tela ao mesmo tempo, em iframes com zoom ajustável. Não substitui o
aparelho — barra de endereço móvel, cursor em toque e política de autoplay
continuam fora — mas mostra recorte e sobreposição de imediato.

---

## 0.4.1 — Correções de interface e arte própria

### Defeitos corrigidos

**Título truncado no menu.** Aparecia "ARQUIVO RABENFEI". A regra
`max-width: 9ch` no `.rf-title` cortava o "S" de RABENFELS — `ch` mede a
largura do algarismo zero, que nessa fonte é mais estreito que as
maiúsculas. A largura passa a vir da coluna do grid, com
`white-space: nowrap` para cada palavra ficar inteira.

**Moldura dourada em volta do primeiro item do menu.** Era o anel de
foco: o menu chamava `focus()` no primeiro registro logo após a
revelação, e o navegador acendia `:focus-visible`. Agora o primeiro item
só recebe a marca visual (`is-active`) e a nota de margem; o foco real
entra em cena quando o jogador usa as setas. Setas percorrem a lista e
Enter abre.

**Registro VIII saía como "8".** A lista de numerais romanos tinha sete
entradas para oito registros. Agora vai até X.

**Personagens como bloco branco na cena.** Os sprites herdados da versão
monolítica estavam em RGB, sem canal alfa: o fundo branco vinha embutido
na imagem. `tools/fix_sprites.py` remove esse fundo por preenchimento a
partir das bordas — não por substituição global de cor, que comeria o
branco pertencente à figura — suaviza a serrilha e recorta no conteúdo.
Treze arquivos processados; os de Matheo, que já tinham alfa, foram
deixados como estavam.

**Sprite fora de escala.** Um busto de 320×340 esticado para 420 px de
altura virava um quadrado borrado. A altura agora tem teto em px além do
teto em `vh`, e há uma classe para arte de alta resolução (`res: 'high'`
no manifesto) que pode ocupar mais tela sem borrar. Os sprites também
passaram a se apoiar na borda de cima da caixa de diálogo, em vez do
fundo do palco, então não são mais cortados pelo texto.

### Caixa de diálogo redesenhada

Segue a referência aprovada:

- aba de identificação acima do painel, com marca colorida e o nome de
  quem fala — narração e pensamento também recebem rótulo, em vez de
  aparecerem sem identificação
- filete vermelho saindo da aba e correndo até a direita
- painel com moldura visível e fundo azulado, não mais um degradê que se
  dissolvia no fundo da cena
- código de transcrição no formato posição/total dentro da cena
  (`TRANSCRIÇÃO C-I 03/12`), recalculado a cada beat porque uma escolha
  pode injetar linhas no meio
- losango de avanço no canto do painel, no lugar da seta que ficava
  dentro do texto
- **barra de leitura por dentro do painel**: Histórico, Auto, Skip, Save,
  Load, Ajustes, Ocultar, com "clique ou espaço" e a pena à direita

A barra flutuante do canto superior foi retirada; sobrou apenas o botão
de Menu. Em telefone os rótulos da barra somem e ficam os ícones.

### Avanço rápido

Skip de verdade, novo. Atravessa o roteiro depressa e para sozinho em
escolha, fim de capítulo ou fim de roteiro. Qualquer clique ou tecla
interrompe. Ligar o skip desliga o avanço automático, e vice-versa.
`Ctrl` liga o skip, `A` liga o auto.

### Arte própria

**Cursor** em três estados, extraído da arte enviada: normal, sobre
elemento interativo (com halo vermelho) e pressionado. Recortado do
canal alfa original, reduzido a 32 px e gravado em
`assets/ui/cursors/`. Hotspot na ponta, com o ponteiro do sistema como
reserva, e apenas em dispositivo com ponteiro preciso — em toque o
cursor do sistema nunca é escondido.

**Tema do menu**: "The Archive Pulls Me Near", 3 min 8 s, convertido
para `.ogg` e `.mp3`. Substitui a trilha sintetizada.
`tools/make_menu_theme.py` continua no projeto como reserva, agora
gravando em `menu_theme_synth.wav` para não sobrescrever a trilha real.

**Fundo do menu**: passa a usar `bg_archive_closeup` pelo mesmo
resolvedor dos cenários — se o arquivo faltar, fica o gradiente e não há
requisição perdida.

### Ferramentas

- `tools/fix_sprites.py` — remove fundo opaco de sprite. Idempotente.
- `tools/check_sprites.py` — relata modo de cor e alfa em JSON.
- `tools/validate.js` — **442 checagens**, incluindo alfa de todo sprite,
  montagem da barra de leitura sem duplicar, aba de nome preenchida,
  formato do código de transcrição, e o skip parando sozinho na escolha.

---

## 0.4.0 — Integração do design aprovado

Interface do protótipo aprovado transferida para o jogo real. Roteiro,
lógica, saves e estrutura preservados.

### O que veio do protótipo

- Paleta de cinco valores, três durações e duas curvas de easing.
- Vocabulário de animação completo (22 keyframes): traço, selo, tinta,
  página, cortina, luz de vela.
- Cursor de pena em três estados, como SVG embutido.
- Composição assimétrica do menu: barra de classificação, lockup com
  sigilo, navegação em códice com numerais romanos e códigos de registro,
  nota de margem, arco central e astrolábio.
- Caixa de diálogo como registro de arquivo: filete de ouro, código de
  transcrição, escolhas com código e marca de confirmação.

### O que NÃO veio, e por quê

O scaffold **Nocturne** que acompanhava o protótipo (`styles.css`,
`readme.md`, `_ds_manifest.json`, `_ds_bundle.js`,
`_adherence_oxlintrc.json`) não foi importado. Ele carrega Inter por CDN
do Google, usa paleta blurple e componentes genéricos — nada disso é a
identidade aprovada, e o CDN quebraria a execução offline. O protótipo
carregava também os ícones Phosphor por `unpkg`, substituídos por SVG
próprio no `index.html`. Continua valendo: zero dependência externa.

### Portão de abertura

Tela inicial com selo, instrução e poeira. Existe por dois motivos: o
navegador só libera áudio depois de uma interação, e a entrada no arquivo
passa a ser um ato do jogador. Aceita clique, toque, Enter e Espaço;
clique repetido não duplica a transição. Reaparece em sessão nova do
navegador, não ao fechar um painel.

### Trilha e sons

- `menu_theme` — 74 s, ré menor eólio, cordas graves, caixinha de música,
  coro contido, sinos raros. Loop sem emenda audível. Sintetizada em
  `tools/make_menu_theme.py`, só com a biblioteca padrão do Python.
- Sete sons de interface: passagem, confirmação, retorno, página, selo,
  abertura do arquivo, alteração de rota.
- Trilha do menu continua tocando entre Ajustes, Carregar, Galeria e
  Créditos; desce em fade ao entrar no jogo; volta ao sair. Recua de
  volume quando a aba perde o foco, em vez de cortar.
- Todo áudio comprimido para `.ogg` e `.mp3`. O total de áudio caiu de
  8,5 MB (WAV) para 2,4 MB.

### Rotas — ligadas ao estado real

O documento mestre (seção "Rotas e Escolhas") define três eixos:
investigação, relacionamento e moral. Esperança, Perda e Resposta são a
leitura desses eixos.

**Nenhum valor é decorativo.** O delta está declarado em cada opção de
escolha nos arquivos de `js/data/`, e `js/routes.js` só soma o que foi
declarado — nunca infere do texto da opção. Os valores entram no save,
voltam no load, e um save gravado antes das rotas existirem é
reconstruído a partir do registro de escolhas.

O HUD mostra marcas, não barra de vida, e pode ser desligado nos ajustes.
O aviso de alteração sai do próprio símbolo e entra em fila quando duas
rotas mudam na mesma escolha.

### Galeria — desbloqueio por progresso real

Vinte e nove itens em quatro categorias. Nada é liberado para
demonstração: cada entrada tem condição verificada contra o progresso
gravado — cenário visitado, cartão do Arquivo lido, capítulo alcançado ou
concluído, rota atingida. Item bloqueado não mostra nome nem conteúdo.

### Aviso de conteúdo

Tela antes de um jogo novo, com as cinco tags do protótipo. Não sai por
Escape nem por clique no fundo: exige uma escolha. Pode ser desligado em
Ajustes · Conteúdo.

### Mobile-first — o defeito relatado

O palco tinha `width: 1280px; height: 720px` com `max-width/max-height`,
o que produzia a faixa preta e o texto encolhido no canto que apareceram
no telefone. O palco agora preenche a viewport com altura dinâmica
(`100dvh`, com `100vh` de reserva), e todo o CSS foi reescrito partindo
do telefone em retrato.

- Uma escala única (`--rbf-ui`) responde por faixa de tela; nenhum
  componente precisa de media query própria para crescer.
- O menu é coluna única no telefone, duas colunas em paisagem curta e a
  composição assimétrica aprovada a partir de 980 px.
- Alvos de toque de no mínimo 40 px em todo controle.
- Painéis rolam por dentro e cabem na altura da viewport.
- A caixa de texto respeita `env(safe-area-inset-bottom)`.
- Sprites medidos em `vh`, com recorte pela base.
- Elementos decorativos somem quando não há espaço, em vez de espremer.

### Acessibilidade

Botões reais com `type`, nome acessível nos controles abreviados, região
nomeada para o menu, `aria-live` no diálogo, anel de foco próprio,
`aria-disabled` em entrada bloqueada, foco transferido para o primeiro
registro depois da revelação.

Movimento reduzido em duas origens: a preferência do sistema e um ajuste
próprio no jogo.

### Ajustes novos

Volume geral, silenciar, movimento reduzido, HUD de rotas, aviso de
conteúdo, tela cheia. Lista de teclas. Todos persistidos.

### Esconder interface

`Ctrl` ou o botão da barra escondem o cromo para ver a cena. Qualquer
clique ou tecla devolve a interface — e esse clique não avança a cena.

### Correções

- Temporizações fixas em código (portão, transição, espera da escolha)
  foram para `RBF.CONFIG.timing`. Sem isso não era possível testar o
  fluxo, e o ajuste fino exigia editar três arquivos.
- `rbf-hist-line` tinha um valor de cor inválido, herdado da versão
  anterior. Agora há checagem automática de cor malformada no CSS.
- O rótulo de rota na lista de saves vem do estado de rotas quando
  existe, e cai para as flags em save antigo.

### Ferramentas

- `tools/make_menu_theme.py` — sintetiza a trilha do menu.
- `tools/make_sfx.py` — estendido com os sete sons de interface.
- `tools/minidom.js` — ganhou `createElementNS`, `sessionStorage`,
  `focus`, `offsetWidth` e `document.hidden`.
- `tools/validate.js` — 406 checagens, incluindo rotas, galeria, aviso,
  áudio do menu, esconder interface, responsividade e acessibilidade.
  Continua sem `npm install` e sem pacote externo.

### Preservado

Prólogo, Capítulo 1 e Capítulo 2 intactos, incluindo as modificações do
usuário. Execução direta por `file://`, JavaScript clássico, namespace
`RBF`, typewriter, skip, progressão por clique e teclado, manifesto de
assets, crossfade, fallback de asset ausente, 12 espaços de save,
autosave, save rápido, exportar e importar. Nenhum ID de personagem,
cena, capítulo ou chave de armazenamento foi renomeado; saves da 0.3.0
continuam válidos.

---

## 0.3.0 — Capítulo 2 e sistemas de jogo

### Capítulo 2 — O Inventário

Seis cenas: a copa e a regra que ninguém enuncia; Ren como contraponto
normal; a lacuna de dois anos nos livros de conta com numeração contínua;
onze pessoas passando pela porta nordeste sem virar a cabeça; os
registros de família completos dos mesmos dois anos; o volume de anatomia
trocado duas manhãs seguidas.

Escolha "A Lacuna" com três consequências e flags próprias. Beats
condicionais (`if`) leem `archive_seed` do Capítulo 1.

Personagens novos, ambos canônicos: Dara e Ren.

### Sistemas

Tela de título, máquina de estados, 12 espaços de save com autosave e
save rápido, esquema versionado, exportar/importar `.json`, reconstrução
determinística do roteiro, menu de jogo, ajustes persistidos, histórico
de diálogo, componentes reutilizáveis, atalhos de teclado.

### Correções

- Escolha do Capítulo 1 não tinha `id`, o que quebrava a reconstrução do
  roteiro em qualquer save posterior.
- Ren falava antes de aparecer em cena.

---

## 0.2.0 — Refatoração do Prólogo e Capítulo 1

VN monolítica de 1,4 MB dividida em módulos. Manifesto único de assets.
Roteiro separado do renderer.

Bugs corrigidos: skip do typewriter truncava o texto; escolha não gravava
nada; cursor `▼` contaminava a lógica de skip; asset ausente virava ícone
quebrado; espaço rolava a página.

Prólogo e Capítulo 1 reconstruídos em seis cenas cada.
