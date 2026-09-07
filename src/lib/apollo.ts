/**
 * De bezoekerstracker van Apollo, achter de cookiekeuze.
 *
 * Deze stond in index.html en laadde altijd, dus ook bij een bezoeker die de
 * banner nog niet had gezien. Dat botste met wat de banner belooft: cookies
 * pas na akkoord. Nu start hij alleen als de bezoeker advertentiecookies heeft
 * toegestaan, want daar hoort hij thuis: hij herkent van welk bedrijf een
 * bezoeker komt, voor de acquisitie.
 *
 * Later laden dan de rest is hier geen probleem. Bij Google zou het dat wel
 * zijn, vandaar dat het consentblok daarvoor in index.html moet blijven staan.
 *
 * Meteen meegenomen: tijdens het prerenderen ligt er geen keuze in
 * localStorage, dus de bouwmachine laadt hem niet meer.
 */

import { leesToestemming } from "@/lib/toestemming";

const APP_ID = "691354c3d2251c00215e6dae";

let gestart = false;

export const startApolloAlsToegestaan = (): void => {
  if (gestart || typeof document === "undefined") return;
  if (!leesToestemming()?.advertenties) return;
  gestart = true;

  const script = document.createElement("script");
  script.src = `https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=${Math.random().toString(36).slice(2)}`;
  script.async = true;
  script.defer = true;
  script.onload = () => {
    (window as unknown as { trackingFunctions?: { onLoad: (o: { appId: string }) => void } })
      .trackingFunctions?.onLoad({ appId: APP_ID });
  };
  document.head.appendChild(script);
};
