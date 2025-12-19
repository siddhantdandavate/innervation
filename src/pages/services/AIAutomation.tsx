import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Brain } from "lucide-react";

const AIAutomation = () => (
  <ServicePageTemplate
    badge="AI & Intelligent Automation"
    title="Harness AI to Automate and Innovate"
    description="Leverage artificial intelligence and machine learning to automate workflows, enhance decision-making, and unlock new business opportunities."
    icon={<Brain className="w-6 h-6 text-accent" />}
    challenges={[
      { title: "Manual Process Overload", description: "Repetitive tasks consuming valuable human resources." },
      { title: "Data Silos", description: "Valuable insights trapped in disconnected systems." },
      { title: "Scaling Limitations", description: "Inability to scale operations without proportional cost increases." },
      { title: "Decision Latency", description: "Slow decision-making due to lack of real-time insights." },
      { title: "Customer Experience Gaps", description: "Inconsistent, impersonal customer interactions." },
      { title: "Compliance Complexity", description: "Difficulty maintaining compliance at scale." },
    ]}
    approach={[
      { title: "Opportunity Assessment", description: "Identify high-impact automation candidates through process analysis and ROI modeling." },
      { title: "Solution Design", description: "Design AI solutions with appropriate guardrails and human-in-the-loop controls." },
      { title: "Model Development", description: "Build, train, and validate models using your data and industry best practices." },
      { title: "Deployment & Monitoring", description: "Deploy solutions with continuous monitoring and improvement loops." },
    ]}
    benefits={[
      "Up to 85% reduction in manual processing time",
      "Improved accuracy and consistency in operations",
      "24/7 automated customer service capabilities",
      "Data-driven insights for strategic decisions",
      "Scalable operations without linear cost growth",
      "Competitive advantage through AI innovation",
    ]}
    technologies={["OpenAI", "Azure AI", "TensorFlow", "PyTorch", "LangChain", "UiPath", "Power Automate"]}
    industries={["Financial Services", "Healthcare", "Insurance", "Manufacturing", "Retail"]}
    ctaText="Talk to AI Experts"
  />
);

export default AIAutomation;
