import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import GoogleG from "@/components/GoogleG";
import vmbnLogo from "@/assets/vmbn-trainer-categorie-1.webp";
import { THEYDO_LOGO, THEYDO_PORTRET } from "@/lib/klantervaringen";

/**
 * Het bewijsmateriaal dat bij de afspraakplanner staat, op /contact en op
 * /over-ons.
 *
 * Waarom hier en niet ergens anders: op het moment dat iemand een datum kiest
 * denkt hij "is dit het waard, en met wie zit ik dan aan tafel". Precies daar
 * hoort het antwoord te staan.
 *
 * Geen eigen kader, geen eigen achtergrond en geen scheidingslijnen: dit staat
 * binnen hetzelfde witte vlak als de cijfers, en witruimte doet het werk dat
 * anders een lijntje zou doen. Vier kolommen: de accreditatie en de score staan
 * links in een smalle strook, de klant krijgt de andere drie.
 *
 * De labels komen uit dezelfde sleutels als in de footer, zodat de score op
 * beide plekken niet uit elkaar kan gaan lopen.
 */
interface BookingTrustProps {
  /** De ruimte boven het blok. Staat er niets boven, dan hoeft die er niet te zijn. */
  divider?: boolean;
  /** Extra klassen voor de rand eromheen, bijvoorbeeld om de ruimte pas vanaf een bepaalde breedte te geven. */
  className?: string;
}

const BookingTrust = ({ divider = true, className = "" }: BookingTrustProps) => {
  const { t } = useTranslation();

  return (
    <figure
      className={`${divider ? "mt-6 pt-6" : ""} ${className}`.trim()}
    >
      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* Kolom 1: de cijfers */}
        <div className="flex flex-row items-center justify-center gap-8 pb-6 md:flex-col md:justify-start md:gap-6 md:pb-0 md:pr-5">
          <div className="flex flex-col items-center text-center">
            <GoogleG className="h-7 w-7" />
            <div className="mt-1 flex" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-brand-orange text-brand-orange" />
              ))}
            </div>
            <span className="mt-1 text-base text-brand-gray-medium">{t("footer.googleRating")}</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <img
              src={vmbnLogo}
              width={286}
              height={208}
              alt={t("bookingTrust.vmbnAlt")}
              className="h-12 w-auto"
              loading="lazy"
            />
            <span className="mt-1 text-base text-brand-gray-medium">
              {t("footer.trainerCategory")}
            </span>
          </div>
        </div>

        {/* Kolom 2 tot en met 4: de klant */}
        <div className="md:col-span-3 md:pl-8">
          <div className="flex items-center gap-4">
            <img
              src={THEYDO_PORTRET}
              alt={t("bookingTrust.photoAlt")}
              className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
              width={160}
              height={160}
              loading="lazy"
            />
            <img
              src={THEYDO_LOGO}
              alt={t("bookingTrust.logoAlt")}
              className="h-8 w-auto"
              width={200}
              height={111}
              loading="lazy"
            />
          </div>

          <blockquote className="mt-5 text-lg leading-relaxed text-brand-gray-dark">
            {t("bookingTrust.quote")}
          </blockquote>

          <figcaption className="mt-4">
            <span className="font-semibold text-brand-gray-dark">{t("bookingTrust.author")}</span>
            <span className="text-brand-gray-medium">, {t("bookingTrust.role")}</span>
          </figcaption>
        </div>
      </div>
    </figure>
  );
};

export default BookingTrust;
