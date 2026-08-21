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

- [ ] Netlify-account maken (doet Bas, ik mag geen accounts aanmaken)
- [ ] GitHub-repo koppelen aan Netlify
- [ ] Build checken: `npm run build`, publiceermap `dist`
- [ ] Testen op het tijdelijke adres van Netlify, bijvoorbeeld `innerleaps.netlify.app`
- [ ] Alle 24 pagina's langslopen, met name de formulieren en de ROI-calculator

**Let op bij de build:** in de repo staan drie lockfiles, `package-lock.json`,
`bun.lock` en `bun.lockb`. Netlify kiest bun zodra hij `bun.lockb` ziet. Lokaal
testen we met npm. Gaat de build stuk, dan zit het waarschijnlijk hier.

**Live site verandert in deze stap niet.**

## Stap 2. DNS omzetten

- [ ] Bij TransIP het A-record van `185.158.133.1` naar het adres van Netlify
- [ ] Ook `www` meenemen
- [ ] Wachten tot het is doorgezet, meestal binnen een uur
- [ ] Controleren of het SSL-certificaat van Netlify actief is
- [ ] Lovable-hosting nog een paar dagen laten staan als terugval
- [ ] Daarna pas het TransIP-hostingpakket opzeggen

**Eerst checken:** staat er nog iets op `_spf.transip.email` te versturen?

## Stap 3. Keep-alive van Supabase repareren

Dit is het probleem waardoor je lead gen automations telkens stilvallen.

**Wat er nu staat**, in `supabase/migrations/20260220075426_*.sql`:

```sql
cron.schedule('keep-alive-weekly', '0 12 */5 * *', ...)
```

**Twee fouten:**

1. `*/5` betekent niet "elke 5 dagen". Het betekent: op dag 1, 6, 11, 16, 21 en
   26 van de maand. Aan het eind van een maand van 31 dagen zit er 6 dagen
   tussen. Supabase pauzeert na 7. Gaat er één ping mis, dan ben je alsnog weg.
2. De cron draait binnen de database die hij wakker moet houden. Pauzeert het
   project, dan stopt pg_cron ook. De keep-alive kan zichzelf dan nooit meer
   wekken.

**Wat we ervoor in de plaats zetten:**

- [ ] Een GitHub Action die dagelijks `keep-alive` aanroept. Draait op GitHub,
      dus los van Supabase. Gratis.
- [ ] De oude pg_cron-job uitzetten met `cron.unschedule('keep-alive-weekly')`
- [ ] Een week meekijken of het project wakker blijft

**Nog uitzoeken:** in de Supabase-logs kijken of die cron überhaupt afgaat.
Misschien is er nog iets anders aan de hand.

## Stap 4. Prerendering aanzetten

Dit is de grootste winst voor SEO en GEO. Nu levert de site 0 woorden aan
crawlers die geen JavaScript draaien. Dat zijn GPTBot, PerplexityBot, ClaudeBot
en CCBot. Zie `GEO-ANALYSIS.md` voor de meting.

Eerst twee codefixes, want deze code draait meteen bij het laden en kan niet
buiten de browser:

- [ ] `src/i18n/config.ts:102` gebruikt `window.location.pathname` op
      moduleniveau
- [ ] `src/integrations/supabase/client.ts` gebruikt `localStorage` op
      moduleniveau

Daarna:

- [ ] Prerender-plugin toevoegen aan `vite.config.ts`
- [ ] Alle routes prerenderen
- [ ] Controleren met `curl -A "GPTBot/1.0" https://innerleaps.nl/` dat er echt
      tekst uitkomt
- [ ] Controleren dat elke pagina zijn eigen titel en description meekrijgt

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
