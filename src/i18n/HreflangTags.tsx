import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { detectLanguageFromPath, getEquivalentPath } from "@/i18n/config";

const SITE_URL = "https://innerleaps.nl";

/**
 * Adds canonical + hreflang alternates for the current page.
 * Use on every public page that has a translated counterpart.
 */
const HreflangTags = () => {
  const { pathname } = useLocation();
  const currentLang = detectLanguageFromPath(pathname);
  const otherLang = currentLang === "nl" ? "en" : "nl";
  const otherPath = getEquivalentPath(pathname, otherLang);

  const canonical = `${SITE_URL}${pathname}`;
  const nlHref = currentLang === "nl" ? canonical : otherPath ? `${SITE_URL}${otherPath}` : null;
  const enHref = currentLang === "en" ? canonical : otherPath ? `${SITE_URL}${otherPath}` : null;

  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      {nlHref && <link rel="alternate" hrefLang="nl" href={nlHref} />}
      {enHref && <link rel="alternate" hrefLang="en" href={enHref} />}
      {nlHref && <link rel="alternate" hrefLang="x-default" href={nlHref} />}
    </Helmet>
  );
};

export default HreflangTags;
