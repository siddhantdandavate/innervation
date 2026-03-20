import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { content } from "@/data/content";

export const AgileDelivery = () => {
  const data = content.agile_delivery;

  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="bg-section-dark text-section-dark-foreground p-12 lg:p-20 flex flex-col justify-center min-h-[450px]">
          <span className="text-accent text-sm font-semibold uppercase tracking-wider mb-4">{data.section_label}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight">{data.title}</h2>
          <p className="text-section-dark-foreground/70 text-lg mb-8 max-w-md leading-relaxed">{data.description}</p>
          <Link to={data.cta_link} className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all group">
            {data.cta_text}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="relative min-h-[450px] bg-accent">
          <div className="absolute inset-0 flex flex-col justify-center p-12 lg:p-20">
            <span className="text-accent-foreground/70 text-sm font-semibold uppercase tracking-wider mb-4">{data.right_label}</span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-accent-foreground mb-6 leading-tight">{data.right_title}</h3>
            <Link to={data.right_cta_link} className="inline-flex items-center gap-2 text-accent-foreground font-semibold hover:gap-3 transition-all group">
              {data.right_cta_text}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
