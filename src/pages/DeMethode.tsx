import { useEffect } from "react";
import { Link } from "react-router-dom";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import StickyCtaButtons from "@/components/StickyCtaButtons";
import Footer from "@/components/Footer";
import concentratieOefening from "@/assets/Concentratietraining_oefening.png";
import concentratieDagelijks from "@/assets/Concentratietraining_in_het_dagelijks_leven.jpeg";
import concentratieWorkshop from "@/assets/Concentratietraining_theorie_in_workshop.png";
const DeMethode = () => {
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
            Geplande concentratietraining <span className="text-brand-orange">12 minuten</span> per dag
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
            Training in het <span className="text-brand-orange">dagelijks leven</span>
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
                Waar zijn je gedachten terwijl je tanden poetst? Of tijdens die meeting? Ons brein produceert constant
                gedachten. Soms is dat nuttig maar meestal willen we onze aandacht juist bewust richten.
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Scherp zijn bij die belangrijke meeting, met focus dat belangrijke rapport maken of juist even echt
                kunnen genieten tijdens dat ene momentje en niet denken aan dat ene vervelende moment.
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                En dat trainen we. Elke week worden deelnemers uitgedaagd hun aandacht bewust te richten op alledaagse
                activiteiten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Wekelijkse workshops */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-12">
            Wekelijkse <span className="text-brand-orange">groepsworkshops</span>, werkboek en theorie
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Echte gedragsverandering gebeurt niet vanzelf. Nieuwe patronen moeten inslijten, en dat kost tijd.
                Daarom duurt het programma 6 weken.
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                In de workshops en het werkboek krijgen deelnemers wetenschappelijke theorie en praktische uitleg.
                Waarom werkt aandachtstraining? Hoe reageert je brein op stress? Dit versterkt de motivatie.
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Door de groepsworkshops reflecteren deelnemers op hun ervaringen. En hier gebeurt iets heel waardevols:
                ze zien dat anderen ook worstelen met consequent oefenen en tijd vinden. Tegelijk delen ze strategieën
                die wél werken.
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

      {/* Programma's CTA Section */}
      <section className="section-padding bg-brand-off-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed max-w-3xl mx-auto">
              Klaar om de methode ook echt toe te passen? Bekijk hier onze programma's.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Vitaliteitsprogramma Button */}
            <Link 
              to="/vitaliteitsprogramma"
              className="group bg-white hover:bg-brand-blue transition-all duration-300 rounded-xl shadow-lg p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-brand-purple group-hover:text-white transition-colors duration-300 mb-4">
                Vitaliteits-programma
              </h3>
              <p className="text-brand-gray-medium group-hover:text-white/90 transition-colors duration-300">
                Voor organisaties en werkgevers
              </p>
            </Link>

            {/* Stressmanagement Button */}
            <Link 
              to="/stressmanagement-programma"
              className="group bg-white hover:bg-brand-blue transition-all duration-300 rounded-xl shadow-lg p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-brand-purple group-hover:text-white transition-colors duration-300 mb-4">
                Stress-management
              </h3>
              <p className="text-brand-gray-medium group-hover:text-white/90 transition-colors duration-300">
                Minder spanning & druk
              </p>
            </Link>

            {/* Prestatie Programma Button */}
            <Link 
              to="/prestatie-programma"
              className="group bg-white hover:bg-brand-blue transition-all duration-300 rounded-xl shadow-lg p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-brand-purple group-hover:text-white transition-colors duration-300 mb-4">
                Prestatie-programma
              </h3>
              <p className="text-brand-gray-medium group-hover:text-white/90 transition-colors duration-300">
                Met meer focus beter presteren
              </p>
            </Link>
          </div>
        </div>
      </section>

      <Footer showNavigation={false} />
    </div>
  );
};
export default DeMethode;
