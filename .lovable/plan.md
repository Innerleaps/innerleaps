

## Update Meta Descriptions for 7 Pages

**Current state**: Only blog posts, AlgemeneVoorwaarden, and PrivacyNotice use `react-helmet-async` for page-specific meta descriptions. The homepage meta description is set in `index.html`. The other 5 pages (Vitaliteitsprogramma, StressManagement, PrestatieProgramma, DeMethode, OverOns, Contact) have no page-specific meta description — they fall back to the `index.html` default.

`HelmetProvider` is already set up in `main.tsx`, so adding `<Helmet>` tags to any page will work.

### Changes

**1. `index.html`** — Update the default meta description (line 9) to the new homepage copy:
> "Innerleaps verlaagt ziekteverzuim met 15-21% via wetenschappelijk onderbouwde breintraining. 6 weken, 12 minuten per dag. Gebaseerd op 40 jaar onderzoek."

**2-7. Add `<Helmet>` tags** to each page component with a `<meta name="description">` override:

| File | Description |
|------|-------------|
| `src/pages/Vitaliteitsprogramma.tsx` | "Innerleaps biedt organisaties een 6-weeks vitaliteitsprogramma met 42% deelname, versus 3-8% bij standaard EAP's. Preventief, wetenschappelijk onderbouwd, betaal alleen voor deelnemers." |
| `src/pages/StressManagement.tsx` | "Innerleaps verlaagt stress bij medewerkers door breintraining: herken stresssignalen eerder, herstel sneller. 6 weken, gebaseerd op neurowetenschappelijk onderzoek. Resultaat: 25% minder fouten onder druk." |
| `src/pages/PrestatieProgramma.tsx` | "Innerleaps verbetert prestaties onder druk via gerichte breintraining. Medewerkers trainen focus en aandacht in 6 weken. Gebaseerd op de methode gebruikt door top sporters en world class CEO's." |
| `src/pages/DeMethode.tsx` | "Innerleaps bouwt op 40 jaar aandachtsonderzoek van Dr. Amishi Jha. De methode traint het waarschuwingssysteem en controlecentrum van het brein, bewezen effectief in meta-analyses en militaire toepassingen." |
| `src/pages/OverOns.tsx` | "Innerleaps is opgericht door Bas Ter Haar Romenij om burn-out te voorkomen voordat het escaleert. Onze geaccrediteerde trainers werken met een vaste methode, geen variatie, wel bewezen resultaat." |
| `src/pages/Contact.tsx` | "Plan een gratis masterclass voor uw organisatie of stel uw vraag aan Innerleaps. Bereikbaar via Bas@innerleaps.nl of 06 23 45 34 77. Reactie binnen één werkdag." |

Each page will import `Helmet` from `react-helmet-async` and add a `<Helmet>` block at the top of its JSX return, following the existing pattern from AlgemeneVoorwaarden/PrivacyNotice.

### Technical detail
- `index.html` meta description serves as fallback for pages without Helmet
- `react-helmet-async` overrides `index.html` head tags at runtime per page
- 8 files modified total: `index.html` + 6 page components + `LandingPage.tsx` (to explicitly set the homepage description via Helmet so it doesn't rely on index.html fallback during client-side navigation)

