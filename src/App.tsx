import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { CMSProvider } from "@/hooks/use-cms";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import WebDevelopment from "./pages/services/WebDevelopment";
import MobileDevelopment from "./pages/services/MobileDevelopment";
import Support from "./pages/services/Support";
import ProjectManagement from "./pages/services/ProjectManagement";
import Consulting from "./pages/services/Consulting";
import SocialMedia from "./pages/services/SocialMedia";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminContent from "./pages/admin/AdminContent";
import AdminTheme from "./pages/admin/AdminTheme";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminHistory from "./pages/admin/AdminHistory";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <CMSProvider>
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
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/content" element={<AdminContent />} />
              <Route path="/admin/theme" element={<AdminTheme />} />
              <Route path="/admin/blogs" element={<AdminBlogs />} />
              <Route path="/admin/history" element={<AdminHistory />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CMSProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
