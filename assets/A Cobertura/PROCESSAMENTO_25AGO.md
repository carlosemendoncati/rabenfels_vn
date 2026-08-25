# A Cobertura — processamento da entrega de 25/08/2026

## Pastas mantidas

- `entrega_25ago/`: entrega que sofreu a passada acidental de alfa. Mantida
  somente como fonte histórica; o jogo não lê esta pasta.
- `entrega_25ago_pronta/`: 56 PNGs restaurados e limpos, sem pixelização
  adicional. É a fonte usada por `tools/cobertura_assets.py`.
- `entrega_25ago_pixel/`: os mesmos 56 PNGs depois de PixelIt e paletas.
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

## Pendências de arte

### Relógio de serviço — horário incompatível

- Uso: corredor de serviço, nos dois atos, junto do ponto `relogio`.
- O arquivo entregue marca 10:00; o texto canônico marca 11:40.
- Aparência: o mesmo relógio de serviço já entregue, alterando somente os
  ponteiros para onze e quarenta.
- Perspectiva: frontal, para parede.
- Dimensão: 100 × 140 px.
- Formato: PNG RGBA, fundo transparente real.
- Animação: nenhuma.
- Variações/direções: uma única imagem.

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

### Armário aberto — ainda pendente

- Uso: escritório de serviço, fase 1, depois da virada do percurso.
- Aparência: o mesmo armário de duas portas de `armario_selado.png`, com
  o lacre rompido, as portas abertas, três pastas caídas diante dele e a
  marca limpa de uma quarta pasta ausente.
- Perspectiva: frontal levemente elevada, igual à peça fechada.
- Dimensão: até 180 × 280 px, mantendo a base e a escala da versão atual.
- Formato: PNG RGBA, fundo transparente real.
- Animação: nenhuma.
- Variações/direções: uma imagem, sugerida `armario_aberto.png`.

`cama_servico.png`, portas e rastros estão prontos, mas ainda não receberam
posição ou comportamento documentado no mapa. Eles não foram colocados por
suposição.
