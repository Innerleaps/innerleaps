
import { Card } from '@/components/ui/card';
import { TrendingUp, Calculator, BookOpen, Users } from 'lucide-react';
import { CalculationResults, CalculationFormData } from '@/utils/calculationUtils';

interface CalculationResultsProps {
  results: CalculationResults;
  formData: CalculationFormData;
}

const CalculationResultsComponent = ({ results, formData }: CalculationResultsProps) => {
  return (
    <div className="space-y-8">
      {/* Main Results Card */}
      <Card className="p-6 md:p-8 bg-gradient-to-br from-brand-green to-brand-green-light text-white">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <TrendingUp className="h-8 w-8" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold">Uw Potentiële Besparing</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center p-4 bg-white/20 rounded-lg">
              <div className="text-2xl md:text-3xl font-bold mb-2">€{results.totalSaving.toLocaleString()}</div>
              <div className="text-sm md:text-base opacity-90">Netto jaarlijkse besparing</div>
            </div>
            <div className="text-center p-4 bg-white/20 rounded-lg">
              <div className="text-2xl md:text-3xl font-bold mb-2">{results.roi}%</div>
              <div className="text-sm md:text-base opacity-90">ROI</div>
            </div>
          </div>
          
          <div className="text-center p-6 bg-white/10 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="h-6 w-6" />
              <span className="text-xl md:text-2xl font-bold">{results.numberOfGroups} groep{results.numberOfGroups !== 1 ? 'en' : ''}</span>
            </div>
            <div className="text-sm md:text-base opacity-90">Benodigde MBSR-groepen (max. 15 deelnemers per groep)</div>
          </div>
        </div>
      </Card>

      {/* Calculation Breakdown */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="h-6 w-6 text-brand-blue" />
          <h3 className="text-xl font-bold text-brand-gray-dark">Berekening Breakdown</h3>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-semibold text-brand-gray-dark mb-2 text-base">Verzuimbesparing</h4>
            <p className="text-xl md:text-2xl font-bold text-brand-green mb-1">€{results.verzuimBesparing.toLocaleString()}</p>
            <p className="text-sm md:text-base text-brand-gray-medium">
              {formData.currentAbsenteeism}% × {formData.employees} × €{parseInt(formData.avgEmployeeCosts).toLocaleString()} × {results.constants.VK} × {results.constants.MV}%
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-semibold text-brand-gray-dark mb-2 text-base">Retentiebesparing</h4>
            <p className="text-xl md:text-2xl font-bold text-brand-green mb-1">€{results.retentieBesparing.toLocaleString()}</p>
            <p className="text-sm md:text-base text-brand-gray-medium">
              {formData.currentTurnover}% × {formData.employees} × €{parseInt(formData.avgEmployeeCosts).toLocaleString()} × {results.constants.RV}% × {results.constants.VKP}
            </p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-semibold text-brand-gray-dark mb-2 text-base">Totale Bruto Besparing</h4>
            <p className="text-xl md:text-2xl font-bold text-brand-blue mb-1">€{results.grossSaving.toLocaleString()}</p>
            <p className="text-sm md:text-base text-brand-gray-medium">Verzuim + Retentie besparing</p>
          </div>
        </div>
      </Card>

      {/* Scientific Foundation */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="h-6 w-6 text-brand-blue" />
          <h3 className="text-xl font-bold text-brand-gray-dark">Wetenschappelijke Onderbouwing</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 border border-brand-blue-light rounded-lg">
              <h4 className="font-semibold text-brand-gray-dark mb-2 text-base">Verzuimreductie door MBSR</h4>
              <p className="text-lg font-bold text-brand-blue mb-1">{results.constants.MV}%</p>
              <p className="text-sm md:text-base text-brand-gray-medium">
                Gemiddelde van 19-29% uit verschillende wetenschappelijke onderzoeken naar MBSR effectiviteit op werkgerelateerde stress en verzuim.
              </p>
            </div>
            
            <div className="p-4 border border-brand-blue-light rounded-lg">
              <h4 className="font-semibold text-brand-gray-dark mb-2 text-base">Verzuimkosten Multiplier</h4>
              <p className="text-lg font-bold text-brand-blue mb-1">{results.constants.VK}x</p>
              <p className="text-sm md:text-base text-brand-gray-medium">
                <strong>Bron:</strong> Johns (2010) - Verzuimkosten zijn gemiddeld 2x het basissalaris door vervanging, verlies van productiviteit en administratiekosten.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border border-brand-blue-light rounded-lg">
              <h4 className="font-semibold text-brand-gray-dark mb-2 text-base">Retentieverbetering door MBSR</h4>
              <p className="text-lg font-bold text-brand-blue mb-1">{results.constants.RV}%</p>
              <p className="text-sm md:text-base text-brand-gray-medium">
                Gemiddelde van 17-31% uit verschillende onderzoeken naar MBSR impact op werknemerstevredenheid en retentie.
              </p>
            </div>
            
            <div className="p-4 border border-brand-blue-light rounded-lg">
              <h4 className="font-semibold text-brand-gray-dark mb-2 text-base">Vervangingskosten Factor</h4>
              <p className="text-lg font-bold text-brand-blue mb-1">{results.constants.VKP}x</p>
              <p className="text-sm md:text-base text-brand-gray-medium">
                <strong>Bron:</strong> O'Connell & Kung (2007) - Vervangingskosten zijn 150% van het jaarsalaris door werving, training en productieverlies.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-brand-green-light rounded-lg">
          <p className="text-sm md:text-base text-brand-gray-dark">
            <strong>Methodologie:</strong> Deze berekening is gebaseerd op 40+ jaar wetenschappelijk onderzoek naar MBSR (Mindfulness-Based Stress Reduction) 
            en erkende HR-kostenmethodieken. Alle percentages zijn conservatieve gemiddelden uit peer-reviewed studies.
          </p>
        </div>
      </Card>

      {/* Program Details */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-brand-gray-dark mb-4">Uw gegevens</h4>
        <div className="grid md:grid-cols-2 gap-4 text-brand-gray-medium">
          <div className="space-y-2">
            <p className="text-base"><strong>Aantal deelnemers:</strong> {formData.employees}</p>
            <p className="text-base"><strong>Aantal groepen:</strong> {results.numberOfGroups}</p>
            <p className="text-base"><strong>Programma duur:</strong> 8 weken</p>
          </div>
          <div className="space-y-2">
            <p className="text-base"><strong>Gemiddelde werkgeverskosten:</strong> €{parseInt(formData.avgEmployeeCosts).toLocaleString()}</p>
            <p className="text-base"><strong>Huidig verzuimpercentage:</strong> {formData.currentAbsenteeism}%</p>
            <p className="text-base"><strong>Huidig verlooppercentage:</strong> {formData.currentTurnover}%</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CalculationResultsComponent;
