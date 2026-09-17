import { memo } from "react";
import { Trans, useTranslation } from "react-i18next";

const CARD_KEYS = ["mindfulness", "stress", "app"] as const;

const ProblemSection = memo(() => {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-brand-off-white">
      <div className="container-custom">
        <div className="space-y-12">
          <p className="font-subtitle uppercase tracking-widest text-base text-brand-gray-medium text-center">
            {t("problem.eyebrow")}
          </p>

          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight">
                {t("problem.title")}
              </h2>

              <figure className="border-l-4 border-brand-blue pl-6">
                <blockquote className="font-body italic text-xl md:text-2xl text-brand-gray-dark leading-relaxed">
                  &ldquo;{t("problem.quote")}&rdquo;
                </blockquote>
                <figcaption className="mt-4 font-subtitle uppercase tracking-wide text-base text-brand-gray-medium">
                  {t("problem.quoteAttribution")}
                </figcaption>
              </figure>
            </div>

            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              {t("problem.triedThreeThings")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-gray-200 border-t border-b border-gray-200 py-10">
              {CARD_KEYS.map((key) => (
                <div key={key} className="sm:px-8 first:sm:pl-0 last:sm:pr-0">
                  <h3 className="text-xl md:text-2xl font-bold text-brand-purple mb-2">
                    {t(`problem.cards.${key}.title`)}
                  </h3>
                  <p className="text-xl leading-relaxed">
                    <span className="text-brand-gray-dark">{t(`problem.cards.${key}.lead`)}</span>{" "}
                    <span className="text-brand-gray-medium">{t(`problem.cards.${key}.fade`)}</span>
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              <Trans i18nKey="problem.paragraph1" t={t} components={[<strong className="font-bold text-brand-gray-dark" />]} />
            </p>

            <hr className="border-gray-200" />

            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              <Trans i18nKey="problem.paragraph2" t={t} components={[<strong className="font-bold text-brand-gray-dark" />]} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

ProblemSection.displayName = "ProblemSection";

export default ProblemSection;
