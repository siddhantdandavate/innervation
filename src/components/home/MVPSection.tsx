import { CheckCircle } from "lucide-react";

const deliverables = [
  "Architectural Design",
  "Development of the MVP/Prototype", 
  "Early Validation",
  "Security & DevOps Readiness",
];

export const MVPSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <span className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">
              Launch Fast
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3 mb-6">
              Idea to Minimum Viable Product (MVP) in{" "}
              <span className="text-accent">100 days</span>
            </h2>
            
            {/* Deliverables */}
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

          {/* Right - Visual */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5 border border-border">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80')`,
                }}
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-5 shadow-xl">
              <div className="text-3xl font-heading font-bold text-accent">100</div>
              <div className="text-muted-foreground text-sm">Days to MVP</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
