import type { JuridischePagina } from "./juridisch";

/** Cookieverklaring, Nederlands. De Engelse tekst staat in cookies-en.ts en
 *  moet bij elke wijziging mee. */
export const cookiesNl: JuridischePagina = {
  titel: "Cookieverklaring",
  ondertitel: "**Innerleaps**, laatst bijgewerkt: september 2026",
  metaTitel: "Cookieverklaring | Innerleaps",
  metaBeschrijving:
    "Cookieverklaring van Innerleaps. Welke cookies we gebruiken, waarvoor ze dienen en hoe je je keuze aanpast.",
  secties: [
    {
      kop: "Wat zijn cookies?",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Cookies zijn kleine bestandjes die een website op je apparaat achterlaat. Sommige zijn nodig om de site te laten werken. Andere zijn er om te meten hoe de site gebruikt wordt. Deze pagina gaat ook over de andere manieren waarop een site iets op je apparaat kan bewaren, zoals local storage, want daar gelden dezelfde regels voor.",
        },
      ],
    },
    {
      kop: "Jij kiest eerst",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Er wordt niets gemeten voordat jij dat zegt. Bij je eerste bezoek verschijnt een venster met twee knoppen: alles accepteren, of zelf per categorie kiezen. Zolang je niets gekozen hebt, staan de meetinstrumenten uit.",
        },
      ],
    },
    {
      kop: "Welke cookies gebruiken we?",
      blokken: [
        {
          soort: "lijst",
          items: [
            "**Noodzakelijk.** Altijd aan, en niet uit te zetten, want dan werkt de site niet meer. Dit zijn je taalkeuze en je cookiekeuze zelf. Ze blijven in je eigen browser en wij zien ze nooit.",
            "**Analyse.** Google Analytics 4. Laat ons zien welke pagina's bezocht worden en waar mensen afhaken, zodat we de site kunnen verbeteren.",
            "**Advertenties.** Google Ads, om te zien welke advertentie iemand hierheen bracht en wat diegene daarna deed, en Apollo, dat herkent van welke organisatie een bezoek waarschijnlijk komt. Zonder dit betalen we door voor advertenties die niets opleveren.",
          ],
        },
      ],
    },
    {
      kop: "Van gedachten veranderen",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "Onderaan elke pagina staat een link **Cookievoorkeuren**. Die opent hetzelfde venster met de schakelaars. Zet je iets uit, dan stopt het meteen. Je kunt cookies ook wissen via je browserinstellingen, al raak je daarmee ook je taalkeuze kwijt.",
        },
      ],
    },
    {
      kop: "Meer weten",
      blokken: [
        {
          soort: "tekst",
          tekst:
            "In onze [privacyverklaring](/privacy) staat uitgebreider wat we meten, wie het verwerkt en hoe lang we het bewaren. Vragen? Mail [privacy@innerleaps.nl](mailto:privacy@innerleaps.nl).",
        },
      ],
    },
  ],
  voettekst: ["Documentversie: 2.0", "Datum: september 2026", "Opgesteld door: Innerleaps", "Status: gepubliceerd"],
};
