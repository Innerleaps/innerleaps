import type { TFunction } from "i18next";
import register from "@/content/claims.json";

/**
 * Leest het claimregister (src/content/claims.json) en maakt er bronregels van.
 *
 * Elk cijfer op de site komt hier vandaan, zodat er nooit een cijfer online
 * staat zonder bron. De regels staan in CLAIMS.md. scripts/check-claims.mjs
 * controleert bij elke build of het register compleet is.
 */

export type Taal = "nl" | "en";
type Tekst = Record<Taal, string>;

interface EigenBron {
  type: "own";
  naam: string;
  n: number | string;
  methode: Tekst;
  periode: Tekst;
}

interface ExterneBron {
  type: "external";
  auteur: Tekst;
  jaar: number | string;
  studyType: Tekst;
  sourceUrl: string | null;
  /**
   * Wat er zichtbaar bij het cijfer staat, als auteur en jaar niet passen. Zoals
   * bij drie overzichtsstudies samen: "Vonderlin, 2020; De Vibe, 2017; ...".
   */
  kortLabel?: Tekst;
}

interface GeenBron {
  type: "unknown" | "rood";
}

type Bron = EigenBron | ExterneBron | GeenBron;

export type ClaimId = keyof typeof register.claims;

interface Claim {
  soort: "A" | "B" | "C" | "F";
  bron?: string;
  waarde?: Tekst;
  status: "online" | "placeholder" | "keuze" | "rood";
}

const BRONNEN = register.bronnen as Record<string, Bron>;
const CLAIMS = register.claims as Record<string, Claim>;

const haalClaim = (id: ClaimId): Claim => {
  const claim = CLAIMS[id];
  // Hard falen, ook tijdens het prerenderen: liever een kapotte build dan een
  // cijfer zonder bron.
  if (!claim) throw new Error(`Claim "${id}" staat niet in src/content/claims.json`);
  return claim;
};

const haalBron = (id: ClaimId): Bron | null => {
  const claim = haalClaim(id);
  if (!claim.bron) return null;
  const bron = BRONNEN[claim.bron];
  if (!bron) throw new Error(`Claim "${id}" wijst naar bron "${claim.bron}", die niet in het register staat`);
  return bron;
};

/** Het cijfer zelf, zoals het op de pagina staat: "+8,6%" of "+8.6%". */
export const claimWaarde = (id: ClaimId, taal: Taal): string => {
  const waarde = haalClaim(id).waarde?.[taal];
  if (!waarde) throw new Error(`Claim "${id}" heeft geen waarde voor "${taal}"`);
  return waarde;
};

/** Het cijfer als getal, voor de lengte van een balkje: "68%" wordt 68. */
export const claimGetal = (id: ClaimId): number => Number(claimWaarde(id, "en").replace(/[^\d.]/g, ""));

export const isExtern = (id: ClaimId) => haalBron(id)?.type === "external";

export interface Bronregel {
  /** Sleutel om dubbele regels weg te laten als twee cijfers één bron delen. */
  bronId: string;
  tekst: string;
  /** Alleen bij een externe studie met een vindplaats. */
  link?: { href: string; tekst: string };
}

const metHoofdletter = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * De bronregel bij een cijfer, opgebouwd uit de velden in het register.
 *
 * Eigen meting:   "Zelfgerapporteerd, n=14, TheyDo, 4 weken na de training (voorjaar 2026)"
 * Externe studie: "In studie naar een online aandachttraining bij Dow Chemical (Aikens e.a., 2014)".
 * De zin zelf staat per bron in het register (studyType), want een overzicht
 * van 91 studies past niet in hetzelfde sjabloon als één studie.
 *
 * De zinnen zelf staan in common.json onder `claims`, zodat ze per taal kloppen.
 */
export const bronregel = (id: ClaimId, taal: Taal, t: TFunction): Bronregel => {
  const claim = haalClaim(id);
  const bron = haalBron(id);
  const bronId = claim.bron ?? id;

  if (bron?.type === "own") {
    return {
      bronId,
      tekst: metHoofdletter(
        t("claims.eigen", {
          methode: bron.methode[taal],
          n: bron.n,
          naam: bron.naam,
          periode: bron.periode[taal],
          interpolation: { escapeValue: false },
        }),
      ),
    };
  }

  if (bron?.type === "external") {
    const auteurJaar = `${bron.auteur[taal]}, ${bron.jaar}`;
    return {
      bronId,
      tekst: t("claims.extern", { studie: bron.studyType[taal], interpolation: { escapeValue: false } }),
      link: { href: bron.sourceUrl ?? "", tekst: auteurJaar },
    };
  }

  return { bronId, tekst: t("claims.geenBron") };
};

/**
 * De bron zoals hij zichtbaar bij het cijfer staat (keuze van Bas, 31-10-2026).
 *
 * Eigen meting:   "gemeten bij TheyDo"
 * Externe studie: "(De Bruin, 2018)", auteur zonder "e.a." en het jaar.
 *
 * Wie hierover beweegt of erop tikt, ziet de hele bronregel (zie Bron.tsx).
 */
export const bronLabel = (id: ClaimId, taal: Taal, t: TFunction): string => {
  const bron = haalBron(id);
  if (bron?.type === "own") return t("claims.gemetenBij", { naam: bron.naam });
  if (bron?.type === "external") {
    const kort = bron.kortLabel?.[taal] ?? `${bron.auteur[taal].replace(/ (e\.a\.|et al\.)$/, "")}, ${bron.jaar}`;
    return `(${kort})`;
  }
  return t("claims.geenBron");
};

export const methodePad = (taal: Taal): string => register.methodePagina[taal];

/**
 * Alle claims die bij een tekst in de vertaalbestanden horen. Zo krijgt een
 * FAQ-antwoord met een cijfer vanzelf zijn bronregel, zonder dat de pagina
 * hoeft te weten welk cijfer erin staat. Een sleutel telt ook als hij binnen
 * een geregistreerde sleutel valt: "common:results" dekt "common:results.intro".
 */
export const claimsBijSleutel = (sleutel: string): ClaimId[] =>
  (Object.keys(CLAIMS) as ClaimId[]).filter((id) => {
    const claim = CLAIMS[id] as Claim & { sleutels?: string[] };
    if (!claim.bron || !(claim.soort === "A" || claim.soort === "B")) return false;
    return (claim.sleutels ?? []).some((s) => s === sleutel);
  });

export interface EigenMeting {
  id: string;
  omschrijving: string;
  naam: string;
  n: number | string;
  methode: string;
  periode: string;
}

export interface Studie {
  id: string;
  auteurJaar: string;
  studie: string;
  titel: string | null;
  sourceUrl: string | null;
}

/**
 * Bronnen waar een claim naar wijst, plus de studies onder `onderbouwing` (de
 * 12 studies waar de FAQ naar verwijst), in de volgorde van het register.
 */
const gebruikteBronnen = () => {
  const ids = new Set<string | undefined>([
    ...Object.values(CLAIMS).map((claim) => claim.bron),
    ...((register as { onderbouwing?: string[] }).onderbouwing ?? []),
  ]);
  return Object.entries(BRONNEN).filter(([id]) => ids.has(id));
};

/** De eigen metingen achter de cijfers, voor de methodepagina. */
export const eigenMetingen = (taal: Taal): EigenMeting[] =>
  gebruikteBronnen().flatMap(([id, bron]) =>
    bron.type === "own"
      ? [{
          id,
          omschrijving: (bron as EigenBron & { omschrijving: Tekst }).omschrijving[taal],
          naam: bron.naam,
          n: bron.n,
          methode: bron.methode[taal],
          periode: bron.periode[taal],
        }]
      : [],
  );

/** De studies achter de onderzoekscijfers, voor de methodepagina. */
export const studies = (taal: Taal): Studie[] =>
  gebruikteBronnen().flatMap(([id, bron]) =>
    // Een verwijzing naar onze eigen methodepagina is geen studie.
    bron.type === "external" && !bron.sourceUrl?.startsWith("https://innerleaps.nl")
      ? [{
          id,
          auteurJaar: `${bron.auteur[taal]} (${bron.jaar})`,
          studie: bron.studyType[taal],
          titel: (bron as ExterneBron & { titel: string | null }).titel,
          sourceUrl: bron.sourceUrl,
        }]
      : [],
  );

/** Haalt de bronmarkering uit een tekst, voor plekken zonder opmaak (structured data). */
export const zonderBron = (tekst: string) => tekst.replace(/<\/?bron[^>]*>/g, "");
