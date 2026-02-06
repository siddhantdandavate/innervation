import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { cms, CMSBlog } from '@/lib/cms';
import { Calendar, ArrowLeft, User } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<CMSBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      if (slug) {
        const data = await cms.getBlogBySlug(slug);
        setBlog(data);
      }
      setLoading(false);
    };
    loadBlog();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Blog not found</h1>
          <Link to="/blog" className="text-primary hover:underline">
            ← Back to blog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* SEO Meta Tags */}
      {blog.meta_title && (
        <title>{blog.meta_title}</title>
      )}

      <article className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Back Link */}
          <Link
            to="/blog"
            className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {blog.published_at
                    ? new Date(blog.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : new Date(blog.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                </span>
              </div>
              {blog.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{blog.author}</span>
                </div>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {blog.featured_image && (
            <div className="mb-12 rounded-2xl overflow-hidden">
              <img
                src={blog.featured_image}
                alt={blog.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index} className="text-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <Link
              to="/blog"
              className="inline-flex items-center text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to all posts
            </Link>
          </footer>
        </div>
      </article>
    </Layout>
  );
}
