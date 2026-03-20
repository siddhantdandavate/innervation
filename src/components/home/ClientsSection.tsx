import { content } from "@/data/content";

export const ClientsSection = () => {
  const data = content.clients;

  const clients = [
    data.client_1, data.client_2, data.client_3, data.client_4,
    data.client_5, data.client_6, data.client_7, data.client_8,
  ].filter(Boolean);

  return (
    <section className="py-16 lg:py-20 bg-muted/50 border-y border-border">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <span className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">{data.section_label}</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mt-2">{data.title}</h2>
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
