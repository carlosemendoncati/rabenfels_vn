# A Cobertura — processamento da entrega de 25/08/2026

## Pastas mantidas

- `entrega_25ago/`: entrega que sofreu a passada acidental de alfa. Mantida
  somente como fonte histórica; o jogo não lê esta pasta.
- `entrega_25ago_pronta/`: 56 PNGs restaurados e limpos, sem pixelização
  adicional. É a fonte usada por `tools/cobertura_assets.py`.
- `entrega_25ago_pixel/`: os mesmos 56 PNGs depois de PixelIt e paletas.
- `mapas_gerados/`: as sete plantas novas em alta resolução, antes da
  adaptação e da paleta do jogo. Os prompts usados estão documentados na
  própria pasta.
- `assets/cobertura/`: recortes finais usados pelo jogo.

Os intermediários e as auditorias descartadas foram movidos para
`_backup/cobertura_intermediarios_20260825_065633/`. Nada foi apagado.

## Regras da esteira

1. `cobertura_restaura.py` nunca grava na origem.
2. `cobertura_fundo.py --pasta` corta folhas por quadro e grava em outra
   pasta. Imagem que já possui alfa real não volta para a rede.
3. Preto transparente nunca é tratado como amostra de fundo.
4. `cobertura_pixel.py --pasta` usa uma paleta para o mundo e uma paleta
   própria para cada personagem.
5. O runtime continua sendo gerado na ordem: recortar, limpar, pixelizar.

## Peças complementares

### Relógio de serviço — gerado e integrado

- Uso: corredor de serviço, nos dois atos, junto do ponto `relogio`.
- A referência entregue marcava 10:00. A versão integrada preserva o corpo
  do relógio e altera os ponteiros para o horário canônico de 11:40.
- Perspectiva: frontal, para parede.
- Dimensão: 100 × 140 px.
- Formato: PNG RGBA, fundo transparente real.
- Animação: nenhuma.
- Variações/direções: uma única imagem.
- Fonte limpa: `gerados_limpos_final/relogio_servico_1140.png`.
- Runtime: `assets/cobertura/props/relogio_servico.png`.

### Gancho de chaves vazio — entregue e integrado

- Uso: corredor de serviço, fase 1, depois que a casa muda.
- Aparência: a mesma placa do `gancho_chaves.png`, com os seis ganchos e
  nenhuma chave.
- Perspectiva: frontal, para parede.
- Dimensão: 90 × 70 px, preservando escala e alinhamento da versão atual.
- Formato: PNG RGBA, fundo transparente real.
- Animação: nenhuma.
- Variações/direções: estado adicional integrado como
  `assets/cobertura/props/gancho_vazio.png`.

### Moldura ocupada do corredor — entregue e integrada

- Uso: corredor de serviço, fase 1. Na fase 0 a moldura está vazia; depois
  deixa de estar, mas Antoniette não se aproxima o bastante para reconhecer
  o conteúdo.
- Aparência: a mesma moldura envelhecida de `moldura_vazia.png`, contendo uma
  imagem escura e indistinta. Não usar o retrato da governanta: ele pertence
  ao salão e revelá-lo aqui mudaria a informação da cena.
- Perspectiva: frontal, para parede.
- Dimensão: 120 × 150 px.
- Formato: PNG RGBA, transparente fora da moldura; o interior deve ser opaco.
- Animação: nenhuma.
- Variações/direções: estado adicional integrado como
  `assets/cobertura/props/moldura_ocupada.png`; a fase 0 usa
  `moldura_vazia.png`.

### Armário aberto — gerado e integrado

- Uso: escritório de serviço, fase 1, depois da virada do percurso.
- Aparência: o mesmo armário de duas portas de `armario_selado.png`, com
  o lacre rompido, as portas abertas, três pastas caídas diante dele e a
  marca limpa de uma quarta pasta ausente.
- Perspectiva: frontal levemente elevada, igual à peça fechada.
- Dimensão: até 180 × 280 px, mantendo a base e a escala da versão atual.
- Formato: PNG RGBA, fundo transparente real.
- Animação: nenhuma.
- Variações/direções: uma imagem, sugerida `armario_aberto.png`.
- Fonte: `armario_aberto.png`.
- Runtime: `assets/cobertura/props/armario_aberto.png`.
- O mapa usa o armário selado na fase 0 e este estado aberto na fase 1.

## Sete mapas novos — gerados e integrados

Os mapas anteriores repetiam a mesma sala vazia e não davam função visual
aos objetos. Eles foram substituídos por plantas diferentes, ainda na mesma
perspectiva ortográfica elevada e na paleta quente/desaturada da Cobertura:

| Fonte em `mapas_gerados/` | ID do jogo | Dimensão no runtime | Função |
|---|---|---:|---|
| `quarto.png` | `sala_a` | 1301 × 1075 | dormir, escrever e esconder o caderno |
| `corredor.png` | `corredor` | 1963 × 529 | circulação administrativa e mudança de fase |
| `escritorio.png` | `sala_d` | 1344 × 932 | conferir livro, gavetas e armário |
| `escada.png` | `escada` | 903 × 1428 | dois patamares ligados por um único vão |
| `copa.png` | `sala_b` | 1417 × 932 | mesa de serviço, pia e rota do carrinho |
| `camara.png` | `sala_c` | 1249 × 994 | aro mecânico central para o cilindro |
| `salao.png` | `salao` | 1402 × 910 | corredor fatal até a porta do pátio |

`tools/cobertura_assets.py` redimensiona cada fonte para a medida histórica
do respectivo mapa. Depois, `tools/cobertura_pixel.py` aplica a paleta única
do mundo. Assim, as coordenadas continuam em pixels de mapa e os originais de
alta resolução não são degradados por execuções sucessivas.

A cama de serviço, a porta fechada e os quatro rastros receberam posição e
comportamento. Não resta peça específica pendente para as cenas e mecânicas
documentadas.
