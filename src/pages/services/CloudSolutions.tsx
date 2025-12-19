import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Cloud } from "lucide-react";

const CloudSolutions = () => (
  <ServicePageTemplate
    badge="Cloud & SaaS Solutions"
    title="Accelerate Growth with Cloud-First Architecture"
    description="Design, migrate, and optimize cloud infrastructure for scalability, security, and cost-effectiveness across leading platforms."
    icon={<Cloud className="w-6 h-6 text-accent" />}
    challenges={[
      { title: "Infrastructure Limitations", description: "On-premise systems limiting scalability and innovation." },
      { title: "Rising IT Costs", description: "Unpredictable infrastructure costs impacting budgets." },
      { title: "Security Concerns", description: "Uncertainty about cloud security and compliance." },
      { title: "Migration Complexity", description: "Complex dependencies making cloud migration risky." },
      { title: "Multi-Cloud Chaos", description: "Managing multiple cloud providers without unified strategy." },
      { title: "Skills Gap", description: "Lack of in-house cloud expertise for optimization." },
    ]}
    approach={[
      { title: "Cloud Assessment", description: "Evaluate workloads, dependencies, and readiness for cloud migration." },
      { title: "Architecture Design", description: "Design secure, scalable cloud architecture aligned with business needs." },
      { title: "Migration Execution", description: "Execute migrations with minimal disruption using proven methodologies." },
      { title: "Optimization & FinOps", description: "Continuously optimize performance and costs post-migration." },
    ]}
    benefits={[
      "Reduced infrastructure costs by 30-50%",
      "Improved scalability and business agility",
      "Enhanced security and compliance posture",
      "Faster time-to-market for new initiatives",
      "24/7 availability and disaster recovery",
      "Access to cutting-edge cloud services",
    ]}
    technologies={["AWS", "Microsoft Azure", "Google Cloud", "Kubernetes", "Docker", "Terraform", "CloudFormation"]}
    industries={["Enterprise", "Startups", "Healthcare", "Financial Services", "E-Commerce"]}
    ctaText="Start Cloud Journey"
  />
);

export default CloudSolutions;
