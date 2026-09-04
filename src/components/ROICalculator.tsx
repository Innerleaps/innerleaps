import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { detectLanguageFromPath } from '@/i18n/config';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { calculateROI } from '@/utils/calculationEngine';
import {
  bewaarRoiOverdracht,
  doelgroepVoorPad,
  hashEmail,
  nieuweId,
  roiBedanktPad,
} from '@/lib/bedankt';

/**
 * De rekentool als blok op de pagina.
 *
 * De uitkomst stond hier eerst in hetzelfde blok, door de invoer te vervangen.
 * Dat werkte voor de bezoeker, maar er kwam geen URL aan te pas en dus was er
 * niets te meten. Nu gaat de bezoeker naar een echte bedanktpagina, per
 * doelgroep een eigen adres. Zie src/lib/bedankt.ts.
 */
const ROICalculator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('calculator');
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isEN = i18n.language?.startsWith('en');
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

      /**
       * Pas doorsturen als de mail eruit is. Op de bedanktpagina staat dat de
       * berekening ook per mail is verstuurd, en dat mag geen loze belofte zijn.
       * Gaat het mis, dan blijft de bezoeker hier staan met zijn ingevulde
       * formulier en een foutmelding, in plaats van op een pagina die iets
       * belooft wat niet gebeurd is.
       */
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

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="bg-brand-blue rounded-xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <Calculator className="h-8 w-8 text-brand-orange" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {t('header.title')}
            </h2>
            <p className="text-white/90">
              {t('header.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column - Contact details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">{t('sections.contact')}</h3>

              <div>
                <Label htmlFor="naam" className="text-white font-medium">
                  {t('fields.name')} *
                </Label>
                <Input
                  id="naam"
                  type="text"
                  value={formData.naam}
                  onChange={(e) => handleInputChange('naam', e.target.value)}
                  placeholder={t('fields.namePlaceholder')}
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white font-medium">
                  {t('fields.email')} *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={t('fields.emailPlaceholder')}
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="bedrijfsnaam" className="text-white font-medium">
                  {t('fields.company')} *
                </Label>
                <Input
                  id="bedrijfsnaam"
                  type="text"
                  value={formData.bedrijfsnaam}
                  onChange={(e) => handleInputChange('bedrijfsnaam', e.target.value)}
                  placeholder={t('fields.companyPlaceholder')}
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="telefoon" className="text-white font-medium">
                  {t('fields.phone')}
                </Label>
                <Input
                  id="telefoon"
                  type="tel"
                  value={formData.telefoon}
                  onChange={(e) => handleInputChange('telefoon', e.target.value)}
                  placeholder={t('fields.phonePlaceholder')}
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Right column - Calculation inputs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">{t('sections.organisation')}</h3>

              <div>
                <Label htmlFor="verzuimPercentage" className="text-white font-medium">
                  {t('fields.absenteeism')} *
                </Label>
                <Input
                  id="verzuimPercentage"
                  type="number"
                  step="0.1"
                  value={formData.verzuimPercentage}
                  onChange={(e) => handleInputChange('verzuimPercentage', e.target.value)}
                  placeholder={t('fields.absenteeismPlaceholder')}
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="verloopPercentage" className="text-white font-medium">
                  {t('fields.turnover')} *
                </Label>
                <Input
                  id="verloopPercentage"
                  type="number"
                  step="0.1"
                  value={formData.verloopPercentage}
                  onChange={(e) => handleInputChange('verloopPercentage', e.target.value)}
                  placeholder={t('fields.turnoverPlaceholder')}
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="aantalWerknemers" className="text-white font-medium">
                  {t('fields.employees')} *
                </Label>
                <Input
                  id="aantalWerknemers"
                  type="number"
                  value={formData.aantalWerknemers}
                  onChange={(e) => handleInputChange('aantalWerknemers', e.target.value)}
                  placeholder={t('fields.employeesPlaceholder')}
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="brutoJaarsalaris" className="text-white font-medium">
                  {t('fields.salary')} *
                </Label>
                <Input
                  id="brutoJaarsalaris"
                  type="number"
                  value={formData.brutoJaarsalaris}
                  onChange={(e) => handleInputChange('brutoJaarsalaris', e.target.value)}
                  placeholder={t('fields.salaryPlaceholder')}
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid() || isSubmitting}
              className="min-h-[44px] px-8 text-base md:text-lg font-semibold bg-brand-orange hover:bg-brand-orange/90"
            >
              {isSubmitting ? t('submit.loading') : t('submit.idle')}
            </Button>
          </div>

          <div className="mt-6 text-base text-white/80 text-center">
            {t('footnote')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
