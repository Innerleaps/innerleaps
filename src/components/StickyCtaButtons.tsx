import { useState, useEffect, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { detectLanguageFromPath } from '@/i18n/config';
import { bookingPath, scrollToBookingWidget } from '@/lib/booking';

const CalculatorModal = lazy(() => import('./CalculatorModal'));
const ProgramRegistrationModal = lazy(() => import('./ProgramRegistrationModal'));

interface StickyCtaButtonsProps {
  onMasterclassClick?: () => void;
  onProgramRegistrationClick?: () => void;
}

const StickyCtaButtons = ({ onMasterclassClick, onProgramRegistrationClick }: StickyCtaButtonsProps) => {
  const { t } = useTranslation();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const lang = detectLanguageFromPath(location.pathname);
  const navigate = useNavigate();

  // Staat de Calendly-widget op deze pagina, dan scrollen we ernaartoe. Zo niet,
  // dan naar de boekingspagina. Vroeger opende dit Google Calendar in een nieuw
  // venster, waardoor de bezoeker het domein verliet en een boeking onmeetbaar was.
  const handleBooking = () => {
    if (!scrollToBookingWidget()) navigate(bookingPath(lang));
  };

  const isHomePage = location.pathname === '/' || location.pathname === '/en';
  const isLandingPage = location.pathname === '/landing';
  const isProgramPage =
    location.pathname === '/prestatie-training' ||
    location.pathname === '/stressmanagement-training' ||
    location.pathname === '/en/performance-training' ||
    location.pathname === '/en/stress-management-training';

  const programType =
    location.pathname === '/prestatie-training' || location.pathname === '/en/performance-training'
      ? 'prestatie'
      : 'stress-management';

  useEffect(() => {
    if (!isHomePage) {
      setIsVisible(true);
      return;
    }
    const handleScroll = () => setIsVisible(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  if (!isVisible || isLandingPage) return null;

  return (
    <>
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col gap-2 sm:gap-3 max-w-[calc(100vw-2rem)] sm:max-w-none">
        {isProgramPage ? (
          <>
            <Button
              variant="secondary"
              onClick={onMasterclassClick}
              className="font-semibold py-3 sm:py-5 px-4 sm:px-10 rounded-lg text-base sm:text-lg shadow-lg whitespace-nowrap"
            >
              <span className="hidden sm:inline">{t('cta.freeMasterclassLong')}</span>
              <span className="sm:hidden">{t('cta.freeMasterclassShort')}</span>
            </Button>
            <Button
              onClick={onProgramRegistrationClick}
              className="font-semibold py-3 sm:py-5 px-4 sm:px-10 rounded-lg text-base sm:text-lg shadow-lg whitespace-nowrap"
            >
              <span className="hidden sm:inline">{t('cta.registerTrainingLong')}</span>
              <span className="sm:hidden">{t('cta.registerTrainingShort')}</span>
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => setIsCalculatorOpen(true)}
              className="font-semibold py-3 sm:py-5 px-4 sm:px-10 rounded-lg text-base sm:text-lg shadow-lg whitespace-nowrap"
            >
              <span className="hidden sm:inline">{t('cta.calculateImpactLong')}</span>
              <span className="sm:hidden">{t('cta.calculateImpactShort')}</span>
            </Button>
            <Button
              variant="secondary"
              className="font-semibold py-3 sm:py-5 px-4 sm:px-10 rounded-lg text-base sm:text-lg shadow-lg whitespace-nowrap"
              onClick={handleBooking}
            >
              <span className="hidden sm:inline">{t('cta.scheduleCallShort')}</span>
              <span className="sm:hidden">{t('cta.contactShort')}</span>
            </Button>
          </>
        )}
      </div>

      <Suspense fallback={null}>
        {isCalculatorOpen && (
          <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
        )}
        {isProgramPage && isRegistrationModalOpen && (
          <ProgramRegistrationModal
            isOpen={isRegistrationModalOpen}
            onClose={() => setIsRegistrationModalOpen(false)}
            programType={programType}
          />
        )}
      </Suspense>
    </>
  );
};

export default StickyCtaButtons;
