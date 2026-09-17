import { memo } from "react";
import { useTranslation } from "react-i18next";

const THEYDO_LOGO = "/klantervaringen/theydo-logo.webp";
const THEYDO_PORTRET = "/klantervaringen/theydo-directeur.webp";

const TestimonialSection = memo(() => {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-white">
      <div className="container-custom max-w-4xl">
        <blockquote className="font-body italic text-3xl md:text-4xl lg:text-5xl text-brand-gray-dark leading-snug">
          &ldquo;{t("testimonial.quote")}&rdquo;
        </blockquote>

        <hr className="my-8 border-gray-200" />

        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={THEYDO_PORTRET}
              alt={t("bookingTrust.photoAlt")}
              className="h-16 w-16 flex-shrink-0 rounded-full object-cover"
              width={160}
              height={160}
              loading="lazy"
            />
            <div>
              <p className="text-xl font-bold text-brand-gray-dark">{t("bookingTrust.author")}</p>
              <p className="text-xl text-brand-gray-medium">{t("bookingTrust.role")}</p>
            </div>
          </div>

          <img
            src={THEYDO_LOGO}
            alt={t("bookingTrust.logoAlt")}
            className="h-10 w-auto"
            width={200}
            height={111}
            loading="lazy"
          />
        </div>

        <p className="mt-8 font-subtitle uppercase tracking-wide text-base text-brand-gray-medium">
          {t("testimonial.caption")}
        </p>
      </div>
    </section>
  );
});

TestimonialSection.displayName = "TestimonialSection";

export default TestimonialSection;
