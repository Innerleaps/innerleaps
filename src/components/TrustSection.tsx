import { Check } from "lucide-react";
import vmbLogo from "@/assets/Geaccrediteerde_vitaliteitstrainers_bij_Innerleaps.png";
import uMassLogo from "@/assets/Vitaliteitsprogramma_ontwikkeld_door_university_of_massachusetts.png";
import oxfordLogo from "@/assets/Vitaliteitsprogramma_ontwikkeld_door_oxford.jpg";
import vgzLogo from "@/assets/Vitaliteitprogramma_herkent_door_vgz.png";
import achmeaLogo from "@/assets/Vitaliteitprogramma_herkent_door_zilveren_kruis_achmea.svg";
import czLogo from "@/assets/Vitaliteitsprogramma_herkend_door_CZ.png";
import uvaLogo from "@/assets/Aandachttraining_aan_de_universiteit_van_amsterdam_new.png";
import menzisLogo from "@/assets/Vitaliteitsprogramma_herkend_door_menzis.png";

const TrustSection = () => {
  const trustItems = [
    {
      title: "Herkend door het Nederlandse zorgsysteem",
      description:
        "De uitgebreide variant van ons programma wordt vergoed vanuit basisverzekering door Nederlandse zorgverzekeraars.",
      logos: [
        { src: achmeaLogo, alt: "Vitaliteits\u00ADprogramma herkend door Zilveren Kruis Achmea", className: "h-24" },
        { src: vgzLogo, alt: "Vitaliteits\u00ADprogramma herkend door VGZ", className: "h-24" },
        { src: czLogo, alt: "Vitaliteits\u00ADprogramma herkend door CZ", className: "h-24" },
        { src: menzisLogo, alt: "Vitaliteits\u00ADprogramma herkend door Menzis", className: "h-20" },
      ],
    },
    {
      title: "40 jaar wetenschappelijk onderzoek",
      description:
        "Gebaseerd op de wetenschappelijke MBSR-methode, een van de best onderzochte interventies wereldwijd.",
      logos: [
        {
          src: oxfordLogo,
          alt: "Vitaliteits\u00ADprogramma ontwikkeld door Oxford University",
          className: "h-24 rounded border border-border",
        },
        { src: uMassLogo, alt: "Vitaliteits\u00ADprogramma ontwikkeld door University of Massachusetts", className: "h-24" },
        { src: uvaLogo, alt: "Aandacht\u00ADtraining aan de Universiteit van Amsterdam", className: "h-24" },
      ],
    },
    {
      title: "VMBN gecertificeerd",
      description:
        "Al onze trainers zijn VMBN categorie 1 gecertificeerd, de hoogste erkenning binnen de VMBN. Dit betekent dat zij voldoen aan de strengste kwaliteitseisen op het gebied van opleiding, ervaring en professionaliteit.",
      logos: [{ src: vmbLogo, alt: "Geaccrediteerde vitaliteitstrainers bij InnerLeaps", className: "h-32" }],
    },
  ];

  return (
    <section className="bg-brand-off-white section-padding">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-12">
          Waarom organisaties voor <span className="text-brand-orange">ons kiezen</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {trustItems.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
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
};

export default TrustSection;
