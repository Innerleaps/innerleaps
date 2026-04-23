import { memo } from "react";
import { Clock, Users, Target, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProgramOverviewSection = memo(() => {
  const features = [
    {
      icon: Clock,
      title: "Wekelijkse groepsworkshops",
      description: "Elke week een groepsworkshop van 60 minuten door één van onze geaccrediteerde trainers.",
    },
    {
      icon: Users,
      title: "Veilig en comfortabel leren",
      description: "In de groep reageren deelnemers op vragen van de trainer, persoonlijke toelichting is optioneel.",
    },
    {
      icon: Target,
      title: "15 minuten oefenen",
      description:
        "Deelnemers proberen 5 dagen per week zo'n 15 minuten te oefenen met ons werkboek en audio opnames.",
    },
    {
      icon: User,
      title: "Geaccrediteerde trainers",
      description:
        "Al onze trainers zijn geaccrediteerd voor categorie 1 aandachtstraining door VMBN.",
    },
  ];
  return (
    <section className="section-padding bg-brand-off-white">
      <div className="container-custom space-y-12">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-brand-purple">
          De <span className="text-brand-orange">vitaliteitstaining</span> voor échte{" "}
          <span className="text-brand-orange">gedragsverandering</span>
        </h2>

        {/* Intro tekst */}
        <div className="max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed text-center">
            Ons kernprogramma duurt 6 weken. Vraag naar de mogelijkheden voor maatwerk.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-xl space-y-4 text-center">
                <div className="w-14 h-14 bg-brand-orange/10 rounded-lg flex items-center justify-center mx-auto">
                  <Icon className="w-7 h-7 text-brand-orange" />
                </div>
                <h3 className="text-2xl font-bold text-brand-purple">{feature.title}</h3>
                <p className="text-xl text-brand-gray-medium leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Methode CTA - Over volledige breedte gecentreerd */}
        <div className="text-center pt-4 lg:pt-12 space-y-6">
          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed py-[16px] px-0">
            Wil je nog meer weten over onze methode?
          </p>
          <Link to="/de-methode">
            <Button variant="secondary" className="font-semibold py-3 px-8 rounded-lg text-base md:text-lg">
              Ontdek de methode
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
});

ProgramOverviewSection.displayName = "ProgramOverviewSection";

export default ProgramOverviewSection;
