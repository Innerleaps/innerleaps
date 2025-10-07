
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import Wetenschap from "./pages/Wetenschap";
import Programma from "./pages/Programma";
import OverOns from "./pages/OverOns";
import VoorWie from "./pages/VoorWie";
import Contact from "./pages/Contact";
import Berekening from "./pages/Berekening";
import BerekeningDemo from "./pages/BerekeningDemo";
import NotFound from "./pages/NotFound";
import UnderConstruction from "./pages/UnderConstruction";

const queryClient = new QueryClient();

// Enable all routes in development (Lovable editor), only landing page in production
const ENABLE_ALL_ROUTES = !import.meta.env.PROD;

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {ENABLE_ALL_ROUTES && (
              <>
                <Route path="/home" element={<Index />} />
                <Route path="/wetenschap" element={<Wetenschap />} />
                <Route path="/programma" element={<Programma />} />
                <Route path="/over-ons" element={<OverOns />} />
                <Route path="/voor-wie" element={<VoorWie />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/berekening" element={<Berekening />} />
                <Route path="/berekening-demo" element={<BerekeningDemo />} />
              </>
            )}
            <Route path="*" element={ENABLE_ALL_ROUTES ? <NotFound /> : <LandingPage />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
