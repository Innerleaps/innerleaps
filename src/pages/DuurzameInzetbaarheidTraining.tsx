import { useEffect, useState, lazy, Suspense } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TrainingPageLayout from "@/components/TrainingPageLayout";
import ResultatenBand, { type ResultatenBandStat } from "@/components/ResultatenBand";
import { detectLanguageFromPath } from "@/i18n/config";
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

/* Logo's voor de lichte hero, in kleur en op een transparante achtergrond:
   anders staat er een wit vlak op de beige hero. Klanten die herkenbaar zijn
   voor een scale-up, in plaats van onderwijs, zorg en overheid. */
import theydoKleur from "@/assets/Vitaliteitsprogramma_TheyDo_transparant.webp";
import holieKleur from "@/assets/Vitaliteitsprogramma_Holie_Pizza.webp";
import tele2Kleur from "@/assets/Vitaliteitsprogramma_Tele2_transparant.webp";
import leaseplanKleur from "@/assets/Vitaliteitsprogramma_Leaseplan_transparant.webp";
import sygnificKleur from "@/assets/Vitaliteitsprogramma_Sygnific_transparant.webp";

// Holie, Leaseplan en Sygnific zijn bijna vierkant of hebben hun naam klein
// onder een beeldmerk. Op de standaardhoogte was die naam niet te lezen, dus
// die drie staan hoger.
const SCALEUP_LOGOS = [
  { src: theydoKleur, alt: "TheyDo", className: "h-7 lg:h-8" },
  { src: holieKleur, alt: "Holie Pizza", className: "h-10 lg:h-12" },
  { src: tele2Kleur, alt: "Tele2" },
  { src: leaseplanKleur, alt: "Leaseplan", className: "h-8 lg:h-10" },
  { src: sygnificKleur, alt: "Sygnific", className: "h-8 lg:h-9" },
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

const DuurzameInzetbaarheidTraining = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { t } = useTranslation("training");
  const lang = detectLanguageFromPath(location.pathname);
  const caseHref = lang === "en" ? "/en/case-studies/theydo" : "/klantcases/theydo";

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
        tKey="sustainability"
        heroImage={heroBackground}
        heroImageAlt={t("sustainability.hero.imageAlt")}
        heroPhoto={{
          srcSet: `${presentatie600} 600w, ${presentatie840} 840w`,
          fallback: presentatieFallback,
          width: 840,
          height: 840,
          alt: t("sustainability.hero.imageAlt"),
          className: "aspect-[4/3] lg:aspect-square object-cover object-[50%_60%]",
          // Op "top-right" viel de quote over het gezicht van Bas en gaf hij op
          // 1280 pixels een horizontale scrollbalk. Zelfde stand als op de
          // publieke-sectorpagina, met dezelfde foto.
          quotePosition: "top-right-narrow",
        }}
        logos={logos}
        heroLogos={SCALEUP_LOGOS}
        heroColourLogos
        heroSecondaryLink={{ label: t("sustainability.hero.caseLink"), to: caseHref }}
        afterResults={
          <ResultatenBand
            stats={t("sustainability.resultsBand.items", { returnObjects: true }) as ResultatenBandStat[]}
          />
        }
        participantQuote={t("sustainability.participantQuote")}
        weeksLayout="stacked"
        showBookingCtas
      />

      <Suspense fallback={null}>
        {isCalculatorOpen && <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />}
      </Suspense>
    </>
  );
};

export default DuurzameInzetbaarheidTraining;
