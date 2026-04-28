import { memo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import trainingImage from "@/assets/training_voor_betere_prestatie_minder_stress_en_lager_verzuim.png";

const MethodologySection = memo(() => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom space-y-24 md:space-y-32 lg:space-y-40">
        {/* Blok 1 - De Methode */}
        <div className="space-y-8 lg:space-y-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-brand-purple leading-tight">
            Verlaag <span className="text-brand-orange">verzuim </span> én boost {""}
            <span className="text-brand-orange">prestaties</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                De kern van onze breintraning is het versterken van het "controlecentrum" voor rationele keuzes, focus
                en bewuste acties, en het "waarschuwingssysteem" dat stresssignalen eerder opmerkt. Het resultaat?
                Minder stress én een scherpe focus!
              </p>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                Wil je weten hoe de methode precies werkt?
              </p>
              <br></br>
              <Link to="/breintraining-methode">
                <Button variant="secondary" className="font-semibold py-3 px-8 rounded-lg text-base md:text-lg">
                  Ontdek de methode
                </Button>
              </Link>
            </div>
            <div>
              <img
                src={trainingImage}
                alt="Training voor betere prestatie minder stress en lager verzuim"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

MethodologySection.displayName = "MethodologySection";

export default MethodologySection;
