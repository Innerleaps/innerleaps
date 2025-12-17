import { memo } from "react";
import { Link } from "react-router-dom";

interface FooterProps {
  showNavigation?: boolean;
}

const Footer = memo(({ showNavigation = true }: FooterProps) => {
  return (
    <footer className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white py-12">
      <div className="container-custom">
        <div className={`grid grid-cols-1 ${showNavigation ? "md:grid-cols-3" : "md:grid-cols-2"} gap-8`}>
          <div>
            <div className="text-2xl font-bold mb-4">Innerleaps</div>
            <p className="text-gray-300 leading-relaxed">
              Wetenschappelijk bewezen vitaliteitsprogramma voor effectief stressmanagement en verhoogde prestaties.
              Train je controlecentrum met push-ups voor je brein: 15-21% minder verzuim, 70% lager uitvalrisico en 10%
              hogere productiviteit.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <p>Email: bas@innerleaps.nl</p>
              <p>Telefoon: 06 23 45 34 77</p>
              <p>Adres: Olympisch Stadion 24, 28, 1076 DE Amsterdam</p>
              <p>KVK nummer: 98136925</p>
            </div>
          </div>
          {showNavigation && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Snel naar</h3>
              <div className="space-y-2">
                <Link 
                  to="/vitaliteitsprogramma" 
                  className="block text-gray-300 hover:text-white transition-colors text-left"
                >
                  Vitaliteitsprogramma
                </Link>
                <Link 
                  to="/stressmanagement-programma" 
                  className="block text-gray-300 hover:text-white transition-colors text-left"
                >
                  Stressmanagement programma
                </Link>
                <Link 
                  to="/prestatie-programma" 
                  className="block text-gray-300 hover:text-white transition-colors text-left"
                >
                  Prestatie en concentratie verbeteren
                </Link>
                <Link 
                  to="/blog" 
                  className="block text-gray-300 hover:text-white transition-colors text-left"
                >
                  Blog
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Innerleaps. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
