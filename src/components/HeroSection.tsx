import { lazy, Suspense, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookingPath } from "@/lib/booking";
import { detectLanguageFromPath } from "@/i18n/config";

import heroPhoto1200 from "@/assets/hero-1200w.webp";
import heroPhoto800 from "@/assets/hero-800w.webp";
import heroPhotoFallback from "@/assets/hero-1200w.jpg";

/* De donkere logovarianten. In src/data/clientLogos.ts staan de lichte, die
   waren voor de oude hero met foto-achtergrond en zijn op beige onzichtbaar. */
import spiritLogo from "@/assets/Vitaliteitsprogramma_Spirit.webp";
import vuLogo from "@/assets/Vitaliteitsprogramma_VU_amsterdam.webp";
import tele2Logo from "@/assets/Vitaliteitsprogramma_Tele2.webp";
import parnassiaLogo from "@/assets/Vitaliteitsprogramma_Parnassia_groep.webp";
import lentizLogo from "@/assets/Vitaliteitsprogramma_Lentiz.webp";
import denHaagLogo from "@/assets/Vitaliteitsprogramma_Gemeente_Den_Haag.webp";

const CalculatorModal = lazy(() => import("./CalculatorModal"));

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Innerleaps/@52.1909763,5.2795551,7z/data=!4m8!3m7!1s0x41d7861255c94705:0x571bbf751b212eea!8m2!3d52.1909763!4d5.2795551!9m1!1b1!16s%2Fg%2F11y10xf1qm?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D";

const LOGOS = [
  { src: spiritLogo, alt: "Vitaliteitstraining Spirit" },
  { src: vuLogo, alt: "Vitaliteitstraining VU Amsterdam" },
  { src: tele2Logo, alt: "Vitaliteitstraining Tele2" },
  { src: parnassiaLogo, alt: "Vitaliteitstraining Parnassia Groep" },
  { src: lentizLogo, alt: "Vitaliteitstraining Lentiz" },
  { src: denHaagLogo, alt: "Vitaliteitstraining Gemeente Den Haag" },
];

const HeroSection = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = detectLanguageFromPath(pathname);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <>
      {/* Geen id="home" hier: LandingPage zet die al op de wrapper eromheen. */}
      <section className="bg-brand-off-white">
        <div className="container-custom py-12 lg:py-20">
          <div className="grid lg:grid-cols-[7fr_5fr] gap-10 lg:gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-base font-semibold text-brand-purple shadow-lg">
                <Award className="h-4 w-4 text-brand-orange" />
                {t("hero.badge")}
              </div>

              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight text-balance">
                {t("hero.headlinePart1")}{" "}
                <span className="text-brand-orange">{t("hero.headlinePart2")}</span>{" "}
                {t("hero.headlinePart3")}
              </h1>

              <p className="mt-6 text-xl md:text-2xl text-brand-gray-medium leading-relaxed max-w-2xl">
                {t("hero.subtitle")}
              </p>

              {/* StickyCtaButtons gebruikt dit id als peilpunt: zodra deze rij
                  uit beeld is, verschijnt de zwevende rekentoolknop. */}
              <div
                id="hero-cta"
                className="mt-8 flex flex-col lg:flex-row lg:flex-wrap lg:items-center gap-4 lg:gap-6"
              >
                <Link to={bookingPath(lang)} className="block lg:inline-block">
                  <Button
                    size="lg"
                    className="w-full lg:w-auto min-h-[44px] font-semibold py-4 px-8 rounded-lg text-base lg:text-lg shadow-xl"
                  >
                    {t("hero.ctaPrimary")}
                  </Button>
                </Link>
                <button
                  type="button"
                  onClick={() => setIsCalculatorOpen(true)}
                  className="self-start text-base font-semibold text-brand-purple border-b-2 border-brand-orange/40 pb-0.5 hover:border-brand-orange transition-colors"
                >
                  {t("hero.calculatorLink")} <span aria-hidden="true">→</span>
                </button>
              </div>

              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 text-base text-brand-gray-medium hover:text-brand-purple transition-colors"
              >
                <span className="flex" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-brand-orange fill-brand-orange" />
                  ))}
                </span>
                <span>
                  <b className="font-semibold text-brand-purple">{t("hero.proofRating")}</b>{" "}
                  {t("hero.proofSuffix")}
                </span>
              </a>
            </div>

            <div className="relative">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${heroPhoto800} 800w, ${heroPhoto1200} 1200w`}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <img
                  src={heroPhotoFallback}
                  alt={t("hero.photoAlt")}
                  width={1200}
                  height={1500}
                  loading="eager"
                  /* Kleine letters met opzet: deze React-versie kent de
                     camelCase-variant niet en logt dan een waarschuwing. */
                  {...{ fetchpriority: "high" }}
                  decoding="async"
                  className="block w-full aspect-[4/3] lg:aspect-[4/5] object-cover object-[50%_45%] lg:object-[50%_40%] rounded-2xl shadow-xl"
                />
              </picture>

              <figure className="relative lg:absolute lg:left-0 lg:-translate-x-7 lg:bottom-7 -mt-7 lg:mt-0 mx-3 lg:mx-0 lg:max-w-[270px] bg-white rounded-xl p-4 shadow-xl">
                <blockquote className="font-body italic text-base text-brand-gray-dark leading-relaxed">
                  &ldquo;{t("hero.quote")}&rdquo;
                </blockquote>
                <figcaption className="mt-2 text-base text-brand-gray-medium">
                  <cite className="not-italic">{t("hero.quoteAuthor")}</cite>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        <div className="container-custom">
          <div className="border-t border-gray-200 pt-7 pb-12 text-center">
            <p className="uppercase tracking-wide text-base text-brand-gray-medium">
              {t("hero.trustedBy")}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:gap-x-11">
              {LOGOS.map((logo) => (
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-6 lg:h-7 w-auto object-contain grayscale opacity-80"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
      </Suspense>
    </>
  );
};

export default HeroSection;
