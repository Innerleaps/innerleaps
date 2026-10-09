import { memo } from "react";
import { Trans, useTranslation } from "react-i18next";

import ccPhoto1400 from "@/assets/systems-control-centre-1400w.webp";
import ccPhoto800 from "@/assets/systems-control-centre-800w.webp";
import ccPhotoFallback from "@/assets/systems-control-centre-800w.jpg";
import wsPhoto1200 from "@/assets/systems-warning-system-1200w.webp";
import wsPhoto800 from "@/assets/systems-warning-system-800w.webp";
import wsPhotoFallback from "@/assets/systems-warning-system-800w.jpg";

/**
 * De twee systemen die de training sterker maakt, elk in een eigen rij.
 *
 * Geen sectiekop en geen intro: de twee rijen zijn de sectie. Wit, zodat hij
 * afwisselt met "Push-ups voor je brein" erboven, zoals elke sectie op de site
 * een andere achtergrond heeft dan de vorige.
 */
const ROWS = [
  {
    key: "control",
    srcSet: `${ccPhoto800} 800w, ${ccPhoto1400} 1400w`,
    fallback: ccPhotoFallback,
    width: 1400,
    height: 1050,
  },
  {
    key: "warning",
    srcSet: `${wsPhoto800} 800w, ${wsPhoto1200} 1200w`,
    fallback: wsPhotoFallback,
    width: 1200,
    height: 900,
  },
] as const;

const ITEMS = {
  control: ["room", "attention", "noise"],
  warning: ["sooner", "meaning", "watch"],
} as const;

const TwoSystemsSection = memo(() => {
  const { t } = useTranslation("methode");

  return (
    <section className="section-padding bg-white">
      <div className="container-custom max-w-6xl">
        {ROWS.map((row, index) => (
          /* Elke rij is een eigen regio met een eigen naam, zodat een
             schermlezer twee benoemde blokken hoort in plaats van één. */
          <section
            key={row.key}
            aria-labelledby={`${row.key}-heading`}
            className={`grid lg:grid-cols-2 gap-8 lg:gap-[70px] items-center py-10 lg:py-14 ${
              index !== 0 ? "border-t border-gray-200" : ""
            }`}
          >
            <div className="min-w-0">
              <h2
                id={`${row.key}-heading`}
                className="text-3xl md:text-4xl font-bold text-brand-purple leading-tight text-balance"
              >
                <Trans
                  i18nKey={`systems.${row.key}.title`}
                  t={t}
                  components={[<span className="text-brand-orange" />]}
                />
              </h2>

              <p className="mt-4 lg:max-w-[46ch] text-xl text-brand-gray-medium leading-relaxed">
                {t(`systems.${row.key}.lead`)}
              </p>

              <ul className="mt-6 space-y-4">
                {ITEMS[row.key].map((item) => (
                  <li key={item} className="relative pl-6">
                    {/* Bolletje midden op de eerste regel van het label
                        (text-xl, regelhoogte 28px). Allebei de rijen oranje:
                        de twee begrippen in de sectie erboven hebben geen
                        eigen kleur meer, dus twee kleuren hier zouden nergens
                        meer naar verwijzen. */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-2.5 h-2 w-2 rounded-full bg-brand-orange"
                    />
                    <b className="block text-xl font-bold text-brand-purple">
                      {t(`systems.${row.key}.items.${item}.label`)}
                    </b>
                    <span className="block text-xl text-brand-gray-medium leading-relaxed">
                      {t(`systems.${row.key}.items.${item}.body`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* order staat op de foto, niet op de tekst: de tekst staat al
                eerst in de broncode. Allebei de rijen krijgen een expliciete
                waarde op lg. Met "lg:order-none" op de ene en "lg:order-first"
                op de andere won de verkeerde, en stonden beide foto's rechts.
                Gestapeld gaat de foto in beide rijen voorop. */}
            <picture
              className={`block order-first ${
                index === 1 ? "lg:order-first" : "lg:order-last"
              }`}
            >
              <source
                type="image/webp"
                srcSet={row.srcSet}
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
              <img
                src={row.fallback}
                alt=""
                width={row.width}
                height={row.height}
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/3] object-cover rounded-2xl shadow-xl"
              />
            </picture>
          </section>
        ))}
      </div>
    </section>
  );
});

TwoSystemsSection.displayName = "TwoSystemsSection";

export default TwoSystemsSection;
