import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Check, ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  detectLanguageFromPath,
  getEquivalentPath,
  type SupportedLanguage,
} from "@/i18n/config";

interface LanguageSwitcherProps {
  /**
   * "inline": NL | EN naast elkaar (footer, cookiebanner). "block": idem voor
   * het uitklapmenu op mobiel. "dropdown": een compacte keuzelijst voor de
   * header, met een wereldbol en de taalnamen in hun eigen taal.
   */
  variant?: "inline" | "block" | "dropdown";
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

/**
 * Taalnamen in hun eigen taal, zonder vlag. Een vlag staat voor een land, niet
 * voor een taal, en "Nederlands" herkent een Nederlander sneller dan "NL".
 */
const NAMEN: Record<SupportedLanguage, string> = { nl: "Nederlands", en: "English" };

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

  if (variant === "dropdown") {
    return (
      // Niet modaal: anders zet Radix een scrollslot op de pagina en springt de
      // header een scrollbalkbreedte opzij zodra je hem opent.
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          aria-label={current === "nl" ? "Taal: Nederlands. Kies een taal" : "Language: English. Choose a language"}
          className="flex items-center gap-1.5 rounded-md px-2 py-2 text-base font-medium text-brand-gray-dark transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue data-[state=open]:text-brand-blue"
        >
          <Globe className="h-5 w-5 text-brand-orange" aria-hidden="true" />
          <span>{current.toUpperCase()}</span>
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[11rem] bg-white">
          {LANGS.map((l) => (
            <DropdownMenuItem
              key={l.code}
              lang={l.code}
              onSelect={() => handleSwitch(l.code)}
              className="cursor-pointer gap-3 px-3 py-2 text-base text-brand-gray-dark focus:bg-brand-off-white focus:text-brand-purple"
            >
              <span className="flex-1">{NAMEN[l.code]}</span>
              {current === l.code && <Check className="h-4 w-4 text-brand-orange" aria-hidden="true" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

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
