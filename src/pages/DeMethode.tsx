import { useEffect, useState, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import StickyCtaButtons from "@/components/StickyCtaButtons";
import Footer from "@/components/Footer";
import MasterclassSection from "@/components/MasterclassSection";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import {
  Brain,
  Target,
  Lightbulb,
  Shield,
  Zap,
  Heart,
  AlertCircle,
  Eye,
  CheckCircle,
  Users,
  FileText,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Images
import controlecentrumImage from "@/assets/Concentratietraining_voor_sterker_executieve_systeem.png";
import waarschuwingssysteemImage from "@/assets/stressmanagementtraining_sterker_waarschuwingssysteem.png";
import stressmanagementEnConcentratie from "@/assets/stressmanagement_en_concentratietraining.png";
import stressPrestatieImage from "@/assets/stress_prestatie_curve.png";
import zesWekenBreintraining from "@/assets/6_weken_breintraining_voor_gedragsverandering.jpg";

// Lazy load modal
const LeadMagnetModal = lazy(() => import("@/components/LeadMagnetModal"));

const CARD_ICONS_CONTROL = [Brain, Target, Lightbulb, Shield, Zap] as const;
const CARD_ICONS_WARNING = [Heart, AlertCircle, Eye] as const;

const DeMethode = () => {
  const { t } = useTranslation("methode");
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState(false);
  const heroRef = useIntersectionObserver({ threshold: 0.1 });
  const pushUpsRef = useIntersectionObserver({ threshold: 0.1 });
  const controleRef = useIntersectionObserver({ threshold: 0.1 });
  const waarschuwingRef = useIntersectionObserver({ threshold: 0.1 });
  const rapportRef = useIntersectionObserver({ threshold: 0.1 });
  const prestatieRef = useIntersectionObserver({ threshold: 0.1 });
  const zesWekenRef = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const controlCardKeys = ["info", "focus", "thinking", "filter", "easier"] as const;
  const warningCardKeys = ["body", "emotion", "self"] as const;

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <meta name="description" content={t("meta.description")} />
      </Helmet>
      <SimplifiedNavigation />
      <StickyCtaButtons />

      {/* Hero */}
      <section
        ref={heroRef.ref}
        className={`section-padding bg-white transition-opacity duration-1000 ${
          heroRef.isIntersecting ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container-custom text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight">
            <span className="text-brand-orange">{t("hero.titlePart1")}</span> {t("hero.titlePart2")}
          </h1>
          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">{t("hero.body")}</p>
        </div>
      </section>

      {/* Push-ups voor je brein */}
      <section
        ref={pushUpsRef.ref}
        className={`section-padding bg-white transition-all duration-1000 ${
          pushUpsRef.isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container-custom space-y-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-8">
            <span className="text-brand-orange">{t("pushUps.titlePart1")}</span> {t("pushUps.titlePart2")}
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="rounded-xl shadow-lg overflow-hidden order-2 lg:order-1">
              <img
                src={stressmanagementEnConcentratie}
                alt={t("pushUps.imageAlt")}
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">{t("pushUps.body1")}</p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">{t("pushUps.body2")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Krachtiger controlecentrum */}
      <section
        ref={controleRef.ref}
        className={`pt-8 pb-16 md:pb-20 lg:pb-28 bg-white transition-all duration-1000 ${
          controleRef.isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container-custom space-y-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-8">
            {t("control.titlePart1")} <span className="text-brand-orange">{t("control.titlePart2")}</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">{t("control.body1")}</p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">{t("control.body2")}</p>
            </div>
            <div className="rounded-xl shadow-lg overflow-hidden">
              <img src={controlecentrumImage} alt={t("control.imageAlt")} className="w-full h-auto object-cover" />
            </div>
          </div>

          {/* 5 Feature Cards */}
          <div className="grid md:grid-cols-6 gap-6 lg:gap-8">
            {controlCardKeys.map((key, idx) => {
              const Icon = CARD_ICONS_CONTROL[idx];
              const items = t(`control.cards.${key}.items`, { returnObjects: true }) as string[];
              const colSpanClass =
                key === "filter" ? "md:col-span-2 md:col-start-2" : "md:col-span-2";
              return (
                <div key={key} className={`bg-brand-off-white p-6 rounded-lg space-y-4 ${colSpanClass}`}>
                  <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                    <Icon className="h-8 w-8 text-brand-orange stroke-2" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                    {t(`control.cards.${key}.title`)}
                  </h3>
                  <div className="space-y-3">
                    {items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                        <span className="text-base md:text-lg text-brand-gray-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Scherper waarschuwingssysteem */}
      <section
        ref={waarschuwingRef.ref}
        className={`section-padding bg-white transition-all duration-1000 ${
          waarschuwingRef.isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container-custom space-y-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-8">
            {t("warning.titlePart1")} <span className="text-brand-orange">{t("warning.titlePart2")}</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">{t("warning.body1")}</p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">{t("warning.body2")}</p>
            </div>
            <div className="rounded-xl shadow-lg overflow-hidden">
              <img
                src={waarschuwingssysteemImage}
                alt={t("warning.imageAlt")}
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
              />
            </div>
          </div>

          {/* 3 Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {warningCardKeys.map((key, idx) => {
              const Icon = CARD_ICONS_WARNING[idx];
              const items = t(`warning.cards.${key}.items`, { returnObjects: true }) as string[];
              return (
                <div key={key} className="bg-brand-off-white p-6 rounded-lg space-y-4">
                  <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                    <Icon className="h-8 w-8 text-brand-orange stroke-2" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                    {t(`warning.cards.${key}.title`)}
                  </h3>
                  <div className="space-y-3">
                    {items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                        <span className="text-base md:text-lg text-brand-gray-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Wetenschappelijk rapport */}
      <section
        ref={rapportRef.ref}
        className={`section-padding bg-white transition-all duration-1000 ${
          rapportRef.isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container-custom">
          <div className="bg-brand-blue rounded-xl p-8 shadow-lg">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full">
                <FileText className="h-8 w-8 text-brand-orange" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{t("report.title")}</h2>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">{t("report.body")}</p>
              <Button
                onClick={() => setIsLeadMagnetOpen(true)}
                className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold text-lg px-8 py-6"
              >
                <FileText className="mr-2 h-5 w-5" />
                {t("report.cta")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Verbeteren van prestaties */}
      <section
        ref={prestatieRef.ref}
        className={`section-padding bg-white transition-all duration-1000 ${
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
                  <Activity className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1 mr-3" />
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
      <MasterclassSection variant="employer" />

      <Footer />

      <Suspense fallback={null}>
        <LeadMagnetModal isOpen={isLeadMagnetOpen} onClose={() => setIsLeadMagnetOpen(false)} />
      </Suspense>
    </div>
  );
};

export default DeMethode;
