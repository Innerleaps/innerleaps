// Trust section logo data
import vmbLogo from "@/assets/Geaccrediteerde_vitaliteitstrainers_bij_Innerleaps.png";
import uMassLogo from "@/assets/Vitaliteitsprogramma_ontwikkeld_door_university_of_massachusetts.png";
import oxfordLogo from "@/assets/Vitaliteitsprogramma_ontwikkeld_door_oxford.jpg";
import vgzLogo from "@/assets/Vitaliteitprogramma_herkent_door_vgz.png";
import czLogo from "@/assets/Vitaliteitsprogramma_herkend_door_CZ.png";
import uvaLogo from "@/assets/Aandachttraining_aan_de_universiteit_van_amsterdam_new.png";
import menzisLogo from "@/assets/Vitaliteitsprogramma_herkend_door_menzis.png";

export const trustItems = [
  {
    title: "Onderliggende methode erkend door Nederlandse zorgsysteem",
    description:
      "De uitgebreide variant van ons programma wordt vergoed vanuit basisverzekering door Nederlandse zorgverzekeraars.",
    logos: [
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
