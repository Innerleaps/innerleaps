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
import { isGeldigEmail } from '@/lib/email';
import { naarDecimaal, naarGeheel } from '@/lib/getallen';
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
    aantalWerknemers: '',
    brutoJaarsalaris: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  // Pas een fout tonen als iemand het veld verlaten heeft. Meetikken en meteen
  // rood zien terwijl je nog bezig bent is vervelend en klopt ook niet.
  const [emailAangeraakt, setEmailAangeraakt] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isEN = i18n.language?.startsWith('en');
  const emailOngeldig = formData.email.trim() !== '' && !isGeldigEmail(formData.email);

  /**
   * Bij het verlaten van het veld het bedrag netjes zetten, met punten als
   * duizendtalscheiding. Niet tijdens het tikken: dan verspringt de cursor bij
   * elk cijfer dat er een scheiding bij duwt.
   */
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

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    // Het e-mailadres is het enige waarmee we deze bezoeker nog kunnen bereiken.
    // Een typefout betekent geen mail, geen opvolging, en een lead die je wel
    // betaald hebt maar nooit spreekt.
    if (!isGeldigEmail(formData.email)) {
      setEmailAangeraakt(true);
      toast({
        title: t('validation.email'),
        variant: "destructive",
      });
      document.getElementById('email')?.focus();
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
          // De Edge Function die nu draait eist deze twee velden nog. Ze staan
          // hier op nul zodat de site blijft werken tot die functie opnieuw is
          // uitgerold. Zie het commentaar in supabase/functions/submit-calculator.
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

    navigate(roiBedanktPad(doelgroep, detectLanguageFromPath(location.pathname)));
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

          {/* Een echt formulier, geen losse velden in divs.
              De invulhulp van iOS groepeert velden per formulier. Zonder
              formulier moet Safari zelf uitzoeken wat bij elkaar hoort, en dat
              bepaalt naar welk veld hij na een invulling springt en hoe ver hij
              daarvoor scrolt. Met een formulier eromheen staat die volgorde
              vast. Het levert bovendien een "volgende"-toets op het toetsenbord
              op in plaats van een dood enter. */}
          <form onSubmit={handleSubmit} noValidate>
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
                  name="naam"
                  autoComplete="name"
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
                  name="email"
                  autoComplete="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => setEmailAangeraakt(true)}
                  aria-invalid={emailAangeraakt && emailOngeldig}
                  aria-describedby={emailAangeraakt && emailOngeldig ? 'email-fout' : undefined}
                  placeholder={t('fields.emailPlaceholder')}
                  className="mt-1 placeholder:text-gray-400"
                />
                {emailAangeraakt && emailOngeldig && (
                  <p id="email-fout" className="mt-1 text-base font-medium text-red-200">
                    {t('validation.email')}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="bedrijfsnaam" className="text-white font-medium">
                  {t('fields.company')} *
                </Label>
                <Input
                  id="bedrijfsnaam"
                  name="bedrijfsnaam"
                  autoComplete="organization"
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
                  name="telefoon"
                  autoComplete="tel"
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
                  name="verzuimPercentage"
                  autoComplete="off"
                  type="text"
                  inputMode="decimal"
                  value={formData.verzuimPercentage}
                  onChange={(e) => handleInputChange('verzuimPercentage', e.target.value)}
                  placeholder={t('fields.absenteeismPlaceholder')}
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="aantalWerknemers" className="text-white font-medium">
                  {t('fields.employees')} *
                </Label>
                <Input
                  id="aantalWerknemers"
                  name="aantalWerknemers"
                  autoComplete="off"
                  type="text"
                  inputMode="numeric"
                  value={formData.aantalWerknemers}
                  onChange={(e) => handleInputChange('aantalWerknemers', e.target.value)}
                  onBlur={netjesZetten('aantalWerknemers')}
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
                  name="brutoJaarsalaris"
                  autoComplete="off"
                  type="text"
                  inputMode="numeric"
                  value={formData.brutoJaarsalaris}
                  onChange={(e) => handleInputChange('brutoJaarsalaris', e.target.value)}
                  onBlur={netjesZetten('brutoJaarsalaris')}
                  placeholder={t('fields.salaryPlaceholder')}
                  className="mt-1 placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className="min-h-[44px] px-8 text-base md:text-lg font-semibold bg-brand-orange hover:bg-brand-orange/90"
            >
              {isSubmitting ? t('submit.loading') : t('submit.idle')}
            </Button>
          </div>
          </form>

          <div className="mt-6 text-base text-white/80 text-center">
            {t('footnote')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
