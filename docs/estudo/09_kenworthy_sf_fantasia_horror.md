# Kenworthy, *Writing Science Fiction, Fantasy & Horror* — leitura

How To Books, 1997. 114 páginas. Manual britânico de oficina, com
checklist, estudos de caso e pontos de discussão ao fim de cada capítulo.

**Lido: o livro inteiro.** É o menor do corpus.

---

## Nota técnica: o PDF não tinha espaços

A extração vinha assim: `Ifyouwanttobeasciencefictionwriter`. O PDF foi
gerado sem codificar o caractere de espaço, então nenhuma ferramenta de
extração ia resolver.

Solução: `tools/desgruda.py`. Monta um dicionário de frequência a partir
dos **outros livros em inglês do próprio corpus** — Corbett, Frey, Finley,
Cavallaro, MWA, Peters, 83.603 palavras distintas — e resegmenta por
programação dinâmica (Viterbi), escolhendo o corte de menor custo. Saída
em `REF/_txt/kenworthy_limpo.txt`.

Ficou legível. Pontuação sem espaço depois da vírgula e alguns nomes
próprios partidos (`Ken worthy`, `Cather ine`), o que não atrapalha a
leitura.

---

## Aviso de utilidade

Metade do livro é sobre **ficção científica** — construir planetas,
tecnologia plausível, alienígenas, viagem interestelar. Não serve.
A outra metade é **descrição, percepção e estilo**, e essa é excelente e
mais concreta que a de qualquer outro livro do corpus, inclusive Zinsser,
porque dá exemplo em vez de regra.

Também tem uma seção final sobre vender para editoras britânicas em 1997.
Morta.

---

## 1. O que é horror, segundo ele

> "Ficção de horror é sobre **passar por baixo da superfície das coisas.**
> O jeito fácil é rasgar a pele e soltar um jorro de sangue e cartilagem.
> Isso pode ser duvidosamente divertido, mas é **raso e breve.** O melhor
> jeito de o horror nos afetar é **passar por baixo da superfície de uma
> personalidade.**"

> "Poderia-se dizer que toda ficção quer lidar com a verdade, mas **o
> horror é a ficção da honestidade total.** O horror nos mostra a nossa
> própria mortalidade e falta de controle. Faz a gente admitir as
> fraquezas e as emoções mais secretas."

---

## 2. A regra da sugestão — e o exemplo que a torna concreta

> "Escrita de horror funciona melhor **subestimada.** Seja gore ou
> pesadelo, **é melhor sugerir do que ser direto demais.** Muitos
> iniciantes descrevem jorros de sangue e ossos lascando em detalhe
> elaborado. Isso **não tem credibilidade** e não impressiona ninguém."

E o exemplo, que é o melhor argumento de horror por ausência que li:

> "Se alguma coisa está mordendo o seu pescoço, **o que é mais
> assustador: o sangue, que você na verdade não consegue ver, ou a dor
> em picada e a respiração encharcada em volta do seu rosto?**"

*O argumento não é de contenção. É de **posição do observador.** Do
pescoço, não dá para ver o sangue. Descrever o sangue é descrever de fora,
de onde a personagem não está. O horror mora no que ela consegue perceber
da posição em que está presa.*

**Aplicação imediata em Rabenfels:** a câmara. Antoniette não vê a coisa.
Ela sente a temperatura, ouve o que a sala faz com o som, e sai. Escrever
a partir de onde ela está — e não de onde a câmera estaria.

### A armadilha dentro da regra

Kenworthy fecha o cerco e este é o parágrafo mais útil do livro:

> "Se a sua personagem está com medo, você poderia dizer 'John estava com
> medo, estava realmente assustado' — mas isso não funciona bem. **Melhor
> mostrar a experiência física do medo:** 'John sentiu o coração bater
> contra as costelas e o estômago liquefazer.' **Isso funciona, mas o
> problema é que é um clichê de horror.** Então, embora você deva evitar
> afirmações diretas, **fique atento para não cair no clichê.**"

**Duas proibições, não uma.** Proibido dizer que estava perturbador —
regra 7 do autor. **E proibido o substituto padrão**: coração disparado,
estômago afundando, arrepio na nuca, pelos do braço. É a saída óbvia, e
por isso é a saída de todo mundo.

*O que sobra é o terceiro caminho, que é o que a obra já faz nos melhores
momentos: **o detalhe errado no ambiente**, sem reação declarada. A moldura
vazia. O cano da fonte virado para baixo. Antoniette não sente nada; ela
anota.*

### Deslocar levemente o real

> "A chave para uma história bem-sucedida é **pegar a realidade e
> deslocá-la levemente.** Ver formas escuras se mexendo no canto do olho
> num estacionamento, enquanto você corre para abrir a porta do carro, é
> **mais assustador do que ver um vampiro passar batendo asas entre as
> árvores.**"

> "Ainda há espaço no horror para histórias ocasionais de vampiro e
> monstro, **se tiverem um ângulo verdadeiramente original**, mas a maior
> parte do horror lida com **as coisas comuns que nos assustam.**"

*Rabenfels tem vampiros, então está sob a cláusula do "ângulo original", e
o ângulo é este: a família trata o sobrenatural como **procedimento
administrativo**. O vampiro não é o horror; a planilha é.*

### Vítima não é personagem

> "Para o medo funcionar, **as suas personagens têm de ser mais do que
> meras vítimas**, para que o leitor se importe quando o horror as atingir.
> **Vítimas dão personagens chatos.** Embora o horror trate de fraqueza,
> editores não querem histórias em que o único ponto é assistir a alguém
> se assustar e depois morrer. **Faça a história ser relevante para as
> motivações internas da personagem.**"

*Régua para Klara. Ela é a que vai ser consumida, e por isso é a que corre
maior risco de ser escrita como vítima. Tem de querer coisas e tentar
consegui-las — o que bate com a exigência do Corbett de pôr as escolhas
dela em cena.*

---

## 3. Descrição — a parte melhor do livro

### Justaposição

> "Uma das formas mais eficazes de criar um efeito visual marcante é a
> **justaposição.**
>
> *'Constrangida, ela foi até uma das mesas de plástico, **pousando o
> narciso ao lado de um vidro de molho meleca.**'*
>
> Ao pôr algo frágil e bonito ao lado de algo banal, **cada objeto ganha
> mais impacto visual** e uma atmosfera específica é criada."

*Nome técnico para o que o documento mestre já pede: o bordado fino sobre
a mesa de aço da câmara.*

### Quando descrever

> "**Nunca descreva por descrever;** use a descrição quando a história
> ficaria chapada sem ela, quando a história exige que o leitor perceba
> **mais do que a situação ou o diálogo já implicam.**"

### Olhe para o lado

> "Se você descreve um pôr do sol, a descrição óbvia trata das nuvens, do
> sol e da cor do céu. **É mais interessante descrever o efeito do pôr do
> sol na terra em volta** — luz de poente no rosto de alguém, ou o poente
> clareando a paisagem sob nuvens que engrossam."
>
> "**Não olhe direto para o brilho óbvio de uma imagem. Olhe para o lado,
> veja como ela afeta as pessoas.** Quando o sol se põe, a maioria encara o
> sol e fica cega para tudo o que ele ilumina."

*Regra de composição de cena, e é a que falta nos topos de capítulo. O
Capítulo 1 abre descrevendo a estrada. Deveria abrir descrevendo o que
abril faz com as mãos de quem viaja há três dias.*

### Percepção é o ponto inteiro

> "**Percepção é o ponto inteiro da descrição.** O jeito como uma
> personagem percebe a neve, por exemplo, **diz mais sobre ela do que
> sobre a paisagem.** Uma personagem triste vai notar o efeito grudento e
> molhado da coisa, que entra pela narina e pela orelha. Uma personagem
> feliz vai chutar a neve, ou gostar do frio anestesiando dentro da bota."

> "Descrição não é só um jeito de expressar a sua história. É **um jeito
> de descobrir o que está acontecendo com as suas personagens.** Olhe o
> modo como elas veem o mundo e você vai entendê-las melhor."

**Isto casa exatamente com o mecanismo dos óculos de *Tsukihime*, que
Cavallaro descreve, e com a "linguagem de expectativa" de Finley. Três
livros, três tradições, a mesma decisão: o mesmo lugar tem de ser descrito
de outro jeito depois que Antoniette sabe.**

### Misturar, em vez de "fazer descrição"

> "Para uma cena funcionar bem, **misture: pensamento da personagem,
> observação, ação.**"

O exemplo que ele dá tem as três coisas no mesmo parágrafo, sem parar para
descrever. E o comentário:

> "O escritor **não parou para 'fazer um pouco de descrição'.** (...) Ao
> misturar os eventos como uma experiência, fica muito mais realista."

### Descrever sem imagem — a técnica que serve a um jogo sem arte

> "*'Na saída do apartamento da Catherine naquela noite ela me pegou,
> **pendurou os braços no meu pescoço como um cachecol úmido** e fez
> biquinho pedindo um beijo.'*
>
> Não há registro de como os lábios ou os braços dela **de fato se
> parecem**, mas a descrição transmite **como ela apareceu para ele.** Isso
> permite ao leitor **imprimir as próprias imagens** sobre a situação."

**Este é um achado grande para este projeto especificamente.** Rabenfels
roda hoje com silhueta SVG no lugar de sprite e gradiente no lugar de
cenário. A técnica de descrever pela impressão, e não pela aparência,
**transforma a falta de arte em vantagem**: o jogador desenha por cima.

### O sobrenatural descrito com a frieza do rotineiro

> "Quando você escreve sobre uma tecnologia que é **bizarra para o leitor
> mas banal para a personagem**, é sensato **descrever sem muito
> detalhe.**"

**Esta é a regra do ritual Rabenfels, e é exata.** Os exames, a câmara, a
manipulação do sangue da mãe: para a família são procedimento. Descritos
com detalhe, viram espetáculo. Descritos com a secura de quem já fez isso
antes, viram horror.

---

## 4. Os cinco sentidos, com exemplo em cada

> "Em vez de dizer 'estava quente', **descreva o calor numa parte
> específica do corpo.** Calor sentido na cabeça é diferente de sol
> queimando nos braços."

| Sentido | O que ele diz | Exemplo dele |
|---|---|---|
| **som** | quase sempre esquecido; não precisa de metáfora | *"ela mergulhou a colher na xícara, chupou, depois bateu com ela nos dentes."* |
| **paladar** | usar com parcimônia, só se refletir o que acontece com a personagem | *"o gosto de cobre de um sangramento de nariz"* |
| **tato** | "tão subestimado que muitos escritores quase nunca usam" | *"quando acordei foi porque as nuvens tinham coberto o sol e grandes espirros de chuva caíam nos meus braços nus"* |
| **olfato** | **"corta direto para a memória emocional do leitor"** | *"o porão cheirava a livro velho, água suja e planta, mas conforme ela ia entrando **dava lugar a um odor de mofo e pêssego**"* |

*O exemplo do porão é o melhor do livro. "Mofo e pêssego" é o detalhe
errado — mofo é o esperado, pêssego não é, e nada explica o pêssego.*

**Diagnóstico já medido:** o Capítulo 1 de Rabenfels é quase todo visual.
Som, cheiro, tato e temperatura estão ausentes. Este capítulo dá o método
para corrigir, com exemplo por sentido.

---

## 5. Estilo

### O registro do horror

> "No horror, **um estilo subestimado e factual pode ser o mais opressivo e
> assustador.**"

E o exemplo, que é praticamente a voz de Rabenfels:

> *"O sol fazia a minha ressaca latejar, e as frutinhas da sorveira
> pareciam pulsar. Puxei um galho na minha direção, tentando focar. Cada
> fruta escurecia e clareava, latejando no ritmo da minha dor de cabeça.
> Segurei uma entre os dedos e, ao apertar, **senti o estalo de ossinhos.**
> Uma coisa vermelha desceu pelo meu braço."*

*Frase curta, factual, primeira pessoa, sem um adjetivo de emoção. E o
horror entra numa oração subordinada, de passagem: "senti o estalo de
ossinhos". Ninguém comenta. É a régra 7 do autor, executada.*

### Frase curta, e o antídoto contra o metrônomo

> "Se você quer criar excitação, pode usar frases curtas e cortantes. (...)
> **Cuidado com o exagero, porque frases curtas demais frustram o leitor e
> logo viram um recurso óbvio.**"

E a alternativa, que é o achado técnico do capítulo:

> "**Uma alternativa é usar frases longas, que carregam muita ação, do
> ponto de vista de uma personagem desnorteada. Essa sensação de calma
> durante o pânico é realista, e pode ser arrepiante.**"

**Rabenfels tem média de 35 caracteres por frase e nunca inverte.** Uma
frase longa e desnorteada no clímax do Capítulo 11 — depois de dez
capítulos de metrônomo notarial — seria a quebra de padrão mais forte
disponível na obra, e não custa nada.

### Sub-escrever

> "É possível, embora menos provável, que você esteja **sub-escrevendo.**
> Se toda frase for completamente direta, vai acabar soando como **'ela fez
> isso, depois aconteceu aquilo, e depois aquilo.'** Histórias
> sub-escritas soam entediantes, sem a força narrativa que obriga o leitor
> a seguir."

**Quarta fonte independente contra o metrônomo** — depois de Zinsser
(parágrafo nanico), Squarisi (frase harmoniosa) e da minha própria
medição. Não é mais opinião.

---

## O que NÃO transfere

- Tudo sobre ficção científica: alienígenas, tecnologia plausível,
  linguagem de FC, viagem interestelar, mundos.
- O capítulo de venda: mercado britânico, folha de rosto, carta ao editor,
  agentes, 1997.
- "Escolher entre conto e romance."
- Os estudos de caso com os alunos-fictícios Peter, Michael e Ruth. São
  didáticos e não acrescentam técnica nova.

---

## Itens de ação

1. **Auditoria sensorial do Capítulo 1**, com o método dele: um exemplo
   por sentido, sempre ligado à percepção de quem está na cena.
2. **Proibir os dois clichês, não só um.** Nem "era perturbador", nem
   coração disparado ou arrepio na nuca. Acrescentar a lista física ao
   `antipadroes-ia.md`, porque ela é o substituto óbvio e eu vou usá-la.
3. **Descrever o ritual com a secura do rotineiro.** Regra escrita: o que
   é banal para a família recebe pouco detalhe.
4. **O mesmo cenário percebido de outro jeito** depois que Antoniette
   sabe. Terceira fonte na mesma recomendação.
5. **Uma frase longa e desnorteada no clímax.** Quebra de padrão barata e
   forte, aproveitando dez capítulos de frase curta.
6. **Descrever por impressão, não por aparência**, aproveitando que o jogo
   roda com silhueta — o jogador imprime as próprias imagens.
7. **Cortar o topo das cenas e olhar para o lado:** não descrever a
   estrada, descrever o que a estrada fez com quem viajou nela.
8. **Klara não pode ser vítima.** Precisa querer e tentar em cada
   capítulo.
