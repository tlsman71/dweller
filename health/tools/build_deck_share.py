#!/usr/bin/env python3
"""Build the share picture for the whole Dweller Health presentation.

    python3 health/tools/build_deck_share.py

Writes health/deck/share.jpg (1200x630): the deck's cover drawing, the Dweller Health name,
the deck title and a QR code + link to the deck. Social sites show it when the deck link is posted
(the deck's index.html points its og:image / twitter:image tags at it). Rerun if the title changes.
Needs: pip install pillow qrcode fonttools brotli
"""
import io
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import qrcode
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[2]
URL = "https://tlsman71.github.io/dweller/health/deck/"
TITLE = "Medicare Advantage: who pays, who gets paid, and what you can do"


def font(weight, size):
    t = TTFont(ROOT / f"fonts/roboto-condensed-latin-{weight}-normal.woff2"); t.flavor = None
    b = io.BytesIO(); t.save(b); return ImageFont.truetype(io.BytesIO(b.getvalue()), size)


def wrap(d, text, f, width):
    lines, cur = [], ""
    for w in text.split():
        t = (cur + " " + w).strip()
        if d.textlength(t, font=f) <= width: cur = t
        else: lines.append(cur); cur = w
    return lines + [cur]


W, H = 1200, 630
art = Image.open(ROOT / "health/deck/img/street-00-concept.webp").convert("RGB")
art = art.resize((W, int(art.height * W / art.width)))
im = Image.new("RGB", (W, H), "#0e1211"); im.paste(art.crop((0, (art.height - H) // 2, W, (art.height - H) // 2 + H)))
shade = Image.new("L", (W, H))
for x in range(W):
    a = 245 if x < 420 else max(0, int(245 - (x - 420) * 0.55))
    shade.paste(a, (x, 0, x + 1, H))
im = Image.composite(Image.new("RGB", (W, H), "#0e1211"), im, shade)
d = ImageDraw.Draw(im)
d.text((56, 52), "Dweller", font=font(700, 44), fill="#eeede4")
d.text((56 + d.textlength("Dweller ", font=font(700, 44)), 52), "Health", font=font(700, 44), fill="#e8c860")
d.text((58, 112), "THE PRESENTATION · NORTH CAROLINA BETA", font=font(700, 22), fill="#e8c860")
y = 160
for ln in wrap(d, TITLE, font(700, 50), 560):
    d.text((56, y), ln, font=font(700, 50), fill="#eeede4"); y += 58
d.text((58, y + 14), "17 source-checked slides, every number labeled", font=font(400, 26), fill="#c3c8bf")
q = qrcode.QRCode(border=2, box_size=5); q.add_data(URL); q.make(fit=True)
qi = q.make_image(fill_color="black", back_color="white").convert("RGB").resize((150, 150))
im.paste(qi, (56, H - 150 - 46))
d.text((222, H - 120), "Scan or visit", font=font(400, 22), fill="#c3c8bf")
d.text((222, H - 92), URL.replace("https://", ""), font=font(500, 24), fill="#eeede4")
im.save(ROOT / "health/deck/share.jpg", "JPEG", quality=86, optimize=True, progressive=True)
print("wrote health/deck/share.jpg")
