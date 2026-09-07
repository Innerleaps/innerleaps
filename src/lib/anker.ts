/**
 * Naar het anker uit de URL scrollen, als er een staat.
 *
 * Waarom dit een eigen bestand is en niet de browser dit zelf doet: de pagina
 * wordt voorgebakken uitgeleverd en React zet daarna zijn eigen versie ervoor
 * in de plaats. De sprong die de browser bij het laden maakt, maakt hij dus op
 * inhoud die vlak daarna vervangen wordt. Je landt dan alsnog bovenaan.
 *
 * Daarnaast stond er op de propositiepagina's een lijst met twee ankers die
 * met naam werden herkend, en alles wat daar niet in stond viel in een `else`
 * die juist naar bóven scrollde. Een sitelink naar een derde sectie deed dus
 * precies het tegenovergestelde van wat de bedoeling was.
 *
 * Dit werkt voor elk anker, zonder lijst die bijgewerkt moet worden.
 */

/** Zo lang wachten we tot React de pagina heeft neergezet. Iets ruimer dan
 *  nodig: te vroeg scrollen mist het element, te laat ziet niemand. */
const WACHTTIJD = 350;

/**
 * Scrollt naar het element uit de hash. Geeft `true` als er een anker was, ook
 * als het element nog niet bestond, zodat de aanroeper weet dat hij niet naar
 * boven moet scrollen.
 */
export const scrollNaarAnkerUitUrl = (hash: string): boolean => {
  const id = hash.replace(/^#/, "");
  if (!id) return false;

  window.setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Vangnet voor omgevingen waar vloeiend scrollen niets doet. Zie de
    // toelichting bij scrollNaarAfspraak in src/lib/booking.ts.
    const begin = window.scrollY;
    window.setTimeout(() => {
      if (Math.abs(window.scrollY - begin) < 2) el.scrollIntoView({ block: "start" });
    }, 500);
  }, WACHTTIJD);

  return true;
};
