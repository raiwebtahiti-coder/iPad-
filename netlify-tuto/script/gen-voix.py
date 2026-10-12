# Génère chaque ligne de voix (Kokoro), place les lignes, écrit voix.wav + timing.json
import json, sys, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
M, V, SCRIPT, OUT = sys.argv[1:5]
cfg = json.load(open(SCRIPT))
k = Kokoro(M, V)
SR = 24000
GAP, SEC_GAP, LEAD, TAIL = 0.62, 1.5, 0.7, 3.0   # silence entre phrases, entre sections, au début, à la fin
def trim(x, thr=0.008):
    idx = np.where(np.abs(x) > thr)[0]
    return x[max(0, idx[0] - 240): idx[-1] + 480] if len(idx) else x
t = LEAD; parts = []; timing = []
for si, sec in enumerate(cfg["sections"]):
    st = {"id": sec["id"], "start": round(t, 3), "lines": []}
    for li, ln in enumerate(sec["lines"]):
        a, sr = k.create(ln.get("say", ln["sub"]), voice=cfg["voice"], speed=cfg["speed"], lang="fr-fr")
        a = trim(np.asarray(a, dtype=np.float32))
        d = len(a) / SR
        parts.append((t, a)); st["lines"].append({"sub": ln["sub"], "t0": round(t, 3), "t1": round(t + d, 3)})
        t += d + GAP
    t += SEC_GAP - GAP
    st["end"] = round(t, 3); timing.append(st)
total = t - SEC_GAP + TAIL
buf = np.zeros(int(total * SR) + 1, dtype=np.float32)
for t0, a in parts:
    i = int(round(t0 * SR)); buf[i:i + len(a)] += a
# fondus de 5 ms autour de chaque ligne déjà inclus par le trim ; normalisation douce
buf = buf / (np.max(np.abs(buf)) + 1e-9) * 0.89
sf.write(OUT + "/voix.wav", buf, SR)
timing[-1]["end"] = round(total, 3)
json.dump({"total": round(total, 3), "sections": timing}, open(OUT + "/timing.json", "w"), ensure_ascii=False, indent=1)
print("total", round(total, 2))
for s in timing: print(s["id"], s["start"], s["end"], len(s["lines"]))
