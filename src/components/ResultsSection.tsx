import { memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Quote } from "lucide-react";
import { THEYDO_LOGO, THEYDO_PORTRET } from "@/lib/klantervaringen";

const HIGHLIGHT_VALUE = 68;

const BARS = [
  { key: "autopilot", value: 55 },
  { key: "fatigue", value: 55 },
  { key: "focus", value: 41 },
  { key: "rumination", value: 36 },
] as const;

const ResultsSection = memo(() => {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setFilled(true);
      return;
    }

    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setFilled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding bg-brand-off-white">
      <div className="container-custom max-w-5xl space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight text-balance">
            {t("results.title")}
          </h2>
          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed max-w-3xl mx-auto">
            {t("results.intro")}
          </p>
        </div>

        <div className="space-y-6">
          <div
            ref={cardRef}
            className="grid md:grid-cols-[5fr_7fr] bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-brand-purple text-white p-8 md:p-10 flex flex-col justify-center">
              <p className="text-7xl lg:text-8xl font-bold text-brand-orange leading-none">
                {HIGHLIGHT_VALUE}%
              </p>
              <p className="mt-4 text-xl md:text-2xl font-semibold leading-snug">
                {t("results.highlight.label")}
              </p>
              <p className="mt-3 text-base text-white/70 leading-relaxed">
                {t("results.highlight.context")}
              </p>
            </div>

            <ul className="p-8 md:p-10 flex flex-col justify-center">
              {BARS.map((bar, index) => (
                <li
                  key={bar.key}
                  className={`py-5 ${index !== 0 ? "border-t border-gray-200" : ""}`}
                >
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <span className="text-xl text-brand-gray-dark">
                      {t(`results.bars.${bar.key}`)}
                    </span>
                    <span className="text-2xl font-bold text-brand-purple tabular-nums shrink-0">
                      {bar.value}%
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-200 overflow-hidden" aria-hidden="true">
                    <div
                      className="h-full rounded-full bg-brand-orange transition-[width] duration-700 ease-out motion-reduce:transition-none"
                      style={{ width: filled ? `${bar.value}%` : "0%" }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* De quote hoort bij de cijfers: geen eigen sectie of achtergrond,
              maar direct eronder en even breed als het cijferblok. */}
          <figure className="bg-white rounded-xl shadow-lg p-8 md:p-10">
            <div
              className="w-14 h-14 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-5"
              aria-hidden="true"
            >
              <Quote className="w-7 h-7 text-brand-orange" />
            </div>

            <blockquote className="text-2xl md:text-3xl font-semibold text-brand-purple leading-snug text-balance">
              &ldquo;{t("testimonial.quote")}&rdquo;
            </blockquote>

            <figcaption className="mt-7 pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div className="flex items-center gap-4">
                <img
                  src={THEYDO_PORTRET}
                  alt="Jochem van der Veen"
                  className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
                  width={160}
                  height={160}
                  loading="lazy"
                />
                <div>
                  <cite className="not-italic block text-xl font-bold text-brand-gray-dark">
                    {t("bookingTrust.author")}
                  </cite>
                  <span className="block text-xl text-brand-gray-medium">
                    {t("bookingTrust.role")}
                  </span>
                </div>
              </div>

              <img
                src={THEYDO_LOGO}
                alt="TheyDo"
                className="h-10 w-auto self-start sm:self-auto"
                width={200}
                height={111}
                loading="lazy"
              />
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
});

ResultsSection.displayName = "ResultsSection";

export default ResultsSection;
