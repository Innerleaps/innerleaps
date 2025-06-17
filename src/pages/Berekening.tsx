
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TrendingUp, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import CalculationResultsComponent from '@/components/CalculationResults';

const Berekening = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    results,
    formData
  } = location.state || {};

  useEffect(() => {
    // Redirect to home if no data is provided
    if (!results || !formData) {
      navigate('/');
    }
  }, [results, formData, navigate]);

  if (!results || !formData) {
    return null;
  }

  const openCalendar = () => {
    window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue-light to-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-brand-green text-white rounded-full mb-6">
              <TrendingUp className="h-8 w-8 md:h-10 md:w-10" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-brand-gray-dark mb-4">
              De besparing van {formData.company}
            </h1>
          </div>

          {/* Results Display */}
          <CalculationResultsComponent results={results} formData={formData} />

          {/* Call to Action */}
          <div className="text-center space-y-6 mt-8 md:mt-12">
            <h3 className="text-xl md:text-2xl font-bold text-brand-gray-dark">
              Klaar om deze resultaten te behalen?
            </h3>
            <p className="text-brand-gray-medium text-base">
              Plan een vrijblijvend gesprek om te bespreken hoe u deze besparingen kunt realiseren met ons bewezen MBSR programma.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-brand-green hover:bg-brand-green-light text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg" 
                onClick={openCalendar}
              >
                Plan een gesprek
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg" 
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Terug naar home
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA Button rechtsonderin */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40">
        <Button 
          onClick={openCalendar}
          className="bg-brand-green hover:bg-brand-green-light text-white font-semibold py-3 md:py-5 px-4 md:px-8 rounded-lg text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Plan een gesprek
        </Button>
      </div>
    </div>
  );
};

export default Berekening;
