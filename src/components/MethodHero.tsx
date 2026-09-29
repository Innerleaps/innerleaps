import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { Award, Star } from "lucide-react";
import { bookingPath } from "@/lib/booking";
import { meldMasterclassKlik } from "@/lib/conversies";
import { detectLanguageFromPath } from "@/i18n/config";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Innerleaps/@52.1909763,5.2795551,7z/data=!4m8!3m7!1s0x41d7861255c94705:0x571bbf751b212eea!8m2!3d52.1909763!4d5.2795551!9m1!1b1!16s%2Fg%2F11y10xf1qm?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D";

/** De vier regels van het "wat het kost"-kaartje, in deze volgorde. */
const SPEC_ROWS = ["weeks", "live", "daily", "group"] as const;

/**
 * De hero van /breintraining-methode en /en/method.
 *
 * Lichter dan de hero van home: geen foto, en de knop is hier een tekstlink.
 * Dit is een subpagina, dus het zwaartepunt hoort bij de kop en het kaartje,
 * niet bij een tweede oranje blok. Eén primaire actie op de pagina, en dat is
 * dezelfde als overal: een gratis masterclass aanvragen.
 */
const MethodHero = memo(() => {
  const { t } = useTranslation("methode");
  const { pathname } = useLocation();
  const lang = detectLanguageFromPath(pathname);

  return (
    <section className="bg-brand-off-white">
      <div className="container-custom py-12 lg:py-20">
        <div className="grid lg:grid-cols-[62fr_38fr] gap-10 lg:gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-base font-semibold text-brand-purple shadow-lg">
              <Award className="h-4 w-4 text-brand-orange" aria-hidden="true" />
              {t("methodHero.eyebrow")}
            </div>

            {/* Een slag kleiner dan de h1 van home: dit is een subpagina. */}
            <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple leading-tight text-balance">
              <Trans
                i18nKey="methodHero.title"
                t={t}
                components={[<span className="text-brand-orange" />]}
              />
            </h1>

            <p className="mt-6 text-xl md:text-2xl text-brand-gray-medium leading-relaxed max-w-2xl">
              {t("methodHero.subtitle")}
            </p>

            {/* Geen knop maar een tekstlink, zodat de masterclassknop verderop
                op de pagina de enige primaire actie blijft. */}
            <p className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <Link
                to={bookingPath(lang)}
                onClick={() => meldMasterclassKlik("hero")}
                className="text-lg font-bold text-brand-purple border-b-2 border-brand-orange/40 pb-0.5 hover:border-brand-orange transition-colors"
              >
                {t("methodHero.cta")} <span aria-hidden="true">&rarr;</span>
              </Link>
              <span className="text-base text-brand-gray-medium">
                {t("methodHero.ctaNote")}
              </span>
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-base text-brand-gray-medium">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-brand-purple transition-colors"
              >
                <span className="flex" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-brand-orange fill-brand-orange" />
                  ))}
                </span>
                <span>
                  <b className="font-semibold text-brand-purple">
                    {t("methodHero.proof.rating")}
                  </b>{" "}
                  {t("methodHero.proof.ratingSuffix")}
                </span>
              </a>
              <span>
                <Trans
                  i18nKey="methodHero.proof.vmbn"
                  t={t}
                  components={[<b className="font-semibold text-brand-purple" />]}
                />
              </span>
              <span>
                <Trans
                  i18nKey="methodHero.proof.mbsr"
                  t={t}
                  components={[<b className="font-semibold text-brand-purple" />]}
                />
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-base font-bold text-brand-gray-medium">
              {t("methodHero.spec.title")}
            </h2>
            <dl className="mt-4">
              {SPEC_ROWS.map((row, index) => (
                <div
                  key={row}
                  className={`flex items-baseline gap-4 py-3 ${
                    index !== 0 ? "border-t border-gray-200" : ""
                  }`}
                >
                  <dt className="text-xl font-bold text-brand-orange whitespace-nowrap">
                    {t(`methodHero.spec.rows.${row}.value`)}
                  </dt>
                  <dd className="min-w-0 text-base text-brand-gray-medium leading-snug">
                    {t(`methodHero.spec.rows.${row}.label`)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
});

MethodHero.displayName = "MethodHero";

export default MethodHero;
