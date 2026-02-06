import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { cmsAdminApi, CMSTheme } from '@/lib/cms';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2, RotateCcw } from 'lucide-react';

interface ColorField {
  key: string;
  label: string;
  description: string;
}

const lightColors: ColorField[] = [
  { key: 'primary', label: 'Primary', description: 'Main brand color' },
  { key: 'secondary', label: 'Secondary', description: 'Secondary elements' },
  { key: 'accent', label: 'Accent', description: 'Accent highlights' },
  { key: 'background', label: 'Background', description: 'Page background' },
  { key: 'foreground', label: 'Foreground', description: 'Text color' },
  { key: 'muted', label: 'Muted', description: 'Muted backgrounds' },
  { key: 'card', label: 'Card', description: 'Card backgrounds' },
];

const darkColors: ColorField[] = [
  { key: 'primary_dark', label: 'Primary (Dark)', description: 'Main brand color in dark mode' },
  { key: 'background_dark', label: 'Background (Dark)', description: 'Dark mode background' },
  { key: 'foreground_dark', label: 'Foreground (Dark)', description: 'Dark mode text' },
  { key: 'muted_dark', label: 'Muted (Dark)', description: 'Dark mode muted backgrounds' },
  { key: 'card_dark', label: 'Card (Dark)', description: 'Dark mode card backgrounds' },
];

// Convert HSL string to hex for color picker
function hslToHex(hsl: string): string {
  try {
    const [h, s, l] = hsl.split(' ').map((v) => parseFloat(v.replace('%', '')));
    const sNorm = s / 100;
    const lNorm = l / 100;
    const a = sNorm * Math.min(lNorm, 1 - lNorm);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = lNorm - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  } catch {
    return '#3b82f6';
  }
}

// Convert hex to HSL string
function hexToHsl(hex: string): string {
  try {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '217 91% 60%';

    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  } catch {
    return '217 91% 60%';
  }
}

export default function AdminTheme() {
  const [colors, setColors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const res = await cmsAdminApi.getTheme();
      if (res.data?.colors) {
        setColors(res.data.colors as unknown as Record<string, string>);
      }
    } catch (err) {
      console.error('Error loading theme:', err);
      toast({
        title: 'Error',
        description: 'Failed to load theme',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleColorChange = (key: string, hex: string) => {
    const hsl = hexToHsl(hex);
    setColors((prev) => ({
      ...prev,
      [key]: hsl,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await cmsAdminApi.updateTheme(colors as unknown as CMSTheme['colors']);
      toast({
        title: 'Saved',
        description: 'Theme updated successfully. Refresh the website to see changes.',
      });
    } catch (err) {
      console.error('Error saving theme:', err);
      toast({
        title: 'Error',
        description: 'Failed to save theme',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setColors({
      primary: '217 91% 60%',
      secondary: '210 40% 96%',
      accent: '217 91% 60%',
      background: '0 0% 100%',
      foreground: '224 71% 4%',
      muted: '220 14% 96%',
      card: '0 0% 100%',
      primary_dark: '217 91% 60%',
      background_dark: '224 71% 4%',
      foreground_dark: '210 40% 98%',
      muted_dark: '215 27% 17%',
      card_dark: '224 71% 4%',
    });
  };

  if (loading) {
    return (
      <AdminLayout title="Theme Editor">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Theme Editor">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Customize your website colors. Changes are applied after saving.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Theme
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Light Mode Colors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lightColors.map((field) => (
                <div key={field.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">{field.label}</label>
                    <div
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: hslToHex(colors[field.key] || '217 91% 60%') }}
                    />
                  </div>
                  <Input
                    type="color"
                    value={hslToHex(colors[field.key] || '217 91% 60%')}
                    onChange={(e) => handleColorChange(field.key, e.target.value)}
                    className="h-10 cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">{field.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dark Mode Colors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {darkColors.map((field) => (
                <div key={field.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">{field.label}</label>
                    <div
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: hslToHex(colors[field.key] || '217 91% 60%') }}
                    />
                  </div>
                  <Input
                    type="color"
                    value={hslToHex(colors[field.key] || '217 91% 60%')}
                    onChange={(e) => handleColorChange(field.key, e.target.value)}
                    className="h-10 cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">{field.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className="p-6 rounded-lg"
                style={{
                  backgroundColor: `hsl(${colors.background || '0 0% 100%'})`,
                  color: `hsl(${colors.foreground || '224 71% 4%'})`,
                }}
              >
                <h3 className="font-bold mb-2">Light Mode Preview</h3>
                <p className="text-sm mb-4">This is how your light theme will look.</p>
                <button
                  className="px-4 py-2 rounded text-white"
                  style={{ backgroundColor: `hsl(${colors.primary || '217 91% 60%'})` }}
                >
                  Primary Button
                </button>
              </div>
              <div
                className="p-6 rounded-lg"
                style={{
                  backgroundColor: `hsl(${colors.background_dark || '224 71% 4%'})`,
                  color: `hsl(${colors.foreground_dark || '210 40% 98%'})`,
                }}
              >
                <h3 className="font-bold mb-2">Dark Mode Preview</h3>
                <p className="text-sm mb-4">This is how your dark theme will look.</p>
                <button
                  className="px-4 py-2 rounded text-white"
                  style={{ backgroundColor: `hsl(${colors.primary_dark || '217 91% 60%'})` }}
                >
                  Primary Button
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
