import SimplifiedNavigation from '@/components/SimplifiedNavigation';
import StickyCtaButtons from '@/components/StickyCtaButtons';
import LeadMagnetModal from '@/components/LeadMagnetModal';
import ROICalculator from '@/components/ROICalculator';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, BarChart3, Brain, Heart, Users, Shield, TrendingUp, Award, Target, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
const Wetenschap = () => {
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const getJdrTooltipContent = (tag: string) => {
    const tooltips: Record<string, string> = {
      "Werkeisen/Stressoren": "Het binnen HR populaire JD-R model identificeert Werkeisen/Stressoren als aspecten die inspanning kosten (werkdruk, emotionele belasting, ervaring van het werk). Volgens het JD-R model zal het reduceren van Werkeisen/Stressoren leiden tot minder uitputting, lagere burnout en uiteindelijk minder verzuim en uitval.",
      "Persoonlijke Hulpbronnen": "Het binnen HR populaire JD-R model definieert Persoonlijke Hulpbronnen als individuele capaciteiten (veerkracht, self-efficacy, emotieregulatie). Volgens het JD-R model zal het versterken van deze hulpbronnen leiden tot hogere motivatie, betere prestaties en uiteindelijk minder verzuim en uitval.",
      "Stressreacties/Welbevinden": "Het binnen HR populaire JD-R model toont dat Stressreacties/Welbevinden de directe uitkomsten zijn van de balans tussen werkeisen en hulpbronnen. Volgens het JD-R model leiden verbeterde stressreacties en hoger welbevinden rechtstreeks tot betere organisatorische resultaten.",
      "Persoonlijke Impact": "Het binnen HR populaire JD-R model erkent dat Persoonlijke Impact (gezondheid, slaap, levenskwaliteit) de werksituatie beïnvloedt. Volgens het JD-R model leiden verbeteringen in het persoonlijke leven tot betere werkprestaties en lagere organisatorische kosten.",
      "Organisatorische Impact": "Het binnen HR populaire JD-R model voorspelt dat verbeterde hulpbronnen en verminderde stress doorwerken in Organisatorische Impact. Volgens het JD-R model resulteren interventies in meetbare bedrijfsvoordelen zoals verzuimreductie en lagere uitvalkosten.",
      "Werkhulpbronnen": "Het binnen HR populaire JD-R model definieert Werkhulpbronnen als aspecten van het werk die helpen doelen te bereiken, werkstress te verminderen of persoonlijke groei te stimuleren (sociale steun, autonomie, feedback). Volgens het JD-R model leiden meer werkhulpbronnen tot hogere motivatie en betere prestaties."
    };
    return tooltips[tag] || "";
  };
  const mechanismen = [{
    icon: Shield,
    title: "65-72% minder werkstress",
    description: "Zonder dat de werkdruk wordt verminderd ervaren deelnemers minder stress. De beleving van het werk en de werkdruk wordt minder stressvol.",
    jdrTag: "Werkeisen/Stressoren",
    studies: [{
      name: "De Vibe et al. (2017)",
      url: "https://www.researchgate.net/publication/320809758_Mindfulness-based_stress_reduction_MBSR_for_improving_health_quality_of_life_and_social_functioning_in_adults_a_systematic_review_and_meta-analysis"
    }, {
      name: "Bartlett et al. (2018)",
      url: "https://scispace.com/pdf/a-systematic-review-and-meta-analysis-of-workplace-448vdu0m18.pdf"
    }, {
      name: "Vonderlin et al. (2020)",
      url: "https://link.springer.com/article/10.1007/s12671-020-01328-3"
    }, {
      name: "Lensen et al. (2024)",
      url: "https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1385375/full"
    }, {
      name: "Michaelsen et al. (2023)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/"
    }, {
      name: "Żołnierczyk-Zreda et al. (2016)",
      url: "https://academic.oup.com/occmed/article-abstract/66/8/630/2750551?redirectedFrom=fulltext"
    }],
    color: "text-brand-blue"
  }, {
    icon: Brain,
    title: "65-67% minder angst",
    description: "Deelnemers ervaren minder algemene angstgevoelens in het dagelijks leven. Ze voelen zich rustiger en minder gespannen, waardoor angst hen minder belemmert.",
    jdrTag: "Werkeisen/Stressoren",
    studies: [{
      name: "De Vibe et al. (2017)",
      url: "https://www.researchgate.net/publication/320809758_Mindfulness-based_stress_reduction_MBSR_for_improving_health_quality_of_life_and_social_functioning_in_adults_a_systematic_review_and_meta-analysis"
    }, {
      name: "Bartlett et al. (2018)",
      url: "https://scispace.com/pdf/a-systematic-review-and-meta-analysis-of-workplace-448vdu0m18.pdf"
    }],
    color: "text-brand-green"
  }, {
    icon: Target,
    title: "64-77% meer veerkracht en weerbaarheid",
    description: "Deelnemers ontwikkelen mentale spierkracht om uitdagingen het hoofd te bieden. Ze herstellen sneller van tegenslagen en blijven effectief functioneren onder druk.",
    jdrTag: "Persoonlijke Hulpbronnen",
    studies: [{
      name: "Michaelsen et al. (2023)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/"
    }, {
      name: "Vonderlin et al. (2020)",
      url: "https://link.springer.com/article/10.1007/s12671-020-01328-3"
    }, {
      name: "Dou et al. (2024)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12210539/"
    }],
    color: "text-brand-blue"
  }, {
    icon: Brain,
    title: "62-74% meer mindfulness",
    description: "Deelnemers worden bewuster van hun gedachten, emoties en lichaamssignalen. Ze leven meer in het moment en reageren minder automatisch op situaties.",
    jdrTag: "Persoonlijke Hulpbronnen",
    studies: [{
      name: "De Vibe et al. (2017)",
      url: "https://www.researchgate.net/publication/320809758_Mindfulness-based_stress_reduction_MBSR_for_improving_health_quality_of_life_and_social_functioning_in_adults_a_systematic_review_and_meta-analysis"
    }, {
      name: "Vonderlin et al. (2020)",
      url: "https://link.springer.com/article/10.1007/s12671-020-01328-3"
    }, {
      name: "Bartlett et al. (2018)",
      url: "https://scispace.com/pdf/a-systematic-review-and-meta-analysis-of-workplace-448vdu0m18.pdf"
    }, {
      name: "Lensen et al. (2024)",
      url: "https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1385375/full"
    }, {
      name: "Michaelsen et al. (2023)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/"
    }],
    color: "text-brand-green"
  }, {
    icon: TrendingUp,
    title: "71-79% meer self-efficacy",
    description: "Het vertrouwen in eigen kunnen groeit significant. Deelnemers pakken uitdagingen proactief aan in plaats van ze te vermijden of uit te stellen.",
    jdrTag: "Persoonlijke Hulpbronnen",
    studies: [{
      name: "Lensen et al. (2024)",
      url: "https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1385375/full"
    }, {
      name: "Żołnierczyk-Zreda et al. (2016)",
      url: "https://academic.oup.com/occmed/article-abstract/66/8/630/2750551?redirectedFrom=fulltext"
    }],
    color: "text-brand-blue"
  }, {
    icon: Heart,
    title: "70% betere emotieregulatie",
    description: "Sterke emoties zoals frustratie of boosheid krijgen minder grip. Deelnemers reageren rustiger in moeilijke situaties en maken bewustere keuzes.",
    jdrTag: "Persoonlijke Hulpbronnen",
    studies: [{
      name: "Lensen et al. (2024)",
      url: "https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1385375/full"
    }],
    color: "text-brand-green"
  }, {
    icon: Heart,
    title: "68% meer zelfcompassie",
    description: "Deelnemers gaan vriendelijker om met zichzelf. Ze zijn minder zelfkritisch bij fouten en behandelen zichzelf met dezelfde compassie die ze anderen zouden tonen.",
    jdrTag: "Persoonlijke Hulpbronnen",
    studies: [{
      name: "Michaelsen et al. (2023)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/"
    }],
    color: "text-brand-blue"
  }, {
    icon: Users,
    title: "64-67% beter werkklimaat",
    description: "Teams ervaren een positievere sfeer op de werkvloer. Samenwerking verbetert en conflicten nemen af door betere onderlinge verhoudingen.",
    jdrTag: "Werkhulpbronnen",
    studies: [{
      name: "Lensen et al. (2024)",
      url: "https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1385375/full"
    }],
    color: "text-brand-green"
  }, {
    icon: Users,
    title: "67% meer compassie voor anderen",
    description: "Deelnemers tonen meer begrip en geduld voor collega's. Dit versterkt teamcohesie en creëert een ondersteunende werkomgeving.",
    jdrTag: "Werkhulpbronnen",
    studies: [{
      name: "Vonderlin et al. (2020)",
      url: "https://link.springer.com/article/10.1007/s12671-020-01328-3"
    }],
    color: "text-brand-blue"
  }, {
    icon: Shield,
    title: "60-84% minder burn-out klachten",
    description: "Emotionele uitputting neemt drastisch af. Deelnemers voelen zich minder leeggelopen en behouden hun energie voor werk én privé.",
    jdrTag: "Stressreacties/Welbevinden",
    studies: [{
      name: "Vonderlin et al. (2020)",
      url: "https://link.springer.com/article/10.1007/s12671-020-01328-3"
    }, {
      name: "Bartlett et al. (2018)",
      url: "https://scispace.com/pdf/a-systematic-review-and-meta-analysis-of-workplace-448vdu0m18.pdf"
    }, {
      name: "Michaelsen et al. (2023)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/"
    }, {
      name: "Dou et al. (2024)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12210539/"
    }],
    color: "text-brand-green"
  }, {
    icon: Heart,
    title: "63% meer werktevredenheid",
    description: "Het plezier in het werk neemt toe. Taken voelen minder zwaar aan en deelnemers ervaren meer betekenis in hun dagelijkse werkzaamheden.",
    jdrTag: "Stressreacties/Welbevinden",
    studies: [{
      name: "Vonderlin et al. (2020)",
      url: "https://link.springer.com/article/10.1007/s12671-020-01328-3"
    }, {
      name: "Michaelsen et al. (2023)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/"
    }],
    color: "text-brand-blue"
  }, {
    icon: TrendingUp,
    title: "65% meer werkbetrokkenheid",
    description: "Teams worden gemotiveerder en meer betrokken bij hun werk. Ze investeren bewuster in hun taken en groeien samen naar betere prestaties.",
    jdrTag: "Stressreacties/Welbevinden",
    studies: [{
      name: "Vonderlin et al. (2020)",
      url: "https://link.springer.com/article/10.1007/s12671-020-01328-3"
    }],
    color: "text-brand-green"
  }, {
    icon: Brain,
    title: "57-78% beter slapen en herstellen",
    description: "Deelnemers vallen makkelijker in slaap en slapen dieper. Dit zorgt voor beter herstel en meer energie voor de volgende dag.",
    jdrTag: "Persoonlijke Impact",
    studies: [{
      name: "Bartlett et al. (2018)",
      url: "https://scispace.com/pdf/a-systematic-review-and-meta-analysis-of-workplace-448vdu0m18.pdf"
    }, {
      name: "Michaelsen et al. (2023)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/"
    }, {
      name: "Dou et al. (2024)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12210539/"
    }],
    color: "text-brand-blue"
  }, {
    icon: Heart,
    title: "59-68% meer welzijn en tevredenheid",
    description: "De algemene levenskwaliteit stijgt merkbaar. Deelnemers voelen zich gelukkiger en meer tevreden met hun leven als geheel.",
    jdrTag: "Persoonlijke Impact",
    studies: [{
      name: "Vonderlin et al. (2020)",
      url: "https://link.springer.com/article/10.1007/s12671-020-01328-3"
    }, {
      name: "Lensen et al. (2024)",
      url: "https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1385375/full"
    }, {
      name: "Bartlett et al. (2018)",
      url: "https://scispace.com/pdf/a-systematic-review-and-meta-analysis-of-workplace-448vdu0m18.pdf"
    }],
    color: "text-brand-green"
  }, {
    icon: Award,
    title: "61-63% betere levenskwaliteit",
    description: "Het algehele gevoel van welbevinden en tevredenheid met het leven stijgt. Deelnemers ervaren meer vreugde en betekenis in hun dagelijkse activiteiten.",
    jdrTag: "Persoonlijke Impact",
    studies: [{
      name: "De Vibe et al. (2017)",
      url: "https://www.researchgate.net/publication/320809758_Mindfulness-based_stress_reduction_MBSR_for_improving_health_quality_of_life_and_social_functioning_in_adults_a_systematic_review_and_meta-analysis"
    }, {
      name: "Vonderlin et al. (2020)",
      url: "https://link.springer.com/article/10.1007/s12671-020-01328-3"
    }, {
      name: "Michaelsen et al. (2023)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/"
    }],
    color: "text-brand-blue"
  }, {
    icon: Brain,
    title: "65-68% betere mentale gezondheid",
    description: "De psychische gesteldheid verbetert merkbaar. Deelnemers voelen zich mentaal sterker en stabieler, met minder last van negatieve gedachten.",
    jdrTag: "Persoonlijke Impact",
    studies: [{
      name: "De Vibe et al. (2017)",
      url: "https://www.researchgate.net/publication/320809758_Mindfulness-based_stress_reduction_MBSR_for_improving_health_quality_of_life_and_social_functioning_in_adults_a_systematic_review_and_meta-analysis"
    }, {
      name: "Michaelsen et al. (2023)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/"
    }],
    color: "text-brand-green"
  }, {
    icon: Heart,
    title: "63% betere fysieke gezondheid",
    description: "Het lichaam functioneert beter door minder stress. Deelnemers ervaren minder lichamelijke klachten en hebben meer energie.",
    jdrTag: "Persoonlijke Impact",
    studies: [{
      name: "Michaelsen et al. (2023)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/"
    }],
    color: "text-brand-blue"
  }, {
    icon: BarChart3,
    title: "15-21% minder verzuim",
    description: "Concrete reductie in ziekteverzuim door betere stressbestendigheid en algemene gezondheid van het team.",
    jdrTag: "Organisatorische Impact",
    studies: [{
      name: "Żołnierczyk-Zreda et al. (2016)",
      url: "https://academic.oup.com/occmed/article-abstract/66/8/630/2750551?redirectedFrom=fulltext"
    }, {
      name: "Michaelsen et al. (2023)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/"
    }, {
      name: "Häusser et al. (2010)",
      url: "https://psycnet.apa.org/record/2010-06658-001"
    }, {
      name: "Karasek & Theorell (1990)",
      url: "https://www.scirp.org/reference/referencespapers?referenceid=1955102"
    }, {
      name: "Arboned (2024)",
      url: "https://www.arboned.nl/nieuws/griepachtige-klachten-en-stress-boosdoeners-van-verzuim-in-2024#:~:text=Stressgerelateerde%20klachten%20blijven%20stijgen&text=Kijken%20we%20naar%20het%20langdurend,opzichte%20van%20het%20jaar%20daarvoor."
    }],
    color: "text-brand-green"
  }, {
    icon: TrendingUp,
    title: "70% lager uitvalrisico",
    description: "De kans dat medewerkers uitvallen door stress of burn-out daalt drastisch, wat zorgt voor meer stabiliteit in teams.",
    jdrTag: "Organisatorische Impact",
    studies: [{
      name: "De Bruin et al. (2018)",
      url: "https://dare.uva.nl/search?identifier=2ec42a08-a20f-4859-8e23-609a6030e6b6"
    }],
    color: "text-brand-blue"
  }, {
    icon: Award,
    title: "58-60% meer productiviteit",
    description: "Teams presteren beter door verhoogde focus, minder stress en betere samenwerking.",
    jdrTag: "Organisatorische Impact",
    studies: [{
      name: "Vonderlin et al. (2020)",
      url: "https://link.springer.com/article/10.1007/s12671-020-01328-3"
    }, {
      name: "Michaelsen et al. (2023)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/"
    }],
    color: "text-brand-green"
  }];
  return <TooltipProvider delayDuration={0}>
    <div className="min-h-screen bg-brand-gray-light">
      <SimplifiedNavigation />
      <StickyCtaButtons />
      
      {/* Hero Section */}
      <section className="bg-brand-gray-light section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            
            {/* 40+ Years Badge */}
            <div className="inline-flex items-center bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="h-4 w-4 mr-2" />
              40+ jaar wetenschappelijk onderzoek
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-dark mb-6 text-center">
              De Wetenschap Achter Innerleaps
            </h1>
            
            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed mb-8 text-center">
              Ons programma is gebaseerd op <strong>meer dan 40 jaar wetenschappelijk onderzoek</strong> naar Mindfulness-Based Stress Reduction (MBSR), ontwikkeld door Jon Kabat-Zinn in 1979. Wetenschappelijk erkende studies tonen consistent aan dat investeren in de mentale veerkracht van medewerkers leidt tot aantoonbare verbeteringen in bedrijfsresultaten, met name op het gebied van verzuim.
            </p>

            {/* Research Heritage Section */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-2xl font-semibold text-brand-gray-dark mb-4 flex items-center">
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-white rounded-lg mr-2">
                    <BookOpen className="h-5 w-5 text-brand-orange stroke-2" />
                  </div>
                Wetenschappelijke Erfenis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          
          <p className="text-xl md:text-2xl text-brand-gray-medium text-center max-w-4xl mx-auto mb-16 leading-relaxed">Het Life+ programma werkt tegelijk op de twee fronten van het JD-R model: het vermindert uitputting door stress en stressoren aan te pakken, én het stimuleert motivatie door persoonlijke en werkhulpbronnen te versterken. Deze dubbele aanpak verklaart de significante organisatorische resultaten van 15-21% minder verzuim en 70% lager uitvalrisico. Alle wetenschappelijk bewezen resultaten van het programma worden hieronder genoemd. De bijbehorende percentages geven de kans weer dat deelnemers daadwerkelijk verbetering ervaren.</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mechanismen.map((mechanisme, index) => {
              const IconComponent = mechanisme.icon;
              return <div key={index} className="bg-white rounded-xl p-4 md:p-6 relative">
                  {/* Mobile-first: Stack vertically, desktop: flex horizontally */}
                  <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-3">
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white mr-3 sm:mr-4 flex-shrink-0">
                        <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-brand-orange stroke-2" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-brand-gray-dark leading-tight min-w-0">
                        {mechanisme.title}
                      </h3>
                    </div>
                    {/* JD-R Tag - mobile: below title, desktop: aligned right */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-block text-xs px-3 py-1 rounded-full font-medium bg-brand-orange/10 text-brand-orange self-start sm:self-center sm:ml-4 flex-shrink-0 cursor-help hover:bg-brand-orange/20 hover:text-brand-orange transition-colors duration-200">
                          {mechanisme.jdrTag}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm p-4 bg-white border border-gray-200 shadow-lg rounded-lg z-50" side="top" align="center" sideOffset={8} avoidCollisions={false}>
                        <p className="text-sm leading-relaxed text-gray-700">{getJdrTooltipContent(mechanisme.jdrTag)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  
                  <p className="text-brand-gray-medium mb-4 leading-relaxed">
                    {mechanisme.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {mechanisme.studies.map((study, studyIndex) => <a key={studyIndex} href={study.url} target="_blank" rel="noopener noreferrer" className="inline-block bg-brand-gray-light text-brand-gray-dark text-xs px-3 py-1 rounded-full hover:bg-brand-blue hover:text-white transition-colors duration-200">
                        {study.name}
                      </a>)}
                  </div>
                </div>;
            })}
          </div>
        </div>
      </section>

      {/* Lead Magnet Section */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FileText className="h-4 w-4 mr-2" />
              Exclusief wetenschappelijk rapport
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ontvang het wetenschappelijke bewijs
            </h2>
            
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white/90">
              Wil je precies begrijpen hoe deze resultaten tot stand komen? Ons academische onderzoeksrapport legt de methodologie en berekeningen achter de 15-21% verzuimreductie volledig uit. Inclusief pathway-analyses, effectgroottes en de wetenschappelijke basis van 40 jaar MBSR-onderzoek.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setIsLeadMagnetOpen(true)} className="text-lg px-8 py-3 bg-white hover:bg-gray-100 text-brand-blue hover:text-brand-blue font-semibold rounded-lg transition-all duration-300 shadow-lg transform hover:-translate-y-0.5">
                Vraag het bewijs op
              </Button>
              <Button 
                variant="secondary-on-blue" 
                className="text-lg px-8 py-3 font-semibold rounded-lg"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = 'https://calendar.app.google/BgGy8cVUSk4w5Zzg8';
                  link.target = '_blank';
                  link.rel = 'noopener noreferrer';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                Een vrijblijvend gesprek met Bas plannen
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ROICalculator />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">Innerleaps</div>
              <p className="text-gray-300 leading-relaxed">InnerLeaps transformeert teams met wetenschappelijk bewezen stress management voor duurzaam succes. Geen quick fixes, wel echte gedragsverandering.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p>Email: bas@innerleaps.nl</p>
                <p>Telefoon: 06 23 45 34 77</p>
                <p>KVK nummer: 98136925</p>
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
            <p>&copy; 2024 Innerleaps. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
      
      <LeadMagnetModal isOpen={isLeadMagnetOpen} onClose={() => setIsLeadMagnetOpen(false)} />
    </div>
  </TooltipProvider>;
};
export default Wetenschap;