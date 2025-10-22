import { Clock, Users, Target } from 'lucide-react';

const ProgramOverviewSection = () => {
  const features = [
    {
      icon: Clock,
      title: 'Wekelijkse workshops',
      description: 'Wekelijks een workshop van 60 of 90 minuten door een van onze geaccrediteerde trainers, op locatie of online.',
    },
    {
      icon: Users,
      title: 'Veilige setting',
      description: 'Groepen van maximaal 15 deelnemers. Leren door te reageren op concrete vragen in plaats van persoonlijke verhalen delen.',
    },
    {
      icon: Target,
      title: 'Dagelijks oefenen',
      description: 'Deelnemers proberen dagelijks 15 minuten te oefenen voor echte gedragsverandering.',
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom space-y-12">
        {/* Intro tekst */}
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
            Een wetenschappelijk bewezen traject van 6 weken dat jouw team veerkrachtiger maakt. Het programma bouwt systematisch op: van het herkennen van stress signalen naar bewust handelen in plaats van automatisch reageren. Elke week focust op een ander aspect, van het loskomen van de automatische piloot tot duurzame implementatie in het dagelijks leven.
          </p>
          <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
            Het programma is deels aan te passen naar thema's die bij jouw organisatie spelen: gezond pauzeren, piekeren, perfectionisme, werk-privé balans of communicatie. Vraag naar de mogelijkheden.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-xl space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-brand-orange/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-7 h-7 text-brand-orange" />
                </div>
                <h3 className="text-2xl font-bold text-brand-purple">
                  {feature.title}
                </h3>
                <p className="text-xl text-brand-gray-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramOverviewSection;
