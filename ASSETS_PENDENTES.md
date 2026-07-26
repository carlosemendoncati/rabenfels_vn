# Assets pendentes

Nada aqui bloqueia a execução. Cada item tem fallback ativo. Para ativar:
colocar o arquivo na pasta e trocar `available: false` para `true` na entrada
correspondente de `js/config.js`.

---

## Prontos

| Tipo | Itens |
|---|---|
| Personagens | `aldric` (6), `antoniette` (6), `serafina` (6), `klara` (6), `liara` (6), `matheo` (3) |
| Backgrounds | `bg_prologue_room`, `bg_archive_closeup` |
| BGM | `bgm_prologue`, `bgm_archive`, `bgm_grey_march`, `bgm_nidhaus`, **`bgm_camara`**, **`bgm_amizade`**, **`bgm_agosto`**, **`bgm_epilogo`** |
| Trilha do menu | `menu_theme`, sintetizada em `tools/make_menu_theme.py` |
| SFX | os 6, sintetizados em `tools/make_sfx.py` |
| Sons de interface | os 7, sintetizados em `tools/make_sfx.py` |
| Cursor | SVG embutido em `css/tokens.css`, três estados |
| Sigilo, selo e arco | SVG embutido em `index.html` |

---

## Retratos de ficha — 4 prontos, 4 pendentes

Pasta **`assets/characters/portraits/`** · `.png` · **retrato vertical,
proporção 4:5** (por exemplo 640×800). Enquadramento de busto, fundo
escuro, como retrato a óleo.

São **diferentes dos sprites**. O sprite é o corpo em cena, com expressões.
O retrato é a imagem da ficha na galeria — uma só por personagem, sem
variação, no enquadramento e no acabamento de um quadro pendurado.

**Fallback ativo:** moldura vazia com gradiente. É deliberado e combina com
a obra — a galeria de retratos da casa tem uma moldura vazia no fim da
fila. O jogo não pede desculpa por ainda não ter a arte.

| Ficha | Arquivo | Estado |
|---|---|---|
| Antoniette Vael | `antoniette.png` | **pronto** |
| Matheo Drell | `matheo.png` | **pronto** |
| Serafina Rabenfels | `serafina.png` | **pronto** |
| Aldric Rabenfels | `aldric.png` | **pronto** |
| Klara e Liara | `gemeas.png` | pendente |
| Fenn | `fenn.png` | pendente |
| Dara | `dara.png` | pendente |
| Ren | `ren.png` | pendente |

**Não precisa mexer em `config.js`.** O carregamento do retrato é por
sondagem: se o arquivo existir naquele caminho, ele aparece; se não, fica
a moldura. Basta soltar o `.png` na pasta com o nome exato.

---

## Backgrounds — todos prontos

Pasta `assets/backgrounds/` · `.png` · **1280×720**
Fallback: gradiente CSS calibrado por cena.

| ID lógico | Arquivo esperado | Cena |
|---|---|---|
| `bg_grey_march_road` | `bg_grey_march_road.png` | estrada descendo para o vale |
| `bg_nidhaus_gate` | `bg_nidhaus_gate.png` | portão de ferro e pátio interno |
| `bg_main_hall` | `bg_main_hall.png` | salão de entrada, teto alto, retratos |
| `bg_antoniette_room` | `bg_antoniette_room.png` | quarto com mesa e janela para o pátio |
| `bg_library` | `bg_library.png` | biblioteca de dois andares |
| `bg_corridor` | `bg_corridor.png` | corredor leste, porta entreaberta |
| `bg_portrait_hall` | `bg_portrait_hall.png` | corredor de retratos, nove gerações em ordem, moldura vazia no fim da fila |
| `bg_kitchen` | `bg_kitchen.png` | copa dos empregados, fogo aceso |
| `bg_library_night` | `bg_library_night.png` | biblioteca à noite, luz de vela |

---

## Personagens — 4 pendentes

**Recortados em 26/07/2026** por `tools/recortar_sprites.py`: quatro folhas
de expressões 3×2 viraram 24 sprites com alpha. O fundo foi removido por
**preenchimento a partir da borda**, e não por limiar global de cor —
Klara e Serafina têm cabelo branco, e limiar global comeria o cabelo
junto com o fundo.

| Personagem | Expressões |
|---|---|
| `antoniette` | neutral · warm · away · soft · shaken · guarded |
| `klara` | neutral · side · away · lowered · blank · averted |
| `liara` | neutral · bright · away · sulk · flat · worried |
| `serafina` | neutral · direct · side · intense · smirk · grave |

> **Antoniette está com `available: true` e `onMissing: 'hide'`.** A arte
> existe, mas **nenhum beat do roteiro a mostra em cena** — ela é a câmera.
> Ligar os sprites dela é decisão de direção, não de manifesto.

### Ainda pendentes

Pasta `assets/characters/<personagem>/` · `.png` com alpha
Ancoragem pela base, sem margem inferior.

| ID lógico | Arquivo esperado | Tamanho | Fallback |
|---|---|---|---|
| `fenn_neutral` | `fenn/fenn_neutral.png` | 320×340 bust | silhueta SVG |
| `dara_neutral` | `dara/dara_neutral.png` | 320×340 bust | silhueta SVG |
| `dara_guarded` | `dara/dara_guarded.png` | 320×340 bust | silhueta SVG |
| `ren_neutral` | `ren/ren_neutral.png` | 320×340 bust | silhueta SVG |

Fenn, Dara e Ren continuam com silhueta SVG. Os três aparecem em cena com
frequência — são a próxima prioridade de arte.

---

## BGM — as quatro novas, e onde tocam

Entregues em 26/07/2026. Volume mais baixo que as quatro primeiras: são
faixas gravadas, não sintetizadas por script, e chegam mais quentes.
**Ajustar volume em `RBF.BGM`, nunca no roteiro.**

| Faixa | Onde toca | Loop |
|---|---|---|
| `bgm_camara` | Cap. 5, ao abrir a porta da ala norte. Volta no Cap. 11 | sim |
| `bgm_amizade` | Cap. 6, quando a investigação para. **A única faixa quente da obra** | sim |
| `bgm_agosto` | Cap. 7, entra no pátio e atravessa o afloramento inteiro | **não** |
| `bgm_epilogo` | Epílogo, ainda não escrito | **não** |

`bgm_agosto` e `bgm_epilogo` não repetem de propósito: a primeira termina
em corte seco e a segunda termina sem resolver. Se acabarem antes da
cena, o silêncio serve.

---

## Áudio

Todos os IDs de BGM e SFX têm arquivo. Substituir por gravação ou trilha
definitiva é troca de arquivo, sem mudança de código.

O manifesto lista apenas o que existe em disco: `.mp3` para BGM, `.ogg` e
`.wav` para SFX. Ele chegou a listar `bgm_*.ogg` e `sfx_*.mp3`, que nunca
existiram — o resultado era uma requisição falha por faixa a cada troca de
cena. Ao gerar os `.ogg` de BGM com `ffmpeg`, recoloque-os **antes** do
`.mp3` na lista `files` da entrada correspondente: vence o primeiro que
carregar.

Notas de direção, caso sejam refeitos:

| ID | Intenção |
|---|---|
| `bgm_prologue` | quase silêncio, vento contra vidro |
| `bgm_archive` | câmara em menor, no limiar do audível |
| `bgm_grey_march` | vento e rodas em pedra irregular |
| `bgm_nidhaus` | cravo distante, fonte não localizável |
| `sfx_door` | ferro pesado, **sem rangido** — o roteiro depende disso |
| `sfx_footsteps` | passos lentos e regulares em madeira |

---

## Interface

`assets/ui/` está vazia e sem referência no manifesto. Cursor, sigilo, selo,
arco e astrolábio são SVG embutido — não dependem de arquivo. A pasta fica
reservada para moldura de textbox ou textura de papel, se vierem a existir.

## Fundo do menu principal

`#rf-menu-bg` usa gradiente. Para colocar a fotografia de arquivo da
composição aprovada, defina `background-image` nessa regra em `css/ui.css`
e ponha o arquivo em `assets/backgrounds/`. O gradiente continua por baixo
como reserva.
