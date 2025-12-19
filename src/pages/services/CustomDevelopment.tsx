import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Code } from "lucide-react";

const CustomDevelopment = () => (
  <ServicePageTemplate
    badge="Custom Software Development"
    title="Build Software That Fits Your Business Perfectly"
    description="Develop tailored software applications that address your unique business requirements using modern technologies and agile methodologies."
    icon={<Code className="w-6 h-6 text-accent" />}
    challenges={[
      { title: "Off-the-Shelf Limitations", description: "Commercial software that doesn't fit unique business processes." },
      { title: "Integration Nightmares", description: "Disconnected systems requiring manual data transfer." },
      { title: "Scalability Concerns", description: "Applications that can't grow with business demands." },
      { title: "Technical Debt", description: "Legacy code making changes slow and risky." },
      { title: "User Adoption Issues", description: "Poor UX leading to low productivity and workarounds." },
      { title: "Vendor Lock-in", description: "Dependency on vendors with limited flexibility." },
    ]}
    approach={[
      { title: "Discovery & Planning", description: "Deep dive into requirements, user needs, and technical constraints." },
      { title: "Architecture & Design", description: "Design scalable, maintainable architecture with modern patterns." },
      { title: "Agile Development", description: "Iterative development with continuous feedback and delivery." },
      { title: "Quality & Deployment", description: "Rigorous testing, CI/CD implementation, and smooth go-live." },
    ]}
    benefits={[
      "Software tailored exactly to your business needs",
      "Seamless integration with existing systems",
      "Scalable architecture that grows with you",
      "Modern, intuitive user experiences",
      "Full ownership and control of your software",
      "Ongoing support and enhancement options",
    ]}
    technologies={["React", "Node.js", ".NET", "Python", "TypeScript", "PostgreSQL", "MongoDB", "GraphQL"]}
    industries={["All Industries", "Startups", "Enterprise", "Healthcare", "Fintech"]}
    ctaText="Build Your Solution"
  />
);

export default CustomDevelopment;
