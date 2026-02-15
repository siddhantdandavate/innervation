import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const AgileDelivery = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Left - Dark Section */}
        <div className="bg-section-dark text-section-dark-foreground p-12 lg:p-20 flex flex-col justify-center min-h-[450px]">
          <span className="text-accent text-sm font-semibold uppercase tracking-wider mb-4">
            Our Approach
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight">
            Agile Delivery Mindset
          </h2>
          <p className="text-section-dark-foreground/70 text-lg mb-8 max-w-md leading-relaxed">
            We deliver projects with speed and precision using modern agile methodologies that ensure transparency and rapid iteration.
          </p>
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all group"
          >
            Read More
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Right - Accent Section */}
        <div className="relative min-h-[450px] bg-accent">
          <div className="absolute inset-0 flex flex-col justify-center p-12 lg:p-20">
            <span className="text-accent-foreground/70 text-sm font-semibold uppercase tracking-wider mb-4">
              Success Stories
            </span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-accent-foreground mb-6 leading-tight">
              Our successful Digital Transformation stories
            </h3>
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 text-accent-foreground font-semibold hover:gap-3 transition-all group"
            >
              Read More
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
