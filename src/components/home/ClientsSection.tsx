export const ClientsSection = () => {
  // Placeholder client names - replace with actual logos when available
  const clients = [
    "TechCorp", "DataSoft", "CloudNet", "InnoSys", 
    "DigiMax", "SmartFlow", "NexGen", "ProTech"
  ];

  return (
    <section className="py-16 bg-muted/30 border-y border-border">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-muted-foreground text-sm uppercase tracking-wider">
            Case Studies
          </span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mt-2">
            Some Of Our Esteemed Clients
          </h2>
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
          {clients.map((client) => (
            <div 
              key={client}
              className="flex items-center justify-center h-16 px-4 rounded-lg bg-background border border-border hover:border-[hsl(72,100%,50%)]/30 transition-colors"
            >
              <span className="text-muted-foreground font-medium text-sm">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
