

## Footer redesign

Vervang `src/components/Footer.tsx` door een nieuwe 3-koloms footer in het bestaande brand design system (paars/oranje gradient, off-white tekst, oranje accenten). Update routes voor de Cookies-pagina. Geen nieuwe styling introduceren — uitsluitend bestaande Tailwind brand-tokens.

### Structuur

**Hoofdsectie (3 kolommen, mobiel gestapeld)**

Kolom 1 — Brand + social proof
- "InnerLeaps" wordmark (zelfde stijl als huidige footer, `text-2xl font-bold`)
- Tagline als `<h3>`: "Vitaliteitstraining die verzuim verlaagt en duurzame inzetbaarheid versterkt"
- Social proof rij (flex, wrap):
  - VMBN-logo (`src/assets/vmbn-trainer-categorie-1.png`, `h-16`) met onderschrift "Trainer categorie 1" (`text-xs`)
  - Google reviews block: Google G-logo (inline SVG met officiële kleuren) + 5 oranje sterren (Lucide `Star` filled, `text-brand-orange`) + "4,7/5"-tekst — wrapped in `<a target="_blank" rel="noopener noreferrer">` naar de door jou aan te leveren Google reviews-URL (placeholder `#` tot je deze geeft)
- LinkedIn-icoon (Lucide `Linkedin`, `h-6 w-6`) onderaan, link naar `https://www.linkedin.com/company/innerleaps`, `target="_blank" rel="noopener noreferrer"`, `aria-label="InnerLeaps op LinkedIn"`

Kolom 2 — Programma's (titel `<h3>`)
- Vitaliteitsprogramma → `/vitaliteitsprogramma`
- Stressmanagement programma → `/stressmanagement-programma` (bestaande route)
- Prestatie en concentratie verbeteren → `/prestatie-programma` (bestaande route)
- Blog → `/blog`
- Contact → `/contact`

Kolom 3 — Contact (titel `<h3>`, `<address>` met schema.org `PostalAddress`)
- "Bas Ter Haar Romenij" + "Oprichter" (kleine tekst)
- Email: `mailto:bas@innerleaps.nl`
- Telefoon: `tel:+31623453477` (weergave: 06 23 45 34 77)
- Adres: Olympisch Stadion 24-28, 1076 DE Amsterdam (met `itemProp` street/postal/locality)
- KvK: 98136925

**Bottom bar** (boven gescheiden door `border-t border-white/15`, flex row op desktop, gestapeld op mobiel)
- Links: © 2026 InnerLeaps
- Rechts: Privacybeleid (`/privacy`) · Cookiebeleid (`/cookies`) · Algemene voorwaarden (`/algemene-voorwaarden`)

### Wijzigingen in andere bestanden

- `src/pages/Cookies.tsx` — nieuwe lazy-loaded placeholder pagina met `SimplifiedNavigation` + `Footer` en korte cookie-uitleg, in dezelfde stijl als `PrivacyNotice.tsx`
- `src/App.tsx` — voeg `lazy` route `/cookies` toe

### Styling / SEO
- Behoud huidige gradient `bg-gradient-to-br from-brand-blue to-brand-blue-dark`, `py-12`, `container-custom`
- Tekst `text-gray-300`, hover `text-white`, kolomtitels `text-white font-semibold text-lg`
- `<footer>` element met `itemScope itemType="https://schema.org/Organization"` met `name`, `address` (PostalAddress nested), `vatID`/`identifier` voor KvK, `url`, `sameAs` LinkedIn
- WCAG: gray-300 op brand-blue voldoet (AA); icon-links krijgen `aria-label`
- Volledig responsive via `grid-cols-1 md:grid-cols-3 gap-8`

### Open punt
Zodra je de Google reviews-URL aanlevert wordt de placeholder (`#`) vervangen. Je kunt deze meegeven bij goedkeuring of in de volgende boodschap.

