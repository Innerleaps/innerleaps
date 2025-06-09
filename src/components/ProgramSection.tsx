import { Button } from '@/components/ui/button';
import { Clock, Users, MapPin, Calendar } from 'lucide-react';
const ProgramSection = () => {
  const programSteps = [{
    weeks: "Week 1-2",
    title: "Stressbewustzijn en -herkenning",
    description: "Leren herkennen van stresssignalen en triggers in de werkomgeving"
  }, {
    weeks: "Week 3-4",
    title: "Aandachtsregulatie en concentratietechnieken",
    description: "Praktische technieken voor verbeterde focus en mentale helderheid"
  }, {
    weeks: "Week 5-6",
    title: "Stressresponsen en effectieve coping-strategieën",
    description: "Concrete tools voor het omgaan met werkdruk en uitdagingen"
  }, {
    weeks: "Week 7-8",
    title: "Implementatie in werk en dagelijks leven",
    description: "Integratie van geleerde technieken in de dagelijkse werkroutine"
  }, {
    weeks: "Oefendag",
    title: "Praktische integratie en verdieping",
    description: "Intensieve dag voor het versterken en toepassen van alle technieken"
  }];
  const programFeatures = [{
    icon: Clock,
    title: "8 weken programma",
    description: "1x per week 2,5 uur + oefendag"
  }, {
    icon: MapPin,
    title: "Op locatie",
    description: "Training bij u op kantoor"
  }, {
    icon: Users,
    title: "Groepstraining",
    description: "8-16 deelnemers per groep"
  }, {
    icon: Calendar,
    title: "Flexibele planning",
    description: "Afgestemd op uw agenda"
  }];
  return <section className="bg-white section-padding">
      <div className="container-custom">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
            Ons Programma
          </h2>
          <p className="text-xl text-brand-gray-medium max-w-4xl mx-auto leading-relaxed">
            Een gestructureerd 8-weekse programma gericht op stressreductie en het verbeteren van werkprestaties. Gebaseerd op Mindfulness-Based Stress Reduction (MBSR) met focus op praktische bedrijfstoepassingen.
          </p>
        </div>

        {/* Program Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {programFeatures.map((feature, index) => {
          const IconComponent = feature.icon;
          return <div key={index} className="text-center p-6 bg-brand-gray-light rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-blue text-white rounded-lg mb-4">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-brand-gray-dark mb-2">
                  {feature.title}
                </h3>
                <p className="text-brand-gray-medium text-sm">
                  {feature.description}
                </p>
              </div>;
        })}
        </div>

        {/* Program Steps */}
        <div className="space-y-8">
          <h3 className="text-2xl md:text-3xl font-bold text-brand-gray-dark text-center mb-12">
            Programma Overzicht
          </h3>
          
          <div className="grid gap-6">
            {programSteps.map((step, index) => <div key={index} className="flex items-start space-x-6 p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.weeks}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-brand-gray-dark mb-2">
                    {step.title}
                  </h4>
                  <p className="text-brand-gray-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>)}
          </div>
        </div>

        <div className="text-center mt-12 space-y-4">
          <div className="space-x-4">
            <Button className="btn-primary text-lg px-8 py-3 bg-zinc-950 hover:bg-zinc-800">
              Programma Details Bekijken
            </Button>
            <Button variant="outline" className="btn-secondary text-lg px-8 py-3" onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}>
              Vrijblijvend gesprek plannen
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default ProgramSection;