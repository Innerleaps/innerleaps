import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import StickyCtaButtons from '@/components/StickyCtaButtons';
import ROICalculator from '@/components/ROICalculator';
import Footer from '@/components/Footer';
import { Brain, Heart, Shield, CheckCircle } from 'lucide-react';
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
      title: "Neocortex (rationele keuzes)",
      color: "text-brand-blue",
      bgColor: "bg-brand-blue/5",
      points: [
        "Denkt na, plant, maakt doordachte beslissingen",
        "Zorgt voor situationeel bewustzijn, verdeelt taken en prioriteert",
        "Maar onder stress? Uitgeschakeld"
      ]
    },
    {
      number: 2,
      icon: Heart,
      title: "Limbisch systeem (beloningen najagen)",
      color: "text-brand-orange",
      bgColor: "bg-brand-orange/5",
      points: [
        "Verwerkt emoties, geheugen, motivatie en genot",
        "Jaagt constant op beloningen: dopamine, erkenning, afleidende content",
        "Handelt snel, niet altijd slim. Kiest directe beloning boven het lange termijn"
      ]
    },
    {
      number: 3,
      icon: Shield,
      title: "Reptielenbrein (dreigingen vermijden)",
      color: "text-brand-purple",
      bgColor: "bg-brand-purple/5",
      points: [
        "Beschermt tegen gevaar maar maakt geen onderscheid tussen fysieke bedreiging en moderne stressoren",
        "Zoals reputatieverlies, gebrek aan controle of onzekerheid"
      ]
    }
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
              De automatische piloot, ons beschermingsmechanisme
            </h2>
            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              In 2 miljoen jaar is ons brein geëvolueerd om twee dingen te doen: dreigingen vermijden én beloningen najagen. 
              Helaas ziet het geen verschil tussen een leeuw en werkstress, en de sterke behoefte naar dopamine leidt ons af. 
              Hierdoor is tot 90% van ons gedrag onbewust en zeker onder stress neemt onze auto pilot het over. Dat leidt tot 
              ongezonde keuzes, impulsieve reacties en afleiding. Dit komt door drie systemen:
            </p>
          </div>

          {/* Drie kolommen met iconen */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {brainSystems.map((system) => {
              const IconComponent = system.icon;
              return (
                <div key={system.number} className="flex flex-col space-y-4 bg-brand-off-white p-6 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${system.bgColor}`}>
                      <IconComponent className={`h-8 w-8 ${system.color} stroke-2`} />
                    </div>
                    <span className={`text-2xl font-bold ${system.color}`}>{system.number}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-brand-gray-dark leading-tight">
                    {system.title}
                  </h3>
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    {system.points.map((point, idx) => (
                      <li key={idx} className="text-base md:text-lg text-brand-gray-medium leading-relaxed">
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
              Het vitaliteit en performance programma waar we <span className="text-brand-orange">aandacht trainen</span>
            </h2>
            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              In ons vitaliteit- en effectiviteit programma trainen deelnemers hun aandacht. Net zoals je spieren traint 
              in de sportschool, train je hier je focus. Hiermee neemt de activiteit in de neocortex toe. Tegelijkertijd 
              vraagt deze minder energie. De neocortex is het "controlecentrum" voor:
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-3 mb-12">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
              <span className="text-lg md:text-xl text-brand-gray-dark">Emoties regulatie</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
              <span className="text-lg md:text-xl text-brand-gray-dark">Bewust reageren op sociale signalen</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-brand-orange stroke-2 flex-shrink-0 mt-1" />
              <span className="text-lg md:text-xl text-brand-gray-dark">Strategieën bedenken en prioriteren</span>
            </div>
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
              <span className="text-brand-orange">Burn-out voorkomen</span> én <span className="text-brand-orange">prestaties verhogen</span>
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

          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              Omdat deelnemers met ons programma bewuster worden en hun automatische piloot afschakelen zullen ze:
            </p>

            <ul className="space-y-4">
              <li className="text-lg md:text-xl text-brand-gray-dark">
                <span className="font-semibold">Stress vroeg herkennen</span> – en bijsturen voordat het escaleert
              </li>
              <li className="text-lg md:text-xl text-brand-gray-dark">
                <span className="font-semibold">Beter herstellen</span> – sneller terug naar optimale prestatie
              </li>
              <li className="text-lg md:text-xl text-brand-gray-dark">
                <span className="font-semibold">In de prestatie sweet spot blijven</span> – waar focus, energie en prestatie hoog zijn
              </li>
            </ul>

            <div className="pt-8">
              <h3 className="text-2xl md:text-3xl font-bold text-brand-gray-dark mb-6 text-center">
                Het resultaat in cijfers:
              </h3>
              <div className="space-y-4 bg-brand-off-white p-8 rounded-lg">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">🛡️</span>
                  <div>
                    <p className="text-xl md:text-2xl font-semibold text-brand-gray-dark">70% lager uitvalrisico</p>
                    <p className="text-base md:text-lg text-brand-gray-medium">Burn-out wordt voorkomen</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-4xl">📈</span>
                  <div>
                    <p className="text-xl md:text-2xl font-semibold text-brand-gray-dark">+6% meer productiviteit</p>
                    <p className="text-base md:text-lg text-brand-gray-medium">Mensen werken effectiever, niet harder</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-4xl">📉</span>
                  <div>
                    <p className="text-xl md:text-2xl font-semibold text-brand-gray-dark">15-21% minder verzuim</p>
                    <p className="text-base md:text-lg text-brand-gray-medium">Minder ziektedagen, lagere kosten</p>
                  </div>
                </div>
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
