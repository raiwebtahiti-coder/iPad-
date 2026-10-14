#!/usr/bin/env python3
"""Construit demo/index.html (page autonome) : CSS + JS des motions en ligne, tees en SVG."""
import os, urllib.parse
H = os.path.dirname(os.path.abspath(__file__)); A = os.path.join(H, "..", "assets")
css = open(os.path.join(A, "mt-motion.css")).read()
js = open(os.path.join(A, "mt-motion.js")).read()

TEE = "M150 40 C 170 58, 230 58, 250 40 L 330 72 L 372 160 L 318 186 L 300 152 L 300 372 L 100 372 L 100 152 L 82 186 L 28 160 L 70 72 Z"
def tee(fill, ink, bg, side, gold=False):
    neck = '<path d="M150 40 C 170 64, 230 64, 250 40" fill="none" stroke="%s" stroke-opacity=".35" stroke-width="3"/>' % ink if side == "front" else \
           '<path d="M150 40 C 170 50, 230 50, 250 40" fill="none" stroke="%s" stroke-opacity=".35" stroke-width="3"/>' % ink
    seams = '<path d="M100 152 L 100 372 M300 152 L300 372" stroke="%s" stroke-opacity=".12" stroke-width="2"/>' % ink
    if side == "front":
        mark = ('<g transform="translate(232 112)"><text font-family="Georgia,serif" font-weight="900" font-size="20" fill="%s">MT</text>'
                '<rect x="18" y="-17" width="9" height="2.2" fill="%s"/></g>') % (ink, "#F2B807" if gold else ink)
    else:
        mark = ('<g font-family="Georgia,serif" font-weight="900" fill="%s" text-anchor="middle">'
                '<text x="200" y="176" font-size="34">NEVER</text><text x="200" y="214" font-size="34">STAY</text><text x="200" y="252" font-size="34">DOWN</text>'
                '<rect x="176" y="266" width="48" height="3.5" fill="%s"/>'
                '<text x="200" y="300" font-size="11" letter-spacing="3">MANA TŌ\'A</text></g>') % (ink, "#F2B807" if gold else ink)
    shade = '<path d="%s" fill="url(#s)"/>' % TEE
    svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480"><defs><linearGradient id="s" x1="0" y1="0" x2="1" y2="1">'
           '<stop offset="0" stop-color="#fff" stop-opacity=".10"/><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".10"/></linearGradient></defs>'
           '<rect width="400" height="480" fill="%s"/><ellipse cx="200" cy="420" rx="150" ry="10" fill="#000" opacity=".06"/>'
           '<g transform="translate(0 30)"><path d="%s" fill="%s"/>%s%s%s%s</g></svg>') % (bg, TEE, fill, shade, seams, neck, mark)
    return "data:image/svg+xml;charset=utf-8," + urllib.parse.quote(svg)

PRODUCTS = [
    ("Tee Kneel — encre", "65 $ NZ", "#1B1A18", "#EEEAE2", "#E3DED4", True),
    ("Tee Kneel — os", "65 $ NZ", "#E6E0D3", "#1B1A18", "#D8D2C5", False),
    ("Tee Corner — ardoise", "65 $ NZ", "#55524C", "#EEEAE2", "#E3DED4", False),
]
cards = []
for name, price, fill, ink, bg, gold in PRODUCTS:
    cards.append(f'''
      <div class="mt-card mt-ring mt-flip-host demo-card">
        <div class="mt-ring__frame">
          <div class="mt-flip"><div class="mt-flip__inner">
            <img class="mt-flip__face mt-flip__face--front" src="{tee(fill, ink, bg, "front", gold)}" alt="{name}, face" width="400" height="480">
            <img class="mt-flip__face mt-flip__face--back" src="{tee(fill, ink, bg, "back", gold)}" alt="{name}, dos" width="400" height="480" loading="lazy">
          </div></div>
          <button class="mt-flip__toggle" type="button" aria-pressed="false" aria-label="Voir le dos" data-label-back="Voir le dos" data-label-front="Voir la face">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9a8 8 0 0 1 14.5-3.5L20 7"/><path d="M20 3v4h-4"/><path d="M20 15a8 8 0 0 1-14.5 3.5L4 17"/><path d="M4 21v-4h4"/></svg>
          </button>
          <span class="mt-ring__corners" aria-hidden="true"><i class="mt-ring__c mt-ring__c--tl"></i><i class="mt-ring__c mt-ring__c--tr"></i><i class="mt-ring__c mt-ring__c--bl"></i><i class="mt-ring__c mt-ring__c--br"></i></span>
        </div>
        <div class="mt-card__info">
          <h3 class="mt-card__title"><a class="mt-card__link" href="#essentiels">{name}</a></h3>
          <p class="mt-card__price">{price}</p>
        </div>
      </div>''')

page = open(os.path.join(H, "page.html")).read()
page = page.replace("/*@@MT-CSS@@*/", css).replace("/*@@MT-JS@@*/", js).replace("<!--@@CARDS@@-->", "".join(cards))
open(os.path.join(H, "index.html"), "w").write(page)
print("demo/index.html", len(page) // 1024, "Ko")
