import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Award, Star } from "lucide-react";
import CalculatorModal from "./CalculatorModal";
import heroBackground from "@/assets/Vitaliteitsprogramma_presentatie_Innerleaps.png";

// Client logos
import oliverLogo from "@/assets/Vitaliteitsprogramma_Oliver_Wyman.png";
import sygnificLogo from "@/assets/Vitaliteitsprogramma_Sygnific.png";
import cordaanLogo from "@/assets/Vitaliteitsprogramma_Cordaan.png";
import denHaagLogo from "@/assets/Vitaliteitsprogramma_Gemeente_Den_Haag.png";
import spiritLogo from "@/assets/Vitaliteitsprogramma_Spirit.png";
import vuLogo from "@/assets/Vitaliteitsprogramma_VU_amsterdam.png";
import leaseplanLogo from "@/assets/Vitaliteitsprogramma_Leaseplan.png";
import tele2Logo from "@/assets/Vitaliteitsprogramma_Tele2.png";
import parnassiaLogo from "@/assets/Vitaliteitsprogramma_Parnassia_groep.png";
import lentizLogo from "@/assets/Vitaliteitsprogramma_Lentiz.png";
import primoLogo from "@/assets/Vitaliteitsprogramma_primo-2.png";
import justitieLogo from "@/assets/Vitaliteitsprogramma_Ministerie_van_justitie_en_veiligheid-2.png";
import youTalentLogo from "@/assets/Vitaliteitsprogramma_You_Talent-2.png";
import rijkswaterstaatLogo from "@/assets/Vitaliteitsprogramma_Rijkswaterstaat-2.png";
import politieLogo from "@/assets/Vitaliteitsprogramma_Politie_new.png";
import dhlLogo from "@/assets/Vitaliteitsprogramma_DHL-2.png";
import affiniusLogo from "@/assets/Vitaliteitsprogramma_Affinius_Capital-2.png";
import ggzLogo from "@/assets/Vitaliteitsprogramma_GGZ_centraal.png";
import humanitasLogo from "@/assets/Vitaliteitsprogramma_Humanitas.png";
import plevierLogo from "@/assets/Vitaliteitsprogramma_Plevier.png";
import carelLogo from "@/assets/Vitaliteitsprogramma_Carel_Lurvink.png";
import paConsultingLogo from "@/assets/Vitaliteitsprogramma_PA_consulting-2.png";
import nobelLogo from "@/assets/Vitaliteitsprogramma_nobel_recruitment-2.png";
import hollandColoursLogo from "@/assets/Vitaliteitsprogramma_Holland_Colours-2.png";
const HeroSection = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const logos = [{
    src: oliverLogo,
    alt: 'Oliver Wyman'
  }, {
    src: sygnificLogo,
    alt: 'Sygnific'
  }, {
    src: cordaanLogo,
    alt: 'Cordaan'
  }, {
    src: denHaagLogo,
    alt: 'Gemeente Den Haag'
  }, {
    src: spiritLogo,
    alt: 'Spirit'
  }, {
    src: vuLogo,
    alt: 'VU Amsterdam'
  }, {
    src: leaseplanLogo,
    alt: 'Leaseplan'
  }, {
    src: tele2Logo,
    alt: 'Tele2'
  }, {
    src: parnassiaLogo,
    alt: 'Parnassia Groep'
  }, {
    src: lentizLogo,
    alt: 'Lentiz'
  }, {
    src: primoLogo,
    alt: 'Primo'
  }, {
    src: justitieLogo,
    alt: 'Ministerie van Justitie en Veiligheid'
  }, {
    src: youTalentLogo,
    alt: 'You Talent'
  }, {
    src: rijkswaterstaatLogo,
    alt: 'Rijkswaterstaat'
  }, {
    src: politieLogo,
    alt: 'Politie'
  }, {
    src: dhlLogo,
    alt: 'DHL'
  }, {
    src: affiniusLogo,
    alt: 'Affinius Capital'
  }, {
    src: ggzLogo,
    alt: 'GGZ Centraal'
  }, {
    src: humanitasLogo,
    alt: 'Humanitas'
  }, {
    src: plevierLogo,
    alt: 'Plevier'
  }, {
    src: carelLogo,
    alt: 'Carel Lurvink'
  }, {
    src: paConsultingLogo,
    alt: 'PA Consulting'
  }, {
    src: nobelLogo,
    alt: 'Nobel Recruitment'
  }, {
    src: hollandColoursLogo,
    alt: 'Holland Colours'
  }];
  return <>
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src={heroBackground} alt="Vitaliteitsprogramma presentatie InnerLeaps" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="container-custom relative z-10 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8 animate-fade-in">
              <div className="space-y-6">
                {/* 40+ Years Research Badge */}
                <div className="inline-flex items-center text-blue-200 px-4 py-2 rounded-full text-base md:text-lg font-medium" style={{
                textShadow: '0 2px 8px rgba(0,0,0,0.5)'
              }}>
                  <Award className="h-4 w-4 mr-2" />
                  Vitaliteits{"\u00AD"}programma met 40+ jaar onderzoek
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug font-heading" style={{
                textShadow: '0 2px 8px rgba(0,0,0,0.5)'
              }}>
                  Het <span className="text-brand-orange">vitaliteits{"\u00AD"}programma</span> dat{" "}
                  <span className="text-brand-orange">prestatie</span> verbeterd{" "}
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl text-blue-100 leading-relaxed" style={{
                textShadow: '0 2px 8px rgba(0,0,0,0.5)'
              }}>
                  Wetenschappelijk bewezen vitaliteits{"\u00AD"}programma. Deelnemers ontwikkelen eigenaarschap over hun
                  eigen stress én verhogen hun veerkracht en productiviteit.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange text-white hover:text-white font-semibold py-4 px-6 lg:px-8 rounded-lg text-lg lg:text-xl shadow-xl" onClick={() => setIsCalculatorOpen(true)}>
                  Ontdek je besparing
                </Button>
                <Button variant="secondary-on-blue" size="lg" className="w-full sm:w-auto font-semibold py-4 px-6 lg:px-8 rounded-lg text-lg lg:text-xl" onClick={() => {
                const link = document.createElement("a");
                link.href = "https://calendar.app.google/BgGy8cVUSk4w5Zzg8";
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}>
                  Stel je vragen aan Bas
                </Button>
              </div>

              <div className="flex justify-center pt-6 lg:pt-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-orange" style={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                }}>
                    40+ jaar
                  </div>
                  <div className="text-blue-200 text-sm md:text-base" style={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                }}>
                    onderzoek
                  </div>
                </div>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="rounded-2xl p-6 lg:p-8 max-w-md mx-auto bg-white/50 backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl lg:text-2xl font-semibold mb-2" style={{
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                  }}>
                      Waarom organisaties ons kiezen
                    </h3>
                    <p className="text-blue-200 text-sm lg:text-base" style={{
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                  }}>
                      Resultaten uit 40+ jaar wetenschappelijk onderzoek
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 lg:p-4 bg-brand-purple/90 rounded-lg">
                      <span className="font-bold text-lg lg:text-xl text-white" style={{
                      textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                    }}>
                        Uitval risico
                      </span>
                      <span className="text-brand-orange font-bold text-lg lg:text-xl">
                        -70%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 lg:p-4 bg-brand-purple/90 rounded-lg">
                      <span className="font-bold text-lg lg:text-xl text-white" style={{
                      textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                    }}>
                        Verzuim
                      </span>
                      <span className="text-brand-orange font-bold text-lg lg:text-xl">
                        -21%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 lg:p-4 bg-brand-purple/90 rounded-lg">
                      <span className="font-bold text-lg lg:text-xl text-white" style={{
                      textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                    }}>
                        Productiviteit
                      </span>
                      <span className="text-brand-orange font-bold text-lg lg:text-xl">
                        +10%
                      </span>
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
                {logos.map((logo, index) => <img key={index} src={logo.src} alt={logo.alt} className="h-12 object-contain flex-shrink-0 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />)}
              </div>
              
              <div className="flex gap-8 animate-marquee absolute top-0 left-0" aria-hidden="true">
                {logos.map((logo, index) => <img key={`duplicate-${index}`} src={logo.src} alt={logo.alt} className="h-12 object-contain flex-shrink-0 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />)}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12 lg:mt-16">
            <ArrowDown className="h-8 w-8 text-brand-orange animate-bounce" />
          </div>
        </div>
      </section>

      <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
    </>;
};
export default HeroSection;