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
const WetenschapOld = () => {
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
                In onze trainingen trainen deelnemers hun concentratie en het herkennen van lichamelijke signalen. Je
                kan het vergelijken met het trainen van je spieren in de sportschool. Met onze "push-ups voor het brein"
                versterken de frontale cortex en fronto-pariëtale netwerken. <br />
                <br />
                Klinkt misschien ingewikkeld maar simpel gezegd is dit ons "controlecentrum". Hiermee maken we bewust
                keuzes, dit onderscheid ons van dieren. Kijk, met een sterker controlecentrum versteken deze functies:
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

            {/* Card 3: Denkprocessen */}
            <div className="bg-white p-6 rounded-lg space-y-4 md:col-span-2">
              <div className="p-3 rounded-lg bg-brand-orange/5 w-fit mx-auto">
                <Heart className="h-8 w-8 text-brand-orange stroke-2" />
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
                    Strategieën bedenken en prioriteiten bepalen.
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: Emotieregulatie */}
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

            {/* Card 5: Makkelijker denken */}
            <div className="bg-white p-6 rounded-lg space-y-4 md:col-span-2">
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

      {/* Wetenschappelijke bijlage downloaden sectie */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple">
            Exclusief wetenschappelijk rapport
          </h2>
          <p className="text-xl md:text-2xl text-brand-orange font-semibold max-w-3xl mx-auto">
            De resultaten van 40 jaar onderzoek naar aandachttraining. Vraag het hier aan.
          </p>
          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed max-w-3xl mx-auto">
            Zelf de wetenschappelijke details bekijken? Ons academische rapport bundelt de laatste studies, analyses en
            berekeningen rond de effecten van aandachttraining. Inclusief effectgroottes en pathway-analyses.
          </p>
          <Button
            onClick={() => setIsLeadMagnetOpen(true)}
            variant="secondary"
            className="text-lg px-8 py-6 font-semibold"
          >
            <FileText className="mr-2 h-5 w-5" />
            Aanvragen rapport
          </Button>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="section-padding bg-brand-off-white">
        <div className="container-custom">
          <Suspense
            fallback={
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
              </div>
            }
          >
            <ROICalculator />
          </Suspense>
        </div>
      </section>

      <Footer />

      <Suspense fallback={null}>
        <LeadMagnetModal isOpen={isLeadMagnetOpen} onClose={() => setIsLeadMagnetOpen(false)} />
      </Suspense>
    </div>
  );
};

export default WetenschapOld;
