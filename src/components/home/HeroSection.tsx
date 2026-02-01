import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-[hsl(220,30%,8%)] overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,30%,8%)] via-[hsl(220,30%,8%)]/80 to-[hsl(220,30%,8%)]/60" />
      </div>

      {/* Content */}
      <div className="container-narrow relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.1] mb-6">
              Your trusted Technology Partner for{" "}
              <span className="text-[hsl(72,100%,50%)]">Digital Transformation</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              We help businesses accelerate growth through innovative IT solutions and digital excellence.
            </p>
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-[hsl(72,100%,50%)] text-[hsl(220,20%,10%)] hover:bg-[hsl(72,100%,45%)] font-semibold px-8 h-14"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Right - Stats Cards (optional decorative) */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
};
