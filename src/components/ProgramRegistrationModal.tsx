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
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const programRegistrationSchema = z.object({
  fullName: z.string().min(2, "Volledige naam is verplicht"),
  email: z.string().email("Ongeldig emailadres"),
  phone: z.string().min(10, "Telefoonnummer is verplicht"),
  birthDay: z.string().min(1, "Dag is verplicht"),
  birthMonth: z.string().min(1, "Maand is verplicht"),
  birthYear: z.string().min(4, "Jaar is verplicht"),
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
  message: "Bedrijfsnaam is verplicht bij aanmelding via werkgever",
  path: ["companyName"]
}).refine(data => {
  const day = parseInt(data.birthDay);
  const month = parseInt(data.birthMonth);
  const year = parseInt(data.birthYear);
  
  if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
  if (day < 1 || day > 31) return false;
  if (month < 1 || month > 12) return false;
  if (year < 1900 || year > new Date().getFullYear()) return false;
  
  const date = new Date(year, month - 1, day);
  return date.getDate() === day && date.getMonth() === month - 1;
}, {
  message: "Ongeldige geboortedatum",
  path: ["birthDay"]
});

type ProgramRegistrationForm = z.infer<typeof programRegistrationSchema>;

interface ProgramTimeslot {
  date: Date;
  display: string;
  value: string;
  availableSpots: number;
  isFull: boolean;
}

interface ProgramDates {
  tuesdayAfternoon: ProgramTimeslot;
  tuesdayEvening: ProgramTimeslot;
  wednesdayAfternoon: ProgramTimeslot;
  wednesdayEvening: ProgramTimeslot;
  thursdayEvening: ProgramTimeslot;
}

const getMonthName = (date: Date): string => {
  return format(date, "MMMM", {
    locale: nl
  });
};

const getOrCreateAvailableSpots = (timeslotKey: string): number => {
  const storageKey = `timeslot_spots_${timeslotKey}`;
  const stored = localStorage.getItem(storageKey);
  
  if (stored) {
    return parseInt(stored);
  }
  
  // Generate new random number and store it
  const spots = Math.floor(Math.random() * 4) + 2;
  localStorage.setItem(storageKey, spots.toString());
  return spots;
};

const getNextProgramDates = (): ProgramDates => {
  const today = new Date();
  const fiveWeeksFromNow = new Date(today);
  fiveWeeksFromNow.setDate(today.getDate() + 35); // 5 weken

  let nextTuesday = new Date(fiveWeeksFromNow);
  while (nextTuesday.getDay() !== 2) {
    nextTuesday.setDate(nextTuesday.getDate() + 1);
  }

  const nextWednesday = new Date(nextTuesday);
  nextWednesday.setDate(nextTuesday.getDate() + 1);

  const nextThursday = new Date(nextWednesday);
  nextThursday.setDate(nextWednesday.getDate() + 1);

  // Create unique keys for each timeslot based on the date
  const tuesdayKey = `${nextTuesday.toISOString().split('T')[0]}_evening`;
  const wednesdayAfternoonKey = `${nextWednesday.toISOString().split('T')[0]}_afternoon`;
  const wednesdayEveningKey = `${nextWednesday.toISOString().split('T')[0]}_evening`;

  return {
    tuesdayAfternoon: {
      date: nextTuesday,
      display: `${nextTuesday.getDate()} ${getMonthName(nextTuesday)} Dinsdagmiddag 16:00 - 17:00`,
      value: nextTuesday.toISOString(),
      availableSpots: 0,
      isFull: true,
    },
    tuesdayEvening: {
      date: nextTuesday,
      display: `${nextTuesday.getDate()} ${getMonthName(nextTuesday)} Dinsdagavond 20:00 - 21:00`,
      value: nextTuesday.toISOString(),
      availableSpots: getOrCreateAvailableSpots(tuesdayKey),
      isFull: false,
    },
    wednesdayAfternoon: {
      date: nextWednesday,
      display: `${nextWednesday.getDate()} ${getMonthName(nextWednesday)} Woensdagmiddag 16:00 - 17:00`,
      value: nextWednesday.toISOString(),
      availableSpots: getOrCreateAvailableSpots(wednesdayAfternoonKey),
      isFull: false,
    },
    wednesdayEvening: {
      date: nextWednesday,
      display: `${nextWednesday.getDate()} ${getMonthName(nextWednesday)} Woensdagavond 20:00 - 21:00`,
      value: nextWednesday.toISOString(),
      availableSpots: getOrCreateAvailableSpots(wednesdayEveningKey),
      isFull: false,
    },
    thursdayEvening: {
      date: nextThursday,
      display: `${nextThursday.getDate()} ${getMonthName(nextThursday)} Donderdagavond 20:00 - 21:00`,
      value: nextThursday.toISOString(),
      availableSpots: 0,
      isFull: true,
    },
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
  const agreedToTerms = watch("agreedToTerms");
  
  const fullName = watch("fullName");
  const email = watch("email");
  const phone = watch("phone");
  const birthDay = watch("birthDay");
  const birthMonth = watch("birthMonth");
  const birthYear = watch("birthYear");
  const address = watch("address");
  const companyName = watch("companyName");
  const selectedTimeslot = watch("selectedTimeslot");

  const isStep1Valid = fullName && email && phone && birthDay && birthMonth && birthYear && 
    !errors.fullName && !errors.email && !errors.phone && !errors.birthDay && !errors.birthMonth && !errors.birthYear;
  const isStep2Valid = address && 
    (registrationType === "particulier" || (registrationType === "zakelijk" && companyName)) &&
    !errors.address && !errors.companyName;
  const isStep3Valid = selectedTimeslot && !errors.selectedTimeslot;

  const onSubmit = async (data: ProgramRegistrationForm) => {
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.functions.invoke("submit-program-registration", {
        body: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          birthDay: data.birthDay,
          birthMonth: data.birthMonth,
          birthYear: data.birthYear,
          address: data.address,
          registrationType: data.registrationType,
          companyName: data.companyName,
          departmentCostCenter: data.departmentCostCenter,
          selectedTimeslot: data.selectedTimeslot,
          additionalInfo: data.additionalInfo,
          programType,
          agreedToTerms: data.agreedToTerms
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-brand-purple">
            Aanmelden {programType === "prestatie" ? "Prestatie Training" : "Stress-Management Training"}
          </DialogTitle>
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3, 4].map(s => <div key={s} className={`h-2 flex-1 rounded-full ${s <= step ? "bg-brand-orange" : "bg-gray-200"}`} />)}
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
          {/* Stap 1: Persoonlijke Informatie */}
          {step === 1 && <div className="space-y-4">
              <h3 className="text-lg font-semibold text-brand-purple">Persoonlijke Informatie</h3>

              <div className="space-y-2">
                <Label htmlFor="fullName">Volledige naam *</Label>
                <Input 
                  id="fullName" 
                  {...register("fullName")} 
                  placeholder="Jan Jansen" 
                  className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                />
                {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mailadres *</Label>
                <Input 
                  id="email" 
                  type="email" 
                  {...register("email")} 
                  placeholder="jan@voorbeeld.nl" 
                  className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefoonnummer *</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  {...register("phone")} 
                  placeholder="06 12345678" 
                  className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Geboortedatum *</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Input 
                    placeholder="DD" 
                    maxLength={2}
                    {...register("birthDay")}
                    className="text-center bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                  />
                  <Input 
                    placeholder="MM" 
                    maxLength={2}
                    {...register("birthMonth")}
                    className="text-center bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                  />
                  <Input 
                    placeholder="YYYY" 
                    maxLength={4}
                    {...register("birthYear")}
                    className="text-center bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                  />
                </div>
                {errors.birthDay && <p className="text-sm text-destructive">{errors.birthDay.message}</p>}
              </div>

              <Button 
                type="button" 
                onClick={nextStep} 
                className="w-full"
                disabled={!isStep1Valid}
              >
                Volgende <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              {!isStep1Valid && (
                <p className="text-sm text-brand-gray-medium text-center mt-2">
                  Vul alle verplichte velden in om door te gaan
                </p>
              )}
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
                    Via Werkgever
                  </Label>
                </div>
              </RadioGroup>

              <div className="space-y-2">
                <Label htmlFor="address">Adres *</Label>
                <Input 
                  id="address" 
                  {...register("address")} 
                  placeholder="Straatnaam 123, 1234 AB Plaats" 
                  className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                />
                {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
              </div>

              {registrationType === "zakelijk" && <div className="space-y-2">
                  <Label htmlFor="companyName">Bedrijfsnaam *</Label>
                  <Input 
                    id="companyName" 
                    {...register("companyName")} 
                    placeholder="Bedrijfsnaam BV" 
                    className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                  />
                  {errors.companyName && <p className="text-sm text-destructive">{errors.companyName.message}</p>}
                </div>}

              {registrationType === "zakelijk" && <>
                  <div className="space-y-2">
                    <Label htmlFor="departmentCostCenter">Afdeling/kostenplaats (optioneel)</Label>
                    <Input 
                      id="departmentCostCenter" 
                      {...register("departmentCostCenter")} 
                      placeholder="Marketing, HR, etc." 
                      className="bg-white border-gray-300 text-brand-gray-dark placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Aanvullende informatie (optioneel)</Label>
                    <Textarea 
                      id="additionalInfo" 
                      {...register("additionalInfo")} 
                      placeholder="Extra informatie die voor ons handig is om te weten" 
                      rows={3}
                      className="border-2 border-gray-300 bg-white text-brand-gray-dark placeholder:text-[rgb(51,65,85)]"
                    />
                  </div>
                </>}

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Vorige
                </Button>
                <Button 
                  type="button" 
                  onClick={nextStep} 
                  className="flex-1"
                  disabled={!isStep2Valid}
                >
                  Volgende <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              {!isStep2Valid && (
                <p className="text-sm text-brand-gray-medium text-center mt-2">
                  Vul alle verplichte velden in om door te gaan
                </p>
              )}
            </div>}

          {/* Stap 3: Startdatum Selectie */}
          {step === 3 && <div className="space-y-4">
              <h3 className="text-lg font-semibold text-brand-purple">Startdatum</h3>
              <p className="text-sm text-brand-gray-medium">
                Dit is de startdatum van de training. De cursus vindt plaats gedurende 6 opeenvolgende weken. Op
                nationale feestdagen zal de cursus niet plaatsvinden. Mocht je onverhoopt een sessie missen dan zal je
                de opname ontvangen.
              </p>

              <RadioGroup onValueChange={value => setValue("selectedTimeslot", value)}>
                <div className="flex items-start space-x-2 p-3 border rounded-lg bg-gray-100 opacity-60">
                  <RadioGroupItem 
                    value={programDates.tuesdayAfternoon.display} 
                    id="tuesday-afternoon" 
                    disabled 
                    className="mt-1" 
                  />
                  <Label htmlFor="tuesday-afternoon" className="cursor-not-allowed flex-1 line-through">
                    {programDates.tuesdayAfternoon.display}
                  </Label>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    VOL!
                  </span>
                </div>
                
                <div className="flex items-start space-x-2 p-3 border rounded-lg hover:bg-brand-off-white transition-colors">
                  <RadioGroupItem value={programDates.tuesdayEvening.display} id="tuesday" className="mt-1" />
                  <Label htmlFor="tuesday" className="cursor-pointer flex-1">
                    {programDates.tuesdayEvening.display}
                  </Label>
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {programDates.tuesdayEvening.availableSpots} plekken beschikbaar
                  </span>
                </div>
                
                <div className="flex items-start space-x-2 p-3 border rounded-lg hover:bg-brand-off-white transition-colors">
                  <RadioGroupItem value={programDates.wednesdayAfternoon.display} id="wed-afternoon" className="mt-1" />
                  <Label htmlFor="wed-afternoon" className="cursor-pointer flex-1">
                    {programDates.wednesdayAfternoon.display}
                  </Label>
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {programDates.wednesdayAfternoon.availableSpots} plekken beschikbaar
                  </span>
                </div>
                
                <div className="flex items-start space-x-2 p-3 border rounded-lg hover:bg-brand-off-white transition-colors">
                  <RadioGroupItem value={programDates.wednesdayEvening.display} id="wed-evening" className="mt-1" />
                  <Label htmlFor="wed-evening" className="cursor-pointer flex-1">
                    {programDates.wednesdayEvening.display}
                  </Label>
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {programDates.wednesdayEvening.availableSpots} plekken beschikbaar
                  </span>
                </div>

                <div className="flex items-start space-x-2 p-3 border rounded-lg bg-gray-100 opacity-60">
                  <RadioGroupItem 
                    value={programDates.thursdayEvening.display} 
                    id="thursday" 
                    disabled 
                    className="mt-1" 
                  />
                  <Label htmlFor="thursday" className="cursor-not-allowed flex-1 line-through">
                    {programDates.thursdayEvening.display}
                  </Label>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    VOL!
                  </span>
                </div>
              </RadioGroup>
              {errors.selectedTimeslot && <p className="text-sm text-destructive">{errors.selectedTimeslot.message}</p>}

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Vorige
                </Button>
                <Button 
                  type="button" 
                  onClick={nextStep} 
                  className="flex-1"
                  disabled={!isStep3Valid}
                >
                  Volgende <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              {!isStep3Valid && (
                <p className="text-sm text-brand-gray-medium text-center mt-2">
                  Selecteer een startdatum om door te gaan
                </p>
              )}
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
