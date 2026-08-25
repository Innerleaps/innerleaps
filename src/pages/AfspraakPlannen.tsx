import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import Footer from "@/components/Footer";
import PageSeo from "@/components/PageSeo";
import CalendlyWidget from "@/components/CalendlyWidget";
import HreflangTags from "@/i18n/HreflangTags";

/**
 * De boekingspagina. Alle "plan een gesprek met Bas"-knoppen op pagina's zonder
 * eigen widget komen hier uit.
 *
 * Bewust geen zwevende CTA-balk op deze pagina: die bevat zelf een knop naar
 * het plannen van een gesprek, en dat is hier waar je al bent.
 */
const AfspraakPlannen = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PageSeo
        title={t("booking.metaTitle")}
        description={t("booking.metaDescription")}
      />
      <HreflangTags />
      <SimplifiedNavigation />

      <main className="pt-8 pb-16">
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight">
                {t("booking.title")}
              </h1>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                {t("booking.intro")}
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <CalendlyWidget />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AfspraakPlannen;
