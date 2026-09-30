import { memo } from "react";
import { Trans, useTranslation } from "react-i18next";

import photo1400 from "@/assets/method-mechanism-1400w.webp";
import photo1200 from "@/assets/method-mechanism-1200w.webp";
import photo800 from "@/assets/method-mechanism-800w.webp";
import photoFallback from "@/assets/method-mechanism-800w.jpg";
import basAvatar from "@/assets/bas-avatar-400w.webp";

/**
 * Wat de training met je brein doet: het controlecentrum en het
 * waarschuwingssysteem.
 *
 * De twee blokken onderaan hebben geen kader en geen vlak, alleen een streep
 * erboven met een gekleurd kopje. Oranje voor het controlecentrum, blauw voor
 * het waarschuwingssysteem, dezelfde kleuren als de twee begrippen in de
 * tweede alinea. Zo hoort de lezer ze bij elkaar zonder dat het uitgelegd
 * hoeft te worden.
 */
const MechanismSection = memo(() => {
  const { t } = useTranslation("methode");

  /* Alleen vetgedrukt, zonder eigen kleur: de twee begrippen houden de
     kleur van de alinea eromheen. */
  const vet = <span className="font-semibold" />;

  return (
    <section className="bg-brand-off-white pt-16 md:pt-20 lg:pt-28">
      <div className="container-custom max-w-6xl">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-16 items-center">
          {/* Sfeer, geen informatie: de tekst ernaast zegt alles al. */}
          <picture>
            <source
              type="image/webp"
              srcSet={`${photo800} 800w, ${photo1200} 1200w, ${photo1400} 1400w`}
              sizes="(min-width: 1024px) 34vw, 100vw"
            />
            <img
              src={photoFallback}
              alt=""
              width={1400}
              height={1400}
              loading="lazy"
              decoding="async"
              className="w-full aspect-square object-cover rounded-2xl shadow-xl"
            />
          </picture>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-purple leading-tight text-balance">
              <Trans i18nKey="mechanism.title" t={t} components={[<span className="text-brand-orange" />]} />
            </h2>

            {/* Met de hand getrokken streep onder de kop. */}
            <svg
              width="188"
              height="12"
              viewBox="0 0 188 12"
              aria-hidden="true"
              focusable="false"
              className="mt-1 mb-5 block"
            >
              <path
                d="M3 8.2c28-4.6 58-6 88-5.1 30 .9 58 3.6 94 5.4"
                className="stroke-brand-orange"
                strokeWidth="3.4"
                fill="none"
                strokeLinecap="round"
                opacity="0.85"
              />
            </svg>

            <p className="text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              {t("mechanism.body1")}
            </p>
            <p className="mt-4 text-xl md:text-2xl text-brand-gray-medium leading-relaxed">
              <Trans i18nKey="mechanism.body2" t={t} components={[vet, vet]} />
            </p>
          </div>
        </div>

        {/* figure + figcaption, zodat de naam programmatisch aan het citaat vastzit. */}
        <figure className="mt-16 lg:mt-20 max-w-[72ch]">
          <span aria-hidden="true" className="block text-6xl leading-[0.6] text-brand-orange/30">
            &ldquo;
          </span>
          <blockquote className="mt-4 text-2xl md:text-3xl font-medium text-brand-purple leading-snug">
            <Trans
              i18nKey="mechanism.quote"
              t={t}
              components={[<span className="text-brand-orange" />]}
            />
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <img
              src={basAvatar}
              alt=""
              width={400}
              height={400}
              loading="lazy"
              decoding="async"
              className="h-11 w-11 flex-shrink-0 rounded-full object-cover"
            />
            <span>
              <span className="italic font-medium text-brand-purple">
                {t("mechanism.quoteAuthor")}
              </span>{" "}
              <span className="ml-1 text-base text-brand-gray-medium">
                {t("mechanism.quoteRole")}
              </span>
            </span>
          </figcaption>
        </figure>

      </div>
    </section>
  );
});

MechanismSection.displayName = "MechanismSection";

export default MechanismSection;
