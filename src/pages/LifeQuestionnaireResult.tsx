import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { NotebookPen } from "lucide-react";

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

  useEffect(() => {
    if (score === undefined) {
      navigate('/life-questionnaire');
    }
  }, [score, navigate]);

  if (score === undefined) {
    return null;
  }

  const scoreLevel = getScoreLevel(score);

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

          <div className="bg-muted/50 border border-border rounded-lg p-6 mb-6 text-left">
            <div className="flex items-start gap-3">
              <NotebookPen className="text-primary mt-0.5 shrink-0" size={22} />
              <div>
                <h2 className="font-semibold text-foreground mb-1">Save your score for the masterclass</h2>
                <p className="text-sm text-muted-foreground">
                  Write down or screenshot your score — we'll discuss what it means during the masterclass.
                </p>
              </div>
            </div>
          </div>

          <Button onClick={() => navigate('/')} variant="outline" size="lg">
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LifeQuestionnaireResult;
