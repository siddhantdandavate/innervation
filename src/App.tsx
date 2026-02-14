import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { CMSProvider } from "@/hooks/use-cms";

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

// Admin pages - lazy loaded
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminContent = lazy(() => import("./pages/admin/AdminContent"));
const AdminTheme = lazy(() => import("./pages/admin/AdminTheme"));
const AdminBlogs = lazy(() => import("./pages/admin/AdminBlogs"));
const AdminHistory = lazy(() => import("./pages/admin/AdminHistory"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

const queryClient = new QueryClient();

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <CMSProvider>
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
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </CMSProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
