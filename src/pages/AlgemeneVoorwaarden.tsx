import { memo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import Footer from "@/components/Footer";
import { JuridischeTekst, opmaak } from "@/content/juridisch";
import { termsNl } from "@/content/terms-nl";
import { termsEn } from "@/content/terms-en";
import { detectLanguageFromPath } from "@/i18n/config";

/**
 * De algemene voorwaarden, in twee talen, net als de privacyverklaring in
 * PrivacyNotice.tsx. Stond hier eerst als losse JSX, alleen in het Engels,
 * zonder Engelse route. De teksten staan nu in src/content, de opmaak in
 * juridisch.tsx.
 */
const AlgemeneVoorwaarden = memo(() => {
  const { pathname } = useLocation();
  const engels = detectLanguageFromPath(pathname) === "en";
  const pagina = engels ? termsEn : termsNl;

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

AlgemeneVoorwaarden.displayName = "AlgemeneVoorwaarden";

export default AlgemeneVoorwaarden;
