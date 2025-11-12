import { Clock, Users, Target, Sliders } from "lucide-react";

const ProgramOverviewSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Workshops",
      description: "6 groepworkshops van 60 minuten door één van onze geaccrediteerde trainers.",
    },
    {
      icon: Sliders,
      title: "Opbouw",
      description:
        "Systematische opbouw van automatische patronen herkennen naar bewust handelen en integratie in het dagelijks leven.",
    },
    {
      icon: Users,
      title: "Veilige setting",
      description:
        "Deelnemers houden controle.  Ze reageren op vragen van de trainer met het opsteken van handen.  Persoonlijke toelichting is optioneel.",
    },
    {
      icon: Target,
      title: "Dagelijks oefenen",
      description: "Deelnemers oefenen dagelijks zo'n 15 minuten om echte gedragsverandering te realiseren.",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom space-y-12">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-brand-purple">
          Het <span className="text-brand-orange">programma</span> voor echte{" "}
          <span className="text-brand-orange">gedragsverandering</span>
        </h2>

        {/* Intro tekst */}
        <div className="max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed text-center">
            Ons wetenschappelijke kernprogramma duurt 6 weken. Vraag naar de mogelijkheden voor maatwerk.
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
      </div>
    </section>
  );
};

export default ProgramOverviewSection;
