import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";

// Critical route - loaded eagerly
import Index from "./pages/Index";

// Lazy-loaded routes for performance
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const WebDevelopment = lazy(() => import("./pages/services/WebDevelopment"));
const MobileDevelopment = lazy(() => import("./pages/services/MobileDevelopment"));
const Support = lazy(() => import("./pages/services/Support"));
const ProjectManagement = lazy(() => import("./pages/services/ProjectManagement"));
const Consulting = lazy(() => import("./pages/services/Consulting"));
const SocialMedia = lazy(() => import("./pages/services/SocialMedia"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <ThemeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
