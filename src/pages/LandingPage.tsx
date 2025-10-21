import HeroSection from '@/components/HeroSection';
import MethodologySection from '@/components/MethodologySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <MethodologySection />
      <ContactSection />
      <Footer showNavigation={false} />
    </div>
  );
};

export default LandingPage;