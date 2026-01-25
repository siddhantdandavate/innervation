import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[hsl(220,30%,8%)] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Neural network pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(72, 100%, 50%)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(72, 100%, 50%)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(200, 100%, 50%)" stopOpacity="0.3" />
                <stop offset="50%" stopColor="hsl(72, 100%, 50%)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="hsl(200, 100%, 50%)" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            
            {/* Connection lines */}
            <g className="animate-pulse-glow">
              <line x1="200" y1="300" x2="500" y2="200" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="500" y1="200" x2="800" y2="350" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="800" y1="350" x2="1100" y2="250" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="1100" y1="250" x2="1400" y2="400" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="1400" y1="400" x2="1700" y2="300" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="300" y1="600" x2="600" y2="500" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="600" y1="500" x2="900" y2="650" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="900" y1="650" x2="1200" y2="550" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="1200" y1="550" x2="1500" y2="700" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="1500" y1="700" x2="1800" y2="600" stroke="url(#lineGrad)" strokeWidth="1" />
            </g>
            
            {/* Nodes */}
            <circle cx="200" cy="300" r="6" fill="url(#nodeGlow)" />
            <circle cx="500" cy="200" r="8" fill="url(#nodeGlow)" />
            <circle cx="800" cy="350" r="5" fill="url(#nodeGlow)" />
            <circle cx="1100" cy="250" r="7" fill="url(#nodeGlow)" />
            <circle cx="1400" cy="400" r="6" fill="url(#nodeGlow)" />
            <circle cx="1700" cy="300" r="5" fill="url(#nodeGlow)" />
            <circle cx="300" cy="600" r="5" fill="url(#nodeGlow)" />
            <circle cx="600" cy="500" r="7" fill="url(#nodeGlow)" />
            <circle cx="900" cy="650" r="6" fill="url(#nodeGlow)" />
            <circle cx="1200" cy="550" r="8" fill="url(#nodeGlow)" />
            <circle cx="1500" cy="700" r="5" fill="url(#nodeGlow)" />
            <circle cx="1800" cy="600" r="6" fill="url(#nodeGlow)" />
          </svg>
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,30%,8%)] via-[hsl(220,25%,12%)] to-[hsl(220,30%,8%)]" />
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-[hsl(72,100%,50%)]/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-[hsl(210,100%,50%)]/5 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-narrow relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[hsl(72,100%,50%)] animate-pulse" />
            <span className="text-white/80 text-sm font-medium">
              Trusted by 100+ Enterprises Across India
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.1] mb-6 animate-fade-in-up">
            Transforming Business Through
            <span className="block text-[hsl(72,100%,50%)] mt-2">Intelligent Technology</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            We partner with forward-thinking organizations to deliver AI-powered solutions, 
            cloud transformation, and custom software that drives measurable business outcomes.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <Link to="/contact">
              <Button size="lg" className="bg-[hsl(72,100%,50%)] text-[hsl(220,20%,10%)] hover:bg-[hsl(72,100%,45%)] font-semibold px-8 h-14 text-base">
                Request a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold px-8 h-14 text-base"
              >
                <Play className="mr-2 h-5 w-5" />
                Explore Our Work
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-12 border-t border-white/10 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <p className="text-white/40 text-sm mb-6 uppercase tracking-wider">
              Trusted Technology Partner
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-[hsl(72,100%,50%)]">100+</div>
                <div className="text-white/60 text-sm mt-1">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-[hsl(72,100%,50%)]">50+</div>
                <div className="text-white/60 text-sm mt-1">Enterprise Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-[hsl(72,100%,50%)]">8+</div>
                <div className="text-white/60 text-sm mt-1">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-[hsl(72,100%,50%)]">98%</div>
                <div className="text-white/60 text-sm mt-1">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-[hsl(72,100%,50%)] rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};