import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Check } from "lucide-react";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import Footer from "@/components/Footer";
import vgzLogo from "@/assets/Vitaliteitprogramma_herkent_door_vgz.png";
import czLogo from "@/assets/Vitaliteitsprogramma_herkend_door_CZ.png";
import menzisLogo from "@/assets/Vitaliteitsprogramma_herkend_door_menzis.png";
import oxfordLogo from "@/assets/Vitaliteitsprogramma_ontwikkeld_door_oxford.jpg";
import uMassLogo from "@/assets/Vitaliteitsprogramma_ontwikkeld_door_university_of_massachusetts.png";
import uvaLogo from "@/assets/Aandachttraining_aan_de_universiteit_van_amsterdam_new.png";

// Declare gtag for Google Analytics
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, any>) => void;
  }
}

const Bedankt = () => {
  const location = useLocation();
  const state = location.state as { timeslot?: string; calendarUrl?: string; naam?: string } | null;

  const timeslot = state?.timeslot;
  const calendarUrl = state?.calendarUrl;
  const naam = state?.naam || "";

  useEffect(() => {
    window.scrollTo(0, 0);

    // Track page view
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "page_view", {
        page_title: "Bedankt",
        page_path: "/bedankt",
        page_location: window.location.href,
      });
    }
  }, []);

  return (
    <>
      <SimplifiedNavigation />
      <div className="min-h-screen bg-gradient-to-br from-brand-blue-light to-white flex items-center justify-center p-4">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center space-y-8">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600 stroke-[3]" />
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple">
              {naam && `Bedankt ${naam}!`}
              {!naam && "Bedankt voor je aanmelding!"}
            </h1>

            <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed">
              We hebben je gegevens ontvangen en je ontvangt binnenkort een bevestigingsmail met alle details.
            </p>
          </div>

          {/* Chosen Timeslot (only if exists - for masterclass) */}
          {timeslot && (
            <>
              <div className="bg-brand-blue-light/30 rounded-xl p-6 md:p-8 space-y-3">
                <p className="text-sm text-brand-gray-medium uppercase tracking-wide font-semibold">
                  Jouw gekozen tijdstip:
                </p>
                <p className="text-xl md:text-2xl font-bold text-brand-purple">{timeslot}</p>
              </div>

              {/* Calendar CTA */}
              {calendarUrl && (
                <div className="space-y-4">
                  <a
                    href={calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-brand-orange hover:bg-brand-orange/90 text-white py-4 px-8 rounded-lg text-lg font-semibold shadow-xl transition-all transform hover:scale-105"
                  >
                    📅 Voeg toe aan mijn agenda
                  </a>

                  <p className="text-sm text-brand-gray-medium max-w-md mx-auto">
                    Je ontvangt ook een bevestiging per email met de link naar de agenda en meer informatie over de
                    masterclass.
                  </p>
                </div>
              )}

              {/* What to Expect */}
              <div className="pt-8 border-t border-gray-200 space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-brand-purple">Wat je kunt verwachten:</h2>
                <ul className="text-left space-y-3 max-w-md mx-auto">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-brand-gray-medium">
                      Inzicht in jouw stress level (wetenschappelijk onderbouwd)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-brand-gray-medium">Praktische aandachtoefening voor meer focus</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-brand-gray-medium">Reset tool om je werkgeheugen te resetten</span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Mini Trust Section - Updated */}
        <div className="mt-12 text-center space-y-6">
          <h3 className="text-2xl font-bold text-brand-purple">Erkende methode</h3>
          <p className="text-base text-brand-gray-medium max-w-2xl mx-auto">
            Al meer dan 40 jaar wetenschappelijk bewezen en erkend door Nederlandse zorgverzekeraars.
          </p>

          {/* Logo Grid - Universiteiten en Zorgverzekeraars */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
            {/* Universiteiten */}
            <img
              src={oxfordLogo}
              alt="Oxford University"
              className="h-12 sm:h-16 object-contain rounded border border-border"
            />
            <img src={uMassLogo} alt="University of Massachusetts" className="h-12 sm:h-16 object-contain" />
            <img src={uvaLogo} alt="Universiteit van Amsterdam" className="h-12 sm:h-16 object-contain" />

            {/* Zorgverzekeraars */}
            <img src={vgzLogo} alt="VGZ" className="h-12 sm:h-16 object-contain" />
            <img src={czLogo} alt="CZ" className="h-12 sm:h-16 object-contain" />
            <img src={menzisLogo} alt="Menzis" className="h-10 sm:h-14 object-contain" />
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center text-sm text-brand-gray-medium space-y-2">
          <p>Vragen? Neem contact op:</p>
          <p>
            📧{" "}
            <a href="mailto:bas@innerleaps.nl" className="text-brand-orange hover:underline">
              bas@innerleaps.nl
            </a>
          </p>
        </div>
      </div>
    </div>
    <Footer showNavigation={false} />
    </>
  );
};

export default Bedankt;
