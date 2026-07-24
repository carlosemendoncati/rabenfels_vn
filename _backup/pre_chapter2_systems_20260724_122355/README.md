# Arquivo Rabenfels — Visual Novel

Prólogo e Capítulo 1, jogáveis. Abre direto no navegador, sem servidor,
sem build, sem framework.

```
index.html    <- abrir este arquivo
```

Avança com clique, `Espaço`, `Enter`, `→` ou `PageDown`.
Escolhas aceitam clique ou as teclas `1` `2` `3`.

---

## Estrutura

```
index.html              marcação; carrega os scripts na ordem correta
css/style.css           apresentação
js/config.js            MANIFESTO — único lugar com caminho de asset
js/assets.js            resolução de caminho e fallback
js/audio.js             BGM e SFX com degradação silenciosa
js/engine.js            renderer; nenhum texto de roteiro aqui
js/data/prologue.js     roteiro do Prólogo — só dados
js/data/chapter1.js     roteiro do Capítulo 1 — só dados
js/main.js              boot; monta o roteiro completo
assets/                 arte e som (ver assets/README.md)
docs/                   documentos canônicos
tools/validate.js       validação automatizada
tools/escape.js         normalização de encoding do roteiro
_backup/                VN monolítica anterior, preservada
```

Separação: **dados de narrativa** (`js/data/`), **manifesto de asset**
(`js/config.js`) e **renderer** (`js/engine.js`) não se misturam. Nenhum
caminho de arquivo aparece no roteiro; nenhum texto de roteiro aparece no
engine.

---

## Tipos de beat

Documentados no topo de `js/engine.js`. Resumo:

| Beat | Efeito |
|---|---|
| `scene` | marca a cena, troca background e trilha |
| `bg` / `bgm` / `sfx` | troca isolada de background, trilha ou efeito |
| `fade_in` / `fade_out` | transição de tela |
| `pause` | espera |
| `spr` / `spr_hide` / `spr_clear` | sprites |
| `nar` / `inn` / `dial` | narração, pensamento, fala |
| `arc` / `last` | cartão do Arquivo, última entrada |
| `title` / `chap` / `end_chap` | cartões de tela cheia |
| `flag` | grava estado |
| `cho` | escolha com ramificação |

### Escolhas

```js
{ t:'cho', prompt:'...', opts:[
  { id:'A', tx:'...', flags:{ ... }, then:[ /* beats */ ] }
]}
```

O bloco `then` é injetado no fluxo logo após a escolha e o roteiro
reconverge no beat seguinte. Nenhum beat fica inalcançável e não existe
grafo de labels para manter.

Estado disponível em `RBF.STATE.flags` para os capítulos futuros.

---

## Adicionar o Capítulo 2

1. Criar `js/data/chapter2.js` no mesmo formato, definindo `RBF.CHAPTER2`.
2. Incluir `<script src="js/data/chapter2.js"></script>` em `index.html`,
   antes de `js/engine.js`.
3. Acrescentar `RBF.CHAPTER2` na lista `parts` em `js/main.js`.
4. Rodar `node tools/validate.js`.

---

## Validação

```bash
npm install jsdom
node tools/validate.js
```

Roda o projeto real em jsdom e verifica:

- arquivos referenciados pelo HTML existem
- todo `getElementById` do engine encontra o elemento
- arquivos de roteiro são ASCII puro
- todo id de background, BGM, SFX, personagem e expressão resolve no manifesto
- todo sprite marcado como `available` existe em disco
- nenhum id de cena duplicado, nenhum beat vazio, nenhum tipo desconhecido
- o typewriter completa no skip em vez de truncar
- os três ramos da escolha chegam ao fim, gravam flags distintas e produzem
  durações diferentes
- progressão por clique e por teclado
- a linha final canônica está preservada

Estado atual: **138 checagens, 0 falhas**.

---

## Encoding

Os arquivos de roteiro são ASCII puro; acentos são escapes `\uXXXX`. Para
escrever com acento normalmente e normalizar depois:

```bash
node tools/escape.js js/data/chapter1.js
```

Para ler com acento (só visualização):

```bash
node tools/escape.js js/data/chapter1.js --decode --stdout
```
