#!/usr/bin/env python3
# ==========================================================================
# ARQUIVO RABENFELS - tools/make_menu_theme.py
#
# Gera uma trilha de menu sintetizada, como WAV mono 44.1 kHz 16 bits.
#
# ATENCAO: o jogo usa a trilha propria do projeto, em
# assets/audio/music/menu_theme.ogg. Este script existe como reserva e
# grava em menu_theme_synth.wav para nao sobrescrever aquele arquivo.
# Somente biblioteca padrao do Python. Nenhum download, nenhum asset de
# terceiros, nenhum material com direitos de outra obra.
#
# Carater pretendido: lento, modal, camara escura. Cordas graves,
# caixinha de musica distante, ressonancia metalica, camada ambiente.
# Sem percussao, sem climax, sem melodia alegre.
#
# O loop e construido para fechar sem emenda: a peca dura um numero
# inteiro de compassos e as caudas que ultrapassam o fim sao somadas de
# volta no inicio.
#
# Uso:
#   python3 tools/make_menu_theme.py
# ==========================================================================

import math
import os
import random
import struct
import wave

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), '..', 'assets', 'audio', 'music')

random.seed(1893)

# --- estrutura ------------------------------------------------------------
BPM = 52.0
BEAT = 60.0 / BPM
BARS = 16
BEATS_PER_BAR = 4
TOTAL = BARS * BEATS_PER_BAR * BEAT      # duracao do loop em segundos
N = int(SR * TOTAL)

# Re menor eolio. Frequencias em Hz.
NOTE = {
    'D2': 73.42, 'A2': 110.00, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61,
    'G3': 196.00, 'A3': 220.00, 'Bb3': 233.08, 'C4': 261.63, 'D4': 293.66,
    'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'Bb4': 466.16,
    'C5': 523.25, 'D5': 587.33, 'F5': 698.46, 'A5': 880.00,
}


def add(buf, start, data, gain=1.0):
    """Soma data em buf a partir de start, dobrando a cauda para o inicio."""
    i0 = int(SR * start)
    for i, v in enumerate(data):
        buf[(i0 + i) % N] += v * gain


def env_adsr(n, attack, decay, sustain, release):
    """Envelope em amostras. attack/decay/release em segundos."""
    a = max(1, int(SR * attack))
    d = max(1, int(SR * decay))
    r = max(1, int(SR * release))
    s = max(0, n - a - d - r)
    out = []
    for i in range(a):
        out.append(i / a)
    for i in range(d):
        out.append(1.0 + (sustain - 1.0) * (i / d))
    for _ in range(s):
        out.append(sustain)
    for i in range(r):
        out.append(sustain * (1.0 - i / r))
    return out[:n] + [0.0] * max(0, n - len(out))


def strings(freq, dur, gain=1.0, detune=0.16):
    """Cordas graves: tres serras levemente desafinadas, filtradas."""
    n = int(SR * dur)
    env = env_adsr(n, 0.55, 0.7, 0.72, dur * 0.42)
    out = [0.0] * n
    for k, mul in enumerate((1.0, 1.0 + detune / 100.0, 1.0 - detune / 100.0)):
        ph = random.random()
        f = freq * mul
        for i in range(n):
            t = i / SR
            # serra suavizada por soma de harmonicos decrescentes
            v = 0.0
            for h in range(1, 7):
                v += math.sin(2 * math.pi * f * h * t + ph * h) / (h * h)
            out[i] += v
    # vibrato lento de amplitude
    for i in range(n):
        t = i / SR
        out[i] *= env[i] * (0.86 + 0.14 * math.sin(2 * math.pi * 0.21 * t))
    return [v * gain * 0.34 for v in out]


def music_box(freq, dur, gain=1.0):
    """Caixinha de musica: senoide com parciais inarmonicos e queda rapida."""
    n = int(SR * dur)
    out = [0.0] * n
    parts = ((1.0, 1.0), (2.76, 0.34), (5.40, 0.14), (8.93, 0.06))
    for mul, amp in parts:
        f = freq * mul
        decay = 3.4 / mul
        for i in range(n):
            t = i / SR
            out[i] += math.sin(2 * math.pi * f * t) * amp * math.exp(-decay * t)
    atk = int(SR * 0.004)
    for i in range(min(atk, n)):
        out[i] *= i / atk
    return [v * gain * 0.20 for v in out]


def bell(freq, dur, gain=1.0):
    """Ressonancia metalica distante."""
    n = int(SR * dur)
    out = [0.0] * n
    for mul, amp, dec in ((1.0, 1.0, 0.9), (2.01, 0.5, 1.3), (3.03, 0.28, 1.8),
                          (4.72, 0.16, 2.4)):
        f = freq * mul
        for i in range(n):
            t = i / SR
            out[i] += math.sin(2 * math.pi * f * t) * amp * math.exp(-dec * t)
    atk = int(SR * 0.012)
    for i in range(min(atk, n)):
        out[i] *= i / atk
    return [v * gain * 0.13 for v in out]


def choir(freq, dur, gain=1.0):
    """Textura vocal contida: formantes sobre a fundamental."""
    n = int(SR * dur)
    env = env_adsr(n, 1.1, 0.9, 0.66, dur * 0.5)
    out = [0.0] * n
    formants = ((1.0, 1.0), (2.0, 0.30), (3.0, 0.16), (4.0, 0.08), (6.0, 0.04))
    ph = [random.random() * 6.283 for _ in formants]
    for k, (mul, amp) in enumerate(formants):
        f = freq * mul
        for i in range(n):
            t = i / SR
            # leve instabilidade de afinacao, como voz humana
            drift = 1.0 + 0.0016 * math.sin(2 * math.pi * 0.13 * t + k)
            out[i] += math.sin(2 * math.pi * f * drift * t + ph[k]) * amp
    for i in range(n):
        out[i] *= env[i]
    return [v * gain * 0.11 for v in out]


def ambience(n):
    """Camada ambiente: ruido filtrado com respiracao muito lenta."""
    raw = [random.uniform(-1, 1) for _ in range(n)]
    # dois polos de passa-baixa em cascata
    out = []
    y1 = y2 = 0.0
    a = math.exp(-2.0 * math.pi * 190.0 / SR)
    for x in raw:
        y1 = (1 - a) * x + a * y1
        y2 = (1 - a) * y1 + a * y2
        out.append(y2)
    for i in range(n):
        t = i / SR
        slow = 0.55 + 0.45 * math.sin(2 * math.pi * 0.037 * t)
        out[i] *= slow * 0.55
    return out


def write_wav(name, samples):
    os.makedirs(OUT, exist_ok=True)
    path = os.path.join(OUT, name)
    peak = max(1e-9, max(abs(s) for s in samples))
    norm = 0.82 / peak
    frames = b''.join(
        struct.pack('<h', int(max(-1.0, min(1.0, s * norm)) * 32767))
        for s in samples
    )
    with wave.open(path, 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(frames)
    print('%-22s %6.2f s  %8d bytes' % (name, len(samples) / SR, len(frames) + 44))


def build():
    buf = [0.0] * N
    bar = BEATS_PER_BAR * BEAT

    # --- fundacao: pedal e progressao modal -------------------------------
    # Dm  -  Bb  -  F   -  Gm   (repetido, com variacao na segunda volta)
    prog = [
        ('D2', ('D3', 'F3', 'A3')),
        ('Bb3', ('Bb3', 'D4', 'F4')),
        ('F3', ('F3', 'A3', 'C4')),
        ('G3', ('G3', 'Bb3', 'D4')),
    ]
    for b in range(BARS):
        root, chord = prog[b % 4]
        t0 = b * bar
        # baixo sustentado
        add(buf, t0, strings(NOTE[root] / 2.0, bar * 1.9, gain=0.9))
        # acorde de cordas, entra meio tempo depois
        for j, note in enumerate(chord):
            add(buf, t0 + 0.18 + j * 0.05,
                strings(NOTE[note], bar * 1.7, gain=0.42))

    # --- coro contido: entra na segunda metade ----------------------------
    for b in range(BARS // 2, BARS):
        root, chord = prog[b % 4]
        t0 = b * bar
        add(buf, t0 + 0.3, choir(NOTE[chord[0]] * 2, bar * 1.6, gain=0.75))
        if b % 2 == 1:
            add(buf, t0 + 0.5, choir(NOTE[chord[2]] * 2, bar * 1.3, gain=0.45))

    # --- caixinha de musica: motivo de quatro notas -----------------------
    # Sobe e nao resolve. Repete deslocado, como memoria imprecisa.
    motif = [('D5', 0.0), ('F5', 1.0), ('E4', 2.0), ('A4', 3.0)]
    for b in range(0, BARS, 4):
        t0 = b * bar
        for note, off in motif:
            add(buf, t0 + off * BEAT, music_box(NOTE[note], 2.6, gain=1.0))
        # eco defasado, mais baixo
        for note, off in motif:
            add(buf, t0 + (off + 0.5) * BEAT + bar,
                music_box(NOTE[note], 2.2, gain=0.34))

    # --- sinos: pontuacao rara -------------------------------------------
    for b in (0, 7, 11):
        add(buf, b * bar + 0.05, bell(NOTE['D3'], 5.5, gain=1.0))
    add(buf, 14 * bar, bell(NOTE['A2'], 6.5, gain=0.7))

    # --- ambiente ---------------------------------------------------------
    amb = ambience(N)
    for i in range(N):
        buf[i] += amb[i] * 0.055

    return buf


if __name__ == '__main__':
    write_wav('menu_theme_synth.wav', build())
    print('ok')
