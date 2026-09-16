import { memo } from "react";
import { Trans, useTranslation } from "react-i18next";

const CARD_KEYS = ["mindfulness", "stress", "app"] as const;

const ProblemSection = memo(() => {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-brand-off-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-16">
          <p className="font-mono uppercase tracking-widest text-base text-brand-gray-medium lg:col-span-1">
            {t("problem.eyebrow")}
          </p>

          <div className="lg:col-span-3 space-y-12">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple leading-tight">
                {t("problem.title")}
              </h2>

              <figure className="border-l-4 border-brand-blue pl-6">
                <blockquote className="font-serif italic text-xl md:text-2xl text-brand-gray-dark leading-relaxed">
                  &ldquo;{t("problem.quote")}&rdquo;
                </blockquote>
                <figcaption className="mt-4 font-mono uppercase tracking-wide text-base text-brand-gray-medium">
                  {t("problem.quoteAttribution")}
                </figcaption>
              </figure>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-b border-brand-gray-light py-10">
              {CARD_KEYS.map((key) => (
                <div key={key}>
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

            <hr className="border-brand-gray-light" />

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
