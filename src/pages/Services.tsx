import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Layers, 
  Brain, 
  Cloud, 
  Database, 
  Code, 
  Settings,
  CheckCircle
} from "lucide-react";

const services = [
  {
    icon: Layers,
    title: "Digital Transformation & IT Consulting",
    description: "Navigate the complexities of digital transformation with strategic guidance from experienced technology consultants.",
    benefits: [
      "Comprehensive technology assessments and roadmaps",
      "Legacy system modernization strategies",
      "Business process optimization",
      "Change management and adoption planning",
      "Technology governance frameworks",
    ],
    href: "/services/digital-transformation",
  },
  {
    icon: Brain,
    title: "AI & Intelligent Automation",
    description: "Harness the power of artificial intelligence and machine learning to automate operations and unlock data-driven insights.",
    benefits: [
      "Machine learning model development and deployment",
      "Natural language processing solutions",
      "Robotic process automation (RPA)",
      "Predictive analytics implementations",
      "AI-powered customer experience solutions",
    ],
    href: "/services/ai-automation",
  },
  {
    icon: Cloud,
    title: "Cloud & SaaS Solutions",
    description: "Architect, migrate, and optimize cloud infrastructure across leading platforms for scalability, security, and cost efficiency.",
    benefits: [
      "Cloud strategy and architecture design",
      "Multi-cloud and hybrid cloud solutions",
      "Cloud migration and modernization",
      "Cost optimization and FinOps",
      "Cloud-native application development",
    ],
    href: "/services/cloud-solutions",
  },
  {
    icon: Database,
    title: "Data Engineering & Analytics",
    description: "Build robust data infrastructure and analytics capabilities that transform raw data into actionable business intelligence.",
    benefits: [
      "Data warehouse and data lake architecture",
      "ETL/ELT pipeline development",
      "Business intelligence dashboards",
      "Real-time analytics solutions",
      "Data governance and quality frameworks",
    ],
    href: "/services/data-engineering",
  },
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Develop tailored software applications that address your unique business requirements using modern technologies and agile methodologies.",
    benefits: [
      "Full-stack web application development",
      "Mobile application development",
      "API design and integration",
      "Microservices architecture",
      "DevOps and CI/CD implementation",
    ],
    href: "/services/custom-development",
  },
  {
    icon: Settings,
    title: "Managed IT Services",
    description: "Comprehensive IT management and support to ensure your technology infrastructure operates at peak performance around the clock.",
    benefits: [
      "24/7 infrastructure monitoring",
      "Help desk and technical support",
      "Security operations center (SOC)",
      "Patch management and updates",
      "Disaster recovery and business continuity",
    ],
    href: "/services/managed-services",
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background border-b border-border">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-6">
              End-to-End Technology Solutions for Enterprise Success
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From strategic consulting to hands-on implementation, we deliver comprehensive IT services that drive digital transformation and business growth.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-card">
        <div className="container-narrow">
          <div className="space-y-12">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="accent-dot" />
                    <service.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <Button asChild variant="accent" size="lg">
                    <Link to={service.href} className="flex items-center gap-2">
                      Explore This Service
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                </div>

                <div className={`bg-background rounded-2xl p-8 border border-border ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}>
                  <h3 className="font-heading font-semibold text-foreground mb-6">
                    Key Capabilities
                  </h3>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
              Our Approach
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              How We Deliver Results
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our proven methodology ensures consistent, high-quality outcomes across every engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "Deep dive into your business challenges, goals, and current technology landscape." },
              { step: "02", title: "Strategy", desc: "Develop a comprehensive roadmap aligned with your objectives and constraints." },
              { step: "03", title: "Execution", desc: "Implement solutions using agile methodologies with continuous collaboration." },
              { step: "04", title: "Optimization", desc: "Monitor, measure, and refine to ensure sustained value and performance." },
            ].map((phase) => (
              <div
                key={phase.step}
                className="relative p-8 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-300"
              >
                <div className="text-6xl font-heading font-bold text-accent/20 absolute top-4 right-4">
                  {phase.step}
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3 relative z-10">
                  {phase.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-card border-t border-border">
        <div className="container-narrow">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
              Next Step
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Let's Build Your Solution
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Ready to discuss your technology needs? Our team of experts is here to help you navigate the complexities and deliver results that matter.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="accent" size="xl">
                <Link to="/contact" className="flex items-center gap-2">
                  Request a Consultation
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/about">Learn About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
