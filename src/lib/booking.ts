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

/** Het pad van de boekingspagina, per taal. */
export const bookingPath = (lang: "nl" | "en"): string =>
  lang === "en" ? "/en/book-a-call" : "/afspraak-plannen";

/**
 * Scrollt naar de widget als die op deze pagina staat en geeft dan `true`
 * terug. Zo niet, dan `false`, en hoort de aanroeper naar de boekingspagina te
 * navigeren.
 */
export const scrollToBookingWidget = (): boolean => {
  const el = document.getElementById(BOOKING_ANCHOR);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  // Het anker in de URL zetten zodat terugnavigeren en delen blijft werken.
  if (window.history.replaceState) {
    window.history.replaceState(null, "", `#${BOOKING_ANCHOR}`);
  }
  return true;
};
