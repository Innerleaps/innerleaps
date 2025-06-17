
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import CalculatorModal from './CalculatorModal';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    {
      label: 'De Wetenschap',
      href: '/wetenschap',
      isLink: true
    },
    {
      label: 'Programma',
      href: '/programma',
      isLink: true
    },
    {
      label: 'Voor Wie',
      href: '/voor-wie',
      isLink: true
    },
    {
      label: 'Over Ons',
      href: '/over-ons',
      isLink: true
    },
    {
      label: 'Contact',
      href: '/contact',
      isLink: true
    }
  ];

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex flex-col items-start min-w-0 flex-shrink-0 mr-4">
              <Link to="/" className="text-2xl md:text-3xl font-bold text-brand-blue hover:text-brand-blue-dark transition-colors">
                Halt.academy
              </Link>
              <span className="text-sm text-brand-gray-medium mt-1">40+ jaar wetenschap</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-6 flex-1 justify-center min-w-0 mx-2">
              {navItems.map(item => 
                item.isLink ? (
                  <Link 
                    key={item.label}
                    to={item.href}
                    className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium text-base whitespace-nowrap px-2"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button 
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium text-base whitespace-nowrap cursor-pointer px-2"
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 flex-shrink-0">
              {/* Hide vrijblijvend gesprek button on smaller screens but show on xl+ */}
              <Button 
                variant="outline" 
                className="hidden xl:flex border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-semibold py-3 px-4 xl:px-6 rounded-lg transition-all duration-300 text-base" 
                onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}
              >
                Vrijblijvend gesprek
              </Button>
              <Button 
                onClick={() => setIsCalculatorOpen(true)} 
                className="bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold py-3 px-4 lg:px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base"
              >
                Bereken besparing
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-brand-gray-dark"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden pb-4">
              <div className="flex flex-col space-y-4">
                {navItems.map(item => 
                  item.isLink ? (
                    <Link 
                      key={item.label}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium py-2 text-left text-base"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button 
                      key={item.label}
                      onClick={() => scrollToSection(item.href)}
                      className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium py-2 text-left cursor-pointer text-base"
                    >
                      {item.label}
                    </button>
                  )
                )}
                <div className="flex flex-col space-y-3 pt-4">
                  <Button 
                    variant="outline" 
                    className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 w-full text-base" 
                    onClick={() => {
                      window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank');
                      setIsMenuOpen(false);
                    }}
                  >
                    Vrijblijvend gesprek
                  </Button>
                  <Button 
                    className="bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 w-full text-base" 
                    onClick={() => {
                      setIsCalculatorOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    Bereken besparing
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <CalculatorModal 
        isOpen={isCalculatorOpen} 
        onClose={() => setIsCalculatorOpen(false)} 
      />
    </>
  );
};

export default Navigation;
