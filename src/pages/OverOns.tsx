import Navigation from '@/components/Navigation';
import StickyCtaButtons from '@/components/StickyCtaButtons';
import TrustSection from '@/components/TrustSection';
import ContactSection from '@/components/ContactSection';
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
    <div className="min-h-screen bg-background">
      <Navigation />
      <StickyCtaButtons />
      
      <main className="pt-20 pb-16">
        {/* Sectie 1: Visie */}
        <section className="container mx-auto px-4 md:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Links: Titel + Body */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                Waarom wij dit werk doen
              </h1>
              <div className="space-y-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p>
                  We staan altijd aan. Het drukke leven vraagt veel van ons. We over onze eigen grenzen én die van anderen. 
                  We verliezen het contact met wat we ècht nodig hebben. Hierdoor leven we 65% tot 90% op de automatische piloot. 
                  Die automatische piloot trekt ons voort maar ten koste van wat?
                </p>
                <p>
                  Samenwerkingen gaan stroef, we raken energie en focus kwijt en het aantal burn-outs is nog nooit zo hoog geweest.
                </p>
              </div>
            </div>
            
            {/* Rechts: Orange Vision Box */}
            <div className="bg-accent text-accent-foreground rounded-xl p-8 shadow-lg">
              <p className="text-lg md:text-xl font-bold leading-relaxed">
                Wij geloven dat aandachtstraining de kern is van duurzame vitaliteit. Door bewust te worden van onze 
                automatische patronen, creëren we ruimte voor echte verbinding, focus en welzijn. Niet als quick fix, 
                maar als fundamentele vaardigheid die iedereen kan leren.
              </p>
            </div>
          </div>
        </section>

        {/* Sectie 2: Bas's verhaal */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-12 text-center">
              Waarom Bas InnerLeaps is begonnen
            </h2>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Links: Body */}
              <div className="space-y-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p>
                  Hoi, ik ben Bas! Na mijn master Design for Interaction aan de TU Delft werkte ik in consultancy en als 
                  product manager bij een SaaS-bedrijf. Veel mensen in mijn omgeving merkten op dat ik gestresst was. Ja ik 
                  maakte wel eens een foutje en was niet heel scherp maar dan zette ik dit toch ook weer snel recht? Waar 
                  hebben die mensen het toch over?
                </p>
                <p>
                  Toen ik 27 werd kreeg ik hardnekkige lichamelijke klachten. Maar toen een snowboard vakantie eindidige met 
                  een fikse hersenschudding begon mijn verandering.
                </p>
                <p>
                  Ik was opzoek naar wat mijn hersenen wel nog aankonden en stuitte op wetenschappelijk bewijs. Het trainen 
                  van aandacht. Een techniek met 40 jaar wetenschappelijk onderzoek.
                </p>
                <p>
                  Ik begon met het trainen van mijn aandacht en het verschil was enorm: ik merkte stress vroegtijdig op, 
                  creëerde ruimte tussen negatieve gedachten, onderdrukte ongewenst gedrag en kon mij beter concentreren dan 
                  nooit tevoren.
                </p>
                <p>
                  Deze ervaring gun ik iedereen. En omdat er bij bedrijven een duidelijke business case is, zie ik daar mijn 
                  kans om de meeste impact te maken. Daarom ben ik InnerLeaps begonnen. Ik werk samen met trainers om onze 
                  krachten te bundelen. Zij de training en ik de marketing en visie.
                </p>
              </div>
              
              {/* Rechts: Foto + Functie + CTA */}
              <div className="flex flex-col items-center space-y-6">
                <img 
                  src={basPhoto} 
                  alt="Bas ter Haar Romenij - Oprichter InnerLeaps"
                  className="rounded-full w-64 h-64 object-cover shadow-xl"
                />
                <p className="text-xl md:text-2xl font-semibold text-foreground text-center">
                  Oprichter & Algemeen Directeur
                </p>
                <Button 
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1kmdh8c16sdfL2rT3r2bH49IScgjnH-yx3-QStH8VF9ufZBPcwKoL6jfcgLjnRs6iM1KlcXC8i', '_blank')}
                >
                  Plan gesprek met Bas
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Sectie 3: Onze trainers */}
        <section className="container mx-auto px-4 md:px-8 py-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-12 text-center">
            Onze trainers
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer, index) => (
              <div key={index} className="bg-card rounded-xl shadow-lg p-6 space-y-6">
                {/* Naam - full width */}
                <h3 className="text-2xl md:text-3xl font-bold text-card-foreground text-center">
                  {trainer.name}
                </h3>
                
                {/* Internal 2-column grid */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Linker kolom: Foto + Quote + Badge */}
                  <div className="space-y-4 flex flex-col items-center">
                    <img 
                      src={trainer.photo} 
                      alt={trainer.name}
                      className="rounded-full w-32 h-32 object-cover shadow-md"
                    />
                    
                    {/* Quote box */}
                    <div className="bg-muted/50 p-3 rounded-lg border-l-4 border-accent">
                      <p className="text-sm italic text-muted-foreground leading-snug">
                        "{trainer.quote}"
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        — Oud deelnemer
                      </p>
                    </div>
                    
                    {/* VMBN Badge */}
                    <img 
                      src={vmbnBadge} 
                      alt="VMBN Accreditatie"
                      className="h-16 object-contain"
                    />
                  </div>
                  
                  {/* Rechter kolom: Body + Tags */}
                  <div className="space-y-4">
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {trainer.body}
                    </p>
                    
                    {/* Language tags */}
                    <div className="flex gap-2 flex-wrap">
                      {trainer.languages.map((lang, i) => (
                        <span 
                          key={i}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            lang === 'Nederlands' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-secondary text-secondary-foreground'
                          }`}
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Client logos - full width */}
                <div className="flex gap-4 items-center justify-center flex-wrap pt-4 border-t border-border">
                  {trainer.logos.map((logo, i) => (
                    <img 
                      key={i}
                      src={logo.src} 
                      alt={logo.alt}
                      className="h-8 object-contain grayscale hover:grayscale-0 transition-all"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Sectie 4: Trust */}
      <TrustSection />

      {/* Sectie 5: Contact */}
      <ContactSection />
    </div>
  );
};

export default OverOns;
