import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrendingUp, ArrowLeft, Users, Calculator, BookOpen, Star } from 'lucide-react';
import { useEffect } from 'react';
import { CalculationResults } from '@/utils/calculationEngine';

interface FormData {
  name: string;
  phone: string;
  company: string;
  employees: string;
  avgEmployeeCosts: string;
  currentAbsenteeism: string;
  currentTurnover: string;
}

const Berekening = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    results,
    formData
  }: { results: CalculationResults; formData: FormData } = location.state || {};

  useEffect(() => {
    if (!results || !formData) {
      navigate('/');
    }
  }, [results, formData, navigate]);

  if (!results || !formData) {
    return null;
  }

  const openCalendar = () => {
    const link = document.createElement('a');
    link.href = 'https://calendar.app.google/BgGy8cVUSk4w5Zzg8';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue-light to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-green text-white rounded-full mb-6">
              <TrendingUp className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-bold text-brand-gray-dark mb-4">
              De besparing van {formData.company}
            </h1>
            <p className="text-lg text-brand-gray-medium">
              Gebaseerd op {formData.employees} deelnemers, {results.numberOfGroups} groep{results.numberOfGroups !== 1 ? 'en' : ''} van 15 personen
            </p>
          </div>

          {/* Scenarios Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Scenario 1 */}
            <Card className="p-6 bg-white border-2 border-gray-200">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-brand-gray-dark mb-2">
                  {results.scenarios.scenario1.name}
                </h3>
                <p className="text-sm text-brand-gray-medium">
                  {results.scenarios.scenario1.description}
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-brand-gray-medium mb-1">Verzuimbesparing (15%)</p>
                  <p className="text-lg font-bold text-brand-green">
                    €{results.scenarios.scenario1.verzuimBesparing.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-brand-gray-medium">Totale besparing</span>
                  <span className="text-lg font-bold text-brand-blue">
                    €{results.scenarios.scenario1.totaleBesparing.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-brand-gray-medium">Investering</span>
                  <span className="text-lg font-semibold text-brand-orange">
                    €{results.investment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3 pt-3 border-t border-gray-200">
                  <span className="text-sm font-semibold text-brand-gray-dark">Netto besparing</span>
                  <span className="text-xl font-bold text-brand-green">
                    €{results.scenarios.scenario1.netBesparing.toLocaleString()}
                  </span>
                </div>
                <div className="bg-brand-blue text-white p-3 rounded-lg text-center">
                  <p className="text-sm mb-1">ROI</p>
                  <p className="text-2xl font-bold">{results.scenarios.scenario1.roi}%</p>
                  <p className="text-xs mt-1">Voor elke €1 krijg je €{(results.scenarios.scenario1.roi / 100).toFixed(2)} terug</p>
                </div>
              </div>
            </Card>

            {/* Scenario 2 - Aanbevolen */}
            <Card className="p-6 bg-gradient-to-br from-brand-green to-brand-green-light text-white border-4 border-brand-orange relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-orange text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <Star className="h-4 w-4" />
                Aanbevolen
              </div>
              
              <div className="text-center mb-4 mt-2">
                <h3 className="text-xl font-bold mb-2">
                  {results.scenarios.scenario2.name}
                </h3>
                <p className="text-sm text-white/90">
                  {results.scenarios.scenario2.description}
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="p-3 bg-white/20 rounded-lg">
                  <p className="text-xs text-white/80 mb-1">Verzuimbesparing (15%)</p>
                  <p className="text-lg font-bold">
                    €{results.scenarios.scenario2.verzuimBesparing.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <p className="text-xs text-white/80 mb-1">Retentiebesparing (5%)</p>
                  <p className="text-lg font-bold">
                    €{results.scenarios.scenario2.retentieBesparing.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <p className="text-xs text-white/80 mb-1">Productiviteitsbesparing (5%)</p>
                  <p className="text-lg font-bold">
                    €{results.scenarios.scenario2.productiviteitBesparing.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Totale besparing</span>
                  <span className="text-lg font-bold">
                    €{results.scenarios.scenario2.totaleBesparing.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Investering</span>
                  <span className="text-lg font-semibold">
                    €{results.investment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3 pt-3 border-t border-white/30">
                  <span className="text-sm font-semibold">Netto besparing</span>
                  <span className="text-xl font-bold">
                    €{results.scenarios.scenario2.netBesparing.toLocaleString()}
                  </span>
                </div>
                <div className="bg-white/30 backdrop-blur-sm p-3 rounded-lg text-center">
                  <p className="text-sm mb-1">ROI</p>
                  <p className="text-3xl font-bold">{results.scenarios.scenario2.roi}%</p>
                  <p className="text-xs mt-1">Voor elke €1 krijg je €{(results.scenarios.scenario2.roi / 100).toFixed(2)} terug</p>
                </div>
              </div>
            </Card>

            {/* Scenario 3 */}
            <Card className="p-6 bg-white border-2 border-gray-200">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-brand-gray-dark mb-2">
                  {results.scenarios.scenario3.name}
                </h3>
                <p className="text-sm text-brand-gray-medium">
                  {results.scenarios.scenario3.description}
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-brand-gray-medium mb-1">Verzuimbesparing (21%)</p>
                  <p className="text-lg font-bold text-brand-green">
                    €{results.scenarios.scenario3.verzuimBesparing.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-brand-gray-medium mb-1">Retentiebesparing (8%)</p>
                  <p className="text-lg font-bold text-brand-green">
                    €{results.scenarios.scenario3.retentieBesparing.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-brand-gray-medium mb-1">Productiviteitsbesparing (8%)</p>
                  <p className="text-lg font-bold text-brand-green">
                    €{results.scenarios.scenario3.productiviteitBesparing.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-brand-gray-medium">Totale besparing</span>
                  <span className="text-lg font-bold text-brand-blue">
                    €{results.scenarios.scenario3.totaleBesparing.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-brand-gray-medium">Investering</span>
                  <span className="text-lg font-semibold text-brand-orange">
                    €{results.investment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3 pt-3 border-t border-gray-200">
                  <span className="text-sm font-semibold text-brand-gray-dark">Netto besparing</span>
                  <span className="text-xl font-bold text-brand-green">
                    €{results.scenarios.scenario3.netBesparing.toLocaleString()}
                  </span>
                </div>
                <div className="bg-brand-blue text-white p-3 rounded-lg text-center">
                  <p className="text-sm mb-1">ROI</p>
                  <p className="text-2xl font-bold">{results.scenarios.scenario3.roi}%</p>
                  <p className="text-xs mt-1">Voor elke €1 krijg je €{(results.scenarios.scenario3.roi / 100).toFixed(2)} terug</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Scientific Foundation */}
          <Card className="p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-6 w-6 text-brand-blue" />
              <h3 className="text-xl font-bold text-brand-gray-dark">Wetenschappelijke Onderbouwing</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="p-4 border border-brand-blue-light rounded-lg">
                  <h4 className="font-semibold text-brand-gray-dark mb-2">Verzuimkosten Multiplier</h4>
                  <p className="text-lg font-bold text-brand-blue mb-1">{results.constants.VK}x</p>
                  <p className="text-sm text-brand-gray-medium">
                    <strong>Bron:</strong> Sazas (2024) - Echte verzuimkosten zijn {results.constants.VK}x het basissalaris door vervanging, verlies van productiviteit en administratiekosten.
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 border border-brand-blue-light rounded-lg">
                  <h4 className="font-semibold text-brand-gray-dark mb-2">Verzuimreductie door MBSR</h4>
                  <p className="text-lg font-bold text-brand-blue mb-1">15-21%</p>
                  <p className="text-sm text-brand-gray-medium">
                    <strong>Bron:</strong> Virgili (2015), meta-analyse van 19 studies - MBSR vermindert werkgerelateerde stress en verzuim met 15-21%.
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 border border-brand-blue-light rounded-lg">
                  <h4 className="font-semibold text-brand-gray-dark mb-2">Vervangingskosten Factor</h4>
                  <p className="text-lg font-bold text-brand-blue mb-1">{results.constants.VKP}x</p>
                  <p className="text-sm text-brand-gray-medium">
                    <strong>Bron:</strong> O'Connell & Kung (2007) - Vervangingskosten zijn {results.constants.VKP}x het jaarsalaris door werving, training en productieverlies.
                  </p>
                </div>
              </div>

              <div className="md:col-span-3 p-4 border border-brand-blue-light rounded-lg">
                <h4 className="font-semibold text-brand-gray-dark mb-2">Retentieverbetering & Productiviteit</h4>
                <p className="text-sm text-brand-gray-medium">
                  <strong>Bronnen:</strong> Khoury et al. (2015) meta-analyse toont 5-8% verbetering in werknemerstevredenheid en retentie. 
                  Good et al. (2016) toont 5-8% productiviteitsverbetering door verbeterde focus en verminderde stress.
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-brand-blue text-white rounded-lg">
              <p className="text-sm text-white">
                <strong>Methodologie:</strong> Deze berekening is gebaseerd op 40+ jaar wetenschappelijk onderzoek naar MBSR (Mindfulness-Based Stress Reduction) 
                en erkende HR-kostenmethodieken. Alle percentages zijn conservatieve ranges uit peer-reviewed meta-analyses.
              </p>
            </div>
          </Card>

          {/* Call to Action */}
          <Card className="p-8 bg-gradient-to-br from-brand-green to-brand-green-light text-white text-center mb-8">
            <div className="flex items-center gap-4 justify-center mb-6">
              <img 
                src="/lovable-uploads/25a27d67-f5ef-4b9c-8e54-b246de0f3596.png" 
                alt="Bas Ter Haar Romenij" 
                className="w-20 h-20 rounded-full object-cover border-4 border-white"
              />
              <div className="text-left">
                <p className="text-white text-lg italic">
                  "Deze cijfers zijn indrukwekkend! Laten we bespreken hoe we dit voor {formData.company} gaan realiseren."
                </p>
                <p className="text-white/90 text-sm mt-1">— Bas Ter Haar Romenij</p>
                <p className="text-white/80 text-xs">Oprichter en adviseur InnerLeaps</p>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="bg-white text-brand-green hover:bg-gray-100 font-semibold px-8 py-4 text-lg" 
              onClick={openCalendar}
            >
              Plan een vrijblijvend gesprek
            </Button>
          </Card>

          {/* Back button */}
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 py-4 text-lg" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Terug naar home
            </Button>
          </div>
        </div>
      </div>

      {/* Sticky CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button 
          onClick={openCalendar}
          className="bg-brand-green hover:bg-brand-green-light text-white font-semibold py-5 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Plan een gesprek
        </Button>
      </div>
    </div>
  );
};

export default Berekening;
