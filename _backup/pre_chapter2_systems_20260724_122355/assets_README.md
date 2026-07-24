# Assets — Arquivo Rabenfels

Nenhum asset é obrigatório. A VN roda inteira sem um único arquivo de
imagem ou som: backgrounds caem em gradiente CSS, personagens caem em
silhueta SVG gerada em runtime, áudio ausente vira silêncio.

---

## Como adicionar um asset real

1. Coloque o arquivo na pasta indicada abaixo, com o nome exato.
2. Abra `js/config.js` e troque `available: false` para `available: true`
   na entrada correspondente.

Só isso. Nenhum caminho de arquivo aparece no roteiro ou no engine —
`js/config.js` é o único lugar onde caminho de asset existe.

Enquanto `available` for `false`, o engine **não faz requisição de rede**
para aquele asset. Isso evita 404 no console antes da arte existir.

---

## Convenção de nomes

```
<tipo>_<contexto>[_<variante>].<ext>
```

- minúsculas, sem acento, sem espaço, separador `_`
- background: prefixo `bg_`
- personagem: prefixo com o nome do personagem
- música: prefixo `bgm_`
- efeito: prefixo `sfx_`

---

## Backgrounds

`assets/backgrounds/` — **1280×720**, `.jpg` (ou `.png` se precisar de alpha)

| ID lógico | Arquivo esperado | Cena |
|---|---|---|
| `bg_prologue_room` | `bg_prologue_room.jpg` | Escritório de Matheo, fim de tarde e noite |
| `bg_archive_closeup` | `bg_archive_closeup.jpg` | Close nas páginas do Arquivo sobre a mesa |
| `bg_grey_march_road` | `bg_grey_march_road.jpg` | Estrada descendo para o vale, Nidhaus ao fundo |
| `bg_nidhaus_gate` | `bg_nidhaus_gate.jpg` | Portão de ferro preto e pátio interno |
| `bg_main_hall` | `bg_main_hall.jpg` | Salão de entrada, teto alto, retratos |
| `bg_antoniette_room` | `bg_antoniette_room.jpg` | Quarto com mesa de trabalho e janela para o pátio |
| `bg_library` | `bg_library.jpg` | Biblioteca de dois andares |
| `bg_corridor` | `bg_corridor.jpg` | Corredor leste, porta entreaberta ao fundo |

`bg_black` é interno (preto sólido), não precisa de arquivo.

**Fallback:** cada background tem um gradiente CSS em `js/config.js` que já
está calibrado para a cena. O gradiente é aplicado sempre e a imagem só
entra por cima depois de carregar — não existe flicker nem tela vazia.

---

## Personagens

`assets/characters/<personagem>/` — `.png` com transparência

Dois tamanhos, conforme o campo `size` em `js/config.js`:

- `bust` — **320×340**, enquadramento do peito para cima
- `full` — **150×600**, corpo inteiro (usado nas gêmeas)

O sprite é ancorado pela base. Deixe o personagem encostado na borda
inferior do canvas, sem margem.

### Já existentes

| Personagem | Expressões | Situação |
|---|---|---|
| `aldric` | `cold`, `side`, `back`, `intense`, `fangs`, `stare` | pronto (320×340) |
| `serafina` | `neutral`, `direct`, `side`, `smirk`, `intense` | pronto (320×340) |
| `klara` | `neutral` | pronto (150×600) |
| `liara` | `neutral` | pronto (150×600) |

### Pendentes

| Personagem | Arquivo esperado | Tamanho | Uso |
|---|---|---|---|
| `matheo` | `matheo_neutral.png` | 320×340 bust | Prólogo, recebe o pacote |
| `matheo` | `matheo_read.png` | 320×340 bust | Lendo, ainda no controle |
| `matheo` | `matheo_hollow.png` | 320×340 bust | Última entrada; nem choro nem raiva |
| `fenn` | `fenn_neutral.png` | 320×340 bust | Portão e pátio |
| `antoniette` | `antoniette_neutral.png` | 320×340 bust | opcional — ver nota |
| `antoniette` | `antoniette_observe.png` | 320×340 bust | opcional |
| `antoniette` | `antoniette_guarded.png` | 320×340 bust | opcional |

**Nota sobre Antoniette:** ela é a câmera do Capítulo 1. O roteiro dá a ela
nameplate e falas, mas nenhum beat de sprite — por isso `onMissing: 'hide'`.
Os arquivos ficam previstos no manifesto caso um capítulo futuro precise
mostrá-la (espelho, retrato, cena com outro ponto de vista).

**Fallback:** expressão inexistente cai para `fallbackExpression` sem erro.
Personagem sem arquivo vira silhueta SVG com a inicial do nome
(`onMissing: 'placeholder'`) ou some (`onMissing: 'hide'`).

---

## Áudio

`.ogg` como primeira opção, `.mp3` como segundo candidato. O engine testa
na ordem e usa o primeiro que carregar. Se nenhum carregar, silêncio.

### BGM — `assets/audio/bgm/`, em loop

| ID lógico | Arquivos | Intenção |
|---|---|---|
| `bgm_prologue` | `bgm_prologue.ogg` / `.mp3` | Quase silêncio. Vento contra vidro. |
| `bgm_archive` | `bgm_archive.ogg` / `.mp3` | Câmara em menor, no limiar do audível |
| `bgm_grey_march` | `bgm_grey_march.ogg` / `.mp3` | Vento e rodas em pedra irregular |
| `bgm_nidhaus` | `bgm_nidhaus.ogg` / `.mp3` | Cravo distante, fonte não localizável |

O loop precisa fechar sem emenda audível. O crossfade padrão é de 900 ms
(`CONFIG.audio.fadeMs`).

### SFX — `assets/audio/sfx/`, disparo único

| ID lógico | Arquivos | Onde entra |
|---|---|---|
| `sfx_package` | `sfx_package.ogg` / `.mp3` | Pacote pousando na mesa. Discreto, com peso. |
| `sfx_page_turn` | `sfx_page_turn.ogg` / `.mp3` | Página virada |
| `sfx_candle` | `sfx_candle.ogg` / `.mp3` | Vela apagando |
| `sfx_door` | `sfx_door.ogg` / `.mp3` | Portão de ferro, **sem rangido** |
| `sfx_footsteps` | `sfx_footsteps.ogg` / `.mp3` | Passos lentos e regulares em madeira |
| `sfx_wind` | `sfx_wind.ogg` / `.mp3` | Vento na estrada |

**Política de autoplay:** nada toca antes da primeira interação do usuário.
`RBF.Audio.unlock()` é chamado no primeiro clique ou tecla. Uma BGM pedida
antes disso fica pendente e entra sozinha no desbloqueio.

---

## Volumes

Ajuste fino por faixa fica em `js/config.js`, campo `volume` de cada
entrada (0 a 1). Os multiplicadores globais são
`CONFIG.audio.bgmVolume` e `CONFIG.audio.sfxVolume`.

---

## Diagnóstico

Com o projeto aberto no navegador, no console:

```js
RBF.Assets.report()   // lista os ids que caíram em fallback
RBF.CONFIG.debug = true   // passa a avisar cada asset ausente (uma vez cada)
```
