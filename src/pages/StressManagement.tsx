import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import TrainingPageLayout from "@/components/TrainingPageLayout";
import ResultatenBand, { type ResultatenBandStat } from "@/components/ResultatenBand";
import WerkgeverMailKnop from "@/components/WerkgeverMailKnop";
import heroBackground from "@/assets/Vitaliteitsprogramma_presentatie_Innerleaps.webp";
import heroPhoto1200 from "@/assets/hero-1200w.webp";
import heroPhoto800 from "@/assets/hero-800w.webp";
import heroPhotoFallback from "@/assets/hero-1200w.jpg";

/* Logo's in kleur op de lichte hero, allemaal op een transparante
   achtergrond: anders staat er een wit vlak op het beige. Holie Pizza en Den
   Haag staan hoger: een bijna vierkant beeldmerk met de naam klein eronder. */
import theydoKleur from "@/assets/Vitaliteitsprogramma_TheyDo_transparant.webp";
import holieKleur from "@/assets/Vitaliteitsprogramma_Holie_Pizza.webp";
import tele2Kleur from "@/assets/Vitaliteitsprogramma_Tele2_transparant.webp";
import vuKleur from "@/assets/Vitaliteitsprogramma_VU_amsterdam_transparant.webp";
import parnassiaKleur from "@/assets/Vitaliteitsprogramma_Parnassia_groep_transparant.webp";
import lentizKleur from "@/assets/Vitaliteitsprogramma_Lentiz.webp";
import denHaagKleur from "@/assets/Vitaliteitsprogramma_Gemeente_Den_Haag_transparant.webp";

const MEDEWERKER_LOGOS = [
  { src: theydoKleur, alt: "TheyDo", className: "h-7 lg:h-8" },
  { src: holieKleur, alt: "Holie Pizza", className: "h-10 lg:h-12" },
  { src: tele2Kleur, alt: "Tele2" },
  { src: vuKleur, alt: "VU Amsterdam" },
  { src: parnassiaKleur, alt: "Parnassia Groep", className: "h-7 lg:h-8" },
  { src: lentizKleur, alt: "Lentiz" },
  { src: denHaagKleur, alt: "Gemeente Den Haag", className: "h-12 lg:h-14" },
];

/*
 * De pagina voor medewerkers. Sinds 20 oktober 2026 één pagina in plaats van
 * twee: de stress- en de prestatiepagina zijn samengevoegd, en
 * /prestatie-training stuurt hierheen. Voorstel, keuzes en onderbouwing staan in
 * docs/voor-medewerkers.md.
 *
 * De lijn: binnenkomen op focus (de reden waarom mensen zich aanmelden),
 * waarmaken op rust (wat ze achteraf merken). Geen offerteknop maar een mail
 * aan de werkgever, want de lezer is de medewerker, niet de koper.
 */

const kop = "text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight";
const oranje = [<span className="text-brand-orange" />];

interface Punt {
  title: string;
  text: string;
}

interface Citaat {
  text: string;
  by: string;
}

/** "Al eens een app geprobeerd?" Het bezwaar van de grootste groep: begonnen en gestopt. */
const VolhoudenBlok = () => {
  const { t } = useTranslation("training");
  const punten = t("stress.sticks.items", { returnObjects: true }) as Punt[];

  return (
    <section className="py-16 md:py-24 bg-brand-purple text-white">
      <div className="container mx-auto px-4">
        <h2 className={`${kop} text-white mb-6`}>
          <Trans i18nKey="stress.sticks.title" t={t} components={oranje} />
        </h2>
        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/85 text-center leading-relaxed mb-12">
          {t("stress.sticks.intro")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {punten.map((punt) => (
            <div key={punt.title} className="bg-white/10 rounded-xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-brand-orange">{punt.title}</h3>
              <p className="mt-3 text-xl text-white/90 leading-relaxed">{punt.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/** Wie er meedoet, en daarna de groep en de trainer. Komt na de effectkaarten. */
const MensenBlok = () => {
  const { t } = useTranslation("training");
  const citaten = t("stress.group.quotes", { returnObjects: true }) as Citaat[];

  return (
    <>
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className={`${kop} text-brand-purple mb-8 text-balance`}>
            <Trans i18nKey="stress.whoJoins.title" t={t} components={oranje} />
          </h2>
          <p className="max-w-4xl mx-auto text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
            {t("stress.whoJoins.text")}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-off-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className={`${kop} text-brand-purple mb-8 text-balance`}>
            <Trans i18nKey="stress.group.title" t={t} components={oranje} />
          </h2>
          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
            {t("stress.group.text")}
          </p>
        </div>
        {/* Twee citaten naast elkaar: over de groep en over de trainer. */}
        <div className="container mx-auto px-4 max-w-5xl mt-10 grid gap-6 md:grid-cols-2">
          {citaten.map((citaat) => (
            <figure key={citaat.text} className="bg-white rounded-xl p-6 md:p-8 shadow-lg text-left flex flex-col">
              <blockquote className="text-xl md:text-2xl italic text-brand-purple leading-relaxed">
                &ldquo;{citaat.text}&rdquo;
              </blockquote>
              <figcaption className="mt-auto pt-4 text-lg text-brand-gray-medium">{citaat.by}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
};

const StressManagement = () => {
  const location = useLocation();
  const { t } = useTranslation("training");
  const { t: tCommon } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <TrainingPageLayout
      tKey="stress"
      heroImage={heroBackground}
      heroImageAlt={tCommon("hero.photoAlt")}
      // De foto van home. Die is alleen daar in gebruik; de masterclassfoto
      // staat al verderop op deze pagina, in het masterclassblok.
      heroPhoto={{
        srcSet: `${heroPhoto800} 800w, ${heroPhoto1200} 1200w`,
        fallback: heroPhotoFallback,
        width: 1200,
        height: 1500,
        alt: tCommon("hero.photoAlt"),
        className: "aspect-[4/3] lg:aspect-[4/5] object-cover object-[50%_45%] lg:object-[50%_40%] -scale-x-100",
      }}
      heroPrimaryAction={<WerkgeverMailKnop positie="hero" />}
      // De klantcase is geschreven voor de koper, niet voor de deelnemer.
      heroSecondaryLink={null}
      // De quote op de foto is van de CEO van TheyDo en gaat over productiviteit.
      heroHideQuote
      logos={[]}
      heroLogos={MEDEWERKER_LOGOS}
      heroColourLogos
      afterHero={
        <ResultatenBand
          stats={t("stress.statsBand.items", { returnObjects: true }) as ResultatenBandStat[]}
          source={t("stress.statsBand.source")}
        />
      }
      afterChallenges={<VolhoudenBlok />}
      afterResults={<MensenBlok />}
      hideProgramOverview
      hideParticipantResults
      hideWhyChooseUs
      weeksLayout="stacked"
      // De zwevende balk met de mailknop in plaats van de offerteknop.
      stickyAction={({ tabIndex }) => <WerkgeverMailKnop positie="sticky" tabIndex={tabIndex} />}
      showMethodCtaAfterWeeks
      // Het masterclassblok legt uit hoe het via de werkgever loopt: de
      // medewerker stelt ons voor, wij komen gratis langs, wie wil doet mee.
      masterclassTexts={{ ns: "training", prefix: "stress.introSteps" }}
      masterclassAction={<WerkgeverMailKnop positie="onderaan" />}
    />
  );
};

export default StressManagement;
