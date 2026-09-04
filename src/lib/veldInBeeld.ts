/**
 * Voorkomen dat het scherm wegspringt als je een veld in een pop-up aantikt.
 *
 * Het probleem in drie stappen. Je tikt een veld aan, iOS begint het toetsenbord
 * te tonen, en Safari scrolt vast vooruit om het veld "in beeld te brengen".
 * Dat gokt hij op het scherm zoals het nu is, niet zoals het straks is, en in
 * een pop-up met een eigen scrollgebied schiet hij daarbij door. Het veld
 * verdwijnt uit beeld en je kijkt naar de velden eronder.
 *
 * De eerste versie hiervan haalde het veld daarna terug. Dat werkte, maar je
 * zag de fout gebeuren: het scherm sprong weg en kwam weer terug.
 *
 * Nu houden we de scrollpositie vast zodra een veld focus krijgt. Zolang het
 * toetsenbord bezig is met verschijnen zetten we elke beeldopbouw de scroll
 * terug op waar hij stond. Safari mag scrollen wat hij wil, je ziet het niet.
 * Zodra het toetsenbord staat kijken we één keer of het veld werkelijk bedekt
 * is. Alleen dan bewegen we, en dan in één keer naar de goede plek.
 *
 * Dus: nul beweging als het niet nodig is, en anders één beweging in plaats van
 * heen en weer.
 */

/** Alleen op telefoonformaat. Op een groot scherm is er geen toetsenbord dat
 *  de halve pagina opeet en doet de browser het prima. */
const TELEFOON = "(max-width: 639px)";

/**
 * Hoe lang we de scroll vasthouden als de viewport zich niet meldt.
 *
 * Lang genoeg om de sprong van Safari op te vangen, kort genoeg om niet in de
 * weg te zitten als het toetsenbord al openstond en je gewoon naar het volgende
 * veld gaat. Meldt de viewport zich wel, dan stoppen we eerder.
 */
const MAXIMAAL_VASTHOUDEN = 300;

/** Waar het veld heen gaat als het echt bedekt is: een kwart onder de bovenkant
 *  van het zichtbare deel. Hoog genoeg om het label en het vorige veld te zien,
 *  laag genoeg om niet tegen de rand te plakken. */
const AANDEEL_VAN_BOVEN = 0.25;

/** Speling, zodat een veld dat net tegen de rand staat niet als bedekt telt. */
const SPELING = 8;

const zichtbaarVenster = () => {
  const vv = window.visualViewport;
  return vv
    ? { top: vv.offsetTop, hoogte: vv.height }
    : { top: 0, hoogte: window.innerHeight };
};

const staatInBeeld = (veld: HTMLElement) => {
  const { top, hoogte } = zichtbaarVenster();
  const rand = veld.getBoundingClientRect();
  return rand.top >= top + SPELING && rand.bottom <= top + hoogte - SPELING;
};

/**
 * Eén keer beslissen, als het toetsenbord staat. Staat het veld gewoon in beeld,
 * dan gebeurt er niets. Dat is de belangrijkste regel: zo kan dit het nooit
 * erger maken dan het gedrag van de browser zelf.
 */
const beslis = (veld: HTMLElement, gebied: HTMLElement) => {
  if (document.activeElement !== veld) return;
  if (staatInBeeld(veld)) return;
  const { top, hoogte } = zichtbaarVenster();
  gebied.scrollBy({ top: veld.getBoundingClientRect().top - (top + hoogte * AANDEEL_VAN_BOVEN) });
};

if (typeof window !== "undefined") {
  let stop: (() => void) | null = null;

  const begeleid = (veld: HTMLElement) => {
    stop?.();

    if (!window.matchMedia(TELEFOON).matches) return;
    // Alleen binnen een pop-up. Op een gewone pagina houdt de scroll-margin in
    // index.css al ruimte vrij voor de menubalk.
    const gebied = veld.closest<HTMLElement>('[role="dialog"]');
    if (!gebied) return;

    const vastePositie = gebied.scrollTop;
    let bezig = true;

    // Elke beeldopbouw de scroll terugzetten. Hierdoor is de sprong die Safari
    // maakt nooit zichtbaar.
    const vasthouden = () => {
      if (!bezig || document.activeElement !== veld) return;
      if (gebied.scrollTop !== vastePositie) gebied.scrollTop = vastePositie;
      requestAnimationFrame(vasthouden);
    };
    requestAnimationFrame(vasthouden);

    const beeindig = () => {
      if (!bezig) return;
      bezig = false;
      window.clearTimeout(vangnet);
      window.visualViewport?.removeEventListener("resize", naToetsenbord);
      document.removeEventListener("touchstart", loslaten);
      beslis(veld, gebied);
    };

    // Zodra het toetsenbord er is verandert het zichtbare venster. Dat is het
    // moment waarop we kunnen zien of het veld echt bedekt is.
    const naToetsenbord = () => window.setTimeout(beeindig, 60);
    // Meldt de viewport zich niet, dan stoppen we uit onszelf.
    const vangnet = window.setTimeout(beeindig, MAXIMAAL_VASTHOUDEN);
    // Gaat de bezoeker zelf scrollen, dan laten we meteen los.
    const loslaten = () => {
      bezig = false;
      window.clearTimeout(vangnet);
      window.visualViewport?.removeEventListener("resize", naToetsenbord);
      document.removeEventListener("touchstart", loslaten);
    };

    window.visualViewport?.addEventListener("resize", naToetsenbord);
    document.addEventListener("touchstart", loslaten, { passive: true });

    stop = loslaten;
  };

  document.addEventListener("focusin", (e) => {
    const doel = e.target as HTMLElement | null;
    if (doel?.matches?.("input, textarea, select")) begeleid(doel);
  });

  /**
   * En daarna blijven meekijken. Het toetsenbord kan later alsnog verschijnen of
   * van hoogte veranderen, bijvoorbeeld als de invulhulp erboven komt of de
   * emoji-balk verschijnt. `beslis` doet niets zolang het veld gewoon in beeld
   * staat, dus dit meekijken kan geen kwaad.
   */
  window.visualViewport?.addEventListener("resize", () => {
    if (!window.matchMedia(TELEFOON).matches) return;
    const veld = document.activeElement as HTMLElement | null;
    if (!veld?.matches?.("input, textarea, select")) return;
    const gebied = veld.closest<HTMLElement>('[role="dialog"]');
    if (gebied) window.setTimeout(() => beslis(veld, gebied), 60);
  });
}
