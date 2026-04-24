import { Link } from "react-router-dom";
import { Activity, Brain, BookOpen, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TEXT_SHADOW_STRONG } from "@/styles/common";
import masterclassBg from "@/assets/masterclass-audience.jpg";

interface MasterclassSectionProps {
  variant: "employee" | "employer";
}

const MasterclassSection = ({ variant }: MasterclassSectionProps) => {
  const isEmployee = variant === "employee";

  const subcopy = isEmployee
    ? "Ben je geïnteresseerd maar wil je eerst onze methode ervaren? Dat kan! Met onze Masterclass maak je in 60 minuten kennis met onze aanpak."
    : "Ben je geïnteresseerd maar wil je eerst checken of de methode aansluit bij jullie team? Dat kan! Met onze Masterclass maakt jouw organisatie in 60 minuten kennis met onze aanpak.";

  const cards = [
    {
      icon: Activity,
      title: "Stress level",
      text: isEmployee
        ? "Krijg inzicht in jouw stress level. Volledig wetenschappelijk onderbouwd."
        : "Medewerkers krijgen inzicht in hun stress level. Volledig wetenschappelijk onderbouwd.",
    },
    {
      icon: Brain,
      title: "Aandachtoefening",
      text: isEmployee
        ? "Ervaar een techniek om controle over je autopiloot te krijgen en focus terug te pakken."
        : "Medewerkers ervaren een techniek om controle over hun autopiloot te krijgen en focus terug te pakken.",
    },
    {
      icon: BookOpen,
      title: "Reset tool",
      text: isEmployee
        ? "Leer een tool om je werkgeheugen te resetten en aandacht direct terug te pakken."
        : "Medewerkers leren een tool om hun werkgeheugen te resetten en aandacht direct terug te pakken.",
    },
    {
      icon: Award,
      title: "Vrijblijvend",
      text:
        "Wij geloven dat iedereen onze effectieve techniek moet kunnen proberen. Daarom is onze masterclass vrijblijvend.",
    },
  ];

  return (
    <section id="masterclass" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background image + overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={masterclassBg}
          alt="Deelnemers tijdens een Innerleaps masterclass"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-brand-purple/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight mb-6"
          style={TEXT_SHADOW_STRONG}
        >
          Ervaar het met onze <span className="text-brand-orange">vrijblijvende masterclass</span>.
        </h2>
        <p
          className="text-xl md:text-2xl text-white text-center leading-relaxed mb-12 max-w-4xl mx-auto"
          style={TEXT_SHADOW_STRONG}
        >
          {subcopy}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
          {cards.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="bg-white border border-border p-6 rounded-xl space-y-4 shadow-lg"
            >
              <div className="p-3 rounded-lg bg-brand-orange w-fit mx-auto">
                <Icon className="h-10 w-10 text-white stroke-2" />
              </div>
              <h3 className="text-xl font-bold text-brand-purple text-center">
                {title}
              </h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Employee-only review */}
        {isEmployee && (
          <div className="max-w-3xl mx-auto mb-10 text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-brand-orange text-brand-orange" />
              ))}
            </div>
            <p
              className="text-lg md:text-xl text-white italic leading-relaxed"
              style={TEXT_SHADOW_STRONG}
            >
              "Deze workshop laat je duidelijk het belang zien van het trainen van je aandachtsspier.
              De workshop bestaat uit een mooie mix tussen oefeningen en theorie, waardoor je gelijk
              al wat ervaring opdoet. Denk dat iedereen hier wat aan heeft, dus kan dit zeker
              aanbevelen."
            </p>
          </div>
        )}

        <div className="text-center">
          {isEmployee ? (
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white py-4 px-8 rounded-lg text-lg md:text-xl font-semibold shadow-xl"
              >
                Masterclass aanvragen bij Bas
              </Button>
            </Link>
          ) : (
            <Button
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white py-4 px-8 rounded-lg text-lg md:text-xl font-semibold shadow-xl"
              onClick={() => window.open("https://innerleaps.nl/Calendar", "_blank")}
            >
              Kennismaken met Bas
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default MasterclassSection;
