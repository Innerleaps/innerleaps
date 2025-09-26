
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

// Flag to control production content - set to true to show full site
const SHOW_FULL_SITE_IN_PRODUCTION = false;

// Development flag to preview construction page in Lovable previewer
// Set to true to see construction page in development mode
const PREVIEW_CONSTRUCTION_IN_DEV = false;

const App = () => {
  // Check if we're on the Lovable URL vs custom domain
  const isLovableUrl = typeof window !== 'undefined' && window.location.hostname.includes('lovable.app');
  
  // Show construction page only for custom domain in production, not for Lovable URL
  const shouldShowConstructionPage = (import.meta.env.PROD && !isLovableUrl && !SHOW_FULL_SITE_IN_PRODUCTION) || 
                                     (!import.meta.env.PROD && PREVIEW_CONSTRUCTION_IN_DEV);

  if (shouldShowConstructionPage) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<UnderConstruction />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/wetenschap" element={<Wetenschap />} />
            <Route path="/programma" element={<Programma />} />
            <Route path="/over-ons" element={<OverOns />} />
            <Route path="/voor-wie" element={<VoorWie />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/berekening" element={<Berekening />} />
            <Route path="/berekening-demo" element={<BerekeningDemo />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
