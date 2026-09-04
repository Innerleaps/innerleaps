/**
 * Een veld dat focus krijgt in een pop-up terughalen als het buiten beeld staat.
 *
 * Waarom dit er is. Op iOS gebeurt er bij het aantikken van een veld veel
 * tegelijk: het toetsenbord schuift omhoog, het zichtbare venster krimpt, en
 * Safari scrolt zelf om het veld in beeld te brengen. In een pop-up met een
 * eigen scrollgebied pakt dat verkeerd uit: het veld met de focus verdween
 * boven beeld en je keek naar de velden eronder.
 *
 * Twee eerdere pogingen hielpen niet. Ruimte vrijhouden met scroll-margin lost
 * het niet op, want boven een pop-up staat geen menubalk. De pop-up vastplakken
 * aan het zichtbare venster evenmin: dat is een race met Safari en die verloor
 * hij, waarna je onder de pop-up door naar de pagina erachter keek.
 *
 * Dus grijpen we achteraf in, en alleen als het misging.
 *
 * Twee regels houden dit veilig. We doen niets zolang het veld gewoon zichtbaar
 * is, dus in het slechtste geval blijft het bij het gedrag van de browser zelf
 * en maken we het nooit erger. En we kijken op meerdere momenten, want wanneer
 * het toetsenbord klaar is met verschijnen verschilt per toestel.
 */

/** Alleen op telefoonformaat. Op een groot scherm is er geen toetsenbord dat
 *  de halve pagina opeet en doet de browser het prima. */
const TELEFOON = "(max-width: 639px)";

/** Momenten waarop we kijken, geteld vanaf de focus. Het toetsenbord is er bij
 *  de een sneller dan bij de ander. */
const MOMENTEN = [150, 400, 800];

/** Waar het veld heen gaat als het echt buiten beeld staat: een kwart onder de
 *  bovenkant van het zichtbare deel. Hoog genoeg om het label en het vorige
 *  veld te zien, laag genoeg om niet tegen de rand te plakken. */
const AANDEEL_VAN_BOVEN = 0.25;

/** Speling, zodat een veld dat net tegen de rand aan staat niet meteen als
 *  buiten beeld telt. */
const SPELING = 8;

const zichtbaarVenster = () => {
  const vv = window.visualViewport;
  return vv
    ? { top: vv.offsetTop, hoogte: vv.height }
    : { top: 0, hoogte: window.innerHeight };
};

const herstel = (veld: HTMLElement) => {
  if (!window.matchMedia(TELEFOON).matches) return;
  if (document.activeElement !== veld) return;

  // Alleen binnen een pop-up. Op een gewone pagina houdt scroll-margin in
  // index.css al ruimte vrij voor de menubalk.
  const scrollgebied = veld.closest<HTMLElement>('[role="dialog"]');
  if (!scrollgebied) return;

  const { top, hoogte } = zichtbaarVenster();
  const rand = veld.getBoundingClientRect();

  // Staat hij gewoon in beeld? Dan afblijven. Dit is de belangrijkste regel:
  // hij zorgt dat we nooit iets verplaatsen wat al goed stond.
  if (rand.top >= top + SPELING && rand.bottom <= top + hoogte - SPELING) return;

  const doel = top + hoogte * AANDEEL_VAN_BOVEN;
  // Direct, niet vloeiend. Een vloeiende beweging kan door de browser
  // onderbroken worden terwijl hij zelf ook aan het scrollen is.
  scrollgebied.scrollBy({ top: rand.top - doel });
};

if (typeof window !== "undefined") {
  let timers: number[] = [];

  const plan = (veld: HTMLElement) => {
    timers.forEach(window.clearTimeout);
    timers = MOMENTEN.map((ms) => window.setTimeout(() => herstel(veld), ms));
  };

  document.addEventListener("focusin", (e) => {
    const doel = e.target as HTMLElement | null;
    if (doel?.matches?.("input, textarea, select")) plan(doel);
  });

  // Het toetsenbord komt pas na de focus, dus het zichtbare venster verandert
  // daarna. Dan nog een keer kijken.
  window.visualViewport?.addEventListener("resize", () => {
    const actief = document.activeElement as HTMLElement | null;
    if (actief?.matches?.("input, textarea, select")) plan(actief);
  });
}
