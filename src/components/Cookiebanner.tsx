import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { detectLanguageFromPath } from "@/i18n/config";
import {
  bewaarToestemming,
  leesToestemming,
  OPEN_INSTELLINGEN,
  type Toestemming,
} from "@/lib/toestemming";

/**
 * De cookiebanner.
 *
 * Twee vormen, met opzet verschillend.
 *
 * De melding zelf is een lage balk over de volle breedte, tegen de onderrand.
 * Dat is geen smaakkwestie. Op een laptop van 1280 bij 720 eindigt de knop in
 * de hero 108 pixels boven de onderkant van het scherm, dus elk kaartje dat
 * daar linksonder zweeft dekt de enige actie van de pagina af. Een balk van
 * tachtig pixels laat hem vrij, op elk schermformaat. Verklein je het kaartje
 * in plaats daarvan, dan blijft het er dwars overheen liggen.
 *
 * Het instellingenvenster blijft wel een kaartje. Schakelaars met uitleg
 * passen niet op een regel, en dat venster opent alleen als de bezoeker er
 * zelf op klikt. Dan mag het scherm even vol.
 *
 * De balk publiceert zijn hoogte als --cookiebanner-height, en de zwevende
 * knop van StickyCtaButtons gaat daar bovenop staan. Eerder liep het andersom,
 * maar toen stond de banner niet onderaan. Nu is de banner het onderste
 * element: hij is tijdelijk en verdwijnt na één klik, de knop niet.
 *
 * Er is geen weigerknop, ook niet in het venster. Weigeren gaat door de
 * schakelaars zelf uit te zetten en dan te bevestigen, precies als bij
 * holiepizza.nl. Een uitdrukkelijke keuze van Bas na overleg over wat de
 * Autoriteit Persoonsgegevens hierover zegt.
 */
const Cookiebanner = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const privacyPad = detectLanguageFromPath(pathname) === "en" ? "/privacy" : "/privacy";

  const [zichtbaar, setZichtbaar] = useState(false);
  const [venster, setVenster] = useState(false);
  const [keuze, setKeuze] = useState<Toestemming>({ analyse: true, advertenties: true });
  const balkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const eerder = leesToestemming();
    if (!eerder) {
      setZichtbaar(true);
    } else {
      setKeuze(eerder);
    }
    // Vanuit de footer kan de bezoeker zijn keuze later wijzigen.
    const opnieuw = () => {
      setKeuze(leesToestemming() ?? { analyse: true, advertenties: true });
      setVenster(true);
      setZichtbaar(true);
    };
    window.addEventListener(OPEN_INSTELLINGEN, opnieuw);
    return () => window.removeEventListener(OPEN_INSTELLINGEN, opnieuw);
  }, []);

  // De hoogte doorgeven, zodat de zwevende knop en de laatste regel van de
  // pagina erbovenop komen. Meten en niet vastleggen: de tekst loopt op een
  // telefoon over meer regels dan op een laptop. Alleen voor de balk, want het
  // instellingenvenster is een overlay en hoort nergens ruimte voor vrij te
  // houden.
  const balkStaatEr = zichtbaar && !venster;
  useEffect(() => {
    const body = document.body;
    const balk = balkRef.current;
    const opruimen = () => {
      body.classList.remove("has-cookiebanner");
      body.style.removeProperty("--cookiebanner-height");
    };
    if (!balkStaatEr || !balk) {
      opruimen();
      return;
    }
    const meten = () => {
      body.style.setProperty("--cookiebanner-height", `${balk.offsetHeight}px`);
      body.classList.add("has-cookiebanner");
    };
    meten();
    const waarnemer = new ResizeObserver(meten);
    waarnemer.observe(balk);
    return () => {
      waarnemer.disconnect();
      opruimen();
    };
  }, [balkStaatEr]);

  const afrondenMet = (gekozen: Toestemming) => {
    bewaarToestemming(gekozen);
    setKeuze(gekozen);
    setVenster(false);
    setZichtbaar(false);
  };

  if (!zichtbaar) return null;

  const privacyLink = <Link to={privacyPad} className="underline hover:no-underline" />;
  const oranje = <span className="text-brand-orange" />;

  if (!venster) {
    return (
      <div
        ref={balkRef}
        role="dialog"
        aria-label={t("cookiebanner.title")}
        className="fixed inset-x-0 bottom-0 z-[60] border-t border-gray-200 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-8">
          <p className="text-base leading-relaxed text-brand-gray-medium">
            <Trans i18nKey="cookiebanner.body" t={t} components={[privacyLink]} />
          </p>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => afrondenMet({ analyse: true, advertenties: true })}
              className="min-h-[44px] bg-brand-orange px-8 text-base font-semibold hover:bg-brand-orange/90"
            >
              {t("cookiebanner.accept")}
            </Button>
            <Button
              variant="outline"
              onClick={() => setVenster(true)}
              className="min-h-[44px] border-2 px-8 text-base font-semibold"
            >
              {t("cookiebanner.settings")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-label={t("cookiebanner.title")}
      className="fixed bottom-4 left-4 right-4 z-[60] sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-xl"
    >
      <div className="rounded-xl bg-white p-6 shadow-2xl ring-1 ring-black/5 md:p-8">
        <h2 className="text-xl font-bold text-brand-purple md:text-2xl">
          <Trans i18nKey="cookiebanner.panel.title" t={t} components={[oranje]} />
        </h2>
        <p className="mt-3 text-base leading-relaxed text-brand-gray-medium">
          {t("cookiebanner.panel.intro")}
        </p>

        <div className="mt-5 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-base font-semibold text-brand-gray-dark">
                {t("cookiebanner.panel.necessaryTitle")}
              </div>
              <p className="text-base text-brand-gray-medium">
                {t("cookiebanner.panel.necessaryBody")}
              </p>
            </div>
            <span className="shrink-0 pt-1 text-base font-medium text-brand-gray-medium">
              {t("cookiebanner.panel.necessaryAlways")}
            </span>
          </div>

          {([
            ["analyse", "analyticsTitle", "analyticsBody"],
            ["advertenties", "adsTitle", "adsBody"],
          ] as const).map(([sleutel, kop, uitleg]) => (
            <div key={sleutel} className="flex items-start justify-between gap-4">
              <div>
                <label
                  htmlFor={`cookie-${sleutel}`}
                  className="text-base font-semibold text-brand-gray-dark"
                >
                  {t(`cookiebanner.panel.${kop}`)}
                </label>
                <p className="text-base text-brand-gray-medium">
                  {t(`cookiebanner.panel.${uitleg}`)}
                </p>
              </div>
              <Switch
                id={`cookie-${sleutel}`}
                checked={keuze[sleutel]}
                onCheckedChange={(aan) => setKeuze((k) => ({ ...k, [sleutel]: aan }))}
                className="mt-1 shrink-0"
              />
            </div>
          ))}
        </div>

        {/* Eén knop, zoals bij het voorbeeld dat Bas aanwees: weigeren doe
            je door de schakelaars zelf uit te zetten en dan te bevestigen.
            De schakelaars staan daarom standaard aan, ook als het
            voorbeeld. */}
        <div className="mt-6">
          <Button
            onClick={() => afrondenMet(keuze)}
            className="min-h-[44px] bg-brand-orange px-8 text-base font-semibold hover:bg-brand-orange/90"
          >
            {t("cookiebanner.panel.save")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cookiebanner;
