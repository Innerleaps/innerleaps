import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { bookingPath } from "@/lib/booking";
import { detectLanguageFromPath } from "@/i18n/config";

const STEP_KEYS = ["intake", "masterclass", "cohort"] as const;

const IntakeSection = memo(() => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = detectLanguageFromPath(pathname);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom max-w-5xl space-y-10">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight">
            {t("intake.title")}
          </h2>
          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed max-w-3xl">
            {t("intake.intro")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-gray-200 border-t border-gray-200 pt-10">
          {STEP_KEYS.map((key) => (
            <div key={key} className="sm:px-8 first:sm:pl-0 last:sm:pr-0">
              <p className="font-mono uppercase tracking-wide text-base text-brand-blue mb-3">
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

        <div className="border-t border-gray-200 pt-8">
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
