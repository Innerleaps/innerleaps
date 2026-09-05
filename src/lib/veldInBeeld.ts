/**
 * Het veld met de focus in een pop-up in beeld houden.
 *
 * Wat er misging, vastgelegd op een iPhone met twintig beeldjes per seconde:
 *
 *   4,00s  goed, het naamveld heeft focus
 *   4,05s  al helemaal onderaan, bij de verzendknop
 *   4,30s  nog steeds onderaan
 *   4,40s  terug bovenaan, e-mail heeft focus
 *
 * De sprong komt binnen 50 milliseconde nadat je de invulhulp aantikt, en op dat
 * moment is er geen focuswissel: het naamveld had de focus al. Safari scrolt het
 * scrollgebied van de pop-up naar de onderkant en komt daarna zelf terug.
 *
 * Eerdere pogingen keken alleen in het venstertje vlak na een focuswissel, en
 * stonden dus al uit tegen de tijd dat dit gebeurde. Vandaar één regel die altijd
 * geldt:
 *
 *   Zolang een veld in een pop-up de focus heeft en de bezoeker niet zelf aan
 *   het scrollen is, blijft dat veld in beeld. Elke scroll die hem verstopt
 *   wordt meteen teruggedraaid.
 *
 * Daarmee doet het niet uit of de sprong van een focuswissel komt, van de
 * invulhulp, of van het toetsenbord dat verschijnt.
 *
 * Twee dingen houden het veilig. Raakt de bezoeker het scherm aan, dan laten we
 * los tot het volgende veld focus krijgt, want dan scrolt hij zelf. En staat het
 * veld gewoon in beeld, dan doen we niets; in het slechtste geval blijft het dus
 * bij het gedrag van de browser.
 *
 * We kijken elke beeldopbouw, niet alleen bij een scroll-melding. Reden: die
 * melding is niet betrouwbaar. Gemeten in een browser zonder zichtbaar venster
 * ging er bij een programmatische scroll geen enkele melding af, terwijl de
 * scroll wel plaatsvond. Wachten op een melding die soms uitblijft is precies
 * hoe je een zichtbare sprong overhoudt. Deze lus draait alleen zolang er een
 * veld in een pop-up focus heeft, dus tijdens het invullen van een formulier.
 */

/** Alleen op telefoonformaat. Op een groot scherm is er geen toetsenbord dat de
 *  halve pagina opeet en doet de browser het prima. */
const TELEFOON = "(max-width: 639px)";

/** Waar het veld heen gaat als het echt bedekt is: een kwart onder de bovenkant
 *  van het zichtbare deel. */
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
 * Het veld dat we bewaken.
 *
 * Bewust niet `document.activeElement`. Tijdens het invullen met de invulhulp
 * ligt de focus even niet op een invoerveld: Safari geeft hem aan zijn eigen
 * balk boven het toetsenbord. Een bewaking die op activeElement afgaat stapt er
 * dan precies op het verkeerde moment uit, en dat is exact wanneer de sprong
 * gebeurt. Gemeten in een schermopname: het formulier stond ruim 250
 * milliseconde helemaal onderaan terwijl de bewaking niets deed.
 *
 * Daarom onthouden we zelf welk veld als laatste focus kreeg, en blijven we dat
 * bewaken zolang het nog in een geopende pop-up staat.
 */
let bewaaktVeld: HTMLElement | null = null;

const teBewaken = () => {
  if (!window.matchMedia(TELEFOON).matches) return null;
  const veld = bewaaktVeld;
  if (!veld || !veld.isConnected) return null;
  const gebied = veld.closest<HTMLElement>('[role="dialog"]');
  return gebied ? { veld, gebied } : null;
};

if (typeof window !== "undefined") {
  /** De laatste scrollpositie waarbij het veld goed stond. Daar zetten we hem
   *  op terug als er iets ongevraagd scrolt. */
  let goedePositie: number | null = null;
  /**
   * Ligt er een vinger op het scherm? Dan scrolt de bezoeker mogelijk zelf en
   * blijven we eraf.
   *
   * Dit stond eerst aan tot het volgende veld focus kreeg, en dat was fout.
   * iOS opent het toetsenbord niet bij een focus die uit code komt, dus de
   * bezoeker tikt het veld dat al focus heeft alsnog aan om te kunnen typen.
   * Dat tikken zette de vlag aan, en omdat het veld de focus al had kwam er
   * geen nieuwe focus-gebeurtenis die hem weer uitzette. De bewaking stond
   * daarna permanent op non-actief. In een schermopname te zien als vier
   * beeldjes lang exact dezelfde verkeerde stand, zonder enige flikkering.
   *
   * Nu geldt de vlag alleen zolang de vinger er echt ligt. Bij het loslaten
   * kijken we één keer: staat het veld nog in beeld, dan gaan we gewoon verder
   * met bewaken. Heeft de bezoeker het veld zelf weggescrold, dan is dat zijn
   * keuze en laten we hem met rust tot hij een volgend veld aantikt.
   */
  let vinger = false;

  const losgelaten = () => {
    vinger = false;
    const nu = teBewaken();
    if (!nu) return;
    if (staatInBeeld(nu.veld)) {
      goedePositie = nu.gebied.scrollTop;
    } else {
      bewaaktVeld = null;
    }
  };

  document.addEventListener("touchstart", () => { vinger = true; }, { passive: true });
  document.addEventListener("touchend", losgelaten, { passive: true });
  document.addEventListener("touchcancel", losgelaten, { passive: true });

  let lus: number | undefined;

  const bewaak = () => {
    const nu = teBewaken();
    if (!nu) return;
    const { veld, gebied } = nu;

    // Ligt er een vinger op het scherm, of staat het veld gewoon goed? Dan is de
    // huidige stand de nieuwe goede stand.
    if (vinger || staatInBeeld(veld)) {
      goedePositie = gebied.scrollTop;
      return;
    }

    // Het veld is uit beeld geraakt zonder dat iemand erom vroeg. Terugzetten.
    if (goedePositie !== null && goedePositie !== gebied.scrollTop) {
      gebied.scrollTop = goedePositie;
      // Nog steeds bedekt? Dan lag de oude stand ook al niet goed, bijvoorbeeld
      // omdat het toetsenbord er net overheen kwam. Dan alsnog netjes plaatsen.
      if (!staatInBeeld(veld)) plaats(veld, gebied);
      return;
    }

    plaats(veld, gebied);
  };

  const plaats = (veld: HTMLElement, gebied: HTMLElement) => {
    const { top, hoogte } = zichtbaarVenster();
    gebied.scrollBy({ top: veld.getBoundingClientRect().top - (top + hoogte * AANDEEL_VAN_BOVEN) });
    goedePositie = gebied.scrollTop;
  };

  /** Elke beeldopbouw kijken, zolang er een veld in een pop-up bewaakt wordt. */
  const draai = () => {
    if (!teBewaken()) { lus = undefined; return; }
    bewaak();
    lus = requestAnimationFrame(draai);
  };

  // Een veld krijgt focus: de bezoeker is niet meer aan zet, onthouden waar we
  // staan, en de lus starten.
  document.addEventListener("focusin", (e) => {
    const doel = e.target as HTMLElement | null;
    if (!doel?.matches?.("input, textarea, select")) return;
    if (!doel.closest('[role="dialog"]')) return;
    bewaaktVeld = doel;
    const nu = teBewaken();
    if (!nu) return;
    goedePositie = nu.gebied.scrollTop;
    bewaak();
    if (lus === undefined) lus = requestAnimationFrame(draai);
  });

  /**
   * Naast de lus ook op een scroll-melding kijken, als extra aanleiding.
   *
   * Scroll bubbelt niet, dus in de capture-fase. Twee aanleidingen in plaats van
   * één, omdat allebei in een omgeving kunnen wegvallen: een browser die de
   * beeldopbouw stillegt heeft geen lus, en een browser die programmatische
   * scrolls niet meldt heeft geen melding. Allebei kwam ik tegen tijdens het
   * testen. Dubbel reageren kan geen kwaad, want de bewaking doet niets zolang
   * het veld gewoon in beeld staat.
   */
  document.addEventListener("scroll", bewaak, true);

  /**
   * We stoppen pas als het veld echt weg is, dus als de pop-up sluit. Niet bij
   * focusout: die komt ook af als de invulhulp de focus even overneemt, en juist
   * dan moeten we blijven kijken.
   */
  document.addEventListener("focusout", () => {
    window.setTimeout(() => {
      if (!teBewaken() && lus !== undefined) {
        cancelAnimationFrame(lus);
        lus = undefined;
        bewaaktVeld = null;
      }
    }, 0);
  });

  // Het toetsenbord verschijnt of verandert van hoogte. Dan kan een veld dat
  // stil stond ineens bedekt zijn, zonder dat er iets gescrold is.
  window.visualViewport?.addEventListener("resize", () => window.setTimeout(bewaak, 60));
}
