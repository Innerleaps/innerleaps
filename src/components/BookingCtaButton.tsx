import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { bookingPath } from "@/lib/booking";
import { detectLanguageFromPath } from "@/i18n/config";

/**
 * De knop "Plan 20 minuten met Bas", zoals hij onder de secties van de twee
 * campagnepagina's staat.
 *
 * Waarom hij standaard `outline` is: op die pagina's is gevuld oranje
 * voorbehouden aan de rekentool. Zou elke sectieknop ook oranje zijn, dan
 * heeft het oog geen richting meer en is er feitelijk geen primaire actie.
 * Alleen in het masterclassblok mag hij oranje, want daar is een gesprek de
 * logische vervolgstap van de sectie zelf.
 */
interface BookingCtaButtonProps {
  variant?: "primary" | "secondary";
  className?: string;
}

const BookingCtaButton = ({ variant = "secondary", className = "" }: BookingCtaButtonProps) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = detectLanguageFromPath(pathname);

  return (
    <div className={`text-center ${className}`}>
      <Link to={bookingPath(lang)}>
        <Button
          variant={variant === "primary" ? "default" : "outline"}
          className="min-h-[44px] font-semibold py-3 px-8 rounded-lg text-base md:text-lg"
        >
          {t("cta.bookCallWithBas")}
        </Button>
      </Link>
    </div>
  );
};

export default BookingCtaButton;
