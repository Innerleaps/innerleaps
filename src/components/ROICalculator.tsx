import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
const ROICalculator = () => {
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    bedrijfsnaam: '',
    verzuimPercentage: '5.2',
    aantalDeelnemers: '15',
    brutoJaarsalaris: '39700'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const calculateROI = () => {
    const deelnemers = parseInt(formData.aantalDeelnemers);
    const salaris = parseFloat(formData.brutoJaarsalaris);
    const verzuimPerc = parseFloat(formData.verzuimPercentage) / 100;

    // Stap 1: Totale Loonkosten
    const totaleLoonkosten = deelnemers * salaris;

    // Stap 2: Verzuimkosten (185% factor volgens Sazas, 2024)
    const verzuimkosten = totaleLoonkosten * verzuimPerc * 1.85;

    // Stap 3: Programmakosten
    const aantalGroepen = Math.ceil(deelnemers / 15);
    const programmakosten = aantalGroepen * 5925;

    // Stap 4: Verzuimbesparing
    const minVerzuimbesparing = verzuimkosten * 0.15;
    const maxVerzuimbesparing = verzuimkosten * 0.21;

    // Stap 5: Terugverdientijd
    const minTerugverdientijd = programmakosten / maxVerzuimbesparing * 12;
    const maxTerugverdientijd = programmakosten / minVerzuimbesparing * 12;

    // Stap 6: ROI Berekening
    const minROI = (minVerzuimbesparing - programmakosten) / programmakosten * 100;
    const maxROI = (maxVerzuimbesparing - programmakosten) / programmakosten * 100;
    return {
      totaleLoonkosten,
      verzuimkosten,
      programmakosten,
      minVerzuimbesparing,
      maxVerzuimbesparing,
      minTerugverdientijd,
      maxTerugverdientijd,
      minROI,
      maxROI,
      showROI: maxROI >= 100
    };
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.naam || !formData.email || !formData.bedrijfsnaam) {
      toast({
        title: "Velden vereist",
        description: "Vul alle verplichte velden in om jouw ROI-analyse te ontvangen.",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const calculationResults = calculateROI();
      const {
        error
      } = await supabase.functions.invoke('send-roi-analysis', {
        body: {
          ...formData,
          calculationResults
        }
      });
      if (error) throw error;
      setIsSubmitted(true);
      toast({
        title: "ROI-analyse verstuurd!",
        description: `Je ontvangt de analyse binnen 1-2 minuten op ${formData.email}`
      });
    } catch (error) {
      console.error('Error sending ROI analysis:', error);
      toast({
        title: "Er ging iets mis",
        description: "Probeer het later opnieuw of neem contact met ons op.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  if (isSubmitted) {
    return <section className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-16 w-16 mx-auto mb-6 text-green-400" />
            <h2 className="text-3xl font-bold mb-4">ROI-analyse verstuurd!</h2>
            <p className="text-xl mb-6">
              Je ontvangt de gepersonaliseerde ROI-analyse binnen 1-2 minuten op <strong>{formData.email}</strong>
            </p>
            <p className="text-white/80">
              Check ook je spam-folder. Heb je vragen? Neem direct contact op met Bas via bas@innerleaps.nl
            </p>
            <Button onClick={() => {
            setIsSubmitted(false);
            setFormData({
              naam: '',
              email: '',
              bedrijfsnaam: '',
              verzuimPercentage: '5.2',
              aantalDeelnemers: '15',
              brutoJaarsalaris: '39700'
            });
          }} className="mt-8 bg-white hover:bg-gray-100 text-brand-blue font-semibold">
              Nieuwe berekening maken
            </Button>
          </div>
        </div>
      </section>;
  }
  return <section className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white section-padding">
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
              Ontvang een gepersonaliseerde ROI-analyse voor het InnerLeaps Life+ programma direct in je mailbox. Gebaseerd op wetenschappelijk onderzoek en jouw specifieke bedrijfssituatie.
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white">
                Jouw bedrijfsgegevens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="naam" className="text-white font-medium">
                      Naam*
                    </Label>
                    <Input id="naam" type="text" value={formData.naam} onChange={e => handleInputChange('naam', e.target.value)} className="bg-white/10 border-white/30 text-white placeholder-white/60" placeholder="Je volledige naam" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium">
                      Email*
                    </Label>
                    <Input id="email" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className="bg-white/10 border-white/30 text-white placeholder-white/60" placeholder="je.email@bedrijf.nl" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bedrijfsnaam" className="text-white font-medium">
                      Bedrijfsnaam*
                    </Label>
                    <Input id="bedrijfsnaam" type="text" value={formData.bedrijfsnaam} onChange={e => handleInputChange('bedrijfsnaam', e.target.value)} className="bg-white/10 border-white/30 text-white placeholder-white/60" placeholder="Je bedrijfsnaam" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="verzuim" className="text-white font-medium">Huidig verzuimpercentage</Label>
                    <Input id="verzuim" type="number" step="0.1" value={formData.verzuimPercentage} onChange={e => handleInputChange('verzuimPercentage', e.target.value)} className="bg-white/10 border-white/30 text-white placeholder-white/60" placeholder="5.2" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deelnemers" className="text-white font-medium">
                      Aantal InnerLeaps deelnemers (default: 15)
                    </Label>
                    <Input id="deelnemers" type="number" value={formData.aantalDeelnemers} onChange={e => handleInputChange('aantalDeelnemers', e.target.value)} className="bg-white/10 border-white/30 text-white placeholder-white/60" placeholder="15" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salaris" className="text-white font-medium">
                      Mediaan bruto jaarsalaris (default: €39.700)
                    </Label>
                    <Input id="salaris" type="number" value={formData.brutoJaarsalaris} onChange={e => handleInputChange('brutoJaarsalaris', e.target.value)} className="bg-white/10 border-white/30 text-white placeholder-white/60" placeholder="39700" required />
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-white/80 mb-6">
                    Ontvang jouw gepersonaliseerde ROI-analyse direct per email
                  </p>
                  <Button type="submit" disabled={isSubmitting} className="text-lg px-8 py-3 bg-white hover:bg-gray-100 text-brand-blue hover:text-brand-blue font-semibold rounded-lg transition-all duration-300 shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50">
                    {isSubmitting ? 'Jouw analyse wordt verstuurd...' : 'Verstuur mijn ROI-analyse'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default ROICalculator;