# Assets pendentes

Nada aqui bloqueia a execução. Cada item tem fallback ativo. Para ativar um
asset: colocar o arquivo na pasta e trocar `available: false` para `true` na
entrada correspondente de `js/config.js`.

---

## Backgrounds — 8 pendentes

Pasta `assets/backgrounds/` · formato `.jpg` · **1280×720**
Fallback atual: gradiente CSS calibrado por cena.

| ID lógico | Arquivo esperado |
|---|---|
| `bg_prologue_room` | `bg_prologue_room.jpg` |
| `bg_archive_closeup` | `bg_archive_closeup.jpg` |
| `bg_grey_march_road` | `bg_grey_march_road.jpg` |
| `bg_nidhaus_gate` | `bg_nidhaus_gate.jpg` |
| `bg_main_hall` | `bg_main_hall.jpg` |
| `bg_antoniette_room` | `bg_antoniette_room.jpg` |
| `bg_library` | `bg_library.jpg` |
| `bg_corridor` | `bg_corridor.jpg` |

---

## Personagens — 7 pendentes

Pasta `assets/characters/<personagem>/` · formato `.png` com alpha · **320×340**
Ancoragem pela base, sem margem inferior.

| ID lógico | Arquivo esperado | Fallback |
|---|---|---|
| `matheo_neutral` | `matheo/matheo_neutral.png` | silhueta SVG |
| `matheo_read` | `matheo/matheo_read.png` | silhueta SVG |
| `matheo_hollow` | `matheo/matheo_hollow.png` | silhueta SVG |
| `fenn_neutral` | `fenn/fenn_neutral.png` | silhueta SVG |
| `antoniette_neutral` | `antoniette/antoniette_neutral.png` | sprite oculto |
| `antoniette_observe` | `antoniette/antoniette_observe.png` | sprite oculto |
| `antoniette_guarded` | `antoniette/antoniette_guarded.png` | sprite oculto |

Os três de Antoniette não são usados no Capítulo 1 — ela é o ponto de vista.
Ficam previstos no manifesto para capítulos futuros.

**Prontos:** `aldric` (6 expressões), `serafina` (5), `klara` (1), `liara` (1).

---

## BGM — 4 pendentes

Pasta `assets/audio/bgm/` · `.ogg` preferencial, `.mp3` como alternativa · loop
sem emenda audível.
Fallback atual: silêncio.

| ID lógico | Arquivos esperados |
|---|---|
| `bgm_prologue` | `bgm_prologue.ogg` · `bgm_prologue.mp3` |
| `bgm_archive` | `bgm_archive.ogg` · `bgm_archive.mp3` |
| `bgm_grey_march` | `bgm_grey_march.ogg` · `bgm_grey_march.mp3` |
| `bgm_nidhaus` | `bgm_nidhaus.ogg` · `bgm_nidhaus.mp3` |

---

## SFX — 6 pendentes

Pasta `assets/audio/sfx/` · `.ogg` preferencial, `.mp3` como alternativa.
Fallback atual: efeito ignorado.

| ID lógico | Arquivos esperados |
|---|---|
| `sfx_package` | `sfx_package.ogg` · `sfx_package.mp3` |
| `sfx_page_turn` | `sfx_page_turn.ogg` · `sfx_page_turn.mp3` |
| `sfx_candle` | `sfx_candle.ogg` · `sfx_candle.mp3` |
| `sfx_door` | `sfx_door.ogg` · `sfx_door.mp3` |
| `sfx_footsteps` | `sfx_footsteps.ogg` · `sfx_footsteps.mp3` |
| `sfx_wind` | `sfx_wind.ogg` · `sfx_wind.mp3` |

Notas de direção para os efeitos estão em `assets/README.md`.

---

## Interface

`assets/ui/` está vazia e sem referência no manifesto. Reservada para
moldura de textbox, ícones e ponteiro customizado, se vierem a existir.
