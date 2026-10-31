import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import type { OmslagpuntResultaat } from "@/utils/calculationEngine";
import { naarGeheel } from "@/lib/getallen";
import { claimGetal } from "@/lib/claims";
import { Bron, TekstMetBron } from "@/components/Bron";

/**
 * De uitkomst van de rekentool: het omslagpunt, en hoe klein dat is naast wat
 * deelnemers bij TheyDo rapporteerden.
 *
 * Tot 29 oktober 2026 stonden hier twee scenario's met een beloofde besparing
 * en een ROI, gebouwd op 15 tot 21% minder verzuim. Dat cijfer was een eigen
 * rekensom en "bespaar ten minste" een toezegging. Nu staat hier alleen wat
 * vaststaat: de kosten tegenover de loonsom, en dus vanaf welk punt de training
 * zich terugverdient. Daarnaast één gemeten cijfer, met zijn bron, en het
 * veelvoud daarvan als voorwaarde ("merkt jullie team hetzelfde"), nooit als
 * verwachting. Ontwerp en teksten gekozen door Bas op 31-10-2026. Zie CLAIMS.md.
 *
 * Dezelfde opbouw staat in de mail, in supabase/functions/submit-calculator.
 */
interface RoiResultaatProps {
  resultaten: OmslagpuntResultaat;
  invoer: {
    aantalDeelnemers: string;
    brutoJaarsalaris: string;
  };
}

/** Gemeten bij TheyDo, uit het register. */
const THEYDO_PRODUCTIVITEIT = claimGetal("theydo-productiviteit");

/**
 * Hoe vaak het gemeten cijfer in het omslagpunt past, naar beneden afgerond
 * zodat "ruim" altijd klopt: 5,98 wordt ruim 5, en precies 6 ook ruim 5.
 */
const veelvoud = (omslagpuntProcent: number) =>
  omslagpuntProcent > 0 ? Math.ceil(THEYDO_PRODUCTIVITEIT / omslagpuntProcent) - 1 : 0;

const Balk = ({ label, waarde, aandeel, kleur }: { label: ReactNode; waarde: ReactNode; aandeel: number; kleur: string }) => (
  <div>
    <div className="mb-1.5 flex items-baseline justify-between gap-4 text-lg">
      <span className="text-brand-gray-dark">{label}</span>
      <span className="font-bold text-brand-purple">{waarde}</span>
    </div>
    <div className="h-4 w-full rounded-full bg-gray-100">
      {/* Nooit smaller dan een stipje, anders lijkt het omslagpunt nul. */}
      <div className={`h-4 rounded-full ${kleur}`} style={{ width: `${Math.max(aandeel * 100, 2)}%` }} />
    </div>
  </div>
);

const RoiResultaat = ({ resultaten, invoer }: RoiResultaatProps) => {
  const { t, i18n } = useTranslation("calculator");
  const locale = i18n.language?.startsWith("en") ? "en-GB" : "nl-NL";

  const bedrag = (waarde: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(waarde);

  const getal = (waarde: number, decimalen: number) =>
    new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: decimalen }).format(waarde);

  const omslagpunt = resultaten.omslagpuntProcent;
  const keer = veelvoud(omslagpunt);
  const grootste = Math.max(omslagpunt, THEYDO_PRODUCTIVITEIT);

  return (
    <div className="space-y-6">
      {/* De ingevulde gegevens, zodat zichtbaar is waar de som op rust */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
        <h3 className="mb-3 text-lg font-semibold text-brand-gray-dark">{t("results.yourOrg")}</h3>
        <div className="grid grid-cols-1 gap-4 text-base sm:grid-cols-3">
          <div>
            <span className="text-brand-gray-medium">{t("results.employees")}:</span>
            <span className="ml-2 font-semibold">{invoer.aantalDeelnemers}</span>
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
            <span className="text-brand-gray-medium">{t("results.investment")}:</span>
            <span className="ml-2 font-semibold">{bedrag(resultaten.investering)}</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border-2 border-brand-orange bg-white p-6 md:p-8">
        <h3 className="text-xl font-bold leading-snug text-brand-gray-dark md:text-2xl">{t("results.breakEvenTitle")}</h3>
        <p className="mt-3 text-6xl font-bold text-brand-purple md:text-7xl">{getal(omslagpunt, 2)}%</p>
        <p className="mt-4 text-lg leading-relaxed text-brand-gray-dark">
          {t("results.breakEvenDays", { dagen: getal(resultaten.omslagpuntDagen, 1) })}
        </p>
        <p className="mt-1 text-base text-brand-gray-medium">{t("results.breakEvenDaysNote")}</p>

        <div className="mt-8 border-t border-gray-200 pt-8">
          {/* Het veelvoud alleen als het iets zegt. Bij een omslagpunt boven de
              helft van het gemeten cijfer blijven alleen de balken staan. */}
          {keer >= 2 && (
            <>
              <p className="text-6xl font-bold text-brand-orange md:text-7xl">{t("results.multiple", { keer })}</p>
              <p className="mt-4 text-xl leading-relaxed text-brand-gray-dark">
                <TekstMetBron tekst={t("results.compareTheydo", { keer })} ids={["theydo-productiviteit"]} />
              </p>
            </>
          )}

          <div className="mt-8 space-y-5">
            <Balk
              label={t("results.barYours")}
              waarde={`${getal(omslagpunt, 2)}%`}
              aandeel={omslagpunt / grootste}
              kleur="bg-gray-400"
            />
            <Balk
              label={<Bron ids={["theydo-productiviteit"]}>{t("results.barTheydo")}</Bron>}
              waarde={`${getal(THEYDO_PRODUCTIVITEIT, 1)}%`}
              aandeel={THEYDO_PRODUCTIVITEIT / grootste}
              kleur="bg-brand-orange"
            />
          </div>

          <p className="mt-8 text-lg leading-relaxed text-brand-gray-medium">
            <TekstMetBron tekst={t("results.theydoBreakEven")} ids={["theydo-productiviteit"]} />
          </p>
        </div>
      </div>

      <p className="text-base leading-relaxed text-brand-gray-medium">{t("results.disclaimer")}</p>
    </div>
  );
};

export default RoiResultaat;
