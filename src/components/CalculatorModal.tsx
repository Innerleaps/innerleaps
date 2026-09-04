import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { detectLanguageFromPath } from '@/i18n/config';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { calculateROI } from '@/utils/calculationEngine';
import {
  bewaarRoiOverdracht,
  doelgroepVoorPad,
  hashEmail,
  nieuweId,
  roiBedanktPad,
} from '@/lib/bedankt';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * De rekentool als pop-up, voor de knoppen in de hero, de navigatie, de
 * procesbalk en de zwevende knop onderaan.
 *
 * De uitkomst werd hier eerst in dezelfde pop-up getoond. Dat leverde geen URL
 * op, en dus geen page_view, geen terugknop en niets waar Google Ads een
 * conversie aan kan hangen. Nu sluit de pop-up en gaat de bezoeker naar een
 * echte bedanktpagina, per doelgroep een eigen adres.
 */
const CalculatorModal = ({ isOpen, onClose }: CalculatorModalProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('calculator');
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEN = i18n.language?.startsWith('en');

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
        title: t('validation.title'),
        description: t('validation.description'),
        variant: "destructive",
      });
      return;
    }

    const results = calculateROI({
      currentAbsenteeism: parseFloat(formData.verzuimPercentage),
      employeeTurnover: parseFloat(formData.verloopPercentage),
      numberOfEmployees: parseInt(formData.aantalWerknemers),
      avgGrossAnnualSalary: parseInt(formData.brutoJaarsalaris),
    });

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
          language: isEN ? 'en' : 'nl',
        },
      });

      if (error) throw error;

      // De doelgroep hangt aan de pagina waar de pop-up geopend is, niet aan de
      // pop-up zelf. Vanaf de homepage of de navigatie weet je niet wie er zit,
      // en dan is "onbekend" het eerlijke antwoord.
      const doelgroep = doelgroepVoorPad(location.pathname);
      bewaarRoiOverdracht({
        id: nieuweId(),
        doelgroep,
        resultaten: results,
        invoer: {
          aantalWerknemers: formData.aantalWerknemers,
          brutoJaarsalaris: formData.brutoJaarsalaris,
          verzuimPercentage: formData.verzuimPercentage,
          verloopPercentage: formData.verloopPercentage,
        },
        emailHash: await hashEmail(formData.email),
      });

      // Eerst sluiten, dan navigeren. Een dialog die tijdens het wisselen van
      // pagina open blijft staan laat de scroll-vergrendeling op body achter.
      onClose();
      navigate(roiBedanktPad(doelgroep, detectLanguageFromPath(location.pathname)));
    } catch (error) {
      console.error('Error submitting calculator:', error);
      toast({
        title: t('error.title'),
        description: t('error.description'),
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <div className="text-center">
            <div className="inline-flex items-center bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full text-base font-medium mb-6">
              <Calculator className="h-4 w-4 mr-2" />
              {t('badge')}
            </div>

            <DialogTitle className="text-3xl font-bold mb-6 text-brand-gray-dark">
              {t('title')}
            </DialogTitle>

            <p className="text-xl leading-relaxed mb-8 text-brand-gray-medium">
              {t('subtitle')}
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Contact details */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-brand-gray-dark mb-4">{t('sections.contact')}</h3>

                <div className="space-y-2">
                  <Label htmlFor="modal-naam" className="text-brand-gray-dark font-medium">
                    {t('fields.name')}*
                  </Label>
                  <Input
                    id="modal-naam"
                    type="text"
                    value={formData.naam}
                    onChange={(e) => handleInputChange('naam', e.target.value)}
                    className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                    placeholder={t('fields.namePlaceholder')}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modal-email" className="text-brand-gray-dark font-medium">
                    {t('fields.email')}*
                  </Label>
                  <Input
                    id="modal-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                    placeholder={t('fields.emailPlaceholder')}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modal-bedrijfsnaam" className="text-brand-gray-dark font-medium">
                    {t('fields.company')}*
                  </Label>
                  <Input
                    id="modal-bedrijfsnaam"
                    type="text"
                    value={formData.bedrijfsnaam}
                    onChange={(e) => handleInputChange('bedrijfsnaam', e.target.value)}
                    className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                    placeholder={t('fields.companyPlaceholder')}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modal-telefoon" className="text-brand-gray-dark font-medium">
                    {t('fields.phone')}
                  </Label>
                  <Input
                    id="modal-telefoon"
                    type="tel"
                    value={formData.telefoon}
                    onChange={(e) => handleInputChange('telefoon', e.target.value)}
                    className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                    placeholder={t('fields.phonePlaceholder')}
                  />
                </div>
              </div>

              {/* Right Column - Calculation inputs */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-brand-gray-dark mb-4">{t('sections.organisation')}</h3>

                <div className="space-y-2">
                  <Label htmlFor="modal-verzuim" className="text-brand-gray-dark font-medium">
                    {t('fields.absenteeism')}*
                  </Label>
                  <Input
                    id="modal-verzuim"
                    type="number"
                    step="0.1"
                    value={formData.verzuimPercentage}
                    onChange={(e) => handleInputChange('verzuimPercentage', e.target.value)}
                    className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                    placeholder={t('fields.absenteeismPlaceholder')}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modal-verloop" className="text-brand-gray-dark font-medium">
                    {t('fields.turnover')}*
                  </Label>
                  <Input
                    id="modal-verloop"
                    type="number"
                    step="0.1"
                    value={formData.verloopPercentage}
                    onChange={(e) => handleInputChange('verloopPercentage', e.target.value)}
                    className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                    placeholder={t('fields.turnoverPlaceholder')}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modal-werknemers" className="text-brand-gray-dark font-medium">
                    {t('fields.employees')}*
                  </Label>
                  <Input
                    id="modal-werknemers"
                    type="number"
                    value={formData.aantalWerknemers}
                    onChange={(e) => handleInputChange('aantalWerknemers', e.target.value)}
                    className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                    placeholder={t('fields.employeesPlaceholder')}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modal-salaris" className="text-brand-gray-dark font-medium">
                    {t('fields.salary')}*
                  </Label>
                  <Input
                    id="modal-salaris"
                    type="number"
                    value={formData.brutoJaarsalaris}
                    onChange={(e) => handleInputChange('brutoJaarsalaris', e.target.value)}
                    className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                    placeholder={t('fields.salaryPlaceholder')}
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
                  {isSubmitting ? t('submit.loading') : t('submit.idle')}
                </Button>
              </div>
              {!isFormValid() && (
                <p className="text-base text-red-600 mt-2">{t('validation.missing')}</p>
              )}
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalculatorModal;
