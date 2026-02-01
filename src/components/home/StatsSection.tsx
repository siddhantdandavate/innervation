const stats = [
  { value: "100+", label: "Satisfied Clients" },
  { value: "150+", label: "Projects Delivered" },
  { value: "500+", label: "Tech Solutions Built" },
  { value: "25+", label: "Industry Experts" },
];

export const StatsSection = () => {
  return (
    <section className="py-20 bg-[hsl(220,30%,8%)]">
      <div className="container-narrow">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[hsl(72,100%,50%)] mb-2">
                {stat.value}
              </div>
              <div className="text-white/70 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
