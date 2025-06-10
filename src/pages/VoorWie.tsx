
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Users, Building, TrendingUp, CheckCircle, Target, Briefcase, Heart, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const VoorWie = () => {
  const targetGroups = [
    {
      icon: Building,
      title: "Middelgrote tot Grote Bedrijven",
      description: "Organisaties met 50+ medewerkers die worstelen met hoog verzuim en verloop",
      challenges: [
        "Hoog ziekteverzuim (>4%)",
        "Verhoogd personeelsverloop", 
        "Stress-gerelateerde klachten",
        "Verminderde productiviteit"
      ],
      results: [
        "30% reductie ziekteverzuim",
        "31% betere retentie",
        "Verbeterde werksfeer",
        "Meetbare ROI binnen 6 maanden"
      ]
    },
    {
      icon: Users,
      title: "HR-teams en Managers",
      description: "Professionals die verantwoordelijk zijn voor medewerkerswelzijn en organisatieontwikkeling",
      challenges: [
        "Uitdagingen in retentie",
        "Stress management",
        "Team cohesie problemen",
        "Burn-out preventie"
      ],
      results: [
        "Effectieve stress interventies",
        "Betere team communicatie", 
        "Proactieve burn-out preventie",
        "Verbeterde leiderschapsvaardigheden"
      ]
    },
    {
      icon: Briefcase,
      title: "Leidinggevenden",
      description: "Managers en executives die hun teams willen ondersteunen en prestaties willen verbeteren",
      challenges: [
        "Team stress management",
        "Ineffectieve communicatie",
        "Lage betrokkenheid",
        "Prestatie-uitdagingen"
      ],
      results: [
        "Mindful leiderschap vaardigheden",
        "Betere team prestaties",
        "Verhoogde betrokkenheid",
        "Effectievere communicatie"
      ]
    }
  ];

  const industries = [
    "Gezondheidszorg",
    "Financiële dienstverlening", 
    "Technologie",
    "Productie & Logistiek",
    "Onderwijs",
    "Consulting",
    "Retail & E-commerce",
    "Publieke sector"
  ];

  const successMetrics = [
    {
      metric: "30%",
      description: "Gemiddelde reductie in ziekteverzuim",
      icon: TrendingUp
    },
    {
      metric: "31%", 
      description: "Verbetering in medewerkerretentie",
      icon: Heart
    },
    {
      metric: "40-58%",
      description: "Reductie in werkgerelateerde stress",
      icon: Brain
    },
    {
      metric: "26%",
      description: "Toename in werktevredenheid",
      icon: Target
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
              <Users className="h-10 w-10" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Voor Wie is <span className="text-brand-green-light">Ons Programma</span>?
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Ons wetenschappelijk bewezen mindfulness programma is speciaal ontwikkeld voor 
              organisaties die hun medewerkerswelzijn en bedrijfsresultaten willen verbeteren
            </p>
          </div>
        </div>
      </section>

      {/* Target Groups Section */}
      <section className="section-padding bg-brand-gray-light">
        <div className="container-custom">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
              Ideale Kandidaten
            </h2>
            <p className="text-xl text-brand-gray-medium max-w-3xl mx-auto">
              Organisaties en professionals die baat hebben bij ons programma
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {targetGroups.map((group, index) => {
              const IconComponent = group.icon;
              return (
                <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                  <div className="space-y-6 h-full flex flex-col">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue text-white rounded-full mb-4">
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold text-brand-gray-dark mb-3">
                        {group.title}
                      </h3>
                      <p className="text-brand-gray-medium leading-relaxed">
                        {group.description}
                      </p>
                    </div>
                    
                    <div className="flex-1 space-y-6">
                      <div>
                        <h4 className="font-semibold text-brand-gray-dark mb-3">Uitdagingen:</h4>
                        <div className="space-y-2">
                          {group.challenges.map((challenge, challengeIndex) => (
                            <div key={challengeIndex} className="flex items-start">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-sm text-brand-gray-medium">{challenge}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-brand-gray-dark mb-3">Resultaten:</h4>
                        <div className="space-y-2">
                          {group.results.map((result, resultIndex) => (
                            <div key={resultIndex} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-brand-green mt-0.5 mr-3 flex-shrink-0" />
                              <span className="text-sm text-brand-gray-medium">{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
              Succesvolle Implementaties
            </h2>
            <p className="text-xl text-brand-gray-medium max-w-3xl mx-auto">
              Ons programma is bewezen effectief in verschillende sectoren en organisatietypen
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="font-semibold text-brand-gray-dark">
                  {industry}
                </h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="section-padding bg-brand-blue text-white">
        <div className="container-custom">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Bewezen Resultaten
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Onze deelnemers ervaren consistente, meetbare verbeteringen
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <div key={index} className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-brand-green-light">
                      {metric.metric}
                    </div>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      {metric.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Assessment Section */}
      <section className="section-padding bg-brand-gray-light">
        <div className="container-custom">
          <Card className="bg-gradient-to-r from-brand-green to-brand-green-light text-white p-12">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <CheckCircle className="h-8 w-8" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold">
                Is Uw Organisatie er Klaar Voor?
              </h2>
              
              <div className="text-left max-w-2xl mx-auto space-y-4">
                <p className="text-lg opacity-90">Ons programma is ideaal voor organisaties die:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                      <span>50+ medewerkers hebben</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Worstelen met verzuim</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Retentie problemen hebben</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Investeren in welzijn</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Meetbare ROI willen</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Duurzame verandering nastreven</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
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

export default VoorWie;
