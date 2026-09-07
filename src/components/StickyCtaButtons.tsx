import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

const CalculatorModal = lazy(() => import('./CalculatorModal'));

/**
 * Eén knop, één actie: de rekentool. Verder niets.
 *
 * Er stonden hier eerst twee even zware gevulde knoppen, en dat leest als een
 * keuzemenu. Daarna een tekstlink naar een gesprek eronder. Ook die is eruit:
 * op de campagnepagina's staat "Plan 20 minuten met Bas" vijf keer in de body,
 * dus die actie is nooit meer dan een halve scroll weg. Een kale onderstreepte
 * link onder een grote knop maakte de balk alleen maar rommelig.
 *
 * Op mobiel is dit een balk over de volle breedte onderaan het scherm. Die
 * dekte eerder tekst af, dus krijgt de body een padding-bottom ter hoogte van
 * de balk, plus de veilige zone van iPhones met home indicator. Die hoogte
 * wordt gemeten in plaats van geraden: de knoptekst verschilt per pagina en
 * kan over twee regels lopen.
 *
 * De balk komt pas in beeld als de hero voorbij is, en verdwijnt zodra het
 * rekentool-blok in beeld komt. Dat laatste is geen detail: de balk mag niet
 * de actie afdekken waar hij zelf naartoe verwijst.
 *
 * De afstand tot de onderrand staat niet hier maar in index.css, bij
 * .sticky-cta. Reden: staat de cookiebalk er, dan gaat deze knop erbovenop,
 * en dat rekent die regel uit met --cookiebanner-height. Zet er dus geen
 * bottom-0 of md:bottom-6 meer bij, dan valt hij weer over de balk heen.
 */

/** Het label van de primaire knop verschilt per doelgroep. HR koopt niet
 *  hetzelfde als een directie en gebruikt niet dezelfde woorden. */
const ROI_LABEL_PATHS = ['/team-prestaties-verbeteren', '/en/improve-team-performance'];

/** Waar de balk niets te zoeken heeft. */
const HIDDEN_ON_PATHS = ['/landing'];

/** Waar we op letten om te weten dat de bezoeker de hero voorbij is, in deze
 *  volgorde. Eerst de heroknop zelf: die staat halverwege de hero, dus wachten
 *  tot de hele hero uit beeld is kostte nog een half scherm scrollen voordat
 *  de balk verscheen. Staat die knop er niet, dan de hele hero. */
const HERO_SENTINELS = ['hero-cta', 'hero'];

/** Zonder allebei die elementen valt de balk terug op een scrolldrempel. */
const SCROLL_FALLBACK = 400;

const StickyCtaButtons = () => {
  const { t } = useTranslation();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isCalculatorInView, setIsCalculatorInView] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const label = ROI_LABEL_PATHS.includes(location.pathname)
    ? t('cta.calculateRoi')
    : t('cta.calculateSavings');

  // Pas tonen als de hero uit beeld is. Bij het laden van de pagina zou de
  // balk anders meteen over de hero heen liggen.
  useEffect(() => {
    const hero = HERO_SENTINELS.map((id) => document.getElementById(id)).find(Boolean);
    if (hero && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => setIsPastHero(!entry.isIntersecting),
        { threshold: 0 }
      );
      observer.observe(hero);
      return () => observer.disconnect();
    }
    const onScroll = () => setIsPastHero(window.scrollY > SCROLL_FALLBACK);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  // Wegblijven zodra het rekentool-blok in beeld staat.
  useEffect(() => {
    const calculator = document.getElementById('calculator');
    if (!calculator || !('IntersectionObserver' in window)) {
      setIsCalculatorInView(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsCalculatorInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(calculator);
    return () => observer.disconnect();
  }, [location.pathname]);

  const isHidden = HIDDEN_ON_PATHS.includes(location.pathname);
  const isVisible = isPastHero && !isCalculatorInView && !isHidden;

  // De gemeten hoogte doorgeven aan de body, zodat er onderaan de pagina geen
  // tekst permanent achter de balk verdwijnt. Meten in plaats van vastleggen,
  // want een langer label loopt op een smal scherm over twee regels.
  useEffect(() => {
    const body = document.body;
    const bar = barRef.current;
    if (!isVisible || !bar) {
      body.classList.remove('has-sticky-cta');
      body.style.removeProperty('--sticky-cta-height');
      return;
    }
    const measure = () => {
      body.style.setProperty('--sticky-cta-height', `${bar.offsetHeight}px`);
      body.classList.add('has-sticky-cta');
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(bar);
    return () => {
      observer.disconnect();
      body.classList.remove('has-sticky-cta');
      body.style.removeProperty('--sticky-cta-height');
    };
  }, [isVisible, label]);

  return (
    <>
      <div
        ref={barRef}
        aria-hidden={!isVisible}
        className={`sticky-cta fixed left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 pt-3
          md:left-auto md:right-6 md:w-auto md:bg-transparent md:backdrop-blur-none md:border-0 md:px-0 md:pt-0
          ${isVisible ? 'sticky-cta--visible' : 'sticky-cta--hidden'}`}
      >
        <Button
          onClick={() => setIsCalculatorOpen(true)}
          tabIndex={isVisible ? undefined : -1}
          className="w-full md:w-auto min-h-[44px] font-semibold py-3 px-4 md:px-10 rounded-lg text-base md:text-lg shadow-lg whitespace-normal md:whitespace-nowrap"
        >
          {label}
        </Button>
      </div>

      <Suspense fallback={null}>
        {isCalculatorOpen && (
          <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
        )}
      </Suspense>
    </>
  );
};

export default StickyCtaButtons;
