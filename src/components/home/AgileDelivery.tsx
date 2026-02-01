import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const AgileDelivery = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Left - Dark Section */}
        <div className="bg-[hsl(220,30%,8%)] text-white p-12 lg:p-20 flex flex-col justify-center min-h-[400px]">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight">
            Agile Delivery Mindset
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-md">
            We deliver projects with speed and precision using modern agile methodologies that ensure transparency and rapid iteration.
          </p>
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-[hsl(72,100%,50%)] font-medium hover:gap-3 transition-all"
          >
            Read More
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Right - Image with Overlay */}
        <div className="relative min-h-[400px] bg-cover bg-center" 
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-[hsl(72,100%,50%)]/80" />
          <div className="absolute inset-0 flex flex-col justify-center p-12 lg:p-20">
            <span className="text-[hsl(220,20%,10%)] text-sm font-medium uppercase tracking-wider mb-4">
              Success Stories
            </span>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-[hsl(220,20%,10%)] mb-6">
              Our successful Digital Transformation stories
            </h3>
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 text-[hsl(220,20%,10%)] font-medium hover:gap-3 transition-all"
            >
              Read More
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
