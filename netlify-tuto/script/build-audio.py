#!/usr/bin/env python3
"""Mix final : voix (script/voix.wav) + musique (baissée sous la voix, remonte dans les silences) + bruitages des
sections (compositions/<id>.sfx.json, temps locaux décalés au début de chaque section) -> assets/audio/mix.wav.
Niveau : -16 LUFS, crête sous -1,5 dBTP. Usage : python3 script/build-audio.py [gain_musique_dB]"""
import json, os, subprocess, sys
import numpy as np
import soundfile as sf
from scipy import signal

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SFXDIR = os.path.join(HERE, "..", ".claude", "skills", "media-use", "audio", "assets", "sfx")
SR = 44100
MUSIC_DB = float(sys.argv[1]) if len(sys.argv) > 1 else -20.0
tm = json.load(open(os.path.join(HERE, "script/timing.json")))
TOTAL = tm["total"]; N = int(TOTAL * SR)

def load(path):
    x, sr = sf.read(path, always_2d=True, dtype="float32")
    if x.shape[1] == 1: x = np.repeat(x, 2, 1)
    if sr != SR: x = signal.resample_poly(x, SR, sr, axis=0)
    return x[:, :2]

voice = load(os.path.join(HERE, "script/voix.wav"))[:N]
voice = np.pad(voice, ((0, N - len(voice)), (0, 0)))
# voix : un peu de présence et de chaleur
voice = signal.sosfilt(signal.butter(2, 80, "high", fs=SR, output="sos"), voice, axis=0)

mpath = os.path.join(HERE, "assets/audio/musique.wav")
if not os.path.exists(mpath):
    subprocess.run([sys.executable, os.path.join(HERE, "script/music.py"), str(TOTAL), mpath], check=True)
music = load(mpath)[:N]; music = np.pad(music, ((0, N - len(music)), (0, 0)))
# ducking : enveloppe de la voix (lissée), la musique baisse de 9 dB quand la voix parle
lev = np.abs(voice).mean(1)
win = int(0.25 * SR); env = np.convolve(lev, np.ones(win) / win, mode="same")
speak = np.clip(env / (np.percentile(env[env > 1e-4], 60) + 1e-9), 0, 1)
sos = signal.butter(1, 2.0, "low", fs=SR, output="sos"); speak = signal.sosfiltfilt(sos, speak)
duck = 10 ** ((-9 * np.clip(speak, 0, 1)) / 20)
music = music * (10 ** (MUSIC_DB / 20)) * duck[:, None]

sfx = np.zeros((N, 2), dtype=np.float32); n = 0
for s in tm["sections"]:
    start = 0.0 if s is tm["sections"][0] else s["start"]
    p = os.path.join(HERE, "compositions", s["id"] + ".sfx.json")
    if not os.path.exists(p): continue
    for name, t, g in json.load(open(p)):
        f = os.path.join(SFXDIR, name + ".mp3")
        if not os.path.exists(f): print("bruitage inconnu :", name); continue
        x = load(f) * float(g) * 0.7
        i = int((start + float(t)) * SR)
        if i >= N: continue
        x = x[: N - i]; sfx[i:i + len(x)] += x; n += 1

mix = voice * 1.0 + music + sfx
tmp = os.path.join(HERE, "assets/audio/mix.pre.wav"); out = os.path.join(HERE, "assets/audio/mix.wav")
sf.write(tmp, mix.astype(np.float32), SR)
def lufs(p):
    e = subprocess.run(["ffmpeg", "-v", "info", "-i", p, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    return float(e[e.rfind("Summary:"):].split("I:")[1].split("LUFS")[0])
gain = -16 - lufs(tmp)
for _ in range(2):
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", tmp, "-af", f"volume={gain:.2f}dB,alimiter=limit=0.79:level=disabled:attack=1:release=50",
                    "-ar", str(SR), "-ac", "2", "-c:a", "pcm_s16le", out], check=True)
    gain += -16 - lufs(out)
os.remove(tmp)
print(f"mix.wav  {TOTAL:.2f} s  {n} bruitages  musique {MUSIC_DB} dB  -> {lufs(out):.1f} LUFS")
