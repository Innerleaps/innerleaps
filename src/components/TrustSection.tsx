import { memo } from "react";
import { Award } from "lucide-react";

const TrustSection = memo(() => {
  return (
    <section className="bg-white section-padding">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-12">
          Geaccrediteerde <span className="text-brand-orange">Trainers</span>
        </h2>

        <div className="max-w-2xl mx-auto">
          <div className="bg-brand-off-white p-8 rounded-xl shadow-lg text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-brand-orange/10">
                <Award className="h-16 w-16 text-brand-orange stroke-[1.5]" />
              </div>
            </div>
            <p className="text-xl text-brand-gray-medium leading-relaxed">
              Al onze trainers zijn VMBN categorie 1 gecertificeerd, de hoogste erkenning binnen de VMBN. Dit betekent dat zij voldoen aan de strengste kwaliteitseisen op het gebied van opleiding, ervaring en professionaliteit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

TrustSection.displayName = 'TrustSection';

export default TrustSection;
