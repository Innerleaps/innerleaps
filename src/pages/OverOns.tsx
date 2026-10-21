import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import StickyCtaButtons from "@/components/StickyCtaButtons";
import BookingBlock from "@/components/BookingBlock";
import BookingIntro from "@/components/BookingIntro";
import { BAS_PHOTO, scrollToBookingWidget } from "@/lib/booking";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import PageSeo from "@/components/PageSeo";
import { Trans, useTranslation } from "react-i18next";
import { Languages } from "lucide-react";

// Trainer photos
import winekePhoto from "@/assets/Vitaliteitstrainer_Wineke_van_Aken.webp";
import annePhoto from "@/assets/Vitaliteitstrainer_Anne_Linnebank.webp";
import davePhoto from "@/assets/Vitaliteitstrainer_Dave_Hoppema.webp";
import jacquelinePhoto from "@/assets/Vitaliteitstrainer_Jacqueline_Henock.webp";

// Badges. Alleen het ovaal: "Trainer categorie 1" eronder is op labelformaat
// onleesbaar.
import vmbnOvaal from "@/assets/Aaccreditatie_voor_Vitaliteitsprogramma_ovaal.webp";
import waaromWijAfbeelding from "@/assets/waarom_wij_dit_werk_doen.webp";
import solarMonkeyTeam from "@/assets/solar-monkey-team.webp";

// Wineke's logos. In trainerlogos/ staan ze in kleur op een doorzichtige
// achtergrond en strak bijgesneden, gemaakt voor de lichte kaarten hier: wit
// in een logo neemt de kleur van de kaart aan. DHL is de rode letters zonder
// het gele vlak, Humanitas de blauwe letters zonder het blauwe vlak. De
// originelen staan ook op andere pagina's en blijven zoals ze zijn.
import winekeTheydoLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_TheyDo.webp";
import winekeOliverLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_Oliver_Wyman.webp";
import winekeSygnificLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_Sygnific.webp";
import winekeCordaanLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_Cordaan.webp";
import winekeGemeenteLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_Gemeente_Den_Haag.webp";
import winekeSpiritLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_Spirit.webp";
import winekeVULogo from "@/assets/trainerlogos/Vitaliteitsprogramma_VU_amsterdam.webp";
import winekeLeaseLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_Leaseplan.webp";
import winekeTele2Logo from "@/assets/trainerlogos/Vitaliteitsprogramma_Tele2.webp";

// Dave's logos
import daveParnassiaLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_Parnassia_groep.webp";
import daveLentizLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_Lentiz.webp";
import davePrimoLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_Primo.webp";
import daveMinisterieLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_Ministerie_van_Justitie_en_Veiligheid.webp";
import daveYouTalentLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_You_Talent.webp";
import daveRijksLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_Rijkswaterstaat.webp";
import davePolitieLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_Politie.webp";

// Anne's logos
import dhlLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_DHL.webp";
import affiniusLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_Affinius_Capital.webp";

// Jacqueline's logos
import jacquelineGGZLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_GGZ_centraal.webp";
import jacquelineHumanitasLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_Humanitas.webp";
import jacquelinePlevierLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_Plevier.webp";
import jacquelineCarelLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_Carel_Lurvink.webp";
import jacquelinePALogo from "@/assets/trainerlogos/Vitaliteitsprogramma_PA_consulting.webp";
import jacquelineNobelLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_Nobel_recruitment.webp";
import jacquelineHollandLogo from "@/assets/trainerlogos/Vitaliteitsprogramma_Holland_Colours.webp";

/* Elk logo krijgt ongeveer hetzelfde oppervlak, niet dezelfde hoogte. Bij een
   vaste hoogte werd Oliver Wyman (7 keer zo breed als hoog) een balk over de
   halve kaart en het wapen van Den Haag een postzegel. Zo oogt elk logo even
   zwaar. Breedte en hoogte zijn die van het bestand, voor de verhouding. */
const LOGO_OPPERVLAK = 2800;
const LOGO_MAX_HOOGTE = 44;

const logoBreedte = (width: number, height: number) => {
  const verhouding = width / height;
  const hoogte = Math.min(LOGO_MAX_HOOGTE, Math.sqrt(LOGO_OPPERVLAK / verhouding));
  return Math.round(hoogte * verhouding);
};

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
      languages: t("languages.nlEn"),
      logos: [
        // TheyDo voorop: Wineke gaf daar de training, en voor scale-ups is dat het sterkste bewijs.
        { src: winekeTheydoLogo, alt: "TheyDo", width: 201, height: 100 },
        { src: winekeOliverLogo, alt: "Vitaliteitstraining Oliver Wyman", width: 674, height: 95 },
        { src: winekeSygnificLogo, alt: "Vitaliteitstraining Sygnific", width: 116, height: 57 },
        { src: winekeCordaanLogo, alt: "Vitaliteitstraining Cordaan", width: 105, height: 75 },
        { src: winekeGemeenteLogo, alt: "Vitaliteitstraining Gemeente Den Haag", width: 101, height: 96 },
        { src: winekeSpiritLogo, alt: "Vitaliteitstraining Spirit", width: 358, height: 100 },
        { src: winekeVULogo, alt: "Vitaliteitstraining VU Amsterdam", width: 296, height: 72 },
        { src: winekeLeaseLogo, alt: "Vitaliteitstraining Leaseplan", width: 171, height: 95 },
        { src: winekeTele2Logo, alt: "Vitaliteitstraining Tele2", width: 248, height: 95 },
      ],
    },
    {
      key: "dave",
      name: "Dave Hoppema",
      photo: davePhoto,
      languages: t("languages.nlEn"),
      logos: [
        { src: daveParnassiaLogo, alt: "Vitaliteitstraining Parnassia Groep", width: 226, height: 85 },
        { src: daveLentizLogo, alt: "Vitaliteitstraining Lentiz", width: 314, height: 100 },
        { src: davePrimoLogo, alt: "Vitaliteitstraining Primo", width: 208, height: 100 },
        { src: daveMinisterieLogo, alt: "Vitaliteitstraining Ministerie van Justitie en Veiligheid", width: 195, height: 100 },
        { src: daveYouTalentLogo, alt: "Vitaliteitstraining You Talent", width: 164, height: 100 },
        { src: daveRijksLogo, alt: "Vitaliteitstraining Rijkswaterstaat", width: 259, height: 98 },
        { src: davePolitieLogo, alt: "Vitaliteitstraining Politie", width: 269, height: 98 },
      ],
    },
    {
      key: "anne",
      name: "Anne Linnebank",
      photo: annePhoto,
      languages: t("languages.nlEn"),
      logos: [
        { src: dhlLogo, alt: "Vitaliteitstraining DHL", width: 202, height: 28 },
        { src: affiniusLogo, alt: "Vitaliteitstraining Affinius Capital", width: 100, height: 100 },
      ],
    },
    {
      key: "jacqueline",
      name: "Jacqueline Henock",
      photo: jacquelinePhoto,
      languages: t("languages.nl"),
      logos: [
        { src: jacquelineGGZLogo, alt: "Vitaliteitstraining GGZ Centraal", width: 217, height: 90 },
        { src: jacquelineHumanitasLogo, alt: "Vitaliteitstraining Humanitas", width: 212, height: 35 },
        { src: jacquelinePlevierLogo, alt: "Vitaliteitstraining Plevier Speciaal Onderwijs", width: 144, height: 100 },
        { src: jacquelineCarelLogo, alt: "Vitaliteitstraining Carel Lurvink Industry", width: 122, height: 100 },
        { src: jacquelinePALogo, alt: "Vitaliteitstraining PA Consulting", width: 112, height: 100 },
        { src: jacquelineNobelLogo, alt: "Vitaliteitstraining Nobel Recruitment", width: 328, height: 100 },
        { src: jacquelineHollandLogo, alt: "Vitaliteitstraining Holland Colours", width: 162, height: 90 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageSeo title={t("meta.title")} description={t("meta.description")} />
      <SimplifiedNavigation />
      <StickyCtaButtons />

      <main>
        {/* Sectie 1: het verhaal van Bas. Bovenaan, omdat de lezer hier komt om te
            checken wie we zijn. Zie docs/over-ons.md. */}
        <section className="section-padding bg-brand-off-white">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight mb-6">
                <Trans i18nKey="hero.title" t={t} components={[<span className="text-brand-orange" />]} />
              </h1>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">{t("hero.subtitle")}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="space-y-4 text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                {(t("story.body", { returnObjects: true }) as string[]).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* De teamfoto laat zien waar het verhaal speelt. Op een foto met 45
                  mensen herken je Bas niet, dus zijn eigen foto staat klein bij zijn naam. */}
              <div className="flex flex-col items-center space-y-6">
                <figure className="w-full">
                  <img
                    src={solarMonkeyTeam}
                    alt={t("story.teamPhotoAlt")}
                    className="w-full h-auto rounded-xl shadow-lg"
                    width="1024"
                    height="576"
                  />
                  {/* Klein en schuin, zodat het als onderschrift leest en niet als
                      doorlopende tekst. */}
                  <figcaption className="mt-2 text-base italic text-brand-gray-medium/80 text-center">
                    {t("story.photoCaption")}
                  </figcaption>
                </figure>
                <div className="flex items-center gap-4">
                  <img
                    src={BAS_PHOTO}
                    alt={t("story.photoAlt")}
                    className="rounded-full w-20 h-20 object-cover shadow-md"
                  />
                  <p className="text-xl md:text-2xl font-semibold text-brand-purple">
                    {t("story.role")}
                  </p>
                </div>
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

        {/* Sectie 2: waar we in geloven */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight mb-8">
                <Trans i18nKey="belief.title" t={t} components={[<span className="text-brand-orange" />]} />
              </h2>
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">{t("belief.body")}</p>
            </div>
          </div>
        </section>

        {/* Sectie 3: voor wie we het doen */}
        <section className="section-padding bg-brand-off-white">
          <div className="container-custom">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight mb-12 text-center">
              <Trans i18nKey="mission.title" t={t} components={[<span className="text-brand-orange" />]} />
            </h2>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">{t("mission.body")}</p>
              <img
                src={waaromWijAfbeelding}
                alt={t("mission.imageAlt")}
                className="w-full h-auto rounded-xl shadow-lg"
                loading="lazy"
                width="608"
                height="405"
              />
            </div>
          </div>
        </section>

        {/* Sectie 4: onze trainers */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight mb-12 text-center">
              {t("trainersSection.titlePrefix")} <span className="text-brand-orange">{t("trainersSection.titleAccent")}</span> {t("trainersSection.titleSuffix")}
            </h2>
            {/* Op brede schermen delen de twee kaarten in een rij hun regels
                (subgrid): kop, bio en logo's beginnen naast elkaar op dezelfde
                hoogte, ook als de ene bio langer is dan de andere. */}
            <div className="grid gap-8 lg:grid-cols-2">
              {trainers.map((trainer) => (
                <article
                  key={trainer.key}
                  className="flex flex-col gap-6 rounded-2xl bg-brand-off-white p-6 sm:p-8 lg:grid lg:[grid-template-rows:subgrid] lg:row-span-3"
                >
                  {/* Op mobiel staan de labels onder foto en naam, anders passen
                      ze niet naast de foto. */}
                  <div className="grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-4">
                    <img
                      src={trainer.photo}
                      alt={`Vitaliteitstrainer ${trainer.name}`}
                      className="h-24 w-24 rounded-full object-cover shadow-md ring-4 ring-white sm:row-span-2 sm:h-28 sm:w-28"
                    />
                    <h3 className="text-2xl md:text-3xl font-bold text-brand-purple sm:self-end">{trainer.name}</h3>
                    <ul className="col-span-2 flex flex-wrap gap-2 sm:col-span-1 sm:self-start">
                      <li className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-lg font-semibold text-brand-purple">
                        <img src={vmbnOvaal} alt="" className="h-6 w-auto" width="283" height="168" />
                        {t("trainersSection.accredited")}
                      </li>
                      <li className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-lg font-semibold text-brand-purple">
                        <Languages className="h-5 w-5 text-brand-orange" aria-hidden="true" />
                        {trainer.languages}
                      </li>
                    </ul>
                  </div>

                  <p className="text-xl text-brand-gray-medium leading-relaxed">{t(`trainers.${trainer.key}.body`)}</p>

                  <div className="self-start w-full border-t border-brand-purple/10 pt-6">
                    <p className="text-base font-semibold uppercase tracking-wide text-brand-gray-medium">
                      {t("trainersSection.logosLabel")}
                    </p>
                    <ul className="mt-4 grid grid-cols-3 gap-x-4 gap-y-5 sm:grid-cols-4 sm:gap-x-6">
                      {trainer.logos.map((logo) => (
                        <li key={logo.alt} className="flex h-12 items-center justify-center">
                          <img
                            src={logo.src}
                            alt={logo.alt}
                            width={logo.width}
                            height={logo.height}
                            style={{ width: logoBreedte(logo.width, logo.height) }}
                            className="h-auto max-w-full"
                            loading="lazy"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Boekingswidget onder de trainers: wie tot hier leest, weet wie we zijn en
          wie er voor het team staat. De knop bij het verhaal bovenaan scrolt
          hierheen. "Waarom organisaties voor ons kiezen" komt eronder als
          geruststelling voor wie nog niet klikt. */}
      <section className="section-padding bg-brand-off-white">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <BookingIntro as="h2" className="mb-8" />
          </div>
          {/* Diep op de pagina, dus de agenda laadt pas als je in de buurt komt. */}
          <BookingBlock eager={false} />
        </div>
      </section>

      <WhyChooseUsSection background="white" />
      <Footer />
    </div>
  );
};

export default OverOns;
