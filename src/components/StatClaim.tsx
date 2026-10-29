import type { ReactNode } from "react";
import { claimWaarde, type ClaimId } from "@/lib/claims";
import { Ster } from "@/components/Voetnoten";
import { useTaal } from "@/hooks/useTaal";
import OplopendGetal from "@/components/OplopendGetal";

/**
 * Elk cijfer op de site gaat hierdoorheen. Het cijfer zelf komt uit het
 * claimregister (src/content/claims.json), niet uit de vertaalbestanden, en
 * krijgt een sterretje dat naar zijn bron onderaan de pagina linkt. Een cijfer
 * zonder registerregel kan dus niet: dan faalt de build. Zie CLAIMS.md.
 *
 * Alleen de opmaak verschilt per plek, dus die geef je mee.
 */
interface StatClaimProps {
  id: ClaimId;
  label: ReactNode;
  /** Klein woordje voor het cijfer, zoals "tot" in "tot 12 maanden". */
  prefix?: string;
  /** Laat het getal oplopen zodra het in beeld komt. */
  animeren?: boolean;
  className?: string;
  waardeClassName?: string;
  prefixClassName?: string;
  labelClassName?: string;
}

const StatClaim = ({
  id,
  label,
  prefix,
  animeren = false,
  className = "",
  waardeClassName = "",
  prefixClassName = "",
  labelClassName = "",
}: StatClaimProps) => {
  const waarde = claimWaarde(id, useTaal());
  return (
    <div className={className}>
      <p className={waardeClassName}>
        {/* Spatie in de tekst, geen marge: anders leest een schermlezer of
            Google "tot12". */}
        {prefix && <span className={prefixClassName}>{prefix} </span>}
        {animeren ? <OplopendGetal value={waarde} /> : waarde}
        <Ster ids={[id]} />
      </p>
      <p className={labelClassName}>{label}</p>
    </div>
  );
};

export default StatClaim;
