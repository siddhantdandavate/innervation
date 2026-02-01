import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { FolderKanban } from "lucide-react";

const ProjectManagement = () => (
  <ServicePageTemplate
    badge="Project Management"
    title="Delivering Projects On Time, Every Time"
    description="Goal-oriented project management ensuring efficient delivery of tailored solutions."
    icon={<FolderKanban className="w-6 h-6 text-[hsl(72,100%,50%)]" />}
    challenges={[
      { title: "Missed Deadlines", description: "Projects running over time and budget." },
      { title: "Poor Communication", description: "Stakeholders out of the loop." },
      { title: "Scope Creep", description: "Requirements constantly changing." },
      { title: "Resource Allocation", description: "Wrong skills on wrong tasks." },
    ]}
    approach={[
      { title: "Planning", description: "Define scope, timeline, and milestones." },
      { title: "Execution", description: "Agile sprints with regular check-ins." },
      { title: "Monitoring", description: "Track progress and address risks." },
      { title: "Delivery", description: "Launch on time with quality assurance." },
    ]}
    benefits={[
      "On-time delivery",
      "Transparent communication",
      "Agile methodology",
      "Risk management",
      "Budget control",
      "Quality assurance",
    ]}
    technologies={["Jira", "Trello", "Asana", "Monday.com", "Slack", "Microsoft Teams"]}
    industries={["Technology", "Finance", "Healthcare", "Retail", "Manufacturing"]}
    ctaText="Start Your Project"
  />
);

export default ProjectManagement;
