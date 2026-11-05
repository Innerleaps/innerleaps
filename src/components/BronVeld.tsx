import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";

/**
 * "Hoe ken je ons?", op het offerte- en het berichtformulier.
 *
 * Waarom dit veld er staat: LinkedIn is voor Analytics grotendeels onzichtbaar.
 * De app geeft vaak geen verwijzer mee, en wie een post ziet zoekt twee weken
 * later op "innerleaps". Wat iemand zelf invult is in B2B de betrouwbaarste
 * bron. LinkedIn is bewust in tweeën gesplitst: een post (de content) en een
 * bericht van Bas (de outreach). Dat onderscheid kan geen enkele tool maken.
 *
 * Het antwoord gaat op twee plekken heen: als regel in de mail aan Bas, en als
 * parameter `lead_source` bij de gebeurtenis naar Analytics. Die parameter
 * moet in GA4 als aangepaste dimensie bestaan, anders is hij niet uit te lezen.
 *
 * Een gewone keuzelijst en niet die van shadcn: die brengt `text-sm` mee, en
 * een gewone werkt op een telefoon met het eigen keuzewiel van het toestel.
 */

export const BRONNEN = [
  "linkedin_post",
  "linkedin_message",
  "google",
  "referral",
  "event",
  "other",
] as const;

export type Bron = (typeof BRONNEN)[number];

/** Zo staat het antwoord in de mail aan Bas. Altijd Nederlands, hij leest hem. */
export const BRON_IN_MAIL: Record<Bron, string> = {
  linkedin_post: "Een post op LinkedIn",
  linkedin_message: "Een bericht van Bas op LinkedIn",
  google: "Google",
  referral: "Via een collega of kennis",
  event: "Een masterclass of evenement",
  other: "Anders",
};

export const isBron = (waarde: string): waarde is Bron => (BRONNEN as readonly string[]).includes(waarde);

interface BronVeldProps {
  id: string;
  /** Zelfde klassen als de velden ernaast, zie CLAUDE.md, kopje Lettergroottes. */
  veldKlasse: string;
  labelKlasse: string;
  ongeldig?: boolean;
  onKies?: () => void;
}

const BronVeld = ({ id, veldKlasse, labelKlasse, ongeldig, onKies }: BronVeldProps) => {
  const { t } = useTranslation("contact");

  return (
    <div>
      <Label htmlFor={id} className={labelKlasse}>
        {t("source.label")}
      </Label>
      <select
        id={id}
        name="bron"
        defaultValue=""
        onChange={onKies}
        aria-invalid={ongeldig || undefined}
        className={`${veldKlasse} block w-full rounded-md bg-background px-3 ${ongeldig ? "border-red-600" : ""}`}
      >
        <option value="" disabled>
          {t("source.placeholder")}
        </option>
        {BRONNEN.map((bron) => (
          <option key={bron} value={bron}>
            {t(`source.options.${bron}`)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BronVeld;
