import { memo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import Footer from "@/components/Footer";
import { JuridischeTekst, opmaak } from "@/content/juridisch";
import { privacyNl } from "@/content/privacy-nl";
import { privacyEn } from "@/content/privacy-en";
import { detectLanguageFromPath } from "@/i18n/config";

/**
 * De privacyverklaring, in twee talen.
 *
 * De tekst stond hier eerst als JSX, alleen in het Engels, terwijl de
 * cookiemelding ernaar linkt in het Nederlands. Een Nederlandse bezoeker klikte
 * dus op "privacyverklaring" en landde in een Engelse tekst. Voor een pagina
 * waar toestemming aan hangt is dat geen detail: de uitleg moet te begrijpen
 * zijn voor wie hem leest.
 *
 * De teksten staan nu in src/content, de opmaak in juridisch.tsx.
 */
const PrivacyNotice = memo(() => {
  const { pathname } = useLocation();
  const engels = detectLanguageFromPath(pathname) === "en";
  const pagina = engels ? privacyEn : privacyNl;

  return (
    <>
      <Helmet>
        <html lang={engels ? "en" : "nl"} />
        <title>{pagina.metaTitel}</title>
        <meta name="description" content={pagina.metaBeschrijving} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <SimplifiedNavigation />
      <main className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-purple mb-4 leading-tight">
            {pagina.titel}
          </h1>
          <p className="text-brand-gray-medium text-xl mb-12">{opmaak(pagina.ondertitel)}</p>
          <JuridischeTekst pagina={pagina} />
        </div>
      </main>
      <Footer showNavigation={false} />
    </>
  );
});

PrivacyNotice.displayName = "PrivacyNotice";

export default PrivacyNotice;
