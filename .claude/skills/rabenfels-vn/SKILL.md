---
name: rabenfels-vn
description: Escrever, revisar ou estender a visual novel Arquivo Rabenfels — capítulos novos, revisão de roteiro, ajustes de engine, sistema de save, manifesto de assets ou validação. Use sempre que a tarefa envolver os arquivos deste projeto (index.html, js/data/*.js, js/config.js, js/engine.js), qualquer capítulo do Arquivo Rabenfels, ou os personagens Antoniette, Matheo, Serafina, Aldric, Klara, Liara, Fenn, Dara e Ren.
---

# Arquivo Rabenfels — VN

Visual novel de horror psicológico gótico. JavaScript puro, sem build, sem
dependência. Abre direto do `index.html`.

Antes de escrever qualquer linha, leia os três arquivos de referência abaixo.
Eles são curtos e evitam os erros que mais custam retrabalho neste projeto.

| Preciso de | Leia |
|---|---|
| **a postura de trabalho deste projeto** | **`reference/persona.md`** — leia primeiro |
| tiques que denunciam texto de máquina | `reference/antipadroes-ia.md` |
| regras de escrita, voz de cada personagem | `reference/estilo.md` |
| cronologia, terminologia, o que pode ser revelado quando | `reference/canon.md` |
| tipos de beat, módulos, como adicionar capítulo | `reference/arquitetura.md` |
| tokens, animação, mobile-first, componentes | `reference/design.md` |

Fonte canônica: `docs/documento_mestre_rabenfels.docx`. Ele vence qualquer
briefing. Se um pedido contradisser o canon, siga o canon e diga qual arquivo
diverge — não invente lore para fechar a contradição.

## Ordem de trabalho

1. **Leia o projeto antes de mudar.** Nunca reconstrua de memória. Se veio um
   arquivo compactado, extraia e compare com o que você lembra: o usuário mexe
   no CSS, no `config.js` e nos assets entre uma sessão e outra.
2. **Faça backup** em `_backup/pre_<tarefa>_<timestamp>/` antes de editar.
3. **Escreva o roteiro em UTF-8** e converta com `node tools/escape.js <arquivo>`
   ou `python tools/escape.py <arquivo>`. Os arquivos de `js/data/` são
   ASCII puro com escapes `\uXXXX`.
4. **`node tools/validate.js` é o critério de entrega.** Se `node` não
   responder, confira em disco antes de concluir que falta: terminal
   aberto antes de um `winget install` fica com o PATH velho. Sem Node
   mesmo, há `python tools/validate.py` (estático) e `tools/smoke.html`
   (o jogo jogando sozinho, headless com `--dump-dom`, procure `SMOKE-OK`).
5. **Valide as duas camadas.** Validador — `validate.js` ou `validate.py` —
   cobre estrutura, estado e roteiro, e **não vê layout**. Para qualquer
   mudança visual, `node tools/shots.js --open` abre o jogo em Chrome, mede
   a geometria em oito tamanhos e grava as imagens em `tools/_shots/`.
   Sem Node, `msedge --headless=new --screenshot=... --window-size=W,H`
   resolve. Olhe as imagens: já aconteceu de passar 442 de 442 com a tela
   quebrada.
6. **Releia o transcript.** O validador não pega repetição, frase de efeito nem
   beat que explica o que o jogador acabou de ver. Isso só sai relendo.

## O que quebra com mais frequência

- **Escolha sem `id`.** Toda `{ t:'cho' }` precisa de `id` estável. Sem ele a
  escolha não entra no `choiceLog` e todo save posterior reconstrói o roteiro
  errado. Foi um bug real; não repita.
- **Caminho de asset fora do `config.js`.** Nenhum arquivo além dele pode
  conhecer nome de imagem, som ou pasta.
- **Asset novo sem `available`.** Enquanto for `false`, o engine não faz
  requisição. Colocou o arquivo, mude para `true` — e só então.
- **Beat que explica o beat anterior.** Se a frase seguinte parafraseia a
  anterior para "reforçar", ela sai.
- **Revelação adiantada.** Confira em `reference/canon.md` o que cada capítulo
  pode saber. O Capítulo 2 não pode ter contato real com as gêmeas.
- **Rota movida por inferência.** Uma escolha só move Esperança, Perda ou
  Resposta pelo campo `routes` declarado na opção. Nunca deduza efeito do
  texto.
- **Item de galeria liberado "para mostrar".** Cada entrada tem condição
  verificada contra progresso real. Não afrouxe para demonstrar.
- **Valor bruto no CSS.** Cor, duração e easing vivem em `css/tokens.css`.
  Um hex solto num componente é regressão.
- **Media query `max-width` para fazer caber.** O CSS é mobile-first: a base
  atende telefone e as faixas maiores só crescem. `max-width` existe apenas
  para paisagem curta e elemento decorativo.

## Estilo de resposta

Português. Direto. Sem pleonasmo, sem frase que só parece profunda. O usuário
é quem roda, depura e mantém o código — não explique conceito básico de
programação. Entregue solução completa, não protótipo. Diga o que não foi
testado em vez de afirmar que funciona.
