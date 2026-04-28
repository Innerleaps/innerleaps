import { memo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import Footer from "@/components/Footer";

const Cookies = memo(() => {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Cookie Policy | Innerleaps</title>
        <meta
          name="description"
          content="Cookie policy of Innerleaps. Learn which cookies we use and what they are for."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <SimplifiedNavigation />
      <main className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-purple mb-4 leading-tight">
            Cookie Policy
          </h1>
          <p className="text-brand-gray-medium text-xl mb-12">
            <strong>Innerleaps</strong>, Last updated: April 2026
          </p>

          <div className="prose max-w-none space-y-8 text-brand-gray-dark leading-relaxed">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">
                What are cookies?
              </h2>
              <p className="text-xl">
                Cookies are small text files placed on your device when you visit our website.
                They help the site function properly and allow us to analyze how it is used.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">
                Which cookies do we use?
              </h2>
              <ul className="text-xl list-disc pl-6 space-y-2">
                <li>
                  <strong>Functional cookies</strong>, necessary for the website to work
                  correctly.
                </li>
                <li>
                  <strong>Analytical cookies</strong>, to gain anonymized insight into how the
                  website is used so we can improve it.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">
                Managing cookies
              </h2>
              <p className="text-xl">
                You can refuse or delete cookies at any time through your browser settings. Note
                that some parts of the website may not work correctly if you do.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">
                More information
              </h2>
              <p className="text-xl">
                See also our{" "}
                <Link to="/privacy" className="text-brand-orange hover:underline">
                  privacy notice
                </Link>{" "}
                for more information on how we handle personal data. Questions? Contact us at{" "}
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
