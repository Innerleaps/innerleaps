import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, Profiler, useLayoutEffect } from "react";
import { ProductionRedirect } from "./components/ProductionRedirect";
import LanguageSync from "./i18n/LanguageSync";
import Cookiebanner from "./components/Cookiebanner";
import { zetKlikluisteraars } from "./lib/conversies";
import { startApolloAlsToegestaan } from "./lib/apollo";

// Lazy load all pages for better performance
const LandingPage = lazy(() => import("./pages/LandingPage"));
const DeMethode = lazy(() => import("./pages/DeMethode"));
const OverOns = lazy(() => import("./pages/OverOns"));
const Contact = lazy(() => import("./pages/Contact"));
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
const BedanktRoi = lazy(() => import("./pages/BedanktRoi"));
const BedanktRapport = lazy(() => import("./pages/BedanktRapport"));
const NegenStippen = lazy(() => import("./pages/NegenStippen"));
const AlgemeneVoorwaarden = lazy(() => import("./pages/AlgemeneVoorwaarden"));
const PrivacyNotice = lazy(() => import("./pages/PrivacyNotice"));
const Cookies = lazy(() => import("./pages/Cookies"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

/**
 * Wat er te zien is terwijl de pagina nog geladen wordt.
 *
 * Hier stond een tijdlang een kopie van de voorgebakken pagina, om een wit gat
 * te verbergen. Dat gat had een andere oorzaak, en die is nu weg: elke pagina
 * laadde de code van de homepage vooruit in plaats van zijn eigen code, zodat
 * React na het opstarten alsnog moest wachten. Zie scripts/prerender.mjs.
 *
 * De kopie is er weer uit, want hij loste het niet op maar verplaatste het: in
 * plaats van een korte flits zag je de pagina heel even in een iets andere
 * opmaak staan, en dat valt meer op dan wit.
 */
/**
 * Het laadscherm, maar alleen als er niets anders te zien is.
 *
 * Staat de voorgebakken pagina er nog (zie main.tsx), dan is die het laadscherm
 * en tonen we hier niets. Deden we dat wel, dan kwam er onder de zichtbare
 * pagina een leeg vlak van een volledig scherm bij. De pagina wordt daardoor
 * twee schermen lang en meteen daarna weer één, en dat zie je op een telefoon
 * terug als een trilling: de adresbalk van Safari reageert op zo'n verandering
 * in paginahoogte.
 *
 * Bij navigeren binnen de site is die laag er niet, en dan hoort er wel een
 * laadscherm te komen.
 */
const Laadscherm = () => {
  if (typeof document !== "undefined" && document.getElementById("voorvertoning")) {
    return null;
  }
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-pulse text-brand-blue text-lg">Laden...</div>
    </div>
  );
};

/**
 * Haalt de voorgebakken pagina weg zodra React zijn eerste pagina heeft
 * neergezet. Zie main.tsx voor waarom die laag er staat.
 *
 * Met useLayoutEffect en niet met useEffect: dit moet gebeuren vóór het scherm
 * opnieuw getekend wordt. Anders staat de pagina er heel even twee keer onder
 * elkaar.
 */
const VoorvertoningWeg = () => {
  useLayoutEffect(() => {
    document.getElementById("voorvertoning")?.remove();
  }, []);
  return null;
};

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

/**
 * De luisteraars voor klikken op het telefoonnummer en het e-mailadres. Eén
 * keer, hier, en niet per pagina: anders vuurt de gebeurtenis twee keer.
 */
zetKlikluisteraars();
startApolloAlsToegestaan();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Buiten de Suspense: de keuze moet ook te maken zijn terwijl de
              pagina nog laadt. */}
          <Cookiebanner />
          {/* Geen laadscherm zolang de voorgebakken pagina er nog staat: die
              is het laadscherm. Staat hij er niet, bijvoorbeeld bij navigeren
              binnen de site, dan komt Laadscherm alsnog in beeld. */}
          <Suspense fallback={<Laadscherm />}>
            <Profiler id="App" onRender={onRenderCallback}>
              <VoorvertoningWeg />
              <LanguageSync />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                {/* English routes (mirror of NL pages) */}
                <Route path="/en" element={<LandingPage />} />
                <Route path="/en/method" element={<DeMethode />} />
                <Route path="/en/about-us" element={<OverOns />} />
                <Route path="/en/contact" element={<Contact />} />
                <Route path="/en/sustainable-employability" element={<Vitaliteitstraining />} />
                <Route path="/en/improve-team-performance" element={<DuurzameInzetbaarheidTraining />} />
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
                {/* /calendar stuurde door naar Google Calendar. Die route is nu
                    een 301 in netlify.toml naar de pagina hieronder. */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/9-stippen" element={<NegenStippen />} />
                <Route path="/stressmanagement-training" element={<StressManagement />} />
                <Route path="/prestatie-training" element={<PrestatieProgramma />} />
                <Route path="/duurzame-inzetbaarheid" element={<Vitaliteitstraining />} />
                <Route path="/team-prestaties-verbeteren" element={<DuurzameInzetbaarheidTraining />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/ziekteverzuim-verlagen-wetenschappelijk-bewezen-aanpak-2025" element={<ZiekteverzuimVerlagen />} />
                <Route path="/blog/verborgen-kosten-ziekteverzuim-rekenmodel" element={<VerborgenKostenZiekteverzuim />} />
                <Route path="/blog/hoe-verlaag-ik-het-ziekteverzuim-in-mijn-organisatie" element={<HoeVerlaagIkZiekteverzuim />} />
                <Route path="/algemene-voorwaarden" element={<AlgemeneVoorwaarden />} />
                <Route path="/privacy" element={<PrivacyNotice />} />
                <Route path="/en/privacy" element={<PrivacyNotice />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/en/cookies" element={<Cookies />} />
                
                {/* De bedanktpagina's van de twee lead generators.
                    Bewust vier adressen en niet één: dit is waar Google Ads de
                    conversie op meet, en per doelgroep een eigen URL geeft een
                    eigen conversieactie en een eigen remarketinglijst.
                    Ze staan bewust NIET in ROUTE_MAP: ze worden niet
                    geprerenderd, krijgen noindex mee en horen niet in de
                    sitemap. Daarom staan ze wel als status 200 in netlify.toml,
                    anders vallen ze vanaf de volgende deploy onder de 404. */}
                <Route path="/bedankt/roi-hr" element={<BedanktRoi doelgroep="hr" />} />
                <Route path="/bedankt/roi-management" element={<BedanktRoi doelgroep="management" />} />
                <Route path="/bedankt/roi" element={<BedanktRoi doelgroep="onbekend" />} />
                <Route path="/bedankt/wetenschappelijk-rapport" element={<BedanktRapport />} />
                <Route path="/en/thank-you/roi-hr" element={<BedanktRoi doelgroep="hr" />} />
                <Route path="/en/thank-you/roi-management" element={<BedanktRoi doelgroep="management" />} />
                <Route path="/en/thank-you/roi" element={<BedanktRoi doelgroep="onbekend" />} />
                <Route path="/en/thank-you/scientific-report" element={<BedanktRapport />} />

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
