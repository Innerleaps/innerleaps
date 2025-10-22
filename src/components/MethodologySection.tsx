import autopilotImage from '@/assets/Grip_op_de_automatische_piloot.png';
import neocortexImage from '@/assets/Meer_activiteit_in_neo_cortex_door_aandacht_training.png';
import performanceImage from '@/assets/burnout_voorkomen_en_beter_presteren_door_aandacht_training.png';

const MethodologySection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom space-y-24 md:space-y-32 lg:space-y-40">
        {/* Blok 1 - Het Probleem - Tekst boven, Visual onder */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight">
              De <span className="text-brand-orange">automatische piloot</span> die jullie geld kost
            </h2>
            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              Tot 90% van ons gedrag is onbewust. Ons oerbrein maakt automatische keuzes om ons te beschermen, terwijl er vaak geen echte bedreiging is. Wij leren mensen in stresssituaties bewust te handelen. Hierdoor ontstaan gezondere keuzes en effectievere samenwerking, ook zonder stress.
            </p>
          </div>
          <div className="order-last">
            <img 
              src={autopilotImage} 
              alt="Grip op de automatische piloot" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        {/* Blok 2 - De Methode - Tekst boven, Visual onder */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 lg:order-last">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight">
              Het vitaliteitsprogramma waar we <span className="text-brand-orange">aandacht trainen</span>
            </h2>
            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              Deelnemers trainen mensen hun "aandachtsspier". Dit verhoogt de activiteit in de neocortex én laat deze efficiënter werken. Dit gebied is het "controlecentrum" dat stress vroeg signaleert, focus verbetert en impulsieve reacties voorkomt.
            </p>
          </div>
          <div>
            <img 
              src={neocortexImage} 
              alt="Meer activiteit in neo cortex door aandacht training" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        {/* Blok 3 - Het Resultaat - Tekst boven, Visual onder */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight">
              <span className="text-brand-orange">Prestatie</span> verbeterd en het <span className="text-brand-orange">uitvalrisico</span> daalt met 70%
            </h2>
            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              Deelnemers leren stress te herkennen, erover te communiceren en ontdekken hoe ze hiervan kunnen herstellen. Zo ontwikkelen ze eigenaarschap, blijven ze productief, betrokken en tevreden en wordt burn-out voorkomen.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📈</span>
                <span className="text-xl font-semibold text-brand-orange">6% hogere productiviteit</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">📉</span>
                <span className="text-xl font-semibold text-brand-orange">15-21% minder verzuim</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🛡️</span>
                <span className="text-xl font-semibold text-brand-orange">70% lager uitvalrisico</span>
              </div>
            </div>
          </div>
          <div className="order-last">
            <img 
              src={performanceImage} 
              alt="Burnout voorkomen en beter presteren door aandacht training" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
