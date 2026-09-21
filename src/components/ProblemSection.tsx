import { memo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ArrowDown, Mic, Presentation, Smartphone } from "lucide-react";

const CARDS = [
  { key: "mindfulness", icon: Mic },
  { key: "stress", icon: Presentation },
  { key: "app", icon: Smartphone },
] as const;

const ProblemSection = memo(() => {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-brand-purple text-white">
      <div className="container-custom">
        <div className="space-y-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight text-balance">
            {t("problem.title")}
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
            {t("problem.triedThreeThings")}
          </p>

          {/* Drie kolommen pas vanaf md. Op sm werd een kaart zo smal dat
              "stressworkshop" middenin het woord afbrak. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {CARDS.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="min-w-0 bg-white/[0.07] border border-white/15 p-8 rounded-xl"
              >
                <div className="w-14 h-14 bg-brand-orange/20 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-brand-orange" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 break-words">
                  {t(`problem.cards.${key}.title`)}
                </h3>
                <p className="text-xl leading-relaxed">
                  <span className="text-white">{t(`problem.cards.${key}.lead`)}</span>{" "}
                  <span className="text-gray-400">{t(`problem.cards.${key}.fade`)}</span>
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 text-center space-y-4">
            <p className="text-xl md:text-2xl font-bold text-white leading-snug text-balance max-w-3xl mx-auto">
              <Trans
                i18nKey="problem.closingLine"
                t={t}
                components={[<span className="text-brand-orange" />]}
              />
            </p>
            <ArrowDown className="h-6 w-6 text-brand-orange mx-auto" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
});

ProblemSection.displayName = "ProblemSection";

export default ProblemSection;
