# Werkafspraken innerleaps.nl

## Nederlands en Engels lopen altijd samen op

De site is tweetalig. **Het Engels is de brontaal.** Nieuwe teksten schrijf je
eerst in het Engels. **Elke tekstwijziging in het Engels krijgt dezelfde
wijziging in het Nederlands, in dezelfde opdracht.** Niet "later", niet "als je
erom vraagt". Een wijziging is pas af als beide talen kloppen.

**Het Nederlands is een herschrijving, geen vertaling.** Zelfde belofte, eigen
zinnen. Het Nederlands mag korter zijn, een andere zinsvolgorde hebben en een
ander beeld gebruiken dan het Engels. Wat je nooit doet: woord voor woord
omzetten. Herkenbaar vertaald Nederlands, en wat je in plaats daarvan schrijft:

| Klinkt vertaald | Natuurlijk |
|---|---|
| "Ontdek de kracht van ..." | zeg gewoon wat het doet |
| "Wij bieden oplossingen die ..." | "Wij trainen je team om ..." |
| "in staat stellen om" | "zodat ze kunnen" |
| lange bijzin met Engelse volgorde | knip hem in twee korte zinnen |

De test: lees het Nederlands hardop. Hoor je er Engels onder, dan is het nog
niet af.

Dat geldt ook voor URL's: hernoem je een Nederlands pad, dan hernoem je het
Engelse pad mee, inclusief de 301 en de sitemap.

De twee bestandsparen moeten exact dezelfde sleutels houden:

```
src/i18n/locales/nl/*.json   <->   src/i18n/locales/en/*.json
```

Controleer dat na elke wijziging:

```bash
python3.12 -c "
import json,sys
for f in ('common','training','methode','overons','contact','calculator','leadMagnet','caseTheydo'):
    nl=json.load(open(f'src/i18n/locales/nl/{f}.json'))
    en=json.load(open(f'src/i18n/locales/en/{f}.json'))
    def paths(o,p=''):
        s=set()
        if isinstance(o,dict):
            for k,v in o.items(): s|=paths(v,f'{p}.{k}' if p else k)
        elif isinstance(o,list):
            for i,v in enumerate(o): s|=paths(v,f'{p}[{i}]')
        else: s.add(p)
        return s
    d=paths(nl)^paths(en)
    print(f'{f}: {\"OK\" if not d else sorted(d)}')
"
```

Termen consequent vertalen volgens `docs/translation-glossary.md`.

### Het Engels is Brits

Schrijf `programme`, `organisation`, `recognise`, `centre`, `behaviour`,
`analyse`, `colour`. Niet de Amerikaanse varianten. Het publiek zit in Nederland
en Europa, en de site gebruikte al Britse vormen voor woorden zonder
Amerikaanse tegenhanger in de tekst.

Let op bij `practice`: dat is het zelfstandig naamwoord ("15 minutes of
practice"), het werkwoord is `practise` ("participants practise"). Nooit blind
vervangen.

Controleer met:

```bash
grep -roiE "\b(program|programs|organiz\w*|recogniz\w*|center|behavior\w*|analyz\w*|color)\b" src/i18n/locales/en/ | sort | uniq -c
```

## Lettergroottes

`STYLING_GUIDELINES.md` is hierin leidend: body-tekst is minimaal `text-xl`, en
op de contactpagina staat alles op `text-lg`. **Formuliervelden en labels horen
even groot als de tekst ernaast.** Ze waren kleiner, omdat de shadcn-componenten
hun eigen `text-sm` meebrengen.

Let op bij `Input`: die zet `md:text-sm`, en die media query wint van een gewone
`text-lg`. Je moet er dus `md:text-lg` bij zetten, anders krimpt het veld op
desktop alsnog.

## Hoe de teksten klinken

**Nooit een kastlijntje (em dash).** Niet in teksten op de site, niet in
voorstellen, niet in commentaar. Gebruik een punt, een komma, of splits de zin.

**Schrijf zoals mensen praten.** Korte zinnen. Gewone woorden. Lees het hardop
terug: klinkt het als iets wat je tegen iemand zou zeggen, of als een folder?
Als het tweede, herschrijf het.

Wat je vermijdt: opsommingen van abstracte begrippen, jargon dat je moet
uitleggen, en zinnen die met "middels", "dienaangaande" of "in het kader van"
beginnen. Wat je wel doet: het onderwerp voorop, actieve zinnen, en cijfers
noemen in plaats van "aanzienlijk" of "significant".

## Zichtbare tekst gaat altijd eerst langs de gebruiker

Alles wat een bezoeker of Google te zien krijgt, dus koppen, lopende tekst,
knoplabels, meta titles en descriptions, alt-teksten en foutmeldingen, schrijf je
**nooit zelf definitief**. Kom met **meerdere opties per tekst**, laat de
gebruiker kiezen of zelf iets typen, en voer pas daarna door.

Dit geldt ook als de wijziging vanzelfsprekend lijkt of als jij hem "beter"
vindt. De gebruiker bepaalt de stem van de site.

Wat je wél zelf mag doen zonder te vragen: code, opmaak, bestandsformaten,
omleidingen, schema-structuur, en alles wat niet als tekst op het scherm of in
een zoekresultaat verschijnt.

## Blokken die op meerdere pagina's staan

Voordat je een blok aanpast: kijk waar het nog meer verschijnt, en **vraag de
gebruiker of de wijziging daar ook moet landen.** Nooit stilzwijgend aannemen.

| Blok | Tekst staat in | Verschijnt op |
|---|---|---|
| Menu-items | `common.json` `menuItems.*` | elke pagina, in de header |
| Hero, uitdagingen, resultaten, FAQ | `training.json` per propositiesleutel | alleen die ene pagina |
| Weken van het kernprogramma | `training.json` `<sleutel>.weeks` | per pagina eigen sleutel, maar teksten zijn deels letterlijk gedupliceerd |
| "Breintraining voor échte gedragsverandering" | `common.json` `programOverview.*` | 4 propositiepagina's **en de homepage** |
| "Probeer het zelf in onze masterclass" | `common.json` `masterclassSteps.*` | homepage, 3 propositiepagina's **en `/breintraining-methode`**. `/duurzame-inzetbaarheid` heeft een eigen variant in `training.json` `vitality.introSteps` |
| "Offerte aanvragen" | `common.json` `cta.requestQuote` | header en uitklapmenu op elke pagina, de zwevende balk overal behalve op de stress- en prestatiepagina, **en** de hero van home, `/duurzame-inzetbaarheid`, `/team-prestaties-verbeteren` en `/breintraining-methode` |

## De vier propositiepagina's

| Sleutel in `training.json` | NL-pad | EN-pad |
|---|---|---|
| `vitality` | `/duurzame-inzetbaarheid` | `/en/sustainable-employability` |
| `sustainability` | `/team-prestaties-verbeteren` | `/en/improve-team-performance` |
| `stress` | `/stressmanagement-training` | `/en/stress-management-training` |
| `performance` | `/prestatie-training` | `/en/performance-training` |

Let op: de sleutelnamen dekken de lading niet meer. `vitality` is de pagina voor
de publieke sector, `sustainability` die voor scale-ups.

### `vitality` is de publieke-sectorpagina

Sinds 20 oktober 2026 (branch `publieke-sector`) spreekt `/duurzame-inzetbaarheid`
onderwijs, overheid en zorg aan, op basis van "(C) Segmentanalyse Publieke sector
2026-10" in de Second Brain. De opbouw is die van de scale-up-pagina. In het menu
heet hij "Publieke sector" met als ondertitel "Duurzame inzetbaarheid"; in het
Engels "Public sector" en "Healthy and productive teams", want "sustainable
employability" is volgens Bas geen gangbaar Engels. De URL is bewust niet
veranderd: duurzame inzetbaarheid is de best gemeten term.

- **Verzuim wél, productiviteit niet.** Verzuim is hier de taal van de koper,
  dus de rekentool en de link "Wat kost verzuim jou?" blijven. Productiviteit
  noemde 0 van de 9 organisaties.
- **De lezer is de adviseur** vitaliteit, arbo of duurzame inzetbaarheid, die de
  pagina doorstuurt naar een manager en het MT. De kern: het aanbod is er, de
  deelname niet, en wij zorgen dat ook de drukste mensen meedoen.
- **Nooit** "je beleving veranderen", "je eigen effectiviteit" of "verplicht".
  Dat legt het probleem bij de medewerker, het grootste bezwaar van het MT bij
  het ROC. De belofte is handvatten, naast het werkdrukplan.
- **Vitaliteit als categoriewoord** in de kop, maar het product heet ook hier
  aandachttraining.
- **Eigen invulling via props** op `TrainingPageLayout`: `heroLogos` met
  publieke logo's uit de trainersrij op `/over-ons`, in kleur
  (`heroColourLogos`) en op een transparante achtergrond (Den Haag en de VU
  hebben daarvoor een `_transparant`-versie). `heroPhotoQuote` en
  `participantQuote` zijn allebei Jochems slaapquote: Bas koos bewust voor
  twee keer dezelfde. Wil je er één weghalen, `participantQuote={null}` kan.
  `masterclassTexts` wijst naar `vitality.introSteps`: een eigen blok over
  kennismaken, live of in eigen tijd, want een vast uur met het hele team was
  bij het ROC bijna een breekpunt. `afterResults` is de paarse `ResultatenBand`.
- **"tot 12 maanden na de training nog minder stress (Michaelsen, 2023)"** in
  de cijferband. Schrijf nooit "12 maanden later" of "een jaar later": de
  studies maten tussen drie maanden en een jaar. Het woordje "tot" staat als
  `prefix` voor het getal, omdat "tot 12 maanden" als waarde niet in de band
  past.
- **"20 tot 40% van wie de masterclass volgt, doet mee aan de training"** in de
  FAQ is een eigen cijfer van Bas (20 oktober 2026).

### `sustainability` is de scale-up-pagina

Sinds 19 oktober 2026 spreekt `/team-prestaties-verbeteren` scale-ups aan, op
basis van de segmentanalyse "(C) Segmentanalyse Scale-ups 2026-10" in de Second
Brain. In het menu heet hij "Scale-ups" en staat hij bovenaan, ook in de footer.
De URL is bewust niet veranderd.

- **Geen verzuim.** Het verzuimverhaal, de ROI-rekenmachine en de link "Wat kost
  verzuim jou?" staan niet op deze pagina. Scale-ups hebben geen verzuimcijfers.
  De lijn is: meer output door rust en focus.
- **Eigen invulling via props** op `TrainingPageLayout`: `heroLogos` (TheyDo,
  Holie Pizza, Tele2, Leaseplan, Sygnific), `heroSecondaryLink` naar de
  TheyDo-case, `participantQuote` (Jochems slaapquote, zodat zijn
  productiviteitsquote niet twee keer staat) en `afterResults` met de paarse
  `ResultatenBand` op de plek van de eerste fotobreak.
- **"25% minder fouten op aandachtstaken (Jha, 2021)"** in de cijferband en de
  FAQ is op 19 oktober 2026 door Bas bevestigd. Niet verwarren met "+24%
  volgehouden aandacht op de SART" (Jha et al., 2021; Morrison et al., 2014),
  dat is een ander cijfer.

## Oranje woorden in koppen

Een oranje accent schrijf je in de JSON als `<0>...</0>`, niet als HTML:

```json
"title": "Het <0>effect</0> van onze training"
```

## URL's hernoemen

Alles staat in `ROUTE_MAP` in `src/i18n/config.ts`. Daar hangen de routes, de
prerendering, de canonical en de hreflang aan. Verder nodig:

- 301 in `netlify.toml`, **boven** de SPA-catch-all
- route in `src/App.tsx`
- menu in `SimplifiedNavigation.tsx` en `Footer.tsx`
- interne links in de blogartikelen
- `public/sitemap.xml`

**Nooit een keten van omleidingen laten ontstaan.** Hernoem je een pad dat zelf
al het doel van een 301 is, laat de oudste URL dan direct naar het nieuwste pad
wijzen.

## Pushen kost geld, batch daarom

Netlify staat op het gratis creditmodel: **300 credits per maand, harde limiet,
ze rollen niet door en bijkopen kan niet.** Raakt de teller leeg, dan worden alle
projecten gepauzeerd en krijgen bezoekers een `Site not available`-pagina. De
site gaat dus echt offline tot de volgende maand.

Een **productie-deploy kost 15 credits**, ongeacht hoe lang de build duurt. Dat
zijn er dus maximaal twintig per maand. Gemeten op 24 augustus 2026 was 96,6%
van al het verbruik afkomstig van deploys; bandbreedte, webverzoeken en de
keep-alive-functie waren samen 5,2 credits. Bij dit verkeer zijn de deploys het
enige dat telt.

Daaruit volgen twee regels:

1. **Nooit pushen per losse wijziging.** Verzamel tot een blok af is en push dan
   één keer. Bouwtijd is gratis, dus prerenderen kost niets extra.
2. **Wil de gebruiker iets op Netlify zelf zien voordat het live gaat, push dan
   naar een aparte branch.** Branch-deploys en deploy previews kosten
   **0 credits**. Daarna één keer naar `main`.

Controleer het verbruik in het Netlify-dashboard onder Credit usage breakdown.

### Voorvertoningen blijven uit Google

Netlify zet zelf een `noindex` op deploy previews, maar **op branch-deploys
niet**. En daar stuurt regel 2 hierboven je juist naartoe. Zonder maatregel
staat er dan een volledige tweede kopie van de site op een `netlify.app`-adres,
met dezelfde teksten. Precies de dubbele content waar de rest van de site tegen
beschermd is.

Daarom draaien de contexten `branch-deploy` en `deploy-preview` in
`netlify.toml` een eigen buildcommando, `npm run build:noindex`. Dat is de
gewone build met `scripts/noindex.mjs` erachteraan, die twee sloten zet:
`robots.txt` op `Disallow: /` en een `_headers` met `X-Robots-Tag: noindex`.
Twee, want robots.txt houdt de crawler van de pagina af en de header houdt de
URL uit de index ook als iemand ernaar linkt.

**Verander je het buildcommando, verander het dan in alle drie de blokken.**
Staat de puppeteer-regel niet in de contextvariant, dan mist de branch-deploy
Chrome en faalt het prerenderen.

## Boeken van een gesprek loopt via Calendly

Vroeger opende elke "plan een gesprek met Bas"-knop een Google Calendar-link in
een nieuw venster. Dat is eruit. **Zoek nooit meer naar `calendar.app.google`,
die hoort er niet meer te zijn.**

Wat er wel staat:

- `src/components/CalendlyWidget.tsx` doet de inline widget. **Laad nooit
  `widget.js` van Calendly.** Dat script bouwt alleen een iframe-URL en luistert
  op berichten, en dat doet dit component zelf. Belangrijker: dat script zoekt
  maar één keer, bij het laden, naar widgets op de pagina. Bij navigeren binnen
  de app stond het er al, dus elke widget die daarna in beeld kwam bleef leeg.
- **De kleuren staan in de URL, niet in Calendly.** URL-parameters winnen van de
  instellingen in Calendly zelf, dus verander je ze daar, dan zie je niets
  gebeuren tot je ze hier ook aanpast.
- **Maak de kalender niet donker.** Geprobeerd en afgeserveerd: Calendly tekent
  beschikbare dagen als een half-doorzichtige cirkel van `primary_color`, en
  oranje op donker wordt daarin modderig paars. Precies de dagen die je moet
  aanklikken werden dan het slechtst zichtbaar. De kalender is dus licht, en het
  gewicht komt van het blauwe kader eromheen in de pagina.
- De iframe-URL is **een constante**, met `embed_domain` vast op `innerleaps.nl`.
  Maak daar nooit `window.location.hostname` van. Dan verschilt de URL per
  omgeving, staat er iets anders in de voorgebakken HTML dan React ervan maakt,
  en laadt het iframe twee keer. Calendly controleert dat domein niet.
- `src/lib/booking.ts` bepaalt het knopgedrag: staat de agenda binnen anderhalf
  scherm, dan scrollen naar het anker `#afspraak`, anders naar `/contact`. Die
  afstandsgrens is er met reden: op `/over-ons` staat de agenda ruim 4000 pixels
  naar beneden, en daar naartoe scrollen is slechter dan doorsturen.
- De widget staat op **twee** plekken: `/contact` (en `/en/contact`) en
  `/over-ons`. Bewust niet op alle pagina's, want het iframe kost ruim 1 MB.
  Op `/over-ons` staat hij diep op de pagina, dus daar met `eager={false}`.
- Zet de widget **nooit in een modal**. Een iframe dat bij openen en sluiten
  steeds opnieuw gemount wordt, telt conversies dubbel of mist ze.

### `/afspraak-plannen` bestaat niet meer

Die pagina had dezelfde h1 en boven de vouw dezelfde inhoud als `/contact`, en
dat is voor een zoekmachine een teken dat er één van de twee overbodig is. Hij
komt in `SEO-PLAN.md` nergens voor en zat niet bij de zeven ingediende URL's, dus
er ging geen organische waarde verloren.

`/contact` doet nu allebei, in deze volgorde: het afspraakblok, dan zelf contact
opnemen met het berichtformulier, dan de ROI-calculator. Van meest naar minst
waardevol. **Draai die volgorde niet om**: een ingepland gesprek is meer waard
dan een mailtje, en een mailtje meer dan een som.

Er staan 301's van `/afspraak-plannen`, `/en/book-a-call` en `/calendar` naar
`/contact`. Die laatste wees eerst naar `/afspraak-plannen`; hij is meteen
doorgezet zodat er geen keten ontstond.

### De onderdelen van het afspraakblok

| Component | Wat het doet |
|---|---|
| `BookingIntro.tsx` | Kop met de foto van Bas ernaast. Op mobiel staat zijn naam onder de foto. |
| `BookingStats.tsx` | De vier cijfers. `variant="row"` is één lage rij voor smalle schermen, `variant="panel"` het paneel voor naast de agenda. |
| `BookingTrust.tsx` | Google, VMBN en de klantquote van TheyDo. |
| `ClientLogoMarquee.tsx` | De lopende band met klantlogo's. **Let op:** gebruikt de donkere logo's uit `src/assets`, niet die uit `src/data/clientLogos.ts`. Dat zijn de lichte varianten voor de donkere hero, en die zijn op wit onzichtbaar. |
| `BookingBlock.tsx` | Cijfers, agenda en bewijs onder elkaar in één wit kader. Voor `/over-ons`. |

Op `/contact` staan die onderdelen bewust **niet** in `BookingBlock` maar in twee
kolommen: links de kop en de agenda, rechts de cijfers en het bewijs. Reden: alles
onder elkaar zette de agenda op 688 pixels, en op een laptop van 800 pixels hoog
zag je dan geen enkele datum. Naast elkaar kost het bewijs de agenda geen hoogte.

### Het berichtformulier

`ContactForm.tsx` staat onder de contactgegevens, met opzet. Het mag de agenda
niet beconcurreren. Het loopt via de Edge Function `submit-contact-message`, die
niets opslaat maar een mail stuurt naar `bas@innerleaps.nl` met het adres van de
afzender als antwoordadres.

De `calendarUrl`-velden in `MasterclassFormModal.tsx` zijn iets anders: dat zijn
"zet deze masterclass in je agenda"-links voor een bestaand evenement. Afblijven.

## Offerte aanvragen is de primaire knop

Sinds 15 oktober 2026 (branch `offerte-cta`) is "Offerte aanvragen" de primaire
actie van de site. Hij staat in de header, het uitklapmenu, de hero van de
homepage, van de twee propositiepagina's met foto en van
`/breintraining-methode`, en in de zwevende balk. Daar stond eerst "Vraag een
masterclass aan" (en op de methodepagina "Plan een adviesgesprek"), en die
leidden ook gewoon naar `/contact`. De masterclass houdt zijn knop in zijn
eigen blok.

Waarom: er bestaat geen onderzoek dat de twee knoppen op deals vergelijkt, maar
enquêtes onder kopers (TrustRadius, 6sense, Gartner) laten zien dat ze vroeg een
prijs willen weten en pas laat met een verkoper praten. GITP en Schouten &
Nelissen werken ook met een offerteknop, en een bevriende aanbieder in dezelfde
markt kreeg er meer deals mee. Ervoor waren er in vijf weken nul leads.

De stroom:

- `/offerte-aanvragen` en `/en/request-a-quote`: het formulier. Staat in
  `ROUTE_MAP` voor de taalknop en het prerenderen, maar met een noindex en dus
  **niet** in de sitemap.
- Het formulier vraagt precies wat Bas nodig heeft om een prijs te noemen:
  online of op locatie, aantal deelnemers, totaal aantal medewerkers. Plus
  naam, organisatie, e-mail en telefoon.
- Het verstuurt via `submit-contact-message`, met de offertegegevens in het
  bericht en OFFERTEAANVRAAG bovenaan. Met `soort: "offerte"` krijgt de mail
  de onderwerpregel "Innerleaps - offerte aanvraag (organisatie)", op verzoek
  van Bas. Daarvoor moet de nieuwe versie van die functie in Supabase staan;
  de oude negeert de twee extra velden en stuurt een gewone berichtmail.
- Daarna `/bedankt/offerte` en `/en/thank-you/quote`: de belofte "binnen één
  werkdag" en de agenda. **Bewust geen doorverwijzing naar `/contact`**: daar
  staat weer een formulier, en dan vraagt iemand zich af of zijn aanvraag
  aankwam.
- Bas belt binnen een werkdag en stelt een gesprek voor. Dat staat met opzet
  niet op de site.

De knop verschijnt niet op het formulier en de bedanktpagina zelf
(`isOffertePagina` in `src/lib/offerte.ts`). In de header alleen waar hij past:
tussen 640 en 1024 pixels en vanaf 1200. Daartussen staat het volledige menu
en is er geen ruimte. Sinds 16 oktober 2026 staat de knop links van de
taalkeuze, en is de taalkeuze in de header een compacte keuzelijst (wereldbol,
"NL", taalnamen zonder vlag). Dat scheelde genoeg ruimte om de knop van 1280
naar 1200 pixels te halen. In de footer, de cookiebanner en het uitklapmenu
staat nog de oude NL | EN.

Meten: `quote_cta_click` met de plek als parameter, en `quote_request_sent`
vanaf de bedanktpagina. Het label `offerte` in `conversielabels.ts` is leeg tot
de conversieactie "Offerteaanvraag" in Google Ads bestaat.

**Lokaal testen verstuurt een echte mail.** De Supabase-client pakt `fetch` op
bij het opstarten, dus een nep-`fetch` in de browser vangt de verzending niet
af. Test het formulier dus niet met verzinsels, of zeg Bas vooraf dat er een
testmail aankomt.

## Meten: er staat geen Google Tag Manager

Gemeten op 24 augustus 2026: op de live site staat **geen GTM en geen gtag**.
Het enige externe script is de Apollo-tracker. Toch staan er al aanroepen van
`window.gtag` in `MasterclassFormModal.tsx`, `Bedankt.tsx` en
`MasterclassQR.tsx`. Die doen dus niets.

Zolang die container ontbreekt wordt er geen enkele conversie geregistreerd.
Meld dat als iemand over conversiemeting begint.

De site is er wel op voorbereid. Er gaan twee gebeurtenissen naar de dataLayer:

```js
{ event: "calendly_event_scheduled", calendly: <payload> }   // afgeronde boeking
{ event: "contact_message_sent" }                            // berichtformulier
```

Zodra GTM er staat zijn er alleen nog Custom Event triggers op die twee nodig.
Geen code meer. Voor telefoon en e-mail is ook niets nodig: die staan op
`/contact` als `tel:`- en `mailto:`-links, dus een klik erop is een gewone
gebeurtenis. Ze stonden daar lang als platte tekst, waardoor je op een telefoon
het nummer moest overtypen om te kunnen bellen.

## Een route toevoegen

Zet je een route in `App.tsx`, kies dan bewust:

- **Openbare pagina die moet ranken?** Ook in `ROUTE_MAP` in
  `src/i18n/config.ts`. Dan komt hij automatisch in de prerendering, de
  canonical, de hreflang, en hoort hij ook in `public/sitemap.xml`.
- **Niet in ROUTE_MAP?** Dan wordt hij niet geprerenderd, en moet hij
  **expliciet** in `netlify.toml` als `status = 200`-regel. Anders valt hij
  onder de 404-catch-all en is hij vanaf de volgende deploy onbereikbaar.

## De klantcase TheyDo

Staat op `/klantcases/theydo` en `/en/case-studies/theydo`, met de teksten in
`caseTheydo.json`. Elke tekst is in oktober 2026 stap voor stap met de gebruiker
gekozen. Waarom welke keuze, en welke feiten nog openstaan, staat in
`docs/case-theydo.md`. Lees dat voordat je hier iets aanpast.

- **De quotes zijn letterlijk.** Jochem en Heidi hebben dit gezegd, alleen
  ingekort. Niet herschrijven, ook niet "een beetje". Beiden keuren de pagina
  goed voor hij live gaat.
- **Tekst tussen [vierkante haken] is een plaatshouder.** Die hoort er voor
  livegang uit.
- **Geen prijs en geen salaris van TheyDo noemen.** De 0,36% is bewust als
  cijfer van TheyDo gebracht, met de rekentool erachter.
- In het menu staat de case als losse link. Komen er meer, dan wordt het een
  overzichtspagina op `/klantcases`; het pad is daarom al meervoud. Het menu
  was daarna te breed op 1024 en 1280 pixels, dus het logo is tussen `lg` en
  `2xl` een maat kleiner.
- De video komt later, als YouTube-link per taal. Knipplan:
  `docs/case-theydo-video.md`.

## Achtergronddocumenten

Deze leest een nieuwe sessie niet vanzelf, dus open ze als het onderwerp langskomt:

- `MIGRATIE-PLAN.md`: de verhuizing van Lovable-hosting naar Netlify, in stappen,
  inclusief wat er misging bij het prerenderen en de keep-alive van Supabase.
- `SEO-PLAN.md`: de diagnose van augustus 2026 en de meetlat. Kern: tot 21
  augustus kregen crawlers zonder JavaScript nul woorden, de klikken zakten in
  90 dagen van 64 naar 23, en er stonden nul vertoningen op de doeltermen.
- `docs/translation-glossary.md`: vaste vertalingen.

## Zoekwoorden staan in docs/seo-geo/

**Elk werk aan online vindbaarheid begint in `docs/seo-geo/`.** Dus voordat je
`/seo`, `/seo-geo`, `/seo-plan`, `/seo-cluster`, `/seo-content-brief`,
`/seo-dataforseo` of een andere seo-skill inzet, en voordat je zelf volumes
opzoekt of schat. Die map is de enige plek waar zoekwoorddata van deze site
staat.

- `docs/seo-geo/README.md`: de spelregels.
- `docs/seo-geo/zoekwoorden-nl.md`: de gemeten Nederlandse termen met volumes,
  CPC's en maandreeksen, plus de termen die bewust niet gemeten of verboden zijn.
- `docs/seo-geo/zoekwoorden.json`: dezelfde data machineleesbaar.

Drie regels die daarbij horen:

1. **Niet opnieuw gaan meten wat er al staat.** Dat kost DataForSEO-credits en
   levert afwijkende getallen op, waarna er twee waarheden zijn.
2. **Geen volumes verzinnen.** Staat een term niet in de tabel, dan schrijf je
   "niet gemeten", geen schatting.
3. **Nieuwe metingen schrijf je terug in die map**, met datum en bron, in beide
   bestanden tegelijk. Anders is de meting de volgende sessie weg.

De verboden woorden uit `zoekwoorden-nl.md` (mindfulness, meditatie, wellness,
self-care, spiritual, therapie, ontspanningscursus, quick fix) zijn ook geen
kandidaat-zoekwoorden als een tool ze met hoog volume aandraagt.

## Search Console

Toegang loopt via OAuth, niet via een service account. Google Workspace
blokkeert het aanmaken van service-accountsleutels met de organisatieregel
`iam.disableServiceAccountKeyCreation`.

- Config: `~/.config/claude-seo/google-api.json`, property `sc-domain:innerleaps.nl`
- Uitlezen: `CLAUDE_SEO_PYTHON=/opt/homebrew/bin/python3.12 "$HOME/.claude/skills/seo/bin/claude-seo" run gsc_query.py ...`
- **Sitemap indienen kan de skill niet.** Daarvoor is
  `scripts/submit-sitemap.py`. Draaien met python3.12.
- Indexering aanvragen kan alleen de gebruiker, via de knop in de interface.
  Die zit niet in de API.

### Na elke deploy die URL's raakt

**Herinner de gebruiker hier actief aan.** Hij kan het alleen zelf doen, en het
wordt makkelijk vergeten omdat de site er live gewoon goed uitziet.

De volgorde is belangrijk. Google leest de sitemap en de pagina op het moment
dat je het vraagt, dus alles moet al live staan:

1. **Eerst pushen en de deploy laten aflopen.** Dien je de sitemap eerder in,
   dan krijgt Google de oude te zien en heb je het voor niets gedaan.
2. **Sitemap opnieuw indienen** als er URL's bij zijn gekomen of verdwenen, met
   `scripts/submit-sitemap.py` (python3.12).
3. **Indexering aanvragen** in Search Console via URL-inspectie, voor elke pagina
   die nieuw is of waarvan de inhoud wezenlijk veranderd is. Beide talen.

Wat je **niet** doet: indexering aanvragen voor een URL die je zojuist met een
301 hebt weggestuurd. Die verdwijnt vanzelf uit de index zodra Google de
omleiding tegenkomt. Wil je het versnellen, inspecteer hem dan wel even, zodat
Google de 301 ziet, maar vraag geen indexering aan.

Let op: het aantal indexeringsverzoeken per dag is beperkt, dus kies de pagina's
die er echt toe doen in plaats van alles aan te vragen.

## Afbeeldingen staan in WebP

De site woog veel te veel aan beeld: 19,1 MB aan bronbestanden, met losse
plaatjes van boven de 2 MB. Alles staat nu in WebP, samen 3,1 MB. Zelfde
afmetingen, zelfde bestandsnamen op de extensie na.

**Nieuwe afbeelding erbij? Zet hem om voordat je hem gebruikt:**

```bash
python3.12 scripts/afbeeldingen-naar-webp.py
```

Het script pakt `src/assets`, `public/lovable-uploads`, `public/team` en
`public/klantervaringen`, en werkt de verwijzingen in de code meteen bij. Het
heeft Pillow nodig (`python3.12 -m pip install --user pillow`) en draait nooit
tijdens de Netlify-build, zodat de productie-build geen extra afhankelijkheid
krijgt en er dus ook niets aan stuk kan.

Vier dingen om te weten:

- **Foto's gaan op kwaliteit 82, logo's op 94.** Logo's staan op wit met
  scherpe randen, en daar valt compressie op als vuil rond de letters. Op 82
  zakte het TheyDo-logo naar PSNR 35, op 94 zit de hele set op 44 tot 46.
  Volledig lossless is geen optie: die logo's staan op een groot doek met
  zachte randen, en dan wordt één bestand 1,8 MB.
- **`public/social/` en `public/og-image.png` blijven PNG.** Dat zijn de
  voorbeeldjes die LinkedIn en WhatsApp tonen bij een gedeelde link, en die
  gaan wisselend om met WebP. Een kapot deelvoorbeeld kost meer dan die
  kilobytes opleveren.
- **Het script eindigt met een sluitcontrole** en stopt met een foutcode als de
  code naar een afbeelding wijst die niet bestaat. Die zit er niet voor niets:
  bij het omzetten werd een logo overgeslagen terwijl de verwijzing al op
  `.webp` stond, en dan staat er een gat op de pagina dat je pas ziet als
  iemand hem opent.
- **Het script pakt ook de bewuste JPG's in `src/assets`.** Naast
  `hero-1200w.webp` staat met opzet een `hero-1200w.jpg` als terugvaller
  (net als bij `masterclass`, `method-mechanism`, `systems-*` en
  `training-presentatie`). Het script zet die om, gooit de JPG weg en past de
  verwijzingen aan. Draai je het, zet dan met `git checkout` alles terug wat
  niet van jou is, en controleer met `git status` dat alleen je eigen nieuwe
  afbeeldingen overblijven. Gebeurd op 15 oktober 2026.

## Er ligt een SEO-basismeting, gebruik die

Op 28 augustus 2026 is van 16 pagina's een momentopname vastgelegd: de acht
Nederlandse kernpagina's en hun acht Engelse tegenhangers. Dat is de meting ná
de WebP-deploy, dus die is de nieuwe nullijn. Vastgelegd zijn
title, meta description, canonical, robots, alle koppen, de JSON-LD-schema's,
de Open Graph-tags en de HTTP-status. Ze staan in
`~/.cache/claude-seo/drift/baselines.db`.

Waar dat voor is: de site wordt met AI aangepast, en dan is de stille fout het
gevaarlijkst. Een schema dat wegvalt of een canonical die verschuift zie je
live niet, en in Search Console pas weken later.

**Na een deploy die pagina's inhoudelijk raakt, draai je de vergelijking:**

```bash
CLAUDE_SEO_PYTHON=/opt/homebrew/bin/python3.12 "$HOME/.claude/skills/seo/bin/claude-seo" run drift_compare.py https://innerleaps.nl/contact
```

Vindt hij iets, dan zegt hij er de ernst bij. Klopt de wijziging en is hij
bedoeld, leg dan een nieuwe basismeting vast met `drift_baseline.py`, anders
blijft hij bij elke volgende vergelijking opnieuw klagen.

Let op: Core Web Vitals staan niet in deze meting. Daar is een PageSpeed-sleutel
voor nodig en die is er niet.

## Werken gaat via een branch, niet rechtstreeks op main

Bouw je iets, doe dat op een eigen branch. Push die, bekijk de branch-deploy op
Netlify, en ga pas naar `main` als het klopt.

Dat kost niets extra: branch-deploys zijn gratis en alleen de productie-deploy
kost 15 credits. Je betaalt dus evenveel als bij rechtstreeks naar `main`
pushen, maar je ziet het eerst. En sinds de vorige sectie blijven die
voorvertoningen ook netjes uit Google.

## Praktisch

- `python3` is hier 3.9, de seo-skill eist 3.10+. Zet er
  `CLAUDE_SEO_PYTHON=/opt/homebrew/bin/python3.12` voor.
- Search Console staat ingesteld op property `sc-domain:innerleaps.nl`.
- De lokale site draait met `npm run dev` op poort 8080.
- `npm run build` prerendert alle pagina's (42 op 15 oktober 2026) en faalt
  hard bij een lege pagina.
