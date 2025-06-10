
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Award, Users, Target, TrendingUp, GraduationCap, Heart, Brain, Briefcase } from 'lucide-react';
import StickyCtaButtons from '@/components/StickyCtaButtons';

const OverOns = () => {
  const expertises = [
    {
      icon: Brain,
      title: "MBSR Training",
      description: "Mindfulness-Based Stress Reduction gecertificeerd door Jon Kabat-Zinn instituut"
    },
    {
      icon: Heart,
      title: "Stressmanagement",
      description: "Evidence-based technieken voor duurzame stressreductie"
    },
    {
      icon: Briefcase,
      title: "Corporate Wellness",
      description: "Gespecialiseerd in bedrijfsbrede welzijnsprogramma's"
    },
    {
      icon: TrendingUp,
      title: "ROI Optimalisatie",
      description: "Focus op meetbare resultaten en bedrijfswaarde"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <StickyCtaButtons />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white section-padding">
        <div className="container-custom">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Over Halt.academy
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Wetenschappelijk onderbouwde stressreductie voor bedrijven met meetbare resultaten
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-dark">
                Onze Missie
              </h2>
              <div className="space-y-6 text-lg text-brand-gray-medium leading-relaxed">
                <p>
                  Bij Halt.academy geloven we dat stress niet onvermijdelijk hoeft te zijn in de moderne werkplek. 
                  Onze missie is om bedrijven te helpen hun medewerkers gezonder, gelukkiger en productiever te maken 
                  door wetenschappelijk bewezen stressreductieprogramma's.
                </p>
                <p>
                  We richten ons op meetbare resultaten: minder verzuim, hogere retentie en verhoogde productiviteit. 
                  Onze aanpak is gebaseerd op MBSR (Mindfulness-Based Stress Reduction) en andere evidence-based technieken 
                  die hun effectiviteit hebben bewezen in wetenschappelijk onderzoek.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-brand-gray-light rounded-2xl p-8 shadow-lg">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-blue mb-2">500+</div>
                    <div className="text-brand-gray-medium">Bedrijven geholpen</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-green mb-2">15,000+</div>
                    <div className="text-brand-gray-medium">Medewerkers getraind</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-blue mb-2">30%</div>
                    <div className="text-brand-gray-medium">Gemiddelde verzuimreductie</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-green mb-2">95%</div>
                    <div className="text-brand-gray-medium">Tevredenheidscore</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="bg-brand-gray-light section-padding">
        <div className="container-custom">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-dark">
              Onze Expertise
            </h2>
            <p className="text-xl text-brand-gray-medium max-w-3xl mx-auto leading-relaxed">
              Gecertificeerde trainers met jarenlange ervaring in stressreductie en corporate wellness
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertises.map((expertise, index) => {
              const IconComponent = expertise.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue text-white rounded-full mb-4">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-gray-dark mb-3">
                    {expertise.title}
                  </h3>
                  <p className="text-brand-gray-medium text-sm leading-relaxed">
                    {expertise.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-dark">
              Ons Team
            </h2>
            <p className="text-xl text-brand-gray-medium max-w-3xl mx-auto leading-relaxed">
              Professionele trainers met bewezen expertise in stressreductie en mindfulness
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-24 h-24 bg-brand-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-gray-dark mb-2">Dr. Sarah van der Berg</h3>
              <p className="text-brand-blue font-medium mb-3">Hoofdtrainer & Oprichter</p>
              <p className="text-brand-gray-medium text-sm leading-relaxed">
                Gepromoveerd in Gezondheidspsychologie, MBSR gecertificeerd trainer met 15+ jaar ervaring 
                in corporate wellness programma's.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-24 h-24 bg-brand-green rounded-full mx-auto mb-6 flex items-center justify-center">
                <GraduationCap className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-gray-dark mb-2">Mark Jansen</h3>
              <p className="text-brand-blue font-medium mb-3">Senior Trainer</p>
              <p className="text-brand-gray-medium text-sm leading-relaxed">
                Master in Arbeids- en Organisatiepsychologie, gespecialiseerd in stressmanagement 
                en team coaching binnen bedrijfsomgevingen.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-24 h-24 bg-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Award className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-gray-dark mb-2">Lisa Chen</h3>
              <p className="text-brand-blue font-medium mb-3">Implementatie Specialist</p>
              <p className="text-brand-gray-medium text-sm leading-relaxed">
                MBA in Change Management, expert in het implementeren van welzijnsprogramma's 
                en het meten van ROI binnen grote organisaties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-blue text-white section-padding">
        <div className="container-custom">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">
              Klaar om de Impact te Ervaren?
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Ontdek hoe onze wetenschappelijk bewezen aanpak uw organisatie kan helpen 
              met lagere verzuimcijfers en gelukkigere medewerkers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-brand-green hover:bg-brand-green-light text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}
              >
                Plan een Kennismaking
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-brand-blue font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-gray-dark text-white py-12">
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
                <a href="/" className="block text-gray-300 hover:text-white transition-colors">Home</a>
                <a href="/wetenschap" className="block text-gray-300 hover:text-white transition-colors">De Wetenschap</a>
                <a href="/programma" className="block text-gray-300 hover:text-white transition-colors">Programma</a>
                <a href="/contact" className="block text-gray-300 hover:text-white transition-colors">Contact</a>
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
