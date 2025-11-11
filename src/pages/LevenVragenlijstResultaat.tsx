import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const getScoreLevel = (score: number) => {
  if (score >= 0 && score <= 13) {
    return {
      level: "Goed",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-500",
      icon: "✓"
    };
  } else if (score >= 14 && score <= 26) {
    return {
      level: "Let op, actie aanbevolen",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-500",
      icon: "⚠️"
    };
  } else {
    return {
      level: "Gevaar, actie nodig",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-500",
      icon: "⚠️"
    };
  }
};

const LevenVragenlijstResultaat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score;
  const emailSent = location.state?.emailSent;

  useEffect(() => {
    // Redirect to questionnaire if no score is available
    if (score === undefined) {
      navigate('/leven-vragenlijst');
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
          <h1 className="text-3xl font-bold mb-6">Bedankt voor het invullen</h1>
          
          <div className={`${scoreLevel.bgColor} ${scoreLevel.borderColor} border-2 rounded-lg p-8 mb-6`}>
            <p className="text-lg mb-2">Je score is</p>
            <p className={`text-5xl font-bold ${scoreLevel.color} mb-2`}>{score}</p>
            <p className="text-lg mb-4">van de 40 punten</p>
            
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${scoreLevel.bgColor} border ${scoreLevel.borderColor}`}>
              <span className="text-2xl">{scoreLevel.icon}</span>
              <span className={`font-bold ${scoreLevel.color}`}>{scoreLevel.level}</span>
            </div>
          </div>

          {emailSent && (
            <p className="text-sm text-foreground/60 mb-6">
              Je ontvangt ook een email met je resultaten.
            </p>
          )}

          <Button onClick={() => navigate('/')} size="lg">
            Terug naar home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LevenVragenlijstResultaat;
