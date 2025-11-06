import { useState, useEffect } from "react";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import MasterclassFormModal from "@/components/MasterclassFormModal";
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
  Check,
  Gift,
} from "lucide-react";
import heroBackground from "@/assets/Vitaliteitsprogramma_presentatie_Innerleaps.png";
import masterclassImage from "@/assets/Stressmanagement_masterclass.png";

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
import vmbLogo from "@/assets/Geaccrediteerde_vitaliteitstrainers_bij_Innerleaps.png";
import uMassLogo from "@/assets/Vitaliteitsprogramma_ontwikkeld_door_university_of_massachusetts.png";
import oxfordLogo from "@/assets/Vitaliteitsprogramma_ontwikkeld_door_oxford.jpg";
import vgzLogo from "@/assets/Vitaliteitprogramma_herkent_door_vgz.png";
import czLogo from "@/assets/Vitaliteitsprogramma_herkend_door_CZ.png";
import uvaLogo from "@/assets/Aandachttraining_aan_de_universiteit_van_amsterdam_new.png";
import menzisLogo from "@/assets/Vitaliteitsprogramma_herkend_door_menzis.png";

const PrestatieProgramma = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <SimplifiedNavigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-start sm:items-center overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBackground}
            alt="Prestatie programma presentatie"
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
                <div className="inline-flex items-center gap-2 bg-white/50 text-brand-purple px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium backdrop-blur-sm">
                  <Award className="h-4 w-4" />
                  Wetenschappelijk bewezen programma
                </div>

                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-heading break-words"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                >
                  Een <span className="text-brand-orange">krachtiger brein</span> voor betere prestaties
                </h1>
                <p
                  className="text-xl md:text-2xl text-blue-100 leading-relaxed break-words"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                >
                  Wetenschappelijk bewezen programma om prestaties te verbeteren. Mentale scherpte met meer focus voor
                  betere performance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold py-3 px-4 sm:py-4 sm:px-6 rounded-lg text-sm sm:text-base lg:text-lg shadow-xl"
                  onClick={scrollToMasterclass}
                >
                  Gratis Masterclass
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
                        className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-normal"
                      >
                        Meer focus
                      </span>
                      <span className="text-brand-orange font-bold text-sm sm:text-base md:text-lg shrink-0">25%</span>
                    </div>
                    <div className="flex items-center justify-between w-full p-2.5 sm:p-3 lg:p-4 bg-brand-purple/90 rounded-lg">
                      <span
                        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                        className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-normal"
                      >
                        Betere prestatie
                      </span>
                      <span className="text-brand-orange font-bold text-sm sm:text-base md:text-lg shrink-0">10%</span>
                    </div>
                    <div className="flex items-center justify-between w-full p-2.5 sm:p-3 lg:p-4 bg-brand-purple/90 rounded-lg">
                      <span
                        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                        className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-normal"
                      >
                        Wetenschappelijk onderzoek
                      </span>
                      <span className="text-brand-orange font-bold text-sm sm:text-base md:text-lg shrink-0">
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
                    <p className="text-amber-100 text-xs text-center mt-1">Google Reviews</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mt-8 sm:mt-12 lg:mt-16">
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
              <div className="flex gap-8 animate-marquee">
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
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">Niet optimaal herstellen</h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center">
                Ook als je ligt te slapen, blijft je hoofd soms aanstaan. Daardoor word je niet echt uitgerust wakker en merk je dat je dingen sneller vergeet of minder goed kunt onthouden.
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
                  <p className="text-base md:text-lg text-brand-gray-medium">Verwacht 25% meer focus.</p>
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
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">Beter slapen & sterker geheugen</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <p className="text-base md:text-lg text-brand-gray-medium">
                    Je komt écht tot rust in je hoofd voordat je gaat slapen. Je wordt uitgeruster wakker en merkt dat je dingen makkelijker onthoudt.
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
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white py-3 px-8 rounded-lg text-lg font-semibold">
              Aanmelden Programma
            </Button>
          </div>
        </div>
      </section>

      {/* Programma Features Sectie */}
      <section className="py-16 md:py-24 bg-brand-off-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-6">
            Het 6-weekse <span className="text-brand-orange">prestatie</span> programma. Van potentieel naar performance
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
                Onderzoek toont aan dat het online programma even effectief is. Om het je extra makkelijk te maken zijn
                daardoor alle workshops online.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <Award className="h-10 w-10 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">Lifetime toegang</h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                Ook na het programma toegang tot alle materialen en de community.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-xl text-brand-gray-medium mb-6">Klaar om ook te starten?</p>
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white py-3 px-8 rounded-lg text-lg font-semibold">
              Aanmelden Programma
            </Button>
          </div>
        </div>
      </section>

      {/* 6 Weken Thema's Sectie */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-12">
            6 weken, 6 thema's voor <span className="text-brand-orange">echte verandering</span>
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-brand-off-white p-6 rounded-xl space-y-2">
              <div className="flex items-center gap-3">
                <span className="bg-brand-orange text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Week 1
                </span>
                <h3 className="text-xl font-bold text-brand-gray-dark">Loskomen van de automatische piloot</h3>
              </div>
              <p className="text-lg text-brand-gray-medium leading-relaxed">
                Herken wanneer je op de automatische piloot zit en leer je aandacht terug te pakken.
              </p>
            </div>

            <div className="bg-brand-off-white p-6 rounded-xl space-y-2">
              <div className="flex items-center gap-3">
                <span className="bg-brand-orange text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Week 2
                </span>
                <h3 className="text-xl font-bold text-brand-gray-dark">Stress signalen van het lichaam herkennen</h3>
              </div>
              <p className="text-lg text-brand-gray-medium leading-relaxed">
                Je lichaam geeft signalen. Leer ze tijdig herkennen voordat spanning escaleert.
              </p>
            </div>

            <div className="bg-brand-off-white p-6 rounded-xl space-y-2">
              <div className="flex items-center gap-3">
                <span className="bg-brand-orange text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Week 3
                </span>
                <h3 className="text-xl font-bold text-brand-gray-dark">Met aandacht door het dagelijkse leven</h3>
              </div>
              <p className="text-lg text-brand-gray-medium leading-relaxed">
                Integreer aandacht in je dagelijkse routines. Praktisch en toepasbaar.
              </p>
            </div>

            <div className="bg-brand-off-white p-6 rounded-xl space-y-2">
              <div className="flex items-center gap-3">
                <span className="bg-brand-orange text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Week 4
                </span>
                <h3 className="text-xl font-bold text-brand-gray-dark">Omgaan met stressvolle gedachten</h3>
              </div>
              <p className="text-lg text-brand-gray-medium leading-relaxed">
                Gedachten zijn geen feiten. Leer ruimte te creëren tussen gedachte en reactie.
              </p>
            </div>

            <div className="bg-brand-off-white p-6 rounded-xl space-y-2">
              <div className="flex items-center gap-3">
                <span className="bg-brand-orange text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Week 5
                </span>
                <h3 className="text-xl font-bold text-brand-gray-dark">Samenwerken en luisteren met aandacht</h3>
              </div>
              <p className="text-lg text-brand-gray-medium leading-relaxed">
                Betere communicatie door bewuste aandacht in gesprekken en samenwerking.
              </p>
            </div>

            <div className="bg-brand-off-white p-6 rounded-xl space-y-2">
              <div className="flex items-center gap-3">
                <span className="bg-brand-orange text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Week 6
                </span>
                <h3 className="text-xl font-bold text-brand-gray-dark">Implementatie in het dagelijks leven</h3>
              </div>
              <p className="text-lg text-brand-gray-medium leading-relaxed">
                Maak het blijvend. Integreer de geleerde technieken in je dagelijkse routine.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-xl text-brand-gray-medium mb-6">Ben je ook zo enthousiast?</p>
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white py-3 px-8 rounded-lg text-lg font-semibold">
              Aanmelden Programma
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
            Veel werkgevers vergoeden dit programma vanuit het persoonlijk ontwikkelingsbudget. Wij leveren een brochure
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
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white py-3 px-8 rounded-lg text-lg font-semibold">
              Aanmelden Programma
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
                alt="Prestatie programma masterclass bij Innerleaps"
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Modal */}
          <MasterclassFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      </section>

      {/* Trust Sectie */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-12">
            Waarom deelnemers voor <span className="text-brand-orange">ons kiezen</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-brand-off-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start space-x-3 mb-4">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-6 w-6 text-brand-orange stroke-[3]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-brand-purple mb-3">
                    Onderliggende methode erkend door Nederlandse zorgsysteem
                  </h3>
                  <p className="text-xl text-brand-gray-medium leading-relaxed mb-6">
                    De nederlandse zorgverzekeraars erkennen de methode van Innerleaps als effectief bij
                    stressmanagement.
                  </p>
                  <div className="flex flex-row gap-4 items-center flex-wrap">
                    <img src={vgzLogo} alt="Vitaliteitsprogramma herkend door VGZ" className="h-24 object-contain" />
                    <img src={czLogo} alt="Vitaliteitsprogramma herkend door CZ" className="h-24 object-contain" />
                    <img
                      src={menzisLogo}
                      alt="Vitaliteitsprogramma herkend door Menzis"
                      className="h-20 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-off-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start space-x-3 mb-4">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-6 w-6 text-brand-orange stroke-[3]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-brand-purple mb-3">40 jaar wetenschappelijk onderzoek</h3>
                  <p className="text-xl text-brand-gray-medium leading-relaxed mb-6">
                    Gebaseerd op de wetenschappelijke MBSR-methode, een van de best onderzochte interventies wereldwijd.
                  </p>
                  <div className="flex flex-row gap-4 items-center flex-wrap">
                    <img
                      src={oxfordLogo}
                      alt="Vitaliteitsprogramma ontwikkeld door Oxford University"
                      className="h-24 rounded border border-border object-contain"
                    />
                    <img
                      src={uMassLogo}
                      alt="Vitaliteitsprogramma ontwikkeld door University of Massachusetts"
                      className="h-24 object-contain"
                    />
                    <img
                      src={uvaLogo}
                      alt="Aandachttraining aan de Universiteit van Amsterdam"
                      className="h-24 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-off-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start space-x-3 mb-4">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-6 w-6 text-brand-orange stroke-[3]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-brand-purple mb-3">VMBN gecertificeerd</h3>
                  <p className="text-xl text-brand-gray-medium leading-relaxed mb-6">
                    Al onze trainers zijn VMBN categorie 1 gecertificeerd, de hoogste erkenning binnen de VMBN. Dit
                    betekent dat zij voldoen aan de strengste kwaliteitseisen op het gebied van opleiding, ervaring en
                    professionaliteit.
                  </p>
                  <div className="flex flex-row gap-4 items-center flex-wrap">
                    <img
                      src={vmbLogo}
                      alt="Geaccrediteerde vitaliteitstrainers bij InnerLeaps"
                      className="h-32 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="https://www.google.com/maps/place/Innerleaps/@52.1909763,5.2795551,7z/data=!4m8!3m7!1s0x41d7861255c94705:0x571bbf751b212eea!8m2!3d52.1909763!4d5.2795551!9m1!1b1!16s%2Fg%2F11y10xf1qm?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xl font-semibold text-brand-gray-dark">4,7 / 5 op Google Reviews</span>
            </a>
          </div>
        </div>
      </section>

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
                  Waarom is de masterclass en het programma online?
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg text-brand-gray-medium leading-relaxed">
                  Wetenschappelijk is bewezen dat online even effectief is als fysiek. Omdat het even effectief is,
                  kiezen we voor de optie die de minste tijd kost voor deelnemers. Geen reistijd, gewoon vanuit huis of
                  kantoor.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-brand-off-white rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-brand-gray-dark hover:text-brand-orange">
                  Waarom wil mijn werkgever het programma vergoeden?
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
                <AccordionContent className="text-base md:text-lg text-brand-gray-medium leading-relaxed">
                  Het doel is om minder spanning in je leven te krijgen. Daarom zijn de oefeningen ook echt toegepast op
                  je leven. Denk aan aandachtsoefeningen tijdens dagelijkse activiteiten zoals tandenpoetsen, eten,
                  lopen. Daarnaast probeer je elke dag een aandachttraining te doen van 12 minuten.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-brand-off-white rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-brand-gray-dark hover:text-brand-orange">
                  Wat als ik een week mis?
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg text-brand-gray-medium leading-relaxed">
                  Je krijgt lifetime toegang tot alle materialen en opnames. Gemiste sessies kun je terug kijken. We
                  raden wel aan maximaal 1 sessie te missen voor optimaal resultaat.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Sticky CTA Button */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 animate-scale-in">
        <Button
          size="lg"
          className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold py-3 sm:py-5 px-4 sm:px-10 rounded-lg text-base sm:text-lg shadow-2xl whitespace-nowrap"
          onClick={scrollToMasterclass}
        >
          <span className="hidden sm:inline">Gratis Masterclass</span>
          <span className="sm:hidden">Masterclass</span>
        </Button>
      </div>

      <Footer showNavigation={false} />
    </div>
  );
};

export default PrestatieProgramma;
