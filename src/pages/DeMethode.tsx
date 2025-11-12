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
            Op onze wetenschap pagina leggen we uit dat deelnemers hun controlecentrum trainen met pushups voor hun brein. Maar wat zijn die push-ups nou precies? Dat leggen we hier uit.
          </p>
          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed text-center max-w-4xl mx-auto mt-6">
            wekelijkse workshops, een werkboek en wetenschappelijke theorie hoe het werkt. Dit motiveert, maar het échte trainen gebeurt door de deelnemers zelf: gepland op vaste momenten én geïntegreerd in het dagelijks leven.
          </p>
        </div>
      </section>

      {/* Section 1: Geplande training */}
      <section className="section-padding bg-brand-off-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-12">
            1) Geplande training <span className="text-brand-orange">12 minuten</span> per dag
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Zittend of liggend volgen deelnemers elke dag een begeleidende audio-opname. Deze duurt zo'n 12 minuten. De instructie is simpel: richt je aandacht op je ademhaling of andere lichamelijke ervaringen.
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Klinkt makkelijk? Je geest vindt er niks aan. Binnen een paar seconden denk je aan het avondeten, je to-do's of dat lastige gesprek. Je vergeet volledig wat je aan het doen was.
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Probeer het zelf maar eens. Sluit je ogen en richt je aandacht op je ademhaling. Hoelang duurt het voordat je aan iets anders denkt?
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Dit is de crux van de oefening: het moment dat je opmerkt dat je bent afgedwaald, dát is de push-up. Je brengt je focus terug naar je ademhaling. Opnieuw. En opnieuw. Dit versterkt je concentratie zoals push-ups je spieren versterken.
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Maar er gebeurt meer. Door te oefenen leer je gedachten herkennen, je "ziet" wat je denkt. Hierdoor merk je het snel op als je aan het piekeren bent of stressvolle gedachten. Ook herken je spanning in je lichaam sneller doordat je oefent met lichamelijke ervaringen. Je merkt bijvoorbeeld op dat je schouders gespannen zijn of dat je ademhaling oppervlakkig is. Omdat je spanning vroegtijdig herkent, kun je je stress reguleren in plaats van erdoor overrompeld te worden.
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Natuurlijk krijg je hierdoor meer rust in je hoofd en minder spanning in je lijf, maar door minder spanning wordt ook scherper. Je krijgt een sterkere focus, maakt minder fouten. Je prestaties gaan er echt op vooruit.
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
            2) Training in het <span className="text-brand-orange">Dagelijks Leven</span>
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="aspect-square bg-gray-200 rounded-xl shadow-lg flex items-center justify-center order-2 lg:order-1">
              <p className="text-xl text-gray-500 font-medium">Afbeelding komt hier</p>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Waar zijn je gedachten terwijl je tanden poetst? Of tijdens die meeting? Ben je écht aanwezig of plan je alvast je volgende taak? Pak je automatisch een snack terwijl je eigenlijk niet hongerig bent? Sta je opeens de was te doen? Vergeet je wel eens wat je wilde zeggen?
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Dit is heel normaal. Ons brein produceert constant gedachten. Soms is dat nuttig: de beste ideeën ontstaan spontaan. Maar meestal willen we onze aandacht juist bewust kunnen richten. Scherp zijn bij die belangrijke meeting, met focus dat belangrijke rapport maken of juist even echt kunnen genieten tijdens dat ene momentje en niet denken aan werk of die ruzie.
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                En dat trainen we. Elke week worden deelnemers uitgedaagd hun aandacht bewust te richten op alledaagse activiteiten. Bijvoorbeeld tijdens het eten: wat proef je? Welke textuur ervaar je? Of tijdens het lopen naar je volgende afspraak: voel je je voeten de grond raken?
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Deelnemers kiezen zelf activiteiten die ze met volledige aandacht uitvoeren. Het maakt niet uit wát de activiteit is, het doel is het trainen van het aandachtssysteem in het echte leven. Zodat je op die momenten die ertoe doen bewust en scherp bent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Wekelijkse workshops */}
      <section className="section-padding bg-brand-off-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple text-center mb-12">
            3) Wekelijkse <span className="text-brand-orange">groepsworkshops</span>, werkboek en theorie
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Echte gedragsverandering gebeurt niet vanzelf. Nieuwe patronen moeten inslijten, en dat kost tijd. Daarom duurt het programma 6 weken. Deelnemers proberen hun vaste oefen momenten te plannen: wanneer en waar gaan ze oefenen? Deze afspraak met zichzelf in combinatie met de wekelijkse groepsworkshops is dé "stok achter de deur" om écht te oefenen.
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                In de workshops en het werkboek krijgen deelnemers wetenschappelijke theorie en praktische uitleg. Waarom werkt aandachtstraining? Hoe reageert je brein op stress? Dit versterkt de motivatie. Deelnemers begrijpen waarom oefenen impact heeft op hun stress en prestaties.
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Door de groepsworkshops reflecteren deelnemers op hun ervaringen. En hier gebeurt iets heel waardevols: ze zien dat anderen ook worstelen met consequent oefenen en tijd vinden. Tegelijk delen ze strategieën die wél werken. Deelnemers merken dat ze er niet alleen voor staan, en dat helpt.
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Het groepsproces versterkt de individuele training. Samen sterk, maar je eigen hersenen doen het werk.
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
