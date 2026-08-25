# Arquivo Rabenfels — Visual Novel

Obra completa com tronco comum, quatro rotas e Epílogo. Abre direto no
navegador, sem servidor, sem build, sem framework e sem dependência externa.

```
index.html    <- abrir este arquivo
```

**Abrir o arquivo**: clique, toque, Enter ou Espaço na tela inicial.
**Avançar**: clique, `Espaço`, `Enter`, `→`, `PageDown`.
**Escolher**: clique ou `1` `2` `3`.
**Atalhos**: `Esc` menu · `H` histórico · `A` auto · `Ctrl` skip ·
`F5` save rápido · `F9` load rápido · botão direito abre o menu.
No menu principal, setas percorrem os registros e Enter abre.

---

## Estrutura

```
index.html          marcação e formas SVG reaproveitadas
css/tokens.css      TOKENS — cor, movimento, cursor, keyframes, escala
css/style.css       palco: fundo, sprites, diálogo, escolhas
css/ui.css          interface: portão, menu, painéis, saves, galeria
js/config.js        MANIFESTO — único lugar com caminho de asset
js/storage.js       localStorage, exportar e importar
js/settings.js      ajustes persistidos
js/state.js         máquina de estados da aplicação
js/assets.js        resolução de caminho e fallback
js/audio.js         BGM, SFX, trilha do menu, sons de interface
js/history.js       backlog de diálogo
js/routes.js        Esperança, Perda e Resposta a partir das escolhas
js/data/*.js        roteiro — só dados (11 capítulos de rota)
js/script.js        montagem determinística do roteiro
js/saves.js         12 espaços, autosave, save rápido
js/gallery.js       desbloqueio por progresso real
js/paginas.js       As Quatro Páginas e o laudo de cada leitura
js/arvore.js        a árvore de escolhas e o mapa dos quatro finais
js/engine.js        renderer
js/ui.js            componentes reutilizáveis
js/menu.js          portão, menu principal, painéis
js/main.js          boot
assets/             arte e som (ver assets/README.md)
docs/               documentos canônicos
tools/              validação e utilitários
.agents/skills/     skill do projeto para assistentes
```

Três camadas que não se misturam: **dados de narrativa** (`js/data/`),
**manifesto de asset** (`js/config.js`) e **renderer** (`js/engine.js`).
Nenhum caminho de arquivo aparece no roteiro; nenhum texto de roteiro
aparece no engine; nenhum valor de cor ou duração aparece fora de
`css/tokens.css`.

---

## Design

A identidade vem do protótipo aprovado: códice proibido, paleta de cinco
valores, tipografia de sistema em dois papéis (sans para o cromo, serifa
para a narrativa), acento como linha e marca, nunca como área chapada.

Todo movimento sai de um vocabulário único — traço, selo, tinta, página,
cortina, luz de vela — declarado em `css/tokens.css`.

O scaffold Nocturne que acompanhava o protótipo não foi importado: carrega
fonte por CDN e usa paleta que não é a do jogo. Detalhes no `CHANGELOG.md`.

---

## Sistemas

**Portão de abertura** — o jogo não começa sozinho. A primeira interação
libera o áudio do navegador e abre o arquivo.

**Menu principal** — composição assimétrica: barra de classificação,
lockup com sigilo, navegação em códice com numerais romanos e códigos de
registro, nota de margem contextual.

**Save** — 12 espaços manuais, autosave por cena, save rápido. Cada
espaço mostra capítulo, cena, trecho, data em pt-BR, tempo de jogo, rota
dominante e miniatura. Exportar e importar `.json`.

**Rotas** — Esperança, Perda e Resposta. Os valores vêm exclusivamente do
delta declarado em cada opção de escolha. Entram no save e são
reconstruídos a partir do registro de escolhas quando faltam.

**Galeria** — 29 itens em quatro categorias, liberados por progresso
real: cenário visitado, cartão do Arquivo lido, capítulo concluído, rota
atingida.

**Aviso de conteúdo** — antes de um jogo novo, com escolha obrigatória.
Desligável em Ajustes.

**Caixa de diálogo** — aba de identificação, painel com moldura, código
de transcrição posição/total, e a barra de leitura por dentro do painel:
Histórico, Auto, Skip, Save, Load, Ajustes, Ocultar.

**Ajustes** — volume geral, trilha, efeitos, silenciar, máquina de
escrever, velocidade, tamanho do texto, avanço automático, movimento
reduzido, HUD de rotas, tela cheia, aviso de conteúdo, autosave,
confirmações.

---

## Mobile

Escrito partindo do telefone em retrato. Uma escala única (`--rbf-ui`)
responde por faixa de tela, então nenhum componente precisa de media
query própria para crescer.

| Faixa | Menu |
|---|---|
| telefone retrato | coluna única, rolagem interna |
| telefone paisagem | duas colunas, cromo comprimido |
| ≥ 980 px | composição assimétrica aprovada |

O palco preenche a viewport com altura dinâmica (`100dvh`), respeita a
área segura do aparelho e mede sprites em `vh`. Alvos de toque de no
mínimo 40 px.

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

Campo opcional em qualquer beat: `if:{ flag: valor }`.

### Escolhas

```js
{ t:'cho', id:'cap2_lacuna', code:'DEP', prompt:'A LACUNA', opts:[
  { id:'A', tx:'...', flags:{ ... }, routes:{ loss: 1 }, then:[ /* beats */ ] }
]}
```

`then` é injetado logo depois da escolha e o roteiro reconverge no beat
seguinte. **Toda escolha precisa de `id` estável** — é ele que permite
reconstruir o mesmo array no load.

`routes` é o único lugar onde uma escolha move uma rota. O sistema nunca
infere efeito a partir do texto da opção.

---

## Adicionar um capítulo

1. Criar `js/data/chapterN.js` definindo `RBF.CHAPTERN` dentro de uma IIFE.
2. Registrar em `RBF.CHAPTERS` no `js/config.js`, com `id`, `code`,
   `data`, `label` e `title`.
3. Incluir a tag `<script>` no `index.html`, antes de `js/script.js`.
4. Adicionar ao manifesto os assets novos e à galeria os itens novos.
5. `node tools/escape.js js/data/chapterN.js` — ou `python tools/escape.py …`
6. `node tools/validate.js` — ou `python tools/validate.py`
7. Abrir `tools/smoke.html` no navegador e conferir `SMOKE-OK`.

`main.js` não muda.

---

## Validação

Sete ferramentas, duas delas independentes do Node. A escolha depende do
que a máquina tem instalado — só `shots.js` e `shot_arvore.js` precisam do
pacote `playwright` e de um Chrome no disco; sem eles avisam e saem com
código 0, porque são conferência e não requisito para o jogo rodar.

```bash
# com Node
node tools/validate.js          # estrutura, estado, roteiro, save, entrada
node tools/rotas.js             # distribuição das rotas nas 59.049 combinações
node tools/finais.js            # as quatro rotas, e o transcript com --dump
node tools/arvore.js            # a árvore: anotação vs roteiro, e a tela
node tools/shots.js --open      # geometria em navegador de verdade
node tools/shot_arvore.js       # a árvore em Chrome, em quatro tamanhos

# sem Node
python tools/validate.py        # dados, manifesto, roteiro, galeria
```

E o jogo jogando sozinho, que só precisa de um navegador:

```bash
msedge --headless=new --virtual-time-budget=90000 --dump-dom tools/smoke.html
```

`tools/smoke.html` carrega o jogo inteiro, joga do primeiro beat ao último
uma vez por ramo de escolha e confere capítulo alcançado, capítulo
concluído, divergência entre ramos, save, load e galeria. Aberto no
navegador, mostra o relatório na tela. Em modo headless, procure por
`SMOKE-OK` ou `SMOKE-FALHA` no fim do dump. **58 checagens, 0 falhas.**

`tools/validate.py` não executa o jogo: lê os arquivos e confere a camada
de dados, que é onde um capítulo novo quebra as coisas. Não substitui
`validate.js`, que é mais completo. **1847 checagens, 0 falhas.**

`shots.js` abre o jogo em Chrome nos oito tamanhos de tela, reprova
elemento fora do palco, texto cortado e sobreposição, e grava uma imagem de
cada tela em `tools/_shots/`. Sem Chrome ou sem Playwright, avisa e sai sem
falhar — é conferência, não requisito.

**48 checagens de geometria, 0 falhas.**

Sem `npm install`, sem jsdom, sem pacote externo. Roda o projeto de
verdade em um DOM mínimo próprio (`tools/minidom.js`).

**463 checagens estáticas, 0 falhas.** Cobre:

- arquivos, ids, sintaxe e codificação ASCII de todos os scripts
- CSS balanceado, sem cor malformada, sem asset remoto
- manifesto completo, com arquivo em disco para tudo marcado `available`
- roteiro sem cena duplicada, beat vazio ou escolha sem `id`
- typewriter completando no skip
- três partidas completas até o fim do Capítulo 2, por clique e teclado
- save, load, autosave, save rápido, esquema, recusa de save inválido
- rotas: divergência entre ramos, teto, persistência, reconstrução
- galeria: libera pelo progresso e mantém o resto bloqueado
- aviso de conteúdo: aparece, não sai por Escape, respeita o ajuste
- áudio do menu: não toca antes da interação, não duplica faixa
- esconder interface e o clique que a devolve sem avançar a cena
- responsividade: palco sem tamanho fixo, alvo de toque, área segura
- acessibilidade: botões reais, nome acessível, foco próprio, idioma
- sprites com fundo transparente e não totalmente vazios
- barra de leitura montada sem duplicar controle
- aba de nome preenchida também em narração
- código de transcrição no formato posição/total
- skip avançando e parando sozinho na escolha
- funcionamento com `localStorage` bloqueado
- regressões de layout: título sem largura em `ch`, máscara que não corta
  na horizontal, rótulo de registro em uma linha, linha do lockup que não
  encolhe abaixo do conteúdo, menu que rola em vez de cortar, arco medido
  pela altura, sprite com máscara de base, largura de leitura limitada,
  piso de tamanho no cromo, respiro nas bordas

---

## Utilitários

```bash
node tools/escape.js js/data/x.js                    # normaliza para ASCII
node tools/escape.js js/data/x.js --decode --stdout  # lê com acento
python tools/escape.py js/data/x.js                  # o mesmo, sem Node
python tools/escape.py js/data/x.js --decode --stdout
python3 tools/make_sfx.py                            # regera efeitos e sons de UI
python3 tools/fix_sprites.py                         # tira fundo opaco de sprite
python3 tools/check_sprites.py                       # relata alfa dos sprites
python3 tools/make_menu_theme.py                     # trilha sintetizada de reserva
```

Para olhar o layout sem rodar nada, abra `tools/preview.html`: carrega o
`index.html` de verdade em oito viewports, com zoom ajustável. Para medir
em vez de olhar, use `node tools/shots.js --open`.

`fix_sprites.py` é idempotente: arquivo que já tem alfa é ignorado. Rode
depois de adicionar arte nova que possa ter vindo com fundo chapado.

Os arquivos de roteiro são ASCII puro; acentos são escapes `\uXXXX`.
Escreva com acento normalmente e rode `escape.js` depois.

Áudio gerado em WAV; comprimir com `ffmpeg` para `.ogg` e `.mp3` antes de
publicar.

---

## Publicar

É site estático: `git push` e importar no Vercel, Netlify ou GitHub
Pages, sem build command. Verificado: caminhos relativos, nomes de
arquivo consistentes em sistema sensível a maiúsculas, nenhuma
dependência externa.

Os saves ficam presos ao domínio (`localStorage` é por origem). Trocar de
endereço começa um arquivo novo — por isso existe o exportar.
