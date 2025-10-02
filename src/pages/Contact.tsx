import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Calendar, Mail, Phone } from 'lucide-react';
import StickyCtaButtons from '@/components/StickyCtaButtons';
import ROICalculator from '@/components/ROICalculator';
import { useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="min-h-screen bg-brand-gray-light">
      <Navigation />
      <StickyCtaButtons />
      
      <main className="pt-8">
        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="text-center space-y-6 mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-dark">
                Stel je vragen aan Bas
              </h1>
            </div>

            {/* Contact sections */}
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quote section */}
                <div className="bg-white p-8 rounded-xl">
                  <div className="flex flex-col items-center space-y-6 mb-8">
                    <img src="/lovable-uploads/eaa7a159-2f85-4fa3-b487-4855426f2c14.png" alt="Bas Ter Haar Romenij" className="w-36 h-36 rounded-full object-cover" />
                    <div className="text-center">
                      <p className="text-brand-gray-dark italic mb-4 text-lg leading-relaxed">
                        "Hoi! Wat leuk dat je hier bent. Zullen we even kennismaken? Dan hoor ik graag wat jullie nodig hebben."
                      </p>
                      <p className="text-brand-gray-medium font-medium">
                        — Bas Ter Haar Romenij, Oprichter InnerLeaps
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Button variant="secondary" onClick={() => window.open('https://calendar.google.com/appointments/schedules/AcZssZ3VM8RLgeZm9Ej29kbhx4LugakTLXw_vF9BePhup0zm-DtWT5kk6nbHQw-chzBGEQQInd7l3Fs4', '_blank')}>
                      Plan een gesprek met Bas
                    </Button>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white p-8 rounded-xl">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-brand-gray-dark mb-6">Of neem direct zelf contact op</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-brand-gray-light p-3 rounded-lg shadow-sm">
                        <Mail className="h-6 w-6 text-brand-orange stroke-2" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-gray-dark text-lg">Email</h4>
                        <p className="text-brand-gray-medium text-lg">bas@innerleaps.nl</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-brand-gray-light p-3 rounded-lg shadow-sm">
                        <Phone className="h-6 w-6 text-brand-orange stroke-2" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-gray-dark text-lg">Telefoon</h4>
                        <p className="text-brand-gray-medium text-lg">06 23 45 34 77</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ROICalculator />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">Innerleaps</div>
              <p className="text-gray-300 leading-relaxed">InnerLeaps transformeert teams met wetenschappelijk bewezen stress management voor duurzaam succes. Geen quick fixes, wel echte gedragsverandering.</p>
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
                <button onClick={() => window.location.href = '/'} className="block text-gray-300 hover:text-white transition-colors text-left">Home</button>
                <button onClick={() => window.location.href = '/wetenschap'} className="block text-gray-300 hover:text-white transition-colors text-left">De Wetenschap</button>
                <button onClick={() => window.location.href = '/programma'} className="block text-gray-300 hover:text-white transition-colors text-left">Programma</button>
                <button onClick={() => window.location.href = '/contact'} className="block text-gray-300 hover:text-white transition-colors text-left">Contact</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Innerleaps. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Contact;