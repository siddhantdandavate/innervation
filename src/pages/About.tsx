import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Lightbulb, Users, Shield } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously explore emerging technologies to deliver cutting-edge solutions that give our clients a competitive edge.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We view every client relationship as a strategic partnership, investing in their long-term success as our own.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We operate with complete transparency, delivering honest assessments and realistic commitments in every engagement.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We hold ourselves to the highest standards, ensuring every deliverable reflects our commitment to quality.",
  },
];

const differentiators = [
  "Strategic approach that aligns technology with business objectives",
  "Deep technical expertise across the full technology stack",
  "Proven methodologies refined through hundreds of successful engagements",
  "Dedicated teams that become an extension of your organization",
  "Continuous innovation with focus on emerging technologies",
  "Transparent communication and collaborative partnership model",
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background border-b border-border">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
              About Innervation IT Solutions
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-6">
              Empowering Enterprises Through Technology Innovation
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We are a team of technology strategists, architects, and engineers dedicated to helping organizations harness the full potential of digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section-padding bg-card">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Innervation IT Solutions is a premier technology consulting firm specializing in enterprise digital transformation, artificial intelligence, cloud architecture, and custom software development.
                </p>
                <p>
                  Founded by industry veterans with decades of combined experience, we bridge the gap between business strategy and technology execution. Our multidisciplinary teams combine deep technical expertise with business acumen to deliver solutions that drive measurable outcomes.
                </p>
                <p>
                  We partner with organizations across financial services, healthcare, manufacturing, retail, and the public sector to modernize operations, enhance customer experiences, and create new revenue streams through technology innovation.
                </p>
              </div>
            </div>
            <div className="bg-background rounded-3xl p-10 lg:p-12 border border-border">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-heading font-bold text-accent mb-2">15+</div>
                  <div className="text-muted-foreground">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-heading font-bold text-accent mb-2">250+</div>
                  <div className="text-muted-foreground">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-heading font-bold text-accent mb-2">50+</div>
                  <div className="text-muted-foreground">Expert Consultants</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-heading font-bold text-accent mb-2">98%</div>
                  <div className="text-muted-foreground">Client Retention</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-card rounded-2xl p-10 border border-border hover:border-accent/30 transition-all duration-300">
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To empower organizations with innovative technology solutions that drive operational excellence, accelerate growth, and create sustainable competitive advantage in an increasingly digital world.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-card rounded-2xl p-10 border border-border hover:border-accent/30 transition-all duration-300">
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To be the most trusted technology partner for enterprises seeking to navigate digital transformation, recognized for our technical excellence, innovative approach, and unwavering commitment to client success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-card">
        <div className="container-narrow">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
              Our Foundation
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Core Values That Guide Us
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our values aren't just words on a wall—they shape every decision, interaction, and deliverable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center p-8 rounded-2xl bg-background border border-border hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="section-padding bg-background border-y border-border">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
                Our Difference
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
                What Sets Innervation Apart
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                In a crowded market of IT service providers, we distinguish ourselves through a unique combination of strategic insight, technical depth, and genuine partnership.
              </p>
              <Button asChild variant="accent" size="lg">
                <Link to="/contact" className="flex items-center gap-2">
                  Start a Conversation
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {differentiators.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-accent-foreground text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-card">
        <div className="container-narrow">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              Ready to Partner with Us?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Let's explore how Innervation IT Solutions can help you achieve your technology and business objectives.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="accent" size="xl">
                <Link to="/contact" className="flex items-center gap-2">
                  Contact Our Team
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/services">View Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
