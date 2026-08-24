import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Activity, Brain, BookOpen, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TEXT_SHADOW_STRONG } from "@/styles/common";
import masterclassBg from "@/assets/masterclass-audience.webp";
import { detectLanguageFromPath } from "@/i18n/config";

interface MasterclassSectionProps {
  variant: "employee" | "employer";
}

const MasterclassSection = ({ variant }: MasterclassSectionProps) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = detectLanguageFromPath(pathname);
  const isEmployee = variant === "employee";
  const contactHref = lang === 'en' ? '/en/contact' : '/contact';

  const subcopy = isEmployee
    ? t('masterclass.subcopyEmployee')
    : t('masterclass.subcopyEmployer');

  const cards = [
    {
      icon: Activity,
      title: t('masterclass.cards.stress.title'),
      text: isEmployee ? t('masterclass.cards.stress.employee') : t('masterclass.cards.stress.employer'),
    },
    {
      icon: Brain,
      title: t('masterclass.cards.attention.title'),
      text: isEmployee ? t('masterclass.cards.attention.employee') : t('masterclass.cards.attention.employer'),
    },
    {
      icon: BookOpen,
      title: t('masterclass.cards.reset.title'),
      text: isEmployee ? t('masterclass.cards.reset.employee') : t('masterclass.cards.reset.employer'),
    },
    {
      icon: Award,
      title: t('masterclass.cards.noCommitment.title'),
      text: t('masterclass.cards.noCommitment.text'),
    },
  ];

  return (
    <section id="masterclass" className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={masterclassBg}
          alt={t('masterclass.imageAlt')}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-brand-purple/70" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight mb-6"
          style={TEXT_SHADOW_STRONG}
        >
          {t('masterclass.headlinePart1')} <span className="text-brand-orange">{t('masterclass.headlinePart2')}</span>
        </h2>
        <p
          className="text-xl md:text-2xl text-white text-center leading-relaxed mb-12 max-w-4xl mx-auto"
          style={TEXT_SHADOW_STRONG}
        >
          {subcopy}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
          {cards.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="bg-white/70 backdrop-blur-sm border border-white/40 p-6 rounded-xl space-y-4 shadow-lg"
            >
              <div className="p-3 rounded-lg bg-brand-orange w-fit mx-auto">
                <Icon className="h-10 w-10 text-white stroke-2" />
              </div>
              <h3 className="text-xl font-bold text-brand-purple text-center">{title}</h3>
              <p className="text-base md:text-lg text-brand-gray-medium text-center leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mb-10 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-brand-orange text-brand-orange" />
            ))}
          </div>
          <p
            className="text-lg md:text-xl text-white italic leading-relaxed"
            style={TEXT_SHADOW_STRONG}
          >
            {t('masterclass.review')}{" "}
            <span className="not-italic font-semibold">{t('masterclass.reviewer')}</span>
          </p>
        </div>

        <div className="text-center">
          {isEmployee ? (
            <Link to={contactHref}>
              <Button
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white py-4 px-8 rounded-lg text-lg md:text-xl font-semibold shadow-xl"
              >
                {t('masterclass.ctaEmployee')}
              </Button>
            </Link>
          ) : (
            <Button
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white py-4 px-8 rounded-lg text-lg md:text-xl font-semibold shadow-xl"
              onClick={() => window.open("https://innerleaps.nl/Calendar", "_blank")}
            >
              {t('masterclass.ctaEmployer')}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default MasterclassSection;
