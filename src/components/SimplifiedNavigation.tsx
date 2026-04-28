import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const organisationMenuItems = [
  {
    label: 'Vitaliteitstraining',
    href: '/vitaliteitstraining',
    description: 'Vitaal en veerkrachtig team'
  },
  {
    label: 'Inzetbaarheid',
    href: '/duurzame-inzetbaarheid-training',
    description: 'Productief team met minder uitval'
  }
];

const employeeMenuItems = [
  {
    label: 'Stressmanagement',
    href: '/stressmanagement-training',
    description: 'Verminder spanning en druk'
  },
  {
    label: 'Prestatie Verbeteren',
    href: '/prestatie-training',
    description: 'Verbeter focus en prestaties'
  }
];

const SimplifiedNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOrganisationMenuOpen, setIsOrganisationMenuOpen] = useState(false);
  const [isEmployeeMenuOpen, setIsEmployeeMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center gap-4 sm:gap-8 py-4">
          {/* Logo */}
          <div className="flex flex-col items-start min-w-0 flex-shrink-0">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <img 
                src="/lovable-uploads/06d0112b-b23b-4ce0-b028-68ac939b2b2b.png" 
                alt="InnerLeaps Logo" 
                className="h-16 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {/* Voor Organisaties dropdown - EERST */}
            <NavigationMenu className="flex-none">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium text-base bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent focus:bg-transparent active:bg-transparent cursor-default select-none px-0 py-0 h-auto"
                    onClick={(e) => e.preventDefault()}
                    onPointerDown={(e) => e.preventDefault()}
                  >
                    Voor Organisaties
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
                    <ul className="w-[280px] p-2">
                      {organisationMenuItems.map((subItem) => (
                        <li key={subItem.label}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={subItem.href}
                              className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-brand-blue focus:bg-gray-100"
                            >
                              <div className="text-sm font-medium leading-none text-brand-gray-dark">
                                {subItem.label}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-500 mt-1">
                                {subItem.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Voor Medewerkers dropdown */}
            <NavigationMenu className="flex-none">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium text-base bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent focus:bg-transparent active:bg-transparent cursor-default select-none px-0 py-0 h-auto"
                    onClick={(e) => e.preventDefault()}
                    onPointerDown={(e) => e.preventDefault()}
                  >
                    Voor Medewerkers
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
                    <ul className="w-[280px] p-2">
                      {employeeMenuItems.map((subItem) => (
                        <li key={subItem.label}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={subItem.href}
                              className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-brand-blue focus:bg-gray-100"
                            >
                              <div className="text-sm font-medium leading-none text-brand-gray-dark">
                                {subItem.label}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-500 mt-1">
                                {subItem.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link 
              to="/breintraining-methode"
              className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium text-base whitespace-nowrap"
            >
              Methode
            </Link>
            
            <Link 
              to="/over-ons"
              className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium text-base whitespace-nowrap"
            >
              Over Ons
            </Link>
            <Link 
              to="/contact"
              className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium text-base whitespace-nowrap"
            >
              Contact
            </Link>
            <Link 
              to="/blog"
              className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium text-base whitespace-nowrap"
            >
              Blog
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden ml-auto">
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
          <div className="lg:hidden pb-4">
            <div className="flex flex-col space-y-4">
              {/* Voor Organisaties - EERST */}
              <div>
                <button
                  onClick={() => setIsOrganisationMenuOpen(!isOrganisationMenuOpen)}
                  className="flex items-center justify-between w-full text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium py-2 text-left text-base"
                >
                  Voor Organisaties
                  <ChevronDown className={`h-4 w-4 transition-transform ${isOrganisationMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOrganisationMenuOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {organisationMenuItems.map((subItem) => (
                      <Link
                        key={subItem.label}
                        to={subItem.href}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsOrganisationMenuOpen(false);
                        }}
                        className="block text-brand-gray-medium hover:text-brand-blue transition-colors duration-300 py-2 text-sm"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Voor Medewerkers */}
              <div>
                <button
                  onClick={() => setIsEmployeeMenuOpen(!isEmployeeMenuOpen)}
                  className="flex items-center justify-between w-full text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium py-2 text-left text-base"
                >
                  Voor Medewerkers
                  <ChevronDown className={`h-4 w-4 transition-transform ${isEmployeeMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isEmployeeMenuOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {employeeMenuItems.map((subItem) => (
                      <Link
                        key={subItem.label}
                        to={subItem.href}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsEmployeeMenuOpen(false);
                        }}
                        className="block text-brand-gray-medium hover:text-brand-blue transition-colors duration-300 py-2 text-sm"
                      >
                        {subItem.label}
                      </Link>
                    ))}
            </div>
          )}
        </div>

        <Link 
          to="/breintraining-methode"
          onClick={() => setIsMenuOpen(false)}
          className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium py-2 text-left text-base"
        >
          Methode
        </Link>

              <Link 
                to="/over-ons"
                onClick={() => setIsMenuOpen(false)}
                className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium py-2 text-left text-base"
              >
                Over Ons
              </Link>
              <Link 
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium py-2 text-left text-base"
              >
                Contact
              </Link>
              <Link 
                to="/blog"
                onClick={() => setIsMenuOpen(false)}
                className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium py-2 text-left text-base"
              >
                Blog
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default SimplifiedNavigation;
