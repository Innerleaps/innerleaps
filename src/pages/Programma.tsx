import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Users, MapPin, Calendar, Brain, Target, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StickyCtaButtons from '@/components/StickyCtaButtons';
import { useEffect } from 'react';

const Programma = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const weeks = [{
    week: "Week 1",
    title: "Bewustwording & Automatische Piloot",
    goals: ["Herkennen van de \"automatische piloot\" in dagelijkse activiteiten", "Begrijpen van de relatie tussen aandacht, stress en prestaties", "Ontwikkelen van basisvaardigheden in aandachtsregulatie"],
    techniques: ["Lichaamsscan voor stresssignaalherkenning", "Gerichte aandachtstraining met focus op eetgewoonten", "Bewust ademen als ankerpunt tijdens stress"],
    applications: ["Herkennen van \"automatische piloot\" in werkroutines", "Implementatie van bewuste aandacht bij routinetaken", "Stressmonitoring tijdens werkdagen"]
  }, {
    week: "Week 2", 
    title: "Perceptie & Omgaan met Barrières",
    goals: ["Begrijpen hoe perceptie ervaringen vormt", "Herkennen van reactiepatronen op uitdagingen", "Ontwikkelen van volgehouden aandacht"],
    techniques: ["Lichaamsscan", "Zittende aandachtsoefening met focus op ademhaling", "Bewuste bewegingsoefeningen voor spanningsherkenning"],
    applications: ["Herkennen van perceptiefilters in werksituaties", "Implementatie van korte ademhalingsoefeningen tussen taken", "Effectiever omschakelen tussen verschillende taken"]
  }, {
    week: "Week 3",
    title: "Aanwezigheid & Grenzen van Aandacht",
    goals: ["Ontwikkelen van lichamelijk bewustzijn tijdens stress", "Herkennen van grenzen aan aandacht en concentratie", "Cultiveren van stabiliteit en flexibiliteit in aandacht"],
    techniques: ["Bewuste bewegingsoefeningen", "Zittende aandachtsoefening met focus op lichaam en ademhaling", "Drie-minuten ademruimte voor stressvolle momenten"],
    applications: ["Herkennen van fysieke stresssignalen op het werk", "Implementeren van korte ademruimtes bij werkdruk", "Effectiever omgaan met afleidingen en onderbrekingen"]
  }, {
    week: "Week 4",
    title: "Stressreactiepatronen Herkennen",
    goals: ["Inzicht in automatische reacties op werkdruk en uitdagingen", "Herkennen van niet-behulpzame denkpatronen", "Ontwikkelen van respons versus reactie"],
    techniques: ["Zittende aandachtsoefening met focus op geluiden en gedachten", "Staande en liggende bewuste bewegingsoefeningen", "Drie-minuten ademruimte bij onplezierige ervaringen"],
    applications: ["Herkennen van automatische stressreacties in werksituaties", "Verminderen van piekeren over werk buiten werktijd", "Constructiever omgaan met feedback en tegenslag"]
  }, {
    week: "Week 5",
    title: "Actieve Acceptatie & Effectief Reageren",
    goals: ["Onderscheid maken tussen automatische reacties en bewuste, weloverwogen respons", "Ontwikkelen van acceptatie als basis voor effectieve actie", "Herkennen van vermijdingspatronen bij stress"],
    techniques: ["Zittende aandachtsoefening met focus op moeilijkheden", "Bewuste bewegingsoefeningen voor omgaan met grenzen", "Drie-minuten ademruimte als eerste stap bij stress"],
    applications: ["Effectiever navigeren van moeilijke werksituaties", "Herkennen van vermijdingsgedrag bij uitdagende taken", "Ontwikkelen van responskeuze bij werkdruk"]
  }, {
    week: "Week 6",
    title: "Communicatie & Interpersoonlijke Stress",
    goals: ["Herkennen van stresspatronen in communicatie", "Ontwikkelen van bewuste communicatievaardigheden", "Versterken van empathie en luistervaardigheid"],
    techniques: ["Zittende aandachtsoefening", "Bewuste communicatieoefeningen", "Techniek voor het reguleren van emoties tijdens gesprekken"],
    applications: ["Effectiever navigeren van moeilijke gesprekken", "Verbeteren van teamcommunicatie", "Verminderen van interpersoonlijke conflicten"]
  }, {
    week: "Week 7",
    title: "Zelfzorg & Balans in Werk-Privé",
    goals: ["Herkennen van energiegevers en energienemers", "Ontwikkelen van gezonde grenzen en zelfzorg", "Balans vinden tussen inspanning en ontspanning"],
    techniques: ["Zittende aandachtsoefening", "Reflectie op dagelijkse activiteiten en energie", "Ontwikkelen van persoonlijk zelfzorgplan"],
    applications: ["Bewuste keuzes maken in werkplanning en prioriteiten", "Implementeren van energiemanagement gedurende de werkdag", "Effectiever grenzen stellen en workload managen"]
  }, {
    week: "Week 8",
    title: "Duurzame Implementatie & Vooruitblik",
    goals: ["Integreren van technieken in dagelijkse werkroutines", "Ontwikkelen van een persoonlijk stresspreventieplan", "Strategieën voor langdurige toepassing"],
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
    description: "Training bij u op kantoor of externe locatie"
  }, {
    icon: Calendar,
    title: "Oefendag",
    description: "6 uur verdiepingssessie"
  }];

  return <div className="min-h-screen bg-brand-gray-light">
      <Navigation />
      <StickyCtaButtons />
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="text-center space-y-6 mb-16">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
                Het 8-Weekse MBSR Stressreductie & Veerkrachtprogramma
              </h1>
              <p className="text-xl text-brand-gray-medium max-w-4xl mx-auto leading-relaxed">
                Ons programma is gebaseerd op het baanbrekende MBSR-programma (Mindfulness-Based Stress Reduction) ontwikkeld door Jon Kabat-Zinn in 1979 aan de University of Massachusetts Medical Center. Gedurende 8 weken ontwikkelen deelnemers wetenschappelijk bewezen vaardigheden die direct toepasbaar zijn in de werkomgeving, resulterend in meetbare verbeteringen in verzuim en retentie.
              </p>
            </div>
          </div>
        </section>

        {/* Program Structure */}
        <section className="bg-brand-gray-light section-padding">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-dark mb-8">
                Programmastructuur
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-blue text-white rounded-lg mb-4">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-brand-gray-dark mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-brand-gray-medium text-base">
                        {feature.description}
                      </p>
                    </div>;
              })}
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-gray-dark mb-4">Dagelijkse Oefening</h3>
                    <ul className="text-brand-gray-medium space-y-2 text-left text-base">
                      <li>• 45 minuten formele oefening, 6 dagen per week</li>
                      <li>• Informele oefeningen in dagelijkse activiteiten</li>
                      <li>• Werkboek en audio-instructies</li>
                      <li>• Digitale ondersteuning</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-brand-gray-dark mb-4">MBSR Methodiek</h3>
                    <p className="text-brand-gray-medium text-left text-base">
                      Het oorspronkelijke MBSR-programma van Jon Kabat-Zinn heeft meer dan 40 jaar aan wetenschappelijk onderzoek achter zich. Onze bedrijfstoepassing behoudt de kernprincipes die neurologische veranderingen bewerkstelligen na 8 weken van dagelijkse oefening.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Program */}
        <section className="bg-white section-padding">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-dark text-center mb-16">
              Wekelijks Programma
            </h2>
            
            <div className="grid gap-8">
              {weeks.map((week, index) => <Card key={index} className="overflow-hidden shadow-lg">
                  <CardHeader className="bg-brand-blue text-white">
                    <CardTitle className="text-xl md:text-2xl">
                      {week.week}: {week.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-brand-gray-dark mb-3 flex items-center text-base">
                          <Target className="h-5 w-5 mr-2 text-brand-blue" />
                          Leerdoelen
                        </h4>
                        <ul className="space-y-2">
                          {week.goals.map((goal, goalIndex) => <li key={goalIndex} className="text-base text-brand-gray-medium flex items-start">
                              <CheckCircle className="h-4 w-4 mr-2 text-brand-green mt-0.5 flex-shrink-0" />
                              {goal}
                            </li>)}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-brand-gray-dark mb-3 flex items-center text-base">
                          <Brain className="h-5 w-5 mr-2 text-brand-blue" />
                          Technieken
                        </h4>
                        <ul className="space-y-2">
                          {week.techniques.map((technique, techIndex) => <li key={techIndex} className="text-base text-brand-gray-medium flex items-start">
                              <CheckCircle className="h-4 w-4 mr-2 text-brand-green mt-0.5 flex-shrink-0" />
                              {technique}
                            </li>)}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-brand-gray-dark mb-3 flex items-center text-base">
                          <Lightbulb className="h-5 w-5 mr-2 text-brand-blue" />
                          Praktische Toepassingen
                        </h4>
                        <ul className="space-y-2">
                          {week.applications.map((application, appIndex) => <li key={appIndex} className="text-base text-brand-gray-medium flex items-start">
                              <CheckCircle className="h-4 w-4 mr-2 text-brand-green mt-0.5 flex-shrink-0" />
                              {application}
                            </li>)}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* Practice Day */}
        <section className="bg-brand-gray-light section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-lg">
                <CardHeader className="bg-brand-blue text-white">
                  <CardTitle className="text-2xl md:text-3xl text-center">
                    Oefendag: Verdieping & Integratie
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-brand-gray-medium mb-6 text-center text-base">
                    De oefendag vindt plaats tussen week 5 en 7 en biedt deelnemers de gelegenheid om de geleerde MBSR-technieken te verdiepen en te integreren. Deze dag (6 uur) bestaat uit:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-3 text-brand-green mt-0.5 flex-shrink-0" />
                        <span className="text-brand-gray-medium text-base">Uitgebreide oefensessies in stilte</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-3 text-brand-green mt-0.5 flex-shrink-0" />
                        <span className="text-brand-gray-medium text-base">Afwisseling tussen formele oefeningen</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-3 text-brand-green mt-0.5 flex-shrink-0" />
                        <span className="text-brand-gray-medium text-base">Bewust eten en bewust communiceren</span>
                      </li>
                    </ul>
                    
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-3 text-brand-green mt-0.5 flex-shrink-0" />
                        <span className="text-brand-gray-medium text-base">Persoonlijke reflectie op voortgang en uitdagingen</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-3 text-brand-green mt-0.5 flex-shrink-0" />
                        <span className="text-brand-gray-medium text-base">Strategieën voor het overwinnen van barrières</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-3 text-brand-green mt-0.5 flex-shrink-0" />
                        <span className="text-brand-gray-medium text-base">Consolideren van geleerde vaardigheden</span>
                      </li>
                    </ul>
                  </div>
                  
                  <p className="text-brand-gray-medium mt-6 text-center italic text-base">
                    De oefendag is cruciaal voor het consolideren van de geleerde vaardigheden en het versterken van de commitment aan dagelijkse toepassing, conform de oorspronkelijke MBSR-methodiek.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Scientific Foundation */}
        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-dark mb-8">
                Wetenschappelijke Onderbouwing
              </h2>
              
              <p className="text-xl text-brand-gray-medium mb-8">
                Sinds 1979 heeft het MBSR-programma van Jon Kabat-Zinn aan de University of Massachusetts Medical Center een uitgebreide wetenschappelijke basis opgebouwd. Onze bedrijfstoepassing behoudt deze bewezen effectiviteit.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-brand-gray-light p-6 rounded-xl text-left">
                  <h3 className="text-xl font-semibold text-brand-gray-dark mb-4">Het programma integreert elementen uit:</h3>
                  <ul className="space-y-2 text-brand-gray-medium text-base">
                    <li>• Cognitieve gedragsbenaderingen</li>
                    <li>• Aandachtsregulatie-training</li>
                    <li>• Emotieregulatie-strategieën</li>
                    <li>• Neurobiologische inzichten in stress en herstel</li>
                  </ul>
                </div>
                
                <div className="bg-brand-gray-light p-6 rounded-xl text-left">
                  <h3 className="text-xl font-semibold text-brand-gray-dark mb-4">40+ Jaar Onderzoek</h3>
                  <p className="text-brand-gray-medium text-base mb-4">
                    Het oorspronkelijke MBSR-programma heeft duizenden studies voortgebracht die de effectiviteit bewijzen voor stressreductie, veerkracht en algehele welzijn.
                  </p>
                  <ul className="space-y-2 text-brand-gray-medium text-base">
                    
                    
                    
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-brand-gray-light section-padding">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-dark mb-8">
              Klaar om te beginnen?
            </h2>
            <p className="text-xl text-brand-gray-medium mb-8 max-w-2xl mx-auto">
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
        </section>
      </main>
    </div>;
};

export default Programma;
