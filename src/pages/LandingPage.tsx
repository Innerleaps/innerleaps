import { lazy, Suspense, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PageSeo from "@/components/PageSeo";
import { useSearchParams, useLocation } from "react-router-dom";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import CohortPhotoSection from "@/components/CohortPhotoSection";
import ApproachSection from "@/components/ApproachSection";
import ResultsSection from "@/components/ResultsSection";
import MethodologySection from "@/components/MethodologySection";
import ProgramOverviewSection from "@/components/ProgramOverviewSection";
import TrustSection from "@/components/TrustSection";
import StickyCtaButtons from "@/components/StickyCtaButtons";
import Footer from "@/components/Footer";
import MasterclassSection from "@/components/MasterclassSection";
import { Button } from "@/components/ui/button";
import { Activity, BookOpen, Award, Brain } from "lucide-react";

// Lazy load ROI Calculator and Calculator Modal (below the fold)
const ROICalculator = lazy(() => import("@/components/ROICalculator"));
const CalculatorModal = lazy(() => import("@/components/CalculatorModal"));

const LandingPage = () => {
  const { t } = useTranslation("common");
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // Handle URL parameters and anchors
  useEffect(() => {
    const openCalculatorParam = searchParams.get("openCalculator");

    // Check for openCalculator URL parameter
    if (openCalculatorParam === "true") {
      // Small delay to ensure modal is ready
      setTimeout(() => {
        setIsCalculatorOpen(true);
      }, 100);
    }
    // Check for #masterclass anchor
    else if (location.hash === "#masterclass") {
      // Delay to wait for page to fully mount
      setTimeout(() => {
        const element = document.getElementById("masterclass");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.search, location.hash, searchParams]);

  return (
    <div className="min-h-screen bg-white">
      <PageSeo title={t("seo.landing.title")} description={t("seo.landing.description")} />
      <SimplifiedNavigation />
      <StickyCtaButtons />
      <div id="home">
        <HeroSection />
      </div>
      <ProblemSection />
      <CohortPhotoSection />
      <ApproachSection />
      <ResultsSection />
      <MethodologySection />
      <ProgramOverviewSection />

      <MasterclassSection variant="employer" />

      <TrustSection variant="off-white" />
      <Suspense
        fallback={
          <div className="section-padding">
            <div className="container-custom text-center">{location.pathname.startsWith('/en') ? 'Loading...' : 'Laden...'}</div>
          </div>
        }
      >
        <ROICalculator />
      </Suspense>
      <Footer />

      {/* Calculator Modal */}
      <Suspense fallback={null}>
        <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
      </Suspense>
    </div>
  );
};

export default LandingPage;
