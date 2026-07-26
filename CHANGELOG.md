# Changelog

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
