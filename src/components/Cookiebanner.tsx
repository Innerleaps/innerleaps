import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { detectLanguageFromPath } from "@/i18n/config";
import { startApolloAlsToegestaan } from "@/lib/apollo";
import {
  bewaarToestemming,
  leesToestemming,
  OPEN_INSTELLINGEN,
  type Toestemming,
} from "@/lib/toestemming";

/**
 * De cookiemelding, als venster midden op het scherm.
 *
 * Het was eerst een kaartje linksonder en daarna een lage balk onderaan. Beide
 * hadden hetzelfde probleem: je kunt eromheen. Wie de balk niet ziet kiest
 * niets, en wie niets kiest wordt niet gemeten. Bij lage advertentievolumes is
 * dat het verschil tussen een campagne die leert en een die blind biedt.
 *
 * Deze vorm komt van coolblue.nl, op verzoek van Bas: een witte kaart in het
 * midden, geen kruisje, en de pagina eronder op slot tot er een keuze ligt.
 * Coolblue zet daarvoor overflow op hidden, en dat doet dit venster ook.
 *
 * Drie dingen die daarbij horen.
 *
 * Het venster verschijnt niet tijdens het prerenderen. Anders staat het in de
 * voorgebakken HTML van alle 32 pagina's, flitst het ook bij wie allang
 * gekozen heeft, en zit het scrollslot in het bestand. Laadt React dan niet,
 * dan kan niemand de pagina meer scrollen. Zie window.__PRERENDER__ in
 * scripts/prerender.mjs.
 *
 * Escape sluit het niet en er is geen kruisje. Wegklikken zonder keuze zou
 * hetzelfde zijn als weigeren, maar dan zonder dat de bezoeker het weet.
 *
 * En er is geen weigerknop. Weigeren gaat via "Zelf instellen", daar de
 * schakelaars uitzetten en bevestigen. Een uitdrukkelijke keuze van Bas, na
 * overleg over wat de Autoriteit Persoonsgegevens hierover zegt. Coolblue doet
 * het net iets anders: bij hen staat het persoonlijke deel standaard uit, dus
 * daar is "Zelf instellen" wél een weigerknop in één klik.
 */
const Cookiebanner = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const engels = detectLanguageFromPath(pathname) === "en";
  const privacyPad = engels ? "/en/privacy" : "/privacy";
  const cookiePad = engels ? "/en/cookies" : "/cookies";

  const [zichtbaar, setZichtbaar] = useState(false);
  const [venster, setVenster] = useState(false);
  const [keuze, setKeuze] = useState<Toestemming>({ analyse: true, advertenties: true });
  const eersteKnop = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if ((window as unknown as { __PRERENDER__?: boolean }).__PRERENDER__) return;

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

  // De pagina op slot zolang het venster openstaat, en de knop meteen onder de
  // vinger. Het slot gaat via een klasse en niet via een losse stijl, zodat er
  // niets blijft hangen als dit component onverwacht verdwijnt.
  useEffect(() => {
    if (!zichtbaar) return;
    // Op allebei: zet je het alleen op body, dan blijft html de scrollende
    // laag en schuift de pagina er alsnog onderdoor.
    document.documentElement.classList.add("cookie-slot");
    document.body.classList.add("cookie-slot");
    eersteKnop.current?.focus();
    return () => {
      document.documentElement.classList.remove("cookie-slot");
      document.body.classList.remove("cookie-slot");
    };
  }, [zichtbaar]);

  const afrondenMet = (gekozen: Toestemming) => {
    bewaarToestemming(gekozen);
    // Meteen na het akkoord, niet pas bij de volgende pagina.
    startApolloAlsToegestaan();
    setKeuze(gekozen);
    setVenster(false);
    setZichtbaar(false);
  };

  if (!zichtbaar) return null;

  const privacyLink = <Link to={privacyPad} className="underline hover:no-underline" />;
  const cookieLink = <Link to={cookiePad} className="underline hover:no-underline" />;
  const oranje = <span className="text-brand-orange" />;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-brand-purple/60 p-4 backdrop-blur-[2px]"
      /* Geen onClick die sluit: buiten het venster klikken is geen keuze. */
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("cookiebanner.aria")}
        className="my-auto w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl md:p-8"
      >
        {!venster ? (
          <>
            {/* De taalknop hoort in dit venster en niet alleen in de
                menubalk: die balk zit erachter en is niet aanklikbaar zolang
                de melding openstaat. Een Engelstalige bezoeker zou anders
                moeten kiezen zonder te snappen wat er staat. */}
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-bold text-brand-purple md:text-3xl">
                <Trans i18nKey="cookiebanner.title" t={t} components={[oranje]} />
              </h2>
              <div className="shrink-0 pt-1">
                <LanguageSwitcher />
              </div>
            </div>
            <p className="mt-4 text-lg leading-relaxed text-brand-gray-medium">
              {t("cookiebanner.body")}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-brand-gray-medium">
              <Trans i18nKey="cookiebanner.bodyChoice" t={t} components={[cookieLink, privacyLink]} />
            </p>
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                onClick={() => setVenster(true)}
                className="min-h-[48px] border-2 px-8 text-base font-semibold"
              >
                {t("cookiebanner.settings")}
              </Button>
              <Button
                ref={eersteKnop}
                onClick={() => afrondenMet({ analyse: true, advertenties: true })}
                className="min-h-[48px] bg-brand-orange px-8 text-base font-semibold hover:bg-brand-orange/90"
              >
                {t("cookiebanner.accept")}
              </Button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-brand-purple md:text-3xl">
              <Trans i18nKey="cookiebanner.panel.title" t={t} components={[oranje]} />
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-gray-medium">
              {t("cookiebanner.panel.intro")}
            </p>

            <div className="mt-6 space-y-5">
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

            <div className="mt-8 flex justify-end">
              <Button
                onClick={() => afrondenMet(keuze)}
                className="min-h-[48px] bg-brand-orange px-8 text-base font-semibold hover:bg-brand-orange/90"
              >
                {t("cookiebanner.panel.save")}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cookiebanner;
