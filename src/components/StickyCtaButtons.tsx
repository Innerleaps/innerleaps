
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CalculatorModal from './CalculatorModal';

const StickyCtaButtons = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <Button 
          onClick={() => setIsCalculatorOpen(true)}
          className="bg-brand-green hover:bg-brand-green-light text-white font-semibold py-4 px-8 rounded-lg text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Bereken mijn besparing
        </Button>
        <Button 
          variant="outline"
          className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-semibold py-4 px-8 rounded-lg text-base transition-all duration-300 bg-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}
        >
          Kennis maken
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
