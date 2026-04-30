import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, CheckCircle2, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { calculateROI, ROIResults } from '@/utils/calculationEngine';

const ROICalculator = () => {
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

  const [calculationResults, setCalculationResults] = useState<ROIResults | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isEN = i18n.language?.startsWith('en');
  const currencyLocale = isEN ? 'en-US' : 'nl-NL';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(currencyLocale, {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${Math.round(percentage)}%`;
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

    setCalculationResults(results);
    setShowResults(true);

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

      toast({
        title: t('success.title'),
        description: t('success.description'),
      });
    } catch (error) {
      console.error('Error submitting calculator:', error);
      toast({
        title: t('error.title'),
        description: t('error.description'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      naam: '',
      email: '',
      bedrijfsnaam: '',
      telefoon: '',
      verzuimPercentage: '',
      verloopPercentage: '',
      aantalWerknemers: '',
      brutoJaarsalaris: '',
    });
    setCalculationResults(null);
    setShowResults(false);
  };

  if (showResults && calculationResults) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8">
            <div className="text-center mb-8">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-brand-gray-dark mb-2">
                {t('header.title')}
              </h2>
              <p className="text-brand-gray-medium">
                {t('header.subtitle')}
              </p>
            </div>

            {/* Organization summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-brand-gray-dark mb-3">{t('results.yourOrg')}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-brand-gray-medium">{t('results.employees')}:</span>
                  <span className="ml-2 font-semibold">{formData.aantalWerknemers}</span>
                </div>
                <div>
                  <span className="text-brand-gray-medium">{t('results.avgSalary')}:</span>
                  <span className="ml-2 font-semibold">{formatCurrency(parseInt(formData.brutoJaarsalaris))}</span>
                </div>
                <div>
                  <span className="text-brand-gray-medium">{t('results.absenteeism')}:</span>
                  <span className="ml-2 font-semibold">{formData.verzuimPercentage}%</span>
                </div>
                <div>
                  <span className="text-brand-gray-medium">{t('results.turnover')}:</span>
                  <span className="ml-2 font-semibold">{formData.verloopPercentage}%</span>
                </div>
              </div>
            </div>

            {/* Conservative Scenario */}
            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-brand-gray-dark">{t('results.conservative')}</h3>
                <span className="text-sm text-brand-gray-medium">{t('results.conservativeTag')}</span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray-medium">{t('results.absenteeismSaving')} (15%):</span>
                  <span className="font-semibold text-green-600">{formatCurrency(calculationResults.scenarios.conservative.verzuimBesparing)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray-medium">{t('results.retentionSaving')} (5%):</span>
                  <span className="font-semibold text-green-600">{formatCurrency(calculationResults.scenarios.conservative.retentieBesparing)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray-medium">{t('results.productivityGain')} (5%):</span>
                  <span className="font-semibold text-green-600">{formatCurrency(calculationResults.scenarios.conservative.productiviteitBesparing)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-brand-gray-dark">{t('results.totalSaving')}:</span>
                  <span className="text-green-600">{formatCurrency(calculationResults.scenarios.conservative.totaleBesparing)}</span>
                </div>
                <div className="flex justify-between text-sm text-brand-gray-medium">
                  <span>{t('results.investment')}:</span>
                  <span className="text-red-600">-{formatCurrency(calculationResults.investment)}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-brand-gray-dark">{t('results.netProfit')}:</span>
                    <span className="text-green-600">{formatCurrency(calculationResults.scenarios.conservative.netBesparing)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-brand-gray-dark">{t('results.roi')}:</span>
                    <span className="font-bold text-brand-blue">{formatPercentage(calculationResults.scenarios.conservative.roi)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Positive Scenario */}
            <div className="bg-white border-2 border-brand-orange rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-brand-gray-dark">{t('results.positive')}</h3>
                <span className="text-sm text-brand-gray-medium">{t('results.positiveTag')}</span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray-medium">{t('results.absenteeismSaving')} (21%):</span>
                  <span className="font-semibold text-green-600">{formatCurrency(calculationResults.scenarios.positive.verzuimBesparing)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray-medium">{t('results.retentionSaving')} (8%):</span>
                  <span className="font-semibold text-green-600">{formatCurrency(calculationResults.scenarios.positive.retentieBesparing)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray-medium">{t('results.productivityGain')} (8%):</span>
                  <span className="font-semibold text-green-600">{formatCurrency(calculationResults.scenarios.positive.productiviteitBesparing)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-brand-gray-dark">{t('results.totalSaving')}:</span>
                  <span className="text-green-600">{formatCurrency(calculationResults.scenarios.positive.totaleBesparing)}</span>
                </div>
                <div className="flex justify-between text-sm text-brand-gray-medium">
                  <span>{t('results.investment')}:</span>
                  <span className="text-red-600">-{formatCurrency(calculationResults.investment)}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-brand-gray-dark">{t('results.netProfit')}:</span>
                    <span className="text-green-600">{formatCurrency(calculationResults.scenarios.positive.netBesparing)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-brand-gray-dark">{t('results.roi')}:</span>
                    <span className="font-bold text-brand-blue">{formatPercentage(calculationResults.scenarios.positive.roi)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scientific basis */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-brand-gray-dark mb-3">{t('results.scientificTitle')}</h3>
              <p className="text-sm text-brand-gray-medium mb-3">
                {t('results.scientificIntro')}
              </p>
              <ul className="text-sm text-brand-gray-medium space-y-2">
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">•</span>
                  <span>{t('results.scientific1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">•</span>
                  <span>{t('results.scientific2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">•</span>
                  <span>{t('results.scientific3')}</span>
                </li>
              </ul>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <p className="text-lg font-semibold text-brand-gray-dark mb-6">
                {t('results.ctaQuestion')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold py-3 sm:py-5 px-4 sm:px-10 text-base sm:text-lg rounded-lg shadow-lg"
                  onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2z6RN96P7L5QS9W8w-pS6XYBpCrH52I_AvP0R7Y6vxnzQLFXz9VwlGb3XPH4VFzJUyMTa1YTxP', '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t('results.ctaPrimary')}
                </Button>
                <Button
                  variant="outline"
                  className="font-semibold py-3 sm:py-5 px-4 sm:px-10 text-base sm:text-lg rounded-lg shadow-lg"
                  onClick={handleReset}
                >
                  {t('results.ctaSecondary')}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    );
  }

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
              <h3 className="text-lg font-semibold text-white mb-4">{t('sections.organization')}</h3>

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
              className="px-8 bg-brand-orange hover:bg-brand-orange/90"
            >
              {isSubmitting ? t('submit.loading') : t('submit.idle')}
            </Button>
          </div>

          <div className="mt-6 text-xs text-white/80 text-center">
            {t('footnote')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
