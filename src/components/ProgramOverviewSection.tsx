import { memo } from "react";
import { Clock, Users, Target, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { detectLanguageFromPath } from "@/i18n/config";

const ProgramOverviewSection = memo(({ hideOutroCta = false }: { hideOutroCta?: boolean }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = detectLanguageFromPath(pathname);
  const methodHref = lang === 'en' ? '/en/method' : '/breintraining-methode';

  const features = [
    { icon: Clock, title: t('programOverview.features.weeklyWorkshops.title'), description: t('programOverview.features.weeklyWorkshops.description') },
    { icon: User, title: t('programOverview.features.accreditedTrainers.title'), description: t('programOverview.features.accreditedTrainers.description') },
    { icon: Target, title: t('programOverview.features.practice.title'), description: t('programOverview.features.practice.description') },
    { icon: Users, title: t('programOverview.features.safeLearning.title'), description: t('programOverview.features.safeLearning.description') },
  ];

  return (
    <section className="section-padding bg-brand-off-white">
      <div className="container-custom space-y-12">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-brand-purple">
          <span className="text-brand-orange">{t('programOverview.headlinePart1')}</span> {t('programOverview.headlinePart2')}{" "}
          <span className="text-brand-orange">{t('programOverview.headlinePart3')}</span>
        </h2>

        <div className="max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed text-center">
            {t('programOverview.intro')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-xl space-y-4 text-center">
                <div className="w-14 h-14 bg-brand-orange/10 rounded-lg flex items-center justify-center mx-auto">
                  <Icon className="w-7 h-7 text-brand-orange" />
                </div>
                <h3 className="text-2xl font-bold text-brand-purple">{feature.title}</h3>
                <p className="text-xl text-brand-gray-medium leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {!hideOutroCta && (
          <div className="text-center pt-4 lg:pt-12 space-y-6">
            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed py-[16px] px-0">
              {t('programOverview.outroQuestion')}
            </p>
            <Link to={methodHref}>
              <Button variant="secondary" className="font-semibold py-3 px-8 rounded-lg text-base md:text-lg">
                {t('cta.discoverMethod')}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
});

ProgramOverviewSection.displayName = "ProgramOverviewSection";

export default ProgramOverviewSection;
