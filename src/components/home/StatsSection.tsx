const stats = [
  { value: "100+", label: "Satisfied Clients" },
  { value: "150+", label: "Projects Delivered" },
  { value: "500+", label: "Tech Solutions Built" },
  { value: "25+", label: "Industry Experts" },
];

export const StatsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-section-dark">
      <div className="container-narrow">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-accent mb-2">
                {stat.value}
              </div>
              <div className="text-section-dark-foreground/60 text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
