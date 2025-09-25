import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const YoungProfessionalsSection = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-dark font-heading">
            Je young professionals worstelen. En jij ziet het.
          </h2>
          
          <div className="text-lg md:text-xl text-gray-700 leading-relaxed space-y-6">
            <p>
              Je denkt misschien dat ze lui zijn, verwend of dat het ze aan zelfreflectie ontbreekt. 
              Maar de werkelijke oorzaak ligt dieper. De aandachtsspanne van young professionals is 
              33% lager door de online wereld waar iedereen het altijd beter lijkt te doen. Dit creëert 
              constante prestatiedruk en resulteert in de meeste mentale klachten van alle generaties. 
              Dat vraagt om een wetenschappelijke training in persoonlijk leiderschap.
            </p>
          </div>

          <div className="pt-4">
            <Link to="/programma">
              <Button size="lg" className="bg-brand-orange hover:bg-brand-orange text-brand-orange-light hover:text-brand-orange-light font-semibold py-4 px-8 rounded-lg text-xl shadow-xl">
                Persoonlijk leiderschap voor young professionals
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YoungProfessionalsSection;