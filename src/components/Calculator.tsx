
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Calculator as CalculatorIcon, TrendingUp, TrendingDown } from 'lucide-react';

const Calculator = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    employees: '',
    yearlyCosts: '',
    currentAbsenteeism: '',
    currentTurnover: ''
  });
  
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    absenteeismSaving: 0,
    turnoverSaving: 0,
    totalSaving: 0,
    roi: 0
  });

  const calculateSavings = () => {
    const employees = parseInt(formData.employees) || 0;
    const yearlyCosts = parseInt(formData.yearlyCosts) || 0;
    const currentAbsenteeism = parseFloat(formData.currentAbsenteeism) || 0;
    const currentTurnover = parseFloat(formData.currentTurnover) || 0;
    
    // Calculate average cost per employee
    const costPerEmployee = yearlyCosts / employees;
    
    // Calculate absenteeism savings (using conservative 20% reduction)
    const absenteeismSaving = (currentAbsenteeism / 100) * yearlyCosts * 0.20;
    
    // Calculate turnover savings (using conservative 20% improvement)
    const turnoverSaving = (currentTurnover / 100) * employees * costPerEmployee * 0.20;
    
    const totalSaving = absenteeismSaving + turnoverSaving;
    
    // Estimate program cost (€800 per employee for 8-week program)
    const programCost = employees * 800;
    const roi = ((totalSaving - programCost) / programCost) * 100;
    
    setResults({
      absenteeismSaving: Math.round(absenteeismSaving),
      turnoverSaving: Math.round(turnoverSaving),
      totalSaving: Math.round(totalSaving),
      roi: Math.round(roi)
    });
    
    setShowResults(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (showResults) {
    return (
      <Card className="p-8 bg-gradient-to-br from-brand-orange to-brand-orange/80 text-white">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <TrendingUp className="h-8 w-8" />
          </div>
          
          <h3 className="text-2xl font-bold">Uw Potentiële Besparing</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/20 rounded-lg">
              <div className="text-3xl font-bold mb-2">€{results.absenteeismSaving.toLocaleString()}</div>
              <div className="text-sm opacity-90">Verzuim reductie</div>
            </div>
            <div className="text-center p-4 bg-white/20 rounded-lg">
              <div className="text-3xl font-bold mb-2">€{results.turnoverSaving.toLocaleString()}</div>
              <div className="text-sm opacity-90">Retentie verbetering</div>
            </div>
            <div className="text-center p-4 bg-white/20 rounded-lg">
              <div className="text-3xl font-bold mb-2">{results.roi}%</div>
              <div className="text-sm opacity-90">ROI binnen 1 jaar</div>
            </div>
          </div>
          
          <div className="text-center p-6 bg-white/10 rounded-lg">
            <div className="text-4xl font-bold mb-2">€{results.totalSaving.toLocaleString()}</div>
            <div className="text-lg">Totale jaarlijkse besparing</div>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm opacity-90">
              *Berekening gebaseerd op wetenschappelijk bewezen resultaten: 19-30% verzuimreductie en 17-31% retentieverbetering
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white hover:bg-white text-brand-orange hover:text-brand-orange"
                onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1wwDnoAHyFrV0M1FxwmbcMa9ewkDxTDdwQObwPKF-WX-wZV9DssZKtb1haoeP5qXDLenQlZt_R', '_blank')}
              >
                Plan een gesprek over deze resultaten
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:text-white hover:border-white hover:bg-transparent"
                onClick={() => setShowResults(false)}
              >
                Nieuwe berekening
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue text-white rounded-full mb-4">
          <CalculatorIcon className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold text-brand-gray-dark mb-2">
          Bereken Uw Potentiële Besparing
        </h3>
        <p className="text-brand-gray-medium">
          Vul uw gegevens in voor een persoonlijke berekening van de ROI
        </p>
      </div>

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
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-brand-gray-dark font-medium">Telefoonnummer *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="mt-1"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="company" className="text-brand-gray-dark font-medium">Bedrijfsnaam *</Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="mt-1"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="employees" className="text-brand-gray-dark font-medium">Aantal medewerkers *</Label>
            <Input
              id="employees"
              type="number"
              value={formData.employees}
              onChange={(e) => handleInputChange('employees', e.target.value)}
              className="mt-1"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="yearlyCosts" className="text-brand-gray-dark font-medium">Totale jaarlijkse loonkosten (€) *</Label>
            <Input
              id="yearlyCosts"
              type="number"
              value={formData.yearlyCosts}
              onChange={(e) => handleInputChange('yearlyCosts', e.target.value)}
              className="mt-1"
              placeholder="bijv. 2500000"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="currentAbsenteeism" className="text-brand-gray-dark font-medium">Huidig verzuimpercentage (%) *</Label>
            <Input
              id="currentAbsenteeism"
              type="number"
              step="0.1"
              value={formData.currentAbsenteeism}
              onChange={(e) => handleInputChange('currentAbsenteeism', e.target.value)}
              className="mt-1"
              placeholder="bijv. 4.2"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="currentTurnover" className="text-brand-gray-dark font-medium">Huidig verlooppercentage (%) *</Label>
            <Input
              id="currentTurnover"
              type="number"
              step="0.1"
              value={formData.currentTurnover}
              onChange={(e) => handleInputChange('currentTurnover', e.target.value)}
              className="mt-1"
              placeholder="bijv. 12.5"
              required
            />
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={calculateSavings}
              className="w-full"
              disabled={!formData.name || !formData.phone || !formData.company || !formData.employees || !formData.yearlyCosts || !formData.currentAbsenteeism || !formData.currentTurnover}
            >
              Bereken Mijn Besparing
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-xs text-brand-gray-medium">
        * Alle velden zijn verplicht. Uw gegevens worden vertrouwelijk behandeld conform onze privacyverklaring.
      </div>
    </Card>
  );
};

export default Calculator;
