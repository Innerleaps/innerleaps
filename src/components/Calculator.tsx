import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Calculator as CalculatorIcon } from 'lucide-react';
import { calculateMBSRSavings, CalculationInputs } from '@/utils/calculationEngine';

const Calculator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    employees: '',
    avgEmployeeCosts: '',
    currentAbsenteeism: '',
    currentTurnover: ''
  });

  const calculateAndNavigate = () => {
    const inputs: CalculationInputs = {
      employees: parseInt(formData.employees) || 0,
      avgEmployeeCosts: parseInt(formData.avgEmployeeCosts) || 0,
      currentAbsenteeism: parseFloat(formData.currentAbsenteeism) || 0,
      currentTurnover: parseFloat(formData.currentTurnover) || 0,
    };

    const results = calculateMBSRSavings(inputs);

    navigate('/berekening', {
      state: {
        results,
        formData
      }
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
          <CalculatorIcon className="h-8 w-8 text-brand-orange stroke-2" />
        </div>
        <h3 className="text-2xl font-bold text-brand-gray-dark mb-2">
          Bereken Je Potentiële Besparing
        </h3>
        <p className="text-brand-gray-medium">
          Vul je gegevens in voor een persoonlijke berekening van de ROI over 3 scenario's
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
            <Label htmlFor="employees" className="text-brand-gray-dark font-medium">Aantal deelnemers *</Label>
            <Input
              id="employees"
              type="number"
              value={formData.employees}
              onChange={(e) => handleInputChange('employees', e.target.value)}
              className="mt-1"
              placeholder="15"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="avgEmployeeCosts" className="text-brand-gray-dark font-medium">Gemiddeld bruto jaarsalaris (€) *</Label>
            <Input
              id="avgEmployeeCosts"
              type="number"
              value={formData.avgEmployeeCosts}
              onChange={(e) => handleInputChange('avgEmployeeCosts', e.target.value)}
              className="mt-1"
              placeholder="39700"
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
              placeholder="5.2"
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
              placeholder="10"
              required
            />
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={calculateAndNavigate}
              className="w-full"
              disabled={!formData.name || !formData.phone || !formData.company || !formData.employees || !formData.avgEmployeeCosts || !formData.currentAbsenteeism || !formData.currentTurnover}
            >
              Bereken Mijn Besparing
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-xs text-brand-gray-medium">
        * Alle velden zijn verplicht. Je gegevens worden vertrouwelijk behandeld conform onze privacyverklaring.
      </div>
    </Card>
  );
};

export default Calculator;
