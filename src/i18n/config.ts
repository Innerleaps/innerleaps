import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import nlCommon from "./locales/nl/common.json";
import enCommon from "./locales/en/common.json";
import nlMethode from "./locales/nl/methode.json";
import enMethode from "./locales/en/methode.json";
import nlOverons from "./locales/nl/overons.json";
import enOverons from "./locales/en/overons.json";
import nlContact from "./locales/nl/contact.json";
import enContact from "./locales/en/contact.json";

export const SUPPORTED_LANGUAGES = ["nl", "en"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * Mapping between Dutch (default) routes and their English equivalents.
 * Used by the language switcher to navigate to the equivalent page in the
 * other language, and by the i18n bootstrapping logic to detect language
 * from the URL path.
 *
 * Keep slugs lowercase, kebab-case, no trailing slash.
 * Add new entries here whenever a new public, menu-reachable page is added.
 */
export const ROUTE_MAP: Array<{ nl: string; en: string }> = [
  { nl: "/", en: "/en" },
  { nl: "/breintraining-methode", en: "/en/method" },
  { nl: "/over-ons", en: "/en/about-us" },
  { nl: "/contact", en: "/en/contact" },
  { nl: "/vitaliteitstraining", en: "/en/vitality-training" },
  { nl: "/duurzame-inzetbaarheid-training", en: "/en/sustainable-employability-training" },
  { nl: "/stressmanagement-training", en: "/en/stress-management-training" },
  { nl: "/prestatie-training", en: "/en/performance-training" },
  { nl: "/blog", en: "/en/blog" },
  // Blog articles
  {
    nl: "/blog/ziekteverzuim-verlagen-wetenschappelijk-bewezen-aanpak-2025",
    en: "/en/blog/reducing-absenteeism-evidence-based-approach-2025",
  },
  {
    nl: "/blog/verborgen-kosten-ziekteverzuim-rekenmodel",
    en: "/en/blog/hidden-costs-of-absenteeism-calculator",
  },
  {
    nl: "/blog/hoe-verlaag-ik-het-ziekteverzuim-in-mijn-organisatie",
    en: "/en/blog/how-to-reduce-absenteeism-in-my-organization",
  },
];

/** Returns the equivalent path in the target language, or null if no mapping exists. */
export const getEquivalentPath = (
  currentPath: string,
  targetLang: SupportedLanguage,
): string | null => {
  const normalized = currentPath.replace(/\/+$/, "") || "/";
  const entry = ROUTE_MAP.find(
    (m) => m.nl === normalized || m.en === normalized,
  );
  if (!entry) return null;
  return targetLang === "nl" ? entry.nl : entry.en;
};

/** Detects the language a given path belongs to. */
export const detectLanguageFromPath = (pathname: string): SupportedLanguage => {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "nl";
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      nl: { common: nlCommon, methode: nlMethode, overons: nlOverons, contact: nlContact },
      en: { common: enCommon, methode: enMethode, overons: enOverons, contact: enContact },
    },
    fallbackLng: "nl",
    supportedLngs: SUPPORTED_LANGUAGES,
    nonExplicitSupportedLngs: true, // treat "en-US", "en-GB" etc. as "en"
    ns: ["common", "methode", "overons", "contact"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    detection: {
      // Order matters: URL path > previous user choice > browser
      order: ["path", "localStorage", "navigator", "htmlTag"],
      lookupFromPathIndex: 0,
      caches: ["localStorage"],
      lookupLocalStorage: "innerleaps-lang",
    },
    react: { useSuspense: false },
  });

// Override path detection so it only matches "/en" prefix; everything else = NL.
const currentLang = detectLanguageFromPath(window.location.pathname);
if (i18n.language !== currentLang) {
  // Respect URL on first load — URL is authoritative.
  void i18n.changeLanguage(currentLang);
}

export default i18n;
