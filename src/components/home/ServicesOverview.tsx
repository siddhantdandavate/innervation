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
    href: "/services/digital-transformation",
  },
  {
    icon: Brain,
    title: "AI & Intelligent Automation",
    description: "Leverage artificial intelligence and machine learning to automate workflows, enhance decision-making, and unlock new opportunities.",
    href: "/services/ai-automation",
  },
  {
    icon: Cloud,
    title: "Cloud & SaaS Solutions",
    description: "Design, migrate, and optimize cloud infrastructure for scalability, security, and cost-effectiveness on leading platforms.",
    href: "/services/cloud-solutions",
  },
  {
    icon: Database,
    title: "Data Engineering & Analytics",
    description: "Build robust data pipelines and analytics solutions that transform raw data into actionable business intelligence.",
    href: "/services/data-engineering",
  },
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Develop tailored software applications that address your unique business requirements with modern technologies.",
    href: "/services/custom-development",
  },
  {
    icon: Settings,
    title: "Managed IT Services",
    description: "Comprehensive IT management and support to ensure your technology infrastructure operates at peak performance.",
    href: "/services/managed-services",
  },
];

export const ServicesOverview = () => {
  return (
    <section className="section-padding bg-card">
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
            <Link
              to={service.href}
              key={service.title}
              className="group bg-background rounded-2xl p-8 border border-border hover:border-accent/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="accent-dot" />
                <service.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="inline-flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all duration-300">
                Learn More
                <ArrowRight size={16} />
              </div>
            </Link>
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
