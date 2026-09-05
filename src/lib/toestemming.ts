/**
 * De cookiekeuze van de bezoeker: bewaren, uitlezen, en doorgeven aan Google.
 *
 * Het zwaartepunt van deze opzet ligt niet hier maar in index.html. Daar staat
 * als allereerste script het consentblok dat alles op `denied` zet, en meteen
 * daarna een stukje dat een eerder gemaakte keuze terugzet. Dat moet daar
 * staan en niet in React: `wait_for_update` geeft de banner een halve seconde,
 * en een component dat na een seconde mount is dan al te laat. De tag heeft
 * dan al zonder toestemming gevuurd.
 *
 * Dit bestand doet de rest: de keuze van de banner opslaan en doorgeven.
 */

export interface Toestemming {
  analyse: boolean;
  advertenties: boolean;
}

/** Dezelfde sleutel als in het inline-script in index.html. Verander je hem
 *  hier, verander hem daar dan mee. */
export const TOESTEMMING_SLEUTEL = "innerleaps.toestemming";

/** Gebeurtenis waarmee de banner zichzelf weer opent vanuit de footer. */
export const OPEN_INSTELLINGEN = "innerleaps:cookievoorkeuren";

declare global {
  interface Window {
    dataLayer?: unknown[];
    /** De Google tag. Staat in index.html, zie het consentblok daar. */
    gtag?: (command: string, eventName: string, params?: Record<string, any>) => void;
  }
}

export const leesToestemming = (): Toestemming | null => {
  try {
    const rauw = localStorage.getItem(TOESTEMMING_SLEUTEL);
    if (!rauw) return null;
    const gelezen = JSON.parse(rauw) as Partial<Toestemming>;
    if (typeof gelezen?.analyse !== "boolean") return null;
    return { analyse: gelezen.analyse, advertenties: gelezen.advertenties === true };
  } catch {
    return null;
  }
};

/**
 * De keuze doorgeven aan Google en opslaan.
 *
 * Weigeren stuurt hier bewust wél een update, met alles op `denied`. Dat is
 * niet hetzelfde als niets doen: Google weet dan dat er een keuze ligt en gaat
 * niet meer wachten, en jij ziet in de rapportage het verschil tussen "heeft
 * geweigerd" en "heeft nog niets gekozen".
 */
export const bewaarToestemming = (keuze: Toestemming): void => {
  const waarde = (aan: boolean) => (aan ? "granted" : "denied");
  window.gtag?.("consent", "update", {
    ad_storage: waarde(keuze.advertenties),
    ad_user_data: waarde(keuze.advertenties),
    ad_personalization: waarde(keuze.advertenties),
    analytics_storage: waarde(keuze.analyse),
  });
  try {
    localStorage.setItem(TOESTEMMING_SLEUTEL, JSON.stringify(keuze));
  } catch {
    // Privémodus. De keuze geldt dan alleen voor dit bezoek, en de banner komt
    // de volgende keer terug. Dat is vervelender dan fout.
  }
};
