# Changelog

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
