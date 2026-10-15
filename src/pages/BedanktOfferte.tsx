import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import Footer from "@/components/Footer";
import PageSeo from "@/components/PageSeo";
import BedanktBooking from "@/components/BedanktBooking";
import { leesOfferteOverdracht, type RapportOverdracht } from "@/lib/bedankt";
import { meldOfferteaanvraag } from "@/lib/conversies";

/**
 * De bedanktpagina van de offerteaanvraag.
 *
 * Bewust een eigen pagina en geen doorverwijzing naar /contact. Die pagina is
 * gebouwd voor wie nog niets gedaan heeft: agenda, berichtformulier,
 * rekentool. Wie net een offerte aanvroeg zou daar weer een formulier zien en
 * zich afvragen of de aanvraag wel aankwam. En een eigen URL maakt van de
 * offerte een eigen conversie, los van gewone berichten.
 *
 * Bovenaan alleen de belofte dat Bas binnen een werkdag contact opneemt. Dat
 * hij dan een gesprek voorstelt staat er met opzet niet: dat doet hij aan de
 * telefoon. Daaronder de agenda, voor wie liever meteen zelf een moment kiest.
 * Mensen die direct na een formulier kunnen boeken, doen dat veel vaker dan
 * mensen die eerst gebeld moeten worden.
 */
const BedanktOfferte = () => {
  const { t } = useTranslation("bedankt");
  // Zie BedanktRoi: meteen lezen, niet in een effect.
  const [overdracht] = useState<RapportOverdracht | null>(() => leesOfferteOverdracht());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!overdracht) return;
    meldOfferteaanvraag({ id: overdracht.id, emailHash: overdracht.emailHash });
  }, [overdracht]);

  return (
    <div className="min-h-screen bg-brand-gray-light">
      <PageSeo title={t("offerte.metaTitle")} description={t("offerte.intro")} noindex />
      <SimplifiedNavigation />

      <main>
        {/* Krap gehouden, zodat de agenda eronder zo hoog mogelijk begint. */}
        <section className="bg-brand-off-white pt-8 md:pt-12">
          <div className="container-custom">
            <h1 className="text-3xl font-bold leading-tight text-brand-purple md:text-4xl lg:text-5xl">
              <Trans i18nKey="offerte.title" t={t} components={[<span className="text-brand-orange" />]} />
            </h1>
            <p className="mt-4 text-xl leading-relaxed text-brand-gray-medium">{t("offerte.intro")}</p>
          </div>
        </section>

        <BedanktBooking
          title={<Trans i18nKey="offerte.booking.title" t={t} components={[<span className="text-brand-orange" />]} />}
          intro={t("offerte.booking.intro")}
        />
      </main>

      <Footer />
    </div>
  );
};

export default BedanktOfferte;
