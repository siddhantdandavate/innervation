import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Globe, 
  Smartphone, 
  HeadphonesIcon, 
  FolderKanban, 
  MessageSquare, 
  Share2,
  CheckCircle
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Build stunning, high-performance websites tailored to your brand.",
    benefits: [
      "Responsive, mobile-first design",
      "Fast loading and SEO optimized",
      "E-commerce ready",
      "Easy content management",
    ],
    href: "/services/web-development",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Engage users with intuitive iOS and Android applications.",
    benefits: [
      "Cross-platform development",
      "Native performance",
      "Push notifications",
      "App store optimization",
    ],
    href: "/services/mobile-development",
  },
  {
    icon: HeadphonesIcon,
    title: "Continuous Support",
    description: "24/7 maintenance and support to keep systems running smoothly.",
    benefits: [
      "Proactive monitoring",
      "Fast issue resolution",
      "Regular updates",
      "Dedicated support team",
    ],
    href: "/services/support",
  },
  {
    icon: FolderKanban,
    title: "Project Management",
    description: "Goal-oriented project management for efficient delivery.",
    benefits: [
      "On-time delivery",
      "Agile methodology",
      "Transparent communication",
      "Quality assurance",
    ],
    href: "/services/project-management",
  },
  {
    icon: MessageSquare,
    title: "Consulting",
    description: "Expert IT consulting to drive innovation and growth.",
    benefits: [
      "Technology roadmaps",
      "Cost optimization",
      "Risk assessment",
      "Best practices",
    ],
    href: "/services/consulting",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    description: "Targeted strategies to grow your audience and boost conversions.",
    benefits: [
      "Content creation",
      "Campaign management",
      "Analytics & reporting",
      "Community engagement",
    ],
    href: "/services/social-media",
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[hsl(220,30%,8%)]">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <span className="text-[hsl(72,100%,50%)] font-medium text-sm uppercase tracking-wider mb-4 block">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-6">
              Digital Solutions for Your Business
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              From websites to apps, marketing to support — we help you grow.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-[hsl(72,100%,50%)]/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[hsl(72,100%,50%)]/10 flex items-center justify-center mb-6 group-hover:bg-[hsl(72,100%,50%)]/20 transition-colors">
                  <service.icon className="w-7 h-7 text-[hsl(72,100%,50%)]" />
                </div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">
                  {service.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-[hsl(72,100%,50%)] shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Link 
                  to={service.href} 
                  className="inline-flex items-center gap-2 text-[hsl(72,100%,50%)] font-medium hover:gap-3 transition-all"
                >
                  Learn More
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[hsl(220,30%,8%)]">
        <div className="container-narrow">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Let's discuss how we can help your business grow.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-[hsl(72,100%,50%)] text-[hsl(220,20%,10%)] hover:bg-[hsl(72,100%,45%)] font-semibold px-8 py-6">
                <Link to="/contact" className="flex items-center gap-2">
                  Contact Us
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
