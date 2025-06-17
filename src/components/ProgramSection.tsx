import { Button } from '@/components/ui/button';
import { Clock, Users, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProgramSection = () => {
  const programSteps = [
    {
      weeks: "1-2",
      title: "Stressbewustzijn en -herkenning",
      description: "Leren herkennen van stresssignalen en triggers in de werkomgeving"
    },
    {
      weeks: "3-4",
      title: "Aandachtsregulatie en concentratietechnieken",
      description: "Praktische technieken voor verbeterde focus en mentale helderheid"
    },
    {
      weeks: "5-6",
      title: "Stressresponsen en effectieve coping-strategieën",
      description: "Concrete tools voor het omgaan met werkdruk en uitdagingen"
    },
    {
      weeks: "Oefendag",
      title: "Praktische integratie en verdieping",
      description: "Intensieve dag voor het versterken en toepassen van alle technieken"
    },
    {
      weeks: "7-8",
      title: "Implementatie in werk en dagelijks leven",
      description: "Integratie van geleerde technieken in de dagelijkse werkroutine"
    }
  ];

  const programFeatures = [
    {
      icon: Clock,
      title: "8 weken programma",
      description: "1x per week 2,5 uur + oefendag"
    },
    {
      icon: MapPin,
      title: "Op locatie",
      description: "Bij u op kantoor of externe locatie"
    },
    {
      icon: Users,
      title: "15 deelnemers per groep",
      description: "Optimale groepsgrootte"
    },
    {
      icon: Calendar,
      title: "Flexibele planning",
      description: "Afgestemd op uw agenda"
    }
  ];

  return (
    <section className="bg-white section-padding">
      <div className="container-custom">
        <div className="text-center space-y-4 md:space-y-6 mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
            Ons Programma
          </h2>
          <p className="text-lg md:text-xl text-brand-gray-medium max-w-4xl mx-auto leading-relaxed">
            Een gestructureerd 8-weekse programma gericht op stressreductie en het verbeteren van werkprestaties. Gebaseerd op het MBSR-programma (Mindfulness-Based Stress Reduction) ontwikkeld door Jon Kabat-Zinn in 1979 aan de University of Massachusetts Medical Center, met focus op praktische bedrijfstoepassingen.
          </p>
        </div>

        {/* Program Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {programFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center p-4 md:p-6 bg-brand-gray-light rounded-xl">
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-brand-blue text-white rounded-lg mb-3 md:mb-4">
                  <IconComponent className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-brand-gray-dark mb-2">
                  {feature.title}
                </h3>
                <p className="text-brand-gray-medium text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Program Steps */}
        <div className="space-y-6 md:space-y-8">
          <h3 className="text-2xl md:text-3xl font-bold text-brand-gray-dark text-center mb-6 md:mb-8">
            Programma Overzicht
          </h3>
          
          <div className="text-center mb-8 md:mb-12">
            <Link to="/programma">
              <Button className="bg-brand-blue text-white font-semibold py-3 px-6 md:px-8 rounded-lg text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Programma Details Bekijken
              </Button>
            </Link>
          </div>
          
          <div className="grid gap-4 md:gap-6">
            {programSteps.map((step, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 md:p-6">
                <div className="mb-3 md:mb-4">
                  <div className="text-sm md:text-base text-brand-blue font-medium mb-2">
                    Week {step.weeks}
                  </div>
                  <h4 className="text-lg md:text-xl font-semibold text-brand-gray-dark mb-2 md:mb-3">
                    {step.title}
                  </h4>
                  <p className="text-brand-gray-medium leading-relaxed text-sm md:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 md:mt-12">
          <Link to="/programma">
            <Button className="bg-brand-blue text-white font-semibold py-3 px-6 md:px-8 rounded-lg text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Programma Details Bekijken
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
