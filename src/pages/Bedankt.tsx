import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, TrendingUp, ArrowLeft, Users } from 'lucide-react';
import { useEffect } from 'react';
const Bedankt = () => {
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
  return <div className="min-h-screen bg-gradient-to-br from-brand-blue-light to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-green text-white rounded-full mb-6">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-bold text-brand-gray-dark mb-4">
              Bedankt, {formData.name}!
            </h1>
            
            
          </div>

          {/* Results Card */}
          <Card className="p-8 bg-gradient-to-br from-brand-green to-brand-green-light text-white mb-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              
              <h2 className="text-3xl font-bold">Uw Potentiële Besparing</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl font-bold mb-2">€{results.totalSaving.toLocaleString()}</div>
                  <div className="text-sm opacity-90">Jaarlijkse besparing</div>
                </div>
                <div className="text-center p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl font-bold mb-2">€{results.investment.toLocaleString()}</div>
                  <div className="text-sm opacity-90">Eenmalige investering</div>
                </div>
                <div className="text-center p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl font-bold mb-2">{results.roi}%</div>
                  <div className="text-sm opacity-90">ROI</div>
                </div>
              </div>
              
              <div className="text-center p-6 bg-white/10 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="h-6 w-6" />
                  <span className="text-2xl font-bold">{results.numberOfGroups} groep{results.numberOfGroups !== 1 ? 'en' : ''}</span>
                </div>
                <div className="text-sm opacity-90">Benodigde MBSR-groepen (max. 15 deelnemers per groep)</div>
              </div>
              
              <p className="text-sm opacity-90">
                *Berekening gebaseerd op wetenschappelijk bewezen MBSR resultaten: 24% reductie in werkgerelateerde kosten
              </p>
            </div>
          </Card>

          {/* Call to Action */}
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-brand-gray-dark">
              Klaar om deze resultaten te behalen?
            </h3>
            <p className="text-brand-gray-medium">
              Plan een vrijblijvend gesprek om te bespreken hoe u deze besparingen kunt realiseren met ons bewezen MBSR programma.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-brand-green hover:bg-brand-green-light text-white px-8 py-4 text-lg" onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}>
                Plan een gesprek
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 py-4 text-lg" onClick={() => navigate('/')}>
                <ArrowLeft className="h-5 w-5 mr-2" />
                Terug naar home
              </Button>
            </div>
          </div>

          {/* Additional Information */}
          

          {/* Program Details */}
          <Card className="mt-6 p-6">
            <h4 className="text-lg font-semibold text-brand-gray-dark mb-4">Uw gegevens</h4>
            <div className="grid md:grid-cols-2 gap-4 text-brand-gray-medium">
              <div>
                <p><strong>Aantal deelnemers:</strong> {formData.employees}</p>
                <p><strong>Aantal groepen:</strong> {results.numberOfGroups}</p>
                <p><strong>Programma duur:</strong> 8 weken</p>
              </div>
              <div>
                <p><strong>Investering per groep:</strong> €8.250</p>
                <p><strong>Totale investering:</strong> €{results.investment.toLocaleString()}</p>
                <p><strong>Verwachte ROI:</strong> {results.roi}%</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>;
};
export default Bedankt;