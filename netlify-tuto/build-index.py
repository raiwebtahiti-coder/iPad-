#!/usr/bin/env python3
"""Construit index.html (hôte) depuis script/timing.json : une sous-composition par section, puis le mix audio."""
import json, os
HERE = os.path.dirname(os.path.abspath(__file__))
tm = json.load(open(os.path.join(HERE, "script/timing.json")))
secs = tm["sections"]; total = tm["total"]
hosts = []
for i, s in enumerate(secs):
    start = 0.0 if i == 0 else s["start"]
    end = secs[i + 1]["start"] if i + 1 < len(secs) else total
    if not os.path.exists(os.path.join(HERE, "compositions", s["id"] + ".html")):
        continue
    hosts.append(f'    <div id="host-{s["id"]}" data-composition-id="{s["id"]}" data-composition-src="compositions/{s["id"]}.html" '
                 f'data-start="{start:.3f}" data-duration="{end - start:.3f}" data-track-index="{1 + i % 2}" data-width="1920" data-height="1080"></div>')
mix = os.environ.get("MIX", "mix.wav")
html = f'''<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=1920, height=1080">
<title>Mettre son site en ligne · Rai Web Design</title>
<script src="assets/vendor/gsap.min.js"></script>
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  html, body {{ width: 100%; height: 100%; overflow: hidden; background: #f6f7fb; }}
  #root {{ position: relative; width: 100%; height: 100%; overflow: hidden; background: #f6f7fb; }}
</style>
</head>
<body>
  <div id="root" data-composition-id="main" data-width="1920" data-height="1080" data-duration="{total:.3f}">
{chr(10).join(hosts)}
    <audio id="mix" data-start="0" data-duration="{total:.3f}" data-track-index="10" src="assets/audio/{mix}" data-volume="1"></audio>
  </div>
  <script>
    var tl = gsap.timeline({{ paused: true }});
    tl.to({{}}, {{ duration: {total:.3f} }}, 0);
    window.__timelines["main"] = tl;
  </script>
</body>
</html>
'''
open(os.path.join(HERE, "index.html"), "w").write(html)
print("index.html :", len(hosts), "sections,", total, "s")
