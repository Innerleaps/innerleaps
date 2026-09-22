import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Quote } from "lucide-react";

const THEYDO_LOGO = "/klantervaringen/theydo-logo.webp";
const THEYDO_PORTRET = "/klantervaringen/theydo-directeur.webp";

const TestimonialSection = memo(() => {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-white">
      <div className="container-custom max-w-4xl">
        <figure>
          {/* Hetzelfde icoontegeltje als op de stapkaarten elders op de site. */}
          <div
            className="w-14 h-14 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-5"
            aria-hidden="true"
          >
            <Quote className="w-7 h-7 text-brand-orange" />
          </div>

          <blockquote className="text-3xl md:text-4xl font-semibold text-brand-purple leading-snug text-balance">
            &ldquo;{t("testimonial.quote")}&rdquo;
          </blockquote>

          <figcaption className="mt-7 pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex items-center gap-4">
              <img
                src={THEYDO_PORTRET}
                alt="Jochem van der Veen"
                className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
                width={160}
                height={160}
                loading="lazy"
              />
              <div>
                <cite className="not-italic block text-xl font-bold text-brand-gray-dark">
                  {t("bookingTrust.author")}
                </cite>
                <span className="block text-xl text-brand-gray-medium">
                  {t("bookingTrust.role")}
                </span>
              </div>
            </div>

            <img
              src={THEYDO_LOGO}
              alt="TheyDo"
              className="h-10 w-auto self-start sm:self-auto"
              width={200}
              height={111}
              loading="lazy"
            />
          </figcaption>
        </figure>
      </div>
    </section>
  );
});

TestimonialSection.displayName = "TestimonialSection";

export default TestimonialSection;
