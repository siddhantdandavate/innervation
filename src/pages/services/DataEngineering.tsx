import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Database } from "lucide-react";

const DataEngineering = () => (
  <ServicePageTemplate
    badge="Data Engineering & Analytics"
    title="Transform Data into Strategic Advantage"
    description="Build robust data pipelines and analytics solutions that transform raw data into actionable business intelligence."
    icon={<Database className="w-6 h-6 text-accent" />}
    challenges={[
      { title: "Data Quality Issues", description: "Inconsistent, incomplete, or inaccurate data undermining decisions." },
      { title: "Siloed Information", description: "Critical data trapped in disconnected systems and departments." },
      { title: "Reporting Delays", description: "Days or weeks to generate business-critical reports." },
      { title: "Scalability Limits", description: "Data infrastructure unable to handle growing volumes." },
      { title: "Compliance Risks", description: "Difficulty maintaining data governance and regulatory compliance." },
      { title: "Lack of Self-Service", description: "Business users dependent on IT for every data request." },
    ]}
    approach={[
      { title: "Data Assessment", description: "Audit existing data assets, quality, and infrastructure capabilities." },
      { title: "Architecture Design", description: "Design modern data architecture with warehouse, lake, or lakehouse patterns." },
      { title: "Pipeline Development", description: "Build scalable ETL/ELT pipelines for reliable data integration." },
      { title: "Analytics Enablement", description: "Deploy BI tools and train users for self-service analytics." },
    ]}
    benefits={[
      "Real-time access to business-critical insights",
      "Single source of truth across the organization",
      "Self-service analytics for business users",
      "Improved data quality and governance",
      "Predictive insights for proactive decisions",
      "Reduced time from data to insight by 80%",
    ]}
    technologies={["Snowflake", "Databricks", "Apache Spark", "dbt", "Power BI", "Tableau", "Airflow"]}
    industries={["Retail", "Financial Services", "Healthcare", "Manufacturing", "Marketing"]}
    ctaText="Unlock Data Value"
  />
);

export default DataEngineering;
