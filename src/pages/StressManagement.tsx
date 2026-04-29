import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TrainingPageLayout from "@/components/TrainingPageLayout";
import heroBackground from "@/assets/Vitaliteitsprogramma_presentatie_Innerleaps.png";
import breinTrainingImg from "@/assets/6_weken_brein_trainen.png";

// Client logos
import oliverLogo from "@/assets/Vitaliteitsprogramma_Oliver_Wyman_light-2.png";
import sygnificLogo from "@/assets/Vitaliteitsprogramma_Sygnific_light.png";
import cordaanLogo from "@/assets/Vitaliteitsprogramma_Cordaan_light.png";
import denHaagLogo from "@/assets/Vitaliteitsprogramma_Gemeente_Den_Haag_light.png";
import spiritLogo from "@/assets/Vitaliteitsprogramma_Spirit_light.png";
import vuLogo from "@/assets/Vitaliteitsprogramma_VU_amsterdam_light.png";
import leaseplanLogo from "@/assets/Vitaliteitsprogramma_Leaseplan_light-2.png";
import tele2Logo from "@/assets/Vitaliteitsprogramma_Tele2_light-2.png";
import parnassiaLogo from "@/assets/Vitaliteitsprogramma_Parnassia_groep_light.png";
import lentizLogo from "@/assets/Vitaliteitsprogramma_Lentiz_light.png";
import primoLogo from "@/assets/Vitaliteitsprogramma_primo_light.png";
import justitieLogo from "@/assets/Vitaliteitsprogramma_Ministerie_van_justitie_en_veiligheid_light-2.png";
import youTalentLogo from "@/assets/Vitaliteitsprogramma_You_Talent_light.png";
import rijkswaterstaatLogo from "@/assets/Vitaliteitsprogramma_Rijkswaterstaat_light.png";
import politieLogo from "@/assets/Vitaliteitsprogramma_Politite_light.png";
import dhlLogo from "@/assets/Vitaliteitsprogramma_DHL_light.png";
import affiniusLogo from "@/assets/Vitaliteitsprogramma_Affinius_Capital_light.png";
import ggzLogo from "@/assets/Vitaliteitsprogramma_GGZ_centraal_light.png";
import humanitasLogo from "@/assets/Vitaliteitsprogramma_Humanitas_light.png";
import plevierLogo from "@/assets/Vitaliteitsprogramma_Plevier_light.png";
import carelLogo from "@/assets/Vitaliteitsprogramma_Carel_Lurvink_light.png";
import paConsultingLogo from "@/assets/Vitaliteitsprogramma_PA_consulting_light.png";
import nobelLogo from "@/assets/Vitaliteitsprogramma_nobel_recruitment_light.png";
import hollandColoursLogo from "@/assets/Vitaliteitsprogramma_Holland_Colours_light.png";

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

const StressManagement = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // NOTE: B2X registration flow (training signup, masterclass CTA, sticky CTAs) is
  // intentionally disabled. To restore, re-enable the heroCtaOnClick / hideMasterclass /
  // hideStickyCtas props and lazy-load ProgramRegistrationModal again.
  return (
    <TrainingPageLayout
      tKey="stress"
      heroImage={heroBackground}
      heroImageAlt="Stressmanagement training presentatie"
      logos={logos}
      weeksImage={breinTrainingImg}
      hideMasterclass
      hideStickyCtas
      showMethodCtaAfterWeeks
      trustVariant="off-white"
    />
  );
};

export default StressManagement;
