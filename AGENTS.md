# Rabenfels — contexto do projeto

Visual Novel de horror psicológico e tragédia. Referências de estilo: The House
in Fata Morgana, Umineko, Saya no Uta, Higurashi. O jogador lê primeiro o
Arquivo (documento deixado por uma morta) e depois vive os eventos que o
produziram.

> Há uma skill completa deste projeto em `.Codex/skills/rabenfels-vn/`.
> Ela tem as regras de escrita, a referência de canon e o mapa da arquitetura
> em arquivos separados. Consulte antes de escrever capítulo ou mexer no engine.

## Fonte de verdade

`docs/documento_mestre_rabenfels.docx` é o documento canônico único —
lore, bíblia narrativa, personagens, roteiro do Prólogo + Cap. 1, e a balada.
Qualquer dúvida de continuidade, checar ali primeiro. Não inventar lore nova
sem confirmar comigo.

Arquivos de apoio em `docs/`:
- `arquivo_rabenfels.docx` — o documento diegético da Antoniette (in-fiction),
  usado como fonte de citação quando uma cena referencia o Arquivo diretamente.
- `biblia_rabenfels.md` — a bíblia de execução. Reescrita do zero em
  26/07/2026; as três anteriores foram apagadas e estão em `_backup/`.
- `estrutura_v1.md` — atos, trocas e o gráfico de fios dos onze capítulos.
- `roteiro_prologo_cap1.docx`.

## O arco meta-narrativo (não esquecer nunca)

O Arquivo Rabenfels existe dentro da ficção. Foi escrito por Antoniette,
morta antes do fim da obra. É interpretação de uma pessoa com informação
incompleta sob pressão — não uma verdade objetiva. O "Compilador" que
comenta em notas de rodapé é ela. Isso afeta como qualquer trecho do Arquivo
deve soar: frio, factual, com a máscara escorregando perto do fim.

## Estilo de escrita — regras fixas

Tom de referência: o Prólogo já escrito (Matheo lendo o Arquivo). Frases
curtas, factuais, quase notariais. Horror por acumulação de detalhes
pequenos, nunca por adjetivo dramático.

1. Frases curtas a médias. Nunca emendar 3+ ideias com vírgula ou "e".
2. Proibido pleonasmo. Se uma palavra já implica a outra, corta uma.
3. Proibido frase que soa profunda mas não diz nada concreto. Teste: se a
   frase pode sumir sem perder informação, é floreio — corta.
4. Cada frase carrega uma ideia nova. Se a próxima só repete a anterior com
   outras palavras, corta a repetição.
5. Verbos concretos e substantivos específicos > adjetivo/advérbio genérico
   ("profundamente", "verdadeiramente", "intensamente").
6. Diálogo e ação > narração introspectiva longa. Sentimento se mostra por
   gesto ou fala, não por parágrafo explicando o que o personagem sente.
7. Horror por acumulação, nunca por afirmação direta. Não escrever "isso era
   perturbador" — escrever o detalhe errado e deixar o jogador perceber
   sozinho (é assim que Khar'Vel funciona: ausência, nunca explicação).
8. Releitura final: cortar qualquer frase que sirva só de efeito — se não
   muda cena, informação ou emoção, sai.
9. Perosnalidades dos personagens: Nem todos são iguais e inigmaticos cada 
   um age de maneira diferente e não necessáriamente é um poço de mistérios cheio de frases feitas .
Exemplo do alvo (do próprio roteiro):
> "Noventa e três dias. Ela havia estabelecido noventa. Três dias de
> diferença. Ele passou os últimos três dias tentando acreditar que aqueles
> três dias importavam. Não importavam."

## Motor da VN

Projeto multi-arquivo, JavaScript clássico, sem build, sem npm, sem framework.
Abre direto do `index.html`, inclusive por `file://`.

```
index.html          marcação e formas SVG; scripts em ordem fixa
css/tokens.css      TOKENS — cor, movimento, cursor, keyframes, escala
css/style.css       palco
css/ui.css          portão, menu, painéis, saves, galeria
js/config.js        MANIFESTO — único lugar com caminho de asset
js/storage.js       localStorage, exportar e importar save
js/settings.js      ajustes persistidos
js/state.js         máquina de estados (title, playing, paused, save, ...)
js/assets.js        resolução de caminho e fallback
js/audio.js         BGM com crossfade, SFX, desbloqueio de autoplay
js/history.js       backlog de diálogo
js/routes.js        Esperança, Perda e Resposta
js/gallery.js       desbloqueio por progresso real
js/paginas.js       As Quatro Páginas e o laudo de cada leitura
js/arvore.js        árvore de escolhas e mapa das quatro rotas
js/data/*.js        roteiro — só dados, ASCII puro com escapes \uXXXX
js/rpg.js           o percurso — o trecho jogado de cima da rota Cobertura
css/rpg.css         a camada do percurso, na profundidade 55
js/script.js        montagem determinística do roteiro
js/saves.js         12 espaços manuais, autosave, quicksave
js/engine.js        renderer
js/ui.js            componentes reutilizáveis
js/menu.js          portão de abertura, menu principal, painéis
js/main.js          boot
```

O jogo começa no portão de abertura ("clique para abrir o arquivo"), não
no roteiro. Isso resolve a política de autoplay do navegador: quando a
trilha entra, já houve uma interação.

Identidade visual vem do protótipo aprovado. Cor, duração e easing vivem
em `css/tokens.css` e em nenhum outro lugar. O scaffold Nocturne que
acompanhava o protótipo não foi importado — carrega fonte por CDN e usa
paleta que não é a do jogo. Zero dependência externa é requisito, não
preferência: o validador falha se aparecer um `https://` em HTML ou CSS.

CSS mobile-first: a base atende telefone em retrato e `--rbf-ui` é o
único número que muda por faixa de tela.

- Backgrounds e sprites: ids lógicos no `config.js`. Enquanto `available` for
  `false`, o engine não faz requisição e usa fallback — gradiente CSS para
  cenário, silhueta SVG para personagem, silêncio para áudio.
- Caixa de texto: máquina de escrever; clique, espaço, enter ou seta avançam;
  clique durante a digitação completa a frase.
- Fragmentos do Arquivo: `#archive-box`, itálico, sobre a placa de pergaminho
  (`ui_parchment_plate`), para trechos citados do documento diegético.
  O itálico continua; a cor deixou de ser `#c8a878` sobre preto e passou a ser
  tinta escura sobre papel — a superfície mudou, e a cor do texto sai da peça,
  não do tema. Mesma regra na faixa de seleção do menu, na placa de nome e nas
  escolhas. Sem a arte carregada, o componente volta ao visual escuro anterior.
- Roteiro: array de beats por capítulo em `js/data/`. Ao adicionar capítulo,
  seguir o mesmo formato e registrar em `RBF.CHAPTERS`.

## O percurso — "A Cobertura"

A rota Cobertura tem um trecho **jogado de cima, em canvas**, dentro do
Capítulo 10. Não é outro jogo: é um beat do roteiro.

```js
{ t:'percurso', id:'cob10_inventario', campo:'cob_saida',
  conta:'cob_apurou', sets:{ cob_conferiu:true }, padrao:'linha' }
```

O engine para nele, `js/rpg.js` assume a tela, e o que o jogador apurou
volta como flag — que o roteiro lê com o mesmo `if:{}` de sempre.

- **Planta e conteúdo** em `js/data/cob_mapas.js`. `piso` é o retângulo
  pisável em pixel da imagem; as quatro paredes saem dele no motor.
- **Nenhum nome de arquivo** fora de `RBF.COBERTURA` (`js/config.js`),
  mesma regra do resto do projeto.
- **Marca não feita vale `false`, não `undefined`.** `passes()` compara por
  igualdade estrita, e um beat com `if:{ cob_livro:false }` precisa do
  valor escrito.
- **Sem canvas o beat passa na hora**, aplicando `sets` e `padrao`. É o que
  mantém a rota auditável por `validate.js` e por `smoke.html`, que rodam
  num DOM sem `getContext`.

**Três regras de conteúdo que não se quebram:**

1. **Ela acha a linha.** Sempre — está no canon, em texto já escrito. O que
   varia é quanto ela apura no caminho.
2. **Carmine mata Antoniette antes da fuga.** Depois da linha, Carmine
   ocupa a porta do pátio. Antoniette não chega à carruagem e não existe
   continuação viva desta rota.
3. **Não há combate.** O verbo é *conferir*. Um botão de atacar faria de
   Khar'Vel um inimigo com barra de vida, que é a única coisa que ela não
   pode ser.

Ao editar o motor: preservar a paleta escura/desaturada e as transições já
calibradas (`.8s` em bg, `.5s` em sprite) — não são valores arbitrários,
foram ajustados pro ritmo de leitura da VN. As durações que o engine espera
ficam em `RBF.CONFIG.timing` e devem acompanhar o CSS.

## Fluxo de trabalho

```bash
node tools/validate.js              # o mais completo; exige Node
node tools/escape.js js/data/x.js   # normaliza acento para \uXXXX
python3 tools/make_sfx.py           # regera efeitos e sons de interface
python3 tools/make_menu_theme.py    # regera a trilha do menu
```

Para o percurso da rota Cobertura:

```bash
python tools/cobertura_assets.py            # recorta o kit de assets/A Cobertura/
python tools/cobertura_pixel.py             # pixelit + paleta (SEMPRE depois do recorte)
python tools/cobertura_planta.py --overlay  # mede a planta e desenha por cima da arte
node  tools/cobertura_shots.js              # joga o percurso num Chrome e mede
```

A ordem importa: **recortar, depois pixelar.** `cobertura_pixel.py`
trabalha sobre a saída do primeiro e guarda o original em
`assets/cobertura/_sem_pixel/`; rodar duas vezes sobre o mesmo arquivo
empilharia degrau em cima de degrau, e é a cópia crua que impede isso.

Paleta: uma só para o mundo (cenário, móvel, ícone) e **uma por
personagem**, tirada da própria arte. A do mundo é neutra puxando para
quente, medida nos próprios mapas — não usar os tokens de painel, que
são frios por escrito em `css/tokens.css` e deixam a pedra cor de
ardósia.

`cobertura_shots.js` existe porque **nem `validate.js` nem `smoke.html`
veem o percurso** — os dois rodam em DOM sem `getContext`. Ele entra pelo
Capítulo 10 de verdade, anda com a personagem, confere colisão, porta,
interação, bolsa, save e as flags de volta.

Existe uma segunda camada, escrita quando esta máquina ainda não tinha
Node. Continua valendo: é mais rápida e serve de rede de segurança.

```bash
python tools/validate.py            # 1847 checagens estáticas
python tools/escape.py js/data/x.js # mesmo comportamento do escape.js

# o jogo jogando sozinho, só precisa de um navegador
msedge --headless=new --virtual-time-budget=90000 --dump-dom tools/smoke.html
```

`tools/smoke.html` roda três partidas completas, uma por ramo de escolha,
e confere save, load, rotas e galeria. Procure `SMOKE-OK` no fim do dump.
Foi ele que pegou a corrida entre `advance()` e `loadFrom()`, que nenhum
validador estático veria.

**Critério de entrega: `node tools/validate.js` fechando em zero falhas.**
Ele é o mais completo dos três — roda o jogo inteiro num DOM próprio e
cobre save, entrada, acessibilidade e aviso de conteúdo.

Escrever roteiro com acento normalmente e rodar `escape.js` (ou `.py`)
depois.

**Armadilha de PATH:** depois de instalar algo por `winget`, o terminal já
aberto continua com o PATH velho e `node` aparece como "não reconhecido"
mesmo instalado. Conferir em disco antes de concluir que falta.

Backup antes de mexer: `_backup/pre_<tarefa>_<timestamp>/`.

## Convenções gerais

- Responder em português.
- Soluções completas e prontas, não protótipos mínimos.
- Validar o que for gerado (sintaxe, encoding, balanceamento de
  aspas/parênteses) antes de entregar.
- Não introduzir contradição de lore sem avisar explicitamente qual arquivo
  em `docs/` diverge.
- Rota (Esperança, Perda, Resposta) só se move pelo campo `routes`
  declarado na opção de escolha. Nunca inferir efeito do texto.
- Item de galeria só abre por condição de progresso real. Nada liberado
  "para demonstrar".
- Dizer o que não foi testado em vez de afirmar que funciona.
