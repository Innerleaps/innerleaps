import type { JuridischePagina } from "./juridisch";

/** Privacyverklaring, Nederlands. De Engelse tekst staat in privacy-en.ts en
 *  moet bij elke wijziging mee. */
export const privacyNl: JuridischePagina = {
  titel: "Privacyverklaring",
  ondertitel: "**Innerleaps**, versie 1.7 | september 2026",
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
      kop: "Welke persoonsgegevens verwerken we, en waarom?",
      blokken: [
        { soort: "tekst", tekst: "We verwerken persoonsgegevens uitsluitend voor de volgende doelen:" },
      ],
    },
    {
      kop: "1. Aanmelding en werving",
      niveau: 3,
      blokken: [
        {
          soort: "tekst",
          tekst: "Geef je via het aanmeldformulier aan dat je belangstelling hebt, dan vragen we:",
        },
        { soort: "lijst", items: ["Naam", "E-mailadres"] },
        { soort: "tekst", tekst: "**Doel:** opvolgen van je interesse in het programma." },
        { soort: "tekst", tekst: "**Grondslag:** toestemming (artikel 6 lid 1 sub a AVG)." },
      ],
    },
    {
      kop: "2. Intake en geschiktheid",
      niveau: 3,
      blokken: [
        { soort: "tekst", tekst: "Via het intakeformulier vragen we:" },
        {
          soort: "lijst",
          items: [
            "Naam, e-mailadres, telefoonnummer, functie en motivatie",
            "Gezondheidsgegevens: informatie over mentale gezondheid, medicijngebruik, trauma in het verleden en middelengebruik",
          ],
        },
        {
          soort: "tekst",
          tekst:
            "**Doel:** beoordelen of deelname aan het programma passend en veilig voor je is. Op basis van je antwoorden kan Innerleaps besluiten dat deelname op dit moment niet verstandig is.",
        },
        {
          soort: "tekst",
          tekst:
            "**Grondslag:** uitdrukkelijke toestemming (artikel 6 lid 1 sub a en artikel 9 lid 2 sub a AVG).",
        },
        {
          soort: "tekst",
          tekst:
            "**Let op:** dit zijn bijzondere persoonsgegevens in de zin van de AVG. We gaan er extra zorgvuldig mee om en gebruiken ze alleen voor het doel hierboven. De Innerleaps-training is een programma voor professionele ontwikkeling en vitaliteit, en geen vorm van zorg of psychotherapie. Het vervangt geen professionele medische of psychologische hulp.",
        },
      ],
    },
    {
      kop: "3. Effectmeting",
      niveau: 3,
      blokken: [
        { soort: "tekst", tekst: "Via de vragenlijst voor de effectmeting vragen we:" },
        {
          soort: "lijst",
          items: [
            "Naam en e-mailadres",
            "Productiviteit",
            "Veerkracht",
            "Vitaliteit",
            "Stressniveau",
            "Hoe vaak je oefent en wat je tegenhoudt",
            "Werkplezier",
            "Vertrekintentie",
          ],
        },
        {
          soort: "tekst",
          tekst:
            "**Doel:** meten wat de training doet met welzijn, productiviteit en werkprestaties.",
        },
        {
          soort: "tekst",
          tekst:
            "**Grondslag:** gerechtvaardigd belang van je werkgever (artikel 6 lid 1 sub f AVG) en toestemming (artikel 6 lid 1 sub a AVG).",
        },
        {
          soort: "tekst",
          tekst:
            "**Belangrijk:** je eigen antwoorden gaan nooit naar je werkgever. De directie krijgt alleen geanonimiseerde, samengevoegde uitkomsten. Er komt pas een managementrapport als de trainingsgroep uit minimaal 8 personen bestaat; is er ook een controlegroep van minimaal 8 personen, dan volgt een volledig vergelijkend rapport. We vragen je niet naar je salaris; de ROI wordt berekend met een gemiddelde dat je werkgever aanlevert.",
        },
      ],
    },
    {
      kop: "4. Evaluatie van de training",
      niveau: 3,
      blokken: [
        { soort: "tekst", tekst: "Via het evaluatieformulier vragen we:" },
        { soort: "lijst", items: ["Beoordelingen van de trainer", "Open feedback over het programma"] },
        { soort: "tekst", tekst: "Het evaluatieformulier vraagt niet om je naam of e-mailadres." },
        { soort: "tekst", tekst: "**Doel:** de training evalueren en verbeteren." },
        {
          soort: "tekst",
          tekst:
            "**Grondslag:** gerechtvaardigd belang (artikel 6 lid 1 sub f AVG). Innerleaps heeft er belang bij te weten hoe trainers het doen en hoe goed het programma is. Je eigen antwoorden ziet alleen Innerleaps; ze gaan nooit naar je werkgever, de trainers of derden. De directie krijgt alleen gemiddelde scores.",
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
            "Meedoen aan de Innerleaps-training is volledig vrijwillig. Je werkgever biedt het programma aan, maar jij beslist of je meedoet. Je kunt je toestemming altijd intrekken, zonder gevolgen voor je arbeidsrelatie.",
        },
      ],
    },
    {
      kop: "Hoe lang bewaren we je gegevens?",
      blokken: [
        {
          soort: "tabel",
          koppen: ["Categorie", "Bewaartermijn"],
          rijen: [
            ["Aanmeldgegevens", "Tot het einde van de overeenkomst tussen Innerleaps en je werkgever"],
            ["Intakegegevens", "Tot het einde van de overeenkomst tussen Innerleaps en je werkgever"],
            ["Gegevens uit de effectmeting", "Tot het einde van de overeenkomst tussen Innerleaps en je werkgever"],
            ["Evaluatiegegevens", "Tot het einde van de overeenkomst tussen Innerleaps en je werkgever"],
            ["Geanonimiseerde totalen", "Onbeperkt, mits alle herleidbare informatie onomkeerbaar is verwijderd"],
          ],
        },
        {
          soort: "tekst",
          tekst:
            "Na afloop van de overeenkomst worden alle persoonsgegevens verwijderd. Je werkgever krijgt nooit persoonsgegevens, alleen geanonimiseerde uitkomsten.",
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
            "Alleen Bas ter Haar Romenij (eigenaar) heeft toegang tot de volledige gegevens. Zelfstandige trainers die Innerleaps inschakelt krijgen alleen wat strikt nodig is om hun sessies te geven: je naam, telefoonnummer en e-mailadres. Dat delen we op basis van dataminimalisatie (artikel 5 lid 1 sub c AVG), en het wordt alleen gebruikt om deelnemers te bereiken bij een roosterwijziging of iets anders over de sessie. Alle trainers zijn contractueel gebonden aan geheimhouding en gegevensbescherming voordat ze een sessie mogen geven.",
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
        { soort: "tekst", tekst: "Voor de training gebruiken we de volgende subverwerkers:" },
        {
          soort: "lijst",
          items: [
            "**Google Workspace (Google LLC):** voor het verzamelen en bewaren van gegevens via Google Forms, Google Sheets en Gmail. Google LLC zit in de Verenigde Staten. Doorgifte daarheen gebeurt op basis van het EU-VS Data Privacy Framework en standaardcontractbepalingen (SCC's).",
            "**n8n:** voor het geautomatiseerd verwerken van formuliergegevens. n8n GmbH zit in Duitsland (EU) en is gebonden aan een verwerkersovereenkomst met Innerleaps.",
          ],
        },
        {
          soort: "tekst",
          tekst:
            "De leveranciers achter de website staan hierboven, bij Een bezoek aan innerleaps.nl. Alle subverwerkers moeten gegevens verwerken volgens de AVG en zijn gebonden aan een verwerkersovereenkomst met Innerleaps.",
        },
      ],
    },
    {
      kop: "Internationale doorgifte",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Innerleaps werkt met klanten en deelnemers binnen en buiten de Europese Unie. Worden persoonsgegevens buiten de EER doorgegeven, dan zorgt Innerleaps voor passende waarborgen, waaronder standaardcontractbepalingen (SCC's) en adequaatheidsbesluiten, volgens hoofdstuk V van de AVG.",
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
            "**Recht om toestemming in te trekken**: je kunt je toestemming altijd intrekken, zonder opgaaf van reden. Intrekken werkt niet met terugwerkende kracht, maar kan wel gevolgen hebben voor je deelname aan het programma.",
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
            "Innerleaps neemt passende technische en organisatorische maatregelen om je persoonsgegevens te beschermen tegen ongeautoriseerde toegang, verlies of misbruik. Gegevens staan uitsluitend in beveiligde cloudomgevingen. Toegang is beperkt tot mensen die het nodig hebben om het programma te geven.",
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
  voettekst: ["Documentversie: 1.7", "Datum: september 2026", "Opgesteld door: Innerleaps", "Status: gepubliceerd"],
};
