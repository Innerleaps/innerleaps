import { memo } from "react";
import { useTranslation } from "react-i18next";

const BARS = [
  { key: "stress", value: 68 },
  { key: "autopilot", value: 55 },
  { key: "fatigue", value: 55 },
  { key: "focus", value: 41 },
  { key: "rumination", value: 36 },
] as const;

const MAX_VALUE = Math.max(...BARS.map((bar) => bar.value));

const ResultsSection = memo(() => {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-brand-off-white">
      <div className="container-custom max-w-4xl space-y-10">
        <div className="space-y-4 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight">
            {t("results.title")}
          </h2>
          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
            {t("results.intro")}
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          {BARS.map((bar, index) => (
            <div
              key={bar.key}
              className={`grid grid-cols-[4.5rem_1fr] sm:grid-cols-[6rem_1fr] gap-x-6 items-start py-6 ${
                index !== 0 ? "border-t border-gray-200" : ""
              }`}
            >
              <div className="text-4xl md:text-5xl font-bold text-brand-purple tabular-nums">
                {bar.value}%
              </div>
              <div>
                <p className="text-xl md:text-2xl text-brand-gray-dark mb-3">
                  {t(`results.bars.${bar.key}`)}
                </p>
                <div
                  className="h-2 bg-brand-blue rounded-full"
                  style={{ width: `${(bar.value / MAX_VALUE) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="font-subtitle uppercase tracking-wide text-base text-brand-gray-medium text-center">
          {t("results.footnote")}
        </p>
      </div>
    </section>
  );
});

ResultsSection.displayName = "ResultsSection";

export default ResultsSection;
