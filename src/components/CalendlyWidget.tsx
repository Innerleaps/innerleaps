import { useEffect, useRef, useState } from "react";

/**
 * De boekingswidget van Calendly, inline in de pagina.
 *
 * Wat hier bewust NIET gebeurt: het laden van `assets.calendly.com/.../widget.js`.
 * Dat script doet maar twee dingen. Het bouwt een iframe-URL, en het luistert
 * op berichten uit dat iframe. Beide doen we hier zelf, en dat scheelt een
 * volledige heen-en-weer naar een vreemd domein voordat het boekingsscherm ook
 * maar begint te laden.
 *
 * Het loste ook een echte bug op. `widget.js` zoekt maar één keer, op het
 * moment dat het script laadt, naar elementen met `.calendly-inline-widget`.
 * Bij navigeren binnen de app staat het script er al, dus een widget die daarna
 * in beeld komt werd nooit meer gevuld: je zag een leeg vlak. Nu rendert React
 * het iframe zelf, dus dat kan niet meer gebeuren.
 *
 * Het luistert mee op het bericht dat Calendly stuurt zodra iemand een afspraak
 * afrondt, en duwt dat naar de dataLayer. Er staat op dit moment geen Google
 * Tag Manager op de site, maar dataLayer is een gewone array, dus dit is zonder
 * container onschadelijk. Zodra GTM er wel staat, is er alleen nog een trigger
 * op de gebeurtenis `calendly_event_scheduled` nodig. Geen code meer.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

interface CalendlyWidgetProps {
  /** Anker waar de knoppen elders op de pagina naartoe scrollen. */
  id?: string;
  /** Starthoogte van het iframe. Calendly meldt daarna zijn eigen hoogte. */
  height?: number;
  /**
   * Staat de widget boven of vlak onder de vouw, zet dit dan aan. Dan wachten
   * we niet op de waarnemer die kijkt of hij in beeld komt, maar begint het
   * laden in dezelfde tel als de rest van de pagina.
   */
  eager?: boolean;
}

const CALENDLY_BASE = "https://calendly.com/bas-innerleaps/30min";

/**
 * Precies de URL die `widget.js` ook zou bouwen, inclusief `embed_domain` en
 * `embed_type`. Zonder `embed_type` weigert Calendly het scherm in een iframe.
 *
 * `embed_domain` staat bewust vast op het echte domein in plaats van op
 * `window.location.hostname`. Daardoor is deze URL een constante, en dus al
 * bekend op het moment dat de pagina wordt voorgebakken. Het iframe staat
 * daarmee gewoon in de HTML die de bezoeker binnenkrijgt en begint te laden
 * terwijl de browser die HTML nog aan het lezen is, dus nog voordat React ook
 * maar draait.
 *
 * Zou de waarde per omgeving verschillen, dan stond er iets anders in de
 * voorgebakken HTML dan React er daarna van maakt, en dan laadt het iframe een
 * tweede keer. Precies het tegenovergestelde van wat we willen. Nagemeten dat
 * Calendly niet controleert of het domein klopt: het scherm laadt en de
 * berichten komen door. Het veld is voor hun eigen statistieken.
 */
const CALENDLY_URL =
  `${CALENDLY_BASE}?` +
  new URLSearchParams({
    embed_domain: "innerleaps.nl",
    embed_type: "Inline",
    hide_event_type_details: "1",
    hide_gdpr_banner: "1",
    // Let op dat deze drie hier staan en niet alleen in Calendly zelf:
    // URL-parameters winnen van de instellingen daar.
    //
    // Bewust een lichte kalender, met het blauwe kader eromheen in de pagina.
    // Een donkere achtergrond is geprobeerd en werkt niet met oranje: Calendly
    // tekent beschikbare dagen als een half-doorzichtige cirkel van
    // `primary_color`, en oranje op donker wordt daarin modderig paars. Precies
    // de dagen die je moet aanklikken werden dan het slechtst zichtbaar. Op wit
    // blijft het oranje wel staan, en het kader eromheen geeft het blok het
    // gewicht dat de donkere variant moest brengen.
    background_color: "ffffff",
    text_color: "230c47",
    primary_color: "f47340",
  }).toString();

/**
 * Wat je ziet terwijl Calendly laadt.
 *
 * Een draaiend rondje zegt alleen "wacht". Deze schets heeft de vorm van de
 * kalender die eraan komt, dus je ziet meteen waar je op wacht en waar je
 * straks moet klikken. Dezelfde wachttijd voelt daardoor korter, en de pagina
 * springt niet als het echte scherm eroverheen valt.
 */
const CalendlySkeleton = () => (
  <div className="absolute inset-0 z-10 animate-pulse bg-white p-6" aria-hidden="true">
    <div className="mx-auto h-5 w-40 rounded bg-slate-200" />
    <div className="mx-auto mt-6 h-4 w-28 rounded bg-slate-200" />
    <div className="mx-auto mt-6 grid max-w-sm grid-cols-7 gap-2">
      {Array.from({ length: 35 }).map((_, i) => (
        <div key={i} className="aspect-square rounded-full bg-slate-200" />
      ))}
    </div>
    <div className="mt-8 h-3 w-24 rounded bg-slate-200" />
    <div className="mt-3 h-3 w-48 rounded bg-slate-200" />
  </div>
);

const CalendlyWidget = ({ id = "afspraak", height = 700, eager = false }: CalendlyWidgetProps) => {
  const container = useRef<HTMLDivElement>(null);
  // Pas laden als de widget in de buurt van het scherm komt. Staat hij onderaan
  // een lange pagina, dan kost hij de bezoeker niets tot hij ernaartoe scrollt.
  const [visible, setVisible] = useState(eager);
  const [loaded, setLoaded] = useState(false);
  const [frameLoaded, setFrameLoaded] = useState(false);
  const [frameHeight, setFrameHeight] = useState(height);

  useEffect(() => {
    if (visible) return;
    const el = container.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Ruim voorladen, zodat het scherm er al staat voordat je er bent.
      { rootMargin: "800px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  /**
   * Vangnet. Normaal haalt `calendly.event_type_viewed` de schets weg. Komt dat
   * bericht om wat voor reden dan ook niet, dan mag de schets niet eeuwig
   * blijven staan, dus na het laden van het iframe halen we hem alsnog weg.
   *
   * Bewust ruim. Dit stond eerst op vier seconden, en op een trage verbinding
   * haalde dat de schets weg terwijl Calendly nog aan het opstarten was: je
   * keek dan naar een leeg wit vlak, precies wat de schets moest voorkomen.
   * Deze grens is er alleen voor het geval het bericht helemaal nooit komt.
   */
  useEffect(() => {
    if (!frameLoaded || loaded) return;
    const timer = window.setTimeout(() => setLoaded(true), 12000);
    return () => window.clearTimeout(timer);
  }, [frameLoaded, loaded]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const data = e.data as { event?: string; payload?: Record<string, unknown> } | undefined;
      if (typeof e.origin !== "string" || !e.origin.includes("calendly.com")) return;

      // Calendly meldt zijn eigen hoogte. Zonder dit krijg je op mobiel een
      // scrollbalk binnen een scrollbalk.
      if (data?.event === "calendly.page_height") {
        const raw = data.payload?.height;
        const parsed = typeof raw === "string" ? parseInt(raw, 10) : Number(raw);
        if (Number.isFinite(parsed) && parsed > 200) setFrameHeight(parsed);
      }

      // Het eerste teken van leven uit het iframe. Calendly stuurt dit zodra
      // zijn eigen scherm staat, wat eerder is dan het `load`-moment van het
      // iframe zelf. De schets mag dan al weg.
      if (data?.event === "calendly.event_type_viewed") setLoaded(true);

      // Alleen de afgeronde boeking telt als conversie.
      if (data?.event === "calendly.event_scheduled") {
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
      className="relative scroll-mt-28 overflow-hidden rounded-lg bg-white"
      style={{ minWidth: "min(320px, 100%)", height: frameHeight }}
    >
      {!loaded && <CalendlySkeleton />}
      {visible && (
        <iframe
          src={CALENDLY_URL}
          title="Calendly"
          onLoad={() => setFrameLoaded(true)}
          className="h-full w-full border-0"
          loading="eager"
        />
      )}
    </div>
  );
};

export default CalendlyWidget;
