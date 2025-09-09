
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ImpactSection from '@/components/ImpactSection';
import ProgramSection from '@/components/ProgramSection';
import ProcessSection from '@/components/ProcessSection';
import StickyCtaButtons from '@/components/StickyCtaButtons';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

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
      <footer id="contact" className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">Innerleaps</div>
              <p className="text-gray-300 leading-relaxed">
                MBSR-gebaseerde stressreductieprogramma's voor meetbare bedrijfsresultaten. Gebaseerd op het baanbrekende werk van Jon Kabat-Zinn.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p>Email: bas@innerleaps.nl</p>
                <p>Telefoon: 06 23 45 34 77</p>
                <p>KVK nummer: 98136925</p>
                <div className="mt-4 flex justify-start">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/lovable-uploads/eaa7a159-2f85-4fa3-b487-4855426f2c14.png" alt="Bas Ter Haar Romenij" />
                    <AvatarFallback className="text-white text-xl font-bold bg-brand-blue">BtH</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Snel naar</h3>
              <div className="space-y-2">
                <button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })} className="block text-gray-300 hover:text-white transition-colors text-left">Home</button>
                <button onClick={() => document.getElementById('wetenschap')?.scrollIntoView({ behavior: 'smooth' })} className="block text-gray-300 hover:text-white transition-colors text-left">De Wetenschap</button>
                <button onClick={() => document.getElementById('programma')?.scrollIntoView({ behavior: 'smooth' })} className="block text-gray-300 hover:text-white transition-colors text-left">Programma</button>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="block text-gray-300 hover:text-white transition-colors text-left">Contact</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Innerleaps. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
