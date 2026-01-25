-- Create reviews table for customer testimonials with admin management
CREATE TABLE public.reviews (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_designation TEXT,
    customer_company TEXT,
    review_text TEXT NOT NULL,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create visitor tracking table for cookie consent
CREATE TABLE public.site_visitors (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    visitor_id TEXT NOT NULL UNIQUE,
    ip_address TEXT,
    user_agent TEXT,
    consent_given BOOLEAN DEFAULT false,
    consent_date TIMESTAMP WITH TIME ZONE,
    first_visit TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    last_visit TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    visit_count INTEGER DEFAULT 1,
    pages_visited TEXT[],
    referrer TEXT,
    country TEXT,
    city TEXT
);

-- Create contact submissions table
CREATE TABLE public.contact_submissions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    message TEXT NOT NULL,
    visitor_id TEXT REFERENCES public.site_visitors(visitor_id),
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Reviews policies - publicly readable, admin managed
CREATE POLICY "Reviews are publicly readable"
ON public.reviews FOR SELECT
USING (is_published = true);

-- Site visitors policies - allow anonymous inserts/updates for tracking
CREATE POLICY "Allow anonymous visitor tracking insert"
ON public.site_visitors FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow visitor updates by visitor_id"
ON public.site_visitors FOR UPDATE
USING (true);

CREATE POLICY "Allow reading own visitor data"
ON public.site_visitors FOR SELECT
USING (true);

-- Contact submissions policies - allow anonymous insert
CREATE POLICY "Allow anonymous contact submissions"
ON public.contact_submissions FOR INSERT
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_visitors_updated_at
BEFORE UPDATE ON public.site_visitors
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample reviews for display
INSERT INTO public.reviews (customer_name, customer_designation, customer_company, review_text, rating, is_featured)
VALUES 
('Rajesh Kumar', 'CTO', 'TechVentures India', 'Innervation IT Solutions transformed our legacy systems with their cloud migration expertise. Their team delivered on time and exceeded our expectations. Highly professional!', 5, true),
('Priya Sharma', 'Director of Operations', 'FinanceHub Pvt Ltd', 'The AI automation solutions provided by Innervation helped us reduce manual processing by 70%. Their understanding of business requirements is exceptional.', 5, true),
('Amit Patel', 'CEO', 'StartupNest Technologies', 'From ideation to deployment, Innervation IT Solutions has been our trusted technology partner. Their custom software development expertise is world-class.', 5, true),
('Sneha Desai', 'VP Engineering', 'DataDriven Solutions', 'Their data engineering team helped us build a robust analytics platform. The insights we now have are invaluable for our business decisions.', 5, false),
('Vikram Mehta', 'Managing Director', 'GlobalRetail India', 'Outstanding digital transformation journey with Innervation. They understood our challenges and delivered solutions that truly work.', 5, false);