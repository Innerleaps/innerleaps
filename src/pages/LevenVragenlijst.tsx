import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Check } from "lucide-react";

const questions = [
  "Hoe vaak bent u de afgelopen maand van streek geweest vanwege iets dat onverwachts gebeurde?*",
  "Hoe vaak heeft u de afgelopen maand het gevoel gehad dat u geen controle had over de belangrijke dingen in uw leven?*",
  'Hoe vaak heeft u zich de afgelopen maand zenuwachtig en "gestrest" gevoeld?*',
  "Hoe vaak heeft u zich de afgelopen maand zelfverzekerd gevoeld over uw vermogen om met uw persoonlijke problemen om te gaan?*",
  "Hoe vaak heeft u de afgelopen maand het gevoel gehad dat de dingen gingen zoals u wenste?*",
  "Hoe vaak heeft u de afgelopen maand gemerkt dat u niet alle dingen aankon die u moest doen?*",
  "Hoe vaak heeft u de afgelopen maand irritaties in uw leven onder controle kunnen houden?*",
  "Hoe vaak heeft u de afgelopen maand het gevoel gehad dat u alles onder controle had?*",
  "Hoe vaak bent u de afgelopen maand boos geweest vanwege zaken waar u geen controle over had?*",
  "Hoe vaak heeft u de afgelopen maand het gevoel gehad dat de moeilijkheden zich zo hebben opgestapeld dat u ze niet kunt overwinnen?*",
];

const options = [
  { value: "0", label: "Nooit" },
  { value: "1", label: "Bijna nooit" },
  { value: "2", label: "Soms" },
  { value: "3", label: "Vrij vaak" },
  { value: "4", label: "Heel vaak" },
];

const LevenVragenlijst = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    naam: "",
    email: "",
    organisatie: "",
  });
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>("question-0");

  // Calculate score with reversed scoring for questions 4, 5, 7, 8
  const calculateTotalScore = () => {
    const reversedQuestions = [4, 5, 7, 8];
    let total = 0;

    for (let i = 1; i <= 10; i++) {
      const value = answers[`q${i}`];
      if (reversedQuestions.includes(i)) {
        // Reversed scoring: 0→4, 1→3, 2→2, 3→1, 4→0
        total += 4 - value;
      } else {
        // Normal scoring
        total += value;
      }
    }

    return total;
  };

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [`q${questionIndex + 1}`]: parseInt(value),
    }));

    // Automatically open next question or close if this was the last one
    if (questionIndex + 1 < questions.length) {
      setOpenAccordion(`question-${questionIndex + 1}`);
    } else {
      setOpenAccordion("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all questions are answered
    if (Object.keys(answers).length < 10) {
      toast({
        title: "Niet alle vragen beantwoord",
        description: "Beantwoord alle vragen voordat je het formulier verstuurt.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const totalScore = calculateTotalScore();

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

      // Navigate to results page with score
      navigate("/leven-vragenlijst/resultaat", {
        state: {
          score: totalScore,
          emailSent: !!(formData.email && formData.naam),
        },
      });
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        title: "Er ging iets mis",
        description: "Probeer het later opnieuw.",
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
            De volgende vragen gaan over hoe je de afgelopen maand situaties en uitdagingen hebt ervaren. Het geeft je
            inzicht in hoe je omgaat met wat er op je afkomt. Later in de training bespreken we wat de uitkomsten
            betekenen.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Persoonlijke gegevens</h2>
                <p className="text-foreground/80 mb-6">
                  We bewaren jouw gegevens beveiligd en delen deze nooit met je werkgever. Het invullen van je gegevens
                  is niet verplicht, maar hierdoor kunnen we wel de score van de vragenlijst met je delen per e-mail.
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
              <h2 className="text-2xl font-bold">10 vragen over jouw dagelijkse leven</h2>

              <div className="mb-4 text-sm text-muted-foreground">
                {Object.keys(answers).length} van {questions.length} vragen beantwoord
              </div>

              <Accordion
                type="single"
                collapsible
                value={openAccordion}
                onValueChange={setOpenAccordion}
                className="space-y-2"
              >
                {questions.map((question, index) => {
                  const isAnswered = answers[`q${index + 1}`] !== undefined;

                  return (
                    <AccordionItem key={index} value={`question-${index}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3 text-left">
                          <div
                            className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                              isAnswered ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {isAnswered ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <span className="text-sm font-medium">{index + 1}</span>
                            )}
                          </div>
                          <span className="font-medium">Vraag {index + 1}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 pb-2">
                        <div className="space-y-4">
                          <p className="text-base font-medium mb-4">{question}</p>
                          <RadioGroup
                            value={answers[`q${index + 1}`]?.toString()}
                            onValueChange={(value) => handleAnswerChange(index, value)}
                            className="flex flex-col gap-3"
                          >
                            {options.map((option) => (
                              <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value} id={`q${index + 1}-${option.value}`} />
                                <Label
                                  htmlFor={`q${index + 1}-${option.value}`}
                                  className="font-normal cursor-pointer text-base"
                                >
                                  {option.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
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
