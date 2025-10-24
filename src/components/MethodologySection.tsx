import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import autopilotImage from "@/assets/We_verliezen_aandacht_door_ons_beloning-_en_stresssysteem.png";
import neocortexImage from "@/assets/Meer_activiteit_in_neo_cortex_door_aandacht_training.png";
import performanceImage from "@/assets/burnout_voorkomen_en_beter_presteren_door_aandacht_training.png";
const MethodologySection = () => {
  return (
    <section className="section-padding bg-brand-off-white">
      <div className="container-custom space-y-24 md:space-y-32 lg:space-y-40">
        {/* Blok 1 - Het Probleem - Tekst boven, Visual onder */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight">
              De <span className="text-brand-orange">auto pilot</span> die onze aandacht kaapt
            </h2>
            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              In 2 miljoen jaar is ons brein geëvolueerd om dreigingen te vermijden én beloningen na te jagen. Het ziet
              helaas geen verschil tussen een leeuw en werkstress en tussen gezonde keuzes en snelle dopamine via social
              media. Hierdoor is tot 90% van ons gedrag automatisch en zijn we snel afgeleid.
            </p>
          </div>
          <div className="order-last">
            <img src={autopilotImage} alt="Grip op de automatische piloot" className="w-full h-auto rounded-lg" />
          </div>
        </div>

        {/* Blok 2 - De Methode - Tekst boven, Visual onder */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 lg:order-last">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight">
              Het vitaliteits{"\u00AD"}programma waar we <span className="text-brand-orange">aandacht trainen</span>
            </h2>
            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              Met het programma van InnerLeaps trainen mensen hun "aandachtsspier". Hiermee verbeterd de kracht en
              efficiëntie van de neocortex. Het "controlecentrum" voor rationele keuzes waarmee we focussen, sociale
              signalen opmerken en strategieën bedenken.
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
              <span className="text-brand-orange">Prestatie</span> verbeterd en het{" "}
              <span className="text-brand-orange">uitvalrisico</span> daalt met 70%
            </h2>
            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              Omdat deelnemers bewuster worden kunnen ze stress sneller herkennen, erover communiceren en ontdekken hoe
              ze hiervan kunnen herstellen. Zo ontwikkelen deelnemers eigenaarschap, wordt burn-out voorkomen en door
              verhoogde focus worden ze productiever.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📈</span>
                <span className="text-xl font-semibold text-brand-purple">6% hogere productiviteit</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">📉</span>
                <span className="text-xl font-semibold text-brand-purple">15-21% minder verzuim</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🛡️</span>
                <span className="text-xl font-semibold text-brand-purple">70% lager uitvalrisico</span>
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
        {/* Wetenschap CTA - Over volledige breedte gecentreerd */}
        <div className="text-center pt-12 space-y-6">
          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
            Wil je nog meer weten over de wetenschappelijke basis van onze methode?
          </p>
          <Link to="/wetenschap">
            <Button variant="secondary" className="font-semibold py-3 px-8 rounded-lg text-base md:text-lg">
              Ontdek de wetenschap
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default MethodologySection;
