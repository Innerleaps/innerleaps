## Implementatieplan: Herbruikbare MasterclassSection

### 1. Nieuwe asset
- Kopieer `user-uploads://DSCF9120.jpg` → `src/assets/masterclass-audience.jpg`

### 2. Nieuwe component `src/components/MasterclassSection.tsx`
**Props:** `variant: 'employee' | 'employer'`

**Vaste opbouw:**
- Background image (`masterclass-audience.jpg`) met `bg-brand-purple/70` overlay
- Witte tekst, `TEXT_SHADOW_STRONG` op headings
- Titel: **"Ervaar het met onze vrijblijvende masterclass."** (woorden "vrijblijvende masterclass" in `text-brand-orange`)
- 4 feature-kaarten: `bg-white/10 backdrop-blur-sm` met witte tekst en oranje icon-accenten

**Kaarten (variërend per variant):**
1. **Stress level**
   - Employee: "Krijg inzicht in jouw stress level. Volledig wetenschappelijk onderbouwd."
   - Employer: "Medewerkers krijgen inzicht in hun stress level. Volledig wetenschappelijk onderbouwd."
2. **Aandachtoefening**
   - Employee: "Ervaar een techniek om controle over je autopiloot te krijgen en focus terug te pakken."
   - Employer: "Medewerkers ervaren een techniek om controle over hun autopiloot te krijgen en focus terug te pakken."
3. **Reset tool**
   - Employee: "Leer een tool om je werkgeheugen te resetten en aandacht direct terug te pakken."
   - Employer: "Medewerkers leren een tool om hun werkgeheugen te resetten en aandacht direct terug te pakken."
4. **Vrijblijvend** — identiek in beide varianten

**Subcopy onder titel:**
- Employee: "Ben je geïnteresseerd maar wil je eerst onze methode ervaren? Dat kan! Met onze Masterclass maak je in 60 minuten kennis met onze aanpak."
- Employer: "Ben je geïnteresseerd maar wil je eerst checken of de methode aansluit bij jullie team? Dat kan! Met onze Masterclass maakt jouw organisatie in 60 minuten kennis met onze aanpak."

**Employee-only review-blok (centraal boven CTA, geen foto):**
- 5 sterren (oranje)
- Citaat in italic, wit:
  > "Deze workshop laat je duidelijk het belang zien van het trainen van je aandachtsspier. De workshop bestaat uit een mooie mix tussen oefeningen en theorie, waardoor je gelijk al wat ervaring opdoet. Denk dat iedereen hier wat aan heeft, dus kan dit zeker aanbevelen."

**CTA:**
- Employee: **"Masterclass aanvragen bij Bas"** → `<Link to="/contact">`
- Employer: **"Kennismaken met Bas"** → opent bestaande `MasterclassFormModal`

### 3. Inbouwen op 6 pagina's
Verwijder bestaand masterclass-blok en plaats `<MasterclassSection variant="..." />`:
- **Employee variant**: `StressManagement.tsx`, `PrestatieProgramma.tsx`
- **Employer variant**: `Vitaliteitsprogramma.tsx`, `DuurzameInzetbaarheidTraining.tsx`, `DeMethode.tsx`, `LandingPage.tsx`

Op `PrestatieProgramma.tsx` verwijder ik tevens de losstaande "foto van Bas + review"-sectie — die wordt vervangen door de nieuwe component (review nu zonder foto, centraal in MasterclassSection).

### 4. Imports opruimen
Verwijder ongebruikte iconen/imports (Activity, BookOpen, Award, Brain, MasterclassFormModal indien niet meer nodig) per pagina.