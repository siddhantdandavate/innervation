import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container-narrow relative z-10 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent mb-8 animate-fade-in">
            <Sparkles size={16} />
            <span className="text-sm font-medium">Enterprise Technology Solutions</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Transform Your Business with{" "}
            <span className="text-accent">Intelligent Technology</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Innervation IT Solutions empowers enterprises to achieve operational excellence through strategic IT consulting, AI-driven automation, and end-to-end digital transformation.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button asChild variant="accent" size="xl">
              <Link to="/contact" className="flex items-center gap-2">
                Request a Consultation
                <ArrowRight size={20} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/services">Explore Our Services</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-10 border-t border-border animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <p className="text-muted-foreground text-sm mb-4">Trusted by forward-thinking organizations</p>
            <div className="flex flex-wrap gap-8 items-center">
              <div className="text-muted-foreground/60 font-heading font-semibold text-lg">TechCorp</div>
              <div className="text-muted-foreground/60 font-heading font-semibold text-lg">FinServ Inc</div>
              <div className="text-muted-foreground/60 font-heading font-semibold text-lg">HealthTech</div>
              <div className="text-muted-foreground/60 font-heading font-semibold text-lg">RetailPro</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};
