#!/usr/bin/env python3
"""Build the Dweller Health slide-show images and share cards.

    python3 health/tools/build_drawings.py --masters "/home/tls/Downloads/Dweller/Dweller Health/Share Pane drawings"

Reads health/drawings/drawings.js. For every slide whose image Tom approved:
  - health/drawings/img/<id>.webp    1280x720 WebP (quality 82) for the slide show
  - health/drawings/share/<id>.jpg   share card: the image, the Dweller Health name, the caption
                                     (only once Tom approved it), a QR code and the link back to the slide
Files for slides that are not approved are removed, so nothing unapproved is published.
Masters (dweller-health-drawing-<id>.webp) stay off the repo.

Needs: pip install pillow qrcode fonttools brotli
"""
import argparse, io, json, re, sys, textwrap
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import qrcode
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / "health/drawings/drawings.js"
IMG, SHARE = ROOT / "health/drawings/img", ROOT / "health/drawings/share"
BG, PANEL, CHALK, MUTE, GOLD, GREEN, AMBER, BLUE = "#0e1211", "#16201c", "#eeede4", "#c3c8bf", "#e8c860", "#86d8a6", "#f2c46c", "#b8d2f0"
KIND_COLOR = {"Fact": GREEN, "Estimate": AMBER, "Forecast": BLUE, "Quote": CHALK}


def load():
    js = DATA.read_text(encoding="utf-8")
    return json.loads(re.search(r"window\.DH_DRAWINGS\s*=\s*(\{.*\});?\s*$", js, re.S).group(1))


def font(weight, size, _cache={}):
    if weight not in _cache:
        t = TTFont(ROOT / f"fonts/roboto-condensed-latin-{weight}-normal.woff2")
        t.flavor = None
        b = io.BytesIO(); t.save(b); _cache[weight] = b.getvalue()
    return ImageFont.truetype(io.BytesIO(_cache[weight]), size)


def fit(im, w=1280, h=720):
    W, H = im.size
    th = round(W * h / w)
    im = im.crop((0, (H - th) // 2, W, (H - th) // 2 + th)) if th <= H else im.crop(((W - round(H * w / h)) // 2, 0, (W + round(H * w / h)) // 2, H))
    return im.convert("RGB").resize((w, h), Image.LANCZOS)


def card(pic, s, url):
    W, top, band = 1280, 720, 300
    c = Image.new("RGB", (W, top + band), BG)
    c.paste(pic, (0, 0))
    d = ImageDraw.Draw(c)
    d.rectangle([0, top, W, top + 6], fill=GOLD)
    # name
    x, y = 48, top + 34
    d.text((x, y), "Dweller", font=font(700, 50), fill=CHALK)
    d.text((x + d.textlength("Dweller ", font=font(700, 50)), y), "Health", font=font(700, 50), fill=GOLD)
    d.text((x + 330, y + 16), "North Carolina", font=font(400, 24), fill=MUTE)
    # caption (only if Tom approved it): short headline + label + short source
    y2 = y + 70
    if s["caption"]["status"] == "approved":
        lines = textwrap.wrap(s["headline"], 44)[:2]
        for i, ln in enumerate(lines):
            d.text((x, y2 + i * 44), ln, font=font(700, 38), fill=CHALK)
        ky = y2 + len(lines) * 44 + 10
        kind = s["kind"]
        d.text((x, ky), kind.upper(), font=font(700, 22), fill=KIND_COLOR.get(kind, CHALK))
        d.text((x + d.textlength(kind.upper() + "   ", font=font(700, 22)), ky), s["source_short"], font=font(400, 22), fill=MUTE)
    else:
        d.text((x, y2), s["label"], font=font(700, 34), fill=CHALK)
    # QR + link
    q = qrcode.QRCode(border=2, box_size=8, error_correction=qrcode.constants.ERROR_CORRECT_M)
    q.add_data(url); q.make(fit=True)
    qi = q.make_image(fill_color="black", back_color="white").convert("RGB").resize((210, 210), Image.NEAREST)
    c.paste(qi, (W - 48 - 210, top + 30))
    short = url.replace("https://", "")
    d.text((W - 48 - 105 - d.textlength("Scan to see it on Dweller Health", font=font(700, 18)) / 2, top + 248), "Scan to see it on Dweller Health", font=font(700, 18), fill=GOLD)
    d.text((x, top + band - 40), short, font=font(400, 19), fill=MUTE)
    return c


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--masters", required=True, help="folder with dweller-health-drawing-<id>.webp masters")
    a = ap.parse_args()
    cfg = load()
    base = cfg["share_base"].rstrip("/") + "/"
    IMG.mkdir(parents=True, exist_ok=True); SHARE.mkdir(parents=True, exist_ok=True)
    keep, missing = set(), []
    for s in cfg["slides"]:
        if s["image"]["status"] != "approved":
            continue
        src = Path(a.masters) / f"dweller-health-drawing-{s['id']}.webp"
        if not src.exists():
            missing.append(str(src)); continue
        pic = fit(Image.open(src))
        pic.save(IMG / f"{s['id']}.webp", "WEBP", quality=82)
        card(pic, s, f"{base}#slide-{s['id']}").save(SHARE / f"{s['id']}.jpg", "JPEG", quality=86, optimize=True, progressive=True)
        keep.add(s["id"])
    for folder, ext in ((IMG, "webp"), (SHARE, "jpg")):
        for f in folder.glob(f"*.{ext}"):
            if f.stem not in keep:
                f.unlink(); print("removed (not approved):", f.relative_to(ROOT))
    print(f"built {len(keep)} approved slide(s)")
    if missing:
        sys.exit("missing masters:\n  " + "\n  ".join(missing))


if __name__ == "__main__":
    main()
