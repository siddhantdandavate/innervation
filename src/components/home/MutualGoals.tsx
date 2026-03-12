import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { useCMSContentWithFallback } from "@/hooks/use-cms";

const fallback = {
  title: "We help to achieve mutual goals",
  quote: "Innervation IT Solutions has a platform that simplifies our strategies and gives us actionable results. We've achieved 2X growth in our first year of partnering with them.",
  author_name: "Saurabh Patwari",
  author_role: "Founder & CEO, Innervation IT Solutions",
  cta_text: "Learn More",
  cta_link: "/about",
};

export const MutualGoals = () => {
  const { content } = useCMSContentWithFallback("mutual_goals", fallback);

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="bg-muted/50 rounded-3xl p-8 lg:p-12 border border-border">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
              <Quote className="w-7 h-7 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">{content.title}</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed text-lg">"{content.quote}"</p>
            <div className="mb-8">
              <div className="font-semibold text-foreground text-lg">{content.author_name}</div>
              <div className="text-muted-foreground">{content.author_role}</div>
            </div>
            <Link to={content.cta_link} className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all group">
              {content.cta_text}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80')` }} />
            <div className="absolute -z-10 inset-4 rounded-3xl bg-accent/20" />
          </div>
        </div>
      </div>
    </section>
  );
};
