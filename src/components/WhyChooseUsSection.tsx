import { memo } from "react";
import { useTranslation } from "react-i18next";
import oxfordLogo from "@/assets/oxford-logo-transparent.webp";
import uMassLogo from "@/assets/Vitaliteitsprogramma_ontwikkeld_door_university_of_massachusetts.webp";
import uvaLogo from "@/assets/Aandachttraining_aan_de_universiteit_van_amsterdam_new.webp";
import vmbnLogo from "@/assets/vmbn-trainer-categorie-1.webp";

/**
 * Oxford staat hier als transparante variant. De versie in
 * Vitaliteitsprogramma_ontwikkeld_door_oxford.webp heeft een donkerblauw vlak
 * eromheen; grijs gefilterd wordt dat een grauw blok naast twee losse logo's.
 */
const PILL_KEYS = ["liveHour", "daily", "workHours"] as const;

const WhyChooseUsSection = memo(() => {
  const { t } = useTranslation();

  const logoClass =
    "h-6 lg:h-[26px] w-auto object-contain grayscale opacity-80 hover:opacity-100 transition-opacity";

  return (
    <section className="section-padding bg-brand-off-white">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-12">
          {t("whyChooseUs.headlinePart1")}{" "}
          <span className="text-brand-orange">{t("whyChooseUs.headlinePart2")}</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="min-w-0 flex flex-col bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-brand-orange lg:whitespace-nowrap">
              {t("whyChooseUs.cards.format.title")}
            </h3>
            <p className="mt-2 text-xl font-bold text-brand-purple">
              {t("whyChooseUs.cards.format.stat")}
            </p>
            <p className="mt-3 text-xl text-brand-gray-medium leading-relaxed">
              {t("whyChooseUs.cards.format.body")}
            </p>
            <div className="mt-auto pt-6 lg:min-h-[160px]">
              <p className="uppercase tracking-wide text-base text-brand-gray-medium border-t border-gray-200 pt-4">
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
            <h3 className="text-2xl font-bold text-brand-orange lg:whitespace-nowrap">
              {t("whyChooseUs.cards.research.title")}
            </h3>
            <p className="mt-2 text-xl font-bold text-brand-purple">
              {t("whyChooseUs.cards.research.stat")}
            </p>
            <p className="mt-3 text-xl text-brand-gray-medium leading-relaxed">
              {t("whyChooseUs.cards.research.body")}
            </p>
            <div className="mt-auto pt-6 lg:min-h-[160px]">
              <p className="uppercase tracking-wide text-base text-brand-gray-medium border-t border-gray-200 pt-4">
                {t("whyChooseUs.cards.research.proofLabel")}
              </p>
              <div className="mt-4 flex flex-row flex-wrap items-center gap-4">
                <img
                  src={oxfordLogo}
                  alt={t("trust.altPrefix.oxford")}
                  loading="lazy"
                  width={1500}
                  height={443}
                  className={logoClass}
                />
                <img
                  src={uMassLogo}
                  alt={t("trust.altPrefix.umass")}
                  loading="lazy"
                  width={787}
                  height={314}
                  className={logoClass}
                />
                <img
                  src={uvaLogo}
                  alt={t("trust.altPrefix.uva")}
                  loading="lazy"
                  width={1920}
                  height={572}
                  className={logoClass}
                />
              </div>
            </div>
          </div>

          <div className="min-w-0 flex flex-col bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-brand-orange lg:whitespace-nowrap">
              {t("whyChooseUs.cards.trainers.title")}
            </h3>
            <p className="mt-2 text-xl font-bold text-brand-purple">
              {t("whyChooseUs.cards.trainers.stat")}
            </p>
            <p className="mt-3 text-xl text-brand-gray-medium leading-relaxed">
              {t("whyChooseUs.cards.trainers.body")}
            </p>
            <div className="mt-auto pt-6 lg:min-h-[160px]">
              <p className="uppercase tracking-wide text-base text-brand-gray-medium border-t border-gray-200 pt-4">
                {t("whyChooseUs.cards.trainers.proofLabel")}
              </p>
              <div className="mt-4 flex flex-row flex-wrap items-center gap-4">
                <img
                  src={vmbnLogo}
                  alt={t("trust.altPrefix.vmbn")}
                  loading="lazy"
                  width={286}
                  height={208}
                  className={logoClass}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

WhyChooseUsSection.displayName = "WhyChooseUsSection";

export default WhyChooseUsSection;
