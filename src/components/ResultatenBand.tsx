import { useEffect, useRef, useState } from "react";

export interface ResultatenBandStat {
  value: string;
  label: string;
}

interface ResultatenBandProps {
  stats: ResultatenBandStat[];
}

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
const OplopendGetal = ({ value }: { value: string }) => {
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

/**
 * Drie cijfers op donkerpaars, het eerste in oranje, elk gecentreerd in zijn
 * eigen kolom. Afgeleid van de band onder de hero van de TheyDo-case
 * (KlantcaseTheydo.tsx op branch case-theydo), maar op verzoek van Bas kaal:
 * geen label erboven, geen strepen en geen bronregel, alleen het getal met
 * zijn onderschrift.
 */
const ResultatenBand = ({ stats }: ResultatenBandProps) => (
  <section className="bg-brand-purple py-12 md:py-16">
    <div className="container-custom grid gap-10 md:gap-8 md:grid-cols-3 text-center">
      {stats.map((stat, i) => (
        <div key={stat.value}>
          <p className={`text-6xl md:text-7xl font-bold ${i === 0 ? "text-brand-orange" : "text-white"}`}>
            <OplopendGetal value={stat.value} />
          </p>
          <p className="mt-3 text-xl leading-snug text-white/80 max-w-xs mx-auto">{stat.label}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ResultatenBand;
