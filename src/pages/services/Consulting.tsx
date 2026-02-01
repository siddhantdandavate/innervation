import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { MessageSquare } from "lucide-react";

const Consulting = () => (
  <ServicePageTemplate
    badge="IT Consulting"
    title="Expert Guidance for Your Digital Journey"
    description="Strategic IT consulting to drive innovation and accelerate business growth."
    icon={<MessageSquare className="w-6 h-6 text-[hsl(72,100%,50%)]" />}
    challenges={[
      { title: "Digital Strategy", description: "Unclear technology roadmap." },
      { title: "Legacy Systems", description: "Outdated infrastructure holding you back." },
      { title: "Integration Issues", description: "Systems don't work well together." },
      { title: "Security Gaps", description: "Uncertain about compliance and security." },
    ]}
    approach={[
      { title: "Assessment", description: "Analyze current state and challenges." },
      { title: "Strategy", description: "Define roadmap and recommendations." },
      { title: "Implementation", description: "Guide execution of improvements." },
      { title: "Review", description: "Measure outcomes and refine approach." },
    ]}
    benefits={[
      "Clear technology roadmap",
      "Cost optimization",
      "Risk reduction",
      "Vendor-neutral advice",
      "Industry best practices",
      "Measurable outcomes",
    ]}
    technologies={["Cloud Strategy", "Digital Transformation", "Data Analytics", "Security", "AI/ML"]}
    industries={["Enterprise", "Startups", "Government", "Healthcare", "Finance"]}
    ctaText="Get Expert Advice"
  />
);

export default Consulting;
