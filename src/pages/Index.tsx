import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { TechExpertise } from "@/components/home/TechExpertise";
import CustomerReviews from "@/components/home/CustomerReviews";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesOverview />
      <WhyChooseUs />
      <IndustriesSection />
      <TechExpertise />
      <CustomerReviews />
      <CTASection />
    </Layout>
  );
};

export default Index;