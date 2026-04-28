import { memo } from "react";
import { Link } from "react-router-dom";
import { Linkedin, Star } from "lucide-react";
import vmbnLogo from "@/assets/vmbn-trainer-categorie-1.png";

interface FooterProps {
  showNavigation?: boolean;
}

const GOOGLE_REVIEWS_URL = "#";
const LINKEDIN_URL = "https://www.linkedin.com/company/innerleaps";

const GoogleG = () => (
  <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.5 29.3 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.6 19 12.5 24 12.5c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.5 29.3 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 43.5c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.6 39 16.2 43.5 24 43.5z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2c-.4.4 6.6-4.8 6.6-14.8 0-1.2-.1-2.3-.4-3.5z"/>
  </svg>
);

const Footer = memo(({ showNavigation = true }: FooterProps) => {
  void showNavigation;

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
              Vitaliteitstraining die verzuim verlaagt en duurzame inzetbaarheid versterkt
            </p>

            <div className="flex flex-wrap items-start gap-6 mb-6">
              <div className="flex flex-col items-center">
                <img
                  src={vmbnLogo}
                  alt="VMBN trainer categorie 1"
                  className="h-16 w-auto bg-white rounded p-1"
                  loading="lazy"
                />
                <span className="text-xs text-gray-300 mt-1">Trainer categorie 1</span>
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
                <span className="text-xs text-gray-300 mt-1">4,7/5 op Google</span>
              </div>
            </div>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Innerleaps op LinkedIn"
              className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Linkedin className="h-5 w-5 text-white" />
            </a>
          </div>

          {/* Column 2 — Trainingen */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Trainingen</h3>
            <nav aria-label="Trainingen">
              <ul className="space-y-2">
                <li>
                  <Link to="/vitaliteitstraining" className="block text-gray-300 hover:text-white transition-colors">
                    Vitaliteitstraining
                  </Link>
                </li>
                <li>
                  <Link to="/stressmanagement-training" className="block text-gray-300 hover:text-white transition-colors">
                    Stressmanagement training
                  </Link>
                </li>
                <li>
                  <Link to="/prestatie-training" className="block text-gray-300 hover:text-white transition-colors">
                    Prestatie en concentratie verbeteren
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="block text-gray-300 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
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
        <div className="border-t border-white/15 mt-8 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-gray-400">
          <p>&copy; 2026 Innerleaps</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacybeleid
            </Link>
            <span className="text-gray-600" aria-hidden="true">·</span>
            <Link to="/cookies" className="hover:text-white transition-colors">
              Cookiebeleid
            </Link>
            <span className="text-gray-600" aria-hidden="true">·</span>
            <Link to="/algemene-voorwaarden" className="hover:text-white transition-colors">
              Algemene voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
