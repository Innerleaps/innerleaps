import { useState, useEffect, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { EXTERNAL_URLS } from "@/constants/externalUrls";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import StickyCtaButtons from "@/components/StickyCtaButtons";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Brain,
  Heart,
  Shield,
  Smile,
  Moon,
  CheckCircle,
  AlertCircle,
  Frown,
  BedDouble,
  Calendar,
  Clock,
  Laptop,
  Award,
  Activity,
  RotateCcw,
  BookOpen,
  Star,
  
  Gift,
} from "lucide-react";
import heroBackground from "@/assets/Vitaliteitsprogramma_presentatie_Innerleaps.png";
import masterclassImage from "@/assets/Stressmanagement_masterclass.png";
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

// Lazy load modals for better performance
const MasterclassFormModal = lazy(() => import("@/components/MasterclassFormModal"));
const ProgramRegistrationModal = lazy(() => import("@/components/ProgramRegistrationModal"));

// Trust section logos

const PrestatieProgramma = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToMasterclass = () => {
    const element = document.getElementById("masterclass");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const openGoogleForm = () => {
    window.open(EXTERNAL_URLS.PRESTATIE_PROGRAM_SIGNUP, "_blank", "noopener,noreferrer");
  };

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

  return (
    <div className="min-h-screen">
      <Helmet>
        <meta name="description" content="Innerleaps verbetert prestaties onder druk via gerichte breintraining. Medewerkers trainen focus en aandacht in 6 weken. Gebaseerd op de methode gebruikt door top sporters en world class CEO's." />
      </Helmet>
      <SimplifiedNavigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-start sm:items-center overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBackground}
            alt="Prestatie training presentatie"
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
                  Wetenschappelijk bewezen training
                </div>

                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-heading break-words"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                >
                  <span className="text-brand-orange">Prestaties</span> verbeteren door een krachtiger <span className="text-brand-orange">brein</span>
                </h1>
                <p
                  className="text-xl md:text-2xl text-blue-100 leading-relaxed break-words"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                >
                  Wetenschappelijk bewezen training om prestaties te verbeteren. Mentale scherpte met meer focus voor
                  betere performance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold py-3 px-4 sm:py-4 sm:px-6 rounded-lg text-sm sm:text-base lg:text-lg shadow-xl"
                  onClick={openGoogleForm}
                >
                  Aanmelden training
                </Button>
              </div>
            </div>

            <div className="w-full relative animate-scale-in mt-6 lg:mt-0">
              <div className="w-full rounded-2xl p-4 sm:p-6 lg:p-8 max-w-full sm:max-w-md mx-auto bg-white/50 backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 text-brand-purple">
                      Waarom deelnemers ons kiezen
                    </h3>
                  </div>

                  <div className="w-full space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between w-full p-2.5 sm:p-3 lg:p-4 bg-brand-purple/90 rounded-lg">
                      <span
                        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-normal"
                      >
                        Meer focus, minder fouten
                      </span>
                      <span className="text-brand-orange font-bold text-base sm:text-lg md:text-xl lg:text-2xl shrink-0">
                        25%
                      </span>
                    </div>
                    <div className="flex items-center justify-between w-full p-2.5 sm:p-3 lg:p-4 bg-brand-purple/90 rounded-lg">
                      <span
                        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-normal"
                      >
                        Betere prestatie
                      </span>
                      <span className="text-brand-orange font-bold text-base sm:text-lg md:text-xl lg:text-2xl shrink-0">
                        10%
                      </span>
                    </div>
                    <div className="flex items-center justify-between w-full p-2.5 sm:p-3 lg:p-4 bg-brand-purple/90 rounded-lg">
                      <span
                        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
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

      {/* Probleem Sectie */}
      <section className="py-16 md:py-24 bg-brand-off-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-6">
            Je wil beter kunnen <span className="text-brand-orange">presteren</span>
          </h2>
          <p className="text-xl md:text-2xl text-brand-gray-medium text-center leading-relaxed mb-12">Herken je dit?</p>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 max-w-6xl mx-auto">
            {/* Probleem 1 */}
            <div className="md:col-span-2 bg-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Brain className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                Afleiding kost je focus
              </h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center">
                Je wordt makkelijk uit je concentratie gehaald. Diep werk kost meer moeite dan vroeger, je zweeft
                sneller af.
              </p>
            </div>

            {/* Probleem 2 */}
            <div className="md:col-span-2 bg-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <AlertCircle className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                Mentale vermoeidheid gedurende de dag
              </h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center">
                Halverwege de dag voelt je hoofd al vol. Beslissingen kosten meer energie, je scherpte neemt af.
              </p>
            </div>

            {/* Probleem 3 */}
            <div className="md:col-span-2 bg-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Activity className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                Niet optimaal presteren
              </h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center">
                Je weet dat er meer in zit. Je haalt je targets, maar het voelt alsof je potentieel niet volledig wordt
                benut.
              </p>
            </div>

            {/* Probleem 4 */}
            <div className="md:col-span-2 md:col-start-2 bg-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Clock className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                Veel bezig, niet altijd effectief
              </h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center">
                Je werkt hard, maar niet alles wat je doet levert evenveel op. Prioriteren lukt niet altijd even goed.
              </p>
            </div>

            {/* Probleem 5 */}
            <div className="md:col-span-2 bg-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <BedDouble className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                Niet optimaal herstellen
              </h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center">
                Ook als je ligt te slapen, blijft je hoofd soms aanstaan. Daardoor word je niet echt uitgerust wakker en
                merk je dat je dingen sneller vergeet of minder goed kunt onthouden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Oplossing Sectie */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-6">
            Beter <span className="text-brand-orange">presteren</span> met meer{" "}
            <span className="text-brand-orange">focus</span>
          </h2>
          <p className="text-xl md:text-2xl text-brand-gray-medium text-center leading-relaxed mb-12">
            Wetenschappelijk bewezen effecten:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 max-w-6xl mx-auto">
            {/* Oplossing 1 */}
            <div className="md:col-span-2 bg-brand-off-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Brain className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">Scherper focus</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <p className="text-base md:text-lg text-brand-gray-medium">
                    Je aandacht is waar jij hem wil hebben. Diep werken gaat makkelijker, afleidingen hebben minder
                    grip.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <p className="text-base md:text-lg text-brand-gray-medium">
                    {" "}
                    In aandachttesten maken deelnemers 25% minder fouten door de training.
                  </p>
                </div>
              </div>
            </div>

            {/* Oplossing 2 */}
            <div className="md:col-span-2 bg-brand-off-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Activity className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">Meer mentale energie</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <p className="text-base md:text-lg text-brand-gray-medium">
                    Je hoofd blijft helder gedurende de dag. Beslissingen kosten minder kracht, je eindigt je werkdag
                    met energie over.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <p className="text-base md:text-lg text-brand-gray-medium">
                    Verminderde mentale vermoeidheid door efficiënter breingebruik.
                  </p>
                </div>
              </div>
            </div>

            {/* Oplossing 3 */}
            <div className="md:col-span-2 bg-brand-off-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <CheckCircle className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                Verhoogde productiviteit
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <p className="text-base md:text-lg text-brand-gray-medium">
                    Je haalt meer uit je dag. Betere focus betekent betere output in minder tijd.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <p className="text-base md:text-lg text-brand-gray-medium">
                    Wetenschappelijk bewezen: Deelnemers rapporteren 10% beter te presteren.
                  </p>
                </div>
              </div>
            </div>

            {/* Oplossing 4 */}
            <div className="md:col-span-2 md:col-start-2 bg-brand-off-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <BookOpen className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">Helder prioriteren</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <p className="text-base md:text-lg text-brand-gray-medium">
                    Je maakt sneller de juiste keuzes. Verhoogde awareness geeft inzicht in wat écht belangrijk is.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <p className="text-base md:text-lg text-brand-gray-medium">
                    Betere besluitvorming door training van jouw neocortex.
                  </p>
                </div>
              </div>
            </div>

            {/* Oplossing 5 */}
            <div className="md:col-span-2 bg-brand-off-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <BedDouble className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                Beter slapen & sterker geheugen
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <p className="text-base md:text-lg text-brand-gray-medium">
                    Je komt écht tot rust in je hoofd voordat je gaat slapen. Je wordt uitgeruster wakker en merkt dat
                    je dingen makkelijker onthoudt.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <p className="text-base md:text-lg text-brand-gray-medium">
                    Deelnemers geven aan 20% beter te slapen en informatie makkelijker te onthouden.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-xl text-brand-gray-medium mb-6">Wil jij dit ook bereiken?</p>
            <Button
              onClick={() => setIsRegistrationModalOpen(true)}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white py-3 px-8 rounded-lg text-lg font-semibold"
            >
              Aanmelden Training
            </Button>
          </div>
        </div>
      </section>

      {/* Training Features Sectie */}
      <section className="py-16 md:py-24 bg-brand-off-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-6">
            De 6-weekse <span className="text-brand-orange">prestatie</span> training
          </h2>
          <p className="text-xl md:text-2xl text-brand-gray-medium text-center leading-relaxed mb-12">
            Wetenschappelijk bewezen. Praktisch toepasbaar. Meetbare resultaten.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="bg-white p-6 rounded-xl space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <Calendar className="h-10 w-10 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                6 wekelijkse online workshops
              </h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                Elke week 60 minuten live training met gecertificeerde trainers. Je zit in een groep met anderen omdat
                je hiervan het meeste leert. We creëren een veilige setting en je hoeft nooit verplicht mee te doen.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <Clock className="h-10 w-10 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                Dagelijks 15 minuten oefenen
              </h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                Audio-opnames en werkboek met concrete oefeningen die je direct in je leven toepast. Nauwelijks extra
                tijd nodig. Oefen tijdens tandenpoetsen, douchen of afwassen.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <Laptop className="h-10 w-10 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">Online workshops</h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                Onderzoek toont aan dat het online training even effectief is. Om het je extra makkelijk te maken zijn
                daardoor alle workshops online.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <Award className="h-10 w-10 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">Lifetime toegang</h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                Ook na de training toegang tot alle materialen en de community.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-xl text-brand-gray-medium mb-6">Klaar om ook te starten?</p>
            <Button
              onClick={openGoogleForm}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white py-3 px-8 rounded-lg text-lg font-semibold"
            >
              Aanmelden Training
            </Button>
          </div>
        </div>
      </section>

      {/* 6 Weken Thema's Sectie */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-12">
            Ons <span className="text-brand-orange">6-weekse</span> kernprogramma
          </h2>

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6 text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              <p>
                Met onze <strong>"push-ups voor je brein"</strong> train jij je brein. Hiermee versterk je twee cruciale hersensystemen.
              </p>

              <p>
                Je controlecentrum wordt sterker. Je onderdrukt impulsieve automatische reacties, filtert irrelevante
                informatie en neemt bewustere beslissingen over je werkdruk.
              </p>

              <p>
                Je waarschuwingssysteem wordt gevoeliger. Je herkent stresssignalen op tijd en reguleert spanning,
                waardoor werkgeheugen vrijkomt om te presteren en uitval wordt voorkomen.
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

          <div className="text-center mb-16">
            <p className="text-xl md:text-2xl text-brand-gray-medium mb-4">Meer weten over onze methode?</p>
            <Link to="/de-methode">
              <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white py-3 px-8 rounded-lg text-lg font-semibold">
                Ontdek de methode
              </Button>
            </Link>
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
                opmerkt voordat spanning je overneemt. Jij pakt de controle omdat je gevoelsantennes scherper worden.
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

          <div className="text-center mt-12">
            <p className="text-xl text-brand-gray-medium mb-6">Ben je ook zo enthousiast?</p>
            <Button
              onClick={openGoogleForm}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white py-3 px-8 rounded-lg text-lg font-semibold"
            >
              Aanmelden Training
            </Button>
          </div>
        </div>
      </section>

      {/* Prijs Sectie */}
      <section className="py-16 md:py-24 bg-brand-off-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-6">
            Laat je <span className="text-brand-orange">werkgever</span> jou deelname{" "}
            <span className="text-brand-orange">vergoeden</span>
          </h2>
          <p className="text-xl md:text-2xl text-brand-gray-medium text-center leading-relaxed mb-12 max-w-4xl mx-auto">
            Veel werkgevers vergoeden deze training vanuit het persoonlijk ontwikkelingsbudget. Wij leveren een brochure
            om het gesprek met je werkgever makkelijk te maken.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl text-center space-y-4 shadow-lg">
              <h3 className="text-2xl font-bold text-brand-gray-dark">Betaald door werkgever</h3>
              <p className="text-4xl font-bold text-brand-orange">€695</p>
              <p className="text-lg text-brand-gray-medium">ex BTW</p>
            </div>

            <div className="bg-white p-8 rounded-xl text-center space-y-4 shadow-lg">
              <h3 className="text-2xl font-bold text-brand-gray-dark">Particulier</h3>
              <p className="text-4xl font-bold text-brand-orange">€695</p>
              <p className="text-lg text-brand-gray-medium">incl BTW</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-xl text-brand-gray-medium mb-6">Wil jij nu een leven met meer prestatie en focus?</p>
            <Button
              onClick={openGoogleForm}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white py-3 px-8 rounded-lg text-lg font-semibold"
            >
              Aanmelden Training
            </Button>
          </div>
        </div>
      </section>

      {/* Masterclass Sectie */}
      <section id="masterclass" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-6">
            Ervaar het zelf, <span className="text-brand-orange">gratis</span> met onze{" "}
            <span className="text-brand-orange">online masterclass</span>
          </h2>
          <p className="text-xl md:text-2xl text-brand-gray-medium text-center leading-relaxed mb-12 max-w-4xl mx-auto">
            Ben je enthousiast maar wil je eerst ervaren hoe aandachtstraining werkt? In 60 minuten maak je op speelse
            wijze kennis met onze aanpak. Wat krijg je in de masterclass?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
            <div className="bg-brand-off-white p-6 rounded-xl space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <Activity className="h-10 w-10 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark text-center">Stress level</h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                Krijg inzicht in jouw stress level. Volledig wetenschappelijk onderbouwd.
              </p>
            </div>

            <div className="bg-brand-off-white p-6 rounded-xl space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <Brain className="h-10 w-10 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark text-center">Aandachtoefening</h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                Ervaar een techniek om controle over je autopiloot te krijgen en focus terug te pakken. Volledig
                wetenschappelijk onderbouwd.
              </p>
            </div>

            <div className="bg-brand-off-white p-6 rounded-xl space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <RotateCcw className="h-10 w-10 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark text-center">Reset tool</h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                Leer een tool om je werkgeheugen te resetten en aandacht direct terug te pakken.
              </p>
            </div>

            <div className="bg-brand-off-white p-6 rounded-xl space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <Gift className="h-10 w-10 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark text-center">Gratis</h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                Wij geloven dat iedereen onze effectieve techniek moet kunnen proberen. Daarom is onze masterclass
                volledig gratis en vrijblijvend.
              </p>
            </div>
          </div>

          {/* CTA Section - 4 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            {/* Column 1-2: Quote and CTA */}
            <div className="md:col-span-2 flex flex-col gap-6 justify-center">
              {/* Review Quote */}
              <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-2 mb-3 justify-center">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-semibold text-brand-gray-dark text-lg">4,7 / 5</span>
                </div>
                <p className="text-base text-brand-gray-dark italic leading-relaxed text-center">
                  "Deze workshop laat je duidelijk het belang zien van het trainen van je aandachtsspier. De workshop
                  bestaat uit een mooie mix tussen oefeningen en theorie, waardoor je gelijk al wat ervaring opdoet.
                  Denk dat iedereen hier wat aan heeft, dus kan dit zeker aanbevelen."
                </p>
              </div>

              {/* CTA Button */}
              <Button
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white py-4 px-8 rounded-lg text-lg md:text-xl font-semibold shadow-xl w-full"
                onClick={handleModalOpen}
              >
                Aanmelden gratis masterclass
              </Button>
            </div>

            {/* Column 3-4: Masterclass Photo */}
            <div className="md:col-span-2">
              <img
                src={masterclassImage}
                alt="Prestatie training masterclass bij Innerleaps"
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Modal - lazy loaded */}
          <Suspense fallback={null}>
            {isModalOpen && <MasterclassFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
          </Suspense>
        </div>
      </section>

      {/* Trust Sectie */}
      <TrustSection variant="off-white" />

      {/* FAQ Sectie */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-12">
            Veelgestelde vragen
          </h2>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-brand-off-white rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-brand-gray-dark hover:text-brand-orange">
                  Waarom zijn de masterclass en de training online?
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg text-brand-gray-medium leading-relaxed">
                  Wetenschappelijk is bewezen dat online even effectief is als fysiek. Omdat het even effectief is,
                  kiezen we voor de optie die de minste tijd kost voor deelnemers. Geen reistijd, gewoon vanuit huis of
                  kantoor.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-brand-off-white rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-brand-gray-dark hover:text-brand-orange">
                  Waarom wil mijn werkgever de training vergoeden?
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg text-brand-gray-medium leading-relaxed">
                  Stress kost werkgevers enorm veel geld. Zowel in verzuim als in verminderde prestatie. Werkgevers
                  willen je graag helpen om dit te verbeteren. Wij overhandigen je een brochure waardoor je werkgever
                  dit makkelijk kan begrijpen en goedkeuren.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-brand-off-white rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-brand-gray-dark hover:text-brand-orange">
                  15 minuten oefenen per dag, hoe werkt dat?
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg text-brand-gray-medium leading-relaxed">
                  Als je start krijg je van ons een werkboek. Daar staat voor elke week een stukje theorie in en korte
                  oefeningen. Tevens ontvang je audio-opnames van de oefeningen. Sommige oefeningen doe je tijdens
                  dagelijkse activiteiten zoals tandenpoetsen, douchen of afwassen – dus geen extra tijd. Andere
                  oefeningen vragen 12 minuten stilzitten in een stoel.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-brand-off-white rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-brand-gray-dark hover:text-brand-orange">
                  Wat voor soort oefeningen zijn het?
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg text-brand-gray-medium leading-relaxed space-y-4">
                  <p>Deelnemers doen op twee manieren hun "Brein push-ups"</p>

                  <div className="space-y-2">
                    <p className="font-semibold text-brand-gray-dark">Geplande training (12 minuten per dag)</p>
                    <p>
                      Dagelijkse audio-oefeningen waarin je je aandacht richt op je ademhaling of lichaam. Klinkt
                      makkelijk? Je geest vindt er niks aan. Binnen seconden denk je aan je to-do's of die meeting. Elk
                      moment dat je je focus terugbrengt? Dat is de push-up die je controlecentrum versterkt.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-brand-gray-dark">Training in je dagelijks leven</p>
                    <p>
                      Je brengt bewuste aandacht naar alledaagse activiteiten. Tijdens je ochtendkoffie, op weg naar je
                      werk, of voordat je een belangrijke meeting ingaat. Je traint je brein om scherp te zijn wanneer
                      het ertoe doet. Het kost geen extra tijd en je wordt productiever in wat je doet.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-brand-off-white rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-brand-gray-dark hover:text-brand-orange">
                  Wat als ik een week mis?
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg text-brand-gray-medium leading-relaxed">
                  Bij het missen van een sessie kunnen deelnemers de trainer bellen om toch alle informatie te
                  ontvangen. Daarnaast staat alle benodigde informatie in het werkboek. Voor optimaal resultaat is het
                  belangrijk om niet meer dan één sessie te missen.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Program Registration Modal - lazy loaded */}
      <Suspense fallback={null}>
        {isRegistrationModalOpen && (
          <ProgramRegistrationModal
            isOpen={isRegistrationModalOpen}
            onClose={() => setIsRegistrationModalOpen(false)}
            programType="prestatie"
          />
        )}
      </Suspense>

      <StickyCtaButtons onMasterclassClick={scrollToMasterclass} onProgramRegistrationClick={openGoogleForm} />

      <Footer />
    </div>
  );
};

export default PrestatieProgramma;
