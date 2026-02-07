import { useState, useEffect, useMemo } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { cmsAdminApi, CMSContent } from '@/lib/cms';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  FileText,
  Home,
  Info,
  Mail,
  LayoutTemplate,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface ContentSection {
  key: string;
  label: string;
  icon: React.ReactNode;
  fields: {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'url';
    placeholder?: string;
  }[];
}

const contentSections: ContentSection[] = [
  {
    key: 'hero',
    label: 'Hero Section',
    icon: <Home className="w-4 h-4" />,
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Enter the main headline' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'Enter the supporting text' },
      { key: 'cta_text', label: 'CTA Button Text', type: 'text', placeholder: 'e.g., Get Started' },
      { key: 'cta_link', label: 'CTA Button Link', type: 'url', placeholder: '/contact' },
    ],
  },
  {
    key: 'about',
    label: 'About Section',
    icon: <Info className="w-4 h-4" />,
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'About Us' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe your company' },
      { key: 'mission', label: 'Mission Statement', type: 'textarea', placeholder: 'Our mission is...' },
      { key: 'vision', label: 'Vision Statement', type: 'textarea', placeholder: 'Our vision is...' },
    ],
  },
  {
    key: 'contact',
    label: 'Contact Information',
    icon: <Mail className="w-4 h-4" />,
    fields: [
      { key: 'email', label: 'Email Address', type: 'text', placeholder: 'info@company.com' },
      { key: 'phone', label: 'Phone Number', type: 'text', placeholder: '+1 (555) 123-4567' },
      { key: 'address', label: 'Address', type: 'textarea', placeholder: '123 Main Street, City, Country' },
      { key: 'map_link', label: 'Google Maps Link', type: 'url', placeholder: 'https://maps.google.com/...' },
    ],
  },
  {
    key: 'footer',
    label: 'Footer',
    icon: <LayoutTemplate className="w-4 h-4" />,
    fields: [
      { key: 'company_name', label: 'Company Name', type: 'text', placeholder: 'Your Company Name' },
      { key: 'tagline', label: 'Tagline', type: 'text', placeholder: 'Your company tagline' },
      { key: 'copyright', label: 'Copyright Text', type: 'text', placeholder: '© 2024 Company Name' },
    ],
  },
];

export default function AdminContent() {
  const [content, setContent] = useState<Record<string, Record<string, unknown>>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['hero', 'about', 'contact', 'footer']));
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
    if (!searchQuery) return contentSections;
    const query = searchQuery.toLowerCase();
    return contentSections.filter(
      section =>
        section.label.toLowerCase().includes(query) ||
        section.fields.some(field => field.label.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const toggleSection = (key: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedSections(newExpanded);
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
      await cmsAdminApi.updateContent(sectionKey, content[sectionKey]);
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
        contentSections.map(section => 
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
          </CardContent>
        </Card>

        <p className="text-slate-500 text-sm">
          Edit the text content of your website. Changes are saved to the database and applied immediately.
        </p>

        {/* Content Sections */}
        {filteredSections.length === 0 ? (
          <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardContent className="py-12 text-center">
              <p className="text-slate-500">No sections match your search</p>
            </CardContent>
          </Card>
        ) : (
          filteredSections.map((section) => (
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
                        <CardTitle className="text-lg text-slate-900 dark:text-white">{section.label}</CardTitle>
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
                    {section.fields.map((field) => (
                      <div key={field.key} className="space-y-2">
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
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
