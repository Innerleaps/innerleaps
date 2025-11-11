
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductionRedirect } from "./components/ProductionRedirect";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import Wetenschap from "./pages/Wetenschap";
import WetenschapOld from "./pages/WetenschapOld";
import Programma from "./pages/Programma";
import OverOns from "./pages/OverOns";
import VoorWie from "./pages/VoorWie";
import Contact from "./pages/Contact";
import Calendar from "./pages/Calendar";
import Berekening from "./pages/Berekening";
import BerekeningDemo from "./pages/BerekeningDemo";
import LevenVragenlijst from "./pages/LevenVragenlijst";
import LevenVragenlijstResultaat from "./pages/LevenVragenlijstResultaat";
import StressManagement from "./pages/StressManagement";
import PrestatieProgramma from "./pages/PrestatieProgramma";
import MasterclassQR from "./pages/MasterclassQR";
import Bedankt from "./pages/Bedankt";
import NegenStippen from "./pages/NegenStippen";
import NotFound from "./pages/NotFound";
import UnderConstruction from "./pages/UnderConstruction";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/leven-vragenlijst" element={<LevenVragenlijst />} />
            <Route path="/leven-vragenlijst/resultaat" element={<LevenVragenlijstResultaat />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/wetenschap" element={<Wetenschap />} />
            <Route path="/over-ons" element={<OverOns />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/9-stippen" element={<NegenStippen />} />
            <Route path="/stressmanagement-programma" element={<StressManagement />} />
            <Route path="/prestatie-programma" element={<PrestatieProgramma />} />
            
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
            
            {/* Development-only routes */}
            {!import.meta.env.PROD && (
              <>
                <Route path="/home" element={<Index />} />
                <Route path="/wetenschap_old" element={<WetenschapOld />} />
                <Route path="/programma" element={<Programma />} />
                <Route path="/voor-wie" element={<VoorWie />} />
                <Route path="/berekening" element={<Berekening />} />
                <Route path="/berekening-demo" element={<BerekeningDemo />} />
              </>
            )}
            
            <Route path="*" element={!import.meta.env.PROD ? <NotFound /> : <LandingPage />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
