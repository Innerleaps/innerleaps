
import Navigation from '@/components/Navigation';
import StickyCtaButtons from '@/components/StickyCtaButtons';
import { Brain, Building, Globe, TrendingUp, Users, Heart } from 'lucide-react';
import { useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const OverOns = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-brand-gray-light">
      <Navigation />
      <StickyCtaButtons />
      
      <main className="section-padding">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-dark">
              Wie zijn wij?
            </h1>
            <p className="text-xl text-brand-gray-medium max-w-3xl mx-auto leading-relaxed">
              De mensen achter Halt.academy - en waarom we dit doen
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-xl p-8 mb-16 shadow-lg">
            <h2 className="text-2xl font-bold text-brand-gray-dark mb-4 text-center">Waarom wij dit werk doen</h2>
            <p className="text-lg text-brand-gray-dark leading-relaxed text-center">
              We geloven dat werk een bron van voldoening en groei moet zijn, niet van stress en uitputting. Na jaren te hebben gezien hoe werkdruk mensen en organisaties ondermijnt, besloten we om de bewezen kracht van mindfulness toegankelijk te maken voor Nederlandse bedrijven. Want als mensen zich goed voelen, presteren ze beter - en gaan ze weer met plezier naar hun werk.
            </p>
          </div>

          {/* Expertise */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-brand-gray-dark mb-8">Wat we meebrengen</h2>
            <p className="text-lg text-brand-gray-medium mb-6">
              Ons team combineert wetenschappelijke kennis met praktische ervaring. We zijn gecertificeerd en getraind in:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <Brain className="h-6 w-6 text-brand-blue mr-3" />
                    <h3 className="font-semibold text-brand-gray-dark">MBSR Training</h3>
                  </div>
                  <p className="text-brand-gray-medium text-sm">Gecertificeerde trainers volgens de richtlijnen van de VMBN - we weten waar we het over hebben.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <Building className="h-6 w-6 text-brand-blue mr-3" />
                    <h3 className="font-semibold text-brand-gray-dark">Werkplaats Implementatie</h3>
                  </div>
                  <p className="text-brand-gray-medium text-sm">Ervaring met het praktisch toepassen van stressreductie in echte bedrijfsomgevingen</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <Globe className="h-6 w-6 text-brand-blue mr-3" />
                    <h3 className="font-semibold text-brand-gray-dark">Brede Ervaring</h3>
                  </div>
                  <p className="text-brand-gray-medium text-sm">We hebben met diverse sectoren gewerkt en begrijpen verschillende werkcontexten</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <TrendingUp className="h-6 w-6 text-brand-blue mr-3" />
                    <h3 className="font-semibold text-brand-gray-dark">Bedrijfsresultaten</h3>
                  </div>
                  <p className="text-brand-gray-medium text-sm">We snappen de business kant - ROI berekeningen, verzuimcijfers en retentie zijn ons niet vreemd</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <Users className="h-6 w-6 text-brand-blue mr-3" />
                    <h3 className="font-semibold text-brand-gray-dark">Mensen & Organisaties</h3>
                  </div>
                  <p className="text-brand-gray-medium text-sm">Achtergrond in organisatieontwikkeling - we begrijpen hoe verandering werkt</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <Heart className="h-6 w-6 text-brand-blue mr-3" />
                    <h3 className="font-semibold text-brand-gray-dark">Specialistische Zorg</h3>
                  </div>
                  <p className="text-brand-gray-medium text-sm">Werkstress, burn-out preventie en herstel - dit is ons vakgebied</p>
                </div>
              </div>
            </div>
          </div>

          {/* Oprichtersverhaal */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-brand-gray-dark mb-8">Hoe het allemaal begon</h2>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-brand-blue rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">BtH</span>
                  </div>
                  <p className="font-semibold text-brand-gray-dark">Bas Ter Haar Romenij</p>
                  <p className="text-sm text-brand-gray-medium">Medeoprichter & Marketing/Sales</p>
                </div>
                
                <div className="flex-1">
                  <p className="text-brand-gray-medium leading-relaxed mb-4">
                    Halt.academy ontstond uit persoonlijke ervaring. Na jaren in het bedrijfsleven en een eigen burn-out, ontdekte Bas hoe krachtig gestructureerde mindfulness kan zijn. Samen met Dave en Guido - beide ervaren trainers die hij leerde kennen tijdens zijn herstel - ontstond het idee om deze technieken breed toegankelijk te maken voor Nederlandse organisaties.
                  </p>
                  
                  <blockquote className="border-l-4 border-brand-blue pl-6 italic text-brand-gray-dark">
                    "Ik zag jarenlang hoe stress niet alleen mensen kapot maakte, maar ook bedrijven ondermijnde. Tegelijkertijd ontdekte ik dat er bewezen technieken bestaan die echt helpen - maar die waren moeilijk toegankelijk voor de gewone werkvloer. Dave en Guido hebben de expertise om mensen echt te helpen, ik zorg ervoor dat het ook bedrijfsmatig werkt. Samen kunnen we écht het verschil maken."
                  </blockquote>
                  <cite className="block mt-2 text-right text-brand-gray-medium">— Bas Ter Haar Romenij</cite>
                </div>
              </div>
            </div>
          </div>

          {/* Trainers */}
          <div>
            <h2 className="text-3xl font-bold text-brand-gray-dark mb-8 text-center">Onze trainers</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Dave van Schie */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src="/lovable-uploads/d9b949b9-fa2b-4b6e-a1e8-f4e99e61720f.png" alt="Dave van Schie" />
                    <AvatarFallback className="text-white text-xl font-bold bg-brand-green">DvS</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-brand-gray-dark">Dave van Schie</h3>
                  <p className="text-brand-gray-medium text-sm">Medeoprichter &amp; Trainer</p>
                </div>
                
                <div className="space-y-4 text-brand-gray-medium text-sm leading-relaxed">
                  <p>Dave is de rust zelve - en dat is precies wat hij ook uitstraalt in zijn trainingen. Als gecertificeerd MBSR trainer (Radboud Universiteit, 2017) combineert hij wetenschappelijke kennis met een warme, toegankelijke benadering.</p>
                  
                  <p>
                    Met zijn achtergrond in psychologie weet Dave precies hoe hij complexe concepten simpel en praktisch kan maken. Hij heeft een bijzondere gave om groepen op hun gemak te stellen en iedereen mee te krijgen - van de grootste scepticus tot de meest enthousiaste deelnemer.
                  </p>
                  
                  <p>
                    Naast zijn werk bij Halt.academy werkt Dave als contentmanager bij de Parnassia Groep, waar hij dagelijks bezig is met mentale gezondheid in organisaties. Deze ervaring maakt hem extra goed in het begrijpen van de uitdagingen waarmee werknemers worstelen.
                  </p>
                </div>
              </div>

              {/* Guido Scholte */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src="/lovable-uploads/07c13706-b4be-4b0a-8b50-701bd69610fc.png" alt="Guido Scholte" />
                    <AvatarFallback className="text-white text-xl font-bold bg-brand-blue-light">GS</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-brand-gray-dark">Guido Scholte</h3>
                  <p className="text-brand-gray-medium text-sm">Medeoprichter &amp; Trainer</p>
                </div>
                
                <div className="space-y-4 text-brand-gray-medium text-sm leading-relaxed">
                  <p>Guido brengt een unieke combinatie van diepte en praktische ervaring mee. Als gecertificeerd psycholoog en MBSR trainer heeft hij een scherp oog voor wat mensen écht nodig hebben om verder te komen.</p>
                  
                  <p>
                    Sinds 2014 ontwikkelt hij programma's binnen de justitiële sector - een van de meest uitdagende werkomgevingen die er zijn. Deze ervaring heeft hem geleerd hoe je ook in de moeilijkste omstandigheden mensen kunt helpen om veerkrachtiger te worden.
                  </p>
                  
                  <p>
                    Als geestelijk verzorger (sinds 2020) combineert Guido professionele kennis met een diepe betrokkenheid bij mensen. Hij heeft de gave om snel door te hebben wat er speelt en mensen te helpen hun eigen kracht te ontdekken - precies wat nodig is voor duurzame verandering.
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
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <Avatar className="w-20 h-20 mb-4">
                <AvatarImage src="/lovable-uploads/eaa7a159-2f85-4fa3-b487-4855426f2c14.png" alt="Bas Ter Haar Romenij" />
                <AvatarFallback className="text-white text-lg font-bold bg-brand-blue">BtH</AvatarFallback>
              </Avatar>
              <p className="text-sm font-semibold">Bas Ter Haar Romenij</p>
              <p className="text-xs text-gray-300">Medeoprichter</p>
            </div>
            <div>
              <div className="text-2xl font-bold mb-4">Halt.academy</div>
              <p className="text-gray-300 leading-relaxed">
                Wetenschappelijk bewezen stressreductieprogramma's voor meetbare bedrijfsresultaten.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p>Email: bas@haltacademy.nl</p>
                <p>Telefoon: 06 23 45 34 77</p>
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
    </div>
  );
};

export default OverOns;
