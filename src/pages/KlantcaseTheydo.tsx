import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import Footer from "@/components/Footer";
import PageSeo from "@/components/PageSeo";
import StickyCtaButtons from "@/components/StickyCtaButtons";
import { Button } from "@/components/ui/button";
import { detectLanguageFromPath } from "@/i18n/config";
import { offertePad } from "@/lib/offerte";
import { meldOfferteKlik } from "@/lib/conversies";
import {
  THEYDO_LOGO,
  THEYDO_CASE_JOCHEM,
  THEYDO_CASE_JOCHEM_LACHT,
  THEYDO_CASE_HEIDI,
} from "@/lib/klantervaringen";

const CalculatorModal = lazy(() => import("@/components/CalculatorModal"));

/**
 * /klantcases/theydo en /en/case-studies/theydo: de klantcase van TheyDo.
 *
 * Opbouw "twee stoelen aan tafel": eerst het resultaat en de feiten, daarna de
 * vragen die een koper zich stelt, elk beantwoord door wie het weet. Jochem
 * (CEO) over twijfel en geld, Heidi (HR) over de moeite, de data over wat
 * deelnemers merkten.
 *
 * Elke tekst is stap voor stap met Bas gekozen, zie docs/case-theydo.md. De
 * quotes zijn letterlijke woorden van Jochem en Heidi, alleen ingekort. Pas ze
 * dus niet "even mooier" aan: beiden keuren de pagina goed voor livegang.
 *
 * Tekst tussen [vierkante haken] is een plaatshouder voor een feit dat nog
 * openstaat. Die horen er voor livegang allemaal uit.
 */

type Persoon = "jochem" | "heidi";

const PORTRET: Record<Persoon, string> = {
  jochem: THEYDO_CASE_JOCHEM,
  heidi: THEYDO_CASE_HEIDI,
};

const ORANJE = [<span className="text-brand-orange" />];

/** Sectiekop met het oranje accent uit de JSON. Bewust een maat kleiner dan de
 *  standaard sectiekop: de koppen hier zijn hele vragen. */
const Kop = ({ i18nKey }: { i18nKey: string }) => {
  const { t } = useTranslation("caseTheydo");
  return (
    <h2 className="text-4xl md:text-5xl font-bold text-brand-purple leading-tight max-w-4xl">
      <Trans i18nKey={i18nKey} t={t} components={ORANJE} />
    </h2>
  );
};

/** Een sectie, afwisselend wit en off-white zoals op de rest van de site. */
const Sectie = ({ kleur, children }: { kleur: "wit" | "beige"; children: ReactNode }) => (
  <section className={`${kleur === "wit" ? "bg-white" : "bg-brand-off-white"} py-14 md:py-20 lg:py-24`}>
    <div className="container-custom">{children}</div>
  </section>
);

/**
 * Een quote met naam en functie. De kaart krijgt de kleur die afsteekt tegen
 * de sectie. Het portretje heeft een lege alt: de naam staat er direct naast,
 * dus een schermlezer zou hem anders twee keer voorlezen.
 */
const Citaat = ({
  tekst,
  persoon,
  op,
  groot = false,
  zonderPortret = false,
}: {
  tekst: string;
  persoon: Persoon;
  op: "wit" | "beige";
  groot?: boolean;
  zonderPortret?: boolean;
}) => {
  const { t } = useTranslation("caseTheydo");
  return (
    <figure className={`${op === "wit" ? "bg-brand-off-white" : "bg-white shadow-sm"} rounded-xl p-6 md:p-8`}>
      <blockquote
        className={`text-brand-purple ${
          groot ? "text-xl md:text-3xl font-semibold leading-snug" : "text-xl md:text-2xl leading-relaxed"
        }`}
      >
        &ldquo;{tekst}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-4">
        {!zonderPortret && (
          <img
            src={PORTRET[persoon]}
            alt=""
            width={700}
            height={770}
            loading="lazy"
            decoding="async"
            className="h-14 w-14 flex-shrink-0 rounded-full object-cover object-top"
          />
        )}
        <div className="leading-tight">
          <cite className="not-italic block text-lg font-bold text-brand-gray-dark">
            {t(`people.${persoon}.name`)}
          </cite>
          <span className="block text-base text-brand-gray-medium">{t(`people.${persoon}.role`)}</span>
        </div>
      </figcaption>
    </figure>
  );
};

const KlantcaseTheydo = () => {
  const { t } = useTranslation("caseTheydo");
  const { pathname } = useLocation();
  const lang = detectLanguageFromPath(pathname);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = t("stats", { returnObjects: true }) as Array<{ value: string; label: string }>;
  const feiten = t("glance.items", { returnObjects: true }) as Array<{ label: string; value: string }>;
  const effecten = t("changed.items", { returnObjects: true }) as Array<{ value: number; label: string }>;
  const aanpassingen = t("feedback.items", { returnObjects: true }) as string[];
  const meting = t("know.items", { returnObjects: true }) as string[];

  const rekenknop = (
    <button
      type="button"
      onClick={() => setIsCalculatorOpen(true)}
      className="font-semibold text-brand-purple underline decoration-brand-orange decoration-2 underline-offset-4 hover:decoration-brand-purple"
    />
  );

  /**
   * Article en geen Review: een recensie die je over jezelf publiceert telt
   * Google niet mee, en dat oogt als trucje. Wat dit wel zegt: dit is een
   * verhaal van Innerleaps, over TheyDo.
   */
  /** Het deelvoorbeeld voor LinkedIn en WhatsApp, per taal. Bewust PNG en geen
   *  WebP: niet elke app toont WebP in een voorbeeld. Zie CLAUDE.md. */
  const deelbeeld = `/social/klantcase-theydo-${lang}.png`;

  const artikel = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("meta.title").replace(/\s*\|.*$/, ""),
    description: t("meta.description"),
    inLanguage: lang,
    datePublished: "2026-10-15",
    image: `https://innerleaps.nl${deelbeeld}`,
    author: { "@type": "Organization", name: "Innerleaps", url: "https://innerleaps.nl" },
    publisher: { "@type": "Organization", name: "Innerleaps", url: "https://innerleaps.nl" },
    about: { "@type": "Organization", name: "TheyDo", url: "https://www.theydo.com" },
  };

  return (
    <div className="min-h-screen bg-white">
      <PageSeo title={t("meta.title")} description={t("meta.description")} image={deelbeeld} type="article">
        <script type="application/ld+json">{JSON.stringify(artikel)}</script>
      </PageSeo>
      <SimplifiedNavigation />

      <main>
        {/* Hero. Het id is het peilpunt voor de zwevende offertebalk. */}
        <section id="hero" className="bg-brand-off-white pt-10 pb-14 md:pt-16 md:pb-20">
          <div className="container-custom grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <p className="flex items-center gap-3 text-lg font-semibold text-brand-gray-dark">
                <span>{t("eyebrow")}</span>
                <span aria-hidden="true" className="text-brand-orange">
                  ·
                </span>
                <img src={THEYDO_LOGO} alt="TheyDo" className="h-6 w-auto" />
              </p>
              <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight">
                <Trans i18nKey="hero.title" t={t} components={ORANJE} />
              </h1>
              <p className="mt-6 max-w-2xl text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </div>

            <div className="relative lg:pl-6">
              <img
                src={THEYDO_CASE_JOCHEM}
                alt={t("hero.photoAlt")}
                width={700}
                height={770}
                loading="eager"
                {...{ fetchpriority: "high" }}
                className="block w-full rounded-2xl object-cover shadow-xl"
              />
              <figure className="relative -mt-10 mx-3 rounded-xl bg-white p-5 shadow-xl lg:absolute lg:bottom-8 lg:-left-12 lg:mx-0 lg:mt-0 lg:max-w-[340px]">
                <blockquote className="text-lg font-semibold leading-snug text-brand-purple">
                  &ldquo;{t("hero.quote")}&rdquo;
                </blockquote>
                <figcaption className="mt-3 leading-tight">
                  <cite className="not-italic block text-base font-bold text-brand-gray-dark">
                    {t("people.jochem.name")}
                  </cite>
                  <span className="block text-base text-brand-gray-medium">{t("people.jochem.role")}</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* De drie cijfers en de feiten */}
        <Sectie kleur="wit">
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.value} className="rounded-xl bg-brand-off-white p-6 md:p-8">
                <p className="text-5xl md:text-6xl font-bold text-brand-orange">{stat.value}</p>
                <p className="mt-3 text-xl text-brand-gray-dark leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-brand-purple">{t("glance.title")}</h2>
            <dl className="mt-6 grid gap-x-8 gap-y-4 md:grid-cols-[200px_1fr]">
              {feiten.map((feit) => (
                <div key={feit.label} className="contents">
                  <dt className="text-xl font-semibold text-brand-purple">{feit.label}</dt>
                  <dd className="text-xl text-brand-gray-medium leading-relaxed">{feit.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Sectie>

        {/* Voelt het niet als een teken van zwakte? */}
        <Sectie kleur="beige">
          <Kop i18nKey="weakness.title" />
          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center">
            <Citaat tekst={t("weakness.quote1")} persoon="jochem" op="beige" />
            <div>
              <p className="text-3xl md:text-4xl font-bold leading-tight text-brand-purple">{t("weakness.fact")}</p>
              <p className="mt-5 text-xl md:text-2xl leading-relaxed text-brand-gray-medium">{t("weakness.bridge")}</p>
            </div>
          </div>
          <div className="mt-8">
            <Citaat tekst={t("weakness.quote2")} persoon="jochem" op="beige" groot />
          </div>
        </Sectie>

        {/* Wat veranderde er voor deelnemers? */}
        <Sectie kleur="wit">
          <Kop i18nKey="changed.title" />
          <p className="mt-6 max-w-3xl text-xl md:text-2xl leading-relaxed text-brand-gray-medium">
            {t("changed.intro")}
          </p>
          <ul className="mt-10 max-w-4xl space-y-6">
            {effecten.map((effect) => (
              <li key={effect.label}>
                <div className="flex items-baseline justify-between gap-4 text-xl">
                  <span className="font-semibold text-brand-purple">{effect.label}</span>
                  <span className="text-2xl font-bold text-brand-orange">{effect.value}%</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-brand-off-white" aria-hidden="true">
                  <div className="h-full rounded-full bg-brand-orange" style={{ width: `${effect.value}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <Citaat tekst={t("changed.quoteJochem")} persoon="jochem" op="wit" />
            <Citaat tekst={t("changed.quoteHeidi")} persoon="heidi" op="wit" />
          </div>
        </Sectie>

        {/* Verdient het zich terug? */}
        <Sectie kleur="beige">
          <Kop i18nKey="payback.title" />
          <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            <img
              src={THEYDO_CASE_JOCHEM_LACHT}
              alt=""
              width={700}
              height={770}
              loading="lazy"
              decoding="async"
              className="hidden w-full rounded-2xl object-cover shadow-xl lg:block"
            />
            <div className="space-y-8">
              <Citaat tekst={t("payback.quoteJochem")} persoon="jochem" op="beige" groot />
              <p className="text-xl md:text-2xl leading-relaxed text-brand-gray-medium">
                <Trans i18nKey="payback.breakEven" t={t} components={[rekenknop]} />
              </p>
              <Citaat tekst={t("payback.quoteHeidi")} persoon="heidi" op="beige" />
            </div>
          </div>
        </Sectie>

        {/* Wat vraagt het van HR? */}
        <Sectie kleur="wit">
          <Kop i18nKey="hr.title" />
          <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            <img
              src={THEYDO_CASE_HEIDI}
              alt=""
              width={820}
              height={875}
              loading="lazy"
              decoding="async"
              className="hidden w-full rounded-2xl object-cover shadow-xl lg:block"
            />
            <div className="space-y-8">
              <Citaat tekst={t("hr.quoteEffort")} persoon="heidi" op="wit" />
              <Citaat tekst={t("hr.quoteConnection")} persoon="heidi" op="wit" />
            </div>
          </div>
        </Sectie>

        {/* Wat de feedback van TheyDo veranderde */}
        <Sectie kleur="beige">
          <Kop i18nKey="feedback.title" />
          <p className="mt-6 max-w-3xl text-xl md:text-2xl leading-relaxed text-brand-gray-medium">
            {t("feedback.intro")}
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {aanpassingen.map((punt) => (
              <li key={punt} className="flex gap-4 rounded-xl bg-white p-6 shadow-sm md:p-8">
                <Check className="mt-1 h-6 w-6 flex-shrink-0 stroke-[3] text-brand-orange" aria-hidden="true" />
                <span className="text-xl leading-relaxed text-brand-gray-dark">{punt}</span>
              </li>
            ))}
          </ul>
        </Sectie>

        {/* Blijft het effect? */}
        <Sectie kleur="wit">
          <Kop i18nKey="last.title" />
          <p className="mt-6 max-w-3xl text-xl md:text-2xl leading-relaxed text-brand-gray-medium">
            {t("last.body")}
          </p>
          <div className="mt-10 max-w-4xl">
            <Citaat tekst={t("last.quoteJochem")} persoon="jochem" op="wit" groot />
          </div>
        </Sectie>

        {/* Hoe weten we dit? */}
        <Sectie kleur="beige">
          <Kop i18nKey="know.title" />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <ul className="space-y-5">
              {meting.map((punt) => (
                <li key={punt} className="flex gap-4">
                  <Check className="mt-1 h-6 w-6 flex-shrink-0 stroke-[3] text-brand-orange" aria-hidden="true" />
                  <span className="text-xl leading-relaxed text-brand-gray-dark">{punt}</span>
                </li>
              ))}
            </ul>
            {/* Plaatshouder: hier komt een voorbeeld van het persoonlijke
                impactrapport, met verzonnen of volledig onherkenbare data. */}
            <div className="flex min-h-[240px] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 text-center text-xl text-brand-gray-medium">
              {t("know.reportPlaceholder")}
            </div>
          </div>
          <p className="mt-10 text-base text-brand-gray-medium">{t("know.sources")}</p>
        </Sectie>

        {/* Oproep tot actie: dezelfde offerteknop als in de header */}
        <section className="bg-brand-blue py-14 md:py-20 lg:py-24">
          <div className="container-custom text-center">
            <h2 className="mx-auto max-w-3xl text-4xl md:text-5xl font-bold leading-tight text-white">
              <Trans i18nKey="cta.title" t={t} components={ORANJE} />
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-xl md:text-2xl leading-relaxed text-white/90">{t("cta.body")}</p>
            <div className="mt-10 flex flex-col items-center gap-5">
              <Link to={offertePad(lang)} state={{ van: pathname }} onClick={() => meldOfferteKlik("klantcase")}>
                <Button
                  tabIndex={-1}
                  size="lg"
                  className="min-h-[44px] rounded-lg px-8 py-4 text-lg font-semibold shadow-xl"
                >
                  {t("cta.requestQuote", { ns: "common" })}
                </Button>
              </Link>
              <button
                type="button"
                onClick={() => setIsCalculatorOpen(true)}
                className="border-b-2 border-brand-orange/60 pb-0.5 text-lg font-semibold text-white transition-colors hover:border-brand-orange"
              >
                {t("cta.calculatorLink")} <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyCtaButtons />

      <Suspense fallback={null}>
        <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
      </Suspense>
    </div>
  );
};

export default KlantcaseTheydo;
