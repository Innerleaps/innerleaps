import { memo } from 'react';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import { ROIResults } from '@/utils/calculationEngine';

interface ROIResultsViewProps {
  results: ROIResults;
  formData: {
    aantalWerknemers: string;
    brutoJaarsalaris: string;
    verzuimPercentage: string;
    verloopPercentage: string;
  };
  onReset: () => void;
}

const ROIResultsView = memo(({ results, formData, onReset }: ROIResultsViewProps) => {
  return (
    <>
      <div className="text-center mb-8">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-brand-gray-dark mb-2">
          Ontdek de impact voor jullie organisatie
        </h2>
        <p className="text-brand-gray-medium">
          Op basis van 40 jaar wetenschappelijk onderzoek
        </p>
      </div>

      {/* Organisatie samenvatting */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-brand-gray-dark mb-3">Jouw Organisatie</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-brand-gray-medium">Werknemers:</span>
            <span className="ml-2 font-semibold">{formData.aantalWerknemers}</span>
          </div>
          <div>
            <span className="text-brand-gray-medium">Gem. salaris:</span>
            <span className="ml-2 font-semibold">{formatCurrency(parseInt(formData.brutoJaarsalaris))}</span>
          </div>
          <div>
            <span className="text-brand-gray-medium">Verzuim:</span>
            <span className="ml-2 font-semibold">{formData.verzuimPercentage}%</span>
          </div>
          <div>
            <span className="text-brand-gray-medium">Verloop:</span>
            <span className="ml-2 font-semibold">{formData.verloopPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Conservative Scenario */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-brand-gray-dark">Conservative Scenario</h3>
          <span className="text-sm text-brand-gray-medium">Minimale Impact</span>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-brand-gray-medium">Verzuimbesparing (15%):</span>
            <span className="font-semibold text-green-600">{formatCurrency(results.scenarios.conservative.verzuimBesparing)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-brand-gray-medium">Retentiebesparing (5%):</span>
            <span className="font-semibold text-green-600">{formatCurrency(results.scenarios.conservative.retentieBesparing)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-brand-gray-medium">Productiviteitswinst (5%):</span>
            <span className="font-semibold text-green-600">{formatCurrency(results.scenarios.conservative.productiviteitBesparing)}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3 space-y-2">
          <div className="flex justify-between font-semibold">
            <span className="text-brand-gray-dark">Totale besparing:</span>
            <span className="text-green-600">{formatCurrency(results.scenarios.conservative.totaleBesparing)}</span>
          </div>
          <div className="flex justify-between text-sm text-brand-gray-medium">
            <span>Investering:</span>
            <span className="text-red-600">-{formatCurrency(results.investment)}</span>
          </div>
          <div className="border-t border-gray-300 pt-2 mt-2">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-brand-gray-dark">NETTO WINST:</span>
              <span className="text-green-600">{formatCurrency(results.scenarios.conservative.netBesparing)}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-brand-gray-dark">ROI:</span>
              <span className="font-bold text-brand-blue">{formatPercentage(results.scenarios.conservative.roi)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Positive Scenario */}
      <div className="bg-white border-2 border-brand-orange rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-brand-gray-dark">Positive Scenario</h3>
          <span className="text-sm text-brand-gray-medium">Volledige Impact</span>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-brand-gray-medium">Verzuimbesparing (21%):</span>
            <span className="font-semibold text-green-600">{formatCurrency(results.scenarios.positive.verzuimBesparing)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-brand-gray-medium">Retentiebesparing (8%):</span>
            <span className="font-semibold text-green-600">{formatCurrency(results.scenarios.positive.retentieBesparing)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-brand-gray-medium">Productiviteitswinst (8%):</span>
            <span className="font-semibold text-green-600">{formatCurrency(results.scenarios.positive.productiviteitBesparing)}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3 space-y-2">
          <div className="flex justify-between font-semibold">
            <span className="text-brand-gray-dark">Totale besparing:</span>
            <span className="text-green-600">{formatCurrency(results.scenarios.positive.totaleBesparing)}</span>
          </div>
          <div className="flex justify-between text-sm text-brand-gray-medium">
            <span>Investering:</span>
            <span className="text-red-600">-{formatCurrency(results.investment)}</span>
          </div>
          <div className="border-t border-gray-300 pt-2 mt-2">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-brand-gray-dark">NETTO WINST:</span>
              <span className="text-green-600">{formatCurrency(results.scenarios.positive.netBesparing)}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-brand-gray-dark">ROI:</span>
              <span className="font-bold text-brand-blue">{formatPercentage(results.scenarios.positive.roi)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wetenschappelijke onderbouwing */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-brand-gray-dark mb-3">Wetenschappelijke Onderbouwing</h3>
        <p className="text-sm text-brand-gray-medium mb-3">
          Deze cijfers zijn gebaseerd op 40 jaar wetenschappelijk onderzoek naar aandachttraining:
        </p>
        <ul className="text-sm text-brand-gray-medium space-y-2">
          <li className="flex items-start">
            <span className="text-brand-orange mr-2">•</span>
            <span>15-21% verzuimreductie (meta-analyses van 200+ studies)</span>
          </li>
          <li className="flex items-start">
            <span className="text-brand-orange mr-2">•</span>
            <span>5-8% retentieverbetering (Harvard Business Review, 2019)</span>
          </li>
          <li className="flex items-start">
            <span className="text-brand-orange mr-2">•</span>
            <span>5-8% productiviteitsverbetering (Oxford University, 2022)</span>
          </li>
        </ul>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <p className="text-lg font-semibold text-brand-gray-dark mb-6">
          Wil je deze winst realiseren?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold py-3 sm:py-5 px-4 sm:px-10 text-base sm:text-lg rounded-lg shadow-lg"
            onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2z6RN96P7L5QS9W8w-pS6XYBpCrH52I_AvP0R7Y6vxnzQLFXz9VwlGb3XPH4VFzJUyMTa1YTxP', '_blank')}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Kennismaken met Bas
          </Button>
          <Button 
            variant="outline"
            className="font-semibold py-3 sm:py-5 px-4 sm:px-10 text-base sm:text-lg rounded-lg shadow-lg"
            onClick={onReset}
          >
            Nieuwe berekening
          </Button>
        </div>
      </div>
    </>
  );
});

ROIResultsView.displayName = 'ROIResultsView';

export default ROIResultsView;
