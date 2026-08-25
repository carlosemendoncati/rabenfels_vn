# A Cobertura — procedência dos assets

Tudo em `assets/cobertura/` é **derivado**, e nenhum arquivo aqui é
original: o material bruto vive em `assets/A Cobertura/` e é recortado
por `tools/cobertura_assets.py`. Apagar esta pasta inteira e rodar a
ferramenta de novo reconstrói o mesmo resultado.

```bash
python tools/cobertura_assets.py             # tudo
python tools/cobertura_assets.py --sem-audio # só imagem
```

---

## Imagem

| saída | origem | licença |
|---|---|---|
| `maps/*` · `props/*` · `chars/*` · `faces/*` · `icons/*` | arte gerada e entregue pelo autor em 24/08/2026 | do autor |
| `tiles/interior.png` | `Inside_C.png`, tileset de interior no formato RPG Maker | **procedência não declarada — ver abaixo** |

O que a ferramenta faz com elas: tira o fundo (xadrez de falsa
transparência ou preto com halo), fatia as folhas 3×4 e a grade de
ícones, ancora cada quadro no rodapé e reduz para a medida de jogo.

### `tiles/interior.png` — pendência

O arquivo chegou como `Inside_C.png`, sem licença e sem nome de autor. O
formato e a nomenclatura são de tileset de RPG Maker, e o nome `Inside_C`
é o de um recurso que acompanha o próprio programa — o que, se for o
caso, **restringe o uso a projetos feitos no RPG Maker**, e este não é.

Ele está copiado para cá mas **não é referenciado por nenhuma sala**:
`RBF.COBERTURA` não tem entrada para tileset, e as salas usam as imagens
inteiras de `maps/`. Nada quebra se o arquivo for apagado.

Antes de usá-lo, confirmar de onde veio.

---

## Pixel art

Todo o material de imagem passa por um porte do algoritmo de
**[pixelit](https://github.com/giventofly/pixelit)**, de José Moreira —
licença MIT. O porte vive em `tools/cobertura_pixel.py` e reimplementa
`pixelate()` e `convertPalette()` em Python; nenhum código do original é
distribuído aqui.

O recorte antes do degrau fica em `_sem_pixel/`. Apagar essa pasta e
rodar `cobertura_assets.py` de novo reconstrói tudo.

## Áudio

| saída | origem | licença |
|---|---|---|
| `audio/bgm/cob_*.mp3` | **Uneasy Melodies v1**, de Serotone (Sebastian Petrei) | uso livre, inclusive comercial |
| `audio/sfx/cob_achado`, `cob_destranca`, `cob_notada` | idem | idem |
| `audio/sfx/cob_marca`, `cob_anota` | **Fantasy UI SFX**, de Atelier Magicae (Ririsaurus / Riri Hinasaki) | uso livre; **não redistribuir como pacote** |

Crédito opcional nos dois casos, e os dois pedem o mesmo: não revender
os arquivos como pacote de assets. Embutir num jogo é exatamente o uso
previsto.

Sugestão de linha para os créditos do jogo:

> Música e efeitos: Serotone (Sebastian Petrei) — serotone.itch.io
> Efeitos de interface: Atelier Magicae

### O que os efeitos são

Os dois vindos do Fantasy UI SFX foram escolhidos por duração, não por
audição — os arquivos de origem se chamam `Fantasy_UI (60).wav` e
`Piano_Ui (2).wav`, e o pacote tem 113 sons sem nome descritivo. Se o som
estiver errado, é trocar o número em `EFEITOS`, no topo de
`tools/cobertura_assets.py`, e rodar de novo.

---

## tabletopaudio.com — **não importado, de propósito**

`assets/A Cobertura/httpstabletopaudio.com.txt` aponta para
[tabletopaudio.com](https://tabletopaudio.com). O site foi consultado em
25/08/2026 e as faixas de dez minutos estão sob
**Creative Commons BY-NC-ND 4.0**. Três consequências:

- **NC** — proíbe uso comercial. Se *Arquivo Rabenfels* algum dia for
  vendido, essas faixas precisam sair.
- **ND** — proíbe obra derivada. Cortar, montar em laço ou encurtar uma
  faixa para caber numa sala é exatamente o que a cláusula veda.
- **BY** — exige atribuição nominal.

Todo o resto do áudio do projeto é livre para uso comercial, e misturar
uma licença NC-ND no meio contamina o pacote inteiro com uma restrição
que nenhum outro arquivo tem. Por isso nada foi baixado de lá.

O site oferece licença comercial por acordo direto: `gm@tabletopaudio.com`.
Se o autor fechar esse acordo, ou se o projeto for e continuar sendo
não-comercial, é decisão dele — e aí basta dizer, que as faixas entram
pelo mesmo caminho das outras.

---

## Não usado

Da pasta bruta, ficou de fora:

- **`Fantasy UI SFX`** — 111 dos 113 sons. São de fantasia luminosa
  (sinos, harpa, magia) e o jogo já tem `ui_hover`, `ui_confirm`,
  `ui_back`, `ui_page` e `ui_seal` no registro seco que a obra usa.
- **`horror_forest_explore.wav`** — o percurso é todo interior.
- **`horror_menu_loop.wav`** — o menu já tem *O Arquivo Me Chamou*,
  entregue pelo autor em 27/07/2026.
- **`Daily RPG Maker News Spreadsheet`** — é um índice de fontes de
  asset, não um asset. Fica onde está, como referência.
