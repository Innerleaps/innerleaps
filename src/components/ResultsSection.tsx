import { memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

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
      </div>
    </section>
  );
});

ResultsSection.displayName = "ResultsSection";

export default ResultsSection;
