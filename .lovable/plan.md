## Engelse versie van de website — gefaseerd plan (v2)

Aanpak: `react-i18next` met JSON-bestanden, EN onder URL-prefix `/en/`, browserdetectie (alles behalve `nl*` → EN), handmatige taalwissel rechtsboven met vlag + EN/NL.

**Glossary-afspraken tot nu toe (vastgelegd):**
- Merknaam is **Innerleaps** (nooit "InnerLeaps" met hoofdletter L), in NL én EN. Ik corrigeer dit ook overal in bestaande NL-content waar nu nog "InnerLeaps" staat.
- "Waarschuwingssysteem" → **warning system**.

We werken in **4 fasen**. Na elke fase pauze voor jouw review.

---

### Fase 1 — Glossary ter goedkeuring (ZONDER code)

Ik lever `docs/translation-glossary.md` met voorgestelde EN-vertalingen voor alle kerntermen. Reeds vastgelegde keuzes zijn meegenomen; voor de rest stel ik voor (jij keurt goed/wijzigt):

| Nederlands | Voorstel EN | Toelichting |
|---|---|---|
| Innerleaps | Innerleaps | merknaam, kleine `l` — overal afdwingen |
| Breintraining | Brain training | |
| De Methode / Breintraining-methode | The Method / Brain Training Method | |
| Innerlijke sprong | Inner leap | merkconcept, woordspeling met merknaam |
| Aandachtssysteem | Attention system | |
| Controlecentrum | Control center | US-spelling |
| Waarschuwingssysteem | **Warning system** | vastgelegd |
| Werkgeheugen | Working memory | wetenschappelijke term |
| Automatische piloot | Autopilot | |
| Vitaliteitsprogramma / -training | Vitality Program | US-spelling |
| Prestatieprogramma / -training | Performance Program | |
| Stressmanagement training | Stress Management Training | |
| Duurzame inzetbaarheid | Sustainable employability | EU-standaardterm |
| Via Werkgever | Via Employer | |
| Geaccrediteerd / VMBN | Accredited / VMBN-certified | VMBN onvertaald |
| Ziekteverzuim | Sick leave / Absenteeism | per context kiezen |
| Werknemers / Medewerkers | Employees | |
| Voor Organisaties / Voor Medewerkers | For Organizations / For Employees | |
| Plan een gesprek met Bas | Schedule a call with Bas | |
| Over Ons | About Us | |
| Methode | Method | menu-item |

Plus expliciete twijfelgevallen die ik je voorleg:
- US- vs UK-Engels (voorstel: US — internationaal bredere doelgroep).
- Tone of voice: formeel "you" of casual? (voorstel: casual, sluit aan bij NL-tone.)
- "Innerlijke sprong" letterlijk vertalen (`inner leap`) of als merkconcept onvertaald laten?
- "Stress" vs "stressmanagement": ENG-term "stress management" of "stress reduction"?

**Deliverable fase 1:** glossary-document. Geen code-wijzigingen.

---

### Fase 2 — i18n-infrastructuur opzetten

Pas na jouw glossary-akkoord:

1. Installeer `react-i18next`, `i18next`, `i18next-browser-languagedetector`, `react-helmet-async`.
2. `src/i18n/config.ts`: fallback `nl`, supported `['nl', 'en']`. Detectie: pad → localStorage → `navigator.language` (alles dat niet met `nl` begint → `en`).
3. `src/i18n/locales/{nl,en}/` met namespaces: `common.json`, `home.json`, `methode.json`, `over-ons.json`, `contact.json`, `vitaliteit.json`, `inzetbaarheid.json`, `stressmanagement.json`, `prestatie.json`, `blog.json`, `legal.json`.
4. Routing in `App.tsx`:
   - NL-routes blijven exact zoals nu.
   - EN-equivalenten onder `/en/` met EN-slugs (bv. `/en/about-us`, `/en/method`, `/en/contact`, `/en/vitality-training`, `/en/sustainable-employability`, `/en/stress-management`, `/en/performance-training`, `/en/blog/...`).
   - Wrapper zet `i18n.changeLanguage()` op basis van pad.
   - Root-redirect: niet-NL browser op `/` → `/en/` (eenmalig; localStorage respecteert latere keuze).
5. **Taalwisselaar** rechtsboven in `SimplifiedNavigation`: 🇳🇱 NL / 🇬🇧 EN, huidige taal vet, wisselt naar equivalente URL via slug-mapping. Op mobiel bovenin uitgeklapt menu.
6. **SEO** per pagina: `<html lang>` dynamisch, `hreflang` `nl` / `en` / `x-default` (NL), vertaalde `<title>` + `<meta description>`.
7. `sitemap.xml` met beide taalversies + hreflang-entries; update `robots.txt`.
8. **Branding-correctie**: in dezelfde fase alle voorkomens van "InnerLeaps" → "Innerleaps" doorvoeren in NL-content (search/replace, exclusief assets/bestandsnamen).

**Deliverable fase 2:** werkende infra met taalwissel + branding-correctie. EN-strings nog placeholder waar nog niet vertaald. Geen visuele regressies op NL.

---

### Fase 3 — Vertaling van menupagina's

In volgorde (met review-pauze na elke 2-3 pagina's):
1. Common/Navigation/Footer — menu, knoppen, contactblok.
2. **Home** (`LandingPage`).
3. **Methode** (`DeMethode`).
4. **Over Ons** (`OverOns`).
5. **Contact** (`Contact` + `ContactSection`).
6. **Voor Organisaties:** `Vitaliteitstraining`, `DuurzameInzetbaarheidTraining`.
7. **Voor Medewerkers:** `StressManagement`, `PrestatieProgramma`.
8. Modals & forms op die pagina's (ROI-calculator, registratiemodals, lead-magnet, masterclass-form, vragenlijst).
9. **Juridisch** (Algemene Voorwaarden, Privacy, Cookies): voorstel = EN-samenvatting + link naar bindende NL-versie (juridisch veiliger). Kies ik graag met jou voor we beginnen.

Werkwijze per pagina: strings extraheren naar JSON, contextueel vertalen (geen woord-voor-woord), bij twijfel pauzeren met één gerichte vraag.

**Deliverable fase 3:** volledige EN-versie van het menu en alles daaronder.

---

### Fase 4 — Blogs (3 stuks) + SEO

Per artikel een EN-component in `src/pages/blog/en/` met EN-slug. Vertaling contextueel + **lokalisatie van cijfers**:
- NL CBS/Arbo-cijfers vervangen door Eurostat / OECD / Eurofound waar mogelijk.
- NL-wetgeving (Wet Verbetering Poortwachter, loondoorbetaling 2 jaar): per artikel kies ik met jou tussen "in the Netherlands…"-context óf vervangen door algemene EU-context.
- Bronvermelding aanpassen.

**SEO per blog:**
- Eigen vertaalde `<title>`, `<meta description>`, JSON-LD `Article` met juiste `inLanguage`.
- Wederkerige `hreflang`-koppeling NL ↔ EN per artikel-paar + `x-default` op NL.
- Beide versies in `sitemap.xml` met `<xhtml:link rel="alternate" hreflang>` per entry.
- Geen automatische machinevertaling indexeerbaar (Google straft dit).
- Submit beide via Google Search Console.

Blog-index (`Blog.tsx`) toont in EN-modus alleen EN-artikelen.

**Deliverable fase 4:** 3 EN-blogartikelen + werkende EN-blogindex + volledige hreflang-dekking.

---

### Buiten scope (bewust)

- E-mailtemplates in edge functions (`send-roi-analysis` etc.) — losse fase 5 indien gewenst.
- Valuta/datum-format wijzigen (we houden EUR + dd/mm).
- Niet-menu pagina's (`9-stippen`, `MasterclassQR`, `Bedankt`, oude `Wetenschap`).

---

### Volgende actie

Bij akkoord start ik met **Fase 1**: `docs/translation-glossary.md` voor jouw review. Geen andere wijzigingen tot je goedkeurt.
