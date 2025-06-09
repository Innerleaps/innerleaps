
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      href: 'voor-wie'
    },
    {
      label: 'Over Ons',
      href: 'over-ons'
    },
    {
      label: 'Contact',
      href: 'contact'
    }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-brand-blue hover:text-brand-blue/80 transition-colors">
              Halt.academy
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => 
              item.isLink ? (
                <Link 
                  key={item.label}
                  to={item.href}
                  className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <button 
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium cursor-pointer"
                >
                  {item.label}
                </button>
              )
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="btn-secondary" 
              onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}
            >
              Vrijblijvend gesprek
            </Button>
            <Button 
              onClick={() => scrollToSection('calculator')} 
              className="btn-primary text-slate-50 bg-indigo-800 hover:bg-indigo-700"
            >
              Bereken besparing
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              {navItems.map(item => 
                item.isLink ? (
                  <Link 
                    key={item.label}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium py-2 text-left"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button 
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium py-2 text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                )
              )}
              <div className="flex flex-col space-y-3 pt-4">
                <Button 
                  variant="outline" 
                  className="btn-secondary w-full" 
                  onClick={() => {
                    window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank');
                    setIsMenuOpen(false);
                  }}
                >
                  Vrijblijvend gesprek
                </Button>
                <Button 
                  className="btn-primary w-full" 
                  onClick={() => scrollToSection('calculator')}
                >
                  Bereken besparing
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
