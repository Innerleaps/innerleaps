import { useEffect, useState, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import StickyCtaButtons from "@/components/StickyCtaButtons";
import Footer from "@/components/Footer";
import MasterclassSection from "@/components/MasterclassSection";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import {
  Brain,
  Target,
  Lightbulb,
  Shield,
  Zap,
  Heart,
  AlertCircle,
  Eye,
  CheckCircle,
  Users,
  FileText,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Images
import controlecentrumImage from "@/assets/Concentratietraining_voor_sterker_executieve_systeem.png";
import waarschuwingssysteemImage from "@/assets/stressmanagementtraining_sterker_waarschuwingssysteem.png";
import stressmanagementEnConcentratie from "@/assets/stressmanagement_en_concentratietraining.png";
import stressPrestatieImage from "@/assets/stress_prestatie_curve.png";

import zesWekenBreintraining from "@/assets/6_weken_breintraining_voor_gedragsverandering.jpg";

// Lazy load modal
const LeadMagnetModal = lazy(() => import("@/components/LeadMagnetModal"));

const DeMethode = () => {
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState(false);
  const heroRef = useIntersectionObserver({ threshold: 0.1 });
  
  const pushUpsRef = useIntersectionObserver({ threshold: 0.1 });
  const controleRef = useIntersectionObserver({ threshold: 0.1 });
  const waarschuwingRef = useIntersectionObserver({ threshold: 0.1 });
  const rapportRef = useIntersectionObserver({ threshold: 0.1 });
  const prestatieRef = useIntersectionObserver({ threshold: 0.1 });
  const zesWekenRef = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <meta
          name="description"
          content="Innerleaps bouwt op 40 jaar aandachtsonderzoek van Dr. Amishi Jha. De methode traint het waarschuwingssysteem en controlecentrum van het brein, bewezen effectief in meta-analyses en militaire toepassingen."
        />
      </Helmet>
      <SimplifiedNavigation />
      <StickyCtaButtons />

      {/* Hero */}
      <section
        ref={heroRef.ref}
        className={`section-padding bg-white transition-opacity duration-1000 ${
          heroRef.isIntersecting ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container-custom text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight">
            <span className="text-brand-orange">Continue spanning</span> door het drukke leven
          </h1>
          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
            Druk kan erg effectief zijn. Zo zet een deadline ons aan het werk. Maar door alle ballen die we hoog
            houden, zowel in ons werk als privé leven, worden we continue blootgesteld aan spanning. En die stress
            die slaat zich op in zowel ons lichaam als ons werkgeheugen.
          </p>
        </div>
      </section>

      {/* Sectie: Push-ups voor je brein */}
      <section
        ref={pushUpsRef.ref}
        className={`section-padding bg-white transition-all duration-1000 ${
          pushUpsRef.isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container-custom space-y-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-8">
            <span className="text-brand-orange">Push-ups</span> voor je brein
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="rounded-xl shadow-lg overflow-hidden order-2 lg:order-1">
              <img
                src={stressmanagementEnConcentratie}
                alt="Push-ups voor je brein"
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Met onze methode trainen werknemers hun brein. Net zoals je spieren versterkt in de sportschool, trainen
                deelnemers twee cruciale systemen met onze "brein push-ups".
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Zowel het "controlecentrum" voor betere concentratie en een efficiënter werkgeheugen, als het
                "waarschuwingssysteem" zodat spanning niet opstapelt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectie: Een krachtiger controlecentrum */}
      <section
        ref={controleRef.ref}
        className={`pt-8 pb-16 md:pb-20 lg:pb-28 bg-white transition-all duration-1000 ${
          controleRef.isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container-custom space-y-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-8">
            Een krachtiger <span className="text-brand-orange">controlecentrum</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Door het oefenen verterkt onder andere de frontale cortex en fronto-pariëtale netwerken, ook wel ons
                "controlecentrum". Werknemers ontwikkelen als het ware een mentaalschild voor druk en afleiding.
                Prestaties verbetert omdat spanning minder werkgeheugen inneemt en het concentratievermogen sterker is.
              </p>
            </div>
            <div className="rounded-xl shadow-lg overflow-hidden">
              <img
                src={controlecentrumImage}
                alt="Concentratietraining voor sterker executieve systeem"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* 5 Feature Cards */}
          <div className="grid md:grid-cols-6 gap-6 lg:gap-8">
            <div className="bg-brand-off-white p-6 rounded-lg space-y-4 md:col-span-2">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <Brain className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">Informatieverwerking</h3>
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

            <div className="bg-brand-off-white p-6 rounded-lg space-y-4 md:col-span-2">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
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

            <div className="bg-brand-off-white p-6 rounded-lg space-y-4 md:col-span-2">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <Lightbulb className="h-8 w-8 text-brand-orange stroke-2" />
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

            <div className="bg-brand-off-white p-6 rounded-lg space-y-4 md:col-span-2 md:col-start-2">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
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

            <div className="bg-brand-off-white p-6 rounded-lg space-y-4 md:col-span-2">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
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

      {/* Sectie: Een scherper waarschuwingssysteem */}
      <section
        ref={waarschuwingRef.ref}
        className={`section-padding bg-white transition-all duration-1000 ${
          waarschuwingRef.isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container-custom space-y-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-8">
            Een scherper <span className="text-brand-orange">waarschuwingssysteem</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Door de training versterkt ook de anterior insula en anterior cingulate cortex, ons
                "waarschuwingssysteem". Hierdoor merken werknemers stresssignalen eerder op. In de 6 weekse training
                ontwikkelen deelnemers nieuwe, gezonde patronen om die stresssignalen te reguleren. Echte
                gedragsverandering die de vitaliteit en inzetbaarheid van je team versterkt.
              </p>
            </div>
            <div className="rounded-xl shadow-lg overflow-hidden">
              <img
                src={waarschuwingssysteemImage}
                alt="Stressmanagementtraining sterker waarschuwingssysteem"
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
              />
            </div>
          </div>

          {/* 3 Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-brand-off-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <Heart className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                Lichaamsbewustzijn & Waarneming
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg text-brand-gray-medium">
                    Eerder voelen dat je gestrest raakt.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg text-brand-gray-medium">
                    Lichamelijke signalen opvangen voordat ze escaleren.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg text-brand-gray-medium">
                    Subtiele waarschuwingen van je lichaam herkennen.
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-brand-off-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <AlertCircle className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">Emotionele Signalering</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg text-brand-gray-medium">
                    Merken wat belangrijk is en aandacht nodig heeft.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg text-brand-gray-medium">
                    Sneller voelen dat iets niet goed zit.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg text-brand-gray-medium">
                    Begrijpen welke emoties je waarschuwen.
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-brand-off-white p-6 rounded-lg space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <Eye className="h-8 w-8 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark text-center">
                Zelfmonitoring & Bewustzijn
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg text-brand-gray-medium">
                    Jezelf observeren terwijl je iets doet.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg text-brand-gray-medium">
                    Opmerken wat je lichaam je waarschuwt.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wetenschappelijk rapport */}
      <section
        ref={rapportRef.ref}
        className={`section-padding bg-white transition-all duration-1000 ${
          rapportRef.isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container-custom">
          <div className="bg-brand-blue rounded-xl p-8 shadow-lg">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full">
                <FileText className="h-8 w-8 text-brand-orange" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Ontdek zelf de resultaten van 40 jaar onderzoek
              </h2>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                Zelf de wetenschappelijke details bekijken? Ons academische rapport bundelt de laatste studies, analyses
                en berekeningen rond de effecten van aandachttraining. Inclusief effectgroottes.
              </p>
              <Button
                onClick={() => setIsLeadMagnetOpen(true)}
                className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold text-lg px-8 py-6"
              >
                <FileText className="mr-2 h-5 w-5" />
                Rapport ontvangen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sectie: Verbeteren van prestaties */}
      <section
        ref={prestatieRef.ref}
        className={`section-padding bg-white transition-all duration-1000 ${
          prestatieRef.isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container-custom space-y-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-8">
            Verbeteren van <span className="text-brand-orange">prestaties</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="rounded-xl shadow-lg overflow-hidden order-2 lg:order-1">
              <img
                src={stressPrestatieImage}
                alt="Wat is de relatie tussen stress en prestatie"
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Prestaties van werknemers verbeteren door optimalisatie van het werkgeheugen. Relevante informatie wordt
                sneller geselecteerd en irrelevante informatie beter onderdrukt. De concentratie neemt toe, terwijl
                afleiding afneemt. Onderzoek laat tot 24% verbetering zien op aandachtstaken (Jha et al., 2021).
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Daarnaast nemen spanning en druk het werkgeheugen in beslag. Wanneer die spanning afneemt, komt er
                capaciteit vrij voor de taak zelf. Tot slot wordt het werkgeheugen efficiënter: het levert betere
                resultaten met minder neurale inspanning (Bailey et al., 2020).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectie: 6 weken voor echte gedragsverandering */}
      <section
        ref={zesWekenRef.ref}
        className={`section-padding bg-white transition-all duration-1000 ${
          zesWekenRef.isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container-custom space-y-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-8">
            6 weken voor echte <span className="text-brand-orange">gedragsverandering</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Elke week is er een groepssessie met een geaccrediteerde trainer, waarin werknemers reflecteren op hun
                oefeningen en uitdagingen. Zo komen deelnemers steeds opnieuw in contact met hun eigen doel, en dat
                motiveert.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Users className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1 mr-3" />
                  <span className="text-xl md:text-2xl text-brand-gray-medium">
                    6 groepsworkshops van 60 minuten
                  </span>
                </li>
                <li className="flex items-start">
                  <FileText className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1 mr-3" />
                  <span className="text-xl md:text-2xl text-brand-gray-medium">
                    Werkboek met achtergrondinformatie en opdrachten
                  </span>
                </li>
                <li className="flex items-start">
                  <Activity className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1 mr-3" />
                  <span className="text-xl md:text-2xl text-brand-gray-medium">
                    Audio-opnames voor dagelijkse oefening
                  </span>
                </li>
              </ul>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Het resultaat? Gedrag dat blijft. De effecten op stress, burn-out en productiviteit zijn 6 tot 12
                maanden na de training nog steeds zichtbaar (Vonderlin et al., 2020; Michaelsen et al., 2023).
              </p>
            </div>
            <div className="rounded-xl shadow-lg overflow-hidden">
              <img
                src={zesWekenBreintraining}
                alt="6 weken breintraining voor gedragsverandering"
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Masterclass Sectie */}
      <MasterclassSection variant="employer" />

      <Footer />

      <Suspense fallback={null}>
        <LeadMagnetModal isOpen={isLeadMagnetOpen} onClose={() => setIsLeadMagnetOpen(false)} />
      </Suspense>
    </div>
  );
};

export default DeMethode;
