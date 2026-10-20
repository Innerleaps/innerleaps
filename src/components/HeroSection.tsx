import { lazy, Suspense, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { offertePad } from "@/lib/offerte";
import { meldOfferteKlik } from "@/lib/conversies";
import { detectLanguageFromPath } from "@/i18n/config";
import { THEYDO_PORTRET } from "@/lib/klantervaringen";

import heroPhoto1200 from "@/assets/hero-1200w.webp";
import heroPhoto800 from "@/assets/hero-800w.webp";
import heroPhotoFallback from "@/assets/hero-1200w.jpg";

/* De donkere logovarianten. In src/data/clientLogos.ts staan de lichte, die
   waren voor de oude hero met foto-achtergrond en zijn op beige onzichtbaar. */
import theydoLogo from "@/assets/Vitaliteitsprogramma_TheyDo.webp";
import vuLogo from "@/assets/Vitaliteitsprogramma_VU_amsterdam.webp";
import tele2Logo from "@/assets/Vitaliteitsprogramma_Tele2.webp";
import parnassiaLogo from "@/assets/Vitaliteitsprogramma_Parnassia_groep.webp";
import lentizLogo from "@/assets/Vitaliteitsprogramma_Lentiz.webp";
import denHaagLogo from "@/assets/Vitaliteitsprogramma_Gemeente_Den_Haag.webp";

const CalculatorModal = lazy(() => import("./CalculatorModal"));

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Innerleaps/@52.1909763,5.2795551,7z/data=!4m8!3m7!1s0x41d7861255c94705:0x571bbf751b212eea!8m2!3d52.1909763!4d5.2795551!9m1!1b1!16s%2Fg%2F11y10xf1qm?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D";

const LOGOS = [
  { src: theydoLogo, alt: "TheyDo" },
  { src: vuLogo, alt: "VU Amsterdam" },
  { src: tele2Logo, alt: "Tele2" },
  { src: parnassiaLogo, alt: "Parnassia Groep" },
  { src: lentizLogo, alt: "Lentiz" },
  { src: denHaagLogo, alt: "Gemeente Den Haag" },
];

export interface HeroPhoto {
  /** WebP-bronnen voor srcSet, bijvoorbeeld `${klein} 800w, ${groot} 1200w`. */
  srcSet: string;
  /** JPEG voor browsers zonder WebP. */
  fallback: string;
  width: number;
  height: number;
  alt: string;
  /** Verhouding, uitsnede en eventueel spiegelen. */
  className: string;
  /**
   * Waar de quote over de foto valt. "top-right" voor een foto met de mensen
   * onderin: de quote staat dan op een leeg stuk, dekt niemand af en staat niet
   * vlak naast de kop.
   */
  quotePosition?: "top-right" | "bottom-left";
}

interface HeroSectionProps {
  /** De h1. Zonder dit staat de kop van home er. */
  title?: ReactNode;
  /** Het labeltje boven de kop. Zonder dit staat dat van home er. */
  badge?: string;
  subtitle?: string;
  /** Zonder dit staat de foto van home er. */
  photo?: HeroPhoto;
  /**
   * Eigen logorij voor deze pagina. Zonder dit staan de logo's van home er.
   * Gebruik de donkere varianten: de hero is lichtbeige.
   */
  logos?: { src: string; alt: string; className?: string }[];
  /**
   * Vervangt de link naar de verzuimrekenmachine naast de offerteknop. Op de
   * scale-up-pagina, waar verzuim geen ingang is, wijst hij naar de klantcase.
   */
  secondaryLink?: { label: string; to: string };
  /**
   * Een andere uitspraak van Jochem op de foto dan op home. Op de pagina voor
   * de publieke sector staat zijn slaapquote, want zijn productiviteitsquote
   * zegt die lezer niets. Portret en naam blijven dezelfde.
   */
  photoQuote?: string;
  /**
   * Logo's in hun eigen kleuren in plaats van grijs. Op verzoek van Bas voor
   * de publieke sector, waar herkenbare namen als de politie en de gemeente
   * het bewijs zijn. Gebruik dan logo's met een transparante achtergrond,
   * anders staat er een wit vlak op de beige hero.
   */
  colourLogos?: boolean;
}

const HeroSection = ({ title, badge, subtitle, photo, logos = LOGOS, secondaryLink, photoQuote, colourLogos = false }: HeroSectionProps = {}) => {
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
                {badge ?? t("hero.badge")}
              </div>

              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight text-balance">
                {title ?? (
                  <Trans
                    i18nKey="hero.title"
                    t={t}
                    components={[<span className="text-brand-orange" />]}
                  />
                )}
              </h1>

              <p className="mt-6 text-xl md:text-2xl text-brand-gray-medium leading-relaxed max-w-2xl">
                {subtitle ?? t("hero.subtitle")}
              </p>

              {/* StickyCtaButtons gebruikt dit id als peilpunt: zodra deze rij
                  uit beeld is, verschijnt de zwevende offerteknop. */}
              <div
                id="hero-cta"
                className="mt-8 flex flex-col lg:flex-row lg:flex-wrap lg:items-center gap-4 lg:gap-6"
              >
                <Link
                  to={offertePad(lang)}
                  state={{ van: pathname }}
                  onClick={() => meldOfferteKlik("hero")}
                  className="block lg:inline-block"
                >
                  <Button
                    size="lg"
                    className="w-full lg:w-auto min-h-[44px] font-semibold py-4 px-8 rounded-lg text-base lg:text-lg shadow-xl"
                  >
                    {t("cta.requestQuote")}
                  </Button>
                </Link>
                {secondaryLink ? (
                  <Link
                    to={secondaryLink.to}
                    className="self-start text-base font-semibold text-brand-purple border-b-2 border-brand-orange/40 pb-0.5 hover:border-brand-orange transition-colors"
                  >
                    {secondaryLink.label} <span aria-hidden="true">→</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsCalculatorOpen(true)}
                    className="self-start text-base font-semibold text-brand-purple border-b-2 border-brand-orange/40 pb-0.5 hover:border-brand-orange transition-colors"
                  >
                    {t("hero.calculatorLink")} <span aria-hidden="true">→</span>
                  </button>
                )}
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
              {photo ? (
                <picture>
                  <source
                    type="image/webp"
                    srcSet={photo.srcSet}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                  <img
                    src={photo.fallback}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading="eager"
                    {...{ fetchpriority: "high" }}
                    decoding="async"
                    className={`block w-full rounded-2xl shadow-xl ${photo.className}`}
                  />
                </picture>
              ) : (
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
                    /* Gespiegeld: op de foto kijkt iedereen naar rechts, en de
                       foto staat rechts. Zo keken ze de pagina uit. Nu kijken ze
                       terug naar de kop en de knop. Er staat geen leesbare tekst
                       op de foto, dus spiegelen levert niets omgekeerds op. */
                    className="block w-full aspect-[4/3] lg:aspect-[4/5] object-cover object-[50%_45%] lg:object-[50%_40%] rounded-2xl shadow-xl -scale-x-100"
                  />
                </picture>
              )}

              {/* Springt uit de foto: steekt verder over de rand. Zelfde
                  schaduw als de foto eronder en de primaire knop. Portret en
                  naam zoals bij de klantquote onder de resultaten. */}
              <figure
                className={`relative lg:absolute ${
                  photo?.quotePosition === "top-right"
                    ? "lg:right-0 lg:translate-x-4 xl:translate-x-12 lg:top-10 mt-4"
                    : "lg:left-0 lg:-translate-x-12 lg:bottom-10 -mt-8"
                } lg:mt-0 mx-3 lg:mx-0 lg:max-w-[320px] bg-white rounded-xl p-5 shadow-xl`}
              >
                <blockquote className="text-lg font-semibold text-brand-purple leading-snug">
                  &ldquo;{photoQuote ?? t("hero.quote")}&rdquo;
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <img
                    src={THEYDO_PORTRET}
                    alt=""
                    className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
                    width={160}
                    height={160}
                    loading="eager"
                  />
                  <div className="leading-tight">
                    <cite className="not-italic block text-base font-bold text-brand-gray-dark">
                      {t("bookingTrust.author")}
                    </cite>
                    <span className="block text-base text-brand-gray-medium">
                      {t("bookingTrust.role")}
                    </span>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        <div className="container-custom">
          <div className="border-t border-gray-200 pt-7 pb-12 text-center">
            <p className="text-xl font-bold text-brand-purple">
              {t("hero.trustedBy")}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:gap-x-11">
              {logos.map((logo) => (
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  decoding="async"
                  className={`${logo.className ?? "h-6 lg:h-7"} w-auto object-contain ${colourLogos ? "" : "grayscale opacity-80"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {!secondaryLink && (
        <Suspense fallback={null}>
          <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
        </Suspense>
      )}
    </>
  );
};

export default HeroSection;
