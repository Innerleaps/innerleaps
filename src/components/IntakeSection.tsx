import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Phone, Presentation, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookingPath } from "@/lib/booking";
import { detectLanguageFromPath } from "@/i18n/config";

const STEPS = [
  { key: "intake", icon: Phone },
  { key: "masterclass", icon: Presentation },
  { key: "cohort", icon: Users },
] as const;

const IntakeSection = memo(() => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = detectLanguageFromPath(pathname);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom space-y-10">
        <div className="space-y-6 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight">
            {t("intake.title")}
          </h2>
          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
            {t("intake.intro")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {STEPS.map(({ key, icon: Icon }) => (
            <div key={key} className="bg-brand-off-white p-8 rounded-xl shadow-lg">
              <div className="w-14 h-14 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-7 h-7 text-brand-orange" />
              </div>
              <p className="font-subtitle tracking-wide text-base text-brand-blue mb-2">
                {t(`intake.steps.${key}.eyebrow`)}
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-brand-purple mb-2">
                {t(`intake.steps.${key}.title`)}
              </h3>
              <p className="text-xl text-brand-gray-medium leading-relaxed">
                {t(`intake.steps.${key}.description`)}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to={bookingPath(lang)}>
            <Button
              size="lg"
              variant="secondary"
              className="font-semibold py-3 px-8 rounded-lg text-base md:text-lg"
            >
              {t("intake.cta")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
});

IntakeSection.displayName = "IntakeSection";

export default IntakeSection;
