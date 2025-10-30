
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import Wetenschap from "./pages/Wetenschap";
import WetenschapOld from "./pages/WetenschapOld";
import Programma from "./pages/Programma";
import OverOns from "./pages/OverOns";
import VoorWie from "./pages/VoorWie";
import Contact from "./pages/Contact";
import Berekening from "./pages/Berekening";
import BerekeningDemo from "./pages/BerekeningDemo";
import LevenVragenlijst from "./pages/LevenVragenlijst";
import LevenVragenlijstResultaat from "./pages/LevenVragenlijstResultaat";
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
