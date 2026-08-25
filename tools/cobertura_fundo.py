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
import os
import shutil
import sys

try:
    from PIL import Image
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


# --pasta trata uma pasta inteira de material BRUTO, antes do recorte.
PASTA = opcao("--pasta")
if PASTA and PASTA in SO:
    SO.remove(PASTA)


# Folhas de caminhada: quadro de 3 colunas por 4 linhas. O tamanho sai da
# propria imagem, e nao de uma tabela - a tabela envelheceria junto com
# tools/cobertura_assets.py e as duas iam divergir em silencio.
FOLHAS = {"chars": (3, 4)}

# Grade de icones.
GRADES = {"icons": (4, 4)}

# Peca solta.
SOLTAS = ("props", "faces")


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

    Sem lista de fundo - imagem que chegou opaca inteira - vale o teste
    generico do xadrez: claro e dessaturado.
    """
    r, g, b = cor
    if not fundos:
        return r > 226 and g > 226 and b > 226 and (max(cor) - min(cor)) <= 18

    lim = tol * tol
    for f in fundos:
        dr = r - f[0]
        dg = g - f[1]
        db = b - f[2]
        if dr * dr + dg * dg + db * db <= lim:
            return True
    return False


def combina(im, msk, alto=200, baixo=40):
    """Junta a mascara da rede ao alfa que ja existe. Ver o cabecalho."""
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

            if v < baixo:
                # a rede diz fundo. So apaga se a cor concordar.
                if eh:
                    ap[x, y] = 0
            else:
                # a rede diz figura. So tapa furo se a cor nao for fundo.
                if al == 0 and not eh:
                    ap[x, y] = 255

    out = im.copy()
    out.putalpha(a)
    return out


def limpa(im):
    """Duas passadas: a cor chapada primeiro, a rede depois.

    A ordem importa. Sem abrir o chapado antes, `cores_de_fundo` nao acha
    nenhum pixel transparente para amostrar, cai no teste generico de
    xadrez, e uma peca sobre fundo branco passa inteira sem ser tocada -
    porque para ela o branco E a cor mais comum da imagem.
    """
    im = abre_chapado(im)
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


def trata_pasta(pasta):
    """Limpeza geral sobre material bruto, arquivo por arquivo."""
    d = pasta if os.path.isabs(pasta) else os.path.join(RAIZ, pasta)
    if not os.path.isdir(d):
        sys.stderr.write("pasta ausente: " + d + "\n")
        return 2

    nomes = sorted(f for f in os.listdir(d) if f.lower().endswith(".png"))
    if SO:
        nomes = [f for f in nomes if any(x.lower() in f.lower() for x in SO)]

    print("\nlimpeza geral em %s%s\n" % (pasta, " (seco)" if SECO else ""))
    mexeu = 0

    for f in nomes:
        caminho = os.path.join(d, f)
        antes = Image.open(caminho).convert("RGBA")
        vazio_antes = conta_vazio(antes)

        cor = chapado(antes)
        depois = limpa(antes)

        vazio_depois = conta_vazio(depois)
        total = antes.size[0] * antes.size[1]
        delta = (vazio_depois - vazio_antes) / float(total) * 100.0

        nota = ""
        if cor:
            nota = "fundo chapado #%02x%02x%02x" % cor
        if abs(delta) > 0.01:
            mexeu += 1
            if not SECO:
                depois.save(caminho)

        print("  %-46s %+6.2f%%  %s" % (f[:46], delta, nota))

    print("\n%d de %d arquivos mudaram" % (mexeu, len(nomes)))
    return 0


def main():
    if PASTA:
        return trata_pasta(PASTA)

    if not os.path.isdir(BASE):
        sys.stderr.write("rode tools/cobertura_assets.py primeiro\n")
        return 2

    # _sem_pixel e a copia crua que tools/cobertura_pixel.py guarda. Se
    # ela existir agora, foi feita ANTES desta limpeza e esta velha: a
    # proxima passada de pixel partiria do alfa sujo e desfaria tudo.
    velha = os.path.join(BASE, "_sem_pixel")
    if os.path.isdir(velha) and not SECO:
        shutil.rmtree(velha)
        print("removida a copia crua velha de _sem_pixel")

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
