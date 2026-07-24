# Rabenfels — contexto do projeto

Visual Novel de horror psicológico e tragédia. Referências de estilo: The House
in Fata Morgana, Umineko, Saya no Uta, Higurashi. O jogador lê primeiro o
Arquivo (documento deixado por uma morta) e depois vive os eventos que o
produziram.

## Fonte de verdade

`docs/documento_mestre_rabenfels.docx` é o documento canônico único —
lore, bíblia narrativa, personagens, roteiro do Prólogo + Cap. 1, e a balada.
Qualquer dúvida de continuidade, checar ali primeiro. Não inventar lore nova
sem confirmar comigo.

Arquivos de apoio em `docs/`:
- `arquivo_rabenfels.docx` — o documento diegético da Antoniette (in-fiction),
  usado como fonte de citação quando uma cena referencia o Arquivo diretamente.
- Referências visuais (`.webp`) — silhuetas/concept art de Klara e Liara.

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

Exemplo do alvo (do próprio roteiro):
> "Noventa e três dias. Ela havia estabelecido noventa. Três dias de
> diferença. Ele passou os últimos três dias tentando acreditar que aqueles
> três dias importavam. Não importavam."

## Motor da VN (`arquivo_rabenfels.html`)

Protótipo single-file: HTML + CSS + JS embutidos, sem build step.

- Backgrounds: classes CSS por cena (`.bg-office`, `.bg-library`, etc.),
  gradientes — substituíveis por arte real depois.
- Sprites: `#sprites`, posições `pos-left/center/right`, classes `show` para
  fade in/out. Expressões trocadas via classe extra na imagem.
- Caixa de texto: efeito de máquina de escrever, clique/espaço/enter avança,
  clique durante digitação pula pro final.
- Fragmentos do Arquivo: `#archive-box`, estilo diferenciado (itálico,
  cor `#9e8070`) para trechos "citados" do documento diegético.
- Roteiro (falas, cenas, escolhas) vive como dados dentro do próprio script —
  ao adicionar capítulos, seguir o mesmo formato de array de cena já usado
  no Prólogo/Cap. 1.

Ao editar o motor: preservar a paleta escura/desaturada e as transições já
calibradas (`.8s` fade em bg, `.5s` em sprite) — não são valores arbitrários,
foram ajustados pro ritmo de leitura da VN.

## Convenções gerais

- Responder em português.
- Soluções completas e prontas, não protótipos mínimos.
- Validar o que for gerado (sintaxe, encoding, balanceamento de
  aspas/parênteses) antes de entregar.
- Não introduzir contradição de lore sem avisar explicitamente qual arquivo
  em `docs/` diverge.
