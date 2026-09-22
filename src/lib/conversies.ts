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
import { stuurNaar, type ConversieNaam } from "@/lib/conversielabels";

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

/** Is deze lead al gemeld? Geldt voor Google Ads én Analytics tegelijk. */
const alGemeld = (id: string): boolean => verzondenIds().includes(id);

const duwen = (gebeurtenis: Record<string, unknown>): void => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(gebeurtenis);
};

/**
 * De conversie naar Google Ads, en de gebeurtenis naar Analytics.
 *
 * Drie dingen die hier bewust zo staan.
 *
 * Er gaat geen `value` mee. Dat lijkt onlogisch, want de conversies hébben een
 * waarde, maar die staat in Google Ads zelf. Een waarde die de site meestuurt
 * overschrijft die, en een meegestuurde nul maakt elke conversie nul euro waard.
 * Zo kan Bas de bedragen bijstellen zonder dat er code aan te pas komt.
 *
 * Het e-mailadres gaat gehasht mee, als `user_data`. Dat is wat Google
 * verwacht voor Enhanced Conversions, en het scheelt bij lage volumes het
 * verschil tussen een campagne die leert en een die stilvalt. Nooit het adres
 * zelf: er staat een tracker van Apollo op de site die bij window kan.
 *
 * En `transaction_id` gaat mee, zodat Google Ads dezelfde lead niet twee keer
 * telt als er onverhoopt toch een tweede melding komt.
 */
const naarGoogle = (
  naam: ConversieNaam,
  id: string,
  gaEvent: string,
  gaParams: Record<string, unknown>,
  emailHash: string | null,
): void => {
  if (typeof window.gtag !== "function") return;

  if (emailHash) {
    window.gtag("set", "user_data", { sha256_email_address: emailHash });
  }

  const doel = stuurNaar(naam);
  if (doel) {
    window.gtag("event", "conversion", { send_to: doel, transaction_id: id });
  }

  // Deze gaat altijd, ook zonder label. Zo staat je Analytics-rapportage vol
  // terwijl de kant van Google Ads nog wacht op de labels.
  window.gtag("event", gaEvent, gaParams);
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
  if (alGemeld(id)) return;

  naarGoogle(
    doelgroep === "hr" ? "roiHr" : doelgroep === "management" ? "roiManagement" : "roiOnbekend",
    id,
    "generate_lead",
    { doelgroep },
    emailHash,
  );

  duwen({
    event: "roi_calculator_lead",
    transaction_id: id,
    doelgroep,
    besparing_voorzichtig: Math.round(besparingVoorzichtig),
    besparing_positief: Math.round(besparingPositief),
    aantal_werknemers: aantalWerknemers,
    // Google Ads verwacht deze naam letterlijk voor Enhanced Conversions.
    user_data: emailHash ? { sha256_email_address: emailHash } : undefined,
  });
  onthoudId(id);
};

/** Het wetenschappelijk rapport is aangevraagd. */
export const meldRapportLead = ({
  id,
  emailHash,
}: {
  id: string;
  emailHash: string | null;
}): void => {
  if (alGemeld(id)) return;

  naarGoogle("bijlage", id, "generate_lead", { type: "bijlage" }, emailHash);

  duwen({
    event: "wetenschappelijk_rapport_lead",
    transaction_id: id,
    user_data: emailHash ? { sha256_email_address: emailHash } : undefined,
  });
  onthoudId(id);
};

/** Een afgeronde boeking in de agenda. */
export const meldAfspraak = (id: string, payload?: unknown): void => {
  if (alGemeld(id)) return;
  naarGoogle("afspraak", id, "book_appointment", {}, null);
  duwen({ event: "calendly_event_scheduled", transaction_id: id, calendly: payload });
  onthoudId(id);
};

/** Een verzonden bericht via het contactformulier. */
export const meldContactformulier = (id: string, emailHash: string | null): void => {
  if (alGemeld(id)) return;
  naarGoogle("contactformulier", id, "generate_lead", { type: "contactformulier" }, emailHash);
  duwen({ event: "contact_message_sent", transaction_id: id });
  onthoudId(id);
};

/**
 * Een klik op een masterclass-knop.
 *
 * Dit is geen conversie: er is nog niets ingevuld, de bezoeker gaat alleen op
 * weg. Daarom geen conversielabel en geen rem op herhaling, net als bij de
 * telefoon- en e-mailklikken hieronder. Eén gebeurtenisnaam voor alle drie de
 * plekken, met de positie als parameter, zodat ze binnen één trechter te
 * vergelijken zijn in plaats van als drie losse gebeurtenissen.
 */
export type MasterclassKnop = "hero" | "sticky" | "onderaan";

export const meldMasterclassKlik = (positie: MasterclassKnop): void => {
  duwen({ event: "masterclass_cta_click", positie });
};

/**
 * Klikken op het telefoonnummer en het e-mailadres.
 *
 * Eén luisteraar op document, met `closest`, zodat hij ook werkt bij links die
 * pas na het laden in de pagina komen. En één keer, niet per pagina: anders
 * vuurt de gebeurtenis twee keer.
 *
 * Elke klik telt hier als een eigen conversie, dus geen rem op herhaling. Dat
 * is met opzet: iemand die twee keer op je nummer tikt heeft twee keer de
 * intentie om te bellen, en deze twee staan in Google Ads als secundair, dus ze
 * sturen het bieden niet.
 */
let luisteraarsGezet = false;

export const zetKlikluisteraars = (): void => {
  if (luisteraarsGezet || typeof document === "undefined") return;
  luisteraarsGezet = true;

  document.addEventListener("click", (e) => {
    const doel = e.target as HTMLElement | null;
    const link = doel?.closest?.("a[href^='tel:'], a[href^='mailto:']") as HTMLAnchorElement | null;
    if (!link) return;

    const isTelefoon = link.getAttribute("href")!.startsWith("tel:");
    naarGoogle(
      isTelefoon ? "telefoon" : "email",
      `${isTelefoon ? "tel" : "mail"}-${Date.now()}`,
      isTelefoon ? "contact_phone" : "contact_email",
      {},
      null,
    );
  });
};
