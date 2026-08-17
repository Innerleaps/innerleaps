import SimplifiedNavigation from '@/components/SimplifiedNavigation';
import PageSeo from '@/components/PageSeo';
import { useTranslation } from 'react-i18next';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const { t } = useTranslation('common');
  const blogPosts = [
    {
      id: 1,
      title: "Hoe verlaag ik het ziekteverzuim in mijn organisatie",
      excerpt: "Ziekteverzuim verlagen met 15-21% door aandachtstraining. Wetenschappelijk bewezen: 70% lager uitvalrisico. Ontdek de evidence-based aanpak met 89,8% adoptie.",
      date: "16 december 2024",
      slug: "/blog/hoe-verlaag-ik-het-ziekteverzuim-in-mijn-organisatie"
    },
    {
      id: 2,
      title: "De verborgen kosten van ziekteverzuim met rekenmodel",
      excerpt: "Ontdek de verborgen kosten van ziekteverzuim. Bereken met ons rekenmodel de échte impact: €438.330 per jaar bij 100 medewerkers. Wetenschappelijk bewezen oplossing met 497-775% ROI.",
      date: "3 december 2024",
      slug: "/blog/verborgen-kosten-ziekteverzuim-rekenmodel"
    },
    {
      id: 3,
      title: "Ziekteverzuim Verlagen: De Wetenschappelijk Bewezen Aanpak voor 2025",
      excerpt: "Ziekteverzuim verlagen met 15-21% door wetenschappelijk bewezen aandachtstraining. ROI 497-775%. Ontdek hoe 40 jaar onderzoek verzuimkosten structureel verlaagt.",
      date: "28 november 2025",
      slug: "/blog/ziekteverzuim-verlagen-wetenschappelijk-bewezen-aanpak-2025"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageSeo title={t('seo.blog.title')} description={t('seo.blog.description')} />
      <SimplifiedNavigation />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-brand-off-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple mb-6">
            <span className="text-brand-orange">Blog</span>
          </h1>
          <p className="text-xl md:text-2xl text-brand-gray-medium max-w-3xl mx-auto">
            Inzichten, tips en wetenschappelijke kennis over stressmanagement, 
            concentratie en mentale vitaliteit.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} to={post.slug}>
                <Card className="bg-white hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center text-brand-gray-medium text-sm mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      {post.date}
                    </div>
                    <h2 className="text-xl font-bold text-brand-purple mb-3">
                      {post.title}
                    </h2>
                    <p className="text-brand-gray-medium mb-4">
                      {post.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
