# Estudo das Referências — índice

**Leia este arquivo primeiro.** Os outros são o detalhe.

Formato: afirmação · fonte · o que fazer · confiança.
Confiança **alta** = duas ou mais fontes independentes concordam.

Corpus em `REF/` (fora do git). Texto extraído em `REF/_txt/`.
Ferramentas: `python tools/refextract.py`, `python tools/refread.py`.

---

## Estado da leitura

| # | Livro | Lido | Falta |
|---|---|---|---|
| 01 | Murphy, *The Plot Dot* | **integral** | — |
| 02 | Finley, *Branching Story* | glossário, cap. 1–10 | cap. 11–13 (produção móvel, assets, engines) |
| 03 | Frey, *Damn Good Mystery* | cap. 1–11, 16–19 | cap. 12–15 (stepsheet dos atos II–V, clímax, tabus) |
| 04 | Squarisi & Salvador, *A Arte de Escrever Bem* | os doze preceitos | 2ª metade (gêneros jornalísticos) |
| 05 | Zinsser, *Como Escrever Bem* | Parte I | Parte II (unidade, lide e final) e III |
| 06 | Corbett, *The Art of Character* | cap. 4, 5, 7, 8, 10 | cap. 6, 9, 11–16, Parte III |
| 07 | Cavallaro, *Anime and the VN* | prefácio, cap. 1, *Higurashi* | os outros estudos de caso |
| 08 | MWA, *How to Write a Mystery* | trechos | **quase tudo** |
| 09 | Kenworthy, *SF/Fantasy/Horror* | seção de horror | resto — **extração degradada, palavras coladas** |
| 10 | Kristoff, *Império do Vampiro* | amostras | 945 páginas |
| 11 | Peters, *Brother Cadfael* | amostras | 4.504 páginas |

---

## As sete regras de confiança alta

Onde fontes independentes convergem. **Estas prevalecem sobre gosto.**

### R1 · Explicar mata

Corbett (McKee): *"quanto mais o escritor prende a motivação a causas
específicas, mais ele diminui o personagem"*. Kenworthy: *"sugerir vence
ser direto"*. Cavallaro (estética japonesa): *sabi*, a vista parcialmente
encoberta. Documento mestre: *"Khar'Vel nunca deve ser explicada"*.

**Fazer:** nunca explicar o motivo de Carmine. O jogador pode saber *o
que* ela é; jamais *por quê*. Vale também para Serafina e Aldric — a
origem informa, não justifica. → `06`, `07`

### R2 · Pensar antes de escrever; começar pelo fim

Frey (stepsheet). Finley ("comece pelos finais"). MWA (Rae Franklin
James: escreve o último capítulo antes do meio). Squarisi ("gaste tempo
pensando e só depois sente-se"). Zinsser ("pensamento limpo, texto
limpo"). **Cinco fontes.**

**Fazer:** escrever o Epílogo antes de continuar o meio da obra.
→ `02`, `03`, `04`, `05`

### R3 · Toda cena termina em virada, revelação ou mudança

Frey (*endlines*: ponte ou soco). Murphy ("loops abertos").

**Fazer:** numa VN cada *beat* é micro-cena com micro-*endline*. Auditoria
do Cap. 1: cinco socos contra três pontes — desequilibrado.
→ `01`, `03`

### R4 · Detalhe sensorial no lugar de adjetivo

Finley ("os sinos estridularam" > "fizeram um som horrível"). Zinsser
("todo advérbio que repete o verbo"). Squarisi (adjetivo só se
particulariza; adjetivos-ônibus não informam nada).

**Fazer:** auditoria sensorial do Cap. 1 — som, cheiro, tato,
temperatura estão quase ausentes. → `02`, `04`, `05`

### R5 · Forma positiva

Squarisi, preceito 3: *"dizer o que é, não o que não é"*. Pesquisa de
antipadrões: "não é X, é Y" é o tique mais reconhecível de texto gerado.

**Fazer:** já detectado por `tools/validate.py`. Teto de 1 por capítulo.
→ `04`, `.claude/skills/rabenfels-vn/reference/antipadroes-ia.md`

### R6 · Vulnerabilidade vence simpatia

Frey (*"'amável' não está na lista — isso é besteira"*). Corbett
(*"depende muito menos de ser agradável do que de estar numa luta que
importa"*).

**Fazer:** Antoniette não é doce e não precisa ser. → `03`, `06`

### R7 · Nada de atributo cristalizado

Cavallaro (o defeito do horror menos analítico). Corbett (Tirania do
Motivo). O autor, regra 9 do `CLAUDE.md` (*"não necessariamente é um poço
de mistérios cheio de frases feitas"*).

**Fazer:** Klara fala pouco porque é criança que fala pouco. Já corrigido
no Cap. 1; vigiar em todo capítulo novo. → `06`, `07`

---

## Onde eu discordo dos livros

Registrado para não ser "consertado" por sessão futura.

| Livro | Diz | Rabenfels faz | Por quê |
|---|---|---|---|
| Frey, Murphy | não abra com prólogo | o Prólogo é a obra | eles falam de prólogo como muleta para abertura fraca; aqui é a moldura, e o horror depende de saber o fim antes |
| Frey | 5 atos: descoberta, captura, justiça | quebra os atos III–V | a premissa que ele chama de universal — "a razão vence o mal" — é a que a obra nega |
| Squarisi | "imagine três itens para agrupar" | tríade proibida na narração | buscar o terceiro item porque três soa bem é preenchimento; permitida só no cartão do Arquivo |
| Zinsser | seja você mesmo, use o "eu" | voz notarial construída | ficção com voz artificial; o que transfere é "nada de peruca" |
| Cavallaro | multiperspectivalismo | ponto de vista único | o Arquivo é limitado porque ela era limitada |

---

## Descobertas que mudam categoria

**A obra é thriller, não whodunnit.** Todorov, via Cavallaro: curiosidade
vai de efeito a causa; suspense vai de causa a efeito. O Prólogo entrega
a causa. O motor da leitura é *"quando isto vai acontecer e eu vou ter de
assistir"*. → `07`

**Império do Vampiro tem a mesma moldura.** Gabriel conta a Jean-François,
que registra. Diferença: **o ouvinte interrompe** e a moldura atravessa o
livro. Em Rabenfels, Matheo some por onze capítulos. → `estudo_referencias.md`

**Antoniette é o problema de Zinsser virado personagem.** Ele condena a
voz impessoal que esconde a pessoa; a obra faz desse esconder o enredo.
→ `05`

**A ferida de Aldric já existe e é moral** — a vez que entrou na câmara.
Corbett: inventar ferida para preencher checklist piora o personagem.
Corrige recomendação anterior minha. → `06`

---

## Defeitos medidos no que já está escrito

| Defeito | Medida | Fonte |
|---|---|---|
| favoritismo de ramo | C é sempre o ramo mais longo (11 beats contra 8 e 7) **e é a rota do final verdadeiro** | `02` |
| `aldric_pressed` | gravada e nunca lida em capítulo nenhum | `02` |
| endlines desequilibrados | 5 socos, 3 pontes no Cap. 1 | `03` |
| sensorial | visão em quase todo beat; som, cheiro, tato quase ausentes | `02`, `04` |
| metrônomo | média de 35 caracteres por frase, máx. 103, teto do livro 150 | `04` |
| topo de cena genérico | C1 abre com 4 beats de paisagem antes de ação | `05` |
| linha do tempo dos bastidores | **não existe** | `03` |
| red herring | nenhum — mas a solução não é plantar, é dar agenda aos servos | `03` |
| Antoniette não insiste | aceita a primeira recusa de Fenn e de Dara | `03` |
| registro único | ela fala igual com Fenn, Serafina e Aldric | `02` |

---

## Fila de ação, por ordem

**Bloqueiam escrita nova**

1. Escrever o **Epílogo** — Matheo diante do cadastro. (R2)
2. Escrever o **stepsheet de duas colunas** dos cinco anos: "o leitor vê"
   numerado, "offstage" sem numeração. (`03`)
3. Fechar as **decisões pendentes da bíblia** — nome do Cap. 11, idade de
   Aldric, Guardiões, calendário, sistema de finais.

**Correções no que existe**

4. Equilibrar os ramos A/B/C das duas escolhas do Cap. 1.
5. Fazer `aldric_pressed` ser lida em algum capítulo.
6. Auditoria sensorial do Cap. 1.
7. Converter dois fins de cena de soco para ponte (C6, C7).
8. Plantar a migalha do Khar'Vel no Prólogo — e que ela revele a
   ansiedade de Antoniette, não só a lacuna.
9. Cortar o topo das cenas até onde a voz entra.
10. Diferenciar o registro de Antoniette por interlocutor.
11. Dar a ela o **segundo empurrão** nas cenas de investigação.

**Experimentos**

12. Cortar uma cena em 50% e comparar (Zinsser).
13. Ler um capítulo em voz alta procurando eco, rima e cacofonia —
    **tarefa do autor; Wahl não ouve.**

**Sistema**

14. Decidir se a obra precisa de múltiplos finais ou de um final com
    variações.
15. Renomear os "Bad Ends" — o rótulo impõe julgamento, e o final em que
    ela sobrevive é o que o documento mestre quer ambíguo.
16. Modo `???` no engine para falante não apresentado.
17. Medir o limite de caracteres da caixa de diálogo.

---

## Perguntas abertas ao autor

1. A cena de vergonha de Serafina — a vez em que ela se abriu e recebeu
   exatamente o que temia. (`06`)
2. Idade de Aldric: portador atual, ou vampiro de séculos que já viu
   ciclos anteriores?
3. Guardiões — entram no Cap. 4 ou saem do canon?
4. O Cap. 11 muda de nome? "O Florescimento" ficou impreciso.

---

## Próximas leituras, por valor

1. **Corbett cap. 9** (contradições) e **11–14** (biografia por cenas) —
   maior retorno restante.
2. **Finley cap. 12** — tamanho de sprite, senso de lugar. Serve ao
   manifesto.
3. **MWA** — quase inteiro por ler.
4. **Frey cap. 14** — tabus do gênero.
5. **Zinsser Parte II** — unidade, o lide e o final.
6. **Kristoff** — a moldura que atravessa a obra, e prosa gótica em
   português.
7. **Peters** — romances inteiros, para a cadeia de sussurro numa
   comunidade fechada.
8. **Kenworthy** — precisa de reextração; o PDF veio com as palavras
   coladas.
