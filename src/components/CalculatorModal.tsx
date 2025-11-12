import { useState, lazy, Suspense } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { calculateROI, ROIResults } from '@/utils/calculationEngine';

// Lazy load results view
const ROIResultsView = lazy(() => import('./calculator/ROIResultsView'));

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
            <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
              <ROIResultsView 
                results={calculationResults}
                formData={formData}
                onReset={handleReset}
              />
            </Suspense>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="text-center">
            <div className="inline-flex items-center bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calculator className="h-4 w-4 mr-2" />
              ROI Calculator
            </div>
            
            <DialogTitle className="text-3xl font-bold mb-6 text-brand-gray-dark">
              Bereken wat ons programma oplevert
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
