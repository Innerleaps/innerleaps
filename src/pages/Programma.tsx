import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StickyCtaButtons from '@/components/StickyCtaButtons';
import { useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Programma = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const weeks = [{
    week: "Week 1",
    title: "Bewustwording & Automatische Piloot",
    goals: ["Herkennen van stress signalen in het lichaam", "Bewust worden van automatische reactiepatronen", "Ontwikkelen van gerichte aandacht"],
    techniques: ["Lichaamsscan voor stresssignaalherkenning", "Gerichte aandachtstraining met focus op eetgewoonten", "Bewust ademen als ankerpunt tijdens stress"],
    applications: ["Herkennen van \"automatische piloot\" in werkroutines", "Implementatie van bewuste aandacht bij routinetaken", "Stressmonitoring tijdens werkdagen"]
  }, {
    week: "Week 2", 
    title: "Perceptie & Omgaan met Barrières",
    goals: ["Begrijpen hoe perceptie ervaringen vormt", "Herkennen van reactiepatronen op uitdagingen", "Ontwikkelen van volgehouden aandacht"],
    techniques: ["Lichaamsscan", "Zittende aandachtsoefening met focus op ademhaling", "Bewuste bewegingsoefeningen voor spanningsherkenning"],
    applications: ["Toepassen van andere perspectieven bij werkuitdagingen", "Omgaan met weerstand tegen verandering", "Verbeteren van focus tijdens vergaderingen"]
  }, {
    week: "Week 3",
    title: "Bewuste Beweging & Aanwezigheid",
    goals: ["Integreren van bewustzijn in beweging", "Herkennen van lichamelijke spanningspatronen", "Ontwikkelen van continue aanwezigheid"],
    techniques: ["Bewuste yoga voor stressreductie", "Lopende aandachtsoefening", "Integratie van ademhaling bij fysieke activiteit"],
    applications: ["Bewuste beweging tussen werktaken", "Stresspreventie door lichamelijke bewustwording", "Energiemanagement tijdens werkdagen"]
  }, {
    week: "Week 4",
    title: "Stress, Reacties & Automatismen",
    goals: ["Begrijpen van stress-responsmechanismen", "Identificeren van persoonlijke stress-triggers", "Ontwikkelen van bewuste reactiekeuzes"],
    techniques: ["STOP-techniek voor stressmanagement", "Bewust reageren in plaats van automatisch handelen", "Ademhaling als stressregulatietool"],
    applications: ["Toepassen van bewuste responsen in conflictsituaties", "Stresspreventie tijdens deadline-druk", "Verbeteren van besluitvorming onder stress"]
  }, {
    week: "Week 5",
    title: "Moeilijke Emoties & Communicatie",
    goals: ["Omgaan met uitdagende emoties", "Ontwikkelen van emotionele veerkracht", "Verbeteren van bewuste communicatie"],
    techniques: ["RAIN-techniek voor emotieregulatie", "Bewuste communicatieoefeningen", "Compassie-oefeningen voor zelfzorg"],
    applications: ["Effectiever omgaan met werkdruk en frustratie", "Verbeteren van teamdynamiek en samenwerking", "Constructieve feedback geven en ontvangen"]
  }, {
    week: "Week 6",
    title: "Gedachten & Mentale Patronen",
    goals: ["Herkennen van gedachtepatronen", "Ontwikkelen van mentale flexibiliteit", "Creëren van ruimte rond gedachten"],
    techniques: ["Observeren van gedachten zonder oordeel", "Bewust omgaan met piekeren en zorgen", "Technieken voor mentale rust"],
    applications: ["Doorbreken van negatieve denkspiralen", "Verbeteren van probleemoplossend vermogen", "Reduceren van werkgerelateerd piekeren"]
  }, {
    week: "Week 7",
    title: "Zelfzorg & Grenzen Stellen",
    goals: ["Ontwikkelen van effectieve zelfzorgstrategieën", "Leren grenzen stellen en bewaken", "Balans vinden tussen werk en privé"],
    techniques: ["Persoonlijke zelfzorgplan ontwikkelen", "Boundary-setting oefeningen", "Bewuste work-life balance technieken"],
    applications: ["Implementeren van dagelijkse zelfzorgroutines", "Effectief nee zeggen tegen overbelasting", "Creëren van gezonde werkgewoonten"]
  }, {
    week: "Week 8",
    title: "Integratie & Duurzaamheid",
    goals: ["Integreren van geleerde vaardigheden", "Ontwikkelen van persoonlijke praktijk", "Plannen voor toekomstige uitdagingen"],
    techniques: ["Lichaamsscan als review van het programma", "Persoonlijke reflectie op geleerde vaardigheden", "Ontwikkeling van toekomstplan"],
    applications: ["Creëren van gezonde werkroutines", "Implementeren van preventieve stressreductie", "Integratie van geleerde technieken in dagelijkse werkpraktijk"]
  }];

  const features = [{
    icon: Clock,
    title: "8 weken",
    description: "Wekelijks 2,5 uur op locatie"
  }, {
    icon: Users,
    title: "15 deelnemers", 
    description: "Optimale groepsgrootte"
  }, {
    icon: MapPin,
    title: "Op locatie",
    description: "Bij u in het bedrijf"
  }, {
    icon: Calendar,
    title: "Oefendag",
    description: "6 uur verdiepingssessie"
  }];

  return (
    <div className="min-h-screen bg-brand-gray-light">
      <Navigation />
      <StickyCtaButtons />
      
      <main className="section-padding">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-dark">
              Programma
            </h1>
            <p className="text-xl md:text-2xl text-brand-gray-medium max-w-4xl mx-auto leading-relaxed text-center">
              Ons 8-weekse MBSR-programma voor werknemers biedt een bewezen, stapsgewijze aanpak voor stressreductie en het ontwikkelen van veerkracht. Elke week bouwt voort op de vorige, met praktische vaardigheden die direct toepasbaar zijn in de werkomgeving.
            </p>
          </div>

          {/* Program Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg">
                  <div className="bg-brand-blue text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-gray-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-brand-gray-medium">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Key Benefits */}
          <div className="bg-white rounded-xl p-8 mb-16 shadow-lg">
            <h2 className="text-2xl font-bold text-brand-gray-dark mb-6 text-center">
              Wat levert het programma op?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-green mb-2">19-30%</div>
                <p className="text-brand-gray-dark font-medium">Minder verzuim</p>
                <p className="text-sm text-brand-gray-medium mt-1">Bewezen door wetenschappelijk onderzoek</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-blue mb-2">17-31%</div>
                <p className="text-brand-gray-dark font-medium">Betere retentie</p>
                <p className="text-sm text-brand-gray-medium mt-1">Medewerkers blijven langer</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">40-58%</div>
                <p className="text-brand-gray-dark font-medium">Minder werkstress</p>
                <p className="text-sm text-brand-gray-medium mt-1">Merkbare verbetering in welzijn</p>
              </div>
            </div>
          </div>

          {/* Weekly Program */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-brand-gray-dark mb-8 text-center">
              Wekelijks Programma
            </h2>
            
            <div className="grid gap-8">
              {weeks.map((week, index) => (
                <Card key={index} className="overflow-hidden shadow-lg">
                  <CardHeader className="bg-brand-blue text-white">
                    <CardTitle className="text-xl md:text-2xl">
                      {week.week}: {week.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-brand-gray-dark mb-3 flex items-center">
                          <span className="w-2 h-2 bg-brand-green rounded-full mr-2"></span>
                          Leerdoelen
                        </h4>
                        <ul className="space-y-2">
                          {week.goals.map((goal, goalIndex) => (
                            <li key={goalIndex} className="text-brand-gray-medium text-sm leading-relaxed">
                              • {goal}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-brand-gray-dark mb-3 flex items-center">
                          <span className="w-2 h-2 bg-brand-blue rounded-full mr-2"></span>
                          Technieken
                        </h4>
                        <ul className="space-y-2">
                          {week.techniques.map((technique, techniqueIndex) => (
                            <li key={techniqueIndex} className="text-brand-gray-medium text-sm leading-relaxed">
                              • {technique}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-brand-gray-dark mb-3 flex items-center">
                          <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                          Toepassing
                        </h4>
                        <ul className="space-y-2">
                          {week.applications.map((application, applicationIndex) => (
                            <li key={applicationIndex} className="text-brand-gray-medium text-sm leading-relaxed">
                              • {application}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Intensive Practice Day */}
          <div className="mb-16">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-lg">
                <CardHeader className="bg-brand-blue text-white">
                  <CardTitle className="text-2xl md:text-3xl text-center">
                    Oefendag: Verdieping & Integratie
                  </CardTitle>
                  <CardDescription className="text-center text-blue-100 text-lg">
                    Tussenliggende verdiepingssessie van 6 uur (meestal tussen week 6 en 7)
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-brand-gray-dark mb-4">Wat gebeurt er?</h3>
                      <ul className="space-y-3 text-brand-gray-medium">
                        <li className="flex items-start">
                          <span className="text-brand-blue mr-2">•</span>
                          <span>Verdieping van alle geleerde technieken in stilte</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-brand-blue mr-2">•</span>
                          <span>Langere meditatie- en bewustzijnsoefeningen</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-brand-blue mr-2">•</span>
                          <span>Integratie van lichaamsscan, ademhaling en bewuste beweging</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-brand-blue mr-2">•</span>
                          <span>Reflectie op persoonlijke ontwikkeling en inzichten</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-brand-blue mr-2">•</span>
                          <span>Voorbereiding op toepassing in complexe werksituaties</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-brand-gray-dark mb-4">Waarom deze dag?</h3>
                      <div className="bg-brand-gray-light p-6 rounded-lg">
                        <p className="text-brand-gray-medium mb-4">
                          De oefendag is een cruciale component van het MBSR-programma. Onderzoek toont aan dat deze intensieve sessie significant bijdraagt aan:
                        </p>
                        <ul className="space-y-2 text-brand-gray-medium">
                          <li>• <strong>Diepere integratie</strong> van mindfulness-vaardigheden</li>
                          <li>• <strong>Verhoogde zelfvertrouwen</strong> in het toepassen van technieken</li>
                          <li>• <strong>Sterkere commitment</strong> aan voortgezette praktijk</li>
                          <li>• <strong>Betere lange-termijn resultaten</strong> in stressreductie</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Badge variant="outline" className="text-brand-blue border-brand-blue px-4 py-2">
                      Optioneel maar sterk aanbevolen voor optimale resultaten
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Implementation & Support */}
          <div className="bg-white rounded-xl p-8 mb-16 shadow-lg">
            <h2 className="text-2xl font-bold text-brand-gray-dark mb-6 text-center">
              Begeleiding & Materialen
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-brand-gray-dark mb-4">Wat krijgt u?</h3>
                <ul className="space-y-3 text-brand-gray-medium">
                  <li className="flex items-start">
                    <span className="text-brand-green mr-2">✓</span>
                    <span>Persoonlijk werkboek met oefeningen en reflecties</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-green mr-2">✓</span>
                    <span>Audio-opnames van geleide meditaties voor thuisoefening</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-green mr-2">✓</span>
                    <span>Wekelijkse huisopdrachten (30-45 minuten per dag)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-green mr-2">✓</span>
                    <span>Begeleiding door gecertificeerde MBSR-trainers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-green mr-2">✓</span>
                    <span>Certificaat van deelname na afronding</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-brand-gray-dark mb-4">Praktische zaken</h3>
                <ul className="space-y-3 text-brand-gray-medium">
                  <li className="flex items-start">
                    <span className="text-brand-blue mr-2">•</span>
                    <span><strong>Locatie:</strong> Bij u in het bedrijf of externe locatie</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-blue mr-2">•</span>
                    <span><strong>Groepsgrootte:</strong> 8-15 deelnemers voor optimale interactie</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-blue mr-2">•</span>
                    <span><strong>Timing:</strong> Flexibel in te plannen tijdens of na werktijd</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-blue mr-2">•</span>
                    <span><strong>Follow-up:</strong> Optionele vervolgbijeenkomsten na 3 en 6 maanden</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-blue mr-2">•</span>
                    <span><strong>Meting:</strong> Voor- en nameting van stress en welzijn</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-brand-blue text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Klaar om te Starten?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Ontdek hoe het bewezen MBSR-programma uw organisatie kan helpen bij het verlagen van verzuim en het verbeteren van retentie.
            </p>
            <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
              <Button className="bg-brand-blue hover:bg-brand-blue text-white hover:text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg transform hover:-translate-y-0.5" onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}>
                Vrijblijvend gesprek plannen
              </Button>
              <Button variant="outline" className="border-2 border-brand-blue text-brand-blue hover:bg-white hover:text-brand-blue font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:-translate-y-0.5" onClick={() => window.location.href = '/#calculator'}>
                Bereken uw besparing
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white py-12 mt-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">Innerleaps</div>
              <p className="text-gray-300 leading-relaxed">
                MBSR-gebaseerde stressreductieprogramma's voor meetbare bedrijfsresultaten. Gebaseerd op het baanbrekende werk van Jon Kabat-Zinn.
              </p>
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

export default Programma;
