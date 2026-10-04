#!/usr/bin/env python3
"""Mix of claude-intro (no voice): music bed + sound effects locked on the picture -> assets/audio/mix-<id>.wav.

  python3 build-mix.py            builds every option below
  python3 build-mix.py --mux renders/video.mp4   also writes renders/video-<id>.mp4 per option (no new render)

Sound effects: assets/audio/sfx-events.json ([name, time s, gain]), files from the media-use library.
Loudness: loudnorm -16 LUFS, true peak under -1.5 dBTP (alimiter without make-up gain).
"""
import json, os, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SFX = os.path.join(HERE, "..", ".claude", "skills", "media-use", "audio", "assets", "sfx")
DUR = 30.0
OPTIONS = {
    # id: (music file or None, music gain)
    "M1": ("assets/music/score-synth.wav", 0.55),   # original score synthesized in code (motion-reel music.py)
    "S0": (None, 0.0),                               # sound effects only
}

def build(opt, music, gain):
    events = json.load(open(os.path.join(HERE, "assets/audio/sfx-events.json")))
    inputs, chains, labels = [], [], []
    inputs += ["-f", "lavfi", "-t", str(DUR), "-i", "anullsrc=r=48000:cl=stereo"]
    labels.append("[0:a]")
    n = 1
    if music:
        inputs += ["-i", os.path.join(HERE, music)]
        # fade in 0.3 s, fade out on the end card from 27.6 s, full stop at 30 s
        chains.append(f"[{n}:a]aresample=48000,volume={gain},afade=t=in:d=0.3,afade=t=out:st=27.6:d=2.4,atrim=0:{DUR}[m]")
        labels.append("[m]"); n += 1
    for i, (name, t, g) in enumerate(events):
        inputs += ["-i", os.path.join(SFX, name + ".mp3")]
        ms = int(round(t * 1000))
        chains.append(f"[{n}:a]aresample=48000,aformat=channel_layouts=stereo,volume={g},adelay={ms}|{ms}[s{i}]")
        labels.append(f"[s{i}]"); n += 1
    chains.append("".join(labels) + f"amix=inputs={len(labels)}:normalize=0:duration=first,atrim=0:{DUR},aresample=48000[out]")
    out = os.path.join(HERE, f"assets/audio/mix-{opt}.wav")
    subprocess.run(["ffmpeg", "-y", "-v", "error", *inputs, "-filter_complex", ";".join(chains), "-map", "[out]",
                    "-t", str(DUR), "-c:a", "pcm_s16le", out], check=True)
    # two passes: measure the premix, then gain to -16 LUFS and a limiter without make-up gain
    pre = out.replace(".wav", ".pre.wav"); os.replace(out, pre)
    m = subprocess.run(["ffmpeg", "-v", "info", "-i", pre, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    i_pre = float(m[m.rfind("Summary:"):].split("I:")[1].split("LUFS")[0])
    for _ in range(2):
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", pre, "-af",
                        f"volume={-16 - i_pre:.2f}dB,alimiter=limit=0.79:level=disabled:attack=1:release=50",
                        "-c:a", "pcm_s16le", out], check=True)
        m = subprocess.run(["ffmpeg", "-v", "info", "-i", out, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
        i_out = float(m[m.rfind("Summary:"):].split("I:")[1].split("LUFS")[0])
        i_pre += i_out + 16   # the limiter ate some loudness: push the gain by the miss
    os.remove(pre)
    meas = subprocess.run(["ffmpeg", "-v", "info", "-i", out, "-af", "ebur128=peak=true", "-f", "null", "-"],
                          capture_output=True, text=True).stderr
    tail = meas[meas.rfind("Summary:"):]
    I = [l.strip() for l in tail.splitlines() if l.strip().startswith(("I:", "Peak:"))]
    print(f"{out}  {'  '.join(I)}")
    return out

mux = sys.argv[2] if len(sys.argv) > 2 and sys.argv[1] == "--mux" else None
for opt, (music, gain) in OPTIONS.items():
    wav = build(opt, music, gain)
    if mux:
        dst = mux.replace(".mp4", f"-{opt}.mp4")
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", mux, "-i", wav, "-map", "0:v", "-map", "1:a", "-c:v", "copy",
                        "-c:a", "aac", "-b:a", "192k", "-shortest", dst], check=True)
        print("muxed", dst)
