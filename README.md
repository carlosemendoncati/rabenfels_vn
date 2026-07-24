# Arquivo Rabenfels — Visual Novel

Prólogo, Capítulo 1 e Capítulo 2, jogáveis. Abre direto no navegador, sem
servidor, sem build, sem framework, sem dependência.

```
index.html    <- abrir este arquivo
```

**Avançar**: clique, `Espaço`, `Enter`, `→` ou `PageDown`.
**Escolher**: clique ou `1` `2` `3`.
**Atalhos**: `Esc` menu · `F5` save rápido · `F9` load rápido · `H` histórico ·
botão direito abre o menu.

---

## Estrutura

```
index.html          carrega os scripts em ordem fixa
css/style.css       palco
css/ui.css          menus, painéis, saves
js/config.js        MANIFESTO — único lugar com caminho de asset
js/storage.js       localStorage, exportar e importar save
js/settings.js      ajustes persistidos
js/state.js         máquina de estados da aplicação
js/assets.js        resolução de caminho e fallback
js/audio.js         BGM com crossfade, SFX, desbloqueio de autoplay
js/history.js       backlog de diálogo
js/data/*.js        roteiro — só dados
js/script.js        montagem determinística do roteiro
js/saves.js         12 espaços manuais, autosave, quicksave
js/engine.js        renderer
js/ui.js            componentes reutilizáveis
js/menu.js          tela de título, menu de jogo, painéis
js/main.js          boot
assets/             arte e som (ver assets/README.md)
docs/               documentos canônicos
tools/              validação e utilitários
.claude/skills/     skill do projeto para assistentes
_backup/            versões anteriores
```

Dados de narrativa, manifesto de asset e renderer não se misturam. Nenhum
caminho de arquivo aparece no roteiro; nenhum texto de roteiro aparece no
engine.

---

## Sistemas

**Tela de título** — Novo Jogo, Continuar, Carregar, Capítulos, Ajustes,
Créditos. O jogo não começa sozinho.

**Save** — 12 espaços manuais, autosave a cada cena, save rápido. Cada espaço
mostra capítulo, cena, trecho de diálogo, data em pt-BR, tempo de jogo e uma
miniatura derivada do background. Exportar e importar como `.json`.

**Ajustes** — máquina de escrever, velocidade e tamanho do texto, volume de
trilha e de efeitos, avanço automático, autosave, confirmação de ações
destrutivas. Tudo persistido.

**Histórico** — backlog de até 400 entradas, com recorte gravado no save.

**Estado** — enquanto um painel está aberto o roteiro não avança, clique no
palco não passa por baixo e o teclado vai para a interface.

---

## Tipos de beat

Documentados no topo de `js/engine.js`.

| Beat | Efeito |
|---|---|
| `scene` | marca a cena, troca background e trilha |
| `bg` / `bgm` / `sfx` | troca isolada |
| `fade_in` / `fade_out` / `pause` | transições |
| `spr` / `spr_hide` / `spr_clear` | sprites |
| `nar` / `inn` / `dial` | narração, pensamento, fala |
| `arc` / `last` | cartão do Arquivo, última entrada |
| `title` / `chap` / `end_chap` | cartões de tela cheia |
| `flag` | grava estado |
| `cho` | escolha com ramificação |

Campo opcional em qualquer beat: `if:{ flag: valor }`. O beat só executa
quando as flags conferem — é assim que o Capítulo 2 reage ao que foi escolhido
no Capítulo 1.

### Escolhas

```js
{ t:'cho', id:'cap2_lacuna', prompt:'A LACUNA', opts:[
  { id:'A', tx:'...', flags:{ ... }, then:[ /* beats */ ] }
]}
```

`then` é injetado logo depois da escolha e o roteiro reconverge no beat
seguinte. A opção escolhida fica em `RBF.STATE.choiceLog`, e
`RBF.Script.build(choiceLog)` reconstrói exatamente o mesmo array no load —
por isso **toda escolha precisa de `id` estável**.

---

## Adicionar um capítulo

1. Criar `js/data/chapterN.js` definindo `RBF.CHAPTERN` dentro de uma IIFE.
2. Registrar em `RBF.CHAPTERS` no `js/config.js`.
3. Incluir a tag `<script>` no `index.html`, antes de `js/script.js`.
4. Adicionar ao manifesto os assets novos.
5. `node tools/escape.js js/data/chapterN.js`
6. `node tools/validate.js`

`main.js` não muda.

---

## Validação

```bash
node tools/validate.js
```

Sem `npm install`, sem jsdom, sem pacote externo. Roda o projeto de verdade em
um DOM mínimo próprio (`tools/minidom.js`) e verifica:

- arquivos e ids referenciados pelo HTML
- sintaxe e codificação ASCII pura de todos os scripts
- CSS com chaves balanceadas e sem cor malformada
- todo id de background, BGM, SFX, personagem e expressão resolvendo no manifesto
- todo asset marcado como `available` existindo em disco
- roteiro sem cena duplicada, beat vazio, tipo desconhecido ou escolha sem id
- typewriter completando no skip em vez de truncar
- três partidas completas até o fim do Capítulo 2, por clique e por teclado
- save, load, autosave, quicksave, esquema, recusa de save inválido
- reconstrução do roteiro pelo registro de escolhas
- estado da interface: painel aberto bloqueia progressão e teclado
- funcionamento com `localStorage` bloqueado

Estado atual: **300 checagens, 0 falhas**.

---

## Utilitários

```bash
node tools/escape.js js/data/x.js                    # normaliza para ASCII puro
node tools/escape.js js/data/x.js --decode --stdout  # lê com acento
python3 tools/make_sfx.py                            # regera os efeitos sonoros
```

Os arquivos de roteiro são ASCII puro; acentos são escapes `\uXXXX`. Escreva
com acento normalmente e rode `escape.js` depois.
