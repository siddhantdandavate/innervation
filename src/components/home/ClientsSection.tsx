import { useCMSContentWithFallback } from "@/hooks/use-cms";

const fallback = {
  section_label: "Trusted By",
  title: "Some Of Our Esteemed Clients",
  client_1: "TechCorp",
  client_2: "DataSoft",
  client_3: "CloudNet",
  client_4: "InnoSys",
  client_5: "DigiMax",
  client_6: "SmartFlow",
  client_7: "NexGen",
  client_8: "ProTech",
};

export const ClientsSection = () => {
  const { content } = useCMSContentWithFallback("clients", fallback);

  const clients = [
    content.client_1, content.client_2, content.client_3, content.client_4,
    content.client_5, content.client_6, content.client_7, content.client_8,
  ].filter(Boolean);

  return (
    <section className="py-16 lg:py-20 bg-muted/50 border-y border-border">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <span className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">{content.section_label}</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mt-2">{content.title}</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
          {clients.map((client) => (
            <div key={client} className="flex items-center justify-center h-16 px-4 rounded-xl bg-background border border-border hover:border-accent/30 hover:shadow-md transition-all duration-300">
              <span className="text-muted-foreground font-semibold text-sm">{client}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
