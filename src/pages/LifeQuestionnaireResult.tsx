import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const getScoreLevel = (score: number) => {
  if (score >= 0 && score <= 13) {
    return {
      level: "Good",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-500",
      icon: "✓"
    };
  } else if (score >= 14 && score <= 26) {
    return {
      level: "Caution, action recommended",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-500",
      icon: "⚠️"
    };
  } else {
    return {
      level: "Danger, action needed",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-500",
      icon: "⚠️"
    };
  }
};

const LifeQuestionnaireResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score;
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    // Redirect to questionnaire if no score is available
    if (score === undefined) {
      navigate('/life-questionnaire');
    }
  }, [score, navigate]);

  if (score === undefined) {
    return null;
  }

  const scoreLevel = getScoreLevel(score);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Reconstruct the questionnaire answers based on score
      // This is a simplified version - we're just sending the total score
      const { error } = await supabase.functions.invoke('submit-stress-questionnaire', {
        body: {
          email,
          language: "en",
          total_score: score,
          // We don't have individual answers, so we'll pass minimal data
          q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0
        }
      });

      if (error) throw error;

      setEmailSent(true);
      toast.success("Score sent to your email!");
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error("Failed to send email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg p-8 text-center">
          <div className={`${scoreLevel.bgColor} ${scoreLevel.borderColor} border-2 rounded-lg p-8 mb-6`}>
            <p className="text-lg mb-2">Your score is</p>
            <p className={`text-5xl font-bold ${scoreLevel.color} mb-2`}>{score}</p>
            <p className="text-lg mb-4">out of 40 points</p>
            
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${scoreLevel.bgColor} border ${scoreLevel.borderColor}`}>
              <span className="text-2xl">{scoreLevel.icon}</span>
              <span className={`font-bold ${scoreLevel.color}`}>{scoreLevel.level}</span>
            </div>
          </div>

          {!emailSent ? (
            <div className="mb-6 space-y-4">
              <h2 className="text-xl font-semibold">Want to receive your score?</h2>
              <p className="text-sm text-foreground/70">
                Enter your email here. We will never share your information with your employer!
              </p>
              
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="max-w-md mx-auto bg-white placeholder:text-gray-400"
                  required
                />
                
                <Button
                  type="submit"
                  disabled={!email || isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? "Sending..." : "Receive score"}
                </Button>
              </form>
            </div>
          ) : (
            <p className="text-sm text-foreground/60 mb-6">
              You will receive an email with your results.
            </p>
          )}

          <Button onClick={() => navigate('/')} variant="outline" size="lg">
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LifeQuestionnaireResult;
