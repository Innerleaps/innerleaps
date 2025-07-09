import { Button } from '@/components/ui/button';
import { Shield, Heart, Moon, Users, Target, BarChart3, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';

const ImpactSection = () => {
  const impacts = [
    {
      icon: Heart,
      title: "32% minder angst en zorgen",
      description: "Medewerkers voelen zich rustiger en zekerder",
      color: "text-purple-600"
    },
    {
      icon: Moon,
      title: "20% betere nachtrust",
      description: "Diepere slaap voor meer energie overdag",
      color: "text-indigo-600"
    },
    {
      icon: Shield,
      title: "15% sterker immuunsysteem",
      description: "Minder vaak ziek, meer tijd voor wat telt",
      color: "text-emerald-600"
    },
    {
      icon: Smile,
      title: "26% meer werkplezier",
      description: "Medewerkers gaan weer met plezier naar werk",
      color: "text-brand-green"
    },
    {
      icon: Target,
      title: "22% meer betrokkenheid",
      description: "Gemotiveerde teams die samen groeien",
      color: "text-orange-600"
    },
    {
      icon: BarChart3,
      title: "35% meer veerkracht",
      description: "Uitdagingen worden kansen voor groei",
      color: "text-brand-blue"
    },
    {
      icon: Users,
      title: "27% betere werk-privé balans",
      description: "Meer tijd en energie voor het leven buiten werk",
      color: "text-teal-600"
    },
    {
      icon: Shield,
      title: "40-58% minder werkstress",
      description: "Van overweldiging naar overzicht en rust",
      color: "text-brand-blue"
    }
  ];

  return (
    <section className="bg-brand-gray-light section-padding">
      <div className="container-custom">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
            Hoe 30% minder ziekteverzuim en 31% hogere medewerkers retentie bereikt wordt
          </h2>
          <p className="text-lg md:text-xl text-brand-gray-medium max-w-3xl mx-auto leading-relaxed">
            Ons 8 weekse programma heeft de volgende uitkomsten:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {impacts.map((impact, index) => {
            const IconComponent = impact.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col space-y-4">
                  <div className={`p-3 rounded-lg bg-gray-50 ${impact.color} self-start`}>
                    <IconComponent className="h-6 w-6" />
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
          <p className="text-lg text-brand-gray-medium max-w-2xl mx-auto mb-6">
            Deze cijfers zijn mooi, maar het echte verschil zit in de verhalen van mensen die weer plezier hebben in hun werk en leven.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/wetenschap">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-semibold py-3 px-8 rounded-lg text-base md:text-lg transition-all duration-300"
              >
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
