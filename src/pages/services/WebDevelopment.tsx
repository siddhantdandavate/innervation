import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Globe } from "lucide-react";

const WebDevelopment = () => (
  <ServicePageTemplate
    badge="Website Development"
    title="High-Performance Websites for Your Brand"
    description="We build stunning, fast, and responsive websites that drive results and leave lasting impressions."
    icon={<Globe className="w-6 h-6 text-[hsl(72,100%,50%)]" />}
    challenges={[
      { title: "Outdated Design", description: "Your website looks dated and doesn't reflect your brand." },
      { title: "Slow Performance", description: "Pages load slowly, hurting user experience and SEO." },
      { title: "Not Mobile-Friendly", description: "Poor experience on phones and tablets." },
      { title: "Low Conversions", description: "Visitors don't become customers." },
    ]}
    approach={[
      { title: "Discovery", description: "We understand your business goals and target audience." },
      { title: "Design", description: "Create modern, conversion-focused designs." },
      { title: "Development", description: "Build with latest technologies for speed and security." },
      { title: "Launch", description: "Deploy and optimize for search engines." },
    ]}
    benefits={[
      "Modern, professional design",
      "Fast loading speeds",
      "Mobile-first responsive layouts",
      "SEO optimized structure",
      "Easy content management",
      "Ongoing support available",
    ]}
    technologies={["React", "Next.js", "WordPress", "Shopify", "Tailwind CSS", "Node.js"]}
    industries={["E-Commerce", "Corporate", "Startups", "Healthcare", "Education"]}
    ctaText="Start Your Project"
  />
);

export default WebDevelopment;
