/**
 * De offerteaanvraag: de primaire knop van de site, in de header, de hero en
 * de zwevende balk.
 *
 * Waarom een offerte en geen "plan een gesprek": kopers willen vroeg in hun
 * zoektocht een prijs weten en praten pas laat met een verkoper. Een
 * offerteaanvraag sluit aan bij de vraag die ze op dat moment hebben. Bas belt
 * daarna zelf om een gesprek te plannen, en op de bedanktpagina staat de agenda
 * voor wie niet wil wachten. Zie CLAUDE.md, kopje "Offerte aanvragen".
 */

import { offerteBedanktPad } from "@/lib/bedankt";
import type { SupportedLanguage } from "@/i18n/config";

/** Het formulier, per taal. Staat in ROUTE_MAP, zodat de taalknop werkt. */
export const offertePad = (taal: SupportedLanguage): string =>
  taal === "en" ? "/en/request-a-quote" : "/offerte-aanvragen";

/**
 * Pagina's waar de offerteknop niets te zoeken heeft: het formulier zelf en de
 * bedanktpagina erachter. Daar wijst een knop naar de plek waar je al bent.
 */
export const isOffertePagina = (pathname: string): boolean => {
  const pad = pathname.replace(/\/+$/, "") || "/";
  return (["nl", "en"] as const).some(
    (taal) => pad === offertePad(taal) || pad === offerteBedanktPad(taal),
  );
};

/**
 * Wat er met de link mee gaat: de pagina waar iemand op de knop drukte. Die
 * komt in de mail aan Bas, zodat hij weet of de aanvraag van de pagina over
 * verzuim kwam of van die over prestaties. Via de router-state en niet via de
 * URL, zodat het formulier één schoon adres houdt.
 */
export interface OfferteHerkomst {
  van?: string;
}
