import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { HeadphonesIcon } from "lucide-react";

const Support = () => (
  <ServicePageTemplate
    badge="Continuous Support"
    title="Reliable IT Support When You Need It"
    description="24/7 maintenance and support to keep your systems running smoothly."
    icon={<HeadphonesIcon className="w-6 h-6 text-[hsl(72,100%,50%)]" />}
    challenges={[
      { title: "System Downtime", description: "Unexpected outages affecting business." },
      { title: "Security Concerns", description: "Staying protected against threats." },
      { title: "Slow Response", description: "Issues take too long to resolve." },
      { title: "Resource Constraints", description: "Limited in-house IT capacity." },
    ]}
    approach={[
      { title: "Assessment", description: "Audit your current infrastructure." },
      { title: "Monitoring", description: "Set up 24/7 proactive monitoring." },
      { title: "Support", description: "Rapid response to any issues." },
      { title: "Optimization", description: "Continuous improvement and updates." },
    ]}
    benefits={[
      "24/7 availability",
      "Proactive monitoring",
      "Fast issue resolution",
      "Regular updates and patches",
      "Dedicated support team",
      "Predictable costs",
    ]}
    technologies={["Azure", "AWS", "Linux", "Windows Server", "Docker", "Kubernetes"]}
    industries={["SMB", "Enterprise", "Healthcare", "Legal", "Finance"]}
    ctaText="Get Support"
  />
);

export default Support;
