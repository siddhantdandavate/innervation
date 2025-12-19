import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-hero)] p-12 md:p-16 lg:p-20">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-cyan-light/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mb-10">
              Let's discuss how Innervation IT Solutions can help you achieve your technology goals. Our team of experts is ready to architect the perfect solution for your organization.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact" className="flex items-center gap-2">
                  Schedule a Consultation
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="xl">
                <Link to="/services">Explore Solutions</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
