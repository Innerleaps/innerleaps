import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
const programRegistrationSchema = z.object({
  fullName: z.string().min(2, "Volledige naam is verplicht"),
  email: z.string().email("Ongeldig emailadres"),
  phone: z.string().min(10, "Telefoonnummer is verplicht"),
  birthDate: z.date({
    required_error: "Geboortedatum is verplicht"
  }),
  registrationType: z.enum(["particulier", "zakelijk"]),
  address: z.string().min(5, "Adres is verplicht"),
  companyName: z.string().optional(),
  departmentCostCenter: z.string().optional(),
  additionalInfo: z.string().optional(),
  selectedTimeslot: z.string().min(1, "Selecteer een startdatum"),
  agreedToTerms: z.boolean().refine(val => val === true, "Je moet akkoord gaan met de voorwaarden")
}).refine(data => {
  if (data.registrationType === "zakelijk" && !data.companyName) {
    return false;
  }
  return true;
}, {
  message: "Bedrijfsnaam is verplicht bij zakelijke aanmelding",
  path: ["companyName"]
});
type ProgramRegistrationForm = z.infer<typeof programRegistrationSchema>;
interface ProgramDates {
  tuesdayEvening: {
    date: Date;
    display: string;
    value: string;
  };
  wednesdayAfternoon: {
    date: Date;
    display: string;
    value: string;
  };
  wednesdayEvening: {
    date: Date;
    display: string;
    value: string;
  };
}
const getMonthName = (date: Date): string => {
  return format(date, "MMMM", {
    locale: nl
  });
};
const getNextProgramDates = (): ProgramDates => {
  const today = new Date();
  const fourWeeksFromNow = new Date(today);
  fourWeeksFromNow.setDate(today.getDate() + 28); // 4 weken = 28 dagen

  // Vind eerste dinsdag >= 4 weken vooruit
  let nextTuesday = new Date(fourWeeksFromNow);
  while (nextTuesday.getDay() !== 2) {
    // 2 = dinsdag
    nextTuesday.setDate(nextTuesday.getDate() + 1);
  }

  // Woensdag is de dag erna
  const nextWednesday = new Date(nextTuesday);
  nextWednesday.setDate(nextTuesday.getDate() + 1);
  return {
    tuesdayEvening: {
      date: nextTuesday,
      display: `${nextTuesday.getDate()} ${getMonthName(nextTuesday)} Dinsdagavond 20:00 - 21:00`,
      value: nextTuesday.toISOString()
    },
    wednesdayAfternoon: {
      date: nextWednesday,
      display: `${nextWednesday.getDate()} ${getMonthName(nextWednesday)} Woensdagmiddag 16:00 - 17:00`,
      value: nextWednesday.toISOString()
    },
    wednesdayEvening: {
      date: nextWednesday,
      display: `${nextWednesday.getDate()} ${getMonthName(nextWednesday)} Woensdagavond 20:00 - 21:00`,
      value: nextWednesday.toISOString()
    }
  };
};
interface ProgramRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  programType: "prestatie" | "stress-management";
}
const ProgramRegistrationModal = ({
  isOpen,
  onClose,
  programType
}: ProgramRegistrationModalProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const programDates = getNextProgramDates();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {
      errors
    }
  } = useForm<ProgramRegistrationForm>({
    resolver: zodResolver(programRegistrationSchema),
    defaultValues: {
      registrationType: "particulier",
      agreedToTerms: false
    }
  });
  const registrationType = watch("registrationType");
  const birthDate = watch("birthDate");
  const agreedToTerms = watch("agreedToTerms");
  const onSubmit = async (data: ProgramRegistrationForm) => {
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.functions.invoke("submit-program-registration", {
        body: {
          ...data,
          programType,
          birthDate: data.birthDate.toISOString()
        }
      });
      if (error) throw error;
      toast.success("Aanmelding succesvol verzonden!");
      onClose();
      navigate("/bedankt");
    } catch (error: any) {
      console.error("Error submitting registration:", error);
      toast.error(error.message || "Er is iets misgegaan. Probeer het opnieuw.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-brand-purple">
            Aanmelden {programType === "prestatie" ? "Prestatie Programma" : "Stress-Management Programma"}
          </DialogTitle>
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3, 4].map(s => <div key={s} className={cn("h-2 flex-1 rounded-full", s <= step ? "bg-brand-orange" : "bg-gray-200")} />)}
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
          {/* Stap 1: Persoonlijke Informatie */}
          {step === 1 && <div className="space-y-4">
              <h3 className="text-lg font-semibold text-brand-purple">Persoonlijke Informatie</h3>

              <div className="space-y-2">
                <Label htmlFor="fullName">Volledige naam *</Label>
                <Input id="fullName" {...register("fullName")} placeholder="Jan Jansen" />
                {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mailadres *</Label>
                <Input id="email" type="email" {...register("email")} placeholder="jan@voorbeeld.nl" />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefoonnummer *</Label>
                <Input id="phone" type="tel" {...register("phone")} placeholder="06 12345678" />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Geboortedatum *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !birthDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {birthDate ? format(birthDate, "PPP", {
                    locale: nl
                  }) : "Selecteer een datum"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={birthDate} onSelect={date => setValue("birthDate", date as Date)} disabled={date => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                  </PopoverContent>
                </Popover>
                {errors.birthDate && <p className="text-sm text-destructive">{errors.birthDate.message}</p>}
              </div>

              <Button type="button" onClick={nextStep} className="w-full">
                Volgende <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>}

          {/* Stap 2: Registratie Type */}
          {step === 2 && <div className="space-y-4">
              <h3 className="text-lg font-semibold text-brand-purple">Type Aanmelding</h3>

              <RadioGroup value={registrationType} onValueChange={value => setValue("registrationType", value as "particulier" | "zakelijk")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="particulier" id="particulier" />
                  <Label htmlFor="particulier" className="cursor-pointer">
                    Particulier
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="zakelijk" id="zakelijk" />
                  <Label htmlFor="zakelijk" className="cursor-pointer">
                    Zakelijk
                  </Label>
                </div>
              </RadioGroup>

              {registrationType === "zakelijk" && <div className="space-y-2">
                  <Label htmlFor="companyName">Bedrijfsnaam *</Label>
                  <Input id="companyName" {...register("companyName")} placeholder="Bedrijfsnaam BV" />
                  {errors.companyName && <p className="text-sm text-destructive">{errors.companyName.message}</p>}
                </div>}

              <div className="space-y-2">
                <Label htmlFor="address">Adres *</Label>
                <Input id="address" {...register("address")} placeholder="Straatnaam 123, 1234 AB Plaats" />
                {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
              </div>

              {registrationType === "zakelijk" && <>
                  <div className="space-y-2">
                    <Label htmlFor="departmentCostCenter">Afdeling/kostenplaats (optioneel)</Label>
                    <Input id="departmentCostCenter" {...register("departmentCostCenter")} placeholder="Marketing, HR, etc." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Aanvullende informatie (optioneel)</Label>
                    <Textarea id="additionalInfo" {...register("additionalInfo")} placeholder="Extra informatie die voor ons handig is om te weten" rows={3} />
                  </div>
                </>}

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Vorige
                </Button>
                <Button type="button" onClick={nextStep} className="flex-1">
                  Volgende <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>}

          {/* Stap 3: Startdatum Selectie */}
          {step === 3 && <div className="space-y-4">
              <h3 className="text-lg font-semibold text-brand-purple">Startdatum</h3>
              <p className="text-sm text-brand-gray-medium">
                Dit is de startdatum van het programma. De cursus vindt plaats gedurende 6 opeenvolgende weken. Op
                nationale feestdagen zal de cursus niet plaatsvinden. Mocht je onverhoopt een sessie missen dan zal je
                de opname ontvangen.
              </p>

              <RadioGroup onValueChange={value => setValue("selectedTimeslot", value)}>
                <div className="flex items-start space-x-2 p-3 border rounded-lg hover:bg-brand-off-white transition-colors">
                  <RadioGroupItem value={programDates.tuesdayEvening.display} id="tuesday" className="mt-1" />
                  <Label htmlFor="tuesday" className="cursor-pointer flex-1">
                    {programDates.tuesdayEvening.display}
                  </Label>
                </div>
                <div className="flex items-start space-x-2 p-3 border rounded-lg hover:bg-brand-off-white transition-colors">
                  <RadioGroupItem value={programDates.wednesdayAfternoon.display} id="wed-afternoon" className="mt-1" />
                  <Label htmlFor="wed-afternoon" className="cursor-pointer flex-1">
                    {programDates.wednesdayAfternoon.display}
                  </Label>
                </div>
                <div className="flex items-start space-x-2 p-3 border rounded-lg hover:bg-brand-off-white transition-colors">
                  <RadioGroupItem value={programDates.wednesdayEvening.display} id="wed-evening" className="mt-1" />
                  <Label htmlFor="wed-evening" className="cursor-pointer flex-1">
                    {programDates.wednesdayEvening.display}
                  </Label>
                </div>
              </RadioGroup>
              {errors.selectedTimeslot && <p className="text-sm text-destructive">{errors.selectedTimeslot.message}</p>}

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Vorige
                </Button>
                <Button type="button" onClick={nextStep} className="flex-1">
                  Volgende <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>}

          {/* Stap 4: Voorwaarden & Betalingsinformatie */}
          {step === 4 && <div className="space-y-4">
              <h3 className="text-lg font-semibold text-brand-purple">Algemene Voorwaarden</h3>

              <div className="bg-brand-blue-light/20 p-4 rounded-lg space-y-2 px-0 py-0">
                <p className="text-sm text-brand-gray-medium">
                  Na aanmelding wordt de factuur verstuurd. Het verzoek is om binnen 14 dagen de factuur te betalen.
                </p>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={checked => setValue("agreedToTerms", checked as boolean)} />
                <Label htmlFor="terms" className="cursor-pointer text-sm">
                  Ik ga akkoord met de algemene voorwaarden *
                </Label>
              </div>
              {errors.agreedToTerms && <p className="text-sm text-destructive">{errors.agreedToTerms.message}</p>}

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Vorige
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex-1 bg-brand-orange hover:bg-brand-orange/90">
                  {isSubmitting ? <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Aanmelden...
                    </> : "Aanmelden"}
                </Button>
              </div>
            </div>}
        </form>
      </DialogContent>
    </Dialog>;
};
export default ProgramRegistrationModal;