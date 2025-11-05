import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, Activity, Brain, RotateCcw, Gift, Mail, Phone } from "lucide-react";
import MasterclassFormModal from "@/components/MasterclassFormModal";
import masterclassBackground from "@/assets/Gratis_masterclass_stressmanagement_cursus.png";

// Declare gtag type for Google Analytics
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, any>) => void;
  }
}

// Trust logos
import vgzLogo from "@/assets/Vitaliteitprogramma_herkent_door_vgz.png";
import czLogo from "@/assets/Vitaliteitsprogramma_herkend_door_CZ.png";
import menzisLogo from "@/assets/Vitaliteitsprogramma_herkend_door_menzis.png";

const MasterclassQR = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Track page view
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'page_view', {
        page_title: 'Masterclass QR Landing',
        page_location: window.location.href,
        page_path: '/masterclass-stress-qr'
      });
    }
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
    
    // Track modal open
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'click', {
        event_category: 'Masterclass',
        event_label: 'Modal Opened',
        source: 'QR Landing'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mini Hero Section */}
      <section className="relative py-12 sm:py-16 px-4 bg-gradient-to-b from-brand-purple to-brand-purple/90 text-white overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Minder <span className="text-brand-orange">stress</span>, meer <span className="text-brand-orange">levensplezier</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
            Ervaar in 60 minuten hoe je met wetenschappelijk bewezen technieken rust in je hoofd krijgt
          </p>
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-semibold">4,7 / 5 Google Reviews</span>
          </div>
        </div>
      </section>

      {/* Masterclass Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-brand-off-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-purple text-center leading-tight mb-4 sm:mb-6">
            Wat krijg je in de <span className="text-brand-orange">gratis masterclass </span>?
          </h2>
          <p className="text-lg sm:text-xl text-brand-gray-medium text-center leading-relaxed mb-8 sm:mb-12 max-w-3xl mx-auto">
            In 60 minuten maak je op speelse wijze kennis met onze aanpak
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto mb-8 sm:mb-12">
            <div className="bg-white p-6 rounded-xl space-y-4 shadow-sm">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <Activity className="h-10 w-10 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark text-center">Stress level</h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                Krijg inzicht in jouw stress level. Volledig wetenschappelijk onderbouwd.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl space-y-4 shadow-sm">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <Brain className="h-10 w-10 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark text-center">Aandachtoefening</h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                Ervaar een techniek om controle over je autopiloot te krijgen en focus terug te pakken.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl space-y-4 shadow-sm">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <RotateCcw className="h-10 w-10 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark text-center">Reset tool</h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                Leer een tool om je werkgeheugen te resetten en aandacht direct terug te pakken.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl space-y-4 shadow-sm">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <Gift className="h-10 w-10 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark text-center">Gratis</h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                De masterclass is volledig gratis en vrijblijvend. Geen verplichtingen.
              </p>
            </div>
          </div>

          {/* CTA Section with Background */}
          <div 
            className="relative p-6 sm:p-8 rounded-xl max-w-7xl mx-auto overflow-hidden"
            style={{
              backgroundImage: `url(${masterclassBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
            
            <div className="relative z-10 flex flex-col items-center justify-center gap-6 max-w-2xl mx-auto">
              {/* Review Quote */}
              <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg w-full">
                <div className="flex items-center gap-2 mb-2 justify-center">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-semibold text-brand-gray-dark">4,7 / 5</span>
                </div>
                <p className="text-sm sm:text-base text-brand-gray-dark italic leading-relaxed text-center">
                  "Deze workshop laat je duidelijk het belang zien van het trainen van je aandachtsspier. De workshop
                  bestaat uit een mooie mix tussen oefeningen en theorie, waardoor je gelijk al wat ervaring opdoet."
                </p>
              </div>
              
              {/* CTA Button */}
              <Button
                onClick={handleModalOpen}
                size="lg"
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white py-4 px-8 rounded-lg text-lg font-semibold shadow-xl"
              >
                Aanmelden gratis masterclass
              </Button>
            </div>
          </div>
          
          {/* Modal */}
          <MasterclassFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      </section>

      {/* Mini Trust Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-purple text-center mb-6 sm:mb-8">
              Erkend door het <span className="text-brand-orange">Nederlandse zorgsysteem</span>
            </h3>
            <p className="text-base sm:text-lg text-brand-gray-medium text-center mb-6 sm:mb-8 max-w-2xl mx-auto">
              Onze wetenschappelijk bewezen methode wordt erkend door de belangrijkste Nederlandse zorgverzekeraars
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
              <img src={vgzLogo} alt="Erkend door VGZ" className="h-16 sm:h-20 object-contain" />
              <img src={czLogo} alt="Erkend door CZ" className="h-16 sm:h-20 object-contain" />
              <img src={menzisLogo} alt="Erkend door Menzis" className="h-14 sm:h-16 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Subtle Footer */}
      <footer className="py-8 bg-brand-off-white border-t border-brand-gray-light/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <p className="text-base sm:text-lg text-brand-gray-dark font-semibold">
              Vragen? Neem contact op
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-brand-gray-medium">
              <a 
                href="mailto:info@innerleaps.nl" 
                className="flex items-center gap-2 hover:text-brand-orange transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>info@innerleaps.nl</span>
              </a>
              <a 
                href="tel:+31621967068" 
                className="flex items-center gap-2 hover:text-brand-orange transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>06 21 96 70 68</span>
              </a>
            </div>
            <p className="text-sm text-brand-gray-medium pt-4">
              © {new Date().getFullYear()} Innerleaps. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MasterclassQR;
