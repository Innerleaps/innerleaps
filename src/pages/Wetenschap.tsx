import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import StickyCtaButtons from "@/components/StickyCtaButtons";
import ROICalculator from "@/components/ROICalculator";
import Footer from "@/components/Footer";
import { Brain, Heart, Shield, CheckCircle, Target, Award, TrendingUp } from "lucide-react";
import neocortexImage from "@/assets/Meer_activiteit_in_neo_cortex_door_aandacht_training.png";
import performanceImage from "@/assets/burnout_voorkomen_en_beter_presteren_door_aandacht_training.png";
const Wetenschap = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const brainSystems = [
    {
      number: 1,
      icon: Brain,
      title: "1. Neocortex: rationele keuzes",
      color: "text-brand-orange",
      bgColor: "bg-brand-orange/5",
      points: [
        "Denkt na, plant, maakt doordachte beslissingen",
        "Zorgt voor situationeel bewustzijn, verdeelt taken en prioriteert",
        "Maar onder stress? Uitgeschakeld",
      ],
    },
    {
      number: 2,
      icon: Heart,
      title: "2. Limbisch systeem: beloningen najagen",
      color: "text-brand-orange",
      bgColor: "bg-brand-orange/5",
      points: [
        "Verwerkt emoties, geheugen, motivatie en genot",
        "Jaagt constant op beloningen: dopamine, erkenning, afleidende content",
        "Handelt snel, niet altijd slim. Kiest directe beloning boven het lange termijn",
      ],
    },
    {
      number: 3,
      icon: Shield,
      title: "3. Reptielenbrein: dreigingen vermijden",
      color: "text-brand-orange",
      bgColor: "bg-brand-orange/5",
      points: [
        "Beschermt tegen gevaar maar maakt geen onderscheid tussen fysieke bedreiging en moderne stressoren",
        "Zoals reputatieverlies, gebrek aan controle of onzekerheid",
      ],
    },
  ];
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <StickyCtaButtons />

      {/* STAP 1: HET PROBLEEM */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-dark leading-tight">
              De <span className="text-brand-orange">automatische piloot</span>, ons beschermingsmechanisme
            </h2>
            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              In 2 miljoen jaar is ons brein geëvolueerd om twee dingen te doen: dreigingen vermijden én beloningen
              najagen. Het probleem? Ons brein ziet geen verschil tussen een leeuw en werkstress. Tegelijk leidt de
              dopamine craving ons af. Hierdoor is tot 90% van ons gedrag onbewust en zeker onder stress neemt onze auto
              pilot het over. Dat leidt tot ongezonde keuzes, impulsieve reacties en afleiding.
            </p>
          </div>

          {/* Drie kolommen met iconen */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {brainSystems.map((system) => {
              const IconComponent = system.icon;
              return (
                <div key={system.number} className="flex flex-col space-y-4 bg-brand-off-white p-6 rounded-lg">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`p-3 rounded-lg ${system.bgColor}`}>
                      <IconComponent className={`h-8 w-8 ${system.color} stroke-2`} />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-brand-gray-dark leading-tight text-center">
                    {system.title}
                  </h3>
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    {system.points.map((point, idx) => (
                      <li key={idx} className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <p className="text-xl md:text-2xl text-brand-gray-dark font-semibold text-center mt-12">
            Onder stress domineren systeem 2 en 3. Rationeel denken verliest.
          </p>
        </div>
      </section>

      {/* STAP 2: DE OPLOSSING */}
      <section className="bg-brand-off-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-dark leading-tight">
              Het vitaliteit en performance programma waar we{" "}
              <span className="text-brand-orange">aandacht trainen</span>
            </h2>
            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              In ons vitaliteit- en effectiviteit programma trainen deelnemers hun aandacht. Net zoals je spieren traint
              in de sportschool, train je hier je focus. Hiermee neemt de activiteit in de neocortex toe. Tegelijkertijd
              vraagt deze minder energie. De neocortex is het "controlecentrum" voor:
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 mb-12">
            <div></div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                <span className="text-xl md:text-2xl text-brand-gray-dark">Emoties regulatie</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                <span className="text-xl md:text-2xl text-brand-gray-dark">Bewust reageren op sociale signalen</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                <span className="text-xl md:text-2xl text-brand-gray-dark">Strategieën bedenken en prioriteren</span>
              </div>
            </div>
            <div></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <img
              src={neocortexImage}
              alt="Meer activiteit in neo cortex door aandacht training"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* STAP 3: HET RESULTAAT */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-dark leading-tight">
              <span className="text-brand-orange">Burn-out voorkomen</span> én{" "}
              <span className="text-brand-orange">prestaties verhogen</span>
            </h2>
            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              De Yerkes-Dodson curve laat het zien: optimale prestatie zit in de sweet spot van stress. Te weinig druk?
              Bore-out. Te veel druk? Burn-out.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <img
              src={performanceImage}
              alt="Burnout voorkomen en beter presteren door aandacht training - Yerkes-Dodson curve"
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed text-center">
              Door meer bewustzijn en minder automatische piloot kunnen deelnemers:
            </p>

            {/* 3 checkmarks op volle breedte */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                <span className="text-xl md:text-2xl text-brand-gray-dark">
                  Stress vroeg herkennen en bijsturen voordat het escaleert
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                <span className="text-xl md:text-2xl text-brand-gray-dark">
                  Beter herstellen, sneller terug naar optimale prestatie
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                <span className="text-xl md:text-2xl text-brand-gray-dark">
                  In de prestatie sweet spot blijven waar focus, energie en prestatie hoog zijn
                </span>
              </div>
            </div>

            {/* Het resultaat in cijfers card daaronder */}
          </div>
        </div>
      </section>

      {/* ORGANISATIE IMPACT */}
      <section className="bg-brand-off-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-dark leading-tight">
              Concreet <span className="text-brand-orange">impact</span> op jouw{" "}
              <span className="text-brand-orange">organisatie</span>. Volgens de{" "}
              <span className="text-brand-orange">wetenschap</span>.
            </h2>
            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              40 jaar wetenschappelijk onderzoek levert bewijs. Heel veel bewijs. Minder verzuim en hogere
              productiviteit zijn slechts het begin.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Veerkracht */}
            <div className="bg-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Target className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-brand-gray-dark text-center">
                Veerkrachtiger en weerbaarder
              </h3>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed text-center">
                Deelnemers ontwikkelen mentale spierkracht om uitdagingen het hoofd te bieden. Ze herstellen sneller van
                tegenslagen en blijven effectief functioneren onder druk.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  Michaelsen et al. (2023)
                </a>
                <a
                  href="https://link.springer.com/article/10.1007/s12671-020-01328-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  Vonderlin et al. (2020)
                </a>
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12210539/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  Dou et al. (2024)
                </a>
              </div>
            </div>

            {/* Werktevredenheid */}
            <div className="bg-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Heart className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-brand-gray-dark text-center">
                Hogere werktevredenheid
              </h3>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed text-center">
                Het plezier in het werk neemt toe. Taken voelen minder zwaar aan en deelnemers ervaren meer betekenis in
                hun dagelijkse werkzaamheden.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://link.springer.com/article/10.1007/s12671-020-01328-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  Vonderlin et al. (2020)
                </a>
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  Michaelsen et al. (2023)
                </a>
              </div>
            </div>

            {/* Uitval risico */}
            <div className="bg-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <TrendingUp className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-brand-gray-dark text-center">
                Lager uitval risico
              </h3>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed text-center">
                De kans dat medewerkers uitvallen door stress of burn-out daalt drastisch, wat zorgt voor meer
                stabiliteit in teams.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://dare.uva.nl/search?identifier=2ec42a08-a20f-4859-8e23-609a6030e6b6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  De Bruin et al. (2018)
                </a>
              </div>
            </div>

            {/* Productiviteit */}
            <div className="bg-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Award className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-brand-gray-dark text-center">
                Hogere productiviteit en prestatie
              </h3>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed text-center">
                Teams presteren beter door verhoogde focus, minder stress en betere samenwerking.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://link.springer.com/article/10.1007/s12671-020-01328-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  Vonderlin et al. (2020)
                </a>
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  Michaelsen et al. (2023)
                </a>
              </div>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed text-center">
            <br />
            Effecten blijven 12+ maanden aanhouden.
          </p>
        </div>
      </section>

      {/* DEELNEMERS IMPACT */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-dark leading-tight">
              <span className="text-brand-orange">Deelnemers</span> krijgen een{" "}
              <span className="text-brand-orange">beter leven</span>. Dat zegt de{" "}
              <span className="text-brand-orange">wetenschap</span>.
            </h2>
            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              Goed voor de organisatie maar nog beter voor de deelnemers. De positieve effecten zijn op heel veel
              vlakken van het leven merkbaar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Meer rust */}
            <div className="bg-brand-off-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Shield className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-brand-gray-dark text-center">
                72% meer rust in het leven
              </h3>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed text-center">
                Zonder dat de werkdruk wordt verminderd ervaren deelnemers minder stress. De beleving van het werk en de
                werkdruk wordt minder stressvol.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://www.researchgate.net/publication/320809758_Mindfulness-based_stress_reduction_MBSR_for_improving_health_quality_of_life_and_social_functioning_in_adults_a_systematic_review_and_meta-analysis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  De Vibe et al. (2017)
                </a>
                <a
                  href="https://scispace.com/pdf/a-systematic-review-and-meta-analysis-of-workplace-448vdu0m18.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  Bartlett et al. (2018)
                </a>
                <a
                  href="https://link.springer.com/article/10.1007/s12671-020-01328-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  Vonderlin et al. (2020)
                </a>
                <a
                  href="https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1385375/full"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  Lensen et al. (2024)
                </a>
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  Michaelsen et al. (2023)
                </a>
                <a
                  href="https://academic.oup.com/occmed/article-abstract/66/8/630/2750551?redirectedFrom=fulltext"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  Żołnierczyk-Zreda et al. (2016)
                </a>
              </div>
            </div>

            {/* Gezondheid */}
            <div className="bg-brand-off-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Brain className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-brand-gray-dark text-center">
                68% betere gezondheid
              </h3>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed text-center">
                De psychische gesteldheid verbetert merkbaar. Deelnemers voelen zich mentaal sterker en stabieler, met
                minder last van negatieve gedachten.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://www.researchgate.net/publication/320809758_Mindfulness-based_stress_reduction_MBSR_for_improving_health_quality_of_life_and_social_functioning_in_adults_a_systematic_review_and_meta-analysis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  De Vibe et al. (2017)
                </a>
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  Michaelsen et al. (2023)
                </a>
              </div>
            </div>

            {/* Betere levenskwaliteit */}
            <div className="bg-brand-off-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Award className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-brand-gray-dark text-center">
                63% betere levenskwaliteit
              </h3>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed text-center">
                Het algehele welzijn en tevredenheid over het leven verbeterd. Deelnemers ervaren meer plezier en
                betekenis in hun dagelijkse activiteiten.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://www.researchgate.net/publication/320809758_Mindfulness-based_stress_reduction_MBSR_for_improving_health_quality_of_life_and_social_functioning_in_adults_a_systematic_review_and_meta-analysis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  De Vibe et al. (2017)
                </a>
                <a
                  href="https://link.springer.com/article/10.1007/s12671-020-01328-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  Vonderlin et al. (2020)
                </a>
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  Michaelsen et al. (2023)
                </a>
              </div>
            </div>

            {/* Beter slapen */}
            <div className="bg-brand-off-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Brain className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-brand-gray-dark text-center">
                78% beter slapen en herstellen
              </h3>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed text-center">
                Deelnemers vallen makkelijker in slaap en slapen dieper. Dit zorgt voor beter herstel en meer energie
                voor de volgende dag.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://scispace.com/pdf/a-systematic-review-and-meta-analysis-of-workplace-448vdu0m18.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  Bartlett et al. (2018)
                </a>
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10172073/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  Michaelsen et al. (2023)
                </a>
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12210539/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  Dou et al. (2024)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ROICalculator />

      <div id="contact">
        <Footer />
      </div>
    </div>
  );
};
export default Wetenschap;
