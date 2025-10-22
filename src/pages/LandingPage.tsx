import SimplifiedNavigation from '@/components/SimplifiedNavigation';
import HeroSection from '@/components/HeroSection';
import MethodologySection from '@/components/MethodologySection';
import ProgramOverviewSection from '@/components/ProgramOverviewSection';
import TrustSection from '@/components/TrustSection';
import Footer from '@/components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SimplifiedNavigation />
      <HeroSection />
      <MethodologySection />
      <ProgramOverviewSection />
      <TrustSection />
      <Footer showNavigation={false} />
    </div>
  );
};

export default LandingPage;