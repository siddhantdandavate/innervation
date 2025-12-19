import { Building2, HeartPulse, ShoppingCart, Landmark, Factory, GraduationCap } from "lucide-react";

const industries = [
  {
    icon: Landmark,
    name: "Financial Services",
    description: "Secure, compliant solutions for banking, insurance, and fintech organizations.",
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    description: "HIPAA-compliant digital health solutions and clinical systems integration.",
  },
  {
    icon: ShoppingCart,
    name: "Retail & E-Commerce",
    description: "Omnichannel experiences and supply chain optimization for modern retail.",
  },
  {
    icon: Factory,
    name: "Manufacturing",
    description: "Industry 4.0 implementations, IoT integration, and smart factory solutions.",
  },
  {
    icon: Building2,
    name: "Enterprise",
    description: "Large-scale digital transformation for complex organizational structures.",
  },
  {
    icon: GraduationCap,
    name: "Education",
    description: "EdTech platforms and learning management system implementations.",
  },
];

export const IndustriesSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
            Industries We Serve
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Expertise Across Key Sectors
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We understand the unique challenges and regulatory requirements of diverse industries, delivering tailored solutions that address sector-specific needs.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="group text-center p-6 rounded-2xl bg-background border border-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/10 transition-colors duration-300">
                <industry.icon className="w-8 h-8 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
              </div>
              <h3 className="font-heading font-semibold text-foreground text-sm mb-2">
                {industry.name}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed hidden lg:block">
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
