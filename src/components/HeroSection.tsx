import { useState, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Award, Star } from "lucide-react";
import heroBackground from "@/assets/Vitaliteitsprogramma_presentatie_Innerleaps.png";
import { TEXT_SHADOW_STRONG } from "@/styles/common";

// Lazy load calculator modal for better initial performance
const CalculatorModal = lazy(() => import("./CalculatorModal"));

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
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-4 py-8 sm:px-6 sm:py-12 lg:py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start w-full overflow-hidden">
            <div className="w-full space-y-6 animate-fade-in text-center lg:text-left">
              <div className="w-full space-y-4 sm:space-y-6">
                {/* Research Badge */}
                <div className="inline-flex items-center gap-2 bg-white/50 text-brand-purple px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base md:text-lg font-medium backdrop-blur-sm">
                  <Award className="h-4 w-4" />
                  Wetenschappelijk bewezen programma
                </div>

                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-heading break-words"
                  style={TEXT_SHADOW_STRONG}
                >
                  Het <span className="text-brand-orange">vitaliteits{"\u00AD"}programma</span> dat{" "}
                  <span className="text-brand-orange">prestaties</span> versterkt{" "}
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 leading-relaxed break-words" style={TEXT_SHADOW_STRONG}>
                  Wetenschappelijk onderbouwd en resultaatgericht vitaliteits{"\u00AD"}programma. Deelnemers nemen
                  eigenaarschap over hun stresslevel, worden veerkrachtiger én productiever.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange text-white hover:text-white font-semibold py-3 px-4 sm:py-4 sm:px-6 rounded-lg text-sm sm:text-base lg:text-lg shadow-xl"
                  onClick={() => setIsCalculatorOpen(true)}
                >
                  Ontdek jullie impact
                </Button>
              </div>
            </div>

            <div className="w-full relative animate-scale-in mt-6 lg:mt-0">
              <div className="w-full rounded-2xl p-4 sm:p-6 lg:p-8 max-w-full sm:max-w-md mx-auto bg-white/50 backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 text-brand-purple">
                      Waarom organisaties ons kiezen
                    </h3>
                  </div>

                  <div className="w-full space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between w-full p-2.5 sm:p-3 lg:p-4 bg-brand-purple/90 rounded-lg">
                      <span
                        style={TEXT_SHADOW_STRONG}
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-normal"
                      >
                        Uitval risico
                      </span>
                      <span className="text-brand-orange font-bold text-base sm:text-lg md:text-xl lg:text-2xl shrink-0">
                        -70%
                      </span>
                    </div>
                    <div className="flex items-center justify-between w-full p-2.5 sm:p-3 lg:p-4 bg-brand-purple/90 rounded-lg">
                      <span
                        style={TEXT_SHADOW_STRONG}
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-normal"
                      >
                        Verzuim
                      </span>
                      <span className="text-brand-orange font-bold text-base sm:text-lg md:text-xl lg:text-2xl shrink-0">
                        -21%
                      </span>
                    </div>
                    <div className="flex items-center justify-between w-full p-2.5 sm:p-3 lg:p-4 bg-brand-purple/90 rounded-lg">
                      <span
                        style={TEXT_SHADOW_STRONG}
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-normal"
                      >
                        Productiviteit
                      </span>
                      <span className="text-brand-orange font-bold text-base sm:text-lg md:text-xl lg:text-2xl shrink-0">
                        +10%
                      </span>
                    </div>
                    <div className="flex items-center justify-between w-full p-2.5 sm:p-3 lg:p-4 bg-brand-purple/90 rounded-lg">
                      <span
                        style={TEXT_SHADOW_STRONG}
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-normal"
                      >
                        Wetenschap
                      </span>
                      <span className="text-brand-orange font-bold text-base sm:text-lg md:text-xl lg:text-2xl shrink-0">
                        40+ jaar
                      </span>
                    </div>
                  </div>

                  {/* Google Review Badge */}
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
                            className="w-4 h-4 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-amber-100 text-sm text-center mt-1">Google Reviews</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling Logos - Lazy loaded below the fold */}
          <div className="w-full mt-8 sm:mt-12 lg:mt-16">
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
              <div className="flex gap-8 animate-marquee-mobile md:animate-marquee-tablet">
                {logos.map((logo, index) => (
                  <img
                    key={index}
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-8 sm:h-10 md:h-12 object-contain flex-shrink-0 opacity-100 transition-all"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 sm:mt-12 lg:mt-16 w-full">
            <ArrowDown className="h-8 w-8 text-brand-orange animate-bounce" />
          </div>
        </div>
      </section>

      {/* Calculator Modal - lazy loaded */}
      <Suspense fallback={null}>
        {isCalculatorOpen && <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />}
      </Suspense>
    </>
  );
};
export default HeroSection;
