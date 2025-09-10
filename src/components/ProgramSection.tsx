import { Button } from '@/components/ui/button';
import { Clock, Users, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
const ProgramSection = () => {
  const programSteps = [{
    weeks: "1-2",
    title: "Automatische piloot en bewustzijn",
    description: "Leren herkennen van stresssignalen en ontwikkelen van praktische regulatietechnieken voor de werkplek"
  }, {
    weeks: "3-4",
    title: "Grenzen kennen en stresslandschap",
    description: "Praktische technieken voor verbeterde lichaamsbewustzijn en het herkennen van fysieke stresssignalen"
  }, {
    weeks: "5-6",
    title: "Bewust reageren en gedachtenpatronen",
    description: "Concrete aandachtsoefeningen voor verbeterde focus en mentale helderheid op het werk"
  }, {
    weeks: "7",
    title: "Praktijk oefendag",
    description: "Intensieve dag voor bewegingsoefeningen en praktische integratie van alle geleerde technieken"
  }, {
    weeks: "8-9",
    title: "Ontwikkeling eigen programma en integratie",
    description: "Ontwikkeling van een persoonlijke toolkit voor dagelijkse toepassing in werk en leven"
  }];
  const programFeatures = [{
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
    description: "Deelnemers proberen dagelijks te oefenen"
  }];
  return <section className="bg-white section-padding">
      <div className="container-custom">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-dark">Het Life+ stressmanagement programma</h2>
          <p className="text-xl md:text-2xl text-brand-gray-medium max-w-4xl mx-auto leading-relaxed">Wetenschappelijk bewezen met een praktische twist. Het Life+ programma neemt het 40 jaar onderzochte MBSR protocol en past dit specifiek aan voor de werkplek. </p>
        </div>

        {/* Program Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {programFeatures.map((feature, index) => {
          const IconComponent = feature.icon;
          return <div key={index} className="text-center p-6 bg-brand-gray-light rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-gray-light rounded-lg mb-4">
                  <IconComponent className="h-6 w-6 text-brand-orange stroke-2" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-brand-gray-dark mb-2">
                  {feature.title}
                </h3>
                <p className="text-brand-gray-medium text-lg md:text-xl leading-relaxed">
                  {feature.description}
                </p>
              </div>;
        })}
        </div>

        {/* Program Steps */}
        <div className="space-y-8">
          <h3 className="text-3xl md:text-4xl font-bold text-brand-gray-dark text-center mb-8">
            9 stappen naar duurzame gedragsverandering
          </h3>
          
          <p className="text-xl md:text-2xl text-brand-gray-medium max-w-4xl mx-auto leading-relaxed text-center mb-8">
            Elke workshop bouwt voort op de vorige: van stress herkennen naar concrete tools, tot het ontwikkelen van een persoonlijk stressmanagement programma en integratie in het dagelijkse leven.
          </p>
          
          <div className="text-center mb-12">
            <Link to="/programma">
              
            </Link>
          </div>
          
          <div className="grid gap-6">
            {programSteps.map((step, index) => <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="mb-4">
                  <div className="text-lg md:text-xl text-brand-blue font-medium mb-2">
                    Week {step.weeks}
                  </div>
                  <h4 className="text-xl md:text-2xl font-semibold text-brand-gray-dark mb-3">
                    {step.title}
                  </h4>
                  <p className="text-brand-gray-medium leading-relaxed text-lg md:text-xl">
                    {step.description}
                  </p>
                </div>
              </div>)}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/programma">
            <Button className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue text-white hover:text-white font-semibold py-3 px-8 rounded-lg text-lg md:text-xl transition-all duration-300 shadow-lg transform hover:-translate-y-0.5">
              Programma Details Bekijken
            </Button>
          </Link>
        </div>
      </div>
    </section>;
};
export default ProgramSection;