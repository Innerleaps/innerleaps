import { ReactNode } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { detectLanguageFromPath } from "@/i18n/config";
import {
  Brain,
  Heart,
  Shield,
  Smile,
  CheckCircle,
  AlertCircle,
  Activity,
  Moon,
  Frown,
  BedDouble,
  Award,
  Star,
  type LucideIcon,
} from "lucide-react";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import Footer from "@/components/Footer";
import StickyCtaButtons from "@/components/StickyCtaButtons";
import TrustSection from "@/components/TrustSection";
import ProgramOverviewSection from "@/components/ProgramOverviewSection";
import MasterclassSection from "@/components/MasterclassSection";

const ICON_MAP: Record<string, LucideIcon> = {
  Brain,
  Heart,
  Shield,
  Smile,
  CheckCircle,
  AlertCircle,
  Activity,
  Moon,
  Frown,
  BedDouble,
};

const Icon = ({ name }: { name: string }) => {
  const C = ICON_MAP[name] ?? AlertCircle;
  return <C className="h-8 w-8 text-brand-orange stroke-2" />;
};

export interface TrainingStat {
  label: string;
  value: string;
}

export interface TrainingChallenge {
  icon: string;
  title: string;
  text: string;
}

export interface TrainingResult {
  icon: string;
  title: string;
  bullets: string[];
}

export interface TrainingWeek {
  week: string;
  tags: string[];
  title: string;
  text: string;
}

export interface TrainingFaq {
  q: string;
  a: string;
}

export interface TrainingPageLayoutProps {
  /** i18n namespace + sub-key, e.g. "training:vitality" */
  tKey: string;
  heroImage: string;
  heroImageAlt: string;
  /** Optional hero CTA. Omit to hide the button entirely. */
  heroCtaOnClick?: () => void;
  /** Optional second CTA for hero */
  heroSecondaryCta?: { label: string; onClick: () => void };
  /** Logos for the marquee */
  logos: { src: string; alt: string }[];
  /** Optional "weeks" / program-detail block (shown above MasterclassSection) */
  weeksImage?: string;
  /** Variant for the MasterclassSection */
  masterclassVariant?: "employer" | "employee";
  /** Hide the MasterclassSection entirely */
  hideMasterclass?: boolean;
  /** Hide the floating sticky CTAs (StickyCtaButtons) */
  hideStickyCtas?: boolean;
  /** Show "Discover the method" CTA at the bottom of the weeks block */
  showMethodCtaAfterWeeks?: boolean;
  /** Optional extra section rendered just before the FAQ */
  extraSection?: ReactNode;
  /** Optional extra section after Footer (e.g. ROICalculator wrapper) */
  belowFaqSection?: ReactNode;
}

const TrainingPageLayout = ({
  tKey,
  heroImage,
  heroImageAlt,
  heroCtaOnClick,
  heroSecondaryCta,
  logos,
  weeksImage,
  masterclassVariant = "employer",
  hideMasterclass = false,
  hideStickyCtas = false,
  showMethodCtaAfterWeeks = false,
  extraSection,
  belowFaqSection,
}: TrainingPageLayoutProps) => {
  const { t } = useTranslation("training");
  const { t: tCommon } = useTranslation();
  const { pathname } = useLocation();
  const lang = detectLanguageFromPath(pathname);
  const methodHref = lang === "en" ? "/en/method" : "/breintraining-methode";

  // Helper to get array data
  const stats = t(`${tKey}.hero.stats`, { returnObjects: true }) as TrainingStat[];
  const challenges = t(`${tKey}.challenges.items`, { returnObjects: true }) as TrainingChallenge[];
  const results = t(`${tKey}.results.items`, { returnObjects: true }) as TrainingResult[];
  const weeks = t(`${tKey}.weeks.items`, { returnObjects: true }) as TrainingWeek[];
  const weekIntro = t(`${tKey}.weeks.intro`, { returnObjects: true }) as string[];
  const faqItems = t(`${tKey}.faq.items`, { returnObjects: true }) as TrainingFaq[];

  return (
    <div className="min-h-screen">
      <Helmet>
        <meta name="description" content={t(`${tKey}.meta.description`)} />
      </Helmet>
      <SimplifiedNavigation />
      {!hideStickyCtas && <StickyCtaButtons />}

      {/* Hero */}
      <section className="relative min-h-screen flex items-start sm:items-center overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={heroImageAlt}
            className="w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 w-full px-4 pt-20 pb-8 sm:px-6 sm:py-12 lg:py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start w-full overflow-hidden">
            <div className="w-full space-y-6 animate-fade-in text-center lg:text-left">
              <div className="w-full space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/50 text-brand-purple px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base md:text-lg font-medium backdrop-blur-sm">
                  <Award className="h-4 w-4" />
                  {t(`${tKey}.hero.badge`)}
                </div>

                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-heading break-words"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                >
                  <Trans
                    i18nKey={`${tKey}.hero.title`}
                    t={t}
                    components={[<span className="text-brand-orange" />]}
                  />
                </h1>
                <p
                  className="text-xl md:text-2xl text-blue-100 leading-relaxed break-words"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                >
                  {t(`${tKey}.hero.subtitle`)}
                </p>
              </div>

              {(heroCtaOnClick || heroSecondaryCta) && (
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center lg:justify-start">
                  {heroCtaOnClick && (
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange text-white hover:text-white font-semibold py-3 px-4 sm:py-4 sm:px-6 rounded-lg text-sm sm:text-base lg:text-lg shadow-xl"
                      onClick={heroCtaOnClick}
                    >
                      {t(`${tKey}.hero.cta`)}
                    </Button>
                  )}
                  {heroSecondaryCta && (
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-brand-purple font-semibold py-3 px-4 sm:py-4 sm:px-6 rounded-lg text-sm sm:text-base lg:text-lg shadow-xl"
                      onClick={heroSecondaryCta.onClick}
                    >
                      {heroSecondaryCta.label}
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="w-full relative animate-scale-in mt-6 lg:mt-0">
              <div className="w-full rounded-2xl p-4 sm:p-6 lg:p-8 max-w-full sm:max-w-md mx-auto bg-white/50 backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 text-brand-purple">
                      {t(`${tKey}.hero.statsTitle`)}
                    </h3>
                  </div>

                  <div className="w-full space-y-3 sm:space-y-4">
                    {stats.map((stat, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between w-full p-2.5 sm:p-3 lg:p-4 bg-brand-purple/90 rounded-lg"
                      >
                        <span
                          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                          className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-normal"
                        >
                          {stat.label}
                        </span>
                        <span className="text-brand-orange font-bold text-base sm:text-lg md:text-xl lg:text-2xl shrink-0">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://www.google.com/maps/place/Innerleaps/@52.1909763,5.2795551,7z/data=!4m8!3m7!1s0x41d7861255c94705:0x571bbf751b212eea!8m2!3d52.1909763!4d5.2795551!9m1!1b1!16s%2Fg%2F11y10xf1qm?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-3 sm:mt-4 block bg-brand-purple/90 backdrop-blur-sm rounded-lg p-2.5 sm:p-3 hover:bg-brand-purple transition-all group"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-white font-semibold text-lg">4,7 / 5</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-brand-orange text-brand-orange group-hover:scale-110 transition-transform"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-white text-sm text-center mt-1">Google Reviews</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mt-8 sm:mt-12 lg:mt-16">
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
              <div className="flex gap-8 animate-marquee-mobile md:animate-marquee-tablet">
                {logos.map((logo, index) => (
                  <img
                    key={index}
                    src={logo.src}
                    alt={logo.alt}
                    className="h-8 sm:h-10 md:h-12 object-contain flex-shrink-0 opacity-100 transition-all"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-16 md:py-24 bg-brand-off-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-6">
            <Trans
              i18nKey={`${tKey}.challenges.title`}
              t={t}
              components={[<span className="text-brand-orange" />]}
            />
          </h2>
          <p className="text-xl md:text-2xl text-brand-gray-medium text-center leading-relaxed mb-12">
            {t(`${tKey}.challenges.subtitle`)}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 max-w-6xl mx-auto">
            {challenges.map((c, i) => {
              // Center last card on the second row when 4 or 5 items
              const total = challenges.length;
              const offset =
                total === 5 && i === 3 ? "md:col-start-2"
                : total === 4 && i === 3 ? "md:col-start-3"
                : "";
              return (
                <div key={i} className={`md:col-span-2 ${offset} bg-white p-6 rounded-lg space-y-4`}>
                  <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                    <Icon name={c.icon} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">{c.title}</h3>
                  <p className="text-base md:text-lg text-brand-gray-medium text-center">{c.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-6">
            <Trans
              i18nKey={`${tKey}.results.title`}
              t={t}
              components={[<span className="text-brand-orange" />]}
            />
          </h2>
          <p className="text-xl md:text-2xl text-brand-gray-medium text-center leading-relaxed mb-12">
            {t(`${tKey}.results.subtitle`)}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 max-w-6xl mx-auto">
            {results.map((r, i) => {
              const total = results.length;
              const offset =
                total === 5 && i === 3 ? "md:col-start-2"
                : total === 4 && i === 3 ? "md:col-start-3"
                : "";
              return (
                <div key={i} className={`md:col-span-2 ${offset} bg-brand-off-white p-6 rounded-lg space-y-4`}>
                  <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                    <Icon name={r.icon} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">{r.title}</h3>
                  <div className="space-y-2">
                    {r.bullets.map((b, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <p className="text-base md:text-lg text-brand-gray-medium">{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Program Overview (shared, already i18n) */}
      <ProgramOverviewSection hideOutroCta={showMethodCtaAfterWeeks} />

      {/* Weeks */}
      {weeks && weeks.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-12">
              <Trans
                i18nKey={`${tKey}.weeks.title`}
                t={t}
                components={[<span className="text-brand-orange" />]}
              />
            </h2>

            {weeksImage && (
              <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-16">
                <div className="space-y-6 text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                  {weekIntro.map((p, i) => (
                    <p key={i}>
                      <Trans
                        i18nKey={`${tKey}.weeks.intro.${i}`}
                        t={t}
                        components={[<strong />]}
                      />
                    </p>
                  ))}
                </div>
                <div className="relative">
                  <img
                    src={weeksImage}
                    alt={t(`${tKey}.weeks.imageAlt`)}
                    className="w-full h-auto rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            )}

            <div className="max-w-3xl mx-auto space-y-6">
              {weeks.map((w, i) => (
                <div key={i} className="bg-brand-off-white p-6 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-brand-orange text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                      {w.week}
                    </span>
                    {w.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="bg-brand-purple text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-brand-gray-dark">{w.title}</h3>
                  <p className="text-lg text-brand-gray-medium leading-relaxed">{w.text}</p>
                </div>
              ))}
            </div>

            {showMethodCtaAfterWeeks && (
              <div className="text-center mt-12">
                <p className="text-xl text-brand-gray-medium mb-6">
                  {tCommon("programOverview.outroQuestion")}
                </p>
                <Link to={methodHref}>
                  <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white py-3 px-8 rounded-lg text-lg font-semibold">
                    {tCommon("cta.discoverMethod")}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Masterclass */}
      {!hideMasterclass && <MasterclassSection variant={masterclassVariant} />}

      {extraSection}

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-brand-off-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-12">
            {t(`${tKey}.faq.title`)}
          </h2>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i + 1}`} className="bg-white rounded-lg px-6">
                  <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-brand-gray-dark hover:text-brand-orange">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base md:text-lg text-brand-gray-medium leading-relaxed whitespace-pre-line">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <TrustSection variant="white" />

      {belowFaqSection}

      <Footer />
    </div>
  );
};

export default TrainingPageLayout;
