import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Check } from "lucide-react";
import vgzLogo from "@/assets/Vitaliteitprogramma_herkent_door_vgz.png";
import czLogo from "@/assets/Vitaliteitsprogramma_herkent_door_CZ.png";
import menzisLogo from "@/assets/Vitaliteitsprogramma_herkent_door_menzis.png";

// Declare gtag for Google Analytics
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, any>) => void;
  }
}

const MasterclassBedankt = () => {
  const location = useLocation();
  const state = location.state as { timeslot?: string; calendarUrl?: string; naam?: string } | null;

  const timeslot = state?.timeslot || "Woensdag, 12 november";
  const calendarUrl = state?.calendarUrl || "https://calendar.app.google/BgGy8cVUSk4w5Zzg8";
  const naam = state?.naam || "";

  useEffect(() => {
    window.scrollTo(0, 0);

    // Track page view
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'page_view', {
        page_title: 'Masterclass Bedankt',
        page_path: '/masterclass-bedankt',
        page_location: window.location.href
      });

      // Track conversion
      window.gtag('event', 'conversion', {
        event_category: 'Masterclass',
        event_label: 'Thank You Page Viewed',
        selected_time: timeslot
      });
    }
  }, [timeslot]);

  const handleCalendarClick = () => {
    // Track calendar link click
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'click', {
        event_category: 'Masterclass',
        event_label: 'Add to Calendar',
        selected_time: timeslot
      });
    }
  };

  return (
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
              {naam && `Gefeliciteerd ${naam}!`}
              {!naam && "Gefeliciteerd!"}
            </h1>
            
            <p className="text-lg md:text-xl text-brand-gray-medium leading-relaxed">
              Je bent aangemeld voor de gratis Masterclass Stressmanagement.
            </p>
          </div>

          {/* Chosen Timeslot */}
          <div className="bg-brand-blue-light/30 rounded-xl p-6 md:p-8 space-y-3">
            <p className="text-sm text-brand-gray-medium uppercase tracking-wide font-semibold">
              Jouw gekozen tijdstip:
            </p>
            <p className="text-xl md:text-2xl font-bold text-brand-purple">
              {timeslot}
            </p>
          </div>

          {/* Calendar CTA */}
          <div className="space-y-4">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCalendarClick}
              className="inline-block bg-brand-orange hover:bg-brand-orange/90 text-white py-4 px-8 rounded-lg text-lg font-semibold shadow-xl transition-all transform hover:scale-105"
            >
              📅 Voeg toe aan mijn agenda
            </a>
            
            <p className="text-sm text-brand-gray-medium max-w-md mx-auto">
              Je ontvangt ook een bevestiging per email met de link naar de agenda en meer informatie over de masterclass.
            </p>
          </div>

          {/* What to Expect */}
          <div className="pt-8 border-t border-gray-200 space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-brand-purple">
              Wat je kunt verwachten:
            </h2>
            <ul className="text-left space-y-3 max-w-md mx-auto">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                <span className="text-brand-gray-medium">
                  Inzicht in jouw stress level (wetenschappelijk onderbouwd)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                <span className="text-brand-gray-medium">
                  Praktische aandachtoefening voor meer focus
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                <span className="text-brand-gray-medium">
                  Reset tool om je werkgeheugen te resetten
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Mini Trust Section */}
        <div className="mt-12 text-center space-y-6">
          <p className="text-brand-gray-medium font-semibold">Vertrouwd door:</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <img src={vgzLogo} alt="VGZ" className="h-8 md:h-10 opacity-70 hover:opacity-100 transition-opacity" />
            <img src={czLogo} alt="CZ" className="h-8 md:h-10 opacity-70 hover:opacity-100 transition-opacity" />
            <img src={menzisLogo} alt="Menzis" className="h-8 md:h-10 opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center text-sm text-brand-gray-medium space-y-2">
          <p>Vragen? Neem contact op:</p>
          <p>
            📧 <a href="mailto:info@innerleaps.nl" className="text-brand-orange hover:underline">info@innerleaps.nl</a>
            {" · "}
            📱 <a href="tel:+31621967068" className="text-brand-orange hover:underline">06 21 96 70 68</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MasterclassBedankt;
