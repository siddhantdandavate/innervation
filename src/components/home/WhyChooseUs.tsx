import { CheckCircle, Award, Users, Zap, Shield, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Proven Expertise",
    description: "Deep technical knowledge across enterprise technologies with successful implementations across diverse industries.",
  },
  {
    icon: Users,
    title: "Client-Centric Approach",
    description: "We prioritize understanding your business goals to deliver solutions that create measurable value.",
  },
  {
    icon: Zap,
    title: "Agile Delivery",
    description: "Rapid, iterative development methodologies that ensure quick time-to-value and continuous improvement.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Security-first mindset with compliance frameworks that protect your data and systems.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description: "Architectures designed to grow with your business, from startup to enterprise scale.",
  },
  {
    icon: CheckCircle,
    title: "End-to-End Partnership",
    description: "From strategy to implementation to ongoing support, we're with you at every step.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-muted/50">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
              Why Innervation IT Solutions
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Your Strategic Technology Partner
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              We combine technical excellence with business acumen to deliver technology solutions that drive real results. Our approach ensures your technology investments align with your strategic objectives and deliver sustained competitive advantage.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-4xl font-heading font-bold text-accent mb-1">98%</div>
                <div className="text-muted-foreground text-sm">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold text-accent mb-1">250+</div>
                <div className="text-muted-foreground text-sm">Projects Delivered</div>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold text-accent mb-1">15+</div>
                <div className="text-muted-foreground text-sm">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Right Content - Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <div
                key={reason.title}
                className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border/50"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <reason.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
