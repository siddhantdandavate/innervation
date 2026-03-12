import { useState, useEffect, useMemo } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { cmsAdminApi, CMSContent } from '@/lib/cms';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Save, 
  Loader2, 
  Search, 
  ChevronDown,
  ChevronUp,
  Home,
  Info,
  Mail,
  LayoutTemplate,
  Briefcase,
  Sparkles,
  Phone,
  MapPin,
  Globe,
  FileText,
  Users,
  Target,
  Star,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ContentSection {
  key: string;
  label: string;
  icon: React.ReactNode;
  page: 'global' | 'home' | 'about' | 'services' | 'contact' | 'footer';
  fields: {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'url';
    placeholder?: string;
  }[];
}

// Comprehensive content sections for full-site editing
const contentSections: ContentSection[] = [
  // ========== GLOBAL ==========
  {
    key: 'global',
    label: 'Global Site Settings',
    icon: <Globe className="w-4 h-4" />,
    page: 'global',
    fields: [
      { key: 'site_title', label: 'Website Title', type: 'text', placeholder: 'Your Company Name' },
      { key: 'tagline', label: 'Tagline', type: 'text', placeholder: 'Your trusted technology partner' },
      { key: 'logo_text', label: 'Logo Text', type: 'text', placeholder: 'Company' },
      { key: 'global_cta_text', label: 'Global CTA Text', type: 'text', placeholder: 'Get Started' },
      { key: 'global_cta_link', label: 'Global CTA Link', type: 'url', placeholder: '/contact' },
    ],
  },

  // ========== HOME PAGE ==========
  {
    key: 'hero',
    label: 'Hero Section',
    icon: <Sparkles className="w-4 h-4" />,
    page: 'home',
    fields: [
      { key: 'badge_text', label: 'Badge Text', type: 'text', placeholder: 'Digital Innovation Partner' },
      { key: 'title', label: 'Main Title', type: 'text', placeholder: 'Your trusted Technology Partner' },
      { key: 'title_highlight', label: 'Highlighted Text', type: 'text', placeholder: 'Digital Transformation' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'We help businesses accelerate growth...' },
      { key: 'cta_primary_text', label: 'Primary CTA Text', type: 'text', placeholder: 'Get Started' },
      { key: 'cta_primary_link', label: 'Primary CTA Link', type: 'url', placeholder: '/contact' },
      { key: 'cta_secondary_text', label: 'Secondary CTA Text', type: 'text', placeholder: 'Explore Services' },
      { key: 'cta_secondary_link', label: 'Secondary CTA Link', type: 'url', placeholder: '/services' },
      { key: 'stat_1_value', label: 'Stat 1 Value', type: 'text', placeholder: '100+' },
      { key: 'stat_1_label', label: 'Stat 1 Label', type: 'text', placeholder: 'Happy Clients' },
      { key: 'stat_2_value', label: 'Stat 2 Value', type: 'text', placeholder: '150+' },
      { key: 'stat_2_label', label: 'Stat 2 Label', type: 'text', placeholder: 'Projects Delivered' },
      { key: 'stat_3_value', label: 'Stat 3 Value', type: 'text', placeholder: '5+' },
      { key: 'stat_3_label', label: 'Stat 3 Label', type: 'text', placeholder: 'Years Experience' },
    ],
  },
  {
    key: 'services_overview',
    label: 'Services Overview',
    icon: <Briefcase className="w-4 h-4" />,
    page: 'home',
    fields: [
      { key: 'section_label', label: 'Section Label', type: 'text', placeholder: 'What We Offer' },
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Our Services' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'We deliver end-to-end digital solutions...' },
      { key: 'cta_text', label: 'CTA Text', type: 'text', placeholder: 'Explore All Services' },
      { key: 'cta_link', label: 'CTA Link', type: 'url', placeholder: '/services' },
    ],
  },
  {
    key: 'home_cta',
    label: 'Home CTA Section',
    icon: <MessageSquare className="w-4 h-4" />,
    page: 'home',
    fields: [
      { key: 'phone_label', label: 'Phone Label', type: 'text', placeholder: 'Get in touch' },
      { key: 'phone', label: 'Phone Number', type: 'text', placeholder: '+91 93261 62104' },
      { key: 'address_label', label: 'Address Label', type: 'text', placeholder: 'Our Address' },
      { key: 'address', label: 'Address', type: 'text', placeholder: 'Ravet, Pune, Maharashtra, India' },
      { key: 'email_label', label: 'Email Label', type: 'text', placeholder: 'Email Us' },
      { key: 'email', label: 'Email', type: 'text', placeholder: 'info@company.com' },
      { key: 'cta_label', label: 'CTA Section Label', type: 'text', placeholder: 'Let\'s collaborate' },
      { key: 'cta_title', label: 'CTA Title', type: 'text', placeholder: 'Got a project?' },
      { key: 'cta_description', label: 'CTA Description', type: 'textarea', placeholder: 'We are passionate about innovative ideas...' },
      { key: 'cta_button_text', label: 'CTA Button Text', type: 'text', placeholder: 'Enquire Now' },
    ],
  },
  {
    key: 'stats',
    label: 'Stats Section',
    icon: <Target className="w-4 h-4" />,
    page: 'home',
    fields: [
      { key: 'stat_1_value', label: 'Stat 1 Value', type: 'text', placeholder: '100+' },
      { key: 'stat_1_label', label: 'Stat 1 Label', type: 'text', placeholder: 'Satisfied Clients' },
      { key: 'stat_2_value', label: 'Stat 2 Value', type: 'text', placeholder: '150+' },
      { key: 'stat_2_label', label: 'Stat 2 Label', type: 'text', placeholder: 'Projects Delivered' },
      { key: 'stat_3_value', label: 'Stat 3 Value', type: 'text', placeholder: '500+' },
      { key: 'stat_3_label', label: 'Stat 3 Label', type: 'text', placeholder: 'Tech Solutions Built' },
      { key: 'stat_4_value', label: 'Stat 4 Value', type: 'text', placeholder: '25+' },
      { key: 'stat_4_label', label: 'Stat 4 Label', type: 'text', placeholder: 'Industry Experts' },
    ],
  },
  {
    key: 'agile_delivery',
    label: 'Agile Delivery Section',
    icon: <Sparkles className="w-4 h-4" />,
    page: 'home',
    fields: [
      { key: 'section_label', label: 'Section Label', type: 'text', placeholder: 'Our Approach' },
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Agile Delivery Mindset' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'We deliver projects with speed and precision...' },
      { key: 'cta_text', label: 'CTA Text', type: 'text', placeholder: 'Read More' },
      { key: 'cta_link', label: 'CTA Link', type: 'url', placeholder: '/services' },
      { key: 'right_label', label: 'Right Label', type: 'text', placeholder: 'Success Stories' },
      { key: 'right_title', label: 'Right Title', type: 'text', placeholder: 'Our successful Digital Transformation stories' },
      { key: 'right_cta_text', label: 'Right CTA Text', type: 'text', placeholder: 'Read More' },
      { key: 'right_cta_link', label: 'Right CTA Link', type: 'url', placeholder: '/about' },
    ],
  },
  {
    key: 'mvp',
    label: 'MVP Section',
    icon: <Target className="w-4 h-4" />,
    page: 'home',
    fields: [
      { key: 'section_label', label: 'Section Label', type: 'text', placeholder: 'Launch Fast' },
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Idea to Minimum Viable Product (MVP) in' },
      { key: 'title_highlight', label: 'Title Highlight', type: 'text', placeholder: '100 days' },
      { key: 'deliverable_1', label: 'Deliverable 1', type: 'text', placeholder: 'Architectural Design' },
      { key: 'deliverable_2', label: 'Deliverable 2', type: 'text', placeholder: 'Development of the MVP/Prototype' },
      { key: 'deliverable_3', label: 'Deliverable 3', type: 'text', placeholder: 'Early Validation' },
      { key: 'deliverable_4', label: 'Deliverable 4', type: 'text', placeholder: 'Security & DevOps Readiness' },
      { key: 'floating_value', label: 'Floating Card Value', type: 'text', placeholder: '100' },
      { key: 'floating_label', label: 'Floating Card Label', type: 'text', placeholder: 'Days to MVP' },
    ],
  },
  {
    key: 'clients',
    label: 'Clients Section',
    icon: <Users className="w-4 h-4" />,
    page: 'home',
    fields: [
      { key: 'section_label', label: 'Section Label', type: 'text', placeholder: 'Trusted By' },
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Some Of Our Esteemed Clients' },
      { key: 'client_1', label: 'Client 1', type: 'text', placeholder: 'TechCorp' },
      { key: 'client_2', label: 'Client 2', type: 'text', placeholder: 'DataSoft' },
      { key: 'client_3', label: 'Client 3', type: 'text', placeholder: 'CloudNet' },
      { key: 'client_4', label: 'Client 4', type: 'text', placeholder: 'InnoSys' },
      { key: 'client_5', label: 'Client 5', type: 'text', placeholder: 'DigiMax' },
      { key: 'client_6', label: 'Client 6', type: 'text', placeholder: 'SmartFlow' },
      { key: 'client_7', label: 'Client 7', type: 'text', placeholder: 'NexGen' },
      { key: 'client_8', label: 'Client 8', type: 'text', placeholder: 'ProTech' },
    ],
  },
  {
    key: 'mutual_goals',
    label: 'Mutual Goals Section',
    icon: <Star className="w-4 h-4" />,
    page: 'home',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'We help to achieve mutual goals' },
      { key: 'quote', label: 'Quote', type: 'textarea', placeholder: 'Innervation IT Solutions has a platform that simplifies...' },
      { key: 'author_name', label: 'Author Name', type: 'text', placeholder: 'Saurabh Patwari' },
      { key: 'author_role', label: 'Author Role', type: 'text', placeholder: 'Founder & CEO, Innervation IT Solutions' },
      { key: 'cta_text', label: 'CTA Text', type: 'text', placeholder: 'Learn More' },
      { key: 'cta_link', label: 'CTA Link', type: 'url', placeholder: '/about' },
    ],
  },

  // ========== ABOUT PAGE ==========
  {
    key: 'about_hero',
    label: 'About Hero Section',
    icon: <Info className="w-4 h-4" />,
    page: 'about',
    fields: [
      { key: 'section_label', label: 'Section Label', type: 'text', placeholder: 'About Us' },
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Empowering Enterprises Through Technology' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'We are a team of technology strategists...' },
    ],
  },
  {
    key: 'about_company',
    label: 'Company Overview',
    icon: <Users className="w-4 h-4" />,
    page: 'about',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Who We Are' },
      { key: 'paragraph_1', label: 'Paragraph 1', type: 'textarea', placeholder: 'Company description...' },
      { key: 'paragraph_2', label: 'Paragraph 2', type: 'textarea', placeholder: 'Founded by industry veterans...' },
      { key: 'paragraph_3', label: 'Paragraph 3', type: 'textarea', placeholder: 'We partner with organizations...' },
      { key: 'stat_1_value', label: 'Stat 1 Value', type: 'text', placeholder: '15+' },
      { key: 'stat_1_label', label: 'Stat 1 Label', type: 'text', placeholder: 'Years of Excellence' },
      { key: 'stat_2_value', label: 'Stat 2 Value', type: 'text', placeholder: '250+' },
      { key: 'stat_2_label', label: 'Stat 2 Label', type: 'text', placeholder: 'Projects Delivered' },
      { key: 'stat_3_value', label: 'Stat 3 Value', type: 'text', placeholder: '50+' },
      { key: 'stat_3_label', label: 'Stat 3 Label', type: 'text', placeholder: 'Expert Consultants' },
      { key: 'stat_4_value', label: 'Stat 4 Value', type: 'text', placeholder: '98%' },
      { key: 'stat_4_label', label: 'Stat 4 Label', type: 'text', placeholder: 'Client Retention' },
    ],
  },
  {
    key: 'about_mission',
    label: 'Mission & Vision',
    icon: <Target className="w-4 h-4" />,
    page: 'about',
    fields: [
      { key: 'mission_title', label: 'Mission Title', type: 'text', placeholder: 'Our Mission' },
      { key: 'mission_text', label: 'Mission Statement', type: 'textarea', placeholder: 'To empower organizations with innovative technology...' },
      { key: 'vision_title', label: 'Vision Title', type: 'text', placeholder: 'Our Vision' },
      { key: 'vision_text', label: 'Vision Statement', type: 'textarea', placeholder: 'To be the most trusted technology partner...' },
    ],
  },
  {
    key: 'about_values',
    label: 'Core Values',
    icon: <Star className="w-4 h-4" />,
    page: 'about',
    fields: [
      { key: 'section_label', label: 'Section Label', type: 'text', placeholder: 'Our Foundation' },
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Core Values That Guide Us' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Our values aren\'t just words...' },
      { key: 'value_1_title', label: 'Value 1 Title', type: 'text', placeholder: 'Innovation' },
      { key: 'value_1_description', label: 'Value 1 Description', type: 'textarea', placeholder: 'We continuously explore emerging technologies...' },
      { key: 'value_2_title', label: 'Value 2 Title', type: 'text', placeholder: 'Partnership' },
      { key: 'value_2_description', label: 'Value 2 Description', type: 'textarea', placeholder: 'We view every client relationship as a strategic partnership...' },
      { key: 'value_3_title', label: 'Value 3 Title', type: 'text', placeholder: 'Integrity' },
      { key: 'value_3_description', label: 'Value 3 Description', type: 'textarea', placeholder: 'We operate with complete transparency...' },
      { key: 'value_4_title', label: 'Value 4 Title', type: 'text', placeholder: 'Excellence' },
      { key: 'value_4_description', label: 'Value 4 Description', type: 'textarea', placeholder: 'We hold ourselves to the highest standards...' },
    ],
  },
  {
    key: 'about_cta',
    label: 'About CTA',
    icon: <MessageSquare className="w-4 h-4" />,
    page: 'about',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Ready to Partner with Us?' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Let\'s explore how we can help you...' },
      { key: 'cta_primary_text', label: 'Primary CTA Text', type: 'text', placeholder: 'Contact Our Team' },
      { key: 'cta_secondary_text', label: 'Secondary CTA Text', type: 'text', placeholder: 'View Our Services' },
    ],
  },

  // ========== SERVICES PAGE ==========
  {
    key: 'services_hero',
    label: 'Services Hero',
    icon: <Briefcase className="w-4 h-4" />,
    page: 'services',
    fields: [
      { key: 'section_label', label: 'Section Label', type: 'text', placeholder: 'Our Services' },
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Digital Solutions for Your Business' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'From websites to apps, marketing to support...' },
    ],
  },
  {
    key: 'services_cta',
    label: 'Services CTA',
    icon: <MessageSquare className="w-4 h-4" />,
    page: 'services',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Ready to Get Started?' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Let\'s discuss how we can help your business grow.' },
      { key: 'cta_text', label: 'CTA Button Text', type: 'text', placeholder: 'Contact Us' },
    ],
  },

  // ========== CONTACT PAGE ==========
  {
    key: 'contact_hero',
    label: 'Contact Hero',
    icon: <Mail className="w-4 h-4" />,
    page: 'contact',
    fields: [
      { key: 'section_label', label: 'Section Label', type: 'text', placeholder: 'Contact Us' },
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Let\'s Start a Conversation' },
      { key: 'title_highlight', label: 'Title Highlight', type: 'text', placeholder: 'Conversation' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Ready to transform your business...' },
    ],
  },
  {
    key: 'contact_form',
    label: 'Contact Form',
    icon: <FileText className="w-4 h-4" />,
    page: 'contact',
    fields: [
      { key: 'form_title', label: 'Form Title', type: 'text', placeholder: 'Request a Consultation' },
      { key: 'form_description', label: 'Form Description', type: 'textarea', placeholder: 'Fill out the form below...' },
      { key: 'success_title', label: 'Success Title', type: 'text', placeholder: 'Thank You!' },
      { key: 'success_message', label: 'Success Message', type: 'textarea', placeholder: 'We\'ve received your message...' },
    ],
  },
  {
    key: 'contact_info',
    label: 'Contact Information',
    icon: <Phone className="w-4 h-4" />,
    page: 'contact',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Contact Information' },
      { key: 'address_title', label: 'Address Title', type: 'text', placeholder: 'Office Location' },
      { key: 'address_line_1', label: 'Address Line 1', type: 'text', placeholder: 'Ravet, Pune' },
      { key: 'address_line_2', label: 'Address Line 2', type: 'text', placeholder: 'Maharashtra, India' },
      { key: 'phone_title', label: 'Phone Title', type: 'text', placeholder: 'Phone' },
      { key: 'phone', label: 'Phone Number', type: 'text', placeholder: '+91 93261 62104' },
      { key: 'email_title', label: 'Email Title', type: 'text', placeholder: 'Email' },
      { key: 'email', label: 'Email Address', type: 'text', placeholder: 'info@company.com' },
      { key: 'hours_title', label: 'Hours Title', type: 'text', placeholder: 'Business Hours' },
      { key: 'hours_line_1', label: 'Hours Line 1', type: 'text', placeholder: 'Monday - Friday' },
      { key: 'hours_line_2', label: 'Hours Line 2', type: 'text', placeholder: '9:00 AM - 6:00 PM IST' },
      { key: 'promise_title', label: 'Promise Title', type: 'text', placeholder: 'Our Response Promise' },
      { key: 'promise_text', label: 'Promise Text', type: 'textarea', placeholder: 'We understand that time is critical...' },
    ],
  },

  // ========== FOOTER ==========
  {
    key: 'footer',
    label: 'Footer',
    icon: <LayoutTemplate className="w-4 h-4" />,
    page: 'footer',
    fields: [
      { key: 'company_description', label: 'Company Description', type: 'textarea', placeholder: 'Your trusted technology partner...' },
      { key: 'copyright', label: 'Copyright Text', type: 'text', placeholder: '© 2024 Company Name. All rights reserved.' },
      { key: 'privacy_link_text', label: 'Privacy Link Text', type: 'text', placeholder: 'Privacy Policy' },
      { key: 'terms_link_text', label: 'Terms Link Text', type: 'text', placeholder: 'Terms of Service' },
    ],
  },
  {
    key: 'footer_contact',
    label: 'Footer Contact',
    icon: <MapPin className="w-4 h-4" />,
    page: 'footer',
    fields: [
      { key: 'address', label: 'Address', type: 'text', placeholder: 'Ravet, Pune, India' },
      { key: 'phone', label: 'Phone', type: 'text', placeholder: '+91 93261 62104' },
      { key: 'email', label: 'Email', type: 'text', placeholder: 'info@company.com' },
    ],
  },
  {
    key: 'social_links',
    label: 'Social Media Links',
    icon: <Globe className="w-4 h-4" />,
    page: 'footer',
    fields: [
      { key: 'linkedin_url', label: 'LinkedIn URL', type: 'url', placeholder: 'https://linkedin.com/company/...' },
      { key: 'twitter_url', label: 'Twitter URL', type: 'url', placeholder: 'https://twitter.com/...' },
      { key: 'facebook_url', label: 'Facebook URL', type: 'url', placeholder: 'https://facebook.com/...' },
      { key: 'instagram_url', label: 'Instagram URL', type: 'url', placeholder: 'https://instagram.com/...' },
    ],
  },
];

const pageConfig = {
  global: { label: 'Global', icon: Globe },
  home: { label: 'Home', icon: Home },
  about: { label: 'About', icon: Info },
  services: { label: 'Services', icon: Briefcase },
  contact: { label: 'Contact', icon: Mail },
  footer: { label: 'Footer', icon: LayoutTemplate },
};

export default function AdminContent() {
  const [content, setContent] = useState<Record<string, Record<string, unknown>>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPage, setSelectedPage] = useState<'all' | 'global' | 'home' | 'about' | 'services' | 'contact' | 'footer'>('all');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['hero', 'global']));
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const res = await cmsAdminApi.getAllContent();
      const contentMap: Record<string, Record<string, unknown>> = {};
      res.data.forEach((item: CMSContent) => {
        contentMap[item.section_key] = item.content;
      });
      setContent(contentMap);
    } catch (err) {
      console.error('Error loading content:', err);
      toast({
        title: 'Error',
        description: 'Failed to load content',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredSections = useMemo(() => {
    let sections = contentSections;
    
    // Filter by page
    if (selectedPage !== 'all') {
      sections = sections.filter(s => s.page === selectedPage);
    }
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      sections = sections.filter(
        section =>
          section.label.toLowerCase().includes(query) ||
          section.fields.some(field => field.label.toLowerCase().includes(query))
      );
    }
    
    return sections;
  }, [searchQuery, selectedPage]);

  const toggleSection = (key: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedSections(newExpanded);
  };

  const expandAll = () => {
    setExpandedSections(new Set(filteredSections.map(s => s.key)));
  };

  const collapseAll = () => {
    setExpandedSections(new Set());
  };

  const handleFieldChange = (sectionKey: string, fieldKey: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [fieldKey]: value,
      },
    }));
  };

  const handleSave = async (sectionKey: string) => {
    setSaving(sectionKey);
    try {
      await cmsAdminApi.updateContent(sectionKey, content[sectionKey] || {});
      toast({
        title: 'Saved',
        description: 'Content updated successfully',
      });
    } catch (err) {
      console.error('Error saving content:', err);
      toast({
        title: 'Error',
        description: 'Failed to save content',
        variant: 'destructive',
      });
    } finally {
      setSaving(null);
    }
  };

  const handleSaveAll = async () => {
    setSaving('all');
    try {
      await Promise.all(
        filteredSections.map(section => 
          cmsAdminApi.updateContent(section.key, content[section.key] || {})
        )
      );
      toast({
        title: 'Saved',
        description: 'All content updated successfully',
      });
    } catch (err) {
      console.error('Error saving all content:', err);
      toast({
        title: 'Error',
        description: 'Failed to save some content',
        variant: 'destructive',
      });
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Content Editor">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Content Editor">
      <div className="space-y-4">
        {/* Header with Search and Save All */}
        <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search sections or fields..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-slate-200"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={expandAll}
                    className="text-slate-600"
                  >
                    Expand All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={collapseAll}
                    className="text-slate-600"
                  >
                    Collapse All
                  </Button>
                  <Button 
                    onClick={handleSaveAll}
                    disabled={saving !== null}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {saving === 'all' ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Save All Changes
                  </Button>
                </div>
              </div>
              
              {/* Page Filter Tabs */}
              <Tabs value={selectedPage} onValueChange={(v) => setSelectedPage(v as typeof selectedPage)}>
                <TabsList className="grid grid-cols-7 bg-slate-100 dark:bg-slate-700/50">
                  <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
                  {Object.entries(pageConfig).map(([key, config]) => {
                    const Icon = config.icon;
                    return (
                      <TabsTrigger key={key} value={key} className="text-xs sm:text-sm flex items-center gap-1">
                        <Icon className="w-3 h-3 hidden sm:block" />
                        {config.label}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <p className="text-slate-500 text-sm">
            Edit the text content of your website. Layout structure is preserved.
          </p>
          <span className="text-sm text-slate-400">
            {filteredSections.length} section{filteredSections.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Content Sections */}
        {filteredSections.length === 0 ? (
          <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardContent className="py-12 text-center">
              <p className="text-slate-500">No sections match your search</p>
            </CardContent>
          </Card>
        ) : (
          filteredSections.map((section) => {
            const pageInfo = pageConfig[section.page];
            return (
              <Collapsible
                key={section.key}
                open={expandedSections.has(section.key)}
                onOpenChange={() => toggleSection(section.key)}
              >
                <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                            {section.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg text-slate-900 dark:text-white">{section.label}</CardTitle>
                            <CardDescription className="text-xs text-slate-400 capitalize">
                              {pageInfo.label} Page
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSave(section.key);
                            }}
                            disabled={saving === section.key || saving === 'all'}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            {saving === section.key ? (
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                              <Save className="w-4 h-4 mr-2" />
                            )}
                            Save
                          </Button>
                          {expandedSections.has(section.key) ? (
                            <ChevronUp className="w-5 h-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="space-y-4 pt-0 pb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.fields.map((field) => (
                          <div key={field.key} className={cn(
                            "space-y-2",
                            field.type === 'textarea' && "md:col-span-2"
                          )}>
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                              {field.label}
                            </label>
                            {field.type === 'textarea' ? (
                              <Textarea
                                value={(content[section.key]?.[field.key] as string) || ''}
                                onChange={(e) =>
                                  handleFieldChange(section.key, field.key, e.target.value)
                                }
                                placeholder={field.placeholder}
                                rows={3}
                                className="border-slate-200 resize-none"
                              />
                            ) : (
                              <Input
                                type={field.type === 'url' ? 'url' : 'text'}
                                value={(content[section.key]?.[field.key] as string) || ''}
                                onChange={(e) =>
                                  handleFieldChange(section.key, field.key, e.target.value)
                                }
                                placeholder={field.placeholder}
                                className="border-slate-200"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            );
          })
        )}
      </div>
    </AdminLayout>
  );
}
