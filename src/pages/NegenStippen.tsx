import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, ArrowDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import raadselImage from "@/assets/9_stippen_raadsel.png";
import oplossingImage from "@/assets/9_stippen_oplossing.png";
import kantineImage from "@/assets/druk_en_spanning_stressmanagement.jpg";
const NegenStippen = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section with Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src={kantineImage} alt="Drukke bedrijfskantine" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full section-padding">
          <div className="container-custom">
            {/* Title - gecentreerd boven de kolommen */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-12">
              Hoe <span className="text-brand-orange">druk</span> en{" "}
              <span className="text-brand-orange">afleiding</span> jouw <span className="text-brand-orange">focus</span>{" "}
              beïnvloedt
            </h1>

            {/* Two Column Grid */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
              {/* Left Column - Scenario */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 lg:p-8 space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-brand-purple">Stel je het volgende voor</h2>

                <p className="text-base md:text-lg text-brand-gray-medium leading-relaxed">
                  Je zit in een sollicitatiegesprek. Niet alleen, er zijn 3 andere kandidaten. Jullie zitten in de
                  drukke bedrijfskantine. Om jullie heen lopen mensen, klinkt bestek, gesprekken, een koffiemachine die
                  stomt.
                </p>

                <p className="text-base md:text-lg text-brand-gray-medium leading-relaxed">
                  Je potentiële nieuwe manager legt een vel papier voor jullie neer en zegt:
                </p>

                <div className="border-l-4 border-brand-orange pl-4 py-3 space-y-3">
                  <p className="text-base md:text-lg text-brand-gray-medium italic">
                    "Ik wil kijken of jullie scherp zijn, creatief met oplossingen kunnen komen en snel kunnen werken.
                    Daarom wil ik dat jullie dit raadsel oplossen."
                  </p>
                  <p className="text-base md:text-lg text-brand-gray-medium italic">
                    "Jullie hebben drie minuten. Maar de meeste kandidaten lossen dit op in 1 minuut."
                  </p>
                  <p className="text-base md:text-lg text-brand-gray-medium italic">
                    "Ik zal aan één van jullie vragen om zijn of haar aanpak te presenteren."
                  </p>
                </div>

                <p className="text-base md:text-lg text-brand-gray-medium leading-relaxed">
                  Hij kijkt jullie aan. De andere kandidaten buigen zich al over het papier.
                </p>

                <p className="text-lg md:text-xl font-bold text-brand-orange text-center">
                  Je hebt 3 minuten. De klok tikt.
                  <br />
                  <span className="text-2xl">GO! Begin nu.</span>
                </p>
              </div>

              {/* Right Column - Opdracht */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 lg:p-8 space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-brand-purple">De opdracht</h2>

                <p className="text-base md:text-lg text-brand-gray-medium leading-relaxed">
                  Verbind de 9 stippen met 4 rechte lijnen zonder je pen van het blad te halen. Je mag niet terug over
                  een eerder getrokken lijn.
                </p>

                <div className="flex justify-center">
                  <img src={raadselImage} alt="9 stippen raadsel" className="max-w-xs w-full h-auto" />
                </div>

                {/* Oplossing collapsible */}
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                  <CollapsibleTrigger className="w-full border-2 border-brand-orange rounded-lg p-4 hover:bg-white transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-lg md:text-xl font-semibold text-brand-orange">
                        {isOpen ? "Verberg de oplossing" : "Klik hier voor de oplossing"}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-brand-orange" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-brand-orange" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4">
                    <div className="flex justify-center">
                      <img src={oplossingImage} alt="9 stippen oplossing" className="max-w-xs w-full h-auto" />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>

            {/* Arrow Down met tekst */}
            <div className="flex flex-col items-center mt-12 lg:mt-16">
              <p className="text-white text-lg md:text-xl font-semibold mb-4">Lees hieronder verder</p>
              <ArrowDown className="h-8 w-8 text-brand-orange animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Hoe heb je het ervaren Section */}
      <section className="section-padding bg-brand-off-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-purple mb-8 text-center">Hoe heb je het ervaren?</h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed">
              Als je het scenario goed hebt kunnen inbeelden, is het niet gek als je:
            </p>

            <div className="space-y-3">
              {[
                "Frustratie voelde omdat het niet lukte",
                "Afleiding ervaarde door de drukke kantine met gesprekken en rondlopende mensen",
                "Spanning voelde door de tijdsdruk en competitie",
                "Ongemak kreeg bij de mogelijkheid dat jij moet presenteren",
                "Onzekerheid voelde of je het wel sneller dan de anderen zou oplossen",
              ].map((item, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <span className="text-brand-orange text-xl mt-1">•</span>
                  <p className="text-lg md:text-xl text-brand-gray-medium">{item}</p>
                </div>
              ))}
            </div>

            <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed pt-6">
              Dit is allemaal normaal. We vroegen je het scenario in te beelden. Maar als je daadwerkelijk in die drukke
              ruimte zit en echt die opdracht krijgt? Dan is de impact nog groter.
            </p>

            <p className="text-lg md:text-xl font-semibold text-brand-purple pt-4">
              Je probeert een opdracht te doen, maar spanning, druk en onzekerheid leiden je af.
            </p>

            {/* CTA Knoppen */}
            <div className="text-center pt-8">
              <h3 className="text-2xl md:text-3xl font-bold text-brand-purple mb-6">Waar ben jij naar op zoek?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/stressmanagement-programma"
                  className="px-8 py-4 bg-brand-purple text-white text-lg font-semibold rounded-lg hover:bg-brand-purple/90 transition-colors shadow-md text-center"
                >
                  Minder spanning & druk in mijn leven
                </Link>
                <Link 
                  to="/prestatie-programma"
                  className="px-8 py-4 bg-brand-purple text-white text-lg font-semibold rounded-lg hover:bg-brand-purple/90 transition-colors shadow-md text-center"
                >
                  Met meer focus beter presteren
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default NegenStippen;
