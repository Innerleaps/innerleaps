import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  naam: string;
  bedrijfsnaam: string;
  email: string;
}

const LeadMagnetModal = ({ isOpen, onClose }: LeadMagnetModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    naam: '',
    bedrijfsnaam: '',
    email: ''
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

  const isFormValid = formData.naam && formData.bedrijfsnaam && formData.email;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setIsSubmitting(true);
    
    try {
      // Here you would typically submit to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      toast({
        title: "Aanvraag verzonden!",
        description: "U ontvangt het wetenschappelijke bewijs binnen 24 uur op uw emailadres.",
      });
      
      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          naam: '',
          bedrijfsnaam: '',
          email: ''
        });
        onClose();
      }, 3000);
      
    } catch (error) {
      toast({
        title: "Er is iets misgegaan",
        description: "Probeer het later opnieuw of neem contact met ons op.",
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
        bedrijfsnaam: '',
        email: ''
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-brand-gray-dark">
            Wetenschappelijk bewijs aanvragen
          </DialogTitle>
        </DialogHeader>
        
        {!isSubmitted ? (
          <div className="space-y-4">
            <p className="text-brand-gray-medium text-sm">
              Vul uw gegevens in om het volledige academische onderzoeksrapport te ontvangen.
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
                  placeholder="Uw volledige naam"
                  className="mt-1"
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
                  placeholder="Naam van uw organisatie"
                  className="mt-1"
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
                  placeholder="uw.email@bedrijf.nl"
                  className="mt-1"
                />
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white"
            >
              {isSubmitting ? 'Verzenden...' : 'Vraag het bewijs op'}
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="mx-auto h-12 w-12 text-brand-green mb-4" />
            <h3 className="text-lg font-semibold text-brand-gray-dark mb-2">
              Bedankt voor uw aanvraag!
            </h3>
            <p className="text-brand-gray-medium">
              U ontvangt het wetenschappelijke bewijs binnen 24 uur op uw emailadres.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadMagnetModal;