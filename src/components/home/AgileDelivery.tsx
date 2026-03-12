import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useCMSContentWithFallback } from "@/hooks/use-cms";

const fallback = {
  section_label: "Our Approach",
  title: "Agile Delivery Mindset",
  description: "We deliver projects with speed and precision using modern agile methodologies that ensure transparency and rapid iteration.",
  cta_text: "Read More",
  cta_link: "/services",
  right_label: "Success Stories",
  right_title: "Our successful Digital Transformation stories",
  right_cta_text: "Read More",
  right_cta_link: "/about",
};

export const AgileDelivery = () => {
  const { content } = useCMSContentWithFallback("agile_delivery", fallback);

  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="bg-section-dark text-section-dark-foreground p-12 lg:p-20 flex flex-col justify-center min-h-[450px]">
          <span className="text-accent text-sm font-semibold uppercase tracking-wider mb-4">{content.section_label}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight">{content.title}</h2>
          <p className="text-section-dark-foreground/70 text-lg mb-8 max-w-md leading-relaxed">{content.description}</p>
          <Link to={content.cta_link} className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all group">
            {content.cta_text}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="relative min-h-[450px] bg-accent">
          <div className="absolute inset-0 flex flex-col justify-center p-12 lg:p-20">
            <span className="text-accent-foreground/70 text-sm font-semibold uppercase tracking-wider mb-4">{content.right_label}</span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-accent-foreground mb-6 leading-tight">{content.right_title}</h3>
            <Link to={content.right_cta_link} className="inline-flex items-center gap-2 text-accent-foreground font-semibold hover:gap-3 transition-all group">
              {content.right_cta_text}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
