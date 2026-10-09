import { memo, useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

/** Waar het cijfer naartoe telt. */
const TARGET = 9;

/** Duur en vertraging van het tellen, in milliseconden. */
const COUNT_MS = 1150;
const COUNT_DELAY_MS = 260;

/**
 * Eén cijfer, gecentreerd: hoeveel deelnemers het programma ook echt afmaken.
 *
 * Bewust zonder bronregel, garantieblok of knop. De sectie maakt één punt.
 */
const TurnoutProofSection = memo(() => {
  const { t } = useTranslation("methode");
  const sectionRef = useRef<HTMLDivElement>(null);
  /**
   * Het cijfer staat als los tekstknooppunt in de DOM en wordt hier
   * rechtstreeks gezet. Zo telt alleen het cijfer mee en blijft "in 10"
   * onaangeroerd, in plaats van dat React elk frame de hele regel opnieuw
   * opbouwt.
   */
  const digitRef = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Ook in JS controleren, niet alleen in CSS: anders telt het cijfer wel
    // maar zie je het niet bewegen.
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setStarted(true);
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    let timer = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setStarted(true);

        timer = window.setTimeout(() => {
          const digit = digitRef.current;
          if (!digit) return;

          // Pas hier op 0 zetten. Staat er geen JS, of vuurt de waarnemer
          // nooit, dan blijft gewoon de eindstand staan.
          digit.textContent = "0";

          let begin: number | null = null;
          const tick = (now: number) => {
            if (begin === null) begin = now;
            const progress = Math.min((now - begin) / COUNT_MS, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            digit.textContent = String(Math.round(TARGET * eased));
            if (progress < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        }, COUNT_DELAY_MS);
      },
      { threshold: 0.4 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="container-custom max-w-5xl text-center">
        {/* Twee regels, één zin per regel. Dat stuurt twee dingen:
            40ch (de langste zin telt zelf al 39 tekens, dus 32ch gaf altijd
            drie regels) en text-5xl als bovengrens. Op lg:text-6xl past een
            zin van 39 tekens simpelweg niet binnen de kolom. */}
        <h2 className="md:max-w-[40ch] mx-auto text-4xl md:text-5xl font-bold text-brand-purple leading-tight text-balance">
          {t("turnout.title")}
        </h2>

        <p className="mt-5 md:max-w-[56ch] mx-auto text-xl md:text-2xl text-brand-gray-medium leading-relaxed [text-wrap:pretty]">
          {t("turnout.intro")}
        </p>

        <div
          className={`mt-10 md:mt-12 max-w-[700px] mx-auto bg-brand-off-white border border-gray-200 rounded-2xl shadow-lg px-6 py-10 md:px-12 md:py-14 transition-all duration-[800ms] ease-[cubic-bezier(.19,1,.22,1)] motion-reduce:transition-none ${
            started ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[22px]"
          }`}
        >
          {/* De schermlezer krijgt de eindstand in één keer, uit de sr-only
              regel; het meetellende cijfer blijft voor hem verborgen. Een
              aria-label op deze <p> zou niet overal aankomen: zonder rol
              negeren de meeste schermlezers dat label. */}
          <p className="text-6xl sm:text-7xl lg:text-8xl font-bold text-brand-orange leading-none tracking-tight whitespace-nowrap">
            <span className="sr-only">{t("turnout.number.aria")}</span>
            <span ref={digitRef} aria-hidden="true">
              {TARGET}
            </span>
            <span aria-hidden="true"> {t("turnout.number.suffix")}</span>
          </p>

          <div
            aria-hidden="true"
            className={`mt-6 h-1 w-[min(320px,70%)] mx-auto origin-left rounded-full bg-brand-orange transition-transform duration-[1150ms] delay-[250ms] ease-[cubic-bezier(.19,1,.22,1)] motion-reduce:transition-none ${
              started ? "scale-x-100" : "scale-x-0"
            }`}
          />

          <p
            className={`mt-6 md:max-w-[36ch] mx-auto text-xl text-brand-gray-dark leading-relaxed transition-all duration-700 delay-500 ease-[cubic-bezier(.19,1,.22,1)] motion-reduce:transition-none ${
              started ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[10px]"
            }`}
          >
            <Trans
              i18nKey="turnout.caption"
              t={t}
              components={[<strong className="font-semibold text-brand-purple" />]}
            />
          </p>
        </div>
      </div>
    </section>
  );
});

TurnoutProofSection.displayName = "TurnoutProofSection";

export default TurnoutProofSection;
