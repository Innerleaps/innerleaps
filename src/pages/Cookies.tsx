import { memo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import Footer from "@/components/Footer";

const Cookies = memo(() => {
  return (
    <>
      <Helmet>
        <title>Cookiebeleid | InnerLeaps</title>
        <meta
          name="description"
          content="Cookiebeleid van InnerLeaps. Lees welke cookies wij gebruiken en waarvoor."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <SimplifiedNavigation />
      <main className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-purple mb-4 leading-tight">
            Cookiebeleid
          </h1>
          <p className="text-brand-gray-medium text-xl mb-12">
            <strong>InnerLeaps</strong> — Laatst bijgewerkt: april 2026
          </p>

          <div className="prose max-w-none space-y-8 text-brand-gray-dark leading-relaxed">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">
                Wat zijn cookies?
              </h2>
              <p className="text-xl">
                Cookies zijn kleine tekstbestanden die op je apparaat worden geplaatst wanneer je
                onze website bezoekt. Ze helpen ons de website goed te laten functioneren en het
                gebruik te analyseren.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">
                Welke cookies gebruiken wij?
              </h2>
              <ul className="text-xl list-disc pl-6 space-y-2">
                <li>
                  <strong>Functionele cookies</strong> — noodzakelijk voor het correct functioneren
                  van de website.
                </li>
                <li>
                  <strong>Analytische cookies</strong> — om geanonimiseerd inzicht te krijgen in het
                  gebruik van de website, zodat wij deze kunnen verbeteren.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">
                Cookies beheren
              </h2>
              <p className="text-xl">
                Je kunt cookies altijd weigeren of verwijderen via de instellingen van je browser.
                Houd er rekening mee dat sommige delen van de website dan mogelijk niet goed werken.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">
                Meer informatie
              </h2>
              <p className="text-xl">
                Lees ook ons{" "}
                <Link to="/privacy" className="text-brand-orange hover:underline">
                  privacybeleid
                </Link>{" "}
                voor meer informatie over hoe wij omgaan met persoonsgegevens. Vragen? Neem contact
                op via{" "}
                <a href="mailto:bas@innerleaps.nl" className="text-brand-orange hover:underline">
                  bas@innerleaps.nl
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
});

Cookies.displayName = "Cookies";

export default Cookies;
