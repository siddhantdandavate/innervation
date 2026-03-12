import { CheckCircle } from "lucide-react";
import { useCMSContentWithFallback } from "@/hooks/use-cms";

const fallback = {
  section_label: "Launch Fast",
  title: "Idea to Minimum Viable Product (MVP) in",
  title_highlight: "100 days",
  deliverable_1: "Architectural Design",
  deliverable_2: "Development of the MVP/Prototype",
  deliverable_3: "Early Validation",
  deliverable_4: "Security & DevOps Readiness",
  floating_value: "100",
  floating_label: "Days to MVP",
};

export const MVPSection = () => {
  const { content } = useCMSContentWithFallback("mvp", fallback);

  const deliverables = [content.deliverable_1, content.deliverable_2, content.deliverable_3, content.deliverable_4];

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">{content.section_label}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3 mb-6">
              {content.title}{" "}
              <span className="text-accent">{content.title_highlight}</span>
            </h2>
            <div className="space-y-4 mb-8">
              <h4 className="font-semibold text-foreground text-lg">Deliverables</h4>
              {deliverables.map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-muted-foreground text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5 border border-border">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80')` }} />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-5 shadow-xl">
              <div className="text-3xl font-heading font-bold text-accent">{content.floating_value}</div>
              <div className="text-muted-foreground text-sm">{content.floating_label}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
