import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Settings } from "lucide-react";

const ManagedServices = () => (
  <ServicePageTemplate
    badge="Managed IT Services"
    title="Focus on Business While We Handle IT"
    description="Comprehensive IT management and support to ensure your technology infrastructure operates at peak performance around the clock."
    icon={<Settings className="w-6 h-6 text-accent" />}
    challenges={[
      { title: "Unplanned Downtime", description: "System outages disrupting business operations and revenue." },
      { title: "Security Threats", description: "Growing cyber threats requiring constant vigilance." },
      { title: "IT Staff Burnout", description: "Small teams overwhelmed by operational demands." },
      { title: "Reactive Firefighting", description: "Constant crisis mode instead of strategic improvement." },
      { title: "Rising IT Costs", description: "Unpredictable expenses from incidents and emergencies." },
      { title: "Compliance Burden", description: "Difficulty maintaining security and regulatory compliance." },
    ]}
    approach={[
      { title: "Assessment & Onboarding", description: "Comprehensive audit of IT environment and documentation." },
      { title: "Monitoring Setup", description: "Deploy 24/7 monitoring with proactive alerting and response." },
      { title: "Ongoing Management", description: "Continuous maintenance, patching, and optimization." },
      { title: "Strategic Partnership", description: "Regular reviews and recommendations for improvement." },
    ]}
    benefits={[
      "99.9% uptime SLA guarantee",
      "24/7 monitoring and rapid incident response",
      "Predictable monthly IT costs",
      "Proactive security and compliance management",
      "Free up internal IT for strategic initiatives",
      "Access to deep technical expertise on demand",
    ]}
    technologies={["Azure", "AWS", "VMware", "Microsoft 365", "Cisco", "Fortinet", "ServiceNow"]}
    industries={["SMB", "Enterprise", "Healthcare", "Legal", "Financial Services"]}
    ctaText="Get Managed Support"
  />
);

export default ManagedServices;
