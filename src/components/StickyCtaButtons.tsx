
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import CalculatorModal from './CalculatorModal';
import { useLocation } from 'react-router-dom';

const StickyCtaButtons = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isLandingPage = location.pathname === '/landing';

  useEffect(() => {
    if (!isHomePage) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      // Show sticky buttons as soon as user starts scrolling
      setIsVisible(window.scrollY > 50);
    };

    handleScroll(); // Check initial scroll position
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  // Don't show sticky buttons if not visible or on landing page
  if (!isVisible || isLandingPage) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col gap-2 sm:gap-3 max-w-[calc(100vw-2rem)] sm:max-w-none">
        <Button 
          onClick={() => setIsCalculatorOpen(true)}
          className="font-semibold py-3 sm:py-5 px-4 sm:px-10 rounded-lg text-base sm:text-lg shadow-lg whitespace-nowrap"
        >
          <span className="hidden sm:inline">Ontdek jullie impact</span>
          <span className="sm:hidden">Ontdek impact</span>
        </Button>
        <Button 
          variant="secondary"
          className="font-semibold py-3 sm:py-5 px-4 sm:px-10 rounded-lg text-base sm:text-lg shadow-lg whitespace-nowrap"
          onClick={() => {
            const link = document.createElement('a');
            link.href = 'https://calendar.app.google/BgGy8cVUSk4w5Zzg8';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
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
