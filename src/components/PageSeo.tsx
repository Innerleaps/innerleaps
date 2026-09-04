import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { detectLanguageFromPath, getEquivalentPath } from "@/i18n/config";

const SITE_URL = "https://innerleaps.nl";

interface PageSeoProps {
  title: string;
  description: string;
  /** Absolute or root-relative image URL for social previews. */
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  children?: React.ReactNode;
}

/**
 * Per-route head metadata: unique title, description, self-referencing
 * canonical, hreflang alternates and matching Open Graph / Twitter tags.
 */
const PageSeo = ({ title, description, image, type = "website", noindex, children }: PageSeoProps) => {
  const { pathname } = useLocation();
  const currentLang = detectLanguageFromPath(pathname);
  const otherPath = getEquivalentPath(pathname, currentLang === "nl" ? "en" : "nl");

  const canonical = `${SITE_URL}${pathname === "/" ? "/" : pathname.replace(/\/+$/, "")}`;

  /**
   * Op een noindex-pagina heeft hreflang geen betekenis: je vertelt Google
   * welke taalversie hij moet tonen voor een pagina die hij niet mag tonen.
   * Bovendien staan die pagina's niet in ROUTE_MAP, dus er is geen tegenhanger
   * en bleef er een verwijzing naar zichzelf over.
   */
  const nlHref = noindex ? null : currentLang === "nl" ? canonical : otherPath ? `${SITE_URL}${otherPath}` : null;
  const enHref = noindex ? null : currentLang === "en" ? canonical : otherPath ? `${SITE_URL}${otherPath}` : null;
  const absImage = image ? (image.startsWith("http") ? image : `${SITE_URL}${image}`) : null;

  return (
    <Helmet>
      <html lang={currentLang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {nlHref && <link rel="alternate" hrefLang="nl" href={nlHref} />}
      {enHref && <link rel="alternate" hrefLang="en" href={enHref} />}
      {nlHref && <link rel="alternate" hrefLang="x-default" href={nlHref} />}
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Innerleaps" />
      <meta property="og:locale" content={currentLang === "nl" ? "nl_NL" : "en_US"} />
      {absImage && <meta property="og:image" content={absImage} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {absImage && <meta name="twitter:image" content={absImage} />}
      {children}
    </Helmet>
  );
};

export default PageSeo;
