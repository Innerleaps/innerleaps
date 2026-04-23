import { lazy, Suspense, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams, useLocation } from 'react-router-dom';
import SimplifiedNavigation from '@/components/SimplifiedNavigation';
import HeroSection from '@/components/HeroSection';
import MethodologySection from '@/components/MethodologySection';
import ProgramOverviewSection from '@/components/ProgramOverviewSection';
import TrustSection from '@/components/TrustSection';
import StickyCtaButtons from '@/components/StickyCtaButtons';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Activity, BookOpen, Award, Brain } from 'lucide-react';

// Lazy load ROI Calculator and Calculator Modal (below the fold)
const ROICalculator = lazy(() => import('@/components/ROICalculator'));
const CalculatorModal = lazy(() => import('@/components/CalculatorModal'));

const LandingPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // Handle URL parameters and anchors
  useEffect(() => {
    const openCalculatorParam = searchParams.get('openCalculator');
    
    // Check for openCalculator URL parameter
    if (openCalculatorParam === 'true') {
      // Small delay to ensure modal is ready
      setTimeout(() => {
        setIsCalculatorOpen(true);
      }, 100);
    }
    // Check for #masterclass anchor
    else if (location.hash === '#masterclass') {
      // Delay to wait for page to fully mount
      setTimeout(() => {
        const element = document.getElementById('masterclass');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.search, location.hash, searchParams]);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <meta name="description" content="Innerleaps verlaagt ziekteverzuim met 15-21% via wetenschappelijk onderbouwde breintraining. 6 weken, 12 minuten per dag. Gebaseerd op 40 jaar onderzoek." />
      </Helmet>
      <SimplifiedNavigation />
      <StickyCtaButtons />
      <div id="home">
        <HeroSection />
      </div>
      <MethodologySection />
      <ProgramOverviewSection />
      
      {/* Masterclass Sectie */}
      <section id="masterclass" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple text-center leading-tight mb-6">
            Ervaar het zelf, <span className="text-brand-orange">gratis</span> met onze{" "}
            <span className="text-brand-orange">masterclass</span>
          </h2>
          <p className="text-xl md:text-2xl text-brand-gray-medium text-center leading-relaxed mb-12 max-w-4xl mx-auto">
            Ben je enthousiast maar wil je eerst ervaren hoe aandachtstraining werkt? In 60 minuten maak je op speelse
            wijze kennis met onze aanpak.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
            <div className="bg-white p-6 rounded-xl space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <Activity className="h-10 w-10 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark text-center">Stress level</h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                Krijg inzicht in jouw stress level. Volledig wetenschappelijk onderbouwd.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <Brain className="h-10 w-10 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark text-center">Aandachtoefening</h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                Ervaar een techniek om controle over je autopiloot te krijgen en focus terug te pakken. Volledig
                wetenschappelijk onderbouwd.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <BookOpen className="h-10 w-10 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark text-center">Reset tool</h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                Leer een tool om je werkgeheugen te resetten en aandacht direct terug te pakken.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl space-y-4">
              <div className="p-3 rounded-lg bg-brand-orange/10 w-fit mx-auto">
                <Award className="h-10 w-10 text-brand-orange stroke-2" />
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark text-center">Gratis</h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                Wij geloven dat iedereen onze effectieve techniek moet kunnen proberen. Daarom is onze masterclass
                volledig gratis en vrijblijvend.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-brand-orange hover:bg-brand-orange/90 text-white py-4 px-8 rounded-lg text-lg md:text-xl font-semibold shadow-xl" 
              onClick={() => window.open("https://innerleaps.nl/Calendar", "_blank")}
            >
              Kennismaken met Bas
            </Button>
          </div>
        </div>
      </section>
      
      <TrustSection />
      <Suspense fallback={<div className="section-padding"><div className="container-custom text-center">Laden...</div></div>}>
        <ROICalculator />
      </Suspense>
      <Footer />
      
      {/* Calculator Modal */}
      <Suspense fallback={null}>
        <CalculatorModal 
          isOpen={isCalculatorOpen} 
          onClose={() => setIsCalculatorOpen(false)} 
        />
      </Suspense>
    </div>
  );
};

export default LandingPage;
