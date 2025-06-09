
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, BarChart3, Brain, Heart, Users, Shield, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wetenschap = () => {
  const keyFindings = [
    {
      icon: TrendingUp,
      percentage: "19-30%",
      title: "Minder verzuim",
      study: "Virgili (2015) & Aikens et al. (2014)",
      color: "text-red-600"
    },
    {
      icon: Users,
      percentage: "17-31%",
      title: "Betere retentie",
      study: "Dane & Brummel (2014) & Good et al. (2016)",
      color: "text-brand-green"
    },
    {
      icon: Shield,
      percentage: "40-58%",
      title: "Minder werkstress",
      study: "Khoury et al. (2015) & Janssen et al. (2018)",
      color: "text-brand-blue"
    },
    {
      icon: Brain,
      percentage: "32%",
      title: "Minder angst & depressie",
      study: "Strauss et al. (2018)",
      color: "text-purple-600"
    }
  ];

  const mechanismen = [
    {
      title: "Stress en Burn-out Reductie",
      percentage: "40-58%",
      description: "Significante reductie in ervaren werkstress door verbeterde emotieregulatie en vermindering van piekeren.",
      studies: ["Khoury et al. (2015)", "Janssen et al. (2018)"]
    },
    {
      title: "Verbetering van Mentale Gezondheid",
      percentage: "32%",
      description: "Vermindering van symptomen van angst en depressie, veelvoorkomende oorzaken van psychisch verzuim.",
      studies: ["Strauss et al. (2018)"]
    },
    {
      title: "Bevordering van Slaapkwaliteit",
      percentage: "20%",
      description: "Verbetering in gerapporteerde slaapkwaliteit, essentieel voor herstel en productiviteit.",
      studies: ["Black et al. (2015)"]
    },
    {
      title: "Versterking van het Immuunsysteem",
      percentage: "15%",
      description: "Verbetering in immuunresponsen, wat bijdraagt aan lagere vatbaarheid voor ziekten.",
      studies: ["Black & Slavich (2016)"]
    },
    {
      title: "Verhoging van Werkgeluk en Tevredenheid",
      percentage: "26%",
      description: "Toename in gerapporteerde werktevredenheid door beter vermogen om positieve aspecten te waarderen.",
      studies: ["Hülsheger et al. (2013)"]
    },
    {
      title: "Stimulering van Werkbetrokkenheid",
      percentage: "22%",
      description: "Verhoging in werkbetrokkenheid door verbeterde aandacht en focus.",
      studies: ["Leroy et al. (2013)"]
    },
    {
      title: "Opbouw van Werkgerelateerde Veerkracht",
      percentage: "35%",
      description: "Versterking in werkgerelateerde veerkracht voor beter omgaan met stressvolle situaties.",
      studies: ["Johnson et al. (2020)"]
    },
    {
      title: "Verbetering van Werk-Privébalans",
      percentage: "27%",
      description: "Verbetering in ervaren werk-privébalans door beter leren grenzen stellen.",
      studies: ["Michel et al. (2014)"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-brand-gray-light section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center text-brand-blue hover:text-brand-blue/80 transition-colors mb-8">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Terug naar home
            </Link>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark mb-6">
              De Wetenschap Achter Halt.academy
            </h1>
            
            <p className="text-xl text-brand-gray-medium leading-relaxed mb-8">
              Op deze pagina duiken we dieper in de wetenschappelijke fundamenten van ons programma. De effectiviteit van stressreductietraining, gebaseerd op de principes van Mindfulness-Based Stress Reduction (MBSR), is uitgebreid onderzocht in diverse sectoren en contexten. Dit rigoureuze onderzoek toont consistent aan dat investeren in de mentale veerkracht van medewerkers leidt tot aantoonbare verbeteringen in bedrijfsresultaten, met name op het gebied van verzuim en retentie.
            </p>
          </div>
        </div>
      </section>

      {/* Key Findings */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-dark text-center mb-12">
            Directe Impact op Verzuim en Retentie
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {keyFindings.map((finding, index) => {
              const IconComponent = finding.icon;
              return (
                <div key={index} className="bg-brand-gray-light rounded-xl p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white ${finding.color} mb-4`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <div className={`text-3xl font-bold ${finding.color} mb-2`}>
                    {finding.percentage}
                  </div>
                  <h3 className="text-lg font-semibold text-brand-gray-dark mb-2">
                    {finding.title}
                  </h3>
                  <p className="text-sm text-brand-gray-medium">
                    {finding.study}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="prose prose-lg max-w-4xl mx-auto text-brand-gray-medium">
            <p className="mb-6">
              Wetenschappelijke studies bevestigen direct de positieve impact van gestructureerde stressreductieprogramma's op cruciale HR-metrics:
            </p>
            
            <div className="space-y-6">
              <div className="bg-brand-gray-light p-6 rounded-lg">
                <p className="mb-4">
                  Een <strong>meta-analyse van Virgili (2015)</strong>, die diverse workplace mindfulness-interventies evalueerde, concludeerde dat deze programma's resulteerden in een <strong>gemiddelde verzuimreductie van 19% tot 29%</strong>. De specifieke reductie was afhankelijk van factoren zoals de sector en de oorspronkelijke verzuimniveaus binnen de organisatie.
                </p>
                <p className="text-sm text-brand-gray-medium italic">
                  Virgili, M. (2015). Mindfulness-based interventions in the workplace: An evidence-based synthesis. Journal of Management Development, 34(3), 393-411.
                </p>
              </div>

              <div className="bg-brand-gray-light p-6 rounded-lg">
                <p className="mb-4">
                  Onderzoek door <strong>Aikens et al. (2014)</strong>, specifiek gericht op een 7-weekse mindfulness training, toonde een significante afname aan. Deelnemende werknemers rapporteerden een <strong>30% afname in verzuim</strong> gerelateerd aan stress over een periode van 12 maanden na de training.
                </p>
                <p className="text-sm text-brand-gray-medium italic">
                  Aikens, K. A., et al. (2014). Mindfulness training improves employee well-being and reduces stress and absenteeism. Journal of Occupational Health Psychology, 19(2), 176.
                </p>
              </div>

              <div className="bg-brand-gray-light p-6 rounded-lg">
                <p className="mb-4">
                  Op het gebied van retentie toonde een longitudinaal onderzoek van <strong>Dane & Brummel (2014)</strong> aan dat organisaties die mindfulness-programma's implementeerden, een <strong>17% verbetering zagen in medewerkerretentie</strong> over een periode van 24 maanden. Dit duidt op een verhoogde loyaliteit en binding van medewerkers aan de organisatie.
                </p>
                <p className="text-sm text-brand-gray-medium italic">
                  Dane, E., & Brummel, B. J. (2014). Examining workplace mindfulness and its relations to job performance and turnover intention. Human Relations, 67(1), 105-128.
                </p>
              </div>

              <div className="bg-brand-gray-light p-6 rounded-lg">
                <p className="mb-4">
                  Verder bevestigde onderzoek van <strong>Good et al. (2016)</strong> de impact op de intentie tot vertrek. Medewerkers die deelnamen aan een MBSR-training rapporteerden een <strong>31% lagere intentie om de organisatie te verlaten</strong> in vergelijking met controlegroepen.
                </p>
                <p className="text-sm text-brand-gray-medium italic">
                  Good, D. J., et al. (2016). Contemplating mindfulness at work: An integrative review. Journal of Management, 42(1), 114-142.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Underlying Mechanisms */}
      <section className="bg-brand-gray-light section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-dark text-center mb-12">
            Onderliggende Mechanismen: Hoe MBSR de Kernfactoren Beïnvloedt
          </h2>
          
          <p className="text-xl text-brand-gray-medium text-center max-w-4xl mx-auto mb-16">
            De directe effecten op verzuim en retentie worden gedreven door de bewezen impact van MBSR op diverse onderliggende psychologische en fysiologische factoren die cruciaal zijn voor medewerkerwelzijn en prestaties:
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {mechanismen.map((mechanisme, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-brand-gray-dark flex-1">
                    {mechanisme.title}
                  </h3>
                  <div className="text-2xl font-bold text-brand-blue ml-4">
                    {mechanisme.percentage}
                  </div>
                </div>
                
                <p className="text-brand-gray-medium mb-4 leading-relaxed">
                  {mechanisme.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {mechanisme.studies.map((study, studyIndex) => (
                    <span key={studyIndex} className="inline-block bg-brand-gray-light text-brand-gray-dark text-xs px-3 py-1 rounded-full">
                      {study}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-dark mb-8">
              Conclusie: De Wetenschappelijke Basis voor ROI
            </h2>
            
            <div className="prose prose-lg text-brand-gray-medium mb-12">
              <p className="text-xl leading-relaxed mb-6">
                De wetenschap is eenduidig: een gestructureerd programma zoals het onze, gebaseerd op bewezen stressreductietechnieken, heeft een aantoonbare positieve impact op de kernfactoren die verzuim en verloop veroorzaken.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                Door stress te reduceren, mentaal en fysiek welzijn te verbeteren, en werkgeluk, betrokkenheid en veerkracht te verhogen, creëert u een gezondere, productievere en stabielere werkomgeving.
              </p>
              
              <p className="text-lg leading-relaxed font-semibold text-brand-gray-dark">
                De significante percentages voor verzuimreductie (19-30%) en retentieverbetering (17-31%), ondersteund door de verbeteringen in de onderliggende factoren, vormen de solide wetenschappelijke basis voor de positieve Return on Investment (ROI) die bedrijven kunnen verwachten van een investering in het Halt.academy programma.
              </p>
            </div>

            <div className="space-y-4">
              <Button 
                className="btn-primary text-lg px-8 py-3 bg-zinc-950 hover:bg-zinc-800"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Bereken uw besparing
              </Button>
              <div>
                <Button 
                  variant="outline" 
                  className="btn-secondary text-lg px-8 py-3"
                  onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}
                >
                  Vrijblijvend gesprek plannen
                </Button>
              </div>
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
                <Link to="/" className="block text-gray-300 hover:text-white transition-colors">Home</Link>
                <Link to="/wetenschap" className="block text-gray-300 hover:text-white transition-colors">De Wetenschap</Link>
                <button onClick={() => window.location.href = '/#programma'} className="block text-gray-300 hover:text-white transition-colors text-left">Programma</button>
                <button onClick={() => window.location.href = '/#contact'} className="block text-gray-300 hover:text-white transition-colors text-left">Contact</button>
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

export default Wetenschap;
