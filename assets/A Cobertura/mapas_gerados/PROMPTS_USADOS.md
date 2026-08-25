# A Cobertura — prompts dos mapas novos

As imagens desta pasta foram geradas com a ferramenta de criação de imagens
integrada ao Codex em 25/08/2026. Cada mapa antigo foi usado apenas como
referência de proporção, limites e aberturas. O escritório aprovado serviu de
referência de acabamento para manter os sete ambientes no mesmo conjunto.

## Direção comum

> Production-ready 2D game environment map for Arquivo Rabenfels. Strict
> top-down three-quarter orthographic view, dark Victorian service wing,
> hand-crafted 16-bit pixel-art language, dark warm wood and stone, muted
> burgundy, aged brass, low saturation, restrained contrast, old but
> maintained architecture. Preserve the reference map silhouette, aspect
> ratio, walkable-floor boundary and every doorway opening. No characters,
> no text, no UI, no freestanding furniture, no light sources and no baked-in
> interactive props. Leave clear floor zones and circulation paths for the
> engine to place furniture and sprites. Avoid photorealism, modern objects,
> isometric diamond tiles and generic fantasy decoration.

## Variações por ambiente

### `quarto.png`

> A narrow servant bedroom with three legible zones: sleeping area on the
> left, writing area below the upper window and archive/storage area on the
> right. Use worn floorboards, small faded rugs and restrained wall detail.
> Keep unobstructed routes from the center to both existing doors.

### `corredor.png`

> A long administrative service corridor, not a grand public hallway. Add a
> worn central runner and distinct empty wall zones for a key station, service
> clock, frame and closed twins-room door. Keep one continuous unobstructed
> patrol route across the full length. Do not paint the clock, frame, niche or
> freestanding props into the background.

### `escritorio.png`

> A correspondence and bookkeeping office. Build a worn central rug and
> quieter archive zones along both sides, leaving precise open areas for a
> desk, chair, drawer cabinet, bookcase and tall sealed cabinet. Remove wall
> sconces and all baked-in furniture; illumination comes from the game.

### `escada.png`

> A real service staircase contained in one vertical map: upper landing,
> narrow central stair passage and lower landing. Use worn steps, damp plaster
> and heavy wood rails. The side masses must read as solid divisions so the
> stair opening is the only route between levels.

### `copa.png`

> A practical staff pantry and wash room. Establish a central service-table
> zone, wash area on the right and clear cart route from the left entrance to
> the lower doorway. Use utilitarian tile and wood, restrained wear and no
> luxurious dining-room decoration.

### `camara.png`

> A sterile clinical-ritual chamber hidden inside the manor. Put one large
> bolted mechanical mounting ring exactly at the visual center, restraint
> anchor plates on the left and a drainage/channel zone on the right. Keep
> enough open floor for the engine cylinder, restraint table and trolley.
> Seal the accidental upper window: this room has no exterior opening and no
> visible light source.

### `salao.png`

> A stripped formal hall whose architecture forces a central fatal approach
> to the courtyard doorway. Use a long burgundy runner on that axis and two
> dim side zones for sparse furniture. The bottom doorway is the focal exit;
> do not create side exits or alternative paths around the central encounter.

## Saídas usadas pelo jogo

As fontes acima permanecem em alta resolução nesta pasta. A esteira grava as
versões recortadas e pixelizadas em `assets/cobertura/maps/`. Nomes de arquivo
e dimensões finais ficam exclusivamente em `js/config.js` e
`tools/cobertura_assets.py`.
