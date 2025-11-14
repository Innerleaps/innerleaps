import { lazy, Suspense } from 'react';
import SimplifiedNavigation from '@/components/SimplifiedNavigation';
import HeroSection from '@/components/HeroSection';
import MethodologySection from '@/components/MethodologySection';
import ProgramOverviewSection from '@/components/ProgramOverviewSection';
import TrustSection from '@/components/TrustSection';
import StickyCtaButtons from '@/components/StickyCtaButtons';
import Footer from '@/components/Footer';

// Lazy load ROI Calculator (below the fold)
const ROICalculator = lazy(() => import('@/components/ROICalculator'));

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SimplifiedNavigation />
      <StickyCtaButtons />
      <div id="home">
        <HeroSection />
      </div>
      <MethodologySection />
      <ProgramOverviewSection />
      <TrustSection />
      <Suspense fallback={<div className="section-padding"><div className="container-custom text-center">Laden...</div></div>}>
        <ROICalculator />
      </Suspense>
      <Footer />
    </div>
  );
};

export default LandingPage;