import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import MethodologySection from '@/components/MethodologySection';
import YoungProfessionalsSection from '@/components/YoungProfessionalsSection';
import ImpactSection from '@/components/ImpactSection';
import ProgramSection from '@/components/ProgramSection';
import ProcessSection from '@/components/ProcessSection';
import StickyCtaButtons from '@/components/StickyCtaButtons';
import ROICalculator from '@/components/ROICalculator';
import Footer from '@/components/Footer';
const Index = () => {
  return <div className="min-h-screen bg-white">
      <Navigation />
      <StickyCtaButtons />
      <div id="home">
        <HeroSection />
      </div>
      <MethodologySection />
      <YoungProfessionalsSection />
      <div id="wetenschap">
        <ImpactSection />
      </div>
      <div id="programma">
        <ProgramSection />
      </div>
      <div id="voor-wie">
        <ProcessSection />
      </div>

      <ROICalculator />

      <div id="contact">
        <Footer />
      </div>
    </div>;
};
export default Index;