import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { bookingPath } from "@/lib/booking";
import { detectLanguageFromPath } from "@/i18n/config";

/**
 * De knop "Plan 20 minuten met Bas", zoals hij onder de secties van de twee
 * campagnepagina's staat.
 *
 * Gevuld oranje is op die pagina's voorbehouden aan de rekentool, en aan niets
 * anders. Zou een sectieknop ook oranje zijn, dan heeft het oog geen richting
 * meer en is er feitelijk geen primaire actie. Deze knop is daarom blauw
 * gevuld: duidelijk aanklikbaar, maar onmiskenbaar de tweede keus.
 *
 * Op het donkere masterclassblok werkt blauw op paars niet, dus daar staat de
 * variant met witte vulling en blauwe tekst. Ook daar dus niet oranje.
 */
interface BookingCtaButtonProps {
  variant?: "onLight" | "onDark";
  className?: string;
}

const BookingCtaButton = ({ variant = "onLight", className = "" }: BookingCtaButtonProps) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = detectLanguageFromPath(pathname);

  return (
    <div className={`text-center ${className}`}>
      <Link to={bookingPath(lang)}>
        <Button
          variant={variant === "onDark" ? "secondary-on-blue" : "secondary"}
          className="min-h-[44px] font-semibold py-3 px-8 rounded-lg text-base md:text-lg"
        >
          {t("cta.bookCallWithBas")}
        </Button>
      </Link>
    </div>
  );
};

export default BookingCtaButton;
