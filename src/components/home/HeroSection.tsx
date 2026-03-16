import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useCMSContentWithFallback } from "@/hooks/use-cms";

const fallback = {
  badge_text: "Digital Innovation Partner",
  title: "We Build Digital Solutions That Drive Growth",
  title_highlight: "",
  subtitle: "Innervation IT Solutions – Digital Solutions That Drive Business Growth",
  cta_primary_text: "Get Started",
  cta_primary_link: "/contact",
  cta_secondary_text: "Explore Services",
  cta_secondary_link: "/services",
  stat_1_value: "100+",
  stat_1_label: "Happy Clients",
  stat_2_value: "150+",
  stat_2_label: "Projects Delivered",
  stat_3_value: "5+",
  stat_3_label: "Years Experience",
};

export const HeroSection = () => {
  const { content } = useCMSContentWithFallback("hero", fallback);

  return (
    <section className="relative min-h-[90vh] flex items-center bg-section-dark overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--section-dark-foreground) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--section-dark-foreground) / 0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container-narrow relative z-10 py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-5 py-2.5 mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-accent text-sm font-semibold">{content.badge_text}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-section-dark-foreground leading-[1.1] mb-6">
            {content.title}{" "}
            {content.title_highlight && (
              <span className="text-accent">{content.title_highlight}</span>
            )}
          </h1>

          <p className="text-lg lg:text-xl text-section-dark-foreground/70 mb-10 leading-relaxed max-w-2xl">
            {content.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={content.cta_primary_link}>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 h-14 text-base shadow-lg btn-glow">
                {content.cta_primary_text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={content.cta_secondary_link}>
              <Button size="lg" variant="outline" className="border-section-dark-foreground/20 bg-section-dark-foreground/5 text-section-dark-foreground hover:bg-section-dark-foreground/10 hover:border-section-dark-foreground/30 font-semibold px-8 h-14 text-base">
                {content.cta_secondary_text}
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-8 mt-12 pt-8 border-t border-section-dark-foreground/10">
            <div>
              <div className="text-3xl font-heading font-bold text-accent">{content.stat_1_value}</div>
              <div className="text-section-dark-foreground/50 text-sm">{content.stat_1_label}</div>
            </div>
            <div className="w-px h-12 bg-section-dark-foreground/10" />
            <div>
              <div className="text-3xl font-heading font-bold text-accent">{content.stat_2_value}</div>
              <div className="text-section-dark-foreground/50 text-sm">{content.stat_2_label}</div>
            </div>
            <div className="w-px h-12 bg-section-dark-foreground/10 hidden sm:block" />
            <div className="hidden sm:block">
              <div className="text-3xl font-heading font-bold text-accent">{content.stat_3_value}</div>
              <div className="text-section-dark-foreground/50 text-sm">{content.stat_3_label}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};