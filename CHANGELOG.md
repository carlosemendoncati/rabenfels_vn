# Changelog

## 0.3.0 — Capítulo 2 e sistemas de jogo

### Capítulo 2 — O Inventário

Seis cenas conectadas, cada uma com propósito, beat de entrada, progressão e
linha de saída:

1. **A copa** — Dara. A regra que ninguém enuncia: depois das oito ninguém tem
   fome. Saída: Antoniette não perguntou nada sobre o lado norte.
2. **A catalogação** — Ren, dezessete anos, cinco semanas de casa, sem raiz
   local. O contraponto normal. Saída: ele não faz a segunda pergunta.
3. **Os livros de conta** — o primeiro erro concreto. Faltam dois anos de
   registro financeiro e a numeração das lombadas é contínua. Saída: o couro
   do volume doze está um tom mais claro.
4. **O pátio** — onze pessoas passam diante da porta nordeste e nenhuma vira a
   cabeça. Saída: ninguém nesta casa mente, todos param onde a verdade acaba.
5. **A seção nordeste** — os registros de família dos mesmos dois anos existem
   e estão completos. Alguém escolheu apagar só o dinheiro. Saída: Aldric sabe
   o que tem em cada estante.
6. **O livro devolvido** — um volume de anatomia trocado de posição, marcador
   na mesma página, duas manhãs seguidas. Presença das gêmeas por objeto, não
   por pessoa.

Escolha "A Lacuna" com três consequências distintas e flags próprias
(`ledger_report`, `ledger_crossref`, `ledger_copied`). A opção C também grava
`archive_seed`.

**Ligação com o Capítulo 1**: beats condicionais (`if`) leem `archive_seed`.
Quem abriu o caderno sem identificação no Capítulo 1 tira ele de baixo do
forro do baú; quem não abriu tira um caderno em branco do baú de ferramentas.

Não acontece aqui, por respeito ao canon: contato real com as gêmeas (isso é
o Capítulo 3), natureza dos experimentos (Capítulo 5), a antecessora
(Capítulo 8).

Personagens novos, ambos canônicos: Dara (cozinheira, dezenove anos de casa) e
Ren (assistente de arquivo).

### Sistemas de jogo

- **Tela de título** com Novo Jogo, Continuar, Carregar, Capítulos, Ajustes e
  Créditos. O jogo não começa sozinho; isso também resolve a política de
  autoplay, porque quando a cena começa já houve um clique. Continuar fica
  visivelmente desabilitado sem save.
- **Máquina de estados** (`js/state.js`): title, playing, paused, save, load,
  settings, history, credits, modal, transition. Com painel aberto o roteiro
  não avança, clique no palco não passa por baixo e o teclado vai para a
  interface.
- **Save**: 12 espaços manuais, autosave por cena, quicksave. Esquema
  versionado com `schemaVersion`, `gameVersion`, tempo de jogo, capítulo, cena,
  índice de beat, flags, variáveis, conteúdo desbloqueado, apresentação e
  prévia. Save inválido é recusado com o motivo explicado.
- **Exportar e importar save** como `.json`, sem servidor.
- **Reconstrução determinística do roteiro** (`js/script.js`): o registro de
  escolhas reconstrói exatamente o mesmo array de beats, o que mantém o índice
  do save válido mesmo com ramificação injetada.
- **Menu de jogo** por botão, `Escape` ou botão direito. Resume, salvar,
  carregar, quicksave, quickload, histórico, ajustes, voltar ao título.
- **Ajustes persistidos**: efeito de máquina de escrever, velocidade, tamanho
  do texto, volume de trilha e efeitos, avanço automático, autosave,
  confirmação de ações destrutivas.
- **Histórico de diálogo** com backlog de até 400 entradas, recorte de 120
  gravado no save.
- **Componentes reutilizáveis** (`js/ui.js`): painel, modal de confirmação,
  aviso breve, controles de ajuste, cartão de save com miniatura.
- **Atalhos**: `Esc` menu, `F5` quicksave, `F9` quickload, `H` histórico.

### Áudio

Seis efeitos sonoros gerados especificamente para o projeto em
`tools/make_sfx.py`, WAV mono 44.1 kHz 16 bits, síntese com a biblioteca padrão
do Python. Sem material de terceiros, sem download. `sfx_door` não tem rangido,
porque o roteiro diz que o portão abre sem ranger.

`RBF.Audio.refreshVolume()` reaplica o volume na faixa que já está tocando
quando o jogador mexe no controle.

### Correções

- **Escolha do Capítulo 1 não tinha `id`.** Sem `id` a escolha não entrava no
  `choiceLog` e qualquer save posterior reconstruía o roteiro sem o ramo,
  deixando o índice apontando para o lugar errado.
- **Valor de cor malformado no CSS da interface**, corrigido e coberto por
  checagem automática.
- Durações de transição do engine passaram a respeitar `RBF.CONFIG.timing`
  em todos os cartões.

### Ferramentas

- `tools/validate.js` reescrito **sem jsdom e sem npm**. Usa apenas módulos
  nativos do Node e um DOM mínimo próprio (`tools/minidom.js`). São 300
  checagens: estático, manifesto, roteiro, typewriter, três partidas completas,
  save/load, estado da interface e comportamento com `localStorage` bloqueado.
- `tools/make_sfx.py` para regerar os efeitos sonoros.
- `.claude/skills/rabenfels-vn/` com a skill do projeto e três arquivos de
  referência: estilo e vozes, canon, arquitetura.
- `CLAUDE.md` atualizado. A versão anterior ainda descrevia o motor de arquivo
  único, que não existe mais desde a refatoração.

### Preservado

Prólogo e Capítulo 1 intactos, incluindo as modificações do usuário: sprites
maiores, Matheo em `full`, cor de Liara, backgrounds em `.png`, BGM ativa e os
dois beats removidos do Prólogo. Execução direta por `file://`, JavaScript
clássico, namespace `RBF`, typewriter, skip, progressão por clique e teclado,
manifesto de assets, crossfade e fallback de asset ausente.

---

## 0.2.0 — Refatoração do Prólogo e Capítulo 1

### Arquitetura

- VN monolítica (1 arquivo, 1,4 MB, 13 sprites em base64 inline) dividida em
  `index.html` + `css/` + `js/` + `assets/`. Original preservado em
  `_backup/arquivo_rabenfels.original.html`.
- Criado `js/config.js` como manifesto único.
- Roteiro separado do renderer.
- Scripts clássicos, sem módulos ES — abre em `file://` sem servidor.

### Bugs corrigidos

- **Skip do typewriter truncava o texto**: usava o texto parcial como fonte da
  versão completa.
- **Escolha não fazia nada**: os três botões chamavam a mesma função, sem flag
  e sem resposta diferente.
- **Cursor `▼` era um nó dentro do texto** e contaminava a lógica de skip.
- **Sem tratamento de asset ausente**: expressão inexistente virava
  `undefined` e ícone de imagem quebrada.
- **Sem `preventDefault` no espaço**, que rolava a página.

### Narrativa

Prólogo reconstruído em seis cenas com escalada e colapso sensorial antes da
vela. Capítulo 1 reconstruído em seis cenas com primeira escolha significativa.
Conflitos entre briefing e canon resolvidos pelo canon: vozes das gêmeas e
semântica da opção A.
