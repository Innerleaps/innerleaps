import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { detectLanguageFromPath } from "@/i18n/config";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  meldWerkgeverMailKlik,
  meldWerkgeverMailWeg,
  type WerkgeverMailKnop as Positie,
  type WerkgeverMailWeg,
} from "@/lib/conversies";

const SITE_URL = "https://innerleaps.nl";

interface WerkgeverMailKnopProps {
  positie: Positie;
  className?: string;
  /** Uit de tabvolgorde zolang de zwevende balk verborgen is. */
  tabIndex?: number;
}

/**
 * "Stel het voor aan je werkgever": opent een venster met een mail die al
 * klaarstaat, en vier manieren om hem te versturen.
 *
 * Eerst was dit een gewone mailto-link. Die werkt alleen als er een
 * mailprogramma op de computer is ingesteld. Wie Gmail of Outlook in de
 * browser gebruikt, kreeg niets, of het lege Mail van de Mac. Daarom nu Gmail
 * en Outlook op het web, het mailprogramma, en kopiëren als het allemaal niet
 * lukt.
 *
 * Er gaat niets via Innerleaps. De tekst staat in training.json onder
 * `stress.mail`, met de link naar de homepage op de plek van {{link}}: de
 * ontvanger is de werkgever, en de homepage is de pagina voor organisaties.
 * Een klikbaar woord kan niet in een mail die via een link wordt aangemaakt,
 * die is altijd platte tekst. Het adres zelf maken mailprogramma's wel
 * klikbaar. Het is het vaste adres, zonder de hostnaam van de omgeving, zodat
 * de mail op een branch-deploy dezelfde is als live.
 */
const WerkgeverMailKnop = ({ positie, className = "", tabIndex }: WerkgeverMailKnopProps) => {
  const { t } = useTranslation("training");
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [gekopieerd, setGekopieerd] = useState(false);

  const onderwerp = t("stress.mail.subject");
  const homepage = detectLanguageFromPath(pathname) === "en" ? `${SITE_URL}/en` : SITE_URL;
  const tekst = t("stress.mail.body", { link: homepage });
  const o = encodeURIComponent(onderwerp);
  // Regeleinden als CRLF voor mailto, zoals de standaard (RFC 6068) ze wil.
  // Met alleen LF plakken sommige mailprogramma's de alinea's aan elkaar.
  const mailtoHref = `mailto:?subject=${o}&body=${encodeURIComponent(tekst.replace(/\n/g, "\r\n"))}`;
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&su=${o}&body=${encodeURIComponent(tekst)}`;
  // De werk- en schoolaccounts van Microsoft 365, wat bij een werkgever het
  // meest voorkomt.
  const outlookHref = `https://outlook.office.com/mail/deeplink/compose?subject=${o}&body=${encodeURIComponent(tekst)}`;

  const kopieer = async () => {
    meldWerkgeverMailWeg("kopieren");
    try {
      await navigator.clipboard.writeText(`${onderwerp}\n\n${tekst}`);
      setGekopieerd(true);
    } catch {
      // Geen toegang tot het klembord. De tekst staat zichtbaar in het
      // venster, dus selecteren en kopiëren kan dan nog met de hand.
    }
  };

  const knopKlasse = "w-full min-h-[44px] font-semibold py-3 px-4 rounded-lg text-base lg:text-lg";
  const weg = (w: WerkgeverMailWeg) => () => meldWerkgeverMailWeg(w);

  return (
    <>
      <Button
        size="lg"
        tabIndex={tabIndex}
        className={
          positie === "sticky"
            ? // Zelfde maat als de zwevende offerteknop op de andere pagina's.
              `w-full md:w-auto min-h-[44px] font-semibold py-3 px-4 md:px-10 rounded-lg text-base md:text-lg shadow-lg whitespace-normal md:whitespace-nowrap ${className}`
            : `w-full lg:w-auto min-h-[44px] font-semibold py-4 px-8 rounded-lg text-base lg:text-lg shadow-xl ${className}`
        }
        onClick={() => {
          meldWerkgeverMailKlik(positie);
          setGekopieerd(false);
          setOpen(true);
        }}
      >
        {t("stress.hero.cta")}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-brand-purple text-left">
              {t("stress.mailDialog.title")}
            </DialogTitle>
          </DialogHeader>

          <div className="bg-brand-off-white rounded-lg p-4 md:p-5">
            <p className="text-lg md:text-xl font-semibold text-brand-gray-dark">{onderwerp}</p>
            <p className="mt-3 text-lg md:text-xl text-brand-gray-medium leading-relaxed whitespace-pre-line break-words">
              {tekst}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button asChild size="lg" className={knopKlasse}>
              <a href={gmailHref} target="_blank" rel="noopener noreferrer" onClick={weg("gmail")}>
                {t("stress.mailDialog.gmail")}
              </a>
            </Button>
            <Button asChild size="lg" className={knopKlasse}>
              <a href={outlookHref} target="_blank" rel="noopener noreferrer" onClick={weg("outlook")}>
                {t("stress.mailDialog.outlook")}
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary" className={knopKlasse}>
              <a href={mailtoHref} onClick={weg("mailprogramma")}>
                {t("stress.mailDialog.mailApp")}
              </a>
            </Button>
            <Button size="lg" variant="secondary" className={knopKlasse} onClick={kopieer}>
              {gekopieerd ? t("stress.mailDialog.copied") : t("stress.mailDialog.copy")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WerkgeverMailKnop;
