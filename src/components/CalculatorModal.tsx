
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calculator as CalculatorIcon, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalculatorModal = ({
  isOpen,
  onClose
}: CalculatorModalProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    functie: '',
    company: '',
    employees: '',
    avgEmployeeCosts: '',
    currentAbsenteeism: '',
    currentTurnover: ''
  });
  const [dataConfirmed, setDataConfirmed] = useState(false);

  const calculateSavings = async () => {
    setIsSubmitting(true);
    
    try {
      const AD = parseInt(formData.employees) || 0; // Aantal deelnemers
      const GWS = parseInt(formData.avgEmployeeCosts) || 0; // Gemiddelde werkgeverskosten per deelnemer per jaar
      const HZ = parseFloat(formData.currentAbsenteeism) || 0; // Huidig verzuimpercentage
      const HV = parseFloat(formData.currentTurnover) || 0; // Huidig verlooppercentage

      // Constanten
      const VK = 2; // Verzuimkosten multiplier (Johns, 2010)
      const MV = 0.24; // 24% minder verzuim door MBSR (gemiddelde 19-29% uit verschillende onderzoeken)
      const RV = 0.24; // 24% retentieverbetering door MBSR (gemiddelde 17-31% uit verschillende onderzoeken)
      const VKP = 1.5; // Vervangingskosten personeel (O'Connell & Kung, 2007)
      const G = 15; // Aantal deelnemers per groep
      const I = 8625; // Indicatieve investering per groep

      // Berekeningen volgens de juiste formules
      const verzuimBesparing = (HZ / 100) * AD * GWS * VK * MV;
      const retentieBesparing = (HV / 100) * AD * GWS * RV * VKP;
      const totaleBesparing = verzuimBesparing + retentieBesparing;
      
      const numberOfGroups = Math.ceil(AD / G);
      const totalInvestment = numberOfGroups * I;
      const netBesparing = totaleBesparing - totalInvestment;
      
      // ROI berekening - GECORRIGEERD: gebruik totale besparing, niet netto besparing
      const roi = totalInvestment > 0 ? (totaleBesparing / totalInvestment) * 100 : 0;

      const results = {
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

      // Submit to database and send email
      const { data, error } = await supabase.functions.invoke('submit-calculator', {
        body: {
          name: formData.name,
          phone: formData.phone,
          functie: formData.functie,
          company: formData.company,
          employees: parseInt(formData.employees),
          avgEmployeeCosts: parseInt(formData.avgEmployeeCosts),
          currentAbsenteeism: parseFloat(formData.currentAbsenteeism),
          currentTurnover: parseFloat(formData.currentTurnover),
          calculationResults: results
        }
      });

      if (error) {
        console.error('Submission error:', error);
        toast({
          title: "Fout bij opslaan",
          description: "Er is een fout opgetreden bij het opslaan van uw gegevens. Probeer het opnieuw.",
          variant: "destructive",
        });
        return;
      }

      console.log('Successfully submitted:', data);
      
      toast({
        title: "Gegevens opgeslagen",
        description: "Uw berekening is succesvol opgeslagen en verstuurd.",
      });

      // Navigate to berekening page with results
      navigate('/berekening', {
        state: {
          results: results,
          formData: formData
        }
      });

      // Close the modal
      onClose();

    } catch (error) {
      console.error('Error calculating savings:', error);
      toast({
        title: "Fout opgetreden",
        description: "Er is een onverwachte fout opgetreden. Probeer het opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetCalculator = () => {
    setFormData({
      name: '',
      phone: '',
      functie: '',
      company: '',
      employees: '',
      avgEmployeeCosts: '',
      currentAbsenteeism: '',
      currentTurnover: ''
    });
    setDataConfirmed(false);
  };

  const handleClose = () => {
    resetCalculator();
    onClose();
  };

  const isFormValid = formData.name && formData.functie && formData.company && formData.employees && formData.avgEmployeeCosts && formData.currentAbsenteeism && formData.currentTurnover && dataConfirmed;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Bereken Uw Potentiële Besparing</DialogTitle>
        </DialogHeader>

        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue text-white rounded-full mb-4">
              <CalculatorIcon className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-brand-gray-dark mb-2">
              Bereken Uw Potentiële Besparing
            </h3>
            <p className="text-brand-gray-medium">
              Vul uw gegevens in voor een persoonlijke berekening van de ROI
            </p>
          </div>

          <div className="space-y-8">
            {/* Persoonsinformatie section */}
            <div>
              <h4 className="text-lg font-semibold text-brand-gray-dark mb-4">Persoonsinformatie:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-brand-gray-dark font-medium">Naam *</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    value={formData.name} 
                    onChange={e => handleInputChange('name', e.target.value)} 
                    className="mt-1" 
                    placeholder={!formData.name ? "Jan Janssen" : ""} 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-brand-gray-dark font-medium">Telefoonnummer</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={formData.phone} 
                    onChange={e => handleInputChange('phone', e.target.value)} 
                    className="mt-1" 
                    placeholder={!formData.phone ? "06 12345678" : ""} 
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="functie" className="text-brand-gray-dark font-medium">Functie *</Label>
                  <Input 
                    id="functie" 
                    type="text" 
                    value={formData.functie} 
                    onChange={e => handleInputChange('functie', e.target.value)} 
                    className="mt-1" 
                    placeholder={!formData.functie ? "HR Manager" : ""} 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* Bedrijfsgegevens section */}
            <div>
              <h4 className="text-lg font-semibold text-brand-gray-dark mb-4">Bedrijfsgegevens:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company" className="text-brand-gray-dark font-medium">Bedrijfsnaam *</Label>
                  <Input 
                    id="company" 
                    type="text" 
                    value={formData.company} 
                    onChange={e => handleInputChange('company', e.target.value)} 
                    className="mt-1" 
                    placeholder={!formData.company ? "Uw Bedrijf B.V." : ""} 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <Label htmlFor="employees" className="text-brand-gray-dark font-medium">Aantal medewerkers *</Label>
                  <Input 
                    id="employees" 
                    type="number" 
                    value={formData.employees} 
                    onChange={e => handleInputChange('employees', e.target.value)} 
                    className="mt-1" 
                    placeholder={!formData.employees ? "50" : ""} 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <Label htmlFor="avgEmployeeCosts" className="text-brand-gray-dark font-medium">Gemiddelde werkgeverskosten per medewerker per jaar (€) *</Label>
                  <Input 
                    id="avgEmployeeCosts" 
                    type="number" 
                    value={formData.avgEmployeeCosts} 
                    onChange={e => handleInputChange('avgEmployeeCosts', e.target.value)} 
                    className="mt-1" 
                    placeholder={!formData.avgEmployeeCosts ? "50000" : ""} 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <Label htmlFor="currentAbsenteeism" className="text-brand-gray-dark font-medium">Huidig verzuimpercentage (%) *</Label>
                  <Input 
                    id="currentAbsenteeism" 
                    type="number" 
                    step="0.1" 
                    value={formData.currentAbsenteeism} 
                    onChange={e => handleInputChange('currentAbsenteeism', e.target.value)} 
                    className="mt-1" 
                    placeholder={!formData.currentAbsenteeism ? "4.2" : ""} 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <Label htmlFor="currentTurnover" className="text-brand-gray-dark font-medium">Huidig verlooppercentage (%) *</Label>
                  <Input 
                    id="currentTurnover" 
                    type="number" 
                    step="0.1" 
                    value={formData.currentTurnover} 
                    onChange={e => handleInputChange('currentTurnover', e.target.value)} 
                    className="mt-1" 
                    placeholder={!formData.currentTurnover ? "12.5" : ""} 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* Data confirmation checkbox */}
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="dataConfirmed" 
                checked={dataConfirmed} 
                onCheckedChange={checked => setDataConfirmed(checked === true)} 
                className="border-2 border-brand-blue data-[state=checked]:bg-brand-green data-[state=checked]:border-brand-green" 
                disabled={isSubmitting}
              />
              <Label htmlFor="dataConfirmed" className="text-sm text-brand-gray-dark leading-relaxed">
                Ik bevestig dat ik akkoord ga met het delen van deze gegevens en wil mijn potentiële besparing berekenen
              </Label>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={calculateSavings} 
                disabled={!isFormValid || isSubmitting} 
                className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Berekening wordt opgeslagen...
                  </>
                ) : (
                  'Ontvang Mijn Besparing'
                )}
              </Button>
            </div>
          </div>
          
          <div className="mt-6 text-xs text-brand-gray-medium">
            * Verplichte velden. Uw gegevens worden vertrouwelijk behandeld conform onze privacyverklaring.
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default CalculatorModal;
