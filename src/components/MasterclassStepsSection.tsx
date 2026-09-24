import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Check, Phone, Presentation, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookingPath } from "@/lib/booking";
import { meldMasterclassKlik } from "@/lib/conversies";
import { detectLanguageFromPath } from "@/i18n/config";
import { JEROEN_PORTRET } from "@/lib/klantervaringen";
import masterclassPhoto1200 from "@/assets/masterclass-1200w.webp";
import masterclassPhoto800 from "@/assets/masterclass-800w.webp";
import masterclassPhotoFallback from "@/assets/masterclass-1200w.jpg";

const STEPS = [
  { key: "call", icon: Phone },
  { key: "masterclass", icon: Presentation },
  { key: "programme", icon: Users },
] as const;

/** Wat je in de masterclass ervaart. Staat bij stap 2 als showExperience aan staat. */
const EXPERIENCE_KEYS = ["stress", "attention", "reset"] as const;

interface MasterclassStepsSectionProps {
  /**
   * Voegt het oude blok "Ervaar het met onze vrijblijvende masterclass" hierin
   * samen: stap 2 somt op wat je team in de masterclass ervaart, en de review
   * van een deelnemer staat onder de foto. Voor de HR- en directiepagina's,
   * waar een bezoeker meer wil weten voordat hij aanvraagt.
   */
  showExperience?: boolean;
  /** Off-white als de sectie erboven wit is. De stapkaarten worden dan wit. */
  background?: "white" | "off-white";
}

const MasterclassStepsSection = memo(({ showExperience = false, background = "white" }: MasterclassStepsSectionProps) => {
  const offWhite = background === "off-white";
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = detectLanguageFromPath(pathname);

  return (
    <section
      id="masterclass"
      className={`scroll-mt-28 section-padding ${offWhite ? "bg-brand-off-white" : "bg-white"}`}
    >
      <div className="container-custom">
        {/* Kop over de volle breedte, ook over de foto, net als bij
            "Waarom organisaties voor ons kiezen". */}
        <div className="space-y-6 text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight">
            {t("masterclassSteps.headlinePart1")}{" "}
            <span className="text-brand-orange">{t("masterclassSteps.headlinePart2")}</span>
          </h2>
          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
            {t("masterclassSteps.intro")}
          </p>
        </div>

        <div className="grid lg:grid-cols-[5fr_6fr] gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          <div className="space-y-6">
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

            {showExperience && (
              <figure className="text-center lg:text-left">
                <div className="flex justify-center lg:justify-start gap-1" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-brand-orange fill-brand-orange" />
                  ))}
                </div>
                <blockquote className="mt-3 text-lg text-brand-gray-dark leading-relaxed">
                  {t("masterclass.review")}
                </blockquote>
                <figcaption className="mt-4 flex items-center justify-center lg:justify-start gap-3">
                  <img
                    src={JEROEN_PORTRET}
                    alt=""
                    className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
                    width={160}
                    height={160}
                    loading="lazy"
                  />
                  <cite className="not-italic text-base font-bold text-brand-gray-dark">
                    {t("masterclass.reviewer")}
                  </cite>
                </figcaption>
              </figure>
            )}
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              {STEPS.map(({ key, icon: Icon }) => (
                <div
                  key={key}
                  className={`flex items-start gap-5 ${offWhite ? "bg-white" : "bg-brand-off-white"} p-6 rounded-xl ${
                    showExperience && key === "masterclass" ? "border-2 border-brand-orange" : ""
                  }`}
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
                    {showExperience && key === "masterclass" && (
                      <ul className="mt-4 space-y-2">
                        {EXPERIENCE_KEYS.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <Check className="h-5 w-5 mt-1 flex-shrink-0 text-brand-orange" />
                            <span className="text-xl text-brand-gray-dark leading-relaxed">
                              {t(`masterclass.cards.${item}.employer`)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Link
              to={bookingPath(lang)}
              onClick={() => meldMasterclassKlik("onderaan")}
              className="block lg:inline-block"
            >
              <Button
                size="lg"
                variant="secondary"
                className="w-full lg:w-auto min-h-[44px] font-semibold py-3 px-8 rounded-lg text-base md:text-lg"
              >
                {t("masterclassSteps.cta")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

MasterclassStepsSection.displayName = "MasterclassStepsSection";

export default MasterclassStepsSection;
