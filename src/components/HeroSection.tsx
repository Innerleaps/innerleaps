
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
            <div className="space-y-6 lg:space-y-8 animate-fade-in">
              <div className="space-y-6">
                {/* 40+ Years Research Badge */}
                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-base md:text-lg font-semibold">
                  <Award className="h-4 w-4 mr-2" />
                  Gebaseerd op 40+ jaar wetenschappelijk onderzoek
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Zo blijven <span className="text-brand-green-light">jouw mensen</span> fit, betrokken en aan boord.
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl text-blue-100 leading-relaxed">Wetenschappelijk bewezen stressmanagement cursus dat in 8 weken zorgt voor lager verzuim en medewerkers die blijven</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto bg-brand-green hover:bg-brand-green-light text-white font-semibold py-4 px-6 lg:px-8 rounded-lg text-lg lg:text-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1" onClick={() => setIsCalculatorOpen(true)}>
                  Ontdek je besparing
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')} className="w-full sm:w-auto border-2 border-white text-brand-blue hover:text-brand-blue font-semibold py-4 px-6 lg:px-8 rounded-lg text-lg lg:text-xl transition-all duration-300 transform hover:-translate-y-1">
                  Laten we kennismaken
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6 lg:gap-8 pt-6 lg:pt-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-green-light">8 weken</div>
                  <div className="text-blue-200 text-sm md:text-base">Van stress naar balans</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-green-light">40+ jaar</div>
                  <div className="text-blue-200 text-sm md:text-base">Bewezen resultaten</div>
                </div>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-2xl max-w-md mx-auto">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl lg:text-2xl font-semibold mb-2">Wat onze deelnemers ervaren</h3>
                    <p className="text-blue-200 text-sm lg:text-base">Resultaten uit 40+ jaar onderzoek</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 lg:p-4 bg-white/30 rounded-lg">
                      <span className="font-medium text-sm lg:text-base">Verzuimreductie</span>
                      <span className="text-brand-green font-bold text-lg lg:text-xl bg-white px-2 py-1 rounded">10-20%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 lg:p-4 bg-white/30 rounded-lg">
                      <span className="font-medium text-sm lg:text-base">Retentieverbetering</span>
                      <span className="text-brand-green font-bold text-lg lg:text-xl bg-white px-2 py-1 rounded">10-20%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 lg:p-4 bg-white/30 rounded-lg">
                      <span className="font-medium text-sm lg:text-base">ROI per euro</span>
                      <span className="text-brand-green font-bold text-lg lg:text-xl bg-white px-2 py-1 rounded">€2,07</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12 lg:mt-16">
            <ArrowDown className="h-8 w-8 text-brand-green-light animate-bounce" />
          </div>
        </div>
      </section>

      <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
    </>
  );
};

export default HeroSection;
