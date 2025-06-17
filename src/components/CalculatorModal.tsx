
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calculator as CalculatorIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { calculateSavings, CalculationFormData } from '@/utils/calculationUtils';
import CalculationForm from './CalculationForm';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalculatorModal = ({
  isOpen,
  onClose
}: CalculatorModalProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CalculationFormData>({
    name: '',
    phone: '',
    functie: '',
    company: '',
    employees: '',
    avgEmployeeCosts: '',
    currentAbsenteeism: '',
    currentTurnover: ''
  });
  const [dataConfirmed, setDataConfirmed] = useState(false);

  const handleCalculate = () => {
    const results = calculateSavings(formData);

    // Navigate to berekening page with results
    navigate('/berekening', {
      state: {
        results: results,
        formData: formData
      }
    });

    // Close the modal
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetCalculator = () => {
    setFormData({
      name: '',
      phone: '',
      functie: '',
      company: '',
      employees: '',
      avgEmployeeCosts: '',
      currentAbsenteeism: '',
      currentTurnover: ''
    });
    setDataConfirmed(false);
  };

  const handleClose = () => {
    resetCalculator();
    onClose();
  };

  const isFormValid = formData.name && formData.functie && formData.company && formData.employees && formData.avgEmployeeCosts && formData.currentAbsenteeism && formData.currentTurnover && dataConfirmed;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Bereken Uw Potentiële Besparing</DialogTitle>
        </DialogHeader>

        <Card className="p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue text-white rounded-full mb-4">
              <CalculatorIcon className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-brand-gray-dark mb-2">
              Bereken Uw Potentiële Besparing
            </h3>
            <p className="text-brand-gray-medium text-base">
              Vul uw gegevens in voor een persoonlijke berekening van de ROI
            </p>
          </div>

          <CalculationForm
            formData={formData}
            onFormDataChange={handleInputChange}
            dataConfirmed={dataConfirmed}
            onDataConfirmedChange={setDataConfirmed}
            onSubmit={handleCalculate}
            isFormValid={!!isFormValid}
          />
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default CalculatorModal;
