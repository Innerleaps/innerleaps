import { memo } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface FooterProps {
  showNavigation?: boolean;
}

const Footer = memo(({ showNavigation = true }: FooterProps) => {
  return (
    <footer className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white py-12">
      <div className="container-custom">
        <div className={`grid grid-cols-1 ${showNavigation ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-8`}>
          <div>
            <div className="text-2xl font-bold mb-4">Innerleaps</div>
            <p className="text-gray-300 leading-relaxed">Wetenschappelijk bewezen training in stressmanagement: Medewerkers ontwikkelen niet alleen regie maar worden ook productiever, gelukkiger en kunnen beter samenwerken.</p>
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
          {showNavigation && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Snel naar</h3>
              <div className="space-y-2">
                <button onClick={() => document.getElementById('home')?.scrollIntoView({
                  behavior: 'smooth'
                })} className="block text-gray-300 hover:text-white transition-colors text-left">Home</button>
                <button onClick={() => document.getElementById('wetenschap')?.scrollIntoView({
                  behavior: 'smooth'
                })} className="block text-gray-300 hover:text-white transition-colors text-left">De Wetenschap</button>
                <button onClick={() => document.getElementById('programma')?.scrollIntoView({
                  behavior: 'smooth'
                })} className="block text-gray-300 hover:text-white transition-colors text-left">Programma</button>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({
                  behavior: 'smooth'
                })} className="block text-gray-300 hover:text-white transition-colors text-left">Contact</button>
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Innerleaps. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;