import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, Clock, Repeat, Users } from "lucide-react";

const STATS = [
  { key: "weeks", icon: Calendar },
  { key: "liveHour", icon: Clock },
  { key: "dailyPractice", icon: Repeat },
  { key: "groupSize", icon: Users },
] as const;

const ApproachSection = memo(() => {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="space-y-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight">
            {t("approach.title")}
          </h2>

          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed text-center max-w-3xl mx-auto">
            {t("approach.intro")}
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {STATS.map(({ key, icon: Icon }) => (
              <div key={key} className="min-w-0 bg-brand-off-white p-6 rounded-xl text-center space-y-2">
                <div className="w-14 h-14 bg-brand-orange/10 rounded-lg flex items-center justify-center mx-auto">
                  <Icon className="w-7 h-7 text-brand-orange" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-brand-purple">
                  {t(`approach.stats.${key}.value`)}
                </div>
                <p className="tracking-wide text-base text-brand-gray-medium">
                  {t(`approach.stats.${key}.label`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

ApproachSection.displayName = "ApproachSection";

export default ApproachSection;
