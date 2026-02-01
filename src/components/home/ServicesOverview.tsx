import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: "deeptech",
    title: "Deep Tech",
    description: "AI, ML, and cutting-edge technology solutions",
  },
  {
    id: "data",
    title: "Data Management",
    description: "Analytics, insights, and data-driven decisions",
  },
  {
    id: "development",
    title: "Development",
    description: "Web, mobile, and custom software",
  },
  {
    id: "devops",
    title: "DevOps & Testing",
    description: "CI/CD, automation, and quality assurance",
  },
  {
    id: "consulting",
    title: "Digital Consulting",
    description: "Strategy and transformation roadmaps",
  },
];

export const ServicesOverview = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-muted-foreground text-sm uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">
            5D Services
          </h2>
        </div>

        {/* Services Visual Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Circular Diagram */}
          <div className="relative flex justify-center items-center">
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              {/* Center Circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[hsl(200,100%,50%)] via-[hsl(280,100%,60%)] to-[hsl(320,100%,50%)] flex items-center justify-center">
                  <span className="text-4xl font-heading font-bold text-white">5D</span>
                </div>
              </div>
              
              {/* Orbiting Service Pills */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
                <span className="px-4 py-2 bg-[hsl(72,100%,50%)] text-[hsl(220,20%,10%)] rounded-full text-sm font-medium whitespace-nowrap">
                  Deep Tech
                </span>
              </div>
              <div className="absolute top-1/4 right-0 translate-x-4">
                <span className="px-4 py-2 bg-[hsl(280,70%,50%)] text-white rounded-full text-sm font-medium whitespace-nowrap">
                  DevOps & Testing
                </span>
              </div>
              <div className="absolute bottom-1/4 right-0 translate-x-2">
                <span className="px-4 py-2 bg-[hsl(200,100%,50%)] text-white rounded-full text-sm font-medium whitespace-nowrap">
                  Development
                </span>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2">
                <span className="px-4 py-2 bg-[hsl(320,70%,50%)] text-white rounded-full text-sm font-medium whitespace-nowrap">
                  Digital Consulting
                </span>
              </div>
              <div className="absolute top-1/4 left-0 -translate-x-4">
                <span className="px-4 py-2 bg-[hsl(160,70%,45%)] text-white rounded-full text-sm font-medium whitespace-nowrap">
                  Data Management
                </span>
              </div>
            </div>
          </div>

          {/* Right - Service Details */}
          <div className="space-y-6">
            {services.map((service) => (
              <div 
                key={service.id}
                className="group flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full bg-[hsl(72,100%,50%)] mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-semibold text-foreground group-hover:text-[hsl(72,100%,50%)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 text-[hsl(72,100%,50%)] font-medium hover:gap-3 transition-all mt-4"
            >
              View All Services
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
