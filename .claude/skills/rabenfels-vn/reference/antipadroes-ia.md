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

## Teste rápido antes de entregar

1. `python tools/validate.py` — pega 1 a 5 automaticamente.
2. Buscar `Não é`, `Não era`, `não apenas`, ` — `, `: é ` no texto novo.
3. Ler em voz alta uma cena inteira. Metrônomo aparece no ouvido.
4. Cada frase que sobrar: ela muda cena, informação ou emoção? Se não,
   sai.

---

## Fontes

- [Don't Write Like AI: "It's Not X, it's Y"](https://www.blakestockton.com/dont-write-like-ai-1-101-negation/)
- [The Field Guide to AI Slop — Charlie Guo](https://www.ignorance.ai/p/the-field-guide-to-ai-slop)
- [How to Identify AI-Written Web Fiction — Record Crash](https://recordcrash.substack.com/p/how-to-identify-ai-written-web-fiction)
- [Avoiding common ChatGPT writing styles and structures — OpenAI Developer Community](https://community.openai.com/t/avoiding-common-chatgpt-writing-styles-and-structures/624869)
- [How to Stop ChatGPT From Writing "Not Just X, but Y"](https://www.popularai.org/p/how-to-stop-chatgpt-from-writing-not-just-x-but-y)
- [Once You Notice ChatGPT's Weird Way of Talking — Futurism](https://futurism.com/chatgpt-weird-way-talking-see-it-everywhere)
- [Current AI Tells — AUTHORiTEA](https://ehprybylski.substack.com/p/current-ai-tells)
- [How AI-generated prose diverges from human writing — Reuters Institute](https://reutersinstitute.politics.ox.ac.uk/news/how-ai-generated-prose-diverges-human-writing-and-why-it-matters)
