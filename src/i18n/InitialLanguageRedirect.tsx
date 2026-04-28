import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { detectLanguageFromPath, ROUTE_MAP } from "@/i18n/config";

const STORAGE_KEY = "innerleaps-lang";

/**
 * On the very first visit (no stored choice) to the NL home page,
 * if the browser language is not Dutch, redirect to the EN equivalent.
 * Subsequent visits respect the user's stored choice.
 */
const InitialLanguageRedirect = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) return; // user already has a preference, never override

    const browserLang = (navigator.language || "nl").toLowerCase();
    const prefersEnglish = !browserLang.startsWith("nl");
    if (!prefersEnglish) return;

    // Already on an EN page? nothing to do.
    if (detectLanguageFromPath(pathname) === "en") return;

    const normalized = pathname.replace(/\/+$/, "") || "/";
    const entry = ROUTE_MAP.find((m) => m.nl === normalized);
    if (!entry) return; // no mapping → leave the user on NL

    window.localStorage.setItem(STORAGE_KEY, "en");
    navigate(entry.en, { replace: true });
  }, [pathname, navigate]);

  return null;
};

export default InitialLanguageRedirect;
