import Navigation from '@/components/Navigation';
import StickyCtaButtons from '@/components/StickyCtaButtons';
import { Brain, Building, Globe, TrendingUp, Users, Heart } from 'lucide-react';
import { useEffect } from 'react';
const OverOns = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="min-h-screen bg-brand-gray-light">
      <Navigation />
      <StickyCtaButtons />
      
      <main className="section-padding">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-dark">
              Over Ons
            </h1>
            <p className="text-xl text-brand-gray-medium max-w-3xl mx-auto leading-relaxed">
              De Mensen Achter Halt.academy
            </p>
          </div>

          {/* Mission */}
          <div className="bg-brand-gray-light rounded-xl p-8 mb-16">
            <p className="text-lg text-brand-gray-dark leading-relaxed text-center">
              Halt.academy is opgericht vanuit de overtuiging dat organisaties beter presteren wanneer medewerkers mentaal veerkrachtig zijn. Onze missie is het creëren van gezondere werkplekken waar zowel mensen als resultaten floreren.
            </p>
          </div>

          {/* Expertise */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-brand-gray-dark mb-8">Onze Expertise</h2>
            <p className="text-lg text-brand-gray-medium mb-6">
              Ons team bestaat uit gecertificeerde professionals met uitgebreide ervaring in:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <Brain className="h-6 w-6 text-brand-blue mr-3" />
                    <h3 className="font-semibold text-brand-gray-dark">MBSR Training</h3>
                  </div>
                  <p className="text-brand-gray-medium text-sm">Gecertificeerde trainers in MBSR (Mindfulness-Based Stress Reduction) volgens de richtlijnen van de VMBN – categorie 1</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <Building className="h-6 w-6 text-brand-blue mr-3" />
                    <h3 className="font-semibold text-brand-gray-dark">Werkplaatsimplementatie</h3>
                  </div>
                  <p className="text-brand-gray-medium text-sm">Specialisatie in werkplaatsimplementatie van stressreductietechnieken</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <Globe className="h-6 w-6 text-brand-blue mr-3" />
                    <h3 className="font-semibold text-brand-gray-dark">Sectorbrede Ervaring</h3>
                  </div>
                  <p className="text-brand-gray-medium text-sm">Uitgebreide ervaring met diverse sectoren en organisatietypes</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <TrendingUp className="h-6 w-6 text-brand-blue mr-3" />
                    <h3 className="font-semibold text-brand-gray-dark">Bedrijfskunde & ROI</h3>
                  </div>
                  <p className="text-brand-gray-medium text-sm">Expertise in het meten en verbeteren van verzuim en retentie, inclusief ROI-berekeningen</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <Users className="h-6 w-6 text-brand-blue mr-3" />
                    <h3 className="font-semibold text-brand-gray-dark">Organisatieontwikkeling</h3>
                  </div>
                  <p className="text-brand-gray-medium text-sm">Achtergrond in organisatieontwikkeling en verandermanagement</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <Heart className="h-6 w-6 text-brand-blue mr-3" />
                    <h3 className="font-semibold text-brand-gray-dark">Specialistische Zorg</h3>
                  </div>
                  <p className="text-brand-gray-medium text-sm">Specialisatie in werkstress, burn-outpreventie en herstel</p>
                </div>
              </div>
            </div>
          </div>

          {/* Oprichtersverhaal */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-brand-gray-dark mb-8">Ons Oprichtersverhaal</h2>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-brand-blue rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    BtH
                  </div>
                  <p className="text-center mt-2 font-semibold text-brand-gray-dark">Bas Ter Haar Romenij</p>
                  <p className="text-center text-sm text-brand-gray-medium">Medeoprichter & Marketing/Sales</p>
                </div>
                
                <div className="flex-1">
                  <p className="text-brand-gray-medium leading-relaxed mb-4">
                    Halt.academy werd opgericht door Bas Ter Haar Romenij samen met Dave van Schie en Guido Scholte. Na een burn-out ontdekte Bas hoe effectief gestructureerde stressreductietechnieken kunnen zijn in het verbeteren van zowel persoonlijk welzijn als bedrijfsresultaten. Samen met Dave en Guido, beide ervaren mindfulness trainers, besloot hij een organisatie op te richten die deze technieken toegankelijk maakt voor bedrijven.
                  </p>
                  
                  <blockquote className="border-l-4 border-brand-blue pl-6 italic text-brand-gray-dark">
                    "Na jaren in het bedrijfsleven te hebben gewerkt, zag ik hoe stress en burn-out niet alleen individuele medewerkers beïnvloedden, maar ook organisatieresultaten ondermijnden. Ik merkte dat er een kloof was tussen wetenschappelijk bewezen interventies en praktische implementatie op de werkvloer. Halt.academy overbrugt deze kloof door bewezen technieken toegankelijk en relevant te maken voor de zakelijke context. Samen met Dave en Guido hebben we de perfecte combinatie: zij zorgen voor de hoogwaardige training, ik voor de vertaalslag naar bedrijfsresultaten."
                  </blockquote>
                  <cite className="block mt-2 text-right text-brand-gray-medium">— Bas Ter Haar Romenij</cite>
                </div>
              </div>
            </div>
          </div>

          {/* Trainers */}
          <div>
            
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Dave van Schie */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 bg-brand-green rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                    DvS
                  </div>
                  <h3 className="text-xl font-semibold text-brand-gray-dark">Dave van Schie</h3>
                  <p className="text-brand-gray-medium text-sm">Medeoprichter &amp; Trainer</p>
                </div>
                
                <div className="space-y-4 text-brand-gray-medium text-sm leading-relaxed">
                  <p>
                    Dave is mindfulness trainer (categorie 1), dichter, schrijver, sporter en levensgenieter. Sinds zijn opleiding aan de Radboud Universiteit in 2017 combineert hij zijn passie voor mindfulness met een brede ervaring in het trainen van zowel particulieren als professionals.
                  </p>
                  
                  <p>
                    Mindfulness vormt voor Dave de basis van zijn dagelijks leven — of het nu gaat om opvoeding, communicatie of omgaan met stress. Hij weet als geen ander hoe uitdagend het kan zijn om bewust te leven in een wereld vol afleiding, en brengt die nuchtere, menselijke benadering mee in zijn trainingen.
                  </p>
                  
                  <p>
                    Naast zijn werk als trainer is Dave ook actief als contentmanager bij de Parnassia Groep en houdt hij zich bezig met sport, schrijven en reizen.
                  </p>
                </div>
              </div>

              {/* Guido Scholte */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 bg-brand-blue-light rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                    GS
                  </div>
                  <h3 className="text-xl font-semibold text-brand-gray-dark">Guido Scholte</h3>
                  <p className="text-brand-gray-medium text-sm">Mindfulness Trainer & Geestelijk Verzorger</p>
                </div>
                
                <div className="space-y-4 text-brand-gray-medium text-sm leading-relaxed">
                  <p>
                    Guido's mindfulnesspad begon in 2010 tijdens een Vipassana-retraite in India — een ervaring die hem zowel confronteerde als inspireerde. Wat volgde was een diepgaande verkenning van meditatie, boeddhistische filosofie en geestelijke verzorging.
                  </p>
                  
                  <p>
                    Terug in Nederland verdiepte hij zich verder via opleidingen tot toegepast psycholoog en mindfulness trainer. Sinds 2014 ontwikkelt en verzorgt Guido mindfulnessprogramma's binnen de justitiële sector, zowel voor gedetineerden als personeel.
                  </p>
                  
                  <p>
                    Als boeddhistisch geestelijk verzorger werkt hij sinds 2020 in verschillende gevangenissen in Nederland. Guido combineert zijn kalme aanwezigheid met diep inzicht in menselijke processen en gedragsverandering — een waardevolle aanvulling op het team van Halt.academy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-brand-gray-dark text-white py-12 mt-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">Halt.academy</div>
              <p className="text-gray-300 leading-relaxed">
                Wetenschappelijk bewezen stressreductieprogramma's voor meetbare bedrijfsresultaten.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p>Email: info@halt.academy</p>
                <p>Telefoon: +31 (0)20 123 4567</p>
                <p>KvK: 12345678</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Snel naar</h3>
              <div className="space-y-2">
                <a href="/" className="block text-gray-300 hover:text-white transition-colors">Home</a>
                <a href="/wetenschap" className="block text-gray-300 hover:text-white transition-colors">De Wetenschap</a>
                <a href="/programma" className="block text-gray-300 hover:text-white transition-colors">Programma</a>
                <a href="/contact" className="block text-gray-300 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Halt.academy. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default OverOns;