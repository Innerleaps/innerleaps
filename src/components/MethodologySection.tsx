import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import trainingImage from "@/assets/training_voor_betere_prestatie_minder_stress_en_lager_verzuim.png";
import trainingImageEn from "@/assets/braintraining_for_optimal_performance.png";
import { detectLanguageFromPath } from "@/i18n/config";

const MethodologySection = memo(() => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = detectLanguageFromPath(pathname);
  const methodHref = lang === 'en' ? '/en/method' : '/breintraining-methode';

  return (
    <section className="section-padding bg-white">
      <div className="container-custom space-y-24 md:space-y-32 lg:space-y-40">
        <div className="space-y-8 lg:space-y-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-brand-purple leading-tight">
            {t('methodology.headlinePart1')} <span className="text-brand-orange">{t('methodology.headlinePart2')} </span> {t('methodology.headlinePart3')}{" "}
            <span className="text-brand-orange">{t('methodology.headlinePart4')}</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                {t('methodology.body1')}
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                {t('methodology.body2')}
              </p>
              <br />
              <Link to={methodHref}>
                <Button variant="secondary" className="font-semibold py-3 px-8 rounded-lg text-base md:text-lg">
                  {t('cta.discoverMethod')}
                </Button>
              </Link>
            </div>
            <div>
              <img
                src={lang === 'en' ? trainingImageEn : trainingImage}
                alt={t('methodology.imageAlt')}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

MethodologySection.displayName = "MethodologySection";

export default MethodologySection;
