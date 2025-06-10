
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, Target, TrendingUp, ArrowRight, Handshake, Presentation } from 'lucide-react';

const ProcessSection = () => {
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
      description: "Vastleggen van praktische zaken: Startdata en planning, Locatie (in-company of externe locatie), Investering per deelnemer, Afstemming over interne communicatie en werving",
      color: "bg-brand-green"
    },
    {
      icon: Presentation,
      title: "Stap 3: Introductiesessie voor Medewerkers",
      description: "Korte introductiesessie op uw locatie, bijvoorbeeld tijdens lunch of tijdens algemeen presentatie moment. Medewerkers maken kennis met de trainer en de aanpak. Uitleg over de voordelen en tijdsinvestering.",
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

        <div className="relative max-w-4xl mx-auto">
          {/* Process Steps */}
          <div className="space-y-8 relative">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative flex items-center">
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 w-full flex items-start">
                    <div className={`w-12 h-12 ${step.color} text-white rounded-lg flex items-center justify-center mr-6 flex-shrink-0`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1 max-w-lg">
                      <h3 className="text-lg font-semibold text-brand-gray-dark mb-3">
                        {step.title}
                      </h3>
                      <p className="text-brand-gray-medium text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Arrow pointing right */}
                  {index < steps.length - 1 && (
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                      <ArrowRight className="h-8 w-8 text-brand-blue rotate-90" />
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
