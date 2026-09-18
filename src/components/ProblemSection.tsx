import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Mic, Presentation, Smartphone } from "lucide-react";

const CARDS = [
  { key: "mindfulness", icon: Mic },
  { key: "stress", icon: Presentation },
  { key: "app", icon: Smartphone },
] as const;

const ProblemSection = memo(() => {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-brand-off-white">
      <div className="container-custom">
        <div className="space-y-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight">
            {t("problem.title")}
          </h2>

          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed text-center max-w-3xl mx-auto">
            {t("problem.triedThreeThings")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {CARDS.map(({ key, icon: Icon }) => (
              <div key={key} className="min-w-0 bg-white p-8 rounded-xl shadow-lg">
                <div className="w-14 h-14 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-brand-orange" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-brand-purple mb-2 break-words">
                  {t(`problem.cards.${key}.title`)}
                </h3>
                <p className="text-xl leading-relaxed">
                  <span className="text-brand-gray-dark">{t(`problem.cards.${key}.lead`)}</span>{" "}
                  <span className="text-brand-gray-medium">{t(`problem.cards.${key}.fade`)}</span>
                </p>
              </div>
            ))}
          </div>

          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed text-center max-w-3xl mx-auto">
            {t("problem.closingLine")}
          </p>
        </div>
      </div>
    </section>
  );
});

ProblemSection.displayName = "ProblemSection";

export default ProblemSection;
