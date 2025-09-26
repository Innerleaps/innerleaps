import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ProgramSection = () => {
  return (
    <section className="bg-white section-padding">
      <div className="container-custom">
        <div className="text-center space-y-8">
          <div className="pt-4">
            <Link to="/programma">
              <Button size="lg" className="bg-brand-blue hover:bg-brand-blue text-white hover:text-white font-semibold py-4 px-8 rounded-lg text-xl shadow-xl">
                Persoonlijk leiderschap voor young professionals
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;