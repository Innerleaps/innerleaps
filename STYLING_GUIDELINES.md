# InnerLeaps Styling Guidelines

Dit document is de **single source of truth** voor alle styling in de InnerLeaps applicatie. Volg deze richtlijnen bij het maken of aanpassen van componenten om consistentie te waarborgen.

## 🎨 Kleuren (Brand Guidelines)

### Primaire Merkleuren

- **Oranje** `#F47340` 
  - Gebruik: Accenten, highlights, CTA buttons, check icons
  - CSS variabele: `--brand-orange`
  - Classes: `text-brand-orange`, `bg-brand-orange`, `border-brand-orange`
  
- **Donker Paars** `#230C47`
  - Gebruik: Primaire tekst, hoofdtitels, subtitels
  - CSS variabele: `--brand-purple`
  - Classes: `text-brand-purple`, `bg-brand-purple`, `border-brand-purple`
  
- **Licht Paars/Blauw** `#352D8C`
  - Gebruik: Hero achtergronden, gradients, accent backgrounds
  - CSS variabele: `--brand-blue`
  - Classes: `text-brand-blue`, `bg-brand-blue`, `border-brand-blue`

- **Off-White** `#F7F5F2`
  - Gebruik: Default achtergrondkleur voor secties (niet wit)
  - CSS variabele: `--brand-off-white`
  - Classes: `bg-brand-off-white`

### Grijstinten (voor tekst)

- **Gray Dark** `#334155` - `text-brand-gray-dark` - Secundaire titels
- **Gray Medium** `#64748b` - `text-brand-gray-medium` - Body tekst
- **Gray Light** `#f8fafc` - `bg-brand-gray-light` - Lichte achtergronden
- **Wit** `#FFFFFF` - `bg-white` - Cards, alternerende secties

### ❌ NIET in brand guidelines

- **Groen** - NIET GEBRUIKEN (zat in oude versie, nu verwijderd)
- De oude `text-accent` kleur was groen - nu `text-brand-orange` gebruiken

### Achtergrondkleur Patroon

Secties wisselen af tussen `bg-white` en `bg-brand-off-white` (#F7F5F2):

```tsx
// HeroSection: gradient (bg-brand-blue to bg-brand-blue-dark)
// MethodologySection: bg-brand-off-white
// ProgramOverviewSection: bg-white
// TrustSection: bg-brand-off-white
// etc.
```

**Regel**: Elke nieuwe sectie krijgt een andere achtergrondkleur dan de vorige.

## 📝 Typografie

### H2 Titels (Sectie hoofdtitels)

```tsx
<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight">
  Titel met <span className="text-brand-orange">oranje accent</span>
</h2>
```

- **Size**: `text-4xl md:text-5xl lg:text-6xl`
- **Weight**: `font-bold`
- **Leading**: `leading-tight`
- **Kleur**: `text-brand-purple` met `text-brand-orange` voor highlights
- **Spacing**: `mb-12` onder de titel

### H3 Titels (Card/Blok titels)

```tsx
<h3 className="text-2xl font-bold text-brand-purple">
  Feature titel
</h3>
```

- **Size**: `text-2xl`
- **Weight**: `font-bold`
- **Kleur**: `text-brand-purple` of `text-brand-gray-dark`
- **Spacing**: `mb-3` onder de titel

### Body Tekst

```tsx
<p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
  Beschrijvende tekst met goede leesbaarheid
</p>
```

- **Size**: `text-xl md:text-2xl` (desktop grotere tekst)
- **Minimaal**: `text-xl` (20px) voor lopende tekst
- **Leading**: `leading-relaxed`
- **Kleur**: `text-brand-gray-medium`

### Ondergrens: nooit onder 16px

**`text-sm` en `text-xs` gebruik je niet voor tekst die een bezoeker leest.**
Ook niet in tabellen, cijferpanelen, formulierlabels, badges of voetnoten.

Waarom 16px en niet iets kleiners:

- WCAG schrijft **geen** minimale lettergrootte voor. Dat wordt vaak beweerd
  maar het klopt niet: succescriterium 1.4.4 eist alleen dat tekst tot 200%
  vergroot kan worden. De ondergrens komt dus ergens anders vandaan.
- Apple houdt 11pt aan als absoluut minimum en **17pt** voor body-tekst,
  Material Design **16sp**. De praktijkstandaard voor mobiel web is 16px, uit
  leesafstandsonderzoek: een telefoon houd je op 25 tot 35 centimeter.
- **iOS Safari zoomt vanzelf in** op een invoerveld onder 16px. Dat is Apple
  die je vertelt dat het te klein is.

De schaal:

| Rol | Mobiel | Desktop | Tailwind |
|---|---|---|---|
| Sectiekop | 36px | 48–60px | `text-4xl md:text-5xl lg:text-6xl` |
| Kaartkop | 20px | 24px | `text-xl md:text-2xl` |
| Lopende tekst | 20px | 24px | `text-xl md:text-2xl` |
| Tekst in kaarten en lijsten | 20px | 20px | `text-xl` |
| Compacte UI en ondergrens | 16px | 16px | `text-base` |

Let op bij de shadcn-componenten: `Input`, `Label`, `Button`, `accordion`,
`dialog`, `sheet` en `navigation-menu` brachten allemaal hun eigen `text-sm`
mee. Die staan nu op `text-base`. Zet je een nieuw shadcn-component neer,
controleer dat dan.

**Groter maken kan de opmaak breken.** Bij het optillen van de vier cijfers in
`BookingStats` liep "Productiviteit" zijn cel uit: vier kolommen van 85 pixels
zijn te smal voor 16px. Dat is opgelost in de opmaak, met twee rijen van twee
op mobiel. Meet dus na, en verklein nooit de tekst om een opmaakprobleem op te
lossen.

### Accent/Statistiek Tekst

```tsx
<span className="text-xl font-semibold text-brand-purple">
  70% lager uitvalrisico
</span>
```

- **Size**: `text-xl`
- **Weight**: `font-semibold`
- **Kleur**: `text-brand-purple` of `text-brand-orange`

## 🎯 Icons

**🔥 BELANGRIJKE REGEL: Alle iconen zijn ALTIJD oranje (`text-brand-orange`).**

### Check Icons (Lucide React)

```tsx
import { Check } from 'lucide-react';

<Check className="h-6 w-6 text-brand-orange stroke-[3]" />
```

- **Grootte**: `h-6 w-6` (24px)
- **Stroke**: `stroke-[3]` voor extra dikte
- **Kleur**: `text-brand-orange` (ALTIJD!)

### Feature Icons

```tsx
<div className="w-14 h-14 bg-brand-orange/10 rounded-lg flex items-center justify-center">
  <Icon className="w-7 h-7 text-brand-orange" />
</div>
```

- **Container**: `w-14 h-14` met `bg-brand-orange/10` (10% opacity)
- **Icon**: `w-7 h-7` (28px)
- **Kleur**: `text-brand-orange` (ALTIJD!)

### Card Icons (zoals in Organisatie/Deelnemers blokken)

```tsx
<div className="p-3 rounded-lg bg-brand-orange/5 w-fit">
  <Icon className="h-8 w-8 text-brand-orange stroke-2" />
</div>
```

- **Container**: `p-3 rounded-lg bg-brand-orange/5`
- **Icon**: `h-8 w-8` met `stroke-2`
- **Kleur**: `text-brand-orange` (ALTIJD!)

**Referentie implementatie**: Zie ProgramSection.tsx en Wetenschap.tsx voor correcte icoon styling.

**❌ NOOIT gebruiken**: `text-brand-blue`, `text-brand-green`, `text-brand-purple` voor iconen  
**✅ ALTIJD gebruiken**: `text-brand-orange` voor ALLE iconen

## 🖼️ Logo Groottes

### Standaard groottes

```tsx
// Klein - voor meerdere logo's naast elkaar
<img src={logo} alt="..." className="h-24 object-contain" />

// Medium - voor enkele prominente logo's
<img src={logo} alt="..." className="h-32 object-contain" />

// Groot - voor hero secties
<img src={logo} alt="..." className="h-40 object-contain" />
```

- **Klein**: `h-24` (96px)
- **Medium**: `h-32` (128px)
- **Groot**: `h-40` (160px)

### Object fit & Display

- **Altijd**: `object-contain` voor logo's (niet `object-cover`)
- **Display**: `flex flex-row gap-4 items-center flex-wrap` voor logo rijen

## 📐 Spacing & Layout

### Sectie Padding

```tsx
<section className="section-padding">
  // Content
</section>
```

- **Utility class**: `section-padding`
- **Betekenis**: `py-16 md:py-20 lg:py-28`

### Container

```tsx
<div className="container-custom">
  // Content
</div>
```

- **Utility class**: `container-custom`
- **Betekenis**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

### Card Padding

```tsx
<div className="bg-white p-8 rounded-xl">
  // Card content
</div>
```

- **Padding**: `p-8` (2rem = 32px)
- **Border radius**: `rounded-xl`
- **Shadow**: `shadow-sm` voor subtiele diepte

### Grid Gaps

```tsx
// Voor kleine items
<div className="grid gap-4">

// Voor cards en grotere items
<div className="grid gap-8">
```

- **Klein**: `gap-4` (1rem = 16px)
- **Groot**: `gap-8` (2rem = 32px)

### Space Between Items

```tsx
// Voor verticale spacing
<div className="space-y-4">  // Kleine spacing
<div className="space-y-6">  // Medium spacing
<div className="space-y-12"> // Grote spacing
```

## 🔄 Component Voorbeelden

### Sectie met Titel en Content

```tsx
<section className="section-padding bg-white">
  <div className="container-custom">
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight text-center mb-12">
      Titel met <span className="text-brand-orange">oranje accent</span>
    </h2>
    <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
      Body tekst met goede leesbaarheid
    </p>
  </div>
</section>
```

### Card met Icon en Tekst

```tsx
<div className="bg-white p-8 rounded-xl space-y-4">
  <div className="w-14 h-14 bg-brand-orange/10 rounded-lg flex items-center justify-center">
    <Icon className="w-7 h-7 text-brand-orange" />
  </div>
  <h3 className="text-2xl font-bold text-brand-purple">Card titel</h3>
  <p className="text-xl text-brand-gray-medium leading-relaxed">
    Beschrijving van de feature
  </p>
</div>
```

### Trust Item met Check Icon

```tsx
<div className="bg-white p-8 rounded-xl shadow-sm">
  <div className="flex items-start space-x-3">
    <Check className="h-6 w-6 text-brand-orange stroke-[3]" />
    <div>
      <h3 className="text-2xl font-bold text-brand-purple mb-3">
        Trust item titel
      </h3>
      <p className="text-xl text-brand-gray-medium leading-relaxed mb-6">
        Beschrijving van de trust factor
      </p>
      <div className="flex flex-row gap-4 items-center flex-wrap">
        <img src={logo} alt="..." className="h-24 object-contain" />
      </div>
    </div>
  </div>
</div>
```

## 🔘 Buttons (Call-to-Action Richtlijnen)

### Button Varianten voor Niet-Ingelogde Sectie

**Primaire Buttons (Oranje)** - `variant="default"` of geen variant
- **Gebruik voor**: ROI Calculator gerelateerde acties
- **Voorbeelden**: "Bereken mijn besparing", "Verstuur mijn ROI-analyse", "Bereken ROI"
- **Styling**: Oranje achtergrond (`bg-brand-orange`), witte tekst
- **Code**: `<Button>Bereken mijn besparing</Button>`

**Secundaire Buttons (Paars/Blauw)** - `variant="secondary"`
- **Gebruik voor**: Afspraken plannen, contact, downloads (wetenschappelijke papers)
- **Voorbeelden**: "Gesprek met Bas plannen", "Plan een gesprek met Bas", "Download paper"
- **Styling**: Paars/blauwe achtergrond (`bg-brand-blue`), witte tekst
- **Code**: `<Button variant="secondary">Gesprek met Bas plannen</Button>`

### Button Text Styling

Voor prominente CTA buttons:
```tsx
<Button 
  variant="secondary"
  className="font-semibold py-5 px-10 rounded-lg text-lg"
>
  Plan een gesprek met Bas
</Button>
```

- **Text size**: `text-lg` (18px) of groter voor belangrijke CTAs
- **Font weight**: `font-semibold` of `font-bold`
- **Padding**: `py-5 px-10` voor prominente buttons
- **Border radius**: `rounded-lg`

### Voorbeeld Sticky Buttons (Referentie Implementatie)

De sticky buttons rechtsonder zijn de perfecte referentie:
- ROI Calculator button: Primair (oranje) - `<Button>`
- Gesprek plannen button: Secundair (paars) - `<Button variant="secondary">`

## ✅ Best Practices

1. **Consistentie**: Gebruik ALTIJD deze vooraf gedefinieerde classes
2. **Responsive**: Denk mobile-first met `md:` en `lg:` breakpoints
3. **Toegankelijkheid**: Minimaal `text-xl` (20px) voor body tekst
4. **Spacing**: Gebruik Tailwind spacing utilities (`space-y`, `gap`, `mb`, etc.)
5. **Kleuren**: Gebruik semantische kleurnamen uit de brand guidelines
6. **Geen inline styles**: Alles via Tailwind classes
7. **Geen hardcoded hex waarden**: Gebruik de CSS variabelen
8. **Check brand colors**: Geen groen, alleen oranje/paars/blauw/off-white
9. **Iconen**: ALLE iconen zijn oranje (`text-brand-orange`) - geen uitzonderingen

## 🚫 Veel gemaakte fouten (vermijd deze)

❌ **FOUT**: `text-white` of `bg-white` direct gebruiken zonder context
✅ **GOED**: `text-brand-purple` of via semantic tokens

❌ **FOUT**: `text-accent` gebruiken (was groen)
✅ **GOED**: `text-brand-orange` voor accenten

❌ **FOUT**: `text-lg` of kleiner voor body tekst
✅ **GOED**: Minimaal `text-xl` voor leesbaarheid

❌ **FOUT**: `h-12` voor logo's (te klein)
✅ **GOED**: Minimaal `h-24` voor herkenning

❌ **FOUT**: Groene kleuren gebruiken
✅ **GOED**: Alleen brand kleuren uit deze guide

❌ **FOUT**: Custom CSS in component bestanden
✅ **GOED**: Alles via Tailwind utilities en design system

❌ **FOUT**: `text-brand-blue` of `text-brand-green` voor iconen
✅ **GOED**: `text-brand-orange` voor ALLE iconen

---

**Laatst bijgewerkt**: 2025-10-22
**Versie**: 1.0
