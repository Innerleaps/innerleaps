import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Phone, Presentation, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookingPath } from "@/lib/booking";
import { detectLanguageFromPath } from "@/i18n/config";
import masterclassPhoto1200 from "@/assets/masterclass-1200w.webp";
import masterclassPhoto800 from "@/assets/masterclass-800w.webp";
import masterclassPhotoFallback from "@/assets/masterclass-1200w.jpg";

const STEPS = [
  { key: "call", icon: Phone },
  { key: "masterclass", icon: Presentation },
  { key: "programme", icon: Users },
] as const;

const MasterclassStepsSection = memo(() => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = detectLanguageFromPath(pathname);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-[5fr_6fr] gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          <picture>
            <source
              type="image/webp"
              srcSet={`${masterclassPhoto800} 800w, ${masterclassPhoto1200} 1200w`}
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <img
              src={masterclassPhotoFallback}
              alt={t("masterclassSteps.imageAlt")}
              width={1200}
              height={1500}
              loading="lazy"
              decoding="async"
              className="w-full h-full aspect-[4/3] lg:aspect-[4/5] object-cover object-[50%_30%] lg:object-center rounded-xl shadow-lg"
            />
          </picture>

          <div className="space-y-8">
            <div className="space-y-6 text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight">
                {t("masterclassSteps.headlinePart1")}{" "}
                <span className="text-brand-orange">{t("masterclassSteps.headlinePart2")}</span>
              </h2>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                {t("masterclassSteps.intro")}
              </p>
            </div>

            <div className="space-y-4">
              {STEPS.map(({ key, icon: Icon }) => (
                <div
                  key={key}
                  className="flex items-start gap-5 bg-brand-off-white p-6 rounded-xl"
                >
                  <div className="w-14 h-14 flex-shrink-0 bg-brand-orange/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-7 h-7 text-brand-orange" />
                  </div>
                  <div className="min-w-0">
                    <p className="tracking-wide text-base text-brand-blue">
                      {t(`masterclassSteps.steps.${key}.eyebrow`)}
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-brand-purple mb-2 break-words">
                      {t(`masterclassSteps.steps.${key}.title`)}
                    </h3>
                    <p className="text-xl text-brand-gray-medium leading-relaxed">
                      {t(`masterclassSteps.steps.${key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <Link to={bookingPath(lang)} className="block lg:inline-block">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full lg:w-auto font-semibold py-3 px-8 rounded-lg text-base md:text-lg"
                >
                  {t("masterclassSteps.cta")}
                </Button>
              </Link>
              <p className="text-base text-brand-gray-medium leading-relaxed">
                {t("masterclassSteps.note")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

MasterclassStepsSection.displayName = "MasterclassStepsSection";

export default MasterclassStepsSection;
