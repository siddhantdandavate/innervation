import { useCMSContentWithFallback } from "@/hooks/use-cms";

const fallback = {
  stat_1_value: "100+",
  stat_1_label: "Satisfied Clients",
  stat_2_value: "150+",
  stat_2_label: "Projects Delivered",
  stat_3_value: "500+",
  stat_3_label: "Tech Solutions Built",
  stat_4_value: "25+",
  stat_4_label: "Industry Experts",
};

export const StatsSection = () => {
  const { content } = useCMSContentWithFallback("stats", fallback);

  const stats = [
    { value: content.stat_1_value, label: content.stat_1_label },
    { value: content.stat_2_value, label: content.stat_2_label },
    { value: content.stat_3_value, label: content.stat_3_label },
    { value: content.stat_4_value, label: content.stat_4_label },
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
