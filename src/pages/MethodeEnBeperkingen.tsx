import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import PageSeo from "@/components/PageSeo";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import Footer from "@/components/Footer";
import { detectLanguageFromPath } from "@/i18n/config";
import { eigenMetingen, studies } from "@/lib/claims";

/**
 * /methode en /en/methodology: waar de cijfers op de
 * site vandaan komen. Het bronnenblok onderaan elke pagina linkt hierheen.
 *
 * De lijsten met metingen en studies komen rechtstreeks uit het claimregister
 * (src/content/claims.json). Komt er een bron bij, dan staat hij hier vanzelf.
 * Zie CLAIMS.md.
 */
const ORANJE = [<span className="text-brand-orange" />];

const Kop = ({ children }: { children: string }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">{children}</h2>
);

const MethodeEnBeperkingen = () => {
  const { t } = useTranslation("meten");
  const { pathname } = useLocation();
  const taal = detectLanguageFromPath(pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const watItems = t("wat.items", { returnObjects: true }) as string[];
  const beperkingen = t("beperkingen.items", { returnObjects: true }) as string[];

  return (
    <>
      <PageSeo title={t("meta.title")} description={t("meta.description")} />
      <SimplifiedNavigation />
      <main className="section-padding bg-white">
        <div className="container-custom max-w-3xl space-y-12 text-xl leading-relaxed text-brand-gray-dark">
          <header className="space-y-5">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-purple leading-tight">
              <Trans i18nKey="title" t={t} components={ORANJE} />
            </h1>
            <p className="text-brand-gray-medium">{t("intro")}</p>
          </header>

          <section>
            <Kop>{t("wat.title")}</Kop>
            <p>{t("wat.intro")}</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              {watItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <Kop>{t("hoe.title")}</Kop>
            <p>{t("hoe.text")}</p>
          </section>

          <section>
            <Kop>{t("aantallen.title")}</Kop>
            <p>{t("aantallen.intro")}</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              {eigenMetingen(taal).map((meting) => (
                <li key={meting.id}>
                  {t("aantallen.regel", { ...meting, interpolation: { escapeValue: false } })}
                </li>
              ))}
            </ul>
          </section>


          <section>
            <Kop>{t("beperkingen.title")}</Kop>
            <ul className="list-disc space-y-3 pl-6">
              {beperkingen.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <Kop>{t("studies.title")}</Kop>
            <p>{t("studies.intro")}</p>
            <ul className="mt-4 space-y-5">
              {studies(taal).map((studie) => (
                <li key={studie.id} className="border-l-4 border-brand-orange/40 pl-4">
                  <p className="font-semibold text-brand-purple">{studie.auteurJaar}</p>
                  <p>{studie.studie}</p>
                  <p className="text-lg text-brand-gray-medium">
                    {studie.titel ?? t("studies.geenTitel")}{" "}
                    {studie.sourceUrl ? (
                      <a
                        href={studie.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-brand-blue underline underline-offset-2 hover:text-brand-orange"
                      >
                        {studie.sourceUrl.replace(/^https:\/\//, "")}
                      </a>
                    ) : (
                      t("studies.geenLink")
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MethodeEnBeperkingen;
