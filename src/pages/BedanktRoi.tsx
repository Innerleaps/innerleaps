import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import Footer from "@/components/Footer";
import PageSeo from "@/components/PageSeo";
import RoiResultaat from "@/components/RoiResultaat";
import BedanktBooking from "@/components/BedanktBooking";

/** Pas laden als iemand hem echt opent. Zonder berekening is dat een
 *  uitzondering, dus dit hoeft niet in de eerste lading mee. */
const CalculatorModal = lazy(() => import("@/components/CalculatorModal"));
import { Button } from "@/components/ui/button";
import { detectLanguageFromPath } from "@/i18n/config";
import { leesRoiOverdracht, type Doelgroep, type RoiOverdracht } from "@/lib/bedankt";
import { scrollNaarAfspraak } from "@/lib/booking";
import { meldRoiLead } from "@/lib/conversies";

/**
 * De bedanktpagina van de rekentool, in drie smaken.
 *
 * Waarom drie adressen voor bijna dezelfde pagina: dit is de conversie waar
 * Google Ads op stuurt. Een eigen URL per doelgroep geeft een eigen
 * conversieactie en een eigen remarketinglijst, en dus zicht op welke doelgroep
 * daadwerkelijk oplevert. Dat gaat niet als HR en directie op hetzelfde adres
 * uitkomen.
 *
 * De pagina moet ook werken zonder berekening. Dat is geen randgeval: je komt
 * hier terecht na een verversing, via de geschiedenis, via een doorgestuurde
 * link, en als je zelf komt kijken of de tag vuurt. Dan staat er de kop zonder
 * bedrag en een knop terug naar de rekentool, in plaats van een leeg scherm.
 */
interface BedanktRoiProps {
  doelgroep: Doelgroep;
}

/** Een kop waarin <0>...</0> uit de vertaling oranje wordt. */
const Kop = ({ sleutel, t, waarden }: { sleutel: string; t: TFunction; waarden?: Record<string, string> }) => (
  <Trans
    i18nKey={sleutel}
    t={t}
    values={waarden}
    components={[<span className="text-brand-orange" />]}
  />
);

const BedanktRoi = ({ doelgroep }: BedanktRoiProps) => {
  const { t, i18n } = useTranslation("bedankt");
  const location = useLocation();
  const { pathname } = location;
  const taal = detectLanguageFromPath(pathname);
  /**
   * Meteen bij de eerste render lezen, niet in een effect.
   *
   * Deze pagina wordt voorgebakken in de versie zonder bedrag, want tijdens het
   * bouwen is er geen berekening. Leest React de opslag pas in een effect, dan
   * ziet de bezoeker eerst die lege versie en pas daarna zijn bedrag. Zo is het
   * er in één keer.
   */
  const [overdracht, setOverdracht] = useState<RoiOverdracht | null>(() => leesRoiOverdracht());
  const [rekentoolOpen, setRekentoolOpen] = useState(false);

  /**
   * Opnieuw lezen bij elke navigatie hiernaartoe, niet alleen bij het opbouwen.
   *
   * Wie op deze pagina de rekentool nog eens invult, wordt door zijn doelgroep
   * naar precies dezelfde pagina gestuurd. React bouwt die dan niet opnieuw op,
   * dus met alleen een beginwaarde bleef de oude stand staan en zag de bezoeker
   * de versie zonder berekening. Dat is wat er misging.
   *
   * `location.key` verandert wel bij zo'n navigatie, ook naar hetzelfde pad.
   * Is het dezelfde berekening, dan houden we het bestaande object vast, zodat
   * de conversiemelding er niet nog een keer overheen gaat.
   */
  useEffect(() => {
    const vers = leesRoiOverdracht();
    setOverdracht((huidig) => (vers?.id === huidig?.id ? huidig : vers));
    window.scrollTo(0, 0);
  }, [location.key]);

  // De melding gaat pas weg als de berekening er echt is, en maar één keer per
  // invulling. Zonder die rem telt elke verversing als een nieuwe lead.
  useEffect(() => {
    if (!overdracht) return;
    meldRoiLead({
      id: overdracht.id,
      doelgroep: overdracht.doelgroep,
      besparingVoorzichtig: overdracht.resultaten.scenarios.conservative.netBesparing,
      besparingPositief: overdracht.resultaten.scenarios.positive.netBesparing,
      aantalWerknemers: parseInt(overdracht.invoer.aantalWerknemers, 10) || 0,
      emailHash: overdracht.emailHash,
    });
  }, [overdracht]);

  const besparing = overdracht?.resultaten.scenarios.conservative.netBesparing ?? 0;

  /**
   * Het bedrag komt uit het voorzichtige scenario, niet uit het positieve.
   * "Bespaar ten minste" is dan een ondergrens die je waarmaakt, en twee regels
   * lager ziet de bezoeker dat er meer in kan zitten. Andersom zou het eerste
   * getal onder de kop lager zijn dan de kop zelf, en dat leest als terugkrabbelen.
   *
   * Bij nul of minder valt hij terug op de kop zonder bedrag. Dat kan alleen bij
   * onzinnige invoer, maar "Bespaar ten minste € -2.000" wil je nooit zien.
   */
  const heeftBerekening = Boolean(overdracht) && besparing > 0;

  const bedrag = useMemo(
    () =>
      new Intl.NumberFormat(taal === "en" ? "en-GB" : "nl-NL", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(besparing),
    [besparing, taal],
  );

  return (
    <div className="min-h-screen bg-brand-gray-light">
      {/* noindex: dit zijn vier bijna identieke pagina's achter een formulier.
          Laat je ze indexeren, dan concurreren ze met de pagina's die wél moeten
          ranken. "follow" blijft aan, zodat de links eruit gewoon meetellen. */}
      <PageSeo
        title={t(`roi.metaTitle.${doelgroep}`)}
        description={t("roi.intro")}
        noindex
      />
      <SimplifiedNavigation />

      <main>
        <section className="section-padding">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              {/* Een accent schrijf je in de JSON als <0>...</0>, nooit als
                  HTML, zodat de vertaling de opmaak meeneemt in plaats van hem
                  na te bouwen. */}
              <h1 className="text-3xl font-bold leading-tight text-brand-purple md:text-4xl lg:text-5xl">
                {heeftBerekening ? (
                  <Kop sleutel="roi.title" t={t} waarden={{ bedrag }} />
                ) : (
                  <Kop sleutel="roi.titleZonderBerekening" t={t} />
                )}
              </h1>

              {heeftBerekening ? (
                <>
                  {/* De belofte dat de mail onderweg is staat er alleen als hij
                      er echt uit is. Weigerde de functie, dan blijft de
                      berekening staan maar zwijgen we over de mail. */}
                  <p className="mt-4 text-lg leading-relaxed text-brand-gray-medium md:text-xl">
                    {overdracht?.mailVerstuurd ? t("roi.intro") : t("roi.introZonderMail")}
                  </p>

                  {/* De hoofdactie, meteen in beeld. Scrollt naar het
                      afspraakblok onderaan in plaats van een pagina te laden. */}
                  <div className="mt-6">
                    <Button
                      onClick={scrollNaarAfspraak}
                      className="min-h-[44px] bg-brand-orange px-8 text-base font-semibold hover:bg-brand-orange/90 md:text-lg"
                    >
                      {t("cta.bookCallWithBas", { ns: "common" })}
                    </Button>
                  </div>

                  <div className="mt-8">
                    <RoiResultaat
                      resultaten={overdracht!.resultaten}
                      invoer={overdracht!.invoer}
                    />
                  </div>
                </>
              ) : (
                /* De rekentool meteen openen in plaats van terug te linken naar
                   de homepage. Dat was ook een loze verwijzing: het anker
                   #calculator bestaat daar helemaal niet. Zo hoeft iemand die
                   zijn berekening kwijt is niet eerst een pagina te laden en
                   dan zelf de tool op te zoeken. */
                <div className="mt-8">
                  <Button
                    onClick={() => setRekentoolOpen(true)}
                    className="min-h-[44px] bg-brand-orange px-8 text-base font-semibold hover:bg-brand-orange/90 md:text-lg"
                  >
                    {t("cta.calculateSavings", { ns: "common" })}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        <BedanktBooking
          title={<Kop sleutel="roi.booking.title" t={t} />}
          intro={t("roi.booking.intro")}
        />
      </main>

      <Footer />

      {/* De doelgroep van deze pagina staat in DOELGROEP_PER_PAD, dus wie hier
          opnieuw rekent komt op dezelfde bedanktpagina terug in plaats van op
          de neutrale. */}
      <Suspense fallback={null}>
        {rekentoolOpen && (
          <CalculatorModal isOpen={rekentoolOpen} onClose={() => setRekentoolOpen(false)} />
        )}
      </Suspense>
    </div>
  );
};

export default BedanktRoi;
