import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  detectLanguageFromPath,
  getEquivalentPath,
  type SupportedLanguage,
} from "@/i18n/config";

const STORAGE_KEY = "innerleaps-lang-v2";

interface LanguageSwitcherProps {
  /** Compact horizontal layout for desktop nav (default), or stacked for mobile */
  variant?: "inline" | "block";
  /** Called after a successful language switch (e.g. to close mobile menu) */
  onSwitch?: () => void;
}

const LANGS: Array<{ code: SupportedLanguage; label: string; flag: string; aria: string }> = [
  { code: "nl", label: "NL", flag: "🇳🇱", aria: "Wissel naar Nederlands" },
  { code: "en", label: "EN", flag: "🇬🇧", aria: "Switch to English" },
];

const LanguageSwitcher = ({ variant = "inline", onSwitch }: LanguageSwitcherProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const current = detectLanguageFromPath(pathname);

  const handleSwitch = (lang: SupportedLanguage) => {
    if (lang === current) return;
    const target = getEquivalentPath(pathname, lang);
    // Persist the user's explicit choice so we don't auto-redirect on next visit.
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
    void i18n.changeLanguage(lang);
    // Fall back to language home if no mapping exists for this page
    navigate(target ?? (lang === "en" ? "/en" : "/"));
    onSwitch?.();
  };

  return (
    <div
      className={
        variant === "inline"
          ? "flex items-center gap-1 text-sm font-medium"
          : "flex items-center gap-2 text-base font-medium py-2"
      }
      role="group"
      aria-label="Language switcher"
    >
      {LANGS.map((l, i) => (
        <div key={l.code} className="flex items-center">
          {i > 0 && <span className="text-brand-gray-medium mx-1.5" aria-hidden="true">|</span>}
          <button
            type="button"
            onClick={() => handleSwitch(l.code)}
            aria-label={l.aria}
            aria-current={current === l.code ? "true" : undefined}
            className={`flex items-center gap-1.5 transition-colors duration-200 ${
              current === l.code
                ? "text-brand-blue font-semibold cursor-default"
                : "text-brand-gray-dark hover:text-brand-blue"
            }`}
          >
            <span aria-hidden="true">{l.flag}</span>
            <span>{l.label}</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
