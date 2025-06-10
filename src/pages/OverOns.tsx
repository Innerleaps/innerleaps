
import Navigation from '@/components/Navigation';
import StickyCtaButtons from '@/components/StickyCtaButtons';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Award, BookOpen, Users, Heart, Target, Brain, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const OverOns = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    {
      name: "Dr. Sarah van den Berg",
      role: "Oprichter & Hoofdtrainer",
      bio: "Sarah is gepromoveerd in de psychologie en heeft meer dan 15 jaar ervaring in het begeleiden van organisaties bij stressreductie en veerkrachttraining. Ze is gecertificeerd MBSR-trainer en heeft eerder gewerkt bij toonaangevende bedrijven als Philips en ING.",
      specializations: ["MBSR Training", "Organisatiepsychologie", "Burn-out preventie"],
      image: "/placeholder.svg"
    },
    {
      name: "Mark de Vries",
      role: "Senior Trainer & Coach",
      bio: "Mark combineert zijn achtergrond in bedrijfskunde met zijn passie voor mindfulness. Hij heeft meer dan 200 professionals begeleid en werkt voornamelijk met leidinggevenden en managementteams in de zakelijke dienstverlening.",
      specializations: ["Executive coaching", "Teamdynamiek", "Leiderschap onder druk"],
      image: "/placeholder.svg"
    },
    {
      name: "Lisa Janssen",
      role: "Trainer & Programmacoördinator",
      bio: "Lisa is klinisch psycholoog en gespecialiseerd in werkstress en burn-out. Ze ontwikkelt en coördineert onze programma's en zorgt voor de kwaliteitsbewaking van alle trainingen.",
      specializations: ["Klinische psychologie", "Programmaontwikkeling", "Resultaatmeting"],
      image: "/placeholder.svg"
    }
  ];

  const expertise = [
    {
      icon: Brain,
      title: "MBSR Training",
      description: "Gecertificeerde Mindfulness-Based Stress Reduction trainers met jarenlange ervaring"
    },
    {
      icon: Award,
      title: "Wetenschappelijke Onderbouwing",
      description: "Alle programma's gebaseerd op peer-reviewed onderzoek en bewezen methodieken"
    },
    {
      icon: Users,
      title: "Organisatiepsychologie",
      description: "Diepe kennis van organisatiedynamiek en veranderingsprocessen"
    },
    {
      icon: Target,
      title: "Resultaatgericht Werken",
      description: "Focus op meetbare uitkomsten en concrete bedrijfsresultaten"
    },
    {
      icon: Heart,
      title: "Burn-out Preventie",
      description: "Specialistische kennis in het herkennen en voorkomen van burn-out"
    },
    {
      icon: Lightbulb,
      title: "Programmaontwikkeling",
      description: "Maatwerk programma's aangepast aan uw specifieke organisatie en uitdagingen"
    }
  ];

  return (
    <div className="min-h-screen bg-brand-gray-light">
      <Navigation />
      <StickyCtaButtons />
      
      <main className="section-padding">
        <div className="container-custom">
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-16">
            <Link to="/" className="inline-flex items-center text-brand-blue hover:text-brand-blue/80 transition-colors mb-8">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Terug naar home
            </Link>
            
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-dark">
                Over Ons
              </h1>
              <p className="text-xl text-brand-gray-medium leading-relaxed">
                Ontmoet het team achter Halt.academy en ontdek onze passie voor het verbeteren van medewerkerwelzijn door wetenschappelijk bewezen methoden.
              </p>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-white rounded-xl p-8 mb-16 shadow-lg">
            <h2 className="text-3xl font-bold text-brand-gray-dark mb-6 text-center">Onze Missie</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-brand-gray-medium leading-relaxed mb-6">
                Bij Halt.academy geloven we dat elke organisatie het recht heeft op gezonde, veerkrachtige en betrokken medewerkers. Onze missie is om organisaties te helpen bij het creëren van een werkomgeving waarin stress wordt gemanaged, welzijn wordt bevorderd, en zowel individuele als organisatorische doelen worden bereikt.
              </p>
              <p className="text-lg text-brand-gray-medium leading-relaxed">
                We doen dit door het aanbieden van wetenschappelijk bewezen programma's die niet alleen het welzijn van medewerkers verbeteren, maar ook meetbare bedrijfsresultaten opleveren. Omdat we geloven dat investeren in je mensen de beste investering is die je kunt doen.
              </p>
            </div>
          </div>

          {/* Expertise Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-brand-gray-dark mb-8 text-center">Onze Expertise</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertise.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="w-12 h-12 bg-brand-blue text-white rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-brand-gray-dark mb-3">{item.title}</h3>
                    <p className="text-brand-gray-medium text-sm leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-brand-gray-dark mb-8 text-center">Ons Team</h2>
            
            <div className="space-y-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="md:col-span-1">
                      <div className="w-32 h-32 bg-brand-gray-light rounded-full mx-auto mb-4 flex items-center justify-center">
                        <User className="h-16 w-16 text-brand-gray-medium" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-brand-gray-dark mb-1">{member.name}</h3>
                        <p className="text-brand-blue font-medium mb-4">{member.role}</p>
                      </div>
                    </div>
                    
                    <div className="md:col-span-3">
                      <p className="text-brand-gray-medium leading-relaxed mb-4">
                        {member.bio}
                      </p>
                      
                      <div>
                        <h4 className="font-semibold text-brand-gray-dark mb-2">Specialisaties:</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.specializations.map((spec, specIndex) => (
                            <span key={specIndex} className="inline-block bg-brand-gray-light text-brand-gray-dark text-sm px-3 py-1 rounded-full">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-brand-blue text-white rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Waarom Kiezen voor Halt.academy?</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-4xl font-bold text-brand-green-light mb-2">100%</div>
                <div className="text-lg">Wetenschappelijk onderbouwd</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-brand-green-light mb-2">500+</div>
                <div className="text-lg">Getrainde professionals</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-brand-green-light mb-2">50+</div>
                <div className="text-lg">Tevreden organisaties</div>
              </div>
            </div>
            
            <p className="text-xl mb-6 max-w-4xl mx-auto">
              Wij combineren wetenschappelijke rigor met praktische toepasbaarheid. Onze aanpak is bewezen effectief en onze trainers zijn hooggekwalificeerd. Maar het belangrijkste: we leveren resultaten die u kunt meten.
            </p>
            
            <Button 
              size="lg"
              className="bg-brand-green hover:bg-brand-green-light text-white font-semibold py-4 px-8 rounded-lg text-lg"
              onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}
            >
              Plan een Kennismakingsgesprek
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-brand-gray-dark text-white py-12 mt-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">Halt.academy</div>
              <p className="text-gray-300 leading-relaxed">
                Wetenschappelijk bewezen stressreductieprogramma's voor meetbare bedrijfsresultaten.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p>Email: info@halt.academy</p>
                <p>Telefoon: +31 (0)20 123 4567</p>
                <p>KvK: 12345678</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Snel naar</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-gray-300 hover:text-white transition-colors">Home</Link>
                <Link to="/wetenschap" className="block text-gray-300 hover:text-white transition-colors">De Wetenschap</Link>
                <Link to="/programma" className="block text-gray-300 hover:text-white transition-colors">Programma</Link>
                <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Halt.academy. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OverOns;
