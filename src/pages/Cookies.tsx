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
          content="Cookie policy of Innerleaps. Which cookies we use, what they are for, and how to change your choice."
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
            <strong>Innerleaps</strong>, Last updated: September 2026
          </p>

          <div className="prose max-w-none space-y-8 text-brand-gray-dark leading-relaxed">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">
                What are cookies?
              </h2>
              <p className="text-xl">
                Cookies are small files a website leaves on your device. Some are needed to make
                the site work. Others are there to measure how the site is used. This page also
                covers the other ways a site can store something on your device, such as local
                storage, because the rules are the same.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">
                You choose first
              </h2>
              <p className="text-xl">
                Nothing is measured until you say so. On your first visit a bar appears at the
                bottom of the screen with two buttons: accept everything, or open the settings and
                decide per category. Until you choose, the measurement tools are switched off.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">
                Which cookies do we use?
              </h2>
              <ul className="text-xl list-disc pl-6 space-y-3">
                <li>
                  <strong>Necessary.</strong> Always on, and you cannot switch them off, because
                  the site would stop working. This is your language choice and your cookie choice
                  itself. They stay in your own browser and we never see them.
                </li>
                <li>
                  <strong>Analytics.</strong> Google Analytics 4. Shows us which pages get
                  visited and where people drop off, so we can improve the site.
                </li>
                <li>
                  <strong>Advertising.</strong> Google Ads, to see which advert brought someone
                  here and what they did next, and Apollo, which recognises the organisation a
                  visit is likely to come from. Without this we would keep paying for adverts
                  that lead nowhere.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">
                Changing your mind
              </h2>
              <p className="text-xl">
                At the bottom of every page there is a link called <strong>Cookie
                preferences</strong>. It reopens the same panel with the switches. Turn something
                off and it stops straight away. You can also clear cookies through your browser
                settings, although that will also remove your language choice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-4">
                More information
              </h2>
              <p className="text-xl">
                Our{" "}
                <Link to="/privacy" className="text-brand-orange hover:underline">
                  privacy notice
                </Link>{" "}
                explains in more detail what we measure, who processes it and how long we keep
                it. Questions? Email{" "}
                <a href="mailto:privacy@innerleaps.nl" className="text-brand-orange hover:underline">
                  privacy@innerleaps.nl
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
