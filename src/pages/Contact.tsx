
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Calendar, Mail, Phone, MapPin } from 'lucide-react';
import StickyCtaButtons from '@/components/StickyCtaButtons';
import { useEffect } from 'react';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-gray-light">
      <Navigation />
      <StickyCtaButtons />
      
      <main className="pt-8">
        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="text-center space-y-6 mb-16">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
                Contact
              </h1>
              <p className="text-xl text-brand-gray-medium max-w-3xl mx-auto leading-relaxed">
                Klaar om de eerste stap te zetten naar een gezondere, productievere werkomgeving? Plan een vrijblijvend gesprek en ontdek hoe ons programma uw organisatie kan helpen.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-brand-gray-light p-8 rounded-xl">
                  <h2 className="text-2xl font-bold text-brand-gray-dark mb-6">
                    Neem Contact Op
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-brand-blue text-white p-3 rounded-lg">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-gray-dark">Email</h3>
                        <p className="text-brand-gray-medium">info@halt.academy</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-brand-blue text-white p-3 rounded-lg">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-gray-dark">Telefoon</h3>
                        <p className="text-brand-gray-medium">+31 (0)20 123 4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-brand-blue text-white p-3 rounded-lg">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-gray-dark">KvK</h3>
                        <p className="text-brand-gray-medium">12345678</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-brand-blue to-brand-green text-white p-8 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Waarom een vrijblijvend gesprek?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-lg mr-2">•</span>
                      <span>Analyse van uw huidige verzuim- en retentiecijfers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-lg mr-2">•</span>
                      <span>Berekening van potentiële besparingen</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-lg mr-2">•</span>
                      <span>Op maat gemaakte programmavoorstellen</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-lg mr-2">•</span>
                      <span>Concrete implementatiestrategie</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* CTA Section */}
              <div className="space-y-8">
                <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
                  <div className="text-center space-y-6">
                    <div className="bg-brand-blue text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                      <Calendar className="h-8 w-8" />
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-bold text-brand-gray-dark mb-4">
                        Plan een Vrijblijvend Gesprek
                      </h2>
                      <p className="text-brand-gray-medium mb-6">
                        Ontdek in 30 minuten hoe ons programma uw organisatie kan helpen bij het verlagen van verzuim en verbeteren van retentie.
                      </p>
                    </div>
                    
                    <Button 
                      className="bg-brand-green hover:bg-brand-green-light text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full"
                      onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}
                    >
                      Afspraak Inplannen
                    </Button>
                  </div>
                </div>

                <div className="bg-brand-gray-light p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-brand-gray-dark mb-4">
                    Wat kunt u verwachten?
                  </h3>
                  <ul className="space-y-2 text-brand-gray-medium">
                    <li>• Gespreksduur: 30-45 minuten</li>
                    <li>• Online of op locatie mogelijk</li>
                    <li>• Concrete cijfers en ROI-berekening</li>
                    <li>• Op maat gemaakte aanpak</li>
                    <li>• Geen verplichtingen</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
