import { useEffect, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import StickyCtaButtons from "@/components/StickyCtaButtons";
import Footer from "@/components/Footer";
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <SimplifiedNavigation />
      <StickyCtaButtons />

      {/* Hero Section - Gecentreerd */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight">
            Een <span className="text-brand-orange">krachtiger brein</span> door training
          </h1>
          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
            Net zoals je spieren versterkt in de sportschool, train je met onze oefeningen je brein.{" "}
            <strong>Push ups voor je brein</strong> dus. Je versterkt twee cruciale systemen: je{" "}
            <strong>controlecentrum</strong> voor focus en bewuste keuzes, én je <strong>signaleringsysteem</strong> dat
            stress opmerkt voordat het escaleert.
          </p>
        </div>
      </section>

      {/* Sectie: Een krachtiger controlecentrum */}
      <section className="section-padding bg-white">
        <div className="container-custom space-y-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-8">
            Een krachtiger <span className="text-brand-orange">controlecentrum</span>
          </h2>

          {/* Grid: Text links, Image rechts */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Met onze "push-ups voor het brein" versterk je de <strong>frontale cortex</strong> en{" "}
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
      <section className="section-padding bg-white">
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

      {/* Sectie: Betere prestaties door minder stress en meer focus */}
      <section className="section-padding bg-white">
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

      {/* Push-ups Sectie 1: Geplande concentratietraining */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-12">
            De<span className="text-brand-orange">geplande</span> "brein push-ups"
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Zittend of liggend volgen deelnemers elke dag een begeleidende audio-opname. Deze duurt zo'n 12 minuten.
                De instructie is simpel: richt je aandacht op je ademhaling of andere lichamelijke ervaringen.
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Klinkt makkelijk? Je geest vindt er niks aan. Binnen een paar seconden denk je aan het avondeten, je
                to-do's of dat lastige gesprek. Je vergeet volledig wat je aan het doen was. Probeer het zelf maar.
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Dit is de crux van de oefening: het moment dat je opmerkt dat je bent afgedwaald, dát is de push-up. Je
                brengt je focus terug naar de oefening. Opnieuw en opnieuw. Dit versterkt je concentratie en bewustzijn
                van je lichaamssignalen, zoals push-ups je spieren versterken.
              </p>
            </div>
            <div className="rounded-xl shadow-lg overflow-hidden">
              <img
                src={concentratieOefening}
                alt="Concentratietraining oefening - Focus terugpakken cyclus"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Push-ups Sectie 2: Training in Dagelijks Leven */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-12">
            De "brein push-ups" in het <span className="text-brand-orange">dagelijks leven</span>
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="rounded-xl shadow-lg overflow-hidden order-2 lg:order-1">
              <img
                src={concentratieDagelijks}
                alt="Concentratietraining in het dagelijks leven"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                De tweede vorm van concentratietraining is niet gepland maar direct in het dagelijks leven toepassen van
                de oefening. Dit kan eigenlijk bij alle activiteiten die je doet. Bijvoorbeeld:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1 mr-3" />
                  <span className="text-xl md:text-2xl text-brand-gray-medium">
                    Terwijl je je tanden poetst bewust de sensaties van het poetsen opmerken.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1 mr-3" />
                  <span className="text-xl md:text-2xl text-brand-gray-medium">
                    Bij een gesprek actief luisteren naar wat de persoon zegt en niet al je weerwoord voorbereiden.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1 mr-3" />
                  <span className="text-xl md:text-2xl text-brand-gray-medium">
                    Tijdens het wandelen naar je werk bewust je omgeving waarnemen.
                  </span>
                </li>
              </ul>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Deze vorm van training helpt je om tijdens het werk beter te focussen en stress te herkennen voordat het
                escaleert.
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
                Het programma duurt 6 weken. Elke week krijgen deelnemers:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Clock className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1 mr-3" />
                  <span className="text-xl md:text-2xl text-brand-gray-medium">
                    Een groepssessie van 2 uur waar ze nieuwe vaardigheden leren en ervaringen delen.
                  </span>
                </li>
                <li className="flex items-start">
                  <FileText className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1 mr-3" />
                  <span className="text-xl md:text-2xl text-brand-gray-medium">
                    Een werkboek met achtergrondinformatie en praktische opdrachten voor die week.
                  </span>
                </li>
                <li className="flex items-start">
                  <Brain className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1 mr-3" />
                  <span className="text-xl md:text-2xl text-brand-gray-medium">
                    Wetenschappelijke theorie die uitlegt waarom deze methode werkt.
                  </span>
                </li>
              </ul>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                In de workshops komen deelnemers terug op de oefeningen van die week. Ze bespreken wat ging goed, waar
                liep je tegenaan? Door deze reflectie in een groep ontstaat er herkenning en leren deelnemers van
                elkaar.
              </p>
            </div>
            <div className="rounded-xl shadow-lg overflow-hidden">
              <img
                src={stressmanagementEnConcentratie}
                alt="Stressmanagement en concentratietraining"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Sectie met 3 Programma Buttons */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center space-y-8">
          <p className="text-xl md:text-2xl text-brand-gray-medium max-w-3xl mx-auto">
            Klaar om de methode ook echt toe te passen? Bekijk hier onze programma's.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Link
              to="/vitaliteitsprogramma"
              className="bg-brand-blue border-2 border-brand-blue p-6 rounded-lg hover:bg-brand-blue/90 transition-all duration-300 group"
            >
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-orange transition-colors">
                Vitaliteitsprogramma
              </h3>
              <p className="text-base text-white/90">Voor organisaties en werkgevers</p>
            </Link>
            <Link
              to="/stressmanagement-programma"
              className="bg-brand-blue border-2 border-brand-blue p-6 rounded-lg hover:bg-brand-blue/90 transition-all duration-300 group"
            >
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-orange transition-colors">
                Stressmanagement
              </h3>
              <p className="text-base text-white/90">Minder spanning & druk voor werknemers</p>
            </Link>
            <Link
              to="/prestatie-programma"
              className="bg-brand-blue border-2 border-brand-blue p-6 rounded-lg hover:bg-brand-blue/90 transition-all duration-300 group"
            >
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-orange transition-colors">
                Prestatieprogramma
              </h3>
              <p className="text-base text-white/90">Als werknemer beter presteren met meer focus</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Wetenschappelijke Bijlage Downloaden Sectie */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <Card className="max-w-4xl mx-auto p-8 bg-brand-blue">
            <div className="text-center space-y-6">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full">
                <FileText className="h-8 w-8 text-brand-orange" />
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Exclusief wetenschappelijk rapport
              </h2>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-white font-semibold max-w-3xl mx-auto">
                De resultaten van 40 jaar onderzoek naar aandachttraining.    
              </p>

              {/* Body */}
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                Zelf de wetenschappelijke details bekijken? Ons academische rapport bundelt de laatste studies, analyses
                en berekeningen rond de effecten van aandachttraining. Inclusief effectgroottes en pathway-analyses.
              </p>

              {/* Button */}
              <Button
                onClick={() => setIsLeadMagnetOpen(true)}
                className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold text-lg px-8 py-6"
              >
                <FileText className="mr-2 h-5 w-5" />
                Aanvragen rapport
              </Button>
            </div>
          </Card>
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
