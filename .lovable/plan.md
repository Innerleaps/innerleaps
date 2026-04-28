## Doel

Pagina `/breintraining-methode` herstructureren volgens de aangeleverde teksten, secties verwijderen, twee nieuwe afbeeldingen toevoegen, en in het menu "De Methode" hernoemen naar "Methode".

## Nieuwe structuur DeMethode.tsx (van boven naar beneden)

1. **Hero – "Push-ups voor je brein"** (huidige hero behouden, body herschreven naar nieuwe tekst — zie hieronder).
2. **NIEUW: "Continue spanning door het drukke leven"**
   - Title: "Continue spanning door het drukke leven" — "Continue spanning" in `text-brand-orange`.
   - Afbeelding: hergebruik `stressmanagement_en_concentratietraining.png` (de huidige afbeelding van de "Wekelijkse groepsworkshops" sectie).
   - Body: "Druk kan erg effectief zijn. Zo zet een deadline ons aan het werk. Maar door alle ballen die we hoog houden, zowel in ons werk als privé leven, worden we continue blootgesteld aan spanning. En die stress die slaat zich op in zowel ons lichaam als ons werkgeheugen."
3. **"Push-ups voor je brein"** (sectie, na de hero, met titel waarin "Push-ups" oranje)
   - Nieuwe afbeelding: kopieer `user-uploads://Concentratietraining_in_het_dagelijks_leven-2.jpeg` → `src/assets/Breintraining_aandachtoefening.jpeg`. Alt: "Breintraining aandachtoefening".
   - Body: "Met onze methode trainen werknemers hun brein. Net zoals je spieren versterkt in de sportschool, trainen deelnemers twee cruciale systemen met onze "brein push-ups". Zowel het "controlecentrum" voor betere concentratie en een efficiënter werkgeheugen, als het "waarschuwingssysteem" zodat spanning niet opstapelt."
4. **"Een krachtiger controlecentrum"** (bestaande sectie behouden – titel, afbeelding, 5 feature cards), alleen body-tekst vervangen door:
   "Door het oefenen verterkt onder andere de frontale cortex en fronto-pariëtale netwerken, ook wel ons "controlecentrum". Werknemers ontwikkelen als het ware een mentaalschild voor druk en afleiding. Prestaties verbetert omdat spanning minder werkgeheugen inneemt en het concentratievermogen sterker is."
5. **"Een scherper waarschuwingssysteem"** (bestaande sectie behouden – titel, afbeelding, 3 feature cards), body vervangen door:
   "Door de training versterkt ook de anterior insula en anterior cingulate cortex, ons "waarschuwingssysteem". Hierdoor merken werknemers stresssignalen eerder op. In de 6 weekse training ontwikkelen deelnemers nieuwe, gezonde patronen om die stresssignalen te reguleren. Echte gedragsverandering die de vitaliteit en inzetbaarheid van je team versterkt."
6. **Wetenschappelijk rapport blok** (huidig blauwe blok met "Rapport ontvangen") — ongewijzigd behouden.
7. **"Verbeteren van prestaties"** (vervangt huidige "Betere prestaties door minder stress en meer focus")
   - Title: "Verbeteren van prestaties" — "prestaties" oranje.
   - Afbeelding: behouden (`stress_prestatie_curve.png`).
   - Body (twee paragrafen): 
     - "Prestaties van werknemers verbeteren door optimalisatie van het werkgeheugen. Relevante informatie wordt sneller geselecteerd en irrelevante informatie beter onderdrukt. De concentratie neemt toe, terwijl afleiding afneemt. Onderzoek laat tot 24% verbetering zien op aandachtstaken (Jha et al., 2021)."
     - "Daarnaast nemen spanning en druk het werkgeheugen in beslag. Wanneer die spanning afneemt, komt er capaciteit vrij voor de taak zelf. Tot slot wordt het werkgeheugen efficiënter: het levert betere resultaten met minder neurale inspanning (Bailey et al., 2020)."
8. **NIEUW: "6 weken voor echte gedragsverandering"**
   - Title: "6 weken voor echte gedragsverandering" — "gedragsverandering" oranje.
   - Nieuwe afbeelding: kopieer `user-uploads://6_weken_breintraining_voor_gedragsverandering.jpg` → `src/assets/6_weken_breintraining_voor_gedragsverandering.jpg`. Alt: "6 weken breintraining voor gedragsverandering".
   - Body: "Elke week is er een groepssessie met een geaccrediteerde trainer, waarin werknemers reflecteren op hun oefeningen en uitdagingen. Zo komen deelnemers steeds opnieuw in contact met hun eigen doel, en dat motiveert. De sessies zijn bovendien als een stok achter de deur. Ook wie een week niet heeft geoefend komt, en begint dan opnieuw."
   - 3 bullets met iconen (lucide):
     - `Users` — "6 groepsworkshops van 60 minuten"
     - `FileText` — "Werkboek met achtergrondinformatie en opdrachten"
     - `Activity` — "Audio-opnames voor dagelijkse oefening"
   - Slotparagraaf: "Het resultaat? Gedrag dat blijft. De effecten op stress, burn-out en productiviteit zijn 6 tot 12 maanden na de training nog steeds zichtbaar (Vonderlin et al., 2020; Michaelsen et al., 2023)."
9. **MasterclassSection** ongewijzigd behouden ("Ervaar het met onze vrijblijvende masterclass").

## Te verwijderen

- Sectie "Geplande "brein push-ups"" (regels ~448-492).
- Sectie ""Brein push-ups" in het dagelijks leven" (regels ~494-547).
- Sectie "Wekelijkse groepsworkshops, werkboek en theorie" (regels ~549-595) — vervangen door nieuwe "6 weken" sectie hierboven.
- CTA sectie met body "Klaar om de methode ook echt toe te passen?" + 3 trainingsknoppen (regels ~597-633) — volledig verwijderen.
- Ongebruikte imports opruimen (`concentratieOefening`, `concentratieDagelijks`, `Clock` als niet meer nodig, etc.).

## Navigatie (`SimplifiedNavigation.tsx`)

- Desktop link (regel 138) "De Methode" → "Methode".
- Mobile link (regel 238) "De Methode" → "Methode".
- URL `/breintraining-methode` blijft hetzelfde.

## Asset-acties

- `code--copy user-uploads://Concentratietraining_in_het_dagelijks_leven-2.jpeg` → `src/assets/Breintraining_aandachtoefening.jpeg`
- `code--copy user-uploads://6_weken_breintraining_voor_gedragsverandering.jpg` → `src/assets/6_weken_breintraining_voor_gedragsverandering.jpg`

## Resultaat

Pagina volgt de nieuwe vertelvolgorde: probleem (continue spanning) → oplossing (push-ups) → twee getrainde systemen → wetenschappelijk rapport → prestatieverbetering → 6-weeks programma → masterclass CTA. Drie oude push-up/CTA-secties verdwijnen. Menulabel verkort naar "Methode".
