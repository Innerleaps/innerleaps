import { memo } from "react";
import { Check } from "lucide-react";
import { trustItems } from "@/data/trustLogos";

const TrustSection = memo(() => {

  return (
    <section className="bg-white section-padding">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-12">
          Waarom organisaties voor <span className="text-brand-orange">ons kiezen</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {trustItems.map((item, index) => (
            <div key={index} className="bg-brand-off-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start space-x-3 mb-4">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-6 w-6 text-brand-orange stroke-[3]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-brand-purple mb-3">{item.title}</h3>
                  <p className="text-xl text-brand-gray-medium leading-relaxed mb-6">{item.description}</p>
                  <div className="flex flex-row gap-4 items-center flex-wrap">
                     {item.logos.map((logo, logoIndex) => (
                      <img
                        key={logoIndex}
                        src={logo.src}
                        alt={logo.alt}
                        loading="lazy"
                        className={`object-contain ${logo.className}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

TrustSection.displayName = 'TrustSection';

export default TrustSection;
