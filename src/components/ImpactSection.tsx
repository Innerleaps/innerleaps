
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Heart, Clock } from 'lucide-react';
import CalculatorModal from './CalculatorModal';

const ImpactSection = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const stats = [
    {
      icon: TrendingUp,
      title: "30% minder ziekteverzuim",
      description: "Significante reductie van stress-gerelateerd ziekteverzuim door evidence-based mindfulness interventies",
      source: "Meta-analyse van 13 RCT studies (N=1,295)"
    },
    {
      icon: Users,
      title: "31% hogere medewerkerretentie",
      description: "Verhoogde werknemerstevredenheid en loyaliteit door verbeterd welzijn en werkbalans",
      source: "Longitudinale studie over 24 maanden"
    },
    {
      icon: Heart,
      title: "40% minder werkstress",
      description: "Aanzienlijke vermindering van ervaren werkdruk en burn-out symptomen",
      source: "Gevalideerd met PSS-10 en DASS-21 meetinstrumenten"
    },
    {
      icon: Clock,
      title: "26% meer werktevredenheid",
      description: "Verbeterde focus, productiviteit en positieve werkhouding door mindfulness training",
      source: "Job Satisfaction Survey resultaten"
    }
  ];

  return (
    <>
      <section id="wetenschap" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark mb-4 md:mb-6">
              Wetenschappelijk bewezen resultaten
            </h2>
            <p className="text-lg md:text-xl text-brand-gray-medium max-w-3xl mx-auto leading-relaxed">
              Meer dan 40 jaar onderzoek naar Mindfulness-Based Stress Reduction (MBSR) toont consistente, 
              meetbare verbetering van welzijn en bedrijfsprestaties
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-brand-gray-light p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-blue text-white p-3 rounded-lg flex-shrink-0">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-brand-gray-dark mb-3">
                      {stat.title}
                    </h3>
                    <p className="text-brand-gray-medium mb-4 leading-relaxed">
                      {stat.description}
                    </p>
                    <p className="text-sm text-brand-gray-medium font-medium italic">
                      Bron: {stat.source}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-brand-gray-dark mb-6">
              Bereken de impact voor jouw organisatie
            </h3>
            <p className="text-lg text-brand-gray-medium mb-8 max-w-2xl mx-auto">
              Ontdek hoeveel jouw bedrijf kan besparen door te investeren in het welzijn van je medewerkers
            </p>
            <Button 
              size="lg" 
              onClick={() => setIsCalculatorOpen(true)}
              className="bg-brand-blue text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg transform hover:-translate-y-1 hover:shadow-xl hover:bg-brand-blue"
            >
              Onze besparing berekenen
            </Button>
          </div>
        </div>
      </section>

      <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
    </>
  );
};

export default ImpactSection;
