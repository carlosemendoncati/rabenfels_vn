# Estudo das Referências — índice

**Leia este arquivo primeiro.** Os outros são o detalhe.

Corpus em `REF/` (fora do git). Texto extraído em `REF/_txt/`.
Ferramentas: `tools/refextract.py`, `tools/refslice.py`, `tools/desgruda.py`.

---

## Estado da leitura — **reaberto em 24/08/2026**

O corpus esteve fechado em 11 títulos. Reabriu quando a obra passou de
quatro para nove finais: faltava fundamento para **tragédia como forma** e
para o **registro documental de primeira pessoa**. Entraram 12 e 13.

| # | Livro | Situação |
|---|---|---|
| 01 | Murphy, *The Plot Dot* | integral |
| 02 | Finley, *Branching Story, Unlocked Dialogue* | **integral** — cap. 1–13 |
| 03 | Frey, *How to Write a Damn Good Mystery* | **integral** |
| 04 | Squarisi & Salvador, *A Arte de Escrever Bem* | **integral** |
| 05 | Zinsser, *Como Escrever Bem* | **integral** — Partes I–IV |
| 06 | Corbett, *The Art of Character* | cap. 4,5,7,8,9,10,11,21,23 |
| 07 | Cavallaro, *Anime and the Visual Novel* | prefácio, cap. 1–5 (teoria) |
| 08 | MWA, *How to Write a Mystery* | Rules + Craft integrais |
| 09 | Kenworthy, *Writing SF, Fantasy & Horror* | **integral** |
| 10 | Kristoff, *Império do Vampiro* | amostragem dirigida — moldura |
| 11 | Peters, *Brother Cadfael* | amostragem dirigida — comunidade fechada |
| 12 | Ishiguro, *Não Me Abandone Jamais* | **integral** — as tres partes |
| 13 | Steiner, *A Morte da Tragédia* | **integral** — cap. 1-10 |

Os tres ultimos foram lidos **por alvo declarado**, não de capa a capa.
Cavallaro e Corbett têm estudos de caso e exercícios que não transferem.

**12 e 13 foram relidos integralmente em 24/08/2026**, a pedido do autor,
depois de uma primeira passagem por amostragem. A leitura completa mudou as
duas notas: no Ishiguro revelou que a Galeria e o adiamento são mentira e que
a revelação vem de uma velha gentil, não de um vilão; no Steiner revelou o
capítulo sobre **tragédia em prosa** e a frase que defende o registro deste
projeto melhor que qualquer outra do corpus. Ainda assim, em ambos a parte
util e pequena e esta marcada no aviso de utilidade de cada nota.

**Steiner exigiu conserto antes de ler.** As ligaduras tipográficas tinham
sido extraídas para o bloco de uso privado do Unicode, furando as palavras
(`tragie`, `leerario`, `Esilo`). Sete códigos identificados por contexto e
restaurados; texto limpo em `steiner_limpo.txt`. Detalhe em `13`.

---

## As regras de confiança alta

Onde fontes independentes convergem. **Prevalecem sobre gosto.**

### R1 · Explicar mata
Corbett (McKee: "quanto mais prende a motivação a causas específicas, mais
diminui o personagem") · Kenworthy ("melhor sugerir que ser direto") ·
Cavallaro (*sabi*, a vista parcialmente encoberta) · documento mestre.
**Fazer:** nunca explicar o motivo de Carmine. → `06` `07` `09`

### R2 · Pensar antes; começar pelo fim
Frey · Finley · MWA (Rae Franklin James) · Squarisi · Zinsser.
**Fazer:** escrever o Epílogo antes de continuar o meio. → `02`–`05` `08`

### R3 · Toda cena termina em virada
Frey (*endlines*) · Murphy (loops abertos) · Zinsser (a última frase do
parágrafo é o trampolim).
**Fazer:** cada beat é micro-cena. Cap. 1 tem 5 socos contra 3 pontes.

### R4 · Detalhe sensorial no lugar de adjetivo
Finley · Zinsser (advérbio que repete o verbo) · Squarisi · **Kenworthy,
que dá exemplo por sentido** e é a melhor fonte disto.
**Fazer:** auditoria sensorial do Cap. 1. Som, cheiro, tato e temperatura
estão ausentes. → `09` primeiro

### R5 · Forma positiva
Squarisi, preceito 3 · pesquisa de antipadrões.
**Fazer:** já detectado por `validate.py`. Teto de 1 por capítulo.
**Cuidado:** o par `não…mas` é português legítimo; o proibido é a fórmula
"não é X: é Y" como muleta de ritmo. → `04`

### R6 · Vulnerabilidade vence simpatia
Frey ("'amável' não está na lista") · Corbett · Kenworthy ("vítimas dão
personagens chatos").
**Fazer:** Antoniette não é doce. Klara não é vítima. → `03` `06` `09`

### R7 · Nada de atributo cristalizado
Cavallaro · Corbett (Tirania do Motivo) · regra 9 do `CLAUDE.md`.
**Fazer:** Klara fala pouco porque é criança que fala pouco.

### R8 · Contra o metrônomo — **cinco fontes**
Zinsser (parágrafo nanico "com ar de superioridade") · Squarisi (frase
harmoniosa) · Kenworthy (sub-escrever: "ela fez isso, depois aquilo") ·
**Faye ("seja audacioso com o estilo, seja simples com as frases, só não
faça nenhuma das duas o tempo todo")** · Peters, pelo contraste.
**Medido:** média de 35 caracteres por frase, máximo 103, zero variação.
**Fazer:** alternar é obrigação. Uma frase longa e desnorteada no clímax.

### R9 · O Arquivo erra por omissão e ênfase, **nunca por invenção**
Corbett, cap. 23 ("não é que o texto seja inteiramente não confiável —
muito pelo contrário") · Zinsser ("uma única afirmação falsa e tudo o que
vier depois fica suspeito") · **Peters dá o mecanismo: *diziam alguns*.**
**Fazer:** atribuição vaga como forma honesta de registrar o não
confirmado. → `06` `05` `11`

### R10 · Red herring não se planta — **encerrado, três fontes**
Frey ("é quando autores jogam um red herring que os enredos começam a
feder") · Crombie ("não planejo pistas falsas; elas fluem das suposições
que as personagens fariam") · minha correção.
**Fazer:** dar agenda própria a cada criado. O falso rastro nasce. → `03` `08`

### R11 · A tragédia não admite troco — **nova em 24/08/2026**
Steiner ("um só aceno a uma teologia que ofereça o Paraíso como prêmio é
fatal ao herói trágico"; "a necessidade é cega, e quem a encontra fica sem
a vista") · e a distinção que decide tudo: catástrofe por **culpa moral
específica** é parábola, não tragédia.
**Fazer:** nenhum dos nove finais pode pagar o jogador — nem com salvação,
nem com lição, nem com a satisfação de ter jogado certo. **Compreender não
salva:** em A Testemunha ela sabe o nome e diz o nome, e o ar esquenta do
mesmo jeito.
**Não fazer:** final em que ela morre *porque errou*. Ver a crítica a
A Dívida e a O Livro-Razão em `13`. → `13`

> **Aplicado em 24/08/2026.** A Dívida: a cadeia causal ficou e o mérito
> saiu — Carmine desmonta os onze minutos em voz alta, sem explicar, e a
> conta continua fechando na página 287 e continua errada. O Livro-Razão:
> o documento completo virou a punição — o tribunal julga improcedente por
> ausência de terceiro lesado, a Ordem arquiva o material como exemplar, e
> a apostila leva o nome dela no índice.

### R12 · A emoção vai para o ofício, não some — **nova em 24/08/2026**
Ishiguro (Kathy abre o livro com métrica de desempenho — "quase exatos doze
anos de serviço" — e se gaba: "talvez eu esteja me vangloriando um pouco").
**Fazer:** Antoniette não se contém. Ela fica **satisfeita com a qualidade
do registro**. O horror sobe quando o orgulho é sincero.
**Corolário — o léxico faz o trabalho pesado:** `conclui` no lugar de morrer,
e um formulário impresso de pêsames. Rabenfels já tem `entrada`, `sujeito`,
`duração estimada`; falta o formulário. → `12`

> **Aplicado em 24/08/2026.** O orgulho sincero está no Livro-Razão — *"A
> duração estimada da 160 errou por vinte e seis minutos. Esta não vai
> errar por vinte e seis."* — e a classificação do erro de idade de Klara
> como *"dentro da margem"* é o léxico fazendo o trabalho pesado. O fecho
> do Ishiguro (permitir uma lembrança, cortar no meio, voltar ao trabalho)
> está na Vigília, na folha com a palavra *Índice* e mais nada, e na Casa
> Vazia, na borboleta que entra pela janela do arquivo.
>
> **O formulário continua faltando.**

---

## Descobertas que mudam categoria

**A obra é thriller no eixo causa→efeito, não whodunnit.** Todorov via
Cavallaro: curiosidade vai de efeito a causa; suspense vai de causa a
efeito. O Prólogo entrega a causa. Nyren, na MWA, confirma pelo outro
lado: mistério pergunta "quem fez"; thriller pergunta "o que acontece
agora". **Rabenfels pergunta "o que acontece agora" sabendo a resposta.**

**A arquitetura tem nome: "interatividade superposta"** (Szilas via
Cavallaro) — percurso global linear com cenas interativas localizadas.
Encerra a dúvida sobre ramificar pouco. Não ramifica pouco; usa o outro
recurso.

**O roteiro é partitura, não obra.** Poremba: a agência do autor é
"instanciada pelo jogador"; a relação é a do compositor com o intérprete.
Consequência dura: **toda frase precisa sobreviver a três velocidades de
leitura.**

**O método Talese resolve Carmine.** Talese nunca entrevistou Sinatra;
construiu o perfil pelo entorno. Antoniette nunca fala com a entidade.
"Bons perfis dependem mais do repórter que do personagem."

**Numa VN, só a voz distingue um secundário.** Craig Johnson: "você só
descreve uma personagem uma vez, mas ela fala o livro inteiro". Numa VN a
descrição *é* o sprite. Tudo o mais é voz.

**Antoniette é "a introdução do inocente"** (Johnson) — o ponto de acesso
do jogador a um ambiente altamente contextualizado. Por isso **ela precisa
não entender coisas em voz alta.** Competência constante quebra a função.

---

## As duas críticas sérias ao projeto

**1. O risco do peão no tabuleiro — Lee Child.**
> "Se um autor conduz o protagonista a uma revelação planejada na página
> 300, ele arrisca tornar as 299 páginas anteriores menos naturais.
> Personagens podem ficar menos parecidas com gente e mais parecidas com
> peões num tabuleiro."

Rabenfels tem o fim fixado no canon. **É o modo de falha padrão desta
estrutura.** Teste prático: **em cada capítulo, alguém tem de tentar algo
que poderia ter dado certo.**

**2. A obra não tem uma linha de humor — Faye.**
> "Escritores que levam a própria voz a sério demais, sem aquela pitada de
> autodepreciação ou crueldade esperta, raramente terminam com um
> resultado memorável."

Saída provável sem trair o tom: **crueldade esperta na linguagem da casa.**
"A cozinha fecha às oito porque ninguém tem fome depois das oito" já é
essa piada. **Pergunta aberta ao autor.**

---

## Onde eu discordo dos livros

| Livro | Diz | Rabenfels faz | Por quê |
|---|---|---|---|
| Frey, Murphy | não abra com prólogo | o Prólogo é a obra | falam de prólogo como muleta; aqui é a moldura |
| Frey | 5 atos, "a razão vence o mal" | quebra os atos III–V | a obra nega essa premissa |
| Squarisi | use a tríade | proibida na narração | permitida só no cartão do Arquivo |
| Zinsser | seja você mesmo, use o "eu" | voz notarial construída | o que transfere é "nada de peruca" |
| Cavallaro | multiperspectivalismo | ponto de vista único | o Arquivo é limitado porque ela era |
| Kristoff, Peters | ornamento gótico / período longo | frase curta e seca | é o registro-padrão do gênero em português, e a obra ganha por recusá-lo |

---

## Defeitos medidos no que já está escrito

| Defeito | Medida |
|---|---|
| favoritismo de ramo | C é sempre o mais longo (11 beats x 8 x 7) **e é a rota do final verdadeiro** |
| `aldric_pressed` | gravada, nunca lida |
| endlines | 5 socos, 3 pontes no Cap. 1 |
| sensorial | visão em quase todo beat; som, cheiro, tato ausentes |
| metrônomo | média 35 caracteres, zero variação |
| topo de cena | C1 abre com 4 beats de paisagem |
| stepsheet / gráfico de fios | **não existe** |
| Antoniette não insiste | aceita a primeira recusa — e o recuo não é mostrado como decisão |
| registro único | fala igual com Fenn, Serafina e Aldric |
| criados | atmosfera; nenhum faz exigência ou oferece barganha |
| cena pivô | não existe; Ato III não muda a psicologia dela |
| humor | zero |
| beat de uma palavra | nunca usado |

---

## Fila de ação

### Destrava a escrita nova
1. **Gráfico de fios da Crombie** — sete colunas (investigação, Antoniette
   e Klara, Klara e Liara, a casa reagindo, calendário, Matheo, cobertura),
   topo e fim preenchidos, um marcador por incidente. **Substitui o
   stepsheet do Frey como ferramenta principal.**
2. **Escrever o Epílogo.**
3. **Blocos *offstage* alternados** no formato do Frey: cada bloco reage ao
   que o jogador acabou de ver.
4. **Três cenas de esboço por personagem** (Corbett cap. 11): vergonha,
   conflito fora do enredo, trabalho. Substituem as fichas estáticas da
   bíblia.
5. **Fechar as decisões pendentes** da bíblia.

### Correções no que existe
6. Auditoria sensorial do Cap. 1, pelo método do Kenworthy.
7. Equilibrar os ramos A/B/C.
8. Fazer `aldric_pressed` ser lida.
9. Cortar o topo das cenas até onde a voz entra; **olhar para o lado** —
   não a estrada, o que a estrada fez com quem viajou nela.
10. Um detalhe específico e contraditório por criado, em uma frase.
11. Diferenciar o registro de Antoniette por interlocutor.
12. Tornar visível a **decisão de não insistir**, com o preço à vista.
13. Marcar a **cena pivô** (provável Cap. 5) e mudar a personagem depois.
14. Frase longa e desnorteada no clímax; beat de uma palavra em algum
    lugar; **fechar nas borboletas** no Epílogo.
    *Parcial: a Casa Vazia fecha nas borboletas.*
15. Notas do Compilador como **sistema**: Antoniette discutindo com
    Antoniette, no lugar do ouvinte que a obra não tem.
16. **"Diziam alguns"** — atribuição vaga no Arquivo.
17. Antoniette **ouve de fora** pelo menos uma vez por capítulo.

### Motor e manifesto
18. **Traço de variáveis no smoke test** (método Clough): por partida, cada
    flag ligada e cada movimento de rota, com o beat de origem.
19. **Estado físico separado de expressão** no manifesto — curativo, roupa,
    cabelo não são emoções.
20. **Variante de estado nos cenários** — o mesmo lugar depois que ela
    sabe. Três fontes pedem isto.
21. Variantes de hora e estação (cinco anos, três agostos).
22. Função + associação por cenário, com **um objeto que só a associação
    explica**.
23. Modo `???` e timbre de texto por personagem.

### Validador — checagens novas, todas mensuráveis
24. **Chavões em português** (lista dos "mesmeiros" da Squarisi).
25. Ponto de exclamação fora da fala de Liara.
26. Qualificativos fracos: "um pouco", "meio", "uma espécie de", "um
    tanto", "bastante", "quase", "de certa forma".
27. Advérbio em `-mente` que repete o verbo.
28. `e que` sem o primeiro `que`; `à medida em que`; pares partidos
    (`seja…ou`, `de…à`, `de…às`); gerundismo (`vou estar` + gerúndio).
29. Plural indevido de parte única do corpo.
30. **Clichê físico de medo** — coração disparado, arrepio na nuca,
    estômago afundando. É o substituto óbvio da afirmação direta.

### Experimentos
31. Cortar uma cena em 50% e comparar (Zinsser).
32. **Jogar o Cap. 1 no motor, clicando** — nunca foi feito. Olhos
    diferentes dos de quem lê o arquivo de dados.
33. Ler em voz alta procurando eco e cacofonia — **tarefa do autor**.
34. Escandir as frases que precisam ficar.

---

## Perguntas abertas ao autor

1. **O humor.** A obra não tem nenhum, e a MWA diz que isso custa. Aceita
   crueldade esperta na linguagem da casa?
2. A cena de vergonha de Serafina.
3. Idade de Aldric — portador atual, ou vampiro de séculos?
4. Guardiões: entram no Cap. 4 ou saem do canon?
5. O Cap. 11 muda de nome?
