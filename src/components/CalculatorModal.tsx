
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calculator as CalculatorIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalculatorModal = ({ isOpen, onClose }: CalculatorModalProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    functie: '',
    company: '',
    employees: '',
    yearlyCosts: '',
    currentAbsenteeism: '',
    currentTurnover: ''
  });
  
  const [dataConfirmed, setDataConfirmed] = useState(false);

  const calculateSavings = () => {
    const employees = parseInt(formData.employees) || 0;
    const yearlyCosts = parseInt(formData.yearlyCosts) || 0;
    const currentAbsenteeism = parseFloat(formData.currentAbsenteeism) || 0;
    const currentTurnover = parseFloat(formData.currentTurnover) || 0;
    
    // Calculate cost per employee
    const costPerEmployee = yearlyCosts / employees;
    
    // Calculate savings using old formula
    const absenteeismSaving = (currentAbsenteeism / 100) * yearlyCosts * 0.30;
    const turnoverSaving = (currentTurnover / 100) * employees * costPerEmployee * 0.31;
    const totalSaving = absenteeismSaving + turnoverSaving;
    
    // Calculate program cost (€800 per employee)
    const programCost = employees * 800;
    
    // Calculate ROI
    const roi = programCost > 0 ? ((totalSaving - programCost) / programCost) * 100 : 0;
    
    // Calculate number of groups (for display purposes, max 15 per group)
    const numberOfGroups = Math.ceil(employees / 15);
    
    const results = {
      totalSaving: Math.round(totalSaving),
      investment: programCost,
      roi: Math.round(roi),
      numberOfGroups: numberOfGroups
    };
    
    // Navigate to bedankt page with results
    navigate('/bedankt', { 
      state: { 
        results: results,
        formData: formData 
      } 
    });
    
    // Close the modal
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetCalculator = () => {
    setFormData({
      name: '',
      phone: '',
      functie: '',
      company: '',
      employees: '',
      yearlyCosts: '',
      currentAbsenteeism: '',
      currentTurnover: ''
    });
    setDataConfirmed(false);
  };

  const handleClose = () => {
    resetCalculator();
    onClose();
  };

  const isFormValid = formData.name && formData.functie && formData.company && 
                     formData.employees && formData.yearlyCosts && formData.currentAbsenteeism && 
                     formData.currentTurnover && dataConfirmed;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Bereken Uw Potentiële Besparing</DialogTitle>
        </DialogHeader>

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

          <div className="space-y-8">
            {/* Persoonsinformatie section */}
            <div>
              <h4 className="text-lg font-semibold text-brand-gray-dark mb-4">Persoonsinformatie:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-brand-gray-dark font-medium">Naam *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1"
                    placeholder="Jan Janssen"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-brand-gray-dark font-medium">Telefoonnummer</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1"
                    placeholder="06 12345678"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="functie" className="text-brand-gray-dark font-medium">Functie *</Label>
                  <Input
                    id="functie"
                    type="text"
                    value={formData.functie}
                    onChange={(e) => handleInputChange('functie', e.target.value)}
                    className="mt-1"
                    placeholder="HR Manager"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Bedrijfsgegevens section */}
            <div>
              <h4 className="text-lg font-semibold text-brand-gray-dark mb-4">Bedrijfsgegevens:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company" className="text-brand-gray-dark font-medium">Bedrijfsnaam *</Label>
                  <Input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="mt-1"
                    placeholder="Uw Bedrijf B.V."
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
                    placeholder="50"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="yearlyCosts" className="text-brand-gray-dark font-medium">Totale jaarlijkse loonkosten (€) *</Label>
                  <Input
                    id="yearlyCosts"
                    type="number"
                    value={formData.yearlyCosts}
                    onChange={(e) => handleInputChange('yearlyCosts', e.target.value)}
                    className="mt-1"
                    placeholder="2500000"
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
                    placeholder="4.2"
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
                    placeholder="12.5"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Data confirmation checkbox */}
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="dataConfirmed"
                checked={dataConfirmed}
                onCheckedChange={(checked) => setDataConfirmed(checked === true)}
              />
              <Label htmlFor="dataConfirmed" className="text-sm text-brand-gray-dark leading-relaxed">
                Ik bevestig dat ik akkoord ga met het delen van deze gegevens en wil mijn potentiële besparing berekenen
              </Label>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={calculateSavings}
                className="w-full btn-primary"
                disabled={!isFormValid}
              >
                Ontvang Mijn Besparing
              </Button>
            </div>
          </div>
          
          <div className="mt-6 text-xs text-brand-gray-medium">
            * Verplichte velden. Uw gegevens worden vertrouwelijk behandeld conform onze privacyverklaring.
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default CalculatorModal;
