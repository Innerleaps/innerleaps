/**
 * De omslagpunt-rekentool (keuze van Bas, 29-10-2026).
 *
 * De oude rekentool beloofde een besparing en rekende met 15 tot 21% minder
 * verzuim. Dat was een eigen rekensom, geen gemeten resultaat, en "bespaar ten
 * minste" is precies het soort toezegging dat de polis uitsluit. Zie CLAIMS.md.
 *
 * Deze rekent alleen uit wat vaststaat: wat de training kost tegenover de
 * loonsom. Daaruit volgt het omslagpunt, het punt waarop de training zich
 * terugverdient. Of dat punt gehaald wordt, beloven we niet.
 */
/** Wat de training per deelnemer kost, in euro's. */
export const PRIJS_PER_DEELNEMER = 575;
const WERKDAGEN_PER_JAAR = 260;

export interface OmslagpuntInvoer {
  aantalDeelnemers: number;
  brutoJaarsalaris: number;
}

export interface OmslagpuntResultaat {
  aantalDeelnemers: number;
  prijsPerDeelnemer: number;
  investering: number;
  loonsom: number;
  /** Zoveel procent meer productiviteit en de training is terugverdiend. */
  omslagpuntProcent: number;
  /** Of zoveel ziektedagen per deelnemer per jaar minder, alleen het doorbetaalde salaris gerekend. */
  omslagpuntDagen: number;
}

export const berekenOmslagpunt = ({ aantalDeelnemers, brutoJaarsalaris }: OmslagpuntInvoer): OmslagpuntResultaat => {
  const investering = aantalDeelnemers * PRIJS_PER_DEELNEMER;
  const loonsom = aantalDeelnemers * brutoJaarsalaris;
  return {
    aantalDeelnemers,
    prijsPerDeelnemer: PRIJS_PER_DEELNEMER,
    investering,
    loonsom,
    omslagpuntProcent: (investering / loonsom) * 100,
    omslagpuntDagen: PRIJS_PER_DEELNEMER / (brutoJaarsalaris / WERKDAGEN_PER_JAAR),
  };
};
