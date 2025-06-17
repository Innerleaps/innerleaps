
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
      
      <main className="pt-6 md:pt-8">
        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="text-center space-y-4 md:space-y-6 mb-12 md:mb-16">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
                Contact
              </h1>
              <p className="text-lg md:text-xl text-brand-gray-medium max-w-3xl mx-auto leading-relaxed">
                Klaar om de eerste stap te zetten naar een gezondere, productievere werkomgeving? Plan een vrijblijvend gesprek en ontdek hoe ons programma uw organisatie kan helpen.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Contact Information */}
              <div className="space-y-6 md:space-y-8">
                <div className="bg-brand-gray-light p-6 md:p-8 rounded-xl">
                  <h2 className="text-xl md:text-2xl font-bold text-brand-gray-dark mb-4 md:mb-6">
                    Neem Contact Op
                  </h2>
                  
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-start space-x-3 md:space-x-4">
                      <div className="bg-brand-blue text-white p-2 md:p-3 rounded-lg flex-shrink-0">
                        <Mail className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-gray-dark text-base">Email</h3>
                        <p className="text-brand-gray-medium text-base">info@halt.academy</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 md:space-x-4">
                      <div className="bg-brand-blue text-white p-2 md:p-3 rounded-lg flex-shrink-0">
                        <Phone className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-gray-dark text-base">Telefoon</h3>
                        <p className="text-brand-gray-medium text-base">+31 (0)20 123 4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 md:space-x-4">
                      <div className="bg-brand-blue text-white p-2 md:p-3 rounded-lg flex-shrink-0">
                        <MapPin className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-gray-dark text-base">KvK</h3>
                        <p className="text-brand-gray-medium text-base">12345678</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-brand-blue to-brand-green text-white p-6 md:p-8 rounded-xl">
                  <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Waarom een vrijblijvend gesprek?</h3>
                  <ul className="space-y-2 md:space-y-3">
                    <li className="flex items-start text-sm md:text-base">
                      <span className="text-lg mr-2">•</span>
                      <span>Analyse van uw huidige verzuim- en retentiecijfers</span>
                    </li>
                    <li className="flex items-start text-sm md:text-base">
                      <span className="text-lg mr-2">•</span>
                      <span>Berekening van potentiële besparingen</span>
                    </li>
                    <li className="flex items-start text-sm md:text-base">
                      <span className="text-lg mr-2">•</span>
                      <span>Op maat gemaakte programmavoorstellen</span>
                    </li>
                    <li className="flex items-start text-sm md:text-base">
                      <span className="text-lg mr-2">•</span>
                      <span>Concrete implementatiestrategie</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* CTA Section */}
              <div className="space-y-6 md:space-y-8">
                <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-xl shadow-sm">
                  <div className="text-center space-y-4 md:space-y-6">
                    <div className="bg-brand-blue text-white p-3 md:p-4 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto">
                      <Calendar className="h-6 w-6 md:h-8 md:w-8" />
                    </div>
                    
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-brand-gray-dark mb-3 md:mb-4">
                        Plan een Vrijblijvend Gesprek
                      </h2>
                      <p className="text-brand-gray-medium mb-4 md:mb-6 text-base">
                        Ontdek in 30 minuten hoe ons programma uw organisatie kan helpen bij het verlagen van verzuim en verbeteren van retentie.
                      </p>
                    </div>
                    
                    <Button 
                      className="bg-brand-green hover:bg-brand-green-light text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full"
                      onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}
                    >
                      Afspraak Inplannen
                    </Button>
                  </div>
                </div>

                <div className="bg-brand-gray-light p-4 md:p-6 rounded-xl">
                  <h3 className="text-base md:text-lg font-semibold text-brand-gray-dark mb-3 md:mb-4">
                    Wat kunt u verwachten?
                  </h3>
                  <ul className="space-y-1 md:space-y-2 text-brand-gray-medium">
                    <li className="text-sm md:text-base">• Gespreksduur: 30-45 minuten</li>
                    <li className="text-sm md:text-base">• Online of op locatie mogelijk</li>
                    <li className="text-sm md:text-base">• Concrete cijfers en ROI-berekening</li>
                    <li className="text-sm md:text-base">• Op maat gemaakte aanpak</li>
                    <li className="text-sm md:text-base">• Geen verplichtingen</li>
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
