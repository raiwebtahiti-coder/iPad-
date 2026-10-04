#!/usr/bin/env python3
"""Copie MOT POUR MOT les blocs CSS et JS du kit (reference/kit.html) dans une séquence.

Usage : python3 reference/inject-kit.py compositions/frames/<frame_id>.html [...]

Dans la séquence, mettre /*@@KIT-CSS@@*/ dans le <style> et /*@@KIT-JS@@*/ dans le <script> ; le script les remplace
par les blocs du kit (chemins ../assets/ -> assets/). Idempotent : relancé, il remplace les blocs déjà injectés.
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
KIT = open(os.path.join(HERE, "kit.html"), encoding="utf-8").read()


def block(kind):
    a = "/* ===== kit claude-intro (%s) ===== */" % kind
    b = "/* ===== fin du kit (%s) ===== */" % kind
    return KIT[KIT.index(a):KIT.index(b) + len(b)].replace("../assets/", "assets/")


for path in sys.argv[1:]:
    s = open(path, encoding="utf-8").read()
    for kind in ("CSS", "JS"):
        a = "/* ===== kit claude-intro (%s) ===== */" % kind
        b = "/* ===== fin du kit (%s) ===== */" % kind
        marker = "/*@@KIT-%s@@*/" % kind
        if marker in s:
            s = s.replace(marker, block(kind))
        elif a in s:
            s = re.sub(re.escape(a) + r".*?" + re.escape(b), lambda m: block(kind), s, flags=re.S)
        else:
            sys.exit("%s: ni %s ni bloc kit %s" % (path, marker, kind))
    open(path, "w", encoding="utf-8").write(s)
    print("kit injecté :", path)
