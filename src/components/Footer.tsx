import { memo, useState, type FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Linkedin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LanguageSwitcher from "@/components/LanguageSwitcher";
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
  const [email, setEmail] = useState("");

  const href = {
    vitality: lang === 'en' ? '/en/sustainable-employability' : '/duurzame-inzetbaarheid',
    employability: lang === 'en' ? '/en/improve-team-performance' : '/team-prestaties-verbeteren',
    stress: lang === 'en' ? '/en/stress-management-training' : '/stressmanagement-training',
    performance: lang === 'en' ? '/en/performance-training' : '/prestatie-training',
    masterclass: lang === 'en' ? '/en#masterclass' : '/#masterclass',
    method: lang === 'en' ? '/en/method' : '/breintraining-methode',
    blog: lang === 'en' ? '/en/blog' : '/blog',
    contact: lang === 'en' ? '/en/contact' : '/contact',
    privacy: lang === 'en' ? '/en/privacy' : '/privacy',
    cookies: lang === 'en' ? '/en/cookies' : '/cookies',
    terms: lang === 'en' ? '/en/terms-and-conditions' : '/algemene-voorwaarden',
  };

  const trainingLinks = [
    { to: href.vitality, label: t('menuItems.vitality.label') },
    { to: href.employability, label: t('menuItems.employability.label') },
    { to: href.stress, label: t('menuItems.stress.label') },
    { to: href.performance, label: t('footer.performanceLink') },
    { to: href.masterclass, label: t('footer.masterclassLink') },
    { to: href.method, label: t('footer.methodLink') },
    { to: href.blog, label: t('nav.blog') },
    { to: href.contact, label: t('nav.contact') },
  ];

  /**
   * TODO: nog niet aangesloten. Er is geen nieuwsbrief-endpoint in dit project:
   * de acht edge functions gaan over de rekentool, aanmeldingen en het
   * contactformulier, en er staat geen mailtool in de code. Zolang dat zo is
   * doet deze knop niets en beloven we de bezoeker ook niets. Koppel hem aan
   * de mailtool voordat dit naar productie gaat.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <footer
      className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white pt-12 pb-12 md:pb-28"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <meta itemProp="name" content="Innerleaps" />
      <meta itemProp="url" content="https://innerleaps.nl" />
      <meta itemProp="sameAs" content={LINKEDIN_URL} />
      <meta itemProp="identifier" content="KvK 98136925" />

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1.6fr] gap-10">
          {/* Kolom 1 — merk, bewijs en contact */}
          <div>
            <div className="text-2xl font-bold mb-4">Innerleaps</div>
            <p className="text-xl text-gray-300 leading-relaxed mb-6 max-w-sm">
              {t('footer.tagline')}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="border border-white/30 rounded-lg px-3 py-1.5 text-base font-semibold">
                {t('footer.trustVmbn')}
              </span>
              <span className="flex items-center gap-2 text-base text-gray-300">
                <span className="flex" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-brand-orange fill-brand-orange" />
                  ))}
                </span>
                <b className="text-white font-semibold">{t('footer.googleRatingValue')}</b>
                {t('footer.googleRatingSuffix')}
              </span>
            </div>

            <address
              className="not-italic space-y-2 text-base text-gray-300 mb-6"
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
                  +31 6 23 45 34 77
                </a>
              </p>
              <p>
                <span itemProp="streetAddress">{t('footer.addressLine1')}</span>
                <br />
                <span itemProp="postalCode">1076 DE</span>{" "}
                <span itemProp="addressLocality">Amsterdam</span>
              </p>
              <p>{t('footer.kvk')}</p>
            </address>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('footer.linkedinAria')}
              className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Linkedin className="h-5 w-5 text-white" />
            </a>
          </div>

          {/* Kolom 2 — trainingen */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('footer.trainingsHeading')}</h3>
            <nav aria-label={t('footer.trainingsAria')}>
              <ul className="space-y-2">
                {trainingLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="block text-base text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Kolom 3 — nieuwsbrief */}
          <div className="bg-white/[0.07] border border-white/15 rounded-xl p-6 md:p-8">
            <h3 className="text-2xl font-bold text-white">{t('footer.newsletterHeading')}</h3>
            <p className="mt-2 text-base text-gray-300 leading-relaxed">
              {t('footer.newsletterBody')}
            </p>

            <form onSubmit={handleSubmit} className="mt-5">
              <label htmlFor="footer-newsletter-email" className="sr-only">
                {t('footer.newsletterLabel')}
              </label>
              <Input
                id="footer-newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t('footer.newsletterPlaceholder')}
                className="h-auto py-4 rounded-lg border-transparent text-brand-gray-dark focus-visible:ring-brand-orange focus-visible:ring-offset-brand-blue-dark"
              />
              <Button type="submit" className="w-full min-h-[44px] mt-3 py-4 rounded-lg text-base font-semibold">
                {t('footer.newsletterButton')}
              </Button>

              <label className="mt-4 flex items-start gap-2 text-base text-gray-300">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-1 h-4 w-4 flex-shrink-0 accent-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue-dark"
                />
                <span>
                  {t('footer.newsletterConsent')}{" "}
                  <Link to={href.privacy} className="underline underline-offset-2 hover:text-white transition-colors">
                    {t('footer.newsletterConsentLink')}
                  </Link>
                  .
                </span>
              </label>
            </form>
          </div>
        </div>

        {/* Juridische balk */}
        <div className="border-t border-white/15 mt-10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-base text-gray-400">
          <p>{t('footer.copyright')}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link to={href.privacy} className="hover:text-white transition-colors">
              {t('footer.privacy')}
            </Link>
            <span className="text-gray-600" aria-hidden="true">·</span>
            <Link to={href.cookies} className="hover:text-white transition-colors">
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
            <Link to={href.terms} className="hover:text-white transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
          <LanguageSwitcher tone="dark" />
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
