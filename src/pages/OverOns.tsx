
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Users, Award, BookOpen, Heart, Brain, Target, CheckCircle, Star, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const OverOns = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah van der Berg",
      role: "Oprichter & Senior Trainer",
      credentials: "PhD Psychologie, MBSR Gecertificeerd",
      experience: "15+ jaar ervaring",
      description: "Gespecialiseerd in werkplek mindfulness en stress reductie programma's. Voormalig researcher aan de Universiteit van Amsterdam.",
      image: "/placeholder.svg"
    },
    {
      name: "Mark Janssen", 
      role: "Business Development Director",
      credentials: "MSc Organisatiepsychologie",
      experience: "12+ jaar ervaring", 
      description: "Expert in organisatieontwikkeling en implementatie van welzijnsprogramma's in middelgrote tot grote bedrijven.",
      image: "/placeholder.svg"
    },
    {
      name: "Lisa Chen",
      role: "Senior Mindfulness Trainer", 
      credentials: "MBCT & MBSR Gecertificeerd",
      experience: "10+ jaar ervaring",
      description: "Specialist in groepstrainingen en individuele coaching. Voormalig consultant bij Fortune 500 bedrijven.",
      image: "/placeholder.svg"
    }
  ];

  const expertise = [
    {
      icon: Brain,
      title: "MBSR Training",
      description: "Mindfulness-Based Stress Reduction volgens Jon Kabat-Zinn methodologie"
    },
    {
      icon: Heart,
      title: "MBCT Training", 
      description: "Mindfulness-Based Cognitive Therapy voor emotionele regulatie"
    },
    {
      icon: Target,
      title: "Werkplek Implementatie",
      description: "Specialisatie in mindfulness programma's voor bedrijfsomgevingen"
    },
    {
      icon: Users,
      title: "Organisatieontwikkeling",
      description: "Integratie van mindfulness in organisatiecultuur en processen"
    },
    {
      icon: Award,
      title: "Wetenschappelijk Onderzoek",
      description: "Bijdragen aan peer-reviewed publicaties over mindfulness effectiviteit"
    },
    {
      icon: BookOpen,
      title: "Programma Ontwikkeling", 
      description: "Maatwerk programma's gebaseerd op organisatie-specifieke behoeften"
    }
  ];

  const values = [
    {
      title: "Wetenschappelijke Basis",
      description: "Alle onze programma's zijn gebaseerd op bewezen wetenschappelijk onderzoek en evidence-based praktijken."
    },
    {
      title: "Meetbare Resultaten", 
      description: "We focussen op concrete, meetbare outcomes die direct bijdragen aan uw bedrijfsdoelstellingen."
    },
    {
      title: "Duurzame Verandering",
      description: "Onze aanpak richt zich op langdurige gedragsverandering en blijvende impact op uw organisatie."
    },
    {
      title: "Persoonlijke Aandacht",
      description: "Elke implementatie wordt aangepast aan de unieke behoeften en cultuur van uw organisatie."
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
              <Heart className="h-10 w-10" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Over <span className="text-brand-green-light">Halt.academy</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Wij zijn experts in wetenschappelijk bewezen mindfulness programma's die organisaties 
              helpen stress te reduceren en bedrijfsresultaten te verbeteren
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-green-light">500+</div>
                <div className="text-blue-200">Bedrijven geholpen</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-green-light">15.000+</div>
                <div className="text-blue-200">Professionals getraind</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-green-light">98%</div>
                <div className="text-blue-200">Tevredenheidscore</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
              Onze Missie
            </h2>
            <Card className="p-12 bg-gradient-to-r from-brand-green/10 to-brand-blue/10">
              <p className="text-xl md:text-2xl text-brand-gray-dark leading-relaxed">
                We geloven dat elke organisatie het recht heeft op gezonde, productieve en gelukkige medewerkers. 
                Door wetenschappelijk bewezen mindfulness technieken toegankelijk te maken, helpen we bedrijven 
                hun meest waardevolle asset - hun mensen - optimaal te laten presteren.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-brand-gray-light">
        <div className="container-custom">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
              Ons Expert Team
            </h2>
            <p className="text-xl text-brand-gray-medium max-w-3xl mx-auto">
              Gecertificeerde professionals met jarenlange ervaring in mindfulness en organisatieontwikkeling
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="space-y-6">
                  <div className="w-24 h-24 bg-brand-blue/10 rounded-full mx-auto flex items-center justify-center">
                    <Users className="h-12 w-12 text-brand-blue" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-brand-gray-dark">
                      {member.name}
                    </h3>
                    <p className="text-brand-blue font-semibold">
                      {member.role}
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm text-brand-gray-medium">
                        {member.credentials}
                      </p>
                      <p className="text-sm font-medium text-brand-green">
                        {member.experience}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-brand-gray-medium leading-relaxed text-sm">
                    {member.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
              Onze Expertise
            </h2>
            <p className="text-xl text-brand-gray-medium max-w-3xl mx-auto">
              Diepgaande kennis en ervaring in verschillende aspecten van mindfulness en organisatieontwikkeling
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertise.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-brand-blue text-white rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-brand-gray-dark">
                        {item.title}
                      </h3>
                      <p className="text-brand-gray-medium text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-brand-blue text-white">
        <div className="container-custom">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Onze Waarden
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              De principes die ons werk en onze relaties met klanten sturen
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm p-8 border-0">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-brand-green-light mr-3" />
                    <h3 className="text-xl font-bold">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-blue-100 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="section-padding bg-brand-gray-light">
        <div className="container-custom">
          <Card className="bg-white p-12 text-center max-w-4xl mx-auto">
            <Quote className="h-12 w-12 text-brand-green mx-auto mb-6" />
            
            <blockquote className="text-2xl md:text-3xl font-medium text-brand-gray-dark leading-relaxed mb-8">
              "Het team van Halt.academy heeft onze organisatie getransformeerd. Hun professionele aanpak 
              en bewezen methodologieën hebben geleid tot meetbare verbeteringen in ons welzijn en onze resultaten."
            </blockquote>
            
            <div className="space-y-2">
              <cite className="text-xl font-semibold text-brand-blue">
                Patricia de Vries
              </cite>
              <p className="text-brand-gray-medium">
                Chief People Officer, TechCorp Nederland
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <Card className="bg-gradient-to-r from-brand-green to-brand-green-light text-white p-12 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Heart className="h-8 w-8" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold">
                Klaar om Samen te Werken?
              </h2>
              
              <p className="text-xl opacity-90 leading-relaxed">
                Laten we bespreken hoe ons team uw organisatie kan helpen bij het bereiken van uw welzijn- en prestatiedoelstellingen
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-white text-brand-green hover:bg-gray-100 font-semibold py-4 px-8 text-lg transform hover:-translate-y-1 transition-all duration-300"
                  onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}
                >
                  Plan een Kennismakingsgesprek
                </Button>
                <Link to="/contact">
                  <Button 
                    variant="outline" 
                    className="border-2 border-white text-white hover:bg-white hover:text-brand-green font-semibold py-4 px-8 text-lg transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Contacteer Ons Direct
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

export default OverOns;
