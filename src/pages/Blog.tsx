import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { cms, CMSBlog } from '@/lib/cms';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';

export default function Blog() {
  const [blogs, setBlogs] = useState<CMSBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      const data = await cms.getBlogs();
      setBlogs(data);
      setLoading(false);
    };
    loadBlogs();
  }, []);

  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Insights, tips, and updates from our team
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link key={blog.id} to={`/blog/${blog.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
                    {blog.featured_image && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={blog.featured_image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {blog.published_at
                            ? new Date(blog.published_at).toLocaleDateString()
                            : new Date(blog.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {blog.title}
                      </h2>
                      <p className="text-muted-foreground line-clamp-3 mb-4">
                        {blog.excerpt || blog.content.substring(0, 150)}...
                      </p>
                      <div className="flex items-center text-primary font-medium">
                        Read more
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
