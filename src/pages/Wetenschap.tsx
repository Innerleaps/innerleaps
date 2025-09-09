import Navigation from '@/components/Navigation';
import StickyCtaButtons from '@/components/StickyCtaButtons';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, BarChart3, Brain, Heart, Users, Shield, TrendingUp, Award, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
const Wetenschap = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const mechanismen = [{
    icon: Shield,
    title: "65-72% minder werkstress",
    description: "Zonder dat de werkdruk wordt verminderd ervaren deelnemers minder stress. De beleving van het werk en de werkdruk wordt minder stressvol.",
    jdrTag: "Werkeisen/Stressoren",
    studies: [
      { name: "De Vibe et al. (2017)", url: "https://www.researchgate.net/publication/320809758_Mindfulness-based_stress_reduction_MBSR_for_improving_health_quality_of_life_and_social_functioning_in_adults_a_systematic_review_and_meta-analysis" },
      { name: "Bartlett et al. (2018)", url: "https://scispace.com/pdf/a-systematic-review-and-meta-analysis-of-workplace-448vdu0m18.pdf" },
      { name: "Vonderlin et al. (2020)", url: "https://link.springer.com/article/10.1007/s12671-020-01328-3" },
      { name: "Lensen et al. (2024)", url: "https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1385375/full" },
      { name: "Michaelsen et al. (2023)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/" },
      { name: "Żołnierczyk-Zreda et al. (2016)", url: "https://academic.oup.com/occmed/article-abstract/66/8/630/2750551?redirectedFrom=fulltext" }
    ],
    color: "text-brand-blue"
  }, {
    icon: Brain,
    title: "65-67% minder angst",
    description: "Deelnemers ervaren minder algemene angstgevoelens in het dagelijks leven. Ze voelen zich rustiger en minder gespannen, waardoor angst hen minder belemmert.",
    jdrTag: "Werkeisen/Stressoren",
    studies: [
      { name: "De Vibe et al. (2017)", url: "https://www.researchgate.net/publication/320809758_Mindfulness-based_stress_reduction_MBSR_for_improving_health_quality_of_life_and_social_functioning_in_adults_a_systematic_review_and_meta-analysis" },
      { name: "Bartlett et al. (2018)", url: "https://scispace.com/pdf/a-systematic-review-and-meta-analysis-of-workplace-448vdu0m18.pdf" }
    ],
    color: "text-brand-green"
  }, {
    icon: Target,
    title: "64-77% meer veerkracht en weerbaarheid",
    description: "Deelnemers ontwikkelen mentale spierkracht om uitdagingen het hoofd te bieden. Ze herstellen sneller van tegenslagen en blijven effectief functioneren onder druk.",
    jdrTag: "Persoonlijke Hulpbronnen",
    studies: [
      { name: "Michaelsen et al. (2023)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/" },
      { name: "Vonderlin et al. (2020)", url: "https://link.springer.com/article/10.1007/s12671-020-01328-3" },
      { name: "Dou et al. (2024)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12210539/" }
    ],
    color: "text-brand-blue"
  }, {
    icon: Brain,
    title: "62-74% meer mindfulness",
    description: "Deelnemers worden bewuster van hun gedachten, emoties en lichaamssignalen. Ze leven meer in het moment en reageren minder automatisch op situaties.",
    jdrTag: "Persoonlijke Hulpbronnen",
    studies: [
      { name: "De Vibe et al. (2017)", url: "https://www.researchgate.net/publication/320809758_Mindfulness-based_stress_reduction_MBSR_for_improving_health_quality_of_life_and_social_functioning_in_adults_a_systematic_review_and_meta-analysis" },
      { name: "Vonderlin et al. (2020)", url: "https://link.springer.com/article/10.1007/s12671-020-01328-3" },
      { name: "Bartlett et al. (2018)", url: "https://scispace.com/pdf/a-systematic-review-and-meta-analysis-of-workplace-448vdu0m18.pdf" },
      { name: "Lensen et al. (2024)", url: "https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1385375/full" },
      { name: "Michaelsen et al. (2023)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/" }
    ],
    color: "text-brand-green"
  }, {
    icon: TrendingUp,
    title: "71-79% meer self-efficacy",
    description: "Het vertrouwen in eigen kunnen groeit significant. Deelnemers pakken uitdagingen proactief aan in plaats van ze te vermijden of uit te stellen.",
    jdrTag: "Persoonlijke Hulpbronnen",
    studies: [
      { name: "Lensen et al. (2024)", url: "https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1385375/full" },
      { name: "Żołnierczyk-Zreda et al. (2016)", url: "https://academic.oup.com/occmed/article-abstract/66/8/630/2750551?redirectedFrom=fulltext" }
    ],
    color: "text-brand-blue"
  }, {
    icon: Heart,
    title: "70% betere emotieregulatie",
    description: "Sterke emoties zoals frustratie of boosheid krijgen minder grip. Deelnemers reageren rustiger in moeilijke situaties en maken bewustere keuzes.",
    jdrTag: "Persoonlijke Hulpbronnen",
    studies: [
      { name: "Lensen et al. (2024)", url: "https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1385375/full" }
    ],
    color: "text-brand-green"
  }, {
    icon: Heart,
    title: "68% meer zelfcompassie",
    description: "Deelnemers gaan vriendelijker om met zichzelf. Ze zijn minder zelfkritisch bij fouten en behandelen zichzelf met dezelfde compassie die ze anderen zouden tonen.",
    jdrTag: "Persoonlijke Hulpbronnen",
    studies: [
      { name: "Michaelsen et al. (2023)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/" }
    ],
    color: "text-brand-blue"
  }, {
    icon: Users,
    title: "64-67% beter werkklimaat",
    description: "Teams ervaren een positievere sfeer op de werkvloer. Samenwerking verbetert en conflicten nemen af door betere onderlinge verhoudingen.",
    jdrTag: "Werkhulpbronnen",
    studies: [
      { name: "Lensen et al. (2024)", url: "https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1385375/full" }
    ],
    color: "text-brand-green"
  }, {
    icon: Users,
    title: "67% meer compassie voor anderen",
    description: "Deelnemers tonen meer begrip en geduld voor collega's. Dit versterkt teamcohesie en creëert een ondersteunende werkomgeving.",
    jdrTag: "Werkhulpbronnen",
    studies: [
      { name: "Vonderlin et al. (2020)", url: "https://link.springer.com/article/10.1007/s12671-020-01328-3" }
    ],
    color: "text-brand-blue"
  }, {
    icon: Shield,
    title: "60-84% minder burn-out klachten",
    description: "Emotionele uitputting neemt drastisch af. Deelnemers voelen zich minder leeggelopen en behouden hun energie voor werk én privé.",
    jdrTag: "Stressreacties/Welbevinden",
    studies: [
      { name: "Vonderlin et al. (2020)", url: "https://link.springer.com/article/10.1007/s12671-020-01328-3" },
      { name: "Bartlett et al. (2018)", url: "https://scispace.com/pdf/a-systematic-review-and-meta-analysis-of-workplace-448vdu0m18.pdf" },
      { name: "Michaelsen et al. (2023)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/" },
      { name: "Dou et al. (2024)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12210539/" }
    ],
    color: "text-brand-green"
  }, {
    icon: Heart,
    title: "63% meer werktevredenheid",
    description: "Het plezier in het werk neemt toe. Taken voelen minder zwaar aan en deelnemers ervaren meer betekenis in hun dagelijkse werkzaamheden.",
    jdrTag: "Stressreacties/Welbevinden",
    studies: [
      { name: "Vonderlin et al. (2020)", url: "https://link.springer.com/article/10.1007/s12671-020-01328-3" },
      { name: "Michaelsen et al. (2023)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/" }
    ],
    color: "text-brand-blue"
  }, {
    icon: TrendingUp,
    title: "65% meer werkbetrokkenheid",
    description: "Teams worden gemotiveerder en meer betrokken bij hun werk. Ze investeren bewuster in hun taken en groeien samen naar betere prestaties.",
    jdrTag: "Stressreacties/Welbevinden",
    studies: [
      { name: "Vonderlin et al. (2020)", url: "https://link.springer.com/article/10.1007/s12671-020-01328-3" }
    ],
    color: "text-brand-green"
  }, {
    icon: Brain,
    title: "57-78% beter slapen en herstellen",
    description: "Deelnemers vallen makkelijker in slaap en slapen dieper. Dit zorgt voor beter herstel en meer energie voor de volgende dag.",
    jdrTag: "Persoonlijke Impact",
    studies: [
      { name: "Bartlett et al. (2018)", url: "https://scispace.com/pdf/a-systematic-review-and-meta-analysis-of-workplace-448vdu0m18.pdf" },
      { name: "Michaelsen et al. (2023)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/" },
      { name: "Dou et al. (2024)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12210539/" }
    ],
    color: "text-brand-blue"
  }, {
    icon: Heart,
    title: "59-68% meer welzijn en tevredenheid",
    description: "De algemene levenskwaliteit stijgt merkbaar. Deelnemers voelen zich gelukkiger en meer tevreden met hun leven als geheel.",
    jdrTag: "Persoonlijke Impact",
    studies: [
      { name: "Vonderlin et al. (2020)", url: "https://link.springer.com/article/10.1007/s12671-020-01328-3" },
      { name: "Lensen et al. (2024)", url: "https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1385375/full" },
      { name: "Bartlett et al. (2018)", url: "https://scispace.com/pdf/a-systematic-review-and-meta-analysis-of-workplace-448vdu0m18.pdf" }
    ],
    color: "text-brand-green"
  }, {
    icon: Award,
    title: "61-63% betere levenskwaliteit",
    description: "Het algehele gevoel van welbevinden en tevredenheid met het leven stijgt. Deelnemers ervaren meer vreugde en betekenis in hun dagelijkse activiteiten.",
    jdrTag: "Persoonlijke Impact",
    studies: [
      { name: "De Vibe et al. (2017)", url: "https://www.researchgate.net/publication/320809758_Mindfulness-based_stress_reduction_MBSR_for_improving_health_quality_of_life_and_social_functioning_in_adults_a_systematic_review_and_meta-analysis" },
      { name: "Vonderlin et al. (2020)", url: "https://link.springer.com/article/10.1007/s12671-020-01328-3" },
      { name: "Michaelsen et al. (2023)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/" }
    ],
    color: "text-brand-blue"
  }, {
    icon: Brain,
    title: "65-68% betere mentale gezondheid",
    description: "De psychische gesteldheid verbetert merkbaar. Deelnemers voelen zich mentaal sterker en stabieler, met minder last van negatieve gedachten.",
    jdrTag: "Persoonlijke Impact",
    studies: [
      { name: "De Vibe et al. (2017)", url: "https://www.researchgate.net/publication/320809758_Mindfulness-based_stress_reduction_MBSR_for_improving_health_quality_of_life_and_social_functioning_in_adults_a_systematic_review_and_meta-analysis" },
      { name: "Michaelsen et al. (2023)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/" }
    ],
    color: "text-brand-green"
  }, {
    icon: Heart,
    title: "63% betere fysieke gezondheid",
    description: "Het lichaam functioneert beter door minder stress. Deelnemers ervaren minder lichamelijke klachten en hebben meer energie.",
    jdrTag: "Persoonlijke Impact",
    studies: [
      { name: "Michaelsen et al. (2023)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/" }
    ],
    color: "text-brand-blue"
  }, {
    icon: BarChart3,
    title: "15-21% minder verzuim",
    description: "Concrete reductie in ziekteverzuim door betere stressbestendigheid en algemene gezondheid van het team.",
    jdrTag: "Organisatorische Impact",
    studies: [
      { name: "Żołnierczyk-Zreda et al. (2016)", url: "https://academic.oup.com/occmed/article-abstract/66/8/630/2750551?redirectedFrom=fulltext" },
      { name: "Michaelsen et al. (2023)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/" },
      { name: "Häusser et al. (2010)", url: "https://psycnet.apa.org/record/2010-06658-001" },
      { name: "Karasek & Theorell (1990)", url: "https://www.scirp.org/reference/referencespapers?referenceid=1955102" },
      { name: "Arboned (2024)", url: "https://www.arboned.nl/nieuws/griepachtige-klachten-en-stress-boosdoeners-van-verzuim-in-2024#:~:text=Stressgerelateerde%20klachten%20blijven%20stijgen&text=Kijken%20we%20naar%20het%20langdurend,opzichte%20van%20het%20jaar%20daarvoor." }
    ],
    color: "text-brand-green"
  }, {
    icon: TrendingUp,
    title: "70% lager uitvalrisico",
    description: "De kans dat medewerkers uitvallen door stress of burn-out daalt drastisch, wat zorgt voor meer stabiliteit in teams.",
    jdrTag: "Organisatorische Impact",
    studies: [
      { name: "De Bruin et al. (2018)", url: "https://dare.uva.nl/search?identifier=2ec42a08-a20f-4859-8e23-609a6030e6b6" }
    ],
    color: "text-brand-blue"
  }, {
    icon: Award,
    title: "58-60% meer productiviteit",
    description: "Teams presteren beter door verhoogde focus, minder stress en betere samenwerking.",
    jdrTag: "Organisatorische Impact",
    studies: [
      { name: "Vonderlin et al. (2020)", url: "https://link.springer.com/article/10.1007/s12671-020-01328-3" },
      { name: "Michaelsen et al. (2023)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/" }
    ],
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
            
            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed mb-8 text-center">
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
                  <h4 className="font-semibold text-brand-gray-dark mb-2">Honderden onderzoeken</h4>
                  <p className="text-brand-gray-medium">Meer dan 100 peer-reviewed onderzoeken gepubliceerd naar de effectiviteit van MBSR</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-dark text-center mb-12">Hoe ons burn-out preventie programma verzuim beïnvloedt</h2>
          
          <p className="text-xl md:text-2xl text-brand-gray-medium text-center max-w-4xl mx-auto mb-16 leading-relaxed">Het Life+ programma werkt tegelijk op de twee fronten van het JD-R model: het vermindert uitputting door stress en stressoren aan te pakken, én het stimuleert motivatie door persoonlijke en werkhulpbronnen te versterken. Deze dubbele aanpak verklaart waarom de organisatorische resultaten zo significant zijn: 15-21% minder verzuim en 70% lager uitvalrisico.</p>

          <div className="grid lg:grid-cols-2 gap-8">
            {mechanismen.map((mechanisme, index) => {
            const IconComponent = mechanisme.icon;
            return <div key={index} className="bg-white rounded-xl p-6 shadow-lg relative">
                  {/* JD-R Tag in top-right corner */}
                  <div className="absolute top-4 right-4">
                    <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium bg-brand-gray-light ${mechanisme.color}`}>
                      {mechanisme.jdrTag}
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-4 pr-16">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-gray-light ${mechanisme.color} mr-4 flex-shrink-0`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-brand-gray-dark leading-tight">
                      {mechanisme.title}
                    </h3>
                  </div>
                  
                  <p className="text-brand-gray-medium mb-4 leading-relaxed">
                    {mechanisme.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {mechanisme.studies.map((study, studyIndex) => 
                      <a key={studyIndex} href={study.url} target="_blank" rel="noopener noreferrer" className="inline-block bg-brand-gray-light text-brand-gray-dark text-xs px-3 py-1 rounded-full hover:bg-brand-blue hover:text-white transition-colors duration-200">
                        {study.name}
                      </a>
                    )}
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