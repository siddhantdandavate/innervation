import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";

export const MutualGoals = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="bg-muted/50 rounded-2xl p-8 lg:p-12">
            <div className="w-12 h-12 rounded-full bg-[hsl(72,100%,50%)]/20 flex items-center justify-center mb-6">
              <Quote className="w-6 h-6 text-[hsl(72,100%,50%)]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              We help to achieve mutual goals
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              "Innervation IT Solutions has a platform that simplifies our strategies and gives us actionable results. We've achieved 2X growth in our first year of partnering with them."
            </p>
            <div>
              <div className="font-semibold text-foreground">Saurabh Patwari</div>
              <div className="text-muted-foreground text-sm">Founder & CEO, Innervation IT Solutions</div>
            </div>
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 text-[hsl(72,100%,50%)] font-medium hover:gap-3 transition-all mt-8"
            >
              Learn More
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right - Image */}
          <div className="relative">
            <div 
              className="aspect-square rounded-2xl bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80')`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
