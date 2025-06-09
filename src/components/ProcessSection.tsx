
import { Button } from '@/components/ui/button';
import { Calculator, FileText, Users, Calendar, BarChart3 } from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    {
      icon: Calculator,
      step: "1",
      title: "Kennismaking & Besparingsinventarisatie",
      description: "Vrijblijvend gesprek met uw HR-team",
      details: [
        "Analyse van uw huidige verzuim- en retentiecijfers",
        "Berekening van uw potentiële besparing", 
        "Bepalen of MBSR aansluit bij uw organisatiedoelen"
      ],
      cta: "Plan een kennismakingsgesprek"
    },
    {
      icon: FileText,
      step: "2", 
      title: "Opdrachtakkoord",
      description: "Vastleggen van praktische zaken",
      details: [
        "Startdata en planning",
        "Locatie (in-company of externe locatie)",
        "Investering per deelnemer",
        "Afstemming over interne communicatie en werving"
      ]
    },
    {
      icon: Users,
      step: "3",
      title: "Introductiesessie voor Medewerkers", 
      description: "Korte introductiesessie op uw locatie",
      details: [
        "Medewerkers maken kennis met de trainer en aanpak",
        "Uitleg over voordelen en tijdsinvestering",
        "Vrijwillige inschrijving voor geïnteresseerde medewerkers",
        "Beantwoording van vragen en wegnemen van drempels"
      ]
    },
    {
      icon: Calendar,
      step: "4",
      title: "Start 8-weekse Training",
      description: "Wekelijkse sessies van 2,5 uur",
      details: [
        "Praktische oefeningen en direct toepasbare technieken",
        "Tussentijdse evaluatie en aanpassing waar nodig", 
        "Inclusief volledige oefendag",
        "Afsluitende evaluatie en implementatieplan"
      ]
    },
    {
      icon: BarChart3,
      step: "5",
      title: "Resultaatmeting",
      description: "Meting van effecten op stress, verzuim en retentie",
      details: [
        "Evaluatiegesprek met HR en management",
        "Rapportage van behaalde resultaten",
        "Aanbevelingen voor duurzame implementatie"
      ]
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
            Een heldere route naar lagere verzuimkosten en hogere retentie
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop Timeline Line */}
          <div className="hidden lg:block absolute top-24 left-0 w-full h-0.5 bg-brand-blue-light"></div>
          
          <div className="grid lg:grid-cols-5 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Timeline Circle */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10 relative">
                      {step.step}
                    </div>
                  </div>
                  
                  {/* Content Card */}
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-blue-light text-white rounded-lg mb-3">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-brand-gray-dark mb-2">
                        {step.title}
                      </h3>
                      <p className="text-brand-gray-medium text-sm font-medium mb-4">
                        {step.description}
                      </p>
                    </div>
                    
                    <ul className="space-y-2 text-sm text-brand-gray-medium">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                    
                    {step.cta && (
                      <div className="mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full text-brand-blue border-brand-blue hover:bg-brand-blue hover:text-white"
                          onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}
                        >
                          {step.cta}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-lg">
          <div className="text-center">
            <blockquote className="text-lg text-brand-gray-dark italic mb-4">
              "Het implementatieproces verliep soepeler dan verwacht. De trainer nam alle zorgen weg en onze medewerkers waren vanaf dag één enthousiast. Het resultaat? 25% minder verzuim binnen 6 maanden."
            </blockquote>
            <cite className="text-brand-gray-medium font-medium">
              — Linda van der Berg, HR Manager bij TechCorp
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
