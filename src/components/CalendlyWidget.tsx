import { useEffect, useRef } from "react";

const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

/**
 * De boekingswidget van Calendly, inline in de pagina.
 *
 * Waarom een component en niet gewoon de embed-code plakken: een <script>-tag
 * die je in JSX zet wordt door React als tekst behandeld en voert nooit uit.
 * Dit component injecteert het script eenmalig in de head en laat het daar
 * staan, zodat het bij navigeren binnen de app niet opnieuw wordt geladen.
 *
 * Het luistert ook mee op het bericht dat Calendly stuurt zodra iemand een
 * afspraak afrondt, en duwt dat naar de dataLayer. Er staat op dit moment geen
 * Google Tag Manager op de site, maar dataLayer is een gewone array, dus dit is
 * zonder container onschadelijk. Zodra GTM er wel staat, is er alleen nog een
 * trigger op de gebeurtenis `calendly_event_scheduled` nodig. Geen code meer.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

interface CalendlyWidgetProps {
  /** Anker waar de knoppen elders op de pagina naartoe scrollen. */
  id?: string;
  /** Hoogte van het iframe. Calendly rekent zelf niet mee met de inhoud. */
  height?: number;
}

const CALENDLY_URL =
  "https://calendly.com/bas-innerleaps/30min" +
  "?hide_event_type_details=1&hide_gdpr_banner=1" +
  "&text_color=230c47&primary_color=f47340";

const CalendlyWidget = ({ id = "afspraak", height = 700 }: CalendlyWidgetProps) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.querySelector(`script[src="${CALENDLY_SCRIPT}"]`)) {
      const script = document.createElement("script");
      script.src = CALENDLY_SCRIPT;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      // Calendly stuurt meerdere berichten. Alleen de afgeronde boeking telt.
      const data = e.data as { event?: string; payload?: unknown } | undefined;
      if (
        typeof e.origin === "string" &&
        e.origin.includes("calendly.com") &&
        data?.event === "calendly.event_scheduled"
      ) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "calendly_event_scheduled",
          calendly: data.payload,
        });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div
      id={id}
      ref={container}
      // scroll-mt-28 houdt ruimte vrij voor de sticky header. Zonder dat scrollt
      // een ankerlink de bovenkant van de widget precies onder de balk.
      className="calendly-inline-widget scroll-mt-28"
      data-url={CALENDLY_URL}
      style={{ minWidth: 320, height }}
    />
  );
};

export default CalendlyWidget;
