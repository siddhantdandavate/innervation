import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-narrow">
        <div className="relative overflow-hidden rounded-3xl bg-background border border-border p-12 md:p-16 lg:p-20">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
              Next Step
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10">
              Tell us where manual work is dragging you down. We'll design the AI agents, workflows, and integrations that keep your company running on autopilot.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="accent" size="xl">
                <Link to="/contact" className="flex items-center gap-2">
                  Book a Consultation
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/services">Explore Solutions</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
