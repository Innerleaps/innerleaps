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
 * Per conversieactie het label. De namen in het commentaar zijn precies de
 * namen zoals ze in Google Ads staan, zodat je ze naast elkaar kunt leggen
 * zonder in te loggen.
 */
const LABELS: Record<ConversieNaam, string> = {
  afspraak: "nHWPCP7PzPAcEOftptRE",  // Afspraak maken
  contactformulier: "oZTqCIHQzPAcEOftptRE",  // Contactformulier verzonden
  roiHr: "flRJCNTVzPAcEOftptRE",  // Rekentool HR
  roiManagement: "8TpMCNfVzPAcEOftptRE",  // Rekentool directie
  roiOnbekend: "66wDCNrVzPAcEOftptRE",  // Rekentool onbekend
  telefoon: "Y24qCN3VzPAcEOftptRE",  // Klik op telefoonnummer
  email: "uoEmCODVzPAcEOftptRE",  // Klik op e-mailadres
  bijlage: "SHCFCOPVzPAcEOftptRE",  // Wetenschappelijke bijlage
};

/** De volledige `send_to`-waarde, of null als het label nog niet bekend is. */
export const stuurNaar = (naam: ConversieNaam): string | null => {
  const label = LABELS[naam];
  return label ? `${ADS_ID}/${label}` : null;
};
