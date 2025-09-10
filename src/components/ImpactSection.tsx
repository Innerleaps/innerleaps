import { Button } from '@/components/ui/button';
import { Shield, Heart, Moon, Users, Target, BarChart3, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';
const ImpactSection = () => {
  const impacts = [
  {
    icon: Target,
    title: "64-77% meer veerkracht en weerbaarheid",
    description: "Beter omgaan met uitdagingen",
    color: "text-brand-orange",
    tag: "Persoonlijke Hulpbronnen"
  },
  {
    icon: Shield,
    title: "60-84% minder burn-out klachten",
    description: "Minder emotionele uitputting",
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
  {
    icon: BarChart3,
    title: "63-68% betere algemene gezondheid",
    description: "Verbeterde fysieke en mentale gezondheid",
    color: "text-brand-orange",
    tag: "Persoonlijke Impact"
  }];
  return <section className="bg-brand-gray-light section-padding">
      <div className="container-custom">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-dark">Ons Life+ programma gaat verder dan burnout preventie</h2>
          <p className="text-xl md:text-2xl text-brand-gray-medium max-w-3xl mx-auto leading-relaxed text-center">Ons 9-weekse Life+ programma helpt teams niet alleen stress te verminderen, maar ook rust, veerkracht en gezonde gewoontes op te bouwen. Onderzoek laat het zien: minder stress, meer motivatie en een gezonder, tevredener leven — met blijvend effect.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {impacts.map((impact, index) => {
          const IconComponent = impact.icon;
          return <div key={index} className="bg-white rounded-xl p-6 shadow-lg animate-fade-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-lg bg-hero-gradient self-start">
                      <IconComponent className="h-6 w-6 text-brand-orange stroke-2" />
                    </div>
                    <span className="text-xs bg-brand-orange/5 text-brand-orange/70 px-2 py-1 rounded-full font-normal">
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
              </div>;
        })}
        </div>

        <div className="text-center mt-12 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/wetenschap">
              <Button variant="secondary" className="w-full sm:w-auto font-semibold py-3 px-8 rounded-lg text-base md:text-lg">
                Ontdek alle uitkomsten
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>;
};
export default ImpactSection;