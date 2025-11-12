import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ProductionRedirect } from "./components/ProductionRedirect";

// Lazy load all pages for better performance
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Wetenschap = lazy(() => import("./pages/Wetenschap"));
const DeMethode = lazy(() => import("./pages/DeMethode"));
const OverOns = lazy(() => import("./pages/OverOns"));
const Contact = lazy(() => import("./pages/Contact"));
const Calendar = lazy(() => import("./pages/Calendar"));
const LevenVragenlijst = lazy(() => import("./pages/LevenVragenlijst"));
const LevenVragenlijstResultaat = lazy(() => import("./pages/LevenVragenlijstResultaat"));
const StressManagement = lazy(() => import("./pages/StressManagement"));
const PrestatieProgramma = lazy(() => import("./pages/PrestatieProgramma"));
const Vitaliteitsprogramma = lazy(() => import("./pages/Vitaliteitsprogramma"));
const MasterclassQR = lazy(() => import("./pages/MasterclassQR"));
const Bedankt = lazy(() => import("./pages/Bedankt"));
const NegenStippen = lazy(() => import("./pages/NegenStippen"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

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
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/leven-vragenlijst" element={<LevenVragenlijst />} />
              <Route path="/leven-vragenlijst/resultaat" element={<LevenVragenlijstResultaat />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/de-methode" element={<DeMethode />} />
              <Route path="/wetenschap" element={<Wetenschap />} />
              <Route path="/over-ons" element={<OverOns />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/9-stippen" element={<NegenStippen />} />
              <Route path="/stressmanagement-programma" element={<StressManagement />} />
              <Route path="/prestatie-programma" element={<PrestatieProgramma />} />
              <Route path="/vitaliteitsprogramma" element={<Vitaliteitsprogramma />} />
              
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
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
