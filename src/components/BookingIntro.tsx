import { Trans, useTranslation } from "react-i18next";
import { BAS_PHOTO } from "@/lib/booking";

/**
 * De kop boven de afspraakplanner, met de foto van Bas ernaast.
 *
 * Hier stond eerst een quote van Bas in een eigen kader boven de agenda. Die is
 * eruit. Hij kostte op mobiel ruim driehonderd pixels en zei niets wat de
 * subtitel niet al zegt, en dat was precies wat de kalender uit beeld duwde.
 *
 * Wat het gezicht wél doet, doet het nu naast de kop: laten zien dat er een
 * mens tegenover je zit en niet een formulier. Met alleen zijn naam eronder,
 * zodat het leest alsof hij het vraagt.
 */
interface BookingIntroProps {
  /** Op de boekingspagina is dit de h1, elders staat er al een h1 boven. */
  as?: "h1" | "h2";
  className?: string;
}

const BookingIntro = ({ as: Heading = "h1", className = "" }: BookingIntroProps) => {
  const { t } = useTranslation();

  return (
    <div className={`flex items-start gap-4 sm:items-center sm:gap-6 ${className}`}>
      {/* Op een smal scherm staat de naam onder de foto in plaats van onder de
          tekst. Dat scheelt een regel in de smalle tekstkolom, en het bijschrift
          hoort bij het gezicht waar het over gaat. Daar past de volledige naam
          niet, dus staat er alleen "Bas" met zijn rol eronder. */}
      <div className="w-24 flex-shrink-0 sm:w-auto">
        <img
          src={BAS_PHOTO}
          alt={t("booking.bas.photoAlt")}
          className="mx-auto h-20 w-20 rounded-full object-cover sm:mx-0 sm:h-24 sm:w-24"
          width={320}
          height={320}
        />
        <div className="mt-2 text-center sm:hidden">
          <div className="text-xs font-semibold text-brand-gray-dark">
            {t("booking.bas.shortName")}
          </div>
          <div className="text-[11px] leading-tight text-brand-gray-medium">
            {t("booking.bas.shortRole")}
          </div>
        </div>
      </div>
      <div>
        <Heading className="text-2xl font-bold leading-tight text-brand-purple sm:text-3xl md:text-4xl">
          <Trans
            i18nKey="booking.title"
            t={t}
            components={[<span className="text-brand-orange" />]}
          />
        </Heading>
        <p className="mt-2 text-base leading-relaxed text-brand-gray-medium sm:text-lg">
          {t("booking.intro")}
        </p>
        <p className="mt-2 hidden text-sm font-medium text-brand-gray-medium sm:block">
          {t("booking.bas.role")}
        </p>
      </div>
    </div>
  );
};

export default BookingIntro;
