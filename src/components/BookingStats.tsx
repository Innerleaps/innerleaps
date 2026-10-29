import { useTranslation } from "react-i18next";
import { claimWaarde, type ClaimId } from "@/lib/claims";
import { Ster } from "@/components/Voetnoten";
import { useTaal } from "@/hooks/useTaal";

/**
 * De vier cijfers waarom organisaties voor ons kiezen, bij de afspraakplanner.
 *
 * Twee verschijningsvormen, want de ruimte verschilt te veel om er één ding van
 * te maken.
 *
 * `row` is één lage rij van vier getallen zonder omlijsting. Die gebruiken we
 * overal waar alles onder elkaar staat, want daar is elke pixel er één die de
 * kalender uit beeld duwt.
 *
 * `panel` is het paneel met de vier balken, zoals in de hero van de
 * propositiepagina's. Dat past alleen als er een kolom naast de agenda is.
 *
 * De cijfers komen uit het claimregister en krijgen elk een sterretje naar
 * hun bron onderaan de pagina. Zie CLAIMS.md.
 */
interface BookingStatsProps {
  variant?: "row" | "panel";
  className?: string;
}

const STATS: { label: string; claim: ClaimId }[] = [
  { label: "hero.stats.dropoutRisk", claim: "debruin-uitval" },
  { label: "hero.stats.absenteeism", claim: "verzuim-15-21" },
  { label: "hero.stats.focus", claim: "jha-aandacht" },
  { label: "hero.stats.productivity", claim: "theydo-productiviteit" },
];

const useStats = () => {
  const { t } = useTranslation();
  const taal = useTaal();
  return STATS.map((stat) => ({ label: t(stat.label), value: claimWaarde(stat.claim, taal), claim: stat.claim }));
};

const BookingStats = ({ variant = "row", className = "" }: BookingStatsProps) => {
  const { t } = useTranslation();
  const stats = useStats();

  if (variant === "row") {
    return (
      <div className={`grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-4 ${className}`}>
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-xl font-bold text-brand-orange sm:text-2xl">
              {stat.value}
              <Ster ids={[stat.claim]} />
            </div>
            <div className="mt-0.5 text-base leading-tight text-brand-gray-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      <h2 className="mb-5 text-center text-xl font-semibold text-brand-purple xl:text-2xl">
        {t("hero.whyChooseUs")}
      </h2>
      <div className="space-y-2.5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between rounded-lg bg-brand-off-white px-4 py-3"
          >
            <span className="text-base text-brand-purple xl:text-lg">{stat.label}</span>
            <span className="shrink-0 text-xl font-bold text-brand-orange xl:text-2xl">
              {stat.value}
              <Ster ids={[stat.claim]} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingStats;
