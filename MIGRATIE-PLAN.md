# Migratieplan Innerleaps

Bijgewerkt: 21 augustus 2026

Van Lovable-hosting naar Netlify, plus de SEO- en GEO-fixes die daarop wachten.
Vink af wat klaar is, zodat er niks blijft liggen.

---

## Waar we vandaan komen

| Onderdeel | Nu | Straks |
|---|---|---|
| Code | GitHub `Innerleaps/innerleaps` | blijft |
| Bouwen en uitserveren | Lovable | Netlify |
| Domein en DNS | TransIP | blijft TransIP |
| Hostingpakket TransIP | loopt | opzeggen, is niet nodig voor DNS |
| E-mail | Google Workspace | blijft, staat los van hosting |
| Database en formulieren | Supabase (gratis) | blijft |

---

## Stap 1. Netlify opzetten

- [x] Netlify-account maken
- [x] GitHub-repo koppelen aan Netlify
- [x] Build checken: `npm run build`, publiceermap `dist`
- [x] Getest op `innerleaps-website.netlify.app`, alle routes 200
- [x] Alle 7 Supabase-functies bereikbaar vanaf Netlify (CORS staat op `*`)

**Let op bij de build:** in de repo staan drie lockfiles, `package-lock.json`,
`bun.lock` en `bun.lockb`. Netlify kiest bun zodra hij `bun.lockb` ziet. Lokaal
testen we met npm. Gaat de build stuk, dan zit het waarschijnlijk hier.

**Live site verandert in deze stap niet.**

## Stap 2. DNS omzetten

- [x] Bij TransIP `@` A van `185.158.133.1` naar `75.2.60.5`
- [x] `www` van A naar CNAME `innerleaps-website.netlify.app.`
- [x] Doorgezet, mail en overige records ongewijzigd gecontroleerd
- [x] SSL-certificaat actief: Let's Encrypt, CN=innerleaps.nl, 21 aug 2026
- [x] www stuurt door naar apex, http stuurt door naar https
- [ ] Lovable-hosting nog een paar dagen laten staan als terugval
- [ ] Daarna pas het TransIP-hostingpakket opzeggen

**Eerst checken:** staat er nog iets op `_spf.transip.email` te versturen?

## Stap 3. Keep-alive van Supabase repareren

### Wat de logs lieten zien

`cron.job_run_details` gaf het bewijs:

```
2026-08-21   <- vandaag, na handmatig ingrijpen
2026-05-16   <- daarvoor
2026-05-11
2026-05-06
2026-05-01
2026-04-26   ... patroon: dag 1, 6, 11, 16, 21, 26
```

Alle runs `succeeded`. En toch een gat van **97 dagen** tussen 16 mei en
21 augustus.

Twee fouten, allebei bevestigd door die data:

1. `'0 12 */5 * *'` betekent niet "elke 5 dagen" maar dag 1, 6, 11, 16, 21
   en 26 van de maand. Aan het eind van een lange maand zat er 6 dagen
   tussen, terwijl Supabase na 7 dagen pauzeert. Eén dag speling.
2. De cron draaide binnen de database die hij wakker moest houden. Toen het
   project pauzeerde stopte pg_cron mee. Drie maanden lang kon hij zichzelf
   niet wekken.

Punt 2 is de echte fout. Vaker pingen vanuit dezelfde plek lost dat niet op,
want in mei draaide de ping gewoon en pauzeerde het project alsnog.

### Wat we hebben gedaan

- [x] Keep-alive verhuisd naar Netlify: `netlify/functions/keep-alive.mjs`
- [x] Dagelijks om 06:00 UTC, zes dagen speling in plaats van één
- [x] Lokaal getest, Supabase gaf `{"status":"alive","inserted":true}`
- [x] Faalt luid: bij een fout logt hij een foutmelding en geeft status 500,
      zodat het zichtbaar is in de Netlify-logs
- [x] Migratie geschreven die de Supabase-cron opruimt:
      `20260821140000_remove_keep_alive_cron.sql`
- [x] Migratie gedraaid in de Supabase SQL Editor
- [x] Geen Database Webhooks gevonden, dus pg_cron en pg_net allebei verwijderd
- [ ] Na de eerste geplande run de Netlify-logs bekijken
- [ ] Een week meekijken of het project wakker blijft

### Wat je moet weten

Een ping **voorkomt** de pauze, maar **heft hem niet op**. Staat een project
eenmaal uit, dan moet je het handmatig herstellen in het Supabase-dashboard.
Geen enkele wekker lost dat op.

De tabel `keep_alive_logs` blijft. De Netlify-functie schrijft daar nog steeds
naartoe, via dezelfde edge function. De opruiming van rijen ouder dan 30 dagen
zit in die edge function en blijft dus ook werken.

## Stap 4. Prerendering aanzetten

Voor de fix leverde de site 0 woorden aan crawlers die geen JavaScript draaien.
Dat zijn GPTBot, PerplexityBot, ClaudeBot en CCBot. Zie `GEO-ANALYSIS.md`.

### Hoe we het hebben opgelost

Niet door de app in Node te renderen, want daar is hij niet op gebouwd:
pagina's worden lazy geladen, de router zit vast in `App.tsx` en er staat
browsercode op moduleniveau. Dat verbouwen op een live site is te riskant.

In plaats daarvan draait na `vite build` het script `scripts/prerender.mjs`.
Dat start een servertje op de gebouwde site, laat een echte browser elke
pagina bezoeken en slaat op wat die browser ziet. Inclusief de titel en
description die react-helmet-async per pagina zet.

- [x] `scripts/prerender.mjs` geschreven
- [x] Aan `npm run build` gekoppeld, draait dus ook op Netlify
- [x] Routes komen uit `ROUTE_MAP` in `src/i18n/config.ts`, één lijst
- [x] Faalt hard bij een lege pagina, zodat half werk niet doorglipt
- [x] Puppeteer-cache in de repo-map, zodat Netlify hem bewaart
- [x] Alle 24 pagina's vastgelegd, 153 tot 2083 woorden per pagina
- [x] Zes ontbrekende blogartikelen aan `sitemap.xml` toegevoegd
- [x] Live gemeten: 14.303 woorden over 14 pagina's, alles 200, was 0

### Onderweg opgelost

- Netlify zette een schuine streep achter elke URL, want de bestanden stonden
  als `<route>/index.html`. Nu platte `<route>.html`, dus 200 in plaats van 301.
- Chrome ontbrak in de Netlify-build. Er staan drie lockfiles in de repo en
  Netlify koos bun, die geen install-scripts draait. Nu haalt de buildopdracht
  Chrome expliciet op.
- De Nederlandse homepage werd als Engelse pagina opgeslagen, omdat de browser
  in de buildomgeving Engelstalig is en de site toen nog automatisch doorstuurde.
  Die automatische omleiding is er inmiddels uit, Nederlands is de standaard.
- De bundelanalyse van rollup stond in `dist` en was dus openbaar op
  `/stats.html`. Die schrijft nu naar `build-stats/` buiten `dist`.

### Nog te doen

De Engelse blogartikelen tonen Nederlandse titels. `/en/blog/hidden-costs-...`
geeft "De verborgen kosten van ziekteverzuim met rekenmodel". De drie
blogcomponenten hebben hun tekst hardcoded en kijken niet naar de taal.

## Stap 5. URL's hernoemen met echte 301's

Wacht op stap 2, want pas op Netlify kunnen we echte 301's neerzetten.

| Nu | Straks |
|---|---|
| `/vitaliteitstraining` | `/duurzame-inzetbaarheid` |
| `/duurzame-inzetbaarheid-training` | `/inzetbaarheid-verbeteren` |
| `/en/vitality-training` | `/en/sustainable-employability` |
| `/en/sustainable-employability-training` | `/en/improve-employability` |

- [x] 301's in `netlify.toml`, bewust boven de catch-all
- [x] Routes in `src/App.tsx`
- [x] Padkoppelingen in `src/i18n/config.ts`
- [x] Menu in `src/components/SimplifiedNavigation.tsx` en `Footer.tsx`
- [x] Interne links in de blogartikelen, het waren er vier en niet drie
- [x] `public/sitemap.xml`
- [x] De drie dode redirectregels in `App.tsx` opruimen, die wezen naar zichzelf
- [x] Build gedraaid: 24 van 24 pagina's geprerenderd, oude .html-bestanden weg,
      canonical en hreflang volgen mee uit `ROUTE_MAP`
- [x] Live gemeten na de deploy: alle vier de oude URL's geven een 301 naar het
      juiste nieuwe pad, in één hop, eindstatus 200. De vier nieuwe URL's geven
      200 met hun eigen geprerenderde titel, canonical wijst naar zichzelf, en
      de live sitemap noemt alleen nog de nieuwe URL's, nul oude.
- [x] Sitemap ingediend in Search Console. Er stond er nog geen enkele: de lijst
      was leeg. Nu geregistreerd, status `processed`, nul fouten.
- [ ] Over een week opnieuw inspecteren of Google de 301's heeft verwerkt

### Search Console-toegang

Claude Code kan nu zelf bij Search Console. Niet via een service account, want
Google Workspace blokkeert het aanmaken van sleutelbestanden met de
organisatieregel `iam.disableServiceAccountKeyCreation`. In plaats daarvan een
OAuth-client van het type Desktop app, waarbij je als jezelf inlogt.

- Config: `~/.config/claude-seo/google-api.json`, property `sc-domain:innerleaps.nl`
- Let op: `python3` is hier 3.9 en de skill eist 3.10+. Draai commando's met
  `CLAUDE_SEO_PYTHON=/opt/homebrew/bin/python3.12` ervoor.
- `gsc_query.py` kan sitemaps alleen uitlezen, niet indienen. Het indienen ging
  met een losse PUT op de Search Console API.

### Wat de URL-inspectie liet zien

| URL | Status bij Google | Laatste crawl |
|---|---|---|
| `/vitaliteitstraining` | Crawled, currently not indexed | 6 juni 2026 |
| `/duurzame-inzetbaarheid-training` | Submitted and indexed | 29 april 2026 |
| `/duurzame-inzetbaarheid` | URL is unknown to Google | nooit |
| `/inzetbaarheid-verbeteren` | Discovered, currently not indexed | nooit |

Twee dingen vallen op.

`/inzetbaarheid-verbeteren` stond binnen enkele minuten na het indienen al op
`Discovered`. De sitemap doet dus zijn werk.

Belangrijker: `/vitaliteitstraining` gaf bij de crawl van 6 juni
`/en/vitality-training` op als canonical, terwijl Google zelf de Nederlandse URL
koos. De pagina zei dus "de Engelse versie is de echte". Dat verklaart
waarschijnlijk waarom hij niet geindexeerd was. Dezelfde fout als de Nederlandse
homepage die als Engelse pagina werd geprerenderd, zie stap 4. Die is met de
prerender-fix opgelost: de canonical op de live pagina wijst nu naar zichzelf.
Google heeft sinds 6 juni alleen niet opnieuw gekeken.

Van de vier oude URL's was er maar een geindexeerd,
`/duurzame-inzetbaarheid-training`. Daar zit dus de opgebouwde waarde die de
301 moet overdragen.

### Onderweg gevonden, nog niet opgelost

`/inzetbaarheid-verbeteren` heeft geen enkele interne link die een crawler ziet.
Niet stuk gegaan bij het hernoemen, dit gold net zo hard voor de oude URL.

Twee oorzaken die op elkaar stapelen:

1. De menulinks zitten in `NavigationMenuContent` van Radix. Die inhoud komt pas
   in de DOM zodra iemand het menu opent, dus het prerenderen legt hem niet vast.
2. De footer heeft geen link naar deze pagina. `Footer.tsx` kent wel `vitality`,
   `stress`, `performance` en `blog`, maar geen `employability`.

Gevolg: `/duurzame-inzetbaarheid` staat op 15 geprerenderde pagina's, en
`/inzetbaarheid-verbeteren` op nul. Google kan hem via de sitemap vinden, maar
krijgt geen enkel signaal hoe belangrijk hij is. De kleinste fix is een
footerlink erbij.

**Let op:** dit was alleen de URL-operatie. De teksten op de pagina's zijn niet
aangeraakt, dus `/duurzame-inzetbaarheid` heeft nog "vitaliteitstraining" als
kop en `/en/sustainable-employability` heet nog "Vitality training for
organisations". Dat hoort bij stap 6.

### Naderhand nog een keer hernoemd

`/inzetbaarheid-verbeteren` heeft het maar een dag uitgehouden. De pagina is
herpositioneerd naar teams en heet nu `/duurzame-inzetbaarheid-teams`, Engels
`/en/sustainable-employability-teams`. De tabel hierboven is dus achterhaald
voor die ene regel.

Belangrijk: `/duurzame-inzetbaarheid-training` wijst nu **direct** naar het
nieuwe pad, niet via `/inzetbaarheid-verbeteren`. Geen 301 op een 301.

Gevolg voor Search Console: de ingediende sitemap noemt nu URL's die alweer
veranderd zijn. Na de volgende deploy opnieuw inspecteren, en de sitemap laten
verversen.

## Stap 6. Daarna pas: content

Uit `GEO-ANALYSIS.md`, maar met de juiste propositie per pagina:

- [ ] Blogartikelen verversen, ze zijn van november 2025
- [ ] Hubpagina voor verzuim verminderen
- [ ] Organization-schema met `sameAs`
- [ ] Auteursprofiel met Person-schema

---

## Wat je moet weten over de twee proposities

Verwar ze niet, dat ging eerder mis.

**Verzuim en duurzame inzetbaarheid:** homepage, `/vitaliteitstraining`,
`/stressmanagement-training`

**Productiviteit:** `/duurzame-inzetbaarheid-training`, `/prestatie-training`

De pagina `/duurzame-inzetbaarheid-training` heeft de term in de URL maar gaat
over productiviteit. Dat is bewust. Stap 5 haalt die verwarring weg.
