import { memo } from "react";
import { useTranslation } from "react-i18next";
import BookingCtaButton from "@/components/BookingCtaButton";
import oxfordLogo from "@/assets/oxford-logo-transparent.webp";
import uMassLogo from "@/assets/Vitaliteitsprogramma_ontwikkeld_door_university_of_massachusetts.webp";
import uvaLogo from "@/assets/Aandachttraining_aan_de_universiteit_van_amsterdam_new.webp";
import vmbnLogo from "@/assets/vmbn-trainer-categorie-1.webp";

/**
 * Oxford staat hier als transparante variant. De versie in
 * Vitaliteitsprogramma_ontwikkeld_door_oxford.webp heeft een donkerblauw vlak
 * eromheen, en dat wordt een zwaar blok naast twee losse logo's.
 *
 * De logo's staan in hun eigen kleuren, op verzoek van Bas (20-10-2026). Grijs
 * en half doorzichtig maakte ze klein en vaal.
 *
 * Hoogtes op gelijk visueel gewicht, niet op gelijke hoogte: hetzelfde getal
 * maakte UMass (drie regels tekst) groot en de UvA (klein wapen, dunne
 * letters) klein. Gemeten aan de hoeveelheid inkt per logo horen Oxford en
 * UMass ongeveer even hoog; de UvA een slag hoger, want met zijn dunne letters
 * oogde hij toch het kleinst. Daarom delen ze de rij naar breedte (zie
 * hieronder). VMBN is bijna vierkant en stond op 75 pixels, drie keer zo hoog
 * als de universiteiten. Op 44 (34 op lg) oogt hij even groot en is "Trainer
 * categorie 1" nog te lezen. Beide logorijen zijn minstens 56 pixels hoog en
 * verticaal gecentreerd, zodat de logo's in de twee kaarten op één lijn staan.
 */
const PILL_KEYS = ["liveHour", "daily", "workHours"] as const;

const LOGO_RIJ = "min-h-[56px] flex items-center";

interface WhyChooseUsSectionProps {
  /** Sluit dit blok af met "Plan 20 minuten met Bas". */
  bookingCta?: boolean;
  /** Wit als de sectie erboven al off-white is. De kaarten blijven wit met schaduw. */
  background?: "off-white" | "white";
}

const WhyChooseUsSection = memo(({ bookingCta = false, background = "off-white" }: WhyChooseUsSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className={`section-padding ${background === "white" ? "bg-white" : "bg-brand-off-white"}`}>
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-12">
          {t("whyChooseUs.headlinePart1")}{" "}
          <span className="text-brand-orange">{t("whyChooseUs.headlinePart2")}</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="min-w-0 flex flex-col bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-brand-orange xl:whitespace-nowrap">
              {t("whyChooseUs.cards.format.title")}
            </h3>
            <p className="mt-2 text-xl font-bold text-brand-purple">
              {t("whyChooseUs.cards.format.stat")}
            </p>
            <p className="mt-3 text-xl text-brand-gray-medium leading-relaxed">
              {t("whyChooseUs.cards.format.body")}
            </p>
            <div className="mt-auto pt-6 lg:min-h-[160px]">
              <p className="text-lg font-semibold text-brand-gray-dark border-t border-gray-200 pt-4">
                {t("whyChooseUs.cards.format.proofLabel")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {PILL_KEYS.map((key) => (
                  <span
                    key={key}
                    className="bg-brand-orange/10 text-brand-purple rounded-full px-3 py-1 text-base font-semibold"
                  >
                    {t(`whyChooseUs.cards.format.pills.${key}`)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0 flex flex-col bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-brand-orange xl:whitespace-nowrap">
              {t("whyChooseUs.cards.research.title")}
            </h3>
            <p className="mt-2 text-xl font-bold text-brand-purple">
              {t("whyChooseUs.cards.research.stat")}
            </p>
            <p className="mt-3 text-xl text-brand-gray-medium leading-relaxed">
              {t("whyChooseUs.cards.research.body")}
            </p>
            <div className="mt-auto pt-6 lg:min-h-[160px]">
              <p className="text-lg font-semibold text-brand-gray-dark border-t border-gray-200 pt-4">
                {t("whyChooseUs.cards.research.proofLabel")}
              </p>
              {/* De drie delen de rij naar breedte, 88 : 70 : 104. Zo staan ze
                  altijd op één regel en houden ze dezelfde verhouding: op een
                  kaart van 1280 pixels worden ze 27, 29 en 32 hoog, op 1024
                  (waar de kaart maar 235 pixels binnenruimte heeft) 20, 22 en
                  24. Met vaste hoogtes viel de UvA daar naar een tweede regel.
                  Niet breder dan 304 pixels, anders worden ze op een tablet,
                  waar de kaarten de volle breedte hebben, veel te groot. */}
              <div className={`mt-4 ${LOGO_RIJ} gap-4 w-full max-w-[304px]`}>
                <img
                  src={oxfordLogo}
                  alt={t("trust.altPrefix.oxford")}
                  loading="lazy"
                  width={1500}
                  height={443}
                  className="flex-[88_1_0%] min-w-0 h-auto"
                />
                <img
                  src={uMassLogo}
                  alt={t("trust.altPrefix.umass")}
                  loading="lazy"
                  width={787}
                  height={314}
                  className="flex-[70_1_0%] min-w-0 h-auto"
                />
                <img
                  src={uvaLogo}
                  alt={t("trust.altPrefix.uva")}
                  loading="lazy"
                  width={1920}
                  height={572}
                  className="flex-[104_1_0%] min-w-0 h-auto"
                />
              </div>
            </div>
          </div>

          <div className="min-w-0 flex flex-col bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-brand-orange xl:whitespace-nowrap">
              {t("whyChooseUs.cards.trainers.title")}
            </h3>
            <p className="mt-2 text-xl font-bold text-brand-purple">
              {t("whyChooseUs.cards.trainers.stat")}
            </p>
            <p className="mt-3 text-xl text-brand-gray-medium leading-relaxed">
              {t("whyChooseUs.cards.trainers.body")}
            </p>
            <div className="mt-auto pt-6 lg:min-h-[160px]">
              <p className="text-lg font-semibold text-brand-gray-dark border-t border-gray-200 pt-4">
                {t("whyChooseUs.cards.trainers.proofLabel")}
              </p>
              <div className={`mt-4 ${LOGO_RIJ}`}>
                <img
                  src={vmbnLogo}
                  alt={t("trust.altPrefix.vmbn")}
                  loading="lazy"
                  width={286}
                  height={208}
                  // Schaalt mee met de universiteiten, die op lg kleiner zijn.
                  className="h-11 lg:h-[34px] xl:h-11 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {bookingCta && <BookingCtaButton className="mt-12" />}
      </div>
    </section>
  );
});

WhyChooseUsSection.displayName = "WhyChooseUsSection";

export default WhyChooseUsSection;
