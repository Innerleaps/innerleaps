# Werkafspraken innerleaps.nl

## Nederlands en Engels lopen altijd samen op

De site is tweetalig. **Elke tekstwijziging in het Nederlands krijgt dezelfde
wijziging in het Engels, meevertaald, in dezelfde opdracht.** Niet "later", niet
"als je erom vraagt". Een wijziging is pas af als beide talen kloppen.

Dat geldt ook voor URL's: hernoem je een Nederlands pad, dan hernoem je het
Engelse pad mee, inclusief de 301 en de sitemap.

De twee bestandsparen moeten exact dezelfde sleutels houden:

```
src/i18n/locales/nl/*.json   <->   src/i18n/locales/en/*.json
```

Controleer dat na elke wijziging:

```bash
python3.12 -c "
import json,sys
for f in ('common','training','methode','overons','contact','calculator','leadMagnet'):
    nl=json.load(open(f'src/i18n/locales/nl/{f}.json'))
    en=json.load(open(f'src/i18n/locales/en/{f}.json'))
    def paths(o,p=''):
        s=set()
        if isinstance(o,dict):
            for k,v in o.items(): s|=paths(v,f'{p}.{k}' if p else k)
        elif isinstance(o,list):
            for i,v in enumerate(o): s|=paths(v,f'{p}[{i}]')
        else: s.add(p)
        return s
    d=paths(nl)^paths(en)
    print(f'{f}: {\"OK\" if not d else sorted(d)}')
"
```

Termen consequent vertalen volgens `docs/translation-glossary.md`.

### Het Engels is Brits

Schrijf `programme`, `organisation`, `recognise`, `centre`, `behaviour`,
`analyse`, `colour`. Niet de Amerikaanse varianten. Het publiek zit in Nederland
en Europa, en de site gebruikte al Britse vormen voor woorden zonder
Amerikaanse tegenhanger in de tekst.

Let op bij `practice`: dat is het zelfstandig naamwoord ("15 minutes of
practice"), het werkwoord is `practise` ("participants practise"). Nooit blind
vervangen.

Controleer met:

```bash
grep -roiE "\b(program|programs|organiz\w*|recogniz\w*|center|behavior\w*|analyz\w*|color)\b" src/i18n/locales/en/ | sort | uniq -c
```

## Hoe de teksten klinken

**Nooit een kastlijntje (em dash).** Niet in teksten op de site, niet in
voorstellen, niet in commentaar. Gebruik een punt, een komma, of splits de zin.

**Schrijf zoals mensen praten.** Korte zinnen. Gewone woorden. Lees het hardop
terug: klinkt het als iets wat je tegen iemand zou zeggen, of als een folder?
Als het tweede, herschrijf het.

Wat je vermijdt: opsommingen van abstracte begrippen, jargon dat je moet
uitleggen, en zinnen die met "middels", "dienaangaande" of "in het kader van"
beginnen. Wat je wel doet: het onderwerp voorop, actieve zinnen, en cijfers
noemen in plaats van "aanzienlijk" of "significant".

## Zichtbare tekst gaat altijd eerst langs de gebruiker

Alles wat een bezoeker of Google te zien krijgt, dus koppen, lopende tekst,
knoplabels, meta titles en descriptions, alt-teksten en foutmeldingen, schrijf je
**nooit zelf definitief**. Kom met **meerdere opties per tekst**, laat de
gebruiker kiezen of zelf iets typen, en voer pas daarna door.

Dit geldt ook als de wijziging vanzelfsprekend lijkt of als jij hem "beter"
vindt. De gebruiker bepaalt de stem van de site.

Wat je wél zelf mag doen zonder te vragen: code, opmaak, bestandsformaten,
omleidingen, schema-structuur, en alles wat niet als tekst op het scherm of in
een zoekresultaat verschijnt.

## Blokken die op meerdere pagina's staan

Voordat je een blok aanpast: kijk waar het nog meer verschijnt, en **vraag de
gebruiker of de wijziging daar ook moet landen.** Nooit stilzwijgend aannemen.

| Blok | Tekst staat in | Verschijnt op |
|---|---|---|
| Menu-items | `common.json` `menuItems.*` | elke pagina, in de header |
| Hero, uitdagingen, resultaten, FAQ | `training.json` per propositiesleutel | alleen die ene pagina |
| Weken van het kernprogramma | `training.json` `<sleutel>.weeks` | per pagina eigen sleutel, maar teksten zijn deels letterlijk gedupliceerd |
| "Breintraining voor échte gedragsverandering" | `common.json` `programOverview.*` | 4 propositiepagina's **en de homepage** |
| Masterclass, drie kaarten | `common.json` `masterclass.cards.*` | variant `employer`: vitality + sustainability, variant `employee`: stress + performance |
| Masterclass, kaart "Vrijblijvend" | `common.json` `masterclass.cards.noCommitment.text` | **geen variant**, dus alle 4 de propositiepagina's |

## De vier propositiepagina's

| Sleutel in `training.json` | NL-pad | EN-pad |
|---|---|---|
| `vitality` | `/duurzame-inzetbaarheid` | `/en/sustainable-employability` |
| `sustainability` | `/team-prestaties-verbeteren` | `/en/improve-team-performance` |
| `stress` | `/stressmanagement-training` | `/en/stress-management-training` |
| `performance` | `/prestatie-training` | `/en/performance-training` |

Let op: de sleutelnamen dekken de lading niet meer. `vitality` is de pagina over
verzuim en duurzame inzetbaarheid, `sustainability` die over productiviteit.

## Oranje woorden in koppen

Een oranje accent schrijf je in de JSON als `<0>...</0>`, niet als HTML:

```json
"title": "Het <0>effect</0> van onze training"
```

## URL's hernoemen

Alles staat in `ROUTE_MAP` in `src/i18n/config.ts`. Daar hangen de routes, de
prerendering, de canonical en de hreflang aan. Verder nodig:

- 301 in `netlify.toml`, **boven** de SPA-catch-all
- route in `src/App.tsx`
- menu in `SimplifiedNavigation.tsx` en `Footer.tsx`
- interne links in de blogartikelen
- `public/sitemap.xml`

**Nooit een keten van omleidingen laten ontstaan.** Hernoem je een pad dat zelf
al het doel van een 301 is, laat de oudste URL dan direct naar het nieuwste pad
wijzen.

## Pushen kost geld, batch daarom

Netlify staat op het gratis creditmodel: **300 credits per maand, harde limiet,
ze rollen niet door en bijkopen kan niet.** Raakt de teller leeg, dan worden alle
projecten gepauzeerd en krijgen bezoekers een `Site not available`-pagina. De
site gaat dus echt offline tot de volgende maand.

Een **productie-deploy kost 15 credits**, ongeacht hoe lang de build duurt. Dat
zijn er dus maximaal twintig per maand. Gemeten op 24 augustus 2026 was 96,6%
van al het verbruik afkomstig van deploys; bandbreedte, webverzoeken en de
keep-alive-functie waren samen 5,2 credits. Bij dit verkeer zijn de deploys het
enige dat telt.

Daaruit volgen twee regels:

1. **Nooit pushen per losse wijziging.** Verzamel tot een blok af is en push dan
   één keer. Bouwtijd is gratis, dus prerenderen kost niets extra.
2. **Wil de gebruiker iets op Netlify zelf zien voordat het live gaat, push dan
   naar een aparte branch.** Branch-deploys en deploy previews kosten
   **0 credits**. Daarna één keer naar `main`.

Controleer het verbruik in het Netlify-dashboard onder Credit usage breakdown.

## Boeken van een gesprek loopt via Calendly

Vroeger opende elke "plan een gesprek met Bas"-knop een Google Calendar-link in
een nieuw venster. Dat is eruit. **Zoek nooit meer naar `calendar.app.google`,
die hoort er niet meer te zijn.**

Wat er wel staat:

- `src/components/CalendlyWidget.tsx` doet de inline widget. Plak nooit de
  rauwe embed-code met een `<script>`-tag in JSX, want die voert in React niet
  uit. Gebruik dit component.
- `src/lib/booking.ts` bepaalt het knopgedrag: staat de widget op deze pagina,
  dan scrollen naar het anker `#afspraak`, anders naar de boekingspagina.
- De widget staat op drie plekken: `/afspraak-plannen` (en `/en/book-a-call`),
  `/contact` en `/over-ons`. Bewust niet op alle pagina's, want het iframe kost
  ruim 1 MB en dat zou de laadtijdwinst tenietdoen.
- Zet de widget **nooit in een modal**. Een iframe dat bij openen en sluiten
  steeds opnieuw gemount wordt, telt conversies dubbel of mist ze.

De `calendarUrl`-velden in `MasterclassFormModal.tsx` zijn iets anders: dat zijn
"zet deze masterclass in je agenda"-links voor een bestaand evenement. Afblijven.

## Meten: er staat geen Google Tag Manager

Gemeten op 24 augustus 2026: op de live site staat **geen GTM en geen gtag**.
Het enige externe script is de Apollo-tracker. Toch staan er al aanroepen van
`window.gtag` in `MasterclassFormModal.tsx`, `Bedankt.tsx` en
`MasterclassQR.tsx`. Die doen dus niets.

Zolang die container ontbreekt wordt er geen enkele conversie geregistreerd.
Meld dat als iemand over conversiemeting begint.

De Calendly-widget is er wel op voorbereid: hij schrijft bij een afgeronde
boeking naar de dataLayer:

```js
{ event: "calendly_event_scheduled", calendly: <payload> }
```

Zodra GTM er staat is er alleen nog een Custom Event trigger op
`calendly_event_scheduled` nodig. Geen code meer.

## Een route toevoegen

Zet je een route in `App.tsx`, kies dan bewust:

- **Openbare pagina die moet ranken?** Ook in `ROUTE_MAP` in
  `src/i18n/config.ts`. Dan komt hij automatisch in de prerendering, de
  canonical, de hreflang, en hoort hij ook in `public/sitemap.xml`.
- **Niet in ROUTE_MAP?** Dan wordt hij niet geprerenderd, en moet hij
  **expliciet** in `netlify.toml` als `status = 200`-regel. Anders valt hij
  onder de 404-catch-all en is hij vanaf de volgende deploy onbereikbaar.

## Achtergronddocumenten

Deze leest een nieuwe sessie niet vanzelf, dus open ze als het onderwerp langskomt:

- `MIGRATIE-PLAN.md`: de verhuizing van Lovable-hosting naar Netlify, in stappen,
  inclusief wat er misging bij het prerenderen en de keep-alive van Supabase.
- `SEO-PLAN.md`: de diagnose van augustus 2026 en de meetlat. Kern: tot 21
  augustus kregen crawlers zonder JavaScript nul woorden, de klikken zakten in
  90 dagen van 64 naar 23, en er stonden nul vertoningen op de doeltermen.
- `docs/translation-glossary.md`: vaste vertalingen.

## Search Console

Toegang loopt via OAuth, niet via een service account. Google Workspace
blokkeert het aanmaken van service-accountsleutels met de organisatieregel
`iam.disableServiceAccountKeyCreation`.

- Config: `~/.config/claude-seo/google-api.json`, property `sc-domain:innerleaps.nl`
- Uitlezen: `CLAUDE_SEO_PYTHON=/opt/homebrew/bin/python3.12 "$HOME/.claude/skills/seo/bin/claude-seo" run gsc_query.py ...`
- **Sitemap indienen kan de skill niet.** Daarvoor is
  `scripts/submit-sitemap.py`. Draaien met python3.12.
- Indexering aanvragen kan alleen de gebruiker, via de knop in de interface.
  Die zit niet in de API.

## Praktisch

- `python3` is hier 3.9, de seo-skill eist 3.10+. Zet er
  `CLAUDE_SEO_PYTHON=/opt/homebrew/bin/python3.12` voor.
- Search Console staat ingesteld op property `sc-domain:innerleaps.nl`.
- De lokale site draait met `npm run dev` op poort 8080.
- `npm run build` prerendert alle 24 pagina's en faalt hard bij een lege pagina.
