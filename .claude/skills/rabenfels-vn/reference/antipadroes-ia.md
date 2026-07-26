# Antipadrões de texto gerado

Levantado a pedido do autor em 26/07/2026, depois de eu repetir a mesma
construção dezenas de vezes seguidas. Fontes no fim.

Isto não é teoria de estilo. É uma lista de tiques que denunciam texto de
máquina, e que este projeto não pode ter em lugar nenhum — nem no roteiro,
nem em comentário de código, nem em resposta ao autor.

`tools/validate.py` procura os cinco primeiros automaticamente em
`js/data/*.js`. Os outros só saem relendo.

---

## 1. Negação-contraste — o pior de todos

A construção que monta uma frase negando algo para afirmar outra coisa.

```
Não é X. É Y.
Não é X, é Y.
Não apenas X, mas Y.
Menos X e mais Y.
X não é a palavra certa. Y é.
Não era pergunta. Era aviso.
```

É o tique mais reconhecível de texto gerado. Um artigo de 2024 (EMNLP)
mostrou que modelos usam esqueletos sintáticos com frequência muito maior
que texto humano, porque montar por molde é barato. Esta é a moldura
campeã.

**Por que soa bem e é ruim:** dá impressão de virada argumentativa sem
que virada nenhuma tenha acontecido. Soa organizado, enfático e
sofisticado de graça.

**Como consertar:** afirme direto e específico. Corte a metade negativa,
que quase sempre não carrega informação.

| Em vez de | Escreva |
|---|---|
| "Não é isolamento aristocrático: é higiene." | "A família apaga a si mesma dos próprios papéis." |
| "Não era pergunta. Era o aviso de que ele sabia o nome." | "Ele disse o nome dela como quem confere uma lista." |
| "Casulo não é onde se guarda. É onde se transforma." | "O que entra num casulo é consumido por dentro." |

**Atenção:** repetição em série é o que denuncia. Uma ocorrência num
capítulo inteiro passa. Três na mesma cena viram assinatura.

---

## 2. Tríade automática

Três itens onde dois bastariam, ou três adjetivos em fila.

```
Fria, precisa e controlada.
Datas, nomes e horários.
Uma geometria da loucura, uma ferida no tecido do que existe, mais velha
que a lei e o tempo.
```

Modelos completam para três por hábito. Escritor humano quebra a regra
o tempo todo. **Conte:** se o terceiro item não acrescenta, corte.

---

## 3. Profundidade não merecida

Frase que anuncia peso sem entregar conteúdo.

```
Alguma coisa mudou.
E foi aí que ele entendeu.
Mas aqui está a questão.
Nada mais seria igual.
No fim das contas.
```

Já é proibido pela regra 3 do estilo do projeto. Aparece disfarçado de
aforismo curto, que é justamente a voz notarial degenerando.

---

## 4. Frase-resumo emocional no fim do beat

O hábito de fechar um parágrafo declarando o que ele significou.

```
Ele não se moveu.                      <- bom, termina aqui
E aquilo dizia tudo sobre ele.         <- a frase que sobra
```

Regra deste projeto: se a frase explica a anterior, sai. O leitor
percebe. Horror por acumulação depende de o leitor concluir sozinho.

---

## 5. Travessão dramático em excesso

O travessão vira muleta de ritmo. Foi o tell mais famoso de 2024–2025;
os modelos passaram a trocá-lo por ponto e vírgula, o que gerou o mesmo
problema com outro sinal.

**Regra:** no máximo um travessão por cena. Ponto final resolve quase
sempre. Em português, dois-pontos com função de revelação (`X: Y`) tem o
mesmo cheiro.

---

## 6. Hedging de interioridade

```
Ele se pegou pensando.
Alguma coisa nela chamou a atenção dele.
Havia algo de estranho naquilo.
Por algum motivo, ele hesitou.
```

Enche linha sem dizer nada e enfraquece o personagem. Antoniette
**registra**, não "se pega registrando".

---

## 7. Anúncio de transição

```
Isso significa três coisas.
Duas observações se impõem.
Vale notar que.
```

Texto de máquina anuncia toda conexão lógica em vez de confiar no leitor.
Em roteiro isso é fatal.

---

## 8. Eco de palavra rara

Modelo que achou uma palavra boa volta ao mesmo poço. Se "corrente",
"registro" ou "conferir" aparecer três vezes em duas cenas, duas saem.

---

## 9. Ritmo chapado

Todas as frases com o mesmo comprimento. O projeto pede frases curtas,
o que agrava o risco: curto + curto + curto vira metrônomo. Quebre com
uma frase longa a cada oito ou dez.

---

## 10. Sensorial de catálogo

Descrição sensorial genérica que soa específica.

```
O ar estava pesado.
Um cheiro de poeira e papel velho.
O silêncio era denso.
```

Detalhe que serve para qualquer cena não serve para nenhuma. Este
projeto quer o **detalhe errado**: o cano da fonte virado para baixo, a
moldura sem quadro que alguém limpa.

---

## 11. Diálogo em blocos

Fala curta, corte, fala curta, corte — todas do mesmo tamanho, cada troca
terminando em suspense. Personagens diferentes precisam de comprimentos
de fala diferentes. Liara fala mais e pior. Klara fala pouco e não fala
bonito.

---

## 12. O substituto físico do medo — a armadilha dentro da regra 3

**Fonte nova: Kenworthy, e é o parágrafo mais útil do corpus sobre isto.**

A regra que todo mundo conhece diz: não escreva "João estava com medo".
Mostre o corpo. E aí vem o aviso:

> "Melhor mostrar a experiência física do medo: 'João sentiu o coração
> bater contra as costelas e o estômago liquefazer.' **Isso funciona, mas
> o problema é que é um clichê de horror.** Então, embora você deva evitar
> afirmações diretas, **fique atento para não cair no clichê.**"

**São duas proibições, não uma.** A segunda é mais perigosa porque parece
a correção da primeira.

**Lista proibida:**

- coração disparado / batendo contra as costelas / na garganta
- estômago afundando, embrulhando, liquefazendo
- arrepio na nuca, pelos do braço em pé
- sangue gelando, gelo na espinha
- ar que não chega, garganta fechando
- mão que treme sem que a pessoa mande

**O terceiro caminho, que é o que a obra usa nos melhores momentos:** o
**detalhe errado no ambiente, sem reação declarada.** A moldura vazia. O
cano da fonte virado para baixo. O curativo num braço só. Antoniette não
sente nada — ela anota.

---

## 13. Chavão em português — os "mesmeiros"

**Fonte: Squarisi & Salvador.** É a única lista de antipadrões do corpus
que é **específica do português**, e a mais fácil de automatizar.

> "Certas palavras e expressões foram originais um dia. Depois, de tanto
> repeti-las, viraram modismos. **Supérfluas, são pobres de valor
> informativo.** Quando bate o olho na mesmeira, o leitor **sente cheiro
> de mofo.**"

As que um horror gótico em português corre risco real de usar:

*a duras penas · a olhos vistos · alimentar a esperança · antes de mais
nada · ao apagar das luzes · baixar a guarda · cair como uma luva ·
caixinha de surpresas · como se sabe · como todos sabem · cortina de
fumaça · dar o último adeus · deitar raízes · divisor de águas · em
compasso de espera · em sã consciência · em última análise · faca de dois
gumes · fazer das tripas coração · fio condutor · lavar a alma · luz no
fim do túnel · menina dos olhos · na ordem do dia · no fundo do poço ·
óbvio ululante · página virada · pomo da discórdia · pôr a casa em ordem ·
requinte de crueldade · reta final · rota de colisão · sentir na pele ·
separar o joio do trigo · sorriso amarelo · tecer comentários · trazer à
tona · via de regra · voltar à estaca zero*

---

## 14. A distinção que evita corrigir um erro criando outro

**`não…mas` é construção legítima do português.** "Não moro em São Paulo,
mas em Brasília" está certo, e Squarisi lista o par entre os casais fixos
da língua.

**O proibido é a fórmula retórica** — *"não é X: é Y"* — usada como muleta
de ritmo e de falsa profundidade. A diferença:

| | |
|---|---|
| ✅ par gramatical | "Ela não anotou o nome, mas a hora." |
| ❌ fórmula retórica | "Não é isolamento aristocrático: é higiene." |

**E há um terceiro caso, que é legítimo e não se toca:** as três linhas de
Khar'Vel no documento mestre — *"Khar'Vel não é um deus... não é um
demônio... não é imortal no sentido convencional"*. São **anáfora
deliberada**: definição por exclusão, porque a coisa não tem categoria
positiva. É texto canônico do autor e fica como está. No Prólogo, Matheo
repara na forma, o que converte a figura em caracterização.

---

## 15. Erros de português que o corpus mandou vigiar

Todos de Squarisi & Salvador, todos automatizáveis.

**Paralelismo quebrado.** O atalho de detecção é ótimo:

> "Cuidado com o **'e que'**. A duplinha só tem vez quando houver o
> primeiro 'quê'. **Na falta dele, tenha uma certeza: o paralelismo foi
> esnobado.**"

**Cruzamento.** `à medida em que` não existe. É mistura de *à medida que*
com *na medida em que*.

**Pares partidos.** `seja…ou`, `quer…ou`, `de…à`, `de…às`.

**Gerundismo.** `vou estar anotando` → *anotarei* ou *vou anotar*. E o
limite fino: `estar + gerúndio` só vale para o **transitório**. "A casa
está guardando alguma coisa" quer dizer "a casa guarda alguma coisa".

**Plural de parte única do corpo.** "Levantaram **a mão**", não *as mãos*.
Numa obra cheia de braços, mãos e curativos, este erro vai acontecer.

**Verbo administrativo inventado** — *operacionalizar*, *agudização*,
*prestigiamento*. **Na boca da família Rabenfels é caracterização. Na
narração é falha.**

---

## Teste rápido antes de entregar

1. `python tools/validate.py` — pega 1 a 5 automaticamente.
2. Buscar `Não é`, `Não era`, `não apenas`, ` — `, `: é ` no texto novo.
3. Buscar a lista física do item 12 e a lista de chavões do item 13.
4. Ler em voz alta uma cena inteira. Metrônomo aparece no ouvido.
5. Cada frase que sobrar: ela muda cena, informação ou emoção? Se não,
   sai.

**E o teste que vale por todos, de Zinsser, 1976:**

> "Ninguém mostrou aos novos escritores de computador que a essência do
> escrever é reescrever. **O mero fato de eles escreverem fluentemente não
> significa que escrevam bem.** (...) As frases aparecem tão bem na tela.
> **Como poderiam não ser perfeitas frases tão bonitas como essas?**"

---

## Fontes

**Do corpus de referência** (notas completas em `docs/estudo/`):

- Kenworthy, *Writing SF, Fantasy & Horror* — item 12, o substituto
  físico do medo. → `09`
- Squarisi & Salvador, *A Arte de Escrever Bem* — itens 13, 14 e 15.
  Única fonte de português do corpus. → `04`
- Zinsser, *Como Escrever Bem* — o anúncio de transição (item 7) com
  fonte de 1976, e a epígrafe sobre fluência. → `05`
- Faye, em *How to Write a Mystery* — contra o estilo aplicado
  uniformemente, que é o item 9 dito por outro caminho. → `08`

**Da pesquisa na rede:**

- [Don't Write Like AI: "It's Not X, it's Y"](https://www.blakestockton.com/dont-write-like-ai-1-101-negation/)
- [The Field Guide to AI Slop — Charlie Guo](https://www.ignorance.ai/p/the-field-guide-to-ai-slop)
- [How to Identify AI-Written Web Fiction — Record Crash](https://recordcrash.substack.com/p/how-to-identify-ai-written-web-fiction)
- [Avoiding common ChatGPT writing styles and structures — OpenAI Developer Community](https://community.openai.com/t/avoiding-common-chatgpt-writing-styles-and-structures/624869)
- [How to Stop ChatGPT From Writing "Not Just X, but Y"](https://www.popularai.org/p/how-to-stop-chatgpt-from-writing-not-just-x-but-y)
- [Once You Notice ChatGPT's Weird Way of Talking — Futurism](https://futurism.com/chatgpt-weird-way-talking-see-it-everywhere)
- [Current AI Tells — AUTHORiTEA](https://ehprybylski.substack.com/p/current-ai-tells)
- [How AI-generated prose diverges from human writing — Reuters Institute](https://reutersinstitute.politics.ox.ac.uk/news/how-ai-generated-prose-diverges-human-writing-and-why-it-matters)
