import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import raadselImage from '@/assets/9_stippen_raadsel.png';
import oplossingImage from '@/assets/9_stippen_oplossing.png';

const NegenStippen = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="section-padding bg-brand-off-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple mb-6">
            9 Stippen
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-brand-orange mb-6">
            Hoe druk en afleiding jouw focus beïnvloedt
          </h2>
          <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed max-w-4xl mx-auto">
            Deze puzzel laat je ervaren hoe je brein reageert onder druk. Hiermee leggen we je uit waarom aandachtstraining het verschil maakt tussen vastlopen en scherp blijven.
          </p>
        </div>
      </section>

      {/* De Opdracht Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-purple mb-8 text-center">
            De opdracht
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed text-center">
              Verbind de 9 stippen met 4 rechte lijnen zonder je pen van het blad te halen. Je mag niet terug over een eerder getrokken lijn.
            </p>
            
            <div className="flex justify-center">
              <img 
                src={raadselImage} 
                alt="9 stippen raadsel" 
                className="max-w-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* De Uitdaging Section */}
      <section className="section-padding bg-brand-off-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-purple mb-8 text-center">
            Stel je het volgende voor:
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed">
              Je zit met 3 collega's in een restaurant op een druk station. Door de open deur hoor je omroepberichten, haastige reizigers en het geratel van koffers. Mensen lopen voorbij, praten hard.
            </p>

            <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed">
              Jullie leidinggevende loopt binnen en zegt:
            </p>

            <div className="border-l-4 border-brand-orange pl-6 py-4 my-6 bg-white/50">
              <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed italic">
                "Over 3 minuten moet een van jullie je aanpak presenteren aan het hele bedrijf. Andere collega's hebben het raadsel in 1 minuut opgelost."
              </p>
            </div>

            <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed">
              Ja? Heb je de situatie ingebeeld?
            </p>
            
            <p className="text-lg md:text-xl font-bold text-brand-orange text-center pt-4">
              GO! Je hebt 3 minuten. De klok tikt.
            </p>
          </div>
        </div>
      </section>

      {/* De Oplossing Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-purple mb-8 text-center">
            De oplossing
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger className="w-full border-2 border-brand-orange rounded-lg p-6 hover:bg-brand-off-white transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-xl md:text-2xl font-semibold text-brand-orange">
                    {isOpen ? "Verberg de oplossing" : "Klik hier voor de oplossing"}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-6 w-6 text-brand-orange" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-brand-orange" />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-6">
                <div className="flex justify-center">
                  <img 
                    src={oplossingImage} 
                    alt="9 stippen oplossing" 
                    className="max-w-md w-full h-auto"
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* Hoe heb je het ervaren Section */}
      <section className="section-padding bg-brand-off-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-purple mb-8 text-center">
            Hoe heb je het ervaren?
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed">
              Als je het scenario goed hebt kunnen inbeelden, is het niet gek als je:
            </p>
            
            <div className="space-y-3">
              {[
                "Frustratie voelde omdat het niet lukte",
                "Afleiding ervaarde door de drukke omgeving met omroepen",
                "Spanning voelde door de tijdsdruk",
                "Ongemak kreeg bij de mogelijkheid dat jij moet presenteren",
                "Onzekerheid voelde of het jou wel in 1 minuut zou lukken"
              ].map((item, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <span className="text-brand-orange text-xl mt-1">•</span>
                  <p className="text-lg md:text-xl text-brand-gray-medium">{item}</p>
                </div>
              ))}
            </div>
            
            <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed pt-6">
              Dit is allemaal normaal. We vroegen je het scenario in te beelden. Maar als je daadwerkelijk in die drukke ruimte zit en echt die opdracht krijgt? Dan is de impact nog groter.
            </p>
            
            <p className="text-lg md:text-xl font-semibold text-brand-purple pt-4">
              Je probeert een opdracht te doen, maar spanning, druk en onzekerheid leiden je af.
            </p>
          </div>
        </div>
      </section>

      {/* Dit is het echte leven Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed mb-2">
                We worden continu afgeleid. Van wat we willen doen. Van waar we ons op willen richten.
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-purple mt-6">
                Herken je dit?
              </h2>
            </div>
            
            {/* Je hoofd zit vol */}
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-bold text-brand-purple">
                Je hoofd zit vol
              </h3>
              <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed">
                Tijdens een belangrijk gesprek met je partner dwalen je gedachten af naar die deadline van morgen. Je bent aanwezig, maar niet écht aanwezig.
              </p>
            </div>
            
            {/* Je schakelt moeilijk uit */}
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-bold text-brand-purple">
                Je schakelt moeilijk uit
              </h3>
              <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed">
                's Avonds op de bank. Je wil ontspannen, maar je hoofd maakt al de to-do lijst voor morgen. Die ene mail. Die vergadering. Die collega die nog terugkomt.
              </p>
            </div>
            
            {/* Kleine dingen brengen je uit balans */}
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-bold text-brand-purple">
                Kleine dingen brengen je uit balans
              </h3>
              <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed">
                Een collega die onverwacht iets vraagt. File op weg naar huis. Drukte in huis. Het kost je meer energie dan je zou willen. Je irritatie komt sneller.
              </p>
            </div>
            
            {/* Je geniet minder */}
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-bold text-brand-purple">
                Je geniet minder
              </h3>
              <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed">
                Vakantie. Vrije dag. Leuk uitje met de kinderen. Je bent er, maar je hoofd is ergens anders. Die rust die je zoekt? Die vind je niet.
              </p>
            </div>
            
            {/* Presteren kost meer moeite */}
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-bold text-brand-purple">
                Presteren kost meer moeite
              </h3>
              <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed">
                Die presentatie voorbereiden. Dat rapport schrijven. Creatief denken in een brainstorm. Het lukt, maar het kost je meer energie. Je focus is er niet helemaal.
              </p>
            </div>
            
            {/* CTA Vraag */}
            <div className="text-center pt-8">
              <h3 className="text-2xl md:text-3xl font-bold text-brand-purple mb-6">
                Waar ben jij naar op zoek?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-brand-orange text-white font-semibold rounded-lg hover:bg-brand-orange/90 transition-colors">
                  Minder spanning & druk in mijn leven
                </button>
                <button className="px-6 py-3 bg-brand-purple text-white font-semibold rounded-lg hover:bg-brand-purple/90 transition-colors">
                  Beter kunnen presteren
                </button>
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
