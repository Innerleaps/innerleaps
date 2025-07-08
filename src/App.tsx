
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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

// Flag to control production content - set to false to show construction page in production
const SHOW_FULL_SITE_IN_PRODUCTION = false;

const App = () => {
  // Check if we're in production and should show construction page
  const shouldShowConstructionPage = import.meta.env.PROD && !SHOW_FULL_SITE_IN_PRODUCTION;

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
