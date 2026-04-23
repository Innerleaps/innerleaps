

## Duplicatie /vitaliteitsprogramma → /duurzame-inzetbaarheid-training

### 1. Nieuwe pagina aanmaken
- Kopieer `src/pages/Vitaliteitsprogramma.tsx` naar `src/pages/DuurzameInzetbaarheidTraining.tsx`.
- Hernoem component naar `DuurzameInzetbaarheidTraining`.
- Behoud exact dezelfde paginastructuur, secties, achtergrondkleuren-afwisseling, componenten (`SimplifiedNavigation`, `StickyCtaButtons`, `ProgramOverviewSection`, `TrustSection`, `Footer`, `ROICalculator`, etc.) en SEO-helmet (description wordt aangepast op basis van jouw nieuwe teksten).

### 2. Routing
- Voeg in `src/App.tsx` een lazy-loaded route toe: `/duurzame-inzetbaarheid-training` → `DuurzameInzetbaarheidTraining`.

### 3. Menu update (`src/components/SimplifiedNavigation.tsx`)
Update `organisationMenuItems` (zowel desktop als mobiel) naar:
```
[
  { label: 'Vitaliteitsprogramma', href: '/vitaliteitsprogramma',
    description: 'Vitaal en veerkrachtig team' },
  { label: 'Inzetbaarheid', href: '/duurzame-inzetbaarheid-training',
    description: 'Productief team met minder uitval' }
]
```
(Beide subteksten vervangen de huidige "Voor organisaties en werkgevers".)

### 4. Gedeelde componenten blijven gedeeld
`ProgramOverviewSection` en `TrustSection` worden niet geforked — de teksten daarbinnen blijven identiek aan de vitaliteitspagina. Alleen de inline secties van de nieuwe pagina krijgen aangepaste copy.

### 5. Achtergrond-ritme
Behoud de huidige afwisseling op de nieuwe pagina:
- Hero (donker) → Challenges `bg-brand-off-white` → Values `bg-white` → ProgramOverview `bg-brand-off-white` → 6 weken `bg-white` → Masterclass `bg-brand-off-white` → Trust `white` → FAQ `bg-brand-off-white` → Footer.

---

### Open punten — graag per blok aanleveren

Voor de nieuwe `/duurzame-inzetbaarheid-training` pagina heb ik per inline content-blok jouw teksten nodig. Hieronder per blok wat er nu staat — geef per blok aan wat je wilt vervangen (titel, subtitel, kaarten, etc.). Blokken die je leeg laat blijven identiek aan de vitaliteitspagina.

**Blok A — Hero**
- Badge: "Wetenschappelijk bewezen programma"
- H1: "Het bewezen vitaliteitsprogramma voor minder verzuim"
- Subkop: "Wetenschappelijk bewezen vitaliteitsprogramma. Deelnemers ontwikkelen eigenaarschap…"
- CTA-knop: "Wat levert dit jullie op?"
- Stats-kaart titel: "Waarom organisaties ons kiezen"
- 4 stats: Minder verzuim 15-21% / Burn-out risico 70% / Tevreden over leven 15% / Wetenschap 40+ jaar

**Blok B — Challenges**
- H2: "Herken je één van deze uitdagingen?"
- Subkop: "Deze organisatie uitdagingen pakken wij aan met onze methode."
- 4 kaarten: Grenzen aangeven / Talent behouden / Sociale veiligheid / Emoties op de werkvloer

**Blok C — Resultaat**
- H2: "Het resultaat van ons programma"
- Bijbehorende resultaatkaarten

**Blok D — 6 weken breintraining**
- H2: "6 weken breintraining"
- Wekelijkse thema's

**Blok E — Masterclass**
- H2: "Ervaar het met onze vrijblijvende masterclass."
- Bijbehorende copy + CTA

**Blok F — FAQ**
- 8 vraag/antwoord items

**Blok G — Helmet meta description** (voor SEO)

Stuur per blok jouw tekst. Na ontvangst implementeer ik in één keer route + menu + nieuwe pagina met de aangepaste teksten.

