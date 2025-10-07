import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Award } from 'lucide-react';
import CalculatorModal from './CalculatorModal';
const HeroSection = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  return <>
      <section id="home" className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white section-padding overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8 animate-fade-in">
              <div className="space-y-6">
                {/* 40+ Years Research Badge */}
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-blue-200 px-4 py-2 rounded-full text-base md:text-lg font-medium">
                  <Award className="h-4 w-4 mr-2" />
                  40+ jaar wetenschappelijk onderzoek
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-heading">
                  Prestaties <span className="text-brand-orange">groeien</span> waar collega's <span className="text-brand-orange">bloeien</span>
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl text-blue-100 leading-relaxed">Wetenschappelijk bewezen weerbaarheidstraining: Medewerkers worden productiever, gelukkiger en kunnen beter samenwerken.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange text-brand-orange-light hover:text-brand-orange-light font-semibold py-4 px-6 lg:px-8 rounded-lg text-lg lg:text-xl shadow-xl" onClick={() => setIsCalculatorOpen(true)}>
                  Ontdek je besparing
                </Button>
                <Button variant="secondary-on-blue" size="lg" onClick={() => window.open('https://calendar.google.com/appointments/schedules/AcZssZ3VM8RLgeZm9Ej29kbhx4LugakTLXw_vF9BePhup0zm-DtWT5kk6nbHQw-chzBGEQQInd7l3Fs4', '_blank')} className="w-full sm:w-auto font-semibold py-4 px-6 lg:px-8 rounded-lg text-lg lg:text-xl">
                  Stel je vragen aan Bas
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6 lg:gap-8 pt-6 lg:pt-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-orange">6 weken</div>
                  <div className="text-blue-200 text-sm md:text-base">Training in persoonlijk leiderschap</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-orange">40+ jaar</div>
                  <div className="text-blue-200 text-sm md:text-base">Bewezen resultaten</div>
                </div>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-2xl max-w-md mx-auto">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-xl lg:text-2xl font-semibold mb-2">Waarom organisaties ons kiezen</h3>
                      <p className="text-blue-200 text-sm lg:text-base">Resultaten uit 40+ jaar wetenschappelijk onderzoek</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 lg:p-4 bg-white rounded-lg">
                        <span className="font-bold text-lg lg:text-xl text-brand-blue-dark">Personeelsverloop</span>
                        <span className="text-brand-orange font-bold text-lg lg:text-xl">-26%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 lg:p-4 bg-white rounded-lg">
                        <span className="font-bold text-lg lg:text-xl text-brand-blue-dark">Verzuim</span>
                        <span className="text-brand-orange font-bold text-lg lg:text-xl">-21%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 lg:p-4 bg-white rounded-lg">
                        <span className="font-bold text-lg lg:text-xl text-brand-blue-dark">Productiviteit</span>
                        <span className="text-brand-orange font-bold text-lg lg:text-xl">+15%</span>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12 lg:mt-16">
            <ArrowDown className="h-8 w-8 text-brand-orange animate-bounce" />
          </div>
        </div>
      </section>

      <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
    </>;
};
export default HeroSection;