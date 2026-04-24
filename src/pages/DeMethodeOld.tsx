import { useEffect } from "react";
import { Link } from "react-router-dom";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import StickyCtaButtons from "@/components/StickyCtaButtons";
import Footer from "@/components/Footer";
import concentratieOefening from "@/assets/Concentratietraining_oefening.png";
import concentratieDagelijks from "@/assets/Concentratietraining_in_het_dagelijks_leven.jpeg";
import concentratieWorkshop from "@/assets/Concentratietraining_theorie_in_workshop.png";
const DeMethodeOld = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <SimplifiedNavigation />
      <StickyCtaButtons />

      {/* Hero Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight text-center mb-8">
            De <span className="text-brand-orange">Push-ups</span> voor je Brein
          </h1>
          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed text-center max-w-4xl mx-auto">
            Op onze wetenschap pagina leggen we uit dat deelnemers hun controlecentrum trainen met pushups voor hun
            brein. Maar wat zijn die push-ups nou precies? Dat leggen we hier uit.
          </p>
        </div>
      </section>

      {/* Section 1: Geplande training */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-12">
            <span className="text-brand-orange">Geplande</span> concentratietraining
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

      {/* Section 2: Training in Dagelijks Leven */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-12">
            Concentratietraining in het <span className="text-brand-orange">dagelijks leven</span>
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
                  <span className="text-brand-orange text-2xl mr-3">•</span>
                  <span className="text-xl md:text-2xl text-brand-gray-medium">
                    Terwijl je je tanden poetst bewust de sensaties van het poetsen opmerken.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange text-2xl mr-3">•</span>
                  <span className="text-xl md:text-2xl text-brand-gray-medium">
                    Bij een gesprek actief luisteren naar wat de persoon zegt en niet al je weerwoord voorbereiden.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange text-2xl mr-3">•</span>
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

      {/* Section 3: Wekelijkse workshops */}
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
                  <span className="text-brand-orange text-2xl mr-3">•</span>
                  <span className="text-xl md:text-2xl text-brand-gray-medium">
                    Een groepssessie van 2 uur waar ze nieuwe vaardigheden leren en ervaringen delen.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange text-2xl mr-3">•</span>
                  <span className="text-xl md:text-2xl text-brand-gray-medium">
                    Een werkboek met achtergrondinformatie en praktische opdrachten voor die week.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange text-2xl mr-3">•</span>
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
                src={concentratieWorkshop}
                alt="Concentratietraining theorie in workshop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple">Waar ben jij naar op zoek?</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Link
              to="/stressmanagement-training"
              className="bg-white border-2 border-brand-blue p-8 rounded-lg hover:shadow-xl transition-all duration-300 group"
            >
              <h3 className="text-2xl font-bold text-brand-purple mb-4 group-hover:text-brand-blue transition-colors">
                Minder spanning & druk in mijn leven
              </h3>
              <p className="text-lg text-brand-gray-medium">Leer stress herkennen voordat het escaleert</p>
            </Link>
            <Link
              to="/prestatie-training"
              className="bg-white border-2 border-brand-orange p-8 rounded-lg hover:shadow-xl transition-all duration-300 group"
            >
              <h3 className="text-2xl font-bold text-brand-purple mb-4 group-hover:text-brand-orange transition-colors">
                Met meer focus beter presteren
              </h3>
              <p className="text-lg text-brand-gray-medium">Versterk je concentratie en productiviteit</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DeMethodeOld;
