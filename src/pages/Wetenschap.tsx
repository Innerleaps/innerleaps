import { useEffect, useState, lazy, Suspense } from "react";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import StickyCtaButtons from "@/components/StickyCtaButtons";
import Footer from "@/components/Footer";
import { Brain, Heart, Shield, CheckCircle, Target, Award, TrendingUp, FileText, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import brainActivityImage from "@/assets/hersenen_aandachttraining.png";

// Lazy load heavy components
const ROICalculator = lazy(() => import("@/components/ROICalculator"));
const LeadMagnetModal = lazy(() => import("@/components/LeadMagnetModal"));
const Wetenschap = () => {
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SimplifiedNavigation />
      <StickyCtaButtons />

      {/* DE OPLOSSING */}
      <section className="bg-brand-off-white section-padding">
        <div className="container-custom space-y-8 lg:space-y-12">
          {/* Titel over volledige breedte */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-brand-gray-dark leading-tight">
            Train je <span className="text-brand-orange">concentratie</span>, versterk je{" "}
            <span className="text-brand-orange">brein</span>
          </h2>

          {/* Body text links, plaatje rechts */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                In onze training’s trainen deelnemers hun concentratie en het herkennen van lichamelijke signalen. Je
                kan het vergelijken met het trainen van je spieren in de sportschool. Met onze "push-ups voor het brein"
                versterken de frontale cortex en fronto-pariëtale netwerken, simpel gezegd je "controlecentrum". <br />
                <br />
                Met onze frontale cortex concentreren we ons, verwerken we informatie en bedenken we strategien. Kijk, met een sterker controlecentrum versteken deze functies:
              </p>
            </div>
            <div>
              <img
                src={brainActivityImage}
                alt="Door aandachttraining wordt informatie beter verwerkt gerichter vastgehouden en efficiënter ingezet"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Cards in 3 kolommen (6-kolom grid voor centrering) */}
          <div className="grid md:grid-cols-6 gap-6 lg:gap-8">
            {/* Card 1: Informatieverwerking */}
            <div className="bg-white p-6 rounded-lg space-y-4 md:col-span-2">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Brain className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                Informatie{"\u00AD"}verwerking
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg text-brand-gray-medium">
                    Informatie langer vasthouden en beter onthouden.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg text-brand-gray-medium">
                    Informatie sneller en beter verwerken.
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Aandachtscontrole */}
            <div className="bg-white p-6 rounded-lg space-y-4 md:col-span-2">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Target className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">Concentratie</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg text-brand-gray-medium">
                    Aandacht beter richten op wat belangrijk is.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg text-brand-gray-medium">Aandacht langer vasthouden.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg text-brand-gray-medium">
                    Minder afgeleid door onbelangrijke informatie.
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Executieve Planning */}
            <div className="bg-white p-6 rounded-lg space-y-4 md:col-span-2">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <FileText className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">Denkprocessen</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg text-brand-gray-medium">Beter plannen en organiseren.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg text-brand-gray-medium">Doelen bepalen en volhouden.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg text-brand-gray-medium">
                    Strategien bedenken en prioriteiten bepalen.
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: Filteren & onderdrukken (gecentreerd, start kolom 2) */}
            <div className="bg-white p-6 rounded-lg space-y-4 md:col-span-2 md:col-start-2">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Shield className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                Filteren & onderdrukken
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg text-brand-gray-medium">Irrelevante informatie filteren.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg text-brand-gray-medium">Ongewenste reacties onderdrukken.</span>
                </div>
              </div>
            </div>

            {/* Card 5: Cognitieve Efficiëntie (gecentreerd, start kolom 4) */}
            <div className="bg-white p-6 rounded-lg space-y-4 md:col-span-2 md:col-start-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Zap className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">Makkelijker denken</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg text-brand-gray-medium">
                    Dezelfde taken vragen minder hersenenergie.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg text-brand-gray-medium">Sneller schakelen tussen taken.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ORGANISATIE IMPACT */}
      <section className="bg-white section-padding">
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
            <div className="bg-brand-off-white p-6 rounded-lg space-y-4">
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
            <div className="bg-brand-off-white p-6 rounded-lg space-y-4">
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
            <div className="bg-brand-off-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <TrendingUp className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-brand-gray-dark text-center">
                Lager risico om uit te vallen
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
            <div className="bg-brand-off-white p-6 rounded-lg space-y-4">
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
      <section className="bg-brand-off-white section-padding">
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
            <div className="bg-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Shield className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-brand-gray-dark text-center">
                Minder stress, meer rust
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

            {/* Betere emotieregulatie */}
            <div className="bg-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Heart className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-brand-gray-dark text-center">
                Betere emotieregulatie
              </h3>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed text-center">
                Sterke emoties zoals frustratie of boosheid krijgen minder grip. Deelnemers reageren rustiger in
                moeilijke situaties en maken bewustere keuzes.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1385375/full"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-brand-gray-light text-brand-gray-medium rounded hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  Lensen et al. (2024)
                </a>
              </div>
            </div>

            {/* Betere levenskwaliteit */}
            <div className="bg-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Award className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-brand-gray-dark text-center">
                Betere levenskwaliteit
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
            <div className="bg-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Brain className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-brand-gray-dark text-center">
                Beter slapen en herstellen
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

            {/* Betere fysieke en mentale gezondheid */}
          </div>

          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed text-center mt-12">
            <br />
            Effecten blijven 12+ maanden aanhouden.
          </p>
        </div>
      </section>

      {/* LEAD MAGNET */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FileText className="h-4 w-4 mr-2" />
              Exclusief wetenschappelijk rapport
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              De resultaten van 40 jaar onderzoek naar aandachttraining. Vraag het hier aan.
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white/90">
              Zelf de wetenschappelijke details bekijken? Ons academische rapport bundelt de laatste studies, analyses
              en berekeningen rond de effecten van aandachttraining. Inclusief effectgroottes en pathway-analyses.
            </p>
            <Button
              onClick={() => setIsLeadMagnetOpen(true)}
              className="text-lg px-8 py-3 bg-white hover:bg-gray-100 text-brand-blue hover:text-brand-blue font-semibold rounded-lg transition-all duration-300 shadow-lg transform hover:-translate-y-0.5"
            >
              Vraag het bewijs op
            </Button>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="section-padding"><div className="container-custom text-center">Laden...</div></div>}>
        <ROICalculator />
      </Suspense>

      <div id="contact">
        <Footer />
      </div>

      <Suspense fallback={null}>
        {isLeadMagnetOpen && (
          <LeadMagnetModal isOpen={isLeadMagnetOpen} onClose={() => setIsLeadMagnetOpen(false)} />
        )}
      </Suspense>
    </div>
  );
};
export default Wetenschap;
