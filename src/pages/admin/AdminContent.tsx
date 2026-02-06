import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { cmsAdminApi, CMSContent } from '@/lib/cms';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2 } from 'lucide-react';

interface ContentSection {
  key: string;
  label: string;
  fields: {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'url';
  }[];
}

const contentSections: ContentSection[] = [
  {
    key: 'hero',
    label: 'Hero Section',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { key: 'cta_text', label: 'CTA Button Text', type: 'text' },
      { key: 'cta_link', label: 'CTA Button Link', type: 'url' },
    ],
  },
  {
    key: 'about',
    label: 'About Section',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'mission', label: 'Mission Statement', type: 'textarea' },
      { key: 'vision', label: 'Vision Statement', type: 'textarea' },
    ],
  },
  {
    key: 'contact',
    label: 'Contact Information',
    fields: [
      { key: 'email', label: 'Email Address', type: 'text' },
      { key: 'phone', label: 'Phone Number', type: 'text' },
      { key: 'address', label: 'Address', type: 'textarea' },
      { key: 'map_link', label: 'Google Maps Link', type: 'url' },
    ],
  },
  {
    key: 'footer',
    label: 'Footer',
    fields: [
      { key: 'company_name', label: 'Company Name', type: 'text' },
      { key: 'tagline', label: 'Tagline', type: 'text' },
      { key: 'copyright', label: 'Copyright Text', type: 'text' },
    ],
  },
];

export default function AdminContent() {
  const [content, setContent] = useState<Record<string, Record<string, unknown>>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
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

  if (loading) {
    return (
      <AdminLayout title="Content Editor">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Content Editor">
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Edit the text content of your website. Changes are saved to the database and applied immediately.
        </p>

        {contentSections.map((section) => (
          <Card key={section.key}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{section.label}</CardTitle>
              <Button
                onClick={() => handleSave(section.key)}
                disabled={saving === section.key}
                size="sm"
              >
                {saving === section.key ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {section.fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <Textarea
                      value={(content[section.key]?.[field.key] as string) || ''}
                      onChange={(e) =>
                        handleFieldChange(section.key, field.key, e.target.value)
                      }
                      rows={3}
                    />
                  ) : (
                    <Input
                      type={field.type === 'url' ? 'url' : 'text'}
                      value={(content[section.key]?.[field.key] as string) || ''}
                      onChange={(e) =>
                        handleFieldChange(section.key, field.key, e.target.value)
                      }
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
