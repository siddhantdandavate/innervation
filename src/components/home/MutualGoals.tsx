import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { content } from "@/data/content";

export const MutualGoals = () => {
  const data = content.mutual_goals;

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="bg-muted/50 rounded-3xl p-8 lg:p-12 border border-border">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
              <Quote className="w-7 h-7 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">{data.title}</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed text-lg">"{data.quote}"</p>
            <div className="mb-8">
              <div className="font-semibold text-foreground text-lg">{data.author_name}</div>
              <div className="text-muted-foreground">{data.author_role}</div>
            </div>
            <Link to={data.cta_link} className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all group">
              {data.cta_text}
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
