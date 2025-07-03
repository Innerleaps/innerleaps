
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CalculatorModal from './CalculatorModal';

const StickyCtaButtons = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col gap-2 sm:gap-3 max-w-[calc(100vw-2rem)] sm:max-w-none">
        <Button 
          onClick={() => setIsCalculatorOpen(true)}
          className="bg-brand-green hover:bg-brand-green-light text-white font-semibold py-3 sm:py-5 px-4 sm:px-10 rounded-lg text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap"
        >
          <span className="hidden sm:inline">Bereken mijn besparing</span>
          <span className="sm:hidden">Besparing berekenen</span>
        </Button>
        <Button 
          variant="outline"
          className="border-0 text-brand-blue hover:text-brand-blue font-semibold py-3 sm:py-5 px-4 sm:px-10 rounded-lg text-base sm:text-lg transition-all duration-300 bg-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap"
          onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}
        >
          <span className="hidden sm:inline">Kennis maken</span>
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
