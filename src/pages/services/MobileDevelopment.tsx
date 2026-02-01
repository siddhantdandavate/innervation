import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Smartphone } from "lucide-react";

const MobileDevelopment = () => (
  <ServicePageTemplate
    badge="Mobile App Development"
    title="Apps That Engage and Deliver Results"
    description="Intuitive iOS and Android apps designed to grow your business and delight your users."
    icon={<Smartphone className="w-6 h-6 text-[hsl(72,100%,50%)]" />}
    challenges={[
      { title: "User Engagement", description: "Struggling to keep users coming back." },
      { title: "Platform Coverage", description: "Need presence on both iOS and Android." },
      { title: "Performance Issues", description: "Apps that crash or lag frustrate users." },
      { title: "App Store Visibility", description: "Hard to get discovered among millions." },
    ]}
    approach={[
      { title: "Strategy", description: "Define features and user journeys." },
      { title: "UI/UX Design", description: "Create intuitive, beautiful interfaces." },
      { title: "Development", description: "Build native or cross-platform apps." },
      { title: "Launch & Iterate", description: "Publish and improve based on feedback." },
    ]}
    benefits={[
      "Cross-platform development",
      "Native performance",
      "Intuitive user experience",
      "App store optimization",
      "Push notifications",
      "Analytics integration",
    ]}
    technologies={["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "AWS"]}
    industries={["Retail", "Healthcare", "Finance", "Entertainment", "Education"]}
    ctaText="Build Your App"
  />
);

export default MobileDevelopment;
