import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Linkedin, Star } from "lucide-react";
import vmbnLogo from "@/assets/vmbn-trainer-categorie-1.webp";
import GoogleG from "@/components/GoogleG";
import { detectLanguageFromPath } from "@/i18n/config";
import { OPEN_INSTELLINGEN } from "@/lib/toestemming";

interface FooterProps {
  showNavigation?: boolean;
}

const LINKEDIN_URL = "https://www.linkedin.com/company/innerleaps";


const Footer = memo(({ showNavigation = true }: FooterProps) => {
  void showNavigation;
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = detectLanguageFromPath(pathname);

  const href = {
    vitality: lang === 'en' ? '/en/sustainable-employability' : '/duurzame-inzetbaarheid',
    employability: lang === 'en' ? '/en/improve-team-performance' : '/team-prestaties-verbeteren',
    stress: lang === 'en' ? '/en/stress-management-training' : '/stressmanagement-training',
    performance: lang === 'en' ? '/en/performance-training' : '/prestatie-training',
    blog: lang === 'en' ? '/en/blog' : '/blog',
    contact: lang === 'en' ? '/en/contact' : '/contact',
  };

  return (
    <footer
      className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white py-12"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <meta itemProp="name" content="Innerleaps" />
      <meta itemProp="url" content="https://innerleaps.nl" />
      <meta itemProp="sameAs" content={LINKEDIN_URL} />
      <meta itemProp="identifier" content="KvK 98136925" />

      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 — Brand + social proof */}
          <div>
            <div className="text-2xl font-bold mb-4">Innerleaps</div>
            <p className="text-gray-300 leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>

            <div className="flex flex-wrap items-start gap-6 mb-6">
              <div className="flex flex-col items-center">
                <img
                  src={vmbnLogo}
              width={286}
              height={208}
                  alt="VMBN trainer categorie 1"
                  className="h-16 w-auto bg-white rounded p-1"
                  loading="lazy"
                />
                <span className="text-base text-gray-300 mt-1">{t('footer.trainerCategory')}</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-white rounded p-2 flex items-center gap-2">
                  <GoogleG />
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-brand-orange fill-brand-orange" />
                    ))}
                  </div>
                </div>
                <span className="text-base text-gray-300 mt-1">{t('footer.googleRating')}</span>
              </div>
            </div>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('footer.linkedinAria')}
              className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Linkedin className="h-5 w-5 text-white" />
            </a>
          </div>

          {/* Column 2 — Trainings */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('footer.trainingsHeading')}</h3>
            <nav aria-label={t('footer.trainingsAria')}>
              <ul className="space-y-2">
                <li>
                  <Link to={href.vitality} className="block text-gray-300 hover:text-white transition-colors">
                    {t('menuItems.vitality.label')}
                  </Link>
                </li>
                {/* De teampagina ontbrak hier, waardoor hij als enige propositie
                    geen enkele link had die een crawler zonder JavaScript ziet:
                    het hoofdmenu is een dropdown die pas na een klik in de DOM
                    verschijnt. Label komt uit dezelfde sleutel als het menu. */}
                <li>
                  <Link to={href.employability} className="block text-gray-300 hover:text-white transition-colors">
                    {t('menuItems.employability.label')}
                  </Link>
                </li>
                <li>
                  <Link to={href.stress} className="block text-gray-300 hover:text-white transition-colors">
                    {t('menuItems.stress.label')}
                  </Link>
                </li>
                <li>
                  <Link to={href.performance} className="block text-gray-300 hover:text-white transition-colors">
                    {t('footer.performanceLink')}
                  </Link>
                </li>
                <li>
                  <Link to={href.blog} className="block text-gray-300 hover:text-white transition-colors">
                    {t('nav.blog')}
                  </Link>
                </li>
                <li>
                  <Link to={href.contact} className="block text-gray-300 hover:text-white transition-colors">
                    {t('nav.contact')}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('footer.contactHeading')}</h3>
            <address
              className="not-italic space-y-2 text-gray-300"
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <p>
                <a href="mailto:info@innerleaps.nl" className="hover:text-white transition-colors">
                  info@innerleaps.nl
                </a>
              </p>
              <p>
                <a href="tel:+31623453477" className="hover:text-white transition-colors">
                  06 23 45 34 77
                </a>
              </p>
              <p>
                <span itemProp="streetAddress">Olympisch Stadion 24-28</span>,{" "}
                <span itemProp="postalCode">1076 DE</span>{" "}
                <span itemProp="addressLocality">Amsterdam</span>
              </p>
              <p>KvK: 98136925</p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/15 mt-8 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-base text-gray-400">
          <p>{t('footer.copyright')}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link to={lang === "en" ? "/en/privacy" : "/privacy"} className="hover:text-white transition-colors">
              {t('footer.privacy')}
            </Link>
            <span className="text-gray-600" aria-hidden="true">·</span>
            <Link to={lang === "en" ? "/en/cookies" : "/cookies"} className="hover:text-white transition-colors">
              {t('footer.cookies')}
            </Link>
            <span className="text-gray-600" aria-hidden="true">·</span>
            {/* De bezoeker moet zijn cookiekeuze later kunnen wijzigen. Dit is
                de enige plek waar dat kan, dus hij hoort in de footer en niet
                weggestopt op de cookiepagina. */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(OPEN_INSTELLINGEN))}
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              {t('cookiebanner.footerLink')}
            </button>
            <span className="text-gray-600" aria-hidden="true">·</span>
            <Link to="/algemene-voorwaarden" className="hover:text-white transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
