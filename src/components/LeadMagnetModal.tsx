import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { calculateBusinessCase, BusinessCaseResults } from '@/utils/calculationEngine';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  naam: string;
  email: string;
  functie: string;
  bedrijfsnaam: string;
  telefoon: string;
  aantalWerknemers: string;
  gemiddeldSalaris: string;
  verzuimpercentage: string;
  sector: string;
}

const LeadMagnetModal = ({ isOpen, onClose }: LeadMagnetModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    naam: '',
    email: '',
    functie: '',
    bedrijfsnaam: '',
    telefoon: '',
    aantalWerknemers: '',
    gemiddeldSalaris: '',
    verzuimpercentage: '',
    sector: ''
  });
  const [calculationResults, setCalculationResults] = useState<BusinessCaseResults | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSectorChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      sector: value
    }));
  };

  const isFormValid = 
    formData.naam && 
    formData.email && 
    formData.functie && 
    formData.bedrijfsnaam && 
    formData.aantalWerknemers && 
    formData.gemiddeldSalaris && 
    formData.verzuimpercentage && 
    formData.sector;

  const handleCalculate = async () => {
    if (!isFormValid) {
      toast({ 
        title: "Vul alle verplichte velden in", 
        variant: "destructive" 
      });
      return;
    }

    // Bereken resultaten
    const results = calculateBusinessCase({
      employees: parseInt(formData.aantalWerknemers),
      avgSalary: parseInt(formData.gemiddeldSalaris),
      currentAbsenteeism: parseFloat(formData.verzuimpercentage),
      sector: formData.sector,
    });

    setCalculationResults(results);
    setShowResults(true);

    // Submit naar backend
    setIsSubmitting(true);
    try {
      const response = await supabase.functions.invoke('submit-calculator', {
        body: {
          name: formData.naam,
          email: formData.email,
          phone: formData.telefoon || null,
          functie: formData.functie,
          company: formData.bedrijfsnaam,
          employees: parseInt(formData.aantalWerknemers),
          avgSalary: parseInt(formData.gemiddeldSalaris),
          currentAbsenteeism: parseFloat(formData.verzuimpercentage),
          sector: formData.sector,
          calculationResults: results,
        }
      });

      if (response.error) throw response.error;

      toast({
        title: "Berekening verzonden!",
        description: "Je ontvangt de gedetailleerde resultaten per email.",
      });
    } catch (error) {
      console.error('Submit error:', error);
      toast({
        title: "Email verzending mislukt",
        description: "Je ziet de resultaten nog steeds hieronder.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setShowResults(false);
      setCalculationResults(null);
      setFormData({
        naam: '',
        email: '',
        functie: '',
        bedrijfsnaam: '',
        telefoon: '',
        aantalWerknemers: '',
        gemiddeldSalaris: '',
        verzuimpercentage: '',
        sector: ''
      });
      onClose();
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleMeetBas = () => {
    window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0yOuKvF_kkyuN7VW0l2y8U0V0hxKHQVDPXVBELJ_VB3SDKMC9TVEjT5sK5m4AoEfN8Gc4MqmcY', '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-brand-gray-dark">
            {!showResults ? 'Business Case Calculator' : 'Je Potentiële Kostenbesparingen'}
          </DialogTitle>
        </DialogHeader>
        
        {!showResults ? (
          <div className="space-y-6">
            <p className="text-brand-gray-medium text-sm">
              Bereken de ROI van een vitaliteitsprogramma voor jouw organisatie
            </p>
            
            {/* Contactgegevens */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-brand-gray-dark">Contactgegevens</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="naam" className="text-brand-gray-dark">
                    Naam *
                  </Label>
                  <Input
                    id="naam"
                    type="text"
                    value={formData.naam}
                    onChange={handleInputChange('naam')}
                    placeholder="Je volledige naam"
                    className="mt-1 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-brand-gray-dark">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    placeholder="je.email@bedrijf.nl"
                    className="mt-1 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <Label htmlFor="functie" className="text-brand-gray-dark">
                    Functie *
                  </Label>
                  <Input
                    id="functie"
                    type="text"
                    value={formData.functie}
                    onChange={handleInputChange('functie')}
                    placeholder="Bijv. HR Manager"
                    className="mt-1 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <Label htmlFor="bedrijfsnaam" className="text-brand-gray-dark">
                    Bedrijfsnaam *
                  </Label>
                  <Input
                    id="bedrijfsnaam"
                    type="text"
                    value={formData.bedrijfsnaam}
                    onChange={handleInputChange('bedrijfsnaam')}
                    placeholder="Naam van je organisatie"
                    className="mt-1 placeholder:text-gray-400"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="telefoon" className="text-brand-gray-dark">
                    Telefoon (optioneel)
                  </Label>
                  <Input
                    id="telefoon"
                    type="tel"
                    value={formData.telefoon}
                    onChange={handleInputChange('telefoon')}
                    placeholder="06 12345678"
                    className="mt-1 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Bedrijfsgegevens */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-brand-gray-dark">Bedrijfsgegevens</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="aantalWerknemers" className="text-brand-gray-dark">
                    Aantal werknemers *
                  </Label>
                  <Input
                    id="aantalWerknemers"
                    type="number"
                    value={formData.aantalWerknemers}
                    onChange={handleInputChange('aantalWerknemers')}
                    placeholder="Bijv. 100"
                    min="1"
                    className="mt-1 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <Label htmlFor="gemiddeldSalaris" className="text-brand-gray-dark">
                    Gemiddeld jaarsalaris (€) *
                  </Label>
                  <Input
                    id="gemiddeldSalaris"
                    type="number"
                    value={formData.gemiddeldSalaris}
                    onChange={handleInputChange('gemiddeldSalaris')}
                    placeholder="Bijv. 45000"
                    min="1"
                    className="mt-1 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <Label htmlFor="verzuimpercentage" className="text-brand-gray-dark">
                    Huidig verzuimpercentage (%) *
                  </Label>
                  <Input
                    id="verzuimpercentage"
                    type="number"
                    value={formData.verzuimpercentage}
                    onChange={handleInputChange('verzuimpercentage')}
                    placeholder="Bijv. 5.5"
                    min="0"
                    max="100"
                    step="0.1"
                    className="mt-1 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <Label htmlFor="sector" className="text-brand-gray-dark">
                    Sector *
                  </Label>
                  <Select value={formData.sector} onValueChange={handleSectorChange}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecteer sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zorg">Zorg</SelectItem>
                      <SelectItem value="financiele-diensten">Financiële diensten</SelectItem>
                      <SelectItem value="it-tech">IT & Tech</SelectItem>
                      <SelectItem value="onderwijs">Onderwijs</SelectItem>
                      <SelectItem value="overheid">Overheid</SelectItem>
                      <SelectItem value="productie-industrie">Productie & Industrie</SelectItem>
                      <SelectItem value="zakelijke-dienstverlening">Zakelijke dienstverlening</SelectItem>
                      <SelectItem value="anders">Anders</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button
              onClick={handleCalculate}
              disabled={!isFormValid || isSubmitting}
              className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white"
            >
              {isSubmitting ? 'Berekenen...' : 'Bereken besparingen'}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Bedrijfsgegevens samenvatting */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-brand-gray-dark mb-2">Jouw organisatie</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="text-brand-gray-medium">Werknemers:</span>
                  <span className="ml-2 font-medium text-brand-gray-dark">{formData.aantalWerknemers}</span>
                </div>
                <div>
                  <span className="text-brand-gray-medium">Gem. salaris:</span>
                  <span className="ml-2 font-medium text-brand-gray-dark">{formatCurrency(parseInt(formData.gemiddeldSalaris))}</span>
                </div>
                <div>
                  <span className="text-brand-gray-medium">Verzuim:</span>
                  <span className="ml-2 font-medium text-brand-gray-dark">{formData.verzuimpercentage}%</span>
                </div>
              </div>
            </div>

            {calculationResults && (
              <div className="space-y-4">
                {/* Conservative Scenario */}
                <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500">
                  <h4 className="text-lg font-bold text-brand-gray-dark mb-1">
                    Conservative Scenario
                  </h4>
                  <p className="text-sm text-brand-gray-medium mb-4">
                    15% verzuimreductie met minimale effecten
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-brand-gray-medium">Verzuimbesparing:</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(calculationResults.scenarios.conservative.verzuimBesparing)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-gray-medium">Uitvalreductie (70%):</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(calculationResults.scenarios.conservative.uitvalReductie)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-gray-medium">Productiviteitswinst (6%):</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(calculationResults.scenarios.conservative.productiviteitBesparing)}
                      </span>
                    </div>
                    <div className="border-t border-gray-300 my-2"></div>
                    <div className="flex justify-between">
                      <span className="text-brand-gray-dark font-medium">Totale besparing:</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(calculationResults.scenarios.conservative.totaleBesparing)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-gray-medium">Investering:</span>
                      <span className="font-semibold text-red-600">
                        -{formatCurrency(calculationResults.investment)}
                      </span>
                    </div>
                    <div className="border-t border-gray-300 my-2"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-brand-gray-dark font-bold">Netto winst:</span>
                      <span className="text-2xl font-bold text-green-600">
                        {formatCurrency(calculationResults.scenarios.conservative.netBesparing)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-brand-gray-dark font-bold">ROI:</span>
                      <span className="text-xl font-semibold text-blue-600">
                        {calculationResults.scenarios.conservative.roi}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Positive Scenario */}
                <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-green-500">
                  <h4 className="text-lg font-bold text-brand-gray-dark mb-1">
                    Positive Scenario
                  </h4>
                  <p className="text-sm text-brand-gray-medium mb-4">
                    21% verzuimreductie met volledige effecten
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-brand-gray-medium">Verzuimbesparing:</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(calculationResults.scenarios.positive.verzuimBesparing)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-gray-medium">Uitvalreductie (70%):</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(calculationResults.scenarios.positive.uitvalReductie)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-gray-medium">Productiviteitswinst (6%):</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(calculationResults.scenarios.positive.productiviteitBesparing)}
                      </span>
                    </div>
                    <div className="border-t border-gray-300 my-2"></div>
                    <div className="flex justify-between">
                      <span className="text-brand-gray-dark font-medium">Totale besparing:</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(calculationResults.scenarios.positive.totaleBesparing)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-gray-medium">Investering:</span>
                      <span className="font-semibold text-red-600">
                        -{formatCurrency(calculationResults.investment)}
                      </span>
                    </div>
                    <div className="border-t border-gray-300 my-2"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-brand-gray-dark font-bold">Netto winst:</span>
                      <span className="text-2xl font-bold text-green-600">
                        {formatCurrency(calculationResults.scenarios.positive.netBesparing)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-brand-gray-dark font-bold">ROI:</span>
                      <span className="text-xl font-semibold text-blue-600">
                        {calculationResults.scenarios.positive.roi}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Wetenschappelijke onderbouwing */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-brand-gray-dark mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Wetenschappelijk bewezen effecten
              </h4>
              <ul className="text-sm text-brand-gray-medium space-y-1 ml-7">
                <li>• 15-21% verzuimreductie (Oxford/UMass onderzoek)</li>
                <li>• 70% minder kans op uitval door langdurig verzuim</li>
                <li>• 6% productiviteitsverbetering per werknemer</li>
              </ul>
            </div>

            {/* CTA */}
            <div className="text-center space-y-4 pt-4">
              <p className="text-lg font-semibold text-brand-gray-dark">
                Wil je deze winst realiseren?
              </p>
              <Button
                onClick={handleMeetBas}
                className="bg-[#FF6B35] hover:bg-[#FF5722] text-white px-8 py-6 text-lg font-semibold"
              >
                Kennismaken met Bas
                <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadMagnetModal;
