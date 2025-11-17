import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Trust logos
import vgzLogo from "@/assets/Vitaliteitprogramma_herkent_door_vgz.png";
import oxfordLogo from "@/assets/Vitaliteitsprogramma_ontwikkeld_door_oxford.jpg";
import vmbLogo from "@/assets/Geaccrediteerde_vitaliteitstrainers_bij_Innerleaps.png";
interface MasterclassFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface FormData {
  naam: string;
  email: string;
  is_leidinggevende: boolean | null;
  functie_titel: string;
  selected_timeslot: string;
}
const timeslots = [{
  id: '2024-11-12T16:00:00',
  display: 'Woensdag, 12 november 16:00 – 17:00',
  calendarUrl: 'https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=NGFjNmZhYWdzcmQyZzllOXB0cjJvZTlidjIgYmFzQGlubmVybGVhcHMubmw&tmsrc=bas%40innerleaps.nl'
}, {
  id: '2024-11-12T19:30:00',
  display: 'Woensdag, 12 november 19:30 – 20:30',
  calendarUrl: 'https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=NTlnanZndWsyOTk1Zmw4cTBkNTl1N2ZvcTEgYmFzQGlubmVybGVhcHMubmw&tmsrc=bas%40innerleaps.nl'
}];

// Declare gtag for Google Analytics
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, any>) => void;
  }
}
const MasterclassFormModal = ({
  isOpen,
  onClose
}: MasterclassFormModalProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    naam: "",
    email: "",
    is_leidinggevende: null,
    functie_titel: "",
    selected_timeslot: ""
  });
  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.naam.trim()) {
      toast({
        title: "Fout",
        description: "Vul je naam in",
        variant: "destructive"
      });
      return;
    }
    if (!formData.email.trim()) {
      toast({
        title: "Fout",
        description: "Vul je email in",
        variant: "destructive"
      });
      return;
    }
    if (formData.is_leidinggevende === null) {
      toast({
        title: "Fout",
        description: "Geef aan of je leidinggevende bent",
        variant: "destructive"
      });
      return;
    }
    if (!formData.functie_titel.trim()) {
      toast({
        title: "Fout",
        description: "Vul je functie titel in",
        variant: "destructive"
      });
      return;
    }
    if (!formData.selected_timeslot) {
      toast({
        title: "Fout",
        description: "Kies een masterclass tijdstip",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const selectedTimeslot = timeslots.find(t => t.id === formData.selected_timeslot);
      if (!selectedTimeslot) {
        throw new Error("Invalid timeslot selected");
      }

      // Track form submission
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'conversion', {
          event_category: 'Masterclass',
          event_label: 'Form Submitted',
          selected_time: selectedTimeslot.display,
          is_leader: formData.is_leidinggevende
        });
      }

      // Submit to edge function
      const {
        error
      } = await supabase.functions.invoke('submit-masterclass-registration', {
        body: {
          naam: formData.naam,
          email: formData.email,
          is_leidinggevende: formData.is_leidinggevende,
          functie_titel: formData.functie_titel,
          selected_timeslot: formData.selected_timeslot,
          timeslot_display: selectedTimeslot.display,
          calendar_url: selectedTimeslot.calendarUrl
        }
      });
      if (error) {
        console.error("Submission error:", error);
        toast({
          title: "Fout",
          description: "Er ging iets mis. Probeer het opnieuw.",
          variant: "destructive"
        });
        return;
      }

      // Success - redirect to thank you page
      navigate('/masterclass-bedankt', {
        state: {
          timeslot: selectedTimeslot.display,
          calendarUrl: selectedTimeslot.calendarUrl,
          naam: formData.naam
        }
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Fout",
        description: "Er ging iets mis. Probeer het opnieuw.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-bold text-brand-purple text-center">
            Aanmelden Gratis Masterclass
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-0">
          {/* Review Badge */}
          <div className="bg-brand-blue-light/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2 justify-center">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <span className="font-semibold text-brand-gray-dark">4,7 / 5</span>
            </div>
            <p className="text-sm text-brand-gray-dark italic text-center leading-relaxed">
              "Deze workshop laat je duidelijk het belang zien van het trainen van je aandachtsspier."
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Naam */}
            <div className="space-y-2">
              <Label htmlFor="naam" className="text-base font-semibold">
                Naam <span className="text-red-500">*</span>
              </Label>
              <input id="naam" type="text" value={formData.naam} onChange={e => handleInputChange('naam', e.target.value)} placeholder="Volledige naam" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange placeholder:text-gray-400" required />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold">
                Email <span className="text-red-500">*</span>
              </Label>
              <input id="email" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} placeholder="je.email@voorbeeld.nl" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange placeholder:text-gray-400" required />
            </div>

            {/* Leidinggevende */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">
                Heb je een leidinggevende functie? <span className="text-red-500">*</span>
              </Label>
              <RadioGroup value={formData.is_leidinggevende === null ? undefined : formData.is_leidinggevende.toString()} onValueChange={value => handleInputChange('is_leidinggevende', value === 'true')} className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="leader-yes" />
                  <Label htmlFor="leader-yes" className="cursor-pointer font-normal">Ja</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="leader-no" />
                  <Label htmlFor="leader-no" className="cursor-pointer font-normal">Nee</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Functie Titel */}
            <div className="space-y-2">
              <Label htmlFor="functie" className="text-base font-semibold">
                Functie titel <span className="text-red-500">*</span>
              </Label>
              <input id="functie" type="text" value={formData.functie_titel} onChange={e => handleInputChange('functie_titel', e.target.value)} placeholder="Bijv. HR Manager, Developer, etc." className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange placeholder:text-gray-400" required />
            </div>

            {/* Timeslot Selection */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">
                Kies je masterclass tijdstip <span className="text-red-500">*</span>
              </Label>
              <RadioGroup value={formData.selected_timeslot} onValueChange={value => handleInputChange('selected_timeslot', value)} className="space-y-3">
                {timeslots.map(timeslot => <div key={timeslot.id} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={timeslot.id} id={timeslot.id} />
                    <Label htmlFor={timeslot.id} className="cursor-pointer font-normal flex-1">
                      {timeslot.display}
                    </Label>
                  </div>)}
              </RadioGroup>
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={isSubmitting} className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white py-4 px-8 rounded-lg text-lg font-semibold shadow-xl">
              {isSubmitting ? 'Bezig met aanmelden...' : 'Aanmelden gratis masterclass'}
            </Button>
          </form>

          {/* Trust Indicators */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-brand-gray-medium font-semibold mb-6">
              ─── Vertrouwd door ───
            </p>
            
            <div className="space-y-4">
              {/* VGZ */}
              <div className="flex flex-col items-center text-center">
                <p className="text-sm font-semibold text-brand-gray-dark mb-2">
                  🏥 Methode erkend door Nederlandse zorg
                </p>
                <img src={vgzLogo} alt="VGZ" className="h-10 object-contain opacity-80" />
              </div>

              {/* Oxford */}
              <div className="flex flex-col items-center text-center">
                <p className="text-sm font-semibold text-brand-gray-dark mb-2">
                  🎓 40 jaar wetenschappelijk
                </p>
                <img src={oxfordLogo} alt="Oxford University" className="h-10 object-contain opacity-80" />
              </div>

              {/* VMBN */}
              <div className="flex flex-col items-center text-center">
                <p className="text-sm font-semibold text-brand-gray-dark mb-2">
                  ✅ VMBN gecertificeerd
                </p>
                <img src={vmbLogo} alt="VMBN Gecertificeerd" className="h-10 object-contain opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};
export default MasterclassFormModal;