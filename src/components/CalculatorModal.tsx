import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
    aantalDeelnemers: '15',
    brutoJaarsalaris: '39700'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const calculateROI = () => {
    const deelnemers = parseInt(formData.aantalDeelnemers);
    const salaris = parseFloat(formData.brutoJaarsalaris);
    const verzuimPerc = parseFloat(formData.verzuimPercentage) / 100;

    // Stap 1: Totale Loonkosten
    const totaleLoonkosten = deelnemers * salaris;

    // Stap 2: Verzuimkosten (185% factor volgens Sazas, 2024)
    const verzuimkosten = totaleLoonkosten * verzuimPerc * 1.85;

    // Stap 3: Programmakosten
    const aantalGroepen = Math.ceil(deelnemers / 15);
    const programmakosten = aantalGroepen * 5925;

    // Stap 4: Verzuimbesparing
    const minVerzuimbesparing = verzuimkosten * 0.15;
    const maxVerzuimbesparing = verzuimkosten * 0.21;

    // Stap 5: Terugverdientijd
    const minTerugverdientijd = programmakosten / maxVerzuimbesparing * 12;
    const maxTerugverdientijd = programmakosten / minVerzuimbesparing * 12;

    // Stap 6: ROI Berekening
    const minROI = (minVerzuimbesparing - programmakosten) / programmakosten * 100;
    const maxROI = (maxVerzuimbesparing - programmakosten) / programmakosten * 100;

    return {
      totaleLoonkosten,
      verzuimkosten,
      programmakosten,
      minVerzuimbesparing,
      maxVerzuimbesparing,
      minTerugverdientijd,
      maxTerugverdientijd,
      minROI,
      maxROI,
      showROI: maxROI >= 100
    };
  };

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
      const calculationResults = calculateROI();

      const { error } = await supabase.functions.invoke('send-roi-analysis', {
        body: {
          ...formData,
          calculationResults
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
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="modal-naam" className="text-brand-gray-dark font-medium">
                  Naam*
                </Label>
                <Input
                  id="modal-naam"
                  type="text"
                  value={formData.naam}
                  onChange={(e) => handleInputChange('naam', e.target.value)}
                  className="bg-white border-gray-300 text-brand-gray-dark placeholder-brand-gray-dark/60"
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
                  className="bg-white border-gray-300 text-brand-gray-dark placeholder-brand-gray-dark/60"
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
                  className="bg-white border-gray-300 text-brand-gray-dark placeholder-brand-gray-dark/60"
                  placeholder="Je bedrijfsnaam"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
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