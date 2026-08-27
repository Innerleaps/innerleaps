#!/usr/bin/env python3.12
"""Zet PNG- en JPG-afbeeldingen om naar WebP en werkt de verwijzingen bij.

Waarom: afbeeldingen waren veruit het zwaarste onderdeel van de site. Ruim
14 MB aan beeld in de build, met losse bestanden van boven de 2 MB. WebP haalt
daar doorgaans 60 tot 80 procent vanaf zonder zichtbaar verschil.

Draait NOOIT tijdens de Netlify-build. Dit is handwerk dat je één keer doet, en
daarna alleen als er nieuwe afbeeldingen bij komen. Zo blijft de productie-build
vrij van extra afhankelijkheden, en kan er dus ook niets aan stukgaan.

Gebruik (Pillow nodig, zie onderaan):

    python3.12 scripts/afbeeldingen-naar-webp.py --droogloop
    python3.12 scripts/afbeeldingen-naar-webp.py

Wat het bewust NIET aanraakt:

- public/social/ en public/og-image.png. Dat zijn de voorbeeldjes die
  LinkedIn en WhatsApp tonen als iemand een link deelt, en die gaan daar
  wisselend mee om. Een kapot voorbeeld kost meer dan de kilobytes opleveren.
- favicons, en alles wat al SVG is.

Twee manieren van comprimeren, want het ene beeld is het andere niet:

- Foto's krijgen lossy op kwaliteit 82. Daar zit de grote winst.
- Logo's en vlakke plaatjes met transparantie krijgen lossless. Lossy maakt
  op scherpe randen zichtbare rommel, en juist logo's staan groot in beeld.

Levert het WebP-bestand geen winst op, dan blijft het origineel staan.
"""

import argparse
import os
import re
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit(
        "Pillow ontbreekt. Installeer het eerst:\n"
        "    python3.12 -m pip install --user pillow"
    )

# Mappen die we afgaan. Paden zijn relatief aan de hoofdmap van het project.
MAPPEN = ["src/assets", "public/lovable-uploads", "public/team", "public/klantervaringen"]

# Mappen en bestanden waar we vanaf blijven, zie de uitleg bovenaan.
OVERSLAAN = {"public/social", "public/og-image.png", "public/favicon.png"}

# Bestanden waarin een verwijzing naar een afbeelding kan staan.
CODE_MAPPEN = ["src", "index.html", "public/sitemap.xml"]
CODE_EXTENSIES = (".ts", ".tsx", ".json", ".html", ".xml", ".css")

BRONFORMATEN = (".png", ".jpg", ".jpeg")

# Foto's mogen op 82. Daar zie je niets van, en het scheelt het meeste.
KWALITEIT = 82

# Logo's krijgen 94. Ze staan op een strakke witte achtergrond met scherpe
# randen, en juist daar valt compressie op als vuil rond de letters. Gemeten:
# op 82 zakte het TheyDo-logo naar PSNR 35, op 94 gaat de hele set naar 44 tot
# 46. Het kost een paar tientallen kilobytes, en dat is het waard voor logo's
# van klanten. Volledig lossless is geen optie: die logo's staan op een groot
# doek met zachte randen, en dan wordt een enkel bestand 1,8 MB.
KWALITEIT_LOGO = 94
LOGOMAPPEN = {"public/lovable-uploads", "public/klantervaringen", "public/team"}


def is_vlak_met_transparantie(afbeelding: Image.Image) -> bool:
    """Een logo of vlak plaatje: transparant en weinig verschillende kleuren."""
    if afbeelding.mode not in ("RGBA", "LA", "P"):
        return False
    kleuren = afbeelding.convert("RGBA").getcolors(maxcolors=512)
    return kleuren is not None


def converteer(pad: str, droogloop: bool):
    doel = re.sub(r"\.(png|jpe?g)$", ".webp", pad, flags=re.I)
    oud = os.path.getsize(pad)
    is_logo = os.path.dirname(pad) in LOGOMAPPEN

    with Image.open(pad) as afb:
        afb.load()
        lossless = is_vlak_met_transparantie(afb)
        if droogloop:
            return None

        if lossless:
            afb.save(doel, "WEBP", lossless=True, method=6)
        else:
            bron = afb if afb.mode in ("RGB", "RGBA") else afb.convert("RGBA")
            kwaliteit = KWALITEIT_LOGO if is_logo else KWALITEIT
            bron.save(doel, "WEBP", quality=kwaliteit, method=6)

            # Levert de hoge logokwaliteit niets op, val dan terug op de gewone.
            # Zonder deze stap sloegen we het bestand over terwijl de code al
            # naar .webp verwees, en dan staat er een gat op de pagina.
            if os.path.getsize(doel) >= oud and kwaliteit != KWALITEIT:
                bron.save(doel, "WEBP", quality=KWALITEIT, method=6)

    nieuw = os.path.getsize(doel)
    if nieuw >= oud:
        # Nog steeds geen winst. Origineel houden en het WebP-bestand weggooien.
        os.remove(doel)
        return None

    os.remove(pad)
    return doel, oud, nieuw, lossless


def werk_verwijzingen_bij(vervangingen: dict, droogloop: bool) -> int:
    """Vervang oude bestandsnamen door de WebP-naam in code en data."""
    bestanden = []
    for wortel in CODE_MAPPEN:
        if os.path.isfile(wortel):
            bestanden.append(wortel)
            continue
        for map_, _, namen in os.walk(wortel):
            for naam in namen:
                if naam.endswith(CODE_EXTENSIES):
                    bestanden.append(os.path.join(map_, naam))

    geraakt = 0
    for bestand in bestanden:
        try:
            inhoud = open(bestand, encoding="utf-8").read()
        except (UnicodeDecodeError, FileNotFoundError):
            continue
        origineel = inhoud
        for oud, nieuw in vervangingen.items():
            if oud in inhoud:
                inhoud = inhoud.replace(oud, nieuw)
        if inhoud != origineel:
            geraakt += 1
            if not droogloop:
                open(bestand, "w", encoding="utf-8").write(inhoud)
    return geraakt


def zoek_dode_verwijzingen():
    """Verwijst de code naar een afbeelding die niet meer bestaat?

    Dit is het vangnet. Sla het script een bestand over terwijl de verwijzing
    al is omgezet, dan zie je dat niet aan de site tot iemand de pagina opent
    en er een gat staat. Deze controle valt er meteen overheen.
    """
    aanwezig = set()
    for map_ in MAPPEN:
        if os.path.isdir(map_):
            aanwezig.update(os.listdir(map_))

    dood = []
    for wortel in CODE_MAPPEN:
        bestanden = [wortel] if os.path.isfile(wortel) else [
            os.path.join(m, n)
            for m, _, namen in os.walk(wortel)
            for n in namen
            if n.endswith(CODE_EXTENSIES)
        ]
        for bestand in bestanden:
            try:
                inhoud = open(bestand, encoding="utf-8").read()
            except (UnicodeDecodeError, FileNotFoundError):
                continue
            for naam in re.findall(r"[\w./%-]+\.(?:webp|png|jpe?g)", inhoud):
                kort = os.path.basename(naam)
                if kort in aanwezig:
                    continue
                # Alleen meldingen over onze eigen mappen, niet over
                # og-image.png en andere bestanden die we met rust laten.
                if any(m.split("/")[-1] in naam for m in MAPPEN) or "@/assets" in inhoud:
                    if kort.endswith(".webp"):
                        dood.append((bestand, kort))
    return sorted(set(dood))


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--droogloop", action="store_true", help="alleen tonen wat er zou gebeuren")
    args = p.parse_args()

    te_doen = []
    for map_ in MAPPEN:
        if map_ in OVERSLAAN or not os.path.isdir(map_):
            continue
        for naam in sorted(os.listdir(map_)):
            pad = os.path.join(map_, naam)
            if pad in OVERSLAAN or not os.path.isfile(pad):
                continue
            if naam.lower().endswith(BRONFORMATEN):
                te_doen.append(pad)

    if args.droogloop:
        totaal = sum(os.path.getsize(p_) for p_ in te_doen)
        print(f"{len(te_doen)} afbeeldingen, samen {totaal / 1024 / 1024:.1f} MB")
        for pad in te_doen[:10]:
            print(f"  {os.path.getsize(pad) / 1024:6.0f} KB  {pad}")
        print("  ...")
        return

    vervangingen = {}
    oud_totaal = nieuw_totaal = 0
    overgeslagen = []

    for pad in te_doen:
        uitkomst = converteer(pad, droogloop=False)
        if uitkomst is None:
            overgeslagen.append(pad)
            continue
        doel, oud, nieuw, lossless = uitkomst
        vervangingen[os.path.basename(pad)] = os.path.basename(doel)
        oud_totaal += oud
        nieuw_totaal += nieuw
        soort = "lossless" if lossless else "lossy"
        print(f"  {oud / 1024:6.0f} -> {nieuw / 1024:6.0f} KB  {soort:8} {os.path.basename(pad)}")

    geraakt = werk_verwijzingen_bij(vervangingen, droogloop=False)

    print()
    print(f"{len(vervangingen)} afbeeldingen omgezet, {geraakt} bestanden bijgewerkt.")
    print(f"Van {oud_totaal / 1024 / 1024:.1f} MB naar {nieuw_totaal / 1024 / 1024:.1f} MB.")
    if overgeslagen:
        print(f"{len(overgeslagen)} overgeslagen, want WebP was niet kleiner.")

    ontbrekend = zoek_dode_verwijzingen()
    if ontbrekend:
        print()
        print("LET OP, deze verwijzingen wijzen nergens naar:")
        for bestand, naam in ontbrekend:
            print(f"  {bestand}: {naam}")
        sys.exit(1)
    print("Sluitcontrole: elke verwijzing naar een afbeelding bestaat.")


if __name__ == "__main__":
    main()
