/**
 * Het witte gat bij het openen van de site wegnemen.
 *
 * Wat er gebeurde, gemeten met een vier keer tragere processor:
 *
 *     924ms  de voorgebakken pagina staat op het scherm, 2665 tekens
 *    2504ms  React start en maakt #root leeg, er blijft 8 tekens over
 *    2654ms  React is klaar, 3469 tekens
 *
 * Die 8 tekens zijn het woord "Laden...". Elke pagina wordt met lazy() geladen,
 * dus zodra React begint valt hij terug op het laadscherm van Suspense, en gooit
 * daarmee de volledig opgemaakte pagina weg die er al stond. De bezoeker ziet
 * zijn pagina, dan wit, dan zijn pagina.
 *
 * De oplossing is niet om minder te laden maar om niets weg te gooien: we
 * onthouden wat er stond en tonen dat tijdens het gat. Het staat toch al in het
 * geheugen, dus het kost geen enkel extra verzoek.
 *
 * Alleen de eerste keer. Bij navigeren binnen de site hoort er wel een
 * laadscherm te komen, want dan is de oude pagina niet meer wat je wil zien.
 *
 * Let op: dit bestand moet worden ingeladen vóór createRoot().render(), anders
 * is #root al leeggemaakt. main.tsx importeert het daarom bovenaan.
 */

let voorgebakken = "";
let verbruikt = false;

try {
  voorgebakken = document.getElementById("root")?.innerHTML ?? "";
} catch {
  voorgebakken = "";
}

/** De HTML die er bij het openen stond, of een lege tekst als hij al op is. */
export const eersteSchermHtml = (): string => (verbruikt ? "" : voorgebakken);

/** Aanroepen zodra React zijn eerste pagina echt heeft neergezet. */
export const eersteSchermVerbruikt = (): void => {
  verbruikt = true;
  voorgebakken = "";
};
