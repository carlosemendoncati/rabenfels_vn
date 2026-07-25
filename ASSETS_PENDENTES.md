# Assets pendentes

Nada aqui bloqueia a execução. Cada item tem fallback ativo. Para ativar:
colocar o arquivo na pasta e trocar `available: false` para `true` na entrada
correspondente de `js/config.js`.

---

## Prontos

| Tipo | Itens |
|---|---|
| Personagens | `aldric` (6 expressões), `serafina` (5), `matheo` (3), `klara`, `liara` |
| Backgrounds | `bg_prologue_room`, `bg_archive_closeup` |
| BGM | `bgm_prologue`, `bgm_archive`, `bgm_grey_march`, `bgm_nidhaus` |
| Trilha do menu | `menu_theme`, sintetizada em `tools/make_menu_theme.py` |
| SFX | os 6, sintetizados em `tools/make_sfx.py` |
| Sons de interface | os 7, sintetizados em `tools/make_sfx.py` |
| Cursor | SVG embutido em `css/tokens.css`, três estados |
| Sigilo, selo e arco | SVG embutido em `index.html` |

---

## Backgrounds — 8 pendentes

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
| `bg_kitchen` | `bg_kitchen.png` | copa dos empregados, fogo aceso |
| `bg_library_night` | `bg_library_night.png` | biblioteca à noite, luz de vela |

---

## Personagens — 6 pendentes

Pasta `assets/characters/<personagem>/` · `.png` com alpha
Ancoragem pela base, sem margem inferior.

| ID lógico | Arquivo esperado | Tamanho | Fallback |
|---|---|---|---|
| `fenn_neutral` | `fenn/fenn_neutral.png` | 320×340 bust | silhueta SVG |
| `dara_neutral` | `dara/dara_neutral.png` | 320×340 bust | silhueta SVG |
| `dara_guarded` | `dara/dara_guarded.png` | 320×340 bust | silhueta SVG |
| `ren_neutral` | `ren/ren_neutral.png` | 320×340 bust | silhueta SVG |
| `antoniette_neutral` | `antoniette/antoniette_neutral.png` | 320×340 bust | sprite oculto |
| `antoniette_observe` | `antoniette/antoniette_observe.png` | 320×340 bust | sprite oculto |
| `antoniette_guarded` | `antoniette/antoniette_guarded.png` | 320×340 bust | sprite oculto |

Antoniette é o ponto de vista e não tem beat de sprite em nenhum capítulo
escrito até aqui. Os arquivos ficam previstos no manifesto para uso futuro.

---

## Áudio

Todos os IDs de BGM e SFX têm arquivo. Substituir por gravação ou trilha
definitiva é troca de arquivo, sem mudança de código.

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
