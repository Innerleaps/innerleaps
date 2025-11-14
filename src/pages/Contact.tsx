import SimplifiedNavigation from "@/components/SimplifiedNavigation";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, Phone } from "lucide-react";
import StickyCtaButtons from "@/components/StickyCtaButtons";
import ROICalculator from "@/components/ROICalculator";
import { useEffect } from "react";
import Footer from "@/components/Footer";
const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-brand-gray-light">
      <SimplifiedNavigation />
      <StickyCtaButtons />

      <main className="pt-8">
        <section className="bg-brand-off-white section-padding">
          <div className="container-custom">
            <div className="text-center space-y-6 mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-dark">
                Stel je <span className="text-brand-orange">vragen</span> aan Bas
              </h1>
            </div>

            {/* Contact sections */}
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quote section */}
                <div className="bg-white p-8 rounded-xl">
                  <div className="flex flex-col items-center space-y-6 mb-8">
                    <img
                      src="/lovable-uploads/eaa7a159-2f85-4fa3-b487-4855426f2c14.png"
                      alt="Bas Ter Haar Romenij"
                      className="w-36 h-36 rounded-full object-cover"
                    />
                    <div className="text-center">
                      <p className="text-brand-gray-dark italic mb-4 text-lg leading-relaxed">
                        "Hoi! Wat leuk dat je hier bent. Zullen we even kennismaken? Ik luister graag naar jullie
                        uitdagingen.
                      </p>
                      <p className="text-brand-gray-medium font-medium">— Bas Ter Haar Romenij, Oprichter InnerLeaps</p>
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
                      Plan een gesprek met Bas
                    </Button>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white p-8 rounded-xl">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-brand-gray-dark mb-6">
                    Of neem direct zelf contact op
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-brand-gray-light p-3 rounded-lg shadow-sm">
                        <Mail className="h-6 w-6 text-brand-orange stroke-2" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-gray-dark text-lg">Email</h4>
                        <p className="text-brand-gray-medium text-lg">bas@innerleaps.nl</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-brand-gray-light p-3 rounded-lg shadow-sm">
                        <Phone className="h-6 w-6 text-brand-orange stroke-2" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-gray-dark text-lg">Telefoon</h4>
                        <p className="text-brand-gray-medium text-lg">06 23 45 34 77</p>
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
