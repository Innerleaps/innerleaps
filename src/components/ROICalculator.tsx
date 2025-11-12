import { useState, lazy, Suspense } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { calculateROI, ROIResults } from '@/utils/calculationEngine';

// Lazy load results view
const ROIResultsView = lazy(() => import('./calculator/ROIResultsView'));

const ROICalculator = () => {
  const { toast } = useToast();
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

  const handleSubmit = async () => {
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

  if (showResults && calculationResults) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8">
            <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
              <ROIResultsView 
                results={calculationResults}
                formData={formData}
                onReset={handleReset}
              />
            </Suspense>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto p-8 bg-brand-blue">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <Calculator className="h-8 w-8 text-brand-orange" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Ontdek de impact voor jullie organisatie
            </h2>
            <p className="text-white/90">
              Op basis van 40 jaar wetenschappelijk onderzoek
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Linker kolom - Contactgegevens */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Contactgegevens</h3>
              
              <div>
                <Label htmlFor="naam" className="text-white font-medium">
                  Naam *
                </Label>
                <Input
                  id="naam"
                  type="text"
                  value={formData.naam}
                  onChange={(e) => handleInputChange('naam', e.target.value)}
                  placeholder="Jouw naam"
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="jouw@email.nl"
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="bedrijfsnaam" className="text-white font-medium">
                  Bedrijfsnaam *
                </Label>
                <Input
                  id="bedrijfsnaam"
                  type="text"
                  value={formData.bedrijfsnaam}
                  onChange={(e) => handleInputChange('bedrijfsnaam', e.target.value)}
                  placeholder="Jouw organisatie"
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="telefoon" className="text-white font-medium">
                  Telefoon
                </Label>
                <Input
                  id="telefoon"
                  type="tel"
                  value={formData.telefoon}
                  onChange={(e) => handleInputChange('telefoon', e.target.value)}
                  placeholder="06 12345678"
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Rechter kolom - Berekeningsgegevens */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Organisatiegegevens</h3>
              
              <div>
                <Label htmlFor="verzuimPercentage" className="text-white font-medium">
                  Huidig verzuimpercentage (%) *
                </Label>
                <Input
                  id="verzuimPercentage"
                  type="number"
                  step="0.1"
                  value={formData.verzuimPercentage}
                  onChange={(e) => handleInputChange('verzuimPercentage', e.target.value)}
                  placeholder="5.2"
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="verloopPercentage" className="text-white font-medium">
                  Huidig personeelsverloop (%) *
                </Label>
                <Input
                  id="verloopPercentage"
                  type="number"
                  step="0.1"
                  value={formData.verloopPercentage}
                  onChange={(e) => handleInputChange('verloopPercentage', e.target.value)}
                  placeholder="10"
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="aantalWerknemers" className="text-white font-medium">
                  Aantal werknemers *
                </Label>
                <Input
                  id="aantalWerknemers"
                  type="number"
                  value={formData.aantalWerknemers}
                  onChange={(e) => handleInputChange('aantalWerknemers', e.target.value)}
                  placeholder="100"
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="brutoJaarsalaris" className="text-white font-medium">
                  Gemiddeld bruto jaarsalaris (€) *
                </Label>
                <Input
                  id="brutoJaarsalaris"
                  type="number"
                  value={formData.brutoJaarsalaris}
                  onChange={(e) => handleInputChange('brutoJaarsalaris', e.target.value)}
                  placeholder="45000"
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button 
              onClick={handleSubmit}
              disabled={!isFormValid() || isSubmitting}
              className="px-8 bg-brand-orange hover:bg-brand-orange/90"
            >
              {isSubmitting ? 'Bezig met berekenen...' : 'Bereken Besparing'}
            </Button>
          </div>

          <div className="mt-6 text-xs text-white/80 text-center">
            * Alle velden zijn verplicht. Je gegevens worden vertrouwelijk behandeld.
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ROICalculator;