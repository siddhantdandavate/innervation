import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Share2 } from "lucide-react";

const SocialMedia = () => (
  <ServicePageTemplate
    badge="Social Media Marketing"
    title="Grow Your Brand's Digital Presence"
    description="Targeted social media strategies to increase engagement and drive conversions."
    icon={<Share2 className="w-6 h-6 text-[hsl(72,100%,50%)]" />}
    challenges={[
      { title: "Low Engagement", description: "Posts don't get likes or shares." },
      { title: "No Strategy", description: "Posting without a clear plan." },
      { title: "Time Consuming", description: "Social media takes too much effort." },
      { title: "Poor ROI", description: "Spending without seeing results." },
    ]}
    approach={[
      { title: "Audit", description: "Review current social presence." },
      { title: "Strategy", description: "Create content and posting plan." },
      { title: "Execution", description: "Produce and publish engaging content." },
      { title: "Optimize", description: "Analyze metrics and improve results." },
    ]}
    benefits={[
      "Increased brand awareness",
      "Higher engagement rates",
      "Consistent posting schedule",
      "Professional content creation",
      "Analytics and reporting",
      "Community management",
    ]}
    technologies={["Facebook", "Instagram", "LinkedIn", "Twitter", "TikTok", "Meta Ads"]}
    industries={["E-Commerce", "Hospitality", "Real Estate", "Healthcare", "Education"]}
    ctaText="Boost Your Social"
  />
);

export default SocialMedia;
