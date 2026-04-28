import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import vmbnLogo from "@/assets/vmbn-trainer-categorie-1.png";
import uMassLogo from "@/assets/Vitaliteitsprogramma_ontwikkeld_door_university_of_massachusetts.png";
import oxfordLogo from "@/assets/Vitaliteitsprogramma_ontwikkeld_door_oxford.jpg";
import vgzLogo from "@/assets/Vitaliteitprogramma_herkent_door_vgz.png";
import czLogo from "@/assets/Vitaliteitsprogramma_herkend_door_CZ.png";
import uvaLogo from "@/assets/Aandachttraining_aan_de_universiteit_van_amsterdam_new.png";
import menzisLogo from "@/assets/Vitaliteitsprogramma_herkend_door_menzis.png";

interface TrustSectionProps {
  variant?: "white" | "off-white";
}

const TrustSection = memo(({ variant = "white" }: TrustSectionProps) => {
  const { t } = useTranslation();
  const sectionBg = variant === "off-white" ? "bg-brand-off-white" : "bg-white";
  const cardBg = variant === "off-white" ? "bg-white" : "bg-brand-off-white";

  const trustItems = [
    {
      title: t('trust.items.healthcareSystem.title'),
      description: t('trust.items.healthcareSystem.description'),
      logos: [
        { src: vgzLogo, alt: t('trust.altPrefix.vgz'), className: "h-24" },
        { src: czLogo, alt: t('trust.altPrefix.cz'), className: "h-24" },
        { src: menzisLogo, alt: t('trust.altPrefix.menzis'), className: "h-20" },
      ],
    },
    {
      title: t('trust.items.research.title'),
      description: t('trust.items.research.description'),
      logos: [
        { src: oxfordLogo, alt: t('trust.altPrefix.oxford'), className: "h-24 rounded" },
        { src: uMassLogo, alt: t('trust.altPrefix.umass'), className: "h-24" },
        { src: uvaLogo, alt: t('trust.altPrefix.uva'), className: "h-24" },
      ],
    },
    {
      title: t('trust.items.trainers.title'),
      description: t('trust.items.trainers.description'),
      logos: [{ src: vmbnLogo, alt: t('trust.altPrefix.vmbn'), className: "h-28" }],
    },
  ];

  return (
    <section className={`${sectionBg} section-padding`}>
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-12">
          {t('trust.headlinePart1')} <span className="text-brand-orange">{t('trust.headlinePart2')}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {trustItems.map((item, index) => (
            <div key={index} className={`${cardBg} p-8 rounded-xl shadow-lg`}>
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
