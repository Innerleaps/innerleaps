import { useEffect, useState, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ROICalculator from "@/components/ROICalculator";
import StickyCtaButtons from "@/components/StickyCtaButtons";
import TrustSection from "@/components/TrustSection";
import ProgramOverviewSection from "@/components/ProgramOverviewSection";
import {
  Brain,
  Heart,
  Shield,
  Smile,
  CheckCircle,
  AlertCircle,
  Activity,
  Calendar,
  Clock,
  Laptop,
  Award,
  BookOpen,
  Star,
} from "lucide-react";
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

// Trust section logos

// Lazy load calculator modal
const CalculatorModal = lazy(() => import("@/components/CalculatorModal"));
const DuurzameInzetbaarheidTraining = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const openCalculatorParam = searchParams.get("openCalculator");

    // Check for openCalculator URL parameter
    if (openCalculatorParam === "true") {
      // Small delay to ensure modal is ready
      setTimeout(() => {
        setIsCalculatorOpen(true);
      }, 100);
    }
    // Check for #calculator anchor
    else if (location.hash === "#calculator") {
      // Longer delay to wait for lazy-loaded ROICalculator to mount
      setTimeout(() => {
        const element = document.getElementById("calculator");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    }
    // Check for #masterclass anchor
    else if (location.hash === "#masterclass") {
      // Delay to wait for page to fully mount
      setTimeout(() => {
        const element = document.getElementById("masterclass");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.search, location.hash]);
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
    <div className="min-h-screen">
      <Helmet>
        <meta
          name="description"
          content="Innerleaps biedt organisaties een 6-weeks vitaliteitsprogramma met 42% deelname, versus 3-8% bij standaard EAP's. Preventief, wetenschappelijk onderbouwd, betaal alleen voor deelnemers."
        />
      </Helmet>
      <SimplifiedNavigation />
      <StickyCtaButtons />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-start sm:items-center overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBackground}
            alt="Vitaliteitsprogramma presentatie"
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
                  Wetenschappelijk bewezen methode
                </div>

                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-heading break-words"
                  style={{
                    textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                  }}
                >
                  Beter <span className="text-brand-orange">presteren</span> onder{" "}
                  <span className="text-brand-orange">druk</span>
                </h1>
                <p
                  className="text-xl md:text-2xl text-blue-100 leading-relaxed break-words"
                  style={{
                    textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                  }}
                >
                  Meer focus, minder fouten en een team dat vaker en scherper kan leveren. Een 6-weekse evidence-based
                  breintraining voor teams die het verschil willen maken.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange text-white hover:text-white font-semibold py-3 px-4 sm:py-4 sm:px-6 rounded-lg text-sm sm:text-base lg:text-lg shadow-xl"
                  onClick={() => setIsCalculatorOpen(true)}
                >
                  Wat levert dit jullie op?
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
                        style={{
                          textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                        }}
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-normal"
                      >
                        Focus & Concentratie
                      </span>
                      <span className="text-brand-orange font-bold text-base sm:text-lg md:text-xl lg:text-2xl shrink-0">
                        +25%
                      </span>
                    </div>
                    <div className="flex items-center justify-between w-full p-2.5 sm:p-3 lg:p-4 bg-brand-purple/90 rounded-lg">
                      <span
                        style={{
                          textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                        }}
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-normal"
                      >
                        Productiviteit
                      </span>
                      <span className="text-brand-orange font-bold text-base sm:text-lg md:text-xl lg:text-2xl shrink-0">
                        +8%
                      </span>
                    </div>
                    <div className="flex items-center justify-between w-full p-2.5 sm:p-3 lg:p-4 bg-brand-purple/90 rounded-lg">
                      <span
                        style={{
                          textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                        }}
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
                        style={{
                          textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                        }}
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-normal"
                      >
                        Wetenschap
                      </span>
                      <span className="text-brand-orange font-bold text-base sm:text-lg md:text-xl lg:text-2xl shrink-0">
                        40+ jaar
                      </span>
                    </div>
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

      {/* Challenges Sectie */}
      <section className="py-16 md:py-24 bg-brand-off-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-6">
            Herken je één van deze <span className="text-brand-orange">uitdagingen</span>?
          </h2>
          <p className="text-xl md:text-2xl text-brand-gray-medium text-center leading-relaxed mb-12">
            Deze organisatie uitdagingen pakken wij aan met onze methode.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Challenge 1 */}
            <div className="bg-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Activity className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                Targets staan onder druk
              </h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center">
                Je team moet leveren, maar de druk stapelt zich op. Output blijft achter bij de ambitie.
              </p>
            </div>

            {/* Challenge 2 */}
            <div className="bg-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <AlertCircle className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                Fouten kosten tijd en geld
              </h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center">
                Onder druk daalt de scherpte. Kleine missers leiden tot herstelwerk, frustratie en gemiste kansen.
              </p>
            </div>

            {/* Challenge 3 */}
            <div className="bg-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Heart className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                Verzuim en uitval is te hoog
              </h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center">
                Door uitval of ziekte is je team is minder beschikbaar, precies wanneer je ze hard nodig hebt.
              </p>
            </div>

            {/* Challenge 4 */}
            <div className="bg-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Shield className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                Talent vasthouden is moeilijk
              </h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center">
                Je beste mensen zijn essentieel. Talent behouden vraagt meer dan goede voorwaarden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Sectie */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-6">
            Het <span className="text-brand-orange">resultaat </span> van ons programma
          </h2>
          <p className="text-xl md:text-2xl text-brand-gray-medium text-center leading-relaxed mb-12">
            De wetenschappelijk bewezen effecten van ons programma.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Value 1 */}
            <div className="bg-brand-off-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Brain className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                Scherpere focus onder druk
              </h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center">
                Je team leert aandacht bewust sturen en vasthouden. Minder afleiding, meer voortgang op wat écht telt. Targets worden haalbaar, ook als de druk oploopt.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-brand-off-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Heart className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                Minder fouten, betere output
              </h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center">
                Een getraind brein maakt onder druk minder onnodige missers. Onderzoek laat een daling van 25% minder fouten zien. Minder herstelwerk, betere output.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-brand-off-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Shield className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                Hogere team inzetbaarheid
              </h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center">
                Medewerkers herkennen stress eerder en sturen bij voordat uitval optreedt. Minder verzuim, minder langdurige uitval. Een team dat beschikbaar is.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-brand-off-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <CheckCircle className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                Tevredener team, lagere uitstroom
              </h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center">
                Medewerkers ervaren meer rust, werkplezier en tevredenheid met hun leven. Wie zich goed voelt op zijn plek, gaat minder snel op zoek naar iets anders. 
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programma Features Sectie */}
      <ProgramOverviewSection />

      {/* 6 Weken Thema's Sectie */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-12">
            Ons <span className="text-brand-orange">6-weekse</span> kernprogramma
          </h2>

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6 text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              <p>
                Met onze<strong>"push-ups voor het brein"</strong> trainen deelnemers hun brein. Hiermee versterken ze twee cruciale
                hersensystemen.
              </p>

              <p>
                Het controlecentrum wordt sterker. Medewerkers onderdrukken impulsieve automatische reacties, filteren
                irrelevante informatie en nemen bewustere beslissingen over hun werkdruk.
              </p>

              <p>
                Het waarschuwingssysteem wordt gevoeliger. Deelnemers herkennen stressignalen zoals spanning of
                verminderde concentratie op tijd.
              </p>
            </div>

            <div className="relative">
              <img
                src={breinTrainingImg}
                alt="Mensen tijdens een aandacht- en concentratietraining voor betere prestaties en minder stress"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-brand-off-white p-6 rounded-xl space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-brand-orange text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Week 1
                </span>
                <span className="bg-brand-purple text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Controlecentrum
                </span>
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark">De automatische piloot doorbreken</h3>
              <p className="text-lg text-brand-gray-medium leading-relaxed">
                Waar zijn je gedachten terwijl je tanden poetst? Waarschijnlijk bij je eerste meeting of je to-do lijst.
                Leer herkennen wanneer je gedachten afdwalen en breng je aandacht terug naar wat je nu doet. Je traint
                je controlecentrum door telkens bewust aandacht te geven aan je huidige activiteit.
              </p>
            </div>

            <div className="bg-brand-off-white p-6 rounded-xl space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-brand-orange text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Week 2
                </span>
                <span className="bg-brand-purple text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Waarschuwingssysteem
                </span>
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark">Vroege waarschuwingssignalen herkennen</h3>
              <p className="text-lg text-brand-gray-medium leading-relaxed">
                Train je waarschuwingssysteem zodat je gespannen schouders, een strakke kaak of oppervlakkige ademhaling
                opmerkt voordat spanning je overneemt. Jij pakt de controle in plaats van de spanning, omdat je stress-antennes scherper zijn.
              </p>
            </div>

            <div className="bg-brand-off-white p-6 rounded-xl space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-brand-orange text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Week 3
                </span>
                <span className="bg-brand-purple text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Controlecentrum
                </span>
                <span className="bg-brand-purple text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Waarschuwingssysteem
                </span>
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark">Stoppen met piekeren</h3>
              <p className="text-lg text-brand-gray-medium leading-relaxed">
                Gedachten zijn geen feiten. Leer de 3-step reset: een pauze-knop die voorkomt dat piekeren de controle
                krijgt. Krijg je focus waar jij die wil hebben.
              </p>
            </div>

            <div className="bg-brand-off-white p-6 rounded-xl space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-brand-orange text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Week 4
                </span>
                <span className="bg-brand-purple text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Controlecentrum
                </span>
                <span className="bg-brand-purple text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Waarschuwingssysteem
                </span>
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark">Ruimte tussen gedachte en reactie</h3>
              <p className="text-lg text-brand-gray-medium leading-relaxed">
                Laat je niet meeslepen door gedachten. Zie ze als mentale gebeurtenissen die komen en gaan. Krijg
                controle en bepaal zelf hoe je wil reageren in plaats van automatisch te handelen.
              </p>
            </div>

            <div className="bg-brand-off-white p-6 rounded-xl space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-brand-orange text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Week 5
                </span>
                <span className="bg-brand-purple text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Controlecentrum
                </span>
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark">Beter samenwerken door bewust luisteren</h3>
              <p className="text-lg text-brand-gray-medium leading-relaxed">
                Onder druk formuleer je vaak je antwoord al terwijl de ander nog praat. Leer écht luisteren, perspectief
                nemen en reageren vanuit begrip in plaats van reflex.
              </p>
            </div>

            <div className="bg-brand-off-white p-6 rounded-xl space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-brand-orange text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Week 6
                </span>
                <span className="bg-brand-purple text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Controlecentrum
                </span>
                <span className="bg-brand-purple text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Waarschuwingssysteem
                </span>
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark">Duurzame integratie in je leven</h3>
              <p className="text-lg text-brand-gray-medium leading-relaxed">
                Herken je gedachtepatronen en maak de geleerde technieken blijvend onderdeel van je dagelijkse routine.
                Bouw je eigen toolbox voor alle situaties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Masterclass Sectie */}
      <section id="masterclass" className="py-16 md:py-24 bg-brand-off-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-6">
            Ervaar het met onze <span className="text-brand-orange">vrijblijvende masterclass</span>.
          </h2>
          <p className="text-xl md:text-2xl text-brand-gray-medium text-center leading-relaxed mb-12 max-w-4xl mx-auto">
            Ben je enthousiast maar wil je eerst ervaren hoe aandachtstraining werkt? In 60 minuten maak je op speelse
            wijze kennis met onze aanpak.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
            <div className="bg-white p-6 rounded-xl space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <Activity className="h-10 w-10 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark text-center">Stress level</h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                Krijg inzicht in jouw stress level. Volledig wetenschappelijk onderbouwd.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <Brain className="h-10 w-10 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark text-center">Aandachtoefening</h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                Ervaar een techniek om controle over je autopiloot te krijgen en focus terug te pakken. Volledig
                wetenschappelijk onderbouwd.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <BookOpen className="h-10 w-10 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark text-center">Reset tool</h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                Leer een tool om je werkgeheugen te resetten en aandacht direct terug te pakken.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <Award className="h-10 w-10 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark text-center">Vrijblijvend</h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                Wij geloven dat iedereen onze effectieve techniek moet kunnen proberen. Daarom is onze masterclass
                vrijblijvend.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white py-4 px-8 rounded-lg text-lg md:text-xl font-semibold shadow-xl"
              onClick={() => window.open("https://innerleaps.nl/Calendar", "_blank")}
            >
              Kennismaken met Bas
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Sectie */}
      <TrustSection variant="white" />

      {/* FAQ Sectie */}
      <section className="py-16 md:py-24 bg-brand-off-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-12">
            Veelgestelde vragen
          </h2>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-brand-gray-dark hover:text-brand-orange">
                  Is het programma online?
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg text-brand-gray-medium leading-relaxed">
                  Het programma hoeft niet per se online te zijn, maar een online vorm maakt deelname voor medewerkers
                  makkelijker. Onderzoek laat zien dat online sessies net zo effectief zijn als fysieke bijeenkomsten.
                  Het trainen van aandacht gebeurt vooral door dagelijkse oefening, terwijl de workshops dit proces
                  ondersteunen. Om zoveel mogelijk medewerkers de kans te geven om mee te doen, geven we daarom de
                  voorkeur aan een online programma.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-brand-gray-dark hover:text-brand-orange">
                  15 minuten oefenen per dag, hoe werkt dat?
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg text-brand-gray-medium leading-relaxed">
                  Deelnemers ontvangen bij aanvang een werkboek met per week een stukje theorie en korte oefeningen. Ook
                  krijgen ze audio-opnames van de oefeningen. Een deel van de oefeningen kan worden gedaan tijdens
                  dagelijkse routines, zoals tandenpoetsen, douchen of afwassen, zodat dit geen extra tijd kost. Andere
                  oefeningen vragen ongeveer 12 minuten om rustig zittend de aandacht te trainen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-brand-gray-dark hover:text-brand-orange">
                  Wat voor soort oefeningen zijn het?
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg text-brand-gray-medium leading-relaxed">
                  Alle oefeningen zijn gericht op het trainen van aandacht. Het doel is dat deelnemers met meer focus en
                  bewustzijn werken en leven. Daarom zijn de oefeningen direct toepasbaar in het dagelijks leven,
                  bijvoorbeeld tijdens tandenpoetsen, eten of lopen. Daarnaast bevat elke week een speciale
                  aandachtstraining van 12 minuten die zittend uitgevoerd wordt.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-brand-gray-dark hover:text-brand-orange">
                  Wat als een deelnemer een sessie mist?
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg text-brand-gray-medium leading-relaxed">
                  Bij het missen van een sessie kunnen deelnemers de trainer bellen om toch alle informatie te
                  ontvangen. Daarnaast staat alle benodigde informatie in het werkboek. Voor optimaal resultaat is het
                  belangrijk om niet meer dan één sessie te missen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-brand-gray-dark hover:text-brand-orange">
                  Hoe zorgen jullie voor veilig en comfortabel leren?
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg text-brand-gray-medium leading-relaxed">
                  De training bevat wekelijkse groepsworkshops met maximaal 15 deelnemers. Deelnemers oefenen op een
                  veilige en comfortabele manier door te reageren op concrete vragen, zonder dat ze persoonlijke
                  verhalen hoeven te delen. Zo ontstaat een omgeving waarin iedereen zich op zijn gemak voelt en volop
                  kan oefenen met aandacht.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-brand-gray-dark hover:text-brand-orange">
                  Hoe krijg ik dit programma intern verkocht?
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg text-brand-gray-medium leading-relaxed">
                  Het programma draagt bij aan een daling van verzuim en burn-outgevallen, én maakt deelnemers
                  effectiever in hun werk. Hierdoor is de business case positief. Onze ervaring leert dat het
                  managementteam vaak vooral geïnteresseerd is in het effect op productiviteit. Belangrijk is dat er
                  binnen het managementteam een open houding is ten aanzien van de ontwikkeling van soft skills. Om
                  inzicht te krijgen in de impact voor jullie organisatie, kan je onze calculator gebruiken of kan je
                  een gesprek met Bas plannen.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <div id="calculator">
        <ROICalculator />
      </div>

      <Footer />

      {/* Lazy load calculator modal */}
      <Suspense fallback={null}>
        {isCalculatorOpen && <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />}
      </Suspense>
    </div>
  );
};
export default DuurzameInzetbaarheidTraining;
