import { useEffect } from "react";
import PageSeo from "@/components/PageSeo";
import { useTranslation } from "react-i18next";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import StickyCtaButtons from "@/components/StickyCtaButtons";
import Footer from "@/components/Footer";
import MasterclassStepsSection from "@/components/MasterclassStepsSection";
import MethodHero from "@/components/MethodHero";
import TurnoutProofSection from "@/components/TurnoutProofSection";
import MechanismSection from "@/components/MechanismSection";
import TwoSystemsSection from "@/components/TwoSystemsSection";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { FileText, Play, Users } from "lucide-react";

// Images
import stressPrestatieImage from "@/assets/stress_prestatie_curve.webp";
import zesWekenBreintraining from "@/assets/6_weken_breintraining_voor_gedragsverandering.webp";

const DeMethode = () => {
  const { t } = useTranslation("methode");
  const prestatieRef = useIntersectionObserver({ threshold: 0.1 });
  const zesWekenRef = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PageSeo title={t("meta.title")} description={t("meta.description")} />
      <SimplifiedNavigation />
      <StickyCtaButtons />

      <MethodHero />
      <TurnoutProofSection />

      <MechanismSection />
      <TwoSystemsSection />

      {/* Verbeteren van prestaties */}
      <section
        ref={prestatieRef.ref}
        className={`section-padding bg-brand-off-white transition-all duration-1000 ${
          prestatieRef.isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container-custom space-y-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-8">
            {t("performance.titlePart1")} <span className="text-brand-orange">{t("performance.titlePart2")}</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="rounded-xl shadow-lg overflow-hidden order-2 lg:order-1">
              <img
                src={stressPrestatieImage}
                alt={t("performance.imageAlt")}
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">{t("performance.body1")}</p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">{t("performance.body2")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 weken voor gedragsverandering */}
      <section
        ref={zesWekenRef.ref}
        className={`section-padding bg-white transition-all duration-1000 ${
          zesWekenRef.isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container-custom space-y-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-8">
            {t("sixWeeks.titlePart1")} <span className="text-brand-orange">{t("sixWeeks.titlePart2")}</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">{t("sixWeeks.intro")}</p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Users className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1 mr-3" />
                  <span className="text-xl md:text-2xl text-brand-gray-medium">{t("sixWeeks.items.workshops")}</span>
                </li>
                <li className="flex items-start">
                  <FileText className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1 mr-3" />
                  <span className="text-xl md:text-2xl text-brand-gray-medium">{t("sixWeeks.items.workbook")}</span>
                </li>
                <li className="flex items-start">
                  <Play className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1 mr-3" />
                  <span className="text-xl md:text-2xl text-brand-gray-medium">{t("sixWeeks.items.audio")}</span>
                </li>
              </ul>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">{t("sixWeeks.outro")}</p>
            </div>
            <div className="rounded-xl shadow-lg overflow-hidden">
              <img
                src={zesWekenBreintraining}
                alt={t("sixWeeks.imageAlt")}
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
                width={600}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Masterclass Sectie */}
      <MasterclassStepsSection background="off-white" />

      <Footer />
    </div>
  );
};

export default DeMethode;
