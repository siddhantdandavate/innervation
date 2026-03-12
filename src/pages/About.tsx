import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Lightbulb, Users, Shield } from "lucide-react";
import { useCMSContentWithFallback } from "@/hooks/use-cms";

const iconMap = [Lightbulb, Users, Shield, Target];

const heroFallback = {
  section_label: "About Innervation IT Solutions",
  title: "Empowering Enterprises Through Technology Innovation",
  description: "We are a team of technology strategists, architects, and engineers dedicated to helping organizations harness the full potential of digital transformation.",
};

const companyFallback = {
  title: "Who We Are",
  paragraph_1: "Innervation IT Solutions is a premier technology consulting firm specializing in enterprise digital transformation, artificial intelligence, cloud architecture, and custom software development.",
  paragraph_2: "Founded by industry veterans with decades of combined experience, we bridge the gap between business strategy and technology execution. Our multidisciplinary teams combine deep technical expertise with business acumen to deliver solutions that drive measurable outcomes.",
  paragraph_3: "We partner with organizations across financial services, healthcare, manufacturing, retail, and the public sector to modernize operations, enhance customer experiences, and create new revenue streams through technology innovation.",
  stat_1_value: "15+", stat_1_label: "Years of Excellence",
  stat_2_value: "250+", stat_2_label: "Projects Delivered",
  stat_3_value: "50+", stat_3_label: "Expert Consultants",
  stat_4_value: "98%", stat_4_label: "Client Retention",
};

const missionFallback = {
  mission_title: "Our Mission",
  mission_text: "To empower organizations with innovative technology solutions that drive operational excellence, accelerate growth, and create sustainable competitive advantage in an increasingly digital world.",
  vision_title: "Our Vision",
  vision_text: "To be the most trusted technology partner for enterprises seeking to navigate digital transformation, recognized for our technical excellence, innovative approach, and unwavering commitment to client success.",
};

const valuesFallback = {
  section_label: "Our Foundation",
  title: "Core Values That Guide Us",
  description: "Our values aren't just words on a wall—they shape every decision, interaction, and deliverable.",
  value_1_title: "Innovation",
  value_1_description: "We continuously explore emerging technologies to deliver cutting-edge solutions that give our clients a competitive edge.",
  value_2_title: "Partnership",
  value_2_description: "We view every client relationship as a strategic partnership, investing in their long-term success as our own.",
  value_3_title: "Integrity",
  value_3_description: "We operate with complete transparency, delivering honest assessments and realistic commitments in every engagement.",
  value_4_title: "Excellence",
  value_4_description: "We hold ourselves to the highest standards, ensuring every deliverable reflects our commitment to quality.",
};

const ctaFallback = {
  title: "Ready to Partner with Us?",
  description: "Let's explore how Innervation IT Solutions can help you achieve your technology and business objectives.",
  cta_primary_text: "Contact Our Team",
  cta_secondary_text: "View Our Services",
};

const About = () => {
  const { content: hero } = useCMSContentWithFallback("about_hero", heroFallback);
  const { content: company } = useCMSContentWithFallback("about_company", companyFallback);
  const { content: mission } = useCMSContentWithFallback("about_mission", missionFallback);
  const { content: vals } = useCMSContentWithFallback("about_values", valuesFallback);
  const { content: cta } = useCMSContentWithFallback("about_cta", ctaFallback);

  const values = [
    { icon: iconMap[0], title: vals.value_1_title, description: vals.value_1_description },
    { icon: iconMap[1], title: vals.value_2_title, description: vals.value_2_description },
    { icon: iconMap[2], title: vals.value_3_title, description: vals.value_3_description },
    { icon: iconMap[3], title: vals.value_4_title, description: vals.value_4_description },
  ];

  const stats = [
    { value: company.stat_1_value, label: company.stat_1_label },
    { value: company.stat_2_value, label: company.stat_2_label },
    { value: company.stat_3_value, label: company.stat_3_label },
    { value: company.stat_4_value, label: company.stat_4_label },
  ];

  const differentiators = [
    "Strategic approach that aligns technology with business objectives",
    "Deep technical expertise across the full technology stack",
    "Proven methodologies refined through hundreds of successful engagements",
    "Dedicated teams that become an extension of your organization",
    "Continuous innovation with focus on emerging technologies",
    "Transparent communication and collaborative partnership model",
  ];

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-background border-b border-border">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">{hero.section_label}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-6">{hero.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{hero.description}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">{company.title}</h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>{company.paragraph_1}</p>
                <p>{company.paragraph_2}</p>
                <p>{company.paragraph_3}</p>
              </div>
            </div>
            <div className="bg-background rounded-3xl p-10 lg:p-12 border border-border">
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-5xl font-heading font-bold text-accent mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl p-10 border border-border hover:border-accent/30 transition-all duration-300">
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">{mission.mission_title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{mission.mission_text}</p>
            </div>
            <div className="bg-card rounded-2xl p-10 border border-border hover:border-accent/30 transition-all duration-300">
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">{mission.vision_title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{mission.vision_text}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container-narrow">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">{vals.section_label}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">{vals.title}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{vals.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="text-center p-8 rounded-2xl bg-background border border-border hover:border-accent/30 transition-all duration-300">
                <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background border-y border-border">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">Our Difference</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">What Sets Innervation Apart</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">In a crowded market of IT service providers, we distinguish ourselves through a unique combination of strategic insight, technical depth, and genuine partnership.</p>
              <Button asChild variant="accent" size="lg">
                <Link to="/contact" className="flex items-center gap-2">Start a Conversation <ArrowRight size={18} /></Link>
              </Button>
            </div>
            <div className="space-y-4">
              {differentiators.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors duration-300">
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

      <section className="section-padding bg-card">
        <div className="container-narrow">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">{cta.title}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">{cta.description}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="accent" size="xl">
                <Link to="/contact" className="flex items-center gap-2">{cta.cta_primary_text} <ArrowRight size={20} /></Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/services">{cta.cta_secondary_text}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
