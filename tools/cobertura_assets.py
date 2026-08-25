# -*- coding: utf-8 -*-
"""
tools/cobertura_assets.py

Recorta o kit bruto de "A Cobertura" para dentro de assets/cobertura/.

O material que o autor entregou em assets/A Cobertura/ vem em tres formatos
que o motor nao consegue usar direto:

  1. spritesheet 3x4 com o quadro solto dentro da celula, ora com alfa de
     verdade, ora com fundo preto, ora com um xadrez de falsa transparencia
     achatado dentro do PNG;
  2. movel isolado sobre preto com um halo dourado por baixo;
  3. mapa de sala com moldura preta em volta da area util.

Este script normaliza os tres. Nao gera arte nova e nao inventa quadro: o
que nao existe na folha nao aparece na saida.

    python tools/cobertura_assets.py            recorta tudo
    python tools/cobertura_assets.py --listar    so mede e imprime

Requer Pillow. Sem numpy de proposito - a maquina do autor nao tem.
"""

import os
import sys
from collections import deque

try:
    from PIL import Image
except ImportError:                                    # pragma: no cover
    sys.stderr.write("Pillow ausente. pip install pillow\n")
    raise SystemExit(2)

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ORIG = os.path.join(RAIZ, "assets", "A Cobertura")
DEST = os.path.join(RAIZ, "assets", "cobertura")

# O audio sai de assets/cobertura/ de proposito - os caminhos comecam com
# "../". RBF.BGM e RBF.SFX resolvem por RBF.CONFIG.paths.bgm e .sfx, que
# apontam para assets/audio/, e o validador confere o arquivo em disco
# por ali. Uma pasta de audio propria obrigaria um segundo caminho no
# manifesto para nada.

LISTAR = "--listar" in sys.argv


# ---------------------------------------------------------------------------
# recorte de fundo
# ---------------------------------------------------------------------------

def _preenche(im, aceita):
    """Marca o fundo ligado a borda. Devolve bytearray w*h com 1 no fundo.

    Preenchimento a partir da borda, e nao limiar global: e o que preserva
    o cabelo branco da Klara, que tem o mesmo tom do xadrez e nao esta
    ligado a borda.
    """
    w, h = im.size
    px = im.load()
    fundo = bytearray(w * h)
    fila = deque()

    def semeia(x, y):
        i = y * w + x
        if not fundo[i] and aceita(px[x, y]):
            fundo[i] = 1
            fila.append((x, y))

    for x in range(w):
        semeia(x, 0)
        semeia(x, h - 1)
    for y in range(h):
        semeia(0, y)
        semeia(w - 1, y)

    while fila:
        x, y = fila.popleft()
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h:
                i = ny * w + nx
                if not fundo[i] and aceita(px[nx, ny]):
                    fundo[i] = 1
                    fila.append((nx, ny))
    return fundo


def _aplica(im, fundo):
    w, h = im.size
    saida = im.convert("RGBA")
    a = Image.new("L", (w, h), 255)
    ap = a.load()
    for y in range(h):
        base = y * w
        for x in range(w):
            if fundo[base + x]:
                ap[x, y] = 0
    saida.putalpha(a)
    return saida


def _mede_xadrez(rgb, fundo):
    """Deduz lado, fase e os dois tons do xadrez a partir do que ja e fundo.

    Sem isto so sai o fundo ligado a borda. Os vaos fechados - entre duas
    trancas da Carmine, entre o braco e o corpo - continuariam brancos,
    e no mapa escuro cada um deles vira um buraco aceso.
    """
    w, h = rgb.size
    g = rgb.convert("L").load()

    amostra = []
    passo = max(1, (w * h) // 40000)
    i = 0
    for y in range(0, h, 2):
        base = y * w
        for x in range(0, w, 2):
            if fundo[base + x]:
                i += 1
                if i % passo == 0:
                    amostra.append((x, y, g[x, y]))
    if len(amostra) < 200:
        return None

    def avalia(lado):
        soma = [0.0, 0.0]
        cont = [0, 0]
        for x, y, v in amostra:
            par = (int(x / lado) + int(y / lado)) & 1
            soma[par] += v
            cont[par] += 1
        if cont[0] < 20 or cont[1] < 20:
            return None
        t = (soma[0] / cont[0], soma[1] / cont[1])
        erro = 0.0
        for x, y, v in amostra:
            par = (int(x / lado) + int(y / lado)) & 1
            erro += abs(v - t[par])
        return erro / len(amostra), lado, t

    def varre(ini, fim, passo):
        bom = None
        lado = ini
        while lado <= fim:
            r = avalia(lado)
            if r and (bom is None or r[0] < bom[0]):
                bom = r
            lado += passo
        return bom

    # Duas varreduras. Uma so, grossa, nao serve: com passo de meio pixel
    # o erro de fase acumula dezenas de pixels ao longo de uma folha de
    # 1536, e a metade direita da imagem passa a ser julgada pela cor
    # errada.
    grosso = varre(6.0, 48.0, 0.5)
    if grosso is None:
        return None
    melhor = varre(max(4.0, grosso[1] - 0.6), grosso[1] + 0.6, 0.02) or grosso

    if melhor[0] > 6.0 or abs(melhor[2][0] - melhor[2][1]) < 3:
        return None
    return melhor[1], melhor[2]


def _vaos_fechados(rgb, fundo, aceita, xadrez, margem=4.0):
    """Apaga tambem os vaos fechados que sao xadrez, e so eles.

    A prova e a fase: um vao de fundo alterna os dois tons na grade
    medida. Uma mecha do cabelo da Klara e clara do mesmo jeito e nao
    alterna, entao fica.
    """
    lado, tons = xadrez
    w, h = rgb.size
    px = rgb.load()
    g = rgb.convert("L").load()
    visto = bytearray(w * h)

    for y0 in range(h):
        linha = y0 * w
        for x0 in range(w):
            i0 = linha + x0
            if visto[i0] or fundo[i0] or not aceita(px[x0, y0]):
                continue

            fila = deque([(x0, y0)])
            visto[i0] = 1
            regiao = []
            erro = 0.0
            pares = [0, 0]
            while fila:
                x, y = fila.popleft()
                regiao.append(y * w + x)
                par = (int(x / lado) + int(y / lado)) & 1
                pares[par] += 1
                erro += abs(g[x, y] - tons[par])
                for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < w and 0 <= ny < h:
                        j = ny * w + nx
                        if not visto[j] and not fundo[j] and aceita(px[nx, ny]):
                            visto[j] = 1
                            fila.append((nx, ny))

            # Alternancia so vale como prova se as duas cores aparecerem
            # de verdade. Sem esta guarda, uma mecha de quatro pixels do
            # cabelo da Klara cai inteira dentro de uma casa clara,
            # "acerta" o tom e vira buraco no cabelo.
            if len(regiao) < 30 or min(pares) < 8:
                continue
            if erro / len(regiao) <= margem:
                for j in regiao:
                    fundo[j] = 1
    return fundo


def recorta_xadrez(im, claro=232, tol=16):
    """Tira o xadrez de falsa transparencia (dois cinzas claros)."""
    rgb = im.convert("RGB")

    def aceita(c):
        r, g, b = c
        if r < claro or g < claro or b < claro:
            return False
        return (max(c) - min(c)) <= tol

    fundo = _preenche(rgb, aceita)
    xadrez = _mede_xadrez(rgb, fundo)
    if xadrez:
        fundo = _vaos_fechados(rgb, fundo, aceita, xadrez)
    return _aplica(rgb, fundo)


def recorta_preto(im, escuro=42):
    """Tira o preto de fundo e o halo dourado que mora nele."""
    rgb = im.convert("RGB")

    def aceita(c):
        return (c[0] + c[1] + c[2]) / 3.0 <= escuro

    fundo = _preenche(rgb, aceita)
    saida = _aplica(rgb, fundo)

    # Rampa suave na faixa em que o halo ainda esta aceso: sem isto o
    # movel fica com um contorno duro de 1px contra o piso do mapa.
    w, h = saida.size
    px = rgb.load()
    ap = saida.getchannel("A").load()
    a = saida.getchannel("A")
    apx = a.load()
    for y in range(h):
        base = y * w
        for x in range(w):
            if fundo[base + x]:
                continue
            luz = (px[x, y][0] + px[x, y][1] + px[x, y][2]) / 3.0
            if luz < escuro + 34:
                t = max(0.0, (luz - escuro) / 34.0)
                apx[x, y] = int(255 * t)
    saida.putalpha(a)
    return saida


def tapa_furos(im, area=80):
    """Fecha furo pequeno de alfa que nao encosta na borda.

    O preenchimento entra por canais de um pixel entre duas mechas do
    cabelo da Klara e deixa pontinhos vazados. Contra o piso escuro do
    mapa eles aparecem como sujeira.
    """
    w, h = im.size
    a = im.getchannel("A")
    ap = a.load()
    visto = bytearray(w * h)

    for y0 in range(h):
        linha = y0 * w
        for x0 in range(w):
            i0 = linha + x0
            if visto[i0] or ap[x0, y0] > 8:
                continue
            fila = deque([(x0, y0)])
            visto[i0] = 1
            regiao = []
            borda = False
            while fila:
                x, y = fila.popleft()
                regiao.append((x, y))
                if x == 0 or y == 0 or x == w - 1 or y == h - 1:
                    borda = True
                for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < w and 0 <= ny < h:
                        j = ny * w + nx
                        if not visto[j] and ap[nx, ny] <= 8:
                            visto[j] = 1
                            fila.append((nx, ny))
            if not borda and len(regiao) <= area:
                for x, y in regiao:
                    ap[x, y] = 255

    im = im.copy()
    im.putalpha(a)
    return im


def com_alfa(im):
    """A folha ja tem alfa de verdade?"""
    if im.mode not in ("RGBA", "LA", "P"):
        return False
    im = im.convert("RGBA")
    lo, hi = im.getchannel("A").getextrema()
    return lo < 250


def normaliza(im):
    """Devolve a imagem com alfa, seja qual for o fundo que ela tinha."""
    if com_alfa(im):
        return im.convert("RGBA")
    rgb = im.convert("RGB")
    r, g, b = rgb.getpixel((0, 0))
    if (r + g + b) / 3.0 > 150:
        return tapa_furos(recorta_xadrez(rgb))
    return tapa_furos(recorta_preto(rgb))


# ---------------------------------------------------------------------------
# medicao
# ---------------------------------------------------------------------------

def faixas(mascara, eixo, folga=6, minimo=10, piso=0.12):
    """Bandas contiguas de conteudo ao longo de um eixo.

    Duas passagens. A primeira acha o miolo de cada banda com um piso
    alto, porque a ponta de uma tranca da Carmine encosta na linha de
    baixo e um piso zero funde as quatro linhas numa so. A segunda
    devolve a banda ao tamanho real, andando para fora ate a projecao
    morrer ou ate o vale entre duas bandas vizinhas - o que impede que a
    saia da Antoniette saia cortada no rodape.
    """
    w, h = mascara.size
    px = mascara.load()
    n = w if eixo == "x" else h
    proj = [0] * n

    if eixo == "x":
        for x in range(w):
            c = 0
            for y in range(0, h, 2):
                if px[x, y]:
                    c += 1
            proj[x] = c
    else:
        for y in range(h):
            c = 0
            for x in range(0, w, 2):
                if px[x, y]:
                    c += 1
            proj[y] = c

    pico = max(proj) if proj else 0
    if not pico:
        return []

    alto = max(1, int(pico * piso))

    miolos = []
    ini = None
    for i, v in enumerate(proj):
        if v > alto and ini is None:
            ini = i
        elif v <= alto and ini is not None:
            miolos.append([ini, i - 1])
            ini = None
    if ini is not None:
        miolos.append([ini, n - 1])

    unidos = []
    for c in miolos:
        if unidos and c[0] - unidos[-1][1] <= folga:
            unidos[-1][1] = c[1]
        else:
            unidos.append(c)
    miolos = [c for c in unidos if c[1] - c[0] >= minimo]
    if not miolos:
        return []

    vales = []
    for k, c in enumerate(miolos):
        antes = miolos[k - 1][1] if k > 0 else -1
        depois = miolos[k + 1][0] if k + 1 < len(miolos) else n

        a = c[0]
        limite = (antes + c[0]) // 2 if antes >= 0 else 0
        while a > limite and proj[a - 1] > 0:
            a -= 1

        b = c[1]
        teto = (c[1] + depois) // 2 if depois < n else n - 1
        while b < teto and proj[b + 1] > 0:
            b += 1

        vales.append((a, b))
    return vales


def mascara(im, limiar=24):
    return im.getchannel("A").point(lambda v: 255 if v > limiar else 0)


def caixa(im):
    b = im.getchannel("A").point(lambda v: 255 if v > 12 else 0).getbbox()
    return b or (0, 0, im.size[0], im.size[1])


def grade(im, colunas, linhas):
    """Bandas por divisao igual da area util.

    Rede de seguranca para folha em que os quadros se tocam - as tranas
    da Carmine encostam de uma linha na outra e a projecao devolve uma
    banda so. A divisao igual funciona porque as folhas do kit foram
    montadas em grade regular.
    """
    x0, y0, x1, y1 = caixa(im)
    lw = (x1 - x0) / float(colunas)
    lh = (y1 - y0) / float(linhas)
    cols = [(int(x0 + i * lw), int(x0 + (i + 1) * lw) - 1) for i in range(colunas)]
    rows = [(int(y0 + j * lh), int(y0 + (j + 1) * lh) - 1) for j in range(linhas)]
    return cols, rows


# ---------------------------------------------------------------------------
# spritesheet 3x4
# ---------------------------------------------------------------------------

def fatia_andar(origem, saida, larg, alt, nome):
    """Recorta uma folha de caminhada 3 colunas x 4 linhas.

    Ordem de linha herdada do formato RPG Maker e mantida: frente,
    esquerda, direita, costas. Cada quadro sai ancorado no rodape e
    centrado na horizontal, para que a troca de direcao nao faca o
    personagem saltar no chao.
    """
    im = normaliza(Image.open(origem))
    m = mascara(im)
    cols = faixas(m, "x")
    rows = faixas(m, "y")

    exato = (len(cols) == 3 and len(rows) == 4)
    if not exato:
        cols, rows = grade(im, 3, 4)

    # Escala unica para a folha inteira: quadro a quadro, cada direcao
    # sairia de um tamanho e a personagem mudaria de altura ao virar.
    maior = 0
    caixas = []
    for ry in rows:
        linha = []
        for cx in cols:
            q = im.crop((cx[0], ry[0], cx[1] + 1, ry[1] + 1))
            b = caixa(q)
            q = q.crop(b)
            linha.append(q)
            maior = max(maior, q.size[1])
        caixas.append(linha)

    escala = (alt - 6) / float(maior)
    folha = Image.new("RGBA", (larg * 3, alt * 4), (0, 0, 0, 0))

    for r, linha in enumerate(caixas):
        for c, q in enumerate(linha):
            nw = max(1, int(round(q.size[0] * escala)))
            nh = max(1, int(round(q.size[1] * escala)))
            q = q.resize((nw, nh), Image.LANCZOS)
            x = c * larg + (larg - nw) // 2
            y = r * alt + (alt - nh) - 2
            folha.alpha_composite(q, (max(0, x), max(0, y)))

    folha.save(saida)
    return (larg, alt), "quadro %dx%d %s" % (
        larg, alt, "projecao" if exato else "divisao igual")


# ---------------------------------------------------------------------------
# grade de icones
# ---------------------------------------------------------------------------

def fatia_icones(origem, saida, lado, colunas, linhas):
    im = normaliza(Image.open(origem))
    m = mascara(im)
    cols = faixas(m, "x")
    rows = faixas(m, "y")
    exato = (len(cols) == colunas and len(rows) == linhas)
    if not exato:
        cols, rows = grade(im, colunas, linhas)

    folha = Image.new("RGBA", (lado * colunas, lado * linhas), (0, 0, 0, 0))
    for r, ry in enumerate(rows):
        for c, cx in enumerate(cols):
            q = im.crop((cx[0], ry[0], cx[1] + 1, ry[1] + 1))
            q = q.crop(caixa(q))
            k = (lado - 4) / float(max(q.size))
            nw = max(1, int(round(q.size[0] * k)))
            nh = max(1, int(round(q.size[1] * k)))
            q = q.resize((nw, nh), Image.LANCZOS)
            folha.alpha_composite(
                q, (c * lado + (lado - nw) // 2, r * lado + (lado - nh) // 2))
    folha.save(saida)
    return (lado, lado), "%dx%d icones de %dpx %s" % (
        colunas, linhas, lado, "projecao" if exato else "divisao igual")


# ---------------------------------------------------------------------------
# peca solta: movel, retrato, batalhador
# ---------------------------------------------------------------------------

def peca(origem, saida, alt_max=None, larg_max=None):
    im = normaliza(Image.open(origem))
    im = im.crop(caixa(im))
    w, h = im.size
    k = 1.0
    if alt_max and h > alt_max:
        k = min(k, alt_max / float(h))
    if larg_max and w > larg_max:
        k = min(k, larg_max / float(w))
    if k < 1.0:
        im = im.resize((max(1, int(w * k)), max(1, int(h * k))), Image.LANCZOS)
    im.save(saida)
    return im.size, "peca"


def mapa(origem, saida, escala=1.0):
    """Mapa de sala: corta a moldura preta e guarda sem alfa."""
    im = Image.open(origem).convert("RGB")
    g = im.convert("L").point(lambda v: 255 if v > 16 else 0)
    b = g.getbbox()
    if b:
        im = im.crop(b)
    if escala != 1.0:
        im = im.resize((int(im.size[0] * escala), int(im.size[1] * escala)),
                       Image.LANCZOS)
    im.save(saida)
    return im.size, "mapa"


# ---------------------------------------------------------------------------
# plano de trabalho
# ---------------------------------------------------------------------------

A = "ChatGPT Image Aug 24, 2026, "

# A regua do projeto: 1,07 pixel por centimetro, tirada do ladrilho de
# 28 pixels da arte das salas. Adulto de pe = 150. Menina de oito anos =
# 1,25m = 115. Ver o cabecalho de tools/cobertura_assets.py.
ANDAR = [
    (A + "11_08_10 PM.png",              "chars/antoniette.png",  98, 150),
    ("4660d5ff-6e2b-466c-a8f4-c6c26df09eb5.png",
                                          "chars/klara.png",       76, 116),
    (A + "10_38_10 PM.png",              "chars/klara_casulo.png", 76, 116),
    (A + "10_11_45 PM.png",              "chars/vulto.png",       108, 162),
    (A + "10_46_36 PM.png",              "chars/carmine.png",     116, 172),
]

ICONES = [(A + "09_47_49 PM.png", "icons/itens.png", 64, 4, 4)]

PECAS = [
    (A + "11_06_38 PM (1).png",  "faces/klara.png",           320, 320),
    (A + "11_06_38 PM (2).png",  "faces/klara_casulo.png",    320, 320),
    (A + "11_06_38 PM (3).png",  "faces/vulto.png",           360, 360),
    (A + "11_06_39 PM (4).png",  "faces/carmine.png",         420, 420),

    # (largura maxima, altura maxima). Onde so a altura importa, a
    # largura vai como None e a proporcao manda.
    (A + "10_29_41 PM (1).png",  "props/mesa_longa.png",      None, 118),
    (A + "10_29_41 PM (2).png",  "props/mesa_contencao.png",  None, 112),
    (A + "10_29_41 PM (3).png",  "props/armario_selado.png",  None, 280),
    (A + "10_29_41 PM (4).png",  "props/carrinho.png",        None, 122),
    (A + "10_29_41 PM (5).png",  "props/escrivaninha.png",    None, 105),
    (A + "10_29_42 PM (6).png",  "props/estante_a.png",       None, 260),
    (A + "10_29_42 PM (7).png",  "props/estante_b.png",       None, 260),
    (A + "10_29_42 PM (8).png",  "props/bancada.png",         None, 108),
    (A + "10_29_42 PM (9).png",  "props/poltrona.png",        None, 168),
    (A + "10_29_42 PM (10).png", "props/cadeira.png",         None, 130),
    (A + "10_29_42 PM (11).png", "props/pia.png",             None, 138),
    (A + "10_29_42 PM (12).png", "props/cilindro.png",        None, 300),
    (A + "10_29_43 PM (13).png", "props/arquivo_gavetas.png", None, 140),
    (A + "10_29_43 PM (14).png", "props/bau.png",             None,  72),
]

MAPAS = [
    (A + "10_08_08 PM (1).png",  "maps/sala_a.png"),
    (A + "10_08_09 PM (2).png",  "maps/salao.png"),
    (A + "10_08_09 PM (3).png",  "maps/sala_b.png"),
    (A + "10_08_09 PM (4).png",  "maps/sala_c.png"),
    (A + "10_08_10 PM (5).png",  "maps/sala_d.png"),
    (A + "10_08_10 PM (6).png",  "maps/escada.png"),
    (A + "10_08_10 PM (7).png",  "maps/corredor.png"),
]

TILES = [("Inside_C.png", "tiles/interior.png")]


# ---------------------------------------------------------------------------
# audio
# ---------------------------------------------------------------------------

# Trilha: pack "Uneasy Melodies v1", de Serotone (Sebastian Petrei).
# Licenca no proprio pack: uso livre, inclusive comercial, credito
# opcional, proibido revender como pacote. Ver assets/cobertura/CREDITOS.md.
TRILHAS = [
    ("UneasyMelodies_v1/horror_dungeon_explore.wav",    "../audio/bgm/cob_percurso.mp3"),
    ("UneasyMelodies_v1/horror_amb_haunted.wav",        "../audio/bgm/cob_respiro.mp3"),
    ("UneasyMelodies_v1/horror_dark_reveal.wav",        "../audio/bgm/cob_perto.mp3"),
    ("UneasyMelodies_v1/horror_puzzle.wav",             "../audio/bgm/cob_conferencia.mp3"),
    ("UneasyMelodies_v1/horror_saferoom.wav",           "../audio/bgm/cob_forro.mp3"),
    ("UneasyMelodies_v1/horror_saferoom_corrupted.wav", "../audio/bgm/cob_forro_ruim.mp3"),
    ("UneasyMelodies_v1/horror_scene_finalmoment.wav",  "../audio/bgm/cob_ultima.mp3"),
]

# Efeitos. Os tres primeiros vem do mesmo pack; os dois ultimos do
# "Fantasy UI SFX", de Atelier Magicae - uso livre, sem redistribuir.
# Os nomes de origem sao numeros: se o som estiver errado, e trocar o
# numero aqui e rodar de novo.
EFEITOS = [
    ("UneasyMelodies_v1/horror_sfx_itemfound.wav", "../audio/sfx/cob_achado.ogg"),
    ("UneasyMelodies_v1/horror_sfx_unlock.wav",    "../audio/sfx/cob_destranca.ogg"),
    ("UneasyMelodies_v1/horror_sfx_alarm.wav",     "../audio/sfx/cob_notada.ogg"),
    ("Fantasy UI SFX/Fantasy UI SFX/Fantasy/Fantasy_UI (60).wav",
                                                   "../audio/sfx/cob_marca.ogg"),
    ("Fantasy UI SFX/Fantasy UI SFX/Piano/Piano_Ui (2).wav",
                                                   "../audio/sfx/cob_anota.ogg"),
]


def tem_ffmpeg():
    from shutil import which
    return which("ffmpeg") is not None


def converte(origem, destino, mp3):
    import subprocess
    if mp3:
        cmd = ["ffmpeg", "-y", "-loglevel", "error", "-i", origem,
               "-ac", "2", "-ar", "44100", "-b:a", "128k", destino]
    else:
        cmd = ["ffmpeg", "-y", "-loglevel", "error", "-i", origem,
               "-ac", "2", "-ar", "44100", "-c:a", "libvorbis", "-q:a", "4",
               destino]
    r = subprocess.run(cmd, capture_output=True)
    if r.returncode != 0:
        return None, (r.stderr.decode("utf-8", "replace").strip() or "ffmpeg falhou")
    return os.path.getsize(destino), "convertido"


def garante(caminho):
    d = os.path.dirname(caminho)
    if d and not os.path.isdir(d):
        os.makedirs(d)


def main():
    if not os.path.isdir(ORIG):
        sys.stderr.write("pasta de origem ausente: %s\n" % ORIG)
        return 2

    falhas = []
    total = 0

    def registra(rotulo, destino, tamanho, nota):
        nonlocal total
        if tamanho is None:
            falhas.append("%-26s %s" % (rotulo, nota))
            print("  FALHA  %-26s %s" % (rotulo, nota))
            return
        total += 1
        print("  ok     %-26s %-14s %s" % (rotulo, "%dx%d" % tamanho, nota))

    print("\nspritesheets de caminhada")
    for origem, rel, w, h in ANDAR:
        destino = os.path.join(DEST, rel)
        garante(destino)
        if LISTAR:
            continue
        t, nota = fatia_andar(os.path.join(ORIG, origem), destino, w, h, rel)
        registra(rel, destino, t, nota)

    print("\nicones")
    for origem, rel, lado, c, l in ICONES:
        destino = os.path.join(DEST, rel)
        garante(destino)
        if LISTAR:
            continue
        t, nota = fatia_icones(os.path.join(ORIG, origem), destino, lado, c, l)
        registra(rel, destino, t, nota)

    print("\npecas")
    for origem, rel, lw, lh in PECAS:
        destino = os.path.join(DEST, rel)
        garante(destino)
        if LISTAR:
            continue
        t, nota = peca(os.path.join(ORIG, origem), destino, lh, lw)
        registra(rel, destino, t, nota)

    print("\nmapas")
    for origem, rel in MAPAS:
        destino = os.path.join(DEST, rel)
        garante(destino)
        if LISTAR:
            continue
        t, nota = mapa(os.path.join(ORIG, origem), destino)
        registra(rel, destino, t, nota)

    print("\naudio")
    if "--sem-audio" in sys.argv:
        print("  pulado por --sem-audio")
    elif not tem_ffmpeg():
        print("  FALHA  ffmpeg ausente - trilha e efeitos nao convertidos")
        falhas.append("ffmpeg ausente")
    else:
        for origem, rel in TRILHAS + EFEITOS:
            destino = os.path.join(DEST, rel)
            garante(destino)
            if LISTAR:
                continue
            fonte = os.path.join(ORIG, origem)
            if not os.path.isfile(fonte):
                registra(rel, destino, None, "origem ausente")
                continue
            tam, nota = converte(fonte, destino, rel.endswith(".mp3"))
            if tam is None:
                registra(rel, destino, None, nota)
            else:
                total += 1
                print("  ok     %-26s %-14s %s"
                      % (rel, "%d KB" % (tam // 1024), nota))

    print("\ntileset")
    for origem, rel in TILES:
        destino = os.path.join(DEST, rel)
        garante(destino)
        if LISTAR:
            continue
        im = Image.open(os.path.join(ORIG, origem)).convert("RGBA")
        im.save(destino)
        registra(rel, destino, im.size, "copia direta")

    print("\n%d arquivos, %d falhas" % (total, len(falhas)))
    return 1 if falhas else 0


if __name__ == "__main__":
    raise SystemExit(main())
