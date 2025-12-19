import { Link } from "react-router-dom";
import { 
  Layers, 
  Brain, 
  Cloud, 
  Database, 
  Code, 
  Settings,
  ArrowRight
} from "lucide-react";

const services = [
  {
    icon: Layers,
    title: "Digital Transformation",
    description: "Modernize legacy systems and processes to drive innovation, efficiency, and competitive advantage across your organization.",
  },
  {
    icon: Brain,
    title: "AI & Intelligent Automation",
    description: "Leverage artificial intelligence and machine learning to automate workflows, enhance decision-making, and unlock new opportunities.",
  },
  {
    icon: Cloud,
    title: "Cloud & SaaS Solutions",
    description: "Design, migrate, and optimize cloud infrastructure for scalability, security, and cost-effectiveness on leading platforms.",
  },
  {
    icon: Database,
    title: "Data Engineering & Analytics",
    description: "Build robust data pipelines and analytics solutions that transform raw data into actionable business intelligence.",
  },
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Develop tailored software applications that address your unique business requirements with modern technologies.",
  },
  {
    icon: Settings,
    title: "Managed IT Services",
    description: "Comprehensive IT management and support to ensure your technology infrastructure operates at peak performance.",
  },
];

export const ServicesOverview = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Comprehensive IT Solutions for Modern Enterprises
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From strategic consulting to hands-on implementation, we deliver end-to-end technology services that accelerate your digital journey.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {service.description}
              </p>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all duration-300"
              >
                Learn More
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all duration-300"
          >
            View All Services
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};
