import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { detectLanguageFromPath } from '@/i18n/config';
import { isOffertePagina, offertePad } from '@/lib/offerte';
import { meldOfferteKlik } from '@/lib/conversies';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const SimplifiedNavigation = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = detectLanguageFromPath(pathname);

  // Resolve hrefs based on active language
  const href = {
    home: lang === 'en' ? '/en' : '/',
    method: lang === 'en' ? '/en/method' : '/breintraining-methode',
    caseStudy: lang === 'en' ? '/en/case-studies/theydo' : '/klantcases/theydo',
    aboutUs: lang === 'en' ? '/en/about-us' : '/over-ons',
    contact: lang === 'en' ? '/en/contact' : '/contact',
    blog: lang === 'en' ? '/en/blog' : '/blog',
    vitality: lang === 'en' ? '/en/sustainable-employability' : '/duurzame-inzetbaarheid',
    employability: lang === 'en' ? '/en/improve-team-performance' : '/team-prestaties-verbeteren',
    stress: lang === 'en' ? '/en/stress-management-training' : '/stressmanagement-training',
    performance: lang === 'en' ? '/en/performance-training' : '/prestatie-training',
  };

  const isActiveRoute = (href: string) => pathname === href;

  // De offerteknop: de primaire actie van de site. Niet op het formulier zelf
  // en niet op de bedanktpagina erachter, want daar wijst hij naar waar je al bent.
  const toonOfferteknop = !isOffertePagina(pathname);

  // Scale-ups bovenaan: dat is sinds oktober 2026 het segment waar de site
  // zich eerst op richt.
  const organisationMenuItems = [
    { label: t('menuItems.employability.label'), href: href.employability, description: t('menuItems.employability.description') },
    { label: t('menuItems.vitality.label'), href: href.vitality, description: t('menuItems.vitality.description') },
  ];

  const employeeMenuItems = [
    { label: t('menuItems.stress.label'), href: href.stress, description: t('menuItems.stress.description') },
    { label: t('menuItems.performance.label'), href: href.performance, description: t('menuItems.performance.description') },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOrganisationMenuOpen, setIsOrganisationMenuOpen] = useState(false);
  const [isEmployeeMenuOpen, setIsEmployeeMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        {/* Op lg en xl krapper dan op sm. Op 1024 pixels stak de taalknop
            er eerst 49 pixels uit, en op 1280 kwam de rij met de offerteknop
            erbij 38 pixels te kort. */}
        <div className="flex items-center gap-4 sm:gap-8 lg:gap-4 xl:gap-6 py-4">
          {/* Logo */}
          <div className="flex flex-col items-start min-w-0 flex-shrink-0">
            <Link to={href.home} className="hover:opacity-80 transition-opacity">
              <img
                src="/lovable-uploads/06d0112b-b23b-4ce0-b028-68ac939b2b2b.webp"
                width={414}
                height={140}
                alt="Innerleaps Logo"
                // Op laptopbreedte kleiner: daar staat het volledige menu naast
                // het logo, en sinds de klantcase erbij kwam paste het niet meer
                // op 1024 en (Nederlands, met de offerteknop) op 1280 pixels.
                className="h-16 lg:h-12 xl:h-14 2xl:h-16 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-5 2xl:space-x-6">
            <NavigationMenu className="flex-none">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium text-base bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent focus:bg-transparent active:bg-transparent cursor-default select-none px-0 py-0 h-auto"
                    onClick={(e) => e.preventDefault()}
                    onPointerDown={(e) => e.preventDefault()}
                  >
                    {t('nav.forOrganizations')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
                    <ul className="w-[280px] p-2">
                      {organisationMenuItems.map((subItem) => {
                        const active = isActiveRoute(subItem.href);
                        return (
                          <li key={subItem.label}>
                            {active ? (
                              <span
                                aria-current="page"
                                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors border-l-4 bg-brand-off-white border-brand-orange cursor-default"
                              >
                                <div className="text-base font-medium leading-none text-brand-purple">
                                  {subItem.label}
                                </div>
                                <p className="line-clamp-2 text-base leading-snug text-gray-500 mt-1">
                                  {subItem.description}
                                </p>
                              </span>
                            ) : (
                              <Link
                                to={subItem.href}
                                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors border-l-4 border-transparent hover:bg-gray-100 focus:bg-gray-100"
                              >
                                <div className="text-base font-medium leading-none text-brand-gray-dark">
                                  {subItem.label}
                                </div>
                                <p className="line-clamp-2 text-base leading-snug text-gray-500 mt-1">
                                  {subItem.description}
                                </p>
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu className="flex-none">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium text-base bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent focus:bg-transparent active:bg-transparent cursor-default select-none px-0 py-0 h-auto"
                    onClick={(e) => e.preventDefault()}
                    onPointerDown={(e) => e.preventDefault()}
                  >
                    {t('nav.forEmployees')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
                    <ul className="w-[280px] p-2">
                      {employeeMenuItems.map((subItem) => {
                        const active = isActiveRoute(subItem.href);
                        return (
                          <li key={subItem.label}>
                            {active ? (
                              <span
                                aria-current="page"
                                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors border-l-4 bg-brand-off-white border-brand-orange cursor-default"
                              >
                                <div className="text-base font-medium leading-none text-brand-purple">
                                  {subItem.label}
                                </div>
                                <p className="line-clamp-2 text-base leading-snug text-gray-500 mt-1">
                                  {subItem.description}
                                </p>
                              </span>
                            ) : (
                              <Link
                                to={subItem.href}
                                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors border-l-4 border-transparent hover:bg-gray-100 focus:bg-gray-100"
                              >
                                <div className="text-base font-medium leading-none text-brand-gray-dark">
                                  {subItem.label}
                                </div>
                                <p className="line-clamp-2 text-base leading-snug text-gray-500 mt-1">
                                  {subItem.description}
                                </p>
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              to={href.method}
              className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium text-base whitespace-nowrap"
            >
              {t('nav.method')}
            </Link>

            {/* Rechtstreeks naar de enige klantcase. Komen er meer, dan wordt dit
                een uitklapmenu of een overzichtspagina op /klantcases. */}
            <Link
              to={href.caseStudy}
              className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium text-base whitespace-nowrap"
            >
              {t('nav.caseStudy')}
            </Link>

            <Link
              to={href.aboutUs}
              className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium text-base whitespace-nowrap"
            >
              {t('nav.aboutUs')}
            </Link>
            <Link
              to={href.contact}
              className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium text-base whitespace-nowrap"
            >
              {t('nav.contact')}
            </Link>
            <Link
              to={href.blog}
              className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium text-base whitespace-nowrap"
            >
              {t('nav.blog')}
            </Link>
          </div>

          {/* Rechts: de offerteknop, dan de taalkeuze, en op mobiel de menuknop.
              De taalkeuze staat helemaal rechts, waar mensen hem zoeken, als
              compacte keuzelijst. Dat scheelt ruimte, en daardoor past de
              offerteknop nu vanaf 1200 pixels naast het volledige menu. */}
          <div className="ml-auto flex items-center gap-4 xl:gap-3">
            {/* Alleen waar hij past. Onder sm niet naast het logo, en tussen lg
                en 1200 pixels niet naast het volledige menu. Daar staat hij in
                het uitklapmenu of de hero, en verschijnt de zwevende balk na de
                hero. */}
            {toonOfferteknop && (
              <Link
                to={offertePad(lang)}
                state={{ van: pathname }}
                onClick={() => meldOfferteKlik('header')}
                className="hidden sm:block lg:hidden min-[1200px]:block"
              >
                <Button tabIndex={-1} className="min-h-[44px] px-4 text-base font-semibold whitespace-nowrap">
                  {t('cta.requestQuote')}
                </Button>
              </Link>
            )}
            <div className="hidden lg:block">
              <LanguageSwitcher variant="dropdown" />
            </div>
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {/* Dit blok staat altijd in de DOM en wordt met CSS verborgen, niet met
            een voorwaarde. Reden: het desktopmenu is een Radix-dropdown die pas
            bij openen bestaat, dus zonder dit blok stond er in de geprerenderde
            HTML geen enkele link naar de vier propositiepagina's. Een crawler
            zonder JavaScript zag ze daardoor niet. Visueel verandert er niets:
            op desktop zorgt lg:hidden ervoor dat het blok onzichtbaar blijft. */}
        <div className={`lg:hidden pb-4 ${isMenuOpen ? "" : "hidden"}`}>
            <div className="flex flex-col space-y-4">
              {/* Language switcher at top of mobile menu */}
              <div className="pb-2 border-b border-gray-200">
                <LanguageSwitcher variant="block" onSwitch={() => setIsMenuOpen(false)} />
              </div>

              <div>
                <button
                  onClick={() => setIsOrganisationMenuOpen(!isOrganisationMenuOpen)}
                  className="flex items-center justify-between w-full text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium py-2 text-left text-base"
                >
                  {t('nav.forOrganizations')}
                  <ChevronDown className={`h-4 w-4 transition-transform ${isOrganisationMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`pl-4 mt-2 space-y-2 ${isOrganisationMenuOpen ? "" : "hidden"}`}>
                    {organisationMenuItems.map((subItem) => {
                      const active = isActiveRoute(subItem.href);
                      return active ? (
                        <span
                          key={subItem.label}
                          aria-current="page"
                          className="block transition-colors duration-300 py-2 text-base border-l-4 pl-2 border-brand-orange text-brand-purple font-semibold cursor-default"
                        >
                          {subItem.label}
                        </span>
                      ) : (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsOrganisationMenuOpen(false);
                          }}
                          className="block transition-colors duration-300 py-2 text-base border-l-4 pl-2 border-transparent text-brand-gray-medium hover:text-brand-blue"
                        >
                          {subItem.label}
                        </Link>
                      );
                    })}
                </div>
              </div>

              <div>
                <button
                  onClick={() => setIsEmployeeMenuOpen(!isEmployeeMenuOpen)}
                  className="flex items-center justify-between w-full text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium py-2 text-left text-base"
                >
                  {t('nav.forEmployees')}
                  <ChevronDown className={`h-4 w-4 transition-transform ${isEmployeeMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`pl-4 mt-2 space-y-2 ${isEmployeeMenuOpen ? "" : "hidden"}`}>
                    {employeeMenuItems.map((subItem) => {
                      const active = isActiveRoute(subItem.href);
                      return active ? (
                        <span
                          key={subItem.label}
                          aria-current="page"
                          className="block transition-colors duration-300 py-2 text-base border-l-4 pl-2 border-brand-orange text-brand-purple font-semibold cursor-default"
                        >
                          {subItem.label}
                        </span>
                      ) : (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsEmployeeMenuOpen(false);
                          }}
                          className="block transition-colors duration-300 py-2 text-base border-l-4 pl-2 border-transparent text-brand-gray-medium hover:text-brand-blue"
                        >
                          {subItem.label}
                        </Link>
                      );
                    })}
                </div>
              </div>

              <Link
                to={href.method}
                onClick={() => setIsMenuOpen(false)}
                className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium py-2 text-left text-base"
              >
                {t('nav.method')}
              </Link>

              <Link
                to={href.caseStudy}
                onClick={() => setIsMenuOpen(false)}
                className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium py-2 text-left text-base"
              >
                {t('nav.caseStudy')}
              </Link>

              <Link
                to={href.aboutUs}
                onClick={() => setIsMenuOpen(false)}
                className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium py-2 text-left text-base"
              >
                {t('nav.aboutUs')}
              </Link>
              <Link
                to={href.contact}
                onClick={() => setIsMenuOpen(false)}
                className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium py-2 text-left text-base"
              >
                {t('nav.contact')}
              </Link>
              <Link
                to={href.blog}
                onClick={() => setIsMenuOpen(false)}
                className="text-brand-gray-dark hover:text-brand-blue transition-colors duration-300 font-medium py-2 text-left text-base"
              >
                {t('nav.blog')}
              </Link>

              {toonOfferteknop && (
                <Link
                  to={offertePad(lang)}
                  state={{ van: pathname }}
                  onClick={() => {
                    meldOfferteKlik('menu');
                    setIsMenuOpen(false);
                  }}
                  className="block pt-2"
                >
                  <Button tabIndex={-1} className="w-full min-h-[44px] text-base font-semibold">
                    {t('cta.requestQuote')}
                  </Button>
                </Link>
              )}
            </div>
          </div>
      </div>
    </nav>
  );
};

export default SimplifiedNavigation;
