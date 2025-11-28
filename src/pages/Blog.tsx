import SimplifiedNavigation from '@/components/SimplifiedNavigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const Blog = () => {
  // Placeholder blog posts - later te vervangen door echte data
  const blogPosts = [
    {
      id: 1,
      title: "Binnenkort meer artikelen",
      excerpt: "We werken aan nieuwe content over stressmanagement, concentratie en vitaliteit.",
      date: "28 november 2024",
      slug: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
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
              <Card key={post.id} className="bg-white hover:shadow-lg transition-shadow">
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
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
