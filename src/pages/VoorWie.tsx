import Navigation from '@/components/Navigation';
import StickyCtaButtons from '@/components/StickyCtaButtons';
import ROICalculator from '@/components/ROICalculator';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const VoorWie = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectors = [
    {
      title: "Zakelijke Dienstverlening",
      services: ["Accountancy en consultancy", "Financiële dienstverlening", "Juridische diensten", "Marketing en communicatie"],
      testimonial: "Na implementatie van het programma zagen we een verzuimreductie van 26% onder onze consultants en een significante verbetering in medewerkertevredenheidsscores.",
      source: "HR Directeur, internationaal consultancybedrijf"
    },
    {
      title: "Technologie & IT", 
      services: ["Software-ontwikkeling", "IT-dienstverlening", "Telecom", "Tech startups"],
      testimonial: "In onze sector met hoge werkdruk en veel schermtijd heeft het programma bijgedragen aan een 22% daling in burn-out gerelateerd verzuim en een verbetering van 19% in retentie van toptalent.",
      source: "CTO, softwareontwikkelingsbedrijf"
    },
    {
      title: "Gezondheidszorg",
      services: ["Ziekenhuizen", "GGZ-instellingen", "Ouderenzorg", "Eerstelijnszorg"],
      testimonial: "Zorgprofessionals ervaren dagelijks emotionele en fysieke belasting. Het programma heeft niet alleen het verzuim met 28% verminderd, maar ook de kwaliteit van patiëntenzorg verbeterd door meer aanwezige en veerkrachtige medewerkers.",
      source: "Bestuurder, regionaal ziekenhuis"
    },
    {
      title: "Onderwijs",
      services: ["Basisonderwijs", "Voortgezet onderwijs", "Hoger onderwijs", "Onderwijsondersteunende diensten"],
      testimonial: "Docenten ervaren steeds meer werkdruk. Het programma heeft geleid tot een afname van 24% in stressgerelateerd verzuim en een toename van 31% in werkplezier.",
      source: "Directeur, scholengemeenschap"
    },
    {
      title: "Productie & Logistiek",
      services: ["Productiebedrijven", "Logistieke dienstverleners", "Voedingsmiddelenindustrie", "Bouw"],
      testimonial: "Ook in een omgeving met fysiek werk zien we de voordelen. Medewerkers rapporteren betere focus, minder ongevallen, en we zien een daling van 21% in kort verzuim.",
      source: "Operations Manager, logistiek bedrijf"
    }
  ];

  const implementations = [
    {
      title: "Voor Teams",
      description: "Ideaal voor afdelingen met hoge werkdruk of veranderingsprocessen",
      details: ["Bevordert teamcohesie en communicatie", "Creëert gedeelde taal en technieken voor stressmanagement", "1 groep met het hele team"]
    },
    {
      title: "Voor Leidinggevenden",
      description: "Speciaal aangepast programma voor managers en teamleiders",
      details: ["Focus op persoonlijke stressreductie én ondersteuning van teamleden", "Ontwikkeling van leiderschapsvaardigheden die stress in teams verminderen", "Creëert een cascade-effect door de organisatie"]
    },
    {
      title: "Voor Afdelingen",
      description: "Gericht op specifieke uitdagingen binnen een afdeling",
      details: ["Aanpassing van cases en oefeningen aan de werkcontext", "Mogelijkheid tot afdelingsspecifieke metingen en evaluatie", "Bevordert een gezamenlijke aanpak van werkdruk"]
    },
    {
      title: "Voor de Gehele Organisatie",
      description: "Organisatiebrede implementatie voor maximale impact",
      details: ["Gefaseerde uitrol mogelijk voor grotere organisaties", "Ontwikkeling van interne champions/trainers voor duurzame implementatie", "Integratie met bestaande welzijns- en HR-initiatieven"]
    }
  ];

  const caseStudies = [
    {
      title: "Financiële Dienstverlener (250 medewerkers)",
      challenge: "Hoog verzuim (6.2%) en toenemend verloop van talent (15% per jaar)",
      approach: "Programma uitgerold voor alle teamleiders en vrijwillige deelname voor medewerkers",
      results: ["Verzuim gedaald naar 4.5% (27% reductie)", "Verloop verminderd tot 10.5% (30% reductie)", "Medewerkertevredenheid gestegen met 18%", "ROI berekend op 385%"]
    },
    {
      title: "IT-Bedrijf (120 medewerkers)",
      challenge: "Burn-out symptomen bij 32% van de medewerkers, moeite met talent behouden",
      approach: "Volledig programma voor alle medewerkers, geïntegreerd in werkweek",
      results: ["Burn-out symptomen gedaald naar 14% (56% reductie)", "Retentie verbeterd met 24%", "Productiviteit toegenomen volgens interne metingen", "ROI berekend op 420%"]
    },
    {
      title: "Zorginstelling (400 medewerkers)",
      challenge: "Hoog langdurig verzuim (7.8%), lage medewerkertevredenheid",
      approach: "Gefaseerde implementatie, beginnend met afdelingen met hoogste verzuim",
      results: ["Verzuim gedaald naar 5.9% (24% reductie)", "Medewerkertevredenheid gestegen met 29%", "Patiënttevredenheid verbeterd met 12%", "ROI berekend op 310%"]
    }
  ];

  return (
    <div className="min-h-screen bg-brand-gray-light">
      <Navigation />
      <StickyCtaButtons />
      
      <main className="section-padding">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-dark">
              Voor Wie
            </h1>
            <p className="text-xl md:text-2xl text-brand-gray-medium max-w-4xl mx-auto leading-relaxed text-center">
              Ons programma is ontwikkeld voor organisaties die verzuim willen verlagen, medewerkerretentie willen verhogen, en een gezondere, productievere werkomgeving willen creëren. De wetenschappelijk bewezen technieken zijn effectief in diverse sectoren en voor verschillende typen functies.
            </p>
          </div>

          {/* Sectoren */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark mb-8 text-center">Sectoren met Bewezen Resultaten</h2>
            
            <div className="space-y-8">
              {sectors.map((sector, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-brand-gray-dark mb-4">{sector.title}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <ul className="space-y-2 mb-6">
                        {sector.services.map((service, serviceIndex) => (
                          <li key={serviceIndex} className="flex items-center text-brand-gray-medium">
                            <div className="w-2 h-2 bg-brand-blue rounded-full mr-3"></div>
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-brand-gray-light p-6 rounded-lg">
                      <blockquote className="text-brand-gray-dark italic mb-4">
                        "{sector.testimonial}"
                      </blockquote>
                      <cite className="text-brand-gray-medium text-sm">— {sector.source}</cite>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Implementatiemogelijkheden */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark mb-8 text-center">Implementatiemogelijkheden</h2>
            <p className="text-xl md:text-2xl text-brand-gray-medium mb-8 text-center max-w-4xl mx-auto leading-relaxed">
              Ons programma kan op verschillende manieren worden geïmplementeerd, afhankelijk van de specifieke behoeften en structuur van jullie organisatie:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {implementations.map((impl, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-brand-gray-dark mb-3">{impl.title}</h3>
                  <p className="text-brand-gray-medium mb-4 text-sm">{impl.description}</p>
                  
                  <ul className="space-y-2">
                    {impl.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start text-brand-gray-medium text-sm">
                        <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Case Studies */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark mb-8 text-center">Case Studies: Succesvolle Implementaties</h2>
            
            <div className="space-y-8">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-brand-gray-dark mb-6">{study.title}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-lg md:text-xl font-semibold text-brand-gray-dark mb-2">Uitdaging:</h4>
                      <p className="text-brand-gray-medium text-sm">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg md:text-xl font-semibold text-brand-gray-dark mb-2">Aanpak:</h4>
                      <p className="text-brand-gray-medium text-sm">{study.approach}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg md:text-xl font-semibold text-brand-gray-dark mb-2">Resultaten na 12 maanden:</h4>
                      <ul className="space-y-1">
                        {study.results.map((result, resultIndex) => (
                          <li key={resultIndex} className="flex items-start text-brand-gray-medium text-sm">
                            <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Is Uw Organisatie Geschikt */}
          <div className="bg-brand-blue text-white rounded-xl p-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Is Jullie Organisatie Geschikt?</h2>
              <p className="text-xl mb-6 text-center">Ons programma is bijzonder effectief voor organisaties die:</p>
              
              <div className="max-w-2xl mx-auto mb-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-green-light rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Het verzuimpercentage willen verlagen
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-green-light rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Uitdagingen ervaren met het behouden van talent
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-green-light rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Opereren in een sector met hoge werkdruk of snelle veranderingen
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-green-light rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Een proactieve benadering van medewerkerwelzijn nastreven
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-green-light rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Zoeken naar bewezen interventies met meetbare ROI
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                  Niet zeker of het programma past bij jullie organisatie? Plan een vrijblijvend gesprek waarin we jullie specifieke situatie analyseren en een op maat gemaakte aanpak voorstellen.
                </p>
                
                <Button 
                  size="lg"
                  className="bg-brand-green hover:bg-brand-green-light text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}
                >
                  Plan Vrijblijvend Gesprek
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ROICalculator />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">Innerleaps</div>
              <p className="text-gray-300 leading-relaxed">InnerLeaps transformeert teams met wetenschappelijk bewezen stress management voor duurzaam succes. Geen quick fixes, wel echte gedragsverandering.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p>Email: bas@innerleaps.nl</p>
                <p>Telefoon: 06 23 45 34 77</p>
                <p>KVK nummer: 98136925</p>
                <div className="mt-4 flex justify-start">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/lovable-uploads/eaa7a159-2f85-4fa3-b487-4855426f2c14.png" alt="Bas Ter Haar Romenij" />
                    <AvatarFallback className="text-white text-xl font-bold bg-brand-blue">BtH</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Snel naar</h3>
              <div className="space-y-2">
                <button onClick={() => window.location.href = '/'} className="block text-gray-300 hover:text-white transition-colors text-left">Home</button>
                <button onClick={() => window.location.href = '/wetenschap'} className="block text-gray-300 hover:text-white transition-colors text-left">De Wetenschap</button>
                <button onClick={() => window.location.href = '/programma'} className="block text-gray-300 hover:text-white transition-colors text-left">Programma</button>
                <button onClick={() => window.location.href = '/contact'} className="block text-gray-300 hover:text-white transition-colors text-left">Contact</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Innerleaps. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VoorWie;
