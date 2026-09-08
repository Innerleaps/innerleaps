import { memo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import Footer from "@/components/Footer";
import { JuridischeTekst, opmaak } from "@/content/juridisch";
import { cookiesNl } from "@/content/cookies-nl";
import { cookiesEn } from "@/content/cookies-en";
import { detectLanguageFromPath } from "@/i18n/config";

/** De cookieverklaring, in twee talen. Zie PrivacyNotice.tsx voor het waarom. */
const Cookies = memo(() => {
  const { pathname } = useLocation();
  const engels = detectLanguageFromPath(pathname) === "en";
  const pagina = engels ? cookiesEn : cookiesNl;

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
      <Footer />
    </>
  );
});

Cookies.displayName = "Cookies";

export default Cookies;
