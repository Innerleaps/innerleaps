import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone } from "lucide-react";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import StickyCtaButtons from "@/components/StickyCtaButtons";
import ROICalculator from "@/components/ROICalculator";
import BookingIntro from "@/components/BookingIntro";
import BookingStats from "@/components/BookingStats";
import BookingTrust from "@/components/BookingTrust";
import CalendlyWidget from "@/components/CalendlyWidget";
import ClientLogoMarquee from "@/components/ClientLogoMarquee";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import PageSeo from "@/components/PageSeo";

/**
 * De contactpagina, en sinds het opheffen van /afspraak-plannen ook de
 * boekingspagina. Alle "plan een gesprek"-knoppen op de site komen hier uit.
 *
 * De volgorde is de trechter: eerst een moment kiezen, dan zelf contact
 * opnemen als je liever eerst iets vraagt, dan de rekentool voor wie nog aan
 * het verkennen is. Van meest naar minst waardevol, want een ingepland gesprek
 * is meer waard dan een mailtje en een mailtje meer dan een som.
 *
 * De indeling van het afspraakdeel draait om één ding: de kalender moet
 * zichtbaar zijn zonder te scrollen. Daarom staat links alleen wat je nodig
 * hebt om te klikken en staat rechts het bewijs waarom je dat zou doen, naast
 * elkaar in plaats van onder elkaar.
 */
const Contact = () => {
  const { t } = useTranslation("contact");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-gray-light">
      <PageSeo title={t("meta.title")} description={t("meta.description")} />
      <SimplifiedNavigation />
      <StickyCtaButtons />

      <main>
        {/* Het afspraakblok */}
        <section className="bg-brand-off-white py-8 md:py-14 lg:py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-10">
              {/* Kolom 1: alles wat je nodig hebt om een moment te kiezen */}
              <div className="space-y-5">
                <BookingIntro />

                {/* Op een smal scherm staan de cijfers hier, boven de agenda.
                    Op een breed scherm staan ze rechts als paneel. */}
                <BookingStats variant="row" className="lg:hidden" />

                <div className="rounded-xl bg-brand-blue p-4 md:p-5">
                  <CalendlyWidget eager />
                </div>
              </div>

              {/* Kolom 2: waarom je dit zou doen */}
              <div className="rounded-xl bg-white p-6 md:p-8 lg:sticky lg:top-28">
                <BookingStats variant="panel" className="hidden lg:block" />
                <BookingTrust
                  divider={false}
                  className="lg:mt-6 lg:pt-6"
                />
              </div>
            </div>

            {/* De logo's staan onder het afspraakblok en niet erboven. Erboven
                las de pagina verkeerd: het eerste wat je zag was een rij logo's
                in plaats van waarom je hier bent. Dat ze hiermee onder de vouw
                vallen kan, want het paneel met de vier cijfers staat rechts al
                wél in beeld. */}
            <div className="mt-10 lg:mt-14">
              <ClientLogoMarquee />
            </div>
          </div>
        </section>

        {/* Zelf contact opnemen, voor wie liever eerst iets vraagt */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 md:p-8">
              <h2 className="mb-6 text-xl font-semibold text-brand-gray-dark md:text-2xl lg:text-3xl">
                {t("info.title")}
              </h2>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                {/* Links: het formulier */}
                <ContactForm />

                {/* Rechts: rechtstreeks bereikbaar. Mail en telefoon zijn echte
                    links; ze stonden hier als gewone tekst, dus op een telefoon
                    moest je het nummer overtypen om te kunnen bellen. Het adres
                    staat hier niet meer: dat hoort bij een bezoek, niet bij
                    contact opnemen, en het staat nog wel in de footer met de
                    schema-opmaak eromheen. */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-lg bg-brand-gray-light p-3 shadow-sm">
                      <Mail className="h-6 w-6 stroke-2 text-brand-orange" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-brand-gray-dark">
                        {t("info.emailLabel")}
                      </h3>
                      <a
                        href="mailto:bas@innerleaps.nl"
                        className="text-lg text-brand-gray-medium transition-colors hover:text-brand-orange"
                      >
                        bas@innerleaps.nl
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="rounded-lg bg-brand-gray-light p-3 shadow-sm">
                      <Phone className="h-6 w-6 stroke-2 text-brand-orange" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-brand-gray-dark">
                        {t("info.phoneLabel")}
                      </h3>
                      <a
                        href="tel:+31623453477"
                        className="text-lg text-brand-gray-medium transition-colors hover:text-brand-orange"
                      >
                        06 23 45 34 77
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ROICalculator />
      <Footer />
    </div>
  );
};

export default Contact;
