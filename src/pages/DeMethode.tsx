import { useEffect } from "react";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import StickyCtaButtons from "@/components/StickyCtaButtons";
import Footer from "@/components/Footer";
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
            <div className="aspect-square bg-gray-200 rounded-xl shadow-lg flex items-center justify-center">
              <p className="text-xl text-gray-500 font-medium">Afbeelding komt hier</p>
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
            <div className="aspect-square bg-gray-200 rounded-xl shadow-lg flex items-center justify-center order-2 lg:order-1">
              <p className="text-xl text-gray-500 font-medium">Afbeelding komt hier</p>
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
            3) Wekelijkse <span className="text-brand-orange">groepsworkshops</span>, werkboek en theorie
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
            <div className="aspect-square bg-gray-200 rounded-xl shadow-lg flex items-center justify-center">
              <p className="text-xl text-gray-500 font-medium">Afbeelding komt hier</p>
            </div>
          </div>
        </div>
      </section>

      <Footer showNavigation={false} />
    </div>
  );
};
export default DeMethode;
