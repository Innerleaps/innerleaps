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

/** Het veld dat nu de focus heeft, als dat een invoerveld in een pop-up is. */
const actiefVeldInPopup = () => {
  if (!window.matchMedia(TELEFOON).matches) return null;
  const veld = document.activeElement as HTMLElement | null;
  if (!veld?.matches?.("input, textarea, select")) return null;
  const gebied = veld.closest<HTMLElement>('[role="dialog"]');
  return gebied ? { veld, gebied } : null;
};

if (typeof window !== "undefined") {
  /** De laatste scrollpositie waarbij het veld goed stond. Daar zetten we hem
   *  op terug als er iets ongevraagd scrolt. */
  let goedePositie: number | null = null;
  /**
   * Heeft de bezoeker het scherm aangeraakt? Dan neemt hij het over en blijven
   * we eraf tot het volgende veld focus krijgt. Ook als hij daarmee het veld uit
   * beeld scrolt: dat is dan zijn keuze, niet een sprong van de browser.
   *
   * Tikt hij een veld aan, dan komt er meteen na de aanraking een focusin, en
   * daar zetten we de bewaking weer aan.
   */
  let bezoekerAanZet = false;
  document.addEventListener("touchstart", () => { bezoekerAanZet = true; }, { passive: true });

  let lus: number | undefined;

  const bewaak = () => {
    const nu = actiefVeldInPopup();
    if (!nu) return;
    const { veld, gebied } = nu;

    // Is de bezoeker aan zet, of staat het veld gewoon goed? Dan is de huidige
    // stand de nieuwe goede stand.
    if (bezoekerAanZet || staatInBeeld(veld)) {
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

  /** Elke beeldopbouw kijken, zolang er een veld in een pop-up focus heeft. */
  const draai = () => {
    if (!actiefVeldInPopup()) { lus = undefined; return; }
    bewaak();
    lus = requestAnimationFrame(draai);
  };

  // Een veld krijgt focus: de bezoeker is niet meer aan zet, onthouden waar we
  // staan, en de lus starten.
  document.addEventListener("focusin", () => {
    const nu = actiefVeldInPopup();
    if (!nu) return;
    bezoekerAanZet = false;
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

  document.addEventListener("focusout", () => {
    // Even wachten: bij een focuswissel komt focusout vóór de nieuwe focusin.
    window.setTimeout(() => {
      if (!actiefVeldInPopup() && lus !== undefined) {
        cancelAnimationFrame(lus);
        lus = undefined;
      }
    }, 0);
  });

  // Het toetsenbord verschijnt of verandert van hoogte. Dan kan een veld dat
  // stil stond ineens bedekt zijn, zonder dat er iets gescrold is.
  window.visualViewport?.addEventListener("resize", () => window.setTimeout(bewaak, 60));
}
