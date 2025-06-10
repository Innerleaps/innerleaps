
import Navigation from '@/components/Navigation';
import StickyCtaButtons from '@/components/StickyCtaButtons';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-gray-light">
      <Navigation />
      <StickyCtaButtons />
      
      <main className="section-padding">
        <div className="container-custom">
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-16">
            <Link to="/" className="inline-flex items-center text-brand-blue hover:text-brand-blue/80 transition-colors mb-8">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Terug naar home
            </Link>
            
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-dark">
                Contact
              </h1>
              <p className="text-xl text-brand-gray-medium leading-relaxed">
                Klaar om de volgende stap te zetten? Neem contact met ons op voor een vrijblijvend gesprek over hoe we uw organisatie kunnen helpen.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-brand-gray-dark mb-6">Neem Contact Op</h2>
                <p className="text-lg text-brand-gray-medium leading-relaxed mb-8">
                  We staan klaar om uw vragen te beantwoorden en u te helpen bij het verbeteren van het welzijn van uw medewerkers. Plan een vrijblijvend gesprek of neem direct contact met ons op.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-blue text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-gray-dark mb-1">Telefoon</h3>
                    <p className="text-brand-gray-medium">+31 (0)20 123 4567</p>
                    <p className="text-sm text-brand-gray-medium">Bereikbaar van maandag t/m vrijdag, 9:00 - 17:00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-green text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-gray-dark mb-1">Email</h3>
                    <p className="text-brand-gray-medium">info@halt.academy</p>
                    <p className="text-sm text-brand-gray-medium">We reageren binnen 24 uur</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-gray-dark mb-1">Adres</h3>
                    <p className="text-brand-gray-medium">
                      Herengracht 123<br />
                      1015 BH Amsterdam<br />
                      Nederland
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-gray-dark mb-1">Openingstijden</h3>
                    <p className="text-brand-gray-medium">
                      Maandag - Vrijdag: 9:00 - 17:00<br />
                      Weekend: Op afspraak
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-brand-gray-dark mb-6">Plan een Vrijblijvend Gesprek</h3>
              <p className="text-brand-gray-medium mb-6">
                Klik op de knop hieronder om direct een afspraak in te plannen in onze agenda. We bespreken uw huidige situatie en tonen u hoe ons programma kan bijdragen aan het welzijn van uw medewerkers en de resultaten van uw organisatie.
              </p>
              
              <div className="space-y-4">
                <div className="bg-brand-gray-light p-4 rounded-lg">
                  <h4 className="font-semibold text-brand-gray-dark mb-2">Wat kunnen we bespreken:</h4>
                  <ul className="space-y-1 text-sm text-brand-gray-medium">
                    <li>• Uw huidige uitdagingen op het gebied van verzuim en retentie</li>
                    <li>• Hoe ons programma kan helpen bij uw specifieke situatie</li>
                    <li>• Een persoonlijke berekening van potentiële besparingen</li>
                    <li>• Praktische implementatie en planning</li>
                    <li>• Antwoorden op al uw vragen</li>
                  </ul>
                </div>

                <Button 
                  size="lg"
                  className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold py-4 px-8 rounded-lg text-lg"
                  onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}
                >
                  Plan Vrijblijvend Gesprek
                </Button>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-16">
            <h2 className="text-3xl font-bold text-brand-gray-dark mb-8 text-center">Veelgestelde Vragen</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-brand-gray-dark mb-2">Hoe lang duurt een kennismakingsgesprek?</h3>
                  <p className="text-brand-gray-medium text-sm">Een kennismakingsgesprek duurt meestal 30-45 minuten. We nemen de tijd om uw situatie goed te begrijpen en alle vragen te beantwoorden.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-brand-gray-dark mb-2">Kunnen jullie bij ons op locatie komen?</h3>
                  <p className="text-brand-gray-medium text-sm">Ja, we kunnen zowel online als op uw locatie een kennismakingsgesprek voeren. De training zelf kan ook in-company worden gegeven.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-brand-gray-dark mb-2">Wat zijn de kosten van het programma?</h3>
                  <p className="text-brand-gray-medium text-sm">De kosten variëren afhankelijk van de groepsgrootte en specifieke behoeften. We bespreken dit graag tijdens het kennismakingsgesprek en maken een passend voorstel.</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-brand-gray-dark mb-2">Hoe snel kunnen we starten?</h3>
                  <p className="text-brand-gray-medium text-sm">Na het akkoord kunnen we meestal binnen 2-4 weken starten, afhankelijk van de planning en beschikbaarheid van deelnemers.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-brand-gray-dark mb-2">Bieden jullie ook vervolgtrajecten aan?</h3>
                  <p className="text-brand-gray-medium text-sm">Ja, we bieden diverse vervolgmodules en opfriscursussen aan om de geleerde vaardigheden te behouden en verder te ontwikkelen.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-brand-gray-dark mb-2">Hoe meten jullie de resultaten?</h3>
                  <p className="text-brand-gray-medium text-sm">We gebruiken voor- en nametingen op gebied van stress, welzijn en verzuim. Ook monitoren we de ROI door verzuim- en retentiecijfers te volgen.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-brand-gray-dark text-white py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">Halt.academy</div>
              <p className="text-gray-300 leading-relaxed">
                Wetenschappelijk bewezen stressreductieprogramma's voor meetbare bedrijfsresultaten.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p>Email: info@halt.academy</p>
                <p>Telefoon: +31 (0)20 123 4567</p>
                <p>KvK: 12345678</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Snel naar</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-gray-300 hover:text-white transition-colors">Home</Link>
                <Link to="/wetenschap" className="block text-gray-300 hover:text-white transition-colors">De Wetenschap</Link>
                <Link to="/programma" className="block text-gray-300 hover:text-white transition-colors">Programma</Link>
                <Link to="/voor-wie" className="block text-gray-300 hover:text-white transition-colors">Voor Wie</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Halt.academy. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
