import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StickyCtaButtons from '@/components/StickyCtaButtons';
import ROICalculator from '@/components/ROICalculator';
import { useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
const Programma = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const weeks = [{
    week: "Week 1",
    title: "Automatische Piloot Doorbreken",
    goals: ["Herkennen van stress signalen voordat ze escaleren", "Bewust worden van automatische reactiepatronen", "Ontwikkelen van gerichte aandacht als basis voor verandering"],
    techniques: ["Lichaamsscan voor stresssignaalherkenning", "Ademhalingstechnieken als ankerpunt tijdens druk", "Bewuste aandachtstraining via eetgewoonten"],
    applications: ["Doorbreken van automatische werkroutines", "Bewuste aandacht bij dagelijkse taken", "Stressmonitoring gedurende werkdagen"]
  }, {
    week: "Week 2",
    title: "Perceptie Veranderen",
    goals: ["Begrijpen hoe perceptie stress bepaalt", "Herkennen van reactiepatronen op uitdagingen", "Ontwikkelen van volgehouden focus"],
    techniques: ["Lichaamsscan voor diepere bewustwording", "Zittende ademhalingstechnieken", "Bewuste bewegingsoefeningen"],
    applications: ["Nieuwe perspectieven toepassen bij werkuitdagingen", "Weerstand tegen verandering hanteren", "Focus verbeteren tijdens vergaderingen en taken"]
  }, {
    week: "Week 3",
    title: "Lichamelijke Bewustwording",
    goals: ["Integreren van bewustzijn in beweging", "Herkennen van spanningspatronen in het lichaam", "Ontwikkelen van continue aanwezigheid"],
    techniques: ["Bewegingsoefeningen voor stressreductie", "Lopende aandachtstraining", "Ademhalingstechnieken bij fysieke activiteit"],
    applications: ["Bewuste beweging tussen werktaken", "Stresspreventie door lichamelijke signalen", "Energiemanagement tijdens lange werkdagen"]
  }, {
    week: "Week 4",
    title: "Stress Herkennen en Managen",
    goals: ["Begrijpen van stress-responsmechanismen", "Identificeren van persoonlijke stress-triggers", "Ontwikkelen van bewuste reactiekeuzes"],
    techniques: ["STOP-techniek voor directe stressinterventie", "Bewust reageren in plaats van automatisch handelen", "Ademhalingstechnieken voor stressregulatie"],
    applications: ["Bewuste responsen in conflictsituaties", "Stressmanagement tijdens deadline-druk", "Betere besluitvorming onder druk"]
  }, {
    week: "Week 5",
    title: "Emotieregulatie en Communicatie",
    goals: ["Omgaan met uitdagende emoties", "Ontwikkelen van emotionele veerkracht", "Verbeteren van bewuste communicatie"],
    techniques: ["RAIN-techniek voor emotieregulatie", "Bewuste communicatieoefeningen", "Zelfcompassie-oefeningen"],
    applications: ["Werkdruk en frustratie effectiever hanteren", "Teamdynamiek en samenwerking verbeteren", "Constructieve feedback geven en ontvangen"]
  }, {
    week: "Week 6",
    title: "Gedachtepatronen Doorbreken",
    goals: ["Herkennen van negatieve gedachtepatronen", "Ontwikkelen van mentale flexibiliteit", "Creëren van ruimte rond gedachten"],
    techniques: ["Gedachten observeren zonder oordeel", "Bewust omgaan met piekeren en zorgen", "Ademhalingstechnieken voor mentale rust"],
    applications: ["Negatieve denkspiralen doorbreken", "Probleemoplossend vermogen verbeteren", "Werkgerelateerd piekeren reduceren"]
  }, {
    week: "Week 7",
    title: "Mindful Communicatie en Relaties",
    goals: ["Bewuste communicatievaardigheden ontwikkelen", "Empathie en compassie versterken", "Relationele stress verminderen"],
    techniques: ["Mindful luisteren oefeningen", "Compassie meditaties", "Bewuste communicatie technieken"],
    applications: ["Betere teamcommunicatie", "Constructieve conflicthantering", "Verhoogde werkplezier door betere relaties"]
  }, {
    week: "Week 8",
    title: "Zelfzorg en Grenzen",
    goals: ["Ontwikkelen van effectieve zelfzorgstrategieën", "Leren gezonde grenzen stellen en bewaken", "Balans creëren tussen werk en privé"],
    techniques: ["Persoonlijke zelfzorgplan ontwikkelen", "Grenzenstelling-oefeningen", "Work-life balance technieken"],
    applications: ["Dagelijkse zelfzorgroutines implementeren", "Effectief nee zeggen tegen overbelasting", "Gezonde werkgewoonten creëren"]
  }, {
    week: "Week 9",
    title: "Duurzame Integratie",
    goals: ["Geleerde vaardigheden volledig integreren", "Persoonlijk stressmanagement programma ontwikkelen", "Toekomstige uitdagingen voorbereiden"],
    techniques: ["Lichaamsscan als programma-evaluatie", "Persoonlijke reflectie op ontwikkeling", "Toekomstplan voor duurzame praktijk"],
    applications: ["Gezonde werkroutines voor de lange termijn", "Preventieve stressreductie implementeren", "Alle technieken integreren in dagelijkse werkpraktijk"]
  }];
  const features = [{
    icon: Clock,
    title: "9 weken bewezen programma",
    description: "9 weken om echte verandering te realiseren"
  }, {
    icon: Users,
    title: "1x per week 1,5 uur groepsworkshop",
    description: "Elke week een training van een gecertificeerde trainer per groep van 15 deelnemers"
  }, {
    icon: MapPin,
    title: "Workshop op locatie of online",
    description: "De workshop wordt gegeven op een locatie naar wens of online"
  }, {
    icon: Calendar,
    title: "Dagelijks oefenen",
    description: "Deelnemers hebben de intentie om dagelijks te oefenen"
  }];
  return <div className="min-h-screen bg-brand-gray-light">
      <Navigation />
      <StickyCtaButtons />
      
      <main className="section-padding">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-dark">
              Het Life+ Programma
            </h1>
            <p className="text-xl md:text-2xl text-brand-gray-medium max-w-4xl mx-auto leading-relaxed text-center">
              Het Life+ programma levert niet alleen organisatorische voordelen - het <strong>maakt het leven van je medewerkers aantoonbaar prettiger</strong>. Beter slapen (57-78%), meer welzijn (59-68%) en betere gezondheid (63-68%). Deelnemers gaan rustiger naar huis, zijn minder gestrest en hebben meer energie voor hun privéleven. Wederzijds voordeel: betere medewerkers, betere resultaten, betere organisatie.
            </p>
          </div>

          {/* Program Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return <div key={index} className="bg-brand-gray-light rounded-xl p-6 text-center">
                  <div className="bg-brand-gray-light p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-brand-orange stroke-2" />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-gray-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-brand-gray-medium">
                    {feature.description}
                  </p>
                </div>;
          })}
          </div>

          {/* Key Benefits */}
          <div className="bg-white rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-brand-gray-dark mb-6 text-center">Wat levert het Life+ programma op?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-orange mb-2">-15 tot -21%</div>
                <p className="text-brand-gray-dark font-medium">Lager verzuim</p>
                <p className="text-sm text-brand-gray-medium mt-1">Bewezen door wetenschappelijk onderzoek</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-orange mb-2">-70%</div>
                <p className="text-brand-gray-dark font-medium">Lager uitval risico</p>
                <p className="text-sm text-brand-gray-medium mt-1">Medewerkers blijven vitaal</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-orange mb-2">64 tot 77%</div>
                <p className="text-brand-gray-dark font-medium">Veerkrachtiger</p>
                <p className="text-sm text-brand-gray-medium mt-1">Merkbare verbetering in veerkracht</p>
              </div>
            </div>
          </div>

          {/* Weekly Program */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-brand-gray-dark mb-8 text-center">Wekelijks Programma voor Echte Gedragsverandering</h2>
            
            <div className="grid gap-8">
              {weeks.map((week, index) => <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-brand-blue text-white">
                    <CardTitle className="text-xl md:text-2xl">
                      {week.week}: {week.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-brand-gray-dark mb-3 flex items-center">
                          <span className="w-2 h-2 bg-brand-green rounded-full mr-2"></span>
                          Leerdoelen
                        </h4>
                        <ul className="space-y-2">
                          {week.goals.map((goal, goalIndex) => <li key={goalIndex} className="text-brand-gray-medium text-sm leading-relaxed">
                              • {goal}
                            </li>)}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-brand-gray-dark mb-3">
                          Technieken
                        </h4>
                        <ul className="space-y-2">
                          {week.techniques.map((technique, techniqueIndex) => <li key={techniqueIndex} className="text-brand-gray-medium text-sm leading-relaxed">
                              • {technique}
                            </li>)}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-brand-gray-dark mb-3">
                          Toepassing
                        </h4>
                        <ul className="space-y-2">
                          {week.applications.map((application, applicationIndex) => <li key={applicationIndex} className="text-brand-gray-medium text-sm leading-relaxed">
                              • {application}
                            </li>)}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>


          {/* Implementation & Support */}
          <div className="bg-white rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-brand-gray-dark mb-6 text-center">
              Begeleiding & Materialen
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-brand-gray-dark mb-4">Wat krijgen deelnemers?</h3>
                <ul className="space-y-3 text-brand-gray-medium">
                  <li className="flex items-start">
                    <span className="text-brand-green mr-2">✓</span>
                    <span>Persoonlijk werkboek met oefeningen en reflecties</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-green mr-2">✓</span>
                    <span>Audio-opnames voor thuisoefening</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-green mr-2">✓</span>
                    <span>Begeleiding door gecertificeerde Life+ trainers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-green mr-2">✓</span>
                    <span>Certificaat van deelname na afronding</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-brand-gray-dark mb-4">Groepsopzet</h3>
                <ul className="space-y-3 text-brand-gray-medium">
                  <li>
                    <span><strong>Groepsgrootte:</strong> Tot 15 deelnemers voor optimale interactie</span>
                  </li>
                  <li>
                    <span><strong>Samenstelling:</strong> Enkel jullie werknemers óf gemengd met externe deelnemers</span>
                  </li>
                  <li>
                    <span><strong>Locatie:</strong> Bij jullie in het bedrijf of externe locatie</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-brand-gray-dark mb-4">Planning & Follow-up</h3>
                <ul className="space-y-3 text-brand-gray-medium">
                  <li>
                    <span><strong>Timing:</strong> Flexibel in te plannen tijdens of na werktijd</span>
                  </li>
                  <li>
                    <span><strong>Follow-up:</strong> Optionele vervolgbijeenkomsten na 3 en 6 maanden</span>
                  </li>
                  <li>
                    <span><strong>Meting:</strong> Voor- en nameting van stress en welzijn - direct na training en na 6 en 12 maanden</span>
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
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-brand-blue font-semibold py-3 px-8 rounded-lg text-lg" onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}>
                Vrijblijvend gesprek plannen
              </Button>
              <Button className="font-semibold py-3 px-8 rounded-lg text-lg" onClick={() => window.location.href = '/#calculator'}>
                Bereken uw besparing
              </Button>
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
    </div>;
};
export default Programma;