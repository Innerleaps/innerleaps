import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t, i18n } = useTranslation('leadMagnet');
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
        title: t('validation'),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const language = i18n.language?.startsWith('en') ? 'en' : 'nl';
      const { error } = await supabase.functions.invoke('submit-scientific-report', {
        body: {
          name: formData.naam,
          email: formData.email,
          phone: formData.telefoon || null,
          company: formData.bedrijfsnaam,
          functie: formData.functie,
          language,
        }
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: t('success.toastTitle'),
        description: t('success.toastDescription'),
      });

      // Auto-close after 2 seconds
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error('Submit error:', error);
      toast({
        title: t('error.title'),
        description: t('error.description'),
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
        <DialogContent className="sm:max-w-md bg-white">
          <div className="text-center py-6">
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-brand-gray-dark mb-2">
              {t('success.title')}
            </h3>
            <p className="text-brand-gray-medium">
              {t('success.body')} <strong>{formData.email}</strong>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white">
        <div className="bg-brand-blue p-6 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              {t('title')}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <p className="text-white/90 text-sm">
              {t('intro')}
            </p>

            <div className="space-y-4">
              <div>
                <Label htmlFor="naam" className="text-white">
                  {t('fields.name')} *
                </Label>
                <Input
                  id="naam"
                  type="text"
                  value={formData.naam}
                  onChange={handleInputChange('naam')}
                  placeholder={t('fields.namePlaceholder')}
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white">
                  {t('fields.email')} *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  placeholder={t('fields.emailPlaceholder')}
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="telefoon" className="text-white">
                  {t('fields.phone')}
                </Label>
                <Input
                  id="telefoon"
                  type="tel"
                  value={formData.telefoon}
                  onChange={handleInputChange('telefoon')}
                  placeholder={t('fields.phonePlaceholder')}
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="bedrijfsnaam" className="text-white">
                  {t('fields.company')} *
                </Label>
                <Input
                  id="bedrijfsnaam"
                  type="text"
                  value={formData.bedrijfsnaam}
                  onChange={handleInputChange('bedrijfsnaam')}
                  placeholder={t('fields.companyPlaceholder')}
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="functie" className="text-white">
                  {t('fields.role')} *
                </Label>
                <Input
                  id="functie"
                  type="text"
                  value={formData.functie}
                  onChange={handleInputChange('functie')}
                  placeholder={t('fields.rolePlaceholder')}
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white"
            >
              {isSubmitting ? t('submit.loading') : t('submit.idle')}
            </Button>

            <p className="text-xs text-white/80 text-center">
              {t('privacy')}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadMagnetModal;
