
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Clock, Users, Target, CheckCircle, Calendar, BookOpen, Brain, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Programma = () => {
  const weeklyProgram = [
    {
      week: "Week 1",
      title: "Introductie tot Mindfulness",
      description: "Fundamenten van mindfulness, basis ademtechnieken en bewustzijn van het huidige moment",
      duration: "90 min",
      practices: ["Basisademhaling", "Body scan", "Mindful luisteren"]
    },
    {
      week: "Week 2", 
      title: "Bewustzijn van Gedachten",
      description: "Herkennen van gedachtenpatronen, omgaan met mentale drukte en focus technieken",
      duration: "90 min",
      practices: ["Gedachten observeren", "Focusoefeningen", "Mindful werken"]
    },
    {
      week: "Week 3",
      title: "Emoties en Stress",
      description: "Emotionele regulatie, stressherkenning en mindful reageren in plaats van automatisch handelen",
      duration: "90 min", 
      practices: ["Emotie-regulatie", "Stress-responsoefeningen", "Mindful communicatie"]
    },
    {
      week: "Week 4",
      title: "Mindful Communiceren",
      description: "Bewust luisteren, empathische communicatie en conflict hantering met mindfulness",
      duration: "90 min",
      practices: ["Actief luisteren", "Empathische communicatie", "Conflict mindfulness"]
    },
    {
      week: "Oefendag tussen week 5 en 7",
      title: "Intensieve Praktijkdag",
      description: "Verdieping van alle geleerde technieken, langere meditaties en integratie in dagelijks werk",
      duration: "6 uur",
      practices: ["Langere meditaties", "Werkplekintegratie", "Groepsreflectie"]
    },
    {
      week: "Week 6",
      title: "Mindfulness op de Werkplek",
      description: "Praktische toepassing tijdens werkdag, mindful leiderschap en teamdynamiek",
      duration: "90 min",
      practices: ["Werkplek mindfulness", "Mindful leiderschap", "Team oefeningen"]
    },
    {
      week: "Week 7",
      title: "Veerkracht en Welzijn",
      description: "Opbouwen van mentale veerkracht, zelfzorg technieken en duurzaam welzijn",
      duration: "90 min",
      practices: ["Veerkrachtoefeningen", "Zelfzorg planning", "Welzijn strategieën"]
    },
    {
      week: "Week 8",
      title: "Integratie en Duurzaamheid",
      description: "Persoonlijk actieplan, duurzame praktijk ontwikkelen en ondersteuning voor de toekomst",
      duration: "90 min",
      practices: ["Persoonlijk plan", "Toekomstige praktijk", "Ondersteuningsnetwerk"]
    }
  ];

  const benefits = [
    {
      icon: Brain,
      title: "Cognitieve Voordelen",
      items: ["40% verhoogde focus", "Betere besluitvorming", "Verhoogde creativiteit", "Verbeterd geheugen"]
    },
    {
      icon: Heart,
      title: "Emotionele Voordelen", 
      items: ["35% stress reductie", "Betere emotionele regulatie", "Verhoogde empathie", "Meer zelfvertrouwen"]
    },
    {
      icon: Users,
      title: "Sociale Voordelen",
      items: ["Betere communicatie", "Sterkere teamrelaties", "Minder conflicten", "Verhoogde samenwerking"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Back to home button */}
      <div className="container-custom pt-8">
        <Link to="/">
          <Button variant="outline" className="mb-8 transform hover:-translate-y-1 transition-all duration-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Terug naar home
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
              <Calendar className="h-10 w-10" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              8-Weekse <span className="text-brand-green-light">Mindfulness</span> Programma
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Een bewezen programma dat stap-voor-stap mindfulness technieken aanleert voor 
              duurzame stress reductie en verhoogde prestaties
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-green-light">8 weken</div>
                <div className="text-blue-200">Programma duur</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-green-light">16 uur</div>
                <div className="text-blue-200">Totale training</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-green-light">12-16</div>
                <div className="text-blue-200">Deelnemers per groep</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Program Section */}
      <section className="section-padding bg-brand-gray-light">
        <div className="container-custom">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
              Week-voor-Week Programma
            </h2>
            <p className="text-xl text-brand-gray-medium max-w-3xl mx-auto">
              Elke week bouwt voort op de vorige, met praktische oefeningen en toepassingen voor de werkplek
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {weeklyProgram.map((week, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-brand-blue bg-brand-blue/10 px-4 py-2 rounded-full">
                      {week.week}
                    </span>
                    <div className="flex items-center text-brand-gray-medium">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{week.duration}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-brand-gray-dark mb-3">
                      {week.title}
                    </h3>
                    <p className="text-brand-gray-medium leading-relaxed">
                      {week.description}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-brand-gray-dark mb-3">Praktijkoefeningen:</h4>
                    <div className="space-y-2">
                      {week.practices.map((practice, practiceIndex) => (
                        <div key={practiceIndex} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-brand-green mr-3 flex-shrink-0" />
                          <span className="text-sm text-brand-gray-medium">{practice}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
              Bewezen Resultaten
            </h2>
            <p className="text-xl text-brand-gray-medium max-w-3xl mx-auto">
              Deelnemers ervaren meetbare verbeteringen in verschillende levensdomeinen
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center space-y-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-blue text-white rounded-full">
                    <IconComponent className="h-10 w-10" />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-brand-gray-dark">
                      {benefit.title}
                    </h3>
                    <div className="space-y-3">
                      {benefit.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-brand-green mr-3 flex-shrink-0" />
                          <span className="text-brand-gray-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-brand-gray-light">
        <div className="container-custom">
          <Card className="bg-gradient-to-r from-brand-green to-brand-green-light text-white p-12 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Target className="h-8 w-8" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold">
                Start Vandaag met Transformatie
              </h2>
              
              <p className="text-xl opacity-90 leading-relaxed">
                Investeer in duurzame stress reductie en verhoogde prestaties voor uw team
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-white text-brand-green hover:bg-gray-100 font-semibold py-4 px-8 text-lg transform hover:-translate-y-1 transition-all duration-300"
                  onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}
                >
                  Plan een Kennismakingsgesprek
                </Button>
                <Link to="/voor-wie">
                  <Button 
                    variant="outline" 
                    className="border-2 border-white text-white hover:bg-white hover:text-brand-green font-semibold py-4 px-8 text-lg transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Voor Wie is Dit Programma?
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Programma;
