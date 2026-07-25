# Design

Identidade do protótipo aprovado: códice proibido. Elegante, opressivo,
contido. Nada brilha, nada pulsa em neon, nada preenche uma área grande
com cor saturada.

## Tokens

Tudo em `css/tokens.css`. **Um hex, uma duração ou uma curva escrita
direto em componente é regressão.**

```
--rbf-red      #8c2733   selo, marca de acesso, estado destrutivo
--rbf-red-lit  #b8414f   a mesma cor sob luz: hover, item ativo
--rbf-gold     #b9975b   linha de traço, foco, classificação
--rbf-cold     #7fa6b8   rota Resposta, dado frio
--rbf-paper    #d9d5c8   texto principal

--rbf-void #07080c · --rbf-ground #0b0c12 · --rbf-panel #12131b
--rbf-raised #191b25 · --rbf-line #262936

--rbf-fast 180ms · --rbf-medium 420ms · --rbf-slow 800ms
--rbf-ease-ritual cubic-bezier(.22,1,.36,1)   revelação
--rbf-ease-page   cubic-bezier(.65,0,.35,1)   transição de tela
```

Contraste vem das rampas de escuro, não de saturação. O acento aparece
como **linha e marca**, nunca como fundo chapado.

## Tipografia

Sem webfont — o jogo abre offline. Duas famílias do sistema, papéis fixos:

- `--rbf-font-display` (sans) — cromo de interface: menu, rótulos, códigos.
  Caixa alta, tracking largo, peso leve.
- `--rbf-font-body` (Georgia) — narrativa: diálogo, Arquivo, créditos.

Não misture. Fala de personagem em sans quebra a identidade.

## Animação

Uma metáfora: **páginas, selos, linhas gravadas, tinta e luz de vela
revelam o códice.** 22 keyframes em `css/tokens.css`. Use os que existem
antes de escrever um novo.

- ambiente, contínuo e lento: `rbfDrift` `rbfCandle` `rbfBreath`
  `rbfFlick` `rbfSpin` `rbfShadowPass`
- revelação, uma vez: `rbfTrace` `rbfDraw` `rbfWipe` `rbfWipeUp`
  `rbfRise` `rbfSlip` `rbfInk` `rbfStamp` `rbfSealIn` `rbfPageIn`
- pontuação: `rbfCurtain` `rbfRoute` `rbfPulse` `rbfQuill`

O selo é raro: modal, aviso, confirmação de save, virada de capítulo.
Selo constante deixa de significar.

## Escala e mobile-first

`--rbf-ui` é o único número que muda por faixa de tela. Um componente
mede a partir dele:

```css
padding: calc(11px * var(--rbf-ui));
```

A base do CSS atende **telefone em retrato**. As faixas maiores só
crescem, via `min-width`. `max-width` é exceção declarada: paisagem
curta, elemento decorativo (`.rbf-optional`), telefone estreito.

Regras que o validador cobra:
- palco sem tamanho fixo, altura em `100dvh`
- alvo de toque ≥ 40 px em todo controle
- painel rola por dentro e cabe em `--rbf-vh`
- caixa de texto respeita `env(safe-area-inset-bottom)`

## Componentes

Prefixo `rf-` para o cromo do protótipo (menu, portão, rotas), `rbf-`
para os componentes de painel que já existiam. Evite seletor genérico
(`.panel`, `.item`, `.active`) fora de escopo.

```
rf-gate  rf-topbar  rf-lockup  rf-title  rf-nav  rf-note  rf-art  rf-route
rbf-panel  rbf-modal  rbf-toast  rbf-slot  rbf-row  rbf-toggle  rbf-gal-*
```

## O que não importar

O scaffold **Nocturne** que veio com o protótipo (`styles.css`,
`readme.md`, `_ds_*`, `_adherence_*`) não é a identidade do jogo: paleta
blurple, Inter por CDN do Google, componentes genéricos. O protótipo
também puxava ícones Phosphor por `unpkg`.

O jogo precisa abrir offline e por `file://`. **Zero dependência externa**
— o validador falha se aparecer um `https://` em HTML ou CSS.

## Acessibilidade

- botão de verdade, com `type="button"`
- nome acessível quando o rótulo é abreviado ou só ícone
- anel de foco próprio; nunca o azul do navegador
- `aria-disabled` em entrada bloqueada, não só opacidade
- movimento reduzido em duas origens: preferência do sistema e ajuste do jogo
- rótulo decorativo não substitui nome compreensível: "CONTROLE DE
  LEITURA" pode aparecer, mas o controle continua sendo "Volume da trilha"

## Caixa de diálogo

Estrutura fixa, na ordem: aba de identificação e código de transcrição no
cabeçalho; painel com moldura; barra de leitura por dentro do painel.

- a aba sempre aparece — narração e pensamento têm rótulo próprio, não
  ficam sem identificação
- a marca da aba usa a cor do personagem; vermelha em narração
- o código é posição/total **dentro da cena**, recalculado a cada beat
  porque escolha injeta linhas
- o indicador de avanço é o losango no canto do painel, nunca um
  caractere dentro do texto: `textContent` precisa continuar sendo só a
  fala, senão o skip volta a truncar

## Cursor

Arte própria em `assets/ui/cursors/`, três estados, 32 px, hotspot `1 1`.
Declarado em `css/ui.css` (não em `tokens.css`, que não referencia
asset), dentro de `@media (pointer: fine)` e sempre com o ponteiro do
sistema como última opção da lista.

## Sprites

Todo sprite precisa de canal alfa. Arte com fundo chapado aparece como
bloco sólido sobre a cena — foi um defeito real. Depois de adicionar arte
nova:

```bash
python3 tools/fix_sprites.py
```

Altura tem teto em `vh` e em px. Arte de alta resolução recebe
`res: 'high'` no manifesto e pode ocupar mais tela. Sem isso, um busto de
320 px esticado para 420 fica borrado.

## Armadilhas de layout já cobradas pelo validador

Cada uma chegou à tela antes de virar regra. `tools/validate.js` reprova.

- **`max-width` em `ch` em texto de display.** `ch` mede o algarismo zero,
  mais estreito que as maiúsculas: o título perdia a última letra.
- **`overflow: hidden` numa máscara de revelação.** Corta nos dois eixos.
  Máscara de wipe vertical precisa de `width: max-content`.
- **`minmax(0, 1fr)` numa linha de grid com conteúdo obrigatório.** Ela
  encolhe até zero e o conteúdo transborda por cima da linha seguinte.
  Use `minmax(min-content, 1fr)`.
- **`overflow: hidden` num container de tela cheia.** Texto cortado é pior
  do que menu que rola. Use `overflow-y: auto`.
- **Rótulo curto que pode quebrar em duas linhas** dentro de uma altura
  revelada por transição. `white-space: nowrap` + `text-overflow: ellipsis`.
- **Ilustração medida pela largura** numa linha de altura variável:
  transborda. Meça pela altura e contenha com `overflow: hidden`.
- **Elemento colado no canto** (`top: 10px`): use `clamp()` para o respiro
  acompanhar a tela.
- **Arte que preenche o próprio quadro** aparece como retângulo sobre a
  cena. Máscara de dissolução na base.

Antes de entregar mudança visual, abra `tools/preview.html`.

## Medir, não supor

`node tools/shots.js --open` abre o jogo em Chrome nos oito tamanhos, mede
e grava as imagens em `tools/_shots/`. Antes dele, três rodadas de correção
de layout foram feitas lendo CSS e raciocinando — e as três deixaram
defeitos visíveis passar.

Defeitos que só a medição encontrou:

- **`min-content` numa linha de grid que contém uma lista longa.** A linha
  cresce até a altura cheia da lista e o conteúdo sai da tela. A lista
  precisa de `minmax(0, 1fr)` + `min-height: 0` + `overflow-y: auto`.
- **Cascata invertida.** `@media { .x { display: none } }` antes de
  `.x { display: flex }` não esconde nada: mesma especificidade, a última
  vence.
- **Cromo consumindo a largura do nome.** Linha decorativa e código
  precisam de `flex-shrink: 1` e `min-width: 0` para ceder primeiro.
- **Cortina escura demais.** A fotografia estava carregada e invisível, a
  25 de 255 de brilho médio. Medir o pixel, não confiar no olho sobre
  uma imagem já escura.
- **Animar `scale` numa camada de tela cheia.** Ela ultrapassa o palco e
  cria rolagem lateral. Anime só opacidade.
