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
    title: "Ontwikkeling eigen training en integratie",
    description: "Ontwikkeling van een persoonlijke toolkit voor dagelijkse toepassing in werk en leven"
  }];
  const programFeatures = [{
    icon: Clock,
    title: "6 tot 9 weken training",
    description: "Meerdere weken training voor echte gedragsverandering."
  }, {
    icon: Users,
    title: "1x per week groepsworkshop",
    description: "Elke week een training van een gecertificeerde trainer. 60 minuten tot 2,5 uur. Alles is mogelijk."
  }, {
    icon: MapPin,
    title: "Workshop op locatie of online",
    description: "De workshop wordt gegeven op een locatie naar wens of online"
  }, {
    icon: Calendar,
    title: "Intentie om dagelijks te oefenen",
    description: "Deelnemers hebben de intentie om dagelijks te oefenen. Ook hier opties van 15 tot 60 minuten."
  }];
  return <section className="bg-white section-padding">
      <div className="container-custom">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-dark">Een wetenschappelijk training in<br />
          <span className="text-brand-orange">
Persoonlijk Leiderschap</span></h2>
          <p className="text-xl md:text-2xl text-brand-gray-medium max-w-4xl mx-auto leading-relaxed">Meer dan 40 jaar onderzoek toont keer op keer aan, onze training werkt echt. Afhankelijk van jullie beschikbare tijd kunnen we de training op jullie organisatie afstemmen. </p>
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

        <div className="text-center mt-12">
          <Link to="/training">
            <Button size="lg" className="bg-brand-blue hover:bg-brand-blue text-white hover:text-white font-semibold py-4 px-8 rounded-lg text-xl shadow-xl">
              Persoonlijk Leiderschap voor Young Professionals
            </Button>
          </Link>
        </div>
      </div>
    </section>;
};
export default ProgramSection;