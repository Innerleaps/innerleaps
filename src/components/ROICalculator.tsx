import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ROICalculator = () => {
  const [formData, setFormData] = useState({
    verzuimPercentage: '5.2',
    aantalDeelnemers: '15',
    brutoJaarsalaris: '39700',
    bedrijfsnaam: '',
    email: '',
    telefoon: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.bedrijfsnaam || !formData.email) {
      toast({
        title: "Velden vereist",
        description: "Vul alle verplichte velden in om uw ROI-berekening te ontvangen.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your backend
    toast({
      title: "ROI-berekening aangevraagd",
      description: "U ontvangt de berekening binnen enkele minuten per email.",
    });
    
    // Reset form
    setFormData({
      verzuimPercentage: '5.2',
      aantalDeelnemers: '15',
      brutoJaarsalaris: '39700',
      bedrijfsnaam: '',
      email: '',
      telefoon: ''
    });
  };

  return (
    <section className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Calculator className="h-4 w-4 mr-2" />
              ROI Calculator
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bereken jouw ROI: van investering naar rendement
            </h2>
            
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white/90">
              Hoeveel bespaart het Life+ programma jouw organisatie? Onze ROI-calculator toont de concrete financiële impact op basis van jouw huidige verzuimcijfers. Met een verzuimreductie van 15-21% en bewezen resultaten bereik je een ROI tussen 145% en 203% binnen één jaar.
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white">
                Bereken jouw besparing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="verzuim" className="text-white font-medium">
                      Huidig verzuimpercentage* (gemiddeld 5,2%)
                    </Label>
                    <Input
                      id="verzuim"
                      type="number"
                      step="0.1"
                      value={formData.verzuimPercentage}
                      onChange={(e) => handleInputChange('verzuimPercentage', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder-white/60"
                      placeholder="5.2"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deelnemers" className="text-white font-medium">
                      Aantal deelnemers* (aanbevolen: 15 personen)
                    </Label>
                    <Input
                      id="deelnemers"
                      type="number"
                      value={formData.aantalDeelnemers}
                      onChange={(e) => handleInputChange('aantalDeelnemers', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder-white/60"
                      placeholder="15"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salaris" className="text-white font-medium">
                      Gemiddeld bruto jaarsalaris* (€39.700 gemiddeld)
                    </Label>
                    <Input
                      id="salaris"
                      type="number"
                      value={formData.brutoJaarsalaris}
                      onChange={(e) => handleInputChange('brutoJaarsalaris', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder-white/60"
                      placeholder="39700"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="bedrijf" className="text-white font-medium">
                      Bedrijfsnaam*
                    </Label>
                    <Input
                      id="bedrijf"
                      type="text"
                      value={formData.bedrijfsnaam}
                      onChange={(e) => handleInputChange('bedrijfsnaam', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder-white/60"
                      placeholder="Uw bedrijfsnaam"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium">
                      Email*
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder-white/60"
                      placeholder="uw.email@bedrijf.nl"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefoon" className="text-white font-medium">
                      Telefoonnummer
                    </Label>
                    <Input
                      id="telefoon"
                      type="tel"
                      value={formData.telefoon}
                      onChange={(e) => handleInputChange('telefoon', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder-white/60"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-white/80 mb-6">
                    Ontvang direct jouw ROI-berekening per email
                  </p>
                  <Button
                    type="submit"
                    className="text-lg px-8 py-3 bg-white hover:bg-gray-100 text-brand-blue hover:text-brand-blue font-semibold rounded-lg transition-all duration-300 shadow-lg transform hover:-translate-y-0.5"
                  >
                    Bereken mijn ROI
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;