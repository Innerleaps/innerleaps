import { useTranslation } from "react-i18next";
import type { ROIResults } from "@/utils/calculationEngine";
import { naarGeheel } from "@/lib/getallen";

/**
 * De uitkomst van de rekentool: de ingevulde organisatie, de twee scenario's
 * en de onderbouwing eronder.
 *
 * Dit blok stond letterlijk twee keer in de code, één keer in ROICalculator en
 * één keer in CalculatorModal, ruim tweehonderd regels per stuk. Twee kopieën
 * van hetzelfde betekent dat een correctie er maar op één plek in belandt, en
 * daar is het bij de scenarionamen ook echt misgegaan: in het Nederlandse
 * bestand stond "Conservative Scenario".
 *
 * Nu staat het hier, en gebruikt de bedanktpagina hem.
 */
interface RoiResultaatProps {
  resultaten: ROIResults;
  invoer: {
    aantalWerknemers: string;
    brutoJaarsalaris: string;
    verzuimPercentage: string;
  };
}

const RoiResultaat = ({ resultaten, invoer }: RoiResultaatProps) => {
  const { t, i18n } = useTranslation("calculator");
  const valutaLocale = i18n.language?.startsWith("en") ? "en-GB" : "nl-NL";

  const bedrag = (waarde: number) =>
    new Intl.NumberFormat(valutaLocale, {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(waarde);

  const percentage = (waarde: number) => `${Math.round(waarde)}%`;

  const scenario = (
    sleutel: "conservative" | "positive",
    verzuim: string,
    productiviteit: string,
    randKlasse: string,
  ) => {
    const cijfers = resultaten.scenarios[sleutel];
    return (
      <div className={`rounded-lg border-2 bg-white p-6 ${randKlasse}`}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-brand-gray-dark">{t(`results.${sleutel}`)}</h3>
          <span className="text-base text-brand-gray-medium">{t(`results.${sleutel}Tag`)}</span>
        </div>

        <div className="mb-4 space-y-3">
          <div className="flex justify-between text-base">
            <span className="text-brand-gray-medium">
              {t("results.absenteeismSaving")} ({verzuim}):
            </span>
            <span className="font-semibold text-green-600">{bedrag(cijfers.verzuimBesparing)}</span>
          </div>
          <div className="flex justify-between text-base">
            <span className="text-brand-gray-medium">
              {t("results.productivityGain")} ({productiviteit}):
            </span>
            <span className="font-semibold text-green-600">
              {bedrag(cijfers.productiviteitBesparing)}
            </span>
          </div>
        </div>

        <div className="space-y-2 border-t border-gray-200 pt-3">
          <div className="flex justify-between font-semibold">
            <span className="text-brand-gray-dark">{t("results.totalSaving")}:</span>
            <span className="text-green-600">{bedrag(cijfers.totaleBesparing)}</span>
          </div>
          <div className="flex justify-between text-base text-brand-gray-medium">
            <span>{t("results.investment")}:</span>
            <span className="text-red-600">-{bedrag(resultaten.investment)}</span>
          </div>
          <div className="mt-2 border-t border-gray-300 pt-2">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-brand-gray-dark">{t("results.netProfit")}:</span>
              <span className="text-green-600">{bedrag(cijfers.netBesparing)}</span>
            </div>
            <div className="mt-1 flex justify-between text-base">
              <span className="text-brand-gray-dark">{t("results.roi")}:</span>
              <span className="font-bold text-brand-blue">{percentage(cijfers.roi)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* De ingevulde gegevens, zodat zichtbaar is waar de som op rust */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
        <h3 className="mb-3 text-lg font-semibold text-brand-gray-dark">{t("results.yourOrg")}</h3>
        <div className="grid grid-cols-1 gap-4 text-base sm:grid-cols-3">
          <div>
            <span className="text-brand-gray-medium">{t("results.employees")}:</span>
            <span className="ml-2 font-semibold">{invoer.aantalWerknemers}</span>
          </div>
          <div>
            <span className="text-brand-gray-medium">{t("results.avgSalary")}:</span>
            {/* Het salaris staat hier zoals de bezoeker het intikte, dus met
                punten als duizendtalscheiding. parseInt stopt bij de eerste
                punt en maakte van 39.700 een salaris van 39 euro. */}
            <span className="ml-2 font-semibold">
              {bedrag(naarGeheel(invoer.brutoJaarsalaris) ?? 0)}
            </span>
          </div>
          <div>
            <span className="text-brand-gray-medium">{t("results.absenteeism")}:</span>
            <span className="ml-2 font-semibold">{invoer.verzuimPercentage}%</span>
          </div>
        </div>
      </div>

      {scenario("conservative", "15%", "5%", "border-gray-300")}
      {scenario("positive", "21%", "8%", "border-brand-orange")}

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
        <h3 className="mb-3 text-lg font-semibold text-brand-gray-dark">
          {t("results.scientificTitle")}
        </h3>
        <p className="mb-3 text-base text-brand-gray-medium">{t("results.scientificIntro")}</p>
        <ul className="space-y-2 text-base text-brand-gray-medium">
          {["scientific1", "scientific2"].map((sleutel) => (
            <li key={sleutel} className="flex items-start">
              <span className="mr-2 text-brand-orange">•</span>
              <span>{t(`results.${sleutel}`)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoiResultaat;
