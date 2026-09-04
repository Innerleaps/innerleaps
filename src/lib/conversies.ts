/**
 * De conversiemeldingen van de twee lead generators.
 *
 * Er staat op dit moment geen Google Tag Manager op de site, dus deze duwen
 * naar een gewone array die niemand leest. Dat is met opzet: dataLayer is een
 * array, dus dit kan zonder container en werkt vanaf de dag dat die er wel is.
 * Zie CLAUDE.md, kopje "Meten".
 *
 * Twee dingen die hier bewust anders zijn dan de bestaande meldingen.
 *
 * 1. De rekentool en het rapport zijn twee gescheiden gebeurtenissen en horen
 *    twee gescheiden conversieacties te worden. De rekentool vraagt acht velden
 *    inclusief verzuim, personeelsomvang en salaris; het rapport vraagt er vijf
 *    zonder één bedrijfscijfer. Gooi je die op één hoop, dan stuurt Smart
 *    Bidding naar de goedkoopste van de twee en loopt de pijplijn vol met de
 *    lichtste leads. Dat is de standaardmanier waarop een Performance
 *    Max-campagne stukloopt.
 *
 * 2. Elke melding draagt een `transaction_id` en gaat maar één keer weg. Een
 *    bedanktpagina is een URL, en een URL wordt ververst, gedeeld en door
 *    jezelf bezocht om te controleren of de tag vuurt. Zonder deze rem telt
 *    elk van die keren als een nieuwe lead.
 */

import type { Doelgroep } from "@/lib/bedankt";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const VERZONDEN_SLEUTEL = "innerleaps.verzonden-conversies";

/** Welke meldingen deze sessie al weg zijn. */
const verzondenIds = (): string[] => {
  try {
    const rauw = sessionStorage.getItem(VERZONDEN_SLEUTEL);
    return rauw ? (JSON.parse(rauw) as string[]) : [];
  } catch {
    return [];
  }
};

const onthoudId = (id: string): void => {
  try {
    // Alleen de laatste twintig bewaren. Langer heeft geen zin en de opslag
    // van een sessie is niet oneindig.
    const bijgewerkt = [...verzondenIds(), id].slice(-20);
    sessionStorage.setItem(VERZONDEN_SLEUTEL, JSON.stringify(bijgewerkt));
  } catch {
    // Kan de browser niet onthouden, dan liever een keer dubbel gemeten dan
    // helemaal niet gemeten.
  }
};

const duwen = (id: string, gebeurtenis: Record<string, unknown>): void => {
  if (verzondenIds().includes(id)) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(gebeurtenis);
  onthoudId(id);
};

interface RoiMelding {
  id: string;
  doelgroep: Doelgroep;
  /** De netto besparing uit het voorzichtige scenario, afgerond op hele euro's. */
  besparingVoorzichtig: number;
  /** De netto besparing uit het positieve scenario, afgerond op hele euro's. */
  besparingPositief: number;
  aantalWerknemers: number;
  emailHash: string | null;
}

/**
 * De rekentool is ingevuld.
 *
 * De berekende besparing gaat mee als losse parameter en **niet** als
 * conversiewaarde. Verleidelijk om dat wel te doen, want je hebt het bedrag,
 * maar een waarde van twee ton per lead blaast elke bieding op doelrendement
 * op. De waarde hoort in Google Ads zelf te staan, vast per conversieactie.
 * Dit veld is er om achteraf te kunnen segmenteren op grootte.
 */
export const meldRoiLead = ({
  id,
  doelgroep,
  besparingVoorzichtig,
  besparingPositief,
  aantalWerknemers,
  emailHash,
}: RoiMelding): void => {
  duwen(id, {
    event: "roi_calculator_lead",
    transaction_id: id,
    doelgroep,
    besparing_voorzichtig: Math.round(besparingVoorzichtig),
    besparing_positief: Math.round(besparingPositief),
    aantal_werknemers: aantalWerknemers,
    // Google Ads verwacht deze naam letterlijk voor Enhanced Conversions.
    user_data: emailHash ? { sha256_email_address: emailHash } : undefined,
  });
};

/** Het wetenschappelijk rapport is aangevraagd. */
export const meldRapportLead = ({
  id,
  emailHash,
}: {
  id: string;
  emailHash: string | null;
}): void => {
  duwen(id, {
    event: "wetenschappelijk_rapport_lead",
    transaction_id: id,
    user_data: emailHash ? { sha256_email_address: emailHash } : undefined,
  });
};
