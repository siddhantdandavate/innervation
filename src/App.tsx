import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import WebDevelopment from "./pages/services/WebDevelopment";
import MobileDevelopment from "./pages/services/MobileDevelopment";
import Support from "./pages/services/Support";
import ProjectManagement from "./pages/services/ProjectManagement";
import Consulting from "./pages/services/Consulting";
import SocialMedia from "./pages/services/SocialMedia";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/web-development" element={<WebDevelopment />} />
            <Route path="/services/mobile-development" element={<MobileDevelopment />} />
            <Route path="/services/support" element={<Support />} />
            <Route path="/services/project-management" element={<ProjectManagement />} />
            <Route path="/services/consulting" element={<Consulting />} />
            <Route path="/services/social-media" element={<SocialMedia />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
