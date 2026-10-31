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
      excerpt: "Ziekteverzuim verlagen begint bij stress. Wat onderzoek naar aandachttraining laat zien, en hoe je in je eigen organisatie begint.",
      date: "16 december 2024",
      slug: "/blog/hoe-verlaag-ik-het-ziekteverzuim-in-mijn-organisatie"
    },
    {
      id: 2,
      title: "De verborgen kosten van ziekteverzuim met rekenmodel",
      excerpt: "Ziekteverzuim kost meer dan het doorbetaalde salaris. Welke kosten je over het hoofd ziet, en hoe je ze voor je eigen organisatie uitrekent.",
      date: "3 december 2024",
      slug: "/blog/verborgen-kosten-ziekteverzuim-rekenmodel"
    },
    {
      id: 3,
      title: "Ziekteverzuim verlagen met aandachttraining: wat onderzoek laat zien",
      excerpt: "Hoe aandachttraining kan helpen om ziekteverzuim te verlagen. Wat studies vinden over stress, uitvalrisico en ziektedagen, en hoe je zelf begint.",
      date: "28 november 2025",
      slug: "/blog/ziekteverzuim-verlagen-met-aandachttraining"
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
                    <div className="flex items-center text-brand-gray-medium text-base mb-4">
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
