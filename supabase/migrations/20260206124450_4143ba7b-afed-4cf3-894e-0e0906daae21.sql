-- CMS Admin Settings (for simple password auth)
CREATE TABLE public.cms_admin_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_password_hash text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- CMS Content table for all editable text content
CREATE TABLE public.cms_content (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key text NOT NULL UNIQUE,
    content jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- CMS Theme table for color/style settings
CREATE TABLE public.cms_theme (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    theme_name text NOT NULL DEFAULT 'default',
    colors jsonb NOT NULL DEFAULT '{
        "primary": "217 91% 60%",
        "secondary": "210 40% 96%",
        "accent": "217 91% 60%",
        "background": "0 0% 100%",
        "foreground": "224 71% 4%",
        "muted": "220 14% 96%",
        "card": "0 0% 100%"
    }'::jsonb,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- CMS Blogs table
CREATE TABLE public.cms_blogs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    slug text NOT NULL UNIQUE,
    excerpt text,
    content text NOT NULL,
    featured_image text,
    is_published boolean NOT NULL DEFAULT false,
    is_deleted boolean NOT NULL DEFAULT false,
    author text DEFAULT 'Admin',
    meta_title text,
    meta_description text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    published_at timestamp with time zone
);

-- CMS History table for versioning/undo
CREATE TABLE public.cms_history (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type text NOT NULL, -- 'content', 'theme', 'blog'
    entity_id uuid NOT NULL,
    action text NOT NULL, -- 'create', 'update', 'delete', 'restore'
    previous_data jsonb,
    new_data jsonb,
    description text,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on all CMS tables
ALTER TABLE public.cms_admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_theme ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_history ENABLE ROW LEVEL SECURITY;

-- Public read access for content (frontend needs this)
CREATE POLICY "CMS content is publicly readable" 
ON public.cms_content 
FOR SELECT 
USING (true);

-- Public read access for active theme
CREATE POLICY "Active theme is publicly readable" 
ON public.cms_theme 
FOR SELECT 
USING (is_active = true);

-- Public read access for published blogs
CREATE POLICY "Published blogs are publicly readable" 
ON public.cms_blogs 
FOR SELECT 
USING (is_published = true AND is_deleted = false);

-- Create indexes for performance
CREATE INDEX idx_cms_content_section_key ON public.cms_content(section_key);
CREATE INDEX idx_cms_blogs_slug ON public.cms_blogs(slug);
CREATE INDEX idx_cms_blogs_published ON public.cms_blogs(is_published, is_deleted);
CREATE INDEX idx_cms_history_entity ON public.cms_history(entity_type, entity_id);

-- Update timestamp trigger for CMS tables
CREATE TRIGGER update_cms_content_updated_at
BEFORE UPDATE ON public.cms_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cms_theme_updated_at
BEFORE UPDATE ON public.cms_theme
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cms_blogs_updated_at
BEFORE UPDATE ON public.cms_blogs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cms_admin_settings_updated_at
BEFORE UPDATE ON public.cms_admin_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default content for all sections
INSERT INTO public.cms_content (section_key, content) VALUES
('hero', '{
    "title": "We Build Digital Solutions That Drive Growth",
    "subtitle": "Expert IT consulting, development, and support services for businesses ready to transform.",
    "cta_text": "Get Started",
    "cta_link": "/contact"
}'::jsonb),
('services', '{
    "title": "Our Services",
    "subtitle": "Comprehensive IT solutions tailored to your business needs",
    "items": []
}'::jsonb),
('about', '{
    "title": "About Us",
    "description": "We are a team of passionate IT professionals dedicated to delivering exceptional digital solutions.",
    "mission": "To empower businesses through innovative technology solutions.",
    "vision": "To be the most trusted IT partner for growing businesses."
}'::jsonb),
('contact', '{
    "email": "info@innervation.com",
    "phone": "+1 (555) 123-4567",
    "address": "123 Tech Street, Digital City, DC 12345",
    "map_link": ""
}'::jsonb),
('footer', '{
    "company_name": "Innervation IT Solutions",
    "tagline": "Transforming businesses through technology",
    "copyright": "© 2024 Innervation IT Solutions. All rights reserved.",
    "social_links": {
        "linkedin": "",
        "twitter": "",
        "facebook": ""
    }
}'::jsonb),
('stats', '{
    "items": [
        {"value": "50+", "label": "Projects Completed"},
        {"value": "30+", "label": "Happy Clients"},
        {"value": "5+", "label": "Years Experience"},
        {"value": "24/7", "label": "Support Available"}
    ]
}'::jsonb);

-- Insert default theme
INSERT INTO public.cms_theme (theme_name, colors, is_active) VALUES
('default', '{
    "primary": "217 91% 60%",
    "secondary": "210 40% 96%",
    "accent": "217 91% 60%",
    "background": "0 0% 100%",
    "foreground": "224 71% 4%",
    "muted": "220 14% 96%",
    "card": "0 0% 100%",
    "primary_dark": "217 91% 60%",
    "background_dark": "224 71% 4%",
    "foreground_dark": "210 40% 98%",
    "muted_dark": "215 27% 17%",
    "card_dark": "224 71% 4%"
}'::jsonb, true);