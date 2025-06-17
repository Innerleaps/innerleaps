
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, Target, TrendingUp, ArrowRight, Handshake, Presentation, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';
import CalculatorModal from './CalculatorModal';

const ProcessSection = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const steps = [
    {
      icon: Calendar,
      title: "Stap 1: Kennismaking & Besparingsinventarisatie",
      description: "Vrijblijvend gesprek waarin we uw huidige situatie analyseren en potentiële besparingen berekenen",
      color: "bg-brand-blue"
    },
    {
      icon: Handshake,
      title: "Stap 2: Opdrachtakkoord",
      description: "Vastleggen van praktische zaken: Startdata, Locatie en Investering.",
      color: "bg-brand-green"
    },
    {
      icon: Presentation,
      title: "Stap 3: Introductiesessie voor Medewerkers",
      description: "Korte introductiesessie op uw locatie, bijvoorbeeld tijdens lunch of tijdens algemeen presentatie moment. Medewerkers maken kennis met de trainer en de aanpak.",
      color: "bg-purple-600"
    },
    {
      icon: Users,
      title: "Stap 4: Inschrijving Medewerkers",
      description: "Medewerkers kunnen zich vrijblijvend inschrijven voor deelname aan het 8-weekse programma.",
      color: "bg-teal-600"
    },
    {
      icon: CheckCircle,
      title: "Stap 5: Start Programma",
      description: "Start van het 8-weekse programma met alle ingeschreven medewerkers, volledige ondersteuning en monitoring van voortgang",
      color: "bg-orange-600"
    },
    {
      icon: TrendingUp,
      title: "Stap 6: Resultaatmeting & Evaluatie",
      description: "Continue monitoring van resultaten en evaluatie van impact op verzuim en retentie na afloop",
      color: "bg-red-600"
    }
  ];

  return (
    <>
      <section className="bg-brand-gray-light section-padding">
        <div className="container-custom">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
              Zo Werken We Samen
            </h2>
            <p className="text-lg md:text-xl text-brand-gray-medium max-w-3xl mx-auto leading-relaxed">
              Van kennismaking tot meetbare resultaten: ontdek hoe we uw organisatie helpen bij het reduceren van verzuim en het verbeteren van retentie
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="space-y-6">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="relative">
                    <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className={`w-12 h-12 ${step.color} text-white rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg md:text-xl font-semibold text-brand-gray-dark mb-3 md:mb-4 leading-tight">
                            {step.title}
                          </h3>
                          <p className="text-brand-gray-medium text-base md:text-lg leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow between steps - hidden on mobile */}
                    {index < steps.length - 1 && (
                      <div className="hidden sm:flex justify-center my-4">
                        <ArrowRight className="h-6 w-6 text-brand-blue transform rotate-90" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={() => setIsCalculatorOpen(true)}
              className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold py-3 px-8 rounded-lg text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Onze besparing berekenen
            </Button>
          </div>
        </div>
      </section>

      <CalculatorModal 
        isOpen={isCalculatorOpen} 
        onClose={() => setIsCalculatorOpen(false)} 
      />
    </>
  );
};

export default ProcessSection;
