import type { JuridischePagina } from "./juridisch";

/** Privacyverklaring, Nederlands. De Engelse tekst staat in privacy-en.ts en
 *  moet bij elke wijziging mee. */
export const privacyNl: JuridischePagina = {
  titel: "Privacyverklaring",
  ondertitel: "**Innerleaps**, versie 2.0 | 11 september 2026",
  metaTitel: "Privacyverklaring | Innerleaps",
  metaBeschrijving:
    "Privacyverklaring van Innerleaps. Hoe we omgaan met persoonsgegevens van bezoekers van de website en van deelnemers aan onze trainingen.",
  secties: [
    {
      kop: "Wie zijn wij?",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Innerleaps is een trainingsbureau gespecialiseerd in breintraining voor professionals. We geven trainingen bij bedrijven, verzorgd door gekwalificeerde trainers.",
        },
      ],
    },
    {
      kop: "Een bezoek aan innerleaps.nl",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Dit deel gaat over iedereen die onze website bezoekt. De rest van deze verklaring gaat over deelnemers aan een training, en daar bepaalt je werkgever wat er met je gegevens gebeurt. Voor de website ligt dat anders: daar bepaalt Innerleaps het, en is Innerleaps dus de verwerkingsverantwoordelijke.",
        },
      ],
    },
    {
      kop: "Cookies en jouw keuze",
      niveau: 3,
      blokken: [
        {
          soort: "tekst",
          tekst:
            "We plaatsen geen analytische of advertentiecookies voordat jij akkoord geeft. Bij je eerste bezoek vraagt een venster je om te kiezen, en zolang je niets gekozen hebt staan de meetinstrumenten uit en bewaren ze niets op je apparaat.",
        },
        {
          soort: "tekst",
          tekst:
            "Twee dingen worden hoe dan ook bewaard, omdat de site zonder die twee niet werkt: je taalkeuze en je cookiekeuze zelf. Die blijven in je eigen browser, wij zien ze nooit, en ze worden niet gebruikt om je te volgen.",
        },
        {
          soort: "tekst",
          tekst:
            "Je mag altijd van gedachten veranderen. Onderaan elke pagina staat een link **Cookievoorkeuren**. Die opent hetzelfde venster, en zet je iets uit, dan stopt het meteen. In onze [cookieverklaring](/cookies) staan alle categorieën op een rij.",
        },
      ],
    },
    {
      kop: "Wat we meten zodra je akkoord geeft",
      niveau: 3,
      blokken: [
        {
          soort: "lijst",
          items: [
            "**Google Analytics 4:** welke pagina's bezocht worden, hoe mensen door de site lopen en waar ze afhaken. Daarmee verbeteren we de site.",
            "**Google Ads:** of een advertentie je hierheen bracht en wat je daarna deed, zodat we niet blijven betalen voor advertenties die niets opleveren.",
            "**Apollo:** herkent van welke organisatie een bezoek waarschijnlijk komt, op basis van je netwerkadres. Dat is voor onze eigen opvolging, en het draait alleen als je advertentiecookies accepteert.",
          ],
        },
        {
          soort: "tekst",
          tekst:
            "Vul je een van onze formulieren in en heb je advertentiecookies geaccepteerd, dan gaat je e-mailadres ook naar Google, zodat Google je aanvraag kan koppelen aan de advertentie waarop je klikte. Het wordt eerst onleesbaar gemaakt, op je eigen apparaat, met een onomkeerbare berekening die SHA-256 heet. Google krijgt die onleesbare versie en nooit het adres zelf.",
        },
        {
          soort: "tekst",
          tekst:
            "**Grondslag:** jouw toestemming (artikel 6 lid 1 sub a AVG) voor alles in dit lijstje. Voor de taalkeuze en de cookiekeuze in je browser: ons gerechtvaardigd belang bij een werkende site (artikel 6 lid 1 sub f AVG).",
        },
      ],
    },
    {
      kop: "Formulieren op de website",
      niveau: 3,
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Op vier plekken kun je je gegevens achterlaten. Elke plek is vrijwillig, en je ziet vooraf wat we vragen.",
        },
        {
          soort: "lijst",
          items: [
            "**De rekentool:** je naam, zakelijke e-mailadres, bedrijfsnaam en de cijfers die je invult over verzuim, personeelsomvang en gemiddeld salaris. We mailen je de uitkomst en bewaren je invoer, zodat we contact met je kunnen opnemen.",
            "**Het wetenschappelijk rapport:** je naam, zakelijke e-mailadres en bedrijfsnaam. We mailen je het rapport en bewaren je aanvraag.",
            "**Het contactformulier:** je naam, e-mailadres en bericht. Dat wordt naar ons gemaild en er wordt niets in een database opgeslagen.",
            "**Een gesprek inplannen:** dat loopt via Calendly. Je geeft je naam, e-mailadres en een tijdstip door. Op die afspraak is de privacyverklaring van Calendly van toepassing.",
          ],
        },
        {
          soort: "tekst",
          tekst:
            "**Doel:** je antwoord geven, sturen wat je gevraagd hebt, en opvolgen waar je interesse in hebt. We verkopen je gegevens niet en we geven ze aan niemand buiten de leveranciers hieronder.",
        },
        { soort: "tekst", tekst: "**Grondslag:** jouw toestemming (artikel 6 lid 1 sub a AVG)." },
        {
          soort: "tekst",
          tekst:
            "**Hoe lang:** zolang we nog contact hebben over je vraag. Vraag je ons om het te verwijderen, dan doen we dat, op elk moment, via **privacy@innerleaps.nl**.",
        },
      ],
    },
    {
      kop: "Leveranciers achter de website",
      niveau: 3,
      blokken: [
        {
          soort: "lijst",
          items: [
            "**Netlify:** host de website. Zoals elke webserver bewaart die kortstondig technische logbestanden, inclusief netwerkadressen, om pagina's te serveren en misbruik te blokkeren.",
            "**Supabase:** draait de database en de code achter de formulieren.",
            "**Resend:** verstuurt de e-mails die die formulieren in gang zetten.",
            "**Google (Analytics en Ads):** meten, alleen na jouw akkoord.",
            "**Apollo:** organisatieherkenning, alleen na akkoord op advertentiecookies.",
            "**Calendly:** de agenda op onze contactpagina.",
          ],
        },
        {
          soort: "tekst",
          tekst:
            "Een deel daarvan zit in de Verenigde Staten. Waar gegevens daar terechtkomen, steunt die doorgifte op het EU-VS Data Privacy Framework en op standaardcontractbepalingen, dezelfde waarborgen als verderop bij internationale doorgifte.",
        },
      ],
    },
    {
      kop: "Wie is verantwoordelijk voor je gegevens?",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Je werkgever is de verwerkingsverantwoordelijke voor de persoonsgegevens die in het kader van de Innerleaps-training verzameld worden. Je werkgever heeft besloten dit programma aan medewerkers aan te bieden en Innerleaps ingeschakeld om het te geven.",
        },
        {
          soort: "tekst",
          tekst:
            "Innerleaps is de verwerker en verwerkt je persoonsgegevens namens je werkgever, op basis van een verwerkersovereenkomst.",
        },
        {
          soort: "tekst",
          tekst: "Heb je vragen over je privacy of wil je je rechten uitoefenen, neem dan contact op met:",
        },
        {
          soort: "lijst",
          items: ["Je werkgever (de HR-afdeling), of", "Innerleaps: **privacy@innerleaps.nl**"],
        },
        {
          soort: "kader",
          regels: [
            "Contactgegevens Innerleaps:",
            "Innerleaps",
            "Bas ter Haar Romenij",
            "Koningin Wilhelminaplein 454",
            "1062KS Amsterdam",
            "KvK: 98136925",
            "Btw: NL005312293B57",
            "E-mail: privacy@innerleaps.nl",
          ],
        },
      ],
    },
    {
      kop: "Hoe doe je mee?",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Afhankelijk van wat je werkgever heeft geregeld, meld je je aan voor het programma via een aanmeldformulier van Innerleaps, of geeft je werkgever de e-mailadressen van deelnemende medewerkers door aan Innerleaps, zodat Innerleaps deelnemers kan indelen en programmamateriaal kan versturen. In beide gevallen word je op deze privacyverklaring gewezen en accepteer je, voordat je meedoet, een korte verklaring van vrijwillige deelname. Die verklaring bevestigt alleen dat je vrijwillig en op eigen verantwoordelijkheid deelneemt; er staat geen gezondheidsinformatie in.",
        },
      ],
    },
    {
      kop: "Welke persoonsgegevens verwerken we, en waarom?",
      blokken: [
        { soort: "tekst", tekst: "We verwerken persoonsgegevens uitsluitend voor de volgende doelen:" },
      ],
    },
    {
      kop: "1. Aanmelding en programma-administratie",
      niveau: 3,
      blokken: [
        { soort: "tekst", tekst: "Doe je mee aan het programma, dan verwerken we:" },
        {
          soort: "lijst",
          items: [
            "Naam",
            "Zakelijk e-mailadres",
            "Je opgegeven trainingsdoel (de uitdaging of het doel waar je mee aan de slag wilt, gekozen uit een vaste lijst, met een optioneel vrij invulveld waarin we je vragen geen gevoelige informatie in te vullen)",
          ],
        },
        {
          soort: "tekst",
          tekst:
            "**Doel:** je aanmelden voor het programma, deelnemers indelen, je programmamateriaal en communicatie sturen, en je trainer in staat stellen de training af te stemmen op wat de groep nodig heeft. Je individuele trainingsdoel gebruiken we alleen om de training te geven en af te stemmen. Innerleaps kan geanonimiseerde, samengevoegde inzichten uit deze doelen gebruiken (bijvoorbeeld de meest voorkomende redenen om mee te doen) voor het verbeteren van onze eigen dienstverlening en voor marketing; zulke samengevoegde inzichten herleiden niet tot jou.",
        },
        {
          soort: "tekst",
          tekst:
            "**Grondslag:** toestemming (artikel 6 lid 1 sub a AVG) als je je via een formulier van Innerleaps aanmeldt; geeft je werkgever je gegevens door, dan gebeurt dat in opdracht van je werkgever en informeert je werkgever je vooraf.",
        },
      ],
    },
    {
      kop: "2. Effectmeting",
      niveau: 3,
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Via de vragenlijsten voor de effectmeting (voor de start van de training, T0, en na afloop, T1) vragen we:",
        },
        {
          soort: "lijst",
          items: [
            "Naam en zakelijk e-mailadres",
            "Informatie over je werkprestaties, waaronder verwachte en werkelijke werkuren en dagen afwezig door een fysiek of psychisch gezondheidsprobleem",
            "Levenstevredenheid, en (als je werkgever deze optionele vragen heeft geselecteerd) werkplezier en vertrekintentie",
            "Welzijnsmaten: vitaliteit, veerkracht en stress",
            "Hoe vaak je oefent en wat je daarbij tegenhoudt",
          ],
        },
        {
          soort: "tekst",
          tekst:
            "**Doel:** meten wat de training doet met je welzijn, productiviteit en werkprestaties, en je resultaten van voor en na de training vergelijken.",
        },
        {
          soort: "tekst",
          tekst:
            "**Let op:** een deel van deze informatie gaat over je gezondheid en welzijn (zoals stress, vitaliteit, veerkracht en gezondheidsgerelateerd verzuim) en zijn bijzondere persoonsgegevens in de zin van de AVG. We gaan er extra zorgvuldig mee om en gebruiken ze alleen voor het doel hierboven.",
        },
        {
          soort: "tekst",
          tekst:
            "**Grondslag:** toestemming (artikel 6 lid 1 sub a AVG) en, voor de gezondheidsgerelateerde gegevens, je uitdrukkelijke toestemming (artikel 9 lid 2 sub a AVG), beide gegeven via de toestemmingsverklaring op de vragenlijst.",
        },
        {
          soort: "tekst",
          tekst:
            "**Belangrijk:** je eigen antwoorden gaan nooit naar je werkgever. De directie krijgt alleen geanonimiseerde, samengevoegde uitkomsten, en alleen als de trainingsgroep uit minimaal 8 personen bestaat. We vragen je niet naar je salaris; wordt er een ROI-cijfer gerapporteerd, dan wordt dat berekend met een salarisgemiddelde dat je werkgever aanlevert, en dat gemiddelde staat in geen enkel rapport voor de directie.",
        },
      ],
    },
    {
      kop: "3. Evaluatie van de training",
      niveau: 3,
      blokken: [
        { soort: "tekst", tekst: "Via het evaluatieformulier vragen we beoordelingen van de trainer en open feedback over het programma." },
        { soort: "tekst", tekst: "Het evaluatieformulier vraagt niet om je naam of e-mailadres." },
        { soort: "tekst", tekst: "**Doel:** de training evalueren en verbeteren." },
        {
          soort: "tekst",
          tekst:
            "**Grondslag:** gerechtvaardigd belang (artikel 6 lid 1 sub f AVG). Je eigen antwoorden ziet alleen Innerleaps; ze gaan nooit naar de trainers of derden. De opdrachtgever krijgt alleen gemiddelde scores.",
        },
        {
          soort: "tekst",
          tekst:
            "**Let op:** geanonimiseerde en samengevoegde inzichten uit evaluaties kunnen we gebruiken voor marketing.",
        },
      ],
    },
    {
      kop: "Deelname is vrijwillig",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Meedoen aan de Innerleaps-training is volledig vrijwillig. Je werkgever biedt het programma aan, maar jij beslist of je meedoet. Je kunt je toestemming altijd intrekken, zonder gevolgen voor je arbeidsrelatie. De training is een programma voor professionele ontwikkeling en welzijn en geen vorm van zorg. Heb je gezondheidsklachten die deelname onverstandig zouden kunnen maken, raadpleeg dan eerst je huisarts.",
        },
      ],
    },
    {
      kop: "Optionele oefentool (Oefenbuddy)",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Tijdens het programma, meestal in de eerste workshop, kun je de optie krijgen om Oefenbuddy te gebruiken: een vrijwillige oefenherinnering via een berichten-app (WhatsApp of Signal), die je helpt gemotiveerd te blijven om de oefeningen te doen. Gebruiken is volledig je eigen keuze. Je meldt je rechtstreeks aan bij Oefenbuddy, dat als zelfstandige aanbieder werkt onder zijn eigen voorwaarden en privacybeleid. Innerleaps deelt geen van je gegevens met Oefenbuddy en krijgt ook niets terug. Oefenbuddy vraagt niet om identificerende informatie zoals je naam en kan je gebruik van de tool niet koppelen aan jou als Innerleaps-deelnemer.",
        },
      ],
    },
    {
      kop: "Hoe lang bewaren we je gegevens?",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "We bewaren je persoonsgegevens niet langer dan nodig. Zodra we het samengevoegde impactrapport voor je werkgever hebben gemaakt en je je eigen rapport hebben gestuurd, hebben we je onderliggende persoonsgegevens niet meer nodig en verwijderen we ze. Sowieso worden alle persoonsgegevens uiterlijk verwijderd bij het einde van de overeenkomst tussen Innerleaps en je werkgever (maximaal 12 maanden). Alleen geanonimiseerde totalen, waaruit jij niet herleidbaar bent, bewaren we langer. Je werkgever krijgt nooit persoonsgegevens, alleen geanonimiseerde uitkomsten.",
        },
      ],
    },
    {
      kop: "Wie heeft toegang tot je gegevens?",
      blokken: [],
    },
    {
      kop: "Innerleaps zelf",
      niveau: 3,
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Alleen Bas ter Haar Romenij (eigenaar) heeft toegang tot de volledige gegevens. Zelfstandige trainers die Innerleaps inschakelt krijgen alleen wat strikt nodig is om hun sessies te geven: je naam, zakelijke e-mailadres en je opgegeven trainingsdoel. Dat delen we op basis van dataminimalisatie (artikel 5 lid 1 sub c AVG), en het wordt alleen gebruikt om deelnemers te bereiken over de sessie en om de training af te stemmen. Trainers krijgen je antwoorden op de vragenlijsten of gezondheidsgerelateerde gegevens niet te zien. Alle trainers zijn contractueel gebonden aan geheimhouding en gegevensbescherming voordat ze een sessie mogen geven.",
        },
      ],
    },
    {
      kop: "Je werkgever",
      niveau: 3,
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Je werkgever krijgt alleen geanonimiseerde, samengevoegde uitkomsten. Individuele gegevens gaan nooit naar je werkgever. We vragen je niet naar je salaris; de ROI wordt berekend met een gemiddelde dat je werkgever aanlevert, en dat gemiddelde staat in geen enkel rapport voor de directie.",
        },
      ],
    },
    {
      kop: "Subverwerkers",
      niveau: 3,
      blokken: [
        {
          soort: "tekst",
          tekst:
            "We gebruiken Google (Google Workspace en Google Cloud) om gegevens te verzamelen, te bewaren en te verwerken via Google Forms, Google Sheets, Google Slides, Google Drive, Gmail en Google Agenda, en om onze rapportautomatisering te draaien. We hebben de Google-dataregio op Europa gezet, zodat gegevens die daaronder vallen binnen de Europese Unie liggen opgeslagen. Google is een wereldwijde leverancier, en voor support en bepaalde achtergrondverwerking kan een beperkt deel van de gegevensverwerking buiten de Europese Economische Ruimte plaatsvinden; gebeurt dat, dan valt het onder standaardcontractbepalingen en de certificering van Google onder het EU-VS Data Privacy Framework.",
        },
        {
          soort: "tekst",
          tekst:
            "De leveranciers achter de website staan hierboven, bij Een bezoek aan innerleaps.nl. Alle subverwerkers zijn gebonden aan een verwerkersovereenkomst met Innerleaps.",
        },
      ],
    },
    {
      kop: "Internationale doorgifte",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Innerleaps bewaart persoonsgegevens binnen de Europese Unie. Worden persoonsgegevens buiten de Europese Economische Ruimte doorgegeven, dan zorgt Innerleaps voor passende waarborgen, waaronder standaardcontractbepalingen en adequaatheidsbesluiten, volgens hoofdstuk V van de AVG.",
        },
      ],
    },
    {
      kop: "Je rechten",
      blokken: [
        { soort: "tekst", tekst: "Op grond van de AVG heb je de volgende rechten:" },
        {
          soort: "lijst",
          items: [
            "**Recht op inzage** (artikel 15): je kunt opvragen welke gegevens we van je verwerken.",
            "**Recht op rectificatie** (artikel 16): je kunt onjuiste gegevens laten corrigeren.",
            "**Recht op verwijdering** (artikel 17): je kunt je gegevens laten wissen.",
            "**Recht op beperking** (artikel 18): je kunt vragen de verwerking te beperken.",
            "**Recht op overdraagbaarheid** (artikel 20): je kunt je gegevens in een gestructureerd formaat opvragen.",
            "**Recht van bezwaar** (artikel 21): je kunt bezwaar maken tegen verwerking op grond van gerechtvaardigd belang.",
            "**Recht om toestemming in te trekken**: je kunt je toestemming altijd intrekken, zonder opgaaf van reden, ook je uitdrukkelijke toestemming voor het verwerken van gezondheidsgerelateerde gegevens. Intrekken werkt niet met terugwerkende kracht, maar kan wel gevolgen hebben voor je deelname aan het programma.",
          ],
        },
        {
          soort: "tekst",
          tekst:
            "Een verzoek indienen doe je via de HR-afdeling van je werkgever of rechtstreeks bij Innerleaps, op **privacy@innerleaps.nl**. We reageren binnen 30 dagen.",
        },
        {
          soort: "tekst",
          tekst:
            "Je hebt ook het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens, via autoriteitpersoonsgegevens.nl, of bij de toezichthouder in het land waar je woont.",
        },
      ],
    },
    {
      kop: "Beveiliging",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Innerleaps neemt passende technische en organisatorische maatregelen om je persoonsgegevens te beschermen tegen ongeautoriseerde toegang, verlies of misbruik. Gegevens staan uitsluitend in beveiligde cloudomgevingen met de dataregio op Europa, beschermd met tweefactorauthenticatie en versleuteling. Toegang is beperkt tot mensen die het nodig hebben om het programma te geven.",
        },
      ],
    },
    {
      kop: "Wijzigingen in deze verklaring",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Innerleaps mag deze privacyverklaring aanpassen. De actuele versie staat altijd op innerleaps.nl, via de footer van de website. We raden je aan hem af en toe door te lezen.",
        },
      ],
    },
    {
      kop: "Contact",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Heb je vragen over deze privacyverklaring of over de verwerking van je persoonsgegevens, neem dan contact op:",
        },
        {
          soort: "kader",
          regels: [
            "privacy@innerleaps.nl",
            "Innerleaps, Koningin Wilhelminaplein 454, 1062KS Amsterdam",
          ],
        },
      ],
    },
  ],
  voettekst: ["Documentversie: 2.0", "Datum: 11 september 2026", "Opgesteld door: Innerleaps", "Status: gepubliceerd"],
};
