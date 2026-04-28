import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { detectLanguageFromPath } from "@/i18n/config";

/**
 * Keeps i18next's active language in sync with the current URL.
 * Mounted once near the top of the router so every navigation triggers it.
 */
const LanguageSync = () => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = detectLanguageFromPath(pathname);
    if (i18n.language !== lang) {
      void i18n.changeLanguage(lang);
    }
    // Update <html lang>
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [pathname, i18n]);

  return null;
};

export default LanguageSync;
