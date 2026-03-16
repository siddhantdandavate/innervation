import { Link } from "react-router-dom";
import {
  Globe,
  Smartphone,
  HeadphonesIcon,
  FolderKanban,
  MessageSquare,
  Share2,
  ArrowRight
} from "lucide-react";
import { useCMSContentWithFallback } from "@/hooks/use-cms";

const services = [
  { id: "web", title: "Website Development", description: "High-performance websites tailored to your brand.", icon: Globe, href: "/services/web-development" },
  { id: "mobile", title: "Mobile App Development", description: "Intuitive apps for iOS and Android.", icon: Smartphone, href: "/services/mobile-development" },
  { id: "support", title: "Continuous Support", description: "Reliable maintenance and 24/7 assistance.", icon: HeadphonesIcon, href: "/services/support" },
  { id: "project", title: "Project Management", description: "Goal-oriented delivery of tailored solutions.", icon: FolderKanban, href: "/services/project-management" },
  { id: "consulting", title: "Consulting", description: "Expert IT strategies for business growth.", icon: MessageSquare, href: "/services/consulting" },
  { id: "social", title: "Social Media Marketing", description: "Targeted strategies to grow your audience.", icon: Share2, href: "/services/social-media" },
];

const fallback = {
  section_label: "What We Offer",
  title: "Our Services",
  description: "We deliver end-to-end digital solutions to help your business thrive.",
  cta_text: "Explore All Services",
  cta_link: "/services",
};

export const ServicesOverview = () => {
  const { content } = useCMSContentWithFallback("services_overview", fallback);

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <span className="inline-block text-accent text-sm font-semibold uppercase tracking-wider mb-3">
            {content.section_label}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            {content.title}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            {content.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              to={service.href}
              className="group p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-accent/50 card-lift"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-card-foreground text-xl mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-4">{service.description}</p>
              <div className="flex items-center gap-2 text-accent font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            to={content.cta_link}
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-xl font-semibold hover:bg-accent/90 transition-colors shadow-lg btn-glow"
          >
            {content.cta_text}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};