
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrendingUp, ArrowLeft, Users, Calculator, BookOpen } from 'lucide-react';
import { useEffect } from 'react';

const Berekening = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    results,
    formData
  } = location.state || {};

  useEffect(() => {
    // Redirect to home if no data is provided
    if (!results || !formData) {
      navigate('/');
    }
  }, [results, formData, navigate]);

  if (!results || !formData) {
    return null;
  }

  const openCalendar = () => {
    // Using anchor tag with target="_blank" to avoid ERR_BLOCKED_BY_RESPONSE
    const link = document.createElement('a');
    link.href = 'https://calendar.app.google/ZimMXqBKdvgv92g6A';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue-light to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-green text-white rounded-full mb-6">
              <TrendingUp className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-bold text-brand-gray-dark mb-4">
              De besparing van {formData.company}
            </h1>
          </div>

          {/* Results Card */}
          <Card className="p-8 bg-gradient-to-br from-brand-green to-brand-green-light text-white mb-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              
              <h2 className="text-3xl font-bold">Je Potentiële Besparing</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl font-bold mb-2">€{results.totalSaving.toLocaleString()}</div>
                  <div className="text-sm opacity-90">Netto jaarlijkse besparing</div>
                </div>
                <div className="text-center p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl font-bold mb-2">{results.roi}%</div>
                  <div className="text-sm opacity-90">ROI</div>
                </div>
              </div>
              
              <div className="text-center p-6 bg-white/10 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="h-6 w-6" />
                  <span className="text-2xl font-bold">{results.numberOfGroups} groep{results.numberOfGroups !== 1 ? 'en' : ''}</span>
                </div>
                <div className="text-sm opacity-90">Benodigde MBSR-groepen (max. 15 deelnemers per groep)</div>
              </div>

              {/* Bas quote boven de CTA button */}
              <div className="pt-4 border-t border-white/20">
                <div className="flex items-center gap-4 justify-center mb-4">
                  <img 
                    src="/lovable-uploads/25a27d67-f5ef-4b9c-8e54-b246de0f3596.png" 
                    alt="Bas Ter Haar Romenij" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="text-white text-sm italic">
                      "Deze cijfers zijn indrukwekkend! Laten we bespreken hoe we dit voor {formData.company} gaan realiseren."
                    </p>
                    <p className="text-white/80 text-xs">— Bas Ter Haar Romenij</p>
                    <p className="text-white/70 text-xs">Oprichter en adviseur</p>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="bg-white text-brand-green hover:bg-gray-100 font-semibold px-8 py-4 text-lg" 
                  onClick={openCalendar}
                >
                  Plan een gesprek
                </Button>
              </div>
            </div>
          </Card>

          {/* Calculation Breakdown */}
          <Card className="p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="h-6 w-6 text-brand-blue" />
              <h3 className="text-xl font-bold text-brand-gray-dark">Berekening Breakdown</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-semibold text-brand-gray-dark mb-2">Verzuimbesparing</h4>
                <p className="text-2xl font-bold text-brand-green mb-1">€{results.verzuimBesparing.toLocaleString()}</p>
                <p className="text-sm text-brand-gray-medium">
                  {formData.currentAbsenteeism}% × {formData.employees} × €{parseInt(formData.avgEmployeeCosts).toLocaleString()} × {results.constants.VK} × {results.constants.MV}%
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-semibold text-brand-gray-dark mb-2">Retentiebesparing</h4>
                <p className="text-2xl font-bold text-brand-green mb-1">€{results.retentieBesparing.toLocaleString()}</p>
                <p className="text-sm text-brand-gray-medium">
                  {formData.currentTurnover}% × {formData.employees} × €{parseInt(formData.avgEmployeeCosts).toLocaleString()} × {results.constants.RV}% × {results.constants.VKP}
                </p>
              </div>
              
              <div className="p-4 bg-white rounded-lg border">
                <h4 className="font-semibold text-brand-gray-dark mb-2">Totale Bruto Besparing</h4>
                <p className="text-2xl font-bold text-brand-blue mb-1">€{results.grossSaving.toLocaleString()}</p>
                <p className="text-sm text-brand-gray-medium">Verzuim + Retentie besparing</p>
              </div>
            </div>
          </Card>

          {/* Scientific Foundation */}
          <Card className="p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-6 w-6 text-brand-blue" />
              <h3 className="text-xl font-bold text-brand-gray-dark">Wetenschappelijke Onderbouwing</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 border border-brand-blue-light rounded-lg">
                  <h4 className="font-semibold text-brand-gray-dark mb-2">Verzuimreductie door MBSR</h4>
                  <p className="text-lg font-bold text-brand-blue mb-1">{results.constants.MV}%</p>
                  <p className="text-sm text-brand-gray-medium">
                    Gemiddelde van 19-29% uit verschillende wetenschappelijke onderzoeken naar MBSR effectiviteit op werkgerelateerde stress en verzuim.
                  </p>
                </div>
                
                <div className="p-4 border border-brand-blue-light rounded-lg">
                  <h4 className="font-semibold text-brand-gray-dark mb-2">Verzuimkosten Multiplier</h4>
                  <p className="text-lg font-bold text-brand-blue mb-1">{results.constants.VK}x</p>
                  <p className="text-sm text-brand-gray-medium">
                    <strong>Bron:</strong> Johns (2010) - Verzuimkosten zijn gemiddeld 2x het basissalaris door vervanging, verlies van productiviteit en administratiekosten.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border border-brand-blue-light rounded-lg">
                  <h4 className="font-semibold text-brand-gray-dark mb-2">Retentieverbetering door MBSR</h4>
                  <p className="text-lg font-bold text-brand-blue mb-1">{results.constants.RV}%</p>
                  <p className="text-sm text-brand-gray-medium">
                    Gemiddelde van 17-31% uit verschillende onderzoeken naar MBSR impact op werknemerstevredenheid en retentie.
                  </p>
                </div>
                
                <div className="p-4 border border-brand-blue-light rounded-lg">
                  <h4 className="font-semibold text-brand-gray-dark mb-2">Vervangingskosten Factor</h4>
                  <p className="text-lg font-bold text-brand-blue mb-1">{results.constants.VKP}x</p>
                  <p className="text-sm text-brand-gray-medium">
                    <strong>Bron:</strong> O'Connell & Kung (2007) - Vervangingskosten zijn 150% van het jaarsalaris door werving, training en productieverlies.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-brand-blue text-white rounded-lg">
              <p className="text-sm text-white">
                <strong>Methodologie:</strong> Deze berekening is gebaseerd op 40+ jaar wetenschappelijk onderzoek naar MBSR (Mindfulness-Based Stress Reduction) 
                en erkende HR-kostenmethodieken. Alle percentages zijn conservatieve gemiddelden uit peer-reviewed studies.
              </p>
            </div>
          </Card>

          {/* Call to Action */}
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-brand-gray-dark">
              Klaar om deze resultaten te behalen?
            </h3>
            <p className="text-brand-gray-medium">
              Plan een vrijblijvend gesprek om te bespreken hoe je deze besparingen kunt realiseren met ons bewezen MBSR programma.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-brand-green hover:bg-brand-green-light text-white px-8 py-4 text-lg" 
                onClick={openCalendar}
              >
                Plan een gesprek
              </Button>
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
            
            {/* Bas contact section */}
            <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center gap-4 justify-center">
                <img 
                  src="/lovable-uploads/25a27d67-f5ef-4b9c-8e54-b246de0f3596.png" 
                  alt="Bas Ter Haar Romenij" 
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-bold text-brand-gray-dark text-lg">Bas Ter Haar Romenij</p>
                  <p className="text-brand-gray-medium">Oprichter Innerleaps</p>
                  <p className="text-brand-blue text-sm">
                    <a href="mailto:bas@innerleaps.nl" className="hover:underline">bas@innerleaps.nl</a> |
                    <a href="tel:+31623453477" className="hover:underline"> 06 23453477</a>
                  </p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-brand-gray-medium italic">
                  "Wij vinden het echt ontzettend gaaf om organisaties fitter te zien worden. Innerleaps helpt {formData.company} graag verder"
                </p>
              </div>
            </div>
          </div>

          {/* Program Details */}
          <Card className="mt-6 p-6">
            <h4 className="text-lg font-semibold text-brand-gray-dark mb-4">Je gegevens</h4>
            <div className="grid md:grid-cols-2 gap-4 text-brand-gray-medium">
              <div>
                <p><strong>Aantal deelnemers:</strong> {formData.employees}</p>
                <p><strong>Aantal groepen:</strong> {results.numberOfGroups}</p>
                <p><strong>Programma duur:</strong> 9 weken</p>
              </div>
              <div>
                <p><strong>Gemiddelde werkgeverskosten:</strong> €{parseInt(formData.avgEmployeeCosts).toLocaleString()}</p>
                <p><strong>Huidig verzuimpercentage:</strong> {formData.currentAbsenteeism}%</p>
                <p><strong>Huidig verlooppercentage:</strong> {formData.currentTurnover}%</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Sticky CTA Button rechtsonderin */}
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
