# -*- coding: utf-8 -*-
"""
tools/cobertura_pixel.py

Passa o kit de "A Cobertura" por pixelit e por uma paleta.

Porte do algoritmo de https://github.com/giventofly/pixelit
(Jose Moreira, MIT). Sao dois passos e os dois estao ali:

  pixelate()       reduz a imagem por um fator e a devolve ao tamanho
                   original com vizinho mais proximo. O passo de descida
                   e suavizado - no original e um drawImage com
                   suavizacao ligada - e e ele que faz a media do bloco;
                   a subida e dura e e ela que faz o degrau.

  convertPalette() troca cada pixel pela cor mais parecida da paleta,
                   medida por distancia euclidiana em RGB. E o colorSim()
                   do original, sem ponderacao perceptual - de proposito,
                   porque e o que da o corte seco de arte de 8 bits.

O que este arquivo acrescenta ao original:

  ALFA. pixelit trabalha em RGB e ignora transparencia. Aqui o alfa
  passa pelo MESMO degrau do bloco e depois e cortado em degraus de
  quatro niveis. Sem isso o contorno da personagem continuaria macio
  em cima de um miolo em degrau, que e o defeito que denuncia pixel art
  falso a dez metros.

  PALETA POR PERSONAGEM. O pedido do autor: "paleta de cores unicas para
  cada personagem e sprite". Cada folha ganha os neutros do mundo mais
  as proprias cores, tiradas dela mesma por mediana de corte. Assim as
  duas Klaras dividem o branco e nao dividem o vermelho, e a Antoniette
  e a unica dona do dourado.

Uso:

    python tools/cobertura_pixel.py            trata tudo
    python tools/cobertura_pixel.py --bloco 3  degrau mais grosso
    python tools/cobertura_pixel.py --bloco 1  so a paleta, sem degrau

Trabalha SEMPRE sobre a copia limpa atualizada por
tools/cobertura_assets.py, e nunca sobre o kit bruto: a ordem e recortar,
depois pixelar. Rodar este script outra vez e seguro porque ele volta a
essa copia antes de aplicar o degrau.
"""

import json
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
CRU  = os.path.join(BASE, "_sem_pixel")


def opcao(nome):
    if nome in sys.argv:
        i = sys.argv.index(nome)
        if i + 1 < len(sys.argv):
            return sys.argv[i + 1]
    return None


PASTA = opcao("--pasta")
SAIDA_PASTA = opcao("--saida")


def arg(nome, padrao):
    if nome in sys.argv:
        i = sys.argv.index(nome)
        if i + 1 < len(sys.argv):
            try:
                return int(sys.argv[i + 1])
            except ValueError:
                pass
    return padrao


BLOCO = arg("--bloco", 2)


# ---------------------------------------------------------------------------
# paletas
#
# Duas famílias. O MUNDO tem uma paleta so - cenario, movel e icone -
# para que duas salas nao pareçam dois jogos. Cada PERSONAGEM tem a
# propria, tirada da propria arte, para que as duas Klaras dividam o
# branco e nao dividam o vermelho, e a Antoniette seja a unica dona do
# dourado. Foi o pedido do autor, e tambem e o que separa figura de
# fundo numa tela em que quase tudo e escuro.
# ---------------------------------------------------------------------------

def hexa(*cores):
    out = []
    for c in cores:
        c = c.lstrip("#")
        out.append((int(c[0:2], 16), int(c[2:4], 16), int(c[4:6], 16)))
    return out


# Pedra. Rampa neutra puxando para quente, medida nos proprios mapas: dos
# vinte e seis tons dominantes do kit, vinte e quatro tem R maior ou igual
# a B. A rampa antiga vinha de --rbf-panel e --rbf-raised, que sao as
# superficies do arquivo e sao FRIAS por escrito em css/tokens.css - com
# elas o piso do escritorio saiu cor de ardosia.
#
# Dezesseis degraus porque a arte inteira das salas vive entre 6 e 66 de
# luminancia: com menos degraus ali embaixo, o ladrilho vira mancha.
PEDRA = hexa(
    "#050404", "#0a0808", "#0f0c0c", "#141010", "#1a1515", "#201a19",
    "#28211f", "#312926", "#3b322e", "#473c37", "#554842", "#65564e",
    "#7a695f", "#95867a", "#b5a89a", "#d9d5c8"
)

# Quentes: o couro, a madeira e o latao dos moveis. Saem do ouro e do
# par tinta-sobre-pergaminho de css/tokens.css.
QUENTES = hexa(
    "#1a1410", "#2a2018", "#3a2c1e", "#4a3a2c", "#6b5330",
    "#8a6c3c", "#b9975b", "#e0c391"
)

# Vermelhos: o selo, o sangue e o que quer que seja a Khar'Vel.
RUBROS = hexa(
    "#1b0a0d", "#2e1013", "#4a161c", "#5e1a22", "#7a1f2a",
    "#8c2733", "#a83240", "#b8414f", "#d2646f"
)

# Frio, e so onde ele existe: o vidro do cilindro e o metal do carrinho.
# Tres tons, e nao dezesseis - o frio aqui e excecao, nao ambiente.
FRIO = hexa("#171d21", "#2b383f", "#7fa6b8")

# O mundo: cenario, movel, icone. Uma paleta so, para que duas salas
# diferentes nao pareçam dois jogos.
PALETA_MUNDO = PEDRA + QUENTES + RUBROS[:6] + FRIO

# Base comum de todo personagem. O resto de cada um vem da propria arte.
BASE_PERSONAGEM = hexa("#04050a", "#12131b", "#262936", "#4a4d57",
                       "#8e897d", "#d9d5c8")

# Quantas cores proprias cada folha ganha, alem da base.
PROPRIAS = {
    "chars/antoniette.png":   14,
    "chars/klara.png":        12,
    "chars/klara_casulo.png": 14,
    "chars/vulto.png":        10,
    "chars/carmine.png":      14,
    "chars/carmine_ataque.png": 14,
    "faces/klara.png":        16,
    "faces/klara_casulo.png": 18,
    "faces/vulto.png":        12,
    "faces/carmine.png":      18,
}


# ---------------------------------------------------------------------------
# pixelit
# ---------------------------------------------------------------------------

def pixelate(im, bloco):
    """pixelate() do pixelit, com o alfa junto.

    O original perde a transparencia porque desenha num canvas RGB. Aqui
    o alfa desce e sobe pelo mesmo caminho, senao o contorno fica macio
    em cima de um miolo em degrau.
    """
    if bloco <= 1:
        return im
    w, h = im.size
    pw = max(1, w // bloco)
    ph = max(1, h // bloco)
    pequena = im.resize((pw, ph), Image.BOX)       # media do bloco
    return pequena.resize((w, h), Image.NEAREST)   # degrau


def paleta_da_imagem(im, n):
    """Cores proprias da folha, por mediana de corte.

    Pillow quantiza so RGB; o alfa e descartado aqui de proposito -
    interessa a cor, e nao onde ela esta.
    """
    rgb = Image.new("RGB", im.size, (0, 0, 0))
    rgb.paste(im, (0, 0), im)
    q = rgb.quantize(colors=max(2, n), method=Image.MEDIANCUT)
    pal = q.getpalette()[: max(2, n) * 3]
    cores = [tuple(pal[i:i + 3]) for i in range(0, len(pal), 3)]

    # Tira o preto do fundo, que entrou pelo paste e nao e cor da arte.
    return [c for c in cores if sum(c) > 12]


def aplica_paleta(im, paleta):
    """convertPalette() do pixelit: vizinho mais proximo em RGB.

    Cache por cor de entrada porque a imagem ja passou pelo degrau e tem
    poucas cores distintas - sem ele, uma sala de 1300x1000 faz um milhao
    e trezentas mil buscas lineares.
    """
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    cache = {}

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            chave = (r, g, b)
            cor = cache.get(chave)
            if cor is None:
                melhor = paleta[0]
                dist = 1e18
                for c in paleta:
                    dr = r - c[0]
                    dg = g - c[1]
                    db = b - c[2]
                    d = dr * dr + dg * dg + db * db
                    if d <= dist:
                        dist = d
                        melhor = c
                cor = melhor
                cache[chave] = cor
            px[x, y] = (cor[0], cor[1], cor[2], a)
    return im


def degraus_de_alfa(im, niveis=4):
    """Corta o alfa em degraus.

    Quatro niveis, e nao dois: com corte binario a saia da Antoniette
    perde a franja e o vulto perde a ponta dos tentaculos, que sao meio
    transparentes na arte de origem.
    """
    a = im.getchannel("A")
    passo = 255.0 / (niveis - 1)
    a = a.point(lambda v: 0 if v < 24 else int(round(v / passo) * passo))
    out = im.copy()
    out.putalpha(a)
    return out


# ---------------------------------------------------------------------------
# plano
# ---------------------------------------------------------------------------

def lista(pasta):
    d = os.path.join(BASE, pasta)
    if not os.path.isdir(d):
        return []
    return [pasta + "/" + f for f in sorted(os.listdir(d)) if f.endswith(".png")]


def guarda_cru(rel):
    """Devolve o recorte limpo guardado pela etapa de assets.

    Pixelar duas vezes empilha degrau em cima de degrau e a imagem vira
    papelao. A copia e criada aqui apenas como compatibilidade com kits
    antigos; nas entregas novas, cobertura_assets.py sempre a atualiza.
    """
    origem = os.path.join(BASE, rel)
    copia  = os.path.join(CRU, rel)
    d = os.path.dirname(copia)
    if not os.path.isdir(d):
        os.makedirs(d)
    if not os.path.isfile(copia):
        Image.open(origem).save(copia)
    return copia


def trata(rel, paleta, bloco):
    cru = guarda_cru(rel)
    im = Image.open(cru).convert("RGBA")

    im = pixelate(im, bloco)
    im = degraus_de_alfa(im)
    im = aplica_paleta(im, paleta)

    im.save(os.path.join(BASE, rel))
    return im.size, len(paleta)


def personagem_da_entrega(nome):
    """Classifica apenas figuras; retratos de parede continuam no mundo."""
    n = nome.lower()
    if n == "4c9a58a1-f2ea-45c8-bb2b-19eb383f14f9.png":
        return True
    if n == "chatgpt image aug 25, 2026, 03_07_09 am.png":
        return True
    return any(ch in n for ch in ("antoniette", "fenn", "dara", "carmine"))


def trata_pasta(pasta):
    """Pixeliza uma entrega inteira sem tocar na origem."""
    origem = pasta if os.path.isabs(pasta) else os.path.join(RAIZ, pasta)
    origem = os.path.normpath(origem)
    if not os.path.isdir(origem):
        sys.stderr.write("pasta ausente: " + origem + "\n")
        return 2

    if SAIDA_PASTA:
        saida = SAIDA_PASTA if os.path.isabs(SAIDA_PASTA) else os.path.join(RAIZ, SAIDA_PASTA)
        saida = os.path.normpath(saida)
    else:
        saida = origem.rstrip("\\/") + "_pixel"
    er = os.path.normcase(os.path.realpath(origem))
    sr = os.path.normcase(os.path.realpath(saida))
    if sr == er or sr.startswith(er + os.sep):
        sys.stderr.write("a saida deve ficar fora da pasta de origem\n")
        return 2
    if os.path.exists(saida):
        sys.stderr.write("saida ja existe; escolha outro --saida: " + saida + "\n")
        return 2

    os.makedirs(saida)
    for nome in sorted(os.listdir(origem)):
        src = os.path.join(origem, nome)
        if os.path.isfile(src) and not nome.lower().endswith(".png"):
            shutil.copy2(src, os.path.join(saida, nome))

    nomes = sorted(n for n in os.listdir(origem)
                   if n.lower().endswith(".png") and not n.startswith("AUDITORIA_"))
    relatorio = []
    print("\npixelit seguro - bloco de %d" % BLOCO)
    print("origem: " + origem)
    print("saida:  " + saida + "\n")

    for nome in nomes:
        im = Image.open(os.path.join(origem, nome)).convert("RGBA")
        if personagem_da_entrega(nome):
            propria = paleta_da_imagem(im, 16)
            paleta = BASE_PERSONAGEM + propria
            familia = "personagem"
        else:
            paleta = PALETA_MUNDO
            familia = "mundo"

        out = pixelate(im, BLOCO)
        out = degraus_de_alfa(out)
        out = aplica_paleta(out, paleta)
        out.save(os.path.join(saida, nome))
        relatorio.append({
            "arquivo": nome,
            "familia": familia,
            "tamanho": [out.width, out.height],
            "cores_paleta": len(paleta),
            "bloco": BLOCO,
        })
        print("  ok  %-46s %-10s %2d cores" %
              (nome[:46], familia, len(paleta)))

    with open(os.path.join(saida, "RELATORIO_PIXEL.json"), "w",
              encoding="utf-8") as f:
        json.dump({
            "origem": origem,
            "saida": saida,
            "bloco": BLOCO,
            "arquivos": relatorio,
        }, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print("\n%d arquivos; a origem permaneceu intacta" % len(nomes))
    return 0


def main():
    if PASTA:
        return trata_pasta(PASTA)

    if not os.path.isdir(BASE):
        sys.stderr.write("rode tools/cobertura_assets.py primeiro\n")
        return 2

    print("\npixelit - bloco de %d pixel%s\n" % (BLOCO, "" if BLOCO == 1 else "s"))

    total = 0

    print("mundo (paleta unica, %d cores)" % len(PALETA_MUNDO))
    for rel in lista("maps") + lista("props") + lista("icons"):
        t, n = trata(rel, PALETA_MUNDO, BLOCO)
        total += 1
        print("  ok  %-30s %dx%d" % (rel, t[0], t[1]))

    print("\npersonagens (paleta propria por folha)")
    for rel in lista("chars") + lista("faces"):
        cru = guarda_cru(rel)
        n = PROPRIAS.get(rel, 12)
        propria = paleta_da_imagem(Image.open(cru).convert("RGBA"), n)
        paleta = BASE_PERSONAGEM + propria
        t, k = trata(rel, paleta, BLOCO)
        total += 1
        print("  ok  %-30s %dx%d  %d cores (%d proprias)"
              % (rel, t[0], t[1], k, len(propria)))

    print("\n%d arquivos. O recorte sem degrau ficou em %s"
          % (total, os.path.relpath(CRU, RAIZ)))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
