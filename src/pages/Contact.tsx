
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You would typically send this to your backend
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefoon",
      details: ["+31 (0)20 123 4567", "Ma-Vr: 09:00 - 17:00"]
    },
    {
      icon: Mail,
      title: "Email", 
      details: ["info@halt.academy", "Reactie binnen 24 uur"]
    },
    {
      icon: MapPin,
      title: "Locatie",
      details: ["Amsterdam, Nederland", "Landelijk werkzaam"]
    },
    {
      icon: Clock,
      title: "Beschikbaarheid",
      details: ["Maandag - Vrijdag", "09:00 - 17:00"]
    }
  ];

  const faqs = [
    {
      question: "Hoe snel kunnen we starten?",
      answer: "Na onze kennismaking kunnen we meestal binnen 2-4 weken starten, afhankelijk van uw planning en groepsgrootte."
    },
    {
      question: "Wat zijn de kosten?",
      answer: "Onze programma's starten vanaf €800 per deelnemer voor het volledige 8-weekse programma. We bieden ook groepskortingen."
    },
    {
      question: "Kunnen jullie op locatie komen?",
      answer: "Ja, we verzorgen trainingen zowel op uw locatie als in onze eigen trainingsfaciliteiten, wat voor u het beste uitkomt."
    },
    {
      question: "Hoe meten jullie de resultaten?",
      answer: "We gebruiken voor- en nametingen, verzuimdata en tevredenheidsenquêtes om de impact van het programma te monitoren."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Back to home button */}
      <div className="container-custom pt-8">
        <Link to="/">
          <Button variant="outline" className="mb-8 transform hover:-translate-y-1 transition-all duration-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Terug naar home
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
              <Mail className="h-10 w-10" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Neem <span className="text-brand-green-light">Contact</span> Op
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Klaar om uw organisatie te transformeren? We helpen u graag bij het vinden van de juiste 
              mindfulness oplossing voor uw team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-brand-gray-light">
        <div className="container-custom">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
              Meerdere Manieren om Contact op te Nemen
            </h2>
            <p className="text-xl text-brand-gray-medium max-w-3xl mx-auto">
              Kies de manier die het beste bij u past
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue text-white rounded-full">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-brand-gray-dark">
                        {info.title}
                      </h3>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-brand-gray-medium text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
                Stuur ons een Bericht
              </h2>
              <p className="text-xl text-brand-gray-medium">
                Vertel ons over uw uitdagingen en we nemen zo snel mogelijk contact met u op
              </p>
            </div>

            <Card className="p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-brand-gray-dark font-medium">Naam *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="mt-1"
                        placeholder="Uw volledige naam"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-brand-gray-dark font-medium">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="mt-1"
                        placeholder="uw.email@bedrijf.nl"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="company" className="text-brand-gray-dark font-medium">Bedrijf *</Label>
                      <Input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="mt-1"
                        placeholder="Uw bedrijfsnaam"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-brand-gray-dark font-medium">Telefoon</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="mt-1"
                        placeholder="06 12345678"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-brand-gray-dark font-medium">Bericht *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="mt-1 min-h-[120px]"
                    placeholder="Vertel ons over uw uitdagingen, aantal medewerkers, en wat u hoopt te bereiken met mindfulness training..."
                    required
                  />
                </div>

                <div className="text-center">
                  <Button 
                    type="submit"
                    className="bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold py-4 px-8 text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    disabled={!formData.name || !formData.email || !formData.company || !formData.message}
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Verstuur Bericht
                  </Button>
                  <p className="text-xs text-brand-gray-medium mt-4">
                    * Verplichte velden. We nemen binnen 24 uur contact met u op.
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Scheduling CTA */}
      <section className="section-padding bg-brand-green text-white">
        <div className="container-custom">
          <Card className="bg-white/10 backdrop-blur-sm p-12 text-center border-0">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <CheckCircle className="h-8 w-8" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold">
                Liever Direct een Afspraak?
              </h2>
              
              <p className="text-xl opacity-90 leading-relaxed">
                Plan direct een vrijblijvend kennismakingsgesprek van 30 minuten
              </p>
              
              <Button 
                className="bg-white text-brand-green hover:bg-gray-100 font-semibold py-4 px-8 text-lg transform hover:-translate-y-1 transition-all duration-300"
                onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}
              >
                Plan Kennismakingsgesprek
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-brand-gray-light">
        <div className="container-custom">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gray-dark">
              Veelgestelde Vragen
            </h2>
            <p className="text-xl text-brand-gray-medium max-w-3xl mx-auto">
              Antwoorden op de meest gestelde vragen over onze programma's
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-brand-gray-dark">
                    {faq.question}
                  </h3>
                  <p className="text-brand-gray-medium leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
