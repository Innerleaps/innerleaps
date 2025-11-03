import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Award, Star } from "lucide-react";
import CalculatorModal from "./CalculatorModal";
import heroBackground from "@/assets/Vitaliteitsprogramma_presentatie_Innerleaps.png";

// Client logos - Light versions with transparent backgrounds
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
const HeroSection = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const logos = [
    {
      src: oliverLogo,
      alt: "Oliver Wyman",
    },
    {
      src: sygnificLogo,
      alt: "Sygnific",
    },
    {
      src: cordaanLogo,
      alt: "Cordaan",
    },
    {
      src: denHaagLogo,
      alt: "Gemeente Den Haag",
    },
    {
      src: spiritLogo,
      alt: "Spirit",
    },
    {
      src: vuLogo,
      alt: "VU Amsterdam",
    },
    {
      src: leaseplanLogo,
      alt: "Leaseplan",
    },
    {
      src: tele2Logo,
      alt: "Tele2",
    },
    {
      src: parnassiaLogo,
      alt: "Parnassia Groep",
    },
    {
      src: lentizLogo,
      alt: "Lentiz",
    },
    {
      src: primoLogo,
      alt: "Primo",
    },
    {
      src: justitieLogo,
      alt: "Ministerie van Justitie en Veiligheid",
    },
    {
      src: youTalentLogo,
      alt: "You Talent",
    },
    {
      src: rijkswaterstaatLogo,
      alt: "Rijkswaterstaat",
    },
    {
      src: politieLogo,
      alt: "Politie",
    },
    {
      src: dhlLogo,
      alt: "DHL",
    },
    {
      src: affiniusLogo,
      alt: "Affinius Capital",
    },
    {
      src: ggzLogo,
      alt: "GGZ Centraal",
    },
    {
      src: humanitasLogo,
      alt: "Humanitas",
    },
    {
      src: plevierLogo,
      alt: "Plevier",
    },
    {
      src: carelLogo,
      alt: "Carel Lurvink",
    },
    {
      src: paConsultingLogo,
      alt: "PA Consulting",
    },
    {
      src: nobelLogo,
      alt: "Nobel Recruitment",
    },
    {
      src: hollandColoursLogo,
      alt: "Holland Colours",
    },
  ];
  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBackground}
            alt="Vitaliteitsprogramma presentatie InnerLeaps"
            className="w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 py-8 sm:py-12 lg:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <<div className="space-y-6 animate-fade-in text-center lg:text-left w-full mx-auto lg:mx-0">
              <div className="space-y-6">
                {/* Research Badge */}
                <div className="inline-flex items-center bg-white/50 text-brand-purple px-4 py-2 rounded-full text-sm md:text-base font-medium backdrop-blur-sm">
                  <Award className="h-4 w-4 mr-2" />
                  Wetenschappelijk bewezen programma
                </div>

                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-heading"
                  style={{
                    textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                  }}
                >
                  Het <span className="text-brand-orange">vitaliteits{"\u00AD"}programma</span> dat{" "}
                  <span className="text-brand-orange">prestatie</span> verbeterd{" "}
                </h1>
                <p
                  className="text-lg sm:text-xl md:text-2xl text-blue-100 leading-relaxed"
                  style={{
                    textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                  }}
                >
                  Wetenschappelijk bewezen vitaliteits{"\u00AD"}programma. Deelnemers ontwikkelen eigenaarschap over hun
                  eigen stress én verhogen hun veerkracht en productiviteit.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange text-white hover:text-white font-semibold py-3 sm:py-4 px-5 sm:px-6 rounded-lg text-base sm:text-lg shadow-xl"
                  onClick={() => setIsCalculatorOpen(true)}
                >
                  Ontdek je besparing
                </Button>
                <Button
                  variant="secondary-on-blue"
                  size="lg"
                  className="w-full sm:w-auto font-semibold py-3 sm:py-4 px-5 sm:px-6 rounded-lg text-base sm:text-lg"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = "https://calendar.app.google/BgGy8cVUSk4w5Zzg8";
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  Stel je vragen aan Bas
                </Button>
              </div>
            </div>

            <div className="relative animate-scale-in mt-8 lg:mt-0">
              <div className="rounded-2xl p-6 lg:p-8 max-w-md mx-auto bg-white/50 backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 text-brand-purple">
                      Waarom organisaties ons kiezen
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 lg:p-4 bg-brand-purple/90 rounded-lg">
                      <span
                        className="font-bold text-sm sm:text-base md:text-lg text-white"
                        style={{
                          textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                        }}
                      >
                        Uitval risico
                      </span>
                      <span className="text-brand-orange font-bold text-sm sm:text-base md:text-lg">-70%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 lg:p-4 bg-brand-purple/90 rounded-lg">
                      <span
                        className="font-bold text-sm sm:text-base md:text-lg text-white"
                        style={{
                          textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                        }}
                      >
                        Verzuim
                      </span>
                      <span className="text-brand-orange font-bold text-sm sm:text-base md:text-lg">-21%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 lg:p-4 bg-brand-purple/90 rounded-lg">
                      <span
                        className="font-bold text-sm sm:text-base md:text-lg text-white"
                        style={{
                          textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                        }}
                      >
                        Productiviteit
                      </span>
                      <span className="text-brand-orange font-bold text-sm sm:text-base md:text-lg">+10%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 lg:p-4 bg-brand-purple/90 rounded-lg">
                      <span
                        className="font-bold text-sm sm:text-base md:text-lg text-white"
                        style={{
                          textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                        }}
                      >
                        Wetenschappelijk onderzoek
                      </span>
                      <span className="text-brand-orange font-bold text-sm sm:text-base md:text-lg">40+ jaar</span>
                    </div>
                  </div>

                  {/* Google Review Badge */}
                  <a
                    href="https://www.google.com/maps/place/Innerleaps/@52.1909763,5.2795551,7z/data=!4m8!3m7!1s0x41d7861255c94705:0x571bbf751b212eea!8m2!3d52.1909763!4d5.2795551!9m1!1b1!16s%2Fg%2F11y10xf1qm?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block bg-brand-purple/90 backdrop-blur-sm rounded-lg p-3 hover:bg-brand-purple transition-all group"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-white font-semibold text-lg">4,7 / 5</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-amber-100 text-xs text-center mt-1">Google Reviews</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling Logos */}
          <div className="mt-12 lg:mt-16">
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
              <div className="flex gap-8 animate-marquee">
                {logos.map((logo, index) => (
                  <img
                    key={index}
                    src={logo.src}
                    alt={logo.alt}
                    className="h-12 object-contain flex-shrink-0 opacity-100 transition-all"
                  />
                ))}
              </div>

              <div className="flex gap-8 animate-marquee absolute top-0 left-0" aria-hidden="true">
                {logos.map((logo, index) => (
                  <img
                    key={`duplicate-${index}`}
                    src={logo.src}
                    alt={logo.alt}
                    className="h-12 object-contain flex-shrink-0 opacity-100 transition-all"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12 lg:mt-16">
            <ArrowDown className="h-8 w-8 text-brand-orange animate-bounce" />
          </div>
        </div>
      </section>

      <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
    </>
  );
};
export default HeroSection;
