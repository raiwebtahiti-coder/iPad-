#!/usr/bin/env python3
"""Musique de fond originale (synthétisée en code, libre de droits) : lo-fi douce et lumineuse pour un tuto.
88 bpm, accords Fmaj9 · Am7 · Dm9 · Bbmaj7 (2 mesures chacun), piano électrique, nappe chaude, basse ronde,
batterie feutrée (kick doux, rim, shaker). Sortie : assets/audio/musique.wav (stéréo 44,1 kHz).
Usage : python3 script/music.py <durée s> <sortie.wav>"""
import sys
import numpy as np
import soundfile as sf
from scipy import signal

DUR = float(sys.argv[1]); OUT = sys.argv[2]
SR = 44100; BPM = 88.0; BEAT = 60 / BPM; BAR = 4 * BEAT
N = int(SR * DUR)
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(689)

def midi(m): return 440.0 * 2 ** ((m - 69) / 12)
def add(x, t0, g=1.0, pan=0.0):
    i = int(t0 * SR)
    if i >= N: return
    x = x[: N - i]
    L[i:i + len(x)] += x * g * np.sqrt(0.5 * (1 - pan))
    R[i:i + len(x)] += x * g * np.sqrt(0.5 * (1 + pan))
def env(n, a, d):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)

CH = [  # (racine basse, notes de l'accord)
    (41, [53, 57, 60, 64, 67]),   # Fmaj9
    (45, [52, 55, 57, 60, 64]),   # Am7
    (38, [50, 53, 57, 60, 64]),   # Dm9
    (46, [50, 53, 57, 58, 62]),   # Bbmaj7
]

def epiano(f, d, vel=1.0):
    n = int(d * SR); t = np.arange(n) / SR
    mod = 1.2 * np.exp(-t / 0.25) * np.sin(2 * np.pi * f * 2 * t)
    x = np.sin(2 * np.pi * f * t + mod) * env(n, 0.004, 0.9) + 0.25 * np.sin(2 * np.pi * f * 3 * t) * env(n, 0.002, 0.18)
    return x * vel
def pad(freqs, d):
    n = int(d * SR); t = np.arange(n) / SR
    x = np.zeros(n)
    for f in freqs:
        for det in (-0.12, 0.0, 0.12):
            x += signal.sawtooth(2 * np.pi * f * 2 ** (det / 12) * t) / 3
    x = signal.sosfilt(signal.butter(2, 900, 'low', fs=SR, output='sos'), x)
    a = np.minimum(1, t / 0.6) * np.minimum(1, (d - t) / 0.6)
    return x * a / len(freqs)
def bass(f, d):
    n = int(d * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * f * 2 * t)) * env(n, 0.01, 0.6)
def kick():
    n = int(0.35 * SR); t = np.arange(n) / SR
    f = 50 + 70 * np.exp(-t / 0.04)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.002, 0.12)
def rim():
    n = int(0.12 * SR); x = rng.standard_normal(n)
    x = signal.sosfilt(signal.butter(2, [1800, 5200], 'band', fs=SR, output='sos'), x)
    return x * env(n, 0.001, 0.03)
def shaker():
    n = int(0.08 * SR); x = rng.standard_normal(n)
    x = signal.sosfilt(signal.butter(2, 7000, 'high', fs=SR, output='sos'), x)
    return x * env(n, 0.006, 0.025)

nbar = int(np.ceil(DUR / BAR)) + 1
for b in range(nbar):
    t0 = b * BAR
    root, notes = CH[(b // 2) % 4]
    if b % 2 == 0:
        add(pad([midi(m) for m in notes[:4]], 2 * BAR + 0.5), t0, 0.16)
    add(bass(midi(root), BAR * 0.95), t0, 0.32)
    add(bass(midi(root), BEAT * 1.4), t0 + 2.5 * BEAT, 0.18)
    # piano : accord au premier temps, petite figure ensuite
    for k, m in enumerate(notes[:4]):
        add(epiano(midi(m), 2.2, 0.22), t0 + k * 0.012, 0.9, pan=-0.3 + 0.2 * k)
    fig = [notes[4], notes[2], notes[3], notes[1]]
    for k, m in enumerate(fig):
        add(epiano(midi(m + 12), 1.2, 0.12), t0 + (1.5 + k * 0.75) * BEAT, 1.0, pan=0.35 - 0.2 * k)
    # batterie feutrée (entre après 2 mesures, s'arrête 2 mesures avant la fin)
    if 2 <= b and t0 < DUR - 2 * BAR:
        for q in (0, 2.5):
            add(kick(), t0 + q * BEAT, 0.42)
        for q in (1, 3):
            add(rim(), t0 + q * BEAT, 0.12, pan=0.1)
        for q in range(8):
            add(shaker(), t0 + q * BEAT / 2 + (0.02 if q % 2 else 0), 0.05 if q % 2 else 0.035, pan=0.4)

mix = np.stack([L, R], 1)
mix = signal.sosfilt(signal.butter(1, 30, 'high', fs=SR, output='sos'), mix, axis=0)
fade_in, fade_out = int(1.5 * SR), int(3.5 * SR)
mix[:fade_in] *= np.linspace(0, 1, fade_in)[:, None]
mix[-fade_out:] *= np.linspace(1, 0, fade_out)[:, None]
mix /= np.max(np.abs(mix)) + 1e-9
sf.write(OUT, (mix * 0.8).astype(np.float32), SR)
print("musique", OUT, round(DUR, 2), "s")
