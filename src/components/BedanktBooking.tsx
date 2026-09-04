import BookingIntro from "@/components/BookingIntro";
import BookingStats from "@/components/BookingStats";
import BookingTrust from "@/components/BookingTrust";
import CalendlyWidget from "@/components/CalendlyWidget";
import ClientLogoMarquee from "@/components/ClientLogoMarquee";

/**
 * Het afspraakblok op de bedanktpagina's.
 *
 * Zelfde indeling als op /contact, en om dezelfde reden: alles onder elkaar
 * duwde de kalender naar 688 pixels, en op een laptop van 800 pixels hoog zag
 * je dan geen enkele datum. Naast elkaar kost het bewijsmateriaal de agenda
 * geen hoogte.
 *
 * Dat de agenda hier überhaupt staat is een bewuste afwijking van de regel dat
 * de widget maar op twee plekken hoort. Een bedanktpagina is het hoogste
 * intentiemoment op de site: iemand heeft net acht velden ingevuld en zijn
 * eigen cijfers zien staan. Daar een klik en een paginalading tussen zetten
 * kost conversies. Het iframe van ruim 1 MB is dat hier waard.
 *
 * De kop is anders dan op /contact. Daar begint het gesprek bij nul, hier
 * heeft de bezoeker net iets in handen gekregen en gaat het daarover.
 */
interface BedanktBookingProps {
  title: string;
  intro: string;
}

const BedanktBooking = ({ title, intro }: BedanktBookingProps) => (
  <section className="bg-brand-off-white py-8 md:py-14 lg:py-16">
    <div className="container-custom">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-10">
        {/* Kolom 1: alles wat je nodig hebt om een moment te kiezen */}
        <div className="space-y-5">
          {/* Op de bedanktpagina staat de h1 al bovenaan, dus dit is een h2. */}
          <BookingIntro as="h2" title={title} intro={intro} />

          <BookingStats variant="row" className="lg:hidden" />

          <div className="rounded-xl bg-brand-blue p-4 md:p-5">
            <CalendlyWidget eager />
          </div>
        </div>

        {/* Kolom 2: waarom je dit zou doen */}
        <div className="rounded-xl bg-white p-6 md:p-8 lg:sticky lg:top-28">
          <BookingStats variant="panel" className="hidden lg:block" />
          <BookingTrust divider={false} className="lg:mt-6 lg:pt-6" />
        </div>
      </div>

      <div className="mt-10 lg:mt-14">
        <ClientLogoMarquee />
      </div>
    </div>
  </section>
);

export default BedanktBooking;
