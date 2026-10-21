"""Maakt van een logo op wit een vrijstaand logo (wit wordt transparant).

Kleur-naar-alfa ten opzichte van wit, zoals Color to Alpha in GIMP: elke pixel
wordt gesplitst in een kleur en een doorzichtigheid die samen op wit weer
precies het origineel geven. Zo blijven de zachte randen zacht, en verdwijnt ook
het wit in de gaatjes van letters (a, e, o). Daarna bijsnijden op de inhoud.

Voor de logorij in de lichte hero, die beige is: een logo op wit geeft daar
een wit blok. Sla het resultaat op naast het origineel, met `_transparant`
achter de naam. Lossless, want het zijn kleine plaatjes met scherpe randen.

Gebruik: python3.12 scripts/logo-vrijstaand.py bron doel.webp
"""
import sys

from PIL import Image

DREMPEL = 6 / 255  # bijna-wit (compressieruis) telt als wit
MARGE = 2  # px rand rond het bijgesneden logo


def vrijstaand(bron: Image.Image) -> Image.Image:
    rgba = bron.convert("RGBA")
    # Eerst op wit zetten: wat al transparant was, blijft dat zo ook.
    wit = Image.new("RGBA", rgba.size, (255, 255, 255, 255))
    plat = Image.alpha_composite(wit, rgba).convert("RGB")

    uit = Image.new("RGBA", plat.size)
    pin, puit = plat.load(), uit.load()
    w, h = plat.size
    for y in range(h):
        for x in range(w):
            c = [v / 255 for v in pin[x, y]]
            d = max(1 - v for v in c)
            if d <= DREMPEL:
                puit[x, y] = (0, 0, 0, 0)
                continue
            a = min(1.0, (d - DREMPEL) / (1 - DREMPEL))
            kleur = [min(1.0, max(0.0, (v - (1 - a)) / a)) for v in c]
            puit[x, y] = (*(round(v * 255) for v in kleur), round(a * 255))

    vak = uit.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
    l, t, r, b = vak
    return uit.crop((max(0, l - MARGE), max(0, t - MARGE), min(w, r + MARGE), min(h, b + MARGE)))


if __name__ == "__main__":
    bron, doel = sys.argv[1], sys.argv[2]
    afb = vrijstaand(Image.open(bron))
    afb.save(doel, "WEBP", lossless=True, method=6)
    print(f"{doel}: {afb.size[0]}x{afb.size[1]}")
