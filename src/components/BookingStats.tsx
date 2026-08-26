import { useTranslation } from "react-i18next";

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
 * De labels komen uit dezelfde sleutels als de hero van de homepage, zodat de
 * percentages niet op twee plekken uit elkaar kunnen gaan lopen.
 */
interface BookingStatsProps {
  variant?: "row" | "panel";
  className?: string;
}

const useStats = () => {
  const { t } = useTranslation();
  return [
    { label: t("hero.stats.dropoutRisk"), value: "-70%" },
    { label: t("hero.stats.absenteeism"), value: "-21%" },
    { label: t("hero.stats.focus"), value: "+24%" },
    { label: t("hero.stats.productivity"), value: "+8%" },
  ];
};

const BookingStats = ({ variant = "row", className = "" }: BookingStatsProps) => {
  const { t } = useTranslation();
  const stats = useStats();

  if (variant === "row") {
    return (
      <div className={`grid grid-cols-4 gap-2 ${className}`}>
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-xl font-bold text-brand-orange sm:text-2xl">{stat.value}</div>
            <div className="mt-0.5 text-xs leading-tight text-brand-gray-medium">{stat.label}</div>
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
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingStats;
