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

- [ ] 301's in `_redirects` of `netlify.toml`
- [ ] Routes in `src/App.tsx`
- [ ] Padkoppelingen in `src/i18n/config.ts`
- [ ] Menu in `src/components/SimplifiedNavigation.tsx` en `Footer.tsx`
- [ ] Drie interne links in de blogartikelen
- [ ] `public/sitemap.xml`
- [ ] De drie dode redirectregels in `App.tsx:96-99` opruimen, die wijzen naar
      zichzelf

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
