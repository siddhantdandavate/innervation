import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

interface ServicePageProps {
  badge: string;
  title: string;
  description: string;
  icon: ReactNode;
  challenges: { title: string; description: string }[];
  approach: { title: string; description: string }[];
  benefits: string[];
  technologies: string[];
  industries: string[];
  ctaText: string;
}

export const ServicePageTemplate = ({
  badge,
  title,
  description,
  icon,
  challenges,
  approach,
  benefits,
  technologies,
  industries,
  ctaText,
}: ServicePageProps) => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-background border-b border-border">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="accent-dot" />
              {icon}
            </div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">{badge}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-6">{title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="section-padding bg-card">
        <div className="container-narrow">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">Business Challenges We Solve</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12">Common Pain Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((item) => (
              <div key={item.title} className="bg-background rounded-xl p-6 border border-border hover:border-accent/30 transition-all">
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">Our Approach</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12">How We Deliver</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {approach.map((item, i) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <span className="text-accent-foreground font-bold">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-card">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">Key Benefits</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">Why Innervation IT Solutions</h2>
              <ul className="space-y-4">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <div className="bg-background rounded-xl p-6 border border-border">
                <h3 className="font-heading font-semibold text-foreground mb-4">Technologies & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-lg bg-card border border-border text-sm">{t}</span>
                  ))}
                </div>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <h3 className="font-heading font-semibold text-foreground mb-4">Industries Served</h3>
                <div className="flex flex-wrap gap-2">
                  {industries.map((ind) => (
                    <span key={ind} className="px-3 py-1 rounded-lg bg-accent/10 text-accent text-sm">{ind}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background border-t border-border">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">{ctaText}</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">Let's discuss how we can help transform your business with our expertise.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="accent" size="xl">
              <Link to="/contact" className="flex items-center gap-2">{ctaText}<ArrowRight size={20} /></Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};
