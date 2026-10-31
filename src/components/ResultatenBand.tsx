import type { ClaimId } from "@/lib/claims";
import StatClaim from "@/components/StatClaim";

export interface ResultatenBandStat {
  /** De regel in src/content/claims.json. Daar staat ook het cijfer zelf. */
  claim: ClaimId;
  label: string;
  /**
   * Klein woordje voor het getal, zoals "tot" in "tot 12 maanden". Het getal
   * staat op 72 pixels en een kolom is op tabletbreedte ruim 200 pixels, dus
   * "tot 12 maanden" past niet als waarde. "12 maanden later" mag niet, want
   * dat zegt de bron niet. Zo blijft het getal groot en de claim kloppend.
   */
  prefix?: string;
}

interface ResultatenBandProps {
  stats: ResultatenBandStat[];
}

/**
 * Drie of vier cijfers op donkerpaars, het eerste in oranje, elk gecentreerd in
 * zijn eigen kolom. Afgeleid van de band onder de hero van de TheyDo-case.
 *
 * Op verzoek van Bas kaal: alleen het getal met zijn onderschrift en de bron
 * eronder, "gemeten bij TheyDo" of "(De Bruin, 2018)" (CLAIMS.md).
 */
const ResultatenBand = ({ stats }: ResultatenBandProps) => {
  const vier = stats.length === 4;

  return (
    <section className="bg-brand-purple py-12 md:py-16">
      {/* Vier cijfers passen op een telefoon twee aan twee. De sleutel is de
          plek en niet het cijfer: op de medewerkerspagina staat 55% twee keer. */}
      <div
        className={`container-custom grid gap-10 md:gap-8 text-center ${
          vier ? "grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"
        }`}
      >
        {stats.map((stat, i) => (
          <StatClaim
            key={i}
            id={stat.claim}
            label={stat.label}
            prefix={stat.prefix}
            animeren
            className="max-w-xs mx-auto"
            waardeClassName={`${vier ? "text-5xl md:text-6xl xl:text-7xl" : "text-6xl md:text-7xl"} font-bold ${
              i === 0 ? "text-brand-orange" : "text-white"
            }`}
            prefixClassName="text-3xl md:text-4xl"
            labelClassName="mt-3 text-xl leading-snug text-white/80"
            bronClassName="mt-1 text-base text-white/60"
          />
        ))}
      </div>
    </section>
  );
};

export default ResultatenBand;
