import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Award } from 'lucide-react';
import CalculatorModal from './CalculatorModal';

const HeroSection = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <>
      <section id="home" className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white section-padding overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 md:space-y-8 animate-fade-in">
              <div className="space-y-4 md:space-y-6">
                {/* 40+ Years Research Badge */}
                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-3 md:px-4 py-2 rounded-full text-sm md:text-base font-semibold">
                  <Award className="h-4 w-4 mr-2" />
                  Gebaseerd op 40+ jaar wetenschappelijk onderzoek
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="text-brand-green-light">30% minder</span> ziekteverzuim<br />
                  <span className="text-brand-green-light">31% hogere</span> medewerkerretentie
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-blue-100 leading-relaxed">
                  Wetenschappelijk bewezen stressreductieprogramma dat meetbare bedrijfsresultaten oplevert in 8 weken
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-brand-green text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg text-base md:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl" 
                  onClick={() => setIsCalculatorOpen(true)}
                >
                  Bereken mijn besparing
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')} 
                  className="border-2 border-white text-white bg-transparent font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg text-base md:text-lg transition-all duration-300"
                >
                  Kennis maken
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-8 pt-6 md:pt-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-green-light">8 weken</div>
                  <div className="text-blue-200 text-sm md:text-base">Programma duur</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-green-light">40+ jaar </div>
                  <div className="text-blue-200 text-sm md:text-base">Wetenschappelijk onderzoek</div>
                </div>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-2xl max-w-md mx-auto">
                <div className="space-y-4 md:space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">Direct meetbare resultaten:</h3>
                    <p className="text-blue-200 text-sm md:text-base">Gevalideerd door 40+ jaar MBSR onderzoek</p>
                  </div>
                  
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                      <span className="font-medium text-sm md:text-base">Ziekteverzuim reductie</span>
                      <span className="text-white font-bold text-base md:text-lg">-30%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                      <span className="font-medium text-sm md:text-base">Medewerkerretentie</span>
                      <span className="text-white font-bold text-base md:text-lg">+31%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                      <span className="font-medium text-sm md:text-base">Werkstress reductie</span>
                      <span className="text-white font-bold text-base md:text-lg">-40%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                      <span className="font-medium text-sm md:text-base">Werktevredenheid</span>
                      <span className="text-white font-bold text-base md:text-lg">+26%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12 md:mt-16">
            <ArrowDown className="h-6 w-6 md:h-8 md:w-8 text-brand-green-light animate-bounce" />
          </div>
        </div>
      </section>

      <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
    </>
  );
};

export default HeroSection;
