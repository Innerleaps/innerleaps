import type { ReactNode } from "react";
import { claimWaarde, type ClaimId } from "@/lib/claims";
import { Bron } from "@/components/Bron";
import { useTaal } from "@/hooks/useTaal";
import OplopendGetal from "@/components/OplopendGetal";

/**
 * Elk cijfer op de site gaat hierdoorheen. Het cijfer zelf komt uit het
 * claimregister (src/content/claims.json), niet uit de vertaalbestanden, en
 * krijgt zijn bron zichtbaar eronder: "gemeten bij TheyDo" of "(De Bruin,
 * 2018)", met een kaartje bij aanwijzen (Bron.tsx). Een cijfer
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
  bronClassName?: string;
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
  bronClassName = "mt-1 text-base",
}: StatClaimProps) => {
  const waarde = claimWaarde(id, useTaal());
  return (
    <div className={className}>
      <p className={waardeClassName}>
        {/* Spatie in de tekst, geen marge: anders leest een schermlezer of
            Google "tot12". */}
        {prefix && <span className={prefixClassName}>{prefix} </span>}
        {animeren ? <OplopendGetal value={waarde} /> : waarde}
      </p>
      <p className={labelClassName}>{label}</p>
      <p className={bronClassName}>
        <Bron ids={[id]} />
      </p>
    </div>
  );
};

export default StatClaim;
