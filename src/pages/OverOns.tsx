import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import StickyCtaButtons from "@/components/StickyCtaButtons";
import TrustSection from "@/components/TrustSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

// Trainer photos
import basPhoto from "@/assets/Vitaliteitstrainer_Bas_Ter_Haar_Romenij.png";
import winekePhoto from "@/assets/Vitaliteitstrainer_Wineke_van_Aken.png";
import annePhoto from "@/assets/Vitaliteitstrainer_Anne_Linnebank.png";
import davePhoto from "@/assets/Vitaliteitstrainer_Dave_Hoppema.png";
import jacquelinePhoto from "@/assets/Vitaliteitstrainer_Jacqueline_Henock.png";

// Badges
import vmbnBadge from "@/assets/Aaccreditatie_voor_Vitaliteitsprogramma.png";
import waaromWijAfbeelding from "@/assets/waarom_wij_dit_werk_doen.png";

// Wineke's logos
import winekeOliverLogo from "@/assets/Vitaliteitsprogramma_Oliver_Wyman.png";
import winekeSygnificLogo from "@/assets/Vitaliteitsprogramma_Sygnific.png";
import winekeCordaanLogo from "@/assets/Vitaliteitsprogramma_Cordaan.png";
import winekeGemeenteLogo from "@/assets/Vitaliteitsprogramma_Gemeente_Den_Haag.png";
import winekeSpiritLogo from "@/assets/Vitaliteitsprogramma_Spirit.png";
import winekeVULogo from "@/assets/Vitaliteitsprogramma_VU_amsterdam.png";
import winekeLeaseLogo from "@/assets/Vitaliteitsprogramma_Leaseplan.png";
import winekeTele2Logo from "@/assets/Vitaliteitsprogramma_Tele2.png";

// Dave's logos
import daveParnassiaLogo from "@/assets/Vitaliteitsprogramma_Parnassia_groep.png";
import daveLentizLogo from "@/assets/Vitaliteitsprogramma_Lentiz.png";
import davePrimoLogo from "@/assets/Vitaliteitsprogramma_primo-2.png";
import daveMinisterieLogo from "@/assets/Vitaliteitsprogramma_Ministerie_van_justitie_en_veiligheid-2.png";
import daveYouTalentLogo from "@/assets/Vitaliteitsprogramma_You_Talent-3.png";
import daveRijksLogo from "@/assets/Vitaliteitsprogramma_Rijkswaterstaat-3.png";
import davePolitieLogo from "@/assets/Vitaliteitsprogramma_Politite-4.png";

// Anne's logos
import dhlLogo from "@/assets/Vitaliteitsprogramma_DHL-2.png";
import affiniusLogo from "@/assets/Vitaliteitsprogramma_Affinius_Capital-2.png";

// Jacqueline's logos
import jacquelineGGZLogo from "@/assets/Vitaliteitsprogramma_GGZ_centraal.png";
import jacquelineHumanitasLogo from "@/assets/Vitaliteitsprogramma_Humanitas.png";
import jacquelinePlevierLogo from "@/assets/Vitaliteitsprogramma_Plevier.png";
import jacquelineCarelLogo from "@/assets/Vitaliteitsprogramma_Carel_Lurvink.png";
import jacquelinePALogo from "@/assets/Vitaliteitsprogramma_PA_consulting-3.png";
import jacquelineNobelLogo from "@/assets/Vitaliteitsprogramma_nobel_recruitment-3.png";
import jacquelineHollandLogo from "@/assets/Vitaliteitsprogramma_Holland_Colours-3.png";

const OverOns = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const trainers = [
    {
      name: "Wineke van Aken",
      photo: winekePhoto,
      languages: ["Nederlands", "Engels"],
      body: "Wineke is al 15 jaar actief als trainer en heeft in die rol trainingen gegeven bij onder andere Tele2 Leaseplan, VU en Gemeente Den Haag. Voordat Wineke trainer werd, werkte zij 17 jaar in commerciële en zakelijke functies, waaronder als projectmanager, marketing- en communicatieadviseur en consultant.",
      quote:
        "Wineke heeft een praktische, nuchtere aanpak met concrete handvatten. Ik kan nu afstand nemen, stresssignalen sneller herkennen, efficiënter werken en ben meer tevreden over mijn resultaten.",
      logos: [
        { src: winekeOliverLogo, alt: "Vitaliteitsprogramma Oliver Wyman" },
        { src: winekeSygnificLogo, alt: "Vitaliteitsprogramma Sygnific" },
        { src: winekeCordaanLogo, alt: "Vitaliteitsprogramma Cordaan" },
        { src: winekeGemeenteLogo, alt: "Vitaliteitsprogramma Gemeente Den Haag" },
        { src: winekeSpiritLogo, alt: "Vitaliteitsprogramma Spirit" },
        { src: winekeVULogo, alt: "Vitaliteitsprogramma VU Amsterdam" },
        { src: winekeLeaseLogo, alt: "Vitaliteitsprogramma Leaseplan" },
        { src: winekeTele2Logo, alt: "Vitaliteitsprogramma Tele2" },
      ],
    },
    {
      name: "Dave Hoppema",
      photo: davePhoto,
      languages: ["Nederlands", "Engels"],
      body: "Dave trainer met 8 jaar ervaring en gaf trainingen bij o.a. Rijkswaterstaat, Nationale Politie, het Ministerie van Justitie en Veiligheid, Parnassia Groep en diverse onderwijs- en talentorganisaties. Daarvoor werkte hij 15 jaar als redacteur en contentmanager.",
      quote:
        "betrokken, open en vriendelijk, met duidelijke uitleg. Doordat hij zijn eigen ervaringen deelt, voelt de training toegankelijk en mag ik 'fouten maken'.",
      logos: [
        { src: daveParnassiaLogo, alt: "Vitaliteitsprogramma Parnassia Groep" },
        { src: daveLentizLogo, alt: "Vitaliteitsprogramma Lentiz" },
        { src: davePrimoLogo, alt: "Vitaliteitsprogramma Primo" },
        { src: daveMinisterieLogo, alt: "Vitaliteitsprogramma Ministerie van Justitie en Veiligheid" },
        { src: daveYouTalentLogo, alt: "Vitaliteitsprogramma You Talent" },
        { src: daveRijksLogo, alt: "Vitaliteitsprogramma Rijkswaterstaat" },
        { src: davePolitieLogo, alt: "Vitaliteitsprogramma Politie" },
      ],
    },
    {
      name: "Anne Linnebank",
      photo: annePhoto,
      languages: ["Nederlands", "Engels"],
      body: "Anne is een ervaren en gecertificeerde trainer met 8 jaar ervaring en heeft trainingen gegeven bij onder andere DHL en Affinius Capital. Daarvoor werkte ze 15 jaar in marketing- en communicatiefuncties bij BAT en Ziggo.",
      quote:
        "Anne begrijpt mij echt. Haar kennis weet ze op een leuke en makkelijke manier uit te leggen. Ik voel mij productiver en gelukkiger dan ooit!",

      logos: [
        { src: dhlLogo, alt: "Vitaliteitsprogramma DHL" },
        { src: affiniusLogo, alt: "Vitaliteitsprogramma Affinius Capital" },
      ],
    },
    {
      name: "Jacqueline Henock",
      photo: jacquelinePhoto,
      languages: ["Nederlands"],
      body: "Jacqueline is begonnen als trainer in 2017 en werkte onder andere met Holland Colours, Carel Lurvink, PA Consulting, Nobel Recruitment, Humanitas en GGZ Centraal. Haar eerdere carrière omvat o.a. rollen als eigenaar van een automatiseringsbedrijf en HR-manager, manager zorgprocessen én freelance organisatieadviseur.",
      quote:
        "Jacqueline weet precies hoe ze theorie en ervaring laat samenkomen. Haar begeleiding is persoonlijk, doordacht en professioneel.",
      logos: [
        { src: jacquelineGGZLogo, alt: "Vitaliteitsprogramma GGZ Centraal" },
        { src: jacquelineHumanitasLogo, alt: "Vitaliteitsprogramma Humanitas" },
        { src: jacquelinePlevierLogo, alt: "Vitaliteitsprogramma Plevier Speciaal Onderwijs" },
        { src: jacquelineCarelLogo, alt: "Vitaliteitsprogramma Carel Lurvink Industry" },
        { src: jacquelinePALogo, alt: "Vitaliteitsprogramma PA Consulting" },
        { src: jacquelineNobelLogo, alt: "Vitaliteitsprogramma Nobel Recruitment" },
        { src: jacquelineHollandLogo, alt: "Vitaliteitsprogramma Holland Colours" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SimplifiedNavigation />
      <StickyCtaButtons />

      <main>
        {/* Sectie 1: Visie & Missie */}
        <section className="section-padding bg-brand-off-white">
          <div className="container-custom">
            {/* Titel bovenaan, volle breedte */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight mb-8 text-center">
              <span className="text-brand-orange">Waarom</span> wij dit werk doen
            </h1>

            {/* Grid met 2 kolommen: Links body, rechts oranje blok */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Links: Body tekst */}
              <div className="space-y-6 text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                <p>
                  Waar zijn je <strong>gedachten</strong> tijdens je werk of dat momentje waar je wilde ontspannen? Bij
                  je volgende meeting, je to-do lijst, dat lastige gesprek. Je werkgeheugen loopt vol.{" "}
                  <strong>Spanning</strong> stapelt zich op. Onbewust, zo schakelt het grootste deel van ons gedrag over
                  op de <strong>automatische piloot</strong>. Je overschrijdt je grenzen zonder het door te hebben. Je
                  verliest contact met wat je echt nodig hebt om <strong>effectief</strong> te zijn.
                </p>

                <p>
                  Wij én de wetenschap weten dat dit anders kan. Door je <strong>controlecentrum</strong> en{" "}
                  <strong>waarschuwingssysteem</strong> te trainen, herken je stressignalen voordat ze escaleren. Je
                  doorbreekt de automatische piloot. Je neemt de controle terug.
                </p>

                <p>
                  Zo creëren we <strong>ruimte voor innerlijke sprongen</strong>. Ruimte waarin mensen met rust, focus
                  en lef hun potentieel leven. Waarin bewuste keuzes de plek innemen van automatische reacties. Dat is
                  waarom we dit werk doen.
                </p>
              </div>

              {/* Rechts: Oranje blok met missie + afbeelding */}
              <div className="space-y-8">
                <div className="bg-brand-orange text-white rounded-xl p-8 lg:p-10 shadow-lg">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                    Wij creëren ruimte voor innerlijke sprongen, zodat mensen met rust, focus en lef hun potentieel
                    leven.
                  </p>
                </div>

                <img
                  src={waaromWijAfbeelding}
                  alt="Bas ter Haar Romenij geeft presentatie over vitaliteit en stressmanagement bij InnerLeaps"
                  className="w-full h-auto rounded-xl shadow-lg"
                  loading="lazy"
                  width="608"
                  height="405"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sectie 2: Onze trainers */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight mb-12 text-center">
              Onze <span className="text-brand-orange">geaccrediteerde</span> trainers
            </h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
              {trainers.map((trainer, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
                  {/* Naam - full width */}
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-purple text-center">{trainer.name}</h3>

                  {/* Grid layout: foto links, quote rechts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Linker kolom: Foto + Badge & Talen horizontaal */}
                    <div className="space-y-4 flex flex-col items-center">
                      <img
                        src={trainer.photo}
                        alt={`Vitaliteitstrainer ${trainer.name}`}
                        className="rounded-full w-40 h-40 object-cover shadow-md"
                      />

                      {/* VMBN Badge en Talen naast elkaar */}
                      <div className="flex gap-4 items-center justify-center flex-wrap">
                        <img
                          src={vmbnBadge}
                          alt="VMBN Geaccrediteerde Vitaliteitstrainer"
                          className="h-16 object-contain"
                        />
                        <div className="flex gap-2 flex-wrap">
                          {trainer.languages.map((lang, langIndex) => (
                            <span
                              key={langIndex}
                              className="px-3 py-1 rounded-full text-sm font-medium bg-brand-orange text-white"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Rechter kolom: Quote */}
                    <div className="flex items-start">
                      <div className="bg-brand-off-white p-4 rounded-lg border-l-4 border-brand-orange h-full flex items-center">
                        <p className="text-base md:text-lg italic text-brand-gray-medium leading-snug">
                          "{trainer.quote}"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Body tekst - full width onder de grid */}
                  <div className="pt-4 border-t border-brand-gray-light">
                    <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">{trainer.body}</p>
                  </div>

                  {/* Client logos - full width */}
                  <div className="flex gap-5 items-center justify-center pt-4 border-t border-brand-gray-light flex-wrap">
                    {trainer.logos.map((logo, i) => (
                      <img key={i} src={logo.src} alt={logo.alt} className="h-[50px] object-contain" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sectie 3: Bas's verhaal */}
        <section className="section-padding bg-brand-off-white">
          <div className="container-custom">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight mb-12 text-center">
              Waarom Bas <span className="text-brand-orange">InnerLeaps</span> is begonnen
            </h2>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Links: Body */}
              <div className="space-y-4 text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                <p>
                  Hoi, ik ben Bas. Na mijn <strong>universitaire master</strong> Design for Interaction aan de{" "}
                  <strong>TU Delft</strong> werkte ik in consultancy en als productmanager bij een SaaS-bedrijf.
                </p>
                <p>
                  Naast mijn werk met grote ambities houd ik van sporten. Helaas niet zonder gevaren, want mijn
                  snowboardvakantie eindigde met een fikse <strong>hersenschudding</strong>.
                </p>
                <p>
                  Tijdens mijn herstel verdiepte ik mij in de hersenen en ontdekte ik dat ik die kan trainen. Het was
                  bizar, ik stuite op een berg van <strong>40 jaar wetenschappelijk onderzoek</strong>.
                </p>
                <p>
                  Terug op werk merkte ik het verschil:{" "}
                  <strong>minder stress, betere concentratie, meer controle</strong> over gedrag en gedachten, en een
                  productiviteit die ik nooit eerder kende. <strong>Die ervaring wil ik delen</strong>. Daarom richtte
                  ik InnerLeaps op.
                </p>
              </div>

              {/* Rechts: Foto + Functie + CTA */}
              <div className="flex flex-col items-center space-y-6">
                <img
                  src={basPhoto}
                  alt="Vitaliteitstrainer Bas ter Haar Romenij | Oprichter InnerLeaps"
                  className="rounded-full w-64 h-64 object-cover shadow-xl"
                />
                <p className="text-xl md:text-2xl font-semibold text-brand-purple text-center">
                  Bas ter Haar Romenij | Oprichter
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto font-semibold py-4 px-6 lg:px-8 rounded-lg text-lg lg:text-xl"
                  onClick={() =>
                    window.open(
                      "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1kmdh8c16sdfL2rT3r2bH49IScgjnH-yx3-QStH8VF9ufZBPcwKoL6jfcgLjnRs6iM1KlcXC8i",
                      "_blank",
                    )
                  }
                >
                  Plan gesprek met Bas
                </Button>
              </div>
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
