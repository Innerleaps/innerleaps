## Doel

1. URL `/de-methode` wijzigen naar `/breintraining-methode` overal in de app (met legacy redirect zodat oude links blijven werken).
2. Op de pagina `DeMethode.tsx`: alle `<strong>` tags uit de body-teksten verwijderen zodat de tekst normaal gewicht krijgt. Headings (h1/h2/h3) en knoppen behouden hun `font-bold`.

## Wijzigingen

### 1. Routing (`src/App.tsx`)
- Hoofdroute wijzigen: `path="/de-methode"` → `path="/breintraining-methode"`.
- Legacy redirect toevoegen: `<Route path="/de-methode" element={<Navigate to="/breintraining-methode" replace />} />` zodat bestaande links/SEO blijven werken.

### 2. Interne links bijwerken naar `/breintraining-methode`
- `src/components/MethodologySection.tsx` (regel 28)
- `src/components/ProgramOverviewSection.tsx` (regel 68)
- `src/components/SimplifiedNavigation.tsx` (regels 135 en 234)
- `src/pages/PrestatieProgramma.tsx` (regel 600)
- `src/pages/StressManagement.tsx` (regel 583)
- `src/pages/blog/HoeVerlaagIkZiekteverzuim.tsx` (regel 123)
- `src/pages/blog/VerborgenKostenZiekteverzuim.tsx` (regel 236)
- `src/pages/blog/ZiekteverzuimVerlagen.tsx` (regel 142)

### 3. Bold verwijderen in body-tekst (`src/pages/DeMethode.tsx`)
Alle `<strong>...</strong>` wrappers in body-paragrafen worden verwijderd; de tekst zelf blijft staan. Dit betreft o.a. de regels 72-74, 96-97, 245-252, 432-443, 467-480, 520-547.

Behouden blijft: `font-bold` op headings (h1/h2/h3 op regels 68, 88, 119, 141, 167, 191, 211, 237, 275, 305, 333, 377, 408, 461, 502, 557, 613, 622, 631) en `font-semibold` op de CTA-knop.

## Resultaat
- Nieuwe URL: `/breintraining-methode` is de canonieke route.
- Oude URL `/de-methode` redirect automatisch naar de nieuwe.
- Alle navigatie- en bloglinks wijzen naar de nieuwe URL.
- Body-tekst op de methode-pagina is volledig in normaal gewicht; alleen kopjes blijven vet.
