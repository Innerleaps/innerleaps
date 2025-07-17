import Navigation from '@/components/Navigation';
import StickyCtaButtons from '@/components/StickyCtaButtons';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, BarChart3, Brain, Heart, Users, Shield, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
const Wetenschap = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const mechanismen = [{
    icon: Shield,
    title: "Burnout Reductie",
    percentage: "20-35%",
    description: "67% van alle MBSR-studies toonden significante verbetering in burnout-indicatoren. Emotionele uitputting verbeterde in 50% van alle studies.",
    studies: ["Shoker et al. (2024)"],
    color: "text-brand-blue"
  }, {
    icon: Heart,
    title: "Werkplezier en Tevredenheid",
    percentage: "10-20%",
    description: "Meta-analyses tonen dat MBSR werktevredenheid verbetert met 11% volgens robuuste onderzoeksresultaten.",
    studies: ["Vonderlin et al. (2020)"],
    color: "text-brand-green"
  }, {
    icon: Users,
    title: "Vertrekintentie Reductie",
    percentage: "10-20%",
    description: "Werknemers met hogere mindfulness scores waren 15% minder geneigd om te vertrekken door verminderde emotionele uitputting.",
    studies: ["Dane & Brummel (2014)", "Reb et al. (2017)"],
    color: "text-brand-blue"
  }, {
    icon: Brain,
    title: "Werk-Privé Balans",
    percentage: "15-25%",
    description: "MBSR helpt medewerkers een betere balans te vinden tussen werk en privéleven. Effecten blijven tot 3 maanden bestaan.",
    studies: ["Michaelsen et al. (2023)"],
    color: "text-brand-green"
  }, {
    icon: TrendingUp,
    title: "Werkbetrokkenheid Verbetering",
    percentage: "15-25%",
    description: "Fortune 100 studie toonde dat 20 van de 27 gemeten werkcompetenties significant verbeterden, vooral besluitvaardigheid en creativiteit.",
    studies: ["Nadler et al. (2020)"],
    color: "text-brand-blue"
  }, {
    icon: Shield,
    title: "Werkstress Reductie",
    percentage: "19-25%",
    description: "Meta-analyse van 23 workplace studies toont stressreductie van 19%, terwijl analyse van 56 studies een effect van 25% vond.",
    studies: ["Bartlett et al. (2019)", "Vonderlin et al. (2020)"],
    color: "text-brand-green"
  }, {
    icon: Brain,
    title: "Angst en Depressie Reductie",
    percentage: "15-25%",
    description: "Consistente effecten op angst- en depressiesymptomen. Angstreductie van 23% en verbetering van 12% in algemene psychologische stress.",
    studies: ["Bartlett et al. (2019)", "Galante et al. (2023)"],
    color: "text-brand-blue"
  }, {
    icon: Award,
    title: "Veerkracht Verbetering",
    percentage: "20-30%",
    description: "Verbetering van 14% in veerkracht, met complexere interventies tot 30%. Dow Chemical studie toonde significante veerkrachtverbetering bij 90 medewerkers.",
    studies: ["Vonderlin et al. (2020)", "Aikens et al. (2014)"],
    color: "text-brand-green"
  }];
  return <div className="min-h-screen bg-brand-gray-light">
      <Navigation />
      <StickyCtaButtons />
      
      {/* Hero Section */}
      <section className="bg-brand-gray-light section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            
            {/* 40+ Years Badge */}
            <div className="inline-flex items-center bg-brand-blue text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Award className="h-4 w-4 mr-2" />
              40+ jaar wetenschappelijk onderzoek
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark mb-6">
              De Wetenschap Achter Halt.academy
            </h1>
            
            <p className="text-xl text-brand-gray-medium leading-relaxed mb-8">
              Ons programma is gebaseerd op <strong>meer dan 40 jaar wetenschappelijk onderzoek</strong> naar Mindfulness-Based Stress Reduction (MBSR), ontwikkeld door Jon Kabat-Zinn in 1979. Wetenschappelijk erkende studies tonen consistent aan dat investeren in de mentale veerkracht van medewerkers leidt tot aantoonbare verbeteringen in bedrijfsresultaten, met name op het gebied van verzuim en retentie.
            </p>

            {/* Research Heritage Section */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <h3 className="text-2xl font-semibold text-brand-gray-dark mb-4 flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-brand-blue" />
                Wetenschappelijke Erfenis
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-brand-gray-dark mb-2">1979 - Oorsprong</h4>
                  <p className="text-brand-gray-medium">Jon Kabat-Zinn ontwikkelt MBSR aan de University of Massachusetts Medical School</p>
                </div>
                <div>
                  <h4 className="font-semibold text-brand-gray-dark mb-2">2000+ Studies</h4>
                  <p className="text-brand-gray-medium">Meer dan 2000 peer-reviewed onderzoeken naar de effectiviteit van MBSR</p>
                </div>
                <div>
                  <h4 className="font-semibold text-brand-gray-dark mb-2">40+ Landen</h4>
                  <p className="text-brand-gray-medium">MBSR wordt wereldwijd toegepast in ziekenhuizen, universiteiten en bedrijven</p>
                </div>
                <div>
                  <h4 className="font-semibold text-brand-gray-dark mb-2">Evidence-Based</h4>
                  <p className="text-brand-gray-medium">Gevalideerd door neurowetenschappelijk en klinisch onderzoek</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Underlying Mechanisms */}
      <section className="bg-brand-gray-light section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-dark text-center mb-12">Onderliggende mechanismen: hoe onze cursus in stressmanagement verzuim en retentie beïnvloedt</h2>
          
          <p className="text-xl text-brand-gray-medium text-center max-w-4xl mx-auto mb-16">
            De directe effecten op verzuim en retentie worden gedreven door de bewezen impact van MBSR op diverse onderliggende psychologische en fysiologische factoren die cruciaal zijn voor medewerkerwelzijn en prestaties:
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {mechanismen.map((mechanisme, index) => {
            const IconComponent = mechanisme.icon;
            return <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-start mb-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-gray-light ${mechanisme.color} mr-4 flex-shrink-0`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-brand-gray-dark">
                          {mechanisme.title}
                        </h3>
                        <div className={`text-2xl font-bold ${mechanisme.color} ml-4`}>
                          {mechanisme.percentage}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-brand-gray-medium mb-4 leading-relaxed">
                    {mechanisme.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {mechanisme.studies.map((study, studyIndex) => <span key={studyIndex} className="inline-block bg-brand-gray-light text-brand-gray-dark text-xs px-3 py-1 rounded-full">
                        {study}
                      </span>)}
                  </div>
                </div>;
          })}
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-dark mb-8">
              207% ROI: De Wetenschappelijke Basis
            </h2>
            
            <div className="prose prose-lg text-brand-gray-medium mb-12">
              <p className="text-xl leading-relaxed mb-8">
                De wetenschap is eenduidig: een gestructureerd programma zoals het onze, gebaseerd op bewezen stressreductietechnieken, heeft een aantoonbare positieve impact op de kernfactoren die verzuim en verloop veroorzaken.
              </p>
              
              <div className="bg-brand-blue text-white rounded-xl p-8 text-center">
                <div className="text-5xl font-bold mb-4">207%</div>
                <div className="text-2xl font-semibold mb-4">HALT ROI per groep van 15 deelnemers</div>
                <p className="text-lg leading-relaxed">
                  Op basis van Nederlandse sectorale data hebben we een conservatieve ROI-berekening gemaakt voor MBSR stressmanagement cursus-training. <strong>Voor elke euro geïnvesteerd in HALT's MBSR stressmanagement cursus krijgt u €2,07 terug in het eerste jaar.</strong>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Button className="text-lg px-8 py-3 bg-brand-blue hover:bg-brand-blue text-white hover:text-white font-semibold rounded-lg transition-all duration-300 shadow-lg transform hover:-translate-y-0.5" onClick={() => window.scrollTo({
              top: 0,
              behavior: 'smooth'
            })}>
                Bereken uw besparing
              </Button>
              <div>
                <Button variant="outline" className="text-lg px-8 py-3 bg-white hover:bg-white border-2 border-brand-blue text-brand-blue hover:text-brand-blue font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5" onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}>
                  Vrijblijvend gesprek plannen
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">Halt.academy</div>
              <p className="text-gray-300 leading-relaxed">
                MBSR-gebaseerde stressreductieprogramma's voor meetbare bedrijfsresultaten. Gebaseerd op het baanbrekende werk van Jon Kabat-Zinn.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p>Email: bas@haltacademy.nl</p>
                <p>Telefoon: 06 23 45 34 77</p>
                <div className="mt-4 flex justify-start">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/lovable-uploads/eaa7a159-2f85-4fa3-b487-4855426f2c14.png" alt="Bas Ter Haar Romenij" />
                    <AvatarFallback className="text-white text-xl font-bold bg-brand-blue">BtH</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Snel naar</h3>
              <div className="space-y-2">
                <button onClick={() => window.location.href = '/'} className="block text-gray-300 hover:text-white transition-colors text-left">Home</button>
                <button onClick={() => window.location.href = '/wetenschap'} className="block text-gray-300 hover:text-white transition-colors text-left">De Wetenschap</button>
                <button onClick={() => window.location.href = '/programma'} className="block text-gray-300 hover:text-white transition-colors text-left">Programma</button>
                <button onClick={() => window.location.href = '/contact'} className="block text-gray-300 hover:text-white transition-colors text-left">Contact</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Halt.academy. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Wetenschap;