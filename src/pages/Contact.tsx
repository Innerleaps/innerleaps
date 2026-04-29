import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import StickyCtaButtons from "@/components/StickyCtaButtons";
import ROICalculator from "@/components/ROICalculator";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation("contact");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-gray-light">
      <Helmet>
        <meta name="description" content={t("meta.description")} />
      </Helmet>
      <SimplifiedNavigation />
      <StickyCtaButtons />

      <main className="pt-8">
        <section className="bg-brand-off-white section-padding">
          <div className="container-custom">
            <div className="text-center space-y-6 mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-dark">
                {t("hero.titlePrefix")} <span className="text-brand-orange">{t("hero.titleAccent")}</span>{t("hero.titleSuffix") ? ` ${t("hero.titleSuffix")}` : ""}
              </h1>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quote section */}
                <div className="bg-white p-8 rounded-xl">
                  <div className="flex flex-col items-center space-y-6 mb-8">
                    <img
                      src="/lovable-uploads/eaa7a159-2f85-4fa3-b487-4855426f2c14.png"
                      alt={t("quote.photoAlt")}
                      className="w-36 h-36 rounded-full object-cover"
                    />
                    <div className="text-center">
                      <p className="text-brand-gray-dark italic mb-4 text-lg leading-relaxed">
                        {t("quote.text")}
                      </p>
                      <p className="text-brand-gray-medium font-medium">{t("quote.role")}</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      variant="secondary"
                      className="font-semibold py-5 px-10 rounded-lg text-lg"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = "https://calendar.app.google/BgGy8cVUSk4w5Zzg8";
                        link.target = "_blank";
                        link.rel = "noopener noreferrer";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      {t("quote.cta")}
                    </Button>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white p-8 rounded-xl">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-brand-gray-dark mb-6">
                    {t("info.title")}
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-brand-gray-light p-3 rounded-lg shadow-sm">
                        <Mail className="h-6 w-6 text-brand-orange stroke-2" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-gray-dark text-lg">{t("info.emailLabel")}</h4>
                        <p className="text-brand-gray-medium text-lg">bas@innerleaps.nl</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-brand-gray-light p-3 rounded-lg shadow-sm">
                        <Phone className="h-6 w-6 text-brand-orange stroke-2" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-gray-dark text-lg">{t("info.phoneLabel")}</h4>
                        <p className="text-brand-gray-medium text-lg">06 23 45 34 77</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-brand-gray-light p-3 rounded-lg shadow-sm">
                        <MapPin className="h-6 w-6 text-brand-orange stroke-2" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-gray-dark text-lg">{t("info.addressLabel")}</h4>
                        <p className="text-brand-gray-medium text-lg">Olympisch Stadion 24, 28</p>
                        <p className="text-brand-gray-medium text-lg">1076 DE Amsterdam</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ROICalculator />
      <Footer />
    </div>
  );
};

export default Contact;
