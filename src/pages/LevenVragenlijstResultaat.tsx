import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold mb-6">Bedankt voor het invullen</h1>
          
          <div className="bg-primary/10 rounded-lg p-8 mb-6">
            <p className="text-lg mb-2">Je score is</p>
            <p className="text-5xl font-bold text-primary mb-2">{score}</p>
            <p className="text-lg">van de 40 punten</p>
          </div>

          <p className="text-foreground/80 mb-6">
            In de workshop gaan we in op wat deze score betekent.
          </p>

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
