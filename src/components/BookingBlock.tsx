import CalendlyWidget from "@/components/CalendlyWidget";
import BookingStats from "@/components/BookingStats";
import BookingTrust from "@/components/BookingTrust";

/**
 * Het afspraakblok voor pagina's waar alles onder elkaar staat: /contact en
 * /over-ons. In één wit kader, in deze volgorde: de vier cijfers, de agenda,
 * en het bewijs.
 *
 * Hier stond eerst een quote van Bas boven de agenda. Die is eruit. Hij kostte
 * op mobiel ruim driehonderd pixels en zei niets wat de subtitel niet al zegt.
 * Zijn gezicht staat nu naast de kop, in `BookingIntro`.
 *
 * De boekingspagina zet dezelfde onderdelen naast elkaar in twee kolommen, want
 * daar is de agenda de reden dat je er bent en mag hij geen hoogte kwijtraken.
 *
 * Wie dit ergens neerzet krijgt automatisch het anker `#afspraak` mee, dus de
 * knoppen elders op de pagina blijven werken zonder dat je daar iets voor hoeft
 * te doen.
 */
interface BookingBlockProps {
  /**
   * Staat het blok boven of vlak onder de vouw, dan mag de agenda meteen
   * beginnen te laden. Staat het diep op de pagina, zet dit dan uit: het iframe
   * kost ruim een megabyte, en dat hoeft niet te laden voor wie er nooit komt.
   * Aan het uiterlijk verandert niets, dus het blok blijft overal hetzelfde.
   */
  eager?: boolean;
}

const BookingBlock = ({ eager = true }: BookingBlockProps) => (
  <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 md:p-8">
    <BookingStats className="mb-6" />
    {/* Blauw kader om de agenda, zodat het blok gewicht heeft zonder dat de
        kalender zelf donker en dus slechter leesbaar wordt. Zie CalendlyWidget. */}
    <div className="rounded-xl bg-brand-blue p-4 md:p-5">
      <CalendlyWidget eager={eager} />
    </div>
    <BookingTrust />
  </div>
);

export default BookingBlock;
