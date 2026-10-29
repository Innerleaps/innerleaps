import { useEffect, useRef, useState } from "react";

/** Hoe lang het oplopen duurt. Kort met opzet: het moet levendig voelen, niet
 *  als iets waar je op wacht. */
const DUUR_MS = 900;

/**
 * Splitst "+8,6%" in "+", 8.6 met één decimaal en komma, en "%". Zo telt het
 * getal op en blijven voor- en achtervoegsel en het decimaalteken van de taal
 * staan. Geen getal gevonden, dan geen animatie.
 */
const ontleed = (value: string) => {
  const match = value.match(/^([^\d]*)(\d+)(?:([.,])(\d+))?(.*)$/);
  if (!match) return null;
  const [, voor, heel, scheiding = "", decimaal = "", na] = match;
  return {
    voor,
    na,
    scheiding,
    decimalen: decimaal.length,
    doel: Number(`${heel}.${decimaal || "0"}`),
  };
};

/**
 * Een getal dat vanaf nul oploopt zodra het in beeld komt.
 *
 * De eerste render toont de eindwaarde. Daardoor staat in de geprerenderde
 * HTML het echte cijfer, voor Google en voor wie geen JavaScript heeft. Pas in
 * de browser zet hij het getal op nul en telt op zodra de band in beeld komt.
 * Wie "minder beweging" heeft ingesteld, ziet meteen de eindwaarde.
 */
export const OplopendGetal = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [tekst, setTekst] = useState(value);

  useEffect(() => {
    const getal = ontleed(value);
    const el = ref.current;
    if (!getal || !el) return;
    // Het prerenderen draait deze code ook, in een headless browser. Zonder
    // deze regel kwam daar "+0,0%" in de opgeslagen HTML te staan, want de band
    // komt daar nooit in beeld. Zie scripts/prerender.mjs.
    if ((window as unknown as { __PRERENDER__?: boolean }).__PRERENDER__) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const opmaak = (n: number) =>
      `${getal.voor}${n.toFixed(getal.decimalen).replace(".", getal.scheiding || ".")}${getal.na}`;

    let frame = 0;
    setTekst(opmaak(0));

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const stap = (nu: number) => {
          const t = Math.min((nu - start) / DUUR_MS, 1);
          // Snel beginnen en zacht landen.
          const voortgang = 1 - Math.pow(1 - t, 3);
          setTekst(t < 1 ? opmaak(getal.doel * voortgang) : value);
          if (t < 1) frame = requestAnimationFrame(stap);
        };
        frame = requestAnimationFrame(stap);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {tekst}
    </span>
  );
};

export default OplopendGetal;
