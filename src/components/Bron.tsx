import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTaal } from "@/hooks/useTaal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { bronLabel, bronregel, methodePad, zonderBron, type Bronregel, type ClaimId } from "@/lib/claims";

/**
 * De bron bij een cijfer, zichtbaar in de tekst zelf (keuze van Bas, 31-10-2026).
 *
 * Bij een eigen meting staat er "gemeten bij TheyDo", bij een studie auteur en
 * jaar: "(De Bruin, 2018)". Met een stippellijn eronder. Wijs je die aan, tik
 * je erop of druk je Enter, dan opent een kaartje met de hele bronregel en een
 * link naar Methode en beperkingen. Geen sterretjes en geen bronnenblok meer.
 *
 * Waarom de bron zelf in beeld: de Reclame Code kijkt naar de totaalindruk, en
 * kleine lettertjes repareren een kop niet (RCC, 3 maart 2025). Informatie
 * achter een symbool wordt meestal niet gezien (ACM, 2021). Wie de bron in de
 * zin leest, weet het al zonder te klikken. Zie CLAIMS.md.
 */

interface BronProps {
  ids: ClaimId[];
  /** De zichtbare tekst. Zonder kinderen: de bron uit het register. */
  children?: ReactNode;
  className?: string;
}

/** Eén bron als tekst, met de vindplaats als link als die er is. */
const Bronzin = ({ regel }: { regel: Bronregel }) => (
  <>
    {regel.tekst}
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
  </>
);

/**
 * Met de muis opent het kaartje bij aanwijzen en blijft het open zolang de muis
 * op de bron of het kaartje staat. Op een telefoon en met het toetsenbord opent
 * het bij tikken, Enter of spatie. Escape of ernaast klikken sluit het. Dat is
 * wat de toegankelijkheidsrichtlijn (WCAG 1.4.13) vraagt.
 *
 * Een span en geen button, omdat een button niet over twee regels kan breken.
 */
export const Bron = ({ ids, children, className = "" }: BronProps) => {
  const { t } = useTranslation();
  const taal = useTaal();
  const [open, zetOpen] = useState(false);
  const sluitTimer = useRef<number>();
  const doorAanwijzen = useRef(false);

  const muisErop = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(sluitTimer.current);
    if (!open) doorAanwijzen.current = true;
    zetOpen(true);
  };
  const muisEraf = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    sluitTimer.current = window.setTimeout(() => {
      zetOpen(false);
      doorAanwijzen.current = false;
    }, 200);
  };
  useEffect(() => () => window.clearTimeout(sluitTimer.current), []);

  const toets = (e: KeyboardEvent) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    doorAanwijzen.current = false;
    zetOpen((huidig) => !huidig);
  };

  // Eén regel per bron, ook als twee cijfers dezelfde bron delen.
  const regels = new Map<string, Bronregel>();
  for (const id of ids) {
    const regel = bronregel(id, taal, t);
    if (!regels.has(regel.bronId)) regels.set(regel.bronId, regel);
  }

  return (
    <Popover
      open={open}
      onOpenChange={(nieuw) => {
        zetOpen(nieuw);
        if (!nieuw) doorAanwijzen.current = false;
      }}
    >
      <PopoverTrigger asChild>
        <span
          role="button"
          tabIndex={0}
          onPointerEnter={muisErop}
          onPointerLeave={muisEraf}
          onKeyDown={toets}
          onClick={(e) => {
            // Wie eerst aanwijst en dan klikt, wil het kaartje houden, niet sluiten.
            if (doorAanwijzen.current) {
              e.preventDefault();
              doorAanwijzen.current = false;
            }
          }}
          className={`cursor-help underline decoration-dotted decoration-1 underline-offset-[0.2em] hover:decoration-solid focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${className}`}
        >
          {children ?? bronLabel(ids[0], taal, t)}
        </span>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        collisionPadding={16}
        onPointerEnter={muisErop}
        onPointerLeave={muisEraf}
        // Bij aanwijzen de focus laten waar hij is; bij tikken of Enter gaat hij
        // naar het kaartje, zodat je met Tab bij de links komt.
        onOpenAutoFocus={(e) => {
          if (doorAanwijzen.current) e.preventDefault();
        }}
        className="w-80 max-w-[calc(100vw-2rem)] rounded-lg border-gray-200 bg-white p-4 text-left text-base font-normal leading-relaxed text-brand-gray-dark shadow-lg"
      >
        <ul className="space-y-2">
          {[...regels.values()].map((regel) => (
            <li key={regel.bronId}>
              <Bronzin regel={regel} />
            </li>
          ))}
        </ul>
        <Link
          to={methodePad(taal)}
          onClick={() => zetOpen(false)}
          className="mt-3 inline-block font-semibold text-brand-orange underline underline-offset-2 hover:text-brand-purple"
        >
          {t("claims.methodeLink")}
        </Link>
      </PopoverContent>
    </Popover>
  );
};

/**
 * Een tekst uit de vertaalbestanden met de bron erin gemarkeerd, zoals
 * "<bron>Bij TheyDo</bron> deed 42% mee". Het gemarkeerde stuk wordt de bron
 * met stippellijn en kaartje. Een lege markering, "<bron></bron>", krijgt de
 * bron uit het register: "(De Bruin, 2018)". Staan er meer cijfers in één tekst,
 * dan zegt `claim` welk cijfer bij welke markering hoort:
 * '<bron claim="leger-fm722"></bron>'.
 */
export const TekstMetBron = ({ tekst, ids }: { tekst: string; ids: ClaimId[] }) => {
  if (ids.length === 0 || !tekst.includes("<bron")) return <>{zonderBron(tekst)}</>;
  // Een platte lijst in plaats van een <Fragment key> per stuk: de Lovable-tagger
  // zet in de ontwikkelmodus een data-attribuut op elke Fragment, en dan klaagt
  // React bij elke render.
  return (
    <>
      {tekst.split(/<bron(?: claim="([^"]+)")?>([\s\S]*?)<\/bron>/).map((deel, i, delen) => {
        // split geeft per markering drie stukken: tekst ervoor, claim, inhoud.
        if (i % 3 === 0) return deel;
        if (i % 3 === 1) return null;
        const claim = delen[i - 1] as ClaimId | undefined;
        return (
          <Bron key={i} ids={claim ? [claim] : ids}>
            {deel || undefined}
          </Bron>
        );
      })}
    </>
  );
};
