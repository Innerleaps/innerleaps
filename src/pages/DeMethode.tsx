import { useEffect, useState, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
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
  Clock,
  Users,
  FileText,
  Activity,
  BookOpen,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Images
import controlecentrumImage from "@/assets/Concentratietraining_voor_sterker_executieve_systeem.png";
import waarschuwingssysteemImage from "@/assets/stressmanagementtraining_sterker_waarschuwingssysteem.png";
import concentratieOefening from "@/assets/Concentratietraining_oefening.png";
import concentratieDagelijks from "@/assets/Concentratietraining_in_het_dagelijks_leven.jpeg";
import stressmanagementEnConcentratie from "@/assets/stressmanagement_en_concentratietraining.png";
import stressPrestatieImage from "@/assets/stress_prestatie_curve.png";

// Lazy load modal
const LeadMagnetModal = lazy(() => import("@/components/LeadMagnetModal"));
const DeMethode = () => {
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState(false);
  const heroRef = useIntersectionObserver({ threshold: 0.1 });
  const controleRef = useIntersectionObserver({ threshold: 0.1 });
  const waarschuwingRef = useIntersectionObserver({ threshold: 0.1 });
  const rapportRef = useIntersectionObserver({ threshold: 0.1 });
  const prestatieRef = useIntersectionObserver({ threshold: 0.1 });
  const masterclassRef = useIntersectionObserver({ threshold: 0.1 });
  const pushUpsRef = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <meta name="description" content="Innerleaps bouwt op 40 jaar aandachtsonderzoek van Dr. Amishi Jha. De methode traint het waarschuwingssysteem en controlecentrum van het brein, bewezen effectief in meta-analyses en militaire toepassingen." />
      </Helmet>
      <SimplifiedNavigation />
      <StickyCtaButtons />

      {/* Hero Section - Gecentreerd */}
      <section 
        ref={heroRef.ref}
        className={`section-padding bg-white transition-opacity duration-1000 ${
          heroRef.isIntersecting ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container-custom text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight">
            Een <span className="text-brand-orange">krachtiger brein</span> door "brein push-ups"
          </h1>
          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
            Net zoals je spieren versterkt in de <strong>sportschool</strong>, train je met onze oefeningen je{" "}
            <strong>brein</strong>. Push ups voor je brein dus. Je <strong>versterkt</strong> twee cruciale systemen: je{" "}
            <strong>controlecentrum</strong> voor focus en bewuste keuzes, én je <strong>signaleringsysteem</strong> dat
            stress opmerkt voordat het escaleert.
          </p>
        </div>
      </section>

      {/* Sectie: Een krachtiger controlecentrum */}
      <section 
        ref={controleRef.ref}
        className={`pt-8 pb-16 md:pb-20 lg:pb-28 bg-white transition-all duration-1000 ${
          controleRef.isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container-custom space-y-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-8">
            Een krachtiger <span className="text-brand-orange">controlecentrum</span>
          </h2>

          {/* Grid: Text links, Image rechts */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Met onze "push-ups voor het brein" versterk je onder andere de <strong>frontale cortex</strong> en{" "}
                <strong>fronto-pariëtale netwerken</strong>. Klinkt misschien ingewikkeld maar simpel gezegd is dit je
                "controlecentrum".
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Dit breindeel <strong>maakt ons mens</strong> en onderscheid ons van de meeste dieren. Hiermee verwerken
                we <strong>informatie</strong> tot <strong>plannen</strong> en voeren we deze <strong>bewust</strong>{" "}
                uit.
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

          {/* 5 Feature Cards in 3-2 grid */}
          <div className="grid md:grid-cols-6 gap-6 lg:gap-8">
            {/* Card 1: Informatieverwerking */}
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

            {/* Card 2: Concentratie */}
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

            {/* Card 3: Denkprocessen */}
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
                    Strategieën bedenken en prioriteiten bepalen.
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: Filteren & onderdrukken - Centered start */}
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

            {/* Card 5: Makkelijker denken */}
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

      {/* Sectie: Sterker waarschuwingssysteem */}
      <section 
        ref={waarschuwingRef.ref}
        className={`section-padding bg-white transition-all duration-1000 ${
          waarschuwingRef.isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container-custom space-y-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-8">
            Duidelijker <span className="text-brand-orange">waarschuwingssysteem</span>
          </h2>

          {/* Grid: Text links, Image rechts */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Door het doen van de "brein push-ups" versterken deelnemers ook hun <strong>anterior insula</strong> en{" "}
                <strong>anterior cingulate cortex</strong>. Heel simpel gezegd is dit ons{" "}
                <strong>waarschuwingssysteem</strong>.
              </p>

              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Omdat deelnemers <strong>stresssignalen eerder opmerken</strong>, kunnen ze{" "}
                <strong>spanning beter beheersen</strong> en <strong>reguleren</strong>. Hierdoor verbeteren prestaties
                én door <strong>minder spanning</strong> wordt het er allemaal ook wat <strong>leuker</strong> op!
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
            {/* Card 1: Lichaamsbewustzijn & Waarneming */}
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

            {/* Card 2: Emotionele Signalering */}
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

            {/* Card 3: Zelfmonitoring & Bewustzijn */}
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
                    Fouten of problemen eerder signaleren.
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

      {/* Wetenschappelijke Bijlage Downloaden Sectie */}
      <section 
        ref={rapportRef.ref}
        className={`section-padding bg-white transition-all duration-1000 ${
          rapportRef.isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container-custom">
          <div className="bg-brand-blue rounded-xl p-8 shadow-lg">
            <div className="text-center space-y-6">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full">
                <FileText className="h-8 w-8 text-brand-orange" />
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold text-white mb-2">
                Ontdek zelf de resultaten van 40 jaar onderzoek
              </h2>

              {/* Body */}
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                Zelf de wetenschappelijke details bekijken? Ons academische rapport bundelt de laatste studies, analyses
                en berekeningen rond de effecten van aandachttraining. Inclusief effectgroottes. 
              </p>

              {/* Button */}
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

      {/* Sectie: Betere prestaties door minder stress en meer focus */}
      <section 
        ref={prestatieRef.ref}
        className={`section-padding bg-white transition-all duration-1000 ${
          prestatieRef.isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container-custom space-y-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-8">
            <span className="text-brand-orange">Betere prestaties</span> door minder stress en meer{" "}
            <span className="text-brand-orange">focus</span>
          </h2>

          {/* Grid: Image links, Text rechts */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Afbeelding LINKS */}
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

            {/* Tekst RECHTS */}
            <div className="space-y-6 order-1 lg:order-2">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Een beetje stress werkt. Die deadline die je aanzet, die presentatie die je scherp houdt. Maar{" "}
                <strong>stress escaleert snel</strong>.
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Het getrainde waarschuwingssysteem van deelnemers <strong>vangt stress vroeg op</strong>. Want{" "}
                <strong>onbewuste stress</strong>? Die <strong>ondermijnt </strong> je <strong>prestaties</strong>: meer
                fouten, langzamer werken, sneller afgeleid.
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Prestaties verbeteren ook door <strong>sterkere concentratie</strong>. Door het trainen van het
                controlecentrum <strong>filter</strong> je irrelevante informatie, <strong>onthoud</strong> je wat
                belangrijk is en <strong>schakel</strong> je sneller tussen taken. Hetzelfde werk kost simpelweg
                <strong> minder hersenenergie.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Masterclass Sectie */}
      <MasterclassSection variant="employer" />

      {/* Push-ups Sectie 1: Geplande concentratietraining */}
      <section 
        ref={pushUpsRef.ref}
        className={`section-padding bg-white transition-all duration-1000 ${
          pushUpsRef.isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-12">
            <span className="text-brand-orange">Geplande</span> "brein push-ups"
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Zittend of liggend volgen deelnemers elke dag een <strong>begeleidende audio-opname</strong>. Deze duurt
                zo'n 12 minuten. De instructie is simpel: <strong>richt je aandacht</strong> op je ademhaling of andere{" "}
                <strong>lichamelijke ervaringen</strong>.
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Klinkt makkelijk? Je geest vindt er niks aan. Binnen een paar seconden denk je aan het avondeten, je
                to-do's of dat lastige gesprek. Je vergeet volledig wat je aan het doen was.{" "}
                <strong>Probeer het zelf maar</strong>.
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Dit is de crux van de oefening:{" "}
                <strong>het moment dat je opmerkt dat je bent afgedwaald, dát is de push-up</strong>. Je brengt je focus
                terug naar de oefening. Opnieuw en opnieuw. Dit{" "}
                <strong>versterkt je concentratie en bewustzijn van je lichaamssignalen</strong>, zoals push-ups je
                spieren versterken.
              </p>
            </div>
            <div className="rounded-xl shadow-lg overflow-hidden">
              <img
                src={concentratieOefening}
                alt="Concentratietraining oefening - Focus terugpakken cyclus"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Push-ups Sectie 2: Training in Dagelijks Leven */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-12">
            "Brein push-ups" in het <span className="text-brand-orange">dagelijks leven</span>
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="rounded-xl shadow-lg overflow-hidden order-2 lg:order-1">
              <img
                src={concentratieDagelijks}
                alt="Concentratietraining in het dagelijks leven"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={600}
                height={400}
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                De tweede vorm van de"brein push-ups" doen deelnemers in het dagelijks leven. Deelnemers richten hun{" "}
                <strong>aandacht</strong> op de <strong>dagelijkse activiteit</strong>. Dit kan eigenlijk bij alle
                activiteiten. Bijvoorbeeld:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1 mr-3" />
                  <span className="text-xl md:text-2xl text-brand-gray-medium">
                    Terwijl je je <strong>tanden poetst</strong> bewust de sensaties van het poetsen opmerken.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1 mr-3" />
                  <span className="text-xl md:text-2xl text-brand-gray-medium">
                    Bij een <strong>gesprek</strong> actief luisteren naar wat de persoon zegt en niet al je weerwoord
                    voorbereiden.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1 mr-3" />
                  <span className="text-xl md:text-2xl text-brand-gray-medium">
                    Tijdens het <strong>wandelen</strong> naar je werk bewust je omgeving waarnemen.
                  </span>
                </li>
              </ul>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Ook deze vorm van training is een <strong>concentratie{"\u00AD"}training</strong> waarbij focus en
                aandacht nodig is. Ook hiermee wordt focus versterkt en stress sneller herkent. Het mooie? Het kost geen
                extra tijd en je <strong>geniet meer</strong> van de activiteiten die je doet!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Push-ups Sectie 3: Wekelijkse workshops */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-12">
            Wekelijkse groepsworkshops, werkboek en theorie
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                6 weken. Niet korter. Echte gedragsverandering kost tijd. Nieuwe patronen in je brein ontstaan niet in
                een weekend. Elke week krijgen deelnemers:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Clock className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1 mr-3" />
                  <span className="text-xl md:text-2xl text-brand-gray-medium">
                    Groepsworkshop van 60 minuten. Nieuwe vaardigheden, theorie en ervaringen delen over het zelf
                    oefenen.
                  </span>
                </li>
                <li className="flex items-start">
                  <FileText className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1 mr-3" />
                  <span className="text-xl md:text-2xl text-brand-gray-medium">
                    Werkboek met wetenschappelijke achtergrond en praktische opdrachten.
                  </span>
                </li>
              </ul>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                In de workshops kijk je terug: wat werkte? Waar liep je vast? De groep herkent het, je bent niet de
                enige die worstelt met terugdwalende gedachten. Deelnemers leren van elkaar. De wekelijkse afspraken
                houden je scherp.
              </p>
            </div>
            <div className="rounded-xl shadow-lg overflow-hidden">
              <img
                src={stressmanagementEnConcentratie}
                alt="Stressmanagement en concentratietraining"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Sectie met 3 Training Buttons */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center space-y-8">
          <p className="text-xl md:text-2xl text-brand-gray-medium max-w-3xl mx-auto">
            Klaar om de methode ook echt toe te passen? Bekijk hier onze trainingen.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Link
              to="/vitaliteitstraining"
              className="bg-brand-blue border-2 border-brand-blue p-6 rounded-lg hover:bg-brand-blue/90 transition-all duration-300 group"
            >
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-orange transition-colors">
                Vitaliteitstraining
              </h3>
              <p className="text-base text-white/90">Voor organisaties en werkgevers</p>
            </Link>
            <Link
              to="/stressmanagement-training"
              className="bg-brand-blue border-2 border-brand-blue p-6 rounded-lg hover:bg-brand-blue/90 transition-all duration-300 group"
            >
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-orange transition-colors">
                Stressmanagement
              </h3>
              <p className="text-base text-white/90">Minder spanning & druk voor werknemers</p>
            </Link>
            <Link
              to="/prestatie-training"
              className="bg-brand-blue border-2 border-brand-blue p-6 rounded-lg hover:bg-brand-blue/90 transition-all duration-300 group"
            >
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-orange transition-colors">
                Prestatietraining
              </h3>
              <p className="text-base text-white/90">Als werknemer beter presteren met meer focus</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <Suspense fallback={null}>
        <LeadMagnetModal isOpen={isLeadMagnetOpen} onClose={() => setIsLeadMagnetOpen(false)} />
      </Suspense>
    </div>
  );
};
export default DeMethode;
