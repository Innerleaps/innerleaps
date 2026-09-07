/**
 * De conversielabels uit Google Ads, op één plek.
 *
 * Je vindt ze in Google Ads onder Doelen, Conversies, klik op een actie, dan
 * Tagconfiguratie en "De tag zelf installeren". Daar staat een regel
 * `'send_to': 'AW-18430408423/...'`. Het stuk achter de schuine streep hoort
 * hieronder.
 *
 * Staat een label op een lege tekst, dan vuurt die conversie niet. Dat is met
 * opzet: liever niets meten dan naar een verkeerd label sturen, want dan tellen
 * twee verschillende leads als dezelfde en gaat je biedstrategie op ruis
 * sturen. De gebeurtenis voor Analytics gaat wel gewoon weg.
 */

/** Het account. Staat ook in index.html, in de config-regel van de Google tag. */
export const ADS_ID = "AW-18430408423";

export type ConversieNaam =
  | "afspraak"
  | "contactformulier"
  | "roiHr"
  | "roiManagement"
  | "roiOnbekend"
  | "telefoon"
  | "email"
  | "bijlage";

/**
 * Per conversieactie het label. Nog in te vullen zodra Bas ze uit Google Ads
 * heeft gehaald; de namen komen overeen met de namen die hij daar gebruikt.
 */
const LABELS: Record<ConversieNaam, string> = {
  afspraak: "",          // Afspraak maken
  contactformulier: "",  // Contactformulier verzonden
  roiHr: "",             // Rekentool HR
  roiManagement: "",     // Rekentool directie
  roiOnbekend: "",       // Rekentool onbekend
  telefoon: "",          // Klik op telefoonnummer
  email: "",             // Klik op e-mailadres
  bijlage: "",           // Wetenschappelijke bijlage
};

/** De volledige `send_to`-waarde, of null als het label nog niet bekend is. */
export const stuurNaar = (naam: ConversieNaam): string | null => {
  const label = LABELS[naam];
  return label ? `${ADS_ID}/${label}` : null;
};
