# SEO quick wins: duurzame inzetbaarheid, verzuim verlagen, verzuim verminderen

Opgesteld 24 augustus 2026, op basis van Search Console-data en een analyse door
vier specialisten (technisch, content, Google-data, AI-vindbaarheid). Claims die
niet klopten zijn eruit gehaald; wat hieronder staat is geverifieerd.

---

## De diagnose in vier zinnen

Tot drie dagen geleden kregen crawlers zonder JavaScript **nul woorden** van deze
site. De prerender-fix van stap 4 heeft dat opgelost, maar Google heeft de meeste
pagina's sindsdien nog niet opnieuw bekeken. Ondertussen staan de doeltermen
letterlijk niet op de pagina's die ervoor bedoeld zijn, en geeft de site die
pagina's intern nauwelijks gewicht. Het fundament is net gerepareerd; de
onderstaande ingrepen landen daar nu bovenop.

## Wat de cijfers zeggen

| Meting | Waarde |
|---|---|
| Klikken, laatste 90 dagen | 23 (was 64 in de 90 dagen daarvoor, **-64%**) |
| Vertoningen | 2.068, vlak op ~23 tot 28 per dag |
| Vertoningen op de drie doeltermen | **0** |
| Pagina's met enige vertoning | 18 |
| Aandeel vertoningen op de www-variant | 84% (historisch; www leidt nu correct om) |

De klikdaling is het enige betrouwbare cijfer in die vergelijking. Google meldt
zelf een logfout die vertoningen, CTR en positie tussen 13 mei 2025 en 27 april
2026 heeft aangetast, dus die drie zijn niet vergelijkbaar over periodes.

### Je had deze rankings wél, en bent ze kwijt

In de vorige periode haalden relevante termen nog vertoningen. Nu allemaal nul:

| Zoekterm | Toen | Pagina |
|---|---|---|
| roi vitaliteitsprogramma berekenen | 17 vertoningen, positie 17,5 | /blog/verborgen-kosten-ziekteverzuim-rekenmodel |
| verzuimreductie programma | 8, positie 15,2 | /blog/hoe-verlaag-ik-het-ziekteverzuim-in-mijn-organisatie |
| verzuimreductieprogramma | 6, positie 20,2 | idem |
| aandachtstraining | 7, positie 22,6 | /de-methode |
| ziekteverzuim interventies | 2, positie 57,5 | /blog/verborgen-kosten-ziekteverzuim-rekenmodel |
| verlaag ziekteverzuim en verloop | 3, positie 27,7 | /blog/hoe-verlaag-ik-het-ziekteverzuim-in-mijn-organisatie |

Dit is geen site die nooit iets had. Dit is een site die terrein heeft verloren.

---

## De vijf echte problemen

**1. De doeltermen staan niet op de pagina's.**
`verzuim verminderen` komt **nul keer** voor op de hele site. `duurzame
inzetbaarheid` komt op zijn eigen pagina alleen voor in de footer-tagline, niet
in de bodytekst. De H1 van `/duurzame-inzetbaarheid` luidt nog steeds "Het
bewezen vitaliteitstraining voor minder verzuim" en bevat geen enkele doelterm.

**2. Het hoofdmenu levert geen crawlbare links.**
De dropdown is een Radix-component die pas in de DOM verschijnt na een klik.
Geverifieerd op de geprerenderde homepage: de enige links zijn
`/breintraining-methode` (3x), `/over-ons`, `/contact` (2x) en `/blog` (2x).
Naar `/duurzame-inzetbaarheid` gaat **één** link, en die staat in de footer.
Naar `/team-prestaties-verbeteren` gaat er **nul**. Het menu staat op alle 24
pagina's en is dus de sterkste interne linkpositie die je hebt. Hij draagt nu
niets bij.

**3. Je meest relevante blogartikel is nooit gecrawld.**
`/blog/hoe-verlaag-ik-het-ziekteverzuim-in-mijn-organisatie` staat op
"Discovered - currently not indexed", nooit opgehaald. Precies het artikel dat in
de vorige periode nog op drie verzuimtermen scoorde.

**4. Elke onzin-URL geeft HTTP 200.**
De SPA-catch-all in `netlify.toml` vangt ook echte fouten af. Geverifieerd:
`/dit-bestaat-echt-niet-xyz123` geeft 200 met homepage-inhoud. Zulke soft-404's
drukken het crawlvertrouwen van een klein domein.

**5. Kapotte schema-verwijzing.**
In `VerborgenKostenZiekteverzuim.tsx` en `HoeVerlaagIkZiekteverzuim.tsx` wijst
het publisher-logo naar een oud Lovable-stagingdomein
(`7f1b052b-...lovableproject.com`). Schema-validators falen daarop.

## Wat juist goed staat, niet aankomen

- Canonicals: overal correct zelfverwijzend. Geverifieerd op zes pagina's.
- robots.txt: alle AI-crawlers expliciet toegelaten, geen blokkades.
- Alt-teksten: 36 afbeeldingen, geen enkele zonder alt, netjes beschrijvend.
- Beveiligingsheaders, HTTPS, www-naar-apex: alles in orde, één hop.
- De 28 klantlogo's: samen 344 KB, geen probleem.
- De 301's van de hernoemde URL's: alle in één hop.

---

## Uitgevoerd op 24 augustus 2026

Alles hieronder staat in de build, nog niet gedeployed op het moment van
schrijven.

### Tekst en vindbaarheid

- [x] H1 van `/duurzame-inzetbaarheid` bevat nu beide doeltermen:
      "Duurzame inzetbaarheid vergroten en verzuim verlagen". Meteen ook de
      taalfout eruit, er stond "Het bewezen vitaliteitstraining".
- [x] Definitie-alinea direct onder de hero, zodat de pagina antwoord geeft op
      "wat is duurzame inzetbaarheid".
- [x] Homepagetitel naar "Verzuim verminderen en voorkomen". De oude titel
      ("Verzuim voorkomen en verminderen") brak de zoekterm doormidden.
- [x] Kannibalisatie opgelost. De homepage claimde "duurzame inzetbaarheid" in
      zijn H1 terwijl de subpagina hem in zijn title had, en op de subpagina
      stond hij niet eens in de kop. Nu bezit de homepage "verzuim", de
      subpagina "duurzame inzetbaarheid". De term blijft wel in de
      homepagetekst staan, met link naar de subpagina.
- [x] FAQ van 8 naar 13 vragen op `/duurzame-inzetbaarheid`, naar 9 op de
      teampagina. Drie daarvan mikken op termen waar aantoonbaar zoekvraag voor
      is: "verzuimreductie programma" (stond op positie 15,2), "verlaag
      ziekteverzuim en verloop", en "verzuim verminderen".

Gemeten in de gebouwde HTML:

| Term | Voor | Na |
|---|---|---|
| "duurzame inzetbaarheid" op zijn eigen pagina | 0 in de tekst | 6x |
| "verzuim verlagen" daar | 0 | 1x |
| "verzuim verminderen" op de hele site | 0 | 3x |

### Techniek

- [x] **FAQ-antwoorden staan nu in de HTML.** Ze zaten uitsluitend in het
      JSON-LD-blok, want de accordeon mountte pas bij openen. De broncode van
      `/duurzame-inzetbaarheid` ging van 1.018 naar 2.229 woorden. Opgelost met
      een `alwaysRendered`-vlag op `AccordionContent`, zodat de vragenlijsten
      hun animatie houden.
- [x] **Menulinks crawlbaar.** Het mobiele menu werd voorwaardelijk gerenderd,
      dus in de geprerenderde HTML stond geen enkele link naar de vier
      propositiepagina's. Nu staat het blok altijd in de DOM en verbergt CSS
      het. Visueel verandert er niets. Links per pagina:
      `/duurzame-inzetbaarheid` van 1 naar 2, `/team-prestaties-verbeteren` van
      **0 naar 2**.
- [x] Teampagina toegevoegd aan de footer, die ontbrak daar.
- [x] Drie foto's naar WebP. Hero van 1.988 naar 108 KB, masterclass van 2.672
      naar 276 KB. Pagina's van ongeveer 5 MB naar 1 MB.
- [x] Echte 404 in plaats van een zachte 404. Elke onzin-URL gaf HTTP 200 met
      homepage-inhoud. Let op: de veertien routes die niet geprerenderd worden
      staan nu expliciet in `netlify.toml`. Voeg je een route toe aan
      `App.tsx` zonder hem in `ROUTE_MAP` te zetten, zet hem daar dan ook bij.
- [x] Organization-schema op alle 24 pagina's.
- [x] Kapot publisher-logo in twee blogschema's. Wees naar een oud
      Lovable-stagingdomein.
- [x] Zes gehashte asset-URL's in og:image en schema. Die braken bij elke build,
      want de hash verandert. Nu stabiel onder `/social/`.
- [x] Dode preload in `index.html` verwijderd. Wees naar `/src/assets/...`, een
      pad dat alleen tijdens ontwikkelen bestaat. Elke bezoeker deed daardoor
      een mislukte aanvraag.
- [x] `lastmod` toegevoegd aan alle 24 sitemap-URL's.

### Nog te doen

- [x] Indexering aangevraagd in Search Console op 25 augustus 2026, voor de
      zeven URL's uit de lijst verderop. Dat kan alleen de gebruiker, de knop
      zit niet in de API.
- [ ] Over twee weken meten, dus rond 8 september 2026. Zie de tabel onderaan.
      Draai dan opnieuw een URL-inspectie op dezelfde zeven URL's en vergelijk
      met de statussen in de tabel "Wat de URL-inspectie liet zien".
- [ ] De 28 klantlogo's naar WebP. Samen 344 KB, dus kleinere winst dan de drie
      foto's. Bewust uitgesteld.
- [ ] Person-schema voor de auteur en een auteurspagina met credentials.

---

## Het oorspronkelijke plan

### Nu doen, hoogste opbrengst per minuut

**1. Zet de doeltermen op de pagina waar ze horen.** Ongeveer een uur.

`/duurzame-inzetbaarheid`:
- H1 van "Het bewezen vitaliteitstraining voor minder verzuim" naar
  **"Duurzame inzetbaarheid vergroten en verzuim structureel verlagen"**
- Voeg bovenaan een definitie-alinea toe die begint met de term zelf. Voor de
  vraag "wat is duurzame inzetbaarheid" heeft de site nu geen antwoord.
- Meta description zo dat `verzuim verlagen` aaneengesloten voorkomt

Homepage: title van "Verzuim voorkomen en verminderen" naar **"Verzuim
verminderen en voorkomen"**. Een woordomzetting maakt de term aaneengesloten.

**2. Maak de menulinks crawlbaar.** Halve dag.

Render de dropdown-items als echte `<a>`-tags die altijd in de DOM staan, en
verberg ze met CSS in plaats van ze conditioneel te mounten. Dit verandert niets
aan wat een bezoeker ziet. Het geeft je vier geldpagina's in één klap een link
vanaf alle 24 pagina's.

Controle achteraf: `curl -s https://innerleaps.nl/ | grep 'duurzame-inzetbaarheid'`
moet meer dan één treffer geven.

**3. Vraag indexering aan.** Vijf minuten, en alleen jij kunt dit.

Search Console, URL-inspectie, "Indexering aanvragen", in deze volgorde:
1. `/blog/hoe-verlaag-ik-het-ziekteverzuim-in-mijn-organisatie` (nooit gecrawld)
2. `/blog/verborgen-kosten-ziekteverzuim-rekenmodel` (gecrawld, niet geïndexeerd)
3. `/blog` (gecrawld, niet geïndexeerd)
4. `/duurzame-inzetbaarheid-training` (oude URL, zodat de 301 wordt opgepikt)

### Daarna, goedkoop en blijvend

**4. Drie foto's naar WebP.** Half uur.

Gemeten met cwebp op kwaliteit 82:

| Bestand | Nu | WebP | Winst |
|---|---|---|---|
| Vitaliteitsprogramma_presentatie_Innerleaps.png (hero, LCP) | 1.988 KB | 108 KB | -94% |
| masterclass-audience.jpg | 2.672 KB | 276 KB | -89% |
| 6_weken_brein_trainen.png | 468 KB | 40 KB | -91% |

Elke pagina sleept nu ~5 MB aan beeld mee, daarna ~424 KB. Raakt Core Web
Vitals, mobiele bezoekers én je Netlify-bandbreedte tegelijk.

**5. Repareer het publisher-logo.** Vijf minuten.
Vervang de lovableproject.com-URL door `https://innerleaps.nl/...` in de twee
genoemde bestanden.

**6. Echte 404-pagina.** Half uur.
Een geprerenderde 404 met `status = 404` in `netlify.toml`, vóór de catch-all.

**7. Organization-schema sitewide.** Half uur.
Eén JSON-LD-blok met naam, logo, sameAs en de erkenning door VGZ, CZ en Menzis.
Zet die erkenning ook als lopende zin op de pagina, niet alleen als alt-tekst bij
een logo. **Eerst controleren of "vergoeding" feitelijk klopt voor alle drie de
verzekeraars**, anders is dat zelf een onbewezen claim.

### Bewust niet nu

Auteurspagina met credentials, blogartikelen verversen, hubpagina bouwen. Nuttig,
maar dat is werk van weken en het effect is pas meetbaar als het bovenstaande
staat.

---

## Hoe je over twee weken weet of het werkt

| Signaal | Nu | Verwacht |
|---|---|---|
| `/blog/hoe-verlaag-ik...` in URL-inspectie | Discovered, nooit gecrawld | Gecrawld, liefst geïndexeerd |
| Vertoningen op "verzuim verlagen" | 0 | Enkele, op ruwe posities |
| Vertoningen op "verzuim verminderen" | 0 | Enkele |
| Links naar `/duurzame-inzetbaarheid` in de HTML | 2 (menu + footer) | blijft 2 |
| Onzin-URL | HTTP 404 sinds deze deploy | blijft 404 |

**Waaraan je ziet dat de diagnose fout was:** als `/duurzame-inzetbaarheid` na
twee weken nog steeds niet geïndexeerd is ondanks punt 1 tot 3, dan zit het niet
in crawlbaarheid maar in hoe Google de inhoudelijke kwaliteit en de autoriteit
van het domein beoordeelt. Dat vraagt een ander gesprek dan quick wins.

## Wat niet gemeten is

- Of Innerleaps al genoemd wordt in ChatGPT, Perplexity of AI Overviews. Niet getest.
- Backlinks en domeinautoriteit. Niet opgevraagd.
- Core Web Vitals in het veld: er is geen Google API-sleutel, dus PageSpeed en
  CrUX konden niet draaien. De beeldcijfers hierboven zijn broncode-metingen,
  geen veldmetingen.
