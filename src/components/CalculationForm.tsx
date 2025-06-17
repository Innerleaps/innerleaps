
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CalculationFormData } from '@/utils/calculationUtils';

interface CalculationFormProps {
  formData: CalculationFormData;
  onFormDataChange: (field: string, value: string) => void;
  dataConfirmed: boolean;
  onDataConfirmedChange: (confirmed: boolean) => void;
  onSubmit: () => void;
  isFormValid: boolean;
}

const CalculationForm = ({
  formData,
  onFormDataChange,
  dataConfirmed,
  onDataConfirmedChange,
  onSubmit,
  isFormValid
}: CalculationFormProps) => {
  return (
    <div className="space-y-8">
      {/* Persoonsinformatie section */}
      <div>
        <h4 className="text-lg font-semibold text-brand-gray-dark mb-4">Persoonsinformatie:</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-brand-gray-dark font-medium text-base">Naam *</Label>
            <Input 
              id="name" 
              type="text" 
              value={formData.name} 
              onChange={e => onFormDataChange('name', e.target.value)} 
              className="mt-1 text-base" 
              placeholder={!formData.name ? "Jan Janssen" : ""} 
              required 
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-brand-gray-dark font-medium text-base">Telefoonnummer</Label>
            <Input 
              id="phone" 
              type="tel" 
              value={formData.phone} 
              onChange={e => onFormDataChange('phone', e.target.value)} 
              className="mt-1 text-base" 
              placeholder={!formData.phone ? "06 12345678" : ""} 
            />
          </div>
          
          <div className="md:col-span-2">
            <Label htmlFor="functie" className="text-brand-gray-dark font-medium text-base">Functie *</Label>
            <Input 
              id="functie" 
              type="text" 
              value={formData.functie} 
              onChange={e => onFormDataChange('functie', e.target.value)} 
              className="mt-1 text-base" 
              placeholder={!formData.functie ? "HR Manager" : ""} 
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
            <Label htmlFor="company" className="text-brand-gray-dark font-medium text-base">Bedrijfsnaam *</Label>
            <Input 
              id="company" 
              type="text" 
              value={formData.company} 
              onChange={e => onFormDataChange('company', e.target.value)} 
              className="mt-1 text-base" 
              placeholder={!formData.company ? "Uw Bedrijf B.V." : ""} 
              required 
            />
          </div>
          
          <div>
            <Label htmlFor="employees" className="text-brand-gray-dark font-medium text-base">Aantal medewerkers *</Label>
            <Input 
              id="employees" 
              type="number" 
              value={formData.employees} 
              onChange={e => onFormDataChange('employees', e.target.value)} 
              className="mt-1 text-base" 
              placeholder={!formData.employees ? "50" : ""} 
              required 
            />
          </div>
          
          <div>
            <Label htmlFor="avgEmployeeCosts" className="text-brand-gray-dark font-medium text-base">Gemiddelde werkgeverskosten per medewerker per jaar (€) *</Label>
            <Input 
              id="avgEmployeeCosts" 
              type="number" 
              value={formData.avgEmployeeCosts} 
              onChange={e => onFormDataChange('avgEmployeeCosts', e.target.value)} 
              className="mt-1 text-base" 
              placeholder={!formData.avgEmployeeCosts ? "50000" : ""} 
              required 
            />
          </div>
          
          <div>
            <Label htmlFor="currentAbsenteeism" className="text-brand-gray-dark font-medium text-base">Huidig verzuimpercentage (%) *</Label>
            <Input 
              id="currentAbsenteeism" 
              type="number" 
              step="0.1" 
              value={formData.currentAbsenteeism} 
              onChange={e => onFormDataChange('currentAbsenteeism', e.target.value)} 
              className="mt-1 text-base" 
              placeholder={!formData.currentAbsenteeism ? "4.2" : ""} 
              required 
            />
          </div>
          
          <div>
            <Label htmlFor="currentTurnover" className="text-brand-gray-dark font-medium text-base">Huidig verlooppercentage (%) *</Label>
            <Input 
              id="currentTurnover" 
              type="number" 
              step="0.1" 
              value={formData.currentTurnover} 
              onChange={e => onFormDataChange('currentTurnover', e.target.value)} 
              className="mt-1 text-base" 
              placeholder={!formData.currentTurnover ? "12.5" : ""} 
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
          onCheckedChange={checked => onDataConfirmedChange(checked === true)} 
          className="border-2 border-brand-blue data-[state=checked]:bg-brand-green data-[state=checked]:border-brand-green" 
        />
        <Label htmlFor="dataConfirmed" className="text-base text-brand-gray-dark leading-relaxed">
          Ik bevestig dat ik akkoord ga met het delen van deze gegevens en wil mijn potentiële besparing berekenen
        </Label>
      </div>
      
      <div className="pt-4">
        <Button 
          onClick={onSubmit} 
          disabled={!isFormValid} 
          className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white text-base"
        >
          Ontvang Mijn Besparing
        </Button>
      </div>
      
      <div className="mt-6 text-sm text-brand-gray-medium">
        * Verplichte velden. Uw gegevens worden vertrouwelijk behandeld conform onze privacyverklaring.
      </div>
    </div>
  );
};

export default CalculationForm;
