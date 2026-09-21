import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  detectLanguageFromPath,
  getEquivalentPath,
  type SupportedLanguage,
} from "@/i18n/config";

interface LanguageSwitcherProps {
  /** Compact horizontal layout for desktop nav (default), or stacked for mobile */
  variant?: "inline" | "block";
  /** Called after a successful language switch (e.g. to close mobile menu) */
  onSwitch?: () => void;
  /**
   * Op welke ondergrond hij staat. De standaardkleuren zijn voor een lichte
   * achtergrond; in de footer valt brand-blue op brand-blue-dark weg.
   */
  tone?: "light" | "dark";
}

const LANGS: Array<{ code: SupportedLanguage; label: string; flag: string; aria: string }> = [
  { code: "nl", label: "NL", flag: "🇳🇱", aria: "Wissel naar Nederlands" },
  { code: "en", label: "EN", flag: "🇬🇧", aria: "Switch to English" },
];

const LanguageSwitcher = ({ variant = "inline", onSwitch, tone = "light" }: LanguageSwitcherProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const current = detectLanguageFromPath(pathname);

  const handleSwitch = (lang: SupportedLanguage) => {
    if (lang === current) return;
    const target = getEquivalentPath(pathname, lang);
    void i18n.changeLanguage(lang);
    // Fall back to language home if no mapping exists for this page
    navigate(target ?? (lang === "en" ? "/en" : "/"));
    onSwitch?.();
  };

  return (
    <div
      className={
        variant === "inline"
          ? "flex items-center gap-1 text-base font-medium"
          : "flex items-center gap-2 text-base font-medium py-2"
      }
      role="group"
      aria-label="Language switcher"
    >
      {LANGS.map((l, i) => (
        <div key={l.code} className="flex items-center">
          {i > 0 && (
            <span
              className={`mx-1.5 ${tone === "dark" ? "text-white/40" : "text-brand-gray-medium"}`}
              aria-hidden="true"
            >
              |
            </span>
          )}
          <button
            type="button"
            onClick={() => handleSwitch(l.code)}
            aria-label={l.aria}
            aria-current={current === l.code ? "true" : undefined}
            className={`flex items-center gap-1.5 transition-colors duration-200 ${
              tone === "dark"
                ? current === l.code
                  ? "text-white font-semibold cursor-default"
                  : "text-gray-300 hover:text-white"
                : current === l.code
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
