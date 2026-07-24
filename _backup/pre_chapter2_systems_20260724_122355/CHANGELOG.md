# Changelog

## Refatoração — Prólogo e Capítulo 1

### Arquitetura

- VN monolítica (1 arquivo, 1,4 MB, 13 sprites em base64 inline) dividida em
  `index.html` + `css/` + `js/` + `assets/`. Original preservado em
  `_backup/arquivo_rabenfels.original.html`.
- Criado `js/config.js` como manifesto único: caminhos, personagens, cores de
  nameplate, backgrounds, BGM, SFX, timings. Nenhum caminho de asset fora dele.
- Roteiro separado do renderer: `js/data/*.js` contém só dados,
  `js/engine.js` contém só apresentação.
- Scripts clássicos, sem módulos ES — abre em `file://` sem servidor.
- Sprites base64 extraídos para `assets/characters/*/` como PNG.

### Bugs corrigidos

- **Skip do typewriter truncava o texto.** `skipType()` usava
  `textcont.textContent` (o texto parcial) como fonte da versão "completa";
  pular no meio de uma frase congelava a frase pela metade. O texto completo
  agora fica guardado à parte e o skip escreve ele.
- **Escolha não fazia nada.** Os três botões chamavam `runNext()` idêntico:
  nenhuma flag, nenhuma resposta diferente. Agora cada opção grava estado em
  `RBF.STATE.flags` e injeta uma consequência imediata própria.
- **Cursor `▼` era um nó dentro do texto**, o que fazia `textContent` incluir o
  caractere e contaminava a lógica de skip. Virou pseudo-elemento CSS.
- **`hideAll()` recriava `#choice-prompt`** e invalidava a referência guardada
  em `const choicePrompt`. Referência morta removida.
- **Sem tratamento de asset ausente.** `img.src = SPRITES[ch][ex]` com
  expressão inexistente resultava em `undefined` e ícone de imagem quebrada.
- **Sem `preventDefault` no `Espaço`**, que rolava a página.
- Durações de transição estavam fixas no código; foram para `CONFIG.timing`.

### Sistemas adicionados

- **Fallback de asset:** background sem arquivo cai em gradiente CSS calibrado
  por cena; personagem sem arquivo vira silhueta SVG gerada em runtime ou some;
  expressão inexistente cai para `fallbackExpression`. Cada id ausente é
  registrado uma vez em `RBF.Assets.report()`, sem spam de console.
- **Flag `available` por asset:** enquanto `false`, o engine não faz requisição
  de rede. Zero 404 antes da arte existir.
- **Áudio:** BGM com crossfade, SFX one-shot, volume por faixa, desbloqueio na
  primeira interação (política de autoplay), arquivo ausente = silêncio.
- **Teclado:** `Espaço`, `Enter`, `→`, `PageDown` avançam; `1` `2` `3` escolhem.
- **Validação:** `tools/validate.js` roda a VN em jsdom e percorre os três ramos.
- **Encoding:** `tools/escape.js` normaliza o roteiro para ASCII puro.

### Narrativa — Prólogo

- Reconstruído como sequência dramática em seis cenas, com escalada:
  pacote → leitura → gêmeas → experimentos → predecessor → última entrada.
- Blocos longos quebrados em beats de 1–3 frases, com pausas, cartões do
  Arquivo e cortes de trilha marcando a virada de cada cena.
- **Reconhecimento de Matheo tornado explícito no beat certo.** No original ele
  lia "uma vez, o suficiente" e o texto dizia que ele reconhecia aquilo. Agora
  o reconhecimento é concreto: ele assinou a autorização de campo em quarenta
  minutos e não releu o dossiê. Consistente com o canon — a Ordem já tinha
  perdido um agente em Nidhaus e ele sabia.
- **Colapso sensorial antes da vela:** o vento para, a cera para de estalar,
  sobra a respiração. O mundo é retirado uma camada por vez antes do apagão.
- Corte de trilha usado como pontuação: a música morre em "Encontraram" e
  de novo em "Você sabia?".
- Sprites de Matheo previstos em três estados (`neutral`, `read`, `hollow`).

### Narrativa — Capítulo 1

Seis cenas conectadas, cada uma com propósito dramático, beat de entrada,
progressão e linha de saída:

1. **Estrada da Marca Cinzenta** — método de Antoniette. Saída: a criança que
   não acena.
2. **Portão / Fenn** — Saída: ele responde uma pergunta que ela não fez.
3. **Salão / Serafina** — Saída: a ausência de Aldric registrada como informação.
4. **Quarto / primeiras notas** — Saída: a corrente continua parada.
5. **Biblioteca / Aldric** — Saída: a hipótese riscada que continua sendo a mais
   provável.
6. **Corredor / Klara e Liara** — Saída: Klara sabe que tem alguém na porta e
   não diz nada.

Mudanças de conteúdo:

- **Fenn ganhou função dramática.** Era só um nome que recitava informação de
  serviço. Agora explica o pátio sem ter sido perguntado — economia, competência
  e vigilância na mesma linha, sem virar alívio cômico.
- **Serafina ganhou a segunda camada exigida pelo canon.** Ela sabe quem
  Antoniette é desde esta cena. A fala "leio um documento até parar de encontrar
  coisa nova nele" descreve o método da própria Antoniette e só é legível numa
  segunda leitura.
- **Assimetria das gêmeas construída em diálogo**, não em narração. O trecho do
  "dia de treino" faz três coisas de uma vez: normaliza o horror (a família
  chama de treino), mostra Liara notando o fato sem tirar conclusão, e mostra
  Klara encerrando o assunto com uma palavra.
- **Primeira escolha passou a ter consequência imediata distinta por opção**, com
  flags preservadas para os capítulos futuros. A opção C mostra o caderno sem
  identificação sendo aberto e guardado sob o forro do baú — origem literal do
  Arquivo.
- Narração que descrevia ação visível foi cortada; repetição parafrástica foi
  cortada; frases de efeito sem função dramática foram cortadas.

### Conflitos entre o briefing e o canon — resolvidos pelo canon

1. **Vozes das gêmeas.** O briefing pede Klara direta e aberta, Liara mais quieta
   e indireta. O documento mestre define o oposto: *"Liara: extrovertida,
   sociável, observadora mas linear. Klara: introvertida, analítica, observação
   paralela — multifocal."* Mantido o canon. A abertura perturbadora de Klara
   aparece no conteúdo do que ela diz, não no volume.
2. **Semântica da opção A.** O briefing chama A de "interpessoal/emocional"; o
   canon define A como distância operacional mantida. Mantida a definição
   canônica; a carga emocional foi para a consequência imediata — ela lacra o
   envelope e continua com a pergunta.

### Auditoria de continuidade

Verificados: cronologia Matheo/Antoniette (recrutamento aos 17, oito anos de
relação, noventa dias de ponto morto, três de atraso); a transição de cinco
anos; autoria e cronologia do Arquivo (documento diegético, póstumo, última
entrada na véspera da fuga); Serafina sabendo desde o primeiro encontro; a
seção nordeste do segundo andar e a porta nordeste do pátio como referências
distintas e ambas presentes; apresentação e distinção das gêmeas; grafia de
todos os nomes; terminologia estabelecida (Khar'Vel, a Ancestral, câmara do
casulo, o florescimento, a transição, Marca Cinzenta, Velha Nidhaus, Ordem dos
Olhos Cinzentos); ausência de revelação antecipada — a natureza real dos
experimentos, o conhecimento de Serafina, o predecessor e a origem de Maren
continuam fora do alcance do jogador no Capítulo 1.

Linha final preservada literalmente:
*"Primeiro ano em Velha Nidhaus. / Quatro ainda virão."*
