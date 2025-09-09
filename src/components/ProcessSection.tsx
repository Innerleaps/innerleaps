
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, Target, TrendingUp, ArrowRight, Handshake, Presentation, UserPlus, Users, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import CalculatorModal from './CalculatorModal';

const ProcessSection = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const steps = [
    {
      icon: Calendar,
      title: "Stap 1:",
      description: "Vrijblijvend gesprek om elkaar te leren kennen en je behoeften te bespreken",
      color: "bg-brand-orange"
    },
    {
      icon: BarChart3,
      title: "Stap 2: Return on Investment berekenen",
      description: "Analyse van je huidige situatie en berekening van potentiële besparingen",
      color: "bg-brand-orange"
    },
    {
      icon: Presentation,
      title: "Stap 3: Try out Masterclass",
      description: "Praktische ervaring van het programma voordat je een beslissing neemt",
      color: "bg-brand-orange"
    },
    {
      icon: UserPlus,
      title: "Stap 4: Intake",
      description: "Persoonlijke gesprekken met deelnemers om hun situatie goed te begrijpen",
      color: "bg-brand-orange"
    },
    {
      icon: CheckCircle,
      title: "Stap 5: Start programma",
      description: "Start van het 9-weekse programma met alle ingeschreven medewerkers",
      color: "bg-brand-orange"
    },
    {
      icon: TrendingUp,
      title: "Stap 6: Resultaatmeting & evaluatie",
      description: "Continue monitoring van resultaten en evaluatie van impact",
      color: "bg-brand-orange"
    }
  ];

  return (
    <>
      <section className="bg-brand-gray-light section-padding">
        <div className="container-custom">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-dark">
              Zo Werken We Samen
            </h2>
            <p className="text-xl md:text-2xl text-brand-gray-medium max-w-3xl mx-auto leading-relaxed text-center">
              Van kennismaking tot meetbare resultaten: ontdek hoe we je organisatie helpen om burnout te voorkomen, verzuim te verlagen en retentie te verbeteren
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="space-y-6">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="relative">
                    <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
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
              className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue text-white hover:text-white font-semibold py-3 px-8 rounded-lg text-base md:text-lg shadow-lg"
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
