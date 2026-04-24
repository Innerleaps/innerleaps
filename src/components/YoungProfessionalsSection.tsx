import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const YoungProfessionalsSection = () => {
  return <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-dark">Je <span className="text-brand-orange">young professionals worstelen</span>.<br />
En jij ziet het.</h2>
          
          <div className="text-xl md:text-2xl text-brand-gray-medium max-w-4xl mx-auto leading-relaxed space-y-6">
            <p>
              Veel mensen denken dat young professionals lui zijn, snel opgeven of te weinig zelfreflectie tonen. Maar de kern ligt dieper. Zij groeien op in een online wereld waar iedereen het beter lijkt te doen, wat leidt tot constante prestatiedruk en een aandachtsspanne die 33% lager is.
            </p>
          </div>

          <div className="pt-4">
            <Link to="/training">
              <Button size="lg" className="bg-brand-blue hover:bg-brand-blue text-white hover:text-white font-semibold py-4 px-8 rounded-lg text-xl shadow-xl">
                Persoonlijk Leiderschap voor Young Professionals
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>;
};
export default YoungProfessionalsSection;