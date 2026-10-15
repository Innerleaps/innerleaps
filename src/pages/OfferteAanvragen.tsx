import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import Footer from "@/components/Footer";
import PageSeo from "@/components/PageSeo";
import OfferteForm from "@/components/OfferteForm";
import BookingStats from "@/components/BookingStats";
import BookingTrust from "@/components/BookingTrust";
import ClientLogoMarquee from "@/components/ClientLogoMarquee";

/**
 * /offerte-aanvragen en /en/request-a-quote: het formulier achter de primaire
 * knop van de site.
 *
 * Zelfde indeling als /contact: links wat je moet doen, rechts waarom je het
 * zou doen. Het bewijs naast het formulier in plaats van eronder, zodat het
 * formulier boven de vouw begint.
 *
 * Staat in ROUTE_MAP zodat de taalknop werkt en de pagina geprerenderd wordt,
 * maar draagt een noindex en staat niet in de sitemap. Een formulier hoeft niet
 * te ranken, en een dunne pagina in de index trekt de rest alleen omlaag.
 * Geen zwevende balk: die zou naar deze pagina zelf wijzen.
 */
const OfferteAanvragen = () => {
  const { t } = useTranslation("contact");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-gray-light">
      <PageSeo title={t("quote.meta.title")} description={t("quote.intro")} noindex />
      <SimplifiedNavigation />

      <main>
        <section className="bg-brand-off-white py-8 md:py-14 lg:py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-10">
              {/* Kolom 1: het formulier */}
              <div>
                <h1 className="text-3xl font-bold leading-tight text-brand-purple md:text-4xl lg:text-5xl">
                  <Trans i18nKey="quote.title" t={t} components={[<span className="text-brand-orange" />]} />
                </h1>
                <p className="mt-4 text-xl leading-relaxed text-brand-gray-medium">{t("quote.intro")}</p>

                <div className="mt-6 rounded-xl bg-white p-6 shadow-sm md:p-8">
                  <OfferteForm />
                </div>
              </div>

              {/* Kolom 2: waarom je dit zou doen */}
              <div className="rounded-xl bg-white p-6 md:p-8 lg:sticky lg:top-28">
                <BookingStats variant="panel" className="hidden lg:block" />
                <BookingStats variant="row" className="lg:hidden" />
                <BookingTrust className="lg:mt-6 lg:pt-6" />
              </div>
            </div>

            <div className="mt-10 lg:mt-14">
              <ClientLogoMarquee />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OfferteAanvragen;
