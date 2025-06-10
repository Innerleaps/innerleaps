
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Users, TrendingUp, CheckCircle, Star, Quote, Brain, Heart, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wetenschap = () => {
  const studies = [
    {
      title: "Harvard Business Review Study",
      description: "8-weekse mindfulness programma's resulteren in 28% stress reductie en 20% verbetering in slaapkwaliteit.",
      impact: "28% stress reductie",
      participants: "150 executives"
    },
    {
      title: "Journal of Occupational Health Psychology",
      description: "Werknemers die mindfulness training volgden toonden 23% minder burnout symptomen en 25% hogere job tevredenheid.",
      impact: "23% minder burnout",
      participants: "500+ werknemers"
    },
    {
      title: "American Journal of Health Promotion",
      description: "Bedrijven met mindfulness programma's zagen 30% reductie in ziekteverzuim en €2.30 ROI per geïnvesteerde euro.",
      impact: "€2.30 ROI per €1",
      participants: "12 bedrijven"
    }
  ];

  const benefits = [
    {
      icon: Brain,
      title: "Cognitieve Verbetering",
      description: "Verhoogde focus, betere besluitvorming en verbeterd geheugen door regelmatige mindfulness praktijk.",
      percentage: "40%"
    },
    {
      icon: Heart,
      title: "Emotionele Regulatie",
      description: "Beter omgaan met stress, verhoogde emotionele intelligentie en verbeterde werkrelaties.",
      percentage: "35%"
    },
    {
      icon: Target,
      title: "Prestatie Verbetering",
      description: "Hogere productiviteit, betere creativiteit en verhoogde probleemoplossend vermogen.",
      percentage: "30%"
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
              <BookOpen className="h-10 w-10" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              De Wetenschap Achter <span className="text-brand-green-light">Mindfulness</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Meer dan 3000+ wetenschappelijke studies bewijzen de effectiviteit van mindfulness voor stress reductie, 
              verhoogde focus en verbeterde werkprestaties.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-green-light">3000+</div>
                <div className="text-blue-200">Wetenschappelijke studies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-green-light">40+</div>
                <div className="text-blue-200">Jaren onderzoek</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-green-light">95%</div>
                <div className="text-blue-200">Bewezen effectiviteit</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Studies Section */}
      <section className="section-padding bg-brand-gray-light">
        <div className="container-custom">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
              Belangrijkste Wetenschappelijke Studies
            </h2>
            <p className="text-xl text-brand-gray-medium max-w-3xl mx-auto">
              Onderzoek van vooraanstaande universiteiten en publicaties toont consistente voordelen van mindfulness in de werkplek
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {studies.map((study, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Star className="h-8 w-8 text-brand-green" />
                    <span className="text-sm font-medium text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full">
                      Peer-reviewed
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-brand-gray-dark mb-3">
                      {study.title}
                    </h3>
                    <p className="text-brand-gray-medium leading-relaxed">
                      {study.description}
                    </p>
                  </div>
                  
                  <div className="bg-brand-green/10 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-brand-green mb-1">
                      {study.impact}
                    </div>
                    <div className="text-sm text-brand-gray-medium">
                      Onderzocht bij {study.participants}
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
              Bewezen Voordelen voor Uw Organisatie
            </h2>
            <p className="text-xl text-brand-gray-medium max-w-3xl mx-auto">
              Wetenschappelijk bewezen resultaten die direct impact hebben op uw bedrijfsresultaten
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
                    <div className="text-3xl font-bold text-brand-green">
                      +{benefit.percentage}
                    </div>
                    <h3 className="text-xl font-bold text-brand-gray-dark">
                      {benefit.title}
                    </h3>
                    <p className="text-brand-gray-medium leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Research Quote Section */}
      <section className="section-padding bg-brand-blue text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm p-12 text-center">
              <Quote className="h-12 w-12 text-brand-green-light mx-auto mb-6" />
              
              <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8">
                "Mindfulness training in de werkplek leidt tot significante verbeteringen in werknemerwelzijn, 
                productiviteit en organisatorische effectiviteit. De ROI is meetbaar binnen 3-6 maanden."
              </blockquote>
              
              <div className="space-y-2">
                <cite className="text-xl font-semibold text-brand-green-light">
                  Dr. Richard Davidson
                </cite>
                <p className="text-blue-200">
                  Neuroscientist, University of Wisconsin-Madison
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-brand-gray-light">
        <div className="container-custom">
          <Card className="bg-gradient-to-r from-brand-green to-brand-green-light text-white p-12 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <TrendingUp className="h-8 w-8" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold">
                Klaar om de Wetenschap toe te Passen?
              </h2>
              
              <p className="text-xl opacity-90 leading-relaxed">
                Ontdek hoe wetenschappelijk bewezen mindfulness training uw organisatie kan transformeren
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-white text-brand-green hover:bg-gray-100 font-semibold py-4 px-8 text-lg transform hover:-translate-y-1 transition-all duration-300"
                  onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}
                >
                  Plan een Kennismakingsgesprek
                </Button>
                <Link to="/programma">
                  <Button 
                    variant="outline" 
                    className="border-2 border-white text-white hover:bg-white hover:text-brand-green font-semibold py-4 px-8 text-lg transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Bekijk Ons Programma
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

export default Wetenschap;
