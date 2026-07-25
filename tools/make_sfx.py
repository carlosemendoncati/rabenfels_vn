#!/usr/bin/env python3
# ==========================================================================
# ARQUIVO RABENFELS - tools/make_sfx.py
#
# Gera os efeitos sonoros do projeto como WAV mono 44.1 kHz 16 bits.
# Usa apenas a biblioteca padrao do Python. Nenhuma dependencia externa,
# nenhum download, nenhum asset de terceiros.
#
# Uso:
#   python3 tools/make_sfx.py
#
# Os arquivos sao gravados em assets/audio/sfx/.
# Regerar sobrescreve. Para substituir por gravacao real, basta colocar
# o arquivo com o mesmo nome na pasta.
# ==========================================================================

import math
import os
import random
import struct
import wave

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), '..', 'assets', 'audio', 'sfx')
OUT_UI = os.path.join(os.path.dirname(__file__), '..', 'assets', 'audio', 'ui')

random.seed(20260724)


def write_wav(name, samples, folder=None):
    """Grava lista de floats -1..1 como WAV mono 16 bits."""
    target = folder or OUT
    os.makedirs(target, exist_ok=True)
    path = os.path.join(target, name)
    peak = max(1e-9, max(abs(s) for s in samples))
    norm = 0.89 / peak
    frames = b''.join(
        struct.pack('<h', int(max(-1.0, min(1.0, s * norm)) * 32767))
        for s in samples
    )
    with wave.open(path, 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(frames)
    print('%-24s %6.2f s  %7d bytes' % (name, len(samples) / SR, len(frames) + 44))


def blank(seconds):
    return [0.0] * int(SR * seconds)


def noise(n):
    return [random.uniform(-1.0, 1.0) for _ in range(n)]


def lowpass(sig, cutoff):
    """Um polo. Suficiente para tirar o brilho digital do ruido branco."""
    a = math.exp(-2.0 * math.pi * cutoff / SR)
    out = []
    y = 0.0
    for x in sig:
        y = (1 - a) * x + a * y
        out.append(y)
    return out


def highpass(sig, cutoff):
    a = math.exp(-2.0 * math.pi * cutoff / SR)
    out = []
    prev_x = 0.0
    y = 0.0
    for x in sig:
        y = a * (y + x - prev_x)
        prev_x = x
        out.append(y)
    return out


def env(sig, attack, decay, curve=2.0):
    """Envelope de ataque linear e queda exponencial."""
    n = len(sig)
    na = max(1, int(SR * attack))
    out = []
    for i, x in enumerate(sig):
        if i < na:
            g = i / na
        else:
            t = (i - na) / max(1, (n - na))
            g = math.exp(-curve * 4.0 * t) * (1.0 - t * decay)
        out.append(x * max(0.0, g))
    return out


def sine(freq, seconds, sweep=0.0):
    n = int(SR * seconds)
    out = []
    phase = 0.0
    for i in range(n):
        f = freq + sweep * (i / n)
        phase += 2 * math.pi * f / SR
        out.append(math.sin(phase))
    return out


def mix(*layers):
    n = max(len(l) for l in layers)
    out = [0.0] * n
    for l in layers:
        for i, v in enumerate(l):
            out[i] += v
    return out


def place(base, layer, at_seconds):
    i0 = int(SR * at_seconds)
    need = i0 + len(layer)
    if len(base) < need:
        base = base + [0.0] * (need - len(base))
    for i, v in enumerate(layer):
        base[i0 + i] += v
    return base


# ---------------------------------------------------------------------------
# sfx_page_turn - papel virando. Ruido filtrado com dois estalos curtos.
# ---------------------------------------------------------------------------
def page_turn():
    body = env(highpass(lowpass(noise(int(SR * 0.34)), 3400), 700), 0.006, 0.4, 3.2)
    tick = env(highpass(noise(int(SR * 0.04)), 1800), 0.001, 0.9, 9.0)
    out = [v * 0.75 for v in body]
    out = place(out, [v * 0.35 for v in tick], 0.015)
    out = place(out, [v * 0.22 for v in tick], 0.21)
    return out


# ---------------------------------------------------------------------------
# sfx_package - pacote pousando na mesa. Baque grave e abafado, com peso.
# ---------------------------------------------------------------------------
def package():
    thud = env(mix(sine(78, 0.42, sweep=-26), [v * 0.5 for v in sine(112, 0.42, sweep=-34)]),
               0.002, 0.6, 3.6)
    wood = env(lowpass(noise(int(SR * 0.19)), 1500), 0.001, 0.8, 6.5)
    leather = env(highpass(lowpass(noise(int(SR * 0.26)), 2600), 900), 0.02, 0.5, 3.0)
    out = mix([v * 0.9 for v in thud], [v * 0.4 for v in wood])
    out = place(out, [v * 0.16 for v in leather], 0.05)
    return out


# ---------------------------------------------------------------------------
# sfx_candle - vela apagando. Sopro curto, sem tom.
# ---------------------------------------------------------------------------
def candle():
    puff = env(lowpass(highpass(noise(int(SR * 0.22)), 400), 2200), 0.008, 0.7, 5.5)
    tail = env(lowpass(noise(int(SR * 0.4)), 700), 0.05, 0.9, 3.0)
    return mix([v * 0.9 for v in puff], [v * 0.13 for v in tail])


# ---------------------------------------------------------------------------
# sfx_door - portao de ferro. Sem rangido, por exigencia do roteiro:
# massa, dobradica bem lubrificada e o baque do batente.
# ---------------------------------------------------------------------------
def door():
    mass = env(lowpass(noise(int(SR * 1.15)), 240), 0.16, 0.55, 1.5)
    rumble = env(sine(41, 1.15, sweep=9), 0.2, 0.6, 1.4)
    latch = env(mix(sine(96, 0.3, sweep=-30), [v * 0.6 for v in lowpass(noise(int(SR * 0.3)), 1100)]),
                0.001, 0.7, 5.0)
    out = mix([v * 0.55 for v in mass], [v * 0.5 for v in rumble])
    out = place(out, [v * 0.5 for v in latch], 0.92)
    return out


# ---------------------------------------------------------------------------
# sfx_footsteps - quatro passos lentos e regulares em madeira.
# ---------------------------------------------------------------------------
def footsteps():
    def step(gain):
        heel = env(mix(sine(88, 0.2, sweep=-30), [v * 0.7 for v in lowpass(noise(int(SR * 0.2)), 1300)]),
                   0.001, 0.75, 6.0)
        board = env(sine(196, 0.13, sweep=-52), 0.002, 0.8, 7.0)
        return [v * gain for v in mix([x * 0.85 for x in heel], [x * 0.18 for x in board])]

    out = blank(2.35)
    for i, t in enumerate([0.02, 0.58, 1.16, 1.72]):
        out = place(out, step(1.0 - i * 0.11), t)
    return out


# ---------------------------------------------------------------------------
# sfx_wind - vento na estrada. Ruido filtrado com modulacao lenta.
# ---------------------------------------------------------------------------
def wind():
    n = int(SR * 5.0)
    base = lowpass(lowpass(noise(n), 620), 380)
    out = []
    for i, v in enumerate(base):
        t = i / SR
        slow = 0.55 + 0.45 * math.sin(2 * math.pi * 0.21 * t + 0.7)
        gust = 0.72 + 0.28 * math.sin(2 * math.pi * 0.067 * t)
        fade = min(1.0, i / (SR * 0.6), (n - i) / (SR * 0.9))
        out.append(v * slow * gust * fade)
    return out




# ==========================================================================
# SONS DE INTERFACE
# Curtos, discretos, sem tom definido que brigue com a trilha.
# ==========================================================================

def ui_hover():
    """Passagem sobre um item de menu. Quase um roçar de papel."""
    body = env(highpass(lowpass(noise(int(SR * 0.075)), 5200), 1900), 0.004, 0.9, 8.0)
    return [v * 0.30 for v in body]


def ui_confirm():
    """Confirmacao. Marca seca com uma quinta grave por baixo."""
    mark = env(highpass(lowpass(noise(int(SR * 0.10)), 3600), 1100), 0.001, 0.9, 9.0)
    low  = env(mix(sine(196, 0.30, sweep=-58), [v * 0.5 for v in sine(294, 0.30, sweep=-70)]),
               0.002, 0.7, 5.0)
    return mix([v * 0.42 for v in mark], [v * 0.40 for v in low])


def ui_back():
    """Retorno. Mesmo gesto do confirmar, invertido e mais grave."""
    low = env(sine(150, 0.26, sweep=-34), 0.004, 0.8, 5.5)
    air = env(lowpass(noise(int(SR * 0.16)), 1500), 0.02, 0.9, 4.0)
    return mix([v * 0.45 for v in low], [v * 0.16 for v in air])


def ui_page():
    """Troca de painel. Folha grossa passando."""
    body = env(highpass(lowpass(noise(int(SR * 0.42)), 2600), 520), 0.02, 0.55, 2.8)
    edge = env(highpass(noise(int(SR * 0.05)), 2400), 0.001, 0.9, 9.0)
    out = [v * 0.55 for v in body]
    return place(out, [v * 0.22 for v in edge], 0.02)


def ui_seal():
    """Selo rompido. Estalo curto e cauda de cera."""
    crack = env(highpass(lowpass(noise(int(SR * 0.09)), 6000), 900), 0.0008, 0.95, 13.0)
    thud  = env(sine(88, 0.34, sweep=-30), 0.002, 0.7, 4.2)
    tail  = env(lowpass(noise(int(SR * 0.5)), 900), 0.03, 0.85, 3.2)
    out = mix([v * 0.75 for v in crack], [v * 0.55 for v in thud])
    return place(out, [v * 0.13 for v in tail], 0.05)


def ui_archive_open():
    """Abertura do arquivo. Gesto de peso: capa cedendo e ar deslocado."""
    swell = env(lowpass(noise(int(SR * 1.30)), 380), 0.35, 0.5, 1.6)
    low   = env(sine(58, 1.30, sweep=13), 0.4, 0.55, 1.3)
    cover = env(lowpass(highpass(noise(int(SR * 0.55)), 420), 2100), 0.05, 0.7, 3.0)
    out = mix([v * 0.50 for v in swell], [v * 0.55 for v in low])
    out = place(out, [v * 0.26 for v in cover], 0.30)
    return out


def ui_route():
    """Alteracao de rota. Marca fina, sem drama."""
    tone = env(mix(sine(523.25, 0.42, sweep=-40), [v * 0.4 for v in sine(784, 0.42, sweep=-60)]),
               0.006, 0.8, 4.6)
    return [v * 0.30 for v in tone]


if __name__ == '__main__':
    write_wav('sfx_page_turn.wav', page_turn())
    write_wav('sfx_package.wav', package())
    write_wav('sfx_candle.wav', candle())
    write_wav('sfx_door.wav', door())
    write_wav('sfx_footsteps.wav', footsteps())
    write_wav('sfx_wind.wav', wind())

    write_wav('ui_hover.wav',        ui_hover(),        OUT_UI)
    write_wav('ui_confirm.wav',      ui_confirm(),      OUT_UI)
    write_wav('ui_back.wav',         ui_back(),         OUT_UI)
    write_wav('ui_page.wav',         ui_page(),         OUT_UI)
    write_wav('ui_seal.wav',         ui_seal(),         OUT_UI)
    write_wav('ui_archive_open.wav', ui_archive_open(), OUT_UI)
    write_wav('ui_route.wav',        ui_route(),        OUT_UI)
    print('ok')
