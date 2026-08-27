import { useEffect, useState, lazy, Suspense } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import TrainingPageLayout from "@/components/TrainingPageLayout";
import ROICalculator from "@/components/ROICalculator";
import heroBackground from "@/assets/Vitaliteitsprogramma_presentatie_Innerleaps.webp";
import breinTrainingImg from "@/assets/6_weken_brein_trainen.webp";

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

  useEffect(() => {
    const openCalculatorParam = searchParams.get("openCalculator");
    if (openCalculatorParam === "true") {
      setTimeout(() => setIsCalculatorOpen(true), 100);
    } else if (location.hash === "#calculator") {
      setTimeout(() => {
        document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500);
    } else if (location.hash === "#masterclass") {
      setTimeout(() => {
        document.getElementById("masterclass")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.search, location.hash, searchParams]);

  return (
    <>
      <TrainingPageLayout
        tKey="vitality"
        heroImage={heroBackground}
        heroImageAlt="Vitaliteitstraining presentatie"
        heroCtaOnClick={() => setIsCalculatorOpen(true)}
        logos={logos}
        weeksImage={breinTrainingImg}
        weeksLayout="stacked"
        masterclassVariant="employer"
        showMethodCtaAfterWeeks
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
