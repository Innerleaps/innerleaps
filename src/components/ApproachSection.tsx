import { memo } from "react";
import { useTranslation } from "react-i18next";

const STAT_KEYS = ["weeks", "liveHour", "dailyPractice", "groupSize"] as const;

const ApproachSection = memo(() => {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="space-y-10">
          <p className="font-subtitle uppercase tracking-widest text-base text-brand-gray-medium text-center">
            {t("approach.eyebrow")}
          </p>

          <div className="space-y-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight">
              {t("approach.title")}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-0 sm:divide-x sm:divide-gray-200 border-t border-gray-200 pt-10">
              {STAT_KEYS.map((key) => (
                <div key={key} className="sm:px-8 first:sm:pl-0 last:sm:pr-0">
                  <div className="text-4xl md:text-5xl font-bold text-brand-purple">
                    {t(`approach.stats.${key}.value`)}
                  </div>
                  <p className="mt-3 font-subtitle uppercase tracking-wide text-base text-brand-gray-medium">
                    {t(`approach.stats.${key}.label`)}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              {t("approach.paragraph")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

ApproachSection.displayName = "ApproachSection";

export default ApproachSection;
