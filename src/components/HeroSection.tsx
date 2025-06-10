
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import CalculatorModal from './CalculatorModal';

const HeroSection = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <>
      <section id="home" className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white section-padding overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-brand-green-light">30% minder</span> ziekteverzuim<br />
                  <span className="text-brand-green-light">31% hogere</span> medewerkerretentie
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                  Wetenschappelijk bewezen stressreductieprogramma dat meetbare bedrijfsresultaten oplevert binnen 8 weken
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-brand-green hover:bg-brand-green-light text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                  onClick={() => setIsCalculatorOpen(true)}
                >
                  Bereken mijn besparing
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')} 
                  className="border-2 border-white hover:bg-white hover:text-brand-green font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300"
                >
                  Vrijblijvend gesprek plannen
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-brand-green-light">8 weken</div>
                  <div className="text-blue-200">Programma duur</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-brand-green-light">100%</div>
                  <div className="text-blue-200">Wetenschappelijk onderbouwd</div>
                </div>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold mb-6">Direct meetbare resultaten:</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                      <span className="font-medium">Ziekteverzuim reductie</span>
                      <span className="text-white font-bold text-lg ml-2">30%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                      <span className="font-medium">Medewerkerretentie</span>
                      <span className="text-white font-bold text-lg ml-2">+31%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                      <span className="font-medium">Werkstress reductie</span>
                      <span className="text-white font-bold text-lg ml-2">40-58%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                      <span className="font-medium">Werktevredenheid</span>
                      <span className="text-white font-bold text-lg ml-2">+26%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-16">
            <ArrowDown className="h-8 w-8 text-brand-green-light animate-bounce" />
          </div>
        </div>
      </section>

      <CalculatorModal 
        isOpen={isCalculatorOpen} 
        onClose={() => setIsCalculatorOpen(false)} 
      />
    </>
  );
};

export default HeroSection;
