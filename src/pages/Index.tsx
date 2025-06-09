
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ImpactSection from '@/components/ImpactSection';
import ProgramSection from '@/components/ProgramSection';
import ProcessSection from '@/components/ProcessSection';
import Calculator from '@/components/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
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
      
      {/* Calculator Section */}
      <section id="calculator" className="bg-white section-padding">
        <div className="container-custom">
          <Calculator />
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-brand-gray-dark text-white py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">Halt.academy</div>
              <p className="text-gray-300 leading-relaxed">
                Wetenschappelijk bewezen stressreductieprogramma's voor meetbare bedrijfsresultaten.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p>Email: info@halt.academy</p>
                <p>Telefoon: +31 (0)20 123 4567</p>
                <p>KvK: 12345678</p>
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
            <p>&copy; 2024 Halt.academy. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
