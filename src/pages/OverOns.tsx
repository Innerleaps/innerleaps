import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import StickyCtaButtons from "@/components/StickyCtaButtons";
import BookingBlock from "@/components/BookingBlock";
import BookingIntro from "@/components/BookingIntro";
import { BAS_PHOTO, scrollToBookingWidget } from "@/lib/booking";
import TrustSection from "@/components/TrustSection";

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import PageSeo from "@/components/PageSeo";
import { useTranslation } from "react-i18next";

// Trainer photos
import winekePhoto from "@/assets/Vitaliteitstrainer_Wineke_van_Aken.webp";
import annePhoto from "@/assets/Vitaliteitstrainer_Anne_Linnebank.webp";
import davePhoto from "@/assets/Vitaliteitstrainer_Dave_Hoppema.webp";
import jacquelinePhoto from "@/assets/Vitaliteitstrainer_Jacqueline_Henock.webp";

// Badges
import vmbnBadge from "@/assets/Aaccreditatie_voor_Vitaliteitsprogramma.webp";
import waaromWijAfbeelding from "@/assets/waarom_wij_dit_werk_doen.webp";

// Wineke's logos
import winekeOliverLogo from "@/assets/Vitaliteitsprogramma_Oliver_Wyman.webp";
import winekeSygnificLogo from "@/assets/Vitaliteitsprogramma_Sygnific.webp";
import winekeCordaanLogo from "@/assets/Vitaliteitsprogramma_Cordaan.webp";
import winekeGemeenteLogo from "@/assets/Vitaliteitsprogramma_Gemeente_Den_Haag.webp";
import winekeSpiritLogo from "@/assets/Vitaliteitsprogramma_Spirit.webp";
import winekeVULogo from "@/assets/Vitaliteitsprogramma_VU_amsterdam.webp";
import winekeLeaseLogo from "@/assets/Vitaliteitsprogramma_Leaseplan.webp";
import winekeTele2Logo from "@/assets/Vitaliteitsprogramma_Tele2.webp";

// Dave's logos
import daveParnassiaLogo from "@/assets/Vitaliteitsprogramma_Parnassia_groep.webp";
import daveLentizLogo from "@/assets/Vitaliteitsprogramma_Lentiz.webp";
import davePrimoLogo from "@/assets/Vitaliteitsprogramma_primo-2.webp";
import daveMinisterieLogo from "@/assets/Vitaliteitsprogramma_Ministerie_van_justitie_en_veiligheid-2.webp";
import daveYouTalentLogo from "@/assets/Vitaliteitsprogramma_You_Talent-3.webp";
import daveRijksLogo from "@/assets/Vitaliteitsprogramma_Rijkswaterstaat-3.webp";
import davePolitieLogo from "@/assets/Vitaliteitsprogramma_Politite-4.webp";

// Anne's logos
import dhlLogo from "@/assets/Vitaliteitsprogramma_DHL-2.webp";
import affiniusLogo from "@/assets/Vitaliteitsprogramma_Affinius_Capital-2.webp";

// Jacqueline's logos
import jacquelineGGZLogo from "@/assets/Vitaliteitsprogramma_GGZ_centraal.webp";
import jacquelineHumanitasLogo from "@/assets/Vitaliteitsprogramma_Humanitas.webp";
import jacquelinePlevierLogo from "@/assets/Vitaliteitsprogramma_Plevier.webp";
import jacquelineCarelLogo from "@/assets/Vitaliteitsprogramma_Carel_Lurvink.webp";
import jacquelinePALogo from "@/assets/Vitaliteitsprogramma_PA_consulting-3.webp";
import jacquelineNobelLogo from "@/assets/Vitaliteitsprogramma_nobel_recruitment-3.webp";
import jacquelineHollandLogo from "@/assets/Vitaliteitsprogramma_Holland_Colours-3.webp";

const OverOns = () => {
  const { t } = useTranslation("overons");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const trainers = [
    {
      key: "wineke",
      name: "Wineke van Aken",
      photo: winekePhoto,
      languages: [t("languages.nl"), t("languages.en")],
      logos: [
        { src: winekeOliverLogo, alt: "Vitaliteitstraining Oliver Wyman" },
        { src: winekeSygnificLogo, alt: "Vitaliteitstraining Sygnific" },
        { src: winekeCordaanLogo, alt: "Vitaliteitstraining Cordaan" },
        { src: winekeGemeenteLogo, alt: "Vitaliteitstraining Gemeente Den Haag" },
        { src: winekeSpiritLogo, alt: "Vitaliteitstraining Spirit" },
        { src: winekeVULogo, alt: "Vitaliteitstraining VU Amsterdam" },
        { src: winekeLeaseLogo, alt: "Vitaliteitstraining Leaseplan" },
        { src: winekeTele2Logo, alt: "Vitaliteitstraining Tele2" },
      ],
    },
    {
      key: "dave",
      name: "Dave Hoppema",
      photo: davePhoto,
      languages: [t("languages.nl"), t("languages.en")],
      logos: [
        { src: daveParnassiaLogo, alt: "Vitaliteitstraining Parnassia Groep" },
        { src: daveLentizLogo, alt: "Vitaliteitstraining Lentiz" },
        { src: davePrimoLogo, alt: "Vitaliteitstraining Primo" },
        { src: daveMinisterieLogo, alt: "Vitaliteitstraining Ministerie van Justitie en Veiligheid" },
        { src: daveYouTalentLogo, alt: "Vitaliteitstraining You Talent" },
        { src: daveRijksLogo, alt: "Vitaliteitstraining Rijkswaterstaat" },
        { src: davePolitieLogo, alt: "Vitaliteitstraining Politie" },
      ],
    },
    {
      key: "anne",
      name: "Anne Linnebank",
      photo: annePhoto,
      languages: [t("languages.nl"), t("languages.en")],
      logos: [
        { src: dhlLogo, alt: "Vitaliteitstraining DHL" },
        { src: affiniusLogo, alt: "Vitaliteitstraining Affinius Capital" },
      ],
    },
    {
      key: "jacqueline",
      name: "Jacqueline Henock",
      photo: jacquelinePhoto,
      languages: [t("languages.nl")],
      logos: [
        { src: jacquelineGGZLogo, alt: "Vitaliteitstraining GGZ Centraal" },
        { src: jacquelineHumanitasLogo, alt: "Vitaliteitstraining Humanitas" },
        { src: jacquelinePlevierLogo, alt: "Vitaliteitstraining Plevier Speciaal Onderwijs" },
        { src: jacquelineCarelLogo, alt: "Vitaliteitstraining Carel Lurvink Industry" },
        { src: jacquelinePALogo, alt: "Vitaliteitstraining PA Consulting" },
        { src: jacquelineNobelLogo, alt: "Vitaliteitstraining Nobel Recruitment" },
        { src: jacquelineHollandLogo, alt: "Vitaliteitstraining Holland Colours" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageSeo title={t("meta.title")} description={t("meta.description")} />
      <SimplifiedNavigation />
      <StickyCtaButtons />

      <main>
        {/* Sectie 1: Visie & Missie */}
        <section className="section-padding bg-brand-off-white">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight mb-8 text-center">
              <span className="text-brand-orange">{t("vision.title1")}</span> {t("vision.titleAccent")}
            </h1>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-4 text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                <p>{t("vision.body1")}</p>
                <p>{t("vision.body2")}</p>
              </div>

              <div>
                <img
                  src={waaromWijAfbeelding}
                  alt={t("vision.imageAlt")}
                  className="w-full h-auto rounded-xl shadow-lg"
                  loading="lazy"
                  width="608"
                  height="405"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sectie 2: Onze trainers */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight mb-12 text-center">
              {t("trainersSection.titlePrefix")} <span className="text-brand-orange">{t("trainersSection.titleAccent")}</span> {t("trainersSection.titleSuffix")}
            </h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
              {trainers.map((trainer, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-purple text-center">{trainer.name}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4 flex flex-col items-center">
                      <img
                        src={trainer.photo}
                        alt={`Vitaliteitstrainer ${trainer.name}`}
                        className="rounded-full w-40 h-40 object-cover shadow-md"
                      />

                      <div className="flex gap-4 items-center justify-center flex-wrap">
                        <img
                          src={vmbnBadge}
                          alt={t("trainersSection.vmbnAlt")}
                          className="h-16 object-contain"
                        />
                        <div className="flex gap-2 flex-wrap">
                          {trainer.languages.map((lang, langIndex) => (
                            <span
                              key={langIndex}
                              className="px-3 py-1 rounded-full text-base font-medium bg-brand-orange text-white"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-brand-off-white p-4 rounded-lg border-l-4 border-brand-orange h-full flex items-center">
                        <p className="text-base md:text-lg italic text-brand-gray-medium leading-snug">
                          "{t(`trainers.${trainer.key}.quote`)}"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-brand-gray-light">
                    <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">{t(`trainers.${trainer.key}.body`)}</p>
                  </div>

                  <div className="flex gap-5 items-center justify-center pt-4 border-t border-brand-gray-light flex-wrap">
                    {trainer.logos.map((logo, i) => (
                      <img key={i} src={logo.src} alt={logo.alt} className="h-[50px] object-contain" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sectie 3: Bas's verhaal */}
        <section className="section-padding bg-brand-off-white">
          <div className="container-custom">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight mb-12 text-center">
              {t("story.titlePrefix")} <span className="text-brand-orange">{t("story.titleAccent")}</span>
            </h2>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="space-y-4 text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                <p>{t("story.body1")}</p>
                <p>{t("story.body2")}</p>
                <p className="italic">{t("story.quote")}</p>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <img
                  src={BAS_PHOTO}
                  alt={t("story.photoAlt")}
                  className="rounded-full w-64 h-64 object-cover shadow-xl"
                />
                <p className="text-xl md:text-2xl font-semibold text-brand-purple text-center">
                  {t("story.role")}
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto font-semibold py-4 px-6 lg:px-8 rounded-lg text-lg lg:text-xl"
                  onClick={() => scrollToBookingWidget()}
                >
                  {t("story.cta")}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Boekingswidget direct onder het verhaal van Bas. Dat is het punt waar
          het vertrouwen op deze pagina het hoogst is, en de knop hierboven staat
          er vlak bij, zodat de sprong naar het anker klein blijft. TrustSection
          komt eronder als geruststelling voor wie nog niet klikt. */}
      <section className="section-padding bg-brand-off-white">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <BookingIntro as="h2" className="mb-8" />
          </div>
          {/* Diep op de pagina, dus de agenda laadt pas als je in de buurt komt. */}
          <BookingBlock eager={false} />
        </div>
      </section>

      <TrustSection />
      <Footer />
    </div>
  );
};

export default OverOns;
