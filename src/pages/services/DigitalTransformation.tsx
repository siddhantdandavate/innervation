import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Layers } from "lucide-react";

const DigitalTransformation = () => (
  <ServicePageTemplate
    badge="Digital Transformation & IT Consulting"
    title="Modernize Your Enterprise for the Digital Age"
    description="Navigate complex digital transformation with strategic guidance from experienced technology consultants who understand both technology and business."
    icon={<Layers className="w-6 h-6 text-accent" />}
    challenges={[
      { title: "Legacy System Burden", description: "Outdated systems slow innovation and increase operational costs." },
      { title: "Disconnected Processes", description: "Siloed operations create inefficiencies and poor customer experiences." },
      { title: "Technology Uncertainty", description: "Difficulty choosing the right technologies for business needs." },
      { title: "Change Resistance", description: "Organizational resistance to new systems and processes." },
      { title: "Lack of Roadmap", description: "No clear path from current state to digital maturity." },
      { title: "Security Concerns", description: "Balancing innovation with security and compliance requirements." },
    ]}
    approach={[
      { title: "Assessment & Discovery", description: "Comprehensive analysis of current technology landscape, business processes, and organizational readiness." },
      { title: "Strategy Development", description: "Create a prioritized roadmap aligned with business goals and resource constraints." },
      { title: "Architecture Design", description: "Design scalable, secure solutions that integrate with existing investments." },
      { title: "Implementation Planning", description: "Detailed execution plans with clear milestones and success metrics." },
    ]}
    benefits={[
      "Clear technology roadmap aligned with business strategy",
      "Reduced operational costs through process optimization",
      "Improved customer and employee experiences",
      "Increased agility and speed to market",
      "Future-proof architecture that scales with growth",
      "Change management support for smooth adoption",
    ]}
    technologies={["Azure", "AWS", "Salesforce", "SAP", "ServiceNow", "Power Platform"]}
    industries={["Financial Services", "Healthcare", "Manufacturing", "Retail", "Public Sector"]}
    ctaText="Schedule a Strategy Call"
  />
);

export default DigitalTransformation;
