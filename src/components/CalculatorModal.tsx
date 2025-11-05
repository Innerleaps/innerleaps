import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { calculateMBSRSavings, type CalculationResults } from '@/utils/calculationEngine';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalculatorModal = ({ isOpen, onClose }: CalculatorModalProps) => {
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    bedrijfsnaam: '',
    verzuimPercentage: '5.2',
    verloopPercentage: '10',
    aantalDeelnemers: '15',
    brutoJaarsalaris: '39700'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.naam || !formData.email || !formData.bedrijfsnaam) {
      toast({
        title: "Velden vereist",
        description: "Vul alle verplichte velden in om jouw ROI-analyse te ontvangen.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const calculationResults: CalculationResults = calculateMBSRSavings({
        employees: parseInt(formData.aantalDeelnemers),
        avgEmployeeCosts: parseFloat(formData.brutoJaarsalaris),
        currentAbsenteeism: parseFloat(formData.verzuimPercentage),
        currentTurnover: parseFloat(formData.verloopPercentage),
      });

      const { error } = await supabase.functions.invoke('send-roi-analysis', {
        body: {
          naam: formData.naam,
          email: formData.email,
          bedrijfsnaam: formData.bedrijfsnaam,
          verzuimPercentage: formData.verzuimPercentage,
          verloopPercentage: formData.verloopPercentage,
          aantalDeelnemers: formData.aantalDeelnemers,
          brutoJaarsalaris: formData.brutoJaarsalaris,
          calculationResults,
        }
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "ROI-analyse verstuurd!",
        description: `Je ontvangt de analyse binnen 1-2 minuten op ${formData.email}`
      });

    } catch (error) {
      console.error('Error sending ROI analysis:', error);
      toast({
        title: "Er ging iets mis",
        description: "Probeer het later opnieuw of neem contact met ons op.",
        variant: "destructive"
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
      naam: '',
      email: '',
      bedrijfsnaam: '',
      verzuimPercentage: '5.2',
      verloopPercentage: '10',
      aantalDeelnemers: '15',
      brutoJaarsalaris: '39700'
    });
    setIsSubmitted(false);
  };

  const handleClose = () => {
    resetCalculator();
    onClose();
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-2xl">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 mx-auto mb-6 text-green-400" />
            <h2 className="text-3xl font-bold mb-4 text-brand-gray-dark">ROI-analyse verstuurd!</h2>
            <p className="text-xl mb-6 text-brand-gray-medium">
              Je ontvangt de gepersonaliseerde ROI-analyse binnen 1-2 minuten op <strong>{formData.email}</strong>
            </p>
            <p className="text-brand-gray-medium mb-8">
              Check ook je spam-folder. Heb je vragen? Neem direct contact op met Bas via bas@innerleaps.nl
            </p>
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  naam: '',
                  email: '',
                  bedrijfsnaam: '',
                  verzuimPercentage: '5.2',
                  verloopPercentage: '10',
                  aantalDeelnemers: '15',
                  brutoJaarsalaris: '39700'
                });
              }}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold"
            >
              Nieuwe berekening maken
            </Button>
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
              Bereken jouw ROI: van investering naar rendement
            </DialogTitle>
            
            <p className="text-xl leading-relaxed mb-8 text-brand-gray-medium">
              Ontvang een gepersonaliseerde ROI-analyse voor het InnerLeaps Life+ programma direct in je mailbox. Gebaseerd op wetenschappelijk onderzoek en jouw specifieke bedrijfssituatie.
            </p>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="modal-naam" className="text-brand-gray-dark font-medium">
                  Naam*
                </Label>
                <Input
                  id="modal-naam"
                  type="text"
                  value={formData.naam}
                  onChange={(e) => handleInputChange('naam', e.target.value)}
                  className="bg-white border-gray-300 text-brand-gray-dark placeholder:!text-[rgb(51,65,85)]"
                  placeholder="Je volledige naam"
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
                  className="bg-white border-gray-300 text-brand-gray-dark placeholder:!text-[rgb(51,65,85)]"
                  placeholder="je.email@bedrijf.nl"
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
                  className="bg-white border-gray-300 text-brand-gray-dark placeholder:!text-[rgb(51,65,85)]"
                  placeholder="Je bedrijfsnaam"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="modal-verzuim" className="text-brand-gray-dark font-medium">
                  Huidig verzuimpercentage
                </Label>
                <Input
                  id="modal-verzuim"
                  type="number"
                  step="0.1"
                  value={formData.verzuimPercentage}
                  onChange={(e) => handleInputChange('verzuimPercentage', e.target.value)}
                  className="bg-white border-gray-300 text-brand-gray-dark placeholder-gray-400"
                  placeholder="5.2"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="modal-verloop" className="text-brand-gray-dark font-medium">
                  Huidig personeelsverloop percentage
                </Label>
                <Input
                  id="modal-verloop"
                  type="number"
                  step="0.1"
                  value={formData.verloopPercentage}
                  onChange={(e) => handleInputChange('verloopPercentage', e.target.value)}
                  className="bg-white border-gray-300 text-brand-gray-dark placeholder-gray-400"
                  placeholder="10"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="modal-deelnemers" className="text-brand-gray-dark font-medium">
                  Aantal InnerLeaps deelnemers
                </Label>
                <Input
                  id="modal-deelnemers"
                  type="number"
                  value={formData.aantalDeelnemers}
                  onChange={(e) => handleInputChange('aantalDeelnemers', e.target.value)}
                  className="bg-white border-gray-300 text-brand-gray-dark placeholder-gray-400"
                  placeholder="15"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="modal-salaris" className="text-brand-gray-dark font-medium">
                  Gemiddelde of mediaan bruto jaarsalaris
                </Label>
                <Input
                  id="modal-salaris"
                  type="number"
                  value={formData.brutoJaarsalaris}
                  onChange={(e) => handleInputChange('brutoJaarsalaris', e.target.value)}
                  className="bg-white border-gray-300 text-brand-gray-dark placeholder-gray-400"
                  placeholder="39700"
                  required
                />
              </div>
            </div>

            <div className="text-center">
              <p className="text-brand-gray-medium mb-6">
                Ontvang jouw gepersonaliseerde ROI-analyse direct per email
              </p>
              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="px-6 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                >
                  Annuleren
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? 'Jouw analyse wordt verstuurd...' : 'Verstuur mijn ROI-analyse'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalculatorModal;