/**
 * Eén plek voor het gedrag van alle "plan een gesprek met Bas"-knoppen.
 *
 * Vroeger opende elke knop een Google Calendar-link in een nieuw venster. Dat
 * gaf twee problemen: de bezoeker verliet het domein, en een boeking was niet
 * te meten omdat die op een ander domein plaatsvond.
 *
 * Nu: staat de Calendly-widget op deze pagina, dan scrollen we ernaartoe.
 * Staat hij er niet, dan gaan we naar de boekingspagina. Zo hoeft niet elke
 * pagina een iframe van 700 pixels te laden.
 */

export const BOOKING_ANCHOR = "afspraak";

/**
 * Het pad waar je een gesprek plant, per taal.
 *
 * Dat was /afspraak-plannen, een aparte pagina. Die is opgeheven: hij had
 * dezelfde kop en boven de vouw dezelfde inhoud als /contact, en dat is voor
 * een zoekmachine een teken dat er één van de twee overbodig is. De contactpagina
 * doet nu allebei, in de volgorde die klopt: eerst een moment kiezen, dan zelf
 * contact opnemen, dan de rekentool.
 */
export const bookingPath = (lang: "nl" | "en"): string =>
  lang === "en" ? "/en/contact" : "/contact";

/**
 * Hoe ver de agenda mag staan voordat scrollen slechter is dan doorsturen.
 * Anderhalf scherm: dat is nog een vloeiende beweging waarvan je de bestemming
 * bijna ziet aankomen.
 */
const SCROLL_LIMIT = 1.5;

/**
 * Scrollt naar het afspraakblok, zonder afstandsgrens.
 *
 * Voor pagina's waar de agenda er gegarandeerd staat en de knop maar één ding
 * kan betekenen, zoals de bedanktpagina's. Daar staat het afspraakblok onder
 * het hele resultatenblok, dus ruim buiten de grens die scrollToBookingWidget
 * hieronder aanhoudt. Die zou dan `false` teruggeven en de knop deed niets.
 */
export const scrollNaarAfspraak = (): void => {
  const el = document.getElementById(BOOKING_ANCHOR);
  if (!el) return;

  const beginstand = window.scrollY;
  el.scrollIntoView({ behavior: "smooth", block: "start" });

  /**
   * Vangnet als vloeiend scrollen niet werkt.
   *
   * Niet elke omgeving voert `behavior: "smooth"` uit. Gemeten in een headless
   * Chrome: de vloeiende variant deed niets, de directe sprong wel. Zonder deze
   * controle doet de belangrijkste knop van de bedanktpagina dan helemaal
   * niets, en dat merk je niet want er komt ook geen foutmelding.
   *
   * Werkt het wel, dan is er na een halve seconde allang beweging en gebeurt
   * hier niets meer.
   */
  window.setTimeout(() => {
    if (Math.abs(window.scrollY - beginstand) < 2) {
      el.scrollIntoView({ block: "start" });
    }
  }, 500);

  if (window.history.replaceState) {
    window.history.replaceState(null, "", `#${BOOKING_ANCHOR}`);
  }
};

/**
 * Scrollt naar de widget als die op deze pagina staat én dichtbij genoeg is, en
 * geeft dan `true` terug. Zo niet, dan `false`, en hoort de aanroeper naar de
 * boekingspagina te navigeren.
 *
 * Die afstandsgrens is het punt. Alleen kijken óf de widget bestaat ging mis op
 * /over-ons: daar staat hij ruim vierduizend pixels naar beneden, dus je stuurde
 * iemand op een lange rit naar een agenda die onderweg pas begint te laden.
 * Andersom is doorsturen ook niet altijd goed: staat de agenda vlak onder de
 * vouw, zoals op /contact, dan is een pagina laden puur verlies voor iemand die
 * er al bijna was.
 *
 * Dus: dichtbij scrollen we, ver weg gaan we naar de pagina die op boeken is
 * gebouwd. Boven de huidige positie telt ook als dichtbij, want teruggaan naar
 * iets wat je net voorbij bent gescrold is dezelfde korte beweging.
 */
export const scrollToBookingWidget = (): boolean => {
  const el = document.getElementById(BOOKING_ANCHOR);
  if (!el) return false;
  if (Math.abs(el.getBoundingClientRect().top) > window.innerHeight * SCROLL_LIMIT) {
    return false;
  }
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  // Het anker in de URL zetten zodat terugnavigeren en delen blijft werken.
  if (window.history.replaceState) {
    window.history.replaceState(null, "", `#${BOOKING_ANCHOR}`);
  }
  return true;
};

/**
 * De foto van Bas, op elke plek waar hij als persoon in beeld komt: bovenaan
 * het afspraakblok en op de teampagina.
 *
 * Bewust uit /public en op één plek vastgelegd. Zo is een nieuwe foto een
 * kwestie van dit ene bestand overschrijven, en verandert hij meteen overal
 * mee, zonder dat er iets opnieuw gebouwd hoeft.
 */
export const BAS_PHOTO = "/team/bas-ter-haar-romenij.webp";
