import { CheckCircle } from "lucide-react";

const deliverables = [
  "Architectural Design",
  "Development of the MVP/Prototype", 
  "Early Validation",
  "Security & DevOps Readiness",
];

export const MVPSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="text-muted-foreground text-sm uppercase tracking-wider">
              Launch Fast
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-2 mb-6">
              Idea to Minimum Viable Product (MVP) in{" "}
              <span className="text-[hsl(72,100%,50%)]">100 days</span>
            </h2>
            
            {/* Deliverables */}
            <div className="space-y-4 mb-8">
              <h4 className="font-semibold text-foreground">Deliverables</h4>
              {deliverables.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[hsl(72,100%,50%)] flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative">
            <div 
              className="aspect-[4/3] rounded-2xl bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80')`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
