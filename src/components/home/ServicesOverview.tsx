import { Link } from "react-router-dom";
import { 
  Globe, 
  Smartphone, 
  HeadphonesIcon, 
  FolderKanban, 
  MessageSquare, 
  Share2 
} from "lucide-react";

const services = [
  {
    id: "web",
    title: "Website Development",
    description: "High-performance websites tailored to your brand.",
    icon: Globe,
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    description: "Intuitive apps for iOS and Android.",
    icon: Smartphone,
  },
  {
    id: "support",
    title: "Continuous Support",
    description: "Reliable maintenance and 24/7 assistance.",
    icon: HeadphonesIcon,
  },
  {
    id: "project",
    title: "Project Management",
    description: "Goal-oriented delivery of tailored solutions.",
    icon: FolderKanban,
  },
  {
    id: "consulting",
    title: "Consulting",
    description: "Expert IT strategies for business growth.",
    icon: MessageSquare,
  },
  {
    id: "social",
    title: "Social Media Marketing",
    description: "Targeted strategies to grow your audience.",
    icon: Share2,
  },
];

export const ServicesOverview = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[hsl(72,100%,50%)] text-sm font-medium uppercase tracking-wider">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3">
            Our Services
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            We deliver end-to-end digital solutions to help your business thrive.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div 
              key={service.id}
              className="group p-6 rounded-xl bg-card border border-border hover:border-[hsl(72,100%,50%)]/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-[hsl(72,100%,50%)]/10 flex items-center justify-center mb-4 group-hover:bg-[hsl(72,100%,50%)]/20 transition-colors">
                <service.icon className="w-6 h-6 text-[hsl(72,100%,50%)]" />
              </div>
              <h3 className="font-heading font-semibold text-foreground text-lg mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors"
          >
            Explore All Services
          </Link>
        </div>
      </div>
    </section>
  );
};
