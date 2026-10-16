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
  THEYDO_CASE_HEIDI,
  IMPACTRAPPORT_VOORBEELD,
} from "@/lib/klantervaringen";

const CalculatorModal = lazy(() => import("@/components/CalculatorModal"));

/**
 * /klantcases/theydo en /en/case-studies/theydo: de klantcase van TheyDo.
 *
 * De pagina leest als een interview, van aanleiding naar resultaat: wat speelde
 * er, wat waren de twijfels, wat merkten collega's, was het het geld waard,
 * hoeveel werk was het, wat kon beter, en zou je het opnieuw doen. Elke kop is
 * de vraag die gesteld is. Per vraag één quote en één feit, en die wisselen van
 * kant zodat de pagina niet één lange kolom tekst wordt.
 *
 * Elke tekst is met Bas gekozen, zie docs/case-theydo.md. De quotes zijn
 * letterlijke woorden van Jochem en Heidi, alleen ingekort. Pas ze dus niet
 * "even mooier" aan: beiden keuren de pagina goed voor livegang.
 *
 * Tekst tussen [vierkante haken] is een plaatshouder voor een feit dat nog
 * openstaat. Die horen er voor livegang allemaal uit.
 */

type Persoon = "jochem" | "heidi";
type Kleur = "wit" | "beige";

const PORTRET: Record<Persoon, string> = {
  jochem: THEYDO_CASE_JOCHEM,
  heidi: THEYDO_CASE_HEIDI,
};

const ORANJE = [<span className="text-brand-orange" />];

/** Sectiekop met het oranje accent uit de JSON. Een maat kleiner dan de
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
const Sectie = ({ kleur, children }: { kleur: Kleur; children: ReactNode }) => (
  <section className={`${kleur === "wit" ? "bg-white" : "bg-brand-off-white"} py-14 md:py-20 lg:py-24`}>
    <div className="container-custom">{children}</div>
  </section>
);

/**
 * Een quote met naam en functie. Bewust niet vet: de quote is het antwoord in
 * het interview, het feit ernaast is wat in het oog moet springen. Het portret
 * heeft een lege alt, want de naam staat er direct naast.
 */
const Citaat = ({ tekst, persoon, op }: { tekst: string; persoon: Persoon; op: Kleur }) => {
  const { t } = useTranslation("caseTheydo");
  return (
    <figure className={`${op === "wit" ? "bg-brand-off-white" : "bg-white shadow-sm"} rounded-xl p-6 md:p-8`}>
      <blockquote className="text-xl md:text-2xl leading-relaxed text-brand-purple">&ldquo;{tekst}&rdquo;</blockquote>
      <figcaption className="mt-6 flex items-center gap-4">
        <img
          src={PORTRET[persoon]}
          alt=""
          width={700}
          height={770}
          loading="lazy"
          decoding="async"
          className="h-16 w-16 flex-shrink-0 rounded-full object-cover object-top"
        />
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

/** Klein oranje kopje in hoofdletters, zoals boven elke vraag. */
const Label = ({ children }: { children: ReactNode }) => (
  <p className="text-lg font-semibold uppercase tracking-wide text-brand-orange">{children}</p>
);

/** Een groot, vet feit. De tegenhanger van de quote. */
const Feit = ({ children }: { children: ReactNode }) => (
  <p className="text-3xl md:text-4xl font-bold leading-tight text-brand-purple">{children}</p>
);

/**
 * Eén interviewvraag: wie de vraag kreeg, de vraag als kop, en daaronder de
 * quote en het feit naast elkaar. Met `omgekeerd` staat het feit links. Op
 * mobiel staat de quote altijd eerst, zodat het antwoord direct onder de vraag
 * komt.
 */
const Vraag = ({
  persoon,
  kop,
  citaat,
  kleur,
  omgekeerd = false,
  boven = false,
  onder,
  children,
}: {
  persoon: Persoon;
  kop: string;
  citaat: string;
  kleur: Kleur;
  omgekeerd?: boolean;
  /** Bovenaan uitlijnen in plaats van gecentreerd: voor een hoog feit, zodat de
   *  quote er niet halverwege naast zweeft. */
  boven?: boolean;
  /** Iets over de volle breedte onder de quote en het feit. */
  onder?: ReactNode;
  children: ReactNode;
}) => {
  const { t } = useTranslation("caseTheydo");
  return (
    <Sectie kleur={kleur}>
      <Label>{t(`ask.${persoon}`)}</Label>
      <div className="mt-3">
        <Kop i18nKey={kop} />
      </div>
      <div className={`mt-10 grid gap-8 lg:grid-cols-2 lg:gap-14 ${boven ? "lg:items-start" : "lg:items-center"}`}>
        <div className={omgekeerd ? "lg:order-2" : ""}>
          <Citaat tekst={citaat} persoon={persoon} op={kleur} />
        </div>
        <div className={omgekeerd ? "lg:order-1" : ""}>{children}</div>
      </div>
      {onder}
    </Sectie>
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

  const stats = t("stats", { returnObjects: true }) as Array<{
    value: string;
    label: string;
    suffix?: string;
    note?: string;
  }>;
  const stemmen = t("colleagues.voices.items", { returnObjects: true }) as string[];
  const feiten = t("glance.items", { returnObjects: true }) as Array<{ label: string; value: string }>;
  const effecten = t("colleagues.items", { returnObjects: true }) as Array<{ value: number; label: string }>;
  const aanpassingen = t("better.items", { returnObjects: true }) as string[];
  const meting = t("know.items", { returnObjects: true }) as string[];

  const rekenknop = (
    <button
      type="button"
      onClick={() => setIsCalculatorOpen(true)}
      className="font-semibold text-brand-purple underline decoration-brand-orange decoration-2 underline-offset-4 hover:decoration-brand-purple"
    />
  );

  /** Het deelvoorbeeld voor LinkedIn en WhatsApp, per taal. Bewust PNG en geen
   *  WebP: niet elke app toont WebP in een voorbeeld. Zie CLAUDE.md. */
  const deelbeeld = `/social/klantcase-theydo-${lang}.png`;

  /**
   * Article en geen Review: een recensie die je over jezelf publiceert telt
   * Google niet mee, en dat oogt als trucje. Wat dit wel zegt: dit is een
   * verhaal van Innerleaps, over TheyDo.
   */
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
              <p className="flex flex-wrap items-center gap-4 text-xl font-semibold text-brand-gray-dark">
                <span>{t("eyebrow")}</span>
                <img src={THEYDO_LOGO} alt="" className="h-10 w-auto md:h-12" />
              </p>
              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight">
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

        {/* De drie cijfers. Donkerpaars met oranje, zodat de resultaten direct
            onder de hero in het oog springen. Naar een voorbeeld van Bas. */}
        <section className="bg-brand-purple py-12 md:py-16">
          <div className="container-custom">
            <Label>{t("statsLabel")}</Label>
            <div className="mt-6 grid gap-8 md:grid-cols-3">
              {stats.map((stat, i) => (
                <div key={stat.value} className="border-t-2 border-brand-orange pt-5">
                  <p className={`text-6xl md:text-7xl font-bold ${i === 0 ? "text-brand-orange" : "text-white"}`}>
                    {stat.value}
                    {stat.suffix && <span className="text-white/50">{stat.suffix}</span>}
                  </p>
                  <p className="mt-3 text-xl leading-snug text-white/80">{stat.label}</p>
                  {/* Bij de 8,6%: gerandomiseerd onderzoek wijst dezelfde kant op.
                      Bewust zonder effectgrootte, die is niet te vergelijken. */}
                  {stat.note && <p className="mt-2 text-base leading-snug text-white/60">{stat.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 1. De aanleiding, met de feiten ernaast */}
        <Vraag persoon="jochem" kop="context.title" citaat={t("context.quote")} kleur="beige" boven>
          <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
            <h3 className="text-2xl font-bold text-brand-purple">{t("glance.title")}</h3>
            <dl className="mt-5 space-y-4">
              {feiten.map((feit) => (
                <div key={feit.label}>
                  <dt className="text-lg font-semibold text-brand-purple">{feit.label}</dt>
                  <dd className="text-xl leading-relaxed text-brand-gray-medium">{feit.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Vraag>

        {/* 2. De twijfels */}
        <Vraag persoon="jochem" kop="doubts.title" citaat={t("doubts.quote")} kleur="wit" omgekeerd>
          <Feit>{t("doubts.fact")}</Feit>
          <p className="mt-5 text-xl md:text-2xl leading-relaxed text-brand-gray-medium">{t("doubts.bridge")}</p>
        </Vraag>

        {/* 3. Wat collega's merkten */}
        <Vraag
          persoon="jochem"
          kop="colleagues.title"
          citaat={t("colleagues.quote")}
          kleur="beige"
          onder={
            <div className="mt-12">
              <Label>{t("colleagues.voices.label")}</Label>
              <div className="mt-5 grid gap-6 md:grid-cols-3">
                {stemmen.map((stem) => (
                  <figure key={stem} className="rounded-xl bg-white p-6 shadow-sm">
                    <blockquote className="text-xl leading-relaxed text-brand-purple">&ldquo;{stem}&rdquo;</blockquote>
                    <figcaption className="mt-4 text-base text-brand-gray-medium">{t("colleagues.voices.author")}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          }
        >
          <p className="text-xl leading-relaxed text-brand-gray-medium">{t("colleagues.intro")}</p>
          <ul className="mt-6 space-y-5">
            {effecten.map((effect) => (
              <li key={effect.label}>
                <div className="flex items-baseline justify-between gap-4 text-xl">
                  <span className="font-semibold text-brand-purple">{effect.label}</span>
                  <span className="text-2xl font-bold text-brand-orange">{effect.value}%</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-white" aria-hidden="true">
                  <div className="h-full rounded-full bg-brand-orange" style={{ width: `${effect.value}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Vraag>

        {/* 4. Was het de investering waard? */}
        <Vraag persoon="jochem" kop="investment.title" citaat={t("investment.quote")} kleur="wit" omgekeerd>
          <p className="text-6xl md:text-7xl font-bold text-brand-orange">{t("investment.number")}</p>
          <p className="mt-4 text-xl md:text-2xl leading-relaxed text-brand-gray-medium">
            <Trans i18nKey="investment.fact" t={t} components={[rekenknop]} />
          </p>
        </Vraag>

        {/* 5. Hoeveel werk was het voor HR? */}
        <Vraag persoon="heidi" kop="hr.title" citaat={t("hr.quote")} kleur="beige">
          <Label>{t("hr.factLabel")}</Label>
          <div className="mt-3">
            <Feit>{t("hr.fact")}</Feit>
          </div>
        </Vraag>

        {/* 6. Wat kon er beter? */}
        <Vraag persoon="heidi" kop="better.title" citaat={t("better.quote")} kleur="wit" omgekeerd>
          <h3 className="text-2xl font-bold text-brand-purple">{t("better.factTitle")}</h3>
          <ul className="mt-5 space-y-4">
            {aanpassingen.map((punt) => (
              <li key={punt} className="flex gap-4">
                <Check className="mt-1 h-6 w-6 flex-shrink-0 stroke-[3] text-brand-orange" aria-hidden="true" />
                <span className="text-xl leading-relaxed text-brand-gray-dark">{punt}</span>
              </li>
            ))}
          </ul>
        </Vraag>

        {/* 7. Zou je het opnieuw doen? */}
        <Vraag persoon="jochem" kop="again.title" citaat={t("again.quote")} kleur="beige">
          <h3 className="text-2xl font-bold text-brand-purple">{t("again.factTitle")}</h3>
          <p className="mt-4 text-xl md:text-2xl leading-relaxed text-brand-gray-medium">{t("again.fact")}</p>
        </Vraag>

        {/* Hoe weten we dit? Geen interviewvraag maar onze verantwoording. */}
        <Sectie kleur="wit">
          <Kop i18nKey="know.title" />
          <ul className="mt-10 max-w-4xl space-y-5">
            {meting.map((punt) => (
              <li key={punt} className="flex gap-4">
                <Check className="mt-1 h-6 w-6 flex-shrink-0 stroke-[3] text-brand-orange" aria-hidden="true" />
                <span className="text-xl leading-relaxed text-brand-gray-dark">{punt}</span>
              </li>
            ))}
          </ul>
          {/* Een echt rapport overtuigt meer dan een nagemaakt. Over de volle
              breedte, anders is de tekst erop niet te lezen; aanklikken opent
              hem groot. */}
          <figure className="mt-12">
            <a href={IMPACTRAPPORT_VOORBEELD} target="_blank" rel="noopener noreferrer" className="block">
              <img
                src={IMPACTRAPPORT_VOORBEELD}
                alt={t("know.report.alt")}
                width={2000}
                height={1125}
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl shadow-xl"
              />
            </a>
            <figcaption className="mt-4 text-base text-brand-gray-medium">{t("know.report.caption")}</figcaption>
          </figure>
        </Sectie>

        {/* Oproep tot actie. Een wit kader op een lichte achtergrond: blauw viel
            weg tegen de paarse footer eronder. Heidi's advies aan andere
            HR-adviseurs staat erboven, als laatste duwtje. */}
        <section className="bg-brand-off-white py-14 md:py-20 lg:py-24">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white px-6 py-10 text-center shadow-xl md:px-12 md:py-14">
              <figure>
                <Label>{t("cta.quoteLabel")}</Label>
                <blockquote className="mt-4 text-2xl md:text-3xl leading-snug text-brand-purple">
                  &ldquo;{t("cta.quote")}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-center gap-3">
                  <img
                    src={THEYDO_CASE_HEIDI}
                    alt=""
                    width={820}
                    height={875}
                    loading="lazy"
                    decoding="async"
                    className="h-12 w-12 rounded-full object-cover object-top"
                  />
                  <span className="text-left leading-tight">
                    <cite className="not-italic block text-base font-bold text-brand-gray-dark">
                      {t("people.heidi.name")}
                    </cite>
                    <span className="block text-base text-brand-gray-medium">{t("people.heidi.role")}</span>
                  </span>
                </figcaption>
              </figure>

              <div className="mx-auto my-10 h-0.5 w-16 bg-brand-orange" aria-hidden="true" />

              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-brand-purple">
                <Trans i18nKey="cta.title" t={t} components={ORANJE} />
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-xl md:text-2xl leading-relaxed text-brand-gray-medium">
                {t("cta.body")}
              </p>
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
                  className="border-b-2 border-brand-orange/50 pb-0.5 text-lg font-semibold text-brand-purple transition-colors hover:border-brand-orange"
                >
                  {t("cta.calculatorLink")} <span aria-hidden="true">→</span>
                </button>
              </div>
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
