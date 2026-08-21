import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, Profiler } from "react";
import { ProductionRedirect } from "./components/ProductionRedirect";
import LanguageSync from "./i18n/LanguageSync";

// Lazy load all pages for better performance
const LandingPage = lazy(() => import("./pages/LandingPage"));
const DeMethode = lazy(() => import("./pages/DeMethode"));
const OverOns = lazy(() => import("./pages/OverOns"));
const Contact = lazy(() => import("./pages/Contact"));
const Calendar = lazy(() => import("./pages/Calendar"));
const Signup = lazy(() => import("./pages/Signup"));
const LevenVragenlijst = lazy(() => import("./pages/LevenVragenlijst"));
const LevenVragenlijstResultaat = lazy(() => import("./pages/LevenVragenlijstResultaat"));
const LifeQuestionnaire = lazy(() => import("./pages/LifeQuestionnaire"));
const LifeQuestionnaireResult = lazy(() => import("./pages/LifeQuestionnaireResult"));
const StressManagement = lazy(() => import("./pages/StressManagement"));
const PrestatieProgramma = lazy(() => import("./pages/PrestatieProgramma"));
const Vitaliteitstraining = lazy(() => import("./pages/Vitaliteitsprogramma"));
const DuurzameInzetbaarheidTraining = lazy(() => import("./pages/DuurzameInzetbaarheidTraining"));
const Blog = lazy(() => import("./pages/Blog"));
const ZiekteverzuimVerlagen = lazy(() => import("./pages/blog/ZiekteverzuimVerlagen"));
const VerborgenKostenZiekteverzuim = lazy(() => import("./pages/blog/VerborgenKostenZiekteverzuim"));
const HoeVerlaagIkZiekteverzuim = lazy(() => import("./pages/blog/HoeVerlaagIkZiekteverzuim"));
const MasterclassQR = lazy(() => import("./pages/MasterclassQR"));
const Bedankt = lazy(() => import("./pages/Bedankt"));
const NegenStippen = lazy(() => import("./pages/NegenStippen"));
const AlgemeneVoorwaarden = lazy(() => import("./pages/AlgemeneVoorwaarden"));
const PrivacyNotice = lazy(() => import("./pages/PrivacyNotice"));
const Cookies = lazy(() => import("./pages/Cookies"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Performance monitoring callback (development only)
const onRenderCallback = (
  id: string,
  phase: "mount" | "update",
  actualDuration: number,
) => {
  if (import.meta.env.DEV) {
    console.log(`[Profiler] ${id} (${phase}) took ${actualDuration.toFixed(2)}ms`);
  }
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
              <div className="animate-pulse text-brand-blue text-lg">Laden...</div>
            </div>
          }>
            <Profiler id="App" onRender={onRenderCallback}>
              <LanguageSync />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                {/* English routes (mirror of NL pages) */}
                <Route path="/en" element={<LandingPage />} />
                <Route path="/en/method" element={<DeMethode />} />
                <Route path="/en/about-us" element={<OverOns />} />
                <Route path="/en/contact" element={<Contact />} />
                <Route path="/en/vitality-training" element={<Vitaliteitstraining />} />
                <Route path="/en/sustainable-employability-training" element={<DuurzameInzetbaarheidTraining />} />
                <Route path="/en/stress-management-training" element={<StressManagement />} />
                <Route path="/en/performance-training" element={<PrestatieProgramma />} />
                <Route path="/en/blog" element={<Blog />} />
                <Route path="/en/blog/reducing-absenteeism-evidence-based-approach-2025" element={<ZiekteverzuimVerlagen />} />
                <Route path="/en/blog/hidden-costs-of-absenteeism-calculator" element={<VerborgenKostenZiekteverzuim />} />
                <Route path="/en/blog/how-to-reduce-absenteeism-in-my-organization" element={<HoeVerlaagIkZiekteverzuim />} />
                <Route path="/leven-vragenlijst" element={<LevenVragenlijst />} />
                <Route path="/leven-vragenlijst/resultaat" element={<LevenVragenlijstResultaat />} />
                <Route path="/life-questionnaire" element={<LifeQuestionnaire />} />
                <Route path="/life-questionnaire/result" element={<LifeQuestionnaireResult />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/breintraining-methode" element={<DeMethode />} />
                <Route path="/de-methode" element={<Navigate to="/breintraining-methode" replace />} />
                <Route path="/over-ons" element={<OverOns />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/9-stippen" element={<NegenStippen />} />
                <Route path="/stressmanagement-training" element={<StressManagement />} />
                <Route path="/prestatie-training" element={<PrestatieProgramma />} />
                <Route path="/vitaliteitstraining" element={<Vitaliteitstraining />} />
                <Route path="/duurzame-inzetbaarheid-training" element={<DuurzameInzetbaarheidTraining />} />
                {/* Legacy URL redirects (training -> training) */}
                <Route path="/stressmanagement-training" element={<Navigate to="/stressmanagement-training" replace />} />
                <Route path="/prestatie-training" element={<Navigate to="/prestatie-training" replace />} />
                <Route path="/vitaliteitstraining" element={<Navigate to="/vitaliteitstraining" replace />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/ziekteverzuim-verlagen-wetenschappelijk-bewezen-aanpak-2025" element={<ZiekteverzuimVerlagen />} />
                <Route path="/blog/verborgen-kosten-ziekteverzuim-rekenmodel" element={<VerborgenKostenZiekteverzuim />} />
                <Route path="/blog/hoe-verlaag-ik-het-ziekteverzuim-in-mijn-organisatie" element={<HoeVerlaagIkZiekteverzuim />} />
                <Route path="/algemene-voorwaarden" element={<AlgemeneVoorwaarden />} />
                <Route path="/privacy" element={<PrivacyNotice />} />
                <Route path="/cookies" element={<Cookies />} />
                
                {/* Feature-flag routes - visible in Lovable editor, but redirect in production */}
                <Route path="/masterclass-stress-qr" element={
                  <ProductionRedirect>
                    <MasterclassQR />
                  </ProductionRedirect>
                } />
                <Route path="/bedankt" element={
                  <ProductionRedirect>
                    <Bedankt />
                  </ProductionRedirect>
                } />
                <Route path="/masterclass-bedankt" element={
                  <ProductionRedirect>
                    <Bedankt />
                  </ProductionRedirect>
                } />
                
                <Route path="*" element={!import.meta.env.PROD ? <NotFound /> : <LandingPage />} />
              </Routes>
            </Profiler>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
