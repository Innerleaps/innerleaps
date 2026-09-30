import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookingPath } from "@/lib/booking";
import { meldMasterclassKlik } from "@/lib/conversies";
import { detectLanguageFromPath } from "@/i18n/config";
import cohortPhoto from "@/assets/innerleaps-cohort-room.jpg";

/**
 * De hero van /breintraining-methode en /en/method.
 *
 * Eén gecentreerde kolom met daaronder een brede foto. Geen cijferkaartje en
 * geen logobalk: de formatfeiten (zes weken, een uur per week, max vijftien)
 * staan verderop in het masterclassblok en horen hier niet nog een keer.
 */
const MethodHero = memo(() => {
  const { t } = useTranslation("methode");
  const { pathname } = useLocation();
  const lang = detectLanguageFromPath(pathname);

  return (
    <section className="bg-brand-off-white">
      <div className="container-custom py-12 lg:py-20">
        <div className="text-center">
          {/* Een span, geen kop: er hoort maar één h1 op de pagina. */}
          <span className="inline-block bg-white rounded-full px-4 py-2 text-base font-semibold text-brand-purple shadow-lg">
            {t("methodHero.eyebrow")}
          </span>

          {/* 17ch laat de Engelse kop op drie regels vallen. Onder md gaat die
              grens eraf, anders wordt het op een telefoon een kolom van drie
              woorden breed. */}
          <h1 className="mt-6 md:max-w-[17ch] mx-auto text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple leading-tight text-balance">
            <Trans
              i18nKey="methodHero.title"
              t={t}
              components={[<span className="text-brand-orange" />]}
            />
          </h1>

          <p className="mt-5 md:max-w-[54ch] mx-auto text-xl md:text-2xl text-brand-gray-medium leading-relaxed [text-wrap:pretty]">
            <Trans
              i18nKey="methodHero.subtitle"
              t={t}
              components={[<strong className="font-semibold text-brand-purple" />]}
            />
          </p>

          <div className="mt-8">
            <Link
              to={bookingPath(lang)}
              onClick={() => meldMasterclassKlik("hero")}
              className="block lg:inline-block group"
            >
              {/* De bestaande primaire knop, alleen rond in plaats van
                  afgerond. Het optillen zit al in de variant; het pijltje
                  schuift mee. Allebei uit bij prefers-reduced-motion. */}
              <Button
                size="lg"
                className="w-full lg:w-auto min-h-[44px] font-semibold py-4 px-8 rounded-lg text-base lg:text-lg shadow-xl motion-reduce:transform-none motion-reduce:transition-none"
              >
                {t("methodHero.cta")}
                <ArrowRight
                  className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  aria-hidden="true"
                />
              </Button>
            </Link>
          </div>

          {/* brand-gray-dark en niet -medium: die haalt op cream 4,33 en blijft
              daarmee onder AA. Deze haalt 9,37. */}
          <p className="mt-4 md:max-w-[54ch] mx-auto text-base text-brand-gray-dark leading-relaxed">
            {t("methodHero.ctaNote")}
          </p>
        </div>

        {/* Versiering, geen informatie: de foto krijgt een lege alt. Op smalle
            schermen 16:9, want 21:8 wordt daar een streep. */}
        <img
          src={cohortPhoto}
          alt=""
          width={2000}
          height={799}
          loading="eager"
          {...{ fetchpriority: "high" }}
          decoding="async"
          className="mt-14 w-full aspect-[16/9] md:aspect-[21/8] object-cover object-[center_40%] rounded-2xl shadow-xl"
        />
      </div>
    </section>
  );
});

MethodHero.displayName = "MethodHero";

export default MethodHero;
