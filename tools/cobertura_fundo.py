# -*- coding: utf-8 -*-
"""
tools/cobertura_fundo.py

Limpa o alfa do kit de "A Cobertura" com backgroundremover (U2Net).

    https://github.com/nadermx/backgroundremover

ORDEM DA ESTEIRA - importa, e nao e arbitraria:

    1. tools/cobertura_assets.py     recorta e mede
    2. tools/cobertura_fundo.py      LIMPA O ALFA        <- este
    3. tools/cobertura_pixel.py      pixelit e paleta

------------------------------------------------------------------
POR QUE ISTO NAO E RODADO NA FOLHA INTEIRA
------------------------------------------------------------------
U2Net e deteccao de objeto SALIENTE: ele procura uma coisa na imagem.
Numa folha de caminhada ha doze - tres colunas por quatro linhas - e o
resultado, medido, foi manter tres figuras e apagar as outras nove.

Entao a folha e fatiada primeiro, cada quadro passa sozinho, e a folha e
remontada. Por peca solta - movel, retrato - a rede acerta de primeira e
acerta melhor do que o preenchimento geometrico: no bau ela tirou o halo
dourado inteiro, e no retrato da Klara nao deixou nenhum dos pontinhos
vazados que o preenchimento deixava no cabelo.

------------------------------------------------------------------
O QUE NAO PASSA POR AQUI
------------------------------------------------------------------
Os MAPAS. Uma sala vista de cima nao tem objeto saliente: e piso, parede
e vao de porta ocupando o quadro inteiro. A rede recortaria alguma coisa,
e essa alguma coisa seria arbitraria. Para eles vale o corte de moldura
preta que tools/cobertura_assets.py ja faz, que e exato.

------------------------------------------------------------------
A REDE DIZ ONDE. A COR DIZ SE.
------------------------------------------------------------------
Recortar a folha em quadros resolve o caso de doze figuras na mesma
imagem. Nao resolve o caso de UMA figura espalhada: na terceira linha da
folha da Carmine, com os tentaculos abertos para os quatro lados, a rede
achou varios blobs e ficou com o maior. Metade do corpo virou
transparente.

Entao a mascara da rede nao decide sozinha. Ela diz onde acha que ha
fundo; quem confirma e a COR do pixel, comparada com as cores que o
recorte geometrico ja tinha classificado como fundo naquela mesma
imagem. As duas precisam concordar:

    rede diz fundo  E  cor e de fundo   ->  transparente
    rede diz figura E  cor NAO e fundo  ->  opaco (tapa furo)
    qualquer outra combinacao           ->  fica como estava

Isso torna impossivel apagar arte. Tentaculo e vermelho escuro e nao se
parece com nenhuma cor de fundo daquela folha, entao nenhuma mascara o
alcanca. O que sai sao os vaos de xadrez fechados, que sao claros e
dessaturados e que o preenchimento pela borda nao alcancava por estarem
cercados de figura.

A trava vale nos dois sentidos. Sem ela no sentido de tapar, a rede
fecharia o vao entre o braco e o corpo pintando xadrez de opaco.
"""

import io
import json
import os
import shutil
import sys

try:
    from PIL import Image, ImageChops, ImageFilter
except ImportError:                                    # pragma: no cover
    sys.stderr.write("Pillow ausente. pip install pillow\n")
    raise SystemExit(2)

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = os.path.join(RAIZ, "assets", "cobertura")

SO = [a for a in sys.argv[1:] if not a.startswith("-")]
SECO = "--seco" in sys.argv


def opcao(nome):
    if nome in sys.argv:
        i = sys.argv.index(nome)
        if i + 1 < len(sys.argv):
            return sys.argv[i + 1]
    return None


# --pasta trata uma pasta inteira de material BRUTO, antes do recorte. A
# origem e imutavel: o resultado vai para --saida ou para <pasta>_limpa.
PASTA = opcao("--pasta")
SAIDA_PASTA = opcao("--saida")
if PASTA and PASTA in SO:
    SO.remove(PASTA)
if SAIDA_PASTA and SAIDA_PASTA in SO:
    SO.remove(SAIDA_PASTA)


# Folhas de caminhada: quadro de 3 colunas por 4 linhas. O tamanho sai da
# propria imagem, e nao de uma tabela - a tabela envelheceria junto com
# tools/cobertura_assets.py e as duas iam divergir em silencio.
FOLHAS = {"chars": (3, 4)}

# Grade de icones.
GRADES = {"icons": (4, 4)}

# Peca solta.
SOLTAS = ("props", "faces")

# Nestes arquivos a passada acidental zerou alfa sobre arte quase preta. O
# RGB sobreviveu. Depois da limpeza clara, a mascara da rede pode apenas
# devolver preto que esteja perto do alfa ja confirmado; ela nunca substitui
# nem reduz a mascara existente.
REFORCA_PRETO = {
    "4c9a58a1-f2ea-45c8-bb2b-19eb383f14f9.png",
    "antoniette_vela_spritesheet.png",
    "fenn_spritesheet_3x4.png",
    "cama_servico.png",
    "gancho_chaves.png",
    "malas_bau_ferramentas.png",
    "porta_2_estados.png",
    "porta_aberta.png",
    "prataria_empilhada.png",
    "rastro_01.png",
    "rastro_02.png",
    "rastro_03.png",
    "rastro_04.png",
}

# Pecas descritas no manifesto como volumes fechados. Nelas, um vazio de alfa
# cercado pela silhueta e dano, nao um vao intencional. Nao incluir porta,
# personagem, moldura, utensilio nem rastro nesta lista.
VOLUMES_FECHADOS = {"malas_bau_ferramentas.png"}


# ---------------------------------------------------------------------------
# rede
# ---------------------------------------------------------------------------

_modelo = [None]


def modelo():
    if _modelo[0] is None:
        from backgroundremover import bg
        _modelo[0] = (bg, bg.get_model("u2net"))
    return _modelo[0]


def mascara(im):
    """Alfa que a rede acha para esta imagem. Devolve um 'L' do tamanho dela.

    A peca chega ja recortada, com fundo transparente. A rede trabalha em
    RGB, entao ela e assentada num cinza medio antes: sobre preto, uma
    silhueta escura como o armario lacrado desaparece, e a rede devolve
    mascara vazia.
    """
    bg, m = modelo()
    import numpy as np

    im = im.convert("RGBA")
    chao = Image.new("RGBA", im.size, (118, 118, 118, 255))
    chao.alpha_composite(im)

    saida = bg.detect.predict(m, np.array(chao.convert("RGB"))).convert("L")
    return saida.resize(im.size, Image.LANCZOS)


def chapado(im, tol=14):
    """A imagem chegou opaca sobre uma cor chapada? Devolve a cor, ou None.

    Le so a moldura de um pixel. Se os quatro lados forem a mesma cor e a
    imagem nao tiver alfa util, aquilo e fundo - e quase sempre e branco,
    porque foi o que a entrega de 25/08 trouxe em sete pecas.
    """
    im = im.convert("RGBA")
    if im.getchannel("A").getextrema()[0] < 250:
        return None                     # ja tem alfa de verdade

    w, h = im.size
    px = im.load()
    borda = []
    for x in range(0, w, max(1, w // 60)):
        borda.append(px[x, 0][:3])
        borda.append(px[x, h - 1][:3])
    for y in range(0, h, max(1, h // 60)):
        borda.append(px[0, y][:3])
        borda.append(px[w - 1, y][:3])

    r = sum(c[0] for c in borda) / len(borda)
    g = sum(c[1] for c in borda) / len(borda)
    b = sum(c[2] for c in borda) / len(borda)
    for c in borda:
        if abs(c[0] - r) > tol or abs(c[1] - g) > tol or abs(c[2] - b) > tol:
            return None
    return (int(r), int(g), int(b))


def abre_chapado(im):
    """Transforma a cor chapada da borda em alfa, por preenchimento.

    Preenchimento a partir da borda, e nao limiar: um prato de prataria
    e quase branco e nao pode sumir junto com o fundo branco.
    """
    cor = chapado(im)
    if cor is None:
        return im.convert("RGBA")

    from collections import deque
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()
    tol = 30 * 30

    def igual(p):
        dr = p[0] - cor[0]
        dg = p[1] - cor[1]
        db = p[2] - cor[2]
        return dr * dr + dg * dg + db * db <= tol

    visto = bytearray(w * h)
    fila = deque()

    def semeia(x, y):
        i = y * w + x
        if not visto[i] and igual(px[x, y]):
            visto[i] = 1
            fila.append((x, y))

    for x in range(w):
        semeia(x, 0); semeia(x, h - 1)
    for y in range(h):
        semeia(0, y); semeia(w - 1, y)

    while fila:
        x, y = fila.popleft()
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not visto[ny * w + nx]:
                if igual(px[nx, ny]):
                    visto[ny * w + nx] = 1
                    fila.append((nx, ny))

    a = im.getchannel("A")
    ap = a.load()
    for y in range(h):
        base = y * w
        for x in range(w):
            if visto[base + x]:
                ap[x, y] = 0
    out = im.copy()
    out.putalpha(a)
    return out


def claro_neutro(cor, piso=188, faixa=34):
    """Branco/cinza de matte ou xadrez, nunca preto transparente."""
    r, g, b = cor[:3]
    return min(r, g, b) >= piso and max(r, g, b) - min(r, g, b) <= faixa


def abre_fundo_claro(im):
    """Abre branco ou xadrez claro ligado a borda.

    Ao contrario de ``chapado``, aceita os dois tons alternados de uma falsa
    transparencia. O preenchimento continua partindo somente da borda, entao
    prato, camisa e reflexo claro dentro da arte nao somem por limiar global.
    Devolve tambem quantos pixels foram abertos; zero significa que a imagem
    ja tinha alfa util e nao precisa da rede.
    """
    from collections import deque

    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()
    visto = bytearray(w * h)
    fila = deque()

    def aceita(x, y):
        r, g, b, a = px[x, y]
        return a >= 245 and claro_neutro((r, g, b))

    def semeia(x, y):
        i = y * w + x
        if not visto[i] and aceita(x, y):
            visto[i] = 1
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
                if not visto[i] and aceita(nx, ny):
                    visto[i] = 1
                    fila.append((nx, ny))

    n = sum(visto)
    if not n:
        return im, 0

    alfa = im.getchannel("A")
    ap = alfa.load()
    for y in range(h):
        base = y * w
        for x in range(w):
            if visto[base + x]:
                ap[x, y] = 0
    out = im.copy()
    out.putalpha(alfa)
    return out, n


def claros_opacos(im):
    """Conta matte claro ainda opaco, inclusive em vaos fechados."""
    im = im.convert("RGBA")
    n = 0
    for r, g, b, a in im.getdata():
        if a >= 245 and claro_neutro((r, g, b)):
            n += 1
    return n


def cores_de_fundo(im, amostras=4000):
    """As cores que o recorte geometrico ja considerou fundo nesta imagem.

    Devolve uma lista curta de tons, quantizados grosso. Sao eles que dao
    a autorizacao para a mascara da rede apagar: se o pixel nao se parece
    com nenhum deles, nao e fundo, e a rede nao manda.
    """
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()
    conta = {}
    passo = max(1, (w * h) // amostras)
    i = 0

    for y in range(h):
        for x in range(w):
            if px[x, y][3] > 8:
                continue
            # A passada antiga aprendeu preto a partir do RGB escondido em
            # pixels transparentes e, com isso, autorizou apagar cabelo e
            # roupa. Esta ferramenta existe para limpar branco/xadrez: preto
            # transparente nunca e evidencia de fundo para a rede.
            if not claro_neutro(px[x, y][:3]):
                continue
            i += 1
            if i % passo:
                continue
            r, g, b, _ = px[x, y]
            k = (r >> 4, g >> 4, b >> 4)
            conta[k] = conta.get(k, 0) + 1

    if not conta:
        return []

    ordem = sorted(conta.items(), key=lambda kv: -kv[1])[:6]
    return [(k[0] * 16 + 8, k[1] * 16 + 8, k[2] * 16 + 8) for k, _ in ordem]


def parece_fundo(cor, fundos, tol=46):
    """O pixel se parece com alguma cor de fundo desta imagem?

    Sem lista de fundo vale somente o teste de matte claro. Cor escura tem
    poder de veto absoluto sobre a rede.
    """
    r, g, b = cor
    if not fundos:
        return claro_neutro(cor)

    lim = tol * tol
    for f in fundos:
        dr = r - f[0]
        dg = g - f[1]
        db = b - f[2]
        if dr * dr + dg * dg + db * db <= lim:
            return True
    return False


def combina(im, msk, alto=200, baixo=40):
    """A rede pode abrir matte claro, mas nunca fechar alfa nem apagar cor."""
    im = im.convert("RGBA")
    fundos = cores_de_fundo(im)

    a = im.getchannel("A")
    ap = a.load()
    mp = msk.load()
    px = im.load()
    w, h = im.size

    julga = {}

    for y in range(h):
        for x in range(w):
            v = mp[x, y]
            if baixo <= v <= alto:
                continue                      # faixa do meio: nao mexe

            r, g, b, al = px[x, y]
            k = (r, g, b)
            eh = julga.get(k)
            if eh is None:
                eh = parece_fundo(k, fundos)
                julga[k] = eh

            if v < baixo and eh:
                # A rede diz fundo e a cor confirma branco/xadrez. Este e o
                # unico caminho que altera alfa; arte escura fica intocavel.
                ap[x, y] = 0

    out = im.copy()
    out.putalpha(a)
    return out


def limpa(im):
    """Abre matte claro pela borda e usa U2Net so nos vaos restantes.

    Imagem que ja possui transparencia real e nao apresenta matte claro
    ligado a borda volta sem passar pela rede. Essa guarda e o que impede
    uma nova passada de reinterpretar sprites corretos como objeto saliente.
    """
    im = im.convert("RGBA")
    # Alfa real e autoridade. Uma folha recortada pode ter cabelo, prato ou
    # reflexo branco encostando no limite do quadro; reinterpretar sua borda
    # apagou a Klara no casulo em 25/08. Fundo claro so e aberto quando a
    # entrada ainda e totalmente opaca.
    if im.getchannel("A").getextrema()[0] < 245:
        return im

    im, abertos = abre_fundo_claro(im)
    restantes = claros_opacos(im)
    if not abertos:
        return im
    if restantes == 0:
        return im
    return combina(im, mascara(im))


# ---------------------------------------------------------------------------
# grade
# ---------------------------------------------------------------------------

def limpa_grade(im, colunas, linhas):
    """Fatia, limpa cada celula sozinha e remonta.

    A rede precisa de uma coisa por imagem. Doze figuras na mesma folha
    fazem ela escolher uma e apagar o resto - medido, nao suposto.
    """
    im = im.convert("RGBA")
    w, h = im.size
    cw = w // colunas
    ch = h // linhas
    fora = Image.new("RGBA", im.size, (0, 0, 0, 0))

    for r in range(linhas):
        for c in range(colunas):
            caixa = (c * cw, r * ch, (c + 1) * cw, (r + 1) * ch)
            quadro = im.crop(caixa)
            # Celula vazia nao vale uma passada da rede.
            if quadro.getchannel("A").getextrema()[1] < 8:
                continue
            fora.paste(limpa(quadro), caixa)
    return fora


def reforca_preto(im, colunas=1, linhas=1):
    """Recupera preto apagado sem dar a rede poder para remover arte.

    Cada quadro e mostrado a U2Net como RGB opaco. A mascara sugerida so
    entra onde estiver a poucos pixels de alfa ja confirmado. Essa intersecao
    recupera contorno, casaco e cabelo pretos, mas barra os grandes blocos de
    fundo que uma segmentacao imperfeita possa marcar como figura.
    """
    im = im.convert("RGBA")
    w, h = im.size
    cw = w // colunas
    ch = h // linhas
    fora = im.copy()

    for r in range(linhas):
        for c in range(colunas):
            caixa = (c * cw, r * ch, (c + 1) * cw, (r + 1) * ch)
            quadro = im.crop(caixa)
            alfa = quadro.getchannel("A")
            if alfa.getextrema()[1] < 8:
                continue

            opaco = quadro.convert("RGB").convert("RGBA")
            opaco.putalpha(255)
            sugerido = mascara(opaco)

            raio = max(1, min(cw, ch) // 60)
            perto = alfa.point(lambda v: 255 if v > 8 else 0)
            perto = perto.filter(ImageFilter.MaxFilter(raio * 2 + 1))
            adicao = ImageChops.darker(sugerido, perto)

            out = quadro.copy()
            out.putalpha(ImageChops.lighter(alfa, adicao))
            fora.paste(out, caixa)
    return fora


def fecha_volume(im):
    """Preenche apenas vazios internos de um objeto sabidamente solido.

    Um fechamento de dois pixels une falhas curtas no contorno. Depois, um
    flood fill marca o fundo que ainda alcanca a borda da imagem. Somente o
    que ficou cercado recebe alfa; o RGB usado continua sendo o original.
    """
    from collections import deque

    im = im.convert("RGBA")
    w, h = im.size
    alfa = im.getchannel("A")
    contorno = alfa.point(lambda v: 255 if v > 8 else 0)
    contorno = contorno.filter(ImageFilter.MaxFilter(5))
    contorno = contorno.filter(ImageFilter.MinFilter(5))
    cp = contorno.load()

    visto = bytearray(w * h)
    fila = deque()

    def semeia(x, y):
        i = y * w + x
        if not visto[i] and cp[x, y] == 0:
            visto[i] = 1
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
                if not visto[i] and cp[nx, ny] == 0:
                    visto[i] = 1
                    fila.append((nx, ny))

    ap = alfa.load()
    for y in range(h):
        for x in range(w):
            if not visto[y * w + x]:
                ap[x, y] = 255
    out = im.copy()
    out.putalpha(alfa)
    return out


# ---------------------------------------------------------------------------
# esteira
# ---------------------------------------------------------------------------

def arquivos(pasta):
    d = os.path.join(BASE, pasta)
    if not os.path.isdir(d):
        return []
    return [pasta + "/" + f for f in sorted(os.listdir(d)) if f.endswith(".png")]


def conta_vazio(im):
    a = im.convert("RGBA").getchannel("A")
    n = 0
    for v in a.getdata():
        if v < 8:
            n += 1
    return n


def trata(rel, modo):
    caminho = os.path.join(BASE, rel)
    antes = Image.open(caminho).convert("RGBA")
    vazio_antes = conta_vazio(antes)

    if modo == "folha":
        col, lin = FOLHAS["chars"]
        depois = limpa_grade(antes, col, lin)
    elif modo == "grade":
        col, lin = GRADES["icons"]
        depois = limpa_grade(antes, col, lin)
    else:
        depois = limpa(antes)

    vazio_depois = conta_vazio(depois)
    total = antes.size[0] * antes.size[1]
    delta = (vazio_depois - vazio_antes) / float(total) * 100.0

    if not SECO:
        depois.save(caminho)
    return delta


def layouts_da_entrega(d):
    """Grades conhecidas no manifesto e nas folhas extras entregues."""
    layouts = {
        "4c9a58a1-f2ea-45c8-bb2b-19eb383f14f9.png": (3, 1),
        "carmine_ataque_3_frames_348x172.png": (3, 1),
        "carmine_ataque_direita_3_frames_348x172.png": (3, 1),
        "carmine_ataques_3x3_348x516.png": (3, 3),
        "carmine_chars_dropped.png": (3, 1),
        "carmine_novo_design_348x688.png": (3, 4),
        "carmine_spritesheet_completo_348x1204.png": (3, 7),
        "ChatGPT Image Aug 25, 2026, 03_07_09 AM.png": (3, 4),
        "malas_bau_ferramentas.png": (2, 1),
        "porta_2_estados.png": (2, 1),
        "retrato_governanta_2_estados.png": (2, 1),
    }
    manifesto = os.path.join(d, "manifest.json")
    if not os.path.isfile(manifesto):
        return layouts
    try:
        with open(manifesto, "r", encoding="utf-8") as f:
            dados = json.load(f)
        for item in dados.get("assets", {}).values():
            if not isinstance(item, dict):
                continue
            nome = item.get("file")
            grade = item.get("layout")
            if nome and isinstance(grade, list) and len(grade) == 2:
                layouts[nome] = (int(grade[0]), int(grade[1]))
            folha = item.get("sheet")
            quadros = item.get("frames")
            if folha and isinstance(quadros, list) and quadros:
                layouts[folha] = (len(quadros), 1)
    except (OSError, ValueError, TypeError):
        pass
    return layouts


def trata_pasta(pasta):
    """Limpa uma entrega em outra pasta; a origem nunca e sobrescrita."""
    d = pasta if os.path.isabs(pasta) else os.path.join(RAIZ, pasta)
    d = os.path.normpath(d)
    if not os.path.isdir(d):
        sys.stderr.write("pasta ausente: " + d + "\n")
        return 2

    if SAIDA_PASTA:
        saida = SAIDA_PASTA if os.path.isabs(SAIDA_PASTA) else os.path.join(RAIZ, SAIDA_PASTA)
        saida = os.path.normpath(saida)
    else:
        saida = d.rstrip("\\/") + "_limpa"

    dr = os.path.normcase(os.path.realpath(d))
    sr = os.path.normcase(os.path.realpath(saida))
    if sr == dr or sr.startswith(dr + os.sep):
        sys.stderr.write("a saida deve ficar fora da pasta de origem\n")
        return 2
    if os.path.exists(saida) and not SECO:
        sys.stderr.write("saida ja existe; escolha outro --saida: " + saida + "\n")
        return 2

    ignorados = {"AUDITORIA_ANTES.png", "AUDITORIA_RESTAURADA.png",
                 "AUDITORIA_LIMPA.png"}
    todos_png = sorted(f for f in os.listdir(d)
                       if f.lower().endswith(".png") and f not in ignorados)
    nomes = todos_png
    if SO:
        nomes = [f for f in nomes if any(x.lower() in f.lower() for x in SO)]
    layouts = layouts_da_entrega(d)

    print("\nlimpeza segura%s" % (" (seco)" if SECO else ""))
    print("origem: " + d)
    print("saida:  " + saida)
    print("folhas sao cortadas por quadro; mapas/pecas ficam inteiros\n")

    if not SECO:
        os.makedirs(saida)
        for nome in sorted(os.listdir(d)):
            origem = os.path.join(d, nome)
            destino = os.path.join(saida, nome)
            if os.path.isfile(origem) and not nome.lower().endswith(".png"):
                shutil.copy2(origem, destino)

    mexeu = 0
    rejeitados = 0
    for f in nomes:
        caminho = os.path.join(d, f)
        antes = Image.open(caminho).convert("RGBA")
        vazio_antes = conta_vazio(antes)
        nao_claro_antes = antes.size[0] * antes.size[1] - claros_opacos(antes)

        grade = layouts.get(f)
        if grade:
            depois = limpa_grade(antes, grade[0], grade[1])
            modo = "%dx%d" % grade
        else:
            depois = limpa(antes)
            modo = "peca"

        if f in REFORCA_PRETO:
            g = grade or (1, 1)
            depois = reforca_preto(depois, g[0], g[1])
            modo += "+preto"
        if f in VOLUMES_FECHADOS:
            depois = fecha_volume(depois)
            modo += "+solido"

        vazio_depois = conta_vazio(depois)
        total = antes.size[0] * antes.size[1]
        delta = (vazio_depois - vazio_antes) / float(total) * 100.0

        # A operacao so pode abrir pixels claros. Se a contagem de pixels
        # escuros/opacos cair, alguma arte foi atingida e o arquivo e recusado.
        nao_claro_depois = depois.size[0] * depois.size[1] - claros_opacos(depois)
        perda_arte = max(0, nao_claro_antes - nao_claro_depois)
        rejeita = perda_arte > max(8, int(total * 0.0001))
        if rejeita:
            rejeitados += 1
            depois = antes
            delta = 0.0
            nota = "RECUSADO: perda de arte escura"
        else:
            nota = modo
            if abs(delta) > 0.01:
                mexeu += 1

        if not SECO:
            depois.save(os.path.join(saida, f))
        print("  %-46s %+7.2f%%  %s" % (f[:46], delta, nota))

    # Filtros por nome geram uma pasta parcial de proposito. Sem filtro, todo
    # PNG que nao precisou mudar tambem e copiado para formar um pacote completo.
    if not SO and not SECO:
        for f in todos_png:
            destino = os.path.join(saida, f)
            if not os.path.exists(destino):
                shutil.copy2(os.path.join(d, f), destino)

    print("\n%d de %d arquivos mudaram; %d recusados pela trava"
          % (mexeu, len(nomes), rejeitados))
    return 1 if rejeitados else 0


def main():
    if PASTA:
        return trata_pasta(PASTA)

    if not os.path.isdir(BASE):
        sys.stderr.write("rode tools/cobertura_assets.py primeiro\n")
        return 2

    # _sem_pixel e a copia crua que tools/cobertura_pixel.py guarda. Se
    # ela existir agora, foi feita ANTES desta limpeza e esta velha. Ela e
    # arquivada, nao apagada: a proxima passada cria uma copia crua nova.
    velha = os.path.join(BASE, "_sem_pixel")
    if os.path.isdir(velha) and not SECO:
        i = 1
        arquivada = os.path.join(BASE, "_sem_pixel_antes_fundo")
        while os.path.exists(arquivada):
            i += 1
            arquivada = os.path.join(BASE, "_sem_pixel_antes_fundo_%d" % i)
        shutil.move(velha, arquivada)
        print("arquivada a copia crua velha em " + os.path.basename(arquivada))

    plano = []
    for rel in arquivos("chars"):
        plano.append((rel, "folha"))
    for rel in arquivos("icons"):
        plano.append((rel, "grade"))
    for pasta in SOLTAS:
        for rel in arquivos(pasta):
            plano.append((rel, "solta"))

    if SO:
        plano = [p for p in plano if any(s in p[0] for s in SO)]

    print("\nbackgroundremover - U2Net%s\n" % (" (seco)" if SECO else ""))
    print("mapas ficam de fora: sala vista de cima nao tem objeto saliente\n")

    for rel, modo in plano:
        d = trata(rel, modo)
        sinal = "+" if d >= 0 else ""
        print("  ok  %-30s %-7s vazio %s%.2f%%" % (rel, modo, sinal, d))

    print("\n%d arquivos" % len(plano))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
