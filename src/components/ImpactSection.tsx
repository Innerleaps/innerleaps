import { Button } from '@/components/ui/button';
import { Shield, Heart, Moon, Users, Target, BarChart3, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';

const ImpactSection = () => {
  const impacts = [
    // Werkeisen/Stressoren
    {
      icon: Shield,
      title: "65-72% minder werkstress",
      description: "Minder werkstress en spanning",
      color: "text-brand-orange",
      tag: "Werkeisen/Stressoren"
    },
    // Oefenen: Praktijk dag
    {
      icon: Target,
      title: "64-77% meer veerkracht",
      description: "Beter omgaan met uitdagingen",
      color: "text-brand-orange",
      tag: "Persoonlijke Hulpbronnen"
    },
    {
      icon: Heart,
      title: "71-79% meer self-efficacy",
      description: "Meer vertrouwen in eigen kunnen",
      color: "text-brand-orange",
      tag: "Persoonlijke Hulpbronnen"
    },
    {
      icon: Smile,
      title: "70% betere emotieregulatie",
      description: "Beter beheersen van emoties",
      color: "text-brand-orange",
      tag: "Persoonlijke Hulpbronnen"
    },
    // Werkhulpbronnen
    {
      icon: Users,
      title: "64-67% beter werkklimaat",
      description: "Positievere werkomgeving",
      color: "text-brand-orange",
      tag: "Werkhulpbronnen"
    },
    {
      icon: Heart,
      title: "67% meer compassie voor anderen",
      description: "Empathie en begrip voor collega's",
      color: "text-brand-orange",
      tag: "Werkhulpbronnen"
    },
    // Stressreacties/Welbevinden
    {
      icon: Shield,
      title: "60-84% minder burn-out klachten",
      description: "Minder emotionele uitputting",
      color: "text-brand-orange",
      tag: "Stressreacties/Welbevinden"
    },
    {
      icon: Smile,
      title: "63% meer werktevredenheid",
      description: "Meer plezier in het werk",
      color: "text-brand-orange",
      tag: "Stressreacties/Welbevinden"
    },
    {
      icon: Target,
      title: "65% meer werkbetrokkenheid",
      description: "Gemotiveerde teams die samen groeien",
      color: "text-brand-orange",
      tag: "Stressreacties/Welbevinden"
    },
    // Persoonlijke Impact
    {
      icon: Moon,
      title: "57-78% beter slapen en herstellen",
      description: "Rustiger slapen en beter herstel",
      color: "text-brand-orange",
      tag: "Persoonlijke Impact"
    },
    {
      icon: Heart,
      title: "59-68% meer welzijn en tevredenheid",
      description: "Levenskwaliteit en tevredenheid",
      color: "text-brand-orange",
      tag: "Persoonlijke Impact"
    },
    {
      icon: BarChart3,
      title: "63-68% betere algemene gezondheid",
      description: "Verbeterde fysieke en mentale gezondheid",
      color: "text-brand-orange",
      tag: "Persoonlijke Impact"
    }
  ];

  return (
    <section className="bg-brand-gray-light section-padding">
      <div className="container-custom">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
            Veel meer dan een bewezen burnout preventie programma
          </h2>
          <p className="text-lg md:text-xl text-brand-gray-medium max-w-3xl mx-auto leading-relaxed">
            Onze 9-weekse, wetenschappelijk bewezen cursus in stressmanagement laat in werkplekcontexten de volgende meetbare resultaten zien volgens het JD-R model waarbij zowel de stressreactie wordt verlicht als het welbevinden wordt verbeterd:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {impacts.map((impact, index) => {
            const IconComponent = impact.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg animate-fade-in" style={{
                animationDelay: `${index * 0.1}s`
              }}>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-gray-50 ${impact.color} self-start`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="text-xs bg-brand-orange/10 text-brand-orange px-2 py-1 rounded-full font-medium">
                      {impact.tag}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-brand-gray-dark mb-3 leading-tight">
                      {impact.title}
                    </h3>
                    <p className="text-brand-gray-medium text-base leading-relaxed">
                      {impact.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/wetenschap">
              <Button variant="outline" className="w-full sm:w-auto border-2 border-brand-blue text-brand-blue hover:text-brand-blue hover:border-brand-blue hover:bg-transparent font-semibold py-3 px-8 rounded-lg text-base md:text-lg transition-all duration-300 transform hover:-translate-y-0.5">
                Ontdek de wetenschap erachter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;