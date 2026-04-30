import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { detectLanguageFromPath, ROUTE_MAP } from "@/i18n/config";

// v2: bumped to invalidate stale values written by the old i18next localStorage
// cache, which prevented the first-visit browser-language redirect from running.
const STORAGE_KEY = "innerleaps-lang-v2";

/**
 * On the very first visit (no stored choice), check the browser language(s).
 * - If Dutch is anywhere in the user's preferred languages → keep them on the
 *   Dutch (default) version.
 * - Otherwise → redirect to the English equivalent of the current page, or to
 *   /en (English homepage) when no specific mapping exists.
 *
 * Subsequent visits respect the user's stored choice (set here or by the
 * LanguageSwitcher).
 */
const InitialLanguageRedirect = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) return; // user already has a preference, never override

    // Already on an EN page? remember the implicit choice and stop.
    if (detectLanguageFromPath(pathname) === "en") {
      window.localStorage.setItem(STORAGE_KEY, "en");
      return;
    }

    // Build a deduplicated, lowercase list of the browser's preferred languages.
    const langList = Array.from(
      new Set(
        [
          ...(Array.isArray(navigator.languages) ? navigator.languages : []),
          navigator.language,
        ]
          .filter(Boolean)
          .map((l) => l.toLowerCase()),
      ),
    );

    const prefersDutch =
      langList.length === 0 || langList.some((l) => l.startsWith("nl"));

    if (prefersDutch) {
      // Persist so the check doesn't run again on every navigation.
      window.localStorage.setItem(STORAGE_KEY, "nl");
      return;
    }

    // Non-Dutch browser on a NL page → redirect to EN equivalent (or /en).
    const normalized = pathname.replace(/\/+$/, "") || "/";
    const entry = ROUTE_MAP.find((m) => m.nl === normalized);
    const target = entry ? entry.en : "/en";

    window.localStorage.setItem(STORAGE_KEY, "en");
    navigate(target, { replace: true });
  }, [pathname, navigate]);

  return null;
};

export default InitialLanguageRedirect;
