import { createContext, Fragment, useContext, useMemo, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { useTaal } from "@/hooks/useTaal";
import { bronregel, claimKort, isExtern, methodePad, type ClaimId } from "@/lib/claims";

/**
 * Sterretjes bij cijfers, met de bronnen onderaan de pagina.
 *
 * Elk cijfer krijgt een klein sterretje dat linkt naar het blok "Bronnen" vlak
 * boven de footer. Zo blijft het cijfer zelf rustig in beeld en staat de
 * verantwoording één klik verder, altijd op dezelfde plek. Zie CLAIMS.md.
 *
 * Hoe het blok weet welke bronnen erin horen: elk sterretje meldt zijn claim
 * aan tijdens het renderen. De footer komt als laatste aan de beurt en toont
 * dan precies de bronnen van de cijfers die op deze pagina staan. Per pagina
 * een nieuwe verzameling, zodat er niets van de vorige pagina blijft hangen.
 */

const Aangemeld = createContext<Set<ClaimId> | null>(null);

export const VoetnotenProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ids = useMemo(() => new Set<ClaimId>(), [pathname]);
  return <Aangemeld.Provider value={ids}>{children}</Aangemeld.Provider>;
};

const ankerVoor = (id: ClaimId, taal: "nl" | "en", t: TFunction) =>
  `#bron-${bronregel(id, taal, t).bronId}`;

/** Het sterretje zelf: klein, achter het cijfer, en een link naar de bron. */
export const Ster = ({ ids, className = "" }: { ids: ClaimId[]; className?: string }) => {
  const aangemeld = useContext(Aangemeld);
  const { t } = useTranslation();
  const taal = useTaal();
  ids.forEach((id) => aangemeld?.add(id));
  return (
    <a
      href={ankerVoor(ids[0], taal, t)}
      aria-label={t("claims.sterLabel")}
      className={`relative -top-[0.6em] ml-[0.05em] text-[0.55em] font-semibold no-underline opacity-70 hover:opacity-100 ${className}`}
    >
      *
    </a>
  );
};

/**
 * Een tekst uit de vertaalbestanden met een sterretje erin, zoals "68%* geeft
 * aan...". Elk sterretje wordt een link naar de bronnen.
 */
export const TekstMetSter = ({ tekst, ids }: { tekst: string; ids: ClaimId[] }) => {
  if (ids.length === 0 || !tekst.includes("*")) return <>{tekst}</>;
  return (
    <>
      {tekst.split("*").map((deel, i) => (
        <Fragment key={i}>
          {i > 0 && <Ster ids={ids} />}
          {deel}
        </Fragment>
      ))}
    </>
  );
};

/**
 * Het blok "Bronnen" onderaan de pagina. Per bron één regel, met de cijfers
 * ervoor waar hij bij hoort. Staat er op de pagina geen cijfer, dan niets.
 */
export const Voetnoten = () => {
  const aangemeld = useContext(Aangemeld);
  const { t } = useTranslation();
  const taal = useTaal();
  if (!aangemeld || aangemeld.size === 0) return null;

  const ids = [...aangemeld];
  const perBron = new Map<string, { waarden: string[]; id: ClaimId }>();
  for (const id of ids) {
    const { bronId } = bronregel(id, taal, t);
    const groep = perBron.get(bronId) ?? { waarden: [], id };
    const waarde = claimKort(id, taal);
    if (waarde && !groep.waarden.includes(waarde)) groep.waarden.push(waarde);
    perBron.set(bronId, groep);
  }

  return (
    <aside aria-labelledby="bronnen-titel" className="border-t border-gray-200 bg-white py-8">
      <div className="container-custom">
        <h2 id="bronnen-titel" className="text-base font-semibold text-brand-purple">
          {t("claims.bronnen")}
        </h2>
        <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-brand-gray-medium">
          {[...perBron.entries()].map(([bronId, groep]) => {
            const regel = bronregel(groep.id, taal, t);
            return (
              <li key={bronId} id={`bron-${bronId}`} className="scroll-mt-28">
                <span className="font-semibold text-brand-gray-dark">
                  * {groep.waarden.length > 0 && `${groep.waarden.join(", ")}: `}
                </span>
                {/* Na de dubbele punt verder met een kleine letter. */}
                {groep.waarden.length > 0 ? regel.tekst.charAt(0).toLowerCase() + regel.tekst.slice(1) : regel.tekst}
                {regel.link && (
                  <>
                    {" ("}
                    {regel.link.href ? (
                      <a
                        href={regel.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-brand-orange"
                      >
                        {regel.link.tekst}
                      </a>
                    ) : (
                      regel.link.tekst
                    )}
                    {")"}
                  </>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-brand-gray-medium">
          {ids.some(isExtern) && <>{t("claims.onderzoeksnoot")} </>}
          {t("claims.slot")}{" "}
          <Link to={methodePad(taal)} className="underline underline-offset-2 hover:text-brand-orange">
            {t("claims.methodeLink")}
          </Link>
        </p>
      </div>
    </aside>
  );
};
