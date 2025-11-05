import { useState, useEffect } from 'react';
import SimplifiedNavigation from '@/components/SimplifiedNavigation';
import Footer from '@/components/Footer';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import raadselImage from '@/assets/9_stippen_raadsel.png';
import oplossingImage from '@/assets/9_stippen_oplossing.png';
import aandachtsystemenImage from '@/assets/3_aandachtsystemen.png';
import volWerkgeheugenImage from '@/assets/vol_werkgeheugen.png';
import focusBehouden from '@/assets/focus_behouden_en_afleiding_buiten_houden.png';

const NegenStippenOplossing = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SimplifiedNavigation />
      
      {/* Hero Section */}
      <section className="section-padding bg-brand-off-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple mb-4">
            9 Stippen Oefening
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-brand-purple mb-6">
            Hoe druk en afleiding jouw focus beïnvloedt
          </h2>
          <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed max-w-4xl mx-auto">
            Deze simpele puzzel laat je direct ervaren hoe je brein reageert onder druk - en waarom aandachtstraining het verschil maakt tussen vastlopen en scherp blijven.
          </p>
        </div>
      </section>

      {/* De Opdracht Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple mb-8 text-center">
            DE OPDRACHT
          </h2>
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed">
              Verbind de 9 stippen met 4 rechte lijnen zonder je pen van het blad te halen.
            </p>
            <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed">
              Je mag niet terug over een eerder getrokken lijn.
            </p>
            <div className="flex justify-center my-8">
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple mb-8 text-center">
            NU KOMT DE UITDAGING
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed">
              Stel je het volgende voor:
            </p>
            <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed">
              Je zit met 3 collega's in een restaurant op een druk station. Door de open deur hoor je omroepberichten, haastige reizigers en het geratel van koffers. Mensen lopen voorbij, praten hard.
            </p>
            <div className="border-l-4 border-brand-orange pl-6 py-4 my-6 bg-white/50">
              <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed italic">
                Jullie leidinggevende loopt binnen en zegt:
              </p>
              <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed italic mt-2">
                "Over 3 minuten moet een van jullie je aanpak presenteren aan het hele bedrijf. Andere collega's hebben het raadsel in 1 minuut opgelost."
              </p>
            </div>
            <p className="text-lg md:text-xl font-bold text-brand-orange text-center">
              "GO! Begin nu. De klok tikt."
            </p>
          </div>
        </div>
      </section>

      {/* De Oplossing (Collapsible) Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
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
              <CollapsibleContent className="mt-6 space-y-6">
                <div className="flex justify-center">
                  <img 
                    src={oplossingImage} 
                    alt="9 stippen oplossing" 
                    className="max-w-md w-full h-auto"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed">
                    Het geheim? Je moet buiten het denkbeeldige kader denken. De meeste mensen blijven binnen de grenzen van de stippen, maar de opdracht vraagt dat niet. De lijnen mogen buiten het grid.
                  </p>
                  <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed">
                    Heb je de oplossing gevonden onder druk? Of merk je dat je vastliep? Merkte je spanning? Voelde je frustratie?
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* Wat Er Gebeurde In Jouw Brein Section */}
      <section className="section-padding bg-brand-off-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple mb-12 text-center">
            WAT ER GEBEURDE IN JOUW BREIN
          </h2>

          {/* Het werkgeheugen raakt vol */}
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-brand-purple mb-6">
              Het werkgeheugen raakt vol
            </h3>
            <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed mb-8">
              Je brein heeft drie aandachtsystemen die samenwerken:
            </p>
            
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-8">
              <div className="flex justify-center">
                <img 
                  src={aandachtsystemenImage} 
                  alt="De drie aandachtsystemen" 
                  className="max-w-md w-full h-auto rounded-lg"
                />
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="text-brand-orange text-2xl font-bold mt-1">•</span>
                  <div>
                    <p className="text-lg md:text-xl font-semibold text-brand-purple">De jongleur</p>
                    <p className="text-lg text-brand-gray-medium">Het doel wat je wil bereiken, de oplossing bedenken.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-brand-orange text-2xl font-bold mt-1">•</span>
                  <div>
                    <p className="text-lg md:text-xl font-semibold text-brand-purple">De zaklamp</p>
                    <p className="text-lg text-brand-gray-medium">Je aandacht richten op de puzzel en oplossingen bedenken.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-brand-orange text-2xl font-bold mt-1">•</span>
                  <div>
                    <p className="text-lg md:text-xl font-semibold text-brand-purple">De schijnwerper</p>
                    <p className="text-lg text-brand-gray-medium">Je overzicht van de omgeving waar je bent.</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed mb-6">
              Deze systemen gebruiken allemaal je werkgeheugen - en dat heeft beperkte capaciteit.
            </p>
          </div>

          {/* Tijdens de oefening */}
          <div className="max-w-5xl mx-auto mb-12">
            <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed mb-6">
              Tijdens de oefening vulde je werkgeheugen zich met:
            </p>
            
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-8">
              <div className="space-y-3">
                {[
                  "Het doel (raadsel oplossen)",
                  "Oplossingen bedenken",
                  "De drukke omgeving",
                  "Eerdere pogingen onthouden"
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <span className="text-brand-orange text-xl mt-1">•</span>
                    <p className="text-lg text-brand-gray-medium">{item}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  'Tijdsdruk - "Nog maar 2 minuten!"',
                  'Sociale vergelijking - "Anderen losten het op in 1 minuut, ik kan dit niet!"',
                  'Onzekerheid - "Moet ik straks presenteren?!"',
                  'Negatieve gedachten - "Waarom lukt dit niet?!"'
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <span className="text-brand-orange text-xl mt-1">•</span>
                    <p className="text-lg text-brand-gray-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mb-8">
              <img 
                src={volWerkgeheugenImage} 
                alt="Vol werkgeheugen" 
                className="max-w-md w-full h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Onder druk */}
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl font-bold text-brand-purple mb-4">
              Onder druk raakt het werkgeheugen snel vol
            </p>
            <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed mb-6">
              En dan? Je valt terug op de automatische piloot.
            </p>
            <div className="space-y-3">
              {[
                "Je blijft dezelfde oplossingen proberen",
                "Je blijft binnen het grid denken",
                "Je creatieve vermogen daalt",
                "Voordat je het weet geef je op of raak je gefrustreerd"
              ].map((item, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <span className="text-brand-orange text-xl mt-1">•</span>
                  <p className="text-lg text-brand-gray-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dit Systeem Kan Je Trainen Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple mb-8 text-center">
            DIT SYSTEEM KAN JE TRAINEN
          </h2>

          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed mb-8">
              Het goede nieuws? Je kunt je brein trainen om beter met deze druk om te gaan.
            </p>

            <h3 className="text-2xl md:text-3xl font-semibold text-brand-purple mb-6">
              Door aandachtstraining leer je:
            </h3>

            <div className="space-y-4 mb-12">
              {[
                { text: "Spanning vroeg herkennen", detail: "voordat je werkgeheugen overloopt" },
                { text: "Spanning reguleren", detail: "met ademhalingstechnieken en mentale reset" },
                { text: "Focus behouden", detail: "ook als de druk oploopt" },
                { text: "Ruimte creëren tussen trigger en reactie", detail: "" },
                { text: "Creatief blijven denken", detail: "zelfs onder stress" }
              ].map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <CheckCircle className="h-6 w-6 text-brand-orange flex-shrink-0 mt-1" />
                  <p className="text-lg md:text-xl text-brand-gray-medium">
                    <span className="font-semibold">{item.text}</span>
                    {item.detail && <span className="text-brand-gray-medium"> - {item.detail}</span>}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-l-4 border-brand-orange pl-6 py-6 bg-brand-off-white rounded-r-lg mb-12">
              <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed mb-4 font-semibold">
                Na training merk je de spanning wel op, maar het bezet je hoofd niet meer
              </p>
              <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed">
                Je merkt je gedachten op en laat ze weer gaan. Ze nemen je niet over, waardoor jij je focus behoudt - en veerkrachtiger wordt.
              </p>
            </div>
          </div>

          {/* Wetenschappelijke onderbouwing */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-brand-off-white rounded-lg p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="flex justify-center">
                  <img 
                    src={focusBehouden} 
                    alt="Focus behouden en afleiding buiten houden" 
                    className="max-w-md w-full h-auto rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-purple mb-6">
                    Wetenschappelijk bewezen:
                  </h3>
                  <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed mb-6">
                    Aandachtstraining verhoogt de activiteit in je prefrontale cortex - het deel van je brein verantwoordelijk voor:
                  </p>
                  <div className="space-y-3">
                    {[
                      "Focus & concentratie",
                      "Bewuste reacties",
                      "Emotieregulatie",
                      "Plannen & organiseren",
                      "Stressherkenning"
                    ].map((item, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <span className="text-brand-orange text-xl mt-1">•</span>
                        <p className="text-lg text-brand-gray-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer showNavigation={false} />
    </div>
  );
};

export default NegenStippenOplossing;
