
import { Button } from '@/components/ui/button';
import { Clock, Users, Target, TrendingUp, BookOpen, Brain, Heart, CheckCircle } from 'lucide-react';

const ProgramSection = () => {
  const weeks = [
    {
      week: "Week 1-2",
      title: "Fundament & Bewustwording",
      description: "Introductie tot mindfulness en stress herkenning",
      techniques: ["Ademhalingsoefeningen", "Body scan meditatie", "Stress signalen herkennen"]
    },
    {
      week: "Week 3-4", 
      title: "Technieken & Toepassing",
      description: "Praktische mindfulness technieken voor dagelijks gebruik",
      techniques: ["Mindful communicatie", "Emotieregulatie", "Aandachtstraining"]
    },
    {
      week: "Oefendag tussen week 5 en 7",
      title: "Intensieve Praktijkdag",
      description: "Diepgaande oefensessie met alle geleerde technieken",
      techniques: ["Uitgebreide meditatie", "Groepsreflectie", "Persoonlijke coaching"]
    },
    {
      week: "Week 6-7",
      title: "Integratie & Verdieping", 
      description: "Technieken integreren in werkroutines en privéleven",
      techniques: ["Werkplek mindfulness", "Conflicthantering", "Tijdmanagement"]
    },
    {
      week: "Week 8",
      title: "Consolidatie & Toekomst",
      description: "Resultaten evalueren en toekomstplan opstellen",
      techniques: ["Voortgangsmeting", "Persoonlijk actieplan", "Follow-up strategie"]
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "30% Minder Verzuim",
      description: "Wetenschappelijk bewezen reductie in ziekteverzuim"
    },
    {
      icon: Heart,
      title: "40-58% Minder Stress",
      description: "Significante afname van werkgerelateerde stress"
    },
    {
      icon: Users,
      title: "31% Hogere Retentie",
      description: "Medewerkers blijven langer en zijn tevredener"
    },
    {
      icon: Target,
      title: "26% Meer Tevredenheid",
      description: "Verhoogde werktevredenheid en betrokkenheid"
    }
  ];

  return (
    <section id="programma" className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
            Het 8-Weekse Programma
          </h2>
          <p className="text-xl text-brand-gray-medium max-w-3xl mx-auto leading-relaxed">
            Een bewezen traject gebaseerd op MBSR (Mindfulness-Based Stress Reduction) 
            speciaal aangepast voor de bedrijfsomgeving
          </p>
        </div>

        {/* Program Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {weeks.map((week, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-brand-blue">
                  <div className="flex items-start space-x-4">
                    <div className="bg-brand-blue text-white rounded-lg p-3 flex-shrink-0">
                      <span className="font-semibold text-sm">{week.week}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-brand-gray-dark mb-2">
                        {week.title}
                      </h3>
                      <p className="text-brand-gray-medium mb-4 leading-relaxed">
                        {week.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {week.techniques.map((technique, techIndex) => (
                          <span key={techIndex} className="bg-brand-gray-light text-brand-gray-dark px-3 py-1 rounded-full text-sm">
                            {technique}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-brand-blue text-white rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Programma Details</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5" />
                  <span>8 weken intensieve training</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5" />
                  <span>Groepen van 12-16 deelnemers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5" />
                  <span>2.5 uur per sessie + thuisoefeningen</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Brain className="h-5 w-5" />
                  <span>Gecertificeerde MBSR trainers</span>
                </div>
              </div>
            </div>

            <div className="bg-brand-green text-white rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Inclusief</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5" />
                  <span>Werkboek en audiomateriaal</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5" />
                  <span>Persoonlijke coaching sessies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5" />
                  <span>Online leerplatform toegang</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5" />
                  <span>3 maanden follow-up support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-brand-gray-light rounded-2xl p-8 mb-16">
          <div className="text-center space-y-6 mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-brand-gray-dark">
              Bewezen Resultaten
            </h3>
            <p className="text-lg text-brand-gray-medium max-w-2xl mx-auto">
              Onze programma's leveren consistente, meetbare verbetering in welzijn en bedrijfsprestaties
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue text-white rounded-full mb-4">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-semibold text-brand-gray-dark mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-brand-gray-medium text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}
          >
            Start Uw 8-Weekse Transformatie
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
