import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";

/**
 * De opmaak van de juridische pagina's, los van de teksten zelf.
 *
 * De privacyverklaring en de cookieverklaring stonden als JSX in hun eigen
 * bestand, in het Engels, en dus in één taal. Wilde je ze vertalen, dan moest
 * je de hele opmaak dupliceren en daarna twee kopieën bijhouden. Dat gaat een
 * keer mis bij een juridische tekst.
 *
 * Nu staat de opmaak hier en staan de teksten per taal in een eigen bestand,
 * als platte gegevens. Eén verandering aan de vorm landt meteen in beide
 * talen, en een vertaling raakt de opmaak niet.
 *
 * De teksten mogen **vet** bevatten en [links](/pad). Geen ruwe HTML: dat
 * scheelt een dangerouslySetInnerHTML in een bestand waar mensen tekst in
 * plakken.
 */

export type Blok =
  | { soort: "tekst"; tekst: string }
  | { soort: "lijst"; items: string[] }
  | { soort: "kader"; regels: string[] }
  | { soort: "tabel"; koppen: [string, string]; rijen: Array<[string, string]> };

export interface Sectie {
  kop: string;
  /** 2 is een hoofdstuk, 3 een onderdeel daarvan. */
  niveau?: 2 | 3;
  blokken: Blok[];
}

export interface JuridischePagina {
  titel: string;
  ondertitel: string;
  metaTitel: string;
  metaBeschrijving: string;
  secties: Sectie[];
  voettekst: string[];
}

/** **vet** en [tekst](/pad) omzetten, verder niets. */
export const opmaak = (tekst: string): ReactNode[] => {
  const delen: ReactNode[] = [];
  const patroon = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let laatste = 0;
  let m: RegExpExecArray | null;
  let n = 0;

  while ((m = patroon.exec(tekst)) !== null) {
    if (m.index > laatste) delen.push(tekst.slice(laatste, m.index));
    if (m[1] !== undefined) {
      delen.push(<strong key={n++}>{m[1]}</strong>);
    } else {
      const pad = m[3]!;
      delen.push(
        pad.startsWith("/") ? (
          <Link key={n++} to={pad} className="text-brand-orange hover:underline">
            {m[2]}
          </Link>
        ) : (
          <a key={n++} href={pad} className="text-brand-orange hover:underline">
            {m[2]}
          </a>
        ),
      );
    }
    laatste = m.index + m[0].length;
  }
  if (laatste < tekst.length) delen.push(tekst.slice(laatste));
  return delen;
};

const BlokWeergave = ({ blok }: { blok: Blok }) => {
  switch (blok.soort) {
    case "tekst":
      return <p className="text-xl mb-4">{opmaak(blok.tekst)}</p>;
    case "lijst":
      return (
        <ul className="list-disc ml-6 space-y-3 text-xl mb-4">
          {blok.items.map((item, i) => (
            <li key={i}>{opmaak(item)}</li>
          ))}
        </ul>
      );
    case "kader":
      return (
        <div className="bg-brand-off-white p-6 rounded-xl text-xl space-y-1 mb-4">
          {blok.regels.map((regel, i) => (
            <p key={i} className={i === 0 ? "!text-brand-gray-dark font-semibold" : "!text-brand-gray-dark"}>
              {opmaak(regel)}
            </p>
          ))}
        </div>
      );
    case "tabel":
      return (
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-xl border-collapse">
            <thead>
              <tr className="border-b-2 border-brand-purple/20">
                {blok.koppen.map((kop, i) => (
                  <th key={i} className={`text-left py-3 font-semibold text-brand-purple${i === 0 ? " pr-4" : ""}`}>
                    {kop}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-brand-gray-dark">
              {blok.rijen.map((rij, i) => (
                <tr key={i} className={i === blok.rijen.length - 1 ? "" : "border-b border-gray-200"}>
                  <td className="py-3 pr-4">{opmaak(rij[0])}</td>
                  <td className="py-3">{opmaak(rij[1])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
};

export const JuridischeTekst = ({ pagina }: { pagina: JuridischePagina }) => (
  <div className="prose max-w-none space-y-8 text-brand-gray-dark leading-relaxed">
    {pagina.secties.map((sectie, i) => (
      <Fragment key={i}>
        {sectie.niveau === 3 ? (
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-brand-purple mb-3">{sectie.kop}</h3>
            {sectie.blokken.map((blok, j) => (
              <BlokWeergave key={j} blok={blok} />
            ))}
          </div>
        ) : (
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">{sectie.kop}</h2>
            {sectie.blokken.map((blok, j) => (
              <BlokWeergave key={j} blok={blok} />
            ))}
          </section>
        )}
      </Fragment>
    ))}

    <div className="border-t border-gray-200 pt-8 mt-8 text-brand-gray-medium text-lg space-y-1">
      {pagina.voettekst.map((regel, i) => (
        <p key={i}>{regel}</p>
      ))}
    </div>
  </div>
);
