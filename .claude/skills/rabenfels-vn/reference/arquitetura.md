# Arquitetura

## Mapa dos módulos

```
index.html         marcação e formas SVG; carrega os scripts nesta ordem
css/tokens.css     TOKENS — cor, movimento, cursor, keyframes, escala
css/style.css      palco
css/ui.css         portão, menu, painéis, saves, galeria
js/config.js       MANIFESTO — único lugar com caminho de asset
js/storage.js      localStorage, exportar e importar
js/settings.js     ajustes persistidos
js/state.js        máquina de estados da aplicação
js/assets.js       resolução de caminho e fallback
js/audio.js        BGM com crossfade, SFX, desbloqueio de autoplay
js/history.js      backlog de diálogo
js/routes.js       Esperança, Perda e Resposta
js/gallery.js      desbloqueio por progresso real
js/data/*.js       roteiro — só dados
js/script.js       montagem determinística do roteiro
js/saves.js        esquema de save, 12 espaços, autosave, quicksave
js/engine.js       renderer
js/ui.js           componentes reutilizáveis
js/menu.js         portão de abertura, menu principal, painéis
js/main.js         boot
```

Dados de narrativa, manifesto de asset e renderer não se misturam. Nenhum
caminho de arquivo aparece no roteiro; nenhum texto de roteiro aparece no
engine.

## Tipos de beat

```js
{ t:'scene', id, chapter, title, bg, bgm, sfx }
{ t:'fade_in' } / { t:'fade_out' } / { t:'pause', ms }
{ t:'bg', id } / { t:'bgm', id } / { t:'sfx', id }
{ t:'spr', ch, ex, pos } / { t:'spr_hide', ch } / { t:'spr_clear' }
{ t:'nar', tx } / { t:'inn', tx } / { t:'dial', ch, tx }
{ t:'arc', lns, label } / { t:'last', lns }
{ t:'title', main, sub, time }
{ t:'chap', num, name, chapter }
{ t:'end_chap', line1, line2, chapter }
{ t:'flag', set:{} }
{ t:'cho', id, code, prompt, opts:[ { id, tx, flags, routes, then:[] } ] }
```

Campo opcional em qualquer beat: `if:{ flag: valor }`. O beat só executa
quando todas as flags conferem. É assim que capítulos posteriores reagem a
escolhas anteriores.

`pos` aceita `left`, `center`, `right`.

## Escolhas e save

`then` é injetado no fluxo logo depois da escolha; o roteiro reconverge no beat
seguinte. A opção escolhida fica em `RBF.STATE.choiceLog[idDaEscolha]`.

No load, `RBF.Script.build(choiceLog)` reconstrói exatamente o mesmo array,
o que mantém o `beatIndex` do save válido. **Por isso toda escolha precisa de
`id` estável.** Sem `id` nada é registrado e o índice do save aponta para o
lugar errado.

## Adicionar um capítulo

1. Criar `js/data/chapterN.js` definindo `RBF.CHAPTERN`, dentro de uma IIFE.
2. Registrar em `RBF.CHAPTERS` no `js/config.js`: `id`, `data`, `label`,
   `title`.
3. Incluir a tag `<script>` no `index.html`, antes de `js/script.js`.
4. Adicionar backgrounds, personagens e sfx novos ao manifesto.
5. `node tools/escape.js js/data/chapterN.js` — ou `python tools/escape.py …`
6. `node tools/validate.js` — ou `python tools/validate.py`
7. `tools/smoke.html` até dar `SMOKE-OK`

O `main.js` não muda.

## Assets

Campo `available` por asset. Enquanto `false`, o engine não faz requisição de
rede e usa fallback: gradiente CSS para background, silhueta SVG para
personagem, silêncio para áudio. Coloque o arquivo na pasta e mude para `true`.

Dimensões: background 1280x720; sprite `bust` 320x340; sprite `full` 150x600.
Áudio: `.wav` e `.ogg` antes de `.mp3`, o primeiro que carregar vence.

## Rotas

Três eixos, do documento mestre: investigação, relacionamento e moral.
Lidos como Esperança, Perda e Resposta.

O valor vem **apenas** do campo `routes` declarado em cada opção de
escolha. `js/routes.js` soma o declarado e nada mais. Isso é o que
mantém o HUD ligado ao estado real em vez de decorativo.

```js
{ id:'C', tx:'...', flags:{ archive_seed:true }, routes:{ answer:1, hope:1 }, then:[...] }
```

As rotas entram no save. Um save sem elas é reconstruído percorrendo o
roteiro com o `choiceLog`.

## Galeria

Catálogo declarativo em `js/gallery.js`. Cada item tem uma condição:

```
bg:<id>       cenário visitado
arc:<chave>   cartão do Arquivo lido   (o beat precisa de `key:`)
chapter:<id>  capítulo alcançado
done:<id>     capítulo concluído
route:<id>:<n> rota atingiu o valor
```

O engine grava o que foi visto durante a partida. Item novo = uma linha
no catálogo.

## Ferramentas

```bash
node tools/validate.js                 # o mais completo; exige Node
node tools/escape.js js/data/x.js      # normaliza para ASCII puro
node tools/escape.js js/data/x.js --decode --stdout   # lê com acento

# sem Node — a máquina do projeto às vezes não tem
python tools/validate.py               # 1847 checagens estáticas
python tools/escape.py js/data/x.js    # mesmo comportamento do escape.js

# o jogo jogando sozinho: três partidas, save, load, rotas e galeria
msedge --headless=new --virtual-time-budget=90000 --dump-dom tools/smoke.html
python3 tools/make_sfx.py              # regera efeitos e sons de interface
python3 tools/make_menu_theme.py       # regera a trilha do menu
```

`tools/minidom.js` é um DOM mínimo escrito à mão para o validador. Não é
navegador: não faz layout, não carrega imagem, não toca som. Serve para testar
fluxo, estado, roteiro e integridade.

---

## Escolha: o botao carrega o id da opcao

A ordem de **exibicao** das opcoes e embaralhada entre capitulos de
proposito. Com a opcao C sempre por ultimo, o jogador aprendia em dois
capitulos a clicar na ultima e ia direto ao final verdadeiro.

O engine poe `data-option="A|B|C"` em cada botao. **Quem precisa saber qual
opcao e - `tools/validate.js`, `tools/smoke.html`, e qualquer ferramenta
futura - le dali, nunca da posicao.**

```js
var at = botoes.length - 1;
for (var k = 0; k < botoes.length; k++) {
  if (botoes[k].getAttribute('data-option') === 'C') { at = k; break; }
}
```

## Ficha de personagem com revelacao progressiva

Em `js/gallery.js`, item de `cat: 'char'` usa `entries[]` no lugar de
`text`. Cada entrada tem condicao propria:

```js
{ id: 'ch_matheo', cat: 'char', name: 'Matheo Drell',
  need: 'chapter:prologo', portrait: 'matheo.png', entries: [
  { need: 'chapter:prologo', tx: '...' },
  { need: 'arc:ultima',      tx: '...' },
  { need: 'done:prologo',    tx: '...' }
]}
```

- `need` do item decide se a **ficha aparece** na galeria.
- `need` de cada entrada decide se **aquela linha** aparece.
- As que faltam sao mostradas como `[ sem entrada ate esta data ]`, com
  contador no rodape. O jogador sabe que ha mais e volta.

**Armadilha ja corrigida:** `items()` derivava a miniatura de
`need.indexOf('bg:')`. Como varias fichas destravam por cenario, Serafina
aparecia como o salao e Aldric como a biblioteca. A condicao agora exige
`cat === 'cg'`.

**Retrato** vem de `assets/characters/portraits/<nome>.png`, por sondagem:
existe o arquivo, aparece; nao existe, fica a moldura vazia. **Nao passa
pelo `config.js`.**

## Medidor de rota

Mostrador radial: anel de trilha, arco com `stroke-dasharray`, simbolo no
centro. Substituiu a fileira de cinco tracinhos, que saturava no terceiro
capitulo.

**O teto vive em `RBF.ROUTES` e em nenhum outro lugar.** Hoje 20. Mudar la
muda o medidor, os limiares da galeria e nada mais.
