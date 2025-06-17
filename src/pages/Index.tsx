
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ImpactSection from '@/components/ImpactSection';
import ProgramSection from '@/components/ProgramSection';
import ProcessSection from '@/components/ProcessSection';
import StickyCtaButtons from '@/components/StickyCtaButtons';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <StickyCtaButtons />
      <div id="home">
        <HeroSection />
      </div>
      <div id="wetenschap">
        <ImpactSection />
      </div>
      <div id="programma">
        <ProgramSection />
      </div>
      <div id="voor-wie">
        <ProcessSection />
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-brand-gray-dark text-white py-8 md:py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <div className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Halt.academy</div>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                MBSR-gebaseerde stressreductieprogramma's voor meetbare bedrijfsresultaten. Gebaseerd op het baanbrekende werk van Jon Kabat-Zinn.
              </p>
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Contact</h3>
              <div className="space-y-1 md:space-y-2 text-gray-300">
                <p className="text-sm md:text-base">Email: info@halt.academy</p>
                <p className="text-sm md:text-base">Telefoon: +31 (0)20 123 4567</p>
                <p className="text-sm md:text-base">KvK: 12345678</p>
              </div>
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Snel naar</h3>
              <div className="space-y-1 md:space-y-2">
                <button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })} className="block text-gray-300 transition-colors text-left text-sm md:text-base">Home</button>
                <button onClick={() => document.getElementById('wetenschap')?.scrollIntoView({ behavior: 'smooth' })} className="block text-gray-300 transition-colors text-left text-sm md:text-base">Wetenschap</button>
                <button onClick={() => document.getElementById('programma')?.scrollIntoView({ behavior: 'smooth' })} className="block text-gray-300 transition-colors text-left text-sm md:text-base">Programma</button>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="block text-gray-300 transition-colors text-left text-sm md:text-base">Contact</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400">
            <p className="text-sm md:text-base">&copy; 2024 Halt.academy. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
