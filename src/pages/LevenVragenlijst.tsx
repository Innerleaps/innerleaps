import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const questions = [
  "Hoe vaak bent u de afgelopen maand van streek geweest vanwege iets dat onverwachts gebeurde?",
  "Hoe vaak heeft u de afgelopen maand het gevoel gehad dat u geen controle had over de belangrijke dingen in uw leven?",
  "Hoe vaak heeft u zich de afgelopen maand zenuwachtig en \"gestrest\" gevoeld?",
  "Hoe vaak heeft u zich de afgelopen maand zelfverzekerd gevoeld over uw vermogen om met uw persoonlijke problemen om te gaan?",
  "Hoe vaak heeft u de afgelopen maand het gevoel gehad dat de dingen gingen zoals u wenste?",
  "Hoe vaak heeft u de afgelopen maand gemerkt dat u niet alle dingen aankon die u moest doen?",
  "Hoe vaak heeft u de afgelopen maand irritaties in uw leven onder controle kunnen houden?",
  "Hoe vaak heeft u de afgelopen maand het gevoel gehad dat u alles onder controle had?",
  "Hoe vaak bent u de afgelopen maand boos geweest vanwege zaken waar u geen controle over had?",
  "Hoe vaak heeft u de afgelopen maand het gevoel gehad dat de moeilijkheden zich zo hebben opgestapeld dat u ze niet kunt overwinnen?",
];

const options = [
  { value: "0", label: "Nooit" },
  { value: "1", label: "Soms" },
  { value: "2", label: "Regelmatig" },
  { value: "3", label: "Vaak" },
];

const LevenVragenlijst = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    naam: "",
    email: "",
    organisatie: "",
  });
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [`q${questionIndex + 1}`]: parseInt(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all questions are answered
    if (Object.keys(answers).length < 10) {
      toast({
        title: "Niet alle vragen beantwoord",
        description: "Beantwoord alle vragen voordat je het formulier verstuurt.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);

      const submission = {
        naam: formData.naam,
        email: formData.email,
        organisatie: formData.organisatie,
        q1: answers.q1,
        q2: answers.q2,
        q3: answers.q3,
        q4: answers.q4,
        q5: answers.q5,
        q6: answers.q6,
        q7: answers.q7,
        q8: answers.q8,
        q9: answers.q9,
        q10: answers.q10,
        total_score: totalScore,
      };

      const { error } = await supabase.functions.invoke("submit-stress-questionnaire", {
        body: submission,
      });

      if (error) throw error;

      toast({
        title: "Succesvol verstuurd!",
        description: "Bedankt voor het invullen. Je ontvangt een email met je resultaten.",
      });

      // Reset form
      setFormData({ naam: "", email: "", organisatie: "" });
      setAnswers({});
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        title: "Er ging iets mis",
        description: "Probeer het later opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4">Hoe ga jij om met je dagelijks leven?</h1>
          <p className="text-foreground/80 mb-8">
            De volgende vragen gaan over hoe je de afgelopen maand situaties en uitdagingen hebt ervaren. Het geeft je inzicht in hoe je omgaat met wat er op je afkomt. Later in de training bespreken we wat de uitkomsten betekenen.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Persoonlijke gegevens</h2>
                <p className="text-foreground/80 mb-6">
                  We bewaren jouw gegevens beveiligd en delen deze nooit met je werkgever. Het invullen van je gegevens is niet verplicht, maar hierdoor kunnen we wel de score van de vragenlijst met je delen per e-mail.
                </p>
              </div>
              
              <div className="space-y-4 pb-6 border-b">
                <div>
                  <Label htmlFor="naam">Naam</Label>
                  <Input
                    id="naam"
                    value={formData.naam}
                    onChange={(e) => setFormData({ ...formData, naam: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mailadres</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="organisatie">Organisatie</Label>
                  <Input
                    id="organisatie"
                    value={formData.organisatie}
                    onChange={(e) => setFormData({ ...formData, organisatie: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Jouw dagelijkse leven</h2>
              <div className="space-y-8">
              {questions.map((question, index) => (
                <div key={index} className="space-y-3">
                  <Label className="text-base font-medium">
                    {index + 1}. {question} *
                  </Label>
                  <RadioGroup
                    value={answers[`q${index + 1}`]?.toString()}
                    onValueChange={(value) => handleAnswerChange(index, value)}
                    className="flex flex-col space-y-2"
                  >
                    {options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`q${index + 1}-${option.value}`} />
                        <Label
                          htmlFor={`q${index + 1}-${option.value}`}
                          className="font-normal cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Bezig met versturen..." : "Verstuur"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LevenVragenlijst;