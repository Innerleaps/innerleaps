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

1. **Geen cijfer zonder soort en sterretje.** Elk cijfer krijgt een klein
   sterretje (*) dat linkt naar het blok "Bronnen" onderaan de pagina, vlak
   boven de footer. Daar staat per bron één regel, altijd zichtbaar en minimaal
   14 pixels. Zo blijft het cijfer zelf rustig in beeld (besluit Bas,
   22-10-2026; eerder stond hier "geen sterretjes").
   Bij een citaat staat geen toelichting: daar is al duidelijk dat de klant het
   zegt. Alleen een sterretje achter het aanhalingsteken, voor de zekerheid.
2. **Eigen cijfers zijn zelfgerapporteerd**, met n en periode. Geen
   oorzaak-gevolg: schrijf "na de training", nooit "door de training".
3. **Externe studies** altijd met "in studie naar [soort]" en auteur en jaar.
   Gebruik het cijfer zoals in de studie: zelfde groep, zelfde uitkomst. Erbij
   dat het niet bij onze deelnemers gemeten is.
4. **Geen aantonende beloftes** in koppen, bullets of meta-teksten.
5. **Eén vaste verwijzing** "Methode en beperkingen" naar
   `/methode-en-beperkingen` (`/en/method-and-limitations`).
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
| `src/components/StatClaim.tsx` | Toont een cijfer met label en sterretje. Het cijfer komt uit het register, nooit uit de vertaalbestanden. |
| `src/components/Voetnoten.tsx` | `Ster` (het sterretje), `TekstMetSter` (een tekst met een * erin, zoals een FAQ-antwoord) en `Voetnoten` (het blok "Bronnen", dat de footer vanzelf toont met precies de bronnen van de cijfers op die pagina). |
| `scripts/check-claims.mjs` | De controle. Draait vóór elke build. Los: `npm run check:claims`. |
| `/methode-en-beperkingen` | De pagina waar het bronnenblok naar linkt. De lijsten met metingen en studies komen uit het register. |

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
3. **Tonen.** Een los cijfer: `<StatClaim id="..." label={...} />`. Een cijfer
   in lopende tekst: zet een `*` direct achter het cijfer in de vertaling, zet
   de sleutel in `sleutels`, en toon de tekst met
   `<TekstMetSter tekst={...} ids={[...]} />`. In een tekst met `<Trans>` kan
   het ook als `<1>*</1>` met `<Ster ids={[...]} />` als component.
   FAQ-antwoorden doen dit vanzelf. Heet het cijfer in het bronnenblok anders
   dan de waarde (zoals "tot 12 maanden" bij de waarde "12"), zet dat in `kort`.
4. **Controleren.** `npm run check:claims`.

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

Een cijfer in lopende tekst (6 woorden of meer) zonder `*` laat de build ook
falen. Uitgezonderd: meta-teksten, citaten en de methodepagina zelf.

Een bron met `lastVerified` ouder dan 12 maanden geeft een waarschuwing.
Controleer de bron dan opnieuw en zet de nieuwe datum erin.

## Checklist voor elke wijziging met een cijfer

- [ ] Soort bepaald (A, B, C of F)
- [ ] Sterretje bij het cijfer, bron staat in het blok onderaan
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
