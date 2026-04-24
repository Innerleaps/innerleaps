import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, CheckCircle2, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { calculateROI, ROIResults } from '@/utils/calculationEngine';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalculatorModal = ({ isOpen, onClose }: CalculatorModalProps) => {
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    bedrijfsnaam: '',
    telefoon: '',
    verzuimPercentage: '',
    verloopPercentage: '',
    aantalWerknemers: '',
    brutoJaarsalaris: '',
  });

  const [calculationResults, setCalculationResults] = useState<ROIResults | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${Math.round(percentage)}%`;
  };

  const isFormValid = () => {
    return (
      formData.naam.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.bedrijfsnaam.trim() !== '' &&
      formData.verzuimPercentage.trim() !== '' &&
      formData.verloopPercentage.trim() !== '' &&
      formData.aantalWerknemers.trim() !== '' &&
      formData.brutoJaarsalaris.trim() !== ''
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast({
        title: "Vul alle verplichte velden in",
        description: "Alle velden met een * zijn verplicht.",
        variant: "destructive",
      });
      return;
    }

    // Bereken resultaten
    const results = calculateROI({
      currentAbsenteeism: parseFloat(formData.verzuimPercentage),
      employeeTurnover: parseFloat(formData.verloopPercentage),
      numberOfEmployees: parseInt(formData.aantalWerknemers),
      avgGrossAnnualSalary: parseInt(formData.brutoJaarsalaris),
    });

    setCalculationResults(results);
    setShowResults(true);

    // Verstuur naar edge function
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('submit-calculator', {
        body: {
          name: formData.naam,
          email: formData.email,
          company: formData.bedrijfsnaam,
          phone: formData.telefoon || '',
          currentAbsenteeism: parseFloat(formData.verzuimPercentage),
          employeeTurnover: parseFloat(formData.verloopPercentage),
          numberOfEmployees: parseInt(formData.aantalWerknemers),
          avgGrossAnnualSalary: parseInt(formData.brutoJaarsalaris),
          results,
        },
      });

      if (error) throw error;

      toast({
        title: "Berekening verstuurd!",
        description: "We hebben je ROI analyse naar je email gestuurd.",
      });
    } catch (error) {
      console.error('Error submitting calculator:', error);
      toast({
        title: "Er ging iets mis",
        description: "Probeer het later opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      naam: '',
      email: '',
      bedrijfsnaam: '',
      telefoon: '',
      verzuimPercentage: '',
      verloopPercentage: '',
      aantalWerknemers: '',
      brutoJaarsalaris: '',
    });
    setCalculationResults(null);
    setShowResults(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  if (showResults && calculationResults) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-4">
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
                  <span className="font-semibold text-green-600">{formatCurrency(calculationResults.scenarios.conservative.verzuimBesparing)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray-medium">Retentiebesparing (5%):</span>
                  <span className="font-semibold text-green-600">{formatCurrency(calculationResults.scenarios.conservative.retentieBesparing)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray-medium">Productiviteitswinst (5%):</span>
                  <span className="font-semibold text-green-600">{formatCurrency(calculationResults.scenarios.conservative.productiviteitBesparing)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-brand-gray-dark">Totale besparing:</span>
                  <span className="text-green-600">{formatCurrency(calculationResults.scenarios.conservative.totaleBesparing)}</span>
                </div>
                <div className="flex justify-between text-sm text-brand-gray-medium">
                  <span>Investering:</span>
                  <span className="text-red-600">-{formatCurrency(calculationResults.investment)}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-brand-gray-dark">NETTO WINST:</span>
                    <span className="text-green-600">{formatCurrency(calculationResults.scenarios.conservative.netBesparing)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-brand-gray-dark">ROI:</span>
                    <span className="font-bold text-brand-blue">{formatPercentage(calculationResults.scenarios.conservative.roi)}</span>
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
                  <span className="font-semibold text-green-600">{formatCurrency(calculationResults.scenarios.positive.verzuimBesparing)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray-medium">Retentiebesparing (8%):</span>
                  <span className="font-semibold text-green-600">{formatCurrency(calculationResults.scenarios.positive.retentieBesparing)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray-medium">Productiviteitswinst (8%):</span>
                  <span className="font-semibold text-green-600">{formatCurrency(calculationResults.scenarios.positive.productiviteitBesparing)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-brand-gray-dark">Totale besparing:</span>
                  <span className="text-green-600">{formatCurrency(calculationResults.scenarios.positive.totaleBesparing)}</span>
                </div>
                <div className="flex justify-between text-sm text-brand-gray-medium">
                  <span>Investering:</span>
                  <span className="text-red-600">-{formatCurrency(calculationResults.investment)}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-brand-gray-dark">NETTO WINST:</span>
                    <span className="text-green-600">{formatCurrency(calculationResults.scenarios.positive.netBesparing)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-brand-gray-dark">ROI:</span>
                    <span className="font-bold text-brand-blue">{formatPercentage(calculationResults.scenarios.positive.roi)}</span>
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
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white"
                  onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2z6RN96P7L5QS9W8w-pS6XYBpCrH52I_AvP0R7Y6vxnzQLFXz9VwlGb3XPH4VFzJUyMTa1YTxP', '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Kennismaken met Bas
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleReset}
                >
                  Nieuwe berekening
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <div className="text-center">
            <div className="inline-flex items-center bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calculator className="h-4 w-4 mr-2" />
              ROI Calculator
            </div>
            
            <DialogTitle className="text-3xl font-bold mb-6 text-brand-gray-dark">
              Bereken wat onze training oplevert
            </DialogTitle>
            
            <p className="text-xl leading-relaxed mb-8 text-brand-gray-medium">
              Vul de gegevens in en ontvang een gepersonaliseerde ROI-analyse. Deze is gebaseerd op het kernprogramma van InnerLeaps en wetenschappelijk onderzoek.
            </p>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Contactgegevens */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-brand-gray-dark mb-4">Contactgegevens</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="modal-naam" className="text-brand-gray-dark font-medium">
                    Naam*
                  </Label>
                  <Input
                    id="modal-naam"
                    type="text"
                    value={formData.naam}
                    onChange={(e) => handleInputChange('naam', e.target.value)}
                    className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                    placeholder="Jouw naam"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modal-email" className="text-brand-gray-dark font-medium">
                    Email*
                  </Label>
                  <Input
                    id="modal-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                    placeholder="jouw@email.nl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modal-bedrijfsnaam" className="text-brand-gray-dark font-medium">
                    Bedrijfsnaam*
                  </Label>
                  <Input
                    id="modal-bedrijfsnaam"
                    type="text"
                    value={formData.bedrijfsnaam}
                    onChange={(e) => handleInputChange('bedrijfsnaam', e.target.value)}
                    className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                    placeholder="Jouw organisatie"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modal-telefoon" className="text-brand-gray-dark font-medium">
                    Telefoon
                  </Label>
                  <Input
                    id="modal-telefoon"
                    type="tel"
                    value={formData.telefoon}
                    onChange={(e) => handleInputChange('telefoon', e.target.value)}
                    className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                    placeholder="06 12345678"
                  />
                </div>
              </div>

              {/* Right Column - Input voor berekening */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-brand-gray-dark mb-4">Organisatiegegevens</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="modal-verzuim" className="text-brand-gray-dark font-medium">
                    Huidig verzuimpercentage (%)*
                  </Label>
                  <Input
                    id="modal-verzuim"
                    type="number"
                    step="0.1"
                    value={formData.verzuimPercentage}
                    onChange={(e) => handleInputChange('verzuimPercentage', e.target.value)}
                    className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                    placeholder="5.2"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modal-verloop" className="text-brand-gray-dark font-medium">
                    Personeelsverloop percentage (%)*
                  </Label>
                  <Input
                    id="modal-verloop"
                    type="number"
                    step="0.1"
                    value={formData.verloopPercentage}
                    onChange={(e) => handleInputChange('verloopPercentage', e.target.value)}
                    className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                    placeholder="10"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modal-werknemers" className="text-brand-gray-dark font-medium">
                    Aantal werknemers*
                  </Label>
                  <Input
                    id="modal-werknemers"
                    type="number"
                    value={formData.aantalWerknemers}
                    onChange={(e) => handleInputChange('aantalWerknemers', e.target.value)}
                    className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                    placeholder="15"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modal-salaris" className="text-brand-gray-dark font-medium">
                    Gemiddeld bruto jaarsalaris per werknemer (€)*
                  </Label>
                  <Input
                    id="modal-salaris"
                    type="number"
                    value={formData.brutoJaarsalaris}
                    onChange={(e) => handleInputChange('brutoJaarsalaris', e.target.value)}
                    className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                    placeholder="39700"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={isSubmitting || !isFormValid()}
                  className={`
                    px-8 py-4 rounded-lg shadow-xl font-semibold text-lg
                    transition-all duration-300
                    ${isFormValid() 
                      ? 'bg-brand-orange hover:bg-brand-orange/90 text-white cursor-pointer' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                    ${isSubmitting ? 'opacity-50' : ''}
                  `}
                >
                  {isSubmitting ? 'Bezig met berekenen...' : 'Bereken Besparing'}
                </Button>
              </div>
              {!isFormValid() && (
                <p className="text-sm text-red-600 mt-2">Vul alle verplichte velden (*) in</p>
              )}
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalculatorModal;
