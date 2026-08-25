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
COMO AS DUAS MASCARAS SE COMBINAM
------------------------------------------------------------------
A rede decide a SILHUETA e a geometria preserva a BORDA:

    mascara alta (>200)   alfa 255      tapa furo que o preenchimento
                                        abriu no meio do cabelo claro
    mascara baixa (<40)   alfa 0        mata ilha de residuo solta
    entre as duas         alfa antigo   a borda fina - ponta de tranca,
                                        franja de saia - fica como estava

Sem a faixa do meio, a ponta dos tentaculos do vulto some: a rede
arredonda o que e mais fino que o proprio passo dela.
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


def combina(im, msk, alto=200, baixo=40):
    """Junta a mascara da rede ao alfa que ja existe. Ver o cabecalho."""
    a = im.getchannel("A")
    ap = a.load()
    mp = msk.load()
    w, h = im.size

    for y in range(h):
        for x in range(w):
            v = mp[x, y]
            if v > alto:
                ap[x, y] = 255
            elif v < baixo:
                ap[x, y] = 0
            # entre os dois: nao mexe

    out = im.copy()
    out.putalpha(a)
    return out


def limpa(im):
    return combina(im.convert("RGBA"), mascara(im))


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


def main():
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
