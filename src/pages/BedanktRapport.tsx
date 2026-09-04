import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import Footer from "@/components/Footer";
import PageSeo from "@/components/PageSeo";
import BedanktBooking from "@/components/BedanktBooking";
import { Button } from "@/components/ui/button";
import { scrollNaarAfspraak } from "@/lib/booking";
import { leesRapportOverdracht, type RapportOverdracht } from "@/lib/bedankt";
import { meldRapportLead } from "@/lib/conversies";

/**
 * De bedanktpagina van het wetenschappelijk rapport.
 *
 * Dit is een andere lead dan de rekentool en hoort dus een andere
 * conversieactie te worden. Vijf velden zonder één bedrijfscijfer tegenover
 * acht velden met verzuim, personeelsomvang en salaris. Meet je ze als
 * hetzelfde, dan stuurt Smart Bidding naar de goedkoopste van de twee.
 *
 * De bezoeker wacht hier op een mail en heeft verder niets te doen. Daarom
 * staan de drie onderzoekscijfers erbij: die overbruggen het wachten, geven
 * alvast de kern weg en maken de kans groter dat de mail ook echt geopend
 * wordt. Ze komen uit dezelfde sleutels als de rekentool, zodat de percentages
 * niet op twee plekken uit elkaar kunnen lopen.
 */
const BedanktRapport = () => {
  const { t } = useTranslation("bedankt");
  const { t: tCalculator } = useTranslation("calculator");
  // Zie BedanktRoi: meteen lezen, niet in een effect.
  const [overdracht] = useState<RapportOverdracht | null>(() => leesRapportOverdracht());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!overdracht) return;
    meldRapportLead({ id: overdracht.id, emailHash: overdracht.emailHash });
  }, [overdracht]);

  return (
    <div className="min-h-screen bg-brand-gray-light">
      <PageSeo title={t("rapport.metaTitle")} description={t("rapport.intro")} noindex />
      <SimplifiedNavigation />

      <main>
        <section className="section-padding">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <h1 className="text-3xl font-bold leading-tight text-brand-purple md:text-4xl lg:text-5xl">
                <Trans i18nKey="rapport.title" t={t} components={[<span className="text-brand-orange" />]} />
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-brand-gray-medium md:text-xl">
                {t("rapport.intro")}
              </p>

              <div className="mt-6">
                <Button
                  onClick={scrollNaarAfspraak}
                  className="min-h-[44px] bg-brand-orange px-8 text-base font-semibold hover:bg-brand-orange/90 md:text-lg"
                >
                  {t("cta.bookCallWithBas", { ns: "common" })}
                </Button>
              </div>

              <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
                <h2 className="mb-3 text-lg font-semibold text-brand-gray-dark">
                  <Trans i18nKey="rapport.onderzoekTitle" t={t} components={[<span className="text-brand-orange" />]} />
                </h2>
                <ul className="space-y-2 text-base text-brand-gray-medium">
                  {["scientific1", "scientific2", "scientific3"].map((sleutel) => (
                    <li key={sleutel} className="flex items-start">
                      <span className="mr-2 text-brand-orange">•</span>
                      <span>{tCalculator(`results.${sleutel}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <BedanktBooking
          title={<Trans i18nKey="rapport.booking.title" t={t} components={[<span className="text-brand-orange" />]} />}
          intro={t("rapport.booking.intro")}
        />
      </main>

      <Footer />
    </div>
  );
};

export default BedanktRapport;
