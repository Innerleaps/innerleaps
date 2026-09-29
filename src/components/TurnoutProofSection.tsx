import { memo, useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Check } from "lucide-react";

/** Hoeveel mensen naar de masterclass kwamen, en hoeveel er doorgingen. */
const TOTAL = 93;
const JOINED = 39;

/** Hoe lang het cijfer van 0 naar 39 telt. */
const COUNT_MS = 1100;

/**
 * Per stip iets later. Bij 93 stippen is de laatste dus krap een seconde na de
 * eerste, ongeveer even lang als het cijfer erboven aan het tellen is.
 */
const DOT_STEP_MS = 11;

const STEPS = ["invites", "schedule", "announce"] as const;

/**
 * Het bewijs dat mensen ook echt komen opdagen, naast de garantie.
 *
 * De stippen staan met opzet in één rij door: eerst de 39 oranje, dan de 54
 * gedempte. Daardoor loopt de animatie vanzelf van vol naar leeg, zonder dat
 * er per stip een volgorde uitgerekend hoeft te worden.
 */
const TurnoutProofSection = memo(() => {
  const { t } = useTranslation("methode");
  const cardsRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Zonder animatie meteen de eindstand, cijfer incluis.
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setStarted(true);
      setCount(JOINED);
      return;
    }

    const cards = cardsRef.current;
    if (!cards) return;

    let frame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setStarted(true);

        let begin: number | null = null;
        const tick = (now: number) => {
          if (begin === null) begin = now;
          const progress = Math.min((now - begin) / COUNT_MS, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * JOINED));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );

    observer.observe(cards);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom max-w-5xl">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight text-balance">
            <Trans
              i18nKey="turnout.title"
              t={t}
              components={[<span className="text-brand-orange" />]}
            />
          </h2>
          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed max-w-3xl mx-auto">
            {t("turnout.intro")}
          </p>
        </div>

        {/* items-stretch zodat beide kaarten even hoog zijn. De bronregel en de
            slotregel staan daarbinnen op mt-auto, dus ze liggen op één lijn. */}
        <div ref={cardsRef} className="mt-12 grid md:grid-cols-2 gap-8 items-stretch">
          <div className="flex flex-col bg-brand-purple text-white rounded-xl shadow-lg p-8">
            <p className="text-base font-bold text-white/70">{t("turnout.proof.label")}</p>

            <p className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span
                className={`text-5xl lg:text-6xl font-bold text-brand-orange leading-none tabular-nums transition-opacity duration-500 ${
                  started ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden="true"
              >
                {t("turnout.proof.figure", { count })}
              </span>
              {/* De eindstand staat apart voor een schermlezer, zodat die niet
                  het meetellende cijfer voorleest. */}
              <span className="sr-only">{t("turnout.proof.figure", { count: JOINED })}</span>
              <span
                className={`text-xl font-semibold text-white/70 transition-opacity duration-500 delay-[900ms] ${
                  started ? "opacity-100" : "opacity-0"
                }`}
              >
                {t("turnout.proof.share")}
              </span>
            </p>

            {/* Versiering: de verhouding staat er als tekst onder. */}
            <div
              className="mt-6 grid grid-cols-[repeat(16,minmax(0,1fr))] gap-1.5"
              aria-hidden="true"
            >
              {Array.from({ length: TOTAL }).map((_, i) => (
                <span
                  key={i}
                  style={{ transitionDelay: started ? `${i * DOT_STEP_MS}ms` : "0ms" }}
                  className={`aspect-square rounded-full transition-all duration-500 ${
                    i < JOINED ? "bg-brand-orange" : "bg-white/20"
                  } ${started ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
                />
              ))}
            </div>

            <p className="mt-6 text-xl leading-relaxed text-white/80">
              {t("turnout.proof.text")}
            </p>
            <p className="mt-auto pt-6 text-base text-white/70">{t("turnout.proof.source")}</p>
          </div>

          <div
            className={`flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-700 delay-150 ${
              started ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-4 bg-brand-orange/10 px-8 py-6">
              <div className="w-14 h-14 flex-shrink-0 bg-brand-orange rounded-full flex items-center justify-center">
                <Check className="w-7 h-7 text-white stroke-[3]" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-base font-bold text-brand-orange">
                  {t("turnout.guarantee.label")}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-brand-purple break-words">
                  {t("turnout.guarantee.title")}
                </h3>
              </div>
            </div>

            {/* pb-8 en niet py-6: de navy kaart ernaast heeft p-8, en zo liggen
                de bronregel daar en de slotregel hier op dezelfde hoogte. */}
            <div className="flex flex-col flex-1 px-8 pt-6 pb-8">
              <p className="text-xl text-brand-gray-medium leading-relaxed">
                {t("turnout.guarantee.intro")}
              </p>

              <ol className="mt-4 space-y-3">
                {STEPS.map((step, index) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="w-10 h-10 flex-shrink-0 bg-brand-orange/10 rounded-lg flex items-center justify-center text-base font-bold text-brand-orange">
                      {index + 1}
                    </span>
                    <span className="min-w-0 text-xl text-brand-gray-medium leading-relaxed">
                      {t(`turnout.guarantee.steps.${step}`)}
                    </span>
                  </li>
                ))}
              </ol>

              <p className="mt-auto pt-6 border-t border-gray-200 text-xl font-bold text-brand-purple leading-snug">
                {t("turnout.guarantee.closing")}
              </p>
            </div>
          </div>
        </div>

        <figure className="mt-12 pt-8 border-t border-gray-200 max-w-3xl mx-auto text-center">
          <blockquote className="text-xl md:text-2xl font-semibold text-brand-purple leading-snug">
            &ldquo;{t("turnout.quote.text")}&rdquo;
          </blockquote>
          <figcaption className="mt-3">
            <cite className="not-italic text-base text-brand-gray-medium">
              {t("turnout.quote.author")}
            </cite>
          </figcaption>
        </figure>
      </div>
    </section>
  );
});

TurnoutProofSection.displayName = "TurnoutProofSection";

export default TurnoutProofSection;
