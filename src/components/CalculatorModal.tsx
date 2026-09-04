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
import { isGeldigEmail } from '@/lib/email';
import { naarDecimaal, naarGeheel } from '@/lib/getallen';
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
    aantalWerknemers: '',
    brutoJaarsalaris: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  // Zie ROICalculator: pas rood na het verlaten van het veld.
  const [emailAangeraakt, setEmailAangeraakt] = useState(false);
  // De rode regel onder de knop stond er meteen bij het openen, dus voordat de
  // bezoeker iets had kunnen invullen. Dat leest als een standje voor iets wat
  // je nog niet gedaan hebt. Nu pas na een poging tot verzenden.
  const [pogingGedaan, setPogingGedaan] = useState(false);

  const isEN = i18n.language?.startsWith('en');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const emailOngeldig = formData.email.trim() !== '' && !isGeldigEmail(formData.email);

  /** Zie ROICalculator: netjes zetten bij het verlaten, niet tijdens het tikken. */
  const netjesZetten = (veld: 'brutoJaarsalaris' | 'aantalWerknemers') => () => {
    const getal = naarGeheel(formData[veld]);
    if (getal !== null) {
      handleInputChange(veld, getal.toLocaleString(isEN ? 'en-GB' : 'nl-NL'));
    }
  };

  const isFormValid = () => {
    return (
      formData.naam.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.bedrijfsnaam.trim() !== '' &&
      naarDecimaal(formData.verzuimPercentage) !== null &&
      naarGeheel(formData.aantalWerknemers) !== null &&
      naarGeheel(formData.brutoJaarsalaris) !== null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPogingGedaan(true);

    // Zonder werkend adres is deze lead onbereikbaar. Zie ROICalculator.
    if (!isGeldigEmail(formData.email)) {
      setEmailAangeraakt(true);
      toast({
        title: t('validation.email'),
        variant: "destructive",
      });
      document.getElementById('modal-email')?.focus();
      return;
    }

    if (!isFormValid()) {
      toast({
        title: t('validation.title'),
        description: t('validation.description'),
        variant: "destructive",
      });
      return;
    }

    const results = calculateROI({
      currentAbsenteeism: naarDecimaal(formData.verzuimPercentage)!,
      numberOfEmployees: naarGeheel(formData.aantalWerknemers)!,
      avgGrossAnnualSalary: naarGeheel(formData.brutoJaarsalaris)!,
    });

    setIsSubmitting(true);

    /**
     * De aanvraag versturen, maar er niet van afhangen.
     *
     * De functie weigert met opzet in drie gevallen: ongeldige invoer, meer dan
     * drie aanvragen per adres per uur, en twee keer hetzelfde adres binnen vijf
     * minuten. Daar loopt een gewone bezoeker tegenaan zodra hij zijn cijfers
     * bijstelt en nog eens rekent. Een koude start van de functie kan er ook
     * uit klappen.
     *
     * De berekening komt uit de browser en is op dit punt al klaar. Die
     * achterhouden omdat een limiet aan onze kant aanslaat, straft de bezoeker
     * voor iets waar hij part noch deel aan heeft. Dus: altijd doorsturen.
     *
     * Wat er wel van afhangt: de zin dat de mail onderweg is, en de
     * conversiemelding. Een geweigerde aanvraag is geen nieuwe lead.
     */
    let mailVerstuurd = false;
    try {
      const { error } = await supabase.functions.invoke('submit-calculator', {
        body: {
          name: formData.naam,
          email: formData.email,
          company: formData.bedrijfsnaam,
          phone: formData.telefoon || '',
          currentAbsenteeism: naarDecimaal(formData.verzuimPercentage)!,
          numberOfEmployees: naarGeheel(formData.aantalWerknemers)!,
          avgGrossAnnualSalary: naarGeheel(formData.brutoJaarsalaris)!,
          // Zie ROICalculator: deze twee staan op nul zolang de oude Edge
          // Function nog draait.
          employeeTurnover: 0,
          results: {
            ...results,
            scenarios: {
              conservative: { ...results.scenarios.conservative, retentieBesparing: 0 },
              positive: { ...results.scenarios.positive, retentieBesparing: 0 },
            },
          },
          language: isEN ? 'en' : 'nl',
        },
      });
      if (error) throw error;
      mailVerstuurd = true;
    } catch (error) {
      console.error('Error submitting calculator:', error);
    }

    const doelgroep = doelgroepVoorPad(location.pathname);
    bewaarRoiOverdracht({
      id: nieuweId(),
      doelgroep,
      resultaten: results,
      invoer: {
        aantalWerknemers: formData.aantalWerknemers,
        brutoJaarsalaris: formData.brutoJaarsalaris,
        verzuimPercentage: formData.verzuimPercentage,
      },
      emailHash: await hashEmail(formData.email),
      mailVerstuurd,
    });

    // Eerst sluiten, dan navigeren. Een dialog die tijdens het wisselen van
    // pagina open blijft staan laat de scroll-vergrendeling op body achter.
    onClose();
    navigate(roiBedanktPad(doelgroep, detectLanguageFromPath(location.pathname)));
  };

  const handleClose = () => {
    if (!isSubmitting) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl sm:max-h-[90vh] overflow-y-auto bg-white">
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
                    name="naam"
                    autoComplete="name"
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
                    name="email"
                    autoComplete="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => setEmailAangeraakt(true)}
                    aria-invalid={emailAangeraakt && emailOngeldig}
                    aria-describedby={emailAangeraakt && emailOngeldig ? 'modal-email-fout' : undefined}
                    className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                    placeholder={t('fields.emailPlaceholder')}
                    required
                  />
                  {emailAangeraakt && emailOngeldig && (
                    <p id="modal-email-fout" className="text-base font-medium text-red-600">
                      {t('validation.email')}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modal-bedrijfsnaam" className="text-brand-gray-dark font-medium">
                    {t('fields.company')}*
                  </Label>
                  <Input
                    id="modal-bedrijfsnaam"
                    name="bedrijfsnaam"
                    autoComplete="organization"
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
                    name="telefoon"
                    autoComplete="tel"
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
                    name="verzuimPercentage"
                    autoComplete="off"
                    type="text"
                    inputMode="decimal"
                    value={formData.verzuimPercentage}
                    onChange={(e) => handleInputChange('verzuimPercentage', e.target.value)}
                    className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                    placeholder={t('fields.absenteeismPlaceholder')}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modal-werknemers" className="text-brand-gray-dark font-medium">
                    {t('fields.employees')}*
                  </Label>
                  <Input
                    id="modal-werknemers"
                    name="aantalWerknemers"
                    autoComplete="off"
                    type="text"
                    inputMode="numeric"
                    value={formData.aantalWerknemers}
                    onChange={(e) => handleInputChange('aantalWerknemers', e.target.value)}
                    onBlur={netjesZetten('aantalWerknemers')}
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
                    name="brutoJaarsalaris"
                    autoComplete="off"
                    type="text"
                    inputMode="numeric"
                    value={formData.brutoJaarsalaris}
                    onChange={(e) => handleInputChange('brutoJaarsalaris', e.target.value)}
                    onBlur={netjesZetten('brutoJaarsalaris')}
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
              {pogingGedaan && !isFormValid() && (
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
