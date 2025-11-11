import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, CheckCircle2, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { calculateROI, ROIResults } from '@/utils/calculationEngine';

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
            <div className="text-center mb-8">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-brand-gray-dark mb-2">
                Je Potentiële Kostenbesparingen
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
                  <span className="font-semibold">{formatCurrency(calculationResults.scenarios.conservative.verzuimBesparing)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray-medium">Retentiebesparing (5%):</span>
                  <span className="font-semibold">{formatCurrency(calculationResults.scenarios.conservative.retentieBesparing)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray-medium">Productiviteitswinst (5%):</span>
                  <span className="font-semibold">{formatCurrency(calculationResults.scenarios.conservative.productiviteitBesparing)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="flex justify-between font-semibold">
                  <span>Totale besparing:</span>
                  <span className="text-green-600">{formatCurrency(calculationResults.scenarios.conservative.totaleBesparing)}</span>
                </div>
                <div className="flex justify-between text-sm text-brand-gray-medium">
                  <span>Investering:</span>
                  <span className="text-red-600">-{formatCurrency(calculationResults.investment)}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>NETTO WINST:</span>
                    <span className="text-green-600">{formatCurrency(calculationResults.scenarios.conservative.netBesparing)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>ROI:</span>
                    <span className="font-bold text-brand-orange">{formatPercentage(calculationResults.scenarios.conservative.roi)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Positive Scenario */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-brand-orange rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-brand-gray-dark">Positive Scenario</h3>
                <span className="text-sm text-brand-gray-medium">Volledige Impact</span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray-medium">Verzuimbesparing (21%):</span>
                  <span className="font-semibold">{formatCurrency(calculationResults.scenarios.positive.verzuimBesparing)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray-medium">Retentiebesparing (8%):</span>
                  <span className="font-semibold">{formatCurrency(calculationResults.scenarios.positive.retentieBesparing)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray-medium">Productiviteitswinst (8%):</span>
                  <span className="font-semibold">{formatCurrency(calculationResults.scenarios.positive.productiviteitBesparing)}</span>
                </div>
              </div>

              <div className="border-t border-orange-300 pt-3 space-y-2">
                <div className="flex justify-between font-semibold">
                  <span>Totale besparing:</span>
                  <span className="text-green-600">{formatCurrency(calculationResults.scenarios.positive.totaleBesparing)}</span>
                </div>
                <div className="flex justify-between text-sm text-brand-gray-medium">
                  <span>Investering:</span>
                  <span className="text-red-600">-{formatCurrency(calculationResults.investment)}</span>
                </div>
                <div className="border-t border-orange-300 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>NETTO WINST:</span>
                    <span className="text-green-600">{formatCurrency(calculationResults.scenarios.positive.netBesparing)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>ROI:</span>
                    <span className="font-bold text-brand-orange">{formatPercentage(calculationResults.scenarios.positive.roi)}</span>
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
              Je Potentiële Kostenbesparingen
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

              <div className="pt-6 flex justify-center">
                <Button 
                  onClick={handleSubmit}
                  disabled={!isFormValid() || isSubmitting}
                  className="px-8 bg-brand-orange hover:bg-brand-orange/90"
                >
                  {isSubmitting ? 'Bezig met berekenen...' : 'Bereken Besparing'}
                </Button>
              </div>
            </div>
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