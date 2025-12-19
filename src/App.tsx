import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import DigitalTransformation from "./pages/services/DigitalTransformation";
import AIAutomation from "./pages/services/AIAutomation";
import CloudSolutions from "./pages/services/CloudSolutions";
import DataEngineering from "./pages/services/DataEngineering";
import CustomDevelopment from "./pages/services/CustomDevelopment";
import ManagedServices from "./pages/services/ManagedServices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/digital-transformation" element={<DigitalTransformation />} />
          <Route path="/services/ai-automation" element={<AIAutomation />} />
          <Route path="/services/cloud-solutions" element={<CloudSolutions />} />
          <Route path="/services/data-engineering" element={<DataEngineering />} />
          <Route path="/services/custom-development" element={<CustomDevelopment />} />
          <Route path="/services/managed-services" element={<ManagedServices />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
