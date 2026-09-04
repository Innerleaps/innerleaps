/**
 * Hoeveel scherm er werkelijk zichtbaar is, als CSS-variabele.
 *
 * Waarom dit nodig is. Op een telefoon met het toetsenbord open zegt de browser
 * nog steeds dat het scherm 812 pixels hoog is. Dat is de layout-viewport, en
 * die krimpt niet mee. Alleen `window.visualViewport` weet dat er nog 450
 * pixels over zijn.
 *
 * Wat er daardoor misging: de pop-up van de rekentool stond op `max-h-90vh`,
 * dus zo'n 730 pixels, gecentreerd op het volledige scherm. Ruim de helft zat
 * onder het toetsenbord. Vulde je je naam in en sprong de invulhulp naar het
 * e-mailveld, dan probeerde Safari dat veld in beeld te brengen binnen een
 * kader dat grotendeels onbereikbaar was, en schoof het de inhoud naar de
 * onderkant. Je zag dan de laatste velden en de verzendknop, en je e-mailveld
 * stond boven beeld.
 *
 * Deze variabele geeft de echt zichtbare hoogte, zodat de pop-up op een
 * telefoon precies past bij wat je ziet. Zonder visualViewport, of op een
 * bureaublad, valt hij terug op 100dvh en verandert er niets.
 */

const VARIABELE = "--zichtbare-hoogte";

const bijwerken = () => {
  const vv = window.visualViewport;
  if (!vv) return;
  document.documentElement.style.setProperty(VARIABELE, `${Math.round(vv.height)}px`);
};

if (typeof window !== "undefined" && window.visualViewport) {
  bijwerken();
  window.visualViewport.addEventListener("resize", bijwerken);
  // Bij scrollen verschuift op iOS ook de zichtbare viewport.
  window.visualViewport.addEventListener("scroll", bijwerken);
}
