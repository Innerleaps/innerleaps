## Plan: FAQ medewerker-pagina's + SEO/LLM optimalisatie

### Deel 1 — FAQ-content op de 2 "voor medewerkers" pagina's

Van toepassing op `/stressmanagement-training` en `/prestatie-training` (NL + EN), dus secties `stress` en `performance` in `src/i18n/locales/nl/training.json` en `src/i18n/locales/en/training.json`.

1. **Hernoem vraag** "Wat levert een Innerleaps-traject concreet op voor onze medewerkers?" → "Wat levert een Innerleaps-traject concreet op?"
   - EN equivalent: "What does an Innerleaps program deliver for our employees?" → "What does an Innerleaps program deliver?"
2. **Verwijder** de ROI-FAQ ("Wat is de ROI van een investering in Innerleaps?" / "What is the ROI of an investment in Innerleaps?") — past niet bij medewerker-doelgroep.
3. **Hernoem** "Hoe verbetert Innerleaps de prestaties van medewerkers?" → "Hoe verbetert innerleaps mijn prestaties?"
   - EN: "How does Innerleaps improve employee performance?" → "How does innerleaps improve my performance?"
   - Antwoord blijft inhoudelijk hetzelfde, maar lichte herformulering naar "je/jouw" tone-of-voice (matchen met andere medewerker-FAQ's die "je" gebruiken).

De org-pagina's (`vitality` en `sustainable`) blijven ongewijzigd — die houden ROI + werkgever-framing.

### Deel 2 — SEO & LLM-indexeerbaarheid

Doel: betere ranking in Google én betere ophaling door ChatGPT, Perplexity, Claude.

1. **FAQPage JSON-LD schema** toevoegen aan `TrainingPageLayout.tsx`
   - Genereer `Question`/`Answer` structured data uit `faqItems` en injecteer als `<script type="application/ld+json">` binnen `<Helmet>`.
   - Dit is dé grootste winst: Google rich-results + LLM's kunnen Q&A direct extraheren.

2. **Volledige meta-tags** in `TrainingPageLayout.tsx` (nu alleen `description`):
   - `<title>` uit `${tKey}.meta.title`
   - Canonical URL (per pad, met taalvariant)
   - `og:title`, `og:description`, `og:type=website`, `og:url`, `og:image` (hero image)
   - `twitter:card=summary_large_image` + bijbehorende tags
   - `<html lang>` via Helmet op basis van `detectLanguageFromPath`

3. **Course/Service schema** per training (lichtgewicht) — naast FAQPage een `Course` JSON-LD met `name`, `description`, `provider: Innerleaps`, `inLanguage`, `url`. Geeft LLM's directe context over wat de pagina aanbiedt.

4. **Semantische HTML-verbetering in FAQ-sectie**
   - Wrap FAQ in `<section aria-labelledby="faq-title">` met id op de h2.
   - Vraag wordt al `<button>` (Accordion) — voeg `itemScope itemType="https://schema.org/Question"` micro-data fallback NIET toe (JSON-LD volstaat en is cleaner). Geen dubbele markup.

5. **`robots.txt` uitbreiden** zodat AI-crawlers expliciet welkom zijn (sommige defaulten naar block):
   - `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Claude-Web`, `Google-Extended` → `Allow: /`
   - Behoud de bestaande regels.

6. **Sitemap-check** — verifieer dat alle 4 trainingspagina's (NL + EN paths) in `public/sitemap.xml` staan met `lastmod`. Aanvullen waar nodig.

7. **Hreflang** — controleer of `HreflangTags` ook op trainingspagina's gemount is; zo niet, toevoegen via TrainingPageLayout (wijst NL ↔ EN equivalenten naar elkaar). Belangrijk voor beide ranking en LLM-taaldetectie.

### Bestanden die wijzigen

- `src/i18n/locales/nl/training.json` (stress + performance FAQ)
- `src/i18n/locales/en/training.json` (stress + performance FAQ)
- `src/components/TrainingPageLayout.tsx` (Helmet uitbreiding + FAQPage + Course JSON-LD + semantiek)
- `public/robots.txt` (AI-crawler allowlist)
- `public/sitemap.xml` (verificatie/aanvulling)
- Eventueel `src/i18n/HreflangTags.tsx` mounten in layout.

### Notities

- Geen em-dashes in nieuwe copy; geen Oxford comma in EN.
- Brand: "innerleaps" met kleine l in vraagteksten waar de gebruiker dat expliciet vroeg; binnen lopende antwoorden behouden we "Innerleaps" zoals nu (consistent met de rest van de FAQ).
- Achtergrond-alternatie blijft intact (FAQ off-white → Trust white, ongewijzigd).
