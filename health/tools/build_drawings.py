#!/usr/bin/env python3
"""Build the Dweller Health slide-show images and share cards.

    python3 health/tools/build_drawings.py --masters "/home/tls/Downloads/Dweller/Dweller Health/Share Pane drawings"

Reads health/drawings/drawings.js. For every slide whose image Tom approved:
  - health/drawings/img/<id>.webp    1280x720 WebP (quality 82) for the slide show
  - health/drawings/share/<id>.jpg   share card: the image, the Dweller Health name, the caption
                                     (only once Tom approved it), a QR code and the link back to the slide
  - health/drawings/p/<id>.html      share page: preview tags so the card shows in social posts,
                                     then it forwards the visitor to the slide
    (--pages-only rebuilds just the share pages from the cards already in the repo; no masters needed;
     --recard also redraws each card's bottom band, e.g. QR and link, from the picture already in the card)
Files for slides that are not approved are removed, so nothing unapproved is published.
Masters (dweller-health-drawing-<id>.webp; redraws <id>-v<N>.webp) stay off the repo.

Needs: pip install pillow qrcode fonttools brotli
"""
import argparse, html, io, json, re, sys, textwrap
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import qrcode
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / "health/drawings/drawings.js"
IMG, SHARE, PAGES = ROOT / "health/drawings/img", ROOT / "health/drawings/share", ROOT / "health/drawings/p"
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


def pages(cfg, keep):
    """One small page per approved slide. Social sites read its preview tags (the card), people are sent to the slide."""
    base = cfg["share_base"].rstrip("/") + "/"
    droot = re.sub(r"mockup/$", "", base) + "drawings/"
    PAGES.mkdir(parents=True, exist_ok=True)
    for s in cfg["slides"]:
        if s["id"] not in keep:
            continue
        cap_ok = s.get("caption", {}).get("status") == "approved"
        title = html.escape((s["headline"] if cap_ok else s["label"]) + " · Dweller Health")
        desc = html.escape((s["kind"] + " · " + s["source_short"] + ". " if cap_ok else "") + "How health-coverage decisions reach your coverage, costs and care. North Carolina.")
        img, me, slide = f"{droot}share/{s['id']}.jpg", f"{droot}p/{s['id']}.html", f"{base}#slide-{s['id']}"
        alt = html.escape(s.get("scene", s["label"]))
        (PAGES / f"{s['id']}.html").write_text(f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<title>{title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="canonical" href="{me}">
<meta name="description" content="{desc}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Dweller Health">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{me}">
<meta property="og:image" content="{img}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1280">
<meta property="og:image:height" content="1020">
<meta property="og:image:alt" content="{alt}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="{img}">
<meta name="twitter:image:alt" content="{alt}">
<style>body{{margin:0;background:#0e1211;color:#eeede4;font:20px/1.5 Verdana,sans-serif;padding:40px 20px;text-align:center}}a{{color:#e8c860}}</style>
<script>location.replace({json.dumps(slide)});</script>
</head><body><p>Opening Dweller Health… <a href="{slide}">Go to the picture</a></p></body></html>
""", encoding="utf-8")
    for f in PAGES.glob("*.html"):
        if f.stem not in keep:
            f.unlink(); print("removed (not approved):", f.relative_to(ROOT))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--masters", help="folder with dweller-health-drawing-<id>.webp masters")
    ap.add_argument("--pages-only", action="store_true", help="only rebuild the share pages from cards already built")
    ap.add_argument("--recard", action="store_true", help="redraw the cards' name/caption/QR band from the picture already in each card (no masters needed; use after share_base changes)")
    a = ap.parse_args()
    cfg = load()
    if a.recard:
        base = cfg["share_base"].rstrip("/") + "/"
        keep = set()
        for s in cfg["slides"]:
            f = SHARE / f"{s['id']}.jpg"
            if s["image"]["status"] != "approved" or not f.exists():
                continue
            pic = Image.open(f).convert("RGB").crop((0, 0, 1280, 720))
            card(pic, s, f"{base}#slide-{s['id']}").save(f, "JPEG", quality=90, optimize=True, progressive=True)
            keep.add(s["id"])
        pages(cfg, keep); print(f"redrew {len(keep)} card(s) and share pages"); return
    if a.pages_only:
        keep = {s["id"] for s in cfg["slides"] if s["image"]["status"] == "approved" and (SHARE / f"{s['id']}.jpg").exists()}
        pages(cfg, keep); print(f"built {len(keep)} share page(s)"); return
    if not a.masters:
        ap.error("--masters is required (or use --pages-only)")
    base = cfg["share_base"].rstrip("/") + "/"
    IMG.mkdir(parents=True, exist_ok=True); SHARE.mkdir(parents=True, exist_ok=True)
    keep, missing = set(), []
    for s in cfg["slides"]:
        if s["image"]["status"] != "approved":
            continue
        v = s["image"].get("version", 1)
        src = Path(a.masters) / (f"dweller-health-drawing-{s['id']}-v{v}.webp" if v > 1 else f"dweller-health-drawing-{s['id']}.webp")
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
    pages(cfg, keep)
    print(f"built {len(keep)} approved slide(s) and share pages")
    if missing:
        sys.exit("missing masters:\n  " + "\n  ".join(missing))


if __name__ == "__main__":
    main()
