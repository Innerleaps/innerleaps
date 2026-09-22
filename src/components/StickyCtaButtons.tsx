import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { bookingPath } from '@/lib/booking';
import { detectLanguageFromPath } from '@/i18n/config';
import { meldMasterclassKlik } from '@/lib/conversies';

/**
 * Eén knop, één actie: de masterclass aanvragen. Verder niets.
 *
 * Hij wees eerst naar de rekentool. De site heeft nu één primaire actie, en de
 * rekentool blijft bereikbaar via de tekstlink in de hero en via de footer.
 *
 * Op mobiel is dit een balk over de volle breedte onderaan het scherm. Die
 * dekte eerder tekst af, dus krijgt de body een padding-bottom ter hoogte van
 * de balk, plus de veilige zone van iPhones met home indicator. Die hoogte
 * wordt gemeten in plaats van geraden: de knoptekst verschilt per pagina en
 * kan over twee regels lopen.
 *
 * De balk komt pas in beeld als de hero voorbij is.
 */

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
  const [isPastHero, setIsPastHero] = useState(false);
  const [isCalculatorInView, setIsCalculatorInView] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const lang = detectLanguageFromPath(location.pathname);

  const label = t('cta.requestMasterclassSticky');

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

  // Wegblijven zodra het rekentool-blok in beeld staat: dat is een formulier,
  // en de balk mag geen invoervelden afdekken.
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
    <div
      ref={barRef}
      aria-hidden={!isVisible}
      className={`sticky-cta fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 pt-3
        md:left-auto md:bottom-6 md:right-6 md:w-auto md:bg-transparent md:backdrop-blur-none md:border-0 md:px-0 md:pt-0
        ${isVisible ? 'sticky-cta--visible' : 'sticky-cta--hidden'}`}
    >
      <Link
        to={bookingPath(lang)}
        onClick={() => meldMasterclassKlik('sticky')}
        tabIndex={isVisible ? undefined : -1}
        className="block md:inline-block"
      >
        <Button
          tabIndex={-1}
          className="w-full md:w-auto min-h-[44px] font-semibold py-3 px-4 md:px-10 rounded-lg text-base md:text-lg shadow-lg whitespace-normal md:whitespace-nowrap"
        >
          {label}
        </Button>
      </Link>
    </div>
  );
};

export default StickyCtaButtons;
