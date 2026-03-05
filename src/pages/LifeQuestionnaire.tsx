import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
const questions = [
  "In the last month, how often have you been upset because of something that happened unexpectedly?",
  "In the last month, how often have you felt that you were unable to control the important things in your life?",
  "In the last month, how often have you felt nervous and stressed?",
  "In the last month, how often have you felt confident about your ability to handle your personal problems?",
  "In the last month, how often have you felt that things were going your way?",
  "In the last month, how often have you found that you could not cope with all the things that you had to do?",
  "In the last month, how often have you been able to control irritations in your life?",
  "In the last month, how often have you felt that you were on top of things?",
  "In the last month, how often have you been angered because of things that happened that were outside of your control?",
  "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?",
];
const options = [
  {
    label: "Never",
    value: 0,
  },
  {
    label: "Almost never",
    value: 1,
  },
  {
    label: "Sometimes",
    value: 2,
  },
  {
    label: "Fairly often",
    value: 3,
  },
  {
    label: "Very often",
    value: 4,
  },
];
const LifeQuestionnaire = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>("question-0");
  const answeredCount = Object.keys(answers).length;

  // Questions 4, 5, 7, 8 have reversed scoring (index 3, 4, 6, 7)
  const reversedQuestions = [3, 4, 6, 7];
  const calculateTotalScore = () => {
    let total = 0;
    for (let i = 0; i < questions.length; i++) {
      const answer = answers[i] || 0;
      if (reversedQuestions.includes(i)) {
        total += 4 - answer;
      } else {
        total += answer;
      }
    }
    return total;
  };
  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: parseInt(value),
    }));

    // Automatically open next question
    if (questionIndex < questions.length - 1) {
      setOpenAccordion(`question-${questionIndex + 1}`);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (answeredCount < questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setIsSubmitting(true);
    const totalScore = calculateTotalScore();

    // Navigate to result page with score and answers
    navigate("/life-questionnaire/result", {
      state: {
        score: totalScore,
      },
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4 text-center">How do you handle your daily life?</h1>
          <p className="text-center text-foreground/80 mb-6">
            Answer the questions based on the last month. Learn about your result in the masterclass.
            <br />
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <p className="text-sm text-foreground/60">
                {answeredCount} of {questions.length} questions answered
              </p>
            </div>

            <Accordion
              type="single"
              collapsible
              value={openAccordion}
              onValueChange={setOpenAccordion}
              className="space-y-4"
            >
              {questions.map((question, index) => (
                <AccordionItem key={index} value={`question-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <span className="font-semibold">Question {index + 1}</span>
                      {answers[index] !== undefined && <span className="text-sm text-green-600">✓</span>}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <p className="mb-4 text-foreground/90">{question}</p>
                    <RadioGroup
                      value={answers[index]?.toString()}
                      onValueChange={(value) => handleAnswerChange(index, value)}
                    >
                      {options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value={option.value.toString()} id={`q${index}-${option.value}`} />
                          <Label htmlFor={`q${index}-${option.value}`} className="cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                size="lg"
                disabled={answeredCount < questions.length || isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? "Calculating..." : "Calculate score"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LifeQuestionnaire;
