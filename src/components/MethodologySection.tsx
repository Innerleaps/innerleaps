import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import trainingImage from "@/assets/training_voor_betere_prestatie_minder_stress_en_lager_verzuim.png";
const MethodologySection = () => {
  return (
    <section className="section-padding bg-brand-off-white">
      <div className="container-custom space-y-24 md:space-y-32 lg:space-y-40">
        {/* Blok 1 - De Methode */}
        <div className="space-y-8 lg:space-y-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-brand-purple leading-tight">
            Verlaag <span className="text-brand-orange">verzuim </span> én boost
            <span className="text-brand-orange">prestaties</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                De kern van onze methode is het trainen van de “aandachtsspier”. Zo versterken deelnemers de Neocortex,
                het breindeel dat fungeert als "controlecentrum" voor rationele keuzes, focus en het bewust opmerken van
                stresssignalen. Het resultaat is minder stress, lager verzuim en betere prestaties.{" "}
              <br /><br />
              
                Het trainen van je brein klinkt bijna te mooi om waar te zijn maar meer dan 40 jaar wetenschappelijk
                onderzoek bewijst dat het écht werkt en niet zo’n klein beetje ook.
              </p>
            </div>
            <div>
              <img
                src={trainingImage}
                alt="Training voor betere prestatie minder stress en lager verzuim"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
          {/* Wetenschap CTA - Over volledige breedte gecentreerd */}
          <div className="text-center pt-12 space-y-6">
            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              Wil je nog meer weten over de wetenschappelijke basis van onze methode?
            </p>
            <br />
            <Link to="/wetenschap">
              <Button variant="secondary" className="font-semibold py-3 px-8 rounded-lg text-base md:text-lg">
                Ontdek de wetenschap
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MethodologySection;
