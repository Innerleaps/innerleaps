/**
 * Getallen inlezen zoals Nederlanders ze opschrijven.
 *
 * Waarom dit nodig is. Met `<input type="number">` gaat het op twee manieren
 * mis, en de tweede is de gevaarlijkste:
 *
 *   ingetikt "5,2"      ->  el.value is ""      leeg veld dat gevuld lijkt
 *   ingetikt "39.700"   ->  parseFloat is 39.7  veertig euro jaarsalaris
 *
 * Die eerste zie je nog: de knop blijft uit en je snapt niet waarom. De tweede
 * zie je niet, want er rolt gewoon een berekening uit. Alleen klopt er niets
 * van, en dat merkt niemand.
 *
 * Daarom lezen we de velden als tekst en vertalen we ze hier. De punt is in het
 * Nederlands een duizendtalscheiding en de komma een decimaalteken, precies
 * andersom dan wat een `number`-veld verwacht.
 */

/**
 * Een kommagetal, zoals een percentage. Komma en punt gelden allebei als
 * decimaalteken, want mensen tikken van alles en 5,2 en 5.2 betekenen
 * hetzelfde. Onleesbare invoer geeft `null`, niet 0: nul is een geldig
 * antwoord en mag geen verkapte foutmelding worden.
 */
export const naarDecimaal = (waarde: string): number | null => {
  const schoon = waarde.trim().replace(/\s/g, "").replace(",", ".");
  if (!/^\d*\.?\d+$/.test(schoon)) return null;
  const getal = Number(schoon);
  return Number.isFinite(getal) ? getal : null;
};

/**
 * Een heel getal, zoals een bedrag of een aantal mensen. Punten, komma's en
 * spaties zijn hier altijd duizendtalscheidingen: niemand geeft een
 * jaarsalaris of een personeelsbestand met cijfers achter de komma op.
 */
export const naarGeheel = (waarde: string): number | null => {
  const schoon = waarde.trim().replace(/[.,\s]/g, "");
  if (!/^\d+$/.test(schoon)) return null;
  const getal = Number(schoon);
  return Number.isFinite(getal) ? getal : null;
};
