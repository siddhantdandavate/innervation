const technologies = {
  cloud: ["AWS", "Microsoft Azure", "Google Cloud", "Kubernetes", "Docker"],
  data: ["Apache Spark", "Snowflake", "Databricks", "Power BI", "Tableau"],
  ai: ["TensorFlow", "PyTorch", "OpenAI", "LangChain", "MLflow"],
  development: ["React", "Node.js", ".NET", "Python", "Java"],
};

export const TechExpertise = () => {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
            Technology Stack
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
            Built on Industry-Leading Technologies
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            We leverage the most powerful and reliable technologies to build solutions that scale, perform, and evolve with your business needs.
          </p>
        </div>

        {/* Technology Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-accent text-lg">Cloud Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.cloud.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-lg bg-primary-foreground/10 text-primary-foreground/90 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-accent text-lg">Data & Analytics</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.data.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-lg bg-primary-foreground/10 text-primary-foreground/90 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-accent text-lg">AI & Machine Learning</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.ai.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-lg bg-primary-foreground/10 text-primary-foreground/90 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-accent text-lg">Development</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.development.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-lg bg-primary-foreground/10 text-primary-foreground/90 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
