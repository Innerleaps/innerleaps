
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import CalculatorModal from './CalculatorModal';
import { useLocation } from 'react-router-dom';

const StickyCtaButtons = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (!isHomePage) {
      setIsVisible(true);
      return;
    }

    const heroSection = document.getElementById('home');
    if (!heroSection) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky buttons when hero section is not in view
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '-100px 0px 0px 0px'
      }
    );

    observer.observe(heroSection);

    return () => {
      observer.disconnect();
    };
  }, [isHomePage]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col gap-2 sm:gap-3 max-w-[calc(100vw-2rem)] sm:max-w-none">
        <Button 
          onClick={() => setIsCalculatorOpen(true)}
          className="bg-brand-orange hover:bg-brand-orange text-brand-orange-light hover:text-brand-orange-light font-semibold py-3 sm:py-5 px-4 sm:px-10 rounded-lg text-base sm:text-lg shadow-lg whitespace-nowrap"
        >
          <span className="hidden sm:inline">Bereken mijn besparing</span>
          <span className="sm:hidden">Besparing berekenen</span>
        </Button>
        <Button 
          variant="secondary"
          className="font-semibold py-3 sm:py-5 px-4 sm:px-10 rounded-lg text-base sm:text-lg shadow-lg whitespace-nowrap"
          onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}
        >
          <span className="hidden sm:inline">Gesprek met Bas plannen</span>
          <span className="sm:hidden">Contact</span>
        </Button>
      </div>

      <CalculatorModal 
        isOpen={isCalculatorOpen} 
        onClose={() => setIsCalculatorOpen(false)} 
      />
    </>
  );
};

export default StickyCtaButtons;
