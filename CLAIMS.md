# Cijfers en resultaatclaims op innerleaps.nl

Elk cijfer op de site moet kloppen, de bron noemen en mag niet lezen als
belofte. De beroepsaansprakelijkheidspolis sluit schade uit door "toezeggen of
garanderen van resultaten" en door misleidende reclame. Dit is geen juridisch
advies, maar de regels hieronder zijn bewust gekozen. Wijk er niet van af
zonder overleg met Bas.

**Verzin nooit cijfers, aantallen deelnemers, periodes of bronnen.** Ontbreekt
iets, gebruik dan een plaatshouder (`[n]`, `[periode]`, `[soort training]`) en
zet het op de lijst voor Bas.

## Drie soorten claims

| Soort | Wat | Standaard (NL) | Standaard (EN) |
|---|---|---|---|
| **A** | Eigen meting bij deelnemers van Innerleaps | `[cijfer]* [wat]`, met in de bronnen: `zelfgerapporteerd, n=[n], [wie], [periode]` | `self-reported, n=[n], [who], [period]` |
| **B** | Externe studie, bij andere mensen | `[cijfer]* [wat]`, met in de bronnen: `in studie naar [soort training] ([auteur], [jaar])`, en eronder: "Onderzoekscijfers zijn niet bij deelnemers van Innerleaps gemeten." | `in a study of [type of training] ([author], [year])` |
| **C** | Belofte in een kop, bullet of meta-tekst | Geen aantonende wijs. Schrijf "helpt", "kan", "deelnemers merken" of "deelnemers rapporteren". | "helps", "can", "participants report" |

Daarnaast bestaat **F** (feit zonder effect, zoals een Google-score). Die heeft
ook een bron en een peildatum nodig.

## Zes regels

1. **Geen cijfer zonder zichtbare bron.** De bron staat in beeld, bij het
   cijfer zelf: "gemeten bij TheyDo" bij een eigen meting, "(De Bruin, 2018)"
   bij een studie. Met een stippellijn eronder. Aanwijzen, tikken of Enter
   opent een kaartje met de hele bronregel ("Zelfgerapporteerd, n=14, TheyDo,
   4 weken na de training (voorjaar 2026)") en een link naar Methode en
   beperkingen. Geen sterretjes en geen bronnenblok boven de footer meer
   (besluit Bas, 31-10-2026). De methodepagina staat ook als link in de footer.

   Waarom zo: de regels (Reclame Code, wet, Europese richtlijn) schrijven geen
   vorm voor. Ze kijken naar de totaalindruk, en kleine lettertjes repareren
   geen misleidende kop (Reclame Code Commissie, 3 maart 2025). De bescherming
   zit dus in wat de lezer direct ziet: wie het gemeten heeft. Details mogen een
   laag dieper. Maar niet alleen achter een symbool: dat zien bezoekers meestal
   niet (ACM, 2021). **Haal de zichtbare bron dus nooit weg om het rustiger te
   maken.**

   Bij een citaat staat niets: naam en bedrijf staan er al onder.
2. **Eigen cijfers zijn zelfgerapporteerd**, met n en periode. Geen
   oorzaak-gevolg: schrijf "na de training", nooit "door de training".
3. **Externe studies** altijd met "in studie naar [soort]" en auteur en jaar.
   Gebruik het cijfer zoals in de studie: zelfde groep, zelfde uitkomst. Erbij
   dat het niet bij onze deelnemers gemeten is.
4. **Geen aantonende beloftes** in koppen, bullets of meta-teksten.
5. **Eén vaste verwijzing** "Methode en beperkingen" naar
   `/methode` (`/en/methodology`).
6. **Zonder regel in het claimregister geen cijfer online.** Elke regel heeft
   een bron, de data, de datum van controle en wie het controleerde.

Woorden die altijd eerst getoetst worden voordat ze blijven staan: "al onze
groepen", "onafhankelijk", "altijd", "elke deelnemer", "bewezen", en elk
cijfer zonder bekende n of bron.

## Hoe het technisch werkt

| Bestand | Wat |
|---|---|
| `src/content/claims.json` | Het claimregister. `bronnen`: elke meting en studie met alle velden. `claims`: elk cijfer, met de bron, de waarde per taal, de plekken waar het staat (`sleutels`, `bestanden`) en de status. |
| `src/content/claims-allowlist.json` | Uitzonderingen: teksten met een percentage of beloftewoord die geen claim zijn. Alleen Bas keurt ze goed. |
| `src/lib/claims.ts` | Leest het register en bouwt de bronregels. |
| `src/components/StatClaim.tsx` | Toont een cijfer met label en de bron eronder. Het cijfer komt uit het register, nooit uit de vertaalbestanden. |
| `src/components/Bron.tsx` | `Bron` (de zichtbare bron met stippellijn en kaartje) en `TekstMetBron` (een tekst met `<bron>...</bron>` erin, zoals een FAQ-antwoord). |
| `scripts/check-claims.mjs` | De controle. Draait vóór elke build. Los: `npm run check:claims`. |
| `/methode` | Gelinkt vanuit elk bronkaartje en de footer. De lijsten met metingen en studies komen uit het register. |

### Een cijfer toevoegen of wijzigen

1. **Bron.** Staat de meting of studie nog niet in `bronnen`, voeg hem toe.
   - Eigen meting (`"type": "own"`): `omschrijving`, `naam`, `n`, `methode`,
     `periode`, en `toelichting`, `data` (waar de ruwe data staat),
     `gecontroleerdDoor` en `lastVerified`.
   - Externe studie (`"type": "external"`): `auteur`, `jaar`, `studyType` (de
     hele bronzin, "In studie naar ..."), `sourceUrl` (DOI of link), `titel`
     (volledige referentie), `gecontroleerdDoor` en `lastVerified`.
2. **Claim.** Voeg in `claims` een regel toe met `soort`, `bron`, `waarde`
   (nl en en), `sleutels` (waar in de vertaalbestanden het cijfer of de tekst
   staat), `bestanden` (als het in de code staat) en `status`.
3. **Tonen.** Een los cijfer: `<StatClaim id="..." label={...} />`; de bron
   komt er vanzelf onder. Een cijfer in lopende tekst: markeer de bron in de
   vertaling en zet de sleutel in `sleutels`.
   - `<bron>Bij TheyDo</bron> deed 42% mee`: de woorden zelf worden de bron.
   - `... minder stress <bron></bron>.`: leeg, dan komt er "(Auteur, jaar)" uit
     het register. Past dat niet, zet dan `kortLabel` bij de bron.
   - Meer cijfers in één tekst: `<bron claim="leger-fm722"></bron>`, zodat elk
     kaartje de goede bron toont.
   - In een tekst met `<Trans>`: `<1>Gemeten werd 8,6%</1>` met
     `<Bron ids={[...]} />` als component.

   Toon de tekst met `<TekstMetBron tekst={...} ids={[...]} />`. FAQ-antwoorden
   doen dit vanzelf.
4. **Controleren.** `npm run check:claims`.

### Cijfers die in de code staan, zoals de blogs

De drie blogs over verzuim hebben hun tekst in de TSX, niet in de
vertaalbestanden. Ze staan daarom als heel bestand in `bestanden` van een claim
(nu `cbs-verzuim`). **Let op: een bestand in `bestanden` slaat de controle
helemaal over.** De check ziet daar dus geen nieuw cijfer zonder bron. Zet je
een cijfer in een blog:

- registreer het als eigen claim, met het blogbestand in `bestanden`;
- zet er zelf `{" "}<Bron ids={["claim-id"]} />` achter, dan komt
  "(Auteur, jaar)" in de tekst. Staat de bron al in de zin, maak die woorden
  dan de bron: `<Bron ids={["claim-id"]}>volgens cijfers van ArboNed</Bron>`;
- en lees het blogclaimregister in de Second Brain na (rood blijft rood).

Hetzelfde geldt voor `BookingStats.tsx`. Wil je een bestand liever wel laten
scannen, zet de tekst dan in een vertaalbestand.

### De rekentool rekent alleen het omslagpunt

Sinds 29 oktober 2026 belooft de rekentool geen besparing meer. Hij rekent
alleen vanaf welk punt de training zich terugverdient: prijs per deelnemer
gedeeld door het bruto jaarsalaris (in productiviteit), en hetzelfde gedeeld
door 260 werkdagen (in ziektedagen). Daarnaast staat één gemeten cijfer, de
8,6% van TheyDo, met zijn bron, als balk naast het omslagpunt en als groot
veelvoud ("ruim 5x"). Het veelvoud is altijd een voorwaarde: "Merkt jullie
team hetzelfde, dan ...". Nooit "jullie gaan" of "verwacht". Het wordt naar
beneden afgerond, zodat "ruim" altijd klopt. De som staat in
`src/utils/calculationEngine.ts`, de prijs in `PRIJS_PER_DEELNEMER`, de
weergave in `RoiResultaat.tsx`.

De mail volgt dezelfde opbouw, maar kan het register niet lezen: daar staat
8,6 als `THEYDO_PRODUCTIVITEIT` in `supabase/functions/submit-calculator`.
Verandert het cijfer, verander het dan op beide plekken.

Zet er **nooit** weer een verwacht percentage minder verzuim of een ROI in. Dat
was een eigen rekensom (15 tot 21%) en las als toezegging. De mail die de
bezoeker krijgt komt uit de Edge Function `submit-calculator` en volgt dezelfde
regel.

### Buiten de vertaalbestanden: PDF en deelplaatje

Twee dingen herhalen cijfers van de site en worden niet door de check gezien:

| Wat | Bron | Opnieuw maken |
|---|---|---|
| Business case als PDF (NL en EN) | `docs/business-case/business-case-{nl,en}.html` | `node scripts/maak-business-case-pdf.mjs` |
| Deelplaatje van de TheyDo-case (LinkedIn, WhatsApp) | `docs/deelbeeld/klantcase-theydo-{nl,en}.html` | `node scripts/maak-deelbeeld.mjs` |

Verander je een cijfer dat daar ook in staat, pas dan de HTML aan en draai het
script. De plaatjes staan als `bestanden` bij hun claim in het register, zodat
je ze ziet als je de claim opzoekt.

### Statussen

| Status | Betekenis | Op een branch | In productie |
|---|---|---|---|
| `online` | Bron compleet, tekst gekozen | groen | groen |
| `keuze` | Bas moet nog een tekst kiezen; de huidige tekst blijft staan | waarschuwing | waarschuwing |
| `placeholder` | Er ontbreekt een feit; op de site staat `[plaatshouder]` | waarschuwing | **build faalt** |
| `rood` | Mag niet online (zie het blogclaimregister in de Second Brain) | waarschuwing | **build faalt** |

"In productie" betekent op Netlify met `CONTEXT=production`, dus de deploy van
`main`. Lokaal streng testen: `CLAIMS_STRIKT=1 npm run check:claims`.

Een percentage, "x op de 10", "23x" of beloftewoord dat **nergens**
geregistreerd staat, laat de build altijd falen, ook op een branch. Een cijfer
moet onder een claim met bron vallen (A, B of F); een beloftewoord mag ook
onder een geregistreerde belofte (C) vallen.

Een cijfer in lopende tekst (6 woorden of meer) zonder `<bron>` laat de build
ook falen, en een sterretje achter een cijfer ook. Uitgezonderd: meta-teksten,
citaten en de methodepagina zelf.

Een bron met `lastVerified` ouder dan 12 maanden geeft een waarschuwing.
Controleer de bron dan opnieuw en zet de nieuwe datum erin.

## Checklist voor elke wijziging met een cijfer

- [ ] Soort bepaald (A, B, C of F)
- [ ] Bron zichtbaar bij het cijfer ("gemeten bij TheyDo" of "(Auteur, jaar)")
- [ ] Register bijgewerkt: bron, waarde, sleutels, `lastVerified`, wie controleerde
- [ ] Geen beloftetaal ("bewezen", "gegarandeerd", "door de training")
- [ ] Nederlands en Engels allebei bijgewerkt
- [ ] `npm run check:claims` zonder fouten

## Achtergrond

- Inventaris van 22-10-2026 met alle claims en de huidige teksten van toen:
  `docs/claims-inventaris.md` en `docs/claims-inventaris-2026-10-22.json`.
- Teksten die nog op een keuze van Bas wachten: `docs/claims-keuzes.md`.
- Het blogclaimregister (groen, geel, grijs, rood) staat in de Second Brain:
  `03 Projects/Innerleaps/16 Blogsysteem/(C) Claimregister.md`. Houd het gelijk
  met dit register.
