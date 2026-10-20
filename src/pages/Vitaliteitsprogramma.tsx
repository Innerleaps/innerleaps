import { useEffect, useState, lazy, Suspense } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TrainingPageLayout from "@/components/TrainingPageLayout";
import ResultatenBand, { type ResultatenBandStat } from "@/components/ResultatenBand";
import ROICalculator from "@/components/ROICalculator";
import heroBackground from "@/assets/Vitaliteitsprogramma_presentatie_Innerleaps.webp";
import presentatie840 from "@/assets/training-presentatie-840w.webp";
import presentatie600 from "@/assets/training-presentatie-600w.webp";
import presentatieFallback from "@/assets/training-presentatie-840w.jpg";

// Client logos
import oliverLogo from "@/assets/Vitaliteitsprogramma_Oliver_Wyman_light-2.webp";
import sygnificLogo from "@/assets/Vitaliteitsprogramma_Sygnific_light.webp";
import cordaanLogo from "@/assets/Vitaliteitsprogramma_Cordaan_light.webp";
import denHaagLogo from "@/assets/Vitaliteitsprogramma_Gemeente_Den_Haag_light.webp";
import spiritLogo from "@/assets/Vitaliteitsprogramma_Spirit_light.webp";
import vuLogo from "@/assets/Vitaliteitsprogramma_VU_amsterdam_light.webp";
import leaseplanLogo from "@/assets/Vitaliteitsprogramma_Leaseplan_light-2.webp";
import tele2Logo from "@/assets/Vitaliteitsprogramma_Tele2_light-2.webp";
import parnassiaLogo from "@/assets/Vitaliteitsprogramma_Parnassia_groep_light.webp";
import lentizLogo from "@/assets/Vitaliteitsprogramma_Lentiz_light.webp";
import primoLogo from "@/assets/Vitaliteitsprogramma_primo_light.webp";
import justitieLogo from "@/assets/Vitaliteitsprogramma_Ministerie_van_justitie_en_veiligheid_light-2.webp";
import youTalentLogo from "@/assets/Vitaliteitsprogramma_You_Talent_light.webp";
import rijkswaterstaatLogo from "@/assets/Vitaliteitsprogramma_Rijkswaterstaat_light.webp";
import politieLogo from "@/assets/Vitaliteitsprogramma_Politite_light.webp";
import dhlLogo from "@/assets/Vitaliteitsprogramma_DHL_light.webp";
import affiniusLogo from "@/assets/Vitaliteitsprogramma_Affinius_Capital_light.webp";
import ggzLogo from "@/assets/Vitaliteitsprogramma_GGZ_centraal_light.webp";
import humanitasLogo from "@/assets/Vitaliteitsprogramma_Humanitas_light.webp";
import plevierLogo from "@/assets/Vitaliteitsprogramma_Plevier_light.webp";
import carelLogo from "@/assets/Vitaliteitsprogramma_Carel_Lurvink_light.webp";
import paConsultingLogo from "@/assets/Vitaliteitsprogramma_PA_consulting_light.webp";
import nobelLogo from "@/assets/Vitaliteitsprogramma_nobel_recruitment_light.webp";
import hollandColoursLogo from "@/assets/Vitaliteitsprogramma_Holland_Colours_light.webp";
import { scrollNaarAnkerUitUrl } from "@/lib/anker";

/* Logo's voor de lichte hero, in kleur en op een transparante achtergrond.
   Publieke organisaties uit de logo's bij de trainers op /over-ons: overheid,
   onderwijs en zorg door elkaar. Den Haag en de VU hadden een witte
   achtergrond; die is in de _transparant-versies weggehaald, met het wit
   binnen het logo (het lint van het wapen) intact. Spirit is een
   luchtvaartmaatschappij en hoort hier dus niet bij. */
import denHaagKleur from "@/assets/Vitaliteitsprogramma_Gemeente_Den_Haag_transparant.webp";
import politieKleur from "@/assets/Vitaliteitsprogramma_Politite-4.webp";
import rijkswaterstaatKleur from "@/assets/Vitaliteitsprogramma_Rijkswaterstaat-3.webp";
import vuKleur from "@/assets/Vitaliteitsprogramma_VU_amsterdam_transparant.webp";
import lentizKleur from "@/assets/Vitaliteitsprogramma_Lentiz.webp";
import ggzKleur from "@/assets/Vitaliteitsprogramma_GGZ_centraal.webp";

// Het Haagse wapen is bijna vierkant met de naam klein eronder, en bij
// Rijkswaterstaat staat de naam klein naast het beeldmerk. Op de
// standaardhoogte waren die namen niet te lezen.
const PUBLIEKE_LOGOS = [
  { src: denHaagKleur, alt: "Gemeente Den Haag", className: "h-12 lg:h-14" },
  { src: politieKleur, alt: "Politie" },
  { src: rijkswaterstaatKleur, alt: "Rijkswaterstaat", className: "h-10 lg:h-12" },
  { src: vuKleur, alt: "VU Amsterdam" },
  { src: lentizKleur, alt: "Lentiz" },
  { src: ggzKleur, alt: "GGZ Centraal" },
];

const CalculatorModal = lazy(() => import("@/components/CalculatorModal"));

const logos = [
  { src: oliverLogo, alt: "Oliver Wyman" },
  { src: sygnificLogo, alt: "Sygnific" },
  { src: cordaanLogo, alt: "Cordaan" },
  { src: denHaagLogo, alt: "Gemeente Den Haag" },
  { src: spiritLogo, alt: "Spirit" },
  { src: vuLogo, alt: "VU Amsterdam" },
  { src: leaseplanLogo, alt: "Leaseplan" },
  { src: tele2Logo, alt: "Tele2" },
  { src: parnassiaLogo, alt: "Parnassia Groep" },
  { src: lentizLogo, alt: "Lentiz" },
  { src: primoLogo, alt: "Primo" },
  { src: justitieLogo, alt: "Ministerie van Justitie en Veiligheid" },
  { src: youTalentLogo, alt: "You Talent" },
  { src: rijkswaterstaatLogo, alt: "Rijkswaterstaat" },
  { src: politieLogo, alt: "Politie" },
  { src: dhlLogo, alt: "DHL" },
  { src: affiniusLogo, alt: "Affinius Capital" },
  { src: ggzLogo, alt: "GGZ Centraal" },
  { src: humanitasLogo, alt: "Humanitas" },
  { src: plevierLogo, alt: "Plevier" },
  { src: carelLogo, alt: "Carel Lurvink" },
  { src: paConsultingLogo, alt: "PA Consulting" },
  { src: nobelLogo, alt: "Nobel Recruitment" },
  { src: hollandColoursLogo, alt: "Holland Colours" },
];

const Vitaliteitstraining = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { t } = useTranslation("training");

  useEffect(() => {
    const openCalculatorParam = searchParams.get("openCalculator");
    if (openCalculatorParam === "true") {
      setTimeout(() => setIsCalculatorOpen(true), 100);
    } else if (!scrollNaarAnkerUitUrl(location.hash)) {
      window.scrollTo(0, 0);
    }
  }, [location.search, location.hash, searchParams]);

  return (
    <>
      <TrainingPageLayout
        tKey="vitality"
        heroImage={heroBackground}
        heroImageAlt={t("vitality.hero.imageAlt")}
        heroPhoto={{
          srcSet: `${presentatie600} 600w, ${presentatie840} 840w`,
          fallback: presentatieFallback,
          width: 840,
          height: 840,
          alt: t("vitality.hero.imageAlt"),
          className: "aspect-[4/3] lg:aspect-square object-cover object-[50%_60%]",
          // De slaapquote is langer dan die op de scale-up-pagina en reikte
          // op "top-right" tot over het gezicht van Bas.
          quotePosition: "top-right-narrow",
        }}
        logos={logos}
        heroLogos={PUBLIEKE_LOGOS}
        heroColourLogos
        heroPhotoQuote={t("vitality.hero.photoQuote")}
        afterResults={
          <ResultatenBand
            stats={t("vitality.resultsBand.items", { returnObjects: true }) as ResultatenBandStat[]}
          />
        }
        // Bewust dezelfde slaapquote als op de herofoto: Bas koos hem op
        // 20-10-2026 voor beide plekken.
        participantQuote={t("vitality.hero.photoQuote")}
        masterclassTexts={{ ns: "training", prefix: "vitality.introSteps" }}
        weeksLayout="stacked"
        showBookingCtas
        belowFaqSection={
          <div id="calculator">
            <ROICalculator />
          </div>
        }
      />

      <Suspense fallback={null}>
        {isCalculatorOpen && <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />}
      </Suspense>
    </>
  );
};

export default Vitaliteitstraining;
