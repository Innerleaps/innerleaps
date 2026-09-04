/**
 * Alles rond de bedanktpagina's op één plek: welke pagina hoort bij welke
 * doelgroep, waar hij staat, en hoe de berekening van de rekentool naar die
 * pagina komt.
 *
 * Waarom dit bestaat: de rekentool en het rapportformulier lieten hun resultaat
 * eerst in dezelfde module zien. Voor de bezoeker werkte dat, maar voor het
 * meten niet. Een modal die opengaat is geen pagina, dus er is geen URL, geen
 * page_view en geen terugknop. Google Ads kan daar niets mee, en juist Performance
 * Max heeft niets anders om op te sturen dan conversiedata.
 *
 * Nu eindigt elk formulier op een eigen adres, per doelgroep. Dat geeft per
 * doelgroep een eigen conversieactie en een eigen remarketinglijst.
 */

import type { ROIResults } from "@/utils/calculationEngine";
import type { SupportedLanguage } from "@/i18n/config";

export type Doelgroep = "hr" | "management" | "onbekend";

/**
 * Welke pagina hoort bij welke doelgroep.
 *
 * Alleen de twee pagina's die zich onmiskenbaar op een werkgeversrol richten
 * staan hier. De rekentool opent óók vanaf de homepage, de navigatie, /contact
 * en de twee pagina's voor medewerkers, en daar weet je niet wie er zit. Die
 * gaan naar de neutrale pagina.
 *
 * Dat is met opzet streng: zodra je gokt, staan er leads in je HR-cijfers
 * waarvan je de doelgroep niet kent, en dan meet je niets meer.
 */
const DOELGROEP_PER_PAD: Record<string, Doelgroep> = {
  "/duurzame-inzetbaarheid": "hr",
  "/en/sustainable-employability": "hr",
  "/team-prestaties-verbeteren": "management",
  "/en/improve-team-performance": "management",
};

/** Van welke pagina kwam de bezoeker, en welke doelgroep hoort daarbij. */
export const doelgroepVoorPad = (pathname: string): Doelgroep => {
  const genormaliseerd = pathname.replace(/\/+$/, "") || "/";
  return DOELGROEP_PER_PAD[genormaliseerd] ?? "onbekend";
};

/** Het pad van de bedanktpagina van de rekentool, per doelgroep en taal. */
export const roiBedanktPad = (doelgroep: Doelgroep, taal: SupportedLanguage): string => {
  const staart = doelgroep === "onbekend" ? "" : `-${doelgroep}`;
  return taal === "en" ? `/en/thank-you/roi${staart}` : `/bedankt/roi${staart}`;
};

/** Het pad van de bedanktpagina van het wetenschappelijk rapport, per taal. */
export const rapportBedanktPad = (taal: SupportedLanguage): string =>
  taal === "en" ? "/en/thank-you/scientific-report" : "/bedankt/wetenschappelijk-rapport";

/**
 * De berekening die de bedanktpagina moet laten zien.
 *
 * Deze gaat via sessionStorage en niet via de URL. Twee redenen. Bedragen en
 * bedrijfsgegevens horen niet in een adresbalk, want die belandt in logs, in
 * verwijzers en in de geschiedenis van een gedeelde computer. En een URL met
 * een bedrag erin nodigt uit om hem te veranderen.
 *
 * Niet via de router-state alleen, want die is weg zodra iemand de pagina
 * ververst of terugkomt via de geschiedenis. Dat is precies wat er gebeurt als
 * je de bedanktpagina als conversiedoel gebruikt en hem zelf komt controleren.
 */
export interface RoiOverdracht {
  /** Uniek per invulling. Voorkomt dat een verversing dubbel telt. */
  id: string;
  doelgroep: Doelgroep;
  resultaten: ROIResults;
  invoer: {
    aantalWerknemers: string;
    brutoJaarsalaris: string;
    verzuimPercentage: string;
    verloopPercentage: string;
  };
  /** Gehasht, nooit het adres zelf. Voor Enhanced Conversions. */
  emailHash: string | null;
}

const ROI_SLEUTEL = "innerleaps.roi-berekening";

export const bewaarRoiOverdracht = (overdracht: RoiOverdracht): void => {
  try {
    sessionStorage.setItem(ROI_SLEUTEL, JSON.stringify(overdracht));
  } catch {
    // Privémodus of opslag vol. De bedanktpagina valt dan terug op de versie
    // zonder bedrag. Vervelend, maar geen reden om de bezoeker te blokkeren.
  }
};

export const leesRoiOverdracht = (): RoiOverdracht | null => {
  try {
    const rauw = sessionStorage.getItem(ROI_SLEUTEL);
    if (!rauw) return null;
    const gelezen = JSON.parse(rauw) as RoiOverdracht;
    if (!gelezen?.resultaten?.scenarios?.conservative) return null;
    return gelezen;
  } catch {
    return null;
  }
};

/** Voor het rapport hoeven er geen cijfers mee, alleen het gehashte adres. */
export interface RapportOverdracht {
  id: string;
  emailHash: string | null;
}

const RAPPORT_SLEUTEL = "innerleaps.rapport-aanvraag";

export const bewaarRapportOverdracht = (overdracht: RapportOverdracht): void => {
  try {
    sessionStorage.setItem(RAPPORT_SLEUTEL, JSON.stringify(overdracht));
  } catch {
    // Zie hierboven.
  }
};

export const leesRapportOverdracht = (): RapportOverdracht | null => {
  try {
    const rauw = sessionStorage.getItem(RAPPORT_SLEUTEL);
    return rauw ? (JSON.parse(rauw) as RapportOverdracht) : null;
  } catch {
    return null;
  }
};

/** Een identificatie per invulling, met een uitwijk voor oudere browsers. */
export const nieuweId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

/**
 * Het e-mailadres gehasht, nooit in leesbare vorm.
 *
 * Enhanced Conversions in Google Ads werkt op een SHA-256 van het adres in
 * kleine letters. Dat hashen doen we hier en niet in een tagcontainer, want
 * er staat een tracker van Apollo op de site en die kan bij window.dataLayer.
 * Een adres dat er nooit in leesbare vorm in staat, kan ook niet weglekken.
 */
export const hashEmail = async (email: string): Promise<string | null> => {
  const schoon = email?.trim().toLowerCase();
  if (!schoon || typeof crypto === "undefined" || !crypto.subtle) return null;
  try {
    const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(schoon));
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return null;
  }
};
