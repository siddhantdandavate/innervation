import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { AgileDelivery } from "@/components/home/AgileDelivery";
import { MVPSection } from "@/components/home/MVPSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ClientsSection } from "@/components/home/ClientsSection";
import { MutualGoals } from "@/components/home/MutualGoals";
import CustomerReviews from "@/components/home/CustomerReviews";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesOverview />
      <AgileDelivery />
      <MVPSection />
      <StatsSection />
      <ClientsSection />
      <MutualGoals />
      <CustomerReviews />
      <CTASection />
    </Layout>
  );
};

export default Index;
