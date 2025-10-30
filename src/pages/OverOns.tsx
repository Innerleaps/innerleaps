import Navigation from '@/components/Navigation';
import StickyCtaButtons from '@/components/StickyCtaButtons';
import TrustSection from '@/components/TrustSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

// Trainer photos
import basPhoto from '@/assets/Oprichter_Innerleaps_Bas_Ter_Haar_Romenij.png';
import annePhoto from '@/assets/Geaccrediteerde_Vitaliteitstrainer_Anne_Linnebank.png';
import davePhoto from '@/assets/Geaccrediteerde_Vitaliteitstrainer_Dave_Hoppema.png';
import jacquelinePhoto from '@/assets/Geaccrediteerde_Vitaliteitstrainer_Jacqueline.png';

// Badges
import vmbnBadge from '@/assets/Aaccreditatie_voor_Vitaliteitsprogramma.png';

// Client logos
import dhlLogo from '@/assets/Vitaliteitsprogramma_ervaring_met_DHL.png';
import affiniusLogo from '@/assets/Vitaliteitsprogramma_ervaring_met_affinius_capital.png';
import rijksLogo from '@/assets/Vitaliteitsprogramma_ervaring_met_Rijkswaterstaat.png';
import politieLogo from '@/assets/Vitaliteitsprogramma_Politie.png';
import youTalentLogo from '@/assets/Vitaliteitsprogramma_ervaring_met_You_Talent.png';
import nobelLogo from '@/assets/Vitaliteitsprogramma_ervaring_met_Nobel_recruitment.png';
import paLogo from '@/assets/Vitaliteitsprogramma_ervaring_met_PA_consulting.png';
import hollandLogo from '@/assets/Vitaliteitsprogramma_ervaring_met_Holland_Colours.png';

const OverOns = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const trainers = [
    {
      name: 'Anne Katelijne Limbeek',
      photo: annePhoto,
      languages: ['Nederlands', 'Engels'],
      body: 'Anne is een ervaren en gecertificeerde trainer met 8 jaar ervaring en heeft trainingen gegeven bij onder andere DHL en Affinius Capital. Daarvoor werkte ze 15 jaar in marketing- en communicatiefuncties bij BAT en Ziggo.',
      quote: 'Anne snapt mij en weet haar kennis op een makkelijke manier uit te leggen!',
      logos: [
        { src: dhlLogo, alt: 'Vitaliteitsprogramma DHL' },
        { src: affiniusLogo, alt: 'Vitaliteitsprogramma Affinius Capital' }
      ]
    },
    {
      name: 'Dave Hoppema',
      photo: davePhoto,
      languages: ['Nederlands', 'Engels'],
      body: 'Dave trainer met 8 jaar ervaring en gaf trainingen bij o.a. Rijkswaterstaat, Nationale Politie, het Ministerie van Justitie en Veiligheid, Parnassia Groep en diverse onderwijs- en talentorganisaties. Daarvoor werkte hij 15 jaar als redacteur en contentmanager.',
      quote: 'betrokken, open en vriendelijk, met duidelijke uitleg. Doordat hij zijn eigen ervaringen deelt, voelt de training toegankelijk en mag ik \'fouten maken\'.',
      logos: [
        { src: rijksLogo, alt: 'Vitaliteitsprogramma Rijkswaterstaat' },
        { src: politieLogo, alt: 'Vitaliteitsprogramma Politie' },
        { src: youTalentLogo, alt: 'Vitaliteitsprogramma You Talent' }
      ]
    },
    {
      name: 'Jacqueline Heneck',
      photo: jacquelinePhoto,
      languages: ['Nederlands'],
      body: 'Jacqueline is begonnen als trainer in 2017 en werkte onder andere met Holland Colours, Carel Lurvink, PA Consulting, Nobel Recruitment, Humanitas en GGZ Centraal. Haar eerdere carrière omvat o.a. rollen als eigenaar van een automatiseringsbedrijf en HR-manager, manager zorgprocessen én freelance organisatieadviseur.',
      quote: 'Jacqueline weet precies hoe ze theorie en ervaring laat samenkomen. Haar begeleiding is persoonlijk, doordacht en professioneel.',
      logos: [
        { src: nobelLogo, alt: 'Vitaliteitsprogramma Nobel Recruitment' },
        { src: paLogo, alt: 'Vitaliteitsprogramma PA Consulting' },
        { src: hollandLogo, alt: 'Vitaliteitsprogramma Holland Colours' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <StickyCtaButtons />
      
      <main>
      {/* Sectie 1: Visie & Missie */}
      <section className="section-padding bg-brand-off-white">
        <div className="container-custom">
          {/* Titel bovenaan, volle breedte */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight mb-8 text-center">
            Waarom wij dit werk doen
          </h1>
          
          {/* Grid met 2 kolommen: Links body, rechts oranje blok */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Links: Body tekst */}
            <div className="space-y-6 text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              <p>
                We staan altijd aan. Het drukke leven vraagt veel van ons. We over onze eigen grenzen én die van anderen. 
                We verliezen het contact met wat we ècht nodig hebben. Hierdoor leven we 65% tot 90% op de automatische piloot. 
                Die automatische piloot trekt ons voort maar ten koste van wat?
              </p>
              <p>
                Samenwerkingen gaan stroef, we raken energie en focus kwijt en het aantal burn-outs is nog nooit zo hoog geweest.
              </p>
            </div>
            
            {/* Rechts: Oranje blok met missie */}
            <div className="bg-brand-orange text-white rounded-xl p-8 lg:p-10 shadow-lg">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                Onze missie is dat mensen met rust, focus en plezier door het leven gaan, door mentale scherpte te vergroten en spanning, stress en druk te doorbreken.
              </p>
            </div>
          </div>
        </div>
      </section>

        {/* Sectie 2: Bas's verhaal */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight mb-12 text-center">
              Waarom Bas <span className="text-brand-orange">InnerLeaps</span> is begonnen
            </h2>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Links: Body */}
              <div className="space-y-4 text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                <p>
                  Hoi, ik ben Bas. Na mijn master Design for Interaction aan de TU Delft werkte ik in consultancy en als productmanager bij een SaaS-bedrijf. Mijn ambities waren groot, maar dat bracht ook veel spanning en druk.
                </p>
                <p>
                  Op mijn 27e kreeg ik hardnekkige lichamelijke klachten en een snowboardvakantie eindigde met een flinke hersenschudding. Dat werd mijn keerpunt.
                </p>
                <p>
                  Tijdens mijn herstel ontdekte ik dat ik mijn aandacht kon trainen, een techniek gebaseerd op 40 jaar wetenschappelijk onderzoek. Toen ik weer ging werken, was het verschil groot: ik herkende stress sneller, creëerde ruimte tussen negatieve gedachten, onderdrukte ongewenst gedrag en kon me beter concentreren dan ooit.
                </p>
                <p>
                  Die ervaring wil ik iedereen gunnen. Omdat er bij bedrijven een duidelijke business case is, richt ik mij daar op. Zo ontstond InnerLeaps. Ik zorg voor visie en marketing, trainers verzorgen de trainingen, samen maken we maximale impact.
                </p>
              </div>
              
              {/* Rechts: Foto + Functie + CTA */}
              <div className="flex flex-col items-center space-y-6">
                <img 
                  src={basPhoto} 
                  alt="Bas ter Haar Romenij - Oprichter InnerLeaps"
                  className="rounded-full w-64 h-64 object-cover shadow-xl"
                />
                <p className="text-xl md:text-2xl font-semibold text-brand-purple text-center">
                  Oprichter & Algemeen Directeur
                </p>
                <Button 
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto font-semibold"
                  onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1kmdh8c16sdfL2rT3r2bH49IScgjnH-yx3-QStH8VF9ufZBPcwKoL6jfcgLjnRs6iM1KlcXC8i', '_blank')}
                >
                  Plan gesprek met Bas
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Sectie 3: Onze trainers */}
        <section className="section-padding bg-brand-off-white">
          <div className="container-custom">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight mb-12 text-center">
              Onze <span className="text-brand-orange">trainers</span>
            </h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
              {trainers.map((trainer, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
                  {/* Naam - full width */}
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-purple text-center">
                    {trainer.name}
                  </h3>
                  
                  {/* Internal 2-column grid */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Linker kolom: Foto + Quote + Badge */}
                    <div className="space-y-4 flex flex-col items-center">
                      <img 
                        src={trainer.photo} 
                        alt={trainer.name}
                        className="rounded-full w-40 h-40 object-cover shadow-md"
                      />
                      
                      {/* Quote box */}
                      <div className="bg-brand-off-white p-4 rounded-lg border-l-4 border-brand-orange">
                        <p className="text-base md:text-lg italic text-brand-gray-medium leading-snug">
                          "{trainer.quote}"
                        </p>
                        <p className="text-sm text-brand-gray-medium mt-2">
                          — Oud deelnemer
                        </p>
                      </div>
                      
                      {/* VMBN Badge */}
                      <img 
                        src={vmbnBadge} 
                        alt="VMBN Accreditatie"
                        className="h-20 object-contain"
                      />
                    </div>
                    
                    {/* Rechter kolom: Body + Tags */}
                    <div className="space-y-4">
                      <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                        {trainer.body}
                      </p>
                      
                      {/* Language tags */}
                      <div className="flex gap-2 flex-wrap">
                        {trainer.languages.map((lang, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1 rounded-full text-sm font-medium bg-brand-orange text-white"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Client logos - full width */}
                  <div className="flex gap-4 items-center justify-center pt-4 border-t border-brand-gray-light overflow-x-auto">
                    {trainer.logos.map((logo, i) => (
                      <img 
                        key={i}
                        src={logo.src} 
                        alt={logo.alt}
                        className="h-16 md:h-20 lg:h-24 object-contain flex-shrink-0"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Sectie 4: Trust */}
      <TrustSection />

      {/* Sectie 5: Contact */}
      <ContactSection />

      {/* Sectie 6: Footer */}
      <Footer />
    </div>
  );
};

export default OverOns;
