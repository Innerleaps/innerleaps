import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, Target, TrendingUp, ArrowRight, Handshake, Presentation } from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    {
      icon: Calendar,
      title: "Stap 1: Kennismaking & Besparingsinventarisatie",
      description: "Vrijblijvend gesprek waarin we uw huidige situatie analyseren en potentiële besparingen berekenen",
      cta: "Plan een kennismakingsgesprek",
      color: "bg-brand-blue"
    },
    {
      icon: Handshake,
      title: "Stap 2: Opdrachtakkoord",
      description: "Vastleggen van praktische zaken: Startdata en planning Locatie (in-company of externe locatie). Investering.",
      color: "bg-brand-green"
    },
    {
      icon: Presentation,
      title: "Stap 3: Introductiesessie voor Medewerkers",
      description: "Korte introductiesessie op uw locatie, bijvoorbeeld tijdens lunch of tijdens algemeen presentatie moment. Medewerkers maken kennis met de trainer en de aanpak Uitleg over de voordelen en tijdsinvestering.",
      color: "bg-purple-600"
    },
    {
      icon: CheckCircle,
      title: "Stap 4: Implementatie & Begeleiding",
      description: "Start van het 8-weekse programma met volledige ondersteuning en monitoring van voortgang",
      color: "bg-orange-600"
    },
    {
      icon: TrendingUp,
      title: "Stap 5: Resultaatmeting & Evaluatie",
      description: "Continue monitoring van resultaten en evaluatie van impact op verzuim en retentie na afloop",
      color: "bg-red-600"
    }
  ];

  return (
    <section className="bg-brand-gray-light section-padding">
      <div className="container-custom">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
            Zo Werken We Samen
          </h2>
          <p className="text-xl text-brand-gray-medium max-w-3xl mx-auto leading-relaxed">
            Van kennismaking tot meetbare resultaten: ontdek hoe we uw organisatie helpen bij het reduceren van verzuim en het verbeteren van retentie
          </p>
        </div>

        <div className="relative">
          {/* Process Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <div className={`w-12 h-12 ${step.color} text-white rounded-lg flex items-center justify-center mb-4`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-sm font-semibold text-brand-gray-dark mb-3 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-brand-gray-medium text-xs leading-relaxed mb-4">
                      {step.description}
                    </p>
                    {step.cta && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-medium px-3 py-2 rounded-lg text-xs transition-all duration-300 w-full transform hover:-translate-y-1"
                        onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}
                      >
                        {step.cta}
                      </Button>
                    )}
                  </div>
                  
                  {/* Arrow between steps */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-6 w-6 text-brand-blue" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button 
            className="bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}
          >
            Start vandaag nog
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
