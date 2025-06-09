
import { Button } from '@/components/ui/button';
import { TrendingDown, TrendingUp, Shield, Heart, Moon, Users, Target, BarChart3 } from 'lucide-react';

const ImpactSection = () => {
  const impacts = [
    {
      icon: TrendingDown,
      title: "19-30% minder ziekteverzuim",
      description: "Significant minder verzuimdagen door betere stresshantering",
      color: "text-red-600"
    },
    {
      icon: TrendingUp,
      title: "17-31% verbetering in medewerkerretentie",
      description: "Hogere loyaliteit en minder personeelsverloop",
      color: "text-brand-green"
    },
    {
      icon: Shield,
      title: "40-58% minder werkstress",
      description: "Effectieve stressreductie op de werkplek",
      color: "text-brand-blue"
    },
    {
      icon: Heart,
      title: "32% minder angst- en depressiesymptomen",
      description: "Verbeterde mentale gezondheid van medewerkers",
      color: "text-purple-600"
    },
    {
      icon: Moon,
      title: "20% betere slaap",
      description: "Verbeterde slaapkwaliteit voor betere werkprestaties",
      color: "text-indigo-600"
    },
    {
      icon: Shield,
      title: "15% beter immuunsysteem",
      description: "Sterkere weerstand tegen ziekte",
      color: "text-emerald-600"
    },
    {
      icon: Users,
      title: "26% hogere werktevredenheid",
      description: "Meer gemotiveerde en tevreden medewerkers",
      color: "text-brand-green"
    },
    {
      icon: Target,
      title: "22% meer werkbetrokkenheid",
      description: "Hogere productiviteit en betrokkenheid",
      color: "text-orange-600"
    },
    {
      icon: BarChart3,
      title: "35% meer werkgerelateerde veerkracht",
      description: "Betere omgang met werkdruk en uitdagingen",
      color: "text-brand-blue"
    },
    {
      icon: TrendingUp,
      title: "27% verbeterde werk-privébalans",
      description: "Betere balans tussen werk en privéleven",
      color: "text-teal-600"
    }
  ];

  return (
    <section className="bg-brand-gray-light section-padding">
      <div className="container-custom">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
            De impact op uw organisatie
          </h2>
          <p className="text-xl text-brand-gray-medium max-w-3xl mx-auto leading-relaxed">
            Ons wetenschappelijk bewezen stressreductieprogramma levert concrete, meetbare resultaten op voor uw bedrijf
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {impacts.map((impact, index) => {
            const IconComponent = impact.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-gray-50 ${impact.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-brand-gray-dark mb-2">
                      {impact.title}
                    </h3>
                    <p className="text-brand-gray-medium text-sm leading-relaxed">
                      {impact.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="btn-secondary text-lg px-8 py-3"
          >
            Lees meer over de wetenschap
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
