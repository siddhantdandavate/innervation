import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { blogs } from '@/data/blogs';
import { Calendar, ArrowLeft, User } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Blog not found</h1>
          <Link to="/blog" className="text-accent hover:underline">
            ← Back to blog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center text-muted-foreground hover:text-accent mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to blog
          </Link>

          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(blog.date).toLocaleDateString('en-US', {
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

          {blog.image && (
            <div className="mb-12 rounded-2xl overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto"
              />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground/80 prose-strong:text-foreground prose-a:text-accent"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <footer className="mt-16 pt-8 border-t border-border">
            <Link
              to="/blog"
              className="inline-flex items-center text-accent hover:underline"
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
