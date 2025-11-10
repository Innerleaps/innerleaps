import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  naam: string;
  email: string;
  telefoon: string;
  bedrijfsnaam: string;
  functie: string;
}

const LeadMagnetModal = ({ isOpen, onClose }: LeadMagnetModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    naam: '',
    email: '',
    telefoon: '',
    bedrijfsnaam: '',
    functie: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const isFormValid = 
    formData.naam && 
    formData.email && 
    formData.bedrijfsnaam && 
    formData.functie;

  const handleSubmit = async () => {
    if (!isFormValid) {
      toast({ 
        title: "Vul alle verplichte velden in", 
        variant: "destructive" 
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('submit-scientific-report', {
        body: {
          name: formData.naam,
          email: formData.email,
          phone: formData.telefoon || null,
          company: formData.bedrijfsnaam,
          functie: formData.functie,
        }
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Rapport aangevraagd!",
        description: "Je ontvangt het wetenschappelijk rapport binnen enkele minuten per email.",
      });

      // Auto-close after 2 seconds
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error('Submit error:', error);
      toast({
        title: "Er ging iets mis",
        description: "Probeer het later opnieuw of neem contact op.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setIsSubmitted(false);
      setFormData({
        naam: '',
        email: '',
        telefoon: '',
        bedrijfsnaam: '',
        functie: ''
      });
      onClose();
    }
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-brand-gray-dark mb-2">
              Bedankt voor je aanvraag!
            </h3>
            <p className="text-brand-gray-medium">
              Je ontvangt het wetenschappelijk rapport binnen enkele minuten op <strong>{formData.email}</strong>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-brand-gray-dark">
            Vraag het Wetenschappelijk Rapport aan
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-brand-gray-medium text-sm">
            Ontvang ons uitgebreide academische rapport met 40 jaar onderzoeksresultaten, effectgroottes en ROI analyses.
          </p>
          
          <div className="space-y-4">
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
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white"
          >
            {isSubmitting ? 'Versturen...' : 'Vraag rapport aan'}
          </Button>

          <p className="text-xs text-brand-gray-medium text-center">
            Je ontvangt het rapport direct per email. We behandelen je gegevens vertrouwelijk.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadMagnetModal;
