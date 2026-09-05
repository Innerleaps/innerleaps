import { useEffect, useState } from "react";
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
 * Vorm is die van holiepizza.nl, op verzoek: een wit kaartje linksonder, niet
 * schermvullend, met een gevulde knop "Accepteren" en een omlijnde
 * "Cookie instellingen" die een venster opent met schakelaars per categorie.
 *
 * Twee dingen die hier bewust anders zijn dan bij dat voorbeeld.
 *
 * De banner gaat op een telefoon boven de zwevende knop staan, met behulp van
 * dezelfde hoogte die StickyCtaButtons meet. Anders liggen die twee over
 * elkaar heen en kun je geen van beide goed raken.
 *
 * En weigeren staat in het venster, niet op de banner zelf. Dat is een
 * uitdrukkelijke keuze van Bas na overleg. Het betekent dat weigeren twee
 * klikken kost en accepteren één, en dat is precies waar de Autoriteit
 * Persoonsgegevens op handhaaft. De weigerknop staat daarom wel als eerste en
 * even zwaar in dat venster, niet weggestopt onderaan.
 */
const Cookiebanner = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const privacyPad = detectLanguageFromPath(pathname) === "en" ? "/privacy" : "/privacy";

  const [zichtbaar, setZichtbaar] = useState(false);
  const [venster, setVenster] = useState(false);
  const [keuze, setKeuze] = useState<Toestemming>({ analyse: true, advertenties: true });

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

  const afronden = (gekozen: Toestemming) => {
    bewaarToestemming(gekozen);
    setKeuze(gekozen);
    setVenster(false);
    setZichtbaar(false);
  };

  if (!zichtbaar) return null;

  const privacyLink = <Link to={privacyPad} className="underline hover:no-underline" />;
  const oranje = <span className="text-brand-orange" />;

  return (
    <div
      role="dialog"
      aria-label={t("cookiebanner.title")}
      /* Boven de zwevende knop, en met dezelfde hoogte als afstand zodat ze
         elkaar op een telefoon niet overlappen. */
      className="fixed bottom-[calc(var(--sticky-cta-height,0px)+1rem)] left-4 right-4 z-[60] sm:left-8 sm:right-auto sm:bottom-8 sm:max-w-xl"
    >
      <div className="rounded-xl bg-white p-6 shadow-2xl ring-1 ring-black/5 md:p-8">
        {!venster ? (
          <>
            <h2 className="text-xl font-bold text-brand-purple md:text-2xl">
              <Trans i18nKey="cookiebanner.title" t={t} components={[oranje]} />
            </h2>
            <p className="mt-3 text-base leading-relaxed text-brand-gray-medium">
              <Trans i18nKey="cookiebanner.body" t={t} components={[privacyLink]} />
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => afronden({ analyse: true, advertenties: true })}
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
          </>
        ) : (
          <>
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

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                onClick={() => afronden({ analyse: false, advertenties: false })}
                className="min-h-[44px] border-2 px-6 text-base font-semibold"
              >
                {t("cookiebanner.panel.rejectAll")}
              </Button>
              <Button
                onClick={() => afronden(keuze)}
                className="min-h-[44px] bg-brand-orange px-6 text-base font-semibold hover:bg-brand-orange/90"
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
