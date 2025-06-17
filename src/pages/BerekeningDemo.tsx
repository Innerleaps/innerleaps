import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrendingUp, ArrowLeft, Users, Calculator, BookOpen } from 'lucide-react';
const BerekeningDemo = () => {
  const navigate = useNavigate();

  // Demo data
  const demoFormData = {
    name: 'Demo Gebruiker',
    company: 'Demo BV',
    employees: '50',
    avgEmployeeCosts: '50000',
    currentAbsenteeism: '4.2',
    currentTurnover: '12.5'
  };

  // Berekening met demo data
  const AD = 50;
  const GWS = 50000;
  const HZ = 4.2;
  const HV = 12.5;
  const VK = 2;
  const MV = 0.24;
  const RV = 0.24;
  const VKP = 1.5;
  const G = 15;
  const I = 8625;
  const verzuimBesparing = HZ / 100 * AD * GWS * VK * MV;
  const retentieBesparing = HV / 100 * AD * GWS * RV * VKP;
  const totaleBesparing = verzuimBesparing + retentieBesparing;
  const numberOfGroups = Math.ceil(AD / G);
  const totalInvestment = numberOfGroups * I;
  const netBesparing = totaleBesparing - totalInvestment;
  const roi = totalInvestment > 0 ? totaleBesparing / totalInvestment * 100 : 0;
  const demoResults = {
    verzuimBesparing: Math.round(verzuimBesparing),
    retentieBesparing: Math.round(retentieBesparing),
    totalSaving: Math.round(netBesparing),
    grossSaving: Math.round(totaleBesparing),
    investment: totalInvestment,
    roi: Math.round(roi),
    numberOfGroups: numberOfGroups,
    constants: {
      VK: VK,
      MV: MV * 100,
      RV: RV * 100,
      VKP: VKP
    }
  };
  const openCalendar = () => {
    window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank');
  };
  return <div className="min-h-screen bg-gradient-to-br from-brand-blue-light to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-green text-white rounded-full mb-6">
              <TrendingUp className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-bold text-brand-gray-dark mb-4">
              De besparing van {demoFormData.company}
            </h1>
            <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-4">
              <p className="text-yellow-800 font-medium">Dit is een demo pagina met voorbeelddata</p>
            </div>
          </div>

          {/* Results Card */}
          <Card className="p-8 bg-gradient-to-br from-brand-green to-brand-green-light text-white mb-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              
              <h2 className="text-3xl font-bold">Uw Potentiële Besparing</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl font-bold mb-2">€{demoResults.totalSaving.toLocaleString()}</div>
                  <div className="text-sm opacity-90">Netto jaarlijkse besparing</div>
                </div>
                <div className="text-center p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl font-bold mb-2">{demoResults.roi}%</div>
                  <div className="text-sm opacity-90">ROI</div>
                </div>
              </div>

              {/* CTA Button in groene blok */}
              <div className="pt-4">
                
              </div>
              
              <div className="text-center p-6 bg-white/10 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="h-6 w-6" />
                  <span className="text-2xl font-bold">{demoResults.numberOfGroups} groep{demoResults.numberOfGroups !== 1 ? 'en' : ''}</span>
                </div>
                <div className="text-sm opacity-90">Benodigde MBSR-groepen (max. 15 deelnemers per groep)</div>
              </div>

              {/* CTA Button onderaan groene blok */}
              <div className="pt-4 border-t border-white/20">
                <Button size="lg" className="bg-white text-brand-green hover:bg-gray-100 font-semibold px-8 py-4 text-lg" onClick={openCalendar}>Plan een kennismaking</Button>
              </div>
            </div>
          </Card>

          {/* Calculation Breakdown */}
          <Card className="p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="h-6 w-6 text-brand-blue" />
              <h3 className="text-xl font-bold text-brand-gray-dark">Berekening Breakdown</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <h4 className="font-semibold text-brand-gray-dark mb-2">Verzuimbesparing</h4>
                  <p className="text-2xl font-bold text-brand-green mb-1">€{demoResults.verzuimBesparing.toLocaleString()}</p>
                  <p className="text-sm text-brand-gray-medium">
                    {demoFormData.currentAbsenteeism}% × {demoFormData.employees} × €{parseInt(demoFormData.avgEmployeeCosts).toLocaleString()} × {demoResults.constants.VK} × {demoResults.constants.MV}%
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <h4 className="font-semibold text-brand-gray-dark mb-2">Retentiebesparing</h4>
                  <p className="text-2xl font-bold text-brand-green mb-1">€{demoResults.retentieBesparing.toLocaleString()}</p>
                  <p className="text-sm text-brand-gray-medium">
                    {demoFormData.currentTurnover}% × {demoFormData.employees} × €{parseInt(demoFormData.avgEmployeeCosts).toLocaleString()} × {demoResults.constants.RV}% × {demoResults.constants.VKP}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg border">
                  <h4 className="font-semibold text-brand-gray-dark mb-2">Totale Bruto Besparing</h4>
                  <p className="text-2xl font-bold text-brand-blue mb-1">€{demoResults.grossSaving.toLocaleString()}</p>
                  <p className="text-sm text-brand-gray-medium">Verzuim + Retentie besparing</p>
                </div>
                
                <div className="p-4 bg-white rounded-lg border">
                  <h4 className="font-semibold text-brand-gray-dark mb-2">Netto Jaarlijkse Besparing</h4>
                  <p className="text-2xl font-bold text-brand-green mb-1">€{demoResults.totalSaving.toLocaleString()}</p>
                  <p className="text-sm text-brand-gray-medium">Bruto besparing minus programmakosten</p>
                </div>
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
                  <p className="text-lg font-bold text-brand-blue mb-1">{demoResults.constants.MV}%</p>
                  <p className="text-sm text-brand-gray-medium">
                    Gemiddelde van 19-29% uit verschillende wetenschappelijke onderzoeken naar MBSR effectiviteit op werkgerelateerde stress en verzuim.
                  </p>
                </div>
                
                <div className="p-4 border border-brand-blue-light rounded-lg">
                  <h4 className="font-semibold text-brand-gray-dark mb-2">Verzuimkosten Multiplier</h4>
                  <p className="text-lg font-bold text-brand-blue mb-1">{demoResults.constants.VK}x</p>
                  <p className="text-sm text-brand-gray-medium">
                    <strong>Bron:</strong> Johns (2010) - Verzuimkosten zijn gemiddeld 2x het basissalaris door vervanging, verlies van productiviteit en administratiekosten.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border border-brand-blue-light rounded-lg">
                  <h4 className="font-semibold text-brand-gray-dark mb-2">Retentieverbetering door MBSR</h4>
                  <p className="text-lg font-bold text-brand-blue mb-1">{demoResults.constants.RV}%</p>
                  <p className="text-sm text-brand-gray-medium">
                    Gemiddelde van 17-31% uit verschillende onderzoeken naar MBSR impact op werknemerstevredenheid en retentie.
                  </p>
                </div>
                
                <div className="p-4 border border-brand-blue-light rounded-lg">
                  <h4 className="font-semibold text-brand-gray-dark mb-2">Vervangingskosten Factor</h4>
                  <p className="text-lg font-bold text-brand-blue mb-1">{demoResults.constants.VKP}x</p>
                  <p className="text-sm text-brand-gray-medium">
                    <strong>Bron:</strong> O'Connell & Kung (2007) - Vervangingskosten zijn 150% van het jaarsalaris door werving, training en productieverlies.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-brand-green-light rounded-lg">
              <p className="text-sm text-brand-gray-dark">
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
              Plan een vrijblijvend gesprek om te bespreken hoe u deze besparingen kunt realiseren met ons bewezen MBSR programma.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-brand-green hover:bg-brand-green-light text-white px-8 py-4 text-lg" onClick={openCalendar}>
                Plan een gesprek
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 py-4 text-lg" onClick={() => navigate('/')}>
                <ArrowLeft className="h-5 w-5 mr-2" />
                Terug naar home
              </Button>
            </div>
          </div>

          {/* Program Details */}
          <Card className="mt-6 p-6">
            <h4 className="text-lg font-semibold text-brand-gray-dark mb-4">Demo gegevens</h4>
            <div className="grid md:grid-cols-2 gap-4 text-brand-gray-medium">
              <div>
                <p><strong>Aantal deelnemers:</strong> {demoFormData.employees}</p>
                <p><strong>Aantal groepen:</strong> {demoResults.numberOfGroups}</p>
                <p><strong>Programma duur:</strong> 8 weken</p>
              </div>
              <div>
                <p><strong>Gemiddelde werkgeverskosten:</strong> €{parseInt(demoFormData.avgEmployeeCosts).toLocaleString()}</p>
                <p><strong>Huidig verzuimpercentage:</strong> {demoFormData.currentAbsenteeism}%</p>
                <p><strong>Huidig verlooppercentage:</strong> {demoFormData.currentTurnover}%</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Sticky CTA Button rechtsonderin */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button onClick={openCalendar} className="bg-brand-green hover:bg-brand-green-light text-white font-semibold py-5 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          Plan een gesprek
        </Button>
      </div>
    </div>;
};
export default BerekeningDemo;