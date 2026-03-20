import { content } from "@/data/content";

export const StatsSection = () => {
  const data = content.stats;

  const stats = [
    { value: data.stat_1_value, label: data.stat_1_label },
    { value: data.stat_2_value, label: data.stat_2_label },
    { value: data.stat_3_value, label: data.stat_3_label },
    { value: data.stat_4_value, label: data.stat_4_label },
  ];

  return (
    <section className="py-20 lg:py-28 bg-section-dark">
      <div className="container-narrow">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center" style={{ animationDelay: `${index * 100}ms` }}>
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
